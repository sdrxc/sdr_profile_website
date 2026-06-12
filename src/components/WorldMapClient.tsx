"use client";

import dynamic from "next/dynamic";
import type { Place } from "@/data/explorer";

// react-simple-maps relies on the DOM (d3-zoom), so load it client-only.
const WorldMap = dynamic(
  () => import("@/components/WorldMap").then((m) => m.WorldMap),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-[60vh] w-full place-items-center rounded-3xl border border-white/10 bg-ink-soft/50">
        <div className="flex flex-col items-center gap-3 text-white/40">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-neon-cyan" />
          Loading map…
        </div>
      </div>
    ),
  }
);

export function WorldMapClient({ places }: { places: Place[] }) {
  return <WorldMap places={places} />;
}
