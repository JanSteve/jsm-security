'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Zap,
  ArrowRight,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import { SoundWaveVisualizer } from './sound-wave-visualizer';

interface DigitalVideoPlayerProps {
  className?: string;
}

export function DigitalVideoPlayer({ className = '' }: DigitalVideoPlayerProps) {
  const [activeVideo, setActiveVideo] = useState<'horizontal' | 'vertical'>('horizontal');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0); // 1.0 on pre-accelerated 2x file
  const [hasInteracted, setHasInteracted] = useState(false);

  const horizontalRef = useRef<HTMLVideoElement>(null);
  const verticalRef = useRef<HTMLVideoElement>(null);

  // Auto-detect mobile screen: vertical format plays first on mobile!
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setActiveVideo('vertical');
    }
  }, []);

  // Sync playback speed
  useEffect(() => {
    const currentVideo = activeVideo === 'horizontal' ? horizontalRef.current : verticalRef.current;
    if (currentVideo) {
      currentVideo.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, activeVideo]);

  // Handle video format switch
  const handleSwitchVideo = (type: 'horizontal' | 'vertical') => {
    setActiveVideo(type);
    setIsPlaying(true);
    setTimeout(() => {
      const currentVideo = type === 'horizontal' ? horizontalRef.current : verticalRef.current;
      if (currentVideo) {
        currentVideo.muted = isMuted;
        currentVideo.play().catch(() => {});
        currentVideo.playbackRate = playbackSpeed;
      }
    }, 100);
  };

  // Toggle Sound On / Off
  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setHasInteracted(true);

    const currentVideo = activeVideo === 'horizontal' ? horizontalRef.current : verticalRef.current;
    if (currentVideo) {
      currentVideo.muted = nextMuted;
      if (currentVideo.paused) {
        currentVideo.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    const currentVideo = activeVideo === 'horizontal' ? horizontalRef.current : verticalRef.current;
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play().catch(() => {});
        setIsPlaying(true);
      } else {
        currentVideo.pause();
        setIsPlaying(false);
      }
    }
  };

  // Restart Video
  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentVideo = activeVideo === 'horizontal' ? horizontalRef.current : verticalRef.current;
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-2xl bg-obsidian-mesh text-white shadow-2xl border border-[#9C7A3C]/35 border-gold-specular-top space-y-6 ${className}`}>
      
      {/* Top Header & Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9C7A3C]/20 text-[#D4AF37] text-xs font-semibold border border-[#9C7A3C]/30">
            <Zap size={14} className="animate-pulse text-[#D4AF37]" />
            <span>2x Fast-Track Video Overview &bull; Digital &amp; Smart Tech Only</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-semibold tracking-tight">
            Watch Our Smart Digital Solutions in Action
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Zero fluff or slow pauses. Watch how our <strong className="text-white">Smart Review Filter NFC Standees</strong>, <strong className="text-white">WhatsApp Table Ordering QR Menus</strong>, <strong className="text-white">Clinic Token Queues</strong>, and <strong className="text-white">Next.js Web Platforms</strong> eliminate revenue loss and drive customer growth.
          </p>
        </div>

        {/* Video Mode Selector (Desktop & Mobile Pills) */}
        <div className="flex items-center bg-[#071728]/90 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => handleSwitchVideo('horizontal')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all press-scale ${
              activeVideo === 'horizontal'
                ? 'bg-[#0F2A47] text-white shadow-xs border border-[#9C7A3C]/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor size={14} />
            <span>Widescreen (16:9)</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchVideo('vertical')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all press-scale ${
              activeVideo === 'vertical'
                ? 'bg-[#0F2A47] text-white shadow-xs border border-[#9C7A3C]/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span>Mobile Reel (9:16)</span>
          </button>
        </div>
      </div>

      {/* Main Video Stage (Compact & Contained) */}
      <div className="relative mx-auto flex flex-col items-center">
        
        {/* Horizontal 16:9 Container */}
        {activeVideo === 'horizontal' && (
          <div 
            onClick={togglePlay}
            className="group relative w-full max-w-4xl aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 cursor-pointer select-none"
          >
            <video
              ref={horizontalRef}
              src="/videos/JSM_Explainer_Video_2x.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* Gradient Dark Backdrop for Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Top Left: 2x Speed Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-[#D4AF37]">
                <Zap size={12} className="text-[#D4AF37]" />
                <span>2X SPEED (AUTO)</span>
              </span>
            </div>

            {/* Top Right: High-Visibility Sound Activation Button */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
              <button
                type="button"
                onClick={toggleSound}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all shadow-lg backdrop-blur-md border press-scale ${
                  isMuted 
                    ? 'bg-amber-500 hover:bg-amber-400 text-black border-amber-300 animate-bounce' 
                    : 'bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-400/50'
                }`}
                title={isMuted ? "Tap to enable sound" : "Tap to mute sound"}
              >
                {isMuted ? (
                  <>
                    <VolumeX size={15} className="shrink-0" />
                    <span className="font-bold tracking-wide">🔇 TAP FOR SOUND</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={15} className="shrink-0" />
                    <span>🔊 Sound Active</span>
                  </>
                )}
              </button>
            </div>

            {/* Center Play/Pause indicator on hover or pause */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-black/40 backdrop-blur-[2px]">
                <div className="w-16 h-16 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-xl">
                  <Play size={28} className="ml-1 fill-white" />
                </div>
              </div>
            )}

            {/* Bottom Bar Controls */}
            <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 z-20 flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 press-scale"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 press-scale"
                  title="Replay from start"
                >
                  <RotateCcw size={14} />
                </button>
                <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
                  Digital Suite Walkthrough
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleSound}
                  className="p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 sm:hidden press-scale"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <span className="text-[11px] text-neutral-400 hidden sm:inline">
                  {isMuted ? 'Muted by default • Click to unmute' : 'Audio enabled'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Vertical 9:16 Container (Reel / Shorts Phone Mockup) */}
        {activeVideo === 'vertical' && (
          <div 
            onClick={togglePlay}
            className="group relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border-4 border-[#1A3E63] cursor-pointer select-none ring-1 ring-white/20"
          >
            <video
              ref={verticalRef}
              src="/videos/JSM_Vertical_Promo_2x.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Top Left: 2x Badge */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-[#D4AF37]">
                <Zap size={11} className="text-[#D4AF37]" />
                <span>2X</span>
              </span>
            </div>

            {/* Top Right: Tap for Sound Button */}
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

            {/* Center Play Indicator */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-black/40 backdrop-blur-[2px]">
                <div className="w-14 h-14 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-xl">
                  <Play size={24} className="ml-1 fill-white" />
                </div>
              </div>
            )}

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="p-1 rounded bg-black/50 text-white backdrop-blur-md press-scale"
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-1 rounded bg-black/50 text-white backdrop-blur-md press-scale"
                >
                  <RotateCcw size={12} />
                </button>
              </div>

              <span className="text-[10px] font-mono text-neutral-400">
                Quick Reel &bull; 32s
              </span>
            </div>
          </div>
        )}

        {/* Integrated 24-Band Sound Wave Frequency Spectrum Visualizer */}
        <div className="w-full max-w-4xl mt-5">
          <SoundWaveVisualizer
            isPlaying={isPlaying}
            isMuted={isMuted}
            videoRef={activeVideo === 'horizontal' ? horizontalRef : verticalRef}
            label="DIGITAL DEMO AUDIO SPECTRUM &bull; 24-BAND FREQUENCY ANALYZER"
            variant="hud"
          />
        </div>

      </div>

      {/* Feature Strip under Video */}
      <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <Sparkles size={13} />
            <span>Smart NFC Review Standee</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-snug">
            4-5 stars redirect to Google Maps; 1-3 star complaints go to owner WhatsApp.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <Sparkles size={13} />
            <span>Zero-Commission QR Ordering</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-snug">
            Direct dine-in &amp; takeaway table orders sent to WhatsApp. No 30% Swiggy cut.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <Sparkles size={13} />
            <span>Clinic Queue Token Tracker</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-snug">
            Real-time patient wait token status on phone. Eliminates crowded waiting rooms.
          </p>
        </div>
      </div>

      {/* Bottom CTA Row */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-neutral-300 text-center sm:text-left">
          Deploy smart NFC standees, QR dining menus, or clinic token queues across Tamil Nadu.
        </span>
        <div className="flex items-center gap-2">
          <Link
            href="/services/nfc-review-standees"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#9C7A3C] hover:bg-[#B38D48] text-white font-semibold transition-colors shadow-xs press-scale"
          >
            <span>Explore Smart Standee</span>
            <ArrowRight size={13} />
          </Link>
          <a
            href="tel:+919080863448"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/15 press-scale"
          >
            <Phone size={13} className="text-[#D4AF37]" />
            <span>+91 90808 63448</span>
          </a>
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/15 press-scale"
          >
            <span>Get Quote</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
