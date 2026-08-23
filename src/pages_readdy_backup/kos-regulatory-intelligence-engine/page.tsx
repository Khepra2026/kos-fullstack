import { useState, useMemo, useCallback } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  AUTHORITY_PROFILES, REGULATORY_ALERTS, SYNTHESES, IMPACT_ANALYSES,
  COMPLIANCE_MATRICES, REGULATORY_KPIS, SYSTEM_HEALTH, ACTIVE_AGENTS, EXECUTIVE_KPIS,
} from '@/mocks/regulatoryIntelligenceCenter';
import type { RegulatoryAlert, Synthese, ImpactAnalysis, ComplianceMatrix, RegulatoryKPI } from '@/mocks/regulatoryIntelligenceCenter';
import TranslateToggle from '@/components/feature/TranslateToggle';
import { useRAGTranslation } from '@/hooks/useRAGTranslation';

type TabId = 'dashboard' | 'alertes' | 'syntheses' | 'impacts' | 'matrices' | 'kpis';

const SEVERITY_STYLES: Record<string, { bg: string; border: string; text: string; dot: string; label: string }> = {
  critique: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'Critique' },
  eleve: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', dot: 'bg-orange-500', label: 'Élevé' },
  moyen: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Moyen' },
  information: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', dot: 'bg-sky-400', label: 'Info' },
};

const STATUS_STYLES: Record<string, string> = {
  nouveau: 'bg-sky-50 text-sky-700 border-sky-200',
  en_analyse: 'bg-amber-50 text-amber-700 border-amber-200',
  analyse_terminee: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cloture: 'bg-slate-100 text-slate-500 border-slate-200',
};

