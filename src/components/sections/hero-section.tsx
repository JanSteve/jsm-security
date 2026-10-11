"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Clock, ShieldCheck, Eye, Award } from "lucide-react";
import { Hero3DScene, HologramShieldCanvas } from "@/components/3d";

export function HeroSection() {
  const [activeVisualTab, setActiveVisualTab] = React.useState<"photo" | "hologram">("photo");

  return (
    <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-white border-b border-[#E4E7EC]">
      {/* 3D WebGL / Canvas Spatial Engine & Central Command Hologram */}
      <Hero3DScene showShield={activeVisualTab === "photo"} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="font-semibold">Statutory Labour Law Compliant (Minimum Wages Act & ECR Challans)</span>
              <span className="text-[#4A5160]">&bull;</span>
              <span className="text-[#4A5160]">Professional Private Security & Facility Operations</span>
              <span className="text-[#4A5160]">&bull;</span>
              <span className="text-[#4A5160]">DGR Aligned</span>
            </motion.div>

            {/* Display Headline: Source Serif 4, 34px mobile / 56px desktop, 600 weight */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
              className="font-serif text-[28px] sm:text-[44px] lg:text-[56px] leading-[1.12] text-[#14181F] font-semibold tracking-[-0.01em] text-left"
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
                className="inline-flex w-full sm:w-auto items-center justify-center px-6 h-[48px] rounded-[4px] bg-[#0F2A47] hover:bg-[#0A1E33] text-white text-sm font-semibold transition-colors shadow-subtle press-scale min-touch-target"
              >
                <span>Request a Proposal</span>
              </Link>

              <Link
                href="/services"
                className="inline-flex w-full sm:w-auto items-center justify-center px-6 h-[48px] rounded-[4px] bg-white hover:bg-[#F6F7F9] border border-[#0F2A47] text-[#0F2A47] text-sm font-semibold transition-colors press-scale min-touch-target"
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

          {/* Right Supporting Visual / 3D Command Frame — 0px radius, hairline border */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-[#E4E7EC] bg-[#F6F7F9] shadow-subtle overflow-hidden">
              {/* Tab Selector: Field Platoon vs 3D Command Hologram */}
              <div className="flex items-center justify-between border-b border-[#E4E7EC] bg-white px-3 py-2 text-xs">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveVisualTab("photo")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-[3px] transition-colors ${
                      activeVisualTab === "photo"
                        ? "bg-[#0F2A47] text-white"
                        : "text-[#4A5160] hover:text-[#14181F] hover:bg-[#F6F7F9]"
                    }`}
                  >
                    Platoon Operations
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveVisualTab("hologram")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-[3px] transition-colors flex items-center gap-1.5 ${
                      activeVisualTab === "hologram"
                        ? "bg-[#0F2A47] text-white"
                        : "text-[#4A5160] hover:text-[#14181F] hover:bg-[#F6F7F9]"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span>3D Command Shield</span>
                  </button>
                </div>
                <span className="text-[11px] font-mono text-[#9C7A3C] uppercase tracking-wider">
                  {activeVisualTab === "photo" ? "Trichy Benchmark" : "WebGL Active"}
                </span>
              </div>

              {activeVisualTab === "photo" ? (
                <>
                  <div className="aspect-square sm:aspect-[4/3] relative w-full overflow-hidden">
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
                    <p className="text-[13px] text-[#4A5160] leading-snug mt-1">
                      Uniformed platoon muster and turnout briefing under leadership of Proprietor Sweety J.
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-[#0B0F17] text-white space-y-3">
                  <div className="h-[280px] sm:h-[320px] relative w-full flex items-center justify-center">
                    <HologramShieldCanvas />
                  </div>
                  <div className="pt-2 border-t border-[#1F2937] text-left space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#D4AF37] flex items-center gap-1.5">
                        <ShieldCheck size={14} />
                        <span>Central Command Hologram</span>
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400">60 FPS Hardware Accelerated</span>
                    </div>
                    <p className="text-[12px] text-gray-400 leading-snug">
                      Interactive 3D wireframe shield reacting to cursor position and scroll depth with concentric gyroscopes.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
