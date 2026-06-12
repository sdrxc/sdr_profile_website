"use client";

import { motion } from "framer-motion";

/**
 * Closing reward for the visitor who scrolled the whole thing.
 * A pop-art homage to the Keanu "You're breathtaking!" meme — recreated,
 * not the copyrighted artwork.
 */
export function Breathtaking() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 160, damping: 16 }}
      className="relative mx-auto mt-16 max-w-md"
    >
      {/* gradient poster border */}
      <div className="rounded-[28px] bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 p-[3px] shadow-[0_0_60px_-10px_rgba(255,120,30,0.6)]">
        <div
          className="relative overflow-hidden rounded-[26px] p-8 text-center"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, #1a1410, #0c0a0a)",
          }}
        >
          {/* halftone dots */}
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage: "radial-gradient(#ff7a1f 1.4px, transparent 1.6px)",
              backgroundSize: "12px 12px",
              maskImage: "radial-gradient(circle at 70% 80%, black, transparent 75%)",
              WebkitMaskImage: "radial-gradient(circle at 70% 80%, black, transparent 75%)",
            }}
          />

          <div className="relative">
            {/* pointing at YOU */}
            <motion.div
              className="text-5xl"
              animate={{ x: [0, 6, 0], rotate: [0, -4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              🫵
            </motion.div>

            <p className="mt-4 text-sm leading-relaxed text-white/65">
              You scrolled through trains, a cockroach, a boulder, a quantum cat,
              rockets, and 2&nbsp;A.M. philosophy — and you&apos;re <em>still here</em>.
            </p>

            <p className="mt-1 text-sm text-white/45">For bearing with me and all my weird stuff…</p>

            {/* the line */}
            <p
              className="mt-5 font-display text-4xl font-extrabold italic leading-none sm:text-5xl"
              style={{
                color: "#ffd24a",
                WebkitTextStroke: "2px #ff5a1f",
                textShadow: "4px 4px 0 rgba(0,0,0,0.45)",
              }}
            >
              You&apos;re
              <br />
              Breathtaking!
            </p>

            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em] text-orange-300/80">
              — thank you. genuinely. 🙏
            </p>
            <p className="mt-1 font-mono text-[10px] text-white/25">
              (yes, you. and you&apos;re breathtaking too.)
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
