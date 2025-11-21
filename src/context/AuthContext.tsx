'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check localStorage on mount
        const storedUser = localStorage.getItem('haqiqa_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse user from local storage', e);
                localStorage.removeItem('haqiqa_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (email: string, role: UserRole) => {
        // Mock user data
        const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0] || 'User',
            email: email,
            role: role,
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            savedContentIds: [],
            followingCreatorIds: [],
        };

        setUser(mockUser);
        localStorage.setItem('haqiqa_user', JSON.stringify(mockUser));

        // Redirect based on role
        if (role === 'admin') {
            router.push('/admin');
        } else if (role === 'creator') {
            router.push('/dashboard');
        } else {
            router.push('/');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('haqiqa_user');
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
