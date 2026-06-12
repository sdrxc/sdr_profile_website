"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ── signature glyphs ───────────────────────────────────────────── */

// Alan Turing — a Turing-machine tape with a moving read head
function TuringTape() {
  const cells = [1, 0, 1, 1, 0, 1, 0];
  return (
    <div className="relative flex gap-0.5">
      {cells.map((c, i) => (
        <span key={i} className="grid h-6 w-6 place-items-center rounded-sm border border-cyan-400/40 font-mono text-[11px] text-cyan-300/80">
          {c}
        </span>
      ))}
      <motion.span
        className="absolute -top-2 left-0 text-cyan-300"
        style={{ fontSize: 10 }}
        animate={{ x: [0, 26, 52, 78, 104, 130, 156, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "linear" }}
      >
        ▼
      </motion.span>
    </div>
  );
}

// Yann LeCun — "the cake": layers + cherry
function LeCunCake() {
  return (
    <div className="flex flex-col items-center">
      <motion.span className="text-sm" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        🍒
      </motion.span>
      <div className="h-1.5 w-16 rounded-sm bg-pink-300/70" title="supervised = icing" />
      <div className="h-4 w-16 rounded-sm bg-violet-400/40" title="unsupervised = the cake" />
      <div className="h-3 w-16 rounded-b-sm bg-violet-500/30" />
    </div>
  );
}

// Andrej Karpathy — a terminal with a blinking cursor
function KarpathyTerminal() {
  return (
    <div className="w-full rounded-md border border-amber-400/30 bg-black/50 px-2 py-1.5 font-mono text-[10px] text-amber-300/90">
      <span className="text-amber-500/70">$</span> python train.py
      <motion.span className="ml-0.5 inline-block h-3 w-1.5 -translate-y-px bg-amber-300/80 align-middle" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      <br />
      <span className="text-white/30"># the hottest new language is English</span>
    </div>
  );
}

type Legend = {
  id: string;
  name: string;
  years: string;
  role: string;
  quote: string;
  cite: string;
  color: string;
  glyph: React.ReactNode;
};

const LEGENDS: Legend[] = [
  {
    id: "turing",
    name: "Alan Turing",
    years: "1912 – 1954",
    role: "Father of computer science & AI",
    quote: "Can machines think?",
    cite: "Computing Machinery and Intelligence, 1950",
    color: "#22d3ee",
    glyph: <TuringTape />,
  },
  {
    id: "lecun",
    name: "Yann LeCun",
    years: "b. 1960",
    role: "Pioneer of convolutional nets (LeNet)",
    quote:
      "If intelligence is a cake, unsupervised learning is the cake, supervised learning is the icing, and reinforcement learning is the cherry.",
    cite: "The cake analogy, 2016",
    color: "#8b5cf6",
    glyph: <LeCunCake />,
  },
  {
    id: "karpathy",
    name: "Andrej Karpathy",
    years: "b. 1986",
    role: "Software 2.0 · nanoGPT",
    quote: "The hottest new programming language is English.",
    cite: "2023",
    color: "#f59e0b",
    glyph: <KarpathyTerminal />,
  },
];

export function ResearchLegends() {
  const [open, setOpen] = useState<string | null>(null);
  const [found, setFound] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpen((o) => (o === id ? null : id));
    setFound((f) => new Set(f).add(id));
  };

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-cyan">homage</p>
      <h2 className="mt-2 font-display text-2xl font-bold text-white">
        Standing on the shoulders of giants
      </h2>
      <p className="mt-1 text-sm text-white/40">Tap a giant to hear them. Find all three. 🥚</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {LEGENDS.map((l) => {
          const isOpen = open === l.id;
          return (
            <motion.button
              key={l.id}
              onClick={() => toggle(l.id)}
              whileHover={{ y: -4 }}
              className="glass glass-hover flex flex-col rounded-2xl p-5 text-left"
              style={{ borderColor: isOpen ? `${l.color}66` : undefined }}
            >
              <div className="flex h-16 items-center">{l.glyph}</div>
              <div className="mt-4 flex items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-white">{l.name}</h3>
                <span className="font-mono text-[10px] text-white/35">{l.years}</span>
              </div>
              <p className="text-xs" style={{ color: l.color }}>{l.role}</p>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm italic text-white/75">“{l.quote}”</p>
                    <p className="mt-1 font-mono text-[10px] text-white/35">— {l.cite}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* hidden reward */}
      <AnimatePresence>
        {found.size === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-2xl border border-neon-cyan/30 bg-neon-cyan/5 p-4 text-center"
          >
            <p className="font-mono text-sm text-neon-cyan">
              🧠 You found the founders. The rest is just gradient descent.
            </p>
            <p className="mt-1 font-mono text-[10px] text-white/40">
              0.1 % inspiration · 99.9 % backprop · ∂L/∂w → 0
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
