import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import type { AfricanLanguageCode } from '@/i18n';

interface LanguageSwitcherProps {
  position?: 'header' | 'footer';
  variant?: 'full' | 'compact';
}

/**
 * ═══════════════════════════════════════════════════════════════
 * KOS AFRICAN LANGUAGE SWITCHER — 10 langues pilotes
 * Drapeaux + noms natifs + NMT badge
 * ═══════════════════════════════════════════════════════════════
 */
export default function LanguageSwitcher({ position = 'header', variant = 'full' }: LanguageSwitcherProps) {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = languages[currentLanguage];

  const handleChange = (code: AfricanLanguageCode) => {
    changeLanguage(code);
    setOpen(false);
  };

  const isFooter = position === 'footer';
  const isCompact = variant === 'compact';

  return (
    <div ref={ref} className="relative inline-block">
      {/* ── Trigger Button ── */}
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
          isFooter
            ? 'px-3 py-1.5 rounded-lg bg-background-100/50 hover:bg-background-200/70 text-foreground-700 hover:text-foreground-950 text-sm'
            : isCompact
              ? 'px-2 py-1 rounded-full bg-background-100 border border-background-200 hover:bg-background-200 text-xs'
              : 'px-3 py-1.5 rounded-full bg-background-100 border border-background-200 hover:bg-background-200 text-sm'
        }`}
        aria-label={`Langue actuelle : ${current.nativeName}`}
      >
        <span className="text-base leading-none">{current.flag}</span>
        {!isCompact && <span className="font-medium">{current.nativeName}</span>}
        {open ? (
          <i className="ri-arrow-up-s-line text-xs transition-transform" />
        ) : (
          <i className="ri-arrow-down-s-line text-xs transition-transform" />
        )}
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div
          className={`absolute z-50 bg-white rounded-xl border border-background-200 shadow-lg overflow-hidden ${
            isFooter ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0'
          }`}
          style={{ minWidth: '240px', maxHeight: '420px', overflowY: 'auto' }}
        >
          {/* ── NMT Languages ── */}
          <div className="px-3 py-2 border-b border-background-100">
            <p className="text-[10px] uppercase tracking-wider text-foreground-400 font-semibold mb-1">
              Traduction automatique
            </p>
            <div className="space-y-0.5">
              {(Object.entries(languages) as [AfricanLanguageCode, typeof current][])
                .filter(([_, l]) => l.nmt)
                .map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => handleChange(code)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all cursor-pointer whitespace-nowrap ${
                      currentLanguage === code
                        ? 'bg-primary-100 text-primary-800 font-semibold'
                        : 'text-foreground-700 hover:bg-background-100'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="flex-1 text-left">{lang.nativeName}</span>
                    {currentLanguage === code && (
                      <i className="ri-check-line text-primary-600 text-sm" />
                    )}
                  </button>
                ))}
            </div>
          </div>

          {/* ── Community Languages ── */}
          <div className="px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-foreground-400 font-semibold mb-1">
              Mode communautaire
            </p>
            <div className="space-y-0.5">
              {(Object.entries(languages) as [AfricanLanguageCode, typeof current][])
                .filter(([_, l]) => !l.nmt)
                .map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => handleChange(code)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all cursor-pointer whitespace-nowrap ${
                      currentLanguage === code
                        ? 'bg-accent-100 text-accent-800 font-semibold'
                        : 'text-foreground-600 hover:bg-background-100'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="flex-1 text-left">{lang.nativeName}</span>
                    <span className="text-[9px] px-1 py-0.5 rounded bg-accent-100 text-accent-700 font-medium">BETA</span>
                    {currentLanguage === code && (
                      <i className="ri-check-line text-accent-600 text-sm" />
                    )}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Inline version for mobile or compact spaces.
 * Just flag + code — no native name.
 */
export function LanguageSwitcherCompact() {
  return <LanguageSwitcher variant="compact" />;
}

/**
 * Footer version with upward dropdown.
 */
export function LanguageSwitcherFooter() {
  return <LanguageSwitcher position="footer" />;
}