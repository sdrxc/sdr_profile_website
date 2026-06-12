"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Cluster = { id: string; label: string; color: string; skills: string[] };

const W = 520, H = 480, CX = W / 2, CY = H / 2;
const R_HUB = 120;
const R_SKILL = 196;

export function SkillGraph({ clusters, coreLabel = "stack" }: { clusters: Cluster[]; coreLabel?: string }) {
  const [hub, setHub] = useState<string | null>(null);

  const layout = useMemo(() => {
    const n = clusters.length;
    return clusters.map((c, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const hx = CX + Math.cos(a) * R_HUB;
      const hy = CY + Math.sin(a) * R_HUB;
      const m = c.skills.length;
      const spread = Math.min(0.92, 0.26 * m); // radians total fan
      const skills = c.skills.map((s, j) => {
        const sa = a + (m === 1 ? 0 : (j / (m - 1) - 0.5) * spread);
        return { label: s, x: CX + Math.cos(sa) * R_SKILL, y: CY + Math.sin(sa) * R_SKILL };
      });
      return { ...c, hx, hy, skills };
    });
  }, [clusters]);

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" style={{ overflow: "visible" }}>
        {/* core → hub edges */}
        {layout.map((c) => {
          const lit = !hub || hub === c.id;
          return (
            <motion.line
              key={`e-${c.id}`}
              x1={CX} y1={CY} x2={c.hx} y2={c.hy}
              stroke={c.color} strokeWidth={2.5} strokeOpacity={lit ? 0.6 : 0.1}
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            />
          );
        })}
        {/* hub → skill edges */}
        {layout.map((c) =>
          c.skills.map((s, j) => {
            const lit = !hub || hub === c.id;
            return (
              <line key={`se-${c.id}-${j}`} x1={c.hx} y1={c.hy} x2={s.x} y2={s.y} stroke={c.color} strokeWidth={1} strokeOpacity={lit ? 0.3 : 0.05} />
            );
          })
        )}

        {/* skill nodes */}
        {layout.map((c) =>
          c.skills.map((s, j) => {
            const lit = !hub || hub === c.id;
            return (
              <g key={`s-${c.id}-${j}`}>
                <motion.circle
                  cx={s.x} cy={s.y} r={4} fill={c.color}
                  initial={{ scale: 0 }} whileInView={{ scale: 1, opacity: lit ? 1 : 0.2 }} viewport={{ once: true }}
                  transition={{ delay: 0.3 + j * 0.04, type: "spring", stiffness: 300, damping: 16 }}
                />
                <text
                  x={s.x + (s.x >= CX ? 7 : -7)} y={s.y + 3}
                  textAnchor={s.x >= CX ? "start" : "end"}
                  style={{ fontSize: 9, fontFamily: "var(--font-mono)", fill: hub === c.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.32)" }}
                >
                  {s.label}
                </text>
              </g>
            );
          })
        )}

        {/* hub nodes */}
        {layout.map((c) => (
          <g key={`h-${c.id}`} style={{ cursor: "pointer" }} onMouseEnter={() => setHub(c.id)} onMouseLeave={() => setHub(null)}>
            <motion.circle
              cx={c.hx} cy={c.hy} fill="#0a0a14" stroke={c.color} strokeWidth={2.5}
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              animate={{ r: hub === c.id ? 13 : 10 }}
            />
            <text x={c.hx} y={c.hy - 16} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fontFamily: "var(--font-display)", fill: c.color }}>
              {c.label}
            </text>
          </g>
        ))}

        {/* core */}
        <circle cx={CX} cy={CY} r={26} fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth={2.5} />
        <text x={CX} y={CY + 4} textAnchor="middle" style={{ fontSize: 12, fontWeight: 800, fontFamily: "var(--font-display)", fill: "#fff" }}>
          {coreLabel}
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
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
