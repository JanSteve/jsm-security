import { industriesData } from "@/data/industries";
import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import { ArrowRight, CheckCircle2, MessageCircle, AlertTriangle, ShieldCheck, Phone, Building2 } from "lucide-react";

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

  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');
  const cleanPhone = brandData.contact.phone.replace(/[^0-9+]/g, '');

  const recommended = servicesData.filter((s) => industry.recommendedServices.includes(s.slug));

  const bSchema = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Industries", url: `${brandData.domain}/industries` },
    { name: industry.shortTitle, url: `${brandData.domain}/industries/${industry.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }}
      />

      {/* Hero Header */}
      <section className="pt-8 pb-16 px-4 md:px-8 border-b border-zinc-200/80 bg-zinc-50/70">
        <div className="container mx-auto max-w-5xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black text-white text-xs font-bold">
            <span>SECTOR OPERATIONAL BLUEPRINT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-tight tracking-tight">
            {industry.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-600 font-medium leading-relaxed max-w-3xl">
            {industry.summary}
          </p>

          <p className="text-xs sm:text-sm font-bold text-[#C5A880]">
            {industry.tagline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg" className="bg-black hover:bg-zinc-800 text-white rounded-full h-11 px-6 text-xs font-bold shadow-md">
              <Link href="/contact">
                Schedule Site Assessment for {industry.shortTitle} <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
            <a
              href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20discuss%20requirements%20for%20${encodeURIComponent(industry.title)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 h-11 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-sm"
            >
              <MessageCircle size={15} className="text-emerald-600" />
              Discuss on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Challenges & JSM Solution Section */}
      <section className="py-16 px-4 md:px-8 bg-white border-b border-zinc-200/80">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Challenges */}
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-8 space-y-4">
            <h2 className="text-lg font-black text-black flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-600" />
              Key Operational Vulnerabilities
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              Common bottlenecks that compromise security, hygiene, and efficiency in this sector:
            </p>
            <ul className="space-y-3 text-xs text-zinc-700 font-medium">
              {industry.operationalChallenges.map((ch, i) => (
                <li key={i} className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-zinc-200/60">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* JSM Solution */}
          <div className="bg-zinc-900 text-white rounded-3xl p-8 space-y-4 border border-zinc-800 shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880]">
                The JSM Operational Model
              </span>
              <h2 className="text-xl font-black text-white leading-snug">
                How We Solve This
              </h2>
              <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                {industry.jsmSolution}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                Measurable Benefits:
              </p>
              {industry.keyBenefits.map((ben, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                  <CheckCircle2 size={14} className="text-[#C5A880] flex-shrink-0" />
                  <span>{ben}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Services for this sector */}
      <section className="py-16 px-4 md:px-8 bg-zinc-50 border-b border-zinc-200/80">
        <div className="container mx-auto max-w-5xl space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
              Recommended Service Stack
            </span>
            <h2 className="text-2xl font-black text-black">
              Integrated Capabilities for {industry.shortTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommended.map((serv) => (
              <Link
                key={serv.slug}
                href={`/services/${serv.slug}`}
                className="p-6 bg-white border border-zinc-200/80 rounded-3xl hover:border-black hover:shadow-md transition-all block space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
                    {serv.categoryLabel}
                  </span>
                  <ArrowRight size={14} className="text-zinc-400" />
                </div>
                <h3 className="text-base font-bold text-black">{serv.title}</h3>
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{serv.valueProposition}</p>
                <span className="text-xs font-bold text-black inline-flex items-center gap-1 pt-1">
                  View Service Scope →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 md:px-8 pt-16 max-w-4xl text-center space-y-4">
        <h3 className="text-2xl font-black text-black">
          Need a site-specific operational assessment?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto font-medium">
          Our field operations team conducts thorough risk and requirement walkthroughs across all cities in Tamil Nadu.
        </p>
        <div className="pt-2">
          <Button asChild className="bg-black hover:bg-zinc-800 text-white rounded-full px-7 h-11 text-xs font-bold">
            <Link href="/contact">Schedule Assessment Now</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
