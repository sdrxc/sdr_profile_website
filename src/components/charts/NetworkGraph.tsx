"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export type GraphNode = { id: string; label: string; cluster: string; weight?: number; x: number; y: number };
export type GraphLink = { source: string; target: string; weight?: number };
export type GraphCluster = { id: string; label: string; color: string };

const W = 340, H = 300, PAD = 24;

export function NetworkGraph({
  nodes,
  links,
  clusters,
}: {
  nodes: GraphNode[];
  links: GraphLink[];
  clusters: GraphCluster[];
}) {
  const [hover, setHover] = useState<string | null>(null);

  const pos = useMemo(() => {
    const xs = nodes.map((n) => n.x), ys = nodes.map((n) => n.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const map: Record<string, { x: number; y: number }> = {};
    nodes.forEach((n) => {
      map[n.id] = {
        x: PAD + ((n.x - minX) / (maxX - minX || 1)) * (W - 2 * PAD),
        y: PAD + ((n.y - minY) / (maxY - minY || 1)) * (H - 2 * PAD),
      };
    });
    return map;
  }, [nodes]);

  const colorOf = (cluster: string) => clusters.find((c) => c.id === cluster)?.color ?? "#fff";
  const neighbors = useMemo(() => {
    const m: Record<string, Set<string>> = {};
    links.forEach((l) => {
      (m[l.source] ??= new Set()).add(l.target);
      (m[l.target] ??= new Set()).add(l.source);
    });
    return m;
  }, [links]);

  const isLit = (id: string) => !hover || hover === id || neighbors[hover]?.has(id);

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
        {links.map((l, i) => {
          const a = pos[l.source], b = pos[l.target];
          if (!a || !b) return null;
          const lit = !hover || hover === l.source || hover === l.target;
          return (
            <motion.line
              key={i}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={colorOf(nodes.find((n) => n.id === l.source)!.cluster)}
              strokeWidth={(l.weight ?? 1) * 0.8}
              strokeOpacity={lit ? 0.45 : 0.08}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 + (i % 14) * 0.05 }}
            />
          );
        })}
        {nodes.map((n, i) => {
          const lit = isLit(n.id);
          const r = 4 + (n.weight ?? 1) * 2.5;
          return (
            <g key={n.id} style={{ cursor: "pointer" }} onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)}>
              <motion.circle
                cx={pos[n.id].x} cy={pos[n.id].y}
                fill={colorOf(n.cluster)}
                stroke="#0a0a0f" strokeWidth={1.5}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: lit ? 1 : 0.2 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.04, type: "spring", stiffness: 300, damping: 16 }}
                animate={{ r: hover === n.id ? r + 3 : r }}
              />
              {(hover === n.id || (n.weight ?? 0) >= 2) && (
                <text
                  x={pos[n.id].x} y={pos[n.id].y - r - 4}
                  textAnchor="middle"
                  className="fill-white"
                  style={{ fontSize: 8, fontFamily: "var(--font-mono)", opacity: lit ? 0.85 : 0.2 }}
                >
                  {n.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-3">
        {clusters.map((c) => (
          <span key={c.id} className="flex items-center gap-1.5 text-xs text-white/55">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
