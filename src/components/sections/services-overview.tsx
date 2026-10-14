'use client';

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Cpu, 
  ArrowRight, 
  CheckCircle2,
  MessageSquare,
  Star,
  PhoneForwarded,
  Utensils,
  Globe,
  MapPin,
  FileText,
  Scan,
  Building
} from "lucide-react";

const corePillars = [
  {
    id: "security",
    icon: ShieldCheck,
    code: "SAC 998525",
    badge: "Ex-Servicemen Led",
    title: "Private Security & Guarding",
    slug: "/services/private-security",
    description: "Ex-Servicemen supervisory command deploying AAI-standard physical security, 02:00 AM unannounced patrol van audits, and contractual 2-hour relief standby.",
    pills: ["2-Hr Relief SLA", "02:00 AM Audits", "AAI Benchmark"],
    bullets: [
      "Ex-Servicemen & Trained Marshals (M/F)",
      "Contractual 2-Hour Relief Replacement SLA",
      "02:00 AM Mobile Patrol Van Audits",
      "Airports Authority of India (AAI) Benchmark"
    ],
    metric: { value: "2-Hour", label: "Relief SLA" }
  },
  {
    id: "manpower",
    icon: Users,
    code: "SAC 998513",
    badge: "100% EPF & ESIC",
    title: "Contract Staffing & Manpower",
    slug: "/services/manpower",
    description: "100% statutory compliant industrial and administrative staffing with monthly verified ECR challans, eliminating principal employer liability.",
    pills: ["100% EPF/ESIC", "Zero Client Liability", "48–72h Mobilization"],
    bullets: [
      "Industrial Assembly & Machine Operators",
      "Corporate Office & Administrative Staff",
      "Monthly ECR Challan Proof & Zero Liability",
      "48 to 72-Hour Rapid Batch Mobilization"
    ],
    metric: { value: "100%", label: "Legal Indemnity" }
  },
  {
    id: "facility",
    icon: Sparkles,
    code: "SAC 998533",
    badge: "Closed-Loop Hygiene",
    title: "Mechanized Facility & Housekeeping",
    slug: "/services/housekeeping",
    description: "Mechanized industrial sanitation with heavy ride-on auto-scrubbers and verified 5-step clean-to-verify hospital & concourse hygiene protocols.",
    pills: ["5-Step Hygiene", "Heavy Auto-Scrubbers", "Hourly Restroom Logs"],
    bullets: [
      "Heavy Industrial Ride-On Auto Scrubbers",
      "5-Step Clean-to-Verify Hygiene Protocol",
      "Hourly Digital Restroom Inspection Logs",
      "Airports, SEZ Tech Parks & Hospitals"
    ],
    metric: { value: "5-Step", label: "Hygiene Standard" }
  },
  {
    id: "technology",
    icon: Cpu,
    code: "NIC 62/63",
    badge: "CTO R Jan Steve Daniel",
    title: "Enterprise WhatsApp & Digital",
    slug: "/services",
    description: "Official Meta Cloud WhatsApp chatbots, smart NFC 5-star review filters, and sub-second Next.js web applications engineered for local B2B conversion.",
    pills: ["Meta Cloud API", "Smart NFC Standees", "<5s Auto-Response"],
    bullets: [
      "Official Meta Cloud WhatsApp Chatbots",
      "Smart NFC 5-Star Review Filter Standees",
      "QR Table Ordering & Clinic Queue Tokens",
      "Sub-Second Next.js Web Portals (CWV 95+)"
    ],
    metric: { value: "<5s", label: "Auto-Response" }
  }
];

const digitalTools = [
  { icon: MessageSquare, name: "WhatsApp Business API", href: "/services/whatsapp-automation-crm" },
  { icon: Star, name: "Smart NFC Review Standees", href: "/services/nfc-review-standees" },
  { icon: PhoneForwarded, name: "Missed-Call WhatsApp Saver", href: "/services/missed-call-lead-recovery" },
  { icon: Utensils, name: "QR Table Ordering Systems", href: "/services/qr-table-ordering" },
  { icon: Globe, name: "Next.js Web Portals", href: "/services/website-design-development" },
  { icon: MapPin, name: "Google Maps 3-Pack SEO", href: "/services/local-seo-gbp-ranking" }
];

const auxiliaryPills = [
  { icon: FileText, label: "GeM & e-Procurement Bidding" },
  { icon: Scan, label: "Document Scanning & OCR Digitization" },
  { icon: Building, label: "CSC Digital Citizen Facilitation" }
];

export function ServicesOverview() {
  return (
    <section className="py-12 sm:py-16 bg-[#030712] text-white border-b border-cyan-500/20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header — Compact, Factual */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[11px] font-mono text-cyan-300 shadow-[0_0_10px_rgba(14,165,233,0.12)]">
              <span>Operational Matrix</span>
              <span className="text-cyan-500">&bull;</span>
              <span>Single Accountable Partner</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Four Core Service Pillars
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              One master agreement, 100% statutory compliance, and Ex-Servicemen supervisory field command.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors shrink-0 underline underline-offset-4"
          >
            <span>Compare All Specifications</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 4-Pillar Non-Sticky Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="p-5 rounded-xl tactical-glass-card border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all flex flex-col justify-between space-y-4 text-left group text-white"
              >
                <div className="space-y-3.5">
                  {/* Top Badge & SAC Code */}
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-300 transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
                      {pillar.code}
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                      {pillar.badge}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors pt-0.5">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* 1-Sentence Value Proposition */}
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* High-Contrast Metric Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {pillar.pills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  {/* Fact Bullets */}
                  <ul className="space-y-2 pt-2 border-t border-cyan-500/20">
                    {pillar.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Metric & Link */}
                <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-between">
                  <div className="text-[11px] font-mono">
                    <span className="text-cyan-300 font-bold">{pillar.metric.value}</span>
                    <span className="text-neutral-400 ml-1">{pillar.metric.label}</span>
                  </div>
                  <Link
                    href={pillar.slug}
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Details</span>
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Digital Tools Strip */}
        <div className="p-4 sm:p-5 rounded-xl tactical-glass-card border border-cyan-500/20 space-y-3 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse" />
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Digital Systems Division &bull; Headed by CTO R Jan Steve Daniel
              </span>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
            >
              All 6 Digital Automations &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
            {digitalTools.map((tool, idx) => {
              const ToolIcon = tool.icon;
              return (
                <Link
                  key={idx}
                  href={tool.href}
                  className="p-2.5 rounded-lg bg-[#050A14] border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-cyan-950/20 transition-all flex items-center gap-2 text-left group min-h-[44px]"
                >
                  <ToolIcon size={14} className="text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-medium text-neutral-200 group-hover:text-white truncate">
                    {tool.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Compact Auxiliary Services Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-[#080C16] border border-cyan-500/20 text-xs text-neutral-300">
          <span className="font-bold text-white uppercase font-mono text-[10px] tracking-wider shrink-0">
            Auxiliary Operations:
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px]">
            {auxiliaryPills.map((aux, idx) => {
              const AuxIcon = aux.icon;
              return (
                <div key={idx} className="flex items-center gap-1.5 text-neutral-200">
                  <AuxIcon size={12} className="text-cyan-400" />
                  <span>{aux.label}</span>
                </div>
              );
            })}
          </div>
          <Link
            href="/get-quote"
            className="text-[11px] font-bold text-cyan-400 hover:underline shrink-0 ml-auto sm:ml-0"
          >
            Custom Scope Quote &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
