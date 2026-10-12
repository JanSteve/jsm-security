"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationData } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { brandData } from "@/data/brand";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-200 ease-out bg-black/90 backdrop-blur-xl border-b border-white/10 text-white",
        scrolled ? "h-16 shadow-[0_4px_30px_rgba(0,0,0,0.8)]" : "h-[74px] sm:h-[80px]"
      )}
    >
      <div className="max-w-[1280px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo & Authority Label */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-h-[44px]"
          aria-label="JSM Integrated Services Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] bg-[#0F2A47] text-white flex items-center justify-center font-bold text-sm tracking-wider overflow-hidden border border-white/20 shrink-0">
            <Image
              src="/images/jsm_logo_black.png"
              alt="JSM Crest"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center max-w-[140px] sm:max-w-none">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-white leading-tight truncate">
              JSM Integrated Services
            </span>
            <span className="text-[11px] text-neutral-400 font-medium tracking-normal hidden sm:flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
              Ex-Servicemen Led &bull; Airports Authority of India Client &bull; 100% Compliant
            </span>
          </div>
        </Link>

        {/* Primary Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navigationData.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium transition-colors min-h-[44px] flex items-center group",
                  isActive
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 border border-white/20 text-neutral-200">
                    {item.badge}
                  </span>
                )}
                {/* Titanium white active underline */}
                <span
                  className={cn(
                    "absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-white transition-transform duration-200 ease-out origin-center",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-white/60"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions Cluster: Phone + Get Quote + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Direct Phone Link - Accessible on mobile and desktop */}
          <a
            href={`tel:${brandData.contact.phone}`}
            className="inline-flex items-center justify-center text-xs font-semibold text-white hover:text-neutral-200 w-[44px] sm:w-auto sm:px-3 h-[44px] rounded-lg border border-white/15 hover:border-white/40 hover:bg-white/5 transition-colors tabular-nums min-touch-target"
            aria-label={`Call Operations: ${brandData.contact.phoneDisplay}`}
          >
            <Phone size={14} className="text-white" />
            <span className="hidden sm:inline sm:ml-1.5">{brandData.contact.phoneDisplay}</span>
          </a>

          {/* Primary CTA - Visible on ALL Viewports, Never Buried */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg text-xs sm:text-sm font-bold text-black bg-white hover:bg-neutral-200 px-3.5 sm:px-5 h-[44px] transition-colors shadow-xl press-scale min-touch-target"
          >
            <span>Get Quote</span>
          </Link>

          {/* Mobile Hamburger Drawer Trigger */}
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
