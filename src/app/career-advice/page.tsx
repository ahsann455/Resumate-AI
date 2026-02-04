import SEOPage from '@/components/layout/SEOPageWrapper';

export default function CareerAdvicePage() {
    return (
        <SEOPage title="Career Advice">
            <p className="text-[11px] text-white/60 font-medium mb-4">
                Expert guidance for every stage of your career.
            </p>

            <p>
                Navigate your career path with confidence using <strong>expert advice</strong>
                and actionable insights from industry professionals.
            </p>

            <h2>Topics We Cover</h2>
            <ul className="list-disc pl-4 space-y-1">
                <li><strong>Job Search:</strong> Effective strategies for finding opportunities.</li>
                <li><strong>Interviews:</strong> Tips for making lasting impressions.</li>
                <li><strong>Salary:</strong> Negotiation techniques for better compensation.</li>
                <li><strong>Transitions:</strong> Guidance for changing industries or roles.</li>
            </ul>

            <div className="mt-6 p-4 bg-white/[0.02] rounded-lg border border-white/5">
                <h3 className="text-xs font-semibold mb-1">Explore Resources</h3>
                <p className="text-[10px]">
                    Access guides and insights to accelerate your growth.
                </p>
            </div>
        </SEOPage>
    );
}
