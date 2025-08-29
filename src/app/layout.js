import RootClientWrapper from "./RootClientWrapper";
import "./globals.css";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // This is the key! It adds the font-display: swap rule for you
});

export const metadata = {
  title: "Read Pick",
  description: "A website for searching books",
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
