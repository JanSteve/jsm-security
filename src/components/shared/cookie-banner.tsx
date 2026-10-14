"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 bg-[#080C16]/95 backdrop-blur-2xl border border-cyan-500/30 text-white rounded-2xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(14,165,233,0.2)]"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8] animate-pulse" />
            <h4 className="text-base font-bold text-white tracking-tight">Cookie Preferences</h4>
          </div>
          <p className="text-xs text-neutral-300 font-normal mb-5 leading-relaxed">
            We use essential cookies to maintain operational security, optimize performance, and analyze platform traffic in full compliance with statutory data governance.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 sm:justify-end">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-neutral-300 hover:text-white rounded-lg text-xs font-semibold min-h-[44px] w-full sm:w-auto transition-colors"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="btn-tactical-beam rounded-lg text-xs font-bold min-h-[44px] w-full sm:w-auto px-5"
            >
              Accept All
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
