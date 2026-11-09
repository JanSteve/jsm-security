"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Check, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Layers, 
  Scale, 
  HelpCircle 
} from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

interface MatrixRow {
  dimension: string;
  explanation: string;
  retained: {
    text: string;
    favorable: boolean;
  };
  jobPortals: {
    text: string;
    favorable: boolean;
  };
  jsm: {
    text: string;
    favorable: boolean;
    badge?: string;
  };
}

const COMPARISON_ROWS: MatrixRow[] = [
  {
    dimension: "Upfront Cash Commitment",
    explanation: "Capital committed before any qualified candidate is presented or interviewed",
    retained: {
      text: "33% upfront non-refundable retainer (₹10L - ₹30L sunk risk)",
      favorable: false,
    },
    jobPortals: {
      text: "Annual subscription fees upfront regardless of hiring success",
      favorable: false,
    },
    jsm: {
      text: "₹0 Upfront Retainer. Zero financial risk before successful joining.",
      favorable: true,
      badge: "Pure Contingency",
    },
  },
  {
    dimension: "Shortlist Turnaround",
    explanation: "Calendar time elapsed from mandate calibration to vetted finalists",
    retained: {
      text: "60 to 90 business days typical calibration cycle",
      favorable: false,
    },
    jobPortals: {
      text: "Immediate resume flood (requires 40+ internal HR screening hours)",
      favorable: false,
    },
    jsm: {
      text: "7 Business Days to 3 calibrated, pre-vetted blind dossiers",
      favorable: true,
      badge: "7-Day Sprint",
    },
  },
  {
    dimension: "Invoicing Milestone",
    explanation: "The contractual condition under which recruitment fees become due",
    retained: {
      text: "Milestone-based (1/3 on signing, 1/3 on shortlist, 1/3 on offer)",
      favorable: false,
    },
    jobPortals: {
      text: "Invoiced upfront at license purchase with zero placement guarantee",
      favorable: false,
    },
    jsm: {
      text: "100% contingent upon candidate onboarding (8.33% [CONFIRM: fee %])",
      favorable: true,
      badge: "100% Contingent",
    },
  },
  {
    dimension: "Early Exit Protection",
    explanation: "Safeguard if placed leader departs within the initial operational quarter",
    retained: {
      text: "30-day window or future search credit with high friction",
      favorable: false,
    },
    jobPortals: {
      text: "Zero replacement protection or warranty",
      favorable: false,
    },
    jsm: {
      text: "Contractually binding 90-day replacement assurance [CONFIRM: fee %]",
      favorable: true,
      badge: "90-Day Shield",
    },
  },
  {
    dimension: "Candidate Discretion & Calibration",
    explanation: "How confidential mandates and passive executive reputations are managed",
    retained: {
      text: "Manual market mapping with public employer outreach",
      favorable: false,
    },
    jobPortals: {
      text: "Public job postings visible to competitors and current staff",
      favorable: false,
    },
    jsm: {
      text: "Anonymized blind dossiers protecting corporate & candidate confidentiality",
      favorable: true,
      badge: "Discrete Mediation",
    },
  },
];

