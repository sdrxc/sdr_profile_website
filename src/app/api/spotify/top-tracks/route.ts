import { NextResponse } from "next/server";
import { getTopTracks, isSpotifyConfigured } from "@/lib/spotify";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!isSpotifyConfigured()) {
    return NextResponse.json({ configured: false, tracks: [] });
  }
  const tracks = await getTopTracks(10);
  return NextResponse.json({ configured: true, tracks });
}
