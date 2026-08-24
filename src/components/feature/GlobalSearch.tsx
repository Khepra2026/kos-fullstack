import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGlobalSearch, getSearchHistory, clearSearchHistory, getPopularSearches } from '@/hooks/useGlobalSearch';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterType = 'all' | 'article' | 'service' | 'resource' | 'page' | 'tool' | 'region';

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showHistory, setShowHistory] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  const { results: { articles, services, resources, pages, tools, regions, total: totalResults }, isSearchingLive } = useGlobalSearch(query);

  const results = { articles, services, resources, pages, tools, regions };

  // Filtrer les résultats selon le filtre actif
  const filteredResults = activeFilter === 'all' 
    ? results 
    : {
        articles: activeFilter === 'article' ? results.articles : [],
        services: activeFilter === 'service' ? results.services : [],
        resources: activeFilter === 'resource' ? results.resources : [],
        pages: activeFilter === 'page' ? results.pages : [],
        tools: activeFilter === 'tool' ? results.tools : [],
        regions: activeFilter === 'region' ? results.regions : []
      };

  // Calculer le nombre total d'éléments filtrés
  const filteredTotal = Object.values(filteredResults).reduce((sum, arr) => sum + arr.length, 0);

  // Calculer le nombre total d'éléments navigables
  const flatResults = [
    ...filteredResults.articles.slice(0, 5),
    ...filteredResults.services.slice(0, 5),
    ...filteredResults.resources.slice(0, 5),
    ...filteredResults.pages.slice(0, 5),
    ...filteredResults.tools.slice(0, 5),
    ...filteredResults.regions.slice(0, 5)
  ];

  // Récupérer l'historique et les suggestions
  const searchHistory = getSearchHistory();
  const popularSearches = getPopularSearches(i18n.language);

  // Auto-focus sur l'input quand la recherche s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Réinitialiser l'index sélectionné quand les résultats changent
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeFilter]);

  // Masquer l'historique quand l'utilisateur tape
  useEffect(() => {
    if (query.length > 0) {
      setShowHistory(false);
    } else {
      setShowHistory(true);
    }
  }, [query]);

  // Gestion du raccourci clavier Ctrl+K / Cmd+K et navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }

      // Navigation clavier dans les résultats
      if (isOpen && flatResults.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % flatResults.length);
          scrollToSelected();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
          scrollToSelected();
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
          e.preventDefault();
          const selected = flatResults[selectedIndex];
          if (selected) {
            navigate(selected.url);
            onClose();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, flatResults, selectedIndex, navigate]);

  // Fonction pour scroller vers l'élément sélectionné
  const scrollToSelected = () => {
    setTimeout(() => {
      const selectedElement = resultsRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, 0);
  };

  // Fermeture au clic en dehors
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  // Réinitialiser la recherche à la fermeture
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setActiveFilter('all');
      setShowHistory(true);
    }
  }, [isOpen]);

  // Fonction pour mettre en surbrillance le terme recherché
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-gray-900 font-medium">{part}</mark>
      ) : (
        part
      )
    );
  };

  // Fonction pour gérer le clic sur un résultat
  const handleResultClick = (url: string) => {
    navigate(url);
    onClose();
  };

  // Fonction pour gérer le clic sur une suggestion d'historique
  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    setShowHistory(false);
  };

  // Fonction pour effacer l'historique
  const handleClearHistory = () => {
    clearSearchHistory();
    setShowHistory(false);
    setTimeout(() => setShowHistory(true), 100);
  };

  // Fonction pour obtenir l'icône selon le type
  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return 'ri-article-line';
      case 'service':
        return 'ri-briefcase-line';
      case 'resource':
        return 'ri-file-text-line';
      case 'page':
        return 'ri-pages-line';
      case 'tool':
        return 'ri-tools-line';
      case 'region':
        return 'ri-map-pin-line';
      default:
        return 'ri-file-line';
    }
  };

  // Fonction pour obtenir la couleur selon le type
  const getColor = (type: string) => {
    switch (type) {
      case 'article':
        return { bg: 'bg-blue-50', text: 'text-blue-600' };
      case 'service':
        return { bg: 'bg-[#D4AF37]/10', text: 'text-[#D4AF37]' };
      case 'resource':
        return { bg: 'bg-green-50', text: 'text-green-600' };
      case 'page':
        return { bg: 'bg-purple-50', text: 'text-purple-600' };
      case 'tool':
        return { bg: 'bg-orange-50', text: 'text-orange-600' };
      case 'region':
        return { bg: 'bg-teal-50', text: 'text-teal-600' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-600' };
    }
  };

  // Fonction pour obtenir le label du filtre
  const getFilterLabel = (filter: FilterType) => {
    const labels = {
      fr: {
        all: 'Tout',
        article: 'Articles',
        service: 'Services',
        resource: 'Ressources',
        page: 'Pages',
        tool: 'Outils',
        region: 'Régions'
      },
      en: {
        all: 'All',
        article: 'Articles',
        service: 'Services',
        resource: 'Resources',
        page: 'Pages',
        tool: 'Tools',
        region: 'Regions'
      }
    };
    return labels[i18n.language as 'fr' | 'en']?.[filter] || labels.fr[filter];
  };

  // Fonction pour obtenir le compteur d'un filtre
  const getFilterCount = (filter: FilterType) => {
    if (filter === 'all') return totalResults;
    return results[`${filter}s` as keyof typeof results]?.length || 0;
  };

  if (!isOpen) return null;

  const showResults = query.length >= 2;
  const hasResults = filteredTotal > 0;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black/70 animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div className="min-h-screen px-4 pt-20 pb-20">
        <div className="max-w-3xl mx-auto animate-fadeSlideUp">
          {/* Barre de recherche */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
              <i className="ri-search-line text-2xl text-[#D4AF37]"></i>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={i18n.language === 'en' 
                  ? "Search articles, services, resources..." 
                  : "Rechercher des articles, services, ressources..."}
                className="flex-1 text-lg outline-none placeholder:text-gray-400"
              />
              <div className="flex items-center gap-2">
                {isSearchingLive && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-3 h-3 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></span>
                    <span className="hidden sm:inline">RAG</span>
                  </span>
                )}
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded whitespace-nowrap">
                  <span>ESC</span>
                </kbd>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label={i18n.language === 'en' ? "Close search" : "Fermer la recherche"}
                >
                  <i className="ri-close-line text-xl text-gray-500"></i>
                </button>
              </div>
            </div>

            {/* Filtres par catégorie */}
            {showResults && (
              <div className="px-6 py-3 border-b border-gray-100 overflow-x-auto">
                <div className="flex items-center gap-2 min-w-max">
                  {(['all', 'article', 'service', 'resource', 'page', 'tool', 'region'] as FilterType[]).map((filter) => {
                    const count = getFilterCount(filter);
                    if (filter !== 'all' && count === 0) return null;
                    
                    return (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                          activeFilter === filter
                            ? 'bg-[#D4AF37] text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {getFilterLabel(filter)}
                        {count > 0 && (
                          <span className={`ml-2 ${
                            activeFilter === filter ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            ({count})
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Zone des résultats */}
            <div ref={resultsRef} className="max-h-[500px] overflow-y-auto">
              {!showResults ? (
                <div className="p-6">
                  {/* Historique de recherche */}
                  {showHistory && searchHistory.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          {i18n.language === 'en' ? 'Recent Searches' : 'Recherches récentes'}
                        </h3>
                        <button
                          onClick={handleClearHistory}
                          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {i18n.language === 'en' ? 'Clear' : 'Effacer'}
                        </button>
                      </div>
                      <div className="space-y-1">
                        {searchHistory.slice(0, 5).map((historyItem, index) => (
                          <button
                            key={index}
                            onClick={() => handleHistoryClick(historyItem)}
                            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
                          >
                            <i className="ri-history-line text-gray-400"></i>
                            <span className="text-gray-700">{historyItem}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions populaires */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                      {i18n.language === 'en' ? 'Popular Searches' : 'Recherches populaires'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(suggestion)}
                          className="px-3 py-2 bg-gray-100 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] text-gray-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message d'aide */}
                  <div className="text-center py-8 mt-6">
                    <i className="ri-search-2-line text-5xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500 mb-2">
                      {i18n.language === 'en' 
                        ? 'Start typing to search' 
                        : 'Commencez à taper pour rechercher'}
                    </p>
                    <p className="text-sm text-gray-400">
                      {i18n.language === 'en' 
                        ? 'Articles, services, resources and more...' 
                        : 'Articles, services, ressources et plus encore...'}
                    </p>
                  </div>
                </div>
              ) : !hasResults ? (
                <div className="p-6 text-center py-12">
                  <i className="ri-emotion-sad-line text-5xl text-gray-300 mb-4"></i>
                  <p className="text-gray-600 font-medium mb-2">
                    {i18n.language === 'en' ? 'No results found' : 'Aucun résultat trouvé'}
                  </p>
                  <p className="text-sm text-gray-400 mb-6">
                    {i18n.language === 'en' 
                      ? 'Try different keywords' 
                      : 'Essayez avec d\'autres mots-clés'}
                  </p>
                  <div className="text-left max-w-md mx-auto">
                    <p className="text-sm text-gray-500 mb-2">
                      {i18n.language === 'en' ? 'Suggestions:' : 'Suggestions :'}
                    </p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• {i18n.language === 'en' ? 'Check spelling' : 'Vérifiez l\'orthographe'}</li>
                      <li>• {i18n.language === 'en' ? 'Use more general terms' : 'Utilisez des termes plus généraux'}</li>
                      <li>• {i18n.language === 'en' 
                        ? 'Try "governance", "compliance", "microfinance"' 
                        : 'Essayez "gouvernance", "conformité", "microfinance"'}
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  {/* Articles */}
                  {filteredResults.articles.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          {i18n.language === 'en' ? 'Articles' : 'Articles'} ({filteredResults.articles.length})
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {filteredResults.articles.slice(0, 5).map((result, index) => {
                          const globalIndex = index;
                          const colors = getColor(result.type);
                          return (
                            <button
                              key={result.id}
                              data-index={globalIndex}
                              onClick={() => handleResultClick(result.url)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                selectedIndex === globalIndex
                                  ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 flex items-center justify-center ${colors.bg} rounded-lg flex-shrink-0`}>
                                  <i className={`${getIcon(result.type)} text-lg ${colors.text}`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
                                    {highlightText(result.title, query)}
                                  </h4>
                                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                                    {result.description}
                                  </p>
                                  {result.category && (
                                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded whitespace-nowrap">
                                      {result.category}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {filteredResults.articles.length > 5 && (
                        <button
                          onClick={() => {
                            navigate('/blog/');
                            onClose();
                          }}
                          className="w-full mt-2 px-4 py-2 text-sm text-[#D4AF37] hover:text-[#B8941F] font-medium text-center whitespace-nowrap"
                        >
                          {i18n.language === 'en' 
                            ? `View all articles (${filteredResults.articles.length})` 
                            : `Voir tous les articles (${filteredResults.articles.length})`}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Services */}
                  {filteredResults.services.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          {i18n.language === 'en' ? 'Services' : 'Services'} ({filteredResults.services.length})
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {filteredResults.services.slice(0, 5).map((result, index) => {
                          const globalIndex = filteredResults.articles.slice(0, 5).length + index;
                          const colors = getColor(result.type);
                          return (
                            <button
                              key={result.id}
                              data-index={globalIndex}
                              onClick={() => handleResultClick(result.url)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                selectedIndex === globalIndex
                                  ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 flex items-center justify-center ${colors.bg} rounded-lg flex-shrink-0`}>
                                  <i className={`${getIcon(result.type)} text-lg ${colors.text}`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
                                    {highlightText(result.title, query)}
                                  </h4>
                                  <p className="text-sm text-gray-500 line-clamp-2">
                                    {result.description}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {filteredResults.services.length > 5 && (
                        <button
                          onClick={() => {
                            navigate('/services/');
                            onClose();
                          }}
                          className="w-full mt-2 px-4 py-2 text-sm text-[#D4AF37] hover:text-[#B8941F] font-medium text-center whitespace-nowrap"
                        >
                          {i18n.language === 'en' 
                            ? `View all services (${filteredResults.services.length})` 
                            : `Voir tous les services (${filteredResults.services.length})`}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Ressources */}
                  {filteredResults.resources.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          {i18n.language === 'en' ? 'Resources' : 'Ressources'} ({filteredResults.resources.length})
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {filteredResults.resources.slice(0, 5).map((result, index) => {
                          const globalIndex = filteredResults.articles.slice(0, 5).length + filteredResults.services.slice(0, 5).length + index;
                          const colors = getColor(result.type);
                          return (
                            <button
                              key={result.id}
                              data-index={globalIndex}
                              onClick={() => handleResultClick(result.url)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                selectedIndex === globalIndex
                                  ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 flex items-center justify-center ${colors.bg} rounded-lg flex-shrink-0`}>
                                  <i className={`${getIcon(result.type)} text-lg ${colors.text}`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
                                    {highlightText(result.title, query)}
                                  </h4>
                                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                                    {result.description}
                                  </p>
                                  {result.category && (
                                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded whitespace-nowrap">
                                      {result.category}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {filteredResults.resources.length > 5 && (
                        <button
                          onClick={() => {
                            navigate('/resources/');
                            onClose();
                          }}
                          className="w-full mt-2 px-4 py-2 text-sm text-[#D4AF37] hover:text-[#B8941F] font-medium text-center whitespace-nowrap"
                        >
                          {i18n.language === 'en' 
                            ? `View all resources (${filteredResults.resources.length})` 
                            : `Voir toutes les ressources (${filteredResults.resources.length})`}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Outils */}
                  {filteredResults.tools.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          {i18n.language === 'en' ? 'Tools' : 'Outils'} ({filteredResults.tools.length})
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {filteredResults.tools.slice(0, 5).map((result, index) => {
                          const globalIndex = filteredResults.articles.slice(0, 5).length + filteredResults.services.slice(0, 5).length + filteredResults.resources.slice(0, 5).length + index;
                          const colors = getColor(result.type);
                          return (
                            <button
                              key={result.id}
                              data-index={globalIndex}
                              onClick={() => handleResultClick(result.url)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                selectedIndex === globalIndex
                                  ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 flex items-center justify-center ${colors.bg} rounded-lg flex-shrink-0`}>
                                  <i className={`${getIcon(result.type)} text-lg ${colors.text}`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
                                    {highlightText(result.title, query)}
                                  </h4>
                                  <p className="text-sm text-gray-500 line-clamp-2">
                                    {result.description}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {filteredResults.tools.length > 5 && (
                        <button
                          onClick={() => {
                            navigate('/tools/');
                            onClose();
                          }}
                          className="w-full mt-2 px-4 py-2 text-sm text-[#D4AF37] hover:text-[#B8941F] font-medium text-center whitespace-nowrap"
                        >
                          {i18n.language === 'en' 
                            ? `View all tools (${filteredResults.tools.length})` 
                            : `Voir tous les outils (${filteredResults.tools.length})`}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Régions */}
                  {filteredResults.regions.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          {i18n.language === 'en' ? 'Regions' : 'Régions'} ({filteredResults.regions.length})
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {filteredResults.regions.slice(0, 5).map((result, index) => {
                          const globalIndex = filteredResults.articles.slice(0, 5).length + filteredResults.services.slice(0, 5).length + filteredResults.resources.slice(0, 5).length + filteredResults.tools.slice(0, 5).length + index;
                          const colors = getColor(result.type);
                          return (
                            <button
                              key={result.id}
                              data-index={globalIndex}
                              onClick={() => handleResultClick(result.url)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                selectedIndex === globalIndex
                                  ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 flex items-center justify-center ${colors.bg} rounded-lg flex-shrink-0`}>
                                  <i className={`${getIcon(result.type)} text-lg ${colors.text}`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
                                    {highlightText(result.title, query)}
                                  </h4>
                                  <p className="text-sm text-gray-500 line-clamp-2">
                                    {result.description}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Pages */}
                  {filteredResults.pages.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3 px-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          {i18n.language === 'en' ? 'Pages' : 'Pages'} ({filteredResults.pages.length})
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {filteredResults.pages.slice(0, 5).map((result, index) => {
                          const globalIndex = filteredResults.articles.slice(0, 5).length + filteredResults.services.slice(0, 5).length + filteredResults.resources.slice(0, 5).length + filteredResults.tools.slice(0, 5).length + filteredResults.regions.slice(0, 5).length + index;
                          const colors = getColor(result.type);
                          return (
                            <button
                              key={result.id}
                              data-index={globalIndex}
                              onClick={() => handleResultClick(result.url)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                selectedIndex === globalIndex
                                  ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 flex items-center justify-center ${colors.bg} rounded-lg flex-shrink-0`}>
                                  <i className={`${getIcon(result.type)} text-lg ${colors.text}`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
                                    {highlightText(result.title, query)}
                                  </h4>
                                  <p className="text-sm text-gray-500 line-clamp-2">
                                    {result.description}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer avec raccourcis clavier */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white border border-gray-200 rounded whitespace-nowrap">↑</kbd>
                    <kbd className="px-2 py-1 bg-white border border-gray-200 rounded whitespace-nowrap">↓</kbd>
                    <span className="ml-1 whitespace-nowrap">
                      {i18n.language === 'en' ? 'to navigate' : 'pour naviguer'}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white border border-gray-200 rounded whitespace-nowrap">↵</kbd>
                    <span className="ml-1 whitespace-nowrap">
                      {i18n.language === 'en' ? 'to select' : 'pour sélectionner'}
                    </span>
                  </span>
                </div>
                <span className="hidden sm:inline whitespace-nowrap">
                  <kbd className="px-2 py-1 bg-white border border-gray-200 rounded whitespace-nowrap">Ctrl</kbd>
                  <span className="mx-1">+</span>
                  <kbd className="px-2 py-1 bg-white border border-gray-200 rounded whitespace-nowrap">K</kbd>
                  <span className="ml-1">
                    {i18n.language === 'en' ? 'to open/close' : 'pour ouvrir/fermer'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



