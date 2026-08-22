"use client";

import { motion } from "motion/react";
import { ShieldCheck, Plane, BadgeCheck, Users, Clock, Award } from "lucide-react";

export function TrustBar() {
  const proofItems = [
    { label: "2024 Trichy Airport Contract", icon: Plane, tag: "PROVEN BENCHMARK" },
    { label: "PSARA Act (2005) Compliant", icon: BadgeCheck, tag: "STATE GOVERNANCE" },
    { label: "5-Day Induction Training", icon: Users, tag: "VERIFIED GUARDS" },
    { label: "2:00 AM Night Audits", icon: Clock, tag: "ACTIVE SUPERVISION" },
    { label: "100% EPF & ESI Adherence", icon: ShieldCheck, tag: "ZERO LIABILITY" },
    { label: "2-Hour Replacement SLA", icon: Award, tag: "GUARANTEED RELIEF" },
  ];

  return (
    <section className="border-y border-zinc-200/80 bg-[#fbf9f4] py-5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {proofItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-white rounded-2xl border border-zinc-200/70 shadow-xs group hover:border-black transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-[#fbf9f4] text-black group-hover:bg-[#C5A880] transition-colors flex-shrink-0">
                  <Icon size={14} className="text-black" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-mono font-bold text-[#C5A880] uppercase block leading-none truncate">
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-bold text-zinc-900 leading-tight block truncate mt-0.5">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
