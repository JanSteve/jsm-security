import { blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, MessageCircle, Share2, ArrowRight } from "lucide-react";
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

  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

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
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-24 px-4 md:px-8">
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
          <Button asChild variant="ghost" className="text-zinc-500 hover:text-black pl-0 -ml-2 text-xs font-bold">
            <Link href="/blog" className="inline-flex items-center gap-1.5">
              <ArrowLeft size={14} /> Back to Operating Guides
            </Link>
          </Button>
        </div>

        <header className="space-y-6 mb-12 pb-8 border-b border-zinc-200/80">
          <span className="bg-black text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full inline-block">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-500 font-semibold">
            <span className="flex items-center gap-1.5"><User size={14} className="text-[#C5A880]" /> By {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#C5A880]" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#C5A880]" /> {post.readTime}</span>
          </div>
        </header>

        {/* Article Body */}
        <section className="prose prose-zinc max-w-none text-zinc-700 text-base md:text-lg leading-relaxed space-y-6">
          {post.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("### ")) {
              return <h3 key={index} className="text-xl font-bold text-black mt-8 mb-3">{paragraph.replace("### ", "")}</h3>;
            }
            if (paragraph.startsWith("* ")) {
              return (
                <ul key={index} className="list-disc pl-5 space-y-2 text-sm md:text-base font-medium text-zinc-700">
                  {paragraph.split("\n").map((li, lIdx) => (
                    <li key={lIdx}>{li.replace("* ", "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={index} className="leading-relaxed">{paragraph}</p>;
          })}
        </section>

        {/* Share & Discuss on WhatsApp */}
        <div className="mt-12 p-6 bg-zinc-50 border border-zinc-200/80 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-black">Find this guide useful?</h4>
            <p className="text-[11px] text-zinc-500">Discuss how this applies to your property with our operations team.</p>
          </div>

          <a
            href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Team,%20I%20read%20your%20article%20on%20"${encodeURIComponent(post.title)}"%20and%20want%20to%20consult%20regarding%20our%20premises.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold shadow-sm"
          >
            <MessageCircle size={14} /> Discuss on WhatsApp
          </a>
        </div>

        {/* Corporate Assessment CTA */}
        <footer className="mt-10 p-8 md:p-10 bg-zinc-900 text-white rounded-3xl space-y-4 border border-zinc-800 shadow-xl">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880]">
            Operational Partnership
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Schedule a site-specific operational review.
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl font-medium">
            JSM conducts on-site risk, hygiene, and workforce assessments across Tamil Nadu. Let us build a tailored SOP blueprint for your property.
          </p>
          <div className="pt-2">
            <Button asChild className="bg-white hover:bg-zinc-100 text-black font-bold rounded-full px-6 h-10 text-xs">
              <Link href="/contact">Request a Site Assessment <ArrowRight size={13} className="ml-1" /></Link>
            </Button>
          </div>
        </footer>
      </article>
    </main>
  );
}
