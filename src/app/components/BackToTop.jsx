'use client'

import { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
// import "@/styles/BackToTop.css";

export default function BackToTop({ scrollContainerSelector = ".root" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 500
  ); //'to avoid errors'

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

  if (isMobile) return null;

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
      <style>{`.back-to-top {
  position: fixed;
  right: 4%;
  bottom: 250px;
  border-radius: 50%;
  padding: 10px;
  font-size: 25px;
  z-index: 1000;
  background-color: var(--overlay);
  color: white;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
}

.back-to-top.show {
  outline: none;
  opacity: 1;
  border: none;
  pointer-events: auto;
  color: var(--main-color);
}

.back-to-top.show:active {
  transform: scale(0.9);
  color: white;
  border-color: white;
}

@media (hover: hover) {
  .back-to-top.show:hover {
    border: 2px solid var(--main-color);
    box-shadow: 3px 3px 6px var(--main-color);
  }
}
`}</style>
      <button
        className={`back-to-top ${isVisible ? "show" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top">
        <FaArrowUp className="arrow-up" />
      </button>
    </>
  );
}
