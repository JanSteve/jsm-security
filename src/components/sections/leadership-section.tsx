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
    badgeColor: "bg-[#0071e3]/10 text-[#0071e3] border-[#0071e3]/20",
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
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
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
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/60",
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
    <section className="py-20 md:py-28 bg-white text-[#1d1d1f] border-t border-black/[0.08] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                Meet Our Leadership
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] text-balance">
              Executive command &amp; field specialists.
            </h2>
            <p className="text-sm sm:text-base text-[#86868b] max-w-2xl font-normal leading-relaxed text-pretty">
              Verifiable leadership and operational commanders. No anonymous brokerages or faceless subcontractors—every contract is signed, audited, and personally inspected.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-black/[0.05] border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold transition-all min-touch-target"
            >
              <span>View full credentials</span>
              <ArrowRight size={13} className="text-[#0071e3]" />
            </Link>
          </div>
        </div>

        {/* Dossier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {EXECUTIVE_DOSSIERS.map((dossier, idx) => {
            const Icon = dossier.icon;
            return (
              <div
                key={dossier.name}
                className="group relative bg-[#f5f5f7] border border-black/[0.06] hover:border-black/[0.12] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Top Badge & Tier Index */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border border-black/[0.08] bg-white text-[#1d1d1f]">
                    {dossier.badge}
                  </span>
                  <span className="text-xs text-[#86868b] font-medium">
                    COMMAND 0{idx + 1}
                  </span>
                </div>

                {/* Profile Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center text-[#1d1d1f] shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight">
                        {dossier.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#0071e3]">
                        {dossier.designation}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[#86868b] uppercase tracking-wide block pt-1">
                    {dossier.subtitle}
                  </span>
                </div>

                {/* Quote Box */}
                <div className="p-4 rounded-2xl bg-white border border-black/[0.06] italic text-xs text-[#515154] leading-relaxed shadow-sm">
                  "{dossier.operationalQuote}"
                </div>

                {/* Core Responsibilities Checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider block">
                    OPERATIONAL MANDATE
                  </span>
                  {dossier.coreResponsibilities.map((resp) => (
                    <div key={resp} className="flex items-start gap-2 text-xs text-[#1d1d1f]">
                      <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span className="leading-snug">{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Action Link */}
                <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between">
                  <Link
                    href={dossier.directAction.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline"
                  >
                    <span>{dossier.directAction.label}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="mailto:contact@jsmintegratedservices.com"
                    aria-label={`Email ${dossier.name}`}
                    className="w-8 h-8 rounded-full bg-white hover:bg-black/[0.05] border border-black/[0.08] flex items-center justify-center text-[#1d1d1f] transition-colors shadow-sm"
                  >
                    <Mail size={13} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Proof of Physical Reality Strip */}
        <div className="bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center text-[#1d1d1f] shrink-0 shadow-sm">
              <FileCheck2 size={24} className="text-[#0071e3]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#0071e3] uppercase tracking-wider">
                OFFICIAL COMPANY CREDENTIALS
              </span>
              <h4 className="text-sm sm:text-base font-semibold text-[#1d1d1f]">
                Verifiable Registration • UDYAM-TN-27-0097945 • Kottapattu HQ
              </h4>
              <p className="text-xs text-[#86868b] mt-0.5">
                Physical headquarters at No. 13, Dhandapani Pillai Nagar, Kottapattu, Trichy 620004.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-black/[0.04] border border-black/[0.1] text-[#1d1d1f] text-xs font-semibold transition-all shadow-sm"
            >
              <span>Contact Headquarters</span>
              <ArrowRight size={12} className="text-[#0071e3]" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold transition-all shadow-sm"
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
