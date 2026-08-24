import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GeoAnswerItem {
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
}

function normalizeGeo(item: GeoAnswerItem): { question: string; answer: string } {
  return {
    question: item.question || item.q || '',
    answer: item.answer || item.a || '',
  };
}

interface ArticleGeoAnswersProps {
  items: GeoAnswerItem[];
  articleId: string;
}

export function ArticleGeoAnswers({ items, articleId }: ArticleGeoAnswersProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const normalized = items.map(normalizeGeo);

  return (
    <section className="mb-14 scroll-mt-28" id="geo-answers">
      <div className="rounded-2xl border-2 border-emerald-200 overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-background-50 flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200 flex-shrink-0">
            <i className="ri-global-line text-emerald-600 text-lg"></i>
          </div>
          <div>
            <h3 className="font-bold text-foreground-950 text-base leading-snug" style={{ fontFamily: 'var(--font-heading), serif' }}>
              {isEn ? 'GEO Direct Answers' : 'Réponses Directes GEO'}
            </h3>
            <p className="text-xs text-foreground-500">
              {isEn
                ? 'Structured answers optimized for regional search visibility'
                : 'Réponses structurées optimisées pour la visibilité en recherche régionale'}
            </p>
          </div>
        </div>

        <div className="divide-y divide-emerald-100">
          {normalized.map((item, index) => (
            <div key={index} className="group">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-start gap-3 px-5 sm:px-6 py-4 text-left hover:bg-emerald-50/40 transition-colors cursor-pointer"
                aria-expanded={openIndex === index}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 text-xs font-bold transition-all duration-200 ${
                  openIndex === index
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200'
                }`}>
                  {index + 1}
                </div>
                <span className="flex-1 text-sm font-semibold text-foreground-800 leading-relaxed pr-6">
                  {item.question}
                </span>
                <i className={`ri-arrow-down-s-line text-foreground-400 text-lg transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}></i>
              </button>

              {openIndex === index && (
                <div className="px-5 sm:px-6 pb-5">
                  <div className="ml-9 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-sm text-foreground-700 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-foreground-400 italic px-1">
        {isEn
          ? `Schema.org QAPage markup active — ${normalized.length} structured answers targeting French-speaking Africa region.`
          : `Balisage Schema.org QAPage actif — ${normalized.length} réponses structurées ciblant la région Afrique francophone.`}
      </p>
    </section>
  );
}



