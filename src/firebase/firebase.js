// src/firebase/firebase.js
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
  appId: "1:444728893426:web:af679b9a99646ef834556b",
  measurementId: "G-Z4MP8RN7S4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Set persistence
setPersistence(auth, browserLocalPersistence).catch(err => {
  console.error("Error setting persistence:", err);
});

// Sign in with Google
export function signInWithGoogle() {
  return signInWithPopup(auth, provider)
    .then(result => result.user)
    .catch(err => {
      console.error("Google Sign-In error:", err);
      throw err;
    });
}

// Minimal auth hook
export function useMinimalAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
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

// Re-export Firebase auth functions
export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  confirmPasswordReset,
  sendPasswordResetEmail,
};
