'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, ShieldCheck, ArrowRight, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OperationalPillar {
  id: string;
  number: string;
  shortLabel: string;
  title: string;
  tag: string;
  location: string;
  description: string;
  src: string;
}

// 5 Curated Operational Pillars (Apple / Stripe Calibrated 3.0s Auto-Crossfade)
export const OPERATIONAL_PILLARS: OperationalPillar[] = [
  {
    id: '01-muster',
    number: '01',
    shortLabel: 'MUSTER',
    title: 'Morning Platoon Shift Muster & Armed Forces Regalia',
    tag: '05:00 AM Muster',
    location: 'Trichy International Airport',
    description: 'Daily turnout inspections and military-standard drill conducted under Indian Army ESM command.',
    src: '/images/trichy-airport/trichy_airport_platoon_salute_day.jpg',
  },
  {
    id: '02-concourse',
    number: '02',
    shortLabel: 'CONCOURSE',
    title: 'International Concourse Security & Access Sentry',
    tag: 'Terminal Access Control',
    location: 'International Departure Concourse',
    description: 'Stationed sentries commanding access gates, passenger flow lanes, and VIP security cordons.',
    src: '/images/trichy-airport/trichy_airport_concourse_commander_salute.jpg',
  },
  {
    id: '03-mechanized',
    number: '03',
    shortLabel: 'MECHANIZED',
    title: 'Mechanized Granite Auto-Scrubber & Facility Operations',
    tag: 'Mechanized Facility Ops',
    location: 'Passenger Concourse Apron',
    description: 'High-speed industrial ride-on and walk-behind scrubbers maintaining spotless international terminal granite.',
    src: '/images/trichy-airport/trichy_airport_concourse_autoscrubber_cleaning.jpg',
  },
  {
    id: '04-night-patrol',
    number: '04',
    shortLabel: 'NIGHT PATROL',
    title: '02:00 AM Night Perimeter Sentry & Illuminated Flyover Post',
    tag: '02:00 AM Night Sentry',
    location: 'Terminal Flyover Post',
    description: 'Continuous 24/7 vigil with unscheduled 02:00 AM surprise night inspections by Major AR Devadoss.',
    src: '/images/trichy-airport/trichy_airport_night_security_post.jpg',
  },
  {
    id: '05-aai-gateway',
    number: '05',
    shortLabel: 'AAI GATEWAY',
    title: 'Official AAI Gateway Portal Drill & National Flag Inspection',
    tag: 'National Flag Drill',
    location: 'Access Gateway & Approach Avenue',
    description: 'Official AAI portal sentry post and national tricolour ceremonial guard salute.',
    src: '/images/trichy-airport/trichy_airport_platoon_national_flag.jpg',
  },
];

// Backwards-compatible alias for existing imports
export const slides = OPERATIONAL_PILLARS;
export type SlideItem = OperationalPillar;

// Complete 13-Item Photographic Archive for Dossier & Asset Integrity Verification
export const AIRPORT_OPERATIONS_ARCHIVE = [
  { id: 'muster-day', src: '/images/trichy-airport/trichy_airport_platoon_salute_day.jpg' },
  { id: 'flag-salute', src: '/images/trichy-airport/trichy_airport_platoon_national_flag.jpg' },
  { id: 'night-muster', src: '/images/trichy-airport/trichy_airport_night_platoon_muster.jpg' },
  { id: 'concourse-facade', src: '/images/trichy-airport/trichy_airport_terminal_concourse_facade.jpg' },
  { id: 'autoscrubber', src: '/images/trichy-airport/trichy_airport_concourse_autoscrubber_cleaning.jpg' },
  { id: 'welcome-arch', src: '/images/trichy-airport/trichy_airport_aai_welcome_portal.jpg' },
  { id: 'commander-salute', src: '/images/trichy-airport/trichy_airport_concourse_commander_salute.jpg' },
  { id: 'twilight-muster', src: '/images/trichy-airport/trichy_airport_twilight_muster_salute.jpg' },
  { id: 'night-post', src: '/images/trichy-airport/trichy_airport_night_security_post.jpg' },
  { id: 'airside', src: '/images/trichy-airport/trichy_airport_airside_terminal_architecture.jpg' },
  { id: 'barrier', src: '/images/trichy-airport/trichy_airport_barrier_checkpoint_salute.jpg' },
  { id: 'entrance', src: '/images/trichy-airport/trichy_airport_entrance_marshal_salute.jpg' },
  { id: 'granite', src: '/images/trichy-airport/trichy_airport_concourse_polished_granite.jpg' },
];

export interface AirportOperationsSlideshowProps {
  className?: string;
  autoPlayIntervalMs?: number;
}

