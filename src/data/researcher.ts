export const researcher = {
  // ── Identity (from Google Scholar) ───────────────────────────────
  affiliation: "Senior AI Engineer · Tech Innovation Lab | ZS Associates",
  scholarUrl: "https://scholar.google.com/citations?user=1AjT4DQAAAAJ&hl=en",
  orcid: "0000-0002-7931-0508",
  orcidUrl: "https://orcid.org/0000-0002-7931-0508",

  // Mentor — the person who opened the door to research.
  advisor: {
    name: "Prof. Ram Sarkar",
    role: "Professor, Computer Science & Engineering · Jadavpur University",
    scholarUrl: "https://scholar.google.co.in/citations?user=bDj0BUEAAAAJ&hl=en",
    note:
      "None of this exists without Prof. Ram Sarkar. He gave me my very first shot at research — the lab, the questions, the late-night debugging, and the patience to let me find my footing. He taught me to think rigorously, write honestly, and stay curious. Almost every paper above carries his fingerprints. Thank you, Sir — for the opportunity and the trust.",
  },

  intro:
    "My research spans deep learning, medical image analysis, ensemble methods, and NLP — work done at Jadavpur University and beyond, now applied as a Senior AI Engineer at ZS.",

  interests: [
    "Deep Learning",
    "Machine Learning",
    "Computational Material Science",
    "Medical Image Analysis",
    "Ensemble Learning",
    "NLP & Document AI",
  ],

  // ── Citation metrics (Google Scholar) ────────────────────────────
  metrics: [
    { label: "Citations", value: 134 },
    { label: "h-index", value: 3 },
    { label: "i10-index", value: 3 },
    { label: "Co-authors", value: 11 },
  ],

  // Citations per year (approx., read from the Scholar histogram).
  citationsByYear: [
    { label: "2021", value: 13 },
    { label: "2022", value: 24 },
    { label: "2023", value: 31 },
    { label: "2024", value: 34 },
    { label: "2025", value: 20 },
    { label: "2026", value: 12 },
  ],

  // ── Publications (real, with DOIs) ───────────────────────────────
  publications: [
    {
      title:
        "Computer aided breast cancer detection using ensembling of texture and statistical image features",
      authors: "SD Roy, S Das, D Kar, F Schwenker, R Sarkar",
      venue: "MDPI Sensors 21 (11), 3628",
      impact: "Sensors · IF 3.5",
      year: "2021",
      citedBy: 63,
      topic: "medical",
      doi: "https://doi.org/10.3390/s21113628",
    },
    {
      title:
        "Computer Based Diagnosis of Some Chronic Diseases: A Medical Journey of the Last Two Decades",
      authors: "S Malakar, SD Roy, S Das, S Sen, JD Velásquez, R Sarkar",
      venue: "Archives of Computational Methods in Engineering 29 (7), 5525–5567",
      impact: "ACME · IF 12.1",
      year: "2022",
      citedBy: 33,
      topic: "medical",
      doi: "https://doi.org/10.1007/s11831-022-09776-x",
    },
    {
      title:
        "Bi-level prediction model for screening COVID-19 patients using chest X-ray images",
      authors: "S Das, SD Roy, S Malakar, JD Velásquez, R Sarkar",
      venue: "Elsevier Big Data Research 25, 100233",
      impact: "Big Data Research · IF 4.2",
      year: "2021",
      citedBy: 33,
      topic: "medical",
      doi: "https://doi.org/10.1016/j.bdr.2021.100233",
    },
    {
      title:
        "Video Indexing System Based on Multimodal Information Extraction Using Combination of ASR and OCR",
      authors: "S Varma, A Pandey, Shivam, S Das, SD Roy",
      venue: "BDA 2021 · Aizu, Japan",
      year: "2021",
      citedBy: 3,
      topic: "nlp",
      doi: "https://doi.org/10.1007/978-3-030-96600-3_14",
    },
    {
      title: "A Rule-Based Expert System for Automated Document Editing",
      authors: "S Varma, S Shivam, SD Roy, B Ray",
      venue: "20th IC2IT · Bangkok, Thailand",
      year: "2024",
      citedBy: 2,
      topic: "nlp",
      doi: "https://doi.org/10.1007/978-3-031-58561-6_9",
    },
    {
      title:
        "Imbalance Rectification Using Venn Diagram-Based Ensemble of Undersampling Methods for Disease Datasets",
      authors: "S Das, SD Roy, S Sen, R Sarkar",
      venue: "CIS 2020 · Delhi, India",
      year: "2020",
      citedBy: 0,
      topic: "ensemble",
      doi: "https://doi.org/10.1007/978-981-33-6981-8_30",
    },
  ],

  // ── t-SNE of my own papers, clustered by theme ───────────────────
  embeddingClusters: [
    { id: "medical", label: "Medical imaging & diagnosis", color: "#22d3ee" },
    { id: "nlp", label: "NLP & document AI", color: "#8b5cf6" },
    { id: "ensemble", label: "Ensemble / imbalance learning", color: "#f59e0b" },
  ],
  embedding: [
    { x: -7.0, y: 4.0, cluster: "medical", label: "Breast cancer detection", meta: "Sensors '21 · 63 cites" },
    { x: -5.5, y: 2.6, cluster: "medical", label: "Chronic disease diagnosis", meta: "ACME '22 · 33 cites" },
    { x: -6.6, y: 3.4, cluster: "medical", label: "COVID-19 chest X-ray", meta: "Big Data Research '21 · 33 cites" },
    { x: 5.4, y: -2.6, cluster: "nlp", label: "Video indexing (ASR+OCR)", meta: "ICBDA '21 · 3 cites" },
    { x: 4.6, y: -3.6, cluster: "nlp", label: "Doc editing expert system", meta: "ICCIT '24 · 2 cites" },
    { x: 5.0, y: -4.1, cluster: "nlp", label: "Rule-based expert system", meta: "2024" },
    { x: -1.2, y: -0.6, cluster: "ensemble", label: "Venn-diagram undersampling", meta: "CIS '20" },
  ],

  // ── Research-area emphasis (radar) ───────────────────────────────
  radarAxes: ["Deep Learning", "ML", "Medical Img", "NLP", "Ensemble", "Comp. Mat."],
  radarValues: [0.9, 0.95, 0.85, 0.6, 0.8, 0.45],

  // ── Co-author knowledge graph ────────────────────────────────────
  coAuthorClusters: [
    { id: "ju", label: "Jadavpur Univ. & India academia", color: "#22d3ee" },
    { id: "intl", label: "International academia", color: "#8b5cf6" },
    { id: "zs", label: "ZS Associates", color: "#f59e0b" },
  ],
  coAuthors: [
    { id: "sarkar", name: "Ram Sarkar", affiliation: "Professor, Jadavpur University", cluster: "ju" },
    { id: "sdas", name: "S. Das", affiliation: "Jadavpur University", cluster: "ju" },
    { id: "malakar", name: "Samir Malakar", affiliation: "Asutosh College, Kolkata", cluster: "ju" },
    { id: "ssen", name: "S. Sen", affiliation: "Jadavpur University", cluster: "ju" },
    { id: "velasquez", name: "Juan D. Velásquez", affiliation: "University of Chile", cluster: "intl" },
    { id: "schwenker", name: "Friedhelm Schwenker", affiliation: "Ulm University", cluster: "intl" },
    { id: "dkar", name: "Devroop Kar", affiliation: "Rochester Inst. of Technology", cluster: "intl" },
    { id: "svarma", name: "S. Varma", affiliation: "ZS Associates", cluster: "zs" },
    { id: "shivam", name: "Shivam", affiliation: "ZS Associates", cluster: "zs" },
    { id: "bray", name: "Biswarup Ray", affiliation: "ZS Associates", cluster: "zs" },
    { id: "apandey", name: "A. Pandey", affiliation: "ZS Associates", cluster: "zs" },
  ],
  // Author-id lists per paper (incl. "sdr") — edges are derived from co-occurrence.
  coAuthorPapers: [
    ["sdr", "sdas", "dkar", "schwenker", "sarkar"],
    ["malakar", "sdr", "sdas", "ssen", "velasquez", "sarkar"],
    ["sdas", "sdr", "malakar", "velasquez", "sarkar"],
    ["svarma", "apandey", "shivam", "sdas", "sdr"],
    ["svarma", "shivam", "sdr", "bray"],
    ["svarma", "shivam", "sdr", "bray"],
    ["sdas", "sdr", "ssen", "sarkar"],
  ],
};
