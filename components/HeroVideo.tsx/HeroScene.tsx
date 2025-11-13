"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import IntroTitle from "./IntroTitle";
import HeroVideo from "./HeroVideo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null!);
  const titleRef = useRef<HTMLHeadingElement>(null!);
  const videoRef = useRef<HTMLVideoElement>(null!);

  /** 1. Forcer scroll en haut + bloquer scroll **/
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");

    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useGSAP(
    ({ scope }) => {
      const title = titleRef.current;

      /** INTRO **/
      const intro = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("no-scroll");
          document.body.classList.remove("no-scroll");
          ScrollTrigger.refresh();
        },
      });

      intro.fromTo(
        title,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }
      );

      /** SCROLL ZOOM **/
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
        },
      });

      tl.to(title, {
        scale: 60,
        xPercent: 235,
        ease: "power2.out",
      })
        .to(title, { opacity: 0, duration: 0.3, ease: "power1.in" })
        .set(title, { display: "none" }); // IMPORTANT: plus devant !

      return () => {
        tl.kill();
      };
    },
    { scope: sceneRef }
  );

  return (
    <section className="bg-black">
      <div
        ref={sceneRef}
        className="hero-container relative h-[500vh] overflow-hidden"
      >
        <IntroTitle ref={titleRef} />
        <HeroVideo ref={videoRef} />

        {/* CONTENU QUI ARRIVE APRES LE ZOOM */}
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-100">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold">Bienvenue dans Reverb</h2>
            <p className="max-w-lg mx-auto mt-4 opacity-80">
              Ceci est la section révélée après le zoom ✨
            </p>
          </div>
        </div>
      </div>
      <div>
        <p>test dune nouvelle section</p>
      </div>
    </section>
  );
}
