# Profile Site — multi-persona portfolio

An ultra-professional personal site built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**. A cinematic dark landing page leads into seven persona pages, each with its own accent and motion:

Each persona has its **own animated theme** (matrix code-rain, blueprint knowledge-graph, projector beam, equalizer, halftone pop-art, starfield arcs, drifting glyphs) and layered scroll/spring motion.

| Persona | What it shows | Data source |
| --- | --- | --- |
| **Coder** | Stack, selected projects, OSS | `src/data/coder.ts` |
| **Researcher** | Publications + **t-SNE embedding, topic network graph, radar, output bars** | `src/data/researcher.ts` |
| **Photographer** | Masonry gallery + lightbox | `src/data/photographer.ts` |
| **Illustrator** | 3D-tilt poster wall + Behance link | `src/data/illustrator.ts` |
| **Cinephile** | Canon + **mood-map t-SNE, ratings histogram, decade bars, genre bubbles** | `src/data/cinephile.json` |
| **Listener** | **Live** now-playing/top tracks + **mood map, audio-feature radar, genre bubbles, by-hour bars** | Spotify Web API + `src/data/listener.ts` |
| **Explorer** | **Animated world map** of places visited | `src/data/explorer.ts` |
| **Reader** | Currently reading / finished / queue | `src/data/reader.ts` |

### Data visualizations

The Researcher, Cinephile, and Listener pages render hand-built animated SVG charts (no chart library) from `src/components/charts/`:
- **`ScatterPlot`** — t-SNE-style scatter with convex-hull cluster blobs that draw in, hover tooltips, and a clickable cluster legend.
- **`NetworkGraph`** — topic co-occurrence graph; edges draw in, hovering a node lights up its neighbors.
- **`RadarChart`**, **`BarChart`** (vertical/horizontal), **`BubbleCloud`** (phyllotaxis packing).

All chart inputs live in the data files, so you can retune the numbers without touching components. The Cinephile genre bubbles and ratings histogram are *derived automatically* from your `films` array.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

> **Behind a corporate proxy?** `next/font` fetches Google Fonts at build time. If you see
> `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`, prefix the command for local builds only:
> `NODE_TLS_REJECT_UNAUTHORIZED=0 npm run build` (PowerShell: `$env:NODE_TLS_REJECT_UNAUTHORIZED=0; npm run build`).
> Vercel's build network is not affected.

---

## Making it yours

Everything personal lives in **`src/data/`** — edit these, no component changes needed:

- **`profile.ts`** — your name, role, bio, tagline, socials, and the persona registry (titles, blurbs, accent colors, icons). This drives the nav, footer, landing grid, and every page header.
- **`coder.ts`, `researcher.ts`, `reader.ts`, `explorer.ts`, `photographer.ts`** — typed content for each section.
- **`cinephile.json`** — drop in your own export matching the shape below.

### Cinephile JSON shape

```jsonc
{
  "intro": "string",
  "stats": { "watched": 1240, "thisYear": 87, "favoriteDirector": "..." },
  "films": [
    {
      "title": "string",
      "director": "string",
      "year": 2000,
      "rating": 10,                 // optional, any scale you like
      "poster": "https://...",      // optional image URL (TMDB works well)
      "note": "string",             // optional, shows on hover
      "tags": ["..."]               // optional
    }
  ],
  "watching": [{ "title": "...", "director": "...", "year": 2023 }]
}
```

### Photos

Put images in `public/photos/` and reference them as `/photos/name.jpg` in `photographer.ts`,
or use remote URLs. Set `span` to `"tall"` / `"wide"` / `"normal"` to control the masonry layout.

### Illustrator posters & Behance

Edit `illustrator.ts`: set `behanceUrl` to your profile, and each poster's `href` to its individual Behance project. Put artwork in `public/posters/` (`/posters/name.jpg`) or use remote URLs.

### Explorer map

Add to `explorer.places` in `explorer.ts`. Each place needs `coordinates: [longitude, latitude]`
(note the order). `kind` can be `"home" | "favorite" | "visited"` to change the marker color.
Find coordinates by searching "<city> lat long".

---

## Connecting Spotify (Listener page)

The Listener page calls two server routes (`/api/spotify/now-playing`, `/api/spotify/top-tracks`)
that talk to the Spotify Web API. Until env vars are set, the page renders a friendly
"not connected" notice — so the site works without it.

### 1. Create a Spotify app
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) → **Create app**.
2. Add a Redirect URI: `http://localhost:3000/callback` (any valid URL — used only for the one-time auth).
3. Copy the **Client ID** and **Client Secret**.

### 2. Authorize once to get a refresh token
Open this URL in a browser (replace `CLIENT_ID`):

```
https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-currently-playing user-top-read user-read-recently-played
```

Approve it. You'll be redirected to `http://localhost:3000/callback?code=XXXX`. Copy the `code`.

Exchange the code for a refresh token (run in a terminal; replace the placeholders):

```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=XXXX&redirect_uri=http://localhost:3000/callback&client_id=CLIENT_ID&client_secret=CLIENT_SECRET"
```

The JSON response contains `refresh_token` — that one is long-lived; save it.

### 3. Set environment variables
Copy `.env.local.example` → `.env.local` and fill in:

```
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

Restart `npm run dev` and the Listener page goes live (refreshes every 20s).

---

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel → **Add New Project** → import the repo. Framework auto-detects as **Next.js**.
3. Under **Settings → Environment Variables**, add the three `SPOTIFY_*` vars (Production + Preview).
4. Deploy. That's it — no extra config needed.

> The repo's `.gitignore` already excludes `.env*.local`, so your secrets never get committed.

---

## Project structure

```
src/
  app/
    layout.tsx            # fonts, nav, footer
    page.tsx              # landing (Hero + PersonaGrid)
    {persona}/page.tsx    # one route per persona
    api/spotify/*          # now-playing + top-tracks route handlers
    globals.css
  components/              # Nav, Footer, Hero, PersonaGrid, Gallery, WorldMap, Listener, …
  data/                    # all editable content
  lib/spotify.ts           # Spotify API helper (server-only)
```

## Notes
- Pinned to **Next.js 14.2.35** (latest patched 14.2.x). A couple of low-severity advisories remain
  in Next's bundled transitive deps; they're only fully resolved by Next 16 (a major upgrade). Safe for this use case.
- Respects `prefers-reduced-motion`.
- The world map topology is fetched client-side from `world-atlas` via jsDelivr CDN.
```
