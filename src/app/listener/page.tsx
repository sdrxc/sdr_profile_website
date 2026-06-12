import type { Metadata } from "next";
import { PersonaTheme } from "@/components/themes/PersonaTheme";
import { PersonaHero } from "@/components/PersonaHero";
import { Listener } from "@/components/Listener";
import { Reveal } from "@/components/Reveal";
import { ChartFrame } from "@/components/charts/ChartFrame";
import { RadarChart } from "@/components/charts/RadarChart";
import { ScatterPlot } from "@/components/charts/ScatterPlot";
import { BubbleCloud } from "@/components/charts/BubbleCloud";
import { BarChart } from "@/components/charts/BarChart";
import { personaBySlug } from "@/data/profile";
import { listenerViz } from "@/data/listener";

const persona = personaBySlug("listener")!;
export const metadata: Metadata = { title: persona.title };

export default function ListenerPage() {
  return (
    <>
      <PersonaTheme slug="listener" />
      <PersonaHero
        persona={persona}
        intro="A live window into what I'm listening to — pulled straight from the Spotify API and refreshed every few seconds — plus the shape of my taste in data."
      />
      <div className="section-pad !pt-4">
        <Listener />

        {/* ── Visualized ── */}
        <Reveal>
          <div className="mt-20 mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: persona.accent }}>
              Taste, quantified
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">The sound of me, as data</h2>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          <ChartFrame
            title="Mood map"
            subtitle="Each track by valence × energy, clustered into moods"
            badge="t-SNE"
            className="lg:col-span-2"
          >
            <ScatterPlot points={listenerViz.moodMap} clusters={listenerViz.moodClusters} />
          </ChartFrame>

          <ChartFrame title="Audio fingerprint" subtitle="Average features of my top tracks" badge="radar">
            <RadarChart
              axes={listenerViz.audioAxes}
              series={[{ label: "Profile", color: persona.accent, values: listenerViz.audioValues }]}
            />
          </ChartFrame>

          <ChartFrame title="When I listen" subtitle="Play intensity by hour" badge="bar">
            <BarChart bars={listenerViz.byHour} accent={persona.accent} />
          </ChartFrame>

          <ChartFrame title="Genre gravity" subtitle="Share of plays by genre" badge="bubbles" className="lg:col-span-2">
            <BubbleCloud bubbles={listenerViz.genres} accent={persona.accent} />
          </ChartFrame>
        </div>
      </div>
    </>
  );
}
