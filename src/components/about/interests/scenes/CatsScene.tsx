"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChapterLabel } from "../components/ChapterLabel";
import { GiantHeading } from "../components/GiantHeading";

/* Chapter 05 — Cat in a Box (Schrödinger) */
export function CatsScene() {
  const [observed, setObserved] = useState(false);
  const [alive, setAlive] = useState(true);
  const observe = () => {
    setAlive(Math.random() > 0.4);
    setObserved(true);
  };

  return (
    <section
      id="cats"
      className="relative grid min-h-[100svh] grid-cols-1 items-center gap-8 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24 md:grid-cols-[1fr_1fr] md:gap-16 md:px-16"
    >
      {/* cat-box illustration */}
      <div className="relative order-2 grid h-[42vh] min-h-[260px] place-items-center sm:h-[60vh] sm:min-h-[420px] md:order-1">
        <div className="relative w-[95%] max-w-[640px]">
          {/* the box — gently pulses while the wavefunction is uncollapsed */}
          <motion.div
            animate={observed ? { scale: 1 } : { scale: [0.99, 1.015, 0.99] }}
            transition={observed ? { duration: 0.3 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/catbox.png"
              alt="A cardboard box"
              width={1300}
              height={700}
              className="h-auto w-full select-none drop-shadow-[0_18px_36px_rgba(0,0,0,0.45)]"
            />
          </motion.div>

          {/* interaction layer */}
          {/* <div className="absolute inset-0 grid place-items-center">
            <AnimatePresence mode="wait">
              {!observed ? (
                <motion.button
                  key="closed"
                  onClick={observe}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 cursor-pointer"
                  aria-label="Observe the cat"
                />
              ) : (
                <motion.button
                  key="open"
                  onClick={() => setObserved(false)}
                  initial={{ opacity: 0, scale: 0.7, rotate: -12, y: 10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  className="grid -translate-y-[8%] place-items-center text-5xl drop-shadow-[0_0_14px_rgba(255,210,120,0.45)] sm:text-6xl"
                  aria-label="Re-collapse the wavefunction"
                >
                  {alive ? "😺" : "🙀"}
                </motion.button>
              )}
            </AnimatePresence>
          </div> */}
        </div>
        {/* <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-white/40">
          {observed
            ? alive
              ? "alive · and judging you"
              : "let's not observe that again…"
            : "tap to collapse the wavefunction"}
        </p> */}
      </div>

      {/* text column */}
      <div className="relative order-1 md:order-2">
        <ChapterLabel num="05" color="text-rose-200">Cat in a Box</ChapterLabel>
        <GiantHeading>
          I adore cats.
          <br />
          <span className="text-rose-200">Cannot own one.</span>
        </GiantHeading>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
          A blend of laziness, questionable responsibility, and self-awareness says one chaotic, mildly toxic creature
          under the roof is already plenty. 🐈 Until then — the cat lives in superposition.
        </p>
        <p className="mt-4 max-w-md text-sm italic text-white/45">
          (No cats were harmed in the rendering of this section.)
        </p>
      </div>
    </section>
  );
}
