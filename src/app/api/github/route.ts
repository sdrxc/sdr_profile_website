import { NextResponse } from "next/server";
import { getGitHubBoard } from "@/lib/github";

// Cache at the route layer for an hour; the underlying fetches are cached too.
export const revalidate = 3600;

export async function GET() {
  const board = await getGitHubBoard();
  if (!board) {
    return NextResponse.json({ configured: false }, { status: 200 });
  }
  return NextResponse.json(board);
}
