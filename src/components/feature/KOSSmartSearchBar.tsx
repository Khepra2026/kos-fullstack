import { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useKosRouting } from '@/hooks/useKosRouting';

interface SearchResult {
  id: string;
  titre: string;
  domaine: string;
  sous_domaine: string;
  pays: string;
  organisation: string;
  statut: string;
  description: string;
  mots_cles: string[];
  type_document: string;
  similarity?: number;
}

interface SearchResponse {
  results: SearchResult[];
  query: string;
  method: 'semantic' | 'fallback';
  tokens_used?: number;
  error?: string;
}

const DOMAINE_ICONS: Record<string, string> = {
  'Régulation': 'ri-bank-line',
  'BCEAO': 'ri-bank-line',
  'COBAC': 'ri-bank-line',
  'LBC/FT': 'ri-shield-check-line',
  'Conformité': 'ri-shield-check-line',
  'Prix de Transfert': 'ri-exchange-dollar-line',
  'Gouvernance': 'ri-organization-chart',
  'Protection des Données': 'ri-lock-line',
  'IA': 'ri-robot-line',
  'Cybersécurité': 'ri-shield-flash-line',
  'Méthodologies': 'ri-tools-line',
  'Contrôle Interne': 'ri-check-double-line',
  'Fintech': 'ri-smartphone-line',
  'Audit': 'ri-search-eye-line',
  'Droit': 'ri-scales-3-line',
  'ESG': 'ri-leaf-line',
  'Microfinance': 'ri-money-dollar-circle-line',
};

function getDomaineIcon(domaine: string): string {
  for (const [key, icon] of Object.entries(DOMAINE_ICONS)) {
    if (domaine.includes(key)) return icon;
  }
  return 'ri-file-text-line';
}

function getStatutBadge(statut: string): string {
  switch (statut) {
    case 'En vigueur': return 'bg-primary-100 text-primary-700 border-primary-200';
    case 'Révisé': return 'bg-accent-100 text-accent-700 border-accent-200';
    case 'Abrogé': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-secondary-100 text-secondary-700 border-secondary-200';
  }
}

interface KOSSmartSearchBarProps {
  className?: string;
  placeholder?: string;
  compact?: boolean;
}

