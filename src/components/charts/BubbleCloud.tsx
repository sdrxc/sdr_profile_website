"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export type Bubble = { label: string; value: number; color?: string };

const W = 360, H = 300, CX = W / 2, CY = H / 2, PAD = 10;

/** Packed bubbles: phyllotaxis seed + collision relaxation so nothing overlaps. */
export function BubbleCloud({ bubbles, accent }: { bubbles: Bubble[]; accent: string }) {
  const [hover, setHover] = useState<string | null>(null);
  const max = Math.max(...bubbles.map((b) => b.value), 1);

  const placed = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    const sorted = [...bubbles].sort((a, b) => b.value - a.value);
    const r = (v: number) => 16 + (v / max) * 30;
    const maxR = r(max);

    const nodes = sorted.map((b, i) => {
      const dist = Math.sqrt(i) * maxR * 1.45;
      const ang = i * golden;
      return { ...b, r: r(b.value), x: CX + Math.cos(ang) * dist, y: CY + Math.sin(ang) * dist };
    });

    // relax overlaps
    for (let iter = 0; iter < 120; iter++) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.01;
          const minD = a.r + b.r + 7;
          if (d < minD) {
            const push = (minD - d) / 2;
            const ux = dx / d, uy = dy / d;
            a.x -= ux * push; a.y -= uy * push;
            b.x += ux * push; b.y += uy * push;
          }
        }
      }
      // gentle pull toward center to keep it compact
      for (const n of nodes) {
        n.x += (CX - n.x) * 0.03;
        n.y += (CY - n.y) * 0.03;
      }
    }

    // fit to viewBox
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const n of nodes) {
      minX = Math.min(minX, n.x - n.r); maxX = Math.max(maxX, n.x + n.r);
      minY = Math.min(minY, n.y - n.r); maxY = Math.max(maxY, n.y + n.r);
    }
    const scale = Math.min(1, (W - 2 * PAD) / (maxX - minX || 1), (H - 2 * PAD) / (maxY - minY || 1));
    const bcx = (minX + maxX) / 2, bcy = (minY + maxY) / 2;
    return nodes.map((n) => ({
      ...n,
      x: CX + (n.x - bcx) * scale,
      y: CY + (n.y - bcy) * scale,
      r: n.r * scale,
    }));
  }, [bubbles, max]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
      {placed.map((b, i) => {
        const color = b.color ?? accent;
        const lit = !hover || hover === b.label;
        return (
          <g key={b.label} style={{ cursor: "pointer" }} onMouseEnter={() => setHover(b.label)} onMouseLeave={() => setHover(null)}>
            <motion.circle
              cx={b.x} cy={b.y}
              fill={`${color}26`} stroke={color} strokeWidth={1.4}
              initial={{ r: 0, opacity: 0 }}
              whileInView={{ r: b.r, opacity: lit ? 1 : 0.25 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 200, damping: 16 }}
            />
            <text x={b.x} y={b.y} textAnchor="middle" dominantBaseline="middle" className="pointer-events-none fill-white" style={{ fontSize: Math.min(13, b.r / 2.6), opacity: lit ? 0.95 : 0.3, fontWeight: 600 }}>
              {b.label}
            </text>
            {b.r > 24 && (
              <text x={b.x} y={b.y + b.r / 2.1} textAnchor="middle" className="pointer-events-none fill-white/50" style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>
                {b.value}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
