"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChapterLabel } from "../components/ChapterLabel";
import { GiantHeading } from "../components/GiantHeading";

/* Minimal inline eye / eye-off icons (no icon dependency). */
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx={12} cy={12} r={3} />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.9 4.24A10.6 10.6 0 0 1 12 4c6.5 0 10 7 10 7a18.4 18.4 0 0 1-2.16 3.19M6.6 6.6A18.4 18.4 0 0 0 2 11s3.5 7 10 7a10.6 10.6 0 0 0 4.1-.83" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

/* Chapter 06 — Compass Point (worldview / close) */
export function CompassScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Gentle scroll-bound parallax for the Greek figure (no full spin).
  const greekY = useTransform(scrollYProgress, [0, 1], [44, -44]);
  const greekScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.97]);
  const haloScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);

  // The personal "principle" is NSFW slang — masked by default, revealed on tap.
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      ref={ref}
      id="compass"
      className="relative grid min-h-[100svh] grid-cols-1 items-center gap-8 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-16"
    >
      {/* compass */}
      <div className="relative order-2 grid h-[44vh] min-h-[280px] place-items-center sm:h-[60vh] sm:min-h-[460px] md:order-1">
        <motion.div
          aria-hidden
          style={{
            scale: haloScale,
            background:
              "radial-gradient(circle, rgba(125,180,255,0.18), transparent 65%)",
            filter: "blur(8px)",
          }}
          className="absolute h-[78%] w-[78%] rounded-full"
        />

        <motion.div style={{ y: greekY, scale: greekScale }} className="relative w-[74%] max-w-[420px]">
          <Image
            src="/greek.png"
            alt="Greek figure"
            width={796}
            height={800}
            className="h-auto w-full select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-lg font-bold neon-cyan-text sm:text-xl"
        >
          “It is what it is.”
        </motion.p>
      </div>

      {/* text column */}
      <div className="relative order-1 md:order-2">
        <ChapterLabel num="07" color="text-cyan-300">Compass Point</ChapterLabel>
        <GiantHeading>
          Curiosity is
          <br />
          <span className="text-cyan-300">underrated.</span>
        </GiantHeading>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
          The world gets far more interesting when you ask questions, read things you disagree with, and fall down
          rabbit holes that begin with high-speed rail and end in medieval theology.
        </p>

        <p className="mt-5 max-w-md text-sm text-white/55">
          And one personal principle no serious school endorses:
        </p>
        <div className="mt-1 flex items-center gap-1.5">
          <p
            className="text-xl font-semibold leading-none text-white"
            lang={revealed ? "hi" : undefined}
            aria-label={revealed ? undefined : "Hidden phrase"}
          >
            {revealed ? "“भकचोदी परमो धर्मः”" : "“**** **** ****”"}
          </p>
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            aria-pressed={revealed}
            aria-label={revealed ? "Hide the phrase" : "Reveal the phrase"}
            title={revealed ? "Hide" : "Reveal"}
            className="grid h-6 w-6 flex-none translate-y-px place-items-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white/90"
          >
            {revealed ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <p className="text-xs italic text-white/40">Shenanigans are the highest virtue.</p>

        {/* <p className="mt-6 max-w-md text-sm text-white/50">
          At the intersection of engineering, philosophy, and chaos, you&apos;ll usually find me — wondering how things
          work, why they exist, and whether my next flight is an A350.
        </p> */}

        {/* <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
          ▸ end of sector · welcome aboard 🪐
        </p> */}
      </div>
    </section>
  );
}
