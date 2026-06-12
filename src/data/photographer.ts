// Replace these with your own images. Local files go in /public/photos,
// then reference as "/photos/your-file.jpg". Remote URLs also work.
export type Photo = {
  src: string;
  alt: string;
  location?: string;
  year?: string;
  // span for the masonry grid: "tall" | "wide" | "normal"
  span?: "tall" | "wide" | "normal";
};

export const photographer = {
  intro:
    "Street, landscape, and the quiet in between — shot on a Canon DSLR and whatever's in my pocket. A selection below.",
  gear: ["Canon EOS 200D", "EF-S 18-55mm IS STM", "iPhone 16 Pro", "iPhone 16e"],
  photos: [
    {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
      alt: "Foggy mountain ridge at dawn",
      location: "Dolomites, Italy",
      year: "2025",
      span: "tall",
    },
    {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
      alt: "Lake reflecting forested hills",
      location: "Banff, Canada",
      year: "2024",
      span: "wide",
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
      alt: "Sun breaking over a green valley",
      location: "Faroe Islands",
      year: "2024",
      span: "normal",
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
      alt: "Misty valley between peaks",
      location: "Patagonia",
      year: "2023",
      span: "normal",
    },
    {
      src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=80",
      alt: "Rolling green hills under cloud",
      location: "Scotland",
      year: "2023",
      span: "wide",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
      alt: "Sunlight through tall trees",
      location: "Pacific Northwest, USA",
      year: "2022",
      span: "tall",
    },
  ] as Photo[],
};
