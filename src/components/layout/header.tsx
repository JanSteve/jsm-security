"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, useMotionValueEvent, motion } from "motion/react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationData } from "@/data/navigation";
import { brandData } from "@/data/brand";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Detect scroll offset for 40px glass transition
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  // Client hydration check for initial scroll position
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const raf = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  return (
    <>
      {/* 3px Top Page Progress Bar (Animates scaleX with scroll progress) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#C8553D] z-50 origin-left pointer-events-none"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />

      <header
        role="banner"
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300 ease-out",
          isScrolled
            ? "bg-[#F6F3EE]/90 backdrop-blur-md border-b border-[#0E1116]/10 shadow-[0_2px_12px_rgba(14,17,22,0.04)] h-16 sm:h-20"
            : "bg-transparent border-b border-transparent h-20"
        )}
      >
        <div className="max-w-[1180px] w-[92%] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Identity & Title */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0 min-h-[44px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1116] focus-visible:ring-offset-2"
            aria-label="JSM Integrated Services - Executive Talent Acquisition"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0E1116] text-[#F6F3EE] flex items-center justify-center font-bold text-sm tracking-wider overflow-hidden shrink-0 border border-[#0E1116]/15 shadow-xs">
              <Image
                src="/images/jsm_logo_black.png"
                alt="JSM Crest"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-heading font-medium text-base sm:text-lg tracking-tight text-[#0E1116] leading-tight group-hover:text-[#C8553D] transition-colors">
                JSM Integrated Services
              </span>
              <span className="text-[11px] sm:text-xs text-[#525866] font-sans font-normal tracking-normal leading-tight hidden xs:block">
                Executive Talent Acquisition
              </span>
            </div>
          </Link>

          {/* Primary Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {navigationData.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="px-3.5 py-2 text-sm font-sans font-medium text-[#0E1116]/80 hover:text-[#0E1116] transition-colors min-h-[44px] flex items-center rounded-md relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1116]"
              >
                <span>{item.title}</span>
                <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#C8553D] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-center" />
              </Link>
            ))}
          </nav>

          {/* Action Cluster: Phone + Pill Button CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Direct Phone Link (Desktop & Tablet) */}
            <a
              href={`tel:${brandData.contact.phone}`}
              className="hidden md:inline-flex items-center justify-center gap-1.5 px-3.5 h-[44px] min-h-[44px] rounded-full border border-[#0E1116]/15 bg-transparent hover:bg-[#FFFFFF] text-xs font-sans font-semibold text-[#0E1116] transition-all tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1116]"
              aria-label={`Call Executive Search Desk: ${brandData.contact.phoneDisplay}`}
            >
              <Phone size={13} className="text-[#C8553D]" />
              <span>{brandData.contact.phoneDisplay}</span>
            </a>

            {/* Primary Action Button: Ink Pill (Turns Terracotta on Hover) */}
            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center justify-center h-[44px] min-h-[44px] px-5 sm:px-6 rounded-full bg-[#0E1116] text-[#FFFFFF] hover:bg-[#C8553D] text-xs sm:text-sm font-sans font-medium tracking-tight shadow-xs hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] focus-visible:ring-offset-2"
            >
              <span>Hire Talent</span>
            </Link>

            {/* Mobile Hamburger Trigger & Full-Width Overlay (< 1024px) */}
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
