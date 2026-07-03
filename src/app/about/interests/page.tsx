import type { Metadata } from "next";
import Link from "next/link";
import { InterestsAtlas } from "@/components/about/interests";
import { HyperArrival } from "@/components/about/Hyperjump";
import { InterstellarEasterEggs } from "@/components/about/Interstellar";
import { MannsPlanetBackground } from "@/components/themes/MannsPlanetBackground";

export const metadata: Metadata = { title: "Interests & Worldview" };

export default function InterestsPage() {
  return (
    <div className="relative">
      <MannsPlanetBackground />
      <InterstellarEasterEggs />
      <HyperArrival />

      <Link
        href="/about"
        className="fixed left-4 top-20 z-30 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur-md transition-colors hover:opacity-100 sm:left-6"
        style={{
          background: "rgba(10,18,28,0.55)",
          borderColor: "rgba(255,255,255,0.16)",
          color: "rgba(255,255,255,0.75)",
        }}
      >
        ← About
      </Link>

      <InterestsAtlas />
    </div>
  );
}
