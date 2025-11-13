"use client";
import { MotionValue, motion } from "framer-motion";

interface AuraProps {
  y?: MotionValue<string>;
  opacity?: MotionValue<number>;
}

export default function Aura({ y, opacity }: AuraProps) {
  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute inset-0 z-0 bg-accent-chroma/40 blur-[140px] mix-blend-screen"
    />
  );
}
