/**
 * Spotify Web API helper (server-side only).
 *
 * Required env vars (set locally in .env.local and on Vercel):
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_CLIENT_SECRET
 *   SPOTIFY_REFRESH_TOKEN
 *
 * See README for how to obtain the refresh token.
 */

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played";

export type Track = {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string | null;
  songUrl: string;
  isPlaying?: boolean;
  progressMs?: number;
  durationMs?: number;
  playedAt?: string;
};

function getCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;
  return { clientId, clientSecret, refreshToken };
}

export function isSpotifyConfigured() {
  return getCredentials() !== null;
}

async function getAccessToken(): Promise<string | null> {
  const creds = getCredentials();
  if (!creds) return null;

  const basic = Buffer.from(
    `${creds.clientId}:${creds.clientSecret}`
  ).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: creds.refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token ?? null;
}

export async function getNowPlaying(): Promise<Track | null> {
  const token = await getAccessToken();
  if (!token) return null;

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  // 204 = nothing playing
  if (res.status === 204 || res.status > 400) return null;

  const data = await res.json();
  if (!data?.item) return null;

  return {
    title: data.item.name,
    artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
    album: data.item.album.name,
    albumImageUrl: data.item.album.images?.[0]?.url ?? null,
    songUrl: data.item.external_urls.spotify,
    isPlaying: data.is_playing,
    progressMs: data.progress_ms,
    durationMs: data.item.duration_ms,
  };
}

export async function getTopTracks(limit = 8): Promise<Track[]> {
  const token = await getAccessToken();
  if (!token) return [];

  const res = await fetch(
    `${TOP_TRACKS_ENDPOINT}?time_range=short_term&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return [];

  const data = await res.json();
  return (data.items ?? []).map(
    (item: {
      name: string;
      artists: { name: string }[];
      album: { name: string; images: { url: string }[] };
      external_urls: { spotify: string };
    }) => ({
      title: item.name,
      artist: item.artists.map((a) => a.name).join(", "),
      album: item.album.name,
      albumImageUrl: item.album.images?.[0]?.url ?? null,
      songUrl: item.external_urls.spotify,
    })
  );
}

export async function getRecentlyPlayed(limit = 8): Promise<Track[]> {
  const token = await getAccessToken();
  if (!token) return [];

  const res = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];

  const data = await res.json();
  return (data.items ?? []).map(
    (entry: {
      track: {
        name: string;
        artists: { name: string }[];
        album: { name: string; images: { url: string }[] };
        external_urls: { spotify: string };
      };
      played_at: string;
    }) => ({
      title: entry.track.name,
      artist: entry.track.artists.map((a) => a.name).join(", "),
      album: entry.track.album.name,
      albumImageUrl: entry.track.album.images?.[0]?.url ?? null,
      songUrl: entry.track.external_urls.spotify,
      playedAt: entry.played_at,
    })
  );
}
