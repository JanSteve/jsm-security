"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, Download } from "lucide-react";
import { brandData } from "@/data/brand";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1A17] text-[#F5F3EE] border-t border-neutral-800">
      {/* Upper Credential & Inquiry Banner */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-12 border-b border-neutral-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
          <div className="lg:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#145C43]/60 text-emerald-300 text-xs font-medium border border-emerald-500/30">
              <ShieldCheck size={14} />
              <span>Statutory Compliance Guaranteed</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-white font-normal">
              Structured security, staffing &amp; facility operations.
            </h3>
            <p className="text-neutral-400 text-sm max-w-2xl">
              PSARA-licensed and ISO 9001:2015-certified partner managing complete premises protection, 100% EPF/ESIC-compliant manpower, and commercial facility hygiene across South India.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:justify-end">
            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-5 h-[48px] rounded-[8px] bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold transition-colors tabular-nums"
            >
              <Phone size={15} className="text-emerald-400" />
              <span>{brandData.contact.phoneDisplay}</span>
            </a>
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-6 h-[48px] rounded-[8px] bg-[#1E7A58] hover:bg-[#145C43] text-white text-sm font-semibold transition-colors shadow-xs"
            >
              <span>Request Quote</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navigation Grid with Consistent Eyebrow Headers */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          {/* Col 1: Three-Tier Operating Model */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-neutral-300">
              Three-Tier Model
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/services/private-security" className="hover:text-white transition-colors">
                  Tier 1: Security Supervisors &amp; Guards (ESM/Pvt)
                </Link>
              </li>
              <li>
                <Link href="/services/manpower" className="hover:text-white transition-colors">
                  Tier 2: Contract Staffing &amp; Workforce
                </Link>
              </li>
              <li>
                <Link href="/services/housekeeping" className="hover:text-white transition-colors">
                  Tier 3: Facility Management &amp; Hygiene
                </Link>
              </li>
              <li>
                <Link href="/services/tender-procurement-supply" className="hover:text-white transition-colors">
                  Auxiliary: GeM Tender &amp; Procurement
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  View All Capabilities &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Company & Governance */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-neutral-300">
              Company &amp; Governance
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Leadership (Sweety J &bull; Major AR Devadoss)
                </Link>
              </li>
              <li>
                <Link href="/security-agencies" className="hover:text-white transition-colors">
                  PSARA &amp; DGR Compliance
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers &amp; Recruitment
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-white transition-colors">
                  Operations Dispatches
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Operations Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: District Hubs */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-neutral-300">
              District Hubs
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li><strong className="text-neutral-200">Trichy:</strong> Central Operations HQ</li>
              <li><strong className="text-neutral-200">Chennai:</strong> OMR Tech Corridor</li>
              <li><strong className="text-neutral-200">Coimbatore:</strong> Industrial Division</li>
              <li><strong className="text-neutral-200">Hosur:</strong> Manufacturing SEZ</li>
              <li><strong className="text-neutral-200">Salem &amp; Erode:</strong> Fabrication Grid</li>
              <li><strong className="text-neutral-200">Madurai:</strong> Southern Regional Hub</li>
            </ul>
          </div>

          {/* Col 4: Compliance Downloads & Headquarters Contact */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-neutral-300">
              Compliance Downloads &amp; HQ
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="/downloads/Form-A-Officer-Recruitment.docx" download className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <Download size={12} className="text-neutral-500" />
                  <span>Form-A: Officer Intake (.docx)</span>
                </a>
              </li>
              <li>
                <a href="/downloads/Form-B-JCO-Application.docx" download className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <Download size={12} className="text-neutral-500" />
                  <span>Form-B: JCO Application (.docx)</span>
                </a>
              </li>
              <li>
                <a href="/downloads/JSM-Compliance-Checklist.docx" download className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <Download size={12} className="text-neutral-500" />
                  <span>PSARA Audit Checklist (.docx)</span>
                </a>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-neutral-400 border-t border-neutral-800 space-y-1">
              <div className="flex items-start gap-1.5">
                <MapPin size={12} className="shrink-0 mt-0.5 text-emerald-400" />
                <span>RVS Nagar, Kottapattu, Trichy 620021</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={12} className="shrink-0 text-emerald-400" />
                <a href={`mailto:${brandData.contact.email}`} className="hover:text-white">
                  {brandData.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Attribution Bar */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-6 border-t border-neutral-800/80 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          &copy; {currentYear} JSM Integrated Services. All rights reserved. &bull; PSARA 2005 &bull; ISO 9001:2015 &bull; Home Dept Govt of Tamil Nadu
        </div>
        <div className="flex items-center gap-5">
          <Link href="/legal/privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
          <Link href="/legal/terms" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
          <Link href="/sitemap.xml" className="hover:text-neutral-300 transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
