"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { PerspectiveTiltCard } from "@/components/motion/perspective-tilt-card";
import { MagneticWrapper } from "@/components/motion/magnetic-cursor";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";

interface RoleBand {
  id: string;
  name: string;
  compensationDisplay: string;
  confirmTag: string;
  experienceHorizon: string;
  summary: string;
  typicalRoles: string[];
  turnaroundAvg: string;
}

const roleBandsData: RoleBand[] = [
  {
    id: "mid-senior",
    name: "Mid-Senior Leadership",
    compensationDisplay: "₹12 LPA – ₹25 LPA",
    confirmTag: "[CONFIRM: role band]",
    experienceHorizon: "5–9 Years Experience",
    summary: "Operational heads driving plant performance, engineering systems, and regional commercial operations.",
    typicalRoles: [
      "Plant & Operations Managers",
      "Technical Architects",
      "Senior Finance Controllers",
      "Regional Sales Heads",
    ],
    turnaroundAvg: "Average Shortlist: 7 Days",
  },
  {
    id: "functional-heads",
    name: "Functional Heads & Directors",
    compensationDisplay: "₹25 LPA – ₹50 LPA",
    confirmTag: "[CONFIRM: role band]",
    experienceHorizon: "10–16 Years Experience",
    summary: "Department leaders managing P&L portfolios, large enterprise engineering units, and multi-state facilities.",
    typicalRoles: [
      "Vice President Operations",
      "Head of Engineering / CTO",
      "General Counsel / Legal Head",
      "Chief Human Resources Officer",
    ],
    turnaroundAvg: "Average Shortlist: 7 Days",
  },
  {
    id: "c-suite",
    name: "Executive & C-Suite",
    compensationDisplay: "₹50 LPA – ₹1 Cr",
    confirmTag: "[CONFIRM: role band]",
    experienceHorizon: "15+ Years P&L Leadership",
    summary: "Enterprise decision-makers steering board governance, capital deployment, and national market growth.",
    typicalRoles: [
      "Chief Executive Officers",
      "Chief Operating Officers",
      "Managing Directors",
      "Board & Advisory Directors",
    ],
    turnaroundAvg: "Confidential Partner Search",
  },
];

export function RoleBandsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const cardsRef = useScrollReveal<HTMLDivElement>({ stagger: true });
  const [activeBandHover, setActiveBandHover] = useState<string | null>(null);

  return (
    <section
      id="roles"
      className="py-16 sm:py-24 bg-[#F6F3EE] border-b border-[#0E1116]/10 relative overflow-hidden"
      aria-labelledby="role-bands-heading"
    >
      {/* Background Dot Matrix */}
      <DotPattern
        width={24}
        height={24}
        cx={1.5}
        cy={1.5}
        cr={1}
        className="[mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)] opacity-60"
      />

      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} data-reveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0E1116]/10 text-xs font-semibold uppercase tracking-wider text-[#C8553D] mb-4 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Coverage by Compensation</span>
          </div>

          <h2
            id="role-bands-heading"
            className="font-heading font-medium text-[#0E1116] text-[clamp(1.75rem,3vw+0.75rem,2.75rem)] leading-[1.12] tracking-[-0.025em] mb-4 text-balance"
          >
            Specialized in ₹12 LPA to ₹1 Cr executive mandates
          </h2>
          <p className="font-sans text-base text-[#525866] leading-relaxed max-w-xl mx-auto text-pretty">
            We operate exclusively in senior and board-level talent mediation across 6 focus states. No junior or volume staffing distractions.
          </p>
        </div>

        {/* 3 Role Band Cards with Perspective Tilt and Border Beam */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {roleBandsData.map((band, idx) => {
            const isFeatured = idx === 1;
            const isHovered = activeBandHover === band.id;

            return (
              <div 
                key={band.id} 
                data-reveal 
                className="h-full"
                onMouseEnter={() => setActiveBandHover(band.id)}
                onMouseLeave={() => setActiveBandHover(null)}
              >
                <PerspectiveTiltCard
                  maxTilt={4}
                  scaleOnHover={1.02}
                  spotlightColor={isFeatured ? "rgba(31, 78, 95, 0.10)" : "rgba(200, 85, 61, 0.08)"}
                  className="h-full"
                >
                  <div
                    className={`relative p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full transition-all duration-300 overflow-hidden ${
                      isFeatured
                        ? "bg-white border-2 border-[#1F4E5F] shadow-md hover:shadow-xl"
                        : "bg-white/95 border border-[#0E1116]/10 shadow-2xs hover:bg-white hover:border-[#0E1116]/25 hover:shadow-lg"
                    }`}
                  >
                    {/* Border Beam on Featured Card */}
                    {isFeatured && (
                      <BorderBeam size={220} duration={12} colorFrom="#1F4E5F" colorTo="#C8553D" />
                    )}

                    {isFeatured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#1F4E5F] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs z-10">
                        Highest Demand
                      </span>
                    )}

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#525866] uppercase tracking-wider">
                          {band.experienceHorizon}
                        </span>
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#F6F3EE] text-[#1F4E5F]">
                          {band.turnaroundAvg}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-medium text-[#0E1116] mb-1">
                        {band.name}
                      </h3>

                      <div className="font-heading text-2xl font-bold text-[#C8553D] mb-4">
                        {band.compensationDisplay}
                      </div>

                      <p className="font-sans text-sm text-[#525866] leading-relaxed mb-6">
                        {band.summary}
                      </p>

                      <div className="space-y-2.5 mb-8">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0E1116] block">
                          Typical Roles Brokered:
                        </span>
                        {band.typicalRoles.map((role) => (
                          <div 
                            key={role} 
                            className="flex items-center gap-2 text-xs sm:text-sm text-[#0E1116] p-1.5 rounded-lg hover:bg-[#F6F3EE] transition-colors"
                          >
                            <Check className="w-4 h-4 text-[#1F4E5F] shrink-0" aria-hidden="true" />
                            <span>{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-[#0E1116]/8">
                      <MagneticWrapper strength={0.15} className="w-full">
                        <Link
                          href="#enquiry"
                          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-350 min-h-[44px] ${
                            isFeatured
                              ? "bg-[#0E1116] text-white hover:bg-[#C8553D] hover:-translate-y-0.5 shadow-sm"
                              : "bg-[#F6F3EE] text-[#0E1116] hover:bg-[#0E1116] hover:text-white hover:-translate-y-0.5"
                          }`}
                        >
                          <span>Inquire For This Band</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </MagneticWrapper>
                    </div>
                  </div>
                </PerspectiveTiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
