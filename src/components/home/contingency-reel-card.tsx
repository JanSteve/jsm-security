"use client";

import * as React from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Download, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Maximize2,
  Share2,
  Video
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

interface Chapter {
  time: number;
  label: string;
  tag: string;
  description: string;
}

const CHAPTERS: Chapter[] = [
  {
    time: 1,
    label: "00:01 The Advance Trap",
    tag: "33% Retainer Fee",
    description: "Traditional firms demand upfront fees before qualifying a single candidate profile.",
  },
  {
    time: 11,
    label: "00:11 Operational Drag",
    tag: "~₹35,000/day Loss",
    description: "Unfilled plant leadership halts throughput and burns working capital.",
  },
  {
    time: 25,
    label: "00:25 7-Day Sprint",
    tag: "3 Blind Dossiers",
    description: "Receive three calibrated senior finalists with verified operational metrics.",
  },
  {
    time: 33,
    label: "00:33 Joining Shield",
    tag: "90-Day Assurance",
    description: "Fees are invoiced strictly after onboarding, backed by replacement protection [CONFIRM: fee %].",
  },
];

const INSTAGRAM_CAPTION = `Your plant leadership seat is vacant. Traditional headhunters demand a 33% advance retainer before presenting a single verified profile.

That locks up lakhs in working capital with zero hiring guarantee.

At JSM Integrated Services, we operate on 100% contingency:
• ₹0 Upfront Retainer — sourcing begins immediately
• 3 Calibrated Blind Dossiers in 7 business days
• 8.33% Placement Fee invoiced strictly after onboarding
• 90-Day Free Replacement Assurance

Calibrate your executive search mandate at www.jsmintegratedservices.com

#ExecutiveSearchIndia #PlantHeadHiring #ManufacturingLeadership #TamilNaduIndustry #PuneManufacturing #ContingencyRecruitment #IndustrialLeadership`;

