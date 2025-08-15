// pages/_app.jsx
import "../styles/globals.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

import NavBar from "../components/NavBar";
import LanguageSwitcher from "../components/LanguageSwitcher";
import BackToTop from "../components/BackToTop";
import FooterLoader from "../components/FooterLoader";
import useGoogleAnalytics from "../hooks/useGoogleAnalytics";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthProvider";

// Dynamic imports for pages (optional if you use per-page components)
const Home = dynamic(() => import("./index"), { ssr: false });
const Favorites = dynamic(() => import("./favorites"), { ssr: false });
const Login = dynamic(() => import("./auth-pages/Login"), { ssr: false });
const Register = dynamic(() => import("./auth-pages/Register"), { ssr: false });
const ResetPassword = dynamic(() => import("./auth-pages/ResetPassword"), {
  ssr: false,
});
const UpdatePassword = dynamic(() => import("./auth-pages/UpdatePassword"), {
  ssr: false,
});

function MyApp({ Component, pageProps, router }) {
  const [login, setLogin] = useState(false);

  const authPaths = [
    "/login",
    "/register",
    "/reset-password",
    "/update-password",
  ];

  const isAuthPage = authPaths.includes(router.pathname);
  const isFavoritesPage = router.pathname === "/favorites";

  useGoogleAnalytics();

  const [fetchedBooks, setFetchedBooks] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cachedBooks");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cachedBooks", JSON.stringify(fetchedBooks));
    }
  }, [fetchedBooks]);

  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFavorite = book => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === book.id);

    if (isAlreadyFavorite) {
      if (isFavoritesPage) {
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

  const { t } = useTranslation();

  return (
    <AuthProvider>
      <div className="root">
        <a href="#main-content" className="skip-link">
          {t("skipToMain")}
        </a>

        <div
          className={`page-wrapper ${
            isFavoritesPage
              ? "favorites-page"
              : isAuthPage
              ? "auth-page-wrapper"
              : "home-page"
          }`}>
          <NavBar
            setLogin={setLogin}
            login={login}
            favorites={favorites}
            t={t}
          />
          <LanguageSwitcher />

          {/* Render the page component */}
          {router.pathname === "/" && (
            <Home
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              fetchedBooks={fetchedBooks}
              setFetchedBooks={setFetchedBooks}
            />
          )}
          {router.pathname === "/favorites" && (
            <ProtectedRoute>
              <Favorites
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </ProtectedRoute>
          )}
          {router.pathname === "/login" && (
            <Login setLogin={setLogin} login={login} />
          )}
          {router.pathname === "/register" && <Register setLogin={setLogin} />}
          {router.pathname === "/reset-password" && <ResetPassword />}
          {router.pathname === "/update-password" && <UpdatePassword />}
        </div>

        <BackToTop scrollContainerSelector="body" />
        <FooterLoader />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
