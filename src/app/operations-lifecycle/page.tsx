"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  ArrowRight,
  Sun,
  Moon,
  Radio,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ShiftPhase {
  time: string;
  period: "Morning" | "Day" | "Afternoon" | "Evening" | "Night" | "Graveyard";
  title: string;
  subtitle: string;
  icon: any;
  checklist: string[];
  protocol: string;
  auditSignOff: string;
}

const SHIFT_PHASES: ShiftPhase[] = [
  {
    time: "05:45 AM",
    period: "Morning",
    title: "Shift Muster & Turnout Drill",
    subtitle: "Pre-Shift Discipline & Readiness Verification",
    icon: Sun,
    checklist: [
      "Physical turnout check: Crisp ironed uniform, clean badges, polished boots, photo ID cards",
      "Equipment readiness: High-beam LED night torches, whistles, batons, communication walkie-talkies",
      "Briefing on VIP visitor schedules, raw material delivery slots, and specific client daily mandates",
    ],
    protocol: "Duty supervisor conducts mandatory muster parade 15 minutes before post handover.",
    auditSignOff: "Supervisor Digital Muster Form #MS-01 Signed",
  },
  {
    time: "06:00 AM",
    period: "Day",
    title: "Biometric Check-In & Gate Handover",
    subtitle: "Zero-Lag Post Relief with GPS Geofencing",
    icon: ShieldCheck,
    checklist: [
      "Guard thumbprint biometric verification with GPS geofencing confirmed within 15 meters of gate",
      "Physical reconciliation of vehicle in/out logs, material returnable delivery challans, and gate keys",
      "Automated SMS/portal dispatch to client facility manager confirming 100% shift presence",
    ],
    protocol: "Relieving guard does not leave post until incoming guard biometric sign-in is validated.",
    auditSignOff: "Portal Digital Shift Transfer Cleared",
  },
  {
    time: "10:30 AM",
    period: "Day",
    title: "Mechanized Housekeeping & Deep Sanitization",
    subtitle: "5-Step Closed-Loop Facility Hygiene",
    icon: Sparkles,
    checklist: [
      "Ride-on auto-scrubber deployment across high-traffic factory shop floors and corporate corridors",
      "Color-coded microfiber hygiene protocols for restrooms, cafeteria, and executive boardrooms",
      "Disposal of industrial solid waste following Tamil Nadu Pollution Control Board (TNPCB) norms",
    ],
    protocol: "Facility supervisor inspects all designated zones with digital 20-point sanitation checklist.",
    auditSignOff: "Zone Hygiene Checklist #HK-20 Signed",
  },
  {
    time: "14:00 PM",
    period: "Afternoon",
    title: "Mid-Day Shift Handover & Visitor Badging",
    subtitle: "Peak Contractor & Logistics Management",
    icon: Users,
    checklist: [
      "Peak contractor and casual labour shift muster with strict photo-badging and safety helmet checks",
      "Under-vehicle search mirrors applied to all incoming cargo containers and vendor logistics trucks",
      "Visitor pre-registration verification via QR code and direct host employee phone authorization",
    ],
    protocol: "Dual-barrier vehicle check-point prevents unauthorized compound entry.",
    auditSignOff: "Material Gate Log Counter-Signed by Client",
  },
  {
    time: "22:00 PM",
    period: "Night",
    title: "Perimeter Lock-Down & Static Guarding",
    subtitle: "High-Vigilance Night Secure Mode",
    icon: Moon,
    checklist: [
      "Perimeter fencing sweep, boundary wall floodlight inspection, and scrap yard lock validation",
      "Server room, electrical sub-station, and raw material warehouse physical seal confirmation",
      "Emergency fire extinguisher pressure gauge and exit door clearance audit",
    ],
    protocol: "Night shift guards initiate 60-minute electronic wand checkpoint patrol rounds.",
    auditSignOff: "Lockdown Checklist #NL-08 Logged",
  },
  {
    time: "02:00 AM",
    period: "Graveyard",
    title: "Unannounced Mobile Supervisor Night Audit",
    subtitle: "Surprise Mobile Patrol Van Spot-Check",
    icon: Eye,
    checklist: [
      "Roving supervisor patrol van arrives unannounced to verify guard alertness and post positioning",
      "Physical cross-check of visitor registers, key logs, and CCTV monitor display clarity",
      "Randomized alcohol breath-analyzer test and immediate relief dispatch if any guard is unfit",
    ],
    protocol: "Supervisors conduct minimum 2 to 4 unannounced surprise night checks per billing cycle.",
    auditSignOff: "Surprise Night Audit #NA-40 Cleared",
  },
];

