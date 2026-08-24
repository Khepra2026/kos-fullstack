import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useTransformationProgram } from '@/hooks/useTransformationProgram';
import type { TransformationBlock } from '@/mocks/transformationProgram2028';

type TabView = 'overview' | 'phases' | 'blocks' | 'kpis' | 'gantt';

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-xs font-bold text-foreground-950">{value}</span>
    </div>
  );
}

function ProgressBar({ value, max = 100, color = 'primary', label, showPct = true }: { value: number; max?: number; color?: string; label?: string; showPct?: boolean }) {
  const pct = Math.round((value / max) * 100);
  const barColor = color === 'accent' ? 'bg-accent-500' : color === 'secondary' ? 'bg-secondary-500' : 'bg-primary-500';
  return (
    <div className="w-full">
      {(label || showPct) && <div className="flex justify-between text-xs text-foreground-600 mb-1">{label && <span>{label}</span>}{showPct && <span>{pct}%</span>}</div>}
      <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    in_progress: 'bg-amber-100 text-amber-700 border-amber-200',
    planned: 'bg-background-200 text-foreground-500 border-background-200',
    'Phase 1': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Phase 2': 'bg-amber-50 text-amber-700 border-amber-200',
    'Phase 3': 'bg-purple-50 text-purple-700 border-purple-200',
    'Phase 4': 'bg-red-50 text-red-700 border-red-200',
    Critique: 'bg-red-100 text-red-700 border-red-200',
    Haute: 'bg-amber-50 text-amber-700 border-amber-200',
    Moyenne: 'bg-secondary-100 text-secondary-600 border-secondary-200',
    'Phase 1 — Fondations': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Phase 2 — Acquisition': 'bg-amber-50 text-amber-700 border-amber-200',
    'Phase 3 — Autorité': 'bg-purple-50 text-purple-700 border-purple-200',
    'Phase 4 — Industrialisation': 'bg-red-50 text-red-700 border-red-200',
  };
  const statusBgMap: Record<string, string> = {
    '100%': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    '0': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  const classes = bgMap[variant] || statusBgMap[variant] || 'bg-background-200 text-foreground-700 border-background-200';
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${classes}`}>{label}</span>;
}

function formatFCFA(val: number): string {
  if (val >= 1) return `${val} Md`;
  return `${val}`;
}

export default function transformationProgramPage() {
  const { blocks, phases, kpis, globalMetrics, isLive, loading, error, refetch } = useTransformationProgram();
  const [activeTab, setActiveTab] = useState<TabView>('overview');
  const [selectedBlock, setSelectedBlock] = useState<TransformationBlock | null>(null);
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<number | null>(null);

  const tabs = [
    { id: 'overview' as TabView, label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line' },
    { id: 'phases' as TabView, label: '4 Phases', icon: 'ri-road-map-line' },
    { id: 'blocks' as TabView, label: '13 Blocs', icon: 'ri-stack-line' },
    { id: 'kpis' as TabView, label: 'KPIs', icon: 'ri-bar-chart-2-line' },
    { id: 'gantt' as TabView, label: 'Timeline', icon: 'ri-calendar-line' },
  ];

  const filteredBlocks = selectedPhaseFilter ? blocks.filter(b => b.phase === selectedPhaseFilter) : blocks;

  if (loading) {
    return (
      <hubLayout hubId={67} activeTab="overview" tabLabel="Transformation Program">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
              <span className="text-sm">Chargement du Master Plan...</span>
            </div>
          </div>
        </div>
      </hubLayout>
    );
  }

  if (error && blocks.length === 0) {
    return (
      <hubLayout hubId={67} activeTab="overview" tabLabel="Transformation Program">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <i className="ri-error-warning-line text-xl"></i>
            </div>
            <p className="text-sm text-red-700 font-medium">Erreur de chargement</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-1.5"></i>Réessayer
            </button>
          </div>
        </div>
      </hubLayout>
    );
  }

  const phaseStatusLabel = (status: string) => {
    if (status === 'completed') return 'Terminée';
    if (status === 'in_progress') return 'En cours';
    return 'Planifiée';
  };

  const blockStatusLabel = (status: string) => {
    if (status === 'completed') return 'Terminé';
    if (status === 'in_progress') return 'En cours';
    return 'Planifié';
  };

  return (
    <hubLayout hubId={67} activeTab={activeTab} tabLabel={tabs.find(t => t.id === activeTab)?.label}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">MASTER PLAN BIG FOUR</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Phase 2/4 — Acquisition</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5 ${isLive ? 'bg-emerald-100 text-emerald-700' : 'bg-background-200/70 text-foreground-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-foreground-400'}`}></span>
              {isLive ? 'LIVE DB' : 'Mode MOCK'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">KOS Transformation Program 2026–2028™</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            Feuille de route d'exécution stratégique pour hisser KHEPRA Experts au niveau des standards Big Four.
            13 blocs, 4 phases, 24 mois. Objectif : Top 3 Afrique francophone, référence IA, 1 000+ ressources, 10 000+ pages, 100+ partenariats.
          </p>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Blocs</p>
            <span className="text-xl font-bold text-foreground-950">{globalMetrics.blocksCompleted}<span className="text-sm font-normal text-foreground-500">/{globalMetrics.totalBlocks}</span></span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-checkbox-circle-fill text-xs"></i>{globalMetrics.blocksInProgress} en cours</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Phases</p>
            <span className="text-xl font-bold text-foreground-950">{globalMetrics.phasesCompleted}<span className="text-sm font-normal text-foreground-500">/4</span></span>
            <div className="flex items-center gap-1 text-xs text-amber-600"><i className="ri-timer-line text-xs"></i>3 en cours</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Global</p>
            <span className="text-xl font-bold text-foreground-950">{globalMetrics.scoreGlobal}<span className="text-sm font-normal text-foreground-500">/100</span></span>
            <div className="flex items-center gap-1 text-xs text-primary-600"><i className="ri-arrow-up-line text-xs"></i>Cible 95</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Documents</p>
            <span className="text-xl font-bold text-foreground-950">50K</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-checkbox-circle-fill text-xs"></i>Cible atteinte</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Experts</p>
            <span className="text-xl font-bold text-foreground-950">428<span className="text-sm font-normal text-foreground-500">/500</span></span>
            <div className="flex items-center gap-1 text-xs text-amber-600"><i className="ri-timer-line text-xs"></i>En progression</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Pipeline</p>
            <span className="text-xl font-bold text-foreground-950">3.77<span className="text-sm font-normal text-foreground-500"> Md</span></span>
            <div className="flex items-center gap-1 text-xs text-amber-600"><i className="ri-funds-line text-xs"></i>Cible 5 Md</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); setSelectedBlock(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${
                activeTab === t.id
                  ? 'bg-primary-500 text-background-50 border-primary-500'
                  : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'
              }`}
            >
              <i className={`${t.icon} text-sm`}></i>
              {t.label}
            </button>
          ))}
        </div>

        {/* ============================================ */}
        {/* VUE D'ENSEMBLE */}
        {/* ============================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Score Global + Cibles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-crosshair-line text-accent-500"></i>Résultat Cible à 24 Mois</h3>
                <div className="space-y-2.5">
                  {[
                    { icon: 'ri-global-line', label: 'Top 3 Afrique francophone — requêtes BCEAO/UEMOA/OHADA', color: 'text-emerald-600' },
                    { icon: 'ri-robot-2-line', label: 'Référence IA (ChatGPT, Gemini, Claude, Perplexity)', color: 'text-accent-600' },
                    { icon: 'ri-pages-line', label: '1 000+ ressources expertes indexées', color: 'text-primary-600' },
                    { icon: 'ri-file-text-line', label: '10 000+ pages de connaissances structurées', color: 'text-secondary-600' },
                    { icon: 'ri-team-line', label: '100+ partenariats stratégiques', color: 'text-purple-600' },
                    { icon: 'ri-cpu-line', label: '1 système KOS 100% piloté par agents spécialisés', color: 'text-amber-600' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <i className={`${item.icon} ${item.color} mt-0.5`}></i>
                      <span className="text-foreground-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-radar-line text-primary-500"></i>Progression Globale</h3>
                <div className="flex items-center justify-center mb-4">
                  <CircularGauge value={Math.round(globalMetrics.scoreGlobal)} size={120} strokeWidth={8} color="primary" />
                </div>
                <div className="text-center mb-3">
                  <p className="text-2xl font-bold text-foreground-950">{globalMetrics.scoreGlobal}<span className="text-sm font-normal text-foreground-500">/100</span></p>
                  <p className="text-xs text-foreground-500 mt-0.5">Score de Transformation Global</p>
                </div>
                <div className="space-y-2">
                  <ProgressBar value={globalMetrics.blocksCompleted} max={globalMetrics.totalBlocks} label="Blocs Complétés" color="primary" />
                  <ProgressBar value={globalMetrics.phasesCompleted} max={4} label="Phases Complétées" color="accent" />
                </div>
              </div>
            </div>

            {/* Synthèse par Phase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {phases.map((phase) => (
                <div key={phase.id} className={`bg-background-50 border rounded-lg p-4 ${phase.status === 'completed' ? 'border-emerald-200/60 bg-emerald-50/20' : phase.status === 'in_progress' ? 'border-amber-200/60 bg-amber-50/20' : 'border-background-200/60'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${phase.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : phase.status === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-background-200 text-foreground-500'}`}>
                      <i className={`${phase.icon} text-sm`}></i>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground-950 leading-tight">{phase.name}</p>
                      <p className="text-[10px] text-foreground-500">{phase.duration}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {phase.blocks.map((bId) => {
                      const blk = blocks.find(b => b.id === bId);
                      return blk ? (
                        <span key={bId} className={`text-[10px] px-1.5 py-0.5 rounded-full border ${blk.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : blk.status === 'in_progress' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-background-200/60 text-foreground-500 border-background-200'}`}>
                          Bloc {blk.number}
                        </span>
                      ) : null;
                    })}
                  </div>
                  <p className="text-[11px] text-foreground-600 leading-relaxed line-clamp-3">{phase.impact}</p>
                  <div className="mt-2 pt-2 border-t border-background-200/50">
                    <Badge label={phaseStatusLabel(phase.status)} variant={phase.status} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { icon: 'ri-stack-line', label: 'Blocs Total', value: `${globalMetrics.totalBlocks}`, color: 'primary' },
                { icon: 'ri-checkbox-circle-line', label: 'Terminés', value: `${globalMetrics.blocksCompleted}`, color: 'emerald' },
                { icon: 'ri-timer-line', label: 'En Cours', value: `${globalMetrics.blocksInProgress}`, color: 'amber' },
                { icon: 'ri-calendar-line', label: 'Durée', value: '24 mois', color: 'secondary' },
                { icon: 'ri-flag-line', label: 'Phases', value: '4', color: 'accent' },
                { icon: 'ri-trophy-line', label: 'Cible Score', value: '95/100', color: 'primary' },
              ].map((stat, i) => (
                <div key={i} className="bg-background-100 rounded-lg p-3 text-center">
                  <i className={`${stat.icon} text-lg ${stat.color === 'emerald' ? 'text-emerald-600' : stat.color === 'amber' ? 'text-amber-600' : stat.color === 'accent' ? 'text-accent-600' : stat.color === 'secondary' ? 'text-secondary-600' : 'text-primary-600'}`}></i>
                  <p className="text-lg font-bold text-foreground-950">{stat.value}</p>
                  <p className="text-[10px] text-foreground-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* 4 PHASES */}
        {/* ============================================ */}
        {activeTab === 'phases' && (
          <div className="space-y-4">
            {phases.map((phase) => {
              const phaseBlocks = blocks.filter(b => b.phase === phase.id);
              const avgMaturity = Math.round(phaseBlocks.reduce((sum, b) => sum + b.maturity, 0) / phaseBlocks.length);
              return (
                <div key={phase.id} className={`bg-background-50 border rounded-lg p-5 ${phase.status === 'completed' ? 'border-emerald-200/60' : phase.status === 'in_progress' ? 'border-amber-200/60' : 'border-background-200/60'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${phase.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : phase.status === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-background-200 text-foreground-500'}`}>
                        <i className={`${phase.icon} text-lg`}></i>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground-950">{phase.name}</h3>
                        <p className="text-xs text-foreground-500">{phase.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CircularGauge value={avgMaturity} size={42} strokeWidth={4} color={phase.id === 1 ? 'primary' : phase.id === 2 ? 'accent' : phase.id === 3 ? 'secondary' : 'primary'} />
                      <Badge label={phaseStatusLabel(phase.status)} variant={phase.status} />
                    </div>
                  </div>
                  <p className="text-sm text-foreground-600 mb-4">{phase.impact}</p>
                  <div className="space-y-2">
                    {phaseBlocks.map((blk) => (
                      <div key={blk.id} className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
                        <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `${blk.color}15`, color: blk.color }}>
                          <i className={`${blk.icon} text-sm`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-foreground-950">Bloc {blk.number} — {blk.name}</span>
                            <Badge label={blockStatusLabel(blk.status)} variant={blk.status} />
                          </div>
                          <p className="text-xs text-foreground-500 line-clamp-1">{blk.objective}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold text-foreground-950">{blk.maturity}%</span>
                          <p className="text-[10px] text-foreground-500">Maturité</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================ */}
        {/* 13 BLOCS — FILTRABLE */}
        {/* ============================================ */}
        {activeTab === 'blocks' && (
          <div>
            {/* Phase Filter */}
            <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 flex-wrap">
              <button onClick={() => setSelectedPhaseFilter(null)} className={`px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap cursor-pointer transition-colors ${!selectedPhaseFilter ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
                Tous (13)
              </button>
              {phases.map(p => (
                <button key={p.id} onClick={() => setSelectedPhaseFilter(p.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap cursor-pointer transition-colors ${selectedPhaseFilter === p.id ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
                  {p.name} ({blocks.filter(b => b.phase === p.id).length})
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-3">
                {filteredBlocks.map((blk) => (
                  <div
                    key={blk.id}
                    onClick={() => setSelectedBlock(selectedBlock?.id === blk.id ? null : blk)}
                    className={`bg-background-50 border rounded-lg p-4 cursor-pointer transition-colors hover:border-background-300/80 ${selectedBlock?.id === blk.id ? 'border-primary-300/80 ring-1 ring-primary-500/20' : 'border-background-200/60'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${blk.color}15`, color: blk.color }}>
                          <i className={`${blk.icon} text-lg`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <h4 className="text-sm font-semibold text-foreground-950">Bloc {blk.number} — {blk.name}</h4>
                            <Badge label={blockStatusLabel(blk.status)} variant={blk.status} />
                            <Badge label={`Phase ${blk.phase}`} variant={`Phase ${blk.phase}`} />
                          </div>
                          <p className="text-xs text-foreground-500 line-clamp-1">{blk.objective}</p>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] text-foreground-500">
                            <span className="flex items-center gap-1"><i className="ri-calendar-line"></i>{blk.timeline}</span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1"><i className="ri-folder-chart-line"></i>{blk.deliverables.length} livrables</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <CircularGauge value={blk.maturity} size={48} strokeWidth={4} color={blk.maturity >= 95 ? 'primary' : blk.maturity >= 80 ? 'accent' : 'secondary'} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Block Detail Panel */}
              <div className="lg:col-span-1">
                {selectedBlock ? (
                  <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 sticky top-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${selectedBlock.color}15`, color: selectedBlock.color }}>
                        <i className={`${selectedBlock.icon} text-sm`}></i>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground-950">Bloc {selectedBlock.number}</h4>
                        <p className="text-xs text-foreground-500">{selectedBlock.name}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-1">Objectif</p>
                        <p className="text-xs text-foreground-700">{selectedBlock.objective}</p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-1">Description</p>
                        <p className="text-xs text-foreground-600 leading-relaxed">{selectedBlock.description}</p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-1">Livrables ({selectedBlock.deliverables.length})</p>
                        <ul className="space-y-0.5">
                          {selectedBlock.deliverables.map((d, i) => (
                            <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                              <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5 shrink-0"></i>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {selectedBlock.agents && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-1">Agents</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedBlock.agents.map((a, i) => (
                              <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{a}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedBlock.sources && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-1">Sources</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedBlock.sources.map((s, i) => (
                              <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-1">KPIs</p>
                        <div className="space-y-1.5">
                          {selectedBlock.kpis.map((kpi, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                              <span className="text-foreground-600 flex items-center gap-1">
                                <i className={`${kpi.icon} text-[10px] text-foreground-400`}></i>
                                {kpi.label}
                              </span>
                              <span className="font-semibold text-foreground-950">{kpi.value} <span className="text-foreground-400 font-normal">/ {kpi.target}</span></span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-background-200/50">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground-500">Timeline</span>
                          <span className="font-medium text-foreground-700">{selectedBlock.timeline}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="text-foreground-500">Maturité</span>
                          <span className="font-medium text-foreground-700">{selectedBlock.maturity}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-background-50 border border-background-200/60 rounded-lg p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                    <div className="w-12 h-12 rounded-full bg-background-200/70 flex items-center justify-center mb-3">
                      <i className="ri-information-line text-xl text-foreground-400"></i>
                    </div>
                    <p className="text-sm text-foreground-500 font-medium">Sélectionnez un bloc</p>
                    <p className="text-xs text-foreground-400 mt-1">Cliquez sur un bloc pour afficher ses détails</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* KPIs */}
        {/* ============================================ */}
        {activeTab === 'kpis' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {kpis.map((kpi) => {
                const pct = Math.round((kpi.current / kpi.target) * 100);
                return (
                  <div key={kpi.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}>
                          <i className={`${kpi.icon} text-sm`}></i>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{kpi.name}</h4>
                          <p className="text-[10px] text-foreground-500 uppercase">{kpi.category === 'ao_ami' ? 'AO/AMI' : kpi.category}</p>
                        </div>
                      </div>
                      <CircularGauge value={Math.min(pct, 100)} size={42} strokeWidth={4} color={pct >= 100 ? 'primary' : pct >= 80 ? 'accent' : 'secondary'} />
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-xl font-bold text-foreground-950">{typeof kpi.current === 'number' && kpi.current >= 1000 ? kpi.current.toLocaleString('fr-FR') : kpi.current}</span>
                        <span className="text-xs text-foreground-500 ml-1">{kpi.unit}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-foreground-500">Cible</span>
                        <p className="text-sm font-semibold text-foreground-700">{typeof kpi.target === 'number' && kpi.target >= 1000 ? kpi.target.toLocaleString('fr-FR') : kpi.target} {kpi.unit}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <ProgressBar value={pct} color={pct >= 100 ? 'primary' : pct >= 80 ? 'accent' : 'secondary'} showPct={false} />
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className="text-foreground-500">{pct}% atteint</span>
                      {kpi.trend > 0 && <span className="text-emerald-600 flex items-center gap-0.5"><i className="ri-arrow-up-line"></i>+{kpi.trend}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* TIMELINE GANTT */}
        {/* ============================================ */}
        {activeTab === 'gantt' && (
          <div className="space-y-4">
            {phases.map((phase) => {
              const phaseBlocks = blocks.filter(b => b.phase === phase.id);
              return (
                <div key={phase.id} className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${phase.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : phase.status === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-background-200 text-foreground-500'}`}>
                      <i className={`${phase.icon} text-sm`}></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground-950">{phase.name}</h3>
                      <p className="text-[11px] text-foreground-500">{phase.duration}</p>
                    </div>
                    <Badge label={phaseStatusLabel(phase.status)} variant={phase.status} />
                  </div>
                  <div className="space-y-2">
                    {phaseBlocks.map((blk) => (
                      <div key={blk.id} className="flex items-center gap-3">
                        <div className="w-1/5 text-xs font-semibold text-foreground-950 whitespace-nowrap">
                          Bloc {blk.number}
                        </div>
                        <div className="flex-1">
                          <div className="w-full h-6 bg-background-200 rounded-full overflow-hidden relative">
                            <div
                              className={`h-full rounded-full ${blk.status === 'completed' ? 'bg-emerald-500' : blk.status === 'in_progress' ? 'bg-amber-500' : 'bg-background-300'}`}
                              style={{ width: `${blk.maturity}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-16 text-right text-xs">
                          <span className={`font-semibold ${blk.status === 'completed' ? 'text-emerald-600' : blk.status === 'in_progress' ? 'text-amber-600' : 'text-foreground-500'}`}>{blk.maturity}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Timeline Chronologique */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-timeline-view text-accent-500"></i>
                Chronologie 24 Mois — KOS Transformation Program 2026–2028
              </h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-background-200"></div>

                {/* Phase 1 */}
                <div className="relative pl-10 pb-6">
                  <div className="absolute left-2.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-100"></div>
                  <div className="bg-emerald-50/40 border border-emerald-200/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-emerald-800">Phase 1 — Fondations</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">0–90 jours</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Juin–Août 2026</span>
                    </div>
                    <p className="text-xs text-emerald-700/80">Blocs 0, 1, 2, 3 — Gouvernance, Knowledge Graph, Intelligence Center, GEO Authority</p>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="relative pl-10 pb-6">
                  <div className="absolute left-2.5 w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-100"></div>
                  <div className="bg-amber-50/40 border border-amber-200/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-amber-800">Phase 2 — Acquisition</h4>
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">90–180 jours</span>
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Septembre–Novembre 2026</span>
                    </div>
                    <p className="text-xs text-amber-700/80">Blocs 4, 5, 6, 7 — SEO Big Four, AO/AMI Intelligence, Partnership Engine, Expert Network</p>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="relative pl-10 pb-6">
                  <div className="absolute left-2.5 w-3 h-3 rounded-full bg-purple-500 ring-2 ring-purple-100"></div>
                  <div className="bg-purple-50/40 border border-purple-200/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-purple-800">Phase 3 — Autorité</h4>
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">180–270 jours</span>
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Décembre 2026–Février 2027</span>
                    </div>
                    <p className="text-xs text-purple-700/80">Blocs 8, 9, 10 — Regulatory Excellence, Research Institute, Visibilité Institutionnelle</p>
                  </div>
                </div>

                {/* Phase 4 */}
                <div className="relative pl-10">
                  <div className="absolute left-2.5 w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-100"></div>
                  <div className="bg-red-50/40 border border-red-200/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-red-800">Phase 4 — Industrialisation</h4>
                      <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full">270–365 jours</span>
                      <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Mars–Juin 2027</span>
                    </div>
                    <p className="text-xs text-red-700/80">Blocs 11, 12 — Business Development Engine, Quality & Risk Management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer — Architecture Summary */}
        <div className="mt-10 p-5 bg-background-100 rounded-lg border border-background-200/60">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-road-map-line text-primary-600 text-lg"></i>
            <span className="text-sm font-semibold text-foreground-950">KOS Transformation Program 2026–2028™ — 13 Blocs, 4 Phases, 24 Mois</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-[11px] text-foreground-600">
            <span className="flex items-center gap-1"><i className="ri-checkbox-circle-fill text-emerald-500 text-xs"></i>{globalMetrics.blocksCompleted} blocs terminés</span>
            <span className="flex items-center gap-1"><i className="ri-timer-line text-amber-500 text-xs"></i>{globalMetrics.blocksInProgress} blocs en cours</span>
            <span className="flex items-center gap-1"><i className="ri-calendar-line text-purple-500 text-xs"></i>{globalMetrics.phasesCompleted}/4 phases terminées</span>
            <span className="flex items-center gap-1"><i className="ri-crosshair-line text-primary-500 text-xs"></i>Score {globalMetrics.scoreGlobal}/100</span>
            <span className="flex items-center gap-1"><i className="ri-pages-line text-accent-500 text-xs"></i>50K documents</span>
            <span className="flex items-center gap-1"><i className="ri-team-line text-secondary-500 text-xs"></i>428 experts</span>
            <span className="flex items-center gap-1"><i className="ri-trophy-line text-amber-500 text-xs"></i>Top 3 Afrique</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}



