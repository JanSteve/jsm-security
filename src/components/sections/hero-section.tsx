"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Award, Clock, Eye, ShieldCheck } from "lucide-react";
import { brandData } from "@/data/brand";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white border-b border-[#E5E3DD]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Credential Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4F0EB] border border-[#0B3D2E]/15 text-[13px] font-semibold text-[#0B3D2E]"
            >
              <span className="w-2 h-2 rounded-full bg-[#1E7A58]" />
              <span className="font-bold">PSARA Act 2005 Licensed</span>
              <span className="text-neutral-300">&bull;</span>
              <span className="text-[#4B5259] font-normal">ISO 9001:2015 &bull; DGR Aligned</span>
            </motion.div>

            {/* Main Headline (56px desktop / 34px mobile, weight 600, Fraunces) */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-display text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.1] text-[#14181A] font-semibold tracking-tight"
            >
              Disciplined security, verified manpower &amp; integrated facility operations.
            </motion.h1>

            {/* Subheading (17px desktop / 16px mobile, Inter) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-[16px] sm:text-[17px] text-[#4B5259] leading-[1.65] line-measure"
            >
              JSM Integrated Services delivers structured Ex-Servicemen and private security guarding, 100% EPF/ESIC-compliant contract staffing, and commercial facility hygiene across Tamil Nadu — backed by a contractual 2-hour guard replacement guarantee.
            </motion.p>

            {/* Primary & Secondary CTAs (Exactly 2 CTAs) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center gap-2 px-6 h-[48px] rounded-[8px] bg-[#0B3D2E] hover:bg-[#145C43] text-white text-sm font-semibold transition-all shadow-[0_1px_2px_rgba(20,24,26,0.04),0_4px_12px_rgba(20,24,26,0.06)] press-scale"
              >
                <span>Request a Proposal</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 h-[48px] rounded-[8px] bg-[#F7F6F2] hover:bg-[#EFECE6] border border-[#E5E3DD] text-[#14181A] text-sm font-semibold transition-all press-scale"
              >
                <span>Explore Three-Tier Model</span>
              </Link>
            </motion.div>

            {/* Exactly 3 Trust Chips with --accent-100 bg & hairline border (13px font) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 border-t border-[#E5E3DD]/80 flex flex-wrap gap-2.5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F0EB] border border-[#0B3D2E]/15 text-[13px] font-medium text-[#0B3D2E]">
                <Clock size={14} className="text-[#1E7A58] shrink-0" />
                <span>2-Hour Relief Replacement SLA</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F0EB] border border-[#0B3D2E]/15 text-[13px] font-medium text-[#0B3D2E]">
                <Eye size={14} className="text-[#1E7A58] shrink-0" />
                <span>2:00 AM Unannounced Van Audits</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F0EB] border border-[#0B3D2E]/15 text-[13px] font-medium text-[#0B3D2E]">
                <ShieldCheck size={14} className="text-[#1E7A58] shrink-0" />
                <span>100% Police &amp; Aadhaar Verified</span>
              </div>
            </motion.div>
          </div>

          {/* Right Photographic Proof Frame (5 cols) with subtle Ken Burns 1.03 -> 1.0 */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1.0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[12px] overflow-hidden border border-[#E5E3DD] bg-[#F7F6F2] shadow-[0_1px_2px_rgba(20,24,26,0.04),0_4px_12px_rgba(20,24,26,0.06)]">
              <div className="aspect-4/3 relative w-full overflow-hidden">
                <Image
                  src="/images/real_jsm_airport_terminal_platoon.jpg"
                  alt="JSM Security Platoon on site at Tiruchirappalli International Airport"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Photo Caption Strip */}
              <div className="p-4 bg-white border-t border-[#E5E3DD] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#14181A] flex items-center gap-1.5">
                    <Award size={14} className="text-[#A67C3D]" />
                    <span>Trichy International Airport Operations</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#4B5259]">2024 Landmark</span>
                </div>
                <p className="text-[12px] text-[#4B5259] leading-tight">
                  Uniformed platoon muster under leadership of Managing Director Sweety J at Tiruchirappalli International Airport.
                </p>
              </div>

              {/* Anchored Credential Card anchored bottom-right */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-[8px] bg-white/95 backdrop-blur-xs border border-[#E5E3DD] shadow-xs text-[11px] font-mono font-semibold text-[#14181A]">
                Est. 2024 &bull; JSMMANPOWER Origin
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
