import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useKOSSelfEvolution } from '@/hooks/useKOSSelfEvolution';
import type { DecisionLog } from '@/mocks/selfEvolution';

type TabId = 'decision' | 'knowledge' | 'quality' | 'sobriety' | 'retex' | 'maturity' | 'capabilities';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'decision', label: 'Decision Engine', icon: 'ri-git-branch-line' },
  { id: 'knowledge', label: 'Knowledge Repo', icon: 'ri-book-open-line' },
  { id: 'quality', label: 'Quality Gates', icon: 'ri-shield-check-line' },
  { id: 'sobriety', label: 'Crédit Sobriété', icon: 'ri-money-dollar-circle-line' },
  { id: 'retex', label: 'RETEX Library', icon: 'ri-lightbulb-flash-line' },
  { id: 'maturity', label: 'Maturité KPIs', icon: 'ri-line-chart-line' },
  { id: 'capabilities', label: 'Capacités', icon: 'ri-stack-line' },
];

export default function selfEvolutionPage() {
  const [activeTab, setActiveTab] = useState<TabId>('decision');
  const engine = useKOSSelfEvolution();
  const stats = engine.getStats();

  return (
    <hubLayout hubId={89} activeTab="Self-Evolution" tabLabel="Programme Auto-Évolution">
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
                      <i className="ri-check-double-line text-xs"></i>
                      {stats.optimalDecisionRate}% optimal
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">
                      <i className="ri-bank-line text-xs"></i>
                      {(stats.totalSavingsCumulated / 1000000).toFixed(1)}M FCFA économisés
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KOS Self-Evolution Program
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-2xl font-body">
                    Programme d'auto-assimilation des capacités n8n et LLM. Avant chaque action, KOS vérifie : n8n natif → workflow existant → sous-workflow → LLM existant → bibliothèque interne. Maximiser l'autonomie, réduire les dépendances externes, capitaliser les connaissances. Standards Big Four.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 flex-shrink-0">
                  {[
                    { label: 'Règles', value: stats.totalRules, icon: 'ri-list-check', color: 'text-primary-500' },
                    { label: 'Domaines', value: stats.totalDomains, icon: 'ri-book-open-line', color: 'text-accent-500' },
                    { label: 'RETEX', value: stats.totalRetexEntries, icon: 'ri-lightbulb-flash-line', color: 'text-secondary-500' },
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
          {activeTab === 'decision' && <DecisionTab engine={engine} />}
          {activeTab === 'knowledge' && <KnowledgeTab engine={engine} />}
          {activeTab === 'quality' && <QualityTab engine={engine} />}
          {activeTab === 'sobriety' && <SobrietyTab engine={engine} />}
          {activeTab === 'retex' && <RetexTab engine={engine} />}
          {activeTab === 'maturity' && <MaturityTab engine={engine} />}
          {activeTab === 'capabilities' && <CapabilitiesTab engine={engine} />}
        </div>
      </main>
    </hubLayout>
  );
}

// ============================================================================
// TAB 1: DECISION ENGINE
// ============================================================================
function DecisionTab({ engine }: { engine: ReturnType<typeof useKOSSelfEvolution> }) {
  const [missionInput, setMissionInput] = useState('');
  const [recentDecisions, setRecentDecisions] = useState<DecisionLog[]>(engine.decisionLog);

  const handleCheck = () => {
    if (missionInput.trim()) {
      engine.checkMissionFeasibility(missionInput.trim());
    }
  };

  return (
    <div className="space-y-8">
      {/* Header explanation */}
      <ScrollReveal>
        <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-git-branch-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Principe Fondamental</h3>
              <p className="text-sm text-foreground-600 mt-1">
                <strong className="text-foreground-800">Avant toute création de nouvel agent, nouveau SaaS ou nouvelle dépendance externe</strong>, KOS doit vérifier les 5 règles. Si une solution interne existe → <strong className="text-red-600">INTERDIRE</strong> la création d'une dépendance externe.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Decision simulator */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-6">
          <h3 className="font-semibold text-foreground-950 mb-4">Simulateur de Décision</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={missionInput}
              onChange={e => setMissionInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheck()}
              placeholder="Ex: Générer un rapport de conformité BCEAO trimestriel..."
              className="flex-1 px-4 py-3 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 font-body"
            />
            <button
              onClick={handleCheck}
              disabled={!missionInput.trim()}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
            >
              <i className="ri-search-line mr-1.5"></i>
              Vérifier
            </button>
          </div>

          {engine.decisionResult && (
            <div className="mt-5 p-4 bg-background-100 border border-background-200/60 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  engine.decisionResult.isSolvable ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {engine.decisionResult.isSolvable ? 'SOLVABLE EN INTERNE' : 'EXTERNE REQUIS'}
                </span>
                <span className="text-xs text-foreground-500 font-body">{engine.decisionResult.rule.priority}ᵉ règle appliquée</span>
              </div>
              <p className="text-sm font-semibold text-foreground-950 mb-1">{engine.decisionResult.rule.question}</p>
              <p className="text-sm text-accent-600 font-medium">{engine.decisionResult.recommendedMethod}</p>
              <p className="text-xs text-foreground-500 mt-2">{engine.decisionResult.reasoning}</p>
              <div className="mt-3 pt-3 border-t border-background-200/60 flex items-center gap-4 text-xs">
                <span className="text-emerald-600 font-semibold">
                  <i className="ri-bank-line mr-1"></i>~{engine.decisionResult.estimatedSavings.toLocaleString()} FCFA économisés
                </span>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* The 5 Rules */}
      <ScrollReveal>
        <h3 className="font-semibold text-foreground-950 mb-4">Les 5 Règles de Décision (Ordre de Priorité)</h3>
        <div className="space-y-3">
          {engine.preExecutionRules.map((rule, i) => (
            <div key={rule.id} className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary-700">#{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground-950">{rule.question}</h4>
                  <p className="text-xs text-foreground-500 mt-1">{rule.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {rule.examples.slice(0, 3).map(ex => (
                      <span key={ex} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600 font-body">{ex}</span>
                    ))}
                  </div>
                  <p className="text-xs text-accent-600 mt-2 font-medium">
                    <i className="ri-speed-up-line mr-1"></i>{rule.successMetric}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Decision Log */}
      <ScrollReveal>
        <h3 className="font-semibold text-foreground-950 mb-3">Journal de Décisions (7 dernières)</h3>
        <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200/70 bg-background-100">
                <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Mission</th>
                <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Règle</th>
                <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Décision</th>
                <th className="text-right p-3 text-xs font-semibold text-foreground-500 uppercase">Économie</th>
                <th className="text-right p-3 text-xs font-semibold text-foreground-500 uppercase">Latence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-200/50">
              {recentDecisions.map(d => (
                <tr key={d.id} className="hover:bg-background-100/50 transition-colors">
                  <td className="p-3">
                    <span className="text-xs text-foreground-700">{d.mission}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-xs px-1.5 py-0.5 rounded bg-background-100 text-foreground-500">{d.ruleApplied}</span>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs font-medium ${d.wasOptimal ? 'text-emerald-600' : 'text-red-600'}`}>
                      {d.decision === 'n8n_native' ? 'n8n Natif' :
                       d.decision === 'existing_workflow' ? 'Workflow Existant' :
                       d.decision === 'sub_workflow' ? 'Sous-Workflow' :
                       d.decision === 'llm_existing' ? 'LLM Existant' :
                       d.decision === 'library_internal' ? 'Bibliothèque Interne' : 'Externe'}
                    </span>
                  </td>
                  <td className="p-3 text-right text-xs text-emerald-600 font-semibold">{d.costSaved.toLocaleString()} FCFA</td>
                  <td className="p-3 text-right text-xs text-foreground-500">{d.latencyMs}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ============================================================================
// TAB 2: KNOWLEDGE REPOSITORY
// ============================================================================
function KnowledgeTab({ engine }: { engine: ReturnType<typeof useKOSSelfEvolution> }) {
  const [searchQ, setSearchQ] = useState('');
  const domains = engine.knowledgeDomains;
  const filtered = searchQ ? engine.searchKnowledge(searchQ) : domains;

  const totalDocs = domains.reduce((s, d) => s + d.documentCount, 0);
  const avgMaturity = Math.round(domains.reduce((s, d) => s + d.maturity, 0) / domains.length);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground-950">KOS Knowledge Repository</h2>
            <p className="text-sm text-foreground-500">Capitalisation documentaire réglementaire — {totalDocs.toLocaleString()} documents, maturité {avgMaturity}%</p>
          </div>
          <div className="relative w-full max-w-xs">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
            <input
              type="text"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Rechercher un domaine, texte..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[{ label: 'Documents', value: totalDocs.toLocaleString(), icon: 'ri-file-text-line', color: 'text-primary-500' },
          { label: 'Domaines', value: domains.length, icon: 'ri-folder-line', color: 'text-accent-500' },
          { label: 'Maturité', value: `${avgMaturity}%`, icon: 'ri-medal-line', color: 'text-secondary-500' },
          { label: 'Dernière MAJ', value: '22/06', icon: 'ri-calendar-line', color: 'text-foreground-500' },
          { label: 'Textes clés', value: domains.reduce((s, d) => s + d.keyTexts.length, 0), icon: 'ri-bookmark-line', color: 'text-foreground-500' }].map(s => (
          <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
            <i className={`${s.icon} ${s.color} text-lg`}></i>
            <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Domain Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(domain => (
          <ScrollReveal key={domain.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  domain.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                  domain.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${domain.icon} text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground-950">{domain.name}</h3>
                  <p className="text-xs text-foreground-500 mt-0.5 line-clamp-2">{domain.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-foreground-950">{domain.documentCount}</p>
                  <p className="text-xs text-foreground-500">docs</p>
                </div>
              </div>
              {/* Sub-categories */}
              <div className="flex flex-wrap gap-1 mb-3">
                {domain.subCategories.slice(0, 4).map(sc => (
                  <span key={sc} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{sc}</span>
                ))}
                {domain.subCategories.length > 4 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-400">+{domain.subCategories.length - 4}</span>
                )}
              </div>
              {/* Key texts */}
              <div className="space-y-1.5">
                {domain.keyTexts.slice(0, 2).map(kt => (
                  <div key={kt.reference} className="flex items-center justify-between text-xs">
                    <span className="text-foreground-700 truncate mr-2">{kt.title}</span>
                    <span className="text-foreground-400 flex-shrink-0">{kt.year}</span>
                  </div>
                ))}
              </div>
              {/* Maturity bar */}
              <div className="mt-3 pt-3 border-t border-background-200/40">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-foreground-500">Maturité documentaire</span>
                  <span className="text-foreground-700 font-semibold">{domain.maturity}%</span>
                </div>
                <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      domain.maturity >= 90 ? 'bg-emerald-500' : domain.maturity >= 80 ? 'bg-accent-500' : 'bg-secondary-500'
                    }`}
                    style={{ width: `${domain.maturity}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 3: QUALITY GATES
// ============================================================================
function QualityTab({ engine }: { engine: ReturnType<typeof useKOSSelfEvolution> }) {
  const dims = engine.qualityDimensions;
  const gates = engine.qualityGateResults;
  const blocked = engine.blockedContents;

  return (
    <div className="space-y-8">
      {/* Dimensions Grid */}
      <ScrollReveal>
        <h2 className="text-lg font-bold text-foreground-950 mb-4">6 Dimensions de Qualité — KOS Quality Engine</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dims.map(dim => (
            <div key={dim.id} className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  dim.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                  dim.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${dim.icon} text-lg`}></i>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground-950">{dim.name}</h3>
                  <span className="text-xs text-foreground-500">Poids: {dim.weight}%</span>
                </div>
              </div>
              <p className="text-xs text-foreground-600 mb-3">{dim.description}</p>
              <div className="space-y-1">
                {dim.checks.map(check => (
                  <div key={check} className="flex items-start gap-1.5 text-xs">
                    <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5 flex-shrink-0"></i>
                    <span className="text-foreground-600">{check}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-background-200/40 flex items-center justify-between text-xs">
                <span className="text-foreground-500">Blocage auto si &lt;</span>
                <span className={`font-bold ${dim.autoBlockBelow >= 75 ? 'text-amber-600' : dim.autoBlockBelow >= 70 ? 'text-red-500' : 'text-secondary-600'}`}>
                  {dim.autoBlockBelow}/100
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Blocked Alert */}
      {blocked.length > 0 && (
        <ScrollReveal>
          <div className="bg-red-50 border border-red-200/60 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <i className="ri-close-line text-white text-lg"></i>
              </div>
              <div>
                <h3 className="font-semibold text-red-800 text-sm">{blocked.length} contenu{blocked.length > 1 ? 's' : ''} bloqué{blocked.length > 1 ? 's' : ''}</h3>
                {blocked.map(b => (
                  <div key={b.contentId} className="mt-2 text-sm">
                    <p className="text-red-700 font-medium">{b.contentTitle}</p>
                    <p className="text-red-600 text-xs mt-0.5">
                      Bloqué par : <strong>{dims.find(d => d.id === b.blockingDimension)?.name || b.blockingDimension}</strong> — Score global {b.globalScore}/100
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Quality Gate Results */}
      <ScrollReveal>
        <h3 className="font-semibold text-foreground-950 mb-3">Derniers Résultats Quality Gate</h3>
        <div className="space-y-4">
          {gates.map(gate => (
            <div key={gate.contentId} className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
              <div className="p-5 flex items-start justify-between border-b border-background-200/40">
                <div>
                  <h4 className="text-sm font-semibold text-foreground-950">{gate.contentTitle}</h4>
                  <p className="text-xs text-foreground-500 mt-0.5">{gate.date} — {gate.contentId}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  gate.decision === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                  gate.decision === 'to_correct' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>
                  {gate.decision === 'approved' ? 'APPROUVÉ' : gate.decision === 'to_correct' ? 'À CORRIGER' : 'BLOQUÉ'}
                </div>
              </div>
              <div className="p-5 grid grid-cols-3 sm:grid-cols-6 gap-3">
                {gate.dimensions.map(d => (
                  <div key={d.dimId} className="text-center">
                    <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center border-2 ${
                      d.score >= 85 ? 'border-emerald-400 bg-emerald-50' :
                      d.score >= 70 ? 'border-amber-400 bg-amber-50' : 'border-red-400 bg-red-50'
                    }`}>
                      <span className={`text-sm font-bold ${
                        d.score >= 85 ? 'text-emerald-700' : d.score >= 70 ? 'text-amber-700' : 'text-red-700'
                      }`}>{d.score}</span>
                    </div>
                    <p className="text-xs text-foreground-500 mt-1.5">{dims.find(dd => dd.id === d.dimId)?.name || d.dimId}</p>
                    {!d.passed && <i className="ri-close-circle-fill text-red-500 text-xs mt-0.5"></i>}
                  </div>
                ))}
              </div>
              {gate.dimensions.filter(d => !d.passed).length > 0 && (
                <div className="px-5 pb-4 space-y-1.5">
                  {gate.dimensions.filter(d => !d.passed).map(d => (
                    <div key={d.dimId} className="flex items-start gap-1.5 text-xs">
                      <i className="ri-error-warning-line text-red-500 mt-0.5"></i>
                      <span className="text-red-700">{d.issues.join(' | ')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

// ============================================================================
// TAB 4: CREDIT SOBRIETY
// ============================================================================
function SobrietyTab({ engine }: { engine: ReturnType<typeof useKOSSelfEvolution> }) {
  const creditStats = engine.creditStats;
  const stats = engine.getStats();

  return (
    <div className="space-y-6">
      {/* Global Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Appels LLM (mois)', value: creditStats.totalLLMCalls.toLocaleString(), icon: 'ri-brain-line', color: 'text-primary-500', sub: 'Juin 2026' },
            { label: 'Coût Total', value: `${(creditStats.totalCostFCFA / 1000).toFixed(1)}K FCFA`, icon: 'ri-money-dollar-circle-line', color: 'text-accent-500', sub: `${creditStats.avgCostPerCall} FCFA/appel` },
            { label: 'Appels Évités', value: creditStats.callsAvoided.toLocaleString(), icon: 'ri-close-circle-line', color: 'text-emerald-500', sub: 'Grâce aux 5 règles' },
            { label: 'Économies Réalisées', value: `${(creditStats.savingsFCFA / 1000000).toFixed(2)}M FCFA`, icon: 'ri-bank-line', color: 'text-emerald-600', sub: 'Cumulées' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
              <i className={`${s.icon} ${s.color} text-xl`}></i>
              <p className="text-xl font-bold text-foreground-950 mt-2">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
              <p className="text-xs text-foreground-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Performance Rates */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Taux de Réutilisation', value: creditStats.reuseRate, unit: '%', color: 'bg-primary-500' },
            { label: 'Taux Décisions Optimales', value: creditStats.optimalDecisionRate, unit: '%', color: 'bg-accent-500' },
            { label: 'Économies vs Coûts', value: Math.round((creditStats.savingsFCFA / creditStats.totalCostFCFA) * 10) / 10, unit: 'x', color: 'bg-emerald-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-foreground-950">{s.value}<span className="text-lg text-foreground-400">{s.unit}</span></p>
              <p className="text-xs text-foreground-500 mt-1">{s.label}</p>
              <div className="w-full h-2 bg-background-200 rounded-full mt-3 overflow-hidden">
                <div className={`h-full rounded-full ${s.color}`} style={{ width: `${Math.min(s.value, 100)}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Cost Estimations */}
      <ScrollReveal>
        <h3 className="font-semibold text-foreground-950 mb-3">Estimation : Coût Interne vs Externe</h3>
        <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200/70 bg-background-100">
                <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Opération</th>
                <th className="text-left p-3 text-xs font-semibold text-foreground-500 uppercase">Méthode KOS</th>
                <th className="text-right p-3 text-xs font-semibold text-foreground-500 uppercase">Coût KOS</th>
                <th className="text-right p-3 text-xs font-semibold text-foreground-500 uppercase">Coût Externe</th>
                <th className="text-right p-3 text-xs font-semibold text-foreground-500 uppercase">Économie</th>
                <th className="text-center p-3 text-xs font-semibold text-foreground-500 uppercase">Optimal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-200/50">
              {engine.costEstimations.map(ce => (
                <tr key={ce.operation} className="hover:bg-background-100/50 transition-colors">
                  <td className="p-3 text-xs text-foreground-700 max-w-[200px] truncate">{ce.operation}</td>
                  <td className="p-3 text-xs text-foreground-600">{ce.method}</td>
                  <td className="p-3 text-right text-xs font-semibold text-emerald-600">{ce.estimatedCostFCFA === 0 ? '0 FCFA' : `${ce.estimatedCostFCFA} FCFA`}</td>
                  <td className="p-3 text-right text-xs text-foreground-500">{ce.alternativeCostFCFA.toLocaleString()} FCFA</td>
                  <td className="p-3 text-right text-xs font-semibold text-emerald-600">{ce.savingsFCFA === 0 ? '-' : `${ce.savingsFCFA.toLocaleString()} FCFA`}</td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${ce.isOptimal ? 'text-emerald-600' : 'text-amber-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${ce.isOptimal ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {ce.isOptimal ? 'OPTIMAL' : 'SUBOPTIMAL'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Principle reminder */}
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200/60 rounded-xl p-5">
          <h3 className="font-semibold text-foreground-950 text-sm mb-2">Règles de Sobriété des Crédits</h3>
          <div className="space-y-1.5 text-sm text-foreground-600">
            <p className="flex items-center gap-2"><i className="ri-check-line text-accent-500"></i>Avant toute exécution : calculer valeur attendue, coût estimé, fréquence d'usage</p>
            <p className="flex items-center gap-2"><i className="ri-check-line text-accent-500"></i>Privilégier : Workflow existant → Sous-processus → Base documentaire → n8n natif → Appel LLM</p>
            <p className="flex items-center gap-2"><i className="ri-check-line text-accent-500"></i>Les appels LLM doivent être considérés comme une ressource à optimiser</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ============================================================================
// TAB 5: RETEX LIBRARY
// ============================================================================
function RetexTab({ engine }: { engine: ReturnType<typeof useKOSSelfEvolution> }) {
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const entries = engine.retexEntries;
  const domains = [...new Set(entries.map(e => e.domain))];
  const filtered = filterDomain === 'all' ? entries : engine.getRetexByDomain(filterDomain);

  const totalSavings = entries.reduce((s, e) => s + Math.abs(Math.min(0, e.costImpact)), 0);
  const totalImprovements = entries.reduce((s, e) => s + e.improvements.length, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'RETEX', value: entries.length, icon: 'ri-lightbulb-flash-line', color: 'text-primary-500' },
            { label: 'Améliorations', value: totalImprovements, icon: 'ri-tools-line', color: 'text-accent-500' },
            { label: 'Workflows Réutilisables', value: entries.reduce((s, e) => s + e.reusableWorkflows.length, 0), icon: 'ri-git-branch-line', color: 'text-secondary-500' },
            { label: 'Gain Qualité', value: `+${entries.reduce((s, e) => s + e.qualityImpact, 0)}`, icon: 'ri-arrow-up-line', color: 'text-emerald-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Domain filter */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setFilterDomain('all')}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
            filterDomain === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'
          }`}
        >
          Tous
        </button>
        {domains.map(d => (
          <button
            key={d}
            onClick={() => setFilterDomain(d)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterDomain === d ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* RETEX Cards */}
      <div className="space-y-4">
        {filtered.map(retex => (
          <ScrollReveal key={retex.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-background-200/40">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{retex.domain}</span>
                      <span className="text-xs text-foreground-400">{retex.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground-950">{retex.mission}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs flex-shrink-0">
                    <span className={`font-semibold ${retex.costImpact < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {retex.costImpact < 0 ? '+' : '-'}{Math.abs(retex.costImpact).toLocaleString()} FCFA
                    </span>
                    <span className="text-accent-600 font-semibold">+{retex.qualityImpact} qualité</span>
                  </div>
                </div>
              </div>
              <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* What Worked */}
                <div>
                  <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <i className="ri-check-line"></i>Ce qui a fonctionné
                  </h4>
                  <ul className="space-y-1">
                    {retex.whatWorked.map((w, i) => (
                      <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">•</span>{w}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* What Failed */}
                <div>
                  <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <i className="ri-close-line"></i>Ce qui a échoué
                  </h4>
                  <ul className="space-y-1">
                    {retex.whatFailed.map((f, i) => (
                      <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                        <span className="text-red-500 mt-0.5">•</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Improvements */}
              <div className="px-5 pb-3">
                <h4 className="text-xs font-semibold text-accent-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <i className="ri-lightbulb-line"></i>Améliorations
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {retex.improvements.map((imp, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200/50">{imp}</span>
                  ))}
                </div>
              </div>
              {/* Reusable components */}
              <div className="px-5 pb-3 grid grid-cols-2 gap-3">
                <div>
                  <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1.5">Workflows réutilisables</h4>
                  <div className="flex flex-wrap gap-1">
                    {retex.reusableWorkflows.map((w, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded bg-primary-50 text-primary-700 border border-primary-200/50">{w}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1.5">Composants</h4>
                  <div className="flex flex-wrap gap-1">
                    {retex.reusableComponents.map((c, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded bg-secondary-50 text-secondary-700 border border-secondary-200/50">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Lesson */}
              <div className="px-5 pb-5">
                <div className="bg-primary-50 border border-primary-200/40 rounded-lg p-3">
                  <p className="text-xs text-foreground-700">
                    <strong className="text-primary-600">Leçon apprise :</strong> {retex.lessonLearned}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 6: MATURITY KPIs
// ============================================================================
function MaturityTab({ engine }: { engine: ReturnType<typeof useKOSSelfEvolution> }) {
  const kpis = engine.maturityKPIs;
  const stats = engine.getStats();

  return (
    <div className="space-y-6">
      {/* Maturity Score */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center sm:col-span-1">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Score de Maturité</p>
            <p className="text-5xl font-bold text-primary-500 font-heading">{stats.maturityScore}</p>
            <p className="text-xs text-foreground-400 mt-1">/100 — Cible {stats.targetMaturity}</p>
            <div className="w-full h-2 bg-background-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full" style={{ width: `${stats.maturityScore}%` }}></div>
            </div>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 sm:col-span-2">
            <h3 className="text-sm font-semibold text-foreground-950 mb-3">Progression Mensuelle</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {kpis.slice(0, 3).map(kpi => (
                <div key={kpi.id} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <i className={`${kpi.icon} text-xs ${kpi.color === 'primary' ? 'text-primary-500' : kpi.color === 'accent' ? 'text-accent-500' : 'text-secondary-500'}`}></i>
                    <span className="text-xs text-foreground-500">{kpi.name}</span>
                  </div>
                  <p className="text-xl font-bold text-foreground-950">{kpi.current}{kpi.unit}</p>
                  {kpi.trend === 'up' && <i className="ri-arrow-up-line text-emerald-500 text-xs"></i>}
                  {kpi.trend === 'down' && <i className="ri-arrow-down-line text-red-500 text-xs"></i>}
                  {kpi.trend === 'stable' && <i className="ri-subtract-line text-foreground-400 text-xs"></i>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* KPI Detail Cards */}
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
                  <span className="text-sm font-semibold text-foreground-950">{kpi.name}</span>
                </div>
                <span className={`text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-400'
                }`}>
                  {kpi.current}{kpi.unit}
                  {kpi.trend === 'up' && <i className="ri-arrow-up-line ml-0.5"></i>}
                  {kpi.trend === 'down' && <i className="ri-arrow-down-line ml-0.5"></i>}
                  {kpi.trend === 'stable' && <i className="ri-subtract-line ml-0.5"></i>}
                </span>
              </div>

              {/* Mini trend chart */}
              <div className="flex items-end gap-1 h-16 mb-2">
                {kpi.history.map((h, i) => {
                  const maxVal = Math.max(...kpi.history.map(hh => hh.value), kpi.target);
                  const heightPct = (h.value / maxVal) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full relative" style={{ height: '48px' }}>
                        <div
                          className={`absolute bottom-0 w-full rounded-sm transition-all ${
                            kpi.id === 'errors' || kpi.id === 'latency'
                              ? 'bg-red-400'
                              : 'bg-primary-400'
                          }`}
                          style={{ height: `${heightPct}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] text-foreground-400">{h.month}</span>
                    </div>
                  );
                })}
                {/* Target line */}
                <div className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full relative" style={{ height: '48px' }}>
                    <div className="absolute bottom-0 w-full h-0.5 bg-dashed border-t border-dashed border-foreground-300" style={{ bottom: `${(kpi.target / Math.max(...kpi.history.map(hh => hh.value), kpi.target)) * 100}%` }}></div>
                  </div>
                  <span className="text-[9px] text-foreground-400">Cible</span>
                </div>
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
// TAB 7: CAPABILITIES LIBRARY
// ============================================================================
function CapabilitiesTab({ engine }: { engine: ReturnType<typeof useKOSSelfEvolution> }) {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const caps = engine.capabilities;
  const types = [...new Set(caps.map(c => c.type))];
  const filtered = typeFilter === 'all' ? caps : engine.getCapabilitiesByType(typeFilter);

  const typeLabelMap: Record<string, string> = {
    workflow: 'Workflow', prompt: 'Prompt', template: 'Template',
    checklist: 'Checklist', sub_workflow: 'Sous-Workflow', document: 'Document',
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Workflows', value: caps.filter(c => c.type === 'workflow').length, icon: 'ri-git-branch-line', color: 'text-primary-500' },
            { label: 'Prompts', value: caps.filter(c => c.type === 'prompt').length, icon: 'ri-brain-line', color: 'text-accent-500' },
            { label: 'Templates', value: caps.filter(c => c.type === 'template').length, icon: 'ri-file-text-line', color: 'text-secondary-500' },
            { label: 'Sous-Workflows', value: caps.filter(c => c.type === 'sub_workflow').length, icon: 'ri-puzzle-line', color: 'text-foreground-500' },
            { label: 'Checklists', value: caps.filter(c => c.type === 'checklist').length, icon: 'ri-list-check', color: 'text-foreground-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Type filter */}
      <div className="flex flex-wrap gap-1.5">
        <button onClick={() => setTypeFilter('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${typeFilter === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>
          Tous
        </button>
        {types.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${typeFilter === t ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'}`}>
            {typeLabelMap[t] || t}
          </button>
        ))}
      </div>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(cap => (
          <ScrollReveal key={cap.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 h-full">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  cap.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                  cap.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  <i className={`${cap.icon} text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground-950">{cap.name}</h3>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      cap.validationStatus === 'validated' ? 'bg-emerald-100 text-emerald-700' :
                      cap.validationStatus === 'beta' ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'
                    }`}>
                      {cap.version}
                    </span>
                  </div>
                  <p className="text-xs text-foreground-500 line-clamp-2">{cap.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-500">
                <span className="flex items-center gap-1">
                  <i className="ri-repeat-line"></i>{cap.usageCount} usages
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-money-dollar-circle-line"></i>{cap.costPerUse === 0 ? 'Gratuit' : `${cap.costPerUse} FCFA`}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-price-tag-3-line"></i>{cap.domain}
                </span>
              </div>
              {cap.dependencies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {cap.dependencies.map(dep => (
                    <span key={dep} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-mono">{dep}</span>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}



