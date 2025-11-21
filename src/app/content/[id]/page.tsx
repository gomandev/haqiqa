'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Bookmark, Share2, Play, Pause } from 'lucide-react';
import { MOCK_CONTENT, MOCK_CREATORS } from '@/lib/mock-data';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ContentPage() {
    const params = useParams();
    const content = MOCK_CONTENT.find((c) => c.id === params.id);
    const creator = MOCK_CREATORS.find((c) => c.id === content?.creatorId);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    if (!content) {
        return <div className="p-8 text-center">Content not found</div>;
    }

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>

            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                {/* Media Player / Header Area */}
                <div className="relative aspect-video w-full bg-black">
                    {content.type === 'video' ? (
                        <video
                            src={content.url}
                            controls
                            className="h-full w-full"
                            poster={content.thumbnailUrl}
                        />
                    ) : content.type === 'audio' ? (
                        <div className="flex h-full flex-col items-center justify-center space-y-4 bg-gradient-to-br from-primary-900 to-primary-950 p-8 text-white">
                            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl">
                                <Image
                                    src={content.thumbnailUrl || ''}
                                    alt={content.title}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
                            <h2 className="text-2xl font-bold">{content.title}</h2>
                            <audio src={content.url} controls className="w-full max-w-md" />
                        </div>
                    ) : (
                        <div className="relative h-full w-full">
                            <Image
                                src={content.thumbnailUrl || ''}
                                alt={content.title}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <h1 className="text-3xl font-bold md:text-4xl">{content.title}</h1>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-4 flex-1">
                            {content.type !== 'blog' && (
                                <h1 className="text-2xl font-bold md:text-3xl">{content.title}</h1>
                            )}

                            <div className="flex items-center gap-4">
                                <Link href={`/creator/${creator?.id}`} className="flex items-center gap-3 group">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-full border">
                                        <Image
                                            src={creator?.avatarUrl || ''}
                                            alt={creator?.name || ''}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium group-hover:text-primary-600">{creator?.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {creator?.followersCount} followers
                                        </p>
                                    </div>
                                </Link>
                                <button className="rounded-full bg-primary-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-primary-700">
                                    Follow
                                </button>
                            </div>

                            <div className="prose prose-stone max-w-none dark:prose-invert">
                                {content.type === 'blog' ? (
                                    <div className="whitespace-pre-wrap">{content.url.replace('# ', '')}</div>
                                ) : (
                                    <p>{content.description}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 md:flex-col">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className={cn(
                                    "flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent",
                                    isLiked ? "border-red-200 bg-red-50 text-red-600 dark:bg-red-900/20" : "text-muted-foreground"
                                )}
                            >
                                <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                                {isLiked ? 'Liked' : 'Like'}
                            </button>
                            <button
                                onClick={() => setIsSaved(!isSaved)}
                                className={cn(
                                    "flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent",
                                    isSaved ? "border-primary-200 bg-primary-50 text-primary-600 dark:bg-primary-900/20" : "text-muted-foreground"
                                )}
                            >
                                <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
                                {isSaved ? 'Saved' : 'Save'}
                            </button>
                            <button className="flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent">
                                <Share2 className="h-4 w-4" />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
