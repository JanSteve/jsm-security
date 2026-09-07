import { blogPosts } from "@/data/blog-posts";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock, Sparkles } from "lucide-react";
import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "Operating Insights & Articles | JSM Integrated Services",
  description: "Read practical guides on private security, commercial housekeeping, factory staffing, and facility standard operating procedures across Tamil Nadu.",
};

export default function BlogListingPage() {
  const flagshipPost = blogPosts.find((p) => p.isFlagship) || blogPosts[0];
  const otherPosts = blogPosts.filter((p) => p.slug !== flagshipPost.slug);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Blog & Insights", url: `${brandData.domain}/blog` },
  ]);

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] pt-32 pb-24 px-4 md:px-8 selection:bg-[#0071e3]/15 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold">
            <Sparkles size={13} className="text-[#0071e3]" />
            <span>OPERATIONAL KNOWLEDGE & STRATEGY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1d1d1f] tracking-tight leading-tight">
            Insights & Operating Guides
          </h1>

          <p className="text-base md:text-lg text-[#86868b] font-normal max-w-2xl mx-auto leading-relaxed">
            Practical operational analysis and security frameworks from the JSM executive and field management team.
          </p>
        </div>

        {/* Flagship Signature Article Hero Card */}
        {flagshipPost && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
                ★ Signature Publication
              </span>
            </div>

            <div className="bg-[#f5f5f7] text-[#1d1d1f] rounded-[28px] p-8 md:p-12 border border-black/[0.08] shadow-sm hover:border-black/[0.2] transition-all block">
              <div className="max-w-3xl space-y-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-white text-[#0071e3] px-3 py-1 rounded-full border border-black/[0.08]">
                  {flagshipPost.category}
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] leading-tight">
                  <Link href={`/blog/${flagshipPost.slug}`} className="hover:text-[#0071e3] transition-colors">
                    {flagshipPost.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed font-normal">
                  {flagshipPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#86868b] font-medium pt-4 border-t border-black/[0.06]">
                  <span className="flex items-center gap-1.5"><User size={13} /> {flagshipPost.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> {flagshipPost.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {flagshipPost.readTime}</span>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${flagshipPost.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#0071e3] hover:bg-[#0077ed] px-6 py-2.5 rounded-full shadow-sm transition-colors min-h-[44px]"
                  >
                    Read Full Article <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Remaining Articles */}
        <div className="space-y-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#86868b] border-b border-black/[0.08] pb-3">
            All Field Operating Guides & Checklists ({otherPosts.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] p-6 flex flex-col justify-between hover:border-black/[0.2] hover:bg-white hover:shadow-lg transition-all duration-200 shadow-sm"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white text-[#1d1d1f] border border-black/[0.06] w-fit inline-block">
                    {post.category}
                  </span>

                  <h3 className="text-base font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-[#86868b] line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-[#86868b] font-medium">
                  <span>{post.readTime}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-semibold text-[#0071e3] hover:underline flex items-center gap-1"
                  >
                    Read <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
