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
    <section className="py-16 md:py-24 bg-[#07090E] border-t border-zinc-800/80 text-zinc-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800/80 pb-6 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-wider text-[#C5A880] block">
              Verified pillars
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight text-balance">
              Proven operational metrics
            </h2>
          </div>
          <Link
            href="/about"
            className="text-xs font-bold text-zinc-200 hover:text-white flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-zinc-800 hover:border-[#C5A880] bg-[#0B0F17] hover:bg-[#121824] transition-all duration-300 group min-h-[44px] press-scale"
          >
            <span>Learn about JSM standards</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
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
                className="bg-[#0B0F17] p-6 sm:p-7 rounded-3xl border border-zinc-800 hover:border-[#C5A880]/50 shadow-xl transition-all duration-300 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight tabular-nums">
                    {st.value}
                  </div>
                  <div className="p-2.5 rounded-2xl bg-[#07090E] border border-zinc-800 text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-black transition-colors">
                    <Icon size={20} />
                  </div>
                </div>
                <div className="text-sm font-bold text-zinc-100">
                  {st.label}
                </div>
                <p className="text-xs text-zinc-400 font-normal leading-relaxed text-pretty">
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
