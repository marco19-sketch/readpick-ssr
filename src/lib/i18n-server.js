import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";

// Define the supported languages for the application
const supportedLngs = ["en", "it"];
const fallbackLng = "it";

const initI18next = async (lng = fallbackLng) => {
  // Create a new instance of i18next for each request to avoid conflicts
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      // This is the key part for Server Components: it loads translations directly from the filesystem
      resourcesToBackend((language, namespace) =>
        import(`../locales/${language}.json`)
      )
    )
    .init({
      // Configuration options
      lng, // Set the current language
      fallbackLng, // Fallback language if a translation is missing
      supportedLngs,
      ns: "common", // The default namespace for translations
      defaultNS: "common",
      // We do not need a language detector here, as the language is passed explicitly
      // from the component.
    });
  return i18nInstance;
};

export async function useTranslation(lng, options = {}) {
  // Initialize i18next on the server
  const i18nInstance = await initI18next(lng);

  return {
    t: i18nInstance.getFixedT(lng, options.ns, options.keyPrefix),
    i18n: i18nInstance,
  };
}
