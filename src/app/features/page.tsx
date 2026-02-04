import Link from "next/link";
import SEOPageWrapper from "@/components/layout/SEOPageWrapper";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
    const features = [
        {
            title: "AI-Powered Analysis",
            description: "Advanced algorithms parse your resume to identify strengths and weaknesses with precision."
        },
        {
            title: "ATS Compliance",
            description: "Verify formatting, keyword density, and structural integrity against industry standards."
        },
        {
            title: "Job Matching",
            description: "Get a tailored score indicating exactly how well you fit specific roles."
        },
        {
            title: "Keyword Gap Engine",
            description: "Identify exactly which skills are missing from your profile."
        },
        {
            title: "Smart Formatting",
            description: "Get suggestions on layout and section ordering for maximum impact."
        },
        {
            title: "Real-time Scoring",
            description: "Receive an instant score with detailed breakdown of metrics."
        }
    ];

    return (
        <SEOPageWrapper
            title="Features"
            description="AI capabilities that make Resumate the ultimate resume tool."
        >
            <div className="max-w-xl mx-auto space-y-8">

                <div className="space-y-3">
                    <h2>Intelligence Under the Hood</h2>
                    <p>
                        Resumate AI isn't just a spellchecker. It's a comprehensive career intelligence
                        platform designed to reverse-engineer the hiring process.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-lg"
                        >
                            <h3 className="text-xs font-semibold text-white mb-1.5">
                                {feature.title}
                            </h3>
                            <p className="text-[11px] text-white/50 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-white">Ready to optimize?</h3>
                        <Button asChild className="bg-white text-black hover:bg-white/90 h-9 px-5 text-xs font-semibold">
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
