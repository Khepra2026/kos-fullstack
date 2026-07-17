import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSTransformationOffice } from '@/hooks/useKOSTransformationOffice';
import type { TransformationDeliverable } from '@/mocks/kosTransformationOffice';
import type { RevenueStream } from '@/mocks/kosTransformationOffice';
import type { BU1Product, BU2Product, BU3Product, BU4Observatory } from '@/mocks/kosTransformationOffice';
import type { BU3Tier } from '@/mocks/kosTransformationOffice';
import type { TechLayer } from '@/mocks/kosTransformationOffice';
import type { RoadmapPhase } from '@/mocks/kosTransformationOffice';
import type { AgentReduit } from '@/mocks/kosTransformationOffice';
import type { WebsiteSection } from '@/mocks/kosTransformationOffice';

type OutputTab = 'phase1' | 'bu1' | 'bu2' | 'bu3' | 'bu4' | 'phase234' | 'phase567';

const COMPLEXITY_STYLES: Record<string, string> = {
  'Haute': 'bg-amber-100 text-amber-700 border-amber-200',
  'Très Haute': 'bg-red-100 text-red-700 border-red-200',
  'Maximale': 'bg-red-200 text-red-800 border-red-300',
};

const TYPE_STYLES: Record<string, string> = {
  'Banque': 'bg-foreground-900 text-white',
  'EMF': 'bg-amber-500 text-white',
  'FinTech': 'bg-violet-500 text-white',
  'Groupe Panafricain': 'bg-emerald-600 text-white',
};

