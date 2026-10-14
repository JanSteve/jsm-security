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
  Check,
  AlertTriangle 
} from 'lucide-react';

function FlatWhatsAppPreview({ mode }: { mode: 'clinic-token' | 'table-order' }) {
  return (
    <div className="w-full max-w-[320px] rounded-2xl bg-[#050A12] text-white overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(14,165,233,0.20)]">
      <div className="bg-[#0B1520] p-3 flex items-center gap-2.5 border-b border-cyan-500/20">
        <div className="w-8 h-8 rounded-full bg-[#25D366] text-black font-bold flex items-center justify-center text-xs">JSM</div>
        <div className="text-left flex-1 min-w-0">
          <div className="text-xs font-semibold text-white truncate">
            {mode === 'clinic-token' ? 'Dr. Clinic Token Desk' : 'Restaurant Table Order'}
          </div>
          <div className="text-[10px] text-emerald-400">WhatsApp Business API &bull; Active</div>
        </div>
      </div>
      <div className="p-4 space-y-3 bg-[#050A12] min-h-[220px] text-left text-xs font-sans">
        <div className="p-3 rounded-lg bg-[#005c4b] text-white shadow space-y-1 max-w-[90%] self-end ml-auto">
          <div className="text-[10px] text-emerald-200 font-bold uppercase">
            {mode === 'clinic-token' ? '🏥 TOKEN PASS DISPATCH' : '🍽️ TABLE ORDER CONFIRMED'}
          </div>
          <p className="text-xs text-white leading-relaxed">
            {mode === 'clinic-token' 
              ? 'Hello Murugan K., your Token #14 is consulting with the doctor. Estimated wait: 0 mins.'
              : 'Order Received! Table #4: 2x Ghee Roast Dosa, 1x Filter Coffee. Total: ₹210. Direct to kitchen.'}
          </p>
          <div className="text-[9px] text-emerald-200 text-right">Just now &bull; ✓✓ Delivered</div>
        </div>
      </div>
      <div className="p-2.5 bg-[#0B1520] text-[10px] text-cyan-400/80 text-center border-t border-cyan-500/20 font-mono">
        AUTOMATED VIA JSM WHATSAPP CLOUD API
      </div>
    </div>
  );
}
export interface QueueSimulatorProps {
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
  { id: '3', name: 'Traditional Filter Coffee (Stainless Steel Tumbler)', price: 45, category: 'Beverages' },
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
    setOrderSent(true);
  };

  const currentPatient = queue[0];
  const nextPatient = queue[1];

  return (
    <div className={`tactical-glass-card border-cyan-500/30 text-white rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-hidden ${className}`}>
      {/* Top Selector Banner */}
      <div className="bg-white/[0.03] border-b border-cyan-500/20 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-xs font-semibold border border-cyan-400/30 shadow-[0_0_12px_rgba(14,165,233,0.15)]">
              <Sparkles size={14} className="text-cyan-400" />
              <span>Interactive 3D Hardware &amp; WhatsApp Simulator</span>
            </div>
            <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Live Queue &amp; QR Direct Order Flow
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
              Interact with our floating 3D glass smartphone mockup running live clinic patient tokens and table QR ordering with zero aggregator commissions.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-black/40 p-1 rounded-lg border border-cyan-500/30 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('clinic')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all min-h-[44px] cursor-pointer ${
                activeTab === 'clinic'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.30)] font-bold'
                  : 'text-neutral-300 hover:text-white border border-transparent'
              }`}
            >
              <Stethoscope size={16} />
              <span>Clinic Token Tracker</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('restaurant')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all min-h-[44px] cursor-pointer ${
                activeTab === 'restaurant'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.30)] font-bold'
                  : 'text-neutral-300 hover:text-white border border-transparent'
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Doctor Console (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Now Serving Display Box */}
                <div className="p-6 rounded-xl bg-[#050A14]/90 border border-cyan-500/30 text-white space-y-4 shadow-xl relative overflow-hidden backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                    <span className="text-[11px] font-mono uppercase text-cyan-300 font-semibold tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Doctor Consultation Terminal &bull; Room #2
                    </span>
                    <span className="text-xs text-neutral-400">Dr. S. Ramanathan, MD</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <span className="text-xs text-neutral-400 uppercase tracking-wider block">Currently Serving:</span>
                      <div className="text-4xl sm:text-5xl font-mono font-bold text-cyan-300 tabular-nums drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                        #{currentPatient ? currentPatient.token : '--'}
                      </div>
                      <span className="text-xs font-semibold text-emerald-300 block">
                        {currentPatient ? currentPatient.patientName : 'No Active Patient'}
                      </span>
                    </div>

                    <div className="space-y-1 pl-4 border-l border-cyan-500/20">
                      <span className="text-xs text-neutral-400 uppercase tracking-wider block">Next Patient Ready:</span>
                      <div className="text-3xl sm:text-4xl font-mono font-semibold text-neutral-200 tabular-nums">
                        #{nextPatient ? nextPatient.token : '--'}
                      </div>
                      <span className="text-xs text-neutral-400 block">
                        {nextPatient ? `${nextPatient.patientName} (~${nextPatient.estWaitMin}m)` : 'Queue Empty'}
                      </span>
                    </div>
                  </div>

                  {/* Actions Strip */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-cyan-500/20">
                    <button
                      type="button"
                      onClick={handleNextPatient}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-black text-xs font-bold transition-all min-h-[44px] shadow-[0_0_20px_rgba(14,165,233,0.40)] press-scale cursor-pointer"
                    >
                      <Bell size={14} className="text-black" />
                      <span>Call Next Patient</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddWalkin}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 text-xs font-semibold transition-all min-h-[44px] cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Walk-in Check-in</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleBroadcastDelay}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-semibold transition-all min-h-[44px] cursor-pointer"
                    >
                      <Clock size={14} />
                      <span>Broadcast Delay</span>
                    </button>
                  </div>
                </div>

                {/* Notifications Log */}
                {delayNotice && (
                  <div className="p-3.5 bg-amber-950/40 border border-amber-500/30 rounded-lg text-xs text-amber-200 flex items-center gap-2 animate-fadeIn">
                    <AlertTriangle size={16} className="text-amber-400 shrink-0" />
                    <span className="font-semibold">{delayNotice}</span>
                  </div>
                )}

                {lastNotification && !delayNotice && (
                  <div className="p-3 bg-white/[0.03] border border-cyan-500/20 rounded-lg text-xs text-neutral-300 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38BDF8]" />
                      <span>{lastNotification}</span>
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 tabular-nums">Just now</span>
                  </div>
                )}

                {/* Waiting Room Roster */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
                    Upcoming Patient Roster ({queue.length} in Queue)
                  </h4>
                  <div className="divide-y divide-white/10 border border-cyan-500/20 rounded-xl overflow-hidden bg-white/[0.02]">
                    {queue.map((item, idx) => (
                      <div
                        key={item.token}
                        className={`p-3.5 flex items-center justify-between transition-colors ${
                          idx === 0
                            ? 'bg-emerald-950/40 text-white border-l-2 border-emerald-400'
                            : idx === 1
                            ? 'bg-cyan-950/30 text-white border-l-2 border-cyan-400'
                            : 'hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-9 h-9 rounded-md font-mono font-bold text-sm flex items-center justify-center tabular-nums ${
                              idx === 0
                                ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                                : idx === 1
                                ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(14,165,233,0.3)]'
                                : 'bg-white/10 text-neutral-200 border border-white/10'
                            }`}
                          >
                            #{item.token}
                          </span>
                          <div>
                            <span className="text-xs font-semibold text-white block">
                              {item.patientName}
                            </span>
                            <span className="text-[11px] text-neutral-400">
                              {idx === 0 ? 'Inside Consulting Room' : idx === 1 ? 'Standby Outside Door' : 'Waiting in Lobby / Nearby Cafe'}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-mono font-semibold text-white block tabular-nums">
                            {idx === 0 ? 'In Session' : `Est. ${item.estWaitMin} mins`}
                          </span>
                          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                            {idx === 0 ? 'Active' : 'Wait Time'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Sleek WhatsApp Dispatch Card (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <FlatWhatsAppPreview mode="clinic-token" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESTAURANT TABLE QR SIMULATOR */}
        {activeTab === 'restaurant' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Digital Table Menu & Cart (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between bg-white/[0.03] p-4 rounded-xl border border-cyan-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-mono font-bold text-sm shadow-[0_0_10px_rgba(14,165,233,0.15)]">
                      T-{tableNumber}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Table #{tableNumber} Digital Standee</h4>
                      <p className="text-xs text-neutral-400">Scan &bull; Order &bull; Sent Straight to Kitchen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-neutral-400">Change Table:</span>
                    {[3, 7, 12].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => { setTableNumber(num); setOrderSent(false); }}
                        className={`px-3 py-2 rounded-md text-xs font-semibold min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer ${
                          tableNumber === num
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.30)] font-bold'
                            : 'bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        #{num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Menu Item Cards */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
                    Restaurant Menu Items
                  </h4>
                  <div className="space-y-2.5">
                    {MENU_ITEMS.map((item) => {
                      const qty = cart[item.id] || 0;
                      return (
                        <div
                          key={item.id}
                          className="p-3.5 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-between hover:border-cyan-500/30 transition-colors"
                        >
                          <div>
                            <span className="text-xs font-semibold text-white block">{item.name}</span>
                            <span className="text-[11px] text-cyan-400/80 font-mono tabular-nums">
                              ₹{item.price} &bull; {item.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {qty > 0 ? (
                              <div className="flex items-center gap-2 bg-white/[0.05] border border-cyan-500/20 rounded-lg p-1">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-11 h-11 rounded bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="font-mono font-semibold text-xs px-2 tabular-nums text-cyan-300">{qty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-11 h-11 rounded bg-cyan-500 text-black hover:bg-cyan-400 font-bold text-sm flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-colors min-h-[44px] cursor-pointer shadow-[0_0_12px_rgba(14,165,233,0.25)]"
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
                <div className="p-5 bg-white/[0.03] rounded-xl border border-cyan-500/20 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Cart Items:</span>
                    <span className="font-mono tabular-nums font-semibold text-white">
                      {Object.values(cart).reduce((a, b) => a + b, 0)} items
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base font-semibold text-white">
                    <span>Subtotal:</span>
                    <span className="font-mono font-bold text-xl text-cyan-300 tabular-nums">
                      ₹{cartSubtotal}
                    </span>
                  </div>
                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-center justify-between">
                    <span>30% Swiggy / Zomato Commission Saved:</span>
                    <strong className="font-mono font-bold text-emerald-300 tabular-nums">
                      +₹{aggregatorCommissionSaved} Direct Profit
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOrder}
                    disabled={cartSubtotal === 0}
                    className="w-full py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-sm transition-all shadow-[0_0_20px_rgba(37,211,102,0.30)] flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-50 cursor-pointer"
                  >
                    <Send size={16} />
                    <span>Send Order Direct to Kitchen on WhatsApp</span>
                  </button>

                  {orderSent && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-semibold flex items-center gap-2 animate-fade-in">
                      <Check size={14} className="text-emerald-400 shrink-0" />
                      <span>Order for Table #{tableNumber} dispatched to kitchen WhatsApp!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Sleek WhatsApp Dispatch Card (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <FlatWhatsAppPreview mode="table-order" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
