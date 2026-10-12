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
    <section className="bg-black border-b border-white/10 py-10 sm:py-14 overflow-hidden text-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Tier 1: Featured Happy Client — Airports Authority of India (AAI) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#080C14] border border-white/15 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
            {/* AAI Logo Box */}
            <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl bg-white border border-white/20 p-2 flex items-center justify-center shrink-0 shadow-md">
              <Image
                src="/images/clients/aai_logo.svg"
                alt="Airports Authority of India (AAI) Official Logo"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>

            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold">
                <Plane size={13} />
                <span>Institutional Client Benchmark &bull; Ministry of Civil Aviation</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                Airports Authority of India (AAI)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Executed 24/7 concourse security and passenger access management for Tiruchirappalli International Terminal in 2024 with zero security breaches and 100% muster turnout.
              </p>
            </div>
          </div>

          {/* Direct Link to Verified Case Study */}
          <Link
            href="/case-studies/trichy-international-airport"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-neutral-200 text-black transition-all shadow-xl shrink-0 press-scale"
          >
            <span>Inspect Airport Contract Dossier &amp; Operations Gallery</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tier 2: Decongested Statutory Compliance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {statutoryCredentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-[#080C14] border border-white/10 hover:border-white/30 text-left transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-white">
                  <Icon size={18} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {cred.title}
                  </div>
                  <div className="text-[11px] text-neutral-400 leading-relaxed">
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