export default function KOSTransformationOfficePage() {
  const { scenarios, agents, kpis, selectedDeliverable, processing, error, selectScenario } = useKOSTransformationOffice();

  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>('phase1');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');

  const handleSelect = (id: string) => {
    setSelectedScenarioId(id);
    selectScenario(id);
    setActiveOutputTab('phase1');
  };

  const outputTabs: { id: OutputTab; label: string; icon: string }[] = [
    { id: 'phase1', label: 'Phase 1 — Repositioning', icon: 'ri-compass-3-line' },
    { id: 'bu1', label: 'BU1 — Intelligence', icon: 'ri-radar-line' },
    { id: 'bu2', label: 'BU2 — Due Diligence', icon: 'ri-search-eye-line' },
    { id: 'bu3', label: 'BU3 — Solutions Technologiques', icon: 'ri-cloud-line' },
    { id: 'bu4', label: 'BU4 — Observatory', icon: 'ri-line-chart-line' },
    { id: 'phase234', label: 'Phases 2-4 — Tech + Agents', icon: 'ri-cpu-line' },
    { id: 'phase567', label: 'Phases 5-7 — Web + Revenue + Roadmap', icon: 'ri-rocket-line' },
  ];

  const agentStats = useMemo(() => ({
    total: agents.length,
    active: agents.filter(a => a.statut === 'active').length,
  }), [agents]);

  return (
    <KOSHubLayout hubId={116}>
      <SeoHead
        title="KOS Transformation Office — Alignement Stratégique Institutionnel | KHEPRA EXPERTS"
        description="Alignement stratégique KHEPRA → Dispositif d'Intelligence Réglementaire Francophone. 4 Business Units, 7 phases, repositionnement stratégique Big Four. Intelligence Réglementaire, Due Diligence, Solutions Technologiques, Observatoire Africain."
        keywords="KOS transformation office, intelligence réglementaire, due diligence réglementaire, observatoire réglementaire africain, alignement stratégique institutionnel"
        canonicalPath="/kos-transformation-office"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Strategic%20transformation%20abstract%20visualization%20showing%20a%20consulting%20firm%20evolving%20into%20a%20digital%20intelligence%20platform%2C%20geometric%20shapes%20morphing%20from%20traditional%20to%20digital%2C%20warm%20gold%20and%20teal%20gradients%2C%20Big%20Four%20institutional%20aesthetic%2C%20African%20continent%20silhouette%20emerging%20from%20data%20points%2C%20premium%20corporate%20transformation%20concept%20art&width=1920&height=520&seq=kos-tfo-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top opacity-8"
            width={1920}
            height={520}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/70 via-foreground-950/85 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <i className="ri-building-2-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Transformation Office™ — Big Four + RegTech CEO</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">{agentStats.active} Core Agents — {kpis.agents_elimines} Eliminated</span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              KOS Transformation Office.
              <span className="block text-emerald-400 mt-2">Dispositif d&apos;Intelligence Réglementaire — Afrique Francophone</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              <strong className="text-white">{kpis.business_units} Business Units</strong> — <strong className="text-emerald-400">{kpis.produits_bu1 + kpis.produits_bu2 + kpis.produits_bu3} produits</strong> — <strong className="text-amber-400">{kpis.observatoires} observatoires</strong> — <strong className="text-emerald-400">7 phases</strong> d&apos;exécution — déploiement progressif vers l&apos;excellence institutionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Section Flow */}
      <section className="py-3 bg-emerald-50 border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {outputTabs.map((tab, i) => (
              <div key={tab.id} className="flex items-center gap-1 flex-shrink-0">
                <span className="text-[10px] px-2 py-1 rounded-full bg-white border border-emerald-200 text-foreground-700 font-bold whitespace-nowrap">{tab.label}</span>
                {i < outputTabs.length - 1 && <i className="ri-arrow-right-line text-emerald-400 text-xs flex-shrink-0" />}
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
            <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Sélectionnez le scénario de transformation</h2>
            <p className="text-sm text-foreground-500">4 scénarios — de l'EMF UEMOA à la Plateforme Panafricaine</p>
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
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${scenario.complexite === 'Maximale' ? 'bg-red-100 text-red-700' : scenario.complexite === 'Très Haute' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    <span className="text-sm font-black">{scenario.complexite === 'Maximale' ? 'M' : 'TH'}</span>
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
                      <span className="font-bold text-emerald-600">{scenario.bus_actives.length} BUs actives</span>
                      <span className="text-foreground-400">•</span>
                      <span className="font-bold text-foreground-700">Score: {scenario.score_transformation}/100</span>
                      <span className="text-foreground-400">•</span>
                      <span className="font-bold text-amber-600">{scenario.revenu_recurrent_cible_pct}% recurring</span>
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

      {/* Processing */}
      {processing && (
        <section className="py-12 bg-emerald-50/50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 mx-auto mb-5 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-sm font-bold text-foreground-800 mb-4">KOS Transformation Office™ — Exécution du plan stratégique en cours...</p>
            <div className="grid grid-cols-3 gap-2">
              {outputTabs.map((tab, i) => (
                <div key={tab.id} className="flex items-center gap-1.5 justify-center text-[10px] text-foreground-500">
                  <span className="w-4 h-4 rounded-full bg-emerald-200 flex items-center justify-center text-[8px] font-black text-emerald-700">{i + 1}</span>
                  {tab.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════ PHASE 1 — STRATEGIC REPOSITIONING ═══════════ */}
          {activeOutputTab === 'phase1' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Phase 1 — Strategic Repositioning</h2>
                  <p className="text-sm text-foreground-500">Élimination du low-value, refocus sur 4 BUs, nouvelle identité de marché</p>
                </div>

                {/* Key Statements */}
                <div className="space-y-4 mb-6">
                  {[
                    { label: 'Positionnement', value: selectedDeliverable.phase1.positionnement, icon: 'ri-compass-3-line', color: 'emerald' },
                    { label: 'Mission', value: selectedDeliverable.phase1.mission, icon: 'ri-flag-line', color: 'sky' },
                    { label: 'Vision', value: selectedDeliverable.phase1.vision, icon: 'ri-eye-line', color: 'amber' },
                    { label: 'Proposition de Valeur', value: selectedDeliverable.phase1.proposition_valeur, icon: 'ri-star-line', color: 'violet' },
                    { label: 'Narration de Marché', value: selectedDeliverable.phase1.narration_marche, icon: 'ri-megaphone-line', color: 'red' },
                  ].map(item => (
                    <div key={item.label} className={`rounded-2xl bg-white border border-background-200 p-5 sm:p-6`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-lg bg-${item.color}-100 flex items-center justify-center`}>
                          <i className={`${item.icon} text-${item.color}-600 text-sm`} />
                        </div>
                        <span className="text-xs font-bold text-foreground-500 uppercase tracking-wider">{item.label}</span>
                      </div>
                      <p className="text-sm text-foreground-700 leading-relaxed">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Eliminated Activities */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Activités Éliminées (Low-Value)</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDeliverable.phase1.activites_eliminees.map((a, i) => (
                      <span key={i} className="text-[11px] px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 line-through">{a}</span>
                    ))}
                  </div>
                </div>

                {/* Resource Reallocation */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Réallocation des Ressources</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.phase1.ressources_reallouees.map((r, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background-50 border border-background-100">
                        <span className="text-[11px] text-foreground-600 min-w-[200px]">{r.depuis}</span>
                        <i className="ri-arrow-right-line text-emerald-500" />
                        <span className="text-[11px] font-bold text-emerald-700 min-w-[200px]">{r.vers}</span>
                        <div className="flex-1 bg-background-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${r.pct}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-foreground-800 w-10 text-right">{r.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ BU1 — REGULATORY INTELLIGENCE ═══════════ */}
          {activeOutputTab === 'bu1' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">BU1 — Regulatory Intelligence</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.bu1.mission}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 rounded-2xl bg-white border border-background-200 text-center">
                    <span className="text-[10px] text-foreground-400 block">Missions actives</span>
                    <span className="text-3xl font-black text-emerald-600">{selectedDeliverable.bu1.revenu_projete_mensuel_eur.toLocaleString('fr-FR')}</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-background-200 text-center">
                    <span className="text-[10px] text-foreground-400 block">Taux de réalisation</span>
                    <span className="text-3xl font-black text-emerald-600">{selectedDeliverable.bu1.marge_operationnelle_pct}%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedDeliverable.bu1.produits.map((prod: BU1Product) => (
                    <div key={prod.id} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-emerald-600">{prod.id}</span>
                            <h3 className="text-sm font-bold text-foreground-950">{prod.nom}</h3>
                          </div>
                          <p className="text-[11px] text-foreground-600 mb-2">{prod.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{prod.marche_cible}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs font-medium text-foreground-500">Devis confidentiel</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider block mb-1">Modalités</span>
                          <span className="text-[11px] text-foreground-700">{prod.modele_tarification}</span>
                          <span className="text-[10px] text-foreground-500 block">{prod.modele_abonnement}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider block mb-1">Efficacité</span>
                          <span className="text-[11px] font-bold text-emerald-700">{prod.rentabilite_attendue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ BU2 — REGULATORY DUE DILIGENCE ═══════════ */}
          {activeOutputTab === 'bu2' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">BU2 — Regulatory Due Diligence</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.bu2.mission}</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-background-200 mb-5 text-center">
                  <span className="text-[10px] text-foreground-400 block">Missions déployées</span>
                  <span className="text-3xl font-black text-emerald-600">{selectedDeliverable.bu2.revenu_projete_annuel_eur.toLocaleString('fr-FR')}</span>
                </div>

                {/* Products */}
                <div className="space-y-4 mb-6">
                  {selectedDeliverable.bu2.produits.map((prod: BU2Product) => (
                    <div key={prod.id} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-amber-600">{prod.id}</span>
                            <h3 className="text-sm font-bold text-foreground-950">{prod.nom}</h3>
                            {prod.score_inclus && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">KOS Investability Score™ inclus</span>}
                          </div>
                          <p className="text-[11px] text-foreground-600 mb-2">{prod.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {prod.clients_cibles.map(c => (
                              <span key={c} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-600 border border-background-200">{c}</span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <span className="text-xs font-medium text-foreground-500">Devis confidentiel</span>
                          <span className="text-[10px] text-foreground-400 block">{prod.duree_jours} jours</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-foreground-500 mt-2">
                        <span className="font-bold">Livrables :</span> {prod.livrables.join(' • ')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Methodology */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Méthodologie</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.bu2.methodology.map((m, i) => (
                      <div key={i} className="text-[11px] text-foreground-700 p-2 rounded-lg bg-background-50 border border-background-100">{m}</div>
                    ))}
                  </div>
                </div>

                {/* Scoring Model */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-sm font-bold text-foreground-950 mb-3">{selectedDeliverable.bu2.scoring_model.nom}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider block mb-2">Axes de Scoring</span>
                      <div className="space-y-1.5">
                        {selectedDeliverable.bu2.scoring_model.axes.map(axe => (
                          <div key={axe.nom} className="flex items-center gap-2 text-[11px]">
                            <span className="font-bold text-foreground-800 min-w-[200px]">{axe.nom}</span>
                            <div className="flex-1 bg-background-200 rounded-full h-1.5">
                              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${axe.poids_pct}%` }} />
                            </div>
                            <span className="font-bold text-amber-700 w-10 text-right">{axe.poids_pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider block mb-2">Seuils</span>
                      <div className="space-y-1.5">
                        {selectedDeliverable.bu2.scoring_model.seuils.map(s => (
                          <div key={s.label} className={`text-[11px] p-2 rounded-lg font-bold ${s.min >= 85 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : s.min >= 70 ? 'bg-sky-50 text-sky-700 border border-sky-200' : s.min >= 55 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            {s.min}-{s.max} : {s.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ BU3 — SOLUTIONS TECHNOLOGIQUES ═══════════ */}
          {activeOutputTab === 'bu3' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">BU3 — Solutions Technologiques</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.bu3.mission}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-5 rounded-2xl bg-white border border-background-200 text-center">
                    <span className="text-[10px] text-foreground-400 block">Déploiements actifs</span>
                    <span className="text-2xl font-black text-foreground-950">{selectedDeliverable.bu3.mrr_projete_6mois_eur.toLocaleString('fr-FR')}</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-background-200 text-center">
                    <span className="text-[10px] text-foreground-400 block">Missions en cours</span>
                    <span className="text-2xl font-black text-foreground-950">{selectedDeliverable.bu3.mrr_projete_12mois_eur.toLocaleString('fr-FR')}</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-background-200 text-center">
                    <span className="text-[10px] text-foreground-400 block">Pays couverts</span>
                    <span className="text-2xl font-black text-emerald-600">{selectedDeliverable.bu3.arpu_cible_eur}</span>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Solutions Technologiques</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedDeliverable.bu3.produits.map((prod: BU3Product) => (
                      <div key={prod.id} className="rounded-2xl bg-white border border-background-200 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-emerald-600">{prod.id}</span>
                          <h4 className="text-sm font-bold text-foreground-950">{prod.nom}</h4>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{prod.automatisation_pct}% auto</span>
                        </div>
                        <p className="text-[11px] text-foreground-600 mb-3">{prod.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {prod.fonctionnalites.map(f => (
                            <span key={f} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-600 border border-background-200">{f}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modalités de Déploiement */}
                <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Modalités de Déploiement</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {selectedDeliverable.bu3.tiers.map((tier: BU3Tier) => (
                    <div key={tier.nom} className={`rounded-2xl border p-5 ${tier.nom === 'Enterprise' || tier.nom === 'Observatory Partner' ? 'border-emerald-300 bg-emerald-50/30 ring-1 ring-emerald-200' : 'border-background-200 bg-white'}`}>
                      <h4 className="text-sm font-bold text-foreground-950 mb-1">{tier.nom}</h4>
                      <p className="text-xs text-foreground-500 mb-3">Devis confidentiel sur mission</p>
                      <div className="space-y-1 mb-3">
                        {tier.produits_inclus.map(p => (
                          <div key={p} className="flex items-center gap-1 text-[10px] text-foreground-600">
                            <i className="ri-check-line text-emerald-500 text-xs" />{p}
                          </div>
                        ))}
                      </div>
                      <div className="text-[10px] text-foreground-500">
                        <div>Déploiement: {tier.onboarding_temps_jours}j</div>
                        <div>Support: {tier.support}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ BU4 — OBSERVATORY ═══════════ */}
          {activeOutputTab === 'bu4' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">BU4 — African Regulatory Observatory</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.bu4.mission}</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-background-200 mb-6 text-center">
                  <span className="text-[10px] text-foreground-400 block">Publications annuelles</span>
                  <span className="text-3xl font-black text-emerald-600">{selectedDeliverable.bu4.revenu_projete_annuel_eur.toLocaleString('fr-FR')}</span>
                </div>

                {/* Observatories */}
                <div className="space-y-4 mb-6">
                  {selectedDeliverable.bu4.observatoires.map((obs: BU4Observatory) => (
                    <div key={obs.id} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-mono text-violet-600">{obs.id}</span>
                        <h3 className="text-sm font-bold text-foreground-950">{obs.nom}</h3>
                      </div>
                      <p className="text-[11px] text-foreground-600 mb-4">{obs.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider block mb-2">Publications</span>
                          <div className="space-y-1.5">
                            {obs.publications.map(p => (
                              <div key={p.type} className="text-[11px] p-2 rounded-lg bg-background-50 border border-background-100 flex justify-between">
                                <span className="text-foreground-700">{p.type}</span>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className="text-[9px] text-foreground-400">{p.frequence}</span>

                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider block mb-2">Indices & Benchmarks</span>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {obs.indices.map(idx => (
                              <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">{idx}</span>
                            ))}
                          </div>
                          <div className="space-y-1">
                            {obs.benchmarks.map(b => (
                              <div key={b} className="text-[10px] text-foreground-600"><i className="ri-bar-chart-line text-violet-500 text-[9px]" /> {b}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Publication Calendar */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Calendrier de Publication</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {Object.entries(selectedDeliverable.bu4.calendrier_publication).map(([trimestre, pubs]) => (
                      <div key={trimestre} className="p-3 rounded-lg bg-background-50 border border-background-100">
                        <span className="text-[10px] font-black text-violet-600 block mb-2">{trimestre}</span>
                        <div className="space-y-1">
                          {pubs.map((p: string, i: number) => (
                            <div key={i} className="text-[10px] text-foreground-700">{p}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modalités d'accès */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Modalités d&apos;Accès</h3>
                  <div className="space-y-1.5">
                    {selectedDeliverable.bu4.strategie_monetisation.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-foreground-700">
                        <i className="ri-checkbox-circle-line text-emerald-500 text-xs" />{s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ PHASES 2-4 — TECH + AGENTS ═══════════ */}
          {activeOutputTab === 'phase234' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Phase 2 — Technology */}
                <div className="mb-10">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Phase 2 — Technology Reorganization</h2>
                  <p className="text-sm text-foreground-500 mb-5">{selectedDeliverable.phase2.principe}</p>

                  <div className="space-y-3">
                    {selectedDeliverable.phase2.couches.map((layer: TechLayer) => (
                      <div key={layer.nom} className="rounded-2xl bg-white border border-background-200 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <i className="ri-stack-line text-emerald-600 text-sm" />
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950">{layer.nom}</h3>
                        </div>
                        <p className="text-[11px] text-foreground-600 mb-2">{layer.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {layer.technologies.map(t => (
                            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-mono">{t}</span>
                          ))}
                        </div>
                        <div className="text-[10px] text-foreground-500">
                          {layer.responsabilites.map((r, i) => (
                            <div key={i}><i className="ri-arrow-right-line text-emerald-400 text-[9px]" /> {r}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phase 3 — Knowledge Graph */}
                <div className="mb-10">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Phase 3 — Knowledge Graph Upgrade</h2>
                  <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {selectedDeliverable.phase3.chaine_tracabilite.map((e, i) => (
                        <div key={e} className="flex items-center gap-1">
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">{e}</span>
                          {i < selectedDeliverable.phase3.chaine_tracabilite.length - 1 && <i className="ri-arrow-right-line text-emerald-400 text-xs" />}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1.5 mb-4">
                      {selectedDeliverable.phase3.schema_relations.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] p-1.5 rounded bg-background-50 border border-background-100">
                          <span className="font-bold text-foreground-900 font-mono">{r.source}</span>
                          <span className="text-emerald-600 font-bold">{r.relation}</span>
                          <span className="font-bold text-foreground-900 font-mono">{r.cible}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-[11px] font-bold text-red-700">
                      <i className="ri-alert-line text-xs" /> {selectedDeliverable.phase3.regle_fondamentale}
                    </div>
                  </div>
                </div>

                {/* Phase 4 — AI Agent Reorganization */}
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Phase 4 — AI Agent Reorganization</h2>
                  <p className="text-sm text-foreground-500 mb-5">{selectedDeliverable.phase4.agents.length} agents essentiels — <span className="text-red-600 font-bold">{selectedDeliverable.phase4.agents_elimines} agents éliminés</span></p>

                  <div className="space-y-4">
                    {selectedDeliverable.phase4.agents.map((agent: AgentReduit) => (
                      <div key={agent.id} className="rounded-2xl bg-white border border-background-200 p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <i className="ri-robot-2-line text-emerald-600 text-lg" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-sm font-bold text-foreground-950">{agent.nom}</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${agent.confidence_min >= 90 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>≥{agent.confidence_min}%</span>
                            </div>
                            <p className="text-[11px] text-foreground-600 mb-2">{agent.mission}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider block mb-1">Inputs</span>
                            {agent.inputs.map((inp, i) => (
                              <div key={i} className="text-[10px] text-foreground-600">{inp}</div>
                            ))}
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider block mb-1">Outputs</span>
                            {agent.outputs.map((out, i) => (
                              <div key={i} className="text-[10px] text-foreground-600">{out}</div>
                            ))}
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider block mb-1">KPIs</span>
                            {agent.kpis.map((kpi, i) => (
                              <div key={i} className="text-[10px] text-foreground-600">{kpi}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ PHASES 5-7 — WEBSITE + MONETIZATION + ROADMAP ═══════════ */}
          {activeOutputTab === 'phase567' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Phase 5 — Website Reorganization */}
                <div className="mb-10">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Phase 5 — Website Reorganization</h2>
                  <p className="text-sm text-foreground-500 mb-5">Site consulting → Plateforme d'intelligence. Chaque page génère des leads, des abonnements et des données.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedDeliverable.phase5.sections.map((section: WebsiteSection) => (
                      <div key={section.nom} className="rounded-2xl bg-white border border-background-200 p-5">
                        <h3 className="text-sm font-bold text-foreground-950 mb-2">{section.nom}</h3>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {section.pages.map(p => (
                            <span key={p} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-600 border border-background-200">{p}</span>
                          ))}
                        </div>
                        <div className="text-[10px] space-y-1">
                          <div><span className="font-bold text-foreground-400">Conversion :</span> <span className="text-foreground-700">{section.fonction_conversion}</span></div>
                          <div><span className="font-bold text-foreground-400">Lead Magnet :</span> <span className="text-emerald-700">{section.lead_magnet}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl bg-white border border-background-200 p-5">
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Stratégie de Contenu</h3>
                    <div className="space-y-1">
                      {selectedDeliverable.phase5.strategie_contenu.map((s, i) => (
                        <div key={i} className="text-[11px] text-foreground-700 flex items-center gap-2">
                          <i className="ri-arrow-right-line text-emerald-500 text-xs" />{s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phase 6 — Déploiement Opérationnel */}
                <div className="mb-10">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Phase 6 — Déploiement Opérationnel</h2>

                  <div className="p-5 rounded-2xl bg-white border border-background-200 mb-5 text-center">
                    <span className="text-[10px] text-foreground-400 block">Capacité de déploiement mensuelle</span>
                    <span className="text-4xl font-black text-emerald-600">{selectedDeliverable.phase6.revenu_total_mensuel_projete_eur.toLocaleString('fr-FR')}</span>
                  </div>

                  <div className="space-y-3">
                    {selectedDeliverable.phase6.flux.map((flux: RevenueStream) => (
                      <div key={flux.priorite} className="rounded-2xl bg-white border border-background-200 p-5">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-[10px] font-black text-foreground-400">#{flux.priorite}</span>
                            <span className="text-sm font-bold text-foreground-950 ml-2">{flux.type}</span>
                          </div>
                          <span className="text-lg font-black text-foreground-950">{flux.revenu_mensuel_projete_eur.toLocaleString('fr-FR')} missions</span>
                        </div>
                        <p className="text-[11px] text-foreground-600 mb-3">{flux.description}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                          <div className="p-2 rounded-lg bg-background-50 border border-background-100">
                            <span className="text-[9px] text-foreground-400 block">Institutions</span>
                            <span className="text-sm font-bold text-foreground-800">{flux.prix_mensuel_eur}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-background-50 border border-background-100">
                            <span className="text-[9px] text-foreground-400 block">Missions cibles</span>
                            <span className="text-sm font-bold text-foreground-800">{flux.abonnes_cibles}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-background-50 border border-background-100">
                            <span className="text-[9px] text-foreground-400 block">Déploiement/mois</span>
                            <span className="text-sm font-bold text-emerald-700">{flux.revenu_mensuel_projete_eur.toLocaleString('fr-FR')}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-background-50 border border-background-100">
                            <span className="text-[9px] text-foreground-400 block">Efficacité</span>
                            <span className="text-sm font-bold text-amber-700">{flux.marge_pct}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phase 7 — Execution Roadmap */}
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Phase 7 — Execution Roadmap</h2>

                  <div className="space-y-4">
                    {selectedDeliverable.phase7.phases.map((phase: RoadmapPhase) => (
                      <div key={phase.periode} className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <i className="ri-calendar-check-line text-emerald-600 text-lg" />
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950">{phase.periode}</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider block mb-2">Objectifs</span>
                            <div className="space-y-1">
                              {phase.objectifs.map((o, i) => (
                                <div key={i} className="text-[10px] text-foreground-700">{o}</div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider block mb-2">Livrables</span>
                            <div className="space-y-1">
                              {phase.livrables.map((l, i) => (
                                <div key={i} className="text-[10px] text-foreground-700">{l}</div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-sky-600 uppercase tracking-wider block mb-2">KPIs</span>
                            <div className="space-y-1">
                              {phase.kpis.map((k, i) => (
                                <div key={i} className="text-[10px] text-foreground-700">{k}</div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-red-600 uppercase tracking-wider block mb-2">Risques</span>
                            <div className="space-y-1">
                              {phase.risques.map((r, i) => (
                                <div key={i} className="text-[10px] text-foreground-700">{r}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-background-100">
                          <span className="text-[10px] font-bold text-foreground-400">Ressources :</span>
                          <span className="text-[10px] text-foreground-700 ml-1">{phase.ressources}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Scope Footer */}
          <section className="py-6 bg-background-50 border-t border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider block mb-2">Business Units Activées</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDeliverable.scenario.bus_actives.map(bu => (
                  <span key={bu} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold">{bu}</span>
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
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Plan de Transformation Stratégique Prêt</h2>
            <p className="text-sm text-foreground-500">Sélectionnez un scénario de transformation pour explorer le plan complet : 7 phases, 4 Business Units, repositionnement stratégique complet.</p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-5">
              {outputTabs.map(tab => (
                <span key={tab.id} className="text-[10px] px-2.5 py-1 rounded-full bg-background-100 text-foreground-500 border border-background-200">{tab.label}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ecosystem Cross-Links */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Transformation — Accès Rapide</h2>
            <p className="text-foreground-600">Navigation vers les modules connectés du KOS Transformation Office.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Transformation Office', path: '/kos-transformation-office', icon: 'ri-building-2-line', color: '#059669', current: true },
              { label: 'Regulatory Data Architect', path: '/kos-regulatory-data-architect', icon: 'ri-database-2-line', color: '#0D9488' },
              { label: 'Compliance Pipeline', path: '/kos-autonomous-compliance-pipeline', icon: 'ri-flow-chart', color: '#D97706' },
              { label: 'Regulatory Brain', path: '/kos-regulatory-brain', icon: 'ri-brain-line', color: '#D97757' },
              { label: 'Compliance Factory', path: '/kos-compliance-factory-engine', icon: 'ri-building-2-line', color: '#059669' },
              { label: 'Senior Compliance Auditor', path: '/kos-senior-compliance-auditor', icon: 'ri-shield-check-line', color: '#DC2626' },
              { label: 'Risk KRI Heatmap', path: '/kos-risk-kri-heatmap', icon: 'ri-bar-chart-line', color: '#DC2626' },
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
    </KOSHubLayout>
  );
}