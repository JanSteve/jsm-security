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
        "fixed top-0 inset-x-0 z-50 transition-all duration-200 ease-out bg-white border-b border-[#E4E7EC]",
        scrolled ? "h-16 shadow-[0_1px_2px_rgba(15,42,71,0.06)]" : "h-[74px] sm:h-[80px]"
      )}
    >
      <div className="max-w-[1280px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo & Authority Label */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-h-[44px]"
          aria-label="JSM Integrated Services Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[4px] bg-[#0F2A47] text-white flex items-center justify-center font-bold text-sm tracking-wider overflow-hidden border border-[#0F2A47]/20 shrink-0">
            <Image
              src="/images/jsm_logo_black.png"
              alt="JSM Crest"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center max-w-[120px] sm:max-w-none">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-[#14181F] leading-tight truncate">
              JSM Integrated Services
            </span>
            <span className="text-[11px] text-[#4A5160] font-medium tracking-normal hidden sm:flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9C7A3C]" />
              PSARA Licensed &bull; ISO 9001:2015 &bull; DGR Aligned
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
                  "relative px-3 py-2 text-sm font-medium transition-colors min-h-[44px] flex items-center group",
                  isActive
                    ? "text-[#0F2A47] font-semibold"
                    : "text-[#4A5160] hover:text-[#14181F]"
                )}
              >
                <span>{item.title}</span>
                {/* Brass 2px active underline */}
                <span
                  className={cn(
                    "absolute bottom-0 left-3 right-3 h-[2px] bg-[#9C7A3C] transition-transform duration-200 ease-out origin-center",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-[#9C7A3C]/50"
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
            className="inline-flex items-center justify-center text-xs font-semibold text-[#14181F] hover:text-[#0F2A47] w-[44px] sm:w-auto sm:px-3 h-[44px] rounded-[4px] border border-[#E4E7EC] hover:border-[#0F2A47] transition-colors tabular-nums min-touch-target"
            aria-label={`Call Operations: ${brandData.contact.phoneDisplay}`}
          >
            <Phone size={14} className="text-[#0F2A47]" />
            <span className="hidden sm:inline sm:ml-1.5">{brandData.contact.phoneDisplay}</span>
          </a>

          {/* Primary CTA - Visible on ALL Viewports, Never Buried */}
          <Link
            href="/get-quote"
            className="inline-flex items-center justify-center rounded-[4px] text-xs sm:text-sm font-semibold text-white bg-[#0F2A47] hover:bg-[#0A1E33] px-3.5 sm:px-5 h-[44px] transition-colors shadow-subtle press-scale min-touch-target"
          >
            <span>Get a Quote</span>
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
