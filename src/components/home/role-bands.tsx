"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface RoleBand {
  id: string;
  name: string;
  compensationDisplay: string;
  confirmTag: string;
  experienceHorizon: string;
  summary: string;
  typicalRoles: string[];
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
  },
];

export function RoleBandsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const cardsRef = useScrollReveal<HTMLDivElement>({ stagger: true });

  return (
    <section
      id="roles"
      className="py-16 sm:py-24 bg-[#F6F3EE] border-b border-[#0E1116]/10"
      aria-labelledby="role-bands-heading"
    >
      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div ref={headerRef} data-reveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8553D] block mb-2">
            Coverage by Compensation
          </span>
          <h2
            id="role-bands-heading"
            className="font-heading font-medium text-[#0E1116] text-[clamp(1.75rem,3vw+0.75rem,2.75rem)] leading-[1.12] tracking-[-0.025em] mb-4"
          >
            Specialized in ₹12 LPA to ₹1 Cr executive mandates
          </h2>
          <p className="font-sans text-base text-[#525866] leading-relaxed">
            We operate exclusively in senior and board-level talent mediation. No junior or volume staffing distractions.
          </p>
        </div>

        {/* 3 Role Band Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {roleBandsData.map((band, idx) => {
            const isFeatured = idx === 1;
            return (
              <div
                key={band.id}
                data-reveal
                className={`relative p-6 sm:p-8 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-400 ease-out ${
                  isFeatured
                    ? "bg-white border-2 border-[#1F4E5F] shadow-md hover:shadow-xl"
                    : "bg-white/80 border border-[#0E1116]/10 shadow-2xs hover:bg-white hover:shadow-lg"
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#1F4E5F] text-white text-[11px] font-bold uppercase tracking-wider">
                    Highest Demand
                  </span>
                )}

                <div>
                  <div className="text-xs font-semibold text-[#525866] uppercase tracking-wider mb-1">
                    {band.experienceHorizon}
                  </div>
                  <h3 className="font-heading text-xl font-medium text-[#0E1116] mb-2">
                    {band.name}
                  </h3>
                  <div className="font-heading text-2xl font-bold text-[#C8553D] mb-4">
                    {band.compensationDisplay}
                  </div>
                  <p className="font-sans text-sm text-[#525866] leading-relaxed mb-6">
                    {band.summary}
                  </p>

                  <div className="space-y-2 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0E1116] block">
                      Typical Roles Brokered:
                    </span>
                    {band.typicalRoles.map((role) => (
                      <div key={role} className="flex items-center gap-2 text-xs sm:text-sm text-[#0E1116]">
                        <Check className="w-4 h-4 text-[#1F4E5F] shrink-0" aria-hidden="true" />
                        <span>{role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="#enquiry"
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold hover:-translate-y-0.5 transition-all duration-350 min-h-[44px] ${
                    isFeatured
                      ? "bg-[#0E1116] text-white hover:bg-[#C8553D]"
                      : "bg-[#F6F3EE] text-[#0E1116] hover:bg-[#0E1116] hover:text-white"
                  }`}
                >
                  Inquire For This Band
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
