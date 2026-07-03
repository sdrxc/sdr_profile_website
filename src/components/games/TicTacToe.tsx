"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Cell = "X" | "O" | null;

const LINES: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner(b: Cell[]): { who: "X" | "O" | null; line: number[] | null } {
  for (const l of LINES) {
    const [a, c, d] = l;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { who: b[a]!, line: l };
  }
  return { who: null, line: null };
}

function minimax(b: Cell[], turn: "X" | "O"): { score: number; idx: number } {
  const w = winner(b).who;
  if (w === "O") return { score: 1, idx: -1 };
  if (w === "X") return { score: -1, idx: -1 };
  if (b.every((c) => c)) return { score: 0, idx: -1 };

  let best = turn === "O" ? { score: -Infinity, idx: -1 } : { score: Infinity, idx: -1 };
  for (let i = 0; i < 9; i++) {
    if (b[i]) continue;
    const nb = [...b];
    nb[i] = turn;
    const { score } = minimax(nb, turn === "O" ? "X" : "O");
    if (turn === "O" ? score > best.score : score < best.score) best = { score, idx: i };
  }
  return best;
}

type Stats = { wins: number; losses: number; draws: number };

export function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [stats, setStats] = useState<Stats>({ wins: 0, losses: 0, draws: 0 });
  const recordedRef = useRef(false);

  const w = winner(board);
  const full = board.every((c) => c);
  const done = !!w.who || full;

  useEffect(() => {
    const saved = localStorage.getItem("ttt-stats");
    if (saved) {
      try { setStats(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  // CPU moves on O's turn
  useEffect(() => {
    if (done || turn !== "O") return;
    const t = setTimeout(() => {
      const { idx } = minimax([...board], "O");
      if (idx >= 0) {
        const nb = [...board];
        nb[idx] = "O";
        setBoard(nb);
        setTurn("X");
      }
    }, 420);
    return () => clearTimeout(t);
  }, [turn, board, done]);

  // Record stats exactly once per finished game
  useEffect(() => {
    if (!done || recordedRef.current) return;
    recordedRef.current = true;
    setStats((s) => {
      const next: Stats =
        w.who === "X" ? { ...s, wins: s.wins + 1 }
        : w.who === "O" ? { ...s, losses: s.losses + 1 }
        : { ...s, draws: s.draws + 1 };
      localStorage.setItem("ttt-stats", JSON.stringify(next));
      return next;
    });
  }, [done, w.who]);

  const play = (i: number) => {
    if (done || board[i] || turn !== "X") return;
    const nb = [...board];
    nb[i] = "X";
    setBoard(nb);
    setTurn("O");
  };

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    recordedRef.current = false;
  }, []);

  const clearStats = () => {
    const empty: Stats = { wins: 0, losses: 0, draws: 0 };
    setStats(empty);
    localStorage.setItem("ttt-stats", JSON.stringify(empty));
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        className="overflow-hidden rounded-2xl border-2 border-neon-cyan/40 bg-black/60 p-6 backdrop-blur"
        style={{ boxShadow: "0 0 40px -8px rgba(0,240,255,0.5)" }}
      >
        <div className="mb-4 grid grid-cols-3 gap-2 text-center font-mono text-xs">
          <div className="rounded-lg border border-white/10 bg-black/40 py-2">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Wins</div>
            <div className="text-base text-neon-cyan">{stats.wins}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/40 py-2">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Losses</div>
            <div className="text-base text-neon-pink">{stats.losses}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/40 py-2">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Draws</div>
            <div className="text-base text-white/80">{stats.draws}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {board.map((c, i) => {
            const isWin = w.line?.includes(i);
            return (
              <button
                key={i}
                onClick={() => play(i)}
                disabled={!!c || done || turn !== "X"}
                className={`aspect-square rounded-xl border text-4xl font-extrabold transition-all sm:text-5xl ${
                  isWin
                    ? "border-neon-cyan/60 bg-neon-cyan/15 text-neon-cyan shadow-[0_0_22px_-4px_rgba(0,240,255,0.7)]"
                    : c === "X"
                      ? "border-fuchsia-400/40 bg-black/40 text-fuchsia-300"
                      : c === "O"
                        ? "border-cyan-400/40 bg-black/40 text-cyan-300"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:border-fuchsia-300/40 hover:bg-white/[0.05]"
                }`}
                aria-label={`Cell ${i + 1}${c ? `, ${c}` : ", empty"}`}
              >
                {c ?? ""}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          {done ? (
            <p className="font-mono text-sm">
              {w.who === "X" && <span className="text-emerald-300">✓ You won. Were you cheating?</span>}
              {w.who === "O" && <span className="text-rose-300">✗ I won. Minimax doesn&apos;t blink.</span>}
              {!w.who && <span className="text-white/70">— Draw —</span>}
            </p>
          ) : (
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
              {turn === "X" ? "Your turn · X" : "CPU thinking…"}
            </p>
          )}
          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              onClick={reset}
              className="rounded-lg border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-fuchsia-200 hover:bg-fuchsia-500/20"
            >
              New game
            </button>
            <button
              onClick={clearStats}
              className="rounded-lg border border-white/15 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/55 hover:border-white/30 hover:text-white"
            >
              Clear stats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
