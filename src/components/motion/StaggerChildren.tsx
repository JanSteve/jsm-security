'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { staggerContainer, viewportConfig } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface StaggerChildrenProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  stagger = 0.1,
  delay = 0,
  className,
}: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {children}
    </motion.div>
  );
}
