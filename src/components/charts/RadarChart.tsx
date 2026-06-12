"use client";

import { motion } from "framer-motion";

export type RadarSeries = { label: string; color: string; values: number[] };

const SIZE = 280, R = 100, CX = SIZE / 2, CY = SIZE / 2;

export function RadarChart({
  axes,
  series,
}: {
  axes: string[]; // 0..1 normalized values expected in series
  series: RadarSeries[];
}) {
  const n = axes.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i: number, v: number) => [CX + Math.cos(angle(i)) * R * v, CY + Math.sin(angle(i)) * R * v];
  const polygon = (vals: number[]) => vals.map((v, i) => point(i, v).join(",")).join(" ");

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full max-w-[300px]">
        {/* rings */}
        {[0.25, 0.5, 0.75, 1].map((r) => (
          <polygon
            key={r}
            points={Array.from({ length: n }, (_, i) => point(i, r).join(",")).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        ))}
        {/* spokes + labels */}
        {axes.map((a, i) => {
          const [x, y] = point(i, 1);
          const [lx, ly] = point(i, 1.18);
          return (
            <g key={a}>
              <line x1={CX} y1={CY} x2={x} y2={y} stroke="rgba(255,255,255,0.08)" />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="fill-white/55" style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>
                {a}
              </text>
            </g>
          );
        })}
        {/* series */}
        {series.map((s, si) => (
          <g key={s.label}>
            <motion.polygon
              points={polygon(s.values)}
              fill={`${s.color}22`}
              stroke={s.color}
              strokeWidth={2}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 + si * 0.2, type: "spring", stiffness: 120, damping: 16 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            />
            {s.values.map((v, i) => {
              const [x, y] = point(i, v);
              return (
                <motion.circle
                  key={i} cx={x} cy={y} r={3} fill={s.color}
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                />
              );
            })}
          </g>
        ))}
      </svg>
      {series.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3">
          {series.map((s) => (
            <span key={s.label} className="flex items-center gap-1.5 text-xs text-white/55">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
