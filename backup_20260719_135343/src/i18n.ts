import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const AFRICAN_LANGUAGES = {
  sw: { code: 'sw', nativeName: 'Kiswahili', flag: '🇹🇿', nmt: true },
  ha: { code: 'ha', nativeName: 'Hausa', flag: '🇳🇬', nmt: true },
  ig: { code: 'ig', nativeName: 'Igbo', flag: '🇳🇬', nmt: true },
  am: { code: 'am', nativeName: 'አማርኛ', flag: '🇪🇹', nmt: true },
  wo: { code: 'wo', nativeName: 'Wolof', flag: '🇸🇳', nmt: false },
  ln: { code: 'ln', nativeName: 'Lingála', flag: '🇨🇩', nmt: false },
  mos: { code: 'mos', nativeName: 'Mòoré', flag: '🇧🇫', nmt: false },
  ewo: { code: 'ewo', nativeName: 'Ewondo', flag: '🇨🇲', nmt: false },
  dua: { code: 'dua', nativeName: 'Duálá', flag: '🇨🇲', nmt: false },
  fmp: { code: 'fmp', nativeName: 'Feefee', flag: '🇨🇲', nmt: false },
  fr: { code: 'fr', nativeName: 'Français', flag: '🇫🇷', nmt: true },
  en: { code: 'en', nativeName: 'English', flag: '🇬🇧', nmt: true },
} as const;

export type AfricanLanguageCode = keyof typeof AFRICAN_LANGUAGES;
export const AFRICAN_LANG_CODES = Object.keys(AFRICAN_LANGUAGES) as AfricanLanguageCode[];

const savedLanguage = typeof localStorage !== 'undefined' ? localStorage.getItem('language') : null;
const isValidLang = savedLanguage && AFRICAN_LANG_CODES.includes(savedLanguage as AfricanLanguageCode);
const initialLanguage: string = isValidLang ? savedLanguage : 'fr';

const missingKeys: Set<string> = new Set();

export function getMissingTranslations(): string[] {
  return Array.from(missingKeys).sort();
}

export function clearMissingTranslations(): void {
  missingKeys.clear();
}

export function logMissingTranslation(key: string): void {
  missingKeys.add(key);
  if (typeof window !== 'undefined') {
    try {
      const current = JSON.parse(localStorage.getItem('missing_translations') || '[]');
      if (!current.includes(key)) {
        current.push(key);
        localStorage.setItem('missing_translations', JSON.stringify(current.slice(-500)));
      }
    } catch { /* silent */ }
  }
}

const messages = {
  fr: { translation: {} },
  en: { translation: {} },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: initialLanguage,
    fallbackLng: ['fr', 'en'],
    debug: false,
    resources: messages,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    parseMissingKeyHandler: (key: string) => {
      logMissingTranslation(key);
      const parts = key.split('.');
      const fallback = parts[parts.length - 1] || key;
      return `[${fallback}]`;
    },
    missingKeyHandler: () => {},
  });

export default i18n;
