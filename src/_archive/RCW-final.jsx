"use client";

import { useState, useEffect, createContext, Suspense, useMemo } from "react-2";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n from "../i18n-client";
import NavBar from "./components/NavBar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import BackToTop from "./components/BackToTop";
import FooterLoader from "./components/FooterLoader";
import useGoogleAnalytics from "./components/hooks/useGoogleAnalytics";
import SkipLink from "./components/SkipLink";
import { useMinimalAuth } from "../firebase/firebase";

export const AppContext = createContext();
export const AuthContext = createContext();

export default function RootClientWrapper({ children, route }) {
  const { user, loading, isAuthInitialized } = useMinimalAuth();

  const [mounted, setMounted] = useState(false);
  const [login, setLogin] = useState(false);
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
    setLogin(!!user);
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      localStorage.setItem("cachedBooks", JSON.stringify(fetchedBooks));
    }
  }, [favorites, fetchedBooks]);

  useEffect(() => {
    setMounted(true);
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
    () => ({ user, loading, isAuthInitialized }),
    [user, loading, isAuthInitialized]
  );

  const appStateValue = useMemo(
    () => ({
      mounted,
      setMounted,
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
      mounted,
      login,
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
