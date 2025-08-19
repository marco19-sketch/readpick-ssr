'use client'

import { useTranslation } from "react-i18next";
// import { AppContext } from '../RootClientWrapper';
// import { useContext } from 'react'; 


export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  // const { mounted } = useContext(AppContext);
  

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button
        className={`english ${ i18n.language === "en" ? "selected" : ""}`}
        // className={`english ${mounted && i18n.language === "en" ? "selected" : ""}`}
        onClick={() => changeLanguage("en")}>
        <img
          width="20"
          height="16"
          src={`/flags/20x-width/gb.webp`}
          srcSet={`/flags/20x-width/gb.webp 1x, /flags/40x-width/gb.webp 2x`}
          alt={t("englishFlag", {defaultValue: 'Lingua inglese'})}
          fetchPriority="high"
          loading="eager"
        />
      </button>
      <button
        className={`italiano ${ i18n.language === "it" ? "selected" : ""}`}
        // className={`italiano ${mounted && i18n.language === "it" ? "selected" : ""}`}
        onClick={() => changeLanguage("it")}>
        <img
          width="20"
          height="16"
          src={`/flags/20x-width/it.webp`}
          srcSet={`/flags/20x-width/it.webp 1x, /flags/40x-width/it.webp 2x`}
          alt={t("italianFlag", {defaultValue: 'Lingua italiana'})}
          fetchPriority="high"
          loading="eager"
        />
      </button>
    </div>
  );
}
