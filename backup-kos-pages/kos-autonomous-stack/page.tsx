import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { Link } from 'react-router-dom';
import { useKOSAutonomousStack } from '@/hooks/useKOSAutonomousStack';
import type { ExternalDependency, MigrationTask } from '@/mocks/autonomousStack';

type TabId = 'diagnostic' | 'substitution' | 'migration' | 'factories' | 'architecture' | 'kpis' | 'score';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'diagnostic', label: 'Diagnostic', icon: 'ri-search-eye-line' },
  { id: 'substitution', label: 'Substitution', icon: 'ri-arrow-left-right-line' },
  { id: 'migration', label: 'Migration', icon: 'ri-rocket-line' },
  { id: 'factories', label: '5 Factories', icon: 'ri-building-2-line' },
  { id: 'architecture', label: 'Architecture', icon: 'ri-stack-line' },
  { id: 'kpis', label: 'KPIs', icon: 'ri-line-chart-line' },
  { id: 'score', label: 'Score Autonomie', icon: 'ri-medal-line' },
];

const CATEGORY_LABELS: Record<string, string> = {
  llm_api: 'API LLM', database: 'Base de données', saas_automation: 'SaaS Automatisation',
  media_api: 'API Média', analytics: 'Analytics', auth: 'Authentification', email: 'Email', other: 'Autre',
};

const CRITICALITY_LABELS: Record<string, string> = {
  'P0-critical': 'P0 Critique', 'P1-high': 'P1 Haute', 'P2-medium': 'P2 Moyenne', 'P3-low': 'P3 Basse',
};

const STATUS_LABELS: Record<string, string> = {
  proposed: 'Proposé', approved: 'Approuvé', in_progress: 'En cours', completed: 'Terminé', blocked: 'Bloqué',
};

