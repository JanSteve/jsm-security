"use client";

import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin, ShieldCheck, CheckCircle2, Award, Clock } from "lucide-react";
import { brandData } from "@/data/brand";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white pt-20 pb-28 md:pb-16 border-t-2 border-white/15 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
        
        {/* Top Grand Action Banner */}
        <div className="bg-neutral-950 border-2 border-white/15 rounded-[40px] p-8 sm:p-12 md:p-14 mb-16 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>24/7 Operations Desk &bull; DGR-Aligned Sovereign Force</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Deploy Disciplined Security &amp; Manpower in Hours.
            </h3>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Ex-Servicemen (ESM) leadership, certified corporate manpower, and hospital-grade facility management across Tamil Nadu with guaranteed 2-hour relief SLAs and 100% legal indemnity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            {/* Direct Phone Call Button */}
            <a
              href="tel:+919080863448"
              className="flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-black text-black bg-white hover:bg-neutral-200 transition-all shadow-xl tabular-nums min-h-[56px] press-scale"
            >
              <Phone size={22} className="text-emerald-600" strokeWidth={2.5} />
              <span>+91 90808 63448</span>
            </a>

            {/* Giant WhatsApp Action Button */}
            <a
              href="https://wa.me/919080863448?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-black text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-xl min-h-[56px] press-scale"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.529 1.831.815 2.796.815 3.182 0 5.768-2.586 5.768-5.768 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.926-.383-1.636-1.026-2.072-1.606-.437-.58-.456-.788-.456-1.049 0-.262.138-.499.278-.638.14-.14.306-.175.408-.175.102 0 .205.002.295.006.095.005.222-.036.347.265.127.306.435 1.06.474 1.139.039.078.065.17.013.272-.051.102-.077.166-.153.255-.077.089-.161.198-.231.266-.078.077-.16.16-.068.318.092.158.409.675.877 1.092.602.536 1.109.702 1.267.78.158.078.251.066.344-.041.093-.107.4-.466.507-.626.107-.159.214-.133.359-.08.145.053.921.434 1.079.513.158.079.263.118.302.185.039.066.039.382-.105.787z" />
              </svg>
              <span>WhatsApp Us</span>
            </a>

            <Link
              href="/get-quote"
              className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold rounded-full px-8 py-4 text-base sm:text-lg shadow-xl min-h-[56px] inline-flex items-center press-scale"
            >
              <span>Get Proposal</span>
            </Link>
          </div>
        </div>

        {/* Giant Identity & High-Impact Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/15">
          
          {/* Col 1: GIANT LOGO + Master Leadership */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-6">
              {/* GIANT FOOTER LOGO */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-3xl flex items-center justify-center overflow-hidden shrink-0 border-2 border-white/30 bg-neutral-950 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/jsm_logo_black.png"
                  alt="JSM Integrated Services Giant Emblem"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <div className="space-y-2">
                <span className="font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-none block">
                  JSM INTEGRATED SERVICES
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400 tracking-wider uppercase block">
                  DGR-ALIGNED &bull; PSARA TN CONTROLLING AUTHORITY &bull; ISO 9001:2015
                </span>
                <p className="text-xs text-neutral-400 font-mono">
                  Originating as JSMMANPOWER &bull; Proven at Trichy International Airport (2024)
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Led by Proprietor and MD <strong className="text-white font-bold">Sweety J</strong>, Head of Operations &amp; Audit <strong className="text-white font-bold">Major AR Devadoss (Army-Veteran)</strong>, and Chief Technical Officer <strong className="text-white font-bold">R Jan Steve Daniel</strong>. Delivering sovereign physical protection and facility operations.
            </p>

            {/* Official Social Channels */}
            <div className="space-y-3">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-neutral-400">
                Official Channels &bull; Verified Headquarters
              </span>
              <div className="flex items-center gap-3">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/jsmintegratedservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-neutral-900 hover:bg-[#0077b5] text-white border border-white/20 flex items-center justify-center transition-all shadow-md"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919080863448"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-neutral-900 hover:bg-[#25d366] text-white border border-white/20 flex items-center justify-center transition-all shadow-md"
                  aria-label="WhatsApp Direct"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.529 1.831.815 2.796.815 3.182 0 5.768-2.586 5.768-5.768 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.926-.383-1.636-1.026-2.072-1.606-.437-.58-.456-.788-.456-1.049 0-.262.138-.499.278-.638.14-.14.306-.175.408-.175.102 0 .205.002.295.006.095.005.222-.036.347.265.127.306.435 1.06.474 1.139.039.078.065.17.013.272-.051.102-.077.166-.153.255-.077.089-.161.198-.231.266-.078.077-.16.16-.068.318.092.158.409.675.877 1.092.602.536 1.109.702 1.267.78.158.078.251.066.344-.041.093-.107.4-.466.507-.626.107-.159.214-.133.359-.08.145.053.921.434 1.079.513.158.079.263.118.302.185.039.066.039.382-.105.787z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/jsmintegratedservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-neutral-900 hover:bg-[#e4405f] text-white border border-white/20 flex items-center justify-center transition-all shadow-md"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* X */}
                <a
                  href="https://x.com/jsmintegrated"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-white/20 flex items-center justify-center transition-all shadow-md"
                  aria-label="X Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: MASSIVE & BOLD CONTACT DATA (Mobile, Email, Address) */}
          <div className="lg:col-span-7 space-y-8 bg-neutral-950 p-8 sm:p-10 rounded-3xl border-2 border-white/15">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block border-b border-white/10 pb-3">
              Direct Command Communications
            </span>

            <div className="space-y-6">
              {/* GIANT & BOLD PHONE NUMBER */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-neutral-400 font-bold block">
                  Primary 24/7 Operations Line &bull; Voice &amp; WhatsApp
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="tel:+919080863448"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white hover:text-emerald-400 transition-colors tabular-nums block"
                  >
                    +91 90808 63448
                  </a>
                  <a
                    href="https://wa.me/919080863448"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg hover:scale-110 transition-all shrink-0"
                    title="Direct WhatsApp Message"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.529 1.831.815 2.796.815 3.182 0 5.768-2.586 5.768-5.768 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.926-.383-1.636-1.026-2.072-1.606-.437-.58-.456-.788-.456-1.049 0-.262.138-.499.278-.638.14-.14.306-.175.408-.175.102 0 .205.002.295.006.095.005.222-.036.347.265.127.306.435 1.06.474 1.139.039.078.065.17.013.272-.051.102-.077.166-.153.255-.077.089-.161.198-.231.266-.078.077-.16.16-.068.318.092.158.409.675.877 1.092.602.536 1.109.702 1.267.78.158.078.251.066.344-.041.093-.107.4-.466.507-.626.107-.159.214-.133.359-.08.145.053.921.434 1.079.513.158.079.263.118.302.185.039.066.039.382-.105.787z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* GIANT & BOLD EMAIL */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <span className="text-xs font-mono uppercase text-neutral-400 font-bold block">
                  Official Secretariat &amp; Executive RFPs
                </span>
                <a
                  href="mailto:contact@jsmintegratedservices.com"
                  className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-emerald-400 hover:text-emerald-300 transition-colors block break-all"
                >
                  contact@jsmintegratedservices.com
                </a>
                <span className="text-xs text-neutral-400 font-mono block">
                  Alternate: jsmintegratedservices@outlook.com
                </span>
              </div>

              {/* GIANT & BOLD ADDRESS */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <span className="text-xs font-mono uppercase text-neutral-400 font-bold block">
                  Central Command Headquarters
                </span>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
                  Plot No: 112, SF No 122, RVS Nagar, Kottapattu Post, Tiruchirappalli (Trichy), Tamil Nadu — 620 021
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-neutral-400">
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-bold">Regional Hub: Chennai (OMR Tech Corridor)</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-bold">Western Hub: Coimbatore</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-bold">Industrial Hub: Hosur</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* SOURCING / DGR & RECRUITMENT COMMAND ACTION HUB */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-14 p-8 sm:p-10 rounded-3xl bg-neutral-950 border-2 border-white/15 shadow-2xl">
          {/* Sourcing / DGR Command Box */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck size={26} strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Sourcing / DGR Operations
                </h4>
                <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Directorate General Resettlement &bull; MoD Empanelled Scheme
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Empanelled Ex-Servicemen security agency framework adhering to Ministry of Defence DGR guidelines, state-wise PSU deployment rosters, and direct GeM portal bidding with 100% legal indemnity.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Link
                href="/security-agencies"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold font-mono transition-colors press-scale"
              >
                Security Agencies Scheme &rarr;
              </Link>
              <Link
                href="/security-agencies#state-status"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold font-mono transition-colors press-scale"
              >
                State-Wise Status &rarr;
              </Link>
              <a
                href="/downloads/JSM-Compliance-Checklist.docx"
                download
                className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono hover:bg-emerald-500 hover:text-white transition-colors press-scale"
              >
                &darr; Compliance Checklist (.docx)
              </a>
            </div>
          </div>

          {/* Recruitment & Enrolment Command Box */}
          <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                <Award size={26} strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Recruitment &amp; Enrolment
                </h4>
                <p className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  Officers &bull; JCOs &bull; Soldiers &bull; Manpower Portal
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Dedicated dual-track defense hiring: Commissioned Officers leadership and JCO / OR field induction alongside our Naukri-style live vacancy aggregator for verified career placements.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Link
                href="/careers"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold font-mono transition-colors press-scale"
              >
                Officers &amp; JCO Tracks &rarr;
              </Link>
              <Link
                href="/work-opportunities"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold font-mono transition-colors press-scale"
              >
                Naukri-Style Job Portal &rarr;
              </Link>
              <a
                href="https://wa.me/919080863448?text=Hello%20JSM%20Recruitment%20Team,%20I%20am%20applying%20for%20a%20position."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/40 text-xs font-bold font-mono hover:bg-[#25d366] hover:text-white transition-colors press-scale"
              >
                WhatsApp Fast Apply &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* 5-Column Navigation Directory on Deep Black */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-14 border-b border-white/15 text-sm">
          {/* Column 1: Three-Tier Services */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider text-white border-b border-white/15 pb-2 uppercase font-mono">
              Three-Tier Model
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors block py-0.5">
                  Tier 1: Security Supervisors (ESM/Pvt)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors block py-0.5">
                  Tier 2: Corporate &amp; IT Staffing
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors block py-0.5">
                  Tier 3: Facility Management
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors block py-0.5">
                  Auxiliary: GeM Tender Bidding
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors block py-0.5">
                  Auxiliary: Scanning &amp; IT (NIC 62099)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: SOURCING / DGR */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider text-emerald-400 border-b border-emerald-500/30 pb-2 uppercase font-mono flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Sourcing / DGR</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
              <li>
                <Link href="/security-agencies" className="hover:text-emerald-400 transition-colors block py-0.5">
                  Security Agencies Scheme (DGR)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors block py-0.5">
                  GeM Tender Bidding &amp; Sourcing
                </Link>
              </li>
              <li>
                <Link href="/security-agencies#schemes" className="hover:text-emerald-400 transition-colors block py-0.5">
                  Defense Resettlement Schemes
                </Link>
              </li>
              <li>
                <Link href="/security-agencies#state-status" className="hover:text-emerald-400 transition-colors block py-0.5">
                  State-Wise Empanelment Status
                </Link>
              </li>
              <li>
                <Link href="/services/private-security" className="hover:text-emerald-400 transition-colors block py-0.5">
                  Ex-Servicemen Security Platoons
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-emerald-400 transition-colors block py-0.5">
                  DGR Intelligence Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: RECRUITMENT */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider text-blue-400 border-b border-blue-500/30 pb-2 uppercase font-mono flex items-center gap-1.5">
              <Award size={16} className="text-blue-400" />
              <span>Recruitment</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
              <li>
                <Link href="/careers#officers" className="hover:text-blue-400 transition-colors block py-0.5">
                  Commissioned Officers Track
                </Link>
              </li>
              <li>
                <Link href="/careers#jco" className="hover:text-blue-400 transition-colors block py-0.5">
                  JCO &amp; Soldier Induction
                </Link>
              </li>
              <li>
                <Link href="/work-opportunities" className="hover:text-blue-400 transition-colors block py-0.5">
                  Naukri-Style Job Aggregator
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-blue-400 transition-colors block py-0.5">
                  Ex-Servicemen (ESM) Field Intake
                </Link>
              </li>
              <li>
                <Link href="/services/manpower" className="hover:text-blue-400 transition-colors block py-0.5">
                  Corporate &amp; Industrial Staffing
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/919080863448?text=Hello%20JSM%20Recruitment%20Team,%20I%20am%20applying%20for%20a%20position."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25d366] transition-colors block py-0.5 font-bold text-emerald-400"
                >
                  WhatsApp Recruitment Hotline &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Forms (.docx) */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider text-white border-b border-white/15 pb-2 uppercase font-mono">
              Download Forms (.docx)
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
              <li>
                <a href="/downloads/Form-A-Officer-Recruitment.docx" download className="hover:text-emerald-400 transition-colors block py-0.5">
                  &darr; Form-A: Officer Recruitment
                </a>
              </li>
              <li>
                <a href="/downloads/Form-B-JCO-Application.docx" download className="hover:text-emerald-400 transition-colors block py-0.5">
                  &darr; Form-B: JCO Application
                </a>
              </li>
              <li>
                <a href="/downloads/Form-ESM-1-Ex-Servicemen.docx" download className="hover:text-emerald-400 transition-colors block py-0.5">
                  &darr; Form-ESM-1: Ex-Servicemen
                </a>
              </li>
              <li>
                <a href="/downloads/Form-ESM-2-Jawan.docx" download className="hover:text-emerald-400 transition-colors block py-0.5">
                  &darr; Form-ESM-2: Jawan Induction
                </a>
              </li>
              <li>
                <a href="/downloads/Form-SL-1-Skilled-Labor.docx" download className="hover:text-emerald-400 transition-colors block py-0.5">
                  &darr; Form-SL-1: Skilled Labor
                </a>
              </li>
              <li>
                <a href="/downloads/JSM-Compliance-Checklist.docx" download className="hover:text-emerald-400 transition-colors block py-0.5">
                  &darr; PSARA Compliance Checklist
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: District Hubs */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider text-white border-b border-white/15 pb-2 uppercase font-mono">
              District Hubs
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
              <li><span className="text-white font-bold">Trichy:</span> Central Command HQ</li>
              <li><span className="text-white font-bold">Chennai:</span> OMR IT Corridor Hub</li>
              <li><span className="text-white font-bold">Coimbatore:</span> Industrial Outpost</li>
              <li><span className="text-white font-bold">Hosur:</span> Automotive &amp; Tech SEZ</li>
              <li><span className="text-white font-bold">Salem &amp; Erode:</span> Manufacturing Grid</li>
              <li><span className="text-white font-bold">Madurai:</span> Healthcare &amp; Logistics</li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal, Scroll-To-Top & Trademark */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
          <div>
            &copy; {new Date().getFullYear()} JSM Integrated Services. All rights reserved.
            <span className="block text-[11px] text-neutral-500 mt-1">
              PSARA Act (2005) Compliant &bull; Home Dept Government of Tamil Nadu &bull; ISO 9001:2015
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
              aria-label="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
