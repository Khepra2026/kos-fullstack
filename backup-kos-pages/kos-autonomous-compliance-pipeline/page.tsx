import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSAutonomousCompliancePipeline } from '@/hooks/useKOSAutonomousCompliancePipeline';
import type { PipelineDeliverable } from '@/mocks/autonomousCompliancePipeline';

type OutputTab = 'intake' | 'interpretation' | 'scoring' | 'gap' | 'workflow' | 'audit' | 'report' | 'recommendation' | 'lead';

const SEVERITE_STYLES: Record<string, string> = {
  'Critique': 'bg-red-100 text-red-700 border-red-200',
  'Élevé': 'bg-amber-100 text-amber-700 border-amber-200',
  'Modéré': 'bg-sky-100 text-sky-700 border-sky-200',
  'Faible': 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const TYPE_STYLES: Record<string, string> = {
  'Banque': 'bg-foreground-900 text-white',
  'EMF': 'bg-amber-500 text-white',
  'FinTech': 'bg-violet-500 text-white',
  'Multi-Entité': 'bg-emerald-600 text-white',
};

const SCORE_COLOR = (s: number): string => {
  if (s >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (s >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

const PRIORITY_STYLES: Record<string, string> = {
  'P0': 'bg-red-100 text-red-700 border-red-200',
  'P1': 'bg-amber-100 text-amber-700 border-amber-200',
  'P2': 'bg-sky-100 text-sky-700 border-sky-200',
  'P3': 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export default function autonomousCompliancePipelinePage() {
  const {
    scenarios,
    agents,
    kpis,
    selectedDeliverable,
    processing,
    error,
    selectScenario,
  } = useKOSAutonomousCompliancePipeline();

  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>('intake');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');

  const handleSelect = (id: string) => {
    setSelectedScenarioId(id);
    selectScenario(id);
    setActiveOutputTab('intake');
  };

  const outputTabs: { id: OutputTab; label: string; icon: string; count?: string }[] = [
    { id: 'intake', label: '1. Input Intake', icon: 'ri-upload-cloud-2-line', count: selectedDeliverable ? String(selectedDeliverable.input_intake.documents_fournis.length) : undefined },
    { id: 'interpretation', label: '2. Interprétation', icon: 'ri-scales-3-line', count: selectedDeliverable ? String(selectedDeliverable.regulatory_interpretation.obligations_identifiees.length) : undefined },
    { id: 'scoring', label: '3. Risk Scoring', icon: 'ri-bar-chart-grouped-line', count: selectedDeliverable ? String(selectedDeliverable.risk_scoring.classification) : undefined },
    { id: 'gap', label: '4. Gap Detection', icon: 'ri-contrast-drop-2-line', count: selectedDeliverable ? String(selectedDeliverable.gap_detection.gaps_identifies.length) : undefined },
    { id: 'workflow', label: '5. n8n Workflows', icon: 'ri-node-tree', count: selectedDeliverable ? String(selectedDeliverable.workflow_generation.workflows.length) : undefined },
    { id: 'audit', label: '6. Audit Simulation', icon: 'ri-shield-flash-line', count: selectedDeliverable ? String(selectedDeliverable.ai_audit_simulation.constats.length) : undefined },
    { id: 'report', label: '7. Rapport', icon: 'ri-file-pdf-2-line', count: selectedDeliverable ? selectedDeliverable.report_generation.format : undefined },
    { id: 'recommendation', label: '8. Recommandations', icon: 'ri-lightbulb-flash-line', count: selectedDeliverable ? String(selectedDeliverable.recommendation_engine.recommandations.length) : undefined },
    { id: 'lead', label: '9. Lead Conversion', icon: 'ri-user-received-2-line', count: selectedDeliverable ? selectedDeliverable.lead_conversion_trigger.classification : undefined },
  ];

  const agentStats = useMemo(() => ({
    total: agents.length,
    active: agents.filter(a => a.statut === 'active').length,
  }), [agents]);

  const pipelineStageLabel = (id: OutputTab): string => {
    const tab = outputTabs.find(t => t.id === id);
    return tab ? tab.label.replace(/^\d+\.\s/, '') : id;
  };

  return (
    <hubLayout hubId={114}>
      <SeoHead
        title="KOS Autonomous Compliance Pipeline™ — Full Automation Audit Conformité COBAC | KHEPRA EXPERTS"
        description="Pipeline de conformité 100% automatisé : Input Intake, Interprétation Réglementaire, Risk Scoring, Gap Detection, Workflows n8n, Audit Simulation, Rapport, Recommandations, Lead Conversion. Zéro intervention humaine."
        keywords="autonomous compliance pipeline, audit automatique, COBAC, LBC/FT, n8n workflow, risk scoring, gap detection, audit simulation, AI audit, conformité automatisée CEMAC"
        canonicalPath="/kos-autonomous-compliance-pipeline"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20autonomous%20industrial%20pipeline%20with%20flowing%20data%20streams%20and%20crimson%20energy%2C%20fully%20automated%20compliance%20factory%20with%20interconnected%20processing%20nodes%2C%20dark%20sophisticated%20AI%20automation%20aesthetic%2C%20Big%20Four%20institutional%20tech%20visual%20with%20amber%20and%20crimson%20tones%2C%20zero%20human%20intervention%20factory%20floor%20concept%20art&width=1920&height=520&seq=kos-acp-hero-2026&orientation=landscape"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-flow-chart text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">Autonomous Compliance Pipeline™ — Zéro Humain</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">{agentStats.active}/{agentStats.total} Agents Pipeline</span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Autonomous Compliance Pipeline.
              <span className="block text-amber-400 mt-2">9 Étapes — Full Automation Audit COBAC</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              Pipeline de conformité <strong className="text-white">100% automatisé</strong> — de l'input institutionnel au rapport d'audit final. <strong className="text-amber-400">{kpis.total_obligations_identifiees} obligations</strong> identifiées, <strong className="text-red-400">{kpis.total_gaps_detectes} gaps</strong> détectés, <strong className="text-amber-400">{kpis.total_recommandations} recommandations</strong> générées — <strong className="text-red-400">{kpis.interventions_humaines} intervention humaine</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Pipeline Flow Visualization */}
      <section className="py-3 bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {outputTabs.map((tab, i) => (
              <div key={tab.id} className="flex items-center gap-1 flex-shrink-0">
                <span className="text-[10px] px-2 py-1 rounded-full bg-white border border-amber-200 text-foreground-700 font-bold whitespace-nowrap">{i + 1}. {pipelineStageLabel(tab.id)}</span>
                {i < outputTabs.length - 1 && <i className="ri-arrow-right-line text-amber-400 text-xs flex-shrink-0" />}
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
                <i className={`${agent.icon} text-amber-600 text-sm`} />
                <span className="text-xs font-bold text-foreground-800">{agent.nom}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" title="Actif" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenario Selector */}
      <section className="py-8 sm:py-10 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Sélectionnez l'institution pour le pipeline autonome</h2>
            <p className="text-sm text-foreground-500">4 pipelines — de l'EMF en détresse au Groupe Panafricain 3200 Milliards FCFA</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => handleSelect(scenario.id)}
                disabled={processing}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${selectedScenarioId === scenario.id && selectedDeliverable ? 'border-amber-300 bg-amber-50/60 ring-2 ring-amber-200' : 'border-background-200 bg-white hover:border-amber-200 hover:bg-amber-50/30'} ${processing ? 'opacity-60 pointer-events-none' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${scenario.maturite === 'Élevé' ? 'bg-emerald-100 text-emerald-700' : scenario.maturite === 'Moyen' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    <span className="text-sm font-black">{scenario.maturite === 'Élevé' ? 'É' : scenario.maturite === 'Moyen' ? 'M' : 'F'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TYPE_STYLES[scenario.type_institution] || 'bg-background-100 text-foreground-500 border border-background-200'} whitespace-nowrap`}>{scenario.type_institution}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{scenario.zone}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{scenario.effectif} pers.</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950 mb-1">{scenario.nom_institution}</h3>
                    <p className="text-[11px] text-foreground-500 line-clamp-2">{scenario.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] font-bold text-foreground-700">{scenario.actif_total_fcfa} FCFA</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-bold ${scenario.maturite === 'Élevé' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : scenario.maturite === 'Moyen' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-red-100 text-red-700 border-red-200'}`}>{scenario.maturite}</span>
                    </div>
                  </div>
                  {processing && selectedScenarioId === scenario.id ? (
                    <div className="w-6 h-6 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin flex-shrink-0 mt-2" />
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

      {/* Processing Indicator — 9 steps animation */}
      {processing && (
        <section className="py-12 bg-amber-50/50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 mx-auto mb-5 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
            <p className="text-sm font-bold text-foreground-800 mb-4">KOS Autonomous Compliance Pipeline™ — Exécution en cours...</p>
            <div className="grid grid-cols-3 gap-2">
              {outputTabs.map((tab, i) => (
                <div key={tab.id} className="flex items-center gap-1.5 justify-center text-[10px] text-foreground-500">
                  <span className="w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-[8px] font-black text-amber-700">{i + 1}</span>
                  {pipelineStageLabel(tab.id)}
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
                  <i className="ri-flow-chart text-amber-600" />
                  <span className="font-bold">{selectedDeliverable.metadata.pipeline_id}</span>
                </span>
                <span className="flex items-center gap-1.5 text-foreground-500">
                  <i className="ri-timer-line" />
                  Pipeline exécuté en {selectedDeliverable.metadata.duree_totale_s}s
                </span>
                <span className="flex items-center gap-1.5 text-foreground-500">
                  <i className="ri-user-unfollow-line" />
                  Interventions humaines : {selectedDeliverable.metadata.interventions_humaines}
                </span>
                <span className={`flex items-center gap-1.5 font-bold ${selectedDeliverable.metadata.score_efficacite_automatisation >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  <i className="ri-flashlight-line" />
                  Score Automatisation : {selectedDeliverable.metadata.score_efficacite_automatisation}/100
                </span>
              </div>
            </div>
          </section>

          {/* ═══════════ 1. INPUT INTAKE ═══════════ */}
          {activeOutputTab === 'intake' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Input Intake — Ingestion Automatique</h2>
                  <p className="text-sm text-foreground-500">Canal : {selectedDeliverable.input_intake.canal} — {selectedDeliverable.input_intake.date_soumission}</p>
                </div>

                {/* Validation */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Validation Automatique</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-background-50 border border-background-100 text-center">
                      <span className="text-[9px] text-foreground-400 block">Complétude</span>
                      <span className={`text-lg font-black ${selectedDeliverable.input_intake.validation_auto.completude >= 80 ? 'text-emerald-600' : selectedDeliverable.input_intake.validation_auto.completude >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{selectedDeliverable.input_intake.validation_auto.completude}%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-background-50 border border-background-100 text-center">
                      <span className="text-[9px] text-foreground-400 block">Erreurs</span>
                      <span className={`text-lg font-black ${selectedDeliverable.input_intake.validation_auto.erreurs_detectees === 0 ? 'text-emerald-600' : 'text-red-600'}`}>{selectedDeliverable.input_intake.validation_auto.erreurs_detectees}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-background-50 border border-background-100 text-center">
                      <span className="text-[9px] text-foreground-400 block">Statut</span>
                      <span className={`text-sm font-bold ${selectedDeliverable.input_intake.validation_auto.statut === 'Valide' ? 'text-emerald-600' : selectedDeliverable.input_intake.validation_auto.statut === 'Partiel' ? 'text-amber-600' : 'text-red-600'}`}>{selectedDeliverable.input_intake.validation_auto.statut}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-background-50 border border-background-100 text-center">
                      <span className="text-[9px] text-foreground-400 block">Traitement</span>
                      <span className="text-lg font-black text-foreground-800">{selectedDeliverable.input_intake.validation_auto.temps_traitement_ms}ms</span>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Documents Fournis ({selectedDeliverable.input_intake.documents_fournis.length})</h3>
                  <div className="space-y-1.5">
                    {selectedDeliverable.input_intake.documents_fournis.map((doc, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-background-50 border border-background-100">
                        <i className="ri-file-text-line text-amber-600 text-sm flex-shrink-0" />
                        <span className="text-[11px] text-foreground-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Données extraites */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Données Extraites</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {Object.entries(selectedDeliverable.input_intake.extraction_donnees).map(([key, val]) => (
                      <div key={key} className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                        <span className="text-[9px] text-foreground-400 font-mono block">{key}</span>
                        <span className="text-[11px] font-bold text-foreground-800">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 2. REGULATORY INTERPRETATION ═══════════ */}
          {activeOutputTab === 'interpretation' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Interprétation Réglementaire Automatique</h2>
                  <p className="text-sm text-foreground-500">Score d'interprétation : {selectedDeliverable.regulatory_interpretation.score_interpretation}/100 — {selectedDeliverable.regulatory_interpretation.textes_applicables.length} textes analysés</p>
                </div>

                {/* Textes applicables */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Textes Applicables ({selectedDeliverable.regulatory_interpretation.textes_applicables.length})</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.regulatory_interpretation.textes_applicables.map(texte => (
                      <div key={texte.reference} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="text-xs font-black text-foreground-950 font-mono">{texte.reference}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${texte.niveau_impact === 'Critique' ? 'bg-red-100 text-red-700 border-red-200' : texte.niveau_impact === 'Élevé' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-sky-100 text-sky-700 border-sky-200'}`}>{texte.niveau_impact}</span>
                        </div>
                        <p className="text-sm font-bold text-foreground-800 mb-1">{texte.intitule}</p>
                        <div className="text-[10px] text-foreground-500">
                          <span className="block">{texte.emetteur} — Effectif depuis {texte.date_effet}</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {texte.articles_pertinents.map(a => (
                              <span key={a} className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-mono">{a}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Obligations */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Obligations Identifiées ({selectedDeliverable.regulatory_interpretation.obligations_identifiees.length})</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.regulatory_interpretation.obligations_identifiees.map(obl => (
                      <div key={obl.id} className="p-3 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-[10px] font-mono text-foreground-400">{obl.id}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${obl.statut === 'Conforme' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : obl.statut === 'Partiellement Conforme' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-red-100 text-red-700 border-red-200'}`}>{obl.statut}</span>
                          <span className="text-[9px] text-foreground-400">{obl.echeance}</span>
                        </div>
                        <p className="text-xs font-bold text-foreground-800 mb-1">{obl.description}</p>
                        <div className="text-[10px] text-foreground-500">
                          <span className="block">Source : {obl.source}</span>
                          <span className="block">Preuve requise : {obl.preuve_requise}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alertes */}
                {selectedDeliverable.regulatory_interpretation.alertes_reglementaires.length > 0 && (
                  <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Alertes Réglementaires ({selectedDeliverable.regulatory_interpretation.alertes_reglementaires.length})</h3>
                    <div className="space-y-2">
                      {selectedDeliverable.regulatory_interpretation.alertes_reglementaires.map((alert, i) => (
                        <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${alert.type === 'urgence' ? 'bg-red-50 border-red-200' : alert.type === 'alerte' ? 'bg-amber-50 border-amber-200' : 'bg-sky-50 border-sky-200'}`}>
                          <i className={`${alert.type === 'urgence' ? 'ri-alert-fill text-red-600' : alert.type === 'alerte' ? 'ri-error-warning-line text-amber-600' : 'ri-information-line text-sky-600'} text-lg flex-shrink-0 mt-0.5`} />
                          <div>
                            <span className="text-xs font-bold text-foreground-900">{alert.message}</span>
                            <span className="text-[10px] text-foreground-500 block mt-0.5">{alert.date} — {alert.source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ═══════════ 3. RISK SCORING ═══════════ */}
          {activeOutputTab === 'scoring' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Risk Scoring Automatique</h2>
                  <p className="text-sm text-foreground-500">Classification : <span className={`font-bold ${selectedDeliverable.risk_scoring.classification === 'Critique' ? 'text-red-600' : selectedDeliverable.risk_scoring.classification === 'Élevé' ? 'text-amber-600' : selectedDeliverable.risk_scoring.classification === 'Modéré' ? 'text-sky-600' : 'text-emerald-600'}`}>{selectedDeliverable.risk_scoring.classification}</span></p>
                </div>

                {/* Scores */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`rounded-2xl border p-5 text-center ${SCORE_COLOR(selectedDeliverable.risk_scoring.score_brut)}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1">Score Brut</span>
                    <span className="text-3xl font-black">{selectedDeliverable.risk_scoring.score_brut}</span>
                    <span className="text-[10px] block mt-1">/100</span>
                  </div>
                  <div className={`rounded-2xl border p-5 text-center ${SCORE_COLOR(selectedDeliverable.risk_scoring.score_residuel)}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1">Score Résiduel</span>
                    <span className="text-3xl font-black">{selectedDeliverable.risk_scoring.score_residuel}</span>
                    <span className="text-[10px] block mt-1">/100</span>
                  </div>
                  <div className="rounded-2xl bg-white border border-background-200 p-5 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-1">Seuil Critique</span>
                    <span className="text-3xl font-black text-red-600">{selectedDeliverable.risk_scoring.seuil_critique}</span>
                    <span className="text-[10px] text-foreground-500 block mt-1">/100</span>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Breakdown par Axe</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.risk_scoring.breakdown.map(axe => (
                      <div key={axe.axe} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground-950">{axe.axe}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{axe.poids_pct}%</span>
                          </div>
                          <span className={`text-sm font-black ${axe.score >= 70 ? 'text-emerald-600' : axe.score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{axe.score}/100</span>
                        </div>
                        <div className="w-full h-2 bg-background-100 rounded-full mb-1.5">
                          <div className={`h-full rounded-full ${axe.score >= 70 ? 'bg-emerald-500' : axe.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${axe.score}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-foreground-500">{axe.niveau}</span>
                        <p className="text-[10px] text-foreground-500 mt-0.5">{axe.observations}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heatmap */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Heatmap Risques</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.risk_scoring.heatmap_data.map(risk => (
                      <div key={risk.risque} className="p-3 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-foreground-800">{risk.risque}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${risk.quadrant === 'Rouge' ? 'bg-red-100 text-red-700' : risk.quadrant === 'Orange' ? 'bg-amber-100 text-amber-700' : 'bg-yellow-100 text-yellow-700'}`}>{risk.quadrant}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-foreground-500">
                          <span>P: {risk.probabilite}%</span>
                          <span>I: {risk.impact}%</span>
                          <span className="font-bold text-foreground-700">Score: {risk.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tendances */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Tendances</h3>
                  <div className="flex items-end gap-3 overflow-x-auto pb-2">
                    {selectedDeliverable.risk_scoring.tendances.map(trend => (
                      <div key={trend.periode} className="flex flex-col items-center flex-shrink-0">
                        <span className={`text-sm font-black ${trend.direction === 'down' ? 'text-red-600' : trend.direction === 'up' ? 'text-emerald-600' : 'text-foreground-500'}`}>
                          {trend.score}
                        </span>
                        <div className={`w-8 rounded-t-md mt-1 ${trend.direction === 'down' ? 'bg-red-400' : trend.direction === 'up' ? 'bg-emerald-400' : 'bg-foreground-300'}`} style={{ height: `${Math.max(trend.score, 10)}px` }} />
                        <span className="text-[9px] text-foreground-400 mt-1">{trend.periode}</span>
                        <span className={`text-[9px] font-bold ${trend.variation_pct > 0 ? 'text-emerald-600' : trend.variation_pct < 0 ? 'text-red-600' : 'text-foreground-500'}`}>
                          {trend.variation_pct > 0 ? '+' : ''}{trend.variation_pct}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 4. GAP DETECTION ═══════════ */}
          {activeOutputTab === 'gap' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Gap Detection — Détection Automatique des Écarts</h2>
                  <p className="text-sm text-foreground-500">Score actuel : {selectedDeliverable.gap_detection.score_conformite_actuel}/100 → Cible : {selectedDeliverable.gap_detection.score_conformite_cible}/100 — Écart : {selectedDeliverable.gap_detection.ecart_total} points</p>
                </div>

                {/* Gap priorities summary */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-center">
                    <span className="text-2xl font-black text-red-600 block">{selectedDeliverable.gap_detection.gaps_par_priorite.p0}</span>
                    <span className="text-[10px] font-bold text-red-700">P0 — Critiques</span>
                  </div>
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center">
                    <span className="text-2xl font-black text-amber-600 block">{selectedDeliverable.gap_detection.gaps_par_priorite.p1}</span>
                    <span className="text-[10px] font-bold text-amber-700">P1 — Élevés</span>
                  </div>
                  <div className="rounded-xl bg-sky-50 border border-sky-200 p-3 text-center">
                    <span className="text-2xl font-black text-sky-600 block">{selectedDeliverable.gap_detection.gaps_par_priorite.p2}</span>
                    <span className="text-[10px] font-bold text-sky-700">P2 — Modérés</span>
                  </div>
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center">
                    <span className="text-2xl font-black text-emerald-600 block">{selectedDeliverable.gap_detection.gaps_par_priorite.p3}</span>
                    <span className="text-[10px] font-bold text-emerald-700">P3 — Mineurs</span>
                  </div>
                </div>

                {/* Gaps list */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Gaps Identifiés ({selectedDeliverable.gap_detection.gaps_identifies.length})</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.gap_detection.gaps_identifies.map(gap => (
                      <div key={gap.id} className={`p-4 rounded-xl border ${gap.severite === 'Critique' ? 'bg-red-50/30 border-red-200' : gap.severite === 'Élevé' ? 'bg-amber-50/30 border-amber-200' : gap.severite === 'Modéré' ? 'bg-sky-50/30 border-sky-200' : 'bg-emerald-50/30 border-emerald-200'}`}>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="text-[10px] font-mono text-foreground-400">{gap.id}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${SEVERITE_STYLES[gap.severite] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{gap.severite}</span>
                          <span className="text-[10px] font-bold text-foreground-700">{gap.domaine}</span>
                        </div>
                        <p className="text-sm font-bold text-foreground-950 mb-1">{gap.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-[10px]">
                          <div className="p-2 rounded bg-white border border-background-100">
                            <span className="text-red-600 font-bold block">Actuel :</span>
                            <span className="text-foreground-700">{gap.situation_actuelle}</span>
                          </div>
                          <div className="p-2 rounded bg-white border border-background-100">
                            <span className="text-emerald-600 font-bold block">Requis :</span>
                            <span className="text-foreground-700">{gap.situation_requise}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px]">
                          <span className="text-amber-600 font-mono">{gap.reference_reglementaire}</span>
                          <span className="text-red-600 font-bold">Impact : {gap.impact_potentiel}</span>
                        </div>
                        <div className="mt-1 text-[10px] text-foreground-400 italic">
                          <i className="ri-search-eye-line text-[9px]" /> Preuve d'absence : {gap.preuve_absence}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 5. N8N WORKFLOWS ═══════════ */}
          {activeOutputTab === 'workflow' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Génération Automatique de Workflows n8n</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.workflow_generation.workflow_count} workflows — Score automatisation : {selectedDeliverable.workflow_generation.score_automatisation}/100 — Couverture : {selectedDeliverable.workflow_generation.couverture_processus_pct}%</p>
                </div>

                {/* Workflows */}
                <div className="space-y-4">
                  {selectedDeliverable.workflow_generation.workflows.map(wf => (
                    <div key={wf.id} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                          <i className="ri-node-tree text-violet-600 text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-sm font-bold text-foreground-950">{wf.nom}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${wf.score_automatisation >= 90 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>{wf.score_automatisation}% auto</span>
                          </div>
                          <p className="text-[11px] text-foreground-600 mb-2">{wf.description}</p>
                          <div className="flex flex-wrap gap-2 text-[10px]">
                            <span className="text-foreground-500">
                              <i className="ri-flashlight-line text-amber-500 text-[9px]" /> {wf.declencheur}
                            </span>
                            <span className="text-foreground-500">
                              <i className="ri-git-branch-line text-violet-500 text-[9px]" /> {wf.nombre_noeuds} nœuds
                            </span>
                            <span className="text-foreground-500">
                              <i className="ri-timer-line text-sky-500 text-[9px]" /> ~{wf.temps_execution_moyen_s}s
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Dependencies */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {wf.dependances.map(dep => (
                          <span key={dep} className="text-[8px] px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 font-mono">{dep}</span>
                        ))}
                      </div>

                      {/* JSON Export Preview */}
                      <details className="group">
                        <summary className="text-[10px] font-bold text-violet-600 cursor-pointer flex items-center gap-1">
                          <i className="ri-code-line text-[9px]" /> JSON Export (prêt à importer dans n8n)
                        </summary>
                        <div className="mt-2 p-3 rounded-lg bg-foreground-950 text-emerald-400 font-mono text-[10px] overflow-x-auto whitespace-pre-wrap max-h-32">
                          {wf.json_export}
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 6. AI AUDIT SIMULATION ═══════════ */}
          {activeOutputTab === 'audit' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">AI Audit Simulation — Inspection COBAC Virtuelle</h2>
                  <p className="text-sm text-foreground-500">Auditeur : {selectedDeliverable.ai_audit_simulation.auditeur_virtuel} — Score inspection simulée : <span className={`font-bold ${selectedDeliverable.ai_audit_simulation.score_inspection_simule >= 70 ? 'text-emerald-600' : selectedDeliverable.ai_audit_simulation.score_inspection_simule >= 40 ? 'text-amber-600' : 'text-red-600'}`}>{selectedDeliverable.ai_audit_simulation.score_inspection_simule}/100</span></p>
                </div>

                {/* Score inspection + sanction proba */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`rounded-2xl border p-5 text-center ${selectedDeliverable.ai_audit_simulation.score_inspection_simule >= 70 ? 'bg-emerald-50 border-emerald-200' : selectedDeliverable.ai_audit_simulation.score_inspection_simule >= 40 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1">Score Inspection</span>
                    <span className="text-3xl font-black">{selectedDeliverable.ai_audit_simulation.score_inspection_simule}</span>
                    <span className="text-[10px] block mt-1">/100</span>
                  </div>
                  <div className="rounded-2xl bg-red-50 border border-red-200 p-5 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block mb-1">Probabilité Sanction</span>
                    <span className="text-3xl font-black text-red-600">{selectedDeliverable.ai_audit_simulation.probabilite_sanction_pct}%</span>
                  </div>
                  <div className="rounded-2xl bg-white border border-background-200 p-5 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-1">Durée Simulation</span>
                    <span className="text-3xl font-black text-foreground-800">{selectedDeliverable.ai_audit_simulation.duree_simulation_s}s</span>
                  </div>
                </div>

                {/* Constats */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Constats Simulés ({selectedDeliverable.ai_audit_simulation.constats.length})</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.ai_audit_simulation.constats.map(f => (
                      <div key={f.id} className={`p-4 rounded-xl border ${f.gravite === 'Critique' ? 'bg-red-50/30 border-red-200' : f.gravite === 'Élevé' ? 'bg-amber-50/30 border-amber-200' : 'bg-sky-50/30 border-sky-200'}`}>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="text-[10px] font-mono text-foreground-400">{f.id}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${SEVERITE_STYLES[f.gravite] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{f.gravite}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-mono">{f.article_viole}</span>
                        </div>
                        <p className="text-xs font-bold text-foreground-950 mb-2">{f.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                          <div className="p-2 rounded bg-white border border-background-100">
                            <span className="text-red-600 font-bold block">Sanction potentielle :</span>
                            <span>{f.sanction_potentielle}</span>
                          </div>
                          <div className="p-2 rounded bg-white border border-background-100">
                            <span className="text-foreground-400 font-bold block">Montant risque :</span>
                            <span className="font-bold text-red-600">{f.montant_risque_fcfa}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-foreground-500 mt-1 block">Probabilité détection : {f.probabilite_detection_pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Points forts & Zones exposition */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="rounded-2xl bg-white border border-background-200 p-5">
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <i className="ri-checkbox-circle-line text-emerald-600" />Points Forts
                    </h3>
                    <div className="space-y-1.5">
                      {selectedDeliverable.ai_audit_simulation.points_fort.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-foreground-700">
                          <i className="ri-check-line text-emerald-500 text-sm flex-shrink-0" />
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white border border-background-200 p-5">
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <i className="ri-alert-line text-red-600" />Zones d'Exposition
                    </h3>
                    <div className="space-y-1.5">
                      {selectedDeliverable.ai_audit_simulation.zones_exposition.map((z, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-foreground-700">
                          <i className="ri-close-circle-line text-red-500 text-sm flex-shrink-0" />
                          {z}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 7. REPORT GENERATION ═══════════ */}
          {activeOutputTab === 'report' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Rapport d'Audit Généré Automatiquement</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.report_generation.rapport_id} — {selectedDeliverable.report_generation.format} — {selectedDeliverable.report_generation.pages} pages — {selectedDeliverable.report_generation.taille_fichier}</p>
                </div>

                {/* Rapport metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-white border border-background-200 text-center">
                    <span className="text-[9px] text-foreground-400 block">Format</span>
                    <span className="text-sm font-black text-foreground-800">{selectedDeliverable.report_generation.format}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-background-200 text-center">
                    <span className="text-[9px] text-foreground-400 block">Pages</span>
                    <span className="text-sm font-black text-foreground-800">{selectedDeliverable.report_generation.pages}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-background-200 text-center">
                    <span className="text-[9px] text-foreground-400 block">Temps Génération</span>
                    <span className="text-sm font-black text-foreground-800">{selectedDeliverable.report_generation.temps_generation_s}s</span>
                  </div>
                  <div className={`rounded-xl border p-3 text-center ${selectedDeliverable.report_generation.score_conformite_global >= 70 ? 'bg-emerald-50 border-emerald-200' : selectedDeliverable.report_generation.score_conformite_global >= 40 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                    <span className="text-[9px] text-foreground-400 block">Score Global</span>
                    <span className={`text-sm font-black ${selectedDeliverable.report_generation.score_conformite_global >= 70 ? 'text-emerald-600' : selectedDeliverable.report_generation.score_conformite_global >= 40 ? 'text-amber-600' : 'text-red-600'}`}>{selectedDeliverable.report_generation.score_conformite_global}/100</span>
                  </div>
                </div>

                {/* Sections */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Sections du Rapport ({selectedDeliverable.report_generation.sections.length})</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.report_generation.sections.map(section => (
                      <div key={section.numero} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-black text-amber-700">{section.numero}</span>
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-bold text-foreground-950">{section.titre}</span>
                            <span className="text-[10px] text-foreground-400 ml-2">pp. {section.pages}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-foreground-600 ml-11">{section.contenu_resume}</p>
                        {section.graphiques_inclus.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2 ml-11">
                            {section.graphiques_inclus.map(g => (
                              <span key={g} className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-mono">{g}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 8. RECOMMENDATION ENGINE ═══════════ */}
          {activeOutputTab === 'recommendation' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Recommendation Engine — Plan d'Action Automatique</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.recommendation_engine.recommandations.length} recommandations — Budget : {selectedDeliverable.recommendation_engine.cout_total_estime_fcfa} FCFA — Délai : {selectedDeliverable.recommendation_engine.delai_mise_conformite_jours} jours</p>
                </div>

                {/* Recos */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Recommandations Priorisées</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.recommendation_engine.recommandations.map(rec => (
                      <div key={rec.id} className={`p-4 rounded-xl border ${rec.priorite === 'P0' ? 'bg-red-50/30 border-red-200' : rec.priorite === 'P1' ? 'bg-amber-50/30 border-amber-200' : rec.priorite === 'P2' ? 'bg-sky-50/30 border-sky-200' : 'bg-emerald-50/30 border-emerald-200'}`}>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${PRIORITY_STYLES[rec.priorite] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{rec.priorite}</span>
                          <span className="text-[10px] font-mono text-foreground-400">{rec.id}</span>
                          <span className="text-[10px] text-foreground-500">{rec.delai}</span>
                        </div>
                        <p className="text-sm font-bold text-foreground-950 mb-1">{rec.action}</p>
                        <p className="text-[11px] text-foreground-600 mb-2">{rec.justification}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
                          <div className="p-1.5 rounded bg-white border border-background-100">
                            <span className="text-foreground-400 block">Coût</span>
                            <span className="font-bold text-foreground-700">{rec.cout_estime_fcfa} FCFA</span>
                          </div>
                          <div className="p-1.5 rounded bg-white border border-background-100">
                            <span className="text-foreground-400 block">Responsable</span>
                            <span className="font-bold text-foreground-700">{rec.responsable}</span>
                          </div>
                          <div className="p-1.5 rounded bg-white border border-background-100">
                            <span className="text-foreground-400 block">Indicateur</span>
                            <span className="font-bold text-foreground-700">{rec.indicateur_succes}</span>
                          </div>
                        </div>
                        {rec.dependances.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {rec.dependances.map(d => (
                              <span key={d} className="text-[8px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{d}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan d'action */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Plan d'Action — {selectedDeliverable.recommendation_engine.plan_action.phases.length} Phases</h3>
                  <div className="space-y-4">
                    {selectedDeliverable.recommendation_engine.plan_action.phases.map(phase => (
                      <div key={phase.phase} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-foreground-950">{phase.phase}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">{phase.duree}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <span className="font-bold text-foreground-400 block mb-1">Actions</span>
                            {phase.actions.map((a, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-foreground-700">
                                <i className="ri-arrow-right-line text-amber-500 text-[9px]" />{a}
                              </div>
                            ))}
                          </div>
                          <div>
                            <span className="font-bold text-foreground-400 block mb-1">Livrables</span>
                            {phase.livrables.map((l, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-foreground-700">
                                <i className="ri-checkbox-circle-line text-emerald-500 text-[9px]" />{l}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Jalons */}
                  <div className="mt-5">
                    <h4 className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-3">Jalons Clés</h4>
                    <div className="space-y-2">
                      {selectedDeliverable.recommendation_engine.plan_action.jalons_cles.map(jalon => (
                        <div key={jalon.jalon} className="flex items-center gap-3 p-2.5 rounded-lg bg-background-50 border border-background-100">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <i className="ri-flag-line text-amber-600 text-sm" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-foreground-800">{jalon.jalon}</span>
                            <span className="text-[10px] text-foreground-500 block">{jalon.date}</span>
                          </div>
                          <span className="text-[10px] text-foreground-600 text-right max-w-[180px]">{jalon.critere_succes}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 9. LEAD CONVERSION TRIGGER ═══════════ */}
          {activeOutputTab === 'lead' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Lead Conversion Trigger — Déclenchement Automatique</h2>
                  <p className="text-sm text-foreground-500">Score Lead : <span className={`font-bold ${selectedDeliverable.lead_conversion_trigger.classification === 'Chaud' ? 'text-red-600' : selectedDeliverable.lead_conversion_trigger.classification === 'Tiède' ? 'text-amber-600' : 'text-sky-600'}`}>{selectedDeliverable.lead_conversion_trigger.score_lead}/100 — {selectedDeliverable.lead_conversion_trigger.classification}</span> — Taux conversion estimé : {selectedDeliverable.lead_conversion_trigger.taux_conversion_estime}%</p>
                </div>

                {/* CRM Data */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Données CRM</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {Object.entries(selectedDeliverable.lead_conversion_trigger.donnees_crm).map(([k, v]) => (
                      <div key={k} className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                        <span className="text-[9px] text-foreground-400 font-mono block">{k}</span>
                        <span className="text-[11px] font-bold text-foreground-800">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversion Actions */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Actions Automatiques ({selectedDeliverable.lead_conversion_trigger.actions_auto.length})</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.lead_conversion_trigger.actions_auto.map(action => (
                      <div key={action.etape} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-black text-amber-700">{action.etape}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${action.action_type === 'notification' ? 'bg-red-100 text-red-700 border-red-200' : action.action_type === 'email' ? 'bg-sky-100 text-sky-700 border-sky-200' : action.action_type === 'sms' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : action.action_type === 'webhook' ? 'bg-violet-100 text-violet-700 border-violet-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>{action.action_type}</span>
                              <span className="text-[10px] text-foreground-500">{action.delai}</span>
                            </div>
                            <p className="text-xs font-bold text-foreground-800">{action.description}</p>
                            <p className="text-[10px] text-foreground-600 mt-0.5">Déclencheur : {action.declencheur}</p>
                            <p className="text-[10px] text-foreground-500 mt-1 italic">"{action.contenu}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Scope Réglementaire Footer */}
          <section className="py-6 bg-background-50 border-t border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider block mb-2">Scope Réglementaire</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDeliverable.scenario.scope_reglementaire.map(n => (
                  <span key={n} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-mono">{n}</span>
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
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-amber-50 flex items-center justify-center">
              <i className="ri-flow-chart text-amber-500 text-3xl" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Pipeline Autonome Prêt</h2>
            <p className="text-sm text-foreground-500">Sélectionnez une institution ci-dessus pour exécuter le pipeline de conformité 100% automatisé — 9 étapes, zéro intervention humaine, du document au rapport d'audit final.</p>
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
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Compliance Pipeline — Accès Rapide</h2>
            <p className="text-foreground-600">Navigation vers les modules connectés du KOS Autonomous Compliance Pipeline.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Compliance Pipeline', path: '/kos-autonomous-compliance-pipeline', icon: 'ri-flow-chart', color: '#D97706', current: true },
              { label: 'Compliance Factory', path: '/kos-compliance-factory-engine', icon: 'ri-building-2-line', color: '#059669' },
              { label: 'Senior Compliance Auditor', path: '/kos-senior-compliance-auditor', icon: 'ri-shield-check-line', color: '#DC2626' },
              { label: 'Regulatory Brain', path: '/kos-regulatory-brain', icon: 'ri-brain-line', color: '#D97757' },
              { label: 'Workflow Orchestrator', path: '/kos-workflow-orchestrator', icon: 'ri-flow-chart', color: '#0D9488' },
              { label: 'Website Automation', path: '/kos-website-automation-engine', icon: 'ri-global-line', color: '#0D9488' },
              { label: 'Risk KRI Heatmap', path: '/kos-risk-kri-heatmap', icon: 'ri-bar-chart-line', color: '#DC2626' },
              { label: 'KOS Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#0D7B5F' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${link.current ? 'border-amber-300 bg-amber-50/40 ring-2 ring-amber-400' : 'border-background-200 bg-white hover:border-amber-200'}`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && <span className="block text-[10px] text-amber-700 font-bold mt-1">Vous êtes ici</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





