'use client';

import { useState } from 'react';
import { Check, X, Clock, AlertCircle } from 'lucide-react';
import { MOCK_CONTENT, MOCK_CREATORS } from '@/lib/mock-data';
import { Content } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function AdminPage() {
    // Filter for pending content
    const [pendingContent, setPendingContent] = useState(
        MOCK_CONTENT.filter((c) => c.status === 'pending')
    );

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        // Remove from list to simulate action
        setPendingContent((prev) => prev.filter((c) => c.id !== id));
        // In a real app, we would make an API call here
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Review and moderate content submissions.</p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm">
                <div className="border-b p-6">
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-orange-500" />
                        <h2 className="text-lg font-semibold">Pending Reviews</h2>
                        <span className="ml-auto rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                            {pendingContent.length} items
                        </span>
                    </div>
                </div>

                <div className="divide-y">
                    {pendingContent.length > 0 ? (
                        pendingContent.map((content) => (
                            <ReviewItem
                                key={content.id}
                                content={content}
                                onApprove={() => handleAction(content.id, 'approve')}
                                onReject={() => handleAction(content.id, 'reject')}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                            <Check className="mb-4 h-12 w-12 text-green-500/20" />
                            <p>All caught up! No pending reviews.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ReviewItem({
    content,
    onApprove,
    onReject
}: {
    content: Content;
    onApprove: () => void;
    onReject: () => void;
}) {
    const creator = MOCK_CREATORS.find((c) => c.id === content.creatorId);

    return (
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
                <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    {content.thumbnailUrl ? (
                        <Image
                            src={content.thumbnailUrl}
                            alt={content.title}
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-secondary">
                            <span className="text-xs text-muted-foreground">{content.type}</span>
                        </div>
                    )}
                    <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1 py-0.5 text-[10px] font-medium text-white uppercase">
                        {content.type}
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="font-semibold">{content.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{content.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>By {creator?.name || 'Unknown'}</span>
                        <span>•</span>
                        <span>Submitted {new Date(content.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 sm:ml-auto">
                <button
                    onClick={onReject}
                    className="flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                >
                    <X className="h-4 w-4" />
                    Reject
                </button>
                <button
                    onClick={onApprove}
                    className="flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 shadow-sm"
                >
                    <Check className="h-4 w-4" />
                    Approve
                </button>
            </div>
        </div>
    );
}
