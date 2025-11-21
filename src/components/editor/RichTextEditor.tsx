'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Undo, Redo } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = 'Start writing...' }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="rounded-md border border-input bg-background shadow-sm">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b bg-muted/50 p-2">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={cn(
                        "rounded p-1 hover:bg-muted",
                        editor.isActive('bold') ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={cn(
                        "rounded p-1 hover:bg-muted",
                        editor.isActive('italic') ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </button>
                <div className="mx-1 h-4 w-px bg-border" />
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={cn(
                        "rounded p-1 hover:bg-muted",
                        editor.isActive('heading', { level: 1 }) ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                    title="Heading 1"
                >
                    <Heading1 className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={cn(
                        "rounded p-1 hover:bg-muted",
                        editor.isActive('heading', { level: 2 }) ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                    title="Heading 2"
                >
                    <Heading2 className="h-4 w-4" />
                </button>
                <div className="mx-1 h-4 w-px bg-border" />
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={cn(
                        "rounded p-1 hover:bg-muted",
                        editor.isActive('bulletList') ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={cn(
                        "rounded p-1 hover:bg-muted",
                        editor.isActive('orderedList') ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                    title="Ordered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={cn(
                        "rounded p-1 hover:bg-muted",
                        editor.isActive('blockquote') ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                    title="Quote"
                >
                    <Quote className="h-4 w-4" />
                </button>
                <div className="mx-1 h-4 w-px bg-border" />
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className="rounded p-1 text-muted-foreground hover:bg-muted disabled:opacity-50"
                    title="Undo"
                >
                    <Undo className="h-4 w-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className="rounded p-1 text-muted-foreground hover:bg-muted disabled:opacity-50"
                    title="Redo"
                >
                    <Redo className="h-4 w-4" />
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
