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
        <Button variant="ghost" size="icon" className="w-10 h-10 hover:bg-white/10 rounded-full lg:hidden text-white press-scale">
          <Menu className="h-5 w-5 text-white" strokeWidth={2} />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md bg-[#0B0F17] border-l border-zinc-800 p-0 flex flex-col h-full overflow-hidden text-white">
        <SheetHeader className="p-5 text-left border-b border-zinc-800 flex flex-row items-center justify-between">
          <SheetTitle className="text-base font-black tracking-tight text-white flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-black border border-white/10 text-[#C5A880] flex items-center justify-center font-bold text-xs">
              JSM
            </div>
            JSM INTEGRATED SERVICES
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 rounded-full hover:bg-white/10 text-white press-scale"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" strokeWidth={2} />
            <span className="sr-only">Close menu</span>
          </Button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Quick CTA banner */}
          <div className="p-4 bg-[#111723] border border-zinc-800 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Need immediate dispatch?</p>
              <p className="text-[11px] text-zinc-400 font-mono">24/7 Operations Desk</p>
            </div>
            <a
              href={`tel:${brandData.contact.phone}`}
              className="px-3.5 py-2 bg-[#C5A880] hover:bg-[#b0936b] text-black rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm press-scale min-touch-target font-mono tabular-nums"
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
                className="py-3 px-3.5 rounded-2xl text-sm font-bold text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between border border-transparent hover:border-zinc-800 press-scale min-touch-target"
              >
                <div className="flex items-center gap-2">
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-black px-1.5 py-0.2 rounded-sm bg-[#C5A880] text-black uppercase">
                      {item.badge}
                    </span>
                  )}
                </div>
                <ArrowRight size={14} className="text-zinc-500" strokeWidth={2} />
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer Contact Strip */}
        <div className="p-5 border-t border-zinc-800 bg-[#07090E] space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <a
              href="mailto:contact@jsmintegratedservices.com"
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#111723] border border-zinc-800 text-white text-xs font-bold shadow-xs press-scale min-touch-target"
            >
              <Mail size={13} className="text-[#C5A880]" strokeWidth={2} />
              <span>Email us</span>
            </a>
            <Link
              href="/get-quote"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1 py-3 rounded-xl bg-[#C5A880] text-black text-xs font-extrabold shadow-xs press-scale min-touch-target"
            >
              <span>Instant quote</span>
              <ArrowRight size={12} className="text-black" strokeWidth={2} />
            </Link>
          </div>
          <p className="text-[10px] text-zinc-400 text-center font-mono">
            PSARA 2005 Licensed • Trichy Airport Platoon • 2-Hour SLA
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
