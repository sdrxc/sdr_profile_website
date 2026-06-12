"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Poster } from "@/data/illustrator";

function PosterCard({ poster, index }: { poster: Poster; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 15 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: index % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <a
        ref={ref}
        href={poster.href ?? "#"}
        target="_blank"
        rel="noreferrer"
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="group block"
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        >
          <Image
            src={poster.image}
            alt={poster.title}
            fill
            sizes="(max-width:640px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* halftone sheen on hover */}
          <div
            className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40"
            style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1.4px)", backgroundSize: "8px 8px" }}
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ transform: "translateZ(40px)" }}>
            <p className="font-display text-xl font-bold text-white">{poster.title}</p>
            <p className="text-sm text-white/60">{poster.client} · {poster.year}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {poster.tags?.map((t) => (
                <span key={t} className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/80">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
}

export function PosterWall({ posters }: { posters: Poster[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posters.map((p, i) => (
        <PosterCard key={p.title} poster={p} index={i} />
      ))}
    </div>
  );
}

/** Infinite horizontal marquee of the tool / tag words. */
export function Marquee({ items, accent }: { items: string[]; accent: string }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex w-max gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl font-bold uppercase tracking-tight text-white/30">
            {it}
            <span style={{ color: accent }}>✺</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
