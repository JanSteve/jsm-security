import React from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { hundredDaysBlogSchedule } from "@/data/blog-100-days";
import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";
import { 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  FileText,
  Search
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Operating Insights & 100-Day Knowledge Hub",
  description: "Read authoritative compliance guides, security auditing frameworks, and facility management research from JSM Integrated Services.",
  path: "/blog",
});

export default function BlogListingPage() {
  const flagshipPost = blogPosts.find((p) => p.isFlagship) || blogPosts[0];
  const otherPosts = blogPosts.filter((p) => p.slug !== flagshipPost?.slug);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Blog & Knowledge Hub", url: `${brandData.domain}/blog` },
  ]);

  return (
    <main className="min-h-screen bg-white text-[#1A1F2E] pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hub Header */}
        <div className="max-w-3xl space-y-3 text-left border-b border-[#E5E7EB] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-semibold text-[#1E5BA8]">
            <BookOpen size={14} />
            <span>100-Day Knowledge Strategy &bull; Pan-India SEO Hub</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F1922] tracking-tight">
            Operating Insights &amp; Statutory Compliance Guides
          </h1>
          <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed">
            Practical procurement blueprints, PSARA legal analyses, and facility management frameworks authored by our operations directorate.
          </p>
        </div>

        {/* Flagship Signature Guide */}
        {flagshipPost && (
          <div className="bg-[#F8F9FA] border border-[#E5E7EB] p-6 sm:p-10 space-y-4 text-left shadow-subtle">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono font-bold text-[#1E5BA8] bg-white px-2.5 py-0.5 border border-[#E5E7EB]">
                ★ Signature Publication
              </span>
              <span className="text-[#4A5160] font-medium">{flagshipPost.category}</span>
              <span className="text-[#4A5160]">&bull;</span>
              <span className="text-[#4A5160]">{flagshipPost.readTime}</span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0F1922] leading-snug">
              <Link href={`/blog/${flagshipPost.slug}`} className="hover:text-[#1E5BA8] transition-colors">
                {flagshipPost.title}
              </Link>
            </h2>

            <p className="text-xs sm:text-sm text-[#4A5160] leading-relaxed max-w-3xl">
              {flagshipPost.excerpt}
            </p>

            <div className="pt-3 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-[#4A5160]">
                <span className="flex items-center gap-1.5">
                  <User size={13} className="text-[#1E5BA8]" />
                  <span>{flagshipPost.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#1E5BA8]" />
                  <span>{flagshipPost.date}</span>
                </span>
              </div>

              <Link
                href={`/blog/${flagshipPost.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F1922] hover:text-[#1E5BA8]"
              >
                <span>Read Guide</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {/* Published Field Dispatches Grid */}
        <div className="space-y-6 text-left">
          <h3 className="text-lg font-semibold text-[#0F1922]">
            Latest Field Publications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-white border border-[#E5E7EB] p-6 space-y-3 flex flex-col justify-between shadow-subtle text-left"
              >
                <div className="space-y-2.5">
                  <span className="text-[11px] font-semibold text-[#1E5BA8] block">
                    {post.category}
                  </span>
                  <h4 className="text-base font-semibold text-[#0F1922] leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#1E5BA8] transition-colors">
                      {post.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-[#4A5160] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#4A5160]">
                  <span>{post.readTime}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-semibold text-[#0F1922] hover:text-[#1E5BA8] flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 100-Day SEO Content Strategy Roadmap */}
        <div className="space-y-6 pt-10 border-t border-[#E5E7EB] text-left">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-semibold text-[#10A870] uppercase tracking-wider">
              Editorial Roadmap
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#0F1922]">
              The 100-Day Thought Leadership Calendar
            </h3>
            <p className="text-xs text-[#4A5160]">
              Scheduled daily publications establishing JSM as the #1 authority in physical security, contract workforce, and facility compliance across South India.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#E5E7EB] bg-white">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8F9FA] border-b border-[#E5E7EB] text-[#1A1F2E] font-semibold">
                <tr>
                  <th className="p-3">Day</th>
                  <th className="p-3">Strategic Title &amp; Scope</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Target Keyword</th>
                  <th className="p-3">Word Count</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {hundredDaysBlogSchedule.slice(0, 30).map((b) => (
                  <tr key={b.day} className="hover:bg-[#F8F9FA]/60">
                    <td className="p-3 font-mono font-semibold text-[#0F1922]">Day {b.day}</td>
                    <td className="p-3 font-medium text-[#1A1F2E]">{b.title}</td>
                    <td className="p-3 text-[#4A5160]">{b.category}</td>
                    <td className="p-3 font-mono text-[#1E5BA8] text-[11px]">{b.targetKeyword}</td>
                    <td className="p-3 text-[#4A5160] tabular-nums font-mono">~{b.wordCount}w</td>
                    <td className="p-3">
                      {b.isPublished ? (
                        <span className="text-[10px] font-bold text-[#10A870] bg-[#E8F8F2] px-2 py-0.5 rounded-[2px] border border-[#10A870]/20">
                          Published
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[#4A5160] bg-[#F8F9FA] px-2 py-0.5 border border-[#E5E7EB]">
                          Scheduled (08:00 IST)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#4A5160]">
              Showing first 30 of 100 scheduled entries &bull; Automated syndication to LinkedIn &bull; Twitter &bull; WhatsApp
            </span>
          </div>
        </div>

        {/* Lead Magnet Callout */}
        <div className="p-6 sm:p-8 bg-[#0F1922] text-white flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[4px] text-left">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-lg font-semibold text-white">
              Download the 2026 Facility &amp; Security Audit Checklist (.docx)
            </h4>
            <p className="text-xs text-neutral-300">
              A 32-point inspection framework covering PSARA licensing, EPF/ESIC verification, CCTV maintenance, and emergency response.
            </p>
          </div>
          <a
            href="/downloads/JSM-Compliance-Checklist.docx"
            download
            className="px-6 h-[44px] rounded-[4px] bg-[#10A870] hover:bg-[#0D875A] text-white text-xs font-semibold flex items-center gap-2 shrink-0 transition-colors shadow-subtle min-touch-target"
          >
            <FileText size={15} />
            <span>Download Checklist (.docx)</span>
          </a>
        </div>
      </div>
    </main>
  );
}
