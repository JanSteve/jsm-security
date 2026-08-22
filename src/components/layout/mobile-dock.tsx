"use client";

import Link from "next/link";
import { Phone, MessageCircle, FileCheck, Shield } from "lucide-react";
import { brandData } from "@/data/brand";

export function MobileDock() {
  const cleanPhone = brandData.contact.phone.replace(/[^0-9+]/g, '');
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <nav aria-label="Mobile Quick Actions" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-zinc-200/80 px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-2xl text-xs font-bold transition-all min-h-[48px] border border-zinc-200"
          aria-label="Call JSM Integrated Services"
        >
          <Phone size={16} className="text-zinc-800" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20discuss%20an%20operational%20requirement.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all min-h-[48px] shadow-sm"
          aria-label="Chat with JSM on WhatsApp"
        >
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </a>

        {/* Request Quote Button */}
        <Link
          href="/contact"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-black hover:bg-zinc-800 text-white rounded-2xl text-xs font-bold transition-all min-h-[48px] shadow-sm"
          aria-label="Request Site Assessment"
        >
          <FileCheck size={16} className="text-[#C5A880]" />
          <span>Get Quote</span>
        </Link>
      </div>
    </nav>
  );
}
