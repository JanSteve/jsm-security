"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const tierServices = [
  {
    tier: "Tier 1",
    code: "SAC 998525",
    title: "Security Supervisors & Guarding",
    slug: "/services/private-security",
    badge: "PSARA Licensed",
    description: "Disciplined perimeter protection, visitor gate-pass registers, and access control led by Ex-Servicemen (ESM) and trained private security marshals.",
    deliverables: [
      "Ex-Servicemen & Private Marshals (Male & Female)",
      "2-Hour Relief Replacement Guarantee SLA",
      "2:00 AM Unannounced Supervisor Van Audits",
      "Daily Digital Gate Registers & Incident Reports"
    ]
  },
  {
    tier: "Tier 2",
    code: "SAC 998513",
    title: "Contract Staffing & Manpower Supply",
    slug: "/services/manpower",
    badge: "100% EPF & ESIC",
    description: "Multi-skilled industrial and corporate workforce with full statutory legal indemnity, monthly ECR challan verification, and rapid mobilization.",
    deliverables: [
      "Factory Assembly, Line Workers & Machine Operators",
      "Corporate Office Administration & Data Staff",
      "100% Statutory EPF, ESIC & Minimum Wage Proof",
      "48 to 72 Hour Batch Deployment Mobilization"
    ]
  },
  {
    tier: "Tier 3",
    code: "SAC 998533",
    title: "Integrated Facility Management & Housekeeping",
    slug: "/services/housekeeping",
    badge: "Closed-Loop Hygiene",
    description: "Commercial and industrial facility hygiene adhering to a 5-step closed-loop cleaning protocol with ride-on auto scrubbers and hospital-grade sanitization.",
    deliverables: [
      "Mechanized Ride-On Auto Scrubbing & Polishers",
      "5-Step Closed-Loop Hygiene: Clean to Verify",
      "Restroom Logbooks & Hourly Inspection Registers",
      "Corporate SEZ Campuses & Manufacturing Plants"
    ]
  }
];

const auxiliaryServices = [
  {
    title: "GeM & e-Procurement Tender Bidding",
    description: "Comprehensive GeM portal catalog management, technical bid documentation, and PO fulfillment for PSUs and Government departments.",
  },
  {
    title: "Document Scanning, OCR & Digitization",
    description: "High-volume document digitization, OCR text extraction, and digital archiving under NIC 62099 IT service standards.",
  },
  {
    title: "CSC & Digital Citizen Facilitation",
    description: "Authorized citizen digital services, government application assistance, certificate processing, and documentation desk support.",
  }
];

export function ServicesOverview() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#E5E3DD]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="eyebrow-label text-[#0B3D2E]">
            Core Operating Structure
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#14181A] font-normal tracking-tight">
            The Three-Tier Integrated Operations Model
          </h2>
          <p className="text-sm sm:text-base text-[#4B5259] leading-relaxed">
            Eliminate vendor fragmentation. Manage premises security, industrial contract staffing, and facility management under one contract and one accountable executive desk.
          </p>
        </div>

        {/* 3 Tier Service Cards Grid with exact hover and brass badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {tierServices.map((service, i) => (
            <div
              key={i}
              className="rounded-[12px] border border-[#E5E3DD] bg-white p-7 flex flex-col justify-between shadow-[0_1px_2px_rgba(20,24,26,0.04),0_4px_12px_rgba(20,24,26,0.06)] hover:shadow-[0_2px_4px_rgba(20,24,26,0.06),0_8px_24px_rgba(20,24,26,0.10)] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="space-y-5">
                {/* Header Badge Strip */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#A67C3D] bg-[#F4EBDB] px-2.5 py-1 rounded-[8px] border border-[#A67C3D]/20">
                    {service.tier} &bull; {service.code}
                  </span>
                  <span className="text-[11px] font-medium text-[#4B5259] bg-[#F7F6F2] border border-[#E5E3DD] px-2 py-0.5 rounded-[8px]">
                    {service.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#14181A] tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5259] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Exactly 4 Deliverables Checklist */}
                <div className="space-y-2 pt-3 border-t border-[#E5E3DD]/70">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#14181A]">
                    Key Deliverables
                  </span>
                  <ul className="space-y-2 text-xs text-[#4B5259]">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={14} className="text-[#1E7A58] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Link */}
              <div className="pt-6 mt-6 border-t border-[#E5E3DD]">
                <Link
                  href={service.slug}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E7A58] hover:text-[#0B3D2E] group transition-colors"
                >
                  <span>View Full Specification &amp; SLAs</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Auxiliary Capabilities Section */}
        <div className="p-8 rounded-[12px] bg-[#F7F6F2] border border-[#E5E3DD] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5259]">
                Complementary Enterprise Verticals
              </span>
              <h4 className="text-lg sm:text-xl font-semibold text-[#14181A]">
                Auxiliary Capabilities: Tenders, Digitization &amp; Citizen Services
              </h4>
            </div>
            <Link
              href="/services"
              className="text-xs font-semibold text-[#1E7A58] hover:underline shrink-0"
            >
              Explore All Verticals &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {auxiliaryServices.map((aux, idx) => (
              <div key={idx} className="p-4 bg-white rounded-[8px] border border-[#E5E3DD] space-y-2 shadow-2xs">
                <h5 className="text-sm font-semibold text-[#14181A]">{aux.title}</h5>
                <p className="text-xs text-[#4B5259] leading-relaxed">{aux.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
