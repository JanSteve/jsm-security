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
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-24 px-4 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-bold">
            <Sparkles size={13} className="text-[#C5A880]" />
            <span>OPERATIONAL KNOWLEDGE & STRATEGY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight">
            Insights & Operating Guides
          </h1>

          <p className="text-base md:text-lg text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Practical operational analysis and security frameworks from the JSM executive and field management team.
          </p>
        </div>

        {/* Flagship Signature Article Hero Card */}
        {flagshipPost && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
                ★ Signature Publication
              </span>
            </div>

            <div className="bg-zinc-900 text-white rounded-3xl p-8 md:p-12 border border-zinc-800 shadow-2xl hover:border-[#C5A880]/50 transition-all block">
              <div className="max-w-3xl space-y-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-zinc-800 text-[#C5A880] px-3 py-1 rounded-full border border-zinc-700">
                  {flagshipPost.category}
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                  <Link href={`/blog/${flagshipPost.slug}`} className="hover:text-[#C5A880] transition-colors">
                    {flagshipPost.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                  {flagshipPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-semibold pt-4 border-t border-zinc-800">
                  <span className="flex items-center gap-1.5"><User size={13} /> {flagshipPost.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> {flagshipPost.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {flagshipPost.readTime}</span>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${flagshipPost.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#C5A880] hover:bg-[#b59870] text-black px-5 py-2.5 rounded-full shadow-md transition-colors"
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
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400 border-b border-zinc-200/80 pb-3">
            All Field Operating Guides & Checklists ({otherPosts.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 flex flex-col justify-between hover:border-black hover:bg-white hover:shadow-lg transition-all duration-200 shadow-xs"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-800 w-fit inline-block">
                    {post.category}
                  </span>

                  <h3 className="text-base font-bold text-black hover:underline leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center justify-between text-xs text-zinc-400 font-semibold">
                  <span>{post.readTime}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-black hover:underline flex items-center gap-1"
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
