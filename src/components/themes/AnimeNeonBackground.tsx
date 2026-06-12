"use client";

import { motion } from "framer-motion";
import { AnimePetals } from "./AnimePetals";

export function AnimeNeonBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#070710]">
      {/* deep gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(177,77,255,0.22),transparent_55%),radial-gradient(100%_60%_at_50%_110%,rgba(0,240,255,0.18),transparent_60%)]" />

      {/* rising sun — anchored to the RIGHT edge so it never sits behind the text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 sm:translate-x-1/4">
        {/* rotating rays */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 opacity-25"
          style={{
            background:
              "repeating-conic-gradient(from 0deg, rgba(255,45,149,0.5) 0deg 4deg, transparent 4deg 12deg)",
            maskImage: "radial-gradient(circle, black 28%, transparent 60%)",
            WebkitMaskImage: "radial-gradient(circle, black 28%, transparent 60%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />
        {/* sun disc */}
        <motion.div
          className="h-56 w-56 rounded-full sm:h-72 sm:w-72"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, #ff8a5c, #ff2d55 55%, #b14dff)",
            boxShadow:
              "0 0 80px 14px rgba(255,45,85,0.55), 0 0 180px 50px rgba(177,77,255,0.3)",
          }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* synthwave grid floor */}
      <div className="synth-grid" />

      {/* vertical katakana neon strips */}
      <div className="absolute left-3 top-1/3 jp vertical-text neon-pink-text neon-flicker text-2xl opacity-70 sm:left-6 sm:text-3xl">
        好奇心
      </div>
      <div className="absolute right-3 top-1/4 jp vertical-text neon-cyan-text text-2xl opacity-70 sm:right-6 sm:text-3xl">
        探求者
      </div>

      {/* sakura petals (anime.js) */}
      <AnimePetals />

      {/* vignette */}
      <div className="absolute inset-0 [box-shadow:inset_0_0_220px_70px_rgba(0,0,0,0.85)]" />
    </div>
  );
}
