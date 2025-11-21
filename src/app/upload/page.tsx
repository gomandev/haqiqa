'use client';

import { useState, useEffect } from 'react';
import { Upload, FileText, Video, Mic, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

type ContentType = 'video' | 'audio' | 'blog';

export default function UploadPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [selectedType, setSelectedType] = useState<ContentType>('video');
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'creator')) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user || user.role !== 'creator') {
        return <div className="flex h-96 items-center justify-center">Loading...</div>;
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        // Handle file drop logic here
    };

    return (
        <div className="mx-auto max-w-2xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Upload Content</h1>
                <p className="text-muted-foreground">Share your knowledge with the community.</p>
            </div>

            <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Content Type</label>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { id: 'video', icon: Video, label: 'Video' },
                            { id: 'audio', icon: Mic, label: 'Audio' },
                            { id: 'blog', icon: FileText, label: 'Article' },
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedType(type.id as ContentType)}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary/50 hover:bg-accent",
                                    selectedType === type.id
                                        ? "border-primary bg-primary/5 text-primary"
                                        : "border-transparent bg-secondary/50"
                                )}
                            >
                                <type.icon className="h-6 w-6" />
                                <span className="text-sm font-medium">{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                        <input
                            id="title"
                            placeholder="Give your content a clear title"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">Description</label>
                        <textarea
                            id="description"
                            rows={4}
                            placeholder="Describe what your content is about..."
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {selectedType !== 'blog' ? (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Media File</label>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 transition-colors",
                                    isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                                )}
                            >
                                <div className="rounded-full bg-secondary p-4">
                                    <Upload className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">MP4, MP3 up to 500MB</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-medium">Content</label>
                            <textarea
                                id="content"
                                rows={10}
                                placeholder="Write your article here (Markdown supported)..."
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                        Cancel
                    </button>
                    <button className="rounded-md bg-primary-600 px-8 py-2 text-sm font-medium text-white hover:bg-primary-700 shadow-sm">
                        Submit for Review
                    </button>
                </div>
            </div>
        </div>
    );
}
