"use client";

import { motion } from "framer-motion";

/**
 * Ambient animated backdrop: a faint grid + slowly drifting aurora blobs.
 * `accent` tints the dominant blob to match the active persona.
 */
export function AnimatedBackground({ accent = "#8b5cf6" }: { accent?: string }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <motion.div
        className="aurora h-[40rem] w-[40rem]"
        style={{ background: accent, top: "-10rem", left: "-8rem" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora h-[34rem] w-[34rem]"
        style={{ background: "#22d3ee", bottom: "-12rem", right: "-6rem", opacity: 0.35 }}
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora h-[26rem] w-[26rem]"
        style={{ background: "#ec4899", top: "30%", right: "20%", opacity: 0.25 }}
        animate={{ x: [0, 40, -40, 0], y: [0, 50, -20, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
