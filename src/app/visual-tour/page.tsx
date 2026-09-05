"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { 
  Eye, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Radio, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  User, 
  Mail, 
  Loader2,
  X,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HotspotZone {
  id: string;
  name: string;
  zoneTag: string;
  image: string;
  metric: string;
  description: string;
  features: string[];
}

const ZONES: HotspotZone[] = [
  {
    id: "gate",
    name: "Main Gateway Access & Standing Orders",
    zoneTag: "ZONE 01 • ACCESS CONTROL",
    image: "/images/real_jsm_welcome_trichy_salute.jpg",
    metric: "100% PSARA Police Verified",
    description: "Disciplined uniform turnout, entry gate vigilance, and strict standing orders under regional command.",
    features: [
      "Vetted turn-out inspection and post allocation",
      "Perimeter access control and visitor protocol",
      "2-Hour Relief SLA guarantee on duty posts",
    ],
  },
  {
    id: "muster",
    name: "Daytime Shift Briefing & Muster Roll",
    zoneTag: "ZONE 02 • SHIFT DEPLOYMENT",
    image: "/images/real_jsm_shift_muster_day.jpg",
    metric: "100% On-Time Turnout",
    description: "Daily pre-shift operational briefing, duty post allocation, and radio communication protocol check at the security post.",
    features: [
      "Pre-shift roll call and grooming inspection",
      "Walkie-talkie channel and duty logbook check",
      "Biometric attendance and statutory muster records",
    ],
  },
  {
    id: "terminal",
    name: "Terminal Gate & Passenger Screening",
    zoneTag: "ZONE 03 • ACCESS PROTOCOL",
    image: "/images/real_jsm_terminal_entry_salute.jpg",
    metric: "High-Density Gate Control",
    description: "High-stakes terminal gate management, ticket verification, and passenger crowd facilitation adhering to aviation protocols.",
    features: [
      "Strict gate access verification (Gate D6)",
      "Passenger crowd logistics and courtesy assistance",
      "24/7 supervisor check-in and station coverage",
    ],
  },
  {
    id: "drill",
    name: "Night Platoon Drill & Inspection Parade",
    zoneTag: "ZONE 04 • COMMAND DISCIPLINE",
    image: "/images/real_jsm_airport_drill.jpg",
    metric: "0 Security Incidents",
    description: "Official night shift inspection, drill parade, and supervisor roll call executed at Tiruchirappalli International Airport.",
    features: [
      "Night shift parade inspection by operations head",
      "Perimeter patrol route assignment and night vigilance",
      "Unannounced 2:00 AM mobile supervisor check-ins",
    ],
  },
  {
    id: "night-squad",
    name: "Uniformed Night Security Platoon",
    zoneTag: "ZONE 05 • NIGHT VIGILANCE",
    image: "/images/real_jsm_guard_squad_night.jpg",
    metric: "2:00 AM Active Roster",
    description: "Complete night shift roster deployed with verified uniform turnout, epaulet badges, and supervisor spot-checks.",
    features: [
      "Zero unattended gates with reserve coverage",
      "Night-time perimeter security patrols",
      "Emergency escalation readiness under Central Command",
    ],
  },
];

export default function VisualTourPage() {
  const [selectedZone, setSelectedZone] = useState<HotspotZone>(ZONES[0]);
  
  // Quick Inquiry Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    selectedZoneName: selectedZone.name,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.companyName || !inquiryForm.contactPerson || !inquiryForm.phone) return;

    setIsSubmitting(true);
    const refId = `TOUR-LEAD-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryForm.contactPerson,
          phone: inquiryForm.phone,
          email: inquiryForm.email,
          facilityName: inquiryForm.companyName,
          service: `Visual Tour Site Upgrade: ${selectedZone.name}`,
          location: "Tamil Nadu Facility",
          notes: `[VISUAL TOUR LEAD]: Client explored 360° Facility Tour and requested upgrade for ${selectedZone.name}. Requester Phone: ${inquiryForm.phone}.`,
          referenceId: refId,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Tour lead dispatch error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070e17] text-white pt-28 pb-24 selection:bg-[#C5A880] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold">
            <Eye size={14} />
            <span>360° INTERACTIVE FACILITY BLUEPRINT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Facility Coverage <span className="text-[#C5A880]">Visual Tour</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Select any operational zone below to view how JSM guards, maintains, and monitors high-stakes industrial and commercial campuses.
          </p>
        </div>

        {/* Zone Selector Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {ZONES.map((zone) => {
            const isSelected = selectedZone.id === zone.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#C5A880] text-zinc-950 shadow-lg shadow-[#C5A880]/20 scale-105"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {zone.name}
              </button>
            );
          })}
        </div>

        {/* Selected Zone Visual Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedZone.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10"
          >
            {/* Left: High-Resolution Photo (7 cols) */}
            <div className="lg:col-span-7 relative h-[320px] sm:h-[440px] rounded-2xl overflow-hidden border border-zinc-800 shadow-xl group">
              <Image
                src={selectedZone.image}
                alt={selectedZone.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#C5A880] text-[10px] font-mono font-bold uppercase">
                {selectedZone.zoneTag}
              </div>

              <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-emerald-500/90 text-zinc-950 text-[10px] font-mono font-black uppercase shadow-md">
                {selectedZone.metric}
              </div>
            </div>

            {/* Right: Operational Details & Action (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#C5A880] uppercase tracking-widest block mb-1">
                  OPERATIONAL SPECIFICATIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedZone.name}</h2>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed font-normal">
                  {selectedZone.description}
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                  Ground Execution Protocols:
                </span>
                {selectedZone.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-zinc-800/40 p-3 rounded-xl border border-zinc-700/40 text-xs text-zinc-200">
                    <CheckCircle2 size={15} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => setModalOpen(true)}
                  className="bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer px-6 py-5 shadow-lg shadow-[#C5A880]/20"
                >
                  <span>Deploy at My Facility</span>
                  <ArrowRight size={14} className="ml-1.5" />
                </Button>
                <Link href="/portal">
                  <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white text-xs rounded-xl py-5">
                    View Live Portal
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick Inquiry Modal */}
        <AnimatePresence>
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-white"
              >
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-800"
                >
                  <X size={18} />
                </button>

                {!submitted ? (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="border-b border-zinc-800 pb-3">
                      <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase">
                        SITE UPGRADE ASSESSMENT
                      </span>
                      <h3 className="text-xl font-black text-white uppercase mt-0.5">
                        Deploy {selectedZone.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Our regional operations manager will evaluate your post coordinates and prepare a custom proposal.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-zinc-300 block mb-1">Company / Plant Name *</label>
                        <input
                          required
                          type="text"
                          value={inquiryForm.companyName}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, companyName: e.target.value })}
                          placeholder="e.g. Oragadam Manufacturing Ltd"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-zinc-300 block mb-1">Contact Officer *</label>
                          <input
                            required
                            type="text"
                            value={inquiryForm.contactPerson}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, contactPerson: e.target.value })}
                            placeholder="e.g. Ramesh"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-zinc-300 block mb-1">Direct Mobile Phone *</label>
                          <input
                            required
                            type="tel"
                            value={inquiryForm.phone}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Schedule On-Site Assessment</span>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={28} />
                    </div>
                    <h4 className="text-lg font-black text-white">Assessment Request Received!</h4>
                    <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                      Our duty manager will reach out to <strong className="text-white">{inquiryForm.phone}</strong> within 2 hours to confirm your on-site site audit.
                    </p>
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setModalOpen(false);
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

      </div>
    </main>
  );
}
