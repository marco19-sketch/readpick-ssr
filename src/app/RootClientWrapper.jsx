"use client";

import { Suspense, useState, useEffect } from "react";
import AppContextProvider from "./components/AppContextProvider";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./components/LanguageSwitcher";
import NavBar from "./components/NavBar";
import BackToTop from "./components/BackToTop";
import FooterLoader from "./components/FooterLoader";
import SkipLink from "./components/SkipLink";
import SplashScreen from "./splash/page";

export default function RootClientWrapper({ children }) {
  // State to control the visibility of the splash screen.
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // Use useEffect to hide the splash screen after a set duration.
  useEffect(() => {
    // You can adjust this timeout duration as needed (e.g., 3000ms = 3 seconds).
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    // Clean up the timer when the component unmounts to prevent memory leaks.
    return () => clearTimeout(timer);
  }, []);

  const route = usePathname();
  const hideNavBarOnRoutes = ["/reset-password", "/update-password"];
  const showNavBar = !hideNavBarOnRoutes.includes(route);

  // If the splash screen is visible, render it and nothing else.
  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <AppContextProvider route={route}>
      {" "}
      <div className="layout-container">
        <SkipLink />
        {showNavBar && <NavBar />}
        <LanguageSwitcher />{" "}
        <main id="main-content" className="layout-main-content">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>{" "}
        </main>
        <BackToTop scrollContainerSelector="body" />
        <FooterLoader />{" "}
      </div>{" "}
    </AppContextProvider>
  );
}
