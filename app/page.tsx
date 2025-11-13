// app/page.tsx
"use client";
import BackgroundVideo from "@/components/BackgroundVideo";
import Hero from "@/components/Hero/Hero";
import LandingSection from "@/components/Landing/LandingSection";
import { use } from "react";
// import Navbar si tu veux l’afficher après le Hero

export default function HomePage() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <Hero />
    </main>
  );
}
