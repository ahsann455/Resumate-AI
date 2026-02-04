import SEOPage from '@/components/layout/SEOPageWrapper';

export default function PrivacyPolicyPage() {
    return (
        <SEOPage title="Privacy Policy">
            <p className="text-[10px] text-white/40 mb-4">
                Last Updated: February 2026
            </p>

            <h2>Information We Collect</h2>
            <p>
                When you use Resumate AI, we collect information you provide directly,
                including resume content, account details, and usage data.
            </p>

            <h2>How We Use Your Data</h2>
            <ul className="list-disc pl-4 space-y-1">
                <li>To provide and improve our services</li>
                <li>To personalize your experience</li>
                <li>To communicate about your account</li>
                <li>To ensure platform security</li>
            </ul>

            <h2>Data Protection</h2>
            <p>
                We implement industry-standard security measures. Your documents
                are encrypted and never shared with third parties.
            </p>

            <h2>Your Rights</h2>
            <p>
                You can access, correct, or delete your data at any time.
                Contact privacy@resumate.ai for any requests.
            </p>
        </SEOPage>
    );
}
