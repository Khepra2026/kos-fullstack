import { useState, useMemo, useCallback } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useEvidenceLibrary } from '@/hooks/useEvidenceLibrary';
import { useRemediationLogs } from '@/hooks/useRemediationLogs';
import { useRegulatoryAutoScanner } from '@/hooks/useRegulatoryAutoScanner';
import { useRegulatoryReportCA } from '@/hooks/useRegulatoryReportCA';
import {
  WAR_ROOM,
  SCANNED_REFERENCES,
  AUTO_CORRECTION_LOG,
  COMPLIANCE_ENGINES,
  EVIDENCE_LIBRARY,
  AUTONOMOUS_AGENTS,
  REMEDIATION_EXECUTIVE_KPIS,
  KNOWLEDGE_GRAPH_NODES,
  TARGET_METRICS,
} from '@/mocks/regulatoryRemediationEngine';
import type {
  RemediationStatus,
  ReferenceGapType,
  ComplianceEngineType,
  AgentType,
} from '@/mocks/regulatoryRemediationEngine';

// ─── TYPES ───
type TabId = 'executive' | 'warroom' | 'scanner' | 'correction' | 'graph' | 'engines' | 'evidence' | 'agents';

// ─── STATUS BADGES ───
function statusBadge(status: RemediationStatus) {
  const map = {
    non_demarre: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'Non démarré' },
    en_cours: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'En cours' },
    termine: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Terminé' },
    bloque: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Bloqué' },
    en_retard: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: 'En retard' },
  };
  return map[status];
}

function ecartBadge(type: ReferenceGapType) {
  const map = {
    obsolete: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Obsolète' },
    incomplete: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Incomplet' },
    non_verifiable: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: 'Non vérifiable' },
    doublon: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', label: 'Doublon' },
    format_non_standard: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'Format' },
  };
  return map[type];
}

function agentStatusBadge(status: AgentType extends string ? string : string) {
  const m: Record<string, { bg: string; text: string; label: string }> = {
    actif: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Actif' },
    inactif: { bg: 'bg-slate-50', text: 'text-slate-500', label: 'Inactif' },
    en_deploiement: { bg: 'bg-sky-50', text: 'text-sky-700', label: 'En déploiement' },
    erreur: { bg: 'bg-red-50', text: 'text-red-700', label: 'Erreur' },
  };
  return m[status] || m.inactif;
}

function correctionBadge(statut: string) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    appliquee: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Appliquée' },
    en_attente: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'En attente' },
    a_reviser: { bg: 'bg-red-50', text: 'text-red-700', label: 'À réviser' },
    rejetee: { bg: 'bg-slate-50', text: 'text-slate-600', label: 'Rejetée' },
  };
  return map[statut] || { bg: 'bg-slate-50', text: 'text-slate-600', label: statut };
}

function evidenceStatusBadge(statut: string) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    valide: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Validé' },
    en_attente: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'En attente' },
    rejete: { bg: 'bg-red-50', text: 'text-red-700', label: 'Rejeté' },
  };
  return map[statut] || { bg: 'bg-slate-50', text: 'text-slate-600', label: statut };
}

