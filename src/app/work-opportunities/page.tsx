"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  IndianRupee, 
  ShieldCheck, 
  Download, 
  Filter, 
  MessageCircle, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles,
  ChevronRight,
  Send
} from "lucide-react";
import { brandData } from "@/data/brand";

interface JobPosting {
  id: string;
  title: string;
  category: "officer" | "jco" | "esm" | "corporate" | "facility";
  district: string;
  experience: string;
  salary: string;
  dgrEligible: boolean;
  urgent: boolean;
  vacancies: number;
  description: string;
  qualifications: string[];
  formFile: string;
}

const jobsData: JobPosting[] = [
  {
    id: "JSM-SEC-01",
    title: "Chief Security Officer (CSO) - Ex-Commissioned Officer",
    category: "officer",
    district: "Chennai (OMR Corridor)",
    experience: "Retired Major / Lt Col / Wing Commander / Cdr",
    salary: "₹65,000 - ₹85,000 / month + Perks",
    dgrEligible: true,
    urgent: true,
    vacancies: 2,
    description: "Lead enterprise security operations, C3 command desk, risk mitigation, and surveillance protocols across multi-tenant IT technology parks.",
    qualifications: ["Ex-Commissioned Officer with exemplary service record", "Command experience in sensitive infrastructure", "Proven team leadership and stakeholder management"],
    formFile: "Form-A-Officer-Recruitment.docx"
  },
  {
    id: "JSM-SEC-02",
    title: "Security Field Supervisor - Ex-JCO Track",
    category: "jco",
    district: "Trichy International Airport Hub",
    experience: "Ex-Subedar / Naib Subedar / Havildar",
    salary: "₹32,000 - ₹42,000 / month + PF + ESI",
    dgrEligible: true,
    urgent: true,
    vacancies: 6,
    description: "Supervise terminal access gates, perimeter patrol teams, daily roll-calls, night spot-audits, and emergency relief deployments.",
    qualifications: ["Ex-JCO with military discipline", "Valid weapons training and crowd management proficiency", "Physical fitness Category SHAPE-1 equivalent"],
    formFile: "Form-B-JCO-Application.docx"
  },
  {
    id: "JSM-SEC-03",
    title: "Armed Security Marshal - Ex-Servicemen (ESM)",
    category: "esm",
    district: "Hosur Industrial Belt",
    experience: "Ex-Jawan / Naik / L/Nk (Army / Navy / Air Force)",
    salary: "₹24,000 - ₹30,000 / month + DGR Norms",
    dgrEligible: true,
    urgent: false,
    vacancies: 15,
    description: "Guard critical automotive assembly gates, manage heavy vehicle cargo transit logs, and conduct round-the-clock perimeter deterrence.",
    qualifications: ["Valid Ex-Servicemen discharge book", "Clean service record and exemplary conduct character", "Basic English/Tamil communication"],
    formFile: "Form-ESM-1-Ex-Servicemen.docx"
  },
  {
    id: "JSM-CORP-01",
    title: "Facility Operations Coordinator & IT Helpdesk",
    category: "corporate",
    district: "Coimbatore",
    experience: "1 - 3 Years in Admin / Facility Desk",
    salary: "₹22,000 - ₹28,000 / month + Benefits",
    dgrEligible: false,
    urgent: false,
    vacancies: 4,
    description: "Manage shift ticketing systems, visitor entry management, attendance logging, and vendor escalation for tech campus.",
    qualifications: ["Any Graduate / Diploma in Management or Computer Applications", "Proficiency in MS Office / Google Sheets", "Fluency in Tamil and English"],
    formFile: "Form-SL-1-Skilled-Labor.docx"
  },
  {
    id: "JSM-FAC-01",
    title: "Commercial Housekeeping Supervisor",
    category: "facility",
    district: "Madurai & Salem",
    experience: "2+ Years in Hospital or Mall Facility Management",
    salary: "₹20,000 - ₹26,000 / month + PF + ESI",
    dgrEligible: false,
    urgent: true,
    vacancies: 8,
    description: "Audit closed-loop 5-step sanitization protocols, machine floor scrubbing, hygiene chemical stock registers, and crew shift rotations.",
    qualifications: ["Prior experience supervising industrial cleaning equipment", "Knowledge of color-coded microfiber sanitization protocols", "Leadership of 15+ cleaning operatives"],
    formFile: "Form-SL-1-Skilled-Labor.docx"
  },
  {
    id: "JSM-FAC-02",
    title: "Facility Support & Maintenance Staff (Unskilled / Semi-Skilled)",
    category: "facility",
    district: "Erode & Tirunelveli",
    experience: "Fresher / 6 Months Facility Exposure",
    salary: "₹16,000 - ₹20,000 / month + ESI + PF",
    dgrEligible: false,
    urgent: false,
    vacancies: 25,
    description: "Assisting material transport, office upkeep, floor maintenance, and campus hygiene under trained supervisors.",
    qualifications: ["Valid Aadhaar card and clean local verification", "Willingness to work structured 8-hour shift cycles", "Reliable attendance track record"],
    formFile: "Form-SL-2-Unskilled-Labor.docx"
  }
];

