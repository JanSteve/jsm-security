"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Info,
  TrendingDown,
  Sparkles
} from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

/**
 * Mathematical model identical to tests/tier2-api-route.mjs:153-170
 */
export function calculateContingencyFee(ctc: number, feePercentage = 8.33) {
  if (typeof ctc !== "number" || isNaN(ctc)) {
    throw new Error("CTC must be a valid number");
  }
  const minCtc = 1200000;  // ₹12 LPA
  const maxCtc = 10000000; // ₹1 Cr
  const clampedCtc = Math.min(Math.max(ctc, minCtc), maxCtc);
  const fee = Math.round(clampedCtc * (feePercentage / 100));
  const upfrontCost = 0; // 100% contingency model invariant

  return {
    ctc: clampedCtc,
    feePercentage,
    fee,
    upfrontCost,
    isContingencyOnly: upfrontCost === 0,
  };
}

/**
 * Format number into Indian Rupee Currency representation (e.g. ₹12,00,000)
 */
export function formatINR(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

/**
 * Format into human-readable Lakhs / Crores string (e.g. ₹15 LPA, ₹1 Cr)
 */
export function formatLakhCr(val: number): string {
  if (val >= 10000000) {
    const cr = val / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  const lakh = val / 100000;
  return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)} LPA`;
}

interface PresetOption {
  label: string;
  value: number;
  description: string;
}

const PRESET_OPTIONS: PresetOption[] = [
  { label: "₹15 LPA", value: 1500000, description: "Mid-Senior Level" },
  { label: "₹30 LPA", value: 3000000, description: "Functional Head" },
  { label: "₹50 LPA", value: 5000000, description: "VP / Director" },
  { label: "₹75 LPA", value: 7500000, description: "Executive Tier" },
  { label: "₹1 Cr", value: 10000000, description: "CXO & Board" },
];

export function FeeCalculator() {
  const sliderId = useId();
  const inputId = useId();

  // Default CTC: ₹25 LPA (Mid-Senior / Functional threshold)
  const [ctc, setCtc] = useState<number>(2500000);
  const [rawInputValue, setRawInputValue] = useState<string>("2500000");
  const [inputError, setInputError] = useState<string | null>(null);

  // Standard fee rate percentage with required confirmation tag
  const feeRate = 8.33; // 1 month fixed gross CTC equivalent

  // Run calculation via tested mathematical model
  const calculation = calculateContingencyFee(ctc, feeRate);

  // Traditional agency comparison: 33% advance retainer vs JSM ₹0 upfront
  const traditionalRetainerAdvance = Math.round(calculation.ctc * 0.33);

  // Handle slider changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = Number(e.target.value);
    setCtc(nextVal);
    setRawInputValue(String(nextVal));
    setInputError(null);
  };

  // Handle preset clicks
  const handlePresetClick = (presetVal: number) => {
    setCtc(presetVal);
    setRawInputValue(String(presetVal));
    setInputError(null);
  };

  // Handle direct numeric input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setRawInputValue(raw);

    const parsed = Number(raw);
    if (isNaN(parsed) || raw.trim() === "") {
      setInputError("Please enter a valid numeric salary amount.");
      return;
    }

    if (parsed < 1200000) {
      setInputError("Executive hiring begins at ₹12 LPA. Clamped to minimum ₹12 LPA.");
      setCtc(1200000);
    } else if (parsed > 10000000) {
      setInputError("Standard calculator caps at ₹1 Cr. Clamped to maximum ₹1 Cr.");
      setCtc(10000000);
    } else {
      setInputError(null);
      setCtc(parsed);
    }
  };

  // On blur, normalize display to clamped value
  const handleInputBlur = () => {
    const parsed = Number(rawInputValue);
    if (isNaN(parsed) || parsed < 1200000) {
      setCtc(1200000);
      setRawInputValue("1200000");
      setInputError(null);
    } else if (parsed > 10000000) {
      setCtc(10000000);
      setRawInputValue("10000000");
      setInputError(null);
    } else {
      setRawInputValue(String(parsed));
      setInputError(null);
    }
  };

  const handleHireClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const enquiryEl = document.getElementById("enquiry");
    if (enquiryEl) {
      e.preventDefault();
      enquiryEl.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#enquiry?ctc=${calculation.ctc}`);
    }
  };

  return (
    <div 
      className="bg-white border border-[#0E1116]/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_10px_30px_-8px_rgba(14,17,22,0.07)] w-full max-w-full overflow-hidden relative"
      id="fee-calculator"
    >
      {/* Invariant Banner (Upfront Retainer: ₹0) */}
      <div 
        className="mb-8 p-4 sm:p-5 rounded-xl bg-[#1F4E5F]/8 border border-[#1F4E5F]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full max-w-full"
        role="region"
        aria-label="Commercial Invariant Guarantee"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1F4E5F] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1F4E5F] block">
              100% Contingency Guarantee
            </span>
            <p className="font-heading font-medium text-lg sm:text-xl text-[#0E1116] tracking-tight">
              Upfront Retainer: ₹0 (Zero Advance Required)
            </p>
          </div>
        </div>

        <div className="sm:text-right shrink-0">
          <span className="inline-block text-xs font-mono px-2.5 py-1 rounded bg-[#1F4E5F] text-white font-medium">
            Payable Only Upon Joining
          </span>
          <span className="block text-[11px] text-[#525866] font-sans mt-0.5">
            0 Invoice Risk during Sourcing
          </span>
        </div>
      </div>

      {/* Main Grid: Controls (Left) & Results (Right) */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full max-w-full"
        data-grid-container="true"
      >
        {/* Left Column: Sliders, Inputs & Presets (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6 w-full max-w-full overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <label 
                htmlFor={sliderId}
                className="text-sm font-sans font-semibold text-[#0E1116] flex items-center gap-1.5"
              >
                <Calculator className="w-4 h-4 text-[#C8553D]" aria-hidden="true" />
                <span>Candidate Annual Fixed CTC</span>
              </label>
              <span className="text-xs font-mono text-[#525866]">
                Range: ₹12 LPA to ₹1 Cr
              </span>
            </div>

            {/* Selected CTC Display Card */}
            <div className="p-4 rounded-xl bg-[#F6F3EE] border border-[#0E1116]/10 flex items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-sans text-[#525866] block mb-0.5">
                  Target Role Compensation
                </span>
                <span className="text-2xl sm:text-3xl font-sans font-bold text-[#0E1116] tabular-nums tracking-tight">
                  {formatINR(calculation.ctc)}
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block text-xs font-sans font-semibold px-2.5 py-1 rounded-full bg-[#0E1116] text-white tabular-nums shadow-2xs">
                  {formatLakhCr(calculation.ctc)}
                </span>
                <span className="block text-[11px] font-mono text-[#9B331F] mt-1">
                  [CONFIRM: role band]
                </span>
              </div>
            </div>

            {/* Range Slider */}
            <div className="space-y-2">
              <input
                id={sliderId}
                type="range"
                min={1200000}
                max={10000000}
                step={100000}
                value={calculation.ctc}
                onChange={handleSliderChange}
                className="w-full h-2.5 bg-[#EBE6DF] rounded-lg appearance-none cursor-pointer accent-[#C8553D] focus:outline-none focus:ring-2 focus:ring-[#C8553D] focus:ring-offset-2"
                aria-label="Target Role Annual CTC Slider"
                aria-valuemin={1200000}
                aria-valuemax={10000000}
                aria-valuenow={calculation.ctc}
                aria-valuetext={`${formatLakhCr(calculation.ctc)} annual CTC`}
              />
              <div className="flex justify-between text-[11px] font-mono text-[#525866]">
                <span>Min: ₹12 LPA</span>
                <span>₹50 LPA</span>
                <span>Max: ₹1 Cr</span>
              </div>
            </div>
          </div>

          {/* Quick Preset Buttons with Spring Layout Indicator */}
          <div>
            <span className="text-xs font-sans font-semibold text-[#0E1116] uppercase tracking-wider block mb-2.5">
              Quick Compensation Presets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full max-w-full" data-grid-container="true">
              {PRESET_OPTIONS.map((preset) => {
                const isActive = calculation.ctc === preset.value;
                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => handlePresetClick(preset.value)}
                    className={`relative min-h-[44px] px-3 py-2 rounded-xl text-xs font-sans font-semibold transition-all duration-200 border text-center flex flex-col items-center justify-center ${
                      isActive
                        ? "text-white border-[#0E1116] shadow-sm"
                        : "bg-white text-[#0E1116] border-[#0E1116]/15 hover:border-[#0E1116] hover:bg-[#F6F3EE]"
                    }`}
                    aria-label={`${preset.label} - ${preset.description}`}
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCalculatorPreset"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 bg-[#0E1116] rounded-xl z-0"
                      />
                    )}
                    <span className="tabular-nums relative z-10">{preset.label}</span>
                    <span className={`text-[10px] font-normal leading-tight relative z-10 ${isActive ? "text-[#CBD5E1]" : "text-[#525866]"}`}>
                      {preset.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Numeric Input with Synchronized Validation */}
          <div className="pt-4 border-t border-[#0E1116]/8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <label 
                htmlFor={inputId}
                className="text-xs font-sans font-semibold text-[#0E1116] uppercase tracking-wider"
              >
                Or Enter Exact Annual CTC (₹)
              </label>
              <span className="text-[11px] text-[#525866]">
                Calculates automatically on input
              </span>
            </div>

            <div className="relative max-w-sm w-full">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#525866]" aria-hidden="true">
                ₹
              </span>
              <input
                id={inputId}
                type="number"
                min={1200000}
                max={10000000}
                step={50000}
                value={rawInputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="w-full pl-8 pr-4 py-2.5 bg-white border border-[#0E1116]/20 rounded-xl text-sm font-sans font-semibold text-[#0E1116] focus:outline-none focus:ring-2 focus:ring-[#C8553D] focus:border-transparent tabular-nums min-h-[44px]"
                aria-label="Direct Annual CTC Input in Rupees"
                aria-describedby={inputError ? `${inputId}-error` : undefined}
              />
            </div>

            {inputError && (
              <p 
                id={`${inputId}-error`}
                className="text-xs font-sans text-[#9B331F] mt-1.5 flex items-center gap-1"
                role="alert"
              >
                <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{inputError}</span>
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Calculated Commercials Card (5 cols on lg) with BorderBeam */}
        <div className="lg:col-span-5 bg-[#F6F3EE] border border-[#0E1116]/12 rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full w-full max-w-full relative overflow-hidden shadow-sm">
          <BorderBeam size={220} duration={14} colorFrom="#1F4E5F" colorTo="#C8553D" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#0E1116]/10">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1F4E5F]">
                Commercial Summary
              </span>
              <span className="text-xs font-mono text-[#9B331F] font-medium bg-[#9B331F]/10 px-2 py-0.5 rounded">
                [CONFIRM: fee %]
              </span>
            </div>

            {/* Key Number: Placement Fee */}
            <div className="mb-5">
              <span className="text-xs font-sans text-[#525866] block mb-1">
                Contingency Placement Fee ({calculation.feePercentage}%)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-sans font-bold text-[#C8553D] tabular-nums tracking-tight">
                  {formatINR(calculation.fee)}
                </span>
                <span className="text-xs font-mono text-[#525866]">
                  + GST
                </span>
              </div>
              <p className="text-xs text-[#525866] font-sans mt-1">
                Equivalent to 1 month gross fixed CTC, invoiced strictly upon candidate joining.
              </p>
            </div>

            {/* Interactive Retainer Contrast Callout */}
            <div className="p-3.5 rounded-xl bg-white border border-[#0E1116]/10 mb-4 shadow-2xs">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#0E1116] flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                  Working Capital Preserved:
                </span>
                <span className="font-mono font-bold text-emerald-700">
                  {formatINR(traditionalRetainerAdvance)}
                </span>
              </div>
              <p className="text-[11px] text-[#525866] leading-tight">
                Traditional retained headhunters require ~33% upfront before starting. With JSM, your advance risk is ₹0.
              </p>
            </div>

            {/* Breakdown Checklist */}
            <ul className="space-y-2.5 pt-3 border-t border-[#0E1116]/10 text-xs text-[#0E1116] font-sans">
              <li className="flex items-start justify-between gap-2">
                <span className="text-[#525866]">Advance Commitment:</span>
                <span className="font-semibold text-[#1F4E5F] font-mono">
                  ₹0 (Zero Upfront)
                </span>
              </li>
              <li className="flex items-start justify-between gap-2">
                <span className="text-[#525866]">Invoice Milestone:</span>
                <span className="font-semibold text-right">
                  Candidate Joining Day 1
                </span>
              </li>
              <li className="flex items-start justify-between gap-2">
                <span className="text-[#525866]">Payment Credit Terms:</span>
                <span className="font-semibold font-mono">
                  Net 15 Days [CONFIRM: fee %]
                </span>
              </li>
              <li className="flex items-start justify-between gap-2">
                <span className="text-[#525866]">Replacement Assurance:</span>
                <span className="font-semibold text-[#1F4E5F]">
                  90-Day Free Replacement [CONFIRM: fee %]
                </span>
              </li>
            </ul>
          </div>

          {/* Action Trigger */}
          <div className="pt-6 border-t border-[#0E1116]/10 mt-6 relative z-10">
            <Link
              href="#enquiry"
              onClick={handleHireClick}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#0E1116] text-[#FFFFFF] text-sm font-sans font-semibold hover:bg-[#C8553D] active:scale-[0.98] transition-all duration-200 shadow-sm focus-visible:outline-2 focus-visible:outline-[#C8553D] focus-visible:outline-offset-2"
              aria-label={`Hire at this Band: ${formatLakhCr(calculation.ctc)} compensation band`}
            >
              <span>Hire at this Band</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <p className="text-[11px] text-center text-[#525866] font-sans mt-2.5">
              Zero obligation inquiry. Our executive desk contacts you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeCalculator;
