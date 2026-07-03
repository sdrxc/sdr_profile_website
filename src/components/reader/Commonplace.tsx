"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reader, type Quote, type Verse } from "@/data/reader";

const ACCENT = "#ec4899"; // reader persona accent

type Tab = "all" | "quotes" | "shayari" | "ghazal";

const SCRIPT_FONT = "'Noto Nastaliq Urdu', 'Noto Serif Devanagari', serif";

function QuoteCard({ quote }: { quote: Quote }) {
  const attribution = [quote.author, quote.source].filter(Boolean).join(" · ");
  return (
    <figure
      className="glass rounded-2xl p-7 sm:p-8"
      style={{ borderLeft: `2px solid ${ACCENT}66` }}
    >
      <span
        className="block select-none font-display text-4xl leading-none"
        style={{ color: `${ACCENT}44` }}
        aria-hidden
      >
        &ldquo;
      </span>
      <blockquote className="mt-1 whitespace-pre-line text-lg italic leading-relaxed text-white/85 sm:text-xl">
        {quote.text}
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 text-sm font-medium" style={{ color: ACCENT }}>
          — {attribution}
        </figcaption>
      )}
      {quote.note && <p className="mt-2 text-xs text-white/40">{quote.note}</p>}
    </figure>
  );
}

function VerseCard({ verse }: { verse: Verse }) {
  return (
    <figure
      className="glass rounded-2xl p-7 sm:p-9"
      style={{ borderLeft: `2px solid ${ACCENT}66` }}
    >
      {verse.kind && (
        <span
          className="mb-5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
          style={{ background: `${ACCENT}1a`, color: ACCENT, border: `1px solid ${ACCENT}40` }}
        >
          {verse.kind}
        </span>
      )}
      <blockquote
        className="whitespace-pre-line text-center text-xl leading-loose text-white/90 sm:text-2xl"
        style={{ fontFamily: SCRIPT_FONT }}
      >
        {verse.text}
      </blockquote>
      {verse.translation && (
        <p className="mx-auto mt-6 max-w-prose whitespace-pre-line border-t border-white/10 pt-5 text-center text-sm italic leading-relaxed text-white/45">
          {verse.translation}
        </p>
      )}
      <figcaption className="mt-6 text-center">
        {verse.poet && (
          <span className="text-sm font-medium" style={{ color: ACCENT }}>
            — {verse.poet}
          </span>
        )}
        {verse.note && <p className="mt-2 text-xs text-white/40">{verse.note}</p>}
      </figcaption>
    </figure>
  );
}

type Entry =
  | { type: "quote"; data: Quote }
  | { type: "verse"; data: Verse };

function entryHaystack(e: Entry): string {
  if (e.type === "quote") {
    return [e.data.text, e.data.author, e.data.source, e.data.note]
      .filter(Boolean)
      .join(" ");
  }
  return [e.data.text, e.data.poet, e.data.kind, e.data.translation, e.data.note]
    .filter(Boolean)
    .join(" ");
}

export function Commonplace() {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const shayari = reader.verses.filter((v) => v.kind === "shayari").length;
    const ghazal = reader.verses.filter((v) => v.kind === "ghazal").length;
    return {
      all: reader.quotes.length + reader.verses.length,
      quotes: reader.quotes.length,
      shayari,
      ghazal,
    };
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "quotes", label: "Quotes" },
    { id: "shayari", label: "Shayari" },
    { id: "ghazal", label: "Ghazals" },
  ];

  const entries: Entry[] = useMemo(() => {
    const quotes: Entry[] = reader.quotes.map((q) => ({ type: "quote", data: q }));
    const verses: Entry[] = reader.verses.map((v) => ({ type: "verse", data: v }));

    let list: Entry[];
    switch (tab) {
      case "quotes":
        list = quotes;
        break;
      case "shayari":
        list = reader.verses
          .filter((v) => v.kind === "shayari")
          .map((v) => ({ type: "verse", data: v }));
        break;
      case "ghazal":
        list = reader.verses
          .filter((v) => v.kind === "ghazal")
          .map((v) => ({ type: "verse", data: v }));
        break;
      default:
        list = [...quotes, ...verses];
    }

    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((e) => entryHaystack(e).toLowerCase().includes(q));
  }, [tab, query]);

  return (
    <div>
      {/* search */}
      <div className="relative mb-5 max-w-md">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
          ⌕
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by line, poet, author…"
          aria-label="Search the collection"
          className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/30"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* filter tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              style={
                active
                  ? { background: `${ACCENT}1f`, color: ACCENT, border: `1px solid ${ACCENT}55` }
                  : { color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {t.label}
              <span className="ml-1.5 text-xs opacity-60">{counts[t.id]}</span>
            </button>
          );
        })}
      </div>

      {/* single-column reading feed */}
      <div className="mx-auto mt-8 max-w-2xl space-y-5">
        <AnimatePresence mode="popLayout">
          {entries.map((e, i) => (
            <motion.div
              key={`${e.type}-${e.data.text}`}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.2), ease: [0.22, 1, 0.36, 1] }}
            >
              {e.type === "quote" ? (
                <QuoteCard quote={e.data} />
              ) : (
                <VerseCard verse={e.data} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {entries.length === 0 && (
          <p className="py-12 text-center text-sm text-white/40">
            {query ? `No matches for “${query}”.` : "Nothing here yet."}
          </p>
        )}
      </div>
    </div>
  );
}
