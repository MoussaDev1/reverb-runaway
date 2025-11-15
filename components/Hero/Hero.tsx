"use client";

import { useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const maskTextRef = useRef<SVGTextElement | null>(null);
  const maskedVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const maskText = maskTextRef.current;
    const maskedVideo = maskedVideoRef.current;
    if (!section || !maskText || !maskedVideo) return;

    // point de départ
    gsap.set(maskText, {
      scale: 1,
      transformOrigin: "45% 50%", // vise vers la lettre "V" par ex
    });

    gsap.set(maskedVideo, {
      scale: 0.9, // vidéo un peu plus petite que sa taille normale
      transformOrigin: "45% 0%",
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            section.style.setProperty("--progress", self.progress.toFixed(4));
          },
        },
      })
      // 1) Le trou (REVERB) grossit
      .to(maskText, {
        scale: 5, // combien le trou grossit
        ease: "power2.inOut",
      })
      // 2) La vidéo revient à sa taille normale (et pas plus)
      .to(
        maskedVideo,
        {
          scale: 1, // taille normale, jamais > 1
          ease: "power2.out",
        },
        0 // en même temps que le masque
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
      style={{ ["--progress" as unknown as string]: 0 } as CSSProperties}
    >
      {/* MASK SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <mask id="mask-text">
          <rect width="100%" height="100%" fill="black" />
          <text
            ref={maskTextRef}
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="20vw"
            fontWeight="900"
            fill="white"
            className="mask-text-node"
          >
            REVERB
          </text>
        </mask>
      </svg>

      {/* LAYER masqué par le texte */}
      <div
        className="absolute inset-0 z-20"
        style={{ mask: "url(#mask-text)", WebkitMask: "url(#mask-text)" }}
      >
        <video
          ref={maskedVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/9510023-uhd_4096_2160_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
}
