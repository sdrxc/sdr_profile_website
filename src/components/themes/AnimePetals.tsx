"use client";

import { useEffect, useRef } from "react";
import { mulberry32 } from "@/lib/rng";

/** Falling neon sakura petals, animated with anime.js. */
export function AnimePetals({ count = 16 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // deterministic seed values so SSR markup matches the client
  const seeds = (() => {
    const rng = mulberry32(99);
    return Array.from({ length: count }, () => ({
      left: rng() * 100,
      size: 8 + rng() * 12,
      dur: 6000 + rng() * 7000,
      delay: rng() * 8000,
      sway: 40 + rng() * 120,
      hue: rng() > 0.5 ? "#ff2d95" : "#00f0ff",
      rot: rng() * 360,
    }));
  })();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let anims: { pause: () => void }[] = [];
    let cancelled = false;

    import("animejs").then(({ default: anime }) => {
      if (cancelled || !root) return;
      const petals = Array.from(root.children) as HTMLElement[];
      anims = petals.map((el, i) => {
        const s = seeds[i];
        return anime({
          targets: el,
          translateY: [-40, window.innerHeight + 60],
          translateX: [
            { value: s.sway, duration: s.dur / 2, easing: "easeInOutSine" },
            { value: -s.sway, duration: s.dur / 2, easing: "easeInOutSine" },
          ],
          rotate: [s.rot, s.rot + 540],
          opacity: [
            { value: 0.9, duration: 600 },
            { value: 0.9, duration: s.dur - 1400 },
            { value: 0, duration: 800 },
          ],
          duration: s.dur,
          delay: s.delay,
          loop: true,
          easing: "linear",
        });
      });
    });

    return () => {
      cancelled = true;
      anims.forEach((a) => a.pause());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      {seeds.map((s, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: `radial-gradient(circle at 30% 30%, ${s.hue}, transparent 75%)`,
            borderRadius: "150% 0 150% 0",
            boxShadow: `0 0 8px ${s.hue}`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
