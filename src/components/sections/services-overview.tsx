'use client';

import React from "react";
import Link from "next/link";
import { 
  Shield, 
  Users, 
  Sparkles, 
  FileText, 
  Scan, 
  Building, 
  MessageSquare, 
  Star, 
  PhoneForwarded, 
  Utensils, 
  Globe, 
  MapPin, 
  ArrowRight, 
  Cpu,
  ShieldCheck,
  Award,
  Clock,
  Radio,
  FileCheck2,
  Workflow
} from "lucide-react";
import { StickyScrollSequence, type StickyStepItem } from "@/components/motion/sticky-scroll-sequence";
import { PerspectiveTiltCard } from "@/components/motion/perspective-tilt-card";
import { KineticTypography } from "@/components/motion/kinetic-typography";

const operationSteps: StickyStepItem[] = [
  {
    id: "tier-1",
    badge: "Tier 1 • SAC 998525",
    title: "Security Supervisors & Guarding Forces",
    subtitle: "Ex-Servicemen Led & DGR Aligned",
    description: "Disciplined perimeter protection, visitor gate-pass registers, and access control led by Ex-Servicemen (ESM) and trained private security marshals with strict PSARA compliance.",
    deliverables: [
      "Ex-Servicemen & Private Marshals (Male & Female)",
      "Contractual 2-Hour Relief Replacement SLA",
      "02:00 AM Unannounced Mobile Patrol Van Audits",
      "Daily Digital Gate Registers & Incident Reports"
    ],
    metrics: [
      { value: "2-Hour", label: "Relief Replacement SLA" },
      { value: "02:00 AM", label: "Patrol Van Night Audits" },
      { value: "100%", label: "Police & Aadhaar Verified" }
    ],
    actionLink: {
      href: "/services/private-security",
      label: "View Tier 1 Specifications"
    },
    visualContent: (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-br from-[#0F2A47] via-[#0A1E33] to-[#05070B] text-white rounded-lg relative overflow-hidden">
        {/* Ambient watermark icon */}
        <Shield className="absolute -right-6 -bottom-6 w-44 h-44 text-white/5 pointer-events-none" />

        <div className="space-y-3 z-10">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9C7A3C]/20 border border-[#9C7A3C]/40 text-[#D4AF37] text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Armed &amp; Unarmed Guarding Command</span>
            </div>
            <span className="text-[11px] font-mono text-gray-400">SAC 998525</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-serif font-semibold text-white">
            Operational Turnout &amp; Muster Control
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed max-w-md">
            Directly supervised by Ex-Servicemen command officers. Active turnout inspections, barrier protocols, and rapid emergency platoon mobilization.
          </p>
        </div>

        {/* Live Status Board Card */}
        <div className="z-10 grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
              <Radio size={12} className="animate-pulse" />
              <span>Command Desk</span>
            </div>
            <div className="text-xs text-gray-200">24/7 Control Room &bull; Trichy HQ</div>
          </div>

          <div className="p-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
              <Clock size={12} />
              <span>Relief Guarantee</span>
            </div>
            <div className="text-xs text-gray-200">2-Hour Maximum Response</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "tier-2",
    badge: "Tier 2 • SAC 998513",
    title: "Contract Staffing & Industrial Manpower",
    subtitle: "100% EPF & ESIC Compliant",
    description: "Multi-skilled industrial and corporate workforce with full statutory legal indemnity, monthly ECR challan verification, and rapid 48-hour batch mobilization.",
    deliverables: [
      "Factory Assembly, Line Workers & Machine Operators",
      "Corporate Office Administration & Data Staff",
      "100% Statutory EPF, ESIC & Minimum Wage Proof",
      "48 to 72 Hour Batch Deployment Mobilization"
    ],
    metrics: [
      { value: "100%", label: "Statutory EPF & ESIC Proof" },
      { value: "48-72h", label: "Batch Deployment SLA" },
      { value: "ECR", label: "Monthly Challan Transparency" }
    ],
    actionLink: {
      href: "/services/manpower",
      label: "View Tier 2 Specifications"
    },
    visualContent: (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-br from-[#14181F] via-[#0F2A47]/90 to-[#0A1E33] text-white rounded-lg relative overflow-hidden">
        <Users className="absolute -right-6 -bottom-6 w-44 h-44 text-white/5 pointer-events-none" />

        <div className="space-y-3 z-10">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9C7A3C]/20 border border-[#9C7A3C]/40 text-[#D4AF37] text-xs font-semibold">
              <FileCheck2 size={14} />
              <span>Full Statutory Legal Indemnity</span>
            </div>
            <span className="text-[11px] font-mono text-gray-400">SAC 998513</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-serif font-semibold text-white">
            Industrial Roster &amp; ECR Verification
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed max-w-md">
            Zero enterprise liability. Complete compliance with Minimum Wages Act, monthly electronic challan receipts, and vetted worker profiles.
          </p>
        </div>

        <div className="z-10 grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
              <Workflow size={12} />
              <span>Staffing Pipeline</span>
            </div>
            <div className="text-xs text-gray-200">500+ Vetted Field Associates</div>
          </div>

          <div className="p-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
              <Award size={12} />
              <span>Labour Audit Proof</span>
            </div>
            <div className="text-xs text-gray-200">Nil Litigation Record</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "tier-3",
    badge: "Tier 3 • SAC 998533",
    title: "Integrated Facility Management & Housekeeping",
    subtitle: "Closed-Loop Hygiene Protocol",
    description: "Commercial and industrial facility hygiene adhering to a 5-step closed-loop cleaning protocol with ride-on auto scrubbers and hospital-grade sanitization.",
    deliverables: [
      "Mechanized Ride-On Auto Scrubbing & Polishers",
      "5-Step Closed-Loop Hygiene: Clean to Verify",
      "Restroom Logbooks & Hourly Inspection Registers",
      "Corporate SEZ Campuses & Manufacturing Plants"
    ],
    metrics: [
      { value: "5-Step", label: "Closed-Loop Cleaning Flow" },
      { value: "Auto-Scrub", label: "Heavy Mechanized Equipment" },
      { value: "Hourly", label: "Digital Inspection Logs" }
    ],
    actionLink: {
      href: "/services/housekeeping",
      label: "View Tier 3 Specifications"
    },
    visualContent: (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-br from-[#0F2A47] via-[#142336] to-[#0A1424] text-white rounded-lg relative overflow-hidden">
        <Sparkles className="absolute -right-6 -bottom-6 w-44 h-44 text-white/5 pointer-events-none" />

        <div className="space-y-3 z-10">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9C7A3C]/20 border border-[#9C7A3C]/40 text-[#D4AF37] text-xs font-semibold">
              <Sparkles size={14} />
              <span>Mechanized Campus Sanitization</span>
            </div>
            <span className="text-[11px] font-mono text-gray-400">SAC 998533</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-serif font-semibold text-white">
            Clean-to-Verify Closed-Loop Standards
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed max-w-md">
            Heavy-duty ride-on scrubbers, color-coded cross-contamination prevention, and digitized supervisor sign-offs for airports, SEZs, and hospitals.
          </p>
        </div>

        <div className="z-10 grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
              <Sparkles size={12} />
              <span>Equipment Fleet</span>
            </div>
            <div className="text-xs text-gray-200">Industrial Auto-Scrubbers</div>
          </div>

          <div className="p-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
              <FileCheck2 size={12} />
              <span>Hourly Audits</span>
            </div>
            <div className="text-xs text-gray-200">Digital Restroom Logbooks</div>
          </div>
        </div>
      </div>
    )
  }
];

const digitalServices = [
  {
    icon: MessageSquare,
    badge: "Official Meta API",
    title: "WhatsApp Business API & Automation",
    slug: "/services/whatsapp-automation-crm",
    description: "24/7 conversational chatbots, automated customer lead capture, and interactive catalog menus with official Meta Cloud API.",
  },
  {
    icon: Star,
    badge: "Reputation Guard",
    title: "Smart Review Filter NFC Standees",
    slug: "/services/nfc-review-standees",
    description: "Double 5-star Google reviews on Maps while routing 1–3 star private complaints directly to your WhatsApp desk.",
  },
  {
    icon: PhoneForwarded,
    badge: "Lead Recovery",
    title: "Missed-Call to WhatsApp Auto-Saver",
    slug: "/services/missed-call-lead-recovery",
    description: "Sub-5-second branded WhatsApp greeting and service menu sent automatically whenever a business phone call is missed.",
  },
  {
    icon: Utensils,
    badge: "Zero-Commission",
    title: "Direct Table Ordering QR Menus",
    slug: "/services/qr-table-ordering",
    description: "Bypass 30% aggregator commissions. Diners scan table QR codes to send formatted orders straight to kitchen WhatsApp.",
  },
  {
    icon: Globe,
    badge: "Core Web Vitals 95+",
    title: "High-Converting Websites & Portals",
    slug: "/services/website-design-development",
    description: "Custom-coded, lightning-fast Next.js business websites and lead portals with built-in WhatsApp conversion funnels.",
  },
  {
    icon: MapPin,
    badge: "Google Maps 3-Pack",
    title: "Local Maps & GBP 3-Pack SEO",
    slug: "/services/local-seo-gbp-ranking",
    description: "Dominate Google Maps local 3-pack rankings with geotagged citations, photo EXIF optimization, and review velocity systems.",
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
    <div className="bg-black text-white">
      {/* Three-Tier Operations Model — Pinned Viewport Scrollytelling Sequence */}
      <StickyScrollSequence
        steps={operationSteps}
        eyebrow="Three-Tier Operations Model"
        headline="Consolidated physical security, staffing and facility hygiene."
        description="Eliminate vendor fragmentation. Manage premises security, industrial contract staffing, and facility management under one contract and one accountable executive desk."
        theme="dark"
      />

      {/* Digital & Automation Solutions — Division Led by CTO R Jan Steve Daniel */}
      <section className="py-16 sm:py-20 lg:py-24 bg-black border-b border-white/10 text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 text-left">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37]">
                  <Cpu size={12} />
                  Technology Division
                </span>
                <span className="text-xs text-neutral-300 font-medium">Led by CTO R Jan Steve Daniel</span>
              </div>
              <KineticTypography
                as="h3"
                text="Digital Engineering, WhatsApp Automation & Smart Systems"
                className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white pt-2"
              />
              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed pt-1">
                Official Meta WhatsApp Business API bots, smart NFC review filtering standees, and custom web portals built to accelerate retail and corporate growth.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37] hover:text-[#E5C158] transition-colors shrink-0"
            >
              <span>Explore All Digital Services</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Perspective Tilt Cards Grid — Obsidian Surfaces */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalServices.map((digital, idx) => {
              const DigitalIcon = digital.icon;
              return (
                <PerspectiveTiltCard key={idx} maxTilt={6} className="h-full">
                  <Link
                    href={digital.slug}
                    className="p-6 bg-[#070B12] border border-white/10 rounded-xl hover:border-[#D4AF37]/50 hover:shadow-2xl transition-all space-y-3 text-left group block h-full flex flex-col justify-between text-white"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-[6px] bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                          <DigitalIcon size={18} />
                        </div>
                        <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-white/5 text-[#D4AF37] border border-white/10">
                          {digital.badge}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          {digital.title}
                        </h4>
                        <p className="text-xs text-neutral-300 leading-relaxed pt-1.5 line-clamp-3">
                          {digital.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center gap-1 text-xs font-semibold text-[#D4AF37] group-hover:text-white transition-colors">
                      <span>View Specifications</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </PerspectiveTiltCard>
              );
            })}
          </div>

          {/* Auxiliary Verticals — Divided Clean Strip */}
          <div className="pt-8 border-t border-white/10 space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Auxiliary Capabilities
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Tender Bidding, Document Digitization &amp; Citizen Facilitation
                </h4>
              </div>
              <Link
                href="/services"
                className="text-xs font-semibold text-[#D4AF37] hover:underline shrink-0"
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
                    className="p-4 bg-[#070A0F] border border-white/10 space-y-1.5 text-left rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <AuxIcon size={15} className="text-[#D4AF37]" />
                      <h5 className="text-xs sm:text-sm font-bold text-white">
                        {aux.title}
                      </h5>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {aux.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
