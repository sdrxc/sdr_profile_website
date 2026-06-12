"use client";

import { motion } from "framer-motion";

export type Bar = { label: string; value: number };

export function BarChart({
  bars,
  accent,
  unit = "",
  horizontal = false,
}: {
  bars: Bar[];
  accent: string;
  unit?: string;
  horizontal?: boolean;
}) {
  const max = Math.max(...bars.map((b) => b.value), 1);

  if (horizontal) {
    return (
      <div className="space-y-2.5">
        {bars.map((b, i) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 truncate text-right text-xs text-white/55">{b.label}</span>
            <div className="h-5 flex-1 overflow-hidden rounded-md bg-white/5">
              <motion.div
                className="flex h-full items-center justify-end rounded-md pr-2"
                style={{ background: `linear-gradient(90deg, ${accent}55, ${accent})` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(b.value / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-mono text-[10px] font-semibold text-white/90">{b.value}{unit}</span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-44 items-end justify-between gap-2">
      {bars.map((b, i) => (
        <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <span className="font-mono text-[10px] text-white/50">{b.value}{unit}</span>
          <motion.div
            className="w-full rounded-t-md"
            style={{ background: `linear-gradient(to top, ${accent}, ${accent}66)` }}
            initial={{ height: 0 }}
            whileInView={{ height: `${(b.value / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="truncate text-[10px] text-white/45">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
