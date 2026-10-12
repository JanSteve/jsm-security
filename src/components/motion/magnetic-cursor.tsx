'use client';

import React, { useRef, useSyncExternalStore } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  enableMagnetic?: boolean;
}

function subscribeFinePointer(callback: () => void) {
  const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getFinePointerSnapshot(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function getFinePointerServerSnapshot(): boolean {
  return false;
}

export function useIsFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );
}

/**
 * MagneticWrapper creates a subtle physical attraction pulling interactive elements
 * (like CTA buttons, icons, or badges) toward the user's cursor.
 */
export function MagneticWrapper({
  children,
  strength = 0.22,
  className,
  enableMagnetic = true,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useIsFinePointer();

  const springConfig = { stiffness: 350, damping: 22, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !enableMagnetic || prefersReducedMotion || !isFinePointer) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (prefersReducedMotion || !enableMagnetic || !isFinePointer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn('inline-block will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
}

