import type { Metadata } from "next";
import Link from "next/link";
import { AnimeNeonBackground } from "@/components/themes/AnimeNeonBackground";
import { PixelGame } from "@/components/PixelGame";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Arcade",
  description: "Bored of the profile? Play Pixel Dash.",
};

export default function GamePage() {
  return (
    <div className="anime-neon scanlines relative min-h-screen">
      <AnimeNeonBackground />

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-28">
        <Reveal>
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
            ← Back to profile
          </Link>
        </Reveal>

        <Reveal>
          <p className="mb-3 text-center">
            <span className="jp neon-pink-text text-xl">休憩</span>
            <span className="ml-3 font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">insert coin</span>
          </p>
          <h1 className="text-center font-display text-4xl font-extrabold uppercase tracking-tight neon-title sm:text-6xl">
            Pixel Dash
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-white/55">
            Bored of the profile? No worries. Outrun the neon spikes, grab the stars,
            and see how far you get before it&apos;s game over.
          </p>
        </Reveal>

        <div className="mt-10 w-full">
          <PixelGame />
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <p className="text-sm text-white/55">
              Done playing? The person who built this is worth a look too.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Link href="/" className="btn-primary !bg-gradient-to-r !from-fuchsia-500 !to-cyan-400">
                ▸ Explore the profile
              </Link>
              <Link href="/about" className="btn-ghost">
                Meet the human →
              </Link>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-white/25">
              a tiny gift for the curious · built in canvas
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
