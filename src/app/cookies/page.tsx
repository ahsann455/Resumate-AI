import SEOPage from '@/components/layout/SEOPageWrapper';

export default function CookieSettingsPage() {
    return (
        <SEOPage title="Cookie Settings">
            <p className="text-[10px] text-white/40 mb-4">
                Last Updated: February 2026
            </p>

            <h2>What Are Cookies?</h2>
            <p>
                Cookies are small text files stored on your device that help us
                provide and improve our services.
            </p>

            <h2>Types of Cookies</h2>
            <ul className="list-disc pl-4 space-y-1">
                <li><strong>Essential:</strong> Required for the website to function.</li>
                <li><strong>Analytics:</strong> Help us understand site usage.</li>
                <li><strong>Functional:</strong> Remember your preferences.</li>
                <li><strong>Marketing:</strong> Used for relevant advertisements.</li>
            </ul>

            <h2>Managing Cookies</h2>
            <p>
                Control cookies through your browser settings. Disabling cookies
                may affect your experience on our site.
            </p>

            <h2>Your Choices</h2>
            <p>
                Opt out of non-essential cookies anytime through browser settings
                or by contacting us directly.
            </p>
        </SEOPage>
    );
}
