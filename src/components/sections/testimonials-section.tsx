'use client';

import { clientExperienceCommitments } from '@/data/testimonials';
import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/motion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
            Operational Benchmarks
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight">
            What Our Clients Experience
          </h2>
          <p className="text-zinc-500 text-base max-w-2xl mx-auto font-medium">
            Service principles forged through real infrastructure operations and daily shift discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {clientExperienceCommitments.map((comm) => (
            <div 
              key={comm.id}
              className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200/80 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-white border border-zinc-200 px-2.5 py-1 rounded-full inline-block">
                  {comm.context}
                </span>
                <h3 className="text-lg font-bold text-black">
                  {comm.pillar}
                </h3>
                <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-medium">
                  "{comm.statement}"
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-200/60 flex items-center gap-2 text-xs font-bold text-black">
                <CheckCircle2 size={14} className="text-[#C5A880]" />
                <span>Verified Operational Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
