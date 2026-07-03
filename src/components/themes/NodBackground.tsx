"use client";

/* ──────────────────────────────────────────────────────────────────────────
   Nod-inspired paper backdrop — minimal, warm, editorial.

   Calm cream wash; four large soft pastel blobs drift at different parallax
   rates as the page scrolls; faint dot grid + paper grain sit on top. No
   neon, no glass, no glow — restraint and whitespace, in the spirit of
   nodcoding.com.
   ────────────────────────────────────────────────────────────────────────── */

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type Blob = {
  className: string; // position + size
  color: string;     // hex
  parallax: number;  // 0..1 — how much it translates with scroll
  drift: number;     // horizontal subtle drift
  rotate?: boolean;
};

const BLOBS: Blob[] = [
  { className: "left-[-12%] top-[8%] h-[42vw] w-[42vw] max-h-[640px] max-w-[640px]", color: "#f0c8a8", parallax: -80, drift: 30, rotate: true },
  { className: "right-[-10%] top-[28%] h-[36vw] w-[36vw] max-h-[560px] max-w-[560px]", color: "#dfe6cf", parallax: -160, drift: -40, rotate: true },
  { className: "left-[12%] top-[55%] h-[44vw] w-[44vw] max-h-[680px] max-w-[680px]", color: "#f2d8a8", parallax: -240, drift: 50 },
  { className: "right-[6%] top-[78%] h-[34vw] w-[34vw] max-h-[520px] max-w-[520px]", color: "#e8cdc0", parallax: -320, drift: -25, rotate: true },
];

function ParallaxBlob({ blob, smooth }: { blob: Blob; smooth: ReturnType<typeof useSpring> }) {
  const y = useTransform(smooth, [0, 1], [0, blob.parallax]);
  const x = useTransform(smooth, [0, 1], [0, blob.drift]);
  const rotate = useTransform(smooth, [0, 1], [0, blob.rotate ? 18 : 0]);

  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full ${blob.className}`}
      style={{
        y,
        x,
        rotate,
        background: blob.color,
        filter: "blur(70px)",
        opacity: 0.55,
        mixBlendMode: "multiply",
      }}
    />
  );
}

export function NodBackground() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 28, mass: 0.8 });

  // Subtle warm shift: top is cream-white, deepens slightly as you descend.
  const base = useTransform(
    smooth,
    [0, 0.5, 1],
    [
      "linear-gradient(180deg, #faf4ea 0%, #f5ecdc 100%)",
      "linear-gradient(180deg, #f5ecdc 0%, #efe3cf 100%)",
      "linear-gradient(180deg, #efe3cf 0%, #e8dac1 100%)",
    ]
  );

  // The dot-grid drifts very slightly upward as you scroll
  const gridY = useTransform(smooth, [0, 1], [0, -40]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* base paper wash */}
      <motion.div className="absolute inset-0" style={{ background: base }} />

      {/* soft pastel blobs */}
      {BLOBS.map((b, i) => (
        <ParallaxBlob key={i} blob={b} smooth={smooth} />
      ))}

      {/* dot grid (very faint, parallaxed slightly) */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: gridY,
          backgroundImage:
            "radial-gradient(circle, rgba(40,28,18,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />

      {/* paper grain */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* hairline divider at the very bottom — editorial touch */}
      <div className="absolute inset-x-12 bottom-10 h-px bg-[#1a1916]/15" />
    </div>
  );
}
