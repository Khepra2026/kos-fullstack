import { useState } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import hubLayout from '@/components/feature/hubLayout';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { usePhase7Domination } from '@/hooks/usePhase7Domination';

type TabId = 'cockpit' | 'chantiers' | 'timeline' | 'budget' | 'dependances' | 'log';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { id: 'chantiers', label: '8 Chantiers', icon: 'ri-globe-line' },
  { id: 'timeline', label: 'Timeline', icon: 'ri-timeline-view' },
  { id: 'budget', label: 'Budget', icon: 'ri-money-dollar-circle-line' },
  { id: 'dependances', label: 'Dépendances', icon: 'ri-git-branch-line' },
  { id: 'log', label: 'Log d\'Exécution', icon: 'ri-file-list-3-line' },
];

function getChantierStatusColor(status: string) {
  switch (status) {
    case 'completed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'TERMINÉ' };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'EN COURS' };
    case 'blocked': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'BLOQUÉ' };
    case 'open': return { bg: 'bg-secondary-50', border: 'border-secondary-200', text: 'text-secondary-600', dot: 'bg-secondary-400', label: 'OUVERT' };
    default: return { bg: 'bg-background-50', border: 'border-background-200', text: 'text-foreground-500', dot: 'bg-foreground-400', label: status.toUpperCase() };
  }
}

function StatusBadge({ status }: { status: string }) {
  const c = getChantierStatusColor(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap border ${c.bg} ${c.border} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${status === 'in_progress' ? 'animate-pulse' : ''}`} />
      {c.label}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    high: 'bg-red-50 text-red-600 border-red-100',
    medium: 'bg-amber-50 text-amber-700 border-amber-100',
    low: 'bg-secondary-50 text-secondary-600 border-secondary-100',
  };
  return (
    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase whitespace-nowrap ${map[severity] || ''}`}>
      {severity}
    </span>
  );
}

