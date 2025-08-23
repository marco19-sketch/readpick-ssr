import RootClientWrapper from "./RootClientWrapper";
import "./globals.css";
import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Read Pick",
  description: "A website for searching books",
};


export default function RootLayout({ children }) {


  return (
    <html lang="it" className={inter.className}>
      <body>
        <RootClientWrapper>
          {children}
        </RootClientWrapper>
      </body>
    </html>
  );
}
