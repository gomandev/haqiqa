'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { MOCK_CREATORS, MOCK_CONTENT } from '@/lib/mock-data';
import ContentCard from '@/components/ContentCard';
import { Users, MapPin, Link as LinkIcon } from 'lucide-react';

export default function CreatorPage() {
    const params = useParams();
    const creator = MOCK_CREATORS.find((c) => c.id === params.id);
    const creatorContent = MOCK_CONTENT.filter((c) => c.creatorId === params.id && c.status === 'approved');

    if (!creator) {
        return <div className="p-8 text-center">Creator not found</div>;
    }

    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <div className="relative overflow-hidden rounded-xl border bg-card">
                <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-90" />
                <div className="px-8 pb-8">
                    <div className="relative -mt-12 mb-6 flex justify-between">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-background">
                            <Image
                                src={creator.avatarUrl || ''}
                                alt={creator.name}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                        <div className="mt-14 sm:mt-0">
                            <button className="rounded-full bg-primary-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
                                Follow
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h1 className="text-2xl font-bold">{creator.name}</h1>
                            <p className="text-muted-foreground">@{creator.name.toLowerCase().replace(' ', '')}</p>
                        </div>

                        <p className="max-w-2xl text-sm leading-relaxed">
                            {creator.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{creator.followersCount.toLocaleString()} Followers</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>Global</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Content</h2>
                {creatorContent.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {creatorContent.map((content) => (
                            <ContentCard key={content.id} content={content} />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No content published yet.</p>
                )}
            </div>
        </div>
    );
}
