import type { Metadata } from "next";
import { InterestsPageShell } from "@/components/about/InterestsPageShell";

export const metadata: Metadata = { title: "Interests & Worldview" };

export default function InterestsPage() {
  return <InterestsPageShell />;
}
