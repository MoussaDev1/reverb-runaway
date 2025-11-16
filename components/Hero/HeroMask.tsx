import { forwardRef } from "react";

const HeroMask = forwardRef<HTMLHeadingElement>((props, ref) => {
  return (
    <div className="title-hero-container relative">
      <h1
        ref={ref}
        className="title-container font-display text-[20vh] text-accent"
      >
        <span className="title-welcome">WELCOME</span>
        <span className="title-name">REVERBE</span>
      </h1>
    </div>
  );
});

HeroMask.displayName = "HeroMask";
export default HeroMask;
