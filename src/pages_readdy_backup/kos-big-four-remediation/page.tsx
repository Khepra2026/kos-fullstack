import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useBigFourRemediation } from '@/hooks/useBigFourRemediation';
import type { RemediationPhase } from '@/mocks/bigFourRemediation';

export default function bigFourRemediationPage() {
  const { phases, overallMetrics, methodology, isLive, loading, error, refetch } = useBigFourRemediation();

  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('phase-10');
  const selectedPhase = phases.find(p => p.id === selectedPhaseId) || phases[phases.length - 1];

  // ... existing code (styles and rendering functions remain the same) ...
  const getStatusStyle = (status: string) => {
    if (status === 'excellence') return { chip: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500', label: 'Excellence', bar: 'bg-green-500', iconBg: 'bg-green-100 text-green-700' };
    if (status === 'very_good') return { chip: 'bg-lime-100 text-lime-700 border-lime-200', dot: 'bg-lime-500', label: 'Très Performant', bar: 'bg-lime-500', iconBg: 'bg-lime-100 text-lime-700' };
    if (status === 'acceptable') return { chip: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500', label: 'Acceptable', bar: 'bg-amber-500', iconBg: 'bg-amber-100 text-amber-700' };
    if (status === 'in_progress') return { chip: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500', label: 'En Cours', bar: 'bg-blue-500', iconBg: 'bg-blue-100 text-blue-700' };
    return { chip: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500', label: 'Critique', bar: 'bg-red-500', iconBg: 'bg-red-100 text-red-700' };
  };

  const getSeverityStyle = (severity: string) => {
    if (severity === 'critical') return 'bg-red-100 text-red-700 border-red-200';
    if (severity === 'high') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (severity === 'medium') return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    return 'bg-background-100 text-foreground-600 border-background-200';
  };

  const getGapStatusStyle = (status: string) => {
    if (status === 'resolved') return 'bg-green-100 text-green-700';
    if (status === 'in_progress') return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  if (loading) {
    return (
      <hubLayout hubId={64}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
              <span className="text-sm">Chargement du Command Center...</span>
            </div>
          </div>
        </div>
      </hubLayout>
    );
  }

  if (error && phases.length === 0) {
    return (
      <hubLayout hubId={64}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div>
            <p className="text-sm text-red-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button>
          </div>
        </div>
      </hubLayout>
    );
  }

  if (!selectedPhase) return null;

  const { overall_compliance_score: score, phases_at_excellence: excellent, total_gaps: totalGaps, gaps_critical: criticalGaps, total_actions: totalActions, actions_completed: completedActions } = overallMetrics;

  return (
    <hubLayout hubId={64}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground-950 text-background-50 text-xs font-semibold mb-4">
                <i className="ri-shield-flash-line"></i>Bureau Central de Transformation — KOS Big Four Remediation Command Center™
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Big Four Remediation Command Center™</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Centre de commandement unifié du Bureau Central de Transformation, Qualité, Risques, Conformité et Performance.
                Audit, correction, sécurisation, optimisation et industrialisation des 62 hubs, 75 agents IA et 98 Edge Functions KOS.
              </p>
              {isLive && (
                <span className="inline-flex items-center gap-1.5 mt-3 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>DONNÉES LIVE SUPABASE
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="text-center px-4 py-3 bg-foreground-950 rounded-xl text-background-50">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{score}</span>
                  <span className="text-sm opacity-60">/100</span>
                </div>
                <div className="text-xs opacity-70">Score Global Conformité</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-green-600">{excellent}</div>
                <div className="text-xs text-foreground-500">Phases Excellence</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-amber-600">{totalGaps}</div>
                <div className="text-xs text-foreground-500">Écarts ({criticalGaps} critiques)</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-accent-500">{completedActions}/{totalActions}</div>
                <div className="text-xs text-foreground-500">Actions Complétées</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phase Selection Panel */}
          <div className="lg:col-span-1 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-foreground-950 text-background-50">
                <i className="ri-stack-line text-lg"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground-950">Les 10 Phases de Remédiation</h3>
                <p className="text-xs text-foreground-500">{totalGaps} écarts · {totalActions} actions</p>
              </div>
            </div>
            {phases.map((phase) => {
              const st = getStatusStyle(phase.status);
              const isSelected = selectedPhaseId === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhaseId(phase.id)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-all ${
                    isSelected ? 'border-foreground-300 bg-background-50 shadow-md ring-2 ring-foreground-100' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${st.iconBg}`}>
                      <i className={`${phase.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-foreground-400">Phase {phase.phase_number}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${st.chip}`}>{st.label}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground-950 mt-0.5 truncate">{phase.name}</h4>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-foreground-950">{phase.current_score}</div>
                      <div className="text-[10px] text-foreground-400">/100</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 bg-background-200/70 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${st.bar} transition-all`} style={{ width: `${Math.min(phase.current_score, 100)}%` }}></div>
                    </div>
                    <span className={`text-[10px] font-bold ${phase.trend === 'up' ? 'text-green-600' : phase.trend === 'down' ? 'text-red-600' : 'text-amber-600'}`}>
                      {phase.trend === 'up' ? '+' : ''}{phase.trend_pct}%
                    </span>
                  </div>
                  {phase.gaps.filter(g => g.severity === 'critical').length > 0 && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      <span className="text-[10px] text-red-600 font-medium">{phase.gaps.filter(g => g.severity === 'critical').length} gap{phase.gaps.filter(g => g.severity === 'critical').length > 1 ? 's' : ''} critique{phase.gaps.filter(g => g.severity === 'critical').length > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Phase Detail Panel */}
          <div className="lg:col-span-2 space-y-6">
            {(() => {
              const st = getStatusStyle(selectedPhase.status);
              return (
                <>
                  <div className="bg-background-50 rounded-xl border border-background-200/70 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${st.iconBg}`}>
                        <i className={`${selectedPhase.icon} text-2xl`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-foreground-400">Phase {selectedPhase.phase_number}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.chip}`}>{st.label}</span>
                          <span className="text-xs text-foreground-400">·</span>
                          <span className="text-xs text-foreground-500">Owner: {selectedPhase.owner}</span>
                        </div>
                        <h2 className="text-xl font-bold text-foreground-950">{selectedPhase.name}</h2>
                      </div>
                      <div className="text-center flex-shrink-0">
                        <div className="text-3xl font-bold text-foreground-950">{selectedPhase.current_score}</div>
                        <div className="text-xs text-foreground-400">/ {selectedPhase.target_score}</div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground-600 mb-4">{selectedPhase.description}</p>
                    <a
                      href={selectedPhase.hub_url}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
                    >
                      <i className="ri-external-link-line"></i>
                      Hub associé : {selectedPhase.hub_name}
                    </a>
                  </div>

                  <div className="bg-background-50 rounded-xl border border-background-200/70 p-6">
                    <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                      <i className="ri-bar-chart-2-line text-accent-500"></i>Indicateurs de Performance (KPIs)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedPhase.kpis.map((kpi, i) => (
                        <div key={i} className={`p-3 rounded-lg border ${kpi.met ? 'border-green-200 bg-green-50/50' : 'border-amber-200 bg-amber-50/50'}`}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`text-sm ${kpi.met ? 'text-green-500' : 'text-amber-500'}`}>
                              <i className={`${kpi.met ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'} text-xs`}></i>
                            </span>
                            <span className="text-[10px] text-foreground-500">{kpi.label}</span>
                          </div>
                          <div className="text-lg font-bold text-foreground-950">
                            {typeof kpi.current === 'number' ? kpi.current.toLocaleString('fr-FR') : kpi.current}
                            <span className="text-xs text-foreground-400 ml-1">{kpi.unit}</span>
                          </div>
                          <div className="text-[10px] text-foreground-400">Cible: {typeof kpi.target === 'number' ? kpi.target.toLocaleString('fr-FR') : kpi.target} {kpi.unit}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedPhase.gaps.length > 0 && (
                    <div className="bg-background-50 rounded-xl border border-background-200/70 p-6">
                      <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                        <i className="ri-error-warning-line text-red-500"></i>Écarts Détectés ({selectedPhase.gaps.length})
                      </h3>
                      <div className="space-y-3">
                        {selectedPhase.gaps.map((gap) => (
                          <div key={gap.id} className={`p-4 rounded-lg border ${getSeverityStyle(gap.severity)}`}>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/60 font-bold uppercase">{gap.severity}</span>
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getGapStatusStyle(gap.status)}`}>
                                    {gap.status === 'resolved' ? 'Résolu' : gap.status === 'in_progress' ? 'En cours' : 'Ouvert'}
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-foreground-900">{gap.description}</p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-foreground-500">
                                  <span className="flex items-center gap-1"><i className="ri-user-line"></i>{gap.owner}</span>
                                  <span className="flex items-center gap-1"><i className="ri-calendar-line"></i>{new Date(gap.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-background-50 rounded-xl border border-background-200/70 p-6">
                    <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                      <i className="ri-list-check-2 text-accent-500"></i>Méthodologie
                    </h3>
                    <div className="space-y-2">
                      {selectedPhase.methodology_steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-background-100 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-foreground-950 text-background-50 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold">{i + 1}</span>
                          </div>
                          <p className="text-sm text-foreground-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-background-50 rounded-xl border border-background-200/70 p-6">
                    <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                      <i className="ri-file-text-line text-accent-500"></i>Preuves Documentées
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPhase.evidence_documents.map((doc, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background-100 border border-background-200/70 text-xs text-foreground-600">
                          <i className="ri-file-check-line text-green-500"></i>
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* 10-Step Remediation Methodology */}
        <div className="mt-10 bg-background-100 rounded-2xl border border-background-200/70 p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-heading font-bold text-foreground-950">Méthode de Traitement des Écarts — 10 Étapes</h2>
            <p className="text-sm text-foreground-500 mt-2">Processus standard appliqué par le Bureau Central de Transformation pour chaque écart détecté</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {methodology.map((step) => (
              <div key={step.step} className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center group hover:border-foreground-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-foreground-950 text-background-50 flex items-center justify-center mx-auto mb-3">
                  <span className="text-sm font-bold">{step.step}</span>
                </div>
                <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2 text-accent-500">
                  <i className={`${step.icon} text-lg`}></i>
                </div>
                <h4 className="text-xs font-bold text-foreground-950 mb-1">{step.label}</h4>
                <p className="text-[10px] text-foreground-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom KPIs */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
            <div className="text-2xl font-bold text-green-600">{excellent}/10</div>
            <div className="text-xs text-foreground-500">Phases au Seuil Excellence</div>
          </div>
          <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
            <div className="text-2xl font-bold text-foreground-950">{criticalGaps}</div>
            <div className="text-xs text-foreground-500">Gaps Critiques</div>
          </div>
          <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
            <div className="text-2xl font-bold text-accent-500">+{overallMetrics.avg_velocity} pts</div>
            <div className="text-xs text-foreground-500">Vélocité Mensuelle</div>
          </div>
          <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
            <div className="text-2xl font-bold text-emerald-600">{new Date(overallMetrics.projected_excellence_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</div>
            <div className="text-xs text-foreground-500">Projection Excellence</div>
          </div>
        </div>

        {/* Règle Absolue */}
        <div className="mt-6 bg-foreground-950 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <i className="ri-vip-crown-line text-xl text-amber-400"></i>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Règle Absolue N°1 — Bureau Central de Transformation</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Aucun composant KOS ne peut être considéré comme conforme sans : <strong className="text-white">preuve documentée</strong>, <strong className="text-white">source vérifiable</strong>, <strong className="text-white">traçabilité complète</strong>, <strong className="text-white">responsable identifié</strong>, <strong className="text-white">contrôle permanent</strong>, <strong className="text-white">indicateur de performance</strong>. Toute absence de preuve est considérée comme une non-conformité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}



