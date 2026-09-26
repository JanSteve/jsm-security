"use client";

import React from "react";
import { ShieldCheck, Users, Sparkles, Clock, Activity } from "lucide-react";

export function LiveAvailabilityBadge() {
  return (
    <section className="bg-white border-b border-[#E5E7EB] py-3.5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 font-semibold text-[#0F1922]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10A870] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10A870]" />
            </span>
            <span className="uppercase tracking-wider font-mono text-[11px] text-[#10A870]">
              Operational Status:
            </span>
            <span className="hidden sm:inline text-[#4A5160]">Active Mobilization Across Tamil Nadu</span>
          </div>

          {/* Metrics Strip */}
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-xs text-[#4A5160]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#10A870]" />
              <span><strong>12</strong> Reserve Guards Ready</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-[#1E5BA8]" />
              <span><strong>28</strong> Staffing Roster Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#0891B2]" />
              <span><strong>5</strong> Facility Squads Deployed</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-[#0F1922]">
              <Clock size={14} className="text-[#D97757]" />
              <span>2-Hour Replacement SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
