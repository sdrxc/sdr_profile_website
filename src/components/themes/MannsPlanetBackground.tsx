"use client";

/* ──────────────────────────────────────────────────────────────────────────
   Mann's Planet — a subtle, frozen Interstellar backdrop.

   Layered, scroll-driven parallax:
     · sky gradient (cold ice-blue → pale slate)
     · distant frozen cloud-cliffs (blurred, slow drift)
     · mid cloud-cliffs
     · near horizon line + ice plain
     · cold pinhole sun
     · drifting snow particles

   Every layer translates at a different rate as the page scrolls, so the
   world quietly shifts beneath the atlas without ever drawing attention to
   itself. Cold, minimal, restrained.
   ────────────────────────────────────────────────────────────────────────── */

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/* A single cloud-cliff layer — flat-topped, jagged-edged frozen formations. */
function CliffLayer({
  fill,
  opacity = 1,
  blur = 0,
  className = "",
  shapes,
}: {
  fill: string;
  opacity?: number;
  blur?: number;
  className?: string;
  shapes: string;
}) {
  return (
    <svg
      viewBox="0 0 1600 400"
      preserveAspectRatio="xMidYMax slice"
      className={`absolute inset-x-0 h-[60vh] w-full ${className}`}
      style={{ opacity, filter: blur ? `blur(${blur}px)` : undefined }}
      aria-hidden
    >
      <path d={shapes} fill={fill} />
    </svg>
  );
}

const FAR_CLIFFS =
  "M0 280 L 60 240 L 120 260 L 180 210 L 260 240 L 320 200 L 420 230 L 500 195 L 600 220 L 700 180 L 820 215 L 920 190 L 1020 225 L 1120 200 L 1220 230 L 1320 195 L 1420 220 L 1520 200 L 1600 230 L 1600 400 L 0 400 Z";

const MID_CLIFFS =
  "M0 310 L 80 285 L 160 300 L 240 270 L 340 295 L 420 260 L 520 290 L 620 255 L 740 285 L 840 260 L 940 290 L 1040 265 L 1160 290 L 1260 260 L 1360 285 L 1460 270 L 1560 290 L 1600 280 L 1600 400 L 0 400 Z";

const NEAR_CLIFFS =
  "M0 340 L 100 320 L 200 330 L 280 308 L 380 325 L 480 305 L 580 322 L 680 300 L 800 318 L 920 295 L 1040 315 L 1160 300 L 1280 318 L 1400 308 L 1520 320 L 1600 305 L 1600 400 L 0 400 Z";

/* Drifting snowflake — slow, hypnotic. */
function Flake({
  size,
  startX,
  duration,
  delay,
  opacity,
}: {
  size: number;
  startX: string;
  duration: number;
  delay: number;
  opacity: number;
}) {
  return (
    <motion.span
      className="absolute rounded-full bg-white"
      style={{
        width: size,
        height: size,
        left: startX,
        top: "-5%",
        opacity,
        filter: "blur(0.5px)",
        boxShadow: "0 0 4px rgba(255,255,255,0.4)",
      }}
      animate={{
        y: ["0vh", "120vh"],
        x: [0, 20, -10, 15, 0],
      }}
      transition={{
        y: { duration, repeat: Infinity, ease: "linear", delay },
        x: { duration: duration * 0.6, repeat: Infinity, ease: "easeInOut", delay },
      }}
      aria-hidden
    />
  );
}

