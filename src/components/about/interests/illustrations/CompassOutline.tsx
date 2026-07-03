import { STROKE } from "./stroke";

export function CompassOutline() {
  return (
    <svg viewBox="0 0 220 220" className="h-auto w-full" fill="none" stroke={STROKE} strokeWidth={1.5}>
      <circle cx={110} cy={110} r={104} />
      <circle cx={110} cy={110} r={88} opacity={0.4} />
      <circle cx={110} cy={110} r={60} opacity={0.3} strokeDasharray="2 4" />
      {[0, 90, 180, 270].map((d) => (
        <g key={d} transform={`rotate(${d} 110 110)`}>
          <line x1={110} y1={6} x2={110} y2={24} />
          <text x={110} y={42} textAnchor="middle" fontSize="14" fill="rgba(190,235,255,0.85)" stroke="none" fontFamily="monospace">
            {d === 0 ? "N" : d === 90 ? "E" : d === 180 ? "S" : "W"}
          </text>
        </g>
      ))}
      {[45, 135, 225, 315].map((d) => (
        <line key={d} x1={110} y1={10} x2={110} y2={20} transform={`rotate(${d} 110 110)`} opacity={0.55} />
      ))}
      <path d="M110 28 L 124 110 L 110 192 L 96 110 Z" fill="rgba(255,93,122,0.55)" stroke="rgba(255,180,200,0.9)" />
      <circle cx={110} cy={110} r={5} fill="rgba(255,255,255,0.95)" stroke="none" />
    </svg>
  );
}
