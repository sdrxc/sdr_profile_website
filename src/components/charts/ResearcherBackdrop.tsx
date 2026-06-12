"use client";

import { motion } from "framer-motion";

/**
 * Faint, hand-drawn-feel architecture diagrams behind the Researcher page:
 * a Transformer (right) and a DenseNet-style CNN (lower-left). Purely decorative.
 */

const STROKE = "rgba(80,230,255,0.95)";

function block(label: string, x: number, y: number, w = 116, h = 30) {
  return (
    <g key={`${label}-${y}`}>
      <rect x={x} y={y} width={w} height={h} rx={7} fill="none" stroke={STROKE} strokeWidth={1.4} />
      <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fill={STROKE} style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>
        {label}
      </text>
    </g>
  );
}

function Transformer() {
  const enc = ["Embed + PE", "Norm", "Self-Attention", "Norm", "Feed-Forward"];
  const dec = ["Embed + PE", "Masked Attn", "Cross-Attention", "Feed-Forward", "Linear"];
  const top = 40;
  const gap = 52;
  const colX = (i: number) => (i === 0 ? 40 : 200);
  const yOf = (i: number) => top + i * gap;

  const column = (labels: string[], col: number) =>
    labels.map((l, i) => (
      <g key={`${col}-${i}`}>
        {block(l, colX(col), yOf(i))}
        {i < labels.length - 1 && (
          <line x1={colX(col) + 58} y1={yOf(i) + 30} x2={colX(col) + 58} y2={yOf(i + 1)} stroke={STROKE} strokeWidth={1} markerEnd="url(#arrow)" />
        )}
      </g>
    ));

  return (
    <svg viewBox="0 0 380 360" className="h-auto w-full">
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={STROKE} />
        </marker>
      </defs>
      {/* Nx dashed wrappers */}
      <rect x={28} y={yOf(1) - 8} width={140} height={gap * 4 - 18} rx={12} fill="none" stroke={STROKE} strokeWidth={1} strokeDasharray="4 5" />
      <rect x={188} y={yOf(1) - 8} width={140} height={gap * 4 - 18} rx={12} fill="none" stroke={STROKE} strokeWidth={1} strokeDasharray="4 5" />
      <text x={98} y={28} textAnchor="middle" fill={STROKE} style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>ENCODER · Nx</text>
      <text x={258} y={28} textAnchor="middle" fill={STROKE} style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>DECODER · Nx</text>
      {column(enc, 0)}
      {column(dec, 1)}
      {/* cross-attention link */}
      <path d={`M156 ${yOf(4) + 15} C 180 ${yOf(4) + 15}, 180 ${yOf(2) + 15}, 200 ${yOf(2) + 15}`} fill="none" stroke={STROKE} strokeWidth={1} strokeDasharray="3 4" markerEnd="url(#arrow)" />
    </svg>
  );
}

function DenseNet() {
  // diagonal stack of feature-map "planes" with dense skip connections
  const planes = [0, 1, 2, 3, 4];
  const px = (i: number) => 30 + i * 95;
  const py = (i: number) => 40 + i * 34;
  const PW = 54, PH = 70, SKEW = 22;

  const plane = (i: number) => {
    const x = px(i), y = py(i);
    return (
      <polygon
        key={i}
        points={`${x},${y} ${x + PW},${y - SKEW} ${x + PW},${y - SKEW + PH} ${x},${y + PH}`}
        fill="none"
        stroke={STROKE}
        strokeWidth={1}
      />
    );
  };

  // dense connections: from each plane center to all later planes
  const arcs = [];
  for (let i = 0; i < planes.length; i++) {
    for (let j = i + 1; j < planes.length; j++) {
      const x1 = px(i) + PW / 2, y1 = py(i) + PH / 2 - SKEW / 2;
      const x2 = px(j) + PW / 2, y2 = py(j) + PH / 2 - SKEW / 2;
      const cy = Math.min(y1, y2) + 90;
      arcs.push(
        <path key={`${i}-${j}`} d={`M${x1} ${y1} Q ${(x1 + x2) / 2} ${cy} ${x2} ${y2}`} fill="none" stroke={STROKE} strokeWidth={0.7} opacity={0.6} />
      );
    }
  }

  return (
    <svg viewBox="0 0 520 280" className="h-auto w-full">
      {arcs}
      {planes.map(plane)}
      {planes.slice(0, 4).map((i) => (
        <text key={`h${i}`} x={px(i) + 70} y={py(i) - 24} fill={STROKE} style={{ fontSize: 8, fontFamily: "var(--font-mono)" }}>
          BN-ReLU-Conv
        </text>
      ))}
      <text x={px(0)} y={py(0) - 28} fill={STROKE} style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>Input x₀</text>
      <text x={px(4) - 6} y={py(4) + 96} fill={STROKE} style={{ fontSize: 8, fontFamily: "var(--font-mono)" }}>Transition Layer</text>
    </svg>
  );
}

export function ResearcherBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -9 }} aria-hidden>
      <motion.div
        className="absolute right-[1%] top-[7%] w-[clamp(300px,34vw,480px)] opacity-[0.22]"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <Transformer />
      </motion.div>
      <motion.div
        className="absolute bottom-[5%] left-[1%] w-[clamp(320px,36vw,540px)] opacity-[0.18]"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <DenseNet />
      </motion.div>
    </div>
  );
}
