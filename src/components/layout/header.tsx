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
        "bg-background/80 backdrop-blur-xl border-b border-border/50",
        compact ? "py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="group relative z-50">
          <h1 className="text-2xl font-bold tracking-tighter text-foreground">
            JSM<span className="text-primary group-hover:text-[#D4AF37] transition-colors duration-300">.</span>
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
                className="group flex items-center gap-1 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
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
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#D4AF37] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
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
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-screen max-w-5xl bg-background/95 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl p-6"
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
                            <Link href={category.href} className="text-base font-bold text-foreground hover:text-[#D4AF37] transition-colors" onClick={() => setActiveMenu(null)}>
                              {category.title}
                            </Link>
                            <div className="flex flex-col gap-2">
                              {category.children?.map((service) => (
                                <Link
                                  key={service.title}
                                  href={service.href}
                                  onClick={() => setActiveMenu(null)}
                                  className="group/link flex flex-col p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                  <span className="text-sm font-medium text-foreground/80 group-hover/link:text-foreground">
                                    {service.title}
                                  </span>
                                  <span className="text-xs text-muted-foreground line-clamp-1">
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
            <Button asChild variant="outline" className="border-border hover:bg-accent h-10 px-4">
              <Link href="/auth/signin">Client Login</Link>
            </Button>
            <Button asChild className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A1128] font-semibold h-10 px-4">
              <Link href="/contact">Get Assessment</Link>
            </Button>
          </div>
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
