import type { Metadata } from "next";
import Link from "next/link";
import { PersonaTheme } from "@/components/themes/PersonaTheme";
import { Commonplace } from "@/components/reader/Commonplace";
import { personaBySlug } from "@/data/profile";

const persona = personaBySlug("reader")!;
export const metadata: Metadata = { title: `Commonplace Book · ${persona.title}` };

export default function CommonplacePage() {
  return (
    <>
      <PersonaTheme slug="reader" />

      <div className="section-pad pt-32">
        <Link
          href="/reader"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
        >
          ← Reader
        </Link>

        <p
          className="text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: persona.accent }}
        >
          शायरी · غزل · quotes
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Coffee House
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
          A growing collection of lines I keep — favourite quotes, and the shayari &amp;
          ghazals (Hindi &amp; Urdu) I come back to.
        </p>

        <div className="mt-10">
          <Commonplace />
        </div>
      </div>
    </>
  );
}
