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
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto bg-white border-t border-black/[0.08] text-[#1d1d1f]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/[0.08] gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-black/[0.06] text-[#86868b] text-xs font-mono font-medium tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ground operations bento architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#1d1d1f] tracking-tight text-balance">
            Real proof. Real people. <br />
            <span className="text-[#86868b]">Zero hallucination.</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#515154] max-w-md font-normal leading-relaxed text-pretty">
          Every photograph below represents genuine operational deployments, uniformed personnel platoons, and executive credentials verified in the field across Tamil Nadu.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Tile 1: Flagship Airport Terminal Platoon (7 Cols) */}
        <div className="md:col-span-12 lg:col-span-7 relative min-h-[480px] flex flex-col justify-between overflow-hidden group shadow-lg border border-black/[0.08] bg-[#f5f5f7] rounded-[28px]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/real_jsm_airport_terminal_platoon.jpg"
              alt="Sweety J seated with full JSM security guard platoon at Trichy International Airport concourse"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          {/* Top Pill Badges */}
          <div className="relative z-10 p-6 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] text-[#1d1d1f] text-[11px] font-mono font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Trichy International Airport concourse</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-medium shadow-xs">
              Civil aviation benchmark
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="relative z-10 p-6 sm:p-8 space-y-3">
            <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl border border-black/[0.08] shadow-md space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#86868b] tracking-wider block uppercase">
                  Founder &amp; platoon command
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] tracking-tight text-balance">
                  Managing Director Sweety J &amp; security squad
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#515154] font-normal leading-relaxed text-pretty">
                Managing Director <strong>Sweety J</strong> seated with the full disciplined uniformed platoon at the glass concourse entrance of Trichy International Airport. Proven crowd control, passenger screening assistance, and zero-lapse vigilance.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold tracking-wider transition-all min-h-[40px] press-scale shadow-xs"
                >
                  <span>Explore company profile</span>
                  <ArrowRight size={14} />
                </Link>
                <span className="text-xs font-mono text-[#86868b] tabular-nums">
                  100% verified platoon photograph
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tile 2: Heritage Landmark Chariot Platoon (5 Cols) */}
        <div className="md:col-span-12 lg:col-span-5 relative min-h-[480px] flex flex-col justify-between overflow-hidden group shadow-lg border border-black/[0.08] bg-[#f5f5f7] rounded-[28px]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/real_jsm_chariot_platoon.jpg"
              alt="JSM Uniformed Security Guard Platoon under landmark temple chariot mural"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          <div className="relative z-10 p-6 flex items-center justify-between pointer-events-none">
            <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] text-[#1d1d1f] text-[11px] font-mono font-bold shadow-xs">
              Heritage sector command
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-mono font-bold tabular-nums">
              100% turnout
            </span>
          </div>

          <div className="relative z-10 p-6 sm:p-8">
            <div className="bg-white/95 backdrop-blur-xl p-5 rounded-2xl border border-black/[0.08] shadow-md space-y-2">
              <span className="text-xs font-mono font-bold text-[#86868b] tracking-wider block uppercase">
                Discipline &amp; bearing
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] tracking-tight text-balance">
                Platoon honor guard &amp; muster call
              </h3>
              <p className="text-xs text-[#515154] font-normal leading-relaxed text-pretty">
                Uniformed guard squad in ceremonial turnout under the monumental temple chariot mural. Every guard is 5-day pre-deployment trained and police verified.
              </p>
              <div className="pt-1">
                <Link
                  href="/services/private-security"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline transition-colors min-h-[40px] press-scale"
                >
                  <span>Explore guard standards</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tile 3: Official Printed Business Card Proof (4 Cols) */}
        <div className="md:col-span-6 lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm border border-black/[0.06] bg-[#f5f5f7] rounded-[28px] group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-white text-[#1d1d1f] border border-black/[0.06] text-[10px] font-mono font-bold shadow-2xs">
                Executive credentials
              </span>
              <span className="text-[10px] font-mono text-[#86868b]">Physical proof</span>
            </div>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/[0.08] shadow-xs">
              <Image
                src="/images/real_jsm_printed_card.jpg"
                alt="Authentic printed business card of JSM Integrated Services showing Sweety J and Major AR Devadoss"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] text-white font-mono font-medium">
                  Official metallic emblem card
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#1d1d1f]">
                Leadership on record
              </h4>
              <ul className="text-xs text-[#515154] space-y-1.5 font-medium">
                <li>• <strong className="text-[#1d1d1f]">Sweety J</strong>: Proprietor &amp; Managing Director</li>
                <li>• <strong className="text-[#1d1d1f]">Major AR Devadoss</strong>: Head of Operations (Army-Veteran)</li>
                <li>• <strong className="text-[#1d1d1f]">R Jan Steve Daniel</strong>: Chief Technical Officer &amp; Audit</li>
              </ul>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center justify-between w-full p-3.5 rounded-full bg-white hover:bg-[#1d1d1f] hover:text-white transition-all text-xs font-semibold text-[#1d1d1f] min-h-[44px] press-scale border border-black/[0.08] shadow-2xs"
          >
            <span>View executive credentials</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tile 4: Fabrication Industry Staffing (4 Cols) */}
        <div className="md:col-span-6 lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm border border-black/[0.06] bg-[#f5f5f7] rounded-[28px] group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-mono font-bold">
                Active recruitment
              </span>
              <span className="text-[10px] font-mono text-[#86868b]">JSM-02 Manpower</span>
            </div>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/[0.08] shadow-xs">
              <Image
                src="/images/real_jsm_fabrication_hiring.jpg"
                alt="JSM Outsourcing Services Fabrication Industry Hiring Poster"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] text-white font-mono font-medium">
                  Fabrication industry recruitment
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#1d1d1f]">
                Technical &amp; industrial trades
              </h4>
              <p className="text-xs text-[#515154] leading-relaxed font-normal text-pretty">
                Active hiring for block fabrication and pipe fabrication. Deployed across manufacturing plants with 100% EPF, ESIC, and minimum wage legal compliance.
              </p>
            </div>
          </div>

          <Link
            href="/careers"
            className="inline-flex items-center justify-between w-full p-3.5 rounded-full bg-white hover:bg-[#1d1d1f] hover:text-white transition-all text-xs font-semibold text-[#1d1d1f] min-h-[44px] press-scale border border-black/[0.08] shadow-2xs"
          >
            <span>Apply or request workforce</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tile 5: Operational Guarantees & SLAs (4 Cols) */}
        <div className="md:col-span-12 lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm border border-black/[0.06] bg-[#f5f5f7] rounded-[28px] text-[#1d1d1f]">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-white text-[#1d1d1f] border border-black/[0.06] text-[10px] font-mono font-bold inline-block shadow-2xs">
              Statutory &amp; field SLAs
            </span>

            <h4 className="text-xl font-bold text-[#1d1d1f] tracking-tight text-balance">
              Guaranteed operational metrics
            </h4>

            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white border border-black/[0.04] space-y-1 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1d1d1f] tabular-nums">2:00 am night van audits</span>
                  <Clock size={15} className="text-[#86868b]" />
                </div>
                <p className="text-[11px] text-[#515154] leading-relaxed">Unannounced mobile patrol inspections across all night duty posts.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-black/[0.04] space-y-1 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1d1d1f] tabular-nums">2-hour replacement SLA</span>
                  <Award size={15} className="text-emerald-600" />
                </div>
                <p className="text-[11px] text-[#515154] leading-relaxed tabular-nums">Roving reserve personnel deployed within 120 minutes of absent reporting.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-black/[0.04] space-y-1 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1d1d1f] tabular-nums">100% EPF &amp; ESIC proof</span>
                  <ShieldCheck size={15} className="text-blue-600" />
                </div>
                <p className="text-[11px] text-[#515154] leading-relaxed">Monthly statutory challan receipts furnished directly to corporate clients.</p>
              </div>
            </div>
          </div>

          <Link
            href="/get-quote"
            className="inline-flex items-center justify-center w-full h-11 px-6 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs shadow-xs press-scale transition-all"
          >
            <span>Get instant quote</span>
            <ArrowRight size={14} className="ml-1 text-white" />
          </Link>
        </div>

      </div>
    </section>
  );
}
