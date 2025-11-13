// components/BackgroundVideo.tsx
"use client";
import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => v.play();
    const onPause = () => v.pause();
    const onLoop = () => (v.loop = true);
    const onUnloop = () => (v.loop = false);
    const onReset = () => (v.currentTime = 0);

    window.addEventListener("playVideo", onPlay);
    window.addEventListener("pauseVideo", onPause);
    window.addEventListener("loopVideo", onLoop);
    window.addEventListener("unloopVideo", onUnloop);
    window.addEventListener("resetVideo", onReset);

    return () => {
      window.removeEventListener("playVideo", onPlay);
      window.removeEventListener("pauseVideo", onPause);
      window.removeEventListener("loopVideo", onLoop);
      window.removeEventListener("unloopVideo", onUnloop);
      window.removeEventListener("resetVideo", onReset);
    };
  }, []);

  return (
    <div
      id="bg-video-stage"
      ref={stageRef}
      className="fixed inset-0 -z-10 will-change-transform"
      style={{ transformOrigin: "center center" }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/video/9510023-uhd_4096_2160_25fps.mp4"
        muted
        playsInline
        preload="auto"
        style={{ mixBlendMode: "normal", filter: "none" }}
      />
    </div>
  );
}
