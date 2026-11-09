"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, ArrowRight, Lock, CheckCircle2, Briefcase } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

interface DossierRole {
  id: string;
  tabLabel: string;
  designation: string;
  compensation: string;
  confirmTag: string;
  experience: string;
  sectors: string;
  confidentialId: string;
  highlights: string[];
  status: string;
}

const DOSSIER_PROFILES: DossierRole[] = [
  {
    id: "plant-ops",
    tabLabel: "VP Operations",
    designation: "Vice President — Plant Operations & Engineering",
    compensation: "₹45 LPA",
    confirmTag: "[CONFIRM: role band]",
    experience: "16 Years P&L & Multi-Plant Leadership",
    sectors: "Heavy Engineering · Automobile · Tamil Nadu / Gujarat",
    confidentialId: "JSM-MANDATE-TN408",
    highlights: [
      "Steered 3 manufacturing units delivering ₹380 Cr annual production",
      "Pioneered Industry 4.0 automation reducing defect rate by 34%",
      "Available for discreet confidential interview within 48 hours",
    ],
    status: "Active Verified Finalist",
  },
  {
    id: "tech-cto",
    tabLabel: "Chief Technology Officer",
    designation: "Chief Technology Officer / Enterprise Architect",
    compensation: "₹65 LPA",
    confirmTag: "[CONFIRM: role band]",
    experience: "14 Years Distributed Systems & SaaS Scale",
    sectors: "Enterprise SaaS · FinTech · Bengaluru / Mumbai",
    confidentialId: "JSM-MANDATE-KA912",
    highlights: [
      "Scaled engineering org from 40 to 180 engineers across 2 tech hubs",
      "Architected core high-throughput financial mediation pipelines",
      "Notice horizon: 30 days discreet transition window",
    ],
    status: "Pre-Screened Leadership Asset",
  },
  {
    id: "md-csuite",
    tabLabel: "Managing Director",
    designation: "Managing Director / Chief Executive Officer",
    compensation: "₹95 LPA",
    confirmTag: "[CONFIRM: role band]",
    experience: "22 Years Board-Level Corporate Governance",
    sectors: "Manufacturing & Infrastructure · Pan-India Mandates",
    confidentialId: "JSM-MANDATE-DL105",
    highlights: [
      "Managed ₹850 Cr P&L turnaround with consistent EBITDA expansion",
      "Steered joint venture negotiations and international institutional tie-ups",
      "Vetted by JSM Executive Desk under strict non-disclosure",
    ],
    status: "Executive Board Finalist",
  },
];

export function ExecutiveDossierCard() {
  const [activeId, setActiveId] = useState<string>("plant-ops");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const activeProfile = DOSSIER_PROFILES.find((p) => p.id === activeId) || DOSSIER_PROFILES[0];

  // Auto-cycle through profiles every 5.5s unless paused by user interaction
  useEffect(() => {
    if (isPaused) return;

    const interval = 50; // update every 50ms
    const totalDuration = 5500;
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveId((curr) => {
            const currentIndex = DOSSIER_PROFILES.findIndex((p) => p.id === curr);
            const nextIndex = (currentIndex + 1) % DOSSIER_PROFILES.length;
            return DOSSIER_PROFILES[nextIndex].id;
          });
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, activeId]);

  const handleSelectTab = (id: string) => {
    setActiveId(id);
    setProgress(0);
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto my-10 sm:my-14 text-left"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Outer Card Frame with Architectural Border & Subtle Beam */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-[#0E1116]/12 shadow-[0_4px_24px_rgba(14,17,22,0.06)] overflow-hidden">
        <BorderBeam size={260} duration={16} colorFrom="#1F4E5F" colorTo="#C8553D" />

        {/* Top Confidential Header Bar */}
        <div className="px-5 py-3.5 bg-[#0E1116] text-[#F6F3EE] flex flex-wrap items-center justify-between gap-3 text-xs font-mono relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8553D] animate-pulse" aria-hidden="true" />
            <span className="font-semibold tracking-wider text-white">CONFIDENTIAL BLIND DOSSIER SPECIMEN</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Lock className="w-3.5 h-3.5 text-[#C8553D]" aria-hidden="true" />
            <span>REF: {activeProfile.confidentialId}</span>
          </div>
        </div>

        {/* Interactive Tab Switcher with Animated Progress Bar */}
        <div className="p-3 sm:p-4 bg-[#F6F3EE] border-b border-[#0E1116]/10 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto relative z-10">
          {DOSSIER_PROFILES.map((profile) => {
            const isSelected = profile.id === activeId;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => handleSelectTab(profile.id)}
                className={`relative px-4 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4E5F] min-h-[44px] ${
                  isSelected ? "text-[#0E1116]" : "text-[#525866] hover:text-[#0E1116]"
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeDossierPill"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="absolute inset-0 bg-white rounded-full border border-[#0E1116]/12 shadow-xs overflow-hidden"
                  >
                    {/* Live Progress Bar for auto-cycling */}
                    <div 
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C8553D]/30 rounded-full overflow-hidden"
                    >
                      <div 
                        className="h-full bg-[#C8553D] transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </motion.div>
                )}
                <span className="relative z-10">{profile.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Dossier Body */}
        <div className="p-6 sm:p-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProfile.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Profile Title & Target Compensation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#0E1116]/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1F4E5F] mb-1">
                    <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{activeProfile.experience}</span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#0E1116]">
                    {activeProfile.designation}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525866] mt-0.5">
                    {activeProfile.sectors}
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#525866] block">
                    Target Compensation
                  </span>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-[#C8553D] tabular-nums">
                    {activeProfile.compensation}
                  </div>
                  <span className="text-[11px] font-mono text-[#525866]">
                    {activeProfile.confirmTag}
                  </span>
                </div>
              </div>

              {/* Redacted Identity Security Strip */}
              <div className="p-3 rounded-xl bg-[#F6F3EE] border border-[#0E1116]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#0E1116] bg-black/10 px-2 py-0.5 rounded select-none tracking-widest">
                    ███████████████
                  </span>
                  <span className="text-[#525866]">
                    Identity masked until NDA confirmation &amp; client alignment.
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-semibold text-[#1F4E5F] shrink-0">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>{activeProfile.status}</span>
                </span>
              </div>

              {/* Verified Career Highlights */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E1116] block mb-3">
                  Verified Candidate Highlights:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {activeProfile.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F6F3EE]/60 border border-[#0E1116]/8 text-xs text-[#0E1116] leading-relaxed flex items-start gap-2.5 shadow-2xs hover:bg-[#F6F3EE] hover:border-[#1F4E5F]/30 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner: Commercial Terms & Direct Request */}
              <div className="pt-4 border-t border-[#0E1116]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-[#525866]">
                  <span className="font-semibold text-[#0E1116] block">Zero Upfront Cost [CONFIRM: fee %]</span>
                  <span>100% contingency fee payable strictly upon candidate joining.</span>
                </div>

                <Link
                  href="#enquiry"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#0E1116] text-[#F6F3EE] text-xs sm:text-sm font-medium hover:bg-[#C8553D] transition-colors min-h-[44px] shadow-xs hover:shadow-md"
                >
                  <span>Request Candidate Dossier</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
