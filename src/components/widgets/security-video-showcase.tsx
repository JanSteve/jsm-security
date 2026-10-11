'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Award, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Phone, 
  ArrowRight,
  Monitor,
  Smartphone,
  Eye,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { SoundWaveVisualizer } from './sound-wave-visualizer';

interface SecurityVideoShowcaseProps {
  className?: string;
  defaultMode?: 'ad' | 'storyboard';
}

export function SecurityVideoShowcase({
  className = '',
  defaultMode = 'ad'
}: SecurityVideoShowcaseProps) {
  const [activeMode, setActiveMode] = useState<'ad' | 'storyboard'>(defaultMode);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const adVideoRef = useRef<HTMLVideoElement>(null);
  const storyboardVideoRef = useRef<HTMLVideoElement>(null);

  const handleSwitchMode = (mode: 'ad' | 'storyboard') => {
    setActiveMode(mode);
    setIsPlaying(true);
    setTimeout(() => {
      const vid = mode === 'ad' ? adVideoRef.current : storyboardVideoRef.current;
      if (vid) {
        vid.muted = isMuted;
        vid.play().catch(() => {});
      }
    }, 100);
  };

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    const vid = activeMode === 'ad' ? adVideoRef.current : storyboardVideoRef.current;
    if (vid) {
      vid.muted = nextMuted;
      if (vid.paused) {
        vid.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    const vid = activeMode === 'ad' ? adVideoRef.current : storyboardVideoRef.current;
    if (vid) {
      if (vid.paused) {
        vid.play().catch(() => {});
        setIsPlaying(true);
      } else {
        vid.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = activeMode === 'ad' ? adVideoRef.current : storyboardVideoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`rounded-2xl bg-obsidian-mesh text-white p-6 sm:p-10 border border-[#9C7A3C]/35 border-gold-specular-top shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] space-y-8 relative overflow-hidden ${className}`}
    >
      {/* Decorative Military Gold Accent Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9C7A3C]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0F2A47]/45 rounded-full blur-2xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-white/10 pb-6">
        <div className="space-y-2.5 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9C7A3C]/20 border border-[#9C7A3C]/40 text-[#D4AF37] text-xs font-semibold tracking-wide">
            <ShieldCheck size={14} className="text-[#D4AF37]" />
            <span>Official Brand Film &bull; Military-Grade Security Operations</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-semibold tracking-tight">
            See the JSM Standard in Action
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Led by Managing Director <strong className="text-white">Sweety J</strong>, Operations Director Army-Veteran <strong className="text-white">Major AR Devadoss</strong>, and Executive Director <strong className="text-white">R Jan Steve Daniel</strong>. We deploy disciplined security platoons, verified industrial manpower, and commercial facility management across Tamil Nadu.
          </p>

          {/* Executive Leadership Avatars */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex -space-x-2.5 overflow-hidden">
              <div className="relative w-8 h-8 rounded-full border-2 border-[#071728] overflow-hidden bg-black shrink-0" title="Major AR Devadoss (Army-Veteran) - Head of Operations & Audit">
                <Image src="/images/leadership/major-ar-devadoss.jpg" alt="Major AR Devadoss" fill className="object-cover" />
              </div>
              <div className="relative w-8 h-8 rounded-full border-2 border-[#071728] overflow-hidden bg-black ring-1 ring-[#D4AF37] shrink-0" title="Sweety J - Proprietor and MD">
                <Image src="/images/leadership/sweety-j.jpg" alt="Sweety J" fill className="object-cover" />
              </div>
              <div className="relative w-8 h-8 rounded-full border-2 border-[#071728] overflow-hidden bg-black shrink-0" title="R Jan Steve Daniel - Chief Technical Officer">
                <Image src="/images/leadership/r-jan-steve-daniel.jpg" alt="R Jan Steve Daniel" fill className="object-cover" />
              </div>
            </div>
            <span className="text-[11px] font-mono text-neutral-300">
              Indian Army Veteran &bull; Founder MD &bull; CTO Command
            </span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-[#071728]/90 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => handleSwitchMode('ad')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all press-scale ${
              activeMode === 'ad'
                ? 'bg-[#9C7A3C] text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor size={14} />
            <span>Brand AD (Looping 16:9)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchMode('storyboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all press-scale ${
              activeMode === 'storyboard'
                ? 'bg-[#9C7A3C] text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span>Vertical Reel (9:16)</span>
          </button>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Mode 1: 10-Second Brand Commercial (Looping 16:9) */}
        {activeMode === 'ad' && (
          <div 
            onClick={togglePlay}
            className="group relative w-full max-w-4xl aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border-2 border-[#9C7A3C]/40 cursor-pointer select-none"
          >
            <video
              ref={adVideoRef}
              src="/videos/jsm-integrated-services-ad.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* Gradient Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Left: Infinite Seamless Loop Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md border border-[#9C7A3C]/40 text-[11px] font-mono font-bold text-[#D4AF37]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>OFFICIAL COMMERCIAL &bull; CONTINUOUS BROADCAST</span>
              </span>
            </div>

            {/* Top Right: Tap For Sound Button */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
              <button
                type="button"
                onClick={toggleSound}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all shadow-md backdrop-blur-md border press-scale ${
                  isMuted 
                    ? 'bg-amber-500 hover:bg-amber-400 text-black border-amber-300 animate-bounce' 
                    : 'bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-400/50'
                }`}
                title={isMuted ? "Tap to enable sound" : "Tap to mute sound"}
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                <span>{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
              </button>
            </div>

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 z-20 flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 press-scale"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 press-scale"
                  title="Replay from start"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  type="button"
                  onClick={toggleSound}
                  className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 press-scale"
                  title={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX size={14} className="text-amber-400" /> : <Volume2 size={14} className="text-emerald-400" />}
                </button>
                <span className="text-[11px] font-mono text-[#D4AF37] hidden sm:inline">
                  Commercial Broadcast Loop (10s)
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-neutral-300 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                <span>100% EPF &amp; ESIC Compliant</span>
                <span>&bull;</span>
                <span className="text-[#D4AF37]">Tamil Nadu Central Command</span>
              </div>
            </div>
          </div>
        )}

        {/* Mode 2: Higgsfield Vertical Reel (9:16) */}
        {activeMode === 'storyboard' && (
          <div 
            onClick={togglePlay}
            className="group relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border-4 border-[#9C7A3C]/50 ring-2 ring-white/10 cursor-pointer select-none"
          >
            <video
              ref={storyboardVideoRef}
              src="/videos/jsm-higgsfield-youtube-storyboard-preview.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Left: Reel Badge */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-[#9C7A3C]/30 text-[10px] font-mono font-bold text-[#D4AF37]">
                <span>TACTICAL REEL</span>
              </span>
            </div>

            {/* Top Right: Tap For Sound Button */}
            <div className="absolute top-3 right-3 z-30">
              <button
                type="button"
                onClick={toggleSound}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all shadow-md backdrop-blur-md border press-scale ${
                  isMuted 
                    ? 'bg-amber-500 hover:bg-amber-400 text-black border-amber-300 animate-bounce' 
                    : 'bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-400/50'
                }`}
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                <span>{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
              </button>
            </div>

            {/* Bottom Bar Controls */}
            <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="p-1 rounded bg-black/60 text-white backdrop-blur-md press-scale"
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-1 rounded bg-black/60 text-white backdrop-blur-md press-scale"
                >
                  <RotateCcw size={12} />
                </button>
              </div>

              <span className="text-[10px] font-mono text-neutral-400">
                Storyboard &bull; 32s
              </span>
            </div>
          </div>
        )}

        {/* Integrated 24-Band Military Sound Wave Frequency Spectrum Visualizer */}
        <div className="w-full max-w-4xl mt-5">
          <SoundWaveVisualizer
            isPlaying={isPlaying}
            isMuted={isMuted}
            videoRef={activeMode === 'ad' ? adVideoRef : storyboardVideoRef}
            label="TACTICAL AUDIO RADAR &bull; 24-BAND FREQUENCY SPECTRUM"
            variant="hud"
          />
        </div>

      </div>

      {/* Trust & Operational Credentials Bar */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <Clock size={13} />
            <span>2-Hour Guard Relief</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-snug">
            Immediate standby relief deployment guaranteed by contract.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <Eye size={13} />
            <span>2:00 AM Van Audits</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-snug">
            Unannounced mobile patrol van spot-checks across client posts.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <Award size={13} />
            <span>100% EPF &amp; ESIC</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-snug">
            Strict statutory wage compliance protecting principal employers.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <ShieldCheck size={13} />
            <span>Ex-Servicemen Cadre</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-snug">
            Armed Forces veteran leadership and disciplined turn-out.
          </p>
        </div>
      </div>

      {/* Bottom CTA Action Bar */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <span className="text-neutral-300 text-center sm:text-left">
          Need an on-site security vulnerability assessment for your facility in Tamil Nadu?
        </span>

        <div className="flex items-center gap-3">
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#9C7A3C] hover:bg-[#B38D48] text-white font-semibold transition-colors shadow-md min-h-[40px] press-scale"
          >
            <span>Request Guarding Proposal</span>
            <ArrowRight size={13} />
          </Link>
          <a
            href="tel:+919080863448"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/15 min-h-[40px] press-scale"
          >
            <Phone size={13} className="text-[#D4AF37]" />
            <span>+91 90808 63448</span>
          </a>
        </div>
      </div>

    </motion.div>
  );
}
