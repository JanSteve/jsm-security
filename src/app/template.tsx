"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { springSmooth } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ ...springSmooth, duration: 0.5 }}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}
