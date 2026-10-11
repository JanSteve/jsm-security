'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UtensilsCrossed, 
  Stethoscope, 
  Check, 
  CheckCheck, 
  Send, 
  Plus, 
  Minus, 
  Bell, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  RotateCcw,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export interface WhatsappPhone3DProps {
  initialMode?: 'table-order' | 'clinic-token';
  className?: string;
  compact?: boolean;
  onModeChange?: (mode: 'table-order' | 'clinic-token') => void;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface PatientToken {
  token: number;
  patientName: string;
  estWaitMin: number;
  status: 'consulting' | 'next' | 'waiting';
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'South Indian Executive Thali', price: 180, category: 'Meals' },
  { id: '2', name: 'Ghee Roast Masala Dosa', price: 95, category: 'Tiffin' },
  { id: '3', name: 'Traditional Filter Coffee (Brass Cup)', price: 45, category: 'Beverages' },
  { id: '4', name: 'Special Ghee Pongal & Vada', price: 80, category: 'Tiffin' },
];

const INITIAL_QUEUE: PatientToken[] = [
  { token: 14, patientName: 'Murugan K.', estWaitMin: 0, status: 'consulting' },
  { token: 15, patientName: 'Priya Sundaram', estWaitMin: 4, status: 'next' },
  { token: 16, patientName: 'Anand R.', estWaitMin: 12, status: 'waiting' },
  { token: 17, patientName: 'Kavitha M.', estWaitMin: 20, status: 'waiting' },
];

