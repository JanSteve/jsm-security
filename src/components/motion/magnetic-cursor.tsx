'use client';

import React, { useRef, useState, useEffect, useSyncExternalStore } from 'react';
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

/**
 * AmbientMagneticCursor renders a hairline titanium tracking orb
 * that smoothly follows the cursor on pointer-capable desktop screens.
 */
export function AmbientMagneticCursor() {
  const isFinePointer = useIsFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 30, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion || !isFinePointer) return;

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [cursorX, cursorY, isFinePointer, prefersReducedMotion]);

  if (!isFinePointer || prefersReducedMotion || !isVisible) return null;

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      aria-hidden="true"
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/20 bg-white/5 pointer-events-none z-50 backdrop-blur-[1px] transition-opacity duration-200"
    />
  );
}
