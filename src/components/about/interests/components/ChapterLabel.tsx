import type { ReactNode } from "react";

/* Small monospace eyebrow shown above each scene heading:  "01 · Rails & Sky" */
export function ChapterLabel({ num, color, children }: { num: string; color: string; children: ReactNode }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.45em] ${color}`}>
      <span className="opacity-50">{num}</span>
      <span className="mx-2 opacity-30">·</span>
      <span>{children}</span>
    </p>
  );
}
