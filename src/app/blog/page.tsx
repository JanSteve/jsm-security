import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getCategories } from "@/lib/blog";
import { constructMetadata } from "@/lib/seo";
import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import { RadarTelemetryBadge } from "@/components/ui/radar-telemetry-badge";
import { PerspectiveTiltCard } from "@/components/motion/perspective-tilt-card";
import { Phone, ArrowRight, Calendar, Clock, ShieldCheck, ChevronRight } from "lucide-react";

import type { Metadata } from "next";
import { formatBlogMetaTitle, formatMetaDescription } from "@/lib/seo";

const rawDomain = process.env.NEXT_PUBLIC_SITE_URL || brandData.domain || 'https://jsmintegratedservices.com';
const domain = rawDomain.replace('://www.', '://').replace(/\/+$/, '');
const blogTitle = formatBlogMetaTitle("Commercial Security & Facility Intelligence");
const blogDesc = formatMetaDescription("Operational insights, PSARA compliance standards, mechanized housekeeping protocols, and security engineering across South India.", 155);

export const metadata: Metadata = {
  title: {
    absolute: blogTitle,
  },
  description: blogDesc,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: blogTitle,
    description: blogDesc,
    url: `${domain}/blog`,
    siteName: brandData.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${domain}/images/real_jsm_airport_terminal_platoon.jpg`,
        width: 1200,
        height: 630,
        alt: `${blogTitle} - ${brandData.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: blogTitle,
    description: blogDesc,
    site: "@jsmintegrated",
    creator: "@jsmintegrated",
    images: [`${domain}/images/real_jsm_airport_terminal_platoon.jpg`],
  },
  keywords: [
    "Security guard blog Tamil Nadu",
    "PSARA compliance guide 2026",
    "Commercial security intelligence",
    "Industrial housekeeping standards",
    "CCTV access control South India",
    "Facility management blog Trichy Chennai"
  ],
};

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
  }>;
}

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const { category, tag } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getCategories();

  // Filter posts based on active search parameters
  let filteredPosts = allPosts;
  if (category) {
    filteredPosts = filteredPosts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  } else if (tag) {
    filteredPosts = filteredPosts.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }

  // Flagship article is highlighted when on "All" view
  const flagshipPost = !category && !tag ? filteredPosts.find((p) => p.isFlagship) || filteredPosts[0] : null;
  const gridPosts = flagshipPost
    ? filteredPosts.filter((p) => p.slug !== flagshipPost.slug)
    : filteredPosts;

  const bSchema = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Operational Blog", url: `${brandData.domain}/blog` }
  ]);

  return (
    <main className="min-h-screen bg-[#030712] text-white pt-28 pb-24">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }}
      />

      {/* Header / Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 bg-[#080C16]/80 backdrop-blur-2xl">
        <div className="max-w-[1280px] mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <RadarTelemetryBadge
              label="OPERATIONAL INTEL DESK"
              sublabel="VERIFIED ARTICLES"
              pulseColor="cyan"
            />
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="text-cyan-400 font-bold">{allPosts.length} Articles Published</span>
              <span>&bull;</span>
              <span>South India Coverage</span>
            </div>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Security Operations, Compliance &amp; Facility Intelligence
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Technical blueprints, statutory compliance frameworks, mechanized housekeeping protocols, and security engineering insights from the executive command team at JSM Integrated Services.
            </p>
          </div>

          {/* Category Filter Navigation Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <Link
              href="/blog"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                !category && !tag
                  ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                  : "bg-[#080C16] border border-white/10 text-neutral-300 hover:text-white hover:border-cyan-500/40"
              }`}
            >
              All Articles ({allPosts.length})
            </Link>

            {categories.map((cat) => {
              const isActive = category?.toLowerCase() === cat.toLowerCase();
              const count = allPosts.filter((p) => p.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                    isActive
                      ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                      : "bg-[#080C16] border border-white/10 text-neutral-300 hover:text-white hover:border-cyan-500/40"
                  }`}
                >
                  {cat} ({count})
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Active Filter Notice */}
        {(category || tag) && (
          <div className="mb-8 flex items-center justify-between p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
            <div className="text-sm">
              <span className="text-neutral-400">Filtering by: </span>
              <span className="text-cyan-300 font-bold font-mono">
                {category ? `Category: "${category}"` : `Tag: "${tag}"`}
              </span>
              <span className="text-neutral-400 ml-2">({filteredPosts.length} results)</span>
            </div>
            <Link
              href="/blog"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              Reset Filters &times;
            </Link>
          </div>
        )}

        {/* Flagship Featured Article Card */}
        {flagshipPost && (
          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Flagship Field Report &bull; Editor&apos;s Selection</span>
            </div>
            <PerspectiveTiltCard className="rounded-2xl p-1 bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/10">
              <div className="relative rounded-2xl bg-[#080C16]/95 border border-cyan-500/30 p-6 sm:p-8 lg:p-10 backdrop-blur-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold">
                        {flagshipPost.category}
                      </span>
                      <span className="flex items-center gap-1 text-neutral-400">
                        <Clock size={12} className="text-cyan-400" />
                        <span>{flagshipPost.readTime}</span>
                      </span>
                      <span className="flex items-center gap-1 text-neutral-400">
                        <Calendar size={12} className="text-cyan-400" />
                        <span>{flagshipPost.date}</span>
                      </span>
                    </div>

                    <Link href={`/blog/${flagshipPost.slug}`}>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white hover:text-cyan-300 transition-colors leading-tight">
                        {flagshipPost.title}
                      </h2>
                    </Link>

                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed line-clamp-3">
                      {flagshipPost.excerpt}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        {flagshipPost.author.avatar && (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-500/40">
                            <Image
                              src={flagshipPost.author.avatar}
                              alt={flagshipPost.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-bold text-white">{flagshipPost.author.name}</div>
                          <div className="text-xs text-cyan-400/80 font-mono">{flagshipPost.author.role}</div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${flagshipPost.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 text-black font-semibold text-xs tracking-wider uppercase hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] active:scale-[0.98]"
                      >
                        <span>Read Full Blueprint</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {flagshipPost.coverImage && (
                    <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-xl overflow-hidden border border-cyan-500/20">
                      <Image
                        src={flagshipPost.coverImage}
                        alt={flagshipPost.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080C16] via-transparent to-transparent opacity-60" />
                    </div>
                  )}
                </div>
              </div>
            </PerspectiveTiltCard>
          </div>
        )}

        {/* Standard Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridPosts.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col justify-between rounded-xl bg-[#080C16]/80 border border-white/10 hover:border-cyan-500/40 p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] backdrop-blur-xl"
            >
              <div className="space-y-4">
                {/* Visual Thumbnail */}
                {post.coverImage && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block h-44 rounded-lg overflow-hidden border border-white/10 group-hover:border-cyan-500/30 transition-colors"
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#030712]/90 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300 backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                  </Link>
                )}

                {/* Metadata Row */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-cyan-400" />
                    <span>{post.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-cyan-400" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags preview */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Author & Footer Link */}
              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {post.author.avatar && (
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-cyan-500/30">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="text-xs font-medium text-neutral-200">{post.author.name}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Read Intel</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <p className="text-neutral-400 font-mono text-sm">No articles found matching this filter.</p>
            <Link
              href="/blog"
              className="inline-block px-4 py-2 rounded-full bg-cyan-500 text-black font-semibold text-xs"
            >
              View All Articles
            </Link>
          </div>
        )}

        {/* Bottom Tactical Hotline Conversion Box */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#080C16] via-[#0C1322] to-[#080C16] border border-cyan-500/30 shadow-[0_0_40px_rgba(14,165,233,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
              <ShieldCheck size={14} />
              <span>Ready for Operational Deployment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Need Military-Disciplined Security or Mechanized Facility Management?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl">
              2-Hour relief standby SLA, 100% EPF/ESIC statutory compliance, and Ex-Servicemen leadership across Tamil Nadu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)] active:scale-[0.98]"
            >
              <Phone size={14} />
              <span>Call: {brandData.contact.phoneDisplay}</span>
            </a>
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#030712] border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-500/10 transition-all"
            >
              <span>Instant Proposal</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
