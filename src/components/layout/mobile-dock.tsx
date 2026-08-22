"use client";

import Link from "next/link";
import { Phone, MessageCircle, FileCheck } from "lucide-react";
import { brandData } from "@/data/brand";

export function MobileDock() {
  const cleanPhone = brandData.contact.phone.replace(/[^0-9+]/g, '');
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <nav aria-label="Mobile Navigation Dock" className="bg-[#fbf9f4] docked full-width bottom-0 fixed z-50 md:hidden border-t border-zinc-200 shadow-2xl pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-14 w-full">
        {/* Call Button */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-1 flex-col items-center justify-center bg-black text-white active:opacity-90 transition-opacity"
          aria-label="Call JSM Operations"
        >
          <Phone size={17} className="mb-0.5" />
          <span className="text-[9px] font-bold uppercase tracking-widest">Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center bg-black text-white border-l border-zinc-800 active:opacity-90 transition-opacity"
          aria-label="Chat with JSM on WhatsApp"
        >
          <MessageCircle size={17} className="mb-0.5 text-emerald-400" />
          <span className="text-[9px] font-bold uppercase tracking-widest">WhatsApp</span>
        </a>

        {/* Request Assessment Button */}
        <Link
          href="/contact"
          className="flex flex-1 flex-col items-center justify-center bg-[#C5A880] text-black active:opacity-90 transition-opacity"
          aria-label="Request Site Assessment"
        >
          <FileCheck size={17} className="mb-0.5 text-black" />
          <span className="text-[9px] font-black uppercase tracking-widest">Request</span>
        </Link>
      </div>
    </nav>
  );
}
