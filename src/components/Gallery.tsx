"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Photo } from "@/data/photographer";

const spanClass: Record<NonNullable<Photo["span"]>, string> = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

export function Gallery({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
              spanClass[photo.span ?? "normal"]
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 p-4 text-left opacity-0 transition-all duration-300 group-hover:opacity-100">
              <p className="text-sm font-semibold text-white">{photo.location}</p>
              <p className="text-xs text-white/60">{photo.year}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <button
              className="absolute right-5 top-5 text-2xl text-white/70 hover:text-white"
              onClick={() => setActive(null)}
            >
              ✕
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 px-3 text-3xl text-white/50 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a! - 1 + photos.length) % photos.length);
              }}
            >
              ‹
            </button>
            <motion.div
              key={active}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={photos[active].src}
                  alt={photos[active].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="font-semibold text-white">{photos[active].location}</p>
                <p className="text-sm text-white/50">
                  {photos[active].alt} · {photos[active].year}
                </p>
              </div>
            </motion.div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 px-3 text-3xl text-white/50 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a! + 1) % photos.length);
              }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
