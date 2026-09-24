import { knowledgeArticles } from "@/data/knowledge-base";
import { brandData } from "@/data/brand";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import { 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  FileCheck, 
  Award, 
  CheckCircle2 
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Knowledge Center & Regulatory Compliance Hub",
  description: "Authoritative guides on PSARA 2005 licensing in Tamil Nadu, EPF/ESIC labour law liabilities, DGR Ex-Servicemen norms, and vendor audit checklists.",
  path: "/knowledge",
  keywords: [
    "PSARA License Tamil Nadu Guide",
    "Security Guard Compliance Checklist",
    "EPF ESIC Manpower Liability",
    "DGR Ex-Servicemen Security Norms",
    "Facility Management Vendor Audit"
  ]
});

export default function KnowledgeHubPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Knowledge Center", url: `${brandData.domain}/knowledge` },
  ]);

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Page Header */}
        <section className="py-8 sm:py-12 border-b border-[#E7E5E0]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <BookOpen size={14} />
              <span>Statutory Compliance & Operational Authority</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-bold tracking-tight">
              Knowledge Center & Statutory Standards
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              Practical, practitioner-written guides on private security regulation, labour law indemnity, and operational governance across Tamil Nadu and South India.
            </p>
          </div>
        </section>

        {/* Featured Authority Guides Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {knowledgeArticles.map((art) => (
            <article 
              key={art.slug}
              className="rounded-xl border border-[#E7E5E0] bg-[#F8F9FA]/70 hover:bg-white hover:border-[#0B3D2E]/40 hover:shadow-xs transition-all duration-200 p-7 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B3D2E] bg-[#0B3D2E]/8 px-2.5 py-1 rounded">
                    {art.categoryBadge}
                  </span>
                  <span className="text-[11px] text-[#5A6578] flex items-center gap-1 font-medium">
                    <Clock size={12} className="text-[#0B3D2E]" />
                    <span>{art.readTime}</span>
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#14181F] leading-snug">
                  <Link href={`/knowledge/${art.slug}`} className="hover:text-[#0B3D2E] transition-colors">
                    {art.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#5A6578] leading-relaxed">
                  {art.excerpt}
                </p>

                {/* Key Takeaways Preview */}
                <div className="pt-3 border-t border-[#E7E5E0]/80 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#5A6578]">
                    Key Regulatory Takeaway:
                  </span>
                  <p className="text-xs text-[#14181F] bg-white border border-[#E7E5E0] p-3 rounded-lg leading-relaxed">
                    {art.keyTakeaways[0]}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E7E5E0]/80 flex items-center justify-between">
                <div className="text-xs text-[#5A6578]">
                  <span className="font-semibold text-[#14181F] block">{art.author.name}</span>
                  <span className="text-[11px]">{art.author.role}</span>
                </div>
                <Link
                  href={`/knowledge/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B3D2E] hover:text-[#145C43] group"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Audit Assistance Consultation Banner */}
        <section className="rounded-xl border border-[#E7E5E0] bg-[#0B3D2E] text-white p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight max-w-2xl mx-auto">
            Need an objective vendor compliance audit for your facility?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Our Head of Operations, Major AR Devadoss, conducts physical security vulnerability inspections and statutory labour compliance checks with detailed actionable reporting.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#0B3D2E] text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-xs"
            >
              <span>Schedule Compliance Audit</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/security-agencies"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition-colors"
            >
              <span>View PSARA Legal Framework</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
