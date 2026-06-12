"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { about } from "@/data/about";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setN(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function StatCounters() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {about.numbers.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08, type: "spring", stiffness: 180, damping: 18 }}
          whileHover={{ y: -4 }}
          className="glass glass-hover rounded-2xl p-4 text-center"
        >
          <span className="text-2xl">{s.icon}</span>
          <p className="mt-1 font-display text-3xl font-extrabold gradient-text">
            {"text" in s && s.text ? s.text : <CountUp to={s.value!} suffix={s.suffix} />}
          </p>
          <p className="mt-0.5 text-[11px] uppercase tracking-wider text-white/45">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
