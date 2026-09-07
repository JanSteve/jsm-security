"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Users, 
  MessageCircle, 
  Calendar, 
  ArrowRight,
  Sparkles
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
    title: "ESM & Officer Executive Brief",
    badge: "Defense Veterans",
    icon: ShieldCheck,
    audience: "Retired Armed Forces Officers, JCOs, Defense Resettlement Cells",
    coverage: [
      "DGR security agency policy amendments and gazette notifications",
      "PSU & Defense industrial security empanelment updates",
      "Executive CSO & Security Director leadership vacancies",
      "Weapons licensing & ballistic security standard advisories"
    ],
    frequency: "Fortnightly (Every alternate Friday)"
  },
  {
    id: "corporate",
    title: "Enterprise Facility & Security Dispatch",
    badge: "Corporate & IT",
    icon: Building2,
    audience: "Facility Directors, HR Leaders, Procurement Heads, Tech Park Admins",
    coverage: [
      "PSARA statutory compliance audit checklists & risk mitigation",
      "Biometric access control, AI surveillance & perimeter technology",
      "Closed-loop hygiene standards & Green Building cleaning protocols",
      "Contractual staffing wage trend benchmarks across South India"
    ],
    frequency: "Monthly (1st of every month)"
  },
  {
    id: "labor",
    title: "Workforce & Compliance Gazette",
    badge: "Skilled & Semi-Skilled",
    icon: Users,
    audience: "Supervisors, Field Operatives, Manpower Coordinators",
    coverage: [
      "Government of Tamil Nadu minimum wage revision notifications",
      "EPF & ESIC portal member benefits and health dispensary guides",
      "Safety at work, fire drill, and first-responder SOP manuals",
      "Walk-in deployment rally schedules across Trichy, Chennai & Salem"
    ],
    frequency: "Bi-Monthly"
  }
];

const pastBulletins = [
  {
    date: "March 2026",
    track: "ESM & Officer",
    title: "DGR Wage Indexation & Aviation Zone Security Directives 2026",
    summary: "Comprehensive briefing on revised minimum service charges for security agencies and mandatory perimeter sensor guidelines."
  },
  {
    date: "February 2026",
    track: "Corporate & IT",
    title: "Zero Client Liability: Navigating PSARA 2005 & EPF ECR Verification",
    summary: "Actionable checklist for corporate vendor audits to eliminate statutory legal exposure in third-party facility operations."
  },
  {
    date: "January 2026",
    track: "Workforce",
    title: "Tamil Nadu Minimum Wage Schedule 2026 & Direct Benefit Banking",
    summary: "Detailed breakdown of basic and VDA increases across Zone A, B, and C districts with Aadhaar-linked payroll integration."
  }
];

