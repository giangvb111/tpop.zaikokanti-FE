import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '@/i18n/locales/en/translation.json';
import translationJA from '@/i18n/locales/ja/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ja: {
    translation: translationJA,
  },
};

const languageDetector = new LanguageDetector;
const lang = languageDetector.detect();

const predefinedLang = 'ja';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: predefinedLang,
    fallbackLng: predefinedLang,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['navigator', 'querystring', 'cookie', 'localStorage', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    react: {
      useSuspense: false,
    },
  }).then(() => {
    const detectedLang = i18n.language;
    i18n.changeLanguage(detectedLang);
  });


export default i18n;
