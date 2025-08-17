"use client";

import { useState, useEffect, useContext } from "react";
import { AppContext } from '../RootClientWrapper';
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import BookResults from "../components/BookResults";
import BackToTop from "../components/BackToTop";
import FavoriteButton from "../components/FavoriteButton";
import BookCardMinimal from "../components/BookCardMinimal";
import '@/styles/favorites.css'

function requestIdleCallbackWithFallback(callback) {
  if ("requestIdleCallback" in window) {
    return requestIdleCallback(callback);
  } else {
    return setTimeout(callback, 1);
  }
}

function cancelIdleCallbackWithFallback(id) {
  if ("cancelIdleCallback" in window) {
    cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

export default function Favorites() {
  const { t } = useTranslation();
  const { user, loading, mounted, favorites, toggleFavorite } = useContext(AppContext);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showFullList, setShowFullList] = useState(false);
  const mobileBgFav = "/assets/images/vitaly-girl-566x700.avif";
  const desktopBgFav = "/assets/images/vitaly-girl-1920.avif";

  // ✅ redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // adjust route if your login page differs
    }
  }, [user, loading, router]);

  useEffect(() => {
    const idleCallback = requestIdleCallbackWithFallback(() =>
      setShowFullList(true)
    );
    return () => cancelIdleCallbackWithFallback(idleCallback);
  }, []);

  const handleSelect = book => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const isFavorite = book => favorites.some(fav => fav.id === book.id);

  // ✅ while checking auth
  if (loading) {
    return <p>{mounted ? t("loading", {defaultValue: "Loading..."}) : ''}</p>;
  }

  // ✅ in case router.push hasn’t redirected yet
  if (!user) {
    return <p>{mounted ? t("pleaseLogin", {defaultValue: "Please log in to view your favorites."}) : ''}</p>;
  }

  return (
    <div className="favorites-page">
      <img
        src={mobileBgFav}
        srcSet={`${mobileBgFav} 566w, ${desktopBgFav} 1920w`}
        sizes="(max-width: 640px) 100vw, 1920px"
        className="favorites-bg"
        alt=""
        aria-hidden="true"
      />

      <div className="favorites-main-container">
        <h2 className="favorites-header">
          {t("yourFavorites") || "Your Favorites"}:
        </h2>

        {(favorites || []).length === 0 ? (
          <h2 className="no-favorites-yet">
            {t("noFavoritesYet") || "No favorites yet."}
          </h2>
        ) : (
          <>
            {!showFullList ? (
              <div className="book-results-minimal">
                <BookCardMinimal book={favorites[0]} onSelect={handleSelect} />
              </div>
            ) : (
              <BookResults
                books={favorites}
                favorites={favorites}
                onSelect={handleSelect}
                toggleFavorite={toggleFavorite}
                // onToggleFavorite={toggleFavorite}
                t={t}
              />
            )}
          </>
        )}

        {showModal && selectedBook && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="modal">
              <h2 id="modal-title" className="header">
                {selectedBook?.volumeInfo?.title || "No title"}
              </h2>
              <p className="full-description">
                <strong>{t("fullDescription", "Full Description")}: </strong>{" "}
                {selectedBook.volumeInfo?.description ||
                  t("noDescription", "No description available")}
              </p>

              <FavoriteButton
                isFavorite={isFavorite(selectedBook)}
                onToggle={() => toggleFavorite(selectedBook)}
              
              />
            </div>
          </Modal>
        )}
        <BackToTop scrollContainerSelector=".favorites-page" />
      </div>
    </div>
  );
}
