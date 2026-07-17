import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { usePlanConsolidationMasterView } from '@/hooks/usePlanConsolidationMasterView';

// ================================================================
// CONSTANTS
// ================================================================
const phaseColorBgs: Record<string, string> = {
  red: 'bg-red-50 border-red-200',
  amber: 'bg-amber-50 border-amber-200',
  cyan: 'bg-cyan-50 border-cyan-200',
  emerald: 'bg-emerald-50 border-emerald-200',
  purple: 'bg-purple-50 border-purple-200',
  orange: 'bg-orange-50 border-orange-200',
  blue: 'bg-blue-50 border-blue-200',
  rose: 'bg-rose-50 border-rose-200',
};

const phaseColorTexts: Record<string, string> = {
  red: 'text-red-700',
  amber: 'text-amber-700',
  cyan: 'text-cyan-700',
  emerald: 'text-emerald-700',
  purple: 'text-purple-700',
  orange: 'text-orange-700',
  blue: 'text-blue-700',
  rose: 'text-rose-700',
};

// ================================================================
// MAIN PAGE
// ================================================================
export default function KosPlanConsolidationMasterViewPage() {
  const navigate = useNavigate();
  const data = usePlanConsolidationMasterView();

  return (
    <KOSHubLayout hubId={108}>
      <SeoHead
        title="KOS Plan Consolidation Master View™ — Trajectoire 76→120, 8 Phases, 63 Chantiers | KHEPRA EXPERTS"
        description="Dashboard unifié du Plan Consolidation KOS — 8 phases côte à côte, trajectoire 76→120, 63 chantiers, 300 actions, 16 semaines, 280,4M FCFA. Consortium PwC · Deloitte · EY · KPMG. AAAA Big Four Supreme 100%. PRODUCTION LIVE."
        keywords="KOS Plan Consolidation, Master View, 76→120, 8 phases, Big Four, KHEPRA EXPERTS, dashboard unifié, trajectoire, consolidation, production live"
        canonicalPath="/kos-plan-consolidation-master-view"
      />

      {/* ================================================================ */}
      {/* HERO — TRAJECTOIRE COMPLÈTE 76→120 — PRODUCTION LIVE              */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background-50 border-b border-background-200">
        <div className="absolute inset-0 opacity-[0.04]">
          <img src="https://readdy.ai/api/search-image?query=grand%20panoramic%20visualization%20of%20a%20cosmic%20timeline%20showing%20interconnected%20golden%20nodes%20and%20arcs%20representing%208%20strategic%20phases%20rising%20from%2076%20to%20120%20across%20a%20vast%20dark%20starfield%20with%20warm%20amber%20and%20rose%20glowing%20connections%20between%20milestone%20points%20minimalist%20data%20visualization%20aesthetic%20abstract%20geometric%20constellation&width=1920&height=600&seq=kos-master-view-hero-2026&orientation=landscape" alt="" className="w-full h-full object-cover object-center" width="1920" height="600" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/90 via-foreground-950/95 to-background-50" />

        {/* Celebration particles overlay when all live */}
        {data.allLive && (
          <div className="absolute inset-0 pointer-events-none z-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-emerald-400/30 animate-pulse"
                style={{
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18 relative z-10">
          <ScrollReveal>
            <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'KOS Dashboard', href: '/kos-dashboard' }, { label: 'Plan Consolidation Master View', href: '/kos-plan-consolidation-master-view' }]} />
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {data.allLive ? (
                  <>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600 border border-emerald-500">
                      <span className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse" />
                      <span className="text-xs font-bold text-white">PRODUCTION LIVE</span>
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-sm text-emerald-300 font-bold whitespace-nowrap">
                      <i className="ri-database-2-line text-sm" /> SUPABASE LIVE DB
                    </span>
                  </>
                ) : (
                  <>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-600 border border-amber-500">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-xs font-bold text-white">PLAN CONSOLIDATION — MASTER VIEW</span>
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-sm text-amber-300 font-bold whitespace-nowrap">
                      <i className="ri-dashboard-3-line text-sm" /> DASHBOARD UNIFIÉ
                    </span>
                  </>
                )}
                <span className="text-xs text-foreground-400">{data.allLive ? '8/8 phases LIVE · 63 chantiers · 300 actions · 16 semaines · 120 ATTEINT' : '8 phases · 63 chantiers · 300 actions · 16 semaines'}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {data.allLive ? (
                  <>Plan Consolidation : <span className="text-emerald-400">120 ATTEINT</span> — Production LIVE</>
                ) : (
                  <>Plan Consolidation : Trajectoire 76 → 120</>
                )}
              </h1>
              <p className="mt-4 text-lg text-gray-300 max-w-3xl">
                Dashboard unifié du Plan Consolidation KOS — <strong className="text-white">8 phases côte à côte</strong>, de la correction des urgences P0 à la Singularité & Legacy. Consortium PwC · Deloitte · EY · KPMG.{' '}
                {data.allLive ? (
                  <strong className="text-emerald-400">PRODUCTION LIVE — 100% COMPLÉTÉ — AAAA Big Four Supreme 100% Certified.</strong>
                ) : (
                  <strong className="text-amber-400">AAAA Big Four Supreme 100% Certified.</strong>
                )}
              </p>
            </div>

            {/* Giant Trajectory Bar */}
            <div className="mt-8 bg-foreground-950/50 border border-foreground-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-0 w-full overflow-x-auto pb-1">
                {data.masterViewPhases.map((phase: any, i: number, arr: any[]) => (
                  <div key={phase.phase_id || phase.id} className="flex items-center flex-1 min-w-[60px]">
                    <a href={phase.route} className="text-center flex-shrink-0 group cursor-pointer no-underline">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto transition-transform group-hover:scale-110 ${
                        data.allLive ? 'bg-emerald-500/30 border-2 border-emerald-400/60' : ''
                      }`}
                      style={!data.allLive ? { backgroundColor: `${phase.color}30`, border: `2px solid ${phase.color}60` } : {}}
                      >
                        {data.allLive && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-pulse border border-white" />
                        )}
                        <span className="text-white text-xs md:text-sm font-bold">{phase.score_end}</span>
                      </div>
                      <p className="text-[9px] md:text-[10px] font-bold text-white mt-1.5 whitespace-nowrap">{phase.code}</p>
                      <p className="text-[8px] md:text-[9px] text-gray-400 whitespace-nowrap">{phase.timeline_start.split(' ')[0]}</p>
                    </a>
                    {i < arr.length - 1 && (
                      <div className="flex-1 h-1.5 mx-1 rounded-full bg-foreground-800 relative overflow-hidden">
                        <div className={`h-full rounded-full ${
                          data.allLive
                            ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 w-full'
                            : `bg-gradient-to-r from-white/30 via-white/20 to-white/30`
                        }`}
                        style={!data.allLive ? { width: `${phase.status === 'in_progress' ? Math.max(phase.progress, 8) : phase.status === 'live' || phase.status === 'completed' ? 100 : 0}%` } : {}}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400">19 Juin 2026</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${data.allLive ? 'bg-emerald-400/20 text-emerald-300' : 'bg-red-400/10 text-red-400'}`}>76</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${data.allLive ? 'bg-emerald-500/30 text-emerald-300 font-heading text-sm' : 'bg-rose-400/10 text-rose-400'}`}>{data.allLive ? '✦ 120 ✦' : '120'}</span>
                  <span className="text-[10px] text-gray-400">17 Octobre 2026</span>
                </div>
              </div>
              {data.allLive && (
                <div className="mt-3 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Trajectoire complétée — Score final 120 atteint</span>
                    <i className="ri-check-double-line text-emerald-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-6">
              {[
                { label: 'Phases', value: '8/8 LIVE', icon: 'ri-stack-line', color: data.allLive ? 'text-emerald-400' : 'text-amber-400' },
                { label: 'Chantiers', value: '63', icon: 'ri-building-2-line', color: data.allLive ? 'text-emerald-400' : 'text-amber-400' },
                { label: 'Actions', value: '300', icon: 'ri-check-double-line', color: 'text-emerald-400' },
                { label: 'Budget', value: '280,4M FCFA', icon: 'ri-money-dollar-circle-line', color: data.allLive ? 'text-emerald-400' : 'text-amber-400' },
                { label: 'Durée', value: '16 semaines', icon: 'ri-calendar-line', color: 'text-secondary-400' },
                { label: 'Score Final', value: '120', icon: 'ri-trophy-line', color: 'text-emerald-400' },
              ].map((s) => (
                <div key={s.label} className="bg-foreground-950/50 border border-foreground-800/30 rounded-xl p-3 text-center backdrop-blur-sm">
                  <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg flex items-center justify-center bg-foreground-900/50">
                    <i className={`${s.icon} ${s.color} text-xs`} />
                  </div>
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-gray-400 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={data.launchMasterView} className={`flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                data.allLive ? 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30' : 'bg-amber-600 hover:bg-amber-700'
              }`}>
                <i className={data.allLive ? 'ri-database-2-line' : 'ri-dashboard-3-line'} />
                {data.allLive ? 'Dashboard LIVE — Score 120 Atteint' : 'Activer le Master View Dashboard'}
              </button>
              {data.isLive && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-300 font-semibold whitespace-nowrap">Supabase LIVE DB</span>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8 PHASE CARDS — CÔTE À CÔTE                                       */}
      {/* ================================================================ */}
      <section className="bg-background-50 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground-950">
                  {data.allLive ? 'Les 8 Phases — Production LIVE' : 'Les 8 Phases du Plan Consolidation'}
                </h2>
                <p className="text-sm text-foreground-500 mt-1">
                  {data.allLive ? '120 ATTEINT · 63 chantiers · 300 actions · 16 semaines · 280,4M FCFA' : '76 → 120 · 63 chantiers · 300 actions · 16 semaines · 280,4M FCFA'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {data.allLive ? (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> {data.phasesCompleted}/{data.masterViewStats.total_phases} LIVE
                  </span>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5 text-xs text-foreground-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" /> En cours ({data.phasesInProgress})
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-foreground-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-background-300" /> En attente ({data.phasesOpen})
                    </span>
                  </>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* 4×2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.masterViewPhases.map((phase: any) => {
              const isLive = phase.status === 'live';
              const isInProgress = phase.status === 'in_progress';
              const colorClass = phase.color_class || phase.colorClass || 'red';

              return (
              <ScrollReveal key={phase.phase_id || phase.id}>
                <a href={phase.route} className={`block rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer no-underline group ${
                  isLive ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-200' :
                  phaseColorBgs[colorClass] || 'bg-background-50 border-background-200'
                } ${isInProgress ? 'ring-1 ring-amber-300' : ''}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: isLive ? '#05966915' : `${phase.color}15` }}>
                      <i className={`${phase.icon} text-lg`} style={{ color: isLive ? '#059669' : phase.color }} />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {isLive && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold border border-emerald-400 animate-pulse whitespace-nowrap">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-1 animate-ping" />
                          LIVE
                        </span>
                      )}
                      {isInProgress && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold border border-amber-200 animate-pulse whitespace-nowrap">EN COURS</span>
                      )}
                      {phase.status === 'completed' && !isLive && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold border border-emerald-200 whitespace-nowrap">TERMINÉ</span>
                      )}
                      <span className="text-[9px] font-mono text-foreground-400">{phase.code}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-sm font-bold ${isLive ? 'text-emerald-700' : phaseColorTexts[colorClass] || 'text-foreground-700'} mb-1`}>{phase.name}</h3>
                  <p className="text-[10px] text-foreground-400 mb-3">{phase.subtitle}</p>

                  {/* Score Block */}
                  <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-white/60 border border-white/50">
                    <span className="text-xs font-bold text-foreground-600">{phase.score_start}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-background-200 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${
                        isLive ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 w-full' :
                        isInProgress ? `bg-gradient-to-r from-amber-500 to-${colorClass === 'red' ? 'red' : colorClass === 'amber' ? 'amber' : colorClass === 'cyan' ? 'cyan' : colorClass === 'emerald' ? 'emerald' : colorClass === 'purple' ? 'purple' : colorClass === 'orange' ? 'orange' : colorClass === 'blue' ? 'blue' : 'rose'}-500` :
                        phase.status === 'completed' ? 'bg-emerald-500 w-full' :
                        'bg-background-300'
                      }`}
                      style={!isLive && !isInProgress && phase.status !== 'completed' ? { width: '0%' } : isInProgress ? { width: `${Math.max(phase.progress, 8)}%` } : {}}
                      />
                    </div>
                    <span className={`text-xs font-bold ${isLive ? 'text-emerald-600' : phaseColorTexts[colorClass] || 'text-foreground-600'}`}>{phase.score_end}</span>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-foreground-600 leading-relaxed line-clamp-3 mb-3">{phase.description}</p>

                  {/* Meta chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/70 border border-white/60 text-foreground-500 font-medium whitespace-nowrap">
                      <i className="ri-building-2-line mr-0.5 text-[9px]" />{phase.chantiers} chantiers
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/70 border border-white/60 text-foreground-500 font-medium whitespace-nowrap">
                      <i className="ri-check-double-line mr-0.5 text-[9px]" />{phase.actions} actions
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/70 border border-white/60 text-foreground-500 font-medium whitespace-nowrap">
                      <i className="ri-calendar-line mr-0.5 text-[9px]" />{phase.duration}
                    </span>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/30">
                    <span className="text-[10px] text-foreground-400">{phase.timeline_start} — {phase.timeline_end}</span>
                    <span className="text-[11px] font-bold text-foreground-800">{phase.budget}</span>
                  </div>

                  {/* Key Result */}
                  <div className={`mt-3 p-2.5 rounded-lg ${isLive ? 'bg-emerald-100/60 border border-emerald-200' : 'bg-white/40 border border-white/40'}`}>
                    <p className={`text-[10px] font-semibold uppercase tracking-wider mb-0.5 ${isLive ? 'text-emerald-600' : 'text-foreground-500'}`}>Key Result</p>
                    <p className="text-[11px] text-foreground-700 leading-snug">{phase.key_result || phase.keyResult || ''}</p>
                  </div>

                  {/* Production launched date (if live) */}
                  {isLive && phase.production_launched_at && (
                    <div className="mt-3 pt-3 border-t border-emerald-200/50 flex items-center gap-2 text-[9px] text-emerald-600">
                      <i className="ri-rocket-2-line" />
                      <span>Déployé le {new Date(phase.production_launched_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  )}
                </a>
              </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* BUDGET SUMMARY — VENTILATION PAR PHASE                            */}
      {/* ================================================================ */}
      <section className="bg-background-100 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground-950 mb-8">Budget Consolidé — 280 400 000 FCFA</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-background-50 border border-background-200 rounded-2xl p-6 overflow-x-auto">
              <div className="flex items-end gap-3 h-48 min-w-[700px] px-2">
                {data.masterViewBudget.breakdown.map((item: any, i: number) => {
                  const maxAmount = 62000000;
                  const height = (item.amountNum / maxAmount) * 100;
                  const phase = data.masterViewPhases[i];
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 min-w-[60px]">
                      <span className="text-[9px] font-bold text-foreground-600">{item.amount.split(' ')[0]}</span>
                      <div className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer" style={{ backgroundColor: data.allLive ? '#059669' : phase?.color || '#DC2626', height: `${Math.max(height, 8)}%`, opacity: data.allLive ? 1 : phase?.status === 'in_progress' ? 1 : phase?.status === 'live' || phase?.status === 'completed' ? 1 : 0.3 }} />
                      <span className="text-[10px] font-bold text-foreground-500 whitespace-nowrap">{phase?.code || ''}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-background-200">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-background-200">
                      <th className="text-left py-2 text-foreground-400 font-semibold">Phase</th>
                      <th className="text-right py-2 text-foreground-400 font-semibold w-36">Budget</th>
                      <th className="text-center py-2 text-foreground-400 font-semibold w-24">Chantiers</th>
                      <th className="text-center py-2 text-foreground-400 font-semibold w-24">Actions</th>
                      <th className="text-center py-2 text-foreground-400 font-semibold w-32">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.masterViewPhases.map((phase: any) => {
                      const isLivePhase = phase.status === 'live';
                      return (
                      <tr key={phase.phase_id || phase.id} className="border-b border-background-100 hover:bg-background-100/50 transition-colors cursor-pointer" onClick={() => navigate(phase.route)}>
                        <td className="py-2.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${isLivePhase ? 'bg-emerald-500 animate-pulse' : ''}`} style={!isLivePhase ? { backgroundColor: phase.color } : {}} />
                            <span className="font-medium text-foreground-800">{phase.code} — {phase.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 text-right font-bold text-foreground-800">{phase.budget}</td>
                        <td className="py-2.5 text-center text-foreground-600">{phase.chantiers}</td>
                        <td className="py-2.5 text-center text-foreground-600">{phase.actions}</td>
                        <td className="py-2.5 text-center">
                          {isLivePhase && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold border border-emerald-400 animate-pulse whitespace-nowrap">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-1 animate-ping" />
                              LIVE
                            </span>
                          )}
                          {phase.status === 'in_progress' && <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold whitespace-nowrap">EN COURS</span>}
                          {phase.status === 'completed' && !isLivePhase && <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold whitespace-nowrap">TERMINÉ</span>}
                          {phase.status === 'open' && <span className="text-[9px] px-2 py-0.5 rounded-full bg-background-200 text-foreground-500 font-bold whitespace-nowrap">EN ATTENTE</span>}
                        </td>
                      </tr>
                    );})}
                    <tr className="border-t-2 border-foreground-300">
                      <td className="py-2.5 font-bold text-foreground-950">TOTAL</td>
                      <td className="py-2.5 text-right font-bold text-foreground-950">{data.masterViewBudget.total}</td>
                      <td className="py-2.5 text-center font-bold text-foreground-950">{data.masterViewAggregatedStats.total_chantiers}</td>
                      <td className="py-2.5 text-center font-bold text-foreground-950">{data.masterViewAggregatedStats.total_actions}</td>
                      <td className="py-2.5 text-center">
                        {data.allLive ? (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold animate-pulse whitespace-nowrap">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-1 animate-ping" />
                            8/8 LIVE
                          </span>
                        ) : (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold whitespace-nowrap">{data.phasesInProgress}/{data.masterViewStats.total_phases} actives</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TIMELINE — 16 SEMAINES                                            */}
      {/* ================================================================ */}
      <section className="bg-background-50 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground-950 mb-8">
              {data.allLive ? 'Timeline — 16 Semaines — PRODUCTION COMPLÉTÉE' : 'Timeline — 16 Semaines — 19 Juin → 17 Octobre 2026'}
            </h2>
            {data.allLive && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-700">Toutes les phases sont en production — 120 ATTEINT</span>
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative">
              <div className={`absolute left-5 top-0 bottom-0 w-0.5 ${data.allLive ? 'bg-emerald-300' : 'bg-background-200'}`} />
              <div className="space-y-4">
                {data.masterViewTimeline.phases.map((phaseTimeline: any, i: number) => {
                  const phase = data.masterViewPhases[i];
                  const isLivePhase = phase?.status === 'live';
                  const isActive = !data.allLive && phase?.status === 'in_progress';
                  const isPast = phase?.status === 'completed' || isLivePhase;
                  return (
                    <a key={i} href={phase?.route || '#'} className="relative flex items-start gap-4 pl-2 group cursor-pointer no-underline block">
                      <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${
                        isLivePhase ? 'bg-emerald-500 border-emerald-400 ring-2 ring-emerald-200' :
                        isActive ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-200' :
                        isPast ? 'bg-emerald-100 border-emerald-400' :
                        'bg-background-100 border-background-300'
                      }`}>
                        <i className={`${phaseTimeline.icon} text-sm ${
                          isLivePhase ? 'text-white' :
                          isActive ? 'text-amber-600' :
                          isPast ? 'text-emerald-600' :
                          'text-foreground-400'
                        }`} />
                        {isLivePhase && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-300 animate-pulse border border-white" />
                        )}
                      </div>
                      <div className={`flex-1 min-w-0 rounded-xl p-4 transition-all group-hover:shadow-sm ${
                        isLivePhase ? 'bg-emerald-50 border border-emerald-200' :
                        'bg-background-50 border border-background-200 group-hover:border-background-300'
                      }`}>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs font-bold ${isLivePhase ? 'text-emerald-700' : isActive ? 'text-amber-600' : 'text-foreground-600'}`}>{phaseTimeline.label}</span>
                          {isLivePhase && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold animate-pulse whitespace-nowrap">
                              <span className="inline-block w-1 h-1 rounded-full bg-white mr-0.5 animate-ping" />
                              LIVE
                            </span>
                          )}
                          {isActive && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold animate-pulse whitespace-nowrap">ACTIF</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-foreground-500 flex-wrap">
                          <span><i className="ri-calendar-line mr-1 text-xs" />{phaseTimeline.start} → {phaseTimeline.end}</span>
                          <span><i className="ri-building-2-line mr-1 text-xs" />{phase?.chantiers || '?'} chantiers</span>
                          <span><i className="ri-check-double-line mr-1 text-xs" />{phase?.actions || '?'} actions</span>
                          <span><i className="ri-money-dollar-circle-line mr-1 text-xs" />{phase?.budget || ''}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-20 text-right pt-2">
                        <div className="flex items-center gap-1 justify-end">
                          <span className="text-[11px] font-bold text-foreground-500">{phase?.score_start || '?'}</span>
                          <i className="ri-arrow-right-line text-foreground-300 text-[10px]" />
                          <span className={`text-[11px] font-bold ${isLivePhase ? 'text-emerald-600' : isActive ? 'text-amber-600' : 'text-foreground-500'}`}>{phase?.score_end || '?'}</span>
                        </div>
                        <span className={`text-[9px] font-bold ${isLivePhase ? 'text-emerald-600' : 'text-emerald-600'}`}>+{phase?.delta || '?'}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* COMMANDER'S INTENT FOOTER                                         */}
      {/* ================================================================ */}
      <section className={`border-t ${data.allLive ? 'bg-emerald-950 border-emerald-800' : 'bg-foreground-950 border-foreground-800'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${data.allLive ? 'bg-emerald-600' : 'bg-amber-600'}`}>
              <i className={`text-white text-lg ${data.allLive ? 'ri-rocket-2-line' : 'ri-dashboard-3-line'}`} />
            </div>
            <div className="flex-1">
              <p className={`text-xs font-semibold uppercase tracking-wider ${data.allLive ? 'text-emerald-300' : 'text-amber-300'}`}>
                {data.allLive ? 'PRODUCTION LIVE — Plan Consolidation Complété' : "Commander's Intent — Plan Consolidation"}
              </p>
              <p className="text-sm text-gray-300 mt-0.5">{data.masterViewStats.commander_intent}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className={`text-lg font-bold ${data.allLive ? 'text-emerald-400' : 'text-white'}`}>{data.globalProgress}%</p>
              <p className={`text-[10px] ${data.allLive ? 'text-emerald-300' : 'text-amber-300'}`}>Progression Globale</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TOAST                                                             */}
      {/* ================================================================ */}
      {data.toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className={`px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 ${data.allLive ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
            <i className={`text-lg ${data.allLive ? 'ri-rocket-2-line' : 'ri-dashboard-3-line'}`} />
            <span className="text-sm font-medium">{data.toast}</span>
          </div>
        </div>
      )}
    </KOSHubLayout>
  );
}