"use client";

import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Users, 
  FileSpreadsheet, 
  Clock, 
  BadgeCheck, 
  Plane,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const differentiators = [
  {
    icon: Plane,
    badge: "OPERATIONAL PROOF",
    title: "Proven at Scale: 2024 Trichy Airport",
    description: "Our operational discipline was proven under the demanding conditions of civil aviation passenger screening and terminal security at Trichy International Airport."
  },
  {
    icon: BadgeCheck,
    badge: "100% STATUTORY",
    title: "PSARA & Labour Law Compliance",
    description: "Operating strictly under the Private Security Agencies Regulation Act (PSARA 2005) with 100% EPF, ESI, and police verification for zero client liability."
  },
  {
    icon: Users,
    badge: "5-DAY SYLLABUS",
    title: "Structured Induction Training",
    description: "Every deployed personnel completes our 5-day mandatory training covering access control, fire drills, grooming, and polite de-escalation."
  },
  {
    icon: Clock,
    badge: "UNANNOUNCED CHECKS",
    title: "2:00 AM Surprise Night Audits",
    description: "Field supervisory officers conduct unscheduled night visits to ensure alertness, perimeter lock checks, and strict post order compliance."
  },
  {
    icon: ShieldCheck,
    badge: "GUARANTEED SLA",
    title: "2-Hour Personnel Replacement",
    description: "If an assigned staff member is absent or unfit, our roving reserve operations team deploys a verified replacement within 120 minutes."
  },
  {
    icon: Sparkles,
    badge: "EXECUTIVE ACCESS",
    title: "Direct Founder Accountability",
    description: "Led by Managing Director Sweety R, our executive team takes personal accountability for service quality and client escalation."
  }
];

export function WhyJSM() {
  return (
    <section className="py-20 md:py-28 bg-[#fbf9f4] border-t border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#C5A880]">
            THE JSM DIFFERENCE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
            Six reasons enterprises trust JSM with their operations.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
            There is no shortcut to trust — it is earned shift by shift, report by report, client by client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-black hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#fbf9f4] border border-zinc-200 flex items-center justify-center text-black group-hover:bg-[#C5A880] group-hover:text-black transition-colors duration-300 shadow-xs">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md uppercase">
                      {diff.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-black tracking-tight">
                    {diff.title}
                  </h3>

                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {diff.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 mt-2">
                  <Link
                    href="/trust-center"
                    className="text-xs font-bold text-black group-hover:text-[#C5A880] flex items-center gap-1 transition-colors"
                  >
                    View Governance Blueprint <ArrowRight size={13} />
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
