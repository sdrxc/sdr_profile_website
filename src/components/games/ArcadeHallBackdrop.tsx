"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * PS5-inspired dynamic backdrop.
 * Deep navy gradient, slow drifting blue/violet glow orbs, flowing wave lines,
 * subtle particle drift and a soft scanline / grain overlay.
 */
export function ArcadeHallBackdrop() {
  const particles = useMemo(
    () =>
      Array.from({ length: 38 }).map((_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53 + 11) % 100}%`,
        size: 1 + ((i * 7) % 3),
        dur: 6 + ((i * 3) % 7),
        delay: (i % 9) * 0.4,
      })),
    [],
  );

  return (
    <div className="ps5-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#02050f]">
      {/* base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(140%_90%_at_50%_-15%,rgba(46,116,224,0.40),transparent_55%),radial-gradient(120%_70%_at_50%_115%,rgba(80,30,180,0.30),transparent_60%),linear-gradient(180deg,#03081a_0%,#01030a_70%)]" />

      {/* drifting glow orbs */}
      <motion.div
        className="absolute -top-32 left-[18%] h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(46,116,224,0.45), transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{ x: [0, 80, -40, 0], y: [0, 50, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-12%] right-[8%] h-[580px] w-[580px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(140,80,255,0.32), transparent 70%)",
          filter: "blur(24px)",
        }}
        animate={{ x: [0, -60, 40, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] left-[55%] h-[360px] w-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(110,193,255,0.18), transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{ x: [0, -50, 30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* flowing wave lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="ps5-wave-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6ec1ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#6ec1ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6ec1ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ps5-wave-b" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          stroke="url(#ps5-wave-a)"
          strokeWidth="1.2"
          fill="none"
          initial={{ d: "M -200 540 Q 240 380 720 520 T 1640 460" }}
          animate={{
            d: [
              "M -200 540 Q 240 380 720 520 T 1640 460",
              "M -200 520 Q 240 460 720 460 T 1640 540",
              "M -200 540 Q 240 380 720 520 T 1640 460",
            ],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          stroke="url(#ps5-wave-b)"
          strokeWidth="1"
          fill="none"
          initial={{ d: "M -200 640 Q 320 500 760 620 T 1640 560" }}
          animate={{
            d: [
              "M -200 640 Q 320 500 760 620 T 1640 560",
              "M -200 620 Q 320 580 760 560 T 1640 640",
              "M -200 640 Q 320 500 760 620 T 1640 560",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          stroke="url(#ps5-wave-a)"
          strokeWidth="0.8"
          fill="none"
          initial={{ d: "M -200 740 Q 360 620 800 720 T 1640 660" }}
          animate={{
            d: [
              "M -200 740 Q 360 620 800 720 T 1640 660",
              "M -200 720 Q 360 680 800 660 T 1640 740",
              "M -200 740 Q 360 620 800 720 T 1640 660",
            ],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* faint vertical bars — PS5 dynamic theme texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
          maskImage: "radial-gradient(circle at 50% 40%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 40%, black, transparent 70%)",
        }}
      />

      {/* drifting particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: p.left,
            top: p.top,
            height: `${p.size}px`,
            width: `${p.size}px`,
            boxShadow: "0 0 6px rgba(180,210,255,0.7)",
          }}
          animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -28, 0] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* soft scanlines */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.6) 0 1px, transparent 1px 4px)",
        }}
      />

      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 [box-shadow:inset_0_0_240px_60px_rgba(0,0,0,0.85)]" />
    </div>
  );
}
