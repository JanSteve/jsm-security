'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface KineticTypographyProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  mode?: 'word' | 'letter';
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  once?: boolean;
}

/**
 * KineticTypography renders high-impact, staggered headline reveals
 * with mathematical zero-CLS guarantees using masked inline-block wrappers
 * and CSS transforms.
 */
export function KineticTypography({
  text,
  as: Component = 'h2',
  mode = 'word',
  staggerDelay,
  initialDelay = 0.05,
  className,
  once = true,
}: KineticTypographyProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const delay = staggerDelay ?? (mode === 'word' ? 0.035 : 0.015);
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: '115%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const, // Apple-tier smooth deceleration
      },
    },
  };

  return (
    <Component className={cn('inline-block', className)} aria-label={text}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-30px' }}
        className="inline"
      >
        {mode === 'word' ? (
          words.map((word, wIdx) => (
            <span
              key={`w-${wIdx}-${word}`}
              className="inline-block overflow-hidden align-top whitespace-nowrap"
              aria-hidden="true"
            >
              <motion.span
                variants={itemVariants}
                className="inline-block pr-[0.25em]"
              >
                {word}
              </motion.span>
            </span>
          ))
        ) : (
          words.map((word, wIdx) => (
            <span
              key={`w-letter-${wIdx}-${word}`}
              className="inline-block overflow-hidden align-top whitespace-nowrap pr-[0.25em]"
              aria-hidden="true"
            >
              {word.split('').map((char, cIdx) => (
                <motion.span
                  key={`c-${wIdx}-${cIdx}-${char}`}
                  variants={itemVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))
        )}
      </motion.span>
    </Component>
  );
}
