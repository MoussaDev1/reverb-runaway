"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Hero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    console.log(titleLeftRef.current);
    gsap.fromTo(
      titleLeftRef.current,
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
      titleRightRef.current,
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
        <div className="title-hero-container relative">
          <h1 className="title-container font-display text-[20vh] text-accent">
            <span ref={titleLeftRef} className="title-welcome">
              WELCOME
            </span>
            <span ref={titleRightRef} className="title-name">
              REVERBE
            </span>
          </h1>
        </div>
        <div className="video-hero-container flex absolute top-0 left-0 w-full h-full -z-1">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/video/9510023-uhd_4096_2160_25fps.mp4"
            autoPlay
            muted
            loop
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute flex justify-center items-center inset-0">
            <h2 className="text-text text-[12vh] font-display uppercase">
              Upcycled Fashion Show
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
