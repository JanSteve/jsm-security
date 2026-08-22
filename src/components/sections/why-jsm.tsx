"use client";

import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Users, 
  FileSpreadsheet, 
  ClipboardList, 
  Smartphone, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { brandData } from "@/data/brand";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "One Accountable Partner",
    description: "Manage private security, housekeeping, and contractual workforce through a single point of executive contact and a single monthly consolidated invoice."
  },
  {
    icon: Users,
    title: "Disciplined Personnel",
    description: "Every deployed staff member completes our 5-day induction covering post duties, fire response, grooming standards, and site-specific emergency protocols."
  },
  {
    icon: FileSpreadsheet,
    title: "Documented SOPs",
    description: "Service is not a promise; it is a process. We implement written post orders and the 5-step hygiene framework (Clean → Inspect → Report → Correct → Verify)."
  },
  {
    icon: ClipboardList,
    title: "Transparent Reporting",
    description: "Real-time attendance registers, documented shift handovers, and surprise supervisory spot-checks logged into transparent client audit summaries."
  },
  {
    icon: Smartphone,
    title: "Technology Enablement",
    description: "Digital attendance tracking, QR-code visitor logging, automated monthly reconciliation, and direct WhatsApp operational escalation channels."
  },
  {
    icon: Sparkles,
    title: "Founder-Led Responsiveness",
    description: "Direct leadership oversight from Managing Director Sweety R and senior field operations officers who resolve on-site requirements immediately."
  }
];

export function WhyJSM() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
            The JSM Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
            Six reasons enterprises trust JSM with their operations.
          </h2>
          <p className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed">
            There is no shortcut to trust — it is earned shift by shift, report by report, client by client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-8 space-y-4 hover:border-black hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-black group-hover:bg-[#C5A880] group-hover:text-black transition-colors duration-300 shadow-sm">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-black tracking-tight group-hover:text-black">
                  {diff.title}
                </h3>
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed font-medium">
                  {diff.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
