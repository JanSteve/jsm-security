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
  },
  {
    tag: "Statutory governance",
    label: "PSARA Act 2005 compliant • TN Home Dept",
    icon: BadgeCheck,
  },
  {
    tag: "Active supervision",
    label: "2:00 am night supervisor van spot-audits",
    icon: Clock,
  },
  {
    tag: "Guaranteed SLA",
    label: "2-hour relief replacement guarantee",
    icon: Award,
  },
  {
    tag: "Zero client liability",
    label: "100% EPF & ESIC statutory adherence",
    icon: ShieldCheck,
  },
  {
    tag: "Verified marshals",
    label: "5-day pre-deployment security induction",
    icon: Users,
  },
  {
    tag: "GST SAC 998525",
    label: "Licensed private guarding & access control",
    icon: FileCheck,
  },
  {
    tag: "GST SAC 998513",
    label: "Contractual industrial staffing solutions",
    icon: Building2,
  },
  {
    tag: "GST SAC 998533",
    label: "5-step closed-loop facility sanitization",
    icon: Zap,
  },
];

export function TrustBar() {
  return (
    <section className="relative border-y border-black/[0.06] bg-[#f5f5f7] py-3.5 overflow-hidden">
      {/* Left/Right Gradient Edge Fades for Seamless Infinite Marquee */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#f5f5f7] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#f5f5f7] to-transparent z-10" />

      <Marquee pauseOnHover duration={45} gap={16}>
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-black/[0.06] shadow-2xs transition-all duration-300 min-h-[40px] cursor-default press-scale group hover:border-black/[0.15]"
            >
              <div className="p-1.5 rounded-full bg-[#f5f5f7] text-[#1d1d1f] shrink-0 transition-transform group-hover:scale-105">
                <Icon size={14} />
              </div>
              <div className="min-w-0 pr-1">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-[#86868b] tracking-wider uppercase">
                    {item.tag}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#1d1d1f] leading-tight block whitespace-nowrap mt-1 tabular-nums">
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
