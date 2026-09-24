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
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";
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
          className="w-10 h-10 hover:bg-neutral-100 rounded-lg lg:hidden text-[#14181F] press-scale"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-sm bg-white border-l border-[#E7E5E0] p-0 flex flex-col h-full overflow-hidden text-[#14181F]"
      >
        <SheetHeader className="p-5 text-left border-b border-[#E7E5E0] flex flex-row items-center justify-between">
          <SheetTitle className="text-sm font-semibold tracking-tight text-[#14181F] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#0B3D2E] text-white flex items-center justify-center overflow-hidden shrink-0">
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
            className="w-8 h-8 rounded-md hover:bg-neutral-100 text-[#14181F] press-scale"
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
              className="py-3 px-3.5 rounded-lg text-sm font-medium text-[#14181F] hover:bg-neutral-50 transition-colors flex items-center justify-between min-touch-target"
            >
              <span>Home</span>
              <ArrowRight size={14} className="text-[#5A6578]" />
            </Link>
            {navigationData.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3.5 rounded-lg text-sm font-medium text-[#14181F] hover:bg-neutral-50 transition-colors flex items-center justify-between min-touch-target"
              >
                <span>{item.title}</span>
                <ArrowRight size={14} className="text-[#5A6578]" />
              </Link>
            ))}
          </nav>

          <div className="p-4 bg-[#F8F9FA] border border-[#E7E5E0] rounded-xl space-y-3">
            <div className="text-xs font-semibold text-[#14181F]">
              Direct Executive Contact
            </div>
            <a
              href={`tel:${brandData.contact.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-[#0B3D2E] tabular-nums"
            >
              <Phone size={14} />
              <span>{brandData.contact.phoneDisplay}</span>
            </a>
            <p className="text-[11px] text-[#5A6578]">
              Tiruchirappalli HQ &bull; Operations in Chennai, Coimbatore, Hosur, Salem, Madurai
            </p>
          </div>
        </div>

        <div className="p-5 border-t border-[#E7E5E0] bg-[#F8F9FA] space-y-3">
          <Link
            href="/get-quote"
            onClick={() => setOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0B3D2E] text-white text-sm font-semibold shadow-xs press-scale hover:bg-[#082C21]"
          >
            <span>Request a Quote</span>
            <ArrowRight size={14} />
          </Link>
          <p className="text-[11px] text-[#5A6578] text-center">
            PSARA 2005 &bull; ISO 9001:2015 &bull; 100% Statutory Compliance
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
