"use client";

import Link from "next/link";
import { Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { brandData } from "@/data/brand";

export function MobileDock() {
  const cleanPhone = brandData.contact.phone.replace(/[^0-9+]/g, '');
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <nav aria-label="Mobile Navigation Dock" className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-zinc-200/80 px-4 py-2.5 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] shadow-lg transition-all">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Call Quick Link */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex-1 flex items-center justify-center gap-1.5 h-10 px-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold border border-zinc-200 transition-colors"
          aria-label="Call JSM Operations"
        >
          <Phone size={14} className="text-zinc-700" />
          <span>Call</span>
        </a>

        {/* Minimalist Subtle WhatsApp Link */}
        <a
          href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 h-10 px-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold border border-zinc-200 transition-colors"
          aria-label="Chat with JSM on WhatsApp"
        >
          <MessageCircle size={14} className="text-zinc-700" />
          <span>WhatsApp</span>
        </a>

        {/* Sleek Request Quote Action */}
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-1 h-10 px-3 rounded-full bg-black text-white text-xs font-bold shadow-sm hover:bg-zinc-800 transition-colors"
          aria-label="Request Site Assessment"
        >
          <span>Get Quote</span>
          <ArrowUpRight size={13} className="text-[#C5A880]" />
        </Link>
      </div>
    </nav>
  );
}
