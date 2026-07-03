"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "@/components/coder/BlogCard";
import { blogTracks, allPostsSorted, type BlogPost } from "@/data/blog";

type SortKey = "newest" | "oldest" | "reading" | "title";

const SORTS: { id: SortKey; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "reading", label: "Shortest read" },
  { id: "title", label: "Title A–Z" },
];

function sortPosts(posts: BlogPost[], key: SortKey): BlogPost[] {
  const copy = [...posts];
  switch (key) {
    case "oldest":
      return copy.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    case "reading":
      return copy.sort((a, b) => (a.readingMinutes ?? 99) - (b.readingMinutes ?? 99));
    case "title":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }
}

export function BlogIndex({ accent }: { accent: string }) {
  const all = useMemo(() => allPostsSorted(), []);
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of all) m[p.track] = (m[p.track] ?? 0) + 1;
    return m;
  }, [all]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let r = all;
    if (track !== "all") r = r.filter((p) => p.track === track);
    if (q) {
      r = r.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return sortPosts(r, sort);
  }, [all, query, track, sort]);

  const tabs = [
    { id: "all", label: "All", color: accent, count: all.length },
    ...blogTracks.map((t) => ({ id: t.id, label: t.label, color: t.color, count: counts[t.id] ?? 0 })),
  ];

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, summaries, tags…"
            className="w-full rounded-full border border-white/12 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/30"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-white/12 bg-white/5 py-2 pl-3 pr-7 text-sm text-white/80 outline-none transition-colors focus:border-white/30"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id} className="bg-ink-card text-white">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Track filter */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tabs.map((t) => {
          const on = track === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTrack(t.id)}
              className="rounded-full border px-3 py-1.5 text-[13px] font-medium transition-all duration-300"
              style={{
                borderColor: on ? t.color : "rgba(255,255,255,0.12)",
                background: on ? `${t.color}1f` : "transparent",
                color: on ? t.color : "rgba(255,255,255,0.6)",
              }}
            >
              {t.label}
              <span className="ml-1.5 text-[11px] opacity-60">{t.count}</span>
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="mt-4 text-xs text-white/40">
        {results.length} {results.length === 1 ? "post" : "posts"}
        {track !== "all" && ` in ${blogTracks.find((t) => t.id === track)?.label}`}
        {query && ` matching “${query}”`}
      </p>

      {/* Vertical-scroll results feed */}
      <div className="mt-3 max-h-[64vh] overflow-y-auto rounded-2xl pr-1.5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((post, i) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, delay: (i % 6) * 0.03, ease: [0.22, 1, 0.36, 1] }}
              >
                <BlogCard post={post} accent={accent} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {results.length === 0 && (
          <p className="py-16 text-center text-sm text-white/40">
            No posts match. Try a different track or clear the search.
          </p>
        )}
      </div>
    </div>
  );
}
