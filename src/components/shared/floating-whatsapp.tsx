"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { brandData } from "@/data/brand";

export function FloatingWhatsApp() {
  const encodedMsg = encodeURIComponent(
    "Hi JSM, I'm interested in security guarding and facility management for my facility. Can you send me a quick quote?"
  );
  const whatsappUrl = `https://wa.me/${brandData.contact.whatsapp}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Consultation with JSM Operations Desk"
        className="w-[56px] h-[56px] rounded-full bg-[#10A870] hover:bg-[#0D875A] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 press-scale group relative"
      >
        <MessageSquare size={26} className="fill-current" />
        
        {/* Tooltip Hover Bubble */}
        <div className="absolute right-full mr-3.5 px-3 py-1.5 bg-[#0F1922] text-white text-xs font-semibold rounded-[4px] shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          <span>WhatsApp Operations Desk</span>
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-[#0F1922]" />
        </div>
      </a>
    </div>
  );
}
