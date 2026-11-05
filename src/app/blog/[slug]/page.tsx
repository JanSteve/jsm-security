import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllPosts,
  getPostBySlug,
  extractTableOfContents,
  renderMarkdown,
  getRelatedPosts,
} from "@/lib/blog";
import { constructMetadata, formatBlogMetaTitle, formatMetaDescription } from "@/lib/seo";
import { brandData } from "@/data/brand";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  blogPostingSchema,
  blogBreadcrumbSchema,
  blogFaqSchema,
} from "@/lib/schema";
import {
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight,
  List,
  HelpCircle,
  Share2,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const rawDomain = process.env.NEXT_PUBLIC_SITE_URL || brandData.domain || 'https://jsmintegratedservices.com';
  const domain = rawDomain.replace('://www.', '://').replace(/\/+$/, '');

  if (!post) {
    const fallbackTitle = formatBlogMetaTitle("Article Not Found");
    return {
      title: { absolute: fallbackTitle },
      description: "The requested intelligence article could not be located.",
      alternates: { canonical: `https://jsmintegratedservices.com/blog/${slug}` },
    };
  }

  // Strictly clamp title <= 58 chars and description <= 155 chars
  const clampedTitle = formatBlogMetaTitle(post.metaTitle || post.title);
  const clampedDescription = formatMetaDescription(post.metaDescription || post.excerpt, 155);

  const canonicalUrl = `https://jsmintegratedservices.com/blog/${post.slug}`;
  const publishIso = post.date.includes('T') ? post.date : `${post.date}T08:00:00+05:30`;
  const modifiedIso = post.lastModified
    ? (post.lastModified.includes('T') ? post.lastModified : `${post.lastModified}T08:00:00+05:30`)
    : publishIso;

  const absoluteImageUrl = post.coverImage
    ? (post.coverImage.startsWith('http://') || post.coverImage.startsWith('https://')
        ? post.coverImage
        : `${domain}${post.coverImage.startsWith('/') ? '' : '/'}${post.coverImage}`)
    : `${domain}/images/real_jsm_airport_terminal_platoon.jpg`;

  return {
    title: {
      absolute: clampedTitle,
    },
    description: clampedDescription,
    alternates: {
      canonical: `https://jsmintegratedservices.com/blog/${post.slug}`,
    },
    openGraph: {
      title: clampedTitle,
      description: clampedDescription,
      url: canonicalUrl,
      siteName: brandData.name,
      locale: "en_IN",
      type: "article",
      publishedTime: publishIso,
      modifiedTime: modifiedIso,
      authors: [`${domain}/about`],
      section: post.category,
      tags: post.tags && post.tags.length > 0 ? post.tags : post.keywords,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: `${clampedTitle} - ${brandData.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: clampedTitle,
      description: clampedDescription,
      site: "@jsmintegrated",
      creator: "@jsmintegrated",
      images: [absoluteImageUrl],
    },
    keywords: post.keywords && post.keywords.length > 0 ? post.keywords : [post.category, "JSM Security", "JSM Integrated Services"],
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = extractTableOfContents(post.content);
  const htmlContent = await renderMarkdown(post.content);
  const relatedPosts = getRelatedPosts(post.slug, 3);

  // Structured Data Schemas
  const bSchema = blogBreadcrumbSchema({ title: post.title, slug: post.slug });

  const aSchema = blogPostingSchema(post);

  const fSchema = blogFaqSchema(post.faqs);

  return (
    <main className="min-h-screen bg-[#030712] text-white pt-28 pb-24">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aSchema) }}
      />
      {fSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fSchema) }}
        />
      )}

      {/* Article Header Hero */}
      <header className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 bg-[#080C16]/80 backdrop-blur-2xl">
        <div className="max-w-[1280px] mx-auto space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400 flex-wrap">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-neutral-600" />
            <Link href="/blog" className="hover:text-cyan-400 transition-colors">
              Operational Blog
            </Link>
            <ChevronRight size={12} className="text-neutral-600" />
            <span className="text-cyan-300 font-semibold truncate max-w-xs sm:max-w-md">
              {post.category}
            </span>
          </nav>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold hover:bg-cyan-500/30 transition-colors"
            >
              {post.category}
            </Link>
            <span className="flex items-center gap-1 text-neutral-400">
              <Clock size={12} className="text-cyan-400" />
              <span>{post.readTime}</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-400">
              <Calendar size={12} className="text-cyan-400" />
              <span>Published {post.date}</span>
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-4xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Badge & Share Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              {post.author.avatar && (
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-cyan-500/40 shadow-[0_0_12px_rgba(14,165,233,0.25)]">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{post.author.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                    Verified Byline
                  </span>
                </div>
                <div className="text-xs text-neutral-400 font-mono">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${post.title} - ${brandData.domain}/blog/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 hover:border-emerald-500/40 text-xs font-mono text-neutral-300 hover:text-emerald-400 transition-colors"
              >
                <Share2 size={13} />
                <span>Share WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Article Body Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Featured Cover Image */}
            {post.coverImage && (
              <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080C16] via-transparent to-transparent opacity-50" />
              </div>
            )}

            {/* Mobile Table of Contents Accordion */}
            {toc.length > 0 && (
              <div className="block lg:hidden rounded-xl bg-[#080C16] border border-cyan-500/30 p-4">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-mono font-bold text-cyan-300">
                    <span className="flex items-center gap-2">
                      <List size={16} />
                      <span>Table of Contents ({toc.length} Sections)</span>
                    </span>
                    <span className="text-xs text-neutral-400 group-open:rotate-90 transition-transform">
                      &rarr;
                    </span>
                  </summary>
                  <ul className="mt-3 pt-3 border-t border-white/10 space-y-2 text-xs font-mono">
                    {toc.map((item) => (
                      <li
                        key={item.id}
                        className={item.level === 3 ? "pl-4 text-neutral-400" : "text-neutral-200"}
                      >
                        <a
                          href={`#${item.id}`}
                          className="hover:text-cyan-300 transition-colors"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            )}

            {/* Rendered HTML Markdown Body */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Structured FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12 pt-8 border-t border-cyan-500/20 space-y-6">
                <div className="flex items-center gap-2">
                  <HelpCircle className="text-cyan-400" size={20} />
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-4">
                  {post.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-xl bg-[#080C16] border border-white/10 hover:border-cyan-500/30 transition-colors"
                    >
                      <h3 className="text-base font-bold text-cyan-300 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Article Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 mr-1">Filed under:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Author Profile Bio Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#080C16] to-[#0C1322] border border-cyan-500/30 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {post.author.avatar && (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-cyan-400 shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Author &bull; Operational Leadership
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {post.author.name}
                  </h3>
                  <div className="text-xs text-neutral-300 font-mono">
                    {post.author.role} &bull; JSM Integrated Services
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
                    Directing military-disciplined guarding, statutory labour compliance, and mechanized facility management across Tamil Nadu. Proven institutional track record with the Airports Authority of India (AAI) at Tiruchirappalli International Airport.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
                    >
                      <span>Read Executive Command Profile</span>
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* In-Article Conversion Callout */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#080C16] to-emerald-950/30 border border-cyan-500/40 shadow-[0_0_30px_rgba(14,165,233,0.2)] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-2">
                  <ShieldCheck size={14} />
                  <span>2-Hour Relief Standby SLA</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  Schedule an On-Site Security or Hygiene Audit
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                  Connect with JSM Central Command for verified manpower, PSARA-compliant guarding, and mechanized housekeeping.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href={`tel:${brandData.contact.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)]"
                >
                  <Phone size={14} />
                  <span>{brandData.contact.phoneDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/${brandData.contact.whatsapp}?text=${encodeURIComponent(
                    `Hello JSM, I read your article "${post.title}" and would like to request an operational assessment.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#030712] border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider hover:bg-emerald-500/10 transition-all"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Sticky Desktop Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-6">
              {/* Desktop Table of Contents */}
              {toc.length > 0 && (
                <div className="hidden lg:block p-6 rounded-2xl bg-[#080C16] border border-cyan-500/30 backdrop-blur-xl">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                    <List size={14} />
                    <span>Table of Contents</span>
                  </div>
                  <nav className="mt-4 max-h-[420px] overflow-y-auto space-y-2.5 text-xs font-mono">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block transition-colors hover:text-cyan-300 leading-snug ${
                          item.level === 3
                            ? "pl-4 text-neutral-400 hover:text-cyan-300"
                            : "text-neutral-200 font-medium"
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Instant Operations Action Card */}
              <div className="p-6 rounded-2xl bg-[#080C16] border border-cyan-500/30 shadow-[0_0_25px_rgba(14,165,233,0.15)] space-y-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono text-cyan-300 font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Central Operations Desk</span>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">24/7 Rapid Deployment</div>
                  <p className="text-xs text-neutral-400">
                    Direct line to Operations Commander. Sub-10 second phone response.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={`tel:${brandData.contact.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                  >
                    <Phone size={14} />
                    <span>Call: {brandData.contact.phoneDisplay}</span>
                  </a>

                  <Link
                    href="/get-quote"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#030712] border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-500/10 transition-all"
                  >
                    <span>Instant Proposal &rarr;</span>
                  </Link>
                </div>

                <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-neutral-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck size={12} />
                    <span>100% EPF &amp; ESIC Statutory Proof</span>
                  </div>
                  <div>&bull; PSARA License Verified</div>
                  <div>&bull; Trichy International Airport Benchmark</div>
                </div>
              </div>

              {/* Related Posts Card */}
              {relatedPosts.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#080C16] border border-white/10 space-y-4">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Related Operational Intel
                  </div>

                  <div className="space-y-4">
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/blog/${rel.slug}`}
                        className="group block space-y-1 border-b border-white/5 pb-3 last:border-b-0 last:pb-0"
                      >
                        <div className="text-[11px] font-mono text-cyan-400/80">
                          {rel.category} &bull; {rel.readTime}
                        </div>
                        <h5 className="text-xs font-bold text-neutral-200 group-hover:text-cyan-300 transition-colors leading-snug">
                          {rel.title}
                        </h5>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
