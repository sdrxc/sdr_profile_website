"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import type { GitHubBoard as Board } from "@/lib/github";

const USERNAME = "sdrxc";

function timeAgo(iso: string | null): string {
  if (!iso) return "—";
  const d = Date.now() - new Date(iso).getTime();
  const days = Math.floor(d / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function yearsSince(iso: string): string {
  const years = (Date.now() - new Date(iso).getTime()) / (365.25 * 86_400_000);
  return years >= 1 ? `${Math.floor(years)}y` : `${Math.round(years * 12)}mo`;
}

function compact(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

/** A coloured language strip — relative share by repo count. */
function LanguageBar({ languages, accent }: { languages: Board["languages"]; accent: string }) {
  const total = languages.reduce((a, l) => a + l.count, 0) || 1;
  const palette = ["#8b5cf6", "#22d3ee", "#f59e0b", "#ec4899", "#a3e635", "#38bdf8", "#fb7185"];
  const top = languages.slice(0, 7);
  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/5">
        {top.map((l, i) => (
          <span
            key={l.name}
            title={`${l.name} · ${l.count}`}
            style={{ width: `${(l.count / total) * 100}%`, background: palette[i % palette.length] }}
          />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {top.map((l, i) => (
          <li key={l.name} className="flex items-center gap-2 text-sm text-white/60">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: palette[i % palette.length] }} />
            {l.name}
            <span className="text-white/30">{l.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Kpi({ label, value, hint, accent }: { label: string; value: string; hint?: string; accent: string }) {
  return (
    <div className="glass glass-hover rounded-2xl p-4 sm:p-5">
      <p className="font-display text-3xl font-bold leading-none" style={{ color: accent }}>
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-white/70">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-white/35">{hint}</p>}
    </div>
  );
}

export function GitHubBoard({ accent }: { accent: string }) {
  const [board, setBoard] = useState<Board | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        if (d?.configured === false) setFailed(true);
        else setBoard(d);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  const accentHex = accent.replace("#", "");

  if (failed) {
    return (
      <div className="glass rounded-3xl p-6">
        <p className="text-white/60">
          Couldn&apos;t reach GitHub right now.{" "}
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="underline" style={{ color: accent }}>
            View the profile directly →
          </a>
        </p>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="space-y-5">
        <div className="glass h-40 animate-pulse rounded-3xl" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass h-24 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const p = board.profile;

  return (
    <div className="space-y-6">
      {/* ── Profile card (the embed) ── */}
      <Reveal>
        <a
          href={p.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="glass glass-hover group block overflow-hidden rounded-3xl p-6 sm:p-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 sm:h-24 sm:w-24"
              style={{ boxShadow: `0 0 40px -10px ${accent}`, ["--tw-ring-color" as string]: `${accent}66` }}
            >
              <Image src={p.avatarUrl} alt={p.login} fill sizes="96px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-display text-2xl font-bold text-white group-hover:underline">
                  {p.name ?? p.login}
                </h3>
                <span className="font-mono text-sm text-white/40">@{p.login}</span>
              </div>
              {p.bio && <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/60">{p.bio}</p>}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/45">
                {p.company && <span>🏢 {p.company}</span>}
                {p.location && <span>📍 {p.location}</span>}
                <span>🗓 Joined {new Date(p.createdAt).getFullYear()}</span>
                <span>· last active {timeAgo(board.lastActiveAt)}</span>
              </div>
            </div>
            <span
              className="hidden shrink-0 items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold sm:inline-flex"
              style={{ border: `1px solid ${accent}55`, color: accent }}
            >
              View on GitHub →
            </span>
          </div>
        </a>
      </Reveal>

      {/* ── KPI board ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Repositories", value: compact(p.publicRepos), accent },
          { label: "Total stars", value: compact(board.totalStars), hint: "across owned repos", accent },
          { label: "Forks", value: compact(board.totalForks), accent },
          { label: "Followers", value: compact(p.followers), hint: `${compact(p.following)} following`, accent },
          { label: "Recent commits", value: compact(board.recentCommits), hint: `${board.recentPushes} pushes`, accent },
          { label: "On GitHub", value: yearsSince(p.createdAt), hint: "and counting", accent },
        ].map((k, i) => (
          <Reveal key={k.label} delay={i * 0.04}>
            <Kpi {...k} />
          </Reveal>
        ))}
      </div>

      {/* ── Contribution heatmap + languages ── */}
      <div className="grid gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="glass rounded-3xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-white">Contribution graph</h3>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
                submissions · 1y
              </span>
            </div>
            {/* ghchart renders the GitHub contribution calendar as an SVG, tinted to the accent */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/${accentHex}/${USERNAME}`}
              alt={`${USERNAME} GitHub contribution graph`}
              className="w-full"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.06}>
          <div className="glass h-full rounded-3xl p-6">
            <h3 className="mb-4 font-display text-lg font-semibold text-white">Top languages</h3>
            {board.languages.length ? (
              <LanguageBar languages={board.languages} accent={accent} />
            ) : (
              <p className="text-sm text-white/40">No language data yet.</p>
            )}
          </div>
        </Reveal>
      </div>

      {/* ── Top repositories ── */}
      {board.topRepos.length > 0 && (
        <div>
          <Reveal>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">Pinned by stars</h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {board.topRepos.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 0.05}>
                <a
                  href={r.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass glass-hover flex h-full flex-col rounded-2xl p-5"
                >
                  <p className="font-mono text-sm font-semibold" style={{ color: accent }}>
                    {r.name}
                  </p>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-white/55 line-clamp-3">
                    {r.description ?? "—"}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-white/45">
                    {r.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                        {r.language}
                      </span>
                    )}
                    <span>★ {compact(r.stars)}</span>
                    <span>⑂ {compact(r.forks)}</span>
                    <span className="ml-auto">{timeAgo(r.pushedAt)}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
