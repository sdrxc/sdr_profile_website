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
    // ── South India ──
    { city: "Ooty", country: "Tamil Nadu, India", coordinates: [76.695, 11.4102], year: "2018", kind: "favorite", note: "Nilgiri hills & toy train." },
    { city: "Mysore", country: "Karnataka, India", coordinates: [76.6394, 12.2958], year: "2018", note: "Mysore Palace." },
    // ── Uttar Pradesh ──
    { city: "Agra", country: "Uttar Pradesh, India", coordinates: [78.0081, 27.1767], year: "2010", kind: "favorite", note: "The Taj Mahal." },
    { city: "Mathura", country: "Uttar Pradesh, India", coordinates: [77.6737, 27.4924], year: "2010", note: "Krishna's birthplace." },
    { city: "Fatehpur Sikri", country: "Uttar Pradesh, India", coordinates: [77.661, 27.0945], year: "2010", note: "Mughal red-sandstone city." },
    // ── Jammu & Kashmir · Uttarakhand ──
    { city: "Jammu", country: "Jammu & Kashmir, India", coordinates: [74.857, 32.7266], year: "2004", note: "City of Temples." },
    { city: "Vaishno Devi (Katra)", country: "Jammu & Kashmir, India", coordinates: [74.9319, 32.9917], year: "2004", kind: "favorite", note: "Trikuta hills pilgrimage." },
    { city: "Udhampur", country: "Jammu & Kashmir, India", coordinates: [75.1416, 32.9159], year: "2004", note: "Foothills town." },
    { city: "Patnitop", country: "Jammu & Kashmir, India", coordinates: [75.326, 33.083], year: "2004", kind: "favorite", note: "Pine-covered hill station." },
    { city: "Haridwar", country: "Uttarakhand, India", coordinates: [78.1642, 29.9457], year: "2004", note: "Ganga aarti at Har Ki Pauri." },
    // ── Odisha ──
    { city: "Puri", country: "Odisha, India", coordinates: [85.8312, 19.8135], year: "2014", note: "Jagannath Temple & sea." },
    { city: "Konark", country: "Odisha, India", coordinates: [86.0945, 19.8876], year: "2014", kind: "favorite", note: "The Sun Temple." },
    { city: "Chilika Lake", country: "Odisha, India", coordinates: [85.32, 19.71], year: "2014", note: "Asia's largest brackish lagoon." },
    // ── West Bengal ──
    { city: "Sundarbans", country: "West Bengal, India", coordinates: [88.9, 21.9497], year: "2017", kind: "favorite", note: "Mangroves & Royal Bengal tigers." },
    { city: "Mayapur", country: "West Bengal, India", coordinates: [88.388, 23.4248], year: "2017", note: "ISKCON temple town." },
    // ── Sikkim ──
    { city: "Nathula Pass", country: "Sikkim, India", coordinates: [88.8312, 27.3866], year: "2011", kind: "favorite", note: "Indo-China border at 14,140 ft." },
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
