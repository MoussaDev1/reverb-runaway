"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import IntroTitle from "./IntroTitle";
import HeroVideo from "./HeroVideo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  useGSAP(() => {
    /** INTRO **/
    const intro = gsap.timeline({
      onComplete: () => {
        // Le texte a été masqué → maintenant tu peux le supprimer

        // La vidéo devient normale (plus dans les lettres)

        // Débloquer le scroll
        document.documentElement.classList.remove("no-scroll");
        document.body.classList.remove("no-scroll");
      },
    });

    intro
      .from(titleRef.current!, {
        opacity: 0.6,
        scale: 0.8,
        duration: 1.4,
        ease: "power3.in",
      })
      .to(
        videoRef.current!,
        { opacity: 1, duration: 3.5, ease: "power2.out" },
        "<"
      )
      .to(
        titleRef.current!,
        {
          scale: 30,
          xPercent: 255,
          duration: 3,
          ease: "power3.inOut",
          opacity: 1,
        },
        "<"
      )
      .to(titleRef.current!, {
        opacity: 0,
        ease: "power3.inOut",
      });
  });

  return (
    <section className="w-screen min-h-screen overflow-x-hidden  border-red-500">
      <div ref={sceneRef} className="hero-container min-h-screen">
        <HeroVideo ref={videoRef} />
        <div className="mask-hero h-screen w-full bg-bg-black flex items-center justify-center mix-blend-screen">
          <IntroTitle ref={titleRef} />
        </div>
      </div>
      <div>
        <p>test dune nouvelle section</p>
      </div>
    </section>
  );
}
