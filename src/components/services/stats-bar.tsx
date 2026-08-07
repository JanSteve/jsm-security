'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 99.9, label: 'Uptime & Reliability', suffix: '%' },
  { value: 24, label: 'Hour Response Support', suffix: '/7' },
  { value: 100, label: 'SIA Licensed Staff', suffix: '%' }
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const displayValue = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black text-[#C5A880]">
      {displayValue}{suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border border-zinc-200/60 my-16 bg-zinc-50 rounded-3xl px-8 shadow-sm">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <Counter value={stat.value} suffix={stat.suffix} />
          <p className="mt-2 text-zinc-500 font-bold text-xs uppercase tracking-widest">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
