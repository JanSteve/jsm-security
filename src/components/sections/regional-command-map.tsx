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
    <section className="py-20 md:py-28 bg-[#f5f5f7] text-[#1d1d1f] relative overflow-hidden border-t border-black/[0.08]" id="regional-command">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Radio size={14} className="text-[#0071e3]" />
            <span>Tamil Nadu Regional Command Network</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] text-balance">
            Live deployment &amp; regional hubs.
          </h2>
          <p className="text-[#86868b] text-sm sm:text-base leading-relaxed text-pretty">
            <span className="tabular-nums font-semibold text-[#1d1d1f]">520+</span> trained personnel deployed across <span className="tabular-nums font-semibold text-[#1d1d1f]">52</span> contracted client facilities with a guaranteed <span className="tabular-nums font-semibold text-[#1d1d1f]">2-hour</span> relief replacement SLA in every major industrial corridor.
          </p>
        </div>

        {/* Network Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Hub Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-semibold text-[#86868b] tracking-wider uppercase block mb-2">
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
                      ? "bg-white border-[#0071e3] ring-2 ring-[#0071e3]/20 shadow-md"
                      : "bg-white/70 border-black/[0.06] text-[#86868b] hover:border-black/[0.12] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? "bg-[#0071e3] text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"}`}>
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1d1d1f] flex items-center gap-2">
                        {hub.city}
                        {hub.hubType === "Central HQ" && (
                          <span className="px-2 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[9px] font-semibold uppercase">
                            Central HQ
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#86868b] mt-0.5">
                        {hub.sitesGuarded} Facilities • {hub.personnelActive} Active Personnel
                      </div>
                    </div>
                  </div>

                  <ChevronRight size={16} className={`transition-transform ${isSelected ? "text-[#0071e3] translate-x-1" : "text-[#86868b]"}`} />
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
                className="bg-white border border-black/[0.08] rounded-[28px] p-6 sm:p-8 h-full flex flex-col justify-between shadow-sm relative"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-black/[0.08]">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f5f7] text-[#1d1d1f] text-[11px] font-semibold uppercase mb-2">
                        <ShieldCheck size={12} className="text-[#0071e3]" /> {selectedHub.hubType}
                      </div>
                      <h3 className="text-2xl font-semibold text-[#1d1d1f]">{selectedHub.city}</h3>
                      <p className="text-xs text-[#86868b] mt-0.5">{selectedHub.title}</p>
                    </div>

                    <div className="bg-[#f5f5f7] border border-black/[0.06] px-4 py-2 rounded-2xl text-right">
                      <span className="text-[10px] text-[#86868b] uppercase font-semibold block">Relief SLA</span>
                      <span className="text-base font-semibold text-emerald-600">
                        &lt; {selectedHub.reliefTimeMinutes} Mins
                      </span>
                    </div>
                  </div>

                  {/* Operational Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                    <div className="bg-[#f5f5f7] p-3.5 rounded-2xl border border-black/[0.04]">
                      <span className="text-[10px] text-[#86868b] font-semibold block uppercase">Personnel</span>
                      <span className="text-xl font-semibold text-[#1d1d1f]">{selectedHub.personnelActive}</span>
                    </div>
                    <div className="bg-[#f5f5f7] p-3.5 rounded-2xl border border-black/[0.04]">
                      <span className="text-[10px] text-[#86868b] font-semibold block uppercase">Client Sites</span>
                      <span className="text-xl font-semibold text-[#1d1d1f]">{selectedHub.sitesGuarded}</span>
                    </div>
                    <div className="bg-[#f5f5f7] p-3.5 rounded-2xl border border-black/[0.04]">
                      <span className="text-[10px] text-[#86868b] font-semibold block uppercase">Night Audits</span>
                      <span className="text-xl font-semibold text-[#0071e3]">{selectedHub.nightAuditRounds} / Night</span>
                    </div>
                    <div className="bg-[#f5f5f7] p-3.5 rounded-2xl border border-black/[0.04]">
                      <span className="text-[10px] text-[#86868b] font-semibold block uppercase">Fulfillment</span>
                      <span className="text-xl font-semibold text-emerald-600">100%</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#515154] leading-relaxed mb-6">
                    {selectedHub.description}
                  </p>

                  {/* Key Sectors Protected */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider block">
                      Key Facility Sectors Managed in this Cluster:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {selectedHub.keySectors.map((sector, i) => (
                        <div key={i} className="flex items-center gap-2 bg-[#f5f5f7] px-3 py-2 rounded-xl border border-black/[0.04] text-[#1d1d1f]">
                          <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                          <span>{sector}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hub Footer */}
                <div className="pt-6 border-t border-black/[0.08] flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-[#86868b]">
                    <span className="font-semibold text-[#1d1d1f] block">Dispatch Command Point:</span>
                    <span>{selectedHub.hubAddress}</span>
                  </div>

                  <Link href="/contact">
                    <Button className="bg-[#1d1d1f] hover:bg-black text-white font-semibold text-xs tracking-wide rounded-full px-6 py-2.5 cursor-pointer shadow-sm">
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
