"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { navigationData } from "@/data/navigation";
import { brandData } from "@/data/brand";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 hover:bg-black/[0.05] rounded-full lg:hidden text-[#1d1d1f] press-scale">
          <Menu className="h-5 w-5 text-[#1d1d1f]" strokeWidth={2} />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md bg-white border-l border-black/[0.08] p-0 flex flex-col h-full overflow-hidden text-[#1d1d1f]">
        <SheetHeader className="p-5 text-left border-b border-black/[0.08] flex flex-row items-center justify-between">
          <SheetTitle className="text-base font-bold tracking-tight text-[#1d1d1f] flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-xs overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/jsm_logo_transparent.png" alt="JSM" className="w-full h-full object-contain" />
            </div>
            JSM INTEGRATED SERVICES
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 rounded-full hover:bg-black/[0.05] text-[#1d1d1f] press-scale"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" strokeWidth={2} />
            <span className="sr-only">Close menu</span>
          </Button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Quick CTA banner */}
          <div className="p-4 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#1d1d1f]">Need immediate dispatch?</p>
              <p className="text-[11px] text-[#86868b] font-mono">24/7 Operations Desk</p>
            </div>
            <a
              href={`tel:${brandData.contact.phone}`}
              className="px-4 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-xs press-scale min-touch-target font-mono tabular-nums"
            >
              <Phone size={13} strokeWidth={2} />
              <span>Call Now</span>
            </a>
          </div>

          <nav className="flex flex-col space-y-1">
            {navigationData.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3.5 rounded-xl text-sm font-semibold text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors flex items-center justify-between press-scale min-touch-target"
              >
                <div className="flex items-center gap-2">
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-black/[0.05] text-[#1d1d1f] uppercase">
                      {item.badge}
                    </span>
                  )}
                </div>
                <ArrowRight size={14} className="text-[#86868b]" strokeWidth={2} />
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer Contact Strip */}
        <div className="p-5 border-t border-black/[0.08] bg-[#f5f5f7] space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <a
              href="mailto:contact@jsmintegratedservices.com"
              className="flex items-center justify-center gap-1.5 py-3 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold shadow-xs press-scale min-touch-target"
            >
              <Mail size={13} className="text-[#86868b]" strokeWidth={2} />
              <span>Email us</span>
            </a>
            <Link
              href="/get-quote"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1 py-3 rounded-full bg-[#0071e3] text-white text-xs font-semibold shadow-xs press-scale min-touch-target"
            >
              <span>Instant quote</span>
              <ArrowRight size={12} className="text-white" strokeWidth={2} />
            </Link>
          </div>
          <p className="text-[10px] text-[#86868b] text-center font-mono">
            PSARA 2005 Licensed • Trichy Airport Platoon • 2-Hour SLA
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
