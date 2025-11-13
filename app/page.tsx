// app/page.tsx
"use client";
import Hero from "@/components/HeroVideo.tsx/HeroScene";

// import Navbar si tu veux l’afficher après le Hero

export default function HomePage() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <Hero />
    </main>
  );
}
