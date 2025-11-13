"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // 2) Bloquer le scroll global
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");

    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useGSAP(
    ({ scope }) => {
      window.scrollTo(0, 0);
      const intro = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("no-scroll");
          document.body.classList.remove("no-scroll");

          ScrollTrigger.refresh(); // obligatoire ici
        },
      });
      /** Intro animation **/
      intro.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
      );

      /** Scroll-driven timeline **/
      gsap
        .timeline({
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "+=200%",
            scrub: true,
            pin: true,
          },
        })
        // Zoom sur REVERB
        .to(
          titleRef.current,
          {
            scale: 100,
            x: "390%",
            ease: "power1.inOut",
          },
          0
        )
        // Disparition de REVERB
        .to(
          titleRef.current,
          { opacity: 1, duration: 0.8, ease: "power2.in" },
          0.2
        );
    },
    { scope: containerRef }
  );

  return (
    <section>
      {/* Conteneur sticky */}
      <div className="hero-container min-h-[200vh] w-full bg-black"></div>
      <div ref={containerRef}>
        {/* REVERB */}
        <h1
          ref={titleRef}
          id="hero-title"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-display text-accent uppercase tracking-tight whitespace-nowrap z-30 mix-blend-difference"
        >
          REVERB
        </h1>
      </div>
    </section>
  );
}
