import Link from "next/link";
import SEOPageWrapper from "@/components/layout/SEOPageWrapper";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
    const posts = [
        {
            category: "Resume Tips",
            date: "Feb 12, 2025",
            title: "10 Keywords That Are Killing Your Resume (And What to Use Instead)",
            excerpt: "Stop using 'hard worker' and 'team player'. Discover the power verbs that actually catch a recruiter's eye.",
            slug: "resume-keywords-guide"
        },
        {
            category: "ATS Systems",
            date: "Feb 08, 2025",
            title: "Demystifying the ATS: How Algorithms Rank Your Application",
            excerpt: "Understanding how Applicant Tracking Systems parse your PDF is the first step to beating them. Here's the technical breakdown.",
            slug: "ats-algorithms-explained"
        },
        {
            category: "Career Growth",
            date: "Jan 25, 2025",
            title: "From Junior to Senior: Structuring Your Career Progression on Paper",
            excerpt: "How to frame your experience to show growth, leadership, and impact, even if you stayed in the same role for years.",
            slug: "career-progression-guide"
        },
        {
            category: "Job Search",
            date: "Jan 15, 2025",
            title: "The Hidden Job Market: Networking Strategies for 2025",
            excerpt: "80% of jobs aren't posted. Learn how to leverage LinkedIn and cold outreach to find opportunities before they go live.",
            slug: "hidden-job-market"
        }
    ];

    return (
        <SEOPageWrapper
            title="Blog"
            description="Insights, guides, and strategies for your career journey."
        >
            <div className="max-w-4xl mx-auto space-y-10">

                {/* Header */}
                <div className="space-y-3 text-left border-b border-white/10 pb-6">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        Insights asking <br />
                        <span className="text-white/40">to be read.</span>
                    </h1>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 gap-6">
                    {posts.map((post, index) => (
                        <article
                            key={index}
                            className="group flex flex-col items-start gap-2 hover:opacity-100 transition-opacity duration-300"
                        >
                            <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                                <span className="text-white/80">{post.category}</span>
                                <span>•</span>
                                <span>{post.date}</span>
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-base font-bold text-white group-hover:text-white/80 transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-xs text-white/60 leading-relaxed max-w-2xl">
                                    {post.excerpt}
                                </p>
                            </div>

                            <div className="pt-2">
                                <Button variant="link" asChild className="p-0 text-white font-bold text-sm h-auto hover:no-underline hover:text-white/70">
                                    <Link href={`/blog/${post.slug}`}>
                                        Read Article &rarr;
                                    </Link>
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </SEOPageWrapper>
    );
}
