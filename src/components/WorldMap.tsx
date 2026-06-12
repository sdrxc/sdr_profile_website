"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { AnimatePresence, motion } from "framer-motion";
import type { Place } from "@/data/explorer";

// Public world topojson (countries, 110m). Fetched client-side by the lib.
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const colorFor = (kind?: Place["kind"]) =>
  kind === "home" ? "#f59e0b" : kind === "favorite" ? "#ec4899" : "#2dd4bf";

export function WorldMap({ places }: { places: Place[] }) {
  const [hovered, setHovered] = useState<Place | null>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-soft/50">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165 }}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={[10, 20]} zoom={1} minZoom={1} maxZoom={6}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1a1a26"
                  stroke="#2a2a3a"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#22222f", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {places.map((place, i) => {
            const color = colorFor(place.kind);
            return (
              <Marker
                key={place.city}
                coordinates={place.coordinates}
                onMouseEnter={() => setHovered(place)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* animated pulse ring */}
                <motion.circle
                  r={10}
                  fill={color}
                  opacity={0.25}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                />
                <motion.circle
                  r={3.5}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={0.8}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.4 + i * 0.12,
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                  }}
                  style={{ cursor: "pointer" }}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* hover tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-xl border border-white/10 bg-ink/90 px-4 py-2 text-center backdrop-blur-md"
          >
            <p className="font-semibold text-white">
              {hovered.city}
              <span className="text-white/40">, {hovered.country}</span>
            </p>
            {hovered.note && (
              <p className="mt-0.5 max-w-xs text-xs text-white/55">{hovered.note}</p>
            )}
            {hovered.year && (
              <p className="mt-0.5 font-mono text-[10px] text-white/35">{hovered.year}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 text-xs text-white/50">
        {[
          { c: "#f59e0b", l: "Home" },
          { c: "#ec4899", l: "Favorite" },
          { c: "#2dd4bf", l: "Visited" },
        ].map((x) => (
          <span key={x.l} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: x.c }} />
            {x.l}
          </span>
        ))}
      </div>

      <p className="absolute bottom-4 right-4 hidden text-xs text-white/30 sm:block">
        scroll to zoom · drag to pan
      </p>
    </div>
  );
}
