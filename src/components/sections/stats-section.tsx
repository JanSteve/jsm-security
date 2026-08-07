'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (value % 1 !== 0) {
         setDisplayValue(Number(latest.toFixed(1)));
      } else {
         setDisplayValue(Math.round(latest));
      }
    });
    return unsubscribe;
  }, [springValue, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export function StatsSection() {
  const stats = [
    { value: 500, suffix: '+', label: 'Active Enterprise Clients', sub: 'From London to international office hubs' },
    { value: 24, suffix: '/7', label: 'Command Room Security', sub: 'Uninterrupted remote CCTV oversight' },
    { value: 15, suffix: 'min', label: 'Average Response Time', sub: 'Guaranteed local dispatch details' },
    { value: 99.9, suffix: '%', label: 'Service SLA Compliance', sub: 'Uptime target met consistently' }
  ];

  return (
    <section className="py-24 relative bg-zinc-50 border-y border-zinc-200/80 overflow-hidden">
      {/* Soft gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#C5A880]/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              className="flex flex-col justify-between p-8 bg-white border border-zinc-200/60 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-2">
                  <AnimatedCounter value={stat.value} />
                  <span className="text-[#C5A880]">{stat.suffix}</span>
                </h3>
                <h4 className="text-sm font-bold text-zinc-800 mb-1">{stat.label}</h4>
              </div>
              <p className="text-xs text-zinc-500 mt-4 leading-relaxed border-t border-zinc-100 pt-4">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
