"use client";
import { motion } from "framer-motion";

interface Props {
  intro: boolean;
}

export default function ReverbTitle({ intro }: Props) {
  return (
    <motion.h1
      initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.2em" }}
      animate={
        intro
          ? {
              opacity: 1,
              scale: [0.9, 1.05, 1],
              letterSpacing: ["0.2em", "0.05em"],
              y: "0%",
            }
          : {
              y: "-15vh", // 🔥 monte légèrement, mais reste visible
              scale: 1.1,
              opacity: 0.8,
              transition: { duration: 1.5, ease: "easeInOut" },
            }
      }
      transition={{ duration: 2, ease: "easeInOut" }}
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[10vw] uppercase tracking-widest text-base-red z-40 cursor-text select-text"
    >
      Upclyded Fashion Show
    </motion.h1>
  );
}
