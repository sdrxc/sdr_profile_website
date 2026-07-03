import type { Metadata } from "next";
import { PersonaTheme } from "@/components/themes/PersonaTheme";
import { PersonaHero } from "@/components/PersonaHero";
import { Reveal } from "@/components/Reveal";
import { ChartFrame } from "@/components/charts/ChartFrame";
import { ScatterPlot } from "@/components/charts/ScatterPlot";
import { RadarChart } from "@/components/charts/RadarChart";
import { BubbleCloud } from "@/components/charts/BubbleCloud";
import { BarChart } from "@/components/charts/BarChart";
import { SkillGraph } from "@/components/charts/SkillGraph";
import { GitHubBoard } from "@/components/coder/GitHubBoard";
import { EngineeringBlog } from "@/components/coder/EngineeringBlog";
import { personaBySlug } from "@/data/profile";
import { coder } from "@/data/coder";

const persona = personaBySlug("coder")!;
export const metadata: Metadata = { title: persona.title };

export default function CoderPage() {
  // tools counted per top-level category (incl. AWS/Azure sub-groups)
  const toolsPerCategory = coder.stacks.map((s) => ({
    label: s.label === "Frameworks & Tools" ? "Frameworks" : s.label,
    value: (s.items?.length ?? 0) + (s.groups?.reduce((a, g) => a + g.items.length, 0) ?? 0),
  }));

  return (
    <>
      <PersonaTheme slug="coder" />
      <PersonaHero persona={persona} intro={coder.intro} />

      <div className="section-pad !pt-4">
        {/* Stack */}
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-white">Stack</h2>
        </Reveal>
        <div className="mt-6 space-y-4">
          {coder.stacks.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="glass glass-hover rounded-2xl p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  {s.label}
                </p>

                {/* sub-groups (e.g. AWS / Azure) */}
                {s.groups?.map((g) => (
                  <div key={g.name} className="mt-3">
                    <p className="mb-1.5 font-mono text-[11px] font-semibold text-neon-cyan">{g.name}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {g.items.map((it) => (
                        <li key={it} className="chip !px-2.5 !py-0.5 !text-[11px]">{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* flat items */}
                {s.items && s.items.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <li key={it} className="chip !px-2.5 !py-0.5 !text-[11px]">{it}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Stack, visualized ── */}
        <Reveal>
          <div className="mt-20 mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: persona.accent }}>
              the toolbox, quantified
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">Stack, visualized</h2>
          </div>
        </Reveal>

        <ChartFrame title="Skill knowledge graph" subtitle="core → domains → tools · hover a domain" badge="graph">
          <SkillGraph clusters={coder.skillGraph} coreLabel="stack" />
        </ChartFrame>

        <div className="mt-5 grid items-start gap-5 lg:grid-cols-2">
          <ChartFrame title="Skill galaxy" subtitle="t-SNE of the toolset, clustered by domain" badge="t-SNE">
            <ScatterPlot
              points={coder.skillEmbedding}
              clusters={coder.skillGraph.map((c) => ({ id: c.id, label: c.label, color: c.color }))}
            />
          </ChartFrame>

          <ChartFrame title="Proficiency" subtitle="Where the strengths sit" badge="radar">
            <RadarChart axes={coder.radarAxes} series={[{ label: "Proficiency", color: persona.accent, values: coder.radarValues }]} />
          </ChartFrame>

          <ChartFrame title="Breadth by area" subtitle="Number of tools per domain" badge="bubbles">
            <BubbleCloud bubbles={coder.skillCounts} accent={persona.accent} />
          </ChartFrame>

          <ChartFrame title="Tools per category" subtitle="Counted across the stack (AWS/Azure included)" badge="bar">
            <BarChart bars={toolsPerCategory} accent={persona.accent} unit="" horizontal />
          </ChartFrame>
        </div>

        {/* Selected work — experience timeline */}
        <Reveal>
          <div className="mt-20 mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: persona.accent }}>
              what I&apos;ve shipped
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">Selected work</h2>
          </div>
        </Reveal>
        <div className="relative mt-6 space-y-5 pl-6 sm:pl-8">
          {/* vertical timeline rail */}
          <span
            aria-hidden
            className="absolute left-[5px] top-2 bottom-2 w-px sm:left-[7px]"
            style={{ background: `linear-gradient(to bottom, ${persona.accent}66, transparent)` }}
          />
          {coder.experience.map((e, i) => (
            <Reveal key={`${e.company}-${e.role}`} delay={i * 0.06}>
              <div className="relative">
                {/* timeline node */}
                <span
                  aria-hidden
                  className="absolute -left-6 top-7 h-2.5 w-2.5 rounded-full ring-4 ring-black/40 sm:-left-8"
                  style={{ background: persona.accent }}
                />
                <div className="glass glass-hover rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-semibold text-white">{e.role}</h3>
                    <span className="flex items-center gap-2 font-mono text-sm text-white/40">
                      {e.period}
                      {e.current && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                          style={{ background: `${persona.accent}1f`, color: persona.accent }}
                        >
                          Now
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-white/60">
                    <span className="font-medium text-white/75">{e.company}</span>
                    <span className="text-white/30"> · {e.location}</span>
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {e.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2.5 text-[15px] leading-relaxed text-white/65">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: persona.accent }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="chip"
                        style={{ borderColor: `${persona.accent}40`, color: persona.accent }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── GitHub — live profile, KPIs & submissions ── */}
        <Reveal>
          <div id="github" className="mt-20 mb-6 scroll-mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: persona.accent }}>
              the work, in public
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">GitHub</h2>
          </div>
        </Reveal>
        <GitHubBoard accent={persona.accent} />

        {/* ── Engineering Blog ── */}
        <Reveal>
          <div id="engineering-blog" className="mt-20 mb-6 scroll-mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: persona.accent }}>
              writing & teardowns
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">Engineering Blog</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/55">
              Notes, deep-dives and links across GenAI, classical ML, systems and the craft of shipping.
            </p>
          </div>
        </Reveal>
        <EngineeringBlog accent={persona.accent} />
      </div>
    </>
  );
}
