export type Poster = {
  title: string;
  year?: string;
  client?: string;
  tags?: string[];
  // Local files: put in /public/posters and use "/posters/name.jpg". Remote URLs also work.
  image: string;
  href?: string; // link to the individual Behance project, optional
};

export const illustrator = {
  intro:
    "Loud, layered graphic work — gig posters, type experiments, and editorial illustration. The full case studies live on Behance.",
  behanceUrl: "https://www.behance.net/yourhandle",
  tools: ["Procreate", "Illustrator", "Photoshop", "Risograph", "Blender"],
  posters: [
    {
      title: "Neon Districts",
      year: "2025",
      client: "Self-initiated",
      tags: ["poster", "type", "riso"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
      href: "https://www.behance.net/yourhandle",
    },
    {
      title: "Analog Futures",
      year: "2024",
      client: "Synth Fest",
      tags: ["gig poster", "gradient"],
      image: "https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=900&q=80",
      href: "https://www.behance.net/yourhandle",
    },
    {
      title: "Paper Cut Series",
      year: "2024",
      client: "Editorial",
      tags: ["collage", "print"],
      image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=900&q=80",
      href: "https://www.behance.net/yourhandle",
    },
    {
      title: "Type Specimen No.7",
      year: "2023",
      client: "Self-initiated",
      tags: ["type", "experiment"],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80",
      href: "https://www.behance.net/yourhandle",
    },
    {
      title: "Chromatic Aberration",
      year: "2023",
      client: "Gallery show",
      tags: ["abstract", "print"],
      image: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=900&q=80",
      href: "https://www.behance.net/yourhandle",
    },
    {
      title: "Midnight Marquee",
      year: "2022",
      client: "Film club",
      tags: ["poster", "illustration"],
      image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=900&q=80",
      href: "https://www.behance.net/yourhandle",
    },
  ] as Poster[],
};
