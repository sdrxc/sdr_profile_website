import { STROKE } from "./stroke";

export function ShinkansenOutline() {
  return (
    <svg viewBox="0 0 680 90" className="h-auto w-full" fill="none" stroke={STROKE} strokeWidth={1.4} strokeLinejoin="round">
      <path d="M2 70 Q 30 18 220 22 L 600 22 Q 660 22 668 70 Z" />
      <path d="M40 64 L 600 64" strokeDasharray="3 7" />
      {[260, 320, 380, 440, 500, 560].map((x) => (
        <rect key={x} x={x} y={32} width={36} height={16} rx={3} opacity={0.65} />
      ))}
      <path d="M380 22 L 380 6 L 408 6 L 408 22" opacity={0.6} />
      {[320, 420, 520, 620].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={70} r={11} />
          <circle cx={cx} cy={70} r={5} opacity={0.5} />
        </g>
      ))}
    </svg>
  );
}
