"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reverbRef = useRef<HTMLHeadingElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const upcycledRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (!video) return;

    const ctx = gsap.context(() => {
      /** Intro (REVERB fade-in) **/
      const introTimeline = gsap.timeline({
        onComplete: () => {
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

      /** Scroll-driven timeline **/
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Zoom sur REVERB
      scrollTimeline.to(
        reverbRef.current,
        {
          scale: 100,
          x: "390%",
          ease: "power1.inOut",
        },
        0
      );

      // Vidéo wrapper (zoom, apparition fluide)
      scrollTimeline.fromTo(
        videoWrapperRef.current,
        {
          opacity: 0,
          scale: 0.1,
        },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.inOut",
          duration: 1.5,
        },
        0
      );

      // Disparition de REVERB
      scrollTimeline.to(
        reverbRef.current,
        { opacity: 0, duration: 0.8, ease: "power2.in" },
        0.1
      );

      // Apparition du titre final
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
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black">
      {/* Conteneur sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video (centrée et fixe) */}
        <div
          ref={videoWrapperRef}
          className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ transformOrigin: "center center" }}
        >
          <video
            ref={videoRef}
            className="max-h-full max-w-full object-fill"
            src="/video/9510023-uhd_4096_2160_25fps.mp4"
            preload="auto"
            muted
            playsInline
            autoPlay
            loop
            style={{
              mixBlendMode: "normal",
              filter: "none",
            }}
          />
        </div>

        {/* REVERB */}
        <h1
          ref={reverbRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-display text-accent uppercase tracking-tight whitespace-nowrap z-30 mix-blend-difference"
          style={{ transformOrigin: "center center" }}
        >
          REVERB
        </h1>

        {/* Titre final */}
        <h2
          ref={upcycledRef}
          className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center text-[5vw] sm:text-[3.5vw] font-display text-accent-chroma uppercase tracking-wide z-40"
        >
          Upcycled Fashion Show
        </h2>
      </div>
    </section>
  );
}
