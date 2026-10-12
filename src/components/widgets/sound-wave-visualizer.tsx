'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Activity, Radio, Volume2, VolumeX } from 'lucide-react';

export interface SoundWaveVisualizerProps {
  isPlaying: boolean;
  isMuted?: boolean;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  className?: string;
  bandsCount?: number;
  label?: string;
  variant?: 'compact' | 'expanded' | 'hud';
  showBadge?: boolean;
}

// Module-level cache to ensure HTMLMediaElement is only connected once to AudioContext
const mediaSourceCache = new WeakMap<
  HTMLMediaElement,
  {
    source: MediaElementAudioSourceNode;
    analyser: AnalyserNode;
    audioCtx: AudioContext;
  }
>();

export function SoundWaveVisualizer({
  isPlaying,
  isMuted = true,
  videoRef,
  className = '',
  bandsCount = 24,
  label = 'LIVE AUDIO SPECTRUM',
  variant = 'hud',
  showBadge = true,
}: SoundWaveVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const peaksRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Audio state telemetry
  const [telemetry, setTelemetry] = useState<{
    mode: 'REAL_STREAM' | 'HARMONIC_SIM' | 'STANDBY';
    decibels: string;
    peakBand: number;
    activityPct: number;
  }>({
    mode: 'STANDBY',
    decibels: '-42.0 dB',
    peakBand: 12,
    activityPct: 0,
  });

  const animFrameIdRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const heightsRef = useRef<number[]>(new Array(bandsCount).fill(0.08));
  const peakValuesRef = useRef<number[]>(new Array(bandsCount).fill(0.12));
  const telemetryThrottleRef = useRef<number>(0);

  // Frequency band labels across the 24 bands (from Sub-bass 20Hz up to Air 20kHz)
  const frequencyMarkers = [
    '20', '40', '63', '100', '160', '250', '400', '630', 
    '1k', '1.6k', '2.5k', '4k', '6.3k', '10k', '16k', '20k'
  ];

  useEffect(() => {
    // Resize internal state arrays if bandsCount changes
    if (heightsRef.current.length !== bandsCount) {
      heightsRef.current = new Array(bandsCount).fill(0.08);
      peakValuesRef.current = new Array(bandsCount).fill(0.12);
    }
  }, [bandsCount]);

  useEffect(() => {
    let analyserNode: AnalyserNode | null = null;
    let audioCtx: AudioContext | null = null;

    // Attempt to initialize or retrieve Web Audio Analyser
    const initWebAudio = () => {
      if (typeof window === 'undefined') return;
      const videoEl = videoRef?.current;
      if (!videoEl) return;

      try {
        if (mediaSourceCache.has(videoEl)) {
          const cached = mediaSourceCache.get(videoEl)!;
          analyserNode = cached.analyser;
          audioCtx = cached.audioCtx;
        } else {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            const ctx = new AudioContextClass();
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 64; // 32 frequency bins
            analyser.smoothingTimeConstant = 0.82;

            // Connect media element
            const source = ctx.createMediaElementSource(videoEl);
            source.connect(analyser);
            analyser.connect(ctx.destination);

            mediaSourceCache.set(videoEl, { source, analyser, audioCtx: ctx });
            analyserNode = analyser;
            audioCtx = ctx;
          }
        }

        // Resume audio context on unmuted play
        if (audioCtx && audioCtx.state === 'suspended' && isPlaying && !isMuted) {
          audioCtx.resume().catch(() => {});
        }
      } catch (err) {
        // Fallback to harmonic simulation if browser prevents audio element capture
        analyserNode = null;
      }
    };

    initWebAudio();

    // Data buffer for real audio frequency spectrum
    const dataArray = new Uint8Array(32);

    const renderLoop = () => {
      timeRef.current += 1;
      const t = timeRef.current;
      let hasRealAudioSignal = false;
      let sumAmplitude = 0;
      let maxBandIndex = 0;
      let maxBandValue = 0;

      // 1. Inspect real Web Audio signal if unmuted
      if (analyserNode && !isMuted && isPlaying) {
        try {
          analyserNode.getByteFrequencyData(dataArray);
          // Check if there is actual non-zero energy in frequency bins
          for (let i = 0; i < 24; i++) {
            const val = dataArray[i];
            sumAmplitude += val;
            if (val > maxBandValue) {
              maxBandValue = val;
              maxBandIndex = i;
            }
          }
          if (sumAmplitude > 40) {
            hasRealAudioSignal = true;
          }
        } catch {
          hasRealAudioSignal = false;
        }
      }

      // 2. Compute target heights for each band
      for (let i = 0; i < bandsCount; i++) {
        let targetHeight = 0.08;

        if (!isPlaying) {
          // Resting baseline when paused
          targetHeight = 0.06;
        } else if (hasRealAudioSignal) {
          // Real Audio Frequency Spectrum mapped to 0.08 - 0.98 range
          const rawByte = dataArray[Math.min(i, dataArray.length - 1)];
          const normalized = rawByte / 255;
          // Apply gentle frequency curve compensation
          const curveWeight = 1.0 + (i / bandsCount) * 0.4;
          targetHeight = Math.min(0.98, Math.max(0.08, normalized * curveWeight));
        } else {
          // Procedural Trigonometric Harmonic Simulation
          // Mathematical composite of multiple harmonic frequencies + rhythmic pulses
          const harmonicPrimary =
            Math.sin(t * 0.085 + i * 0.42) * Math.cos(t * 0.045 - i * 0.28) * 0.5 + 0.5;
          const harmonicSecondary =
            Math.sin(t * 0.14 + i * 0.65) * Math.sin(t * 0.03 + i * 0.15) * 0.35 + 0.35;
          
          // Organic spectrum curvature: peak presence in vocal/speech mid frequencies (bands 6 to 16)
          const spectrumCurve = Math.sin((i / bandsCount) * Math.PI) * 0.38 + 0.25;

          // Bass rhythmic pulse on bands 0-4
          const bassKick = i < 5 ? (Math.sin(t * 0.065) > 0.6 ? 0.32 : 0) : 0;
          // Treble shimmer on bands 18-23
          const trebleShimmer = i > 17 ? Math.sin(t * 0.22 + i) * 0.12 : 0;

          const combined =
            harmonicPrimary * 0.45 +
            harmonicSecondary * 0.3 +
            spectrumCurve * 0.25 +
            bassKick +
            trebleShimmer;

          targetHeight = Math.min(0.96, Math.max(0.08, combined));

          sumAmplitude += targetHeight * 255;
          if (targetHeight > maxBandValue) {
            maxBandValue = targetHeight;
            maxBandIndex = i;
          }
        }

        // Dynamic Spring Interpolation (stiffness = 0.24, damping decay)
        const currentHeight = heightsRef.current[i] || 0.08;
        const springSpeed = hasRealAudioSignal ? 0.32 : 0.24;
        const nextHeight = currentHeight + (targetHeight - currentHeight) * springSpeed;
        heightsRef.current[i] = nextHeight;

        // Peak Hold Gravity Decay
        const currentPeak = peakValuesRef.current[i] || 0.12;
        let nextPeak = currentPeak;
        if (nextHeight > currentPeak) {
          nextPeak = nextHeight;
        } else {
          nextPeak = Math.max(nextHeight, currentPeak - 0.012); // smooth gravity descent
        }
        peakValuesRef.current[i] = nextPeak;

        // Direct DOM update for 60 FPS performance without React re-render churn
        const barEl = barsRef.current[i];
        if (barEl) {
          const heightPercent = Math.round(nextHeight * 100);
          barEl.style.height = `${heightPercent}%`;
          // Dynamic glow intensity
          const opacity = Math.min(1, Math.max(0.4, nextHeight));
          barEl.style.opacity = `${opacity}`;
        }

        const peakEl = peaksRef.current[i];
        if (peakEl) {
          const peakPercent = Math.min(98, Math.round(nextPeak * 100));
          peakEl.style.bottom = `${peakPercent}%`;
          peakEl.style.opacity = isPlaying ? '0.9' : '0.2';
        }
      }

      // 3. Throttled Telemetry Update (every 10 frames = ~6 updates/sec)
      telemetryThrottleRef.current += 1;
      if (telemetryThrottleRef.current % 10 === 0) {
        const avgAmplitude = sumAmplitude / bandsCount;
        const activityPct = Math.min(100, Math.round((avgAmplitude / 255) * 100));
        
        let calculatedDb = '-48.0 dB';
        if (isPlaying) {
          const dbVal = -48 + (activityPct / 100) * 42; // scale from -48dB to -6dB
          calculatedDb = `${dbVal.toFixed(1)} dB`;
        }

        const currentMode: 'REAL_STREAM' | 'HARMONIC_SIM' | 'STANDBY' = !isPlaying
          ? 'STANDBY'
          : hasRealAudioSignal
          ? 'REAL_STREAM'
          : 'HARMONIC_SIM';

        setTelemetry({
          mode: currentMode,
          decibels: calculatedDb,
          peakBand: maxBandIndex + 1,
          activityPct,
        });
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPlaying, isMuted, videoRef, bandsCount]);

  return (
    <div
      ref={containerRef}
      className={`rounded-xl bg-[#070B12]/90 border border-white/15 p-3 sm:p-4 backdrop-blur-xl shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Micro-HUD Telemetry Header Bar */}
      {showBadge && (
        <div className="flex items-center justify-between gap-3 pb-2.5 mb-2.5 border-b border-white/10 text-xs">
          {/* Status Beacon & Label */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              {isPlaying && (
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    telemetry.mode === 'REAL_STREAM'
                      ? 'bg-emerald-400'
                      : telemetry.mode === 'HARMONIC_SIM'
                      ? 'bg-white'
                      : 'bg-zinc-600'
                  }`}
                />
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  telemetry.mode === 'REAL_STREAM'
                    ? 'bg-emerald-500'
                    : telemetry.mode === 'HARMONIC_SIM'
                    ? 'bg-white'
                    : 'bg-zinc-600'
                }`}
              />
            </span>

            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-neutral-200">
              {label}
            </span>

            <span
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold tracking-wider ${
                telemetry.mode === 'REAL_STREAM'
                  ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/40'
                  : telemetry.mode === 'HARMONIC_SIM'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/5 text-neutral-400 border border-white/10'
              }`}
            >
              {telemetry.mode === 'REAL_STREAM'
                ? 'REAL AUDIO CH'
                : telemetry.mode === 'HARMONIC_SIM'
                ? 'HARMONIC HARVEST'
                : 'IDLE'}
            </span>
          </div>

          {/* Right Metrics: dB & Activity */}
          <div className="flex items-center gap-3 font-mono text-[10px] text-neutral-400">
            <span className="hidden sm:inline-flex items-center gap-1">
              <Activity size={11} className="text-white" />
              <span className="text-neutral-300">PK-B{telemetry.peakBand}</span>
            </span>

            <span className="inline-flex items-center gap-1">
              {isMuted ? (
                <VolumeX size={11} className="text-white" />
              ) : (
                <Volume2 size={11} className="text-emerald-400" />
              )}
              <span className="text-neutral-200 font-bold tabular-nums">
                {telemetry.decibels}
              </span>
            </span>

            <span className="px-1.5 py-0.5 rounded bg-white/5 text-neutral-300 text-[9px]">
              {bandsCount} BANDS
            </span>
          </div>
        </div>
      )}

      {/* 24-Band Frequency Spectrum Visualizer Stage */}
      <div className="relative w-full h-14 sm:h-16 flex items-end justify-between gap-[2px] sm:gap-1 px-1 py-1 bg-black/40 rounded-lg border border-white/5 overflow-hidden">
        {/* Subtle Horizontal Decibel Reference Grid Lines */}
        <div className="absolute inset-x-0 top-1/4 border-b border-white/[0.04] pointer-events-none" />
        <div className="absolute inset-x-0 top-2/4 border-b border-white/[0.04] pointer-events-none" />
        <div className="absolute inset-x-0 top-3/4 border-b border-white/[0.04] pointer-events-none" />

        {/* 24 Frequency Equalizer Bars */}
        {Array.from({ length: bandsCount }).map((_, index) => (
          <div
            key={index}
            className="relative flex-1 h-full flex items-end justify-center group"
          >
            {/* Background slot track */}
            <div className="absolute inset-0 bg-white/[0.03] rounded-[1px]" />

            {/* Peak hold indicator dot */}
            <div
              ref={(el) => {
                peaksRef.current[index] = el;
              }}
              style={{ bottom: '12%' }}
              className="absolute w-full h-[2px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)] z-10 transition-all pointer-events-none"
            />

            {/* Dynamic Spring-Interpolated Equalizer Bar with Titanium Platinum Gradient */}
            <div
              ref={(el) => {
                barsRef.current[index] = el;
              }}
              style={{
                height: '8%',
                background:
                  'linear-gradient(to top, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.85) 80%, #FFFFFF 100%)',
              }}
              className="relative w-full rounded-t-[2px] shadow-[0_0_8px_rgba(255,255,255,0.35)] transition-[opacity] duration-75"
            />
          </div>
        ))}
      </div>

      {/* Frequency Scale Markers */}
      {variant !== 'compact' && (
        <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500 pt-1.5 px-1 select-none">
          <span>20Hz (BASS)</span>
          <span className="hidden sm:inline">250Hz (LOW-MID)</span>
          <span>1kHz (MID)</span>
          <span className="hidden sm:inline">4kHz (PRESENCE)</span>
          <span>20kHz (AIR)</span>
        </div>
      )}
    </div>
  );
}
