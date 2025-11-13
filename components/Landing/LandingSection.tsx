// components/Landing/LandingSection.tsx
"use client";

export default function LandingSection() {
  return (
    <section
      id="landing"
      className="relative min-h-screen flex flex-col items-center justify-center text-center text-[var(--color-text)]"
    >
      <div className="absolute inset-0 bg-accent -z-10" />
      <video src="/video/9510023-uhd_4096_2160_25fps.mp4"></video>
      <h2 className="landing-kicker text-5xl sm:text-6xl font-display uppercase tracking-tight text-[var(--color-accent)]">
        Upcycled Fashion Show
      </h2>
      <p className="mt-4 max-w-xl opacity-85">
        Une réinvention du défilé : matière, conscience et style, en écho.
      </p>
    </section>
  );
}
