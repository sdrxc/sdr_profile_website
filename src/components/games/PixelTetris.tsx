"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const COLS = 10;
const ROWS = 20;
const CELL = 22;
const W = COLS * CELL;
const H = ROWS * CELL;

type Cell = string | 0;
type Piece = { x: number; y: number; cells: number[][]; color: string };

const PIECES: Array<{ cells: number[][]; color: string }> = [
  { color: "#00f0ff", cells: [[1, 1, 1, 1]] }, // I
  { color: "#fbbf24", cells: [[1, 1], [1, 1]] }, // O
  { color: "#b14dff", cells: [[0, 1, 0], [1, 1, 1]] }, // T
  { color: "#a3e635", cells: [[0, 1, 1], [1, 1, 0]] }, // S
  { color: "#ff2d55", cells: [[1, 1, 0], [0, 1, 1]] }, // Z
  { color: "#f59e0b", cells: [[0, 0, 1], [1, 1, 1]] }, // L
  { color: "#22d3ee", cells: [[1, 0, 0], [1, 1, 1]] }, // J
];

function rotateCells(cells: number[][]): number[][] {
  const r = cells.length, c = cells[0].length;
  const out: number[][] = Array.from({ length: c }, () => Array(r).fill(0));
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) out[j][r - 1 - i] = cells[i][j];
  return out;
}

function randomPiece(): Piece {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)];
  const cells = p.cells.map((r) => [...r]);
  return { x: Math.floor((COLS - cells[0].length) / 2), y: 0, cells, color: p.color };
}

function collides(grid: Cell[][], piece: Piece, ox = 0, oy = 0, cells = piece.cells): boolean {
  for (let i = 0; i < cells.length; i++)
    for (let j = 0; j < cells[i].length; j++) {
      if (!cells[i][j]) continue;
      const x = piece.x + j + ox;
      const y = piece.y + i + oy;
      if (x < 0 || x >= COLS || y >= ROWS) return true;
      if (y >= 0 && grid[y][x]) return true;
    }
  return false;
}

const emptyGrid = (): Cell[][] => Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(0));

const POINTS = [0, 100, 300, 500, 800];

