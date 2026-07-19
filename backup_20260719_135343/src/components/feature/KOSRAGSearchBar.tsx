// ═══════════════════════════════════════════════════════════════════════════
// rAGSearchBar — Barre de recherche RAG enrichie par le KOS Graph
// Affiche les thèmes détectés, les voisins du graphe, et les résultats RAG v9
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useCallback, useRef } from 'react';
import { useKOSRAG, type rAGResult, type enrichedNeighbor } from '@/hooks/useKOSRAG';

export default function rAGSearchBar() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<rAGResult | null>(null);
  const [hops, setKosHops] = useState(2);
  const [showKOSPanel, setShowKOSPanel] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const { query: searchKOS, loading, error, graphStats } = useKOSRAG();

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResult(null);
      return;
    }
    const res = await searchKOS(searchQuery, { lang: 'fr', enrichKOS: true, hops });
    setResult(res);
  }, [searchKOS, hops]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 3) {
      setResult(null);
      return;
    }
    debounceRef.current = setTimeout(() => handleSearch(value), 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length >= 3) handleSearch(query);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-600';
      case 'High': return 'text-amber-600';
      case 'Medium': return 'text-secondary-600';
      case 'Low': return 'text-emerald-600';
      default: return 'text-foreground-600';
    }
  };

  const getConfidenceBar = (confidence: number) => {
    if (confidence >= 90) return 'bg-emerald-500';
    if (confidence >= 75) return 'bg-primary-500';
    if (confidence >= 50) return 'bg-secondary-500';
    return 'bg-foreground-300';
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Barre de recherche principale */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 flex items-center pointer-events-none">
            <i className={`ri-search-line text-lg ${loading ? 'text-primary-500 animate-pulse' : 'text-foreground-400'}`}></i>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Recherche KOS-RAG — BCEAO, COBAC, gouvernance, risque, conformité..."
            className="w-full pl-12 pr-36 py-3.5 bg-background-50 border border-background-200 rounded-xl text-sm text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
          />
          <div className="absolute right-3 flex items-center gap-2">
            {/* KOS Hops selector */}
            <div className="flex items-center gap-1 bg-background-100 rounded-lg px-1.5 py-1">
              {[1, 2, 3].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setKosHops(h)}
                  className={`w-6 h-6 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                    hops === h
                      ? 'bg-primary-500 text-background-50'
                      : 'text-foreground-500 hover:text-foreground-700'
                  }`}
                  title={`${h} saut${h > 1 ? 's' : ''} KOS`}
                >
                  {h}
                </button>
              ))}
            </div>
            {/* KOS Graph stats badge */}
            <button
              type="button"
              onClick={() => setShowKOSPanel(!showKOSPanel)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors cursor-pointer border whitespace-nowrap ${
                graphStats.isLive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${graphStats.isLive ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
              KOS {graphStats.totalNodes > 0 ? `${graphStats.totalNodes}n` : ''}
            </button>
            {loading && (
              <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </div>
      </form>

      {/* KOS Graph Panel — stats + voisins */}
      {showKOSPanel && (
        <div className="bg-background-50 border border-background-200/60 rounded-xl p-4 space-y-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <i className="ri-mind-map text-accent-600"></i>
            <span className="text-xs font-semibold text-foreground-950">KOS Knowledge Graph</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
              graphStats.isLive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {graphStats.isLive ? `${graphStats.totalNodes} nœuds · ${graphStats.totalEdges} relations` : 'Mode mock'}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-background-100 rounded-lg p-2">
              <p className="text-lg font-bold text-primary-600">{graphStats.totalNodes}</p>
              <p className="text-[9px] text-foreground-500 uppercase">Nœuds</p>
            </div>
            <div className="bg-background-100 rounded-lg p-2">
              <p className="text-lg font-bold text-accent-600">{graphStats.totalEdges}</p>
              <p className="text-[9px] text-foreground-500 uppercase">Relations</p>
            </div>
            <div className="bg-background-100 rounded-lg p-2">
              <p className="text-lg font-bold text-secondary-600">{Object.keys(graphStats.nodeTypes).length}</p>
              <p className="text-[9px] text-foreground-500 uppercase">Types</p>
            </div>
            <div className="bg-background-100 rounded-lg p-2">
              <p className="text-lg font-bold text-foreground-950">{graphStats.avgDegree}</p>
              <p className="text-[9px] text-foreground-500 uppercase">Degré moy.</p>
            </div>
          </div>
          {Object.keys(graphStats.nodeTypes).length > 0 && (
            <div className="flex flex-wrap gap-1">
              {Object.entries(graphStats.nodeTypes).map(([type, count]) => (
                <span key={type} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">
                  {type}: {count}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-sm text-red-700">
          <i className="ri-error-warning-line"></i>
          {error}
        </div>
      )}

      {/* Résultats */}
      {result && (
        <div className="space-y-4 animate-fadeIn">
          {/* KOS Enrichment Summary */}
          {result.kos_enrichment.active && result.kos_enrichment.voisins_enrichis.length > 0 && (
            <div className="bg-accent-50/60 border border-accent-200/60 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-mind-map text-accent-600 text-lg"></i>
                <span className="text-xs font-semibold text-accent-900">
                  KOS Enrichment — {result.kos_enrichment.nb_relations_traversees} relations traversées
                </span>
                <span className="text-[10px] text-accent-600">
                  (profondeur {result.kos_enrichment.profondeur})
                </span>
              </div>

              {/* Thèmes détectés */}
              <div className="flex flex-wrap gap-2 mb-3">
                {result.kos_enrichment.themes_detectes.map((theme) => (
                  <span key={theme} className="text-[10px] bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full font-medium border border-primary-200">
                    {theme}
                  </span>
                ))}
              </div>

              {/* Voisins du graphe */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto">
                {result.kos_enrichment.voisins_enrichis.slice(0, 8).map((neighbor: enrichedNeighbor, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 bg-background-50 rounded-lg px-3 py-2 border border-background-200/60">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      neighbor.hops === 1 ? 'bg-primary-500' : neighbor.hops === 2 ? 'bg-accent-500' : 'bg-secondary-500'
                    }`}></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium text-foreground-950 truncate">{neighbor.label}</p>
                      <p className="text-[9px] text-foreground-400">
                        {neighbor.type} · {neighbor.relation} · {neighbor.hops} saut{neighbor.hops > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Domain Lock Info */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-background-100 text-foreground-600 font-medium">
              Domaine: {result.query_domain_label}
            </span>
            <span className={`px-2.5 py-1 rounded-full font-medium ${
              result.domain_validation.verdict === 'PASS' ? 'bg-emerald-100 text-emerald-700' :
              result.domain_validation.verdict === 'WARNING' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>
              Domain-Lock: {result.domain_validation.verdict} ({Math.round(result.domain_validation.match_ratio * 100)}%)
            </span>
            {result.mckinsey_memo?.generated && (
              <span className={`px-2.5 py-1 rounded-full font-medium border ${
                result.mckinsey_memo.risk_level === 'CRITICAL' ? 'bg-red-50 text-red-700 border-red-200' :
                result.mckinsey_memo.risk_level === 'HIGH' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                'bg-secondary-50 text-secondary-700 border-secondary-200'
              }`}>
                McKinsey Memo: {result.mckinsey_memo.risk_level}
              </span>
            )}
            <span className="text-foreground-400 ml-auto">
              {result.latency_ms}ms
            </span>
          </div>

          {/* Sources Classées */}
          <div className="space-y-2">
            {result.sources.slice(0, 8).map((source, idx) => (
              <div key={idx} className="bg-background-50 border border-background-200/60 rounded-xl p-4 hover:border-background-300/80 transition-colors group">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-background-100 shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-foreground-500">{source.rank}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold text-foreground-950 leading-snug">{source.title}</span>
                      {source.cobac_reranker?.active && (
                        <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold">COBAC</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200/70 text-foreground-600">{source.regulator}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getRiskColor(source.risk_level)} bg-background-100`}>{source.risk_level}</span>
                      <span className="text-[10px] text-foreground-400">{source.jurisdiction_label.split(' — ')[0]}</span>
                    </div>
                    {source.content_snippet && (
                      <p className="text-xs text-foreground-600 line-clamp-2 mb-2 leading-relaxed">{source.content_snippet}</p>
                    )}
                    {/* Confidence bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-background-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getConfidenceBar(source.confidence)}`}
                          style={{ width: `${source.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-foreground-600 whitespace-nowrap">{source.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pipeline footer */}
          <div className="text-[10px] text-foreground-400 flex items-center gap-1 justify-end">
            <i className="ri-git-branch-line"></i>
            {result.pipeline}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!result && !loading && query.length >= 3 && (
        <div className="text-center py-12 bg-background-50 border border-background-200/60 rounded-xl">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl mx-auto mb-4 bg-background-100">
            <i className="ri-mind-map text-2xl text-foreground-300"></i>
          </div>
          <p className="text-foreground-600 font-medium mb-1">Prêt à explorer le KOS</p>
          <p className="text-xs text-foreground-400">Posez une question sur la gouvernance, la conformité ou les risques</p>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !result && (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background-50 border border-background-200/60 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-background-200 shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-background-200 rounded w-3/4"></div>
                  <div className="h-2 bg-background-200 rounded w-1/2"></div>
                  <div className="h-1.5 bg-background-200 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



