"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Users, 
  Calendar, 
  ArrowRight
} from "lucide-react";
import { brandData } from "@/data/brand";

interface Track {
  id: string;
  title: string;
  badge: string;
  icon: typeof ShieldCheck;
  audience: string;
  coverage: string[];
  frequency: string;
}

const tracks: Track[] = [
  {
    id: "esm",
    title: "Ex-Servicemen & Officer Executive Brief",
    badge: "Defense Resettlement",
    icon: ShieldCheck,
    audience: "Retired Armed Forces Officers, JCOs, and Resettlement Cells",
    coverage: [
      "DGR security agency policy amendments and gazette notifications",
      "PSU & Defense industrial security empanelment updates",
      "Executive CSO & Security Director leadership appointments",
      "Weapons licensing & statutory compliance advisories"
    ],
    frequency: "Bi-Weekly Dispatch"
  },
  {
    id: "corporate",
    title: "Enterprise Facility & Security Gazette",
    badge: "Corporate & SEZ",
    icon: Building2,
    audience: "Facility Directors, HR Leaders, Procurement Heads, Tech Park Admins",
    coverage: [
      "PSARA statutory compliance audit checklists & risk mitigation",
      "Perimeter access control and supervisor round verification",
      "Closed-loop commercial hygiene protocols and mechanization",
      "Contractual staffing statutory compliance across South India"
    ],
    frequency: "Monthly Briefing"
  },
  {
    id: "labor",
    title: "Workforce & Compliance Gazette",
    badge: "Statutory Law",
    icon: Users,
    audience: "Plant Managers, Labor Compliance Officers, Industrial Estate Heads",
    coverage: [
      "Tamil Nadu Minimum Wages Act schedule revisions (Zone A/B/C)",
      "EPF/ESIC monthly ECR challan filing compliance procedures",
      "Industrial safety and pre-deployment training protocols",
      "Contract labor regulation and abolition act guidance"
    ],
    frequency: "Monthly Bulletin"
  }
];

const archiveIssues = [
  {
    issue: "Dispatch #18",
    date: "2026-03-15",
    displayDate: "March 15, 2026",
    title: "DGR Security Agency Empanelment Policy & Executive CSO Appointments Active",
    category: "Regulatory Gazette",
    summary: "Complete breakdown of the Directorate General Resettlement updated empanelment rules and Ex-Servicemen supervisory cadre deployment across Tamil Nadu."
  },
  {
    issue: "Dispatch #17",
    date: "2026-02-28",
    displayDate: "February 28, 2026",
    title: "Zero Client Liability: PSARA 2005 & Monthly ECR Challan Verification Protocol",
    category: "Statutory Brief",
    summary: "Detailed advisory on verifying EPF/ESIC monthly electronic challan receipts to guarantee total legal indemnity for principal employers."
  },
  {
    issue: "Dispatch #16",
    date: "2026-02-10",
    displayDate: "February 10, 2026",
    title: "Tamil Nadu Minimum Wages Act 2026 Schedule Integrated for Zone A, B, and C Districts",
    category: "Wage Schedules",
    summary: "Official wage schedule breakdown for security guards, supervisors, and commercial facility marshals across industrial corridors."
  }
];

export default function NewsletterPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("corporate");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Header */}
        <section className="py-8 sm:py-12 border-b border-[#E7E5E0]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Operations &amp; Compliance Dispatches</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-normal tracking-tight">
              Regulatory Bulletins &amp; Operational Intelligence
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              Curated intelligence dispatches on PSARA compliance, DGR policies, Tamil Nadu minimum wage schedules, and industrial facility standards.
            </p>
          </div>
        </section>

        {/* 3 Newsletter Tracks Grid */}
        <section className="space-y-8 border-b border-[#E7E5E0] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Publication Tracks
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Three Specialized Briefing Cadres
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((trk) => {
              const Icon = trk.icon;
              return (
                <div
                  key={trk.id}
                  className="p-7 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA]/60 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#0B3D2E] bg-[#0B3D2E]/8 px-2.5 py-1 rounded">
                        {trk.badge}
                      </span>
                      <span className="text-[11px] font-mono text-[#5A6578]">
                        {trk.frequency}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-[#14181F]">
                        {trk.title}
                      </h3>
                      <p className="text-xs text-[#5A6578]">
                        <strong>Audience:</strong> {trk.audience}
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs text-[#4A5568] pt-2 border-t border-[#E7E5E0]/60">
                      {trk.coverage.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Dispatches Archive */}
        <section className="space-y-8 border-b border-[#E7E5E0] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Editorial Archive
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Recent Operational Dispatches
            </h2>
          </div>

          <div className="space-y-4">
            {archiveIssues.map((issue, idx) => (
              <article
                key={idx}
                className="p-6 rounded-xl border border-[#E7E5E0] bg-white space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono font-bold text-[#0B3D2E]">
                      {issue.issue}
                    </span>
                    <span className="text-neutral-300">&bull;</span>
                    <span className="text-[#5A6578]">
                      {issue.category}
                    </span>
                  </div>
                  <time dateTime={issue.date} className="text-xs font-mono text-[#5A6578]">
                    {issue.displayDate}
                  </time>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-[#14181F]">
                  {issue.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5A6578] leading-relaxed">
                  {issue.summary}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Subscription Box */}
        <section className="max-w-2xl mx-auto p-8 sm:p-10 rounded-xl bg-[#0B3D2E] text-white text-center space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-white">
              Subscribe to Compliance Bulletins
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto leading-relaxed">
              Receive verified statutory updates and defense resettlement notices directly in your inbox. No spam.
            </p>
          </div>

          {subscribed ? (
            <div className="p-4 rounded-lg bg-white/10 border border-white/20 text-emerald-200 text-xs font-semibold">
              Thank you for subscribing. You will receive the next scheduled dispatch.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter corporate email..."
                className="flex-1 px-4 py-3 rounded-lg bg-white text-[#14181F] text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-white text-[#0B3D2E] font-semibold text-xs hover:bg-neutral-100 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
