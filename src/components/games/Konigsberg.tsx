"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * The Seven Bridges of Königsberg — the puzzle Euler proved impossible in 1736,
 * which birthed graph theory. Cross all 7 bridges exactly once.
 *
 * Degrees of the four lands (A=3, B=3, C=5, D=3) are all odd. An Eulerian path
 * requires at most two odd-degree vertices — so no solution exists.
 */

type NodeId = "A" | "B" | "C" | "D";

const NODES: Record<NodeId, { x: number; y: number; label: string }> = {
  A: { x: 200, y: 60, label: "North Bank" },
  B: { x: 200, y: 340, label: "South Bank" },
  C: { x: 70, y: 200, label: "Kneiphof Isle" },
  D: { x: 330, y: 200, label: "Lomse Isle" },
};

type Bridge = { id: number; a: NodeId; b: NodeId; curve: number };

const BRIDGES: Bridge[] = [
  { id: 1, a: "A", b: "C", curve: -35 },
  { id: 2, a: "A", b: "C", curve: 35 },
  { id: 3, a: "A", b: "D", curve: 0 },
  { id: 4, a: "B", b: "C", curve: -35 },
  { id: 5, a: "B", b: "C", curve: 35 },
  { id: 6, a: "B", b: "D", curve: 0 },
  { id: 7, a: "C", b: "D", curve: 0 },
];

function bridgePath(b: Bridge) {
  const a = NODES[b.a];
  const c = NODES[b.b];
  const mx = (a.x + c.x) / 2;
  const my = (a.y + c.y) / 2;
  const dx = c.x - a.x;
  const dy = c.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * b.curve;
  const ny = (dx / len) * b.curve;
  return { d: `M ${a.x},${a.y} Q ${mx + nx},${my + ny} ${c.x},${c.y}`, lx: mx + nx, ly: my + ny };
}

