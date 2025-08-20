"use client";

import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContextProvider";
import { useRouter } from "next/navigation";
// import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import BookResults from "./BookResults";
import BackToTop from "./BackToTop";
import FavoriteButton from "./FavoriteButton";
import BookCardMinimal from "./BookCardMinimal";
import "@/styles/Favorites.css";

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
  // const { t } = useTranslation();
  const {
    user,
    loading,
    favorites = [],
    toggleFavorite,
  } = useContext(AppContext);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showFullList, setShowFullList] = useState(false);
  //   const mobileBgFav = "/assets/images/vitaly-girl-566x700.avif";
  //   const desktopBgFav = "/assets/images/vitaly-girl-1920.avif";

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
    return <p>test text</p>;
    // return <p>{t("loading", { defaultValue: "Loading..." })}</p>;
  }

  // ✅ in case router.push hasn’t redirected yet
  if (!user) {
    return (
      <p>
        {/* {t("pleaseLogin", {
          defaultValue: "Please log in to view your favorites.",
        })} */}
        test text
      </p>
    );
  }

  return (
    <div className="favorites-main-container">
      <h2 className="favorites-header">
        {/* {t("yourFavorites", { defaultValue: "I tuoi favoriti" })}: */}
        test text
      </h2>

      {(favorites || []).length === 0 ? (
        <h2 className="no-favorites-yet">
          {/* {t("noFavoritesYet", { defaultValue: "Nessun favorito ancora." })} */}
          test text
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
              // t={t}
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
              <strong>
                {/* {t("fullDescription", { defaultValue: "Full Description" })}:{" "} */}
                test text
              </strong>{" "}
              {/* {selectedBook.volumeInfo?.description ||
                t("noDescription", {
                  defaultValue: "No description available",
                })} */}
                test text
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
  );
}
