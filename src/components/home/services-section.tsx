"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Award, 
  Cpu, 
  GraduationCap, 
  TrendingUp, 
  ArrowRight, 
  Sparkles
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MagneticWrapper } from "@/components/motion/magnetic-cursor";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { CardSpotlight } from "@/components/ui/card-spotlight";

interface SupportingService {
  id: string;
  title: string;
  tag: string;
  summary: string;
  roles: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SUPPORTING_SERVICES: SupportingService[] = [
  {
    id: "executive-search",
    title: "Executive Search & Board Advisory",
    tag: "CXO Level",
    summary: "Confidential partner-led search for CXOs, Managing Directors, and Board Advisors.",
    roles: "MDs, COOs, CFOs, Board Members",
    icon: Award,
  },
  {
    id: "bulk-technical",
    title: "Specialized Technical Squads",
    tag: "Engineering",
    summary: "Synchronized hiring drives for specialized engineering teams and plant floor leads.",
    roles: "Plant Leads, QA Heads, Precision Engineers",
    icon: Cpu,
  },
  {
    id: "campus-lateral",
    title: "Campus & Lateral Fast-Track",
    tag: "Accelerated Sourcing",
    summary: "Curated pipelines connecting tier-1/2 institutions and lateral specialists (2–5 yrs).",
    roles: "Management Trainees, Lateral Leads",
    icon: GraduationCap,
  },
  {
    id: "hr-advisory",
    title: "Compensation & Retention Advisory",
    tag: "Consultative",
    summary: "Market compensation benchmarks, incentive design, and executive retention frameworks.",
    roles: "Benchmarking, Retention, Org Design",
    icon: TrendingUp,
  },
];

export function ServicesSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const primaryCardRef = useScrollReveal<HTMLDivElement>();
  const supportingGridRef = useScrollReveal<HTMLDivElement>({ stagger: true });

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-[#F6F3EE] text-[#0E1116] border-b border-[#0E1116]/10 overflow-hidden w-full max-w-full relative"
      aria-labelledby="services-heading"
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
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Practice Overview</span>
          </div>

          <h2
            id="services-heading"
            className="text-[clamp(1.75rem,3vw+0.75rem,2.75rem)] font-heading font-medium tracking-tight text-[#0E1116] leading-[1.12] mb-3 text-balance"
          >
            Core talent mediation &amp; supporting practices
          </h2>
          <p className="text-base font-sans text-[#525866] leading-relaxed max-w-xl mx-auto text-pretty">
            Talent acquisition is our primary focus. We support our enterprise clients with specialized advisory and scaled sourcing across 6 states.
          </p>
        </div>

        {/* 1. Primary Practice Card with Border Beam */}
        <div 
          ref={primaryCardRef} 
          data-reveal
          className="bg-white border-2 border-[#1F4E5F] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 ease-out mb-10 relative overflow-hidden"
        >
          <BorderBeam size={240} duration={14} colorFrom="#1F4E5F" colorTo="#C8553D" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#1F4E5F] text-white text-[11px] font-bold uppercase tracking-wider">
                  Core Practice
                </span>
                <span className="text-xs font-medium text-[#C8553D]">
                  Zero Upfront • Success Fee [CONFIRM: fee %]
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-medium text-[#0E1116] mb-2">
                Senior Talent Acquisition (₹12 LPA – ₹1 Cr)
              </h3>
              <p className="text-sm font-sans text-[#525866] leading-relaxed">
                Direct headhunting and placement of pre-screened functional heads, operations leads, and technical directors across Tamil Nadu, Karnataka, Maharashtra, Delhi, Madhya Pradesh, and Gujarat.
              </p>
            </div>

            <MagneticWrapper strength={0.2} className="shrink-0">
              <Link
                href="#enquiry"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0E1116] text-white text-sm font-semibold hover:bg-[#C8553D] hover:-translate-y-0.5 transition-all duration-350 min-h-[44px] shadow-sm"
              >
                <span>Initiate Search Mandate</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticWrapper>
          </div>
        </div>

        {/* 2. Compact 4-Card Supporting Grid with CardSpotlight */}
        <div ref={supportingGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUPPORTING_SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div key={srv.id} data-reveal className="h-full">
                <CardSpotlight
                  radius={180}
                  color="rgba(31, 78, 95, 0.08)"
                  className="bg-white/95 border border-[#0E1116]/10 p-5 hover:border-[#0E1116]/25 hover:-translate-y-1 hover:shadow-md transition-all duration-350 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold text-[#1F4E5F] uppercase tracking-wider">
                        {srv.tag}
                      </span>
                      <Icon className="w-4 h-4 text-[#525866]" aria-hidden="true" />
                    </div>
                    <h4 className="font-heading text-base font-medium text-[#0E1116] mb-1.5">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-[#525866] leading-relaxed mb-3">
                      {srv.summary}
                    </p>
                  </div>
                  <div className="text-[11px] font-medium text-[#0E1116] pt-2 border-t border-[#0E1116]/6">
                    <span className="text-[#525866]">Roles: </span>
                    {srv.roles}
                  </div>
                </CardSpotlight>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