export function ModelComparisonMatrix() {
  return (
    <section 
      id="model-comparison"
      className="py-16 sm:py-24 bg-[#F6F3EE] border-b border-[#0E1116]/10 relative overflow-hidden w-full max-w-full"
      aria-labelledby="comparison-heading"
    >
      <DotPattern
        width={24}
        height={24}
        cx={1.5}
        cy={1.5}
        cr={1}
        className="[mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)] opacity-50"
      />

      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0E1116]/10 text-xs font-semibold uppercase tracking-wider text-[#1F4E5F] mb-4 shadow-2xs">
            <Scale className="w-3.5 h-3.5 text-[#C8553D]" aria-hidden="true" />
            <span>Market Delivery Models</span>
          </div>

          <h2
            id="comparison-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[#0E1116] leading-[1.12] mb-4 text-balance"
          >
            Why senior leaders and promoters choose contingency mediation.
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#4A5568] leading-relaxed max-w-2xl mx-auto text-pretty">
            Compare executive search delivery models side-by-side to understand how our contingency structure protects enterprise working capital and accelerates time-to-hire.
          </p>
        </div>

        {/* Desktop / Tablet Matrix Table */}
        <div className="hidden md:block rounded-2xl md:rounded-3xl bg-white border border-[#0E1116]/10 shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 bg-[#F6F3EE] border-b border-[#0E1116]/10 text-xs font-mono font-semibold uppercase tracking-wider text-[#525866]">
            <div className="col-span-4 p-5 sm:p-6 border-r border-[#0E1116]/10">
              Evaluation Criteria
            </div>
            <div className="col-span-3 p-5 sm:p-6 border-r border-[#0E1116]/10">
              Retained Search Firms
            </div>
            <div className="col-span-2 p-5 sm:p-6 border-r border-[#0E1116]/10">
              Generic Portals
            </div>
            <div className="col-span-3 p-5 sm:p-6 bg-[#1F4E5F]/5 text-[#1F4E5F] font-bold flex items-center justify-between">
              <span>JSM Contingency</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1F4E5F] text-white">Recommended</span>
            </div>
          </div>

          <div className="divide-y divide-[#0E1116]/10">
            {COMPARISON_ROWS.map((row, idx) => (
              <div 
                key={row.dimension}
                className="grid grid-cols-12 text-xs sm:text-sm hover:bg-[#F6F3EE]/40 transition-colors"
              >
                {/* 1. Evaluation Dimension */}
                <div className="col-span-4 p-5 sm:p-6 border-r border-[#0E1116]/10">
                  <h4 className="font-heading font-medium text-[#0E1116] text-base mb-1">
                    {row.dimension}
                  </h4>
                  <p className="text-xs text-[#525866] leading-relaxed">
                    {row.explanation}
                  </p>
                </div>

                {/* 2. Retained Headhunters */}
                <div className="col-span-3 p-5 sm:p-6 border-r border-[#0E1116]/10 flex items-start gap-2.5 text-[#525866]">
                  <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5 border border-red-200">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed">{row.retained.text}</span>
                </div>

                {/* 3. Generic Job Portals */}
                <div className="col-span-2 p-5 sm:p-6 border-r border-[#0E1116]/10 flex items-start gap-2.5 text-[#525866]">
                  <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5 border border-red-200">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed">{row.jobPortals.text}</span>
                </div>

                {/* 4. JSM Contingency Search (Spotlighted) */}
                <div className="col-span-3 p-5 sm:p-6 bg-[#1F4E5F]/5 flex flex-col justify-between relative">
                  <div className="flex items-start gap-2.5 text-[#0E1116] font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#1F4E5F] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-relaxed">{row.jsm.text}</span>
                  </div>
                  {row.jsm.badge && (
                    <div className="mt-2.5 pl-7">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#1F4E5F]/15 text-[#1F4E5F]">
                        {row.jsm.badge}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View: Stacked Cards */}
        <div className="md:hidden space-y-4">
          {COMPARISON_ROWS.map((row) => (
            <div 
              key={row.dimension}
              className="bg-white rounded-2xl border border-[#0E1116]/10 p-5 shadow-xs space-y-3.5"
            >
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1F4E5F] block mb-1">
                  Evaluation Dimension
                </span>
                <h4 className="font-heading font-medium text-[#0E1116] text-lg">
                  {row.dimension}
                </h4>
                <p className="text-xs text-[#525866] mt-1">{row.explanation}</p>
              </div>

              {/* JSM Spotlight */}
              <div className="bg-[#1F4E5F]/8 p-3.5 rounded-xl border border-[#1F4E5F]/20 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1F4E5F] uppercase tracking-wider">
                    JSM Integrated Services
                  </span>
                  {row.jsm.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1F4E5F] text-white">
                      {row.jsm.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2 pt-1 text-xs text-[#0E1116] font-medium">
                  <Check className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" />
                  <span>{row.jsm.text}</span>
                </div>
              </div>

              {/* Traditional Search */}
              <div className="pt-2 border-t border-[#0E1116]/8 space-y-2 text-xs text-[#525866]">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#0E1116] shrink-0 w-28">Retained Search:</span>
                  <span>{row.retained.text}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#0E1116] shrink-0 w-28">Job Portals:</span>
                  <span>{row.jobPortals.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout & Action */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-[#0E1116] text-[#F6F3EE] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C8553D]">
              Working Capital Protection
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-medium text-white">
              Ready to calibrate a senior mandate with zero upfront fees?
            </h3>
            <p className="text-xs sm:text-sm text-[#A0AEC0] max-w-xl">
              Pay 100% on successful joining, protected by our 90-day replacement assurance [CONFIRM: fee %].
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Link
              href="#enquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C8553D] text-white font-medium text-sm hover:bg-[#b04732] hover:-translate-y-0.5 transition-all duration-300 min-h-[44px] shadow-xs"
            >
              <span>Initiate Executive Mandate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#fee-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-all duration-300 min-h-[44px]"
            >
              <span>Calculate Sunk Risk Saved</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
