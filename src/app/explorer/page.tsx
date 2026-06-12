import type { Metadata } from "next";
import { PersonaTheme } from "@/components/themes/PersonaTheme";
import { PersonaHero } from "@/components/PersonaHero";
import { Reveal } from "@/components/Reveal";
import { WorldMapClient } from "@/components/WorldMapClient";
import { ExplorerBackdrop } from "@/components/ExplorerBackdrop";
import { ExplorerManifesto, ExplorerTerminal } from "@/components/ExplorerLore";
import { personaBySlug } from "@/data/profile";
import { explorer } from "@/data/explorer";

const persona = personaBySlug("explorer")!;
export const metadata: Metadata = { title: persona.title };

export default function ExplorerPage() {
  // country = the segment after the last comma ("West Bengal, India" → "India")
  const countries = new Set(
    explorer.places.map((p) => p.country.split(",").pop()!.trim())
  ).size;

  return (
    <>
      <PersonaTheme slug="explorer" />
      <ExplorerBackdrop />
      <PersonaHero persona={persona} intro={explorer.intro} />

      <div className="section-pad !pt-4">
        <Reveal y={32}>
          <WorldMapClient places={explorer.places} />
        </Reveal>

        {/* manifesto */}
        <div className="mt-12">
          <ExplorerManifesto />
        </div>

        {/* Timeline of places — KPIs live here now */}
        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="font-display text-2xl font-bold text-white">The itinerary</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                <b className="font-display" style={{ color: persona.accent }}>{explorer.places.length}</b> cities
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                <b className="font-display" style={{ color: persona.accent }}>{countries}</b> countries
              </span>
            </div>
            <span className="font-mono text-xs text-white/35">scroll ↓</span>
          </div>
        </Reveal>
        <div className="reader-scroll mt-6 grid max-h-[600px] gap-3 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-3">
          {explorer.places
            .slice()
            .sort((a, b) => (b.year ?? "").localeCompare(a.year ?? ""))
            .map((p) => (
              <div key={p.city} className="glass glass-hover h-full rounded-2xl p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-white">{p.city}</h3>
                  <span className="shrink-0 font-mono text-xs text-white/40">{p.year}</span>
                </div>
                <p className="text-sm text-white/45">{p.country}</p>
                {p.note && <p className="mt-2 text-sm text-white/55">{p.note}</p>}
              </div>
            ))}
        </div>

        {/* source code of a wanderer */}
        <div className="mt-16">
          <ExplorerTerminal />
        </div>
      </div>
    </>
  );
}
