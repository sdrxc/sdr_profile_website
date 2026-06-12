/**
 * Static "listening profile" visualizations for the Listener page.
 * These complement the LIVE Spotify now-playing/top-tracks data.
 * Edit freely — or regenerate from your own Spotify audio-features export.
 */
export const listenerViz = {
  // Average audio features of my top tracks (Spotify scales, 0–1).
  audioAxes: ["Energy", "Dance", "Valence", "Acoustic", "Tempo", "Speech"],
  audioValues: [0.72, 0.64, 0.48, 0.35, 0.68, 0.18],

  // Mood map — every dot is a track placed by valence (x) vs energy (y),
  // clustered into listening "moods". This is the t-SNE-style scatter.
  moodClusters: [
    { id: "hype", label: "Hype / high-energy", color: "#1db954" },
    { id: "focus", label: "Focus / instrumental", color: "#22d3ee" },
    { id: "melancholy", label: "Melancholy", color: "#8b5cf6" },
    { id: "warm", label: "Warm / mellow", color: "#f59e0b" },
  ],
  moodMap: [
    { x: 0.82, y: 0.9, cluster: "hype", label: "Track A", meta: "energy 0.90 · valence 0.82" },
    { x: 0.74, y: 0.84, cluster: "hype", label: "Track B", meta: "energy 0.84 · valence 0.74" },
    { x: 0.9, y: 0.78, cluster: "hype", label: "Track C", meta: "energy 0.78 · valence 0.90" },
    { x: 0.68, y: 0.92, cluster: "hype", label: "Track D", meta: "energy 0.92 · valence 0.68" },
    { x: 0.34, y: 0.62, cluster: "focus", label: "Track E", meta: "instrumental" },
    { x: 0.28, y: 0.55, cluster: "focus", label: "Track F", meta: "instrumental" },
    { x: 0.4, y: 0.7, cluster: "focus", label: "Track G", meta: "post-rock" },
    { x: 0.22, y: 0.48, cluster: "focus", label: "Track H", meta: "ambient" },
    { x: 0.2, y: 0.28, cluster: "melancholy", label: "Track I", meta: "low valence" },
    { x: 0.14, y: 0.34, cluster: "melancholy", label: "Track J", meta: "low valence" },
    { x: 0.3, y: 0.2, cluster: "melancholy", label: "Track K", meta: "slowcore" },
    { x: 0.62, y: 0.4, cluster: "warm", label: "Track L", meta: "soul" },
    { x: 0.7, y: 0.46, cluster: "warm", label: "Track M", meta: "neo-soul" },
    { x: 0.58, y: 0.32, cluster: "warm", label: "Track N", meta: "jazz" },
    { x: 0.76, y: 0.5, cluster: "warm", label: "Track O", meta: "funk" },
  ],

  // Top genres by play share.
  genres: [
    { label: "indie", value: 42, color: "#1db954" },
    { label: "electronic", value: 31, color: "#22d3ee" },
    { label: "jazz", value: 24, color: "#f59e0b" },
    { label: "post-rock", value: 19, color: "#8b5cf6" },
    { label: "hip-hop", value: 16, color: "#ec4899" },
    { label: "classical", value: 12, color: "#a3e635" },
    { label: "ambient", value: 9, color: "#2dd4bf" },
  ],

  // Listening intensity by hour of day (0–23) → bar chart.
  byHour: [
    { label: "6a", value: 2 },
    { label: "9a", value: 6 },
    { label: "12p", value: 8 },
    { label: "3p", value: 11 },
    { label: "6p", value: 9 },
    { label: "9p", value: 14 },
    { label: "12a", value: 7 },
  ],
};
