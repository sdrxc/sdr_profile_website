"use client";

/* ──────────────────────────────────────────────────────────────────────────
   Interests page shell — owns theme state and renders the right backdrop,
   conditional space-themed effects, the toggle, the back link, and the
   atlas itself.
   ────────────────────────────────────────────────────────────────────────── */

import Link from "next/link";
import { InterestsAtlas } from "@/components/about/InterestsAtlas";
import { HyperArrival } from "@/components/about/Hyperjump";
import { InterstellarEasterEggs } from "@/components/about/Interstellar";
import { MannsPlanetBackground } from "@/components/themes/MannsPlanetBackground";
import { NodBackground } from "@/components/themes/NodBackground";
import {
  InterestsThemeProvider,
  useInterestsTheme,
} from "@/components/themes/interestsTheme";
import { InterestsThemeToggle } from "@/components/themes/InterestsThemeToggle";

function ShellInner() {
  const { theme } = useInterestsTheme();
  const isNod = theme === "nod";

  const backLinkStyle = isNod
    ? {
        background: "rgba(255,250,242,0.7)",
        borderColor: "rgba(26,25,22,0.14)",
        color: "rgba(26,25,22,0.75)",
      }
    : {
        background: "rgba(10,18,28,0.55)",
        borderColor: "rgba(255,255,255,0.16)",
        color: "rgba(255,255,255,0.75)",
      };

  return (
    <div className={`relative ${isNod ? "interests-nod" : "interests-manns"}`}>
      {isNod ? <NodBackground /> : <MannsPlanetBackground />}

      {/* Space-themed flourishes only fit the Mann's theme */}
      {!isNod && (
        <>
          <InterstellarEasterEggs />
          <HyperArrival />
        </>
      )}

      <Link
        href="/about"
        className="fixed left-4 top-20 z-30 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur-md transition-colors hover:opacity-100 sm:left-6"
        style={backLinkStyle}
      >
        ← About
      </Link>

      <InterestsThemeToggle />

      <InterestsAtlas theme={theme} />
    </div>
  );
}

export function InterestsPageShell() {
  return (
    <InterestsThemeProvider>
      <ShellInner />
    </InterestsThemeProvider>
  );
}
