import { useState } from 'react';
import { GLOSSARY_DICT, ARTICLE_SOURCES, ARTICLE_ACRONYMS, GlossaryTerm, ArticleSource } from '@/data/glossary';

interface ArticleGlossaryProps {
  articleId: string;
  isEn?: boolean;
}

const CATEGORY_LABELS: Record<GlossaryTerm['category'], { fr: string; en: string; icon: string; color: string }> = {
  institution: { fr: 'Institution', en: 'Institution', icon: 'ri-bank-line', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  sigle: { fr: 'Sigle', en: 'Acronym', icon: 'ri-text', color: 'bg-slate-50 text-slate-700 border-slate-200' },
  formule: { fr: 'Formule', en: 'Formula', icon: 'ri-calculator-line', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  indicateur: { fr: 'Indicateur', en: 'Indicator', icon: 'ri-bar-chart-line', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  cadre: { fr: 'Cadre réglementaire', en: 'Regulatory Framework', icon: 'ri-scales-3-line', color: 'bg-violet-50 text-violet-700 border-violet-200' },
};

const SOURCE_TYPE_LABELS: Record<ArticleSource['type'], { fr: string; en: string; icon: string }> = {
  regulation: { fr: 'Texte réglementaire', en: 'Regulatory text', icon: 'ri-government-line' },
  institution: { fr: 'Institution', en: 'Institution', icon: 'ri-bank-line' },
  standard: { fr: 'Norme / Standard', en: 'Standard', icon: 'ri-file-text-line' },
  study: { fr: 'Étude / Rapport', en: 'Study / Report', icon: 'ri-article-line' },
};

function GlossaryEntry({ term, isEn }: { term: GlossaryTerm; isEn: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const cat = CATEGORY_LABELS[term.category];

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left cursor-pointer hover:bg-gray-50 transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex-shrink-0 mt-0.5">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${cat.color}`}>
            <i className={`${cat.icon} text-xs`}></i>
            {isEn ? cat.en : cat.fr}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-900 text-sm font-mono tracking-wide">{term.acronym}</span>
            <span className="text-gray-400 text-xs">—</span>
            <span className="text-gray-700 text-sm">
              {isEn ? term.fullEn : term.fullFr}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400">
          {expanded ? <i className="ri-arrow-up-s-line text-sm"></i> : <i className="ri-arrow-down-s-line text-sm"></i>}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-gray-50">
          <p className="text-sm text-gray-600 leading-relaxed mt-3">
            {isEn ? term.definitionEn : term.definitionFr}
          </p>
        </div>
      )}
    </div>
  );
}

export function ArticleGlossary({ articleId, isEn = false }: ArticleGlossaryProps) {
  const [activeTab, setActiveTab] = useState<'glossary' | 'sources'>('glossary');
  const [filterCategory, setFilterCategory] = useState<GlossaryTerm['category'] | 'all'>('all');

  const acronymKeys = ARTICLE_ACRONYMS[articleId] ?? [];
  const sources = ARTICLE_SOURCES[articleId] ?? [];

  const terms = acronymKeys
    .map((key) => GLOSSARY_DICT[key])
    .filter(Boolean)
    .sort((a, b) => a.acronym.localeCompare(b.acronym));

  const filteredTerms = filterCategory === 'all'
    ? terms
    : terms.filter((t) => t.category === filterCategory);

  const presentCategories = Array.from(new Set(terms.map((t) => t.category)));

  if (terms.length === 0 && sources.length === 0) return null;

  const tabClass = (tab: 'glossary' | 'sources') =>
    `flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
      activeTab === tab
        ? 'bg-white text-gray-900 shadow-sm'
        : 'text-gray-500 hover:text-gray-700'
    }`;

  return (
    <section
      className="mt-16 border-t-2 border-gray-100 pt-10"
      aria-label={isEn ? 'Glossary and Sources' : 'Glossaire et Sources'}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 flex items-center justify-center bg-gray-900 rounded-lg">
          <i className="ri-book-open-line text-white text-sm"></i>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 font-playfair">
            {isEn ? 'Glossary & Sources' : 'Glossaire & Sources'}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {isEn
              ? 'Definitions of acronyms and formulas used in this article'
              : 'Définitions des sigles et formules utilisés dans cet article'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        <button
          onClick={() => setActiveTab('glossary')}
          className={tabClass('glossary')}
        >
          <i className="ri-translate-2 text-sm"></i>
          {isEn ? `Glossary (${terms.length})` : `Glossaire (${terms.length})`}
        </button>
        {sources.length > 0 && (
          <button
            onClick={() => setActiveTab('sources')}
            className={tabClass('sources')}
          >
            <i className="ri-links-line text-sm"></i>
            {isEn ? `Sources (${sources.length})` : `Sources (${sources.length})`}
          </button>
        )}
      </div>

      {/* Glossary Tab */}
      {activeTab === 'glossary' && terms.length > 0 && (
        <div>
          {/* Category filters */}
          {presentCategories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-5">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  filterCategory === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isEn ? 'All' : 'Tous'} ({terms.length})
              </button>
              {presentCategories.map((cat) => {
                const catInfo = CATEGORY_LABELS[cat];
                const count = terms.filter((t) => t.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      filterCategory === cat
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <i className={`${catInfo.icon} text-xs`}></i>
                    {isEn ? catInfo.en : catInfo.fr} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Terms list */}
          <div className="space-y-2">
            {filteredTerms.map((term) => (
              <GlossaryEntry key={term.acronym} term={term} isEn={isEn} />
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">
              {isEn ? 'No terms in this category.' : 'Aucun terme dans cette catégorie.'}
            </p>
          )}
        </div>
      )}

      {/* Sources Tab */}
      {activeTab === 'sources' && sources.length > 0 && (
        <div className="space-y-3">
          {sources.map((source, index) => {
            const typeInfo = SOURCE_TYPE_LABELS[source.type];
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
              >
                {/* Index */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold text-gray-600 mt-0.5">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <i className={`${typeInfo.icon} text-xs`}></i>
                      {isEn ? typeInfo.en : typeInfo.fr}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 leading-snug">
                    {isEn ? source.labelEn : source.label}
                  </p>
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 mt-1.5 transition-colors"
                    >
                      <i className="ri-external-link-line text-xs"></i>
                      {source.url.replace('https://', '')}
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          {/* Disclaimer */}
          <p className="text-xs text-gray-400 mt-4 leading-relaxed border-t border-gray-100 pt-4">
            {isEn
              ? 'Sources cited for informational purposes. Regulatory texts may have been updated since publication. Always verify with the official issuing body.'
              : 'Sources citées à titre informatif. Les textes réglementaires peuvent avoir été mis à jour depuis la publication. Vérifiez toujours auprès de l\'organisme émetteur officiel.'}
          </p>
        </div>
      )}
    </section>
  );
}
