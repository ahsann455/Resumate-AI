export default function SEOPage({ title, description, children }: { title: string, description?: string, children: React.ReactNode }) {
    return (
        <div className="container mx-auto px-6 py-8 max-w-4xl animate-in fade-in duration-700">
            <div className="mb-6 text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    {title}
                </h1>
                {description && (
                    <p className="text-xs text-white/40 max-w-xl mx-auto">{description}</p>
                )}
            </div>
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white/90 prose-p:text-white/70 prose-a:text-indigo-400">
                {children}
            </div>
        </div>
    );
}
