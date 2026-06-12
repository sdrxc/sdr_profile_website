import type { Metadata } from "next";
import { PersonaTheme } from "@/components/themes/PersonaTheme";
import { PersonaHero } from "@/components/PersonaHero";
import { Reveal } from "@/components/Reveal";
import { PosterWall, Marquee } from "@/components/PosterWall";
import { personaBySlug } from "@/data/profile";
import { illustrator } from "@/data/illustrator";

const persona = personaBySlug("illustrator")!;
export const metadata: Metadata = { title: persona.title };

export default function IllustratorPage() {
  return (
    <>
      <PersonaTheme slug="illustrator" />
      <PersonaHero persona={persona} intro={illustrator.intro} />

      <div className="section-pad !pt-4">
        <Reveal>
          <a
            href={illustrator.behanceUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mb-8"
            style={{ backgroundImage: `linear-gradient(90deg, ${persona.accent}, #f43f5e)` }}
          >
            View full portfolio on Behance ↗
          </a>
        </Reveal>
      </div>

      <Marquee items={illustrator.tools} accent={persona.accent} />

      <div className="section-pad !pt-12">
        <PosterWall posters={illustrator.posters} />

        <Reveal>
          <div className="mt-16 rounded-3xl glass p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-white">
              Want the full case studies?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-white/55">
              Process shots, alternate cuts, and print details all live on Behance.
            </p>
            <a
              href={illustrator.behanceUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost mt-6"
            >
              Open Behance ↗
            </a>
          </div>
        </Reveal>
      </div>
    </>
  );
}
