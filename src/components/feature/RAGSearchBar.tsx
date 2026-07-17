import { useNavigate } from 'react-router-dom';
import { useRAGHistory } from '@/pages/rag-synthese/hooks/useRAGHistory';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '@/lib/supabase';
import { useSemanticSearch } from '@/hooks/useSemanticSearch';
import RAGSynthesePDFExport from '@/pages/rag-synthese/components/RAGSynthesePDFExport';
import type { RagDocument, AutomatonSummarizeResponse } from '@/pages/rag-synthese/types';
import type { EmbeddingStats } from '@/hooks/useSemanticSearch';

export default function RAGSearchBar() {
  const navigate = useNavigate();
  const { search: semanticSearch, getEmbeddingStats } = useSemanticSearch();
  const { pinSearch, unpinSearch, isPinned: isQueryPinned } = useRAGHistory();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RagDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDomaine, setSelectedDomaine] = useState<string>('');
  const [showAll, setShowAll] = useState(false);
  const [searchMethod, setSearchMethod] = useState<string>('');
  const [totalDocs, setTotalDocs] = useState(0);
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryKeywords, setSummaryKeywords] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);
  const [pdfExporting, setPdfExporting] = useState(false);
  const [topDocCount, setTopDocCount] = useState(3);
  const [embeddingStats, setEmbeddingStats] = useState<EmbeddingStats | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const lastQueryRef = useRef<string>('');
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const portalRootRef = useRef<HTMLDivElement | null>(null);

  // Créer le container portal une seule fois
  useEffect(() => {
    const div = document.createElement('div');
    div.id = 'rag-search-portal-root';
    div.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99990;';
    document.body.appendChild(div);
    portalRootRef.current = div;
    return () => {
      if (div.parentNode) div.parentNode.removeChild(div);
      portalRootRef.current = null;
    };
  }, []);

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // Est-ce dans le container de la searchbar ?
      if (containerRef.current && containerRef.current.contains(target)) return;
      // Est-ce dans le dropdown ?
      if (dropdownRef.current && dropdownRef.current.contains(target)) return;
      // Sinon, fermer
      setIsOpen(false);
    };
    // Utiliser capture pour intercepter avant que d'autres handlers ferment
    document.addEventListener('mousedown', handleClickOutside, true);
    // Également fermer sur Escape
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  // Mettre à jour la position du dropdown
  useEffect(() => {
    if (!isOpen) return;
    const updatePos = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDropdownPos({
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width,
        });
      }
    };
    updatePos();
    window.addEventListener('scroll', updatePos, true);
    window.addEventListener('resize', updatePos);
    return () => {
      window.removeEventListener('scroll', updatePos, true);
      window.removeEventListener('resize', updatePos);
    };
  }, [isOpen]);

  // Charger les stats d'embeddings
  useEffect(() => {
    getEmbeddingStats().then(setEmbeddingStats).catch(() => {});
  }, [getEmbeddingStats]);

  // Re-générer le résumé quand topDocCount change
  useEffect(() => {
    if (lastQueryRef.current && results.length > 0 && !summaryLoading) {
      const topDocs = results.filter((d) => d.description && d.description.length > 30);
      if (topDocs.length >= 2 && topDocs.length >= topDocCount) {
        fetchSummary(topDocs, lastQueryRef.current, topDocCount);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topDocCount]);

  const fetchSummary = useCallback(async (topDocs: RagDocument[], searchQuery: string, count: number = 3) => {
    if (topDocs.length < 2) return;
    setSummaryLoading(true);
    setSummary(null);
    setSummaryKeywords([]);
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
      // Silencieux
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const searchRag = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([]);
      setError(null);
      setSearchMethod('');
      setSummary(null);
      setSummaryKeywords([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setError(null);

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
        setIsOpen(true);
        lastQueryRef.current = searchQuery;

        const topDocs = mapped.filter((d) => d.description && d.description.length > 30);
        if (topDocs.length >= 2) {
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
          setIsOpen(true);
          setSummary(null);
          setSummaryKeywords([]);
        } else {
          setResults([]);
          setSearchMethod('');
          setSummary(null);
          setSummaryKeywords([]);
          setIsOpen(true);
        }
      }
    } catch (err: any) {
      // Fallback textuel en cas d'erreur
      try {
        const { data: fallbackData } = await supabase
          .from('rag_documents')
          .select('id, titre, domaine, sous_domaine, pays, organisation, statut, description, mots_cles, type_document, content')
          .or(`titre.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
          .eq('est_public', true)
          .order('ordre_affichage', { ascending: true, nullsFirst: false })
          .limit(20);

        if (fallbackData && fallbackData.length > 0) {
          const mapped = fallbackData.map((doc: any) => ({
            ...doc,
            similarity: 0,
          })) as RagDocument[];
          setResults(mapped);
          setSearchMethod('text_fallback');
          setIsOpen(true);
          setSummary(null);
          setSummaryKeywords([]);
          return;
        }
      } catch {
        // ignore
      }

      setError(err?.message || 'Moteur de recherche sémantique temporairement indisponible');
      setResults([]);
      setSearchMethod('');
      setSummary(null);
      setSummaryKeywords([]);
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  }, [semanticSearch, fetchSummary, topDocCount]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setSummary(null);
    setSummaryKeywords([]);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 3) {
      setResults([]);
      setError(null);
      setSearchMethod('');
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => searchRag(value), 250);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setError(null);
    setSearchMethod('');
    setSummary(null);
    setSummaryKeywords([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleShare = async () => {
    if (!summary) return;
    const searchName = lastQueryRef.current || 'recherche';
    const shareUrl = `${window.location.origin}/rag-synthese?rag=${encodeURIComponent(searchName)}`;
    const shareText = `Synthèse RAG — "${searchName}"\n\n${summary.slice(0, 200)}${summary.length > 200 ? '...' : ''}\n\n${shareUrl}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `Synthèse RAG — ${searchName}`, text: shareText, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareText);
      }
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch { /* annulé */ }
  };

  const handleDownload = () => {
    if (!summary) return;
    const searchName = lastQueryRef.current || 'recherche';
    const sanitized = searchName.replace(/[^a-z0-9à-û\s-]/gi, '').replace(/\s+/g, '-').slice(0, 40);
    const filename = `synthese-rag-${sanitized}.txt`;
    const content = `Synthèse RAG — "${searchName}"\nGénéré par KOS REGTECH AI\n${'─'.repeat(50)}\n\n${summary}\n\n${summaryKeywords.length > 0 ? `Mots-clés : ${summaryKeywords.join(', ')}\n\n` : ''}Avertissement : Résumé extractif généré automatiquement à partir des ${topDocCount} documents réglementaires les plus pertinents.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const domaines = Array.from(new Set(results.map((r) => r.domaine).filter(Boolean))).sort();
  const filteredResults = selectedDomaine
    ? results.filter((r) => r.domaine === selectedDomaine)
    : results;
  const displayedResults = showAll ? filteredResults : filteredResults.slice(0, 5);

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'En vigueur': return 'bg-emerald-100 text-emerald-700';
      case 'Révisé': return 'bg-amber-100 text-amber-700';
      case 'Abrogé': return 'bg-red-100 text-red-700';
      default: return 'bg-background-200 text-foreground-600';
    }
  };

  const getDomaineIcon = (domaine: string) => {
    const d = domaine.toLowerCase();
    if (d.includes('régulation') || d.includes('bceao')) return 'ri-bank-line';
    if (d.includes('lbc') || d.includes('conformité') || d.includes('gafi')) return 'ri-shield-check-line';
    if (d.includes('prix de transfert') || d.includes('beps')) return 'ri-exchange-dollar-line';
    if (d.includes('gouvernance')) return 'ri-organization-chart';
    if (d.includes('protection') || d.includes('rgpd')) return 'ri-lock-line';
    if (d.includes('ia') || d.includes('intelligence')) return 'ri-robot-line';
    if (d.includes('cyber')) return 'ri-shield-flash-line';
    if (d.includes('méthodolog')) return 'ri-tools-line';
    if (d.includes('contrôle interne')) return 'ri-check-double-line';
    if (d.includes('fintech')) return 'ri-smartphone-line';
    if (d.includes('audit')) return 'ri-search-eye-line';
    if (d.includes('droit') || d.includes('ohada')) return 'ri-scales-3-line';
    if (d.includes('esg') || d.includes('durabil')) return 'ri-leaf-line';
    if (d.includes('cobac')) return 'ri-building-2-line';
    if (d.includes('microfinance') || d.includes('sfd')) return 'ri-money-dollar-circle-line';
    if (d.includes('cima') || d.includes('assurance')) return 'ri-umbrella-line';
    return 'ri-file-text-line';
  };

  const getSimilarityWidth = (sim: number) => `${Math.round(sim * 100)}%`;

  const renderDropdown = () => {
    if (!isOpen || !portalRootRef.current) return null;

    // Loading state
    if (query.length >= 3 && loading) {
      return createPortal(
        <div
          ref={dropdownRef}
          className="bg-white border border-background-200 rounded-2xl overflow-hidden"
          style={{
            position: 'fixed',
            top: `${dropdownPos.top}px`,
            left: `${dropdownPos.left}px`,
            width: `${dropdownPos.width}px`,
            pointerEvents: 'auto',
            boxShadow: '0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div className="p-8 text-center">
            <div className="w-10 h-10 border-3 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-foreground-700 font-medium mb-1">Recherche sémantique en cours...</p>
            <p className="text-xs text-foreground-400">Analyse TF-IDF Cosine des 100+ documents réglementaires</p>
          </div>
        </div>,
        portalRootRef.current
      );
    }

    // Empty results
    if (query.length >= 3 && results.length === 0 && !loading && !error) {
      return createPortal(
        <div
          ref={dropdownRef}
          className="bg-white border border-background-200 rounded-2xl overflow-hidden"
          style={{
            position: 'fixed',
            top: `${dropdownPos.top}px`,
            left: `${dropdownPos.left}px`,
            width: `${dropdownPos.width}px`,
            pointerEvents: 'auto',
            boxShadow: '0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div className="p-8 text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl mx-auto mb-4 bg-background-100">
              <i className="ri-search-2-line text-2xl text-foreground-300"></i>
            </div>
            <p className="text-foreground-600 font-medium mb-1">Aucun document trouvé</p>
            <p className="text-sm text-foreground-400">Essayez avec d&apos;autres termes réglementaires</p>
          </div>
        </div>,
        portalRootRef.current
      );
    }

    // Results
    if (results.length > 0) {
      return createPortal(
        <div
          ref={dropdownRef}
          className="bg-white border border-background-200 rounded-2xl overflow-hidden"
          style={{
            position: 'fixed',
            top: `${dropdownPos.top}px`,
            left: `${dropdownPos.left}px`,
            width: `${dropdownPos.width}px`,
            pointerEvents: 'auto',
            boxShadow: '0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {/* Header avec stats + filtre domaines */}
          <div className="p-4 border-b border-background-200 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground-500 uppercase tracking-wide">
                  {results.length} document{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
                </span>
                {totalDocs > 0 && (
                  <span className="text-xs text-foreground-400">sur {totalDocs} références</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {searchMethod && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">
                    <i className="ri-brain-line text-xs"></i>
                    TF-IDF Cosine
                  </span>
                )}
                {embeddingStats && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      embeddingStats.withEmbeddings > 0
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-background-100 text-foreground-500'
                    }`}
                    title={`${embeddingStats.withEmbeddings}/${embeddingStats.total} documents vectorisés (${embeddingStats.percentComplete}%)`}
                  >
                    <i className="ri-database-2-line text-xs"></i>
                    <span>{embeddingStats.withEmbeddings}/{embeddingStats.total}</span>
                  </span>
                )}
              </div>
            </div>
            {domaines.length > 1 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDomaine('')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    selectedDomaine === '' ? 'bg-accent-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                  }`}
                >
                  Tous
                </button>
                {domaines.map((domaine) => (
                  <button
                    key={domaine}
                    onClick={() => setSelectedDomaine(domaine)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      selectedDomaine === domaine ? 'bg-accent-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                    }`}
                  >
                    {domaine}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Panneau Synthèse RAG */}
          {(summary || summaryLoading) && (
            <div className="border-b border-background-200 bg-gradient-to-r from-accent-50/60 to-background-50">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-accent-500 text-white mt-0.5">
                    <i className="ri-magic-line text-lg"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h4 className="font-semibold text-sm text-foreground-950">Synthèse RAG</h4>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">
                        <i className="ri-sparkling-line text-xs"></i>
                        KOS REGTECH AI Automaton v2
                      </span>
                      {[3, 5, 10].map((n) => (
                        <button
                          key={n}
                          onClick={() => setTopDocCount(n)}
                          className={`px-2 py-0.5 rounded text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                            topDocCount === n ? 'bg-accent-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                          }`}
                        >
                          Top {n}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate(`/rag-synthese?rag=${encodeURIComponent(lastQueryRef.current || '')}`);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer border border-accent-300 bg-accent-50 text-accent-700 hover:bg-accent-100"
                      >
                        <i className="ri-external-link-line text-xs"></i>
                        Voir la page
                      </button>
                      {summary && !summaryLoading && (
                        <>
                          <button
                            onClick={async () => {
                              try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer border border-background-300 hover:bg-background-100 hover:border-accent-300"
                          >
                            {copied ? <><i className="ri-check-line text-emerald-600 text-xs"></i><span className="text-emerald-600">Copié !</span></> : <><i className="ri-file-copy-line text-foreground-500 text-xs"></i><span className="text-foreground-600">Copier</span></>}
                          </button>
                          <button onClick={handleDownload} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer border border-background-300 hover:bg-background-100 hover:border-accent-300">
                            {downloaded ? <><i className="ri-check-line text-emerald-600 text-xs"></i><span className="text-emerald-600">Téléchargé !</span></> : <><i className="ri-download-line text-foreground-500 text-xs"></i><span className="text-foreground-600">.txt</span></>}
                          </button>
                          <button onClick={handleShare} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer border border-background-300 hover:bg-background-100 hover:border-accent-300">
                            {shared ? <><i className="ri-check-line text-emerald-600 text-xs"></i><span className="text-emerald-600">Partagé !</span></> : <><i className="ri-share-line text-foreground-500 text-xs"></i><span className="text-foreground-600">Partager</span></>}
                          </button>
                          <RAGSynthesePDFExport
                            query={lastQueryRef.current || ''}
                            summary={summary}
                            keywords={summaryKeywords}
                            results={results.slice(0, topDocCount).map((r) => ({ titre: r.titre, domaine: r.domaine, organisation: r.organisation, pays: r.pays, statut: r.statut, description: r.description }))}
                            docCount={topDocCount}
                            onExportStart={() => setPdfExporting(true)}
                            onExportEnd={() => setPdfExporting(false)}
                          />
                          {pdfExporting && (
                            <span className="inline-flex items-center gap-1 text-xs text-foreground-400">
                              <div className="w-3 h-3 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
                              PDF...
                            </span>
                          )}
                          <button
                            onClick={() => {
                              const q = lastQueryRef.current || '';
                              if (isQueryPinned(q)) {
                                const entry = JSON.parse(localStorage.getItem('khepra-rag-history') || '[]').find((h: { query: string }) => h.query === q);
                                if (entry) unpinSearch(entry.id);
                              } else {
                                pinSearch({ query: q, summary, keywords: summaryKeywords, docCount: topDocCount });
                              }
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer border ${
                              isQueryPinned(lastQueryRef.current || '') ? 'border-accent-300 bg-accent-50 text-accent-700' : 'border-background-300 hover:bg-background-100 hover:border-accent-300'
                            }`}
                          >
                            <i className={`${isQueryPinned(lastQueryRef.current || '') ? 'ri-pushpin-fill' : 'ri-pushpin-line'} ${isQueryPinned(lastQueryRef.current || '') ? 'text-accent-600' : 'text-foreground-500'} text-xs`}></i>
                            <span>{isQueryPinned(lastQueryRef.current || '') ? 'Épinglé' : 'Épingler'}</span>
                          </button>
                        </>
                      )}
                      {summaryLoading && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-background-100 text-foreground-500 rounded-full text-xs">
                          <div className="w-3 h-3 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
                          Génération...
                        </span>
                      )}
                    </div>
                    {summaryLoading && !summary ? (
                      <div className="space-y-2 mt-3">
                        <div className="h-3 bg-background-200 rounded animate-pulse w-full"></div>
                        <div className="h-3 bg-background-200 rounded animate-pulse w-11/12"></div>
                        <div className="h-3 bg-background-200 rounded animate-pulse w-4/5"></div>
                      </div>
                    ) : summary ? (
                      <>
                        <p className="text-sm text-foreground-700 leading-relaxed">{summary}</p>
                        {summaryKeywords.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {summaryKeywords.slice(0, 6).map((kw) => (
                              <span key={kw} className="px-2.5 py-1 bg-accent-100/70 text-accent-800 rounded-md text-xs font-medium whitespace-nowrap">{kw}</span>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-foreground-400 mt-2 flex items-center gap-1">
                          <i className="ri-information-line"></i>
                          Résumé extractif — Top {topDocCount} documents via TF-IDF Cosine Similarity
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Liste des résultats */}
          <div className="max-h-[420px] overflow-y-auto divide-y divide-background-200 bg-white">
            {displayedResults.map((doc, idx) => (
              <div key={doc.id || idx} className="p-4 hover:bg-background-100 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-accent-100 rounded-lg flex-shrink-0 mt-0.5">
                    <i className={`${getDomaineIcon(doc.domaine)} text-accent-600 text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-semibold text-sm text-foreground-950 leading-snug">{doc.titre}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${getStatutBadge(doc.statut)}`}>{doc.statut}</span>
                    </div>
                    <p className="text-xs text-foreground-500 mb-2 line-clamp-2">{doc.description}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-foreground-400 mb-2">
                      <span className="flex items-center gap-1"><i className="ri-building-line"></i>{doc.organisation}</span>
                      <span className="flex items-center gap-1"><i className="ri-earth-line"></i>{doc.pays}</span>
                      <span className="flex items-center gap-1"><i className="ri-file-text-line"></i>{doc.type_document}</span>
                    </div>
                    {doc.similarity > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-background-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: getSimilarityWidth(doc.similarity),
                              background: doc.similarity >= 0.7 ? 'oklch(var(--accent-500))' : doc.similarity >= 0.4 ? 'oklch(var(--secondary-500))' : 'oklch(var(--foreground-300))',
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold whitespace-nowrap" style={{ color: doc.similarity >= 0.7 ? 'oklch(var(--accent-700))' : doc.similarity >= 0.4 ? 'oklch(var(--secondary-700))' : 'oklch(var(--foreground-400))' }}>
                          {Math.round(doc.similarity * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredResults.length > 5 && (
            <div className="p-3 border-t border-background-200 bg-white">
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full py-2 text-sm text-accent-600 hover:text-accent-700 font-medium text-center transition-colors cursor-pointer"
              >
                {showAll ? 'Afficher moins' : `Voir les ${filteredResults.length} résultats`}
              </button>
            </div>
          )}
        </div>,
        portalRootRef.current
      );
    }

    return null;
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <i className="ri-search-line text-lg text-foreground-500"></i>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => { if (query.length >= 3 && results.length > 0) setIsOpen(true); }}
          placeholder="Recherche sémantique — BCEAO, COBAC, OHADA, GAFI, CIMA, RGPD..."
          className="w-full pl-12 pr-12 py-4 bg-background-50 border border-background-200 rounded-xl text-sm text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
          {loading && (
            <>
              <div className="w-5 h-5 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-foreground-400 hidden sm:inline whitespace-nowrap">Recherche...</span>
            </>
          )}
          {!loading && query.length > 0 && (
            <button onClick={handleClear} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-background-200 transition-colors cursor-pointer" aria-label="Effacer la recherche">
              <i className="ri-close-line text-foreground-400"></i>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
          <i className="ri-error-warning-line"></i>
          {error}
        </div>
      )}

      {renderDropdown()}
    </div>
  );
}