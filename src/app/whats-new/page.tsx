"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  Search, 
  Calendar, 
  Tag, 
  ShieldCheck, 
  Download, 
  Plane, 
  FileCheck, 
  Award, 
  MessageCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { brandData } from "@/data/brand";

interface Bulletin {
  id: string;
  date: string;
  category: "deployment" | "compliance" | "aviation" | "esm" | "tech";
  categoryLabel: string;
  title: string;
  excerpt: string;
  details: string;
  badgeColor: string;
  actionUrl?: string;
  actionLabel?: string;
}

const bulletins: Bulletin[] = [
  {
    id: "BLT-2026-08",
    date: "March 04, 2026",
    category: "aviation",
    categoryLabel: "Aviation & Civil Hub",
    title: "Trichy International Airport Commercial Wing Deployment Renewed",
    excerpt: "JSM Integrated Services completes 100% satisfactory security and crowd facilitation audit for civil aviation passenger transit commercial zones.",
    details: "All deployed personnel completed mandatory aviation security (AVSEC) awareness refresher modules. Zero unauthorized incursions recorded across 180 continuous operational operational cycles.",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "BLT-2026-07",
    date: "February 26, 2026",
    category: "compliance",
    categoryLabel: "Statutory Gazette",
    title: "Tamil Nadu Minimum Wages Act Gazette 2026 Schedule Integrated",
    excerpt: "Updated basic wage revisions and VDA adjustments across Zone A, B, and C districts integrated into JSM automatic billing engine.",
    details: "All corporate clients received revised Annexure-1 wage sheets along with genuine bank disbursement proof and EPF/ESIC ECR challan copies.",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    actionUrl: "/downloads/JSM-Compliance-Checklist.docx",
    actionLabel: "Download Compliance Checklist (.docx)"
  },
  {
    id: "BLT-2026-06",
    date: "February 18, 2026",
    category: "esm",
    categoryLabel: "DGR & Resettlement",
    title: "Special Ex-Servicemen (ESM) Field Supervisor Drive Mobilized",
    excerpt: "Recruitment drive underway for retired JCOs and Commissioned Officers to lead industrial patrol sectors across Chennai OMR corridor.",
    details: "18 retired Army, Navy, and Air Force personnel successfully inducted with senior supervisory seniority and direct pension-benefit parity.",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    actionUrl: "/work-opportunities",
    actionLabel: "View Open Vacancies"
  },
  {
    id: "BLT-2026-05",
    date: "February 02, 2026",
    category: "tech",
    categoryLabel: "C3 Operations Desk",
    title: "AI Receptionist 'Priya' Integrated with WhatsApp Hotline",
    excerpt: "Real-time query resolution and statutory compliance dispatch automated via Priya operations desk with instant WhatsApp escalation.",
    details: "Facility managers can now request guard relief replacements, download Form-A/B dossiers, and track patrol logs via conversational AI.",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: "BLT-2026-04",
    date: "January 20, 2026",
    category: "deployment",
    categoryLabel: "Industrial Facility",
    title: "Hosur Automotive Hub 5-Step Closed-Loop Sanitization Implemented",
    excerpt: "Mobilized 60-member industrial facility team for high-precision manufacturing assembly campus adhering to hospital-grade hygiene SOPs.",
    details: "Deployment executed in under 72 hours from initial procurement sign-off, featuring battery-operated industrial scrubber driers.",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "BLT-2026-03",
    date: "January 08, 2026",
    category: "compliance",
    categoryLabel: "PSARA Renewal",
    title: "Annual PSARA Statutory Police Verification Audit Completed 100%",
    excerpt: "Home Department Tamil Nadu compliance audit cleared with zero remarks across Trichy and regional outpost registers.",
    details: "Complete personnel biometric records, Aadhaar links, and local police non-involvement certifications verified and archived.",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  }
];

export default function WhatsNewPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBulletins = bulletins.filter(b => {
    const matchesCat = selectedCategory === "all" || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-white text-[#1d1d1f] min-h-screen">
      {/* Banner */}
      <section className="relative pt-52 sm:pt-60 md:pt-64 lg:pt-72 pb-16 md:pb-20 bg-[#0c0c0e] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(16,185,129,0.18),rgba(255,255,255,0))]" />
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Bell size={14} />
            <span>Operations Ticker &amp; Regulatory Gazette</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
            What&apos;s New at JSM Integrated Services
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            Live archive of operational deployments, statutory wage gazettes, DGR resettlement initiatives, and security audit milestones.
          </p>

          {/* Search and Category Filter Bar */}
          <div className="mt-8 flex flex-col md:flex-row gap-3 max-w-3xl">
            <div className="flex-1 relative flex items-center">
              <Search size={18} className="absolute left-4 text-white/50" />
              <input
                type="text"
                placeholder="Search bulletins, circulars, or deployment news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 text-xs sm:text-sm focus:outline-none focus:bg-white/15 border border-white/10"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/10 text-white text-xs font-medium focus:outline-none border border-white/10"
            >
              <option value="all" className="text-black">All Categories</option>
              <option value="aviation" className="text-black">Aviation &amp; Civil Hub</option>
              <option value="compliance" className="text-black">Statutory &amp; Wage Gazette</option>
              <option value="esm" className="text-black">DGR &amp; Resettlement</option>
              <option value="deployment" className="text-black">Industrial Deployments</option>
              <option value="tech" className="text-black">Technology &amp; Operations</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Archive Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.08]">
            <h2 className="text-xl font-bold text-[#1d1d1f]">
              Published Circulars ({filteredBulletins.length})
            </h2>
            <Link
              href="/newsletter"
              className="text-xs font-semibold text-[#0071e3] hover:underline inline-flex items-center gap-1"
            >
              <span>Subscribe to Newsletter</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBulletins.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#f5f5f7] border border-black/[0.08] hover:border-black/[0.18] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                      {item.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#86868b] font-mono">
                      <Calendar size={12} />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#1d1d1f] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#515154] font-medium leading-relaxed">
                    {item.excerpt}
                  </p>

                  <p className="text-xs text-[#6e6e73] leading-relaxed pt-1">
                    {item.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between gap-3">
                  {item.actionUrl ? (
                    <a
                      href={item.actionUrl}
                      download={item.actionUrl.includes(".docx")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline"
                    >
                      {item.actionUrl.includes(".docx") ? <Download size={13} /> : <ArrowRight size={13} />}
                      <span>{item.actionLabel || "Access Document"}</span>
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-[#86868b]">Ref: {item.id}</span>
                  )}

                  <a
                    href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20inquiry%20regarding%20bulletin%20${item.id}:%20${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    <MessageCircle size={13} />
                    <span>Discuss on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing WhatsApp Alert Callout */}
        <div className="mt-16 bg-[#1d1d1f] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold">Never Miss a Statutory or Deployment Notice</h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
              Join our WhatsApp broadcast or subscribe to our newsletter for automated weekly bulletins delivered directly to your device.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/newsletter"
              className="px-5 py-2.5 rounded-full bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] text-xs font-semibold transition-colors"
            >
              Email Subscriptions
            </Link>
            <a
              href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20please%20add%20me%20to%20the%20operations%20broadcast.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Alerts</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
