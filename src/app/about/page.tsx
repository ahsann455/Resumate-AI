import SEOPage from '@/components/layout/SEOPageWrapper';

export default function AboutPage() {
    return (
        <SEOPage title="About">
            <p className="text-sm text-white/60 font-medium mb-5">
                Empowering careers through intelligent technology.
            </p>

            <p>
                <strong>Resumate AI</strong> was born from a simple observation: great candidates get rejected
                not because of their skills, but because of their resumes.
            </p>

            <h2>Our Mission</h2>
            <p>
                To democratize access to career opportunities by providing professional-grade
                resume analysis to everyone. Your potential shouldn't be hidden behind poor formatting.
            </p>

            <h2>How We're Different</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Real-time Analysis:</strong> Dynamic, actionable feedback, not static scores.</li>
                <li><strong>Job-Specific Matching:</strong> Compare your profile against specific roles.</li>
                <li><strong>Privacy First:</strong> Your data is yours. We never sell your information.</li>
            </ul>

            <div className="mt-8 p-5 bg-white/[0.02] rounded-lg border border-white/5">
                <h3 className="text-sm font-semibold mb-2">Join 10,000+ Job Seekers</h3>
                <p className="text-xs">
                    Whether you're a fresh graduate or seasoned executive, get the competitive edge you need.
                </p>
            </div>
        </SEOPage>
    );
}
