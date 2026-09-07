"use client";

import Link from "next/link";
import { Phone, MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { brandData } from "@/data/brand";
import { motion } from "motion/react";

export function MobileDock() {

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 md:hidden flex justify-center px-4 pointer-events-none pb-[env(safe-area-inset-bottom)]">
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        aria-label="Quick Actions"
        className="pointer-events-auto w-full max-w-[360px] bg-white/90 text-[#1d1d1f] backdrop-blur-2xl border border-black/[0.08] rounded-full p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-between gap-1"
      >
        {/* Call Button */}
        <a
          href={`tel:${brandData.contact.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 h-10 px-2.5 rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] text-[#1d1d1f] text-xs font-semibold transition-all press-scale"
          aria-label="Call JSM Operations"
        >
          <Phone size={13} className="text-[#0071e3]" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 h-10 px-2.5 rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] text-[#1d1d1f] text-xs font-semibold transition-all press-scale"
          aria-label="WhatsApp JSM Operations"
        >
          <MessageCircle size={13} className="text-emerald-600" />
          <span>WhatsApp</span>
        </a>

        {/* Highlighted Apple Blue Get Quote Action */}
        <Link
          href="/get-quote"
          className="flex-1 flex items-center justify-center gap-1 h-10 px-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-xs press-scale transition-all"
          aria-label="Get Instant Proposal"
        >
          <span>Quote</span>
          <ArrowUpRight size={12} className="text-white" />
        </Link>
      </motion.nav>
    </div>
  );
}
