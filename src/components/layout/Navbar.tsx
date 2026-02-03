'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
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
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                isScrolled
                    ? 'bg-black/60 backdrop-blur-md border-white/10 py-1'
                    : 'bg-transparent py-2'
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <img
                        src="/resumate-logo.png"
                        alt="Resumate AI"
                        className="w-20 h-20 object-contain transition-transform group-hover:scale-105"
                    />
                    <span className="font-bold text-base tracking-tight text-white group-hover:text-white/90 transition-colors">
                        Resumate AI
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs font-medium text-white/70 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button variant="outline" className="border-white/20 hover:bg-white/10 hover:text-white text-white/90 h-8 px-4 text-xs font-medium transition-all">
                        Log In
                    </Button>
                    <Button className="bg-white text-black hover:bg-white/90 h-8 px-4 text-xs font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all">
                        Get Started
                    </Button>

                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 animate-in slide-in-from-top-2">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-white/80 hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-3 mt-4">
                            <Button variant="outline" className="w-full justify-center border-white/20 text-white">
                                Log In
                            </Button>
                            <Button className="w-full justify-center bg-white text-black font-bold">
                                Get Started
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
