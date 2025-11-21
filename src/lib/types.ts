export type UserRole = 'user' | 'admin' | 'creator';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
    savedContentIds: string[];
    followingCreatorIds: string[];
    createdAt?: string;
    isProfileComplete?: boolean;
    username?: string;
}

export interface Creator extends User {
    role: 'creator';
    bio: string;
    followersCount: number;
}

export type ContentType = 'video' | 'audio' | 'blog';
export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface Content {
    id: string;
    title: string;
    description: string;
    type: ContentType;
    url: string; // For video/audio source or blog content (markdown)
    thumbnailUrl?: string;
    creatorId: string;
    createdAt: string;
    status: ReviewStatus;
    views: number;
    likes: number;
    content?: string; // HTML content for blogs
}
