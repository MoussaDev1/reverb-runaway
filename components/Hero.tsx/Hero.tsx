"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroMask from "./HeroMask";
import HeroVideo from "./HeroVideo";
import HeroText from "./HeroText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const maskRef = useRef<SVGSVGElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  gsap.registerPlugin(ScrollTrigger, useGSAP);

  useGSAP(() => {
    const tl = gsap.timeline();
    /** INTRO **/
    tl.to(textRef.current, {
      opacity: 0,
      duration: 1,
    });
    tl.to(videoRef.current, {
      opacity: 1,
      duration: 2,
      ease: "power3.inOut",
    });
    tl.to(
      maskRef.current,
      {
        transform: "scale(50)",
        duration: 3,
        ease: "power3.inOut",
      },
      "<"
    );
  });

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Video */}
      <HeroVideo ref={videoRef} />
      {/* Text */}
      <HeroText ref={textRef} />
      {/* Mask */}
      <HeroMask ref={maskRef} />
    </div>
  );
}
