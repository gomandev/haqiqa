'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Library, Users, ShieldCheck, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Compass, label: 'Explore', href: '/explore' },
    { icon: Library, label: 'My Library', href: '/library' },
    { icon: Users, label: 'Creators', href: '/creators' },
    { icon: Upload, label: 'Upload', href: '/upload' },
    { icon: ShieldCheck, label: 'Admin', href: '/admin' },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    "fixed top-16 z-50 h-[calc(100vh-4rem)] w-64 -translate-x-full border-r bg-background transition-transform duration-300 md:sticky md:translate-x-0",
                    isOpen && "translate-x-0"
                )}
            >
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Discover
                        </h2>
                        <div className="space-y-1">
                            {sidebarItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => onClose()}
                                    className={cn(
                                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                        pathname === item.href ? "bg-accent text-accent-foreground" : "text-transparent"
                                    )}
                                >
                                    <item.icon className={cn("mr-2 h-4 w-4", pathname === item.href ? "text-primary-600" : "text-muted-foreground")} />
                                    <span className={pathname === item.href ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
