import SEOPage from '@/components/layout/SEOPageWrapper';

export default function AboutPage() {
    return (
        <SEOPage title="About Resumate AI">
            <p className="text-xl text-indigo-300 font-medium mb-6">
                Empowering careers through intelligent technology.
            </p>

            <p>
                <strong>Resumate AI</strong> was born from a simple observation: great candidates were getting rejected not because of their skills, but because of their resumes.
                In an era where Applicant Tracking Systems (ATS) filter out up to 75% of resumes before a human ever sees them, we realized that job seekers needed a powerful ally.
            </p>

            <h2>Our Mission</h2>
            <p>
                To democratize access to career opportunities by providing professional-grade resume analysis to everyone.
                We believe that your potential shouldn't be hidden behind poor formatting or missing keywords.
            </p>

            <h2>How We're Different</h2>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Real-time Analysis:</strong> We don't just give you a static score; we give you dynamic, actionable feedback.</li>
                <li><strong>Job-Specific Matching:</strong> We compare your profile against specific roles to ensure relevance.</li>
                <li><strong>Privacy First:</strong> Your data is yours. We optimize your resume without selling your information.</li>
            </ul>

            <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">Join 10,000+ Job Seekers</h3>
                <p className="mb-6">
                    Whether you're a fresh graduate or a seasoned executive, Resumate AI gives you the competitive edge you need.
                </p>
            </div>
        </SEOPage>
    );
}
