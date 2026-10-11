'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, ShieldCheck, Check, ArrowRight, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';

interface RoiCalculatorProps {
  className?: string;
}

type ServiceType = 'security' | 'manpower' | 'housekeeping' | 'bundled';
type LocationKey = 'trichy' | 'chennai' | 'coimbatore' | 'hosur' | 'salem';
type ShiftPattern = '8hr' | '12hr' | '24_7';

interface LocationData {
  label: string;
  zone: 'A' | 'B';
  rates: {
    '8hr': number;
    '12hr': number;
    '24_7': number;
  };
}

const LOCATIONS: Record<LocationKey, LocationData> = {
  trichy: {
    label: 'Tiruchirappalli (HQ)',
    zone: 'B',
    rates: { '8hr': 14500, '12hr': 19500, '24_7': 39000 },
  },
  chennai: {
    label: 'Chennai (OMR / Guindy)',
    zone: 'A',
    rates: { '8hr': 16500, '12hr': 22000, '24_7': 44000 },
  },
  coimbatore: {
    label: 'Coimbatore (Industrial)',
    zone: 'A',
    rates: { '8hr': 16500, '12hr': 22000, '24_7': 44000 },
  },
  hosur: {
    label: 'Hosur (Auto Cluster)',
    zone: 'B',
    rates: { '8hr': 15000, '12hr': 20000, '24_7': 40000 },
  },
  salem: {
    label: 'Salem (Steel & Agro Hub)',
    zone: 'B',
    rates: { '8hr': 14500, '12hr': 19500, '24_7': 39000 },
  },
};

const SERVICE_MULTIPLIERS: Record<ServiceType, { label: string; mult: number }> = {
  security: { label: 'Private Security Guarding', mult: 1.0 },
  manpower: { label: 'Industrial Contract Manpower', mult: 0.95 },
  housekeeping: { label: 'Mechanized Facility Hygiene', mult: 0.90 },
  bundled: { label: 'Integrated Bundled Package', mult: 1.05 },
};

function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(val));
}

