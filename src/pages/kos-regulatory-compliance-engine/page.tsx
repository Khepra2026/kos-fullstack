import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  REGULATORY_REGISTER as MOCK_REGISTER,
  DOMAIN_GAP_ANALYSIS,
  REMEDIATION_PLAN,
  EXECUTIVE_KPIS,
} from '@/mocks/kosRegulatoryRegister';
import type {
  RegulatoryRegisterEntry,
  DomainGapAnalysis,
  RemediationAction,
  DomainType,
  TextStatus,
  RiskLevel,
} from '@/mocks/kosRegulatoryRegister';
import { useRegulatoryRegister } from '@/hooks/useRegulatoryRegister';
import { useRegulatoryIntelligence } from '@/hooks/useRegulatoryIntelligence';

type TabId = 'executive' | 'register' | 'gaps' | 'remediation' | 'intelligence';

function riskLevelBadge(level: RiskLevel) {
  const map: Record<RiskLevel, { bg: string; border: string; text: string; label: string }> = {
    critique: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Critique' },
    eleve: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: 'Élevé' },
    moyen: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Moyen' },
    faible: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Faible' },
  };
  return map[level];
}

function textStatusBadge(status: TextStatus) {
  const map: Record<TextStatus, { bg: string; border: string; text: string; label: string }> = {
    en_vigueur: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'En vigueur' },
    modifie: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Modifié' },
    remplace: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: 'Remplacé' },
    abroge: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Abrogé' },
    en_revision: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', label: 'En révision' },
  };
  return map[status];
}

function conformiteBadge(c: RegulatoryRegisterEntry['statut_conformite']) {
  const map = {
    conforme: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Conforme' },
    partiel: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Partiel' },
    non_conforme: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Non Conforme' },
    absent: { bg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-500', label: 'Absent' },
  };
  return map[c];
}

function classificationBadge(c: RemediationAction['classification']) {
  const map = {
    critique: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Critique < 7j', dot: 'bg-red-500' },
    majeur: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: 'Majeur < 30j', dot: 'bg-orange-500' },
    modere: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Modéré < 90j', dot: 'bg-amber-500' },
    mineur: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'Mineur < 180j', dot: 'bg-slate-400' },
  };
  return map[c];
}

const DOMAIN_LABELS: Record<DomainType, string> = {
  gouvernance: 'Gouvernance',
  controle_interne: 'Contrôle Interne',
  gestion_risques: 'Gestion des Risques',
  sfd_microfinance: 'SFD / Microfinance',
  comptabilite: 'Comptabilité',
  conformite: 'Conformité',
  cybersecurite_si: 'Cybersécurité & SI',
  finance_reporting: 'Finance & Reporting',
  activites_reglementees: 'Activités Réglementées',
  lcb_ft: 'LCB-FT',
};

const DOMAIN_ICONS: Record<DomainType, string> = {
  gouvernance: 'ri-government-line',
  controle_interne: 'ri-shield-check-line',
  gestion_risques: 'ri-alert-line',
  sfd_microfinance: 'ri-bank-line',
  comptabilite: 'ri-calculator-line',
  conformite: 'ri-file-shield-2-line',
  cybersecurite_si: 'ri-computer-line',
  finance_reporting: 'ri-file-chart-line',
  activites_reglementees: 'ri-briefcase-line',
  lcb_ft: 'ri-spy-line',
};

