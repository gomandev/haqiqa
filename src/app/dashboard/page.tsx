'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getContentByCreator } from '@/lib/db';
import { Content } from '@/lib/types';
import { BarChart3, Users, Play, Heart, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CreatorDashboard() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    const [myContent, setMyContent] = useState<Content[]>([]);
    const [loadingContent, setLoadingContent] = useState(true);

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'creator')) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        async function fetchContent() {
            if (user && user.id) {
                try {
                    const content = await getContentByCreator(user.id);
                    setMyContent(content);
                } catch (error) {
                    console.error("Error fetching content:", error);
                } finally {
                    setLoadingContent(false);
                }
            }
        }

        if (!isLoading && user) {
            fetchContent();
        }
    }, [user, isLoading]);

    if (isLoading || !user || user.role !== 'creator') {
        return <div className="flex h-96 items-center justify-center">Loading...</div>;
    }

    // Safe access to creator specific fields with fallback
    const followersCount = (user as any).followersCount || 0;
    const totalViews = myContent.reduce((acc, curr) => acc + curr.views, 0);
    const totalLikes = myContent.reduce((acc, curr) => acc + curr.likes, 0);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-bold tracking-tight">Creator Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {user.name}</p>
                </div>
                <Link
                    href="/upload"
                    className="inline-flex items-center text-dark justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Content
                </Link>
            </div>

            {!user?.isProfileComplete && (
                <div className="mb-8 rounded-md bg-yellow-50 p-4 border border-yellow-200">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Profile Incomplete</h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <p>
                                    Your profile is missing some details. Please complete it to unlock all features.
                                </p>
                            </div>
                            <div className="mt-4">
                                <div className="-mx-2 -my-1.5 flex">
                                    <a href="/onboarding" className="rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50">
                                        Complete Profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Analytics Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Followers</p>
                            <h3 className="text-2xl font-bold">{followersCount.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                            <Play className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                            <h3 className="text-2xl font-bold">{totalViews.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                            <Heart className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Likes</p>
                            <h3 className="text-2xl font-bold">{totalLikes.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Management */}
            <div className="rounded-xl border bg-card shadow-sm">
                <div className="border-b p-6">
                    <h2 className="text-lg font-semibold">My Content</h2>
                </div>
                <div className="divide-y">
                    {loadingContent ? (
                        <div className="p-12 text-center text-muted-foreground">Loading content...</div>
                    ) : myContent.length > 0 ? (
                        myContent.map((content) => (
                            <div key={content.id} className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative h-16 w-28 overflow-hidden rounded-md bg-muted">
                                        {content.thumbnailUrl ? (
                                            <Image
                                                src={content.thumbnailUrl}
                                                alt={content.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-secondary">
                                                <span className="text-xs text-muted-foreground">{content.type}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{content.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="capitalize">{content.type}</span>
                                            <span>•</span>
                                            <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span className={
                                                content.status === 'approved' ? 'text-green-600' :
                                                    content.status === 'rejected' ? 'text-red-600' :
                                                        'text-orange-600'
                                            }>
                                                {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button className="rounded-md p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-muted-foreground">
                            You haven't posted any content yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
