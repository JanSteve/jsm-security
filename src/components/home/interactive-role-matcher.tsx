"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  MapPin, 
  Filter, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  FileText, 
  Sparkles,
  TrendingUp,
  Cpu,
  Factory,
  Truck,
  Landmark
} from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

type DomainId = "manufacturing" | "tech" | "supplychain" | "executive";
type StateId = "all" | "TN" | "KA" | "MH" | "DL" | "GJ" | "MP";
type BandId = "all" | "12-25" | "25-50" | "50-100";

interface DossierSample {
  id: string;
  code: string;
  title: string;
  domain: DomainId;
  state: StateId;
  stateName: string;
  band: BandId;
  bandLabel: string;
  yearsExp: string;
  currentScope: string;
  verifiedImpact: string;
  competencies: string[];
  daysToScreen: string;
}

const DOSSIER_SAMPLES: DossierSample[] = [
  {
    id: "mfg-1",
    code: "JSM-MFG-TN-841",
    title: "Vice President - Operations & Plant Head",
    domain: "manufacturing",
    state: "TN",
    stateName: "Tamil Nadu (Sriperumbudur)",
    band: "50-100",
    bandLabel: "₹50 LPA - ₹75 LPA [CONFIRM: role band]",
    yearsExp: "22 Years",
    currentScope: "Overseeing 3 Tier-1 automotive press and assembly units, 1,400+ workforce",
    verifiedImpact: "Reduced OEE downtime by 28% and improved yield by 14% over 2 fiscal years",
    competencies: ["Automotive TS-16949", "Lean Kaizen Six Sigma", "P&L Ownership ₹450 Cr", "Union Collective Bargaining"],
    daysToScreen: "4.5 Days",
  },
  {
    id: "mfg-2",
    code: "JSM-MFG-MH-703",
    title: "General Manager - Precision Engineering",
    domain: "manufacturing",
    state: "MH",
    stateName: "Maharashtra (Pune / Chakan)",
    band: "25-50",
    bandLabel: "₹35 LPA - ₹48 LPA [CONFIRM: role band]",
    yearsExp: "16 Years",
    currentScope: "Managing high-precision CNC machining plant supplying global aerospace and hydraulics",
    verifiedImpact: "Executed ₹60 Cr Greenfield plant commission 3 weeks ahead of scheduled SOP",
    competencies: ["AS9100 Aerospace", "Greenfield SOP", "CNC Multi-Axis", "Supplier Quality Assurance"],
    daysToScreen: "5.0 Days",
  },
  {
    id: "tech-1",
    code: "JSM-ENG-KA-912",
    title: "Chief Technology Officer / VP Engineering",
    domain: "tech",
    state: "KA",
    stateName: "Karnataka (Bengaluru)",
    band: "50-100",
    bandLabel: "₹65 LPA - ₹95 LPA [CONFIRM: role band]",
    yearsExp: "18 Years",
    currentScope: "Leading 110-engineer platform team across distributed industrial IoT and cloud telematics",
    verifiedImpact: "Architected real-time telemetry processing 200M daily sensor events with 99.99% uptime",
    competencies: ["Enterprise Cloud Arch", "IoT Edge Telemetry", "SOC-2 Type II", "Team Scaling 30 -> 110"],
    daysToScreen: "4.0 Days",
  },
  {
    id: "tech-2",
    code: "JSM-ENG-DL-418",
    title: "Principal Technical Architect",
    domain: "tech",
    state: "DL",
    stateName: "Delhi NCR (Gurugram)",
    band: "25-50",
    bandLabel: "₹28 LPA - ₹42 LPA [CONFIRM: role band]",
    yearsExp: "13 Years",
    currentScope: "Core architect for high-throughput supply chain execution platform",
    verifiedImpact: "Refactored legacy monolith into event-driven microservices cutting latency by 65%",
    competencies: ["Distributed Systems", "Kubernetes / Go", "Event Streaming (Kafka)", "Zero-Downtime Migration"],
    daysToScreen: "3.5 Days",
  },
  {
    id: "sc-1",
    code: "JSM-SCM-GJ-527",
    title: "Chief Procurement Officer / Supply Chain Director",
    domain: "supplychain",
    state: "GJ",
    stateName: "Gujarat (Ahmedabad / Sanand)",
    band: "50-100",
    bandLabel: "₹55 LPA - ₹80 LPA [CONFIRM: role band]",
    yearsExp: "20 Years",
    currentScope: "Managing direct material procurement spend of ₹850 Cr across raw metals and polymers",
    verifiedImpact: "Achieved ₹38 Cr annual structural cost reduction via reverse auctions and multi-sourcing",
    competencies: ["Strategic Sourcing", "Direct Materials Procurement", "Vendor Risk Hedging", "SAP S/4HANA MM"],
    daysToScreen: "5.5 Days",
  },
  {
    id: "exec-1",
    code: "JSM-CFO-TN-319",
    title: "Chief Financial Officer (CFO)",
    domain: "executive",
    state: "TN",
    stateName: "Tamil Nadu (Chennai)",
    band: "50-100",
    bandLabel: "₹60 LPA - ₹90 LPA [CONFIRM: role band]",
    yearsExp: "21 Years",
    currentScope: "Heading corporate finance, treasury, statutory audit, and investor relations for ₹1,200 Cr enterprise",
    verifiedImpact: "Restructured ₹320 Cr debt facilities reducing annual weighted borrowing costs by 185 bps",
    competencies: ["Debt Syndication", "IndAS & IFRS Governance", "Board Reporting", "Tax Litigation & Transfer Pricing"],
    daysToScreen: "5.0 Days",
  },
];

