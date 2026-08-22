"use client";

import { motion } from "motion/react";
import { operationalCycleSteps } from "@/data/sop-steps";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HowWeWork() {
  return (
    <section className="py-24 md:py-32 bg-zinc-50 border-y border-zinc-200/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
            The Operational Cycle
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
            How JSM coordinates your deployment.
          </h2>
          <p className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed">
            We operate as a systematic process, not just manpower. Every step is documented, audited, and continuously refined.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {operationalCycleSteps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="bg-white border border-zinc-200/80 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-zinc-400 transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#C5A880] tracking-tight">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-black tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-zinc-100 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Key Deliverables:
                </p>
                {step.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-1.5 text-xs text-zinc-700 font-medium">
                    <CheckCircle2 size={13} className="text-[#C5A880] flex-shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-black hover:bg-zinc-800 text-white rounded-full px-7 h-12 text-xs font-bold shadow-md">
            <Link href="/contact">
              Begin Step 01: Schedule Site Assessment <ArrowRight size={15} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
