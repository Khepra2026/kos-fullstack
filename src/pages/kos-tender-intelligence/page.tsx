import { useState, useEffect, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { supabase } from '@/lib/supabase';
import { useTenderIntelligence } from '@/hooks/useTenderIntelligence';
import {
  useTenderSources,
  useTenderScraperLogs,
  useTenderAlerts,
  useTenderDeadlines,
  useTenderKnowledgeBase,
  useTenderAutoResponses,
} from '@/hooks/useTenderIntelligenceTabs';
import { useTenderEmailTransmitter, TenderForEmail } from '@/hooks/useTenderEmailTransmitter';
import { useTenderConfig } from '@/hooks/useTenderConfig';
import AOAlertsSubscription from './components/AOAlertsSubscription';

type Tab = 'sources' | 'scraper' | 'qualification' | 'alerts' | 'deadlines' | 'knowledge' | 'response' | 'bailleurs';

export default function KOSTenderIntelligencePage() {
  const { tenders: rawTenders, loading: tendersLoading, error: tendersError, isLive: tendersLive, refetch: refetchTenders } = useTenderIntelligence();
  const { sources: monitoredSources, isLive: sourcesLive } = useTenderSources();
  const { logs: scraperLogs, isLive: scraperLive } = useTenderScraperLogs();
  const { alerts: alertsSent, isLive: alertsLive } = useTenderAlerts();
  const { deadlines: deadlineTracker, isLive: deadlinesLive } = useTenderDeadlines();
  const { knowledge: knowledgeBase, isLive: knowledgeLive } = useTenderKnowledgeBase();
  const { responses: autoResponses, isLive: responsesLive } = useTenderAutoResponses();

  const [activeTab, setActiveTab] = useState<Tab>('qualification');
  const { criteria: qualificationCriteria, kpis: kpiOverview, donors: donorIntelligence, donorKpis: donorStats } = useTenderConfig();
  const [selectedTender, setSelectedTender] = useState(rawTenders[0]);
  const [selectedSource, setSelectedSource] = useState(monitoredSources[0]);
  const [selectedDeadline, setSelectedDeadline] = useState(deadlineTracker[0]);
  const [selectedKnowledge, setSelectedKnowledge] = useState(knowledgeBase[0]);
  const [selectedResponse, setSelectedResponse] = useState(autoResponses[0]);
  const [selectedDonor, setSelectedDonor] = useState(donorIntelligence[0]);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  const tenderEmailData: TenderForEmail[] = useMemo(() => rawTenders.map(t => ({
    id: t.id,
    tender_title: t.tender_title,
    source_organization: t.source_organization,
    tender_type: t.tender_type,
    submission_deadline: t.submission_deadline,
    estimated_budget_fcfa: t.estimated_budget_fcfa,
    relevance_score: t.relevance_score,
    qualification_status: t.qualification_status === 'CRITICAL' || t.qualification_status === 'HIGH' ? 'qualified' : 'evaluation',
    country: t.country,
    region: t.region,
    match_category: t.match_category,
  })), [rawTenders]);

  const { stats: emailStats, buildEmailHtml } = useTenderEmailTransmitter(tenderEmailData);

  const handleAutoNotify = async () => {
    setEmailSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('kos-tender-master', {
        body: { action: 'notify', min_relevance: 'all', limit: 20 },
      });
      if (error) throw error;
      if (data?.sent) {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 8000);
      }
    } catch (err) {
      console.error('Notify failed:', err);
    } finally {
      setEmailSending(false);
    }
  };

  // Filters
  const [filterCountry, setFilterCountry] = useState<string>('');
  const [filterRegion, setFilterRegion] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');

  const allCountries = useMemo(() => Array.from(new Set(rawTenders.map(t => t.country).filter(Boolean))).sort(), [rawTenders]);
  const allRegions = useMemo(() => Array.from(new Set(rawTenders.map(t => t.region).filter(Boolean))).sort(), [rawTenders]);
  const allCategories = useMemo(() => Array.from(new Set(rawTenders.map(t => t.match_category).filter(Boolean))).sort(), [rawTenders]);

  const filteredTenders = useMemo(() => {
    return rawTenders.filter(t => {
      if (filterCountry && t.country !== filterCountry) return false;
      if (filterRegion && t.region !== filterRegion) return false;
      if (filterCategory && t.match_category !== filterCategory) return false;
      return true;
    });
  }, [rawTenders, filterCountry, filterRegion, filterCategory]);

  useEffect(() => {
    if (rawTenders.length > 0 && !rawTenders.find(t => t.id === selectedTender?.id)) {
      setSelectedTender(rawTenders[0]);
    }
  }, [rawTenders, selectedTender]);

  useEffect(() => {
    if (monitoredSources.length > 0 && !monitoredSources.find(s => s.id === selectedSource?.id)) {
      setSelectedSource(monitoredSources[0]);
    }
  }, [monitoredSources, selectedSource]);

  useEffect(() => {
    if (deadlineTracker.length > 0 && !deadlineTracker.find(d => d.id === selectedDeadline?.id)) {
      setSelectedDeadline(deadlineTracker[0]);
    }
  }, [deadlineTracker, selectedDeadline]);

  useEffect(() => {
    if (knowledgeBase.length > 0 && !knowledgeBase.find(k => k.id === selectedKnowledge?.id)) {
      setSelectedKnowledge(knowledgeBase[0]);
    }
  }, [knowledgeBase, selectedKnowledge]);

  useEffect(() => {
    if (autoResponses.length > 0 && !autoResponses.find(r => r.id === selectedResponse?.id)) {
      setSelectedResponse(autoResponses[0]);
    }
  }, [autoResponses, selectedResponse]);

  const criticalCount = rawTenders.filter(t => t.qualification_status === 'CRITICAL').length;
  const highCount = rawTenders.filter(t => t.qualification_status === 'HIGH').length;
  const totalValue = rawTenders.reduce((s, t) => s + t.estimated_budget_fcfa, 0);
  const alertsToday = alertsSent.filter(a => a.sent_at.startsWith('2026-06-15')).length;
  const deadlinesCritical = deadlineTracker.filter(d => d.urgency === 'CRITICAL').length;

  const formatFCFA = (val: number) => {
    if (!Number.isFinite(val) || val === 0) return '0';
    if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)} Md`;
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(0)} M`;
    return val.toLocaleString('fr-FR');
  };

  const getStatusBadge = (status: string) => {
    if (status === 'CRITICAL') return 'bg-red-100 text-red-700';
    if (status === 'HIGH') return 'bg-orange-100 text-orange-700';
    if (status === 'TO_EVALUATE') return 'bg-yellow-100 text-yellow-700';
    return 'bg-background-100 text-foreground-500';
  };

  const getUrgencyBadge = (urgency: string) => {
    if (urgency === 'CRITICAL') return 'bg-red-100 text-red-700';
    if (urgency === 'WARNING') return 'bg-orange-100 text-orange-700';
    if (urgency === 'NORMAL') return 'bg-secondary-100 text-secondary-700';
    return 'bg-background-100 text-foreground-500';
  };

  const getScraperStatusBadge = (status: string) => {
    if (status === 'Success') return 'bg-green-100 text-green-700';
    if (status === 'Partial') return 'bg-yellow-100 text-yellow-700';
    return 'bg-background-100 text-foreground-500';
  };

  const getAlertStatusBadge = (status: string) => {
    if (status === 'Delivered') return 'bg-green-100 text-green-700';
    if (status === 'Failed') return 'bg-red-100 text-red-700';
    return 'bg-background-100 text-foreground-500';
  };

  const getKbCategoryBadge = (category: string) => {
    if (category.includes('Gagnés')) return 'bg-green-100 text-green-700';
    if (category.includes('Perdus')) return 'bg-red-100 text-red-700';
    if (category.includes('Techniques')) return 'bg-secondary-100 text-secondary-700';
    return 'bg-background-100 text-foreground-500';
  };

  const renderScoreBar = (score: number, max: number = 100, color?: string) => (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color || 'bg-accent-500'}`} style={{ width: `${Math.min((score / max) * 100, 100)}%` }}></div>
      </div>
      <span className="text-xs font-bold text-foreground-950">{score}%</span>
    </div>
  );

  const renderGaugeCircle = (score: number, maxScore: number, label: string, size: number = 48, colorOverride?: string) => {
    const pct = Math.min((score / maxScore) * 100, 100);
    const r = (size - 8) / 2;
    const circ = 2 * Math.PI * r;
    const color = colorOverride || (score >= 90 ? '#22c55e' : score >= 80 ? '#f59e0b' : score >= 70 ? '#06b6d4' : '#ef4444');
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="-rotate-90" style={{ width: size, height: size }} viewBox={`0 0 ${size} ${size}`}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
              strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-foreground-950">{score}</span>
          </div>
        </div>
        <span className="text-[10px] text-foreground-500 text-center leading-tight">{label}</span>
      </div>
    );
  };

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'qualification', label: 'Qualification IA', icon: 'ri-brain-line', count: filteredTenders.length },
    { id: 'sources', label: 'Découverte Sources', icon: 'ri-radar-line', count: monitoredSources.length },
    { id: 'scraper', label: 'Scraper Engine', icon: 'ri-download-cloud-2-line', count: scraperLogs.length },
    { id: 'alerts', label: 'Alertes & Notifications', icon: 'ri-notification-3-line', count: alertsToday },
    { id: 'deadlines', label: 'Surveillance Délais', icon: 'ri-timer-line', count: deadlinesCritical },
    { id: 'knowledge', label: 'Base de Connaissances', icon: 'ri-database-2-line', count: knowledgeBase.length },
    { id: 'response', label: 'Auto-Réponses', icon: 'ri-file-text-line', count: autoResponses.length },
    { id: 'bailleurs', label: 'Bailleurs Intl.', icon: 'ri-building-4-line', count: donorIntelligence.length },
  ];

  return (
    <KOSHubLayout hubId={50} activeTab={activeTab} tabLabel={tabs.find(t => t.id === activeTab)?.label}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold mb-4">
                <i className="ri-rocket-2-line"></i>KOS Phase 4 — Tender Intelligence Engine
                {tendersLive && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    LIVE
                  </span>
                )}
                {tendersLoading && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-bold">
                    <i className="ri-loader-4-line animate-spin"></i>
                    CHARGEMENT
                  </span>
                )}
                {tendersError && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold cursor-pointer" onClick={refetchTenders} title="Cliquer pour réessayer">
                    <i className="ri-error-warning-line"></i>
                    OFFLINE — Réessayer
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Tender Intelligence Engine</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Plateforme autonome de veille stratégique — Détection, qualification et notification en temps réel des appels d'offres,
                AO/AMI/DAO et bailleurs internationaux pour Khepra Experts. 8 agents IA, 16 sources surveillées, 24h/24.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
                <div className="text-xs text-foreground-500 whitespace-nowrap">🔥 Critiques</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-orange-600">{criticalCount + highCount}</div>
                <div className="text-xs text-foreground-500 whitespace-nowrap">Prioritaires</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{donorStats.donors_accredited}</div>
                <div className="text-xs text-foreground-500 whitespace-nowrap">Bailleurs</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{kpiOverview.sources_active}/{kpiOverview.sources_total}</div>
                <div className="text-xs text-foreground-500 whitespace-nowrap">Sources</div>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="/kos-tender-automates-audit"
                  className="whitespace-nowrap px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                  title="Auditer les automates AO/AMI — Vérifier leurs outils et compétences"
                >
                  <i className="ri-shield-check-line"></i>
                  AUDIT AUTOMATES
                </a>
                <button
                  onClick={handleAutoNotify}
                  disabled={emailSending}
                  className="whitespace-nowrap px-4 py-2.5 rounded-lg bg-accent-500 text-background-50 text-sm font-semibold hover:bg-accent-600 transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  title="Envoyer automatiquement le rapport AO/AMI formaté à contact@khepraexperts.com via Resend"
                >
                  {emailSending ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <i className="ri-mail-send-line"></i>
                      Transmettre par Email
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowEmailPreview(true)}
                  className="whitespace-nowrap px-4 py-2 rounded-lg border border-background-200/70 text-foreground-600 text-xs font-medium hover:bg-background-100 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <i className="ri-eye-line"></i>
                  Aperçu
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                {tab.count > 0 && <span className="text-xs opacity-60">{tab.count}</span>}
                {tab.id === 'qualification' && tendersLive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                {tab.id === 'sources' && sourcesLive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                {tab.id === 'scraper' && scraperLive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                {tab.id === 'alerts' && alertsLive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                {tab.id === 'deadlines' && deadlinesLive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                {tab.id === 'knowledge' && knowledgeLive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                {tab.id === 'response' && responsesLive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ===== ONGLET 1 : AI QUALIFICATION ENGINE ===== */}
        {activeTab === 'qualification' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <i className="ri-brain-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS AI Qualification Engine</h3>
                  <p className="text-xs text-foreground-500">{filteredTenders.length} AO qualifiés — {criticalCount} critiques</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-accent-200 bg-accent-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Critères de scoring</div>
                {qualificationCriteria.map((c) => (
                  <div key={c.name} className="flex items-center justify-between text-xs mt-1">
                    <span className="text-foreground-600">{c.name}</span>
                    <span className="font-bold text-foreground-950">{c.weight}%</span>
                  </div>
                ))}
              </div>
              {/* Filters */}
              <div className="p-3 rounded-lg border border-background-200/70 bg-background-50 mb-3 space-y-2">
                <div className="text-xs font-semibold text-foreground-950 flex items-center gap-1">
                  <i className="ri-filter-3-line"></i> Filtres
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    className="text-xs px-2 py-1 rounded border border-background-200/70 bg-background-50 text-foreground-600 cursor-pointer"
                  >
                    <option value="">Tous pays</option>
                    {allCountries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="text-xs px-2 py-1 rounded border border-background-200/70 bg-background-50 text-foreground-600 cursor-pointer"
                  >
                    <option value="">Toutes régions</option>
                    {allRegions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="text-xs px-2 py-1 rounded border border-background-200/70 bg-background-50 text-foreground-600 cursor-pointer"
                  >
                    <option value="">Toutes catégories</option>
                    {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {(filterCountry || filterRegion || filterCategory) && (
                    <button
                      onClick={() => { setFilterCountry(''); setFilterRegion(''); setFilterCategory(''); }}
                      className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 cursor-pointer"
                    >
                      <i className="ri-close-line"></i> Réinitialiser
                    </button>
                  )}
                </div>
                {(filterCountry || filterRegion || filterCategory) && (
                  <div className="text-xs text-foreground-400">
                    {filteredTenders.length} résultat{filteredTenders.length !== 1 ? 's' : ''} sur {rawTenders.length}
                  </div>
                )}
              </div>
              {filteredTenders.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTender(t)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedTender?.id === t.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(t.qualification_status)}`}>
                      {t.qualification_status === 'CRITICAL' ? '🔥 CRITIQUE' : t.qualification_status === 'HIGH' ? '🟢 ÉLEVÉE' : '🟡 ÉVALUER'}
                    </span>
                    <span className="text-sm font-bold text-foreground-950">{t.relevance_score}/100</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{t.tender_title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">{t.source_organization} · {t.country}</span>
                    <span className="text-xs font-bold text-foreground-500">{formatFCFA(t.estimated_budget_fcfa)} FCFA</span>
                  </div>
                </div>
              ))}
              {filteredTenders.length === 0 && (
                <div className="p-4 text-center text-xs text-foreground-400">
                  <i className="ri-filter-off-line text-lg mb-2 block"></i>
                  Aucun AO ne correspond aux filtres sélectionnés.
                </div>
              )}
            </div>
            <div className="lg:col-span-2">
              {selectedTender ? (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedTender.qualification_status)}`}>
                      {selectedTender.qualification_status === 'CRITICAL' ? '🔥 PRIORITÉ CRITIQUE' : selectedTender.qualification_status === 'HIGH' ? '🟢 PRIORITÉ ÉLEVÉE' : '🟡 À ÉVALUER'}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedTender.tender_type}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium">{selectedTender.match_category}</span>
                    <span className="text-xs text-foreground-400 ml-auto">Publié le {new Date(selectedTender.publication_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedTender.tender_title}</h2>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="flex justify-center mb-1">{renderGaugeCircle(selectedTender.relevance_score, 100, '', 52, selectedTender.relevance_score >= 90 ? '#22c55e' : selectedTender.relevance_score >= 80 ? '#f59e0b' : '#06b6d4')}</div>
                      <div className="text-xs text-foreground-500">Score Global</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="text-lg font-bold text-foreground-950">{formatFCFA(selectedTender.estimated_budget_fcfa)}</div>
                      <div className="text-xs text-foreground-500">Budget</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="text-sm font-bold text-foreground-950">{selectedTender.source_organization}</div>
                      <div className="text-xs text-foreground-500">Organisme</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="text-sm font-bold text-red-600">{new Date(selectedTender.submission_deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</div>
                      <div className="text-xs text-foreground-500">Date Limite</div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground-500">Score de pertinence global</span>
                    </div>
                    {renderScoreBar(selectedTender.relevance_score, 100, 'bg-accent-500')}
                    {Object.entries(selectedTender.match_details).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-xs text-foreground-500 capitalize">{key.replace(/_/g, ' ')}</span>
                        {renderScoreBar(val, 100, 'bg-secondary-500')}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-2">Analyse Concurrentielle</h4>
                      <p className="text-xs text-foreground-600 leading-relaxed">{selectedTender.competitive_analysis}</p>
                    </div>
                    <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-2">Description</h4>
                      <p className="text-xs text-foreground-600 leading-relaxed">{selectedTender.description}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-2">Documents requis ({selectedTender.required_documents.length})</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedTender.required_documents.map((doc) => (
                        <span key={doc} className="text-xs px-2 py-0.5 rounded bg-background-200/70 text-foreground-600">{doc}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-12 text-center">
                  <i className="ri-brain-line text-4xl text-foreground-300 mb-4 block"></i>
                  <p className="text-sm text-foreground-500">Sélectionnez un appel d'offres pour voir le détail</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ONGLET 2 : SOURCE DISCOVERY BOT ===== */}
        {activeTab === 'sources' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-radar-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Source Discovery Bot</h3>
                  <p className="text-xs text-foreground-500">{monitoredSources.length} sources — {monitoredSources.filter(s => s.status === 'Actif').length} actives</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-primary-200 bg-primary-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Couverture géographique</div>
                <div className="text-lg font-bold text-primary-700">16 sources</div>
                <div className="text-xs text-foreground-400 mt-1">3 Institutions Internationales · 3 Régionales · 6 Portails Nationaux · 2 Réseaux Sociaux</div>
              </div>
              {monitoredSources.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSource(s)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedSource?.id === s.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{s.source_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-background-100 text-foreground-500'}`}>{s.status}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{s.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">{s.region} · {s.active_tenders} AO actifs</span>
                    <span className="text-xs font-bold text-primary-600">{s.reliability}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              {selectedSource ? (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedSource.source_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedSource.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-background-100 text-foreground-500'}`}>{selectedSource.status}</span>
                    <span className="text-xs text-foreground-400 ml-auto">Dernier scan : {new Date(selectedSource.last_scan).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedSource.name}</h2>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="text-lg font-bold text-foreground-950">{selectedSource.active_tenders}</div>
                      <div className="text-xs text-foreground-500">AO Actifs</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="flex justify-center">{renderGaugeCircle(selectedSource.reliability, 100, '', 44, selectedSource.reliability >= 90 ? '#22c55e' : '#f59e0b')}</div>
                      <div className="text-xs text-foreground-500">Fiabilité</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="text-sm font-bold text-foreground-950">{selectedSource.region}</div>
                      <div className="text-xs text-foreground-500">Zone</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="text-sm font-bold text-green-600">{selectedSource.status}</div>
                      <div className="text-xs text-foreground-500">Statut</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-foreground-500">Score de fiabilité de la source</span>
                    </div>
                    {renderScoreBar(selectedSource.reliability, 100, 'bg-primary-500')}
                  </div>
                  <div className="p-4 bg-primary-50/50 rounded-lg border border-primary-100 mb-4">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Mots-clés surveillés</h4>
                    <div className="flex flex-wrap gap-1">
                      {['appel d\'offres', 'tender', 'procurement', 'RFP', 'RFQ', 'EOI', 'AMI', 'manifestation d\'intérêt', 'consulting services', 'audit services', 'risk management', 'internal audit'].map((kw) => (
                        <span key={kw} className="text-xs px-2 py-0.5 rounded bg-background-200/70 text-foreground-600 whitespace-nowrap">{kw}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                    <div className="flex items-center gap-2">
                      <i className="ri-link text-foreground-400"></i>
                      <span className="text-xs text-foreground-600 truncate">{selectedSource.url}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-12 text-center">
                  <i className="ri-radar-line text-4xl text-foreground-300 mb-4 block"></i>
                  <p className="text-sm text-foreground-500">Sélectionnez une source pour voir le détail</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ONGLET 3 : SCRAPER ENGINE ===== */}
        {activeTab === 'scraper' && (
          <div className="space-y-6">
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 text-green-700">
                  <i className="ri-download-cloud-2-line text-xl"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Scraper Engine — Logs d'extraction en temps réel</h3>
                  <p className="text-xs text-foreground-500">{scraperLogs.length} scans aujourd'hui — Dernier : {scraperLogs.length > 0 ? new Date(scraperLogs[0].timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '—'}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">{scraperLive ? 'Live DB' : 'Mock'}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {scraperLogs.map((log) => (
                  <div key={log.id} className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-foreground-950">{log.source}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getScraperStatusBadge(log.status)}`}>{log.status}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="text-center">
                        <div className="text-xs font-bold text-foreground-950">{log.documents_found}</div>
                        <div className="text-[10px] text-foreground-400">Trouvés</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-green-600">{log.documents_downloaded}</div>
                        <div className="text-[10px] text-foreground-400">Téléchargés</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-accent-500">{log.new_tenders}</div>
                        <div className="text-[10px] text-foreground-400">Nouveaux AO</div>
                      </div>
                    </div>
                    <p className="text-xs text-foreground-500 mt-2 leading-relaxed">{log.details}</p>
                    <div className="text-[10px] text-foreground-400 mt-2">{new Date(log.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <h4 className="text-sm font-semibold text-foreground-950 mb-4">Structure des dossiers — KOS_TENDERS</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Sénégal', 'Côte d\'Ivoire', 'Cameroun'].map((country) => (
                  <div key={country} className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-folder-line text-accent-500"></i>
                      <span className="text-sm font-semibold text-foreground-950">{country}</span>
                    </div>
                    <div className="space-y-2">
                      {['BCEAO', 'Banque Mondiale', 'COBAC'].map((org) => (
                        <div key={org} className="flex items-center gap-2 pl-4">
                          <i className="ri-folder-2-line text-secondary-500 text-xs"></i>
                          <span className="text-xs text-foreground-600">{org}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-background-200/70 flex gap-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-50 text-red-600">TOR.pdf</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary-50 text-secondary-600">Avis.pdf</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-background-200/70 text-foreground-500">Metadata.json</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 4 : BID ALERT ENGINE ===== */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <AOAlertsSubscription />
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                <i className="ri-notification-3-line text-xl"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground-950">KOS Bid Alert Engine — Notifications envoyées</h3>
                <p className="text-xs text-foreground-500">{alertsSent.length} alertes — {alertsToday} aujourd'hui</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">{alertsLive ? 'Live DB' : 'Mock'}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {alertsSent.map((alert) => {
                const tender = rawTenders.find(t => t.id === alert.tender_id);
                return (
                  <div key={alert.id} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getAlertStatusBadge(alert.status)}`}>{alert.status}</span>
                        {alert.channels.map((ch) => (
                          <span key={ch} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium">{ch}</span>
                        ))}
                      </div>
                      <span className="text-xs text-foreground-400 whitespace-nowrap">{new Date(alert.sent_at).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-1">{alert.subject}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-foreground-500">Destinataires :</span>
                      {alert.recipients.map((r) => (
                        <span key={r} className="text-xs text-accent-600 font-medium">{r}</span>
                      ))}
                    </div>
                    {tender && (
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-background-200/70">
                        <span className="text-xs text-foreground-500">{tender.source_organization}</span>
                        <span className="text-xs text-foreground-500">{tender.country}</span>
                        <span className="text-xs font-bold text-foreground-950">{formatFCFA(tender.estimated_budget_fcfa)} FCFA</span>
                        <span className={`text-xs font-bold ${tender.qualification_status === 'CRITICAL' ? 'text-red-600' : 'text-orange-600'}`}>{tender.relevance_score}/100</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <h4 className="text-sm font-semibold text-foreground-950 mb-4">Configuration des canaux de notification</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 text-center">
                  <i className="ri-mail-line text-2xl text-green-600 mb-2 block"></i>
                  <div className="text-xs font-semibold text-foreground-950">Email</div>
                  <div className="text-xs text-green-600 font-medium mt-1">Actif</div>
                  <div className="text-[10px] text-foreground-400 mt-1">contact@khepraexperts.com</div>
                </div>
                <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 text-center">
                  <i className="ri-whatsapp-line text-2xl text-green-600 mb-2 block"></i>
                  <div className="text-xs font-semibold text-foreground-950">WhatsApp</div>
                  <div className="text-xs text-green-600 font-medium mt-1">Actif</div>
                  <div className="text-[10px] text-foreground-400 mt-1">Business API</div>
                </div>
                <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 text-center">
                  <i className="ri-telegram-line text-2xl text-green-600 mb-2 block"></i>
                  <div className="text-xs font-semibold text-foreground-950">Telegram</div>
                  <div className="text-xs text-green-600 font-medium mt-1">Actif</div>
                  <div className="text-[10px] text-foreground-400 mt-1">Bot KOS Tender</div>
                </div>
                <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 text-center">
                  <i className="ri-microsoft-line text-2xl text-green-600 mb-2 block"></i>
                  <div className="text-xs font-semibold text-foreground-950">Teams</div>
                  <div className="text-xs text-green-600 font-medium mt-1">Actif</div>
                  <div className="text-[10px] text-foreground-400 mt-1">Channel AO</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 5 : DEADLINE MONITOR ===== */}
        {activeTab === 'deadlines' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                  <i className="ri-timer-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Deadline Monitor</h3>
                  <p className="text-xs text-foreground-500">{deadlineTracker.length} échéances — {deadlineTracker.filter(d => d.urgency === 'CRITICAL').length} critiques</p>
                </div>
              </div>
              {deadlineTracker.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDeadline(d)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedDeadline?.id === d.id ? 'border-orange-300 bg-orange-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getUrgencyBadge(d.urgency)}`}>
                      {d.urgency === 'CRITICAL' ? '⚠️ CRITIQUE' : d.urgency === 'WARNING' ? '⚠️ ATTENTION' : d.urgency === 'NORMAL' ? '✅ NORMAL' : '◻️ FAIBLE'}
                    </span>
                    <span className="text-sm font-bold text-foreground-950">{d.status}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{d.tender_title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">🗓 {new Date(d.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                    <span className="text-xs font-bold text-foreground-950">{d.completion_pct}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              {selectedDeadline ? (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getUrgencyBadge(selectedDeadline.urgency)}`}>
                      {selectedDeadline.urgency === 'CRITICAL' ? '⚠️ CRITIQUE' : selectedDeadline.urgency === 'WARNING' ? '⚠️ ATTENTION' : 'NORMAL'}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedDeadline.status}</span>
                    <span className="text-xs text-foreground-400 ml-auto">Échéance : {new Date(selectedDeadline.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedDeadline.tender_title}</h2>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="p-4 bg-background-100 rounded-lg text-center">
                      <div className="text-3xl font-bold text-red-600">{selectedDeadline.days_remaining}</div>
                      <div className="text-xs text-foreground-500">Jours restants</div>
                    </div>
                    <div className="p-4 bg-background-100 rounded-lg text-center">
                      <div className="text-sm font-bold text-foreground-950">{selectedDeadline.submission_status}</div>
                      <div className="text-xs text-foreground-500">Statut dossier</div>
                    </div>
                    <div className="p-4 bg-background-100 rounded-lg text-center">
                      <div className="text-2xl font-bold text-foreground-950">{selectedDeadline.completion_pct}%</div>
                      <div className="text-xs text-foreground-500">Complétion</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-foreground-500">Progression du dossier</span>
                    </div>
                    {renderScoreBar(selectedDeadline.completion_pct, 100, selectedDeadline.completion_pct >= 60 ? 'bg-green-500' : selectedDeadline.completion_pct >= 30 ? 'bg-orange-500' : 'bg-red-500')}
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Plan d'actions recommandé</h4>
                    <div className="space-y-2">
                      {selectedDeadline.completion_pct < 10 && (
                        <div className="flex items-center gap-2 text-xs text-red-600"><i className="ri-alert-line"></i> Démarrer immédiatement la préparation du dossier</div>
                      )}
                      {selectedDeadline.completion_pct < 40 && (
                        <div className="flex items-center gap-2 text-xs text-orange-600"><i className="ri-file-list-3-line"></i> Rassembler les documents requis et CV experts</div>
                      )}
                      {selectedDeadline.completion_pct < 80 && (
                        <div className="flex items-center gap-2 text-xs text-secondary-600"><i className="ri-draft-line"></i> Finaliser l'offre technique et la méthodologie</div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-foreground-600"><i className="ri-check-double-line"></i> Relecture qualité Big Four avant soumission</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-12 text-center">
                  <i className="ri-timer-line text-4xl text-foreground-300 mb-4 block"></i>
                  <p className="text-sm text-foreground-500">Sélectionnez une échéance pour voir le détail</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ONGLET 6 : BID KNOWLEDGE ENGINE ===== */}
        {activeTab === 'knowledge' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                  <i className="ri-database-2-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Bid Knowledge Engine</h3>
                  <p className="text-xs text-foreground-500">{knowledgeBase.length} entrées — Base RAG vectorielle</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-secondary-200 bg-secondary-50/50 mb-3">
                <div className="text-xs text-foreground-500">Statistiques</div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-center"><div className="text-sm font-bold text-green-600">{knowledgeBase.filter(k => k.category.includes('Gagnés')).length}</div><div className="text-[10px] text-foreground-400">AO Gagnés</div></div>
                  <div className="text-center"><div className="text-sm font-bold text-red-600">{knowledgeBase.filter(k => k.category.includes('Perdus')).length}</div><div className="text-[10px] text-foreground-400">AO Perdus</div></div>
                  <div className="text-center"><div className="text-sm font-bold text-secondary-600">{knowledgeBase.filter(k => k.category.includes('Techniques')).length}</div><div className="text-[10px] text-foreground-400">Réponses</div></div>
                  <div className="text-center"><div className="text-sm font-bold text-accent-500">{knowledgeBase.filter(k => k.category.includes('Références')).length}</div><div className="text-[10px] text-foreground-400">Références</div></div>
                </div>
              </div>
              {knowledgeBase.map((kb) => (
                <div
                  key={kb.id}
                  onClick={() => setSelectedKnowledge(kb)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedKnowledge?.id === kb.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getKbCategoryBadge(kb.category)}`}>{kb.category}</span>
                    {kb.usage_count !== undefined && <span className="text-xs text-foreground-400">{kb.usage_count} utilisations</span>}
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{kb.title}</h4>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {kb.similarity_tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-background-100 text-foreground-500">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              {selectedKnowledge ? (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getKbCategoryBadge(selectedKnowledge.category)}`}>{selectedKnowledge.category}</span>
                    <span className="text-xs text-foreground-400">{selectedKnowledge.date}</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedKnowledge.title}</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {selectedKnowledge.contract_value !== undefined && (
                      <div className="p-3 bg-background-100 rounded-lg text-center">
                        <div className="text-lg font-bold text-foreground-950">{formatFCFA(selectedKnowledge.contract_value)} FCFA</div>
                        <div className="text-xs text-foreground-500">Valeur Contrat</div>
                      </div>
                    )}
                    {selectedKnowledge.lost_to && (
                      <div className="p-3 bg-red-50/50 rounded-lg text-center">
                        <div className="text-sm font-bold text-red-600">{selectedKnowledge.lost_to}</div>
                        <div className="text-xs text-foreground-500">Perdu face à</div>
                      </div>
                    )}
                    {selectedKnowledge.usage_count !== undefined && (
                      <div className="p-3 bg-background-100 rounded-lg text-center">
                        <div className="text-lg font-bold text-accent-500">{selectedKnowledge.usage_count}</div>
                        <div className="text-xs text-foreground-500">Utilisations</div>
                      </div>
                    )}
                    {selectedKnowledge.template_available !== undefined && (
                      <div className="p-3 bg-green-50/50 rounded-lg text-center">
                        <div className="text-sm font-bold text-green-600">{selectedKnowledge.template_available ? '✅ Disponible' : '❌ Non disponible'}</div>
                        <div className="text-xs text-foreground-500">Template</div>
                      </div>
                    )}
                  </div>
                  {selectedKnowledge.lesson && (
                    <div className="p-4 bg-red-50/50 rounded-lg border border-red-100 mb-4">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-1">Leçon apprise</h4>
                      <p className="text-xs text-foreground-600">{selectedKnowledge.lesson}</p>
                    </div>
                  )}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-2">Documents associés</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedKnowledge.relevant_docs.map((doc) => (
                        <span key={doc} className="text-xs px-2 py-1 rounded bg-background-100 text-foreground-600 border border-background-200/70">{doc}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground-950 mb-2">Tags de similarité (RAG vectoriel)</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedKnowledge.similarity_tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-secondary-50 text-secondary-700 border border-secondary-100">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-12 text-center">
                  <i className="ri-database-2-line text-4xl text-foreground-300 mb-4 block"></i>
                  <p className="text-sm text-foreground-500">Sélectionnez une entrée pour voir le détail</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ONGLET 7 : AUTO RESPONSE PREPARATION ===== */}
        {activeTab === 'response' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 text-green-700">
                  <i className="ri-file-text-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Auto Response Preparation</h3>
                  <p className="text-xs text-foreground-500">{autoResponses.length} dossiers en préparation</p>
                </div>
              </div>
              {autoResponses.map((r) => {
                const tender = rawTenders.find(t => t.id === r.tender_id);
                const completion = parseInt(r.status);
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedResponse(r)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedResponse?.id === r.id ? 'border-green-300 bg-green-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-foreground-500 truncate max-w-[200px]">{tender?.tender_title?.substring(0, 40)}...</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${completion >= 70 ? 'bg-green-100 text-green-700' : completion >= 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{r.status}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-foreground-500">{r.components_generated.length} composants</span>
                      <span className="text-foreground-400">{r.last_updated}</span>
                    </div>
                    <div className="mt-2 h-1 bg-background-200/70 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${completion >= 70 ? 'bg-green-500' : completion >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${completion}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="lg:col-span-2">
              {selectedResponse ? (
                (() => {
                  const tender = rawTenders.find(t => t.id === selectedResponse.tender_id);
                  const completion = parseInt(selectedResponse.status);
                  return (
                    <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${completion >= 70 ? 'bg-green-100 text-green-700' : completion >= 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{selectedResponse.status}</span>
                        <span className="text-xs text-foreground-400">Mis à jour le {selectedResponse.last_updated}</span>
                        {tender && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(tender.qualification_status)}`}>
                            {tender.qualification_status === 'CRITICAL' ? '🔥 CRITIQUE' : tender.qualification_status === 'HIGH' ? '🟢 ÉLEVÉE' : '🟡 ÉVALUER'}
                          </span>
                        )}
                      </div>
                      {tender && <h2 className="text-lg font-bold text-foreground-950 mb-4">{tender.tender_title}</h2>}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-foreground-500">Progression globale</span>
                          <span className="text-xs font-bold text-foreground-950">{completion}%</span>
                        </div>
                        {renderScoreBar(completion, 100, completion >= 70 ? 'bg-green-500' : completion >= 40 ? 'bg-yellow-500' : 'bg-red-500')}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                          <h4 className="text-sm font-semibold text-foreground-950 mb-3">Composants générés</h4>
                          <div className="space-y-2">
                            {selectedResponse.components_generated.map((comp) => (
                              <div key={comp} className="flex items-center gap-2 text-xs">
                                <i className="ri-check-line text-green-600"></i>
                                <span className="text-foreground-600">{comp}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                          <h4 className="text-sm font-semibold text-foreground-950 mb-3">Composants en attente</h4>
                          <div className="space-y-2">
                            {['Note de compréhension', 'Méthodologie', 'Planning', 'Matrice des risques', 'Composition d\'équipe', 'Liste des experts', 'Références pertinentes', 'Questions de clarification']
                              .filter(c => !selectedResponse.components_generated.includes(c))
                              .map((comp) => (
                                <div key={comp} className="flex items-center gap-2 text-xs">
                                  <i className="ri-time-line text-yellow-600"></i>
                                  <span className="text-foreground-500">{comp}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="whitespace-nowrap px-4 py-2 rounded-lg bg-accent-500 text-background-50 text-sm font-medium hover:bg-accent-600 transition-colors cursor-pointer">
                          <i className="ri-magic-line mr-1"></i>Générer les composants manquants
                        </button>
                        <button className="whitespace-nowrap px-4 py-2 rounded-lg border border-background-200/70 text-foreground-600 text-sm font-medium hover:bg-background-100 transition-colors cursor-pointer">
                          <i className="ri-download-line mr-1"></i>Exporter le dossier
                        </button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-12 text-center">
                  <i className="ri-file-text-line text-4xl text-foreground-300 mb-4 block"></i>
                  <p className="text-sm text-foreground-500">Sélectionnez un dossier pour voir le détail</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ONGLET 8 : INTERNATIONAL DONOR INTELLIGENCE ===== */}
        {activeTab === 'bailleurs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <i className="ri-building-4-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Donor Intelligence Engine</h3>
                  <p className="text-xs text-foreground-500">{donorIntelligence.length} bailleurs — {donorStats.donors_accredited} accrédités</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-2">Budget Total Disponible</div>
                <div className="text-lg font-bold text-emerald-700">{donorStats.total_budget_available_usd > 0 ? (donorStats.total_budget_available_usd / 1_000_000_000).toFixed(0) : '—'} Md USD</div>
                <div className="text-xs text-foreground-400 mt-1">Portefeuille Afrique : {donorStats.total_africa_portfolio_usd > 0 ? (donorStats.total_africa_portfolio_usd / 1_000_000_000).toFixed(0) : '—'} Md USD</div>
              </div>
              <div className="p-3 rounded-lg border border-background-200/70 bg-background-50 mb-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center"><div className="text-sm font-bold text-green-600">{donorStats.donors_accredited}</div><div className="text-[10px] text-foreground-400">Accrédités</div></div>
                  <div className="text-center"><div className="text-sm font-bold text-yellow-600">{donorStats.donors_in_progress}</div><div className="text-[10px] text-foreground-400">En cours</div></div>
                  <div className="text-center"><div className="text-sm font-bold text-red-600">{donorStats.donors_unaccredited}</div><div className="text-[10px] text-foreground-400">Non accrédités</div></div>
                  <div className="text-center"><div className="text-sm font-bold text-accent-500">{donorStats.won_contracts_cumulative}</div><div className="text-[10px] text-foreground-400">Contrats gagnés</div></div>
                </div>
              </div>
              {donorIntelligence.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDonor(d)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedDonor?.id === d.id ? 'border-emerald-300 bg-emerald-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{d.type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      d.risk_level === 'Faible' ? 'bg-green-100 text-green-700' : d.risk_level === 'Moyen' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>{d.risk_level}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{d.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">Match {d.khepra_match_score}%</span>
                    <span className="text-xs font-bold text-emerald-600">{d.won_contracts > 0 ? `${formatFCFA(d.cumulative_won_fcfa)}` : '—'}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              {selectedDonor ? (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedDonor.type}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium">{selectedDonor.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      selectedDonor.risk_level === 'Faible' ? 'bg-green-100 text-green-700' : selectedDonor.risk_level === 'Moyen' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>Risque {selectedDonor.risk_level}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${
                      selectedDonor.eligibility_status === 'Accrédité' ? 'bg-green-100 text-green-700' : selectedDonor.eligibility_status.includes('cours') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>{selectedDonor.eligibility_status}</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedDonor.name}</h2>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="flex justify-center mb-1">{renderGaugeCircle(selectedDonor.khepra_match_score, 100, '', 52, selectedDonor.khepra_match_score >= 80 ? '#22c55e' : selectedDonor.khepra_match_score >= 60 ? '#f59e0b' : '#ef4444')}</div>
                      <div className="text-xs text-foreground-500">Match Khepra</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="text-lg font-bold text-foreground-950">{selectedDonor.annual_budget_usd > 0 ? (selectedDonor.annual_budget_usd / 1_000_000_000).toFixed(0) : '—'} Md$</div>
                      <div className="text-xs text-foreground-500">Budget Annuel</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="text-sm font-bold text-foreground-950">{selectedDonor.active_projects}</div>
                      <div className="text-xs text-foreground-500">Projets Actifs</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="text-sm font-bold text-green-600">{selectedDonor.historical_win_rate}%</div>
                      <div className="text-xs text-foreground-500">Win Rate</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-2">Secteurs Clés</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedDonor.key_sectors.map((s) => (
                          <span key={s} className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-2">Instruments de Financement</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedDonor.funding_instruments.map((fi) => (
                          <span key={fi} className="text-xs px-2 py-0.5 rounded bg-background-200/70 text-foreground-600">{fi}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-2">Performance Khepra</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground-500">Contrats gagnés</span>
                          <span className="font-bold text-foreground-950">{selectedDonor.won_contracts}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground-500">Cumul gagné</span>
                          <span className="font-bold text-emerald-600">{formatFCFA(selectedDonor.cumulative_won_fcfa)} FCFA</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground-500">AO en cours</span>
                          <span className="font-bold text-foreground-950">{selectedDonor.active_tenders_related}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground-500">Force relation</span>
                          {renderScoreBar(selectedDonor.relationship_strength * 10, 100, 'bg-emerald-500')}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-2">Stratégie & Opportunités</h4>
                      <p className="text-xs text-foreground-600 leading-relaxed mb-2">{selectedDonor.strategic_notes}</p>
                      <div className="pt-2 border-t border-background-200/70">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-foreground-500">Cycle en cours</span>
                          <span className="font-bold text-foreground-950">{selectedDonor.recent_cycle}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground-500">Prochaine fenêtre</span>
                          <span className="font-bold text-accent-500">{selectedDonor.next_funding_window}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-user-search-line text-foreground-400 text-sm"></i>
                      <span className="text-xs font-semibold text-foreground-950">Contact Perspective</span>
                    </div>
                    <p className="text-xs text-foreground-600">{selectedDonor.contact_perspective}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-12 text-center">
                  <i className="ri-building-4-line text-4xl text-foreground-300 mb-4 block"></i>
                  <p className="text-sm text-foreground-500">Sélectionnez un bailleur pour voir l'intelligence détaillée</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">KPI Automatiques — Tender & Donor Intelligence Engine</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">AO Détectés</div>
              <div className="text-lg font-bold text-foreground-950">{kpiOverview.total_tenders_detected}</div>
              <div className="text-xs text-foreground-400 mt-2">depuis le lancement</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">AO Qualifiés</div>
              <div className="text-lg font-bold text-accent-500">{kpiOverview.tenders_qualified}</div>
              <div className="text-xs text-foreground-400 mt-2">taux {kpiOverview.total_tenders_detected > 0 ? (kpiOverview.tenders_qualified / kpiOverview.total_tenders_detected * 100).toFixed(0) : 0}%</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">AO Soumis</div>
              <div className="text-lg font-bold text-primary-500">{kpiOverview.tenders_submitted}</div>
              <div className="text-xs text-foreground-400 mt-2">depuis le lancement</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">AO Gagnés</div>
              <div className="text-lg font-bold text-green-600">{kpiOverview.tenders_won}</div>
              <div className="text-xs text-foreground-400 mt-2">taux {kpiOverview.conversion_rate}%</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Valeur Marchés</div>
              <div className="text-lg font-bold text-accent-500">{formatFCFA(kpiOverview.cumulative_contract_value_fcfa)}</div>
              <div className="text-xs text-foreground-400 mt-2">FCFA cumulés</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Sources Actives</div>
              <div className="text-lg font-bold text-primary-500">{kpiOverview.sources_active}/{kpiOverview.sources_total}</div>
              <div className="text-xs text-foreground-400 mt-2">24h/24 · 7j/7</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Bailleurs Accrédités</div>
              <div className="text-lg font-bold text-emerald-600">{donorStats.donors_accredited}/{donorStats.total_donors_tracked}</div>
              <div className="text-xs text-foreground-400 mt-2">Budget {donorStats.total_budget_available_usd > 0 ? (donorStats.total_budget_available_usd / 1_000_000_000).toFixed(0) : '—'} Md$</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Contrats Bailleurs</div>
              <div className="text-lg font-bold text-green-600">{donorStats.won_contracts_cumulative}</div>
              <div className="text-xs text-foreground-400 mt-2">{formatFCFA(donorStats.cumulative_won_fcfa)} FCFA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOAST CONFIRMATION ===== */}
      {emailSent && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="px-5 py-3 rounded-lg bg-emerald-600 text-white shadow-lg flex items-center gap-3">
            <i className="ri-check-double-line text-lg"></i>
            <div>
              <div className="text-sm font-semibold">Email envoyé avec succès !</div>
              <div className="text-xs opacity-80">Rapport AO/AMI transmis à contact@khepraexperts.com via Resend — {emailStats.totalQualified} AO/AMI qualifiés</div>
            </div>
            <button onClick={() => setEmailSent(false)} className="ml-2 text-white/70 hover:text-white cursor-pointer">
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      )}

      {/* ===== APERÇU EMAIL MODAL ===== */}
      {showEmailPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowEmailPreview(false)}>
          <div className="bg-background-50 rounded-xl border border-background-200/70 shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-background-200/70 bg-background-100">
              <div>
                <h3 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
                  <i className="ri-mail-line text-accent-500"></i>
                  Aperçu de l'email
                </h3>
                <p className="text-xs text-foreground-500 mt-0.5">
                  Destinataire : <strong className="text-accent-600">contact@khepraexperts.com</strong> · {emailStats.totalQualified} AO/AMI qualifiés · Budget cumulé : {formatFCFA(emailStats.totalBudget)} FCFA
                </p>
              </div>
              <button onClick={() => setShowEmailPreview(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-200/70 cursor-pointer">
                <i className="ri-close-line text-foreground-500"></i>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="rounded-lg border border-background-200/70 overflow-hidden shadow-sm" dangerouslySetInnerHTML={{ __html: buildEmailHtml() }} />
            </div>
            <div className="flex items-center gap-3 px-6 py-4 border-t border-background-200/70 bg-background-100">
              <button
                onClick={() => {
                  setShowEmailPreview(false);
                  handleAutoNotify();
                }}
                disabled={emailSending}
                className="whitespace-nowrap px-5 py-2.5 rounded-lg bg-accent-500 text-background-50 text-sm font-semibold hover:bg-accent-600 transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <i className="ri-mail-send-line"></i>
                {emailSending ? 'Envoi en cours...' : 'Envoyer maintenant'}
              </button>
              <button
                onClick={() => setShowEmailPreview(false)}
                className="whitespace-nowrap px-4 py-2.5 rounded-lg border border-background-200/70 text-foreground-600 text-sm hover:bg-background-100 transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </KOSHubLayout>
  );
}