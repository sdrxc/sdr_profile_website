import type { Metadata } from "next";
import Link from "next/link";
import { AnimeNeonBackground } from "@/components/themes/AnimeNeonBackground";
import { AnimatedName } from "@/components/AnimatedName";
import { Reveal } from "@/components/Reveal";
import { ConcentricCosmos } from "@/components/about/ConcentricCosmos";
import { TaxonomyBranch } from "@/components/about/TaxonomyBranch";
import { JourneyGitTree } from "@/components/about/JourneyGitTree";
import { InterestsWorldview } from "@/components/about/InterestsWorldview";
import { Breathtaking } from "@/components/about/Breathtaking";
import { InterstellarQuotes, MorseStay, InterstellarEasterEggs } from "@/components/about/Interstellar";
import { about } from "@/data/about";

export const metadata: Metadata = { title: "About" };

function NeonHeading({ jp, kicker, title, sub }: { jp: string; kicker: string; title: string; sub?: string }) {
  return (
    <div>
      <p className="flex items-center gap-3">
        <span className="jp neon-pink-text text-2xl leading-none">{jp}</span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">{kicker}</span>
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-white">{title}</h2>
      {sub && <p className="mt-1 text-sm text-white/45">{sub}</p>}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="anime-neon scanlines relative">
      <AnimeNeonBackground />
      <InterstellarEasterEggs />

      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-24 text-center">
        <Reveal>
          <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
            ← Home
          </Link>
        </Reveal>

        <p className="mb-8 jp text-sm tracking-[0.4em] text-white/45">
          <span className="neon-cyan-text">自己紹介</span>
          <span className="mx-3 text-white/25">·</span>
          <span className="font-mono not-italic">Hello</span>
          <span className="mx-3 text-white/25">·</span>
          নমস্কার
        </p>

        <AnimatedName bengali={about.name.bengali} english={about.name.english} />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="jp text-xs text-neon-pink/80">通称</span>
          {about.name.aliases.map((a) => (
            <span
              key={a}
              className="inline-flex items-center justify-center rounded-lg border border-neon-pink/40 bg-neon-pink/10 px-3 py-1 font-mono text-xs font-semibold tracking-wide text-white"
            >
              {a}
            </span>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-md text-base text-white/60">{about.intro}</p>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.4em] text-neon-cyan/70 neon-flicker">
          ▸ system online ◂
        </p>

        {/* Interstellar quote ticker */}
        <InterstellarQuotes />

        <div className="mt-6">
          <MorseStay />
        </div>
      </section>

      <div className="section-pad relative !pt-8">
        {/* Taxonomy + Cosmos — break out wider than the text column */}
        <div className="relative left-1/2 w-screen max-w-[1240px] -translate-x-1/2 px-6 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <Reveal>
              <TaxonomyBranch />
            </Reveal>
            <Reveal delay={0.1}>
              <ConcentricCosmos />
            </Reveal>
          </div>
        </div>

        {/* Journey — git history */}
        <Reveal>
          <div className="mt-24 mb-8">
            <NeonHeading jp="履歴" kicker="git log --graph --all" title="Academia → Career" sub="Academia branched and merged into main; career/zs forked and is the active HEAD." />
          </div>
        </Reveal>

        <JourneyGitTree />

        {/* Interests & Worldview */}
        <div className="mt-24">
          <InterestsWorldview />
        </div>

        {/* Grand finale — for the visitor who made it this far */}
        <Breathtaking />

        {/* hidden hint */}
        <p className="mt-16 text-center font-mono text-[10px] tracking-[0.35em] text-white/15">
          ↑ ↑ ↓ ↓ ← → ← → B A — if you know, you know 🪐
        </p>
      </div>
    </div>
  );
}
