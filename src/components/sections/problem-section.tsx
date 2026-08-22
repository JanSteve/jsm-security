"use client";

import { motion } from "motion/react";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ProblemSection() {
  const problems = [
    { title: "Multiple Disconnected Vendors", desc: "Coordinating separate agencies for security guards, cleaning staff, and contractual helpers wastes dozens of management hours every month." },
    { title: "Inconsistent Training & Grooming", desc: "Different agencies deploy staff with varying discipline standards, leading to poor turnout, gate-entry friction, and absenteeism." },
    { title: "Invoice & Billing Chaos", desc: "Managing 5 distinct contracts, variable billing cycles, and unverified attendance registers strains your accounts team." },
    { title: "Blame-Shifting During Incidents", desc: "When an issue arises at the gate or on the floor, separate agencies blame one another with zero accountability." }
  ];

  const solutions = [
    { title: "One Unified Accountable Partner", desc: "A single dedicated JSM operations manager oversees security, cleaning, and manpower with direct founder accountability." },
    { title: "Uniform 5-Day Induction Standards", desc: "Every team member completes our 5-day syllabus on discipline, grooming, fire safety, and site-specific SOPs before day one." },
    { title: "Single Consolidated Monthly Invoice", desc: "Clean, transparent billing with digital attendance sheets, verified shift logs, and itemized reporting." },
    { title: "Documented SOP Ownership", desc: "Service is not a promise; it is a process. Every post has written standing orders and immediate escalation trees." }
  ];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
            The Operational Reality
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
            Managing multiple service vendors creates multiple problems.
          </h2>
          <p className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed">
            Property managers, factory heads, and society presidents shouldn’t have to spend their workdays babysitting five different service agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Old Vendor Chaos Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-50 border border-red-200/60 rounded-3xl p-6 md:p-8 space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-zinc-200/80 pb-4">
              <div className="w-9 h-9 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <XCircle size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-black">The Fragmented Vendor Model</h3>
                <p className="text-xs text-zinc-500 font-semibold">Multiple agencies, zero coordination</p>
              </div>
            </div>

            <div className="space-y-4">
              {problems.map((p, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm">
                  <XCircle size={17} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-zinc-900 leading-snug">{p.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* The JSM Integrated Model Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900 text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl border border-zinc-800 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="w-9 h-9 rounded-2xl bg-[#C5A880] text-black flex items-center justify-center font-bold">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">The JSM Integrated Model</h3>
                <p className="text-xs text-[#C5A880] font-semibold">One Partner. Every Solution.</p>
              </div>
            </div>

            <div className="space-y-4">
              {solutions.map((s, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 size={17} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white leading-snug">{s.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <Button asChild className="w-full bg-[#C5A880] hover:bg-[#b59870] text-black font-bold rounded-full h-11 text-xs shadow-md">
                <Link href="/contact">
                  Consolidate Your Facility Vendors <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
