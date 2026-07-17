import { useState } from 'react';

interface CognitiveSearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  className?: string;
}

export default function CognitiveSearchBar({ onSearch, isSearching, className = '' }: CognitiveSearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions] = useState([
    'LCB-FT UEMOA CEMAC déclaration de soupçon',
    'Gouvernance SFD BCEAO circulaire 03-2017',
    'ISO 37301 conformité réglementaire Afrique',
    'Prix de transfert BEPS UEMOA 2025',
    'Audit interne COBAC R-2016/01',
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isSearching) {
      onSearch(query.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    if (!isSearching) {
      onSearch(suggestion);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-0">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ri-search-line text-foreground-400 text-lg"></i>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher dans le corpus réglementaire KOS..."
              className="w-full pl-11 pr-4 py-3.5 text-sm bg-background-50 border border-background-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-foreground-900 placeholder-foreground-400 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="px-6 py-3.5 bg-primary-500 text-background-50 text-sm font-medium rounded-r-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
          >
            {isSearching ? (
              <span className="flex items-center gap-2">
                <i className="ri-loader-4-line animate-spin"></i>
                Analyse...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <i className="ri-search-line"></i>
                Rechercher
              </span>
            )}
          </button>
        </div>
      </form>
      <div className="flex flex-wrap gap-2 mt-3">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(s)}
            className="text-xs px-3 py-1.5 rounded-full bg-background-100 text-foreground-600 hover:bg-background-200 hover:text-foreground-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}