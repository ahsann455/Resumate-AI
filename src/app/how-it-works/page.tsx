import Link from "next/link";
import SEOPageWrapper from "@/components/layout/SEOPageWrapper";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
    const steps = [
        {
            step: "01",
            title: "Upload Your Resume",
            description: "Drag and drop your resume in PDF or DOCX. Files are processed securely."
        },
        {
            step: "02",
            title: "Target Your Role",
            description: "Enter the job title you're aiming for to enable contextual analysis."
        },
        {
            step: "03",
            title: "Deep Analysis",
            description: "Our AI scans for ATS compatibility, keywords, formatting, and skill indicators."
        },
        {
            step: "04",
            title: "Get Recommendations",
            description: "Receive a scored report with clear, actionable steps to improve."
        }
    ];

    return (
        <SEOPageWrapper
            title="How It Works"
            description="Simple 4-step process to optimizing your resume."
        >
            <div className="max-w-xl mx-auto space-y-8">

                <div className="space-y-3">
                    <h2>From Upload to Interview Ready</h2>
                    <p>
                        We've distilled resume optimization into four intuitive steps.
                    </p>
                </div>

                <div className="space-y-4">
                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className="group flex gap-4 items-start p-4 border-l-2 border-white/10 hover:border-white/30 transition-colors"
                        >
                            <span className="text-xs font-mono text-white/30 pt-0.5">
                                {item.step}
                            </span>
                            <div className="space-y-1">
                                <h3 className="text-xs font-semibold text-white">
                                    {item.title}
                                </h3>
                                <p className="text-[11px] text-white/50 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-6">
                    <Button asChild className="bg-white text-black hover:bg-white/90 h-9 px-5 text-xs font-semibold">
                        <Link href="/">
                            Start Now
                        </Link>
                    </Button>
                </div>

            </div>
        </SEOPageWrapper>
    );
}
