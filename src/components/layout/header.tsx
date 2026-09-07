"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Home, 
  Info, 
  Layers, 
  Briefcase, 
  Search, 
  Mail, 
  Bell, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationData } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { brandData } from "@/data/brand";
import { LanguageSwitcher } from "./language-switcher";

// Maxed-out icon mapper for navigation
const navIconMap: Record<string, React.ElementType> = {
  "/": Home,
  "/about": Info,
  "/services": Layers,
  "/security-agencies": ShieldCheck,
  "/careers": Briefcase,
  "/work-opportunities": Search,
  "/newsletter": Mail,
  "/whats-new": Bell,
  "/contact": PhoneCall,
};

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [compact, setCompact] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      setCompact(true);
    } else {
      setCompact(false);
    }
  });

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        "bg-black text-white border-b border-white/15 shadow-2xl backdrop-blur-2xl"
      )}
    >
      {/* TIER 1: Top Operational Command Bar */}
      <div className={cn(
        "border-b border-white/10 transition-all duration-300 bg-neutral-950/80",
        compact ? "hidden" : "block py-1.5 px-4 sm:px-8"
      )}>
        <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs">
          {/* Left: Telemetry & DGR Credential Strip */}
          <div className="flex items-center gap-3 font-mono">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE OPERATIONS ACTIVE</span>
            </span>
            <span className="hidden md:inline-block text-white/40">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-neutral-300">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>PSARA TN Licensed &bull; DGR Aligned &bull; 2-Hour Relief SLA</span>
            </span>
          </div>

          {/* Right: Language Switcher + Emergency Hotline */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Multi-Language Switcher */}
            <LanguageSwitcher />

            {/* Quick WhatsApp Link in Top Bar */}
            <a
              href="https://wa.me/919080863448?text=Hello%20JSM%20Integrated%20Services,%20I%20need%20urgent%20security%20or%20manpower%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.529 1.831.815 2.796.815 3.182 0 5.768-2.586 5.768-5.768 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.926-.383-1.636-1.026-2.072-1.606-.437-.58-.456-.788-.456-1.049 0-.262.138-.499.278-.638.14-.14.306-.175.408-.175.102 0 .205.002.295.006.095.005.222-.036.347.265.127.306.435 1.06.474 1.139.039.078.065.17.013.272-.051.102-.077.166-.153.255-.077.089-.161.198-.231.266-.078.077-.16.16-.068.318.092.158.409.675.877 1.092.602.536 1.109.702 1.267.78.158.078.251.066.344-.041.093-.107.4-.466.507-.626.107-.159.214-.133.359-.08.145.053.921.434 1.079.513.158.079.263.118.302.185.039.066.039.382-.105.787z" />
              </svg>
              <span>WhatsApp Hotline</span>
            </a>
          </div>
        </div>
      </div>

      {/* TIER 2: Grand Command Center Stage — GIANT LOGO & BRAND */}
      <div className={cn(
        "max-w-[1720px] mx-auto px-4 sm:px-8 transition-all duration-300 flex items-center justify-between gap-4",
        compact ? "py-2.5" : "py-4 sm:py-5 lg:py-6"
      )}>
        {/* Brand Anchor: Giant 3D Metallic Chrome Silver Emblem + Title */}
        <Link
          href="/"
          className="group flex items-center gap-4 sm:gap-6 press-scale shrink-0"
          aria-label="JSM Integrated Services Home"
        >
          {/* GIANT LOGO CONTAINER (Maximized Size) */}
          <div className={cn(
            "relative rounded-3xl flex items-center justify-center overflow-hidden shrink-0 border-2 border-white/30 bg-black shadow-2xl group-hover:border-emerald-400/60 transition-all duration-300",
            compact 
              ? "w-14 h-14 sm:w-16 sm:h-16" 
              : "w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
          )}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jsm_logo_black.png"
              alt="JSM Integrated Services 3D Metallic Silver Logo"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Majestic Typography */}
          <div className="flex flex-col justify-center">
            <span className={cn(
              "font-black tracking-tight text-white leading-none flex items-center gap-2",
              compact 
                ? "text-lg sm:text-xl md:text-2xl" 
                : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            )}>
              <span>JSM INTEGRATED SERVICES</span>
            </span>

            <div className="flex flex-wrap items-center gap-2 mt-1.5 sm:mt-2">
              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-emerald-400 tracking-wider uppercase font-mono">
                DGR-ALIGNED SOVEREIGN SECURITY &bull; EX-SERVICEMEN WING
              </span>
              <span className="hidden lg:inline-block px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 text-[10px] font-mono font-semibold">
                TRICHY AIRPORT OPERATIONAL MARSHALS
              </span>
            </div>
          </div>
        </Link>

        {/* Right Action Cluster with Maxed Out Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Giant Phone / Hotline Display */}
          <div className="hidden lg:flex flex-col items-end mr-2">
            <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 tracking-wider">
              24/7 Command Dispatch
            </span>
            <a
              href="tel:+919080863448"
              className="text-lg sm:text-xl xl:text-2xl font-black font-mono text-white hover:text-emerald-400 transition-colors tabular-nums flex items-center gap-2"
            >
              <Phone size={20} className="text-emerald-400 shrink-0 animate-bounce" />
              <span>+91 90808 63448</span>
            </a>
          </div>

          {/* Giant WhatsApp Action Button */}
          <a
            href="https://wa.me/919080863448?text=Hello%20JSM%20Integrated%20Services,%20I%20wish%20to%20deploy%20security%20or%20facility%20teams."
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-2.5 rounded-full font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl hover:shadow-emerald-500/30 transition-all press-scale",
              compact ? "px-4 py-2 text-xs" : "px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base"
            )}
            aria-label="Direct WhatsApp Hotline"
          >
            <svg className={compact ? "w-5 h-5 fill-current" : "w-6 h-6 fill-current"} viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.529 1.831.815 2.796.815 3.182 0 5.768-2.586 5.768-5.768 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.926-.383-1.636-1.026-2.072-1.606-.437-.58-.456-.788-.456-1.049 0-.262.138-.499.278-.638.14-.14.306-.175.408-.175.102 0 .205.002.295.006.095.005.222-.036.347.265.127.306.435 1.06.474 1.139.039.078.065.17.013.272-.051.102-.077.166-.153.255-.077.089-.161.198-.231.266-.078.077-.16.16-.068.318.092.158.409.675.877 1.092.602.536 1.109.702 1.267.78.158.078.251.066.344-.041.093-.107.4-.466.507-.626.107-.159.214-.133.359-.08.145.053.921.434 1.079.513.158.079.263.118.302.185.039.066.039.382-.105.787z" />
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Giant Get Quote Action Button */}
          <Link
            href="/get-quote"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full font-bold text-white bg-[#0071e3] hover:bg-[#0077ed] shadow-xl hover:shadow-blue-500/30 transition-all press-scale",
              compact ? "px-4 py-2 text-xs" : "px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base"
            )}
          >
            <span>Request Quote</span>
            <ArrowRight size={18} className="text-white" strokeWidth={2.5} />
          </Link>

          {/* Mobile Menu Trigger */}
          <div className="xl:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>

      {/* TIER 3: Expansive Navigation Command Bar with MAXED OUT ICONS */}
      <div className={cn(
        "border-t border-white/10 bg-black/90 transition-all duration-300 hidden xl:block",
        compact ? "py-1.5" : "py-2.5"
      )}>
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          <nav className="flex items-center gap-1.5 flex-wrap">
            {navigationData.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              const IconComponent = navIconMap[item.href] || ShieldCheck;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full transition-all relative flex items-center gap-2.5 press-scale whitespace-nowrap font-bold",
                    compact ? "text-xs py-1.5" : "text-sm",
                    isActive
                      ? "bg-white text-black shadow-lg"
                      : "text-neutral-200 hover:text-white hover:bg-white/10"
                  )}
                >
                  {/* MAXED OUT ICON */}
                  <IconComponent size={compact ? 17 : 20} className={isActive ? "text-black" : "text-emerald-400"} strokeWidth={2.2} />
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className={cn(
                      "text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase",
                      isActive 
                        ? "bg-black text-white" 
                        : "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Direct Verification Badge */}
          <div className="hidden 2xl:flex items-center gap-2 text-xs font-mono text-neutral-400">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>100% Police Background Verified Platoons</span>
          </div>
        </div>
      </div>
    </header>
  );
}
