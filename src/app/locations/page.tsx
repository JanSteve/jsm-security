import React from "react";
import Link from "next/link";
import { locationsData } from "@/data/locations";
import { constructMetadata } from "@/lib/seo";
import { brandData } from "@/data/brand";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { Phone, ArrowRight, ShieldCheck, MapPin, Building2, Factory } from "lucide-react";

export const metadata = constructMetadata({
  title: "Tamil Nadu Regional Operations & Industrial Corridors | JSM Integrated Services",
  description: "Ex-Servicemen led security guard forces, 100% EPF/ESIC compliant contract manpower, and mechanized housekeeping across 8 major Tamil Nadu industrial hubs: Trichy, Chennai, Coimbatore, Hosur, Salem, Erode, Madurai, and Tirunelveli.",
  path: "/locations",
  keywords: [
    "Security guard agency Tamil Nadu",
    "Security services Trichy",
    "Corporate security guards Chennai",
    "Industrial security Coimbatore",
    "SIPCOT Hosur manpower contractor",
    "Factory security guards Salem",
    "Perundurai SIPCOT security Erode",
    "Commercial security Madurai",
    "Solar farm security Tirunelveli"
  ]
});

export default function LocationsIndexPage() {
  const bSchema = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Regional Hubs", url: `${brandData.domain}/locations` }
  ]);

  const fSchema = faqSchema([
    {
      question: "Which cities and industrial districts in Tamil Nadu does JSM Integrated Services cover?",
      answer: "JSM operates across all major industrial corridors in Tamil Nadu with dedicated operational divisions in Tiruchirappalli (Central Command HQ), Chennai (OMR & Guindy), Coimbatore (Kurichi & Peelamedu), Hosur (SIPCOT SEZs), Salem (Heavy Engineering), Erode (Perundurai Textile SEZ), Madurai (Southern Hub), and Tirunelveli (Renewable Energy & IT SEZ)."
    },
    {
      question: "What is the emergency deployment SLA for regional industrial sites?",
      answer: "We guarantee a 2-hour relief standby response across our primary operational corridors. Complete site onboarding with site-specific SOPs and verified personnel muster is executed within 48 to 72 hours."
    },
    {
      question: "Does JSM provide Ex-Servicemen (ESM) marshals across all regional outposts?",
      answer: "Yes. Our operations are led by Indian Army Veteran Major AR Devadoss, and our regional supervisory marshals conduct regular unannounced 2:00 AM van audits across all industrial client sites."
    }
  ]);

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fSchema) }}
      />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#080C14]">
        <div className="max-w-[1280px] mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Statewide Operational Network &bull; 8 Strategic Hubs</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Tamil Nadu Industrial Corridors &amp; Regional Hubs
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              From our Central Operations Headquarters in Tiruchirappalli to specialized industrial outposts across Chennai, Coimbatore, Hosur, Salem, Erode, Madurai, and Tirunelveli, JSM Integrated Services provides Ex-Servicemen led physical guarding, 100% EPF/ESIC compliant contract manpower, and mechanized facility management with a guaranteed 2-hour relief standby SLA.
            </p>
          </div>

          {/* Direct Operations Hotline Callout */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-neutral-200 text-black text-sm font-bold transition-colors shadow-2xl press-scale min-h-[44px] w-full sm:w-auto"
            >
              <Phone size={15} />
              <span>Direct Hotline: {brandData.contact.phoneDisplay}</span>
            </a>
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white/5 border border-white/20 hover:bg-white/10 text-white text-sm font-semibold transition-colors min-h-[44px] w-full sm:w-auto"
            >
              <span>Instant Commercial Proposal</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Strategic Hubs Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto space-y-12">
        <div className="space-y-2 text-left">
          <div className="text-xs font-bold text-neutral-400 font-mono uppercase tracking-wider">
            Operational Territory
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Select Your Industrial Corridor
          </h2>
          <p className="text-sm text-neutral-300 max-w-2xl">
            Explore localized security deployment protocols, key manufacturing zones, statutory compliance guarantees, and direct operations contacts for your district.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locationsData.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group p-6 rounded-xl bg-[#080C14] border border-white/10 hover:border-white/30 hover:bg-[#0C111C] transition-all flex flex-col justify-between space-y-5 block min-h-[44px]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                    <MapPin size={14} className="text-white" />
                    <span>{loc.district}</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 border border-white/20 text-neutral-200">
                    {loc.responseSla}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors flex items-center justify-between">
                  <span>{loc.city}</span>
                  <ArrowRight size={16} className="text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                  {loc.operationalOverview}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Key Corridors Covered:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {loc.keyIndustrialZones.slice(0, 3).map((zone, zIdx) => (
                    <span
                      key={zIdx}
                      className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300"
                    >
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Statewide Statutory Standard Banner */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-8 rounded-2xl bg-[#080C14] border border-white/15 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                100% Statutory Indemnity Across All Districts
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Whether deploying in Chennai OMR tech towers, Coimbatore foundries, or Hosur automotive plants, JSM Integrated Services furnishes verified EPF/ESIC ECR challans, wage muster registers, and biometric attendance logs with every monthly commercial invoice—guaranteeing zero principal employer liability under the Contract Labour Act.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="font-semibold text-white">PSARA 2005 Licensed (TN Home Dept)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="font-semibold text-white">Airports Authority of India (AAI) Credential</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="font-semibold text-white">Ex-Servicemen 2:00 AM Night Van Audits</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
