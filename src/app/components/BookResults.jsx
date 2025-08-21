'use client'

import React from 'react'
import BookCard from "./BookCard";
import "@/styles/BookResults.css";
import { AppContext } from "./AppContextProvider";
import { useContext } from 'react';


export default function BookResults({
  books,
  onSelect,
  favorites,
  t,
}) {
  const { toggleFavorite  } = useContext(AppContext); // ✅ get toggleFavorite from context

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
            t={ t }
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
