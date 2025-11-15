// app/page.tsx
"use client";
import Hero from "@/components/Hero/Hero";

// import Navbar si tu veux l’afficher après le Hero

export default function HomePage() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <Hero />
    </main>
  );
}
