"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type CoAuthor = { id: string; name: string; affiliation: string; cluster: string };
type Cluster = { id: string; label: string; color: string };

const W = 460, H = 440, CX = W / 2, CY = H / 2;

export function CoAuthorGraph({
  authorLabel,
  coAuthors,
  clusters,
  papers,
}: {
  authorLabel: string;
  coAuthors: CoAuthor[];
  clusters: Cluster[];
  papers: string[][];
}) {
  const [hover, setHover] = useState<string | null>(null);

  const { nodes, centerEdges, coEdges, jointWithMe } = useMemo(() => {
    // joint papers with the author ("sdr")
    const jointWithMe: Record<string, number> = {};
    const coCount: Record<string, number> = {};
    papers.forEach((authors) => {
      const others = authors.filter((a) => a !== "sdr");
      others.forEach((a) => {
        if (authors.includes("sdr")) jointWithMe[a] = (jointWithMe[a] ?? 0) + 1;
      });
      // co-author ↔ co-author co-occurrence (excluding the author)
      for (let i = 0; i < others.length; i++) {
        for (let j = i + 1; j < others.length; j++) {
          const key = [others[i], others[j]].sort().join("|");
          coCount[key] = (coCount[key] ?? 0) + 1;
        }
      }
    });

    // Order co-authors by cluster so each affiliation forms a contiguous arc.
    const ordered = clusters.flatMap((c) => coAuthors.filter((a) => a.cluster === c.id));
    const n = ordered.length;
    const nodes = ordered.map((a, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const w = jointWithMe[a.id] ?? 1;
      // stronger collaborators sit a touch closer to the center
      const r = 150 - Math.min(w, 4) * 12;
      return {
        ...a,
        x: CX + Math.cos(angle) * r,
        y: CY + Math.sin(angle) * r,
        angle,
        weight: w,
        color: clusters.find((c) => c.id === a.cluster)!.color,
      };
    });

    const pos: Record<string, { x: number; y: number }> = {};
    nodes.forEach((nd) => (pos[nd.id] = { x: nd.x, y: nd.y }));

    const centerEdges = nodes.map((nd) => ({ to: nd.id, x: nd.x, y: nd.y, weight: nd.weight }));
    const coEdges = Object.entries(coCount).map(([key, weight]) => {
      const [a, b] = key.split("|");
      return { a, b, weight, ax: pos[a].x, ay: pos[a].y, bx: pos[b].x, by: pos[b].y };
    });

    return { nodes, centerEdges, coEdges, jointWithMe };
  }, [coAuthors, clusters, papers]);

  const neighbors = useMemo(() => {
    const m: Record<string, Set<string>> = { sdr: new Set() };
    centerEdges.forEach((e) => {
      m.sdr.add(e.to);
      (m[e.to] ??= new Set()).add("sdr");
    });
    coEdges.forEach((e) => {
      (m[e.a] ??= new Set()).add(e.b);
      (m[e.b] ??= new Set()).add(e.a);
    });
    return m;
  }, [centerEdges, coEdges]);

  const lit = (id: string) => !hover || hover === id || neighbors[hover]?.has(id);
  const hovered = hover && hover !== "sdr" ? coAuthors.find((a) => a.id === hover) : null;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" style={{ overflow: "visible" }}>
        {/* center → co-author edges */}
        {centerEdges.map((e) => {
          const on = !hover || hover === "sdr" || hover === e.to;
          return (
            <motion.line
              key={e.to}
              x1={CX} y1={CY} x2={e.x} y2={e.y}
              stroke="#22d3ee"
              strokeWidth={e.weight}
              strokeOpacity={on ? 0.5 : 0.08}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
            />
          );
        })}

        {/* co-author ↔ co-author edges (shared papers) */}
        {coEdges.map((e, i) => {
          const on = hover && (hover === e.a || hover === e.b);
          return (
            <line
              key={i}
              x1={e.ax} y1={e.ay} x2={e.bx} y2={e.by}
              stroke="#ffffff"
              strokeWidth={0.6}
              strokeOpacity={on ? 0.4 : 0.06}
            />
          );
        })}

        {/* center node — the author */}
        <g onMouseEnter={() => setHover("sdr")} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
          <motion.circle
            cx={CX} cy={CY} r={26}
            fill="#ec4899" fillOpacity={0.18} stroke="#ec4899" strokeWidth={2}
            animate={{ r: [26, 29, 26] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle cx={CX} cy={CY} r={26} fill="none" stroke="#ec4899" strokeOpacity={0.3} />
          <text x={CX} y={CY + 1} textAnchor="middle" className="fill-white" style={{ fontSize: 11, fontWeight: 800, fontFamily: "var(--font-display)" }}>
            {authorLabel}
          </text>
          <text x={CX} y={CY + 13} textAnchor="middle" className="fill-white/50" style={{ fontSize: 7, fontFamily: "var(--font-mono)" }}>
            you
          </text>
        </g>

        {/* co-author nodes */}
        {nodes.map((nd, i) => {
          const on = lit(nd.id);
          const r = 7 + Math.min(nd.weight, 4) * 2.2;
          const anchor = Math.cos(nd.angle) > 0.2 ? "start" : Math.cos(nd.angle) < -0.2 ? "end" : "middle";
          const lx = nd.x + Math.cos(nd.angle) * (r + 5);
          const ly = nd.y + Math.sin(nd.angle) * (r + 5);
          return (
            <g key={nd.id} onMouseEnter={() => setHover(nd.id)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
              <motion.circle
                cx={nd.x} cy={nd.y}
                fill={nd.color} fillOpacity={0.9} stroke="#0a0a0f" strokeWidth={1.5}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: on ? 1 : 0.25 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.05, type: "spring", stiffness: 280, damping: 16 }}
                animate={{ r: hover === nd.id ? r + 3 : r }}
              />
              <text
                x={lx} y={ly + 3}
                textAnchor={anchor}
                style={{ fontSize: 9, fontFamily: "var(--font-sans)", fill: on ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)", fontWeight: 600 }}
              >
                {nd.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* tooltip */}
      {hovered && (
        <div className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 rounded-xl border border-white/10 bg-ink/95 px-4 py-2 text-center backdrop-blur">
          <p className="text-sm font-semibold text-white">{hovered.name}</p>
          <p className="text-xs text-white/50">{hovered.affiliation}</p>
          <p className="mt-0.5 font-mono text-[10px] text-neon-cyan">
            {jointWithMe[hovered.id] ?? 0} paper{(jointWithMe[hovered.id] ?? 0) === 1 ? "" : "s"} together
          </p>
        </div>
      )}

      {/* legend */}
      <div className="mt-2 flex flex-wrap justify-center gap-4">
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
