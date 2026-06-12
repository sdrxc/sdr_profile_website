"use client";

/** Faded blueprint-style line-art used behind the Transport (A380) and F1 cards. */

const S = "rgba(190,235,255,0.85)";

export function A380Outline() {
  return (
    <svg viewBox="0 0 620 230" className="h-auto w-full" fill="none" stroke={S} strokeWidth={1.4} strokeLinejoin="round">
      {/* fuselage (thicker, longer) */}
      <path d="M26 108 C12 102 16 82 56 78 L470 78 C528 79 566 90 590 108 L568 114 C528 122 502 124 478 124 L70 126 C40 126 28 116 26 108 Z" />
      {/* nose / cockpit windscreen */}
      <path d="M40 96 L66 88" />
      <path d="M46 100 L58 96" />
      {/* tall swept vertical tail fin */}
      <path d="M472 78 L532 18 L556 21 L552 80" />
      {/* horizontal stabiliser */}
      <path d="M556 100 L614 90 L566 110" />
      {/* main wing — swept back & down */}
      <path d="M250 124 L372 176 L486 176 L338 124 Z" />
      {/* 4 engines under the wing */}
      {[296, 338, 380, 422].map((x) => (
        <rect key={x} x={x} y={150} width={28} height={15} rx={7} />
      ))}
      {/* lower-deck windows */}
      <path d="M74 104 L470 99" strokeDasharray="2 7" />
      {/* upper-deck windows (the A380 double-deck) */}
      <path d="M74 92 L320 88" strokeDasharray="2 7" />
      {/* door hints */}
      {[120, 220, 330, 430].map((x) => (
        <rect key={x} x={x} y={98} width={7} height={14} rx={2} opacity={0.55} />
      ))}
    </svg>
  );
}

export function F1Outline() {
  return (
    <svg viewBox="0 0 600 200" className="h-auto w-full" fill="none" stroke={S} strokeWidth={1.3}>
      {/* floor / reference line */}
      <path d="M40 166 L545 166" strokeDasharray="3 5" opacity={0.5} />
      {/* front wing */}
      <path d="M24 167 L102 167" />
      <path d="M30 157 L94 157" />
      <path d="M24 150 L24 169" />
      <path d="M102 152 L102 169" />
      {/* nose rising into monocoque */}
      <path d="M58 167 Q 70 120 176 114 L246 108" />
      {/* cockpit + halo */}
      <path d="M246 108 Q 260 92 302 92 L350 96" />
      <path d="M252 97 Q 300 66 350 96" />
      {/* airbox intake behind driver */}
      <path d="M350 96 L363 66 L399 101" />
      {/* engine cover sloping to rear */}
      <path d="M399 101 L505 105" />
      {/* rear wing */}
      <path d="M500 90 L562 90" />
      <path d="M556 90 L556 150" />
      <path d="M512 110 L558 110" />
      {/* body lower edge to wheels */}
      <path d="M176 114 L150 150 M340 96 L470 150" opacity={0.5} />
      {/* wheels */}
      <circle cx={125} cy={150} r={46} />
      <circle cx={125} cy={150} r={29} />
      <circle cx={480} cy={150} r={46} />
      <circle cx={480} cy={150} r={29} />
    </svg>
  );
}
