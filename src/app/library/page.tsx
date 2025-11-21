'use client';

import { MOCK_CONTENT, MOCK_USERS } from '@/lib/mock-data';
import ContentCard from '@/components/ContentCard';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function LibraryPage() {
    // Mocking the current user as the first user in our mock data
    const currentUser = MOCK_USERS[0];

    // Filter content based on what the user has "saved" (mock logic)
    const savedContent = MOCK_CONTENT.filter(c => currentUser.savedContentIds.includes(c.id));

    // For "Downloaded", we'll just use the same list for now as a placeholder, 
    // or maybe just the first item to show difference.
    const downloadedContent = savedContent.slice(0, 1);

    const [activeTab, setActiveTab] = useState<'saved' | 'downloaded'>('saved');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight">My Library</h1>
                <p className="text-muted-foreground">Manage your saved and downloaded content.</p>
            </div>

            <div className="space-y-6">
                <div className="border-b">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={cn(
                                "border-b-2 pb-3 text-sm font-medium transition-colors hover:text-primary",
                                activeTab === 'saved'
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted-foreground"
                            )}
                        >
                            Saved Content
                        </button>
                        <button
                            onClick={() => setActiveTab('downloaded')}
                            className={cn(
                                "border-b-2 pb-3 text-sm font-medium transition-colors hover:text-primary",
                                activeTab === 'downloaded'
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted-foreground"
                            )}
                        >
                            Downloads
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {activeTab === 'saved' ? (
                        savedContent.length > 0 ? (
                            savedContent.map((content) => (
                                <ContentCard key={content.id} content={content} />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-muted-foreground">
                                No saved content yet.
                            </div>
                        )
                    ) : (
                        downloadedContent.length > 0 ? (
                            downloadedContent.map((content) => (
                                <ContentCard key={content.id} content={content} />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-muted-foreground">
                                No downloads yet.
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
