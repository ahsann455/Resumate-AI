import SEOPage from '@/components/layout/SEOPageWrapper';

export default function ResumeChecker() {
    return (
        <SEOPage title="AI Resume Checker">
            <p>
                In today's competitive job market, having a resume that stands out is crucial.
                Our <strong>AI Resume Checker</strong> scans your CV against modern industry standards and ATS (Applicant Tracking Systems) to ensure you have the best chance of getting hired.
            </p>

            <h3>Why use an AI Resume Checker?</h3>
            <ul>
                <li><strong>Instant Feedback:</strong> Get results in seconds, not days.</li>
                <li><strong>ATS Compatibility:</strong> Ensure bots can read your resume correctly.</li>
                <li><strong>Keyword Optimization:</strong> Find the missing keywords that recruiters are searching for.</li>
            </ul>

            <h3>How it Works</h3>
            <p>
                Simply upload your PDF or DOCX resume, enter the target job title, and let our advanced algorithms do the rest.
                We analyze structure, content, and relevance to provide a comprehensive score and actionable insights.
            </p>
        </SEOPage>
    );
}
