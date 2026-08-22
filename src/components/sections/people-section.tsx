"use client";

import { motion } from "motion/react";
import { brandData } from "@/data/brand";
import { inductionPhilosophy } from "@/data/careers";
import { ArrowRight, CheckCircle2, Award, Users, ShieldCheck, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PeopleSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#C5A880]">
            PEOPLE &amp; LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight uppercase">
            Our People Are Our Product.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal max-w-2xl mx-auto leading-relaxed">
            "Your first uniform should not be your final destination." We treat our workforce with dignity, prompt 1st-of-the-month salaries, and structured career progression.
          </p>
        </div>

        {/* Leadership Grid (Human Trust & Executive Accountability) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {brandData.leadership.map((leader, idx) => (
            <div
              key={leader.name}
              className="bg-[#fbf9f4] border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-black hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-black text-[#C5A880] font-black text-xs flex items-center justify-center font-mono">
                  0{idx + 1}
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-500 bg-white border border-zinc-200 px-2.5 py-1 rounded-md uppercase">
                  LEADERSHIP
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="text-lg font-black text-black tracking-tight">
                  {leader.name}
                </h3>
                <p className="text-xs font-bold text-[#C5A880]">
                  {leader.role}
                </p>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>

        {/* 5-Day Induction Training Snapshot */}
        <div className="bg-[#0A1628] text-white rounded-3xl p-6 sm:p-10 md:p-12 border border-zinc-800 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880]">
                MANDATORY PRE-DEPLOYMENT SYLLABUS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                The 5-Day JSM Induction Program
              </h3>
              <p className="text-xs text-zinc-400 max-w-xl">
                No guard or facility staff is placed on-site without completing this 5-day structured curriculum.
              </p>
            </div>
            <Link
              href="/careers"
              className="text-xs font-bold text-[#C5A880] hover:underline flex items-center gap-1 self-start md:self-auto"
            >
              View Full Careers Curriculum <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {inductionPhilosophy.map((day) => (
              <div
                key={day.day}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2"
              >
                <span className="text-xs font-mono font-bold text-[#C5A880]">
                  {day.day}
                </span>
                <h4 className="text-xs font-bold text-white">
                  {day.title}
                </h4>
                <p className="text-[10px] text-zinc-400 leading-snug">
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
