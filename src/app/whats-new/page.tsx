"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  Search, 
  Calendar, 
  ShieldCheck, 
  Download, 
  Plane, 
  FileCheck, 
  Award, 
  ArrowRight
} from "lucide-react";
import { brandData } from "@/data/brand";

interface Bulletin {
  id: string;
  date: string;
  category: "deployment" | "compliance" | "aviation" | "esm" | "tech";
  categoryLabel: string;
  title: string;
  excerpt: string;
  details: string;
  actionUrl?: string;
  actionLabel?: string;
}

const bulletins: Bulletin[] = [
  {
    id: "BLT-2026-08",
    date: "March 04, 2026",
    category: "aviation",
    categoryLabel: "Aviation Benchmark",
    title: "Trichy International Airport Commercial Wing Operations Audit Completed",
    excerpt: "JSM Integrated Services completes 100% satisfactory security and passenger access audit for civil aviation passenger transit commercial zones.",
    details: "All deployed personnel completed mandatory aviation security awareness refresher modules. Zero unauthorized incursions recorded across 180 continuous operational cycles.",
  },
  {
    id: "BLT-2026-07",
    date: "February 26, 2026",
    category: "compliance",
    categoryLabel: "Statutory Gazette",
    title: "Tamil Nadu Minimum Wages Act Gazette Schedule Integrated",
    excerpt: "Updated basic wage revisions and VDA adjustments across Zone A, B, and C districts integrated into transparent client wage sheets.",
    details: "All corporate clients received revised Annexure-1 statutory sheets along with genuine bank disbursement proof and EPF/ESIC ECR challan copies.",
    actionUrl: "/downloads/JSM-Compliance-Checklist.docx",
    actionLabel: "Download Compliance Checklist (.docx)"
  },
  {
    id: "BLT-2026-06",
    date: "February 18, 2026",
    category: "esm",
    categoryLabel: "Ex-Servicemen Resettlement",
    title: "Ex-Servicemen JCO Field Supervisory Batch Commissioned",
    excerpt: "New batch of 18 retired Indian Armed Forces JCOs and NCOs inducted after completing commercial SOP training in Trichy.",
    details: "Supervisors deployed across manufacturing SEZ corridors in Hosur, Sriperumbudur, and Coimbatore to manage 2:00 AM mobile van spot-audits.",
    actionUrl: "/downloads/Form-B-JCO-Application.docx",
    actionLabel: "Download JCO Dossier Form-B (.docx)"
  },
  {
    id: "BLT-2026-05",
    date: "February 04, 2026",
    category: "deployment",
    categoryLabel: "Industrial Deployment",
    title: "48-Hour Rapid Mobilization Executed for Automotive Component Plant",
    excerpt: "Turnkey deployment of 24 verified guards and 8 technical line assemblers within 48 hours in Hosur automotive corridor.",
    details: "Complete police verification, Aadhaar authentication, and PF/ESI registrations completed prior to shift muster.",
  }
];

export default function WhatsNewPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const filtered = bulletins.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "all" || b.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Header */}
        <section className="py-8 sm:py-12 border-b border-[#E7E5E0]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <Bell size={14} />
              <span>Operational Chronology</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-normal tracking-tight">
              Operational Bulletins &amp; Milestones
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              Official operational notices, statutory gazette updates, and field deployment milestones from our Central Command in Tiruchirappalli.
            </p>
          </div>
        </section>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Bulletins" },
              { id: "aviation", label: "Aviation" },
              { id: "compliance", label: "Compliance" },
              { id: "esm", label: "Ex-Servicemen" },
              { id: "deployment", label: "Deployments" },
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
              placeholder="Search bulletins..."
              className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
            />
          </div>
        </div>

        {/* Bulletins Feed */}
        <div className="space-y-6">
          {filtered.map((b) => (
            <article
              key={b.id}
              className="p-7 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA]/40 space-y-4 hover:border-[#0B3D2E]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E5E0]/60 pb-3">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono font-bold text-[#0B3D2E]">{b.id}</span>
                  <span className="text-neutral-300">&bull;</span>
                  <span className="font-semibold text-[#14181F]">{b.categoryLabel}</span>
                </div>
                <time className="text-xs font-mono text-[#5A6578]">{b.date}</time>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-[#14181F]">
                  {b.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5A6578] leading-relaxed">
                  {b.excerpt}
                </p>
                <p className="text-xs text-[#4A5568] leading-relaxed pt-1">
                  {b.details}
                </p>
              </div>

              {b.actionUrl && (
                <div className="pt-2">
                  <a
                    href={b.actionUrl}
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B3D2E] hover:underline"
                  >
                    <Download size={13} />
                    <span>{b.actionLabel}</span>
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