export default function OperationsLifecyclePage() {
  const [selectedPhase, setSelectedPhase] = useState<ShiftPhase>(SHIFT_PHASES[0]);

  return (
    <main className="min-h-screen bg-[#070e17] text-white pt-28 pb-24 selection:bg-[#C5A880] selection:text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold">
            <Clock size={14} />
            <span>DISCIPLINED 24-HOUR OPERATIONAL BLUEPRINT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            24-Hour Facility <span className="text-[#C5A880]">Shift Lifecycle</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            How JSM guards, maintains, and audits your facility around the clock: from 05:45 AM morning turnout drills to 02:00 AM unannounced supervisor night audits.
          </p>
        </div>

        {/* 24-Hour Timeline Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-12">
          {SHIFT_PHASES.map((phase) => {
            const Icon = phase.icon;
            const isSelected = selectedPhase.time === phase.time;
            return (
              <button
                key={phase.time}
                type="button"
                onClick={() => setSelectedPhase(phase)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#C5A880] text-zinc-950 border-[#C5A880] shadow-lg shadow-[#C5A880]/20"
                    : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-black font-mono ${isSelected ? 'text-zinc-950' : 'text-white'}`}>
                    {phase.time}
                  </span>
                  <Icon size={16} />
                </div>
                <div className={`text-[11px] font-bold truncate ${isSelected ? 'text-zinc-900' : 'text-zinc-300'}`}>
                  {phase.title}
                </div>
                <div className={`text-[9px] font-mono uppercase mt-0.5 ${isSelected ? 'text-zinc-800' : 'text-zinc-500'}`}>
                  {phase.period} Phase
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPhase.time}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-zinc-900/90 border-2 border-[#C5A880]/50 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8"
          >
            {/* Header */}
            <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono font-bold text-[#C5A880] uppercase tracking-widest block mb-1">
                  TIMESTAMP: {selectedPhase.time} • {selectedPhase.period} OPERATIONAL BLOCK
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedPhase.title}</h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">{selectedPhase.subtitle}</p>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                {selectedPhase.auditSignOff}
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                Mandatory Operational Checkpoints Executed:
              </h3>
              <div className="space-y-2.5">
                {selectedPhase.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 text-xs sm:text-sm text-zinc-200">
                    <CheckCircle2 size={16} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocol Standard */}
            <div className="bg-zinc-800/80 p-5 rounded-2xl border border-zinc-700 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[#C5A880] font-bold block uppercase text-[10px]">Standard Operating Procedure (SOP):</span>
                <span className="text-zinc-300 font-sans text-xs sm:text-sm">{selectedPhase.protocol}</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase whitespace-nowrap bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-700">
                100% Audited
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-2 border-[#C5A880]/40 rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
            Deploy This 24/7 Security Discipline at Your Facility
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto">
            From sunrise shift handovers to unannounced 2:00 AM mobile supervisor audits, JSM delivers complete operational peace of mind across Tamil Nadu.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link href="/get-quote">
              <Button size="lg" className="bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-black text-xs px-8 h-12 rounded-xl uppercase tracking-wider cursor-pointer shadow-lg">
                <span>Get Instant Quote</span>
                <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </Link>
            <Link href="/portal">
              <Button size="lg" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 font-bold text-xs px-8 h-12 rounded-xl uppercase tracking-wider cursor-pointer">
                <span>View Live Client Portal</span>
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
