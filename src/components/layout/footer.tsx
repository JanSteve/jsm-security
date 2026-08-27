"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUp, Mail, Phone, MapPin, MessageCircle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandData } from "@/data/brand";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-900 text-zinc-300 pt-16 pb-28 md:pb-12 border-t border-zinc-800">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Operational Strip */}
        <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-3xl p-6 md:p-8 mb-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#C5A880]">
                24/7 Operations Desk • Tamil Nadu & India
              </p>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Ready to unify your security, housekeeping, and staffing operations?
            </h3>
            <p className="text-xs md:text-sm text-zinc-400">
              Schedule a comprehensive on-site risk and requirement assessment today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:jsmintegratedservices@outlook.com?subject=Site%20Assessment%20Request"
              className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md"
            >
              <Mail size={16} /> Email Us
            </a>
            <Button asChild className="bg-white hover:bg-zinc-100 text-black font-bold rounded-full px-5 py-3 h-auto text-xs shadow-md">
              <Link href="/contact">
                Request Site Assessment
              </Link>
            </Button>
          </div>
        </div>

        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14 text-sm">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C5A880] text-black flex items-center justify-center font-black text-sm">
                JSM
              </div>
              <span className="font-black text-white tracking-tight text-base">
                JSM INTEGRATED SERVICES
              </span>
            </div>
            <p className="text-xs text-[#C5A880] font-bold tracking-wide uppercase">
              {brandData.tagline}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Founded under Managing Director <strong>Sweety R</strong>, originating as <strong>JSMMANPOWER</strong> and proven by our landmark inaugural 2024 operations at <strong>Trichy International Airport</strong>.
            </p>
            <div className="pt-2 text-xs text-zinc-400 space-y-2">
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
          </div>

          {/* Col 2: Core Services (Phase 1) */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Core Operations (Phase 1)
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/services/private-security" className="hover:text-white transition-colors">
                  Private Security Guarding
                </Link>
              </li>
              <li>
                <Link href="/services/housekeeping" className="hover:text-white transition-colors">
                  Housekeeping & Facility Upkeep
                </Link>
              </li>
              <li>
                <Link href="/services/manpower" className="hover:text-white transition-colors">
                  Manpower & Temporary Staffing
                </Link>
              </li>
              <li>
                <Link href="/services/cash-in-transit" className="hover:text-white transition-colors">
                  Cash-in-Transit Logistics
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#C5A880] hover:underline font-bold pt-1 inline-block">
                  View Service Ecosystem →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Expansion Verticals (Phase 2) */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Integrated Support (Phase 2)
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/services/event-support" className="hover:text-white transition-colors">
                  Event & Wedding Coordination
                </Link>
              </li>
              <li>
                <Link href="/services/real-estate-support" className="hover:text-white transition-colors">
                  Real Estate & Auction Support
                </Link>
              </li>
              <li>
                <Link href="/services/software-solutions" className="hover:text-white transition-colors">
                  Software & Visitor Portals
                </Link>
              </li>
              <li>
                <Link href="/services/creative-media" className="hover:text-white transition-colors">
                  Creative Media Documentation
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-[#C5A880] hover:underline font-bold pt-1 inline-block">
                  Explore 12 Target Industries →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Careers */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Company & Standards
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About JSM & Founder Story
                </Link>
              </li>
              <li>
                <Link href="/trust-center" className="hover:text-white transition-colors">
                  Trust Center & Compliance
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers & 5-Day Induction
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition-colors">
                  Case Studies & Trichy Milestone
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Articles & Operating Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Tamil Nadu Coverage & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Regional Coverage
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Operating across Tiruchirappalli (Trichy), Chennai, Coimbatore, Madurai, Salem, Hosur, Erode, Tirunelveli, and all districts of Tamil Nadu & India.
            </p>
            <div className="pt-2 border-t border-zinc-800 space-y-2 text-xs">
              <Link href="/legal/privacy" className="block text-zinc-500 hover:text-zinc-300">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="block text-zinc-500 hover:text-zinc-300">
                Terms of Service
              </Link>
              <Link href="/legal/cookies" className="block text-zinc-500 hover:text-zinc-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Anti-Hallucination Disclaimer */}
        <div className="border-t border-zinc-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} JSM INTEGRATED SERVICES. All rights reserved. Registered domain: jsmintegratedservices.in</p>
            <p className="text-[11px] text-zinc-600">
              Operational compliance: Guarding, housekeeping, and staffing deployments adhere strictly to applicable statutory norms, verified identity checks, and client-specific Service Level Agreements.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-semibold"
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
