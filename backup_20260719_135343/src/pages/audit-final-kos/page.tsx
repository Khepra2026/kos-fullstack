import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import {
  KOS_ENGINES,
  KOS_UNIFIED_AGENTS,
  SYSTEM_HEALTH,
  RESOURCE_OPTIMIZATIONS,
  DEPLOYMENT_ACTIONS,
} from '@/mocks/resourceCommandCenter';

type TabId = 'synthese' | 'axes' | 'moteurs' | 'agents' | 'roadmap' | 'actions' | 'gaps';

const AUDIT_AXES = [
  { id: 'strategie', label: 'Stratégie & Positionnement', score: 62, poids: 15, cible: 95, icon: 'ri-compass-3-line', color: '#4F46E5', diagnostic: 'Clair sur le papier, flou dans l\'exécution' },
  { id: 'marketing', label: 'Marketing & Lead Gen', score: 38, poids: 15, cible: 95, icon: 'ri-megaphone-line', color: '#C05A3A', diagnostic: 'Infrastructure existante mais tuyau vide' },
  { id: 'seo', label: 'SEO & Visibilité', score: 55, poids: 15, cible: 95, icon: 'ri-search-line', color: '#0D7B5F', diagnostic: 'Bonne architecture, autorité faible' },
  { id: 'commercial', label: 'Commercial & Conversion', score: 42, poids: 10, cible: 95, icon: 'ri-hand-heart-line', color: '#9B7B2C', diagnostic: 'CRM construit, scoring absent' },
  { id: 'ia', label: 'IA & Automatisation', score: 28, poids: 20, cible: 95, icon: 'ri-robot-line', color: '#C2410C', diagnostic: 'Documentation brillante, exécution zéro' },
  { id: 'production', label: 'Production Intellectuelle', score: 65, poids: 10, cible: 95, icon: 'ri-quill-pen-line', color: '#4A7A1E', diagnostic: 'Capital documentaire mais pas industrialisé' },
  { id: 'infra', label: 'Infrastructure Technique', score: 58, poids: 10, cible: 90, icon: 'ri-server-line', color: '#6B4A3A', diagnostic: 'Solide mais sous-exploitée' },
  { id: 'excellence', label: 'Excellence Opérationnelle', score: 35, poids: 5, cible: 95, icon: 'ri-shield-check-line', color: '#8B3040', diagnostic: 'KOS structuré mais théorique' },
];

const ROADMAP_PHASES = [
  {
    id: 'phase1', timeline: 'J0-J90', title: 'Fondations — Activation RAG + Agent + Veille',
    progress: 25, color: '#C2410C', icon: 'ri-database-2-line',
    items: ['Activer pgvector + embeddings 52 docs', 'Agent conversationnel 24/7', 'Veille réglementaire auto', 'Scoring prédictif CRM'],
  },
  {
    id: 'phase2', timeline: 'J91-J180', title: 'Accélération — Contenu Auto + Portail Client',
    progress: 5, color: '#E8C547', icon: 'ri-rocket-line',
    items: ['Génération articles SEO auto', 'Rapports diagnostic narratifs IA', 'Portail client /mon-espace', 'Connexion Stripe + pricing'],
  },
  {
    id: 'phase3', timeline: 'J181-J365', title: 'Domination — Automatisation Complète',
    progress: 0, color: '#86BC25', icon: 'ri-trophy-line',
    items: ['Orchestrateur multi-agent 8 directeurs', 'Propositions commerciales IA', 'Baromètre Conformité BCEAO 2026', 'Score Big Four 95/100'],
  },
];

const FORCES = [
  { label: 'Capital intellectuel réglementaire (15 bibliothèques)', niveau: 'Très élevé' },
  { label: 'Documentation stratégique niveau Big Four (5000+ mots)', niveau: 'Très élevé' },
  { label: 'Site web 175+ pages, SEO technique solide', niveau: 'Élevé' },
  { label: 'Infrastructure React 19 + Supabase stable (Build 10/10)', niveau: 'Élevé' },
  { label: 'Connaissance intime des régulateurs (BCEAO, COBAC, GAFI)', niveau: 'Très élevé' },
  { label: 'Positionnement 3 BUs exclusives sans concurrence directe', niveau: 'Élevé' },
  { label: 'Pipeline de capitalisation KOS Rules 1-6 conçu', niveau: 'Élevé' },
];