export default function WorkOpportunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredJobs = jobsData.filter(job => {
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    const matchesDistrict = selectedDistrict === "all" || job.district.toLowerCase().includes(selectedDistrict.toLowerCase());
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDistrict && matchesSearch;
  });

  return (
    <div className="bg-white text-[#1d1d1f] min-h-screen">
      {/* Top Banner */}
      <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 bg-[#0c0c0e] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(0,113,227,0.2),rgba(255,255,255,0))]" />
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0071e3]/15 border border-[#0071e3]/30 text-[#2997ff] text-xs font-semibold uppercase tracking-wider mb-6">
            <Briefcase size={14} />
            <span>Opportunities Aggregator &amp; DGR Schemes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
            Find Your Calling. Direct Deployment Across Tamil Nadu.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            Transparent listings for Ex-Servicemen (Officers, JCOs, ORs), corporate specialists, and facility professionals. Direct statutory benefits, prompt payroll, and structured military-grade growth.
          </p>

          {/* Aggregator Search Bar */}
          <div className="mt-10 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 max-w-4xl shadow-xl flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative flex items-center">
              <Search size={18} className="absolute left-4 text-white/50" />
              <input 
                type="text"
                placeholder="Search job title, role, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white/10 border border-white/10 transition-colors"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/10 text-white text-xs font-medium focus:outline-none border border-white/10"
              >
                <option value="all" className="text-black">All Categories</option>
                <option value="officer" className="text-black">Officers Track</option>
                <option value="jco" className="text-black">JCO / Supervisor Track</option>
                <option value="esm" className="text-black">Ex-Servicemen Guard</option>
                <option value="corporate" className="text-black">Corporate / IT Staff</option>
                <option value="facility" className="text-black">Facility &amp; Housekeeping</option>
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/10 text-white text-xs font-medium focus:outline-none border border-white/10"
              >
                <option value="all" className="text-black">All Districts</option>
                <option value="Trichy" className="text-black">Trichy</option>
                <option value="Chennai" className="text-black">Chennai (OMR)</option>
                <option value="Coimbatore" className="text-black">Coimbatore</option>
                <option value="Hosur" className="text-black">Hosur</option>
                <option value="Madurai" className="text-black">Madurai</option>
                <option value="Salem" className="text-black">Salem</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Google Ads Placement Slot: Top Leaderboard (728x90) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-8 pb-4">
        <div className="w-full max-w-[728px] mx-auto h-[90px] rounded-xl bg-[#f5f5f7] border border-dashed border-black/15 flex flex-col items-center justify-center text-center p-3">
          <span className="text-[10px] font-mono text-[#86868b] tracking-wider uppercase">Advertisement • Partner Opportunity</span>
          <p className="text-xs font-medium text-[#1d1d1f] mt-1">
            Looking for Government Resettlement &amp; Defense PSU Openings? Check DGR Official Bulletins.
          </p>
        </div>
      </div>

      {/* Job Grid & Aside Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Job Listings (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1d1d1f]">
                Active Openings ({filteredJobs.length})
              </h2>
              <span className="text-xs text-[#86868b]">
                Real-time verified vacancies
              </span>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-16 bg-[#f5f5f7] rounded-2xl border border-black/5 p-6">
                <p className="text-[#6e6e73] text-sm">No openings found matching your criteria.</p>
                <button 
                  onClick={() => { setSelectedCategory("all"); setSelectedDistrict("all"); setSearchQuery(""); }}
                  className="mt-4 px-4 py-2 rounded-full bg-[#1d1d1f] text-white text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 rounded-2xl bg-white border border-black/[0.08] hover:border-black/[0.18] hover:shadow-md transition-all space-y-4 group"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#f5f5f7] text-[10px] font-mono font-bold text-[#1d1d1f]">
                            {job.id}
                          </span>
                          {job.dgrEligible && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                              DGR Aligned
                            </span>
                          )}
                          {job.urgent && (
                            <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-bold border border-red-200 animate-pulse">
                              Immediate Joining
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors leading-snug">
                          {job.title}
                        </h3>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-emerald-700 block">{job.salary}</span>
                        <span className="text-[11px] text-[#86868b]">{job.vacancies} open spots</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#515154] py-1 border-y border-black/[0.04]">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#0071e3]" />
                        <span>{job.district}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-[#86868b]" />
                        <span>{job.experience}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#6e6e73] leading-relaxed">
                      {job.description}
                    </p>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-[#1d1d1f] uppercase tracking-wide">Key Requirements:</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {job.qualifications.map((q, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 text-xs text-[#515154]">
                            <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06]">
                      <a
                        href={`/downloads/${job.formFile}`}
                        download
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline"
                      >
                        <Download size={13} />
                        <span>Download Dossier ({job.formFile.split('.')[0]})</span>
                      </a>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20I%20wish%20to%20apply%20for%20the%20role%20${encodeURIComponent(job.title)}%20(Ref:%20${job.id}).`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
                        >
                          <MessageCircle size={14} />
                          <span>Apply on WhatsApp</span>
                        </a>

                        <Link
                          href="/careers"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold transition-colors"
                        >
                          <span>Full Form Apply</span>
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar / Aside (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* DGR Resettlement Schemes Info Box */}
            <div className="p-6 rounded-2xl bg-[#f5f5f7] border border-black/[0.08] space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                <ShieldCheck size={12} />
                <span>DGR Schemes Guide</span>
              </div>
              <h3 className="text-base font-bold text-[#1d1d1f]">
                Self-Employment Opportunities for Ex-Servicemen
              </h3>
              <p className="text-xs text-[#6e6e73] leading-relaxed">
                The Ministry of Defence administers diverse self-employment schemes for retiring armed forces personnel:
              </p>
              <ul className="space-y-2 text-xs text-[#515154]">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3] shrink-0 mt-1.5" />
                  <span><strong>Security Agency Scheme:</strong> ESM Officers empanelled to run private guarding agencies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3] shrink-0 mt-1.5" />
                  <span><strong>Coal Loading &amp; Transportation:</strong> ESM transport companies operating at CIL subsidiaries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3] shrink-0 mt-1.5" />
                  <span><strong>CNG Station Allotment:</strong> Priority civil retail outlets for defense war widows and disabled soldiers.</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-black/[0.06]">
                <Link
                  href="/security-agencies"
                  className="text-xs font-bold text-[#0071e3] hover:underline inline-flex items-center gap-1"
                >
                  <span>Read our Security Agencies guide</span>
                  <ChevronRight size={12} />
                </Link>
              </div>
            </div>

            {/* Google Ads Placement Slot: Medium Rectangle (300x250) */}
            <div className="w-full h-[250px] rounded-2xl bg-[#f5f5f7] border border-dashed border-black/15 flex flex-col items-center justify-center text-center p-4">
              <span className="text-[10px] font-mono text-[#86868b] tracking-wider uppercase">Advertisement</span>
              <p className="text-xs font-medium text-[#1d1d1f] mt-2 max-w-[200px]">
                PSARA Certification &amp; Industrial Safety Officer Training Courses
              </p>
              <span className="text-[10px] text-[#86868b] mt-3">Ad Space Slot • Google Ads Ready</span>
            </div>

            {/* Induction & Training Calendar */}
            <div className="p-6 rounded-2xl bg-[#f5f5f7] border border-black/[0.08] space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-[#0071e3]" />
                <h3 className="text-sm font-bold text-[#1d1d1f]">Training Batch Schedule</h3>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-black/[0.06]">
                  <span className="font-bold text-[#1d1d1f] block">PSARA Security Marshal Batch 42</span>
                  <span className="text-[#86868b] block mt-0.5">Trichy Training Ground • 5 Days Induction</span>
                  <span className="text-emerald-700 font-medium block mt-1">Starting: 15th of Every Month</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-black/[0.06]">
                  <span className="font-bold text-[#1d1d1f] block">Industrial Housekeeping Tech Batch 18</span>
                  <span className="text-[#86868b] block mt-0.5">Chennai Regional Hub • 3 Days Certification</span>
                  <span className="text-emerald-700 font-medium block mt-1">Starting: 1st of Every Month</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
