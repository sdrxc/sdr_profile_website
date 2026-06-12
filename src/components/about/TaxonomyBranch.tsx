"use client";

import { motion } from "framer-motion";
import { about } from "@/data/about";

export function TaxonomyBranch() {
  const items = about.taxonomy;
  return (
    <div className="glass h-full rounded-3xl p-6 sm:p-8">
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-neon-violet">
        <span className="jp neon-pink-text text-lg tracking-normal">分類</span> // classification
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold text-white">🧬 Taxonomy</h3>
      <p className="mt-1 text-sm text-white/40">A more precise self-description</p>

      <div className="relative mt-6 pl-6">
        {/* animated spine */}
        <motion.div
          className="absolute left-[7px] top-1 w-px origin-top bg-gradient-to-b from-neon-violet to-neon-cyan"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          style={{ bottom: 14 }}
        />
        <ul className="space-y-2.5">
          {items.map((row, i) => {
            const last = i === items.length - 1;
            return (
              <motion.li
                key={row.rank}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 220, damping: 20 }}
                className="relative flex items-center gap-4 border-b border-white/5 pb-2.5 last:border-0"
              >
                <span
                  className={`absolute -left-[22px] grid place-items-center rounded-full ${
                    last ? "h-4 w-4 bg-neon-cyan shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]" : "h-2.5 w-2.5 bg-neon-violet"
                  }`}
                />
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                  {row.rank}
                </span>
                {last ? (
                  <span className="ml-auto whitespace-nowrap rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-1 text-sm font-semibold italic text-neon-cyan">
                    {row.value}
                  </span>
                ) : (
                  <span className={`ml-auto text-right text-sm ${i >= 7 ? "italic text-white/90" : "text-white/85"}`}>
                    {row.value}
                  </span>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
