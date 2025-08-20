"use client";

import { useState, useEffect, createContext, Suspense, useMemo } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n from "../i18n-client";
import NavBar from "./components/NavBar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import BackToTop from "./components/BackToTop";
import FooterLoader from "./components/FooterLoader";
import useGoogleAnalytics from "./components/hooks/useGoogleAnalytics";
import SkipLink from "./components/SkipLink";

// Importa la logica di autenticazione
import { useMinimalAuth } from "../firebase/firebase";

// Crea il contesto per lo stato dell'app
export const AppContext = createContext();

// Crea il contesto per l'autenticazione
export const AuthContext = createContext();

export default function RootClientWrapper({ children, route }) {
  // Stati di autenticazione e di caricamento
  const { user, loadingAuth, isAuthInitialized } = useMinimalAuth();

  // Stati dell'app
  const [mounted, setMounted] = useState(false);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  // Usa un'inizializzazione "null" per evitare l'errore di build
  const [favorites, setFavorites] = useState([]);
  const [fetchedBooks, setFetchedBooks] = useState([]);

  // Sposta la logica di localStorage in useEffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFavorites = localStorage.getItem("favorites");
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
      const savedBooks = localStorage.getItem("cachedBooks");
      setFetchedBooks(savedBooks ? JSON.parse(savedBooks) : []);
    }
  }, []);

  // useEffect essenziale per la separazione tra server e client rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Aggiorna lo stato di login in base a user di useMinimalAuth
  useEffect(() => {
    setLogin(!!user);
  }, [user]);

  // Gestione della persistenza locale dei dati
  useEffect(() => {
    if (favorites !== null && typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    if (fetchedBooks !== null && typeof window !== "undefined") {
      localStorage.setItem("cachedBooks", JSON.stringify(fetchedBooks));
    }
  }, [fetchedBooks]);

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
    () => ({ user, loadingAuth, isAuthInitialized }),
    [user, loadingAuth, isAuthInitialized]
  );

  const appStateValue = useMemo(
    () => ({
      loading,
      setLoading,
      login,
      setLogin,
      user,
      toggleFavorite,
      favorites,
      setFavorites,
      fetchedBooks,
      setFetchedBooks,
    }),
    [
      loading,
      setLoading,
      login,
      setLogin,
      user,
      toggleFavorite,
      favorites,
      setFavorites,
      fetchedBooks,
      setFetchedBooks,
    ]
  );

  const { t } = useTranslation();
  const hideNavBarOnRoutes = ["/reset-password", "/update-password"];
  const showNavBar = !hideNavBarOnRoutes.includes(route);

  // Se l'autenticazione non è ancora inizializzata, mostra un loader
  if (!isAuthInitialized) {
    return <p>Loading authentication...</p>;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <AppContext.Provider value={appStateValue}>
        <AuthContext.Provider value={authContextValue}>
          {/* aggiungere questo div */}
          <div className="layout-container">
            <SkipLink />
            {showNavBar && <NavBar t={t} />}
            <LanguageSwitcher />
            {/* e questa className per bloccare il Footer a fondo pagina */}
            <main id="main-content" className="layout-main-content">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
            <BackToTop scrollContainerSelector="body" />
            <FooterLoader />
          </div>
        </AuthContext.Provider>
      </AppContext.Provider>
    </I18nextProvider>
  );
}
