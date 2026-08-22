"use client";

import { motion } from "motion/react";
import { operationalCycleSteps } from "@/data/sop-steps";
import { CheckCircle2, ArrowRight, Layers, Building2, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HowWeWork() {
  return (
    <section className="py-24 md:py-32 bg-[#fbf9f4] border-y border-zinc-200/80">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
            The JSM Difference • Operational Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
            How JSM coordinates your deployment.
          </h2>
          <p className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed">
            Our methodology is systematic, repeatable, and relentlessly optimized across all 6 operational nodes.
          </p>
        </div>

        {/* Blueprint Connecting Nodes Pipeline */}
        <div className="relative mb-16 py-8 px-4 bg-white border border-zinc-200/80 rounded-3xl shadow-sm">
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-zinc-200 -translate-y-1/2 -z-0" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {operationalCycleSteps.map((step, idx) => (
              <div key={step.number} className="flex flex-col items-center text-center space-y-3 bg-white p-2 rounded-2xl">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${
                  idx === 0 
                    ? 'bg-black text-white border-2 border-black' 
                    : 'bg-[#fbf9f4] text-black border-2 border-zinc-300 hover:border-black'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-black">
                    {step.title.split(":")[0]}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Blueprint Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {operationalCycleSteps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="bg-white border border-zinc-200/80 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-black transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#C5A880] tracking-tight">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
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
          <Button asChild size="lg" className="bg-black hover:bg-zinc-800 text-white rounded-full px-8 h-12 text-xs font-bold shadow-md">
            <Link href="/contact">
              Begin Step 01: Schedule Site Assessment <ArrowRight size={15} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
