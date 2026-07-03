"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const [cogito, setCogito] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-20 pt-32 sm:px-6 sm:pt-36">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        {/* Floating memoji + name — memoji hovers above the name, but nav has enough
            clearance via the section's top padding so it never overlaps the nav. */}
        <motion.div variants={item} className="relative mx-auto w-fit">
          <motion.button
            type="button"
            onTap={() => setCogito((c) => !c)}
            onHoverStart={() => setCogito(true)}
            onHoverEnd={() => setCogito(false)}
            className="absolute left-1/2 z-30 -translate-x-1/2 -top-[3rem] sm:-top-[3.5rem]"
            animate={{ y: [0, -10, 0], rotate: [0, -4, 4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            aria-label="It's me — cogito ergo sum"
          >
            <Image
              src="/landing-memojis.png"
              alt="Soumya's memoji"
              width={120}
              height={120}
              priority
              className="h-[80px] w-auto drop-shadow-[0_10px_28px_rgba(139,92,246,0.55)] sm:h-[104px]"
            />
            {/* speech bubble */}
            <AnimatePresence>
              {cogito && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="pointer-events-none absolute left-full top-2 ml-1 hidden w-max rounded-2xl rounded-bl-sm border border-white/15 bg-ink/95 px-3 py-1.5 text-xs italic text-white/85 backdrop-blur sm:inline-block"
                >
                  “Cogito, ergo sum.”
                  <span className="ml-1 not-italic text-white/35">— I think, therefore I am</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.h1
            className="pb-6 font-display text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-white xs:text-5xl sm:pb-8 sm:text-7xl md:text-8xl"
          >
            <span className="block text-white/90">{profile.name.split(" ")[0]}</span>
            <span className="gradient-text-shimmer block pb-[0.2em] leading-[1.25]">
              {profile.name.split(" ").slice(1).join(" ") || profile.role}
            </span>
          </motion.h1>
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/55 sm:mt-7 sm:max-w-xl sm:text-lg"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-7 flex w-full flex-wrap items-center justify-center gap-2.5 sm:mt-9 sm:gap-3"
        >
          <Link
            href="/about"
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-fuchsia-300/25 bg-white/[0.06] px-4 py-2.5 text-xs text-white/80 shadow-[0_0_24px_-6px_rgba(232,121,249,0.45)] backdrop-blur transition-all duration-300 hover:border-fuchsia-300/50 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_32px_-4px_rgba(232,121,249,0.65)] sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/10 via-fuchsia-500/20 to-cyan-400/10 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-full"
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                boxShadow:
                  "0 0 0 1px rgba(232,121,249,0.18) inset, 0 0 18px rgba(232,121,249,0.25)",
              }}
            />
            <span className="relative bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text font-medium text-transparent">
              Intro
            </span>
            <span className="relative text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white/80">
              →
            </span>
          </Link>
          <a
            href="#personas"
            className="group relative inline-flex w-[calc(50%-0.375rem)] items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white/70 backdrop-blur transition-all duration-300 hover:border-fuchsia-300/40 hover:bg-white/[0.06] hover:text-white sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/10 to-cyan-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="relative bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text font-medium text-transparent">
              Explore the personas
            </span>
            <span className="relative text-white/40 transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-white/80">
              ↓
            </span>
          </a>
          <Link
            href="/game"
            className="group relative inline-flex w-[calc(50%-0.375rem)] items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white/70 backdrop-blur transition-all duration-300 hover:border-fuchsia-300/40 hover:bg-white/[0.06] hover:text-white sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/10 to-cyan-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="relative bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text font-medium text-transparent">
              Play a pixel game
            </span>
            <span className="relative text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white/80">
              →
            </span>
          </Link>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-8 break-words font-mono text-[0.5rem] uppercase tracking-[0.25em] text-white/20 sm:mt-10 sm:text-[0.625rem] sm:tracking-[0.3em]"
        >
          {profile.tagline}
        </motion.p>
      </motion.div>

      {/* Scroll cue — hidden on small screens to avoid overlap with CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
