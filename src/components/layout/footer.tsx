"use client";

import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandData } from "@/data/brand";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#f5f5f7] text-[#1d1d1f] pt-16 pb-28 md:pb-14 border-t border-black/[0.08]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Top Operational Strip */}
        <div className="bg-white border border-black/[0.08] rounded-[28px] p-6 md:p-8 mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <p className="text-xs font-semibold tracking-wider text-[#0071e3] uppercase">
                24/7 Operations Desk • Tamil Nadu &amp; India
              </p>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] tracking-tight text-balance">
              Ready to unify your security, housekeeping, and staffing operations?
            </h3>
            <p className="text-xs md:text-sm text-[#86868b] text-pretty">
              Schedule a comprehensive on-site risk and requirement assessment today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${brandData.contact.phone}`}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-white bg-[#1d1d1f] hover:bg-black transition-all shadow-sm tabular-nums min-h-[44px]"
            >
              <Phone size={15} /> <span>Call: {brandData.contact.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-[#1d1d1f] bg-[#f5f5f7] hover:bg-black/[0.04] border border-black/[0.08] transition-all min-h-[44px]"
            >
              <MessageCircle size={15} className="text-emerald-600" /> <span>WhatsApp</span>
            </a>
            <Button asChild className="bg-white hover:bg-black/[0.04] text-[#1d1d1f] border border-black/[0.1] font-semibold rounded-full px-5 py-3 h-auto text-xs shadow-sm min-h-[44px]">
              <Link href="/contact">
                <span>Request site assessment</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12 text-sm">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 flex items-center justify-center border border-black/[0.08] shadow-sm overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/jsm_logo_transparent.png"
                  alt="JSM Integrated Services Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-semibold text-[#1d1d1f] tracking-tight text-base leading-none">
                  JSM INTEGRATED SERVICES
                </span>
                <span className="text-[10px] font-semibold text-[#0071e3] tracking-wider uppercase mt-1 leading-none">
                  ONE PARTNER. EVERY SOLUTION.
                </span>
              </div>
            </div>
            <p className="text-xs text-[#0071e3] font-semibold tracking-wide">
              {brandData.tagline}
            </p>
            <p className="text-xs text-[#86868b] leading-relaxed text-pretty">
              Founded under Proprietor &amp; Managing Director <strong>Sweety J</strong>, originating as <strong>JSMMANPOWER</strong> and proven by our landmark inaugural 2024 operations at <strong>Trichy International Airport</strong>.
            </p>
            <div className="pt-2 text-xs text-[#515154] space-y-2">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[#0071e3]" />
                <a href={`tel:${brandData.contact.phone}`} className="hover:text-[#1d1d1f] transition-colors font-semibold tabular-nums">
                  {brandData.contact.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-[#0071e3]" />
                <a href={`mailto:${brandData.contact.email}`} className="hover:text-[#1d1d1f] transition-colors">
                  {brandData.contact.email}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-[#0071e3] mt-0.5 flex-shrink-0" />
                <span>{brandData.contact.address}</span>
              </p>
            </div>

            {/* Official Social Channels */}
            <div className="pt-2">
              <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
                Official channels
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <a
                  href="https://www.linkedin.com/company/jsmintegratedservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-black/[0.04] text-[#515154] hover:text-[#1d1d1f] text-xs font-semibold transition-colors min-h-[32px] inline-flex items-center border border-black/[0.08] shadow-sm"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/jsmintegratedservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-black/[0.04] text-[#515154] hover:text-[#1d1d1f] text-xs font-semibold transition-colors min-h-[32px] inline-flex items-center border border-black/[0.08] shadow-sm"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/jsmintegratedservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-black/[0.04] text-[#515154] hover:text-[#1d1d1f] text-xs font-semibold transition-colors min-h-[32px] inline-flex items-center border border-black/[0.08] shadow-sm"
                >
                  Facebook
                </a>
                <a
                  href="https://x.com/jsmintegrated"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-black/[0.04] text-[#515154] hover:text-[#1d1d1f] text-xs font-semibold transition-colors min-h-[32px] inline-flex items-center border border-black/[0.08] shadow-sm"
                >
                  X
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Core Master Verticals (JSM-01 to JSM-03) */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs tracking-wider text-[#1d1d1f] border-b border-black/[0.08] pb-2 uppercase">
              Core verticals (1–3)
            </h4>
            <ul className="space-y-2.5 text-xs text-[#515154]">
              <li>
                <Link href="/services/private-security" className="hover:text-[#1d1d1f] transition-colors block py-1">
                  <span className="text-[#0071e3] font-medium mr-1">JSM-01</span> Security &amp; protection
                </Link>
              </li>
              <li>
                <Link href="/services/manpower" className="hover:text-[#1d1d1f] transition-colors block py-1">
                  <span className="text-[#0071e3] font-medium mr-1">JSM-02</span> Manpower &amp; workforce
                </Link>
              </li>
              <li>
                <Link href="/services/housekeeping" className="hover:text-[#1d1d1f] transition-colors block py-1">
                  <span className="text-[#0071e3] font-medium mr-1">JSM-03</span> Facility &amp; housekeeping
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#0071e3] hover:underline font-semibold pt-1 inline-block">
                  View master business matrix →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Master Verticals (JSM-04 to JSM-06) */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs tracking-wider text-[#1d1d1f] border-b border-black/[0.08] pb-2 uppercase">
              Core verticals (4–6)
            </h4>
            <ul className="space-y-2.5 text-xs text-[#515154]">
              <li>
                <Link href="/services/tender-procurement-supply" className="hover:text-[#1d1d1f] transition-colors block py-1">
                  <span className="text-[#0071e3] font-medium mr-1">JSM-04</span> Tender &amp; GeM procurement
                </Link>
              </li>
              <li>
                <Link href="/services/scanning-digitalization-it" className="hover:text-[#1d1d1f] transition-colors block py-1">
                  <span className="text-[#0071e3] font-medium mr-1">JSM-05</span> Scanning, OCR &amp; IT
                </Link>
              </li>
              <li>
                <Link href="/services/csc-digital-citizen-services" className="hover:text-[#1d1d1f] transition-colors block py-1">
                  <span className="text-[#0071e3] font-medium mr-1">JSM-06</span> CSC &amp; citizen services
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-[#0071e3] hover:underline font-semibold pt-1 inline-block">
                  Explore target industries →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Careers */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs tracking-wider text-[#1d1d1f] border-b border-black/[0.08] pb-2 uppercase">
              Company &amp; standards
            </h4>
            <ul className="space-y-2.5 text-xs text-[#515154]">
              <li>
                <Link href="/about" className="hover:text-[#1d1d1f] transition-colors block py-1">
                  About JSM &amp; founder story
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#1d1d1f] transition-colors block py-1">
                  Careers &amp; 5-day induction
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#1d1d1f] transition-colors block py-1">
                  Articles &amp; operating insights
                </Link>
              </li>
              <li>
                <Link href="/get-quote" className="text-[#0071e3] hover:underline font-semibold flex items-center gap-1.5 py-1">
                  <span>Request a quote</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#1d1d1f] hover:text-[#0071e3] font-semibold flex items-center gap-1.5 py-1">
                  <span>Contact us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Tamil Nadu Coverage & Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs tracking-wider text-[#1d1d1f] border-b border-black/[0.08] pb-2 uppercase">
              Regional coverage
            </h4>
            <p className="text-[11px] text-[#86868b] leading-relaxed text-pretty">
              Operating across Tiruchirappalli (Trichy), Chennai, Coimbatore, Madurai, Salem, Hosur, Erode, Tirunelveli, and all districts of Tamil Nadu &amp; India.
            </p>
            <div className="pt-2 border-t border-black/[0.08] space-y-2 text-xs">
              <Link href="/legal/privacy" className="block text-[#86868b] hover:text-[#1d1d1f] py-1">
                Privacy policy
              </Link>
              <Link href="/legal/terms" className="block text-[#86868b] hover:text-[#1d1d1f] py-1">
                Terms of service
              </Link>
              <Link href="/legal/cookies" className="block text-[#86868b] hover:text-[#1d1d1f] py-1">
                Cookie policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Anti-Hallucination Disclaimer */}
        <div className="border-t border-black/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#86868b]">
          <div className="space-y-1 text-center md:text-left">
            <p className="tabular-nums">© {new Date().getFullYear()} JSM INTEGRATED SERVICES. All rights reserved. Registered domain: jsmintegratedservices.com</p>
            <p className="text-[11px] text-[#86868b]">
              Operational compliance: Guarding, housekeeping, and staffing deployments adhere strictly to applicable statutory norms, verified identity checks, and client-specific Service Level Agreements.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#86868b] hover:text-[#1d1d1f] transition-colors text-xs font-semibold min-h-[44px] px-3 cursor-pointer"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
