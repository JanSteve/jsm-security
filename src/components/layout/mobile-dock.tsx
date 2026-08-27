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
        className="pointer-events-auto w-full max-w-[360px] bg-black/90 text-white backdrop-blur-2xl border border-white/15 rounded-full p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.4)] flex items-center justify-between gap-1"
      >
        {/* Email Button */}
        <a
          href="mailto:jsmintegratedservices@outlook.com"
          className="flex-1 flex items-center justify-center gap-1.5 h-10 px-3 rounded-full hover:bg-white/10 active:bg-white/20 text-white text-xs font-semibold transition-all"
          aria-label="Email JSM Operations"
        >
          <Mail size={14} className="text-[#C5A880]" />
          <span>Email</span>
        </a>

        {/* Highlighted Gold Get Quote Action */}
        <Link
          href="/get-quote"
          className="flex-1 flex items-center justify-center gap-1 h-10 px-3.5 rounded-full bg-[#C5A880] hover:bg-[#b09570] text-black text-xs font-black uppercase tracking-wider shadow-sm active:scale-95 transition-all"
          aria-label="Get Instant Proposal"
        >
          <span>Get Quote</span>
          <ArrowUpRight size={13} className="text-black" />
        </Link>
      </motion.nav>
    </div>
  );
}
