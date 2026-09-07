"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plane, Landmark, MapPin, Phone, ShieldCheck, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CitySlide {
  title: string;
  category: "Airport Gateway" | "Heritage Landmark" | "Industrial Corridor";
  imageUrl: string;
  caption: string;
}

interface DistrictData {
  id: string;
  name: string;
  tagline: string;
  airportCode: string;
  personnel: number;
  reliefSla: string;
  hotline: string;
  sectors: string[];
  slides: CitySlide[];
}

const DISTRICT_HUBS: DistrictData[] = [
  {
    id: "trichy",
    name: "Tiruchirappalli (Trichy)",
    tagline: "Central Command HQ & Aviation Operational Hub",
    airportCode: "TRZ / VOTR",
    personnel: 185,
    reliefSla: "< 30 Mins",
    hotline: "+91 90808 63448",
    sectors: ["International Airport Upkeep", "Multi-Specialty Hospitals", "BHEL Ancillaries", "Educational Campuses"],
    slides: [
      {
        title: "Tiruchirappalli International Airport (TRZ)",
        category: "Airport Gateway",
        imageUrl: "/images/real_jsm_airport_terminal_platoon.jpg",
        caption: "JSM landmark inaugural aviation operations at Tiruchirappalli International Airport — terminal passenger flow, baggage logistics & perimeter watch.",
      },
      {
        title: "Trichy Rockfort Temple & Teppakulam",
        category: "Heritage Landmark",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85",
        caption: "Historic 7th-century fortress and temple complex representing the resilient civic core of Tiruchirappalli.",
      },
      {
        title: "Sri Ranganathaswamy Temple, Srirangam",
        category: "Heritage Landmark",
        imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1600&q=85",
        caption: "The world's largest functioning Hindu temple complex, demanding extensive crowd control and heritage asset protection.",
      },
    ],
  },
  {
    id: "chennai",
    name: "Chennai & OMR Corridor",
    tagline: "Metro IT Expressway & Industrial SEZ Command",
    airportCode: "MAA / VOMM",
    personnel: 160,
    reliefSla: "< 45 Mins",
    hotline: "+91 90808 63448",
    sectors: ["OMR IT Parks & Tech Campuses", "Sriperumbudur Auto SEZ", "Oragadam Electronics", "Data Centers"],
    slides: [
      {
        title: "Chennai International Airport (MAA)",
        category: "Airport Gateway",
        imageUrl: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1600&q=85",
        caption: "Primary aviation hub connecting South India to global corridors, surrounded by high-security industrial logistics zones.",
      },
      {
        title: "Old Mahabalipuram Road (OMR) IT Corridor",
        category: "Industrial Corridor",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
        caption: "Chennai's premier technology expressway housing global MNCs, research parks, and high-rise enterprise campuses.",
      },
      {
        title: "Fort St. George & Marina Heritage Coast",
        category: "Heritage Landmark",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85",
        caption: "Historic administrative seat of Tamil Nadu state government and coastal patrimony.",
      },
    ],
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    tagline: "Precision Engineering & Textile Manufacturing Node",
    airportCode: "CJB / VOCB",
    personnel: 110,
    reliefSla: "< 45 Mins",
    hotline: "+91 90808 63448",
    sectors: ["Heavy Auto Foundries", "ELCOT IT SEZ", "Textile Machinery", "Export Garment Units"],
    slides: [
      {
        title: "Coimbatore International Airport (CJB)",
        category: "Airport Gateway",
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85",
        caption: "Western Tamil Nadu's principal aviation gate serving manufacturing conglomerates and international business delegations.",
      },
      {
        title: "Marudhamalai Historic Hill Temple",
        category: "Heritage Landmark",
        imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1600&q=85",
        caption: "Ancient hill shrine nestled in the Western Ghats, reflecting the deep spiritual heritage of Kongu Nadu.",
      },
    ],
  },
  {
    id: "hosur",
    name: "Hosur Industrial Corridor",
    tagline: "EV Hub, Electronics & Heavy Manufacturing Corridor",
    airportCode: "BLR Adjacent",
    personnel: 85,
    reliefSla: "< 45 Mins",
    hotline: "+91 90808 63448",
    sectors: ["Electric Vehicle Giga-Plants", "Precision Tooling", "Cold Chain Logistics", "Pharma Distribution"],
    slides: [
      {
        title: "Hosur Airway & BLR Aviation Gateway",
        category: "Airport Gateway",
        imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=85",
        caption: "Strategic border aviation node enabling just-in-time logistics and executive air transit for Hosur's manufacturing belt.",
      },
      {
        title: "Hilltop Temple of Arulmigu Maragathambigai",
        category: "Heritage Landmark",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85",
        caption: "Iconic Hoysala-era cultural sentinel overlooking Hosur's rapid modern industrial transformation.",
      },
    ],
  },
  {
    id: "madurai",
    name: "Madurai",
    tagline: "Southern Command & Temple City Operations",
    airportCode: "IXM / VOMD",
    personnel: 70,
    reliefSla: "< 40 Mins",
    hotline: "+91 90808 63448",
    sectors: ["Healthcare Facilities", "Textile Spinning Mills", "Government Tenders", "Tourism Gateways"],
    slides: [
      {
        title: "Madurai Civil Airport (IXM)",
        category: "Airport Gateway",
        imageUrl: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=85",
        caption: "Gateway to Southern Tamil Nadu with rigorous physical security and high-volume pilgrimage traffic protocols.",
      },
      {
        title: "Arulmigu Meenakshi Sundareswarar Temple",
        category: "Heritage Landmark",
        imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1600&q=85",
        caption: "World-renowned ancient architectural wonder demanding supreme discipline and zero-breach perimeter guarding.",
      },
    ],
  },
  {
    id: "salem",
    name: "Salem & Erode",
    tagline: "Steel, Mineral & Agro-Textile Processing Belt",
    airportCode: "SXV / VOSM",
    personnel: 65,
    reliefSla: "< 50 Mins",
    hotline: "+91 90808 63448",
    sectors: ["Steel Processing Plants", "Sago & Mineral Mills", "Textile Dyeing Units", "Logistics Corridors"],
    slides: [
      {
        title: "Salem Regional Airport (SXV)",
        category: "Airport Gateway",
        imageUrl: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1600&q=85",
        caption: "Regional commercial airfield servicing industrial mining executives and Kongu belt manufacturing leadership.",
      },
      {
        title: "Shevaroy Hills & Heritage Fortresses",
        category: "Heritage Landmark",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85",
        caption: "Historic upland landmarks connecting Salem and Erode across strategic transport arterials.",
      },
    ],
  },
  {
    id: "tirunelveli",
    name: "Tirunelveli & Tuticorin Corridor",
    tagline: "Deep Southern Port & Energy Infrastructure Hub",
    airportCode: "TCR (Tuticorin) / VOZ",
    personnel: 55,
    reliefSla: "< 50 Mins",
    hotline: "+91 90808 63448",
    sectors: ["Maritime Port Logistics", "Wind & Solar Renewable Parks", "Agro-Processing", "Healthcare"],
    slides: [
      {
        title: "Tuticorin & Tirunelveli Aviation Corridor (TCR)",
        category: "Airport Gateway",
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85",
        caption: "Aviation connection linking the deep-water maritime port logistics and heavy industrial clusters of Southern Tamil Nadu.",
      },
      {
        title: "Nellaiappar Ancient Temple Complex",
        category: "Heritage Landmark",
        imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1600&q=85",
        caption: "7th-century Pandyan civic masterpiece renowned for musical stone pillars and expansive enclosed gopurams.",
      },
    ],
  },
];

