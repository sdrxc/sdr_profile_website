import { Hero } from "@/components/Hero";
import { PersonaGrid } from "@/components/PersonaGrid";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function HomePage() {
  return (
    <>
      <AnimatedBackground accent="#8b5cf6" />
      <Hero />
      <PersonaGrid />
    </>
  );
}
