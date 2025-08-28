"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "./AppContextProvider";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import itaTrendingBooks from "../../data/itaTrendingBooks";
import "@/styles/Home.css";
import { scrollingUp } from "../../utils/scrollingUp";
import FavoriteButton from "./FavoriteButton";
import { devLog } from "@/utils/devLog";
import BookResults from "./BookResults";
import LoadingSkeleton from "./LoadingSkeleton";

export default function HomePage() {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("intitle");
  const [hasSearched, setHasSearched] = useState(false);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [maxResult] = useState(10);
  const loadMoreRef = useRef(null);
  const [activeQuery, setActiveQuery] = useState("");
  const [activeMode, setActiveMode] = useState("intitle");
  const [suggestions, setSuggestions] = useState([]);
  const { favorites, toggleFavorite, fetchedBooks, setFetchedBooks, italian } =
    useContext(AppContext);

  // Start the timer when the component function is called
  const start = performance.now();

  useEffect(() => {
    // End the timer and log the result after the component has rendered
    const end = performance.now();
    console.log(`The HomePage component rendered in ${end - start} milliseconds.`);
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  let [navigationTiming] = performance.getEntriesByType("navigation");

  if (navigationTiming instanceof PerformanceNavigationTiming) {
    // Calculate time from navigation start to DOM content loaded
    const pageLoadTime =
      navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime;

    console.log("DOM Content Loaded Time:", pageLoadTime, "ms");
  }


 useEffect(() => {
   // Check if the browser supports the PerformanceObserver API
   if (typeof window !== "undefined" && "PerformanceObserver" in window) {
     // Create a new PerformanceObserver
     const observer = new PerformanceObserver(list => {
       // Get all the long task entries
       const entries = list.getEntries();
       for (const entry of entries) {
         // Log the details of the long task
         console.log("Long task detected!");
         console.log(`Duration: ${entry.duration.toFixed(2)}ms`);
         console.log("Details:", entry);

         // Check if there is a detailed attribution
         if (entry.attribution) {
           console.log("Attribution details:");
           console.log(`Name: ${entry.attribution.name}`);
           console.log(`Entry Type: ${entry.attribution.entryType}`);
           console.log(
             `URL: ${
               entry.attribution.containerSrc || entry.attribution.scriptURL
             }`
           );
           console.log(
             `Attributed Target:`,
             entry.attribution.attributedTarget
           );
         }
         console.log("-------------------");
       }
     });

     // Start observing 'longtask' performance entries
     observer.observe({ entryTypes: ["longtask"] });

     // Clean up the observer when the component unmounts
     return () => observer.disconnect();
   }
 }, []);

  const placeholderMap = {
    intitle: "searchPlaceholder.intitle",
    inauthor: "searchPlaceholder.inauthor",
  };

  const placeholderDefault = {
    intitle: "titolo",
    inauthor: "autore",
  };

  const handleFetch = useCallback(async () => {
    if (!hasSearched || !activeQuery) return;

    const encoded = encodeURIComponent(activeQuery.trim());
    setLoading(true);
    devLog("handleFetch fetching...", { activeQuery, activeMode, startIndex });

    try {
      const q = `${activeMode}:${encoded}`;
      await new Promise(resolve => setTimeout(resolve, 500));

      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${startIndex}&maxResults=${maxResult}`
      );

      if (!res.ok) {
        setLoading(false);
        setShowNoResultsModal(true);
        return;
      }

      const data = await res.json();
      const items = data.items ?? [];

      if (!items || items.length === 0) {
        setShowNoResultsModal(true);
      }

      setFetchedBooks(prev => (startIndex === 0 ? items : [...prev, ...items]));
      setLoading(false);
      scrollingUp(350);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
      setShowNoResultsModal(true);
    }
  }, [
    activeQuery,
    activeMode,
    hasSearched,
    startIndex,
    maxResult,
    setFetchedBooks,
  ]);

  const handleSelected = useCallback(book => {
    setShowModal(true);
    setSelectedTitle(book);
  }, []);

  const uniqueBooks = useMemo(() => {
    const seen = new Set();
    return (fetchedBooks || []).filter(book => {
      if (seen.has(book.id)) return false;
      seen.add(book.id);
      return true;
    });
  }, [fetchedBooks]);

  const handleFetchNew = useCallback(
    customQuery => {
      const queryToUse = (customQuery ?? query ?? "").toString();

      if (queryToUse.trim() === activeQuery && searchMode === activeMode)
        return;

      devLog("queryToUse", queryToUse);
      setActiveQuery(queryToUse.trim());
      setActiveMode(searchMode);
      setShowNoResultsModal(false);
      setStartIndex(0);
      setHasSearched(true);
    },
    [activeMode, activeQuery, query, searchMode]
  );

  useEffect(() => {
    if (hasSearched) {
      const controller = new AbortController();
      const fetchData = async () => {
        await handleFetch();
      };
      fetchData();
      return () => controller.abort();
    }
  }, [hasSearched, startIndex, handleFetch]);

  const resetResults = useCallback(() => {
    setHasSearched(false);
    setQuery("");
  }, []);

  const handleReset = useCallback(() => {
    setFetchedBooks([]);
    setSelectedTitle(null);
    setQuery("");
    setSearchMode("intitle");
    setHasSearched(false);
    setShowNoResultsModal(false);
    setLoading(false);
    setSuggestions([]);
  }, [setFetchedBooks]);

  const isFavorite = book => (favorites || []).some(fav => fav.id === book.id);

  useEffect(() => {
    if ((fetchedBooks || []).length > 0) setHasSearched(true);
  }, [fetchedBooks]);

  return (
    <div className="main-container" id="main-content">
      <SearchBar
        query={query}
        setQuery={setQuery}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        onSearch={handleFetchNew}
        handleFetchNew={handleFetchNew}
        onReset={handleReset}
        placeholderMap={placeholderMap}
        placeholderDefault={placeholderDefault}
        itaTrendingBooks={itaTrendingBooks}
        resetResults={resetResults}
        setSuggestions={setSuggestions}
        suggestions={suggestions}
      />

      {!hasSearched && (
        <h2 className="trending-books">
          {" "}
          {italian ? "Libri del momento" : "Trending book"}
        </h2>
      )}

      {loading && <LoadingSkeleton />}

      {!hasSearched && (
        <BookResults
          books={itaTrendingBooks}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onSelect={handleSelected}
        />
      )}

      {uniqueBooks.length > 0 && (
        <>
          <BookResults
            books={uniqueBooks}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onSelect={handleSelected}
          />
          <button
            className="load-more"
            type="button"
            ref={loadMoreRef}
            onClick={() => setStartIndex(prev => prev + maxResult)}>
            {italian ? "Più risultati" : "Load more"}
          </button>
        </>
      )}

      {!loading && showNoResultsModal && (
        <Modal onClose={() => setShowNoResultsModal(false)}>
          <p className="no-results">
            {italian ? "Nessun risultato" : "No results"}
          </p>
        </Modal>
      )}

      {showModal && selectedTitle && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal">
            <h2 id="modal-title">{selectedTitle?.volumeInfo?.title}</h2>
            <p className="full-description">
              <strong>
                {italian ? "Descrizione completa" : "Full description"}:
              </strong>{" "}
              {selectedTitle.volumeInfo?.description
                ? selectedTitle.volumeInfo?.description
                : italian
                ? "Nessuna descrizione"
                : "No description"}
            </p>
          </div>
          <FavoriteButton
            isFavorite={isFavorite(selectedTitle)}
            onToggle={() => toggleFavorite(selectedTitle)}
          />
        </Modal>
      )}
    </div>
  );
}
