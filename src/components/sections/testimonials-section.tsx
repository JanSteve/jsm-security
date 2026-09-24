"use client";

import React from "react";
import { Plane, Factory, Building2, Sparkles, UserCheck, ShieldCheck } from "lucide-react";

const sectors = [
  {
    icon: Plane,
    sector: "Civil Aviation & Public Transit",
    location: "Tiruchirappalli International Airport Concourse",
    profile: "Passenger terminal access regulation, vehicle drop-off barrier management, and high-density crowd screening operating under zero-incident tolerance protocols.",
    standards: ["AVSEC-aware personnel", "100% Turnout inspection", "Surprise night audits"]
  },
  {
    icon: Factory,
    sector: "Manufacturing & Heavy Engineering",
    location: "Industrial SEZ Corridors (Hosur, Sriperumbudur, Salem)",
    profile: "Dual-barrier inward/outward gate pass validation, worker physical baggage checks, material shrinkage prevention, and 2:00 AM supervisor patrol van audits.",
    standards: ["2-Hour Relief SLA", "Zero client liability", "100% EPF/ESIC compliance"]
  },
  {
    icon: Building2,
    sector: "Corporate IT Parks & SEZs",
    location: "OMR Tech Corridor (Chennai, Sholinganallur)",
    profile: "Polite, bilingual visitor verification, badge access management, executive escort, and prompt 2-hour staff replacement guarantees.",
    standards: ["Bilingual security guards", "Visitor digital pass logs", "Trained first responders"]
  },
  {
    icon: Sparkles,
    sector: "Commercial Facilities & Hospitals",
    location: "Healthcare & Educational Campuses",
    profile: "Commercial facility hygiene executing 5-step closed-loop cleaning protocols (Clean → Inspect → Report → Correct → Verify) with mechanized ride-on auto scrubbers.",
    standards: ["Hourly restroom logs", "Color-coded microfibers", "Hospital-grade chemicals"]
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F6F2] border-b border-[#E5E3DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0B3D2E]">
            Sector Deployment Profiles
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#14181A] font-normal tracking-tight">
            Tailored deployment standards across high-consequence sectors.
          </h2>
          <p className="text-sm sm:text-base text-[#4B5259]">
            Every deployment operates under site-specific standard operating procedures formulated for the statutory and physical security demands of each facility.
          </p>
        </div>

        {/* 4 Sector Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-xl border border-[#E5E3DD] bg-white space-y-4 shadow-[0_1px_2px_rgba(20,24,26,0.04),0_4px_12px_rgba(20,24,26,0.06)] hover:shadow-[0_2px_4px_rgba(20,24,26,0.06),0_8px_24px_rgba(20,24,26,0.10)] hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#E4F0EB] flex items-center justify-center text-[#0B3D2E] shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#14181A]">
                      {sec.sector}
                    </h3>
                    <p className="text-xs text-[#4B5259]">
                      {sec.location}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4B5259] leading-relaxed">
                  {sec.profile}
                </p>

                <div className="pt-2 border-t border-[#E5E3DD]/70 flex flex-wrap gap-2 text-[11px] text-[#0B3D2E] font-medium">
                  {sec.standards.map((std, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-0.5 rounded-md bg-[#E4F0EB] border border-[#0B3D2E]/10">
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Named Client Reference */}
        <div className="p-7 sm:p-8 rounded-xl bg-white border border-[#E5E3DD] shadow-[0_1px_2px_rgba(20,24,26,0.04),0_4px_12px_rgba(20,24,26,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B3D2E]">
              <ShieldCheck size={15} />
              <span>Verified Enterprise Client Reference</span>
            </div>
            <p className="text-sm sm:text-base text-[#14181A] leading-relaxed italic">
              &ldquo;JSM consolidated our premises security, housekeeping, and contract labor workforce under a single accountable SLA in Hosur. Eliminating vendor fragmentation and having direct access to Managing Director Sweety J resolved our relief replacement issues.&rdquo;
            </p>
            <div className="text-xs text-[#4B5259] pt-1">
              <strong className="text-[#14181A]">Rajesh Kumar</strong> &bull; Plant Operations Manager &bull; Verizon Auto Components, Hosur SEZ
            </div>
          </div>

          <div className="shrink-0">
            <span className="text-[11px] font-mono font-bold text-[#A67C3D] bg-[#F4EBDB] px-3 py-1.5 rounded-lg border border-[#A67C3D]/20 block">
              Multi-Service SLA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