export default function autonomousStackPage() {
  const [activeTab, setActiveTab] = useState<TabId>('diagnostic');
  const engine = useKOSAutonomousStack();
  const stats = engine.getStats();

  return (
    <hubLayout hubId={91} activeTab="Autonomous Stack" tabLabel="Autonomous Stack Transformation">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 font-body tracking-wide">
                      {stats.programVersion}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 font-body">
                      <i className="ri-cloud-off-line text-xs"></i>
                      {stats.replaceableDependencies}/{stats.totalDependencies} dépendances remplaçables
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">
                      <i className="ri-bank-line text-xs"></i>
                      {(stats.totalMonthlyCost / 1000).toFixed(0)}K FCFA/mois → cible {(stats.targetMonthlyCost / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KOS Autonomous Stack Transformation
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-2xl font-body">
                    Cockpit de désintermédiation API. Diagnostic complet des dépendances externes, matrices de substitution open-source, pipeline de migration 4 phases, architecture cible auto-hébergée. Objectif : réduire les coûts variables à &lt;10% et atteindre 92/100 d&apos;autonomie.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 flex-shrink-0">
                  {[
                    { label: 'Dépendances', value: stats.totalDependencies, icon: 'ri-cloud-line', color: 'text-primary-500' },
                    { label: 'Score Autonomie', value: `${stats.globalAutonomyScore}/100`, icon: 'ri-medal-line', color: 'text-accent-500' },
                    { label: 'Phases', value: stats.totalMigrationPhases, icon: 'ri-rocket-line', color: 'text-secondary-500' },
                  ].map(s => (
                    <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-3 text-center min-w-[90px]">
                      <i className={`${s.icon} ${s.color} text-lg`}></i>
                      <p className="text-xl font-bold text-foreground-950 mt-1">{s.value}</p>
                      <p className="text-xs text-foreground-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Governance Banner */}
        <div className="bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
            <div className="flex items-center gap-2 text-xs text-foreground-500">
              <i className="ri-shield-check-line text-accent-500"></i>
              <span><strong className="text-foreground-700">Gouvernance :</strong> {stats.governanceStatus}</span>
              <span className="mx-2 text-foreground-300">|</span>
              <span className="text-foreground-600 italic">{stats.visionStatement}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-1 overflow-x-auto py-2">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'text-foreground-600 hover:bg-background-100'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          {activeTab === 'diagnostic' && <DiagnosticTab engine={engine} />}
          {activeTab === 'substitution' && <SubstitutionTab engine={engine} />}
          {activeTab === 'migration' && <MigrationTab engine={engine} />}
          {activeTab === 'factories' && <FactoriesTab engine={engine} />}
          {activeTab === 'architecture' && <ArchitectureTab engine={engine} />}
          {activeTab === 'kpis' && <KPIsTab engine={engine} />}
          {activeTab === 'score' && <ScoreTab engine={engine} />}
        </div>

        {/* Cross-Links Footer */}
        <section className="py-12 bg-foreground-950">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white mb-2">Écosystème KOS — De la dépendance à la souveraineté</h2>
                <p className="text-gray-400 text-sm">Autonomous Stack → Self-Evolution → Voice Factory → Big Four Factory. Le programme complet de transformation vers l&apos;autonomie.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/kos-self-evolution" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-background-50 text-foreground-950 font-bold text-sm hover:bg-background-100 cursor-pointer whitespace-nowrap">
                  <i className="ri-line-chart-line" />Self-Evolution (Hub 89)
                </Link>
                <Link to="/kos-proprietary-voice-factory" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-500 text-white font-bold text-sm hover:bg-accent-600 cursor-pointer whitespace-nowrap">
                  <i className="ri-mic-fill" />Voice Factory (Hub 90)
                </Link>
                <Link to="/kos-youtube-download" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] cursor-pointer whitespace-nowrap">
                  <i className="ri-git-branch-line" />Big Four Factory
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </hubLayout>
  );
}

// ============================================================================
// TAB 1: DEPENDENCY DIAGNOSTIC
// ============================================================================
function DiagnosticTab({ engine }: { engine: ReturnType<typeof useKOSAutonomousStack> }) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQ, setSearchQ] = useState('');
  const deps = engine.dependencies;
  const categories = [...new Set(deps.map(d => d.category))];

  const filtered = (() => {
    let result = deps;
    if (categoryFilter !== 'all') result = result.filter(d => d.category === categoryFilter);
    if (searchQ) result = engine.searchDependencies(searchQ);
    return result;
  })();

  const selectedDep = engine.selectedDependencyId ? engine.getDependencyById(engine.selectedDependencyId) : null;

  return (
    <div className="space-y-8">
      {/* Philosophy Banner */}
      <ScrollReveal>
        <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-cloud-off-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Principe de Substitution</h3>
              <p className="text-sm text-foreground-600 mt-1">
                <strong className="text-foreground-800">Toute dépendance externe doit être considérée comme temporaire et remplaçable.</strong> Chaque fonctionnalité externe est évaluée selon : remplaçable par open-source ? Exécutable localement ? Intégrable dans n8n auto-hébergé ? Mutualisable ? Si OUI → INTERDIRE la dépendance externe.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Dépendances', value: engine.dependencyStats.criticalCount + engine.dependencyStats.replaceableCount, icon: 'ri-cloud-line', color: 'text-primary-500' },
          { label: 'Coût Mensuel', value: `${(engine.dependencyStats.totalCost / 1000).toFixed(0)}K FCFA`, icon: 'ri-money-dollar-circle-line', color: 'text-accent-500' },
          { label: 'Remplaçables', value: engine.dependencyStats.replaceableCount, icon: 'ri-arrow-left-right-line', color: 'text-emerald-500' },
          { label: 'Non remplaçables', value: engine.nonReplaceableDependencies.length, icon: 'ri-lock-line', color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
            <i className={`${s.icon} ${s.color} text-lg`}></i>
            <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setCategoryFilter('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${categoryFilter === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>Tous</button>
          {categories.map(c => (
            <button key={c} onClick={() => setCategoryFilter(c)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${categoryFilter === c ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>
              {CATEGORY_LABELS[c] || c}
            </button>
          ))}
        </div>
        <div className="relative max-w-xs">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Rechercher une dépendance..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300" />
        </div>
      </div>

      {/* Dependency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(dep => {
          const migStatus = engine.getDependencyMigrationStatus(dep.id);
          return (
            <ScrollReveal key={dep.id}>
              <button
                onClick={() => engine.setSelectedDependencyId(engine.selectedDependencyId === dep.id ? null : dep.id)}
                className={`w-full text-left rounded-xl border transition-all cursor-pointer ${
                  engine.selectedDependencyId === dep.id ? 'border-foreground-300 bg-background-50 ring-2 ring-foreground-200' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${dep.color}20` }}>
                      <i className={`${dep.icon} text-lg`} style={{ color: dep.color }}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-bold text-foreground-950 truncate">{dep.name}</h3>
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                          dep.criticality === 'P0-critical' ? 'bg-red-100 text-red-700' :
                          dep.criticality === 'P1-high' ? 'bg-amber-100 text-amber-700' :
                          'bg-background-100 text-foreground-500'
                        }`}>{CRITICALITY_LABELS[dep.criticality]}</span>
                      </div>
                      <span className="text-xs text-foreground-500">{dep.provider} · {dep.callsPerMonth.toLocaleString()} appels/mois</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-background-100 rounded-lg p-2 text-center">
                      <p className="text-xs text-foreground-400">Coût/mois</p>
                      <p className="text-sm font-bold text-foreground-950">{(dep.currentCostMonthlyFCFA / 1000).toFixed(0)}K FCFA</p>
                    </div>
                    <div className="bg-background-100 rounded-lg p-2 text-center">
                      <p className="text-xs text-foreground-400">Coût/appel</p>
                      <p className="text-sm font-bold text-foreground-950">{dep.costPerCallFCFA} FCFA</p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-600 line-clamp-2">{dep.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {dep.usedBy.slice(0, 2).map(u => (
                      <span key={u} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{u}</span>
                    ))}
                    {dep.usedBy.length > 2 && <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-400">+{dep.usedBy.length - 2}</span>}
                  </div>
                  {/* Migration mini progress */}
                  {migStatus.tasks.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-background-200/40">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-foreground-500">{migStatus.phase}</span>
                        <span className="text-foreground-700 font-semibold">{migStatus.progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-background-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${migStatus.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded detail */}
                {engine.selectedDependencyId === dep.id && (
                  <div className="border-t border-background-200/40 px-4 pb-4 pt-3">
                    <div className="bg-background-100 rounded-lg p-3 space-y-2">
                      <div className="text-xs">
                        <span className="text-foreground-500">Freéquence :</span>
                        <span className="text-foreground-700 font-medium ml-1 capitalize">{dep.frequency}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-foreground-500">Difficulté remplacement :</span>
                        <span className={`font-medium ml-1 ${
                          dep.replacementDifficulty === 'easy' ? 'text-emerald-600' :
                          dep.replacementDifficulty === 'moderate' ? 'text-amber-600' :
                          dep.replacementDifficulty === 'hard' ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {dep.replacementDifficulty === 'easy' ? 'Facile' :
                           dep.replacementDifficulty === 'moderate' ? 'Modéré' :
                           dep.replacementDifficulty === 'hard' ? 'Difficile' : 'Très difficile'}
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-foreground-500">Solution de remplacement :</span>
                        <p className="text-emerald-600 font-medium mt-0.5">{dep.replacementOption}</p>
                      </div>
                      <div className="text-xs">
                        <span className="text-foreground-500">Coût estimé après migration :</span>
                        <span className="text-emerald-600 font-bold ml-1">{(dep.estimatedInternalCostFCFA / 1000).toFixed(0)}K FCFA/mois</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-foreground-500">Temps migration estimé :</span>
                        <span className="text-foreground-700 font-medium ml-1">{dep.estimatedMigrationTime}</span>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 2: SUBSTITUTION MATRIX
// ============================================================================
function SubstitutionTab({ engine }: { engine: ReturnType<typeof useKOSAutonomousStack> }) {
  const proposals = engine.proposals;
  const stats = engine.substitutionStats;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Substitutions proposées', value: stats.total, icon: 'ri-arrow-left-right-line', color: 'text-primary-500' },
            { label: 'Économies potentielles', value: `${(stats.totalSavings / 1000).toFixed(0)}K FCFA/mois`, icon: 'ri-bank-line', color: 'text-accent-500' },
            { label: 'Faisabilité moyenne', value: `${stats.avgFeasibility}/100`, icon: 'ri-tools-line', color: 'text-secondary-500' },
            { label: 'En cours / Terminées', value: `${stats.completed}/${stats.total}`, icon: 'ri-check-double-line', color: 'text-emerald-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* In-Progress Banner */}
      <ScrollReveal>
        <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-rocket-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800 text-sm">{engine.inProgressProposals.length} migrations en cours</h3>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {engine.inProgressProposals.map(p => (
                  <span key={p.id} className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                    {p.openSourceAlternative.split('(')[0].trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Proposal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proposals.map(proposal => {
          const dep = engine.getDependencyById(proposal.dependencyId);
          return (
            <ScrollReveal key={proposal.id}>
              <div className={`bg-background-50 border rounded-xl overflow-hidden ${
                proposal.status === 'in_progress' ? 'border-emerald-200/60' :
                proposal.status === 'completed' ? 'border-accent-200/60' :
                proposal.status === 'blocked' ? 'border-red-200/60' :
                'border-background-200/70'
              }`}>
                <div className="p-5 border-b border-background-200/40">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {dep && <i className={`${dep.icon} text-sm`} style={{ color: dep.color }}></i>}
                        <h3 className="text-sm font-bold text-foreground-950">{proposal.openSourceAlternative}</h3>
                      </div>
                      {dep && <p className="text-xs text-foreground-500">Remplace {dep.name} ({dep.provider})</p>}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      proposal.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      proposal.status === 'in_progress' ? 'bg-accent-100 text-accent-700' :
                      proposal.status === 'blocked' ? 'bg-red-100 text-red-700' :
                      'bg-background-100 text-foreground-500'
                    }`}>{STATUS_LABELS[proposal.status]}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-background-100 rounded-lg p-2 text-center">
                      <p className="text-xs text-foreground-400">Faisabilité</p>
                      <p className={`text-sm font-bold ${proposal.feasibilityScore >= 80 ? 'text-emerald-600' : proposal.feasibilityScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{proposal.feasibilityScore}/100</p>
                    </div>
                    <div className="bg-background-100 rounded-lg p-2 text-center">
                      <p className="text-xs text-foreground-400">Économie/mois</p>
                      <p className="text-sm font-bold text-emerald-600">{(proposal.costReduction / 1000).toFixed(0)}K FCFA</p>
                    </div>
                    <div className="bg-background-100 rounded-lg p-2 text-center">
                      <p className="text-xs text-foreground-400">Impact qualité</p>
                      <p className={`text-sm font-bold ${proposal.qualityImpact >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>{proposal.qualityImpact >= 0 ? '+' : ''}{proposal.qualityImpact}</p>
                    </div>
                  </div>

                  <p className="text-xs text-foreground-600">
                    <strong className="text-foreground-800">Stack :</strong> {proposal.localStack}
                  </p>
                  <p className="text-xs text-foreground-600">
                    <strong className="text-foreground-800">Durée :</strong> {proposal.timeToImplement} · Phase {proposal.recommendedPhase}
                  </p>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Bénéfices</h4>
                    <div className="flex flex-wrap gap-1">
                      {proposal.benefits.slice(0, 3).map((b, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/50">{b}</span>
                      ))}
                    </div>
                  </div>

                  {/* Risks */}
                  <div>
                    <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Risques</h4>
                    <div className="flex flex-wrap gap-1">
                      {proposal.risks.slice(0, 3).map((r, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/50">{r}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 3: MIGRATION PIPELINE
// ============================================================================
function MigrationTab({ engine }: { engine: ReturnType<typeof useKOSAutonomousStack> }) {
  const phases = engine.phases;
  const mStats = engine.migrationStats;
  const activePhase = engine.activePhase;

  return (
    <div className="space-y-8">
      {/* Global Progress */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground-950 mb-4">Progression Globale — Pipeline de Migration</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Tâches totales', value: mStats.totalTasks, icon: 'ri-list-check', color: 'text-primary-500' },
              { label: 'Terminées', value: mStats.completedTasks, icon: 'ri-check-line', color: 'text-emerald-500' },
              { label: 'En cours', value: mStats.inProgressTasks, icon: 'ri-timer-line', color: 'text-accent-500' },
              { label: 'Bloquées', value: mStats.blockedTasks, icon: 'ri-error-warning-line', color: 'text-red-500' },
            ].map(s => (
              <div key={s.label} className="bg-background-100 rounded-lg p-3 text-center">
                <i className={`${s.icon} ${s.color} text-lg`}></i>
                <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
                <p className="text-xs text-foreground-500">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-3 bg-background-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${mStats.overallProgress}%` }}></div>
          </div>
          <p className="text-xs text-foreground-500 mt-2 text-center">{mStats.overallProgress}% complété</p>
        </div>
      </ScrollReveal>

      {/* Phase Cards */}
      <div className="space-y-6">
        {phases.map(phase => {
          const completedTasks = phase.tasks.filter(t => t.status === 'completed').length;
          const inProgressTasks = phase.tasks.filter(t => t.status === 'in_progress').length;
          const blockedTasks = phase.tasks.filter(t => t.status === 'blocked').length;

          return (
            <ScrollReveal key={phase.id}>
              <div className={`bg-background-50 border rounded-xl overflow-hidden ${
                phase.status === 'in_progress' ? 'border-accent-200/60' :
                phase.status === 'completed' ? 'border-emerald-200/60' :
                'border-background-200/70'
              }`}>
                {/* Phase Header */}
                <div className="p-5 border-b border-background-200/40">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        phase.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        phase.status === 'in_progress' ? 'bg-accent-100 text-accent-700' :
                        'bg-background-100 text-foreground-400'
                      }`}>
                        <i className={`${phase.icon} text-xl`}></i>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-foreground-950">{phase.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            phase.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            phase.status === 'in_progress' ? 'bg-accent-100 text-accent-700' :
                            'bg-background-100 text-foreground-500'
                          }`}>
                            {phase.status === 'completed' ? 'TERMINÉE' : phase.status === 'in_progress' ? 'EN COURS' : 'EN ATTENTE'}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-500">{phase.description}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold text-foreground-950">{phase.progress}%</p>
                      <p className="text-xs text-foreground-500">{phase.estimatedDuration}</p>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden mt-3">
                    <div
                      className={`h-full rounded-full transition-all ${
                        phase.progress >= 80 ? 'bg-emerald-500' :
                        phase.progress >= 40 ? 'bg-accent-500' :
                        phase.progress > 0 ? 'bg-secondary-500' : 'bg-background-300'
                      }`}
                      style={{ width: `${phase.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-foreground-500 mt-2">
                    <i className="ri-focus-3-line mr-1"></i>{phase.goal}
                  </p>
                </div>

                {/* Tasks Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200/40 bg-background-100">
                        <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Tâche</th>
                        <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Statut</th>
                        <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Assignée à</th>
                        <th className="text-right p-3 text-xs font-semibold text-foreground-500 uppercase">Effort</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-background-200/50">
                      {phase.tasks.map(task => (
                        <tr key={task.id} className="hover:bg-background-100/50 transition-colors">
                          <td className="p-3">
                            <div>
                              <p className="text-xs text-foreground-700">{task.step}</p>
                              <p className="text-xs text-foreground-400 mt-0.5">{task.risks}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                              task.status === 'completed' ? 'text-emerald-600' :
                              task.status === 'in_progress' ? 'text-accent-600' :
                              task.status === 'blocked' ? 'text-red-600' :
                              'text-foreground-400'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                task.status === 'completed' ? 'bg-emerald-500' :
                                task.status === 'in_progress' ? 'bg-accent-500' :
                                task.status === 'blocked' ? 'bg-red-500' : 'bg-foreground-300'
                              }`}></span>
                              {task.status === 'completed' ? 'Terminé' :
                               task.status === 'in_progress' ? 'En cours' :
                               task.status === 'blocked' ? 'Bloqué' : 'En attente'}
                            </span>
                          </td>
                          <td className="p-3 text-xs text-foreground-500">{task.assignedTo}</td>
                          <td className="p-3 text-right text-xs text-foreground-500">{task.effortHours}h</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 4: FIVE FACTORY SYSTEMS
// ============================================================================
function FactoriesTab({ engine }: { engine: ReturnType<typeof useKOSAutonomousStack> }) {
  const factories = engine.factories;
  const fStats = engine.factoryStats;

  return (
    <div className="space-y-8">
      {/* Banner */}
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-building-2-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">COUCHE 4 — Automatisation Métier</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Les 5 Factory Systems produisent <strong className="text-foreground-800">82-94% des livrables de manière automatisée</strong> sur infrastructure propriétaire. Dépendance externe moyenne : {fStats.avgDependency}%. Taux d&apos;automatisation moyen : {fStats.avgAutomation}%.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Factories', value: fStats.total, icon: 'ri-building-2-line', color: 'text-primary-500' },
          { label: 'Automatisation', value: `${fStats.avgAutomation}%`, icon: 'ri-robot-2-line', color: 'text-accent-500' },
          { label: 'Dépendance', value: `${fStats.avgDependency}%`, icon: 'ri-cloud-line', color: 'text-amber-500' },
          { label: 'Opérationnelles', value: engine.activeFactories.length, icon: 'ri-check-double-line', color: 'text-emerald-500' },
          { label: 'En planification', value: factories.filter(f => f.currentStatus === 'planned').length, icon: 'ri-calendar-line', color: 'text-foreground-500' },
        ].map(s => (
          <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
            <i className={`${s.icon} ${s.color} text-lg`}></i>
            <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Factory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {factories.map(factory => (
          <ScrollReveal key={factory.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden h-full">
              <div className="p-5 border-b border-background-200/40">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    factory.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                    factory.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                  }`}>
                    <i className={`${factory.icon} text-xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-foreground-950">{factory.name}</h3>
                      <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                        factory.currentStatus === 'operational' ? 'bg-emerald-100 text-emerald-700' :
                        factory.currentStatus === 'partial' ? 'bg-amber-100 text-amber-700' :
                        'bg-background-100 text-foreground-500'
                      }`}>
                        {factory.currentStatus === 'operational' ? 'OPÉRATIONNELLE' :
                         factory.currentStatus === 'partial' ? 'PARTIELLE' : 'PLANIFIÉE'}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-500">{factory.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {/* Dual progress bars */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground-500">Automatisation</span>
                      <span className="text-emerald-600 font-semibold">{factory.automationRate}%</span>
                    </div>
                    <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${factory.automationRate}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground-500">Dépendance externe</span>
                      <span className="text-amber-600 font-semibold">{factory.externalDependencyRate}%</span>
                    </div>
                    <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${factory.externalDependencyRate}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Capabilities */}
                <div>
                  <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1.5">Capacités clés</h4>
                  <div className="flex flex-wrap gap-1">
                    {factory.keyCapabilities.map(cap => (
                      <span key={cap} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{cap}</span>
                    ))}
                  </div>
                </div>

                {/* Target */}
                <div className="bg-primary-50 rounded-lg p-3">
                  <p className="text-xs text-foreground-700">
                    <strong className="text-primary-600">Cible :</strong> {factory.targetAutonomy}
                  </p>
                </div>

                <Link
                  to={factory.linkedRoute}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 hover:text-accent-700 cursor-pointer"
                >
                  <i className="ri-external-link-line"></i>
                  {factory.linkedHub} — Accéder
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 5: TARGET ARCHITECTURE
// ============================================================================
function ArchitectureTab({ engine }: { engine: ReturnType<typeof useKOSAutonomousStack> }) {
  const layers = engine.layers;
  const arch = engine.architectureSummary;

  return (
    <div className="space-y-8">
      {/* Summary */}
      <ScrollReveal>
        <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-stack-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Architecture Cible — 4 Couches</h3>
              <p className="text-sm text-foreground-600 mt-1">
                <strong className="text-foreground-800">Autonomie actuelle {arch.avgAutonomyNow}% → Cible {arch.avgAutonomyTarget}%.</strong> KOS Autonomous Operating System™ basé sur des briques open-source, modèles locaux, workflows mutualisés. Infrastructure propriétaire, auto-hébergée, contrôlée.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Layer Stack Visual */}
      <ScrollReveal>
        <div className="space-y-6">
          {layers.map((layer, i) => (
            <div key={layer.id} className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-background-200/40">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${i === 0 ? 'var(--primary-500)' : i === 1 ? 'var(--accent-500)' : i === 2 ? 'var(--secondary-500)' : 'var(--primary-500)'}20` }}>
                    <i className={`${layer.icon} text-xl`} style={{ color: i === 0 ? 'oklch(var(--primary-500))' : i === 1 ? 'oklch(var(--accent-500))' : i === 2 ? 'oklch(var(--secondary-500))' : 'oklch(var(--primary-500))' }}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-foreground-950">{layer.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-foreground-500">
                          Autonomie : <strong className="text-foreground-800">{layer.autonomyNow}%</strong> → <strong className="text-emerald-600">{layer.autonomyTarget}%</strong>
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-foreground-600 mb-3">{layer.objective}</p>

                    {/* Current vs Target Stack */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-red-50 rounded-lg p-3">
                        <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1.5">Stack Actuel (À remplacer)</h4>
                        <div className="flex flex-wrap gap-1">
                          {layer.currentStack.map(s => (
                            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1.5">Stack Cible (Propriétaire)</h4>
                        <div className="flex flex-wrap gap-1">
                          {layer.targetStack.map(s => (
                            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Components */}
              <div className="p-5">
                <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">Composants Clés</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {layer.keyComponents.map(comp => (
                    <div key={comp.name} className="flex items-start gap-2 bg-background-100 rounded-lg p-3">
                      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        comp.status === 'active' ? 'bg-emerald-500' :
                        comp.status === 'migrating' ? 'bg-accent-500' : 'bg-foreground-300'
                      }`}></span>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-foreground-800">{comp.name}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                            comp.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            comp.status === 'migrating' ? 'bg-accent-100 text-accent-700' :
                            'bg-background-100 text-foreground-500'
                          }`}>
                            {comp.status === 'active' ? 'Actif' :
                             comp.status === 'migrating' ? 'Migration' : 'Planifié'}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-500">{comp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

// ============================================================================
// TAB 6: AUTONOMY KPIs
// ============================================================================
function KPIsTab({ engine }: { engine: ReturnType<typeof useKOSAutonomousStack> }) {
  const kpis = engine.kpis;

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center sm:col-span-1">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Score d&apos;Autonomie</p>
            <p className="text-5xl font-bold text-primary-500 font-heading">{engine.stats.globalAutonomyScore}</p>
            <p className="text-xs text-foreground-400 mt-1">/100 — Cible {engine.stats.targetAutonomyScore}</p>
            <div className="w-full h-2 bg-background-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full" style={{ width: `${engine.stats.globalAutonomyScore}%` }}></div>
            </div>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 sm:col-span-2">
            <h3 className="text-sm font-semibold text-foreground-950 mb-3">Tendances Clés</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-xs text-foreground-500">Dépendance externe</p>
                <p className="text-xl font-bold text-emerald-600">-33%</p>
                <p className="text-xs text-foreground-400">depuis janvier (75% → 42%)</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-foreground-500">Appels LLM locaux</p>
                <p className="text-xl font-bold text-accent-600">23%</p>
                <p className="text-xs text-foreground-400">en hausse (0% → 23% depuis janvier)</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpis.map(kpi => (
          <ScrollReveal key={kpi.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    kpi.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                    kpi.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                  }`}>
                    <i className={`${kpi.icon} text-sm`}></i>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground-950">{kpi.name}</span>
                    <span className="text-xs text-foreground-400 ml-1.5">{kpi.layer}</span>
                  </div>
                </div>
                <span className={`text-xs font-medium ${
                  kpi.trend === 'up' && kpi.id !== 'api-dependency' && kpi.id !== 'cost-monthly' ? 'text-emerald-600' :
                  (kpi.id === 'api-dependency' || kpi.id === 'cost-monthly') && kpi.trend === 'down' ? 'text-emerald-600' :
                  kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-400'
                }`}>
                  {kpi.current}{kpi.unit}
                  {kpi.trend === 'up' && !['api-dependency', 'cost-monthly'].includes(kpi.id) && <i className="ri-arrow-up-line ml-0.5"></i>}
                  {kpi.trend === 'down' && ['api-dependency', 'cost-monthly'].includes(kpi.id) && <i className="ri-arrow-down-line ml-0.5"></i>}
                  {kpi.trend === 'stable' && <i className="ri-subtract-line ml-0.5"></i>}
                </span>
              </div>

              {/* Mini trend chart */}
              <div className="flex items-end gap-1 h-16 mb-2">
                {kpi.history.map((h, i) => {
                  const maxVal = Math.max(...kpi.history.map(hh => hh.value), kpi.target);
                  const heightPct = maxVal > 0 ? (h.value / maxVal) * 100 : 0;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full relative" style={{ height: '48px' }}>
                        <div
                          className={`absolute bottom-0 w-full rounded-sm transition-all ${
                            kpi.id === 'api-dependency' || kpi.id === 'cost-monthly'
                              ? (kpi.trend === 'down' ? 'bg-emerald-400' : 'bg-red-400')
                              : kpi.trend === 'up' ? 'bg-primary-400' : 'bg-red-400'
                          }`}
                          style={{ height: `${heightPct}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] text-foreground-400">{h.month}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-foreground-500">
                <span>Précédent: {kpi.previous}{kpi.unit}</span>
                <span>Cible: {kpi.target}{kpi.unit}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 7: AUTONOMY SCORE & ASSESSMENT
// ============================================================================
function ScoreTab({ engine }: { engine: ReturnType<typeof useKOSAutonomousStack> }) {
  const assessments = engine.assessments;
  const weightedScore = engine.weightedScore;

  return (
    <div className="space-y-8">
      {/* Global Score */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="text-center flex-shrink-0">
              <div className="w-32 h-32 rounded-full border-8 border-primary-200 flex items-center justify-center mx-auto">
                <div>
                  <p className="text-4xl font-bold text-primary-500 font-heading">{Math.round(weightedScore)}</p>
                  <p className="text-xs text-foreground-400">/100</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-foreground-950 mt-2">Score Pondéré</p>
              <p className="text-xs text-foreground-500">Cible : 92/100</p>
            </div>
            <div className="flex-1 space-y-4">
              {assessments.map(a => (
                <div key={a.dimension}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <i className={`${a.icon} text-sm text-foreground-600`}></i>
                      <span className="text-sm font-semibold text-foreground-950">{a.dimension}</span>
                      <span className="text-xs text-foreground-400">(Poids: {a.weight}%)</span>
                    </div>
                    <span className={`text-sm font-bold ${
                      a.score >= 70 ? 'text-emerald-600' :
                      a.score >= 50 ? 'text-accent-600' :
                      a.score >= 30 ? 'text-amber-600' : 'text-red-600'
                    }`}>{a.score}/100</span>
                  </div>
                  <div className="w-full h-3 bg-background-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        a.score >= 70 ? 'bg-emerald-500' :
                        a.score >= 50 ? 'bg-accent-500' :
                        a.score >= 30 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${a.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Detailed Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {assessments.map(assessment => (
          <ScrollReveal key={assessment.dimension}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden h-full">
              <div className="p-5 border-b border-background-200/40">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    assessment.score >= 70 ? 'bg-emerald-100 text-emerald-700' :
                    assessment.score >= 50 ? 'bg-accent-100 text-accent-700' :
                    assessment.score >= 30 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <i className={`${assessment.icon} text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">{assessment.dimension}</h3>
                    <span className="text-xs text-foreground-500">Poids: {assessment.weight}% · Score: {assessment.score}/100</span>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-sm text-foreground-600">{assessment.assessment}</p>
                <div>
                  <h4 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">Recommandations</h4>
                  <ul className="space-y-1.5">
                    {assessment.recommendations.map((rec, i) => (
                      <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                        <i className="ri-arrow-right-line text-primary-500 mt-0.5 flex-shrink-0"></i>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Final Rule Banner */}
      <ScrollReveal>
        <div className="bg-red-50 border border-red-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-alert-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-red-800 text-sm">Règle Finale</h3>
              <p className="text-sm text-red-700 mt-1">
                <strong>Toute dépendance externe doit être considérée comme temporaire et remplaçable. Toute capacité stable doit être internalisée dès que techniquement viable.</strong>
              </p>
              <p className="text-xs text-red-600 mt-2">
                Score actuel : {engine.stats.globalAutonomyScore}/100. Prochain jalon : Phase 1 complétée (Quick Wins) → +15 points → Objectif intermédiaire : 73/100.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}





