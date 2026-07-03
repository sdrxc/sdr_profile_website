import type { Metadata } from "next";
import Link from "next/link";
import { ArcadeHallBackdrop } from "@/components/games/ArcadeHallBackdrop";
import { Arcade } from "@/components/games/Arcade";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Arcade",
  description:
    "A PS5-style game library — pixel runner, neon tetris, Developer Quest, flag trivia, the seven bridges of Königsberg, and an unbeatable tic-tac-toe.",
};

export default function GamePage() {
  // `pixel-arcade` is kept so individual games still inherit their neon CSS
  // variables (--neon-pink, --neon-cyan, …) and the pixel font.
  return (
    <div className="pixel-arcade relative min-h-screen">
      <ArcadeHallBackdrop />

      <section className="relative flex min-h-screen flex-col items-center px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/65 backdrop-blur-md transition-all hover:border-sky-300/40 hover:bg-sky-400/10 hover:text-white"
          >
            <span aria-hidden>‹</span>
            Profile
          </Link>
        </Reveal>

        <div className="w-full">
          <Arcade />
        </div>
      </section>
    </div>
  );
}
