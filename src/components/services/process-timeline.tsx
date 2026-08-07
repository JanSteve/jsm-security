'use client';

import { motion } from 'motion/react';

interface ProcessStep {
  title: string;
  description: string;
}

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative py-12">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-[#1A264D] -translate-y-1/2 hidden lg:block" />
      <div className="absolute top-0 left-8 w-1 h-full bg-[#1A264D] lg:hidden" />
      
      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-6 relative">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, type: 'spring' }}
            className="flex lg:flex-col items-start lg:items-center gap-6 lg:gap-4 relative z-10 lg:w-1/4"
          >
            <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#0A1128] flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              {i + 1}
            </div>
            <div className="lg:text-center pt-2 lg:pt-0">
              <h4 className="text-xl font-bold text-[#F8F9FA] mb-2">{step.title}</h4>
              <p className="text-[#94A3B8]">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
