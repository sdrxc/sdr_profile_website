"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChapterLabel } from "../components/ChapterLabel";
import { GiantHeading } from "../components/GiantHeading";

/* Chapter 01 — Rails & Sky (trains + aircraft) */
export function RailsScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // A380: climbs in from the lower-left and settles at altitude (enters, holds)
  const planeX = useTransform(scrollYProgress, [0, 0.5], ["-65%", "0%"]);
  const planeY = useTransform(scrollYProgress, [0, 0.5], [180, 0]);
  const planeRotate = useTransform(scrollYProgress, [0, 0.5], [8, 0]);
  const planeScale = useTransform(scrollYProgress, [0, 0.5], [0.84, 1]);

  return (
    <section
      ref={ref}
      id="rails"
      className="relative grid min-h-[100svh] grid-cols-1 items-center gap-8 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-16"
    >
      {/* illustration column */}
      <div className="relative order-2 h-[44vh] min-h-[280px] overflow-hidden sm:h-[60vh] sm:min-h-[420px] md:order-1">
        {/* A380 hero */}
        <motion.div
          style={{ x: planeX, y: planeY, rotate: planeRotate, scale: planeScale }}
          className="absolute left-0 top-[12%] w-[85%]"
        >
          <Image
            src="/a380.png"
            alt="Airbus A380"
            width={776}
            height={321}
            priority
            className="h-auto w-full -scale-x-100 select-none"
          />
        </motion.div>

      </div>

      {/* text column */}
      <div className="relative order-1 md:order-2">
        <ChapterLabel num="01" color="text-cyan-300">Rails &amp; Sky</ChapterLabel>
        <GiantHeading>
          I move
          <br />
          at <span className="text-cyan-300">altitude.</span>
        </GiantHeading>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
          A certified sucker for trains, aircraft, and anything that moves humans faster than common sense would
          suggest. Plane-spotting is a legitimate hobby — and yes, I check the aircraft type before booking. ✈️ It
          matters.
        </p>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-white/40">aircraft hierarchy</p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
          {["A380", "A350", "777X", "everything else"].map((a, i) => (
            <span key={a} className="flex items-center gap-1.5">
              <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-cyan-200">
                {a}
              </span>
              {i < 3 && <span className="text-white/30">›</span>}
            </span>
          ))}
        </div>

        <p className="mt-4 max-w-md text-sm text-white/55">
          <span className="text-white/40">dream rides (not ridden yet):</span> Shinkansen Hayabusa · Maglev · TGV. The
          bucket list remains aggressively optimistic. 🚄
        </p>
      </div>
    </section>
  );
}
