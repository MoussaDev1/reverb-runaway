import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "../styles/globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import useLenis from "@/hooks/useLenis";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-reverb",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "REVERB RUNWAY",
  description: "Fashion show • Rave hybrid experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${anton.variable} ${inter.variable}`}>
      <body>
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
