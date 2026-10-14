'use client';

import React, { useRef, useSyncExternalStore } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, MotionValue } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StickyStepItem {
  id: string;
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  metrics?: { label: string; value: string }[];
  deliverables?: string[];
  actionLink?: { href: string; label: string };
  visualContent: React.ReactNode;
}

export interface StickyScrollSequenceProps {
  steps: StickyStepItem[];
  headline?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  theme?: 'light' | 'dark' | 'sand';
}

function StepTextContent({
  step,
  index,
  totalSteps,
  smoothProgress,
  isDark,
}: {
  step: StickyStepItem;
  index: number;
  totalSteps: number;
  smoothProgress: MotionValue<number>;
  isDark: boolean;
}) {
  const start = index / totalSteps;
  const end = (index + 1) / totalSteps;
  const isFirst = index === 0;
  const isLast = index === totalSteps - 1;

  // Window bounds with slight cross-fade padding
  const fadeInStart = isFirst ? 0 : start - 0.06;
  const fadeOutEnd = isLast ? 1 : end + 0.04;

  const opacity = useTransform(
    smoothProgress,
    isFirst
      ? [0, 0, end - 0.04, fadeOutEnd]
      : isLast
      ? [fadeInStart, start + 0.02, 1, 1]
      : [fadeInStart, start + 0.02, end - 0.04, fadeOutEnd],
    isFirst ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );

  const translateY = useTransform(
    smoothProgress,
    isFirst
      ? [0, end - 0.04, fadeOutEnd]
      : isLast
      ? [fadeInStart, start + 0.02, 1]
      : [fadeInStart, start + 0.02, end - 0.04, fadeOutEnd],
    isFirst ? [0, 0, -20] : isLast ? [24, 0, 0] : [24, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, y: translateY }}
      className="absolute inset-0 flex flex-col justify-center space-y-4 text-left pointer-events-auto"
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>{step.badge}</span>
        </span>
        {step.subtitle && (
          <span className={cn('text-xs font-mono font-medium', isDark ? 'text-gray-400' : 'text-[#4A5160]')}>
            {step.subtitle}
          </span>
        )}
      </div>

      <h3
        className={cn(
          'font-serif text-2xl sm:text-3xl lg:text-[32px] font-semibold tracking-tight leading-snug',
          isDark ? 'text-white' : 'text-[#14181F]'
        )}
      >
        {step.title}
      </h3>

      <p className={cn('text-xs sm:text-sm leading-relaxed line-measure', isDark ? 'text-gray-300' : 'text-[#4A5160]')}>
        {step.description}
      </p>

      {/* Deliverables Checklist if available */}
      {step.deliverables && step.deliverables.length > 0 && (
        <div className="pt-2 space-y-2">
          <div className={cn('text-[11px] font-semibold uppercase tracking-wider', isDark ? 'text-gray-400' : 'text-[#14181F]')}>
            Core Operational Protocols:
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {step.deliverables.map((item, dIdx) => (
              <li
                key={dIdx}
                className={cn('flex items-start gap-2', isDark ? 'text-gray-300' : 'text-[#4A5160]')}
              >
                <Check size={14} className="text-white shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Metrics Highlights if available */}
      {step.metrics && step.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {step.metrics.map((m, mIdx) => (
            <div
              key={mIdx}
              className={cn(
                'p-2.5 rounded-lg border text-left',
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#E4E7EC]'
              )}
            >
              <div className="text-base sm:text-lg font-bold font-mono text-white">
                {m.value}
              </div>
              <div className={cn('text-[10px] font-medium leading-tight pt-0.5', isDark ? 'text-gray-400' : 'text-[#4A5160]')}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Direct Specification Action Link */}
      {step.actionLink && (
        <div className="pt-3">
          <Link
            href={step.actionLink.href}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] border border-white/20 text-white hover:bg-white hover:text-black text-xs font-semibold transition-colors min-touch-target"
          >
            <span>{step.actionLink.label}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </motion.div>
  );
}

function StepVisualContent({
  step,
  index,
  totalSteps,
  smoothProgress,
  isDark,
}: {
  step: StickyStepItem;
  index: number;
  totalSteps: number;
  smoothProgress: MotionValue<number>;
  isDark: boolean;
}) {
  const start = index / totalSteps;
  const end = (index + 1) / totalSteps;
  const isFirst = index === 0;
  const isLast = index === totalSteps - 1;

  const fadeInStart = isFirst ? 0 : start - 0.06;
  const fadeOutEnd = isLast ? 1 : end + 0.04;

  const opacity = useTransform(
    smoothProgress,
    isFirst
      ? [0, 0, end - 0.04, fadeOutEnd]
      : isLast
      ? [fadeInStart, start + 0.02, 1, 1]
      : [fadeInStart, start + 0.02, end - 0.04, fadeOutEnd],
    isFirst ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );

  const scale = useTransform(
    smoothProgress,
    isFirst
      ? [0, end - 0.04, fadeOutEnd]
      : isLast
      ? [fadeInStart, start + 0.02, 1]
      : [fadeInStart, start + 0.02, end - 0.04, fadeOutEnd],
    isFirst ? [1, 1, 0.94] : isLast ? [0.94, 1, 1] : [0.94, 1, 1, 0.94]
  );

  return (
    <motion.div
      key={`visual-motion-${step.id}`}
      style={{ opacity, scale }}
      className={cn(
        'absolute inset-0 rounded-xl overflow-hidden border shadow-xl flex items-center justify-center p-4 sm:p-6',
        isDark ? 'bg-[#0B0F17] border-white/10' : 'bg-white border-[#E4E7EC]'
      )}
    >
      <div className="w-full h-full flex flex-col justify-center">
        {step.visualContent}
      </div>
    </motion.div>
  );
}

function subscribeMobile(callback: () => void) {
  const mq = window.matchMedia('(max-width: 767px)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getMobileSnapshot(): boolean {
  return window.matchMedia('(max-width: 767px)').matches;
}

function getMobileServerSnapshot(): boolean {
  return false;
}

function useIsMobile(): boolean {
  return useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getMobileServerSnapshot
  );
}

export function StickyScrollSequence({
  steps,
  headline,
  eyebrow,
  description,
  className,
  theme = 'light',
}: StickyScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 26,
    restDelta: 0.001,
  });

  const isDark = theme === 'dark';
  const isSand = theme === 'sand';

  // Fallback for prefers-reduced-motion or mobile viewports: sequential card stack
  if (prefersReducedMotion || isMobile) {
    return (
      <section
        className={cn(
          'py-16 border-b',
          isDark
            ? 'bg-[#05070B] border-white/10 text-white'
            : isSand
            ? 'bg-[#F6F7F9] border-[#E4E7EC]'
            : 'bg-white border-[#E4E7EC]',
          className
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          {(eyebrow || headline || description) && (
            <div className="max-w-3xl space-y-2 text-left">
              {eyebrow && <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{eyebrow}</div>}
              {headline && (
                <h2 className={cn('font-serif text-2xl sm:text-3xl font-semibold', isDark ? 'text-white' : 'text-[#14181F]')}>
                  {headline}
                </h2>
              )}
              {description && (
                <p className={cn('text-xs sm:text-sm leading-relaxed', isDark ? 'text-gray-300' : 'text-[#4A5160]')}>
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="space-y-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  'p-6 rounded-xl border space-y-5',
                  isDark ? 'bg-white/5 border-white/10' : 'bg-[#F6F7F9] border-[#E4E7EC]'
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                    {step.badge}
                  </span>
                  {step.subtitle && (
                    <span className="text-xs font-mono text-[#4A5160]">{step.subtitle}</span>
                  )}
                </div>
                <h3 className={cn('font-serif text-xl font-semibold', isDark ? 'text-white' : 'text-[#14181F]')}>
                  {step.title}
                </h3>
                <p className={cn('text-xs sm:text-sm leading-relaxed', isDark ? 'text-gray-300' : 'text-[#4A5160]')}>
                  {step.description}
                </p>

                {step.deliverables && (
                  <ul className="space-y-1.5 text-xs">
                    {step.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <Check size={13} className="text-white shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-gray-300' : 'text-[#4A5160]'}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="rounded-lg overflow-hidden border border-white/10">
                  {step.visualContent}
                </div>

                {step.actionLink && (
                  <div className="pt-2">
                    <Link
                      href={step.actionLink.href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-neutral-300"
                    >
                      <span>{step.actionLink.label}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const stepCount = steps.length;

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative border-b',
        isDark
          ? 'bg-[#05070B] border-white/10 text-white'
          : isSand
          ? 'bg-[#F6F7F9] border-[#E4E7EC]'
          : 'bg-white border-[#E4E7EC]',
        className
      )}
      style={{ height: `${Math.max(stepCount * 80, 220)}vh` }}
    >
      <div className="sticky top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-hidden flex flex-col justify-center">
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Section Header */}
          {(eyebrow || headline || description) && (
            <div className="max-w-3xl mb-6 space-y-1.5 text-left">
              {eyebrow && (
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {eyebrow}
                </div>
              )}
              {headline && (
                <h2
                  className={cn(
                    'font-serif text-2xl sm:text-3xl lg:text-[36px] font-semibold tracking-tight leading-tight',
                    isDark ? 'text-white' : 'text-[#14181F]'
                  )}
                >
                  {headline}
                </h2>
              )}
              {description && (
                <p className={cn('text-xs sm:text-sm leading-relaxed max-w-2xl', isDark ? 'text-gray-300' : 'text-[#4A5160]')}>
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Scrollytelling Pinned Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 relative h-[380px] sm:h-[420px] lg:h-[440px]">
              {steps.map((step, idx) => (
                <StepTextContent
                  key={step.id}
                  step={step}
                  index={idx}
                  totalSteps={stepCount}
                  smoothProgress={smoothProgress}
                  isDark={isDark}
                />
              ))}
            </div>

            {/* Right Visual Deck Column */}
            <div className="lg:col-span-6 relative h-[380px] sm:h-[420px] lg:h-[440px]">
              {steps.map((step, idx) => (
                <StepVisualContent
                  key={`visual-${step.id}`}
                  step={step}
                  index={idx}
                  totalSteps={stepCount}
                  smoothProgress={smoothProgress}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
