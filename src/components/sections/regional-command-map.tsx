"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Users, 
  Radio, 
  CheckCircle2, 
  Navigation, 
  Building2, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RegionalHub {
  id: string;
  city: string;
  title: string;
  hubType: "Central HQ" | "Industrial SEZ Hub" | "Manufacturing Corridor" | "Commercial Node";
  personnelActive: number;
  sitesGuarded: number;
  reliefTimeMinutes: number;
  nightAuditRounds: number;
  keySectors: string[];
  description: string;
  hubAddress: string;
}

const REGIONAL_HUBS: RegionalHub[] = [
  {
    id: "trichy",
    city: "Tiruchirappalli (Trichy)",
    title: "Regional Command & Central Control Centre",
    hubType: "Central HQ",
    personnelActive: 165,
    sitesGuarded: 18,
    reliefTimeMinutes: 45,
    nightAuditRounds: 4,
    keySectors: ["International Airport Upkeep", "Multi-Specialty Hospitals", "BHEL Ancillary Units", "Educational Campuses"],
    description: "Central command headquarters coordinating 24/7 supervisor dispatch, rapid relief reserves, and PSARA police verification archives across South India.",
    hubAddress: "Central Bus Stand & Cantonment Area, Tiruchirappalli, Tamil Nadu 620001",
  },
  {
    id: "chennai",
    city: "Chennai Corridor (Sriperumbudur & Oragadam)",
    title: "Automotive & Electronics SEZ Guarding Hub",
    hubType: "Industrial SEZ Hub",
    personnelActive: 140,
    sitesGuarded: 12,
    reliefTimeMinutes: 60,
    nightAuditRounds: 3,
    keySectors: ["Tier-1 Automotive Plants", "Electronics Assembly Units", "Export Processing Zones", "Heavy Warehouses"],
    description: "High-density industrial security cluster specializing in shift change gate crowd control, perimeter patrol, and material in/out registers.",
    hubAddress: "SIPCOT Industrial Park Corridor, Sriperumbudur, Tamil Nadu 602105",
  },
  {
    id: "coimbatore",
    city: "Coimbatore (Peelamedu & Kurichi)",
    title: "Precision Engineering & IT SEZ Facility Node",
    hubType: "Manufacturing Corridor",
    personnelActive: 95,
    sitesGuarded: 10,
    reliefTimeMinutes: 60,
    nightAuditRounds: 3,
    keySectors: ["Foundries & Castings", "ELCOT IT Park Campuses", "Textile Machinery Plants", "Commercial Complexes"],
    description: "Integrated facility management hub delivering 5-step mechanized housekeeping, security, and contractual CNC/utility staffing.",
    hubAddress: "Avinashi Road & Kurichi Industrial Estate, Coimbatore, Tamil Nadu 641018",
  },
  {
    id: "hosur",
    city: "Hosur (SIPCOT Phase I & II)",
    title: "Heavy Engineering & Logistics Corridor",
    hubType: "Manufacturing Corridor",
    personnelActive: 70,
    sitesGuarded: 6,
    reliefTimeMinutes: 75,
    nightAuditRounds: 2,
    keySectors: ["Automobile Ancillaries", "Cold Storage Logistics", "Tool Rooms & Fabrication", "Pharma Distribution"],
    description: "Border-corridor operations providing rapid 48-hour workforce scaling and dedicated supervisor patrol vans.",
    hubAddress: "SIPCOT Industrial Complex, Hosur, Tamil Nadu 635126",
  },
  {
    id: "madurai",
    city: "Madurai & Southern Hub",
    title: "Healthcare & Commercial Facility Node",
    hubType: "Commercial Node",
    personnelActive: 35,
    sitesGuarded: 4,
    reliefTimeMinutes: 60,
    nightAuditRounds: 2,
    keySectors: ["Private Medical Centers", "Corporate Retail Showrooms", "Logistics Warehouses"],
    description: "Southern Tamil Nadu operations hub ensuring strict compliance with NABH hospital hygiene protocols and physical security.",
    hubAddress: "KK Nagar & Ring Road Junction, Madurai, Tamil Nadu 625020",
  },
  {
    id: "salem",
    city: "Salem & Erode Belt",
    title: "Industrial & Steel Fabrications Hub",
    hubType: "Manufacturing Corridor",
    personnelActive: 35,
    sitesGuarded: 4,
    reliefTimeMinutes: 60,
    nightAuditRounds: 2,
    keySectors: ["Steel Rolling Mills", "Textile Processing Units", "Food Processing Warehouses"],
    description: "Western corridor industrial guarding with mechanized scrubbers and heavy industrial perimeter patrollers.",
    hubAddress: "Steel Plant Road & Five Roads Junction, Salem, Tamil Nadu 636004",
  },
];

