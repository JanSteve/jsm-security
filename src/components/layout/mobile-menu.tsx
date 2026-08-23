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
import { Menu, X, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { navigationData } from "@/data/navigation";
import { brandData } from "@/data/brand";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const cleanPhone = brandData.contact.phone.replace(/[^0-9+]/g, '');
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 hover:bg-zinc-100 rounded-full lg:hidden">
          <Menu className="h-5 w-5 text-black" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md bg-white border-l border-zinc-200 p-0 flex flex-col h-full overflow-hidden">
        <SheetHeader className="p-5 text-left border-b border-zinc-200/60 flex flex-row items-center justify-between">
          <SheetTitle className="text-base font-black tracking-tight text-black flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
              JSM
            </div>
            JSM INTEGRATED SERVICES
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 rounded-full hover:bg-zinc-100 text-black"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Quick CTA banner */}
          <div className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-black">Need immediate support?</p>
              <p className="text-[11px] text-zinc-500">24/7 Operations Desk</p>
            </div>
            <a
              href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20need%20assistance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>

          <nav className="flex flex-col space-y-1">
            {navigationData.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3.5 rounded-2xl text-sm font-bold text-zinc-800 hover:text-black hover:bg-[#fbf9f4] transition-colors flex items-center justify-between border border-transparent hover:border-zinc-200"
              >
                <div className="flex items-center gap-2">
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-black px-1.5 py-0.2 rounded-sm bg-[#C5A880] text-black uppercase">
                      {item.badge}
                    </span>
                  )}
                </div>
                <ArrowRight size={14} className="text-zinc-400" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer Contact Strip */}
        <div className="p-5 border-t border-zinc-200/60 bg-zinc-50 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-black text-xs font-bold shadow-2xs"
            >
              <Phone size={13} className="text-[#C5A880]" />
              <span>Call Us</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1 py-2.5 rounded-xl bg-black text-white text-xs font-bold shadow-xs"
            >
              <span>Get Quote</span>
              <ArrowRight size={12} className="text-[#C5A880]" />
            </Link>
          </div>
          <p className="text-[10px] text-zinc-500 text-center font-mono">
            PSARA Compliant • Trichy Airport Landmark • 2-Hour SLA
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
