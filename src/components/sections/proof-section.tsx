"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle2 } from "lucide-react";

export function ProofSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F6F7F9] border-b border-[#E4E7EC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Verified Photography Grid (6 cols) */}
          <div className="lg:col-span-6 space-y-3.5">
            <div className="border border-[#E4E7EC] bg-white relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/real_jsm_airport_terminal_platoon.jpg"
                alt="JSM Security Platoon deployed on site at Tiruchirappalli International Airport"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="border border-[#E4E7EC] bg-white relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/real_jsm_welcome_trichy_salute.jpg"
                  alt="JSM Uniformed Guard at Tiruchirappalli Terminal Entry Gate"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="border border-[#E4E7EC] bg-white relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/real_jsm_shift_muster_day.jpg"
                  alt="Daily Shift Briefing and Turnout Inspection"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Operational Case Study Details (6 cols) */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9C7A3C]">
              <Award size={14} />
              <span>Operational Benchmark Assignment</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] leading-[1.18] text-[#14181F] font-semibold tracking-[-0.01em]">
              Tiruchirappalli International Airport Operations
            </h2>

            <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed line-measure">
              JSM Integrated Services executed commercial concourse security and passenger access control operations at Tiruchirappalli International Airport in 2024. Managing continuous multi-shift rotations with zero incident tolerance proved our capability to protect high-consequence transport infrastructure.
            </p>

            {/* Structured Proof Points with Hairline Borders */}
            <div className="space-y-2.5 pt-1">
              <div className="p-3.5 bg-white border border-[#E4E7EC] space-y-1">
                <div className="text-xs font-semibold text-[#14181F] flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#0F2A47]" />
                  <span>High-Density Concourse Access &amp; Barrier Control</span>
                </div>
                <p className="text-xs text-[#4A5160] pl-5 leading-normal">
                  Regulated vehicular drop lanes, gate-barrier verification, and multi-tier visitor check protocols.
                </p>
              </div>

              <div className="p-3.5 bg-white border border-[#E4E7EC] space-y-1">
                <div className="text-xs font-semibold text-[#14181F] flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#0F2A47]" />
                  <span>100% Pre-Deployment Induction &amp; Turnout Audits</span>
                </div>
                <p className="text-xs text-[#4A5160] pl-5 leading-normal">
                  All deployed marshals underwent mandatory PSARA 5-day syllabus training, Aadhaar verification, and police record checks.
                </p>
              </div>

              <div className="p-3.5 bg-white border border-[#E4E7EC] space-y-1">
                <div className="text-xs font-semibold text-[#14181F] flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#0F2A47]" />
                  <span>Direct Leadership Oversight on Ground</span>
                </div>
                <p className="text-xs text-[#4A5160] pl-5 leading-normal">
                  Daily shifts supervised directly by Proprietor Sweety J and Head of Operations Major AR Devadoss (Army-Veteran).
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/case-studies/trichy-international-airport"
                className="inline-flex items-center justify-center px-4 py-2 rounded-[4px] border border-[#0F2A47] text-[#0F2A47] hover:bg-[#0F2A47] hover:text-white text-xs font-semibold transition-colors min-touch-target"
              >
                <span>Read Full Case Study</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
