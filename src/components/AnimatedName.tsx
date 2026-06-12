"use client";

import { motion } from "framer-motion";

export function AnimatedName({
  bengali,
  english,
}: {
  bengali: string;
  english: string;
}) {
  const letters = Array.from(english);

  return (
    <div className="group relative inline-block select-none">
      {/* BIG English title — letters animate in via variant inheritance */}
      <motion.h1
        initial="hidden"
        animate="show"
        whileHover={{ scale: 1.015 }}
        className="neon-title font-display text-[2.6rem] font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{ whiteSpace: "pre" }}
            variants={{
              hidden: { opacity: 0, y: 40, rotateX: -90, filter: "blur(10px)" },
              show: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                filter: "blur(0px)",
                transition: {
                  delay: 0.15 + i * 0.045,
                  type: "spring",
                  stiffness: 240,
                  damping: 16,
                },
              },
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.h1>

      {/* gradient underline */}
      <svg className="mx-auto mt-2 h-3 w-2/3" viewBox="0 0 300 12" preserveAspectRatio="none">
        <motion.path
          d="M2 8 Q 150 1 298 8"
          fill="none"
          stroke="url(#nameGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, delay: 0.4, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="nameGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff2d95" />
            <stop offset="50%" stopColor="#b14dff" />
            <stop offset="100%" stopColor="#00f0ff" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bengali, faded, below */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-2 text-center text-2xl font-medium tracking-wide text-white/30 transition-colors duration-500 group-hover:text-white/50 sm:text-3xl"
        lang="bn"
      >
        {bengali}
      </motion.p>
    </div>
  );
}
