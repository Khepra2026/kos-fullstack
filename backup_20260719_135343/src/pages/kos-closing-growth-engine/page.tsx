import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKOSClosingGrowthEngine } from '@/hooks/useKOSClosingGrowthEngine';
import type { LeadMagnetRecommendation, ClosingAlert, EvolutionMutation, VisitorProfile } from '@/mocks/closingGrowthEngine';

const TABS = [
  { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
  { id: 'lead-magnets', label: 'Aimants à Leads', icon: 'ri-download-cloud-2-line' },
  { id: 'closing', label: 'IA de Closing', icon: 'ri-fire-line' },
  { id: 'evolution', label: 'Auto-Évolution', icon: 'ri-loop-left-line' },
  { id: 'visitors', label: 'Profils Visiteurs', icon: 'ri-user-search-line' },
];

const LEVEL_COLORS: Record<string, string> = {
  'niveau-1': 'bg-amber-100 text-amber-900 border-amber-300',
  'niveau-2': 'bg-orange-100 text-orange-900 border-orange-300',
  'niveau-3': 'bg-red-100 text-red-900 border-red-300',
};

const LEVEL_BADGES: Record<string, string> = {
  'niveau-1': 'Prospect Qualifié',
  'niveau-2': 'Forte Intention',
  'niveau-3': 'Opportunité Prioritaire',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  executed: 'bg-primary-100 text-primary-800',
  converted: 'bg-accent-100 text-accent-800',
  dismissed: 'bg-gray-100 text-gray-600',
  deployed: 'bg-accent-100 text-accent-800',
  approved: 'bg-primary-100 text-primary-800',
};

const MAGNET_FORMAT_ICONS: Record<string, string> = {
  pdf: 'ri-file-pdf-line',
  dashboard: 'ri-bar-chart-2-line',
  rapport: 'ri-file-text-line',
  'plan-action': 'ri-road-map-line',
};

const PRIORITY_COLORS: Record<string, string> = {
  P0: 'bg-red-100 text-red-800',
  P1: 'bg-amber-100 text-amber-800',
  P2: 'bg-gray-100 text-gray-700',
};

function formatFCFA(value: number): string {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)} Md FCFA`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(0)} M FCFA`;
  return `${(value / 1000).toFixed(0)}K FCFA`;
}

function formatNumber(value: number): string {
  return value.toLocaleString('fr-FR');
}

