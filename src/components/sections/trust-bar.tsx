"use client";

import { motion } from "motion/react";
import { Shield, Sparkles, Users, Banknote, Ticket, Building2 } from "lucide-react";

export function TrustBar() {
  const pillars = [
    { label: "Private Security", icon: Shield },
    { label: "Facility Housekeeping", icon: Sparkles },
    { label: "Contractual Manpower", icon: Users },
    { label: "Cash-in-Transit Logistics", icon: Banknote },
    { label: "Event & Wedding Support", icon: Ticket },
    { label: "Real Estate & Site Support", icon: Building2 },
  ];

  return (
    <section className="border-y border-zinc-200/80 bg-zinc-50/70 py-6 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400 whitespace-nowrap">
            Integrated Operations Across:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full md:w-auto">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-2 px-3 py-2 bg-white rounded-2xl border border-zinc-200/60 shadow-sm"
                >
                  <Icon size={14} className="text-[#C5A880] flex-shrink-0" />
                  <span className="text-xs font-bold text-zinc-800 whitespace-nowrap">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
