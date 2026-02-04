export default function SEOPage({ title, description, children }: { title: string, description?: string, children: React.ReactNode }) {
    return (
        <div className="container mx-auto px-4 pt-8 pb-16 max-w-2xl animate-fadeInUp">
            <div className="mb-8">
                <h1 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-1">
                    {title}
                </h1>
                {description && (
                    <p className="text-xs text-white/40">{description}</p>
                )}
            </div>
            <div className="prose-premium">
                {children}
            </div>
        </div>
    );
}
