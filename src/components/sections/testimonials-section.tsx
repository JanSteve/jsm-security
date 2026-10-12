import React from "react";
import { Plane, Factory, Building2, Sparkles } from "lucide-react";

const sectors = [
  {
    icon: Plane,
    sector: "Civil Aviation & Public Transit",
    location: "Aviation Hubs & Passenger Terminals",
    profile: "Passenger concourse access regulation, vehicle drop-off barrier management, and high-density crowd screening operating under zero-incident tolerance protocols.",
    standards: ["AVSEC-aware personnel", "100% Turnout inspection", "Surprise night audits"]
  },
  {
    icon: Factory,
    sector: "Manufacturing & Heavy Engineering",
    location: "Industrial Corridors (Hosur, Sriperumbudur, Salem)",
    profile: "Dual-barrier inward/outward gate pass validation, worker physical baggage checks, material shrinkage prevention, and 2:00 AM supervisor patrol van audits.",
    standards: ["2-Hour Relief SLA", "Zero client liability", "100% EPF/ESIC compliance"]
  },
  {
    icon: Building2,
    sector: "Corporate IT Parks & SEZs",
    location: "Technology Corridors (Chennai OMR, Coimbatore)",
    profile: "Polite, bilingual visitor verification, badge access management, executive escort, and prompt 2-hour staff replacement guarantees.",
    standards: ["Bilingual security guards", "Visitor digital pass logs", "Trained first responders"]
  },
  {
    icon: Sparkles,
    sector: "Healthcare & Institutional Campuses",
    location: "Commercial Facilities & Hospitals",
    profile: "Commercial facility hygiene executing 5-step closed-loop cleaning protocols (Clean, Inspect, Report, Correct, Verify) with mechanized ride-on auto scrubbers.",
    standards: ["Hourly restroom logs", "Color-coded microfibers", "Hospital-grade chemicals"]
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black border-b border-white/10 text-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2 text-left">
          <div className="text-xs font-bold text-white font-mono uppercase tracking-wider">
            Industry Deployment Profiles
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] leading-[1.18] text-white font-bold tracking-[-0.01em]">
            Deployment standards formulated for high-consequence environments.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed line-measure">
            Every facility operates under tailored standard operating procedures matched to the statutory and physical security demands of each industry sector.
          </p>
        </div>

        {/* 4 Sector Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#070B12] border border-white/10 hover:border-white/30 rounded-xl space-y-4 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {sec.sector}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {sec.location}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {sec.profile}
                </p>

                <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[11px] text-white font-mono font-medium">
                  {sec.standards.map((std, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-md">
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
