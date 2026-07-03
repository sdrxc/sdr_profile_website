"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/* Thin gradient strip pinned to the top of the viewport that reflects overall
   page scroll progress. */
export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.6 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0 50%" }}
      className="fixed left-0 right-0 top-0 z-40 h-[2px] bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink"
    />
  );
}
