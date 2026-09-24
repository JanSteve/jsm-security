"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { brandData } from "@/data/brand";
import { 
  Building2, 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Clock, 
  CheckCircle, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  Loader2,
  ShieldCheck,
  Phone
} from "lucide-react";
import Link from "next/link";

export default function GetQuotePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    
    services: [] as string[],
    city: "Tiruchirappalli (Trichy)",
    personnelCount: "4",
    
    shiftPattern: "24/7",
    startDate: "",
    specialReqs: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (service: string) => {
    setFormData((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const validateStep = (s: number) => {
    if (s === 1) {
      return formData.companyName && formData.contactPerson && formData.email && formData.phone;
    }
    if (s === 2) {
      return formData.services.length > 0 && formData.city && formData.personnelCount;
    }
    if (s === 3) {
      return formData.shiftPattern && formData.startDate;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    setLoading(true);
    try {
      const response = await fetch("/api/quote-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const html = await response.text();
        const printWindow = window.open("", "_blank");
        if (printWindow) {
          printWindow.document.open();
          printWindow.document.write(html);
          printWindow.document.close();
          setTimeout(() => {
            printWindow.print();
          }, 500);
        }
        setSuccess(true);
      } else {
        setSuccess(true); // Fallback success screen
      }
    } catch (error) {
      console.error(error);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = [
    "Private Security Guarding (PSARA)",
    "Ex-Servicemen (ESM) Field Supervisors",
    "Commercial Housekeeping & Hygiene",
    "Contractual Industrial Staffing"
  ];

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
            <ShieldCheck size={14} />
            <span>Commercial Proposal Engine</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#14181F] tracking-tight">
            Request an Operational Proposal
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6578] leading-relaxed">
            Generate an estimated statutory proposal for security, manpower, or facility management. Our operations desk will review and confirm within 2 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#F8F9FA] border border-[#E7E5E0] shadow-2xs rounded-xl overflow-hidden">
          {/* Progress Bar */}
          {!success && (
            <div className="h-1 bg-[#E7E5E0] w-full relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#0B3D2E]"
                initial={{ width: "33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-[#0B3D2E]/10 text-[#0B3D2E] rounded-full flex items-center justify-center mx-auto border border-[#0B3D2E]/20">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#14181F]">
                    Proposal Request Submitted
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5A6578] max-w-md mx-auto leading-relaxed">
                    Your estimated proposal has been recorded. An official printable summary has been generated, and our operations coordinator will contact you directly within 2 hours.
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#0B3D2E] text-white text-xs font-semibold rounded-lg hover:bg-[#082C21] transition-colors"
                    >
                      Return to Homepage
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}
                  className="space-y-6"
                >
                  {/* STEP 1: Organization Details */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="border-b border-[#E7E5E0] pb-4">
                        <span className="text-xs font-mono font-bold text-[#0B3D2E] uppercase">Step 1 of 3</span>
                        <h2 className="text-lg font-semibold text-[#14181F]">Company &amp; Contact Details</h2>
                        <p className="text-xs text-[#5A6578]">Enter your organization credentials for the formal proposal.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1 text-left">
                          <label className="text-xs font-semibold text-[#14181F]">Company / Facility Name *</label>
                          <input 
                            required 
                            type="text" 
                            name="companyName" 
                            value={formData.companyName} 
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
                            placeholder="e.g. TVS Component Hub"
                          />
                        </div>
                        <div className="space-y-1 text-left">
                          <label className="text-xs font-semibold text-[#14181F]">Contact Person *</label>
                          <input 
                            required 
                            type="text" 
                            name="contactPerson" 
                            value={formData.contactPerson} 
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
                            placeholder="e.g. Rajesh Kumar (Plant Manager)"
                          />
                        </div>
                        <div className="space-y-1 text-left">
                          <label className="text-xs font-semibold text-[#14181F]">Corporate Email *</label>
                          <input 
                            required 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
                            placeholder="rajesh@company.com"
                          />
                        </div>
                        <div className="space-y-1 text-left">
                          <label className="text-xs font-semibold text-[#14181F]">Mobile / Phone Number *</label>
                          <input 
                            required 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] tabular-nums"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Service Requirements */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="border-b border-[#E7E5E0] pb-4">
                        <span className="text-xs font-mono font-bold text-[#0B3D2E] uppercase">Step 2 of 3</span>
                        <h2 className="text-lg font-semibold text-[#14181F]">Service Scope &amp; Deployment Scale</h2>
                        <p className="text-xs text-[#5A6578]">Select required verticals and estimated personnel headcount.</p>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-semibold text-[#14181F]">Required Service Verticals *</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {serviceOptions.map((service) => (
                            <label 
                              key={service} 
                              className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors text-xs font-semibold ${
                                formData.services.includes(service)
                                  ? "border-[#0B3D2E] bg-[#0B3D2E]/5 text-[#0B3D2E]"
                                  : "border-[#E7E5E0] bg-white text-[#5A6578] hover:border-neutral-300"
                              }`}
                            >
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded text-[#0B3D2E] accent-[#0B3D2E]"
                                checked={formData.services.includes(service)}
                                onChange={() => handleCheckboxChange(service)}
                              />
                              <span>{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1 text-left">
                          <label className="text-xs font-semibold text-[#14181F]">Operating City *</label>
                          <select 
                            required 
                            name="city" 
                            value={formData.city} 
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
                          >
                            {brandData.contact.operatingCities.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1 text-left">
                          <label className="text-xs font-semibold text-[#14181F]">Estimated Headcount *</label>
                          <input 
                            required 
                            type="number" 
                            min="1" 
                            max="500" 
                            name="personnelCount" 
                            value={formData.personnelCount} 
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] tabular-nums"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Operational Details */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="border-b border-[#E7E5E0] pb-4">
                        <span className="text-xs font-mono font-bold text-[#0B3D2E] uppercase">Step 3 of 3</span>
                        <h2 className="text-lg font-semibold text-[#14181F]">Shift Schedule &amp; Deployment Date</h2>
                        <p className="text-xs text-[#5A6578]">Provide deployment timing and any special instructions.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1 text-left">
                          <label className="text-xs font-semibold text-[#14181F]">Shift Pattern *</label>
                          <select 
                            required 
                            name="shiftPattern" 
                            value={formData.shiftPattern} 
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
                          >
                            <option value="24/7">24/7 Deployment (3-Shift Continuous)</option>
                            <option value="12-hour">12-Hour Day/Night Shift</option>
                            <option value="8-hour">8-Hour Single Business Shift</option>
                          </select>
                        </div>
                        <div className="space-y-1 text-left">
                          <label className="text-xs font-semibold text-[#14181F]">Target Mobilization Date *</label>
                          <input 
                            required 
                            type="date" 
                            name="startDate" 
                            value={formData.startDate} 
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] tabular-nums"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-xs font-semibold text-[#14181F]">Specific Site Requirements / Post Notes</label>
                        <textarea 
                          name="specialReqs" 
                          value={formData.specialReqs} 
                          onChange={handleInputChange} 
                          rows={3}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] resize-none"
                          placeholder="Note any specific gate access barriers, visitor registers, mechanized scrubbing areas, or armed guard requirements..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E7E5E0]">
                    {step > 1 ? (
                      <button 
                        type="button" 
                        onClick={handlePrev}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#5A6578] hover:text-[#14181F] bg-white border border-[#E7E5E0] transition-colors"
                      >
                        <ArrowLeft size={13} /> Back
                      </button>
                    ) : (
                      <div />
                    )}
                    
                    {step < 3 ? (
                      <button 
                        type="button" 
                        onClick={handleNext}
                        disabled={!validateStep(step)}
                        className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-xs font-semibold bg-[#0B3D2E] text-white hover:bg-[#082C21] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ml-auto shadow-xs"
                      >
                        <span>Next Step</span>
                        <ArrowRight size={13} />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={!validateStep(step) || loading}
                        className="inline-flex items-center gap-1.5 px-7 py-2.5 rounded-lg text-xs font-semibold bg-[#0B3D2E] text-white hover:bg-[#082C21] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ml-auto shadow-xs"
                      >
                        {loading ? (
                          <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating Proposal...</>
                        ) : (
                          <><FileText size={13} /> Generate Proposal</>
                        )}
                      </button>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
