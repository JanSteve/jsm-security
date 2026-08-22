"use client";

import Link from "next/link";
import { MapPin, ArrowRight, ShieldCheck, Users, Sparkles, Building2 } from "lucide-react";
import { brandData } from "@/data/brand";

export function RegionalCoverage() {
  const hubs = [
    { city: "Tiruchirappalli (Trichy)", tag: "REGIONAL HQ", desc: "Central operational dispatch, airport security milestone, and 24/7 command desk.", href: "/contact" },
    { city: "Chennai", tag: "METRO OPERATIONS", desc: "Corporate IT corridors, SEZs, industrial manufacturing, and residential communities.", href: "/contact" },
    { city: "Coimbatore", tag: "INDUSTRIAL HUB", desc: "Heavy engineering, foundries, textile mills, and commercial complexes.", href: "/contact" },
    { city: "Madurai", tag: "SOUTH ZONE", desc: "Healthcare institutions, retail centers, and commercial facility management.", href: "/contact" },
    { city: "Hosur", tag: "AUTOMOTIVE ZONE", desc: "Automobile plants, electronics assembly, and high-volume warehouse staffing.", href: "/contact" },
    { city: "Salem & Erode", tag: "MANUFACTURING", desc: "Industrial labor contractors, logistics hubs, and processing plant personnel.", href: "/contact" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#C5A880] uppercase">
              TAMIL NADU REGIONAL REACH
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
              Deploying Across Tamil Nadu &amp; South India.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal max-w-sm">
            Rapid on-site mobilization and supervisory presence across all key industrial, commercial, and residential districts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hubs.map((hub) => (
            <div
              key={hub.city}
              className="p-6 bg-[#fbf9f4] border border-zinc-200/80 rounded-3xl space-y-3 hover:border-black hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-black">
                  <MapPin size={16} className="text-[#C5A880]" />
                  <h3 className="text-sm font-black tracking-tight">{hub.city}</h3>
                </div>
                <span className="text-[9px] font-mono font-bold text-zinc-500 bg-white border border-zinc-200 px-2 py-0.5 rounded-md uppercase">
                  {hub.tag}
                </span>
              </div>

              <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                {hub.desc}
              </p>

              <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between">
                <Link
                  href={hub.href}
                  className="text-xs font-bold text-black group-hover:text-[#C5A880] flex items-center gap-1 transition-colors"
                >
                  <span>Request Local Proposal</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
