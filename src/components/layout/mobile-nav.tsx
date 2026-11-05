"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { navigationData } from "@/data/navigation";
import { brandData } from "@/data/brand";

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const prevIsOpenRef = React.useRef(false);

  // Return focus to hamburger trigger button when dialog closes
  React.useEffect(() => {
    if (!isOpen && prevIsOpenRef.current) {
      triggerRef.current?.focus();
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  // Focus trap, initial focus placement, Escape key listener, and body scroll lock
  React.useEffect(() => {
    if (!isOpen) return;

    // Move initial focus to the Close button inside the modal dialog
    const focusTimer = setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      } else if (dialogRef.current) {
        const firstFocusable = dialogRef.current.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }
    }, 10);

    // Keyboard focus-trap handler for Tab, Shift+Tab, and Escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key === "Tab") {
        if (!dialogRef.current) return;

        // Query all interactive focusable elements inside the dialog
        const focusableNodes = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const focusableElements = Array.from(focusableNodes).filter(
          (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
        );

        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        // Shift + Tab: reverse cycle from first element to last element
        if (event.shiftKey) {
          if (activeElement === firstElement || !dialogRef.current.contains(activeElement)) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: forward cycle from last element to first element
          if (activeElement === lastElement || !dialogRef.current.contains(activeElement)) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="mobile-nav-overlay"
        aria-label="Open main navigation menu"
        data-nav-toggle="true"
        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#0E1116]/15 bg-[#F6F3EE] hover:bg-[#FFFFFF] text-[#0E1116] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1116] focus-visible:ring-offset-2"
      >
        <Menu className="w-5 h-5 text-[#0E1116]" strokeWidth={2} />
      </button>

      {/* Full-Width Mobile Navigation Overlay (Modal Dialog with Focus-Trap) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dialogRef}
            id="mobile-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            data-focus-trap="true"
            data-nav-overlay="true"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-[#F6F3EE] flex flex-col w-full max-w-full h-[100dvh] overflow-y-auto overflow-x-hidden pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
          >
            {/* Header: Brand + Close Button */}
            <div className="flex items-center justify-between px-5 sm:px-8 h-20 border-b border-[#0E1116]/10 shrink-0">
              <Link
                href="/"
                onClick={handleClose}
                className="flex items-center gap-3 min-h-[44px] min-w-[44px] rounded-lg px-2 -mx-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1116] focus-visible:ring-offset-2 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0E1116] text-[#F6F3EE] flex items-center justify-center overflow-hidden shrink-0 border border-[#0E1116]/15 shadow-xs">
                  <Image
                    src="/images/jsm_logo_black.png"
                    alt=""
                    aria-hidden="true"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-medium text-base tracking-tight text-[#0E1116] leading-tight">
                    JSM Integrated Services
                  </span>
                  <span className="text-[11px] text-[#525866] font-sans">
                    Executive Talent Acquisition
                  </span>
                </div>
              </Link>

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label="Close navigation menu"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#0E1116]/15 bg-transparent hover:bg-[#FFFFFF] text-[#0E1116] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1116] focus-visible:ring-offset-2"
              >
                <X className="w-5 h-5 text-[#0E1116]" strokeWidth={2} />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 px-5 sm:px-8 py-6 flex flex-col justify-between overflow-y-auto overflow-x-hidden">
              <nav aria-label="Mobile Navigation Links" className="divide-y divide-[#0E1116]/10">
                {navigationData.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={handleClose}
                    className="py-4 text-2xl font-heading font-medium text-[#0E1116] hover:text-[#C8553D] flex items-center justify-between transition-colors min-h-[48px] rounded-md px-2 -mx-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1116] group"
                  >
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#525866] group-hover:text-[#C8553D] transition-colors" />
                  </Link>
                ))}
              </nav>

              {/* Action Cluster & Verified Business Details */}
              <div className="pt-8 space-y-4 shrink-0">
                {/* Primary Conversion CTA */}
                <Link
                  href="/#contact"
                  onClick={handleClose}
                  className="w-full h-12 min-h-[44px] min-w-[44px] px-6 rounded-full bg-[#0E1116] text-[#FFFFFF] hover:bg-[#C8553D] flex items-center justify-center font-sans font-medium text-sm transition-all duration-200 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8553D] focus-visible:ring-offset-2"
                >
                  Hire Executive Talent
                </Link>

                {/* Direct Verified Phone Button (min 44px x 44px touch target) */}
                <a
                  href={`tel:${brandData.contact.phone}`}
                  className="w-full h-12 min-h-[44px] min-w-[44px] px-4 rounded-full border border-[#0E1116]/20 bg-transparent hover:bg-[#FFFFFF] text-[#0E1116] flex items-center justify-center font-sans font-semibold text-sm tabular-nums gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1116] focus-visible:ring-offset-2"
                  aria-label={`Call ${brandData.contact.phoneDisplay} - Executive Search Desk`}
                >
                  <Phone size={14} className="text-[#C8553D]" aria-hidden="true" />
                  <span>Call {brandData.contact.phoneDisplay}</span>
                </a>

                {/* Verified Corporate Contact Info Card */}
                <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#0E1116]/10 space-y-3 text-xs text-[#525866]">
                  {/* Verified Contact Email Link (min 44px x 44px touch target with visible focus ring) */}
                  <a
                    href="mailto:contact@jsmintegratedservices.com"
                    className="flex items-center gap-2.5 text-[#0E1116] font-medium min-h-[44px] min-w-[44px] px-3 py-2.5 -mx-1.5 rounded-lg bg-[#F6F3EE]/50 hover:bg-[#F6F3EE] hover:text-[#C8553D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1116] focus-visible:ring-offset-1 group"
                    aria-label="Send email to contact@jsmintegratedservices.com"
                  >
                    <Mail size={15} className="text-[#C8553D] shrink-0 group-hover:scale-105 transition-transform" aria-hidden="true" />
                    <span className="hover:underline break-all">contact@jsmintegratedservices.com</span>
                  </a>

                  <p className="leading-relaxed text-[#525866]">
                    Door No. 87, Plot No. 112, Gandhi Nagar, Kottapattu, Tiruchirappalli - 620021
                  </p>
                  <p className="text-[11px] text-[#525866] border-t border-[#0E1116]/10 pt-2">
                    Serving employers across Tamil Nadu, Karnataka, Maharashtra, Delhi, Madhya Pradesh &amp; Gujarat.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
