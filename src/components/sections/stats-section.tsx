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
      // Handle decimals if the target value isn't an integer
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
    { value: 500, suffix: '+', label: 'Active Clients' },
    { value: 24, suffix: '/7', label: 'Coverage' },
    { value: 15, suffix: 'min', label: 'Avg Response' },
    { value: 99.9, suffix: '%', label: 'Uptime' }
  ];

  return (
    <section className="py-20 relative bg-background overflow-hidden border-y border-border">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-primary/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="text-4xl md:text-5xl font-bold font-jakarta text-primary mb-2">
                <AnimatedCounter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
