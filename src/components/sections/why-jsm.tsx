"use client";

import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  BadgeCheck, 
  Plane,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const proofPillars = [
  {
    icon: Plane,
    tag: "PROVEN TRACK RECORD",
    title: "2024 Trichy Airport Contract",
    desc: "Successfully executed civil aviation security support and terminal crowd management.",
  },
  {
    icon: BadgeCheck,
    tag: "STATE GOVERNANCE",
    title: "PSARA Act 2005 Compliant",
    desc: "100% police verification, Tamil Nadu Home Dept licensing, and zero labour liability.",
  },
  {
    icon: Users,
    tag: "VERIFIED STAFF",
    title: "5-Day Induction Training",
    desc: "Mandatory pre-deployment curriculum on access control, fire safety, and courteous de-escalation.",
  },
  {
    icon: Clock,
    tag: "ACTIVE SUPERVISION",
    title: "2:00 AM Night Spot-Checks",
    desc: "Unannounced supervisor visits ensure alertness and strict post order compliance.",
  },
  {
    icon: ShieldCheck,
    tag: "GUARANTEED SLA",
    title: "2-Hour Replacement SLA",
    desc: "Absent staff replaced by verified roving reserve personnel within 120 minutes.",
  },
  {
    icon: Sparkles,
    tag: "EXECUTIVE DIRECT",
    title: "Founder Accountability",
    desc: "Direct leadership oversight from Managing Director Sweety R and operations officers.",
  }
];

export function WhyJSM() {
  return (
    <section className="py-16 md:py-24 bg-[#fbf9f4] border-t border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#C5A880] uppercase">
            VERIFIED CREDENTIALS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
            Why Clients Trust JSM.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal">
            Real standards, verified milestones, and zero fabricated claims.
          </p>
        </div>

        {/* Compact Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {proofPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-3xl p-6 space-y-3 hover:border-[#C5A880]/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#fbf9f4] border border-zinc-200 flex items-center justify-center text-black">
                      <Icon size={18} />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-[#C5A880] bg-zinc-50 border border-zinc-200/70 px-2 py-0.5 rounded-md uppercase">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-black tracking-tight">
                    {p.title}
                  </h3>

                  <p className="text-xs text-zinc-500 font-normal leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-bold text-zinc-700">
                  <Link href="/trust-center" className="hover:text-black hover:underline flex items-center gap-1">
                    <span>Audit Protocol</span>
                    <ArrowRight size={11} className="text-[#C5A880]" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
