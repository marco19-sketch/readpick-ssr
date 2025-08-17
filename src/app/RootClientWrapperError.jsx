"use client";

import { useState, useEffect, createContext, Suspense } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getGoogleRedirectResult } from "../firebase/firebase";
import NavBar from "./components/NavBar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import BackToTop from "./components/BackToTop";
import FooterLoader from "./components/FooterLoader";
import useGoogleAnalytics from "./components/hooks/useGoogleAnalytics";

// Create context to provide login, favorites, and toggleFavorite
export const AppContext = createContext();

export default function RootClientWrapper({ children, route }) {
  const [login, setLogin] = useState(false);
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // ✅ defines user

  useEffect(() => {
    setMounted(true);
  }, []);

  const label = t("skipToMain", { defaultValue: "Vai al contenuto principale" });

  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [fetchedBooks, setFetchedBooks] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cachedBooks");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      localStorage.setItem("cachedBooks", JSON.stringify(fetchedBooks));
    }
  }, [favorites, fetchedBooks]);

  useGoogleAnalytics();

  const toggleFavorite = book => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === book.id);

    if (isAlreadyFavorite) {
      if (route === "/favorites") {
        setFavorites(prev =>
          prev.map(fav =>
            fav.id === book.id ? { ...fav, removing: true } : fav
          )
        );
        setTimeout(() => {
          setFavorites(prev => prev.filter(fav => fav.id !== book.id));
        }, 300);
      } else {
        setFavorites(prev => prev.filter(f => f.id !== book.id));
      }
    } else {
      setFavorites(prev => [...prev, book]);
    }
  };

  // Determine if NavBar should be shown
  const hideNavBarOnRoutes = ["/reset-password", "/update-password"];
  const showNavBar = !hideNavBarOnRoutes.includes(route);

  // Mount and Firebase auth state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        setUser(currentUser);
        setLogin(true);
      } else {
        setUser(null);
        setLogin(false);
      }
      setLoading(false);
    });

  

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        setLogin,
        favorites,
        toggleFavorite,
        fetchedBooks,
        setFetchedBooks,
        mounted,
        setMounted,
        loading,
        setLoading,
      }}>
      <div className="root">
        <a href="#main-content" className="skip-link">
          {label}
        </a>

        {showNavBar && <NavBar t={t} />}

        <LanguageSwitcher />

        <main id="main-content">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>

        <BackToTop scrollContainerSelector="body" />
        <FooterLoader />
      </div>
    </AppContext.Provider>
  );
}
