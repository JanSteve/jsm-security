"use client";

import { motion } from "motion/react";
import { inductionPhilosophy, careerProgressionSteps } from "@/data/careers";
import { ArrowRight, CheckCircle2, Award, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PeopleSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
            People-First Operating Culture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
            Our people are our product.
          </h2>
          <p className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed">
            "Your first uniform should not be your final destination." We invest in structured 5-day induction training, verified identity checks, on-time salaries, and clear career pathways.
          </p>
        </div>

        {/* 5-Day Induction Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto mb-16">
          {inductionPhilosophy.map((day, idx) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-black text-[#C5A880] tracking-wider uppercase">
                  {day.day}
                </span>
                <h4 className="text-sm font-bold text-black leading-snug">
                  {day.title}
                </h4>
                <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                  {day.focus}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-200/60 space-y-1.5">
                {day.details.slice(0, 2).map((det, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[10px] text-zinc-700 font-medium">
                    <CheckCircle2 size={11} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>{det}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Career Growth Strip */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 md:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-800">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880]">
              Career Progression
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Looking for work that stands for something?
            </h3>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              We provide prompt salaries on the 1st of every month, company-issued uniform sets, and merit-based promotion into supervisory roles.
            </p>
          </div>

          <Button asChild size="lg" className="bg-[#C5A880] hover:bg-[#b59870] text-black font-bold rounded-full px-7 h-12 text-xs shadow-md flex-shrink-0">
            <Link href="/careers">
              Explore Open Careers & Apply <ArrowRight size={15} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
