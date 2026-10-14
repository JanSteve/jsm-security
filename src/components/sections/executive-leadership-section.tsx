'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  Cpu, 
  PhoneCall, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { brandData } from '@/data/brand';

interface ExecutiveLeadershipSectionProps {
  showTitle?: boolean;
  className?: string;
  darkTheme?: boolean;
}

export function ExecutiveLeadershipSection({
  showTitle = true,
  className = '',
  darkTheme = true,
}: ExecutiveLeadershipSectionProps) {
  const leadershipList = brandData.leadership;

  const getRoleIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />;
      case 1:
        return <Award className="w-3.5 h-3.5 text-cyan-400" />;
      case 2:
        return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  const getWhatsAppMessage = (name: string, role: string) => {
    return encodeURIComponent(
      `Hello ${name} (${role}), I am reaching out through the JSM Integrated Services official website regarding an enterprise inquiry.`
    );
  };

  return (
    <section 
      id="executive-leadership"
      className={`py-12 sm:py-16 relative overflow-hidden bg-[#030712] text-white border-y border-cyan-500/20 ${className}`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        {showTitle && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[11px] font-semibold tracking-wide font-mono">
                <Award size={12} className="text-cyan-400" />
                <span>Executive Governance &bull; Direct Accountability</span>
              </div>

              <h2 className={`font-sans font-bold tracking-tight text-white text-2xl sm:text-3xl lg:text-4xl ${
                darkTheme ? 'text-white' : 'text-[#14181F]'
              }`}>
                Executive Leadership &amp; Operational Command
              </h2>

              <p className={`text-xs sm:text-sm ${
                darkTheme ? 'text-neutral-300' : 'text-[#4A5160]'
              }`}>
                Direct executive governance: founded by Sweety J, field-commanded by Major AR Devadoss, and engineered by CTO R Jan Steve Daniel.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors shrink-0 underline underline-offset-4 min-h-[44px]"
            >
              <span>Corporate Dossier</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        )}

        {/* 3-Column Executive Portrait Grid — Streamlined, Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {leadershipList.map((leader, idx) => {
            const isCenterFounder = idx === 1; // Sweety J (Proprietor & MD)
            const waHref = `https://wa.me/${brandData.contact.whatsapp}?text=${getWhatsAppMessage(leader.name, leader.role)}`;

            return (
              <article
                key={leader.name}
                className={`flex flex-col justify-between rounded-xl overflow-hidden transition-all duration-200 border ${
                  isCenterFounder
                    ? 'bg-[#090E1A] border-cyan-500/40 shadow-[0_0_35px_rgba(14,165,233,0.18)]'
                    : 'tactical-glass-card hover:border-cyan-400/40 shadow-lg'
                }`}
              >
                {/* Compact Portrait Media Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black group">
                  <Image
                    src={leader.image}
                    alt={`${leader.name} - ${leader.role}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    priority={idx < 3}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-black/40 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-500/30 text-[10px] font-medium text-cyan-200">
                      {getRoleIcon(idx)}
                      <span>{leader.qualification}</span>
                    </span>

                    {isCenterFounder && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-cyan-400 text-black shadow-[0_0_10px_#38BDF8]">
                        Founder &amp; MD
                      </span>
                    )}
                  </div>

                  {/* Bottom Identity Overlay */}
                  <div className="absolute bottom-2 left-3 right-3 pointer-events-none text-left">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/80 font-semibold truncate">
                      {leader.role}
                    </div>
                    <h3 className="font-sans font-bold tracking-tight text-white text-lg sm:text-xl drop-shadow-md">
                      {leader.name}
                    </h3>
                  </div>
                </div>

                {/* Decongested Body — Fact Bullets Only */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                  {/* Key Highlights Bullet Pills */}
                  {leader.highlights && leader.highlights.length > 0 && (
                    <ul className="space-y-2">
                      {leader.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Quick Direct Actions with 44px min-height */}
                  <div className="pt-3 border-t border-cyan-500/20 flex items-center gap-2">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] transition-all"
                      aria-label={`Send direct WhatsApp message to ${leader.name}`}
                    >
                      <MessageSquare size={14} />
                      <span>Direct Desk</span>
                    </a>

                    <a
                      href={`tel:${brandData.contact.phone}`}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 transition-all"
                      title="Call Desk"
                      aria-label={`Call ${leader.name}`}
                    >
                      <PhoneCall size={14} className="text-cyan-400" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
