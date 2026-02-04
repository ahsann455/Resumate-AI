import SEOPage from '@/components/layout/SEOPageWrapper';

export default function ContactPage() {
    return (
        <SEOPage title="Contact">
            <p className="text-[11px] text-white/60 font-medium mb-4">
                We'd love to hear from you.
            </p>

            <p>
                Have questions, feedback, or need support?
                Our team is here to help you succeed.
            </p>

            <h2>Get In Touch</h2>
            <ul className="list-disc pl-4 space-y-1">
                <li><strong>Email:</strong> support@resumate.ai</li>
                <li><strong>Response:</strong> Within 24 hours</li>
                <li><strong>Hours:</strong> Mon - Fri, 9am - 6pm EST</li>
            </ul>

            <h2>Topics</h2>
            <ul className="list-disc pl-4 space-y-1">
                <li>Account & billing</li>
                <li>Technical support</li>
                <li>Feature requests</li>
                <li>Partnerships</li>
            </ul>

            <div className="mt-6 p-4 bg-white/[0.02] rounded-lg border border-white/5">
                <h3 className="text-xs font-semibold mb-1">Send a Message</h3>
                <p className="text-[10px]">
                    Reach out and we'll get back to you soon.
                </p>
            </div>
        </SEOPage>
    );
}
