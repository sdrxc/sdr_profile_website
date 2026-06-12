import { NextResponse } from "next/server";
import { getNowPlaying, getRecentlyPlayed, isSpotifyConfigured } from "@/lib/spotify";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!isSpotifyConfigured()) {
    return NextResponse.json({ configured: false, isPlaying: false, track: null });
  }

  const nowPlaying = await getNowPlaying();
  if (nowPlaying) {
    return NextResponse.json({ configured: true, isPlaying: nowPlaying.isPlaying, track: nowPlaying });
  }

  // Fall back to the most recent track when nothing is live.
  const recent = await getRecentlyPlayed(1);
  return NextResponse.json({
    configured: true,
    isPlaying: false,
    track: recent[0] ?? null,
  });
}
