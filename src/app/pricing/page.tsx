import Link from "next/link";
import SEOPageWrapper from "@/components/layout/SEOPageWrapper";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingPage() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "/mo",
            description: "Essential tools for job seekers.",
            features: [
                "3 Resume Scans / month",
                "Basic ATS Check",
                "Standard Tips",
                "Email Support"
            ],
            cta: "Get Started",
            highlight: false
        },
        {
            name: "Pro",
            price: "$29",
            period: "/qtr",
            description: "Advanced analytics for serious candidates.",
            features: [
                "Unlimited Scans",
                "Keyword Gap Analysis",
                "Job Matching",
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
            description: "For teams and organizations.",
            features: [
                "Bulk Processing",
                "Team Dashboard",
                "API Access",
                "White-label Reports",
                "Account Manager"
            ],
            cta: "Contact",
            highlight: false
        }
    ];

    return (
        <SEOPageWrapper
            title="Pricing"
            description="Simple, transparent pricing."
        >
            <div className="max-w-2xl mx-auto space-y-8">

                <div className="space-y-3 text-center">
                    <h2>Invest in Your Career</h2>
                    <p>
                        Transparent pricing. Start free, upgrade when ready.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`
                                p-4 rounded-lg border transition-all flex flex-col
                                ${plan.highlight
                                    ? "bg-white text-black border-white"
                                    : "bg-white/[0.02] border-white/5 text-white hover:border-white/10"}
                            `}
                        >
                            <div className="mb-4 space-y-1.5">
                                <h3 className="text-[10px] font-medium uppercase tracking-wider ${plan.highlight ? 'text-black/50' : 'text-white/40'}">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xl font-bold">{plan.price}</span>
                                    <span className={`text-[10px] ${plan.highlight ? "text-black/50" : "text-white/40"}`}>
                                        {plan.period}
                                    </span>
                                </div>
                                <p className={`text-[10px] leading-relaxed ${plan.highlight ? "text-black/60" : "text-white/50"}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="flex-1 mb-4">
                                <ul className="space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs">
                                            <Check className={`w-3 h-3 mt-0.5 ${plan.highlight ? "text-black" : "text-white/50"}`} />
                                            <span className={plan.highlight ? "text-black/70" : "text-white/60"}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                asChild
                                className={`
                                    h-8 w-full font-semibold text-xs
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
