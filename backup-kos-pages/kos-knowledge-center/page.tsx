import { useState, useMemo, useRef, useCallback } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { Link } from 'react-router-dom';
import { useKnowledgeLeadScoring, type ScoredLeadResult } from '@/hooks/useKnowledgeLeadScoring';
import { useKnowledgeCenter } from '@/hooks/useKnowledgeCenter';
import { useRAGTranslation } from '@/hooks/useRAGTranslation';
import TranslateToggle from '@/components/feature/TranslateToggle';

type Tab = 'guides' | 'templates' | 'checklists' | 'matrices' | 'diagnostics';

type Resource = {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  topics: string[];
  color: string;
  downloads: number;
  conversion_rate: number;
  format?: string;
  pages?: number;
  items?: number;
  estimated_time?: string;
  dimensions?: string;
  axes?: number;
  questions?: number;
  duration?: string;
  completions?: number;
};

function getColorClasses(color: string) {
  if (color === 'accent') return { bg: 'bg-accent-100', text: 'text-accent-700', bar: 'bg-accent-500', border: 'border-accent-200', btn: 'bg-accent-500 hover:bg-accent-600', badge: 'bg-accent-50 text-accent-700 border-accent-200' };
  if (color === 'secondary') return { bg: 'bg-secondary-100', text: 'text-secondary-700', bar: 'bg-secondary-500', border: 'border-secondary-200', btn: 'bg-secondary-500 hover:bg-secondary-600', badge: 'bg-secondary-50 text-secondary-700 border-secondary-200' };
  return { bg: 'bg-primary-100', text: 'text-primary-700', bar: 'bg-primary-500', border: 'border-primary-200', btn: 'bg-primary-500 hover:bg-primary-600', badge: 'bg-primary-50 text-primary-700 border-primary-200' };
}

function formatNumber(val: number): string {
  if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
  return val.toLocaleString('fr-FR');
}