const DOMAIN_OPTIONS: { id: DomainId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "manufacturing", label: "Operations & Plant Management", icon: Factory },
  { id: "tech", label: "Technical Leadership & Engineering", icon: Cpu },
  { id: "supplychain", label: "Supply Chain & Procurement", icon: Truck },
  { id: "executive", label: "C-Suite & Finance Leadership", icon: Landmark },
];

const STATE_OPTIONS: { id: StateId; label: string }[] = [
  { id: "all", label: "All 6 States" },
  { id: "TN", label: "Tamil Nadu" },
  { id: "KA", label: "Karnataka" },
  { id: "MH", label: "Maharashtra" },
  { id: "DL", label: "Delhi NCR" },
  { id: "GJ", label: "Gujarat" },
  { id: "MP", label: "Madhya Pradesh" },
];

const BAND_OPTIONS: { id: BandId; label: string }[] = [
  { id: "all", label: "All CTC Tiers" },
  { id: "12-25", label: "₹12L - ₹25L" },
  { id: "25-50", label: "₹25L - ₹50L" },
  { id: "50-100", label: "₹50L - ₹1 Cr" },
];

export function InteractiveRoleMatcher() {
  const [selectedDomain, setSelectedDomain] = React.useState<DomainId>("manufacturing");
  const [selectedState, setSelectedState] = React.useState<StateId>("all");
  const [selectedBand, setSelectedBand] = React.useState<BandId>("all");

  // Filter or fall back to domain match
  const filteredDossiers = React.useMemo(() => {
    let matches = DOSSIER_SAMPLES.filter((d) => d.domain === selectedDomain);
    if (selectedState !== "all") {
      const stateMatches = matches.filter((d) => d.state === selectedState);
      if (stateMatches.length > 0) matches = stateMatches;
    }
    if (selectedBand !== "all") {
      const bandMatches = matches.filter((d) => d.band === selectedBand);
      if (bandMatches.length > 0) matches = bandMatches;
    }
    return matches;
  }, [selectedDomain, selectedState, selectedBand]);

  const activeDossier = filteredDossiers[0] || DOSSIER_SAMPLES[0];

  // Calculated dynamic metrics based on filters
  const estimatedPoolCount = React.useMemo(() => {
    let base = 28;
    if (selectedDomain === "manufacturing") base = 34;
    if (selectedDomain === "tech") base = 26;
    if (selectedDomain === "supplychain") base = 21;
    if (selectedDomain === "executive") base = 17;

    if (selectedState !== "all") base = Math.max(7, Math.round(base * 0.42));
    if (selectedBand === "50-100") base = Math.max(5, Math.round(base * 0.55));
    if (selectedBand === "12-25") base = Math.max(9, Math.round(base * 0.85));

    return base;
  }, [selectedDomain, selectedState, selectedBand]);

  return (
    <section 
      id="talent-radar" 
      className="py-16 sm:py-24 bg-white border-b border-[#0E1116]/10 relative overflow-hidden w-full max-w-full"
      aria-labelledby="radar-heading"
    >
      {/* Background Dot Matrix */}
      <DotPattern
        width={24}
        height={24}
        cx={1.5}
        cy={1.5}
        cr={1}
        className="[mask-image:radial-gradient(ellipse_at_center,white_25%,transparent_75%)] opacity-40"
      />

      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F3EE] border border-[#0E1116]/10 text-xs font-semibold uppercase tracking-wider text-[#1F4E5F] mb-4 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-[#C8553D]" aria-hidden="true" />
            <span>Interactive Talent Radar</span>
          </div>

          <h2
            id="radar-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[#0E1116] leading-[1.12] mb-4 text-balance"
          >
            Explore pre-calibrated leadership dossiers in real time.
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#4A5568] leading-relaxed max-w-2xl text-pretty">
            Filter our verified leadership network across functional practice, state geography, and compensation tier to preview candidate depth before opening a mandate.
          </p>
        </div>

        {/* Filter Bar Controls (Closer.ai Style Dynamic Pills) */}
        <div className="bg-[#F6F3EE] p-4 sm:p-6 rounded-2xl border border-[#0E1116]/10 mb-8 sm:mb-10 shadow-2xs space-y-5">
          {/* 1. Domain Selector */}
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525866] block mb-2.5">
              1. Select Functional Practice
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {DOMAIN_OPTIONS.map((domain) => {
                const Icon = domain.icon;
                const isSelected = selectedDomain === domain.id;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => setSelectedDomain(domain.id)}
                    className={cn(
                      "flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all duration-200 border min-h-[44px]",
                      isSelected
                        ? "bg-[#0E1116] text-white border-[#0E1116] shadow-xs"
                        : "bg-white text-[#4A5568] border-[#0E1116]/10 hover:border-[#1F4E5F]/40 hover:text-[#0E1116]"
                    )}
                    aria-pressed={isSelected}
                  >
                    <Icon className={cn("w-4 h-4 shrink-0", isSelected ? "text-[#C8553D]" : "text-[#1F4E5F]")} />
                    <span className="truncate">{domain.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Secondary Filter Row: State & Band */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#0E1116]/10">
            {/* State Filter */}
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525866] block mb-2">
                2. Target State Geography
              </span>
              <div className="flex flex-wrap gap-1.5">
                {STATE_OPTIONS.map((state) => {
                  const isSelected = selectedState === state.id;
                  return (
                    <button
                      key={state.id}
                      type="button"
                      onClick={() => setSelectedState(state.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border min-h-[36px]",
                        isSelected
                          ? "bg-[#1F4E5F] text-white border-[#1F4E5F]"
                          : "bg-white text-[#4A5568] border-[#0E1116]/10 hover:border-[#1F4E5F]/30 hover:text-[#0E1116]"
                      )}
                      aria-pressed={isSelected}
                    >
                      {state.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compensation Band Filter */}
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525866] block mb-2">
                3. Leadership Compensation Band
              </span>
              <div className="flex flex-wrap gap-1.5">
                {BAND_OPTIONS.map((band) => {
                  const isSelected = selectedBand === band.id;
                  return (
                    <button
                      key={band.id}
                      type="button"
                      onClick={() => setSelectedBand(band.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border min-h-[36px]",
                        isSelected
                          ? "bg-[#C8553D] text-white border-[#C8553D]"
                          : "bg-white text-[#4A5568] border-[#0E1116]/10 hover:border-[#C8553D]/30 hover:text-[#0E1116]"
                      )}
                      aria-pressed={isSelected}
                    >
                      {band.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Matching Dashboard Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 cols): Live Telemetry & Mandate Calibration Specs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#F6F3EE] border border-[#0E1116]/10 relative overflow-hidden">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1F4E5F] block mb-1">
                Real-Time Sourcing Capacity
              </span>
              <div className="flex items-baseline gap-2 mt-2 mb-3">
                <span className="text-4xl sm:text-5xl font-heading font-medium text-[#0E1116] tabular-nums">
                  {estimatedPoolCount}
                </span>
                <span className="text-sm font-sans text-[#525866]">
                  verified senior leaders active in this segment
                </span>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#0E1116]/10 text-xs sm:text-sm text-[#4A5568]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1F4E5F]" />
                    <span>Average Days to Shortlist:</span>
                  </span>
                  <strong className="text-[#0E1116] font-mono">{activeDossier.daysToScreen}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C8553D]" />
                    <span>Contingency Commitment:</span>
                  </span>
                  <strong className="text-[#0E1116] font-mono">₹0 Advance Retainer</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1F4E5F]" />
                    <span>Replacement Guarantee:</span>
                  </span>
                  <strong className="text-[#0E1116] font-mono">90 Days [CONFIRM: fee %]</strong>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#0E1116]/10 text-xs text-[#525866] leading-relaxed">
              <strong className="text-[#0E1116] block mb-1">How Blind Dossiers Work:</strong>
              All prospective profiles are shared with anonymized identity to protect candidate privacy while delivering uncompromised factual proof of past operational performance, compensation history, and verified readiness.
            </div>

            <div className="pt-2">
              <Link
                href="#enquiry"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0E1116] text-[#F6F3EE] font-medium text-sm sm:text-base hover:bg-[#C8553D] hover:-translate-y-0.5 transition-all duration-300 min-h-[44px] shadow-sm"
              >
                <span>Request Blind Shortlist for This Tier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Blind Dossier Preview Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl md:rounded-3xl bg-white border border-[#0E1116]/12 p-6 sm:p-8 shadow-sm overflow-hidden">
              <BorderBeam size={320} duration={12} delay={0} colorFrom="#1F4E5F" colorTo="#C8553D" />

              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#0E1116]/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#1F4E5F]/10 text-[#1F4E5F] text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Blind Leadership Dossier Preview</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#0E1116]">
                    {activeDossier.title}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-xs text-[#525866] block">Ref Code:</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#0E1116]">{activeDossier.code}</span>
                </div>
              </div>

              {/* Dossier Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 text-xs">
                <div className="bg-[#F6F3EE] p-2.5 rounded-xl border border-[#0E1116]/8">
                  <span className="text-[#525866] block mb-0.5">Location</span>
                  <strong className="text-[#0E1116] truncate block">{activeDossier.stateName}</strong>
                </div>
                <div className="bg-[#F6F3EE] p-2.5 rounded-xl border border-[#0E1116]/8">
                  <span className="text-[#525866] block mb-0.5">Total Experience</span>
                  <strong className="text-[#0E1116] block">{activeDossier.yearsExp}</strong>
                </div>
                <div className="bg-[#F6F3EE] p-2.5 rounded-xl border border-[#0E1116]/8 col-span-2 sm:col-span-1">
                  <span className="text-[#525866] block mb-0.5">Current Scope CTC</span>
                  <strong className="text-[#1F4E5F] block truncate">{activeDossier.bandLabel}</strong>
                </div>
              </div>

              {/* Operational Scope */}
              <div className="space-y-3 py-3 border-t border-[#0E1116]/10 text-xs sm:text-sm">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525866] block mb-1">
                    Current Operational Mandate
                  </span>
                  <p className="text-[#0E1116] font-medium leading-relaxed">
                    {activeDossier.currentScope}
                  </p>
                </div>

                <div className="bg-[#F6F3EE] p-3.5 rounded-xl border-l-4 border-[#C8553D]">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C8553D] block mb-1">
                    Verified Performance Metric
                  </span>
                  <p className="text-xs sm:text-sm text-[#0E1116] font-medium leading-relaxed">
                    "{activeDossier.verifiedImpact}"
                  </p>
                </div>
              </div>

              {/* Verified Competencies */}
              <div className="pt-3 border-t border-[#0E1116]/10">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525866] block mb-2">
                  Pre-Screened Competency Markers
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeDossier.competencies.map((comp) => (
                    <span
                      key={comp}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#0E1116]/10 text-xs font-medium text-[#0E1116] shadow-2xs"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#1F4E5F]" />
                      <span>{comp}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Candidate Discretion Notice */}
              <div className="mt-5 pt-4 border-t border-[#0E1116]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#525866]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1F4E5F] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1F4E5F]" />
                  </span>
                  <span>Notice Period: 30–60 Days · Actively Calibrated</span>
                </div>
                <Link
                  href="#enquiry"
                  className="inline-flex items-center gap-1 font-semibold text-[#1F4E5F] hover:text-[#C8553D] transition-colors"
                >
                  <span>Request Full Candidate Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
