"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Écouter l'événement personnalisé depuis Hero
    const handleShowNavbar = () => setIsVisible(true);
    window.addEventListener("showNavbar", handleShowNavbar);

    return () => window.removeEventListener("showNavbar", handleShowNavbar);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-40 w-full flex justify-between items-center px-6 py-4 text-[var(--color-text)] mix-blend-difference transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <span className="font-[var(--font-title)] text-sm sm:text-base tracking-widest">
        REVERB
      </span>
      <span className="text-sm sm:text-base opacity-80">MENU</span>
    </nav>
  );
}
