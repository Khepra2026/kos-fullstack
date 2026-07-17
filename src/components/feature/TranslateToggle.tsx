import { useState, useRef, useEffect } from 'react';
import type { UseRAGTranslationReturn } from '@/hooks/useRAGTranslation';

interface TranslateToggleProps {
  lang: UseRAGTranslationReturn['lang'];
  setLang: UseRAGTranslationReturn['setLang'];
  targetLang: UseRAGTranslationReturn['targetLang'];
  setTargetLang: UseRAGTranslationReturn['setTargetLang'];
  targetLabels: UseRAGTranslationReturn['targetLabels'];
  size?: 'sm' | 'md';
}

export default function TranslateToggle({ lang, setLang, targetLang, setTargetLang, targetLabels, size = 'md' }: TranslateToggleProps) {
  const isSm = size === 'sm';
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`inline-flex items-center ${isSm ? 'gap-1' : 'gap-1.5'}`}>
      {/* FR/EN toggle */}
      <div className={`inline-flex items-center ${isSm ? 'gap-0.5' : 'gap-1'} bg-background-100 rounded-full p-0.5 border border-background-200`}>
        <button
          onClick={() => setLang('fr')}
          className={`${isSm ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'} rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
            lang === 'fr'
              ? 'bg-foreground-950 text-background-50'
              : 'text-foreground-500 hover:text-foreground-700'
          }`}
        >
          FR
        </button>
        <button
          onClick={() => setLang('en')}
          className={`${isSm ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'} rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
            lang === 'en'
              ? 'bg-foreground-950 text-background-50'
              : 'text-foreground-500 hover:text-foreground-700'
          }`}
        >
          EN
        </button>
      </div>

      {/* Target language selector (only shown when lang=en) */}
      {lang === 'en' && (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className={`inline-flex items-center gap-1 ${isSm ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'} rounded-full font-medium border cursor-pointer whitespace-nowrap transition-all bg-accent-100 text-accent-800 border-accent-300 hover:bg-accent-200`}
          >
            → {targetLabels[targetLang]}
            <i className={`ri-arrow-down-s-line ${isSm ? 'text-[10px]' : 'text-xs'} transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <div className="absolute top-full right-0 mt-1 bg-white rounded-lg border border-background-200 shadow-lg py-1 z-50 min-w-[80px]">
              {(Object.entries(targetLabels) as [UseRAGTranslationReturn['targetLang'], string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setTargetLang(key); setOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 ${isSm ? 'text-[11px]' : 'text-xs'} font-medium cursor-pointer whitespace-nowrap transition-colors hover:bg-background-100 ${
                    targetLang === key ? 'text-accent-800 bg-accent-50' : 'text-foreground-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}