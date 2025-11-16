import { forwardRef } from "react";

const HeroVideo = forwardRef<HTMLVideoElement>((props, ref) => {
  return (
    <div className="video-hero-container flex absolute top-0 left-0 w-full h-full -z-1">
      <video
        ref={ref}
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
  );
});

HeroVideo.displayName = "HeroVideo";
export default HeroVideo;
