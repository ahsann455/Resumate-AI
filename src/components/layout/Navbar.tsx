'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
    const { data: session, status } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '/features' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
                isScrolled
                    ? 'bg-transparent backdrop-blur-sm py-1'
                    : 'bg-transparent py-2'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center group"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <img
                        src="/resumate-logo.png"
                        alt="Resumate AI"
                        className="w-16 h-16 object-contain transition-opacity group-hover:opacity-80"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs font-medium text-white/50 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center gap-2 ml-2">
                        {status === 'authenticated' ? (
                            <>
                                <Link href="/dashboard">
                                    <Button
                                        variant="ghost"
                                        className="text-white/60 hover:text-white hover:bg-white/5 h-8 px-4 text-xs font-medium"
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => signOut()}
                                    className="bg-white/5 text-white/60 hover:bg-white/10 hover:text-white h-8 px-5 text-xs font-semibold border border-white/5"
                                >
                                    Log Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="ghost"
                                        className="text-white/60 hover:text-white hover:bg-white/5 h-8 px-4 text-xs font-medium"
                                    >
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button
                                        className="bg-white text-black hover:bg-white/90 h-8 px-5 text-xs font-semibold"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-1.5 text-white/60 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 p-4 animate-fadeInUp">
                    <nav className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-white/70 hover:text-white py-1"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/5">
                            {status === 'authenticated' ? (
                                <>
                                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-center text-white/70 h-9 text-sm">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => {
                                            signOut();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full justify-center bg-white/5 text-white/70 font-semibold h-9 text-sm border border-white/5"
                                    >
                                        Log Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-center text-white/70 h-9 text-sm">
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="w-full justify-center bg-white text-black font-semibold h-9 text-sm">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
