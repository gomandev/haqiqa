'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, role?: UserRole) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // Subscribe to the user's Firestore document
                const unsubscribeFirestore = onSnapshot(doc(db, 'users', firebaseUser.uid), (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        setUser({ id: docSnapshot.id, ...docSnapshot.data() } as User);
                    } else {
                        console.log('User authenticated but profile not found (yet).');
                        setUser(null);
                    }
                    setIsLoading(false);
                }, (error) => {
                    console.error('Error fetching user profile:', error);
                    setIsLoading(false);
                });

                return () => unsubscribeFirestore();
            } else {
                setUser(null);
                setIsLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (email: string, password: string, role: UserRole = 'user') => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // Special check for the requested admin user
            const finalRole = email === 'masmedia112255@gmail.com' ? 'admin' : role;

            const userData: User = {
                id: uid,
                email,
                name: email.split('@')[0],
                role: finalRole,
                savedContentIds: [],
                followingCreatorIds: [],
                createdAt: new Date().toISOString(),
                isProfileComplete: false,
            };

            // Write to Firestore
            await setDoc(doc(db, 'users', uid), {
                ...userData,
                createdAt: serverTimestamp(),
            });

            setUser(userData);
            router.push('/onboarding');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
