export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-9999 opacity-20 mix-blend-overlay pointer-events-none bg-[url('/textures/grain.png')] bg-repeat bg-size"
      aria-hidden="true"
    />
  );
}
