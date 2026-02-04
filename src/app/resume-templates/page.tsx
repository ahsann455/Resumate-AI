import SEOPage from '@/components/layout/SEOPageWrapper';

export default function ResumeTemplatesPage() {
    return (
        <SEOPage title="Resume Templates">
            <p className="text-[11px] text-white/60 font-medium mb-4">
                Professional templates designed for success.
            </p>

            <p>
                Choose from our collection of <strong>ATS-friendly templates</strong> designed
                by career experts and tested with real hiring systems.
            </p>

            <h2>Template Categories</h2>
            <ul className="list-disc pl-4 space-y-1">
                <li><strong>Classic:</strong> Timeless designs for any industry.</li>
                <li><strong>Modern:</strong> Contemporary layouts for creative fields.</li>
                <li><strong>Executive:</strong> Sophisticated templates for senior roles.</li>
                <li><strong>Technical:</strong> Specialized formats for tech professionals.</li>
            </ul>

            <div className="mt-6 p-4 bg-white/[0.02] rounded-lg border border-white/5">
                <h3 className="text-xs font-semibold mb-1">Browse Templates</h3>
                <p className="text-[10px]">
                    Find the perfect template for your career stage.
                </p>
            </div>
        </SEOPage>
    );
}
