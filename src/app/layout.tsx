
import "./globals.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { StarfieldCanvas } from "./components";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Vigilantes Files",
  description: "App for users to download and view content from the band, Vigilantes",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="dim" lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <div className=" min-h-screen overflow-auto bg-black flex items-center justify-center text-white">
          <StarfieldCanvas />
 

          <div className="h-screen z-10 flex flex-col">
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Analytics/>
          </div>
        </div>
      </body>
    </html>
  );
}