export default function closingGrowthEnginePage() {
  const engine = useKOSClosingGrowthEngine();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <hubLayout hubId={118} activeTab={activeTab} tabLabel={TABS.find((t) => t.id === activeTab)?.label}>
      {/* Header */}
      <header className="bg-background-100 border-b border-background-200/70">
        <div className="w-full px-4 md:px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-800">
                  <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
                  ACTIVE
                </span>
                <span className="text-xs text-foreground-600 font-medium">Hub 118 — 25 Juin 2026</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading">
                KOS Closing & Growth Engine™
              </h1>
              <p className="text-sm text-foreground-600 mt-1 max-w-2xl">
                3 moteurs autonomes interconnectés — Aimant à Leads Dynamique · IA de Closing 3 Niveaux · Moteur Auto-Évolutif 8 Sources. Zéro dépendance externe.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground-950 font-heading">
                  {formatFCFA(engine.closingKPIs.pipelineValue)}
                </div>
                <div className="text-xs text-foreground-600">Pipeline Actif</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent-600 font-heading">
                  {engine.magnetEngineStats.totalLeadsGenerated}
                </div>
                <div className="text-xs text-foreground-600">Leads Générés</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-background-50 border-b border-background-200/70 sticky top-0 z-10">
        <div className="w-full px-4 md:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-background-50'
                    : 'text-foreground-600 hover:text-foreground-900 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-base`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="w-full px-4 md:px-6 py-6">
        {/* ═══════════════════════════ VUE D'ENSEMBLE ═══════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Triple KPI Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <i className="ri-download-cloud-2-line text-primary-600 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground-900">Lead Magnet Engine</div>
                    <div className="text-xs text-foreground-600">{engine.magnetEngineStats.activeMagnets} aimants actifs</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-lg font-bold text-foreground-950 font-heading">{engine.magnetEngineStats.avgConversionRate}%</div>
                    <div className="text-xs text-foreground-600">Taux conversion moyen</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground-950 font-heading">{formatNumber(engine.magnetEngineStats.totalViews)}</div>
                    <div className="text-xs text-foreground-600">Vues totales</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground-950 font-heading">{formatNumber(engine.magnetEngineStats.totalDownloads)}</div>
                    <div className="text-xs text-foreground-600">Téléchargements</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-600 font-heading">{formatFCFA(engine.magnetEngineStats.totalRevenueImpact)}</div>
                    <div className="text-xs text-foreground-600">Impact Revenu</div>
                  </div>
                </div>
              </div>

              <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                    <i className="ri-fire-line text-accent-600 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground-900">AI Closing Trigger</div>
                    <div className="text-xs text-foreground-600">{engine.closingEngineStats.alertsToday} alertes aujourd'hui</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-lg font-bold text-foreground-950 font-heading">{engine.closingKPIs.visitorsToLeads}%</div>
                    <div className="text-xs text-foreground-600">Visiteur → Lead</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground-950 font-heading">{engine.closingKPIs.leadsToMeetings}%</div>
                    <div className="text-xs text-foreground-600">Lead → RDV</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground-950 font-heading">{engine.closingKPIs.meetingsToProposals}%</div>
                    <div className="text-xs text-foreground-600">RDV → Proposition</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-600 font-heading">{engine.closingKPIs.proposalsToSignature}%</div>
                    <div className="text-xs text-foreground-600">Proposition → Signature</div>
                  </div>
                </div>
              </div>

              <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                    <i className="ri-loop-left-line text-secondary-600 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground-900">Auto-Evolution Engine</div>
                    <div className="text-xs text-foreground-600">{engine.evolutionStats.totalCyclesCompleted} cycles complétés</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-lg font-bold text-foreground-950 font-heading">{engine.evolutionStats.totalMutationsDeployed}</div>
                    <div className="text-xs text-foreground-600">Mutations déployées</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground-950 font-heading">{engine.evolutionStats.avgConversionLift}%</div>
                    <div className="text-xs text-foreground-600">Lift conversion moyen</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground-950 font-heading">{formatNumber(engine.evolutionStats.observationsProcessed)}</div>
                    <div className="text-xs text-foreground-600">Observations traitées</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-600 font-heading">{formatFCFA(engine.evolutionStats.totalRevenueImpact)}</div>
                    <div className="text-xs text-foreground-600">Impact Revenu total</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { label: 'Leads/mois', value: engine.closingKPIs.totalLeadsThisMonth },
                { label: 'RDV planifiés', value: engine.closingKPIs.totalMeetingsScheduled },
                { label: 'Propositions', value: engine.closingKPIs.totalProposalsSent },
                { label: 'Deals signés', value: engine.closingKPIs.totalDealsClosed },
                { label: 'Sources actives', value: engine.evolutionStats.activeSources },
                { label: 'Mutations en cours', value: engine.evolutionStats.mutationsPending },
                { label: 'Gouvernance', value: `${engine.evolutionStats.governanceCompliance}%` },
                { label: 'TMCC', value: engine.closingKPIs.avgTimeToClose },
              ].map((stat) => (
                <div key={stat.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-foreground-950 font-heading">{typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}</div>
                  <div className="text-xs text-foreground-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Architecture Flow */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-900 mb-4">Architecture des 3 Moteurs Interconnectés</h3>
              <div className="flex flex-col lg:flex-row items-center gap-3">
                {[
                  { name: 'Lead Magnet Engine', desc: '8 aimants · Profilage visiteur · Génération PDF/Dashboard', icon: 'ri-download-cloud-2-line', color: 'primary' },
                  { name: '→', desc: 'Leads qualifiés + scores', icon: '', color: '' },
                  { name: 'AI Closing Trigger', desc: '3 niveaux · Scoring temps réel · Actions automatisées', icon: 'ri-fire-line', color: 'accent' },
                  { name: '→', desc: 'Données conversion + feedback', icon: '', color: '' },
                  { name: 'Auto-Evolution Engine', desc: '8 sources · 147 mutations · Cycle continu', icon: 'ri-loop-left-line', color: 'secondary' },
                ].map((item, i) => (
                  <div key={i} className={`flex-1 ${item.icon ? 'bg-background-100 rounded-lg p-4 border border-background-200/70' : 'flex items-center justify-center px-2'}`}>
                    {item.icon ? (
                      <div className="text-center">
                        <div className={`w-10 h-10 rounded-lg bg-${item.color}-100 flex items-center justify-center mx-auto mb-2`}>
                          <i className={`${item.icon} text-${item.color}-600 text-lg`}></i>
                        </div>
                        <div className="text-sm font-semibold text-foreground-900">{item.name.split(' · ')[0]}</div>
                        <div className="text-xs text-foreground-600 mt-1">{item.desc}</div>
                      </div>
                    ) : (
                      <i className="ri-arrow-right-line text-2xl text-foreground-400"></i>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Cycle d'Amélioration Continue */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-900 mb-4">Cycle d'Amélioration Continue</h3>
              <div className="flex flex-wrap items-center gap-2">
                {['Collecte', 'Analyse', 'Priorisation', 'Génération', 'Validation', 'Déploiement', 'Mesure', 'Réapprentissage'].map((phase, i) => (
                  <div key={phase} className="flex items-center gap-2">
                    <div className="bg-background-100 border border-background-200/70 rounded-lg px-3 py-2 text-xs font-medium text-foreground-700 whitespace-nowrap">
                      {i + 1}. {phase}
                    </div>
                    {i < 7 && <i className="ri-arrow-right-s-line text-foreground-400"></i>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════ AIMANTS À LEADS ═══════════════════════════ */}
        {activeTab === 'lead-magnets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {engine.magnetConversions.map((conv) => (
                <div key={conv.magnetId} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${PRIORITY_COLORS[engine.leadMagnets.find((m) => m.id === conv.magnetId)?.priority || 'P2']}`}>
                      {engine.leadMagnets.find((m) => m.id === conv.magnetId)?.priority || 'P2'}
                    </span>
                    <span className="text-xs text-foreground-600">{formatNumber(conv.views)} vues</span>
                  </div>
                  <div className="text-sm font-semibold text-foreground-900 mb-2 leading-tight">
                    {engine.leadMagnets.find((m) => m.id === conv.magnetId)?.title.split(':')[0]}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <div className="text-lg font-bold text-foreground-950 font-heading">{conv.conversionRate}%</div>
                      <div className="text-xs text-foreground-600">Conversion</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-foreground-950 font-heading">{formatNumber(conv.leadsGenerated)}</div>
                      <div className="text-xs text-foreground-600">Leads</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground-600">
                    <i className={`${MAGNET_FORMAT_ICONS[engine.leadMagnets.find((m) => m.id === conv.magnetId)?.format || 'pdf']}`}></i>
                    <span>{engine.leadMagnets.find((m) => m.id === conv.magnetId)?.format?.toUpperCase()}</span>
                    <span className="text-foreground-400">·</span>
                    <span>{conv.avgTimeToConvert}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-background-200/70">
                    <div className="text-xs font-medium text-primary-600">{formatFCFA(conv.revenueImpact)} impact</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lead Magnet Detail */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-900 mb-4">Catalogue des 8 Aimants à Leads</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200/70 text-left">
                      <th className="py-2 px-3 text-xs font-semibold text-foreground-600">Aimant</th>
                      <th className="py-2 px-3 text-xs font-semibold text-foreground-600">Format</th>
                      <th className="py-2 px-3 text-xs font-semibold text-foreground-600">Questions</th>
                      <th className="py-2 px-3 text-xs font-semibold text-foreground-600">Temps</th>
                      <th className="py-2 px-3 text-xs font-semibold text-foreground-600">Conversion</th>
                      <th className="py-2 px-3 text-xs font-semibold text-foreground-600">Priorité</th>
                      <th className="py-2 px-3 text-xs font-semibold text-foreground-600">Segments</th>
                      <th className="py-2 px-3 text-xs font-semibold text-foreground-600">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {engine.leadMagnets.map((lm) => {
                      const conv = engine.magnetConversions.find((c) => c.magnetId === lm.id);
                      return (
                        <tr key={lm.id} className="border-b border-background-200/70 hover:bg-background-100/50">
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <i className={`${lm.icon} text-foreground-600`}></i>
                              <span className="font-medium text-foreground-900">{lm.title.split(':')[0]}</span>
                            </div>
                          </td>
                          <td className="py-2 px-3">
                            <span className="text-xs text-foreground-600 uppercase">{lm.format}</span>
                          </td>
                          <td className="py-2 px-3 text-xs text-foreground-700">{lm.questions}</td>
                          <td className="py-2 px-3 text-xs text-foreground-700">{lm.timeToGenerate}</td>
                          <td className="py-2 px-3">
                            <span className="text-xs font-semibold text-accent-600">{conv?.conversionRate || lm.conversionRate}%</span>
                          </td>
                          <td className="py-2 px-3">
                            <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${PRIORITY_COLORS[lm.priority]}`}>{lm.priority}</span>
                          </td>
                          <td className="py-2 px-3">
                            <div className="flex flex-wrap gap-1">
                              {lm.targetSegment.slice(0, 3).map((s) => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-xs bg-background-100 text-foreground-700">{s}</span>
                              ))}
                              {lm.targetSegment.length > 3 && <span className="text-xs text-foreground-500">+{lm.targetSegment.length - 3}</span>}
                            </div>
                          </td>
                          <td className="py-2 px-3 text-xs font-medium text-primary-600">{formatFCFA(conv?.revenueImpact || 0)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════ IA DE CLOSING ═══════════════════════════ */}
        {activeTab === 'closing' && (
          <div className="space-y-6">
            {/* Trigger Rules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {engine.triggerRules.map((rule) => (
                <div key={rule.level} className={`rounded-lg border p-5 ${LEVEL_COLORS[rule.level].split(' ')[2]}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <i className={`${rule.icon} text-lg`}></i>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${LEVEL_COLORS[rule.level]}`}>
                      {LEVEL_BADGES[rule.level]}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-foreground-900 mb-3">{rule.levelName}</div>
                  <div className="space-y-2 mb-3">
                    {rule.conditions.map((cond, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                        <i className="ri-checkbox-circle-fill text-foreground-400 mt-0.5 text-xs"></i>
                        <span>{cond}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-background-50 rounded p-3 border border-background-200/70">
                    <div className="text-xs font-medium text-foreground-700 mb-1">Action automatique :</div>
                    <div className="text-xs text-foreground-900 font-semibold">{rule.actionDescription}</div>
                  </div>
                  <div className="mt-3 text-xs text-foreground-600">
                    <span className="font-medium">KPI Cible :</span> {rule.kpiTarget}
                  </div>
                </div>
              ))}
            </div>

            {/* Alerts List */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground-900">
                  Alertes Actives <span className="text-foreground-600 font-normal">({engine.closingEngineStats.alertsToday} aujourd'hui)</span>
                </h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Niveau 3</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Niveau 2</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Niveau 1</span>
                </div>
              </div>
              <div className="space-y-3">
                {engine.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => engine.setSelectedAlert(alert)}
                    className={`rounded-lg border p-4 cursor-pointer transition-colors hover:bg-background-100/70 ${
                      alert.isNew ? 'border-l-4 border-l-red-500 border-background-200/70' : 'border-background-200/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${LEVEL_COLORS[alert.level]}`}>
                            {LEVEL_BADGES[alert.level]}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[alert.actionStatus]}`}>
                            {alert.actionStatus === 'pending' ? 'En attente' : alert.actionStatus === 'executed' ? 'Exécuté' : alert.actionStatus === 'converted' ? 'Converti' : 'Ignoré'}
                          </span>
                          {alert.isNew && <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700">NOUVEAU</span>}
                        </div>
                        <div className="text-sm font-semibold text-foreground-900">{alert.fullName} — {alert.organization}</div>
                        <div className="text-xs text-foreground-600 mt-1">
                          {alert.sector} · {alert.country} · Score {alert.engagementScore}% · {alert.pagesVisited} pages · {alert.timeOnSiteMinutes} min
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {alert.conditionsMet.map((cond, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded text-xs bg-background-100 text-foreground-700">{cond}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-bold text-foreground-950 font-heading">{formatFCFA(alert.dealValue)}</div>
                        <div className="text-xs text-foreground-600 mt-1">{alert.assignedTo}</div>
                        <div className="text-xs text-foreground-500 mt-1">{new Date(alert.triggeredAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing KPIs Dashboard */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-900 mb-4">Tunnel de Conversion — KPIs Cibles vs Réels</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Visiteur → Lead', actual: engine.closingKPIs.visitorsToLeads, target: '15-25%', icon: 'ri-user-received-line' },
                  { label: 'Lead → Rendez-vous', actual: engine.closingKPIs.leadsToMeetings, target: '40-60%', icon: 'ri-calendar-check-line' },
                  { label: 'RDV → Proposition', actual: engine.closingKPIs.meetingsToProposals, target: '60-80%', icon: 'ri-file-text-line' },
                  { label: 'Proposition → Signature', actual: engine.closingKPIs.proposalsToSignature, target: '30-50%', icon: 'ri-check-double-line' },
                ].map((kpi) => (
                  <div key={kpi.label} className="text-center p-4 bg-background-100 rounded-lg">
                    <i className={`${kpi.icon} text-xl text-foreground-500 mb-2`}></i>
                    <div className="text-2xl font-bold text-foreground-950 font-heading">{kpi.actual}%</div>
                    <div className="text-xs text-foreground-600 mb-1">{kpi.label}</div>
                    <div className="text-xs text-foreground-500 font-medium">Cible : {kpi.target}</div>
                    <div className="mt-2 w-full bg-background-200/70 rounded-full h-1.5">
                      <div
                        className="bg-primary-500 h-1.5 rounded-full"
                        style={{ width: `${(kpi.actual / 60) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════ AUTO-ÉVOLUTION ═══════════════════════════ */}
        {activeTab === 'evolution' && (
          <div className="space-y-6">
            {/* Sources d'Observation */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-900 mb-4">8 Sources d'Observation Actives</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {engine.observationSources.map((src) => (
                  <div key={src.id} className="flex items-start gap-3 p-3 bg-background-100 rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-background-200/70 flex items-center justify-center flex-shrink-0">
                      <i className={`${src.icon} text-foreground-600 text-sm`}></i>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground-900">{src.name}</div>
                      <div className="text-xs text-foreground-600">{formatNumber(src.eventsPerDay)} évènements/jour</div>
                      <div className="text-xs text-foreground-500">{formatNumber(src.dataPoints)} data points</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mutations */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-900 mb-4">
                Mutations Récentes <span className="text-foreground-600 font-normal">({engine.mutations.length})</span>
              </h3>
              <div className="space-y-3">
                {engine.mutations.map((mut) => (
                  <div
                    key={mut.id}
                    onClick={() => engine.setSelectedMutation(mut)}
                    className="border border-background-200/70 rounded-lg p-4 cursor-pointer hover:bg-background-100/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-semibold text-foreground-600">{mut.id}</span>
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[mut.status]}`}>
                            {mut.status === 'deployed' ? 'Déployé' : mut.status === 'approved' ? 'Approuvé' : mut.status}
                          </span>
                          <span className="text-xs text-foreground-500">Phase: {mut.phase}</span>
                        </div>
                        <div className="text-sm font-semibold text-foreground-900">{mut.trigger}</div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <span className="px-1.5 py-0.5 rounded text-xs bg-background-100 text-foreground-700">
                            <i className="ri-radar-line mr-1"></i>{mut.source}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-xs bg-background-100 text-foreground-700">{mut.payload.secteur}</span>
                          <span className="px-1.5 py-0.5 rounded text-xs bg-background-100 text-foreground-700">{mut.payload.juridiction}</span>
                          <span className="px-1.5 py-0.5 rounded text-xs bg-primary-100 text-primary-800">Score Business {mut.payload.scoreBusiness}</span>
                          <span className="px-1.5 py-0.5 rounded text-xs bg-accent-100 text-accent-800">Score Conv. {mut.payload.scoreConversion}</span>
                        </div>
                        {mut.status === 'deployed' && (
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            <div className="text-xs"><span className="text-foreground-600">Leads :</span> <span className="font-semibold text-foreground-900">{mut.impact.leadsGenerated}</span></div>
                            <div className="text-xs"><span className="text-foreground-600">Conv. Lift :</span> <span className="font-semibold text-accent-600">+{mut.impact.conversionLift}%</span></div>
                            <div className="text-xs"><span className="text-foreground-600">Impact :</span> <span className="font-semibold text-primary-600">{formatFCFA(mut.impact.revenueImpact)}</span></div>
                          </div>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs text-foreground-500">
                          {mut.governance.logged && <i className="ri-check-line text-accent-500"></i>}
                          {mut.governance.audited && <i className="ri-shield-check-line text-accent-500"></i>}
                          {mut.governance.reversible && <i className="ri-arrow-go-back-line text-accent-500"></i>}
                        </div>
                        <div className="text-xs text-foreground-500 mt-1">{new Date(mut.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capacités du Moteur */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-900 mb-4">8 Capacités Auto-Évolutives</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {engine.capabilities.map((cap) => (
                  <div key={cap.id} className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`${cap.icon} text-foreground-600`}></i>
                      <span className="text-xs font-semibold text-foreground-900">{cap.name}</span>
                    </div>
                    <div className="text-xs text-foreground-600 mb-2">{cap.description}</div>
                    <div className="flex items-center gap-2 text-xs text-foreground-500">
                      <span className="px-1.5 py-0.5 rounded bg-accent-100 text-accent-800 font-medium">{cap.frequency}</span>
                      <span>{cap.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cycles */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-900 mb-4">Derniers Cycles</h3>
              <div className="space-y-3">
                {engine.cycles.map((cycle) => (
                  <div key={cycle.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-background-100 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="text-xs font-mono font-semibold text-foreground-600">{cycle.id.toUpperCase()}</div>
                      <div className="text-xs text-foreground-500">{cycle.startDate} → {cycle.endDate}</div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div><div className="text-xs text-foreground-600">Observations</div><div className="text-sm font-semibold text-foreground-900">{formatNumber(cycle.observationsCollected)}</div></div>
                      <div><div className="text-xs text-foreground-600">Mutations</div><div className="text-sm font-semibold text-foreground-900">{cycle.mutationsDeployed}/{cycle.mutationsGenerated} déployées</div></div>
                      <div><div className="text-xs text-foreground-600">Lift Conversion</div><div className="text-sm font-semibold text-accent-600">+{cycle.conversionLift}%</div></div>
                      <div><div className="text-xs text-foreground-600">Impact Revenu</div><div className="text-sm font-semibold text-primary-600">{formatFCFA(cycle.revenueImpact)}</div></div>
                    </div>
                    <div className="text-xs text-foreground-600 italic max-w-xs">
                      💡 {cycle.topInsight}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════ PROFILS VISITEURS ═══════════════════════════ */}
        {activeTab === 'visitors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {engine.visitorProfiles.map((profile) => {
                const conv = engine.magnetConversions;
                return (
                  <div key={profile.sessionId} className="bg-background-50 border border-background-200/70 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-semibold text-foreground-600">{profile.sessionId}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        profile.engagementScore >= 85 ? 'bg-red-100 text-red-800' :
                        profile.engagementScore >= 65 ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {profile.engagementScore}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-background-100 text-foreground-700 uppercase">{profile.segment}</span>
                      <span className="px-2 py-0.5 rounded text-xs bg-background-100 text-foreground-700">{profile.country}</span>
                      <span className="px-2 py-0.5 rounded text-xs bg-background-100 text-foreground-700">{profile.jurisdiction}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-foreground-600 mb-3">
                      <span><i className="ri-time-line mr-1"></i>{Math.floor(profile.timeOnSite / 60)} min</span>
                      <span><i className="ri-file-line mr-1"></i>{profile.pagesVisited.length} pages</span>
                      <span><i className="ri-download-line mr-1"></i>{profile.leadMagnetsDownloaded.length} DL</span>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs font-medium text-foreground-700 mb-1">Pages visitées :</div>
                      <div className="flex flex-wrap gap-1">
                        {profile.pagesVisited.slice(0, 4).map((page) => (
                          <span key={page} className="px-1.5 py-0.5 rounded text-xs bg-background-100 text-foreground-600 truncate max-w-[150px]">...{page.slice(-25)}</span>
                        ))}
                        {profile.pagesVisited.length > 4 && <span className="text-xs text-foreground-500">+{profile.pagesVisited.length - 4}</span>}
                      </div>
                    </div>
                    <div className="border-t border-background-200/70 pt-3">
                      <div className="text-xs font-medium text-foreground-700 mb-1">Aimants recommandés :</div>
                      <div className="flex flex-wrap gap-1">
                        {profile.recommendedMagnets.map((mid) => {
                          const lm = engine.leadMagnets.find((m) => m.id === mid);
                          return lm ? (
                            <span key={mid} className="px-1.5 py-0.5 rounded text-xs bg-primary-100 text-primary-800 font-medium">{lm.title.split(':')[0].slice(0, 30)}</span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Profiling Engine Stats */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-900 mb-4">Moteur de Profilage Visiteur</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-background-100 rounded-lg">
                  <div className="text-lg font-bold text-foreground-950 font-heading">{engine.magnetEngineStats.segmentsCovered}</div>
                  <div className="text-xs text-foreground-600">Segments couverts</div>
                </div>
                <div className="text-center p-3 bg-background-100 rounded-lg">
                  <div className="text-lg font-bold text-foreground-950 font-heading">{engine.magnetEngineStats.jurisdictionsCovered}</div>
                  <div className="text-xs text-foreground-600">Juridictions</div>
                </div>
                <div className="text-center p-3 bg-background-100 rounded-lg">
                  <div className="text-lg font-bold text-foreground-950 font-heading">6</div>
                  <div className="text-xs text-foreground-600">Profils actifs</div>
                </div>
                <div className="text-center p-3 bg-background-100 rounded-lg">
                  <div className="text-lg font-bold text-foreground-950 font-heading">{engine.magnetEngineStats.topConversionRate}%</div>
                  <div className="text-xs text-foreground-600">Top conversion</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer KPI Bar */}
        <div className="mt-8 bg-background-100 border border-background-200/70 rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
            {[
              { label: 'Leads/mois', value: engine.closingKPIs.totalLeadsThisMonth },
              { label: 'Aimants actifs', value: engine.magnetEngineStats.activeMagnets },
              { label: 'Conversion moyenne', value: `${engine.magnetEngineStats.avgConversionRate}%` },
              { label: 'Alertes aujourd\'hui', value: engine.closingEngineStats.alertsToday },
              { label: 'Mutations déployées', value: engine.evolutionStats.totalMutationsDeployed },
              { label: 'Lift conversion', value: `+${engine.evolutionStats.avgConversionLift}%` },
              { label: 'Pipeline', value: formatFCFA(engine.closingKPIs.pipelineValue) },
              { label: 'Gouvernance', value: `${engine.evolutionStats.governanceCompliance}%` },
            ].map((kpi) => (
              <div key={kpi.label}>
                <div className="text-base font-bold text-foreground-950 font-heading">{typeof kpi.value === 'number' ? formatNumber(kpi.value) : kpi.value}</div>
                <div className="text-xs text-foreground-600">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </hubLayout>
  );
}



