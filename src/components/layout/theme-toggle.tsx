"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="w-12 h-12" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-12 h-12 rounded-full"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          scale: theme === "dark" ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="relative flex items-center justify-center w-full h-full"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-[#D4AF37]" />
        ) : (
          <Moon className="h-5 w-5 text-[#2563EB]" />
        )}
      </motion.div>
    </Button>
  );
}