export default function KOSRegulatoryComplianceEnginePage() {
  const [activeTab, setActiveTab] = useState<TabId>('executive');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [domainFilter, setDomainFilter] = useState<DomainType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<TextStatus | 'all'>('all');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [remediationFilter, setRemediationFilter] = useState<RemediationAction['classification'] | 'all'>('all');

  // ─── LIVE DATA HOOKS ───
  const {
    data: liveRegister,
    loading: registerLoading,
    error: registerError,
  } = useRegulatoryRegister();

  const {
    data: intelligenceFeed,
    loading: intelligenceLoading,
    error: intelligenceError,
    refetch: refetchIntelligence,
    markAsProcessed,
    stats: intelligenceStats,
  } = useRegulatoryIntelligence();

  // ─── FALLBACK TO MOCKS ───
  const REGULATORY_REGISTER = useMemo(() => {
    if (liveRegister && liveRegister.length > 0) return liveRegister;
    if (registerError) return MOCK_REGISTER;
    return registerLoading ? [] : MOCK_REGISTER;
  }, [liveRegister, registerLoading, registerError]);

  const kpis = EXECUTIVE_KPIS;

  const filteredRegister = useMemo(() => {
    let items = REGULATORY_REGISTER;
    if (domainFilter !== 'all') items = items.filter((t: RegulatoryRegisterEntry) => t.domaine === domainFilter);
    if (statusFilter !== 'all') items = items.filter((t: RegulatoryRegisterEntry) => t.statut_texte === statusFilter);
    if (riskFilter !== 'all') items = items.filter((t: RegulatoryRegisterEntry) => t.niveau_risque === riskFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((t: RegulatoryRegisterEntry) =>
        t.reference.toLowerCase().includes(q) ||
        t.titre.toLowerCase().includes(q) ||
        (t.exigence || '').toLowerCase().includes(q) ||
        t.autorite.toLowerCase().includes(q),
      );
    }
    return items;
  }, [domainFilter, statusFilter, riskFilter, searchQuery, REGULATORY_REGISTER]);

  const filteredRemediation = useMemo(() => {
    if (remediationFilter === 'all') return REMEDIATION_PLAN;
    return REMEDIATION_PLAN.filter(a => a.classification === remediationFilter);
  }, [remediationFilter]);

  const textsByStatus = useMemo(() => ({
    en_vigueur: REGULATORY_REGISTER.filter((t: RegulatoryRegisterEntry) => t.statut_texte === 'en_vigueur').length,
    modifie: REGULATORY_REGISTER.filter((t: RegulatoryRegisterEntry) => t.statut_texte === 'modifie').length,
    remplace: REGULATORY_REGISTER.filter((t: RegulatoryRegisterEntry) => t.statut_texte === 'remplace').length,
    abroge: REGULATORY_REGISTER.filter((t: RegulatoryRegisterEntry) => t.statut_texte === 'abroge').length,
  }), [REGULATORY_REGISTER]);

  const avgScore = useMemo(() => {
    const scores = DOMAIN_GAP_ANALYSIS.map(d => d.score_actuel);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, []);

  const critRemediations = REMEDIATION_PLAN.filter(a => a.statut !== 'termine' && a.classification === 'critique').length;
  const totalOpenActions = REMEDIATION_PLAN.filter(a => a.statut !== 'termine').length;

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'executive', label: 'Dashboard Exécutif', icon: 'ri-dashboard-line', count: `${avgScore}/100` },
    { id: 'register', label: 'Registre Réglementaire', icon: 'ri-book-2-line', count: `${REGULATORY_REGISTER.length} textes` },
    { id: 'gaps', label: 'Gap Analysis', icon: 'ri-contrast-2-line', count: `${DOMAIN_GAP_ANALYSIS.length} domaines` },
    { id: 'remediation', label: 'Plan Remédiation', icon: 'ri-tools-line', count: `${totalOpenActions} actions` },
    { id: 'intelligence', label: 'Veille Intelligente', icon: 'ri-radar-line', count: `${intelligenceStats?.non_traitees || textsByStatus.en_vigueur} alertes` },
  ];

  return (
    <KOSHubLayout hubId={65}>
      <SeoHead
        title="KOS Regulatory Compliance Engine™ — Command Center | KHEPRA EXPERTS"
        description="Moteur d'audit réglementaire BCEAO-UEMOA niveau Big Four : registre 62 textes, gap analysis 8 domaines, plan de remédiation classifié. Score global 82/100. PwC/Deloitte/EY/KPMG Grade."
        keywords="KOS Regulatory Compliance Engine, audit réglementaire BCEAO, conformité UEMOA COBAC, registre réglementaire, gap analysis, plan remédiation, KHEPRA EXPERTS"
        canonicalPath="/kos-regulatory-compliance-engine"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20sophisticated%20regulatory%20compliance%20command%20center%20aesthetic%20with%20rich%20deep%20emerald%20and%20warm%20bronze%20tones%2C%20elegant%20geometric%20patterns%20suggesting%20governance%20frameworks%20and%20interconnected%20compliance%20nodes%2C%20premium%20institutional%20atmosphere%20with%20shield%20motifs%20and%20scale-of-justice%20inspired%20abstract%20forms%2C%20dark%20luxurious%20background%20with%20subtle%20grid%20and%20constellation%20patterns%2C%20no%20text%20no%20human%20figures%2C%20Big%20Four%20consulting%20firm%20grade%20visual%20identity&width=1920&height=520&seq=kos-regcomp-engine-hero&orientation=landscape"
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
                <i className="ri-shield-check-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                  KOS Regulatory Compliance Engine™
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  Big Four Grade — PwC/Deloitte/EY/KPMG
                </span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Command Center Conformité.
              <span className="block text-emerald-400 mt-2">Toute la réglementation. Un seul moteur.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              <strong className="text-white">{REGULATORY_REGISTER.length} textes</strong> dans le registre réglementaire centralisé.{' '}
              <strong className="text-white">{DOMAIN_GAP_ANALYSIS.length} domaines</strong> audités.{' '}
              Score global <strong className={avgScore >= 85 ? 'text-emerald-400' : avgScore >= 75 ? 'text-amber-400' : 'text-red-400'}>{avgScore}/100</strong>.{' '}
              <strong className="text-red-400">{critRemediations} actions critiques</strong> en cours.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-base`} />
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TAB: EXECUTIVE DASHBOARD ═══════════ */}
      {activeTab === 'executive' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
              {[
                { label: 'Conformité Globale', value: `${kpis.compliance_global}/100`, icon: 'ri-shield-check-line', color: '#86BC25' },
                { label: 'Niveau Risque', value: kpis.regulatory_risk_level === 'eleve' ? 'ÉLEVÉ' : kpis.regulatory_risk_level.toUpperCase(), icon: 'ri-alert-line', color: '#C2410C' },
                { label: 'Gaps Critiques', value: String(kpis.critical_findings), icon: 'ri-error-warning-line', color: '#DC2626' },
                { label: 'Gaps Ouverts', value: String(kpis.open_gaps), icon: 'ri-contrast-2-line', color: '#D97757' },
                { label: 'En Cours', value: String(kpis.actions_en_cours), icon: 'ri-tools-line', color: '#CA8A04' },
                { label: 'Clôturées', value: String(kpis.actions_cloturees), icon: 'ri-check-double-line', color: '#86BC25' },
                { label: 'En Retard', value: String(kpis.actions_en_retard), icon: 'ri-timer-line', color: '#DC2626' },
                { label: 'Prochain Audit', value: '15 Sept', icon: 'ri-calendar-line', color: '#4285F4' },
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

            {/* Domain Scores */}
            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-bar-chart-grouped-line text-emerald-600" />Scores par Domaine — Cible 95/100
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {DOMAIN_GAP_ANALYSIS.map(domain => (
                  <div key={domain.domaine} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${domain.color}15` }}>
                        <i className={`${domain.icon} text-lg`} style={{ color: domain.color }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950">{domain.label}</h3>
                        <span className="text-[10px] text-foreground-400">{domain.total_textes} textes</span>
                      </div>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-3xl font-bold font-heading" style={{ color: domain.color }}>{domain.score_actuel}</span>
                      <span className="text-sm text-foreground-400 mb-1">/ {domain.score_cible}</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-background-100 overflow-hidden mb-2">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(domain.score_actuel / domain.score_cible) * 100}%`, backgroundColor: domain.color }} />
                    </div>
                    <div className="flex gap-3 text-[10px]">
                      <span className="text-emerald-600 font-bold">{domain.textes_conformes} conformes</span>
                      {domain.textes_partiels > 0 && <span className="text-amber-600 font-bold">{domain.textes_partiels} partiels</span>}
                      {domain.gaps_critiques > 0 && <span className="text-red-600 font-bold">{domain.gaps_critiques} critiques</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Matrix + Coverage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Coverage Gauges */}
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Couverture par Juridiction</h3>
                <div className="space-y-4">
                  {[
                    { label: 'BCEAO/UEMOA', pct: kpis.couverture_bceao, color: '#CA8A04' },
                    { label: 'COBAC/CEMAC', pct: kpis.couverture_cobac, color: '#9B7B2C' },
                    { label: 'OHADA', pct: kpis.couverture_ohada, color: '#86BC25' },
                    { label: 'GAFI/GABAC', pct: kpis.couverture_gafi, color: '#4285F4' },
                  ].map(g => (
                    <div key={g.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-foreground-800">{g.label}</span>
                        <span className="font-bold" style={{ color: g.color }}>{g.pct}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${g.pct}%`, backgroundColor: g.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Texts by Status */}
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Statut des Textes — Veille 2026</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'En vigueur', value: textsByStatus.en_vigueur, color: '#86BC25', icon: 'ri-check-double-line' },
                    { label: 'Modifiés', value: textsByStatus.modifie, color: '#E8C547', icon: 'ri-edit-line' },
                    { label: 'Remplacés', value: textsByStatus.remplace, color: '#D97757', icon: 'ri-arrow-go-back-line' },
                    { label: 'Abrogés', value: textsByStatus.abroge, color: '#DC2626', icon: 'ri-close-circle-line' },
                  ].map(s => (
                    <div key={s.label} className="p-4 rounded-xl text-center border border-background-200/70">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                        <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
                      </div>
                      <span className="block text-2xl font-bold text-foreground-950">{s.value}</span>
                      <span className="text-xs text-foreground-400">{s.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-foreground-400 mt-4 text-center">
                  Dernière mise à jour : {new Date(kpis.derniere_maj).toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            {/* Critical Alerts */}
            <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <i className="ri-error-warning-line text-red-400 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Alertes Critiques — Actions Immédiates Requises</h3>
                  <p className="text-xs text-gray-400">4 gaps critiques identifiés dans le registre réglementaire</p>
                </div>
              </div>
              <div className="space-y-3">
                {REMEDIATION_PLAN.filter(a => a.classification === 'critique').map(a => (
                  <div key={a.id} className="p-4 rounded-xl bg-white/8 border border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-bold flex-shrink-0">
                      {a.id}
                    </span>
                    <div className="flex-1">
                      <span className="text-sm font-bold block">{a.action}</span>
                      <span className="text-xs text-gray-400">{a.texte_ref} · {a.statut === 'en_cours' ? 'En cours' : a.statut === 'a_faire' ? 'À faire' : 'Terminé'} · {a.progression}%</span>
                    </div>
                    <span className="text-xs text-gray-400">{a.delai_max}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ TAB: REGULATORY REGISTER ═══════════ */}
      {activeTab === 'register' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Registre Réglementaire — {REGULATORY_REGISTER.length} Textes</h2>
                <p className="text-foreground-600 text-sm">Recueil centralisé BCEAO/CB-UMOA · COBAC/BEAC · OHADA · GAFI/GABAC · CEMAC</p>
              </div>
              <div className="flex items-center gap-2">
                {registerLoading && <span className="text-xs text-foreground-400"><i className="ri-loader-4-line animate-spin mr-1" />Chargement Supabase...</span>}
                {registerError && <span className="text-xs text-amber-600"><i className="ri-error-warning-line mr-1" />Fallback mocks activé</span>}
              </div>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
                <input
                  type="text"
                  placeholder="Rechercher par référence, titre, exigence, autorité..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full bg-background-50 border border-background-200 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-300"
                />
              </div>
              <select
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value as DomainType | 'all')}
                className="px-4 py-2.5 rounded-full bg-background-50 border border-background-200 text-sm text-foreground-700 cursor-pointer"
              >
                <option value="all">Tous domaines</option>
                {Object.entries(DOMAIN_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as TextStatus | 'all')}
                className="px-4 py-2.5 rounded-full bg-background-50 border border-background-200 text-sm text-foreground-700 cursor-pointer"
              >
                <option value="all">Tous statuts</option>
                <option value="en_vigueur">En vigueur</option>
                <option value="modifie">Modifié</option>
                <option value="remplace">Remplacé</option>
                <option value="abroge">Abrogé</option>
              </select>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value as RiskLevel | 'all')}
                className="px-4 py-2.5 rounded-full bg-background-50 border border-background-200 text-sm text-foreground-700 cursor-pointer"
              >
                <option value="all">Tous risques</option>
                <option value="critique">Critique</option>
                <option value="eleve">Élevé</option>
                <option value="moyen">Moyen</option>
                <option value="faible">Faible</option>
              </select>
            </div>

            <p className="text-xs text-foreground-400 mb-4">{filteredRegister.length} texte(s) trouvé(s) {registerLoading ? '· Chargement...' : registerError ? '· Données locales' : liveRegister && liveRegister.length > 0 ? '· Live Supabase' : ''}</p>

            <div className="space-y-3">
              {filteredRegister.map((text: RegulatoryRegisterEntry) => {
                const isExpanded = expandedId === text.id;
                const riskB = riskLevelBadge(text.niveau_risque as RiskLevel);
                const statusB = textStatusBadge(text.statut_texte as TextStatus);
                const confB = conformiteBadge(text.statut_conformite as RegulatoryRegisterEntry['statut_conformite']);
                return (
                  <div key={text.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-background-50 shadow-lg' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedId(isExpanded ? null : text.id)} className="w-full p-4 sm:p-5 text-left flex items-start gap-4 cursor-pointer">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold font-heading text-lg" style={{ backgroundColor: text.score_conformite >= 85 ? '#ECFDF5' : text.score_conformite >= 70 ? '#FEF3C7' : '#FEE2E2' }}>
                        <span style={{ color: text.score_conformite >= 85 ? '#059669' : text.score_conformite >= 70 ? '#CA8A04' : '#DC2626' }}>{text.score_conformite}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${statusB.bg} ${statusB.border} ${statusB.text}`}>{statusB.label}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${riskB.bg} ${riskB.border} ${riskB.text}`}>{riskB.label}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${confB.bg} ${confB.border} ${confB.text}`}>{confB.label}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{text.autorite}</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950">{text.reference}</h3>
                        <p className="text-xs text-foreground-500 line-clamp-1">{text.titre}</p>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Exigence</span>
                              <p className="text-sm text-foreground-800 mt-1">{text.exigence || '—'}</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Obligations ({(text.obligations || []).length})</span>
                              <ul className="mt-1 space-y-1">
                                {(text.obligations || []).map((o, j) => (
                                  <li key={j} className="text-xs text-foreground-700 flex items-start gap-1.5">
                                    <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5 flex-shrink-0" />{o}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Preuves requises ({(text.preuves_requises || []).length})</span>
                              <ul className="mt-1 space-y-1">
                                {(text.preuves_requises || []).map((p, j) => (
                                  <li key={j} className="text-xs text-foreground-700 flex items-start gap-1.5">
                                    <i className="ri-file-text-line text-amber-500 mt-0.5 flex-shrink-0" />{p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Composants KOS</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {(text.composants_kos || []).map((c, j) => (
                                  <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 border border-background-200 text-foreground-500 font-mono">{c}</span>
                                ))}
                              </div>
                            </div>
                            {text.texte_remplace_par && (
                              <div>
                                <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Remplacé par / Remplace</span>
                                <p className="text-xs text-amber-700 mt-1">{text.texte_remplace_par}</p>
                              </div>
                            )}
                            <div className="text-[10px] text-foreground-400">
                              <span>Publié : {new Date(text.date_publication).toLocaleDateString('fr-FR')}</span>
                              {text.date_modification && <span> · Modifié : {new Date(text.date_modification).toLocaleDateString('fr-FR')}</span>}
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

      {/* ═══════════ TAB: GAP ANALYSIS ═══════════ */}
      {activeTab === 'gaps' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Gap Analysis Matricielle — {DOMAIN_GAP_ANALYSIS.length} Domaines
              </h2>
              <p className="text-foreground-600">Analyse d'écart par domaine réglementaire — cible 95/100 (Grade Big Four)</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Score Moyen', value: `${avgScore}/100`, icon: 'ri-bar-chart-line', color: '#D97757' },
                { label: 'Conformes', value: String(DOMAIN_GAP_ANALYSIS.reduce((s, d) => s + d.textes_conformes, 0)), icon: 'ri-check-double-line', color: '#86BC25' },
                { label: 'Partiels', value: String(DOMAIN_GAP_ANALYSIS.reduce((s, d) => s + d.textes_partiels, 0)), icon: 'ri-time-line', color: '#E8C547' },
                { label: 'Gaps Critiques', value: String(DOMAIN_GAP_ANALYSIS.reduce((s, d) => s + d.gaps_critiques, 0)), icon: 'ri-error-warning-line', color: '#DC2626' },
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

            {/* Domain cards with full detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {DOMAIN_GAP_ANALYSIS.map(domain => {
                const gapPct = domain.score_cible - domain.score_actuel;
                return (
                  <div key={domain.domaine} className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${domain.color}15` }}>
                        <i className={`${domain.icon} text-xl`} style={{ color: domain.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-base font-bold text-foreground-950">{domain.label}</h3>
                        <p className="text-xs text-foreground-500 mt-1">{domain.description}</p>
                      </div>
                    </div>

                    <div className="flex items-end gap-3 mb-3">
                      <span className="text-4xl font-bold font-heading" style={{ color: domain.color }}>{domain.score_actuel}</span>
                      <div className="mb-1">
                        <span className="text-sm text-foreground-400">/ {domain.score_cible}</span>
                        <span className="block text-xs text-foreground-400">Gap : {gapPct} pts</span>
                      </div>
                    </div>

                    <div className="w-full h-4 rounded-full bg-background-100 overflow-hidden mb-4">
                      <div className="h-full rounded-full flex" style={{ width: `${(domain.score_actuel / domain.score_cible) * 100}%` }}>
                        <div className="h-full rounded-full" style={{ width: `${(domain.textes_conformes / domain.total_textes) * 100}%`, backgroundColor: '#86BC25' }} />
                        <div className="h-full" style={{ width: `${(domain.textes_partiels / domain.total_textes) * 100}%`, backgroundColor: '#E8C547' }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                        <span className="block text-lg font-bold text-emerald-700">{domain.textes_conformes}</span>
                        <span className="text-[10px] text-emerald-600">Conformes</span>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">
                        <span className="block text-lg font-bold text-amber-700">{domain.textes_partiels}</span>
                        <span className="text-[10px] text-amber-600">Partiels</span>
                      </div>
                      <div className="p-2 rounded-lg bg-red-50 border border-red-100">
                        <span className="block text-lg font-bold text-red-700">{domain.gaps_critiques}</span>
                        <span className="text-[10px] text-red-600">Critiques</span>
                      </div>
                      <div className="p-2 rounded-lg bg-orange-50 border border-orange-100">
                        <span className="block text-lg font-bold text-orange-700">{domain.gaps_majeurs}</span>
                        <span className="text-[10px] text-orange-600">Majeurs</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ TAB: REMEDIATION PLAN ═══════════ */}
      {activeTab === 'remediation' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Plan de Remédiation — {REMEDIATION_PLAN.length} Actions</h2>
                <p className="text-foreground-600 text-sm">Classification : Critique (&lt;7j) · Majeur (&lt;30j) · Modéré (&lt;90j) · Mineur (&lt;180j)</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Filtrer :</span>
                {['all', 'critique', 'majeur', 'modere', 'mineur'].map(f => {
                  const b = f === 'all' ? null : classificationBadge(f as RemediationAction['classification']);
                  return (
                    <button key={f} onClick={() => setRemediationFilter(f as typeof remediationFilter)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${remediationFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                      {f === 'all' ? 'Toutes' : b?.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Critiques', value: String(REMEDIATION_PLAN.filter(a => a.classification === 'critique').length), color: '#DC2626' },
                { label: 'Majeures', value: String(REMEDIATION_PLAN.filter(a => a.classification === 'majeur').length), color: '#EA580C' },
                { label: 'Modérées', value: String(REMEDIATION_PLAN.filter(a => a.classification === 'modere').length), color: '#CA8A04' },
                { label: 'Mineures', value: String(REMEDIATION_PLAN.filter(a => a.classification === 'mineur').length), color: '#64748B' },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <span className="block text-2xl font-bold" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-xs text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {filteredRemediation.map(action => {
                const clB = classificationBadge(action.classification);
                return (
                  <div key={action.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-center gap-3 lg:w-52 flex-shrink-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${clB.bg} ${clB.border}`}>
                          <i className={`${action.classification === 'critique' ? 'ri-error-warning-line' : action.classification === 'majeur' ? 'ri-alert-line' : action.classification === 'modere' ? 'ri-time-line' : 'ri-information-line'} text-lg ${clB.text}`} />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold block" style={{ color: action.classification === 'critique' ? '#DC2626' : action.classification === 'majeur' ? '#EA580C' : action.classification === 'modere' ? '#CA8A04' : '#64748B' }}>
                            {clB.label}
                          </span>
                          <span className="text-[10px] text-foreground-400">{action.delai_max}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground-800 mb-1.5">{action.action}</p>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-foreground-400">
                          <span><i className="ri-folder-line mr-1" />{DOMAIN_LABELS[action.domaine]}</span>
                          <span className="font-mono">{action.texte_ref}</span>
                          <span><i className="ri-user-line mr-1" />{action.responsable}</span>
                          <span className="font-bold">Échéance : {new Date(action.date_fin_prevue).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16">
                          <div className="w-full h-2 rounded-full bg-background-200 overflow-hidden">
                            <div className={`h-full rounded-full ${action.progression >= 80 ? 'bg-emerald-500' : action.progression >= 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${action.progression}%` }} />
                          </div>
                          <span className="text-[10px] text-foreground-400 text-center block mt-0.5">{action.progression}%</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                          action.statut === 'termine' ? 'bg-emerald-50 text-emerald-700' : action.statut === 'en_cours' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {action.statut === 'termine' ? 'Terminé' : action.statut === 'en_cours' ? 'En cours' : 'À faire'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ TAB: REGULATORY INTELLIGENCE ═══════════ */}
      {activeTab === 'intelligence' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Veille Réglementaire Intelligente — Live</h2>
                <p className="text-foreground-600">BCEAO · CB-UMOA · UEMOA · OHADA · GAFI · CEMAC — Cron automatique 6h00 quotidien</p>
              </div>
              <div className="flex items-center gap-2">
                {intelligenceLoading && <span className="text-xs text-foreground-400"><i className="ri-loader-4-line animate-spin mr-1" />Chargement...</span>}
                {intelligenceError && <span className="text-xs text-amber-600"><i className="ri-error-warning-line mr-1" />Erreur de connexion</span>}
                <button
                  onClick={refetchIntelligence}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background-100 text-foreground-600 text-xs font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-refresh-line" />Refresh
                </button>
              </div>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Total alertes', value: String(intelligenceStats?.total || 0), color: '#D97757', icon: 'ri-radar-line' },
                { label: 'Non traitées', value: String(intelligenceStats?.non_traitees || 0), color: '#CA8A04', icon: 'ri-time-line' },
                { label: 'Warnings', value: String(intelligenceStats?.warnings || 0), color: '#DC2626', icon: 'ri-error-warning-line' },
                { label: 'Traitées', value: String(intelligenceStats?.traitees || 0), color: '#86BC25', icon: 'ri-check-double-line' },
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

            {/* Status Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {[
                { label: 'En vigueur', value: textsByStatus.en_vigueur, color: '#86BC25', icon: 'ri-check-double-line', desc: 'Aucune modification détectée' },
                { label: 'Modifiés', value: textsByStatus.modifie, color: '#E8C547', icon: 'ri-edit-line', desc: 'Modifications post-2018 intégrées' },
                { label: 'Remplacés', value: textsByStatus.remplace, color: '#D97757', icon: 'ri-arrow-go-back-line', desc: 'Texte remplacé — référence mise à jour' },
                { label: 'Abrogés', value: textsByStatus.abroge, color: '#DC2626', icon: 'ri-close-circle-line', desc: 'Texte abrogé — à archiver' },
                { label: 'En révision', value: 0, color: '#4285F4', icon: 'ri-refresh-line', desc: 'Révision en cours — veille active' },
              ].map(s => (
                <div key={s.label} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <i className={`${s.icon} text-xl`} style={{ color: s.color }} />
                  </div>
                  <span className="block text-3xl font-bold text-foreground-950">{s.value}</span>
                  <span className="block text-sm font-bold text-foreground-800">{s.label}</span>
                  <span className="text-[10px] text-foreground-400">{s.desc}</span>
                </div>
              ))}
            </div>

            {/* Live Intelligence Feed */}
            <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-8">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <i className="ri-radar-line text-emerald-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold">Agent Regulatory Watch™ — Veille Active</h3>
                    <p className="text-xs text-gray-400">Surveillance BCEAO · CB-UMOA · UEMOA · OHADA · États membres — Cron quotidien 6h00</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />Live
                </span>
              </div>

              {intelligenceFeed.length === 0 && !intelligenceLoading && (
                <div className="p-4 rounded-xl bg-white/8 border border-white/10 text-center">
                  <p className="text-sm text-gray-400">Aucune alerte détectée dans le feed. Le cron est actif — prochain scan : 6h00.</p>
                </div>
              )}

              <div className="space-y-3">
                {intelligenceFeed.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-xl bg-white/8 border flex flex-col sm:flex-row sm:items-center gap-3 ${alert.traite ? 'border-white/5 opacity-60' : 'border-white/10'}`}>
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 sm:mt-0 ${alert.severite === 'warning' ? 'bg-amber-400' : alert.severite === 'critique' ? 'bg-red-400' : 'bg-emerald-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-white">{alert.titre}</span>
                        {alert.reference && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-mono">{alert.reference}</span>
                        )}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          alert.type_evenement === 'modification_detectee' ? 'bg-amber-500/20 text-amber-300' : 
                          alert.type_evenement === 'texte_abroge' ? 'bg-red-500/20 text-red-300' :
                          alert.type_evenement === 'texte_remplace' ? 'bg-orange-500/20 text-orange-300' :
                          'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {alert.type_evenement === 'modification_detectee' ? 'Modification' : 
                           alert.type_evenement === 'texte_abroge' ? 'Abrogé' :
                           alert.type_evenement === 'texte_remplace' ? 'Remplacé' :
                           alert.type_evenement === 'evaluation' ? 'Évaluation' : 'Nouveau'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{alert.resume || '—'}</p>
                      <div className="flex gap-3 mt-1 text-[10px] text-gray-500">
                        <span>{alert.autorite}</span>
                        <span>{alert.date_publication ? new Date(alert.date_publication).toLocaleDateString('fr-FR') : '—'}</span>
                        <span>{alert.source}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!alert.traite && (
                        <button
                          onClick={() => markAsProcessed(alert.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold hover:bg-emerald-500/30 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-check-line mr-1" />Marquer traité
                        </button>
                      )}
                      {alert.url_source && (
                        <a href={alert.url_source} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-[10px] font-bold hover:bg-white/20 transition-colors whitespace-nowrap">
                          <i className="ri-external-link-line mr-1" />Source
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Dernière synchronisation : {new Date().toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} · Prochaine : 6h00 · Fréquence : Quotidienne · Cron : <span className="font-mono">regulatory-intelligence-scan</span>
              </p>
            </div>

            {/* Modified texts detail */}
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Textes Modifiés Post-2018 — Revue Détaillée</h3>
              <div className="space-y-3">
                {REGULATORY_REGISTER.filter(t => t.statut_texte === 'modifie' || t.statut_texte === 'remplace').map(text => (
                  <div key={text.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-50 border border-amber-200">
                        <i className="ri-edit-line text-amber-600 text-lg" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-foreground-950">{text.reference}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${textStatusBadge(text.statut_texte).bg} ${textStatusBadge(text.statut_texte).text}`}>
                            {textStatusBadge(text.statut_texte).label}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-500">{text.titre}</p>
                        <div className="flex gap-4 mt-2 text-[10px] text-foreground-400">
                          <span>Publié : {new Date(text.date_publication).toLocaleDateString('fr-FR')}</span>
                          {text.date_modification && <span className="text-amber-600 font-bold">Modifié : {new Date(text.date_modification).toLocaleDateString('fr-FR')}</span>}
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${text.statut_texte === 'remplace' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                        {text.statut_texte === 'remplace' ? 'À archiver' : 'Revue OK'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-12 sm:py-16 bg-background-100/70 border-t border-background-200/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-50 flex items-center justify-center">
            <i className="ri-mail-send-line text-emerald-600 text-2xl" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-3">
            Veille Réglementaire — Restez informé
          </h2>
          <p className="text-foreground-600 mb-6 max-w-xl mx-auto">
            Recevez les mises à jour du registre réglementaire et les alertes de conformité directement dans votre boîte mail. Une synthèse mensuelle, zéro spam.
          </p>
          <form
            data-readdy-form
            id="compliance-newsletter-form"
            action="https://readdy.ai/api/form/d8onscbf86hv9evgtrig"
            method="POST"
            encType="application/x-www-form-urlencoded"
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="votre@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-background-50 border border-background-200 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-mail-line mr-2" />S'abonner
            </button>
          </form>
          <p className="text-[10px] text-foreground-400 mt-3">
            <i className="ri-lock-line mr-1" />Vos données sont confidentielles. Conformité RGPD.
          </p>
        </div>
      </section>

      {/* Cross-link Ecosystem */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Conformité — Accès Rapide</h2>
            <p className="text-foreground-600">Navigation vers les modules connectés du KOS Regulatory Compliance Engine™.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Compliance Engine', path: '/kos-regulatory-compliance-engine', icon: 'ri-shield-check-line', color: '#86BC25', current: true },
              { label: 'Audit Conformité', path: '/kos-regulatory-compliance-audit', icon: 'ri-file-search-line', color: '#C2410C' },
              { label: 'Automates Conformité', path: '/kos-regulatory-compliance-automates', icon: 'ri-robot-line', color: '#059669' },
              { label: 'Veille Réglementaire', path: '/regulatory-intelligence', icon: 'ri-radar-line', color: '#EA580C' },
              { label: 'BCEAO Dashboard', path: '/bceao', icon: 'ri-bank-line', color: '#CA8A04' },
              { label: 'COBAC Dashboard', path: '/cobac', icon: 'ri-building-line', color: '#9B7B2C' },
              { label: 'GAFI Dashboard', path: '/gafi', icon: 'ri-global-line', color: '#4285F4' },
              { label: 'Gouvernance & Risques', path: '/gouvernance-risques', icon: 'ri-government-line', color: '#D97757' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${
                link.current ? 'border-emerald-300 bg-emerald-50/40 ring-2 ring-emerald-400' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'
              }`}>
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
    </KOSHubLayout>
  );
}