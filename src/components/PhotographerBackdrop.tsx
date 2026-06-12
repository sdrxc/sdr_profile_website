"use client";

import { motion } from "framer-motion";

/**
 * Faded, drifting line-art of the gear actually used to shoot:
 * Canon EOS 200D (top-right), iPhone 16 Pro (lower-left), iPhone 16e (right).
 * Purely decorative — sits behind the gallery.
 */

const STROKE = "rgba(245,158,11,0.92)";

function lens(cx: number, cy: number, r: number, key?: string) {
  return (
    <g key={key}>
      {[r, r * 0.78, r * 0.52, r * 0.26].map((rr, i) => (
        <circle key={i} cx={cx} cy={cy} r={rr} fill="none" stroke={STROKE} strokeWidth={1.3} />
      ))}
    </g>
  );
}

function CanonDSLR() {
  return (
    <svg viewBox="0 0 300 230" className="h-auto w-full">
      {/* grip */}
      <rect x={14} y={74} width={48} height={118} rx={16} fill="none" stroke={STROKE} strokeWidth={1.4} />
      {/* body */}
      <rect x={32} y={64} width={246} height={130} rx={20} fill="none" stroke={STROKE} strokeWidth={1.4} />
      {/* pentaprism hump */}
      <path d="M122 64 L134 34 L184 34 L196 64 Z" fill="none" stroke={STROKE} strokeWidth={1.4} />
      {/* hot shoe */}
      <rect x={147} y={26} width={24} height={9} rx={2} fill="none" stroke={STROKE} strokeWidth={1.2} />
      {/* lens */}
      {lens(166, 134, 60)}
      {/* mode dial + shutter */}
      <circle cx={252} cy={92} r={15} fill="none" stroke={STROKE} strokeWidth={1.3} />
      <circle cx={58} cy={70} r={7} fill="none" stroke={STROKE} strokeWidth={1.3} />
      {/* labels */}
      <text x={159} y={52} textAnchor="middle" fill={STROKE} style={{ fontSize: 10, fontFamily: "var(--font-display)", fontWeight: 700 }}>Canon</text>
      <text x={236} y={176} textAnchor="middle" fill={STROKE} style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>EOS 200D</text>
    </svg>
  );
}

function IPhonePro() {
  return (
    <svg viewBox="0 0 150 320" className="h-auto w-full">
      {/* body */}
      <rect x={18} y={8} width={114} height={304} rx={30} fill="none" stroke={STROKE} strokeWidth={1.4} />
      {/* side button */}
      <rect x={14} y={90} width={4} height={34} rx={2} fill="none" stroke={STROKE} strokeWidth={1.2} />
      {/* camera plateau */}
      <rect x={28} y={22} width={72} height={72} rx={20} fill="none" stroke={STROKE} strokeWidth={1.4} />
      {lens(50, 44, 13, "a")}
      {lens(50, 74, 13, "b")}
      {lens(78, 60, 13, "c")}
      {/* flash + lidar */}
      <circle cx={90} cy={38} r={5} fill="none" stroke={STROKE} strokeWidth={1.2} />
      <circle cx={90} cy={82} r={4} fill="none" stroke={STROKE} strokeWidth={1.2} />
      <text x={75} y={300} textAnchor="middle" fill={STROKE} style={{ fontSize: 11, fontFamily: "var(--font-mono)" }}>16 Pro</text>
    </svg>
  );
}

function IPhone16e() {
  return (
    <svg viewBox="0 0 150 320" className="h-auto w-full">
      <rect x={18} y={8} width={114} height={304} rx={30} fill="none" stroke={STROKE} strokeWidth={1.4} />
      <rect x={14} y={86} width={4} height={32} rx={2} fill="none" stroke={STROKE} strokeWidth={1.2} />
      {/* single camera */}
      {lens(54, 48, 16, "e")}
      <circle cx={54} cy={82} r={5} fill="none" stroke={STROKE} strokeWidth={1.2} />
      <text x={75} y={300} textAnchor="middle" fill={STROKE} style={{ fontSize: 11, fontFamily: "var(--font-mono)" }}>16e</text>
    </svg>
  );
}

export function PhotographerBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -9 }} aria-hidden>
      {/* Canon — top-right, partly off the edge */}
      <motion.div
        className="absolute right-[-3%] top-[9%] w-[clamp(220px,24vw,380px)] opacity-[0.14]"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <CanonDSLR />
      </motion.div>
      {/* iPhone 16 Pro — far-left edge, mostly off-screen */}
      <motion.div
        className="absolute left-[-7%] top-[34%] w-[clamp(150px,16vw,230px)] opacity-[0.11]"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <IPhonePro />
      </motion.div>
      {/* iPhone 16e — bottom-right corner */}
      <motion.div
        className="absolute right-[2%] bottom-[5%] w-[clamp(120px,12vw,180px)] opacity-[0.1]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }}
      >
        <IPhone16e />
      </motion.div>
    </div>
  );
}
