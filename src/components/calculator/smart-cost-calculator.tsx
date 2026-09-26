"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Hospital, 
  Factory, 
  Laptop, 
  ShieldCheck, 
  FileText, 
  Mail, 
  PhoneCall, 
  CheckCircle2, 
  Loader2, 
  X, 
  Download 
} from "lucide-react";
import { brandData } from "@/data/brand";

interface FacilityOption {
  id: string;
  name: string;
  sizeDesc: string;
  icon: typeof Building2;
  defaultGuards: number;
}

const facilityTypes: FacilityOption[] = [
  { id: "office", name: "Corporate Office", sizeDesc: "50–500 sq ft", icon: Building2, defaultGuards: 2 },
  { id: "hospital", name: "Hospital / Clinic", sizeDesc: "100–1000 sq ft", icon: Hospital, defaultGuards: 4 },
  { id: "factory", name: "Factory / Plant", sizeDesc: "500–5000 sq ft", icon: Factory, defaultGuards: 6 },
  { id: "itpark", name: "IT Park / SEZ", sizeDesc: "200–2000 sq ft", icon: Laptop, defaultGuards: 8 },
];

export function SmartCostCalculator() {
  const [selectedFacility, setSelectedFacility] = useState<string>("office");
  const [guardsCount, setGuardsCount] = useState<number>(2);
  const [housekeepingPlan, setHousekeepingPlan] = useState<"none" | "3x" | "daily">("3x");
  const [staffingType, setStaffingType] = useState<"none" | "clerical" | "blue-collar">("none");
  const [includeSlaAddon, setIncludeSlaAddon] = useState<boolean>(true);
  const [includeAuditAddon, setIncludeAuditAddon] = useState<boolean>(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"download" | "email">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    facilityName: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "Tiruchirappalli (Trichy)",
  });

  // Cost Logic
  const guardUnitCost = 12000;
  const securityCost = guardsCount * guardUnitCost;
  
  const housekeepingCost = 
    housekeepingPlan === "3x" ? 6000 : 
    housekeepingPlan === "daily" ? 15000 : 0;

  const staffingCost = 
    staffingType === "clerical" ? 24000 : 
    staffingType === "blue-collar" ? 18000 : 0;

  const subtotal = securityCost + housekeepingCost + staffingCost;
  const slaAddonCost = includeSlaAddon ? 2400 : 0;
  const auditAddonCost = includeAuditAddon ? 1800 : 0;
  const totalMonthlyCost = subtotal + slaAddonCost + auditAddonCost;

  // In-House vs Outsourced Comparison savings
  const inHouseEstimatedMonthly = Math.round((securityCost * 1.35) + (housekeepingCost * 1.25) + (staffingCost * 1.2));
  const monthlySavings = Math.max(0, inHouseEstimatedMonthly - totalMonthlyCost);
  const annualSavings = monthlySavings * 12;

  const handleFacilityChange = (facId: string) => {
    setSelectedFacility(facId);
    const fac = facilityTypes.find(f => f.id === facId);
    if (fac) {
      setGuardsCount(fac.defaultGuards);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.facilityName || !formData.phone) return;

    setIsSubmitting(true);
    const refCode = `JSM-EST-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.contactPerson || "Commercial Inquirer",
          phone: formData.phone,
          email: formData.email,
          facilityName: formData.facilityName,
          service: `Smart Cost Estimate: ${selectedFacility.toUpperCase()} (${guardsCount} Guards, Housekeeping: ${housekeepingPlan}, Staffing: ${staffingType})`,
          headcount: `${guardsCount} Guards`,
          location: formData.city,
          notes: `Calculated Estimate: Rs ${totalMonthlyCost.toLocaleString("en-IN")}/mo. Action: ${modalAction.toUpperCase()}. Reference: ${refCode}.`,
          referenceId: refCode,
        }),
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Calculator lead submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F8F9FA] border-b border-[#E5E7EB]" id="cost-calculator">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2 text-left">
          <div className="text-xs font-semibold text-[#1E5BA8] uppercase tracking-wider">
            Commercial Pricing Transparency
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] leading-[1.18] text-[#1A1F2E] font-semibold tracking-[-0.01em]">
            See your custom monthly cost in 60 seconds.
          </h2>
          <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed line-measure">
            No hidden clauses or surprise statutory overheads. Configure your facility specs below for instant line-item breakdown.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5E7EB] p-6 sm:p-8 space-y-8 shadow-subtle text-left">
            
            {/* ROW 1: Facility Type Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1F2E] block">
                1. Select Your Facility Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {facilityTypes.map((fac) => {
                  const Icon = fac.icon;
                  const isSelected = selectedFacility === fac.id;
                  return (
                    <button
                      key={fac.id}
                      type="button"
                      onClick={() => handleFacilityChange(fac.id)}
                      className={`p-3.5 border text-left rounded-[4px] transition-all cursor-pointer min-touch-target ${
                        isSelected
                          ? "border-[#1E5BA8] bg-[#EFF4F9] text-[#0F1922] ring-1 ring-[#1E5BA8]"
                          : "border-[#E5E7EB] bg-white text-[#4A5160] hover:border-[#1E5BA8]/50"
                      }`}
                    >
                      <Icon size={18} className={isSelected ? "text-[#1E5BA8]" : "text-[#4A5160]"} />
                      <div className="font-semibold text-xs mt-2 text-[#1A1F2E]">{fac.name}</div>
                      <div className="text-[10px] text-[#4A5160]">{fac.sizeDesc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ROW 2: Guards Count Slider */}
            <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1F2E]">
                  2. Security Guards Required
                </label>
                <div className="text-right">
                  <span className="text-xl font-bold text-[#0F1922] tabular-nums">{guardsCount}</span>
                  <span className="text-xs text-[#4A5160] ml-1">Guards</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={guardsCount}
                onChange={(e) => setGuardsCount(Number(e.target.value))}
                className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#1E5BA8]"
              />
              <div className="flex justify-between text-[11px] text-[#4A5160] font-mono">
                <span>1 Guard (Base)</span>
                <span>8 Guards (Medium)</span>
                <span>15+ Guards (Enterprise)</span>
              </div>
            </div>

            {/* ROW 3: Housekeeping Frequency */}
            <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1F2E] block">
                3. Housekeeping &amp; Facility Hygiene
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "none", label: "No Housekeeping", price: "₹0/mo" },
                  { id: "3x", label: "3x per week", price: "₹6,000/mo" },
                  { id: "daily", label: "Daily Deep Cleaning", price: "₹15,000/mo" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHousekeepingPlan(item.id as any)}
                    className={`p-3 border text-left rounded-[4px] transition-all cursor-pointer min-touch-target ${
                      housekeepingPlan === item.id
                        ? "border-[#1E5BA8] bg-[#EFF4F9] text-[#0F1922] ring-1 ring-[#1E5BA8]"
                        : "border-[#E5E7EB] bg-white text-[#4A5160] hover:border-[#1E5BA8]/50"
                    }`}
                  >
                    <span className="text-xs font-semibold block text-[#1A1F2E]">{item.label}</span>
                    <span className="text-[11px] text-[#1E5BA8] font-medium">{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ROW 4: Contract Staffing */}
            <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1F2E] block">
                4. Contractual Manpower Staffing (Optional)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "none", label: "None Needed", price: "₹0/mo" },
                  { id: "blue-collar", label: "Blue-Collar Labor", price: "₹18,000/mo" },
                  { id: "clerical", label: "Clerical / Admin", price: "₹24,000/mo" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStaffingType(item.id as any)}
                    className={`p-3 border text-left rounded-[4px] transition-all cursor-pointer min-touch-target ${
                      staffingType === item.id
                        ? "border-[#1E5BA8] bg-[#EFF4F9] text-[#0F1922] ring-1 ring-[#1E5BA8]"
                        : "border-[#E5E7EB] bg-white text-[#4A5160] hover:border-[#1E5BA8]/50"
                    }`}
                  >
                    <span className="text-xs font-semibold block text-[#1A1F2E]">{item.label}</span>
                    <span className="text-[11px] text-[#1E5BA8] font-medium">{item.price}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Breakdown Box (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#E5E7EB] p-6 sm:p-8 space-y-6 shadow-subtle text-left">
              <div className="border-b border-[#E5E7EB] pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#4A5160]">
                  Commercial Breakdown
                </span>
                <h3 className="text-xl font-semibold text-[#1A1F2E] mt-1">
                  Estimated Monthly Investment
                </h3>
              </div>

              {/* Line-item summary */}
              <div className="space-y-2.5 text-xs text-[#4A5160]">
                <div className="flex justify-between items-center py-1">
                  <span>Physical Security ({guardsCount} guards @ ₹12K):</span>
                  <span className="font-semibold text-[#1A1F2E] tabular-nums">
                    ₹{securityCost.toLocaleString("en-IN")}
                  </span>
                </div>

                {housekeepingCost > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span>Housekeeping ({housekeepingPlan}):</span>
                    <span className="font-semibold text-[#1A1F2E] tabular-nums">
                      ₹{housekeepingCost.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {staffingCost > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span>Contract Staffing ({staffingType}):</span>
                    <span className="font-semibold text-[#1A1F2E] tabular-nums">
                      ₹{staffingCost.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#E5E7EB] flex justify-between items-center font-medium">
                  <span>Subtotal Base Services:</span>
                  <span className="text-[#1A1F2E] tabular-nums">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Optional SLA Add-ons Checkboxes */}
              <div className="p-3.5 bg-[#F8F9FA] border border-[#E5E7EB] space-y-2.5 rounded-[4px]">
                <div className="text-xs font-semibold text-[#1A1F2E]">
                  Optional Enterprise Add-ons:
                </div>
                
                <label className="flex items-start gap-2.5 text-xs text-[#4A5160] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSlaAddon}
                    onChange={(e) => setIncludeSlaAddon(e.target.checked)}
                    className="mt-0.5 accent-[#10A870] rounded-[2px]"
                  />
                  <span>
                    <strong className="text-[#1A1F2E]">2-Hour Relief Replacement SLA</strong> (+₹2,400/mo)
                  </span>
                </label>

                <label className="flex items-start gap-2.5 text-xs text-[#4A5160] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeAuditAddon}
                    onChange={(e) => setIncludeAuditAddon(e.target.checked)}
                    className="mt-0.5 accent-[#10A870] rounded-[2px]"
                  />
                  <span>
                    <strong className="text-[#1A1F2E]">2:00 AM Night Supervisor Van Audits</strong> (+₹1,800/mo)
                  </span>
                </label>
              </div>

              {/* Total Box */}
              <div className="p-4 bg-[#0F1922] text-white rounded-[4px] space-y-1">
                <span className="text-xs text-neutral-400">Total Estimated Monthly Investment</span>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight tabular-nums text-white">
                  ₹{totalMonthlyCost.toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-neutral-300 ml-2">/ month + GST</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalAction("download");
                    setIsModalOpen(true);
                  }}
                  className="w-full h-[48px] rounded-[4px] bg-[#1E5BA8] hover:bg-[#164682] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-subtle press-scale min-touch-target cursor-pointer"
                >
                  <Download size={15} />
                  <span>Download PDF Proposal</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModalAction("email");
                    setIsModalOpen(true);
                  }}
                  className="w-full h-[48px] rounded-[4px] border border-[#0F1922] bg-white hover:bg-[#F8F9FA] text-[#0F1922] text-xs font-semibold flex items-center justify-center gap-2 transition-colors press-scale min-touch-target cursor-pointer"
                >
                  <Mail size={15} />
                  <span>Email Me This Custom Quote</span>
                </button>
              </div>
            </div>

            {/* Quick SLA Assurance Badge */}
            <div className="p-4 bg-white border border-[#E5E7EB] flex items-center gap-3 text-xs text-[#4A5160] text-left">
              <ShieldCheck size={20} className="text-[#10A870] shrink-0" />
              <span>
                Includes 100% EPF/ESIC statutory compliance, police verification, and zero client co-employer liability.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-left">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSubmitSuccess(false);
              }}
              className="absolute top-4 right-4 text-[#4A5160] hover:text-[#1A1F2E] p-1.5"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {!submitSuccess ? (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="border-b border-[#E5E7EB] pb-3">
                  <h4 className="text-lg font-semibold text-[#1A1F2E]">
                    {modalAction === "download" ? "Download Official PDF Proposal" : "Email Custom Quote Breakdown"}
                  </h4>
                  <p className="text-xs text-[#4A5160] mt-1">
                    Your estimated investment: <strong className="text-[#1E5BA8]">₹{totalMonthlyCost.toLocaleString("en-IN")}/mo</strong> ({guardsCount} Guards, {housekeepingPlan} cleaning).
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#1A1F2E] block mb-1">
                      Company / Facility Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.facilityName}
                      onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                      placeholder="e.g. Apex Engineering Plant"
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#1A1F2E] focus:ring-1 focus:ring-[#1E5BA8] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1F2E] block mb-1">
                      Contact Person &amp; Designation
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="e.g. Rajesh Kumar (Plant Manager)"
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#1A1F2E] focus:ring-1 focus:ring-[#1E5BA8] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1F2E] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#1A1F2E] focus:ring-1 focus:ring-[#1E5BA8] outline-none tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1F2E] block mb-1">
                      Email Address (for PDF dispatch)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rajesh@apex.com"
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#1A1F2E] focus:ring-1 focus:ring-[#1E5BA8] outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 rounded-[4px] border border-[#E5E7EB] text-xs font-semibold text-[#4A5160] hover:bg-[#F8F9FA]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 rounded-[4px] bg-[#0F1922] hover:bg-[#080D12] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>{modalAction === "download" ? "Download Now" : "Send Quote"}</span>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#E8F8F2] text-[#10A870] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-base font-semibold text-[#1A1F2E]">Proposal Dispatched</h4>
                <p className="text-xs text-[#4A5160] leading-relaxed">
                  Your customized specification has been logged. Our commercial desk will reach out to <strong className="text-[#1A1F2E]">{formData.phone}</strong> within 2 hours with the formal stamped proposal.
                </p>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSubmitSuccess(false);
                  }}
                  className="mt-2 px-6 py-2 rounded-[4px] bg-[#0F1922] text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
