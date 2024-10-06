import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './enTranslation';
import csTranslation from './csTranslation';

const resources = {
  en: enTranslation,
  cs: csTranslation,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
