// components/Hero/HeroText.tsx
import { forwardRef } from "react";

const HeroText = forwardRef<HTMLHeadingElement>((props, ref) => {
  return (
    <h1
      ref={ref}
      className="absolute inset-0 flex items-center justify-center 
                 text-[20vw] text-accent font-display font-bold 
                 pointer-events-none"
      style={{ fontFamily: "var(--font-reverb)" }}
    >
      REVERB
    </h1>
  );
});

HeroText.displayName = "HeroText";
export default HeroText;
