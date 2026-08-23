"use client";

import { Plane, BadgeCheck, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const proofStats = [
  {
    icon: Plane,
    value: "2024",
    label: "Trichy Airport Milestone",
    sub: "Civil aviation operations & passenger flow management",
  },
  {
    icon: BadgeCheck,
    value: "100%",
    label: "PSARA & Labour Legal",
    sub: "Police verified, EPF & ESIC compliant",
  },
  {
    icon: Clock,
    value: "2-Hour",
    label: "Guaranteed SLA",
    sub: "Instant replacement via standby roving team",
  },
  {
    icon: ShieldCheck,
    value: "2:00 AM",
    label: "Night Audits",
    sub: "Unannounced supervisor post-checks",
  }
];

export function WhyJSM() {
  return (
    <section className="py-16 md:py-24 bg-[#fbf9f4] border-t border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 space-y-10">
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A880] uppercase block">
              VERIFIED PILLARS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase mt-0.5">
              Proven Numbers.
            </h2>
          </div>
          <Link
            href="/trust-center"
            className="text-xs font-bold text-black hover:text-[#C5A880] flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200/90 hover:border-[#C5A880] hover:shadow-[0_0_20px_rgba(197,168,128,0.3)] bg-white transition-all duration-300 group"
          >
            <span>Trust Center</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {proofStats.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.label}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-zinc-200/90 shadow-xs hover:shadow-[0_12px_36px_rgba(197,168,128,0.25)] hover:border-[#C5A880] hover:-translate-y-1 transition-all duration-300 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-3xl sm:text-4xl font-black text-black font-mono tracking-tight">
                    {st.value}
                  </div>
                  <div className="p-2.5 rounded-2xl bg-[#fbf9f4] border border-zinc-200/70 text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-black transition-colors">
                    <Icon size={20} />
                  </div>
                </div>
                <div className="text-sm font-black text-black">
                  {st.label}
                </div>
                <p className="text-xs text-zinc-500 font-normal leading-relaxed">
                  {st.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
