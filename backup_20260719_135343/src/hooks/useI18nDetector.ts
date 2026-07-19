import { useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import type { AfricanLanguageCode } from '@/i18n';
import { AFRICAN_LANG_CODES } from '@/i18n';

// Map navigator.language codes to our supported African language codes
const BROWSER_LANG_MAP: Record<string, AfricanLanguageCode> = {
  sw: 'sw', 'sw-KE': 'sw', 'sw-TZ': 'sw', 'sw-UG': 'sw',
  ha: 'ha', 'ha-NG': 'ha', 'ha-NE': 'ha',
  ig: 'ig', 'ig-NG': 'ig',
  am: 'am', 'am-ET': 'am',
  wo: 'wo', 'wo-SN': 'wo',
  ln: 'ln', 'ln-CD': 'ln', 'ln-CG': 'ln',
  mos: 'mos', 'mos-BF': 'mos',
  ewo: 'ewo', 'ewo-CM': 'ewo',
  dua: 'dua', 'dua-CM': 'dua',
  fmp: 'fmp', 'fmp-CM': 'fmp',
  fr: 'fr', 'fr-FR': 'fr', 'fr-TG': 'fr', 'fr-BF': 'fr', 'fr-CM': 'fr', 'fr-SN': 'fr', 'fr-CD': 'fr',
  en: 'en', 'en-US': 'en', 'en-GB': 'en', 'en-NG': 'en', 'en-GH': 'en', 'en-KE': 'en',
};

// Geo-IP based language mapping by country code
const GEO_LANG_MAP: Record<string, AfricanLanguageCode> = {
  TZ: 'sw', KE: 'sw', UG: 'sw', // Swahili zone
  NG: 'en', NE: 'ha', // Nigeria: English default, Niger: Hausa
  ET: 'am', // Ethiopia: Amharic
  SN: 'wo', // Senegal: Wolof
  CD: 'ln', CG: 'ln', // DRC/Congo: Lingala
  BF: 'mos', // Burkina Faso: Moore
  CM: 'fr', // Cameroon: French default (Ewondo/Douala/Fe'efe'e are community)
  TG: 'fr', BJ: 'fr', CI: 'fr', ML: 'fr', GN: 'fr', // Francophone West Africa
};

/**
 * Detects the best language from URL path prefix, browser, or geo-IP.
 * Priority: URL prefix > localStorage > navigator.language > IP geo > fr default
 */
function detectBestLanguage(): AfricanLanguageCode {
  if (typeof window === 'undefined') return 'fr';

  // 1. Check URL path prefix (e.g., /sw/, /ha/, /ig/)
  const pathMatch = window.location.pathname.match(/^\/([a-z]{2,3})\//);
  if (pathMatch) {
    const langFromPath = pathMatch[1];
    if (AFRICAN_LANG_CODES.includes(langFromPath as AfricanLanguageCode)) {
      return langFromPath as AfricanLanguageCode;
    }
  }

  // 2. Check localStorage (user explicit choice)
  const saved = localStorage.getItem('language');
  if (saved && AFRICAN_LANG_CODES.includes(saved as AfricanLanguageCode)) {
    return saved as AfricanLanguageCode;
  }

  // 3. Check navigator.language / navigator.languages
  if (navigator.languages && navigator.languages.length > 0) {
    for (const navLang of navigator.languages) {
      const mapped = BROWSER_LANG_MAP[navLang] || BROWSER_LANG_MAP[navLang.split('-')[0]];
      if (mapped) return mapped;
    }
  }
  if (navigator.language) {
    const mapped = BROWSER_LANG_MAP[navigator.language] || BROWSER_LANG_MAP[navigator.language.split('-')[0]];
    if (mapped) return mapped;
  }

  // 4. Geo-IP detection via timezone hint (lightweight, no external API call)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) {
      const country = tz.split('/')[0];
      // Map common timezone regions
      const tzCountryMap: Record<string, string> = {
        'Africa': tz.split('/')[1] ? tz.split('/')[1].substring(0, 2).toUpperCase() : '',
      };
      const geoCountry = tzCountryMap['Africa'] || '';
      if (geoCountry && GEO_LANG_MAP[geoCountry]) {
        return GEO_LANG_MAP[geoCountry];
      }
    }
  } catch { /* silent */ }

  // 5. Default: French
  return 'fr';
}

/**
 * Hook that detects language on first visit and applies it.
 * Only runs auto-detection once (if no saved preference exists).
 */
export function useI18nDetector() {
  const { changeLanguage, currentLanguage } = useLanguage();
  const detected = useRef(false);

  useEffect(() => {
    if (detected.current) return;

    const saved = localStorage.getItem('language');
    if (!saved) {
      // First visit — auto-detect
      const best = detectBestLanguage();
      if (best !== currentLanguage) {
        changeLanguage(best);
      }
      // Mark as detected so we don't override user choice on refresh
      localStorage.setItem('language', best);
    }
    detected.current = true;

    // Enable missing translations tracking in localStorage
    if (typeof window !== 'undefined') {
      (window as any).__KOS_I18N_MISSING__ = true;
    }
  }, [changeLanguage, currentLanguage]);
}

export { detectBestLanguage, BROWSER_LANG_MAP, GEO_LANG_MAP };