export default function regulatoryIntelligenceCenterPage() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [selectedAuthority, setSelectedAuthority] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [selectedAlert, setSelectedAlert] = useState<RegulatoryAlert | null>(null);
  const [selectedSynthese, setSelectedSynthese] = useState<Synthese | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<ImpactAnalysis | null>(null);
  const [selectedMatrix, setSelectedMatrix] = useState<ComplianceMatrix | null>(null);

  // Translation
  const { lang, setLang, isEn, t, translateBatch, targetLang, setTargetLang, targetLabels, exportCache, cacheCount } = useRAGTranslation();
  const [translatedItems, setTranslatedItems] = useState<Record<string, { titre?: string; resume?: string; desc?: string; mission?: string }>>({});
  const [translatingAll, setTranslatingAll] = useState(false);

  // Total translatable items across all tabs
  const translatableTotal = useMemo(() =>
    REGULATORY_ALERTS.length + SYNTHESES.length + AUTHORITY_PROFILES.length + ACTIVE_AGENTS.length + REGULATORY_KPIS.length * 2,
  []);
  const translatedCount = useMemo(() => {
    let count = 0;
    for (const alert of REGULATORY_ALERTS) { if (translatedItems[alert.id]?.titre) count++; }
    for (const syn of SYNTHESES) { if (translatedItems[`syn-${syn.id}`]?.titre) count++; }
    for (const auth of AUTHORITY_PROFILES) { if (translatedItems[`auth-${auth.id}`]?.desc) count++; }
    for (const agent of ACTIVE_AGENTS) { if (translatedItems[`agent-${agent.id}`]?.mission) count++; }
    for (const kpi of REGULATORY_KPIS) {
      if (translatedItems[`kpi-${kpi.id}`]?.titre) count++;
      if (translatedItems[`kpi-desc-${kpi.id}`]?.desc) count++;
    }
    return count;
  }, [translatedItems]);

  const handleTranslateAll = useCallback(async () => {
    if (!isEn) return;
    setTranslatingAll(true);
    const batch: string[] = [];
    const newTranslated: Record<string, { titre?: string; resume?: string; desc?: string; mission?: string }> = { ...translatedItems };

    for (const alert of REGULATORY_ALERTS) {
      if (!newTranslated[alert.id]?.titre) { batch.push(alert.titre); }
    }
    for (const syn of SYNTHESES) {
      if (!newTranslated[`syn-${syn.id}`]?.titre) { batch.push(syn.titre); }
    }
    for (const auth of AUTHORITY_PROFILES) {
      if (!newTranslated[`auth-${auth.id}`]?.desc) { batch.push(auth.description); }
    }
    for (const agent of ACTIVE_AGENTS) {
      if (!newTranslated[`agent-${agent.id}`]?.mission) { batch.push(agent.mission); }
    }
    for (const kpi of REGULATORY_KPIS) {
      if (!newTranslated[`kpi-${kpi.id}`]?.titre) { batch.push(kpi.nom); }
      if (!newTranslated[`kpi-desc-${kpi.id}`]?.desc) { batch.push(kpi.description); }
    }

    if (batch.length === 0) { setTranslatingAll(false); return; }
    try {
      const translated = await translateBatch(batch);
      let idx = 0;
      for (const alert of REGULATORY_ALERTS) {
        if (!newTranslated[alert.id]?.titre && idx < translated.length) { newTranslated[alert.id] = { ...newTranslated[alert.id], titre: translated[idx] }; idx++; }
      }
      for (const syn of SYNTHESES) {
        if (!newTranslated[`syn-${syn.id}`]?.titre && idx < translated.length) { newTranslated[`syn-${syn.id}`] = { ...newTranslated[`syn-${syn.id}`], titre: translated[idx] }; idx++; }
      }
      for (const auth of AUTHORITY_PROFILES) {
        if (!newTranslated[`auth-${auth.id}`]?.desc && idx < translated.length) { newTranslated[`auth-${auth.id}`] = { ...newTranslated[`auth-${auth.id}`], desc: translated[idx] }; idx++; }
      }
      for (const agent of ACTIVE_AGENTS) {
        if (!newTranslated[`agent-${agent.id}`]?.mission && idx < translated.length) { newTranslated[`agent-${agent.id}`] = { ...newTranslated[`agent-${agent.id}`], mission: translated[idx] }; idx++; }
      }
      for (const kpi of REGULATORY_KPIS) {
        if (!newTranslated[`kpi-${kpi.id}`]?.titre && idx < translated.length) { newTranslated[`kpi-${kpi.id}`] = { ...newTranslated[`kpi-${kpi.id}`], titre: translated[idx] }; idx++; }
        if (!newTranslated[`kpi-desc-${kpi.id}`]?.desc && idx < translated.length) { newTranslated[`kpi-desc-${kpi.id}`] = { ...newTranslated[`kpi-desc-${kpi.id}`], desc: translated[idx] }; idx++; }
      }
      setTranslatedItems(newTranslated);
    } catch { /* silent */ }
    setTranslatingAll(false);
  }, [isEn, translatedItems, translateBatch]);

  const filteredAlerts = useMemo(() => {
    let items = REGULATORY_ALERTS;
    if (selectedAuthority !== 'all') items = items.filter(a => a.autorite === selectedAuthority);
    if (severityFilter !== 'all') items = items.filter(a => a.severite === severityFilter);
    return items.sort((a, b) => new Date(b.date_detection).getTime() - new Date(a.date_detection).getTime());
  }, [selectedAuthority, severityFilter]);

  const matchedImpacts = useMemo(() => {
    if (!selectedAlert) return [];
    return IMPACT_ANALYSES.filter(ia => ia.alerte_ref === selectedAlert.id);
  }, [selectedAlert]);

  const stats = useMemo(() => ({
    total: REGULATORY_ALERTS.length,
    critiques: REGULATORY_ALERTS.filter(a => a.severite === 'critique').length,
    nouveautes: REGULATORY_ALERTS.filter(a => a.statut === 'nouveau' || a.statut === 'en_analyse').length,
    syntheses: SYNTHESES.length,
    impacts: IMPACT_ANALYSES.length,
    matrices: COMPLIANCE_MATRICES.length,
  }), []);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line', count: `${EXECUTIVE_KPIS.score_global}/100` },
    { id: 'alertes', label: 'Alertes Live', icon: 'ri-radar-line', count: `${stats.total}` },
    { id: 'syntheses', label: 'Synthèses', icon: 'ri-file-text-line', count: `${stats.syntheses}` },
    { id: 'impacts', label: 'Analyses d\'Impact', icon: 'ri-brain-line', count: `${stats.impacts}` },
    { id: 'matrices', label: 'Matrices Conformité', icon: 'ri-grid-line', count: `${stats.matrices}` },
    { id: 'kpis', label: 'KPIs', icon: 'ri-line-chart-line', count: `${REGULATORY_KPIS.length}` },
  ];

  return (
    <hubLayout hubId={67}>
      <SeoHead
        title="KOS Regulatory Intelligence Center™ — Veille Permanente 8 Autorités | KHEPRA EXPERTS"
        description="Centre de veille réglementaire Big Four. Surveillance BCEAO, UEMOA, OHADA, COBAC, BAD, Banque Mondiale, FMI, Nations Unies. Alertes, synthèses, analyses d'impact, matrices de conformité. Score 92/100. PwC/Deloitte/EY/KPMG Grade."
        keywords="KOS Regulatory Intelligence, veille réglementaire BCEAO, UEMOA OHADA COBAC, BAD Banque Mondiale FMI Nations Unies, alertes réglementaires, analyses d'impact, matrices conformité, KHEPRA EXPERTS"
        canonicalPath="/kos-regulatory-intelligence-engine"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20sophisticated%20regulatory%20intelligence%20command%20center%20aesthetic%20with%20deep%20emerald%20and%20warm%20bronze%20tones%2C%20elegant%20geometric%20radar%20and%20scanning%20patterns%20suggesting%20real-time%20monitoring%20and%20surveillance%2C%20premium%20institutional%20atmosphere%20with%20interconnected%20nodes%20and%20signal%20wave%20abstract%20forms%2C%20dark%20luxurious%20background%20with%20subtle%20grid%20and%20data%20stream%20patterns%2C%20no%20text%20no%20human%20figures%2C%20Big%20Four%20consulting%20firm%20grade%20visual%20identity&width=1920&height=520&seq=kos-ric-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top opacity-12"
            width="1920"
            height="520"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/70 via-foreground-950/85 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Live Monitoring — {SYSTEM_HEALTH.sources_active} Sources</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-shield-check-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">Big Four Grade — PwC/Deloitte/EY/KPMG</span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Regulatory Intelligence Center.
              <span className="block text-emerald-400 mt-2">8 autorités. Une veille permanente.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              Surveillance continue <strong className="text-white">BCEAO · UEMOA · OHADA · COBAC · BAD · Banque Mondiale · FMI · Nations Unies</strong>.
              <strong className="text-white"> {REGULATORY_KPIS.find(k => k.id === 'KPI-12')?.valeur} textes</strong> suivis.{' '}
              Délai de détection moyen : <strong className="text-emerald-400">{REGULATORY_KPIS.find(k => k.id === 'KPI-01')?.valeur}h</strong>.
              Score global <strong className="text-emerald-400">{EXECUTIVE_KPIS.score_global}/100</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 items-center">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'}`}
              >
                <i className={`${tab.icon} text-base`} />
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>{tab.count}</span>
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <TranslateToggle lang={lang} setLang={setLang} targetLang={targetLang} setTargetLang={setTargetLang} targetLabels={targetLabels} size="sm" />
              {isEn && (
                <>
                <button
                  onClick={handleTranslateAll}
                  disabled={translatingAll || translatedCount >= translatableTotal}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-medium transition-all cursor-pointer border whitespace-nowrap ${
                    translatedCount >= translatableTotal
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : translatingAll
                      ? 'bg-background-100 text-foreground-400 border-background-200'
                      : 'bg-foreground-950 text-background-50 border-foreground-950 hover:bg-foreground-800'
                  }`}
                >
                  {translatingAll ? (
                    <>
                      <div className="w-2.5 h-2.5 border border-background-50 border-t-transparent rounded-full animate-spin"></div>
                      {t('Traduction...', 'Translating...')}
                    </>
                  ) : translatedCount >= translatableTotal ? (
                    <>
                      <i className="ri-check-double-line text-[10px]"></i>
                      {t('Tout traduit', 'All Translated')}
                    </>
                  ) : (
                    <>
                      <i className="ri-translate-2 text-[10px]"></i>
                      {t('Traduire tout', 'Translate All')}
                      {translatedCount > 0 && (
                        <span className={`ml-1 px-1 py-0.5 rounded-full text-[9px] font-bold ${translatedCount >= translatableTotal / 2 ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'}`}>
                          {translatedCount}/{translatableTotal}
                        </span>
                      )}
                    </>
                  )}
                </button>
                {cacheCount > 0 && (
                  <div className="relative group">
                    <button className="inline-flex items-center gap-1 px-2 py-1.5 rounded-full text-[10px] font-medium border border-background-200 bg-background-50 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap">
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
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ DASHBOARD ═══════════ */}
      {activeTab === 'dashboard' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
              {[
                { label: 'Score Global', value: `${EXECUTIVE_KPIS.score_global}/100`, icon: 'ri-shield-check-line', color: '#86BC25' },
                { label: 'Couverture', value: `${EXECUTIVE_KPIS.couverture_globale}%`, icon: 'ri-global-line', color: '#C2410C' },
                { label: 'Délai Détection', value: `${EXECUTIVE_KPIS.delai_detection_moyen_h}h`, icon: 'ri-timer-line', color: '#4285F4' },
                { label: 'Délai Analyse', value: `${EXECUTIVE_KPIS.delai_analyse_moyen_h}h`, icon: 'ri-time-line', color: '#CA8A04' },
                { label: 'Alertes Critiques', value: String(EXECUTIVE_KPIS.alertes_critiques_mois), icon: 'ri-error-warning-line', color: '#DC2626' },
                { label: 'Textes Suivis', value: String(EXECUTIVE_KPIS.textes_suivis), icon: 'ri-book-2-line', color: '#D97757' },
                { label: 'Transfo. Mission', value: `${EXECUTIVE_KPIS.taux_transformation}%`, icon: 'ri-funds-line', color: '#059669' },
                { label: 'Uptime', value: `${SYSTEM_HEALTH.uptime}%`, icon: 'ri-cloud-line', color: '#4A90D9' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                  </div>
                  <span className="block text-lg font-bold text-foreground-950">{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Authority Grid */}
            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-building-2-line text-emerald-600" />Autorités Surveillées — {AUTHORITY_PROFILES.length} Sources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {AUTHORITY_PROFILES.map(auth => (
                  <div key={auth.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setSelectedAuthority(auth.acronyme); setActiveTab('alertes'); }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${auth.color}15` }}>
                        <i className={`${auth.icon} text-lg`} style={{ color: auth.color }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950">{auth.acronyme}</h3>
                        <span className="text-[10px] text-foreground-400">{auth.zone} · {auth.textes_suivis} textes</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                      <div className="p-2 rounded-lg bg-background-100">
                        <span className="block text-sm font-bold" style={{ color: auth.color }}>{auth.couverture}%</span>
                        <span className="text-[10px] text-foreground-400">Couverture</span>
                      </div>
                      <div className="p-2 rounded-lg bg-background-100">
                        <span className="block text-sm font-bold text-foreground-800">{auth.delai_detection_moyen_h}h</span>
                        <span className="text-[10px] text-foreground-400">Détection</span>
                      </div>
                      <div className="p-2 rounded-lg bg-background-100">
                        <span className="block text-sm font-bold text-foreground-800">{auth.alertes_30j}</span>
                        <span className="text-[10px] text-foreground-400">Alertes/30j</span>
                      </div>
                    </div>
                    <p className="text-xs text-foreground-500 line-clamp-2">{isEn && translatedItems[`auth-${auth.id}`]?.desc ? translatedItems[`auth-${auth.id}`].desc : auth.description}</p>
                    <p className="text-[10px] text-foreground-400 mt-2">Dernier texte : {auth.dernier_texte.substring(0, 60)}...</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health + Agents */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Santé Système — {SYSTEM_HEALTH.status === 'operational' ? 'Opérationnel' : 'Dégradé'}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Sources Actives', value: `${SYSTEM_HEALTH.sources_active}/8`, color: '#86BC25' },
                    { label: 'Alertes 30j', value: String(SYSTEM_HEALTH.total_alerts_30j), color: '#C2410C' },
                    { label: 'Dernier Scan', value: new Date(SYSTEM_HEALTH.last_scan).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), color: '#4285F4' },
                    { label: 'API Calls/24h', value: String(SYSTEM_HEALTH.api_calls_24h), color: '#CA8A04' },
                  ].map(s => (
                    <div key={s.label} className="p-3 rounded-xl bg-background-100 text-center">
                      <span className="block text-lg font-bold" style={{ color: s.color }}>{s.value}</span>
                      <span className="text-[10px] text-foreground-400">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Agents Actifs — {ACTIVE_AGENTS.length}</h3>
                <div className="space-y-3">
                  {ACTIVE_AGENTS.map(agent => (
                    <div key={agent.id} className="flex items-center gap-3 p-3 rounded-xl bg-background-100">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <i className={`${agent.icon} text-emerald-600 text-sm`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-foreground-800 block">{agent.nom}</span>
                        <span className="text-[10px] text-foreground-400">{isEn && translatedItems[`agent-${agent.id}`]?.mission ? translatedItems[`agent-${agent.id}`].mission : agent.mission}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Actif
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
                {[
                  { label: 'Alertes', value: stats.total, sub: 'derniers 30j' },
                  { label: 'Critiques', value: stats.critiques, sub: 'action requise' },
                  { label: 'Synthèses', value: stats.syntheses, sub: 'publiées' },
                  { label: 'Analyses', value: stats.impacts, sub: 'd\'impact' },
                  { label: 'Matrices', value: stats.matrices, sub: 'actives' },
                  { label: 'KPIs', value: REGULATORY_KPIS.length, sub: 'trackés' },
                  { label: 'Agents', value: ACTIVE_AGENTS.length, sub: 'en production' },
                  { label: 'Sources', value: AUTHORITY_PROFILES.length, sub: 'surveillées' },
                ].map(s => (
                  <div key={s.label}>
                    <span className="block text-2xl font-bold text-white">{s.value}</span>
                    <span className="text-xs text-gray-400">{s.label}</span>
                    <span className="block text-[10px] text-gray-500">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ ALERTES ═══════════ */}
      {activeTab === 'alertes' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Alertes Live — {filteredAlerts.length} Alertes</h2>
                <p className="text-foreground-600">Surveillance continue · Scan quotidien 06:00 · Alertes critiques en temps réel</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <select value={selectedAuthority} onChange={e => setSelectedAuthority(e.target.value)} className="px-3 py-2 rounded-full bg-background-50 border border-background-200 text-sm font-bold cursor-pointer text-foreground-700">
                  <option value="all">Toutes autorités</option>
                  {AUTHORITY_PROFILES.map(a => <option key={a.id} value={a.acronyme}>{a.acronyme}</option>)}
                </select>
                <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="px-3 py-2 rounded-full bg-background-50 border border-background-200 text-sm font-bold cursor-pointer text-foreground-700">
                  <option value="all">Toutes sévérités</option>
                  <option value="critique">Critique</option>
                  <option value="eleve">Élevé</option>
                  <option value="moyen">Moyen</option>
                  <option value="information">Information</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredAlerts.map(alert => {
                const sev = SEVERITY_STYLES[alert.severite];
                const isSelected = selectedAlert?.id === alert.id;
                return (
                  <div key={alert.id} className={`rounded-2xl border transition-all ${isSelected ? 'border-foreground-300 bg-background-50 shadow-lg' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                    <button onClick={() => setSelectedAlert(isSelected ? null : alert)} className="w-full p-4 sm:p-5 text-left flex items-start gap-4 cursor-pointer">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1.5 ${sev.dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-bold text-foreground-950">{isEn && translatedItems[alert.id]?.titre ? translatedItems[alert.id].titre : alert.titre}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${sev.bg} ${sev.border} ${sev.text}`}>{sev.label}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{alert.autorite}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${STATUS_STYLES[alert.statut]}`}>
                            {alert.statut === 'nouveau' ? 'Nouveau' : alert.statut === 'en_analyse' ? 'En analyse' : alert.statut === 'analyse_terminee' ? 'Analysé' : 'Clôturé'}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-500 line-clamp-2">{alert.resume}</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-400">
                          <span><i className="ri-calendar-line mr-1" />Publié : {new Date(alert.date_publication).toLocaleDateString('fr-FR')}</span>
                          <span><i className="ri-time-line mr-1" />Détecté en {alert.delai_detection_h}h</span>
                          <span>{alert.domaine}</span>
                        </div>
                      </div>
                      <i className={`ri-${isSelected ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                    </button>
                    {isSelected && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Description complète</span>
                              <p className="text-sm text-foreground-800 mt-1">{alert.description}</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Impact Métier</span>
                              <p className="text-sm text-foreground-800 mt-1">{alert.impact_metier}</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
                              <span className="text-[10px] font-bold text-accent-700 uppercase tracking-wider">Action Recommandée</span>
                              <p className="text-sm text-accent-800 mt-1">{alert.action_recommandee}</p>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {alert.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-mono">{tag}</span>
                              ))}
                            </div>
                            {alert.url_source && (
                              <a href={alert.url_source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-accent-600 font-bold hover:underline">
                                <i className="ri-external-link-line" />Source officielle
                              </a>
                            )}
                          </div>
                        </div>
                        {matchedImpacts.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-background-200/70">
                            <span className="text-xs font-bold text-foreground-700">Analyse d'impact disponible — voir onglet "Analyses d'Impact"</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ SYNTHESES ═══════════ */}
      {activeTab === 'syntheses' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Synthèses Réglementaires — {SYNTHESES.length} Publications</h2>
              <p className="text-foreground-600">Synthèses périodiques, focus thématiques, analyses transversales — niveau Big Four</p>
            </div>
            <div className="space-y-5">
              {SYNTHESES.map(syn => {
                const isSelected = selectedSynthese?.id === syn.id;
                return (
                  <div key={syn.id} className={`rounded-2xl border transition-all ${isSelected ? 'border-foreground-300 bg-background-50 shadow-lg' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                    <button onClick={() => setSelectedSynthese(isSelected ? null : syn)} className="w-full p-5 text-left cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                          <i className="ri-file-text-line text-emerald-600 text-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-sm font-bold text-foreground-950">{isEn && translatedItems[`syn-${syn.id}`]?.titre ? translatedItems[`syn-${syn.id}`].titre : syn.titre}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">{syn.periode}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">Priorité {syn.score_priorite}/100</span>
                          </div>
                          <p className="text-xs text-foreground-500 line-clamp-2">{syn.resume_executif}</p>
                          <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-400">
                            <span><i className="ri-calendar-line mr-1" />{new Date(syn.date_publication).toLocaleDateString('fr-FR')}</span>
                            <span>{syn.volume_alertes} alertes · {syn.volume_textes} textes</span>
                            <span>Produit en {syn.delai_production_j}j</span>
                          </div>
                        </div>
                        <i className={`ri-${isSelected ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                      </div>
                    </button>
                    {isSelected && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 space-y-4">
                        <div>
                          <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Faits Marquants</span>
                          <ul className="mt-2 space-y-1.5">
                            {syn.faits_marquants.map((f, i) => (
                              <li key={i} className="text-xs text-foreground-700 flex items-start gap-2">
                                <i className="ri-circle-fill text-[4px] text-accent-500 mt-1.5 flex-shrink-0" />{f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Recommandations Stratégiques</span>
                          <ul className="mt-2 space-y-1.5">
                            {syn.recommandations_strategiques.map((r, i) => (
                              <li key={i} className="text-xs text-foreground-700 flex items-start gap-2">
                                <i className="ri-lightbulb-line text-accent-500 mt-0.5 flex-shrink-0" />{r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ IMPACTS ═══════════ */}
      {activeTab === 'impacts' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Analyses d'Impact — {IMPACT_ANALYSES.length} Analyses</h2>
              <p className="text-foreground-600">Analyses d'impact détaillées niveau Big Four : obligations, coûts, risques, opportunités, recommandations</p>
            </div>
            <div className="space-y-5">
              {IMPACT_ANALYSES.map(imp => {
                const isSelected = selectedImpact?.id === imp.id;
                const sev = SEVERITY_STYLES[imp.niveau_impact];
                return (
                  <div key={imp.id} className={`rounded-2xl border transition-all ${isSelected ? 'border-foreground-300 bg-background-50 shadow-lg' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                    <button onClick={() => setSelectedImpact(isSelected ? null : imp)} className="w-full p-5 text-left cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: imp.niveau_impact === 'critique' ? '#FEE2E2' : '#FEF3C7' }}>
                          <span className="text-lg font-bold" style={{ color: imp.niveau_impact === 'critique' ? '#DC2626' : '#CA8A04' }}>{imp.score_impact}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-sm font-bold text-foreground-950">{imp.titre}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${sev.bg} ${sev.border} ${sev.text}`}>{sev.label}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{imp.autorite}</span>
                          </div>
                          <p className="text-xs text-foreground-500 line-clamp-2">{imp.description_impact}</p>
                          <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-400">
                            <span>{imp.metiers_impactes.length} métiers impactés</span>
                            <span>Coût estimé : {imp.cout_estime_conformite}</span>
                            <span>Délai : {imp.delai_mise_conformite}</span>
                          </div>
                        </div>
                        <i className={`ri-${isSelected ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                      </div>
                    </button>
                    {isSelected && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Obligations Nouvelles</span>
                              <ul className="mt-1 space-y-1">
                                {imp.obligations_nouvelles.map((o, i) => <li key={i} className="text-xs text-emerald-700 flex items-start gap-1.5"><i className="ri-add-circle-line text-emerald-500 mt-0.5 flex-shrink-0" />{o}</li>)}
                              </ul>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Obligations Modifiées</span>
                              <ul className="mt-1 space-y-1">
                                {imp.obligations_modifiees.map((o, i) => <li key={i} className="text-xs text-amber-700 flex items-start gap-1.5"><i className="ri-edit-circle-line text-amber-500 mt-0.5 flex-shrink-0" />{o}</li>)}
                              </ul>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Risques Non-Conformité</span>
                              <ul className="mt-1 space-y-1">
                                {imp.risques_non_conformite.map((r, i) => <li key={i} className="text-xs text-red-700 flex items-start gap-1.5"><i className="ri-error-warning-line text-red-500 mt-0.5 flex-shrink-0" />{r}</li>)}
                              </ul>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Opportunités</span>
                              <ul className="mt-1 space-y-1">
                                {imp.opportunites.map((o, i) => <li key={i} className="text-xs text-emerald-700 flex items-start gap-1.5"><i className="ri-lightbulb-line text-emerald-500 mt-0.5 flex-shrink-0" />{o}</li>)}
                              </ul>
                            </div>
                            <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
                              <span className="text-[10px] font-bold text-accent-700 uppercase tracking-wider">Recommandations</span>
                              <ul className="mt-1 space-y-1">
                                {imp.recommandations.map((r, i) => <li key={i} className="text-xs text-accent-800 flex items-start gap-1.5"><i className="ri-checkbox-circle-line text-accent-500 mt-0.5 flex-shrink-0" />{r}</li>)}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ MATRICES ═══════════ */}
      {activeTab === 'matrices' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Matrices de Conformité — {COMPLIANCE_MATRICES.length} Matrices</h2>
              <p className="text-foreground-600">Matrices de conformité réglementaire avec obligations, statuts, écarts et plans d'action</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {COMPLIANCE_MATRICES.map(mat => {
                const conformes = mat.obligations.filter(o => o.statut === 'conforme').length;
                const total = mat.obligations.length;
                const pct = Math.round((conformes / total) * 100);
                return (
                  <button key={mat.id} onClick={() => setSelectedMatrix(selectedMatrix?.id === mat.id ? null : mat)} className={`rounded-2xl border p-5 text-left cursor-pointer transition-all ${selectedMatrix?.id === mat.id ? 'border-foreground-300 bg-background-50 ring-2 ring-foreground-200' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: pct >= 80 ? '#D1FAE5' : pct >= 50 ? '#FEF3C7' : '#FEE2E2' }}>
                        <span className="text-sm font-bold" style={{ color: pct >= 80 ? '#059669' : pct >= 50 ? '#CA8A04' : '#DC2626' }}>{mat.score_conformite}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950">{mat.autorite}</h3>
                        <span className="text-[10px] text-foreground-400">{mat.domaine}</span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden mb-2">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: pct >= 80 ? '#059669' : pct >= 50 ? '#CA8A04' : '#DC2626' }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-foreground-400">
                      <span>{conformes}/{total} conformes</span>
                      <span>{pct}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedMatrix && (
              <div className="rounded-2xl bg-background-50 border border-foreground-200/70 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground-950">{selectedMatrix.autorite} — {selectedMatrix.domaine}</h3>
                    <p className="text-xs text-foreground-400">Responsable : {selectedMatrix.responsable} · Mis à jour le {new Date(selectedMatrix.date_mise_a_jour).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <span className="text-sm font-bold text-foreground-500">Score {selectedMatrix.score_conformite}/100</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-background-200">
                        <th className="text-left py-2 px-3 font-bold text-foreground-500 uppercase text-[10px]">Réf</th>
                        <th className="text-left py-2 px-3 font-bold text-foreground-500 uppercase text-[10px]">Obligation</th>
                        <th className="text-left py-2 px-3 font-bold text-foreground-500 uppercase text-[10px]">Statut</th>
                        <th className="text-left py-2 px-3 font-bold text-foreground-500 uppercase text-[10px]">Écart</th>
                        <th className="text-left py-2 px-3 font-bold text-foreground-500 uppercase text-[10px]">Plan d'Action</th>
                        <th className="text-left py-2 px-3 font-bold text-foreground-500 uppercase text-[10px]">Échéance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedMatrix.obligations.map(obl => (
                        <tr key={obl.ref} className="border-b border-background-100">
                          <td className="py-2.5 px-3 font-mono text-[10px] text-foreground-500">{obl.ref}</td>
                          <td className="py-2.5 px-3 text-foreground-800">{obl.description}</td>
                          <td className="py-2.5 px-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                              obl.statut === 'conforme' ? 'bg-emerald-50 text-emerald-700' : obl.statut === 'partiel' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                            }`}>
                              {obl.statut === 'conforme' ? 'Conforme' : obl.statut === 'partiel' ? 'Partiel' : 'Non conforme'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-foreground-600 max-w-[200px]">{obl.ecart}</td>
                          <td className="py-2.5 px-3 text-foreground-600 max-w-[200px]">{obl.plan_action}</td>
                          <td className="py-2.5 px-3 text-[10px] font-bold text-foreground-500 whitespace-nowrap">{obl.echeance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════ KPIs ═══════════ */}
      {activeTab === 'kpis' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">KPIs — {REGULATORY_KPIS.length} Indicateurs</h2>
              <p className="text-foreground-600">Indicateurs clés de performance du Regulatory Intelligence Center — délai de détection, délai d'analyse, taux de couverture</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {REGULATORY_KPIS.map(kpi => (
                <div key={kpi.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{isEn && translatedItems[`kpi-${kpi.id}`]?.titre ? translatedItems[`kpi-${kpi.id}`].titre : kpi.nom}</h3>
                      <span className="text-[10px] text-foreground-400">{kpi.autorite || 'Global'}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                      kpi.tendance === 'hausse' ? 'bg-emerald-50 text-emerald-700' : kpi.tendance === 'baisse' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {kpi.tendance === 'hausse' ? <i className="ri-arrow-up-line mr-0.5 text-[8px]" /> : kpi.tendance === 'baisse' ? <i className="ri-arrow-down-line mr-0.5 text-[8px]" /> : <i className="ri-arrow-right-line mr-0.5 text-[8px]" />}
                      {kpi.tendance === 'hausse' ? 'Hausse' : kpi.tendance === 'baisse' ? 'Baisse' : 'Stable'}
                    </span>
                  </div>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-3xl font-bold font-heading text-foreground-950">{kpi.valeur}</span>
                    <span className="text-sm text-foreground-400 mb-1">{kpi.unite}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-background-100 overflow-hidden mb-2">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(kpi.pourcentage_cible, 100)}%`, backgroundColor: kpi.pourcentage_cible >= 80 ? '#059669' : kpi.pourcentage_cible >= 50 ? '#CA8A04' : '#DC2626' }} />
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-foreground-400">Progression</span>
                    <span className="font-bold text-foreground-600">{kpi.pourcentage_cible}% cible</span>
                  </div>
                  <p className="text-xs text-foreground-500 mt-2">{isEn && translatedItems[`kpi-desc-${kpi.id}`]?.desc ? translatedItems[`kpi-desc-${kpi.id}`].desc : kpi.description}</p>
                  <div className="mt-2 text-[10px] text-foreground-400">
                    Cible : <span className="font-bold text-foreground-600">{kpi.cible} {kpi.unite}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-link Ecosystem */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Regulatory Intelligence — Accès Rapide</h2>
            <p className="text-foreground-600">Navigation vers les modules connectés du KOS Regulatory Intelligence Center™.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Regulatory Intelligence Center', path: '/kos-regulatory-intelligence-engine', icon: 'ri-radar-line', color: '#86BC25', current: true },
              { label: 'Compliance Engine', path: '/kos-regulatory-compliance-engine', icon: 'ri-shield-check-line', color: '#C2410C' },
              { label: 'Compliance Audit', path: '/kos-regulatory-compliance-audit', icon: 'ri-file-search-line', color: '#D97757' },
              { label: 'Veille Réglementaire', path: '/regulatory-intelligence', icon: 'ri-notification-3-line', color: '#EA580C' },
              { label: 'BCEAO Dashboard', path: '/bceao', icon: 'ri-bank-line', color: '#0D7B5F' },
              { label: 'COBAC Dashboard', path: '/cobac', icon: 'ri-building-line', color: '#1A1A2E' },
              { label: 'GAFI Dashboard', path: '/gafi', icon: 'ri-global-line', color: '#8B3A4A' },
              { label: 'OHADA Dashboard', path: '/ohada', icon: 'ri-scales-3-line', color: '#4A7A1E' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${link.current ? 'border-emerald-300 bg-emerald-50/40 ring-2 ring-emerald-400' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && <span className="block text-[10px] text-emerald-700 font-bold mt-1">Vous êtes ici</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