export default function NewsletterPage() {
  const [selectedTracks, setSelectedTracks] = useState<string[]>(["esm", "corporate"]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleTrack = (id: string) => {
    if (selectedTracks.includes(id)) {
      if (selectedTracks.length > 1) {
        setSelectedTracks(selectedTracks.filter(t => t !== id));
      }
    } else {
      setSelectedTracks([...selectedTracks, id]);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-white text-[#1d1d1f] min-h-screen">
      {/* Header Hero */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 bg-[#0c0c0e] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(16,185,129,0.18),rgba(255,255,255,0))]" />
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Mail size={14} />
            <span>Curated Intelligence Dispatches</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-[1.1]">
            JSM Operational Intelligence &amp; Regulatory Gazette
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Choose your dedicated sector track. Receive actionable intelligence, statutory wage schedules, DGR advisories, and facility management best practices.
          </p>
        </div>
      </section>

      {/* Subscription Form Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl border border-black/[0.1] shadow-2xl p-6 sm:p-10 md:p-14">
          
          {submitted ? (
            <div className="text-center py-12 max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#1d1d1f]">Subscription Activated</h2>
              <p className="text-sm text-[#6e6e73]">
                Thank you for subscribing. You will receive the next edition of your chosen tracks directly in your inbox.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#1d1d1f] text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                Modify Preferences
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-10">
              {/* Track Selection Cards */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f]">
                    Select Your Briefing Tracks
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6e6e73] mt-1">
                    You can select one or multiple tracks tailored to your role.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tracks.map((track) => {
                    const isSelected = selectedTracks.includes(track.id);
                    const Icon = track.icon;
                    return (
                      <div
                        key={track.id}
                        onClick={() => toggleTrack(track.id)}
                        className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected 
                            ? "border-emerald-600 bg-emerald-50/20 shadow-md" 
                            : "border-black/[0.08] bg-[#f5f5f7] hover:border-black/[0.18]"
                        }`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className={`p-2.5 rounded-xl ${isSelected ? "bg-emerald-600 text-white" : "bg-white text-[#1d1d1f] border border-black/10"}`}>
                              <Icon size={18} />
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border border-black/10 text-[#1d1d1f]">
                              {track.badge}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-base font-bold text-[#1d1d1f]">{track.title}</h3>
                            <p className="text-[11px] text-[#86868b] mt-0.5">{track.frequency}</p>
                          </div>

                          <div className="space-y-1.5 pt-2">
                            <span className="text-[10px] font-bold text-[#1d1d1f] uppercase tracking-wide">Key Topics:</span>
                            <ul className="space-y-1">
                              {track.coverage.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-xs text-[#515154]">
                                  <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${isSelected ? "bg-emerald-600" : "bg-[#86868b]"}`} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-6 mt-4 border-t border-black/[0.06] flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#1d1d1f]">
                            {isSelected ? "✓ Track Active" : "+ Click to Select"}
                          </span>
                          <input 
                            type="checkbox" 
                            checked={isSelected} 
                            onChange={() => {}} 
                            className="w-4 h-4 accent-emerald-600 rounded" 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="max-w-xl mx-auto space-y-4 pt-4 border-t border-black/[0.08]">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">
                    Work or Personal Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]" />
                    <input
                      type="email"
                      required
                      placeholder="commander@enterprise.com or your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#f5f5f7] border border-black/[0.1] text-xs sm:text-sm text-[#1d1d1f] focus:outline-none focus:bg-white focus:border-[#0071e3] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">
                    WhatsApp Number (Optional for instant mobile alert)
                  </label>
                  <div className="relative">
                    <MessageCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#f5f5f7] border border-black/[0.1] text-xs sm:text-sm text-[#1d1d1f] focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md mt-6"
                >
                  <span>Activate Selected Subscriptions</span>
                  <ArrowRight size={14} />
                </button>

                <p className="text-[11px] text-[#86868b] text-center pt-2">
                  Zero spam. You may unsubscribe anytime with a single click. We respect complete data confidentiality.
                </p>
              </div>
            </form>
          )}

        </div>

        {/* Direct WhatsApp Channel Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950">
                Want Instant Alerts on WhatsApp Instead?
              </h4>
              <p className="text-xs text-emerald-800">
                Join our verified WhatsApp bulletin channel for rapid deployment announcements and hiring alerts.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20please%20add%20me%20to%20the%20weekly%20operations%20bulletin%20broadcast.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shrink-0 shadow-xs"
          >
            Join WhatsApp Broadcast
          </a>
        </div>

        {/* Bulletin Archives */}
        <div className="mt-16 space-y-6">
          <div className="border-b border-black/[0.08] pb-4">
            <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider">Historical Records</span>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mt-1">
              Archived Operations Bulletins
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastBulletins.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#86868b]">
                  <span className="font-semibold text-[#1d1d1f]">{item.date}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white border border-black/10 text-[10px] font-bold">
                    {item.track}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#1d1d1f] leading-snug">{item.title}</h3>
                <p className="text-xs text-[#6e6e73] leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
