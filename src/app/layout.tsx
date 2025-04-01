import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { StarfieldCanvas } from "./components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vigilantes Files",
  description: "App for users to download and view content from the band, Vigilantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen overflow-auto bg-black flex items-center justify-center text-white">
          <StarfieldCanvas />

          <div className="h-screen z-10 flex flex-col">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
