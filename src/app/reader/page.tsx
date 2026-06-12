import type { Metadata } from "next";
import Image from "next/image";
import { PersonaTheme } from "@/components/themes/PersonaTheme";
import { PersonaHero } from "@/components/PersonaHero";
import { Reveal } from "@/components/Reveal";
import { ChartFrame } from "@/components/charts/ChartFrame";
import { BubbleCloud } from "@/components/charts/BubbleCloud";
import { BarChart } from "@/components/charts/BarChart";
import { personaBySlug } from "@/data/profile";
import { reader, genreColors, type Book } from "@/data/reader";

const persona = personaBySlug("reader")!;
export const metadata: Metadata = { title: persona.title };

function Stars({ n = 0 }: { n?: number }) {
  return (
    <span className="text-sm" style={{ color: persona.accent }}>
      {"★".repeat(n)}
      <span className="text-white/15">{"★".repeat(Math.max(0, 5 - n))}</span>
    </span>
  );
}

function GenreChip({ genre }: { genre?: string }) {
  if (!genre) return null;
  const c = genreColors[genre] ?? persona.accent;
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ background: `${c}1a`, color: c, border: `1px solid ${c}40` }}
    >
      {genre}
    </span>
  );
}

function BookRow({ book }: { book: Book }) {
  return (
    <div className="glass glass-hover flex items-center gap-4 rounded-2xl p-4">
      <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md bg-ink-card">
        {book.cover ? (
          <Image src={book.cover} alt={book.title} fill sizes="56px" className="object-cover" />
        ) : (
          <div
            className="h-full w-full"
            style={{ background: `linear-gradient(135deg, ${genreColors[book.genre ?? ""] ?? persona.accent}55, ${persona.accent}11)` }}
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-white">{book.title}</p>
        <p className="truncate text-sm text-white/45">{book.author}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          {typeof book.rating === "number" && <Stars n={book.rating} />}
          <GenreChip genre={book.genre} />
          {book.year && <span className="text-xs text-white/35">{book.year}</span>}
        </div>
        {book.note && <p className="mt-1 truncate text-xs text-white/40">{book.note}</p>}
      </div>
    </div>
  );
}

export default function ReaderPage() {
  // genre distribution across read books (current + finished)
  const read = [...reader.current, ...reader.finished];
  const counts: Record<string, number> = {};
  read.forEach((b) => b.genre && (counts[b.genre] = (counts[b.genre] ?? 0) + 1));
  const genreBubbles = Object.entries(counts)
    .map(([label, value]) => ({ label, value, color: genreColors[label] ?? persona.accent }))
    .sort((a, b) => b.value - a.value);
  const genreBars = genreBubbles.map((g) => ({ label: g.label, value: g.value }));
  const authors = new Set(read.map((b) => b.author)).size;

  const stats = [
    { label: "Books read", value: read.length },
    { label: "Authors", value: authors },
    { label: "Genres", value: genreBubbles.length },
  ];

  return (
    <>
      <PersonaTheme slug="reader" />
      <PersonaHero persona={persona} intro={reader.intro} />

      <div className="section-pad !pt-4 grid gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-white">Currently reading</h2>
          </Reveal>
          <div className="mt-5 space-y-3">
            {reader.current.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <BookRow book={b} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="mt-12 font-display text-2xl font-bold text-white">Up next</h2>
          </Reveal>
          <div className="mt-5 space-y-3">
            {reader.queue.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="glass rounded-xl px-5 py-3">
                  <p className="font-semibold text-white">{b.title}</p>
                  <p className="text-sm text-white/45">{b.author}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-bold text-white">Recently finished</h2>
              <span className="font-mono text-xs text-white/35">{reader.finished.length} books · scroll ↓</span>
            </div>
          </Reveal>
          {/* vertical slider */}
          <Reveal>
            <div className="reader-scroll mt-5 max-h-[560px] space-y-3 overflow-y-auto pr-2">
              {reader.finished.map((b) => (
                <BookRow key={b.title} book={b} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Shelf, by genre ── */}
      <div className="section-pad !pt-4">
        <Reveal>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: persona.accent }}>
              the shelf, quantified
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">Distribution by genre</h2>
          </div>
        </Reveal>

        <div className="mb-6 grid grid-cols-3 gap-4 sm:max-w-md">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <div className="glass rounded-2xl p-5 text-center">
                <p className="font-display text-3xl font-extrabold" style={{ color: persona.accent }}>{s.value}</p>
                <p className="mt-1 text-xs text-white/45">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-2">
          <ChartFrame title="Genre gravity" subtitle="What I gravitate toward" badge="bubbles">
            <BubbleCloud bubbles={genreBubbles} accent={persona.accent} />
          </ChartFrame>
          <ChartFrame title="Books per genre" subtitle="Read so far" badge="bar">
            <BarChart bars={genreBars} accent={persona.accent} horizontal />
          </ChartFrame>
        </div>
      </div>
    </>
  );
}
