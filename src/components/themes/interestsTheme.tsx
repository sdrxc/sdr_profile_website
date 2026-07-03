"use client";

/* ──────────────────────────────────────────────────────────────────────────
   Interests-page theme state.

   Two themes:
     · "nod"   — warm paper / minimal / single coral accent (default)
     · "manns" — Mann's Planet ice / Interstellar / varied cool accents

   Persisted in localStorage. Components read the active theme via
   `useInterestsTheme()`; palette tokens come from `PALETTES[theme]`.
   ────────────────────────────────────────────────────────────────────────── */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type InterestsTheme = "nod" | "manns";

const STORAGE_KEY = "interests-theme";

type Ctx = {
  theme: InterestsTheme;
  setTheme: (t: InterestsTheme) => void;
  toggle: () => void;
};

const InterestsThemeContext = createContext<Ctx | null>(null);

export function InterestsThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<InterestsTheme>("manns");

  // Hydrate from storage on mount so SSR markup stays consistent.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "nod" || stored === "manns") setThemeState(stored);
    } catch {
      /* noop */
    }
  }, []);

  const setTheme = useCallback((t: InterestsTheme) => {
    setThemeState(t);
    try {
      window.localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* noop */
    }
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: InterestsTheme = prev === "nod" ? "manns" : "nod";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* noop */
      }
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(() => ({ theme, setTheme, toggle }), [theme, setTheme, toggle]);

  return (
    <InterestsThemeContext.Provider value={value}>{children}</InterestsThemeContext.Provider>
  );
}

export function useInterestsTheme(): Ctx {
  const ctx = useContext(InterestsThemeContext);
  if (!ctx) throw new Error("useInterestsTheme must be used inside InterestsThemeProvider");
  return ctx;
}

/* ──────────────────────────────────────────────────────────────────────────
   Palette tokens — used by InterestsAtlas to skin every scene per theme.
   ────────────────────────────────────────────────────────────────────────── */

export type ChapterAccent = {
  text: string;        // chapter label color
  highlight: string;   // headline emphasis word color
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  trail: string;       // svg trail / motion line
};

export type AtlasPalette = {
  ink: string;             // primary text
  inkStrong: string;       // headlines
  inkMuted: string;        // body
  inkSoft: string;         // captions
  inkFaint: string;        // micro labels
  rule: string;            // hairline color
  surface: string;         // glass card bg
  surfaceBorder: string;
  railTrack: string;
  railDotIdle: string;
  railDotActive: string;
  railDotGlow: string;
  progressGradient: string; // CSS gradient string for the top bar
  arrivalLabel: string;     // chapter 00 label color
  arrivalHighlight: string; // "Gargantua" word
  scrollPrompt: string;
  chapters: Record<"rails" | "f1" | "rockets" | "books" | "cats" | "compass", ChapterAccent>;
  isLight: boolean;
};

const CORAL = "#d94d2a";
const CORAL_SOFT = "rgba(217,77,42,0.12)";
const CORAL_BORDER = "rgba(217,77,42,0.4)";
const INK = "#1a1916";

