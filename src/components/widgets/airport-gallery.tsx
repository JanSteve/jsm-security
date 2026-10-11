'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Plane, 
  Award, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Maximize2,
  Building2,
  Moon,
  Users
} from 'lucide-react';
import { PerspectiveTiltCard } from '@/components/motion/perspective-tilt-card';
import { KineticTypography } from '@/components/motion/kinetic-typography';

export interface AirportPhotoItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: 'mustering' | 'terminal' | 'checkpoints' | 'night' | 'facility';
  categoryLabel: string;
  tag: string;
  aspect: 'landscape' | 'portrait';
  timeOfDay?: string;
}

const airportPhotos: AirportPhotoItem[] = [
  {
    id: 'platoon-day',
    src: '/images/trichy-airport/trichy_airport_platoon_salute_day.jpg',
    title: 'Full Platoon Shift Muster Salute',
    caption: '8 Ex-Servicemen security marshals in crisp military turnout standing in rank formation, executing morning muster turnout salute at Tiruchirappalli International Airport.',
    category: 'mustering',
    categoryLabel: 'Platoon Muster',
    tag: '05:00 AM Muster',
    aspect: 'landscape',
    timeOfDay: 'Morning Shift'
  },
  {
    id: 'national-flag-salute',
    src: '/images/trichy-airport/trichy_airport_platoon_national_flag.jpg',
    title: 'Tricolour Flag Platoon Inspection',
    caption: 'JSM security detachment lined up under the Indian National Flag on the airport approach road, verified by tactical supervisory officers.',
    category: 'mustering',
    categoryLabel: 'Platoon Muster',
    tag: 'National Flag Drill',
    aspect: 'landscape',
    timeOfDay: 'Day Muster'
  },
  {
    id: 'night-platoon-muster',
    src: '/images/trichy-airport/trichy_airport_night_platoon_muster.jpg',
    title: 'Night Shift Muster & Logbook Turnout',
    caption: '10-marshal night patrol squad assembled under floodlights with official attendance logbook, verifying uniform turnout before taking 10:00 PM terminal guard posts.',
    category: 'night',
    categoryLabel: 'Night Shift',
    tag: '22:00 Night Roll Call',
    aspect: 'landscape',
    timeOfDay: 'Night Shift'
  },
  {
    id: 'concourse-facade',
    src: '/images/trichy-airport/trichy_airport_terminal_concourse_facade.jpg',
    title: 'International Concourse Architecture',
    caption: 'Pristine view of the soaring glass facade, cantilever steel truss canopy, and AAI queue barrier infrastructure at the newly commissioned Tiruchirappalli International Terminal.',
    category: 'terminal',
    categoryLabel: 'Terminal Concourse',
    tag: 'Terminal Architecture',
    aspect: 'landscape',
    timeOfDay: 'Daytime'
  },
  {
    id: 'concourse-autoscrubber',
    src: '/images/trichy-airport/trichy_airport_concourse_autoscrubber_cleaning.jpg',
    title: 'Mechanized Facility Operations & AAI Barricades',
    caption: 'Industrial walk-behind auto-scrubber polishing the concourse granite floor in front of the traditional temple chariot gopuram wall and official Airports Authority of India barricades.',
    category: 'facility',
    categoryLabel: 'Facility Operations',
    tag: 'Mechanized Housekeeping',
    aspect: 'landscape',
    timeOfDay: 'Continuous Operations'
  },
  {
    id: 'aai-welcome-arch',
    src: '/images/trichy-airport/trichy_airport_aai_welcome_portal.jpg',
    title: 'Airports Authority of India (AAI) Welcome Portal',
    caption: 'Official AAI blue highway portal displaying the AAI emblem and "Airports Authority of India • Welcome to Tiruchirappalli", marking the primary access threshold.',
    category: 'terminal',
    categoryLabel: 'Terminal Concourse',
    tag: 'AAI Highway Portal',
    aspect: 'landscape',
    timeOfDay: 'Daytime'
  },
  {
    id: 'commander-concourse-salute',
    src: '/images/trichy-airport/trichy_airport_concourse_commander_salute.jpg',
    title: 'Concourse Security Commander Sentry',
    caption: 'JSM uniformed security commander in decorated service regalia saluting inside the polished international passenger concourse, flanked by glass curtain walls.',
    category: 'checkpoints',
    categoryLabel: 'Access Checkpoints',
    tag: 'Passenger Terminal Concourse',
    aspect: 'portrait',
    timeOfDay: 'Night Patrol'
  },
  {
    id: 'twilight-muster',
    src: '/images/trichy-airport/trichy_airport_twilight_muster_salute.jpg',
    title: 'Twilight Rotation Shift Muster',
    caption: 'Evening change of guard with sunset sky over Trichy airport approach highway, enforcing zero-defect shift handover protocols.',
    category: 'mustering',
    categoryLabel: 'Platoon Muster',
    tag: 'Twilight Change of Guard',
    aspect: 'landscape',
    timeOfDay: '18:00 Twilight'
  },
  {
    id: 'night-sentry-post',
    src: '/images/trichy-airport/trichy_airport_night_security_post.jpg',
    title: 'Night Perimeter Sentry Post',
    caption: 'Security sentry standing guard on the airport access avenue at night with the brightly illuminated new terminal flyover spanning the background.',
    category: 'night',
    categoryLabel: 'Night Shift',
    tag: 'Illuminated Flyover Post',
    aspect: 'portrait',
    timeOfDay: '02:00 AM Night Post'
  },
  {
    id: 'airside-architecture',
    src: '/images/trichy-airport/trichy_airport_airside_terminal_architecture.jpg',
    title: 'Airside Tarmac & Aerobridge Infrastructure',
    caption: 'Exterior airside tarmac view of the international terminal\'s sweeping curved roof, aerobridge walkways, and specialized maintenance machinery on site.',
    category: 'terminal',
    categoryLabel: 'Terminal Concourse',
    tag: 'Airside Tarmac',
    aspect: 'landscape',
    timeOfDay: 'Daytime'
  },
  {
    id: 'boom-barrier-salute',
    src: '/images/trichy-airport/trichy_airport_barrier_checkpoint_salute.jpg',
    title: 'Vehicle Boom Barrier Access Control',
    caption: 'JSM marshal standing sentry at the vehicle boom barrier checkpoint regulating vehicle entry into airport operational areas.',
    category: 'checkpoints',
    categoryLabel: 'Access Checkpoints',
    tag: 'Boom Barrier Access Gate',
    aspect: 'portrait',
    timeOfDay: 'Day Post'
  },
  {
    id: 'entrance-marshal-salute',
    src: '/images/trichy-airport/trichy_airport_entrance_marshal_salute.jpg',
    title: 'AAI Airport Highway Entrance Sentry',
    caption: 'Uniformed marshal saluting at the airport entrance with the Airports Authority of India highway portal spanning in the background.',
    category: 'checkpoints',
    categoryLabel: 'Access Checkpoints',
    tag: 'Main Entrance Sentry',
    aspect: 'portrait',
    timeOfDay: 'Day Post'
  },
  {
    id: 'mirror-finish-concourse',
    src: '/images/trichy-airport/trichy_airport_concourse_polished_granite.jpg',
    title: 'Mirror-Finish Concourse Granite Standards',
    caption: 'Spotless reflection across the expansive international terminal concourse floor, maintained to global civil aviation cleanliness standards.',
    category: 'facility',
    categoryLabel: 'Facility Operations',
    tag: '5-Star Concourse Finish',
    aspect: 'portrait',
    timeOfDay: 'Daytime'
  }
];

