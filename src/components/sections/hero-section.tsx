"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ShieldCheck, Award, UserCheck, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Column — Text & Primary CTAs Above Fold */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Flat Credential Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#1A1F2E]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10A870]" />
              <span className="font-semibold text-[#0F1922]">PSARA Act 2005 Licensed</span>
              <span className="text-[#4A5160]">&bull;</span>
              <span className="text-[#4A5160]">ISO 9001:2015</span>
              <span className="text-[#4A5160]">&bull;</span>
              <span className="text-[#4A5160]">DGR Empanelled</span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
              className="font-serif text-[36px] sm:text-[46px] lg:text-[56px] leading-[1.12] text-[#0F1922] font-semibold tracking-[-0.01em]"
            >
              Security. Staffing. Housekeeping. One Partner.
            </motion.h1>

            {/* Subheading / Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }}
              className="text-base sm:text-[17px] text-[#4A5160] leading-[1.6] line-measure"
            >
              PSARA-licensed, DGR-empanelled, and managing commercial facilities across Tamil Nadu. Backed by a contractual 2-hour guard relief SLA and unannounced 2:00 AM supervisor van audits.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24, ease: "easeOut" }}
              className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center px-6 h-[48px] rounded-[4px] bg-[#0F1922] hover:bg-[#080D12] text-white text-xs sm:text-sm font-semibold transition-colors shadow-subtle press-scale min-touch-target"
              >
                <span>Get Your Custom Quote</span>
              </Link>

              <Link
                href="/book-assessment"
                className="inline-flex items-center justify-center px-6 h-[48px] rounded-[4px] bg-white hover:bg-[#F8F9FA] border border-[#0F1922] text-[#0F1922] text-xs sm:text-sm font-semibold transition-colors press-scale min-touch-target"
              >
                <span>Schedule Site Assessment</span>
              </Link>
            </motion.div>

            {/* 3-Column Trust Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.32 }}
              className="pt-4 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-[#4A5160]"
            >
              <div className="flex items-center gap-2 p-2 bg-[#F8F9FA] border border-[#E5E7EB]">
                <ShieldCheck size={16} className="text-[#10A870] shrink-0" />
                <div>
                  <div className="font-semibold text-[#1A1F2E]">PSARA Licensed</div>
                  <div className="text-[10px] text-[#4A5160]">Home Dept Verified</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-[#F8F9FA] border border-[#E5E7EB]">
                <Award size={16} className="text-[#1E5BA8] shrink-0" />
                <div>
                  <div className="font-semibold text-[#1A1F2E]">DGR Empanelled</div>
                  <div className="text-[10px] text-[#4A5160]">MoD-Aligned Compliance</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-[#F8F9FA] border border-[#E5E7EB]">
                <UserCheck size={16} className="text-[#0891B2] shrink-0" />
                <div>
                  <div className="font-semibold text-[#1A1F2E]">Founder-Led Audits</div>
                  <div className="text-[10px] text-[#4A5160]">Major AR Devadoss</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Supporting Photographic Frame */}
          <div className="lg:col-span-5 relative">
            <div className="border border-[#E5E7EB] bg-[#F8F9FA] shadow-subtle">
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

              {/* Caption */}
              <div className="p-4 bg-white border-t border-[#E5E7EB] space-y-1 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1A1F2E] flex items-center gap-1.5">
                    <Award size={14} className="text-[#9C7A3C]" />
                    <span>Trichy International Airport Operations</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#4A5160]">Benchmark Project</span>
                </div>
                <p className="text-[12px] text-[#4A5160] leading-snug">
                  Uniformed security platoon muster and shift briefing under leadership of Proprietor Sweety J.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
