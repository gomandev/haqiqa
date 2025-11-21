'use client';

import { User, Settings, LogOut, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ContentCard from '@/components/ContentCard';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { Content, User as UserType } from '@/lib/types';
import { getContentByIds, getUsersByIds } from '@/lib/db';

export default function ProfilePage() {
    const { user, logout, isLoading } = useAuth();
    const [followedCreators, setFollowedCreators] = useState<UserType[]>([]);
    const [savedContent, setSavedContent] = useState<Content[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        async function fetchProfileData() {
            if (user) {
                try {
                    // Fetch followed creators
                    if (user.followingCreatorIds && user.followingCreatorIds.length > 0) {
                        const creators = await getUsersByIds(user.followingCreatorIds);
                        setFollowedCreators(creators);
                    }

                    // Fetch saved content
                    if (user.savedContentIds && user.savedContentIds.length > 0) {
                        const content = await getContentByIds(user.savedContentIds);
                        setSavedContent(content);
                    }
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                } finally {
                    setLoadingData(false);
                }
            } else if (!isLoading) {
                setLoadingData(false);
            }
        }

        if (!isLoading) {
            fetchProfileData();
        }
    }, [user, isLoading]);

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex h-96 flex-col items-center justify-center gap-4">
                <p className="text-muted-foreground">Please log in to view your profile.</p>
                <Link href="/login" className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90">
                    Log In
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="font-serif text-3xl font-bold tracking-tight">My Profile</h1>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
                        <Settings className="h-4 w-4" />
                        Settings
                    </button>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-6 rounded-xl border bg-card p-8 shadow-sm">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-muted">
                    {user.avatarUrl ? (
                        <Image src={user.avatarUrl} alt={user.name} fill unoptimized className="object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <User className="h-10 w-10 text-muted-foreground" />
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">@{user.username || user.email.split('@')[0]}</p>
                    <div className="mt-1 text-sm text-muted-foreground capitalize badge badge-outline">{user.role}</div>

                    <div className="mt-4 flex gap-4 text-sm">
                        <div>
                            <span className="font-bold">{user.followingCreatorIds?.length || 0}</span> Following
                        </div>
                        <div>
                            <span className="font-bold">{user.savedContentIds?.length || 0}</span> Saved Items
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Following List */}
                <div className="md:col-span-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Following</h3>
                        <Link href="/creators" className="text-sm text-primary hover:underline">View all</Link>
                    </div>
                    <div className="rounded-xl border bg-card shadow-sm divide-y">
                        {loadingData ? (
                            <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
                        ) : followedCreators.length > 0 ? (
                            followedCreators.map(creator => (
                                <Link key={creator.id} href={`/creator/${creator.id}`} className="flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-full border">
                                        {creator.avatarUrl ? (
                                            <Image src={creator.avatarUrl} alt={creator.name} fill unoptimized className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-muted">
                                                <User className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{creator.name}</p>
                                        {/* We might not have followersCount on the generic User type unless we cast or fetch specifically */}
                                        <p className="text-xs text-muted-foreground truncate">Creator</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="p-6 text-center text-sm text-muted-foreground">
                                Not following anyone yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* Saved Content Preview */}
                <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Recently Saved</h3>
                        <Link href="/library" className="text-sm text-primary hover:underline">View library</Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {loadingData ? (
                            <div className="col-span-full p-12 text-center text-muted-foreground">Loading content...</div>
                        ) : savedContent.length > 0 ? (
                            savedContent.slice(0, 4).map((content) => (
                                <ContentCard key={content.id} content={content} />
                            ))
                        ) : (
                            <div className="col-span-full rounded-xl border border-dashed p-12 text-center text-muted-foreground">
                                No saved content found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
