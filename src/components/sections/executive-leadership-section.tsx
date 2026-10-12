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
  Mail, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { brandData } from '@/data/brand';
import { PerspectiveTiltCard } from '@/components/motion/perspective-tilt-card';
import { KineticTypography } from '@/components/motion/kinetic-typography';

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
        return <ShieldCheck className="w-4 h-4 text-white" />;
      case 1:
        return <Award className="w-4 h-4 text-white" />;
      case 2:
        return <Cpu className="w-4 h-4 text-white" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-white" />;
    }
  };

  const getWhatsAppMessage = (name: string, role: string) => {
    return encodeURIComponent(
      `Hello ${name} (${role}), I am reaching out through the JSM Integrated Services official website regarding an enterprise security / manpower / automation inquiry.`
    );
  };

  return (
    <section 
      id="executive-leadership"
      className={`py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-black text-white border-y border-white/10 ${className}`}
    >
      {/* Background Radial Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-white/5 via-neutral-900/30 to-transparent blur-3xl pointer-events-none rounded-full" 
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {showTitle && (
          <div className="max-w-3xl space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-wide font-mono">
              <Award size={14} className="text-white" />
              <span>Executive Governance &bull; Direct Operational Accountability</span>
            </div>

            <KineticTypography
              as="h2"
              text="The Executive Command Steering Ground Precision & Technology"
              className={`font-serif text-2xl sm:text-3xl lg:text-[40px] leading-[1.16] font-semibold tracking-tight ${
                darkTheme ? 'text-white' : 'text-[#14181F]'
              }`}
            />

            <p className={`text-sm sm:text-base leading-relaxed ${
              darkTheme ? 'text-neutral-300' : 'text-[#4A5160]'
            }`}>
              Direct executive accountability: founded by Sweety J, commanded in the field by Indian Army Veteran Major AR Devadoss, and engineered by CTO R Jan Steve Daniel.
            </p>
          </div>
        )}

        {/* 3-Column Executive Portrait Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {leadershipList.map((leader, idx) => {
            const isCenterFounder = idx === 1; // Sweety J (Proprietor & MD)
            const waHref = `https://wa.me/${brandData.contact.whatsapp}?text=${getWhatsAppMessage(leader.name, leader.role)}`;

            return (
              <PerspectiveTiltCard
                key={leader.name}
                maxTilt={6}
                scaleOnHover={1.015}
                spotlightColor="rgba(255, 255, 255, 0.12)"
                className="h-full"
              >
                <article
                  className={`h-full flex flex-col justify-between rounded-2xl overflow-hidden transition-all duration-300 border ${
                    isCenterFounder
                      ? 'bg-gradient-to-b from-[#0E1522] via-[#090D15] to-[#06090F] border-white/30 shadow-[0_12px_40px_rgba(255,255,255,0.05)] ring-1 ring-white/20'
                      : 'bg-gradient-to-b from-[#0B0F17] to-[#05080E] border-white/10 hover:border-white/30 shadow-xl'
                  }`}
                >
                  {/* Portrait Media Frame */}
                  <div className="relative aspect-square w-full overflow-hidden bg-black group">
                    <Image
                      src={leader.image}
                      alt={`${leader.name} - ${leader.role} at JSM Integrated Services`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={idx < 3}
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06090F] via-transparent to-black/30 pointer-events-none" />

                    {/* Top Inset Badge */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white shadow-md">
                        {getRoleIcon(idx)}
                        <span>{leader.qualification}</span>
                      </span>

                      {isCenterFounder && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-white text-black shadow-sm">
                          Founding MD
                        </span>
                      )}
                    </div>

                    {/* Bottom Floating Identity Bar */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 pointer-events-none">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-white font-semibold">
                        {leader.role}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm">
                        {leader.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5 text-left">
                    <div className="space-y-4">
                      {/* Officer Bio */}
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {leader.bio}
                      </p>

                      {/* Operational Focus */}
                      <div className="pt-2 border-t border-white/10 space-y-1.5">
                        <div className="text-[11px] font-mono text-white uppercase tracking-wider font-semibold">
                          Executive Focus &amp; Oversight
                        </div>
                        <p className="text-xs text-neutral-400 leading-snug">
                          {leader.focus}
                        </p>
                      </div>

                      {/* Key Highlights Bullet Pills */}
                      {leader.highlights && leader.highlights.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          {leader.highlights.map((item, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-[12px] text-neutral-300">
                              <CheckCircle2 size={13} className="text-white shrink-0 mt-0.5" />
                              <span className="leading-tight">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quick Direct Desk Actions */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <div className="flex items-center gap-2">
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] transition-all press-scale"
                          aria-label={`Send direct WhatsApp message to ${leader.name}`}
                        >
                          <MessageSquare size={13} />
                          <span>Direct Desk</span>
                          <ExternalLink size={10} className="opacity-70" />
                        </a>

                        <a
                          href={`tel:${brandData.contact.phone}`}
                          className="flex items-center justify-center p-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-200 transition-all press-scale"
                          title="Call Operations Desk"
                          aria-label={`Call operations desk for ${leader.name}`}
                        >
                          <PhoneCall size={14} className="text-white" />
                        </a>

                        <a
                          href={`mailto:${brandData.contact.email}?subject=Executive%20Inquiry%20for%20${encodeURIComponent(leader.name)}`}
                          className="flex items-center justify-center p-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-200 transition-all press-scale"
                          title="Send Email"
                          aria-label={`Email ${leader.name}`}
                        >
                          <Mail size={14} className="text-neutral-300" />
                        </a>
                      </div>

                      <div className="text-[10px] text-neutral-400 text-center flex items-center justify-center gap-1 pt-1 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Direct Leadership Accessibility &bull; Tiruchirappalli HQ</span>
                      </div>
                    </div>
                  </div>
                </article>
              </PerspectiveTiltCard>
            );
          })}
        </div>

        {/* Corporate Trust Footer Strip */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-300 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 font-bold">
              ✓
            </div>
            <div>
              <div className="font-semibold text-white">100% Verified Identity &amp; Statutory Executive Presence</div>
              <div className="text-neutral-400 text-[11px]">All contractual tenders, audits, and SLA agreements are approved directly by the named executive board.</div>
            </div>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-neutral-200 text-black transition-all shadow-xl shrink-0 press-scale font-bold"
          >
            <span>Read Corporate History &amp; Credentials</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
