import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import ScrollToTop from '@/components/feature/ScrollToTop';
import { supabase } from '@/lib/supabase';
import DOMPurify from 'dompurify';

interface SearchResult {
  id: string;
  title: string;
  regulator: string;
  content_snippet: string;
  score: number;
  v_score: number;
  f_score: number;
  kg_score: number;
  m_score: number;
  citation: string;
  relevance?: string;
  type?: string;
  effective_date?: string;
}

interface SearchResponse {
  answer?: string;
  sources?: SearchResult[];
  risk_score?: number;
  latency_ms?: number;
  engine?: string;
  model?: string;
  big_four_certified?: boolean;
  iso42001_controls?: string[];
  audit_trail_hash?: string;
  cache_hit?: boolean;
  quality_score?: number;
  kg_entities?: Array<{
    id: string;
    name: string;
    type: string;
    regulator: string;
    score: number;
  }>;
}

export default function searchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [riskMode, setRiskMode] = useState(false);
  const [synthesis, setSynthesis] = useState<string | null>(null);
  const [meta, setMeta] = useState<SearchResponse | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sanitizeSynthesis = (raw: string): string => {
    if (!raw) return '';
    // 1. Strip dark inline styles aggressively
    let cleaned = raw
      .replace(/style=["'][^"']*background(?:-color)?:\s*#?(?:0d1117|111|1a1a1a|000|0a0a0a|1f2937|111827|161b22|21262d)[^"']*["']/gi, '')
      .replace(/style=["'][^"']*color:\s*#?(?:9ca3af|6b7280|4b5563|374151|6c757d|adb5bd|8b949e|c9d1d9)[^"']*["']/gi, '')
      .replace(/class=["'][^"']*dark[^"']*["']/gi, '');
    // 2. DOMPurify sanitize — security + XSS protection
    return DOMPurify.sanitize(cleaned, {
      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br', 'hr', 'blockquote', 'pre', 'code', 'span', 'div', 'section'],
      ALLOWED_ATTR: ['href', 'target', 'class'],
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fetchResults = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setSynthesis(null);
    setMeta(null);

    try {
      const { data, error: err } = await supabase.rpc('kos_search_cached', {
        p_query: searchQuery,
        p_top_k: 10,
        p_ttl_minutes: 60,
      });

      if (err) throw err;

      const response = data as unknown as SearchResponse;

      if (!response || !response.sources || response.sources.length === 0) {
        setResults([]);
        setMeta(response || null);
        return;
      }

      setResults(response.sources);
      setMeta(response);

      if (response.answer && typeof response.answer === 'string') {
        setSynthesis(sanitizeSynthesis(response.answer));
      }
    } catch (e: any) {
      console.error('KOS Search error:', e);
      setError(e.message || 'Recherche impossible');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [riskMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    fetchResults(query);
  };

  const getRelevanceColor = (relevance?: string) => {
    switch (relevance) {
      case 'critical': return { bg: 'oklch(var(--accent-500) / 0.12)', text: 'var(--accent-700)', border: 'oklch(var(--accent-500) / 0.25)' };
      case 'high': return { bg: 'oklch(var(--secondary-500) / 0.12)', text: 'var(--secondary-700)', border: 'oklch(var(--secondary-500) / 0.25)' };
      default: return { bg: 'oklch(var(--primary-500) / 0.08)', text: 'var(--primary-700)', border: 'oklch(var(--primary-500) / 0.2)' };
    }
  };

  const getRelevanceLabel = (relevance?: string) => {
    switch (relevance) {
      case 'critical': return 'CRITIQUE';
      case 'high': return 'ÉLEVÉ';
      default: return 'MOYEN';
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      <ScrollToTop />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 bg-primary-500/10 border border-primary-500/20">
            <i className="ri-search-line text-primary-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-500">KOS REGTECH AI™ — Recherche Réglementaire</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Recherche KOS REGTECH AI Big Four
          </h1>
          <p className="text-lg mb-2 text-primary-500">
            Moteur de Recherche RAG Niveau Bloomberg
          </p>
          <p className="text-sm text-foreground-400">
            Hybrid Search 50% Vecteur + 30% Full-Text + 15% Méta + 5% Knowledge Graph
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="relative z-10 -mt-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-background-200 p-3 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400 text-lg" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un texte réglementaire, une directive, une obligation..."
              className="w-full pl-11 pr-4 py-4 rounded-xl bg-background-50 border border-background-200 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRiskMode(!riskMode)}
              className={`flex items-center gap-1.5 px-3 py-4 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
                riskMode
                  ? 'bg-accent-100 text-accent-900 border border-accent-300'
                  : 'bg-background-50 text-foreground-600 border border-background-200 hover:border-foreground-300'
              }`}
            >
              <i className={`${riskMode ? 'ri-alert-fill' : 'ri-alert-line'} text-sm`} />
              Risk
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-wait bg-primary-500 text-white"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin" />
                  Recherche...
                </>
              ) : (
                <>
                  <i className="ri-search-line" />
                  Rechercher
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      {/* Results */}
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary-500 border-t-transparent mx-auto" />
              <p className="mt-4 text-sm text-foreground-500">Recherche KOS REGTECH AI Big Four en cours...</p>
              <p className="text-xs text-foreground-400 mt-1">Hybrid Search + Rerank + Knowledge Graph</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="text-center p-8 rounded-xl bg-red-50 border border-red-200 max-w-lg">
              <i className="ri-error-warning-line text-3xl text-red-600 mb-3 block" />
              <p className="text-sm text-red-800 font-semibold">{error}</p>
              <p className="text-xs text-red-600 mt-2">Erreur SQL corrigée — actualisez la page et réessayez. Si le problème persiste, contactez l'équipe KOS REGTECH AI.</p>
            </div>
          </div>
        )}

        {!loading && !error && hasSearched && results.length === 0 && (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-4 bg-primary-500/8">
                <i className="ri-file-search-line text-2xl text-primary-500" />
              </div>
              <p className="text-foreground-600 font-medium">Aucun résultat pour &quot;{query}&quot;</p>
              <p className="text-xs text-foreground-400 mt-1">Essayez avec des termes réglementaires spécifiques: &quot;directive&quot;, &quot;circulaire&quot;, &quot;instruction&quot;, &quot;agrément&quot;.</p>
            </div>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <>
            {/* Audit Trail Bar */}
            {meta && (
              <div className="mb-6 flex flex-wrap items-center gap-3 text-[11px] text-foreground-500 font-mono bg-background-100 rounded-lg px-4 py-2 border border-background-200">
                <span className="flex items-center gap-1"><i className="ri-shield-check-line text-primary-500" /> ISO 27001/42001</span>
                <span className="text-foreground-300">|</span>
                <span className="flex items-center gap-1"><i className="ri-database-2-line" /> 100% interne</span>
                <span className="text-foreground-300">|</span>
                <span className="flex items-center gap-1"><i className="ri-time-line" /> {Math.round(meta.latency_ms || 0)}ms</span>
                <span className="text-foreground-300">|</span>
                <span className="flex items-center gap-1"><i className="ri-cpu-line" /> {meta.engine || 'internal'}</span>
                {meta.cache_hit && (
                  <>
                    <span className="text-foreground-300">|</span>
                    <span className="flex items-center gap-1 text-green-600 font-bold"><i className="ri-flashlight-line" /> Cache</span>
                  </>
                )}
                {meta.risk_score !== undefined && meta.risk_score > 0 && (
                  <>
                    <span className="text-foreground-300">|</span>
                    <span className="flex items-center gap-1 text-accent-700 font-bold">
                      <i className="ri-alert-line" />
                      Risque: {(meta.risk_score * 100).toFixed(0)}%
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Synthesis */}
            {synthesis && (
              <div className="mb-8 rounded-xl border border-primary-500/20 overflow-hidden bg-white">
                <div className="flex items-center gap-2 px-6 py-3 bg-primary-500/5 border-b border-primary-500/10">
                  <div className="w-6 h-6 flex items-center justify-center rounded-md bg-primary-500/15 flex-shrink-0">
                    <i className="ri-brain-line text-xs text-primary-700" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-700">Synthèse Big Four — KOS REGTECH AI Response</span>
                  {meta?.big_four_certified && (
                    <span className="ml-auto flex items-center gap-1 text-[10px] bg-primary-500/10 text-primary-700 px-2 py-0.5 rounded-full font-bold">
                      <i className="ri-checkbox-circle-line" /> CERTIFIÉ
                    </span>
                  )}
                </div>
                <style>{`
                  .kos-synthesis-scope * { color: #1a1a1a !important; }
                  .kos-synthesis-scope div, .kos-synthesis-scope section, .kos-synthesis-scope article,
                  .kos-synthesis-scope aside, .kos-synthesis-scope header, .kos-synthesis-scope footer { background-color: #ffffff !important; }
                  .kos-synthesis-scope p, .kos-synthesis-scope span, .kos-synthesis-scope li,
                  .kos-synthesis-scope td, .kos-synthesis-scope th { background-color: transparent !important; }
                  .kos-synthesis-scope h1, .kos-synthesis-scope h2, .kos-synthesis-scope h3,
                  .kos-synthesis-scope h4, .kos-synthesis-scope h5, .kos-synthesis-scope h6 { color: #111111 !important; background-color: transparent !important; }
                  .kos-synthesis-scope a { color: #b8860b !important; text-decoration: underline !important; }
                  .kos-synthesis-scope table { border-color: #e5e5e5 !important; }
                  .kos-synthesis-scope th { background-color: #f8f8f8 !important; color: #1a1a1a !important; border-color: #e5e5e5 !important; }
                  .kos-synthesis-scope td { border-color: #e5e5e5 !important; }
                  .kos-synthesis-scope hr { border-color: #e5e5e5 !important; }
                  .kos-synthesis-scope blockquote { border-left-color: #D4AF37 !important; background: #fafafa !important; }
                  .kos-synthesis-scope pre, .kos-synthesis-scope code { background-color: #f5f5f5 !important; color: #1a1a1a !important; }
                  .kos-synthesis-scope .kos-citations { font-size: 11px; line-height: 1.6; white-space: pre-wrap; }
                  .kos-synthesis-scope .kos-meta { font-size: 12px; color: #555; margin-bottom: 12px; }
                  .kos-synthesis-scope h2 { font-size: 18px; font-weight: 700; margin: 16px 0 8px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
                  .kos-synthesis-scope h3 { font-size: 14px; font-weight: 600; margin: 12px 0 6px; color: #333; }
                  .kos-synthesis-scope ul { margin: 6px 0; padding-left: 20px; }
                  .kos-synthesis-scope li { margin: 3px 0; }
                `}</style>
                <div
                  className="kos-synthesis-scope px-6 py-5 text-sm leading-relaxed"
                  style={{ background: '#ffffff' }}
                  dangerouslySetInnerHTML={{ __html: synthesis }}
                />
              </div>
            )}

            {/* Stats bar */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground-950 font-playfair">
                  {results.length} document{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
                </h2>
                <p className="text-xs text-foreground-500 mt-0.5">
                  pour &quot;{query}&quot; {riskMode && <span className="text-accent-600 font-semibold">— Mode Risque activé</span>}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-foreground-500">
                <span className="flex items-center gap-1"><i className="ri-database-2-line" /> 100% interne</span>
                <span className="flex items-center gap-1 text-primary-600"><i className="ri-shield-check-line" /> ISO 27001/42001</span>
              </div>
            </div>

            {/* Knowledge Graph entities */}
            {meta?.kg_entities && meta.kg_entities.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-secondary-50 border border-secondary-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-800 mb-2 flex items-center gap-1.5">
                  <i className="ri-node-tree" /> Entités Knowledge Graph
                </h4>
                <div className="flex flex-wrap gap-2">
                  {meta.kg_entities.map((e) => (
                    <span key={e.id} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-secondary-100 text-secondary-800 border border-secondary-200">
                      {e.name} <span className="text-secondary-500 font-normal">({e.type}) {e.score}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Results cards */}
            <div className="space-y-4">
              {results.map((r, idx) => {
                const colors = getRelevanceColor(r.relevance);
                return (
                  <div
                    key={r.id}
                    className="bg-white rounded-xl p-5 md:p-6 border border-background-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-background-100 text-foreground-500 text-xs font-bold font-mono">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-foreground-950 mb-1.5 leading-snug">
                          {r.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-2.5 py-1 rounded-full font-bold bg-primary-100 text-primary-800 border border-primary-200">
                            {r.regulator}
                          </span>
                          {r.type && (
                            <span className="px-2 py-0.5 rounded-md bg-background-100 text-foreground-600 border border-background-200 text-[10px] uppercase">
                              {r.type}
                            </span>
                          )}
                          {r.relevance && (
                            <span
                              className="px-2.5 py-1 rounded-full font-bold text-[11px]"
                              style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                            >
                              {getRelevanceLabel(r.relevance)}
                            </span>
                          )}
                          <span className="text-foreground-500 font-mono text-[11px]">
                            Score: {(r.score * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-foreground-700 mb-3 leading-relaxed pl-10">
                      {r.content_snippet}
                    </p>

                    {/* Score breakdown */}
                    <div className="pl-10 flex flex-wrap items-center gap-3 text-[11px] text-foreground-400 font-mono mb-3">
                      <span className="flex items-center gap-1" title="Vecteur 50%">
                        <i className="ri-bar-chart-box-line" />
                        V:{(r.v_score * 100).toFixed(0)}%
                      </span>
                      <span className="flex items-center gap-1" title="Full-Text 30%">
                        <i className="ri-file-text-line" />
                        F:{(r.f_score * 100).toFixed(0)}%
                      </span>
                      <span className="flex items-center gap-1" title="Méta 15%">
                        <i className="ri-stack-line" />
                        M:{(r.m_score * 100).toFixed(0)}%
                      </span>
                      <span className="flex items-center gap-1" title="Knowledge Graph 5%">
                        <i className="ri-node-tree" />
                        KG:{(r.kg_score * 100).toFixed(0)}%
                      </span>
                    </div>

                    <div className="pl-10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-foreground-400 border-t border-background-100 pt-3">
                      <span className="font-mono">{r.citation}</span>
                      {r.effective_date && (
                        <span className="flex items-center gap-1 text-foreground-500">
                          <i className="ri-calendar-line" />
                          {new Date(r.effective_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Empty state — initial */}
        {!hasSearched && !loading && (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl mx-auto mb-6 bg-primary-500/6">
                <i className="ri-search-line text-3xl text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground-950 font-playfair mb-2">
                Moteur de Recherche Réglementaire Big Four
              </h3>
              <p className="text-sm text-foreground-500 mb-6">
                Recherchez dans la base de connaissances réglementaires KOS REGTECH AI. BCEAO, COBAC, UEMOA, CEMAC, OHADA, GAFI, BEAC, CIMA — 8 autorités couvertes, 462 documents indexés.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  'Directive UEMOA 007-2024',
                  'Circulaire BCEAO 004-2020',
                  'Règlement COBAC R-2024/01',
                  'Normes GAFI LBC/FT',
                  'Acte Uniforme OHADA',
                  'Instruction BCEAO 003-2018',
                ].map((example, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setQuery(example);
                      setHasSearched(true);
                      fetchResults(example);
                    }}
                    className="text-left px-3 py-2 rounded-lg bg-background-100 border border-background-200 text-foreground-600 hover:text-foreground-900 hover:border-foreground-300 cursor-pointer transition-all text-[11px] truncate"
                  >
                    <i className="ri-arrow-right-up-line mr-1 text-[10px] text-primary-500" />
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <section className="py-16 bg-foreground-950">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-3">
            KOS REGTECH AI™
          </h2>
          <p className="text-sm text-foreground-400 mb-8">
            Knowledge Operating System — Intelligence Réglementaire Panafricaine
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/memo-evaluation-kos/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-primary-500/10 text-primary-400 border border-primary-500/25"
            >
              <i className="ri-file-text-line" />
              Mémo Évaluation KOS REGTECH AI
            </Link>
            <Link
              to="/plateforme-regtech/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-white/6 text-foreground-300 border border-white/10"
            >
              <i className="ri-arrow-right-line" />
              Plateforme RegTech
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}





