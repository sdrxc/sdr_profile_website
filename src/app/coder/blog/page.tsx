import type { Metadata } from "next";
import Link from "next/link";
import { PersonaTheme } from "@/components/themes/PersonaTheme";
import { BlogIndex } from "@/components/coder/BlogIndex";
import { personaBySlug } from "@/data/profile";

const persona = personaBySlug("coder")!;
export const metadata: Metadata = {
  title: "Engineering Blog · Developer",
  description: "Notes, deep-dives and links across GenAI, classical ML, systems and the craft of shipping.",
};

export default function BlogIndexPage() {
  return (
    <>
      <PersonaTheme slug="coder" />

      <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-32 sm:px-8">
        <Link
          href="/coder#engineering-blog"
          className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
        >
          ← Back to Developer
        </Link>

        <div className="mb-6 mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: persona.accent }}>
            writing & teardowns
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">Engineering Blog</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/55">
            Notes, deep-dives and links across GenAI, classical ML, systems and the craft of shipping.
            Search, filter by track, or sort the feed below.
          </p>
        </div>

        <BlogIndex accent={persona.accent} />
      </div>
    </>
  );
}
