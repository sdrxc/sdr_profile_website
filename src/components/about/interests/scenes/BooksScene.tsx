"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChapterLabel } from "../components/ChapterLabel";
import { GiantHeading } from "../components/GiantHeading";
import { ISMS, VOICES } from "../data";

/* Looping mini-vignette: a boulder rolls up and resets — "Sisyphus happy". */
function Sisyphus() {
  return (
    <div className="relative mt-5 h-16 overflow-hidden rounded-lg border border-white/10 bg-black/30">
      <div className="absolute bottom-2 left-3 right-3 h-px origin-left -rotate-6 bg-white/15" />
      <motion.span
        className="absolute bottom-3 left-4 text-lg"
        animate={{ x: [0, 160, 160], y: [0, -36, -36], opacity: [1, 1, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeIn", times: [0, 0.85, 1] }}
      >
        🪨
      </motion.span>
      <span className="absolute bottom-2 right-3 font-mono text-[10px] text-white/35">
        one must imagine Sisyphus happy
      </span>
    </div>
  );
}

/* Toggle chips that reveal a representative line from each thinker. */
function VoicesPanel() {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <div className="mt-5">
      <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">voices in my head</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {VOICES.map(([name], i) => (
          <button
            key={name}
            onClick={() => setPick((p) => (p === i ? null : i))}
            className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
              pick === i
                ? "border-violet-400/60 bg-violet-400/15 text-white"
                : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {pick !== null && (
          <motion.p
            key={pick}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm italic text-white/80"
          >
            “{VOICES[pick][1]}” <span className="not-italic text-white/40">— {VOICES[pick][0]}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Chapter 04 — Margin Notes (books / philosophy) */
export function BooksScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const stackY = useTransform(scrollYProgress, [0, 1], [40, -80]);

  return (
    <section
      ref={ref}
      id="books"
      className="relative grid min-h-[100svh] grid-cols-1 items-center gap-8 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24 md:grid-cols-[1.1fr_1fr] md:gap-16 md:px-16"
    >
      {/* philosophy image */}
      <div className="relative order-2 grid h-[46vh] min-h-[320px] place-items-center sm:h-[64vh] sm:min-h-[460px] md:order-1">
        <motion.div
          style={{ y: stackY }}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[78%] max-w-[420px]"
        >
          <Image
            src="/philosophy.jpg"
            alt="Philosophy"
            width={599}
            height={604}
            className="h-auto w-full rounded-2xl border border-violet-300/20 object-cover shadow-[0_24px_50px_-18px_rgba(0,0,0,0.75)] select-none"
          />
        </motion.div>
      </div>

      {/* text column */}
      <div className="relative order-1 md:order-2">
        <ChapterLabel num="04" color="text-violet-300">Margin Notes</ChapterLabel>
        <GiantHeading>
          Arguments that
          <br />
          outlived <span className="text-violet-300">empires.</span>
        </GiantHeading>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
          Drawn to ideas that shaped civilizations. I enjoy every imaginable <span className="text-white">-ism</span> —
          and the occasional 2 A.M. philosophy that shows up uninvited.
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {ISMS.map(([k, v]) => (
            <span
              key={k}
              title={v}
              className="cursor-help rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-xs text-amber-200"
            >
              {k}
            </span>
          ))}
        </div>

        <p className="mt-5 max-w-md text-sm text-white/55">
          I avoid the &ldquo;do we really exist?&rdquo; rabbit hole — Descartes already did the paperwork:
        </p>
        <p className="mt-1 text-base italic text-white/85">
          &ldquo;Cogito, ergo sum.&rdquo;{" "}
          <span className="not-italic text-white/40">— I think, therefore I am.</span>
        </p>

        <VoicesPanel />
        <Sisyphus />
      </div>
    </section>
  );
}
