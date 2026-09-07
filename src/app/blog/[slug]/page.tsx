import { blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Calendar, MessageCircle, ArrowRight, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { brandData } from "@/data/brand";

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
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `${brandData.domain}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | ${brandData.name}`,
      description: post.metaDescription,
      url: `${brandData.domain}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const artSchema = articleSchema({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    date: post.date,
    author: post.author,
  });

  const bSchema = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Blog", url: `${brandData.domain}/blog` },
    { name: post.title, url: `${brandData.domain}/blog/${post.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] pt-32 pb-24 px-4 md:px-8 selection:bg-[#0071e3]/15 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }}
      />

      <article className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-[#86868b] hover:text-[#1d1d1f] pl-0 -ml-2 text-xs font-semibold">
            <Link href="/blog" className="inline-flex items-center gap-1.5">
              <ArrowLeft size={14} /> Back to Operating Guides
            </Link>
          </Button>
        </div>

        <header className="space-y-6 mb-12 pb-8 border-b border-black/[0.08]">
          <span className="bg-[#f5f5f7] border border-black/[0.08] text-[#0071e3] text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#86868b] font-normal">
            <span className="flex items-center gap-1.5"><User size={14} className="text-[#0071e3]" /> By {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#0071e3]" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#0071e3]" /> {post.readTime}</span>
          </div>
        </header>

        {/* Article Body */}
        <section className="prose prose-zinc max-w-none text-[#1d1d1f] text-base md:text-lg leading-relaxed space-y-6">
          {post.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("### ")) {
              return <h3 key={index} className="text-xl font-semibold text-[#1d1d1f] mt-8 mb-3">{paragraph.replace("### ", "")}</h3>;
            }
            if (paragraph.startsWith("* ")) {
              return (
                <ul key={index} className="list-disc pl-5 space-y-2 text-sm md:text-base font-normal text-[#1d1d1f]">
                  {paragraph.split("\n").map((li, lIdx) => (
                    <li key={lIdx}>{li.replace("* ", "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={index} className="leading-relaxed text-[#1d1d1f]">{paragraph}</p>;
          })}
        </section>

        {/* Share & Discuss via Email */}
        <div className="mt-12 p-6 bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="text-xs font-semibold text-[#1d1d1f]">Find this guide useful?</h4>
            <p className="text-[11px] text-[#86868b]">Discuss how this applies to your property with our operations team.</p>
          </div>

          <a
            href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent("Check out this article: https://jsmintegratedservices.in/blog/" + post.slug)}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-[#e8e8ed] text-[#1d1d1f] border border-black/[0.08] text-xs font-semibold rounded-full transition-all shadow-sm"
          >
            <Mail size={14} /> Share via Email
          </a>
        </div>

        {/* Corporate Assessment CTA */}
        <footer className="mt-10 p-8 md:p-10 bg-[#f5f5f7] text-[#1d1d1f] rounded-[28px] space-y-4 border border-black/[0.08] shadow-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0071e3]">
            Operational Partnership
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f]">
            Schedule a site-specific operational review.
          </h3>
          <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed max-w-xl font-normal">
            JSM conducts on-site risk, hygiene, and workforce assessments across Tamil Nadu. Let us build a tailored SOP blueprint for your property.
          </p>
          <div className="pt-2">
            <Button asChild className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold rounded-full px-7 h-11 text-xs shadow-sm min-h-[44px]">
              <Link href="/contact">Request a Site Assessment <ArrowRight size={13} className="ml-1" /></Link>
            </Button>
          </div>
        </footer>
      </article>
    </main>
  );
}
