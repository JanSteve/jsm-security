'use client';

import { Shield } from 'lucide-react';

const ACCREDITATIONS = [
  'SIA Approved',
  'ISO 9001',
  'ISO 27001',
  'NSI Gold',
  'SafeContractor',
  'BSIA Member',
  'Cyber Essentials'
];

export function TrustBar() {
  return (
    <section className="py-8 bg-muted overflow-hidden border-y border-border">
      <div className="container mx-auto px-4 mb-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Trusted & Accredited
        </span>
      </div>
      
      <div className="relative w-full flex overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {/* Double content for infinite scroll effect */}
          {[...ACCREDITATIONS, ...ACCREDITATIONS, ...ACCREDITATIONS].map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 mx-8 text-muted-foreground"
            >
              <Shield className="w-5 h-5 opacity-70" />
              <span className="font-medium">{item}</span>
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
