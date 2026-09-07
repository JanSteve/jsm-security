"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Sparkles, 
  Plane, 
  Award, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  MapPin, 
  Briefcase, 
  FileCheck 
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { brandData } from "@/data/brand";

export function FlagshipBentoGrid() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto bg-[#07090E] border-t border-white/10 text-zinc-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-zinc-800/80 gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F17] border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ground operations bento architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight text-balance">
            Real proof. Real people. <br />
            <span className="text-[#C5A880]">Zero hallucination.</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-normal leading-relaxed text-pretty">
          Every photograph below represents genuine operational deployments, uniformed personnel platoons, and executive credentials verified in the field across Tamil Nadu.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Tile 1: Flagship Airport Terminal Platoon (7 Cols) */}
        <SpotlightCard className="md:col-span-12 lg:col-span-7 relative min-h-[480px] flex flex-col justify-between overflow-hidden group shadow-2xl border-zinc-800 bg-[#0B0F17] rounded-3xl">
          <BorderBeam size={240} duration={12} colorFrom="#C5A880" colorTo="transparent" />
          
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/real_jsm_airport_terminal_platoon.jpg"
              alt="Sweety J seated with full JSM security guard platoon at Trichy International Airport concourse"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/50 to-black/30 group-hover:via-[#07090E]/40 transition-colors" />
          </div>

          {/* Top Pill Badges */}
          <div className="relative z-10 p-6 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A880]/40 text-[#C5A880] text-[11px] font-mono font-bold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Trichy International Airport concourse</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-zinc-200 text-[11px] font-mono font-medium shadow-lg">
              Civil aviation benchmark
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="relative z-10 p-6 sm:p-8 space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#C5A880] tracking-wider block">
                Founder &amp; platoon command
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight text-balance">
                Managing Director Sweety J &amp; security squad
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl font-normal leading-relaxed text-pretty">
              Managing Director <strong>Sweety J</strong> seated with the full disciplined uniformed platoon at the glass concourse entrance of Trichy International Airport. Proven crowd control, passenger screening assistance, and zero-lapse vigilance.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5A880] hover:bg-[#b59870] text-black text-xs font-black tracking-wider transition-all min-h-[44px] press-scale shadow-lg"
              >
                <span>Explore company profile</span>
                <ArrowRight size={14} />
              </Link>
              <span className="text-xs font-mono text-zinc-400 tabular-nums">
                100% verified platoon photograph
              </span>
            </div>
          </div>
        </SpotlightCard>

        {/* Tile 2: Heritage Landmark Chariot Platoon (5 Cols) */}
        <SpotlightCard className="md:col-span-12 lg:col-span-5 relative min-h-[480px] flex flex-col justify-between overflow-hidden group shadow-2xl border-zinc-800 bg-[#0B0F17] rounded-3xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/real_jsm_chariot_platoon.jpg"
              alt="JSM Uniformed Security Guard Platoon under landmark temple chariot mural"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/50 to-black/30" />
          </div>

          <div className="relative z-10 p-6 flex items-center justify-between pointer-events-none">
            <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A880]/40 text-[#C5A880] text-[11px] font-mono font-bold shadow-lg">
              Heritage sector command
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-zinc-950 text-[11px] font-mono font-black tabular-nums">
              100% turnout
            </span>
          </div>

          <div className="relative z-10 p-6 sm:p-8 space-y-3">
            <span className="text-xs font-mono font-bold text-[#C5A880] tracking-wider block">
              Discipline &amp; bearing
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight text-balance">
              Platoon honor guard &amp; muster call
            </h3>
            <p className="text-xs text-zinc-300 font-normal leading-relaxed text-pretty">
              Uniformed guard squad in ceremonial turnout under the monumental temple chariot mural. Every guard is 5-day pre-deployment trained and police verified.
            </p>
            <div className="pt-2">
              <Link
                href="/services/private-security"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A880] hover:text-white transition-colors min-h-[44px] press-scale"
              >
                <span>Explore guard standards</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </SpotlightCard>

        {/* Tile 3: Official Printed Business Card Proof (4 Cols) */}
        <SpotlightCard className="md:col-span-6 lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl border-zinc-800/80 bg-[#0B0F17] rounded-3xl group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 text-[10px] font-mono font-bold">
                Executive credentials
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Physical proof</span>
            </div>

            {/* Concentric image wrapper: R_inner = 24 - 8 = 16px (rounded-2xl) */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-800 shadow-lg">
              <Image
                src="/images/real_jsm_printed_card.jpg"
                alt="Authentic printed business card of JSM Integrated Services showing Sweety J and Major AR Devadoss"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] text-zinc-200 font-mono font-medium">
                  Official metallic emblem card
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-black text-white">
                Leadership on record
              </h4>
              <ul className="text-xs text-zinc-400 space-y-1.5 font-medium">
                <li>• <strong className="text-zinc-200">Sweety J</strong>: Proprietor &amp; Managing Director</li>
                <li>• <strong className="text-zinc-200">Major AR Devadoss</strong>: Head of Operations (Army-Veteran)</li>
                <li>• <strong className="text-zinc-200">R Jan Steve Daniel</strong>: Chief Technical Officer &amp; Audit</li>
              </ul>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center justify-between w-full p-3.5 rounded-2xl bg-zinc-900/90 hover:bg-[#C5A880] hover:text-black transition-all text-xs font-bold text-zinc-200 min-h-[44px] press-scale border border-zinc-800 hover:border-[#C5A880]"
          >
            <span>View executive credentials</span>
            <ArrowRight size={14} />
          </Link>
        </SpotlightCard>

        {/* Tile 4: Fabrication Industry Staffing (4 Cols) */}
        <SpotlightCard className="md:col-span-6 lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl border-zinc-800/80 bg-[#0B0F17] rounded-3xl group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                Active recruitment
              </span>
              <span className="text-[10px] font-mono text-zinc-500">JSM-02 Manpower</span>
            </div>

            {/* Concentric image wrapper */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-800 shadow-lg">
              <Image
                src="/images/real_jsm_fabrication_hiring.jpg"
                alt="JSM Outsourcing Services Fabrication Industry Hiring Poster"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] text-zinc-200 font-mono font-medium">
                  Fabrication industry recruitment
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-black text-white">
                Technical &amp; industrial trades
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal text-pretty">
                Active hiring for block fabrication and pipe fabrication. Deployed across manufacturing plants with 100% EPF, ESIC, and minimum wage legal compliance.
              </p>
            </div>
          </div>

          <Link
            href="/careers"
            className="inline-flex items-center justify-between w-full p-3.5 rounded-2xl bg-zinc-900/90 hover:bg-[#C5A880] hover:text-black transition-all text-xs font-bold text-zinc-200 min-h-[44px] press-scale border border-zinc-800 hover:border-[#C5A880]"
          >
            <span>Apply or request workforce</span>
            <ArrowRight size={14} />
          </Link>
        </SpotlightCard>

        {/* Tile 5: Operational Guarantees & SLAs (4 Cols) */}
        <SpotlightCard className="md:col-span-12 lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl border-[#C5A880]/30 bg-[#0B0F17] rounded-3xl text-white">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40 text-[10px] font-mono font-bold inline-block">
              Statutory &amp; field SLAs
            </span>

            <h4 className="text-xl font-black text-white tracking-tight text-balance">
              Guaranteed operational metrics
            </h4>

            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white tabular-nums">2:00 am night van audits</span>
                  <Clock size={15} className="text-[#C5A880]" />
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Unannounced mobile patrol inspections across all night duty posts.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white tabular-nums">2-hour replacement SLA</span>
                  <Award size={15} className="text-emerald-400" />
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed tabular-nums">Roving reserve personnel deployed within 120 minutes of absent reporting.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white tabular-nums">100% EPF &amp; ESIC proof</span>
                  <ShieldCheck size={15} className="text-[#C5A880]" />
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Monthly statutory challan receipts furnished directly to corporate clients.</p>
              </div>
            </div>
          </div>

          <Link href="/get-quote" className="w-full">
            <ShimmerButton className="w-full min-h-[44px]">
              <span>Get instant quote</span>
              <ArrowRight size={14} className="ml-1 text-[#C5A880]" />
            </ShimmerButton>
          </Link>
        </SpotlightCard>

      </div>
    </section>
  );
}
