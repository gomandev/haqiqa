import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'mock_key',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mock_domain',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mock_project',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mock_bucket',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'mock_sender',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'mock_app',
};

// Debug logging
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    console.warn('Firebase API Keys are missing. Using mock keys. This is expected during build if env vars are not set, but will fail at runtime.');
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