export default function phase7DominationPage() {
  const [activeTab, setActiveTab] = useState<TabId>('cockpit');
  const [expandedChantier, setExpandedChantier] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const data = usePhase7Domination();

  const handleLaunchPhase7 = () => {
    setToast('Phase 7 activée — DOMINATION CONTINENTALE ! 8 chantiers, objectif : Score de Domination 115/115. KOS devient le leader continental incontesté.');
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <hubLayout hubId={106}>
      <SeoHead
        title="KOS Phase 7 Domination Continentale & Marché Global™ — Infrastructure Souveraine, 15 Bureaux, Marketplace, IPO | KHEPRA EXPERTS"
        description="Phase 7 du Plan Consolidation — DOMINATION : infrastructure cloud souveraine 12 edge nodes, réseau 15 bureaux panafricains, KOS Marketplace SaaS, 150 agents IA, certification ISO 8 normes, alliances Big Four, KOS Academy Global, Revenue 25 Md FCFA. Objectif : Score de Domination 110→115."
        keywords="KOS Phase 7, domination, infrastructure souveraine, marketplace, ISO, Big Four, KHEPRA EXPERTS, 115/115, leader continental"
        canonicalPath="/kos-phase7-domination"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background-50 border-b border-background-200">
        <div className="absolute inset-0 opacity-[0.04]">
          <img src="https://readdy.ai/api/search-image?query=majestic%20panoramic%20view%20of%20the%20African%20continent%20from%20space%20at%20golden%20hour%20brilliant%20emerald%20green%20networks%20of%20light%20connecting%20all%20major%20cities%20from%20Cairo%20to%20Johannesburg%20from%20Dakar%20to%20Nairobi%20radiant%20digital%20pathways%20flowing%20across%20the%20continent%20like%20luminous%20arteries%20a%20central%20superhub%20glowing%20intensely%20in%20West%20Africa%20corporate%20sovereign%20technology%20aesthetic%20pristine%20atmosphere&width=1920&height=600&seq=kos-phase7-hero-x2&orientation=landscape" alt="" className="w-full h-full object-cover object-center" width="1920" height="600" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-foreground-950/90 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18 relative z-10">
          <ScrollReveal>
            <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Phase 6 Innovation', href: '/kos-phase6-innovation' }, { label: 'Phase 7 Domination', href: '/kos-phase7-domination' }]} />
            <div className="mt-6 flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600 border border-emerald-500">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-xs font-bold text-white">PHASE 7 ACTIVE — DOMINATION CONTINENTALE</span>
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-sm text-emerald-300 font-bold whitespace-nowrap">
                    <i className="ri-globe-line text-sm" /> LEADER CONTINENTAL
                  </span>
                  <span className="text-xs text-foreground-400">{data.daysRemaining} jours restants · Deadline 3 Octobre</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Phase 7 : Domination Continentale & Marché Global
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl">
                  Faire de KOS le leader continental incontesté : <strong className="text-white">infrastructure cloud souveraine 12 edge nodes, réseau 15 bureaux panafricains, KOS Marketplace SaaS, 150 agents IA, certification ISO 8 normes, alliances Big Four, KOS Academy Global, Revenue 25 Md FCFA</strong>. KOS domine le continent.
                </p>
                <p className="mt-2 text-sm text-gray-400">Objectif : Score de Domination <strong className="text-emerald-400">110 → 115</strong> le 3 Octobre 2026 · Budget : 48,5M FCFA · <strong className="text-emerald-300">KOS devient le leader incontesté</strong></p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
                {[
                  { label: 'Progression', value: `${data.globalProgress}%`, icon: 'ri-timer-line', color: 'text-emerald-400' },
                  { label: 'En Cours', value: `${data.inProgressChantiers}`, icon: 'ri-loader-4-line', color: 'text-amber-400' },
                  { label: 'Ouverts', value: `${data.openChantiers}`, icon: 'ri-globe-line', color: 'text-secondary-400' },
                  { label: 'Actions', value: `${data.completedActions}/${data.totalActions}`, icon: 'ri-check-double-line', color: 'text-emerald-400' },
                ].map((s) => (
                  <div key={s.label} className="bg-foreground-950/50 border border-foreground-800/50 rounded-xl p-3 text-center min-w-[100px] backdrop-blur-sm">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-foreground-900/50">
                      <i className={`${s.icon} ${s.color} text-sm`} />
                    </div>
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-gray-400 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={handleLaunchPhase7} className="flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-globe-line" />
                Lancer la Domination — Phase 7
              </button>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-sm text-emerald-300 font-bold whitespace-nowrap">
                Score cible : {data.phase7Stats.target_score}/115
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 text-sm text-amber-300 whitespace-nowrap">
                Budget : {data.phase7Budget.total}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-sm text-emerald-300 whitespace-nowrap">
                <i className="ri-earth-line text-sm" /> 15 Bureaux · 150 Agents · 8 ISO
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-accent-500 text-white' : 'text-foreground-600 hover:bg-background-100'}`}>
                <i className={`${tab.icon} text-sm`} />{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {activeTab === 'cockpit' && <CockpitTab data={data} />}
        {activeTab === 'chantiers' && <ChantiersTab data={data} expandedChantier={expandedChantier} setExpandedChantier={setExpandedChantier} />}
        {activeTab === 'timeline' && <TimelineTab data={data} />}
        {activeTab === 'budget' && <BudgetTab data={data} />}
        {activeTab === 'dependances' && <DependancesTab data={data} />}
        {activeTab === 'log' && <ExecutionLogTab data={data} />}
      </div>

      {/* Commander's Intent Footer */}
      <section className="bg-emerald-950 border-t border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
              <i className="ri-globe-line text-white text-lg" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Commander's Intent — Phase 7 Domination</p>
              <p className="text-sm text-emerald-100 mt-0.5">{data.phase7Stats.commander_intent}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-lg font-bold text-white">{data.globalProgress}%</p>
              <p className="text-[10px] text-emerald-300">Progression Globale</p>
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <i className="ri-globe-line text-lg" />
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}
    </hubLayout>
  );
}

// ================================================================
// TAB 1 : COCKPIT
// ================================================================
function CockpitTab({ data }: { data: ReturnType<typeof usePhase7Domination> }) {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-background-50 border border-background-200 rounded-xl p-6">
            <h3 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-4">Progression Phase 7 — Domination Continentale</h3>
            <div className="flex items-center gap-5">
              <div className="relative w-28 h-28 flex-shrink-0">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="oklch(var(--background-200))" strokeWidth="10" />
                  <circle cx="56" cy="56" r="48" fill="none" stroke="oklch(0.38 0.16 170)" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${(data.globalProgress / 100) * 301} 301`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold text-foreground-950">{data.globalProgress}%</span>
                  <span className="text-[10px] text-foreground-400">complété</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-foreground-500">Score Phase 6</span>
                  <span className="font-bold text-foreground-800">{data.phase7Stats.starting_score}/115</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-foreground-500">Score cible Domination</span>
                  <span className="font-bold text-emerald-600">{data.phase7Stats.target_score}/115</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-foreground-500">Jours restants</span>
                  <span className="font-bold text-amber-600">{data.daysRemaining} jours</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-foreground-500">Budget engagé</span>
                  <span className="font-bold text-foreground-800">{data.budgetUtilizationPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-background-50 border border-background-200 rounded-xl p-6">
            <h3 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-4">Statut des 8 Chantiers de Domination</h3>
            <div className="space-y-2.5">
              {data.phase7Chantiers.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${c.color}15` }}>
                    <i className={`${c.icon} text-sm`} style={{ color: c.color }} />
                  </div>
                  <span className="text-xs font-medium text-foreground-700 truncate flex-1">{c.chantier}</span>
                  <div className="w-24 h-2 bg-background-200 rounded-full overflow-hidden flex-shrink-0">
                    <div className={`h-full rounded-full transition-all duration-500 ${c.progress >= 50 ? 'bg-emerald-500' : c.progress >= 25 ? 'bg-amber-500' : c.progress === 0 ? 'bg-background-300' : 'bg-red-500'}`} style={{ width: `${Math.max(c.progress, 5)}%` }} />
                  </div>
                  <span className="text-[10px] font-bold w-8 text-right text-foreground-500">{c.progress}%</span>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Trajectoire 76→115 */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-line-chart-line text-emerald-600" /> Trajectoire Complète — Plan Consolidation 76→115
          </h3>
          <div className="flex items-center gap-0 w-full overflow-x-auto pb-2">
            {[
              { label: 'Diag', score: 76, date: '19/06', color: 'bg-red-500' },
              { label: 'P1', score: 85, date: '03/07', color: 'bg-amber-500' },
              { label: 'P2', score: 90, date: '21/07', color: 'bg-cyan-500' },
              { label: 'P3', score: 95, date: '07/08', color: 'bg-indigo-500' },
              { label: 'P4', score: 100, date: '22/08', color: 'bg-emerald-500' },
              { label: 'P5', score: 105, date: '05/09', color: 'bg-purple-500' },
              { label: 'P6', score: 110, date: '19/09', color: 'bg-orange-500' },
              { label: 'P7', score: 115, date: '03/10', color: 'bg-emerald-600' },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center flex-1 min-w-[55px]">
                <div className="text-center flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center mx-auto`}>
                    <span className="text-white text-[10px] font-bold">{step.score}</span>
                  </div>
                  <p className="text-[8px] font-bold text-foreground-700 mt-1">{step.label}</p>
                  <p className="text-[7px] text-foreground-400">{step.date}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex-1 h-1 mx-0.5 rounded-full bg-background-200">
                    <div className="h-full rounded-full bg-foreground-300 w-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Quick Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: 'Chantiers Ouverts', value: `${data.openChantiers}/8`, icon: 'ri-globe-line', color: 'text-secondary-600', bg: 'bg-secondary-50 border-secondary-200' },
            { label: 'En Cours', value: `${data.inProgressChantiers}/8`, icon: 'ri-loader-4-line', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
            { label: 'Actions OK', value: `${data.completedActions}/${data.totalActions}`, icon: 'ri-check-double-line', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
            { label: 'Actions En Cours', value: `${data.inProgressActions}`, icon: 'ri-play-circle-line', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
            { label: 'Bloqueurs Critiques', value: `${data.criticalPathBlockers}`, icon: 'ri-alert-line', color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
            { label: 'Budget Restant', value: data.phase7Budget.remaining, icon: 'ri-money-dollar-circle-line', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center border`}>
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-white/50">
                <i className={`${s.icon} ${s.color} text-sm`} />
              </div>
              <p className="text-xl font-bold text-foreground-950">{s.value}</p>
              <p className="text-[10px] text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Commander's Intent */}
      <ScrollReveal>
        <div className="bg-emerald-50/30 border border-emerald-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-emerald-800 mb-3 flex items-center gap-2">
            <i className="ri-globe-line" /> Commander's Intent — Phase 7 Domination
          </h3>
          <p className="text-sm text-emerald-700 leading-relaxed">{data.phase7Stats.commander_intent}</p>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 2 : 8 CHANTIERS DOMINATION
// ================================================================
function ChantiersTab({ data, expandedChantier, setExpandedChantier }: {
  data: ReturnType<typeof usePhase7Domination>;
  expandedChantier: string | null;
  setExpandedChantier: (id: string | null) => void;
}) {
  const categColors: Record<string, string> = {
    'Infrastructure': 'bg-emerald-100 text-emerald-700',
    'Expansion': 'bg-red-100 text-red-700',
    'Innovation': 'bg-purple-100 text-purple-700',
    'IA Avancée': 'bg-amber-100 text-amber-700',
    'Gouvernance': 'bg-blue-100 text-blue-700',
    'Partenariats': 'bg-cyan-100 text-cyan-700',
    'Formation': 'bg-indigo-100 text-indigo-700',
    'Croissance': 'bg-emerald-100 text-emerald-700',
  };

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-xl font-bold text-foreground-950">8 Chantiers de Domination — Détail par Action</h2>
          <div className="flex items-center gap-3 ml-auto flex-wrap">
            {Object.entries(categColors).map(([cat, cls]) => (
              <span key={cat} className={`text-[9px] px-2 py-1 rounded-full font-semibold ${cls}`}>{cat}</span>
            ))}
          </div>
        </div>
        <p className="text-sm text-foreground-500 mt-1">{data.completedActions}/{data.totalActions} actions complétées · {data.inProgressChantiers} chantier en cours · Fin dans {data.daysRemaining} jours</p>
      </ScrollReveal>

      {data.phase7Chantiers.map((chantier) => {
        const isExpanded = expandedChantier === chantier.id;
        const completedActions = chantier.actions.filter(a => a.status === 'completed').length;

        return (
          <ScrollReveal key={chantier.id}>
            <div className={`rounded-2xl border-2 transition-all ${chantier.severity === 'critical' ? 'border-red-200 bg-red-50/10' : 'border-emerald-200 bg-emerald-50/10'}`}>
              <button onClick={() => setExpandedChantier(isExpanded ? null : chantier.id)}
                className="w-full flex items-start gap-4 p-5 text-left cursor-pointer">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${chantier.color}15` }}>
                  <i className={`${chantier.icon} text-xl`} style={{ color: chantier.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[9px] font-mono text-foreground-400">{chantier.id}</span>
                    <SeverityBadge severity={chantier.severity} />
                    <StatusBadge status={chantier.status} />
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">{chantier.priority}</span>
                    <span className={`text-[9px] px-2 py-1 rounded-full font-semibold ${categColors[chantier.category] || 'bg-background-100 text-foreground-500'}`}>{chantier.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">{chantier.chantier}</h3>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{chantier.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] flex-wrap">
                    <span className="text-foreground-400"><i className="ri-user-line mr-1" />{chantier.responsible}</span>
                    <span className="text-foreground-400"><i className="ri-calendar-line mr-1" />{chantier.deadline}</span>
                    <span className="text-foreground-400"><i className="ri-time-line mr-1" />{chantier.effort}</span>
                    <span className="text-foreground-400"><i className="ri-money-dollar-circle-line mr-1" />{chantier.budget}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className={`text-2xl font-bold ${chantier.progress >= 50 ? 'text-emerald-600' : chantier.progress >= 25 ? 'text-amber-600' : chantier.progress === 0 ? 'text-foreground-300' : 'text-red-600'}`}>
                    {chantier.progress}%
                  </div>
                  <div className="text-[10px] text-foreground-400">{completedActions}/{chantier.actions.length} actions</div>
                  <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-sm mt-1 block`} />
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-background-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 mb-4">
                    <div className="p-3 rounded-xl bg-accent-50 border border-accent-200">
                      <p className="text-[10px] text-accent-500 font-semibold uppercase">KPI de Succès</p>
                      <p className="text-xs font-bold text-accent-800 mt-0.5">{chantier.kpi}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                      <p className="text-[10px] text-red-500 font-semibold uppercase">Bloque</p>
                      <p className="text-xs font-bold text-red-800 mt-0.5">{chantier.bloque}</p>
                    </div>
                  </div>

                  {chantier.dependencies.length > 0 && (
                    <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
                      <p className="text-[10px] text-amber-600 font-semibold uppercase">Dépendances</p>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {chantier.dependencies.map((dep) => (
                          <span key={dep} className="text-[9px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 font-mono">{dep}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">
                    Plan d'Actions ({chantier.actions.length} étapes)
                  </h4>
                  <div className="space-y-2">
                    {chantier.actions.map((action, idx) => (
                      <div key={action.id} className={`p-3 rounded-xl border flex items-center gap-3 ${action.status === 'completed' ? 'bg-emerald-50/30 border-emerald-200' : action.status === 'in_progress' ? 'bg-amber-50/30 border-amber-200' : 'bg-background-100 border-background-200'}`}>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${action.status === 'completed' ? 'bg-emerald-500 text-white' : action.status === 'in_progress' ? 'bg-amber-500 text-white' : 'bg-background-200 text-foreground-400'}`}>
                          {action.status === 'completed' ? <i className="ri-check-line text-xs" /> : idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium ${action.status === 'completed' ? 'text-emerald-800 line-through' : 'text-foreground-800'}`}>
                            {action.action}
                          </p>
                          <p className="text-[9px] text-foreground-400 mt-0.5">{action.owner} · {action.effort}</p>
                        </div>
                        <StatusBadge status={action.status} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

// ================================================================
// TAB 3 : TIMELINE
// ================================================================
function TimelineTab({ data }: { data: ReturnType<typeof usePhase7Domination> }) {
  const tl = data.phase7Timeline;

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Timeline — 2 Semaines vers la Domination</h2>
        <p className="text-sm text-foreground-500">{tl.start} → {tl.end} · {data.daysRemaining} jours restants · Score 110 → 115</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tl.weeks.map((week, wi) => (
          <ScrollReveal key={wi}>
            <div className={`rounded-xl border-2 p-6 ${wi === 0 ? 'border-emerald-200 bg-emerald-50/10' : 'border-amber-200 bg-amber-50/10'}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${wi === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {week.week}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground-950">{week.label}</h3>
                  <p className="text-xs text-foreground-400">{week.start} → {week.end}</p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {week.milestones.map((ms, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-foreground-700">
                    <i className="ri-checkbox-blank-circle-line text-foreground-300 flex-shrink-0" />
                    {ms}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Deadlines par Chantier — Domination</h3>
          <div className="space-y-3">
            {data.phase7Chantiers.map((c) => {
              const deadlineDate = new Date(c.deadline);
              const now = new Date('2026-09-22');
              const daysLeft = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              const isUrgent = daysLeft <= 4;
              return (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg bg-background-100">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${c.color}15` }}>
                    <i className={`${c.icon} text-sm`} style={{ color: c.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground-800 truncate">{c.chantier}</p>
                    <p className="text-[9px] text-foreground-400">{c.responsible}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-xs font-bold ${isUrgent ? 'text-red-600' : 'text-foreground-600'}`}>{c.deadline}</p>
                    <p className={`text-[9px] ${isUrgent ? 'text-red-400' : 'text-foreground-400'}`}>{daysLeft} jours restants</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-emerald-600 rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <i className="ri-globe-line text-white text-3xl" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">3 OCTOBRE 2026 — KOS LEADER CONTINENTAL</h3>
          <p className="text-emerald-100 text-sm">Score de Domination 115/115 · 15 Bureaux · 12 Edge Nodes · 150 Agents · 8 ISO · 25 Md Pipeline</p>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 4 : BUDGET
// ================================================================
function BudgetTab({ data }: { data: ReturnType<typeof usePhase7Domination> }) {
  const b = data.phase7Budget;

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Budget Phase 7 — Financement de la Domination</h2>
        <p className="text-sm text-foreground-500">Budget total : {b.total} · Dépensé : {b.spent} · Restant : {b.remaining} · Budget Plan Complet cumulé : ~218,4M FCFA</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200 rounded-xl p-5 text-center">
            <p className="text-[10px] text-foreground-400 uppercase tracking-wider mb-2">Budget Total Phase 7</p>
            <p className="text-2xl font-bold text-foreground-950">{b.total}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
            <p className="text-[10px] text-amber-500 uppercase tracking-wider mb-2">Déjà Engagé</p>
            <p className="text-2xl font-bold text-amber-700">{b.spent}</p>
            <div className="mt-2 w-full h-2 bg-amber-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${data.budgetUtilizationPercent}%` }} />
            </div>
            <p className="text-[9px] text-amber-500 mt-1">{data.budgetUtilizationPercent}% utilisé</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
            <p className="text-[10px] text-emerald-500 uppercase tracking-wider mb-2">Budget Restant</p>
            <p className="text-2xl font-bold text-emerald-700">{b.remaining}</p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6 overflow-x-auto">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Ventilation par Chantier</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-background-200">
                <th className="text-left py-2 text-foreground-500 font-semibold">Poste Budgétaire</th>
                <th className="text-right py-2 text-foreground-500 font-semibold w-36">Montant</th>
                <th className="text-center py-2 text-foreground-500 font-semibold w-24">Statut</th>
              </tr>
            </thead>
            <tbody>
              {b.breakdown.map((item, i) => (
                <tr key={i} className="border-b border-background-100">
                  <td className="py-2.5 text-foreground-700">{item.item}</td>
                  <td className="py-2.5 text-right font-bold text-foreground-800">{item.amount}</td>
                  <td className="py-2.5 text-center">
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-700">
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-foreground-200">
                <td className="py-2.5 font-bold text-foreground-950">TOTAL PHASE 7</td>
                <td className="py-2.5 text-right font-bold text-foreground-950">{b.total}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-emerald-50/20 border border-emerald-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-emerald-800 mb-3">Budget Cumulé — Plan Consolidation Complet (7 Phases)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { phase: 'Phase 1', amount: '28,4M' },
              { phase: 'Phase 2', amount: '32,1M' },
              { phase: 'Phase 3', amount: '24,8M' },
              { phase: 'Phase 4', amount: '21,3M' },
              { phase: 'Phase 5', amount: '28,5M' },
              { phase: 'Phase 6', amount: '34,8M' },
              { phase: 'Phase 7', amount: '48,5M' },
            ].map((p) => (
              <div key={p.phase} className="p-3 rounded-xl bg-white/50 border border-emerald-100 text-center">
                <p className="text-[9px] text-emerald-600 font-semibold">{p.phase}</p>
                <p className="text-sm font-bold text-emerald-900 mt-1">{p.amount}</p>
              </div>
            ))}
            <div className="md:col-span-4 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-center mt-2">
              <p className="text-xs font-bold text-emerald-800">TOTAL PLAN CONSOLIDATION : ~218 400 000 FCFA — 7 Phases, 14 semaines, 55 chantiers, 260 actions</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 5 : DÉPENDANCES
// ================================================================
function DependancesTab({ data }: { data: ReturnType<typeof usePhase7Domination> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Graphe de Dépendances — Phase 7</h2>
        <p className="text-sm text-foreground-500">10 dépendances critiques — P7D-001 (Infrastructure Souveraine) est la clé de voûte</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-5">Chaîne de Dépendances</h3>
          <div className="space-y-4">
            {data.phase7Dependencies.map((dep, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background-100 border border-background-200">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-[10px] font-mono font-bold text-foreground-600 bg-background-200 px-2 py-1 rounded-full">{dep.from}</span>
                  <div className="flex items-center gap-1">
                    <i className="ri-arrow-right-line text-foreground-300 text-xs" />
                    <span className="text-[10px] font-mono font-bold text-foreground-600 bg-background-200 px-2 py-1 rounded-full">{dep.to}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-foreground-600 italic">{dep.reason}</p>
                </div>
                <span className="text-[9px] px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold flex-shrink-0">BLOQUANT</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-emerald-50/20 border border-emerald-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-emerald-800 mb-4 flex items-center gap-2">
            <i className="ri-git-branch-line" /> Chemin Critique — P7D-001, le socle de la domination
          </h3>
          <p className="text-xs text-emerald-700 mb-4">
            <strong>P7D-001 (Infrastructure Cloud Souveraine)</strong> est la fondation — elle alimente les bureaux (P7D-002), le Marketplace (P7D-003), les agents IA (P7D-004) et les certifications ISO (P7D-005). Sans infrastructure souveraine, rien n'est possible.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">P7D-001 INFRA</span>
            <i className="ri-arrow-right-line text-emerald-400" />
            <span className="px-3 py-2 rounded-full bg-red-100 text-red-800 font-bold">P7D-002 Bureaux</span>
            <i className="ri-arrow-right-line text-emerald-400" />
            <span className="px-3 py-2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">P7D-008 REVENUE</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 6 : LOG D'EXÉCUTION
// ================================================================
function ExecutionLogTab({ data }: { data: ReturnType<typeof usePhase7Domination> }) {
  const typeStyles: Record<string, string> = {
    milestone: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    action: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    budget: 'bg-amber-100 text-amber-700 border-amber-200',
    notification: 'bg-foreground-100 text-foreground-600 border-foreground-200',
  };

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Journal d'Exécution — Phase 7 Domination</h2>
        <p className="text-sm text-foreground-500">Lancé le {data.phase7Stats.launched_at.split('T')[0]} à {data.phase7Stats.launched_at.split('T')[1].slice(0, 5)} · Domination Continentale</p>
      </ScrollReveal>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-background-200" />
        <div className="space-y-4">
          {data.phase7ExecutionLog.map((entry, i) => {
            const typeStyle = typeStyles[entry.type] || typeStyles.notification;
            return (
              <ScrollReveal key={i}>
                <div className="relative flex items-start gap-4 pl-2">
                  <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${typeStyle}`}>
                    <i className={`${entry.icon} text-sm`} />
                  </div>
                  <div className="flex-1 min-w-0 pt-2">
                    <p className="text-xs text-foreground-400">
                      {entry.timestamp.split('T')[1].slice(0, 5)} — <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase ${typeStyle}`}>{entry.type}</span>
                    </p>
                    <p className="text-sm font-medium text-foreground-800 mt-0.5">{entry.event}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6 mt-8">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Prochaines Actions au Log</h3>
          <div className="space-y-2">
            {data.phase7Chantiers
              .flatMap(c => c.actions.filter(a => a.status !== 'completed').map(a => ({ ...a, chantierName: c.chantier, chantierColor: c.color })))
              .slice(0, 8)
              .map((action, i) => (
                <div key={action.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-background-100">
                  <span className="text-[10px] text-foreground-400 w-5 text-right">{i + 1}.</span>
                  <i className="ri-time-line text-foreground-300 text-xs" />
                  <span className="text-xs text-foreground-700 flex-1">{action.action}</span>
                  <span className="text-[9px] text-foreground-400 whitespace-nowrap">{action.effort}</span>
                </div>
              ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-emerald-50/20 border border-emerald-200 rounded-xl p-6 text-center">
          <h3 className="text-sm font-bold text-emerald-800 mb-2 flex items-center justify-center gap-2">
            <i className="ri-globe-line" /> Domination en Cours
          </h3>
          <p className="text-2xl font-bold text-emerald-700">{data.daysRemaining} JOURS</p>
          <p className="text-xs text-emerald-600 mt-1">avant la Domination Continentale — 3 Octobre 2026</p>
        </div>
      </ScrollReveal>
    </div>
  );
}





