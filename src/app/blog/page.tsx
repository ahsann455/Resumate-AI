import Link from "next/link";
import SEOPageWrapper from "@/components/layout/SEOPageWrapper";

export default function BlogPage() {
    const posts = [
        {
            category: "Resume Tips",
            date: "Feb 12, 2025",
            title: "10 Keywords Killing Your Resume",
            excerpt: "Stop using 'hard worker'. Discover power verbs that catch a recruiter's eye.",
            slug: "resume-keywords-guide"
        },
        {
            category: "ATS Systems",
            date: "Feb 08, 2025",
            title: "Demystifying the ATS",
            excerpt: "How Applicant Tracking Systems parse your PDF and rank applications.",
            slug: "ats-algorithms-explained"
        },
        {
            category: "Career Growth",
            date: "Jan 25, 2025",
            title: "From Junior to Senior",
            excerpt: "How to frame experience to show growth and leadership on paper.",
            slug: "career-progression-guide"
        },
        {
            category: "Job Search",
            date: "Jan 15, 2025",
            title: "The Hidden Job Market",
            excerpt: "80% of jobs aren't posted. Learn networking strategies for 2025.",
            slug: "hidden-job-market"
        }
    ];

    return (
        <SEOPageWrapper
            title="Blog"
            description="Insights and strategies for your career."
        >
            <div className="max-w-xl mx-auto space-y-5">

                {posts.map((post, index) => (
                    <article
                        key={index}
                        className="group p-4 border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.02] transition-all rounded-lg"
                    >
                        <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 mb-2">
                            <span className="text-white/60">{post.category}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                        </div>

                        <Link href={`/blog/${post.slug}`} className="block space-y-1">
                            <h2 className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-xs text-white/50 leading-relaxed">
                                {post.excerpt}
                            </p>
                        </Link>
                    </article>
                ))}

            </div>
        </SEOPageWrapper>
    );
}
