import Link from "next/link";
import SEOPageWrapper from "@/components/layout/SEOPageWrapper";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingPage() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "/month",
            description: "Essential tools for casual job seekers.",
            features: [
                "3 Resume Scans per month",
                "Basic ATS Compliance Check",
                "Standard Formatting Tips",
                "Email Support"
            ],
            cta: "Get Started",
            highlight: false
        },
        {
            name: "Pro",
            price: "$29",
            period: "/quarter",
            description: "Advanced analytics for serious candidates.",
            features: [
                "Unlimited Resume Scans",
                "Deep Keyword Gap Analysis",
                "Job Description Matching",
                "Cover Letter Generator",
                "Priority Support"
            ],
            cta: "Go Pro",
            highlight: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "For career coaches and organizations.",
            features: [
                "Bulk Resume Processing",
                "Team Management Dashboard",
                "API Access",
                "White-label Reports",
                "Dedicated Account Manager"
            ],
            cta: "Contact Sales",
            highlight: false
        }
    ];

    return (
        <SEOPageWrapper
            title="Pricing"
            description="Simple, transparent pricing for your career growth."
        >
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div className="space-y-3 text-center max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        Invest in Your <br />
                        <span className="text-white/40">Future Career.</span>
                    </h1>
                    <p className="text-xs text-white/60 leading-relaxed">
                        Transparent pricing with no hidden fees. Start for free, upgrade when you're ready to land the job.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`
                relative p-5 rounded-xl border transition-all duration-300 flex flex-col
                ${plan.highlight
                                    ? "bg-white text-black border-white scale-100 z-10 shadow-2xl shadow-white/10"
                                    : "bg-white/5 border-white/10 text-white hover:border-white/20"}
              `}
                        >
                            <div className="mb-4 space-y-2">
                                <h3 className={`text-sm font-bold ${plan.highlight ? "text-black/60" : "text-white/60"}`}>
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold tracking-tight">{plan.price}</span>
                                    <span className={`text-[10px] ${plan.highlight ? "text-black/60" : "text-white/60"}`}>
                                        {plan.period}
                                    </span>
                                </div>
                                <p className={`text-[10px] leading-relaxed ${plan.highlight ? "text-black/60" : "text-white/60"}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="flex-1 mb-8">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm">
                                            <Check className={`w-4 h-4 mt-0.5 ${plan.highlight ? "text-black" : "text-white"}`} />
                                            <span className={plan.highlight ? "text-black/80" : "text-white/80"}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                asChild
                                className={`
                  h-12 w-full font-bold text-sm
                  ${plan.highlight
                                        ? "bg-black text-white hover:bg-black/80"
                                        : "bg-white text-black hover:bg-white/90"}
                `}
                            >
                                <Link href={plan.price === "Custom" ? "/contact" : "/"}>
                                    {plan.cta}
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>

            </div>
        </SEOPageWrapper>
    );
}
