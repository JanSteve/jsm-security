"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Award, 
  Binary, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  FileCheck2,
  ExternalLink
} from "lucide-react";
import { brandData } from "@/data/brand";

interface LeaderDossier {
  name: string;
  designation: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  icon: any;
  coreResponsibilities: string[];
  operationalQuote: string;
  directAction: {
    label: string;
    href: string;
  };
}

const EXECUTIVE_DOSSIERS: LeaderDossier[] = [
  {
    name: "Sweety J",
    designation: "Proprietor & Managing Director",
    subtitle: "EXECUTIVE COMMAND • STATUTORY COMPLIANCE • PSARA GOVERNANCE",
    badge: "FOUNDER & PROPRIETOR",
    badgeColor: "bg-[#C5A880]/15 text-[#C5A880] border-[#C5A880]/30",
    icon: Award,
    coreResponsibilities: [
      "Sole Proprietorship & Executive Policy Governance",
      "PSARA 2005 Statutory Licensing & Home Dept Liaison",
      "100% EPF & ESIC Zero-Liability Client Indemnity",
      "Institutional Client Relationships & SLA Enforcement"
    ],
    operationalQuote: "Disciplined service is not an afterthought; it is our foundation. Every guard, marshal, and facility staff carries our personal accountability.",
    directAction: {
      label: "Official Credentials",
      href: "/about"
    }
  },
  {
    name: "Major AR Devadoss",
    designation: "Head of Operations (Army-Veteran)",
    subtitle: "TACTICAL FIELD DEPLOYMENT • DRILL MUSTER • 2:00 AM NIGHT PATROLS",
    badge: "EX-INDIAN ARMED FORCES",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    icon: ShieldCheck,
    coreResponsibilities: [
      "Military-Grade Guard Drill & 5-Day Induction Syllabus",
      "2:00 AM Unannounced Mobile Van Supervisor Spot-Audits",
      "2-Hour Guaranteed Relief Guard Deployment SLA",
      "Perimeter Access Control & Armed Post Command"
    ],
    operationalQuote: "Vigilance is non-negotiable. When our roving inspection van arrives at 2:00 AM, the perimeter post is either secure or it is rectified on the spot.",
    directAction: {
      label: "View Security SOP",
      href: "/services/private-security"
    }
  },
  {
    name: "R Jan Steve Daniel",
    designation: "Chief Technical Officer & Audit",
    subtitle: "DIGITAL BIOMETRICS • DOCUMENT SCANNING & OCR • COMPLIANCE AUDITS",
    badge: "CTO & AUDIT HEAD",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    icon: Binary,
    coreResponsibilities: [
      "Biometric Attendance & Live Field Telemetry Infrastructure",
      "Bulk Document Scanning, OCR & Digital Archiving (JSM-05)",
      "Statutory Labour Audit & Monthly ECR Reconciliation",
      "Enterprise IT Network & E-Governance Systems"
    ],
    operationalQuote: "Technology turns manual promises into auditable proof. From GPS biometric shifts to searchable digital records, we provide absolute transparency.",
    directAction: {
      label: "Explore IT & OCR",
      href: "/services/scanning-digitalization-it"
    }
  }
];

export function LeadershipSection() {
  return (
    <section className="py-16 md:py-20 bg-[#07090E] text-white border-t border-white/10 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[250px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 space-y-12">
        {/* Header - Framer SecurityForce Meet Our Security Experts */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#C5A880]">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase">
                [Meet Our Security Experts]
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white text-balance">
              Executive command &amp; field specialists.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed text-pretty">
              Verifiable leadership and operational commanders. No anonymous brokerages or faceless subcontractors—every contract is signed, audited, and personally inspected.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-mono font-bold transition-all press-scale min-touch-target"
            >
              <span>View full credentials</span>
              <ArrowRight size={13} className="text-[#C5A880]" />
            </Link>
          </div>
        </div>

        {/* Dossier Cards Grid (Cult UI / 21st.dev Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {EXECUTIVE_DOSSIERS.map((dossier, idx) => {
            const Icon = dossier.icon;
            return (
              <div
                key={dossier.name}
                className="group relative bg-[#111723] border border-zinc-800 hover:border-[#C5A880]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,168,128,0.12)] hover:-translate-y-1"
              >
                {/* Top Badge & Tier Index */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-black tracking-wider uppercase border ${dossier.badgeColor}`}>
                    {dossier.badge}
                  </span>
                  <span className="font-mono text-xs text-zinc-500 font-black">
                    COMMAND 0{idx + 1}
                  </span>
                </div>

                {/* Profile Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-[#C5A880] shrink-0 group-hover:scale-105 transition-transform">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {dossier.name}
                      </h3>
                      <p className="text-xs font-bold text-[#C5A880] font-mono">
                        {dossier.designation}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wide block pt-1">
                    {dossier.subtitle}
                  </span>
                </div>

                {/* Quote Box */}
                <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800/80 italic text-xs text-zinc-300 leading-relaxed">
                  "{dossier.operationalQuote}"
                </div>

                {/* Core Responsibilities Checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-wider block">
                    OPERATIONAL MANDATE
                  </span>
                  {dossier.coreResponsibilities.map((resp) => (
                    <div key={resp} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span className="leading-snug">{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Action Link */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <Link
                    href={dossier.directAction.href}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C5A880] hover:text-white transition-colors group-hover:underline"
                  >
                    <span>{dossier.directAction.label}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="mailto:contact@jsmintegratedservices.com"
                    aria-label={`Email ${dossier.name}`}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                  >
                    <Mail size={13} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Proof of Physical Reality Strip */}
        <div className="bg-[#111723]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] shrink-0">
              <FileCheck2 size={24} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-black text-[#C5A880] uppercase tracking-wider">
                OFFICIAL COMPANY CREDENTIALS
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Verifiable Registration • UDYAM-TN-27-0097945 • Kottapattu HQ
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Physical headquarters at No. 13, Dhandapani Pillai Nagar, Kottapattu, Trichy 620004.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all"
            >
              <span>Contact Headquarters</span>
              <ArrowRight size={12} className="text-[#C5A880]" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#b0936b] text-black text-xs font-black uppercase tracking-wider transition-all"
            >
              <span>Verify Company Proof</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
