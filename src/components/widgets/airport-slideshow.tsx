'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, ShieldCheck, ArrowRight, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SlideItem {
  id: string;
  src: string;
  title: string;
  tag: string;
  location: string;
}

const slides: SlideItem[] = [
  {
    id: 'platoon-day',
    src: '/images/trichy-airport/trichy_airport_platoon_salute_day.jpg',
    title: 'Morning Platoon Shift Muster & Armed Forces Regalia',
    tag: '05:00 AM Muster',
    location: 'Trichy International Airport'
  },
  {
    id: 'national-flag-salute',
    src: '/images/trichy-airport/trichy_airport_platoon_national_flag.jpg',
    title: 'Tricolour National Flag Platoon Inspection',
    tag: 'National Flag Drill',
    location: 'Airport Approach Avenue'
  },
  {
    id: 'night-platoon-muster',
    src: '/images/trichy-airport/trichy_airport_night_platoon_muster.jpg',
    title: 'Night Shift Guard Muster & Attendance Logbook Verification',
    tag: '22:00 Night Roll Call',
    location: 'Concourse Apron'
  },
  {
    id: 'concourse-facade',
    src: '/images/trichy-airport/trichy_airport_terminal_concourse_facade.jpg',
    title: 'International Concourse Cantilever & AAI Perimeter',
    tag: 'Civil Aviation Terminal',
    location: 'Passenger Concourse'
  },
  {
    id: 'concourse-autoscrubber',
    src: '/images/trichy-airport/trichy_airport_concourse_autoscrubber_cleaning.jpg',
    title: 'Mechanized Granite Floor Auto-Scrubber & AAI Queue Barriers',
    tag: 'Mechanized Facility Ops',
    location: 'Departure Concourse'
  },
  {
    id: 'aai-welcome-arch',
    src: '/images/trichy-airport/trichy_airport_aai_welcome_portal.jpg',
    title: 'Airports Authority of India (AAI) Official Gateway Portal',
    tag: 'AAI Highway Portal',
    location: 'Access Gateway'
  },
  {
    id: 'commander-concourse-salute',
    src: '/images/trichy-airport/trichy_airport_concourse_commander_salute.jpg',
    title: 'Concourse Security Commander Sentry in Decorated Uniform',
    tag: 'Terminal Access Control',
    location: 'International Concourse'
  },
  {
    id: 'twilight-muster',
    src: '/images/trichy-airport/trichy_airport_twilight_muster_salute.jpg',
    title: 'Twilight Rotation Shift Handover & Zero-Defect Post Turnout',
    tag: '18:00 Twilight Handover',
    location: 'Approach Highway'
  },
  {
    id: 'night-sentry-post',
    src: '/images/trichy-airport/trichy_airport_night_security_post.jpg',
    title: '02:00 AM Night Perimeter Sentry Post & Illuminated Flyover',
    tag: '02:00 AM Night Sentry',
    location: 'Terminal Flyover Post'
  },
  {
    id: 'airside-architecture',
    src: '/images/trichy-airport/trichy_airport_airside_terminal_architecture.jpg',
    title: 'Airside Tarmac, Curved Canopy & Aerobridge Infrastructure',
    tag: 'Airside Operations',
    location: 'International Tarmac'
  },
  {
    id: 'barrier-checkpoint',
    src: '/images/trichy-airport/trichy_airport_barrier_checkpoint_salute.jpg',
    title: 'Perimeter Barrier Checkpoint & Sentry Access Control',
    tag: 'Access Barrier Sentry',
    location: 'Airport Approach Checkpoint'
  },
  {
    id: 'entrance-marshal',
    src: '/images/trichy-airport/trichy_airport_entrance_marshal_salute.jpg',
    title: 'Terminal Entrance Marshal Sentry & Passenger Greeting',
    tag: 'Terminal Marshal Salute',
    location: 'Main Concourse Entrance'
  },
  {
    id: 'concourse-granite',
    src: '/images/trichy-airport/trichy_airport_concourse_polished_granite.jpg',
    title: 'Pristine Polished Granite Floor & Glass Concourse Architecture',
    tag: 'Civil Aviation Facility',
    location: 'International Departure Floor'
  }
];

export interface AirportOperationsSlideshowProps {
  className?: string;
  autoPlayIntervalMs?: number;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.99,
    transition: {
      duration: 0.45,
      ease: "easeInOut" as const,
    },
  }),
};

