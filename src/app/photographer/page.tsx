import type { Metadata } from "next";
import { PersonaTheme } from "@/components/themes/PersonaTheme";
import { PhotographerBackdrop } from "@/components/PhotographerBackdrop";
import { PersonaHero } from "@/components/PersonaHero";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { personaBySlug } from "@/data/profile";
import { photographer } from "@/data/photographer";

const persona = personaBySlug("photographer")!;
export const metadata: Metadata = { title: persona.title };

export default function PhotographerPage() {
  return (
    <>
      <PersonaTheme slug="photographer" />
      <PhotographerBackdrop />
      <PersonaHero persona={persona} intro={photographer.intro} />

      <div className="section-pad !pt-4">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Gear
            </span>
            {photographer.gear.map((g) => (
              <span key={g} className="chip">
                {g}
              </span>
            ))}
          </div>
        </Reveal>

        <Gallery photos={photographer.photos} />

        <p className="mt-8 text-center text-sm text-white/30">
          Click any frame to enlarge · use ‹ › to browse
        </p>
      </div>
    </>
  );
}
