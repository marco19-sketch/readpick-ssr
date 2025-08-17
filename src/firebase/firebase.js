"use client";

import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  confirmPasswordReset,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";





const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCFEFHF,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCFEFHFxIHn2G6xexV8R4Fb1LyhdpaAnw8",
//   authDomain: "my-ssr-read-pick-app.firebaseapp.com",
//   projectId: "my-ssr-read-pick-app",
//   storageBucket: "my-ssr-read-pick-app.firebasestorage.app",
//   messagingSenderId: "499698746925",
//   appId: "1:499698746925:web:4077c74901ec191cfa9aa4",
//   measurementId: "G-XQKP0P3P8X",
// };



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Set persistence
setPersistence(auth, browserLocalPersistence).catch(err => {
  console.error("Error setting persistence:", err);
});

export function signInWithGoogle() {
  return signInWithPopup(auth, provider)
    .then(result => {
      //The signed-in user info
      const user = result.user;
      console.log("Google Sing-In successful", user);
      return user;
    })
    .catch(error => {
      console.error("Error during Google Sign-In:", error);
      throw error;
    });
}

// Minimal auth hook
export function useMinimalAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log("onAuthStateChanged fired:", currentUser);
      if (currentUser) {
        await currentUser.getIdToken();
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
      setIsAuthInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading, isAuthInitialized };
}

// Export auth and onAuthStateChanged directly
export { auth, onAuthStateChanged };

// Re-export Firebase auth functions
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  confirmPasswordReset,
  sendPasswordResetEmail,
};
