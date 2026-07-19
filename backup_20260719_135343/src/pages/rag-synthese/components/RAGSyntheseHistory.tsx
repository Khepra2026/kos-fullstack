import { useNavigate } from 'react-router-dom';
import type { PinnedSearch } from '@/pages/rag-synthese/types';

interface RAGSyntheseHistoryProps {
  history: PinnedSearch[];
  onUnpin: (id: string) => void;
  onClear: () => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onCompare: () => void;
}

export default function RAGSyntheseHistory({
  history,
  onUnpin,
  onClear,
  selectedIds,
  onToggleSelect,
  onCompare,
}: RAGSyntheseHistoryProps) {
  const navigate = useNavigate();

  if (history.length === 0) return null;

  const selectedCount = selectedIds.length;
  const canCompare = selectedCount === 2;

  return (
    <div className="w-full bg-background-50 border border-background-200 rounded-xl p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <i className="ri-pushpin-line text-accent-600"></i>
          <h3 className="font-semibold text-foreground-950">Recherches épinglées</h3>
          <span className="text-xs text-foreground-400">{history.length}</span>
        </div>
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <span className="text-xs text-foreground-400">
              {selectedCount} sélectionné{selectedCount > 1 ? 's' : ''}
            </span>
          )}
          {canCompare && (
            <button
              onClick={onCompare}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-500 text-white hover:bg-accent-600 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-right-line text-xs"></i>
              Comparer
            </button>
          )}
          {selectedCount > 0 && (
            <button
              onClick={() => selectedIds.forEach(onToggleSelect)}
              className="text-xs text-foreground-500 hover:text-foreground-700 transition-colors cursor-pointer"
            >
              Tout désélectionner
            </button>
          )}
          <button
            onClick={onClear}
            className="text-xs text-foreground-500 hover:text-red-600 transition-colors cursor-pointer"
          >
            Tout effacer
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {history.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 border rounded-lg hover:bg-background-100 transition-colors group ${
                isSelected ? 'border-accent-300 bg-accent-50/50' : 'border-background-200 bg-background-50'
              }`}
            >
              <button
                onClick={() => onToggleSelect(item.id)}
                className={`w-6 h-6 flex items-center justify-center rounded border transition-colors flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-accent-500 border-accent-500 text-white'
                    : 'border-background-300 hover:border-accent-300'
                }`}
                aria-label={isSelected ? 'Désélectionner' : 'Sélectionner'}
              >
                {isSelected && <i className="ri-check-line text-xs"></i>}
              </button>
              <button
                onClick={() => onUnpin(item.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors flex-shrink-0 cursor-pointer"
                aria-label="Désépingler"
              >
                <i className="ri-pushpin-fill text-accent-500 text-sm group-hover:text-red-500 transition-colors"></i>
              </button>
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => navigate(`/rag-synthese?rag=${encodeURIComponent(item.query)}`)}
              >
                <p className="text-sm font-medium text-foreground-950 truncate">{item.query}</p>
                <p className="text-xs text-foreground-400 mt-0.5">
                  {new Date(item.timestamp).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {item.keywords.length > 0 && (
                    <span className="ml-2">{item.keywords.slice(0, 3).join(', ')}</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => navigate(`/rag-synthese?rag=${encodeURIComponent(item.query)}`)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-200 transition-colors flex-shrink-0 cursor-pointer"
                aria-label="Voir la synthèse"
              >
                <i className="ri-arrow-right-line text-foreground-500"></i>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}



