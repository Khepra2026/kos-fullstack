import { useCallback } from 'react';
import TranslateToggle from '@/components/feature/TranslateToggle';
import { useRAGTranslation } from '@/hooks/useRAGTranslation';

interface ObservatoireTranslationBarProps {
  translatedCount: number;
  translatableTotal: number;
  onTranslateAll: () => void;
  translatingAll: boolean;
}

export function useObservatoireTranslation() {
  const { lang, setLang, isEn, translateText, translateBatch, targetLang, setTargetLang, targetLabels, exportCache, cacheCount } = useRAGTranslation();
  return { lang, setLang, isEn, translateText, translateBatch, targetLang, setTargetLang, targetLabels, exportCache, cacheCount };
}

export default function ObservatoireTranslationBar({
  translatedCount,
  translatableTotal,
  onTranslateAll,
  translatingAll,
}: ObservatoireTranslationBarProps) {
  const { lang, setLang, isEn, targetLang, setTargetLang, targetLabels, exportCache, cacheCount } = useRAGTranslation();

  const t = useCallback((fr: string, en: string) => isEn ? en : fr, [isEn]);

  return (
    <div className="flex items-center gap-2">
      <TranslateToggle lang={lang} setLang={setLang} targetLang={targetLang} setTargetLang={setTargetLang} targetLabels={targetLabels} size="sm" />
      {isEn && (
        <button
          onClick={onTranslateAll}
          disabled={translatingAll || translatedCount >= translatableTotal}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-medium transition-all cursor-pointer border whitespace-nowrap ${
            translatedCount >= translatableTotal
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : translatingAll
              ? 'bg-background-100 text-foreground-400 border-background-200'
              : 'bg-foreground-950 text-background-50 border-foreground-950 hover:bg-foreground-800'
          }`}
        >
          {translatingAll ? (
            <>
              <div className="w-2.5 h-2.5 border border-background-50 border-t-transparent rounded-full animate-spin"></div>
              {t('Traduction...', 'Translating...')}
            </>
          ) : translatedCount >= translatableTotal ? (
            <>
              <i className="ri-check-double-line text-[10px]"></i>
              {t('Tout traduit', 'All Translated')}
            </>
          ) : (
            <>
              <i className="ri-translate-2 text-[10px]"></i>
              {t('Traduire tout', 'Translate All')}
              {translatedCount > 0 && (
                <span className={`ml-1 px-1 py-0.5 rounded-full text-[9px] font-bold ${translatedCount >= translatableTotal / 2 ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'}`}>
                  {translatedCount}/{translatableTotal}
                </span>
              )}
            </>
          )}
        </button>
      )}
      {cacheCount > 0 && (
        <div className="relative group">
          <button className="inline-flex items-center gap-1 px-2 py-1.5 rounded-full text-[10px] font-medium border border-background-200 bg-background-50 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-download-line text-[10px]"></i>
            Export
          </button>
          <div className="absolute top-full right-0 mt-1 bg-white rounded-lg border border-background-200 shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[90px]">
            <button onClick={() => exportCache('csv')} className="w-full text-left px-3 py-1.5 text-[10px] font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
              <i className="ri-file-excel-2-line mr-1.5"></i>CSV
            </button>
            <button onClick={() => exportCache('json')} className="w-full text-left px-3 py-1.5 text-[10px] font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
              <i className="ri-code-line mr-1.5"></i>JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}