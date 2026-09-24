import { knowledgeArticles } from "@/data/knowledge-base";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brandData } from "@/data/brand";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  FileCheck, 
  ArrowLeft, 
  Share2, 
  Phone 
} from "lucide-react";

export function generateStaticParams() {
  return knowledgeArticles.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const art = knowledgeArticles.find((a) => a.slug === slug);
  if (!art) return { title: "Article Not Found" };

  return constructMetadata({
    title: art.metaTitle,
    description: art.metaDescription,
    path: `/knowledge/${art.slug}`,
    type: "article",
    keywords: [
      art.title,
      art.category,
      "PSARA Compliance Tamil Nadu",
      "Security Audits India"
    ]
  });
}

export default async function KnowledgeArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const art = knowledgeArticles.find((a) => a.slug === slug);
  if (!art) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Knowledge Center", url: `${brandData.domain}/knowledge` },
    { name: art.title, url: `${brandData.domain}/knowledge/${art.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": art.title,
    "description": art.metaDescription,
    "datePublished": art.publishDate,
    "dateModified": art.lastUpdated,
    "author": {
      "@type": "Person",
      "name": art.author.name,
      "jobTitle": art.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": brandData.name,
      "url": brandData.domain,
      "logo": {
        "@type": "ImageObject",
        "url": `${brandData.domain}/images/jsm_logo_black.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${brandData.domain}/knowledge/${art.slug}`
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B3D2E] hover:underline"
        >
          <ArrowLeft size={14} />
          <span>Back to Knowledge Center</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 border-b border-[#E7E5E0] pb-8">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B3D2E] bg-[#0B3D2E]/8 px-2.5 py-1 rounded">
              {art.categoryBadge}
            </span>
            <span className="text-xs text-[#5A6578] flex items-center gap-1 font-medium">
              <Clock size={13} className="text-[#0B3D2E]" />
              <span>{art.readTime}</span>
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-bold tracking-tight leading-tight">
            {art.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-[#5A6578] border-t border-[#E7E5E0]/60">
            <div className="flex items-center gap-2">
              <User size={14} className="text-[#0B3D2E]" />
              <span>
                Authored by <strong className="text-[#14181F]">{art.author.name}</strong> ({art.author.role})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#0B3D2E]" />
              <span>Last regulatory update: {art.lastUpdated}</span>
            </div>
          </div>
        </header>

        {/* Key Takeaways Callout Box */}
        <section className="rounded-xl border border-[#0B3D2E]/20 bg-[#0B3D2E]/4 p-6 sm:p-7 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D2E] flex items-center gap-1.5">
            <ShieldCheck size={16} />
            <span>Executive & Legal Takeaways</span>
          </span>
          <ul className="space-y-2 text-xs sm:text-sm text-[#14181F]">
            {art.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <CheckCircle2 size={15} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Article Body */}
        <article className="space-y-6 text-sm sm:text-base text-[#14181F] leading-relaxed">
          {art.content.map((paragraph, idx) => (
            <p key={idx} className="text-[#4B5259]">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Actionable Audit Checklist if available */}
        {art.actionChecklist && (
          <section className="rounded-xl border border-[#E7E5E0] bg-[#F8F9FA] p-6 sm:p-8 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A67C3D] flex items-center gap-1.5">
                <FileCheck size={16} />
                <span>Actionable Compliance Checklist</span>
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#14181F]">
                Inspection Items for Facility & HR Leaders
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {art.actionChecklist.map((item, idx) => (
                <div key={idx} className="p-3 bg-white border border-[#E7E5E0] rounded-lg text-xs text-[#14181F] flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Contact Box */}
        <footer className="pt-8 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-sm text-[#14181F]">
              Have questions regarding statutory compliance or PSARA norms?
            </h4>
            <p className="text-xs text-[#5A6578]">
              Consult directly with our operations leadership team in Tiruchirappalli.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0B3D2E] text-white text-xs font-semibold hover:bg-[#145C43] transition-colors shrink-0 shadow-xs"
          >
            <span>Contact Operations Desk</span>
            <ArrowRight size={13} />
          </Link>
        </footer>
      </div>
    </main>
  );
}
