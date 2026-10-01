import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Download } from "lucide-react";
import { brandData } from "@/data/brand";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2A47] text-[#F8FAFC] border-t border-[#1A3E63]">
      {/* Upper Direct Contact & Inquiry Strip */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-[#1A3E63]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-sm font-medium text-white">
            <span className="text-[#9C7A3C]">JSM Operations:</span> PSARA Act 2005 Licensed &bull; ISO 9001:2015 &bull; 100% EPF/ESIC
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-semibold">
            <a href={`tel:${brandData.contact.phone}`} className="flex items-center gap-2 hover:text-[#9C7A3C] transition-colors tabular-nums">
              <Phone size={14} className="text-[#9C7A3C]" />
              <span>{brandData.contact.phoneDisplay}</span>
            </a>
            <Link href="/get-quote" className="text-[#9C7A3C] hover:text-white transition-colors">
              Request a Proposal &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navigation Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-sm">
          {/* Col 1: Services (Three-Tier Model) */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-semibold text-white tracking-normal">
              Services &amp; Operations
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <Link href="/services/private-security" className="hover:text-white transition-colors">
                  Tier 1: Security Guards &amp; ESM Supervisors
                </Link>
              </li>
              <li>
                <Link href="/services/manpower" className="hover:text-white transition-colors">
                  Tier 2: Contract Staffing &amp; Industrial Workforce
                </Link>
              </li>
              <li>
                <Link href="/services/housekeeping" className="hover:text-white transition-colors">
                  Tier 3: Facility Management &amp; Hygiene
                </Link>
              </li>
              <li>
                <Link href="/services/tender-procurement-supply" className="hover:text-white transition-colors">
                  Auxiliary: GeM Tender &amp; e-Procurement Bidding
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors font-medium text-[#9C7A3C]">
                  View All Services Specification
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Governance & Case Studies */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-semibold text-white tracking-normal">
              Governance &amp; Authority
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Leadership (Sweety J &bull; Major AR Devadoss)
                </Link>
              </li>
              <li>
                <Link href="/case-studies/trichy-international-airport" className="hover:text-white transition-colors">
                  Airport Case Study: Trichy Operations
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-white transition-colors">
                  Knowledge Hub &amp; Compliance Guides
                </Link>
              </li>
              <li>
                <Link href="/compare/in-house-vs-outsourced-security" className="hover:text-white transition-colors">
                  In-House vs Outsourced Cost Comparison
                </Link>
              </li>
              <li>
                <Link href="/security-agencies" className="hover:text-white transition-colors">
                  PSARA Act &amp; Statutory Legal Framework
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers &amp; Ex-Servicemen Intake
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: District Hubs */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-semibold text-white tracking-normal">
              <Link href="/locations" className="hover:text-[#9C7A3C] transition-colors">
                District Hubs
              </Link>
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li>
                <Link href="/locations/trichy" className="hover:text-white transition-colors">
                  <span className="font-semibold text-white">Trichy:</span> Central Operations HQ
                </Link>
              </li>
              <li>
                <Link href="/locations/chennai" className="hover:text-white transition-colors">
                  <span className="font-semibold text-white">Chennai:</span> OMR Tech Corridor
                </Link>
              </li>
              <li>
                <Link href="/locations/coimbatore" className="hover:text-white transition-colors">
                  <span className="font-semibold text-white">Coimbatore:</span> Industrial Outpost
                </Link>
              </li>
              <li>
                <Link href="/locations/hosur" className="hover:text-white transition-colors">
                  <span className="font-semibold text-white">Hosur:</span> Manufacturing SEZ
                </Link>
              </li>
              <li>
                <Link href="/locations/salem" className="hover:text-white transition-colors">
                  <span className="font-semibold text-white">Salem:</span> Heavy Engineering Hub
                </Link>
              </li>
              <li>
                <Link href="/locations/madurai" className="hover:text-white transition-colors">
                  <span className="font-semibold text-white">Madurai:</span> Southern Regional Hub
                </Link>
              </li>
              <li>
                <Link href="/locations/tirunelveli" className="hover:text-white transition-colors">
                  <span className="font-semibold text-white">Tirunelveli:</span> Renewable Energy Corridor
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations Desk & Departmental Inboxes */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-semibold text-white tracking-normal">
              Headquarters Operations
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="shrink-0 mt-0.5 text-[#9C7A3C]" />
                <span>{brandData.contact.address}</span>
              </div>
              <div className="pt-1 space-y-1.5 border-t border-[#1A3E63]/70">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#9C7A3C] w-14 shrink-0">General:</span>
                  <a href={`mailto:${brandData.contact.email}`} className="hover:text-white transition-colors">
                    {brandData.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#9C7A3C] w-14 shrink-0">Sales:</span>
                  <a href={`mailto:${brandData.contact.salesEmail}`} className="hover:text-white transition-colors">
                    {brandData.contact.salesEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#9C7A3C] w-14 shrink-0">Careers:</span>
                  <a href={`mailto:${brandData.contact.careersEmail}`} className="hover:text-white transition-colors">
                    {brandData.contact.careersEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#9C7A3C] w-14 shrink-0">24/7 Help:</span>
                  <a href={`mailto:${brandData.contact.helpEmail}`} className="hover:text-white transition-colors">
                    {brandData.contact.helpEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1A3E63] space-y-1.5 text-xs text-neutral-300">
              <a
                href="/downloads/JSM-Compliance-Checklist.docx"
                download
                className="hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <Download size={12} className="text-[#9C7A3C]" />
                <span>PSARA Vendor Audit Checklist (.docx)</span>
              </a>
              <div className="pt-1">
                <a
                  href="https://maps.google.com/?q=JSM+Integrated+Services+Plot+112+Gandhi+Nagar+RVS+Nagar+Kottapattu+Trichy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9C7A3C] hover:underline font-medium inline-block"
                >
                  Verified Google Business Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Statutory Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-[#1A3E63] text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          &copy; {currentYear} JSM Integrated Services. PSARA Act 2005 &bull; ISO 9001:2015 &bull; Controlling Authority, Home Dept, Govt of Tamil Nadu.
        </div>
        <div className="flex items-center gap-4">
          <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
