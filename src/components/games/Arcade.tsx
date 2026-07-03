"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PixelGame } from "@/components/PixelGame";
import { PixelTetris } from "./PixelTetris";
import { CoderQuest } from "./CoderQuest";
import { FlagGuess } from "./FlagGuess";
import { Konigsberg } from "./Konigsberg";
import { TicTacToe } from "./TicTacToe";

type GameId = "dash" | "tetris" | "coder" | "flags" | "bridges" | "ttt";

type GameDef = {
  id: GameId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  accent: string;
  year: string;
  genre: string;
  tags: string[];
  Component: React.ComponentType;
};

const GAMES: GameDef[] = [
  {
    id: "dash",
    title: "Pixel Dash",
    subtitle: "Outrun the spikes",
    description:
      "An endless neon runner. Time your jumps over rising spikes, grab stars for the high-score chase.",
    icon: "🏃",
    accent: "#00d4ff",
    year: "2026",
    genre: "Runner",
    tags: ["Single Player", "Casual", "Reflex"],
    Component: PixelGame,
  },
  {
    id: "tetris",
    title: "Neon Tetris",
    subtitle: "Stack & clear",
    description:
      "The all-time classic, reimagined with neon tetrominoes. Clear lines, chase combos, don't stack out.",
    icon: "🟦",
    accent: "#b14dff",
    year: "1984",
    genre: "Puzzle",
    tags: ["Single Player", "Puzzle", "Endless"],
    Component: PixelTetris,
  },
  {
    id: "coder",
    title: "Developer Quest",
    subtitle: "Catch the personas",
    description:
      "Pixel Soumya races across the screen catching the seven persona icons while dodging swarming bugs.",
    icon: "⌘",
    accent: "#ff2d95",
    year: "2026",
    genre: "Arcade",
    tags: ["Single Player", "Action", "Original"],
    Component: CoderQuest,
  },
  {
    id: "flags",
    title: "Flag Master",
    subtitle: "Name that country",
    description:
      "Multiple-choice flag trivia from across the globe. Build a streak to multiply your score.",
    icon: "🌍",
    accent: "#fbbf24",
    year: "2026",
    genre: "Trivia",
    tags: ["Single Player", "Trivia", "Geography"],
    Component: FlagGuess,
  },
  {
    id: "bridges",
    title: "7 Bridges of Königsberg",
    subtitle: "Euler's puzzle",
    description:
      "Königsberg, 1736. Try to cross every bridge exactly once. The puzzle that founded graph theory.",
    icon: "🌉",
    accent: "#a3e635",
    year: "1736",
    genre: "Puzzle",
    tags: ["Logic", "Historical", "Math"],
    Component: Konigsberg,
  },
  {
    id: "ttt",
    title: "Tic-Tac-Toe",
    subtitle: "vs Unbeatable CPU",
    description:
      "A perfect minimax opponent plays the CPU. The best outcome you can hope for is a draw.",
    icon: "⨯",
    accent: "#22d3ee",
    year: "1972",
    genre: "Classic",
    tags: ["1P vs CPU", "Strategy", "Quick"],
    Component: TicTacToe,
  },
];

