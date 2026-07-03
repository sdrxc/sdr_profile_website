"use client";

import { motion } from "framer-motion";

/* Chapter 00 — Arrival (hero) */
export function ArrivalScene() {
  return (
    <section
      id="arrive"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/90 xs:text-[11px] xs:tracking-[0.5em]"
      >
        Atlas of Curiosities
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 font-display text-[2.5rem] font-black leading-[1.04] tracking-tight text-white [overflow-wrap:break-word] xs:text-5xl xs:leading-[0.98] sm:text-7xl sm:leading-[0.95] md:text-[6.5rem]"
        style={{ textShadow: "0 0 40px rgba(125, 180, 255, 0.25)" }}
      >
        Welcome to <span className="neon-cyan-text">Gargantua</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.05, duration: 0.8 }}
        className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base"
      >
        An alternate universe where engineering, philosophy, and professional nonsense coexist in unstable equilibrium.
        Eight stops, one scroll.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/45"
      >
        <span>scroll to depart</span>
        <motion.span
          animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-base"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