export default function regulatoryRemediationEnginePage() {
  const [activeTab, setActiveTab] = useState<TabId>('executive');
  const [expandedWR, setExpandedWR] = useState<string | null>(null);
  const [gapFilter, setGapFilter] = useState<ReferenceGapType | 'all'>('all');
  const [correctionFilter, setCorrectionFilter] = useState<'all' | 'appliquee' | 'en_attente' | 'a_reviser' | 'rejetee'>('all');
  const [engineFilter, setEngineFilter] = useState<ComplianceEngineType | 'all'>('all');
  const [autoScanMessage, setAutoScanMessage] = useState<string | null>(null);
  const [validationForm, setValidationForm] = useState<{ id: string | null; validateur: string }>({ id: null, validateur: '' });
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  // ─── AUTO SCANNER HOOK ───
  const {
    loading: autoScanLoading,
    lastResult: scanResult,
    lastRunAt: scanLastRun,
    error: scanError,
    runScan,
  } = useRegulatoryAutoScanner({ notify_email: 'contact@khepraexperts.com' });

  // ─── CA REPORT HOOK ───
  const {
    data: caReport,
    loading: caReportLoading,
    generateReport,
  } = useRegulatoryReportCA();

  const kpis = REMEDIATION_EXECUTIVE_KPIS;

  // ─── LIVE DATA HOOKS ───
  const {
    data: liveEvidence,
    loading: evidenceLoading,
    error: evidenceError,
    validateEvidence,
    stats: evidenceStats,
  } = useEvidenceLibrary();

  const {
    data: liveLogs,
    loading: logsLoading,
    error: logsError,
  } = useRemediationLogs();

  // ─── FALLBACK TO MOCKS ───
  const evidenceData = useMemo(() => {
    if (liveEvidence && liveEvidence.length > 0) return liveEvidence;
    if (evidenceError) return EVIDENCE_LIBRARY;
    return evidenceLoading ? [] : EVIDENCE_LIBRARY;
  }, [liveEvidence, evidenceLoading, evidenceError]);

  const logsData = useMemo(() => {
    if (liveLogs && liveLogs.length > 0) return liveLogs;
    if (logsError) return AUTO_CORRECTION_LOG;
    return logsLoading ? [] : AUTO_CORRECTION_LOG;
  }, [liveLogs, logsLoading, logsError]);

  // ─── AUTO-CORRECTION ENGINE (connected to Supabase) ───
  const autoCorrectObsolete = useCallback(async () => {
    setAutoScanMessage(null);
    const results = await runScan();
    if (results.new_logs > 0) {
      setAutoScanMessage(`${results.new_logs} référence(s) obsolète(s) détectée(s) et tracée(s). ${results.emails_sent > 0 ? 'Notification email envoyée.' : ''}`);
    } else if (results.skipped > 0) {
      setAutoScanMessage(`Aucune nouvelle référence obsolète. ${results.skipped} déjà tracées.`);
    } else {
      setAutoScanMessage(scanError || 'Aucune référence obsolète détectée dans Supabase.');
    }
  }, [runScan, scanError]);

  // ─── VALIDATION WORKFLOW ───
  const handleValidate = async (id: string) => {
    setValidationMessage(null);
    if (!validationForm.validateur.trim()) {
      setValidationMessage('Veuillez saisir le nom du validateur.');
      return;
    }
    try {
      await validateEvidence(id, validationForm.validateur.trim());
      setValidationMessage('Preuve validée avec succès.');
      setValidationForm({ id: null, validateur: '' });
      setTimeout(() => setValidationMessage(null), 3000);
    } catch {
      setValidationMessage('Erreur lors de la validation.');
    }
  };

  // ─── FILTERS ───
  const filteredReferences = useMemo(() => {
    if (gapFilter === 'all') return SCANNED_REFERENCES;
    return SCANNED_REFERENCES.filter(r => r.ecart_type === gapFilter);
  }, [gapFilter]);

  const filteredCorrections = useMemo(() => {
    if (correctionFilter === 'all') return logsData;
    return logsData.filter((c: { statut: string }) => c.statut === correctionFilter);
  }, [correctionFilter, logsData]);

  const filteredEngines = useMemo(() => {
    if (engineFilter === 'all') return COMPLIANCE_ENGINES;
    return COMPLIANCE_ENGINES.filter(e => e.engine === engineFilter);
  }, [engineFilter]);

  const gapStats = useMemo(() => ({
    obsolete: SCANNED_REFERENCES.filter(r => r.ecart_type === 'obsolete').length,
    incomplete: SCANNED_REFERENCES.filter(r => r.ecart_type === 'incomplete').length,
    non_verifiable: SCANNED_REFERENCES.filter(r => r.ecart_type === 'non_verifiable').length,
  }), []);

  const correctionStats = useMemo(() => {
    const stats = { appliquee: 0, en_attente: 0, a_reviser: 0, rejetee: 0 };
    logsData.forEach((c: { statut: string }) => {
      if (c.statut in stats) stats[c.statut as keyof typeof stats]++;
    });
    return stats;
  }, [logsData]);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'executive', label: 'Dashboard', icon: 'ri-dashboard-line', count: `${kpis.score_global_conformite}/100` },
    { id: 'warroom', label: 'War Room', icon: 'ri-sword-line', count: `${WAR_ROOM.length} rôles` },
    { id: 'scanner', label: 'Scanner', icon: 'ri-scan-line', count: `${SCANNED_REFERENCES.length} refs` },
    { id: 'correction', label: 'Correction', icon: 'ri-tools-line', count: `${kpis.total_corrections_appliquees}` },
    { id: 'graph', label: 'Knowledge Graph', icon: 'ri-git-branch-line', count: `${KNOWLEDGE_GRAPH_NODES.length} nœuds` },
    { id: 'engines', label: 'Engines', icon: 'ri-shield-check-line', count: `${COMPLIANCE_ENGINES.length}` },
    { id: 'evidence', label: 'Preuves', icon: 'ri-file-lock-line', count: `${evidenceData.length}` },
    { id: 'agents', label: 'Agents', icon: 'ri-robot-line', count: `${kpis.agents_actifs}/${kpis.agents_total}` },
  ];

  return (
    <hubLayout hubId={91}>
      <SeoHead
        title="KOS Regulatory Remediation Engine™ — Exécution Conformité | KHEPRA EXPERTS"
        description="Moteur d'exécution et de correction réglementaire BCEAO-UEMOA niveau Big Four : War Room 10 rôles, Scanner 312 références, 214 corrections auto, 5 agents autonomes, 6 Compliance Engines. Score global 82/100."
        keywords="KOS Regulatory Remediation Engine, correction réglementaire BCEAO, War Room conformité, scan références juridiques, auto-correction, compliance engines, KHEPRA EXPERTS"
        canonicalPath="/kos-regulatory-remediation-engine"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20premium%20regulatory%20compliance%20remediation%20command%20center%20aesthetic%20with%20rich%20deep%20burnt%20orange%20and%20warm%20bronze%20tones%20against%20dark%20charcoal%20background%2C%20elegant%20geometric%20circuit%20patterns%20suggesting%20automated%20correction%20and%20remediation%20workflows%2C%20institutional%20shield%20motifs%20with%20interconnected%20nodes%20representing%20compliance%20engines%20and%20autonomous%20agents%2C%20sophisticated%20Big%20Four%20consulting%20firm%20grade%20visual%20identity%20with%20subtle%20grid%20and%20radar%20patterns%2C%20no%20text%20no%20human%20figures&width=1920&height=520&seq=kos-remediation-engine-hero&orientation=landscape"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/30 backdrop-blur-sm">
                <i className="ri-tools-line text-orange-400 text-sm" />
                <span className="text-sm font-semibold text-orange-300 uppercase tracking-wider">
                  KOS Regulatory Remediation Engine™
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                  Exécution & Correction — Big Four Grade
                </span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              On ne constate plus. On corrige.
              <span className="block text-orange-400 mt-2">Remediation Engine — Exécution Réglementaire Autonome.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              <strong className="text-white">{WAR_ROOM.length} rôles</strong> en War Room.{" "}
              <strong className="text-white">{kpis.total_references_scannees} références</strong> scannées.{" "}
              <strong className="text-orange-400">{kpis.total_corrections_appliquees} corrections</strong> appliquées.{" "}
              <strong className="text-emerald-400">{kpis.agents_actifs}/{kpis.agents_total} agents</strong> autonomes actifs.{" "}
              6 Compliance Engines en opération.
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
                { label: 'Score Global', value: `${kpis.score_global_conformite}/100`, icon: 'ri-shield-check-line', color: '#D97757' },
                { label: 'Réf. Vérifiables', value: `${kpis.references_verifiables_pct}%`, icon: 'ri-check-double-line', color: '#86BC25' },
                { label: 'Textes Traçables', value: `${kpis.textes_tracables_pct}%`, icon: 'ri-link', color: '#CA8A04' },
                { label: 'Sources Offic.', value: `${kpis.sources_officielles_pct}%`, icon: 'ri-file-text-line', color: '#4285F4' },
                { label: 'Historisation', value: `${kpis.historisation_pct}%`, icon: 'ri-history-line', color: '#059669' },
                { label: 'Auditabilité', value: `${kpis.auditabilite_pct}%`, icon: 'ri-file-search-line', color: '#C2410C' },
                { label: 'Veille Active', value: `${kpis.veille_reglementaire_pct}%`, icon: 'ri-radar-line', color: '#7C3AED' },
                { label: 'Corrections', value: String(kpis.total_corrections_appliquees), icon: 'ri-tools-line', color: '#EA580C' },
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

            {/* Rapport CA Generator */}
            <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-8">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <i className="ri-file-chart-line text-orange-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Rapport Mensuel Conseil d'Administration</h3>
                    <p className="text-[10px] text-gray-400">Génération automatique — scores, actions, preuves, alertes</p>
                  </div>
                </div>
                <button
                  onClick={() => generateReport()}
                  disabled={caReportLoading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  <i className={`${caReportLoading ? 'ri-loader-4-line animate-spin' : 'ri-file-chart-line'} text-base`} />
                  {caReportLoading ? 'Génération...' : 'Générer Rapport CA'}
                </button>
              </div>

              {caReport && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-orange-400">{caReport.executive_summary.score_global_conformite}/100</span>
                    <span className="text-xs text-gray-400">Score Global · Période {caReport.period}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Textes référencés', value: caReport.executive_summary.total_textes_references, color: '#D97757', icon: 'ri-book-2-line' },
                      { label: 'Actions ouvertes', value: caReport.executive_summary.actions_ouvertes, color: '#CA8A04', icon: 'ri-tools-line' },
                      { label: 'Actions critiques', value: caReport.executive_summary.actions_critiques, color: '#DC2626', icon: 'ri-error-warning-line' },
                      { label: 'Preuves validées', value: caReport.executive_summary.preuves_validees, color: '#86BC25', icon: 'ri-check-double-line' },
                    ].map(s => (
                      <div key={s.label} className="p-3 rounded-xl bg-white/8 border border-white/10 text-center">
                        <i className={`${s.icon} text-lg mb-1 block`} style={{ color: s.color }} />
                        <span className="block text-lg font-bold text-white">{s.value}</span>
                        <span className="text-[10px] text-gray-400">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-xl bg-white/8 border border-white/10">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Recommandation</span>
                    <p className="text-sm text-white mt-1">{caReport.executive_summary.recommandation}</p>
                  </div>
                  <div className="flex gap-3 text-[10px] text-gray-400">
                    <span><i className="ri-time-line mr-1" />Généré : {new Date(caReport.generated_at).toLocaleString('fr-FR')}</span>
                    <span><i className="ri-alert-line mr-1" />Alertes non traitées : {caReport.executive_summary.alertes_non_traitees}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Target Metrics */}
            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-focus-3-line text-orange-600" />Cibles — Objectif 100%
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TARGET_METRICS.map(t => (
                  <div key={t.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${t.color}15` }}>
                        <i className={`${t.icon} text-lg`} style={{ color: t.color }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950">{t.label}</h3>
                        <span className="text-[10px] text-foreground-400">{t.description}</span>
                      </div>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-3xl font-bold font-heading" style={{ color: t.color }}>{t.actuel}{t.unite}</span>
                      <span className="text-sm text-foreground-400 mb-1">/ {t.cible}{t.unite}</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-background-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${t.actuel}%`, backgroundColor: t.color }} />
                    </div>
                    <span className="text-[10px] text-foreground-400 mt-1 block">Gap : {t.cible - t.actuel} pts à combler</span>
                  </div>
                ))}
              </div>
            </div>

            {/* War Room Summary + Agent Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* War Room Quick View */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white">
                <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                  <i className="ri-sword-line text-orange-400" />War Room — Top Priorités
                </h3>
                <div className="space-y-3">
                  {WAR_ROOM.filter(w => w.priority === 'critique').slice(0, 4).map(w => (
                    <div key={w.id} className="p-3 rounded-xl bg-white/8 border border-white/10 flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-red-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-white block line-clamp-1">{w.role} — {w.owner}</span>
                        <span className="text-[10px] text-gray-400">{w.progress}% · Échéance {w.deadline}</span>
                      </div>
                      {w.blockers.length > 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 whitespace-nowrap">{w.blockers.length} bloq.</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Agents Quick View */}
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6 sm:p-8">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-robot-line text-emerald-600" />Agents Autonomes — Statut Live
                </h3>
                <div className="space-y-3">
                  {AUTONOMOUS_AGENTS.map(ag => {
                    const s = agentStatusBadge(ag.statut);
                    return (
                      <div key={ag.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-background-100 transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${ag.statut === 'actif' ? 'bg-emerald-50' : ag.statut === 'en_deploiement' ? 'bg-sky-50' : 'bg-slate-50'}`}>
                          <i className={`${
                            ag.type === 'regulatory_watch' ? 'ri-radar-line' : ag.type === 'regulatory_update' ? 'ri-refresh-line' : ag.type === 'regulatory_proof' ? 'ri-file-lock-line' : ag.type === 'content_scanner' ? 'ri-scan-line' : ag.type === 'auto_corrector' ? 'ri-tools-line' : 'ri-archive-line'
                          } text-lg ${ag.statut === 'actif' ? 'text-emerald-600' : 'text-foreground-400'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-bold text-foreground-800 block">{ag.nom}</span>
                          <span className="text-[10px] text-foreground-400">{ag.corrections_effectuees} corrections · {ag.preuves_produites} preuves · uptime {ag.uptime_pct}%</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${s.bg} ${s.text}`}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ TAB: WAR ROOM ═══════════ */}
      {activeTab === 'warroom' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Regulatory War Room — {WAR_ROOM.length} Rôles Actifs</h2>
              <p className="text-foreground-600">Chaque rôle a un Owner, un Budget, une Deadline, une Priorité et un Statut. Exécution tracée.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'En cours', value: String(WAR_ROOM.filter(w => w.status === 'en_cours').length), color: '#CA8A04' },
                { label: 'Bloqués', value: String(WAR_ROOM.filter(w => w.status === 'bloque').length), color: '#DC2626' },
                { label: 'Terminés', value: String(WAR_ROOM.filter(w => w.status === 'termine').length), color: '#86BC25' },
                { label: 'Critiques', value: String(WAR_ROOM.filter(w => w.priority === 'critique').length), color: '#DC2626' },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <span className="block text-2xl font-bold" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-xs text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {WAR_ROOM.map(w => {
                const isExpanded = expandedWR === w.id;
                const st = statusBadge(w.status);
                return (
                  <div key={w.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-background-50 shadow-lg' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedWR(isExpanded ? null : w.id)} className="w-full p-5 text-left flex items-center gap-4 cursor-pointer">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: w.priority === 'critique' ? '#FEE2E2' : w.priority === 'haute' ? '#FEF3C7' : '#F0FDF4' }}>
                        <i className={`${w.priority === 'critique' ? 'ri-error-warning-line text-red-600' : w.priority === 'haute' ? 'ri-alert-line text-amber-600' : 'ri-information-line text-emerald-600'} text-xl`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-bold text-foreground-950">{w.role}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${st.bg} ${st.border} ${st.text}`}>{st.label}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            w.priority === 'critique' ? 'bg-red-50 text-red-700' : w.priority === 'haute' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                          }`}>{w.priority.toUpperCase()}</span>
                        </div>
                        <p className="text-xs text-foreground-500 line-clamp-1">{w.description}</p>
                        <div className="flex gap-3 mt-1 text-[10px] text-foreground-400">
                          <span><i className="ri-user-line mr-1" />{w.owner}</span>
                          <span><i className="ri-calendar-line mr-1" />{w.deadline}</span>
                          <span><i className="ri-money-euro-circle-line mr-1" />{w.budget}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-lg font-bold" style={{ color: w.progress >= 80 ? '#059669' : w.progress >= 40 ? '#CA8A04' : '#DC2626' }}>{w.progress}%</span>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Livrables ({w.deliverables.length})</span>
                          <ul className="mt-2 space-y-1">
                            {w.deliverables.map((d, j) => (
                              <li key={j} className="text-xs text-foreground-700 flex items-start gap-1.5">
                                <i className="ri-file-text-line text-emerald-500 mt-0.5 flex-shrink-0" />{d}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          {w.blockers.length > 0 && (
                            <>
                              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Blocages ({w.blockers.length})</span>
                              <ul className="mt-2 space-y-1">
                                {w.blockers.map((b, j) => (
                                  <li key={j} className="text-xs text-red-700 flex items-start gap-1.5">
                                    <i className="ri-error-warning-line text-red-500 mt-0.5 flex-shrink-0" />{b}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                          <div className="mt-3">
                            <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Progression</span>
                            <div className="w-full h-3 rounded-full bg-background-100 overflow-hidden mt-1">
                              <div className="h-full rounded-full" style={{ width: `${w.progress}%`, backgroundColor: w.progress >= 80 ? '#059669' : w.progress >= 40 ? '#CA8A04' : '#DC2626' }} />
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

      {/* ═══════════ TAB: CONTENT SCANNER ═══════════ */}
      {activeTab === 'scanner' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Content Scanner — {SCANNED_REFERENCES.length} Références Scannées</h2>
                <p className="text-foreground-600 text-sm">Scan complet : site · blog · knowledge hub · offres · propositions · rapports · workflows IA</p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button
                  onClick={autoCorrectObsolete}
                  disabled={autoScanLoading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  <i className={`${autoScanLoading ? 'ri-loader-4-line animate-spin' : 'ri-magic-line'} text-base`} />
                  {autoScanLoading ? 'Scan Supabase en cours...' : 'Scanner & Corriger Auto'}
                </button>
                {autoScanMessage && (
                  <div className={`text-xs px-3 py-1.5 rounded-full ${autoScanMessage.toLowerCase().includes('aucune') ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                    <i className={`${autoScanMessage.toLowerCase().includes('aucune') ? 'ri-information-line' : 'ri-check-double-line'} mr-1`} />
                    {autoScanMessage}
                  </div>
                )}
                {scanLastRun && (
                  <span className="text-[10px] text-foreground-400">
                    Dernier scan: {scanLastRun.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
            </div>

            {/* Auto-Scanner 24h Status Panel */}
            <div className="rounded-2xl bg-foreground-950 p-5 text-white mb-6">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <i className="ri-timer-line text-emerald-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">KOS Regulatory Auto-Scanner™ — Cycle 24h</h3>
                    <p className="text-[10px] text-gray-400">Scan automatique toutes les 24h · Logs Supabase · Notification email · Zéro intervention manuelle</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />Actif
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Scannés', value: scanResult ? String(scanResult.scanned) : '—', color: '#D97757', icon: 'ri-scan-line' },
                  { label: 'Nouveaux logs', value: scanResult ? String(scanResult.new_logs) : '—', color: '#EA580C', icon: 'ri-file-add-line' },
                  { label: 'Déjà tracés', value: scanResult ? String(scanResult.skipped) : '—', color: '#86BC25', icon: 'ri-check-double-line' },
                  { label: 'Emails envoyés', value: scanResult ? String(scanResult.emails_sent) : '—', color: '#4285F4', icon: 'ri-mail-send-line' },
                ].map(s => (
                  <div key={s.label} className="p-3 rounded-xl bg-white/8 border border-white/10 text-center">
                    <i className={`${s.icon} text-lg mb-1 block`} style={{ color: s.color }} />
                    <span className="block text-lg font-bold text-white">{s.value}</span>
                    <span className="text-[10px] text-gray-400">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-[10px] text-gray-400">
                <span>
                  Pipeline : Scan regulatory_register → Détecter statut_texte IN (abroge, remplace) → Vérifier doublons dans remediation_logs → Créer log (statut: en_attente) → Notifier par email → Refresh dashboard
                </span>
              </div>
            </div>

            {/* Gap Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Obsolètes', value: String(gapStats.obsolete), color: '#DC2626', icon: 'ri-close-circle-line' },
                { label: 'Incomplets', value: String(gapStats.incomplete), color: '#CA8A04', icon: 'ri-edit-line' },
                { label: 'Non Vérifiables', value: String(gapStats.non_verifiable), color: '#EA580C', icon: 'ri-error-warning-line' },
                { label: 'Conformes', value: String(SCANNED_REFERENCES.filter(r => !r.ecart_type).length), color: '#86BC25', icon: 'ri-check-double-line' },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                  </div>
                  <span className="block text-lg font-bold" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="text-xs text-foreground-400 self-center">Filtrer :</span>
              {['all', 'obsolete', 'incomplete', 'non_verifiable', 'doublon', 'format_non_standard'].map(f => (
                <button key={f} onClick={() => setGapFilter(f as ReferenceGapType | 'all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${gapFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                  {f === 'all' ? 'Tous' : f === 'obsolete' ? 'Obsolètes' : f === 'incomplete' ? 'Incomplets' : f === 'non_verifiable' ? 'Non vérifiables' : f === 'doublon' ? 'Doublons' : 'Format'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredReferences.map(ref => {
                const clLabels = ['', 'Loi', 'Règlement', 'Directive', 'Décision', 'Instruction', 'Circulaire', 'Norme', 'Recommandation', 'Bonne Pratique'];
                const ecart = ref.ecart_type ? ecartBadge(ref.ecart_type) : null;
                return (
                  <div key={ref.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                      <div className="flex items-center gap-3 lg:w-48 flex-shrink-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          ref.status_juridique === 'abroge' ? 'bg-red-50' : ref.status_juridique === 'remplace' ? 'bg-orange-50' : ref.status_juridique === 'modifie' ? 'bg-amber-50' : 'bg-emerald-50'
                        }`}>
                          <i className={`${
                            ref.status_juridique === 'abroge' ? 'ri-close-circle-line text-red-600' : ref.status_juridique === 'remplace' ? 'ri-arrow-go-back-line text-orange-600' : ref.status_juridique === 'modifie' ? 'ri-edit-line text-amber-600' : 'ri-check-double-line text-emerald-600'
                          } text-lg`} />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold block text-foreground-400">{clLabels[ref.classification_level]}</span>
                          <span className="text-xs font-bold text-foreground-900">{ref.reference}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
                            ref.status_juridique === 'abroge' ? 'bg-red-50 text-red-700' : ref.status_juridique === 'remplace' ? 'bg-orange-50 text-orange-700' : ref.status_juridique === 'modifie' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                          }`}>{ref.status_juridique === 'en_vigueur' ? 'En vigueur' : ref.status_juridique === 'modifie' ? 'Modifié' : ref.status_juridique === 'remplace' ? 'Remplacé' : 'Abrogé'}</span>
                          {ecart && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${ecart.bg} ${ecart.border} ${ecart.text}`}>{ecart.label}</span>
                          )}
                          {ref.correction_appliquee && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">Corrigé</span>
                          )}
                        </div>
                        {ref.ecart_detail && <p className="text-xs text-foreground-500 mt-1">{ref.ecart_detail}</p>}
                        <div className="flex gap-3 mt-1 text-[10px] text-foreground-400">
                          <span>Source : {ref.source}</span>
                          <span>KOS : {ref.composant_kos}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ TAB: AUTO-CORRECTION ═══════════ */}
      {activeTab === 'correction' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Auto-Correction Engine — {logsData.length} Corrections</h2>
                <p className="text-foreground-600 text-sm">Remplacement automatique des références obsolètes, incomplètes ou non vérifiables</p>
              </div>
              <div className="flex items-center gap-2">
                {logsLoading && <span className="text-xs text-foreground-400"><i className="ri-loader-4-line animate-spin mr-1" />Chargement Supabase...</span>}
                {logsError && <span className="text-xs text-amber-600"><i className="ri-error-warning-line mr-1" />Fallback mocks activé</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Appliquées', value: String(correctionStats.appliquee), color: '#86BC25' },
                { label: 'En attente', value: String(correctionStats.en_attente), color: '#CA8A04' },
                { label: 'À réviser', value: String(correctionStats.a_reviser), color: '#DC2626' },
                { label: 'Total', value: String(logsData.length), color: '#D97757' },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <span className="block text-2xl font-bold" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-xs text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="text-xs text-foreground-400 self-center">Filtrer :</span>
              {['all', 'appliquee', 'en_attente', 'a_reviser'].map(f => (
                <button key={f} onClick={() => setCorrectionFilter(f as typeof correctionFilter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${correctionFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                  {f === 'all' ? 'Toutes' : f === 'appliquee' ? 'Appliquées' : f === 'en_attente' ? 'En attente' : 'À réviser'}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredCorrections.map(c => (
                <div key={c.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground-950 text-white font-mono font-bold">{c.id}</span>
                    <span className="text-xs font-bold text-foreground-800">
                      {c.type_correction === 'remplacement' ? 'Remplacement' : c.type_correction === 'ajout' ? 'Ajout' : c.type_correction === 'suppression' ? 'Suppression' : 'Normalisation'}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${correctionBadge(c.statut).bg} ${correctionBadge(c.statut).text}`}>
                      {correctionBadge(c.statut).label}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">AVANT</span>
                      <p className="text-xs text-red-800 mt-1">{c.ancien_texte}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">APRÈS</span>
                      <p className="text-xs text-emerald-800 mt-1">{c.nouveau_texte}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 text-[10px] text-foreground-400">
                    <span className="font-mono">{c.fichier_source}</span>
                    <span>{new Date(c.date_correction).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    {c.verifie_par && <span className="text-emerald-600 font-bold">Vérifié : {c.verifie_par}</span>}
                    {c.preuve && <span className="text-sky-600 font-bold">Preuve disponible</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ TAB: KNOWLEDGE GRAPH ═══════════ */}
      {activeTab === 'graph' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Regulatory Knowledge Graph — {KNOWLEDGE_GRAPH_NODES.length} Nœuds</h2>
              <p className="text-foreground-600">Cartographie complète : BCEAO → Instructions → SFD → RCS → KOS. Traçabilité totale.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {KNOWLEDGE_GRAPH_NODES.map(node => (
                <div key={node.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${node.color}15` }}>
                      <i className={`${
                        node.type === 'autorite' ? 'ri-government-line' : node.type === 'texte' ? 'ri-book-2-line' : node.type === 'domaine' ? 'ri-folder-line' : node.type === 'norme' ? 'ri-scales-line' : 'ri-cpu-line'
                      } text-lg`} style={{ color: node.color }} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-foreground-950 block">{node.label}</span>
                      <span className="text-[10px] text-foreground-400">{node.type === 'autorite' ? 'Autorité' : node.type === 'texte' ? 'Texte' : node.type === 'domaine' ? 'Domaine' : node.type === 'norme' ? 'Norme' : 'Composant KOS'} — {node.size} connexions</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {node.connections.map((conn, j) => (
                      <span key={j} className="text-[10px] px-2 py-0.5 rounded-full border border-background-200 bg-background-100 text-foreground-500">{conn}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ TAB: COMPLIANCE ENGINES ═══════════ */}
      {activeTab === 'engines' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Compliance Engines — {COMPLIANCE_ENGINES.length} Moteurs</h2>
              <p className="text-foreground-600">BCEAO · OHADA · GAFI/LCB-FT · Protection Données · Cybersécurité. Contrôles automatisés par domaine.</p>
            </div>

            <div className="flex gap-2 mb-6 flex-wrap justify-center">
              {['all', 'bceao', 'ohada', 'gafi', 'privacy', 'cyber'].map(f => (
                <button key={f} onClick={() => setEngineFilter(f as ComplianceEngineType | 'all')}
                  className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer whitespace-nowrap ${engineFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                  {f === 'all' ? 'Tous' : f === 'bceao' ? 'BCEAO/UEMOA' : f === 'ohada' ? 'OHADA' : f === 'gafi' ? 'GAFI/LCB-FT' : f === 'privacy' ? 'Protection Données' : 'Cybersécurité'}
                </button>
              ))}
            </div>

            {filteredEngines.map(engine => (
              <div key={engine.engine} className="rounded-3xl bg-background-50 border border-background-200/70 p-6 sm:p-8 mb-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${engine.color}15` }}>
                      <i className={`${engine.icon} text-2xl`} style={{ color: engine.color }} />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground-950">{engine.label} Compliance Engine</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-3xl font-bold font-heading" style={{ color: engine.color }}>{engine.score_actuel}</span>
                        <span className="text-sm text-foreground-400">/ {engine.score_cible}</span>
                        <span className="text-[10px] text-foreground-400">· {engine.total_controles} contrôles</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <span className="block text-lg font-bold text-emerald-600">{engine.controles_conformes}</span>
                      <span className="text-[10px] text-foreground-400">Conformes</span>
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-amber-600">{engine.controles_partiels}</span>
                      <span className="text-[10px] text-foreground-400">Partiels</span>
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-red-600">{engine.controles_non_conformes}</span>
                      <span className="text-[10px] text-foreground-400">Non conf.</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-4 rounded-full bg-background-100 overflow-hidden mb-6">
                  <div className="h-full rounded-full flex" style={{ width: `${(engine.score_actuel / engine.score_cible) * 100}%` }}>
                    <div className="h-full" style={{ width: `${(engine.controles_conformes / engine.total_controles) * 100}%`, backgroundColor: '#86BC25' }} />
                    <div className="h-full" style={{ width: `${(engine.controles_partiels / engine.total_controles) * 100}%`, backgroundColor: '#CA8A04' }} />
                  </div>
                </div>

                {/* Controls grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {engine.controles.map(ctrl => (
                    <div key={ctrl.id} className="p-3 rounded-xl border flex items-start gap-3 bg-background-50">
                      <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                        ctrl.statut === 'conforme' ? 'bg-emerald-500' : ctrl.statut === 'partiel' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-foreground-800">{ctrl.controle}</span>
                          <span className="text-[10px] font-mono text-foreground-400">{ctrl.reference}</span>
                        </div>
                        <p className="text-[10px] text-foreground-400">{ctrl.observations}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold" style={{ color: ctrl.score >= 80 ? '#059669' : ctrl.score >= 60 ? '#CA8A04' : '#DC2626' }}>{ctrl.score}/100</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {engine.gaps_critiques > 0 && (
                  <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2">
                    <i className="ri-error-warning-line text-red-600" />
                    <span className="text-xs text-red-700 font-bold">{engine.gaps_critiques} gap{engine.gaps_critiques > 1 ? 's' : ''} critique{engine.gaps_critiques > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════ TAB: EVIDENCE LIBRARY ═══════════ */}
      {activeTab === 'evidence' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Evidence Library — {evidenceData.length} Preuves Collectées</h2>
                <p className="text-foreground-600">Captures, PDFs, décisions, rapports, contrôles, validations — horodatés, taggés, traçables.</p>
              </div>
              <div className="flex items-center gap-2">
                {evidenceLoading && <span className="text-xs text-foreground-400"><i className="ri-loader-4-line animate-spin mr-1" />Chargement Supabase...</span>}
                {evidenceError && <span className="text-xs text-amber-600"><i className="ri-error-warning-line mr-1" />Fallback mocks activé</span>}
                {liveEvidence && liveEvidence.length > 0 && (
                  <span className="text-xs text-emerald-600"><i className="ri-check-double-line mr-1" />Live Supabase</span>
                )}
              </div>
            </div>

            {/* Validation Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Total', value: String(evidenceData.length), color: '#D97757', icon: 'ri-file-lock-line' },
                { label: 'Validées', value: String(evidenceStats?.validees || 0), color: '#86BC25', icon: 'ri-check-double-line' },
                { label: 'En attente', value: String(evidenceStats?.en_attente || 0), color: '#CA8A04', icon: 'ri-time-line' },
                { label: 'Taux validation', value: `${evidenceData.length > 0 ? Math.round(((evidenceStats?.validees || 0) / evidenceData.length) * 100) : 0}%`, color: '#4285F4', icon: 'ri-percent-line' },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                  </div>
                  <span className="block text-lg font-bold" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Validation Message */}
            {validationMessage && (
              <div className={`mb-4 p-3 rounded-full text-xs font-bold text-center ${validationMessage.includes('succès') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                <i className={`${validationMessage.includes('succès') ? 'ri-check-double-line' : 'ri-error-warning-line'} mr-1`} />
                {validationMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {evidenceData.map((ev: { id: string; type: string; titre: string; reference_id: string; horodatage: string; responsable: string; format: string; taille: string | null; url: string | null; tags: string[] | null; statut: string; validateur: string | null; date_validation: string | null }) => {
                const st = evidenceStatusBadge(ev.statut || 'en_attente');
                const isPending = ev.statut === 'en_attente';
                return (
                  <div key={ev.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        ev.type === 'capture' ? 'bg-sky-50' : ev.type === 'pdf' ? 'bg-red-50' : ev.type === 'decision' ? 'bg-amber-50' : ev.type === 'rapport' ? 'bg-emerald-50' : ev.type === 'controle' ? 'bg-orange-50' : 'bg-purple-50'
                      }`}>
                        <i className={`${
                          ev.type === 'capture' ? 'ri-screenshot-2-line text-sky-600' : ev.type === 'pdf' ? 'ri-file-pdf-2-line text-red-600' : ev.type === 'decision' ? 'ri-scales-3-line text-amber-600' : ev.type === 'rapport' ? 'ri-file-chart-line text-emerald-600' : ev.type === 'controle' ? 'ri-file-list-3-line text-orange-600' : 'ri-check-double-line text-purple-600'
                        } text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">{ev.type}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${st.bg} ${st.text}`}>{st.label}</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-900 line-clamp-2">{ev.titre}</h3>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {ev.tags?.map((tag, j) => (
                        <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 border border-background-200 text-foreground-500">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-foreground-400 mb-2">
                      <span>{ev.format} · {ev.taille || '—'}</span>
                      <span>{new Date(ev.horodatage).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <div className="text-[10px] text-foreground-400 mb-3">
                      <i className="ri-user-line mr-1" />{ev.responsable} · Réf: {ev.reference_id}
                    </div>
                    {ev.validateur && (
                      <div className="text-[10px] text-emerald-600 font-bold mb-2">
                        <i className="ri-check-double-line mr-1" />Validé par {ev.validateur} · {ev.date_validation ? new Date(ev.date_validation).toLocaleDateString('fr-FR') : '—'}
                      </div>
                    )}
                    {isPending && (
                      <div className="space-y-2">
                        {validationForm.id === ev.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Nom du validateur"
                              value={validationForm.validateur}
                              onChange={(e) => setValidationForm({ id: ev.id, validateur: e.target.value })}
                              className="flex-1 px-3 py-1.5 rounded-lg bg-background-50 border border-background-200 text-xs text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-300"
                            />
                            <button
                              onClick={() => handleValidate(ev.id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-check-line mr-1" />Valider
                            </button>
                            <button
                              onClick={() => setValidationForm({ id: null, validateur: '' })}
                              className="px-3 py-1.5 rounded-lg bg-background-100 text-foreground-500 text-xs font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              Annuler
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setValidationForm({ id: ev.id, validateur: '' })}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer"
                          >
                            <i className="ri-shield-check-line" />Valider cette preuve
                          </button>
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

      {/* ═══════════ TAB: AUTONOMOUS AGENTS ═══════════ */}
      {activeTab === 'agents' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Agents Autonomes — {kpis.agents_actifs}/{kpis.agents_total} Actifs</h2>
              <p className="text-foreground-600">Surveillance, mise à jour, preuves, scan, auto-correction, collecte. Fonctionnement 24/7.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {AUTONOMOUS_AGENTS.map(ag => {
                const s = agentStatusBadge(ag.statut);
                return (
                  <div key={ag.id} className="rounded-3xl bg-background-50 border border-background-200/70 p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${ag.statut === 'actif' ? 'bg-emerald-50' : ag.statut === 'en_deploiement' ? 'bg-sky-50' : 'bg-slate-50'}`}>
                          <i className={`${
                            ag.type === 'regulatory_watch' ? 'ri-radar-line' : ag.type === 'regulatory_update' ? 'ri-refresh-line' : ag.type === 'regulatory_proof' ? 'ri-file-lock-line' : ag.type === 'content_scanner' ? 'ri-scan-line' : ag.type === 'auto_corrector' ? 'ri-tools-line' : 'ri-archive-line'
                          } text-2xl ${ag.statut === 'actif' ? 'text-emerald-600' : 'text-foreground-400'}`} />
                        </div>
                        <div>
                          <h3 className="font-heading text-base font-bold text-foreground-950">{ag.nom}</h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${s.bg} ${s.text}`}>{s.label}</span>
                        </div>
                      </div>
                      <span className="text-2xl font-bold font-heading" style={{ color: ag.uptime_pct >= 99 ? '#059669' : ag.uptime_pct >= 95 ? '#CA8A04' : '#DC2626' }}>{ag.uptime_pct}%</span>
                    </div>

                    <p className="text-sm text-foreground-600 mb-4">{ag.description}</p>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-center">
                        <span className="block text-lg font-bold text-amber-700">{ag.alertes_generees}</span>
                        <span className="text-[10px] text-amber-600">Alertes</span>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                        <span className="block text-lg font-bold text-emerald-700">{ag.corrections_effectuees}</span>
                        <span className="text-[10px] text-emerald-600">Corrections</span>
                      </div>
                      <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-center">
                        <span className="block text-lg font-bold text-sky-700">{ag.preuves_produites}</span>
                        <span className="text-[10px] text-sky-600">Preuves</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Sources surveillées ({ag.sources_surveillees.length})</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ag.sources_surveillees.map((src, j) => (
                          <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 border border-background-200 text-foreground-500 font-mono">{src}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-12 sm:py-16 bg-background-100/70 border-t border-background-200/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-50 flex items-center justify-center">
            <i className="ri-mail-send-line text-orange-600 text-2xl" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-3">
            Veille Réglementaire — Restez informé
          </h2>
          <p className="text-foreground-600 mb-6 max-w-xl mx-auto">
            Recevez les alertes de conformité BCEAO/COBAC/OHADA directement dans votre boîte mail. Une synthèse mensuelle, zéro spam.
          </p>
          <form
            data-readdy-form
            id="remediation-newsletter-form"
            action="https://readdy.ai/api/form/d8onscbf86hv9evgtrj0"
            method="POST"
            encType="application/x-www-form-urlencoded"
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="votre@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-background-50 border border-background-200 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-orange-400 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap"
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
            <p className="text-foreground-600">Le Remediation Engine est le bras armé. Le Compliance Engine est la tour de contrôle.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Remediation Engine', path: '/kos-regulatory-remediation-engine', icon: 'ri-tools-line', color: '#EA580C', current: true },
              { label: 'Compliance Engine', path: '/kos-regulatory-compliance-engine', icon: 'ri-shield-check-line', color: '#86BC25' },
              { label: 'Audit Conformité', path: '/kos-regulatory-compliance-audit', icon: 'ri-file-search-line', color: '#C2410C' },
              { label: 'Automates Conformité', path: '/kos-regulatory-compliance-automates', icon: 'ri-robot-line', color: '#059669' },
              { label: 'Veille Réglementaire', path: '/regulatory-intelligence', icon: 'ri-radar-line', color: '#7C3AED' },
              { label: 'BCEAO Dashboard', path: '/bceao', icon: 'ri-bank-line', color: '#CA8A04' },
              { label: 'COBAC Dashboard', path: '/cobac', icon: 'ri-building-line', color: '#9B7B2C' },
              { label: 'Registre Traitements', path: '/registre-traitements', icon: 'ri-lock-line', color: '#4285F4' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${
                link.current ? 'border-orange-300 bg-orange-50/40 ring-2 ring-orange-400' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'
              }`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && <span className="block text-[10px] text-orange-700 font-bold mt-1">Vous êtes ici</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



