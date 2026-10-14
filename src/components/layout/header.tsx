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
        "fixed top-0 inset-x-0 z-50 transition-all duration-200 ease-out bg-[#030712]/90 backdrop-blur-2xl border-b border-cyan-500/20 text-white",
        scrolled ? "h-16 shadow-[0_4px_30px_rgba(0,0,0,0.85)]" : "h-[74px] sm:h-[80px]"
      )}
    >
      <div className="max-w-[1280px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo & Authority Label */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-h-[44px]"
          aria-label="JSM Integrated Services Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] bg-[#030712] text-white flex items-center justify-center font-bold text-sm tracking-wider overflow-hidden border border-cyan-500/30 shrink-0 shadow-[0_0_12px_rgba(14,165,233,0.15)]">
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
            <span className="text-[11px] text-neutral-300 font-medium tracking-normal hidden sm:flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse" />
              </span>
              <span className="font-mono text-cyan-300 font-bold">24/7 COMMAND</span>
              <span className="text-neutral-500">&bull;</span>
              <span>Ex-Servicemen Led</span>
              <span className="text-neutral-500">&bull;</span>
              <span>AAI Benchmark</span>
              <span className="text-neutral-500">&bull;</span>
              <span className="text-emerald-400 font-semibold">100% Compliant</span>
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
                  <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                    {item.badge}
                  </span>
                )}
                {/* Active cyber cyan underline */}
                <span
                  className={cn(
                    "absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-cyan-400 shadow-[0_0_8px_#38BDF8] transition-transform duration-200 ease-out origin-center",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-cyan-400/60"
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
            className="inline-flex items-center justify-center text-xs font-semibold text-white hover:text-cyan-200 w-[44px] sm:w-auto sm:px-3 h-[44px] rounded-lg border border-white/15 hover:border-cyan-400/50 hover:bg-cyan-950/30 transition-colors tabular-nums min-touch-target"
            aria-label={`Call Operations: ${brandData.contact.phoneDisplay}`}
          >
            <Phone size={14} className="text-cyan-400" />
            <span className="hidden sm:inline sm:ml-1.5">{brandData.contact.phoneDisplay}</span>
          </a>

          {/* Primary CTA - Visible on ALL Viewports, Never Buried */}
          <Link
            href="/get-quote"
            className="btn-border-beam min-touch-target"
          >
            <span className="btn-border-beam-inner !min-h-[44px] !px-3.5 sm:!px-5 !text-xs sm:!text-sm">
              <span>Get Quote</span>
            </span>
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
