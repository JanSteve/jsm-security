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
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl font-bold text-xs uppercase tracking-wider border-2 border-white/20 backdrop-blur-md cursor-pointer transition-colors"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <ShieldAlert size={16} />
          <span className="hidden sm:inline font-black">2-Hour Emergency Relief</span>
          <span className="sm:hidden font-black">Emergency SOS</span>
        </motion.button>
      </div>

      {/* Emergency Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border-2 border-red-500/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-800"
              >
                <X size={18} />
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Header */}
                  <div className="border-b border-zinc-800 pb-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] font-mono font-extrabold uppercase mb-2">
                      <Radio size={12} className="animate-pulse" /> Direct Operations Escalation
                    </div>
                    <h3 className="text-xl font-black text-white uppercase">
                      2-Hour Rapid Relief Dispatch
                    </h3>
                    <p className="text-xs text-zinc-300 mt-1">
                      Facing guard absenteeism, sudden strike, or surge requirement? Our roving reserve teams deploy on-site in under 120 minutes.
                    </p>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 mb-1">
                        <Building2 size={13} className="text-red-400" /> Facility / Plant Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Oragadam Manufacturing Unit 2"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-red-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 mb-1">
                          <User size={13} className="text-red-400" /> Contact Officer *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.contactPerson}
                          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                          placeholder="e.g. Ramesh (Duty Officer)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-red-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 mb-1">
                          <PhoneCall size={13} className="text-red-400" /> Direct Mobile Phone *
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-red-500 outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 mb-1">
                          <MapPin size={13} className="text-red-400" /> Regional Corridor
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-red-500 outline-none"
                        >
                          <option>Sriperumbudur / Oragadam SIPCOT</option>
                          <option>Tiruchirappalli (Trichy Region)</option>
                          <option>Coimbatore (Peelamedu & Kurichi)</option>
                          <option>Hosur (SIPCOT Phase I & II)</option>
                          <option>Madurai / Salem Hubs</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 mb-1">
                          <Clock size={13} className="text-red-400" /> Guards Required
                        </label>
                        <select
                          value={formData.guardsNeeded}
                          onChange={(e) => setFormData({ ...formData, guardsNeeded: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-red-500 outline-none"
                        >
                          <option>1 - 2 Relief Guards</option>
                          <option>3 - 5 Relief Guards</option>
                          <option>6 - 10 Surge Guards</option>
                          <option>10+ Personnel (Strike/Event Surge)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-red-600/30"
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
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-black text-white">Emergency Alert Dispatched!</h3>
                  <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                    Our regional duty supervisor has received your high-priority request. We are contacting <strong className="text-white">{formData.phone}</strong> immediately for post coordinates.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setIsOpen(false);
                    }}
                    className="mt-4 bg-[#C5A880] text-zinc-950 font-bold text-xs"
                  >
                    Close
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
