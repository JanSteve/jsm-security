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
  ArrowRight 
} from 'lucide-react';
import { ClientLogoMarquee } from './client-logo-marquee';

const statutoryCredentials = [
  {
    icon: ShieldCheck,
    title: "Licensed Private Security Agency",
    subtitle: "Tamil Nadu Home Department licensed",
  },
  {
    icon: FileCheck,
    title: "DGR / MoD Alignment",
    subtitle: "Resettlement-trained defense veterans",
  },
  {
    icon: CheckCircle2,
    title: "100% EPF & ESIC Compliant",
    subtitle: "Zero client liability, direct bank remittance",
  },
  {
    icon: Award,
    title: "Ex-Servicemen Field Leadership",
    subtitle: "Daily field audits by Major AR Devadoss",
  },
];

export function TrustBar() {
  return (
    <section className="bg-[#030712] border-b border-cyan-500/20 py-8 sm:py-10 overflow-hidden text-white space-y-6 sm:space-y-8">
      {/* Tier 1: Featured Happy Client — Airports Authority of India (AAI) */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl tactical-glass-card border border-cyan-500/30 shadow-[0_0_40px_rgba(14,165,233,0.15)] flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
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
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold font-mono shadow-[0_0_10px_rgba(14,165,233,0.12)]">
                <Plane size={13} className="text-cyan-400" />
                <span>Institutional Client Benchmark &bull; Ministry of Civil Aviation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Airports Authority of India (AAI)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                24/7 concourse security and access control for Tiruchirappalli International Terminal in 2024—zero security breaches, 100% muster turnout.
              </p>
            </div>
          </div>

          {/* Direct Link to Verified Case Study */}
          <Link
            href="/case-studies/trichy-international-airport"
            className="btn-border-beam min-touch-target min-h-[44px] shrink-0"
          >
            <span className="btn-border-beam-inner h-full">
              <span>Inspect AAI Contract Dossier</span>
              <ArrowRight size={14} className="text-cyan-300" />
            </span>
          </Link>
        </div>
      </div>

      {/* Infinite Smooth Auto-Scrolling Client & Certification Logo Marquee Ticker */}
      <ClientLogoMarquee showTitle={true} className="border-y border-cyan-500/20 my-2" />

      {/* Tier 2: Decongested Statutory Compliance Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {statutoryCredentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl tactical-glass-card border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.12)] text-left transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5 text-cyan-300">
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

export { ClientLogoMarquee };
