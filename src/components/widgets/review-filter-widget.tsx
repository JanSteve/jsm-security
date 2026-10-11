'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  ShieldAlert, 
  MapPin, 
  MessageSquare, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Send
} from 'lucide-react';

interface ReviewFilterWidgetProps {
  className?: string;
}

export function ReviewFilterWidget({ className = '' }: ReviewFilterWidgetProps) {
  const [selectedRating, setSelectedRating] = useState<number>(5);
  
  // Simulation Metrics
  const [positiveReviewsCount, setPositiveReviewsCount] = useState<number>(142);
  const [interceptedComplaintsCount, setInterceptedComplaintsCount] = useState<number>(19);
  const localRank = 1;

  // Private shield feedback text
  const [complaintText, setComplaintText] = useState<string>('Air conditioning in waiting hall was warm, and doctor arrived 15 mins late.');
  const [complaintSubmitted, setComplaintSubmitted] = useState<boolean>(false);

  const isPositive = selectedRating >= 4;

  const handleSelectRating = (rating: number) => {
    setSelectedRating(rating);
    setComplaintSubmitted(false);
    if (rating >= 4) {
      setPositiveReviewsCount((prev) => prev + 1);
    } else {
      setInterceptedComplaintsCount((prev) => prev + 1);
    }
  };

  return (
    <div className={`bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-[#0F2A47] text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#9C7A3C] text-xs font-semibold">
              <Sparkles size={14} className="text-[#9C7A3C]" />
              <span>Smart NFC Standee Demonstration</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Dual-Routing Smart Review Filter
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Experience how JSM physical acrylic NFC standees route 5-star feedback directly to Google Maps while intercepting 1–3 star dissatisfaction to WhatsApp before it ever goes public.
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end text-right">
            <span className="text-[11px] font-mono text-[#9C7A3C] uppercase tracking-wider font-semibold">
              Google Algorithm Safe
            </span>
            <span className="text-xs text-slate-300 font-medium">
              100% Policy-Compliant Private Mediation
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Main Simulation Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Sleek Counter NFC Standee Simulator (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[280px] rounded-2xl bg-[#070B12] text-white p-6 border-2 border-[#D4AF37]/50 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 mx-auto flex items-center justify-center text-[#D4AF37]">
                <Sparkles size={22} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                  SMART NFC COUNTER STANDEE
                </span>
                <h4 className="text-sm font-bold text-white tracking-wide">
                  Tap to Rate Experience
                </h4>
                <p className="text-[11px] text-neutral-300">
                  Select stars below to simulate customer tap:
                </p>
              </div>

              {/* Clickable 5-Star Ratings */}
              <div className="flex justify-center gap-1.5 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleSelectRating(star)}
                    className={`p-1.5 rounded-lg transition-transform hover:scale-110 cursor-pointer ${
                      selectedRating >= star ? 'text-amber-400' : 'text-neutral-600'
                    }`}
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star size={24} fill={selectedRating >= star ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] text-neutral-400 font-mono">
                {selectedRating >= 4 ? '🟢 ROUTING: GOOGLE MAPS' : '🟡 ROUTING: PRIVATE WHATSAPP'}
              </div>
            </div>
          </div>

          {/* Column 2: Dynamic Routing Logic & Live Visual Outcome (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Logic Branch Visualizer */}
            <div className="p-4 bg-[#F6F7F9] rounded-xl border border-[#E4E7EC] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#14181F]">Routing Engine Evaluation:</span>
              <span className={`px-3 py-1 rounded-full font-semibold text-xs flex items-center gap-1.5 ${
                isPositive
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {isPositive ? (
                  <>
                    <CheckCircle2 size={14} className="text-emerald-700" />
                    <span>Public Google Maps Acceleration</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert size={14} className="text-amber-700" />
                    <span>Private Resolution Shield</span>
                  </>
                )}
              </span>
            </div>

            {/* BRANCH A: 4-5 STARS (POSITIVE PUBLIC ROUTE) */}
            {isPositive && (
              <div className="p-6 rounded-xl border-2 border-emerald-400 bg-emerald-50/40 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                        OUTCOME: PUBLIC GOOGLE MAPS REDIRECT
                      </span>
                      <h4 className="text-base font-semibold text-[#14181F]">
                        Instant 5-Star Google Review Form
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                    Velocity +1
                  </span>
                </div>

                <p className="text-xs text-[#4A5160] leading-relaxed">
                  Customer selected <strong className="text-emerald-800">{selectedRating} stars</strong> on the acrylic standee. The smart NFC chip immediately redirects their mobile browser directly to your business&apos;s Google Review pop-up with 5 stars pre-selected.
                </p>

                {/* Simulated Google Maps Review Card */}
                <div className="bg-white border border-[#E4E7EC] rounded-xl p-4 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      G
                    </div>
                    <span className="text-xs font-bold text-[#14181F]">Google Maps Review Dialog</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-[#4A5160] italic">
                    &quot;Exceptional hospitality, hygienic premises, and attentive staff. Highly recommended in Trichy!&quot;
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-emerald-800">
                  <span className="font-semibold flex items-center gap-1">
                    <TrendingUp size={14} />
                    <span>Boosts Local 3-Pack SEO Rankings</span>
                  </span>
                  <span className="font-mono tabular-nums">Real-time sync to Maps API</span>
                </div>
              </div>
            )}

            {/* BRANCH B: 1-3 STARS (PRIVATE SHIELD INTERCEPTION) */}
            {!isPositive && (
              <div className="p-6 rounded-xl border-2 border-amber-400 bg-amber-50/40 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                      <ShieldAlert size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider block">
                        OUTCOME: PRIVATE WHATSAPP SHIELD
                      </span>
                      <h4 className="text-base font-semibold text-[#14181F]">
                        Negative Complaint Intercepted
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
                    100% Shielded
                  </span>
                </div>

                <p className="text-xs text-[#4A5160] leading-relaxed">
                  Customer selected <strong className="text-amber-800">{selectedRating} stars</strong>. Google Maps is <strong className="text-rose-700">completely bypassed</strong>. Instead, a polite private resolution form opens on WhatsApp directly to the owner/proprietor to resolve the complaint before any public damage occurs.
                </p>

                {/* Simulated Private Resolution Drawer */}
                <div className="bg-white border border-[#E4E7EC] rounded-xl p-4 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-2">
                    <span className="text-xs font-bold text-[#14181F] flex items-center gap-1.5">
                      <MessageSquare size={14} className="text-[#0F2A47]" />
                      <span>Executive Desk Resolution Form</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 font-semibold">Private &bull; Confidential</span>
                  </div>

                  <p className="text-[11px] text-[#4A5160]">
                    &quot;We are deeply sorry we fell short of your expectations today. Please let Proprietor Sweety J know what went wrong so our operations team can resolve it immediately:&quot;
                  </p>

                  <textarea
                    rows={2}
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#E4E7EC] text-xs text-[#14181F] focus:ring-2 focus:ring-[#0F2A47]/20 focus:border-[#0F2A47] resize-none"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-emerald-800 font-semibold">
                      {complaintSubmitted ? '✅ Sent to Owner WhatsApp!' : 'Intercepted prior to public post'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setComplaintSubmitted(true)}
                      className="px-4 py-2 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold transition-colors min-h-[44px] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send size={14} />
                      <span>{complaintSubmitted ? 'Transmitted' : 'Send to Owner WhatsApp'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-xs text-amber-900 font-semibold flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  <span>Public Google Rating Protected: 4.9★ Average Maintained</span>
                </div>
              </div>
            )}

            {/* Impact Metric Dashboard Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-white border border-[#E4E7EC] rounded-xl text-center space-y-1">
                <span className="text-[11px] text-[#4A5160] block">Public 5★ Reviews</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-700 tabular-nums">
                  {positiveReviewsCount}
                </span>
              </div>
              <div className="p-3.5 bg-white border border-[#E4E7EC] rounded-xl text-center space-y-1">
                <span className="text-[11px] text-[#4A5160] block">Complaints Shielded</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-amber-700 tabular-nums">
                  {interceptedComplaintsCount}
                </span>
              </div>
              <div className="p-3.5 bg-white border border-[#E4E7EC] rounded-xl text-center space-y-1">
                <span className="text-[11px] text-[#4A5160] block">Local 3-Pack Rank</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#0F2A47] tabular-nums">
                  #{localRank} in Trichy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#0F2A47] text-white p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-semibold text-white">
              Deploy Smart NFC Standees for Your Clinic, Salon, or Restaurant
            </h4>
            <p className="text-xs text-slate-300">
              Turn every happy counter checkout into an automated 5-star Google review while shielding complaints.
            </p>
          </div>
          <Link
            href="/services/nfc-review-standees"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white hover:bg-slate-100 text-[#0F2A47] text-xs font-semibold transition-colors shadow-xs min-h-[44px] shrink-0"
          >
            <span>Explore Standee Specifications</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