export function MannsPlanetBackground() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.7 });

  /* Parallax: each layer translates at a different rate. */
  const skyY = useTransform(smooth, [0, 1], ["0%", "-12%"]);
  const farY = useTransform(smooth, [0, 1], ["0%", "-22%"]);
  const midY = useTransform(smooth, [0, 1], ["0%", "-38%"]);
  const nearY = useTransform(smooth, [0, 1], ["0%", "-55%"]);
  const sunX = useTransform(smooth, [0, 1], ["0%", "20%"]);
  const sunY = useTransform(smooth, [0, 1], ["0%", "60%"]);
  const sunOpacity = useTransform(smooth, [0, 0.6, 1], [0.85, 0.55, 0.25]);

  /* Sky tint shifts subtly from cold dawn to deep dusk as you descend. */
  const skyTint = useTransform(
    smooth,
    [0, 0.5, 1],
    [
      "linear-gradient(180deg, #2a3340 0%, #1f2832 35%, #161e28 70%, #10161e 100%)",
      "linear-gradient(180deg, #1f2832 0%, #181f29 35%, #11171f 70%, #0a1018 100%)",
      "linear-gradient(180deg, #181f28 0%, #11171f 35%, "
        + "#0c1118 70%, #060a12 100%)",
    ]
  );

  /* Snowflake field — only mount client-side to avoid hydration drift. */
  const [flakes, setFlakes] = useState<
    { id: number; size: number; left: string; duration: number; delay: number; opacity: number }[]
  >([]);

  useEffect(() => {
    const n = 28;
    setFlakes(
      Array.from({ length: n }, (_, i) => ({
        id: i,
        size: 1 + Math.random() * 2.5,
        left: `${Math.random() * 100}%`,
        duration: 18 + Math.random() * 28,
        delay: -Math.random() * 40,
        opacity: 0.25 + Math.random() * 0.55,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* sky */}
      <motion.div
        className="absolute inset-0"
        style={{ background: skyTint }}
      />

      {/* faint cold atmosphere wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 12%, rgba(255,255,255,0.18), transparent 55%)",
        }}
      />

      {/* cold pinhole sun, drifts across as you scroll */}
      <motion.div
        className="absolute"
        style={{
          top: "10%",
          left: "62%",
          width: 120,
          height: 120,
          x: sunX,
          y: sunY,
          opacity: sunOpacity,
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95), rgba(220,230,240,0.6) 28%, transparent 65%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ boxShadow: "0 0 24px 8px rgba(255,255,255,0.55)" }}
        />
      </motion.div>

      {/* dust / atmospheric scatter band near horizon */}
      <motion.div
        className="absolute inset-x-0 top-[42%] h-[28vh]"
        style={{
          y: skyY,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
          filter: "blur(6px)",
        }}
      />

      {/* far cloud-cliffs — blurred, slow, palest */}
      <motion.div
        className="absolute inset-x-0 bottom-[34%] h-[60vh]"
        style={{ y: farY }}
      >
        <CliffLayer fill="#2e3744" opacity={0.55} blur={4} shapes={FAR_CLIFFS} />
      </motion.div>

      {/* mid cloud-cliffs */}
      <motion.div
        className="absolute inset-x-0 bottom-[18%] h-[60vh]"
        style={{ y: midY }}
      >
        <CliffLayer fill="#1f2731" opacity={0.85} blur={1.5} shapes={MID_CLIFFS} />
      </motion.div>

      {/* near cliffs / ice plain ridge */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[60vh]"
        style={{ y: nearY }}
      >
        <CliffLayer fill="#141a23" opacity={0.95} shapes={NEAR_CLIFFS} />
      </motion.div>

      {/* foreground ice plain — flat solid base so chapters read on it */}
      <div
        className="absolute inset-x-0 bottom-0 h-[18vh]"
        style={{
          background:
            "linear-gradient(180deg, #141a23 0%, #0c1118 50%, #060a10 100%)",
        }}
      />

      {/* snow particles */}
      {flakes.map((f) => (
        <Flake
          key={f.id}
          size={f.size}
          startX={f.left}
          duration={f.duration}
          delay={f.delay}
          opacity={f.opacity}
        />
      ))}

      {/* very subtle film grain so the cold palette isn't too flat */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* top vignette so the floating chapter rail / progress bar stay readable */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.78), transparent)",
        }}
      />

      {/* global darkening scrim — settles the whole scene a notch deeper */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.28)" }}
      />
    </div>
  );
}
