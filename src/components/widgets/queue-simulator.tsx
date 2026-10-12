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
    <div className="w-full max-w-[320px] rounded-2xl bg-[#0b141a] text-white overflow-hidden border border-white/15 shadow-2xl">
      <div className="bg-[#1f2c34] p-3 flex items-center gap-2.5 border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-[#25D366] text-black font-bold flex items-center justify-center text-xs">JSM</div>
        <div className="text-left flex-1 min-w-0">
          <div className="text-xs font-semibold text-white truncate">
            {mode === 'clinic-token' ? 'Dr. Clinic Token Desk' : 'Restaurant Table Order'}
          </div>
          <div className="text-[10px] text-emerald-400">WhatsApp Business API &bull; Active</div>
        </div>
      </div>
      <div className="p-4 space-y-3 bg-[#0b141a] min-h-[220px] text-left text-xs font-sans">
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
      <div className="p-2.5 bg-[#1f2c34] text-[10px] text-neutral-400 text-center border-t border-white/10 font-mono">
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
    <div className={`bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden ${className}`}>
      {/* Top Selector Banner */}
      <div className="bg-[#0F2A47] text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-semibold">
              <Sparkles size={14} className="text-white" />
              <span>Interactive 3D Hardware &amp; WhatsApp Simulator</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Live Queue &amp; QR Direct Order Flow
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Interact with our floating 3D glass smartphone mockup running live clinic patient tokens and table QR ordering with zero aggregator commissions.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-white/10 p-1 rounded-lg border border-white/15 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('clinic')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all min-h-[44px] cursor-pointer ${
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all min-h-[44px] cursor-pointer ${
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Doctor Console (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Now Serving Display Box */}
                <div className="p-6 rounded-xl bg-[#0F2A47] text-white space-y-4 shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/15 pb-3">
                    <span className="text-[11px] font-mono uppercase text-white font-semibold tracking-wider flex items-center gap-1.5">
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
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-white hover:bg-slate-100 text-[#0F2A47] text-xs font-semibold transition-all min-h-[44px] shadow-xs cursor-pointer"
                    >
                      <Bell size={14} className="text-[#0F2A47]" />
                      <span>Call Next Patient</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddWalkin}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-all min-h-[44px] cursor-pointer"
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
                        className={`px-3 py-2 rounded-md text-xs font-semibold min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer ${
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
                                  className="w-11 h-11 rounded bg-white hover:bg-slate-100 text-[#14181F] font-bold text-sm flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="font-mono font-semibold text-xs px-2 tabular-nums">{qty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-11 h-11 rounded bg-[#0F2A47] text-white hover:bg-[#0A1E33] font-bold text-sm flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-4 py-2 rounded-lg bg-[#0F2A47] hover:bg-[#0A1E33] text-white text-xs font-semibold transition-colors min-h-[44px] cursor-pointer"
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
                    className="w-full py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-50 cursor-pointer"
                  >
                    <Send size={16} />
                    <span>Send Order Direct to Kitchen on WhatsApp</span>
                  </button>

                  {orderSent && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-2 animate-fade-in">
                      <Check size={14} className="text-emerald-600 shrink-0" />
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
