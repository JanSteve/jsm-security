'use client';

import React, { useState } from 'react';
import { 
  Stethoscope, 
  UtensilsCrossed, 
  Bell, 
  Plus, 
  Clock, 
  Sparkles, 
  Send,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface QueueSimulatorProps {
  className?: string;
}

interface PatientToken {
  token: number;
  patientName: string;
  estWaitMin: number;
  status: 'consulting' | 'next' | 'waiting';
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

const INITIAL_QUEUE: PatientToken[] = [
  { token: 14, patientName: 'Murugan K.', estWaitMin: 0, status: 'consulting' },
  { token: 15, patientName: 'Priya Sundaram', estWaitMin: 4, status: 'next' },
  { token: 16, patientName: 'Anand R.', estWaitMin: 12, status: 'waiting' },
  { token: 17, patientName: 'Kavitha M.', estWaitMin: 20, status: 'waiting' },
  { token: 18, patientName: 'Balaji S.', estWaitMin: 28, status: 'waiting' },
];

const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'South Indian Executive Thali', price: 180, category: 'Meals' },
  { id: '2', name: 'Ghee Roast Masala Dosa', price: 95, category: 'Tiffin' },
  { id: '3', name: 'Traditional Filter Coffee (Brass Cup)', price: 45, category: 'Beverages' },
  { id: '4', name: 'Special Ghee Pongal & Vada', price: 80, category: 'Tiffin' },
  { id: '5', name: 'Fresh Mint Lime Soda', price: 40, category: 'Beverages' },
];

