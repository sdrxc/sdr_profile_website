"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Developer Quest — pixel Soumya catches the seven persona icons
 * while dodging falling bugs. Each ★ caught is a discipline he
 * actually dabbles in (developer, researcher, photographer, etc.).
 */

const W = 600;
const H = 400;
const FLOOR = H - 60;
const PLAYER_W = 32;
const PLAYER_H = 40;

type Item = {
  x: number;
  y: number;
  vy: number;
  kind: "persona" | "bug";
  icon: string;
  color: string;
};

const PERSONAS = [
  { icon: "⌘", color: "#8b5cf6", label: "developer" },
  { icon: "✦", color: "#22d3ee", label: "researcher" },
  { icon: "◎", color: "#f59e0b", label: "photographer" },
  { icon: "✿", color: "#fb923c", label: "illustrator" },
  { icon: "♪", color: "#a3e635", label: "listener" },
  { icon: "◈", color: "#34d399", label: "explorer" },
  { icon: "❦", color: "#ec4899", label: "reader" },
];

type Status = "idle" | "run" | "over";

export function CoderQuest() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [high, setHigh] = useState(0);
  const [lastCaught, setLastCaught] = useState<string | null>(null);

  const g = useRef({
    status: "idle" as Status,
    px: W / 2 - PLAYER_W / 2,
    items: [] as Item[],
    spawn: 0,
    frame: 0,
    speed: 2.2,
    score: 0,
    lives: 3,
    keys: { left: false, right: false },
  });

  useEffect(() => {
    setHigh(Number(localStorage.getItem("coderquest-high") || 0));
  }, []);

  const reset = useCallback(() => {
    g.current = {
      status: "run",
      px: W / 2 - PLAYER_W / 2,
      items: [],
      spawn: 30,
      frame: 0,
      speed: 2.2,
      score: 0,
      lives: 3,
      keys: { left: false, right: false },
    };
    setScore(0);
    setLives(3);
    setStatus("run");
    setLastCaught(null);
  }, []);

  const onTap = useCallback(() => {
    if (g.current.status !== "run") reset();
  }, [reset]);

  // game loop + input
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    let raf = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      const k = g.current.keys;
      if (e.code === "ArrowLeft" || e.code === "KeyA") { k.left = true; e.preventDefault(); }
      if (e.code === "ArrowRight" || e.code === "KeyD") { k.right = true; e.preventDefault(); }
      if ((e.code === "Space" || e.code === "Enter") && g.current.status !== "run") {
        e.preventDefault();
        reset();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") g.current.keys.left = false;
      if (e.code === "ArrowRight" || e.code === "KeyD") g.current.keys.right = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // pixel-art Soumya: hair, face, glasses, body, legs, shoes
    const drawSoumya = (x: number, y: number, frame: number) => {
      // shadow
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.beginPath();
      ctx.ellipse(x + PLAYER_W / 2, y + PLAYER_H + 4, 14, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      // hair
      ctx.fillStyle = "#15100c";
      ctx.fillRect(x + 6, y, 20, 7);
      ctx.fillRect(x + 4, y + 2, 4, 10);
      ctx.fillRect(x + 24, y + 2, 4, 9);
      // face
      ctx.fillStyle = "#f1c290";
      ctx.fillRect(x + 8, y + 6, 16, 12);
      // glasses
      ctx.fillStyle = "#0a0a12";
      ctx.fillRect(x + 9, y + 10, 5, 4);
      ctx.fillRect(x + 18, y + 10, 5, 4);
      ctx.fillRect(x + 14, y + 11, 4, 2);
      // smile
      ctx.fillStyle = "#3a1a14";
      ctx.fillRect(x + 13, y + 16, 6, 1);
      // body (gradient violet → cyan)
      ctx.shadowColor = "#8b5cf6";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#8b5cf6";
      ctx.fillRect(x + 3, y + 18, 26, 9);
      ctx.fillStyle = "#22d3ee";
      ctx.fillRect(x + 3, y + 25, 26, 6);
      ctx.shadowBlur = 0;
      // tiny code symbol on chest
      ctx.fillStyle = "#0a0a12";
      ctx.font = "bold 8px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.fillText("⌘", x + PLAYER_W / 2, y + 26);
      // legs (alternating)
      const swap = Math.floor(frame / 6) % 2 === 0;
      ctx.fillStyle = "#1f2937";
      ctx.fillRect(x + 8, y + 31, 6, swap ? 7 : 9);
      ctx.fillRect(x + 18, y + 31, 6, swap ? 9 : 7);
      // shoes
      ctx.fillStyle = "#000";
      ctx.fillRect(x + 7, y + 38, 8, 2);
      ctx.fillRect(x + 17, y + 38, 8, 2);
    };

    const drawBg = (frame: number) => {
      ctx.fillStyle = "#0a0a14";
      ctx.fillRect(0, 0, W, H);
      // vertical neon grid lines
      ctx.fillStyle = "rgba(0,240,255,0.05)";
      for (let i = 0; i < W; i += 30) ctx.fillRect(i, 0, 1, FLOOR);
      // moving floor
      ctx.fillStyle = "#ff2d95";
      ctx.fillRect(0, FLOOR, W, 2);
      ctx.fillStyle = "#3a1030";
      for (let i = 0; i < W; i += 24) {
        const off = (frame * 2) % 24;
        ctx.fillRect(i - off, FLOOR + 6, 12, 2);
      }
    };

    const loop = () => {
      const s = g.current;
      s.frame++;
      drawBg(s.frame);

      if (s.status === "run") {
        if (s.keys.left) s.px -= 5;
        if (s.keys.right) s.px += 5;
        s.px = Math.max(0, Math.min(W - PLAYER_W, s.px));

        if (--s.spawn <= 0) {
          const isBug = Math.random() < 0.22;
          const p = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
          s.items.push({
            x: 10 + Math.random() * (W - 40),
            y: -22,
            vy: s.speed + Math.random() * 1.6,
            kind: isBug ? "bug" : "persona",
            icon: isBug ? "✕" : p.icon,
            color: isBug ? "#ff2d55" : p.color,
          });
          s.spawn = Math.max(18, 48 - Math.floor(s.score / 4));
        }

        const py = FLOOR - PLAYER_H;
        for (const it of s.items) {
          it.y += it.vy;
          const caught =
            it.x + 14 > s.px &&
            it.x + 6 < s.px + PLAYER_W &&
            it.y + 20 > py &&
            it.y < py + PLAYER_H;
          if (caught) {
            if (it.kind === "persona") {
              s.score++;
              setScore(s.score);
              const label = PERSONAS.find((p) => p.icon === it.icon)?.label ?? null;
              if (label) setLastCaught(label);
              s.speed = Math.min(7, 2.2 + s.score * 0.08);
            } else {
              s.lives--;
              setLives(s.lives);
              if (s.lives <= 0) {
                s.status = "over";
                setStatus("over");
                setHigh((h) => {
                  const nh = Math.max(h, s.score);
                  localStorage.setItem("coderquest-high", String(nh));
                  return nh;
                });
              }
            }
            it.y = H + 100;
          }
        }
        s.items = s.items.filter((i) => i.y < H + 60);
      }

      // draw items
      ctx.textAlign = "center";
      for (const it of s.items) {
        ctx.shadowColor = it.color;
        ctx.shadowBlur = 14;
        ctx.fillStyle = it.color;
        ctx.font = "bold 24px 'Inter', sans-serif";
        ctx.fillText(it.icon, it.x + 12, it.y + 20);
        ctx.shadowBlur = 0;
      }

      drawSoumya(s.px, FLOOR - PLAYER_H, s.frame);

      // HUD
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#eafdff";
      ctx.font = "bold 15px 'Courier New', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE ${String(s.score).padStart(3, "0")}`, 14, 24);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ff8ad0";
      ctx.fillText(`${"♥".repeat(Math.max(0, s.lives))}${"·".repeat(Math.max(0, 3 - s.lives))}`, W - 14, 24);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [reset]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        className="relative cursor-pointer select-none overflow-hidden rounded-2xl border-2 border-neon-cyan/40"
        style={{ boxShadow: "0 0 40px -8px rgba(0,240,255,0.5)" }}
        onClick={onTap}
        role="button"
        aria-label="Developer Quest — move with arrow keys, tap on mobile"
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="block w-full"
          style={{ imageRendering: "pixelated", aspectRatio: `${W} / ${H}` }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 3px)" }}
        />

        {status !== "run" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 px-6 text-center backdrop-blur-[2px]">
            <p className="font-display text-2xl font-extrabold uppercase tracking-widest neon-cyan-text sm:text-4xl">
              {status === "idle" ? "Developer Quest" : "Game Over"}
            </p>
            {status === "idle" ? (
              <p className="mt-3 max-w-sm text-sm text-white/70">
                That&apos;s pixel Soumya. Move him with <span className="text-neon-cyan">← →</span>,
                catch the falling persona icons, dodge the red ✕ bugs.
              </p>
            ) : (
              <p className="mt-3 font-mono text-sm text-white/80">
                CAUGHT <span className="text-neon-cyan">{score}</span>
                <span className="mx-2 text-white/30">·</span>
                BEST <span className="text-neon-pink">{Math.max(high, score)}</span>
              </p>
            )}
            <p className="mt-5 animate-pulse font-mono text-xs uppercase tracking-[0.3em] text-neon-pink">
              ▸ tap / space to {status === "idle" ? "start" : "retry"} ◂
            </p>
          </div>
        )}
      </div>

      {/* Mobile control strip */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
        <button
          onTouchStart={(e) => { e.preventDefault(); g.current.keys.left = true; }}
          onTouchEnd={() => { g.current.keys.left = false; }}
          onMouseDown={() => { g.current.keys.left = true; }}
          onMouseUp={() => { g.current.keys.left = false; }}
          className="rounded-lg border border-white/15 bg-white/5 py-3 text-lg text-white/80"
        >← Left</button>
        <button
          onTouchStart={(e) => { e.preventDefault(); g.current.keys.right = true; }}
          onTouchEnd={() => { g.current.keys.right = false; }}
          onMouseDown={() => { g.current.keys.right = true; }}
          onMouseUp={() => { g.current.keys.right = false; }}
          className="rounded-lg border border-white/15 bg-white/5 py-3 text-lg text-white/80"
        >Right →</button>
      </div>

      <div className="mt-3 text-center font-mono text-[11px] text-white/40">
        ← → / A D · {lastCaught ? <>last caught: <span className="text-neon-cyan">{lastCaught}</span> — a discipline he actually dabbles in</> : <>each icon is one of his personas</>}
      </div>
    </div>
  );
}
