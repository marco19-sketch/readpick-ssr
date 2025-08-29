import RootClientWrapper from "./RootClientWrapper";
import "./globals.css";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // This is the key! It adds the font-display: swap rule for you
});

// All your metadata properties are combined into a single object
export const metadata = {
  // Metadata for SEO and browser tabs
  title: "Read Pick",
  description: "A website for searching books",

  // Custom link tags are placed under the 'other' property
  other: {
    rel: 'preload',
    href: '/_next/static/media/e4af272ccee01ff0-s.p.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={inter.className}>
      <SpeedInsights />
      <body>
        <RootClientWrapper>
          {children}
          <SpeedInsights />
        </RootClientWrapper>
      </body>
    </html>
  );
}
