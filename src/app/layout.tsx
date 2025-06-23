import "./globals.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import {
  AnonymousSignin,
  Navbar,
  StarfieldCanvas,
  ViewportHeightFix,
} from "./components";
import { Analytics } from "@vercel/analytics/next";
import { SessionProvider } from "./providers/SessionProvider";
import localFont from 'next/font/local'
 
const myFont = localFont({
  src: '../../public/Chrome.otf',
})

export const metadata = {
  title: "Vigilantes Files",
  description:
    "App for users to download and view content from the band, Vigilantes",

  icons: {
    icon: "/satelite.svg",
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="dim" lang="en" className={`${myFont.className}`}>
      <body>
        <ViewportHeightFix />
        <SessionProvider>
          <AnonymousSignin />
          <div className=" min-h-screen overflow-auto bg-black flex items-center justify-center text-white">
            <StarfieldCanvas />
            <div className="h-screen w-screen z-10 flex flex-col items-center">
              <Navbar />
              <ReactQueryProvider>{children}</ReactQueryProvider>
              <Analytics />
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
