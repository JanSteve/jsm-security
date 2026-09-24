"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationData } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { brandData } from "@/data/brand";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-250 ease-out bg-white border-b border-[#E5E3DD]",
        scrolled
          ? "h-16 shadow-[0_1px_2px_rgba(20,24,26,0.04),0_4px_12px_rgba(20,24,26,0.06)]"
          : "h-[88px]"
      )}
    >
      <div className="max-w-[1280px] h-full mx-auto px-6 sm:px-8 flex items-center justify-between gap-6">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group shrink-0"
          aria-label="JSM Integrated Services Home"
        >
          <div className="w-10 h-10 rounded-[8px] bg-[#0B3D2E] text-white flex items-center justify-center font-bold text-sm tracking-wider overflow-hidden border border-[#0B3D2E]/20 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jsm_logo_black.png"
              alt="JSM Crest"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-semibold text-base sm:text-lg tracking-tight text-[#14181A] leading-tight">
              JSM Integrated Services
            </span>
            <span className="text-[11px] text-[#4B5259] font-medium tracking-normal flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1E7A58]" />
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
                  "relative px-3.5 py-2 text-sm font-medium transition-colors group",
                  isActive
                    ? "text-[#1E7A58] font-semibold"
                    : "text-[#4B5259] hover:text-[#14181A]"
                )}
              >
                <span>{item.title}</span>
                {/* 2px animated underline on active link */}
                <span
                  className={cn(
                    "absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#1E7A58] transition-transform duration-200 ease-out origin-center",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100 group-hover:bg-[#1E7A58]/40"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Cluster: Direct Phone + Request Proposal */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href={`tel:${brandData.contact.phone}`}
            className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-[#14181A] hover:text-[#1E7A58] px-3 py-2 rounded-[8px] transition-colors tabular-nums min-h-[44px]"
            aria-label="Direct Phone Consultation"
          >
            <Phone size={14} className="text-[#0B3D2E]" />
            <span>{brandData.contact.phoneDisplay}</span>
          </a>

          <Link
            href="/get-quote"
            className="inline-flex items-center justify-center gap-2 rounded-[8px] text-xs sm:text-sm font-semibold text-white bg-[#0B3D2E] hover:bg-[#145C43] px-4 sm:px-5 h-[48px] transition-all shadow-xs press-scale"
          >
            <span>Request a Proposal</span>
            <ArrowRight size={14} />
          </Link>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
