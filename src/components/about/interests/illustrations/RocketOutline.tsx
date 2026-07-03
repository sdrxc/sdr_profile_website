import { STROKE } from "./stroke";

export function RocketOutline() {
  return (
    <svg viewBox="0 0 120 360" className="h-auto w-full" fill="none" stroke={STROKE} strokeWidth={1.5} strokeLinejoin="round">
      <path d="M60 4 Q 28 70 30 130 L 30 290 L 90 290 L 90 130 Q 92 70 60 4 Z" />
      <circle cx={60} cy={130} r={10} />
      <path d="M30 240 L 90 240" opacity={0.6} />
      <path d="M30 290 L 6 340 L 30 320 Z" />
      <path d="M90 290 L 114 340 L 90 320 Z" />
      <path d="M55 290 L 50 350 L 70 350 L 65 290 Z" />
      <path d="M60 60 L 60 30" opacity={0.5} />
    </svg>
  );
}
