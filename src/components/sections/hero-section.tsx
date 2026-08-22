"use client";

import { motion } from "motion/react";
import { ArrowRight, Phone, MessageCircle, ShieldCheck, Sparkles, Users, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { brandData } from "@/data/brand";

export function HeroSection() {
  const cleanPhone = brandData.contact.phone.replace(/[^0-9+]/g, '');
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 md:px-12 lg:px-20 pt-28 pb-20 md:py-36 max-w-[1440px] mx-auto overflow-hidden bg-[#fbf9f4]">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="hidden lg:block absolute left-1/4 top-0 bottom-0 w-px bg-black/[0.04]" />
        <div className="hidden lg:block absolute left-3/4 top-0 bottom-0 w-px bg-black/[0.04]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/[0.04]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 w-full z-10 relative items-center">
        {/* Left Column: Core Positioning & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          {/* Subtle Label Caps Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200/80 shadow-xs w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.12em] text-zinc-700 uppercase font-mono">
              TAMIL NADU &amp; SOUTH INDIA OPERATIONS
            </span>
          </div>

          {/* Master Headline */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#C5A880] uppercase">
              JSM INTEGRATED SERVICES
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[1.08] uppercase">
              ONE PARTNER.<br />
              EVERY SOLUTION.
            </h1>
          </div>

          {/* Subtitle with calm confidence & clear business language */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 max-w-xl font-normal leading-relaxed">
            You shouldn't need five vendors to keep your property running. We coordinate disciplined <strong>Private Security</strong>, <strong>Commercial Housekeeping</strong>, and <strong>Contractual Manpower</strong> under one accountable partner.
          </p>

          {/* CTA Button Group with clear hierarchy */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-black hover:bg-zinc-800 text-white text-xs font-bold tracking-widest px-8 h-12 rounded-full border-b-2 border-[#C5A880] shadow-md transition-all uppercase group"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform text-[#C5A880]" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-white hover:bg-zinc-100 text-black text-xs font-bold tracking-widest px-7 h-12 rounded-full border border-zinc-300 transition-all uppercase shadow-xs"
            >
              EXPLORE SERVICES
            </Link>

            <a
              href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20discuss%20our%20facility%20requirements.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-xs sm:w-auto"
            >
              <MessageCircle size={16} className="text-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-4 border-t border-zinc-200/70 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-zinc-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#C5A880] flex-shrink-0" />
              <span>PSARA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#C5A880] flex-shrink-0" />
              <span>5-Day Induction Training</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 size={15} className="text-[#C5A880] flex-shrink-0" />
              <span>2-Hour Replacement SLA</span>
            </div>
          </div>
        </div>

        {/* Right Column: Executive Operations Card (Calm Confidence & Human Proof) */}
        <div className="lg:col-span-5 relative">
          <div className="w-full bg-white rounded-3xl border border-zinc-200/90 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C5A880]" />

            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880]">
                  VERIFIED OPERATIONAL TRACK RECORD
                </span>
                <h3 className="text-base sm:text-lg font-black text-black tracking-tight">
                  JSM Service Architecture
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md">
                EST. 2024
              </span>
            </div>

            {/* Core Capability Badges */}
            <div className="space-y-3">
              <div className="p-3.5 bg-[#fbf9f4] rounded-2xl border border-zinc-200/70 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white border border-zinc-200 text-black shadow-xs flex-shrink-0">
                  <ShieldCheck size={18} className="text-black" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-black">Private Security &amp; Gate Control</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                    5-day trained personnel, strict post orders, and unannounced 2:00 AM supervisor spot-inspections.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-[#fbf9f4] rounded-2xl border border-zinc-200/70 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white border border-zinc-200 text-black shadow-xs flex-shrink-0">
                  <Sparkles size={18} className="text-black" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-black">5-Step Housekeeping &amp; Hygiene</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                    Closed-loop protocol: Clean → Inspect → Report → Correct → Verify for immaculate commercial spaces.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-[#fbf9f4] rounded-2xl border border-zinc-200/70 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white border border-zinc-200 text-black shadow-xs flex-shrink-0">
                  <Users size={18} className="text-black" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-black">Industrial Manpower &amp; Staffing</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                    Originating from JSMMANPOWER roots. Vetted workforce deployed for factories, logistics, and facilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Foundational Milestone Note */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-medium">
              <span className="font-semibold text-zinc-700">Landmark Project:</span>
              <span className="font-bold text-black">2024 Trichy Airport Contract</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
