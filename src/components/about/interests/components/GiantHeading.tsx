"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* Oversized display heading that fades/slides up the first time it scrolls
   into view. Shared by every scene's text column. */
export function GiantHeading({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 font-display text-[2rem] font-black leading-[1.06] tracking-tight text-white [overflow-wrap:break-word] xs:text-[2.6rem] xs:leading-[1] sm:text-6xl sm:leading-[0.95] md:text-7xl"
    >
      {children}
    </motion.h2>
  );
}
