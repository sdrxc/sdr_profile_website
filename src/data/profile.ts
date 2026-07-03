export const profile = {
  name: "Soumya Deep Roy",
  role: "Multidisciplinary Builder",
  // Short tagline shown under the hero name
  tagline: "Developer · Researcher · Photographer · Cinephile · Listener · Explorer · Reader",
  bio: "A curious mind with too many tabs open.",
  location: "Earth | পৃথিবী | धरती",
  email: "sdrjumme@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/sdrxc" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/soumya-deep-roy" },
    { label: "Instagram", href: "https://www.instagram.com/sdrxc" },
    // { label: "Spotify", href: "https://open.spotify.com/user/sdrxc" },
  ],
};

export type Persona = {
  slug: string;
  title: string;
  blurb: string;
  /** Tailwind gradient stops used for accents on the card + page hero */
  from: string;
  to: string;
  /** Accent hex used for glows */
  accent: string;
  icon: string; // emoji fallback; swap for SVG/lucide if desired
};

export const personas: Persona[] = [
  {
    slug: "coder",
    title: "Developer",
    blurb: "Systems, tools, and the craft of shipping software.",
    from: "from-violet-500",
    to: "to-indigo-500",
    accent: "#8b5cf6",
    icon: "⌘",
  },
  {
    slug: "researcher",
    title: "Researcher",
    blurb: "Questions worth asking and the papers behind them.",
    from: "from-cyan-400",
    to: "to-sky-500",
    accent: "#22d3ee",
    icon: "✦",
  },
  {
    slug: "photographer",
    title: "Photographer",
    blurb: "Light, frames, and the moments in between.",
    from: "from-amber-400",
    to: "to-orange-500",
    accent: "#f59e0b",
    icon: "◎",
  },
  {
    slug: "illustrator",
    title: "Illustrator",
    blurb: "Posters, type, and loud graphic experiments.",
    from: "from-orange-500",
    to: "to-rose-500",
    accent: "#fb6f3d",
    icon: "✺",
  },
  {
    slug: "cinephile",
    title: "Cinephile",
    blurb: "A running canon of films that rearranged me.",
    from: "from-rose-500",
    to: "to-red-500",
    accent: "#f43f5e",
    icon: "▶",
  },
  {
    slug: "listener",
    title: "Listener",
    blurb: "What's spinning right now, straight from Spotify.",
    from: "from-emerald-400",
    to: "to-green-500",
    accent: "#1db954",
    icon: "♫",
  },
  {
    slug: "explorer",
    title: "Explorer",
    blurb: "An animated map of everywhere I've set foot.",
    from: "from-teal-400",
    to: "to-cyan-500",
    accent: "#2dd4bf",
    icon: "✈",
  },
  {
    slug: "reader",
    title: "Reader",
    blurb: "The shelf — finished, current, and queued.",
    from: "from-fuchsia-500",
    to: "to-pink-500",
    accent: "#ec4899",
    icon: "❧",
  },
];

export const personaBySlug = (slug: string) =>
  personas.find((p) => p.slug === slug);
