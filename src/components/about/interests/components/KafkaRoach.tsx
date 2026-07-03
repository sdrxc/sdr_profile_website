"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* Roaming easter egg — Kafka's cockroach crawls a looping path across the
   page; tap it for a Metamorphosis quote. */
export function KafkaRoach() {
  const [say, setSay] = useState(false);
  return (
    <>
      <motion.button
        aria-label="A cockroach"
        onClick={() => setSay((s) => !s)}
        className="absolute text-base hover:!opacity-100"
        style={{ top: 0, zIndex: 5 }}
        animate={{
          left: ["-2%", "30%", "55%", "92%"],
          top: ["1%", "22%", "55%", "92%"],
          zIndex: [20, 20, -1, -1, 20],
          opacity: [0.55, 0.55, 0.18, 0.18, 0.55],
          rotate: [0, 90, 20, 0],
        }}
        transition={{ duration: 64, repeat: Infinity, ease: "linear", times: [0, 0.35, 0.42, 0.72] }}
      >
        🪳
      </motion.button>
      <AnimatePresence>
        {say && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-2 z-30 max-w-xs -translate-x-1/2 rounded-xl border border-white/10 bg-ink/95 px-4 py-2 text-center text-xs italic text-white/70 backdrop-blur"
          >
            “As Gregor Samsa awoke one morning, he found himself transformed into a monstrous vermin.”
            <span className="mt-1 block not-italic text-white/35">— Kafka, The Metamorphosis</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
