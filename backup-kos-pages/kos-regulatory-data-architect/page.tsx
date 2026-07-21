import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSRegulatoryDataArchitect } from '@/hooks/useKOSRegulatoryDataArchitect';
import type { ArchitectureDeliverable } from '@/mocks/regulatoryDataArchitect';

type OutputTab = 'entities' | 'graph' | 'pgvector' | 'scoring' | 'inspection' | 'n8n' | 'agents' | 'reports' | 'principles';

const COMPLEXITY_STYLES: Record<string, string> = {
  'Haute': 'bg-amber-100 text-amber-700 border-amber-200',
  'Très Haute': 'bg-red-100 text-red-700 border-red-200',
  'Maximale': 'bg-red-200 text-red-800 border-red-300',
};

const TYPE_STYLES: Record<string, string> = {
  'Banque': 'bg-foreground-900 text-white',
  'EMF': 'bg-amber-500 text-white',
  'FinTech': 'bg-violet-500 text-white',
  'Multi-Juridictionnel': 'bg-emerald-600 text-white',
};

export default function regulatoryDataArchitectPage() {
  const {
    scenarios,
    agents,
    kpis,
    selectedDeliverable,
    processing,
    error,
    selectScenario,
  } = useKOSRegulatoryDataArchitect();

  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>('entities');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');

  const handleSelect = (id: string) => {
    setSelectedScenarioId(id);
    selectScenario(id);
    setActiveOutputTab('entities');
  };

  const outputTabs: { id: OutputTab; label: string; icon: string; count?: string }[] = [
    { id: 'entities', label: '1. Core Entities', icon: 'ri-database-2-line', count: selectedDeliverable ? String(selectedDeliverable.section1.total_tables) : undefined },
    { id: 'graph', label: '2. Knowledge Graph', icon: 'ri-git-branch-line', count: selectedDeliverable ? String(selectedDeliverable.section2.graph_stats.noeuds) : undefined },
    { id: 'pgvector', label: '3. pgVector', icon: 'ri-search-eye-line', count: selectedDeliverable ? `${selectedDeliverable.section3.benchmark.latence_ms}ms` : undefined },
    { id: 'scoring', label: '4. Scoring Engine', icon: 'ri-bar-chart-2-line', count: selectedDeliverable ? String(selectedDeliverable.section4.formules.length) : undefined },
    { id: 'inspection', label: '5. Inspection Sim', icon: 'ri-shield-check-line', count: selectedDeliverable ? String(selectedDeliverable.section5.modeles_inspection.length) : undefined },
    { id: 'n8n', label: '6. n8n Orchestration', icon: 'ri-node-tree', count: selectedDeliverable ? String(selectedDeliverable.section6.workflows.length) : undefined },
    { id: 'agents', label: '7. AI Agents', icon: 'ri-robot-2-line', count: selectedDeliverable ? String(selectedDeliverable.section7.agents.length) : undefined },
    { id: 'reports', label: '8. Reports Factory', icon: 'ri-file-text-line', count: selectedDeliverable ? String(selectedDeliverable.section8.total_rapports) : undefined },
    { id: 'principles', label: '9. Principles', icon: 'ri-scales-line', count: selectedDeliverable ? String(selectedDeliverable.section9.principes.length) : undefined },
  ];

  const agentStats = useMemo(() => ({
    total: agents.length,
    active: agents.filter(a => a.statut === 'active').length,
  }), [agents]);

  return (
    <hubLayout hubId={115}>
      <SeoHead
        title="KOS Regulatory Data Architect™ — Architecture de Données Réglementaires Big Four | KHEPRA EXPERTS"
        description="Architecture complète de données réglementaires : schémas PostgreSQL, Knowledge Graph, pgVector, Scoring Engine, Inspection Simulation, n8n Orchestration, AI Agents, Reporting Factory. COBAC, BCEAO, BEAC, GABAC, GAFI."
        keywords="regulatory data architect, architecture données réglementaires, PostgreSQL regulatory schema, knowledge graph compliance, pgVector search, compliance scoring engine, inspection simulation COBAC"
        canonicalPath="/kos-regulatory-data-architect"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20data%20architecture%20blueprint%20with%20regulatory%20compliance%20schema%20diagrams%20flowing%20across%20a%20dark%20technological%20grid%2C%20interconnected%20database%20nodes%20with%20glowing%20amber%20and%20teal%20connections%2C%20Big%20Four%20institutional%20data%20governance%20aesthetic%2C%20enterprise%20knowledge%20graph%20visualization%20with%20geometric%20precision&width=1920&height=520&seq=kos-rda-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top opacity-10"
            width={1920}
            height={520}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/70 via-foreground-950/85 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-400/30 backdrop-blur-sm">
                <i className="ri-database-2-line text-teal-400 text-sm" />
                <span className="text-sm font-semibold text-teal-300 uppercase tracking-wider">Regulatory Data Architect™ — Big Four Schema</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">{agentStats.active}/{agentStats.total} Data Agents</span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Regulatory Data Architect.
              <span className="block text-teal-400 mt-2">9 Sections — Schema-to-Report Architecture</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              Architecture complète de données réglementaires — <strong className="text-white">{kpis.tables_schema} tables</strong> normalisées, <strong className="text-teal-400">{kpis.relations_knowledge_graph} relations</strong> Knowledge Graph, <strong className="text-amber-400">{kpis.chunks_vectorises} chunks</strong> vectorisés, <strong className="text-teal-400">{kpis.agents_ia} agents IA</strong> spécialisés, <strong className="text-amber-400">{kpis.rapports_auto} rapports</strong> auto-générés.
            </p>
          </div>
        </div>
      </section>

      {/* Section Flow */}
      <section className="py-3 bg-teal-50 border-b border-teal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {outputTabs.map((tab, i) => (
              <div key={tab.id} className="flex items-center gap-1 flex-shrink-0">
                <span className="text-[10px] px-2 py-1 rounded-full bg-white border border-teal-200 text-foreground-700 font-bold whitespace-nowrap">{i + 1}. {tab.label}</span>
                {i < outputTabs.length - 1 && <i className="ri-arrow-right-line text-teal-400 text-xs flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Banner */}
      <section className="py-3 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            {agents.map(agent => (
              <div key={agent.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-background-200 whitespace-nowrap flex-shrink-0">
                <i className={`${agent.icon} text-teal-600 text-sm`} />
                <span className="text-xs font-bold text-foreground-800">{agent.nom}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" title="Actif" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenario Selector */}
      <section className="py-8 sm:py-10 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Sélectionnez l'institution pour l'architecture de données réglementaires</h2>
            <p className="text-sm text-foreground-500">4 architectures — de l'EMF UEMOA au Groupe Panafricain Multi-Juridictionnel</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => handleSelect(scenario.id)}
                disabled={processing}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${selectedScenarioId === scenario.id && selectedDeliverable ? 'border-teal-300 bg-teal-50/60 ring-2 ring-teal-200' : 'border-background-200 bg-white hover:border-teal-200 hover:bg-teal-50/30'} ${processing ? 'opacity-60 pointer-events-none' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${scenario.complexite === 'Maximale' ? 'bg-red-100 text-red-700' : scenario.complexite === 'Très Haute' ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'}`}>
                    <span className="text-sm font-black">{scenario.complexite === 'Maximale' ? 'M' : scenario.complexite === 'Très Haute' ? 'TH' : 'H'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TYPE_STYLES[scenario.type_institution] || 'bg-background-100 text-foreground-500 border border-background-200'} whitespace-nowrap`}>{scenario.type_institution}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{scenario.zone.split('—')[0].trim()}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${COMPLEXITY_STYLES[scenario.complexite] || 'bg-background-100 text-foreground-500 border border-background-200'} whitespace-nowrap`}>{scenario.complexite}</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950 mb-1">{scenario.nom_institution}</h3>
                    <p className="text-[11px] text-foreground-500 line-clamp-2 mb-2">{scenario.description}</p>
                    <div className="flex items-center gap-2 flex-wrap text-[11px]">
                      <span className="font-bold text-foreground-700">{scenario.nb_entites_reglementaires} entités</span>
                      <span className="text-foreground-400">•</span>
                      <span className="font-bold text-foreground-700">{scenario.nb_obligations_maitrisees} obligations</span>
                      <span className="text-foreground-400">•</span>
                      <span className="font-bold text-teal-600">Score Archi: {scenario.score_architecture}/100</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {scenario.autorites.slice(0, 4).map(a => (
                        <span key={a} className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-mono whitespace-nowrap">{a}</span>
                      ))}
                      {scenario.autorites.length > 4 && <span className="text-[9px] text-foreground-400">+{scenario.autorites.length - 4}</span>}
                    </div>
                  </div>
                  {processing && selectedScenarioId === scenario.id ? (
                    <div className="w-6 h-6 border-2 border-teal-300 border-t-teal-600 rounded-full animate-spin flex-shrink-0 mt-2" />
                  ) : (
                    <i className="ri-arrow-right-line text-foreground-400 text-lg flex-shrink-0 mt-2" />
                  )}
                </div>
              </button>
            ))}
          </div>
          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <i className="ri-error-warning-line text-red-600 text-lg flex-shrink-0 mt-0.5" />
              <span className="text-sm font-bold text-red-700">{error}</span>
            </div>
          )}
        </div>
      </section>

      {/* Processing */}
      {processing && (
        <section className="py-12 bg-teal-50/50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 mx-auto mb-5 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
            <p className="text-sm font-bold text-foreground-800 mb-4">KOS Regulatory Data Architect™ — Génération du modèle en cours...</p>
            <div className="grid grid-cols-3 gap-2">
              {outputTabs.map((tab, i) => (
                <div key={tab.id} className="flex items-center gap-1.5 justify-center text-[10px] text-foreground-500">
                  <span className="w-4 h-4 rounded-full bg-teal-200 flex items-center justify-center text-[8px] font-black text-teal-700">{i + 1}</span>
                  {tab.label.replace(/^\d+\.\s/, '')}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Output Section */}
      {selectedDeliverable && !processing && (
        <>
          {/* Output Tabs */}
          <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex gap-1 overflow-x-auto py-3">
                {outputTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveOutputTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${activeOutputTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'}`}
                  >
                    <i className={`${tab.icon} text-base`} />
                    {tab.label}
                    {tab.count && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeOutputTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>{tab.count}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Metadata Bar */}
          <section className="py-4 bg-background-50 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-foreground-600">
                  <i className="ri-database-2-line text-teal-600" />
                  <span className="font-bold">{selectedDeliverable.metadata.arch_id}</span>
                </span>
                <span className="flex items-center gap-1.5 text-foreground-500">
                  <i className="ri-calendar-line" />
                  Modèle : {selectedDeliverable.metadata.date_modele}
                </span>
                <span className="flex items-center gap-1.5 text-foreground-500">
                  <i className="ri-git-branch-line" />
                  v{selectedDeliverable.metadata.version_schema}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-teal-600">
                  <i className="ri-check-double-line" />
                  Couverture : {selectedDeliverable.metadata.couverture_reglementaire_pct}%
                </span>
              </div>
            </div>
          </section>

          {/* ═══════════ 1. CORE REGULATORY ENTITIES ═══════════ */}
          {activeOutputTab === 'entities' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Core Regulatory Entities — Schémas PostgreSQL</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.section1.total_tables} tables normalisées — {selectedDeliverable.section1.total_colonnes} colonnes — {selectedDeliverable.section1.total_relations} relations</p>
                </div>

                <div className="space-y-5">
                  {selectedDeliverable.section1.schemas.map(schema => (
                    <div key={schema.nom_table} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                      <div className="p-4 sm:p-5 border-b border-background-100 bg-teal-50/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                            <i className="ri-database-2-line text-teal-600 text-lg" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-foreground-950 font-mono">{schema.nom_table}</h3>
                            <span className="text-[10px] text-foreground-500">{schema.colonnes.length} colonnes • {schema.index.length} index • {schema.relations.length} relations</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 sm:p-5">
                        <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-3">Colonnes</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="border-b border-background-100">
                                <th className="py-2 pr-3 text-[10px] font-bold text-foreground-500 whitespace-nowrap">Colonne</th>
                                <th className="py-2 pr-3 text-[10px] font-bold text-foreground-500 whitespace-nowrap">Type</th>
                                <th className="py-2 pr-3 text-[10px] font-bold text-foreground-500 whitespace-nowrap">Contrainte</th>
                                <th className="py-2 text-[10px] font-bold text-foreground-500 whitespace-nowrap">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {schema.colonnes.map(col => (
                                <tr key={col.nom} className="border-b border-background-50 hover:bg-teal-50/30">
                                  <td className="py-1.5 pr-3 text-[11px] font-mono font-bold text-foreground-800 whitespace-nowrap">{col.nom}</td>
                                  <td className="py-1.5 pr-3 text-[10px] font-mono text-foreground-600 whitespace-nowrap max-w-[200px] truncate">{col.type}</td>
                                  <td className="py-1.5 pr-3 text-[10px] text-foreground-500">{col.contrainte || '-'}</td>
                                  <td className="py-1.5 text-[10px] text-foreground-600">{col.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {schema.index.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-2">Index</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {schema.index.map(idx => (
                                <span key={idx.nom} className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-mono">
                                  {idx.nom} ({idx.type})
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {schema.relations.length > 0 && (
                          <div className="mt-3">
                            <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-2">Relations</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {schema.relations.map((rel, i) => (
                                <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200">
                                  → {rel.cible} ({rel.type})
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* SQL DDL Preview */}
                      {selectedDeliverable.section1.sql_ddl_preview[schema.nom_table] && (
                        <details className="group border-t border-background-100">
                          <summary className="p-3 text-[10px] font-bold text-teal-600 cursor-pointer flex items-center gap-1 hover:bg-teal-50/30">
                            <i className="ri-code-line text-[9px]" /> SQL DDL Preview
                          </summary>
                          <div className="p-3">
                            <pre className="text-[10px] font-mono text-foreground-700 bg-background-50 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                              {selectedDeliverable.section1.sql_ddl_preview[schema.nom_table]}
                            </pre>
                          </div>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 2. KNOWLEDGE GRAPH ═══════════ */}
          {activeOutputTab === 'graph' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Knowledge Graph Model</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.section2.graph_stats.noeuds} nœuds — {selectedDeliverable.section2.graph_stats.relations_count} relations — {selectedDeliverable.section2.graph_stats.types_relations} types de relations</p>
                </div>

                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Relations du Knowledge Graph</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.section2.relations.map((rel, i) => (
                      <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-100 flex items-center gap-4">
                        <div className="flex items-center gap-2 flex-shrink-0 min-w-[280px]">
                          <span className="text-[11px] font-bold text-foreground-900 font-mono bg-teal-100 px-2 py-0.5 rounded">{rel.source}</span>
                          <i className="ri-arrow-right-line text-teal-500 text-sm" />
                          <span className="text-[11px] font-bold text-teal-700 font-mono">{rel.relation}</span>
                          <i className="ri-arrow-right-line text-teal-500 text-sm" />
                          <span className="text-[11px] font-bold text-foreground-900 font-mono bg-amber-100 px-2 py-0.5 rounded">{rel.cible}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-foreground-600 block">{rel.description}</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 font-mono">{rel.cardinalite}</span>
                            {rel.properties.map(p => (
                              <span key={p} className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 font-mono">{p}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cypher Queries */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Requêtes Cypher — Exemples de Traversée</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.section2.requetes_cypher_examples.map((q, i) => (
                      <div key={i} className="p-3 rounded-lg bg-foreground-950 text-emerald-400 font-mono text-[10px] overflow-x-auto whitespace-pre-wrap">
                        {q}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 3. PGVECTOR ═══════════ */}
          {activeOutputTab === 'pgvector' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">pgVector Architecture — Recherche Vectorielle Réglementaire</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.section3.schema_vecteur.colonnes.length} colonnes — Index {selectedDeliverable.section3.schema_vecteur.index_vecteur.type} — {selectedDeliverable.section3.benchmark.requetes_seconde} req/s — Précision Top-5 : {selectedDeliverable.section3.benchmark.precision_top5}%</p>
                </div>

                {/* Vector Schema */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Table : {selectedDeliverable.section3.schema_vecteur.nom_table}</h3>
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-background-100">
                          <th className="py-2 pr-3 text-[10px] font-bold text-foreground-500">Colonne</th>
                          <th className="py-2 pr-3 text-[10px] font-bold text-foreground-500">Type</th>
                          <th className="py-2 text-[10px] font-bold text-foreground-500">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDeliverable.section3.schema_vecteur.colonnes.map(col => (
                          <tr key={col.nom} className="border-b border-background-50">
                            <td className="py-1.5 pr-3 text-[11px] font-mono font-bold text-foreground-800 whitespace-nowrap">{col.nom}</td>
                            <td className="py-1.5 pr-3 text-[10px] font-mono text-foreground-600 whitespace-nowrap">{col.type}</td>
                            <td className="py-1.5 text-[10px] text-foreground-600">{col.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Indexation Parameters */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Paramètres d'Indexation</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {Object.entries(selectedDeliverable.section3.parametres_indexation).map(([k, v]) => (
                      <div key={k} className="p-3 rounded-lg bg-background-50 border border-background-100">
                        <span className="text-[9px] text-foreground-400 block">{k}</span>
                        <span className="text-[11px] font-bold text-foreground-800">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fonctions SQL */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Fonctions SQL Vectorielles</h3>
                  <div className="space-y-1.5">
                    {selectedDeliverable.section3.fonctions_sql.map((fn, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-foreground-950 text-emerald-400 font-mono text-[10px] overflow-x-auto whitespace-nowrap">
                        {fn}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requêtes supportées */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Requêtes Supportées</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.section3.schema_vecteur.requetes_supportees.map((rq, i) => (
                      <div key={i} className="p-3 rounded-lg bg-background-50 border border-background-100 flex items-start gap-2">
                        <i className="ri-checkbox-circle-line text-teal-500 text-sm flex-shrink-0 mt-0.5" />
                        <span className="text-[11px] text-foreground-700 font-mono">{rq}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benchmark */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-background-200 text-center">
                    <span className="text-[10px] text-foreground-400 block mb-1">Requêtes/seconde</span>
                    <span className="text-3xl font-black text-teal-600">{selectedDeliverable.section3.benchmark.requetes_seconde}</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-background-200 text-center">
                    <span className="text-[10px] text-foreground-400 block mb-1">Précision Top-5</span>
                    <span className="text-3xl font-black text-teal-600">{selectedDeliverable.section3.benchmark.precision_top5}%</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-background-200 text-center">
                    <span className="text-[10px] text-foreground-400 block mb-1">Latence Moyenne</span>
                    <span className="text-3xl font-black text-teal-600">{selectedDeliverable.section3.benchmark.latence_ms}ms</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 4. COMPLIANCE SCORING ENGINE ═══════════ */}
          {activeOutputTab === 'scoring' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Compliance Scoring Engine</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.section4.formules.length} formules de scoring — 5 axes pondérés</p>
                </div>

                {/* Score Institution */}
                {selectedDeliverable.section4.tables_scores.length > 0 && (
                  <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Scores — {selectedDeliverable.section4.tables_scores[0].institution}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {selectedDeliverable.section4.tables_scores[0] && (() => {
                        const sc = selectedDeliverable.section4.tables_scores[0];
                        const items = [
                          { label: 'Global', value: sc.score_global },
                          { label: 'Gouvernance', value: sc.score_gouvernance },
                          { label: 'AML/CFT', value: sc.score_aml },
                          { label: 'Risque', value: sc.score_risque },
                          { label: 'IT', value: sc.score_it },
                          { label: 'Audit', value: sc.score_audit },
                        ];
                        return items.map(item => {
                          const color = item.value >= 85 ? 'emerald' : item.value >= 70 ? 'sky' : item.value >= 55 ? 'amber' : 'red';
                          return (
                            <div key={item.label} className={`p-4 rounded-xl border text-center ${color === 'emerald' ? 'bg-emerald-50 border-emerald-200' : color === 'sky' ? 'bg-sky-50 border-sky-200' : color === 'amber' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                              <span className="text-[9px] font-bold uppercase tracking-wider block mb-1">{item.label}</span>
                              <span className={`text-2xl font-black ${color === 'emerald' ? 'text-emerald-600' : color === 'sky' ? 'text-sky-600' : color === 'amber' ? 'text-amber-600' : 'text-red-600'}`}>{item.value}</span>
                            </div>
                          );
                        });
                      })()}
                    </div>
                    {selectedDeliverable.section4.tables_scores[0] && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-foreground-500">Classification :</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${selectedDeliverable.section4.tables_scores[0].classification === 'Excellent' || selectedDeliverable.section4.tables_scores[0].classification === 'Satisfaisant' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : selectedDeliverable.section4.tables_scores[0].classification === 'Insuffisant' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                          {selectedDeliverable.section4.tables_scores[0].classification}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Formulas */}
                <div className="space-y-5">
                  {selectedDeliverable.section4.formules.map(formula => (
                    <div key={formula.id} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-mono text-teal-600 font-bold">{formula.id}</span>
                        <h3 className="text-sm font-bold text-foreground-950">{formula.nom}</h3>
                      </div>

                      <div className="p-3 rounded-lg bg-foreground-950 text-teal-400 font-mono text-[10px] mb-4 overflow-x-auto whitespace-pre-wrap">
                        {formula.formule}
                      </div>

                      {/* Variables */}
                      <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-2">Variables</h4>
                      <div className="space-y-1 mb-4">
                        {formula.variables.map(v => (
                          <div key={v.nom} className="flex items-center gap-2 text-[11px]">
                            <span className="font-mono font-bold text-teal-700">{v.nom}</span>
                            <span className="text-foreground-500">= {v.description}</span>
                          </div>
                        ))}
                      </div>

                      {/* Thresholds */}
                      <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-2">Seuils de Classification</h4>
                      <div className="flex flex-wrap gap-2">
                        {formula.seuils.map(s => (
                          <span key={s.label} className={`text-[10px] px-2.5 py-1 rounded-full border font-bold ${s.couleur === 'emerald' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : s.couleur === 'sky' ? 'bg-sky-100 text-sky-700 border-sky-200' : s.couleur === 'amber' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                            {s.min}-{s.max} : {s.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 5. INSPECTION SIMULATION ═══════════ */}
          {activeOutputTab === 'inspection' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Inspection Simulation Engine</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.section5.modeles_inspection.length} modèles d'inspection — Score Readiness : <span className={`font-bold ${selectedDeliverable.section5.score_readiness >= 80 ? 'text-emerald-600' : selectedDeliverable.section5.score_readiness >= 60 ? 'text-sky-600' : selectedDeliverable.section5.score_readiness >= 40 ? 'text-amber-600' : 'text-red-600'}`}>{selectedDeliverable.section5.score_readiness}/100</span></p>
                </div>

                {selectedDeliverable.section5.modeles_inspection.map(modele => (
                  <div key={modele.autorite} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                        <i className="ri-shield-check-line text-red-600 text-lg" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950">{modele.autorite}</h3>
                        <span className="text-[10px] text-foreground-500">{modele.phases.length} phases — {modele.questions_inspection.length} questions d'inspection</span>
                      </div>
                    </div>

                    {/* Phases */}
                    <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-3">Phases d'Inspection</h4>
                    <div className="space-y-2 mb-5">
                      {modele.phases.map(phase => (
                        <div key={phase.etape} className="p-3 rounded-xl bg-background-50 border border-background-100">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-foreground-400">Étape {phase.etape}</span>
                            <span className="text-[11px] font-bold text-foreground-800">{phase.nom}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">{phase.duree_j}j</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="font-bold text-foreground-400 block mb-0.5">Actions</span>
                              {phase.actions.map((a, i) => (
                                <div key={i} className="flex items-center gap-1 text-foreground-600"><i className="ri-arrow-right-line text-teal-500 text-[9px]" />{a}</div>
                              ))}
                            </div>
                            <div>
                              <span className="font-bold text-foreground-400 block mb-0.5">Livrables</span>
                              {phase.livrables.map((l, i) => (
                                <div key={i} className="flex items-center gap-1 text-foreground-600"><i className="ri-checkbox-circle-line text-emerald-500 text-[9px]" />{l}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Questions */}
                    <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-3">Questions d'Inspection</h4>
                    <div className="space-y-2">
                      {modele.questions_inspection.map(q => (
                        <div key={q.ref} className={`p-3 rounded-xl border ${q.criticite === 'Critique' ? 'bg-red-50/30 border-red-200' : q.criticite === 'Élevé' ? 'bg-amber-50/30 border-amber-200' : 'bg-sky-50/30 border-sky-200'}`}>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-[10px] font-mono text-foreground-400">{q.ref}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${q.criticite === 'Critique' ? 'bg-red-100 text-red-700 border-red-200' : q.criticite === 'Élevé' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-sky-100 text-sky-700 border-sky-200'}`}>{q.criticite}</span>
                            <span className="text-[10px] text-foreground-500">{q.domaine}</span>
                          </div>
                          <p className="text-xs font-bold text-foreground-800 mb-1">{q.question}</p>
                          <p className="text-[10px] text-foreground-500">
                            <i className="ri-file-search-line text-[9px]" /> Evidence : {q.evidence_attendue}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══════════ 6. N8N ORCHESTRATION ═══════════ */}
          {activeOutputTab === 'n8n' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">n8n Orchestration Model</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.section6.workflows.length} workflows — Couverture processus : {selectedDeliverable.section6.couverture_processus_pct}%</p>
                </div>

                <div className="space-y-5">
                  {selectedDeliverable.section6.workflows.map(wf => (
                    <div key={wf.id} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                          <i className="ri-node-tree text-violet-600 text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-sm font-bold text-foreground-950">{wf.nom}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${wf.score_automatisation >= 90 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>{wf.score_automatisation}% auto</span>
                            <span className="text-[9px] text-foreground-400">~{wf.temps_execution_estime_s}s</span>
                          </div>
                          <div className="text-[11px] text-foreground-600 mb-2">
                            <i className="ri-flashlight-line text-amber-500 text-[9px]" /> {wf.declencheur}
                          </div>
                        </div>
                      </div>

                      {/* Nodes flow */}
                      <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-3">Nœuds du Workflow ({wf.noeuds.length})</h4>
                      <div className="space-y-1.5">
                        {wf.noeuds.map(node => (
                          <div key={node.id} className="flex items-center gap-2 p-2 rounded-lg bg-background-50 border border-background-100">
                            <span className="text-[10px] font-mono font-bold text-violet-600 w-8">{node.id}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 font-bold">{node.type}</span>
                            <span className="text-[11px] text-foreground-700">{node.action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 7. AI AGENTS ═══════════ */}
          {activeOutputTab === 'agents' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">AI Agent Architecture — 6 Agents Spécialisés</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.section7.agents.length} agents — {selectedDeliverable.section7.orchestration.substring(0, 120)}...</p>
                </div>

                <div className="space-y-5">
                  {selectedDeliverable.section7.agents.map(agent => (
                    <div key={agent.id} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <i className="ri-robot-2-line text-teal-600 text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-sm font-bold text-foreground-950">{agent.nom}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200">{agent.modele}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${agent.confidence_minimale >= 90 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>Confiance ≥{agent.confidence_minimale}%</span>
                          </div>
                          <p className="text-[11px] text-foreground-600 mb-2">{agent.mission}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-2">Inputs</h4>
                          <div className="space-y-1">
                            {agent.inputs.map((inp, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[11px] text-foreground-700">
                                <i className="ri-arrow-right-down-line text-teal-500 text-[9px]" />{inp}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-2">Outputs</h4>
                          <div className="space-y-1">
                            {agent.outputs.map((out, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[11px] text-foreground-700">
                                <i className="ri-arrow-right-up-line text-amber-500 text-[9px]" />{out}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Decision Logic */}
                      <div className="mt-3">
                        <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-2">Logique de Décision</h4>
                        <div className="space-y-1">
                          {agent.decision_logic.map((dl, i) => (
                            <div key={i} className="text-[10px] text-foreground-600 bg-background-50 p-1.5 rounded border border-background-100 font-mono">{dl}</div>
                          ))}
                        </div>
                      </div>

                      {/* Escalation */}
                      <div className="mt-3">
                        <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-2">Règles d'Escalade</h4>
                        <div className="space-y-1">
                          {agent.regles_escalade.map((esc, i) => (
                            <div key={i} className="flex items-start gap-2 p-1.5 rounded bg-red-50/50 border border-red-100 text-[10px]">
                              <i className="ri-alert-line text-red-500 text-xs flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-red-700">SI {esc.condition}</span>
                                <span className="text-red-600 block">→ {esc.action}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Orchestration */}
                <div className="mt-5 rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Orchestration Inter-Agents</h3>
                  <p className="text-[11px] text-foreground-600 leading-relaxed">{selectedDeliverable.section7.orchestration}</p>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 8. REPORTING FACTORY ═══════════ */}
          {activeOutputTab === 'reports' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Reporting Factory — {selectedDeliverable.section8.total_rapports} Rapports Automatiques</h2>
                  <p className="text-sm text-foreground-500">Chaque rapport : regulator-ready, board-ready, auditable, machine-generated</p>
                </div>

                <div className="space-y-4">
                  {selectedDeliverable.section8.rapports.map(rpt => (
                    <div key={rpt.id} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <i className="ri-file-text-line text-teal-600 text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-sm font-bold text-foreground-950">{rpt.nom}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${rpt.format === 'Dashboard' ? 'bg-violet-100 text-violet-700 border-violet-200' : rpt.format === 'PDF' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>{rpt.format}</span>
                            <span className="text-[10px] text-foreground-500">{rpt.frequence}</span>
                          </div>
                          <p className="text-[11px] text-foreground-600">
                            <i className="ri-user-line text-[9px]" /> Destinataire : <strong>{rpt.destinataire}</strong>
                          </p>
                        </div>
                      </div>

                      {/* Sections */}
                      <h4 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-2">Sections ({rpt.sections.length})</h4>
                      <div className="space-y-1.5">
                        {rpt.sections.map(sec => (
                          <div key={sec.numero} className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-black text-foreground-400">{sec.numero}.</span>
                              <span className="text-[11px] font-bold text-foreground-800">{sec.titre}</span>
                              <span className="text-[9px] text-foreground-400">[{sec.contenu_type}]</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {sec.sources_donnees.map(src => (
                                <span key={src} className="text-[8px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 font-mono">{src}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 9. KOS DESIGN PRINCIPLES ═══════════ */}
          {activeOutputTab === 'principles' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">KOS Design Principles — {selectedDeliverable.section9.principes.length} Principes Fondateurs</h2>
                  <p className="text-sm text-foreground-500">Taux de traçabilité garanti : <span className="font-bold text-teal-600">{selectedDeliverable.section9.taux_tracabilite}%</span></p>
                </div>

                <div className="space-y-4">
                  {selectedDeliverable.section9.principes.map(p => (
                    <div key={p.id} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-black text-teal-700">{p.id.split('-')[1]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-foreground-950 mb-1">{p.principe}</h3>
                          <p className="text-[11px] text-foreground-600 mb-3">{p.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                          <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">Règle d'Implémentation</span>
                          <span className="text-[11px] text-emerald-800">{p.regle_implementation}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-red-50 border border-red-100">
                          <span className="text-[9px] font-bold text-red-600 uppercase tracking-wider block mb-1">Conséquence en Cas de Violation</span>
                          <span className="text-[11px] text-red-800">{p.violation_consequence}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Scope Réglementaire Footer */}
          <section className="py-6 bg-background-50 border-t border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider block mb-2">Autorités Couvertes</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDeliverable.scenario.autorites.map(a => (
                  <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-mono">{a}</span>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Empty State */}
      {!selectedDeliverable && !processing && !error && (
        <section className="py-20 text-center">
          <div className="max-w-md mx-auto px-4">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-teal-50 flex items-center justify-center">
              <i className="ri-database-2-line text-teal-500 text-3xl" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Architecture de Données Réglementaires Prête</h2>
            <p className="text-sm text-foreground-500">Sélectionnez une institution ci-dessus pour explorer l'architecture complète : 9 sections, des schémas PostgreSQL aux principes de conception Big Four.</p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-5">
              {outputTabs.map(tab => (
                <span key={tab.id} className="text-[10px] px-2.5 py-1 rounded-full bg-background-100 text-foreground-500 border border-background-200">
                  {tab.label}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ecosystem Cross-Links */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Compliance Architecture — Accès Rapide</h2>
            <p className="text-foreground-600">Navigation vers les modules connectés du KOS Regulatory Data Architect.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Regulatory Data Architect', path: '/kos-regulatory-data-architect', icon: 'ri-database-2-line', color: '#0D9488', current: true },
              { label: 'Compliance Pipeline', path: '/kos-autonomous-compliance-pipeline', icon: 'ri-flow-chart', color: '#D97706' },
              { label: 'Compliance Factory', path: '/kos-compliance-factory-engine', icon: 'ri-building-2-line', color: '#059669' },
              { label: 'Risk KRI Heatmap', path: '/kos-risk-kri-heatmap', icon: 'ri-bar-chart-line', color: '#DC2626' },
              { label: 'Regulatory Brain', path: '/kos-regulatory-brain', icon: 'ri-brain-line', color: '#D97757' },
              { label: 'Senior Compliance Auditor', path: '/kos-senior-compliance-auditor', icon: 'ri-shield-check-line', color: '#DC2626' },
              { label: 'Website Automation', path: '/kos-website-automation-engine', icon: 'ri-global-line', color: '#0D9488' },
              { label: 'KOS Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#0D7B5F' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${link.current ? 'border-teal-300 bg-teal-50/40 ring-2 ring-teal-400' : 'border-background-200 bg-white hover:border-teal-200'}`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && <span className="block text-[10px] text-teal-700 font-bold mt-1">Vous êtes ici</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





