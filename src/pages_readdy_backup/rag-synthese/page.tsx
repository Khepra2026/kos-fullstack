import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useSemanticSearch } from '@/hooks/useSemanticSearch';
import type { RagDocument, AutomatonSummarizeResponse, PinnedSearch } from '@/pages/rag-synthese/types';
import type { EmbeddingStats } from '@/hooks/useSemanticSearch';
import { useRAGHistory } from '@/pages/rag-synthese/hooks/useRAGHistory';
import RAGSyntheseHistory from '@/pages/rag-synthese/components/RAGSyntheseHistory';
import RAGSyntheseResults from '@/pages/rag-synthese/components/RAGSyntheseResults';
import RAGSyntheseCompare from '@/pages/rag-synthese/components/RAGSyntheseCompare';
import { SeoHead } from '@/components/feature/SeoHead';
import TranslateToggle from '@/components/feature/TranslateToggle';
import { useRAGTranslation } from '@/hooks/useRAGTranslation';

export default function RAGSynthesePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParam = searchParams.get('rag') || '';
  const { search: semanticSearch, getEmbeddingStats } = useSemanticSearch();

  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<RagDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchMethod, setSearchMethod] = useState('');
  const [totalDocs, setTotalDocs] = useState(0);
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryKeywords, setSummaryKeywords] = useState<string[]>([]);
  const [topDocCount, setTopDocCount] = useState(3);
  const [selectedHistoryIds, setSelectedHistoryIds] = useState<string[]>([]);
  const [compareItems, setCompareItems] = useState<[PinnedSearch, PinnedSearch] | null>(null);
  const [printMode, setPrintMode] = useState(false);
  const [embeddingStats, setEmbeddingStats] = useState<EmbeddingStats | null>(null);
  const lastQueryRef = useRef<string>('');

  // ─── Translation state ───
  const { lang, setLang, isEn, t, translateText, translateBatch, translating, getCached, targetLang, setTargetLang, targetLabels, exportCache, cacheCount } = useRAGTranslation();
  const [translatedSummary, setTranslatedSummary] = useState<string | null>(null);
  const [translatedKw, setTranslatedKw] = useState<string[]>([]);
  const [translatedItems, setTranslatedItems] = useState<Record<string, { titre?: string; description?: string }>>({});
  const [translatingAll, setTranslatingAll] = useState(false);

  const { history, pinSearch, unpinSearch, isPinned, clearHistory } = useRAGHistory();

  // ─── Translate all visible resources ───
  const handleTranslateAll = useCallback(async () => {
    if (!isEn) return;
    setTranslatingAll(true);
    const batch: string[] = [];

    // Collect summary
    if (summary && !translatedSummary) batch.push(summary);
    if (summaryKeywords.length > 0 && translatedKw.length === 0) batch.push(...summaryKeywords);

    // Collect result titles & descriptions
    const newTranslated: Record<string, { titre?: string; description?: string }> = { ...translatedItems };
    for (const doc of results) {
      const docId = doc.id || doc.titre;
      if (!newTranslated[docId]) {
        batch.push(doc.titre);
        if (doc.description) batch.push(doc.description);
      }
    }

    if (batch.length === 0) { setTranslatingAll(false); return; }

    try {
      const translated = await translateBatch(batch);
      let idx = 0;

      // Summary
      if (summary && !translatedSummary && idx < translated.length) {
        setTranslatedSummary(translated[idx]);
        idx++;
      }
      // Keywords
      if (summaryKeywords.length > 0 && translatedKw.length === 0) {
        const kwCount = summaryKeywords.length;
        if (idx + kwCount <= translated.length) {
          setTranslatedKw(translated.slice(idx, idx + kwCount));
          idx += kwCount;
        }
      }
      // Results
      for (const doc of results) {
        const docId = doc.id || doc.titre;
        if (!newTranslated[docId] && idx < translated.length) {
          newTranslated[docId] = { titre: translated[idx] };
          idx++;
          if (doc.description && idx < translated.length) {
            newTranslated[docId].description = translated[idx];
            idx++;
          }
        }
      }
      setTranslatedItems(newTranslated);
    } catch { /* silent */ }
    setTranslatingAll(false);
  }, [isEn, summary, translatedSummary, summaryKeywords, translatedKw, results, translatedItems, translateBatch]);

  // ─── Translate single item ───
  const handleTranslateItem = useCallback(async (docId: string, titre: string, description?: string) => {
    if (!isEn) return;
    const existing = translatedItems[docId];
    const fields: string[] = [];
    if (!existing?.titre) fields.push(titre);
    if (!existing?.description && description) fields.push(description);
    if (fields.length === 0) return;

    const translated = await translateBatch(fields);
    const newItem: { titre?: string; description?: string } = { ...existing };
    let idx = 0;
    if (!existing?.titre && idx < translated.length) { newItem.titre = translated[idx]; idx++; }
    if (!existing?.description && description && idx < translated.length) { newItem.description = translated[idx]; idx++; }
    setTranslatedItems(prev => ({ ...prev, [docId]: newItem }));
  }, [isEn, translatedItems, translateBatch]);

  // ─── Reset translations on new search ───
  const resetTranslations = useCallback(() => {
    setTranslatedSummary(null);
    setTranslatedKw([]);
    setTranslatedItems({});
  }, []);

  const fetchSummary = useCallback(async (topDocs: RagDocument[], searchQuery: string, count: number = 3) => {
    if (topDocs.length < 2) return;
    setSummaryLoading(true);
    setSummary(null);
    setSummaryKeywords([]);
    resetTranslations();
    const combinedContent = topDocs
      .slice(0, count)
      .map((doc, i) => `Document ${i + 1}: ${doc.titre}. ${doc.description || ''}`)
      .join('\n\n');
    const combinedTitre = `Synthèse réglementaire – ${searchQuery}`;
    try {
      const { data, error: fnError } = await supabase.functions.invoke<AutomatonSummarizeResponse>(
        'kos-automaton-engine',
        {
          body: {
            operation: 'summarize',
            content: combinedContent,
            titre: combinedTitre,
            langue: 'fr',
          },
        },
      );
      if (!fnError && data?.success && data.summary) {
        setSummary(data.summary);
        setSummaryKeywords(data.keywords || []);
      }
    } catch {
      // silent
    } finally {
      setSummaryLoading(false);
    }
  }, [resetTranslations]);

  const searchRag = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([]);
      setError(null);
      setSearchMethod('');
      setSummary(null);
      setSummaryKeywords([]);
      resetTranslations();
      return;
    }
    setLoading(true);
    setError(null);
    resetTranslations();
    try {
      const { results: searchResults, totalDocs: total, method } = await semanticSearch(searchQuery, '', 20);

      if (searchResults.length > 0) {
        const mapped = searchResults.map((doc) => ({
          ...doc,
          similarity: typeof doc.similarity === 'number' ? doc.similarity : 0,
        })) as RagDocument[];

        setResults(mapped);
        setSearchMethod(method);
        setTotalDocs(total);
        const topDocs = mapped.filter((d) => d.description && d.description.length > 30);
        if (topDocs.length >= 2) {
          lastQueryRef.current = searchQuery;
          fetchSummary(topDocs, searchQuery, topDocCount);
        } else {
          setSummary(null);
          setSummaryKeywords([]);
        }
      } else {
        // Fallback texte direct via Supabase
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('rag_documents')
          .select('id, titre, domaine, sous_domaine, pays, organisation, statut, description, mots_cles, type_document, content')
          .or(`titre.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
          .eq('est_public', true)
          .order('ordre_affichage', { ascending: true, nullsFirst: false })
          .limit(20);

        if (!fallbackError && fallbackData && fallbackData.length > 0) {
          const mapped = fallbackData.map((doc: any) => ({
            ...doc,
            similarity: 0,
          })) as RagDocument[];
          setResults(mapped);
          setSearchMethod('text_fallback');
          setTotalDocs(total);
          setSummary(null);
          setSummaryKeywords([]);
        } else {
          setResults([]);
          setSearchMethod('');
          setSummary(null);
          setSummaryKeywords([]);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Moteur de recherche sémantique temporairement indisponible');
      setResults([]);
      setSearchMethod('');
      setSummary(null);
      setSummaryKeywords([]);
    } finally {
      setLoading(false);
    }
  }, [semanticSearch, fetchSummary, topDocCount, resetTranslations]);

  useEffect(() => {
    if (queryParam && queryParam !== query) {
      setQuery(queryParam);
      searchRag(queryParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam]);

  // Charger les stats d'embeddings
  useEffect(() => {
    getEmbeddingStats().then(setEmbeddingStats).catch(() => {});
  }, [getEmbeddingStats]);

  useEffect(() => {
    if (lastQueryRef.current && results.length > 0 && !summaryLoading) {
      const topDocs = results.filter((d) => d.description && d.description.length > 30);
      if (topDocs.length >= 2) {
        fetchSummary(topDocs, lastQueryRef.current, topDocCount);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topDocCount]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setSearchParams({ rag: value });
    searchRag(value);
  };

  const handlePin = () => {
    if (!summary) return;
    pinSearch({
      query,
      summary,
      keywords: summaryKeywords,
      docCount: topDocCount,
    });
  };

  const handleUnpin = () => {
    const entry = history.find((h) => h.query === query);
    if (entry) unpinSearch(entry.id);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedHistoryIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const handleCompare = () => {
    if (selectedHistoryIds.length !== 2) return;
    const items = selectedHistoryIds
      .map((id) => history.find((h) => h.id === id))
      .filter(Boolean) as [PinnedSearch, PinnedSearch];
    if (items.length === 2) {
      setCompareItems(items);
      setSelectedHistoryIds([]);
    }
  };

  const handleCloseCompare = () => {
    setCompareItems(null);
  };

  return (
    <main className={`min-h-screen bg-background-50 ${printMode ? 'print-mode' : ''}`}>
      <SeoHead
        title={`Synthèse RAG — ${query || 'Recherche sémantique'} | Khepra Experts`}
        description="Moteur de recherche sémantique KOS Automaton — synthèse intelligente de documents réglementaires BCEAO, COBAC, OHADA, GAFI, CIMA, RGPD."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-accent-50/40 to-background-50 border-b border-background-200">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
          <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-accent-500 rounded-lg">
                <i className="ri-magic-line text-white text-sm"></i>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground-950">
                {t('Synthèse RAG', 'RAG Synthesis')}
              </h1>
              <span className="px-2 py-0.5 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">
                KOS Automaton
              </span>
            </div>
            <TranslateToggle lang={lang} setLang={setLang} targetLang={targetLang} setTargetLang={setTargetLang} targetLabels={targetLabels} />
          </div>

          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ri-search-line text-lg text-foreground-500"></i>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t(
                'Recherche sémantique — BCEAO, COBAC, OHADA, GAFI, CIMA, RGPD...',
                'Semantic search — BCEAO, COBAC, OHADA, FATF, CIMA, GDPR...'
              )}
              className="w-full pl-12 pr-12 py-4 bg-background-50 border border-background-200 rounded-xl text-sm text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
              {loading && (
                <div className="w-5 h-5 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
              )}
              {!loading && query.length > 0 && (
                <button
                  onClick={() => {
                    setQuery('');
                    setSearchParams({});
                    setResults([]);
                    setError(null);
                    setSearchMethod('');
                    setSummary(null);
                    setSummaryKeywords([]);
                    resetTranslations();
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-background-200 transition-colors cursor-pointer"
                  aria-label={t('Effacer la recherche', 'Clear search')}
                >
                  <i className="ri-close-line text-foreground-400"></i>
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
              <i className="ri-error-warning-line"></i>
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Top actions bar — Print mode + Translate All */}
        <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPrintMode(!printMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                printMode
                  ? 'bg-accent-500 text-white border-accent-500'
                  : 'bg-background-50 text-foreground-600 border-background-300 hover:border-accent-300'
              }`}
            >
              <i className={`${printMode ? 'ri-printer-fill' : 'ri-printer-line'}`}></i>
              {printMode ? t('Mode impression actif', 'Print mode active') : t('Mode impression', 'Print mode')}
            </button>
            {printMode && (
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors cursor-pointer"
              >
                <i className="ri-printer-line"></i>
                {t('Imprimer', 'Print')}
              </button>
            )}
          </div>
          {isEn && results.length > 0 && (
            <button
              onClick={handleTranslateAll}
              disabled={translatingAll}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                translatingAll
                  ? 'bg-background-100 text-foreground-400 border-background-200'
                  : 'bg-foreground-950 text-background-50 border-foreground-950 hover:bg-foreground-800'
              }`}
            >
              {translatingAll ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-background-50 border-t-transparent rounded-full animate-spin"></div>
                  {t('Traduction...', 'Translating...')}
                </>
              ) : (
                <>
                  <i className="ri-translate-2 text-sm"></i>
                  {t('Traduire tout', 'Translate All')}
                </>
              )}
            </button>
          )}
        </div>

        {/* Moteur KOS Automaton v2 + pgvector */}
        <div className="mb-6 p-4 bg-accent-50 border border-accent-200 rounded-xl">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <i className="ri-brain-line text-accent-600"></i>
              <span className="text-sm font-medium text-accent-800">
                {t(
                  `Moteur KOS Automaton v2 — ${totalDocs > 0 ? `${totalDocs} documents publics` : '100+ documents indexés'}`,
                  `KOS Automaton Engine v2 — ${totalDocs > 0 ? `${totalDocs} public documents` : '100+ indexed documents'}`
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">
                <i className="ri-sparkling-line text-xs"></i>
                TF-IDF Cosine
              </span>
              {embeddingStats && (
                <span 
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium cursor-help ${
                    embeddingStats.withEmbeddings > 0 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-background-100 text-foreground-500'
                  }`}
                  title={`${embeddingStats.withEmbeddings}/${embeddingStats.total} documents vectorisés via OpenAI text-embedding-3-small — pgvector cosine similarity prêt`}
                >
                  <i className="ri-database-2-line text-xs"></i>
                  <span>{embeddingStats.withEmbeddings}/{embeddingStats.total} {t('vectorisés', 'vectorized')}</span>
                  {embeddingStats.withEmbeddings > 0 && ` (${embeddingStats.percentComplete}%)`}
                </span>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-accent-700">
            {t(
              'Recherche hybride : TF-IDF Cosine (actif) + pgvector Cosine Similarity (activé dès que les embeddings sont générés).',
              'Hybrid search: TF-IDF Cosine (active) + pgvector Cosine Similarity (activated once embeddings are generated).'
            )}
            {embeddingStats && embeddingStats.withEmbeddings === 0 && ' ' + t(
              'Aucun embedding vectoriel pour le moment — la recherche sémantique classique reste opérationnelle.',
              'No vector embeddings yet — classic semantic search remains operational.'
            )}
          </p>
        </div>

        {/* History */}
        <RAGSyntheseHistory
          history={history}
          onUnpin={unpinSearch}
          onClear={clearHistory}
          selectedIds={selectedHistoryIds}
          onToggleSelect={handleToggleSelect}
          onCompare={handleCompare}
        />

        {/* Comparison view */}
        {compareItems && (
          <RAGSyntheseCompare
            items={compareItems}
            onClose={handleCloseCompare}
          />
        )}

        {/* Results + Synthesis */}
        {query.length >= 3 && (
          <RAGSyntheseResults
            query={query}
            results={results}
            summary={summary}
            summaryLoading={summaryLoading}
            summaryKeywords={summaryKeywords}
            totalDocs={totalDocs}
            searchMethod={searchMethod}
            topDocCount={topDocCount}
            onTopDocCountChange={setTopDocCount}
            isPinned={isPinned(query)}
            onPin={handlePin}
            onUnpin={handleUnpin}
            lang={lang}
            isEn={isEn}
            t={t}
            translateText={translateText}
            translateBatch={translateBatch}
            translating={translating}
            translatedSummary={translatedSummary}
            translatedKw={translatedKw}
            translatedItems={translatedItems}
            onTranslateItem={handleTranslateItem}
          />
        )}

        {query.length < 3 && !compareItems && (
          <div className="text-center py-16">
            <i className="ri-search-2-line text-4xl text-foreground-300 mb-4 block"></i>
            <p className="text-foreground-600 font-medium mb-1">
              {t('Entrez une recherche', 'Enter a search')}
            </p>
            <p className="text-sm text-foreground-400">
              {t(
                'Saisissez au moins 3 caractères pour lancer une recherche sémantique',
                'Enter at least 3 characters to launch a semantic search'
              )}
            </p>
          </div>
        )}

        {query.length >= 3 && results.length === 0 && !loading && !error && (
          <div className="text-center py-16">
            <i className="ri-search-2-line text-4xl text-foreground-300 mb-4 block"></i>
            <p className="text-foreground-600 font-medium mb-1">
              {t('Aucun document trouvé', 'No documents found')}
            </p>
            <p className="text-sm text-foreground-400">
              {t(
                'Essayez avec d\'autres termes réglementaires ou élargissez votre recherche',
                'Try other regulatory terms or broaden your search'
              )}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}



