'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // A speed of 1 gives normal scrolling, < 1 gives parallax
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  if (prefersReducedMotion) {
    return <div className={cn('relative', className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y, scale: 1.1 }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