function formatFCFA(val: number): string {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)} M FCFA`;
  return `${val.toLocaleString('fr-FR')} FCFA`;
}

export default function knowledgeCenterPage() {
  const {
    knowledgeGuides,
    knowledgeTemplates,
    knowledgeChecklists,
    knowledgeMatrices,
    knowledgeDiagnostics,
    knowledgeKPIs,
    isLive,
    loading,
    error,
    refetch,
  } = useKnowledgeCenter();
  const [activeTab, setActiveTab] = useState<Tab>('guides');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scoredResult, setScoredResult] = useState<ScoredLeadResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { scoreLead, scoring: isScoring, error: scoringError } = useKnowledgeLeadScoring();
  const { lang, setLang, isEn, t, translateText, getCached, targetLang, setTargetLang, targetLabels, exportCache, cacheCount } = useRAGTranslation();

  // Per-resource translation cache for dynamic content (titles, descriptions)
  const [resourceTranslations, setResourceTranslations] = useState<Record<string, { title: string; description: string }>>({});
  const [translatingResourceId, setTranslatingResourceId] = useState<string | null>(null);

  const currentResources = useMemo(() => {
    let list: Resource[] = [];
    if (activeTab === 'guides') list = knowledgeGuides as unknown as Resource[];
    else if (activeTab === 'templates') list = knowledgeTemplates as unknown as Resource[];
    else if (activeTab === 'checklists') list = knowledgeChecklists as unknown as Resource[];
    else if (activeTab === 'matrices') list = knowledgeMatrices as unknown as Resource[];
    else if (activeTab === 'diagnostics') list = knowledgeDiagnostics as unknown as Resource[];

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.topics.some(t => t.toLowerCase().includes(q))
    );
  }, [activeTab, searchQuery]);

  const currentTitle = useMemo(() => {
    const map: Record<Tab, string> = { guides: 'Guides Pratiques', templates: 'Modèles & Templates', checklists: 'Checklists', matrices: 'Matrices', diagnostics: 'Diagnostics' };
    return map[activeTab];
  }, [activeTab]);

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'guides', label: t('Guides Pratiques'), icon: 'ri-book-2-line', count: knowledgeGuides.length },
    { id: 'templates', label: t('Modèles & Templates'), icon: 'ri-file-copy-line', count: knowledgeTemplates.length },
    { id: 'checklists', label: t('Checklists'), icon: 'ri-checkbox-multiple-line', count: knowledgeChecklists.length },
    { id: 'matrices', label: t('Matrices'), icon: 'ri-layout-grid-line', count: knowledgeMatrices.length },
    { id: 'diagnostics', label: t('Diagnostics'), icon: 'ri-scan-2-line', count: knowledgeDiagnostics.length },
  ];

  const handleCloseModal = () => {
    setSelectedResource(null);
    setFormSubmitted(false);
    setScoredResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      fetch('https://readdy.ai/api/form/d8naida1heuq7aefips0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
    } catch {
      // Non-blocking
    }

    try {
      const result = await scoreLead(data);
      setScoredResult(result);
    } catch {
      // Scoring failed silently
    }
    setFormSubmitted(true);
  };

  const handleTranslateResource = useCallback(async (resource: Resource) => {
    const cached = getCached(`res:${resource.id}:title`);
    if (cached || resourceTranslations[resource.id]) return;
    setTranslatingResourceId(resource.id);
    try {
      const [titleEn, descEn] = await Promise.all([
        translateText(resource.title),
        translateText(resource.description),
      ]);
      setResourceTranslations(prev => ({
        ...prev,
        [resource.id]: { title: titleEn, description: descEn },
      }));
    } catch {
      // silent
    } finally {
      setTranslatingResourceId(null);
    }
  }, [translateText, getCached, resourceTranslations]);

  const getResourceTitle = useCallback((r: Resource) => {
    if (isEn && resourceTranslations[r.id]) return resourceTranslations[r.id].title;
    return r.title;
  }, [isEn, resourceTranslations]);

  const getResourceDescription = useCallback((r: Resource) => {
    if (isEn && resourceTranslations[r.id]) return resourceTranslations[r.id].description;
    return r.description;
  }, [isEn, resourceTranslations]);

  return (
    <hubLayout hubId={53} activeTab={activeTab} tabLabel={tabs.find(t => t.id === activeTab)?.label}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold">
                  <i className="ri-pages-line"></i>{isEn ? 'KHEPRA KNOWLEDGE CENTER™ — Digital Reference Library' : 'KHEPRA KNOWLEDGE CENTER™ — Bibliothèque Numérique de Référence'}
                </div>
                {/* FR/EN Toggle + Export */}
                <div className="flex items-center gap-2">
                  <TranslateToggle lang={lang} setLang={setLang} targetLang={targetLang} setTargetLang={setTargetLang} targetLabels={targetLabels} size="sm" />
                  {cacheCount > 0 && (
                    <div className="relative group">
                      <button className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border border-background-200 bg-background-50 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-download-line text-[10px]"></i>
                        Export
                      </button>
                      <div className="absolute top-full right-0 mt-1 bg-white rounded-lg border border-background-200 shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[90px]">
                        <button onClick={() => exportCache('csv')} className="w-full text-left px-3 py-1.5 text-[10px] font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
                          <i className="ri-file-excel-2-line mr-1.5"></i>CSV
                        </button>
                        <button onClick={() => exportCache('json')} className="w-full text-left px-3 py-1.5 text-[10px] font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
                          <i className="ri-code-line mr-1.5"></i>JSON
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                  isLive
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                  {isLive ? (isEn ? 'LIVE DATA — SUPABASE' : 'DONNÉES LIVE — SUPABASE') : (isEn ? 'MOCK DATA — DEMO' : 'DONNÉES MOCK — DÉMO')}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                {t('Khepra Knowledge Center™')}
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                {isEn
                  ? 'Expert library of professional resources: guides, templates, checklists, matrices, and diagnostics. Download tools used by the Big Four, adapted to the African context.'
                  : 'Bibliothèque experte de ressources professionnelles : guides, modèles, checklists, matrices et diagnostics. Téléchargez les outils utilisés par les Big Four, adaptés au contexte africain.'
                }
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/kos-lead-scoring-command"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold hover:bg-primary-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-user-heart-line"></i>
                {t('Lead Scoring actif')}
              </Link>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{formatNumber(knowledgeKPIs.total_resources)}</div>
                <div className="text-xs text-foreground-500">{t('Ressources')}</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{formatNumber(knowledgeKPIs.total_downloads)}</div>
                <div className="text-xs text-foreground-500">{t('Téléchargements')}</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{formatNumber(knowledgeKPIs.total_leads_generated)}</div>
                <div className="text-xs text-foreground-500">{t('Leads Générés')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RAG Orchestrator Panel */}
      <section className="bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
          <RAGOrchestratorPanel />
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-background-50'
                    : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                <span className="text-xs opacity-60">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">
          <div className="w-10 h-10 mx-auto mb-4 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-foreground-500">{t('Chargement des ressources Knowledge Center...')}</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center">
          <i className="ri-error-warning-line text-3xl text-amber-500 mb-3 block"></i>
          <p className="text-sm font-semibold text-foreground-700 mb-1">{t('Impossible de charger les données live')}</p>
          <p className="text-xs text-foreground-500 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-5 py-2.5 rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-refresh-line mr-1.5"></i>{t('Réessayer')}
          </button>
          <p className="text-[10px] text-foreground-400 mt-4">{t('Les données mock sont affichées en fallback.')}</p>
        </div>
      )}

      {/* Main Content (only when not loading and no error) */}
      {!loading && !error && (
        <>
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            {/* Search bar */}
            {activeTab !== 'diagnostics' && (
              <div className="mb-6">
                <div className="relative max-w-md">
                  <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
                  <input
                    type="text"
                    placeholder={isEn ? `Search in ${t(currentTitle).toLowerCase()}...` : `Rechercher dans ${currentTitle.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-background-50"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-400 hover:text-foreground-600 cursor-pointer">
                      <i className="ri-close-line text-sm"></i>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Resource Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
              {currentResources.map((resource) => {
                const c = getColorClasses(resource.color);
                return (
                  <div
                    key={resource.id}
                    onClick={() => activeTab !== 'diagnostics' ? setSelectedResource(resource) : null}
                    className={`rounded-xl border bg-background-50 border-background-200/70 hover:border-background-300/60 transition-all group ${activeTab !== 'diagnostics' ? 'cursor-pointer' : ''}`}
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${c.bg}`}>
                          <i className={`${resource.icon} text-sm ${c.text}`}></i>
                        </div>
                        {resource.format && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${c.badge}`}>
                            {resource.format}
                          </span>
                        )}
                        {resource.estimated_time && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200/70">
                            {resource.estimated_time}
                          </span>
                        )}
                        {resource.duration && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200/70">
                            {resource.duration}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-foreground-950 mb-2 line-clamp-2 leading-snug group-hover:text-accent-700 transition-colors">
                        {getResourceTitle(resource)}
                      </h3>
                      <p className="text-xs text-foreground-500 line-clamp-2 mb-3">
                        {getResourceDescription(resource)}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.topics.slice(0, 3).map((topic, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 text-[10px]">
                            {topic}
                          </span>
                        ))}
                      </div>
                      {/* Translate button — visible in EN mode or always for untranslated cards */}
                      <div className="flex items-center justify-between mb-2">
                        {isEn && !resourceTranslations[resource.id] ? (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleTranslateResource(resource); }}
                            disabled={translatingResourceId === resource.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-50 text-accent-600 text-[10px] font-semibold border border-accent-200 hover:bg-accent-100 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            {translatingResourceId === resource.id ? (
                              <>
                                <div className="w-2.5 h-2.5 border border-accent-400 border-t-transparent rounded-full animate-spin"></div>
                                Translating...
                              </>
                            ) : (
                              <>
                                <i className="ri-translate-2"></i>
                                Translate
                              </>
                            )}
                          </button>
                        ) : isEn && resourceTranslations[resource.id] ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-semibold border border-emerald-200">
                            <i className="ri-check-line text-xs"></i>
                            EN
                          </span>
                        ) : (
                          <span></span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-background-100">
                        {activeTab === 'diagnostics' ? (
                          <>
                            <span className="text-[10px] text-foreground-400">
                              {resource.questions} questions · {resource.completions?.toLocaleString('fr-FR')}+ complétions
                            </span>
                            <Link
                              to={(resource as any).slug}
                              className={`flex items-center gap-1 text-xs font-semibold ${c.text} whitespace-nowrap cursor-pointer`}
                            >
                              {t('Lancer')} <i className="ri-arrow-right-line text-sm"></i>
                            </Link>
                          </>
                        ) : (
                          <>
                            <span className="text-[10px] text-foreground-400">
                              {isEn ? `${resource.downloads.toLocaleString('fr-FR')} downloads` : `${resource.downloads.toLocaleString('fr-FR')} téléchargements`}
                            </span>
                            <span className={`text-[10px] font-semibold ${c.text}`}>
                              {resource.conversion_rate}% conv.
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {currentResources.length === 0 && (
              <div className="p-12 text-center">
                <i className="ri-inbox-line text-3xl text-foreground-300 mb-3 block"></i>
                <p className="text-foreground-500 text-sm">{t('Aucune ressource trouvée.')}</p>
              </div>
            )}

            {/* Knowledge Center Stats */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white mb-8">
              <h3 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
                <i className="ri-bar-chart-grouped-line text-accent-400"></i>
                {t('Performance Knowledge Center')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                {[
                  { label: t('Guides'), value: String(knowledgeKPIs.total_guides), icon: 'ri-book-2-line' },
                  { label: t('Modèles'), value: String(knowledgeKPIs.total_templates), icon: 'ri-file-copy-line' },
                  { label: t('Checklists'), value: String(knowledgeKPIs.total_checklists), icon: 'ri-checkbox-multiple-line' },
                  { label: t('Matrices'), value: String(knowledgeKPIs.total_matrices), icon: 'ri-layout-grid-line' },
                  { label: t('Diagnostics'), value: String(knowledgeKPIs.total_diagnostics), icon: 'ri-scan-2-line' },
                  { label: t('Leads/mois'), value: String(knowledgeKPIs.monthly_leads), icon: 'ri-user-add-line' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <i className={`${stat.icon} text-accent-400 text-xl mb-2 block`}></i>
                    <span className="block text-xl font-bold font-heading">{stat.value}</span>
                    <span className="text-[10px] text-gray-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer KPI Bar */}
          <section className="border-t border-background-200/70 bg-background-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
              <h4 className="text-sm font-bold text-foreground-950 mb-6">{t('Indicateurs Clés — Khepra Knowledge Center™')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-xs text-foreground-500 mb-2">{t('Ressources Total')}</div>
                  <div className="text-lg font-bold text-foreground-950">{knowledgeKPIs.total_resources}</div>
                  <div className="text-[10px] text-foreground-400 mt-1">5 {t('catégories')}</div>
                </div>
                <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-xs text-foreground-500 mb-2">{t('Téléchargements')}</div>
                  <div className="text-lg font-bold text-accent-500">{formatNumber(knowledgeKPIs.total_downloads)}</div>
                  <div className="text-[10px] text-foreground-400 mt-1">{formatNumber(knowledgeKPIs.monthly_downloads)}{t('/mois')}</div>
                </div>
                <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-xs text-foreground-500 mb-2">{t('Leads Générés')}</div>
                  <div className="text-lg font-bold text-primary-500">{formatNumber(knowledgeKPIs.total_leads_generated)}</div>
                  <div className="text-[10px] text-foreground-400 mt-1">{knowledgeKPIs.monthly_leads}{t('/mois')}</div>
                </div>
                <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-xs text-foreground-500 mb-2">{t('Taux Conversion')}</div>
                  <div className="text-lg font-bold text-emerald-600">{knowledgeKPIs.avg_conversion_rate}%</div>
                  <div className="text-[10px] text-foreground-400 mt-1">{t('Moyen')}</div>
                </div>
                <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-xs text-foreground-500 mb-2">{t('Top Ressource')}</div>
                  <div className="text-xs font-bold text-foreground-950 line-clamp-2">{knowledgeKPIs.top_resource}</div>
                  <div className="text-[10px] text-foreground-400 mt-1">{knowledgeKPIs.top_resource_downloads} {t('téléchargements')}</div>
                </div>
                <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-xs text-foreground-500 mb-2">{t('Revenus Attribués')}</div>
                  <div className="text-lg font-bold text-foreground-950">{formatFCFA(knowledgeKPIs.revenue_attributed_fcfa)}</div>
                  <div className="text-[10px] text-primary-600 mt-1">{t('par mois')}</div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Resource Detail Modal (outside conditional — fixed position) */}
      {selectedResource && selectedResource.slug && activeTab !== 'diagnostics' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={handleCloseModal}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-background-100 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${getColorClasses(selectedResource.color).bg}`}>
                  <i className={`${selectedResource.icon} text-sm ${getColorClasses(selectedResource.color).text}`}></i>
                </div>
                <span className="text-sm font-bold text-foreground-950 line-clamp-1">{getResourceTitle(selectedResource)}</span>
              </div>
              <button onClick={handleCloseModal} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer flex-shrink-0">
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="px-6 py-5">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedResource.format && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getColorClasses(selectedResource.color).badge}`}>
                    {selectedResource.format}
                  </span>
                )}
                {selectedResource.pages && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200/70">
                    {selectedResource.pages} {isEn ? 'pages' : 'pages'}
                  </span>
                )}
                {selectedResource.items && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200/70">
                    {selectedResource.items} {isEn ? 'items' : 'points'}
                  </span>
                )}
                {selectedResource.estimated_time && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200/70">
                    {selectedResource.estimated_time}
                  </span>
                )}
                {selectedResource.dimensions && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200/70">
                    {selectedResource.dimensions}
                  </span>
                )}
                {/* Translate button in modal */}
                {isEn && !resourceTranslations[selectedResource.id] && (
                  <button
                    onClick={() => handleTranslateResource(selectedResource)}
                    disabled={translatingResourceId === selectedResource.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-50 text-accent-600 text-[10px] font-semibold border border-accent-200 hover:bg-accent-100 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {translatingResourceId === selectedResource.id ? (
                      <>
                        <div className="w-2.5 h-2.5 border border-accent-400 border-t-transparent rounded-full animate-spin"></div>
                        Translating...
                      </>
                    ) : (
                      <>
                        <i className="ri-translate-2"></i>
                        Translate
                      </>
                    )}
                  </button>
                )}
              </div>
              <p className="text-sm text-foreground-700 leading-relaxed mb-4">{getResourceDescription(selectedResource)}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedResource.topics.map((topic, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 text-[10px] border border-accent-200">
                    {topic}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 bg-background-100 rounded-lg text-center">
                  <div className="text-sm font-bold text-foreground-950">{selectedResource.downloads.toLocaleString('fr-FR')}</div>
                  <div className="text-[10px] text-foreground-500">{t('Téléchargements')}</div>
                </div>
                <div className="p-3 bg-background-100 rounded-lg text-center">
                  <div className="text-sm font-bold text-accent-500">{selectedResource.conversion_rate}%</div>
                  <div className="text-[10px] text-foreground-500">{t('Taux Conversion')}</div>
                </div>
                <div className="p-3 bg-background-100 rounded-lg text-center">
                  <div className="text-sm font-bold text-primary-500">{selectedResource.pages || selectedResource.items || '-'}</div>
                  <div className="text-[10px] text-foreground-500">{selectedResource.pages ? (isEn ? 'Pages' : 'Pages') : (isEn ? 'Items' : 'Items')}</div>
                </div>
              </div>

              {/* Lead Capture Form */}
              <div className="p-5 bg-background-50 rounded-xl border border-background-200/70">
                <h4 className="text-sm font-bold text-foreground-950 mb-1">{t('Télécharger cette ressource')}</h4>
                <p className="text-xs text-foreground-500 mb-4">{t('Remplissez le formulaire ci-dessous pour recevoir le lien de téléchargement par email.')}</p>
                {formSubmitted ? (
                  <div>
                    {scoredResult ? (
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl ${
                            scoredResult.leadScore.category === 'hot' ? 'bg-red-50 border border-red-200' :
                            scoredResult.leadScore.category === 'warm' ? 'bg-yellow-50 border border-yellow-200' :
                            'bg-secondary-50 border border-secondary-200'
                          }`}>
                            <i className={`text-2xl ${
                              scoredResult.leadScore.category === 'hot' ? 'ri-fire-line text-red-500' :
                              scoredResult.leadScore.category === 'warm' ? 'ri-sun-line text-yellow-500' :
                              'ri-snowy-line text-secondary-500'
                            }`}></i>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-foreground-500">{t('LEAD SCORE')}</div>
                              <div className={`text-xl font-bold ${
                                scoredResult.leadScore.category === 'hot' ? 'text-red-600' :
                                scoredResult.leadScore.category === 'warm' ? 'text-yellow-600' :
                                'text-secondary-600'
                              }`}>
                                {scoredResult.leadScore.total}/100 — {scoredResult.leadScore.category === 'hot' ? t('CHAUD') : scoredResult.leadScore.category === 'warm' ? t('TIÈDE') : t('FROID')}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: t('Engagement'), value: scoredResult.leadScore.breakdown.engagement, max: 30, color: 'bg-amber-500' },
                            { label: t('Fit'), value: scoredResult.leadScore.breakdown.fit, max: 25, color: 'bg-emerald-500' },
                            { label: t('Urgence'), value: scoredResult.leadScore.breakdown.urgency, max: 25, color: 'bg-rose-500' },
                            { label: t('Budget'), value: scoredResult.leadScore.breakdown.budget, max: 20, color: 'bg-accent-500' },
                          ].map((item, idx) => (
                            <div key={idx} className="text-center p-2 bg-background-50 rounded-lg">
                              <div className="text-[10px] text-foreground-500 mb-1">{item.label}</div>
                              <div className="text-sm font-bold text-foreground-950">{item.value}<span className="text-[10px] text-foreground-400">/{item.max}</span></div>
                              <div className="mt-1.5 h-1 bg-background-200 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.value / item.max) * 100}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-background-50 rounded-lg">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold text-white ${
                              scoredResult.priority === 'P0' ? 'bg-red-600' : scoredResult.priority === 'P1' ? 'bg-orange-500' : scoredResult.priority === 'P2' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}>{scoredResult.priority}</span>
                            <span className="text-[10px] text-foreground-500">Priorité</span>
                          </div>
                          <div className="text-[10px] text-foreground-400">|</div>
                          <div className="flex items-center gap-1.5">
                            <i className="ri-time-line text-amber-500 text-sm"></i>
                            <span className="text-[10px] text-foreground-700">Réponse recommandée : <strong>{scoredResult.responseTime}h</strong></span>
                          </div>
                          {scoredResult.stored && (
                            <>
                              <div className="text-[10px] text-foreground-400">|</div>
                              <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                                <i className="ri-database-2-line"></i>Stocké CRM
                              </span>
                            </>
                          )}
                        </div>

                        {scoredResult.leadScore.recommendations.length > 0 && (
                          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <i className="ri-lightbulb-line text-amber-500 mt-0.5"></i>
                              <div>
                                <div className="text-[10px] font-semibold text-amber-700">Next Best Action</div>
                                <p className="text-xs text-amber-800 mt-0.5">{scoredResult.leadScore.recommendations[0]}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
                          <i className="ri-check-line text-xl text-emerald-600 mb-1.5 block"></i>
                          <p className="text-sm font-semibold text-emerald-700">{t('Ressource envoyée par email !')}</p>
                          <p className="text-xs text-emerald-600 mt-0.5">{t('Le lien de téléchargement vous a été adressé.')}</p>
                        </div>

                        <Link
                          to="/kos-lead-scoring-command"
                          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-foreground-950 text-background-50 text-xs font-semibold hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-dashboard-line"></i>
                          {t('Voir dans Lead Scoring Command')}
                        </Link>
                      </div>
                    ) : scoringError ? (
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                        <i className="ri-error-warning-line text-xl text-red-500 mb-1.5 block"></i>
                        <p className="text-sm font-semibold text-red-700">{t('Erreur de scoring')}</p>
                        <p className="text-xs text-red-600 mt-0.5">{t('La ressource a bien été envoyée. Réessayez plus tard.')}</p>
                      </div>
                    ) : (
                      <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                        <div className="w-8 h-8 mx-auto mb-3 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-semibold text-foreground-700">{t('Scoring en cours...')}</p>
                        <p className="text-xs text-foreground-500 mt-0.5">{t('Analyse du profil lead en temps réel')}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} data-readdy-form="" className="space-y-3">
                    <input type="hidden" name="resource_title" value={selectedResource.title} />
                    <input type="hidden" name="resource_type" value={activeTab} />
                    <input type="hidden" name="resource_format" value={selectedResource.format || ''} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-foreground-700 mb-1">{t('Nom')} <span className="text-red-500">*</span></label>
                        <input type="text" name="last_name" required className="w-full px-3 py-2 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-white" placeholder={isEn ? 'Your last name' : 'Votre nom'} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground-700 mb-1">{t('Prénom')} <span className="text-red-500">*</span></label>
                        <input type="text" name="first_name" required className="w-full px-3 py-2 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-white" placeholder={isEn ? 'Your first name' : 'Votre prénom'} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground-700 mb-1">{t('Email professionnel')} <span className="text-red-500">*</span></label>
                      <input type="email" name="email" required className="w-full px-3 py-2 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-white" placeholder={isEn ? 'you@company.com' : 'vous@entreprise.com'} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-foreground-700 mb-1">{t('Fonction')} <span className="text-red-500">*</span></label>
                        <input type="text" name="job_title" required className="w-full px-3 py-2 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-white" placeholder={isEn ? 'e.g. CFO' : 'Ex: Directeur Financier'} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground-700 mb-1">{t('Entreprise')} <span className="text-red-500">*</span></label>
                        <input type="text" name="company" required className="w-full px-3 py-2 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-white" placeholder={isEn ? 'Company name' : 'Nom de votre entreprise'} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground-700 mb-1">{t('Secteur d\'activité')}</label>
                      <select name="sector" className="w-full px-3 py-2 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-white cursor-pointer">
                        <option value="">{t('Sélectionnez...')}</option>
                        <option value="banque">{isEn ? 'Banking / Finance' : 'Banque / Finance'}</option>
                        <option value="microfinance">{isEn ? 'Microfinance / SFD' : 'Microfinance / SFD'}</option>
                        <option value="assurance">{isEn ? 'Insurance' : 'Assurance'}</option>
                        <option value="fintech">{isEn ? 'FinTech' : 'FinTech'}</option>
                        <option value="industrie">{isEn ? 'Industry' : 'Industrie'}</option>
                        <option value="services">{isEn ? 'Services' : 'Services'}</option>
                        <option value="public">{isEn ? 'Public Sector' : 'Secteur Public'}</option>
                        <option value="autre">{isEn ? 'Other' : 'Autre'}</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className={`w-full px-6 py-3 rounded-full text-sm font-bold text-white cursor-pointer whitespace-nowrap transition-colors ${getColorClasses(selectedResource.color).btn}`}
                    >
                      <i className="ri-download-line mr-2"></i>{t('Télécharger gratuitement')}
                    </button>
                    <p className="text-[10px] text-foreground-400 text-center">{t('Vos données sont confidentielles. Consultez notre politique de confidentialité.')}</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </hubLayout>
  );
}






