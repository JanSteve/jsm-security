"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TimedPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user already submitted in this session
    const hasSubmitted = sessionStorage.getItem("jsm_popup_submitted");
    if (hasSubmitted) return;

    let timer: NodeJS.Timeout;

    const triggerPopup = () => {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 12000); // Trigger every 12 seconds
    };

    triggerPopup();

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact || contact.trim().length < 5) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsSubmitted(true);
    sessionStorage.setItem("jsm_popup_submitted", "true");

    // Close after 3 seconds on success
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-[28px] p-6 shadow-2xl border border-black/[0.08]"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-[#0071e3]">
              <Shield className="h-5 w-5 fill-current opacity-20" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Active Advisor Standby</span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-black/[0.04] rounded-full text-zinc-400 hover:text-black transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-[#1d1d1f] leading-tight mb-1">
                  Ready to elevate your operations?
                </h4>
                <p className="text-xs text-[#86868b] font-normal leading-relaxed">
                  Submit your contact info and a senior JSM security or facility advisor will contact you within 15 minutes.
                </p>
              </div>

              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Email address..."
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="h-10 bg-[#f5f5f7] border-black/[0.08] focus-visible:border-[#0071e3] focus-visible:ring-2 focus-visible:ring-[#0071e3]/20 rounded-2xl text-xs text-[#1d1d1f]"
                />
                {error && <p className="text-[10px] text-rose-500 font-medium">{error}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0071e3] text-white hover:bg-[#0077ed] font-semibold h-10 rounded-full text-xs flex items-center justify-center gap-2 group shadow-sm min-h-[44px]"
              >
                Schedule Assessment <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-3"
            >
              <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-500 rounded-full">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-base font-bold text-black">Callback Scheduled</h4>
              <p className="text-xs text-zinc-500 font-medium max-w-xs mx-auto">
                Thank you. An advisor will contact you shortly.
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
