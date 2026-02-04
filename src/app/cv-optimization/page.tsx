import SEOPage from '@/components/layout/SEOPageWrapper';

export default function CVOptimizationPage() {
    return (
        <SEOPage title="CV Optimization">
            <p className="text-[11px] text-white/60 font-medium mb-4">
                Transform your CV into a job-winning document.
            </p>

            <p>
                Our <strong>AI-powered CV optimization</strong> analyzes your curriculum vitae against
                industry standards to ensure you stand out.
            </p>

            <h2>What We Optimize</h2>
            <ul className="list-disc pl-4 space-y-1">
                <li><strong>Structure:</strong> Clean, ATS-friendly layouts.</li>
                <li><strong>Relevance:</strong> Content tailored to job descriptions.</li>
                <li><strong>Keywords:</strong> Industry terms that pass screening.</li>
                <li><strong>Impact:</strong> Action verbs and quantified achievements.</li>
            </ul>

            <div className="mt-6 p-4 bg-white/[0.02] rounded-lg border border-white/5">
                <h3 className="text-xs font-semibold mb-1">Start Optimizing</h3>
                <p className="text-[10px]">
                    Get actionable insights to improve your CV in minutes.
                </p>
            </div>
        </SEOPage>
    );
}
