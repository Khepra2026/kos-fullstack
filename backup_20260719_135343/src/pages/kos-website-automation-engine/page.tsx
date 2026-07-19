import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSWebsiteAutomationEngine } from '@/hooks/useKOSWebsiteAutomationEngine';
import type { WebsiteDeliverable } from '@/mocks/websiteAutomationEngine';

type OutputTab = 'architecture' | 'content' | 'leads' | 'diagnostic' | 'chatbot' | 'funnel' | 'seo';

const COMPLEXITE_STYLES: Record<string, string> = {
  'Standard': 'bg-sky-50 text-sky-700 border-sky-200',
  'Avancée': 'bg-amber-50 text-amber-700 border-amber-200',
  'Premium': 'bg-teal-50 text-teal-700 border-teal-200',
};

const TYPE_STYLES: Record<string, string> = {
  'Banque': 'bg-foreground-900 text-white',
  'EMF': 'bg-amber-500 text-white',
  'FinTech': 'bg-violet-500 text-white',
  'Multi-Service': 'bg-teal-600 text-white',
};

const PRIORITY_STYLES: Record<string, string> = {
  'P0': 'bg-red-100 text-red-700 border-red-200',
  'P1': 'bg-amber-100 text-amber-700 border-amber-200',
  'P2': 'bg-sky-100 text-sky-700 border-sky-200',
};

const SEUIL_STYLES: Record<string, string> = {
  '#059669': 'bg-emerald-50 border-emerald-200',
  '#D97706': 'bg-amber-50 border-amber-200',
  '#DC2626': 'bg-red-50 border-red-200',
};

