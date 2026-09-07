"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertTriangle, 
  ShieldAlert, 
  PhoneCall, 
  User, 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  X,
  Radio
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmergencyReliefModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    location: "Sriperumbudur / Chennai Corridor",
    urgency: "Immediate (< 2 Hours)",
    guardsNeeded: "2 Guards",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.phone) return;

    setIsSubmitting(true);
    const ticketRef = `EMERGENCY-SOS-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.contactPerson,
          phone: formData.phone,
          facilityName: formData.companyName,
          service: `PRIORITY EMERGENCY RELIEF DISPATCH (${formData.guardsNeeded})`,
          location: formData.location,
          notes: `[EMERGENCY SOS DISPATCH]: Urgency: ${formData.urgency}. Guards Needed: ${formData.guardsNeeded}. Client Notes: ${formData.notes || 'Immediate relief deployment required.'}`,
          referenceId: ticketRef,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Emergency dispatch error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button (Bottom Left on Mobile/Desktop) */}
      <div className="fixed bottom-20 md:bottom-6 left-4 sm:left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-white/95 backdrop-blur-xl hover:bg-white text-[#1d1d1f] rounded-full shadow-lg border border-black/[0.08] text-xs font-semibold tracking-wide cursor-pointer transition-all press-scale"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <ShieldAlert size={15} className="text-red-600" />
          <span className="hidden sm:inline font-semibold">2-Hour Emergency Relief</span>
          <span className="sm:hidden font-semibold">SOS Relief</span>
        </motion.button>
      </div>

      {/* Emergency Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-black/[0.08] rounded-[28px] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-[#1d1d1f]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-[#86868b] hover:text-[#1d1d1f] p-1.5 rounded-full hover:bg-black/[0.05] transition-colors"
              >
                <X size={18} />
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Header */}
                  <div className="border-b border-black/[0.08] pb-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200/60 text-red-700 text-[10px] font-mono font-bold uppercase mb-2">
                      <Radio size={12} className="animate-pulse" /> Direct Operations Escalation
                    </div>
                    <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight">
                      2-Hour Rapid Relief Dispatch
                    </h3>
                    <p className="text-xs text-[#515154] mt-1 leading-relaxed">
                      Facing guard absenteeism, sudden strike, or surge requirement? Our roving reserve teams deploy on-site in under 120 minutes.
                    </p>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5 mb-1">
                        <Building2 size={13} className="text-red-600" /> Facility / Plant Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Oragadam Manufacturing Unit 2"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5 mb-1">
                          <User size={13} className="text-red-600" /> Contact Officer *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.contactPerson}
                          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                          placeholder="e.g. Ramesh (Duty Officer)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5 mb-1">
                          <PhoneCall size={13} className="text-red-600" /> Direct Mobile Phone *
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] outline-none font-mono tabular-nums"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5 mb-1">
                          <MapPin size={13} className="text-red-600" /> Regional Corridor
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] outline-none"
                        >
                          <option>Sriperumbudur / Oragadam SIPCOT</option>
                          <option>Tiruchirappalli (Trichy Region)</option>
                          <option>Coimbatore (Peelamedu &amp; Kurichi)</option>
                          <option>Hosur (SIPCOT Phase I &amp; II)</option>
                          <option>Madurai / Salem Hubs</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5 mb-1">
                          <Clock size={13} className="text-red-600" /> Guards Required
                        </label>
                        <select
                          value={formData.guardsNeeded}
                          onChange={(e) => setFormData({ ...formData, guardsNeeded: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] outline-none"
                        >
                          <option>1 - 2 Relief Guards</option>
                          <option>3 - 5 Relief Guards</option>
                          <option>6 - 10 Surge Guards</option>
                          <option>10+ Personnel (Strike/Event Surge)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-black/[0.08]">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-2.5 px-4 rounded-full border border-black/[0.1] text-[#515154] hover:text-[#1d1d1f] text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Alerting Command...</span>
                        </>
                      ) : (
                        <span>Deploy Relief Guard</span>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1f]">Emergency Alert Dispatched</h3>
                  <p className="text-xs text-[#515154] max-w-sm mx-auto leading-relaxed">
                    Our regional duty supervisor has received your high-priority request. We are contacting <strong className="text-[#1d1d1f]">{formData.phone}</strong> immediately for post coordinates.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setIsOpen(false);
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
    </>
  );
}
