"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsOpen(true);
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
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-[#121C3B]/95 backdrop-blur border border-border rounded-2xl p-6 shadow-2xl"
        >
          <h4 className="text-lg font-bold text-[#F8F9FA] mb-2">Cookie Preferences</h4>
          <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed">
            We use cookies to optimize our website, analyze traffic, and personalize content. 
            By clicking "Accept", you agree to our cookie policy.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="border-[#1A264D] text-[#94A3B8] hover:text-[#F8F9FA] hover:bg-[#1A264D] rounded-full"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-[#D4AF37] text-[#0A1128] hover:bg-[#C9A227] font-semibold rounded-full"
            >
              Accept All
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
