"use client";

import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────────
   GALACTIC backdrop — the far side of the hyperspace jump.

   Where /about is synthwave-neon (pink sun, synth grid, katakana), this is a
   different galaxy entirely: a deep-field of drifting nebulae, twinkling
   starfields, the occasional supernova flare, a new blue-gold sun, and a
   Gargantua-class black hole bending the light around it. Quiet and elegant —
   you've arrived somewhere new.
   ────────────────────────────────────────────────────────────────────────── */

/* A distant star that periodically goes supernova: a calm point that flares
   into a bright burst with a brief expanding shockwave ring, then settles. */
function Supernova({
  className,
  delay = 0,
  hue = "rgba(180,210,255,1)",
}: {
  className: string;
  delay?: number;
  hue?: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      {/* core flare */}
      <motion.div
        className="h-2 w-2 rounded-full"
        style={{ background: hue, boxShadow: `0 0 8px 2px ${hue}` }}
        animate={{
          scale: [1, 1, 6, 2.4, 1],
          opacity: [0.5, 0.5, 1, 0.7, 0.5],
        }}
        transition={{
          duration: 9,
          times: [0, 0.55, 0.62, 0.72, 1],
          repeat: Infinity,
          repeatDelay: 11,
          delay,
          ease: "easeOut",
        }}
      />
      {/* shockwave ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: `1px solid ${hue}` }}
        animate={{ scale: [0, 0, 14], opacity: [0, 0.8, 0] }}
        transition={{
          duration: 9,
          times: [0, 0.62, 1],
          repeat: Infinity,
          repeatDelay: 11,
          delay,
          ease: "easeOut",
        }}
      />
    </div>
  );
}

/* Gargantua — the elegant centrepiece. A rotating accretion disk lensed into
   a halo over the top, wrapped around a pitch-black event horizon. */
function Gargantua() {
  return (
    <div className="absolute right-[-6rem] top-16 h-[34rem] w-[34rem] sm:right-2 sm:top-10">
      {/* faint gravitational glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,210,140,0.10), transparent 62%)",
          filter: "blur(8px)",
        }}
      />
      {/* rotating accretion disk */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #fff3d6 0deg, #ffd27f 26deg, #ffae53 90deg, #b06a2c 150deg, transparent 200deg, #ffe3a8 312deg, #fff3d6 360deg)",
          maskImage:
            "radial-gradient(circle, transparent 40%, black 42%, black 53%, transparent 58%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 40%, black 42%, black 53%, transparent 58%)",
          filter: "blur(1.5px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      {/* lensed light arc bent over the top (the Interstellar halo) */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "0 0 60px 10px rgba(255,200,120,0.35), inset 0 0 30px 4px rgba(255,220,160,0.25)",
          maskImage:
            "radial-gradient(circle, transparent 53%, black 55%, transparent 62%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 53%, black 55%, transparent 62%)",
        }}
      />
      {/* event horizon — the dark heart */}
      <div className="absolute inset-[35%] rounded-full bg-black shadow-[0_0_50px_18px_#000]" />
    </div>
  );
}

export function GalacticBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#03030a]">
      {/* deep-field wash — cold indigo bleeding into black */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_70%_-10%,rgba(78,46,150,0.30),transparent_55%),radial-gradient(110%_70%_at_15%_110%,rgba(20,90,120,0.28),transparent_60%)]" />

      {/* drifting nebula clouds */}
      <motion.div
        className="absolute -left-32 top-1/4 h-[42rem] w-[42rem] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(150,80,220,0.45), rgba(80,40,140,0.18) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: [0, 60, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10rem] bottom-[-8rem] h-[46rem] w-[46rem] rounded-full opacity-55"
        style={{
          background:
            "radial-gradient(circle, rgba(35,180,200,0.40), rgba(20,110,150,0.15) 45%, transparent 70%)",
          filter: "blur(46px)",
        }}
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 46, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 bottom-1/4 h-[34rem] w-[34rem] rounded-full opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(230,80,160,0.35), rgba(150,40,110,0.12) 50%, transparent 72%)",
          filter: "blur(52px)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 52, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* twinkling starfields (two parallax layers) */}
      <div className="galaxy-stars" />
      <div className="galaxy-stars galaxy-stars--far" />

      {/* a few stars going supernova */}
      <Supernova className="left-[18%] top-[22%]" delay={0} hue="rgba(190,215,255,1)" />
      <Supernova className="left-[62%] top-[58%]" delay={6} hue="rgba(255,225,180,1)" />
      <Supernova className="left-[40%] top-[14%]" delay={14} hue="rgba(210,190,255,1)" />

      {/* the new sun — a distant blue-gold star, nothing like the pink one back home */}
      <motion.div
        className="absolute left-[8%] top-[16%] h-28 w-28 rounded-full sm:h-36 sm:w-36"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, #ffffff, #cfe6ff 38%, #7db4ff 62%, #2f6ad0)",
          boxShadow:
            "0 0 70px 16px rgba(125,180,255,0.55), 0 0 160px 48px rgba(80,120,220,0.30)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.92, 1, 0.92] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Gargantua */}
      <Gargantua />

      {/* deep vignette to settle the edges */}
      <div className="absolute inset-0 [box-shadow:inset_0_0_240px_90px_rgba(0,0,0,0.9)]" />
    </div>
  );
}