interface AirportGalleryProps {
  className?: string;
  compact?: boolean;
}

export function AirportGallery({ className = '', compact = false }: AirportGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { key: 'all', label: 'All Operations (13)', icon: Sparkles },
    { key: 'mustering', label: 'Platoon Musters', icon: Users },
    { key: 'terminal', label: 'Terminal Architecture', icon: Building2 },
    { key: 'checkpoints', label: 'Access Checkpoints', icon: ShieldCheck },
    { key: 'night', label: 'Night Shift Sentry', icon: Moon },
    { key: 'facility', label: 'Mechanized Facility', icon: Award },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? airportPhotos
    : airportPhotos.filter(p => p.category === activeCategory);

  const currentLightboxPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section 
      id="trichy-airport-gallery" 
      className={`relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-white text-[#14181F] ${className}`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header with Official AAI Client Endorsement Badge */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pb-4 border-b border-[#E4E7EC]">
          <div className="max-w-3xl space-y-4 text-left">
            {/* Happy Customer AAI Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0F2A47]/8 border border-[#0F2A47]/15 text-[#0F2A47] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Happy Institutional Client &bull; Airports Authority of India (AAI)</span>
            </div>

            <KineticTypography
              as="h2"
              text="Tiruchirappalli International Airport Concourse Contract"
              className="font-serif text-2xl sm:text-3xl lg:text-[40px] leading-[1.18] font-bold tracking-tight text-[#14181F]"
            />

            <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed">
              Curated photographic documentation from our landmark 2024 deployment. Filtered from 670+ daily shift inspection records to showcase real platoon musters, AAI access portals, and mechanized facility maintenance.
            </p>
          </div>

          {/* Official AAI Client Card */}
          <div className="w-full lg:w-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F8F9FA] to-[#EDF1F7] border border-[#D0D7E2] shadow-sm flex items-center gap-4 shrink-0">
            <div className="relative w-16 h-12 rounded-lg bg-white border border-[#D0D7E2] p-1 flex items-center justify-center shrink-0 shadow-xs">
              <Image
                src="/images/clients/aai_logo.svg"
                alt="Airports Authority of India Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="text-left space-y-0.5">
              <div className="text-xs font-bold text-[#0F2A47] uppercase tracking-wide">
                Airports Authority of India (AAI)
              </div>
              <div className="text-[11px] text-[#4A5160]">
                Institutional Client &bull; Ministry of Civil Aviation
              </div>
              <div className="text-[11px] font-semibold text-[#9C7A3C] flex items-center gap-1">
                <span>100% SLA Adherence &bull; Zero Breaches</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Category Tabs — Generous spacing, accessible tap targets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.key);
                  setLightboxIndex(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all press-scale shrink-0 snap-start min-h-[44px] ${
                  isActive
                    ? 'bg-[#0F2A47] text-white shadow-md'
                    : 'bg-[#F4F6F8] text-[#4A5160] hover:bg-[#E8EDF2] hover:text-[#14181F] border border-[#E4E7EC]'
                }`}
              >
                <Icon size={15} className={isActive ? 'text-[#D4AF37]' : 'text-[#5A6578]'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Spacious Photo Grid (Decongested Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredPhotos.map((photo, idx) => {
            return (
              <PerspectiveTiltCard
                key={photo.id}
                maxTilt={5}
                scaleOnHover={1.015}
                spotlightColor="rgba(156, 122, 60, 0.15)"
                className="h-full"
              >
                <article
                  onClick={() => setLightboxIndex(idx)}
                  className="group cursor-pointer h-full flex flex-col justify-between rounded-2xl overflow-hidden bg-white border border-[#E4E7EC] hover:border-[#9C7A3C]/60 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Photo Media Frame with Generous Proportions */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay for Crisp Metadata Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Inset Tag */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white shadow-sm">
                        <Clock size={12} className="text-[#D4AF37]" />
                        <span>{photo.tag}</span>
                      </span>

                      <span className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={13} />
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 pointer-events-none text-left">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                        {photo.categoryLabel}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white tracking-tight leading-snug drop-shadow-sm">
                        {photo.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Caption with generous whitespace */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 text-left">
                    <p className="text-xs sm:text-sm text-[#4A5160] leading-relaxed line-clamp-3">
                      {photo.caption}
                    </p>

                    <div className="pt-3 border-t border-[#E4E7EC] flex items-center justify-between text-xs text-[#5A6578]">
                      <span className="font-mono text-[11px] text-[#0F2A47] font-semibold">
                        Trichy International Terminal
                      </span>
                      <span className="text-[#9C7A3C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Inspect Full High-Res</span>
                        <ExternalLink size={12} />
                      </span>
                    </div>
                  </div>
                </article>
              </PerspectiveTiltCard>
            );
          })}
        </div>

        {/* Decongested Verification Footer */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F8F9FA] border border-[#E4E7EC] flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <div className="font-serif text-lg sm:text-xl font-bold text-[#14181F]">
              Comprehensive Contract Case Study Available
            </div>
            <p className="text-xs sm:text-sm text-[#4A5160] max-w-2xl leading-relaxed">
              Read the complete operational case study detailing our 24/7 rotational muster, Bureau of Civil Aviation Security (BCAS) compliance, and zero-defect audit record for the Airports Authority of India.
            </p>
          </div>

          <a
            href="/case-studies/trichy-international-airport"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#0F2A47] hover:bg-[#1A3D63] text-white transition-all shadow-sm shrink-0 press-scale"
          >
            <span>Read Trichy Airport Case Study</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Interactive Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && currentLightboxPhoto && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all"
            aria-label="Close Lightbox"
          >
            <X size={22} />
          </button>

          {/* Prev / Next Controls */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all"
            aria-label="Previous Photo"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all"
            aria-label="Next Photo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Modal Content Box */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-[#0B0F17] border border-white/15 text-white shadow-2xl"
          >
            {/* Expanded Photo Container */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <Image
                src={currentLightboxPhoto.src}
                alt={currentLightboxPhoto.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Metadata Caption */}
            <div className="p-5 sm:p-6 bg-[#0E1522] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
              <div className="space-y-1 max-w-3xl">
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="font-mono uppercase font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.5 rounded">
                    {currentLightboxPhoto.tag}
                  </span>
                  <span className="text-neutral-400">
                    {currentLightboxPhoto.categoryLabel} &bull; Trichy International Airport (2024)
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  {currentLightboxPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {currentLightboxPhoto.caption}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="text-xs text-neutral-400 font-mono">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
