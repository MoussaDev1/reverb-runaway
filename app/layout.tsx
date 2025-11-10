import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "../styles/globals.css";

const reverb = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-reverb",
});

const body = Inter({
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
    <html lang="fr" className={`${reverb.variable} ${body.variable}`}>
      <body className="bg-base-black text-base-white antialiased">
        {children}
      </body>
    </html>
  );
}
