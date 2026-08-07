'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { viewportConfig, easeOutExpo } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { ElementType } from 'react';

interface TextRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  mode?: 'lines' | 'words';
}

export function TextReveal({
  text,
  as: Component = 'p',
  className,
  delay = 0,
  mode = 'words',
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
        ease: easeOutExpo,
      },
    },
  };

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <motion.div
      className={cn(className, 'flex flex-wrap')}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={child}
          className="mr-1 inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
