import Link from "next/link";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function NotFound() {
  return (
    <>
      <AnimatedBackground accent="#8b5cf6" />
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-7xl font-extrabold gradient-text-shimmer">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-white">
          This persona doesn&apos;t exist
        </h1>
        <p className="mt-2 max-w-sm text-white/50">
          The page you&apos;re looking for wandered off the map.
        </p>
        <Link href="/" className="btn-primary mt-8">
          ← Back home
        </Link>
      </div>
    </>
  );
}
