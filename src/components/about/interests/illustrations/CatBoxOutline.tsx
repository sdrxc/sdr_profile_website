import { STROKE } from "./stroke";

export function CatBoxOutline() {
  return (
    <svg viewBox="0 0 240 180" className="h-auto w-full" fill="none" stroke={STROKE} strokeWidth={1.4} strokeLinejoin="round">
      <path d="M30 64 L 120 38 L 210 64 L 120 92 Z" />
      <path d="M30 64 L 30 146 L 120 172 L 210 146 L 210 64" />
      <path d="M120 92 L 120 172" opacity={0.7} />
      <path d="M30 64 L 60 38 L 150 24 L 210 64" opacity={0.45} />
      <path d="M60 64 L 60 146" opacity={0.25} strokeDasharray="2 4" />
      <path d="M180 64 L 180 146" opacity={0.25} strokeDasharray="2 4" />
    </svg>
  );
}
