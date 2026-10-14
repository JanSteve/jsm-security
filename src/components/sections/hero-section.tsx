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
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Plane,
  Eye,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { RadarTelemetryBadge } from "@/components/ui/radar-telemetry-badge";

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
    <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-[#030712] text-white border-b border-cyan-500/20 bg-security-grid">
      {/* Ambient Cyber Cyan Radial Spotlight */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-neutral-900/30 to-transparent blur-[120px] pointer-events-none rounded-full" 
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Block — Punchy, Concise Copy */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Live Command Radar Telemetry Pulse Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RadarTelemetryBadge label="24/7 CENTRAL COMMAND" sublabel="ACTIVE MUSTER" />
            </motion.div>

            {/* Display Headline: Pure White, Short & Bold */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-[32px] sm:text-[46px] lg:text-[56px] leading-[1.1] text-white font-bold tracking-tight"
            >
              Command-Led Security Forces &amp; Regulated Facility Operations.
            </motion.h1>

            {/* One-Sentence Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl"
            >
              AAI concourse contractor deploying Ex-Servicemen command, 100% EPF/ESIC statutory compliance, and guaranteed 2-hour relief replacement across Tamil Nadu.
            </motion.p>

            {/* High-Contrast Metric Pills Above Fold */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="flex flex-wrap items-center gap-2 pt-1"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080C16] border border-cyan-500/30 text-cyan-300 font-mono text-[11px] sm:text-xs font-bold tracking-wide shadow-[0_0_12px_rgba(14,165,233,0.15)]">
                <Clock size={12} className="text-cyan-400" />
                <span>2-HOUR RELIEF SLA</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080C16] border border-emerald-500/30 text-emerald-300 font-mono text-[11px] sm:text-xs font-bold tracking-wide shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>100% EPF &amp; ESIC COMPLIANT</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080C16] border border-cyan-500/30 text-cyan-300 font-mono text-[11px] sm:text-xs font-bold tracking-wide shadow-[0_0_12px_rgba(14,165,233,0.15)]">
                <Award size={12} className="text-cyan-400" />
                <span>AAI BENCHMARK &bull; 02:00 AM AUDITS</span>
              </span>
            </motion.div>

            {/* Above-The-Fold High-Intent Conversion Cluster: 3 Vectors */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3"
            >
              {/* Action 1: 2-Minute Commercial Proposal generator */}
              <Link
                href="/get-quote"
                className="btn-border-beam h-[46px] sm:h-[48px] min-touch-target"
              >
                <span className="btn-border-beam-inner h-full">
                  <span>2-Min Proposal Generator</span>
                  <ArrowRight size={15} className="text-cyan-300" />
                </span>
              </Link>

              {/* Action 2: WhatsApp Quick Deploy */}
              <a
                href="https://wa.me/919080863448?text=Hello%20JSM%20Integrated%20Services,%20I%20need%20immediate%20security%20/%20manpower%20deployment."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-[46px] sm:h-[48px] rounded-[6px] bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.25)] text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98] min-touch-target"
              >
                <MessageSquare size={15} className="text-emerald-400" />
                <span>WhatsApp Quick Deploy</span>
              </a>

              {/* Action 3: Direct Phone Call */}
              <a
                href="tel:+919080863448"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-[46px] sm:h-[48px] rounded-[6px] bg-[#030712] hover:bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400/60 text-white hover:text-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.20)] text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98] min-touch-target"
              >
                <Phone size={15} className="text-cyan-400" />
                <span>Call: +91 90808 63448</span>
              </a>
            </motion.div>

            {/* Quick Metrics Bar: 3 Punchy Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="pt-4 border-t border-cyan-500/20 grid grid-cols-3 gap-2.5 sm:gap-4 max-w-lg"
            >
              <div className="p-2.5 rounded-lg bg-[#080C16] border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                <div className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  <Clock size={14} className="text-cyan-400" />
                  <span>2 Hours</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">Relief SLA</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#080C16] border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                <div className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  <Eye size={14} className="text-cyan-400" />
                  <span>02:00 AM</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">Patrol Audits</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#080C16] border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                <div className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  <Plane size={14} className="text-cyan-400" />
                  <span>AAI Benchmark</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">Trichy Airport</div>
              </div>
            </motion.div>
          </div>

          {/* Right Supporting Visual / Mobile-First Real Media Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl border border-cyan-500/30 bg-[#080C16]/90 shadow-[0_0_40px_rgba(14,165,233,0.15)] overflow-hidden backdrop-blur-xl">
              
              {/* Media Switcher Tab & Controls */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 bg-[#030712]/90 px-3.5 py-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveVisualTab("video")}
                    className={`min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs font-bold rounded-[6px] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                      activeVisualTab === "video"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(14,165,233,0.3)] font-bold"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                    aria-label="Switch to video reel"
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#10B981]" />
                    </span>
                    <span>Live Reel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveVisualTab("photo")}
                    className={`min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs font-semibold rounded-[6px] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                      activeVisualTab === "photo"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(14,165,233,0.3)] font-bold"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                    aria-label="Switch to airport platoon photo"
                  >
                    <Plane size={13} className="text-cyan-400" />
                    <span>Airport Platoon</span>
                  </button>
                </div>

                {/* Play/Pause & Sound Controls (Visible on video) */}
                {activeVisualTab === "video" && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full text-xs font-bold transition-all border border-cyan-500/30 bg-[#080C16] hover:bg-cyan-950/30 text-neutral-300 hover:text-white cursor-pointer active:scale-95 shadow-[0_0_10px_rgba(14,165,233,0.15)]"
                      title={isPlaying ? "Pause reel" : "Play reel"}
                      aria-label={isPlaying ? "Pause reel" : "Play reel"}
                    >
                      {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white ml-0.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleSound}
                      className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border cursor-pointer active:scale-95 ${
                        isMuted 
                          ? 'bg-[#080C16] text-neutral-300 border-white/20 hover:border-cyan-400/40 hover:text-white' 
                          : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_10px_rgba(14,165,233,0.3)]'
                      }`}
                      title={isMuted ? "Tap to enable sound" : "Tap to mute sound"}
                      aria-label={isMuted ? "Tap to enable sound" : "Tap to mute sound"}
                    >
                      {isMuted ? <VolumeX size={13} className="text-neutral-400" /> : <Volume2 size={13} className="text-cyan-400" />}
                      <span>{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
                    </button>
                  </div>
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
                    poster="/images/trichy-airport/trichy_airport_platoon_salute_day.jpg"
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
