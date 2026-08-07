"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#0A1128] text-white pt-20 pb-24 md:pb-10 border-t border-border/10"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Company Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold tracking-tighter mb-4">
              JSM<span className="text-[#D4AF37]">.</span>
            </h2>
            <p className="text-[#D4AF37] font-semibold mb-4">Secure. Integrated. Elevated.</p>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Premium corporate security and integrated facility services tailored for modern enterprises.
            </p>
          </div>

          {/* Column 2: Security Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Security Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services/security/manned-guarding" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Manned Guarding</Link></li>
              <li><Link href="/services/security/cctv" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">CCTV Surveillance</Link></li>
              <li><Link href="/services/security/access-control" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Access Control</Link></li>
              <li><Link href="/services/security/cybersecurity" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Cybersecurity</Link></li>
            </ul>
          </div>

          {/* Column 3: Integrated Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Integrated Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services/facilities" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Facilities Management</Link></li>
              <li><Link href="/services/digital-creative" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Digital & Creative</Link></li>
              <li><Link href="/services/events-property/event-security" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Event Security</Link></li>
              <li><Link href="/services/events-property/management" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Property Management</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">About Us</Link></li>
              <li><Link href="/careers" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Careers</Link></li>
              <li><Link href="/insights" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Blog & Insights</Link></li>
              <li><Link href="/case-studies" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Case Studies</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Column 5: Legal & Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Legal & Contact</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Cookie Policy</Link></li>
              <li className="pt-2"><a href="tel:+440000000000" className="text-white hover:text-[#D4AF37] transition-colors text-sm font-medium">+44 (0) 000 000 0000</a></li>
              <li><a href="mailto:info@jsmsecurity.com" className="text-white hover:text-[#D4AF37] transition-colors text-sm font-medium">info@jsmsecurity.com</a></li>
            </ul>
          </div>
        </div>

        {/* Accreditations */}
        <div className="flex flex-wrap items-center gap-6 py-8 border-t border-white/10">
          <span className="text-sm font-bold text-white/40 uppercase tracking-widest">Accreditations:</span>
          <span className="px-3 py-1 bg-white/5 rounded text-xs font-semibold text-white/80">SIA Approved</span>
          <span className="px-3 py-1 bg-white/5 rounded text-xs font-semibold text-white/80">ISO 9001</span>
          <span className="px-3 py-1 bg-white/5 rounded text-xs font-semibold text-white/80">NSI Gold</span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} JSM Security and Integrated Services. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <motion.a href="#" whileHover={{ scale: 1.1 }} className="text-white/60 hover:text-[#D4AF37]">
              <Linkedin className="h-5 w-5" />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.1 }} className="text-white/60 hover:text-[#D4AF37]">
              <Twitter className="h-5 w-5" />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.1 }} className="text-white/60 hover:text-[#D4AF37]">
              <Instagram className="h-5 w-5" />
            </motion.a>
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={scrollToTop}
            className="text-white/60 hover:text-[#D4AF37] hover:bg-white/5 hidden md:flex items-center gap-2"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.footer>
  );
}
