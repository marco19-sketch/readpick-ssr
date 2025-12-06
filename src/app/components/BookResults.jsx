'use client'

import React, { useEffect } from 'react'
import BookCard from "./BookCard";
import "@/styles/BookResults.css";
import { AppContext } from "./AppContextProvider"; // ✅ import context
import { useContext } from 'react';


export default function BookResults({
  books,
  onSelect,
  favorites,
}) {
  const { toggleFavorite } = useContext(AppContext); // ✅ get toggleFavorite from context

  // Start the timer when the component function is called
  const start = performance.now();

  useEffect(() => {
    // End the timer and log the result after the component has rendered
    const end = performance.now();
    console.log(`The BookResults component rendered in ${end - start} milliseconds.`);
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  const isFavorite = book => (favorites || []).some(fav => fav.id === book.id);

  return (
    <div className="book-rslt-container" role="list">
      {books.map((book, index) => (
        <div
          className={`book-results ${book.removing ? "removing" : ""}`}
          key={book.id}>
          <BookCard
            book={book}
            onSelect={() => onSelect(book)}
            // t={ t }
            isFavorite={isFavorite}
            isHighPriority={index === 0} // 👈 pass this to BookCard
            onToggleFavorite={() => toggleFavorite(book)}
            amazonLink={book.amazonLink}
          />
        </div>
      ))}
    </div>
  );
}
