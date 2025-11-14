import { forwardRef } from "react";

const IntroTitle = forwardRef<HTMLHeadingElement>((props, ref) => {
  return (
    <h1
      ref={ref}
      className="title-hero fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-[12vw] font-display uppercase tracking-tight 
                   whitespace-nowrap mix-blend-screen z-10"
    >
      <span className="target">R</span>EVERB
    </h1>
  );
});

IntroTitle.displayName = "IntroTitle";
export default IntroTitle;
