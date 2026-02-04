import Link from 'next/link';

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
        <footer className="bg-black border-t border-white/5 py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 space-y-3">
                        <Link href="/" className="inline-block">
                            <span className="font-semibold text-base text-white">Resumate AI</span>
                        </Link>
                        <p className="text-xs text-white/40 leading-relaxed max-w-xs">
                            Intelligent resume analysis powered by AI.
                            Get data-driven insights to land your dream job.
                        </p>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-3 gap-6">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h3 className="font-medium text-xs uppercase tracking-wider mb-4 text-white/50">{category}</h3>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-xs text-white/40 hover:text-white transition-colors"
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

            </div>
        </footer>
    );
}
