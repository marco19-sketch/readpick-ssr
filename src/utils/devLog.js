// src/utils/devLog.js

/**
 * Logs messages only in development mode.
 * Works safely on both server and client.
 */

export function devLog(...args) {
  // Check if running in browser or server and if DEV mode is enabled
  const isDev =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_DEV === "true" // client
      : process.env.NODE_ENV === "development"; // server

  if (isDev) {
    console.log("[devLog]", ...args);
  }
}
