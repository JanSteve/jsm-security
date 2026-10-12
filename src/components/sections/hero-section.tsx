"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Award, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Plane,
  Eye,
  ArrowRight
} from "lucide-react";
import { brandData } from "@/data/brand";

export function HeroSection() {
  const [activeVisualTab, setActiveVisualTab] = useState<"video" | "photo">("video");
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-black text-white border-b border-white/10">
      {/* Subtle Ambient Backlight Sheen (Pure CSS) */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-white/5 via-neutral-900/30 to-transparent blur-[120px] pointer-events-none rounded-full" 
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Block — Punchy, Concise Copy */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* High-Impact Credential Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/20 text-xs text-white"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-bold text-white">Ex-Servicemen Led</span>
              <span className="text-neutral-500">&bull;</span>
              <span className="text-neutral-200">Airports Authority of India Client</span>
              <span className="text-neutral-500">&bull;</span>
              <span className="text-neutral-200 font-semibold">100% EPF/ESIC</span>
            </motion.div>

            {/* Display Headline: Pure White, Short & Bold */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="font-serif text-[32px] sm:text-[46px] lg:text-[56px] leading-[1.1] text-white font-bold tracking-tight"
            >
              Disciplined Security &amp; Facility Operations.
            </motion.h1>

            {/* One-Sentence Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl"
            >
              Trusted by <strong className="text-white font-semibold">Airports Authority of India (AAI)</strong>. We deliver Ex-Servicemen security forces, verified contract staffing, and commercial facility management with a <strong className="text-white font-semibold">2-hour relief replacement guarantee</strong> across Tamil Nadu.
            </motion.p>

            {/* Primary & Secondary Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 h-[50px] rounded-[6px] bg-white hover:bg-neutral-200 text-black text-sm font-bold transition-all shadow-xl press-scale min-touch-target"
              >
                <span>Request Immediate Quote</span>
                <ArrowRight size={15} />
              </Link>

              <a
                href={`tel:${brandData.contact.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 h-[50px] rounded-[6px] bg-black/80 hover:bg-white/10 border border-white/25 text-white text-sm font-semibold transition-all press-scale min-touch-target"
              >
                <Phone size={15} className="text-white" />
                <span>Call Desk: {brandData.contact.phoneDisplay}</span>
              </a>
            </motion.div>

            {/* Quick Metrics Bar: 3 Punchy Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2.5 sm:gap-4 max-w-lg"
            >
              <div className="p-2.5 rounded-lg bg-[#080C14] border border-white/10">
                <div className="text-sm sm:text-base font-bold text-white flex items-center gap-1">
                  <Clock size={14} className="text-white" />
                  <span>2 Hours</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">Relief Guarantee</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#080C14] border border-white/10">
                <div className="text-sm sm:text-base font-bold text-white flex items-center gap-1">
                  <Eye size={14} className="text-white" />
                  <span>02:00 AM</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">Patrol Van Audits</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#080C14] border border-white/10">
                <div className="text-sm sm:text-base font-bold text-white flex items-center gap-1">
                  <Plane size={14} className="text-white" />
                  <span>AAI Contract</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">Trichy Airport</div>
              </div>
            </motion.div>
          </div>

          {/* Right Supporting Visual / Mobile-First Real Media Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl border border-white/15 bg-[#080C14] shadow-2xl overflow-hidden">
              
              {/* Media Switcher Tab */}
              <div className="flex items-center justify-between border-b border-white/10 bg-black/80 px-3.5 py-2.5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveVisualTab("video")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-[4px] transition-all flex items-center gap-1.5 ${
                      activeVisualTab === "video"
                        ? "bg-white text-black shadow-sm font-bold"
                        : "text-neutral-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Live Reel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveVisualTab("photo")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] transition-all flex items-center gap-1.5 ${
                      activeVisualTab === "photo"
                        ? "bg-white text-black shadow-sm font-bold"
                        : "text-neutral-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Plane size={13} />
                    <span>Airport Platoon</span>
                  </button>
                </div>

                {/* Sound Toggle (Visible on video) */}
                {activeVisualTab === "video" && (
                  <button
                    type="button"
                    onClick={toggleSound}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all border ${
                      isMuted 
                        ? 'bg-white/10 text-white border-white/25 hover:bg-white/20' 
                        : 'bg-white/20 text-white border-white/40 hover:bg-white/30'
                    }`}
                    title={isMuted ? "Tap to enable sound" : "Tap to mute sound"}
                  >
                    {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                    <span>{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
                  </button>
                )}
              </div>

              {/* Video Viewport: Mobile-First Vertical Reel Mode */}
              {activeVisualTab === "video" ? (
                <div 
                  onClick={togglePlay}
                  className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/3] bg-black cursor-pointer group select-none overflow-hidden"
                >
                  <video
                    ref={videoRef}
                    src="/videos/jsm-higgsfield-youtube-storyboard-preview.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white">
                      <span>TACTICAL DRILL &bull; REEL</span>
                    </span>
                  </div>

                  {/* Center Tap to Play/Pause on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                      {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                    </div>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-black via-black/80 to-transparent text-left space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck size={13} />
                      <span>Ex-Servicemen Field Turnout &amp; Parade Inspection</span>
                    </div>
                    <p className="text-[11px] text-neutral-300 line-clamp-1">
                      Trichy International Airport security detachment under direct leadership of Major AR Devadoss.
                    </p>
                  </div>
                </div>
              ) : (
                /* Photo Viewport: Real Trichy Airport Platoon */
                <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/3] bg-black overflow-hidden">
                  <Image
                    src="/images/trichy-airport/trichy_airport_platoon_salute_day.jpg"
                    alt="JSM Security Platoon on site at Tiruchirappalli International Airport"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

                  {/* Caption */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 text-left space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Award size={13} className="text-white" />
                        <span>Trichy International Airport Detachment</span>
                      </span>
                      <span className="text-[10px] font-mono text-white bg-white/10 px-2 py-0.5 rounded border border-white/20 font-bold">
                        AAI Benchmark
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-300">
                      Muster turnout and physical inspection conducted daily at 05:00 AM before terminal deployment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