const FAIBLESSES = [
  { label: 'Zéro agent IA déployé en production (11 documentés, 0 opérationnels)', gravite: '🔴 Critique' },
  { label: 'KOS purement théorique (6 règles, pipeline 7 étapes, rien automatisé)', gravite: '🔴 Critique' },
  { label: 'Base de connaissances non vectorisée (pgvector non activé)', gravite: '🔴 Critique' },
  { label: 'CRM sans intelligence (scoring règles fixes, zéro ML)', gravite: '🟠 Élevé' },
  { label: 'Génération de contenu 100% manuelle', gravite: '🟠 Élevé' },
  { label: 'Aucun agent conversationnel, pas de chatbot 24/7', gravite: '🟠 Élevé' },
  { label: 'Autorité de domaine faible (DA < 20, backlinks inexistants)', gravite: '🟡 Moyen' },
  { label: 'Pas de portail client, /mon-espace vide', gravite: '🟡 Moyen' },
  { label: 'Pas de monétisation directe (Stripe non connecté)', gravite: '🟡 Moyen' },
];

const PRIORITY_ACTIONS = [
  { id: 'act-1', label: 'Activer pgvector + générer embeddings 48 documents RAG', priorite: '🔴 Critique', delai: 'J+14', effort: '15h' },
  { id: 'act-2', label: 'Déployer widget Agent Conversationnel Khepra 24/7', priorite: '🔴 Critique', delai: 'J+30', effort: '24h' },
  { id: 'act-3', label: 'Automatiser la veille réglementaire (12 sources)', priorite: '🔴 Critique', delai: 'J+60', effort: '22h' },
  { id: 'act-4', label: 'Déployer scoring prédictif CRM (ML)', priorite: '🔴 Critique', delai: 'J+90', effort: '24h' },
  { id: 'act-5', label: 'Créer pipeline génération articles SEO (semi-auto)', priorite: '🔴 Critique', delai: 'J+120', effort: '32h' },
  { id: 'act-6', label: 'Créer 9 chartes agents manquants (GAPs critiques)', priorite: '🟠 Élevé', delai: 'J+60', effort: '36h' },
  { id: 'act-7', label: 'Déployer CSP + headers sécurité (X-Frame-Options, Referrer-Policy)', priorite: '🟠 Élevé', delai: 'J+7', effort: '3h' },
  { id: 'act-8', label: 'Activer auto-deploy sur 26 agents (54% en manuel)', priorite: '🟠 Élevé', delai: 'J+30', effort: '12h' },
  { id: 'act-9', label: 'Connecter 12 pages orphelines au maillage interne', priorite: '🟡 Moyen', delai: 'J+7', effort: '4h' },
  { id: 'act-10', label: 'Déployer CTA contextuels sur 45 articles sans conversion', priorite: '🟡 Moyen', delai: 'J+14', effort: '6h' },
];

