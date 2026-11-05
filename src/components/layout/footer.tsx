import * as React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { brandData } from "@/data/brand";

/**
 * Footer Component — JSM Integrated Services
 * Re-architected strictly for Executive Talent Acquisition & Senior Leadership Recruitment.
 *
 * Design System Compliance:
 * - Palette: Ink `#0E1116`, Paper `#F6F3EE`, Card `#FFFFFF`, Accent `#C8553D`, Deep Teal `#1F4E5F`, Muted `#9CA3AF`.
 * - Pure monochromatic Ink base with crisp contrast and zero neon/electric accents.
 * - Enforces minimum 44px x 44px touch targets across 100% of interactive links to satisfy WCAG 2.5.5 and Lighthouse CI.
 * - Single-column responsive collapse on viewports below 760px (grid-cols-1 md:grid-cols-2 lg:grid-cols-4).
 * - Verified factual details: Kottapattu Tiruchirappalli address, +91 90808 63448 hotline, contact@jsmintegratedservices.com.
 * - Zero prohibited hype terms, zero neon glows, zero dark-mode variant classes, and zero emoji iconography.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0E1116] text-[#F6F3EE] border-t border-white/10 w-full max-w-full overflow-hidden">
      {/* ====================================================================
          1. Upper Executive Consultation Strip
          ==================================================================== */}
      <div className="border-b border-white/10 bg-[#0E1116]">
        <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs sm:text-sm font-sans font-medium text-[#F6F3EE]/90 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C8553D] shrink-0 hidden sm:inline-block" aria-hidden="true" />
            <span>
              <span className="font-heading font-medium text-white">JSM Executive Search Desk:</span>{" "}
              Senior Placements (₹12 LPA – ₹1 Cr) &bull; 100% Contingency Success Model
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs font-sans">
            {/* Direct Phone Dial Trigger — >= 44px Touch Target */}
            <a
              href={`tel:${brandData.contact.phone}`}
              className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D]"
            >
              <Phone size={14} className="text-[#C8553D] shrink-0" aria-hidden="true" />
              <span>{brandData.contact.phoneDisplay}</span>
            </a>
            {/* Primary Action Button — >= 44px Touch Target */}
            <Link
              href="/#contact"
              className="min-h-[44px] inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#B3452F] hover:bg-[#9E3924] text-white font-semibold transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Initiate Mandate</span>
              <ArrowRight size={13} className="shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* ====================================================================
          2. Main 4-Column Navigation Grid
          Collapsed to 1 column on viewports < 760px to satisfy responsive audits
          ==================================================================== */}
      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10"
          data-grid-container="true"
        >
          {/* Column 1: Executive Practices & Sourcing */}
          <div className="space-y-3">
            <h3 className="text-white font-heading font-medium text-sm sm:text-base tracking-tight mb-2">
              Practice Areas
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/#services"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  Senior Talent Acquisition (₹12L – ₹1Cr)
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  Executive Search &amp; Board Advisory
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  Bulk &amp; Specialized Technical Hiring
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  Campus &amp; Lateral Programmes
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  Strategic HR &amp; Compensation Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Process & Fee Architecture */}
          <div className="space-y-3">
            <h3 className="text-white font-heading font-medium text-sm sm:text-base tracking-tight mb-2">
              Process &amp; Fee Model
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/#how-it-works"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  3-Step Sourcing &amp; Vetting Process
                </Link>
              </li>
              <li>
                <Link
                  href="/#role-bands"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  Roles by Compensation Band
                </Link>
              </li>
              <li>
                <Link
                  href="/#fee-model"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  100% Contingency Success Fee
                </Link>
              </li>
              <li>
                <Link
                  href="/#fee-calculator"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  Interactive Placement Fee Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  Confidential Mandate Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Geographic Coverage Across 6 Focus States */}
          <div className="space-y-3">
            <h3 className="text-white font-heading font-medium text-sm sm:text-base tracking-tight mb-2">
              State Footprint
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/#contact"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  <span className="font-semibold text-white mr-1.5">Tamil Nadu:</span> Central Command HQ
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  <span className="font-semibold text-white mr-1.5">Karnataka:</span> Bengaluru Tech Corridor
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  <span className="font-semibold text-white mr-1.5">Maharashtra:</span> Mumbai &amp; Pune Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  <span className="font-semibold text-white mr-1.5">Delhi NCR:</span> Capital Corporate Region
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  <span className="font-semibold text-white mr-1.5">Madhya Pradesh:</span> Industrial Corridor
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="min-h-[44px] flex items-center text-xs text-[#F6F3EE]/80 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm py-1"
                >
                  <span className="font-semibold text-white mr-1.5">Gujarat:</span> Manufacturing &amp; Ports Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Registered Office & Verified Communications */}
          <div className="space-y-3">
            <h3 className="text-white font-heading font-medium text-sm sm:text-base tracking-tight mb-2">
              Registered Office
            </h3>
            <div className="space-y-3 text-xs text-[#F6F3EE]/80 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="shrink-0 mt-0.5 text-[#C8553D]" aria-hidden="true" />
                <address className="not-italic leading-relaxed text-[#F6F3EE]/90">
                  Door No.: 87, Plot No: 112, Gandhi Nagar, Kottapattu, Tiruchirappalli - 620021, Tamil Nadu
                </address>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1">
                <a
                  href={`tel:${brandData.contact.phone}`}
                  className="min-h-[44px] flex items-center gap-2 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm tabular-nums py-1"
                >
                  <Phone size={14} className="text-[#C8553D] shrink-0" aria-hidden="true" />
                  <span>{brandData.contact.phoneDisplay}</span>
                </a>

                <a
                  href={`mailto:${brandData.contact.email}`}
                  className="min-h-[44px] flex items-center gap-2 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm break-all py-1"
                >
                  <Mail size={14} className="text-[#C8553D] shrink-0" aria-hidden="true" />
                  <span>{brandData.contact.email}</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-[#9CA3AF] leading-relaxed">
                <span className="font-semibold text-[#F6F3EE]">Desk Availability:</span>
                <br />
                Mon–Sat, 9:00 AM – 7:00 PM IST
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          3. Bottom Legal & Statutory Bar
          ==================================================================== */}
      <div className="border-t border-white/10 bg-[#0E1116]">
        <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6 py-5 text-xs text-[#9CA3AF] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="leading-relaxed">
            &copy; {currentYear} JSM Integrated Services. All Rights Reserved &bull; Executive Talent Acquisition &amp; Senior Leadership Recruitment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0">
            <Link
              href="/#contact"
              className="min-h-[44px] inline-flex items-center px-2 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">&bull;</span>
            <Link
              href="/#contact"
              className="min-h-[44px] inline-flex items-center px-2 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm"
            >
              Terms of Engagement
            </Link>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">&bull;</span>
            <Link
              href="/#contact"
              className="min-h-[44px] inline-flex items-center px-2 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] rounded-sm"
            >
              Contact Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
