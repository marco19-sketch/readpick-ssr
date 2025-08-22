"use client";

import { AppContext } from "./AppContextProvider";
import { useContext } from "react";

export default function LanguageSwitcher() {
  const { italian, setItalian } = useContext(AppContext);

  return (
    <div>
      <button
        // className={`english ${ i18n.language === "en" ? "selected" : ""}`}
        // className={`english ${mounted && i18n.language === "en" ? "selected" : ""}`}

        onClick={() => setItalian(false)}
        className={`english ${italian ? "" : "selected"}`}>
        <img
          width="20"
          height="16"
          src={`/flags/20x-width/gb.webp`}
          srcSet={`/flags/20x-width/gb.webp 1x, /flags/40x-width/gb.webp 2x`}
          alt="Lingua inglese"
          // alt={t("englishFlag", {defaultValue: 'Lingua inglese'})}
          fetchPriority="high"
          loading="eager"
        />
      </button>
      <button
        // className={`italiano ${ i18n.language === "it" ? "selected" : ""}`}
        // className={`italiano ${mounted && i18n.language === "it" ? "selected" : ""}`}
        onClick={() => setItalian(true)}
        className={`italiano ${italian ? "selected" : ""}`}>
        <img
          width="20"
          height="16"
          src={`/flags/20x-width/it.webp`}
          srcSet={`/flags/20x-width/it.webp 1x, /flags/40x-width/it.webp 2x`}
          alt="Lingua italiana"
          // alt={t("italianFlag", {defaultValue: 'Lingua italiana'})}
          fetchPriority="high"
          loading="eager"
        />
      </button>
    </div>
  );
}