export default function websiteAutomationEnginePage() {
  const {
    scenarios,
    agents,
    kpis,
    selectedDeliverable,
    processing,
    error,
    selectScenario,
  } = useKOSWebsiteAutomationEngine();

  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>('architecture');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');

  const handleSelect = (id: string) => {
    setSelectedScenarioId(id);
    selectScenario(id);
    setActiveOutputTab('architecture');
  };

  const outputTabs: { id: OutputTab; label: string; icon: string; count?: string }[] = [
    { id: 'architecture', label: '1. Architecture', icon: 'ri-layout-masonry-line', count: selectedDeliverable ? String(selectedDeliverable.site_architecture.structure.pages.length) : undefined },
    { id: 'content', label: '2. Contenu Dynamique', icon: 'ri-user-settings-line', count: selectedDeliverable ? String(selectedDeliverable.dynamic_content_rules.regles_par_type_utilisateur.length) : undefined },
    { id: 'leads', label: '3. Lead Gen', icon: 'ri-user-received-line', count: selectedDeliverable ? String(selectedDeliverable.lead_generation_flows.lead_magnets.length) : undefined },
    { id: 'diagnostic', label: '4. Outils Diagnostic', icon: 'ri-tools-line', count: selectedDeliverable ? String(selectedDeliverable.diagnostic_tools_logic.outils.length) : undefined },
    { id: 'chatbot', label: '5. Chatbot IA', icon: 'ri-robot-line', count: selectedDeliverable ? String(selectedDeliverable.ai_chatbot_behavior.scenarios_conversation.length) : undefined },
    { id: 'funnel', label: '6. Funnel Conversion', icon: 'ri-filter-3-line', count: selectedDeliverable ? String(selectedDeliverable.conversion_funnel.etapes.length) : undefined },
    { id: 'seo', label: '7. Structure SEO', icon: 'ri-search-eye-line', count: selectedDeliverable ? String(selectedDeliverable.seo_structure.keyword_clusters.length) : undefined },
  ];

  const agentStats = useMemo(() => ({
    total: agents.length,
    active: agents.filter(a => a.statut === 'active').length,
  }), [agents]);

  const getComplColor = (c: string): string => {
    if (c === 'Premium') return 'text-teal-600 bg-teal-50';
    if (c === 'Avancée') return 'text-amber-600 bg-amber-50';
    return 'text-sky-600 bg-sky-50';
  };

  return (
    <hubLayout hubId={113}>
      <SeoHead
        title="KOS Website Automation Engine™ — Générateur de Sites Conformité Dynamiques | KHEPRA EXPERTS"
        description="Générez automatiquement 7 livrables web : architecture site, contenu dynamique, lead generation, outils diagnostic, chatbot IA, funnel conversion, structure SEO. Sites conformité COBAC, LBC/FT, EMF."
        keywords="website automation, site conformité, COBAC, LBC/FT, EMF, site dynamique, lead generation, SEO conformité, chatbot conformité, diagnostic conformité, architecture web, funnel conversion"
        canonicalPath="/kos-website-automation-engine"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20digital%20website%20architecture%20visualization%20with%20teal%20and%20warm%20bronze%20tones%2C%20interconnected%20web%20pages%20forming%20dynamic%20compliance%20platforms%2C%20geometric%20network%20patterns%20with%20institutional%20gravitas%2C%20automated%20website%20generation%20aesthetic%20with%20flowing%20data%20streams%2C%20Big%20Four%20consulting%20digital%20transformation%20visual%20identity%2C%20clean%20sophisticated%20tech%20tone&width=1920&height=520&seq=kos-wae-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top opacity-12"
            width={1920}
            height={520}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/65 via-foreground-950/82 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-400/30 backdrop-blur-sm">
                <i className="ri-global-line text-teal-400 text-sm" />
                <span className="text-sm font-semibold text-teal-300 uppercase tracking-wider">Website Automation Engine™ — SaaS Réglementaire</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">{agentStats.active}/{agentStats.total} Agents de Génération</span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Website Automation Engine.
              <span className="block text-teal-400 mt-2">7 Livrables Web — Génération Dynamique</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              Générateur de sites web de conformité <strong className="text-white">100% dynamiques</strong> — comportement SaaS réglementaire, zéro brochure statique. <strong className="text-teal-400">{kpis.total_pages_generees} pages</strong> conçues sur <strong className="text-amber-400">{kpis.scenarios_disponibles} scénarios</strong>, <strong className="text-teal-400">{kpis.total_modules}</strong> modules interactifs.
            </p>
          </div>
        </div>
      </section>

      {/* Agent Banner */}
      <section className="py-3 bg-teal-50 border-b border-teal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            {agents.map(agent => (
              <div key={agent.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-teal-200 whitespace-nowrap flex-shrink-0">
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
            <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Sélectionnez le scénario de site web</h2>
            <p className="text-sm text-foreground-500">4 scénarios de sites de conformité — de l'EMF au Groupe Panafricain</p>
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
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getComplColor(scenario.complexite)}`}>
                    <span className="text-sm font-black">{scenario.complexite === 'Premium' ? 'P' : scenario.complexite === 'Avancée' ? 'A' : 'S'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TYPE_STYLES[scenario.type_institution] || 'bg-background-100 text-foreground-500 border border-background-200'} whitespace-nowrap`}>
                        {scenario.type_institution}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{scenario.zone}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{scenario.pages_attendues} pages</span>
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

      {/* Processing Indicator */}
      {processing && (
        <section className="py-8 bg-teal-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
            <p className="text-sm font-bold text-foreground-800">KOS Website Automation Engine™ — Génération en cours...</p>
            <p className="text-xs text-foreground-500 mt-1">7 livrables : architecture, contenu dynamique, lead gen, outils diagnostic, chatbot IA, funnel, SEO</p>
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
                  <i className="ri-global-line text-teal-600" />
                  <span className="font-bold">{selectedDeliverable.metadata.generateur}</span>
                </span>
                <span className="flex items-center gap-1.5 text-foreground-500">
                  <i className="ri-timer-line" />
                  Généré en {selectedDeliverable.metadata.duree_generation_secondes}s
                </span>
                <span className="flex items-center gap-1.5 text-foreground-500">
                  <i className="ri-pages-line" />
                  {selectedDeliverable.metadata.pages_generees} pages · {selectedDeliverable.metadata.modules_total} modules
                </span>
                <span className="flex items-center gap-1.5 text-teal-600 font-bold">
                  <i className="ri-flashlight-line" />
                  Score Automation : {selectedDeliverable.metadata.score_global_automation}/100
                </span>
              </div>
            </div>
          </section>

          {/* ═══════════ 1. SITE ARCHITECTURE ═══════════ */}
          {activeOutputTab === 'architecture' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Architecture du Site — {selectedDeliverable.site_architecture.structure.nom}</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.site_architecture.sitemap_preview}</p>
                </div>

                {/* Pages Grid */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="ri-pages-line text-teal-600" />Pages ({selectedDeliverable.site_architecture.structure.pages.length})
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {selectedDeliverable.site_architecture.structure.pages.map(page => (
                      <div key={page.id} className="p-3 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${PRIORITY_STYLES[page.priorite] || 'bg-background-100 text-foreground-500 border-background-200'}`}>{page.priorite}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-mono">{page.type}</span>
                          <span className="text-xs font-bold text-foreground-800">{page.titre}</span>
                        </div>
                        <div className="text-[9px] text-teal-600 font-mono mb-1">{page.url}</div>
                        <p className="text-[10px] text-foreground-500 line-clamp-2 mb-2">{page.meta_description}</p>
                        <div className="flex flex-wrap gap-1">
                          {page.modules.map(m => (
                            <span key={m} className="text-[8px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{m}</span>
                          ))}
                        </div>
                        <div className="mt-1.5 text-[9px] text-amber-600 font-bold">
                          <i className="ri-focus-3-line text-[8px]" /> Conversion : {page.conversion_goal}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Global Modules */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="ri-puzzle-line text-teal-600" />Modules Globaux ({selectedDeliverable.site_architecture.structure.modules_globaux.length})
                  </h3>
                  <div className="space-y-3">
                    {selectedDeliverable.site_architecture.structure.modules_globaux.map(mod => (
                      <div key={mod.nom} className="p-3 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-foreground-950">{mod.nom}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200">{mod.pages_concernees}</span>
                        </div>
                        <p className="text-[11px] text-foreground-600 mb-1">{mod.description}</p>
                        <p className="text-[10px] text-foreground-400"><i className="ri-eye-line text-[9px]" /> {mod.regles_affichage}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="rounded-2xl bg-white border border-background-200 p-5">
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <i className="ri-menu-line text-teal-600" />Menu Principal
                    </h3>
                    <div className="space-y-2">
                      {selectedDeliverable.site_architecture.structure.navigation.menu_principal.map(item => (
                        <div key={item.label} className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                          <span className="text-sm font-bold text-foreground-800">{item.label}</span>
                          <span className="text-[9px] text-teal-600 font-mono ml-2">{item.url}</span>
                          {item.enfants && (
                            <div className="mt-1.5 ml-4 space-y-1">
                              {item.enfants.map(e => (
                                <div key={e.label} className="text-[10px] text-foreground-500 flex items-center gap-1">
                                  <span className="w-1 h-1 rounded-full bg-teal-400" />
                                  {e.label} <span className="text-teal-500 font-mono text-[9px]">{e.url}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white border border-background-200 p-5">
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <i className="ri-links-line text-teal-600" />Footer & CTA Sticky
                    </h3>
                    {selectedDeliverable.site_architecture.structure.navigation.footer_links.map(col => (
                      <div key={col.categorie} className="mb-3">
                        <span className="text-[10px] font-bold text-foreground-400 uppercase">{col.categorie}</span>
                        <div className="mt-1 space-y-0.5">
                          {col.liens.map(l => (
                            <div key={l.label} className="text-[10px] text-foreground-600 ml-2">{l.label} <span className="text-teal-500 font-mono text-[9px]">{l.url}</span></div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="mt-3 p-2.5 rounded-lg bg-teal-50 border border-teal-200">
                      <span className="text-[10px] font-bold text-teal-700">Sticky CTA : {selectedDeliverable.site_architecture.structure.navigation.cta_sticky.texte}</span>
                      <span className="text-[9px] text-teal-500 block mt-0.5">{selectedDeliverable.site_architecture.structure.navigation.cta_sticky.url} — {selectedDeliverable.site_architecture.structure.navigation.cta_sticky.position}</span>
                    </div>
                  </div>
                </div>

                {/* Arborescence URLs */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mt-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="ri-git-branch-line text-teal-600" />Arborescence URL
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDeliverable.site_architecture.arborescence_url.map(url => (
                      <span key={url} className="text-[10px] px-2 py-1 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-mono">{url}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 2. DYNAMIC CONTENT RULES ═══════════ */}
          {activeOutputTab === 'content' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Règles de Contenu Dynamique</h2>
                  <p className="text-sm text-foreground-500">Personnalisation par type d'utilisateur, A/B testing, géolocalisation</p>
                </div>

                {/* Règles par type utilisateur */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Règles par Type d'Utilisateur ({selectedDeliverable.dynamic_content_rules.regles_par_type_utilisateur.length})</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.dynamic_content_rules.regles_par_type_utilisateur.map(rule => (
                      <div key={rule.type_utilisateur} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-foreground-950">{rule.type_utilisateur}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-mono">{rule.detection}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                          <div className="p-2 rounded-lg bg-white border border-background-100">
                            <span className="text-[9px] text-foreground-400 font-bold uppercase block">Pages Adaptées</span>
                            <span className="text-[10px] text-foreground-700">{rule.pages_adaptees}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">
                            <span className="text-[9px] text-amber-600 font-bold uppercase block">CTA</span>
                            <span className="text-[10px] text-amber-800 font-bold">{rule.call_to_action}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-1.5">
                          {rule.contenu_specifique.map(c => (
                            <span key={c} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-600">{c}</span>
                          ))}
                        </div>
                        <span className="text-[10px] text-teal-600 font-bold">Offre prioritaire : {rule.offre_prioritaire}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* A/B Testing */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">A/B Testing ({selectedDeliverable.dynamic_content_rules.ab_testing.length})</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.dynamic_content_rules.ab_testing.map((test, i) => (
                      <div key={i} className="p-3 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-bold text-foreground-800">{test.element}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200">{test.duree_test}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="p-1.5 rounded bg-white border border-background-100">
                            <span className="text-sky-600 font-bold">A:</span> {test.variante_a}
                          </div>
                          <div className="p-1.5 rounded bg-white border border-background-100">
                            <span className="text-amber-600 font-bold">B:</span> {test.variante_b}
                          </div>
                        </div>
                        <span className="text-[9px] text-foreground-400 mt-1 block">Métrique : {test.metrique}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Géolocalisation */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Géolocalisation ({selectedDeliverable.dynamic_content_rules.geolocalisation.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedDeliverable.dynamic_content_rules.geolocalisation.map(geo => (
                      <div key={geo.pays} className="p-3 rounded-xl bg-background-50 border border-background-100">
                        <span className="text-sm font-bold text-foreground-950 block mb-1">{geo.pays}</span>
                        <div className="text-[10px] text-foreground-500 space-y-0.5">
                          <span className="block"><i className="ri-translate-2 text-[9px] text-teal-600" /> {geo.langue}</span>
                          <span className="block"><i className="ri-file-text-line text-[9px] text-teal-600" /> {geo.reglementation_locale}</span>
                          <span className="block"><i className="ri-map-pin-line text-[9px] text-teal-600" /> {geo.offre_locale}</span>
                        </div>
                        {geo.pages_specifiques.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {geo.pages_specifiques.map(p => (
                              <span key={p} className="text-[8px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 font-mono">{p}</span>
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

          {/* ═══════════ 3. LEAD GENERATION FLOWS ═══════════ */}
          {activeOutputTab === 'leads' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Flows de Génération de Leads</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.lead_generation_flows.lead_magnets.length} lead magnets · {selectedDeliverable.lead_generation_flows.flows.length} flows</p>
                </div>

                {/* Lead Flows */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Flows de Conversion ({selectedDeliverable.lead_generation_flows.flows.length})</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.lead_generation_flows.flows.map(flow => (
                      <div key={flow.id} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200">{flow.id}</span>
                          <span className="text-sm font-bold text-foreground-950">{flow.nom}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-bold">{flow.taux_conversion_estime}% conv.</span>
                        </div>
                        <div className="space-y-1.5 ml-2">
                          {flow.etapes.map((e, i) => (
                            <div key={i} className="flex items-start gap-2 text-[11px]">
                              <span className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-[9px] font-black text-teal-700 flex-shrink-0 mt-0.5">{i + 1}</span>
                              <span className="text-foreground-700">{e}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {flow.pages_cibles.map(p => (
                            <span key={p} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 font-mono">{p}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lead Magnets */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Lead Magnets ({selectedDeliverable.lead_generation_flows.lead_magnets.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedDeliverable.lead_generation_flows.lead_magnets.map(lm => (
                      <div key={lm.id} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-bold uppercase">{lm.type}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">{lm.valeur_percue}</span>
                        </div>
                        <span className="text-sm font-bold text-foreground-950 block mb-1">{lm.titre}</span>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {lm.pages_affichage.map(p => (
                            <span key={p} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 font-mono">{p}</span>
                          ))}
                        </div>
                        <div className="text-[9px] text-foreground-400">
                          Champs : {lm.champs_formulaire.join(' · ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popups */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Popups ({selectedDeliverable.lead_generation_flows.popups.length})</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.lead_generation_flows.popups.map((pop, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background-50 border border-background-100">
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 font-bold whitespace-nowrap">{pop.type}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-foreground-800">{pop.offre}</span>
                          <span className="text-[10px] text-foreground-500 block">{pop.design}</span>
                        </div>
                        <span className="text-[9px] text-foreground-400 whitespace-nowrap">{pop.frequence_max}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email Sequences */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Séquences Email ({selectedDeliverable.lead_generation_flows.email_sequences.length})</h3>
                  {selectedDeliverable.lead_generation_flows.email_sequences.map(seq => (
                    <div key={seq.nom} className="p-4 rounded-xl bg-background-50 border border-background-100 mb-3 last:mb-0">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-bold text-foreground-950">{seq.nom}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200">{seq.nombre_emails} emails</span>
                      </div>
                      <div className="space-y-1.5">
                        {seq.emails.map((e, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px]">
                            <span className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-[9px] font-black text-teal-700 flex-shrink-0">J+{e.jour}</span>
                            <div>
                              <span className="text-foreground-800 font-bold">{e.sujet}</span>
                              <span className="text-foreground-400 ml-2 text-[9px] font-mono">{e.contenu_key}</span>
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

          {/* ═══════════ 4. DIAGNOSTIC TOOLS LOGIC ═══════════ */}
          {activeOutputTab === 'diagnostic' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Logique des Outils Diagnostics</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.diagnostic_tools_logic.outils.length} outils · Scoring {selectedDeliverable.diagnostic_tools_logic.scoring.methode}</p>
                </div>

                {/* Outils */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Outils ({selectedDeliverable.diagnostic_tools_logic.outils.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedDeliverable.diagnostic_tools_logic.outils.map(outil => (
                      <div key={outil.id} className="p-4 rounded-xl bg-background-50 border border-background-100 text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-teal-100 flex items-center justify-center">
                          <i className="ri-tools-line text-teal-700 text-lg" />
                        </div>
                        <span className="text-sm font-bold text-foreground-950 block mb-1">{outil.nom}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 inline-block mb-2">{outil.type}</span>
                        <div className="text-[10px] text-foreground-500 space-y-0.5">
                          <span className="block">{outil.nombre_questions} questions · {outil.duree_estimee}</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-1 mt-2">
                          {outil.resultats_possibles.map(r => (
                            <span key={r} className="text-[8px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{r}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scoring Engine */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Moteur de Scoring — {selectedDeliverable.diagnostic_tools_logic.scoring.methode}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                    {selectedDeliverable.diagnostic_tools_logic.scoring.ponderations.map(axe => (
                      <div key={axe.axe} className="p-3 rounded-xl bg-background-50 border border-background-100 text-center">
                        <span className="text-lg font-black text-teal-600 block">{axe.poids_pct}%</span>
                        <span className="text-[10px] font-bold text-foreground-800 block mt-0.5">{axe.axe}</span>
                        <div className="flex flex-wrap justify-center gap-1 mt-1">
                          {axe.questions.map(q => (
                            <span key={q} className="text-[8px] px-1 py-0.5 rounded-full bg-background-100 text-foreground-500">{q}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {selectedDeliverable.diagnostic_tools_logic.scoring.seuils.map(seuil => (
                      <div key={seuil.label} className={`flex items-center gap-3 p-3 rounded-xl border ${SEUIL_STYLES[seuil.couleur] || 'bg-background-50 border-background-100'}`}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: seuil.couleur + '20' }}>
                          <span className="text-sm font-black" style={{ color: seuil.couleur }}>{seuil.min}-{seuil.max}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-foreground-950">{seuil.label}</span>
                          <p className="text-[10px] text-foreground-600">{seuil.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rapport */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Configuration Rapport</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-2.5 rounded-lg bg-background-50 border border-background-100 text-center">
                      <span className="text-[9px] text-foreground-400 block">Format</span>
                      <span className="text-xs font-black text-foreground-800">{selectedDeliverable.diagnostic_tools_logic.rapport.format}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-background-50 border border-background-100 text-center">
                      <span className="text-[9px] text-foreground-400 block">Délai</span>
                      <span className="text-xs font-black text-foreground-800">{selectedDeliverable.diagnostic_tools_logic.rapport.delai_generation}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-background-50 border border-background-100 text-center">
                      <span className="text-[9px] text-foreground-400 block">CTA</span>
                      <span className="text-xs font-black text-teal-700">{selectedDeliverable.diagnostic_tools_logic.rapport.call_to_action}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-background-50 border border-background-100 text-center">
                      <span className="text-[9px] text-foreground-400 block">Personnalisable</span>
                      <span className="text-xs font-black text-foreground-800">{selectedDeliverable.diagnostic_tools_logic.rapport.personnalisable ? 'Oui' : 'Non'}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {selectedDeliverable.diagnostic_tools_logic.rapport.sections.map((s, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">{i + 1}. {s}</span>
                    ))}
                  </div>
                </div>

                {/* n8n Triggers */}
                {selectedDeliverable.diagnostic_tools_logic.integration_n8n.length > 0 && (
                  <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Intégrations n8n ({selectedDeliverable.diagnostic_tools_logic.integration_n8n.length})</h3>
                    <div className="space-y-2">
                      {selectedDeliverable.diagnostic_tools_logic.integration_n8n.map(trig => (
                        <div key={trig.workflow} className="flex items-center gap-3 p-3 rounded-lg bg-background-50 border border-background-100">
                          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-black text-violet-700">{trig.score_automatisation}%</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-foreground-800">{trig.workflow}</span>
                            <span className="text-[10px] text-foreground-500 block">{trig.action}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ═══════════ 5. AI CHATBOT BEHAVIOR ═══════════ */}
          {activeOutputTab === 'chatbot' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Comportement Chatbot IA</h2>
                  <p className="text-sm text-foreground-500">Identité, scénarios conversation, règles conformité, escalade humaine</p>
                </div>

                {/* Identity */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <i className="ri-robot-line text-teal-700 text-2xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-bold text-foreground-950">{selectedDeliverable.ai_chatbot_behavior.identite.nom}</h3>
                      <div className="flex items-center gap-2 flex-wrap mt-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-bold">{selectedDeliverable.ai_chatbot_behavior.identite.role}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">{selectedDeliverable.ai_chatbot_behavior.identite.niveau_expertise}</span>
                      </div>
                      <p className="text-xs text-foreground-600 mt-2 mb-2">Ton : {selectedDeliverable.ai_chatbot_behavior.identite.ton}</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedDeliverable.ai_chatbot_behavior.identite.phrases_signature.map((p, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-600 italic">"{p}"</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversation Scenarios */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Scénarios de Conversation ({selectedDeliverable.ai_chatbot_behavior.scenarios_conversation.length})</h3>
                  <div className="space-y-4">
                    {selectedDeliverable.ai_chatbot_behavior.scenarios_conversation.map(scenario => (
                      <div key={scenario.intention} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="text-xs font-bold text-foreground-950">{scenario.intention}</span>
                          <div className="flex flex-wrap gap-1">
                            {scenario.detection_keywords.map(kw => (
                              <span key={kw} className="text-[9px] px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200 font-mono">{kw}</span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2 ml-2">
                          {scenario.flux_reponse.map(step => (
                            <div key={step.etape} className="flex items-start gap-2 text-[11px]">
                              <span className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-[9px] font-black text-teal-700 flex-shrink-0 mt-0.5">{step.etape}</span>
                              <div>
                                <span className="text-foreground-700">{step.reponse}</span>
                                {step.action && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 ml-1 font-bold">→ {step.action}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 text-[10px] text-foreground-400 italic">
                          Fallback : {scenario.fallback}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Rules */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Règles de Conformité ({selectedDeliverable.ai_chatbot_behavior.regles_conformite.length})</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.ai_chatbot_behavior.regles_conformite.map(rule => (
                      <div key={rule.id} className="p-3 rounded-xl bg-red-50/30 border border-red-100">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="ri-shield-check-line text-red-600 text-sm" />
                          <span className="text-xs font-bold text-foreground-950">{rule.regle}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 font-mono">{rule.id}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-[10px]">
                          <div className="p-2 rounded bg-white border border-background-100">
                            <span className="text-foreground-400 font-bold block">Condition :</span>
                            <span className="text-foreground-700">{rule.condition}</span>
                          </div>
                          <div className="p-2 rounded bg-white border border-background-100">
                            <span className="text-foreground-400 font-bold block">Action Blocage :</span>
                            <span className="text-foreground-700">{rule.action_blocage}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-foreground-600 mt-2 italic">"{rule.message_utilisateur}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Escalation Rules */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Règles d'Escalade Humaine ({selectedDeliverable.ai_chatbot_behavior.escalade_humaine.length})</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.ai_chatbot_behavior.escalade_humaine.map((esc, i) => (
                      <div key={i} className="p-3 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-bold text-foreground-800">{esc.condition}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">{esc.delai_max}</span>
                        </div>
                        <div className="text-[10px] text-foreground-500">
                          <span className="block"><i className="ri-send-plane-line text-teal-600 text-[9px]" /> → {esc.destination}</span>
                          <span className="block mt-0.5">Données : {esc.donnees_transmises.join(' · ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Limitations */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Limitations</h3>
                  <div className="space-y-1.5">
                    {selectedDeliverable.ai_chatbot_behavior.limitations.map((lim, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-foreground-600">
                        <i className="ri-close-circle-line text-red-500 text-sm flex-shrink-0" />
                        {lim}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 6. CONVERSION FUNNEL ═══════════ */}
          {activeOutputTab === 'funnel' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Funnel de Conversion</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.conversion_funnel.etapes.length} étapes · Score global : {selectedDeliverable.conversion_funnel.taux_conversion_par_etape.find(e => e.etape.includes('Global'))?.taux_pct || 'N/A'}%</p>
                </div>

                {/* Funnel Steps */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Étapes du Funnel</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.conversion_funnel.etapes.map((etape, i) => (
                      <div key={etape.etape} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-black text-teal-700">{i + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-bold text-foreground-950">{etape.etape}</span>
                            <p className="text-[10px] text-foreground-500 mt-0.5">{etape.objectif}</p>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {etape.pages.map(p => (
                                <span key={p} className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 font-mono">{p}</span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-[9px] text-foreground-400 block">KPI Cible</span>
                            <span className="text-xs font-black text-teal-600">{etape.kpi_cible}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversion Rates */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Taux de Conversion</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.conversion_funnel.taux_conversion_par_etape.map(tc => {
                      const isAbove = tc.taux_pct >= tc.benchmark_secteur;
                      return (
                        <div key={tc.etape} className="flex items-center gap-3 p-3 rounded-lg bg-background-50 border border-background-100">
                          <span className="text-[10px] font-bold text-foreground-700 w-48 flex-shrink-0">{tc.etape}</span>
                          <div className="flex-1">
                            <div className="w-full h-3 bg-background-100 rounded-full overflow-hidden">
                              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${Math.min(tc.taux_pct * 15, 100)}%` }} />
                            </div>
                          </div>
                          <span className="text-xs font-black text-teal-700 w-10 text-right">{tc.taux_pct}%</span>
                          <span className={`text-[10px] w-10 text-right ${isAbove ? 'text-teal-600' : 'text-red-500'}`}>
                            {isAbove ? '▲' : '▼'} {tc.benchmark_secteur}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Points de Friction */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Points de Friction ({selectedDeliverable.conversion_funnel.points_friction.length})</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.conversion_funnel.points_friction.map((pf, i) => {
                      const diffColor = pf.difficulte_implementation === 'Facile' ? 'text-emerald-600 bg-emerald-50' : pf.difficulte_implementation === 'Moyenne' ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50';
                      return (
                        <div key={i} className="p-3 rounded-xl bg-red-50/30 border border-red-100">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs font-bold text-foreground-950">{pf.etape} — {pf.probleme}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 font-bold">-{pf.impact_pct}%</span>
                          </div>
                          <p className="text-[11px] text-foreground-600 mb-1">Solution : {pf.solution}</p>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${diffColor}`}>{pf.difficulte_implementation}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recos */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mt-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Recommandations d'Optimisation</h3>
                  <div className="space-y-1.5">
                    {selectedDeliverable.conversion_funnel.optimisation_recommandations.map((rec, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-foreground-700">
                        <i className="ri-checkbox-circle-line text-teal-600 text-sm flex-shrink-0" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 7. SEO STRUCTURE ═══════════ */}
          {activeOutputTab === 'seo' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Structure SEO</h2>
                  <p className="text-sm text-foreground-500">{selectedDeliverable.seo_structure.architecture_seo.type} · {selectedDeliverable.seo_structure.keyword_clusters.length} clusters · {selectedDeliverable.seo_structure.strategie_maillage.liens_internes} liens internes</p>
                </div>

                {/* Architecture SEO */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Architecture SEO — {selectedDeliverable.seo_structure.architecture_seo.type}</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.seo_structure.architecture_seo.silos_thematiques.map(silo => (
                      <div key={silo.silo} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-foreground-950">{silo.silo}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-bold">{silo.mot_cle_principal}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {silo.pages.map(p => (
                            <span key={p} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 font-mono">{p}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-teal-50 border border-teal-200">
                    <span className="text-[10px] font-bold text-teal-700">URL Structure :</span>
                    <span className="text-[10px] text-teal-600 ml-2 font-mono">{selectedDeliverable.seo_structure.architecture_seo.url_structure}</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedDeliverable.seo_structure.architecture_seo.hreflang.map(h => (
                        <span key={h} className="text-[8px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 font-mono">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Keyword Clusters */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Keyword Clusters ({selectedDeliverable.seo_structure.keyword_clusters.length})</h3>
                  <div className="space-y-4">
                    {selectedDeliverable.seo_structure.keyword_clusters.map(kc => (
                      <div key={kc.theme} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="text-sm font-bold text-foreground-950">{kc.theme}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-bold">{kc.mot_cle_principal}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">{kc.volume_recherche_mensuel}/mois</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">{kc.difficulte}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                          <div>
                            <span className="text-[9px] font-bold text-foreground-400 block mb-1">Secondaires</span>
                            <div className="flex flex-wrap gap-1">
                              {kc.mots_cles_secondaires.map(m => (
                                <span key={m} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-600">{m}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-foreground-400 block mb-1">Longue Traîne</span>
                            <div className="flex flex-wrap gap-1">
                              {kc.mots_cles_longue_traine.map(m => (
                                <span key={m} className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700">{m}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {kc.pages_cibles.map(p => (
                            <span key={p} className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-mono">{p}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pillar Pages */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Pages Piliers ({selectedDeliverable.seo_structure.pages_piliers.length})</h3>
                  <div className="space-y-3">
                    {selectedDeliverable.seo_structure.pages_piliers.map(pp => (
                      <div key={pp.titre} className="p-4 rounded-xl bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-bold text-foreground-950">{pp.titre}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 font-mono">{pp.url}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">{pp.schema_type}</span>
                        </div>
                        <p className="text-[11px] text-foreground-600 mb-2">{pp.contenu_principal}</p>
                        <div className="flex flex-wrap gap-1">
                          {pp.sous_pages.map(sp => (
                            <span key={sp} className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-mono">{sp}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schema Markup */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6 mb-5">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Balisage Schema.org ({selectedDeliverable.seo_structure.balisage_schema.length})</h3>
                  <div className="space-y-2">
                    {selectedDeliverable.seo_structure.balisage_schema.map(schema => (
                      <div key={schema.page} className="p-3 rounded-lg bg-background-50 border border-background-100">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono text-teal-600">{schema.page}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-bold">{schema.type_schema}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.entries(schema.proprietes).map(([k, v]) => (
                            <span key={k} className="text-[8px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{k}: {v}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Maillage */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 sm:p-6">
                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Stratégie de Maillage</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-100 text-center">
                      <span className="text-lg font-black text-teal-600 block">{selectedDeliverable.seo_structure.strategie_maillage.liens_internes}</span>
                      <span className="text-[9px] text-teal-700">Liens Internes</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-100 text-center">
                      <span className="text-lg font-black text-sky-600 block">{selectedDeliverable.seo_structure.strategie_maillage.liens_sortants}</span>
                      <span className="text-[9px] text-sky-700">Liens Sortants</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 text-center">
                      <span className="text-lg font-black text-amber-600 block">{selectedDeliverable.seo_structure.strategie_maillage.ancres_recommandees.length}</span>
                      <span className="text-[9px] text-amber-700">Ancres</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-violet-50 border border-violet-100 text-center">
                      <span className="text-lg font-black text-violet-600 block">{selectedDeliverable.seo_structure.strategie_maillage.silo_linking.length}</span>
                      <span className="text-[9px] text-violet-700">Silo Links</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {selectedDeliverable.seo_structure.strategie_maillage.silo_linking.map((sl, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] p-2 rounded-lg bg-background-50 border border-background-100">
                        <span className="text-teal-600 font-mono text-[9px] whitespace-nowrap">{sl.depuis}</span>
                        <i className="ri-arrow-right-line text-foreground-300 text-[9px]" />
                        <span className="text-teal-600 font-mono text-[9px] whitespace-nowrap">{sl.vers}</span>
                        <span className="text-foreground-500 text-[9px]">"{sl.ancre}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Normes / Keywords */}
          <section className="py-6 bg-background-50 border-t border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider block mb-2">Scope Réglementaire</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDeliverable.scenario.scope_reglementaire.map(n => (
                  <span key={n} className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-mono">{n}</span>
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
              <i className="ri-global-line text-teal-500 text-3xl" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Website Automation Engine Prêt</h2>
            <p className="text-sm text-foreground-500">Sélectionnez un scénario ci-dessus pour générer automatiquement les 7 livrables de votre site web de conformité — architecture SaaS réglementaire, zéro brochure statique.</p>
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
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Website Automation — Accès Rapide</h2>
            <p className="text-foreground-600">Navigation vers les modules connectés du KOS Website & Compliance Automation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Website Automation', path: '/kos-website-automation-engine', icon: 'ri-global-line', color: '#0D9488', current: true },
              { label: 'Compliance Factory', path: '/kos-compliance-factory-engine', icon: 'ri-building-2-line', color: '#059669' },
              { label: 'Senior Compliance Auditor', path: '/kos-senior-compliance-auditor', icon: 'ri-shield-check-line', color: '#DC2626' },
              { label: 'Regulatory Brain', path: '/kos-regulatory-brain', icon: 'ri-brain-line', color: '#D97757' },
              { label: 'Workflow Orchestrator', path: '/kos-workflow-orchestrator', icon: 'ri-flow-chart', color: '#0D9488' },
              { label: 'SEO Autopilot', path: '/kos-seo-autopilot', icon: 'ri-search-line', color: '#2563EB' },
              { label: 'Lead Scoring', path: '/kos-lead-scoring-command', icon: 'ri-user-star-line', color: '#D97706' },
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



