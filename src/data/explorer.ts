export type Place = {
  city: string;
  country: string;
  // [longitude, latitude]
  coordinates: [number, number];
  year?: string;
  note?: string;
  // "home" highlights with a different color, "favorite" gets a ring
  kind?: "home" | "favorite" | "visited";
};

export const explorer = {
  intro:
    "In my \"Yeh Jawaani Hai Deewani\" era | सफ़र का ही था मैं सफर का रहा",
  places: [
    // ── India ──
    { city: "Kapurthala", country: "Punjab, India", coordinates: [75.3849, 31.38], year: "2000–2005", note: "Earliest years." },
    { city: "Amritsar", country: "Punjab, India", coordinates: [74.8723, 31.634], year: "2000–2005", note: "The Golden Temple." },
    { city: "Patna", country: "Bihar, India", coordinates: [85.1376, 25.5941], year: "2005–2016", note: "Growing-up years." },
    { city: "Darjeeling", country: "West Bengal, India", coordinates: [88.2627, 27.036], year: "2012", kind: "favorite", note: "Tea, toy train, and Kanchenjunga." },
    { city: "Newtown, Kolkata", country: "West Bengal, India", coordinates: [88.425, 22.58], kind: "home", note: "Base station — home." },
    { city: "Pune", country: "Maharashtra, India", coordinates: [73.8567, 18.5204], year: "Present", kind: "home", note: "Work station · current location." },
    { city: "Gangtok", country: "Sikkim, India", coordinates: [88.6065, 27.3389], year: "2011", kind: "favorite", note: "Himalayan switchbacks." },
    // ── Rajasthan ──
    { city: "Jaipur", country: "Rajasthan, India", coordinates: [75.7873, 26.9124], year: "2013 · 2026", note: "The Pink City." },
    { city: "Jodhpur", country: "Rajasthan, India", coordinates: [73.0243, 26.2389], year: "2013 · 2026", note: "The Blue City." },
    { city: "Jaisalmer", country: "Rajasthan, India", coordinates: [70.9083, 26.9157], year: "2013 · 2026", note: "The Golden City & Thar dunes." },
    { city: "Udaipur", country: "Rajasthan, India", coordinates: [73.6833, 24.5854], year: "2013 · 2026", note: "City of Lakes." },
    // ── Kerala ──
    { city: "Munnar", country: "Kerala, India", coordinates: [77.0595, 10.0889], year: "2026", kind: "favorite", note: "Endless tea hills." },
    { city: "Alleppey", country: "Kerala, India", coordinates: [76.3388, 9.4981], year: "2026", note: "Backwater houseboats." },
    { city: "Kochi", country: "Kerala, India", coordinates: [76.2673, 9.9312], year: "2026", note: "Chinese fishing nets." },
    // ── Meghalaya ──
    { city: "Shillong", country: "Meghalaya, India", coordinates: [91.8933, 25.5788], year: "2025", note: "Scotland of the East." },
    { city: "Dawki", country: "Meghalaya, India", coordinates: [92.0203, 25.186], year: "2025", kind: "favorite", note: "Crystal-clear Umngot river." },
    { city: "Sohra (Cherrapunji)", country: "Meghalaya, India", coordinates: [91.7362, 25.2702], year: "2025", note: "Living root bridges & rain." },
    // ── Thailand ──
    { city: "Bangkok", country: "Thailand", coordinates: [100.5018, 13.7563], year: "2023", note: "Street food until 2am." },
    { city: "Phuket", country: "Thailand", coordinates: [98.3381, 7.8804], year: "2023", kind: "favorite", note: "Andaman beaches." },
    { city: "Pattaya", country: "Thailand", coordinates: [100.877, 12.9236], year: "2023", note: "Coastal nightlife." },
    { city: "Nonthaburi", country: "Thailand", coordinates: [100.514, 13.8591], year: "2023", note: "Riverside calm." },
    // ── Malaysia ──
    { city: "Kuala Lumpur", country: "Malaysia", coordinates: [101.6869, 3.139], year: "2023", note: "Petronas Towers." },
    { city: "Batu Caves", country: "Malaysia", coordinates: [101.684, 3.2379], year: "2023", kind: "favorite", note: "272 rainbow steps." },
    // ── UAE ──
    { city: "Dubai", country: "UAE", coordinates: [55.2708, 25.2048], year: "2024", note: "Skyline & desert." },
    { city: "Abu Dhabi", country: "UAE", coordinates: [54.3773, 24.4539], year: "2024", note: "Sheikh Zayed Mosque." },
    // ── Qatar ──
    { city: "Doha", country: "Qatar", coordinates: [51.531, 25.2854], year: "2024", kind: "favorite", note: "Souq Waqif & the Corniche." },
  ] as Place[],
};
