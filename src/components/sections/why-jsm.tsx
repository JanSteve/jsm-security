"use client";

import { motion } from "motion/react";
import { Plane, BadgeCheck, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const proofStats = [
  {
    icon: Plane,
    value: "2024",
    label: "Trichy airport milestone",
    sub: "Civil aviation operations & passenger flow management",
  },
  {
    icon: BadgeCheck,
    value: "100%",
    label: "PSARA & labour compliance",
    sub: "Police verified personnel, 100% EPF & ESIC statutory adherence",
  },
  {
    icon: Clock,
    value: "2-Hour",
    label: "Guaranteed relief SLA",
    sub: "Instant replacement via standby roving reserve squad",
  },
  {
    icon: ShieldCheck,
    value: "2:00 AM",
    label: "Night van spot-audits",
    sub: "Unannounced supervisor mobile patrol post-checks",
  }
];

export function WhyJSM() {
  return (
    <section className="py-16 md:py-24 bg-[#f5f5f7] border-t border-black/[0.08] text-[#1d1d1f]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-black/[0.08] pb-6 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#0071e3] uppercase block">
              Verified pillars
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight text-balance">
              Proven operational metrics
            </h2>
          </div>
          <Link
            href="/about"
            className="text-xs font-semibold text-[#1d1d1f] hover:text-[#0071e3] flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-black/[0.08] bg-white hover:bg-[#e8e8ed] transition-all duration-300 group min-h-[44px] press-scale shadow-xs"
          >
            <span>Learn about JSM standards</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#0071e3]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {proofStats.map((st) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={st.label}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white p-6 sm:p-7 rounded-[24px] border border-black/[0.06] shadow-sm hover:shadow-md transition-all duration-300 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight tabular-nums">
                    {st.value}
                  </div>
                  <div className="p-2.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] text-[#0071e3] group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                </div>
                <div className="text-sm font-semibold text-[#1d1d1f]">
                  {st.label}
                </div>
                <p className="text-xs text-[#86868b] font-normal leading-relaxed text-pretty">
                  {st.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
