"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export type ScatterPoint = {
  x: number;
  y: number;
  cluster: string;
  label: string;
  meta?: string;
};
export type Cluster = { id: string; label: string; color: string };

/** Andrew's monotone-chain convex hull. */
function convexHull(pts: [number, number][]): [number, number][] {
  if (pts.length < 3) return pts;
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: number[], a: number[], b: number[]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  for (const pt of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pt) <= 0) lower.pop();
    lower.push(pt);
  }
  const upper: [number, number][] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const pt = p[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pt) <= 0) upper.pop();
    upper.push(pt);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

/** Expand a hull outward from its centroid for a padded "blob" look. */
function expand(hull: [number, number][], pad = 4): [number, number][] {
  if (!hull.length) return hull;
  const cx = hull.reduce((s, p) => s + p[0], 0) / hull.length;
  const cy = hull.reduce((s, p) => s + p[1], 0) / hull.length;
  return hull.map(([x, y]) => {
    const dx = x - cx, dy = y - cy;
    const d = Math.hypot(dx, dy) || 1;
    return [x + (dx / d) * pad, y + (dy / d) * pad] as [number, number];
  });
}

const W = 320, H = 320, PAD = 18;

export function ScatterPlot({
  points,
  clusters,
}: {
  points: ScatterPoint[];
  clusters: Cluster[];
}) {
  const [hover, setHover] = useState<ScatterPoint | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const { scaled, hulls } = useMemo(() => {
    const xs = points.map((p) => p.x), ys = points.map((p) => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const sx = (x: number) => PAD + ((x - minX) / (maxX - minX || 1)) * (W - 2 * PAD);
    const sy = (y: number) => PAD + ((y - minY) / (maxY - minY || 1)) * (H - 2 * PAD);
    const scaled = points.map((p) => ({ ...p, px: sx(p.x), py: sy(p.y) }));
    const hulls = clusters.map((c) => {
      const cp = scaled.filter((p) => p.cluster === c.id).map((p) => [p.px, p.py] as [number, number]);
      return { color: c.color, id: c.id, path: expand(convexHull(cp), 14) };
    });
    return { scaled, hulls };
  }, [points, clusters]);

  const toPath = (pts: [number, number][]) =>
    pts.length ? "M" + pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("L") + "Z" : "";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative mx-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[340px]">
          {/* axes frame */}
          <rect x={PAD - 6} y={PAD - 6} width={W - 2 * PAD + 12} height={H - 2 * PAD + 12} rx={10} fill="none" stroke="rgba(255,255,255,0.06)" />
          <text x={W / 2} y={H - 2} textAnchor="middle" className="fill-white/25" style={{ fontSize: 8, fontFamily: "var(--font-mono)" }}>
            t-SNE dim 1 →
          </text>
          <text x={6} y={H / 2} textAnchor="middle" transform={`rotate(-90 6 ${H / 2})`} className="fill-white/25" style={{ fontSize: 8, fontFamily: "var(--font-mono)" }}>
            t-SNE dim 2 →
          </text>

          {/* cluster hulls draw in */}
          {hulls.map((h, i) => (
            <motion.path
              key={h.id}
              d={toPath(h.path)}
              fill={`${h.color}14`}
              stroke={h.color}
              strokeWidth={1}
              strokeDasharray="3 3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: active && active !== h.id ? 0.15 : 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: "easeInOut" }}
            />
          ))}

          {/* points pop in with stagger */}
          {scaled.map((p, i) => {
            const color = clusters.find((c) => c.id === p.cluster)?.color ?? "#fff";
            const dim = active && active !== p.cluster;
            const isHover = hover?.label === p.label;
            return (
              <motion.circle
                key={p.label}
                cx={p.px}
                cy={p.py}
                r={isHover ? 6 : 4}
                fill={color}
                stroke="#0a0a0f"
                strokeWidth={1}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: dim ? 0.18 : 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i % 24) * 0.03, type: "spring", stiffness: 320, damping: 18 }}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHover(p)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </svg>

        {hover && (
          <div className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 rounded-lg border border-white/10 bg-ink/95 px-3 py-1.5 text-center backdrop-blur">
            <p className="text-xs font-semibold text-white">{hover.label}</p>
            {hover.meta && <p className="text-[10px] text-white/45">{hover.meta}</p>}
          </div>
        )}
      </div>

      {/* legend / cluster filter */}
      <div className="flex flex-wrap gap-2 sm:max-w-[40%] sm:flex-col">
        {clusters.map((c) => (
          <button
            key={c.id}
            onMouseEnter={() => setActive(c.id)}
            onMouseLeave={() => setActive(null)}
            className="flex items-center gap-2 rounded-lg px-2 py-1 text-left text-xs text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
