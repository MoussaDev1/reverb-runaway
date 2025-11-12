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
    // Forcer le scroll en haut de la page au chargement
    window.scrollTo(0, 0);

    // Bloquer le scroll au chargement
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const video = videoRef.current;
      if (!video) return;

      // Mettre la vidéo en pause (elle avancera avec le scroll)
      video.pause();
      video.currentTime = 0;

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
          onUpdate: (self) => {
            // Avancer la vidéo avec le scroll (commence dès le début)
            if (self.progress > 0 && video.duration) {
              video.currentTime = self.progress * video.duration;
            }
          },
        },
      });

      // Zoom sur REVERB - centré sur le V
      scrollTimeline.to(
        reverbRef.current,
        {
          scale: 100,
          x: "390%", // Position du V dans REVERB
          ease: "power1.inOut",
        },
        0
      );

      // Vidéo : commence PETITE dans le V et grandit avec le zoom
      scrollTimeline.fromTo(
        videoRef.current,
        {
          opacity: 0,
          scale: 0.1, // Très petite au début
          yPercent: "50",
        },
        {
          opacity: 1,
          scale: 5, // Grandit jusqu'à remplir l'écran
          yPercent: 0,
          ease: "power2.inOut",
          duration: 1.5,
        },
        0
      );

      // REVERB disparaît progressivement
      scrollTimeline.to(
        reverbRef.current,
        { opacity: 0, duration: 0.8, ease: "power2.in" },
        0.1
      );

      // Titre apparaît APRÈS avoir bien scrollé
      scrollTimeline.fromTo(
        upcycledRef.current,
        { opacity: 0, yPercent: 50 },
        {
          opacity: 1,
          yPercent: 0,
          ease: "power3.out",
          duration: 1,
        },
        0.8
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
        {/* Video (commence petite AU CENTRE, grandit avec le scroll) */}
        <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="relative w-[20vw] sm:w-[25vw] aspect-9/16 overflow-hidden rounded-xl">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src="/video/walking-women.webm"
              muted
              playsInline
            />
          </div>
        </div>

        {/* REVERB - DEVANT avec mix-blend pour voir la vidéo à travers */}
        <h1
          ref={reverbRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-display text-base-red uppercase tracking-tight whitespace-nowrap z-30 mix-blend-difference"
          style={{ transformOrigin: "center center" }}
        >
          REVERB
        </h1>

        {/* Titre "Upcycled Fashion Show" */}
        <h2
          ref={upcycledRef}
          className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center text-[5vw] sm:text-[3.5vw] font-display text-accent-chroma uppercase tracking-wide opacity-0 z-40"
        >
          Upcycled Fashion Show
        </h2>
      </div>
    </section>
  );
}
