"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Consistent titled glass panel wrapper for every chart. */
export function ChartFrame({
  title,
  subtitle,
  badge,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`glass flex flex-col rounded-3xl p-5 sm:p-6 ${className ?? ""}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="mt-0.5 text-sm text-white/40">{subtitle}</p>}
        </div>
        {badge && (
          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
            {badge}
          </span>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </motion.div>
  );
}
