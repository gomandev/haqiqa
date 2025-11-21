import { Content, Creator, User } from './types';

export const MOCK_CREATORS: Creator[] = [
    {
        id: 'c1',
        name: 'Sheikh Ahmed',
        email: 'ahmed@example.com',
        role: 'creator',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
        bio: 'Sharing knowledge about Islamic history and jurisprudence.',
        followersCount: 1250,
        savedContentIds: [],
        followingCreatorIds: [],
    },
    {
        id: 'c2',
        name: 'Sister Fatima',
        email: 'fatima@example.com',
        role: 'creator',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
        bio: 'Daily reminders and Quranic reflections.',
        followersCount: 890,
        savedContentIds: [],
        followingCreatorIds: [],
    },
];

export const MOCK_USERS: User[] = [
    {
        id: 'u1',
        name: 'Abdullah User',
        email: 'user@example.com',
        role: 'user',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah',
        savedContentIds: ['1', '3'],
        followingCreatorIds: ['c1'],
    },
    {
        id: 'a1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        savedContentIds: [],
        followingCreatorIds: [],
    },
];

export const MOCK_CONTENT: Content[] = [
    {
        id: '1',
        title: 'Understanding the Pillars of Islam',
        description: 'A comprehensive guide to the five pillars of Islam.',
        type: 'video',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video
        thumbnailUrl: 'https://placehold.co/600x400/10b981/ffffff?text=Pillars+of+Islam',
        creatorId: 'c1',
        createdAt: '2023-10-25T10:00:00Z',
        status: 'approved',
        views: 1500,
        likes: 120,
    },
    {
        id: '2',
        title: 'Morning Adhkar',
        description: 'Beautiful recitation of morning supplications.',
        type: 'audio',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder audio
        thumbnailUrl: 'https://placehold.co/600x400/0ea5e9/ffffff?text=Morning+Adhkar',
        creatorId: 'c2',
        createdAt: '2023-10-26T08:30:00Z',
        status: 'approved',
        views: 850,
        likes: 95,
    },
    {
        id: '3',
        title: 'The Importance of Charity',
        description: 'Why giving back to the community is essential.',
        type: 'blog',
        url: '# The Importance of Charity\n\nCharity (Sadaqah) is a virtue...',
        thumbnailUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Charity',
        creatorId: 'c1',
        createdAt: '2023-10-27T14:15:00Z',
        status: 'pending',
        views: 0,
        likes: 0,
    },
];
