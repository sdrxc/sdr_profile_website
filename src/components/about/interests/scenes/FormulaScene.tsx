"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChapterLabel } from "../components/ChapterLabel";
import { GiantHeading } from "../components/GiantHeading";

/* Chapter 02 — Lights Out (Formula 1) */
export function FormulaScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Car drifts in from the right and settles on the racing line (enters, holds)
  const carX = useTransform(scrollYProgress, [0, 0.5], ["115%", "0%"]);

  return (
    <section
      ref={ref}
      id="f1"
      className="relative grid min-h-[100svh] grid-cols-1 items-center gap-8 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24 md:grid-cols-[1fr_1.15fr] md:gap-16 md:px-16"
    >
      {/* text column */}
      <div className="relative order-1">
        <ChapterLabel num="02" color="text-rose-300">Lights Out</ChapterLabel>
        <GiantHeading>
          Lights out
          <br />
          and <span className="text-rose-300">away we go.</span>
        </GiantHeading>

        {/* Live standings — links out to the official F1 site (it can't be
            iframe-embedded, so this is a live-styled deep link). */}
        <a
          href="https://www.formula1.com/en/results/2026/drivers"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex items-center gap-2.5 rounded-full border border-rose-400/40 bg-rose-400/10 px-3.5 py-1.5 text-xs text-rose-100 transition-colors hover:bg-rose-400/20"
        >
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
          </span>
          <span className="font-mono uppercase tracking-widest text-rose-200">Live</span>
          <span className="text-white/85">2026 Driver Standings</span>
          <span aria-hidden className="text-rose-200/70 transition-transform group-hover:translate-x-0.5">↗</span>
        </a>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
          A recent addition to the obsessions. Still learning the sport, but already hooked on the absurd combination
          of engineering brilliance, strategy, and controlled chaos.
        </p>

      </div>

      {/* illustration column */}
      <div className="relative order-2 h-[44vh] min-h-[280px] overflow-hidden sm:h-[60vh] sm:min-h-[420px]">
        {/* track stripes */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent 0 64px, rgba(255,93,122,0.08) 64px 66px)",
          }}
        />
        {/* the car */}
        <motion.div
          style={{ x: carX }}
          className="absolute left-0 top-[30%] w-[92%] drop-shadow-[0_14px_22px_rgba(20,30,45,0.35)]"
        >
          <Image
            src="/f1.png"
            alt="Formula 1 car"
            width={674}
            height={370}
            className="h-auto w-full select-none"
          />
        </motion.div>

        <div className="absolute right-2 top-2 grid grid-cols-2 gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-sm ${i % 2 === 0 ? "bg-white/90" : "bg-black/80 border border-white/60"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
