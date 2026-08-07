import { Variants } from 'motion/react';

export const springSmooth = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
};

export const springSnappy = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 20,
};

export const springBounce = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 15,
};

export const springGentle = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 25,
};

export const easeOutExpo: [number, number, number, number] = [0.19, 1, 0.22, 1];
export const easeInOutCubic: [number, number, number, number] = [0.645, 0.045, 0.355, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: { 
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.8, ease: easeOutExpo }
  }
};

export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    }
  }
});

export const heroEntranceSequence: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const viewportConfig = {
  once: true,
  margin: '-100px' as const
};

export const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

export function reducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