export function RegionalCommandMap() {
  const [selectedHub, setSelectedHub] = useState<RegionalHub>(REGIONAL_HUBS[0]);

  return (
    <section className="py-24 bg-[#0A1628] text-white relative overflow-hidden" id="regional-command">
      {/* Subtle Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold">
            <Radio size={14} className="animate-pulse text-[#C5A880]" />
            <span>TAMIL NADU REGIONAL COMMAND NETWORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Live Deployment &amp; <span className="text-[#C5A880]">Regional Hubs</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            520+ trained personnel deployed across 52 contracted client facilities with a guaranteed 2-Hour Relief Replacement SLA in every major industrial corridor.
          </p>
        </div>

        {/* Network Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Hub Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold font-mono text-[#C5A880] tracking-wider uppercase block mb-2">
              Select Regional Operational Cluster:
            </span>
            
            {REGIONAL_HUBS.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => setSelectedHub(hub)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-zinc-800/90 border-[#C5A880] shadow-lg shadow-[#C5A880]/10"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? "bg-[#C5A880] text-zinc-950" : "bg-zinc-800 text-[#C5A880]"}`}>
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        {hub.city}
                        {hub.hubType === "Central HQ" && (
                          <span className="px-1.5 py-0.5 rounded bg-[#C5A880]/20 text-[#C5A880] text-[9px] font-mono font-black uppercase">
                            Central HQ
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-400 font-mono mt-0.5">
                        {hub.sitesGuarded} Facilities • {hub.personnelActive} Active Personnel
                      </div>
                    </div>
                  </div>

                  <ChevronRight size={16} className={`transition-transform ${isSelected ? "text-[#C5A880] translate-x-1" : "text-zinc-600"}`} />
                </button>
              );
            })}
          </div>

          {/* Active Hub Deep-Dive Card (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHub.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-zinc-900/90 border-2 border-[#C5A880]/50 rounded-3xl p-6 sm:p-8 backdrop-blur-xl h-full flex flex-col justify-between shadow-2xl relative"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-zinc-800">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-mono font-extrabold uppercase mb-2">
                        <ShieldCheck size={12} /> {selectedHub.hubType}
                      </div>
                      <h3 className="text-2xl font-black text-white">{selectedHub.city}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{selectedHub.title}</p>
                    </div>

                    <div className="bg-[#0A1628] border border-zinc-700 px-3.5 py-2 rounded-xl text-right">
                      <span className="text-[10px] text-zinc-400 uppercase font-mono block">Relief SLA</span>
                      <span className="text-base font-black text-emerald-400">
                        &lt; {selectedHub.reliefTimeMinutes} Mins
                      </span>
                    </div>
                  </div>

                  {/* Operational Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                    <div className="bg-zinc-800/60 p-3 rounded-xl border border-zinc-700/50">
                      <span className="text-[10px] text-zinc-400 font-mono block uppercase">Personnel</span>
                      <span className="text-xl font-black text-[#C5A880]">{selectedHub.personnelActive}</span>
                    </div>
                    <div className="bg-zinc-800/60 p-3 rounded-xl border border-zinc-700/50">
                      <span className="text-[10px] text-zinc-400 font-mono block uppercase">Client Sites</span>
                      <span className="text-xl font-black text-white">{selectedHub.sitesGuarded}</span>
                    </div>
                    <div className="bg-zinc-800/60 p-3 rounded-xl border border-zinc-700/50">
                      <span className="text-[10px] text-zinc-400 font-mono block uppercase">Night Audits</span>
                      <span className="text-xl font-black text-sky-400">{selectedHub.nightAuditRounds} / Night</span>
                    </div>
                    <div className="bg-zinc-800/60 p-3 rounded-xl border border-zinc-700/50">
                      <span className="text-[10px] text-zinc-400 font-mono block uppercase">Fulfillment</span>
                      <span className="text-xl font-black text-emerald-400">100%</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                    {selectedHub.description}
                  </p>

                  {/* Key Sectors Protected */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                      Key Facility Sectors Managed in this Cluster:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {selectedHub.keySectors.map((sector, i) => (
                        <div key={i} className="flex items-center gap-2 bg-zinc-800/40 px-3 py-2 rounded-lg border border-zinc-700/40 text-zinc-200">
                          <CheckCircle2 size={13} className="text-[#C5A880] flex-shrink-0" />
                          <span>{sector}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hub Footer */}
                <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-zinc-400">
                    <span className="font-bold text-zinc-300 block">Dispatch Command Point:</span>
                    <span>{selectedHub.hubAddress}</span>
                  </div>

                  <Link href="/contact">
                    <Button className="bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer">
                      <span>Request Site Assessment</span>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
