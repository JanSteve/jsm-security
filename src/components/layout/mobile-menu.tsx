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
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { navigationData } from "@/data/navigation";
import { brandData } from "@/data/brand";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 hover:bg-[#F7F6F2] rounded-[8px] lg:hidden text-[#14181A] press-scale min-touch-target"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-sm bg-white border-l border-[#E5E3DD] p-0 flex flex-col h-full overflow-hidden text-[#14181A] duration-280 ease-[cubic-bezier(0.4,0,0.2,1)]"
      >
        <SheetHeader className="p-5 text-left border-b border-[#E5E3DD] flex flex-row items-center justify-between">
          <SheetTitle className="text-sm font-semibold tracking-tight text-[#14181A] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-[#0B3D2E] text-white flex items-center justify-center overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/jsm_logo_black.png"
                alt="JSM"
                className="w-full h-full object-cover"
              />
            </div>
            <span>JSM Integrated Services</span>
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-[8px] hover:bg-[#F7F6F2] text-[#14181A] press-scale"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </Button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="py-3 px-3.5 rounded-[8px] text-sm font-medium text-[#14181A] hover:bg-[#F7F6F2] transition-colors flex items-center justify-between min-touch-target"
            >
              <span>Home</span>
              <ArrowRight size={14} className="text-[#4B5259]" />
            </Link>
            {navigationData.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3.5 rounded-[8px] text-sm font-medium text-[#14181A] hover:bg-[#F7F6F2] transition-colors flex items-center justify-between min-touch-target"
              >
                <span>{item.title}</span>
                <ArrowRight size={14} className="text-[#4B5259]" />
              </Link>
            ))}
          </nav>

          <div className="p-4 bg-[#F7F6F2] border border-[#E5E3DD] rounded-[12px] space-y-2">
            <div className="text-xs font-semibold text-[#14181A]">
              Headquarters Operations Desk
            </div>
            <p className="text-xs text-[#4B5259]">
              Tiruchirappalli &bull; Chennai &bull; Coimbatore &bull; Hosur &bull; Salem &bull; Madurai
            </p>
          </div>
        </div>

        {/* Pinned Bottom Actions: WhatsApp + Call (52px height each) */}
        <div className="p-5 border-t border-[#E5E3DD] bg-[#F7F6F2] space-y-3">
          <a
            href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20need%20assistance.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 h-[52px] rounded-[8px] bg-[#1E7A58] hover:bg-[#145C43] text-white text-sm font-semibold shadow-xs press-scale"
          >
            <span>WhatsApp Operations Hotline</span>
          </a>

          <a
            href={`tel:${brandData.contact.phone}`}
            className="w-full flex items-center justify-center gap-2 h-[52px] rounded-[8px] bg-[#0B3D2E] hover:bg-[#082C21] text-white text-sm font-semibold shadow-xs press-scale tabular-nums"
          >
            <Phone size={15} />
            <span>Call {brandData.contact.phoneDisplay}</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
