"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationData } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { brandData } from "@/data/brand";
import { LanguageSwitcher } from "./language-switcher";

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
        "bg-black/95 backdrop-blur-2xl border-b border-white/10 text-white",
        compact ? "py-2 shadow-2xl" : "py-3 lg:py-3.5"
      )}
    >
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between gap-2 lg:gap-4">
        {/* Brand Logo & Title - Edge-to-Edge Full Height Scaling */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3.5 z-50 shrink-0 press-scale"
          aria-label="JSM Integrated Services Home"
        >
          {/* Logo container fills entire available vertical space */}
          <div className={cn(
            "relative rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border border-white/20 bg-black shadow-lg group-hover:border-white/40 transition-all duration-300",
            compact ? "w-12 h-12 sm:w-14 sm:h-14" : "w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px]"
          )}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jsm_logo_black.png"
              alt="JSM Integrated Services Logo"
              className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight text-white leading-tight flex items-center gap-1.5">
              <span>JSM INTEGRATED SERVICES</span>
              <ShieldCheck size={15} className="text-emerald-400 hidden sm:inline-block shrink-0" />
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-400 tracking-wider uppercase mt-0.5 font-mono leading-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DGR-ALIGNED • PSARA CERTIFIED • ESM WING</span>
            </span>
          </div>
        </Link>

        {/* Clean Desktop Navigation Bar on Black */}
        <nav className="hidden xl:flex items-center gap-0.5 bg-white/[0.06] p-1.5 rounded-full border border-white/10">
          {navigationData.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all relative flex items-center gap-1 press-scale whitespace-nowrap",
                  isActive
                    ? "bg-white text-black shadow-md font-semibold"
                    : "text-neutral-300 hover:text-white hover:bg-white/[0.08]"
                )}
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className={cn(
                    "text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-full uppercase",
                    isActive ? "bg-black/[0.12] text-black" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Cluster: Language Switcher + 24/7 Hotline + Prominent WhatsApp + Quote Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Prominent Multi-Language Switcher */}
          <LanguageSwitcher />

          {/* 24/7 Operations Desk Phone + Large Prominent WhatsApp Icon Beside It */}
          <div className="hidden lg:inline-flex items-center rounded-full bg-white/[0.08] border border-white/10 p-0.5 pl-3 pr-1 gap-2">
            <a
              href="tel:+919080863448"
              className="flex items-center gap-1.5 text-xs font-medium text-white hover:text-neutral-200 transition-colors font-mono tabular-nums"
              aria-label="Direct Call Operations Desk"
            >
              <Phone size={12} className="text-neutral-400" strokeWidth={2} />
              <span className="hidden 2xl:inline">24/7:</span>
              <span>+91 90808 63448</span>
            </a>

            {/* Prominent Large WhatsApp Button clickable to wa.me/919080863448 */}
            <a
              href="https://wa.me/919080863448?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-md hover:scale-105 transition-all"
              aria-label="Chat on WhatsApp"
              title="Message JSM on WhatsApp"
            >
              {/* Official WhatsApp SVG Icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.529 1.831.815 2.796.815 3.182 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.926-.383-1.636-1.026-2.072-1.606-.437-.58-.456-.788-.456-1.049 0-.262.138-.499.278-.638.14-.14.306-.175.408-.175.102 0 .205.002.295.006.095.005.222-.036.347.265.127.306.435 1.06.474 1.139.039.078.065.17.013.272-.051.102-.077.166-.153.255-.077.089-.161.198-.231.266-.078.077-.16.16-.068.318.092.158.409.675.877 1.092.602.536 1.109.702 1.267.78.158.078.251.066.344-.041.093-.107.4-.466.507-.626.107-.159.214-.133.359-.08.145.053.921.434 1.079.513.158.079.263.118.302.185.039.066.039.382-.105.787z" />
              </svg>
            </a>
          </div>

          {/* Primary Request Quote Pill Button */}
          <Link
            href="/get-quote"
            className="inline-flex items-center justify-center bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold px-4 sm:px-5 h-9 sm:h-10 rounded-full shadow-md press-scale transition-all group shrink-0"
          >
            <span>Get Quote</span>
            <ArrowRight size={13} className="ml-1 text-white group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
          </Link>

          {/* Mobile Menu Trigger */}
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
