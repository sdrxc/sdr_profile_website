"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { personas } from "@/data/profile";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-white"
        >
          <span className="gradient-text-shimmer">◆</span>{" "}
          <span className="hidden sm:inline">sdrxc</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/about"
            className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
              pathname === "/about" ? "text-white" : "text-white/55 hover:text-white"
            }`}
          >
            {pathname === "/about" && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 -z-10 rounded-full bg-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            About
          </Link>
          {personas.map((p) => {
            const active = pathname === `/${p.slug}`;
            return (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {p.title}
              </Link>
            );
          })}
          <Link
            href="/game"
            className={`relative ml-1 rounded-full border px-3.5 py-1.5 text-sm transition-all ${
              pathname === "/game"
                ? "border-fuchsia-400/60 text-white"
                : "border-fuchsia-400/30 text-fuchsia-300/90 hover:border-fuchsia-400/60 hover:text-white"
            }`}
          >
            ▸ Arcade
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="grid grid-cols-2 gap-2 p-4">
              <Link
                href="/about"
                className="col-span-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80"
              >
                <span className="mr-2 text-neon-violet">◆</span>
                About me
              </Link>
              {personas.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80"
                >
                  <span className="mr-2" style={{ color: p.accent }}>
                    {p.icon}
                  </span>
                  {p.title}
                </Link>
              ))}
              <Link
                href="/game"
                className="col-span-2 rounded-xl border border-fuchsia-400/40 px-4 py-3 text-sm text-fuchsia-200"
              >
                <span className="mr-2">▸</span>
                Arcade — play a game
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
