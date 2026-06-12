"use client";

import { motion } from "framer-motion";

/** Faded pathfinding / graph-traversal diagrams behind the Explorer page. */
const S = "rgba(94,234,212,0.9)"; // teal

const NODES: [number, number][] = [
  [100, 22],
  [52, 74], [148, 74],
  [28, 126], [76, 126], [124, 126], [172, 126],
];
const EDGES: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];

function Tree({ label, order }: { label: string; order: number[] }) {
  return (
    <svg viewBox="0 0 200 150" className="h-auto w-full" fill="none" stroke={S} strokeWidth={1.3}>
      <text x={6} y={14} fill={S} style={{ fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 700 }}>{label}</text>
      {EDGES.map(([a, b], i) => (
        <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
      ))}
      {NODES.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={11} />
          <text x={x} y={y + 3.5} textAnchor="middle" fill={S} style={{ fontSize: 10, fontFamily: "var(--font-mono)" }}>{order[i]}</text>
        </g>
      ))}
    </svg>
  );
}

function Dijkstra() {
  // nodes A..E, weighted edges, highlighted shortest path A→C→E
  const N: Record<string, [number, number]> = { A: [24, 80], B: [90, 26], C: [110, 120], D: [180, 40], E: [196, 110] };
  const E: [string, string, number][] = [["A", "B", 4], ["A", "C", 2], ["B", "C", 1], ["B", "D", 5], ["C", "E", 8], ["D", "E", 2]];
  const path = new Set(["A-C", "C-E"]);
  return (
    <svg viewBox="0 0 220 150" className="h-auto w-full" fill="none" stroke={S} strokeWidth={1.2}>
      <text x={6} y={14} fill={S} style={{ fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 700 }}>Dijkstra</text>
      {E.map(([a, b, w], i) => {
        const on = path.has(`${a}-${b}`);
        const mx = (N[a][0] + N[b][0]) / 2, my = (N[a][1] + N[b][1]) / 2;
        return (
          <g key={i}>
            <line x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} strokeWidth={on ? 2.4 : 1} strokeOpacity={on ? 1 : 0.5} />
            <text x={mx} y={my - 2} textAnchor="middle" fill={S} style={{ fontSize: 8, fontFamily: "var(--font-mono)" }}>{w}</text>
          </g>
        );
      })}
      {Object.entries(N).map(([k, [x, y]]) => (
        <g key={k}>
          <circle cx={x} cy={y} r={10} />
          <text x={x} y={y + 3} textAnchor="middle" fill={S} style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>{k}</text>
        </g>
      ))}
    </svg>
  );
}

function AStar() {
  const cols = 7, rows = 5, cell = 24, ox = 8, oy = 22;
  const path = new Set(["0,4", "1,4", "2,3", "3,3", "4,2", "5,1", "6,1"]); // col,row
  return (
    <svg viewBox={`0 0 ${ox * 2 + cols * cell} ${oy + rows * cell + 6}`} className="h-auto w-full" fill="none" stroke={S} strokeWidth={1}>
      <text x={6} y={14} fill={S} style={{ fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 700 }}>A*</text>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const on = path.has(`${c},${r}`);
          return <rect key={`${c}-${r}`} x={ox + c * cell} y={oy + r * cell} width={cell} height={cell} strokeOpacity={0.35} fill={on ? "rgba(94,234,212,0.25)" : "none"} />;
        })
      )}
      {/* straight-line heuristic */}
      <line x1={ox + 0.5 * cell} y1={oy + 4.5 * cell} x2={ox + 6.5 * cell} y2={oy + 1.5 * cell} strokeDasharray="3 4" strokeOpacity={0.8} />
      <text x={ox + 4} y={oy + 4.5 * cell + 4} fill={S} style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>S</text>
      <text x={ox + 6 * cell + 8} y={oy + 1.5 * cell + 4} fill={S} style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>G</text>
    </svg>
  );
}

export function ExplorerBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -9 }} aria-hidden>
      <motion.div className="absolute left-[2%] top-[10%] w-[clamp(150px,15vw,230px)] opacity-[0.12]" animate={{ y: [0, -12, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}>
        <Tree label="BFS" order={[1, 2, 3, 4, 5, 6, 7]} />
      </motion.div>
      <motion.div className="absolute right-[2%] top-[12%] w-[clamp(150px,15vw,230px)] opacity-[0.12]" animate={{ y: [0, 12, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}>
        <Tree label="DFS" order={[1, 2, 5, 3, 4, 6, 7]} />
      </motion.div>
      <motion.div className="absolute bottom-[8%] left-[2%] w-[clamp(170px,18vw,260px)] opacity-[0.11]" animate={{ y: [0, 10, 0] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}>
        <Dijkstra />
      </motion.div>
      <motion.div className="absolute bottom-[9%] right-[2%] w-[clamp(170px,18vw,260px)] opacity-[0.11]" animate={{ y: [0, -10, 0] }} transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}>
        <AStar />
      </motion.div>
    </div>
  );
}
