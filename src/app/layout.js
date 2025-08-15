// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootClientWrapper from "./RootClientWrapper";
import NavBarWrapper from './components/NavBarWrapper'; // client wrapper


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My App",
  description: "My app description",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RootClientWrapper>
          <NavBarWrapper /> {/* handles hiding based on pathname */}
          <main>{children}</main>
        </RootClientWrapper>
      </body>
    </html>
  );
}
