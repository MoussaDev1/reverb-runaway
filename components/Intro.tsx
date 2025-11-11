"use client";
import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animation au scroll : zoom out + fade
      gsap.to(".intro-bg", {
        scale: 1.2,
        opacity: 0,
        scrollTrigger: {
          trigger: ".intro",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="intro relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image ou fond */}
      <img
        className="intro-bg absolute inset-0 w-full h-full object-cover"
        src="/public/video/glow-effect-bw.jpg"
        alt="Background intro"
      />

      {/* Texte d’intro (Framer Motion) */}
      <motion.h1
        className="relative z-10 text-6xl font-bold text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Mode Studio
      </motion.h1>
    </section>
  );
}
