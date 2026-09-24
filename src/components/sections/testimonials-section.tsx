"use client";

import React from "react";
import { ShieldCheck, Building2, Factory, Plane, Sparkles } from "lucide-react";
import { clientExperienceCommitments } from "@/data/testimonials";

const sectors = [
  {
    icon: Plane,
    sector: "Civil Aviation & Public Transit",
    clientContext: "Tiruchirappalli International Airport Operations",
    commitment: "High-density crowd screening and terminal access control executed under zero-incident tolerance protocols.",
  },
  {
    icon: Factory,
    sector: "Manufacturing & Heavy Engineering",
    clientContext: "Industrial SEZ Corridors (Hosur, Sriperumbudur, Salem)",
    commitment: "Dual-barrier material inward/outward gate passes, worker body scans, and 2:00 AM supervisor van audits.",
  },
  {
    icon: Building2,
    sector: "Corporate IT Parks & SEZs",
    clientContext: "OMR Tech Corridor (Chennai, Sholinganallur)",
    commitment: "Polite, bilingual visitor verification, digital badge access logging, and prompt 2-hour staff replacement guarantees.",
  },
  {
    icon: Sparkles,
    sector: "Commercial Facilities & Hospitals",
    clientContext: "Healthcare & Institutional Campuses",
    commitment: "Hospital-grade sanitization using 5-step closed-loop hygiene checklists with ride-on mechanized scrubbing.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F8F9FA] border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
            Proven Track Record
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#14181F] font-normal tracking-tight">
            Sector-specific deployment standards across Tamil Nadu.
          </h2>
          <p className="text-sm sm:text-base text-[#5A6578]">
            Every deployment is customized to the statutory and operational demands of the specific environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-xl border border-[#E7E5E0] bg-white space-y-4 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0B3D2E]/8 flex items-center justify-center text-[#0B3D2E]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#14181F]">
                      {sec.sector}
                    </h3>
                    <p className="text-xs text-[#5A6578]">
                      {sec.clientContext}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed italic border-l-2 border-[#0B3D2E] pl-3.5 py-0.5">
                  &ldquo;{sec.commitment}&rdquo;
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
