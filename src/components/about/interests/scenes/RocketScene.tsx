"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChapterLabel } from "../components/ChapterLabel";
import { GiantHeading } from "../components/GiantHeading";

/* Chapter 03 — Liftoff (spaceflight) */
export function RocketScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Shuttle lifts from the pad and settles in frame (enters, holds — no fly-out)
  const rocketY = useTransform(scrollYProgress, [0, 0.5], ["80%", "0%"]);
  const flameH = useTransform(scrollYProgress, [0, 0.4, 0.6], [16, 58, 40]);
  const flameOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 1, 0.85]);
  const smokeOpacity = useTransform(scrollYProgress, [0, 0.35, 0.6], [0, 0.7, 0.35]);

  return (
    <section
      ref={ref}
      id="rockets"
      className="relative grid min-h-[100svh] grid-cols-1 items-center gap-8 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24 md:grid-cols-[1fr_1.15fr] md:gap-16 md:px-16"
    >
      {/* rocket column */}
      <div className="relative order-2 h-[44vh] min-h-[280px] overflow-hidden sm:h-[60vh] sm:min-h-[420px] md:order-1">
        <motion.div
          style={{ y: rocketY }}
          className="absolute left-1/2 top-0 w-[160px] -translate-x-1/2 sm:w-[230px]"
        >
          <Image
            src="/spaceshuttle.png"
            alt="Space shuttle"
            width={412}
            height={605}
            className="h-auto w-full select-none"
          />
          {/* flame */}
          <motion.div
            style={{ height: flameH, opacity: flameOpacity }}
            className="absolute -bottom-1 left-1/2 w-5 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-200 via-rose-400 to-transparent blur-[2px] sm:w-6"
          />
        </motion.div>

        {/* smoke */}
        <motion.div
          style={{ opacity: smokeOpacity }}
          aria-hidden
          className="absolute bottom-2 left-1/2 h-32 w-56 -translate-x-1/2 rounded-full bg-white/25 blur-2xl"
        />

      </div>

      {/* text column */}
      <div className="relative order-1 md:order-2">
        <ChapterLabel num="03" color="text-amber-300">Liftoff</ChapterLabel>
        <GiantHeading>
          We go
          <br />
          <span className="text-amber-300">multi-planetary.</span>
        </GiantHeading>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
          The type who&apos;ll happily spend an evening on rocket launches, booster landings, and arguing humanity&apos;s
          odds of becoming a Type-I civilization. 🚀 Falcon Heavy, Starship, Soyuz, ISRO PSLV — the more chemistry
          exploding in a controlled direction, the better.
        </p>

        <div className="mt-6 grid max-w-md grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-widest text-white/45">
          {["Δv", "TWR", "Isp"].map((k) => (
            <div key={k} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5 text-center">
              <div className="text-white/80">{k}</div>
              <div className="mt-1 text-[9px] opacity-70">obsessed</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
