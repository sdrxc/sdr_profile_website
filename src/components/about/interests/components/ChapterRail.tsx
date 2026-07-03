"use client";

import type { Chapter } from "../types";

/* Sticky chapter rail on the right (desktop only).

   Default state: just a thin column of dots tucked in the right gutter.
   Labels fly out leftward only while the rail is hovered, and never capture
   pointer events — so they can't overlap or block scene text.

   `chapters` is passed in (derived from the scene registry) so this component
   stays decoupled from the journey's content. */
export function ChapterRail({
  chapters,
  activeId,
  onJump,
}: {
  chapters: Chapter[];
  activeId: string;
  onJump: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Chapter navigation"
      className="group pointer-events-auto fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 md:block"
    >
      <ol className="relative flex flex-col items-end gap-3.5">
        <span aria-hidden className="absolute right-[6px] top-2 bottom-2 w-px bg-white/10" />
        {chapters.map((c) => {
          const active = c.id === activeId;
          return (
            <li key={c.id} className="flex w-full justify-end">
              <button
                onClick={() => onJump(c.id)}
                className="flex flex-row-reverse items-center gap-3"
                aria-current={active ? "true" : undefined}
                aria-label={`Jump to ${c.label}`}
              >
                <span
                  className={`relative grid h-[13px] w-[13px] flex-none place-items-center rounded-full border transition-all duration-300 ${
                    active
                      ? "border-cyan-300 bg-cyan-300/30 shadow-[0_0_14px_2px_rgba(34,211,238,0.5)]"
                      : "border-white/30 bg-ink/60 group-hover:border-white/60"
                  }`}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />}
                </span>
                <span
                  className={`pointer-events-none translate-x-3 whitespace-nowrap rounded-md border border-white/10 bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.28em] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
                    active ? "text-white" : "text-white/55"
                  }`}
                >
                  <span className="opacity-50">{c.num}</span>
                  <span className="ml-2">{c.label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