export const PALETTES: Record<InterestsTheme, AtlasPalette> = {
  nod: {
    ink: INK,
    inkStrong: "#0e0d0b",
    inkMuted: "rgba(26,25,22,0.72)",
    inkSoft: "rgba(26,25,22,0.55)",
    inkFaint: "rgba(26,25,22,0.4)",
    rule: "rgba(26,25,22,0.14)",
    surface: "rgba(255,250,242,0.62)",
    surfaceBorder: "rgba(26,25,22,0.1)",
    railTrack: "rgba(26,25,22,0.14)",
    railDotIdle: "rgba(255,250,242,0.7)",
    railDotActive: CORAL,
    railDotGlow: "rgba(217,77,42,0.45)",
    progressGradient: `linear-gradient(90deg, ${CORAL} 0%, ${CORAL} 100%)`,
    arrivalLabel: CORAL,
    arrivalHighlight: CORAL,
    scrollPrompt: "rgba(26,25,22,0.5)",
    chapters: {
      rails:    { text: CORAL, highlight: CORAL, badgeBg: CORAL_SOFT, badgeBorder: CORAL_BORDER, badgeText: CORAL, trail: "rgba(217,77,42,0.45)" },
      f1:       { text: CORAL, highlight: CORAL, badgeBg: CORAL_SOFT, badgeBorder: CORAL_BORDER, badgeText: CORAL, trail: "rgba(217,77,42,0.5)" },
      rockets:  { text: CORAL, highlight: CORAL, badgeBg: CORAL_SOFT, badgeBorder: CORAL_BORDER, badgeText: CORAL, trail: "rgba(217,77,42,0.45)" },
      books:    { text: CORAL, highlight: CORAL, badgeBg: CORAL_SOFT, badgeBorder: CORAL_BORDER, badgeText: CORAL, trail: "rgba(217,77,42,0.45)" },
      cats:     { text: CORAL, highlight: CORAL, badgeBg: CORAL_SOFT, badgeBorder: CORAL_BORDER, badgeText: CORAL, trail: "rgba(217,77,42,0.45)" },
      compass:  { text: CORAL, highlight: CORAL, badgeBg: CORAL_SOFT, badgeBorder: CORAL_BORDER, badgeText: CORAL, trail: "rgba(217,77,42,0.45)" },
    },
    isLight: true,
  },

  manns: {
    ink: "#ffffff",
    inkStrong: "#ffffff",
    inkMuted: "rgba(255,255,255,0.7)",
    inkSoft: "rgba(255,255,255,0.5)",
    inkFaint: "rgba(255,255,255,0.4)",
    rule: "rgba(255,255,255,0.14)",
    surface: "rgba(10,18,28,0.5)",
    surfaceBorder: "rgba(255,255,255,0.1)",
    railTrack: "rgba(255,255,255,0.12)",
    railDotIdle: "rgba(10,18,28,0.6)",
    railDotActive: "#7dd3fc",
    railDotGlow: "rgba(125,211,252,0.5)",
    progressGradient: "linear-gradient(90deg, #22d3ee 0%, #8b5cf6 55%, #ec4899 100%)",
    arrivalLabel: "#7dd3fc",
    arrivalHighlight: "#7dd3fc",
    scrollPrompt: "rgba(255,255,255,0.55)",
    chapters: {
      rails:   { text: "#7dd3fc", highlight: "#7dd3fc", badgeBg: "rgba(34,211,238,0.1)",  badgeBorder: "rgba(34,211,238,0.4)",  badgeText: "#a5f3fc", trail: "rgba(125,211,252,0.6)" },
      f1:      { text: "#fda4af", highlight: "#fda4af", badgeBg: "rgba(244,114,182,0.1)", badgeBorder: "rgba(244,114,182,0.4)", badgeText: "#fda4af", trail: "rgba(253,164,175,0.65)" },
      rockets: { text: "#fcd34d", highlight: "#fcd34d", badgeBg: "rgba(250,204,21,0.1)",  badgeBorder: "rgba(250,204,21,0.4)",  badgeText: "#fde68a", trail: "rgba(252,211,77,0.6)" },
      books:   { text: "#c4b5fd", highlight: "#c4b5fd", badgeBg: "rgba(167,139,250,0.1)", badgeBorder: "rgba(167,139,250,0.4)", badgeText: "#ddd6fe", trail: "rgba(196,181,253,0.6)" },
      cats:    { text: "#fda4af", highlight: "#fda4af", badgeBg: "rgba(244,114,182,0.1)", badgeBorder: "rgba(244,114,182,0.4)", badgeText: "#fda4af", trail: "rgba(253,164,175,0.6)" },
      compass: { text: "#7dd3fc", highlight: "#7dd3fc", badgeBg: "rgba(34,211,238,0.1)",  badgeBorder: "rgba(34,211,238,0.4)",  badgeText: "#a5f3fc", trail: "rgba(125,211,252,0.6)" },
    },
    isLight: false,
  },
};
