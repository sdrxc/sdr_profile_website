"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/* ──────────────────────────────────────────────────────────────────────────
   Star Wars "jump to lightspeed" hyperspace transition.

   A canvas starfield streaks radially from the centre. On a JUMP it accelerates
   into long blue-white lines and whites out; on ARRIVAL it bursts in white and
   decelerates back to a calm field before fading away. The white flash bridges
   the route swap so the two pages feel like one continuous jump.
   ────────────────────────────────────────────────────────────────────────── */

type Direction = "jump" | "arrive";

const easeInCubic = (p: number) => p * p * p;
const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

function runHyperspace(
  canvas: HTMLCanvasElement,
  flash: HTMLDivElement,
  motto: HTMLDivElement,
  opts: { direction: Direction; duration: number; onComplete?: () => void }
): () => void {
  const { direction, duration, onComplete } = opts;
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const cx = w / 2;
  const cy = h / 2;
  const focal = Math.max(w, h) * 0.55;
  const maxDepth = focal * 2.4;
  const speedScale = maxDepth / 1300;

  const count = Math.min(900, Math.max(280, Math.floor((w * h) / 1700)));
  type Star = { x: number; y: number; z: number; pz: number };
  const stars: Star[] = [];
  const spawn = (z?: number): Star => ({
    x: (Math.random() * 2 - 1) * w,
    y: (Math.random() * 2 - 1) * h,
    z: z ?? Math.random() * maxDepth,
    pz: 0,
  });
  for (let i = 0; i < count; i++) {
    const s = spawn();
    s.pz = s.z;
    stars.push(s);
  }

  let raf = 0;
  let start = 0;
  let cancelled = false;

  const frame = (t: number) => {
    if (cancelled) return;
    if (!start) start = t;
    const p = clamp01((t - start) / duration);

    // speed profile + flash + global fade differ per direction
    let speed: number;
    let flashOpacity: number;
    let fieldOpacity = 1;
    let mottoOpacity: number;
    let mottoScale: number;
    if (direction === "jump") {
      speed = (2 + easeInCubic(p) * 150) * speedScale;
      flashOpacity = clamp01((p - 0.74) / 0.26);
      mottoOpacity = clamp01((p - 0.8) / 0.15);
      mottoScale = 0.92 + 0.12 * easeOutCubic(clamp01((p - 0.78) / 0.22));
    } else {
      speed = (2 + Math.pow(1 - p, 2) * 150) * speedScale;
      flashOpacity = 1 - easeOutCubic(clamp01(p / 0.55));
      fieldOpacity = 1 - easeInCubic(clamp01((p - 0.65) / 0.35));
      mottoOpacity = 1 - easeOutCubic(clamp01(p / 0.4));
      mottoScale = 1 + 0.18 * easeOutCubic(clamp01(p / 0.5));
    }
    flash.style.opacity = String(flashOpacity);
    motto.style.opacity = String(mottoOpacity);
    motto.style.transform = `translate(-50%, -50%) scale(${mottoScale})`;

    // motion-trail: fade the previous frame instead of hard-clearing
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgba(7,7,16,0.32)";
    ctx.fillRect(0, 0, w, h);

    ctx.globalAlpha = fieldOpacity;
    ctx.lineCap = "round";
    for (const s of stars) {
      s.pz = s.z;
      s.z -= speed;
      if (s.z < 1) {
        const ns = spawn(maxDepth);
        ns.pz = maxDepth;
        Object.assign(s, ns);
        continue;
      }
      const k = focal / s.z;
      const px = cx + s.x * k;
      const py = cy + s.y * k;
      const pk = focal / s.pz;
      const ppx = cx + s.x * pk;
      const ppy = cy + s.y * pk;

      const depth = 1 - s.z / maxDepth; // 0 far → 1 near
      const blue = Math.round(255);
      const green = Math.round(190 + 60 * depth);
      const red = Math.round(165 + 80 * depth);
      ctx.strokeStyle = `rgba(${red},${green},${blue},${0.35 + 0.65 * depth})`;
      ctx.lineWidth = 0.5 + depth * 2.4;
      ctx.beginPath();
      ctx.moveTo(ppx, ppy);
      ctx.lineTo(px, py);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    if (p >= 1) {
      onComplete?.();
      return;
    }
    raf = requestAnimationFrame(frame);
  };

  raf = requestAnimationFrame(frame);
  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
  };
}

function HyperOverlay({
  direction,
  duration,
  onComplete,
}: {
  direction: Direction;
  duration: number;
  onComplete?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const mottoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !flashRef.current || !mottoRef.current) return;
    const stop = runHyperspace(canvasRef.current, flashRef.current, mottoRef.current, {
      direction,
      duration,
      onComplete,
    });
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[200] bg-[#070710]" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 bg-white"
        style={{ opacity: direction === "arrive" ? 1 : 0 }}
      />
      <div
        ref={mottoRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] whitespace-nowrap text-center font-light italic tracking-[0.35em] lowercase"
        style={{
          opacity: direction === "arrive" ? 1 : 0,
          transform: "translate(-50%, -50%) scale(1)",
          fontSize: "clamp(0.55rem, 0.9vw, 0.8rem)",
          color: "rgba(40,40,60,0.55)",
          letterSpacing: "0.4em",
        }}
      >
        may the force be with you
      </div>
    </div>,
    document.body
  );
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** A link that fires off the lightspeed jump, then navigates once the field whites out. */
export function HyperjumpLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [jumping, setJumping] = useState(false);

  useEffect(() => {
    router.prefetch(href);
  }, [href, router]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (jumping) return;
    if (prefersReducedMotion()) {
      router.push(href);
      return;
    }
    setJumping(true);
  };

  return (
    <>
      <a href={href} onClick={onClick} className={className}>
        {children}
      </a>
      {jumping && (
        <HyperOverlay
          direction="jump"
          duration={1500}
          onComplete={() => router.push(href)}
        />
      )}
    </>
  );
}

/** Plays the "drop out of hyperspace" burst on mount of a destination page. */
export function HyperArrival({ duration = 1200 }: { duration?: number }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setActive(true);
  }, []);

  if (!active) return null;
  return (
    <HyperOverlay
      direction="arrive"
      duration={duration}
      onComplete={() => setActive(false)}
    />
  );
}
