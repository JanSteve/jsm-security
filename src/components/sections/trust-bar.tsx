'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  FileCheck, 
  CheckCircle2, 
  Plane, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';

const statutoryCredentials = [
  {
    icon: ShieldCheck,
    title: "Licensed Private Security Agency",
    subtitle: "Governed by Home Department, Govt of Tamil Nadu",
  },
  {
    icon: FileCheck,
    title: "DGR / MoD Alignment",
    subtitle: "Ex-Servicemen Welfare & Resettlement Standards",
  },
  {
    icon: CheckCircle2,
    title: "100% EPF & ESIC Compliant",
    subtitle: "Zero Statutory Client Liability & Direct Bank Remittance",
  },
  {
    icon: Award,
    title: "Ex-Servicemen Field Leadership",
    subtitle: "Daily Turnout Audits Directed by Major AR Devadoss",
  },
];

export function TrustBar() {
  return (
    <section className="bg-[#F8F9FA] border-b border-[#E4E7EC] py-10 sm:py-14 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Tier 1: Featured Happy Client — Airports Authority of India (AAI) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D8DEE6] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
            {/* AAI Logo Box */}
            <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl bg-white border border-[#E4E7EC] p-2 flex items-center justify-center shrink-0 shadow-xs">
              <Image
                src="/images/clients/aai_logo.svg"
                alt="Airports Authority of India (AAI) Official Logo"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>

            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#0F2A47]/8 border border-[#0F2A47]/15 text-[#0F2A47] text-xs font-semibold">
                <Plane size={13} className="text-[#9C7A3C]" />
                <span>Happy Institutional Client &bull; Aviation Operations Benchmark</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14181F] tracking-tight">
                Airports Authority of India (AAI)
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5160] leading-relaxed">
                JSM Integrated Services executed round-the-clock commercial concourse security and passenger access management for the international terminal expansion in 2024 with zero security incidents and 100% muster compliance.
              </p>
            </div>
          </div>

          {/* Direct Link to Verified Case Study */}
          <Link
            href="/case-studies/trichy-international-airport"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#0F2A47] hover:bg-[#1A3D63] text-white transition-all shadow-sm shrink-0 press-scale"
          >
            <span>Inspect Airport Contract Proof</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tier 2: Decongested Statutory Compliance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statutoryCredentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[#E4E7EC] hover:border-[#9C7A3C]/40 text-left transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0F2A47]/6 border border-[#0F2A47]/12 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={20} className="text-[#0F2A47]" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="text-sm font-bold text-[#14181F] leading-snug">
                    {cred.title}
                  </div>
                  <div className="text-xs text-[#5A6578] leading-relaxed">
                    {cred.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
