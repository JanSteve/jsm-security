"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationData } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { brandData } from "@/data/brand";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#E7E5E0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] py-3"
          : "bg-white border-b border-[#E7E5E0]/60 py-4 sm:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group shrink-0"
          aria-label="JSM Integrated Services Home"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#0B3D2E] text-white flex items-center justify-center font-bold text-sm tracking-wider overflow-hidden border border-[#0B3D2E]/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jsm_logo_black.png"
              alt="JSM Crest"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base sm:text-lg tracking-tight text-[#14181F] leading-tight">
              JSM Integrated Services
            </span>
            <span className="text-[11px] text-[#5A6578] font-medium tracking-normal flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0B3D2E]" />
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
                  "px-3.5 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "text-[#0B3D2E] bg-[#0B3D2E]/5 font-semibold"
                    : "text-[#4A5568] hover:text-[#14181F] hover:bg-black/[0.03]"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Cluster: Direct Phone + Request Quote */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href={`tel:${brandData.contact.phone}`}
            className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-[#14181F] hover:text-[#0B3D2E] px-3 py-2 rounded-md transition-colors tabular-nums"
            aria-label="Direct Phone Consultation"
          >
            <Phone size={14} className="text-[#0B3D2E]" />
            <span>{brandData.contact.phoneDisplay}</span>
          </a>

          <Link
            href="/get-quote"
            className="inline-flex items-center justify-center gap-2 rounded-md text-xs sm:text-sm font-semibold text-white bg-[#0B3D2E] hover:bg-[#082C21] px-4 sm:px-5 py-2.5 transition-all shadow-xs press-scale"
          >
            <span>Request a Quote</span>
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
