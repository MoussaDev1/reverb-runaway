import { forwardRef } from "react";

const HeroVideo = forwardRef<HTMLVideoElement>((props, ref) => {
  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover"
      src="/video/9510023-uhd_4096_2160_25fps.mp4"
    ></video>
  );
});

HeroVideo.displayName = "HeroVideo";
export default HeroVideo;
