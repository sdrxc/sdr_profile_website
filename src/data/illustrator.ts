export type Poster = {
  title: string;
  year?: string;
  client?: string;
  tags?: string[];
  image: string;
  href?: string;
};

export const illustrator = {
  intro:
    "Graphic designer and illustrator crafting branding systems, event identities, editorial layouts, posters, and digital experiences. Explore the complete case studies on Behance.",

  behanceUrl: "https://www.behance.net/soumyadeeproy3",

  tools: [
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Adobe InDesign",
    "Figma",
    "Blender",
    "Procreate",
  ],

  posters: [
    {
      title: "JUSC",
      year: "2021",
      client: "Jadavpur University Science Club",
      tags: ["Brand Identity", "Logo", "Social Media", "Print"],
      image: "/posters/jusc.jpg",
      href: "https://www.behance.net/gallery/123720169/JUSC",
    },
    {
      title: "Campus24",
      year: "2021",
      client: "Campus24",
      tags: ["Branding", "UI", "Marketing", "Illustration"],
      image: "/posters/campus24.jpg",
      href: "https://www.behance.net/gallery/123719029/Campus24",
    },
    {
      title: "Srijan 2020",
      year: "2020",
      client: "Jadavpur University",
      tags: ["Festival", "Brand Identity", "Poster", "Print"],
      image: "/posters/srijan2020.jpg",
      href: "https://www.behance.net/gallery/123711495/Srijan-2020",
    },
    {
      title: "IEEE Jadavpur University",
      year: "2020",
      client: "IEEE Student Branch",
      tags: ["Social Media", "Branding", "Event", "Graphic Design"],
      image: "/posters/ieee-ju.jpg",
      href: "https://www.behance.net/gallery/123709843/IEEE-Jadavpur-University",
    },
    {
      title: "Metallix (2019–2020)",
      year: "2020",
      client: "Department of Metallurgical Engineering",
      tags: ["Magazine", "Editorial", "Print", "Layout"],
      image: "/posters/metallix.jpg",
      href: "https://www.behance.net/gallery/123713229/Metallix-(2019-2020)",
    },
    {
      title: "Terrenum",
      year: "2021",
      client: "Hult Prize",
      tags: ["Startup", "Brand Identity", "UI/UX", "Presentation"],
      image: "/posters/terrenum.jpg",
      href: "https://www.behance.net/gallery/123719881/Terrenum",
    },
  ] as Poster[],
};