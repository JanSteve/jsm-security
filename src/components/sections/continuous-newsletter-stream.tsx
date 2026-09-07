"use client";

import React from "react";
import Link from "next/link";
import { Mail, MessageCircle, ArrowRight, ShieldCheck, Bell, Sparkles } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { brandData } from "@/data/brand";

interface NewsletterItem {
  track: string;
  badgeColor: string;
  title: string;
  date: string;
  href: string;
  isUrgent?: boolean;
}

const streamItems: NewsletterItem[] = [
  {
    track: "ESM & OFFICER DISPATCH",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    title: "DGR Security Agency Empanelment Policy 2026 & Executive CSO Appointments Active",
    date: "Issue #18",
    href: "/newsletter",
    isUrgent: true,
  },
  {
    track: "CIVIL AVIATION BENCHMARK",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    title: "Trichy International Airport Commercial Wing Operations 100% Satisfactory Audit Completed",
    date: "Aviation Record",
    href: "/whats-new",
  },
  {
    track: "CORPORATE COMPLIANCE",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    title: "Zero Client Liability: PSARA 2005 & EPF/ESIC Monthly ECR Challan Verification Protocol",
    date: "Statutory Brief",
    href: "/security-agencies",
  },
  {
    track: "WORKFORCE GAZETTE",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    title: "Tamil Nadu Minimum Wages Act 2026 Schedule Integrated for Zone A, B, and C Districts",
    date: "Govt Schedule",
    href: "/newsletter",
  },
  {
    track: "FIELD RECRUITMENT",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    title: "Ex-Servicemen JCO Field Supervisors & Armed Guards Walk-In Rally — Chennai OMR & Hosur",
    date: "Active Drive",
    href: "/work-opportunities",
    isUrgent: true,
  },
  {
    track: "WHATSAPP BROADCAST",
    badgeColor: "bg-emerald-600 text-white border-emerald-400",
    title: "Receive Weekly Operations Bulletins & Wage Gazettes Directly on WhatsApp (+91 90808 63448)",
    date: "Live Channel",
    href: `https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20please%20add%20me%20to%20the%20weekly%20operations%20newsletter%20broadcast.`,
  }
];

export function ContinuousNewsletterStream({ label = "LIVE OPERATIONS & NEWSLETTER STREAM" }: { label?: string }) {
  return (
    <section className="relative w-full bg-neutral-950 text-white border-y-2 border-white/15 py-3 sm:py-4 overflow-hidden z-20">
      {/* Left/Right Gradient Fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

      {/* Floating Lead Label (Left on Desktop) */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
            <Mail size={13} />
          </div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{label}</span>
          </span>
        </div>

        <Link
          href="/newsletter"
          className="text-xs font-mono font-bold text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>Subscribe to Tracks</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Continuous Infinite Looping Marquee */}
      <Marquee pauseOnHover duration={35} gap={24}>
        {streamItems.map((item, idx) => {
          const isWhatsApp = item.href.includes("wa.me");
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-neutral-900/90 hover:bg-neutral-800 rounded-full border border-white/15 shadow-md transition-all group shrink-0"
            >
              {/* Category Pill */}
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${item.badgeColor}`}>
                {item.track}
              </span>

              {/* Title Content */}
              {isWhatsApp ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{item.title}</span>
                  <MessageCircle size={14} className="text-emerald-400 shrink-0" />
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{item.title}</span>
                  <ArrowRight size={13} className="text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}

              {/* Date / Issue Badge */}
              <span className="text-[10px] font-mono text-neutral-400 border-l border-white/15 pl-2 whitespace-nowrap">
                {item.date}
              </span>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}
