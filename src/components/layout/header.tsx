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
        "bg-white/95 backdrop-blur-xl border-b border-zinc-200/80",
        compact ? "py-2.5 shadow-sm" : "py-3.5"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5 z-50">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black text-white flex items-center justify-center font-black text-sm sm:text-base shadow-sm group-hover:scale-105 transition-transform">
            JSM
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black tracking-tight text-black leading-none flex items-center">
              JSM INTEGRATED SERVICES
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-zinc-500 tracking-wider uppercase mt-0.5 font-mono">
              ONE PARTNER. EVERY SOLUTION.
            </span>
          </div>
        </Link>

        {/* Clean Apple-Style Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/80 p-1 rounded-full border border-zinc-200/70">
          {navigationData.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all relative flex items-center gap-1.5",
                  isActive
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:text-black hover:bg-white/60"
                )}
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className={cn(
                    "text-[8px] font-mono font-black px-1.5 py-0.2 rounded-sm uppercase",
                    isActive ? "bg-[#C5A880] text-black" : "bg-zinc-200 text-zinc-700"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Group */}
        <div className="flex items-center gap-2">
          {/* Direct Call Button */}
          <a
            href={`tel:${brandData.contact.phone}`}
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-xs font-bold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 transition-colors shadow-2xs font-mono"
            aria-label="Call Operations Desk"
          >
            <Phone size={13} className="text-[#C5A880]" />
            <span>{brandData.contact.phoneDisplay}</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-xs font-bold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors shadow-2xs"
            aria-label="WhatsApp Operations Desk"
          >
            <MessageCircle size={14} className="text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/get-quote"
            className="inline-flex items-center justify-center bg-black hover:bg-zinc-800 text-white text-xs font-extrabold tracking-wider px-5 h-9 rounded-full border-b border-[#C5A880] shadow-xs active:scale-95 transition-all uppercase group"
          >
            <span>Get Quote</span>
            <ArrowRight size={12} className="ml-1 text-[#C5A880] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Mobile Menu Trigger */}
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
