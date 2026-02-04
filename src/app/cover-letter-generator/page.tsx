import SEOPage from '@/components/layout/SEOPageWrapper';

export default function CoverLetterGeneratorPage() {
    return (
        <SEOPage title="Cover Letter Generator">
            <p className="text-[11px] text-white/60 font-medium mb-4">
                Create compelling cover letters in seconds.
            </p>

            <p>
                Our <strong>AI Cover Letter Generator</strong> creates personalized, professional
                cover letters tailored to specific job postings.
            </p>

            <h2>Features</h2>
            <ul className="list-disc pl-4 space-y-1">
                <li><strong>Job-Specific:</strong> Tailored to match job requirements.</li>
                <li><strong>Professional:</strong> Polished language that impresses.</li>
                <li><strong>Customizable:</strong> Easy to edit to your voice.</li>
                <li><strong>Multiple Formats:</strong> Various styles for different industries.</li>
            </ul>

            <div className="mt-6 p-4 bg-white/[0.02] rounded-lg border border-white/5">
                <h3 className="text-xs font-semibold mb-1">Generate Your Letter</h3>
                <p className="text-[10px]">
                    Save hours of writing time with AI-powered generation.
                </p>
            </div>
        </SEOPage>
    );
}