export default function KOSSmartSearchBar({ className = '', placeholder, compact = false }: KOSSmartSearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDomaine, setSelectedDomaine] = useState<string>('');
  const [showAll, setShowAll] = useState(false);
  const [searchMethod, setSearchMethod] = useState<'semantic' | 'fallback' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const { call } = useKosRouting();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSemanticSearch = useCallback(async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    setSearchMethod(null);

    try {
      const response = await call<SearchResponse>('rag-semantic-search', {
        query: searchQuery, limit: 20, match_threshold: 0.3,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.results && response.results.length > 0) {
        setResults(response.results);
        setSearchMethod(response.method);
        setIsOpen(true);
      } else {
        setResults([]);
        setSearchMethod(response.method);
        setIsOpen(true);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message.includes('api_key_missing')
        ? 'La recherche sémantique IA sera disponible dès activation de la clé API. La recherche textuelle est active.'
        : 'Service de recherche temporairement indisponible. Veuillez réessayer.');

      // Fallback: text-based search on rag_documents
      try {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('rag_documents')
          .select('id, titre, domaine, sous_domaine, pays, organisation, statut, description, mots_cles, type_document')
          .or(`titre.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
          .eq('est_public', true)
          .order('ordre_affichage', { ascending: true, nullsFirst: false })
          .limit(20);

        if (!fallbackError && fallbackData && fallbackData.length > 0) {
          setResults(fallbackData as SearchResult[]);
          setSearchMethod('fallback');
          setIsOpen(true);
        } else {
          setResults([]);
          setIsOpen(true);
        }
      } catch {
        setResults([]);
        setIsOpen(true);
      }
    } finally {
      setLoading(false);
    }
  }, [call]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 3) {
      setResults([]);
      setError(null);
      setSearchMethod(null);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => performSemanticSearch(value), 500);
  };

  const domaines = Array.from(new Set(results.map((r) => r.domaine).filter(Boolean))).sort();
  const filteredResults = selectedDomaine
    ? results.filter((r) => r.domaine === selectedDomaine)
    : results;
  const displayedResults = showAll ? filteredResults : filteredResults.slice(0, compact ? 5 : 8);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <i className={`ri-search-line text-lg ${loading ? 'text-primary-500 animate-pulse' : 'text-foreground-400'}`} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => query.length >= 3 && !loading && setIsOpen(true)}
          placeholder={placeholder || 'Recherche sémantique dans la base documentaire KHEPRA — textes, méthodologies, guides...'}
          className="w-full pl-12 pr-12 py-4 bg-background-50 border border-background-200 rounded-xl text-sm text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
          {loading && (
            <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          )}
          {!loading && query.length > 0 && (
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
                setError(null);
                setSearchMethod(null);
                inputRef.current?.focus();
              }}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-background-200 transition-colors cursor-pointer"
              aria-label="Effacer la recherche"
            >
              <i className="ri-close-line text-foreground-400" />
            </button>
          )}
        </div>
      </div>

      {/* Badge méthode de recherche */}
      {searchMethod && query.length >= 3 && !error && (
        <div className="mt-2 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
            searchMethod === 'semantic'
              ? 'bg-primary-50 border-primary-200 text-primary-700'
              : 'bg-secondary-100 border-secondary-200 text-secondary-700'
          }`}>
            <i className={`${searchMethod === 'semantic' ? 'ri-brain-line' : 'ri-search-line'} text-[10px]`} />
            {searchMethod === 'semantic' ? 'Recherche Sémantique IA' : 'Recherche Textuelle'}
          </span>
        </div>
      )}

      {/* Message d'erreur informatif */}
      {error && query.length >= 3 && (
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 flex items-start gap-2">
          <i className="ri-information-line mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Résultats dropdown */}
      {isOpen && results.length > 0 && !error && (
        <div className="absolute z-50 mt-2 w-full bg-background-50 border border-background-200 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-background-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-foreground-500 uppercase tracking-wide">
                {results.length} document{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
                {searchMethod === 'semantic' && (
                  <span className="ml-2 text-[10px] text-primary-600 font-normal">— IA sémantique</span>
                )}
              </span>
            </div>
            {domaines.length > 1 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDomaine('')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedDomaine === ''
                      ? 'bg-primary-500 text-white'
                      : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                  }`}
                >
                  Tous
                </button>
                {domaines.map((domaine) => (
                  <button
                    key={domaine}
                    onClick={() => setSelectedDomaine(domaine)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selectedDomaine === domaine
                        ? 'bg-primary-500 text-white'
                        : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                    }`}
                  >
                    {domaine}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results list */}
          <div className="max-h-[420px] overflow-y-auto divide-y divide-background-200">
            {displayedResults.map((doc) => (
              <div
                key={doc.id}
                className="p-4 hover:bg-background-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-primary-100 rounded-lg flex-shrink-0 mt-0.5">
                    <i className={`${getDomaineIcon(doc.domaine)} text-primary-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm text-foreground-950 leading-snug">
                        {doc.titre}
                      </h4>
                      {doc.statut && (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border whitespace-nowrap ${getStatutBadge(doc.statut)}`}>
                          {doc.statut}
                        </span>
                      )}
                      {doc.similarity !== undefined && searchMethod === 'semantic' && (
                        <span className="text-[10px] text-primary-600 font-medium whitespace-nowrap">
                          {Math.round(doc.similarity * 100)}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-foreground-500 mb-2 line-clamp-2">
                      {doc.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-foreground-400">
                      {doc.organisation && (
                        <span className="flex items-center gap-1">
                          <i className="ri-building-line" />
                          {doc.organisation}
                        </span>
                      )}
                      {doc.pays && (
                        <span className="flex items-center gap-1">
                          <i className="ri-earth-line" />
                          {doc.pays}
                        </span>
                      )}
                      {doc.type_document && (
                        <span className="flex items-center gap-1">
                          <i className="ri-file-text-line" />
                          {doc.type_document}
                        </span>
                      )}
                    </div>
                    {doc.mots_cles && doc.mots_cles.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.mots_cles.slice(0, 4).map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-0.5 bg-background-100 text-foreground-500 rounded text-[10px] whitespace-nowrap"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show more / less */}
          {filteredResults.length > (compact ? 5 : 8) && (
            <div className="p-3 border-t border-background-200 bg-background-50">
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full py-2 text-sm text-primary-600 hover:text-primary-700 font-medium text-center transition-colors cursor-pointer"
              >
                {showAll
                  ? 'Afficher moins'
                  : `Voir les ${filteredResults.length} résultats`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* No results */}
      {isOpen && query.length >= 3 && results.length === 0 && !loading && !error && (
        <div className="absolute z-50 mt-2 w-full bg-background-50 border border-background-200 rounded-xl shadow-lg p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary-100 flex items-center justify-center">
            <i className="ri-search-2-line text-2xl text-foreground-300" />
          </div>
          <p className="text-foreground-600 font-medium mb-1">Aucun document trouvé</p>
          <p className="text-sm text-foreground-400">
            Essayez avec d'autres termes ou élargissez votre recherche
          </p>
        </div>
      )}
    </div>
  );
}