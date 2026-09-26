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
          className="w-11 h-11 border border-[#E4E7EC] hover:bg-[#F6F7F9] rounded-[4px] lg:hidden text-[#14181F] press-scale min-touch-target"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-sm bg-white border-l border-[#E4E7EC] p-0 flex flex-col h-full overflow-hidden text-[#14181F]"
      >
        {/* Header */}
        <SheetHeader className="p-4 sm:p-5 text-left border-b border-[#E4E7EC] flex flex-row items-center justify-between">
          <SheetTitle className="text-sm font-semibold tracking-tight text-[#14181F] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[4px] bg-[#0F2A47] text-white flex items-center justify-center overflow-hidden shrink-0">
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
            className="w-10 h-10 rounded-[4px] hover:bg-[#F6F7F9] text-[#14181F] press-scale min-touch-target"
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
              className="py-3 px-3.5 rounded-[4px] text-sm font-medium text-[#14181F] hover:bg-[#F6F7F9] transition-colors flex items-center justify-between min-touch-target"
            >
              <span>Home</span>
            </Link>
            {navigationData.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3.5 rounded-[4px] text-sm font-medium text-[#14181F] hover:bg-[#F6F7F9] transition-colors flex items-center justify-between min-touch-target"
              >
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>

          {/* Operational Presence Notice */}
          <div className="p-4 bg-[#F6F7F9] border border-[#E4E7EC] rounded-[0px] space-y-1.5">
            <div className="text-xs font-semibold text-[#14181F]">
              Central Operations HQ &bull; Tiruchirappalli
            </div>
            <p className="text-xs text-[#4A5160] leading-relaxed">
              Serving Chennai, Coimbatore, Hosur, Salem, Madurai, Tirunelveli &amp; across Tamil Nadu.
            </p>
          </div>
        </div>

        {/* Pinned Bottom Dual Action Bar */}
        <div className="p-4 border-t border-[#E4E7EC] bg-[#F6F7F9] space-y-2.5">
          <a
            href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20request%20an%20operational%20quote.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 h-[48px] rounded-[4px] bg-[#0F2A47] hover:bg-[#0A1E33] text-white text-sm font-semibold transition-colors shadow-subtle press-scale min-touch-target"
          >
            <MessageSquare size={16} />
            <span>WhatsApp Operations Desk</span>
          </a>

          <a
            href={`tel:${brandData.contact.phone}`}
            className="w-full flex items-center justify-center gap-2 h-[48px] rounded-[4px] bg-white hover:bg-neutral-50 text-[#0F2A47] border border-[#0F2A47] text-sm font-semibold transition-colors tabular-nums press-scale min-touch-target"
          >
            <Phone size={15} />
            <span>Call {brandData.contact.phoneDisplay}</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
