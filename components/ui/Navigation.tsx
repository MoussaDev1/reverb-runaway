"use client";
import { motion } from "framer-motion";

export default function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-30 flex gap-8 font-body text-base-white/80 uppercase text-sm tracking-wider"
    >
      <a href="#about" className="hover:text-base-red transition-colors">
        About
      </a>
      <a href="#lineup" className="hover:text-base-red transition-colors">
        Line-Up
      </a>
      <a href="#tickets" className="hover:text-base-red transition-colors">
        Tickets
      </a>
      <a href="#contact" className="hover:text-base-red transition-colors">
        Contact
      </a>
    </motion.nav>
  );
}
