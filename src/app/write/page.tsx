'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import RichTextEditor from '@/components/editor/RichTextEditor';
import { Loader2, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createContent } from '@/lib/db';
import { ContentType } from '@/lib/types';

export default function WritePage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isLoading && (!user || (user.role !== 'creator' && user.role !== 'admin'))) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const handlePublish = async () => {
        if (!title || !content) return;

        setIsSubmitting(true);
        try {
            await createContent({
                title,
                description: content.replace(/<[^>]*>/g, '').slice(0, 150) + '...', // Plain text preview
                type: 'blog',
                url: '', // Not used for rich text blogs, or could be a slug
                content: content, // New field for HTML content
                thumbnailUrl: coverImage || undefined,
                creatorId: user.id,
                status: user.role === 'admin' ? 'approved' : 'pending', // Admins auto-approve
            });
            router.push('/dashboard');
        } catch (error) {
            console.error('Error publishing article:', error);
            // Show error toast
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
                <div className="container flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <span className="text-sm font-medium text-muted-foreground">Drafting as {user.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePublish}
                            disabled={!title || !content || isSubmitting}
                            className="rounded-full bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-3xl px-4 py-10">
                <div className="space-y-8">
                    {/* Cover Image Input */}
                    <div className="group relative overflow-hidden rounded-xl bg-muted transition-all hover:bg-muted/80">
                        {coverImage ? (
                            <div className="relative aspect-video w-full">
                                <img src={coverImage} alt="Cover" className="h-full w-full object-cover" />
                                <button
                                    onClick={() => setCoverImage('')}
                                    className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="flex aspect-[3/1] w-full items-center justify-center">
                                <button
                                    onClick={() => {
                                        const url = prompt('Enter image URL for cover:');
                                        if (url) setCoverImage(url);
                                    }}
                                    className="flex items-center gap-2 rounded-md bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
                                >
                                    <ImageIcon className="h-4 w-4" />
                                    Add Cover Image
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Article Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent text-4xl font-bold placeholder:text-muted-foreground/50 focus:outline-none"
                    />

                    {/* Editor */}
                    <RichTextEditor
                        content={content}
                        onChange={setContent}
                        placeholder="Tell your story..."
                    />
                </div>
            </div>
        </div>
    );
}
