export const about = {
  name: {
    english: "Soumya Deep Roy",
    bengali: "সৌম্য দীপ রায়",
    aliases: ["SDR", "Roy SD"],
  },

  // One punchy line — the rest is shown, not told.
  intro: "Bengali by origin, generalist by temperament — a collector of disciplines.",

  // Hero infographic: the headline numbers.
  numbers: [
    { value: 17, suffix: "+", label: "years in school", icon: "🎒" },
    { value: 10, suffix: ".0", label: "Class-10 CGPA", icon: "🏅" },
    { value: 1, suffix: "", label: "honours degree", icon: "🎓" },
    { value: 5, suffix: "", label: "institutions", icon: "🏫" },
    { text: "∞", label: "curiosity", icon: "🚀" },
  ],

  // Geeky biological address (rendered as a branch infographic).
  taxonomy: [
    { rank: "Domain", value: "Eukaryota" },
    { rank: "Kingdom", value: "Animalia" },
    { rank: "Phylum", value: "Chordata" },
    { rank: "Class", value: "Mammalia" },
    { rank: "Order", value: "Primates" },
    { rank: "Family", value: "Hominidae" },
    { rank: "Genus", value: "Homo" },
    { rank: "Species", value: "Homo sapiens (Linnaeus, 1758)" },
    { rank: "Subspecies", value: "Homo sapiens sapiens" },
  ],

  // Cosmic address — rendered as zoom-out concentric rings (center → out).
  cosmos: [
    { label: "Earth", sub: "Planet", icon: "🌍" },
    { label: "Solar System", sub: "System", icon: "☀️" },
    { label: "Orion–Cygnus Spur", sub: "Arm", icon: "🌀" },
    { label: "Milky Way", sub: "Galaxy", icon: "🌌" },
    { label: "Local Group", sub: "Group", icon: "✦" },
    { label: "Laniakea", sub: "Supercluster", icon: "🕸️" },
    { label: "Observable Universe", sub: "Universe", icon: "🌐" },
  ],
  postalCode: "42",

  galactic: {
    distanceFromCenter: "≈ 8.2 kpc from Galactic Center",
    coordinates: "l ≈ 0°  ·  b ≈ 0°",
    coordinatesNote: "(on average — Earth orbits the Sun)",
    velocity: [
      { label: "around the Milky Way", value: 220, max: 400 },
      { label: "relative to the CMB", value: 370, max: 400 },
    ],
  },

  // 🎓 Education as a level map. Concise on the surface; lore on expand.
  education: [
    {
      level: 1,
      icon: "🍼",
      title: "Kindergarten | Jack & Jill Nursery",
      era: "Early Childhood Training Grounds",
      period: "LKG – UKG",
      tagline: "Thought I'd grow up to be the next Sheldon Cooper. Well..",
      stats: ["🖍️ Crayon mastery", "😴 Nap-time survivor", "🦕 Dino expert"],
      lore: [
        "Degree: Professional Crayon Consumer (Foundation Level).",
        "Mastered staying within the coloring lines (occasionally).",
        "Survived nap-time politics; built ABCs, 123s & playground diplomacy.",
        "Peak research interests: dinosaurs, toy cars, and the case of the missing lunchboxes.",
      ],
    },
    {
      level: 2,
      icon: "📚",
      title: "First Grade | Kendriya Vidyalaya, RCF, Kapurthala, Punjab",
      era: "First Contact with Formal Education",
      period: "Year One",
      tagline: "Discovered that homework is a feature, not a bug.",
      stats: ["✏️ Homework unlocked", "✖️ Times tables", "❓ \"useful IRL?\""],
      lore: [
        "Degree: Rookie Student Certification.",
        "Discovered multiplication tables and existential dread around report cards.",
        'Began the lifelong quest of asking, "Will this be useful in real life?"',
      ],
    },
    {
      level: 3,
      icon: "🏆",
      title: "Kendriya Vidyalaya, Kankarbagh, Patna, Bihar",
      era: "The Golden Era",
      period: "Grade 1 – 10",
      tagline: "The best ten years — peak alignment of report card & parents.",
      stats: ["🏅 10.0 CGPA", "💰 ₹5,000 award", "📜 Certificate of Merit", "🎓 CBSE"],
      lore: [
        "Perfect 10 CGPA in Class 10; awarded ₹5,000 by the Dept. of HR, Govt. of India.",
        "Life skills via sports days, annual functions, science exhibitions & timely sick leaves.",
        "Learned more from friends, teachers and adventures than most textbooks.",
        "The last time my report card and my parents' expectations were perfectly aligned.",
      ],
    },
    {
      level: 4,
      icon: "⚛️",
      title: "Senior Secondary | Kendriya Vidyalaya, Saltlake, Kolkata, WB",
      era: "The Dark Ages",
      period: "Grade 11 – 12",
      tagline: "PCM + CS, and the discovery that sleep is a luxury.",
      stats: ["⚛️ PCM + CS", "😵 JEE survivor", "☕ Sleep = luxury"],
      lore: [
        "Stream: Physics, Chemistry, Mathematics & Computer Science.",
        "Survived JEE-era atmospheric pressure; passed Class 12 with PCM & CS.",
        'Learned every Physics problem yields to a pulley, an inclined plane, or "assume negligible air resistance."',
        "Developed advanced skills in pretending to understand Organic Chemistry.",
      ],
    },
    {
      level: 5,
      icon: "🔬",
      title: "B.E. Metallurgical Engg. | Jadavpur University, Kolkata, WB",
      era: "Engineering DLC",
      period: "2018 – 2022",
      tagline: "First Class with Distinction (CR-6) | Still not sure why metallurgy — maybe low WBJEE rank.",
      stats: ["🥇 First Class Distinction", "🔬 UG Researcher", "📅 2018–2022"],
      lore: [
        "Undergraduate Student Researcher; graduated with distinction.",
        "Conducted research, projects, experiments, side quests & harmless academic tomfoolery.",
        "Spent more time learning interesting things than studying for exams.",
        "Transformed caffeine into assignments, reports & occasional scientific output.",
        "Learned metallurgy, programming, research, teamwork & submitting 5 minutes before deadlines.",
      ],
    },
  ],

  // 💼 Career — the branch that forked from academia (ZS).
  career: {
    company: "ZS",
    location: "Pune, India",
    roles: [
      { title: "Software Engineer — AI/ML (Associate)", period: "Jul 2022 – Jun 2024" },
      { title: "Software Engineer II — AI/ML (Associate Consultant)", period: "Jun 2024 – Dec 2024" },
      { title: "Senior AI Engineer", period: "Dec 2024 – Present" },
    ],
  },

  // 🎮 Current Status gauges.
  status: {
    note: "Master's Degree: not unlocked yet.",
    bars: [
      { label: "Education", value: 100, display: "100%" },
      { label: "Career side-quests", value: 60, display: "In progress" },
      { label: "Confusion about life", value: 75, display: "Ongoing" },
      { label: "Curiosity", value: 100, display: "Max" },
      { label: "Student loans", value: 5, display: "Not the final boss" },
    ],
  },
};
