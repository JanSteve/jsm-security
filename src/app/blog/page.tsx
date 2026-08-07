import { blogPosts } from "@/data/blog-posts";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";

export const metadata = {
  title: "Insights & Resources | JSM Security",
  description: "Stay informed with the latest insights, resources, and articles on corporate security, facility management, and digital transformation.",
};

export default function BlogListingPage() {
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight leading-[1.05]">
            Insights & <span className="text-[#C5A880]">Resources</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 font-medium leading-relaxed">
            Expert advice, industry trends, and analysis from the JSM executive and operations teams.
          </p>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Featured Publication</h2>
            <div className="bg-zinc-50 border border-zinc-200/60 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8 hover:border-[#C5A880]/30 transition-all duration-300 group shadow-sm">
              <div className="h-64 lg:h-full min-h-[300px] rounded-2xl bg-zinc-200/40 border border-zinc-200 overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0 bg-white/40" />
                <div className="absolute w-40 h-40 rounded-full bg-[#C5A880]/5 blur-3xl" />
                <div className="relative text-center p-6 text-zinc-400 font-bold tracking-widest text-xs uppercase">
                  JSM RESEARCH GRAPHICS
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <Badge className="bg-[#C5A880]/10 text-[#C5A880] border-[#C5A880]/20 mb-4 rounded-full px-3">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-black mb-4 leading-tight group-hover:text-[#C5A880] transition-colors duration-300">
                    <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-zinc-400 border-t border-zinc-200/60 pt-6 font-semibold">
                  <span className="flex items-center gap-1.5"><User size={14} /> {featuredPost.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {featuredPost.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {featuredPost.readTime}</span>
                </div>

                <div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:text-[#C5A880] transition-colors"
                  >
                    Read Publication <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Remaining Posts */}
        <div>
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8">All Publications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {remainingPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-zinc-50 border border-zinc-200/60 rounded-3xl p-6 flex flex-col justify-between hover:border-[#C5A880]/30 transition-all duration-300 group shadow-sm"
              >
                <div className="space-y-4">
                  <Badge className="bg-[#C5A880]/10 text-[#C5A880] border-[#C5A880]/20 rounded-full px-3 w-fit">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-black group-hover:text-[#C5A880] transition-colors duration-300 leading-tight">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-200/60 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-4 text-xs text-zinc-400 font-semibold">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:text-[#C5A880] transition-colors"
                    >
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
