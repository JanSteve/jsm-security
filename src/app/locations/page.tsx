import { locationsData } from "@/data/locations";
import { brandData } from "@/data/brand";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import { 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Phone, 
  Building2, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Operational Locations & District Command Hubs",
  description: "Explore JSM Integrated Services operational district hubs across Tamil Nadu: Trichy Headquarters, Chennai OMR, Coimbatore, Hosur SIPCOT, Salem, Erode, Madurai, and Tirunelveli.",
  path: "/locations",
  keywords: [
    "Security Guard Agency Trichy",
    "Security Services Chennai OMR",
    "Manpower Supply Coimbatore",
    "Industrial Security Hosur SIPCOT",
    "Security Agency Tamil Nadu Locations"
  ]
});

export default function LocationsHubPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Locations", url: `${brandData.domain}/locations` },
  ]);

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Header */}
        <section className="py-8 sm:py-12 border-b border-[#E7E5E0]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <MapPin size={14} />
              <span>Regional Coverage • Tamil Nadu</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-bold tracking-tight">
              Operational District Hubs & Coverage
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              Decentralized operational commands backed by our central 24/7 Trichy headquarters. Each district maintains dedicated quick-reaction reserve squads enforcing our guaranteed 2-Hour Relief SLA.
            </p>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locationsData.map((loc) => {
            const isHq = loc.slug === "trichy";
            return (
              <div 
                key={loc.slug}
                className={`rounded-xl border transition-all duration-200 flex flex-col justify-between p-6 sm:p-7 ${
                  isHq 
                    ? "bg-[#0B3D2E]/4 border-[#0B3D2E]/30 shadow-xs ring-1 ring-[#0B3D2E]/20" 
                    : "bg-[#F8F9FA]/70 border-[#E7E5E0] hover:border-[#0B3D2E]/40 hover:bg-white hover:shadow-xs"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B3D2E] bg-[#0B3D2E]/8 px-2.5 py-1 rounded">
                      {isHq ? "Headquarters & Command" : "District Operations Node"}
                    </span>
                    <span className="text-[11px] text-[#5A6578] flex items-center gap-1 font-medium">
                      <Clock size={12} className="text-[#0B3D2E]" />
                      <span>2h SLA</span>
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#14181F]">
                      {loc.city}
                    </h2>
                    <p className="text-xs font-medium text-[#0B3D2E] mt-0.5">
                      {loc.role}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5A6578] line-clamp-3 leading-relaxed">
                    {loc.operationalOverview}
                  </p>

                  <div className="pt-2 border-t border-[#E7E5E0]/80 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#5A6578]">
                      Key Industrial Zones:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.keyIndustrialZones.slice(0, 2).map((zone, idx) => (
                        <span 
                          key={idx}
                          className="text-[11px] bg-white border border-[#E7E5E0] px-2 py-0.5 rounded text-[#14181F]"
                        >
                          {zone}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E7E5E0]/80 flex items-center justify-between">
                  <span className="text-xs text-[#5A6578] font-medium">
                    {loc.district} District
                  </span>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B3D2E] hover:text-[#145C43] group"
                  >
                    <span>View District Hub</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </section>

        {/* Multi-City Pan-India Scalability Notice */}
        <section className="rounded-xl border border-[#E7E5E0] bg-[#F8F9FA] p-8 sm:p-10 space-y-4">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A67C3D]">
              Strategic Deployment Architecture
            </span>
            <h3 className="font-display text-2xl font-bold text-[#14181F]">
              Structured Expansion with Direct Statutory Accountability
            </h3>
            <p className="text-sm text-[#5A6578] leading-relaxed">
              We operate where our supervisory infrastructure and Ex-Servicemen audit teams are actively established. Unlike aggregated broker platforms, every JSM district deployment is governed by direct on-the-ground management, verified identity rosters, and monthly statutory EPF/ESIC challans.
            </p>
          </div>
        </section>

        {/* Direct Action Bottom CTA */}
        <section className="py-12 bg-[#0B3D2E] rounded-xl p-8 sm:p-12 text-center text-white space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight max-w-2xl mx-auto">
            Need localized security or manpower deployment?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Contact our central dispatch desk to coordinate site surveys across any district in Tamil Nadu.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#0B3D2E] text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-xs"
            >
              <span>Request District Proposal</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition-colors"
            >
              <span>Contact Operations Desk</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
