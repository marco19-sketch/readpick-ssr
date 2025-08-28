"use client";

import { useCallback, useEffect, useRef, useContext } from "react";
import CustomRadio from "./CustomRadio";
// import "@/styles/SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { AppContext } from "./AppContextProvider";

const labelsMap = {
  intitle: "Title",
  inauthor: "Author",
  subject: "Subject",
};

export default function SearchBar({
  query,
  setQuery,
  searchMode,
  setSearchMode,
  onSearch,
  onReset,
  placeholderMap,
  placeholderDefault,
  resetResults,
  suggestions,
  setSuggestions,
  handleFetchNew,
}) {
  const { italian } = useContext(AppContext);

  const debounceTimeout = useRef(null);

  const getSuggestions = useCallback(
    async input => {
      if (!input) return;
      const encoded = encodeURIComponent(input.trim());
      const url = `https://openlibrary.org/search.json?q=${encoded}&limit=10`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        const docs = data.docs || [];
        
        const extracted = docs
          .map(doc => {
            if (searchMode === "intitle") return doc.title;
            if (searchMode === "inauthor") return doc.author_name?.[0];
            return null;
          })
          .filter(Boolean);

        const unique = [...new Set(extracted)].slice(0, 7);
        setSuggestions(unique);
      } catch (err) {
        console.error("Open Library suggestion fetch error:", err);
        setSuggestions([]);
      }
    },
    [searchMode, setSuggestions]
  );

  const handleInputChange = e => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(debounceTimeout.current);

    if (value.length > 1) {
      debounceTimeout.current = setTimeout(() => {
        getSuggestions(value);
      }, 600); // ⏱️ adjust delay as needed
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    resetResults();
  }, [searchMode, resetResults]);

  return (
    <div className="search-bar">
      <div className="label-container">
        {["intitle", "inauthor"].map(mode => (
          <CustomRadio
            key={mode}
            // Passa un oggetto con la chiave 'defaultValue'
            label={
              labelsMap[mode] === "Title"
                ? italian
                  ? "Cerca per titolo"
                  : "Search by title"
                : italian
                ? "Cerca per autore"
                : "Search by author"
            }
            name="searchMode"
            value={mode}
            checked={searchMode === mode}
            onChange={() => setSearchMode(mode)}
          />
        ))}
      </div>
      <div className="input-suggestion-container">
        <input
          name="search"
          aria-label="Search for books"
          className="input-element"
          value={query}
          onChange={handleInputChange}
          placeholder={
            placeholderDefault[searchMode] === "titolo"
              ? italian
                ? "Inserisci titolo..."
                : "Input title..."
              : italian
              ? "Inserisci nome..."
              : "Input name..."
          }
          onKeyDown={e => {
            if (e.key === "Escape") {
              setSuggestions([]);
            }
          }}
        />

        {suggestions.length > 0 && (
          <ul className="suggestion-item">
            {suggestions.map((sugg, idx) => (
              <li
                key={idx}
                tabIndex="0"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setQuery(sugg);
                    setSuggestions([]);
                    handleFetchNew(sugg);
                    e.currentTarget.blur();
                  }
                  if (e.key === "Escape") {
                    setSuggestions([]);
                  }
                }}
                onClick={e => {
                  setQuery(sugg); // 👈 this value will be passed to Home when you click search
                  setSuggestions([]);
                  handleFetchNew(sugg);
                  e.currentTarget.blur();
                }}>
                {sugg}
              </li>
            ))}
          </ul>
        )}
        <button
          className="btn-element"
          type="button"
          aria-label={italian ? "Avvia la ricerca" : "Start search"}
          onClick={() => {
            onSearch(query);
            setSuggestions([]);
          }}>
          <FaSearch />
        </button>
      </div>

      <button className="reset-btn" type="button" onClick={onReset}>
        Reset
      </button>
      <style>{`.label-container {
  box-shadow: var(--shadow);
  margin: 10px auto;
  padding: 10px;
  height: 30px;
}

.label-container label {
  font-size: 1.2rem;
}

.btn-element {
  position: absolute;
  top: 2px;
  right: 0;
  background-color: transparent;
  color: var(--text-color);
  font-size: 1.3rem;
  padding: 5px;
  border: none;
}


.btn-element:focus {
  color: white; 
  outline: none;
}

.btn-element:active {
  color: green;
}

.reset-btn {
  display: block;
  margin: 20px auto;
  width: 100px;
  font-size: 1.2rem;
  padding: 5px;
}

.input-element {
  display: block;
  margin: 20px auto;
  width: 200px;
  font-size: 1.5rem;
}

.input-element:focus,
.reset-btn:focus {
  outline: 3px solid white;
  outline-offset: 3px;
}

.input-suggestion-container {
  position: relative;
  width: fit-content;
  margin: 0 auto;
}

.input-element {
  width: 300px;
  border-radius: 5px;
  color: var(--text-color);
  background-color: var(--main-color);
  text-align: center;
  padding: 5px;
}

.suggestion-item {
  display: block;
  text-align: center;
  list-style: none;
  background: var(--overlay);
  backdrop-filter: blur(5px);
  border-radius: 5px;
  padding: 0;
  color: var(--main-color);
  width: 200px;


  z-index: 10;
  position: absolute;
  top: 42px;
  left: 50%;
  transform: translateX(-50%)
}

.suggestion-item li {
  cursor: pointer;
  padding: 8px;
  z-index: 10;
}

.reset-btn {
  background-color: var(--main-color);
  color: var(--text-color);
  box-shadow: var(--shadow);
  text-shadow: 3px 3px 6px rgb(113, 30, 136);
}

.btn-element:active,
.reset-btn:active {
  transform: scale(0.9);
}

@media (hover: hover) {
  .label-container label:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }

  .suggestion-item li:hover {
    transform: scale(1.1);
  }

  .btn-element:hover {
    transform: scale(1.4);
  }

  
  .reset-btn:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
}
`}</style>
    </div>
  );
}
