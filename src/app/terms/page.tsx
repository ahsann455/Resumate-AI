import SEOPage from '@/components/layout/SEOPageWrapper';

export default function TermsOfServicePage() {
    return (
        <SEOPage title="Terms of Service">
            <p className="text-[10px] text-white/40 mb-4">
                Last Updated: February 2026
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
                By using Resumate AI, you agree to these Terms of Service
                and all applicable laws and regulations.
            </p>

            <h2>Use of Service</h2>
            <ul className="list-disc pl-4 space-y-1">
                <li>Must be at least 16 years old</li>
                <li>Responsible for account security</li>
                <li>No unlawful use permitted</li>
                <li>You retain ownership of uploaded content</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
                Resumate AI and its original content are protected by
                international copyright and trademark laws.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
                Resumate AI is provided "as is" without warranties. We are
                not responsible for employment outcomes or hiring decisions.
            </p>
        </SEOPage>
    );
}
