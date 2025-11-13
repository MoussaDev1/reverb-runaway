"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener("showNavbar", handler);
    return () => window.removeEventListener("showNavbar", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-40 w-full px-6 py-4 flex justify-between items-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="font-display tracking-widest text-sm">REVERB</span>
      <span className="opacity-80 text-sm">MENU</span>
    </nav>
  );
}
