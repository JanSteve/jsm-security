'use client';

import React from "react";
import Image from "next/image";
import { Award, ShieldCheck, Clock } from "lucide-react";
import { StickyScrollSequence, type StickyStepItem } from "@/components/motion/sticky-scroll-sequence";

const airportSteps: StickyStepItem[] = [
  {
    id: "airport-phase-1",
    badge: "Phase 1 • 05:00 AM Muster",
    subtitle: "Direct Veteran Command",
    title: "Pre-Deployment Turnout & Protocol Briefing",
    description: "Daily shifts supervised directly on ground by Proprietor Sweety J and Head of Operations Major AR Devadoss (Army-Veteran). Mandatory grooming, physical turnout inspection, and tactical brief prior to taking posts.",
    deliverables: [
      "100% EPF & ESIC Registered Security Marshals",
      "Aadhaar Verified & Police Record Audited",
      "Daily Turnout & Uniform Neatness Standard Enforcement",
      "Zero-Defect Shift Handover Logbooks"
    ],
    metrics: [
      { value: "05:00 AM", label: "First Shift Muster" },
      { value: "100%", label: "Turnout Compliance" },
      { value: "Zero", label: "Indiscipline Record" }
    ],
    actionLink: {
      href: "/case-studies/trichy-international-airport",
      label: "Read Airport Case Study"
    },
    visualContent: (
      <div className="w-full h-full relative flex flex-col justify-between overflow-hidden rounded-lg group">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="/images/real_jsm_shift_muster_day.jpg"
          alt="Daily Shift Briefing and Turnout Inspection at Tiruchirappalli International Airport"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="relative z-20 p-4 sm:p-5 flex justify-between items-start">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[#9C7A3C]/40 text-xs font-semibold">
            <Clock size={13} />
            <span>05:00 AM Shift Inspection</span>
          </span>
          <span className="text-[11px] font-mono text-white/80 bg-black/50 px-2 py-0.5 rounded">
            Trichy Terminal
          </span>
        </div>

        <div className="relative z-20 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white space-y-1">
          <div className="text-xs font-semibold text-[#D4AF37]">Muster Inspection &amp; Turnout</div>
          <p className="text-xs text-gray-200 leading-snug">
            All marshals undergo 100% physical inspection before occupying concourse barriers and passenger lanes.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "airport-phase-2",
    badge: "Phase 2 • 24/7 Concourse Control",
    subtitle: "Civil Aviation Security Standards",
    title: "High-Density Concourse Access & Barrier Control",
    description: "Regulated vehicular drop lanes, terminal gate-barrier verification, and multi-tier passenger flow management during international peak departures and arrivals.",
    deliverables: [
      "Vehicular Drop Lane Regulation & Anti-Congestion",
      "Terminal Entry Gate-Pass & Identity Verification",
      "VIP Escort & High-Profile Passenger Lane Management",
      "Emergency Evacuation & Perimeter Vigilance"
    ],
    metrics: [
      { value: "24/7", label: "Terminal Vigilance" },
      { value: "Zero", label: "Security Breaches" },
      { value: "100%", label: "Gate Verification" }
    ],
    actionLink: {
      href: "/case-studies/trichy-international-airport",
      label: "Read Full Specifications"
    },
    visualContent: (
      <div className="w-full h-full relative flex flex-col justify-between overflow-hidden rounded-lg group">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="/images/real_jsm_welcome_trichy_salute.jpg"
          alt="JSM Uniformed Guard at Tiruchirappalli Terminal Entry Gate"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="relative z-20 p-4 sm:p-5 flex justify-between items-start">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[#9C7A3C]/40 text-xs font-semibold">
            <ShieldCheck size={13} />
            <span>Terminal Gate Access Control</span>
          </span>
          <span className="text-[11px] font-mono text-white/80 bg-black/50 px-2 py-0.5 rounded">
            Entry Checkpoint
          </span>
        </div>

        <div className="relative z-20 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white space-y-1">
          <div className="text-xs font-semibold text-[#D4AF37]">Passenger Flow &amp; Greeting Protocol</div>
          <p className="text-xs text-gray-200 leading-snug">
            Professional demeanor combined with vigilant identity checks at commercial passenger thresholds.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "airport-phase-3",
    badge: "Phase 3 • Benchmark Deployment",
    subtitle: "2024 Infrastructure Operations",
    title: "Consolidated Platoon Mobilization & Infrastructure Vigilance",
    description: "JSM Integrated Services executed commercial concourse security and passenger access control operations at Tiruchirappalli International Airport in 2024. Managing continuous multi-shift rotations with zero incident tolerance proved our capability to protect high-consequence transport infrastructure.",
    deliverables: [
      "Full Platoon Mobilization Across International Terminal",
      "Direct Coordination with Airport & Transport Authorities",
      "Round-the-Clock Rapid Replacement & Relief Rotation",
      "Complete Statutory Labour Law Indemnity Provided"
    ],
    metrics: [
      { value: "2024", label: "Benchmark Assignment" },
      { value: "3-Shift", label: "Rotational Vigilance" },
      { value: "100%", label: "Zero Incident Record" }
    ],
    actionLink: {
      href: "/case-studies/trichy-international-airport",
      label: "Read Comprehensive Case Study"
    },
    visualContent: (
      <div className="w-full h-full relative flex flex-col justify-between overflow-hidden rounded-lg group">
        <div className="absolute inset-0 bg-black/25 z-10" />
        <Image
          src="/images/real_jsm_airport_terminal_platoon.jpg"
          alt="JSM Security Platoon deployed on site at Tiruchirappalli International Airport"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="relative z-20 p-4 sm:p-5 flex justify-between items-start">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[#9C7A3C]/40 text-xs font-semibold">
            <Award size={13} />
            <span>International Airport Platoon</span>
          </span>
          <span className="text-[11px] font-mono text-white/80 bg-black/50 px-2 py-0.5 rounded">
            Full Battalion
          </span>
        </div>

        <div className="relative z-20 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white space-y-1">
          <div className="text-xs font-semibold text-[#D4AF37]">Operational Proof on Ground</div>
          <p className="text-xs text-gray-200 leading-snug">
            Real battalion mobilized under leadership of Proprietor Sweety J and Operations Head Major AR Devadoss.
          </p>
        </div>
      </div>
    )
  }
];

export function ProofSection() {
  return (
    <StickyScrollSequence
      steps={airportSteps}
      eyebrow="Operational Benchmark Assignment"
      headline="Tiruchirappalli International Airport Operations"
      description="JSM Integrated Services executed commercial concourse security and passenger access control operations at Tiruchirappalli International Airport in 2024. Managing continuous multi-shift rotations with zero incident tolerance proved our capability to protect high-consequence transport infrastructure."
      theme="sand"
    />
  );
}
