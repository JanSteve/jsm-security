"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export function ProofSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F8F9FA] border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Real High-Res Photography Grid (5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-xl overflow-hidden border border-[#E7E5E0] bg-white shadow-xs relative aspect-16/10">
              <Image
                src="/images/real_jsm_airport_terminal_platoon.jpg"
                alt="JSM Security Platoon on site at Trichy International Airport"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-[#E7E5E0] bg-white shadow-xs relative aspect-4/3">
                <Image
                  src="/images/real_jsm_welcome_trichy_salute.jpg"
                  alt="JSM Guards at Trichy Airport Terminal Entry Gate"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-[#E7E5E0] bg-white shadow-xs relative aspect-4/3">
                <Image
                  src="/images/real_jsm_shift_muster_day.jpg"
                  alt="Daily Shift Muster & Turnout Inspection"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Operational Case Study Details (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <Award size={14} className="text-[#B8925A]" />
              <span>Operational Benchmark Assignment</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#14181F] font-normal tracking-tight">
              Tiruchirappalli International Airport Operations
            </h2>

            <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
              JSM Integrated Services executed commercial concourse security and passenger access control operations at Tiruchirappalli International Airport in 2024. Managing continuous multi-shift rotations with zero incident tolerance proved our ability to manage high-security aviation environments.
            </p>

            {/* Structured Proof Points */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-lg bg-white border border-[#E7E5E0] space-y-1">
                <div className="text-xs font-semibold text-[#14181F] flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#0B3D2E]" />
                  <span>High-Density Passenger Flow &amp; Gate Vigilance</span>
                </div>
                <p className="text-xs text-[#5A6578] pl-6">
                  Maintained strict vehicular barrier access, passenger drop lane regulation, and dual-layer identity verification.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#E7E5E0] space-y-1">
                <div className="text-xs font-semibold text-[#14181F] flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#0B3D2E]" />
                  <span>100% Turnout &amp; Strict Inductions</span>
                </div>
                <p className="text-xs text-[#5A6578] pl-6">
                  Every deployed guard underwent the mandatory 5-day pre-deployment syllabus, grooming inspection, and Aadhaar-linked police verification.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#E7E5E0] space-y-1">
                <div className="text-xs font-semibold text-[#14181F] flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#0B3D2E]" />
                  <span>Founder-Led Daily Supervision</span>
                </div>
                <p className="text-xs text-[#5A6578] pl-6">
                  Direct on-site reviews conducted by Proprietor Sweety J and Head of Operations Major AR Devadoss (Army-Veteran).
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B3D2E] hover:underline"
              >
                <span>Read Full Leadership &amp; Company Background</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
