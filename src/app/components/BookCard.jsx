'use client'

import "@/styles/BookCard.css";
import FavoriteButton from "./FavoriteButton";
import { useThumbnail } from "@/utils/useThumbnail";
import React, { Suspense, useState, useEffect } from "react";


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
  // const { t } = useTranslation();
 

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
      return (copiesSold / 1000000).toLocaleString() + "test text" ;
      // return (copiesSold / 1000000).toLocaleString() + " " + t("Millions", {defaultValue: 'Milioni'});
    } else {
      return copiesSold.toLocaleString() || "N/A";
    }
  };

  const publishedYear =
    publishedDate && !isNaN(new Date(publishedDate))
      ? new Date(publishedDate).getFullYear()
      : "Unknown";

  return (
    <div
      className="single-book"
      role="listitem"
      aria-label={`Book: ${title}`}
      tabIndex="0">
      <h2 className="single-book-title">{title}</h2>

      <div className="cover-favorite-btn">
        {hasThumbnail ? (
          <button
            className="thumb-btn"
            onClick={() => onSelect(book)}
            onKeyDown={e =>
              (e.key === "Enter" || e.key === " ") && onSelect(book)
            }
            aria-label="View book full description">
            <img
              id={isHighPriority ? "lcp-cover" : undefined}
              tabIndex="0"
              className="thumbnail"
              src={thumbnail}
              alt={`Cover of ${title}`}
              loading={isHighPriority ? "eager" : "lazy"}
              fetchPriority={isHighPriority ? "high" : "low"} // 👈 this is key
              width="200"
              height="300"
            />
          </button>
        ) : (
          <p className="no-thumbnail-para">No cover image available</p>
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
          <strong>test text:{" "}</strong>
          {/* <strong>{ t("author", {defaultValue: 'Autore(i)'})}:{" "}</strong> */}
          {Array.isArray(authors) ? authors.join(", ") : authors}
        </p>
        <p>
          <strong>test text:</strong> {publishedYear}
          {/* <strong>{ t("published", {defaultValue: 'Pubblicato'})}:</strong> {publishedYear} */}
        </p>
        <p>
          <strong>test text:</strong>{" "}
          {/* <strong>{ t("genre", {defaultValue: 'Genere'})}:</strong>{" "} */}
          {Array.isArray(categories) ? categories.join(", ") : categories}
        </p>

        <p>
          <strong>test text</strong>{" "}
          {/* <strong>{ t("language", {defaultValue: 'Lingua'})}:</strong>{" "} */}
          {languageMap[language] || language}
        </p>
        <p>
          <strong>test text:</strong>{" "}
          {/* <strong>{ t("copiesSold", {defaultValue: 'Copie vendute'})}:</strong>{" "} */}
          <span className="copies-sold">
            {formatCopiesSold(copiesSold) || "N/A"}
          </span>
        </p>
        <p>
          <strong>test text:</strong>{" "}
          {/* <strong>{ t("description", {defaultValue: 'Descrizione'})}:</strong>{" "} */}
          {description ? (
            <>
              {description.slice(0, 100)}...
              <button
                type="button"
                className="read-more"
                onClick={() => onSelect(book)}
                aria-label='test text'>
                {/* aria-label={ t("readMore", {defaultValue: 'Leggi di più'})}> */}
                test text
                {/* {t("readMore", {defaultValue: 'Leggi di più'})} */}
              </button>
            </>
          ) : (
           'test text'
          //  t("noDescription", {defaultValue: 'Nessuna descrizione disponibile'}) 
          )}
        </p>

        <div className="amazon-buy-link-container">
          {showAmazon &&(
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
