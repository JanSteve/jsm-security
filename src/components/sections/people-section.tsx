"use client";

import { motion } from "motion/react";
import { brandData } from "@/data/brand";
import { inductionPhilosophy } from "@/data/careers";
import { ArrowRight, CheckCircle2, Award, Users, ShieldCheck, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PeopleSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-black/[0.08]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
            PEOPLE &amp; LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-tight">
            Our People Are Our Product.
          </h2>
          <p className="text-sm sm:text-base text-[#86868b] font-normal max-w-2xl mx-auto leading-relaxed">
            "Your first uniform should not be your final destination." We treat our workforce with dignity, prompt 1st-of-the-month salaries, and structured career progression.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {brandData.leadership.map((leader, idx) => (
            <div
              key={leader.name}
              className="bg-[#f5f5f7] border border-black/[0.06] rounded-[28px] p-6 sm:p-8 space-y-4 hover:border-black/[0.12] hover:shadow-md transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] font-semibold text-xs flex items-center justify-center tabular-nums shadow-sm">
                  0{idx + 1}
                </div>
                <span className="text-[10px] font-semibold text-[#86868b] bg-white border border-black/[0.06] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  LEADERSHIP
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">
                  {leader.name}
                </h3>
                <p className="text-xs font-semibold text-[#0071e3]">
                  {leader.role}
                </p>
              </div>

              <p className="text-xs text-[#515154] leading-relaxed font-normal">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>

        {/* 5-Day Induction Training Snapshot */}
        <div className="bg-[#f5f5f7] text-[#1d1d1f] rounded-[28px] p-6 sm:p-10 md:p-12 border border-black/[0.08] shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
                MANDATORY PRE-DEPLOYMENT SYLLABUS
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                The 5-Day JSM Induction Program
              </h3>
              <p className="text-xs text-[#86868b] max-w-xl">
                No guard or facility staff is placed on-site without completing this 5-day structured curriculum.
              </p>
            </div>
            <Link
              href="/careers"
              className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1 self-start md:self-auto"
            >
              View Full Careers Curriculum <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {inductionPhilosophy.map((day) => (
              <div
                key={day.day}
                className="bg-white border border-black/[0.06] rounded-2xl p-4 space-y-2 shadow-sm"
              >
                <span className="text-xs font-semibold text-[#0071e3] block">
                  {day.day}
                </span>
                <h4 className="text-xs font-semibold text-[#1d1d1f]">
                  {day.title}
                </h4>
                <p className="text-[10px] text-[#86868b] leading-snug">
                  {day.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
