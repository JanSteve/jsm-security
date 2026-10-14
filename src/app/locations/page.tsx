import React from "react";
import Link from "next/link";
import { locationsData } from "@/data/locations";
import { constructMetadata } from "@/lib/seo";
import { brandData } from "@/data/brand";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { Phone, ArrowRight, ShieldCheck, MapPin } from "lucide-react";

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
    <main className="min-h-screen bg-[#030712] text-white pt-28 pb-20">
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
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 bg-[#080C16]/80 backdrop-blur-2xl">
        <div className="max-w-[1280px] mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
            <span>Statewide Operational Network &bull; 8 Strategic Hubs</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Tamil Nadu Industrial Corridors &amp; Regional Hubs
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Statewide Ex-Servicemen guarding, 100% EPF/ESIC contract staffing, and mechanized facility management across 8 industrial hubs with a guaranteed 2-hour relief SLA.
            </p>

            {/* High-Contrast Regional Metric Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#080C16] border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold shadow-[0_0_10px_rgba(14,165,233,0.12)]">
                2-HOUR RELIEF SLA
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#080C16] border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold shadow-[0_0_10px_rgba(14,165,233,0.12)]">
                100% EPF &amp; ESIC
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#080C16] border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold shadow-[0_0_10px_rgba(14,165,233,0.12)]">
                ZERO CLIENT LIABILITY
              </span>
            </div>
          </div>

          {/* Direct Operations Hotline Callout */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${brandData.contact.phone}`}
              className="btn-border-beam min-touch-target min-h-[44px] w-full sm:w-auto"
            >
              <span className="btn-border-beam-inner h-full">
                <Phone size={15} className="text-cyan-300" />
                <span>Direct Hotline: {brandData.contact.phoneDisplay}</span>
              </span>
            </a>
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white/5 border border-white/20 hover:border-cyan-400/40 hover:bg-cyan-950/20 text-neutral-200 hover:text-white text-sm font-semibold transition-all min-h-[44px] w-full sm:w-auto"
            >
              <span>Instant Commercial Proposal</span>
              <ArrowRight size={14} className="text-cyan-300" />
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
              className="group p-6 rounded-xl tactical-glass-card border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all flex flex-col justify-between space-y-5 block min-h-[44px] text-white"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                    <MapPin size={14} className="text-cyan-400" />
                    <span>{loc.district}</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                    {loc.responseSla}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors flex items-center justify-between">
                  <span>{loc.city}</span>
                  <ArrowRight size={16} className="text-neutral-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {loc.operationalOverview}
                </p>

                {loc.operationalBadges && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {loc.operationalBadges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-3 border-t border-cyan-500/20">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                  Key Corridors Covered:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {loc.keyIndustrialZones.slice(0, 3).map((zone, zIdx) => (
                    <span
                      key={zIdx}
                      className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-cyan-500/20 text-neutral-300"
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
        <div className="p-8 rounded-2xl tactical-glass-card border border-cyan-500/30 shadow-[0_0_40px_rgba(14,165,233,0.15)] space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
              <ShieldCheck size={24} className="text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                100% Statutory Indemnity Across All Districts
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Every monthly invoice includes verified EPF/ESIC ECR challans, wage muster rolls, and biometric attendance logs—eliminating all client liability under the Contract Labour Act.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-cyan-500/20 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
              <span className="font-semibold text-white">PSARA 2005 Licensed (TN Home Dept)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
              <span className="font-semibold text-white">Airports Authority of India (AAI) Credential</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
              <span className="font-semibold text-white">Ex-Servicemen 2:00 AM Night Van Audits</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
