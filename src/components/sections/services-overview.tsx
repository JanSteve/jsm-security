import React from "react";
import Link from "next/link";
import { Shield, Users, Sparkles, Check, FileText, Scan, Building } from "lucide-react";

const tierServices = [
  {
    tier: "Tier 1",
    code: "SAC 998525",
    title: "Security Supervisors & Guarding Forces",
    slug: "/services/private-security",
    badge: "Ex-Servicemen Led & DGR Aligned",
    icon: Shield,
    description: "Disciplined perimeter protection, visitor gate-pass registers, and access control led by Ex-Servicemen (ESM) and trained private security marshals.",
    deliverables: [
      "Ex-Servicemen & Private Marshals (Male & Female)",
      "Contractual 2-Hour Relief Replacement SLA",
      "2:00 AM Unannounced Mobile Patrol Van Audits",
      "Daily Digital Gate Registers & Incident Reports"
    ]
  },
  {
    tier: "Tier 2",
    code: "SAC 998513",
    title: "Contract Staffing & Industrial Manpower",
    slug: "/services/manpower",
    badge: "100% EPF & ESIC",
    icon: Users,
    description: "Multi-skilled industrial and corporate workforce with full statutory legal indemnity, monthly ECR challan verification, and rapid 48-hour mobilization.",
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
    icon: Sparkles,
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
    icon: FileText,
    title: "GeM & e-Procurement Bidding",
    description: "Government e-Marketplace catalog management, technical bid documentation, and PO fulfillment for PSUs and state departments.",
  },
  {
    icon: Scan,
    title: "Document Scanning & OCR Digitization",
    description: "High-volume document scanning, OCR text conversion, and secure digital archiving under NIC 62099 IT service standards.",
  },
  {
    icon: Building,
    title: "CSC & Digital Citizen Facilitation",
    description: "Authorized citizen digital facilitation, government application assistance, and institutional documentation desk support.",
  }
];

export function ServicesOverview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E4E7EC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header — Left-Aligned, No All-Caps Eyebrow */}
        <div className="max-w-3xl space-y-2 text-left">
          <div className="text-xs font-semibold text-[#9C7A3C]">
            Three-Tier Operations Model
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] leading-[1.18] text-[#14181F] font-semibold tracking-[-0.01em]">
            Consolidated physical security, staffing and facility hygiene.
          </h2>
          <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed line-measure">
            Eliminate vendor fragmentation. Manage premises security, industrial contract staffing, and facility management under one contract and one accountable executive desk.
          </p>
        </div>

        {/* Divided List: Hairline dividers between items, NOT identical repeated cards */}
        <div className="border-t border-[#E4E7EC] divide-y divide-[#E4E7EC]">
          {tierServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start hover:bg-[#F6F7F9]/50 transition-colors"
              >
                {/* Left Column: Identifier & Service Title (5 cols) */}
                <div className="lg:col-span-5 space-y-2 text-left">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-semibold text-[#9C7A3C]">
                      {service.tier} &bull; {service.code}
                    </span>
                    <span className="text-[#4A5160]">&bull;</span>
                    <span className="text-[#4A5160] font-medium">{service.badge}</span>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <div className="w-8 h-8 rounded-[4px] bg-[#F6F7F9] border border-[#E4E7EC] flex items-center justify-center text-[#0F2A47] shrink-0 mt-0.5">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#14181F] tracking-normal">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A5160] leading-relaxed pt-1.5">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center Column: Deliverables Checklist (5 cols) */}
                <div className="lg:col-span-5 text-left">
                  <div className="text-xs font-semibold text-[#14181F] mb-2.5">
                    Core Operational Deliverables
                  </div>
                  <ul className="space-y-2 text-sm sm:text-xs text-[#4A5160]">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={14} className="text-[#9C7A3C] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Direct Specification Link (2 cols) */}
                <div className="lg:col-span-2 flex lg:justify-end items-center pt-2 lg:pt-4">
                  <Link
                    href={service.slug}
                    className="w-full lg:w-auto inline-flex items-center justify-center px-4 py-2 rounded-[4px] border border-[#0F2A47] text-[#0F2A47] hover:bg-[#0F2A47] hover:text-white text-xs font-semibold transition-colors min-touch-target"
                  >
                    <span>View Specifications</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Auxiliary Verticals — Divided Clean Strip */}
        <div className="pt-8 border-t border-[#E4E7EC] space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-[#4A5160]">
                Auxiliary Enterprise Capabilities
              </span>
              <h4 className="text-base sm:text-lg font-semibold text-[#14181F]">
                Tender Bidding, Document Digitization &amp; Citizen Services
              </h4>
            </div>
            <Link
              href="/services"
              className="text-xs font-semibold text-[#0F2A47] hover:underline shrink-0"
            >
              All Capabilities Overview
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {auxiliaryServices.map((aux, idx) => {
              const AuxIcon = aux.icon;
              return (
                <div
                  key={idx}
                  className="p-4 bg-[#F6F7F9] border border-[#E4E7EC] space-y-1.5 text-left"
                >
                  <div className="flex items-center gap-2">
                    <AuxIcon size={15} className="text-[#0F2A47]" />
                    <h5 className="text-xs sm:text-sm font-semibold text-[#14181F]">
                      {aux.title}
                    </h5>
                  </div>
                  <p className="text-xs text-[#4A5160] leading-relaxed">
                    {aux.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
