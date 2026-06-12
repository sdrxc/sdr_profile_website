"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { mulberry32 } from "@/lib/rng";

/* Shared shell: fixed full-bleed layer behind content with an accent vignette. */
function Shell({
  children,
  accent,
  tint = 0.14,
}: {
  children?: React.ReactNode;
  accent: string;
  tint?: number;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 50% at 50% 0%, ${accent}${Math.round(
            tint * 255
          )
            .toString(16)
            .padStart(2, "0")}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ───────────────────────── Coder — matrix code rain ───────────────────────── */
function CoderTheme() {
  const cols = useMemo(() => {
    const rng = mulberry32(7);
    const N = 26;
    const glyphs = "01{}</>=;()$#*+ƒλΣ∆◆".split("");
    return Array.from({ length: N }, (_, i) => ({
      left: (i / N) * 100 + rng() * 1.5,
      dur: 6 + rng() * 8,
      delay: -rng() * 10,
      len: 14 + Math.floor(rng() * 14),
      chars: Array.from({ length: 28 }, () => glyphs[Math.floor(rng() * glyphs.length)]),
    }));
  }, []);

  return (
    <Shell accent="#8b5cf6">
      <div className="absolute inset-0 bg-grid-faint [background-size:42px_42px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div className="absolute inset-0 font-mono text-[13px] leading-tight">
        {cols.map((c, i) => (
          <motion.div
            key={i}
            className="absolute top-0 select-none whitespace-pre text-neon-violet/40"
            style={{ left: `${c.left}%` }}
            initial={{ y: "-40%" }}
            animate={{ y: "120%" }}
            transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: "linear" }}
          >
            {c.chars.slice(0, c.len).map((ch, j) => (
              <span key={j} style={{ opacity: 1 - j / c.len }} className="block">
                {ch}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}

/* ─────────────── Researcher — calm drifting aurora + soft dots ─────────────── */
function ResearcherTheme() {
  const dots = useMemo(() => {
    const rng = mulberry32(13);
    return Array.from({ length: 28 }, () => ({
      x: rng() * 100,
      y: rng() * 100,
      s: rng() * 1.4 + 0.4,
      dur: 6 + rng() * 8,
      delay: -rng() * 8,
    }));
  }, []);

  return (
    <Shell accent="#22d3ee" tint={0.12}>
      {/* very faint static grid for a subtle "lab" texture */}
      <div className="absolute inset-0 bg-grid-faint [background-size:60px_60px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      {/* slow, large aurora blobs — premium and non-distracting */}
      <motion.div
        className="aurora h-[44rem] w-[44rem]"
        style={{ background: "#22d3ee", top: "-14rem", left: "-10rem", opacity: 0.4 }}
        animate={{ x: [0, 50, -10, 0], y: [0, 30, 10, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora h-[34rem] w-[34rem]"
        style={{ background: "#3b82f6", bottom: "-12rem", right: "-8rem", opacity: 0.3 }}
        animate={{ x: [0, -40, 20, 0], y: [0, -24, 12, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora h-[24rem] w-[24rem]"
        style={{ background: "#8b5cf6", top: "35%", right: "26%", opacity: 0.2 }}
        animate={{ x: [0, 30, -30, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 46, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* a few gently breathing motes — slow, no flicker */}
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-cyan-200/40"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s }}
          animate={{ opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </Shell>
  );
}

/* ─────────────────── Photographer — bokeh + aperture rings ─────────────────── */
function PhotographerTheme() {
  const bokeh = useMemo(() => {
    const rng = mulberry32(21);
    return Array.from({ length: 14 }, () => ({
      x: rng() * 100,
      y: rng() * 100,
      s: 20 + rng() * 90,
      dur: 12 + rng() * 14,
      delay: -rng() * 10,
    }));
  }, []);
  return (
    <Shell accent="#f59e0b">
      {bokeh.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.s,
            height: b.s,
            background:
              "radial-gradient(circle, rgba(245,158,11,0.35), transparent 70%)",
            filter: "blur(6px)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/15"
        style={{ borderStyle: "dashed" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
    </Shell>
  );
}

/* ───────────────────── Illustrator — halftone + pop blobs ───────────────────── */
function IllustratorTheme() {
  return (
    <Shell accent="#fb6f3d" tint={0.18}>
      <div
        className="absolute inset-0 opacity-[0.18] [mask-image:linear-gradient(120deg,black,transparent_75%)]"
        style={{
          backgroundImage: "radial-gradient(#fb6f3d 1.4px, transparent 1.6px)",
          backgroundSize: "16px 16px",
        }}
      />
      <motion.div
        className="aurora h-[34rem] w-[34rem]"
        style={{ background: "#fb6f3d", top: "-6rem", right: "-4rem", opacity: 0.5 }}
        animate={{ borderRadius: ["40% 60% 60% 40%", "60% 40% 40% 60%", "40% 60% 60% 40%"], rotate: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora h-[26rem] w-[26rem]"
        style={{ background: "#f43f5e", bottom: "-4rem", left: "-3rem", opacity: 0.4 }}
        animate={{ borderRadius: ["60% 40% 50% 50%", "40% 60% 50% 50%", "60% 40% 50% 50%"], rotate: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </Shell>
  );
}

/* ─────────────────── Cinephile — projector beam + scanlines ─────────────────── */
function CinephileTheme() {
  const dust = useMemo(() => {
    const rng = mulberry32(33);
    return Array.from({ length: 18 }, () => ({ x: rng() * 100, y: rng() * 100, dur: 5 + rng() * 6, delay: -rng() * 6 }));
  }, []);
  return (
    <Shell accent="#f43f5e" tint={0.1}>
      {/* projector beam */}
      <motion.div
        className="absolute -top-10 left-1/2 h-[80vh] w-[60vw] -translate-x-1/2 origin-top"
        style={{
          background: "linear-gradient(to bottom, rgba(244,63,94,0.12), transparent 70%)",
          clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)",
        }}
        animate={{ opacity: [0.6, 1, 0.7, 0.95, 0.6] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
      />
      {/* scanlines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)",
        }}
      />
      {/* film dust */}
      {dust.map((d, i) => (
        <motion.span
          key={i}
          className="absolute h-px w-px rounded-full bg-white"
          style={{ left: `${d.x}%`, top: `${d.y}%` }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity }}
        />
      ))}
      {/* vignette */}
      <div className="absolute inset-0 [box-shadow:inset_0_0_180px_60px_rgba(0,0,0,0.7)]" />
    </Shell>
  );
}

/* ─────────────────────── Listener — equalizer + waves ─────────────────────── */
function ListenerTheme() {
  const bars = useMemo(() => {
    const rng = mulberry32(41);
    const N = 64;
    return Array.from({ length: N }, () => ({ h: 10 + rng() * 60, dur: 0.8 + rng() * 1.2, delay: -rng() * 2 }));
  }, []);
  return (
    <Shell accent="#1db954" tint={0.12}>
      <div className="absolute bottom-0 left-0 flex h-1/2 w-full items-end gap-[2px] px-2 opacity-30">
        {bars.map((b, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ background: "linear-gradient(to top, #1db954, transparent)" }}
            animate={{ height: [`${b.h * 0.3}%`, `${b.h}%`, `${b.h * 0.5}%`] }}
            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        ))}
      </div>
    </Shell>
  );
}

/* ───────────────────── Explorer — starfield + arcs ───────────────────── */
function ExplorerTheme() {
  const stars = useMemo(() => {
    const rng = mulberry32(57);
    return Array.from({ length: 80 }, () => ({ x: rng() * 100, y: rng() * 100, s: rng() * 1.6 + 0.3, dur: 2 + rng() * 4, delay: -rng() * 4 }));
  }, []);
  const arcs = useMemo(() => {
    const rng = mulberry32(58);
    return Array.from({ length: 6 }, () => {
      const x1 = rng() * 100, y1 = 20 + rng() * 60, x2 = rng() * 100, y2 = 20 + rng() * 60;
      const cx = (x1 + x2) / 2, cy = Math.min(y1, y2) - 25;
      return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, delay: rng() * 5 };
    });
  }, []);
  return (
    <Shell accent="#2dd4bf">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-teal-200"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity }}
        />
      ))}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {arcs.map((a, i) => (
          <motion.path
            key={i}
            d={a.d}
            fill="none"
            stroke="#2dd4bf"
            strokeWidth={0.15}
            strokeDasharray="1 1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
            transition={{ duration: 5, delay: a.delay, repeat: Infinity, repeatDelay: 2 }}
          />
        ))}
      </svg>
    </Shell>
  );
}

/* ───────────────────── Reader — drifting glyphs + rules ───────────────────── */
function ReaderTheme() {
  const glyphs = useMemo(() => {
    const rng = mulberry32(71);
    const set = "AaQ§¶&fi“”.,;℩ℓℜ".split("");
    return Array.from({ length: 18 }, () => ({
      x: rng() * 100,
      ch: set[Math.floor(rng() * set.length)],
      size: 18 + rng() * 46,
      dur: 16 + rng() * 16,
      delay: -rng() * 16,
    }));
  }, []);
  return (
    <Shell accent="#ec4899" tint={0.12}>
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 38px)",
        }}
      />
      {glyphs.map((g, i) => (
        <motion.span
          key={i}
          className="absolute font-display font-bold text-fuchsia-400/20"
          style={{ left: `${g.x}%`, fontSize: g.size }}
          initial={{ y: "110%" }}
          animate={{ y: "-20%", rotate: [0, 8, -8, 0] }}
          transition={{ duration: g.dur, delay: g.delay, repeat: Infinity, ease: "linear" }}
        >
          {g.ch}
        </motion.span>
      ))}
    </Shell>
  );
}

const THEMES: Record<string, () => JSX.Element> = {
  coder: CoderTheme,
  researcher: ResearcherTheme,
  photographer: PhotographerTheme,
  illustrator: IllustratorTheme,
  cinephile: CinephileTheme,
  listener: ListenerTheme,
  explorer: ExplorerTheme,
  reader: ReaderTheme,
};

export function PersonaTheme({ slug }: { slug: string }) {
  const Theme = THEMES[slug];
  return Theme ? <Theme /> : null;
}
