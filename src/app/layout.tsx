"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useStarfieldCanvas } from "./hooks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const canvasRef = useStarfieldCanvas();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center text-white">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0"
            style={{ display: "block" }}
          />
          <div className="h-full absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:100%_3px]" />

          <div className="h-screen z-10 flex flex-col">
            <div className="flex flex-col flex-6 justify-end"></div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
