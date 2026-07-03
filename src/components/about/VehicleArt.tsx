"use client";

/* ──────────────────────────────────────────────────────────────────────────
   Vehicle illustrations — detailed multi-tone SVG art.

   These replace the blueprint-style line outlines with filled, shaded
   illustrations that read as actual aircraft / racecars at a glance.
   Both face LEFT in their native orientation; mirror them with a wrapper
   `transform: scaleX(-1)` if you need them flying the other way.
   ────────────────────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────────────────────
   Airbus A380 — generic white livery with deep-blue belly + tail accent
   ────────────────────────────────────────────────────────────────────────── */

export function A380Art() {
  return (
    <svg viewBox="0 0 820 260" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="a380-fuselage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdfefe" />
          <stop offset="55%" stopColor="#eef1f4" />
          <stop offset="100%" stopColor="#c9d1da" />
        </linearGradient>
        <linearGradient id="a380-wing-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbe2eb" />
          <stop offset="100%" stopColor="#a8b3c2" />
        </linearGradient>
        <linearGradient id="a380-wing-bot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8c97a8" />
          <stop offset="100%" stopColor="#5a6573" />
        </linearGradient>
        <linearGradient id="a380-tail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d6cb0" />
          <stop offset="100%" stopColor="#1f4280" />
        </linearGradient>
        <linearGradient id="a380-engine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a6573" />
          <stop offset="100%" stopColor="#2a313c" />
        </linearGradient>
        <radialGradient id="a380-engine-core" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#9aa6b8" />
          <stop offset="60%" stopColor="#4a5260" />
          <stop offset="100%" stopColor="#1a1f28" />
        </radialGradient>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="420" cy="232" rx="320" ry="6" fill="rgba(20,30,45,0.22)" />

      {/* main wing — back layer */}
      <path
        d="M280 152 L 420 220 L 600 220 L 510 152 Z"
        fill="url(#a380-wing-top)"
      />
      {/* wing underside shadow */}
      <path
        d="M420 220 L 600 220 L 600 226 L 420 226 Z"
        fill="url(#a380-wing-bot)"
      />
      {/* wing root shadow on fuselage */}
      <path d="M310 150 L 510 150 L 480 158 L 320 158 Z" fill="#a8b3c2" opacity="0.6" />

      {/* engines — 4 cowlings */}
      {[
        { x: 350, y: 198 },
        { x: 400, y: 198 },
        { x: 480, y: 198 },
        { x: 530, y: 198 },
      ].map((e, i) => (
        <g key={i}>
          {/* pylon */}
          <path d={`M${e.x - 4} ${e.y - 16} L ${e.x + 28} ${e.y - 16} L ${e.x + 24} ${e.y - 6} L ${e.x} ${e.y - 6} Z`} fill="#7a8595" />
          {/* cowling body */}
          <ellipse cx={e.x + 12} cy={e.y} rx="22" ry="11" fill="url(#a380-engine)" />
          {/* intake core */}
          <ellipse cx={e.x + 4} cy={e.y} rx="9" ry="8" fill="url(#a380-engine-core)" />
          {/* highlight */}
          <ellipse cx={e.x + 12} cy={e.y - 5} rx="14" ry="2" fill="rgba(255,255,255,0.25)" />
        </g>
      ))}

      {/* tail fin */}
      <path
        d="M620 90 L 700 14 L 730 18 L 724 92 Z"
        fill="url(#a380-tail)"
      />
      {/* tail fin highlight */}
      <path d="M626 90 L 698 22 L 710 24 L 712 90 Z" fill="rgba(255,255,255,0.08)" />

      {/* horizontal stabilizer */}
      <path d="M716 116 L 786 106 L 720 130 Z" fill="url(#a380-wing-top)" />
      <path d="M716 130 L 720 130 L 766 122 L 786 106 L 778 110 L 760 118 L 730 126 Z" fill="#a8b3c2" opacity="0.7" />

      {/* fuselage main body */}
      <path
        d="M30 132 C 18 122 24 96 80 90 L 600 90 C 690 92 745 110 770 132 L 740 142 C 700 152 660 156 620 156 L 90 158 C 60 158 38 144 30 132 Z"
        fill="url(#a380-fuselage)"
      />

      {/* belly accent stripe (deep blue) */}
      <path d="M70 144 L 720 142 L 716 152 L 80 154 Z" fill="#1f4280" />
      <path d="M70 144 L 720 142 L 718 145 L 70 147 Z" fill="#3d6cb0" />

      {/* upper-deck windows */}
      <g fill="#1a2230">
        {Array.from({ length: 36 }, (_, i) => 88 + i * 13).map((x) => (
          <rect key={`u${x}`} x={x} y={102} width="6" height="5" rx="1" />
        ))}
      </g>
      {/* lower-deck windows */}
      <g fill="#1a2230">
        {Array.from({ length: 40 }, (_, i) => 86 + i * 13).map((x) => (
          <rect key={`l${x}`} x={x} y={122} width="6" height="5" rx="1" />
        ))}
      </g>

      {/* cockpit / nose windscreen */}
      <path
        d="M30 124 C 36 116 50 110 70 106 L 90 110 L 84 124 L 50 132 Z"
        fill="#0e1828"
      />
      <path
        d="M44 114 L 60 110 L 80 114 L 76 122 L 56 126 Z"
        fill="#1d3a62"
        opacity="0.8"
      />
      <path d="M50 116 L 60 113 M 62 116 L 72 114 M 50 121 L 60 120 M 64 121 L 74 120" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />

      {/* nose tip highlight */}
      <path d="M30 132 C 26 128 28 122 34 118" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />

      {/* door hints */}
      {[150, 240, 340, 440, 540].map((x) => (
        <rect key={`d${x}`} x={x} y={108} width="5" height="38" rx="1" fill="#9aa6b8" opacity="0.45" />
      ))}

      {/* registration text under wing */}
      <text
        x="180"
        y="135"
        fontFamily="monospace"
        fontSize="6"
        fill="#1a2230"
        opacity="0.4"
        letterSpacing="1"
      >
        A380-800
      </text>

      {/* faint underside shadow on fuselage */}
      <path
        d="M30 132 C 100 154 200 158 380 156 L 600 156 C 660 156 720 152 770 132 L 740 142 C 700 152 660 156 620 156 L 90 158 C 60 158 38 144 30 132 Z"
        fill="#000"
        opacity="0.05"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Formula 1 car — modern-era side profile with halo, deep red livery
   ────────────────────────────────────────────────────────────────────────── */

export function F1Art() {
  return (
    <svg viewBox="0 0 720 240" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="f1-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8252f" />
          <stop offset="55%" stopColor="#9c1924" />
          <stop offset="100%" stopColor="#6b1018" />
        </linearGradient>
        <linearGradient id="f1-body-hi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8404a" />
          <stop offset="100%" stopColor="#c8252f" />
        </linearGradient>
        <linearGradient id="f1-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2a2c" />
          <stop offset="100%" stopColor="#0a0a0c" />
        </linearGradient>
        <radialGradient id="f1-tyre" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#3a3a3e" />
          <stop offset="65%" stopColor="#1a1a1c" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <radialGradient id="f1-rim" cx="0.4" cy="0.4" r="0.5">
          <stop offset="0%" stopColor="#b8bcc4" />
          <stop offset="100%" stopColor="#3a3e44" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="360" cy="206" rx="290" ry="6" fill="rgba(20,30,45,0.28)" />

      {/* rear wing — endplate + main plane */}
      <g>
        <path d="M598 82 L 670 82 L 670 94 L 598 94 Z" fill="#0d0d0f" />
        <path d="M598 94 L 670 94 L 670 100 L 598 100 Z" fill="#1f1f22" />
        {/* DRS flap */}
        <path d="M620 108 L 670 108 L 670 116 L 620 116 Z" fill="#c8252f" />
        <path d="M620 116 L 670 116 L 670 118 L 620 118 Z" fill="#6b1018" />
        {/* endplate */}
        <path d="M660 80 L 672 80 L 672 178 L 660 178 Z" fill="#0d0d0f" />
        {/* beam wing strut */}
        <path d="M610 148 L 670 148 L 670 152 L 610 152 Z" fill="#1a1a1c" />
      </g>

      {/* floor / underbody */}
      <path d="M140 178 L 620 178 L 640 172 L 640 196 L 124 196 Z" fill="url(#f1-floor)" />
      {/* floor edge highlight */}
      <path d="M140 178 L 620 178 L 622 180 L 142 180 Z" fill="#c8252f" opacity="0.5" />

      {/* sidepod / engine cover */}
      <path
        d="M280 160 L 540 160 L 580 152 L 600 142 L 600 178 L 280 178 Z"
        fill="url(#f1-body)"
      />
      {/* sidepod intake cooling outlet */}
      <path d="M530 164 L 580 158 L 580 166 L 530 170 Z" fill="#1a1a1c" />
      {/* sidepod top highlight */}
      <path d="M286 160 L 540 160 L 530 164 L 286 164 Z" fill="url(#f1-body-hi)" opacity="0.7" />

      {/* nose cone — long and low (modern reg) */}
      <path
        d="M22 174 L 110 174 L 130 158 L 130 168 L 110 178 L 22 180 Z"
        fill="url(#f1-body)"
      />
      <path d="M28 174 L 110 174 L 108 176 L 28 176 Z" fill="url(#f1-body-hi)" opacity="0.6" />

      {/* monocoque rising to cockpit */}
      <path
        d="M130 158 Q 170 130 240 116 L 320 110 L 320 138 L 240 142 Q 180 148 130 168 Z"
        fill="url(#f1-body)"
      />
      <path d="M130 158 Q 170 134 240 122 L 320 116 L 320 120 L 240 126 Q 180 132 132 162 Z" fill="url(#f1-body-hi)" opacity="0.55" />

      {/* airbox — engine intake above driver */}
      <path
        d="M380 110 L 408 64 L 460 88 L 470 110 Z"
        fill="url(#f1-body)"
      />
      <path d="M380 110 L 408 68 L 416 70 L 392 110 Z" fill="url(#f1-body-hi)" opacity="0.55" />
      {/* airbox intake hole */}
      <path d="M412 76 L 444 88 L 442 96 L 410 84 Z" fill="#0d0d0f" />

      {/* engine cover slope to rear */}
      <path
        d="M470 110 L 600 142 L 600 152 L 470 134 Z"
        fill="url(#f1-body)"
      />

      {/* cockpit hole */}
      <path d="M260 110 Q 300 100 360 110 L 360 134 L 260 132 Z" fill="#0d0d0f" />

      {/* driver helmet */}
      <g>
        <ellipse cx="312" cy="98" rx="26" ry="22" fill="#0d0d0f" />
        <path d="M286 96 Q 312 78 338 96 L 338 108 L 286 108 Z" fill="#1d1d20" />
        {/* helmet livery stripe */}
        <path d="M286 92 Q 312 86 338 92 L 338 96 L 286 96 Z" fill="#c8252f" />
        {/* visor */}
        <rect x="290" y="93" width="44" height="9" rx="2" fill="#1a3a5a" />
        <rect x="291" y="94" width="44" height="3" rx="1" fill="rgba(255,255,255,0.25)" />
      </g>

      {/* halo — the iconic titanium ring */}
      <path
        d="M250 106 Q 270 60 332 50 Q 396 56 420 108"
        stroke="#0d0d0f"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      {/* halo center pillar */}
      <path d="M340 50 L 340 64" stroke="#0d0d0f" strokeWidth="6" strokeLinecap="round" />
      {/* halo highlight */}
      <path
        d="M256 102 Q 274 64 332 54 Q 392 60 416 104"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* front wing — multi-element */}
      <g>
        <path d="M10 182 L 110 182 L 110 192 L 10 192 Z" fill="#0d0d0f" />
        <path d="M14 174 L 104 174 L 104 180 L 14 180 Z" fill="#1f1f22" />
        <path d="M18 168 L 98 168 L 98 173 L 18 173 Z" fill="#2a2a2e" />
        {/* endplate */}
        <path d="M6 168 L 14 168 L 14 196 L 6 196 Z" fill="#0d0d0f" />
        {/* red accent flick */}
        <path d="M70 168 L 100 168 L 100 172 L 70 172 Z" fill="#c8252f" />
      </g>

      {/* wheels */}
      <g>
        {/* front */}
        <circle cx="160" cy="186" r="38" fill="url(#f1-tyre)" />
        <circle cx="160" cy="186" r="38" fill="none" stroke="#0a0a0c" strokeWidth="1" />
        <circle cx="160" cy="186" r="22" fill="url(#f1-rim)" />
        <circle cx="160" cy="186" r="22" fill="none" stroke="#0d0d0f" strokeWidth="1" />
        {/* spokes */}
        {[0, 60, 120, 180, 240, 300].map((d) => (
          <line
            key={`fs${d}`}
            x1="160"
            y1="186"
            x2="160"
            y2="166"
            stroke="#0d0d0f"
            strokeWidth="2"
            transform={`rotate(${d} 160 186)`}
          />
        ))}
        <circle cx="160" cy="186" r="6" fill="#c8a558" />
        <circle cx="160" cy="186" r="3" fill="#6b4f1a" />
        {/* sidewall sheen */}
        <path d="M132 174 Q 160 162 188 174" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />

        {/* rear (slightly bigger) */}
        <circle cx="560" cy="186" r="42" fill="url(#f1-tyre)" />
        <circle cx="560" cy="186" r="42" fill="none" stroke="#0a0a0c" strokeWidth="1" />
        <circle cx="560" cy="186" r="24" fill="url(#f1-rim)" />
        <circle cx="560" cy="186" r="24" fill="none" stroke="#0d0d0f" strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((d) => (
          <line
            key={`rs${d}`}
            x1="560"
            y1="186"
            x2="560"
            y2="164"
            stroke="#0d0d0f"
            strokeWidth="2"
            transform={`rotate(${d} 560 186)`}
          />
        ))}
        <circle cx="560" cy="186" r="6" fill="#c8a558" />
        <circle cx="560" cy="186" r="3" fill="#6b4f1a" />
        <path d="M530 174 Q 560 160 590 174" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
      </g>

      {/* sponsor / livery accents — generic */}
      <g fill="#f5f3ec">
        <text x="200" y="148" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="800" letterSpacing="0.5">
          63
        </text>
      </g>
      <path d="M158 134 L 240 130 L 240 134 L 158 138 Z" fill="#f5f3ec" opacity="0.85" />
      <path d="M158 138 L 240 134 L 240 136 L 158 140 Z" fill="#0d0d0f" opacity="0.7" />

      {/* T-cam on airbox */}
      <rect x="408" y="58" width="6" height="6" rx="1" fill="#0d0d0f" />
      <circle cx="411" cy="61" r="1.2" fill="#1d3a62" />

      {/* suspension wishbones (subtle) */}
      <path d="M138 178 L 158 184 M 182 184 L 200 178" stroke="#0d0d0f" strokeWidth="1.5" />
      <path d="M540 178 L 558 184 M 582 184 L 600 178" stroke="#0d0d0f" strokeWidth="1.5" />
    </svg>
  );
}
