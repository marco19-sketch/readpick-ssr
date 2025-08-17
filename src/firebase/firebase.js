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
  apiKey: "AIzaSyA3DdjjO7VoWN1cXThbIyfWBJMAGcluDrQ",
  authDomain: "bookfinderauth.firebaseapp.com",
  projectId: "bookfinderauth",
  storageBucket: "bookfinderauth.firebasestorage.app",
  messagingSenderId: "444728893426",
  appId: "1:444728893426:web:f8c7263e780d43a334556b",
  measurementId: "G-K1QWRFBDSB",
};


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