export function Konigsberg() {
  const [crossed, setCrossed] = useState<number[]>([]);
  const [current, setCurrent] = useState<NodeId | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [reveal, setReveal] = useState(false);

  const stuck = useMemo(
    () =>
      current !== null &&
      crossed.length < 7 &&
      BRIDGES.every((b) => crossed.includes(b.id) || (b.a !== current && b.b !== current)),
    [crossed, current]
  );

  const won = crossed.length === 7; // mathematically impossible

  const reset = () => {
    if (crossed.length > 0 || stuck) setAttempts((a) => a + 1);
    setCrossed([]);
    setCurrent(null);
  };

  const start = (n: NodeId) => {
    if (current !== null) return;
    setCurrent(n);
  };

  const cross = (id: number) => {
    if (current === null || crossed.includes(id)) return;
    const b = BRIDGES.find((x) => x.id === id)!;
    if (b.a !== current && b.b !== current) return;
    setCurrent(b.a === current ? b.b : b.a);
    setCrossed((c) => [...c, id]);
  };

  useEffect(() => {
    if (attempts >= 2) setReveal(true);
  }, [attempts]);

  const bridgePaths = useMemo(() => BRIDGES.map((b) => ({ b, ...bridgePath(b) })), []);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        className="overflow-hidden rounded-2xl border-2 border-neon-cyan/40 bg-black/60 p-5 backdrop-blur sm:p-6"
        style={{ boxShadow: "0 0 40px -8px rgba(0,240,255,0.5)" }}
      >
        <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/55">
          <span>Crossed <span className="text-neon-cyan">{crossed.length}</span>/7</span>
          <span>Attempts <span className="text-neon-pink">{attempts}</span></span>
          <button
            onClick={reset}
            className="rounded border border-white/15 px-2 py-1 text-[10px] uppercase tracking-widest text-white/70 hover:border-fuchsia-300/40 hover:text-white"
          >
            Reset
          </button>
        </div>

        <div className="relative">
          <svg viewBox="0 0 400 400" className="block w-full">
            {/* river */}
            <rect x="0" y="170" width="400" height="60" fill="rgba(0,240,255,0.05)" />
            <path
              d="M 0,200 Q 100,180 200,200 T 400,200"
              stroke="rgba(0,240,255,0.22)"
              strokeWidth="1"
              fill="none"
            />
            <text x="10" y="190" fontSize="9" fill="rgba(0,240,255,0.4)" fontFamily="monospace">
              river pregel
            </text>

            {/* bridges */}
            {bridgePaths.map(({ b, d, lx, ly }) => {
              const isCrossed = crossed.includes(b.id);
              const canCross =
                current !== null && !isCrossed && (b.a === current || b.b === current);
              return (
                <g
                  key={b.id}
                  className={canCross ? "cursor-pointer" : ""}
                  onClick={() => canCross && cross(b.id)}
                >
                  {/* invisible thick hit area for easy clicking */}
                  <path d={d} stroke="transparent" strokeWidth="18" fill="none" />
                  <path
                    d={d}
                    stroke={isCrossed ? "#ff2d95" : canCross ? "#00f0ff" : "rgba(255,255,255,0.22)"}
                    strokeWidth={isCrossed ? 4 : canCross ? 3.5 : 2.5}
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      filter: isCrossed
                        ? "drop-shadow(0 0 6px rgba(255,45,149,0.7))"
                        : canCross
                          ? "drop-shadow(0 0 6px rgba(0,240,255,0.55))"
                          : "",
                    }}
                  />
                  <circle
                    cx={lx}
                    cy={ly}
                    r="9"
                    fill="#0a0a14"
                    stroke={isCrossed ? "#ff2d95" : canCross ? "#00f0ff" : "rgba(255,255,255,0.3)"}
                    strokeWidth="1.5"
                  />
                  <text
                    x={lx}
                    y={ly + 3}
                    fill="white"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                    opacity={isCrossed ? 0.5 : 0.9}
                  >
                    {b.id}
                  </text>
                </g>
              );
            })}

            {/* nodes */}
            {(Object.keys(NODES) as NodeId[]).map((k) => {
              const n = NODES[k];
              const isCurrent = current === k;
              const clickable = current === null;
              return (
                <g
                  key={k}
                  className={clickable ? "cursor-pointer" : ""}
                  onClick={() => clickable && start(k)}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="24"
                    fill={isCurrent ? "rgba(255,45,149,0.18)" : "#13131d"}
                    stroke={isCurrent ? "#ff2d95" : "#00f0ff"}
                    strokeWidth="2"
                    style={{
                      filter: isCurrent
                        ? "drop-shadow(0 0 12px rgba(255,45,149,0.6))"
                        : "drop-shadow(0 0 6px rgba(0,240,255,0.3))",
                    }}
                  />
                  <text
                    x={n.x}
                    y={n.y + 5}
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {k}
                  </text>
                  <text
                    x={n.x}
                    y={n.y + 44}
                    fill="rgba(255,255,255,0.55)"
                    fontSize="9"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {current === null && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-1">
              <p className="rounded bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
                ▸ pick a starting land ◂
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          {won ? (
            <p className="font-mono text-sm text-emerald-300">
              ✓ You broke 290 years of mathematics. Tell Euler.
            </p>
          ) : stuck ? (
            <p className="font-mono text-sm text-rose-300">
              ✗ Stuck — every remaining bridge is across the river.
            </p>
          ) : (
            <p className="font-mono text-[11px] text-white/55">
              Click adjacent bridges to cross. Each bridge exactly once.
            </p>
          )}

          {reveal && (
            <div className="mt-3 rounded-lg border border-fuchsia-400/30 bg-black/40 p-3 text-left text-xs text-white/70">
              <p className="font-semibold text-fuchsia-300">Why it&apos;s impossible</p>
              <p className="mt-1 leading-relaxed">
                Count the bridges at each land:{" "}
                <span className="text-neon-cyan">A=3</span>,{" "}
                <span className="text-neon-cyan">B=3</span>,{" "}
                <span className="text-neon-cyan">C=5</span>,{" "}
                <span className="text-neon-cyan">D=3</span> — all{" "}
                <em>odd</em>. For an Eulerian walk to exist, at most two lands can have an odd
                count. So this map has no solution. In 1736 Euler turned this into the first ever
                graph-theory paper.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
