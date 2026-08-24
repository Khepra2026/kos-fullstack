import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useGovernanceFormalization } from '@/hooks/useGovernanceFormalization';

type Tab = 'overview' | 'nominations' | 'committees' | 'charters' | 'corrective' | 'kpis' | 'calendar';

export default function governanceFormalizationPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const {
    loading,
    nominatedOfficers,
    auditCommittees,
    formalCharters,
    correctivePlan,
    quarterlyKPIs,
    gouvernanceStats,
    quarterlyCommitteeCalendar,
    completedActions,
    totalActions,
    criticalActions,
    progressPercent
  } = useGovernanceFormalization();

  const [expandedCommittee, setExpandedCommittee] = useState<string | null>(null);
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);
  const [selectedQuarter, setSelectedQuarter] = useState<string>('q3-2026');
  const [expandedOfficer, setExpandedOfficer] = useState<string | null>(null);

  const selectedQuarterData = quarterlyKPIs.quarters.find(q => q.id === selectedQuarter);

  const getPriorityBadge = (p: string) => {
    if (p.includes('P0')) return 'bg-red-50 text-red-700 border-red-200';
    if (p.includes('P1')) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };
  const getStatusBadge = (s: string) => {
    if (s === 'Terminé') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (s === 'En cours') return 'bg-accent-50 text-accent-700 border-accent-200';
    return 'bg-foreground-100 text-foreground-600 border-foreground-200';
  };

  const tabs: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line' },
    { id: 'nominations', label: 'Nominations', icon: 'ri-user-star-line', count: 2 },
    { id: 'committees', label: 'Comités d\'Audit', icon: 'ri-organization-chart', count: 4 },
    { id: 'charters', label: 'Chartes & Mandats', icon: 'ri-scales-3-line', count: formalCharters.length },
    { id: 'corrective', label: 'Plan Correctif', icon: 'ri-tools-line', count: totalActions },
    { id: 'kpis', label: 'KPIs Trimestriels', icon: 'ri-bar-chart-2-line' },
    { id: 'calendar', label: 'Calendrier', icon: 'ri-calendar-schedule-line', count: 12 }
  ];

  return (
    <hubLayout hubId={72}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-government-line"></i>Consortium PwC · Deloitte · EY · KPMG
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                KOS Governance Formalization Command™
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Nomination RSSI & RCLCB/FT · Constitution des 4 Comités d'Audit · Adoption des Chartes & Mandats
                · Plan Correctif Big Four avec Deadlines, Responsables et KPIs Trimestriels.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{gouvernanceStats.global_governance_score}</div>
                <div className="text-xs text-foreground-500">Score Actuel /100</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{gouvernanceStats.target_governance_score}</div>
                <div className="text-xs text-foreground-500">Cible /100</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-emerald-600">{completedActions}/{totalActions}</div>
                <div className="text-xs text-foreground-500">Actions Complétées</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Tab Bar */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-background-50'
                    : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                {tab.count !== undefined && (
                  <span className="text-xs opacity-60">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {loading && (
          <div className="text-center py-20 text-foreground-500">Chargement du diagnostic gouvernance...</div>
        )}

        {/* ============ TAB: VUE D'ENSEMBLE ============ */}
        {!loading && activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Nominations Formelles', val: `${gouvernanceStats.nominations_completed}/${gouvernanceStats.total_nominations}`, icon: 'ri-user-star-line', color: 'bg-emerald-50 text-emerald-700' },
                { label: 'Comités Constitués', val: `${gouvernanceStats.committees_constituted}/${gouvernanceStats.total_committees}`, icon: 'ri-organization-chart', color: 'bg-emerald-50 text-emerald-700' },
                { label: 'Chartes Adoptées', val: `${gouvernanceStats.charters_adopted}/${gouvernanceStats.total_charters}`, icon: 'ri-scales-3-line', color: 'bg-emerald-50 text-emerald-700' },
                { label: 'Actions P0 Complétées', val: `${gouvernanceStats.critical_gaps_resolved}`, icon: 'ri-alert-line', color: 'bg-red-50 text-red-700' },
              ].map((s) => (
                <div key={s.label} className="bg-background-50 rounded-lg border border-background-200/70 p-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                    <i className={`${s.icon} text-lg`}></i>
                  </div>
                  <div className="text-2xl font-bold text-foreground-950">{s.val}</div>
                  <div className="text-xs text-foreground-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Commander's Intent */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <i className="ri-focus-3-line text-accent-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Commander's Intent — Formalisation Gouvernance</h3>
                  <p className="text-xs text-gray-400">Mandat du Consortium Big Four — 19 Juin 2026</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Le diagnostic de gouvernance KOS révèle un score initial de <strong className="text-white">28/100</strong>.
                Absence de RSSI et RCLCB/FT formellement nommés. Zéro comité d'audit constitué. Aucune charte
                de gouvernance adoptée. Le plan correctif Big Four déploie <strong className="text-white">30 actions</strong> sur
                6 piliers — budget <strong className="text-white">150,9 M FCFA</strong> — pour atteindre <strong className="text-white">95/100</strong> en 12 mois.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { label: 'Score Actuel', val: '28/100', color: 'text-red-400' },
                  { label: 'Score Cible', val: '95/100', color: 'text-emerald-400' },
                  { label: 'Budget Total', val: '150,9M FCFA', color: 'text-accent-400' },
                  { label: 'ROI Projeté', val: '> 31×', color: 'text-amber-400' },
                ].map((m) => (
                  <div key={m.label} className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <div className={`text-2xl font-bold ${m.color}`}>{m.val}</div>
                    <div className="text-[10px] text-gray-400 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Progression globale</span>
                  <span className="font-bold text-white">{progressPercent}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* 6 Piliers Summary */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-stack-line text-accent-500"></i>Les 6 Piliers du Plan Correctif
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {correctivePlan.pillars.map((p) => {
                  const done = p.actions.filter(a => a.status === 'Terminé').length;
                  const total = p.actions.length;
                  const pct = Math.round((done / total) * 100);
                  return (
                    <div key={p.id} className="bg-background-50 rounded-lg border border-background-200/70 p-5 cursor-pointer hover:border-accent-300/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-foreground-700">{p.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">{p.score_initial}→{p.score_cible}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-foreground-500 mb-2">
                        <span>{done}/{total} actions</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-500 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trajectoire */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-line-chart-line text-accent-500"></i>Trajectoire vers 95/100 — Certification Big Four
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quarterlyKPIs.quarters.map((q) => (
                  <div key={q.id} className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xs text-foreground-500 mb-1">{q.label}</div>
                    <div className="text-2xl font-bold text-foreground-950">{q.target_score}</div>
                    <div className="text-[10px] text-foreground-400">Score cible</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: NOMINATIONS ============ */}
        {!loading && activeTab === 'nominations' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <i className="ri-user-star-line text-accent-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Nominations Formelles — RSSI & RCLCB/FT</h3>
                  <p className="text-xs text-gray-400">Mandats validés par le COMEX — 24 Juin 2026</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">2/2</div>
                  <div className="text-[10px] text-gray-400">Postes Pourvus</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-accent-400">{nominatedOfficers.reduce((s, o) => s + o.team_size, 0)}</div>
                  <div className="text-[10px] text-gray-400">Effectif Total</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">{nominatedOfficers.reduce((s, o) => s + o.budget_annual, 0).toLocaleString('fr-FR')} FCFA</div>
                  <div className="text-[10px] text-gray-400">Budget Annuel</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-teal-400">15 Juil.</div>
                  <div className="text-[10px] text-gray-400">Entrée en Fonction</div>
                </div>
              </div>
            </div>

            {nominatedOfficers.map((officer) => (
              <div key={officer.id} className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
                <div
                  onClick={() => setExpandedOfficer(expandedOfficer === officer.id ? null : officer.id)}
                  className="p-5 cursor-pointer hover:bg-background-100/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-foreground-950 text-background-50 text-lg font-bold">
                        {officer.nominee.split(' ').filter((_, i) => i === 0 || i === 1).map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold">{officer.priorite}</span>
                        <h3 className="text-base font-bold text-foreground-950 mt-1.5">{officer.role}</h3>
                        <p className="text-sm text-foreground-600">{officer.nominee}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium">{officer.reporting_line}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">{officer.status}</span>
                        </div>
                      </div>
                    </div>
                    <i className={`ri-${expandedOfficer === officer.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400 mt-2`}></i>
                  </div>
                </div>

                {expandedOfficer === officer.id && (
                  <div className="px-5 pb-5 border-t border-background-200/70 pt-5 space-y-5">
                    <div>
                      <h4 className="text-xs font-bold text-foreground-700 mb-2">Profil</h4>
                      <p className="text-sm text-foreground-600">{officer.profile}</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <span className="text-[10px] text-foreground-400">Date de nomination</span>
                        <p className="text-sm font-bold text-foreground-950">{officer.appointment_date}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-foreground-400">Entrée en fonction</span>
                        <p className="text-sm font-bold text-foreground-950">{officer.effective_date}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-foreground-400">Durée du mandat</span>
                        <p className="text-sm font-bold text-foreground-950">{officer.mandate_duration}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-foreground-400">Budget annuel</span>
                        <p className="text-sm font-bold text-foreground-950">{officer.budget_annual.toLocaleString('fr-FR')} FCFA</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground-700 mb-2">Qualifications</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {officer.key_qualifications.map((q, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">{q}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground-700 mb-2">Périmètre de Responsabilité</h4>
                      <ul className="space-y-1.5">
                        {officer.scope.map((s, i) => (
                          <li key={i} className="text-sm text-foreground-600 flex items-start gap-2">
                            <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0 text-xs"></i>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground-700 mb-2">KPIs Individuels</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {officer.kpis.map((kpi, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-background-100 rounded-lg">
                            <span className="text-xs text-foreground-600">{kpi.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground-950">{kpi.current}</span>
                              <i className="ri-arrow-right-line text-foreground-400 text-xs"></i>
                              <span className="text-xs font-bold text-emerald-600">{kpi.target}</span>
                              <span className="text-[10px] text-foreground-400">{kpi.deadline}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ============ TAB: COMITÉS D'AUDIT ============ */}
        {!loading && activeTab === 'committees' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                  <i className="ri-organization-chart text-teal-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">4 Comités d'Audit — Constitution Formelle</h3>
                  <p className="text-xs text-gray-400">Chartes adoptées le 26 Juin 2026 — COMEX</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-teal-400">4/4</div>
                  <div className="text-[10px] text-gray-400">Comités Constitués</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">{auditCommittees.reduce((s, c) => s + c.members, 0)}</div>
                  <div className="text-[10px] text-gray-400">Membres</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">4</div>
                  <div className="text-[10px] text-gray-400">Présidents</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-accent-400">22</div>
                  <div className="text-[10px] text-gray-400">Réunions/an</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditCommittees.map((com) => (
                <div key={com.id} className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
                  <div
                    onClick={() => setExpandedCommittee(expandedCommittee === com.id ? null : com.id)}
                    className="p-5 cursor-pointer hover:bg-background-100/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">{com.charter_status}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium">{com.frequency}</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950">{com.name} <span className="text-xs text-foreground-400">({com.acronym})</span></h3>
                        <p className="text-xs text-foreground-500 mt-1">Président : <strong className="text-foreground-700">{com.chairman.split('—')[0].trim()}</strong></p>
                        <p className="text-xs text-foreground-400">{com.members} membres · Prochaine : {com.next_meeting}</p>
                      </div>
                      <i className={`ri-${expandedCommittee === com.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400 mt-2`}></i>
                    </div>
                  </div>

                  {expandedCommittee === com.id && (
                    <div className="px-5 pb-5 border-t border-background-200/70 pt-5 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-foreground-700 mb-2">Composition</h4>
                        <div className="space-y-2">
                          {com.composition.map((m, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-background-100 rounded-lg">
                              <div>
                                <span className="text-sm font-medium text-foreground-950">{m.name}</span>
                                <span className="text-[10px] text-foreground-400 ml-2">{m.expertise}</span>
                              </div>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{m.role}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground-700 mb-2">Responsabilités</h4>
                        <ul className="space-y-1.5">
                          {com.responsibilities.map((r, i) => (
                            <li key={i} className="text-sm text-foreground-600 flex items-start gap-2">
                              <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0 text-xs"></i>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-foreground-400">
                        <span>Charte : <strong className="text-foreground-600">{com.charter_reference}</strong></span>
                        <span>Version : <strong className="text-foreground-600">{com.charter_version}</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ TAB: CHARTES & MANDATS ============ */}
        {!loading && activeTab === 'charters' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <i className="ri-scales-3-line text-emerald-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Chartes & Mandats Formels — {formalCharters.length} Documents</h3>
                  <p className="text-xs text-gray-400">{formalCharters.filter(c => c.status.includes('Adopt')).length}/{formalCharters.length} adoptés — COMEX · AG</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">{formalCharters.length}</div>
                  <div className="text-[10px] text-gray-400">Documents</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-accent-400">{formalCharters.reduce((s, c) => s + c.pages, 0)}</div>
                  <div className="text-[10px] text-gray-400">Pages Cumulées</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">4</div>
                  <div className="text-[10px] text-gray-400">Comités Couverts</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-teal-400">{new Set(formalCharters.map(c => c.approved_by)).size}</div>
                  <div className="text-[10px] text-gray-400">Organes Approbateurs</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formalCharters.map((c) => (
                <div key={c.id} className="bg-background-50 rounded-lg border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">{c.status}</span>
                      <h3 className="text-sm font-bold text-foreground-950 mt-2">{c.title}</h3>
                    </div>
                    <span className="text-[10px] text-foreground-400 font-mono">{c.reference}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div>
                      <span className="text-foreground-400">Comité</span>
                      <p className="font-medium text-foreground-700">{c.committee}</p>
                    </div>
                    <div>
                      <span className="text-foreground-400">Adoption</span>
                      <p className="font-medium text-foreground-700">{c.adoption_date}</p>
                    </div>
                    <div>
                      <span className="text-foreground-400">Version</span>
                      <p className="font-medium text-foreground-700">{c.version} · {c.pages}p</p>
                    </div>
                    <div>
                      <span className="text-foreground-400">Approbation</span>
                      <p className="font-medium text-foreground-700">{c.approved_by}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-foreground-400 block mb-1.5">Référentiels</span>
                    <div className="flex flex-wrap gap-1">
                      {c.regulatory_refs.map((ref, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{ref}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ TAB: PLAN CORRECTIF ============ */}
        {!loading && activeTab === 'corrective' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <i className="ri-tools-line text-red-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Plan Correctif Big Four — {totalActions} Actions · 6 Piliers</h3>
                  <p className="text-xs text-gray-400">Budget : {correctivePlan.budget_total} · Timeline : {correctivePlan.timeline} · ROI : {correctivePlan.roi_projete}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">{completedActions}</div>
                  <div className="text-[10px] text-gray-400">Terminées</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">{gouvernanceStats.actions_in_progress}</div>
                  <div className="text-[10px] text-gray-400">En Cours</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-blue-400">{gouvernanceStats.actions_planned}</div>
                  <div className="text-[10px] text-gray-400">Planifiées</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-red-400">{criticalActions}</div>
                  <div className="text-[10px] text-gray-400">Critiques (P0)</div>
                </div>
              </div>
            </div>

            {correctivePlan.pillars.map((pillar) => (
              <div key={pillar.id} className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
                <div
                  onClick={() => setExpandedPillar(expandedPillar === pillar.id ? null : pillar.id)}
                  className="p-5 cursor-pointer hover:bg-background-100/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-foreground-950">{pillar.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">Score : {pillar.score_initial} → {pillar.score_cible}</span>
                      </div>
                      <p className="text-xs text-foreground-500">
                        {pillar.actions.filter(a => a.status === 'Terminé').length}/{pillar.actions.length} actions ·
                        {pillar.actions.filter(a => a.priorite.includes('P0')).length} critiques
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 bg-background-200/70 rounded-full overflow-hidden hidden sm:block">
                        <div className="h-full bg-accent-500 rounded-full" style={{ width: `${Math.round((pillar.actions.filter(a => a.status === 'Terminé').length / pillar.actions.length) * 100)}%` }}></div>
                      </div>
                      <i className={`ri-${expandedPillar === pillar.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400`}></i>
                    </div>
                  </div>
                </div>

                {expandedPillar === pillar.id && (
                  <div className="px-5 pb-5 border-t border-background-200/70 pt-5">
                    <div className="space-y-2">
                      {pillar.actions.map((a) => (
                        <div key={a.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-background-100 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-bold ${getPriorityBadge(a.priorite)}`}>{a.priorite}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${getStatusBadge(a.status)}`}>{a.status}</span>
                            </div>
                            <p className="text-sm text-foreground-700">{a.action}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[10px] text-foreground-400">
                              <span><i className="ri-user-line mr-1"></i>{a.responsable}</span>
                              <span><i className="ri-calendar-line mr-1"></i>{a.deadline}</span>
                              <span className="font-medium text-foreground-600">{a.budget}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-[10px] text-foreground-400">KPI</span>
                            <p className="text-xs font-medium text-foreground-700">{a.kpi}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ============ TAB: KPIs TRIMESTRIELS ============ */}
        {!loading && activeTab === 'kpis' && (
          <div className="space-y-6">
            {/* Quarter Selector */}
            <div className="flex flex-wrap gap-2">
              {quarterlyKPIs.quarters.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuarter(q.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    selectedQuarter === q.id
                      ? 'bg-foreground-950 text-background-50'
                      : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                  }`}
                >
                  {q.label} — Score cible {q.target_score}/100
                </button>
              ))}
            </div>

            {selectedQuarterData && (
              <>
                <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                      <i className="ri-focus-3-line text-accent-400 text-lg"></i>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold">{selectedQuarterData.label}</h3>
                      <p className="text-xs text-gray-400">{selectedQuarterData.months} · Budget : {selectedQuarterData.budget} · Score cible : {selectedQuarterData.target_score}/100</p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-gray-300 mb-3">Jalons Clés</h4>
                    <ul className="space-y-2">
                      {selectedQuarterData.milestones.map((m, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                          <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-300 mb-3">KPIs Cibles</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedQuarterData.kpi_targets.map((kpi, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/8 rounded-lg border border-white/10">
                          <div>
                            <span className="text-xs text-gray-300">{kpi.name}</span>
                            <span className="text-[10px] text-gray-500 ml-2">(Poids {kpi.weight})</span>
                          </div>
                          <span className="text-xs font-bold text-white">{kpi.target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Summary Trajectory Table */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 overflow-x-auto">
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-line-chart-line text-accent-500"></i>Trajectoire Consolidée — 7 KPIs Gouvernance
              </h3>
              <table className="w-full text-sm">
                <thead className="bg-background-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">KPI</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Initial</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Q3 2026</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Q4 2026</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Q1 2027</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Q2 2027</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Cible</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyKPIs.summary_kpis.map((kpi) => (
                    <tr key={kpi.name} className="border-t border-background-100">
                      <td className="px-4 py-3 text-xs font-bold text-foreground-950">{kpi.name}</td>
                      <td className="px-3 py-3 text-center">
                        <span className="text-xs font-bold text-red-600">{kpi.initial}</span>
                      </td>
                      {['q3', 'q4', 'q1', 'q2'].map((q) => (
                        <td key={q} className="px-3 py-3 text-center">
                          <span className={`text-xs font-bold ${(kpi as any)[q] >= (kpi as any).cible ? 'text-emerald-600' : (kpi as any)[q] >= 80 ? 'text-amber-600' : 'text-foreground-600'}`}>{(kpi as any)[q]}</span>
                        </td>
                      ))}
                      <td className="px-3 py-3 text-center">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{kpi.cible}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============ TAB: CALENDRIER ============ */}
        {!loading && activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                  <i className="ri-calendar-schedule-line text-teal-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Calendrier des Comités — Juillet 2026 → Juin 2027</h3>
                  <p className="text-xs text-gray-400">{quarterlyCommitteeCalendar.reduce((s, m) => s + m.meetings.length, 0)} réunions planifiées sur 12 mois — 4 comités</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-teal-400">{quarterlyCommitteeCalendar.reduce((s, m) => s + m.meetings.length, 0)}</div>
                  <div className="text-[10px] text-gray-400">Réunions/an</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">CRC</div>
                  <div className="text-[10px] text-gray-400">Comité le + Actif (12/an)</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">CA</div>
                  <div className="text-[10px] text-gray-400">Comité d'Audit (4/an)</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-accent-400">Q3 2026</div>
                  <div className="text-[10px] text-gray-400">Prochaine Période Active</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quarterlyCommitteeCalendar.map((m) => (
                <div key={m.month} className="bg-background-50 rounded-lg border border-background-200/70 p-4">
                  <h4 className="text-sm font-bold text-foreground-950 mb-3">{m.month}</h4>
                  {m.meetings.length === 0 ? (
                    <p className="text-xs text-foreground-400 italic">Aucune réunion</p>
                  ) : (
                    <div className="space-y-2">
                      {m.meetings.map((mtg, i) => {
                        const committee = auditCommittees.find(c => c.acronym === mtg.committee);
                        const colors: Record<string, string> = {
                          'CA': 'bg-emerald-100 text-emerald-700 border-emerald-200',
                          'CESG': 'bg-accent-100 text-accent-700 border-accent-200',
                          'CRC': 'bg-amber-100 text-amber-700 border-amber-200',
                          'CRN': 'bg-secondary-100 text-secondary-700 border-secondary-200',
                        };
                        return (
                          <div key={i} className={`p-2 rounded-lg border ${colors[mtg.committee] || 'bg-background-100 text-foreground-600 border-background-200'}`}>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold">{committee?.name || mtg.committee}</span>
                              <span className="text-[10px] font-mono">{mtg.date}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer KPIs Bar */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Maturité Cible — Gouvernance Formalisée</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Nominations</span>
                <span className="text-xs font-bold text-emerald-600">100%</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Comités</span>
                <span className="text-xs font-bold text-emerald-600">100%</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Chartes</span>
                <span className="text-xs font-bold text-emerald-600">100%</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Plan Correctif</span>
                <span className="text-xs font-bold text-amber-600">{progressPercent}%</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





