import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import messages from './local/index';

// ── 10 Langues Africaines Pilotes ──
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
  fmp: { code: 'fmp', nativeName: 'Fè\'éfě\'è', flag: '🇨🇲', nmt: false },
  fr: { code: 'fr', nativeName: 'Français', flag: '🇫🇷', nmt: true },
  en: { code: 'en', nativeName: 'English', flag: '🇬🇧', nmt: true },
} as const;

export type AfricanLanguageCode = keyof typeof AFRICAN_LANGUAGES;
export const AFRICAN_LANG_CODES = Object.keys(AFRICAN_LANGUAGES) as AfricanLanguageCode[];

// ── Langue par défaut (FR) ──
const savedLanguage = typeof localStorage !== 'undefined' ? localStorage.getItem('language') : null;
const isValidLang = savedLanguage && AFRICAN_LANG_CODES.includes(savedLanguage as AfricanLanguageCode);
const initialLanguage: string = isValidLang ? savedLanguage : 'fr';

// ── Missing translations log ──
const missingKeys: Set<string> = new Set();

export function getMissingTranslations(): string[] {
  return Array.from(missingKeys).sort();
}

export function clearMissingTranslations(): void {
  missingKeys.clear();
}

export function logMissingTranslation(key: string): void {
  missingKeys.add(key);
  if (typeof window !== 'undefined' && (window as any).__KOS_I18N_MISSING__) {
    try {
      const current = JSON.parse(localStorage.getItem('missing_translations') || '[]');
      if (!current.includes(key)) {
        current.push(key);
        localStorage.setItem('missing_translations', JSON.stringify(current.slice(-500)));
      }
    } catch { /* silent */ }
  }
}

// ── i18n init ──
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: initialLanguage,
    fallbackLng: (code) => {
      // Fallback chain: African language → fr → en
      if (code === 'fr' || code === 'en') return [code === 'fr' ? 'en' : 'fr'];
      // All African languages fall back to fr first, then en
      return ['fr', 'en'];
    },
    debug: false,
    resources: messages,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: [],
      caches: [],
    },
    returnNull: false,
    returnEmptyString: false,
    returnObjects: true,
    parseMissingKeyHandler: (key: string, defaultValue: string | undefined) => {
      logMissingTranslation(key);
      // Return the key's last segment as fallback — makes untranslated UI still readable
      const parts = key.split('.');
      const fallback = parts[parts.length - 1] || key;
      return `⟪${fallback}⟫`;
    },
    // Save missing keys for community translation
    saveMissing: true,
    missingKeyHandler: (_lng: readonly string[], _ns: string, key: string, _fallbackValue: string) => {
      logMissingTranslation(key);
    },
  });

export default i18n;