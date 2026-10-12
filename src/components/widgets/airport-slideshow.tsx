'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
}

export function AirportOperationsSlideshow({ className = '' }: AirportOperationsSlideshowProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 1000); // Advances automatically every 1.0 second

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 40) {
        // Swiped left
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      } else if (diff < -40) {
        // Swiped right
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

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
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? <Play size={10} /> : <Pause size={10} />}
              <span>{isPaused ? "Play (1.0s)" : "Auto (1.0s)"}</span>
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

        {/* Compact Slideshow Banner — Height capped at 260px to 320px with Touch Swipe */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] rounded-xl overflow-hidden bg-[#080C14] border border-white/15 shadow-2xl select-none group"
        >
          {/* Active Image */}
          <Image
            key={activeSlide.id}
            src={activeSlide.src}
            alt={activeSlide.title}
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            priority={currentIndex < 3}
            className="object-cover object-center transition-opacity duration-300"
          />

          {/* Vignette Overlay */}
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

          {/* Bottom Title Bar */}
          <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-10 flex items-end justify-between gap-4 pointer-events-none">
            <div className="space-y-0.5 max-w-2xl">
              <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold text-white tracking-tight drop-shadow-md">
                {activeSlide.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-300 drop-shadow line-clamp-1">
                Airports Authority of India Concourse Security &bull; Tiruchirappalli International Airport &bull; Supervised by Major AR Devadoss
              </p>
            </div>

            {/* Manual Controls */}
            <div className="flex items-center gap-1.5 pointer-events-auto shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-black/70 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center transition-all shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-black/70 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center transition-all shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Top Progress Bar Ticker */}
          <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-20">
            <div 
              key={currentIndex}
              className="h-full bg-white transition-all duration-1000 ease-linear"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="grid grid-cols-7 sm:grid-cols-13 gap-1.5 pt-1">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-9 sm:h-11 rounded overflow-hidden border transition-all ${
                idx === currentIndex
                  ? 'border-white ring-1 ring-white opacity-100 scale-105'
                  : 'border-white/15 opacity-50 hover:opacity-90'
              }`}
              title={s.title}
            >
              <Image
                src={s.src}
                alt={s.title}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
