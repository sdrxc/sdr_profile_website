"use client";

/* ──────────────────────────────────────────────────────────────────────────
   Interests Atlas — a scroll-driven journey through curiosities.

   Layout inspired by logartis.info: each "interest" is a full-viewport scene
   with bold display typography and a scroll-bound motion-graphic illustration.
   A chapter rail on the right tracks where you are in the journey; clicking a
   dot smooth-scrolls to that scene. A thin progress strip up top reflects
   overall scroll progress.

   This file only orchestrates — scenes live in `./scenes`, navigation chrome
   in `./components`, and the journey's content/order in `./scenes/index.ts`.
   The galactic backdrop, Hyperjump arrival, and Interstellar easter eggs are
   provided by the parent page.
   ────────────────────────────────────────────────────────────────────────── */

import { useEffect, useState } from "react";
import { ProgressBar } from "./components/ProgressBar";
import { ChapterRail } from "./components/ChapterRail";
import { KafkaRoach } from "./components/KafkaRoach";
import { SCENES, CHAPTERS } from "./scenes";

export function InterestsAtlas() {
  const [active, setActive] = useState<string>(SCENES[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative overflow-x-clip">
      <ProgressBar />
      <ChapterRail chapters={CHAPTERS} activeId={active} onJump={jump} />
      <KafkaRoach />

      {SCENES.map(({ id, Component }) => (
        <Component key={id} />
      ))}
    </div>
  );
}
