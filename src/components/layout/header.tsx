"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationData } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { brandData } from "@/data/brand";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const [compact, setCompact] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 40) {
      setCompact(true);
    } else {
      setCompact(false);
    }

    if (latest > 180 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        "bg-black/95 backdrop-blur-xl border-b border-white/10",
        compact ? "py-2 shadow-2xl" : "py-3"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Brand Logo & Title - Optically Balanced & Equal Presence */}
        <Link href="/" className="group flex items-center gap-3 z-50 press-scale">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black p-0.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden border border-[#C5A880]/40 shadow-[0_0_12px_rgba(197,168,128,0.18)] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jsm_logo_transparent.png"
              alt="JSM Integrated Services Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm sm:text-base font-black tracking-tight text-white leading-none flex items-center">
              JSM INTEGRATED SERVICES
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#C5A880] tracking-wider uppercase mt-1 font-mono leading-none">
              ONE PARTNER. EVERY SOLUTION.
            </span>
          </div>
        </Link>

        {/* Clean Framer-Style Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
          {navigationData.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all relative flex items-center gap-1.5 press-scale",
                  isActive
                    ? "bg-[#C5A880] text-black shadow-sm font-extrabold"
                    : "text-zinc-300 hover:text-white hover:bg-white/10"
                )}
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className={cn(
                    "text-[8px] font-mono font-black px-1.5 py-0.2 rounded-sm uppercase",
                    isActive ? "bg-black text-[#C5A880]" : "bg-white/10 text-zinc-300"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Group: Emergency Dispatch + WhatsApp + Quote CTA */}
        <div className="flex items-center gap-2.5">
          {/* Framer-Style Emergency Phone Badge */}
          <a
            href={`tel:${brandData.contact.phone}`}
            className="hidden xl:inline-flex items-center gap-2 px-3.5 h-10 rounded-full text-xs font-bold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C5A880]/50 transition-all font-mono tabular-nums press-scale min-touch-target"
            aria-label="Emergency 24/7 Operations Desk"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Phone size={13} className="text-[#C5A880]" strokeWidth={2} />
            <span>24/7: {brandData.contact.phoneDisplay}</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 h-10 rounded-full text-xs font-bold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 transition-colors press-scale min-touch-target"
            aria-label="WhatsApp Operations Desk"
          >
            <MessageCircle size={14} className="text-emerald-400" strokeWidth={2} />
            <span>WhatsApp</span>
          </a>

          {/* Framer-Style Primary Request Quote Button */}
          <Link
            href="/get-quote"
            className="inline-flex items-center justify-center bg-[#C5A880] hover:bg-[#b0936b] text-black text-xs font-black px-5 h-10 rounded-full shadow-md press-scale min-touch-target transition-all group"
          >
            <span>Request a quote</span>
            <ArrowRight size={13} className="ml-1.5 text-black group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
          </Link>

          {/* Mobile Menu Trigger */}
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
