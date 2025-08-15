import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // fetch translations via HTTP
  .use(LanguageDetector) // detect and remember last selected language
  .use(initReactI18next)
  .init({
    fallbackLng: "it", // fallback if language file is missing
    supportedLngs: ['en', 'it'],
    backend: {
      loadPath: "/locales/{{lng}}.json", // e.g. /public/locales/it.json
    },
    detection: {
      // Options for LanguageDetector
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage"], // remember language in localStorage
      lookupLocalStorage: 'i18nextLng',
      checkWhiteList: true
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
