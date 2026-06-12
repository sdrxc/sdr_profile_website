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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center"
      >
        {/* <motion.div variants={item}>
          <span className="chip mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            Available for collaborations
          </span>
        </motion.div> */}

        {/* Floating memoji + "Cogito ergo sum" easter egg */}
        <motion.div variants={item} className="relative mx-auto w-fit">
          <motion.button
            type="button"
            onTap={() => setCogito((c) => !c)}
            onHoverStart={() => setCogito(true)}
            onHoverEnd={() => setCogito(false)}
            className="absolute -top-[3.25rem] left-1/2 z-30 -translate-x-1/2"
            animate={{ y: [0, -10, 0], rotate: [0, -4, 4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            aria-label="It's me — cogito ergo sum"
          >
            <Image
              src="/landing-memojis.png"
              alt="Soumya's memoji"
              width={104}
              height={104}
              priority
              className="h-[88px] w-auto drop-shadow-[0_10px_28px_rgba(139,92,246,0.55)] sm:h-[104px]"
            />
            {/* speech bubble */}
            <AnimatePresence>
              {cogito && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute left-full top-2 ml-1 w-max rounded-2xl rounded-bl-sm border border-white/15 bg-ink/95 px-3 py-1.5 text-xs italic text-white/85 backdrop-blur"
                >
                  “Cogito, ergo sum.”
                  <span className="ml-1 not-italic text-white/35">— I think, therefore I am</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.h1 className="pb-5 font-display text-6xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-8xl">
            <span className="block text-white/90">{profile.name.split(" ")[0]}</span>
            <span className="gradient-text-shimmer block pb-3 leading-[1.25]">
              {profile.name.split(" ").slice(1).join(" ") || profile.role}
            </span>
          </motion.h1>
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
        >
          {profile.bio}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#personas" className="btn-primary">
            Explore the personas ↓
          </a>
          <Link href="/about" className="btn-ghost">
            Intro →
          </Link>
          <a href={`mailto:${profile.email}`} className="btn-ghost">
            Get in touch
          </a>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-white/30"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-8">
          <Link href="/game" className="group relative inline-block">
            {/* animated glow ring */}
            <motion.span
              aria-hidden
              className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-fuchsia-500 opacity-60 blur-[6px]"
              animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 100%" }}
            />
            <span className="relative flex items-center gap-3 rounded-2xl border border-fuchsia-300/40 bg-ink/90 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur">
              <motion.span
                className="text-lg"
                animate={{ rotate: [0, -12, 12, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                🕹️
              </motion.span>
              <span>
                Not interested in the profile?{" "}
                <span className="text-fuchsia-300">No worries — play a pixel game</span>
              </span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
