import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSComplianceFactoryEngine } from '@/hooks/useKOSComplianceFactoryEngine';
import type { ComplianceDeliverable } from '@/mocks/complianceFactoryEngine';

type OutputTab = 'governance' | 'risks' | 'policies' | 'controls' | 'readiness' | 'n8n' | 'report';

const STATUT_POLICY_STYLES: Record<string, string> = {
  'Actif': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'En révision': 'bg-amber-50 text-amber-700 border-amber-200',
  'À créer': 'bg-red-50 text-red-700 border-red-200',
};

const CATEGORIE_STYLES: Record<string, string> = {
  'LBC/FT': 'bg-amber-100 text-amber-800 border-amber-200',
  'Risques': 'bg-sky-100 text-sky-800 border-sky-200',
  'Contrôle Interne': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'SI/Sécurité': 'bg-violet-100 text-violet-800 border-violet-200',
  'Gouvernance': 'bg-foreground-100 text-foreground-700 border-foreground-200',
  'ESG': 'bg-teal-100 text-teal-800 border-teal-200',
};

export default function complianceFactoryEnginePage() {
  const {
    scenarios,
    agents,
    kpis,
    selectedDeliverable,
    processing,
    error,
    selectScenario,
  } = useKOSComplianceFactoryEngine();

  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>('governance');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');

  const handleSelect = (id: string) => {
    setSelectedScenarioId(id);
    selectScenario(id);
    setActiveOutputTab('governance');
  };

  const outputTabs: { id: OutputTab; label: string; icon: string; count?: string }[] = [
    { id: 'governance', label: '1. Gouvernance', icon: 'ri-organization-chart', count: selectedDeliverable ? String(selectedDeliverable.governance_framework.chartes.length) : undefined },
    { id: 'risks', label: '2. Cartographie Risques', icon: 'ri-radar-line', count: selectedDeliverable ? String(selectedDeliverable.risk_map.risques.length) : undefined },
    { id: 'policies', label: '3. Politiques', icon: 'ri-file-text-line', count: selectedDeliverable ? String(selectedDeliverable.policies_pack.length) : undefined },
    { id: 'controls', label: '4. Matrice Contrôle', icon: 'ri-table-line', count: selectedDeliverable ? String(selectedDeliverable.control_matrix.domaines.reduce((s, d) => s + d.controles.length, 0)) : undefined },
    { id: 'readiness', label: '5. Audit Readiness', icon: 'ri-clipboard-line' },
    { id: 'n8n', label: '6. Workflows n8n', icon: 'ri-flow-chart', count: selectedDeliverable ? String(selectedDeliverable.n8n_workflows.length) : undefined },
    { id: 'report', label: '7. Rapport Client', icon: 'ri-article-line' },
  ];

  const agentStats = useMemo(() => ({
    total: agents.length,
    active: agents.filter(a => a.statut === 'active').length,
  }), [agents]);

  const getMatColor = (niveau: string): string => {
    if (niveau === 'Élevé') return 'text-emerald-600 bg-emerald-50';
    if (niveau === 'Moyen') return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getTypeColor = (type: string): string => {
    if (type === 'Banque') return 'bg-foreground-900 text-white';
    if (type === 'FinTech') return 'bg-violet-500 text-white';
    if (type === 'Multi-entité') return 'bg-emerald-600 text-white';
    return 'bg-amber-500 text-white';
  };

  return (
    <hubLayout hubId={112}>
      <SeoHead
        title="KOS Compliance Factory Engine™ — Usine de Conformité Automatisée | KHEPRA EXPERTS"
        description="Générez automatiquement 7 livrables de conformité : gouvernance, cartographie risques, politiques, matrice de contrôle, audit readiness, workflows n8n, rapport client. Industrial-grade compliance automation."
        keywords="compliance factory, usine conformité, COBAC, LBC/FT, gouvernance automatisée, cartographie risques, matrice contrôle ISO, audit readiness, n8n workflows, Big Four compliance"
        canonicalPath="/kos-compliance-factory-engine"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20industrial%20compliance%20factory%20aesthetic%20with%20deep%20emerald%20and%20warm%20bronze%20tones%2C%20automated%20assembly%20lines%20transforming%20regulatory%20frameworks%20into%20structured%20documents%2C%20geometric%20conveyor%20patterns%20with%20institutional%20gravitas%2C%20manufacturing%20precision%20meets%20governance%2C%20Big%20Four%20consulting%20grade%20visual%20identity%20with%20emerald%20bronze%20gradients%2C%20serious%20authoritative%20industrial%20tone&width=1920&height=520&seq=kos-cfe-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top opacity-15"
            width={1920}
            height={520}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/65 via-foreground-950/82 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <i className="ri-building-2-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Compliance Factory Engine™ — Industrial Grade</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">{agentStats.active}/{agentStats.total} Agents de Production</span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Compliance Factory Engine.
              <span className="block text-emerald-400 mt-2">7 Livrables — Génération Automatique</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              Usine de conformité industrialisée : <strong className="text-white">7 livrables complets</strong> générés automatiquement — gouvernance, cartographie risques, pack politiques, matrice de contrôle ISO, audit readiness, workflows n8n, rapport client. <strong className="text-emerald-400">{kpis.total_livrables_generes} livrables</strong> produits sur <strong className="text-amber-400">{kpis.scenarios_disponibles} scénarios</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Agent Banner */}
      <section className="py-3 bg-emerald-50 border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            {agents.map(agent => (
              <div key={agent.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 whitespace-nowrap flex-shrink-0">
                <i className={`${agent.icon} text-emerald-600 text-sm`} />
                <span className="text-xs font-bold text-foreground-800">{agent.nom}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" title="Actif" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenario Selector */}
      <section className="py-8 sm:py-10 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Sélectionnez le scénario de conformité</h2>
            <p className="text-sm text-foreground-500">4 scénarios prêts pour la génération automatique des 7 livrables de conformité</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => handleSelect(scenario.id)}
                disabled={processing}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${selectedScenarioId === scenario.id && selectedDeliverable ? 'border-emerald-300 bg-emerald-50/60 ring-2 ring-emerald-200' : 'border-background-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30'} ${processing ? 'opacity-60 pointer-events-none' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getMatColor(scenario.niveau_maturite)}`}>
                    <span className="text-sm font-black">{scenario.niveau_maturite === 'Élevé' ? 'E' : scenario.niveau_maturite === 'Moyen' ? 'M' : 'F'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getTypeColor(scenario.type_institution)} whitespace-nowrap`}>
                        {scenario.type_institution}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{scenario.zone}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{scenario.actif_milliards_fcfa} Md FCFA</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950 mb-1">{scenario.nom}</h3>
                    <p className="text-[11px] text-foreground-500 line-clamp-2">{scenario.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {scenario.scope_reglementaire.map(s => (
                        <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 font-mono border border-background-200">{s}</span>
                      ))}
                    </div>
                  </div>
                  {processing && selectedScenarioId === scenario.id ? (
                    <div className="w-6 h-6 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin flex-shrink-0 mt-2" />
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

      {/* Processing Indicator */}
      {processing && (
        <section className="py-8 bg-emerald-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-sm font-bold text-foreground-800">KOS Compliance Factory Engine™ — Génération en cours...</p>
            <p className="text-xs text-foreground-500 mt-1">7 livrables : gouvernance, risques, politiques, contrôles, audit readiness, n8n, rapport client</p>
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
                  <i className="ri-building-2-line text-emerald-600" />
                  <span className="font-bold">{selectedDeliverable.metadata.generateur}</span>
                </span>
                <span className="flex items-center gap-1.5 text-foreground-500">
                  <i className="ri-timer-line" />
                  Généré en {selectedDeliverable.metadata.duree_generation_secondes}s
                </span>
                <span className="flex items-center gap-1.5 text-foreground-500">
                  <i className="ri-check-double-line" />
                  {selectedDeliverable.metadata.normes_appliquees.length} normes appliquées
                </span>
                <span className="flex items-center gap-1.5 text-amber-600 font-bold">
                  <i className="ri-information-line" />
                  {selectedDeliverable.metadata.mode}
                </span>
              </div>
            </div>
          </section>

          {/* ═══════════ 1. GOVERNANCE FRAMEWORK ═══════════ */}
          {activeOutputTab === 'governance' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Cadre de Gouvernance — {selectedDeliverable.governance_framework.version}</h2>
                  <p className="text-sm text-foreground-500">Généré le {new Date(selectedDeliverable.governance_framework.date_generation).toLocaleDateString('fr-FR')}</p>
                </div>

                {/* Organes */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="ri-organization-chart text-emerald-600" />Organes de Gouvernance
                  </h3>
                  <div className="space-y-4">
                    {selectedDeliverable.governance_framework.structure.organes.map(org => (
                      <div key={org.nom} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-foreground-950">{org.nom}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{org.composition}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">{org.frequence_reunion}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {org.attributions.map(a => (
                            <span key={a} className="text-[10px] px-2 py-1 rounded-full bg-foreground-100 text-foreground-700 border border-foreground-200">{a}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comités spécialisés */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="ri-group-line text-emerald-600" />Comités Spécialisés
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {selectedDeliverable.governance_framework.structure.comites_specialises.map(comite => (
                      <div key={comite.nom} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <span className="text-sm font-bold text-foreground-950 block mb-1">{comite.nom}</span>
                        <span className="text-[10px] text-foreground-500 block mb-2">Président : {comite.president} — {comite.membres} — {comite.frequence}</span>
                        <div className="flex flex-wrap gap-1">
                          {comite.missions.map(m => (
                            <span key={m} className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{m}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lignes de Reporting */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="ri-git-branch-line text-emerald-600" />Lignes de Reporting (3 Niveaux de Défense)
                  </h3>
                  <div className="space-y-3">
                    {selectedDeliverable.governance_framework.structure.lignes_reporting.map(ligne => (
                      <div key={ligne.niveau} className="flex items-start gap-4 p-3 rounded-xl bg-background-50 border border-background-100">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-black text-emerald-700">{ligne.niveau.split(' ')[1]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-foreground-950 block">{ligne.niveau}</span>
                          <span className="text-[10px] text-foreground-500">Rapporte à : {ligne.rapporte_a}</span>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {ligne.responsabilites.map(r => (
                              <span key={r} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-600">{r}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chartes */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="ri-file-list-3-line text-emerald-600" />Chartes ({selectedDeliverable.governance_framework.chartes.length})
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-background-200">
                          <th className="text-left py-2 px-3 font-bold text-foreground-400 uppercase text-[10px]">Charte</th>
                          <th className="text-left py-2 px-3 font-bold text-foreground-400 uppercase text-[10px]">Référence</th>
                          <th className="text-left py-2 px-3 font-bold text-foreground-400 uppercase text-[10px]">Dernière Révision</th>
                          <th className="text-left py-2 px-3 font-bold text-foreground-400 uppercase text-[10px]">Articles</th>
                          <th className="text-left py-2 px-3 font-bold text-foreground-400 uppercase text-[10px]">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDeliverable.governance_framework.chartes.map(charte => (
                          <tr key={charte.reference} className="border-b border-background-100 hover:bg-background-50/50">
                            <td className="py-2 px-3 font-bold text-foreground-800">{charte.titre}</td>
                            <td className="py-2 px-3 text-foreground-500 font-mono text-[10px]">{charte.reference}</td>
                            <td className="py-2 px-3 text-foreground-600 text-[10px]">{charte.derniere_revision}</td>
                            <td className="py-2 px-3 text-foreground-600">{charte.articles_cles}</td>
                            <td className="py-2 px-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${STATUT_POLICY_STYLES[charte.statut] || 'bg-background-100 text-foreground-500 border-background-200'}`}>
                                {charte.statut}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Matrice RCI */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="ri-grid-line text-emerald-600" />Matrice RCI (Risques — Contrôles — Indicateurs)
                  </h3>
                  <div className="space-y-2">
                    {selectedDeliverable.governance_framework.matrice_rci.map((rci, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background-50 border border-background-100 text-xs">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-black text-emerald-700 flex-shrink-0">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-foreground-800 font-bold">{rci.risque}</span>
                          <span className="text-foreground-500 block text-[10px]">{rci.controle}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{rci.responsable}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 whitespace-nowrap">{rci.periodicite}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 2. RISK MAP ═══════════ */}
          {activeOutputTab === 'risks' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Cartographie des Risques</h2>
                  <p className="text-sm text-foreground-500">Méthodologie {selectedDeliverable.risk_map.methode} — Évaluation du {new Date(selectedDeliverable.risk_map.date_evaluation).toLocaleDateString('fr-FR')}</p>
                </div>

                {/* Heatmap Summary */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Distribution Heatmap 5×5</h3>
                  <div className="grid grid-cols-5 gap-1 max-w-md mx-auto mb-4">
                    {Array.from({ length: 5 }, (_, y) =>
                      Array.from({ length: 5 }, (_, x) => {
                        const point = selectedDeliverable.risk_map.heatmap_data.find(d => d.x === x + 1 && d.y === 5 - y);
                        const opacity = point ? (point.count > 1 ? 'bg-red-500/60' : 'bg-amber-500/40') : 'bg-background-100';
                        return (
                          <div key={`${x}-${y}`} className={`aspect-square rounded-md ${opacity} flex items-center justify-center text-[9px] font-bold ${point ? 'text-red-900' : 'text-foreground-300'}`}>
                            {point?.count || ''}
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="flex justify-between max-w-md mx-auto text-[9px] text-foreground-400">
                    <span>← Impact →</span>
                    <span>Probabilité ↑</span>
                  </div>
                </div>

                {/* Risk Cards */}
                <div className="space-y-4">
                  {selectedDeliverable.risk_map.risques.map(risk => {
                    const scoreColor = risk.score_residuel >= 50 ? 'bg-red-500' : risk.score_residuel >= 30 ? 'bg-amber-500' : 'bg-emerald-500';
                    const tendanceIcon = risk.tendance === 'hausse' ? 'ri-arrow-up-line text-red-600' : risk.tendance === 'baisse' ? 'ri-arrow-down-line text-emerald-600' : 'ri-subtract-line text-foreground-400';
                    return (
                      <div key={risk.id} className="rounded-2xl bg-white border border-background-200 p-5">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${scoreColor} bg-opacity-15`}>
                            <span className={`text-lg font-black ${scoreColor.replace('bg-', 'text-')}`}>{risk.score_residuel}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{risk.id}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-bold">{risk.categorie}</span>
                              <span className="text-sm font-bold text-foreground-950">{risk.risque}</span>
                              <i className={`${tendanceIcon} text-xs`} />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 mb-3">
                              <div className="p-2 rounded-lg bg-background-50 border border-background-100 text-center">
                                <span className="text-[9px] text-foreground-400 block">Probabilité</span>
                                <span className="text-xs font-black text-foreground-800">{risk.probabilite}%</span>
                              </div>
                              <div className="p-2 rounded-lg bg-background-50 border border-background-100 text-center">
                                <span className="text-[9px] text-foreground-400 block">Impact Fin.</span>
                                <span className="text-xs font-black text-foreground-800">{risk.impact_financier}%</span>
                              </div>
                              <div className="p-2 rounded-lg bg-background-50 border border-background-100 text-center">
                                <span className="text-[9px] text-foreground-400 block">Score Brut</span>
                                <span className="text-xs font-black text-red-700">{risk.score_brut}</span>
                              </div>
                              <div className="p-2 rounded-lg bg-background-50 border border-background-100 text-center">
                                <span className="text-[9px] text-foreground-400 block">Score Résiduel</span>
                                <span className="text-xs font-black text-emerald-700">{risk.score_residuel}</span>
                              </div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-background-50 border border-background-100 flex items-start gap-2">
                              <i className="ri-shield-check-line text-emerald-600 text-xs mt-0.5 flex-shrink-0" />
                              <span className="text-[11px] text-foreground-600">Contrôles existants : {risk.controles_existants}</span>
                            </div>
                            <div className="mt-2 text-[10px] text-foreground-400">
                              Propriétaire : <span className="font-bold text-foreground-600">{risk.proprietaire}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 3. POLICIES PACK ═══════════ */}
          {activeOutputTab === 'policies' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Pack de Politiques — {selectedDeliverable.policies_pack.length} Documents</h2>
                  <p className="text-sm text-foreground-500">Politiques, procédures et chartes prêtes à être déployées</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {selectedDeliverable.policies_pack.map(pol => (
                    <div key={pol.id} className="rounded-2xl bg-white border border-background-200 p-5 hover:border-emerald-200 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <i className="ri-file-text-line text-emerald-700 text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${STATUT_POLICY_STYLES[pol.statut] || 'bg-background-100 text-foreground-500 border-background-200'}`}>
                              {pol.statut}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${CATEGORIE_STYLES[pol.categorie] || 'bg-background-100 text-foreground-500 border-background-200'}`}>
                              {pol.categorie}
                            </span>
                            <span className="text-[10px] text-foreground-400 font-mono">{pol.version}</span>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 mb-1">{pol.titre}</h3>
                          <p className="text-[11px] text-foreground-500 mb-2 line-clamp-2">{pol.resume}</p>
                          <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                            <span className="flex items-center gap-1">
                              <i className="ri-article-line" />{pol.articles} articles · {pol.pages} pages
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="ri-user-line" />{pol.proprietaire}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-2 text-[9px] text-foreground-400">
                            <i className="ri-calendar-check-line" />Approuvé {pol.date_approbation}
                            <span>·</span>
                            <i className="ri-calendar-event-line" />Révision {pol.date_prochaine_revision}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats recap */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Actifs', count: selectedDeliverable.policies_pack.filter(p => p.statut === 'Actif').length, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                    { label: 'En Révision', count: selectedDeliverable.policies_pack.filter(p => p.statut === 'En révision').length, color: 'text-amber-700 bg-amber-50 border-amber-200' },
                    { label: 'À Créer', count: selectedDeliverable.policies_pack.filter(p => p.statut === 'À créer').length, color: 'text-red-700 bg-red-50 border-red-200' },
                    { label: 'Total Pages', count: selectedDeliverable.policies_pack.reduce((s, p) => s + p.pages, 0), color: 'text-foreground-700 bg-background-50 border-background-200' },
                  ].map(stat => (
                    <div key={stat.label} className={`rounded-xl border p-3 text-center ${stat.color}`}>
                      <span className="text-2xl font-black block">{stat.count}</span>
                      <span className="text-[10px] font-bold uppercase">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 4. CONTROL MATRIX ═══════════ */}
          {activeOutputTab === 'controls' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Matrice de Contrôle — {selectedDeliverable.control_matrix.norme_reference}</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.control_matrix.domaines.reduce((s, d) => s + d.controles.length, 0)} contrôles définis dans {selectedDeliverable.control_matrix.domaines.length} domaines</p>
                </div>

                {selectedDeliverable.control_matrix.domaines.map(domaine => (
                  <div key={domaine.domaine} className="rounded-2xl bg-white border border-background-200 p-5 mb-5">
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <i className="ri-folder-line text-emerald-600" />{domaine.domaine} ({domaine.controles.length} contrôles)
                    </h3>
                    <div className="space-y-4">
                      {domaine.controles.map(ctrl => {
                        const typeStyle = ctrl.type === 'Préventif' ? 'bg-sky-100 text-sky-700 border-sky-200' : ctrl.type === 'Détectif' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200';
                        return (
                          <div key={ctrl.id} className="p-4 rounded-xl bg-background-50 border border-background-100">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px] font-black text-emerald-700">{ctrl.automatise ? 'A' : 'M'}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{ctrl.id}</span>
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${typeStyle}`}>{ctrl.type}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{ctrl.frequence}</span>
                                  {ctrl.automatise && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 font-bold">Automatisé</span>
                                  )}
                                </div>
                                <h4 className="text-sm font-bold text-foreground-950 mb-1">{ctrl.controle}</h4>
                                <p className="text-[11px] text-foreground-600 mb-3">{ctrl.description}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                                  <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">
                                    <span className="text-[9px] text-amber-600 font-bold uppercase block">Preuve</span>
                                    <span className="text-[10px] text-amber-800">{ctrl.preuve}</span>
                                  </div>
                                  <div className="p-2 rounded-lg bg-sky-50 border border-sky-100">
                                    <span className="text-[9px] text-sky-600 font-bold uppercase block">KPI</span>
                                    <span className="text-[10px] text-sky-800">{ctrl.kpi}</span>
                                  </div>
                                  <div className="p-2 rounded-lg bg-red-50 border border-red-100">
                                    <span className="text-[9px] text-red-600 font-bold uppercase block">Seuil Alerte</span>
                                    <span className="text-[10px] text-red-800">{ctrl.seuil_alerte}</span>
                                  </div>
                                </div>
                                <div className="mt-2 text-[10px] text-foreground-400">
                                  Responsable : <span className="font-bold text-foreground-600">{ctrl.responsable}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══════════ 5. AUDIT READINESS PACK ═══════════ */}
          {activeOutputTab === 'readiness' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${selectedDeliverable.audit_readiness_pack.score_global >= 70 ? 'bg-emerald-100' : selectedDeliverable.audit_readiness_pack.score_global >= 50 ? 'bg-amber-100' : 'bg-red-100'}`}>
                      <span className={`text-3xl font-black ${selectedDeliverable.audit_readiness_pack.score_global >= 70 ? 'text-emerald-600' : selectedDeliverable.audit_readiness_pack.score_global >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                        {selectedDeliverable.audit_readiness_pack.score_global}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-foreground-950">Audit Readiness Score</h2>
                      <p className="text-sm text-foreground-500">Score de préparation à l'inspection sur 100</p>
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Checklist Inspection ({selectedDeliverable.audit_readiness_pack.checklist_inspection.length} points)</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.audit_readiness_pack.checklist_inspection.map(item => {
                      const statutIcon = item.statut === 'OK' ? 'ri-check-line text-emerald-600' : item.statut === 'Partiel' ? 'ri-time-line text-amber-600' : 'ri-close-line text-red-600';
                      const statutBg = item.statut === 'OK' ? 'bg-emerald-50 border-emerald-200' : item.statut === 'Partiel' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';
                      return (
                        <div key={item.item} className={`flex items-start gap-3 p-3 rounded-xl border ${statutBg}`}>
                          <i className={`${statutIcon} text-sm mt-0.5 flex-shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-xs font-bold text-foreground-800">{item.item}</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${item.priorite === 'P0' ? 'bg-red-500 text-white' : item.priorite === 'P1' ? 'bg-amber-500 text-white' : 'bg-sky-500 text-white'}`}>{item.priorite}</span>
                            </div>
                            <p className="text-[11px] text-foreground-600">{item.action}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Documents Requis */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Documents Requis ({selectedDeliverable.audit_readiness_pack.documents_requis.length})</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.audit_readiness_pack.documents_requis.map(doc => (
                      <div key={doc.document} className="flex items-center gap-3 p-2.5 rounded-lg bg-background-50 border border-background-100">
                        <i className={`text-sm flex-shrink-0 ${doc.disponible ? 'ri-checkbox-circle-line text-emerald-600' : 'ri-close-circle-line text-red-500'}`} />
                        <span className="text-xs text-foreground-800 flex-1">{doc.document}</span>
                        <span className="text-[9px] text-foreground-400">{doc.localisation}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{doc.format}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Entretiens */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Préparation aux Entretiens ({selectedDeliverable.audit_readiness_pack.entretiens_preparation.length} interlocuteurs)</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.audit_readiness_pack.entretiens_preparation.map(ent => (
                      <div key={ent.interlocuteur} className="p-3 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-foreground-950">{ent.interlocuteur}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">{ent.role}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {ent.points_cles.map(p => (
                            <span key={p} className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">{p}</span>
                          ))}
                        </div>
                        <div className="text-[9px] text-foreground-400">
                          Documents à maîtriser : {ent.documents_a_maitriser.join(' · ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendrier */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Calendrier de Préparation</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.audit_readiness_pack.calendrier_preparation.map(etape => (
                      <div key={etape.etape} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-foreground-950">{etape.etape}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-mono">{etape.echeance}</span>
                          </div>
                          <p className="text-[11px] text-foreground-600 mt-1">
                            <span className="font-bold">{etape.responsable}</span> — {etape.livrable}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 6. N8N WORKFLOWS ═══════════ */}
          {activeOutputTab === 'n8n' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Workflows n8n — {selectedDeliverable.n8n_workflows.length} Automatismes</h2>
                  <p className="text-sm text-foreground-500">Workflows exécutables, importables dans n8n en 1 clic</p>
                </div>

                {selectedDeliverable.n8n_workflows.map(wf => (
                  <div key={wf.id} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                        <i className="ri-flow-chart text-violet-700 text-lg" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-foreground-950">{wf.nom}</h3>
                        <div className="flex items-center gap-2 mt-1 text-[10px]">
                          <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 font-bold">Score : {wf.score_automatisation}/100</span>
                          <span className="text-foreground-400">{wf.noeuds.length} nœuds</span>
                        </div>
                      </div>
                    </div>

                    {/* Trigger */}
                    <div className="p-3 rounded-xl bg-background-50 border border-background-100 mb-4">
                      <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider block mb-1">Déclencheur</span>
                      <span className="text-xs font-mono text-foreground-700">{wf.declencheur.type} — {wf.declencheur.config}</span>
                    </div>

                    {/* Nodes Timeline */}
                    <div className="space-y-2 mb-4">
                      {wf.noeuds.map((noeud, i) => (
                        <div key={noeud.nom} className="flex items-center gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-black ${i === 0 ? 'bg-amber-500 text-white' : 'bg-violet-100 text-violet-700'}`}>
                              {i + 1}
                            </div>
                            {i < wf.noeuds.length - 1 && <div className="w-0.5 h-4 bg-violet-200" />}
                          </div>
                          <div className="flex-1 p-2 rounded-lg bg-background-50 border border-background-100">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-bold text-foreground-800">{noeud.nom}</span>
                              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 font-mono">{noeud.type}</span>
                            </div>
                            <span className="text-[10px] text-foreground-500 block mt-0.5">{noeud.action}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* JSON Import */}
                    <div className="p-3 rounded-xl bg-foreground-950 text-emerald-400 font-mono text-[10px] overflow-x-auto max-h-28 overflow-y-auto">
                      {wf.json_import}
                    </div>
                    <div className="flex items-center justify-end mt-3 gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold border border-violet-200 cursor-pointer hover:bg-violet-200 transition-colors whitespace-nowrap">
                        <i className="ri-file-copy-line text-xs" />Copier JSON
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold cursor-pointer hover:bg-emerald-600 transition-colors whitespace-nowrap">
                        <i className="ri-download-line text-xs" />Importer dans n8n
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══════════ 7. CLIENT REPORT ═══════════ */}
          {activeOutputTab === 'report' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Report Header */}
                <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8 mb-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-emerald-100 flex items-center justify-center">
                      <i className="ri-article-line text-emerald-700 text-2xl" />
                    </div>
                    <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">{selectedDeliverable.client_report.titre}</h2>
                    <p className="text-sm text-foreground-500">CONFIDENTIEL — Destinataire : {selectedDeliverable.client_report.destinataire}</p>
                  </div>

                  {/* Executive Summary */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 mb-6">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-2">Résumé Exécutif</span>
                    <p className="text-sm text-emerald-800 leading-relaxed">{selectedDeliverable.client_report.resume_executif}</p>
                  </div>

                  {/* Priority Recommendations */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Recommandations Prioritaires</h3>
                    <div className="space-y-2">
                      {selectedDeliverable.client_report.recommandations_prioritaires.map((rec, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">#{i + 1}</span>
                          <span className="text-xs text-amber-800 font-bold">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* PDF Structure */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="ri-book-open-line text-emerald-600" />Structure du Rapport PDF ({selectedDeliverable.client_report.structure_pdf.length} sections)
                  </h3>
                  <div className="space-y-4">
                    {selectedDeliverable.client_report.structure_pdf.map((section, i) => (
                      <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-black text-emerald-700">{i + 1}</span>
                          <span className="text-sm font-bold text-foreground-950">{section.section}</span>
                        </div>
                        <p className="text-xs text-foreground-600 ml-9">{section.contenu}</p>
                        {section.sous_sections && section.sous_sections.length > 0 && (
                          <div className="mt-3 ml-9 space-y-2">
                            {section.sous_sections.map(ss => (
                              <div key={ss.titre} className="p-2 rounded-lg bg-white border border-background-100">
                                <span className="text-[11px] font-bold text-foreground-800 block">{ss.titre}</span>
                                <span className="text-[10px] text-foreground-500">{ss.contenu}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Annexes */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="ri-attachment-line text-emerald-600" />Annexes ({selectedDeliverable.client_report.annexes.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedDeliverable.client_report.annexes.map((annexe, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-background-50 border border-background-100">
                        <i className="ri-file-pdf-line text-red-500" />
                        <span className="text-xs text-foreground-700">{annexe}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Normes Appliquées */}
          <section className="py-6 bg-background-50 border-t border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider block mb-2">Normes Appliquées</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDeliverable.metadata.normes_appliquees.map(n => (
                  <span key={n} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 font-mono">{n}</span>
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
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-emerald-50 flex items-center justify-center">
              <i className="ri-building-2-line text-emerald-500 text-3xl" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Usine de Conformité Prête</h2>
            <p className="text-sm text-foreground-500">Sélectionnez un scénario ci-dessus pour lancer la génération automatique des 7 livrables de conformité — industrial grade.</p>
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
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Compliance Factory — Accès Rapide</h2>
            <p className="text-foreground-600">Navigation vers les modules connectés du KOS Compliance & Automation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Compliance Factory', path: '/kos-compliance-factory-engine', icon: 'ri-building-2-line', color: '#059669', current: true },
              { label: 'Senior Compliance Auditor', path: '/kos-senior-compliance-auditor', icon: 'ri-shield-check-line', color: '#DC2626' },
              { label: 'Regulatory Brain', path: '/kos-regulatory-brain', icon: 'ri-brain-line', color: '#D97757' },
              { label: 'Workflow Orchestrator', path: '/kos-workflow-orchestrator', icon: 'ri-flow-chart', color: '#0D9488' },
              { label: 'Compliance Automates', path: '/kos-regulatory-compliance-automates', icon: 'ri-shield-check-line', color: '#059669' },
              { label: 'Risk KRI Heatmap', path: '/kos-risk-kri-heatmap', icon: 'ri-fire-line', color: '#DC2626' },
              { label: 'COBAC Dashboard', path: '/cobac', icon: 'ri-building-line', color: '#1A1A2E' },
              { label: 'KOS Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#0D7B5F' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${link.current ? 'border-emerald-300 bg-emerald-50/40 ring-2 ring-emerald-400' : 'border-background-200 bg-white hover:border-emerald-200'}`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && <span className="block text-[10px] text-emerald-700 font-bold mt-1">Vous êtes ici</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





