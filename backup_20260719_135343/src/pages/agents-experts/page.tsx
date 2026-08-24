import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES } from '@/components/feature/OgImages';
import RAGSearchBar from '@/components/feature/RAGSearchBar';
import { useState, useRef } from 'react';
import { agents } from '';
import { growthAgents } from '';
import {
  phases,
  architectureLayers,
  responseSteps,
  maturityLevels,
  leadQualifiers,
  leadScores,
  conversionOffers,
  qualityChecks,
  qualityDimensions,
  howItWorksSteps,
  governanceRules,
  masterEngines,
  levels,
  kpiMetrics,
  visionStatement,
  metaPrompts,
  goldenRules,
  finalArchitectureLevels,
  vision2030,
  constitutionPreamble,
  constitutionArticles,
  constitutionOath,
  constitutionStatut,
} from '';
import {
  governanceOrgans,
  governanceCharterArticles,
  governanceCharterIntro,
} from '';
import {
  architecturePrinciples,
  architectureLayers as blueprintLayers,
  architectureFlow,
  recommendedStack,
  blueprintIntro,
} from '';
import {
  operatingManualIntro,
  operationalLayers,
  operatingSOPs,
  manualGlobalStandard,
  manualFinalObjective,
} from '';
import {
  catalogIntro,
  catalogAgents,
  globalAgentRules,
  orchestrationModel,
  systemKPIs,
  catalogFinalObjective,
} from '';
import {
  ragFrameworkIntro,
  dataGovernancePrinciples,
  dataSources,
  ingestionPipeline,
  ragArchitectureLayers,
  ragPipelineSteps,
  antiHallucinationRules,
  confidenceLevels,
  dataClassifications,
  qualityDimensions as ragQualityDimensions,
  knowledgeLifecycle,
  updateFrequencies,
  dataGovernanceRules as ragGovernanceRules,
  ragResponseStructure,
  performanceMetrics as ragPerformanceMetrics,
} from '';
import {
  runtimeIntro,
  architectureFlow as runtimeArchitectureFlow,
  runtimeComponents,
  executionExample,
  technicalStack,
  runtimeKPIs,
  bigFourDiff,
  limitations,
  nextStep as runtimeNextStep,
} from '';
import {
  masterPromptIntro,
  masterPromptPhases,
  masterPromptPrinciples,
  masterPromptExecutionFlow,
  masterPromptKPIs,
  masterPromptConclusion,
} from '';
import {
  seoAutopilotIntro,
  seoAutopilotPhases,
  seoIntelligentRules,
  seoKPIs,
  seoOutputFormat,
  seoNextLevelExtensions,
  seoAutopilotConclusion,
} from '';
import {
  seoV2Intro,
  seoV2CoreEngine,
  seoV2BacklinkEngine,
  seoV2SERPDomination,
  seoV2AISearchOptimization,
  seoV2FeedbackLoop,
  seoV2TechStack,
  seoV2BusinessResults,
  seoV2BigFourModules,
  seoV2Conclusion,
} from '';
import {
  backlinkIntro,
  backlinkRuleZero,
  linkIntelligenceSources,
  riskScoringEngine,
  opportunityEngine,
  acquisitionModes,
  anchorTextSafety,
  linkVelocityController,
  naturalFootprint,
  contentBasedInjection,
  monitoringProtection,
  antiSpamGuardrails,
  kpiDashboard,
  saasModules,
  backlinkConclusion,
} from '';
import {
  webOpsIntro,
  webOpsObjectives,
  webOpsModules,
  webOpsLoop,
  webOpsPriorities,
  webOpsOutputFormat,
  webOpsSafeMode,
  webOpsBigFourMode,
  webOpsConclusion,
} from '';
import {
  autoHealingIntro,
  autoHealingArchitectureLayers,
  autoHealingUseCases,
  severityLevels,
  priorityFormula,
  autoHealingLoop,
  autoHealingTechStack,
  safetyLayer,
  autoHealingDashboard,
  autoHealingResults,
  autoHealingConclusion,
} from '';
import {
  blockUpdateIntro,
  blockTypes,
  bigFourKpiTargets,
  executionLoopSteps,
  optimizationRules,
  upgradeStrategyLayers,
  automationCreationRules,
  outputFormatItems,
  safeModeRules,
  safeModeProtocol,
  blockUpdateConclusion,
} from '';
import {
  devOpsIntro,
  pipelineSteps,
  intelligenceLayers,
  devOpsKpis,
  safeDeployRules,
  improvementLoop,
  deploymentStack,
  outputItems,
  devOpsConclusion,
} from '';
import {
  sreIntro,
  dashboardArchitectureLayers,
  coreMetrics,
  alertingSystem,
  realTimeLoop,
  insightEngine,
  dashboardStructure,
  safeOpsRules,
  safeOpsProtocol,
  outputFormatSRE,
  sreConclusion,
  sreUltraMode,
} from '';
import {
  digitalComIntro,
  auditArchitectureLayers,
  digitalComKPIs,
  alertingSystemDigital,
  auditCycle,
  insightEngineDigital,
  automationRules,
  dashboardStructureDigital,
  automatedActions,
  safeOpsRulesDigital,
  safeOpsProtocolDigital,
  outputFormatDigital,
  techStackDigital,
  bigFourDigitalModules,
  digitalComConclusion,
  digitalComUltraMode,
} from '';
import { SocialMetricsLiveBanner } from '';
import {
  linkedInAPIIntro,
  linkedInAPILayers,
  linkedInAPIKPIs,
  upgradeRoadmap,
  tokenLifecycle,
  currentStateDiagnostic,
  linkedInAPITechStack,
  linkedInAPISafeOps,
  linkedInAPISafeOpsProtocol,
  linkedInAPIAutomatedActions,
  linkedInAPIConclusion,
  quickStatusCards,
} from '';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function AgentsExpertsPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const currentLang = lang === 'en' ? 'en-US' : 'fr-FR';
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const architectureRef = useRef<HTMLDivElement>(null);
  const phasesRef = useRef<HTMLDivElement>(null);
  const methodologyRef = useRef<HTMLDivElement>(null);
  const diagnosticRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement>(null);

  const handleConsultExpert = (agentId: string) => {
    const agent = agents.find((a) => a.id === agentId);
    if (agent) {
      sessionStorage.setItem('khepra_active_agent', JSON.stringify({
        id: agent.id,
        name: agent.name,
        domain: agent.domain,
      }));
      setSelectedAgent(agent.name);
      setTimeout(() => setSelectedAgent(null), 4000);
    }
    const widget = document.querySelector('#vapi-widget-floating-button') as HTMLElement;
    if (widget) widget.click();
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const agentsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/agents-experts#webpage`,
        name: 'KOS 100™ — Enterprise Advisory Operating System — Orchestre de 21 Agents Experts IA KHEPRA',
        description: 'KOS 100™ Enterprise Advisory Operating System : système d\'exploitation des connaissances KHEPRA EXPERTS. 5 niveaux (Foundation, Expertise, Advisory, Operations, Meta-Governance), 10 phases, 100 moteurs d\'intelligence IA, 21 agents IA spécialisés, méthodologie Big Four, moteur de diagnostic 5 niveaux, lead qualification automatisée, contrôle qualité 95/100, orchestration suprême autonome. Cabinet d\'audit numérique augmenté par IA.',
        url: `${SITE_URL}/agents-experts`,
        inLanguage: currentLang,
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/agents-experts#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'KOS™ — Agents Experts IA', item: `${SITE_URL}/agents-experts` },
          ],
        },
      },
      ...agents.map((agent, idx) => ({
        '@type': 'Service',
        '@id': `${SITE_URL}/agents-experts#${agent.id}`,
        name: agent.name,
        provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'KHEPRA EXPERTS', url: SITE_URL },
        serviceType: agent.domain,
        description: agent.description,
        areaServed: { '@type': 'Continent', name: 'Afrique' },
        position: idx + 1,
      })),
    ],
  };

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        noindex
        title="KOS 100™ — KHEPRA EXPERTS | 100 Moteurs IA · 10 Phases · 21 Agents · Big Four Standards"
        description="KOS 100™ Knowledge Operating System : 100 moteurs d'intelligence spécialisés — Niveau A Foundation (Knowledge Governance, Industry Intelligence, Client 360, Diagnostic, Conversational Excellence, Thought Leadership, Objection Handling, Lead Qualification, Conversion, Knowledge Refresh, Quality Assurance, Executive Briefing, Proposal, Meeting Preparation, Closing), Niveau B Expertise (Expert Knowledge Mapping, Expertise Benchmark, Methodology Intelligence, Executive Presence, Industry Benchmark Database, Use Case Intelligence, Client Pain Point, Opportunity Detection, Cross-Selling, Hyper-Personalization, Country Intelligence, OHADA Intelligence, ESG Intelligence, AI Advisory, Cyber Risk Intelligence, Board Advisory, Investor Readiness, M&A Advisory, Risk Intelligence, Trust Building), Niveau C Advisory (Knowledge Graph, Multi-Agent Collaboration, Board Simulation, Due Diligence, Proposal Factory, Client Success, Predictive Advisory, Competitive Intelligence, Research Lab, Global Benchmark, Executive Coaching, Crisis Management, Innovation Intelligence, Enterprise Architecture, Autonomous Advisory Orchestrator), Niveau D Operations (Regulatory Watch, Continuous Audit, Regulatory Impact Assessment, Document Intelligence, Automated Report Factory, Proposal Automation, Knowledge Publishing, SEO Knowledge, Thought Leadership Publishing, Research Publication, Social Authority, Reputation Intelligence, Expertise Marketplace, Client Journey, Customer Experience, Learning, Knowledge Quality, Humanization, Executive Writing, Multilingual Intelligence, Data Governance, Ethics & AI Governance, Performance Management, Enterprise PMO, Global Governance), Niveau E Meta-Governance (Strategic Command Center, Enterprise Knowledge Council, Expert Certification, Hallucination Control, Fact Verification, Evidence-Based Advisory, Client Value Creation, ROI Quantification, Executive Decision Support, Strategic Scenario, Economic Intelligence, Africa Intelligence, OHADA Center of Excellence, International Tax Intelligence, Global Regulatory Observatory, Digital Twin Enterprise, Autonomous Workflow, Continuous Improvement, Innovation Lab, Strategic Partnership, Maturity Assessment, Advisory Excellence, Institutional Knowledge Preservation, Enterprise Memory, Global Orchestrator Supreme). 10 phases pipeline, 21 agents experts IA. Méthodologie Big Four, scoring qualité 95/100. Enterprise Advisory Operating System™."
        keywords="KOS 100, 100 moteurs d'intelligence IA, Global Orchestrator Supreme, Strategic Command Center, Advisory Operating System, Enterprise Knowledge Council, Expert Certification Engine, Hallucination Control Engine, Fact Verification Engine, Evidence-Based Advisory Engine, Client Value Creation Engine, ROI Quantification Engine, Executive Decision Support Engine, Strategic Scenario Engine, Economic Intelligence Engine, Africa Intelligence Engine, OHADA Center of Excellence, International Tax Intelligence Engine, Global Regulatory Observatory, Digital Twin Enterprise Engine, Autonomous Workflow Engine, Continuous Improvement Engine, Innovation Lab Engine, Strategic Partnership Engine, Maturity Assessment Engine, Advisory Excellence Engine, Institutional Knowledge Preservation Engine, Enterprise Memory Engine, Knowledge Governance Engine, agents experts IA, méthodologie Big Four, KHEPRA EXPERTS"
        canonicalPath="/agents-experts"
        ogType="website"
        ogImage={OG_IMAGES.EXPERTS}
        ogImageAlt="KOS 100™ — Enterprise Advisory Operating System | 21 Agents Experts IA"
        ogImageWidth="1200"
        ogImageHeight="630"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
        structuredData={agentsSchema}
        hreflangLinks={STATIC_HREFLANG_MAP['/agents-experts/']}
      />
      <Navigation />

      <main id="main-content">
        {/* ═══════════ HERO — KOS™ ═══════════ */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-brand-900">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20sophisticated%20dark%20charcoal%20background%20with%20interconnected%20glowing%20green%20geometric%20network%20nodes%20representing%20artificial%20intelligence%20expert%20systems%20elegant%20minimalist%20data%20visualization%20pattern%20deloitte%20green%20accent%20lines%20connecting%20distributed%20intelligence%20hubs%20across%20a%20dark%20gradient%20field%20no%20text%20no%20human%20figures%20pure%20abstract%20corporate%20technology%20aesthetic&width=1920&height=700&seq=kos-hero-bg-v3&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-25"
              width="1920"
              height="700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/50 via-brand-900/70 to-brand-900" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/15 border border-accent-400/30 backdrop-blur-sm mb-6">
                <i className="ri-cpu-line text-accent-400 text-sm" />
                <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">KOS 100™ + 5 Méta-Prompts Fondateurs — Enterprise Advisory Operating System</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Le système d&apos;exploitation des<span className="block text-deloitte-400 mt-2">connaissances KHEPRA</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-4 max-w-3xl mx-auto">
                KOS&trade; est le Knowledge Operating System qui alimente, enrichit et actualise en continu les 21 Agents Experts IA de KHEPRA EXPERTS. Architecturé en 5 couches organisationnelles, gouverné par 5 méta-prompts fondateurs (Orchestrator Supreme, Knowledge Governance, Multi-Agent Collaboration, Advisory Quality Standard, Data &amp; Memory Architecture), 10 Golden Rules&trade; non-négociables, 10 phases pipeline et 100 moteurs d&apos;intelligence spécialisés. Il applique la méthodologie de réponse Big Four, qualifie automatiquement les leads, et garantit un score qualité supérieur à 95/100 sur chaque réponse.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                {[
                  { value: '5', label: 'Méta-Prompts', icon: 'ri-brain-line', color: 'bg-amber-500/20 text-amber-400' },
                  { value: '100', label: 'Moteurs KOS', icon: 'ri-cpu-line', color: 'bg-deloitte-500/20 text-deloitte-400' },
                  { value: '10', label: 'Golden Rules', icon: 'ri-shield-star-line', color: 'bg-accent-500/20 text-accent-400' },
                  { value: '22', label: 'Agents spécialisés', icon: 'ri-team-line', color: 'bg-deloitte-500/20 text-deloitte-400' },
                  { value: '95/100', label: 'Score qualité minimal', icon: 'ri-check-double-line', color: 'bg-accent-500/20 text-accent-400' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${stat.color}`}>
                      <i className={`${stat.icon} text-xl`} />
                    </div>
                    <div className="text-left">
                      <span className="block text-white font-display font-bold text-2xl">{stat.value}</span>
                      <span className="text-xs text-gray-400">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float">
            <i className="ri-arrow-down-s-line text-white/40 text-2xl" />
          </div>
        </section>

        {/* ═══════════ KOS ARCHITECTURE — 5 Couches ═══════════ */}
        <section ref={architectureRef} className="py-16 sm:py-20 lg:py-24 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-200 mb-6">
                <i className="ri-stack-line text-accent-600 text-sm" />
                <span className="text-sm font-semibold text-accent-700 uppercase tracking-wider">Architecture KOS™</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">Cinq couches stratégiques, un orchestrateur central</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed">
                KOS™ est architecturé en 5 couches qui couvrent l&apos;intégralité de la chaîne de valeur du conseil réglementaire augmenté, coordonnées par le KHEPRA Master Orchestrator.
              </p>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto">
              {architectureLayers.map((layer, i) => (
                <div key={layer.layer} className={`rounded-2xl border ${layer.border} bg-gradient-to-r ${layer.gradient} p-6 sm:p-7 animate-fade-in`} style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-background-50 border border-background-200 flex-shrink-0">
                      <i className={`${layer.icon} text-foreground-700 text-xl`} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground-950 mb-1">{layer.layer}</h3>
                      <p className="text-sm text-foreground-600 leading-relaxed">{layer.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Master Orchestrator */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="rounded-2xl border-2 border-deloitte-400/60 bg-gradient-to-r from-deloitte-500/10 to-deloitte-500/5 p-7 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-deloitte-100 border border-deloitte-300 flex items-center justify-center">
                  <i className="ri-cpu-line text-deloitte-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-2">KHEPRA Master Orchestrator</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-lg mx-auto mb-4">
                  Le Master Orchestrator coordonne les 21 agents à travers les 5 couches. Il route les requêtes, résout les conflits inter-agents, priorise les tâches et garantit que chaque réponse mobilise exactement les bons experts — ni plus, ni moins.
                </p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {['Routage intelligent', 'Cohérence inter-agents', 'Priorisation', 'Escalade', 'Traçabilité'].map((cap) => (
                    <span key={cap} className="px-3 py-1.5 rounded-full bg-deloitte-100 border border-deloitte-200 text-xs font-semibold text-deloitte-700 whitespace-nowrap">{cap}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS 5-LEVEL ENGINE PYRAMID ═══════════ */}
        <section className="py-0 pb-16 sm:pb-20 bg-background-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-6">
                <i className="ri-stack-line text-amber-600 text-sm" />
                <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">Architecture des 100 Moteurs</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">Cinq niveaux de maturité, une plateforme unifiée</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed">
                Les 100 moteurs KOS&trade; sont organisés en cinq niveaux de maturité — de la fondation opérationnelle à la méta-gouvernance autonome — pour garantir une montée en puissance progressive et cohérente de l&apos;intelligence augmentée.
              </p>
            </div>
            <div className="flex flex-col items-center gap-0">
              {levels.map((lvl, i) => (
                <div key={lvl.level} className={`w-full max-w-${i === 0 ? 'xl' : i === 1 ? '2xl' : '3xl'} rounded-2xl border ${lvl.border} bg-gradient-to-r ${lvl.gradient} p-6 sm:p-7 ${i > 0 ? '-mt-3 relative z-' + (10 - i * 10) : 'z-30'} animate-fade-in`} style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-background-200 flex-shrink-0">
                      <i className={`${lvl.icon} text-foreground-700 text-xl`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className={`font-display text-lg font-bold ${lvl.textColor}`}>{lvl.level}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-white border border-background-200 text-xs font-semibold text-foreground-600 whitespace-nowrap">{lvl.numRange}</span>
                      </div>
                      <p className="text-sm text-foreground-500 mb-2">{lvl.description}</p>
                      <p className="text-xs text-foreground-400 leading-relaxed">{lvl.engines}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ THE 10 PHASES ═══════════ */}
        <section ref={phasesRef} className="py-16 sm:py-20 lg:py-24 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deloitte-50 border border-deloitte-200 mb-6">
                <i className="ri-git-merge-line text-deloitte-600 text-sm" />
                <span className="text-sm font-semibold text-deloitte-700 uppercase tracking-wider">Les 10 Phases du KOS™</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">De la collecte à la qualité : le pipeline de l&apos;intelligence augmentée</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed">
                Chaque agent KOS suit un pipeline en 10 phases — de la collecte des sources internationales jusqu&apos;au contrôle qualité avant diffusion. Ce processus garantit une expertise actualisée, pertinente et fiable à chaque interaction.
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {phases.map((phase, i) => (
                  <div
                    key={phase.num}
                    className={`group rounded-2xl border border-background-200 bg-white p-6 transition-all duration-300 cursor-pointer ${activePhase === phase.num ? 'ring-2 ring-deloitte-400 shadow-lg' : 'hover:shadow-lg hover:-translate-y-1'}`}
                    onClick={() => setActivePhase(activePhase === phase.num ? null : phase.num)}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${phase.color} text-white flex-shrink-0`}>
                        <span className="font-display font-bold text-lg">{phase.num}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base font-bold text-foreground-950 mb-1 leading-snug">{phase.title}</h3>
                        <div className="flex items-center gap-1.5 mb-2">
                          <i className={`${phase.icon} text-foreground-400 text-sm`} />
                          <p className="text-xs text-foreground-500 leading-relaxed line-clamp-1">{phase.subtitle}</p>
                        </div>
                        <div className={`overflow-hidden transition-all duration-500 ${activePhase === phase.num ? 'max-h-64 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                          <p className="text-sm text-foreground-600 leading-relaxed border-t border-background-200 pt-3">{phase.description}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <i className={`ri-arrow-down-s-line text-foreground-300 transition-transform duration-300 ${activePhase === phase.num ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ THE 100 KOS MASTER ENGINES ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deloitte-50 border border-deloitte-200 mb-6">
                <i className="ri-cpu-line text-deloitte-600 text-sm" />
                <span className="text-sm font-semibold text-deloitte-700 uppercase tracking-wider">Les 100 Moteurs d&apos;Intelligence KOS&trade;</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">L&apos;Enterprise Advisory Operating System&trade;</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed">
                KOS&trade; déploie 100 moteurs d&apos;intelligence spécialisés organisés en 5 niveaux — Foundation (01-15), Expertise (16-35), Advisory (36-50), Operations (51-75) et Meta-Governance (76-100). De la gouvernance des connaissances à l&apos;orchestration suprême, en passant par l&apos;auto-certification, la simulation par jumeau numérique, le contrôle anti-hallucination, la préservation institutionnelle et l&apos;amélioration continue, chaque moteur enrichit les capacités des 21 agents experts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {masterEngines.map((engine, i) => (
                <div
                  key={engine.num}
                  className="group rounded-2xl border border-background-200 bg-background-50 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${engine.color} text-white flex-shrink-0`}>
                      <span className="font-display font-bold text-sm">{engine.num}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-bold text-foreground-950 leading-snug mb-1">{engine.title}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <i className={`${engine.icon} text-foreground-400 text-xs`} />
                        <p className="text-xs text-foreground-500 leading-relaxed line-clamp-2">{engine.mission}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-background-200 pt-3">
                    <p className="text-xs font-semibold text-foreground-700 mb-2">Livrables :</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {engine.deliverables.map((d) => (
                        <span key={d} className="px-2 py-0.5 rounded-full text-xs font-medium bg-deloitte-50 border border-deloitte-200 text-deloitte-700 whitespace-nowrap">{d}</span>
                      ))}
                    </div>
                    {engine.controls && (
                      <>
                        <p className="text-xs font-semibold text-foreground-700 mb-1.5">Responsabilités :</p>
                        <div className="flex flex-wrap gap-1">
                          {engine.controls.slice(0, 5).map((c) => (
                            <span key={c} className="px-1.5 py-0.5 rounded text-xs text-foreground-500 bg-background-100 border border-background-200 whitespace-nowrap">{c}</span>
                          ))}
                          {engine.controls.length > 5 && <span className="px-1.5 py-0.5 rounded text-xs text-foreground-400">+{engine.controls.length - 5}</span>}
                        </div>
                      </>
                    )}
                    {engine.sectors && (
                      <>
                        <p className="text-xs font-semibold text-foreground-700 mb-1.5">{engine.num === 4 ? 'Dimensions :' : engine.num === 10 ? 'Sources :' : 'Secteurs :'}</p>
                        <div className="flex flex-wrap gap-1">
                          {engine.sectors.slice(0, 5).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded text-xs text-foreground-500 bg-background-100 border border-background-200 whitespace-nowrap">{s}</span>
                          ))}
                          {engine.sectors.length > 5 && <span className="px-1.5 py-0.5 rounded text-xs text-foreground-400">+{engine.sectors.length - 5}</span>}
                        </div>
                      </>
                    )}
                    {engine.categories && (
                      <>
                        <p className="text-xs font-semibold text-foreground-700 mb-1.5">{engine.num === 8 ? 'Classification :' : 'Catégories :'}</p>
                        <div className="flex flex-wrap gap-1">
                          {engine.categories.map((c) => (
                            <span key={c} className="px-1.5 py-0.5 rounded text-xs font-medium bg-accent-50 border border-accent-200 text-accent-700 whitespace-nowrap">{c}</span>
                          ))}
                        </div>
                      </>
                    )}
                    {engine.formats && (
                      <>
                        <p className="text-xs font-semibold text-foreground-700 mb-1.5">{engine.num === 12 ? 'Livrables clés :' : 'Formats :'}</p>
                        <div className="flex flex-wrap gap-1">
                          {engine.formats.map((f) => (
                            <span key={f} className="px-1.5 py-0.5 rounded text-xs font-medium bg-secondary-50 border border-secondary-200 text-secondary-700 whitespace-nowrap">{f}</span>
                          ))}
                        </div>
                      </>
                    )}
                    {engine.triggers && (
                      <>
                        <p className="text-xs font-semibold text-foreground-700 mb-1.5">Déclencheurs :</p>
                        <div className="flex flex-wrap gap-1">
                          {engine.triggers.slice(0, 3).map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded text-xs text-foreground-500 bg-background-100 border border-background-200 whitespace-nowrap">{t}</span>
                          ))}
                        </div>
                      </>
                    )}
                    {engine.actions && (
                      <>
                        <p className="text-xs font-semibold text-foreground-700 mb-1.5">Actions :</p>
                        <div className="flex flex-wrap gap-1">
                          {engine.actions.map((a) => (
                            <span key={a} className="px-1.5 py-0.5 rounded text-xs font-medium bg-secondary-50 border border-secondary-200 text-secondary-700 whitespace-nowrap">{a}</span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 5 MÉTA-PROMPTS FONDATEURS ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-50 border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-6">
                <i className="ri-brain-line text-amber-600 text-sm" />
                <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">Niveau Big Four + Think Tank + AI Operating System</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">Les 5 Méta-Prompts Fondateurs KOS&trade;</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed">
                Ces 5 méta-prompts constituent le c&oelig;ur du système KOS. Ils gouvernent, coordonnent et contrôlent l&apos;ensemble des 100 moteurs. Chaque méta-prompt est un cadre de gouvernance autonome qui définit les standards, les processus et les règles de l&apos;intelligence augmentée.
              </p>
            </div>
            <div className="space-y-8">
              {metaPrompts.map((mp, i) => (
                <div key={mp.num} className={`rounded-2xl border ${mp.borderColor} bg-gradient-to-r ${mp.color.replace('from-', 'from-').replace('to-', 'to-')}/5 p-7 sm:p-9 animate-fade-in`} style={{ animationDelay: `${i * 120}ms` }}>
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-64 flex-shrink-0">
                      <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${mp.color} text-white mb-4`}>
                        <span className="font-display font-bold text-2xl">MP{mp.num}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground-950 mb-1 leading-snug">{mp.title}</h3>
                      <p className="text-sm text-foreground-500 font-medium flex items-center gap-1.5">
                        <i className={`${mp.icon} text-foreground-400`} />{mp.role}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground-600 leading-relaxed mb-5 pb-5 border-b border-background-200">{mp.mission}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Responsabilités</h4>
                          <ul className="space-y-1.5">
                            {mp.responsibilities.map((r) => (
                              <li key={r} className="flex items-start gap-2">
                                <i className="ri-checkbox-circle-fill text-deloitte-500 text-sm mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-foreground-700">{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-5">
                          {mp.kpis && (
                            <div>
                              <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">KPI</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {mp.kpis.map((kpi) => (
                                  <div key={kpi.label} className={`rounded-xl ${mp.lightColor} border ${mp.borderColor} p-3 text-center`}>
                                    <span className="block font-display text-xl font-bold text-foreground-950">{kpi.value}</span>
                                    <span className="text-xs text-foreground-500">{kpi.label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {mp.sources && (
                            <div>
                              <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Sources autorisées</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {mp.sources.map((s) => (
                                  <span key={s} className={`px-2.5 py-1 rounded-full text-xs font-medium ${mp.lightColor} border ${mp.borderColor} text-foreground-700 whitespace-nowrap`}>{s}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          {mp.rules && (
                            <div>
                              <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Exemples de collaboration</h4>
                              <div className="space-y-1.5">
                                {mp.rules.map((r, j) => (
                                  <p key={j} className="text-xs text-foreground-600 flex items-start gap-1.5">
                                    <span className="text-amber-500 font-bold flex-shrink-0">{j + 1}.</span>{r}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          {mp.criteria && (
                            <div>
                              <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Critères d&apos;évaluation</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {mp.criteria.map((c) => (
                                  <span key={c} className={`px-2.5 py-1 rounded-full text-xs font-medium ${mp.lightColor} border ${mp.borderColor} text-foreground-700 whitespace-nowrap`}>{c}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          {mp.memoryTypes && (
                            <div>
                              <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Structure mémorielle</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {mp.memoryTypes.map((mt) => (
                                  <div key={mt.title} className={`rounded-xl ${mp.lightColor} border ${mp.borderColor} p-3`}>
                                    <p className="text-xs font-bold text-foreground-700 mb-1">{mt.title}</p>
                                    <div className="flex flex-wrap gap-1">
                                      {mt.items.map((item) => (
                                        <span key={item} className="px-1.5 py-0.5 rounded text-xs text-foreground-500 bg-white/70 border border-background-200 whitespace-nowrap">{item}</span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ KOS GOLDEN RULES ═══════════ */}
        <section className="py-16 sm:py-20 bg-background-100 border-t border-background-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deloitte-50 border border-deloitte-200 mb-6">
                <i className="ri-shield-star-line text-deloitte-600 text-sm" />
                <span className="text-sm font-semibold text-deloitte-700 uppercase tracking-wider">Gouvernance Suprême</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">KOS Golden Rules&trade;</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed">
                Les 10 règles d&apos;or qui gouvernent chaque agent, chaque moteur et chaque méta-prompt du système KOS. Ces règles sont non-négociables et s&apos;appliquent à l&apos;ensemble de l&apos;écosystème.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goldenRules.map((gr, i) => (
                <div key={gr.num} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-background-200 group hover:border-deloitte-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-deloitte-50 border border-deloitte-200 flex-shrink-0 group-hover:bg-deloitte-100 transition-colors">
                    <span className="font-display font-bold text-deloitte-600 text-sm">{gr.num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <i className={`${gr.icon} text-foreground-400 text-sm`} />
                      <span className="text-xs font-semibold text-foreground-400 uppercase tracking-wider">Règle {gr.num}</span>
                    </div>
                    <p className="text-sm text-foreground-700 leading-relaxed"><strong>{gr.rule}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ ARCHITECTURE FINALE KOS™ ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-background-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
                <i className="ri-stack-line text-purple-600 text-sm" />
                <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">Architecture Finale</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">Architecture Finale KOS&trade;</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed">
                Du cœur opérationnel à la plateforme mondiale : les 5 niveaux de l&apos;Enterprise Advisory Operating System&trade; forment une pyramide d&apos;intelligence intégrée, chaque niveau s&apos;appuyant sur le précédent.
              </p>
            </div>
            <div className="flex flex-col items-center gap-0">
              {finalArchitectureLevels.map((lvl, i) => (
                <div key={lvl.level} className={`rounded-2xl border ${lvl.border} bg-gradient-to-r ${lvl.gradient} p-5 sm:p-6 text-center animate-fade-in`} style={{ animationDelay: `${i * 150}ms`, width: i === 0 ? '100%' : i === 1 ? '88%' : i === 2 ? '72%' : i === 3 ? '52%' : '36%' }}>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-background-200 flex-shrink-0">
                      <i className={`${lvl.icon} text-foreground-700 text-lg`} />
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-0.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full bg-white border border-background-200 text-xs font-bold text-foreground-500 whitespace-nowrap">{lvl.level}</span>
                        <span className={`font-display text-sm font-bold ${lvl.textColor}`}>{lvl.label}</span>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed">{lvl.description}</p>
                    </div>
                  </div>
                  {i < finalArchitectureLevels.length - 1 && (
                    <div className="flex justify-center mt-2">
                      <i className="ri-arrow-down-s-line text-foreground-300 text-lg" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CONSTITUTION KOS™ ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-50 border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-6">
                <i className="ri-scales-3-line text-amber-600 text-sm" />
                <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">Autorité Suprême · Édition Fondatrice</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">Constitution KOS&trade;</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed mb-2">KHEPRA OPERATING SYSTEM</p>
            </div>

            {/* Preamble */}
            <div className="max-w-4xl mx-auto mb-14">
              <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <i className="ri-article-line text-amber-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-3 uppercase tracking-wider">Préambule</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-3xl mx-auto italic">{constitutionPreamble}</p>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {constitutionArticles.map((article, i) => (
                <div
                  key={article.num}
                  className="group rounded-2xl border border-background-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200 flex-shrink-0 group-hover:bg-amber-200 transition-colors">
                      <span className="font-display font-bold text-amber-700 text-sm">{article.num}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className={`${article.icon} text-foreground-400 text-sm`} />
                      <h4 className="font-display text-sm font-bold text-foreground-950 uppercase tracking-wider whitespace-nowrap">Article {article.num}</h4>
                    </div>
                  </div>
                  <h5 className="font-display text-base font-bold text-foreground-950 mb-3">{article.title}</h5>
                  <ul className="space-y-2">
                    {article.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {article.note && (
                    <div className="mt-4 pt-3 border-t border-background-200">
                      <p className="text-xs text-foreground-500 italic flex items-start gap-1.5">
                        <i className="ri-information-line text-amber-500 text-xs mt-0.5 flex-shrink-0" />
                        {article.note}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Oath */}
            <div className="max-w-3xl mx-auto mt-14">
              <div className="rounded-3xl border-2 border-deloitte-300 bg-gradient-to-br from-deloitte-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-deloitte-400 via-deloitte-500 to-deloitte-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-deloitte-100 border border-deloitte-200 flex items-center justify-center">
                  <i className="ri-hand-heart-line text-deloitte-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-5 uppercase tracking-wider">Serment KOS&trade;</h3>
                <blockquote className="text-base sm:text-lg text-foreground-700 leading-relaxed italic font-medium max-w-2xl mx-auto">
                  {constitutionOath}
                </blockquote>
                <p className="text-xs text-foreground-400 mt-4">— Chaque agent KOS déclare</p>
              </div>
            </div>

            {/* Statut */}
            <div className="max-w-2xl mx-auto mt-10">
              <div className="rounded-2xl border border-background-200 bg-background-100 p-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 mb-4">
                  <i className="ri-verified-badge-line text-amber-600 text-sm" />
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">{constitutionStatut.label}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div>
                    <p className="text-xs text-foreground-400 mb-0.5">Autorité</p>
                    <p className="text-sm font-semibold text-foreground-800">{constitutionStatut.authority}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-400 mb-0.5">Portée</p>
                    <p className="text-sm font-semibold text-foreground-800">{constitutionStatut.scope}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-400 mb-0.5">Version</p>
                    <p className="text-sm font-semibold text-foreground-800">{constitutionStatut.version}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-400 mb-0.5">Niveau</p>
                    <p className="text-sm font-semibold text-foreground-800">{constitutionStatut.level}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS GOVERNANCE CHARTER ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
                <i className="ri-government-line text-slate-600 text-sm" />
                <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{governanceCharterIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{governanceCharterIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{governanceCharterIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{governanceCharterIntro.preamble}</p>
            </div>

            {/* 5 Organes de Gouvernance */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-building-2-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Les 5 Organes de Gouvernance</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {governanceOrgans.map((organ, i) => (
                  <div
                    key={organ.name}
                    className="group rounded-2xl border border-background-200 bg-background-50 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                        <i className={`${organ.icon} text-slate-600 text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm font-bold text-foreground-950 leading-snug">{organ.name}</h4>
                        <p className="text-xs text-foreground-500">{organ.role}</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {organ.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-xs text-foreground-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    {organ.composition && (
                      <div className="pt-3 border-t border-background-200">
                        <p className="text-xs font-semibold text-foreground-500 mb-1.5">{organ.composition.length === 5 ? 'Composition :' : ''}</p>
                        <div className="flex flex-wrap gap-1">
                          {organ.composition.map((m) => (
                            <span key={m} className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600 whitespace-nowrap">{m}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {/* KOS Crisis Management Engine */}
                <div className="rounded-2xl border-2 border-red-300 bg-gradient-to-br from-red-50/80 to-white p-6 text-center flex flex-col items-center justify-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <i className="ri-shield-flash-line text-red-500 text-xl" />
                  </div>
                  <h4 className="font-display text-sm font-bold text-foreground-950 mb-1">KOS Crisis Management Engine™</h4>
                  <p className="text-xs text-foreground-500 leading-relaxed">Activation immédiate en cas d&apos;incident majeur, faille de sécurité, non-conformité critique ou défaillance systémique.</p>
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-xs font-bold text-red-600 uppercase tracking-wider">Article 14</span>
                </div>
              </div>
            </div>

            {/* 15 Articles */}
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-article-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Les 15 Articles de la Charte</h3>
              </div>
              <div className="space-y-5">
                {governanceCharterArticles.map((article, i) => (
                  <div
                    key={article.num}
                    className="group rounded-2xl border border-background-200 bg-background-50 overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                          <span className="font-display font-bold text-slate-600 text-sm">{article.num}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <i className={`${article.icon} text-foreground-400 text-sm`} />
                            <h4 className="font-display text-base font-bold text-foreground-950">Article {article.num} — {article.title}</h4>
                          </div>

                          {/* Simple items list */}
                          {article.items.length > 0 && (
                            <ul className="space-y-1.5 mb-3">
                              {article.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-foreground-600 leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Decision levels (Article 5) */}
                          {article.levels && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                              {article.levels.map((lvl) => (
                                <div key={lvl.level} className="rounded-xl bg-white border border-background-200 p-3">
                                  <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 mb-1.5 whitespace-nowrap">{lvl.level}</span>
                                  <p className="text-xs text-foreground-600 leading-relaxed">{lvl.desc}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* RACI domains (Article 4) */}
                          {article.categories && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                              {article.categories.map((cat) => (
                                <div key={cat.name} className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-background-200">
                                  <span className="text-xs font-bold text-slate-600 whitespace-nowrap mt-0.5">{cat.name}</span>
                                  <span className="text-xs text-foreground-500 leading-relaxed">{cat.desc}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Subsections (Article 3 — 5 organs detail) */}
                          {article.subsections && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                              {article.subsections.map((sub) => (
                                <div key={sub.title} className="rounded-xl bg-white border border-background-200 p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <i className="ri-checkbox-circle-fill text-slate-500 text-sm" />
                                    <h5 className="text-xs font-bold text-foreground-700">{sub.title}</h5>
                                  </div>
                                  {sub.role && <p className="text-xs text-foreground-500 italic mb-2">{sub.role}</p>}
                                  <ul className="space-y-1">
                                    {sub.items.map((sitem, j) => (
                                      <li key={j} className="flex items-start gap-1.5 text-xs text-foreground-600">
                                        <span className="text-slate-400 font-bold">·</span>
                                        {sitem}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* KPIs (Article 13) */}
                          {article.kpis && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                              {article.kpis.map((kpi) => (
                                <div key={kpi.label} className="rounded-xl bg-white border border-background-200 p-3 text-center">
                                  <span className="block font-display text-lg font-bold text-foreground-950">{kpi.value}</span>
                                  <span className="text-xs text-foreground-500">{kpi.label}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Note */}
                          {article.note && (
                            <div className="mt-3 pt-3 border-t border-background-200">
                              <p className="text-xs text-foreground-500 italic flex items-start gap-1.5">
                                <i className="ri-information-line text-slate-400 text-xs mt-0.5 flex-shrink-0" />
                                {article.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statut de la Charte */}
            <div className="max-w-2xl mx-auto mt-14">
              <div className="rounded-3xl border-2 border-slate-300 bg-gradient-to-br from-slate-50/80 to-white p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400" />
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <i className="ri-verified-badge-line text-slate-600 text-2xl" />
                </div>
                <h4 className="font-display text-lg font-bold text-foreground-950 mb-2 uppercase tracking-wider">Cadre de Gouvernance Officiel</h4>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-xl mx-auto mb-5">
                  La KOS Governance Charter™ constitue le <strong>Niveau 2</strong> de la Hiérarchie des Autorités définie par la Constitution KOS™. Elle s&apos;impose à tous les agents, workflows, moteurs, données et productions de l&apos;écosystème.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div>
                    <p className="text-xs text-foreground-400 mb-0.5">Autorité</p>
                    <p className="text-sm font-semibold text-foreground-800">KOS Governance Council™</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-400 mb-0.5">Portée</p>
                    <p className="text-sm font-semibold text-foreground-800">Écosystème KOS™</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-400 mb-0.5">Version</p>
                    <p className="text-sm font-semibold text-foreground-800">1.0 Entreprise</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-400 mb-0.5">Hiérarchie</p>
                    <p className="text-sm font-semibold text-foreground-800">Niveau 2/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS ENTERPRISE ARCHITECTURE BLUEPRINT ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-50 border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
                <i className="ri-stack-line text-slate-600 text-sm" />
                <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{blueprintIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{blueprintIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{blueprintIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed">{blueprintIntro.objective}</p>
            </div>

            {/* 5 Principes d'Architecture */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-compass-3-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Principes d&apos;Architecture</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {architecturePrinciples.map((principle, i) => (
                  <div key={principle.num} className="rounded-2xl border border-background-200 bg-white p-5 text-center group hover:border-slate-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                      <span className="font-display font-bold text-slate-600 text-sm">{principle.num}</span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-foreground-950 mb-1.5">{principle.title}</h4>
                    <p className="text-xs text-foreground-500 leading-relaxed">{principle.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 15 Couches d'Architecture */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-stack-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Les 15 Couches de l&apos;Architecture Cible</h3>
              </div>
              <div className="space-y-6">
                {blueprintLayers.map((layer, i) => (
                  <div key={layer.num} className={`rounded-2xl border ${layer.border} bg-gradient-to-r ${layer.gradient} p-6 sm:p-7 animate-fade-in`} style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-background-200 flex-shrink-0">
                        <span className="font-display font-bold text-foreground-700 text-sm">{layer.num}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className={`${layer.icon} text-foreground-500 text-lg`} />
                        <h4 className="font-display text-base font-bold text-foreground-950">{layer.title}</h4>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {layer.components.slice(0, 4).map((comp) => (
                        <div key={comp.name} className="rounded-xl bg-white border border-background-200 p-4 group hover:shadow-md transition-all duration-300">
                          <div className="flex items-center gap-2 mb-2">
                            <i className={`${comp.icon} text-foreground-400 text-sm`} />
                            <h5 className="font-display text-xs font-bold text-foreground-950 leading-snug">{comp.name}</h5>
                          </div>
                          <p className="text-xs text-foreground-500 mb-2 leading-relaxed">{comp.description}</p>
                          <ul className="space-y-1">
                            {comp.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-1.5 text-xs text-foreground-600 leading-relaxed">
                                <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Cible — Flow */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-flow-chart text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Architecture Cible — Flux de Données</h3>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center gap-0">
                  {architectureFlow.map((item, i) => (
                    <div key={item.step} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-background-200 bg-white shadow-sm group hover:border-deloitte-300 hover:shadow-md transition-all duration-300" style={{ width: `${Math.max(280, 560 - i * 35)}px` }}>
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-deloitte-50 border border-deloitte-200 flex-shrink-0 group-hover:bg-deloitte-100 transition-colors">
                          <span className="font-display font-bold text-deloitte-600 text-xs">{item.step}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1 justify-center">
                          <i className={`${item.icon} text-foreground-400 text-sm`} />
                          <span className="text-sm font-semibold text-foreground-800 whitespace-nowrap">{item.label}</span>
                        </div>
                      </div>
                      {i < architectureFlow.length - 1 && (
                        <div className="flex flex-col items-center py-1">
                          <i className="ri-arrow-down-s-line text-foreground-300 text-lg" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stack Recommandée */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-code-s-slash-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Stack Technologique Recommandée</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recommendedStack.map((stack, i) => (
                  <div key={stack.category} className="rounded-2xl border border-background-200 bg-white p-5 group hover:border-slate-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <i className={`${stack.icon} text-foreground-400 text-sm`} />
                      <h4 className="font-display text-xs font-bold text-foreground-700 uppercase tracking-wider">{stack.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {stack.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600 whitespace-nowrap">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-deloitte-300 bg-gradient-to-br from-deloitte-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-deloitte-400 via-deloitte-500 to-deloitte-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-deloitte-100 border border-deloitte-200 flex items-center justify-center">
                  <i className="ri-flag-line text-deloitte-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{blueprintIntro.finalObjective}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS OPERATING MANUAL ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
                <i className="ri-book-open-line text-emerald-600 text-sm" />
                <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">{operatingManualIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{operatingManualIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{operatingManualIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{operatingManualIntro.preamble}</p>
            </div>

            {/* 6 Couches Opérationnelles */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200">
                  <i className="ri-stack-line text-emerald-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Structure Générale : 6 Couches Opérationnelles</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {operationalLayers.map((layer, i) => (
                  <div key={layer.num} className="rounded-2xl border border-background-200 bg-background-50 p-5 flex items-center gap-4 group hover:border-emerald-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200 flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                      <span className="font-display font-bold text-emerald-600 text-sm">{layer.num}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <i className={`${layer.icon} text-foreground-400 text-sm`} />
                        <h4 className="font-display text-sm font-bold text-foreground-950">{layer.title}</h4>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed">{layer.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {operationalLayers.map((layer, i) => (
                    <span key={layer.num}>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 whitespace-nowrap">
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-200 text-emerald-700 font-bold text-xs">{layer.num}</span>
                        {layer.title}
                      </span>
                      {i < operationalLayers.length - 1 && (
                        <span className="text-emerald-400 font-bold mx-1">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 20 SOPs */}
            <div className="max-w-4xl mx-auto mb-14">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200">
                  <i className="ri-file-list-3-line text-emerald-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Les 20 Procédures Opérationnelles Standard</h3>
              </div>
              <div className="space-y-5">
                {operatingSOPs.map((sop, i) => (
                  <div key={sop.num} className="group rounded-2xl border border-background-200 bg-background-50 overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200 flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                          <span className="font-display font-bold text-emerald-600 text-xs">SOP {String(sop.num).padStart(2, '0')}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <i className={`${sop.icon} text-foreground-400 text-sm`} />
                            <h4 className="font-display text-base font-bold text-foreground-950">{sop.title}</h4>
                          </div>

                          {/* Steps (SOP 01, etc.) */}
                          {sop.steps && (
                            <div className="space-y-1.5 mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Processus</p>
                              {sop.steps.map((step, j) => (
                                <div key={j} className="flex items-center gap-3 text-sm">
                                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-600 flex-shrink-0">{j + 1}</span>
                                  <span className="text-foreground-600 leading-relaxed">{step}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Inputs + Process + Output (SOP 02) */}
                          {sop.inputs && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Inputs</p>
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {sop.inputs.map((inp) => (
                                  <span key={inp} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">{inp}</span>
                                ))}
                              </div>
                              {sop.process && (
                                <>
                                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Processus</p>
                                  <ul className="space-y-1 mb-3">
                                    {sop.process.map((p, j) => (
                                      <li key={j} className="flex items-start gap-2 text-sm text-foreground-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                                        {p}
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                              {sop.output && (
                                <>
                                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Output</p>
                                  <p className="text-sm text-foreground-600 bg-white border border-background-200 rounded-lg p-3">{sop.output}</p>
                                </>
                              )}
                            </div>
                          )}

                          {/* Simple items (SOP 03, SOP 15) */}
                          {sop.items.length > 0 && !sop.steps && !sop.inputs && (
                            <ul className="space-y-1.5 mb-3">
                              {sop.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-foreground-600 leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Structure (SOP 04) */}
                          {sop.structure && !sop.types && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Format obligatoire</p>
                              <div className="flex flex-wrap gap-1.5">
                                {sop.structure.map((s, j) => (
                                  <span key={j} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">
                                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-emerald-200 text-emerald-700 font-bold text-xs">{j + 1}</span>
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Types + Structure (SOP 05) */}
                          {sop.types && sop.structure && (
                            <div className="mb-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Types de rapports</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {sop.types.map((t, j) => (
                                      <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">{t}</span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Structure</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {sop.structure.map((s, j) => (
                                      <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-background-200 text-foreground-600 whitespace-nowrap">{s}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Triggers (SOP 06) */}
                          {sop.triggers && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Déclencheurs</p>
                              <div className="flex flex-wrap gap-1.5">
                                {sop.triggers.map((t, j) => (
                                  <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">{t}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Sources + Frequency (SOP 07) */}
                          {sop.sources && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                              <div>
                                <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Sources</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {sop.sources.map((s, j) => (
                                    <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">{s}</span>
                                  ))}
                                </div>
                              </div>
                              {sop.frequency && (
                                <div>
                                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Fréquence</p>
                                  <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 border border-emerald-200 text-emerald-700">{sop.frequency}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Criteria + Validation (SOP 08) */}
                          {sop.criteria && (
                            <div className="mb-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Critères</p>
                                  <ul className="space-y-1">
                                    {sop.criteria.map((c, j) => (
                                      <li key={j} className="flex items-start gap-2 text-sm text-foreground-600">
                                        <i className="ri-checkbox-circle-fill text-emerald-500 text-sm mt-0.5 flex-shrink-0" />
                                        {c}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                {sop.validation && (
                                  <div className="flex items-center">
                                    <div className="w-full rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center">
                                      <i className="ri-shield-check-line text-emerald-500 text-2xl mb-2" />
                                      <p className="text-sm font-bold text-emerald-700">{sop.validation}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Process (SOP 09, SOP 20) */}
                          {sop.process && !sop.inputs && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Processus</p>
                              <div className="space-y-1.5">
                                {sop.process.map((p, j) => (
                                  <div key={j} className="flex items-center gap-3 text-sm">
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-600 flex-shrink-0">{j + 1}</span>
                                    <span className="text-foreground-600 leading-relaxed">{p}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Formats (SOP 10) */}
                          {sop.formats && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Formats</p>
                              <div className="flex flex-wrap gap-1.5">
                                {sop.formats.map((f, j) => (
                                  <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">{f}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Cycle (SOP 11) */}
                          {sop.cycle && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Cycle</p>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {sop.cycle.map((c, j) => (
                                  <span key={j}>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">
                                      <span className="w-4 h-4 flex items-center justify-center rounded-full bg-emerald-200 text-emerald-700 font-bold text-xs">{j + 1}</span>
                                      {c}
                                    </span>
                                    {j < sop.cycle!.length - 1 && (
                                      <span className="text-emerald-400 font-bold mx-1 text-xs">→</span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Actions (SOP 12) */}
                          {sop.actions && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Actions</p>
                              <div className="flex flex-wrap gap-1.5">
                                {sop.actions.map((a, j) => (
                                  <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">{a}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Niveaux (SOP 13) */}
                          {sop.niveaux && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Procédure d&rsquo;Escalade</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {sop.niveaux.map((niv, j) => (
                                  <div key={j} className="rounded-lg bg-white border border-background-200 p-3 flex items-start gap-2">
                                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-600 flex-shrink-0">{j + 1}</span>
                                    <div>
                                      <p className="text-xs font-bold text-foreground-700">{niv.level}</p>
                                      <p className="text-xs text-foreground-500 leading-relaxed">{niv.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Types (SOP 14) */}
                          {sop.types && !sop.structure && !sop.niveaux && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Types d&rsquo;incidents</p>
                              <div className="flex flex-wrap gap-1.5">
                                {sop.types.map((t, j) => (
                                  <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 border border-red-200 text-red-700 whitespace-nowrap">{t}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Livrables (SOP 16) */}
                          {sop.livrables && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Livrables</p>
                              <div className="flex flex-wrap gap-1.5">
                                {sop.livrables.map((l, j) => (
                                  <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">{l}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Content (SOP 17) */}
                          {sop.content && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Contenu</p>
                              <div className="flex flex-wrap gap-1.5">
                                {sop.content.map((c, j) => (
                                  <span key={j} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">
                                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-emerald-200 text-emerald-700 font-bold text-xs">{j + 1}</span>
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Mesures (SOP 18) */}
                          {sop.mesures && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Mesures</p>
                              <div className="flex flex-wrap gap-1.5">
                                {sop.mesures.map((m, j) => (
                                  <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">{m}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* KPIs + Frequency (SOP 19) */}
                          {sop.kpis && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                              <div>
                                <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Fréquence</p>
                                <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 border border-emerald-200 text-emerald-700">{sop.frequency}</span>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">KPI</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {sop.kpis.map((k, j) => (
                                    <span key={j} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">{k}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Example (SOP 03) */}
                          {sop.example && (
                            <div className="mt-2 p-3 rounded-lg bg-white border border-background-200">
                              <p className="text-xs text-foreground-500 italic flex items-start gap-1.5">
                                <i className="ri-lightbulb-line text-emerald-500 text-xs mt-0.5 flex-shrink-0" />
                                {sop.example}
                              </p>
                            </div>
                          )}

                          {/* Note */}
                          {sop.note && (
                            <div className="mt-3 pt-3 border-t border-background-200">
                              <p className="text-xs text-foreground-500 italic flex items-start gap-1.5">
                                <i className="ri-information-line text-emerald-400 text-xs mt-0.5 flex-shrink-0" />
                                {sop.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Standard Global */}
            <div className="max-w-4xl mx-auto mb-10">
              <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-award-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-5 uppercase tracking-wider">Standard Global</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {manualGlobalStandard.items.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-700 whitespace-nowrap">
                      <i className="ri-checkbox-circle-fill text-emerald-500 text-sm" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-deloitte-300 bg-gradient-to-br from-deloitte-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-deloitte-400 via-deloitte-500 to-deloitte-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-deloitte-100 border border-deloitte-200 flex items-center justify-center">
                  <i className="ri-flag-line text-deloitte-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{manualFinalObjective}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS AGENT CATALOG ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-50 border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 mb-6">
                <i className="ri-robot-2-line text-violet-600 text-sm" />
                <span className="text-sm font-semibold text-violet-700 uppercase tracking-wider">{catalogIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{catalogIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{catalogIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{catalogIntro.preamble}</p>
            </div>

            {/* 20 Agents Catalog */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 border border-violet-200">
                  <i className="ri-robot-2-line text-violet-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Les 20 Agents du Catalogue</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {catalogAgents.map((agent, i) => (
                  <div
                    key={agent.num}
                    className="group rounded-2xl border border-background-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-violet-100 border border-violet-200 flex-shrink-0 group-hover:bg-violet-200 transition-colors">
                          <span className="font-display font-bold text-violet-600 text-xs">A{String(agent.num).padStart(2, '0')}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-sm font-bold text-foreground-950 leading-snug">{agent.name}</h4>
                          <p className="text-xs text-foreground-500 mt-0.5">{agent.domain}</p>
                        </div>
                      </div>

                      {/* Mission */}
                      <div className="mb-3">
                        <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-1.5">Mission</p>
                        <p className="text-sm text-foreground-600 leading-relaxed">{agent.mission}</p>
                      </div>

                      {/* Inputs */}
                      {agent.inputs && (
                        <div className="mb-3">
                          <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-1.5">Inputs</p>
                          <div className="flex flex-wrap gap-1">
                            {agent.inputs.map((inp) => (
                              <span key={inp} className="px-2 py-0.5 rounded-full text-xs font-medium bg-violet-50 border border-violet-200 text-violet-700 whitespace-nowrap">{inp}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Process */}
                      {agent.process && (
                        <div className="mb-3">
                          <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-1.5">Processus</p>
                          <div className="flex flex-wrap gap-1">
                            {agent.process.map((p) => (
                              <span key={p} className="px-2 py-0.5 rounded-full text-xs font-medium bg-white border border-background-200 text-foreground-600 whitespace-nowrap">{p}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Outputs */}
                      <div className="mb-3">
                        <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-1.5">Outputs</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.outputs.map((out) => (
                            <span key={out} className="px-2 py-0.5 rounded-full text-xs font-medium bg-violet-50 border border-violet-200 text-violet-700 whitespace-nowrap">{out}</span>
                          ))}
                        </div>
                      </div>

                      {/* KPIs */}
                      {agent.kpis && (
                        <div className="pt-3 border-t border-background-200">
                          <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-1.5">KPI</p>
                          <div className="grid grid-cols-2 gap-2">
                            {agent.kpis.map((kpi) => (
                              <div key={kpi.label} className="rounded-lg bg-violet-50 border border-violet-200 p-2 text-center">
                                <span className="block font-display text-lg font-bold text-violet-700">{kpi.value}</span>
                                <span className="text-xs text-foreground-500">{kpi.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Global Rules */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
                  <i className="ri-shield-star-line text-amber-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Règles Globales des Agents</h3>
              </div>
              <div className="max-w-3xl mx-auto bg-gradient-to-br from-amber-50/80 to-white rounded-2xl border-2 border-amber-200 p-7 sm:p-9">
                <div className="space-y-4">
                  {globalAgentRules.map((rule, i) => (
                    <div key={rule.num} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200 flex-shrink-0">
                        <span className="font-display font-bold text-amber-600 text-sm">{rule.num}</span>
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-foreground-700 text-sm sm:text-base font-medium flex items-center gap-2">
                          <i className={`${rule.icon} text-amber-500 text-sm`} />
                          <strong className="text-foreground-950">RÈGLE {rule.num}</strong> — {rule.rule}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Orchestration Model + System KPIs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
              {/* Orchestration Model */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 border border-violet-200">
                    <i className="ri-flow-chart text-violet-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">Modèle d&apos;Orchestration</h3>
                </div>
                <div className="rounded-2xl border-2 border-violet-200 bg-white p-7">
                  <div className="flex flex-col items-center gap-0">
                    {orchestrationModel.map((item, i) => (
                      <div key={item} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-violet-50 border border-violet-200" style={{ width: `${Math.max(220, 380 - i * 25)}px` }}>
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-200 flex-shrink-0">
                            <span className="font-display font-bold text-violet-700 text-xs">{i + 1}</span>
                          </div>
                          <div className="flex-1 text-center">
                            <span className="text-sm font-semibold text-foreground-800 whitespace-nowrap">{item}</span>
                          </div>
                        </div>
                        {i < orchestrationModel.length - 1 && (
                          <div className="flex flex-col items-center py-1">
                            <i className="ri-arrow-down-s-line text-violet-300 text-lg" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* System KPIs */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 border border-violet-200">
                    <i className="ri-bar-chart-2-line text-violet-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">KPI Système</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {systemKPIs.map((kpi, i) => (
                    <div key={kpi.label} className="rounded-2xl border border-background-200 bg-white p-5 text-center group hover:border-violet-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                      <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                        <i className={`${kpi.icon} text-white text-lg`} />
                      </div>
                      <span className="block font-display text-2xl font-bold text-foreground-950 mb-1">{kpi.value}</span>
                      <span className="text-xs text-foreground-500 font-medium">{kpi.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Final Objective */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-violet-300 bg-gradient-to-br from-violet-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-violet-500 to-violet-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center">
                  <i className="ri-flag-line text-violet-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{catalogFinalObjective}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS DATA GOVERNANCE & RAG FRAMEWORK ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 mb-6">
                <i className="ri-database-2-line text-teal-600 text-sm" />
                <span className="text-sm font-semibold text-teal-700 uppercase tracking-wider">{ragFrameworkIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{ragFrameworkIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{ragFrameworkIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{ragFrameworkIntro.objective}</p>
            </div>

            {/* 5 Principes Fondamentaux */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 border border-teal-200">
                  <i className="ri-compass-3-line text-teal-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Principes Fondamentaux</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {dataGovernancePrinciples.map((principle, i) => (
                  <div key={principle.num} className="rounded-2xl border border-background-200 bg-background-50 p-5 text-center group hover:border-teal-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className={`w-11 h-11 mx-auto mb-3 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center group-hover:bg-teal-200 transition-colors`}>
                      <span className="font-display font-bold text-teal-600 text-sm">{principle.num}</span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-foreground-950 mb-1.5">{principle.title}</h4>
                    <p className="text-xs text-foreground-500 leading-relaxed">{principle.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sources de Données Autorisées */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 border border-teal-200">
                  <i className="ri-folder-open-line text-teal-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Sources de Données Autorisées</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {dataSources.map((source, i) => (
                  <div key={source.name} className="rounded-2xl border border-background-200 bg-background-50 overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${source.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-background-200">
                          <i className={`${source.icon} text-foreground-500 text-lg`} />
                        </div>
                        <h4 className="font-display text-sm font-bold text-foreground-950">{source.name}</h4>
                      </div>
                      <ul className="space-y-2">
                        {source.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-foreground-600 leading-relaxed">
                            <i className="ri-checkbox-circle-fill text-teal-500 text-sm mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Ingestion Pipeline + RAG Architecture side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Pipeline */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 border border-teal-200">
                    <i className="ri-flow-chart text-teal-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">Data Ingestion Pipeline</h3>
                </div>
                <div className="flex flex-col items-center gap-0">
                  {ingestionPipeline.map((step, i) => (
                    <div key={step.num} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-background-200 bg-background-50 shadow-sm group hover:border-teal-300 hover:shadow-md transition-all duration-300" style={{ width: '100%', maxWidth: '420px' }}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 border border-teal-200 flex-shrink-0 group-hover:bg-teal-200 transition-colors">
                          <span className="font-display font-bold text-teal-600 text-sm">{step.num}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <i className={`${step.icon} text-foreground-400 text-sm`} />
                            <h4 className="font-display text-sm font-bold text-foreground-950">{step.title}</h4>
                          </div>
                          <p className="text-xs text-foreground-500 mb-1.5">{step.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {step.details.map((d) => (
                              <span key={d} className="px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 border border-teal-200 text-teal-700 whitespace-nowrap">{d}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {i < ingestionPipeline.length - 1 && (
                        <div className="flex flex-col items-center py-1">
                          <i className="ri-arrow-down-s-line text-teal-300 text-lg" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* RAG Architecture */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 border border-teal-200">
                    <i className="ri-stack-line text-teal-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">RAG Architecture</h3>
                </div>

                {/* RAG Pipeline */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Pipeline RAG</p>
                  <div className="flex flex-col items-center gap-0">
                    {ragPipelineSteps.map((step, i) => (
                      <div key={step} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-background-50 border border-background-200" style={{ width: `${Math.max(200, 340 - i * 15)}px` }}>
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-teal-100 border border-teal-200 flex-shrink-0">
                            <span className="font-display font-bold text-teal-600 text-xs">{i + 1}</span>
                          </div>
                          <span className="text-xs font-semibold text-foreground-700 whitespace-nowrap">{step}</span>
                        </div>
                        {i < ragPipelineSteps.length - 1 && (
                          <div className="flex flex-col items-center py-0.5">
                            <i className="ri-arrow-down-s-line text-teal-300 text-sm" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* RAG Layers */}
                <div className="space-y-4">
                  {ragArchitectureLayers.map((layer, i) => (
                    <div key={layer.title} className="rounded-xl border border-background-200 bg-background-50 p-5 group hover:border-teal-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <i className={`${layer.icon} text-teal-500 text-sm`} />
                        <h4 className="font-display text-sm font-bold text-foreground-950">{layer.title}</h4>
                      </div>
                      <p className="text-xs text-foreground-500 mb-3 leading-relaxed">{layer.description}</p>
                      {layer.technologies && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {layer.technologies.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 border border-teal-200 text-teal-700 whitespace-nowrap">{t}</span>
                          ))}
                        </div>
                      )}
                      {layer.functions && (
                        <div className="flex flex-wrap gap-1">
                          {layer.functions.map((f) => (
                            <span key={f} className="px-2 py-0.5 rounded-full text-xs font-medium bg-white border border-background-200 text-foreground-600 whitespace-nowrap">{f}</span>
                          ))}
                        </div>
                      )}
                      {layer.relations && (
                        <div className="flex flex-wrap gap-1">
                          {layer.relations.map((r) => (
                            <span key={r} className="px-2 py-0.5 rounded-full text-xs font-medium bg-white border border-background-200 text-foreground-600 whitespace-nowrap">{r}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Anti-Hallucination System */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-100 border border-rose-200">
                  <i className="ri-shield-flash-line text-rose-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Anti-Hallucination System</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                {antiHallucinationRules.map((rule, i) => (
                  <div key={rule.num} className="rounded-2xl border border-background-200 bg-background-50 p-6 group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${rule.color} text-white mb-4`}>
                      <i className={`${rule.icon} text-lg`} />
                    </div>
                    <h4 className="font-display text-sm font-bold text-foreground-950 mb-2">{rule.title}</h4>
                    <p className="text-xs text-foreground-600 leading-relaxed">{rule.description}</p>
                  </div>
                ))}
              </div>

              {/* Confidence Levels */}
              <div className="max-w-3xl mx-auto">
                <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 text-center">Confidence Scoring — Échelle 0-100</p>
                <div className="flex items-center gap-0">
                  {confidenceLevels.map((level, i) => (
                    <div key={level.range} className="flex-1 text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className={`mx-auto mb-2 w-10 h-10 flex items-center justify-center rounded-full ${level.color} text-white`}>
                        <i className={`${level.icon} text-sm`} />
                      </div>
                      <p className="text-xs font-bold text-foreground-950 mb-0.5">{level.range}</p>
                      <p className="text-xs text-foreground-500 leading-tight">{level.label}</p>
                      <p className="text-xs text-foreground-400 leading-tight mt-0.5">{level.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Classification + Quality Framework */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Classification */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 border border-teal-200">
                    <i className="ri-lock-line text-teal-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">Data Classification Model</h3>
                </div>
                <div className="space-y-3">
                  {dataClassifications.map((level, i) => (
                    <div key={level.level} className={`rounded-xl border ${level.bgColor} p-4 flex items-start gap-3 group hover:shadow-md transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${i * 60}ms` }}>
                      <div className={`w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-background-200 flex-shrink-0`}>
                        <i className={`${level.icon} ${level.color} text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-foreground-500 uppercase">{level.level}</span>
                          <span className={`text-sm font-bold ${level.color}`}>{level.label}</span>
                        </div>
                        <p className="text-xs text-foreground-600 leading-relaxed mb-1.5">{level.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {level.examples.map((ex) => (
                            <span key={ex} className="px-2 py-0.5 rounded-full text-xs font-medium bg-white border border-background-200 text-foreground-500 whitespace-nowrap">{ex}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Framework */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 border border-teal-200">
                    <i className="ri-award-line text-teal-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">Data Quality Framework</h3>
                </div>
                <div className="space-y-4 mb-8">
                  {ragQualityDimensions.map((dim, i) => (
                    <div key={dim.name} className="rounded-xl border border-background-200 bg-background-50 p-4 flex items-center gap-4 group hover:border-teal-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 border border-teal-200 flex-shrink-0">
                        <i className={`${dim.icon} text-teal-600 text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm font-bold text-foreground-950 mb-0.5">{dim.name}</h4>
                        <p className="text-xs text-foreground-500 leading-relaxed">{dim.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border-2 border-teal-300 bg-gradient-to-br from-teal-50/80 to-white p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-teal-300 flex items-center justify-center bg-white">
                    <div>
                      <span className="block font-display text-2xl font-bold text-teal-700">95</span>
                      <span className="block text-xs text-teal-400">/100</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-foreground-950">Score minimal requis</p>
                  <p className="text-xs text-foreground-500 mt-1">Toute donnée inférieure à 95/100 est rejetée ou renvoyée pour enrichissement.</p>
                </div>
              </div>
            </div>

            {/* Knowledge Lifecycle + Update Frequencies */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Lifecycle */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 border border-teal-200">
                    <i className="ri-loop-left-line text-teal-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">Knowledge Lifecycle</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {knowledgeLifecycle.map((step, i) => (
                    <div key={step.num} className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="rounded-xl border border-background-200 bg-background-50 p-3 text-center group hover:border-teal-300 hover:shadow-md transition-all duration-300" style={{ minWidth: '100px' }}>
                        <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center">
                          <i className={`${step.icon} text-teal-600 text-sm`} />
                        </div>
                        <span className="block text-xs font-bold text-foreground-950">{step.num}. {step.title}</span>
                        <span className="block text-xs text-foreground-400 mt-0.5">{step.description}</span>
                      </div>
                      {i < knowledgeLifecycle.length - 1 && (
                        <i className="ri-arrow-right-s-line text-teal-300 text-sm flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Update Frequencies */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 border border-teal-200">
                    <i className="ri-timer-line text-teal-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">Real-Time Knowledge Update</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {updateFrequencies.map((freq, i) => (
                    <div key={freq.label} className="rounded-xl border border-background-200 bg-background-50 p-5 flex items-center gap-4 group hover:border-teal-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${freq.color} text-white flex-shrink-0`}>
                        <i className={`${freq.icon} text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm font-bold text-foreground-950">{freq.label}</h4>
                        <p className="text-xs text-foreground-500">Fréquence de mise à jour</p>
                      </div>
                      <span className="px-4 py-2 rounded-full bg-teal-100 border border-teal-200 text-sm font-bold text-teal-700 whitespace-nowrap">{freq.frequency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Governance Rules + RAG Response Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Governance Rules */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
                    <i className="ri-shield-star-line text-amber-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">Governance Rules</h3>
                </div>
                <div className="space-y-3">
                  {ragGovernanceRules.map((rule, i) => (
                    <div key={rule.num} className="rounded-xl border-2 border-amber-200 bg-gradient-to-r from-amber-50/80 to-white p-5 flex items-start gap-4 group hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200 flex-shrink-0">
                        <span className="font-display font-bold text-amber-600 text-sm">{rule.num}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <i className={`${rule.icon} text-amber-500 text-sm`} />
                          <h4 className="font-display text-sm font-bold text-foreground-950">{rule.title}</h4>
                        </div>
                        <p className="text-xs text-foreground-600 leading-relaxed">{rule.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RAG Response Structure */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 border border-teal-200">
                    <i className="ri-chat-1-line text-teal-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">RAG Response Structure</h3>
                </div>
                <div className="rounded-2xl border border-background-200 bg-background-50 p-6">
                  <div className="space-y-3">
                    {ragResponseStructure.map((step, i) => (
                      <div key={step.num} className="flex items-center gap-4 p-3 rounded-xl bg-white border border-background-200 group hover:border-teal-300 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 border border-teal-200 flex-shrink-0">
                          <span className="font-display font-bold text-teal-600 text-xs">{step.num}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <i className={`${step.icon} text-foreground-400 text-xs`} />
                            <h4 className="font-display text-sm font-bold text-foreground-950">{step.title}</h4>
                          </div>
                          <p className="text-xs text-foreground-500 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="mt-6">
                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Performance Metrics</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ragPerformanceMetrics.map((metric, i) => (
                      <div key={metric.label} className="rounded-xl border border-background-200 bg-background-50 p-3 text-center group hover:border-teal-300 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                        <div className={`w-9 h-9 mx-auto mb-2 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                          <i className={`${metric.icon} text-white text-sm`} />
                        </div>
                        <span className="block font-display text-lg font-bold text-foreground-950">{metric.value}</span>
                        <span className="text-xs text-foreground-500 leading-tight">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-teal-300 bg-gradient-to-br from-teal-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center">
                  <i className="ri-flag-line text-teal-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{ragFrameworkIntro.finalObjective}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS RUNTIME ENGINE ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-50 border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200 mb-6">
                <i className="ri-cpu-line text-cyan-600 text-sm" />
                <span className="text-sm font-semibold text-cyan-700 uppercase tracking-wider">{runtimeIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{runtimeIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{runtimeIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{runtimeIntro.role}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-100 border border-cyan-300">
                <i className="ri-flashlight-line text-cyan-600" />
                <span className="text-sm font-bold text-cyan-700">{runtimeIntro.tagline}</span>
              </div>
            </div>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-100 border border-cyan-200">
                  <i className="ri-flow-chart text-cyan-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Architecture Logique du Runtime</h3>
              </div>
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center gap-0">
                  {runtimeArchitectureFlow.map((item, i) => (
                    <div key={item.step} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                      <div className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl border border-background-200 bg-white group hover:border-cyan-300 hover:shadow-md transition-all duration-300 ${i === 0 ? 'border-cyan-300 ring-1 ring-cyan-200' : ''} ${i === runtimeArchitectureFlow.length - 1 ? 'border-cyan-400 ring-1 ring-cyan-300 bg-gradient-to-r from-cyan-50 to-white' : ''}`} style={{ width: `${Math.max(280, 560 - i * 18)}px` }}>
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-cyan-100 border border-cyan-200 flex-shrink-0 group-hover:bg-cyan-200 transition-colors">
                          <span className="font-display font-bold text-cyan-600 text-xs">{item.step}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1 justify-center min-w-0">
                          <i className={`${item.icon} text-foreground-400 text-sm flex-shrink-0`} />
                          <span className="text-sm font-semibold text-foreground-800 whitespace-nowrap">{item.label}</span>
                        </div>
                      </div>
                      {i < runtimeArchitectureFlow.length - 1 && (
                        <div className="flex flex-col items-center py-0.5">
                          <i className="ri-arrow-down-s-line text-cyan-300 text-lg" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-100 border border-cyan-200">
                  <i className="ri-stack-line text-cyan-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Les 10 Composants Principaux</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {runtimeComponents.map((comp, i) => (
                  <div key={comp.id} className="group rounded-2xl border border-background-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-cyan-100 border border-cyan-200 flex-shrink-0 group-hover:bg-cyan-200 transition-colors">
                          <span className="font-display font-bold text-cyan-600 text-xs">{comp.num}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <i className={`${comp.icon} text-foreground-400 text-sm`} />
                            <h4 className="font-display text-base font-bold text-foreground-950">{comp.title}</h4>
                          </div>
                          <p className="text-xs text-foreground-500 font-medium mb-2">{comp.role}</p>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-3">{comp.description}</p>
                        </div>
                      </div>
                      {comp.technology && (
                        <div className="mb-3">
                          <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-1.5">Technologie</p>
                          <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-cyan-50 border border-cyan-200 text-cyan-700">{comp.technology}</span>
                        </div>
                      )}
                      {comp.endpoints && (
                        <div className="mb-3">
                          <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-1.5">Endpoints clés</p>
                          <div className="flex flex-wrap gap-1">
                            {comp.endpoints.map((ep) => (
                              <code key={ep} className="px-2 py-0.5 rounded text-xs font-mono bg-background-100 border border-background-200 text-foreground-600 whitespace-nowrap">{ep}</code>
                            ))}
                          </div>
                        </div>
                      )}
                      {comp.details && !comp.subLayers && !comp.scoringRules && (
                        <div>
                          <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-1.5">
                            {comp.id === 'output-assembler' ? 'Format standard' : comp.id === 'quality-control-engine' ? 'Vérifications' : comp.id === 'reasoning-engine' ? 'Méthodes' : comp.id === 'agent-router' ? 'Logique de routage' : comp.id === 'intent-classifier' ? 'Types de demandes' : 'Détails'}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {comp.details.map((d) => (
                              <span key={d} className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-50 border border-cyan-200 text-cyan-700 whitespace-nowrap">{d}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {comp.subLayers && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {comp.subLayers.map((sub) => (
                            <div key={sub.title} className="rounded-xl bg-background-50 border border-background-200 p-4 hover:border-cyan-200 transition-colors">
                              <div className="flex items-center gap-2 mb-2">
                                <i className={`${sub.icon} text-foreground-400 text-sm`} />
                                <h5 className="font-display text-xs font-bold text-foreground-950">{sub.title}</h5>
                              </div>
                              <p className="text-xs text-foreground-500 mb-2 leading-relaxed">{sub.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {sub.items.map((item) => (
                                  <span key={item} className="px-1.5 py-0.5 rounded text-xs font-medium bg-cyan-50 border border-cyan-200 text-cyan-700 whitespace-nowrap">{item}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {comp.scoringRules && (
                        <div>
                          <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Règles de scoring</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {comp.scoringRules.map((rule) => (
                              <div key={rule.label} className="rounded-xl bg-background-50 border border-background-200 p-4 text-center">
                                <div className={`w-10 h-10 mx-auto mb-2 rounded-full ${rule.color} flex items-center justify-center`}>
                                  <span className="text-white font-display font-bold text-sm">{rule.threshold}</span>
                                </div>
                                <p className="text-sm font-bold text-foreground-950">{rule.label}</p>
                                <code className="block mt-1 text-xs font-mono text-foreground-500">{rule.action}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-100 border border-cyan-200">
                  <i className="ri-play-circle-line text-cyan-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Flow Complet d&apos;Exécution — Exemple</h3>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50/80 to-white overflow-hidden">
                  <div className="p-5 sm:p-6 border-b border-cyan-100 bg-cyan-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-100 border border-cyan-200">
                        <i className="ri-chat-3-line text-cyan-600 text-lg" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider">Input utilisateur</p>
                        <p className="text-base sm:text-lg font-bold text-foreground-950">&ldquo;{executionExample.input}&rdquo;</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="space-y-3">
                      {executionExample.steps.map((step, i) => (
                        <div key={step.agent} className="flex items-center gap-4 p-3 rounded-xl bg-white border border-background-200 group hover:border-cyan-200 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-cyan-100 border border-cyan-200 flex-shrink-0">
                            <i className={`${step.icon} text-cyan-600 text-sm`} />
                          </div>
                          <div className="flex-1 min-w-0 flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground-950 whitespace-nowrap">{step.agent}</span>
                            <i className="ri-arrow-right-line text-foreground-300 text-xs flex-shrink-0" />
                            <span className="text-sm text-foreground-600">{step.action}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-100 border border-cyan-200">
                    <i className="ri-code-s-slash-line text-cyan-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">Stack Technique Final</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {technicalStack.map((stack, i) => (
                    <div key={stack.category} className="rounded-xl border border-background-200 bg-white p-4 group hover:border-cyan-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <i className={`${stack.icon} text-foreground-400 text-sm`} />
                        <h4 className="font-display text-xs font-bold text-foreground-700 uppercase tracking-wider">{stack.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {stack.items.map((item) => (
                          <span key={item} className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-50 border border-cyan-200 text-cyan-700 whitespace-nowrap">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-100 border border-cyan-200">
                    <i className="ri-bar-chart-2-line text-cyan-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">KPI du Runtime Engine</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {runtimeKPIs.map((kpi, i) => (
                    <div key={kpi.label} className="rounded-2xl border border-background-200 bg-white p-5 text-center group hover:border-cyan-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                      <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                        <i className={`${kpi.icon} text-white text-lg`} />
                      </div>
                      <span className="block font-display text-2xl font-bold text-foreground-950 mb-1">{kpi.value}</span>
                      <span className="text-xs text-foreground-500 font-medium">{kpi.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-100 border border-cyan-200">
                  <i className="ri-rocket-line text-cyan-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Ce que ce moteur rend possible</h3>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { label: 'KOS devient exécutable', icon: 'ri-play-circle-line' },
                    { label: 'Agents deviennent services', icon: 'ri-robot-2-line' },
                    { label: 'Prompts deviennent workflows', icon: 'ri-flow-chart' },
                    { label: 'Knowledge devient actif', icon: 'ri-database-2-line' },
                    { label: 'Diagnostics automatisés', icon: 'ri-bar-chart-grouped-line' },
                    { label: 'Rapports en temps réel', icon: 'ri-file-list-3-line' },
                  ].map((item, i) => (
                    <div key={item.label} className="rounded-xl border border-background-200 bg-white p-4 text-center group hover:border-cyan-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                      <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-cyan-100 border border-cyan-200 flex items-center justify-center">
                        <i className={`${item.icon} text-cyan-600 text-sm`} />
                      </div>
                      <p className="text-xs font-semibold text-foreground-700 leading-snug">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
                    <i className="ri-star-line text-amber-600 text-lg" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground-950">La Différence Big Four</h3>
                </div>
                <div className="space-y-3">
                  {bigFourDiff.map((item, i) => (
                    <div key={item.title} className="rounded-xl border-2 border-amber-200 bg-gradient-to-r from-amber-50/80 to-white p-4 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <i className={`${item.icon} text-amber-500 text-sm`} />
                        <h4 className="font-display text-sm font-bold text-foreground-950">{item.title}</h4>
                      </div>
                      <p className="text-xs text-foreground-600 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-100 border border-rose-200">
                    <i className="ri-alert-line text-rose-600 text-lg" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground-950">Limites Actuelles</h3>
                </div>
                <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-5">
                  <p className="text-xs text-foreground-600 mb-3 leading-relaxed">Même avec ce runtime, il faut :</p>
                  <ul className="space-y-2">
                    {limitations.map((lim, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                        <i className="ri-arrow-right-s-line text-rose-400 text-sm mt-0.5 flex-shrink-0" />
                        {lim}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200">
                    <i className="ri-arrow-right-circle-line text-emerald-600 text-lg" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground-950">Prochaine Étape Logique</h3>
                </div>
                <div className="rounded-xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-5">
                  <p className="text-sm text-foreground-700 leading-relaxed font-medium flex items-start gap-2">
                    <i className="ri-lightbulb-flash-line text-emerald-500 text-sm mt-0.5 flex-shrink-0" />
                    {runtimeNextStep}
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-cyan-300 bg-gradient-to-br from-cyan-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center">
                  <i className="ri-cpu-line text-cyan-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Conclusion</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{runtimeIntro.conclusion}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS MASTER PROMPT — AUTO-IMPROVEMENT ENGINE ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 mb-6">
                <i className="ri-loop-left-line text-rose-600 text-sm" />
                <span className="text-sm font-semibold text-rose-700 uppercase tracking-wider">{masterPromptIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{masterPromptIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{masterPromptIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{masterPromptIntro.role}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-100 border border-rose-300">
                <i className="ri-brain-line text-rose-600" />
                <span className="text-sm font-bold text-rose-700">{masterPromptIntro.tagline}</span>
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                  <i className="ri-flag-line text-rose-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{masterPromptIntro.objective}</p>
              </div>
            </div>

            {/* Mode d'Opération */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-100 border border-rose-200">
                  <i className="ri-flow-chart text-rose-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Mode d&apos;Opération — 5 Phases Obligatoires</h3>
              </div>
              <p className="text-base text-foreground-600 max-w-4xl mb-8 leading-relaxed">{masterPromptIntro.modeOfOperation}</p>

              <div className="space-y-8">
                {masterPromptPhases.map((phase, i) => (
                  <div key={phase.num} className={`rounded-2xl border border-background-200 bg-background-50 overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in`} style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${phase.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${phase.color} text-white flex-shrink-0`}>
                          <i className={`${phase.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${phase.color}`}>PHASE {phase.num}</span>
                            <h4 className="font-display text-xl font-bold text-foreground-950">{phase.title}</h4>
                          </div>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-5">{phase.description}</p>

                          {/* Details Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                            {phase.details.map((detail, j) => (
                              <div key={j} className="flex items-start gap-2.5 text-sm text-foreground-700">
                                <i className="ri-checkbox-circle-fill text-rose-500 text-sm mt-0.5 flex-shrink-0" />
                                <span className="leading-relaxed">{detail}</span>
                              </div>
                            ))}
                          </div>

                          {/* Deliverables */}
                          <div className="mb-5">
                            <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Livrables</p>
                            <div className="flex flex-wrap gap-1.5">
                              {phase.deliverables.map((d, j) => (
                                <span key={j} className="px-3 py-1.5 rounded-full text-xs font-medium bg-rose-50 border border-rose-200 text-rose-700 whitespace-nowrap">{d}</span>
                              ))}
                            </div>
                          </div>

                          {/* Comparison Targets (Phase 2) */}
                          {phase.comparisonTargets && (
                            <div>
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Cibles de Comparaison</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {phase.comparisonTargets.map((target) => (
                                  <div key={target.name} className="rounded-xl bg-white border border-background-200 p-4 group hover:border-rose-300 hover:shadow-sm transition-all duration-300">
                                    <div className="flex items-center gap-2 mb-2">
                                      <i className={`${target.icon} text-foreground-400 text-sm`} />
                                      <h5 className="font-display text-sm font-bold text-foreground-950">{target.name}</h5>
                                      <span className={`text-xs font-bold ${target.gapColor} ml-auto`}>Gap : {target.gapLevel}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {target.dimensions.map((dim) => (
                                        <span key={dim} className="px-2 py-0.5 rounded-full text-xs font-medium bg-rose-50 border border-rose-200 text-rose-700 whitespace-nowrap">{dim}</span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Sub-sections (Phases 3, 4, 5) */}
                          {phase.subSections && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                              {phase.subSections.map((sub) => (
                                <div key={sub.title} className="rounded-xl bg-white border border-background-200 p-5 group hover:border-rose-300 hover:shadow-sm transition-all duration-300">
                                  <div className="flex items-center gap-2 mb-3">
                                    <i className={`${sub.icon} text-foreground-400 text-sm`} />
                                    <h5 className="font-display text-sm font-bold text-foreground-950">{sub.title}</h5>
                                  </div>
                                  <ul className="space-y-1.5">
                                    {sub.items.map((item, j) => (
                                      <li key={j} className="flex items-start gap-2 text-xs text-foreground-600 leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Upgrade Matrix (Phase 3) */}
                          {phase.upgradeMatrix && (
                            <div className="mt-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 border border-rose-200">
                                  <i className="ri-grid-line text-rose-600 text-sm" />
                                </div>
                                <h5 className="font-display text-base font-bold text-foreground-950">Matrice Impact / Effort / Risque</h5>
                              </div>
                              <p className="text-xs text-foreground-500 mb-5 leading-relaxed">Chaque upgrade est évalué sur 3 axes (1–5). Impact = valeur business générée, Effort = complexité de mise en œuvre, Risque = probabilité d&apos;échec ou de régression. La timeline indique la durée estimée de déploiement.</p>

                              {/* Legend */}
                              <div className="flex flex-wrap items-center gap-4 mb-5">
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                                  <span className="text-xs font-semibold text-emerald-700">Impact (valeur)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                                  <span className="text-xs font-semibold text-amber-700">Effort (complexité)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                                  <span className="text-xs font-semibold text-rose-700">Risque (probabilité)</span>
                                </div>
                              </div>

                              <div className="space-y-5">
                                {phase.upgradeMatrix.map((bloc) => (
                                  <div key={bloc.bloc} className="rounded-xl border border-background-200 bg-white overflow-hidden">
                                    <div className={`px-5 py-3 bg-gradient-to-r ${bloc.color} text-white`}>
                                      <div className="flex items-center gap-2">
                                        <span className="w-7 h-7 flex items-center justify-center rounded-md bg-white/20 text-white font-display font-bold text-xs">B{bloc.bloc}</span>
                                        <span className="font-display font-bold text-sm">{bloc.blocLabel}</span>
                                      </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-left">
                                        <thead>
                                          <tr className="border-b border-background-200 bg-background-50">
                                            <th className="px-5 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider whitespace-nowrap">Upgrade</th>
                                            <th className="px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider text-center whitespace-nowrap w-28">Impact</th>
                                            <th className="px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider text-center whitespace-nowrap w-28">Effort</th>
                                            <th className="px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider text-center whitespace-nowrap w-28">Risque</th>
                                            <th className="px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider text-center whitespace-nowrap w-28">Timeline</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {bloc.items.map((item, j) => (
                                            <tr key={j} className="border-b border-background-100 last:border-b-0 hover:bg-rose-50/30 transition-colors">
                                              <td className="px-5 py-3">
                                                <span className="text-xs text-foreground-700 font-medium leading-relaxed">{item.name}</span>
                                              </td>
                                              <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                  <div className="flex-1 h-1.5 rounded-full bg-background-200 overflow-hidden">
                                                    <div className="h-full rounded-full bg-emerald-500 transition-all duration-700" style={{ width: `${item.impact * 20}%` }} />
                                                  </div>
                                                  <span className="text-xs font-bold text-emerald-700 w-4 text-right">{item.impact}</span>
                                                </div>
                                              </td>
                                              <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                  <div className="flex-1 h-1.5 rounded-full bg-background-200 overflow-hidden">
                                                    <div className="h-full rounded-full bg-amber-500 transition-all duration-700" style={{ width: `${item.effort * 20}%` }} />
                                                  </div>
                                                  <span className="text-xs font-bold text-amber-700 w-4 text-right">{item.effort}</span>
                                                </div>
                                              </td>
                                              <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                  <div className="flex-1 h-1.5 rounded-full bg-background-200 overflow-hidden">
                                                    <div className={`h-full rounded-full transition-all duration-700 ${item.risk <= 2 ? 'bg-emerald-500' : item.risk <= 3 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${item.risk * 20}%` }} />
                                                  </div>
                                                  <span className={`text-xs font-bold w-4 text-right ${item.risk <= 2 ? 'text-emerald-700' : item.risk <= 3 ? 'text-amber-700' : 'text-rose-700'}`}>{item.risk}</span>
                                                </div>
                                              </td>
                                              <td className="px-4 py-3 text-center">
                                                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-700 whitespace-nowrap">{item.timeline}</span>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                    {/* Bloc summary */}
                                    <div className="px-5 py-3 bg-background-50 border-t border-background-200 flex flex-wrap gap-3 items-center">
                                      <span className="text-xs text-foreground-500">Moyennes :</span>
                                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        Impact {(bloc.items.reduce((a, i) => a + i.impact, 0) / bloc.items.length).toFixed(1)}
                                      </span>
                                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                                        Effort {(bloc.items.reduce((a, i) => a + i.effort, 0) / bloc.items.length).toFixed(1)}
                                      </span>
                                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                                        Risque {(bloc.items.reduce((a, i) => a + i.risk, 0) / bloc.items.length).toFixed(1)}
                                      </span>
                                      <span className="ml-auto text-xs text-foreground-400">
                                        Total : {bloc.items.reduce((a, i) => { const t = i.timeline; const n = parseInt(t); return a + (isNaN(n) ? 0 : n); }, 0)} semaines estimées
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Priority score summary */}
                              <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-rose-50/80 to-white border border-rose-200">
                                <div className="flex items-center gap-2 mb-3">
                                  <i className="ri-bar-chart-grouped-line text-rose-600 text-sm" />
                                  <h6 className="font-display text-sm font-bold text-foreground-950">Score de Priorité Global</h6>
                                </div>
                                <p className="text-xs text-foreground-600 mb-4 leading-relaxed">Le score de priorité est calculé comme : <code className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-mono">Impact × 2 − Effort − Risque</code>. Plus le score est élevé, plus l&apos;upgrade doit être priorisé.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                  {phase.upgradeMatrix.map((bloc) => {
                                    const priorityScore = bloc.items.reduce((a, item) => a + (item.impact * 2 - item.effort - item.risk), 0);
                                    return (
                                      <div key={bloc.bloc} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                                        <div className={`w-9 h-9 mx-auto mb-2 rounded-lg bg-gradient-to-br ${bloc.color} flex items-center justify-center`}>
                                          <span className="text-white font-display font-bold text-xs">B{bloc.bloc}</span>
                                        </div>
                                        <span className="block text-sm font-bold text-foreground-950">{bloc.blocLabel}</span>
                                        <span className="block font-display text-2xl font-bold text-rose-600 mt-1">{priorityScore}</span>
                                        <span className="text-xs text-foreground-400">Score de priorité</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Principes Fondamentaux */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-100 border border-rose-200">
                  <i className="ri-shield-star-line text-rose-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">5 Principes Fondamentaux du Master Prompt</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {masterPromptPrinciples.map((principle, i) => (
                  <div key={principle.num} className="rounded-2xl border border-background-200 bg-background-50 p-5 text-center group hover:border-rose-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                      <i className={`${principle.icon} text-rose-600 text-lg`} />
                    </div>
                    <h4 className="font-display text-sm font-bold text-foreground-950 mb-1.5">{principle.title}</h4>
                    <p className="text-xs text-foreground-500 leading-relaxed">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Flow d'Exécution */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-100 border border-rose-200">
                  <i className="ri-flow-chart text-rose-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Flow d&apos;Exécution du Master Prompt</h3>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center gap-0">
                  {masterPromptExecutionFlow.map((item, i) => (
                    <div key={item.step} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
                      <div className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl border border-background-200 bg-white group hover:border-rose-300 hover:shadow-md transition-all duration-300 ${item.step === '01' ? 'border-rose-300 ring-1 ring-rose-200' : ''} ${item.step === '07' ? 'border-rose-400 ring-1 ring-rose-300 bg-gradient-to-r from-rose-50 to-white' : ''}`} style={{ width: `${Math.max(280, 560 - (parseInt(item.step) - 1) * 15)}px` }}>
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-rose-100 border border-rose-200 flex-shrink-0 group-hover:bg-rose-200 transition-colors">
                          <span className="font-display font-bold text-rose-600 text-xs">{item.step}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1 justify-center min-w-0">
                          <i className={`${item.icon} text-foreground-400 text-sm flex-shrink-0`} />
                          <span className="text-sm font-semibold text-foreground-800 whitespace-nowrap">{item.label}</span>
                        </div>
                      </div>
                      {i < masterPromptExecutionFlow.length - 1 && (
                        <div className="flex flex-col items-center py-0.5">
                          <i className="ri-arrow-down-s-line text-rose-300 text-lg" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* KPI Métriques */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-100 border border-rose-200">
                  <i className="ri-bar-chart-2-line text-rose-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">KPI du Master Prompt</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {masterPromptKPIs.map((kpi, i) => (
                  <div key={kpi.label} className="rounded-2xl border border-background-200 bg-background-50 p-5 text-center group hover:border-rose-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                      <i className={`${kpi.icon} text-white text-lg`} />
                    </div>
                    <span className="block font-display text-2xl font-bold text-foreground-950 mb-1">{kpi.value}</span>
                    <span className="text-xs text-foreground-500 font-medium">{kpi.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                  <i className="ri-loop-left-line text-rose-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">{masterPromptConclusion.title}</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto mb-6">{masterPromptConclusion.body}</p>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-100 border border-rose-200">
                  <i className="ri-refresh-line text-rose-600" />
                  <p className="text-sm font-semibold text-rose-700">{masterPromptConclusion.finalStatement}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS SEO AUTOPILOT ENGINE ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-50 border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200 mb-6">
                <i className="ri-search-eye-line text-sky-600 text-sm" />
                <span className="text-sm font-semibold text-sky-700 uppercase tracking-wider">{seoAutopilotIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{seoAutopilotIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{seoAutopilotIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{seoAutopilotIntro.role}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-100 border border-sky-300">
                <i className="ri-bar-chart-grouped-line text-sky-600" />
                <span className="text-sm font-bold text-sky-700">{seoAutopilotIntro.tagline}</span>
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-3xl border-2 border-sky-300 bg-gradient-to-br from-sky-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center">
                  <i className="ri-flag-line text-sky-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{seoAutopilotIntro.objective}</p>
              </div>
            </div>

            {/* Mode d'Opération */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200">
                  <i className="ri-flow-chart text-sky-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Mode de Fonctionnement — 6 Phases Automatiques</h3>
              </div>
              <p className="text-base text-foreground-600 max-w-4xl mb-8 leading-relaxed">{seoAutopilotIntro.modeOfOperation}</p>

              <div className="space-y-8">
                {seoAutopilotPhases.map((phase, i) => (
                  <div key={phase.num} className="rounded-2xl border border-background-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${phase.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${phase.color} text-white flex-shrink-0`}>
                          <i className={`${phase.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${phase.color}`}>PHASE {phase.num}</span>
                            <h4 className="font-display text-xl font-bold text-foreground-950">{phase.title}</h4>
                          </div>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-5">{phase.description}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                            {phase.details.map((detail, j) => (
                              <div key={j} className="flex items-start gap-2.5 text-sm text-foreground-700">
                                <i className="ri-checkbox-circle-fill text-sky-500 text-sm mt-0.5 flex-shrink-0" />
                                <span className="leading-relaxed">{detail}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mb-5">
                            <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Livrables</p>
                            <div className="flex flex-wrap gap-1.5">
                              {phase.deliverables.map((d, j) => (
                                <span key={j} className="px-3 py-1.5 rounded-full text-xs font-medium bg-sky-50 border border-sky-200 text-sky-700 whitespace-nowrap">{d}</span>
                              ))}
                            </div>
                          </div>

                          {phase.subSections && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {phase.subSections.map((sub) => (
                                <div key={sub.title} className="rounded-xl bg-background-50 border border-background-200 p-5 group hover:border-sky-300 hover:shadow-sm transition-all duration-300">
                                  <div className="flex items-center gap-2 mb-3">
                                    <i className={`${sub.icon} text-foreground-400 text-sm`} />
                                    <h5 className="font-display text-sm font-bold text-foreground-950">{sub.title}</h5>
                                  </div>
                                  <ul className="space-y-1.5">
                                    {sub.items.map((item, j) => (
                                      <li key={j} className="flex items-start gap-2 text-xs text-foreground-600 leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Règles Intelligentes */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200">
                  <i className="ri-brain-line text-sky-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">5 Règles Intelligentes du Système</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {seoIntelligentRules.map((rule, i) => (
                  <div key={rule.num} className="rounded-2xl border border-background-200 bg-white p-5 text-center group hover:border-sky-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className={`w-11 h-11 mx-auto mb-3 rounded-xl bg-gradient-to-br ${rule.color} flex items-center justify-center`}>
                      <i className={`${rule.icon} text-white text-lg`} />
                    </div>
                    <h4 className="font-display text-sm font-bold text-foreground-950 mb-1.5">RÈGLE {rule.num} — {rule.title}</h4>
                    <p className="text-xs text-foreground-500 leading-relaxed">{rule.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs + Output Format */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* KPIs */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200">
                    <i className="ri-bar-chart-2-line text-sky-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">KPI du Système SEO</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {seoKPIs.map((kpi, i) => (
                    <div key={kpi.label} className="rounded-2xl border border-background-200 bg-white p-5 text-center group hover:border-sky-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                      <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                        <i className={`${kpi.icon} text-white text-lg`} />
                      </div>
                      <span className="block font-display text-2xl font-bold text-foreground-950 mb-1">{kpi.value}</span>
                      <span className="text-xs text-foreground-500 font-medium">{kpi.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Format */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200">
                    <i className="ri-file-list-3-line text-sky-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">Output Format Obligatoire</h3>
                </div>
                <div className="rounded-2xl border border-background-200 bg-white p-6">
                  <div className="space-y-3">
                    {seoOutputFormat.map((item, i) => (
                      <div key={item.step} className="flex items-center gap-4 p-3 rounded-xl bg-background-50 border border-background-200 group hover:border-sky-300 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-sky-100 border border-sky-200 flex-shrink-0">
                          <span className="font-display font-bold text-sky-600 text-xs">{item.step}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <i className={`${item.icon} text-foreground-400 text-xs`} />
                            <h5 className="font-display text-sm font-bold text-foreground-950">{item.label}</h5>
                          </div>
                          <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Level Extensions */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
                  <i className="ri-rocket-2-line text-amber-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Extensions Possibles — Next Level</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {seoNextLevelExtensions.map((ext, i) => (
                  <div key={ext.name} className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/80 to-white p-5 text-center group hover:border-amber-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                      <i className={`${ext.icon} text-amber-600 text-lg`} />
                    </div>
                    <h4 className="font-display text-sm font-bold text-foreground-950 mb-2">{ext.name}</h4>
                    <p className="text-xs text-foreground-500 leading-relaxed">{ext.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-sky-300 bg-gradient-to-br from-sky-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center">
                  <i className="ri-global-line text-sky-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">{seoAutopilotConclusion.title}</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto mb-6">{seoAutopilotConclusion.body}</p>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-100 border border-sky-200">
                  <i className="ri-search-eye-line text-sky-600" />
                  <p className="text-sm font-semibold text-sky-700">{seoAutopilotConclusion.finalStatement}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS SEO AUTOPILOT v2 ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 mb-6">
                <i className="ri-rocket-2-line text-indigo-600 text-sm" />
                <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wider">{seoV2Intro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{seoV2Intro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{seoV2Intro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{seoV2Intro.concept}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-100 border border-indigo-300">
                <i className="ri-flashlight-line text-indigo-600" />
                <span className="text-sm font-bold text-indigo-700">{seoV2Intro.tagline}</span>
              </div>
            </div>

            {/* Core Engine — 3 Layers */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 border border-indigo-200">
                  <i className="ri-cpu-line text-indigo-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Architecture du Système — Core Engine</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {seoV2CoreEngine.map((layer, i) => (
                  <div key={layer.title} className="rounded-2xl border border-background-200 bg-background-50 overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${layer.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${layer.color} text-white flex-shrink-0`}>
                          <i className={`${layer.icon} text-lg`} />
                        </div>
                        <h4 className="font-display text-base font-bold text-foreground-950">{layer.title}</h4>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-5">{layer.description}</p>
                      <div className="space-y-3">
                        {layer.items.map((item) => (
                          <div key={item.name} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-background-200 group/item hover:border-indigo-200 hover:shadow-sm transition-all duration-300">
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 border border-indigo-200 flex-shrink-0">
                              <i className={`${item.icon} text-indigo-500 text-sm`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-foreground-800 mb-0.5">{item.name}</p>
                              <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Output visualization */}
              <div className="mt-8 max-w-2xl mx-auto p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <i className="ri-arrow-down-line text-indigo-500" />
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Sortie du Core Engine</span>
                  <i className="ri-arrow-down-line text-indigo-500" />
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-indigo-300">
                  <i className="ri-treasure-map-line text-indigo-600 text-lg" />
                  <span className="text-sm font-bold text-indigo-700">Opportunity Graph</span>
                  <span className="text-xs text-indigo-400">keywords + intent + revenue score</span>
                </div>
              </div>
            </div>

            {/* Backlink Autopilot Engine */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <i className="ri-links-line text-amber-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-3">{seoV2BacklinkEngine.title}</h3>
                <p className="text-base text-foreground-500 font-medium mb-4">{seoV2BacklinkEngine.subtitle}</p>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">{seoV2BacklinkEngine.description}</p>
              </div>

              <div className="space-y-8">
                {seoV2BacklinkEngine.subsystems.map((sub, i) => (
                  <div key={sub.title} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${sub.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${sub.color} text-white flex-shrink-0`}>
                          <i className={`${sub.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-xl font-bold text-foreground-950 mb-2">{sub.title}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-5">{sub.description}</p>

                          {sub.details && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                              {sub.details.map((d, j) => (
                                <div key={j} className="flex items-start gap-2.5 text-sm text-foreground-700">
                                  <i className="ri-checkbox-circle-fill text-amber-500 text-sm mt-0.5 flex-shrink-0" />
                                  <span className="leading-relaxed">{d}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {sub.channels && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {sub.channels.map((ch, j) => (
                                <div key={ch.name} className="rounded-xl bg-background-50 border border-background-200 p-5 group/card hover:border-amber-300 hover:shadow-sm transition-all duration-300">
                                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200 mb-3 group-hover/card:bg-amber-200 transition-colors">
                                    <i className={`${ch.icon} text-amber-600 text-lg`} />
                                  </div>
                                  <h5 className="font-display text-sm font-bold text-foreground-950 mb-2">{ch.name}</h5>
                                  <p className="text-xs text-foreground-500 leading-relaxed">{ch.desc}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {sub.filters && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {sub.filters.map((f, j) => (
                                <div key={j} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                                  <i className="ri-shield-check-line text-emerald-500 text-sm mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-emerald-800 leading-relaxed font-medium">{f}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Result */}
              <div className="mt-8 max-w-2xl mx-auto p-5 rounded-2xl bg-amber-50/60 border border-amber-200 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <i className="ri-arrow-down-line text-amber-500" />
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Résultat</span>
                  <i className="ri-arrow-down-line text-amber-500" />
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-amber-300">
                  <i className="ri-link-m text-amber-600 text-lg" />
                  <span className="text-sm font-bold text-amber-700">Backlinks « propres » + scalables + automatisés</span>
                </div>
              </div>
            </div>

            {/* SERP Domination + AI Search Optimization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* SERP Domination */}
              <div>
                <div className="rounded-2xl border-2 border-violet-300 bg-gradient-to-br from-violet-50/80 to-white p-7 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 border border-violet-200">
                      <i className="ri-trophy-line text-violet-600 text-lg" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground-950">{seoV2SERPDomination.title}</h3>
                  </div>
                  <p className="text-sm text-foreground-600 leading-relaxed mb-6">{seoV2SERPDomination.description}</p>
                  <div className="space-y-3">
                    {seoV2SERPDomination.techniques.map((tech, i) => (
                      <div key={tech.name} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-background-200 group hover:border-violet-200 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-violet-100 border border-violet-200 flex-shrink-0 group-hover:bg-violet-200 transition-colors">
                          <i className={`${tech.icon} text-violet-600 text-sm`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-bold text-foreground-950 mb-0.5">{tech.name}</h5>
                          <p className="text-xs text-foreground-500 leading-relaxed">{tech.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 p-4 rounded-xl bg-violet-50 border border-violet-200 text-center">
                    <p className="text-sm font-bold text-violet-700">1 mot-clé = plusieurs positions possibles — Domination des pages 1–2 Google</p>
                  </div>
                </div>
              </div>

              {/* AI Search Optimization */}
              <div>
                <div className="rounded-2xl border-2 border-sky-300 bg-gradient-to-br from-sky-50/80 to-white p-7 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200">
                      <i className="ri-sparkling-line text-sky-600 text-lg" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground-950">{seoV2AISearchOptimization.title}</h3>
                  </div>
                  <p className="text-sm text-foreground-600 leading-relaxed mb-6">{seoV2AISearchOptimization.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {seoV2AISearchOptimization.targets.map((target, i) => (
                      <div key={target.platform} className="rounded-xl bg-white border border-background-200 p-4 group hover:border-sky-200 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <i className={`${target.icon} text-sky-500 text-lg`} />
                          <h5 className="text-sm font-bold text-foreground-950">{target.platform}</h5>
                        </div>
                        <p className="text-xs text-foreground-500 leading-relaxed">{target.method}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Méthodes</p>
                    {seoV2AISearchOptimization.methods.map((m, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-foreground-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Loop */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                    <i className="ri-loop-left-line text-emerald-600 text-2xl" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground-950 mb-3">{seoV2FeedbackLoop.title}</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{seoV2FeedbackLoop.description}</p>
                </div>
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {seoV2FeedbackLoop.dailyCycle.map((step, i) => (
                      <div key={step.step} className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200 mb-3">
                          <span className="font-display font-bold text-emerald-600 text-xs">{step.step}</span>
                        </div>
                        <i className={`${step.icon} text-emerald-500 text-lg mb-2`} />
                        <p className="text-xs font-bold text-foreground-800 mb-1">{step.label}</p>
                        <p className="text-xs text-foreground-500 leading-tight">{step.desc}</p>
                        {i < seoV2FeedbackLoop.dailyCycle.length - 1 && (
                          <div className="hidden lg:block absolute -right-3 top-10">
                            <i className="ri-arrow-right-s-line text-emerald-300 text-lg" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-code-s-slash-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Stack Technique Recommandée</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                {seoV2TechStack.map((stack, i) => (
                  <div key={stack.category} className="rounded-xl border border-background-200 bg-white p-4 group hover:border-indigo-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`${stack.icon} text-foreground-400 text-sm`} />
                      <h4 className="font-display text-xs font-bold text-foreground-700 uppercase tracking-wider">{stack.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {stack.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 border border-indigo-200 text-indigo-700 whitespace-nowrap">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Results */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-bar-chart-grouped-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-8">{seoV2BusinessResults.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {seoV2BusinessResults.metrics.map((metric, i) => (
                    <div key={metric.label} className="rounded-2xl border border-background-200 bg-white p-5 text-center group hover:border-emerald-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                      <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                        <i className={`${metric.icon} text-emerald-600 text-lg`} />
                      </div>
                      <span className="block font-display text-2xl font-bold text-foreground-950 mb-1">{metric.value}</span>
                      <span className="text-xs text-foreground-500 font-medium">{metric.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-foreground-500 italic mt-6 max-w-2xl mx-auto leading-relaxed">{seoV2BusinessResults.note}</p>
              </div>
            </div>

            {/* Big Four SEO Autopilot — 4 Modules */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-building-2-line text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-3">Version « Big Four SEO Autopilot »</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">Si on pousse le concept au niveau cabinet conseil, on obtient un système avec 4 modules intégrés couvrant l&apos;intégralité de la chaîne de valeur SEO — de la stratégie au reporting exécutif.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {seoV2BigFourModules.map((mod, i) => (
                  <div key={mod.name} className="rounded-2xl border border-background-200 bg-background-50 overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${mod.color}`} />
                    <div className="p-6">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${mod.color} text-white mb-4 mx-auto`}>
                        <i className={`${mod.icon} text-xl`} />
                      </div>
                      <h4 className="font-display text-base font-bold text-foreground-950 mb-2 text-center">{mod.name}</h4>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-4 text-center">{mod.description}</p>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {mod.components.map((comp) => (
                          <span key={comp} className="px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-background-200 text-foreground-600 whitespace-nowrap">{comp}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-rocket-2-line text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">{seoV2Conclusion.title}</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto mb-6">{seoV2Conclusion.body}</p>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-100 border border-indigo-200">
                  <i className="ri-flashlight-line text-indigo-600" />
                  <p className="text-sm font-semibold text-indigo-700">{seoV2Conclusion.finalStatement}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS BACKLINK AUTOMATION SYSTEM ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-50 border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
                <i className="ri-links-line text-emerald-600 text-sm" />
                <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">{backlinkIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{backlinkIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{backlinkIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{backlinkIntro.concept}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-100 border border-emerald-300">
                <i className="ri-shield-check-line text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">{backlinkIntro.tagline}</span>
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-flag-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{backlinkIntro.objective}</p>
              </div>
            </div>

            {/* Rule Zero */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <i className="ri-scales-3-line text-amber-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-4">{backlinkRuleZero.principle}</h3>
                <p className="text-base text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{backlinkRuleZero.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {backlinkRuleZero.actions.map((action, i) => (
                    <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center group hover:border-amber-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center">
                        <span className="font-display font-bold text-amber-600 text-xs">{i + 1}</span>
                      </div>
                      <p className="text-xs font-semibold text-foreground-700 leading-snug">{action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* A. Link Intelligence Layer */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200">
                  <i className="ri-radar-line text-sky-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">A. Link Intelligence Layer — Discovery</h3>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">
                Trouver uniquement des backlinks réels, pertinents et indexés. Le système scanne en continu les sources qualifiées, filtre automatiquement par DR/DA estimé, trafic organique réel, indexation Google confirmée, topical relevance (NLP embedding) et spam footprint. Sortie : une whitelist dynamique de domaines exploitables.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {linkIntelligenceSources.map((source, i) => (
                  <div key={source.name} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200 flex-shrink-0 group-hover:bg-sky-200 transition-colors">
                          <i className={`${source.icon} text-sky-600 text-lg`} />
                        </div>
                        <h4 className="font-display text-sm font-bold text-foreground-950 leading-snug">{source.name}</h4>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-4">{source.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {source.filters.map((f) => (
                          <span key={f} className="px-2 py-0.5 rounded-full text-xs font-medium bg-sky-50 border border-sky-200 text-sky-700 whitespace-nowrap">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* B. Risk Scoring Engine */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                    <i className="ri-shield-flash-line text-rose-600 text-2xl" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground-950 mb-3">{riskScoringEngine.title}</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{riskScoringEngine.description}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <h4 className="font-display text-sm font-bold text-foreground-950 uppercase tracking-wider">🔴 Spam Risk Score (0–100)</h4>
                    </div>
                    <div className="space-y-3">
                      {riskScoringEngine.spamRiskFactors.map((f, j) => (
                        <div key={f.factor} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-background-200 group hover:border-rose-200 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${j * 60}ms` }}>
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 border border-rose-200 flex-shrink-0">
                            <i className={`${f.icon} text-rose-500 text-sm`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-foreground-800 mb-0.5">{f.factor}</p>
                            <p className="text-xs text-foreground-500 leading-relaxed">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <h4 className="font-display text-sm font-bold text-foreground-950 uppercase tracking-wider">🟢 Trust Score (0–100)</h4>
                    </div>
                    <div className="space-y-3">
                      {riskScoringEngine.trustFactors.map((f, j) => (
                        <div key={f.factor} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-background-200 group hover:border-emerald-200 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${j * 60}ms` }}>
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 border border-emerald-200 flex-shrink-0">
                            <i className={`${f.icon} text-emerald-500 text-sm`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-foreground-800 mb-0.5">{f.factor}</p>
                            <p className="text-xs text-foreground-500 leading-relaxed">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 max-w-3xl mx-auto p-5 rounded-xl bg-amber-50 border border-amber-200 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <i className="ri-scales-3-line text-amber-600" />
                    <span className="text-sm font-bold text-amber-700">{riskScoringEngine.rule}</span>
                  </div>
                  <p className="text-xs text-amber-600">{riskScoringEngine.scoringVisual}</p>
                </div>
              </div>
            </div>

            {/* C. Opportunity Engine */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 border border-violet-200">
                  <i className="ri-git-branch-line text-violet-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">C. Opportunity Engine — Link Matching AI</h3>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">{opportunityEngine.description}</p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                {opportunityEngine.examples.map((ex, i) => (
                  <div key={i} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="h-1.5 bg-gradient-to-r from-violet-400 to-violet-500" />
                    <div className="p-6">
                      <div className="mb-4">
                        <p className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-1">Contenu</p>
                        <p className="text-sm font-semibold text-foreground-800">{ex.content}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-1">Opportunité</p>
                        <p className="text-sm text-foreground-600">{ex.opportunity}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-1">Match</p>
                        <p className="text-sm text-violet-700 font-medium">{ex.match}</p>
                      </div>
                      <div className="pt-3 border-t border-background-200">
                        <p className="text-xs text-foreground-500 italic">{ex.result}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="max-w-3xl mx-auto">
                <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Critères de Matching</p>
                <div className="flex flex-wrap gap-2">
                  {opportunityEngine.matchingCriteria.map((c, j) => (
                    <span key={j} className="px-3 py-1.5 rounded-full text-xs font-medium bg-violet-50 border border-violet-200 text-violet-700 whitespace-nowrap">
                      <i className="ri-check-line mr-1" />{c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* D. Backlink Acquisition Modes */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-stack-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">D. Backlink Acquisition Modes — 3 Niveaux</h3>
              </div>
              <div className="space-y-8">
                {acquisitionModes.map((mode, i) => (
                  <div key={mode.title} className={`rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${i * 150}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${mode.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${mode.color} text-white flex-shrink-0`}>
                          <i className={`${mode.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="px-3 py-1 rounded-full text-xs font-bold text-foreground-700 bg-background-100 border border-background-200">{mode.level}</span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-slate-600 to-slate-700">{mode.automationRate}</span>
                          </div>
                          <h4 className="font-display text-xl font-bold text-foreground-950 mb-2">{mode.title}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-5">{mode.description}</p>
                          <div className="mb-4">
                            <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Canaux</p>
                            <ul className="space-y-1.5">
                              {mode.channels.map((ch, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-foreground-700">
                                  <i className="ri-checkbox-circle-fill text-emerald-500 text-sm mt-0.5 flex-shrink-0" />
                                  <span className="leading-relaxed">{ch}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {mode.workflow && (
                            <div className="mb-4">
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Workflow</p>
                              <div className="flex flex-wrap items-center gap-1.5">
                                {mode.workflow.map((step, j) => (
                                  <span key={j}>
                                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 border border-amber-200 text-amber-700 whitespace-nowrap">
                                      <span className="w-4 h-4 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 font-bold text-xs">{j + 1}</span>
                                      {step}
                                    </span>
                                    {j < mode.workflow!.length - 1 && <span className="text-amber-400 font-bold mx-0.5 text-xs">→</span>}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {mode.note && (
                            <div className="pt-3 border-t border-background-200">
                              <p className="text-xs text-foreground-500 italic flex items-start gap-1.5">
                                <i className="ri-information-line text-rose-400 text-xs mt-0.5 flex-shrink-0" />
                                {mode.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Anchor Text Safety + Link Velocity side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Anchor Text Safety */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
                    <i className="ri-font-size text-amber-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground-950">{anchorTextSafety.title}</h3>
                    <p className="text-xs text-foreground-500">{anchorTextSafety.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground-600 leading-relaxed mb-6">{anchorTextSafety.description}</p>
                <div className="space-y-3 mb-5">
                  {anchorTextSafety.distribution.map((dist, i) => (
                    <div key={dist.type} className={`rounded-xl bg-gradient-to-r ${dist.color.replace('from-', 'from-').replace('to-', 'to-')}/10 border border-background-200 p-4 group hover:shadow-md transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-3 mb-2">
                        <i className={`${dist.icon} text-foreground-500 text-sm`} />
                        <span className="text-sm font-bold text-foreground-950">{dist.type}</span>
                        <span className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${dist.color} text-white`}>{dist.percentage}</span>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed">{dist.examples}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                  <p className="text-xs text-rose-700 font-semibold flex items-start gap-1.5">
                    <i className="ri-alert-line text-rose-500 text-sm mt-0.5 flex-shrink-0" />
                    {anchorTextSafety.blockingRule}
                  </p>
                </div>
              </div>

              {/* Link Velocity Controller */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200">
                    <i className="ri-speed-line text-sky-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground-950">{linkVelocityController.title}</h3>
                    <p className="text-xs text-foreground-500">{linkVelocityController.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground-600 leading-relaxed mb-6">{linkVelocityController.description}</p>
                <div className="space-y-3 mb-5">
                  {linkVelocityController.velocityCurve.map((v, i) => (
                    <div key={v.month} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-background-200 group hover:border-sky-300 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200 flex-shrink-0 group-hover:bg-sky-200 transition-colors">
                        <i className={`${v.icon} text-sky-600 text-sm`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-bold text-foreground-950">{v.month}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-sky-100 border border-sky-200 text-sky-700 whitespace-nowrap">{v.range} backlinks</span>
                        </div>
                        <p className="text-xs text-foreground-500">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Mécanismes de Contrôle</p>
                  <div className="space-y-1.5">
                    {linkVelocityController.controlMechanisms.map((m, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                        <i className="ri-checkbox-circle-fill text-sky-500 text-sm mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Natural Footprint Generator */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-fingerprint-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{naturalFootprint.title}</h3>
                <p className="text-sm text-foreground-500 font-medium mb-4">{naturalFootprint.subtitle}</p>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{naturalFootprint.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
                  {naturalFootprint.footprintDimensions.map((dim, i) => (
                    <div key={dim.dimension} className="rounded-xl bg-white border border-background-200 p-5 group hover:border-emerald-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-9 h-9 mx-auto mb-3 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                        <i className={`${dim.icon} text-emerald-600 text-sm`} />
                      </div>
                      <h5 className="font-display text-sm font-bold text-foreground-950 mb-1.5">{dim.dimension}</h5>
                      <p className="text-xs text-foreground-500 leading-relaxed">{dim.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-emerald-700 font-semibold italic max-w-2xl mx-auto">{naturalFootprint.philosophy}</p>
              </div>
            </div>

            {/* Content-Based Link Injection */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-violet-300 bg-gradient-to-br from-violet-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-violet-500 to-violet-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center">
                  <i className="ri-lightbulb-flash-line text-violet-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{contentBasedInjection.title}</h3>
                <p className="text-sm text-foreground-500 font-medium mb-4">{contentBasedInjection.subtitle}</p>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{contentBasedInjection.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
                  {contentBasedInjection.contentTypes.map((ct, i) => (
                    <div key={ct.type} className="rounded-xl bg-white border border-background-200 p-5 text-left group hover:border-violet-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-100 border border-violet-200 flex-shrink-0">
                          <i className={`${ct.icon} text-violet-600 text-sm`} />
                        </div>
                        <h5 className="font-display text-sm font-bold text-foreground-950">{ct.type}</h5>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-2">{ct.desc}</p>
                      <p className="text-xs text-violet-600 font-medium italic">Exemple : {ct.example}</p>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-100 border border-emerald-200">
                  <i className="ri-award-line text-emerald-600" />
                  <p className="text-sm font-bold text-emerald-700">{contentBasedInjection.advantage}</p>
                </div>
              </div>
            </div>

            {/* Monitoring & Protection */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200">
                  <i className="ri-pulse-line text-sky-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">{monitoringProtection.title}</h3>
                  <p className="text-xs text-foreground-500">{monitoringProtection.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">{monitoringProtection.description}</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Points de Surveillance</p>
                  <div className="space-y-3">
                    {monitoringProtection.monitoringPoints.map((mp, i) => (
                      <div key={mp.action} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-background-200 group hover:border-sky-300 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-sky-100 border border-sky-200 flex-shrink-0">
                          <i className={`${mp.icon} text-sky-600 text-sm`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground-950 mb-0.5">{mp.action}</p>
                          <p className="text-xs text-foreground-500">{mp.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Actions Automatiques</p>
                  <div className="space-y-3">
                    {monitoringProtection.automaticActions.map((action, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-background-200 group hover:border-emerald-300 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${(i + 4) * 80}ms` }}>
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-100 border border-emerald-200 flex-shrink-0">
                          <i className="ri-play-circle-line text-emerald-600 text-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground-700 leading-relaxed font-medium">{action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Anti-Spam Guardrails */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="text-center mb-8">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                    <i className="ri-forbid-line text-rose-600 text-2xl" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{antiSpamGuardrails.title}</h3>
                  <p className="text-sm text-foreground-500 font-medium">{antiSpamGuardrails.subtitle}</p>
                  <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mt-4">{antiSpamGuardrails.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
                  {antiSpamGuardrails.blockedPatterns.map((bp, i) => (
                    <div key={bp.pattern} className="rounded-xl bg-white border-2 border-rose-200 p-5 text-center group hover:border-rose-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                      <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                        <i className={`${bp.icon} text-rose-600 text-lg`} />
                      </div>
                      <h5 className="font-display text-sm font-bold text-foreground-950 mb-1.5">{bp.pattern}</h5>
                      <p className="text-xs text-foreground-500 leading-relaxed">{bp.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="max-w-3xl mx-auto p-4 rounded-xl bg-rose-100 border border-rose-200 text-center">
                  <p className="text-sm text-rose-700 font-semibold flex items-center justify-center gap-1.5">
                    <i className="ri-shield-flash-line text-rose-500" />
                    {antiSpamGuardrails.enforcement}
                  </p>
                </div>
              </div>
            </div>

            {/* KPI Dashboard */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-dashboard-line text-slate-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">{kpiDashboard.title}</h3>
                  <p className="text-xs text-foreground-500">{kpiDashboard.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">{kpiDashboard.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {kpiDashboard.kpis.map((kpi, i) => (
                  <div key={kpi.label} className="rounded-2xl border border-background-200 bg-white p-6 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                      <i className={`${kpi.icon} text-white text-lg`} />
                    </div>
                    <div className="text-center">
                      <span className="block font-display text-3xl font-bold text-foreground-950 mb-1">{kpi.value}</span>
                      <span className="block text-sm font-bold text-foreground-700 mb-2">{kpi.label}</span>
                      <p className="text-xs text-foreground-500 leading-relaxed">{kpi.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Version SaaS */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-cloud-line text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{saasModules.title}</h3>
                <p className="text-sm text-foreground-500 font-medium mb-4">{saasModules.subtitle}</p>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{saasModules.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                  {saasModules.modules.map((mod, i) => (
                    <div key={mod.name} className="rounded-xl bg-white border border-background-200 p-5 text-center group hover:border-indigo-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                        <i className={`${mod.icon} text-indigo-600 text-lg`} />
                      </div>
                      <h5 className="font-display text-sm font-bold text-foreground-950 mb-2">{mod.name}</h5>
                      <p className="text-xs text-foreground-500 leading-relaxed">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-shield-check-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">{backlinkConclusion.title}</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto mb-8">{backlinkConclusion.body}</p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {backlinkConclusion.ratios.map((ratio, i) => (
                    <div key={ratio.label} className={`rounded-2xl bg-gradient-to-br ${ratio.color} text-white p-6 text-center min-w-[140px] animate-fade-in`} style={{ animationDelay: `${i * 120}ms` }}>
                      <span className="block font-display text-3xl font-bold mb-1">{ratio.percentage}</span>
                      <span className="text-sm font-medium opacity-90">{ratio.label}</span>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-100 border border-emerald-200">
                  <i className="ri-shield-star-line text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-700">{backlinkConclusion.finalStatement}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS WEB OPS AUTONOMOUS OPTIMIZATION ENGINE ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
                <i className="ri-cpu-line text-slate-600 text-sm" />
                <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{webOpsIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{webOpsIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{webOpsIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{webOpsIntro.role}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 border border-slate-300">
                <i className="ri-flashlight-line text-slate-600" />
                <span className="text-sm font-bold text-slate-700">{webOpsIntro.tagline}</span>
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-3xl border-2 border-slate-300 bg-gradient-to-br from-slate-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <i className="ri-flag-line text-slate-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{webOpsIntro.objective}</p>
              </div>
            </div>

            {/* 5 Objectifs Principaux */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-crosshair-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">1. Objectifs Principaux — Gestion Automatique</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {webOpsObjectives.objectives.map((obj, i) => (
                  <div key={obj.id} className="rounded-2xl border border-background-200 bg-background-50 overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${obj.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${obj.color} text-white flex-shrink-0`}>
                          <i className={`${obj.icon} text-lg`} />
                        </div>
                        <h4 className="font-display text-base font-bold text-foreground-950">{obj.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {obj.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-foreground-600 leading-relaxed">
                            <i className="ri-checkbox-circle-fill text-slate-500 text-sm mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Modules du Système */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-stack-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">2. Modules du Système KOS</h3>
              </div>
              <div className="space-y-8">
                {webOpsModules.map((mod, i) => (
                  <div key={mod.id} className="rounded-2xl border border-background-200 bg-background-50 overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${mod.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${mod.color} text-white flex-shrink-0`}>
                          <i className={`${mod.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${mod.color}`}>{mod.subtitle}</span>
                          </div>
                          <h4 className="font-display text-xl font-bold text-foreground-950 mb-2">{mod.title}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-6">{mod.description}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {mod.items.map((item, j) => (
                              <div key={item.name} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-background-200 group/item hover:border-slate-300 hover:shadow-sm transition-all duration-300">
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0">
                                  <i className={`${item.icon} text-slate-500 text-sm`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-foreground-800 mb-0.5">{item.name}</p>
                                  <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {mod.outputs && (
                            <div>
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Actions possibles</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {mod.outputs.map((out, j) => (
                                  <div key={out.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
                                    <i className={`${out.icon} text-slate-500 text-sm flex-shrink-0`} />
                                    <div>
                                      <span className="text-xs font-semibold text-foreground-700">{out.name}</span>
                                      <span className="text-xs text-foreground-400 ml-1">— {out.desc}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {mod.note && (
                            <div className="mt-5 pt-4 border-t border-background-200">
                              <p className="text-xs text-foreground-500 italic flex items-start gap-1.5">
                                <i className="ri-information-line text-slate-400 text-xs mt-0.5 flex-shrink-0" />
                                {mod.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Loop Autonome */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-loop-left-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-3">3. Loop Autonome — Cycle KOS</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{webOpsLoop.description}</p>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {webOpsLoop.steps.map((step, i) => (
                    <div key={step.step} className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200 mb-3">
                        <span className="font-display font-bold text-emerald-600 text-xs">{step.step}</span>
                      </div>
                      <i className={`${step.icon} text-emerald-500 text-lg mb-2`} />
                      <p className="text-xs font-bold text-foreground-800 mb-1">{step.label}</p>
                      <p className="text-xs text-foreground-500 leading-tight">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Priorisation + 5. Output Format side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Priorisation */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
                    <i className="ri-sort-desc text-amber-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">4. Priorisation Intelligente</h3>
                </div>
                <p className="text-sm text-foreground-600 leading-relaxed mb-6">{webOpsPriorities.description}</p>
                <div className="space-y-3">
                  {webOpsPriorities.levels.map((level, i) => (
                    <div key={level.label} className={`rounded-xl bg-gradient-to-r from-slate-50 to-white border border-background-200 p-4 flex items-center gap-4 group hover:shadow-md transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${i * 80}ms` }}>
                      <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${level.color} text-white flex-shrink-0`}>
                        <i className={`${level.icon} text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-bold text-foreground-950">{level.label}</span>
                          <span className="text-xs font-bold text-foreground-400">{level.priority}</span>
                        </div>
                        <p className="text-xs text-foreground-500 leading-relaxed">{level.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Format */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                    <i className="ri-file-list-3-line text-slate-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">5. Output Obligatoire</h3>
                </div>
                <p className="text-sm text-foreground-600 leading-relaxed mb-6">{webOpsOutputFormat.description}</p>
                <div className="space-y-3">
                  {webOpsOutputFormat.items.map((item, i) => (
                    <div key={item.step} className="flex items-center gap-4 p-4 rounded-xl bg-background-50 border border-background-200 group hover:border-slate-300 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0">
                        <span className="font-display font-bold text-slate-600 text-xs">{item.step}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <i className={`${item.icon} text-foreground-400 text-xs`} />
                          <h5 className="font-display text-sm font-bold text-foreground-950">{item.label}</h5>
                        </div>
                        <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Safe Mode */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 relative overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="text-center mb-8">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                    <i className="ri-shield-check-line text-rose-600 text-2xl" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">6. Safe Mode — Règles de Sécurité</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-6">{webOpsSafeMode.description}</p>
                </div>
                <div className="flex items-center justify-center gap-2 mb-8">
                  {webOpsSafeMode.protocol.split(' → ').map((step, i) => (
                    <span key={i}>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold bg-rose-100 border border-rose-200 text-rose-700 whitespace-nowrap">
                        <i className={`${i === 0 ? 'ri-save-line' : i === 1 ? 'ri-test-tube-line' : i === 2 ? 'ri-play-circle-line' : 'ri-pulse-line'}`} />
                        {step}
                      </span>
                      {i < 3 && <span className="text-rose-400 font-bold mx-1">→</span>}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {webOpsSafeMode.rules.map((rule, i) => (
                    <div key={rule.title} className="rounded-xl bg-white border border-background-200 p-5 group hover:border-rose-200 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 border border-rose-200 flex-shrink-0">
                          <i className={`${rule.icon} text-rose-500 text-sm`} />
                        </div>
                        <h5 className="font-display text-sm font-bold text-foreground-950">{rule.title}</h5>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed">{rule.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 7. Mode Big Four */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-building-2-line text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">7. Mode Big Four — Reporting Exécutif</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{webOpsBigFourMode.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {webOpsBigFourMode.kpis.map((kpi, i) => (
                  <div key={kpi.label} className="rounded-2xl border border-background-200 bg-white p-6 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                      <i className={`${kpi.icon} text-white text-lg`} />
                    </div>
                    <span className="block font-display text-3xl font-bold text-foreground-950 mb-1">{kpi.value}</span>
                    <span className="block text-sm font-bold text-foreground-700 mb-2">{kpi.label}</span>
                    <p className="text-xs text-foreground-500 leading-relaxed">{kpi.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-slate-300 bg-gradient-to-br from-slate-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <i className="ri-cpu-line text-slate-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">{webOpsConclusion.title}</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto mb-8">{webOpsConclusion.body}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                  {webOpsConclusion.pillars.map((pillar, i) => (
                    <div key={pillar.label} className="rounded-xl bg-white border border-background-200 p-4 text-center group hover:border-slate-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                        <i className={`${pillar.icon} text-slate-600 text-sm`} />
                      </div>
                      <p className="text-xs font-bold text-foreground-800 mb-1">{pillar.label}</p>
                      <p className="text-xs text-foreground-500 leading-tight">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-flashlight-line text-slate-600" />
                  <p className="text-sm font-semibold text-slate-700">{webOpsConclusion.finalStatement}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS AUTO-HEALING SYSTEM ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-50 border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
                <i className="ri-heart-pulse-line text-emerald-600 text-sm" />
                <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">{autoHealingIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{autoHealingIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{autoHealingIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{autoHealingIntro.concept}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-100 border border-emerald-300">
                <i className="ri-shield-check-line text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">{autoHealingIntro.tagline}</span>
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-flag-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{autoHealingIntro.objective}</p>
              </div>
            </div>

            {/* Architecture Globale — 4 Layers */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200">
                  <i className="ri-stack-line text-emerald-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Architecture Globale — 4 Couches</h3>
              </div>
              <div className="space-y-8">
                {autoHealingArchitectureLayers.map((layer, i) => (
                  <div key={layer.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${layer.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${layer.color} text-white flex-shrink-0`}>
                          <i className={`${layer.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${layer.color}`}>{layer.subtitle}</span>
                          </div>
                          <h4 className="font-display text-xl font-bold text-foreground-950 mb-2">{layer.label}. {layer.title}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-6">{layer.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {layer.items.map((item, j) => (
                              <div key={item.name} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-200 group/item hover:border-emerald-300 hover:shadow-sm transition-all duration-300">
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 border border-emerald-200 flex-shrink-0">
                                  <i className={`${item.icon} text-emerald-500 text-sm`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-foreground-800 mb-0.5">{item.name}</p>
                                  <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {layer.note && (
                            <div className="mt-5 pt-4 border-t border-background-200">
                              <p className="text-xs text-foreground-500 italic flex items-start gap-1.5">
                                <i className="ri-information-line text-emerald-400 text-xs mt-0.5 flex-shrink-0" />
                                {layer.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-Healing Use Cases */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200">
                  <i className="ri-tools-line text-emerald-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Auto-Healing Use Cases — 5 Scénarios</h3>
              </div>
              <div className="space-y-6">
                {autoHealingUseCases.map((useCase, i) => (
                  <div key={useCase.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${useCase.color}`} />
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start gap-5 mb-5">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${useCase.color} text-white flex-shrink-0`}>
                          <i className={`${useCase.icon} text-xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${useCase.color}`}>{useCase.subtitle}</span>
                          </div>
                          <h4 className="font-display text-lg font-bold text-foreground-950 mb-2">{useCase.title}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-5">{useCase.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {useCase.examples.map((ex, j) => (
                              <div key={ex.label} className="rounded-xl bg-background-50 border border-background-200 p-4 group/card hover:border-emerald-200 hover:shadow-sm transition-all duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-100 border border-emerald-200 flex-shrink-0">
                                    <i className={`${ex.icon} text-emerald-600 text-xs`} />
                                  </div>
                                  <h5 className="text-xs font-bold text-foreground-950">{ex.label}</h5>
                                </div>
                                <p className="text-xs text-foreground-500 leading-relaxed">{ex.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intelligence Decision Layer */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <i className="ri-brain-line text-amber-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">Intelligence Decision Layer</h3>
                <p className="text-sm text-foreground-500 font-medium mb-4">Severity Score + Priority Formula</p>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">Le système utilise un scoring de sévérité (0–100) pour classifier chaque anomalie et une formule de priorité qui combine l'impact business, le trafic affecté, le risque de revenu et la complexité de correction.</p>
              </div>

              {/* Severity Levels */}
              <div className="mb-10">
                <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-5 text-center">Severity Score (0–100)</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {severityLevels.map((level, i) => (
                    <div key={level.range} className={`rounded-2xl border-2 border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${i * 100}ms` }}>
                      <div className={`h-1.5 bg-gradient-to-r ${level.color}`} />
                      <div className="p-6 text-center">
                        <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center`}>
                          <i className={`${level.icon} text-white text-2xl`} />
                        </div>
                        <span className="block font-display text-3xl font-bold text-foreground-950 mb-1">{level.range}</span>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${level.color} mb-3`}>{level.label}</span>
                        <p className="text-sm font-bold text-foreground-950 mb-2">{level.action}</p>
                        <p className="text-xs text-foreground-500 leading-relaxed">{level.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Formula */}
              <div className="max-w-3xl mx-auto">
                <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/80 to-white p-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <i className="ri-function-line text-amber-600 text-xl" />
                    <h4 className="font-display text-lg font-bold text-foreground-950">{priorityFormula.title}</h4>
                  </div>
                  <div className="inline-block px-6 py-4 rounded-2xl bg-amber-100 border border-amber-300 mb-6">
                    <code className="text-sm font-bold text-amber-800 font-mono">{priorityFormula.formula}</code>
                  </div>
                  <p className="text-sm text-foreground-600 leading-relaxed max-w-2xl mx-auto mb-6">{priorityFormula.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {priorityFormula.dimensions.map((dim, j) => (
                      <div key={dim.label} className="rounded-xl bg-white border border-background-200 p-4 text-center animate-fade-in" style={{ animationDelay: `${j * 80}ms` }}>
                        <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center">
                          <i className={`${dim.icon} text-amber-600 text-sm`} />
                        </div>
                        <p className="text-xs font-bold text-foreground-950 mb-1">{dim.label}</p>
                        <p className="text-xs text-foreground-500 leading-tight">{dim.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Autonomous Loop */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-violet-300 bg-gradient-to-br from-violet-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-violet-500 to-violet-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center">
                  <i className="ri-loop-left-line text-violet-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-3">{autoHealingLoop.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{autoHealingLoop.description}</p>
              </div>
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {autoHealingLoop.steps.map((step, i) => (
                    <div key={step.step} className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white mb-3`}>
                        <span className="font-display font-bold text-xs">{step.step}</span>
                      </div>
                      <i className={`${step.icon} text-foreground-500 text-lg mb-2`} />
                      <p className="text-xs font-bold text-foreground-800 mb-1">{step.label}</p>
                      <p className="text-xs text-foreground-500 leading-tight">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-code-s-slash-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Stack Technique Recommandée</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {autoHealingTechStack.map((stack, i) => (
                  <div key={stack.category} className="rounded-2xl border border-background-200 bg-white p-5 group hover:border-emerald-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <i className={`${stack.icon} text-foreground-400 text-sm`} />
                      <h4 className="font-display text-xs font-bold text-foreground-700 uppercase tracking-wider">{stack.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {stack.items.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Layer */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 relative overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="text-center mb-8">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                    <i className="ri-shield-check-line text-rose-600 text-2xl" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{safetyLayer.title}</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-6">{safetyLayer.description}</p>
                </div>
                <div className="flex items-center justify-center gap-2 mb-8">
                  {safetyLayer.protocol.split(' → ').map((step, i) => (
                    <span key={i}>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold bg-rose-100 border border-rose-200 text-rose-700 whitespace-nowrap">
                        <i className={`${i === 0 ? 'ri-save-line' : i === 1 ? 'ri-test-tube-line' : i === 2 ? 'ri-play-circle-line' : 'ri-pulse-line'}`} />
                        {step}
                      </span>
                      {i < 3 && <span className="text-rose-400 font-bold mx-1">→</span>}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-3xl mx-auto">
                  {safetyLayer.rules.map((rule, i) => (
                    <div key={rule.title} className="rounded-xl bg-white border border-background-200 p-4 text-center group hover:border-rose-200 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center">
                        <i className={`${rule.icon} text-rose-500 text-sm`} />
                      </div>
                      <h5 className="font-display text-xs font-bold text-foreground-950 mb-1.5">{rule.title}</h5>
                      <p className="text-xs text-foreground-500 leading-relaxed">{rule.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dashboard */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-dashboard-line text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{autoHealingDashboard.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{autoHealingDashboard.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {autoHealingDashboard.kpis.map((kpi, i) => (
                  <div key={kpi.label} className="rounded-2xl border border-background-200 bg-white p-6 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                      <i className={`${kpi.icon} text-white text-lg`} />
                    </div>
                    <span className="block font-display text-3xl font-bold text-foreground-950 mb-1">{kpi.value}</span>
                    <span className="block text-sm font-bold text-foreground-700 mb-2">{kpi.label}</span>
                    <p className="text-xs text-foreground-500 leading-relaxed">{kpi.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Résultat Attendu */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-bar-chart-grouped-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-4">{autoHealingResults.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{autoHealingResults.body}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mb-6">
                  {autoHealingResults.metrics.map((metric, i) => (
                    <div key={metric.label} className="rounded-2xl border border-background-200 bg-white p-5 text-center group hover:border-emerald-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                        <i className={`${metric.icon} text-white text-lg`} />
                      </div>
                      <span className="block font-display text-2xl font-bold text-foreground-950 mb-1">{metric.value}</span>
                      <span className="text-xs text-foreground-500 font-medium">{metric.label}</span>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-100 border border-emerald-200">
                  <i className="ri-heart-pulse-line text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-700">{autoHealingResults.finalStatement}</p>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-heart-pulse-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">{autoHealingConclusion.title}</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto mb-6">{autoHealingConclusion.body}</p>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-100 border border-emerald-200">
                  <i className="ri-shield-star-line text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-700">{autoHealingConclusion.note}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS BLOCK UPDATE & FULL OPERATIONALIZATION ENGINE ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200 mb-6">
                <i className="ri-stack-line text-sky-600 text-sm" />
                <span className="text-sm font-semibold text-sky-700 uppercase tracking-wider">{blockUpdateIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{blockUpdateIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{blockUpdateIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{blockUpdateIntro.role}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-100 border border-sky-300">
                <i className="ri-flashlight-line text-sky-600" />
                <span className="text-sm font-bold text-sky-700">{blockUpdateIntro.tagline}</span>
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-3xl border-2 border-sky-300 bg-gradient-to-br from-sky-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center">
                  <i className="ri-flag-line text-sky-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{blockUpdateIntro.objective}</p>
              </div>
            </div>

            {/* 1. MODE DE FONCTIONNEMENT — 6 Block Types */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200">
                  <i className="ri-stack-line text-sky-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">1. Mode de Fonctionnement — Block Execution System</h3>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">Tu travailles uniquement en blocs d&apos;actions autonomes. Chaque cycle est un bloc structuré qui cible un domaine spécifique d&apos;optimisation du système KOS — de l&apos;audit initial à l&apos;alignement Big Four.</p>
              <div className="space-y-8">
                {blockTypes.map((block, i) => (
                  <div key={block.id} className="rounded-2xl border border-background-200 bg-background-50 overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${block.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${block.color} text-white flex-shrink-0`}>
                          <i className={`${block.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${block.color}`}>{block.subtitle}</span>
                          </div>
                          <h4 className="font-display text-xl font-bold text-foreground-950 mb-2">BLOCK TYPE {block.num} — {block.title}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-6">{block.description}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {block.actions.map((action, j) => (
                              <div key={action.name} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-background-200 group/item hover:border-sky-300 hover:shadow-sm transition-all duration-300">
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-sky-50 border border-sky-200 flex-shrink-0">
                                  <i className={`${action.icon} text-sky-500 text-sm`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-foreground-800 mb-0.5">{action.name}</p>
                                  <p className="text-xs text-foreground-500 leading-relaxed">{action.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {block.outputs && (
                            <div>
                              <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Livrables</p>
                              <div className="flex flex-wrap gap-2">
                                {block.outputs.map((out, j) => (
                                  <span key={out.name} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium bg-sky-50 border border-sky-200 text-sky-700 whitespace-nowrap">
                                    <i className={`${out.icon} text-sky-500 text-xs`} />{out.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {block.note && (
                            <div className="mt-5 pt-4 border-t border-background-200">
                              <p className="text-xs text-foreground-500 italic flex items-start gap-1.5">
                                <i className="ri-information-line text-sky-400 text-xs mt-0.5 flex-shrink-0" />
                                {block.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. KPI BIG FOUR TARGET SYSTEM */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-building-2-line text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">2. KPI Big Four Target System</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">Quatre piliers de performance mesurent l&apos;efficacité du système KOS : Intelligence Ops, Performance Ops, System Reliability et Growth Ops. Chaque pilier est décomposé en sous-métriques avec des cibles chiffrées.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {bigFourKpiTargets.map((kpi, i) => (
                  <div key={kpi.label} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${kpi.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${kpi.color} text-white flex-shrink-0`}>
                          <i className={`${kpi.icon} text-lg`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block font-display text-2xl font-bold text-foreground-950">{kpi.value}</span>
                          <h4 className="font-display text-sm font-bold text-foreground-950">{kpi.label}</h4>
                        </div>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-4">{kpi.desc}</p>
                      <div className="space-y-2">
                        {kpi.subMetrics.map((sm) => (
                          <div key={sm.name} className="flex items-center justify-between gap-2">
                            <span className="text-xs text-foreground-600">{sm.name}</span>
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-700 whitespace-nowrap">{sm.target}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. LOOP D'EXÉCUTION */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-loop-left-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-3">3. Loop d&apos;Exécution — Obligatoire</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">Chaque cycle suit une boucle d&apos;exécution stricte en 6 étapes. Aucune étape ne peut être contournée. La boucle est conçue pour garantir la traçabilité, la sécurité et l&apos;amélioration continue du système.</p>
              </div>
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {executionLoopSteps.map((step, i) => (
                    <div key={step.step} className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white mb-3`}>
                        <span className="font-display font-bold text-xs">{step.step}</span>
                      </div>
                      <i className={`${step.icon} text-foreground-500 text-lg mb-2`} />
                      <p className="text-xs font-bold text-foreground-800 mb-1">{step.label}</p>
                      <p className="text-xs text-foreground-500 leading-tight">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. RÈGLES D'OPTIMISATION */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
                  <i className="ri-shield-star-line text-amber-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">4. Règles d&apos;Optimisation</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {optimizationRules.map((rule, i) => (
                  <div key={rule.num} className="rounded-2xl border border-background-200 bg-background-50 p-5 text-center group hover:border-amber-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                      <i className={`${rule.icon} text-amber-600 text-lg`} />
                    </div>
                    <h4 className="font-display text-sm font-bold text-foreground-950 mb-1.5">{rule.title}</h4>
                    <p className="text-xs text-foreground-500 leading-relaxed">{rule.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. STRATÉGIE D'UPGRADE CONTINU + 6. CRÉATION D'AUTOMATIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Upgrade Strategy */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 border border-violet-200">
                    <i className="ri-stack-line text-violet-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">5. Stratégie d&apos;Upgrade Continu</h3>
                </div>
                <div className="space-y-4">
                  {upgradeStrategyLayers.map((layer, i) => (
                    <div key={layer.level} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className={`h-1.5 bg-gradient-to-r ${layer.color}`} />
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${layer.color} text-white flex-shrink-0`}>
                            <i className={`${layer.icon} text-lg`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="font-display text-sm font-bold text-foreground-950">{layer.level}</h4>
                              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-violet-50 border border-violet-200 text-violet-700 whitespace-nowrap">{layer.timeline}</span>
                            </div>
                            <p className="text-xs text-foreground-500 leading-relaxed mb-3">{layer.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {layer.focusAreas.map((area) => (
                                <span key={area} className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet-50 border border-violet-200 text-violet-700 whitespace-nowrap">{area}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automation Rules */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-100 border border-rose-200">
                    <i className="ri-robot-2-line text-rose-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">6. Création d&apos;Automations</h3>
                </div>
                <p className="text-sm text-foreground-600 leading-relaxed mb-6">Toute nouvelle automation doit respecter 5 règles obligatoires pour être validée et intégrée à l&apos;écosystème KOS.</p>
                <div className="space-y-4">
                  {automationCreationRules.map((rule, i) => (
                    <div key={rule.num} className="rounded-xl border border-background-200 bg-white p-5 flex items-start gap-4 group hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-100 border border-rose-200 flex-shrink-0">
                        <span className="font-display font-bold text-rose-600 text-sm">{rule.num}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <i className={`${rule.icon} text-rose-500 text-sm`} />
                          <h5 className="font-display text-sm font-bold text-foreground-950">{rule.title}</h5>
                        </div>
                        <p className="text-xs text-foreground-500 leading-relaxed">{rule.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 7. OUTPUT FORMAT */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-file-list-3-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">7. Format de Sortie Obligatoire</h3>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">Chaque cycle d&apos;exécution produit un rapport structuré en 7 sections obligatoires. Ce format garantit la traçabilité, la reproductibilité et l&apos;auditabilité de toutes les opérations.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {outputFormatItems.map((item, i) => (
                  <div key={item.step} className="rounded-2xl border border-background-200 bg-white p-5 group hover:border-slate-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                        <span className="font-display font-bold text-slate-600 text-xs">{item.step}</span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-foreground-950">{item.label}</h4>
                    </div>
                    <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. SAFE MODE */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 relative overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="text-center mb-8">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                    <i className="ri-shield-check-line text-rose-600 text-2xl" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">8. Safe Mode — Non Négociable</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-6">Le Safe Mode est la couche de protection qui empêche toute modification destructive du système KOS. Ces règles sont absolues et ne peuvent être contournées sous aucun prétexte.</p>
                </div>
                <div className="flex items-center justify-center gap-2 mb-8">
                  {safeModeProtocol.split(' → ').map((step, i) => (
                    <span key={i}>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold bg-rose-100 border border-rose-200 text-rose-700 whitespace-nowrap">
                        <i className={`${i === 0 ? 'ri-search-eye-line' : i === 1 ? 'ri-test-tube-line' : i === 2 ? 'ri-check-double-line' : i === 3 ? 'ri-play-circle-line' : 'ri-pulse-line'}`} />
                        {step}
                      </span>
                      {i < 4 && <span className="text-rose-400 font-bold mx-1">→</span>}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {safeModeRules.map((rule, i) => (
                    <div key={rule.title} className="rounded-xl bg-white border border-background-200 p-5 group hover:border-rose-200 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 border border-rose-200 flex-shrink-0">
                          <i className={`${rule.icon} text-rose-500 text-sm`} />
                        </div>
                        <h5 className="font-display text-sm font-bold text-foreground-950">{rule.title}</h5>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed">{rule.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-rocket-2-line text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">{blockUpdateConclusion.title}</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto mb-8">{blockUpdateConclusion.body}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                  {blockUpdateConclusion.pillars.map((pillar, i) => (
                    <div key={pillar.label} className="rounded-xl bg-white border border-background-200 p-4 text-center group hover:border-indigo-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                        <i className={`${pillar.icon} text-indigo-600 text-sm`} />
                      </div>
                      <p className="text-xs font-bold text-foreground-800 mb-1">{pillar.label}</p>
                      <p className="text-xs text-foreground-500 leading-tight">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-100 border border-indigo-200">
                  <i className="ri-refresh-line text-indigo-600" />
                  <p className="text-sm font-semibold text-indigo-700">{blockUpdateConclusion.finalStatement}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS AUTO-DEV + SECURE AUTO-DEPLOY ENGINE ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-50 border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
                <i className="ri-git-branch-line text-slate-600 text-sm" />
                <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{devOpsIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{devOpsIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{devOpsIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{devOpsIntro.role}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 border border-slate-300">
                <i className="ri-flashlight-line text-slate-600" />
                <span className="text-sm font-bold text-slate-700">{devOpsIntro.tagline}</span>
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-3xl border-2 border-slate-300 bg-gradient-to-br from-slate-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <i className="ri-flag-line text-slate-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{devOpsIntro.objective}</p>
              </div>
            </div>

            {/* Pipeline Auto-Dev + Auto-Deploy */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-git-branch-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Pipeline Auto-Dev + Auto-Deploy — Core Flow (9 Étapes)</h3>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">Chaque changement suit un pipeline obligatoire en 9 étapes. De la détection du besoin au rollback intelligent, chaque étape est validée, testée et monitorée. Aucune étape ne peut être contournée.</p>
              <div className="space-y-8">
                {pipelineSteps.map((step, i) => (
                  <div key={step.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${step.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white flex-shrink-0`}>
                          <i className={`${step.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${step.color}`}>{step.subtitle}</span>
                          </div>
                          <h4 className="font-display text-xl font-bold text-foreground-950 mb-2">STEP {step.step} — {step.title}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-6">{step.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {step.items.map((item, j) => (
                              <div key={item.name} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-200 group/item hover:border-slate-300 hover:shadow-sm transition-all duration-300">
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 flex-shrink-0">
                                  <i className={`${item.icon} text-slate-500 text-sm`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-foreground-800 mb-0.5">{item.name}</p>
                                  <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {step.note && (
                            <div className="mt-5 pt-4 border-t border-background-200">
                              <p className="text-xs text-foreground-500 italic flex items-start gap-1.5">
                                <i className="ri-information-line text-slate-400 text-xs mt-0.5 flex-shrink-0" />
                                {step.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-Dev Intelligence Layer */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 border border-violet-200">
                  <i className="ri-brain-line text-violet-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Auto-Dev Intelligence Layer — 4 Modules</h3>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">L'AI Dev Engine décompose l'intelligence de développement en 4 modules spécialisés : optimisation de code, génération de features, nettoyage de dette technique et sécurité. Chaque module fonctionne de manière autonome mais coordonnée.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {intelligenceLayers.map((layer, i) => (
                  <div key={layer.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${layer.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${layer.color} text-white flex-shrink-0`}>
                          <i className={`${layer.icon} text-lg`} />
                        </div>
                        <h4 className="font-display text-sm font-bold text-foreground-950 leading-snug">{layer.title}</h4>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-5">{layer.description}</p>
                      <div className="space-y-2.5">
                        {layer.capabilities.map((cap, j) => (
                          <div key={cap.name} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-background-50 border border-background-200 group/cap hover:border-violet-200 hover:shadow-sm transition-all duration-300">
                            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-violet-50 border border-violet-200 flex-shrink-0">
                              <i className={`${cap.icon} text-slate-500 text-xs`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-foreground-800 mb-0.5">{cap.name}</p>
                              <p className="text-xs text-foreground-500 leading-relaxed">{cap.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI Big Four DevOps */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-building-2-line text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">KPI Big Four DevOps System</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">Quatre piliers de performance DevOps optimisés en continu : Delivery Performance, System Stability, Engineering Efficiency et Security Compliance.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {devOpsKpis.map((kpi, i) => (
                  <div key={kpi.label} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${kpi.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${kpi.color} text-white flex-shrink-0`}>
                          <i className={`${kpi.icon} text-lg`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block font-display text-2xl font-bold text-foreground-950">{kpi.value}</span>
                          <h4 className="font-display text-sm font-bold text-foreground-950">{kpi.label}</h4>
                        </div>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-4">{kpi.desc}</p>
                      <div className="space-y-2">
                        {kpi.subMetrics.map((sm) => (
                          <div key={sm.name} className="flex items-center justify-between gap-2">
                            <span className="text-xs text-foreground-600">{sm.name}</span>
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-700 whitespace-nowrap">{sm.target}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safe Deploy Rules + Improvement Loop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Safe Deploy Rules */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-100 border border-rose-200">
                    <i className="ri-shield-check-line text-rose-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">Safe Deploy Rules — Non Négociable</h3>
                </div>
                <div className="space-y-4">
                  {safeDeployRules.map((rule, i) => (
                    <div key={rule.title} className="rounded-xl border border-background-200 bg-white p-5 flex items-start gap-4 group hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-100 border border-rose-200 flex-shrink-0">
                        <i className={`${rule.icon} text-rose-500 text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-display text-sm font-bold text-foreground-950 mb-1">{rule.title}</h5>
                        <p className="text-xs text-foreground-500 leading-relaxed">{rule.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvement Loop */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200">
                    <i className="ri-loop-left-line text-emerald-600 text-lg" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground-950">Continuous Improvement Loop</h3>
                </div>
                <p className="text-sm text-foreground-600 leading-relaxed mb-6">Cycle d'amélioration continue en 7 étapes. Le système apprend de chaque cycle — les patterns de succès et d'échec enrichissent les règles.</p>
                <div className="space-y-3">
                  {improvementLoop.map((step, i) => (
                    <div key={step.step} className="rounded-xl border border-background-200 bg-white p-4 flex items-center gap-4 group hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-100 border border-emerald-200 flex-shrink-0">
                        <span className="font-display font-bold text-emerald-600 text-xs">{step.step}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <i className={`${step.icon} text-foreground-400 text-xs`} />
                          <p className="text-xs font-bold text-foreground-950">{step.label}</p>
                        </div>
                        <p className="text-xs text-foreground-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deployment Strategy */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-100 border border-sky-200">
                  <i className="ri-cloud-line text-sky-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Deployment Strategy — Modern Stack</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {deploymentStack.map((stack, i) => (
                  <div key={stack.category} className="rounded-2xl border border-background-200 bg-white p-5 group hover:border-sky-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <i className={`${stack.icon} text-foreground-400 text-sm`} />
                      <h4 className="font-display text-xs font-bold text-foreground-700 uppercase tracking-wider">{stack.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {stack.items.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 border border-sky-200 text-sky-700 whitespace-nowrap">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Format */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-file-list-3-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Output Format Obligatoire — 7 Livrables</h3>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">À chaque exécution, le système produit un rapport structuré en 7 sections. Ce format garantit la traçabilité et l'auditabilité de toutes les opérations de développement et de déploiement.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {outputItems.map((item, i) => (
                  <div key={item.step} className="rounded-2xl border border-background-200 bg-white p-5 group hover:border-slate-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                        <span className="font-display font-bold text-slate-600 text-xs">{item.step}</span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-foreground-950">{item.label}</h4>
                    </div>
                    <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-slate-300 bg-gradient-to-br from-slate-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <i className="ri-git-branch-line text-slate-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">{devOpsConclusion.title}</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto mb-8">{devOpsConclusion.body}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                  {devOpsConclusion.pillars.map((pillar, i) => (
                    <div key={pillar.label} className="rounded-xl bg-white border border-background-200 p-4 text-center group hover:border-slate-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                        <i className={`${pillar.icon} text-slate-600 text-sm`} />
                      </div>
                      <p className="text-xs font-bold text-foreground-800 mb-1">{pillar.label}</p>
                      <p className="text-xs text-foreground-500 leading-tight">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-git-branch-line text-slate-600" />
                  <p className="text-sm font-semibold text-slate-700">{devOpsConclusion.finalStatement}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS SRE BIG FOUR REAL-TIME EXECUTIVE DASHBOARD ENGINE ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 mb-6">
                <i className="ri-dashboard-line text-indigo-600 text-sm" />
                <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wider">{sreIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{sreIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{sreIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{sreIntro.role}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-100 border border-indigo-300">
                <i className="ri-pulse-line text-indigo-600" />
                <span className="text-sm font-bold text-indigo-700">{sreIntro.tagline}</span>
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-flag-line text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{sreIntro.objective}</p>
              </div>
            </div>

            {/* Architecture — 4 Layers */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 border border-indigo-200">
                  <i className="ri-stack-line text-indigo-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Architecture du Dashboard — 4 Couches</h3>
              </div>
              <div className="space-y-8">
                {dashboardArchitectureLayers.map((layer, i) => (
                  <div key={layer.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${layer.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${layer.color} text-white flex-shrink-0`}>
                          <i className={`${layer.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${layer.color}`}>{layer.subtitle}</span>
                          </div>
                          <h4 className="font-display text-xl font-bold text-foreground-950 mb-2">{layer.label} {layer.title}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-6">{layer.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {layer.items.map((item, j) => (
                              <div key={item.name} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-200 group/item hover:border-indigo-300 hover:shadow-sm transition-all duration-300">
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 border border-indigo-200 flex-shrink-0">
                                  <i className={`${item.icon} text-indigo-500 text-sm`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-foreground-800 mb-0.5">{item.name}</p>
                                  <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI Big Four Core Metrics */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-bar-chart-grouped-line text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">KPI Big Four Core Metrics — 5 Piliers</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">Cinq piliers de métriques couvrant l'intégralité de la supervision SRE : fiabilité système, performance, expérience utilisateur, santé architecturale et sécurité. Chaque pilier est mesuré en continu avec des cibles Big Four.</p>
              </div>
              <div className="space-y-6">
                {coreMetrics.map((pillar, i) => (
                  <div key={pillar.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${pillar.color}`} />
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex-shrink-0`}>
                          <i className={`${pillar.icon} text-xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${pillar.color}`}>{pillar.subtitle}</span>
                          </div>
                          <h4 className="font-display text-lg font-bold text-foreground-950 mb-2">{pillar.label}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-5">{pillar.description}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {pillar.metrics.map((metric) => (
                              <div key={metric.name} className="rounded-xl bg-background-50 border border-background-200 p-4 text-center group/metric hover:border-indigo-200 hover:shadow-sm transition-all duration-300">
                                <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                                  <i className={`${metric.icon} text-indigo-500 text-sm`} />
                                </div>
                                <span className="block font-display text-lg font-bold text-foreground-950">{metric.target}</span>
                                <span className="text-xs text-foreground-500">{metric.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerting System */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                  <i className="ri-alarm-warning-line text-rose-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">Alerting System — 3 Niveaux</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">Système d'alerte à trois niveaux : critique (action immédiate + rollback), warning (auto-diagnostic + correction) et info (notification). Chaque niveau déclenche une réponse automatisée proportionnelle à la sévérité.</p>
              </div>
              <div className="space-y-6">
                {alertingSystem.map((alert, i) => (
                  <div key={alert.level} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${alert.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${alert.color} text-white flex-shrink-0`}>
                          <i className={`${alert.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${alert.color}`}>🔴 {alert.label}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${alert.bgColor} ${alert.textColor}`}>{alert.action}</span>
                          </div>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-6">{alert.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {alert.triggers.map((trigger, j) => (
                              <div key={trigger.name} className={`rounded-xl ${alert.bgColor} p-4 flex items-start gap-3 group/alert hover:shadow-sm transition-all duration-300`}>
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-background-200 flex-shrink-0">
                                  <i className={`${trigger.icon} ${alert.textColor} text-sm`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-foreground-800 mb-0.5">{trigger.name}</p>
                                  <p className="text-xs text-foreground-500 leading-relaxed">{trigger.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-Time Loop */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-loop-left-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-3">{realTimeLoop.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{realTimeLoop.description}</p>
              </div>
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {realTimeLoop.steps.map((step, i) => (
                    <div key={step.step} className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white mb-3`}>
                        <span className="font-display font-bold text-xs">{step.step}</span>
                      </div>
                      <i className={`${step.icon} text-foreground-500 text-lg mb-2`} />
                      <p className="text-xs font-bold text-foreground-800 mb-1">{step.label}</p>
                      <p className="text-xs text-foreground-500 leading-tight">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insight Engine */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-violet-300 bg-gradient-to-br from-violet-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-violet-500 to-violet-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center">
                  <i className="ri-brain-line text-violet-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{insightEngine.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">{insightEngine.description}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {insightEngine.categories.map((cat, i) => (
                  <div key={cat.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${cat.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white flex-shrink-0`}>
                          <i className={`${cat.icon} text-lg`} />
                        </div>
                        <h4 className="font-display text-sm font-bold text-foreground-950 leading-snug">{cat.title}</h4>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-5">{cat.description}</p>
                      <div className="space-y-3">
                        {cat.items.map((item, j) => (
                          <div key={item.name} className="rounded-xl bg-background-50 border border-background-200 p-4 group/item hover:border-violet-200 hover:shadow-sm transition-all duration-300">
                            <div className="flex items-start gap-2.5">
                              <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-violet-50 border border-violet-200 flex-shrink-0">
                                <i className="ri-lightbulb-line text-violet-500 text-xs" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-foreground-800 mb-0.5">{item.name}</p>
                                <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Structure */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-sky-300 bg-gradient-to-br from-sky-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center">
                  <i className="ri-layout-line text-sky-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{dashboardStructure.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">{dashboardStructure.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {dashboardStructure.panels.map((panel, i) => (
                  <div key={panel.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${panel.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${panel.color} text-white flex-shrink-0`}>
                          <i className={`${panel.icon} text-lg`} />
                        </div>
                        <h4 className="font-display text-sm font-bold text-foreground-950">{panel.title}</h4>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-5">{panel.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {panel.items.map((item) => (
                          <span key={item} className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 border border-sky-200 text-sky-700 whitespace-nowrap">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safe Operations Rules */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 relative overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="text-center mb-8">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                    <i className="ri-shield-check-line text-rose-600 text-2xl" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">Safe Operations Rules — Non Négociable</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-6">Les règles de sécurité opérationnelle sont absolues. Le système ne déclenche jamais d'action destructive sans validation, conserve tous les logs critiques, ne masque jamais les incidents et n'ignore jamais les anomalies répétées.</p>
                </div>
                <div className="flex items-center justify-center gap-2 mb-8">
                  {safeOpsProtocol.split(' → ').map((step, i) => (
                    <span key={i}>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold bg-rose-100 border border-rose-200 text-rose-700 whitespace-nowrap">
                        <i className={`${i === 0 ? 'ri-search-eye-line' : i === 1 ? 'ri-bar-chart-grouped-line' : i === 2 ? 'ri-lightbulb-flash-line' : 'ri-play-circle-line'}`} />
                        {step}
                      </span>
                      {i < 3 && <span className="text-rose-400 font-bold mx-1">→</span>}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {safeOpsRules.map((rule, i) => (
                    <div key={rule.title} className="rounded-xl bg-white border border-background-200 p-5 group hover:border-rose-200 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 border border-rose-200 flex-shrink-0">
                          <i className={`${rule.icon} text-rose-500 text-sm`} />
                        </div>
                        <h5 className="font-display text-sm font-bold text-foreground-950">{rule.title}</h5>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed">{rule.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Format */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-file-list-3-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">{outputFormatSRE.title}</h3>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">{outputFormatSRE.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {outputFormatSRE.items.map((item, i) => (
                  <div key={item.step} className="rounded-2xl border border-background-200 bg-white p-5 group hover:border-slate-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                        <span className="font-display font-bold text-slate-600 text-xs">{item.step}</span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-foreground-950">{item.label}</h4>
                    </div>
                    <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ultra Mode */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <i className="ri-flashlight-line text-amber-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{sreUltraMode.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{sreUltraMode.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                  {sreUltraMode.features.map((feat, i) => (
                    <div key={feat.name} className="rounded-xl bg-white border border-background-200 p-5 text-center group hover:border-amber-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <i className={`${feat.icon} text-amber-600 text-lg`} />
                      </div>
                      <h5 className="font-display text-sm font-bold text-foreground-950 mb-2">{feat.name}</h5>
                      <p className="text-xs text-foreground-500 leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <i className="ri-dashboard-line text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">{sreConclusion.title}</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto mb-8">{sreConclusion.body}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                  {sreConclusion.pillars.map((pillar, i) => (
                    <div key={pillar.label} className="rounded-xl bg-white border border-background-200 p-4 text-center group hover:border-indigo-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                        <i className={`${pillar.icon} text-indigo-600 text-sm`} />
                      </div>
                      <p className="text-xs font-bold text-foreground-800 mb-1">{pillar.label}</p>
                      <p className="text-xs text-foreground-500 leading-tight">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-100 border border-indigo-200">
                  <i className="ri-pulse-line text-indigo-600" />
                  <p className="text-sm font-semibold text-indigo-700">{sreConclusion.finalStatement}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS DIGITAL COMMUNICATION & SOCIAL NETWORKS PERFORMANCE AUDIT ENGINE ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-50 border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-6">
                <i className="ri-share-line text-amber-600 text-sm" />
                <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">{digitalComIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{digitalComIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{digitalComIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{digitalComIntro.role}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 border border-amber-300">
                <i className="ri-radar-line text-amber-600" />
                <span className="text-sm font-bold text-amber-700">{digitalComIntro.tagline}</span>
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <i className="ri-flag-line text-amber-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{digitalComIntro.objective}</p>
              </div>
            </div>

            {/* ═══ SOCIAL METRICS LIVE BANNER ═══ */}
            <SocialMetricsLiveBanner />

            {/* Architecture — 5 Audit Layers */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
                  <i className="ri-stack-line text-amber-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Architecture d’Audit — 5 Couches</h3>
              </div>
              <div className="space-y-8">
                {auditArchitectureLayers.map((layer, i) => (
                  <div key={layer.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${layer.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${layer.color} text-white flex-shrink-0`}>
                          <i className={`${layer.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${layer.color}`}>{layer.subtitle}</span>
                          </div>
                          <h4 className="font-display text-xl font-bold text-foreground-950 mb-2">{layer.label} {layer.title}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-6">{layer.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {layer.items.map((item, j) => (
                              <div key={item.name} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-200 group/item hover:border-amber-300 hover:shadow-sm transition-all duration-300">
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50 border border-amber-200 flex-shrink-0">
                                  <i className={`${item.icon} text-amber-500 text-sm`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-foreground-800 mb-0.5">{item.name}</p>
                                  <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI Big Four — 5 Piliers */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <i className="ri-bar-chart-grouped-line text-amber-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">KPI Big Four — 5 Piliers de Performance Digitale</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">Cinq piliers de performance couvrant l’intégralité de la communication digitale : engagement et reach, lead generation et conversion, qualité du contenu et autorité, santé email et automation, et réputation de marque.</p>
              </div>
              <div className="space-y-6">
                {digitalComKPIs.map((pillar, i) => (
                  <div key={pillar.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${pillar.color}`} />
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex-shrink-0`}>
                          <i className={`${pillar.icon} text-xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${pillar.color}`}>{pillar.subtitle}</span>
                          </div>
                          <h4 className="font-display text-lg font-bold text-foreground-950 mb-2">{pillar.label}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-5">{pillar.description}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {pillar.metrics.map((metric) => (
                              <div key={metric.name} className="rounded-xl bg-background-50 border border-background-200 p-4 text-center group/metric hover:border-amber-200 hover:shadow-sm transition-all duration-300">
                                <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                                  <i className={`${metric.icon} text-amber-500 text-sm`} />
                                </div>
                                <span className="block font-display text-lg font-bold text-foreground-950">{metric.target}</span>
                                <span className="text-xs text-foreground-500">{metric.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerting System */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                  <i className="ri-alarm-warning-line text-rose-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">Alerting System — 3 Niveaux</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">Système d’alerte à trois niveaux pour la communication digitale : critique (crise réputationnelle, panne email), warning (dégradation progressive, opportunité manquée) et info (records, optimisations, nouveaux segments).</p>
              </div>
              <div className="space-y-6">
                {alertingSystemDigital.map((alert, i) => (
                  <div key={alert.level} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${alert.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${alert.color} text-white flex-shrink-0`}>
                          <i className={`${alert.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${alert.color}`}>{alert.label}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${alert.bgColor} ${alert.textColor}`}>{alert.action}</span>
                          </div>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-6">{alert.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {alert.triggers.map((trigger, j) => (
                              <div key={trigger.name} className={`rounded-xl ${alert.bgColor} p-4 flex items-start gap-3 group/alert hover:shadow-sm transition-all duration-300`}>
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-background-200 flex-shrink-0">
                                  <i className={`${trigger.icon} ${alert.textColor} text-sm`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-foreground-800 mb-0.5">{trigger.name}</p>
                                  <p className="text-xs text-foreground-500 leading-relaxed">{trigger.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continuous Audit Cycle */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-loop-left-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-3">{auditCycle.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{auditCycle.description}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 text-center">Scans Quotidiens</p>
                  <div className="space-y-3">
                    {auditCycle.dailyScans.map((scan, i) => (
                      <div key={scan.label} className="rounded-xl border border-background-200 bg-white p-4 flex items-center gap-4 group hover:border-emerald-300 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200 flex-shrink-0">
                          <i className={`${scan.icon} text-emerald-600 text-sm`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-emerald-700">{scan.time}</span>
                            <span className="text-sm font-bold text-foreground-950">{scan.label}</span>
                          </div>
                          <p className="text-xs text-foreground-500 leading-relaxed">{scan.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4 text-center">Analyses Hebdomadaires</p>
                  <div className="space-y-3">
                    {auditCycle.weeklyScans.map((scan, i) => (
                      <div key={scan.label} className="rounded-xl border border-background-200 bg-white p-4 flex items-center gap-4 group hover:border-violet-300 hover:shadow-sm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-100 border border-violet-200 flex-shrink-0">
                          <i className={`${scan.icon} text-violet-600 text-sm`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-violet-700">{scan.day}</span>
                            <span className="text-sm font-bold text-foreground-950">{scan.label}</span>
                          </div>
                          <p className="text-xs text-foreground-500 leading-relaxed">{scan.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insight Engine */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-violet-300 bg-gradient-to-br from-violet-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-violet-500 to-violet-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center">
                  <i className="ri-brain-line text-violet-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{insightEngineDigital.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">{insightEngineDigital.description}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {insightEngineDigital.categories.map((cat, i) => (
                  <div key={cat.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${cat.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white flex-shrink-0`}>
                          <i className={`${cat.icon} text-lg`} />
                        </div>
                        <h4 className="font-display text-sm font-bold text-foreground-950 leading-snug">{cat.title}</h4>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-5">{cat.description}</p>
                      <div className="space-y-3">
                        {cat.items.map((item, j) => (
                          <div key={item.name} className="rounded-xl bg-background-50 border border-background-200 p-4 group/item hover:border-violet-200 hover:shadow-sm transition-all duration-300">
                            <div className="flex items-start gap-2.5">
                              <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-violet-50 border border-violet-200 flex-shrink-0">
                                <i className="ri-lightbulb-line text-violet-500 text-xs" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-foreground-800 mb-0.5">{item.name}</p>
                                <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Automation Rules Engine */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-sky-300 bg-gradient-to-br from-sky-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center">
                  <i className="ri-settings-3-line text-sky-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{automationRules.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">{automationRules.description}</p>
              </div>
              <div className="space-y-5">
                {automationRules.rules.map((rule, i) => (
                  <div key={rule.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${rule.color}`} />
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${rule.color} text-white flex-shrink-0`}>
                          <i className={`${rule.icon} text-lg`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-base font-bold text-foreground-950 mb-2">{rule.title}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                            <div className="rounded-lg bg-background-50 border border-background-200 p-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase mb-1">Déclencheur</p>
                              <p className="text-xs text-foreground-700">{rule.trigger}</p>
                            </div>
                            <div className="rounded-lg bg-background-50 border border-background-200 p-3">
                              <p className="text-xs font-bold text-foreground-500 uppercase mb-1">Action</p>
                              <p className="text-xs text-foreground-700">{rule.action}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 flex-wrap">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${rule.approval === 'Automatique' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-amber-50 border border-amber-200 text-amber-700'} whitespace-nowrap`}>
                              <i className={`${rule.approval === 'Automatique' ? 'ri-check-double-line' : 'ri-user-line'} mr-1`} />
                              {rule.approval}
                            </span>
                            <span className="text-xs text-foreground-500 italic flex items-center gap-1">
                              <i className="ri-shield-check-line text-foreground-400" />
                              {rule.safeguard}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Structure */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-sky-300 bg-gradient-to-br from-sky-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center">
                  <i className="ri-layout-line text-sky-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{dashboardStructureDigital.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">{dashboardStructureDigital.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {dashboardStructureDigital.panels.map((panel, i) => (
                  <div key={panel.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${panel.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${panel.color} text-white flex-shrink-0`}>
                          <i className={`${panel.icon} text-lg`} />
                        </div>
                        <h4 className="font-display text-sm font-bold text-foreground-950">{panel.title}</h4>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-5">{panel.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {panel.items.map((item) => (
                          <span key={item} className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 border border-sky-200 text-sky-700 whitespace-nowrap">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Automated Actions Catalog */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-robot-2-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{automatedActions.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">{automatedActions.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {automatedActions.categories.map((cat, i) => (
                  <div key={cat.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${cat.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white flex-shrink-0`}>
                          <i className={`${cat.icon} text-lg`} />
                        </div>
                        <h4 className="font-display text-base font-bold text-foreground-950">{cat.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {cat.actions.map((action, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-foreground-600 leading-relaxed">
                            <i className="ri-checkbox-circle-fill text-emerald-500 text-sm mt-0.5 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-code-s-slash-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">{techStackDigital.title}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {techStackDigital.items.map((stack, i) => (
                  <div key={stack.category} className="rounded-xl border border-background-200 bg-white p-5 group hover:border-slate-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <i className={`${stack.icon} text-foreground-400 text-sm`} />
                      <h4 className="font-display text-xs font-bold text-foreground-700 uppercase tracking-wider">{stack.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {stack.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 border border-amber-200 text-amber-700 whitespace-nowrap">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safe Operations Rules */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 relative overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="text-center mb-8">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                    <i className="ri-shield-check-line text-rose-600 text-2xl" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">Safe Operations Rules — Non Négociable</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-6">Les règles de sécurité opérationnelle pour la communication digitale sont absolues. Aucune action automatisée ne doit compromettre la réputation, la conformité RGPD ou la qualité de la relation avec les audiences.</p>
                </div>
                <div className="flex items-center justify-center gap-2 mb-8">
                  {safeOpsProtocolDigital.split(' → ').map((step, i) => (
                    <span key={i}>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold bg-rose-100 border border-rose-200 text-rose-700 whitespace-nowrap">
                        <i className={`${i === 0 ? 'ri-radar-line' : i === 1 ? 'ri-bar-chart-grouped-line' : i === 2 ? 'ri-lightbulb-flash-line' : i === 3 ? 'ri-check-double-line' : i === 4 ? 'ri-play-circle-line' : i === 5 ? 'ri-pulse-line' : 'ri-file-history-line'}`} />
                        {step}
                      </span>
                      {i < 6 && <span className="text-rose-400 font-bold mx-1">→</span>}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {safeOpsRulesDigital.map((rule, i) => (
                    <div key={rule.title} className="rounded-xl bg-white border border-background-200 p-5 group hover:border-rose-200 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 border border-rose-200 flex-shrink-0">
                          <i className={`${rule.icon} text-rose-500 text-sm`} />
                        </div>
                        <h5 className="font-display text-sm font-bold text-foreground-950">{rule.title}</h5>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed">{rule.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Format */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-file-list-3-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">{outputFormatDigital.title}</h3>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">{outputFormatDigital.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {outputFormatDigital.items.map((item, i) => (
                  <div key={item.step} className="rounded-2xl border border-background-200 bg-white p-5 group hover:border-slate-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                        <span className="font-display font-bold text-slate-600 text-xs">{item.step}</span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-foreground-950">{item.label}</h4>
                    </div>
                    <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Big Four Digital Modules */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <i className="ri-building-2-line text-amber-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{bigFourDigitalModules.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">{bigFourDigitalModules.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {bigFourDigitalModules.modules.map((mod, i) => (
                  <div key={mod.name} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${mod.color}`} />
                    <div className="p-6">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${mod.color} text-white mb-4 mx-auto`}>
                        <i className={`${mod.icon} text-xl`} />
                      </div>
                      <h4 className="font-display text-base font-bold text-foreground-950 mb-2 text-center">{mod.name}</h4>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-4 text-center">{mod.description}</p>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {mod.components.map((comp) => (
                          <span key={comp} className="px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-background-200 text-foreground-600 whitespace-nowrap">{comp}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ultra Mode */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <i className="ri-flashlight-line text-amber-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{digitalComUltraMode.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{digitalComUltraMode.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                  {digitalComUltraMode.features.map((feat, i) => (
                    <div key={feat.name} className="rounded-xl bg-white border border-background-200 p-5 text-center group hover:border-amber-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <i className={`${feat.icon} text-amber-600 text-lg`} />
                      </div>
                      <h5 className="font-display text-sm font-bold text-foreground-950 mb-2">{feat.name}</h5>
                      <p className="text-xs text-foreground-500 leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <i className="ri-share-line text-amber-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">{digitalComConclusion.title}</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto mb-8">{digitalComConclusion.body}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                  {digitalComConclusion.pillars.map((pillar, i) => (
                    <div key={pillar.label} className="rounded-xl bg-white border border-background-200 p-4 text-center group hover:border-amber-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <i className={`${pillar.icon} text-amber-600 text-sm`} />
                      </div>
                      <p className="text-xs font-bold text-foreground-800 mb-1">{pillar.label}</p>
                      <p className="text-xs text-foreground-500 leading-tight">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-100 border border-amber-200">
                  <i className="ri-radar-line text-amber-600" />
                  <p className="text-sm font-semibold text-amber-700">{digitalComConclusion.finalStatement}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ KOS LINKEDIN API INTEGRATION & SOCIAL CONNECTIVITY ENGINE ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-background-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
                <i className="ri-plug-line text-emerald-600 text-sm" />
                <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">{linkedInAPIIntro.version}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">{linkedInAPIIntro.title}</h2>
              <p className="text-lg text-foreground-500 font-medium mb-6">{linkedInAPIIntro.subtitle}</p>
              <p className="text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed italic">{linkedInAPIIntro.role}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-100 border border-emerald-300">
                <i className="ri-radar-line text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">{linkedInAPIIntro.tagline}</span>
              </div>
            </div>

            {/* Quick Status Cards */}
            <div className="mb-16">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickStatusCards.map((card, i) => (
                  <div key={card.label} className="rounded-2xl border border-background-200 bg-background-50 p-5 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                      <i className={`${card.icon} text-white text-lg`} />
                    </div>
                    <p className="text-xs font-bold text-foreground-950 mb-1">{card.label}</p>
                    <p className="text-sm font-bold text-emerald-600">{card.status}</p>
                    <p className="text-xs text-foreground-400 mt-0.5">{card.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Objectif Final */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-flag-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">Objectif Final</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto">{linkedInAPIIntro.objective}</p>
              </div>
            </div>

            {/* Current State Diagnostic */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <i className="ri-search-eye-line text-amber-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-3">{currentStateDiagnostic.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-8">{currentStateDiagnostic.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {currentStateDiagnostic.components.map((comp, i) => (
                  <div key={comp.name} className={`rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in ${comp.status === 'blocked' ? 'ring-1 ring-amber-300' : ''}`} style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${comp.status === 'live' ? 'from-emerald-400 to-emerald-500' : comp.status === 'blocked' ? 'from-amber-400 to-amber-500' : 'from-slate-400 to-slate-500'}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${comp.statusBg} flex-shrink-0`}>
                          <i className={`${comp.icon} ${comp.statusColor} text-lg`} />
                        </div>
                        <h4 className="font-display text-sm font-bold text-foreground-950 leading-snug">{comp.name}</h4>
                      </div>
                      <div className="space-y-2">
                        {comp.details.map((d) => (
                          <div key={d.label} className="flex items-center justify-between gap-2">
                            <span className="text-xs text-foreground-500">{d.label}</span>
                            <span className={`text-xs font-bold ${d.color}`}>{d.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="max-w-3xl mx-auto p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-amber-50/80 border border-emerald-200 text-center">
                <p className="text-sm text-foreground-700 leading-relaxed font-medium">{currentStateDiagnostic.summary}</p>
              </div>
            </div>

            {/* Architecture — 5 Diagnostic Layers */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200">
                  <i className="ri-stack-line text-emerald-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">Architecture d&apos;Audit — 5 Couches</h3>
              </div>
              <div className="space-y-8">
                {linkedInAPILayers.map((layer, i) => (
                  <div key={layer.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${layer.color}`} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${layer.color} text-white flex-shrink-0`}>
                          <i className={`${layer.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${layer.color}`}>{layer.subtitle}</span>
                          </div>
                          <h4 className="font-display text-xl font-bold text-foreground-950 mb-2">{layer.label} {layer.title}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-6">{layer.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {layer.items.map((item, j) => (
                              <div key={item.name} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-200 group/item hover:border-emerald-300 hover:shadow-sm transition-all duration-300">
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 border border-emerald-200 flex-shrink-0">
                                  <i className={`${item.icon} text-emerald-500 text-sm`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-foreground-800 mb-0.5">{item.name}</p>
                                  <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI Big Four — 5 Piliers */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-bar-chart-grouped-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">KPI Big Four — 5 Piliers de Connectivité API</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">Cinq piliers de performance couvrant l&apos;intégralité de la connectivité API sociale : disponibilité, couverture des scopes, santé des tokens, qualité des données et progression de l&apos;upgrade.</p>
              </div>
              <div className="space-y-6">
                {linkedInAPIKPIs.map((pillar, i) => (
                  <div key={pillar.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${pillar.color}`} />
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex-shrink-0`}>
                          <i className={`${pillar.icon} text-xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${pillar.color}`}>{pillar.subtitle}</span>
                          </div>
                          <h4 className="font-display text-lg font-bold text-foreground-950 mb-2">{pillar.label}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-5">{pillar.description}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {pillar.metrics.map((metric) => (
                              <div key={metric.name} className="rounded-xl bg-background-50 border border-background-200 p-4 text-center group/metric hover:border-emerald-200 hover:shadow-sm transition-all duration-300">
                                <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                                  <i className={`${metric.icon} text-emerald-500 text-sm`} />
                                </div>
                                <span className="block font-display text-lg font-bold text-foreground-950">{metric.target}</span>
                                <span className="text-xs text-foreground-500">{metric.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Token Lifecycle */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200">
                  <i className="ri-refresh-line text-emerald-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">{tokenLifecycle.title}</h3>
              </div>
              <p className="text-sm text-foreground-600 max-w-4xl mb-8 leading-relaxed">{tokenLifecycle.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                {tokenLifecycle.phases.map((phase, i) => (
                  <div key={phase.phase} className="rounded-xl border border-background-200 bg-white p-4 text-center group hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className={`w-9 h-9 mx-auto mb-2 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
                      <span className="text-white font-display font-bold text-xs">{phase.phase}</span>
                    </div>
                    <p className="text-xs font-bold text-foreground-800 mb-1">{phase.title}</p>
                    <p className="text-xs text-foreground-500 leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade Roadmap */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-violet-300 bg-gradient-to-br from-violet-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-violet-500 to-violet-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center">
                  <i className="ri-road-map-line text-violet-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{upgradeRoadmap.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">{upgradeRoadmap.description}</p>
              </div>
              <div className="space-y-6">
                {upgradeRoadmap.steps.map((step, i) => (
                  <div key={step.step} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${step.color}`} />
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start gap-5">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white flex-shrink-0`}>
                          <i className={`${step.icon} text-2xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${step.color}`}>ÉTAPE {step.step}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${step.status === 'completed' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : step.status === 'in_progress' ? 'bg-amber-50 border border-amber-200 text-amber-700' : 'bg-slate-50 border border-slate-200 text-slate-600'} whitespace-nowrap`}>
                              <i className={`${step.status === 'completed' ? 'ri-check-double-line' : step.status === 'in_progress' ? 'ri-loader-4-line' : 'ri-hourglass-line'} mr-1`} />
                              {step.status === 'completed' ? 'Complété' : step.status === 'in_progress' ? 'En cours' : 'En attente'}
                            </span>
                            <span className="text-xs font-bold text-foreground-400 ml-auto">{step.duration}</span>
                          </div>
                          <h4 className="font-display text-xl font-bold text-foreground-950 mb-2">{step.title}</h4>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-4">{step.description}</p>
                          <div>
                            <p className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Livrables</p>
                            <div className="flex flex-wrap gap-1.5">
                              {step.deliverables.map((d) => (
                                <span key={d} className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet-50 border border-violet-200 text-violet-700 whitespace-nowrap">{d}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Automated Actions */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-sky-300 bg-gradient-to-br from-sky-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden mb-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center">
                  <i className="ri-robot-2-line text-sky-600 text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">{linkedInAPIAutomatedActions.title}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto">Le moteur exécute automatiquement les actions de diagnostic, maintenance, alerting et documentation. Chaque action est journalisée, réversible et configurable.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {linkedInAPIAutomatedActions.categories.map((cat, i) => (
                  <div key={cat.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`h-1.5 bg-gradient-to-r ${cat.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white flex-shrink-0`}>
                          <i className={`${cat.icon} text-lg`} />
                        </div>
                        <h4 className="font-display text-base font-bold text-foreground-950">{cat.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {cat.actions.map((action, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-foreground-600 leading-relaxed">
                            <i className="ri-checkbox-circle-fill text-emerald-500 text-sm mt-0.5 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  <i className="ri-code-s-slash-line text-slate-600 text-lg" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950">{linkedInAPITechStack.title}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {linkedInAPITechStack.items.map((stack, i) => (
                  <div key={stack.category} className="rounded-xl border border-background-200 bg-white p-5 group hover:border-slate-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <i className={`${stack.icon} text-foreground-400 text-sm`} />
                      <h4 className="font-display text-xs font-bold text-foreground-700 uppercase tracking-wider">{stack.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {stack.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 whitespace-nowrap">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safe Operations Rules */}
            <div className="mb-16">
              <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/80 to-white p-8 sm:p-10 relative overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400" />
                <div className="text-center mb-8">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                    <i className="ri-shield-check-line text-rose-600 text-2xl" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground-950 mb-2">Safe Operations Rules — Non Négociable</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed max-w-3xl mx-auto mb-6">Les règles de sécurité des credentials API sont absolues. Aucun token n&apos;est jamais exposé côté client. La rotation est obligatoire. Le fallback est automatique. Chaque appel est journalisé.</p>
                </div>
                <div className="flex items-center justify-center gap-2 mb-8">
                  {linkedInAPISafeOpsProtocol.split(' → ').map((step, i) => (
                    <span key={i}>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold bg-rose-100 border border-rose-200 text-rose-700 whitespace-nowrap">
                        <i className={`${i === 0 ? 'ri-search-eye-line' : i === 1 ? 'ri-brain-line' : i === 2 ? 'ri-git-branch-line' : i === 3 ? 'ri-mail-line' : i === 4 ? 'ri-tools-line' : i === 5 ? 'ri-check-double-line' : 'ri-file-history-line'}`} />
                        {step}
                      </span>
                      {i < 6 && <span className="text-rose-400 font-bold mx-1">→</span>}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {linkedInAPISafeOps.map((rule, i) => (
                    <div key={rule.title} className="rounded-xl bg-white border border-background-200 p-5 group hover:border-rose-200 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 border border-rose-200 flex-shrink-0">
                          <i className={`${rule.icon} text-rose-500 text-sm`} />
                        </div>
                        <h5 className="font-display text-sm font-bold text-foreground-950">{rule.title}</h5>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed">{rule.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-white p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <i className="ri-plug-line text-emerald-600 text-2xl" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground-950 mb-4 uppercase tracking-wider">{linkedInAPIConclusion.title}</h3>
                <p className="text-base text-foreground-700 leading-relaxed max-w-2xl mx-auto mb-8">{linkedInAPIConclusion.body}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                  {linkedInAPIConclusion.pillars.map((pillar, i) => (
                    <div key={pillar.label} className="rounded-xl bg-white border border-background-200 p-4 text-center group hover:border-emerald-300 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                        <i className={`${pillar.icon} text-emerald-600 text-sm`} />
                      </div>
                      <p className="text-xs font-bold text-foreground-800 mb-1">{pillar.label}</p>
                      <p className="text-xs text-foreground-500 leading-tight">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-100 border border-emerald-200">
                  <i className="ri-plug-line text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-700">{linkedInAPIConclusion.finalStatement}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ VISION 2030 ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-100 border-t border-background-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-6">
                <i className="ri-eye-line text-amber-600 text-sm" />
                <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">{vision2030.title}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">{vision2030.subtitle}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
              {vision2030.pillars.map((pillar, i) => (
                <div key={pillar} className="rounded-2xl border border-background-200 bg-white p-6 text-center group hover:border-deloitte-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-deloitte-50 border border-deloitte-200 flex items-center justify-center group-hover:bg-deloitte-100 transition-colors">
                    <span className="font-display font-bold text-deloitte-600 text-sm">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground-800 leading-snug">{pillar}</p>
                </div>
              ))}
            </div>
            <div className="max-w-2xl mx-auto rounded-2xl border-2 border-deloitte-300 bg-deloitte-50/50 p-6 sm:p-8 text-center">
              <p className="text-sm font-bold text-foreground-500 uppercase tracking-wider mb-4">La formule Khepra 2030</p>
              <div className="flex flex-wrap justify-center items-center gap-3">
                {vision2030.formula.map((item, i) => (
                  <span key={item}>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-deloitte-200 text-sm font-semibold text-deloitte-700 whitespace-nowrap">{item}</span>
                    {i < vision2030.formula.length - 1 && (
                      <span className="text-deloitte-400 font-bold text-xl mx-1">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ BIG FOUR RESPONSE METHODOLOGY ═══════════ */}
        <section ref={methodologyRef} className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-200 mb-6">
                <i className="ri-scales-line text-accent-600 text-sm" />
                <span className="text-sm font-semibold text-accent-700 uppercase tracking-wider">Méthodologie de Réponse</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">Le standard Big Four appliqué à chaque réponse</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed">
                Inspirée des protocoles de réponse des cabinets de conseil de premier rang (Deloitte, McKinsey, BCG, Bain), notre méthodologie structure chaque échange en 5 étapes pour garantir rigueur, pertinence et valeur ajoutée.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-deloitte-400 via-accent-400 to-deloitte-400" />
                <div className="space-y-8">
                  {responseSteps.map((item, i) => (
                    <div key={item.step} className="flex flex-col md:flex-row gap-4 md:gap-6 items-start animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                      <div className={`w-16 h-16 flex items-center justify-center rounded-2xl border-2 ${item.color} flex-shrink-0 z-10`}>
                        <i className={`${item.icon} text-xl`} />
                      </div>
                      <div className="flex-1 pt-0 md:pt-3">
                        <h3 className="font-display text-lg font-bold text-foreground-950 mb-2">
                          <span className="text-deloitte-600 mr-2">Étape {item.step} —</span>{item.title}
                        </h3>
                        <p className="text-sm text-foreground-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ DIAGNOSTIC + LEAD QUALIFICATION ═══════════ */}
        <section ref={diagnosticRef} className="py-16 sm:py-20 lg:py-24 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Diagnostic Engine */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deloitte-50 border border-deloitte-200 mb-6">
                  <i className="ri-bar-chart-grouped-line text-deloitte-600 text-sm" />
                  <span className="text-sm font-semibold text-deloitte-700 uppercase tracking-wider">Moteur de Diagnostic</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground-950 mb-4">Évaluation de maturité en 5 niveaux</h3>
                <p className="text-sm text-foreground-600 leading-relaxed mb-8">
                  Chaque agent KOS évalue automatiquement le niveau de maturité du prospect sur son domaine d&apos;expertise, identifie les écarts et propose un plan d&apos;amélioration.
                </p>
                <div className="space-y-4">
                  {maturityLevels.map((item, i) => (
                    <div key={item.level} className="flex items-center gap-4 group animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-36 flex-shrink-0">
                        <span className="text-xs font-semibold text-foreground-700 whitespace-nowrap">{item.level}</span>
                      </div>
                      <div className="flex-1 h-3 rounded-full bg-background-200 overflow-hidden">
                        <div className={`h-full rounded-full ${item.color} transition-all duration-1000 group-hover:opacity-80`} style={{ width: `${item.pct}%` }} />
                      </div>
                      <div className="flex-1 hidden lg:block">
                        <span className="text-xs text-foreground-500 leading-tight">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-5 rounded-xl bg-deloitte-50 border border-deloitte-200">
                  <p className="text-sm text-deloitte-700 font-semibold flex items-center gap-2">
                    <i className="ri-information-line" />Diagnostic automatique dès la première conversation
                  </p>
                  <p className="text-xs text-foreground-600 mt-1">L&apos;agent identifie le niveau de maturité en temps réel et adapte ses recommandations en conséquence.</p>
                </div>
              </div>
              {/* Lead Qualification */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-200 mb-6">
                  <i className="ri-user-search-line text-accent-600 text-sm" />
                  <span className="text-sm font-semibold text-accent-700 uppercase tracking-wider">Lead Qualification</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground-950 mb-4">Qualification automatique des prospects</h3>
                <p className="text-sm text-foreground-600 leading-relaxed mb-8">
                  Le KOS identifie automatiquement le profil du visiteur et attribue un score de qualification pour prioriser les actions commerciales — sans jamais forcer la vente.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {leadQualifiers.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-50 border border-background-200">
                      <i className={`${item.icon} text-foreground-400 text-sm`} />
                      <span className="text-xs font-medium text-foreground-700">{item.label}</span>
                    </div>
                  ))}
                </div>
                <h4 className="text-sm font-bold text-foreground-950 mb-3">Score de qualification</h4>
                <div className="space-y-3">
                  {leadScores.map((lead) => (
                    <div key={lead.label} className="flex items-center gap-4 p-4 rounded-xl bg-background-50 border border-background-200 group hover:border-background-300 transition-all">
                      <div className={`w-3 h-3 rounded-full ${lead.color} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${lead.textColor}`}>{lead.label}</span>
                          <span className="text-xs text-foreground-400">Score {lead.score}</span>
                        </div>
                        <p className="text-xs text-foreground-500 mt-0.5">{lead.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ CONVERSION ENGINE ═══════════ */}
        <section className="py-16 sm:py-20 bg-white border-t border-background-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deloitte-50 border border-deloitte-200 mb-6">
              <i className="ri-hand-heart-line text-deloitte-600 text-sm" />
              <span className="text-sm font-semibold text-deloitte-700 uppercase tracking-wider">Moteur de Conversion</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">Quand la valeur est démontrée, la conversion est naturelle</h2>
            <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Le principe fondateur du KOS : l&apos;objectif n&apos;est pas de vendre. L&apos;objectif est de créer suffisamment de confiance pour que le prospect souhaite naturellement échanger avec un consultant humain.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
              {conversionOffers.map((offer, i) => (
                <div key={offer.title} className="p-5 rounded-2xl border border-background-200 bg-background-50 text-center group hover:border-deloitte-300 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-deloitte-50 border border-deloitte-200 flex items-center justify-center group-hover:bg-deloitte-100 transition-colors">
                    <i className={`${offer.icon} text-deloitte-600 text-xl`} />
                  </div>
                  <h4 className="font-display text-sm font-bold text-foreground-950 mb-1">{offer.title}</h4>
                  <p className="text-xs text-foreground-500">{offer.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-foreground-500 italic max-w-2xl mx-auto leading-relaxed">
              « Souhaitez-vous approfondir ce diagnostic avec un expert Khepra ? » — La question est toujours posée, jamais imposée. Chaque proposition de rendez-vous est contextuelle, pertinente et naturelle.
            </p>
          </div>
        </section>

        {/* ═══════════ KPI METRICS ═══════════ */}
        <section className="py-16 sm:py-20 bg-background-100 border-t border-background-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deloitte-50 border border-deloitte-200 mb-6">
                <i className="ri-bar-chart-2-line text-deloitte-600 text-sm" />
                <span className="text-sm font-semibold text-deloitte-700 uppercase tracking-wider">Indicateurs de Performance KOS 100&trade;</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">Des standards d&apos;excellence mesurables</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed">
                KOS 100&trade; est piloté par 7 indicateurs clés de performance, audités en continu. Chaque métrique est tracée, monitorée et publiée dans le rapport qualité trimestriel.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
              {kpiMetrics.map((kpi, i) => (
                <div key={kpi.label} className="rounded-2xl border border-background-200 bg-white p-5 text-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className={`w-11 h-11 mx-auto mb-3 rounded-xl ${kpi.color} flex items-center justify-center`}>
                    <i className={`${kpi.icon} text-white text-lg`} />
                  </div>
                  <span className="block font-display text-2xl font-bold text-foreground-950 mb-1">{kpi.value}</span>
                  <span className="text-xs text-foreground-500 font-medium">{kpi.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ RAG SEARCH ═══════════ */}
        <section className="py-12 sm:py-16 bg-background-100 border-t border-background-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-200 mb-4">
                <i className="ri-database-2-line text-accent-600 text-sm" />
                <span className="text-sm font-semibold text-accent-700 uppercase tracking-wider">Base Documentaire · 52+ documents réglementaires</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground-950 mb-3">Recherchez dans notre capital intellectuel</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto text-sm leading-relaxed">
                Interrogez notre base de 52+ documents réglementaires : textes BCEAO, circulaires COBAC, normes OHADA, directives BEPS, standards ESG. Recherche textuelle avancée par mots-clés.
              </p>
            </div>
            <RAGSearchBar />
          </div>
        </section>

        {/* ═══════════ AGENTS GRID ═══════════ */}
        <section ref={agentsRef} className="py-16 sm:py-20 lg:py-28 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground-950 mb-4">Les 22 Agents Experts KOS™</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto leading-relaxed">
                Chaque agent est un consultant virtuel de niveau Big Four, spécialisé dans un domaine critique et alimenté en continu par le pipeline KOS™. Cliquez sur « Consulter cet expert » pour engager une conversation immédiate.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {agents.slice(0, 22).map((agent) => (
                <div key={agent.id} className="group rounded-3xl border border-background-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-1" style={{ borderColor: `${agent.accentColor}30` }}>
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className="sm:w-56 shrink-0 relative overflow-hidden bg-background-100">
                      <img src={agent.imageUrl} alt={`${agent.name} — ${agent.domain}`} className="w-full h-64 sm:h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" width="600" height="750" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent sm:hidden" />
                      <div className="absolute bottom-4 left-4 right-4 sm:hidden">
                        <h3 className="font-display text-xl font-bold text-white">{agent.name}</h3>
                      </div>
                    </div>
                    <div className="flex-1 p-6 sm:p-7 flex flex-col">
                      <h3 className="hidden sm:block font-display text-xl font-bold text-foreground-950 mb-1">{agent.name}</h3>
                      <p className="hidden sm:block text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: agent.accentColor }}>{agent.domain}</p>
                      <p className="sm:hidden text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: agent.accentColor }}>{agent.domain}</p>
                      <p className="text-sm text-foreground-600 leading-relaxed mb-5 line-clamp-4">{agent.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {agent.expertise.slice(0, 6).map((skill, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap" style={{ backgroundColor: `${agent.accentColor}10`, borderColor: `${agent.accentColor}30`, color: agent.accentColor }}>{skill}</span>
                        ))}
                        {agent.expertise.length > 6 && <span className="px-2.5 py-1 rounded-full text-xs font-medium text-foreground-500 bg-background-100 border border-background-200 whitespace-nowrap">+{agent.expertise.length - 6} autres</span>}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {agent.kbDomains.map((domain, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: `${agent.accentColor}15`, color: agent.accentColor }}>
                            <i className="ri-folder-line text-xs" />{domain}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto">
                        <button onClick={() => handleConsultExpert(agent.id)} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg whitespace-nowrap text-white" style={{ background: `linear-gradient(135deg, ${agent.accentColor}, ${agent.accentColor}dd)` }}>
                          <i className="ri-chat-3-line text-lg" />Consulter cet expert<i className="ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ QUALITY CONTROL ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border-2 border-deloitte-200 bg-white overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-3 p-8 sm:p-10 lg:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-deloitte-100">
                      <i className="ri-check-double-line text-deloitte-600 text-xl" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground-950">Contrôle Qualité Big Four</h3>
                  </div>
                  <p className="text-foreground-600 leading-relaxed mb-6">
                    Le KOS™ applique un protocole de contrôle qualité directement inspiré des départements Quality &amp; Risk Management des Big Four. Chaque réponse produite par un agent est évaluée avant diffusion.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {qualityChecks.map((check) => (
                      <div key={check} className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-fill text-deloitte-600 text-sm flex-shrink-0" />
                        <span className="text-xs text-foreground-700">{check}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-deloitte-50 border border-deloitte-200">
                    <p className="text-sm text-deloitte-700 font-semibold"><i className="ri-information-line mr-1" />Toute réponse inférieure à 95/100 est automatiquement corrigée avant diffusion.</p>
                    <p className="text-xs text-foreground-600 mt-1">L&apos;agent Quality Review AI est indépendant de la production — il peut opposer un veto qualité contraignant.</p>
                  </div>
                </div>
                <div className="lg:col-span-2 bg-gradient-to-br from-deloitte-600 to-deloitte-800 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-28 h-28 rounded-full border-4 border-deloitte-400/40 flex items-center justify-center mb-4 bg-deloitte-700/50">
                    <div>
                      <span className="block font-display text-4xl font-bold text-white">95</span>
                      <span className="block text-xs text-deloitte-300">/100</span>
                    </div>
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-2">Score qualité minimal</h4>
                  <p className="text-sm text-deloitte-200 leading-relaxed mb-6">Seuil d&apos;acceptation KOS™. Toute réponse est notée sur 5 dimensions avant d&apos;atteindre le visiteur.</p>
                  <div className="w-full space-y-2">
                    {qualityDimensions.map((dim) => (
                      <div key={dim.label} className="flex items-center gap-2">
                        <span className="text-xs text-deloitte-200 w-24 text-right">{dim.label}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-deloitte-700 overflow-hidden">
                          <div className="h-full rounded-full bg-deloitte-400" style={{ width: `${dim.score}%` }} />
                        </div>
                        <span className="text-xs font-bold text-deloitte-300 w-8">{dim.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 rounded-2xl border border-background-200 bg-white text-center max-w-2xl mx-auto">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                <i className="ri-check-double-line text-slate-600 text-xl" />
              </div>
              <h4 className="font-display font-bold text-foreground-950 mb-1">KHEPRA Quality Review AI</h4>
              <p className="text-xs text-foreground-500 leading-relaxed">Agent indépendant — ne participe pas à la production, uniquement à la revue. Émet un certificat de conformité qualité horodaté pour chaque réponse diffusée. Son veto qualité est contraignant.</p>
            </div>
          </div>
        </section>

        {/* ═══════════ HOW IT WORKS ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deloitte-50 border border-deloitte-200 mb-6">
                <i className="ri-question-answer-line text-deloitte-600 text-sm" />
                <span className="text-sm font-semibold text-deloitte-700 uppercase tracking-wider">Comment ça marche</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">Une expertise immédiate, sans rendez-vous</h2>
              <p className="text-lg text-foreground-600 max-w-3xl mx-auto">Nos agents experts IA sont disponibles en permanence pour répondre à vos questions, vous orienter vers les ressources pertinentes et vous mettre en relation avec nos consultants humains si nécessaire.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {howItWorksSteps.map((step) => (
                <div key={step.step} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-deloitte-50 border border-deloitte-200 flex items-center justify-center group-hover:bg-deloitte-100 transition-colors">
                    <i className={`${step.icon} text-deloitte-600 text-2xl`} />
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-deloitte-500 text-white text-sm font-bold mb-4">{step.step}</div>
                  <h4 className="font-display text-lg font-bold text-foreground-950 mb-2">{step.title}</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ GOVERNANCE ═══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border-2 border-deloitte-200 bg-deloitte-50/50 p-8 sm:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-deloitte-100">
                      <i className="ri-scales-line text-deloitte-600 text-xl" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground-950">Gouvernance des Agents IA</h3>
                  </div>
                  <p className="text-foreground-600 leading-relaxed mb-6">
                    Conformément à la <strong>KHEPRA Constitution</strong> et au <strong>Module 09 — Agent Rules</strong> du framework de gouvernance, chaque agent IA opère sous des règles strictes :
                  </p>
                  <ul className="space-y-3">
                    {governanceRules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <i className="ri-checkbox-circle-fill text-deloitte-600 text-lg mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:w-1/3 bg-white rounded-2xl border border-deloitte-200 p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-deloitte-100 flex items-center justify-center">
                    <i className="ri-shield-star-line text-deloitte-600 text-2xl" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-foreground-950 mb-2">Score Qualité ≥ 95/100</h4>
                  <p className="text-sm text-foreground-600 mb-4">Chaque réponse produite par nos agents est évaluée selon la matrice de contrôle qualité Big Four avant diffusion.</p>
                  <div className="flex items-center justify-center gap-0.5">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-3 h-6 rounded-sm" style={{ background: '#86BC25', opacity: i < 9 ? 1 : 0.5 }} />
                    ))}
                  </div>
                  <span className="block text-xs text-deloitte-600 font-semibold mt-2">12 contrôles · 5 dimensions · Audit trimestriel</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://readdy.ai/api/search-image?query=abstract%20elegant%20dark%20background%20with%20interconnected%20deloitte%20green%20glowing%20network%20nodes%20forming%20a%20neural%20mesh%20pattern%20sophisticated%20corporate%20technology%20aesthetic%20subtle%20geometric%20connections%20premium%20dark%20gradient%20background%20no%20text%20no%20human%20figures%20minimalist%20and%20institutional&width=1920&height=400&seq=kos-cta-bg-v3&orientation=landscape" alt="" className="w-full h-full object-cover object-center opacity-15" width="1920" height="400" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/60 to-brand-900" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/15 border border-accent-400/30 backdrop-blur-sm mb-6">
              <i className="ri-cpu-line text-accent-400 text-sm" />
              <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">KOS 100™ + 5 Méta-Prompts — Enterprise Advisory Operating System</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Prêt à expérimenter l&apos;intelligence augmentée ?</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">Nos 22 agents experts IA vous assistent immédiatement, 24/7. Pour une consultation personnalisée avec un consultant KHEPRA, prenez rendez-vous dès maintenant.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => handleConsultExpert('any')} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#0a0a0a' }}>
                <i className="ri-chat-3-line text-xl" />Parler à un agent IA
              </button>
              <a href="/#contact" onClick={handleContactClick} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold text-base hover:bg-white/25 transition-all duration-300 cursor-pointer hover:scale-105 whitespace-nowrap">
                <i className="ri-calendar-line text-xl" />Prendre rendez-vous
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════ DISCLAIMER ═══════════ */}
        <section className="py-10 bg-background-100 border-t border-background-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3 p-5 rounded-xl bg-deloitte-50 border border-deloitte-200">
              <i className="ri-information-line text-deloitte-600 text-xl mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-deloitte-700 mb-1">Note importante</h4>
                <p className="text-xs text-foreground-600 leading-relaxed">
                  KOS 100™ Enterprise Advisory Operating System et les agents experts IA de KHEPRA EXPERTS sont des assistants conversationnels conçus pour fournir des informations générales et une orientation préliminaire. Ils ne remplacent pas un avis juridique, réglementaire ou fiscal personnalisé. Pour toute décision engageante, un entretien avec un consultant KHEPRA est recommandé. Conformément au Module 09 — Agent Rules du framework de gouvernance KHEPRA, chaque réponse est encadrée par les principes de véracité absolue, périmètre explicite, scoring qualité ≥ 95/100 et traçabilité des sources.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Toast */}
      {selectedAgent && (
        <div className="fixed bottom-24 right-6 z-[99999] animate-slide-up">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-brand-900 text-white shadow-2xl border border-deloitte-500/30 backdrop-blur-xl">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-deloitte-500/20 flex-shrink-0">
              <i className="ri-robot-line text-deloitte-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">{selectedAgent}</p>
              <p className="text-xs text-gray-400 leading-tight">Expert consulté — posez votre question</p>
            </div>
            <button onClick={() => setSelectedAgent(null)} className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0">
              <i className="ri-close-line text-white text-xs" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}





