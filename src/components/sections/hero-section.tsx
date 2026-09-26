"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Clock, ShieldCheck, Eye, Award } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-white border-b border-[#E4E7EC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Block — Text & CTA first on all devices */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Small flat credential badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#F6F7F9] border border-[#E4E7EC] text-xs text-[#14181F]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A3C]" />
              <span className="font-semibold">PSARA Act 2005 Licensed</span>
              <span className="text-[#4A5160]">&bull;</span>
              <span className="text-[#4A5160]">ISO 9001:2015</span>
              <span className="text-[#4A5160]">&bull;</span>
              <span className="text-[#4A5160]">DGR Aligned</span>
            </motion.div>

            {/* Display Headline: Source Serif 4, 34px mobile / 56px desktop, 600 weight */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
              className="font-serif text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.12] text-[#14181F] font-semibold tracking-[-0.01em] text-left"
            >
              Disciplined security, verified manpower &amp; integrated facility operations.
            </motion.h1>

            {/* One-line Value Proposition / Body: Public Sans, max 72ch */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }}
              className="text-base sm:text-[17px] text-[#4A5160] leading-[1.6] line-measure text-left"
            >
              JSM Integrated Services delivers structured Ex-Servicemen and private security guarding, 100% EPF/ESIC-compliant contract staffing, and commercial facility hygiene across Tamil Nadu &mdash; backed by a contractual 2-hour guard replacement guarantee.
            </motion.p>

            {/* Primary & Secondary Action: Primary is solid navy with NO arrow; Secondary is navy outline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24, ease: "easeOut" }}
              className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center px-6 h-[48px] rounded-[4px] bg-[#0F2A47] hover:bg-[#0A1E33] text-white text-sm font-semibold transition-colors shadow-subtle press-scale min-touch-target"
              >
                <span>Request a Proposal</span>
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 h-[48px] rounded-[4px] bg-white hover:bg-[#F6F7F9] border border-[#0F2A47] text-[#0F2A47] text-sm font-semibold transition-colors press-scale min-touch-target"
              >
                <span>Explore Three-Tier Model</span>
              </Link>
            </motion.div>

            {/* Flat Trust Indicators: Small, flat, text+icon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.32 }}
              className="pt-4 border-t border-[#E4E7EC] flex flex-wrap gap-2 text-xs text-[#4A5160]"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F6F7F9] border border-[#E4E7EC]">
                <Clock size={13} className="text-[#9C7A3C] shrink-0" />
                <span>2-Hour Relief Replacement SLA</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F6F7F9] border border-[#E4E7EC]">
                <Eye size={13} className="text-[#9C7A3C] shrink-0" />
                <span>2:00 AM Unannounced Van Audits</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F6F7F9] border border-[#E4E7EC]">
                <ShieldCheck size={13} className="text-[#9C7A3C] shrink-0" />
                <span>100% Police &amp; Aadhaar Verified</span>
              </div>
            </motion.div>
          </div>

          {/* Right Supporting Photographic Proof Frame — 0px radius, hairline border */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-[#E4E7EC] bg-[#F6F7F9] shadow-subtle">
              <div className="aspect-[4/3] relative w-full overflow-hidden">
                <Image
                  src="/images/real_jsm_airport_terminal_platoon.jpg"
                  alt="JSM Security Platoon on site at Tiruchirappalli International Airport"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Verified Editorial Caption */}
              <div className="p-4 bg-white border-t border-[#E4E7EC] space-y-1 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#14181F] flex items-center gap-1.5">
                    <Award size={14} className="text-[#9C7A3C]" />
                    <span>Trichy International Airport Operations</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#4A5160]">2024 Benchmark</span>
                </div>
                <p className="text-[12px] text-[#4A5160] leading-snug">
                  Uniformed platoon muster and turnout briefing under leadership of Proprietor Sweety J.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
