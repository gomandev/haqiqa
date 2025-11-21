'use client';

import { useState } from 'react';
import { MOCK_CONTENT, MOCK_CREATORS } from '@/lib/mock-data';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, addDoc, writeBatch } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

export default function SeedPage() {
    const [status, setStatus] = useState('idle');
    const { user } = useAuth();

    const seedData = async () => {
        if (!confirm('This will overwrite/add data to your Firestore. Are you sure?')) return;

        setStatus('seeding');
        try {
            const batch = writeBatch(db);

            // Seed Creators (as Users)
            for (const creator of MOCK_CREATORS) {
                // We use their ID as the doc ID for simplicity in this mock->real transition
                // In reality, these IDs would come from Firebase Auth
                const userRef = doc(db, 'users', creator.id);
                batch.set(userRef, {
                    ...creator,
                    role: 'creator',
                    savedContentIds: [],
                    followingCreatorIds: []
                });
            }

            // Seed Content
            // Note: Batch has a limit of 500 operations. If MOCK_CONTENT is large, split it.
            // For now assuming it's small.
            for (const content of MOCK_CONTENT) {
                // Create new doc ref for content so we get an ID (or use existing if we want to preserve IDs)
                // Let's preserve IDs for consistency with current mock data usage
                const contentRef = doc(db, 'content', content.id);
                batch.set(contentRef, {
                    ...content,
                    // Ensure dates are handled correctly if they are strings in mock data
                    createdAt: new Date(content.createdAt)
                });
            }

            await batch.commit();
            setStatus('success');
        } catch (error) {
            console.error('Error seeding data:', error);
            setStatus('error');
        }
    };

    if (!user || user.role !== 'admin') {
        return <div className="p-8">Access Denied. Admins only.</div>;
    }

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-2xl font-bold">Database Seeding</h1>
            <p>Click the button below to populate Firestore with the mock data from `lib/mock-data.ts`.</p>

            <button
                onClick={seedData}
                disabled={status === 'seeding'}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {status === 'seeding' ? 'Seeding...' : 'Seed Data'}
            </button>

            {status === 'success' && (
                <div className="text-green-600">Successfully seeded data!</div>
            )}
            {status === 'error' && (
                <div className="text-red-600">Error seeding data. Check console.</div>
            )}
        </div>
    );
}
