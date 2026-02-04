import SEOPage from '@/components/layout/SEOPageWrapper';

export default function SuccessStoriesPage() {
    return (
        <SEOPage title="Success Stories">
            <p className="text-[11px] text-white/60 font-medium mb-4">
                Real results from real job seekers.
            </p>

            <p>
                Discover how <strong>Resumate AI</strong> has helped thousands of professionals
                land their dream jobs and advance their careers.
            </p>

            <h2>Featured Stories</h2>
            <ul className="list-disc pl-4 space-y-1">
                <li><strong>Sarah M.:</strong> Landed a FAANG role after optimizing her resume.</li>
                <li><strong>James K.:</strong> Received 3x more interview callbacks.</li>
                <li><strong>Priya R.:</strong> Successfully transitioned from teaching to tech.</li>
                <li><strong>Michael T.:</strong> Got hired within 2 weeks of using Resumate.</li>
            </ul>

            <div className="mt-6 p-4 bg-white/[0.02] rounded-lg border border-white/5">
                <h3 className="text-xs font-semibold mb-1">Be Our Next Success</h3>
                <p className="text-[10px]">
                    Start your journey to career success today.
                </p>
            </div>
        </SEOPage>
    );
}