export function QueueSimulator({ className = '' }: QueueSimulatorProps) {
  const [activeTab, setActiveTab] = useState<'clinic' | 'restaurant'>('clinic');

  // Clinic Mode State
  const [queue, setQueue] = useState<PatientToken[]>(INITIAL_QUEUE);
  const [delayNotice, setDelayNotice] = useState<string | null>(null);
  const [lastNotification, setLastNotification] = useState<string | null>(
    'Token #14 called into Consultation Room #2'
  );

  // Restaurant Mode State
  const [tableNumber, setTableNumber] = useState<number>(7);
  const [cart, setCart] = useState<Record<string, number>>({ '1': 1, '3': 2 });
  const [orderSent, setOrderSent] = useState<boolean>(false);
  const [orderTimestamp, setOrderTimestamp] = useState<string>('12:42 PM');

  // Clinic Handlers
  const handleNextPatient = () => {
    if (queue.length <= 1) return;
    const nextList = queue.slice(1).map((p, idx) => ({
      ...p,
      status: idx === 0 ? ('consulting' as const) : idx === 1 ? ('next' as const) : ('waiting' as const),
      estWaitMin: Math.max(0, p.estWaitMin - 8),
    }));
    setQueue(nextList);
    setLastNotification(`Chime sounded: Token #${nextList[0].token} (${nextList[0].patientName}) called into Room #2`);
  };

  const handleAddWalkin = () => {
    const lastToken = queue[queue.length - 1]?.token || 18;
    const newTokenNum = lastToken + 1;
    const sampleNames = ['Ramesh V.', 'Sangeetha T.', 'Deepak K.', 'Revathi G.', 'Suresh Babu'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const lastWait = queue[queue.length - 1]?.estWaitMin || 0;

    const newPatient: PatientToken = {
      token: newTokenNum,
      patientName: randomName,
      estWaitMin: lastWait + 8,
      status: 'waiting',
    };
    setQueue([...queue, newPatient]);
    setLastNotification(`Walk-in checked in: Token #${newTokenNum} assigned. SMS sent to patient phone.`);
  };

  const handleBroadcastDelay = () => {
    setDelayNotice('Emergency case buffer (+15m) broadcasted to waiting patients on WhatsApp');
    setQueue(
      queue.map((p, idx) =>
        idx === 0 ? p : { ...p, estWaitMin: p.estWaitMin + 15 }
      )
    );
    setTimeout(() => {
      setDelayNotice(null);
    }, 4500);
  };

  // Restaurant Handlers
  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
    setOrderSent(false);
  };

  const cartSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const aggregatorCommissionSaved = Math.round(cartSubtotal * 0.3);

  const handleSendOrder = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrderTimestamp(timeStr);
    setOrderSent(true);
  };

  const currentPatient = queue[0];
  const nextPatient = queue[1];

  return (
    <div className={`bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden ${className}`}>
      {/* Top Selector Banner */}
      <div className="bg-[#0F2A47] text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#9C7A3C] text-xs font-semibold">
              <Sparkles size={14} className="text-[#9C7A3C]" />
              <span>Generative Digital Automation Simulator</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Live Queue &amp; QR Direct Order Flow
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Simulate real-time clinic patient queues and table QR ordering with zero aggregator commissions.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-white/10 p-1 rounded-lg border border-white/15 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('clinic')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all min-h-[44px] ${
                activeTab === 'clinic'
                  ? 'bg-white text-[#0F2A47] shadow-xs'
                  : 'text-white hover:text-white/80'
              }`}
            >
              <Stethoscope size={16} />
              <span>Clinic Token Tracker</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('restaurant')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all min-h-[44px] ${
                activeTab === 'restaurant'
                  ? 'bg-white text-[#0F2A47] shadow-xs'
                  : 'text-white hover:text-white/80'
              }`}
            >
              <UtensilsCrossed size={16} />
              <span>Table QR Order Flow</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* TAB 1: CLINIC TOKEN SIMULATOR */}
        {activeTab === 'clinic' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Doctor Console */}
              <div className="lg:col-span-7 space-y-6">
                {/* Now Serving Display Box */}
                <div className="p-6 rounded-xl bg-[#0F2A47] text-white space-y-4 shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/15 pb-3">
                    <span className="text-[11px] font-mono uppercase text-[#9C7A3C] font-semibold tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Doctor Consultation Terminal &bull; Room #2
                    </span>
                    <span className="text-xs text-slate-300">Dr. S. Ramanathan, MD</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <span className="text-xs text-slate-300 uppercase tracking-wider block">Currently Serving:</span>
                      <div className="text-4xl sm:text-5xl font-mono font-bold text-white tabular-nums">
                        #{currentPatient ? currentPatient.token : '--'}
                      </div>
                      <span className="text-xs font-semibold text-emerald-300 block">
                        {currentPatient ? currentPatient.patientName : 'No Active Patient'}
                      </span>
                    </div>

                    <div className="space-y-1 pl-4 border-l border-white/15">
                      <span className="text-xs text-slate-300 uppercase tracking-wider block">Next Patient Ready:</span>
                      <div className="text-3xl sm:text-4xl font-mono font-semibold text-slate-200 tabular-nums">
                        #{nextPatient ? nextPatient.token : '--'}
                      </div>
                      <span className="text-xs text-slate-300 block">
                        {nextPatient ? `${nextPatient.patientName} (~${nextPatient.estWaitMin}m)` : 'Queue Empty'}
                      </span>
                    </div>
                  </div>

                  {/* Actions Strip */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/15">
                    <button
                      type="button"
                      onClick={handleNextPatient}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-white hover:bg-slate-100 text-[#0F2A47] text-xs font-semibold transition-all min-h-[44px] shadow-xs"
                    >
                      <Bell size={14} className="text-[#0F2A47]" />
                      <span>Call Next Patient</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddWalkin}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-all min-h-[44px]"
                    >
                      <Plus size={14} />
                      <span>Walk-in Check-in</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleBroadcastDelay}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-semibold transition-all min-h-[44px]"
                    >
                      <Clock size={14} />
                      <span>Broadcast Delay</span>
                    </button>
                  </div>
                </div>

                {/* Notifications Log */}
                {delayNotice && (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2 animate-fadeIn">
                    <AlertTriangle size={16} className="text-amber-600 shrink-0" />
                    <span className="font-semibold">{delayNotice}</span>
                  </div>
                )}

                {lastNotification && !delayNotice && (
                  <div className="p-3 bg-[#F6F7F9] border border-[#E4E7EC] rounded-lg text-xs text-[#4A5160] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F2A47]" />
                      <span>{lastNotification}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#4A5160] tabular-nums">Just now</span>
                  </div>
                )}

                {/* Waiting Room Roster */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14181F]">
                    Upcoming Patient Roster ({queue.length} in Queue)
                  </h4>
                  <div className="divide-y divide-[#E4E7EC] border border-[#E4E7EC] rounded-xl overflow-hidden bg-white">
                    {queue.map((item, idx) => (
                      <div
                        key={item.token}
                        className={`p-3.5 flex items-center justify-between transition-colors ${
                          idx === 0
                            ? 'bg-emerald-50/70 text-emerald-950'
                            : idx === 1
                            ? 'bg-amber-50/50'
                            : 'hover:bg-[#F6F7F9]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-9 h-9 rounded-md font-mono font-bold text-sm flex items-center justify-center tabular-nums ${
                              idx === 0
                                ? 'bg-emerald-600 text-white'
                                : idx === 1
                                ? 'bg-amber-600 text-white'
                                : 'bg-[#F6F7F9] text-[#14181F] border border-[#E4E7EC]'
                            }`}
                          >
                            #{item.token}
                          </span>
                          <div>
                            <span className="text-xs font-semibold text-[#14181F] block">
                              {item.patientName}
                            </span>
                            <span className="text-[11px] text-[#4A5160]">
                              {idx === 0 ? 'Inside Consulting Room' : idx === 1 ? 'Standby Outside Door' : 'Waiting in Lobby / Nearby Cafe'}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-mono font-semibold text-[#14181F] block tabular-nums">
                            {idx === 0 ? 'In Session' : `Est. ${item.estWaitMin} mins`}
                          </span>
                          <span className="text-[10px] text-[#4A5160] uppercase tracking-wider">
                            {idx === 0 ? 'Active' : 'Wait Time'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Simulated Patient Smartphone Screen */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-sm rounded-[32px] border-4 border-[#0F2A47] bg-[#F6F7F9] p-4 shadow-lg space-y-4">
                  {/* Phone Notch & Status */}
                  <div className="flex items-center justify-between text-[11px] font-mono px-3 text-[#4A5160]">
                    <span>9:41 AM</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      WhatsApp Live Sync
                    </span>
                    <span>100%</span>
                  </div>

                  {/* WhatsApp Bot Message Bubble */}
                  <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-2xs space-y-3 text-left">
                    <div className="flex items-center gap-2 border-b border-[#E4E7EC] pb-2">
                      <div className="w-7 h-7 rounded-full bg-[#0F2A47] text-white flex items-center justify-center text-xs font-bold">
                        J
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-[#14181F]">Dr. Ramanathan Clinic Bot</h5>
                        <p className="text-[10px] text-[#4A5160]">Official Verified Business</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#14181F]">
                      <p>
                        Hello <strong>{nextPatient ? nextPatient.patientName : 'Patient'}</strong>, your live token status:
                      </p>
                      <div className="p-3 bg-[#0F2A47]/5 rounded-xl border border-[#0F2A47]/10 space-y-1">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[11px] text-[#4A5160]">Your Token:</span>
                          <span className="font-mono text-lg font-bold text-[#0F2A47] tabular-nums">
                            #{nextPatient ? nextPatient.token : 15}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-[11px] text-[#4A5160]">Now Serving:</span>
                          <span className="font-mono text-sm font-semibold text-emerald-700 tabular-nums">
                            #{currentPatient ? currentPatient.token : 14}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-[11px] text-[#4A5160]">Estimated Wait:</span>
                          <span className="font-mono text-sm font-semibold text-amber-700 tabular-nums">
                            {nextPatient ? nextPatient.estWaitMin : 4} minutes
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#4A5160] pt-1 leading-relaxed">
                        💡 Feel free to wait in your car or at a nearby cafe. We will buzz your phone when 1 patient remains ahead of you.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E4E7EC] flex gap-2">
                      <button
                        type="button"
                        onClick={handleNextPatient}
                        className="w-full py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-semibold transition-colors min-h-[44px]"
                      >
                        Refresh Token Status
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-center text-[#4A5160]">
                    Zero waiting room congestion. Deployed across 30+ clinics in Trichy, Madurai, &amp; Chennai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESTAURANT TABLE QR SIMULATOR */}
        {activeTab === 'restaurant' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Digital Table Menu & Cart */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between bg-[#F6F7F9] p-4 rounded-xl border border-[#E4E7EC]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0F2A47] text-white flex items-center justify-center font-mono font-bold text-sm">
                      T-{tableNumber}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#14181F]">Table #{tableNumber} Digital Standee</h4>
                      <p className="text-xs text-[#4A5160]">Scan &bull; Order &bull; Sent Straight to Kitchen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-[#4A5160]">Change Table:</span>
                    {[3, 7, 12].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => { setTableNumber(num); setOrderSent(false); }}
                        className={`px-3 py-2 rounded-md text-xs font-semibold min-h-[44px] min-w-[44px] flex items-center justify-center ${
                          tableNumber === num
                            ? 'bg-[#0F2A47] text-white'
                            : 'bg-white border border-[#E4E7EC] text-[#4A5160]'
                        }`}
                      >
                        #{num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Menu Item Cards */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14181F]">
                    Restaurant Menu Items
                  </h4>
                  <div className="space-y-2.5">
                    {MENU_ITEMS.map((item) => {
                      const qty = cart[item.id] || 0;
                      return (
                        <div
                          key={item.id}
                          className="p-3.5 bg-white border border-[#E4E7EC] rounded-xl flex items-center justify-between hover:border-[#0F2A47]/30 transition-colors"
                        >
                          <div>
                            <span className="text-xs font-semibold text-[#14181F] block">{item.name}</span>
                            <span className="text-[11px] text-[#4A5160] font-mono tabular-nums">
                              ₹{item.price} &bull; {item.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {qty > 0 ? (
                              <div className="flex items-center gap-2 bg-[#F6F7F9] border border-[#E4E7EC] rounded-lg p-1">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-11 h-11 rounded bg-white hover:bg-slate-100 text-[#14181F] font-bold text-sm flex items-center justify-center min-h-[44px] min-w-[44px]"
                                >
                                  -
                                </button>
                                <span className="font-mono font-semibold text-xs px-2 tabular-nums">{qty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-11 h-11 rounded bg-[#0F2A47] text-white hover:bg-[#0A1E33] font-bold text-sm flex items-center justify-center min-h-[44px] min-w-[44px]"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-4 py-2 rounded-lg bg-[#0F2A47] hover:bg-[#0A1E33] text-white text-xs font-semibold transition-colors min-h-[44px]"
                              >
                                Add +
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cart Subtotal & Action */}
                <div className="p-5 bg-[#F6F7F9] rounded-xl border border-[#E4E7EC] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#4A5160]">
                    <span>Cart Items:</span>
                    <span className="font-mono tabular-nums font-semibold text-[#14181F]">
                      {Object.values(cart).reduce((a, b) => a + b, 0)} items
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base font-semibold text-[#14181F]">
                    <span>Subtotal:</span>
                    <span className="font-mono font-bold text-xl text-[#0F2A47] tabular-nums">
                      ₹{cartSubtotal}
                    </span>
                  </div>
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
                    <span>30% Swiggy / Zomato Commission Saved:</span>
                    <strong className="font-mono font-bold text-emerald-800 tabular-nums">
                      +₹{aggregatorCommissionSaved} Direct Profit
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOrder}
                    disabled={cartSubtotal === 0}
                    className="w-full py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-50"
                  >
                    <Send size={16} />
                    <span>Send Order Direct to Kitchen on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Simulated Kitchen Display & WhatsApp Ticket */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-sm rounded-[32px] border-4 border-[#0F2A47] bg-[#F6F7F9] p-4 shadow-lg space-y-4">
                  {/* Phone Notch */}
                  <div className="flex items-center justify-between text-[11px] font-mono px-3 text-[#4A5160]">
                    <span>12:42 PM</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      Kitchen WhatsApp Ticket
                    </span>
                    <span>100%</span>
                  </div>

                  {/* Kitchen Order Ticket */}
                  <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-2xs space-y-3 text-left">
                    <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-2">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider block">
                          {orderSent ? '✅ KITCHEN RECEIVED' : '⏳ PENDING SUBMISSION'}
                        </span>
                        <h5 className="text-sm font-bold text-[#14181F]">Table #{tableNumber} Ticket</h5>
                      </div>
                      <span className="text-xs font-mono text-[#4A5160] tabular-nums">{orderTimestamp}</span>
                    </div>

                    <div className="space-y-2 pt-1 font-mono text-xs">
                      {Object.entries(cart).map(([id, qty]) => {
                        const item = MENU_ITEMS.find((m) => m.id === id);
                        if (!item) return null;
                        return (
                          <div key={id} className="flex justify-between items-center text-[#14181F]">
                            <span>{qty}x {item.name}</span>
                            <span className="font-semibold tabular-nums">₹{item.price * qty}</span>
                          </div>
                        );
                      })}
                      <div className="border-t border-dashed border-[#E4E7EC] pt-2 flex justify-between font-bold text-sm text-[#0F2A47]">
                        <span>TOTAL PAYABLE:</span>
                        <span className="tabular-nums">₹{cartSubtotal}</span>
                      </div>
                    </div>

                    {orderSent ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                          <CheckCircle2 size={14} className="text-emerald-600" />
                          <span>Kitchen Chef Station Buzzed</span>
                        </div>
                        <p className="text-[11px] text-emerald-700 leading-snug">
                          Ticket printed automatically on POS thermal printer. Zero manual billing delay.
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-[#F6F7F9] rounded-lg text-[11px] text-[#4A5160] text-center">
                        Add items and tap &quot;Send Order&quot; to test kitchen webhook trigger.
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-white border border-[#E4E7EC] rounded-xl text-xs space-y-1 text-left">
                    <span className="font-semibold text-[#14181F] block">Zero Hardware Investment:</span>
                    <p className="text-[11px] text-[#4A5160]">
                      Runs on standard laminated acrylic standees. No expensive tablet computers needed at every table.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
