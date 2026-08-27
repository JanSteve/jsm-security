"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Sparkles, 
  Users, 
  Building2, 
  CheckCircle2, 
  TrendingDown, 
  ArrowRight, 
  ShieldCheck, 
  Calculator,
  PhoneCall,
  Mail,
  User,
  Loader2,
  FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function InteractiveCostSimulator() {
  // Configurable sliders
  const [guardCount, setGuardCount] = useState(4);
  const [shiftPattern, setShiftPattern] = useState<"8-hour" | "12-hour" | "24-hour">("12-hour");
  const [housekeepingSqFt, setHousekeepingSqFt] = useState(15000);
  const [technicalStaff, setTechnicalStaff] = useState(2);
  const [isHousekeepingActive, setIsHousekeepingActive] = useState(true);
  const [isTechnicalActive, setIsTechnicalActive] = useState(true);

  // Proposal modal state
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [proposalData, setProposalData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "Tiruchirappalli (Trichy)",
  });

  // Rates calculation
  const guardRatePerShift = shiftPattern === "8-hour" ? 14500 : shiftPattern === "12-hour" ? 19500 : 39000;
  const securityMonthly = guardCount * guardRatePerShift;

  const housekeepingStaffNeeded = Math.max(1, Math.round(housekeepingSqFt / 4500));
  const housekeepingMonthly = isHousekeepingActive ? housekeepingStaffNeeded * 13500 + Math.round(housekeepingSqFt * 0.4) : 0;

  const technicalMonthly = isTechnicalActive ? technicalStaff * 16000 : 0;

  const jsmMonthlyTotal = securityMonthly + housekeepingMonthly + technicalMonthly;
  const jsmAnnualTotal = jsmMonthlyTotal * 12;

  // In-House Direct Hiring Cost Comparison (Includes statutory PF/ESI, admin hiring, uniform, absenteeism reserve)
  const inHouseEstimatedAnnual = Math.round(jsmAnnualTotal * 1.28);
  const annualSavings = inHouseEstimatedAnnual - jsmAnnualTotal;

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalData.companyName || !proposalData.contactPerson || !proposalData.phone) return;

    setIsSubmitting(true);
    const ticketRef = `JSM-SIM-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: proposalData.contactPerson,
          phone: proposalData.phone,
          email: proposalData.email,
          facilityName: proposalData.companyName,
          service: `Simulator Proposal: ${guardCount} Guards (${shiftPattern}), ${isHousekeepingActive ? `${housekeepingSqFt.toLocaleString()} sq.ft Housekeeping` : 'No Housekeeping'}, ${isTechnicalActive ? `${technicalStaff} Tech Staff` : 'No Tech Staff'}`,
          headcount: `${guardCount + (isHousekeepingActive ? housekeepingStaffNeeded : 0) + (isTechnicalActive ? technicalStaff : 0)} Total Personnel`,
          location: proposalData.city,
          notes: `Estimated Monthly Budget: Rs ${jsmMonthlyTotal.toLocaleString('en-IN')}/mo. Estimated Annual Savings vs In-House: Rs ${annualSavings.toLocaleString('en-IN')}.`,
          referenceId: ticketRef,
        }),
      });
      setSubmittedSuccess(true);
    } catch (err) {
      console.error("Proposal dispatch error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-zinc-900 text-white relative overflow-hidden" id="cost-simulator">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold">
            <Calculator size={14} />
            <span>REAL-TIME ROI CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Facility Workforce &amp; <span className="text-[#C5A880]">Cost Estimator</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Customize your security, mechanized housekeeping, and technical staffing. See your estimated investment and annual savings with 100% legal indemnity.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 bg-zinc-800/80 border border-zinc-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            
            {/* 1. Security Guarding Control */}
            <div className="space-y-4 pb-6 border-b border-zinc-700/60">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#C5A880]/10 text-[#C5A880]">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Physical Security Guarding</h3>
                    <p className="text-xs text-zinc-400">PSARA licensed guards with 2-Hour Relief replacement</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#C5A880]">{guardCount}</span>
                  <span className="text-xs text-zinc-400 block">Personnel</span>
                </div>
              </div>

              {/* Slider */}
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={guardCount}
                onChange={(e) => setGuardCount(Number(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
                <span>1 Guard</span>
                <span>15 Guards</span>
                <span>30 Guards</span>
              </div>

              {/* Shift Pattern Selector */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-zinc-300 block mb-2">Shift Coverage Model:</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: "8-hour", label: "8-Hour Shift", desc: "Day or Night" },
                    { id: "12-hour", label: "12-Hour Shift", desc: "Day & Night" },
                    { id: "24-hour", label: "24/7 Continuous", desc: "3-Shift Roster" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setShiftPattern(s.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        shiftPattern === s.id
                          ? "bg-[#C5A880]/20 border-[#C5A880] text-white"
                          : "bg-zinc-900/60 border-zinc-700 text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      <span className="font-bold block text-white">{s.label}</span>
                      <span className="text-[10px] text-zinc-400">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Mechanized Housekeeping Control */}
            <div className="space-y-4 pb-6 border-b border-zinc-700/60">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">Mechanized Housekeeping</h3>
                      <input 
                        type="checkbox" 
                        checked={isHousekeepingActive} 
                        onChange={(e) => setIsHousekeepingActive(e.target.checked)}
                        className="rounded accent-sky-400 w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-zinc-400">Deep industrial sanitation with ride-on scrubbers</p>
                  </div>
                </div>
                {isHousekeepingActive && (
                  <div className="text-right">
                    <span className="text-2xl font-black text-sky-400">{housekeepingSqFt.toLocaleString()}</span>
                    <span className="text-xs text-zinc-400 block">Sq. Ft. Area</span>
                  </div>
                )}
              </div>

              {isHousekeepingActive && (
                <>
                  <input 
                    type="range" 
                    min="3000" 
                    max="100000" 
                    step="1000"
                    value={housekeepingSqFt}
                    onChange={(e) => setHousekeepingSqFt(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                  <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
                    <span>3,000 sq.ft</span>
                    <span>50,000 sq.ft</span>
                    <span>1,00,000 sq.ft</span>
                  </div>
                  <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-700/50 flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Estimated Sanitization Staff:</span>
                    <span className="font-bold text-white">{housekeepingStaffNeeded} Full-Time Personnel</span>
                  </div>
                </>
              )}
            </div>

            {/* 3. Contractual Technical Manpower */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Users size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">Technical &amp; Utility Workforce</h3>
                      <input 
                        type="checkbox" 
                        checked={isTechnicalActive} 
                        onChange={(e) => setIsTechnicalActive(e.target.checked)}
                        className="rounded accent-amber-400 w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-zinc-400">Licensed electricians, plumbers, HVAC technicians</p>
                  </div>
                </div>
                {isTechnicalActive && (
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-400">{technicalStaff}</span>
                    <span className="text-xs text-zinc-400 block">Technicians</span>
                  </div>
                )}
              </div>

              {isTechnicalActive && (
                <>
                  <input 
                    type="range" 
                    min="1" 
                    max="15" 
                    value={technicalStaff}
                    onChange={(e) => setTechnicalStaff(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
                    <span>1 Tech</span>
                    <span>8 Techs</span>
                    <span>15 Techs</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Investment & Savings Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 border-2 border-[#C5A880]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-mono font-extrabold uppercase mb-4">
                <FileCheck size={12} /> All-Inclusive Commercial Estimate
              </div>

              <div className="space-y-1 mb-6">
                <span className="text-xs text-zinc-400 font-medium">Estimated Monthly Investment</span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  ₹{jsmMonthlyTotal.toLocaleString("en-IN")}
                  <span className="text-xs text-zinc-400 font-normal ml-2">/ month + GST</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 py-4 border-y border-zinc-700/60 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>Physical Security ({guardCount} guards):</span>
                  <span className="font-mono font-bold text-white">₹{securityMonthly.toLocaleString("en-IN")}</span>
                </div>
                {isHousekeepingActive && (
                  <div className="flex justify-between text-zinc-300">
                    <span>Mechanized Housekeeping ({housekeepingStaffNeeded} staff):</span>
                    <span className="font-mono font-bold text-white">₹{housekeepingMonthly.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {isTechnicalActive && (
                  <div className="flex justify-between text-zinc-300">
                    <span>Utility Technicians ({technicalStaff} staff):</span>
                    <span className="font-mono font-bold text-white">₹{technicalMonthly.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>

              {/* Annual Savings Card */}
              <div className="mt-6 p-4 rounded-2xl bg-[#0A1628] border border-[#C5A880]/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C5A880]">
                  <TrendingDown size={16} />
                  <span>Annual In-House Direct Hiring Comparison</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">
                  Save ~₹{annualSavings.toLocaleString("en-IN")} / year
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  By outsourcing to JSM, you eliminate EPF/ESI statutory liability audits, uniform &amp; recruitment overhead, and paid absenteeism reserves.
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <Button
                  onClick={() => setShowProposalModal(true)}
                  className="w-full py-6 bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Official Commercial Proposal</span>
                  <ArrowRight size={16} />
                </Button>
                <span className="text-[10px] text-zinc-500 block text-center mt-2 font-mono">
                  Guaranteed 2-Hour Response Time • Tiruchirappalli Command Desk
                </span>
              </div>
            </div>

            {/* SLA Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-[#C5A880] flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">2-Hour Relief</span>
                  <span className="text-[10px] text-zinc-400">Zero unattended post</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 flex items-center gap-2.5">
                <Building2 size={20} className="text-sky-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">100% Indemnity</span>
                  <span className="text-[10px] text-zinc-400">Zero labour liability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Proposal Request Modal */}
      <AnimatePresence>
        {showProposalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-white"
            >
              {!submittedSuccess ? (
                <form onSubmit={handleProposalSubmit} className="space-y-4">
                  <div className="border-b border-zinc-800 pb-3">
                    <h3 className="text-xl font-black text-white uppercase">
                      Confirm Proposal Scope
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Our commercial director will prepare an official tailored proposal matching these exact specifications.
                    </p>
                  </div>

                  <div className="bg-zinc-800/60 p-3 rounded-xl border border-zinc-700/60 text-xs space-y-1 font-mono text-zinc-300">
                    <div>• Guarding: {guardCount} Guards ({shiftPattern})</div>
                    <div>• Housekeeping: {isHousekeepingActive ? `${housekeepingSqFt.toLocaleString()} sq.ft` : 'None'}</div>
                    <div>• Technical: {isTechnicalActive ? `${technicalStaff} Technicians` : 'None'}</div>
                    <div className="text-[#C5A880] font-bold">• Estimated Total: ₹{jsmMonthlyTotal.toLocaleString('en-IN')}/mo</div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 mb-1">
                        <Building2 size={13} className="text-[#C5A880]" /> Company / Facility Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={proposalData.companyName}
                        onChange={(e) => setProposalData({ ...proposalData, companyName: e.target.value })}
                        placeholder="e.g. Hyundai Vendor Plant"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 mb-1">
                        <User size={13} className="text-[#C5A880]" /> Contact Person &amp; Title *
                      </label>
                      <input
                        required
                        type="text"
                        value={proposalData.contactPerson}
                        onChange={(e) => setProposalData({ ...proposalData, contactPerson: e.target.value })}
                        placeholder="e.g. Suresh Kumar (Plant Head)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 mb-1">
                          <PhoneCall size={13} className="text-[#C5A880]" /> Mobile Phone Number *
                        </label>
                        <input
                          required
                          type="tel"
                          value={proposalData.phone}
                          onChange={(e) => setProposalData({ ...proposalData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 mb-1">
                          <Mail size={13} className="text-[#C5A880]" /> Corporate Email
                        </label>
                        <input
                          type="email"
                          value={proposalData.email}
                          onChange={(e) => setProposalData({ ...proposalData, email: e.target.value })}
                          placeholder="suresh@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setShowProposalModal(false)}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <span>Submit Proposal Request</span>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-black text-white">Proposal Request Received!</h3>
                  <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                    Our operations director has received your specifications. We will review your site requirements and contact you at <strong className="text-white">{proposalData.phone}</strong> within 2 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setShowProposalModal(false);
                    }}
                    className="mt-4 bg-[#C5A880] text-zinc-950 font-bold text-xs"
                  >
                    Close Window
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
