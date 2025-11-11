"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reverbRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const upcycledRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    // Bloquer le scroll au chargement
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      // Phase 1 : Apparition de REVERB (bloque le scroll)
      const introTimeline = gsap.timeline({
        onComplete: () => {
          // Débloquer le scroll et afficher la navbar
          document.body.style.overflow = "";
          window.dispatchEvent(new Event("showNavbar"));
        },
      });

      introTimeline.fromTo(
        reverbRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5,
        }
      );

      // Phase 2 : Timeline au scroll
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Zoom sur REVERB (RESTE CENTRÉ avec transform-origin)
      scrollTimeline.to(
        reverbRef.current,
        {
          scale: 20,
          ease: "power1.inOut",
        },
        0
      );

      // Vidéo apparaît et "avance" vers nous (scale + opacity)
      scrollTimeline.fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.3 },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          duration: 0.4,
        },
        0.1
      );

      // REVERB disparaît progressivement
      scrollTimeline.to(
        reverbRef.current,
        { opacity: 0, ease: "power2.in", duration: 0.3 },
        0.3
      );

      // Titre apparaît APRÈS avoir bien scrollé
      scrollTimeline.fromTo(
        upcycledRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.3,
        },
        0.7
      );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-black">
      {/* Conteneur sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* REVERB - RESTE CENTRÉ */}
        <h1
          ref={reverbRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-display text-base-red uppercase tracking-tight whitespace-nowrap z-30"
          style={{ transformOrigin: "center center" }}
        >
          REVERB
        </h1>

        {/* Video (apparaît en s'approchant) - CENTRÉE */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-0"
            src="/video/walking-women.webm"
            autoPlay
            loop
            muted
            playsInline
            style={{ transformOrigin: "center center" }}
          />
        </div>

        {/* Titre "Upcycled Fashion Show" */}
        <h2
          ref={upcycledRef}
          className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center text-[5vw] sm:text-[3.5vw] font-display text-accent-chroma uppercase tracking-wide opacity-0 z-20"
        >
          Upcycled Fashion Show
        </h2>
      </div>
    </section>
  );
}
