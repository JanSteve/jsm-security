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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { navigationData } from "@/data/navigation";
import { cn } from "@/lib/utils";

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

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden w-10 h-10 hover:bg-zinc-100 rounded-full">
          <Menu className="h-5 w-5 text-black" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md bg-white border-l border-zinc-200 p-0 flex flex-col h-full overflow-hidden">
        <SheetHeader className="p-6 text-left border-b border-zinc-200/50">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-black tracking-tight text-black">
              JSM<span className="text-[#C5A880]">.</span>
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full hover:bg-zinc-100 text-black"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <nav className="flex flex-col gap-2">
            <AnimatePresence>
              {open && navigationData.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 24 }}
                >
                  {item.children ? (
                    <Accordion className="w-full border-none">
                      <AccordionItem value={item.title} className="border-none">
                        <AccordionTrigger className="text-lg font-bold hover:text-[#C5A880] text-black py-3 no-underline hover:no-underline transition-colors">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <div className="flex flex-col gap-4 pl-4 border-l border-zinc-200 ml-2 mt-2">
                            {item.children.map((child) => (
                              <div key={child.title} className="flex flex-col gap-2">
                                <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                                  {child.title}
                                </h4>
                                <div className="flex flex-col gap-2">
                                  {child.children?.map((subChild) => (
                                    <Link
                                      key={subChild.title}
                                      href={subChild.href}
                                      onClick={() => setOpen(false)}
                                      className="text-sm font-semibold text-zinc-600 hover:text-[#C5A880] transition-colors py-1"
                                    >
                                      {subChild.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block text-lg font-bold text-black hover:text-[#C5A880] py-3 transition-colors"
                    >
                      {item.title}
                    </Link>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </nav>
        </div>

        <div className="p-6 border-t border-zinc-200 bg-white mt-auto">
          <div className="flex flex-col gap-3">
            <Button asChild variant="outline" className="w-full border-zinc-200 text-zinc-700 hover:bg-zinc-50 h-12 rounded-full font-semibold">
              <Link href="/auth/signin" onClick={() => setOpen(false)}>Client Login</Link>
            </Button>
            <Button asChild className="w-full bg-black hover:bg-zinc-800 text-white font-semibold h-12 rounded-full">
              <Link href="/contact" onClick={() => setOpen(false)}>Get Assessment</Link>
            </Button>
            <div className="flex justify-center gap-6 mt-4">
              <Link href="#" className="text-zinc-400 hover:text-[#C5A880] transition-colors p-2">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-[#C5A880] transition-colors p-2">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-[#C5A880] transition-colors p-2">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
