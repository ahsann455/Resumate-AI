import Link from "next/link";
import SEOPageWrapper from "@/components/layout/SEOPageWrapper";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
    const steps = [
        {
            step: "01",
            title: "Upload Your Resume",
            description: "Drag and drop your existing resume in PDF or DOCX format. We value your privacy—files are processed securely and never shared with third parties."
        },
        {
            step: "02",
            title: "Target Your Role",
            description: "Paste the job description of the position you're aiming for. This allows our AI to contextually analyze your profile against specific requirements."
        },
        {
            step: "03",
            title: "Deep Analysis",
            description: "Our engine scans for ATS compatibility, keyword matches, formatting issues, and soft skill indicators. It simulates how a recruiter reads your CV."
        },
        {
            step: "04",
            title: "Actionable Optimization",
            description: "Receive a scored report with clear, step-by-step instructions on what to fix. From 'add this keyword' to 'rewrite this bullet point', we guide every edit."
        }
    ];

    return (
        <SEOPageWrapper
            title="How It Works"
            description="See the simple 4-step process to optimizing your resume with AI."
        >
            <div className="max-w-4xl mx-auto space-y-10">

                {/* Header */}
                <div className="space-y-3 text-left">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        From Upload to <br />
                        <span className="text-white/40">Interview Ready.</span>
                    </h1>
                    <p className="text-xs text-white/60 max-w-2xl leading-relaxed">
                        Complexity, simplified. We've distilled the resume optimization process into four intuitive steps.
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className="group flex flex-col md:flex-row gap-4 md:gap-6 items-start pt-4 border-t border-white/10"
                        >
                            <span className="text-[10px] font-mono text-white/40 pt-1 group-hover:text-white transition-colors duration-300">
                                {item.step}
                            </span>
                            <div className="space-y-1 max-w-xl">
                                <h3 className="text-sm font-bold text-white group-hover:text-white/90">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-white/60 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="pt-8">
                    <Button asChild className="bg-white text-black hover:bg-white/90 h-12 px-8 text-sm font-bold w-full md:w-auto">
                        <Link href="/">
                            Start the Process
                        </Link>
                    </Button>
                </div>

            </div>
        </SEOPageWrapper>
    );
}
