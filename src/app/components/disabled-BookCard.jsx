"use client";

import "@/styles/BookCard.css";
import FavoriteButton from "./FavoriteButton";
import { useThumbnail } from "@/utils/useThumbnail";
import React, { Suspense, useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "./AppContextProvider";
import Image from "next/image";
const LazyAmazonLink = React.lazy(() => import("./AmazonLink"));

const languageMap = {
  en: "English",
  fr: "French",
  it: "Italiano",
  es: "Spanish",
  de: "German",
  pt: "Portuguese",
  ru: "Russian",
  zh: "Chinese",
  ja: "Japanese",
  ar: "Arabic",
  nl: "Dutch",
  sv: "Swedish",
  hi: "Hindi",
};

export default function BookCard({
  book,
  onSelect,
  onToggleFavorite,
  isFavorite,
  isHighPriority,
}) {
  const thumbnail = useThumbnail(book);
  const [showAmazon, setShowAmazon] = useState(false);
  const { italian } = useContext(AppContext);
  // const [canRenderImage, setCanRenderImage] = useState(isHighPriority);
  // const cardRef = useRef(null);

  useEffect(() => {
    if (isHighPriority) {
      setCanRenderImage(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        // Se la card è in vista, impostiamo lo stato su true
        if (entries[0].isIntersecting) {
          setCanRenderImage(true);
          // E smettiamo di osservare per evitare carichi di lavoro inutili
          observer.disconnect();
        }
      },
      {
        // L'immagine viene caricata quando è a 200px di distanza dal viewport
        rootMargin: "200px",
      }
    );

    // Se la card esiste, inizia a osservarla
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Pulisce l'observer quando il componente si smonta
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isHighPriority]); // La dipendenza isHighPriority è essenziale

  // Delaying Amazon render, it does not improve LCP anyway
  useEffect(() => {
    const timer = setTimeout(() => setShowAmazon(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const {
    title = "Untitled",
    authors = "N/A",
    publishedDate,
    categories = "N/A",
    language,
    description,
    copiesSold,
  } = book.volumeInfo || {};

  const hasThumbnail =
    thumbnail !== "https://via.placeholder.com/128x195?text=No+Image";

  const formatCopiesSold = () => {
    if (!copiesSold) return "N/A";
    if (copiesSold >= 1000000) {
      return `${(copiesSold / 1000000).toLocaleString()} ${
        italian ? "Milioni" : "Millions"
      }`;
    } else {
      return copiesSold.toLocaleString() || "N/A";
    }
  };

  const publishedYear =
    publishedDate && !isNaN(new Date(publishedDate))
      ? new Date(publishedDate).getFullYear()
      : "Unknown";

  console.log("priority", canRenderImage);

  return (
    <div
      ref={cardRef}
      className="single-book"
      role="listitem"
      aria-label={`Book: ${title}`}
      tabIndex="0">
      <h2 className="single-book-title">{title}</h2>

      <div className="cover-favorite-btn">
        {canRenderImage ? ( // Usa il nuovo stato per il rendering condizionale
          <button
            className="thumb-btn"
            onClick={() => onSelect(book)}
            onKeyDown={e =>
              (e.key === "Enter" || e.key === " ") && onSelect(book)
            }
            aria-label="View book full description">
            {hasThumbnail ? (
              <Image
                id={isHighPriority ? "lcp-cover" : undefined}
                tabIndex="0"
                className="thumbnail"
                src={thumbnail}
                alt={`${italian ? "Copertina di" : "Cover of"} ${title}`}
                priority={isHighPriority}
                width="200"
                height="300"
                decoding={isHighPriority ? "async" : "auto"}
                loading={isHighPriority ? "eager" : "lazy"}
              />
            ) : (
              <span className="no-thumbnail-para">No cover image available</span>
            )}
          </button>
        ) : (
          // Placeholder per l'immagine non ancora caricata.
          // È cruciale che abbia le stesse dimensioni (width/height)
          // per prevenire il CLS.
          <div
            style={{
              width: 200,
              height: 300,
              backgroundColor: "#f0f0f0",
            }}></div>
        )}
        <div className="book-card-fav-btn">
          <FavoriteButton
            isFavorite={isFavorite(book)}
            onToggle={onToggleFavorite}
            // t={t}
          />
        </div>
      </div>
      <div className="book-detail">
        <p>
          <strong>{italian ? "Autore/i" : "Author/s"}:</strong>{" "}
          {Array.isArray(authors) ? authors.join(", ") : authors}
        </p>
        <p>
          <strong>{italian ? "Pubblicato" : "Published"}:</strong>
          {publishedYear}
        </p>
        <p>
          <strong>{italian ? "Genere" : "Genre"}:</strong>
          {Array.isArray(categories) ? categories.join(", ") : categories}
        </p>

        <p>
          <strong>{italian ? "Lingua" : "Language"}:</strong>
          {languageMap[language] || language}
        </p>
        <p>
          <strong>{italian ? "Copie vendute" : "Copies sold"}:</strong>
          <span className="copies-sold">
            {formatCopiesSold(copiesSold) || "N/A"}
          </span>
        </p>
        <p>
          <strong>{italian ? "Descrizione" : "Description"}:</strong>{" "}
          {description ? (
            <>
              {description.slice(0, 100)}...
              <button
                type="button"
                className="read-more"
                onClick={() => onSelect(book)}
                aria-label={italian ? "Leggi di più" : "Read more"}>
                {italian ? "leggi di più" : "read more"}
              </button>
            </>
          ) : italian ? (
            "Nessuna descrizione disponibile"
          ) : (
            "No description available"
          )}
        </p>

        <div className="amazon-buy-link-container">
          {showAmazon && (
            <Suspense fallback={<div>Loading...</div>}>
              <LazyAmazonLink title={title} author={authors} />
            </Suspense>
          )}
          <p className="affiliate-para">Affiliate link</p>
        </div>
      </div>
    </div>
  );
}
