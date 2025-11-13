"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const reverbText = useRef<HTMLHeadingElement>(null);
  const titleText = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Intro : apparition REVERB
      gsap.fromTo(
        reverbText.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 2,
          ease: "power2.out",
        }
      );

      // --- Transition REVERB → Upcycled
      gsap.to(reverbText.current, {
        opacity: 0,
        delay: 3,
        duration: 1.5,
        ease: "power2.inOut",
      });

      // --- Apparition Upcycled Fashion Show
      gsap.fromTo(
        titleText.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          delay: 4.5,
          duration: 2,
          ease: "power2.out",
        }
      );

      // --- ScrollTrigger : avance douce de la vidéo (parallaxe)
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom+=300 top",
          scrub: true,
        },
        scale: 1.05,
        y: "-5%",
        ease: "none",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full h-screen overflow-hidden"
    >
      <video
        ref={videoRef}
        src="/videos/model-walk.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[var(--color-text)]">
        <h1
          ref={reverbText}
          className="font-[var(--font-title)] text-5xl sm:text-7xl md:text-8xl text-[var(--color-accent)] tracking-tight"
        >
          REVERB ↓ Scroll down
        </h1>
        <h2
          ref={titleText}
          className="font-[var(--font-title)] text-3xl sm:text-5xl md:text-6xl tracking-wide mt-4"
        >
          UPCYCLED FASHION SHOW
        </h2>
      </div>
    </section>
  );
}
