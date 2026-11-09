"use client";

import * as React from "react";
import { 
  Building, 
  MapPin, 
  Factory, 
  Cpu, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CorridorItem {
  corridor: string;
  state: string;
  specialization: string;
  activePractice: string;
  keyHubs: string;
}

const CORRIDORS: CorridorItem[] = [
  {
    corridor: "Chennai - Sriperumbudur - Oragadam",
    state: "Tamil Nadu",
    specialization: "Automotive OEMs, EV Battery Assembly & Heavy Components",
    activePractice: "Plant Heads, VP Quality, Operations Directors",
    keyHubs: "Sriperumbudur · Oragadam · Maraimalai Nagar",
  },
  {
    corridor: "Bengaluru - Hosur - Whitefield",
    state: "Karnataka & TN Border",
    specialization: "Aerospace, Precision Engineering, Industrial IoT & SaaS",
    activePractice: "CTOs, VP Engineering, Embedded Systems Architects",
    keyHubs: "Electronic City · Hosur SIPCOT · Whitefield",
  },
  {
    corridor: "Pune - Chakan - Talegaon - Bhosari",
    state: "Maharashtra",
    specialization: "Automotive Tier-1, Precision CNC, Industrial Robotics",
    activePractice: "General Managers, Foundry Directors, SCM Heads",
    keyHubs: "Chakan Phase I-IV · Talegaon MIDC · Bhosari",
  },
  {
    corridor: "Delhi NCR - Gurugram - Manesar - Noida",
    state: "Delhi NCR & Haryana",
    specialization: "Heavy Commercial Vehicles, Consumer Tech & Supply Chain",
    activePractice: "Chief Commercial Officers, National Logistics Heads",
    keyHubs: "IMT Manesar · Udyog Vihar · Greater Noida",
  },
  {
    corridor: "Sanand - Ahmedabad - Vadodara",
    state: "Gujarat",
    specialization: "Specialty Chemicals, Industrial Pumps & Heavy Fabrication",
    activePractice: "CPOs, Manufacturing VPs, Environmental Heads",
    keyHubs: "Sanand GIDC · Changodar · Makarpura",
  },
  {
    corridor: "Pithampur - Indore - Dewas",
    state: "Madhya Pradesh",
    specialization: "Commercial Vehicles, Heavy Forgings & Pharma Engineering",
    activePractice: "Operations VPs, Plant Engineering Heads, CFOs",
    keyHubs: "Sector 1-3 Pithampur · Dewas Industrial Area",
  },
  {
    corridor: "Tiruchirappalli - Coimbatore - Salem",
    state: "Central & Western TN",
    specialization: "High-Pressure Boilers, Power Valves, Textile & Foundry",
    activePractice: "Managing Directors, Fabrication GM, Tech Leads",
    keyHubs: "Thuvakudi · SIDCO Trichy · Peelamedu Coimbatore",
  },
];

export function IndustrialCorridorMarquee() {
  return (
    <section 
      className="py-14 sm:py-20 bg-[#F6F3EE] border-b border-[#0E1116]/10 overflow-hidden w-full max-w-full"
      aria-label="Industrial Corridors and Manufacturing Practice Footprint"
    >
      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0E1116]/10 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#1F4E5F] mb-2 shadow-2xs">
            <Factory className="w-3.5 h-3.5 text-[#C8553D]" />
            <span>Industrial Practice Footprint</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-medium text-[#0E1116] tracking-tight">
            Active Leadership Corridors Across India
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-[#525866] max-w-md text-center sm:text-right">
          Direct executive search networks operating across primary manufacturing corridors and engineering clusters.
        </p>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        <div className="flex items-stretch gap-4 w-max animate-ticker hover:[animation-play-state:paused] motion-reduce:animate-none py-2">
          {CORRIDORS.concat(CORRIDORS).map((item, index) => (
            <div
              key={`${item.corridor}-${index}`}
              className="w-[300px] sm:w-[350px] p-5 rounded-2xl bg-white border border-[#0E1116]/10 shadow-2xs hover:border-[#1F4E5F]/40 hover:shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#1F4E5F]/10 text-[#1F4E5F]">
                    <MapPin className="w-3 h-3" />
                    <span>{item.state}</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#525866]">60-Min Calibration</span>
                </div>

                <h4 className="font-heading font-medium text-base text-[#0E1116] leading-snug mb-2">
                  {item.corridor}
                </h4>

                <p className="text-xs text-[#525866] leading-relaxed mb-3">
                  {item.specialization}
                </p>
              </div>

              <div className="pt-3 border-t border-[#0E1116]/8 space-y-1 text-xs">
                <div className="flex items-start gap-1.5 text-[#0E1116]">
                  <strong className="text-[11px] font-mono text-[#1F4E5F] uppercase shrink-0">Roles:</strong>
                  <span className="text-[#0E1116] truncate">{item.activePractice}</span>
                </div>
                <div className="text-[11px] font-mono text-[#525866] truncate">
                  Hubs: {item.keyHubs}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
