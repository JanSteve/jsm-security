import { locationsData } from "@/data/locations";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brandData } from "@/data/brand";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Check } from "lucide-react";

export function generateStaticParams() {
  return locationsData.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);
  if (!location) return { title: "Location Not Found" };

  return constructMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
    keywords: [
      `Security Guards in ${location.city}`,
      `Security Agency ${location.city}`,
      `Manpower Staffing ${location.city}`,
      `Facility Management ${location.district}`,
      `100% EPF & ESIC Compliant Security ${location.city}`
    ]
  });
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = locationsData.find((l) => l.slug === slug);
  if (!loc) notFound();

  const isHq = loc.slug === "trichy";

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Locations", url: `${brandData.domain}/locations` },
    { name: loc.city, url: `${brandData.domain}/locations/${loc.slug}` },
  ]);

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `JSM Integrated Services - ${loc.city}`,
    "description": loc.metaDescription,
    "url": `${brandData.domain}/locations/${loc.slug}`,
    "telephone": loc.phone,
    "email": loc.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": loc.address,
      "addressLocality": loc.district,
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "City",
      "name": loc.city
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "100% EPF & ESIC Compliant License",
        "recognizedBy": {
          "@type": "GovernmentOrganization",
          "name": "Home Department, Government of Tamil Nadu"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Professional Private Security & Facility Operations Quality Management System Certification"
      }
    ]
  };

  const fSchema = faqSchema(loc.localFaqs);

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header / Hero */}
        <section className="py-8 sm:py-12 border-b border-[#E4E7EC]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2A47]/8 text-[#0F2A47] text-xs font-semibold">
              <MapPin size={14} />
              <span>{loc.regionType}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-bold tracking-tight">
              {loc.heroHeadline}
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              {loc.heroSubheadline}
            </p>
          </div>
        </section>

        {/* Operational Overview & Key District Fast Facts */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F2A47]">
                Operational Scope & Capabilities
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-bold">
                Local Command Structure in {loc.city}
              </h2>
              <p className="text-sm sm:text-base text-[#5A6578] leading-relaxed">
                {loc.operationalOverview}
              </p>
            </div>

            {/* Industrial Zones & Deployment Sectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E4E7EC]">
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-[#14181F] flex items-center gap-2">
                  <Building2 size={16} className="text-[#0F2A47]" />
                  <span>Key Industrial Zones</span>
                </h3>
                <ul className="space-y-2 text-xs text-[#5A6578]">
                  {loc.keyIndustrialZones.map((zone, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={14} className="text-[#0F2A47] shrink-0 mt-0.5" />
                      <span>{zone}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-[#14181F] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#0F2A47]" />
                  <span>Core Sectors Served</span>
                </h3>
                <ul className="space-y-2 text-xs text-[#5A6578]">
                  {loc.deploymentSectors.map((sector, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={14} className="text-[#0F2A47] shrink-0 mt-0.5" />
                      <span>{sector}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* District Operational Specs Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-[#E4E7EC] bg-[#F8F9FA] p-6 sm:p-7 space-y-6">
              <div className="border-b border-[#E4E7EC] pb-4">
                <span className="text-[10px] font-mono font-bold uppercase text-[#0F2A47] tracking-wider bg-[#0F2A47]/8 px-2 py-0.5 rounded">
                  {loc.district} Operational Roster
                </span>
                <h3 className="font-display text-lg font-bold text-[#14181F] mt-2">
                  District Command Specifications
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[#5A6578] font-medium block">Response SLA:</span>
                  <span className="font-semibold text-[#14181F] text-sm flex items-center gap-1.5 mt-0.5">
                    <Clock size={14} className="text-[#0F2A47]" />
                    {loc.responseSla}
                  </span>
                </div>

                <div>
                  <span className="text-[#5A6578] font-medium block">Supervisory Governance:</span>
                  <span className="font-semibold text-[#14181F] mt-0.5 block">
                    {loc.supervisoryModel}
                  </span>
                </div>

                <div>
                  <span className="text-[#5A6578] font-medium block">Operating Address:</span>
                  <span className="font-normal text-[#14181F] mt-0.5 block leading-relaxed">
                    {loc.address}
                  </span>
                </div>

                <div>
                  <span className="text-[#5A6578] font-medium block">Direct Operations Contact:</span>
                  <div className="flex items-center gap-4 mt-1">
                    <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="font-semibold text-[#0F2A47] hover:underline">
                      {loc.phone}
                    </a>
                    <a href={`mailto:${loc.email}`} className="font-semibold text-[#0F2A47] hover:underline">
                      Email Desk
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E4E7EC] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6578]">
                  Statutory Guarantees:
                </span>
                <ul className="space-y-1.5 text-xs text-[#14181F]">
                  {loc.complianceHighlights.map((comp, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#0F2A47] shrink-0" />
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/get-quote"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#0F2A47] hover:bg-[#0A1E33] text-white text-xs font-semibold py-3 transition-colors shadow-xs min-h-[44px]"
              >
                <span>Request {loc.city} Proposal</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>

        {/* Local FAQs */}
        <section className="space-y-6 pt-8 border-t border-[#E4E7EC]">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F2A47]">
              District Clarifications
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-bold">
              Frequently Answered Questions — {loc.city}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loc.localFaqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-lg border border-[#E4E7EC] bg-[#F8F9FA]/60 space-y-2">
                <h3 className="text-sm font-semibold text-[#14181F]">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A6578] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-[#0F2A47] rounded-xl p-8 sm:p-12 text-center text-white space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl text-white font-bold tracking-tight max-w-2xl mx-auto">
            Schedule a physical security or facility assessment in {loc.city}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Our area operations officers conduct structured on-site risk audits with 24-hour statutory pricing estimates.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-white text-[#0F2A47] text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-xs min-h-[44px] w-full sm:w-auto"
            >
              <span>Get Proposal for {loc.city}</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition-colors min-h-[44px] w-full sm:w-auto"
            >
              <span>Contact Operations Desk</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