export function WhatsappPhone3D({
  initialMode = 'table-order',
  className = '',
  compact = false,
  onModeChange,
}: WhatsappPhone3DProps) {
  const [activeMode, setActiveMode] = useState<'table-order' | 'clinic-token'>(initialMode);

  // 3D Perspective Tilt on Hover
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 8, y: -12 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Restaurant Mode State
  const [tableNumber, setTableNumber] = useState<number>(7);
  const [cart, setCart] = useState<Record<string, number>>({ '1': 1, '3': 2 });
  const [orderSent, setOrderSent] = useState<boolean>(false);
  const [orderTime, setOrderTime] = useState<string>('12:44 PM');
  const [blueTicksDelivered, setBlueTicksDelivered] = useState<boolean>(false);

  // Clinic Mode State
  const [queue, setQueue] = useState<PatientToken[]>(INITIAL_QUEUE);
  const [clinicNotification, setClinicNotification] = useState<string | null>(null);
  const [clinicTicksDelivered, setClinicTicksDelivered] = useState<boolean>(true);
  const [emergencyDelayBroadcasted, setEmergencyDelayBroadcasted] = useState<boolean>(false);

  // Notification Toast Banner
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(null), 3500);
  };

  // Switch Mode
  const handleModeSwitch = (mode: 'table-order' | 'clinic-token') => {
    setActiveMode(mode);
    if (onModeChange) onModeChange(mode);
  };

  // Restaurant Handlers
  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) => {
      const cur = prev[id] || 0;
      const next = cur + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
    setOrderSent(false);
    setBlueTicksDelivered(false);
  };

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const commissionSaved = Math.round(cartTotal * 0.3);

  const handlePlaceOrder = () => {
    if (cartTotal === 0) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrderTime(timeStr);
    setOrderSent(true);
    setBlueTicksDelivered(false);
    showToast(`🍽️ Table #${tableNumber} order dispatched to kitchen!`);

    // Simulate WhatsApp double blue delivery ticks after 800ms
    setTimeout(() => {
      setBlueTicksDelivered(true);
    }, 900);
  };

  // Clinic Handlers
  const handleAdvanceQueue = () => {
    if (queue.length <= 1) return;
    const nextQueue = queue.slice(1).map((p, idx) => ({
      ...p,
      status: idx === 0 ? ('consulting' as const) : idx === 1 ? ('next' as const) : ('waiting' as const),
      estWaitMin: Math.max(0, p.estWaitMin - 8),
    }));
    setQueue(nextQueue);
    setClinicTicksDelivered(false);

    const called = nextQueue[0];
    const summonsMsg = `Token #${called.token} (${called.patientName}) called into Consultation Room #2.`;
    setClinicNotification(summonsMsg);
    showToast(`🔔 Patient Summons: ${called.patientName} (#${called.token})`);

    setTimeout(() => {
      setClinicTicksDelivered(true);
    }, 700);
  };

  const handleBroadcastDelay = () => {
    setEmergencyDelayBroadcasted(true);
    setQueue(queue.map((p, idx) => idx === 0 ? p : { ...p, estWaitMin: p.estWaitMin + 15 }));
    showToast('⚠️ +15m emergency buffer broadcasted to all patient WhatsApps');
    setTimeout(() => setEmergencyDelayBroadcasted(false), 5000);
  };

  const handleAddWalkin = () => {
    const lastToken = queue[queue.length - 1]?.token || 17;
    const nextNum = lastToken + 1;
    const names = ['Karthik N.', 'Revathi G.', 'Suresh Babu', 'Meenakshi S.'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const lastWait = queue[queue.length - 1]?.estWaitMin || 0;

    const newPatient: PatientToken = {
      token: nextNum,
      patientName: randomName,
      estWaitMin: lastWait + 8,
      status: 'waiting',
    };
    setQueue([...queue, newPatient]);
    showToast(`Token #${nextNum} generated for ${randomName}`);
  };

  // Pointer Hover Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    // Pitch: yPct (-0.5 to 0.5) -> range [14, 2]
    // Yaw: xPct (-0.5 to 0.5) -> range [-20, -4]
    setTilt({
      x: 8 - yPct * 12,
      y: -12 + xPct * 16,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 8, y: -12 });
  };

  const currentServing = queue[0];
  const nextInLine = queue[1];

  return (
    <div className={`w-full flex flex-col items-center select-none ${className}`}>
      {/* Mode Selector Tabs */}
      <div className="w-full max-w-md flex items-center justify-between p-1 bg-[#F6F7F9] border border-[#E4E7EC] rounded-xl mb-4 text-xs">
        <button
          type="button"
          onClick={() => handleModeSwitch('table-order')}
          className={`flex-1 py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${
            activeMode === 'table-order'
              ? 'bg-[#0F2A47] text-white shadow-xs'
              : 'text-[#4A5160] hover:text-[#14181F]'
          }`}
        >
          <UtensilsCrossed size={14} />
          <span>Restaurant Table QR</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeSwitch('clinic-token')}
          className={`flex-1 py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${
            activeMode === 'clinic-token'
              ? 'bg-[#0F2A47] text-white shadow-xs'
              : 'text-[#4A5160] hover:text-[#14181F]'
          }`}
        >
          <Stethoscope size={14} />
          <span>Clinic Token Tracker</span>
        </button>
      </div>

      {/* 3D Smartphone Viewport Container */}
      <div 
        ref={phoneRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-sm h-[560px] flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {/* Ambient Floor Shadow */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.45, 0.3, 0.45],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-4 w-60 h-10 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15, 42, 71, 0.5) 0%, rgba(15, 42, 71, 0.15) 50%, transparent 75%)',
            filter: 'blur(12px)',
          }}
        />

        {/* 3D Floating Glass Smartphone Mockup Chassis */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotateZ: [-1, 1.5, -1],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            transformStyle: 'preserve-3d',
            rotateX: isHovered ? tilt.x : 8,
            rotateY: isHovered ? tilt.y : -12,
            transition: isHovered ? 'rotateX 0.12s ease-out, rotateY 0.12s ease-out' : 'rotateX 0.4s ease-out, rotateY 0.4s ease-out',
          }}
          className="relative w-[310px] h-[520px] rounded-[48px] p-3 bg-gradient-to-br from-[#334155] via-[#1E293B] to-[#0A101D] border-2 border-[#9C7A3C]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] will-change-transform"
        >
          {/* Frosted Titanium Outer Rim Glare */}
          <div className="absolute inset-0 rounded-[48px] pointer-events-none border border-white/20 shadow-inner" />

          {/* Smartphone Inner Screen Chassis */}
          <div className="relative w-full h-full rounded-[38px] bg-[#0C121D] overflow-hidden flex flex-col justify-between text-white border border-white/10 shadow-2xl">
            {/* Dynamic Island Notch & Status Bar */}
            <div className="relative z-20 pt-2 px-4 pb-1 flex flex-col items-center bg-[#070B12]">
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-300 px-1">
                <span>9:41</span>
                {/* Dynamic Island Pill */}
                <div className="w-24 h-5 rounded-full bg-black flex items-center justify-center gap-1.5 px-2 border border-white/10 shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[8px] font-mono text-slate-200 uppercase tracking-wider">
                    WhatsApp Live
                  </span>
                </div>
                <span>5G &bull; 100%</span>
              </div>

              {/* Dynamic Drop Toast Banner from Notch */}
              <AnimatePresence>
                {activeToast && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="absolute top-8 inset-x-2 z-30 p-2 rounded-xl bg-[#1E293B] border border-[#9C7A3C]/50 shadow-lg text-[10px] font-semibold text-white flex items-center gap-1.5"
                  >
                    <Bell size={12} className="text-[#D4AF37] shrink-0" />
                    <span className="truncate">{activeToast}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* WhatsApp Header Bar */}
            <div className="relative z-10 px-3.5 py-2 bg-[#075E54] text-white flex items-center justify-between border-b border-white/10 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white">
                  {activeMode === 'table-order' ? '🍽️' : '🏥'}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold block leading-tight">
                      {activeMode === 'table-order' ? 'JSM Kitchen Desk' : 'Dr. Ramanathan Clinic'}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400 text-[#075E54] text-[8px] font-bold flex items-center justify-center">
                      ✓
                    </span>
                  </div>
                  <span className="text-[9px] text-emerald-200 font-mono">
                    Official Verified Business
                  </span>
                </div>
              </div>

              <div className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-slate-200">
                {activeMode === 'table-order' ? `Table #${tableNumber}` : 'Room #2'}
              </div>
            </div>

            {/* Screen Chat Arena (Scrollable / Interactive Area) */}
            <div className="relative z-10 flex-1 p-3 overflow-y-auto space-y-3 bg-[#0B141A] text-xs">
              {/* MODE A: RESTAURANT TABLE QR FEED */}
              {activeMode === 'table-order' && (
                <div className="space-y-3">
                  {/* Table Selection Strip */}
                  <div className="flex items-center justify-between bg-white/5 p-2 rounded-xl border border-white/10 text-[10px]">
                    <span className="text-slate-300 font-medium">Table QR:</span>
                    <div className="flex gap-1">
                      {[3, 7, 12].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => { setTableNumber(num); setOrderSent(false); }}
                          className={`px-2 py-1 rounded-md font-mono font-bold transition-all ${
                            tableNumber === num
                              ? 'bg-[#25D366] text-[#0B141A]'
                              : 'bg-white/10 text-slate-300 hover:bg-white/20'
                          }`}
                        >
                          #{num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Menu Items Quick Selector */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block px-1">
                      Live Menu Items:
                    </span>
                    {MENU_ITEMS.map((item) => {
                      const qty = cart[item.id] || 0;
                      return (
                        <div
                          key={item.id}
                          className="p-2 rounded-lg bg-[#111B21] border border-white/10 flex items-center justify-between text-[11px]"
                        >
                          <div className="truncate pr-1">
                            <span className="font-semibold block truncate text-slate-200">{item.name}</span>
                            <span className="text-[10px] text-[#9C7A3C] font-mono">₹{item.price}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-black/40 rounded-md p-0.5 border border-white/10">
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, -1)}
                              className="w-5 h-5 rounded bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20"
                            >
                              -
                            </button>
                            <span className="font-mono px-1 font-bold text-white text-[10px]">{qty}</span>
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, 1)}
                              className="w-5 h-5 rounded bg-[#25D366] text-[#0B141A] font-bold flex items-center justify-center hover:bg-[#20ba59]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Incoming WhatsApp Order Message Bubble */}
                  <AnimatePresence>
                    {orderSent && (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="p-2.5 rounded-2xl rounded-tl-none bg-[#005C4B] text-white border border-emerald-400/30 space-y-1.5 shadow-md"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-emerald-200 border-b border-white/15 pb-1">
                          <span>KITCHEN CONFIRMED &bull; Table #{tableNumber}</span>
                          <span>{orderTime}</span>
                        </div>

                        <div className="space-y-1 text-[11px] font-mono">
                          {Object.entries(cart).map(([id, qty]) => {
                            const item = MENU_ITEMS.find((m) => m.id === id);
                            if (!item) return null;
                            return (
                              <div key={id} className="flex justify-between">
                                <span>{qty}x {item.name}</span>
                                <span>₹{item.price * qty}</span>
                              </div>
                            );
                          })}
                          <div className="border-t border-white/20 pt-1 flex justify-between font-bold text-emerald-300">
                            <span>TOTAL PAID:</span>
                            <span>₹{cartTotal}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[9px] text-emerald-200 pt-1">
                          <span>Est. Prep: ~12 mins</span>
                          <span className="flex items-center gap-0.5">
                            {blueTicksDelivered ? (
                              <CheckCheck size={14} className="text-[#34B7F1]" />
                            ) : (
                              <Check size={14} className="text-slate-300" />
                            )}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* MODE B: CLINIC TOKEN TRACKER FEED */}
              {activeMode === 'clinic-token' && (
                <div className="space-y-3">
                  {/* Status Banner */}
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#9C7A3C]/40 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-300">
                      <span>Room #2 &bull; Dr. Ramanathan</span>
                      <span className="text-emerald-400 font-semibold">Active Session</span>
                    </div>
                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Now Serving:</span>
                        <span className="text-2xl font-mono font-bold text-white tabular-nums">
                          #{currentServing ? currentServing.token : '--'}
                        </span>
                        <span className="text-[10px] text-emerald-300 font-semibold block truncate">
                          {currentServing ? currentServing.patientName : 'None'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Next Patient:</span>
                        <span className="text-lg font-mono font-bold text-amber-300 tabular-nums">
                          #{nextInLine ? nextInLine.token : '--'}
                        </span>
                        <span className="text-[10px] text-slate-300 block">
                          {nextInLine ? `~${nextInLine.estWaitMin}m wait` : 'Queue Empty'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Delay Notice */}
                  {emergencyDelayBroadcasted && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2 rounded-lg bg-amber-950/80 border border-amber-500/50 text-[10px] text-amber-200 flex items-center gap-1.5"
                    >
                      <AlertTriangle size={14} className="text-amber-400 shrink-0" />
                      <span>+15m Emergency Buffer Broadcasted</span>
                    </motion.div>
                  )}

                  {/* Patient WhatsApp Summons Message Bubble */}
                  <div className="p-2.5 rounded-2xl rounded-tl-none bg-[#005C4B] text-white border border-emerald-400/30 space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between text-[10px] font-mono text-emerald-200 border-b border-white/15 pb-1">
                      <span>TOKEN SUMMONS &bull; ROOM #2</span>
                      <span>9:41 AM</span>
                    </div>

                    <p className="text-[11px] leading-snug">
                      Hello <strong>{nextInLine ? nextInLine.patientName : 'Patient'}</strong>: Consultation Room #2 is ready. Please step inside.
                    </p>

                    <div className="p-1.5 rounded-lg bg-black/30 border border-white/10 flex justify-between items-center text-[10px] font-mono">
                      <span>Token #{nextInLine ? nextInLine.token : 15}</span>
                      <span className="text-emerald-300 font-bold">READY TO CONSULT</span>
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-emerald-200 pt-1">
                      <span>Sent via JSM WhatsApp Cloud</span>
                      <span className="flex items-center gap-0.5">
                        {clinicTicksDelivered ? (
                          <CheckCheck size={14} className="text-[#34B7F1]" />
                        ) : (
                          <Check size={14} className="text-slate-300" />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Upcoming Queue Roster */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block px-1">
                      Waiting Patients ({queue.length}):
                    </span>
                    <div className="space-y-1">
                      {queue.slice(1, 4).map((p) => (
                        <div
                          key={p.token}
                          className="p-1.5 rounded-lg bg-[#111B21] border border-white/5 flex items-center justify-between text-[10px]"
                        >
                          <span className="font-mono font-bold text-amber-300">#{p.token}</span>
                          <span className="text-slate-300 font-medium truncate max-w-[120px]">{p.patientName}</span>
                          <span className="font-mono text-slate-400">~{p.estWaitMin}m</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Screen Action Panel */}
            <div className="relative z-20 p-2.5 bg-[#070B12] border-t border-white/10 space-y-2">
              {activeMode === 'table-order' ? (
                <div>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={cartTotal === 0}
                    className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-[#0B141A] font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 min-h-[44px]"
                  >
                    <Send size={14} />
                    <span>Place Order (₹{cartTotal}) &bull; Save ₹{commissionSaved}</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={handleAdvanceQueue}
                    className="flex-1 py-2 px-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-[#0B141A] font-bold text-xs transition-all flex items-center justify-center gap-1 min-h-[44px]"
                  >
                    <Bell size={13} />
                    <span>Call Next</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleBroadcastDelay}
                    className="py-2 px-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 font-semibold text-[10px] transition-all min-h-[44px]"
                    title="Broadcast 15m delay"
                  >
                    +15m
                  </button>
                  <button
                    type="button"
                    onClick={handleAddWalkin}
                    className="py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-[10px] transition-all min-h-[44px]"
                    title="Add Walk-in Token"
                  >
                    +Add
                  </button>
                </div>
              )}

              {/* Bottom Home Indicator Bar */}
              <div className="w-24 h-1 rounded-full bg-white/30 mx-auto" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Direct Value Summary Badge */}
      <div className="mt-3 flex items-center gap-2 text-xs text-[#4A5160] font-medium">
        <TrendingUp size={14} className="text-[#9C7A3C]" />
        <span>
          {activeMode === 'table-order' 
            ? 'Saves 30% aggregator commission per order (Direct WhatsApp Billing)' 
            : 'Eliminates 100% of waiting room congestion via automated WhatsApp summons'}
        </span>
      </div>
    </div>
  );
}
