"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChapterLabel } from "../components/ChapterLabel";
import { GiantHeading } from "../components/GiantHeading";

/* Chapter 06 — Free Fall (skydiving) */
export function SkydiveScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Diver drops in from above and settles in frame (enters, holds)
  const diverY = useTransform(scrollYProgress, [0, 0.55], ["-130%", "0%"]);
  const diverRotate = useTransform(scrollYProgress, [0, 0.55], [-20, 0]);
  const diverScale = useTransform(scrollYProgress, [0, 0.55], [0.65, 1]);
  // wind streaks lengthen as speed builds
  const windHeight = useTransform(scrollYProgress, [0.05, 0.5], ["0%", "78%"]);

  return (
    <section
      ref={ref}
      id="skydive"
      className="relative grid min-h-[100svh] grid-cols-1 items-center gap-8 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-16"
    >
      {/* text column */}
      <div className="relative order-1">
        <ChapterLabel num="06" color="text-sky-300">Free Fall</ChapterLabel>
        <GiantHeading>
          Gravity always
          <br />
          <span className="text-sky-300">collects.</span>
        </GiantHeading>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
          Strapping into a harness and trusting physics over instinct is the whole appeal. 🪂 Terminal velocity sits
          around 200 km/h — Felix Baumgartner went supersonic on the way down from the stratosphere. The plan never
          changes: jump, fall, deploy, repeat.
        </p>

        <p className="mt-5 text-base italic text-white/85">
          “Download is inevitable.”{" "}
          <span className="not-italic text-white/40">— gravity, undefeated.</span>
        </p>
      </div>

      {/* illustration column */}
      <div className="relative order-2 grid h-[44vh] min-h-[280px] place-items-center overflow-hidden sm:h-[60vh] sm:min-h-[420px]">
        {/* wind streaks */}
        <div aria-hidden className="absolute inset-x-0 top-0 flex justify-center gap-5 sm:gap-7">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              style={{ height: windHeight }}
              className="w-px bg-gradient-to-b from-transparent via-sky-200/50 to-transparent"
              // stagger the streaks so they read as rushing air
            />
          ))}
        </div>

        {/* the skydiver */}
        <motion.div
          style={{ y: diverY, rotate: diverRotate, scale: diverScale }}
          className="text-7xl drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)] sm:text-8xl"
        >
          🪂
        </motion.div>
      </div>
    </section>
  );
}
