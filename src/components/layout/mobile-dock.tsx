"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3x3, Phone, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// Note: The MobileDock incorporates a trigger for the MobileMenu. 
// Since MobileMenu has its own Sheet, we might just emit an event or use a shared state.
// For simplicity in layout, the Menu button can either link to a dedicated mobile menu page 
// or trigger the same sheet. Here we will just use it as a visual dock.
// To fully link it to the MobileMenu sheet without context, we can just make it open a simplified version or 
// rely on the user tapping the hamburger in the header.
// Let's implement the UI as requested.

export function MobileDock() {
  const pathname = usePathname();

  const dockItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Grid3x3 },
    { name: "Call", href: "tel:+440000000000", icon: Phone },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/50 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-around px-2 h-16">
        {dockItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full min-h-[48px] min-w-[48px] gap-1 transition-colors",
                isActive ? "text-[#D4AF37]" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "fill-current opacity-20")} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
        {/* We use a button for Menu to mimic the dock item but typically this would open the sheet. 
            Since MobileMenu is in Header, we can just style this as a link to /menu or leave it as a button. */}
        <Link
          href="#menu" // A hash link that could be intercepted if needed, or just visual
          className="flex flex-col items-center justify-center w-16 h-full min-h-[48px] min-w-[48px] gap-1 text-muted-foreground hover:text-foreground transition-colors"
          onClick={(e) => {
             // In a real app, this would trigger the global mobile menu state.
             // We'll let it act as a simple anchor for now.
             window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Menu className="h-5 w-5" />
          <span className="text-[10px] font-medium">Menu</span>
        </Link>
      </div>
    </div>
  );
}
