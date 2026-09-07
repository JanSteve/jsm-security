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
    <footer className="bg-black text-zinc-300 pt-16 pb-28 md:pb-12 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Top Operational Strip */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl backdrop-blur-md">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs font-mono font-bold tracking-wider text-[#C5A880] uppercase">
                [24/7 Operations Desk • Tamil Nadu &amp; India]
              </p>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight text-balance">
              Ready to unify your security, housekeeping, and staffing operations?
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 text-pretty">
              Schedule a comprehensive on-site risk and requirement assessment today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${brandData.contact.phone}`}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-black bg-[#C5A880] hover:bg-[#b09570] transition-all shadow-md font-mono tabular-nums min-h-[44px] press-scale"
            >
              <Phone size={15} /> <span>Call: {brandData.contact.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 transition-all shadow-md min-h-[44px] press-scale"
            >
              <MessageCircle size={15} /> <span>WhatsApp</span>
            </a>
            <Button asChild className="bg-white hover:bg-zinc-200 text-black font-bold rounded-full px-5 py-3 h-auto text-xs shadow-md min-h-[44px] press-scale">
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
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black p-0.5 flex items-center justify-center border border-[#C5A880]/40 shadow-[0_0_12px_rgba(197,168,128,0.18)] overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/jsm_logo_transparent.png"
                  alt="JSM Integrated Services Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-black text-white tracking-tight text-base leading-none">
                  JSM INTEGRATED SERVICES
                </span>
                <span className="text-[9px] font-bold text-[#C5A880] tracking-wider uppercase mt-1 font-mono leading-none">
                  ONE PARTNER. EVERY SOLUTION.
                </span>
              </div>
            </div>
            <p className="text-xs text-[#C5A880] font-bold tracking-wide">
              {brandData.tagline}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed text-pretty">
              Founded under Proprietor &amp; Managing Director <strong>Sweety J</strong>, originating as <strong>JSMMANPOWER</strong> and proven by our landmark inaugural 2024 operations at <strong>Trichy International Airport</strong>.
            </p>
            <div className="pt-2 text-xs text-zinc-400 space-y-2">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[#C5A880]" />
                <a href={`tel:${brandData.contact.phone}`} className="hover:text-white transition-colors font-mono font-bold tabular-nums">
                  {brandData.contact.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-[#C5A880]" />
                <a href={`mailto:${brandData.contact.email}`} className="hover:text-white transition-colors">
                  {brandData.contact.email}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-[#C5A880] mt-0.5 flex-shrink-0" />
                <span>{brandData.contact.address}</span>
              </p>
            </div>

            {/* Official Social Channels */}
            <div className="pt-2">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                Official channels
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <a
                  href="https://www.linkedin.com/company/jsmintegratedservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-[#0077b5] hover:text-white text-zinc-400 text-xs font-mono font-bold transition-colors min-h-[36px] inline-flex items-center press-scale border border-zinc-800"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/jsmintegratedservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-[#e4405f] hover:text-white text-zinc-400 text-xs font-mono font-bold transition-colors min-h-[36px] inline-flex items-center press-scale border border-zinc-800"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/jsmintegratedservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-[#1877f2] hover:text-white text-zinc-400 text-xs font-mono font-bold transition-colors min-h-[36px] inline-flex items-center press-scale border border-zinc-800"
                >
                  Facebook
                </a>
                <a
                  href="https://x.com/jsmintegrated"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 hover:text-white text-zinc-400 text-xs font-mono font-bold transition-colors min-h-[36px] inline-flex items-center press-scale border border-zinc-800"
                >
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Core Master Verticals (JSM-01 to JSM-03) */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider text-white border-b border-zinc-800 pb-2">
              Core verticals (1–3)
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/services/private-security" className="hover:text-white transition-colors block py-1">
                  <span className="text-[#C5A880] font-mono text-[10px] mr-1">JSM-01</span> Security &amp; protection
                </Link>
              </li>
              <li>
                <Link href="/services/manpower" className="hover:text-white transition-colors block py-1">
                  <span className="text-[#C5A880] font-mono text-[10px] mr-1">JSM-02</span> Manpower &amp; workforce
                </Link>
              </li>
              <li>
                <Link href="/services/housekeeping" className="hover:text-white transition-colors block py-1">
                  <span className="text-[#C5A880] font-mono text-[10px] mr-1">JSM-03</span> Facility &amp; housekeeping
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#C5A880] hover:underline font-bold pt-1 inline-block">
                  View master business matrix →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Master Verticals (JSM-04 to JSM-06) */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider text-white border-b border-zinc-800 pb-2">
              Core verticals (4–6)
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/services/tender-procurement-supply" className="hover:text-white transition-colors block py-1">
                  <span className="text-[#C5A880] font-mono text-[10px] mr-1">JSM-04</span> Tender &amp; GeM procurement
                </Link>
              </li>
              <li>
                <Link href="/services/scanning-digitalization-it" className="hover:text-white transition-colors block py-1">
                  <span className="text-[#C5A880] font-mono text-[10px] mr-1">JSM-05</span> Scanning, OCR &amp; IT
                </Link>
              </li>
              <li>
                <Link href="/services/csc-digital-citizen-services" className="hover:text-white transition-colors block py-1">
                  <span className="text-[#C5A880] font-mono text-[10px] mr-1">JSM-06</span> CSC &amp; citizen services
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-[#C5A880] hover:underline font-bold pt-1 inline-block">
                  Explore target industries →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Careers */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider text-white border-b border-zinc-800 pb-2">
              Company &amp; standards
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/about" className="hover:text-white transition-colors block py-1">
                  About JSM &amp; founder story
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors block py-1">
                  Careers &amp; 5-day induction
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors block py-1">
                  Articles &amp; operating insights
                </Link>
              </li>
              <li>
                <Link href="/get-quote" className="text-[#C5A880] hover:underline font-bold flex items-center gap-1.5 py-1">
                  <span>Request a quote</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-[#C5A880] font-bold flex items-center gap-1.5 py-1">
                  <span>Contact us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Tamil Nadu Coverage & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider text-white border-b border-zinc-800 pb-2">
              Regional coverage
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed text-pretty">
              Operating across Tiruchirappalli (Trichy), Chennai, Coimbatore, Madurai, Salem, Hosur, Erode, Tirunelveli, and all districts of Tamil Nadu &amp; India.
            </p>
            <div className="pt-2 border-t border-zinc-800 space-y-2 text-xs">
              <Link href="/legal/privacy" className="block text-zinc-500 hover:text-zinc-300 py-1">
                Privacy policy
              </Link>
              <Link href="/legal/terms" className="block text-zinc-500 hover:text-zinc-300 py-1">
                Terms of service
              </Link>
              <Link href="/legal/cookies" className="block text-zinc-500 hover:text-zinc-300 py-1">
                Cookie policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Anti-Hallucination Disclaimer */}
        <div className="border-t border-zinc-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="space-y-1 text-center md:text-left">
            <p className="tabular-nums">© {new Date().getFullYear()} JSM INTEGRATED SERVICES. All rights reserved. Registered domain: jsmintegratedservices.com</p>
            <p className="text-[11px] text-zinc-600">
              Operational compliance: Guarding, housekeeping, and staffing deployments adhere strictly to applicable statutory norms, verified identity checks, and client-specific Service Level Agreements.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-semibold min-h-[44px] px-3 press-scale"
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