export function AirportOperationsSlideshow({ 
  className = '',
  autoPlayIntervalMs = 3000 // Apple/Stripe calibrated 3.0s interval
}: AirportOperationsSlideshowProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % OPERATIONAL_PILLARS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + OPERATIONAL_PILLARS.length) % OPERATIONAL_PILLARS.length);
  }, []);

  const goToSlide = useCallback((idx: number) => {
    setCurrentIndex(idx);
  }, []);

  // Calibrated 3.0s Auto-Advance Timer
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, autoPlayIntervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, autoPlayIntervalMs, handleNext, currentIndex]);

  const activePillar = OPERATIONAL_PILLARS[currentIndex];

  return (
    <section className={cn("py-8 sm:py-10 bg-[#030712] border-y border-cyan-500/20 text-white bg-security-grid", className)}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Header Bar — Minimalist, Institutional */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            {/* Concentric Radar Telemetry Pulse Dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#10B981]" />
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Operations Showcase &bull; Trichy International Airport (AAI)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080C16] border border-cyan-500/30 text-cyan-300 font-bold tabular-nums">
              0{currentIndex + 1} / 0{OPERATIONAL_PILLARS.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[44px] min-w-[44px] rounded-lg bg-[#080C16] hover:bg-cyan-950/30 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:text-white transition-colors cursor-pointer active:scale-95 shadow-[0_0_12px_rgba(14,165,233,0.15)]"
              title={isPaused ? "Resume auto-advance (3.0s)" : "Pause auto-advance"}
              aria-label={isPaused ? "Resume auto-advance (3.0s)" : "Pause auto-advance"}
            >
              {isPaused ? <Play size={12} className="text-white" /> : <Pause size={12} className="text-white" />}
              <span>{isPaused ? "Paused" : "Auto (3.0s)"}</span>
            </button>

            <Link
              href="/case-studies/trichy-international-airport"
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-xs text-white hover:text-cyan-300 font-semibold transition-colors ml-1"
            >
              <span>View Case Study</span>
              <ArrowRight size={13} className="text-cyan-400" />
            </Link>
          </div>
        </div>

        {/* Showcase Banner — Pure Apple/Stripe 3.0s Dissolve Crossfade (No Dragging Listeners) */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] rounded-xl overflow-hidden bg-[#080C16] border border-cyan-500/30 shadow-[0_0_40px_rgba(14,165,233,0.15)] select-none"
        >
          {/* Crossfade Image Layer */}
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 will-change-transform [transform:translate3d(0,0,0)]"
              >
                <Image
                  src={activePillar.src}
                  alt={activePillar.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1280px"
                  priority={currentIndex < 3}
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlays for High-Contrast Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

            {/* Top Left Pillar Badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#030712]/90 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono font-bold text-white shadow-[0_0_12px_rgba(14,165,233,0.2)]">
                <Plane size={11} className="text-cyan-400" />
                <span>{activePillar.tag}</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#080C16]/90 backdrop-blur-md border border-cyan-500/20 text-[10px] font-mono text-neutral-300">
                <ShieldCheck size={11} className="text-emerald-400" />
                <span>{activePillar.location}</span>
              </span>
            </div>

            {/* Bottom Title Bar & Navigation Chevron Controls */}
            <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-10 flex items-end justify-between gap-4 pointer-events-none">
              <div className="space-y-1 max-w-2xl text-left">
                <div className="inline-block text-[10px] font-mono uppercase tracking-wider text-cyan-400/80">
                  {activePillar.number} &bull; {activePillar.shortLabel}
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight drop-shadow-md">
                  {activePillar.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-300 drop-shadow line-clamp-1">
                  {activePillar.description}
                </p>
              </div>

              {/* Prev / Next Chevrons — Hardened to Minimum 44px */}
              <div className="flex items-center gap-2 pointer-events-auto shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-[#030712]/90 hover:bg-cyan-500 hover:text-black text-white border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(14,165,233,0.25)] active:scale-95 cursor-pointer"
                  aria-label="Previous operational pillar"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-[#030712]/90 hover:bg-cyan-500 hover:text-black text-white border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(14,165,233,0.25)] active:scale-95 cursor-pointer"
                  aria-label="Next operational pillar"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Segmented Progress Pills Navigation (Apple / Stripe Signature) */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 pt-1">
          {OPERATIONAL_PILLARS.map((pillar, idx) => {
            const isActive = idx === currentIndex;
            const isCompleted = idx < currentIndex;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={cn(
                  "group/pill flex flex-col justify-between p-2 sm:p-2.5 rounded-xl border text-left transition-all duration-200 min-h-[48px] min-w-[44px]",
                  isActive
                    ? "bg-cyan-500/15 border-cyan-400/60 shadow-[0_0_20px_rgba(14,165,233,0.25)]"
                    : "bg-[#080C16] hover:bg-[#0C1322] border-white/10 hover:border-cyan-500/30"
                )}
                aria-label={`Switch to pillar ${pillar.number}: ${pillar.title}`}
                aria-current={isActive ? 'true' : undefined}
              >
                {/* Linear Filling Progress Indicator with Cyan Glow */}
                <div className="h-1 sm:h-1.5 w-full rounded-full bg-white/10 overflow-hidden relative mb-1.5">
                  {isCompleted && (
                    <div className="h-full w-full bg-cyan-500/40 rounded-full" />
                  )}
                  {isActive && (
                    <motion.div
                      key={`progress-${currentIndex}-${isPaused ? 'paused' : 'running'}`}
                      initial={{ width: '0%' }}
                      animate={{ width: isPaused ? '0%' : '100%' }}
                      transition={{ duration: isPaused ? 0 : 3.0, ease: 'linear' }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-[#38BDF8] rounded-full shadow-[0_0_10px_#38BDF8]"
                    />
                  )}
                </div>

                {/* Pill Identifier & Micro-Copy */}
                <div className="flex items-center justify-between w-full">
                  <span className={cn(
                    "font-mono text-[10px] sm:text-xs font-bold transition-colors",
                    isActive ? "text-cyan-300" : "text-neutral-400 group-hover/pill:text-neutral-200"
                  )}>
                    <span className={isActive ? "text-cyan-400" : "opacity-60"}>{pillar.number}</span>{' '}
                    <span className="hidden sm:inline">{pillar.shortLabel}</span>
                    <span className="sm:hidden">{pillar.shortLabel.slice(0, 4)}</span>
                  </span>
                  <span className={cn(
                    "hidden md:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded",
                    isActive ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-semibold" : "text-neutral-500"
                  )}>
                    {pillar.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
