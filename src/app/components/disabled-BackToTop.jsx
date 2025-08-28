'use client'

import { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";

// The CSS import is REMOVED from the top of the file.
// We will now load it conditionally using the custom hook.

// This is the new custom hook to defer the CSS.
// You will need to create this file: `src/hooks/useDeferredStyleSheet.js`
import useDeferredStylesheet from "./hooks/useDeferredStylesheet";
// import "@/styles/BackToTop.css";

export default function BackToTop({ scrollContainerSelector = ".root" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 500
  ); //'to avoid errors'

  // 1. Use the custom hook to manage CSS loading.
  // The hook will handle creating the link tag and loading the stylesheet.
  // It returns a boolean to indicate when the stylesheet has been loaded.
  const isStylesheetLoaded = useDeferredStylesheet("@/styles/BackToTop.css");

  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Attach scroll listener
  useEffect(() => {
    if (isMobile) return;

    const container =
      document.querySelector(scrollContainerSelector) ||
      document.documentElement;
    containerRef.current = container;

    if (!container) return;

    const toggleVisibility = () => {
      const scrollTop = container.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    container.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => {
      container.removeEventListener("scroll", toggleVisibility);
    };
  }, [scrollContainerSelector, isMobile]);

  if (isMobile || !isStylesheetLoaded) return null;

  const scrollToTop = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <button
        className={`back-to-top ${isVisible ? "show" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top">
        <FaArrowUp className="arrow-up" />
      </button>
    </>
  );
}
