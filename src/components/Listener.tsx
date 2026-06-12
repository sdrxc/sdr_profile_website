"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

type Track = {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string | null;
  songUrl: string;
  isPlaying?: boolean;
  progressMs?: number;
  durationMs?: number;
  playedAt?: string;
};

const SPOTIFY_GREEN = "#1db954";

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <div className="flex h-5 items-end gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full"
          style={{ background: SPOTIFY_GREEN }}
          animate={
            playing
              ? { height: ["30%", "100%", "45%", "80%", "30%"] }
              : { height: "30%" }
          }
          transition={{
            duration: 0.9,
            repeat: playing ? Infinity : 0,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function NowPlayingCard({
  track,
  isPlaying,
}: {
  track: Track | null;
  isPlaying: boolean;
}) {
  const pct =
    track?.progressMs && track?.durationMs
      ? Math.min(100, (track.progressMs / track.durationMs) * 100)
      : 0;

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
      {/* ambient album glow */}
      {track?.albumImageUrl && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 blur-3xl">
          <Image src={track.albumImageUrl} alt="" fill className="object-cover" />
        </div>
      )}

      <div className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: SPOTIFY_GREEN }}>
        <Equalizer playing={isPlaying} />
        {isPlaying ? "Now playing" : "Last played"}
      </div>

      {track ? (
        <a
          href={track.songUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-5"
        >
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:h-28 sm:w-28">
            {track.albumImageUrl ? (
              <Image
                src={track.albumImageUrl}
                alt={track.album}
                fill
                sizes="112px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-ink-card" />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xl font-bold text-white group-hover:underline">
              {track.title}
            </p>
            <p className="truncate text-white/60">{track.artist}</p>
            <p className="truncate text-sm text-white/35">{track.album}</p>
          </div>
        </a>
      ) : (
        <p className="text-white/50">Nothing playing right now.</p>
      )}

      {isPlaying && pct > 0 && (
        <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: SPOTIFY_GREEN }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
}

function SetupNotice() {
  return (
    <div className="glass rounded-3xl border-amber-500/20 p-6 sm:p-8">
      <p className="font-semibold text-neon-amber">Spotify not connected yet</p>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        Add your <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">SPOTIFY_CLIENT_ID</code>,{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">SPOTIFY_CLIENT_SECRET</code>, and{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">SPOTIFY_REFRESH_TOKEN</code>{" "}
        to your environment (locally in <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">.env.local</code>, and in the Vercel dashboard).
        The full walkthrough is in the project README. Until then this page shows placeholder state.
      </p>
    </div>
  );
}

export function Listener() {
  const [now, setNow] = useState<{ configured: boolean; isPlaying: boolean; track: Track | null } | null>(null);
  const [top, setTop] = useState<{ configured: boolean; tracks: Track[] } | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const [n, t] = await Promise.all([
          fetch("/api/spotify/now-playing").then((r) => r.json()),
          fetch("/api/spotify/top-tracks").then((r) => r.json()),
        ]);
        if (!alive) return;
        setNow(n);
        setTop(t);
      } catch {
        /* ignore transient errors */
      }
    };
    load();
    const id = setInterval(load, 20000); // refresh every 20s
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const configured = now?.configured ?? true;

  return (
    <div className="space-y-12">
      <Reveal>
        {now === null ? (
          <div className="glass h-44 animate-pulse rounded-3xl" />
        ) : configured ? (
          <NowPlayingCard track={now.track} isPlaying={now.isPlaying} />
        ) : (
          <SetupNotice />
        )}
      </Reveal>

      <div>
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-white">
            On heavy rotation
          </h2>
          <p className="mt-1 text-sm text-white/40">My top tracks this month</p>
        </Reveal>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {top === null
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass h-20 animate-pulse rounded-2xl" />
              ))
            : top.tracks.length === 0
            ? <p className="text-white/40">Top tracks will appear once Spotify is connected.</p>
            : top.tracks.map((track, i) => (
                <Reveal key={track.songUrl + i} delay={(i % 2) * 0.05}>
                  <a
                    href={track.songUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass glass-hover group flex items-center gap-4 rounded-2xl p-3"
                  >
                    <span className="w-5 text-center font-mono text-sm text-white/30">
                      {i + 1}
                    </span>
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                      {track.albumImageUrl ? (
                        <Image src={track.albumImageUrl} alt={track.album} fill sizes="48px" className="object-cover" />
                      ) : (
                        <div className="h-full w-full bg-ink-card" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white group-hover:underline">
                        {track.title}
                      </p>
                      <p className="truncate text-sm text-white/45">{track.artist}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
        </div>
      </div>
    </div>
  );
}
