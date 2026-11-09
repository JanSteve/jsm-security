"use client";

import * as React from "react";
import { MessageSquare, Phone, Mail, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

export function FloatingExecutiveDesk() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  // Show floating widget only after scrolling past the first fold (150px)
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Action Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="mb-3 w-[290px] sm:w-[320px] bg-white border border-[#0E1116]/12 rounded-2xl shadow-xl overflow-hidden p-4 text-[#0E1116] relative"
          >
            <BorderBeam size={180} duration={12} colorFrom="#1F4E5F" colorTo="#C8553D" />
            <div className="flex items-center justify-between pb-3 border-b border-[#0E1116]/8 mb-3">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1F4E5F] block">
                  JSM Executive Desk
                </span>
                <span className="text-xs font-semibold text-[#0E1116]">
                  Average Response: &lt; 30 Mins
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-[#F6F3EE] hover:bg-[#EAE5DC] flex items-center justify-center text-[#525866] transition-colors"
                aria-label="Close desk menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-[#525866] leading-relaxed mb-4">
              Connect directly with our Principal Consultant for mandate briefings or confidential candidate placement.
            </p>

            <div className="space-y-2">
              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/919080863448?text=Hello%20JSM%20Executive%20Desk,%20I%20would%20like%20to%20discuss%20an%20executive%20mandate%20or%20senior%20role."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#0E1116] transition-colors group min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <MessageSquare className="w-4 h-4 fill-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-semibold block leading-tight">Chat on WhatsApp</span>
                    <span className="text-[10px] text-[#525866]">+91 90808 63448</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#525866] group-hover:text-[#0E1116] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Direct Phone Call */}
              <a
                href="tel:+919080863448"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6F3EE] hover:bg-[#EAE5DC] border border-[#0E1116]/8 text-[#0E1116] transition-colors group min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1F4E5F] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-semibold block leading-tight">Direct Phone Call</span>
                    <span className="text-[10px] text-[#525866]">Immediate Executive Hotline</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#525866] group-hover:text-[#0E1116] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Outlook Email */}
              <a
                href="mailto:jsmintegratedservices@outlook.com?subject=Confidential%20Executive%20Enquiry%20%E2%80%94%20JSM"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6F3EE] hover:bg-[#EAE5DC] border border-[#0E1116]/8 text-[#0E1116] transition-colors group min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C8553D] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-semibold block leading-tight">Email Executive Desk</span>
                    <span className="text-[10px] text-[#525866]">jsmintegratedservices@outlook.com</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#525866] group-hover:text-[#0E1116] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button (Closer.ai signature circle style) */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4E5F] focus-visible:ring-offset-2",
          isOpen ? "bg-[#0E1116] text-white" : "bg-[#1F4E5F] text-white hover:bg-[#163845]"
        )}
        aria-label="Toggle executive contact desk"
        aria-expanded={isOpen}
      >
        {/* Glowing pulse indicator for live status */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366] border-2 border-white" />
        </span>

        {isOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <MessageSquare className="w-6 h-6 fill-current" aria-hidden="true" />
        )}
      </motion.button>
    </div>
  );
}
