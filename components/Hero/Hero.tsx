"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import HeroMask from "./HeroMask";
import HeroVideo from "./HeroVideo";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Hero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    const titleLeftRef = titleRef.current?.querySelector(".title-welcome");
    const titleRightRef = titleRef.current?.querySelector(".title-name");
    gsap.fromTo(
      titleLeftRef!,
      {
        opacity: 0,
        "--enter-offset": "-200px",
      },
      {
        opacity: 1,
        "--enter-offset": "0px",
        duration: 1.5,
      }
    );
    gsap.fromTo(
      titleRightRef!,
      {
        opacity: 0,
        "--enter-offset": "200px",
      },
      {
        opacity: 1,
        "--enter-offset": "0px",
        delay: 0.3,
        duration: 1.5,
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const easedProgress = gsap.parseEase("power1.out")(self.progress);
          containerRef.current?.style.setProperty(
            "--progress",
            `${easedProgress}`
          );
        },
      },
    });
    tl.to(
      videoRef.current,
      {
        scale: 1,
        duration: 1,
        ease: "power1.out",
        delay: 0.6,
      },
      0.6
    );
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });

  return (
    <section ref={containerRef} className="hero-container">
      <div className="hero-content relative h-screen flex items-center justify-center overflow-hidden">
        <HeroMask ref={titleRef} />
        <HeroVideo ref={videoRef} />
      </div>
    </section>
  );
}
