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
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto bg-[#fbf9f4] border-t border-zinc-200/80">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-zinc-200/80 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[10px] font-mono font-bold tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GROUND OPERATIONS BENTO ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
            Real Proof. Real People. <br />
            <span className="text-[#C5A880]">Zero Hallucination.</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-md font-medium leading-relaxed">
          Every image below represents genuine operational deployments, uniformed personnel platoons, and executive credentials verified in the field across Tamil Nadu.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Tile 1: Flagship Airport Terminal Platoon (7 Cols) */}
        <SpotlightCard className="md:col-span-12 lg:col-span-7 relative min-h-[460px] flex flex-col justify-between overflow-hidden group shadow-xl border-zinc-300">
          <BorderBeam size={220} duration={12} colorFrom="#C5A880" colorTo="transparent" />
          
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/real_jsm_airport_terminal_platoon.jpg"
              alt="Sweety J seated with full JSM security guard platoon at Trichy International Airport concourse"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 group-hover:via-black/30 transition-colors" />
          </div>

          {/* Top Pill Badges */}
          <div className="relative z-10 p-6 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#C5A880] text-[10px] font-mono font-black uppercase shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TRICHY INTERNATIONAL AIRPORT CONCOURSE</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase shadow-lg">
              CIVIL AVIATION BENCHMARK
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="relative z-10 p-6 sm:p-8 space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-black text-[#C5A880] uppercase tracking-wider block">
                FOUNDER &amp; PLATOON COMMAND
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Managing Director Sweety J &amp; Security Squad
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl font-normal leading-relaxed">
              Managing Director <strong>Sweety J</strong> seated with the full disciplined uniformed platoon at the glass concourse entrance of Trichy International Airport. Proven crowd control, passenger screening assistance, and zero-lapse vigilance.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C5A880] hover:bg-[#b59870] text-black text-xs font-black uppercase tracking-wider transition-transform group-hover:scale-105 active:scale-95"
              >
                <span>Read Case Study</span>
                <ArrowRight size={13} />
              </Link>
              <span className="text-[11px] font-mono text-zinc-300">
                100% Real Platoon Photo
              </span>
            </div>
          </div>
        </SpotlightCard>

        {/* Tile 2: Heritage Landmark Chariot Platoon (5 Cols) */}
        <SpotlightCard className="md:col-span-12 lg:col-span-5 relative min-h-[460px] flex flex-col justify-between overflow-hidden group shadow-xl border-zinc-300">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/real_jsm_chariot_platoon.jpg"
              alt="JSM Uniformed Security Guard Platoon under landmark temple chariot mural"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20" />
          </div>

          <div className="relative z-10 p-6 flex items-center justify-between pointer-events-none">
            <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#C5A880] text-[10px] font-mono font-black uppercase shadow-lg">
              HERITAGE SECTOR COMMAND
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-zinc-950 text-[10px] font-mono font-black uppercase">
              100% TURNOUT
            </span>
          </div>

          <div className="relative z-10 p-6 sm:p-8 space-y-3">
            <span className="text-[10px] font-mono font-black text-[#C5A880] uppercase tracking-wider block">
              DISCIPLINE &amp; BEARING
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Platoon Honor Guard &amp; Muster Call
            </h3>
            <p className="text-xs text-zinc-300 font-normal leading-relaxed">
              Uniformed guard squad in full ceremonial turnout under the monumental temple chariot mural. Every guard is 5-day pre-deployment trained and police verified.
            </p>
            <div className="pt-1">
              <Link
                href="/services/private-security"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#C5A880] hover:text-white uppercase font-mono tracking-wider"
              >
                <span>Explore Guard Standards</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </SpotlightCard>

        {/* Tile 3: Official Printed Business Card Proof (4 Cols) */}
        <SpotlightCard className="md:col-span-6 lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md border-zinc-300/90 bg-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#8f6d3f] border border-[#C5A880]/30 text-[10px] font-mono font-black uppercase">
                EXECUTIVE CREDENTIALS
              </span>
              <span className="text-[10px] font-mono text-zinc-400">PHYSICAL PROOF</span>
            </div>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-200 shadow-md group">
              <Image
                src="/images/real_jsm_printed_card.jpg"
                alt="Authentic printed business card of JSM Integrated Services showing Sweety J and Major AR Devadoss"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] text-white font-mono font-bold">
                  Official Metallic Emblem Card
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-base font-black text-black uppercase">
                Leadership on Record
              </h4>
              <ul className="text-xs text-zinc-600 space-y-1 font-medium">
                <li>• <strong>Sweety J</strong>: Proprietor &amp; Managing Director</li>
                <li>• <strong>Major AR Devadoss</strong>: Head of Operations (Army-Veteran)</li>
                <li>• <strong>R Jan Steve Daniel</strong>: Chief Technical Officer &amp; Audit</li>
              </ul>
            </div>
          </div>

          <Link
            href="/business-card"
            className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-zinc-100 hover:bg-black hover:text-white transition-all text-xs font-bold text-black"
          >
            <span>View 300 DPI Executive Card &amp; QR</span>
            <ExternalLink size={13} />
          </Link>
        </SpotlightCard>

        {/* Tile 4: Fabrication Industry Staffing (4 Cols) */}
        <SpotlightCard className="md:col-span-6 lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md border-zinc-300/90 bg-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 text-[10px] font-mono font-black uppercase">
                ACTIVE RECRUITMENT
              </span>
              <span className="text-[10px] font-mono text-zinc-400">JSM-02 MANPOWER</span>
            </div>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-200 shadow-md group">
              <Image
                src="/images/real_jsm_fabrication_hiring.jpg"
                alt="JSM Outsourcing Services Fabrication Industry Hiring Poster"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] text-white font-mono font-bold">
                  Fabrication Industry Recruitment
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-base font-black text-black uppercase">
                Technical &amp; Industrial Trades
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                Active hiring for Block Fabrication &amp; Pipe Fabrication. Deployed across manufacturing plants with 100% EPF, ESIC, and minimum wage legal compliance.
              </p>
            </div>
          </div>

          <Link
            href="/careers"
            className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-zinc-100 hover:bg-black hover:text-white transition-all text-xs font-bold text-black"
          >
            <span>Apply or Request Industrial Workforce</span>
            <ArrowRight size={13} />
          </Link>
        </SpotlightCard>

        {/* Tile 5: Operational Guarantees & SLAs (4 Cols) */}
        <SpotlightCard className="md:col-span-12 lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md border-zinc-300/90 bg-zinc-950 text-white">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40 text-[10px] font-mono font-black uppercase inline-block">
              STATUTORY &amp; FIELD SLAs
            </span>

            <h4 className="text-xl font-black text-white uppercase tracking-tight">
              Guaranteed Operational Metrics
            </h4>

            <div className="space-y-3 pt-1">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">2:00 AM Night Van Audits</span>
                  <Clock size={14} className="text-[#C5A880]" />
                </div>
                <p className="text-[11px] text-zinc-400">Unannounced mobile patrol inspections across all night duty posts.</p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">2-Hour Replacement SLA</span>
                  <Award size={14} className="text-emerald-400" />
                </div>
                <p className="text-[11px] text-zinc-400">Roving reserve personnel deployed within 120 minutes of absent reporting.</p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">100% EPF &amp; ESIC Proof</span>
                  <ShieldCheck size={14} className="text-[#C5A880]" />
                </div>
                <p className="text-[11px] text-zinc-400">Monthly statutory challan receipts furnished directly to corporate clients.</p>
              </div>
            </div>
          </div>

          <Link href="/get-quote" className="w-full">
            <ShimmerButton className="w-full">
              <span>GET INSTANT QUOTE</span>
              <ArrowRight size={13} className="ml-1 text-[#C5A880]" />
            </ShimmerButton>
          </Link>
        </SpotlightCard>

      </div>
    </section>
  );
}
