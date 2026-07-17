import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { AfricanLanguageCode } from '@/i18n';
import { AFRICAN_LANG_CODES, AFRICAN_LANGUAGES } from '@/i18n';

export function useLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && AFRICAN_LANG_CODES.includes(savedLanguage as AfricanLanguageCode)) {
      if (savedLanguage !== i18n.language) {
        i18n.changeLanguage(savedLanguage);
      }
    }
  }, [i18n]);

  const changeLanguage = useCallback((lang: AfricanLanguageCode) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    // Update html lang attribute for SEO
    document.documentElement.lang = lang;
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('kos:languageChanged', { detail: { lang } }));
  }, [i18n]);

  const currentLanguage: AfricanLanguageCode = (
    AFRICAN_LANG_CODES.includes(i18n.language as AfricanLanguageCode)
      ? i18n.language
      : 'fr'
  ) as AfricanLanguageCode;

  return {
    currentLanguage,
    changeLanguage,
    languages: AFRICAN_LANGUAGES,
    isLanguageSupported: (lang: string): lang is AfricanLanguageCode =>
      AFRICAN_LANG_CODES.includes(lang as AfricanLanguageCode),
  };
}