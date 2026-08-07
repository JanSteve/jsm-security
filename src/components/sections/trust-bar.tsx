'use client';

import { Shield } from 'lucide-react';

const ACCREDITATIONS = [
  'SIA Approved Contract',
  'ISO 9001 Quality',
  'ISO 27001 Security',
  'NSI Gold Standard',
  'SafeContractor Vetted',
  'BSIA Active Member',
  'Cyber Essentials Certified'
];

export function TrustBar() {
  return (
    <section className="py-10 bg-zinc-50 border-y border-zinc-200/80 overflow-hidden relative z-10">
      <div className="container mx-auto px-4 mb-4 text-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          Corporate Vetting & Accreditations
        </span>
      </div>
      
      <div className="relative w-full flex overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {/* Double content for infinite scroll effect */}
          {[...ACCREDITATIONS, ...ACCREDITATIONS, ...ACCREDITATIONS].map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 mx-10 text-zinc-500 font-semibold"
            >
              <Shield className="w-4 h-4 text-[#C5A880] opacity-80" />
              <span className="text-sm tracking-tight">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
