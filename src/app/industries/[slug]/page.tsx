import { industriesData } from "@/data/industries";
import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import { ArrowRight, CheckCircle2, MessageCircle, AlertTriangle, ShieldCheck, Phone, Building2, Mail } from "lucide-react";

export function generateStaticParams() {
  return industriesData.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: {
      canonical: `${brandData.domain}/industries/${industry.slug}`,
    },
    openGraph: {
      title: `${industry.title} | ${brandData.name}`,
      description: industry.metaDescription,
      url: `${brandData.domain}/industries/${industry.slug}`,
    }
  };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) notFound();

  const recommended = servicesData.filter((s) => industry.recommendedServices.includes(s.slug));

  const bSchema = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Industries", url: `${brandData.domain}/industries` },
    { name: industry.shortTitle, url: `${brandData.domain}/industries/${industry.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] pt-28 pb-24 selection:bg-[#0071e3]/15 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }}
      />

      {/* Hero Header */}
      <section className="pt-8 pb-16 px-4 md:px-8 border-b border-black/[0.08] bg-[#f5f5f7]">
        <div className="container mx-auto max-w-5xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold">
            <span>SECTOR OPERATIONAL BLUEPRINT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] leading-tight tracking-tight">
            {industry.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#86868b] font-normal leading-relaxed max-w-3xl">
            {industry.summary}
          </p>

          <p className="text-xs sm:text-sm font-semibold text-[#0071e3]">
            {industry.tagline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg" className="bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full h-11 px-7 text-xs font-semibold shadow-sm min-h-[44px]">
              <Link href="/contact">
                Schedule Site Assessment for {industry.shortTitle} <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
            <a
              href="mailto:jsmintegratedservices@outlook.com?subject=Industry%20Consultation"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-[#e8e8ed] text-[#1d1d1f] border border-black/[0.08] text-xs font-semibold rounded-full transition-all shadow-sm min-h-[44px]"
            >
              <Mail size={15} />
              Discuss via Email
            </a>
          </div>
        </div>
      </section>

      {/* Challenges & JSM Solution Section */}
      <section className="py-16 px-4 md:px-8 bg-white border-b border-black/[0.08]">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Challenges */}
          <div className="bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] p-8 space-y-4">
            <h2 className="text-lg font-semibold text-[#1d1d1f] flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-600" />
              Key Operational Vulnerabilities
            </h2>
            <p className="text-xs text-[#86868b] font-normal">
              Common bottlenecks that compromise security, hygiene, and efficiency in this sector:
            </p>
            <ul className="space-y-3 text-xs text-[#1d1d1f] font-normal">
              {industry.operationalChallenges.map((ch, i) => (
                <li key={i} className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-black/[0.06] shadow-sm">
                  <span className="text-[#0071e3] font-bold">•</span>
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* JSM Solution */}
          <div className="bg-[#f5f5f7] text-[#1d1d1f] rounded-[28px] p-8 space-y-4 border border-black/[0.08] shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0071e3]">
                The JSM Operational Model
              </span>
              <h2 className="text-xl font-semibold text-[#1d1d1f] leading-snug">
                How We Solve This
              </h2>
              <p className="text-xs text-[#86868b] leading-relaxed font-normal">
                {industry.jsmSolution}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-black/[0.06]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
                Measurable Benefits:
              </p>
              {industry.keyBenefits.map((ben, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#1d1d1f] font-normal">
                  <CheckCircle2 size={14} className="text-[#0071e3] flex-shrink-0" />
                  <span>{ben}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Services for this sector */}
      <section className="py-16 px-4 md:px-8 bg-[#f5f5f7] border-b border-black/[0.08]">
        <div className="container mx-auto max-w-5xl space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
              Recommended Service Stack
            </span>
            <h2 className="text-2xl font-semibold text-[#1d1d1f]">
              Integrated Capabilities for {industry.shortTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommended.map((serv) => (
              <Link
                key={serv.slug}
                href={`/services/${serv.slug}`}
                className="p-6 bg-white border border-black/[0.08] rounded-[28px] hover:border-black/[0.2] hover:shadow-md transition-all block space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                    {serv.categoryLabel}
                  </span>
                  <ArrowRight size={14} className="text-[#86868b]" />
                </div>
                <h3 className="text-base font-semibold text-[#1d1d1f]">{serv.title}</h3>
                <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed">{serv.valueProposition}</p>
                <span className="text-xs font-semibold text-[#0071e3] inline-flex items-center gap-1 pt-1">
                  View Service Scope →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 md:px-8 pt-16 max-w-4xl text-center space-y-4">
        <h3 className="text-2xl font-semibold text-[#1d1d1f]">
          Need a site-specific operational assessment?
        </h3>
        <p className="text-sm text-[#86868b] max-w-xl mx-auto font-normal">
          Our field operations team conducts thorough risk and requirement walkthroughs across all cities in Tamil Nadu.
        </p>
        <div className="pt-2">
          <Button asChild className="bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full px-8 h-11 text-xs font-semibold shadow-sm min-h-[44px]">
            <Link href="/contact">Schedule Assessment Now</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
