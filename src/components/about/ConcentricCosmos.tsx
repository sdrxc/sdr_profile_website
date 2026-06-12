"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { about } from "@/data/about";

const SIZE = 300;
const C = SIZE / 2;

export function ConcentricCosmos() {
  const { cosmos, postalCode, galactic } = about;
  const [active, setActive] = useState(0); // 0 = innermost (Earth)

  // evenly spaced radii from center outward
  const rings = cosmos.map((_, i) => 30 + (i * (C - 38)) / (cosmos.length - 1));
  const activeR = rings[active];

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
        <span className="jp neon-pink-text text-lg tracking-normal">宇宙</span> // last seen
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold text-white">I'm here</h3>
      <p className="mt-1 text-sm text-white/45">Hover a layer to zoom out through the cosmos</p>

      <div className="mt-5 flex flex-col items-center gap-6 lg:flex-row lg:items-center">
        {/* rings */}
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full max-w-[260px] shrink-0">
          <defs>
            <radialGradient id="cosmosCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,240,255,0.18)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx={C} cy={C} r={C - 10} fill="url(#cosmosCore)" />

          {rings.map((r, i) => {
            const on = i <= active;
            const isActive = i === active;
            return (
              <motion.circle
                key={i}
                cx={C}
                cy={C}
                r={r}
                fill="none"
                stroke={isActive ? "#00f0ff" : on ? "rgba(0,240,255,0.5)" : "rgba(255,255,255,0.12)"}
                strokeWidth={isActive ? 2.5 : 1}
                strokeDasharray={isActive ? undefined : "1.5 7"}
                strokeLinecap="round"
                filter={isActive ? "url(#ringGlow)" : undefined}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActive(i)}
              />
            );
          })}

          {/* orbiting planets — each ring revolves at its own pace */}
          {rings.map((r, i) => {
            const dir = i % 2 ? 1 : -1;
            const planetColor = ["#00f0ff", "#ff2d95", "#b14dff", "#fbbf24"][i % 4];
            return (
              <motion.g
                key={`orbit-${i}`}
                animate={{ rotate: 360 * dir }}
                transition={{ duration: 12 + i * 5, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: `${C}px ${C}px` }}
              >
                <circle cx={C} cy={C - r} r={i === active ? 0 : 2.4} fill={planetColor} opacity={0.8} />
              </motion.g>
            );
          })}

          {/* pulsing active ring */}
          <motion.circle
            cx={C}
            cy={C}
            r={activeR}
            fill="none"
            stroke="#00f0ff"
            strokeWidth={1}
            animate={{ opacity: [0.6, 0, 0.6], r: [activeR, activeR + 6, activeR] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />

          {/* orbiting marker on the active ring */}
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `${C}px ${C}px` }}>
            <circle cx={C} cy={C - activeR} r={5} fill="#ff2d95" />
            <circle cx={C} cy={C - activeR} r={10} fill="none" stroke="#ff2d95" strokeOpacity={0.4} />
          </motion.g>

          {/* center — postal code */}
          <circle cx={C} cy={C} r={22} fill="rgba(255,138,92,0.18)" stroke="#ff8a5c" strokeWidth={1.5} filter="url(#ringGlow)" />
          <text x={C} y={C - 1} textAnchor="middle" className="fill-neon-amber" style={{ fontSize: 15, fontWeight: 800, fontFamily: "var(--font-display)" }}>
            {postalCode}
          </text>
          <text x={C} y={C + 10} textAnchor="middle" className="fill-white/45" style={{ fontSize: 6, fontFamily: "var(--font-mono)" }}>
            POSTAL
          </text>
        </svg>

        {/* layer list — replaces the overlapping on-ring labels */}
        <ul className="w-full space-y-1">
          {cosmos.map((layer, i) => {
            const isActive = i === active;
            return (
              <li key={layer.label}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-1.5 text-left transition-all ${
                    isActive
                      ? "border-neon-cyan/50 bg-neon-cyan/10"
                      : "border-transparent hover:bg-white/5"
                  }`}
                >
                  <span className="text-base">{layer.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-sm font-semibold ${isActive ? "neon-cyan-text" : "text-white/85"}`}>
                      {layer.label}
                    </span>
                    <span className="block text-[10px] uppercase tracking-wider text-white/35">{layer.sub}</span>
                  </span>
                  {isActive && <span className="font-mono text-[10px] text-neon-cyan">◂ here</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* galactic readout */}
      <div className="mt-5 grid gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs sm:grid-cols-2">
        <div className="space-y-1">
          <p className="neon-cyan-text">{galactic.distanceFromCenter}</p>
          <p className="text-white/70">{galactic.coordinates}</p>
          <p className="text-white/30">{galactic.coordinatesNote}</p>
        </div>
        <div className="space-y-2">
          {galactic.velocity.map((v) => (
            <div key={v.label}>
              <div className="flex justify-between">
                <span className="text-white/40">{v.label}</span>
                <span className="text-neon-pink">{v.value} km/s</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #00f0ff, #ff2d95)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(v.value / v.max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