export function AirportOperationsSlideshow({ 
  className = '',
  autoPlayIntervalMs = 3500 // Comfortable 3.5 seconds timing
}: AirportOperationsSlideshowProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement | null>(null);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Smooth auto-scroll timer (3.5s interval)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, autoPlayIntervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, autoPlayIntervalMs, handleNext]);

  // Keep active thumbnail smoothly visible in viewport
  useEffect(() => {
    if (activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [currentIndex]);

  const activeSlide = slides[currentIndex];

  return (
    <section className={cn("py-8 sm:py-10 bg-black border-y border-white/10 text-white", className)}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Header Bar — Compact, Action-Oriented */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Live Operations Slideshow &bull; Trichy International Airport (AAI)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300 tabular-nums">
              {currentIndex + 1} / {slides.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors"
              title={isPaused ? "Resume auto-advance (3.5s)" : "Pause auto-advance"}
            >
              {isPaused ? <Play size={10} className="text-white" /> : <Pause size={10} className="text-white" />}
              <span>{isPaused ? "Paused" : "Auto (3.5s)"}</span>
            </button>

            <Link
              href="/case-studies/trichy-international-airport"
              className="inline-flex items-center gap-1.5 text-xs text-white hover:text-neutral-300 font-semibold transition-colors ml-2"
            >
              <span>View Case Study</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Slideshow Banner — Real-time interactive drag + cinematic crossfade */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] rounded-xl overflow-hidden bg-[#080C14] border border-white/15 shadow-2xl select-none"
        >
          {/* Draggable Motion Track with Real-time spring feedback */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={(_, info) => {
              setIsPaused(false);
              if (info.offset.x < -40 || info.velocity.x < -250) {
                handleNext();
              } else if (info.offset.x > 40 || info.velocity.x > 250) {
                handlePrev();
              }
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing relative"
          >
            {/* Cinematic Directional Crossfade Slide */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 select-none pointer-events-none"
              >
                <Image
                  src={activeSlide.src}
                  alt={activeSlide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1280px"
                  priority={currentIndex < 2}
                  draggable={false}
                  className="object-cover object-center select-none"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlays for pristine legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

            {/* Top Left Badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white shadow-lg">
                <Plane size={11} className="text-white" />
                <span>{activeSlide.tag}</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono text-neutral-300">
                <ShieldCheck size={11} />
                <span>{activeSlide.location}</span>
              </span>
            </div>

            {/* Bottom Title Bar & Navigation Controls */}
            <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-10 flex items-end justify-between gap-4 pointer-events-none">
              <div className="space-y-0.5 max-w-2xl text-left">
                <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold text-white tracking-tight drop-shadow-md">
                  {activeSlide.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-300 drop-shadow line-clamp-1">
                  Airports Authority of India Concourse Security &bull; Tiruchirappalli International Airport &bull; Supervised by Major AR Devadoss
                </p>
              </div>

              {/* Manual Nav Controls */}
              <div className="flex items-center gap-1.5 pointer-events-auto shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="w-8 h-8 rounded-full bg-black/75 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center transition-all shadow-lg active:scale-95"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="w-8 h-8 rounded-full bg-black/75 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center transition-all shadow-lg active:scale-95"
                  aria-label="Next photo"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Top Progress Bar Ticker — Smooth 3.5s Animation */}
          <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-20 pointer-events-none">
            <div 
              key={`${currentIndex}-${isPaused ? 'paused' : 'running'}`}
              className={cn(
                "h-full bg-white transition-all",
                !isPaused && "duration-[3500ms] ease-linear w-full",
                isPaused && "w-0"
              )}
              style={{ width: isPaused ? '0%' : '100%' }}
            />
          </div>
        </div>

        {/* Thumbnail Carousel Track — Smooth horizontal scroll */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {slides.map((s, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={s.id}
                ref={isActive ? activeThumbnailRef : null}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={cn(
                  "relative w-16 h-11 sm:w-20 sm:h-13 shrink-0 rounded-lg overflow-hidden border transition-all duration-300",
                  isActive
                    ? "border-white ring-2 ring-white/50 opacity-100 scale-105 shadow-md"
                    : "border-white/15 opacity-40 hover:opacity-80"
                )}
                title={s.title}
                aria-label={`Go to slide ${idx + 1}: ${s.title}`}
              >
                <Image
                  src={s.src}
                  alt={s.title}
                  fill
                  sizes="100px"
                  draggable={false}
                  className="object-cover pointer-events-none"
                />
                <span className="absolute bottom-0.5 right-1 text-[9px] font-mono text-white/90 drop-shadow">
                  {idx + 1}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
