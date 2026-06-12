"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Persona } from "@/data/profile";

export function PersonaHero({
  persona,
  intro,
}: {
  persona: Persona;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32">
      <div className="section-pad !py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
          >
            ← All personas
          </Link>

          <div className="flex items-center gap-4">
            <motion.span
              className="relative grid h-16 w-16 place-items-center rounded-2xl text-3xl"
              style={{
                background: `${persona.accent}1a`,
                border: `1px solid ${persona.accent}40`,
                color: persona.accent,
                boxShadow: `0 0 40px -8px ${persona.accent}66`,
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* drawn accent ring */}
              <svg className="absolute -inset-2" viewBox="0 0 100 100" fill="none">
                <motion.circle
                  cx="50" cy="50" r="46"
                  stroke={persona.accent} strokeWidth="1.5" strokeDasharray="6 8" opacity="0.45"
                  initial={{ pathLength: 0, rotate: -90 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  style={{ transformOrigin: "center" }}
                />
              </svg>
              {persona.icon}
            </motion.span>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: persona.accent }}
              >
                Persona
              </p>
              <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
                {persona.title}
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            {intro}
          </p>
        </motion.div>
      </div>

      <div
        className="absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${persona.accent}, transparent)`,
        }}
      />
    </section>
  );
}
