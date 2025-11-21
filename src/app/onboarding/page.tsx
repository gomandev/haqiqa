'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserRole } from '@/lib/types';

export default function OnboardingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        if (user) {
            setDisplayName(user.name || '');
            if (user.username) {
                setUsername(user.username);
            }
            if (user.isProfileComplete) {
                router.push(user.role === 'admin' ? '/admin' : '/');
            }
        }
    }, [user, router]);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleFinish = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const { setDoc } = await import('firebase/firestore');
            const userRef = doc(db, 'users', user.id);

            // Use setDoc with merge: true to handle both existing and new documents
            await setDoc(userRef, {
                name: displayName,
                username,
                bio: user.role === 'creator' ? bio : null,
                isProfileComplete: true,
                email: user.email, // Ensure email is saved
                role: user.role,   // Ensure role is saved
                savedContentIds: user.savedContentIds || [],
                followingCreatorIds: user.followingCreatorIds || [],
            }, { merge: true });

            // Redirect based on role
            router.push(user.role === 'admin' ? '/admin' : '/');
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error (show toast etc)
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null; // Or loading spinner

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-lg space-y-8 bg-card p-8 rounded-lg shadow-lg border border-border">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Welcome to Haqiqa
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Let's set up your profile. Step {step} of {user.role === 'creator' ? 3 : 2}
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground">Display Name</label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="@username"
                                />
                            </div>
                            <button
                                onClick={handleNext}
                                disabled={!displayName || !username}
                                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {step === 2 && user.role === 'creator' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground">Bio</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleBack}
                                    className="w-full rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Final Step for Non-Creators (Step 2) or Creators (Step 3) */}
                    {((step === 2 && user.role !== 'creator') || step === 3) && (
                        <div className="space-y-4">
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-foreground">Ready to go!</h3>
                                <p className="text-sm text-muted-foreground">
                                    Click finish to complete your profile setup.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleBack}
                                    className="w-full rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleFinish}
                                    disabled={loading}
                                    className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {loading ? 'Finishing...' : 'Finish'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
