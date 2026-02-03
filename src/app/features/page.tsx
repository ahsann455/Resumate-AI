import Link from "next/link";
import SEOPageWrapper from "@/components/layout/SEOPageWrapper";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
    const features = [
        {
            title: "AI-Powered Analysis",
            description: "Our advanced algorithms parse your resume line-by-line to understand your professional DNA, identifying strengths and weaknesses with human-like precision."
        },
        {
            title: "ATS Compliance Check",
            description: "Ensure your CV gets past the Application Tracking Systems. We verify formatting, keyword density, and structural integrity against industry standards."
        },
        {
            title: "Contextual Job Matching",
            description: "Don't just optimize for any job. Paste a specific job description to get a tailored score indicating exactly how well you fit that specific role."
        },
        {
            title: "Keyword Gap Engine",
            description: "Identify exactly which skills and keywords are missing from your profile compared to the job requirements, giving you a clear roadmap for improvement."
        },
        {
            title: "Smart Formatting",
            description: "Get suggestions on layout, font usage, and section ordering to ensure your resume is readable, professional, and impactful for human recruiters."
        },
        {
            title: "Real-time Scoring",
            description: "Receive an instant score out of 100 with a detailed breakdown of metrics, allowing you to track your improvements iteration by iteration."
        }
    ];

    return (
        <SEOPageWrapper
            title="Features"
            description="Explore the powerful AI capabilities that make Resumate the ultimate resume optimization tool."
        >
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="space-y-3 text-left">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        Intelligence <br />
                        <span className="text-white/40">Under the Hood.</span>
                    </h1>
                    <p className="text-xs text-white/60 max-w-2xl leading-relaxed">
                        Resumate AI isn't just a spellchecker. It's a comprehensive career intelligence platform designed to reverse-engineer the hiring process.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-4 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-none"
                        >
                            <h3 className="text-sm font-bold text-white mb-2 group-hover:text-white/90">
                                {feature.title}
                            </h3>
                            <p className="text-xs text-white/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col items-start gap-4">
                        <h2 className="text-2xl font-bold text-white">Ready to optimize?</h2>
                        <Button asChild className="bg-white text-black hover:bg-white/90 h-12 px-8 text-sm font-bold">
                            <Link href="/">
                                Analyze My Resume
                            </Link>
                        </Button>
                    </div>
                </div>

            </div>
        </SEOPageWrapper>
    );
}
