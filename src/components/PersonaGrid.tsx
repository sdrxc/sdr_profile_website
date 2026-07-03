"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { personas } from "@/data/profile";
import { useRef, useState } from "react";

function PersonaCard({
  persona,
  index,
}: {
  persona: (typeof personas)[number];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  // first card spans 2 cols on large screens for a featured look
  const featured = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={featured ? "sm:col-span-2" : ""}
    >
      <Link
        ref={ref}
        href={`/${persona.slug}`}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          setGlow({
            x: ((e.clientX - r.left) / r.width) * 100,
            y: ((e.clientY - r.top) / r.height) * 100,
            on: true,
          });
        }}
        onMouseLeave={() => setGlow((g) => ({ ...g, on: false }))}
        className="group relative flex h-full min-h-[180px] flex-col justify-between overflow-hidden rounded-3xl glass glass-hover p-5 sm:min-h-[200px] sm:p-7"
      >
        {/* cursor-following glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(360px circle at ${glow.x}% ${glow.y}%, ${persona.accent}22, transparent 60%)`,
          }}
        />

        <div className="relative flex items-start justify-between">
          <span
            className="grid h-12 w-12 place-items-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `${persona.accent}1a`,
              border: `1px solid ${persona.accent}33`,
              color: persona.accent,
            }}
          >
            {persona.icon}
          </span>
          <span className="text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/70">
            ↗
          </span>
        </div>

        <div className="relative mt-6">
          <h3 className="font-display text-2xl font-bold text-white">
            {persona.title}
          </h3>
          <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/50">
            {persona.blurb}
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: `linear-gradient(90deg, ${persona.accent}, transparent)` }}
        />
      </Link>
    </motion.div>
  );
}

export function PersonaGrid() {
  return (
    <section id="personas" className="section-pad scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center sm:mb-14"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon-violet sm:text-sm sm:tracking-[0.3em]">
          Seven lives, one person
        </p>
        <p className="mt-1 text-[0.65rem] font-slim uppercase tracking-[0.25em] text-white/20 sm:text-xs sm:tracking-[0.3em]">
          Seven lives? कही मैं एक बिल्ली तो नहीं?🐱
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white xs:text-4xl sm:text-5xl">
          Choose a <span className="gradient-text">persona</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md px-2 text-sm text-white/50 sm:mt-4 sm:text-base">
          Each one is a different lens on the same curiosity. Pick where to begin.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {personas.map((p, i) => (
          <PersonaCard key={p.slug} persona={p} index={i} />
        ))}
      </div>
    </section>
  );
}
