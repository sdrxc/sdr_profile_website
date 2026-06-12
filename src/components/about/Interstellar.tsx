"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QUOTES = [
  { t: "Do not go gentle into that good night.", a: "Dylan Thomas" },
  { t: "Love is the one thing we're capable of perceiving that transcends time and space.", a: "Dr. Brand" },
  { t: "We'll find a way. We always have.", a: "Cooper" },
  { t: "Murph's Law — whatever can happen, will happen.", a: "" },
  { t: "Maybe we've spent too long trying to figure all this out with theory.", a: "Cooper" },
  { t: "It's not possible. — No, it's necessary.", a: "TARS" },
];

/** Cycling Interstellar quotes. */
export function InterstellarQuotes() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % QUOTES.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mx-auto mt-6 flex min-h-[2.5rem] max-w-lg items-center justify-center text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="text-sm italic text-white/45"
        >
          “{QUOTES[i].t}”
          {QUOTES[i].a && <span className="ml-2 not-italic text-white/25">— {QUOTES[i].a}</span>}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/** The bookshelf message: "STAY" in Morse, blinking. */
export function MorseStay() {
  // S=...  T=-  A=.-  Y=-.--
  const morse = "... - .- -.--";
  const units = morse.split(" ").map((m) => m.split(""));
  return (
    <div
      className="group inline-flex cursor-help items-center gap-2"
      title='S · T · A · Y — "the message in the dust"'
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 group-hover:text-neon-pink">
        message
      </span>
      <span className="flex items-center gap-2">
        {units.map((letter, li) => (
          <span key={li} className="flex items-center gap-1">
            {letter.map((c, ci) => (
              <motion.span
                key={ci}
                className="inline-block rounded-full bg-neon-cyan"
                style={{ width: c === "-" ? 12 : 4, height: 4 }}
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 1, delay: (li * 3 + ci) * 0.18, repeat: Infinity, repeatDelay: 1.5 }}
              />
            ))}
          </span>
        ))}
      </span>
      <span className="font-mono text-[10px] tracking-widest text-white/0 transition-colors group-hover:text-white/50">
        S T A Y
      </span>
    </div>
  );
}

/** Subtle Gargantua black hole, lower-left. Brightens during the wormhole event. */
function Gargantua({ active }: { active: boolean }) {
  return (
    <div
      className="pointer-events-none fixed -bottom-24 -left-24 z-0 h-72 w-72 transition-opacity duration-1000"
      style={{ opacity: active ? 0.9 : 0.28 }}
      aria-hidden
    >
      {/* accretion disk halo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #ffe8b0 0deg, #ffd27f 30deg, #ff8a3c 120deg, transparent 200deg, #ffe8b0 320deg, #ffd27f 360deg)",
          maskImage: "radial-gradient(circle, transparent 38%, black 40%, black 52%, transparent 56%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 38%, black 40%, black 52%, transparent 56%)",
          filter: "blur(2px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      {/* lensed light arc over the top */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 40px 6px rgba(255,180,90,0.5)",
          maskImage: "radial-gradient(circle, transparent 52%, black 54%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 52%, black 54%, transparent 60%)",
        }}
      />
      {/* event horizon */}
      <div className="absolute inset-[34%] rounded-full bg-black shadow-[0_0_30px_10px_#000]" />
    </div>
  );
}

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

/** Konami code → wormhole event. Gargantua + a hidden message. */
export function InterstellarEasterEggs() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      seq.push(e.code);
      seq = seq.slice(-KONAMI.length);
      if (KONAMI.every((k, i) => seq[i] === k)) {
        seq = [];
        setActive(true);
        window.setTimeout(() => setActive(false), 5200);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Gargantua active={active} />

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center"
          >
            {/* wormhole */}
            <motion.div
              className="absolute h-[140vmax] w-[140vmax] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,240,255,0.25) 0%, rgba(177,77,255,0.18) 30%, rgba(0,0,0,0.92) 62%)",
              }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 90 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <motion.div
              className="absolute h-[80vmax] w-[80vmax] rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(0,240,255,0.4), transparent, rgba(255,45,149,0.4), transparent)",
                maskImage: "radial-gradient(circle, transparent 30%, black 55%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(circle, transparent 30%, black 55%, transparent 75%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="relative z-10 px-6 text-center"
            >
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-neon-cyan">wormhole stabilized</p>
              <p className="mt-4 font-display text-2xl font-bold neon-title sm:text-4xl">
                “We&apos;ll find a way.<br className="sm:hidden" /> We always have.”
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-widest text-white/40">
                — easter egg unlocked · TARS humor 75%
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
