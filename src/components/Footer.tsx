import Link from "next/link";
import { profile, personas } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-soft/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold text-white">
            {profile.name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-white/50">{profile.bio}</p>
          <div className="mt-5 flex gap-3">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="chip glass-hover"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Personas
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {personas.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Contact
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 block text-sm text-white/60 transition-colors hover:text-white"
          >
            {profile.email}
          </a>
          <p className="mt-2 text-sm text-white/40">{profile.location}</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-white/30">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js · Deployed on Vercel.
      </div>
    </footer>
  );
}
