'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Bell, User, Menu, Pen } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <div className="relative h-8 w-24">
                            <Image
                                src="/logo.png"
                                alt="Haqiqa Logo"
                                width={80}
                                height={40}
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation - Only show if profile is complete */}
                {user?.isProfileComplete && (
                    <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
                        <Link href="/explore" className="transition-colors hover:text-foreground">News</Link>
                        <Link href="/library" className="transition-colors hover:text-foreground">Library</Link>
                        <Link href="/creators" className="transition-colors hover:text-foreground">Creators</Link>
                    </div>
                )}

                <div className="flex flex-1 items-center justify-end space-x-4">
                    {user?.isProfileComplete && (
                        <div className="w-full flex-1 md:w-auto md:flex-none hidden sm:block">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    placeholder="Search..."
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-[200px] lg:w-[300px]"
                                />
                            </div>
                        </div>
                    )}

                    <nav className="flex items-center space-x-2">
                        {isAuthenticated && user ? (
                            <>
                                {user.isProfileComplete && (
                                    <>
                                        {user.role === 'creator' && (
                                            <>
                                                <Link href="/write">
                                                    <button className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 mr-2">
                                                        <Pen className="mr-2 h-4 w-4" />
                                                        <span>Write</span>
                                                    </button>
                                                </Link>
                                                <Link href="/upload">
                                                    <button className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                                        Upload
                                                    </button>
                                                </Link>
                                            </>
                                        )}
                                        {(user.role === 'creator' || user.role === 'admin') && (
                                            <Link href="/dashboard">
                                                <button className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3">
                                                    Dashboard
                                                </button>
                                            </Link>
                                        )}
                                        <Link href={user.role === 'admin' ? '/admin' : user.role === 'creator' ? '/dashboard' : '/profile'}>
                                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                                                <User className="h-5 w-5" />
                                                <span className="sr-only">Profile</span>
                                            </button>
                                        </Link>
                                    </>
                                )}
                                <button
                                    onClick={logout}
                                    className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 text-red-500 hover:text-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login">
                                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                                    Login
                                </button>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </nav>
    );
}
