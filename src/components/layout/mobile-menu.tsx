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
          className="w-11 h-11 border border-white/15 bg-black/60 hover:bg-white/10 rounded-[6px] lg:hidden text-white press-scale min-touch-target"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-sm bg-black border-l border-white/10 p-0 flex flex-col h-full overflow-hidden text-white"
      >
        {/* Header */}
        <SheetHeader className="p-4 sm:p-5 text-left border-b border-white/10 flex flex-row items-center justify-between">
          <SheetTitle className="text-sm font-semibold tracking-tight text-white flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[6px] bg-[#0F2A47] text-white flex items-center justify-center overflow-hidden shrink-0 border border-[#D4AF37]/40">
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
            className="w-10 h-10 rounded-[6px] hover:bg-white/10 text-white press-scale min-touch-target"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </Button>
        </SheetHeader>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="py-3 px-3.5 rounded-[6px] text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center justify-between min-touch-target min-h-[44px]"
            >
              <span>Home</span>
            </Link>
            {navigationData.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3.5 rounded-[6px] text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center justify-between min-touch-target min-h-[44px]"
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Operational Presence Notice */}
          <div className="p-4 bg-[#0A0E17] border border-white/10 rounded-[6px] space-y-1.5">
            <div className="text-xs font-semibold text-[#D4AF37]">
              Central Operations HQ &bull; Tiruchirappalli
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Serving Chennai, Coimbatore, Hosur, Salem, Madurai &amp; Tamil Nadu.
            </p>
          </div>
        </div>

        {/* Pinned Bottom Dual Action Bar */}
        <div className="p-4 border-t border-white/10 bg-[#070A0F] space-y-2.5">
          <a
            href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20request%20an%20operational%20quote.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 h-[48px] rounded-[6px] bg-[#D4AF37] hover:bg-[#E5C158] text-black text-sm font-bold transition-colors shadow-md press-scale min-touch-target"
          >
            <MessageSquare size={16} />
            <span>WhatsApp Operations Desk</span>
          </a>

          <a
            href={`tel:${brandData.contact.phone}`}
            className="w-full flex items-center justify-center gap-2 h-[48px] rounded-[6px] bg-black hover:bg-white/5 text-white border border-white/20 text-sm font-semibold transition-colors tabular-nums press-scale min-touch-target"
          >
            <Phone size={15} className="text-[#D4AF37]" />
            <span>Call {brandData.contact.phoneDisplay}</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
