'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useIsFinePointer } from './magnetic-cursor';

export interface PerspectiveTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  spotlightColor?: string;
  enableTilt?: boolean;
  scaleOnHover?: number;
}

/**
 * PerspectiveTiltCard creates an interactive 3D perspective tilt card
 * with spring physics and a dynamic titanium platinum spotlight sheen.
 */
export function PerspectiveTiltCard({
  children,
  className,
  maxTilt = 8,
  spotlightColor = 'rgba(14, 165, 233, 0.18)',
  enableTilt = true,
  scaleOnHover = 1.02,
}: PerspectiveTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isFinePointer = useIsFinePointer();
  const prefersReducedMotion = useReducedMotion();

  // Normalized mouse coordinates: [-0.5, 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spotlight position percentages (0 - 100)
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // Spring physics config
  const springConfig = { stiffness: 320, damping: 24, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D rotation mapping:
  // tilting card up when cursor is at top (-mouseY -> +rotateX)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const shouldTilt = enableTilt && isFinePointer && !prefersReducedMotion;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !shouldTilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const xPct = clientX / rect.width;
    const yPct = clientY / rect.height;

    mouseX.set(xPct - 0.5);
    mouseY.set(yPct - 0.5);

    setSpotlightPos({
      x: Math.round(xPct * 100),
      y: Math.round(yPct * 100),
    });
  };

  const handleMouseEnter = () => {
    if (isFinePointer) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('relative perspective-[1000px] will-change-transform h-full', className)}
    >
      <motion.div
        style={{
          rotateX: shouldTilt ? rotateX : 0,
          rotateY: shouldTilt ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileHover={shouldTilt ? { scale: scaleOnHover } : undefined}
        transition={{ scale: { duration: 0.22, ease: 'easeOut' } }}
        className="w-full h-full relative rounded-xl overflow-hidden transition-shadow duration-300 will-change-transform [transform:translate3d(0,0,0)]"
      >
        {/* Dynamic Cyber Cyan Spotlight Sheen Overlay */}
        {isFinePointer && !prefersReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 rounded-[inherit]"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 380px at ${spotlightPos.x}% ${spotlightPos.y}%, ${spotlightColor} 0%, rgba(14, 165, 233, 0.04) 40%, transparent 70%)`,
            }}
          />
        )}

        {/* Card Content Container */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
