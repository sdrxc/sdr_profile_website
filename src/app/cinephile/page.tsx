import type { Metadata } from "next";
import Image from "next/image";
import { PersonaTheme } from "@/components/themes/PersonaTheme";
import { PersonaHero } from "@/components/PersonaHero";
import { Reveal } from "@/components/Reveal";
import { ChartFrame } from "@/components/charts/ChartFrame";
import { ScatterPlot } from "@/components/charts/ScatterPlot";
import { BarChart } from "@/components/charts/BarChart";
import { BubbleCloud } from "@/components/charts/BubbleCloud";
import { personaBySlug } from "@/data/profile";
import cinephile from "@/data/cinephile.json";

const persona = personaBySlug("cinephile")!;
export const metadata: Metadata = { title: persona.title };

type Film = {
  title: string;
  director: string;
  year: number;
  rating?: number;
  poster?: string;
  note?: string;
  tags?: string[];
};

export default function CinephilePage() {
  const films = cinephile.films as Film[];

  // Derive charts from the film list.
  const genreCounts: Record<string, number> = {};
  films.forEach((f) => f.tags?.forEach((t) => (genreCounts[t] = (genreCounts[t] ?? 0) + 1)));
  const genres = Object.entries(genreCounts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);

  const ratingBuckets = [6, 7, 8, 9, 10].map((r) => ({
    label: `${r}★`,
    value: films.filter((f) => Math.round(f.rating ?? 0) === r).length,
  }));

  return (
    <>
      <PersonaTheme slug="cinephile" />
      <PersonaHero persona={persona} intro={cinephile.intro} />

      <div className="section-pad !pt-4">
        {/* Stats */}
        <Reveal>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Films watched", value: cinephile.stats.watched },
              { label: "This year", value: cinephile.stats.thisYear },
              { label: "Favorite director", value: cinephile.stats.favoriteDirector },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5 text-center">
                <p className="font-display text-2xl font-bold sm:text-3xl" style={{ color: persona.accent }}>
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Visualized ── */}
        <Reveal>
          <div className="mt-16 mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: persona.accent }}>
              Taste, quantified
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">The canon, as data</h2>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          <ChartFrame
            title="Mood map"
            subtitle="Films placed by tone & intensity, clustered by feel"
            badge="t-SNE"
            className="lg:col-span-2"
          >
            <ScatterPlot points={cinephile.moodMap} clusters={cinephile.moodClusters} />
          </ChartFrame>

          <ChartFrame title="Ratings distribution" subtitle="How I score the canon" badge="histogram">
            <BarChart bars={ratingBuckets} accent={persona.accent} />
          </ChartFrame>

          <ChartFrame title="Across the decades" subtitle="When my favorites were made" badge="bar">
            <BarChart bars={cinephile.decades} accent={persona.accent} />
          </ChartFrame>

          <ChartFrame title="Genre gravity" subtitle="What I gravitate toward" badge="bubbles" className="lg:col-span-2">
            <BubbleCloud bubbles={genres} accent={persona.accent} />
          </ChartFrame>
        </div>

        {/* Canon */}
        <Reveal>
          <h2 className="mt-20 font-display text-2xl font-bold text-white">The canon</h2>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {films.map((film, i) => (
            <Reveal key={film.title} delay={(i % 4) * 0.06}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10">
                <div className="relative aspect-[2/3] w-full bg-ink-card">
                  {film.poster ? (
                    <Image
                      src={film.poster}
                      alt={film.title}
                      fill
                      sizes="(max-width:640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-4 text-center text-sm text-white/40">
                      {film.title}
                    </div>
                  )}
                  {typeof film.rating === "number" && (
                    <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-xs font-semibold text-neon-amber backdrop-blur">
                      ★ {film.rating}
                    </span>
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {film.note && <p className="text-xs leading-relaxed text-white/80">{film.note}</p>}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="truncate font-semibold text-white">{film.title}</h3>
                  <p className="truncate text-xs text-white/45">{film.director} · {film.year}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Watching now */}
        {cinephile.watching?.length > 0 && (
          <>
            <Reveal>
              <h2 className="mt-20 font-display text-2xl font-bold text-white">Watching now</h2>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-3">
              {cinephile.watching.map((w, i) => (
                <Reveal key={w.title} delay={i * 0.06}>
                  <div className="glass rounded-xl px-5 py-3">
                    <p className="font-semibold text-white">{w.title}</p>
                    <p className="text-xs text-white/45">{w.director} · {w.year}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
