"use client";

import { Plane, BadgeCheck, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const proofStats = [
  {
    icon: Plane,
    value: "2024",
    label: "Trichy Airport Milestone",
    sub: "Civil aviation operations & crowd management",
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
    <section className="py-14 md:py-20 bg-[#fbf9f4] border-t border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A880] uppercase block">
              VERIFIED PILLARS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
              Proven Numbers.
            </h2>
          </div>
          <Link href="/trust-center" className="text-xs font-bold text-black hover:text-[#C5A880] flex items-center gap-1">
            <span>Trust Center</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {proofStats.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.label}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-zinc-200/80 shadow-xs hover:shadow-lg hover:border-[#C5A880]/60 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="text-2xl sm:text-3xl font-black text-black font-mono">
                    {st.value}
                  </div>
                  <Icon size={20} className="text-[#C5A880]" />
                </div>
                <div className="text-xs sm:text-sm font-black text-black">
                  {st.label}
                </div>
                <p className="text-[11px] text-zinc-500 font-normal leading-tight">
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
