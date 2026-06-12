"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const W = 800;
const H = 300;
const GROUND = 250;
const GRAVITY = 0.9;
const JUMP = -15;

type Obstacle = { x: number; w: number; h: number; flying: boolean };
type Coin = { x: number; y: number; got: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };

type Status = "idle" | "run" | "over";

export function PixelGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(0);

  // all fast-changing game state lives in a ref to avoid re-renders
  const g = useRef({
    status: "idle" as Status,
    py: GROUND - 28,
    vy: 0,
    onGround: true,
    obstacles: [] as Obstacle[],
    coins: [] as Coin[],
    parts: [] as Particle[],
    stars: [] as { x: number; y: number; z: number }[],
    speed: 6,
    dist: 0,
    coinsGot: 0,
    spawn: 0,
    coinSpawn: 0,
    frame: 0,
    scoreVal: 0,
  });

  useEffect(() => {
    setHigh(Number(localStorage.getItem("pixeldash-high") || 0));
    // seed stars
    const s = g.current;
    s.stars = Array.from({ length: 40 }, (_, i) => ({
      x: (i * 53) % W,
      y: (i * 37) % (GROUND - 20),
      z: (i % 3) + 1,
    }));
  }, []);

  const reset = useCallback(() => {
    const s = g.current;
    s.py = GROUND - 28;
    s.vy = 0;
    s.onGround = true;
    s.obstacles = [];
    s.coins = [];
    s.parts = [];
    s.speed = 6;
    s.dist = 0;
    s.coinsGot = 0;
    s.spawn = 60;
    s.coinSpawn = 120;
    s.frame = 0;
    s.scoreVal = 0;
  }, []);

  const action = useCallback(() => {
    const s = g.current;
    if (s.status !== "run") {
      reset();
      s.status = "run";
      setStatus("run");
      return;
    }
    if (s.onGround) {
      s.vy = JUMP;
      s.onGround = false;
    }
  }, [reset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    let raf = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        action();
      }
    };
    window.addEventListener("keydown", onKey);

    const px = (x: number, y: number, w: number, h: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(Math.round(x), Math.round(y), w, h);
    };

    const drawPlayer = (s: typeof g.current) => {
      const x = 90;
      const y = s.py;
      // glow
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 14;
      px(x + 4, y, 16, 12, "#00f0ff"); // head
      px(x + 8, y + 3, 6, 4, "#0a0a12"); // visor
      px(x, y + 12, 24, 12, "#22d3ee"); // body
      ctx.shadowBlur = 0;
      // legs (running animation)
      const run = s.onGround && Math.floor(s.frame / 5) % 2 === 0;
      px(x + 2, y + 24, 7, run ? 4 : 6, "#0891b2");
      px(x + 15, y + 24, 7, run ? 6 : 4, "#0891b2");
    };

    const loop = () => {
      const s = g.current;
      s.frame++;

      // background
      ctx.fillStyle = "#0a0a14";
      ctx.fillRect(0, 0, W, H);

      // stars parallax
      s.stars.forEach((st) => {
        if (s.status === "run") st.x -= st.z * 0.6;
        if (st.x < 0) st.x = W;
        px(st.x, st.y, st.z, st.z, st.z === 3 ? "#ff2d95" : st.z === 2 ? "#b14dff" : "#334");
      });

      // ground neon line
      px(0, GROUND, W, 2, "#ff2d95");
      for (let i = 0; i < W; i += 24) {
        const off = s.status === "run" ? (s.dist % 24) : 0;
        px(i - off, GROUND + 6, 12, 2, "#3a1030");
      }

      if (s.status === "run") {
        // physics
        s.vy += GRAVITY;
        s.py += s.vy;
        if (s.py >= GROUND - 28) {
          s.py = GROUND - 28;
          s.vy = 0;
          s.onGround = true;
        }
        s.dist += s.speed;
        s.scoreVal = Math.floor(s.dist / 10) + s.coinsGot * 25;
        s.speed = 6 + s.dist / 2000;

        // spawn obstacles
        if (--s.spawn <= 0) {
          const flying = Math.random() < 0.25;
          const h = flying ? 18 : 20 + Math.floor(Math.random() * 28);
          s.obstacles.push({ x: W + 20, w: 16 + Math.floor(Math.random() * 16), h, flying });
          s.spawn = Math.max(38, 90 - s.dist / 300 + Math.random() * 30);
        }
        // spawn coins
        if (--s.coinSpawn <= 0) {
          s.coins.push({ x: W + 20, y: GROUND - 70 - Math.random() * 40, got: false });
          s.coinSpawn = 140 + Math.random() * 120;
        }

        // move + collide obstacles
        const pl = { x: 90, y: s.py, w: 24, h: 28 };
        for (const o of s.obstacles) {
          o.x -= s.speed;
          const oy = o.flying ? GROUND - 70 : GROUND - o.h;
          if (pl.x < o.x + o.w && pl.x + pl.w > o.x && pl.y < oy + o.h && pl.y + pl.h > oy) {
            // hit -> game over + particle burst
            for (let i = 0; i < 24; i++) {
              s.parts.push({
                x: pl.x + 12, y: pl.y + 14,
                vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8,
                life: 40, color: i % 2 ? "#00f0ff" : "#ff2d95",
              });
            }
            s.status = "over";
            setStatus("over");
            setScore(s.scoreVal);
            setHigh((h) => {
              const nh = Math.max(h, s.scoreVal);
              localStorage.setItem("pixeldash-high", String(nh));
              return nh;
            });
          }
        }
        s.obstacles = s.obstacles.filter((o) => o.x + o.w > -10);

        // coins
        for (const c of s.coins) {
          c.x -= s.speed;
          if (!c.got && pl.x < c.x + 12 && pl.x + pl.w > c.x && pl.y < c.y + 12 && pl.y + pl.h > c.y) {
            c.got = true;
            s.coinsGot++;
            for (let i = 0; i < 8; i++) s.parts.push({ x: c.x + 6, y: c.y + 6, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4, life: 20, color: "#fbbf24" });
          }
        }
        s.coins = s.coins.filter((c) => c.x > -20 && !c.got);
      }

      // draw obstacles
      for (const o of s.obstacles) {
        const oy = o.flying ? GROUND - 70 : GROUND - o.h;
        ctx.shadowColor = o.flying ? "#b14dff" : "#ff2d95";
        ctx.shadowBlur = 10;
        px(o.x, oy, o.w, o.h, o.flying ? "#b14dff" : "#ff2d95");
        ctx.shadowBlur = 0;
        // pixel notch detail
        px(o.x + 3, oy + 3, 3, 3, "#0a0a14");
      }

      // draw coins
      for (const c of s.coins) {
        const bob = Math.sin(s.frame / 8 + c.x) * 2;
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 10;
        px(c.x, c.y + bob, 12, 12, "#fbbf24");
        ctx.shadowBlur = 0;
        px(c.x + 4, c.y + 2 + bob, 2, 8, "#fff7cc");
      }

      // particles
      s.parts.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life--;
        px(p.x, p.y, 3, 3, p.color);
      });
      s.parts = s.parts.filter((p) => p.life > 0);

      drawPlayer(s);

      // score HUD (pixel font feel)
      ctx.fillStyle = "#eafdff";
      ctx.font = "bold 18px 'Courier New', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE ${String(s.scoreVal).padStart(5, "0")}`, 16, 30);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ff8ad0";
      ctx.fillText(`★ ${s.coinsGot}`, W - 16, 30);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [action]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        className="relative cursor-pointer select-none overflow-hidden rounded-2xl border-2 border-neon-cyan/40"
        style={{ boxShadow: "0 0 40px -8px rgba(0,240,255,0.5)" }}
        onClick={action}
        onTouchStart={(e) => { e.preventDefault(); action(); }}
        role="button"
        aria-label="Play Pixel Dash — tap or press space to jump"
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="block w-full"
          style={{ imageRendering: "pixelated", aspectRatio: `${W} / ${H}` }}
        />

        {/* scanlines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 3px)" }}
        />

        {/* overlays */}
        {status !== "run" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 text-center backdrop-blur-[2px]">
            {status === "idle" ? (
              <>
                <p className="font-display text-2xl font-extrabold uppercase tracking-widest neon-cyan-text sm:text-4xl">
                  Pixel Dash
                </p>
                <p className="mt-3 max-w-xs text-sm text-white/70">
                  Jump the neon spikes, grab the ★. It only gets faster.
                </p>
                <p className="mt-6 animate-pulse font-mono text-xs uppercase tracking-[0.3em] text-neon-pink">
                  ▸ tap / press space to start ◂
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-3xl font-extrabold uppercase tracking-widest neon-pink-text">
                  Game Over
                </p>
                <p className="mt-3 font-mono text-sm text-white/80">
                  SCORE <span className="text-neon-cyan">{String(score).padStart(5, "0")}</span>
                  <span className="mx-2 text-white/30">·</span>
                  BEST <span className="text-neon-pink">{String(high).padStart(5, "0")}</span>
                </p>
                <p className="mt-5 animate-pulse font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
                  ▸ tap / space to retry ◂
                </p>

                {/* reverse-lure: you liked the game, now meet the human */}
                <div className="mt-6 w-full max-w-sm rounded-xl border border-fuchsia-400/30 bg-black/40 p-4">
                  <p className="text-xs text-white/70">
                    {score >= 250
                      ? "Okay, you're good at this 🏆 You'd probably vibe with the rest too."
                      : "Liked that? There's a whole human behind this little game."}
                  </p>
                  <p className="mt-1 text-[11px] text-white/40">
                    Each ★ you grabbed is a discipline he actually dabbles in.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    <Link
                      href="/"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      ▸ Explore the profile
                    </Link>
                    <Link
                      href="/about"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/80 hover:border-white/50"
                    >
                      Meet the human →
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-xs text-white/40">
        <span>⌨ Space / ↑ / W · 🖱 click · 📱 tap — to jump</span>
        <span>BEST {String(high).padStart(5, "0")}</span>
      </div>
    </div>
  );
}
