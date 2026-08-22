"use client";

import { servicesData } from "@/data/services";
import Link from "next/link";
import { ArrowRight, Shield, Sparkles, Users, Banknote, Ticket, Building, Monitor, Palette } from "lucide-react";
import Image from "next/image";

export function ServicesOverview() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-20 max-w-[1440px] mx-auto relative bg-[#fbf9f4]">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 pb-8 border-b border-zinc-200/80">
        <div className="md:col-span-8">
          <span className="text-[11px] md:text-[12px] font-bold tracking-[0.1em] text-[#C5A880] uppercase block mb-3">
            COMPREHENSIVE CATALOG
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight uppercase">
            INTEGRATED<br />CAPABILITIES.
          </h2>
        </div>
        <div className="md:col-span-4 flex items-end">
          <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
            A synthesized approach to operational security, facility management, and strategic resourcing across high-stakes environments.
          </p>
        </div>
      </div>

      {/* Interactive Ecosystem Orbital Node Section from Stitch */}
      <div className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-zinc-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="md:col-span-4 space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-[#C5A880] uppercase">
            ARCHITECTURE OF INTEGRATION
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            The JSM Ecosystem
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Our service vectors are not isolated silos. They operate as a cohesive operating system, providing comprehensive coverage from physical guarding to facility hygiene and tech automation.
          </p>
          <div className="pt-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline"
            >
              Explore Full Capabilities Directory <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Center Node & Orbital Clusters Diagram */}
        <div className="md:col-span-8 relative min-h-[340px] flex items-center justify-center bg-[#fbf9f4] border border-zinc-200/80 rounded-2xl overflow-hidden p-6">
          {/* Orbital Dashed Circles SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#000" strokeDasharray="2 4" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="#000" strokeDasharray="2 4" strokeWidth="0.5" />
          </svg>

          {/* Center JSM CORE Node */}
          <div className="relative z-20 w-28 h-28 md:w-32 md:h-32 rounded-full bg-black text-white flex flex-col items-center justify-center font-bold text-xs border-4 border-[#C5A880] shadow-xl text-center p-2">
            <span className="text-[10px] text-[#C5A880] tracking-widest uppercase">CORE</span>
            <span className="text-sm font-black">JSM</span>
            <span className="text-[9px] text-zinc-400 font-normal">OPERATIONS</span>
          </div>

          {/* 4 Orbital Satellite Nodes */}
          <Link href="/services/private-security" className="absolute top-[12%] left-[12%] z-20 group text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors shadow-sm mx-auto">
              <Shield size={18} className="text-black" />
            </div>
            <span className="text-[10px] font-bold text-zinc-700 group-hover:text-black tracking-wider uppercase mt-1 block">SECURITY</span>
          </Link>

          <Link href="/services/housekeeping" className="absolute top-[12%] right-[12%] z-20 group text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors shadow-sm mx-auto">
              <Sparkles size={18} className="text-black" />
            </div>
            <span className="text-[10px] font-bold text-zinc-700 group-hover:text-black tracking-wider uppercase mt-1 block">FACILITY MGMT</span>
          </Link>

          <Link href="/services/manpower" className="absolute bottom-[12%] left-[12%] z-20 group text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors shadow-sm mx-auto">
              <Users size={18} className="text-black" />
            </div>
            <span className="text-[10px] font-bold text-zinc-700 group-hover:text-black tracking-wider uppercase mt-1 block">MANPOWER</span>
          </Link>

          <Link href="/services/cash-in-transit" className="absolute bottom-[12%] right-[12%] z-20 group text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors shadow-sm mx-auto">
              <Banknote size={18} className="text-black" />
            </div>
            <span className="text-[10px] font-bold text-zinc-700 group-hover:text-black tracking-wider uppercase mt-1 block">CASH LOGISTICS</span>
          </Link>
        </div>
      </div>

      {/* Asymmetric Service Cards Gallery matching Stitch */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Card 1: Security Architecture (Span 8) */}
        <div className="md:col-span-8 bg-white border border-zinc-200/80 rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:border-black hover:shadow-xl transition-all duration-300 group">
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-2xl font-bold text-[#C5A880] font-mono">01</span>
              <span className="text-[10px] font-extrabold bg-black text-white px-3 py-1 rounded-full uppercase tracking-wider">
                CORE PHASE 1
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-black">Private Security & Guarding</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                  Comprehensive threat mitigation and physical asset protection. We deploy 5-day induction trained personnel integrated with strict post orders and surprise 2:00 AM supervisory audits.
                </p>
                <Link
                  href="/services/private-security"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline pt-2"
                >
                  View Deployment Scope <ArrowRight size={13} />
                </Link>
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100">
                <Image
                  src="/images/protective_guard.jpg"
                  alt="JSM Security Guard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Facility Management (Span 4) in Dark Theme */}
        <div className="md:col-span-4 bg-black text-white border border-zinc-800 rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-2xl font-bold text-[#C5A880] font-mono">02</span>
              <Sparkles size={24} className="text-[#C5A880]" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Facility Management</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              Total operational maintenance. 5-step closed loop hygiene (Clean → Inspect → Report → Correct → Verify) ensuring pristine commercial environments.
            </p>
          </div>
          <div className="pt-6 border-t border-zinc-800 mt-6">
            <Link
              href="/services/housekeeping"
              className="text-xs font-bold text-[#C5A880] hover:underline flex items-center gap-1"
            >
              Explore Facility SOPs <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Card 3: Strategic Manpower (Span 5) */}
        <div className="md:col-span-5 bg-white border border-zinc-200/80 rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:border-black hover:shadow-xl transition-all duration-300">
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-2xl font-bold text-[#C5A880] font-mono">03</span>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">SCALABLE</span>
            </div>
            <h3 className="text-2xl font-black text-black mb-3">Strategic Manpower</h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
              Precision workforce deployment. Originating from our roots as JSMMANPOWER, we provide vetted industrial helpers and warehouse labor with 48-hour mobilization.
            </p>
          </div>
          <div className="pt-6 border-t border-zinc-100 mt-6">
            <Link
              href="/services/manpower"
              className="text-xs font-bold text-black hover:underline flex items-center gap-1"
            >
              Request Headcount <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Card 4: Cash-in-Transit (Span 7) */}
        <div className="md:col-span-7 bg-white border border-zinc-200/80 rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:border-black hover:shadow-xl transition-all duration-300">
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-2xl font-bold text-[#C5A880] font-mono">04</span>
              <Banknote size={24} className="text-zinc-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-black">Cash-in-Transit</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                  Secure logistics for high-value assets. Two-person verified custody transfers, tamper-proof bags, and scheduled retail collections.
                </p>
                <Link
                  href="/services/cash-in-transit"
                  className="inline-flex items-center gap-1 text-xs font-bold text-black hover:underline pt-2"
                >
                  View Logistics Protocol <ArrowRight size={13} />
                </Link>
              </div>
              <div className="relative h-36 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100">
                <Image
                  src="/images/hero_operations.jpg"
                  alt="JSM Operations Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
