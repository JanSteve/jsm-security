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
    <section className="py-20 md:py-28 bg-white text-[#1d1d1f] relative overflow-hidden border-t border-black/[0.08]" id="cost-simulator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Calculator size={14} className="text-[#0071e3]" />
            <span>Real-time Cost Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] text-balance">
            Facility workforce &amp; cost estimator.
          </h2>
          <p className="text-[#86868b] text-sm sm:text-base leading-relaxed text-pretty">
            Customize your security, mechanized housekeeping, and technical staffing. See your estimated investment and annual savings with 100% legal indemnity.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 bg-[#f5f5f7] border border-black/[0.06] rounded-[28px] p-6 sm:p-8 shadow-sm">
            
            {/* 1. Security Guarding Control */}
            <div className="space-y-4 pb-6 border-b border-black/[0.08]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-white border border-black/[0.08] text-[#1d1d1f] shadow-sm">
                    <Shield size={18} className="text-[#0071e3]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1d1d1f]">Physical Security Guarding</h3>
                    <p className="text-xs text-[#86868b]">PSARA licensed guards with 2-Hour Relief replacement</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-semibold text-[#1d1d1f] tabular-nums">{guardCount}</span>
                  <span className="text-xs text-[#86868b] block">Personnel</span>
                </div>
              </div>

              {/* Slider */}
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={guardCount}
                onChange={(e) => setGuardCount(Number(e.target.value))}
                className="w-full h-2 bg-black/[0.08] rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
              />
              <div className="flex justify-between text-[11px] text-[#86868b]">
                <span>1 Guard</span>
                <span>15 Guards</span>
                <span>30 Guards</span>
              </div>

              {/* Shift Pattern Selector */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-[#1d1d1f] block mb-2">Shift Coverage Model:</label>
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
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        shiftPattern === s.id
                          ? "bg-white border-[#0071e3] ring-2 ring-[#0071e3]/20 shadow-sm"
                          : "bg-white/60 border-black/[0.06] text-[#86868b] hover:bg-white hover:border-black/[0.12]"
                      }`}
                    >
                      <span className="font-semibold block text-[#1d1d1f]">{s.label}</span>
                      <span className="text-[10px] text-[#86868b]">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Mechanized Housekeeping Control */}
            <div className="space-y-4 pb-6 border-b border-black/[0.08]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-white border border-black/[0.08] text-[#1d1d1f] shadow-sm">
                    <Sparkles size={18} className="text-[#0071e3]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-[#1d1d1f]">Mechanized Housekeeping</h3>
                      <input 
                        type="checkbox" 
                        checked={isHousekeepingActive} 
                        onChange={(e) => setIsHousekeepingActive(e.target.checked)}
                        className="rounded accent-[#0071e3] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-[#86868b]">Deep industrial sanitation with ride-on scrubbers</p>
                  </div>
                </div>
                {isHousekeepingActive && (
                  <div className="text-right">
                    <span className="text-2xl font-semibold text-[#1d1d1f] tabular-nums">{housekeepingSqFt.toLocaleString()}</span>
                    <span className="text-xs text-[#86868b] block">Sq. Ft. Area</span>
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
                    className="w-full h-2 bg-black/[0.08] rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
                  />
                  <div className="flex justify-between text-[11px] text-[#86868b]">
                    <span>3,000 sq.ft</span>
                    <span>50,000 sq.ft</span>
                    <span>1,00,000 sq.ft</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-black/[0.06] flex justify-between items-center text-xs">
                    <span className="text-[#86868b]">Estimated Sanitization Staff:</span>
                    <span className="font-semibold text-[#1d1d1f]">{housekeepingStaffNeeded} Full-Time Personnel</span>
                  </div>
                </>
              )}
            </div>

            {/* 3. Contractual Technical Manpower */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-white border border-black/[0.08] text-[#1d1d1f] shadow-sm">
                    <Users size={18} className="text-[#0071e3]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-[#1d1d1f]">Technical &amp; Utility Workforce</h3>
                      <input 
                        type="checkbox" 
                        checked={isTechnicalActive} 
                        onChange={(e) => setIsTechnicalActive(e.target.checked)}
                        className="rounded accent-[#0071e3] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-[#86868b]">Licensed electricians, plumbers, HVAC technicians</p>
                  </div>
                </div>
                {isTechnicalActive && (
                  <div className="text-right">
                    <span className="text-2xl font-semibold text-[#1d1d1f] tabular-nums">{technicalStaff}</span>
                    <span className="text-xs text-[#86868b] block">Technicians</span>
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
                    className="w-full h-2 bg-black/[0.08] rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
                  />
                  <div className="flex justify-between text-[11px] text-[#86868b]">
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
            <div className="bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] p-6 sm:p-8 shadow-sm relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] text-[11px] font-semibold tracking-wide mb-4 shadow-sm">
                <FileCheck size={12} className="text-[#0071e3]" /> All-inclusive commercial estimate
              </div>

              <div className="space-y-1 mb-6">
                <span className="text-xs text-[#86868b] font-medium">Estimated monthly investment</span>
                <div className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight tabular-nums">
                  ₹{jsmMonthlyTotal.toLocaleString("en-IN")}
                  <span className="text-xs text-[#86868b] font-normal ml-2">/ month + GST</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 py-4 border-y border-black/[0.08] text-xs">
                <div className="flex justify-between text-[#515154]">
                  <span>Physical security ({guardCount} guards):</span>
                  <span className="font-semibold text-[#1d1d1f] tabular-nums">₹{securityMonthly.toLocaleString("en-IN")}</span>
                </div>
                {isHousekeepingActive && (
                  <div className="flex justify-between text-[#515154]">
                    <span>Mechanized housekeeping ({housekeepingStaffNeeded} staff):</span>
                    <span className="font-semibold text-[#1d1d1f] tabular-nums">₹{housekeepingMonthly.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {isTechnicalActive && (
                  <div className="flex justify-between text-[#515154]">
                    <span>Utility technicians ({technicalStaff} staff):</span>
                    <span className="font-semibold text-[#1d1d1f] tabular-nums">₹{technicalMonthly.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>

              {/* Annual Savings Card */}
              <div className="mt-6 p-5 rounded-2xl bg-white border border-black/[0.06] space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0071e3]">
                  <TrendingDown size={16} />
                  <span>Annual in-house direct hiring comparison</span>
                </div>
                <div className="text-xl sm:text-2xl font-semibold text-emerald-600 tabular-nums">
                  Save ~₹{annualSavings.toLocaleString("en-IN")} / year
                </div>
                <p className="text-[11px] text-[#86868b] leading-relaxed">
                  By outsourcing to JSM, you eliminate EPF/ESI statutory liability audits, uniform &amp; recruitment overhead, and paid absenteeism reserves.
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <Button
                  onClick={() => setShowProposalModal(true)}
                  className="w-full py-4 bg-[#1d1d1f] hover:bg-black text-white font-semibold text-sm rounded-full transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>Request official commercial proposal</span>
                  <ArrowRight size={16} />
                </Button>
                <span className="text-[11px] text-[#86868b] block text-center mt-2">
                  Guaranteed 2-hour response time • Tiruchirappalli command desk
                </span>
              </div>
            </div>

            {/* SLA Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#0071e3] flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[#1d1d1f] block">2-Hour Relief</span>
                  <span className="text-[10px] text-[#86868b]">Zero unattended post</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] flex items-center gap-3">
                <Building2 size={20} className="text-[#0071e3] flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[#1d1d1f] block">100% Indemnity</span>
                  <span className="text-[10px] text-[#86868b]">Zero labour liability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Proposal Request Modal */}
      <AnimatePresence>
        {showProposalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-black/[0.08] rounded-[28px] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-[#1d1d1f]"
            >
              {!submittedSuccess ? (
                <form onSubmit={handleProposalSubmit} className="space-y-4">
                  <div className="border-b border-black/[0.08] pb-3">
                    <h3 className="text-xl font-semibold text-[#1d1d1f]">
                      Confirm Proposal Scope
                    </h3>
                    <p className="text-xs text-[#86868b] mt-1">
                      Our commercial director will prepare an official tailored proposal matching these exact specifications.
                    </p>
                  </div>

                  <div className="bg-[#f5f5f7] p-3.5 rounded-2xl border border-black/[0.06] text-xs space-y-1 text-[#515154]">
                    <div>• Guarding: {guardCount} Guards ({shiftPattern})</div>
                    <div>• Housekeeping: {isHousekeepingActive ? `${housekeepingSqFt.toLocaleString()} sq.ft` : 'None'}</div>
                    <div>• Technical: {isTechnicalActive ? `${technicalStaff} Technicians` : 'None'}</div>
                    <div className="text-[#0071e3] font-semibold">• Estimated Total: ₹{jsmMonthlyTotal.toLocaleString('en-IN')}/mo</div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5 mb-1">
                        <Building2 size={13} className="text-[#0071e3]" /> Company / Facility Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={proposalData.companyName}
                        onChange={(e) => setProposalData({ ...proposalData, companyName: e.target.value })}
                        placeholder="e.g. Hyundai Vendor Plant"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5 mb-1">
                        <User size={13} className="text-[#0071e3]" /> Contact Person &amp; Title *
                      </label>
                      <input
                        required
                        type="text"
                        value={proposalData.contactPerson}
                        onChange={(e) => setProposalData({ ...proposalData, contactPerson: e.target.value })}
                        placeholder="e.g. Suresh Kumar (Plant Head)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5 mb-1">
                          <PhoneCall size={13} className="text-[#0071e3]" /> Mobile Phone Number *
                        </label>
                        <input
                          required
                          type="tel"
                          value={proposalData.phone}
                          onChange={(e) => setProposalData({ ...proposalData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5 mb-1">
                          <Mail size={13} className="text-[#0071e3]" /> Corporate Email
                        </label>
                        <input
                          type="email"
                          value={proposalData.email}
                          onChange={(e) => setProposalData({ ...proposalData, email: e.target.value })}
                          placeholder="suresh@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-black/[0.08]">
                    <button
                      type="button"
                      onClick={() => setShowProposalModal(false)}
                      className="flex-1 py-2.5 px-4 rounded-full border border-black/[0.1] text-[#515154] hover:text-[#1d1d1f] text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 px-4 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
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
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f]">Proposal Request Received</h3>
                  <p className="text-xs text-[#86868b] max-w-sm mx-auto leading-relaxed">
                    Our operations director has received your specifications. We will review your site requirements and contact you at <strong className="text-[#1d1d1f]">{proposalData.phone}</strong> within 2 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setShowProposalModal(false);
                    }}
                    className="mt-4 bg-[#1d1d1f] hover:bg-black text-white font-semibold text-xs rounded-full px-6 py-2.5"
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