export function Arcade() {
  const [active, setActive] = useState<GameId | null>(null);
  const [selectedId, setSelectedId] = useState<GameId>(GAMES[0].id);

  const featured = GAMES.find((g) => g.id === selectedId) ?? GAMES[0];
  const playing = active ? GAMES.find((g) => g.id === active) ?? null : null;
  const PlayingComponent = playing?.Component;

  return (
    <div className="ps5-shell w-full">
      <AnimatePresence mode="wait">
        {!playing ? (
          <motion.div
            key="hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto w-full max-w-6xl"
          >
            <Ps5StatusBar />
            <Ps5Hero game={featured} onPlay={() => setActive(featured.id)} />
            <Ps5GameRow
              games={GAMES}
              selectedId={selectedId}
              onHover={setSelectedId}
              onSelect={(id) => setActive(id)}
            />
            <Ps5Hints />
          </motion.div>
        ) : (
          <motion.div
            key={active!}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-6xl"
          >
            <Ps5Session game={playing} onExit={() => setActive(null)}>
              {PlayingComponent ? <PlayingComponent /> : null}
            </Ps5Session>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────── Status bar (top: tabs + clock + profile) ───────────────── */

function Ps5StatusBar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    };
    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mb-10 flex items-center justify-between gap-4 text-white">
      <div className="flex items-center gap-7">
        <button type="button" className="ps5-tab ps5-tab-active">
          Games
        </button>
        <button type="button" className="ps5-tab">
          Media
        </button>
        <button type="button" className="ps5-tab hidden sm:inline-block">
          Explore
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="ps5-chip hidden sm:inline-flex">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
          Online
        </span>
        <span className="ps5-chip">{time || "—:—"}</span>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-xs font-semibold text-white ring-2 ring-white/20">
          SR
        </div>
      </div>
    </div>
  );
}

/* ───────────────── Hero / featured card ───────────────── */

function Ps5Hero({ game, onPlay }: { game: GameDef; onPlay: () => void }) {
  return (
    <motion.div
      key={game.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_1fr]"
    >
      {/* Box art (clickable — launches game) */}
      <button
        type="button"
        onClick={onPlay}
        className="ps5-cover group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-3xl text-left"
        style={{
          background: `radial-gradient(circle at 30% 25%, ${game.accent}55, transparent 65%), linear-gradient(135deg, ${game.accent}22 0%, #050b1c 70%)`,
        }}
        aria-label={`Play ${game.title}`}
      >
        <motion.div
          className="absolute inset-0 grid place-items-center"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="text-[180px] sm:text-[220px]"
            style={{ filter: `drop-shadow(0 0 60px ${game.accent})` }}
          >
            {game.icon}
          </span>
        </motion.div>

        {/* sheen */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.16),transparent_55%)]" />

        {/* top-left badge */}
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="ps5-corner-tag">★ Featured</span>
        </div>

        {/* bottom tag row */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2">
          <span className="ps5-tag">{game.genre}</span>
          <span className="ps5-tag">{game.year}</span>
        </div>

        {/* bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

        {/* hover hint */}
        <span className="pointer-events-none absolute inset-x-0 bottom-7 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white/0 transition-colors duration-300 group-hover:text-white/85">
          ▸ press to play ◂
        </span>
      </button>

      {/* Info side */}
      <div className="px-1">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="text-[11px] font-semibold uppercase tracking-[0.4em] text-sky-300/80"
        >
          Now Selected
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          {game.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="mt-2 text-base text-white/55"
        >
          {game.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-5 max-w-md text-sm leading-relaxed text-white/65"
        >
          {game.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          <button type="button" onClick={onPlay} className="ps5-play group">
            <span className="ps5-btn-glyph ps5-btn-glyph-x">✕</span>
            <span>Play</span>
          </button>
          <a
            href="#library"
            className="ps5-secondary"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("ps5-library")
                ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }}
          >
            <span className="ps5-btn-glyph ps5-btn-glyph-tri">△</span>
            <span>Library</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-7 flex flex-wrap items-center gap-4 text-xs text-white/45"
        >
          {game.tags.map((t, i) => (
            <span key={t} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-white/25" />}
              <span>{t}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ───────────────── Horizontal library row ───────────────── */

function Ps5GameRow({
  games,
  selectedId,
  onHover,
  onSelect,
}: {
  games: GameDef[];
  selectedId: GameId;
  onHover: (id: GameId) => void;
  onSelect: (id: GameId) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div id="ps5-library" className="relative">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-300/70">
            Your Library
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
            Games
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-white/40 sm:inline">
            {games.length} titles
          </span>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className="ps5-scroll-btn"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className="ps5-scroll-btn"
          >
            ›
          </button>
        </div>
      </div>

      <div ref={scrollerRef} className="ps5-row flex gap-4 overflow-x-auto pb-6 pt-2">
        {games.map((g, i) => (
          <Ps5Tile
            key={g.id}
            game={g}
            index={i}
            active={selectedId === g.id}
            onHover={() => onHover(g.id)}
            onSelect={() => onSelect(g.id)}
          />
        ))}
      </div>
    </div>
  );
}

function Ps5Tile({
  game,
  index,
  active,
  onHover,
  onSelect,
}: {
  game: GameDef;
  index: number;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.04 }}
      className="flex-shrink-0"
    >
      <button
        type="button"
        onMouseEnter={onHover}
        onFocus={onHover}
        onClick={onSelect}
        className={`ps5-tile block ${active ? "ps5-tile-active" : ""}`}
        style={
          active
            ? {
                borderColor: game.accent,
                boxShadow: `0 18px 50px -18px ${game.accent}aa, 0 0 0 3px ${game.accent}33`,
              }
            : undefined
        }
        aria-label={`Select and play ${game.title}`}
      >
        <div
          className="relative h-[160px] w-[240px] overflow-hidden rounded-xl sm:h-[180px] sm:w-[270px]"
          style={{
            background: `radial-gradient(circle at 30% 25%, ${game.accent}33, transparent 60%), linear-gradient(140deg, ${game.accent}22 0%, #05091a 70%)`,
          }}
        >
          <motion.span
            className="absolute inset-0 grid place-items-center text-6xl sm:text-7xl"
            style={{ filter: `drop-shadow(0 0 24px ${game.accent})` }}
            animate={active ? { y: [0, -4, 0] } : { y: 0 }}
            transition={{ duration: 2.4, repeat: active ? Infinity : 0, ease: "easeInOut" }}
          >
            {game.icon}
          </motion.span>

          {/* sheen */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_50%)]" />

          {/* footer */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 py-3 text-left">
            <p className="truncate text-sm font-semibold text-white">{game.title}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/45">
              {game.genre} · {game.year}
            </p>
          </div>

          {/* active indicator */}
          {active && (
            <span
              className="pointer-events-none absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-[10px]"
              style={{
                color: game.accent,
                boxShadow: `0 0 12px ${game.accent}aa`,
              }}
            >
              ●
            </span>
          )}
        </div>
      </button>
    </motion.div>
  );
}

/* ───────────────── Bottom controller hints ───────────────── */

function Ps5Hints() {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/45">
      <Hint glyph="✕" text="Select" tone="x" />
      <Hint glyph="△" text="Library" tone="tri" />
      <Hint glyph="○" text="Back" tone="circ" />
      <Hint glyph="◻" text="Options" tone="sq" />
    </div>
  );
}

function Hint({
  glyph,
  text,
  tone,
}: {
  glyph: string;
  text: string;
  tone: "x" | "tri" | "circ" | "sq";
}) {
  return (
    <span className="flex items-center gap-2.5">
      <span className={`ps5-key-hint ps5-key-${tone}`}>{glyph}</span>
      <span className="uppercase tracking-[0.15em]">{text}</span>
    </span>
  );
}

/* ───────────────── Session view (game running) ───────────────── */

function Ps5Session({
  game,
  onExit,
  children,
}: {
  game: GameDef;
  onExit: () => void;
  children: React.ReactNode;
}) {
  // Listen for ESC to exit
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onExit]);

  const sessionGlow = useMemo(
    () => `0 30px 90px -30px ${game.accent}55, 0 0 60px -20px ${game.accent}33`,
    [game.accent],
  );

  return (
    <div className="ps5-session">
      <div className="mb-6 flex items-center justify-between gap-4">
        <button type="button" onClick={onExit} className="ps5-exit">
          <span className="ps5-key-hint ps5-key-circ">○</span>
          <span>Library</span>
        </button>

        <div className="hidden text-center sm:block">
          <p className="text-sm font-semibold tracking-tight text-white">
            {game.title}
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">
            {game.genre} · {game.year}
          </p>
        </div>

        <div className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/50 sm:flex">
          <span
            className="inline-block h-2 w-2 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 8px rgba(52,211,153,0.8)" }}
          />
          In Session
        </div>

        <span
          className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] sm:hidden"
          style={{
            color: game.accent,
            borderColor: `${game.accent}55`,
            background: `${game.accent}11`,
          }}
        >
          {game.title}
        </span>
      </div>

      <div
        className="ps5-stage relative rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-md sm:p-6"
        style={{ boxShadow: sessionGlow }}
      >
        {/* corner spec */}
        <div className="pointer-events-none absolute left-5 top-5 z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/45">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{
              background: game.accent,
              boxShadow: `0 0 8px ${game.accent}`,
            }}
          />
          Live
        </div>
        {children}
      </div>

      <p className="mt-4 text-center text-[10px] uppercase tracking-[0.25em] text-white/30">
        press <span className="text-white/55">ESC</span> or ○ to return to library
      </p>
    </div>
  );
}
