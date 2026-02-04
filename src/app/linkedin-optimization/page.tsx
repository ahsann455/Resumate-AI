import SEOPage from '@/components/layout/SEOPageWrapper';

export default function LinkedInOptimizationPage() {
    return (
        <SEOPage title="LinkedIn Optimization">
            <p className="text-[11px] text-white/60 font-medium mb-4">
                Maximize your professional presence on LinkedIn.
            </p>

            <p>
                Your LinkedIn profile is often the first impression recruiters have.
                Our optimization service ensures you're putting your best foot forward.
            </p>

            <h2>What We Analyze</h2>
            <ul className="list-disc pl-4 space-y-1">
                <li><strong>Headline:</strong> Craft attention-grabbing headlines.</li>
                <li><strong>Summary:</strong> Compelling about sections that tell your story.</li>
                <li><strong>Experience:</strong> Optimized descriptions with impact metrics.</li>
                <li><strong>Keywords:</strong> Terms that improve search visibility.</li>
            </ul>

            <div className="mt-6 p-4 bg-white/[0.02] rounded-lg border border-white/5">
                <h3 className="text-xs font-semibold mb-1">Optimize Your Profile</h3>
                <p className="text-[10px]">
                    Get discovered by recruiters and land more opportunities.
                </p>
            </div>
        </SEOPage>
    );
}