export function ContingencyReelCard({ className }: { className?: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isMuted, setIsMuted] = React.useState<boolean>(true);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(50);
  const [copiedCaption, setCopiedCaption] = React.useState<boolean>(false);
  const [activeChapter, setActiveChapter] = React.useState<number>(0);

  // Update progress
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);
    
    // Find active chapter
    let activeIdx = 0;
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (curr >= CHAPTERS[i].time - 0.5) {
        activeIdx = i;
        break;
      }
    }
    setActiveChapter(activeIdx);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const copyInstagramCopy = () => {
    navigator.clipboard.writeText(INSTAGRAM_CAPTION).then(() => {
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2400);
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className={cn(
        "bg-white border border-[#0E1116]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden",
        className
      )}
    >
      <BorderBeam size={260} duration={16} colorFrom="#1F4E5F" colorTo="#C8553D" />

      {/* Header Band */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#0E1116]/8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F4E5F]/10 text-[#1F4E5F] text-xs font-semibold mb-2 font-mono">
            <Video className="w-3.5 h-3.5 text-[#1F4E5F]" aria-hidden="true" />
            <span>Executive Media Brief • 9:16 Vertical Reel</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-medium text-[#0E1116] tracking-tight">
            The 50-Second Contingency Teardown
          </h3>
          <p className="text-xs sm:text-sm text-[#525866] mt-1 max-w-2xl">
            Synthesized with English articulate narration (af_bella engine). Why traditional headhunter retainers burn operational capital, and how JSM delivers 3 blind dossiers in 7 days.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="/videos/jsm-contingency-reel.mp4"
            download="JSM-Contingency-Executive-Search-Reel.mp4"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F6F3EE] hover:bg-[#0E1116] hover:text-white text-[#0E1116] border border-[#0E1116]/10 text-xs font-semibold transition-all min-h-[44px]"
            title="Download 1080x1920 MP4 for Instagram / LinkedIn campaigns"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Download Reel</span>
          </a>

          <button
            type="button"
            onClick={copyInstagramCopy}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1F4E5F] hover:bg-[#163845] text-white text-xs font-semibold transition-all min-h-[44px]"
            title="Copy pre-calibrated Instagram / LinkedIn caption"
          >
            {copiedCaption ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                <span>Caption Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copy Ad Caption</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Chapters & Mobile Bezel Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column (7 cols): Interactive Chapter Stepper & Narrative Invariants */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8553D]">
              Interactive Chapter Navigation
            </span>
            <p className="text-xs sm:text-sm text-[#525866]">
              Select a chapter below to jump the video directly to that operational proof-point:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CHAPTERS.map((ch, idx) => {
              const isSelected = activeChapter === idx;
              return (
                <button
                  key={ch.label}
                  type="button"
                  onClick={() => seekTo(ch.time)}
                  className={cn(
                    "text-left p-4 rounded-xl border transition-all text-xs flex flex-col justify-between min-h-[105px]",
                    isSelected 
                      ? "bg-[#1F4E5F] text-white border-[#1F4E5F] shadow-sm"
                      : "bg-[#F6F3EE] text-[#0E1116] border-[#0E1116]/8 hover:border-[#1F4E5F]/30"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn(
                      "font-mono font-bold text-[11px]",
                      isSelected ? "text-white/90" : "text-[#1F4E5F]"
                    )}>
                      {ch.label}
                    </span>
                    <span className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                      isSelected ? "bg-white/20 text-white" : "bg-white text-[#525866] border border-[#0E1116]/8"
                    )}>
                      {ch.tag}
                    </span>
                  </div>
                  <p className={cn(
                    "text-[11px] leading-relaxed",
                    isSelected ? "text-white/85" : "text-[#525866]"
                  )}>
                    {ch.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Key Engagement Guarantees Callout */}
          <div className="bg-[#F6F3EE] rounded-xl p-4 sm:p-5 border border-[#0E1116]/8 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0E1116]">
              <ShieldCheck className="w-4 h-4 text-[#1F4E5F]" aria-hidden="true" />
              <span>Contingency Framework Summary</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 bg-white rounded-lg border border-[#0E1116]/6">
                <span className="block font-heading font-semibold text-sm sm:text-base text-[#0E1116]">₹0</span>
                <span className="block text-[10px] font-sans text-[#525866]">Advance Retainer</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-[#0E1116]/6">
                <span className="block font-heading font-semibold text-sm sm:text-base text-[#1F4E5F]">7 Days</span>
                <span className="block text-[10px] font-sans text-[#525866]">3 Blind Dossiers</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-[#0E1116]/6">
                <span className="block font-heading font-semibold text-sm sm:text-base text-[#C8553D]">90 Days</span>
                <span className="block text-[10px] font-sans text-[#525866]">Replacement Shield</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Phone Frame Mockup with 9:16 Video Player */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] bg-[#0E1116] rounded-[2.5rem] p-3 shadow-2xl border-4 border-[#1F4E5F]/30 overflow-hidden group">
            
            {/* Top Phone Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-[#0E1116] rounded-full z-30 flex items-center justify-center">
              <div className="w-8 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Video Element Container */}
            <div 
              className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black cursor-pointer select-none"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src="/videos/jsm-contingency-reel.mp4"
                poster="/videos/poster.jpg"
                playsInline
                loop
                muted={isMuted}
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
              >
                <track 
                  kind="subtitles" 
                  src="/videos/jsm-contingency-reel.vtt" 
                  srcLang="en" 
                  label="English Captions" 
                  default 
                />
              </video>

              {/* Floating Top Left Badge: Timecode */}
              <div className="absolute top-3 left-3 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white">
                  <Clock className="w-3 h-3 text-[#C8553D]" aria-hidden="true" />
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </span>
              </div>

              {/* Floating Top Right: Audio Toggle Button */}
              <div className="absolute top-3 right-3 z-30">
                <button
                  type="button"
                  onClick={toggleSound}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all shadow-md backdrop-blur-md border",
                    isMuted
                      ? "bg-white/20 hover:bg-white/30 text-white border-white/30"
                      : "bg-[#1F4E5F] text-white border-white/40"
                  )}
                  title={isMuted ? "Tap to enable narration audio" : "Audio active (tap to mute)"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-white shrink-0" aria-hidden="true" />
                      <span>Audio Off</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-white shrink-0 animate-pulse" aria-hidden="true" />
                      <span>Audio On</span>
                    </>
                  )}
                </button>
              </div>

              {/* Center Play Overlay when Paused */}
              {!isPlaying && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-2xs transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-[#1F4E5F] text-white flex items-center justify-center shadow-lg border-2 border-white/40 transform hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-0.5" aria-hidden="true" />
                  </div>
                </div>
              )}

              {/* Bottom Scrubber & Quick Controls */}
              <div 
                className="absolute bottom-0 inset-x-0 z-20 p-3 pt-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Progress Bar */}
                <div 
                  className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = clickX / rect.width;
                    seekTo(pct * duration);
                  }}
                >
                  <div 
                    className="h-full bg-[#C8553D] transition-all duration-100 rounded-full" 
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1 text-white hover:text-[#C8553D] transition-colors"
                      title={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Play className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleRestart}
                      className="p-1 text-white/80 hover:text-white transition-colors"
                      title="Restart from beginning"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-1 text-white/80 hover:text-white transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
