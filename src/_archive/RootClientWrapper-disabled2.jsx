"use client";

import { useState, useEffect, createContext, Suspense, useMemo } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n from "../i18n-client"; // Importa il file di configurazione di i18next
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "./components/NavBar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import BackToTop from "./components/BackToTop";
import FooterLoader from "./components/FooterLoader";
import SkipLink from "./components/SkipLink";
import useGoogleAnalytics from "./components/hooks/useGoogleAnalytics";

// Crea il contesto per fornire lo stato di login, i preferiti e il toggle
export const AppContext = createContext();

// Crea un contesto per l'autenticazione. Questo sostituisce il tuo AuthProvider.
export const AuthContext = createContext();

export default function RootClientWrapper({ children, route }) {
  const [mounted, setMounted] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // Gestione dello stato di autenticazione con Firebase
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

  const authContextValue = useMemo(
    () => ({ user, loading, login }),
    [user, loading, login]
  );

  const { t } = useTranslation();
  const hideNavBarOnRoutes = ["/reset-password", "/update-password"];
  const showNavBar = !hideNavBarOnRoutes.includes(route);

  return (
    <I18nextProvider i18n={i18n}>
      <AppContext.Provider
        value={{
          mounted,
          setMounted,
          login,
          setLogin,
          user,
          setUser,
          loading,
          setLoading,
          toggleFavorite,
          favorites,
          setFavorites,
          fetchedBooks,
          setFetchedBooks,
        }}>
        <AuthContext.Provider value={authContextValue}>
          <SkipLink />
          {showNavBar && <NavBar t={t} />}
          <LanguageSwitcher />
          <main id="main-content">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
          <BackToTop scrollContainerSelector="body" />
          <FooterLoader />
        </AuthContext.Provider>
      </AppContext.Provider>
    </I18nextProvider>
  );
}
