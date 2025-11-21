'use client';

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Headphones, FileText, Heart, Eye } from 'lucide-react';
import { Content } from '@/lib/types';
import { MOCK_CREATORS } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContentCardProps {
    content: Content;
    index?: number;
    variant?: 'standard' | 'featured' | 'compact';
}

export default function ContentCard({ content, index = 0, variant = 'standard' }: ContentCardProps) {
    const creator = MOCK_CREATORS.find((c) => c.id === content.creatorId);

    const TypeIcon = {
        video: Play,
        audio: Headphones,
        blog: FileText,
    }[content.type];

    if (variant === 'compact') {
        return (
            <Link href={`/content/${content.id}`} className="group flex items-start gap-3">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    {content.thumbnailUrl ? (
                        <Image
                            src={content.thumbnailUrl}
                            alt={content.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-secondary/20">
                            <TypeIcon className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-primary-600 font-medium mb-1">
                        <span className="uppercase tracking-wider">{content.type}</span>
                    </div>
                    <h3 className="font-serif font-bold leading-tight group-hover:text-primary-700 line-clamp-2">
                        {content.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                        {creator?.name}
                    </p>
                </div>
            </Link>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
                "group block space-y-3",
                variant === 'featured' ? "md:grid md:grid-cols-2 md:gap-6 md:space-y-0" : ""
            )}
        >
            <Link href={`/content/${content.id}`} className={cn(
                "relative overflow-hidden rounded-lg bg-muted",
                variant === 'featured' ? "aspect-video md:aspect-auto md:h-full" : "aspect-video"
            )}>
                {content.thumbnailUrl ? (
                    <Image
                        src={content.thumbnailUrl}
                        alt={content.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary/20">
                        <TypeIcon className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="rounded-full bg-background/90 p-3 text-primary shadow-sm">
                        <TypeIcon className="h-6 w-6 fill-current" />
                    </div>
                </div>
            </Link>

            <div className="flex flex-col justify-center space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-primary-600">
                    <span className="uppercase tracking-wider">{content.type}</span>
                    <span>•</span>
                    <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                </div>

                <h3 className={cn(
                    "font-serif font-bold leading-tight group-hover:text-primary-700",
                    variant === 'featured' ? "text-2xl md:text-3xl" : "text-lg"
                )}>
                    <Link href={`/content/${content.id}`}>
                        {content.title}
                    </Link>
                </h3>

                <p className={cn(
                    "text-muted-foreground line-clamp-2",
                    variant === 'featured' ? "text-base md:text-lg" : "text-sm"
                )}>
                    {content.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                    <div className="flex items-center gap-2">
                        {creator?.avatarUrl && (
                            <div className="relative h-5 w-5 overflow-hidden rounded-full">
                                <Image src={creator.avatarUrl} alt={creator.name} fill unoptimized className="object-cover" />
                            </div>
                        )}
                        <span className="font-medium text-foreground">{creator?.name || 'Unknown Creator'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{content.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{content.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
