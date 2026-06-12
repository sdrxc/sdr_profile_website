import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/profile";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.bio,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio,
    type: "website",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Orbitron (cyber display) + DotGothic16 (retro Japanese) for the /about anime-neon theme */}
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=DotGothic16&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <Nav />
        <main className="relative min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
