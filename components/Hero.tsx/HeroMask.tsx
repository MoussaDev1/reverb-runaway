import { forwardRef } from "react";

const HeroMask = forwardRef<SVGSVGElement>((props, ref) => {
  return (
    <svg ref={ref} className="absolute inset-0 w-full h-full text-[12vw]">
      <mask id="text-mask">
        <rect width="100%" height="100%" fill="white" />
        <text
          id="mask-text"
          x="50%"
          y="50%"
          fontFamily="var(--font-reverb)"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="20vw"
          color="red"
        >
          REVERB
        </text>
      </mask>

      <rect width="100%" height="100%" fill="black" mask="url(#text-mask)" />
    </svg>
  );
});

HeroMask.displayName = "HeroMask";
export default HeroMask;
