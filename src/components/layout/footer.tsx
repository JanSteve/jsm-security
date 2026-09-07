"use client";

import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { brandData } from "@/data/brand";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#f5f5f7] text-[#1d1d1f] pt-16 pb-28 md:pb-14 border-t border-black/[0.08]">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Top Operational Action Banner */}
        <div className="bg-white border border-black/[0.08] rounded-[32px] p-6 md:p-10 mb-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-bold tracking-wider text-[#0071e3] uppercase font-mono">
                24/7 Operations Desk • DGR-Aligned • Tamil Nadu &amp; South India
              </p>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#1d1d1f] tracking-tight text-balance">
              Deploy disciplined security forces &amp; certified manpower in hours.
            </h3>
            <p className="text-sm md:text-base text-[#86868b] text-pretty">
              Ex-Servicemen (ESM) supervisors, corporate staffing, and mechanized facility management with 100% statutory compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Direct Call with Phone */}
            <a
              href="tel:+919080863448"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-[#1d1d1f] hover:bg-black transition-all shadow-md tabular-nums min-h-[48px]"
            >
              <Phone size={16} />
              <span>+91 90808 63448</span>
            </a>

            {/* Large Prominent WhatsApp Button */}
            <a
              href="https://wa.me/919080863448?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md min-h-[48px]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.529 1.831.815 2.796.815 3.182 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.926-.383-1.636-1.026-2.072-1.606-.437-.58-.456-.788-.456-1.049 0-.262.138-.499.278-.638.14-.14.306-.175.408-.175.102 0 .205.002.295.006.095.005.222-.036.347.265.127.306.435 1.06.474 1.139.039.078.065.17.013.272-.051.102-.077.166-.153.255-.077.089-.161.198-.231.266-.078.077-.16.16-.068.318.092.158.409.675.877 1.092.602.536 1.109.702 1.267.78.158.078.251.066.344-.041.093-.107.4-.466.507-.626.107-.159.214-.133.359-.08.145.053.921.434 1.079.513.158.079.263.118.302.185.039.066.039.382-.105.787z" />
              </svg>
              <span>WhatsApp Us</span>
            </a>

            <Link
              href="/get-quote"
              className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold rounded-full px-6 py-3.5 text-sm shadow-md min-h-[48px] inline-flex items-center"
            >
              <span>Request Quote</span>
            </Link>
          </div>
        </div>

        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14 text-sm">
          {/* Col 1: Brand & Identity + Large Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border border-black/10 bg-black shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/jsm_logo_black.png"
                  alt="JSM Integrated Services Logo"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-[#1d1d1f] tracking-tight text-lg leading-tight">
                  JSM INTEGRATED SERVICES
                </span>
                <span className="text-[10px] font-bold text-[#0071e3] tracking-wider uppercase mt-1 font-mono leading-none">
                  PSARA LICENSED • ISO 9001:2015 • DGR-ALIGNED
                </span>
              </div>
            </div>

            <p className="text-sm text-[#515154] leading-relaxed text-pretty max-w-lg">
              Led by Proprietor and MD <strong>Sweety J</strong>, Head of Operations &amp; Audit <strong>Major AR Devadoss (Army-Veteran)</strong>, and Chief Technical Officer <strong>R Jan Steve Daniel</strong>. Inaugural operations proven at <strong>Trichy International Airport (2024)</strong>.
            </p>

            {/* Significantly Larger Contact Details */}
            <div className="pt-2 space-y-3">
              {/* Phone + Large WhatsApp Icon */}
              <div className="flex items-center gap-3">
                <a
                  href="tel:+919080863448"
                  className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1d1d1f] hover:text-[#0071e3] transition-colors font-mono tabular-nums"
                >
                  <Phone size={18} className="text-[#0071e3]" />
                  <span>+91 90808 63448</span>
                </a>
                <a
                  href="https://wa.me/919080863448"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-sm hover:scale-110 transition-all"
                  aria-label="Direct WhatsApp Message"
                  title="Click to chat on WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.529 1.831.815 2.796.815 3.182 0 5.768-2.586 5.768-5.768 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.926-.383-1.636-1.026-2.072-1.606-.437-.58-.456-.788-.456-1.049 0-.262.138-.499.278-.638.14-.14.306-.175.408-.175.102 0 .205.002.295.006.095.005.222-.036.347.265.127.306.435 1.06.474 1.139.039.078.065.17.013.272-.051.102-.077.166-.153.255-.077.089-.161.198-.231.266-.078.077-.16.16-.068.318.092.158.409.675.877 1.092.602.536 1.109.702 1.267.78.158.078.251.066.344-.041.093-.107.4-.466.507-.626.107-.159.214-.133.359-.08.145.053.921.434 1.079.513.158.079.263.118.302.185.039.066.039.382-.105.787z" />
                  </svg>
                </a>
              </div>

              {/* Email */}
              <p className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-[#1d1d1f]">
                <Mail size={18} className="text-[#0071e3] shrink-0" />
                <a href="mailto:contact@jsmintegratedservices.com" className="hover:text-[#0071e3] transition-colors">
                  contact@jsmintegratedservices.com
                </a>
              </p>

              {/* Address */}
              <p className="flex items-start gap-2.5 text-xs sm:text-sm text-[#515154] leading-relaxed max-w-md">
                <MapPin size={18} className="text-[#0071e3] mt-0.5 shrink-0" />
                <span>Plot No: 112, SF No 122, RVS Nagar, Kottapattu Post, Tiruchirappalli (Trichy), Tamil Nadu - 620 021</span>
              </p>
            </div>

            {/* Official Social Channels with Real Icons */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#86868b] uppercase tracking-wider block mb-2 font-mono">
                Official Channels
              </span>
              <div className="flex items-center gap-2">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/jsmintegratedservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white hover:bg-[#0077b5] text-[#1d1d1f] hover:text-white border border-black/[0.08] flex items-center justify-center transition-all shadow-xs"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919080863448"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white hover:bg-[#25d366] text-[#1d1d1f] hover:text-white border border-black/[0.08] flex items-center justify-center transition-all shadow-xs"
                  aria-label="WhatsApp Direct"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.529 1.831.815 2.796.815 3.182 0 5.768-2.586 5.768-5.768 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.926-.383-1.636-1.026-2.072-1.606-.437-.58-.456-.788-.456-1.049 0-.262.138-.499.278-.638.14-.14.306-.175.408-.175.102 0 .205.002.295.006.095.005.222-.036.347.265.127.306.435 1.06.474 1.139.039.078.065.17.013.272-.051.102-.077.166-.153.255-.077.089-.161.198-.231.266-.078.077-.16.16-.068.318.092.158.409.675.877 1.092.602.536 1.109.702 1.267.78.158.078.251.066.344-.041.093-.107.4-.466.507-.626.107-.159.214-.133.359-.08.145.053.921.434 1.079.513.158.079.263.118.302.185.039.066.039.382-.105.787z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/jsmintegratedservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white hover:bg-[#e4405f] text-[#1d1d1f] hover:text-white border border-black/[0.08] flex items-center justify-center transition-all shadow-xs"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* X */}
                <a
                  href="https://x.com/jsmintegrated"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white hover:bg-black text-[#1d1d1f] hover:text-white border border-black/[0.08] flex items-center justify-center transition-all shadow-xs"
                  aria-label="X Twitter Profile"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Three-Tier Service Model */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider text-[#1d1d1f] border-b border-black/[0.08] pb-2 uppercase font-mono">
              Three-Tier Services
            </h4>
            <ul className="space-y-2 text-xs text-[#515154]">
              <li>
                <Link href="/services" className="hover:text-[#0071e3] transition-colors block py-1 font-semibold text-[#1d1d1f]">
                  Tier 1: Security Supervisors
                </Link>
                <span className="text-[11px] text-[#86868b] block">Ex-Servicemen (ESM) &amp; Private Supervisors</span>
              </li>
              <li className="pt-1">
                <Link href="/services" className="hover:text-[#0071e3] transition-colors block py-1 font-semibold text-[#1d1d1f]">
                  Tier 2: Corporate &amp; Staffing
                </Link>
                <span className="text-[11px] text-[#86868b] block">Hospitality, Technical Crew &amp; Industrial Labor</span>
              </li>
              <li className="pt-1">
                <Link href="/services" className="hover:text-[#0071e3] transition-colors block py-1 font-semibold text-[#1d1d1f]">
                  Tier 3: Facility Management
                </Link>
                <span className="text-[11px] text-[#86868b] block">Mechanized Scrubbing &amp; Hospital Sanitation</span>
              </li>
              <li className="pt-2">
                <Link href="/services" className="text-[#0071e3] hover:underline font-bold inline-block">
                  View Full Services Matrix →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: DGR Alignment & Recruitment */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider text-[#1d1d1f] border-b border-black/[0.08] pb-2 uppercase font-mono">
              DGR &amp; Recruitment
            </h4>
            <ul className="space-y-2 text-xs text-[#515154]">
              <li>
                <Link href="/security-agencies" className="hover:text-[#0071e3] transition-colors block py-1 font-medium">
                  Security Agencies (DGR Guidelines)
                </Link>
              </li>
              <li>
                <Link href="/work-opportunities" className="hover:text-[#0071e3] transition-colors block py-1 font-medium">
                  Work Opportunities (Job Portal)
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#0071e3] transition-colors block py-1 font-medium">
                  Careers: Officers &amp; JCO / OR Tracks
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-[#0071e3] transition-colors block py-1 font-medium">
                  Newsletter (3 Segmented Streams)
                </Link>
              </li>
              <li>
                <Link href="/whats-new" className="hover:text-[#0071e3] transition-colors block py-1 font-medium">
                  What&apos;s New &amp; Live Bulletins
                </Link>
              </li>
              <li>
                <Link href="/about#what-is-dgr" className="text-[#0071e3] hover:underline font-bold inline-block pt-1">
                  What is DGR? →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Regional Hubs & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider text-[#1d1d1f] border-b border-black/[0.08] pb-2 uppercase font-mono">
              Regional Hubs &amp; Legal
            </h4>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Tiruchirappalli (TRZ Airport), Chennai (MAA Airport &amp; OMR), Coimbatore (CJB), Hosur, Madurai, Salem, Erode, and Tirunelveli.
            </p>
            <div className="pt-2 border-t border-black/[0.08] space-y-1.5 text-xs">
              <Link href="/legal/privacy" className="block text-[#86868b] hover:text-[#1d1d1f] py-0.5">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="block text-[#86868b] hover:text-[#1d1d1f] py-0.5">
                Terms of Service
              </Link>
              <Link href="/legal/cookies" className="block text-[#86868b] hover:text-[#1d1d1f] py-0.5">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#86868b]">
          <div className="space-y-1 text-center md:text-left">
            <p className="tabular-nums font-mono">
              © {new Date().getFullYear()} JSM INTEGRATED SERVICES. All rights reserved. Registered domain: jsmintegratedservices.com
            </p>
            <p className="text-[11px] text-[#86868b]">
              Statutory Compliance: Ex-Servicemen supervisory deployments, mechanized facility operations, and staffing solutions strictly follow PSARA 2005, ESI/EPF acts, and verified state wage gazettes.
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
