"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navigationData } from "@/data/navigation";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setCompact(true);
    } else {
      setCompact(false);
    }

    if (latest > 150 && latest > previous) {
      setHidden(true);
      setActiveMenu(null); // Close menu on scroll down
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        "bg-white/75 backdrop-blur-md border-b border-zinc-200/40",
        compact ? "py-2.5" : "py-4.5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="group relative z-50">
          <h1 className="text-xl font-black tracking-tight text-black">
            JSM<span className="text-[#C5A880]">.</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navigationData.map((item) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => item.children && setActiveMenu(item.title)}
              onMouseLeave={() => item.children && setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className="group flex items-center gap-1 py-2 text-xs font-semibold text-zinc-500 hover:text-black tracking-tight transition-colors"
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault();
                    setActiveMenu(activeMenu === item.title ? null : item.title);
                  }
                }}
              >
                {item.title}
                {item.children && (
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", activeMenu === item.title && "rotate-180")} />
                )}
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C5A880] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>

              {/* Mega Menu Dropdown */}
              {item.children && (
                <AnimatePresence>
                  {activeMenu === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-screen max-w-5xl bg-white/95 backdrop-blur-2xl border border-zinc-200/60 rounded-3xl shadow-xl p-8"
                    >
                      <div className="grid grid-cols-4 gap-6">
                        {item.children.map((category, idx) => (
                          <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 + 0.1 }}
                            className="flex flex-col gap-3"
                          >
                            <Link href={category.href} className="text-sm font-bold text-black hover:text-[#C5A880] transition-colors" onClick={() => setActiveMenu(null)}>
                              {category.title}
                            </Link>
                            <div className="flex flex-col gap-2">
                              {category.children?.map((service) => (
                                <Link
                                  key={service.title}
                                  href={service.href}
                                  onClick={() => setActiveMenu(null)}
                                  className="group/link flex flex-col p-2.5 -mx-2.5 rounded-2xl hover:bg-zinc-50 transition-colors"
                                >
                                  <span className="text-xs font-bold text-zinc-800 group-hover/link:text-[#C5A880] transition-colors">
                                    {service.title}
                                  </span>
                                  <span className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                                    {service.description}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="outline" className="border-zinc-200 text-zinc-700 hover:bg-zinc-50 h-10 px-4 rounded-full text-xs font-semibold">
              <Link href="/auth/signin">Client Login</Link>
            </Button>
            <Button asChild className="bg-black hover:bg-zinc-800 text-white font-semibold h-10 px-4 rounded-full text-xs">
              <Link href="/contact">Get Assessment</Link>
            </Button>
          </div>
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
