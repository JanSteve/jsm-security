"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { navigationData } from "@/data/navigation";
import { brandData } from "@/data/brand";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-11 h-11 min-h-[44px] min-w-[44px] border border-cyan-500/25 bg-[#030712]/80 hover:bg-cyan-950/30 hover:border-cyan-400/50 rounded-[6px] lg:hidden text-white press-scale min-touch-target"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5 text-cyan-400" strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-sm bg-[#030712] border-l border-cyan-500/20 p-0 flex flex-col h-full overflow-hidden text-white"
      >
        {/* Header */}
        <SheetHeader className="p-4 sm:p-5 text-left border-b border-cyan-500/20 flex flex-row items-center justify-between">
          <SheetTitle className="text-sm font-semibold tracking-tight text-white flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[6px] bg-[#030712] text-white flex items-center justify-center overflow-hidden shrink-0 border border-cyan-500/30">
              <Image
                src="/images/jsm_logo_black.png"
                alt="JSM"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span>JSM Integrated Services</span>
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-[6px] hover:bg-cyan-500/10 text-white hover:text-cyan-300 press-scale min-touch-target"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-cyan-400" strokeWidth={2} />
          </Button>
        </SheetHeader>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="py-3 px-3.5 rounded-[6px] text-sm font-medium text-white hover:bg-cyan-500/10 hover:text-cyan-200 transition-colors flex items-center justify-between min-touch-target min-h-[44px] min-w-[44px]"
            >
              <span>Home</span>
            </Link>
            {navigationData.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3.5 rounded-[6px] text-sm font-medium text-white hover:bg-cyan-500/10 hover:text-cyan-200 transition-colors flex items-center justify-between min-touch-target min-h-[44px] min-w-[44px]"
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-semibold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Operational Presence Notice */}
          <div className="p-4 bg-[#080C16] border border-cyan-500/20 rounded-[6px] space-y-1.5">
            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Central Operations HQ &bull; Tiruchirappalli</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Serving Chennai, Coimbatore, Hosur, Salem, Madurai &amp; Tamil Nadu.
            </p>
          </div>
        </div>

        {/* Pinned Bottom Dual Action Bar */}
        <div className="p-4 border-t border-cyan-500/20 bg-[#050811] space-y-2.5">
          <a
            href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20request%20an%20operational%20quote.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 h-[48px] min-h-[48px] min-w-[44px] rounded-[6px] bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-sm font-bold transition-colors shadow-md press-scale min-touch-target"
          >
            <MessageSquare size={16} className="text-emerald-400" />
            <span>WhatsApp Operations Desk</span>
          </a>

          <a
            href={`tel:${brandData.contact.phone}`}
            className="w-full flex items-center justify-center gap-2 h-[48px] min-h-[48px] min-w-[44px] rounded-[6px] bg-[#080C16] hover:bg-cyan-950/30 text-white border border-cyan-500/30 hover:border-cyan-400/50 text-sm font-semibold transition-colors tabular-nums press-scale min-touch-target"
          >
            <Phone size={15} className="text-cyan-400" />
            <span>Call {brandData.contact.phoneDisplay}</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
