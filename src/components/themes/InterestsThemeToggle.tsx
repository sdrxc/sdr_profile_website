"use client";

/* ──────────────────────────────────────────────────────────────────────────
   Floating theme toggle — "Paper" / "Mann's"

   A minimal segmented pill, fixed top-right. Adapts its own surface colors
   to whichever theme is currently active so it always reads against the
   backdrop.
   ────────────────────────────────────────────────────────────────────────── */

import { useInterestsTheme } from "./interestsTheme";

export function InterestsThemeToggle() {
  const { theme, setTheme } = useInterestsTheme();
  const isNod = theme === "nod";

  const shellStyle = isNod
    ? {
        background: "rgba(255,250,242,0.7)",
        borderColor: "rgba(26,25,22,0.14)",
        color: "rgba(26,25,22,0.7)",
      }
    : {
        background: "rgba(10,18,28,0.55)",
        borderColor: "rgba(255,255,255,0.16)",
        color: "rgba(255,255,255,0.75)",
      };

  return (
    <div
      role="group"
      aria-label="Interests theme"
      className="fixed right-4 top-20 z-30 inline-flex items-center gap-0.5 rounded-full border p-0.5 text-[10px] uppercase tracking-[0.28em] backdrop-blur-md sm:right-6"
      style={shellStyle}
    >
      <Pill active={isNod} label="Paper" themeKey="nod" setTheme={setTheme} isLightActive={isNod} />
      <Pill active={!isNod} label="Mann's" themeKey="manns" setTheme={setTheme} isLightActive={isNod} />
    </div>
  );
}

function Pill({
  active,
  label,
  themeKey,
  setTheme,
  isLightActive,
}: {
  active: boolean;
  label: string;
  themeKey: "nod" | "manns";
  setTheme: (t: "nod" | "manns") => void;
  isLightActive: boolean;
}) {
  const activeStyle = isLightActive
    ? { background: "#1a1916", color: "#faf4ea" }
    : { background: "#ffffff", color: "#0a0f18" };

  return (
    <button
      type="button"
      onClick={() => setTheme(themeKey)}
      aria-pressed={active}
      className="rounded-full px-3 py-1 font-mono transition-colors"
      style={active ? activeStyle : undefined}
    >
      {label}
    </button>
  );
}
