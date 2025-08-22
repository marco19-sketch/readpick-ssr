"use client";

import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContextProvider";
import { useRouter } from "next/navigation";
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
  const {
    user,
    loading,
    favorites = [],
    toggleFavorite,
    italian
  } = useContext(AppContext);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showFullList, setShowFullList] = useState(false);
 
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
    return <p>Loading...</p>;
   
  }

  // ✅ in case router.push hasn’t redirected yet
  if (!user) {
    return (
      <p> 
        {italian ? 'Accedi per vedere i tuoi libri preferiti' : 'Please login to see your favorite books'}
       
      </p>
    );
  }

  return (
    <div className="favorites-main-container">
      <h2 className="favorites-header">
        { italian ? 'I tuoi libri preferiti' : 'Your favorite books'}
        
      </h2>

      {(favorites || []).length === 0 ? (
        <h2 className="no-favorites-yet">
          {italian ? 'Non hai salvato nessun libro preferito ancora' : 'No saved favorite books yet'}
        
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
                {italian ? 'Descrizione completa' : 'Full description'}
                
              </strong>{" "}
              { selectedBook.volumeInfo?.description 
               ? (selectedBook.volumeInfo.description)
                : (italian ? 'Nessuna descrizione disponibile' : 'No description available')}
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
