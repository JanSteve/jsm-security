"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle, ArrowRight, Shield } from "lucide-react";
import { navigationData } from "@/data/navigation";
import { brandData } from "@/data/brand";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const [expandedSection, setExpandedSection] = React.useState<string | null>("Services");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 hover:bg-zinc-100 rounded-full">
          <Menu className="h-5 w-5 text-black" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md bg-white border-l border-zinc-200 p-0 flex flex-col h-full overflow-hidden">
        <SheetHeader className="p-5 text-left border-b border-zinc-200/60 flex flex-row items-center justify-between">
          <SheetTitle className="text-base font-black tracking-tight text-black flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
              JSM
            </div>
            JSM INTEGRATED SERVICES
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 rounded-full hover:bg-zinc-100 text-black"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Quick CTA banner */}
          <div className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-black">Need immediate support?</p>
              <p className="text-[11px] text-zinc-500">24/7 Operations Desk</p>
            </div>
            <a
              href={`https://wa.me/${brandData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20JSM%20Integrated%20Services,%20I%20need%20assistance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>

          <nav className="flex flex-col space-y-1">
            {navigationData.map((item) => {
              const hasCategories = Boolean(item.categories && item.categories.length > 0);
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isExpandable = hasCategories || hasChildren;
              const isExpanded = expandedSection === item.title;

              if (!isExpandable) {
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="py-2.5 px-3 rounded-xl text-sm font-bold text-zinc-800 hover:text-black hover:bg-zinc-100 transition-colors flex items-center justify-between"
                  >
                    {item.title}
                    <ArrowRight size={14} className="text-zinc-400" />
                  </Link>
                );
              }

              return (
                <div key={item.title} className="border-b border-zinc-100 pb-1">
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : item.title)}
                    className="w-full py-2.5 px-3 rounded-xl text-sm font-bold text-black flex items-center justify-between hover:bg-zinc-50 transition-colors"
                  >
                    <span>{item.title}</span>
                    <span className="text-xs font-bold text-zinc-400">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-3 pr-1 py-2 space-y-3"
                      >
                        {hasCategories && item.categories?.map((cat) => (
                          <div key={cat.title} className="space-y-1.5">
                            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#C5A880] pl-2">
                              {cat.title}
                            </p>
                            <div className="space-y-1">
                              {cat.items.map((sub) => (
                                <Link
                                  key={sub.title}
                                  href={sub.href}
                                  onClick={() => setOpen(false)}
                                  className="block py-2 px-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-xs font-bold text-zinc-800 transition-colors"
                                >
                                  <div>{sub.title}</div>
                                  <p className="text-[10px] text-zinc-500 font-normal leading-snug mt-0.5">
                                    {sub.description}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}

                        {hasChildren && (
                          <div className="space-y-1">
                            {item.children?.map((child) => (
                              <Link
                                key={child.title}
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="block py-2 px-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-xs font-bold text-zinc-800 transition-colors"
                              >
                                <div>{child.title}</div>
                                {child.description && (
                                  <p className="text-[10px] text-zinc-500 font-normal leading-snug mt-0.5">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-zinc-200/80 bg-zinc-50 space-y-3">
          <Button asChild className="w-full bg-black hover:bg-zinc-800 text-white rounded-2xl h-11 text-xs font-bold shadow-md">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Request Site Assessment
            </Link>
          </Button>

          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium px-1">
            <span>{brandData.contact.primaryCity}, Tamil Nadu</span>
            <a href={`tel:${brandData.contact.phone.replace(/[^0-9+]/g, '')}`} className="font-bold text-zinc-800 hover:underline">
              {brandData.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