export default function AuditFinalKOSPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('synthese');
  const [expandedAxe, setExpandedAxe] = useState<string | null>(null);

  const health = SYSTEM_HEALTH;

  const agentStats = useMemo(() => ({
    total: KOS_UNIFIED_AGENTS.length,
    active: KOS_UNIFIED_AGENTS.filter((a) => a.status === 'active').length,
    partial: KOS_UNIFIED_AGENTS.filter((a) => a.status === 'partial').length,
    gap: KOS_UNIFIED_AGENTS.filter((a) => a.status === 'gap').length,
  }), []);

  const weightedScore = useMemo(() => {
    let total = 0;
    AUDIT_AXES.forEach((axe) => { total += (axe.score * axe.poids) / 100; });
    return total;
  }, []);

  const gapActions = useMemo(() => DEPLOYMENT_ACTIONS.filter(a => !a.applied).slice(0, 10), []);

  const gapStats = useMemo(() => ({
    total: gapActions.length,
    critical: gapActions.filter(a => a.priority === 'critical').length,
    major: gapActions.filter(a => a.priority === 'major').length,
    autoApplicable: gapActions.filter(a => a.autoApplicable).length,
    totalHours: gapActions.reduce((s, a) => s + parseInt(a.estimatedTime.replace('h', ''), 10), 0),
  }), [gapActions]);

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'synthese', label: 'Synthèse Exécutive', icon: 'ri-file-chart-line' },
    { id: 'axes', label: '8 Axes d\'Audit', icon: 'ri-radar-line' },
    { id: 'moteurs', label: '8 Moteurs KOS', icon: 'ri-cpu-line' },
    { id: 'agents', label: `48 Agents (${agentStats.active}/${agentStats.total})`, icon: 'ri-robot-line' },
    { id: 'roadmap', label: 'Roadmap 365J', icon: 'ri-road-map-line' },
    { id: 'actions', label: 'Actions Prioritaires', icon: 'ri-tools-line' },
    { id: 'gaps', label: `GAPs & Correctifs (${gapStats.total})`, icon: 'ri-bug-line' },
  ];

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title="Audit Final KOS — Système d'Orchestration | Score Big Four 47/100 | KHEPRA EXPERTS"
        description="Audit final consolidé du système d'orchestration KOS : 8 axes, 48 agents, 8 moteurs. Score actuel 47/100, cible 95/100. Roadmap 365 jours. Référence : Comité Combiné Big Four (Deloitte, PwC, EY, KPMG, McKinsey, BCG)."
        keywords="audit KOS final, KOS orchestration audit, Big Four grade, score KHEPRA OS, 48 agents KOS, roadmap KOS 365 jours, KHEPRA EXPERTS"
        canonicalPath="/audit-final-kos"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />
      <Navigation />

      <main id="main-content">
        {/* Hero */}
        <section className="relative bg-background-100 border-b border-background-200/70">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=dark%20sophisticated%20audit%20command%20center%20with%20interconnected%20glowing%20amber%20emerald%20and%20warm%20red%20dashboard%20nodes%20forming%20a%20comprehensive%20scoring%20matrix%2C%20geometric%20precision%20patterns%20radiating%20from%20a%20central%20hub%20representing%20consolidated%20audit%20intelligence%2C%20premium%20corporate%20governance%20atmosphere%20with%20structured%20data%20visualization%20layers%2C%20clean%20minimalist%20dark%20background%20with%20algorithmic%20precision%20and%20layered%20complexity%2C%20no%20text%20no%20human%20figures&width=1920&height=600&seq=audit-final-kos-hero&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-15"
              width="1920"
              height="600"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm mb-6">
                <i className="ri-scales-3-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  Audit Final — Comité Combiné Big Four · 12 Juin 2026
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Audit Final du Système
                <span className="block text-amber-400 mt-2">d'Orchestration KOS</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                <strong className="text-white">48 agents</strong> répartis sur <strong className="text-white">8 moteurs</strong>.{' '}
                8 axes d'audit calibrés Big Four. Score global pondéré, roadmap 365 jours, actions prioritaires.{' '}
                <strong className="text-white">Document de référence unique.</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <span className="text-lg font-bold text-red-300">{weightedScore.toFixed(0)}/100</span>
                  <span className="text-sm text-red-300">Score Actuel</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="text-lg font-bold text-emerald-300">95/100</span>
                  <span className="text-sm text-emerald-300">Score Cible</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="text-lg font-bold text-amber-300">+{95 - Math.round(weightedScore)}</span>
                  <span className="text-sm text-amber-300">Points à Combler</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Score Bar */}
        <section className="relative -mt-8 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="text-center lg:text-left flex-shrink-0">
                  <span className="text-7xl font-bold font-heading text-red-600">{weightedScore.toFixed(0)}</span>
                  <span className="text-2xl text-foreground-400">/100</span>
                  <p className="text-sm text-red-700 font-bold mt-1">CABINET BOUTIQUE DIGITALISÉ</p>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground-500">Progression vers Big Four Grade</span>
                    <span className="font-bold text-foreground-700">{weightedScore.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-6 rounded-full bg-background-100 overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-1000"
                      style={{
                        width: `${(weightedScore / 100) * 100}%`,
                        background: 'linear-gradient(90deg, #C2410C 0%, #E8C547 50%, #86BC25 100%)',
                      }}
                    >
                      {weightedScore > 15 && (
                        <span className="text-xs text-white font-bold">{weightedScore.toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-foreground-400 mt-1.5">
                    <span>Juin 2026</span>
                    <span className="font-bold text-amber-600">J+90 : 68</span>
                    <span className="font-bold text-emerald-600">J+365 : 95</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-20 z-30 bg-white border-b border-background-200 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-white'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* === TAB: SYNTHÈSE EXÉCUTIVE === */}
        {activeTab === 'synthese' && (
          <>
            <ScrollReveal>
              {/* Comité */}
              <section className="py-8 sm:py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="rounded-2xl bg-white border border-background-200 p-6 sm:p-8 mb-8">
                    <h2 className="font-heading text-xl font-bold text-foreground-950 mb-4 flex items-center gap-2">
                      <i className="ri-team-line text-foreground-600" />
                      Comité d'Audit Combiné
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { role: 'Associé Advisory — Deloitte', expertise: 'Régulation financière, risque prudentiel', anciennete: '18 ans' },
                        { role: 'Associé Tax & Legal — PwC', expertise: 'Prix de transfert, BEPS, fiscalité', anciennete: '21 ans' },
                        { role: 'Associé Risk Consulting — KPMG', expertise: 'GRC, audit interne, LBC/FT', anciennete: '16 ans' },
                        { role: 'Associé Strategy — EY', expertise: 'Gouvernance familiale, ESG', anciennete: '19 ans' },
                        { role: 'Architecte IA — Ex-McKinsey QBlk', expertise: 'Systèmes multi-agents, RAG, LLM', anciennete: '14 ans' },
                        { role: 'Dir. Marketing B2B — Ex-BCG', expertise: 'Stratégie digitale, SEO/GEO', anciennete: '15 ans' },
                        { role: 'Dir. SEO — Ex-Accenture Interactive', expertise: 'SEO technique, GEO, EEAT', anciennete: '12 ans' },
                        { role: 'Consultant Transfo. — Ex-Capgemini', expertise: 'CRM, automatisation, archi', anciennete: '13 ans' },
                      ].map((m, i) => (
                        <div key={i} className="rounded-xl bg-background-50 border border-background-100 p-4">
                          <p className="text-xs font-bold text-foreground-800 mb-1">{m.role}</p>
                          <p className="text-[10px] text-foreground-400 leading-relaxed">{m.expertise}</p>
                          <span className="inline-block mt-2 text-[10px] font-bold text-foreground-500 bg-background-100 px-2 py-0.5 rounded-full">{m.anciennete}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verdict */}
                  <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white mb-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 mb-4">
                      <i className="ri-scales-3-line text-amber-400 text-sm" />
                      <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">Verdict du Comité — 07 Juin 2026</span>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4">
                      KHEPRA EXPERTS possède un <strong className="text-white">capital intellectuel et documentaire exceptionnel</strong> pour un cabinet de sa taille. La Constitution, l'AI Governance, le Multi-Agent System et le KOS sont des documents de niveau Big Four — probablement les meilleurs que ce comité ait vus pour une structure indépendante.
                    </p>
                    <p className="text-base text-amber-400 font-bold max-w-2xl mx-auto">
                      « Mais le fossé entre la documentation et l'exécution est abyssal. Le système actuel est un planeur magnifiquement conçu qui n'a jamais quitté le tarmac. »
                    </p>
                  </div>

                  {/* Forces & Faiblesses */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="rounded-2xl bg-white border border-emerald-200 p-6">
                      <h3 className="font-heading text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <i className="ri-check-double-line text-emerald-600" />
                        7 Forces Réelles
                      </h3>
                      <ul className="space-y-2.5">
                        {FORCES.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                            <span>{f.label} <span className="text-emerald-600 font-bold text-xs">({f.niveau})</span></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-white border border-red-200 p-6">
                      <h3 className="font-heading text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                        <i className="ri-error-warning-line text-red-600" />
                        9 Faiblesses Critiques
                      </h3>
                      <ul className="space-y-2.5">
                        {FAIBLESSES.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                            <span className="text-xs flex-shrink-0 mt-0.5">{f.gravite}</span>
                            <span>{f.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                    {[
                      { label: 'Agents KOS', value: '48', icon: 'ri-robot-line', color: '#4F46E5' },
                      { label: 'Activés', value: String(health.activeAgents), icon: 'ri-checkbox-circle-line', color: '#86BC25' },
                      { label: 'Partiels', value: String(health.partialAgents), icon: 'ri-time-line', color: '#E8C547' },
                      { label: 'GAPs', value: String(health.gapAgents), icon: 'ri-error-warning-line', color: '#C2410C' },
                      { label: 'Moteurs', value: String(health.totalEngines), icon: 'ri-cpu-line', color: '#0D7B5F' },
                      { label: 'Score KOS', value: '6.8/10', icon: 'ri-bar-chart-line', color: '#9B7B2C' },
                      { label: 'Alertes', value: String(health.alertsActive), icon: 'ri-alert-line', color: '#C05A3A' },
                      { label: 'Build', value: '10/10', icon: 'ri-check-line', color: '#2D7A3A' },
                    ].map((stat, i) => (
                      <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                        <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                          <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                        </div>
                        <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                        <span className="text-[10px] text-foreground-400">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </>
        )}

        {/* === TAB: 8 AXES D'AUDIT === */}
        {activeTab === 'axes' && (
          <ScrollReveal>
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-2">Les 8 Axes d'Audit Big Four</h2>
                  <p className="text-foreground-600">Score pondéré : {weightedScore.toFixed(0)}/100 · Cible : 95/100 · Écart : {95 - Math.round(weightedScore)} points</p>
                </div>

                <div className="space-y-4">
                  {AUDIT_AXES.map((axe) => {
                    const isExpanded = expandedAxe === axe.id;
                    const barColor = axe.score >= 80 ? '#86BC25' : axe.score >= 60 ? '#E8C547' : axe.score >= 40 ? '#E8943A' : '#C2410C';
                    return (
                      <div key={axe.id} className={`rounded-2xl border transition-all duration-300 ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'}`}>
                        <button
                          onClick={() => setExpandedAxe(isExpanded ? null : axe.id)}
                          className="w-full p-5 text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${axe.color}15` }}>
                              <i className={`${axe.icon} text-xl`} style={{ color: axe.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1 flex-wrap">
                                <h3 className="text-base font-bold text-foreground-950">{axe.label}</h3>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-500">Poids {axe.poids}%</span>
                              </div>
                              <p className="text-xs text-foreground-500">{axe.diagnostic}</p>
                            </div>
                            <div className="text-center flex-shrink-0">
                              <span className="block text-2xl font-bold font-heading" style={{ color: barColor }}>{axe.score}</span>
                              <span className="text-[10px] text-foreground-400">/100</span>
                            </div>
                            <div className="flex-shrink-0">
                              <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                            </div>
                          </div>
                          <div className="mt-3 w-full h-2 rounded-full bg-background-100 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${axe.score}%`, backgroundColor: barColor }} />
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-background-200 pt-4">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-foreground-500">Score actuel : <strong style={{ color: barColor }}>{axe.score}/100</strong></span>
                              <span className="text-foreground-300">|</span>
                              <span className="text-foreground-500">Cible : <strong className="text-emerald-600">{axe.cible}/100</strong></span>
                              <span className="text-foreground-300">|</span>
                              <span className="text-foreground-500">Écart : <strong style={{ color: barColor }}>+{axe.cible - axe.score} points</strong></span>
                              <span className="text-foreground-300">|</span>
                              <span className="text-foreground-500">Contribution au score global : <strong>{(axe.score * axe.poids / 100).toFixed(1)}</strong></span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                  <h3 className="font-heading text-xl font-bold mb-2">Formule de Calcul</h3>
                  <p className="text-gray-400 text-sm">Score Global = Σ (Score Axe × Poids) / 100</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm">
                    {AUDIT_AXES.map((axe, i) => (
                      <span key={axe.id} className="flex items-center gap-1">
                        <span className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ backgroundColor: `${axe.color}20`, color: axe.color }}>
                          {axe.label.substring(0, 12)} × {axe.poids}%
                        </span>
                        {i < AUDIT_AXES.length - 1 && <span className="text-gray-600">+</span>}
                      </span>
                    ))}
                    <span className="text-gray-600">=</span>
                    <span className="px-4 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 text-lg font-bold">{weightedScore.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* === TAB: 8 MOTEURS === */}
        {activeTab === 'moteurs' && (
          <ScrollReveal>
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-2">Les 8 Moteurs KOS</h2>
                  <p className="text-foreground-600">{health.healthyEngines} sains · {health.degradedEngines} dégradés · {health.criticalEngines} critique</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {KOS_ENGINES.map((engine) => {
                    const statusBadge = engine.status === 'healthy' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                      engine.status === 'degraded' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                      'bg-red-50 border-red-200 text-red-700';
                    const statusDot = engine.status === 'healthy' ? 'bg-emerald-500' :
                      engine.status === 'degraded' ? 'bg-amber-500' : 'bg-red-500';
                    const statusLabel = engine.status === 'healthy' ? 'Healthy' :
                      engine.status === 'degraded' ? 'Degraded' : 'Critical';
                    const cpuColor = engine.cpuUsage > 60 ? '#c2410c' : engine.cpuUsage > 40 ? '#e8c547' : '#86bc25';
                    const memColor = engine.memoryUsage > 60 ? '#c2410c' : engine.memoryUsage > 40 ? '#e8c547' : '#86bc25';
                    return (
                      <a
                        key={engine.id}
                        href={engine.path}
                        className="rounded-2xl bg-white border border-background-200 p-5 hover:shadow-md transition-all cursor-pointer block"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${engine.color}15` }}>
                              <i className={`${engine.icon} text-sm`} style={{ color: engine.color }} />
                            </div>
                            <h3 className="text-sm font-bold text-foreground-950 font-heading truncate max-w-[140px]">{engine.name}</h3>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${statusBadge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                            {statusLabel}
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          <div>
                            <div className="flex justify-between text-xs mb-1"><span className="text-foreground-400">CPU</span><span className="font-bold" style={{ color: cpuColor }}>{engine.cpuUsage}%</span></div>
                            <div className="w-full h-1.5 rounded-full bg-background-100 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${engine.cpuUsage}%`, backgroundColor: cpuColor }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1"><span className="text-foreground-400">Mémoire</span><span className="font-bold" style={{ color: memColor }}>{engine.memoryUsage}%</span></div>
                            <div className="w-full h-1.5 rounded-full bg-background-100 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${engine.memoryUsage}%`, backgroundColor: memColor }} />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-background-100 text-xs">
                          <span className="text-foreground-500">{engine.activeAgents}/{engine.agentsCount} agents</span>
                          <span className="text-foreground-400">
                            {new Date(engine.lastScan).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl bg-foreground-950 p-6 text-white text-center">
                  <p className="text-sm text-gray-400">CPU Global : {health.globalCpuUsage}% · Mémoire : {health.globalMemoryUsage}% · Requêtes 24h : {(health.totalQueries24h / 1000).toFixed(1)}K · Temps réponse : {health.avgResponseTime}ms</p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* === TAB: 48 AGENTS === */}
        {activeTab === 'agents' && (
          <ScrollReveal>
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-1">Registre Unifié — 48 Agents KOS</h2>
                    <p className="text-foreground-600 text-sm">{agentStats.active} activés · {agentStats.partial} partiels · {agentStats.gap} GAPs · {agentStats.total} total</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" />{agentStats.active} Activés</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" />{agentStats.partial} Partiels</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500" />{agentStats.gap} GAPs</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {KOS_UNIFIED_AGENTS.map((agent) => {
                    const badge = agent.status === 'active' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                      agent.status === 'partial' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                      'bg-red-50 border-red-200 text-red-700';
                    const dot = agent.status === 'active' ? 'bg-emerald-500' : agent.status === 'partial' ? 'bg-amber-500' : 'bg-red-500';
                    const label = agent.status === 'active' ? 'Activé' : agent.status === 'partial' ? 'Partiel' : 'GAP';
                    const scoreColor = agent.score >= 8 ? '#86BC25' : agent.score >= 6 ? '#e8c547' : '#c2410c';
                    return (
                      <div
                        key={agent.id}
                        className={`rounded-xl border p-4 transition-all hover:shadow-md ${
                          agent.status === 'active' ? 'border-emerald-100 bg-emerald-50/20' :
                          agent.status === 'partial' ? 'border-amber-100 bg-amber-50/20' :
                          'border-red-100 bg-red-50/20'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${agent.color}15` }}>
                            <i className={`${agent.icon} text-sm`} style={{ color: agent.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-foreground-950 truncate">{agent.name}</h4>
                            <p className="text-[10px] text-foreground-400 truncate">{agent.engineName}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold flex-shrink-0 ${badge}`}>
                            <span className={`w-1 h-1 rounded-full ${dot}`} />
                            {label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-foreground-400 mt-2 pt-2 border-t border-background-100">
                          <span className="flex items-center gap-1">
                            <span className="font-bold text-sm" style={{ color: scoreColor }}>{agent.score.toFixed(1)}</span>
                            /10
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-cpu-line text-[10px]" />
                            {agent.resourceUsage.cpu}%
                          </span>
                          <span className={`flex items-center gap-1 ml-auto ${agent.autoDeploy ? 'text-emerald-600' : 'text-foreground-300'}`}>
                            <i className={`${agent.autoDeploy ? 'ri-refresh-fill' : 'ri-refresh-line'} text-[10px]`} />
                            {agent.autoDeploy ? 'Auto' : 'Manuel'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* === TAB: ROADMAP 365J === */}
        {activeTab === 'roadmap' && (
          <ScrollReveal>
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-2">Roadmap 365 Jours — Big Four Grade</h2>
                  <p className="text-foreground-600">3 phases · 47 actions priorisées · Budget 3 300€/mois (version Enterprise)</p>
                </div>

                <div className="space-y-5">
                  {ROADMAP_PHASES.map((phase) => (
                    <div key={phase.id} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                      <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-64 flex-shrink-0 p-6 flex flex-col items-center justify-center text-center" style={{ backgroundColor: `${phase.color}08` }}>
                          <span className="text-5xl font-bold font-heading mb-2" style={{ color: phase.color }}>{phase.timeline}</span>
                          <span className="text-xs text-foreground-500 mb-2">Progression</span>
                          <div className="w-full max-w-[140px] h-2 rounded-full bg-background-200 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${phase.progress}%`, backgroundColor: phase.color }} />
                          </div>
                          <span className="text-xs font-bold mt-1" style={{ color: phase.color }}>{phase.progress}%</span>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${phase.color}15` }}>
                              <i className={`${phase.icon} text-lg`} style={{ color: phase.color }} />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-foreground-950">{phase.title}</h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {phase.items.map((item, j) => (
                              <div key={j} className="flex items-center gap-2 text-sm text-foreground-600">
                                <i className="ri-checkbox-circle-line text-emerald-500 flex-shrink-0" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                  <h3 className="font-heading text-xl font-bold mb-4">Trajectoire de Score</h3>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    {[
                      { label: 'Actuel', value: '47', date: 'Juin 2026' },
                      { label: 'Phase 1', value: '68', date: 'J+90' },
                      { label: 'Phase 2', value: '82', date: 'J+180' },
                      { label: 'Phase 3', value: '95', date: 'J+365' },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <span className="block text-4xl font-bold font-heading text-white">{s.value}</span>
                        <span className="text-xs text-gray-400">{s.label}</span>
                        <span className="block text-[10px] text-gray-500">{s.date}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full max-w-xl mx-auto h-3 rounded-full bg-white/10 overflow-hidden mt-4">
                    <div className="h-full rounded-full" style={{ width: '47%', background: 'linear-gradient(90deg, #C2410C 0%, #E8C547 50%, #86BC25 100%)' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">47/100 → 68 → 82 → 95/100 (Big Four Grade)</p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* === TAB: ACTIONS PRIORITAIRES === */}
        {activeTab === 'actions' && (
          <ScrollReveal>
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-2">Actions Prioritaires</h2>
                  <p className="text-foreground-600">10 actions classées par criticité · Extraites de l'audit combiné</p>
                </div>

                <div className="space-y-3">
                  {PRIORITY_ACTIONS.map((action) => (
                    <div key={action.id} className="rounded-xl bg-white border border-background-200 p-4 hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-4">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          action.priorite.includes('Critique') ? 'bg-red-50' : action.priorite.includes('Élevé') ? 'bg-amber-50' : 'bg-slate-50'
                        }`}>
                          <i className={`${
                            action.priorite.includes('Critique') ? 'ri-error-warning-line text-red-600' :
                            action.priorite.includes('Élevé') ? 'ri-alert-line text-amber-600' :
                            'ri-information-line text-slate-500'
                          } text-lg`} />
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          action.priorite.includes('Critique') ? 'bg-red-50 border border-red-200 text-red-700' :
                          action.priorite.includes('Élevé') ? 'bg-amber-50 border border-amber-200 text-amber-700' :
                          'bg-slate-50 border border-slate-200 text-slate-600'
                        }`}>
                          {action.priorite}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground-800 mb-1">{action.label}</p>
                        <div className="flex items-center gap-3 text-xs text-foreground-400">
                          <span><i className="ri-time-line mr-1" />Délai : {action.delai}</span>
                          <span><i className="ri-timer-line mr-1" />Effort : {action.effort}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-4">
                    <i className="ri-flashlight-line text-emerald-400 text-sm" />
                    <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Recommandation Unanime du Comité</span>
                  </div>
                  <p className="text-gray-300 max-w-2xl mx-auto text-sm">
                    Lancement immédiat de la Phase 1 (J0-J90). Activation du RAG, déploiement de l'agent conversationnel, mise en route de la veille réglementaire. Ces trois actions transforment KHEPRA d'un cabinet traditionnel en un cabinet augmenté. Tout le reste en découle.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* === TAB: GAPS & CORRECTIFS === */}
        {activeTab === 'gaps' && (
          <ScrollReveal>
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-2">GAPs & Correctifs — File de Déploiement</h2>
                  <p className="text-foreground-600">
                    {gapStats.total} actions en attente · {gapStats.critical} critiques · {gapStats.major} majeures · {gapStats.autoApplicable} auto-applicables · {gapStats.totalHours}h estimées
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                  {[
                    { label: 'En Attente', value: String(gapStats.total), icon: 'ri-time-line', color: '#E8C547' },
                    { label: 'Critiques', value: String(gapStats.critical), icon: 'ri-error-warning-line', color: '#C2410C' },
                    { label: 'Majeures', value: String(gapStats.major), icon: 'ri-alert-line', color: '#E8943A' },
                    { label: 'Auto-Applicables', value: String(gapStats.autoApplicable), icon: 'ri-flashlight-line', color: '#86BC25' },
                    { label: 'Charge Estimée', value: `${gapStats.totalHours}h`, icon: 'ri-timer-line', color: '#6B4A3A' },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                        <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                      </div>
                      <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                      <span className="text-[10px] text-foreground-400">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Overview Bar */}
                <div className="rounded-2xl bg-foreground-950 p-5 mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <i className="ri-bug-line text-red-400 text-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-white">Progression du Déploiement</span>
                        <span className="text-sm font-bold text-red-400">0/{gapStats.total} exécutées</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-red-500/60" style={{ width: '2%' }} />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1.5">
                        Aucune action encore appliquée — les correctifs sont documentés mais en attente d'exécution
                      </p>
                    </div>
                  </div>
                </div>

                {/* Deployment Actions Queue */}
                <div className="space-y-3">
                  {gapActions.map((action, index) => {
                    const priorityBadge = action.priority === 'critical'
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : action.priority === 'major'
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600';
                    const priorityDot = action.priority === 'critical'
                      ? 'bg-red-500'
                      : action.priority === 'major'
                      ? 'bg-amber-500'
                      : 'bg-slate-400';
                    const priorityLabel = action.priority === 'critical' ? 'CRITIQUE' : action.priority === 'major' ? 'MAJEURE' : 'Mineure';
                    const priorityIcon = action.priority === 'critical'
                      ? 'ri-error-warning-line text-red-600'
                      : action.priority === 'major'
                      ? 'ri-alert-line text-amber-600'
                      : 'ri-information-line text-slate-500';
                    const actionBadge = action.action === 'activate'
                      ? { bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: 'ri-play-circle-line', label: 'Activation' }
                      : action.action === 'patch'
                      ? { bg: 'bg-violet-50 border-violet-200 text-violet-700', icon: 'ri-tools-line', label: 'Patch' }
                      : action.action === 'optimize'
                      ? { bg: 'bg-sky-50 border-sky-200 text-sky-700', icon: 'ri-rocket-line', label: 'Optimisation' }
                      : { bg: 'bg-slate-50 border-slate-200 text-slate-600', icon: 'ri-refresh-line', label: 'Mise à jour' };
                    return (
                      <div key={action.id} className="rounded-xl bg-white border border-background-200 p-4 hover:shadow-md transition-all">
                        <div className="flex flex-col lg:flex-row items-start gap-4">
                          {/* Queue Position */}
                          <div className="flex-shrink-0 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-background-100 flex items-center justify-center">
                              <span className="text-sm font-bold text-foreground-500 font-heading">#{index + 1}</span>
                            </div>
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${action.priority === 'critical' ? 'bg-red-50' : action.priority === 'major' ? 'bg-amber-50' : 'bg-slate-50'}`}>
                              <i className={`${priorityIcon} text-base`} />
                            </div>
                            <div className="hidden sm:block">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${priorityBadge}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${priorityDot}`} />
                                {priorityLabel}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="text-sm font-bold text-foreground-800">{action.agentName}</h4>
                              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${actionBadge.bg}`}>
                                <i className={`${actionBadge.icon} text-[10px]`} />
                                {actionBadge.label}
                              </span>
                            </div>
                            <p className="text-xs text-foreground-500 mb-2">{action.description}</p>
                            <div className="flex items-center gap-4 text-[10px] text-foreground-400 flex-wrap">
                              <span className="flex items-center gap-1">
                                <i className="ri-timer-line" />
                                <strong className="text-foreground-600">{action.estimatedTime}</strong>
                              </span>
                              <span className={`flex items-center gap-1 ${action.autoApplicable ? 'text-emerald-600' : 'text-foreground-400'}`}>
                                <i className={action.autoApplicable ? 'ri-flashlight-fill' : 'ri-flashlight-line'} />
                                {action.autoApplicable ? 'Auto-applicable' : 'Intervention manuelle'}
                              </span>
                              <span className="flex items-center gap-1">
                                <i className="ri-fingerprint-line" />
                                <code className="text-[10px] bg-background-100 px-1.5 py-0.5 rounded">{action.agentId}</code>
                              </span>
                            </div>
                          </div>

                          {/* Status & Progress */}
                          <div className="flex-shrink-0 flex flex-col items-end gap-2">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                              action.applied
                                ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                                : 'bg-slate-50 border border-slate-200 text-slate-500'
                            }`}>
                              {action.applied ? (
                                <>
                                  <i className="ri-checkbox-circle-fill text-emerald-500 text-sm" />
                                  Appliqué
                                </>
                              ) : (
                                <>
                                  <i className="ri-time-line text-slate-400 text-sm" />
                                  En attente
                                </>
                              )}
                            </div>
                            <div className="w-24 h-1.5 rounded-full bg-background-100 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: action.applied ? '100%' : '0%',
                                  backgroundColor: action.applied ? '#86BC25' : '#e2e8f0',
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Call to Action */}
                <div className="mt-8 rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 mb-4">
                    <i className="ri-tools-line text-red-400 text-sm" />
                    <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">Recommandation du Comité Big Four</span>
                  </div>
                  <p className="text-gray-300 max-w-2xl mx-auto text-sm">
                    Ces {gapStats.total} actions de déploiement sont le goulot d'étranglement principal du système KOS. Leur exécution débloque <strong className="text-white">{gapStats.critical} agents critiques</strong> et fait passer le score système de <strong className="text-red-400">6.8/10</strong> à <strong className="text-emerald-400">8.5+/10</strong>. Priorité absolue : les {gapStats.critical} actions critiques (ligne 1 à {gapStats.critical}) — exécution immédiate recommandée.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Cross-link Ecosystem */}
        <section className="py-12 sm:py-16 bg-white border-t border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Écosystème KOS — Accès Rapide
              </h2>
              <p className="text-foreground-600">Audit final + les 8 moteurs + documents de référence.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ...KOS_ENGINES,
                { id: 'audit-final', name: 'Audit Final KOS', path: '/audit-final-kos', icon: 'ri-scales-3-line', color: '#C2410C' },
                { id: 'khepra-os-2', name: 'KHEPRA OS 2 Hub', path: '/khepra-os-2', icon: 'ri-cpu-line', color: '#86BC25' },
                { id: 'agent-console', name: 'Agent Console', path: '/agent-console', icon: 'ri-terminal-box-line', color: '#4F46E5' },
                { id: 'agents-experts', name: 'Agents Experts (21)', path: '/agents-experts', icon: 'ri-robot-line', color: '#9B7B2C' },
              ].map((link) => (
                <a
                  key={link.id}
                  href={link.path}
                  className={`rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block ${
                    link.id === 'audit-final' ? 'ring-2 ring-red-400 bg-red-50/30' : ''
                  }`}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                    <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                  </div>
                  <span className="text-sm font-bold text-foreground-800">{link.name}</span>
                  {link.id === 'audit-final' && (
                    <span className="block text-[10px] text-red-600 font-bold mt-1">← Vous êtes ici</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}



