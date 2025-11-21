import { db } from './firebase';
import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { Content, Creator, User, UserRole } from './types';

// Collections
const USERS_COLLECTION = 'users';
const CONTENT_COLLECTION = 'content';

// User Helpers
export async function getUser(uid: string): Promise<User | null> {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as User;
    } else {
        return null;
    }
}

export async function createUser(uid: string, data: Partial<User>) {
    await setDoc(doc(db, USERS_COLLECTION, uid), {
        ...data,
        createdAt: serverTimestamp(),
    }, { merge: true });
}

// Content Helpers
export async function getAllContent(): Promise<Content[]> {
    const q = query(collection(db, CONTENT_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to ISO string if needed, or handle in UI
        createdAt: (doc.data().createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString()
    } as Content));
}

export async function getContentByCreator(creatorId: string): Promise<Content[]> {
    const q = query(collection(db, CONTENT_COLLECTION), where("creatorId", "==", creatorId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString()
    } as Content));
}

export async function getPendingContent(): Promise<Content[]> {
    const q = query(collection(db, CONTENT_COLLECTION), where("status", "==", "pending"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString()
    } as Content));
}

export async function updateContentStatus(contentId: string, status: 'approved' | 'rejected') {
    const docRef = doc(db, CONTENT_COLLECTION, contentId);
    await updateDoc(docRef, { status });
}

export async function createContent(content: Omit<Content, 'id' | 'createdAt' | 'views' | 'likes'>) {
    await addDoc(collection(db, CONTENT_COLLECTION), {
        ...content,
        createdAt: serverTimestamp(),
        views: 0,
        likes: 0
    });
}
