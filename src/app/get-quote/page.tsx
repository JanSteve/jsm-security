"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { brandData } from "@/data/brand";
import { Building2, User, Mail, MapPin, Briefcase, Calendar, Clock, CheckCircle, FileText, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
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
    city: "",
    personnelCount: "1",
    
    shiftPattern: "12-hour",
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
          // Give it a moment to render before printing
          setTimeout(() => {
            printWindow.print();
          }, 500);
        }
        setSuccess(true);
      } else {
        alert("Failed to generate quote. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = [
    "Private Security",
    "Commercial Housekeeping",
    "Contractual Manpower",
    "Integrated Operations"
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-zinc-100 font-sans selection:bg-[#C5A880]/30 selection:text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-[11px] font-mono font-bold tracking-[0.16em] text-[#C5A880] uppercase block">
            Commercial proposal engine
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white text-balance">
            Instant quote <span className="text-[#C5A880]">generator</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto text-pretty">
            Get an estimated commercial proposal instantly. Our team will review your requirements and reach out within 2 hours for final confirmation.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#0B0F17] backdrop-blur-xl border border-zinc-800 shadow-2xl rounded-3xl overflow-hidden relative">
          
          {/* Progress Bar */}
          {!success && (
            <div className="h-1.5 bg-zinc-800 w-full relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#C5A880]"
                initial={{ width: "33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-[#C5A880]/10 text-[#C5A880] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#C5A880]/30">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-black mb-4 text-white text-balance">Quote generated successfully!</h2>
                  <p className="text-zinc-400 text-base sm:text-lg mb-8 max-w-md mx-auto text-pretty">
                    Your estimated proposal has been generated. A copy has been opened in a new tab for you to print or save as PDF. Our team will reach out to you within 2 hours.
                  </p>
                  <Link href="/" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors press-scale min-h-[44px]">
                    Return to homepage
                  </Link>
                </motion.div>
              ) : (
                <motion.form 
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}
                  className="space-y-8"
                >
                  
                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="mb-8">
                        <h2 className="text-2xl font-black mb-2 flex items-center gap-2 text-white">
                          <span className="w-8 h-8 rounded-full bg-[#121824] text-[#C5A880] border border-[#C5A880]/40 text-sm flex items-center justify-center tabular-nums">1</span>
                          Company &amp; contact details
                        </h2>
                        <p className="text-zinc-400 text-sm">Tell us about your organization and how our operations team can reach you.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#C5A880]" /> Company name <span className="text-[#C5A880]">*</span>
                          </label>
                          <input 
                            required type="text" name="companyName" value={formData.companyName} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all min-h-[44px]"
                            placeholder="e.g. TVS Component Hub"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                            <User className="w-4 h-4 text-[#C5A880]" /> Contact person <span className="text-[#C5A880]">*</span>
                          </label>
                          <input 
                            required type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all min-h-[44px]"
                            placeholder="e.g. Rajesh Kumar (Facility Head)"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#C5A880]" /> Corporate email <span className="text-[#C5A880]">*</span>
                          </label>
                          <input 
                            required type="email" name="email" value={formData.email} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all min-h-[44px]"
                            placeholder="rajesh@company.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#C5A880]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg> Mobile / phone number <span className="text-[#C5A880]">*</span>
                          </label>
                          <input 
                            required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all tabular-nums min-h-[44px]"
                            placeholder="e.g. +91 98765 43210"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="mb-8">
                        <h2 className="text-2xl font-black mb-2 flex items-center gap-2 text-white">
                          <span className="w-8 h-8 rounded-full bg-[#121824] text-[#C5A880] border border-[#C5A880]/40 text-sm flex items-center justify-center tabular-nums">2</span>
                          Service requirements
                        </h2>
                        <p className="text-zinc-400 text-sm">What type of services do you need?</p>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#C5A880]" /> Select services <span className="text-[#C5A880]">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {serviceOptions.map((service) => (
                            <label key={service} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all min-h-[44px] press-scale ${formData.services.includes(service) ? 'border-[#C5A880] bg-[#C5A880]/15 text-white' : 'border-zinc-800 bg-[#121824] text-zinc-300 hover:border-zinc-600'}`}>
                              <input 
                                type="checkbox" 
                                className="w-5 h-5 rounded border-zinc-700 bg-[#07090E] text-[#C5A880] focus:ring-[#C5A880]"
                                checked={formData.services.includes(service)}
                                onChange={() => handleCheckboxChange(service)}
                              />
                              <span className="font-semibold text-sm">{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#C5A880]" /> Operating city <span className="text-[#C5A880]">*</span>
                          </label>
                          <select 
                            required name="city" value={formData.city} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all min-h-[44px]"
                          >
                            <option value="">Select a city</option>
                            {brandData.contact.operatingCities.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                            <User className="w-4 h-4 text-[#C5A880]" /> Number of personnel <span className="text-[#C5A880]">*</span>
                          </label>
                          <input 
                            required type="number" min="1" max="1000" name="personnelCount" value={formData.personnelCount} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all tabular-nums min-h-[44px]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="mb-8">
                        <h2 className="text-2xl font-black mb-2 flex items-center gap-2 text-white">
                          <span className="w-8 h-8 rounded-full bg-[#121824] text-[#C5A880] border border-[#C5A880]/40 text-sm flex items-center justify-center tabular-nums">3</span>
                          Operational details
                        </h2>
                        <p className="text-zinc-400 text-sm">Provide final details for your proposal.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#C5A880]" /> Shift pattern <span className="text-[#C5A880]">*</span>
                          </label>
                          <select 
                            required name="shiftPattern" value={formData.shiftPattern} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all min-h-[44px]"
                          >
                            <option value="8-hour">8-hour shifts</option>
                            <option value="12-hour">12-hour shifts</option>
                            <option value="24/7">24/7 deployment (multiple shifts)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#C5A880]" /> Preferred start date <span className="text-[#C5A880]">*</span>
                          </label>
                          <input 
                            required type="date" name="startDate" value={formData.startDate} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all tabular-nums min-h-[44px]"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#C5A880]" /> Special requirements / notes
                        </label>
                        <textarea 
                          name="specialReqs" value={formData.specialReqs} onChange={handleInputChange} rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#121824] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all"
                          placeholder="Any specific instructions or requirements..."
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-zinc-800/80">
                    {step > 1 ? (
                      <button 
                        type="button" 
                        onClick={handlePrev}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-zinc-400 hover:text-white hover:bg-[#121824] transition-colors min-h-[44px] press-scale"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    ) : (
                      <div></div>
                    )}
                    
                    {step < 3 ? (
                      <button 
                        type="button" 
                        onClick={handleNext}
                        disabled={!validateStep(step)}
                        className="flex items-center gap-2 px-8 py-3 rounded-full font-bold bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ml-auto min-h-[44px] press-scale"
                      >
                        Next step <ArrowRight className="w-4 h-4 text-black" />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={!validateStep(step) || loading}
                        className="flex items-center gap-2 px-8 py-3 rounded-full font-bold bg-[#C5A880] text-black hover:bg-[#b0946e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ml-auto shadow-lg shadow-[#C5A880]/30 min-h-[44px] press-scale"
                      >
                        {loading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Generating quote...</>
                        ) : (
                          <><FileText className="w-4 h-4" /> Generate instant quote</>
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
    </div>
  );
}
