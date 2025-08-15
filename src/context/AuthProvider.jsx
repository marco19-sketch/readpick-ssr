// src/context/AuthProvider.jsx
"use client";

import { AuthContext } from "./AuthContext";
import { useMinimalAuth } from "@/firebase/firebase"; // updated import

export function AuthProvider({ children }) {
  const { user, loading, isAuthInitialized } = useMinimalAuth();

  if (!isAuthInitialized) {
    return <p>Loading authentication...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}
