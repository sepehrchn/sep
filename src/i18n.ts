import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslation from "../public/locales/en/translation.json";
import ruTranslation from "../public/locales/ru/translation.json";
import hyTranslation from "../public/locales/hy/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ru: { translation: ruTranslation },
      hy: { translation: hyTranslation },
    },
    supportedLngs: ["en", "ru", "hy"],
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "cookie", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

