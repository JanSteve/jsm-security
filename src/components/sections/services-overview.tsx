"use client";

import React from "react";
import Link from "next/link";
import { Shield, Users, Sparkles, Check, ArrowRight, FileText, Scan, Building } from "lucide-react";

const threeTiers = [
  {
    tier: "Tier 1: Security Guarding",
    target: "For Offices, Factories, Hospitals, IT Parks",
    code: "SAC 998525",
    pricing: "Starts at ₹12K/month",
    pricingNote: "(2-guard base package)",
    icon: Shield,
    slug: "/security",
    features: [
      "PSARA-licensed guards & Ex-Servicemen (ESM)",
      "Contractual 2-Hour Relief Replacement SLA",
      "Unannounced 2:00 AM mobile van audits",
      "24/7 direct operations command desk access"
    ]
  },
  {
    tier: "Tier 2: Manpower Staffing",
    target: "For Temp Roles, Assembly Lines, Admin Support",
    code: "SAC 998513",
    pricing: "₹18K–₹35K per worker",
    pricingNote: "(100% EPF/ESIC statutory compliance)",
    icon: Users,
    slug: "/staffing",
    features: [
      "Pre-vetted industrial & clerical workforce",
      "24–48 hour rapid batch mobilization",
      "Zero co-employer liability with ECR proofs",
      "Flexible temporary and project-based contracts"
    ]
  },
  {
    tier: "Tier 3: Facility Management",
    target: "For Mechanized Cleaning, Maintenance, Sanitization",
    code: "SAC 998533",
    pricing: "Starts at ₹8K/month",
    pricingNote: "(500 sq ft, 3x/week maintenance)",
    icon: Sparkles,
    slug: "/housekeeping",
    features: [
      "5-Step Closed-Loop Hygiene protocol",
      "Mechanized ride-on auto scrubbers & polishers",
      "Restroom inspection registers & quality audits",
      "Hospital-grade eco-friendly cleaning chemicals"
    ]
  }
];

export function ServicesOverview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E5E7EB]" id="services">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2 text-left">
          <div className="text-xs font-semibold text-[#1E5BA8] uppercase tracking-wider">
            Consolidated Operations Model
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] leading-[1.18] text-[#0F1922] font-semibold tracking-[-0.01em]">
            Three Integrated Services. One Vendor. Complete Coverage.
          </h2>
          <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed line-measure">
            Eliminate vendor fragmentation. Manage physical security, contractual staffing, and mechanized housekeeping under one single accountable master SLA.
          </p>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {threeTiers.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-[#F8F9FA] border border-[#E5E7EB] hover:border-[#1E5BA8]/60 p-6 sm:p-7 flex flex-col justify-between space-y-6 text-left transition-colors shadow-subtle"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-[4px] bg-white border border-[#E5E7EB] flex items-center justify-center text-[#0F1922]">
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-mono text-[#4A5160] bg-white px-2 py-0.5 border border-[#E5E7EB]">
                      {card.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#0F1922]">
                      {card.tier}
                    </h3>
                    <p className="text-xs text-[#4A5160] mt-0.5">
                      {card.target}
                    </p>
                  </div>

                  {/* Bullet Benefits */}
                  <ul className="space-y-2 text-xs text-[#1A1F2E] pt-2 border-t border-[#E5E7EB]">
                    {card.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={14} className="text-[#10A870] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Dual CTAs */}
                <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
                  <div>
                    <div className="text-base font-bold text-[#0F1922] tabular-nums">
                      {card.pricing}
                    </div>
                    <div className="text-[11px] text-[#4A5160]">
                      {card.pricingNote}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href="/get-quote"
                      className="px-3 py-2.5 rounded-[4px] bg-[#0F1922] hover:bg-[#080D12] text-white text-xs font-semibold flex items-center justify-center transition-colors min-touch-target"
                    >
                      <span>Get Quote</span>
                    </Link>
                    <Link
                      href={card.slug}
                      className="px-3 py-2.5 rounded-[4px] border border-[#0F1922] bg-white hover:bg-[#F8F9FA] text-[#0F1922] text-xs font-semibold flex items-center justify-center transition-colors min-touch-target"
                    >
                      <span>Learn More</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Auxiliary Strip */}
        <div className="pt-8 border-t border-[#E5E7EB] space-y-4 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-[#1E5BA8] uppercase">
                Auxiliary Enterprise Capabilities
              </span>
              <h4 className="text-base font-semibold text-[#0F1922]">
                GeM Tenders, Bulk Document Scanning &amp; Citizen Facilitation
              </h4>
            </div>
            <Link
              href="/services"
              className="text-xs font-semibold text-[#0F1922] hover:underline"
            >
              View Full Capabilities Specification &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: FileText, title: "GeM & e-Procurement Bidding", desc: "State and PSU tender management, technical documentation, and PO fulfillment." },
              { icon: Scan, title: "Scanning & OCR Digitization", desc: "High-speed document scanning, text OCR, and secure digital archiving." },
              { icon: Building, title: "CSC Citizen Services Desk", desc: "Authorized citizen digital assistance and institutional documentation support." },
            ].map((aux, idx) => {
              const AuxIcon = aux.icon;
              return (
                <div key={idx} className="p-4 bg-[#F8F9FA] border border-[#E5E7EB] space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <AuxIcon size={15} className="text-[#0F1922]" />
                    <h5 className="text-xs font-semibold text-[#1A1F2E]">{aux.title}</h5>
                  </div>
                  <p className="text-[11px] text-[#4A5160] leading-relaxed">{aux.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
