import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Product: [
            { name: 'Resume Checker', href: '/resume-checker' },
            { name: 'CV Optimization', href: '/cv-optimization' },
            { name: 'Cover Letter Generator', href: '/cover-letter-generator' },
            { name: 'LinkedIn Optimization', href: '/linkedin-optimization' },
        ],
        Resources: [
            { name: 'Blog', href: '/blog' },
            { name: 'Resume Templates', href: '/resume-templates' },
            { name: 'Career Advice', href: '/career-advice' },
            { name: 'Success Stories', href: '/success-stories' },
        ],
        Company: [
            { name: 'About Us', href: '/about' },
            { name: 'Contact', href: '/contact' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
        ],
    };


    return (
        <footer className="bg-black border-t border-white/10 pt-6 pb-2">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">
                    <div className="lg:col-span-2 space-y-3">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/resumate-logo.png" alt="Resumate AI" className="w-8 h-8 object-contain" />
                            <span className="font-bold text-lg text-white">Resumate AI</span>
                        </Link>
                        <p className="text-xs text-white/60 leading-relaxed max-w-xs">
                            Intelligent resume analysis and CV optimization powered by advanced AI.
                            Land your dream job with data-driven insights.
                        </p>
                    </div>

                    <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h3 className="font-semibold text-white text-xs mb-3">{category}</h3>
                                <ul className="space-y-2">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-xs text-white/60 hover:text-white transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-8 text-xs text-white/40">
                    <p>&copy; {currentYear} Resumate AI. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
