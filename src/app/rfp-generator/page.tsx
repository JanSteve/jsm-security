"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileCheck, 
  Building2, 
  User, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Printer, 
  Download, 
  CheckCircle2, 
  Loader2, 
  Award,
  Clock,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RfpGeneratorPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [ticketReference, setTicketReference] = useState("");

  const [rfpData, setRfpData] = useState({
    // Step 1: Facility Profile
    companyName: "",
    contactPerson: "",
    designation: "Head of Procurement / Plant Director",
    phone: "",
    email: "",
    city: "Chennai (Sriperumbudur / Oragadam SIPCOT)",
    facilityType: "Automotive & Manufacturing Plant",
    
    // Step 2: Security Guarding
    guardCount: "8",
    shiftCoverage: "12-Hour Shift (Day & Night)",
    nightSupervision: true,
    
    // Step 3: Housekeeping & Manpower
    housekeepingArea: "25,000 sq.ft (Mechanized Scrubbing)",
    technicalStaff: "2 Electricians / Maintenance Staff",
    
    // Step 4: SLA Mandates
    twoHourReliefSLA: true,
    statutoryIndemnity: true,
    monthlyEcrProofs: true,
    specialClauses: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRfpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setRfpData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleNext = () => {
    if (step === 1 && (!rfpData.companyName || !rfpData.contactPerson || !rfpData.phone)) {
      alert("Please fill in the required company, contact person, and mobile phone fields.");
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleGenerateRFP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const refId = `RFP-JSM-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketReference(refId);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${rfpData.contactPerson} (${rfpData.designation})`,
          phone: rfpData.phone,
          email: rfpData.email,
          facilityName: `${rfpData.companyName} [${rfpData.facilityType}]`,
          service: `Enterprise RFP Submission: ${rfpData.guardCount} Guards (${rfpData.shiftCoverage}) + ${rfpData.housekeepingArea} + ${rfpData.technicalStaff}`,
          location: rfpData.city,
          notes: `[OFFICIAL RFP BID REQUEST - ${refId}]: Facility Type: ${rfpData.facilityType}. Security: ${rfpData.guardCount} Guards (${rfpData.shiftCoverage}). Housekeeping: ${rfpData.housekeepingArea}. Technical: ${rfpData.technicalStaff}. Mandates: 2-Hour Relief SLA, 100% Statutory Indemnity, Monthly ECR Challan verification. Special Notes: ${rfpData.specialClauses || 'None'}.`,
          referenceId: refId,
        }),
      });
      setIsGenerated(true);
    } catch (err) {
      console.error("RFP lead dispatch error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070e17] text-white pt-28 pb-24 selection:bg-[#C5A880] selection:text-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold">
            <FileCheck size={14} />
            <span>ENTERPRISE TENDER &amp; RFP GENERATOR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Commercial Bid &amp; <span className="text-[#C5A880]">RFP Builder</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Generate an official, boardroom-ready commercial proposal with PSARA certification, 2-Hour Relief SLA contract terms, and statutory EPF/ESIC minimum wage schedules.
          </p>
        </div>

        {/* Form or Generated Bid Document */}
        {!isGenerated ? (
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
            
            {/* Step Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-[#C5A880] font-bold uppercase">Step {step} of 3</span>
                <span className="text-zinc-500">
                  {step === 1 && "1. Organization & Site Profile"}
                  {step === 2 && "2. Security & Facility Scope"}
                  {step === 3 && "3. SLA Mandates & Submission"}
                </span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#C5A880] transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={step === 3 ? handleGenerateRFP : (e) => { e.preventDefault(); handleNext(); }}>
              
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Building2 className="text-[#C5A880]" size={20} />
                      Organization &amp; Facility Profile
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Enter your company credentials for the formal proposal header.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">Company / Organization Name *</label>
                      <input
                        required
                        type="text"
                        name="companyName"
                        value={rfpData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Hyundai Tier-1 Ancillary Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">Facility Category</label>
                      <select
                        name="facilityType"
                        value={rfpData.facilityType}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                      >
                        <option>Automotive & Manufacturing Plant</option>
                        <option>Multi-Specialty Hospital / Healthcare</option>
                        <option>IT Tech Park / Commercial Campus</option>
                        <option>Logistics Warehouse & Cold Storage</option>
                        <option>Educational Institution / University</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">Contact Officer Name *</label>
                      <input
                        required
                        type="text"
                        name="contactPerson"
                        value={rfpData.contactPerson}
                        onChange={handleInputChange}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">Designation</label>
                      <input
                        type="text"
                        name="designation"
                        value={rfpData.designation}
                        onChange={handleInputChange}
                        placeholder="e.g. General Manager - Operations"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">Direct Mobile Phone Number *</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={rfpData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">Corporate Email</label>
                      <input
                        type="email"
                        name="email"
                        value={rfpData.email}
                        onChange={handleInputChange}
                        placeholder="rajesh@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Facility Location &amp; City Corridor</label>
                    <select
                      name="city"
                      value={rfpData.city}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                    >
                      <option>Chennai (Sriperumbudur / Oragadam SIPCOT)</option>
                      <option>Tiruchirappalli (Trichy Cantonment & Thuvakudi)</option>
                      <option>Coimbatore (Peelamedu & Kurichi SEZ)</option>
                      <option>Hosur (SIPCOT Phase I & II)</option>
                      <option>Madurai / Salem / Erode Belts</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="text-[#C5A880]" size={20} />
                      Security &amp; Facility Service Scope
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Configure guard strength, shift rotations, and mechanized cleaning requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">Guarding Personnel Required</label>
                      <select
                        name="guardCount"
                        value={rfpData.guardCount}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none font-mono"
                      >
                        <option value="4">4 Guards (Single Shift / Small Site)</option>
                        <option value="8">8 Guards (2-Shift Coverage)</option>
                        <option value="12">12 Guards (24/7 Multi-Gate Coverage)</option>
                        <option value="20">20+ Guards (Large Industrial Campus)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">Shift Rotation Pattern</label>
                      <select
                        name="shiftCoverage"
                        value={rfpData.shiftCoverage}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                      >
                        <option>12-Hour Shift (Day & Night 2-Shift Model)</option>
                        <option>8-Hour Shift (3-Shift Industrial Model)</option>
                        <option>24/7 Continuous Static & Patrol Roster</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">Mechanized Housekeeping Area</label>
                      <select
                        name="housekeepingArea"
                        value={rfpData.housekeepingArea}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                      >
                        <option>None (Security Guarding Only)</option>
                        <option>10,000 sq.ft (Commercial Office / Clinic)</option>
                        <option>25,000 sq.ft (Mechanized Scrubbing)</option>
                        <option>50,000+ sq.ft (Heavy Industrial Floor)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-300 block mb-1">Utility &amp; Technical Staff</label>
                      <select
                        name="technicalStaff"
                        value={rfpData.technicalStaff}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                      >
                        <option>None</option>
                        <option>1 Electrician / HVAC Technician</option>
                        <option>2 Electricians / Maintenance Staff</option>
                        <option>4+ Multi-Trade Facility Technicians</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-xs block">2:00 AM Night Supervisor Van Spot-Checks</span>
                      <span className="text-[11px] text-zinc-400">Randomized unannounced supervisor patrols to ensure guards stay awake</span>
                    </div>
                    <input
                      type="checkbox"
                      name="nightSupervision"
                      checked={rfpData.nightSupervision}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded accent-[#C5A880] cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Scale className="text-[#C5A880]" size={20} />
                      Statutory Compliance &amp; SLA Mandates
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      All JSM bids include contractually binding zero-liability clauses.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-[#C5A880]" />
                        <div>
                          <span className="font-bold text-white block">2-Hour Relief Replacement SLA Guarantee</span>
                          <span className="text-[11px] text-zinc-400">Contractual penalty credit if replacement arrives &gt; 120 mins</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">INCLUDED</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-[#C5A880]" />
                        <div>
                          <span className="font-bold text-white block">100% Client Legal Indemnity</span>
                          <span className="text-[11px] text-zinc-400">JSM absorbs all principal employer labour audit and EPF/ESI liabilities</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">INCLUDED</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-[#C5A880]" />
                        <div>
                          <span className="font-bold text-white block">Monthly ECR Challans &amp; Bank Transfer Proofs</span>
                          <span className="text-[11px] text-zinc-400">Official government electronic returns attached to every invoice</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">INCLUDED</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Additional Tender Notes / Facility Specifications</label>
                    <textarea
                      name="specialClauses"
                      value={rfpData.specialClauses}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="e.g. Require visitor QR code logging, fire safety certificate holder for gate 2."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-zinc-800 mt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white text-xs font-bold font-mono"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    <span>Next: {step === 1 ? "Service Scope" : "SLA Terms"}</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 text-xs font-black uppercase tracking-wider cursor-pointer shadow-lg shadow-[#C5A880]/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Compiling Formal RFP Packet...</span>
                      </>
                    ) : (
                      <>
                        <FileCheck size={16} />
                        <span>Generate &amp; Dispatch Commercial Bid</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          /* Printable Commercial RFP Bid Dossier */
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 size={16} />
                RFP Bid Dossier Compiled Successfully [{ticketReference}]
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-bold rounded-xl cursor-pointer hover:bg-zinc-200"
                >
                  <Printer size={14} /> Print / Save PDF
                </button>
                <button
                  onClick={() => setIsGenerated(false)}
                  className="px-4 py-2 bg-zinc-800 text-zinc-300 text-xs font-bold rounded-xl hover:text-white"
                >
                  Modify Scope
                </button>
              </div>
            </div>

            {/* Formal Document Container (White Paper Style for Print/Screen) */}
            <div className="bg-white text-zinc-900 p-8 sm:p-12 rounded-3xl shadow-2xl border border-zinc-300 space-y-6 font-sans">
              
              {/* Proposal Header */}
              <div className="border-b-2 border-zinc-900 pb-6 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A880] uppercase block">
                    COMMERCIAL TENDER PROPOSAL &amp; SCOPE OF WORK
                  </span>
                  <h2 className="text-2xl font-black text-black uppercase mt-1">JSM INTEGRATED SERVICES</h2>
                  <p className="text-xs text-zinc-600">
                    PSARA Act 2005 Licensed Contractor • Central Command HQ, Tiruchirappalli, Tamil Nadu
                  </p>
                </div>
                <div className="text-right font-mono text-xs text-zinc-600">
                  <div>Reference: <strong>{ticketReference}</strong></div>
                  <div>Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                </div>
              </div>

              {/* Client & Scope Metadata */}
              <div className="grid grid-cols-2 gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-xs">
                <div>
                  <span className="text-zinc-500 font-mono text-[10px] uppercase block">Client Organization</span>
                  <span className="font-bold text-black text-sm">{rfpData.companyName}</span>
                  <span className="block text-zinc-600">{rfpData.contactPerson} ({rfpData.designation})</span>
                  <span className="block text-zinc-600 font-mono">{rfpData.phone} • {rfpData.email}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono text-[10px] uppercase block">Operational Location</span>
                  <span className="font-bold text-black">{rfpData.city}</span>
                  <span className="block text-zinc-600">Facility Type: {rfpData.facilityType}</span>
                </div>
              </div>

              {/* Commercial Schedule Table */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-zinc-700">
                  1. Proposed Workforce &amp; Operational Roster
                </h3>
                <table className="w-full text-left text-xs border border-zinc-200">
                  <thead className="bg-zinc-100 border-b border-zinc-200 font-mono text-zinc-700">
                    <tr>
                      <th className="p-2.5">Service Vector</th>
                      <th className="p-2.5">Deployed Strength</th>
                      <th className="p-2.5">Shift Model</th>
                      <th className="p-2.5">Statutory Compliance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr>
                      <td className="p-2.5 font-bold">Physical Security Guarding</td>
                      <td className="p-2.5 font-mono">{rfpData.guardCount} Guards</td>
                      <td className="p-2.5">{rfpData.shiftCoverage}</td>
                      <td className="p-2.5 text-emerald-700 font-mono font-bold">100% PSARA &amp; Police Verified</td>
                    </tr>
                    {rfpData.housekeepingArea !== "None (Security Guarding Only)" && (
                      <tr>
                        <td className="p-2.5 font-bold">Mechanized Facility Hygiene</td>
                        <td className="p-2.5 font-mono">{rfpData.housekeepingArea}</td>
                        <td className="p-2.5">Daily Mechanized Cleaning</td>
                        <td className="p-2.5 text-emerald-700 font-mono font-bold">Medical-Grade Chemicals &amp; Scrubbers</td>
                      </tr>
                    )}
                    {rfpData.technicalStaff !== "None" && (
                      <tr>
                        <td className="p-2.5 font-bold">Technical &amp; Utility Workforce</td>
                        <td className="p-2.5 font-mono">{rfpData.technicalStaff}</td>
                        <td className="p-2.5">Day Shift Maintenance</td>
                        <td className="p-2.5 text-emerald-700 font-mono font-bold">Licensed Trade Certified</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Binding SLA Terms */}
              <div className="space-y-2 text-xs text-zinc-700 leading-relaxed border-t border-zinc-200 pt-4">
                <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-zinc-700">
                  2. Contractually Binding SLA Terms
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>2-Hour Relief SLA</strong>: Any guard absence is relieved within 120 minutes by a roving reserve staff member.</li>
                  <li><strong>100% Client Legal Indemnity</strong>: JSM absorbs all principal employer statutory liability, EPF, and ESIC audits.</li>
                  <li><strong>Transparent Monthly ECR Proofs</strong>: Official electronic challans attached to every monthly tax invoice.</li>
                  {rfpData.nightSupervision && (
                    <li><strong>2:00 AM Night Supervisor Patrols</strong>: Unannounced supervisor audits conducted across night shifts.</li>
                  )}
                </ul>
              </div>

              {/* Sign-off */}
              <div className="pt-6 border-t border-zinc-200 flex justify-between items-end text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block text-[10px]">PREPARED BY:</span>
                  <span className="font-bold text-black">Commercial Directorate</span>
                  <span className="block text-zinc-600">JSM Integrated Services • Trichy HQ</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 block text-[10px]">AUTHORIZED EXECUTIVE SIGN-OFF</span>
                  <span className="font-bold text-black">Sweety R</span>
                  <span className="block text-zinc-600">Managing Director</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}
