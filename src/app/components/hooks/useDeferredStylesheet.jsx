"use client";

import { useEffect, useState } from "react";

/**
 * A custom hook to defer the loading of a stylesheet.
 * This is useful for improving LCP by loading non-critical CSS after the initial render.
 * @param {string} href The public path to the stylesheet (e.g., "/styles/BackToTop.css").
 * @returns {boolean} A boolean indicating if the stylesheet has been loaded.
 */
export default function useDeferredStylesheet(href) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if the stylesheet is already in the document head
    const existingLink = document.head.querySelector(`link[href="${href}"]`);

    if (existingLink) {
      // If it exists, check its media type. If it's "all", it's already loaded.
      if (existingLink.media === "all" || existingLink.media === "") {
        setIsLoaded(true);
      } else {
        // If it exists but is still set to 'print', wait for it to load.
        existingLink.onload = () => setIsLoaded(true);
      }
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    // We initially set the media to "print" so the browser loads it
    // without blocking the initial render.
    link.media = "print";
    link.onload = () => {
      // Once loaded, we switch the media to "all" to apply the styles.
      link.media = "all";
      setIsLoaded(true);
    };
    link.onerror = e => {
      console.error(`Failed to load deferred stylesheet: ${href}`, e);
      setIsLoaded(true); // Treat as loaded to prevent a render block
    };

    document.head.appendChild(link);

    // Clean up the link tag when the component unmounts
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [href]);

  return isLoaded;
}
