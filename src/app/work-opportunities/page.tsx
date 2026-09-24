"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  ArrowRight
} from "lucide-react";
import { brandData } from "@/data/brand";

interface JobPosting {
  id: string;
  title: string;
  category: "officer" | "jco" | "esm" | "corporate" | "facility";
  categoryLabel: string;
  district: string;
  experience: string;
  salary: string;
  vacancies: number;
  description: string;
  qualifications: string[];
  formFile: string;
}

const jobsData: JobPosting[] = [
  {
    id: "JSM-JOB-01",
    title: "Chief Security Officer (CSO) - Commissioned Officer Track",
    category: "officer",
    categoryLabel: "Executive Cadre",
    district: "Chennai (OMR Corridor)",
    experience: "Retired Major / Lt Col / Wing Commander / Cdr",
    salary: "₹65,000 - ₹85,000 / month + Perks",
    vacancies: 2,
    description: "Lead enterprise security operations, C3 command desk, risk mitigation, and surveillance protocols across multi-tenant IT technology parks.",
    qualifications: ["Ex-Commissioned Officer with exemplary service record", "Command experience in sensitive infrastructure", "Executive client interface"],
    formFile: "Form-A-Officer-Recruitment.docx"
  },
  {
    id: "JSM-JOB-02",
    title: "Security Field Supervisor - Ex-JCO Track",
    category: "jco",
    categoryLabel: "Field Supervisory",
    district: "Trichy International Airport Hub",
    experience: "Ex-Subedar / Naib Subedar / Havildar",
    salary: "₹32,000 - ₹42,000 / month + PF + ESI",
    vacancies: 6,
    description: "Manage physical muster, guard turnout, visitor access control, and conduct 2:00 AM unannounced supervisor van spot-audits.",
    qualifications: ["Ex-JCO or Senior NCO with military discharge book", "Working knowledge of biometric registers", "Valid two-wheeler driving license"],
    formFile: "Form-B-JCO-Application.docx"
  },
  {
    id: "JSM-JOB-03",
    title: "Ex-Servicemen & Private Security Guard (Male & Female)",
    category: "esm",
    categoryLabel: "Guard Platoon",
    district: "Trichy, Chennai, Coimbatore, Hosur",
    experience: "Fresher to 2 Years / Military Discharge",
    salary: "Statutory Minimum Wages + 100% EPF + ESI + Allowances",
    vacancies: 35,
    description: "Access control, gate-pass logging, perimeter patrolling, and emergency fire safety response at corporate and industrial SEZ posts.",
    qualifications: ["Age 21-50 years with good physical health", "Clear background check with police verification", "5-day training syllabus completion"],
    formFile: "Form-ESM-1-Ex-Servicemen.docx"
  },
  {
    id: "JSM-JOB-04",
    title: "Commercial Housekeeping & Facility Supervisor",
    category: "facility",
    categoryLabel: "Facility Management",
    district: "Trichy & Chennai",
    experience: "1 - 3 Years in Facility Supervision",
    salary: "₹24,000 - ₹30,000 / month + EPF + ESI",
    vacancies: 4,
    description: "Supervise cleaning teams, inspect 5-step closed loop hygiene checklists, and manage mechanized ride-on auto scrubbers.",
    qualifications: ["Experience supervising commercial or hospital hygiene", "Knowledge of color-coded microfiber sanitization", "Good communication skills"],
    formFile: "Form-SL-1-Skilled-Labor.docx"
  }
];

export default function WorkOpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const filtered = jobsData.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || job.district.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "all" || job.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Header */}
        <section className="py-8 sm:py-12 border-b border-[#E7E5E0]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <Briefcase size={14} />
              <span>Job Aggregator &amp; Active Postings</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-normal tracking-tight">
              Active Vacancies &amp; Work Opportunities
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              Explore open positions across Tamil Nadu. All roles include guaranteed on-time salary disbursement, complete company uniform, and 100% EPF/ESIC coverage.
            </p>
          </div>
        </section>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Postings" },
              { id: "officer", label: "Commissioned Officers" },
              { id: "jco", label: "JCO & Supervisors" },
              { id: "esm", label: "Security Guards" },
              { id: "facility", label: "Facility Staff" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCat(tab.id)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  selectedCat === tab.id
                    ? "bg-[#0B3D2E] text-white"
                    : "bg-[#F8F9FA] text-[#5A6578] hover:text-[#14181F] border border-[#E7E5E0]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A6578]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role or district..."
              className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
            />
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-6">
          {filtered.map((job) => (
            <article
              key={job.id}
              className="p-7 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA]/40 space-y-4 hover:border-[#0B3D2E]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E5E0]/60 pb-3">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono font-bold text-[#0B3D2E]">{job.id}</span>
                  <span className="text-neutral-300">&bull;</span>
                  <span className="font-semibold text-[#14181F]">{job.categoryLabel}</span>
                  <span className="text-neutral-300">&bull;</span>
                  <span className="font-mono text-[#5A6578]">{job.vacancies} Vacancies</span>
                </div>
                <span className="text-xs font-mono text-[#5A6578] flex items-center gap-1">
                  <MapPin size={13} />
                  {job.district}
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-[#14181F]">
                  {job.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5A6578] leading-relaxed">
                  {job.description}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-[#14181F] block mb-1">Key Qualifications:</span>
                  <ul className="space-y-1 text-xs text-[#4A5568]">
                    {job.qualifications.map((q, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#0B3D2E] shrink-0" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E5E0]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs">
                  <strong className="text-[#14181F]">Remuneration:</strong>{" "}
                  <span className="font-mono text-[#0B3D2E] font-semibold">{job.salary}</span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`/downloads/${job.formFile}`}
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6578] hover:text-[#14181F] transition-colors"
                  >
                    <Download size={13} />
                    <span>Download Dossier</span>
                  </a>
                  <Link
                    href="/careers#apply"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B3D2E] text-white text-xs font-semibold hover:bg-[#082C21] transition-colors shadow-2xs"
                  >
                    <span>Apply Online</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