export function DistrictHubsSlideshow() {
  const [activeDistrictId, setActiveDistrictId] = React.useState("trichy");
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const activeDistrict = DISTRICT_HUBS.find((d) => d.id === activeDistrictId) || DISTRICT_HUBS[0];

  // Auto-advance slide every 5 seconds
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % activeDistrict.slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, activeDistrict.slides.length]);

  // Reset slide index on district switch
  const handleSelectDistrict = (id: string) => {
    setActiveDistrictId(id);
    setSlideIndex(0);
  };

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + activeDistrict.slides.length) % activeDistrict.slides.length);
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % activeDistrict.slides.length);
  };

  const currentSlide = activeDistrict.slides[slideIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#f5f5f7] border-b border-black/[0.08]">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider font-mono">
              <MapPin size={13} className="text-[#0071e3]" />
              <span>Pan-Tamil Nadu Operational Footprint</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
              District hubs &amp; aviation gateways.
            </h2>
            <p className="text-sm sm:text-base text-[#86868b] leading-relaxed">
              Every city deployment anchored by verified aviation infrastructure, followed by revered civic heritage archives.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#515154] bg-white p-2.5 rounded-2xl border border-black/[0.08] shadow-xs">
            <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
            <span>8 Primary Hubs • Airport-First Security Protocols</span>
          </div>
        </div>

        {/* District Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {DISTRICT_HUBS.map((dist) => {
            const isSelected = dist.id === activeDistrict.id;
            return (
              <button
                key={dist.id}
                onClick={() => handleSelectDistrict(dist.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 press-scale",
                  isSelected
                    ? "bg-[#1d1d1f] text-white shadow-md scale-102"
                    : "bg-white text-[#515154] hover:text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100"
                )}
              >
                <span>{dist.name}</span>
                <span className={cn(
                  "text-[10px] font-mono px-2 py-0.5 rounded-full",
                  isSelected ? "bg-white/20 text-white" : "bg-black/[0.05] text-[#86868b]"
                )}>
                  {dist.airportCode}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Full-Bleed Rectangular Showcase Card */}
        <div 
          className="bg-white border border-black/[0.08] rounded-[36px] overflow-hidden shadow-xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Widescreen Image Canvas */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-black overflow-hidden group">
            {/* Live Progress Bar on Top */}
            <div className="absolute top-0 inset-x-0 h-1 bg-white/20 z-30">
              <motion.div
                key={`${activeDistrict.id}-${slideIndex}`}
                initial={{ width: "0%" }}
                animate={{ width: isPaused ? "100%" : "100%" }}
                transition={{ duration: isPaused ? 0 : 5, ease: "linear" }}
                className="h-full bg-[#0071e3]"
              />
            </div>

            {/* Slide Image with Fade Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeDistrict.id}-${slideIndex}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover"
                />
                {/* Cinematic Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
              </motion.div>
            </AnimatePresence>

            {/* Top Floating Badge */}
            <div className="absolute top-5 left-5 sm:top-8 sm:left-8 z-20 flex flex-wrap items-center gap-2">
              <span className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider font-mono shadow-md backdrop-blur-md",
                currentSlide.category === "Airport Gateway" 
                  ? "bg-[#0071e3]/90 border border-blue-400/40" 
                  : "bg-amber-600/90 border border-amber-400/40"
              )}>
                {currentSlide.category === "Airport Gateway" ? <Plane size={13} /> : <Landmark size={13} />}
                <span>{currentSlide.category}</span>
              </span>

              <span className="px-3.5 py-1.5 rounded-full bg-black/60 text-white/90 text-xs font-mono border border-white/20 backdrop-blur-md">
                Slide {slideIndex + 1} of {activeDistrict.slides.length}
              </span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-20 text-white max-w-3xl">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-2 text-balance">
                {currentSlide.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl text-pretty">
                {currentSlide.caption}
              </p>
            </div>

            {/* Navigation Chevron Controls */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex items-center gap-2">
              <button
                onClick={handlePrevSlide}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-105"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-105"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Bottom Operational Specifications Bar */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider block">
                Active Deployed Personnel
              </span>
              <p className="text-2xl font-extrabold text-[#1d1d1f] font-mono tabular-nums">
                {activeDistrict.personnel}+ Guards &amp; Crew
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider block">
                Guaranteed Relief SLA
              </span>
              <p className="text-2xl font-extrabold text-emerald-600 font-mono">
                {activeDistrict.reliefSla}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider block">
                Key Sector Footprint
              </span>
              <p className="text-xs text-[#515154] leading-relaxed line-clamp-2">
                {activeDistrict.sectors.join(" • ")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 justify-end">
              <a
                href={`https://wa.me/919080863448?text=Hello%20JSM%20Integrated%20Services,%20I%20need%20security%20or%20facility%20support%20in%20${encodeURIComponent(activeDistrict.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Hub</span>
              </a>
              <a
                href="tel:+919080863448"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-bold shadow-md transition-all font-mono"
              >
                <Phone size={14} />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
