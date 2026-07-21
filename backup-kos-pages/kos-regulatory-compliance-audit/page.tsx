import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  COMPLIANCE_OVERVIEW,
  BCEAO_OFFICIAL_TEXTS,
  COBAC_OFFICIAL_TEXTS,
  COMPLIANCE_ANOMALIES,
  COMPLIANCE_QUICK_WINS,
  FILE_AUDIT_RESULTS,
  COMPLIANCE_KPIS,
} from '@/mocks/regulatoryComplianceAudit';
import type { RegulatoryTextRecord, ComplianceAnomaly, QuickWinAction } from '@/mocks/regulatoryComplianceAudit';

type TabId = 'overview' | 'bceao' | 'cobac' | 'anomalies' | 'quickwins' | 'files';

function scoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-amber-600';
  if (score >= 50) return 'text-orange-600';
  return 'text-red-500';
}
function scoreBg(score: number): string {
  if (score >= 85) return 'bg-emerald-50 border-emerald-200';
  if (score >= 70) return 'bg-amber-50 border-amber-200';
  if (score >= 50) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
}
function conformiteBadge(c: RegulatoryTextRecord['conformite']) {
  if (c === 'conforme') return 'bg-emerald-50 border-emerald-200 text-emerald-700';
  if (c === 'partiel') return 'bg-amber-50 border-amber-200 text-amber-700';
  if (c === 'absent') return 'bg-red-50 border-red-200 text-red-700';
  return 'bg-red-50 border-red-200 text-red-700';
}
function severiteBadge(s: ComplianceAnomaly['severite']) {
  if (s === 'critique') return 'bg-red-50 border-red-200 text-red-700';
  if (s === 'haute') return 'bg-orange-50 border-orange-200 text-orange-700';
  if (s === 'moyenne') return 'bg-amber-50 border-amber-200 text-amber-700';
  return 'bg-background-100 border-background-200 text-foreground-500';
}
function statutBadge(s: ComplianceAnomaly['statut'] | QuickWinAction['statut']) {
  if (s === 'corrige' || s === 'completed') return 'bg-emerald-50 text-emerald-700';
  if (s === 'en_cours' || s === 'in_progress') return 'bg-amber-50 text-amber-700';
  return 'bg-background-100 text-foreground-400';
}

export default function regulatoryComplianceAuditPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [zoneFilter, setZoneFilter] = useState<'all' | 'UEMOA' | 'CEMAC'>('all');
  const [conformiteFilter, setConformiteFilter] = useState<'all' | 'conforme' | 'partiel' | 'non_conforme' | 'absent'>('all');

  const overview = COMPLIANCE_OVERVIEW;
  const kpis = COMPLIANCE_KPIS;

  const filteredBceao = useMemo(() => {
    let items = BCEAO_OFFICIAL_TEXTS;
    if (conformiteFilter !== 'all') items = items.filter(t => t.conformite === conformiteFilter);
    return items;
  }, [conformiteFilter]);

  const filteredCobac = useMemo(() => {
    let items = COBAC_OFFICIAL_TEXTS;
    if (conformiteFilter !== 'all') items = items.filter(t => t.conformite === conformiteFilter);
    return items;
  }, [conformiteFilter]);

  const filteredFiles = useMemo(() => {
    let items = FILE_AUDIT_RESULTS;
    if (zoneFilter !== 'all') {
      items = items.filter(f => f.zone === zoneFilter || f.zone === 'mixte');
    }
    return items;
  }, [zoneFilter]);

  const anomaliesStats = useMemo(() => ({
    critiques: COMPLIANCE_ANOMALIES.filter(a => a.severite === 'critique').length,
    hautes: COMPLIANCE_ANOMALIES.filter(a => a.severite === 'haute').length,
    corrigees: COMPLIANCE_ANOMALIES.filter(a => a.statut === 'corrige').length,
    en_cours: COMPLIANCE_ANOMALIES.filter(a => a.statut === 'en_cours').length,
    a_corriger: COMPLIANCE_ANOMALIES.filter(a => a.statut === 'a_corriger').length,
  }), []);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: `${overview.score_global}/100` },
    { id: 'bceao', label: 'BCEAO UEMOA', icon: 'ri-bank-line', count: `${overview.textes_bceao_officiels} textes` },
    { id: 'cobac', label: 'COBAC CEMAC', icon: 'ri-building-line', count: `${overview.textes_cobac_officiels} textes` },
    { id: 'anomalies', label: 'Anomalies', icon: 'ri-error-warning-line', count: String(overview.anomalies_critiques) },
    { id: 'quickwins', label: 'Quick Wins', icon: 'ri-flashlight-line', count: String(COMPLIANCE_QUICK_WINS.filter(q => q.statut !== 'completed').length) },
    { id: 'files', label: 'Fichiers', icon: 'ri-folder-line', count: String(overview.fichiers_scannes) },
  ];

  return (
    <hubLayout hubId={64}>
      <SeoHead
        title="KOS Audit Conformité Réglementaire — BCEAO/CB-UMOA & COBAC/BEAC | KHEPRA EXPERTS"
        description="Audit complet de conformité réglementaire : 356 références auditées, 48 fichiers scannés, score 68/100. 22 textes BCEAO, 18 textes COBAC. 114 anomalies détectées, 14 quick wins."
        keywords="audit conformité, BCEAO, COBAC, UEMOA, CEMAC, réglementation SFD, conformité prudentielle, KHEPRA EXPERTS"
        canonicalPath="/kos-regulatory-compliance-audit"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-red-50/50 border-b border-red-200/40">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100/30 via-transparent to-amber-100/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs font-bold mb-4">
                <i className="ri-shield-check-line" />
                AUDIT CONFORMITÉ RÉGLEMENTAIRE — 16 Juin 2026 — Score {overview.score_global}/100
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                Audit Réglementaire BCEAO/COBAC — Validation Complète des Références du Site
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                <strong className="text-foreground-950">{overview.total_references_audited} références auditées</strong> dans <strong className="text-foreground-950">{overview.fichiers_scannes} fichiers</strong>.{' '}
                <strong className="text-emerald-600">{overview.total_correctes} conformes</strong> ·{' '}
                <strong className="text-red-600">{overview.total_incorrectes} non conformes</strong>.{' '}
                BCEAO : <strong className={overview.score_bceao >= 70 ? 'text-amber-600' : 'text-red-600'}>{overview.score_bceao}/100</strong> ·{' '}
                COBAC : <strong className={overview.score_cobac >= 70 ? 'text-amber-600' : 'text-red-600'}>{overview.score_cobac}/100</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs font-bold">
                  <i className="ri-error-warning-line" />{overview.anomalies_critiques} Anomalies Critiques
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold">
                  <i className="ri-alert-line" />{overview.anomalies_hautes} Hautes
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold">
                  <i className="ri-check-double-line" />{overview.total_correctes} Références OK
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-red-200 flex items-center justify-center relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="42" fill="none" stroke="currentColor" className="text-red-100" strokeWidth="7" />
                  <circle cx="48" cy="48" r="42" fill="none" stroke="currentColor" className="text-red-500" strokeWidth="7"
                    strokeDasharray={`${(overview.score_global / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-2xl font-bold text-red-600 font-heading">{overview.score_global}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
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

      {/* === TAB: OVERVIEW === */}
      {activeTab === 'overview' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Global Scores */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6 sm:p-7 text-center">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-3">Score Global</h3>
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center">
                  <span className="text-3xl font-bold text-red-600 font-heading">{overview.score_global}</span>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-red-100 border border-red-200 text-[10px] font-bold text-red-700">NON CONFORME — Cible ≥ 95</span>
              </div>
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6 sm:p-7 text-center">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-3">Zone UEMOA — BCEAO</h3>
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
                  <span className="text-3xl font-bold text-amber-600 font-heading">{overview.score_bceao}</span>
                </div>
                <p className="text-xs text-foreground-500">{kpis.textes_bceao_references}/{kpis.textes_bceao_total} textes référencés ({kpis.couverture_bceao}%)</p>
              </div>
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6 sm:p-7 text-center">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-3">Zone CEMAC — COBAC</h3>
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center">
                  <span className="text-3xl font-bold text-orange-600 font-heading">{overview.score_cobac}</span>
                </div>
                <p className="text-xs text-foreground-500">{kpis.textes_cobac_references}/{kpis.textes_cobac_total} textes référencés ({kpis.couverture_cobac}%)</p>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
              {[
                { label: 'Réf. Auditées', value: String(overview.total_references_audited), icon: 'ri-file-search-line', color: '#D97757' },
                { label: 'Conformes', value: String(overview.total_correctes), icon: 'ri-check-line', color: '#86BC25' },
                { label: 'Non Conformes', value: String(overview.total_incorrectes), icon: 'ri-close-line', color: '#C2410C' },
                { label: 'Critiques', value: String(overview.anomalies_critiques), icon: 'ri-error-warning-line', color: '#C2410C' },
                { label: 'Fichiers', value: String(overview.fichiers_scannes), icon: 'ri-folder-line', color: '#4A7A1E' },
                { label: 'Textes BCEAO', value: `${kpis.textes_bceao_references}/${kpis.textes_bceao_total}`, icon: 'ri-bank-line', color: '#CA8A04' },
                { label: 'Textes COBAC', value: `${kpis.textes_cobac_references}/${kpis.textes_cobac_total}`, icon: 'ri-building-line', color: '#9B7B2C' },
                { label: 'Quick Wins', value: String(overview.quick_wins_total), icon: 'ri-flashlight-line', color: '#D97757' },
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

            {/* Coverage Gauge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-bank-line text-amber-500" />Couverture BCEAO — {kpis.couverture_bceao}%
                </h3>
                <div className="w-full h-6 rounded-full bg-background-100 overflow-hidden">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: `${kpis.couverture_bceao}%` }} />
                </div>
                <p className="text-xs text-foreground-500 mt-2">{kpis.textes_bceao_references} textes sur {kpis.textes_bceao_total} référencés — {kpis.textes_bceao_total - kpis.textes_bceao_references} absents</p>
              </div>
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-building-line text-orange-500" />Couverture COBAC — {kpis.couverture_cobac}%
                </h3>
                <div className="w-full h-6 rounded-full bg-background-100 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${kpis.couverture_cobac}%` }} />
                </div>
                <p className="text-xs text-foreground-500 mt-2">{kpis.textes_cobac_references} textes sur {kpis.textes_cobac_total} référencés — {kpis.textes_cobac_total - kpis.textes_cobac_references} absents</p>
              </div>
            </div>

            {/* Gap Summary */}
            <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <i className="ri-alert-line text-red-400 text-lg" />
                </div>
                <h3 className="font-heading text-lg font-bold">Gaps Critiques Identifiés — Audit 16 Juin 2026</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Confusion BCEAO / SG-CB-UMOA', desc: 'La BCEAO est citée comme superviseur direct dans 14 articles — devrait être le SG-CB-UMOA', severite: 'CRITIQUE' },
                  { label: 'Confusion BEAC / COBAC', desc: 'La BEAC est citée comme superviseur des EMF dans 8 articles — devrait être la COBAC', severite: 'CRITIQUE' },
                  { label: 'Couverture SFD BCEAO à 32%', desc: '15 textes SFD officiels sur 22 sont absents du site — Instructions RCS, avoirs dormants, finance islamique', severite: 'CRITIQUE' },
                  { label: 'Directive n°08/2012 abrogée', desc: 'Encore citée comme texte en vigueur — remplacée par la Directive n°02/2015 depuis 2015', severite: 'HAUTE' },
                  { label: 'Format de référence non standardisé', desc: 'Variations entre tirets/underscores, majuscules/minuscules dans les numéros d\'instructions', severite: 'MOYENNE' },
                ].map((gap, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/8 border border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold flex-shrink-0 ${gap.severite === 'CRITIQUE' ? 'text-red-300 border-red-500/50' : gap.severite === 'HAUTE' ? 'text-amber-300 border-amber-500/50' : 'text-gray-300 border-gray-500/50'}`}>
                      {gap.severite}
                    </span>
                    <div>
                      <span className="text-sm font-bold block">{gap.label}</span>
                      <span className="text-xs text-gray-400">{gap.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline */}
            <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Pipeline de Correction — {kpis.effort_correction_total}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="block text-3xl font-bold text-emerald-600 font-heading">{anomaliesStats.corrigees}</span>
                  <span className="text-xs text-emerald-700">Anomalies Corrigées</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="block text-3xl font-bold text-amber-600 font-heading">{anomaliesStats.en_cours}</span>
                  <span className="text-xs text-amber-700">En Cours</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-red-50 border border-red-200">
                  <span className="block text-3xl font-bold text-red-600 font-heading">{anomaliesStats.a_corriger}</span>
                  <span className="text-xs text-red-700">À Corriger</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-background-100 border border-background-200">
                  <span className="block text-3xl font-bold text-foreground-700 font-heading">{kpis.effort_correction_total}</span>
                  <span className="text-xs text-foreground-500">Effort Estimé</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: BCEAO UEMOA === */}
      {activeTab === 'bceao' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Catalogue BCEAO/CB-UMOA — {BCEAO_OFFICIAL_TEXTS.length} Textes</h2>
                <p className="text-foreground-600 text-sm">Couverture : {kpis.couverture_bceao}% · {kpis.textes_bceao_references}/{kpis.textes_bceao_total} textes référencés · Score moyen BCEAO : {overview.score_bceao}/100</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Filtrer :</span>
                {['all', 'conforme', 'partiel', 'absent'].map((f) => (
                  <button key={f} onClick={() => setConformiteFilter(f as typeof conformiteFilter)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${conformiteFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {f === 'all' ? 'Tous' : f === 'conforme' ? '✅ Conformes' : f === 'partiel' ? '⚠️ Partiels' : '❌ Absents'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredBceao.map((text) => {
                const isExpanded = expandedId === text.id;
                return (
                  <div key={text.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-background-50 shadow-lg' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedId(isExpanded ? null : text.id)} className="w-full p-4 sm:p-5 text-left flex items-start gap-4 cursor-pointer">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold font-heading text-lg ${scoreBg(text.score)}`}>
                        <span className={scoreColor(text.score)}>{text.score}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${conformiteBadge(text.conformite)}`}>
                            {text.conformite === 'conforme' ? '✅ Conforme' : text.conformite === 'partiel' ? '⚠️ Partiel' : '❌ Absent'}
                          </span>
                          <span className="text-xs text-foreground-400">{text.occurrences_site} occurrences</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950">{text.reference}</h3>
                        <p className="text-xs text-foreground-500 line-clamp-1">{text.title}</p>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-foreground-500 mb-2"><strong>Autorité :</strong> {text.autority} · <strong>Date :</strong> {text.date}</p>
                            <p className="text-sm text-foreground-800 mb-3">{text.title}</p>
                            {text.fichiers_source.length > 0 && (
                              <div className="mb-3">
                                <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Fichiers sources</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {text.fichiers_source.map((f, j) => (
                                    <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 border border-background-200 text-foreground-500 font-mono">{f}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            {text.issues.length > 0 && (
                              <div>
                                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Issues détectées</span>
                                {text.issues.map((iss, j) => (
                                  <p key={j} className="text-xs text-red-700 mt-1 flex items-start gap-1">
                                    <i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0" />{iss}
                                  </p>
                                ))}
                              </div>
                            )}
                            {text.issues.length === 0 && (
                              <div className="flex items-center gap-2 text-emerald-600">
                                <i className="ri-check-double-line" />
                                <span className="text-xs font-semibold">Aucune issue — référence conforme</span>
                              </div>
                            )}
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

      {/* === TAB: COBAC CEMAC === */}
      {activeTab === 'cobac' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Catalogue COBAC/BEAC — {COBAC_OFFICIAL_TEXTS.length} Textes</h2>
                <p className="text-foreground-600 text-sm">Couverture : {kpis.couverture_cobac}% · {kpis.textes_cobac_references}/{kpis.textes_cobac_total} textes référencés · Score moyen COBAC : {overview.score_cobac}/100</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Filtrer :</span>
                {['all', 'conforme', 'partiel', 'absent'].map((f) => (
                  <button key={f} onClick={() => setConformiteFilter(f as typeof conformiteFilter)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${conformiteFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {f === 'all' ? 'Tous' : f === 'conforme' ? '✅ Conformes' : f === 'partiel' ? '⚠️ Partiels' : '❌ Absents'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredCobac.map((text) => {
                const isExpanded = expandedId === text.id;
                return (
                  <div key={text.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-background-50 shadow-lg' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedId(isExpanded ? null : text.id)} className="w-full p-4 sm:p-5 text-left flex items-start gap-4 cursor-pointer">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold font-heading text-lg ${scoreBg(text.score)}`}>
                        <span className={scoreColor(text.score)}>{text.score}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${conformiteBadge(text.conformite)}`}>
                            {text.conformite === 'conforme' ? '✅ Conforme' : text.conformite === 'partiel' ? '⚠️ Partiel' : '❌ Absent'}
                          </span>
                          <span className="text-xs text-foreground-400">{text.occurrences_site} occurrences</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950">{text.reference}</h3>
                        <p className="text-xs text-foreground-500 line-clamp-1">{text.title}</p>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-foreground-500 mb-2"><strong>Autorité :</strong> {text.autority} · <strong>Date :</strong> {text.date}</p>
                            <p className="text-sm text-foreground-800 mb-3">{text.title}</p>
                            {text.fichiers_source.length > 0 && (
                              <div className="mb-3">
                                <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Fichiers sources</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {text.fichiers_source.map((f, j) => (
                                    <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 border border-background-200 text-foreground-500 font-mono">{f}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            {text.issues.length > 0 && (
                              <div>
                                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Issues détectées</span>
                                {text.issues.map((iss, j) => (
                                  <p key={j} className="text-xs text-red-700 mt-1 flex items-start gap-1">
                                    <i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0" />{iss}
                                  </p>
                                ))}
                              </div>
                            )}
                            {text.issues.length === 0 && (
                              <div className="flex items-center gap-2 text-emerald-600">
                                <i className="ri-check-double-line" />
                                <span className="text-xs font-semibold">Aucune issue — référence conforme</span>
                              </div>
                            )}
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

      {/* === TAB: ANOMALIES === */}
      {activeTab === 'anomalies' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Anomalies Détectées — {COMPLIANCE_ANOMALIES.length} Issues</h2>
              <p className="text-foreground-600 text-sm">{anomaliesStats.critiques} critiques · {anomaliesStats.hautes} hautes · {anomaliesStats.corrigees} corrigées · {anomaliesStats.en_cours} en cours</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Critiques', value: String(anomaliesStats.critiques), icon: 'ri-error-warning-line', color: '#C2410C' },
                { label: 'Hautes', value: String(anomaliesStats.hautes), icon: 'ri-alert-line', color: '#D97757' },
                { label: 'Corrigées', value: String(anomaliesStats.corrigees), icon: 'ri-check-double-line', color: '#86BC25' },
                { label: 'En Cours', value: String(anomaliesStats.en_cours), icon: 'ri-tools-line', color: '#CA8A04' },
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

            <div className="space-y-4">
              {COMPLIANCE_ANOMALIES.map((anom) => {
                const isExpanded = expandedId === anom.id;
                return (
                  <div key={anom.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-background-50 shadow-lg' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedId(isExpanded ? null : anom.id)} className="w-full p-4 sm:p-5 text-left flex items-start gap-4 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: anom.severite === 'critique' ? '#FEE2E2' : anom.severite === 'haute' ? '#FFEDD5' : anom.severite === 'moyenne' ? '#FEF3C7' : '#F3F4F6' }}>
                        <i className={`${anom.severite === 'critique' ? 'ri-error-warning-line text-red-600' : anom.severite === 'haute' ? 'ri-alert-line text-orange-600' : 'ri-information-line text-amber-600'} text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-bold text-foreground-950">{anom.id}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${severiteBadge(anom.severite)}`}>{anom.severite.toUpperCase()}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${statutBadge(anom.statut)}`}>
                            {anom.statut === 'corrige' ? 'Corrigé' : anom.statut === 'en_cours' ? 'En cours' : 'À corriger'}
                          </span>
                        </div>
                        <p className="text-sm text-foreground-800 line-clamp-2">{anom.description}</p>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Référence concernée</span>
                              <p className="text-sm font-bold text-foreground-950">{anom.reference_concernee}</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Valeur attendue</span>
                              <p className="text-sm text-emerald-700">{anom.valeur_attendue}</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Valeur trouvée</span>
                              <p className="text-sm text-red-700">{anom.valeur_trouvee}</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Correction</span>
                              <p className="text-sm text-accent-700">{anom.correction}</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Fichiers impactés</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {anom.fichiers.map((f, j) => (
                                  <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 border border-background-200 text-foreground-500 font-mono">{f}</span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-foreground-500"><i className="ri-timer-line mr-1" />Effort : {anom.effort}</span>
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

      {/* === TAB: QUICK WINS === */}
      {activeTab === 'quickwins' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                <i className="ri-flashlight-line text-amber-600" />
                <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">Quick Wins — Actions Prioritaires</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                {COMPLIANCE_QUICK_WINS.length} Actions Correctives
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                {COMPLIANCE_QUICK_WINS.filter(q => q.statut === 'completed').length} terminées · {COMPLIANCE_QUICK_WINS.filter(q => q.statut === 'in_progress').length} en cours · {COMPLIANCE_QUICK_WINS.filter(q => q.statut === 'pending').length} à faire
              </p>
            </div>

            <div className="space-y-3">
              {COMPLIANCE_QUICK_WINS.map((qw) => (
                <div key={qw.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-0 lg:w-56 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: qw.priority === 'critique' ? '#FEE2E2' : qw.priority === 'haute' ? '#FFEDD5' : '#FEF3C7' }}>
                        <i className={`${qw.priority === 'critique' ? 'ri-error-warning-line text-red-600' : qw.priority === 'haute' ? 'ri-alert-line text-orange-600' : 'ri-information-line text-amber-600'} text-lg`} />
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${qw.priority === 'critique' ? 'bg-red-50 border-red-200 text-red-700' : qw.priority === 'haute' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
                        {qw.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground-800 mb-1.5">{qw.action}</p>
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-foreground-400">
                        <span><i className="ri-timer-line mr-1" />{qw.effort}</span>
                        <span className="text-emerald-600 font-semibold"><i className="ri-bar-chart-line mr-1" />{qw.impact}</span>
                        <span><i className="ri-calendar-line mr-1" />{qw.deadline}</span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${statutBadge(qw.statut)}`}>
                      {qw.statut === 'completed' ? 'Terminé' : qw.statut === 'in_progress' ? 'En cours' : 'À faire'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <i className="ri-tools-line text-amber-400 text-lg" />
                </div>
                <h3 className="font-heading text-lg font-bold">Pipeline Conformité — Cible Score 95/100</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <span className="block text-3xl font-bold font-heading text-amber-400">{COMPLIANCE_QUICK_WINS.filter(q => q.statut === 'in_progress').length}</span>
                  <span className="text-xs text-gray-400">En cours</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold font-heading text-red-400">{COMPLIANCE_QUICK_WINS.filter(q => q.priority === 'critique' && q.statut !== 'completed').length}</span>
                  <span className="text-xs text-gray-400">Critiques restantes</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold font-heading text-emerald-400">{COMPLIANCE_QUICK_WINS.filter(q => q.statut === 'completed').length}</span>
                  <span className="text-xs text-gray-400">Terminées</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold font-heading text-white">{COMPLIANCE_QUICK_WINS.length}</span>
                  <span className="text-xs text-gray-400">Total</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Gain SEO estimé : {kpis.gain_seo_estime} · Effort total : {kpis.effort_correction_total} · Score projeté : 95/100 (cible AAAA Big Four)
              </p>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: FILES === */}
      {activeTab === 'files' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Audit par Fichier — {FILE_AUDIT_RESULTS.length} Fichiers Scannés</h2>
                <p className="text-foreground-600 text-sm">Score moyen : {kpis.score_moyen_fichiers}/100 · Meilleur : {kpis.meilleur_fichier} ({kpis.meilleur_score}) · Pire : {kpis.pire_fichier} ({kpis.pire_score})</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Zone :</span>
                {['all', 'UEMOA', 'CEMAC'].map((z) => (
                  <button key={z} onClick={() => setZoneFilter(z as typeof zoneFilter)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${zoneFilter === z ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {z === 'all' ? 'Toutes' : z}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Fichier</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Zone</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Réf. Totales</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Correctes</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Incorrectes</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => (
                      <tr key={file.file} className="border-t border-background-100 hover:bg-background-50/70">
                        <td className="px-4 py-3">
                          <span className="text-xs font-mono text-foreground-700 truncate block max-w-[400px]">{file.file}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${file.zone === 'UEMOA' ? 'bg-amber-50 text-amber-700' : file.zone === 'CEMAC' ? 'bg-orange-50 text-orange-700' : 'bg-background-100 text-foreground-500'}`}>
                            {file.zone}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground-700 font-semibold">{file.total_references}</td>
                        <td className="px-4 py-3 text-xs text-emerald-600 font-semibold">{file.correctes}</td>
                        <td className="px-4 py-3 text-xs text-red-600 font-semibold">{file.incorrectes}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-2 rounded-full bg-background-200 overflow-hidden">
                              <div className={`h-full rounded-full ${file.score >= 85 ? 'bg-emerald-500' : file.score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${file.score}%` }} />
                            </div>
                            <span className={`text-xs font-bold ${scoreColor(file.score)}`}>{file.score}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cross-link Ecosystem */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème KOS — Conformité & Régulation</h2>
            <p className="text-foreground-600">Navigation rapide vers les hubs réglementaires connectés.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Audit Conformité', path: '/kos-regulatory-compliance-audit', icon: 'ri-shield-check-line', color: '#C2410C', current: true },
              { label: 'Veille Réglementaire', path: '/regulatory-intelligence', icon: 'ri-radar-line', color: '#D97757' },
              { label: 'Compliance Management', path: '/compliance-management', icon: 'ri-file-list-3-line', color: '#4A7A1E' },
              { label: 'BCEAO Dashboard', path: '/bceao', icon: 'ri-bank-line', color: '#CA8A04' },
              { label: 'COBAC Dashboard', path: '/cobac', icon: 'ri-building-line', color: '#9B7B2C' },
              { label: 'GAFI Dashboard', path: '/gafi', icon: 'ri-global-line', color: '#4285F4' },
              { label: 'OHADA Dashboard', path: '/ohada', icon: 'ri-scales-line', color: '#86BC25' },
              { label: 'Prix de Transfert', path: '/transfer-pricing', icon: 'ri-exchange-line', color: '#C05A3A' },
            ].map((link) => (
              <a key={link.path} href={link.path}
                className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${link.current ? 'border-red-300 bg-red-50/40 ring-2 ring-red-400' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && <span className="block text-[10px] text-red-600 font-bold mt-1">Actif — Audit en cours</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





