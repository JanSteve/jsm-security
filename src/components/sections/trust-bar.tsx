"use client";

import React from "react";
import { 
  ShieldCheck, 
  Plane, 
  BadgeCheck, 
  Users, 
  Clock, 
  Award, 
  Building2, 
  FileCheck, 
  Zap 
} from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const trustItems = [
  {
    tag: "Civil aviation",
    label: "Trichy International Airport operations",
    icon: Plane,
    badgeColor: "text-[#C5A880] bg-[#C5A880]/10 border border-[#C5A880]/30",
  },
  {
    tag: "Statutory governance",
    label: "PSARA Act 2005 compliant • TN Home Dept",
    icon: BadgeCheck,
    badgeColor: "text-blue-400 bg-blue-500/10 border border-blue-500/25",
  },
  {
    tag: "Active supervision",
    label: "2:00 am night supervisor van spot-audits",
    icon: Clock,
    badgeColor: "text-purple-400 bg-purple-500/10 border border-purple-500/25",
  },
  {
    tag: "Guaranteed SLA",
    label: "2-hour relief replacement guarantee",
    icon: Award,
    badgeColor: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/25",
  },
  {
    tag: "Zero client liability",
    label: "100% EPF & ESIC statutory adherence",
    icon: ShieldCheck,
    badgeColor: "text-teal-400 bg-teal-500/10 border border-teal-500/25",
  },
  {
    tag: "Verified marshals",
    label: "5-day pre-deployment security induction",
    icon: Users,
    badgeColor: "text-indigo-400 bg-indigo-500/10 border border-indigo-500/25",
  },
  {
    tag: "GST SAC 998525",
    label: "Licensed private guarding & access control",
    icon: FileCheck,
    badgeColor: "text-[#C5A880] bg-[#C5A880]/10 border border-[#C5A880]/30",
  },
  {
    tag: "GST SAC 998513",
    label: "Contractual industrial staffing solutions",
    icon: Building2,
    badgeColor: "text-rose-400 bg-rose-500/10 border border-rose-500/25",
  },
  {
    tag: "GST SAC 998533",
    label: "5-step closed-loop facility sanitization",
    icon: Zap,
    badgeColor: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/25",
  },
];

export function TrustBar() {
  return (
    <section className="relative border-y border-zinc-800/80 bg-[#07090E] py-4 overflow-hidden">
      {/* Left/Right Gradient Edge Fades for Seamless Infinite Marquee */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#07090E] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#07090E] to-transparent z-10" />

      <Marquee pauseOnHover duration={45} gap={16}>
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#0B0F17]/95 rounded-2xl border border-zinc-800/80 hover:border-[#C5A880]/50 shadow-sm transition-all duration-300 min-h-[44px] cursor-default press-scale group"
            >
              <div className={`p-2 rounded-xl ${item.badgeColor} shrink-0 transition-transform group-hover:scale-105`}>
                <Icon size={15} />
              </div>
              <div className="min-w-0 pr-1">
                <span className="text-[10px] font-mono font-bold text-[#C5A880] tracking-wider block leading-none">
                  {item.tag}
                </span>
                <span className="text-xs font-semibold text-zinc-200 leading-tight block whitespace-nowrap mt-1 tabular-nums">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}
