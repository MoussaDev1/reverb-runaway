import { forwardRef } from "react";

const IntroTitle = forwardRef<HTMLHeadingElement>((props, ref) => {
  return (
    <h1
      ref={ref}
      className="title fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-[12vw] font-display text-accent uppercase tracking-tight 
                   whitespace-nowrap z-30 mix-blend-difference"
    >
      REVERB
    </h1>
  );
});

IntroTitle.displayName = "IntroTitle";
export default IntroTitle;
