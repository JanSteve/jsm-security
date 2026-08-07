import { blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Publication Not Found" };
  return {
    title: `${post.title} | JSM Security`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-20 px-4 md:px-8">
      <article className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-zinc-500 hover:text-black pl-0">
            <Link href="/blog" className="inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Insights
            </Link>
          </Button>
        </div>

        <header className="space-y-6 mb-12 pb-8 border-b border-zinc-200/80">
          <Badge className="bg-[#C5A880]/10 text-[#C5A880] border-[#C5A880]/20 rounded-full px-4 py-1 uppercase tracking-widest text-[10px] font-bold">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-zinc-400 font-semibold">
            <span className="flex items-center gap-2"><User size={16} /> By {post.author}</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> Published on {post.date}</span>
            <span className="flex items-center gap-2"><Clock size={16} /> {post.readTime}</span>
          </div>
        </header>

        {/* Content Area */}
        <section className="prose prose-zinc max-w-none text-zinc-600 text-lg leading-relaxed space-y-6">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>

        {/* Editorial Disclaimer */}
        <footer className="mt-16 p-8 bg-zinc-50 border border-zinc-200/60 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-bold text-black">JSM Corporate Communications</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">
            The views expressed in this article are based on standard security operational frameworks and facility management principles at the time of publishing. Individual enterprise requirements may vary. For inquiries, contact JSM Business Development.
          </p>
        </footer>
      </article>
    </main>
  );
}
