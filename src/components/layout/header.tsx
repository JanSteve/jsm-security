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
        "bg-white/80 backdrop-blur-xl border-b border-black/[0.08]",
        compact ? "py-2 shadow-xs" : "py-3"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Brand Logo & Title - Optically Balanced & Equal Presence */}
        <Link href="/" className="group flex items-center gap-3 z-50 press-scale">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jsm_logo_transparent.png"
              alt="JSM Integrated Services Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm sm:text-base font-bold tracking-tight text-[#1d1d1f] leading-none flex items-center">
              JSM INTEGRATED SERVICES
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-[#86868b] tracking-wider uppercase mt-1 font-mono leading-none">
              ONE PARTNER. EVERY SOLUTION.
            </span>
          </div>
        </Link>

        {/* Clean Apple-Style Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#f5f5f7]/90 p-1 rounded-full border border-black/[0.04]">
          {navigationData.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium transition-all relative flex items-center gap-1.5 press-scale",
                  isActive
                    ? "bg-white text-[#1d1d1f] shadow-xs font-semibold"
                    : "text-[#515154] hover:text-[#1d1d1f] hover:bg-black/[0.03]"
                )}
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className={cn(
                    "text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-full uppercase",
                    isActive ? "bg-black/[0.06] text-[#1d1d1f]" : "bg-black/[0.04] text-[#86868b]"
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
          {/* Apple-Style Operations Phone Badge */}
          <a
            href={`tel:${brandData.contact.phone}`}
            className="hidden xl:inline-flex items-center gap-2 px-3.5 h-10 rounded-full text-xs font-medium text-[#1d1d1f] bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-black/[0.06] transition-all font-mono tabular-nums press-scale min-touch-target"
            aria-label="Emergency 24/7 Operations Desk"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Phone size={13} className="text-[#86868b]" strokeWidth={2} />
            <span>24/7: {brandData.contact.phoneDisplay}</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 h-10 rounded-full text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition-colors press-scale min-touch-target"
            aria-label="WhatsApp Operations Desk"
          >
            <MessageCircle size={14} className="text-emerald-600" strokeWidth={2} />
            <span>WhatsApp</span>
          </a>

          {/* Apple-Style Primary Request Quote Pill Button */}
          <Link
            href="/get-quote"
            className="inline-flex items-center justify-center bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold px-5 h-10 rounded-full shadow-xs press-scale min-touch-target transition-all group"
          >
            <span>Request a quote</span>
            <ArrowRight size={13} className="ml-1.5 text-white group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
          </Link>

          {/* Mobile Menu Trigger */}
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
