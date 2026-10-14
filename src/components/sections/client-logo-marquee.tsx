'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Plane, 
  Landmark, 
  ShieldCheck, 
  BadgeCheck, 
  FileCheck, 
  Award, 
  CheckCircle2, 
  Factory, 
  Building2, 
  Cog, 
  Activity, 
  Shield 
} from 'lucide-react';

export interface TrustBadgeItem {
  id: string;
  name: string;
  category: string;
  detail: string;
  logoSrc?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badgeType: 'institutional' | 'statutory' | 'commercial';
}

export const TRUST_BADGES: TrustBadgeItem[] = [
  {
    id: 'aai',
    name: 'Airports Authority of India (AAI)',
    category: 'Institutional Concourse Client',
    detail: 'Trichy International Airport (2024)',
    logoSrc: '/images/clients/aai_logo.svg',
    icon: Plane,
    badgeType: 'institutional',
  },
  {
    id: 'moca',
    name: 'Ministry of Civil Aviation (MoCA)',
    category: 'Govt. of India Regulatory Body',
    detail: 'Civil Aviation Terminal Security',
    icon: Landmark,
    badgeType: 'institutional',
  },
  {
    id: 'dgr-army',
    name: 'Indian Army ESM Command (DGR / MoD)',
    category: 'Ex-Servicemen Field Leadership',
    detail: 'Directorate General Resettlement Cadre',
    icon: ShieldCheck,
    badgeType: 'statutory',
  },
  {
    id: 'tn-police',
    name: 'Tamil Nadu Police Verification',
    category: 'Home Department Verified',
    detail: '100% CID Background Cleared Force',
    icon: BadgeCheck,
    badgeType: 'statutory',
  },
  {
    id: 'psara-2005',
    name: 'PSARA 2005 Compliance',
    category: 'Statutory License',
    detail: 'Private Security Agencies Regulation Act',
    icon: FileCheck,
    badgeType: 'statutory',
  },
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015 Certification',
    category: 'Quality Management Systems',
    detail: 'Certified Security & Facility Operations',
    icon: Award,
    badgeType: 'statutory',
  },
  {
    id: 'epf-esic',
    name: '100% EPF & ESIC Statutory Compliance',
    category: 'Zero Client Liability',
    detail: 'Direct ECR Challan Bank Remittance',
    icon: CheckCircle2,
    badgeType: 'statutory',
  },
  {
    id: 'precision-auto',
    name: 'Precision Automotive Components (Hosur)',
    category: 'Automotive SEZ Industrial Hub',
    detail: 'SIPCOT Industrial Guard Deployment',
    icon: Factory,
    badgeType: 'commercial',
  },
  {
    id: 'ascent-tech',
    name: 'Ascent Global Tech Park (Chennai OMR)',
    category: 'IT Corridor & Technology SEZ',
    detail: 'Enterprise Concourse & Access Sentry',
    icon: Building2,
    badgeType: 'commercial',
  },
  {
    id: 'kongu-cluster',
    name: 'Kongu Engineering & Foundry Cluster (Coimbatore)',
    category: 'SIDCO Industrial SEZ',
    detail: 'Heavy Engineering Plant Protection',
    icon: Cog,
    badgeType: 'commercial',
  },
  {
    id: 'salem-health',
    name: 'Salem Specialty Healthcare Hospital',
    category: 'Healthcare Sanitation & Security',
    detail: 'Infection-Controlled Facility Operations',
    icon: Activity,
    badgeType: 'commercial',
  },
  {
    id: 'gem-vendor',
    name: 'Government e-Marketplace (GeM Central Vendor)',
    category: 'Central PSU Procurement',
    detail: 'Registered Direct Public Vendor',
    icon: Shield,
    badgeType: 'institutional',
  },
];

export interface ClientLogoMarqueeProps {
  className?: string;
  showTitle?: boolean;
}

export function ClientLogoMarquee({
  className = '',
  showTitle = true,
}: ClientLogoMarqueeProps) {
  const [isInteracting, setIsInteracting] = useState(false);

  // Duplicate badge list for continuous infinite wrapping with zero jumping
  const marqueeItems = [...TRUST_BADGES, ...TRUST_BADGES];

  return (
    <div className={`relative w-full overflow-hidden bg-[#030712] py-4 sm:py-6 border-y border-cyan-500/20 group select-none ${className}`}>
      {/* Scoped GPU-accelerated marquee keyframes and behavior */}
      <style>{`
        @keyframes jsm-marquee-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .jsm-marquee-track {
          display: flex;
          width: max-content;
          animation: jsm-marquee-scroll 45s linear infinite;
          will-change: transform;
        }
        .group:hover .jsm-marquee-track,
        .jsm-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .jsm-marquee-track {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>

      {/* Optional Section Kicker */}
      {showTitle && (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Institutional Clients & Statutory Accreditations
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest hidden sm:inline">
            Tactical Obsidian &bull; 100% Verified Regional Authority
          </span>
        </div>
      )}

      {/* Marquee Viewport with Bilateral Gradient Feathering */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left Bilateral Feathering Mask */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Right Bilateral Feathering Mask */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Continuous Infinite Ticker Track */}
        <div
          className="jsm-marquee-track"
          style={{
            animationPlayState: isInteracting ? 'paused' : undefined,
          }}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
        >
          {marqueeItems.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={`${badge.id}-${idx}`}
                className="flex items-center gap-3.5 px-4 sm:px-5 py-2.5 sm:py-3 mx-2 rounded-xl tactical-glass-card hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] backdrop-blur-md transition-all duration-200 shrink-0 shadow-lg group/item cursor-default text-white"
              >
                {/* Emblem / Logo Container */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center shrink-0 text-cyan-300 group-hover/item:bg-cyan-500/20 group-hover/item:border-cyan-400/40 transition-colors p-1.5 overflow-hidden">
                  {badge.logoSrc ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={badge.logoSrc}
                        alt={badge.name}
                        fill
                        sizes="40px"
                        className="object-contain filter brightness-200 contrast-125 grayscale"
                      />
                    </div>
                  ) : (
                    <Icon size={18} className="text-white group-hover/item:scale-105 transition-transform" />
                  )}
                </div>

                {/* Badge Typography */}
                <div className="space-y-0.5 text-left min-w-0 pr-1">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-tight whitespace-nowrap group-hover/item:text-white">
                    {badge.name}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 whitespace-nowrap">
                    <span className="text-neutral-300 font-semibold">{badge.category}</span>
                    <span className="text-neutral-600">&bull;</span>
                    <span className="text-neutral-400">{badge.detail}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
