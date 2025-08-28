"use client";

import { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
import useDeferredStylesheet from "./hooks/useDeferredStylesheet";
// We no longer need this import: import "@/styles/BackToTop.css";

export default function BackToTop({ scrollContainerSelector = ".root" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Use the custom hook. The hook will return true once the stylesheet is loaded.
  const isStylesheetLoaded = useDeferredStylesheet("/deferred-styles/BackToTop.css");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 500);
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 500);
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Attach scroll listener only when not mobile and the stylesheet is loaded
  useEffect(() => {
    if (isMobile || !isStylesheetLoaded) return;

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
  }, [scrollContainerSelector, isMobile, isStylesheetLoaded]); // Added isStylesheetLoaded as a dependency

  // Only render the component if the stylesheet has loaded
  if (isMobile || !isStylesheetLoaded) {
    return null;
  }

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
    <button
      className={`back-to-top ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top">
      <FaArrowUp className="arrow-up" />
    </button>
  );
}