export function PixelTetris() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [high, setHigh] = useState(0);
  const [over, setOver] = useState(false);
  const [running, setRunning] = useState(false);

  const stateRef = useRef({
    grid: emptyGrid(),
    piece: randomPiece(),
    tick: 0,
    dropEvery: 32,
    score: 0,
    lines: 0,
  });

  useEffect(() => {
    setHigh(Number(localStorage.getItem("tetris-high") || 0));
  }, []);

  const reset = useCallback(() => {
    stateRef.current = {
      grid: emptyGrid(),
      piece: randomPiece(),
      tick: 0,
      dropEvery: 32,
      score: 0,
      lines: 0,
    };
    setScore(0);
    setLines(0);
    setOver(false);
    setRunning(true);
  }, []);

  const finishGame = useCallback(() => {
    setOver(true);
    setRunning(false);
    setHigh((h) => {
      const nh = Math.max(h, stateRef.current.score);
      localStorage.setItem("tetris-high", String(nh));
      return nh;
    });
  }, []);

  const lockPiece = useCallback(() => {
    const s = stateRef.current;
    s.piece.cells.forEach((row, i) =>
      row.forEach((v, j) => {
        if (v && s.piece.y + i >= 0) s.grid[s.piece.y + i][s.piece.x + j] = s.piece.color;
      })
    );
    const remaining = s.grid.filter((row) => row.some((c) => !c));
    const cleared = ROWS - remaining.length;
    while (remaining.length < ROWS) remaining.unshift(Array<Cell>(COLS).fill(0));
    s.grid = remaining;
    if (cleared) {
      s.score += POINTS[cleared];
      s.lines += cleared;
      s.dropEvery = Math.max(6, 32 - Math.floor(s.lines / 5) * 3);
      setScore(s.score);
      setLines(s.lines);
    }
    s.piece = randomPiece();
    if (collides(s.grid, s.piece)) finishGame();
  }, [finishGame]);

  const move = useCallback((dx: number) => {
    const s = stateRef.current;
    if (!collides(s.grid, s.piece, dx, 0)) s.piece.x += dx;
  }, []);

  const rotate = useCallback(() => {
    const s = stateRef.current;
    const rotated = rotateCells(s.piece.cells);
    if (!collides(s.grid, s.piece, 0, 0, rotated)) s.piece.cells = rotated;
  }, []);

  const softDrop = useCallback(() => {
    const s = stateRef.current;
    if (!collides(s.grid, s.piece, 0, 1)) s.piece.y++;
    else lockPiece();
  }, [lockPiece]);

  const hardDrop = useCallback(() => {
    const s = stateRef.current;
    while (!collides(s.grid, s.piece, 0, 1)) s.piece.y++;
    lockPiece();
  }, [lockPiece]);

  // render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    const drawCell = (x: number, y: number, color: string) => {
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = color;
      ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, 3);
    };

    const draw = () => {
      ctx.fillStyle = "#0a0a14";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      for (let i = 1; i < COLS; i++) {
        ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, H); ctx.stroke();
      }
      for (let j = 1; j < ROWS; j++) {
        ctx.beginPath(); ctx.moveTo(0, j * CELL); ctx.lineTo(W, j * CELL); ctx.stroke();
      }
      const s = stateRef.current;
      s.grid.forEach((row, y) => row.forEach((c, x) => { if (c) drawCell(x, y, c as string); }));
      s.piece.cells.forEach((row, i) =>
        row.forEach((v, j) => { if (v) drawCell(s.piece.x + j, s.piece.y + i, s.piece.color); })
      );
    };

    if (!running) {
      draw();
      return;
    }

    let raf = 0;
    const loop = () => {
      const s = stateRef.current;
      s.tick++;
      if (s.tick >= s.dropEvery) {
        s.tick = 0;
        softDrop();
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, softDrop]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!running) {
        if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); reset(); }
        return;
      }
      switch (e.code) {
        case "ArrowLeft": case "KeyA": e.preventDefault(); move(-1); break;
        case "ArrowRight": case "KeyD": e.preventDefault(); move(1); break;
        case "ArrowUp": case "KeyW": e.preventDefault(); rotate(); break;
        case "ArrowDown": case "KeyS": e.preventDefault(); softDrop(); break;
        case "Space": e.preventDefault(); hardDrop(); break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, move, rotate, softDrop, hardDrop, reset]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <div className="grid w-full grid-cols-1 items-start justify-items-center gap-4 sm:grid-cols-[auto_auto] sm:gap-6">
        <div
          className="relative overflow-hidden rounded-2xl border-2 border-neon-cyan/40"
          style={{ boxShadow: "0 0 40px -8px rgba(0,240,255,0.5)" }}
        >
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="block"
            style={{ imageRendering: "pixelated", width: "min(80vw, 280px)", height: "auto", aspectRatio: `${W} / ${H}` }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 3px)" }}
          />

          {!running && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 px-4 text-center backdrop-blur-[2px]">
              <p className="font-display text-xl font-extrabold uppercase tracking-widest neon-cyan-text sm:text-2xl">
                {over ? "Game Over" : "Neon Tetris"}
              </p>
              {over && (
                <p className="mt-2 font-mono text-[11px] text-white/70">
                  Score <span className="text-neon-cyan">{score}</span> · Lines <span className="text-neon-pink">{lines}</span>
                </p>
              )}
              <button
                onClick={reset}
                className="mt-4 rounded-lg border border-neon-pink/40 bg-black/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-neon-pink hover:bg-neon-pink/10"
              >
                ▸ {over ? "Play Again" : "Start"} ◂
              </button>
            </div>
          )}
        </div>

        <div className="flex w-full max-w-[200px] flex-col gap-2 font-mono text-xs">
          <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Score</div>
            <div className="text-base text-neon-cyan">{score}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Lines</div>
            <div className="text-base text-neon-pink">{lines}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Best</div>
            <div className="text-base text-white/85">{Math.max(high, score)}</div>
          </div>
          <p className="hidden text-[10px] leading-relaxed text-white/40 sm:block">
            ←→ move<br />↑ rotate · ↓ soft drop<br />space — hard drop
          </p>
        </div>
      </div>

      {/* Mobile controls */}
      <div className="mt-4 grid w-full max-w-xs grid-cols-4 gap-2 sm:hidden">
        <button onClick={() => move(-1)} className="rounded-lg border border-white/15 bg-white/5 py-3 text-lg text-white/80">←</button>
        <button onClick={rotate} className="rounded-lg border border-white/15 bg-white/5 py-3 text-lg text-white/80">↺</button>
        <button onClick={softDrop} className="rounded-lg border border-white/15 bg-white/5 py-3 text-lg text-white/80">↓</button>
        <button onClick={() => move(1)} className="rounded-lg border border-white/15 bg-white/5 py-3 text-lg text-white/80">→</button>
        <button onClick={hardDrop} className="col-span-4 rounded-lg border border-fuchsia-400/30 bg-fuchsia-500/10 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-fuchsia-200">⤓ Hard Drop</button>
      </div>
    </div>
  );
}
