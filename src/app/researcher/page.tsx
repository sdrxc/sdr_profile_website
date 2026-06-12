import type { Metadata } from "next";
import { PersonaTheme } from "@/components/themes/PersonaTheme";
import { PersonaHero } from "@/components/PersonaHero";
import { Reveal } from "@/components/Reveal";
import { ChartFrame } from "@/components/charts/ChartFrame";
import { ScatterPlot } from "@/components/charts/ScatterPlot";
import { CoAuthorGraph } from "@/components/charts/CoAuthorGraph";
import { RadarChart } from "@/components/charts/RadarChart";
import { BarChart } from "@/components/charts/BarChart";
import { ResearcherBackdrop } from "@/components/charts/ResearcherBackdrop";
import { ResearchLegends } from "@/components/charts/ResearchLegends";
import { personaBySlug } from "@/data/profile";
import { researcher } from "@/data/researcher";

const persona = personaBySlug("researcher")!;
export const metadata: Metadata = { title: persona.title };

export default function ResearcherPage() {
  return (
    <>
      <PersonaTheme slug="researcher" />
      <ResearcherBackdrop />
      <PersonaHero persona={persona} intro={researcher.intro} />

      <div className="section-pad !pt-4">
        {/* Identity / links */}
        <Reveal>
          <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
            <div>
              <p className="font-display text-lg font-semibold text-white">{researcher.affiliation}</p>
              <p className="mt-0.5 font-mono text-xs text-white/40">ORCID {researcher.orcid}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={researcher.scholarUrl} target="_blank" rel="noreferrer" className="btn-ghost !px-4 !py-2 text-xs">
                Google Scholar ↗
              </a>
              <a href={researcher.orcidUrl} target="_blank" rel="noreferrer" className="btn-ghost !px-4 !py-2 text-xs">
                ORCID ↗
              </a>
            </div>
          </div>
        </Reveal>

        {/* Metrics */}
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: "Publications", value: researcher.publications.length },
            ...researcher.metrics,
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <div className="glass rounded-2xl p-5 text-center">
                <p className="font-display text-3xl font-extrabold" style={{ color: persona.accent }}>
                  {m.value}
                </p>
                <p className="mt-1 text-xs text-white/45">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Interests */}
        <Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {researcher.interests.map((it) => (
              <span key={it} className="chip" style={{ borderColor: `${persona.accent}40`, color: persona.accent }}>
                {it}
              </span>
            ))}
          </div>
        </Reveal>

        {/* ── Visualized ── */}
        <Reveal>
          <div className="mt-16 mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: persona.accent }}>
              the field, quantified
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">Research, visualized</h2>
          </div>
        </Reveal>

        <div className="grid items-start gap-5 lg:grid-cols-2">
          <ChartFrame title="My papers, embedded" subtitle="t-SNE of my work, clustered by theme" badge="t-SNE">
            <ScatterPlot points={researcher.embedding} clusters={researcher.embeddingClusters} />
          </ChartFrame>

          <ChartFrame title="Citations over time" subtitle="Per year, via Google Scholar (approx.)" badge="bar">
            <BarChart bars={researcher.citationsByYear} accent={persona.accent} />
          </ChartFrame>

          <ChartFrame title="Area emphasis" subtitle="Where my attention goes" badge="radar">
            <RadarChart axes={researcher.radarAxes} series={[{ label: "Focus", color: persona.accent, values: researcher.radarValues }]} />
          </ChartFrame>

          <ChartFrame
            title="Co-author network"
            subtitle="Real co-authorships, clustered by affiliation · hover a node"
            badge="graph"
          >
            <CoAuthorGraph
              authorLabel="SD Roy"
              coAuthors={researcher.coAuthors}
              clusters={researcher.coAuthorClusters}
              papers={researcher.coAuthorPapers}
            />
          </ChartFrame>
        </div>

        {/* Publications */}
        <Reveal>
          <div className="mt-20 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-white">Publications</h2>
            <a href={researcher.scholarUrl} target="_blank" rel="noreferrer" className="text-sm text-white/45 transition-colors hover:text-white">
              All on Scholar ↗
            </a>
          </div>
        </Reveal>
        <div className="mt-6 space-y-4">
          {researcher.publications.map((p, i) => (
            <Reveal key={p.title + i} delay={(i % 4) * 0.05}>
              <a
                href={p.doi ?? researcher.scholarUrl}
                target="_blank"
                rel="noreferrer"
                title={p.doi ? `Open DOI: ${p.doi}` : "View on Google Scholar"}
                className="group glass glass-hover block rounded-2xl p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold leading-snug text-white group-hover:underline">
                    {p.title}
                    <span className="ml-2 inline-block text-white/30 transition-transform group-hover:translate-x-0.5">↗</span>
                  </h3>
                  {p.citedBy > 0 && (
                    <span
                      className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: `${persona.accent}1a`, color: persona.accent }}
                    >
                      {p.citedBy} cites
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-white/45">{p.authors}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-white/35">{p.venue} · {p.year}</span>
                  {"impact" in p && p.impact && (
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                      {p.impact}
                    </span>
                  )}
                  {p.doi && (
                    <span className="font-mono text-[10px] text-white/30">
                      doi:{p.doi.replace("https://doi.org/", "")}
                    </span>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* ── Gratitude — Prof. Ram Sarkar ── */}
        <Reveal>
          <div className="mt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: persona.accent }}>
              gratitude
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">The one who opened the door</h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div
            className="relative mt-6 overflow-hidden rounded-3xl border p-7 sm:p-9"
            style={{
              borderColor: `${persona.accent}40`,
              background: `linear-gradient(135deg, ${persona.accent}14, transparent 60%)`,
              boxShadow: `0 0 50px -20px ${persona.accent}80`,
            }}
          >
            {/* oversized quote mark */}
            <span
              className="pointer-events-none absolute -right-2 -top-8 select-none font-display text-[10rem] leading-none"
              style={{ color: `${persona.accent}1a` }}
              aria-hidden
            >
              ”
            </span>

            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="grid h-12 w-12 place-items-center rounded-full text-xl"
                  style={{ background: `${persona.accent}1a`, border: `1px solid ${persona.accent}40`, color: persona.accent }}
                >
                  🙏
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-white">{researcher.advisor.name}</p>
                  <p className="text-sm text-white/45">{researcher.advisor.role}</p>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-base italic leading-relaxed text-white/70">
                {researcher.advisor.note}
              </p>

              <a
                href={researcher.advisor.scholarUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost mt-6 !px-4 !py-2 text-xs"
              >
                Explore his work on Google Scholar ↗
              </a>
            </div>
          </div>
        </Reveal>

        {/* ── Shoulders of giants (homage) — closing section ── */}
        <Reveal>
          <div className="mt-24">
            <ResearchLegends />
          </div>
        </Reveal>
      </div>
    </>
  );
}
