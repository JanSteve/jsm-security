'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  Smartphone, 
  Star, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  MapPin, 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  TrendingUp, 
  ShieldCheck,
  Send,
  Eye,
  QrCode
} from 'lucide-react';

export interface NfcStandee3DProps {
  initialRating?: number;
  onRatingSelect?: (rating: number) => void;
  className?: string;
  embeddedMode?: boolean;
}

// Zero-dependency Web Audio API synthesized tap chime
function playNfcChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc1.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.12); // A6

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1320, ctx.currentTime); // E6 harmonic
    osc2.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.35);
    osc2.stop(ctx.currentTime + 0.35);
  } catch {
    // Graceful fallback if audio is blocked
  }
}

export function NfcStandee3D({
  initialRating = 5,
  onRatingSelect,
  className = '',
  embeddedMode = false,
}: NfcStandee3DProps) {
  // Rotational Physics State (Euler Angles)
  const defaultPitch = 12; // rotateX resting posture
  const defaultYaw = -16;  // rotateY resting posture

  const [rotX, setRotX] = useState<number>(defaultPitch);
  const [rotY, setRotY] = useState<number>(defaultYaw);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Interaction & Routing State
  const [selectedRating, setSelectedRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isRecoil, setIsRecoil] = useState<boolean>(false);
  const [tapBurst, setTapBurst] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<'google' | 'whatsapp' | null>(null);
  const [complaintText, setComplaintText] = useState<string>('Staff was polite, but table turnover took 15 mins.');
  const [complaintSent, setComplaintSent] = useState<boolean>(false);

  // Drag tracking refs
  const dragStartRef = useRef<{ x: number; y: number; startRotX: number; startRotY: number }>({
    x: 0,
    y: 0,
    startRotX: defaultPitch,
    startRotY: defaultYaw,
  });
  const velocityRef = useRef<{ vx: number; vy: number; lastTime: number; lastX: number; lastY: number }>({
    vx: 0,
    vy: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });
  const animFrameRef = useRef<number | null>(null);

  // Dynamic Specular Highlight Calculation
  const glareAngle = Math.atan2(rotX, rotY) * (180 / Math.PI) + 90;

  // Spring momentum damping return
  const startSpringReturn = useCallback((vx: number, vy: number) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    let curX = rotX;
    let curY = rotY;
    let currentVx = vx;
    let currentVy = vy;

    const stiffness = 0.08;
    const damping = 0.88;

    const step = () => {
      // Spring force toward default posture
      const forceX = (defaultPitch - curX) * stiffness;
      const forceY = (defaultYaw - curY) * stiffness;

      currentVx = (currentVx + forceX) * damping;
      currentVy = (currentVy + forceY) * damping;

      curX += currentVx;
      curY += currentVy;

      setRotX(curX);
      setRotY(curY);

      if (
        Math.abs(curX - defaultPitch) > 0.1 ||
        Math.abs(curY - defaultYaw) > 0.1 ||
        Math.abs(currentVx) > 0.05 ||
        Math.abs(currentVy) > 0.05
      ) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setRotX(defaultPitch);
        setRotY(defaultYaw);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [rotX, rotY, defaultPitch, defaultYaw]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startRotX: rotX,
      startRotY: rotY,
    };

    velocityRef.current = {
      vx: 0,
      vy: 0,
      lastTime: performance.now(),
      lastX: e.clientX,
      lastY: e.clientY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Pitch: deltaY negative rotates up; clamped [-32, 38]
    const nextRotX = Math.min(38, Math.max(-32, dragStartRef.current.startRotX - deltaY * 0.42));
    // Yaw: deltaX positive rotates right; clamped [-68, 68]
    const nextRotY = Math.min(68, Math.max(-68, dragStartRef.current.startRotY + deltaX * 0.45));

    const now = performance.now();
    const dt = Math.max(1, now - velocityRef.current.lastTime);
    const vx = -((e.clientY - velocityRef.current.lastY) / dt) * 12;
    const vy = ((e.clientX - velocityRef.current.lastX) / dt) * 12;

    velocityRef.current = {
      vx,
      vy,
      lastTime: now,
      lastX: e.clientX,
      lastY: e.clientY,
    };

    setRotX(nextRotX);
    setRotY(nextRotY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if not supported
    }

    startSpringReturn(velocityRef.current.vx * 0.4, velocityRef.current.vy * 0.4);
  };

  // Standee Tap Simulation
  const triggerNfcTap = (customRating?: number) => {
    const ratingToUse = customRating !== undefined ? customRating : selectedRating;
    if (soundEnabled) playNfcChime();

    setIsRecoil(true);
    setTapBurst(true);

    setTimeout(() => setIsRecoil(false), 240);
    setTimeout(() => setTapBurst(false), 900);

    // Route decision: 4-5 stars -> Google, 1-3 stars -> WhatsApp Shield
    setTimeout(() => {
      if (ratingToUse >= 4) {
        setActiveModal('google');
      } else {
        setActiveModal('whatsapp');
      }
    }, 380);
  };

  const handleSelectStar = (rating: number) => {
    setSelectedRating(rating);
    setComplaintSent(false);
    if (onRatingSelect) onRatingSelect(rating);
    triggerNfcTap(rating);
  };

  const handleResetPosture = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    startSpringReturn(0, 0);
  };

  const activeStarDisplay = hoverRating !== null ? hoverRating : selectedRating;

  return (
    <div className={`relative w-full select-none flex flex-col items-center ${className}`}>
      {/* 3D Scene Controls Header */}
      <div className="w-full flex items-center justify-between px-2 mb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F2A47]/10 text-[#0F2A47] font-semibold text-[11px]">
            <Sparkles size={12} className="text-[#9C7A3C]" />
            <span>Interactive 3D Counter Standee</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] text-[#4A5160] font-mono">
            Drag to Rotate &bull; Dynamic Physics
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="p-1.5 rounded-lg border border-[#E4E7EC] bg-white hover:bg-[#F6F7F9] text-[#4A5160] transition-colors"
            title={soundEnabled ? 'Mute Web Audio Chime' : 'Enable Web Audio Chime'}
            aria-label="Toggle chime audio"
          >
            {soundEnabled ? <Volume2 size={14} className="text-[#0F2A47]" /> : <VolumeX size={14} />}
          </button>
          <button
            type="button"
            onClick={handleResetPosture}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E4E7EC] bg-white hover:bg-[#F6F7F9] text-[#4A5160] text-[11px] font-semibold transition-colors"
            title="Reset to resting isometric angle"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Reset Angle</span>
          </button>
        </div>
      </div>

      {/* 3D Viewport Arena */}
      <div 
        className="relative w-full max-w-md h-[440px] flex items-center justify-center overflow-visible touch-none"
        style={{ perspective: '1100px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ambient Desk Reflection Shadow */}
        <div 
          className="absolute bottom-6 w-64 h-12 rounded-full pointer-events-none transition-transform duration-200"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15, 42, 71, 0.45) 0%, rgba(15, 42, 71, 0.15) 50%, transparent 75%)',
            filter: 'blur(10px)',
            transform: `translate(${rotY * 1.2}px, 0px) scale(${1 - Math.abs(rotX) * 0.005})`,
          }}
        />

        {/* 3D Standee Root Chassis with Euler Drag */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative w-[280px] sm:w-[300px] h-[380px] cursor-grab active:cursor-grabbing transition-transform will-change-transform ${
            isRecoil ? 'scale-[0.97]' : 'scale-100'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) ${
              isRecoil ? 'translateZ(-14px)' : 'translateZ(0px)'
            }`,
            transition: isDragging ? 'none' : 'transform 0.18s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* ACRYLIC STAND BASE (Holding Standee Upright on Counter) */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 rounded-xl bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] border-2 border-[#9C7A3C]/40 shadow-xl flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(18px) rotateX(75deg)',
            }}
          >
            {/* Base Bevel Sheen */}
            <div className="absolute inset-x-2 top-0.5 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />
            <div className="w-32 h-1 bg-[#D4AF37]/50 rounded-full blur-[1px]" />
            <span className="absolute bottom-1 text-[8px] font-mono tracking-widest text-[#9C7A3C] uppercase">
              JSM COUNTER DOCK
            </span>
          </div>

          {/* REAR ACRYLIC REFLECTIVE SLAB (Layer Depth translateZ -8px) */}
          <div
            className="absolute inset-0 rounded-3xl bg-[#091522]/90 border border-[#9C7A3C]/30 shadow-2xl backdrop-blur-md"
            style={{
              transform: 'translateZ(-8px)',
            }}
          />

          {/* ACRYLIC EDGE BEVEL (Side Refraction Simulation) */}
          <div
            className="absolute inset-0 rounded-3xl border-[3px] border-white/20 pointer-events-none"
            style={{
              transform: 'translateZ(0px)',
            }}
          />

          {/* FRONT ACRYLIC FACE (Layer Depth translateZ 12px) */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#0F2A47]/95 via-[#0A1D33]/95 to-[#050E1A]/95 p-5 text-white flex flex-col justify-between border-2 border-[#9C7A3C]/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden"
            style={{
              transform: 'translateZ(12px)',
            }}
          >
            {/* Dynamic Specular Light Glare Gradient */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              style={{
                opacity: isHovered || isDragging ? 0.45 : 0.25,
                background: `linear-gradient(${glareAngle}deg, rgba(255, 255, 255, 0.4) 0%, rgba(212, 175, 55, 0.15) 30%, transparent 65%)`,
              }}
            />

            {/* Top Corporate Branding Strip */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-2.5">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-gradient-to-br from-[#D4AF37] to-[#9C7A3C] flex items-center justify-center font-bold text-[10px] text-[#0F2A47]">
                  J
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] block leading-none">
                    JSM INTEGRATED
                  </span>
                  <span className="text-[8px] text-slate-300 font-mono">
                    PSARA &bull; ISO 9001:2015
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[9px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>NFC ACTIVE</span>
              </div>
            </div>

            {/* Central NFC Target Zone & Energy Pulse Waves */}
            <div className="relative z-10 flex flex-col items-center justify-center py-2 text-center">
              {/* Concentric Energy Pulse Rings */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Ring 1 */}
                <div 
                  className="absolute inset-0 rounded-full border border-[#D4AF37]/50 animate-ping"
                  style={{ animationDuration: '2.4s' }}
                />
                {/* Ring 2 */}
                <div 
                  className="absolute inset-3 rounded-full border border-[#9C7A3C]/60 animate-ping"
                  style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}
                />
                {/* Ring 3 */}
                <div 
                  className="absolute inset-6 rounded-full border border-[#D4AF37]/40 animate-pulse"
                />

                {/* Violent Shockwave Burst on Tap */}
                {tapBurst && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37]/60 to-[#9C7A3C]/60 blur-md scale-150 animate-out fade-out duration-700 pointer-events-none" />
                )}

                {/* Central NFC Induction Core Sensor */}
                <button
                  type="button"
                  onClick={() => triggerNfcTap()}
                  className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0A121E] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] flex flex-col items-center justify-center gap-1 group hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Tap Smartphone Here"
                >
                  <Radio size={20} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-200">
                    TAP NFC
                  </span>
                </button>
              </div>

              <div className="mt-1 space-y-0.5">
                <span className="text-xs font-semibold text-white tracking-wide block">
                  Touch Phone or Scan Below
                </span>
                <span className="text-[10px] text-[#D4AF37] font-medium block">
                  Automated Dual-Routing Review Desk
                </span>
              </div>
            </div>

            {/* Interactive Rating Matrix on Standee */}
            <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-2.5 backdrop-blur-sm space-y-1.5">
              <div className="flex items-center justify-between text-[10px] px-1">
                <span className="text-slate-300 font-medium">Select Star Rating:</span>
                <span className="font-mono font-semibold text-[#D4AF37] tabular-nums">
                  {activeStarDisplay} of 5 Stars
                </span>
              </div>

              {/* Star Rating Buttons */}
              <div className="flex items-center justify-center gap-1.5 py-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectStar(star);
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 rounded hover:scale-125 active:scale-95 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Select ${star} stars`}
                  >
                    <Star
                      size={24}
                      className={`transition-colors drop-shadow ${
                        star <= activeStarDisplay
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600 fill-transparent'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="text-center">
                <span className="text-[9px] font-mono text-slate-300">
                  {selectedRating >= 4 ? (
                    <span className="text-emerald-400">★ 4–5 Stars &rarr; Direct Google Maps Redirect</span>
                  ) : (
                    <span className="text-amber-300">★ 1–3 Stars &rarr; Private WhatsApp Resolution</span>
                  )}
                </span>
              </div>
            </div>

            {/* Bottom Standee Base Bar & QR Chip */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-2 text-[9px] font-mono text-slate-400">
              <div className="flex items-center gap-1">
                <QrCode size={12} className="text-[#9C7A3C]" />
                <span>QR FALLBACK</span>
              </div>
              <span>MODEL: JSM-STAND-3D</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tap Simulator Button Bar */}
      <div className="w-full max-w-sm mt-3 flex items-center gap-2 px-2">
        <button
          type="button"
          onClick={() => triggerNfcTap()}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#9C7A3C] via-[#B89248] to-[#D4AF37] hover:brightness-110 active:scale-98 text-[#0F2A47] font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          <Smartphone size={16} />
          <span>Simulate Smartphone NFC Tap</span>
        </button>
      </div>

      {/* DUAL-ROUTING SIMULATION DIALOG OVERLAYS */}
      <AnimatePresence>
        {/* OUTCOME A: 5-STAR GOOGLE MAPS PREVIEW MODAL */}
        {activeModal === 'google' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border-2 border-emerald-400 space-y-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                      OUTCOME: PUBLIC GOOGLE MAPS ACCELERATION
                    </span>
                    <h4 className="text-base font-bold text-[#14181F]">
                      Google Review Form Auto-Opened
                    </h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="text-[#4A5160] hover:text-[#14181F] text-xs font-semibold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>5-Star Rating Selected ({selectedRating} Stars)</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full">
                    SEO Velocity +1
                  </span>
                </div>
                <p className="text-xs text-[#4A5160] leading-relaxed">
                  The client tapped your physical acrylic NFC standee with a positive rating. The smartphone browser instantly launches your verified Google Business Profile review pop-up with <strong>5 stars pre-selected</strong>.
                </p>
              </div>

              {/* Simulated Google Maps Card */}
              <div className="bg-[#F6F7F9] border border-[#E4E7EC] rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    G
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#14181F] block">Google Maps Review Pop-up</span>
                    <span className="text-[10px] text-[#4A5160]">JSM Integrated Services &bull; Tiruchirappalli HQ</span>
                  </div>
                </div>

                <div className="flex text-amber-400 gap-1 pt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-[#4A5160] italic bg-white p-3 rounded-lg border border-[#E4E7EC]">
                  &quot;Exceptional professionalism and attentive team. Zero queue delay. Highly recommended!&quot;
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E4E7EC]">
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                  <TrendingUp size={14} />
                  <span>Rank #1 in Local 3-Pack</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors min-h-[44px]"
                >
                  Continue Demonstration
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* OUTCOME B: 1-3 STAR PRIVATE WHATSAPP SHIELD MODAL */}
        {activeModal === 'whatsapp' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border-2 border-amber-400 space-y-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                    <ShieldAlert size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider block">
                      OUTCOME: PRIVATE RESOLUTION SHIELD
                    </span>
                    <h4 className="text-base font-bold text-[#14181F]">
                      Google Maps Bypassed &bull; WhatsApp Opened
                    </h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="text-[#4A5160] hover:text-[#14181F] text-xs font-semibold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-950 flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-amber-700" />
                    <span>Dissatisfied Feedback ({selectedRating} Stars) Shielded</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
                    100% Intercepted
                  </span>
                </div>
                <p className="text-xs text-[#4A5160] leading-relaxed">
                  The client rated <strong className="text-amber-800">{selectedRating} stars</strong>. Google Maps is <strong>completely bypassed</strong>. Instead, a private resolution dialog launches straight to Proprietor Sweety J&apos;s executive WhatsApp desk.
                </p>
              </div>

              {/* Private Feedback Drawer */}
              <div className="bg-[#F6F7F9] border border-[#E4E7EC] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#14181F] flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-[#0F2A47]" />
                    <span>Proprietor Sweety J &bull; Private Desk</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                    Confidential
                  </span>
                </div>

                <p className="text-[11px] text-[#4A5160]">
                  &quot;We are deeply sorry we fell short of your expectations. Please let us know how we can resolve this before you leave:&quot;
                </p>

                <textarea
                  rows={2}
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E4E7EC] text-xs text-[#14181F] bg-white focus:ring-2 focus:ring-[#0F2A47]/20 focus:border-[#0F2A47] resize-none"
                />

                <button
                  type="button"
                  onClick={() => setComplaintSent(true)}
                  className="w-full py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Send size={14} />
                  <span>{complaintSent ? 'Sent to Owner WhatsApp (4.9★ Preserved!)' : 'Transmit to Private WhatsApp'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E4E7EC]">
                <span className="text-xs text-amber-900 font-medium">
                  Public Rating Protected: 4.9★ Intact
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-[#14181F] text-xs font-semibold transition-colors min-h-[44px]"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
