"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { ChevronDown, Phone, MessageCircle, ArrowRight, Shield, Sparkles, Users, Banknote, Ticket, Building, Monitor, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navigationData } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { brandData } from "@/data/brand";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Sparkles,
  Users,
  Banknote,
  Ticket,
  Building,
  Monitor,
  Palette
};

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
      setActiveMenu(null);
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
        "bg-white/90 backdrop-blur-xl border-b border-zinc-200/80",
        compact ? "py-2.5 shadow-sm" : "py-3.5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5 z-50">
          <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-black text-base shadow-sm group-hover:scale-105 transition-transform">
            JSM
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-black leading-none flex items-center">
              JSM INTEGRATED SERVICES
            </span>
            <span className="text-[10px] font-semibold text-zinc-500 tracking-wider uppercase mt-0.5">
              One Partner. Every Solution.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          {navigationData.map((item) => {
            const hasCategories = Boolean(item.categories && item.categories.length > 0);
            const hasChildren = Boolean(item.children && item.children.length > 0);

            return (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => (hasCategories || hasChildren) && setActiveMenu(item.title)}
                onMouseLeave={() => (hasCategories || hasChildren) && setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 py-2 text-xs font-bold text-zinc-600 hover:text-black tracking-tight transition-colors"
                >
                  {item.title}
                  {(hasCategories || hasChildren) && (
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200 text-zinc-400", activeMenu === item.title && "rotate-180 text-black")} />
                  )}
                </Link>

                {/* Mega Menu Dropdown for Services */}
                {hasCategories && (
                  <AnimatePresence>
                    {activeMenu === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full -left-44 mt-2 w-[760px] bg-white border border-zinc-200/90 rounded-3xl shadow-2xl p-6 grid grid-cols-2 gap-6"
                      >
                        {item.categories?.map((cat) => (
                          <div key={cat.title} className="space-y-3">
                            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
                              {cat.title}
                            </h4>
                            <div className="space-y-1.5">
                              {cat.items.map((sub) => {
                                const IconComponent = sub.icon ? iconMap[sub.icon] || Shield : Shield;
                                return (
                                  <Link
                                    key={sub.title}
                                    href={sub.href}
                                    onClick={() => setActiveMenu(null)}
                                    className="group flex items-start gap-3 p-2.5 rounded-2xl hover:bg-zinc-50 transition-colors"
                                  >
                                    <div className="p-2 bg-zinc-100 rounded-xl text-black group-hover:bg-[#C5A880] group-hover:text-black transition-colors flex-shrink-0">
                                      <IconComponent size={16} />
                                    </div>
                                    <div>
                                      <div className="text-xs font-bold text-black group-hover:text-zinc-900 flex items-center gap-1">
                                        {sub.title}
                                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                      <p className="text-[11px] text-zinc-500 line-clamp-1 leading-snug">
                                        {sub.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Regular Dropdown for Industries */}
                {hasChildren && (
                  <AnimatePresence>
                    {activeMenu === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full -left-12 mt-2 w-64 bg-white border border-zinc-200/90 rounded-2xl shadow-xl p-3 space-y-1"
                      >
                        {item.children?.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            onClick={() => setActiveMenu(null)}
                            className="block px-3 py-2 rounded-xl text-xs font-bold text-zinc-700 hover:text-black hover:bg-zinc-50 transition-colors"
                          >
                            <div>{child.title}</div>
                            {child.description && (
                              <p className="text-[10px] text-zinc-400 font-normal leading-tight mt-0.5">
                                {child.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${brandData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20JSM%20Integrated%20Services,%20I%20need%20a%20site%20assessment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            aria-label="WhatsApp JSM"
          >
            <MessageCircle size={15} className="text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <Button asChild size="sm" className="hidden lg:flex bg-black hover:bg-zinc-800 text-white rounded-full px-4 h-9 text-xs font-bold shadow-sm">
            <Link href="/contact">
              Request Site Assessment
            </Link>
          </Button>

          {/* Mobile Menu Drawer */}
          <div className="xl:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
