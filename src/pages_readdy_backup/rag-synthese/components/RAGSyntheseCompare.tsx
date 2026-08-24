import type { PinnedSearch } from '@/pages/rag-synthese/types';

interface RAGSyntheseCompareProps {
  items: [PinnedSearch, PinnedSearch];
  onClose: () => void;
}

export default function RAGSyntheseCompare({ items, onClose }: RAGSyntheseCompareProps) {
  const [left, right] = items;

  return (
    <div className="w-full bg-background-50 border border-background-200 rounded-xl p-5 md:p-6 mb-8 print-compare">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <i className="ri-arrow-left-right-line text-accent-600"></i>
          <h3 className="font-semibold text-foreground-950">Comparaison côte à côte</h3>
        </div>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-background-300 hover:bg-background-100 transition-colors cursor-pointer"
        >
          <i className="ri-close-line"></i>
          Fermer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Left side */}
        <div className="bg-background-50 border border-background-200 rounded-lg p-4">
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-100 text-accent-700 rounded-full text-xs font-medium mb-2">
              <i className="ri-pushpin-fill text-xs"></i>
              Recherche 1
            </span>
            <h4 className="font-semibold text-sm text-foreground-950">{left.query}</h4>
            <p className="text-xs text-foreground-400 mt-1">
              {new Date(left.timestamp).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit',
              })}
              {' · '}{left.docCount} docs
            </p>
          </div>
          <div className="border-t border-background-200 pt-3">
            <p className="text-sm text-foreground-700 leading-relaxed whitespace-pre-wrap">{left.summary}</p>
          </div>
          {left.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-background-200">
              {left.keywords.slice(0, 8).map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-0.5 bg-accent-100/70 text-accent-800 rounded text-xs font-medium whitespace-nowrap"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="bg-background-50 border border-background-200 rounded-lg p-4">
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium mb-2">
              <i className="ri-pushpin-fill text-xs"></i>
              Recherche 2
            </span>
            <h4 className="font-semibold text-sm text-foreground-950">{right.query}</h4>
            <p className="text-xs text-foreground-400 mt-1">
              {new Date(right.timestamp).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit',
              })}
              {' · '}{right.docCount} docs
            </p>
          </div>
          <div className="border-t border-background-200 pt-3">
            <p className="text-sm text-foreground-700 leading-relaxed whitespace-pre-wrap">{right.summary}</p>
          </div>
          {right.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-background-200">
              {right.keywords.slice(0, 8).map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-0.5 bg-secondary-100/70 text-secondary-800 rounded text-xs font-medium whitespace-nowrap"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Shared keywords analysis */}
      <div className="mt-5 pt-4 border-t border-background-200">
        <h4 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-1">
          <i className="ri-links-line text-accent-600"></i>
          Mots-clés communs
        </h4>
        <div className="flex flex-wrap gap-2">
          {(() => {
            const shared = left.keywords.filter((k) =>
              right.keywords.some((rk) => rk.toLowerCase() === k.toLowerCase())
            );
            if (shared.length === 0) {
              return (
                <span className="text-xs text-foreground-400">Aucun mot-clé commun entre ces deux synthèses.</span>
              );
            }
            return shared.map((kw) => (
              <span
                key={kw}
                className="px-2.5 py-1 bg-accent-100 text-accent-800 rounded-md text-xs font-medium whitespace-nowrap"
              >
                {kw}
              </span>
            ));
          })()}
        </div>
      </div>
    </div>
  );
}



