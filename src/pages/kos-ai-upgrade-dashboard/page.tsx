import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import {
  KOS_AI_UPGRADE_KPIS,
  ISO_42001_CHECKLIST,
  BIG_FOUR_REFERENCES,
  KOS_UPGRADE_STATUS,
  type BigFourKPI,
} from '@/mocks/kosAIUpgradeKPIs';

// ── Helpers ──
function getProgressRatio(kpi: BigFourKPI): number {
  if (kpi.name.includes('Hallucination') || kpi.name.includes('Temps')) {
    // Lower is better → invert
    return Math.min(kpi.target / kpi.current, 1) * 100;
  }
  return Math.min((kpi.current / kpi.target) * 100, 100);
}

function getStatusColorClasses(status: string) {
  switch (status) {
    case 'conforme':
    case 'completed':
      return { bg: 'bg-emerald-500', text: 'text-emerald-700', badgeBg: 'bg-emerald-100', border: 'border-emerald-200/60' };
    case 'surveillance':
    case 'in-progress':
      return { bg: 'bg-amber-500', text: 'text-amber-700', badgeBg: 'bg-amber-100', border: 'border-amber-200/60' };
    case 'action':
    case 'pending':
      return { bg: 'bg-red-500', text: 'text-red-700', badgeBg: 'bg-red-100', border: 'border-red-200/60' };
    default:
      return { bg: 'bg-secondary-500', text: 'text-secondary-700', badgeBg: 'bg-secondary-100', border: 'border-secondary-200/60' };
  }
}

function getTrendIcon(trend: string) {
  if (trend === 'up') return <i className="ri-arrow-up-line text-emerald-500 text-xs"></i>;
  if (trend === 'down') return <i className="ri-arrow-down-line text-red-500 text-xs"></i>;
  return <i className="ri-subtract-line text-foreground-400 text-xs"></i>;
}

// ── Hook upgrade ──
const useKOSUpgrade = () => {
  return useQuery({
    queryKey: ['kos-upgrade-ai-bigfour'],
    queryFn: async () => {
      // Simuler un appel API upgrade
      await new Promise((r) => { setTimeout(r, 2000); });
      return { success: true, message: 'Upgrade ISO 42001 lancé avec succès', jobId: `upgrade-${Date.now()}` };
    },
    enabled: false,
  });
};

