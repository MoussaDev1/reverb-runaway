"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative h-screen w-full bg-base-black overflow-hidden">
      {/* --- Vidéo de fond --- */}
      <video
        src="/video/walking-women.webm" // ton fichier à placer dans /public/video/
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-contain opacity-90"
      />

      {/* --- Overlay grain --- */}
      <div
        className="pointer-events-none fixed inset-0 z-20 mix-blend-overlay opacity-[0.4] animate-[grainShift_10s_linear_infinite]"
        style={{
          backgroundImage: "url('/textures/grain.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* --- Titre animé --- */}
      <motion.h1
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute bottom-[50%] left-1/2 -translate-x-1/2 font-display text-[10vw] tracking-tight text-base-red uppercase"
      >
        REVERB
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute bottom-[45%] left-1/2 -translate-x-1/2 font-body text-[3vw] tracking-widest text-base-white/70 uppercase"
      >
        EVENT
      </motion.h2>
    </main>
  );
}
