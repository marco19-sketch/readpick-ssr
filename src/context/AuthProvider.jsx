// src/context/AuthProvider.jsx
"use client";

// import { useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useMinimalAuth,
  //  getGoogleRedirectResult 
  } from "../firebase/firebase";

export function AuthProvider({ children }) {
  const { user, loading, isAuthInitialized } = useMinimalAuth();

  // useEffect(() => {
  //   // Try to complete Google sign-in after redirect
  //   const handleRedirect = async () => {
  //     const redirectUser = await getGoogleRedirectResult();
  //     if (redirectUser) {
  //       console.log("✅ Google Redirect Login Successful:", redirectUser.email);
  //       // user state will automatically be updated by onAuthStateChanged
  //     }
  //   };
  //   handleRedirect();
  // }, []);

  if (!isAuthInitialized) {
    return <p>Loading authentication...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}
