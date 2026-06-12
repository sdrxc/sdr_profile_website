export type Book = {
  title: string;
  author: string;
  year?: string;
  rating?: number; // out of 5
  cover?: string;
  note?: string;
  genre?: string;
};

// genre → accent color for the distribution viz
export const genreColors: Record<string, string> = {
  Fantasy: "#a855f7",
  "Literary Fiction": "#ec4899",
  Nonfiction: "#22d3ee",
  "Sci-Fi": "#a3e635",
  Classic: "#f59e0b",
};

export const reader = {
  intro:
    "I read widely and slowly — fiction to rewire how I see, nonfiction to learn how things work. The shelf:",
  current: [
    {
      title: "Project Hail Mary",
      author: "Andy Weir",
      year: "2021",
      genre: "Sci-Fi",
      note: "Hard sci-fi, a lone astronaut, and the best fictional alien friendship.",
    },
  ] as Book[],
  queue: [
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: "1866", genre: "Classic" },
  ] as Book[],
  finished: [
    { title: "Why the Poor Don't Kill Us: The Psychology of Indians", author: "Manu Joseph", year: "2025", genre: "Nonfiction" },
    { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", year: "2011", genre: "Nonfiction" },
    { title: "The White Tiger", author: "Aravind Adiga", year: "2008", genre: "Literary Fiction" },
    { title: "Midnight's Children", author: "Salman Rushdie", year: "1981", genre: "Literary Fiction" },
    { title: "Life of Pi", author: "Yann Martel", year: "2001", genre: "Literary Fiction" },
    { title: "Harry Potter and the Philosopher's Stone", author: "J. K. Rowling", year: "1997", genre: "Fantasy" },
    { title: "Harry Potter and the Chamber of Secrets", author: "J. K. Rowling", year: "1998", genre: "Fantasy" },
    { title: "Harry Potter and the Prisoner of Azkaban", author: "J. K. Rowling", year: "1999", genre: "Fantasy" },
    { title: "Harry Potter and the Goblet of Fire", author: "J. K. Rowling", year: "2000", genre: "Fantasy" },
    { title: "Harry Potter and the Order of the Phoenix", author: "J. K. Rowling", year: "2003", genre: "Fantasy" },
    { title: "Harry Potter and the Half-Blood Prince", author: "J. K. Rowling", year: "2005", genre: "Fantasy" },
    { title: "Harry Potter and the Deathly Hallows", author: "J. K. Rowling", year: "2007", genre: "Fantasy" },
  ] as Book[],
};