export function RoiCalculator({ className = '' }: RoiCalculatorProps) {
  const [serviceType, setServiceType] = useState<ServiceType>('security');
  const [location, setLocation] = useState<LocationKey>('trichy');
  const [shiftPattern, setShiftPattern] = useState<ShiftPattern>('12hr');
  const [headcount, setHeadcount] = useState<number>(6);
  const [includeSupervisor, setIncludeSupervisor] = useState<boolean>(true);
  const [includeWhatsAppBot, setIncludeWhatsAppBot] = useState<boolean>(true);

  // Calculations
  const metrics = useMemo(() => {
    const locData = LOCATIONS[location];
    const baseWage = locData.rates[shiftPattern] * SERVICE_MULTIPLIERS[serviceType].mult;

    // Direct In-House Model
    // Statutory Burden: EPF 12% + ESIC 3.25% + Bonus 8.33% = 23.58%
    // In-House hidden friction: Churn +8%, Absenteeism/OT +12%, Legal/Admin +6% = +26%
    // Total in-house multiplier ~ 1.4958
    const inHouseBaseMonthly = baseWage * headcount;
    const inHouseStatutory = inHouseBaseMonthly * 0.2358;
    const inHouseFriction = inHouseBaseMonthly * 0.26;
    const inHouseSupervisorCost = includeSupervisor ? 24000 * 1.4 : 0;
    const inHouseTotalMonthly = inHouseBaseMonthly + inHouseStatutory + inHouseFriction + inHouseSupervisorCost;

    // JSM Managed Model
    // 100% compliant with turnkey rate multiplier 1.28 (inclusive of EPF/ESIC, 2-Hr Relief SLA, 2 AM Patrols)
    const jsmBaseMonthly = baseWage * 1.28 * headcount;
    const jsmSupervisorCost = includeSupervisor ? 22000 : 0;
    const jsmBotCost = includeWhatsAppBot ? 4999 : 0;
    const jsmTotalMonthly = jsmBaseMonthly + jsmSupervisorCost + jsmBotCost;

    // Savings & ROI
    const monthlySavings = inHouseTotalMonthly - jsmTotalMonthly;
    const annualSavings = monthlySavings * 12;
    const roiPercentage = inHouseTotalMonthly > 0 ? (monthlySavings / inHouseTotalMonthly) * 100 : 0;

    // WhatsApp Bot Recaptured Revenue
    // Recaptures estimated 35 missed inquiries/month at avg order value ₹2,500
    const recapturedRevenueMonthly = includeWhatsAppBot ? 35 * 2500 : 0;
    const recapturedRevenueAnnual = recapturedRevenueMonthly * 12;
    const totalEconomicBenefitAnnual = annualSavings + recapturedRevenueAnnual;

    return {
      baseWage,
      inHouseTotalMonthly,
      inHouseStatutory,
      inHouseFriction,
      jsmTotalMonthly,
      monthlySavings,
      annualSavings,
      roiPercentage,
      recapturedRevenueMonthly,
      totalEconomicBenefitAnnual,
    };
  }, [serviceType, location, shiftPattern, headcount, includeSupervisor, includeWhatsAppBot]);

  const whatsappMessage = encodeURIComponent(
    `Hello JSM Operations Desk, I used the ROI Calculator for ${SERVICE_MULTIPLIERS[serviceType].label} in ${LOCATIONS[location].label}.\n` +
    `Details: ${headcount} headcount (${shiftPattern} shift), Supervisor: ${includeSupervisor ? 'Yes' : 'No'}, WhatsApp CRM: ${includeWhatsAppBot ? 'Yes' : 'No'}.\n` +
    `Estimated In-House: ${formatINR(metrics.inHouseTotalMonthly)}/mo | JSM Managed: ${formatINR(metrics.jsmTotalMonthly)}/mo | Est Annual Savings: ${formatINR(metrics.annualSavings)}.\n` +
    `Please provide a formal statutory proposal.`
  );

  return (
    <div className={`bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden ${className}`}>
      {/* Widget Header */}
      <div className="bg-[#0F2A47] text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold">
              <Calculator size={14} />
              <span>Interactive Operations Cost &amp; ROI Simulator</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              In-House vs JSM Managed Manpower Comparison
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Model real statutory wages, mandatory EPF/ESIC compliance, relief replacement costs, and digital revenue acceleration across Tamil Nadu.
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end text-right">
            <span className="text-[11px] font-mono text-[#9C7A3C] uppercase tracking-wider font-semibold">
              Statutory Basis
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Tamil Nadu Minimum Wages Act + 100% EPF/ESIC
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6 border-b border-[#E4E7EC]">
          {/* Left Column: Service & Location */}
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-[#14181F] uppercase tracking-wider block mb-2">
                1. Operational Discipline
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(SERVICE_MULTIPLIERS) as ServiceType[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setServiceType(st)}
                    className={`min-h-[44px] px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all border ${
                      serviceType === st
                        ? 'bg-[#0F2A47] text-white border-[#0F2A47] shadow-xs'
                        : 'bg-[#F6F7F9] text-[#4A5160] hover:text-[#14181F] border-[#E4E7EC] hover:bg-[#E4E7EC]/40'
                    }`}
                  >
                    {SERVICE_MULTIPLIERS[st].label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#14181F] uppercase tracking-wider block mb-2">
                2. Deployment Hub / District
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(LOCATIONS) as LocationKey[]).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocation(loc)}
                    className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-semibold text-center transition-all border ${
                      location === loc
                        ? 'bg-[#0F2A47] text-white border-[#0F2A47] shadow-xs'
                        : 'bg-[#F6F7F9] text-[#4A5160] hover:text-[#14181F] border-[#E4E7EC] hover:bg-[#E4E7EC]/40'
                    }`}
                  >
                    {LOCATIONS[loc].label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#14181F] uppercase tracking-wider block mb-2">
                3. Shift Structure
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '8hr', label: '8-Hour General' },
                  { id: '12hr', label: '12-Hour Industrial' },
                  { id: '24_7', label: '24/7 Continuous Post' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShiftPattern(s.id as ShiftPattern)}
                    className={`min-h-[44px] px-2.5 py-2 rounded-lg text-xs font-semibold text-center transition-all border ${
                      shiftPattern === s.id
                        ? 'bg-[#0F2A47] text-white border-[#0F2A47] shadow-xs'
                        : 'bg-[#F6F7F9] text-[#4A5160] hover:text-[#14181F] border-[#E4E7EC] hover:bg-[#E4E7EC]/40'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Headcount & Add-ons */}
          <div className="space-y-5 bg-[#F6F7F9] p-5 sm:p-6 rounded-xl border border-[#E4E7EC]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-[#14181F] uppercase tracking-wider">
                  4. Workforce Headcount / Posts
                </label>
                <span className="font-mono text-base font-bold text-[#0F2A47] bg-white border border-[#E4E7EC] px-3 py-1 rounded-md tabular-nums">
                  {headcount} {headcount === 1 ? 'Person' : 'Personnel'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="w-full h-2 bg-[#E4E7EC] rounded-lg appearance-none cursor-pointer accent-[#0F2A47]"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#4A5160] mt-1 tabular-nums">
                <span>1 Post</span>
                <span>10 Personnel</span>
                <span>20 Personnel</span>
                <span>40+ Workforce</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-[#14181F] uppercase tracking-wider block">
                5. Managed Operational Add-Ons
              </label>

              {/* Toggle 1: Supervisor */}
              <label className="flex items-start gap-3 p-3.5 bg-white border border-[#E4E7EC] rounded-lg cursor-pointer hover:border-[#0F2A47]/40 transition-colors">
                <input
                  type="checkbox"
                  checked={includeSupervisor}
                  onChange={(e) => setIncludeSupervisor(e.target.checked)}
                  className="mt-0.5 size-4 rounded text-[#0F2A47] focus:ring-[#0F2A47] accent-[#0F2A47]"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-[#14181F] block">
                    Dedicated Ex-Servicemen (ESM) Field Supervisor
                  </span>
                  <p className="text-[11px] text-[#4A5160] leading-snug">
                    Includes 2:00 AM mobile patrol van surprise spot audits, guard register enforcement, and liaison with local police stations.
                  </p>
                </div>
              </label>

              {/* Toggle 2: WhatsApp CRM */}
              <label className="flex items-start gap-3 p-3.5 bg-white border border-[#E4E7EC] rounded-lg cursor-pointer hover:border-[#0F2A47]/40 transition-colors">
                <input
                  type="checkbox"
                  checked={includeWhatsAppBot}
                  onChange={(e) => setIncludeWhatsAppBot(e.target.checked)}
                  className="mt-0.5 size-4 rounded text-[#0F2A47] focus:ring-[#0F2A47] accent-[#0F2A47]"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-[#14181F] flex items-center gap-1.5">
                    <span>Official Meta WhatsApp Auto-Lead Engine</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      +₹87k Rev Recapture
                    </span>
                  </span>
                  <p className="text-[11px] text-[#4A5160] leading-snug">
                    Recovers missed inbound client calls with instant WhatsApp interactive catalog replies within 3 seconds.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Results Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Direct In-House Unorganized */}
          <div className="p-6 rounded-xl border border-rose-200 bg-rose-50/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider">
                  Self-Managed / Direct Hiring
                </span>
                <h4 className="text-lg font-semibold text-[#14181F]">
                  In-House Operational Burden
                </h4>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-semibold border border-rose-200">
                High Risk &amp; Hidden Churn
              </span>
            </div>

            <div className="pt-2">
              <span className="text-xs text-[#4A5160] block">Estimated True Monthly Cost:</span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-rose-950 font-mono tabular-nums">
                {formatINR(metrics.inHouseTotalMonthly)}
                <span className="text-xs font-sans font-normal text-[#4A5160] ml-1">/ month</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-rose-200/60 text-xs text-[#4A5160]">
              <div className="flex justify-between">
                <span>Base Wages ({headcount} pax):</span>
                <span className="font-mono tabular-nums text-[#14181F]">{formatINR(metrics.baseWage * headcount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Statutory EPF/ESIC/Bonus (+23.58%):</span>
                <span className="font-mono tabular-nums text-[#14181F]">{formatINR(metrics.inHouseStatutory)}</span>
              </div>
              <div className="flex justify-between text-rose-700">
                <span>Absenteeism Churn &amp; Legal Liability (+26%):</span>
                <span className="font-mono tabular-nums font-semibold">{formatINR(metrics.inHouseFriction)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-rose-200/40 text-[11px] text-rose-800">
                <span className="flex items-center gap-1">
                  <AlertCircle size={12} />
                  <span>Relief Guard Guarantee:</span>
                </span>
                <span className="font-semibold">None (Post remains unmanned)</span>
              </div>
            </div>
          </div>

          {/* Card 2: JSM Managed Turnkey */}
          <div className="p-6 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-4 shadow-xs relative">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  JSM Turnkey Managed Contract
                </span>
                <h4 className="text-lg font-semibold text-[#0F2A47]">
                  Disciplined Outsourced Operations
                </h4>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300 flex items-center gap-1">
                <Check size={12} />
                <span>100% EPF/ESIC Compliant</span>
              </span>
            </div>

            <div className="pt-2">
              <span className="text-xs text-[#4A5160] block">Consolidated Turnkey Rate:</span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0F2A47] font-mono tabular-nums">
                {formatINR(metrics.jsmTotalMonthly)}
                <span className="text-xs font-sans font-normal text-[#4A5160] ml-1">/ month</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-emerald-200 text-xs text-[#4A5160]">
              <div className="flex justify-between text-emerald-900 font-semibold">
                <span>Net Monthly Savings:</span>
                <span className="font-mono tabular-nums text-emerald-700 text-sm">{formatINR(metrics.monthlySavings)} / mo</span>
              </div>
              <div className="flex justify-between text-emerald-900">
                <span>2-Hour Relief Replacement SLA:</span>
                <span className="font-semibold text-emerald-700">Included &bull; Zero Churn</span>
              </div>
              <div className="flex justify-between text-emerald-900">
                <span>Uniforms, Torches, Gate Registers:</span>
                <span className="font-semibold text-emerald-700">100% JSM Provided</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-emerald-200 text-[11px] text-emerald-800">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-700" />
                  <span>Client Legal Liability:</span>
                </span>
                <span className="font-semibold">Zero (Full Indemnity &amp; ECR Slips)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive ROI Summary Banner */}
        <div className="bg-[#0F2A47] text-white p-6 sm:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#9C7A3C] uppercase tracking-wider">
              <TrendingUp size={14} />
              <span>Projected Annual Economic Impact</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-white font-mono tabular-nums">
                {formatINR(metrics.annualSavings)}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-full tabular-nums">
                {metrics.roiPercentage.toFixed(1)}% Annual Cost Reduction
              </span>
            </div>
            {includeWhatsAppBot && (
              <p className="text-xs text-slate-300">
                Plus <strong className="text-white font-mono tabular-nums">{formatINR(metrics.recapturedRevenueMonthly * 12)}</strong> estimated annual top-line revenue recovered through 3-second WhatsApp lead capture.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-white hover:bg-neutral-100 text-[#0F2A47] text-xs sm:text-sm font-semibold transition-all shadow-xs min-h-[44px] w-full sm:w-auto text-center"
            >
              <span>Download Formal Proposal</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href={`https://wa.me/919080863448?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs min-h-[44px] w-full sm:w-auto text-center"
            >
              <MessageSquare size={14} />
              <span>Send to Operations Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
