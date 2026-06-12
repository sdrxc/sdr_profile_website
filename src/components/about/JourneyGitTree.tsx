"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { about } from "@/data/about";

type Lane = "main" | "academia" | "career";
type Commit = {
  lane: Lane;
  kind: "init" | "commit" | "merge";
  icon: string;
  title: string;
  meta?: string;
  sub?: string;
  lore?: string[];
  branch: string;
  head?: boolean;
};

const LANE_X: Record<Lane, number> = { main: 26, academia: 64, career: 102 };
const LANE_COLOR: Record<Lane, string> = { main: "#94a3b8", academia: "#22d3ee", career: "#f59e0b" };
const ROW_H = 104;
const GRAPH_W = 128;
const R = 7;

const HASHES = ["1a3f9c2", "b7e4d10", "c2f88a5", "9d1e6b3", "4a7c0f8", "e5b2d91", "fa19c47", "3c8e2b6", "7b4f1a0", "d0a6e35"];

function buildCommits(): Commit[] {
  const edu = about.education.map<Commit>((e) => ({
    lane: "academia",
    kind: "commit",
    icon: e.icon,
    title: e.title,
    meta: e.period,
    sub: e.tagline,
    lore: e.lore,
    branch: "academia",
  }));
  const career = about.career.roles.map<Commit>((r, i) => ({
    lane: "career",
    kind: "commit",
    icon: "💼",
    title: r.title,
    meta: r.period,
    sub: `${about.career.company} · ${about.career.location}`,
    branch: "career/zs",
    head: i === about.career.roles.length - 1,
  }));
  return [
    { lane: "main", kind: "init", icon: "🌱", title: "The Nativity", branch: "main", sub: "Arrived to leave some carbon footprints and some existential questions." },
    ...edu,
    { lane: "main", kind: "merge", icon: "🎓", title: "merge: academia → main", meta: "graduated 2022", sub: "Received a Pre-Placement Offer (PPO) from ZS based on my internship performance", branch: "main" },
    ...career,
  ];
}

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const my = (y1 + y2) / 2;
  return `M${x1} ${y1} C ${x1} ${my} ${x2} ${my} ${x2} ${y2}`;
};

export function JourneyGitTree() {
  const commits = buildCommits();
  const [open, setOpen] = useState<number | null>(null);
  const y = (i: number) => i * ROW_H + ROW_H / 2;

  // fixed structure indices
  const INIT = 0;
  const ACAD = [1, 2, 3, 4, 5];
  const MERGE = 6;
  const CAREER = [7, 8, 9];
  const H = commits.length * ROW_H;

  const Line = ({ d, color, delay = 0 }: { d: string; color: string; delay?: number }) => (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.85 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
    />
  );

  return (
    <div className="relative">
      {/* legend */}
      <div className="mb-4 flex flex-wrap gap-3 font-mono text-[11px]">
        {(["main", "academia", "career"] as Lane[]).map((l) => (
          <span key={l} className="flex items-center gap-1.5 text-white/55">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: LANE_COLOR[l] }} />
            {l === "career" ? "career/zs" : l}
          </span>
        ))}
        <span className="ml-auto text-white/30">$ git log --graph --all</span>
      </div>

      <div className="relative" style={{ minHeight: H }}>
        {/* graph */}
        <svg className="absolute left-0 top-0" width={GRAPH_W} height={H} style={{ overflow: "visible" }}>
          {/* main trunk */}
          <Line d={`M${LANE_X.main} ${y(INIT)} L${LANE_X.main} ${y(commits.length - 1)}`} color={LANE_COLOR.main} />
          {/* academia: fork, spine, merge */}
          <Line d={curve(LANE_X.main, y(INIT), LANE_X.academia, y(ACAD[0]))} color={LANE_COLOR.academia} delay={0.1} />
          <Line d={`M${LANE_X.academia} ${y(ACAD[0])} L${LANE_X.academia} ${y(ACAD[ACAD.length - 1])}`} color={LANE_COLOR.academia} delay={0.15} />
          <Line d={curve(LANE_X.academia, y(ACAD[ACAD.length - 1]), LANE_X.main, y(MERGE))} color={LANE_COLOR.academia} delay={0.2} />
          {/* career: fork, spine */}
          <Line d={curve(LANE_X.main, y(MERGE), LANE_X.career, y(CAREER[0]))} color={LANE_COLOR.career} delay={0.25} />
          <Line d={`M${LANE_X.career} ${y(CAREER[0])} L${LANE_X.career} ${y(CAREER[CAREER.length - 1])}`} color={LANE_COLOR.career} delay={0.3} />

          {/* commit dots */}
          {commits.map((c, i) => {
            const cx = LANE_X[c.lane];
            const color = LANE_COLOR[c.lane];
            return (
              <g key={i}>
                {c.head && (
                  <motion.circle
                    cx={cx} cy={y(i)} r={R + 4} fill="none" stroke={color}
                    animate={{ r: [R + 4, R + 10, R + 4], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                )}
                <motion.circle
                  cx={cx} cy={y(i)} r={c.kind === "merge" ? R + 2 : R}
                  fill={c.kind === "init" ? "#0a0a14" : color}
                  stroke={color} strokeWidth={2.5}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 320, damping: 16 }}
                />
              </g>
            );
          })}
        </svg>

        {/* commit rows */}
        <div>
          {commits.map((c, i) => {
            const color = LANE_COLOR[c.lane];
            const expandable = c.lore && c.lore.length > 0;
            const isOpen = open === i;
            return (
              <div key={i} className="flex items-center" style={{ minHeight: ROW_H, paddingLeft: GRAPH_W + 10 }}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                  className={`w-full rounded-xl border px-4 py-3 ${
                    c.kind === "commit" ? "glass" : "border-white/10 bg-white/[0.02]"
                  }`}
                  style={{ borderColor: c.head ? `${color}66` : undefined }}
                >
                  {/* git log line */}
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <span className="text-white/35">{HASHES[i]}</span>
                    <span
                      className="rounded px-1.5 py-0.5"
                      style={{ background: `${color}1a`, color, border: `1px solid ${color}40` }}
                    >
                      {c.branch}
                    </span>
                    {c.head && (
                      <span className="rounded px-1.5 py-0.5 font-semibold" style={{ background: `${color}26`, color }}>
                        HEAD →
                      </span>
                    )}
                    {c.meta && <span className="ml-auto text-white/35">{c.meta}</span>}
                  </div>

                  <div className="mt-1.5 flex items-start gap-2">
                    <span className="text-lg leading-none">{c.icon}</span>
                    <div className="min-w-0">
                      <p className="font-display text-[15px] font-bold text-white">{c.title}</p>
                      {c.sub && <p className="text-xs text-white/50">{c.sub}</p>}
                    </div>
                    {expandable && (
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="ml-auto shrink-0 font-mono text-xs text-white/40 hover:text-white"
                      >
                        {isOpen ? "− diff" : "+ diff"}
                      </button>
                    )}
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && expandable && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 space-y-1 overflow-hidden border-l-2 pl-3"
                        style={{ borderColor: `${color}40` }}
                      >
                        {c.lore!.map((l, j) => (
                          <li key={j} className="font-mono text-xs text-white/55">
                            <span style={{ color }}>+</span> {l}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