export default function KOSAIUpgradeDashboardPage() {
  const { refetch, isFetching, data, isSuccess } = useKOSUpgrade();
  const [activePhase, setActivePhase] = useState<string | null>(null);

  const completedChecklist = ISO_42001_CHECKLIST.filter((c) => c.status === 'completed').length;
  const totalChecklist = ISO_42001_CHECKLIST.length;

  return (
    <KOSHubLayout hubId={350} activeTab="AI Upgrade" tabLabel="KOS AI Upgrade Dashboard™">
      <main>
        {/* ── HERO ── */}
        <section className="relative bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-foreground-950 text-background-50 font-body tracking-wide whitespace-nowrap">
                      ISO 42001 + BIG FOUR
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 font-body whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                      {KOS_UPGRADE_STATUS.version}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 font-body whitespace-nowrap">
                      <i className="ri-calendar-line"></i>
                      Cible : {new Date(KOS_UPGRADE_STATUS.targetDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KOS AI Upgrade Dashboard™
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-3xl font-body">
                    Pilotage de l'upgrade KOS AI vers 100% conformité Big Four et certification ISO 42001:2023.
                    {KOS_AI_UPGRADE_KPIS.length} KPIs temps réel · {totalChecklist} exigences ISO · {BIG_FOUR_REFERENCES.length} référentiels Big Four.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-foreground-950 font-heading">
                      {KOS_UPGRADE_STATUS.overallProgress}%
                    </p>
                    <p className="text-xs text-foreground-500">Progression globale</p>
                  </div>
                  <button
                    onClick={() => { void refetch(); }}
                    disabled={isFetching}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-500 text-background-50 dark:text-foreground-950 font-bold text-sm hover:bg-primary-600 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isFetching ? (
                      <>
                        <i className="ri-loader-4-line animate-spin"></i>
                        Upgrade ISO 42001 en cours...
                      </>
                    ) : (
                      <>
                        <i className="ri-rocket-2-line"></i>
                        Lancer Upgrade Big Four
                      </>
                    )}
                  </button>
                  {isSuccess && data && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                      <i className="ri-check-line"></i>
                      {data.message}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── PHASES PROGRESS ── */}
        <div className="border-b border-background-200/70 bg-background-100/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {KOS_UPGRADE_STATUS.phases.map((phase, idx) => {
                const colors = getStatusColorClasses(
                  phase.status === 'completed' ? 'completed' : phase.status === 'in-progress' ? 'in-progress' : 'pending'
                );
                const isActive = activePhase === phase.name;
                return (
                  <button
                    key={phase.name}
                    onClick={() => { setActivePhase(isActive ? null : phase.name); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                      isActive
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-background-200 bg-background-50 hover:border-foreground-300'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full ${colors.badgeBg} ${colors.text} flex items-center justify-center text-[10px] font-bold`}>
                      {idx + 1}
                    </span>
                    <span className="text-foreground-700">{phase.name}</span>
                    <span className={`text-[10px] font-bold ${colors.text}`}>{phase.progress}%</span>
                  </button>
                );
              })}
            </div>
            {/* Global progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-foreground-500 font-medium">Progression globale de l'upgrade</span>
                <span className="text-[10px] font-bold text-foreground-950">{KOS_UPGRADE_STATUS.overallProgress}%</span>
              </div>
              <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary-500 transition-all duration-1000"
                  style={{ width: `${KOS_UPGRADE_STATUS.overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* ── LEFT: KPI CARDS ── */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
                <i className="ri-bar-chart-2-line text-primary-500"></i>
                Big Four KPIs — Conformité AI
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {KOS_AI_UPGRADE_KPIS.map((kpi) => {
                  const progress = getProgressRatio(kpi);
                  const colors = getStatusColorClasses(kpi.status);
                  const isTimeOrHallucination = kpi.name.includes('Temps') || kpi.name.includes('Hallucination');
                  return (
                    <ScrollReveal key={kpi.id}>
                      <div className={`bg-background-50 border rounded-xl p-5 ${colors.border}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${colors.badgeBg} ${colors.text} flex items-center justify-center`}>
                              <i className={`${
                                kpi.status === 'conforme' ? 'ri-check-double-line' :
                                kpi.status === 'surveillance' ? 'ri-eye-line' :
                                'ri-alert-line'
                              } text-lg`}></i>
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-foreground-950">{kpi.name}</h3>
                              <p className="text-[10px] text-foreground-500">{kpi.description}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${colors.badgeBg} ${colors.text}`}>
                            {kpi.status === 'conforme' ? 'CONFORME' : kpi.status === 'surveillance' ? 'SURVEILLANCE' : 'ACTION'}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-foreground-500">
                              {isTimeOrHallucination ? 'Écart vs cible' : 'Atteinte cible'}
                            </span>
                            <span className="text-[10px] font-bold text-foreground-950">
                              {kpi.current}{kpi.unit} / {kpi.target}{kpi.unit}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${colors.bg} transition-all duration-700`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-foreground-500">
                            {getTrendIcon(kpi.trend)}
                            <span>{kpi.trendValue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-secondary-100 text-secondary-700 px-1.5 py-0.5 rounded">
                              {kpi.isoArticle}
                            </span>
                          </div>
                        </div>

                        {/* Big Four ref */}
                        <div className="mt-3 pt-3 border-t border-background-100">
                          <p className="text-[10px] text-foreground-500">
                            Ref. Big Four : <span className="font-medium text-foreground-700">{kpi.bigFourRef}</span>
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* ── BIG FOUR REFERENCES TABLE ── */}
              <ScrollReveal>
                <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                    <i className="ri-building-2-line text-accent-500"></i>
                    Alignement Référentiels Big Four
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-background-100">
                          <th className="text-left py-2 text-foreground-400 font-medium">Cabinet</th>
                          <th className="text-left py-2 text-foreground-400 font-medium">Framework</th>
                          <th className="text-right py-2 text-foreground-400 font-medium">Score KOS</th>
                          <th className="text-center py-2 text-foreground-400 font-medium">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {BIG_FOUR_REFERENCES.map((ref) => {
                          const statusColors = getStatusColorClasses(
                            ref.status === 'aligned' ? 'completed' : ref.status === 'exceeds' ? 'completed' : 'surveillance'
                          );
                          return (
                            <tr key={ref.firm} className="border-b border-background-50 last:border-0">
                              <td className="py-2.5 text-foreground-900 font-medium">{ref.firm}</td>
                              <td className="py-2.5 text-foreground-600">{ref.framework}</td>
                              <td className="py-2.5 text-right font-bold text-foreground-950">{ref.score}%</td>
                              <td className="py-2.5 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColors.badgeBg} ${statusColors.text}`}>
                                  {ref.status === 'aligned' ? 'ALIGNÉ' : ref.status === 'exceeds' ? 'EXCÈDE' : 'ÉCART'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* ── RIGHT: ISO CHECKLIST + STATS ── */}
            <div className="space-y-6">
              {/* ISO Checklist */}
              <ScrollReveal>
                <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
                      <i className="ri-shield-check-line text-primary-500"></i>
                      Checklist ISO 42001:2023
                    </h3>
                    <span className="text-xs font-bold text-foreground-700">
                      {completedChecklist}/{totalChecklist}
                    </span>
                  </div>
                  {/* Checklist progress */}
                  <div className="mb-4">
                    <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary-500 transition-all duration-700"
                        style={{ width: `${(completedChecklist / totalChecklist) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-foreground-500 mt-1">
                      {Math.round((completedChecklist / totalChecklist) * 100)}% des exigences satisfaites
                    </p>
                  </div>
                  <div className="space-y-2 max-h-[480px] overflow-y-auto">
                    {ISO_42001_CHECKLIST.map((item) => {
                      const colors = getStatusColorClasses(item.status);
                      return (
                        <div
                          key={item.id}
                          className={`p-3 rounded-lg border ${colors.border} ${colors.badgeBg} bg-opacity-30`}
                        >
                          <div className="flex items-start gap-2">
                            <div className={`w-5 h-5 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              {item.status === 'completed' ? (
                                <i className="ri-check-line text-white text-[10px]"></i>
                              ) : item.status === 'in-progress' ? (
                                <i className="ri-loader-2-line text-white text-[10px] animate-spin"></i>
                              ) : (
                                <i className="ri-time-line text-white text-[10px]"></i>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-foreground-900 leading-relaxed">{item.label}</p>
                              <p className="text-[10px] text-foreground-500 mt-0.5">{item.article}</p>
                              <p className="text-[10px] text-foreground-400 mt-1 italic">{item.evidence}</p>
                              <p className="text-[10px] text-primary-600 mt-0.5">Owner: {item.owner}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* Quick Stats */}
              <ScrollReveal>
                <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className="ri-pie-chart-line text-accent-500"></i>
                    Vue Synthétique
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'KPIs Conformes', value: KOS_AI_UPGRADE_KPIS.filter((k) => k.status === 'conforme').length, total: KOS_AI_UPGRADE_KPIS.length, color: 'bg-emerald-500' },
                      { label: 'KPIs Surveillance', value: KOS_AI_UPGRADE_KPIS.filter((k) => k.status === 'surveillance').length, total: KOS_AI_UPGRADE_KPIS.length, color: 'bg-amber-500' },
                      { label: 'KPIs Action Requise', value: KOS_AI_UPGRADE_KPIS.filter((k) => k.status === 'action').length, total: KOS_AI_UPGRADE_KPIS.length, color: 'bg-red-500' },
                      { label: 'ISO Items Complétés', value: completedChecklist, total: totalChecklist, color: 'bg-primary-500' },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-foreground-600">{stat.label}</span>
                          <span className="text-xs font-bold text-foreground-950">
                            {stat.value}/{stat.total}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${stat.color}`}
                            style={{ width: `${(stat.value / stat.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Last Scan Info */}
              <ScrollReveal>
                <div className="bg-background-100/50 border border-background-200/70 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-time-line text-foreground-400 text-sm"></i>
                    <span className="text-xs text-foreground-500">Dernier scan</span>
                  </div>
                  <p className="text-xs text-foreground-700">
                    {new Date(KOS_UPGRADE_STATUS.lastScan).toLocaleString('fr-FR')}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <i className="ri-calendar-event-line text-foreground-400 text-sm"></i>
                    <span className="text-xs text-foreground-500">Prochain scan planifié</span>
                  </div>
                  <p className="text-xs text-foreground-700">
                    {new Date(KOS_UPGRADE_STATUS.nextScheduled).toLocaleString('fr-FR')}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <section className="py-12 bg-foreground-950">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="font-heading text-2xl font-bold text-white mb-3">
              KOS AI Upgrade — Vers la Certification ISO 42001:2023
            </h2>
            <p className="text-foreground-400 text-sm max-w-2xl mx-auto mb-6">
              8 KPIs Big Four · 8 exigences ISO 42001 · 5 référentiels cabinets · 6 phases d'upgrade.
              Objectif : certification ISO 42001 d'ici Q3 2026 avec alignement total aux standards PwC, EY, KPMG, Deloitte.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => { void refetch(); }}
                disabled={isFetching}
                className="px-5 py-3 rounded-xl bg-primary-500 text-background-50 dark:text-foreground-950 font-bold text-sm hover:bg-primary-600 transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                <i className="ri-rocket-2-line mr-2"></i>
                {isFetching ? 'Upgrade en cours...' : 'Relancer Upgrade Big Four'}
              </button>
              <a
                href="/kos-ultimate-cockpit"
                className="px-5 py-3 rounded-xl bg-background-50 text-foreground-950 font-bold text-sm hover:bg-background-100 transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-dashboard-3-line mr-2"></i>
                Ultimate Cockpit
              </a>
              <a
                href="/kos-iso-bigfour-total-compliance-control"
                className="px-5 py-3 rounded-xl bg-accent-500 text-white font-bold text-sm hover:bg-accent-600 transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-radar-line mr-2"></i>
                Total Compliance
              </a>
            </div>
          </div>
        </section>
      </main>
    </KOSHubLayout>
  );
}