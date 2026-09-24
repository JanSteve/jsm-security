"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, CheckCircle2, Phone, Award } from "lucide-react";
import { brandData } from "@/data/brand";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-white border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Copy (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Credential Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F9FA] border border-[#E7E5E0] text-xs font-semibold text-[#14181F]">
              <span className="w-2 h-2 rounded-full bg-[#0B3D2E]" />
              <span className="text-[#0B3D2E] font-bold">PSARA Act 2005 Licensed</span>
              <span className="text-neutral-300">&bull;</span>
              <span className="text-[#5A6578]">ISO 9001:2015 &bull; DGR Aligned</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.12] text-[#14181F] font-normal tracking-tight">
              Disciplined security, verified manpower &amp; integrated facility operations.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed line-measure">
              JSM Integrated Services delivers structured Ex-Servicemen and private security guarding, 100% EPF/ESIC-compliant contract staffing, and commercial facility hygiene across Tamil Nadu — backed by a contractual 2-hour guard replacement guarantee.
            </p>

            {/* Primary & Secondary CTAs (Max 2 CTAs) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0B3D2E] hover:bg-[#082C21] text-white text-sm font-semibold transition-all shadow-xs press-scale"
              >
                <span>Request a Proposal</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#F8F9FA] hover:bg-[#F0F1F2] border border-[#E7E5E0] text-[#14181F] text-sm font-semibold transition-all press-scale"
              >
                <span>Explore Three-Tier Model</span>
              </Link>
            </div>

            {/* Key Service Guarantees (Single Row, Non-Shouty) */}
            <div className="pt-6 border-t border-[#E7E5E0]/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5A6578]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#0B3D2E] shrink-0" />
                <span>2-Hour Relief Replacement SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#0B3D2E] shrink-0" />
                <span>2:00 AM Unannounced Van Audits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#0B3D2E] shrink-0" />
                <span>100% Police &amp; Aadhaar Verified</span>
              </div>
            </div>
          </motion.div>

          {/* Right Photographic Proof Frame (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-xl overflow-hidden border border-[#E7E5E0] bg-[#F8F9FA] shadow-sm">
              <div className="aspect-4/3 relative w-full">
                <Image
                  src="/images/real_jsm_airport_terminal_platoon.jpg"
                  alt="JSM Integrated Services Security Platoon on site at Tiruchirappalli International Airport"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Photo Caption Strip */}
              <div className="p-4 bg-white border-t border-[#E7E5E0] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#14181F] flex items-center gap-1.5">
                    <Award size={14} className="text-[#B8925A]" />
                    <span>Trichy International Airport Operations</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#5A6578]">2024 Landmark</span>
                </div>
                <p className="text-[11px] text-[#5A6578] leading-tight">
                  Uniformed platoon muster under leadership of Managing Director Sweety J at Tiruchirappalli International Airport.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
