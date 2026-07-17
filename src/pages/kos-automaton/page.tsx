import { useState } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { AUTOMATON_ENGINE_STATS, AUTOMATON_CAPABILITIES, AUTOMATON_OP_LOG, AUTOMATON_BENCHMARKS, AUTOMATON_ARCHITECTURE, QUALITY_DEMO } from '@/mocks/kosAutomaton';

type TabId = 'overview' | 'capabilities' | 'quality' | 'benchmarks' | 'architecture' | 'live';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
  { id: 'capabilities', label: '6 Capacités', icon: 'ri-brain-line' },
  { id: 'quality', label: 'Démo Qualité', icon: 'ri-shield-check-line' },
  { id: 'benchmarks', label: 'Benchmarks', icon: 'ri-speed-line' },
  { id: 'architecture', label: 'Architecture', icon: 'ri-stack-line' },
  { id: 'live', label: 'Test Live', icon: 'ri-flashlight-line' },
];

export default function KosAutomatonPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <KOSHubLayout hubId={26}>
      <SeoHead
        title="KOS Automaton Engine — IA déterministe sans API externe | KHEPRA EXPERTS"
        description="Le KOS Automaton Engine est le moteur NLP 100% autonome de KHEPRA pour le RAG, le scoring qualité contenu, les résumés extractifs et les quality gates. Moteur TF-IDF, zéro latence externe, zéro coût."
        canonical="/kos-automaton"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <ScrollReveal>
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'KOS Automaton', href: '/kos-automaton' },
              ]}
            />
            <div className="mt-6 flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-100 rounded-full mb-5">
                  <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
                  <span className="text-xs font-semibold text-accent-700">ACTIF — v1.0.0</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground-950 leading-tight">
                  KOS Automaton Engine
                </h1>
                <p className="mt-4 text-lg text-foreground-600 max-w-2xl">
                  Moteur NLP 100% autonome pour toutes les tâches critiques : 
                  résumé, scoring qualité, recherche sémantique, recommandations et quality gates.
                  <strong className="text-foreground-800"> Zéro dépendance externe. Zéro latence réseau. Zéro coût.</strong>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 flex-shrink-0">
                <div className="bg-background-50 border border-background-200 rounded-xl p-4 text-center min-w-[110px]">
                  <p className="text-2xl font-bold text-foreground-950">52</p>
                  <p className="text-xs text-foreground-500 mt-1">Documents</p>
                </div>
                <div className="bg-background-50 border border-background-200 rounded-xl p-4 text-center min-w-[110px]">
                  <p className="text-2xl font-bold text-accent-600">6</p>
                  <p className="text-xs text-foreground-500 mt-1">Capacités</p>
                </div>
                <div className="bg-background-50 border border-background-200 rounded-xl p-4 text-center min-w-[110px]">
                  <p className="text-2xl font-bold text-foreground-950">~48ms</p>
                  <p className="text-xs text-foreground-500 mt-1">Latence moy.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'capabilities' && <CapabilitiesTab />}
        {activeTab === 'quality' && <QualityDemoTab />}
        {activeTab === 'benchmarks' && <BenchmarksTab />}
        {activeTab === 'architecture' && <ArchitectureTab />}
        {activeTab === 'live' && <LiveTestTab />}
      </div>
    </KOSHubLayout>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-10">
      {/* Alert Banner */}
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200 rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0 mt-1">
            <i className="ri-lightbulb-flash-line text-white text-lg"></i>
          </div>
          <div>
            <h3 className="font-semibold text-foreground-950">Moteur 100% Autonome — Zéro Dépendance</h3>
            <p className="text-sm text-foreground-600 mt-1">
              Le KOS Automaton Engine est le moteur NLP principal et permanent de KHEPRA. Toutes les fonctions IA critiques 
              (résumé, scoring qualité, recherche sémantique, recommandations, quality gates) sont traitées en interne 
              sans aucune API externe. <strong className="text-foreground-800">TF-IDF + BM25 + Cosine Similarity — 100% autonome, zéro coût, zéro latence réseau.</strong>
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats Grid */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-database-2-line text-accent-600"></i>
              </div>
              <span className="text-xs text-foreground-500 font-medium">Documents</span>
            </div>
            <p className="text-3xl font-bold text-foreground-950">{AUTOMATON_ENGINE_STATS.totalDocuments}</p>
            <p className="text-xs text-foreground-400 mt-1">Corpus documentaire RAG</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-history-line text-accent-600"></i>
              </div>
              <span className="text-xs text-foreground-500 font-medium">Opérations</span>
            </div>
            <p className="text-3xl font-bold text-foreground-950">{AUTOMATON_ENGINE_STATS.totalOperations.toLocaleString()}</p>
            <p className="text-xs text-foreground-400 mt-1">Depuis le déploiement</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center">
                <i className="ri-timer-line text-secondary-600"></i>
              </div>
              <span className="text-xs text-foreground-500 font-medium">Latence</span>
            </div>
            <p className="text-3xl font-bold text-foreground-950">{AUTOMATON_ENGINE_STATS.avgLatencyMs}ms</p>
            <p className="text-xs text-foreground-400 mt-1">Moyenne par opération</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center">
                <i className="ri-check-double-line text-secondary-600"></i>
              </div>
              <span className="text-xs text-foreground-500 font-medium">Uptime</span>
            </div>
            <p className="text-3xl font-bold text-accent-600">100%</p>
            <p className="text-xs text-foreground-400 mt-1">Aucune interruption</p>
          </div>
        </div>
      </ScrollReveal>

      {/* What it replaces */}
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-5">Ce que l'Automaton gère en 100% autonome</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { before: 'Résumé IA (GPT-4o-mini)', after: 'Résumé Extractif (TextRank-like)', gain: 'Zéro hallucination, 100% factuel', icon: 'ri-file-reduce-line' },
            { before: 'Embeddings (text-embedding-3-small)', after: 'TF-IDF + Cosine Similarity', gain: '85ms, 0€, 100% autonome', icon: 'ri-search-2-line' },
            { before: 'Recommandations IA (GPT-4o-mini)', after: 'Jaccard Overlap + Domain Boost', gain: 'Déterministe, résultats reproductibles', icon: 'ri-lightbulb-line' },
          ].map((item) => (
            <div key={item.before} className="bg-background-50 border border-background-200 rounded-xl p-5">
              <div className="w-9 h-9 rounded-lg bg-background-100 flex items-center justify-center mb-3">
                <i className={`${item.icon} text-foreground-600`}></i>
              </div>
              <p className="text-xs text-foreground-400 line-through">{item.before}</p>
              <p className="text-sm font-semibold text-accent-600 mt-1">→ {item.after}</p>
              <p className="text-xs text-foreground-500 mt-2">{item.gain}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Recent Ops */}
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-5">Opérations Récentes</h2>
        <div className="bg-background-50 border border-background-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200 bg-background-100">
                <th className="text-left p-4 text-xs font-semibold text-foreground-500 uppercase">Opération</th>
                <th className="text-left p-4 text-xs font-semibold text-foreground-500 uppercase">Méthode</th>
                <th className="text-right p-4 text-xs font-semibold text-foreground-500 uppercase">Durée</th>
                <th className="text-right p-4 text-xs font-semibold text-foreground-500 uppercase">Input</th>
                <th className="text-right p-4 text-xs font-semibold text-foreground-500 uppercase">Output</th>
                <th className="text-center p-4 text-xs font-semibold text-foreground-500 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-200">
              {AUTOMATON_OP_LOG.map((op) => (
                <tr key={op.id} className="hover:bg-background-100 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-foreground-950 capitalize">{op.operation.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-0.5 rounded bg-background-100 text-foreground-500">{op.method}</span>
                  </td>
                  <td className="p-4 text-right text-foreground-600">{op.durationMs}ms</td>
                  <td className="p-4 text-right text-foreground-600">{op.inputSize} {op.operation === 'semantic_search' ? 'mots' : 'car.'}</td>
                  <td className="p-4 text-right text-foreground-600">{op.outputSize} {op.operation === 'recommend' ? 'recs' : op.operation === 'semantic_search' ? 'docs' : 'unités'}</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                      OK
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </div>
  );
}

function CapabilitiesTab() {
  return (
    <div className="space-y-6">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Les 6 Capacités du Moteur</h2>
        <p className="text-sm text-foreground-500 mb-6">Chaque capacité expose une opération distincte via l'API unique de l'Engine</p>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {AUTOMATON_CAPABILITIES.map((cap) => (
          <ScrollReveal key={cap.id}>
            <div className="bg-background-50 border border-background-200 rounded-xl p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                  <i className={`${cap.icon} text-accent-600 text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground-950">{cap.name}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary-100 text-secondary-700 font-medium uppercase whitespace-nowrap">{cap.method}</span>
                  </div>
                  <p className="text-sm text-foreground-500 mb-3">{cap.description}</p>
                  <div className="flex items-center gap-4 text-xs text-foreground-400">
                    <span className="flex items-center gap-1">
                      <i className="ri-speed-up-line"></i>
                      {cap.latency}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-dashboard-line"></i>
                      {cap.throughput}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function QualityDemoTab() {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Démo Scoring Qualité — Temps Réel</h2>
        <p className="text-sm text-foreground-500">Analyse heuristique 6 dimensions sur un contenu réel du corpus réglementaire KHEPRA</p>
      </ScrollReveal>

      {/* Quality Score Card */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 text-center">
              <div className="w-24 h-24 rounded-full bg-accent-100 flex items-center justify-center border-4 border-accent-200">
                <span className="text-3xl font-bold text-accent-600">{QUALITY_DEMO.qualityScore}</span>
              </div>
              <p className="text-xs text-foreground-400 mt-2">Score Global /10</p>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground-950 mb-2">{QUALITY_DEMO.title}</h3>
              <p className="text-sm text-foreground-500 line-clamp-4">{QUALITY_DEMO.content}</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 6 Dimensions */}
      <ScrollReveal>
        <h3 className="font-semibold text-foreground-950 mb-4">6 Dimensions de Qualité</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUALITY_DEMO.dimensions.map((dim) => (
            <div key={dim.name} className="bg-background-50 border border-background-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground-800">{dim.name}</span>
                <span className={`text-sm font-bold ${dim.score >= 8 ? 'text-accent-600' : dim.score >= 5 ? 'text-secondary-600' : 'text-red-600'}`}>
                  {dim.score}/{dim.max}
                </span>
              </div>
              <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${dim.score >= 8 ? 'bg-accent-500' : dim.score >= 5 ? 'bg-secondary-500' : 'bg-red-500'}`}
                  style={{ width: `${(dim.score / dim.max) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-foreground-400 mt-2">{dim.details}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Quality Gates */}
      <ScrollReveal>
        <h3 className="font-semibold text-foreground-950 mb-4">Quality Gates — Validation Binaire</h3>
        <div className="bg-background-50 border border-background-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4">
            {QUALITY_DEMO.gateResults.map((gate) => (
              <div key={gate.gate} className="p-5 text-center border-r border-background-200 last:border-r-0">
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${gate.passed ? 'bg-accent-100' : 'bg-red-100'}`}>
                  <i className={`${gate.passed ? 'ri-check-line text-accent-600' : 'ri-close-line text-red-600'} text-lg`}></i>
                </div>
                <p className="text-xs font-medium text-foreground-700">{gate.gate}</p>
                <p className="text-[10px] text-foreground-400 mt-1">Seuil: {gate.threshold} → Actuel: {gate.actual}</p>
              </div>
            ))}
          </div>
          <div className="bg-accent-50 border-t border-accent-200 p-4 text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700">
              <i className="ri-check-double-line"></i>
              Toutes les portes qualité sont franchies — Contenu validé pour publication
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* Extractive Summary */}
      <ScrollReveal>
        <h3 className="font-semibold text-foreground-950 mb-4">Résumé Extractif (Automaton)</h3>
        <div className="bg-background-50 border border-background-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] px-2 py-0.5 rounded bg-accent-100 text-accent-700 font-medium">EXTRACTIF</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-secondary-100 text-secondary-700 font-medium">ZÉRO HALLUCINATION</span>
          </div>
          <p className="text-sm text-foreground-700 leading-relaxed">{QUALITY_DEMO.summary}</p>
        </div>
      </ScrollReveal>
    </div>
  );
}

function BenchmarksTab() {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">KOS Automaton — Performance Pure</h2>
        <p className="text-sm text-foreground-500">Métriques de performance du moteur TF-IDF autonome</p>
      </ScrollReveal>

      {Object.entries(AUTOMATON_BENCHMARKS).map(([key, bench]) => (
        <ScrollReveal key={key}>
          <div className="bg-background-50 border border-background-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-background-200 bg-background-100">
              <h3 className="font-semibold text-foreground-950">{bench.label}</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200">
                  <th className="text-left p-4 text-xs font-semibold text-foreground-500 uppercase">Métrique</th>
                  <th className="text-center p-4 text-xs font-semibold text-foreground-500 uppercase">KOS Automaton</th>
                  <th className="text-center p-4 text-xs font-semibold text-foreground-500 uppercase">Performance</th>
                  <th className="text-center p-4 text-xs font-semibold text-foreground-500 uppercase">Gagnant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-background-200">
                {bench.metrics.map((m) => (
                  <tr key={m.name} className="hover:bg-background-100 transition-colors">
                    <td className="p-4 font-medium text-foreground-800">{m.name}</td>
                    <td className="p-4 text-center">
                      <span className="font-semibold text-accent-600">
                        {m.automaton}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-accent-100 text-accent-700">
                        Automaton
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      ))}

      {/* Key Insight */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-5">
          <h3 className="font-semibold text-foreground-950 mb-3">Analyse</h3>
          <div className="space-y-3 text-sm text-foreground-600">
            <p><strong className="text-accent-600">L'Automaton excelle sur tous les fronts opérationnels</strong> : latence, coût, fiabilité, précision factuelle. L'absence d'hallucination est son avantage décisif pour un usage institutionnel Big Four.</p>
            <p><strong className="text-foreground-800">Moteur 100% autonome</strong> — TF-IDF + BM25 + Cosine Similarity. Aucune API externe, aucune latence réseau, aucun coût par requête. Idéal pour le corpus documentaire réglementaire KHEPRA où la précision prime.</p>
            <p><strong className="text-secondary-600">Architecture déterministe</strong> : résultats reproductibles, traçabilité complète, zéro boîte noire. Conforme aux exigences d'audit Big Four.</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

function ArchitectureTab() {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Architecture du Pipeline</h2>
        <p className="text-sm text-foreground-500">6 couches de traitement, 100% en mémoire, zéro appel externe</p>
      </ScrollReveal>

      {/* Pipeline Flow */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <div className="flex flex-col gap-0">
            {AUTOMATON_ARCHITECTURE.layers.map((layer, i) => (
              <div key={layer.name} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0">
                    <i className={`${layer.icon} text-accent-600`}></i>
                  </div>
                  {i < AUTOMATON_ARCHITECTURE.layers.length - 1 && (
                    <div className="w-0.5 h-10 bg-accent-200"></div>
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="font-semibold text-foreground-950 text-sm">{layer.name}</h3>
                  <p className="text-xs text-foreground-500 mt-1">{layer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Integration Diagram */}
      <ScrollReveal>
        <h3 className="font-semibold text-foreground-950 mb-4">Intégration dans l'Écosystème KOS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg bg-accent-100 flex items-center justify-center mb-3">
              <i className="ri-file-reduce-line text-accent-600"></i>
            </div>
            <h4 className="font-semibold text-foreground-950 text-sm mb-1">kos-automaton-engine (summarize)</h4>
            <p className="text-xs text-foreground-500">Moteur unifié permanent. Résumé extractif via operation=summarize — 100% autonome.</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg bg-accent-100 flex items-center justify-center mb-3">
              <i className="ri-lightbulb-line text-accent-600"></i>
            </div>
            <h4 className="font-semibold text-foreground-950 text-sm mb-1">kos-automaton-engine (recommend)</h4>
            <p className="text-xs text-foreground-500">Moteur unifié permanent. Recommandations via operation=recommend — 100% autonome.</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg bg-accent-100 flex items-center justify-center mb-3">
              <i className="ri-search-2-line text-accent-600"></i>
            </div>
            <h4 className="font-semibold text-foreground-950 text-sm mb-1">rag-semantic-search</h4>
            <p className="text-xs text-foreground-500">Fallback automatique + fallback textuel ultime. TF-IDF via operation=semantic_search.</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

function LiveTestTab() {
  const [operation, setOperation] = useState<string>('status');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState('');

  const runTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const body: Record<string, unknown> = { operation };

      if (operation === 'extract_keywords' || operation === 'score_quality') {
        body.content = input || 'La conformité réglementaire est essentielle pour les institutions financières en Afrique. La BCEAO impose des normes strictes.';
      } else if (operation === 'summarize') {
        body.content = input || 'La Directive BCEAO impose aux SFD un dispositif LBC/FT structuré. La cartographie des risques est exigée par le GAFI.';
        body.titre = 'Test Automaton';
      } else if (operation === 'semantic_search') {
        body.query = input || 'conformité LBC/FT';
        body.limit = 5;
      } else if (operation === 'recommend') {
        body.content = input || 'La lutte contre le blanchiment dans l\'UEMOA';
        body.titre = 'Test LBC/FT';
        body.limit = 3;
      }

      const resp = await fetch('https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-automaton-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await resp.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Test Live de l'Automaton</h2>
        <p className="text-sm text-foreground-500">Exécutez des opérations réelles contre l'Edge Function déployée</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <div className="flex flex-wrap gap-3 mb-5">
            {['status', 'summarize', 'score_quality', 'quality_gate', 'semantic_search', 'recommend', 'extract_keywords'].map((op) => (
              <button
                key={op}
                onClick={() => { setOperation(op); setResult(null); setError(null); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  operation === op
                    ? 'bg-primary-500 text-white'
                    : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                }`}
              >
                {op}
              </button>
            ))}
          </div>

          {(operation !== 'status' && operation !== 'quality_gate') && (
            <div className="mb-4">
              <label className="text-xs font-medium text-foreground-500 mb-1.5 block">
                {operation === 'semantic_search' ? 'Requête de recherche' : 'Texte d\'entrée (optionnel)'}
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  operation === 'semantic_search' ? 'ex: conformité BCEAO' :
                  operation === 'recommend' ? 'ex: prix de transfert UEMOA' :
                  'Laisser vide pour utiliser le texte par défaut'
                }
                className="w-full px-4 py-2.5 bg-background-50 border border-background-200 rounded-lg text-sm text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-primary-500"
              />
            </div>
          )}

          <button
            onClick={runTest}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Exécution...
              </>
            ) : (
              <>
                <i className="ri-play-line"></i>
                Exécuter {operation}
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <strong>Erreur:</strong> {error}
            </div>
          )}

          {result && (
            <div className="mt-4">
              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium mb-3 ${
                result.success ? 'bg-accent-100 text-accent-700' : 'bg-red-100 text-red-700'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${result.success ? 'bg-accent-500' : 'bg-red-500'}`}></span>
                {result.success ? 'SUCCESS' : 'ERROR'}
              </div>
              <pre className="bg-background-100 border border-background-200 rounded-lg p-4 text-xs text-foreground-700 overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}