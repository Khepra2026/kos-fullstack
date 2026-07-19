import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { Navigation } from '@/pages/home/components/Navigation';
import { SeoHead } from '@/components/feature/SeoHead';
import TicketBoard from '@/components/feature/TicketBoard';
import { useAutoCorrectionTickets } from '@/hooks/useAutoCorrectionTickets';

interface CriticalGap {
  id: string;
  title: string;
  category: 'critical' | 'major' | 'optimization';
  impact: string;
  businessLoss: string;
  rootCause: string;
  responsibleAgent: string;
  icon: string;
  color: string;
}

interface CorrectiveAction {
  id: string;
  number: string;
  objective: string;
  targetedProblem: string;
  concreteSolution: string;
  responsibleAgent: string;
  systemInvolved: string;
  executionProcess: string[];
  expectedKpi: string;
  deadline: string;
  priority: 'critical' | 'major' | 'optimization';
  icon: string;
  color: string;
}

interface RoadmapMilestone {
  phase: string;
  timeframe: string;
  actions: { description: string; status: 'done' | 'in_progress' | 'pending'; agent: string }[];
  color: string;
}

interface KPIMetric {
  label: string;
  current: string;
  target: string;
  unit: string;
  icon: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

const CRITICAL_GAPS: CriticalGap[] = [
  {
    id: 'gap-agents',
    title: '9 Agents GAP — Couverture Opérationnelle 29%',
    category: 'critical',
    impact: 'Marketing, Communication, LLMO et COO inexistants. 37,5% des agents demandés absents.',
    businessLoss: 'Perte de visibilité sur 1,5B+ utilisateurs IA. Pipeline non optimisé. Image de marque fragmentée.',
    rootCause: 'Construction bottom-up priorisant les cœurs réglementaires. Couches marketing/comm/IA générative jamais priorisées.',
    responsibleAgent: 'CEO Copilot (AGENT 15)',
    icon: 'ri-user-unfollow-line',
    color: '#c2410c',
  },
  {
    id: 'gap-geo',
    title: 'GEO Pillar à 35% — Invisibilité Moteurs IA',
    category: 'critical',
    impact: 'Pages GEO-optimisées : 20/100. Citations IA détectées : 5/50. Moteurs IA couverts : 1/5.',
    businessLoss: 'KHEPRA invisible sur ChatGPT (300M+ users), Perplexity (100M+ req/mois), Claude, Gemini, Copilot.',
    rootCause: 'Le SEO a été priorisé. Le GEO est un concept émergent non intégré. Les 5 agents LLMO n\'existent pas.',
    responsibleAgent: 'AGENT 9 — Content AI',
    icon: 'ri-brain-line',
    color: '#9B2C4A',
  },
  {
    id: 'gap-rag',
    title: 'RAG Réglementaire Inactif — Embeddings Non Générés',
    category: 'critical',
    impact: '52 documents enrichis stockés mais recherche sémantique inopérante. Cœur différenciant IA vide.',
    businessLoss: 'Le cœur IA du KOS est 100% autonome via le moteur Automaton Engine. Aucune dépendance externe.',
    rootCause: 'Infrastructure déployée (pgvector, edge functions) mais clé API manquante dans les secrets Supabase.',
    responsibleAgent: 'AGENT 18 — Knowledge Graph AI',
    icon: 'ri-database-2-line',
    color: '#0D7B5F',
  },
  {
    id: 'gap-social',
    title: 'Social Media Pillar à 25% — Présence Anémique',
    category: 'critical',
    impact: 'LinkedIn : 8 posts/mois vs cible 30. Abonnés : 5 200 vs 15 000. YouTube : 0. X : 0.',
    businessLoss: 'Canal n°1 B2B Afrique francophone sous-exploité. Prospects DG/DAF/Risk Managers non atteints.',
    rootCause: 'Absence de Social Media Director dédié. Pas de calendrier éditorial social. Pas d\'automatisation.',
    responsibleAgent: 'Aucun — Agent manquant',
    icon: 'ri-share-line',
    color: '#A0456A',
  },
  {
    id: 'gap-quality',
    title: 'Quality Controller Manuel — 0% Automatisé',
    category: 'critical',
    impact: 'Matrice 5 axes documentée dans un .md mais aucun code ne l\'exécute. Zéro gatekeeper automatisé.',
    businessLoss: 'Tout contenu publié sans validation automatisée. Risque réputationnel. Contraire aux standards Big Four.',
    rootCause: 'Quality Controller conçu comme framework théorique sans implémentation technique. Écart documentation/exécution.',
    responsibleAgent: 'AGENT 20 — Quality Review AI',
    icon: 'ri-shield-check-line',
    color: '#C05A3A',
  },
];

const MAJOR_GAPS: CriticalGap[] = [
  {
    id: 'gap-nurturing',
    title: 'Pipeline Sans Nurturing Automatisé',
    category: 'major',
    impact: '442 MQL et 221 SQL sans séquence email automatisée. Taux closing 35% perfectible.',
    businessLoss: 'Perte estimée 25-40% des propositions non converties faute de relance structurée.',
    rootCause: 'Pipeline conçu comme affichage statique, pas comme système actif. Edge functions existantes non connectées.',
    responsibleAgent: 'AGENT 11 — Business Development AI',
    icon: 'ri-filter-3-line',
    color: '#e8c547',
  },
  {
    id: 'gap-dashboard',
    title: 'Dashboard Exécutif 100% Mock',
    category: 'major',
    impact: 'KPIs (8 420 trafic, 780M CA) sont des données hardcodées. Aucune connexion Supabase.',
    businessLoss: 'Le cockpit de pilotage ne reflète pas la réalité. Décisions basées sur données fictives.',
    rootCause: 'Dashboard conçu avec données statiques sans intégration Supabase. Edge function metrics absente.',
    responsibleAgent: 'AGENT 19 — Data Analytics AI',
    icon: 'ri-bar-chart-line',
    color: '#9B7B2C',
  },
  {
    id: 'gap-marketing-silos',
    title: 'Marketing en Silos — 5 Directeurs Sans Coordination',
    category: 'major',
    impact: 'Content, SEO, GEO, AEO, AI Search sans CMO. 75 articles SEO non reformatés GEO.',
    businessLoss: 'Double emploi SEO/GEO. Rendement sous-optimal. Pas de stratégie marketing unifiée.',
    rootCause: 'AGENT 9 absorbe 5 rôles sans charte standalone ni KPI individuels. Pas de coordination CMO.',
    responsibleAgent: 'AGENT 9 — Content AI',
    icon: 'ri-puzzle-line',
    color: '#7B5C2A',
  },
];

const OPTIMIZATION_GAPS: CriticalGap[] = [
  {
    id: 'gap-lead-magnets',
    title: 'Lead Magnets à 55% — Pipeline de Capture Sous-Dimensionné',
    category: 'optimization',
    impact: '15 diagnostics, 10 lead magnets. Taux de capture 8% vs cible 15%. Pas de nurturing connecté.',
    businessLoss: 'Opportunité de capture sous-exploitée. Leads non nourris après téléchargement.',
    rootCause: 'Lead magnets non connectés à des séquences de nurturing. Pas de template engine automatisé.',
    responsibleAgent: 'AGENT 11 — BD AI',
    icon: 'ri-download-2-line',
    color: '#5B8C2A',
  },
  {
    id: 'gap-editorial',
    title: 'Absence de Plan Éditorial Formalisé',
    category: 'optimization',
    impact: 'Production de contenu manuelle. Pas de calendrier automatisé. Pas de pipeline scalable.',
    businessLoss: 'Impossible de maintenir 3-5 articles/semaine pour dominer SERPs africains.',
    rootCause: 'Content Director sans charte standalone. Production par sprints manuels, pas système autonome.',
    responsibleAgent: 'AGENT 9 — Content AI',
    icon: 'ri-calendar-line',
    color: '#86BC25',
  },
];

const CORRECTIVE_ACTIONS: CorrectiveAction[] = [
  {
    id: 'action-1',
    number: '01',
    objective: 'Combler les 9 GAPs critiques — Création des chartes agents manquants',
    targetedProblem: '37,5% des agents demandés inexistants : COO, Account Executive, CMO, Communication Director, Social Media Director, 5 agents LLMO',
    concreteSolution: 'Rédiger 9 chartes au format standard KOS (600-900 lignes) : COO, Account Exec, CMO, Comms, Social Media, ChatGPT Opt, Claude Opt, Gemini Opt, Perplexity Opt, Copilot Opt',
    responsibleAgent: 'CEO Copilot (AGENT 15) — Supervision. Content AI (AGENT 9) — Domaine LLMO.',
    systemInvolved: 'Template de charte standard KOS, sections : Mission, Domaines, Workflows, KPI, SOP, Intégration.',
    executionProcess: ['Créer charte CMO Agent (Marketing unifié)', 'Créer charte Comms + Social Media (2 chartes)', 'Créer charte COO + Account Exec (2 chartes)', 'Créer 5 chartes LLMO (ChatGPT à Copilot)', 'Mettre à jour Multi-Agent System → v3.0'],
    expectedKpi: 'Couverture agents : 29% → 67% (16/24). 9 nouvelles chartes. Console mise à jour.',
    deadline: 'J+30',
    priority: 'critical',
    icon: 'ri-file-text-line',
    color: '#c2410c',
  },
  {
    id: 'action-2',
    number: '02',
    objective: 'Activation du RAG Réglementaire — Recherche Sémantique Opérationnelle',
    targetedProblem: '52 documents enrichis stockés mais recherche sémantique inopérante. Cœur IA inactif.',
    concreteSolution: 'Activer le KOS Automaton Engine → Exécuter rag-generate-embeddings (action: index_all) → Vérifier rag-semantic-search → Tester RAGSearchBar',
    responsibleAgent: 'Knowledge Graph AI (AGENT 18) + Knowledge AI (AGENT 8).',
    systemInvolved: 'KOS Automaton Engine (TF-IDF + BM25), Supabase, pgvector, edge functions.',
    executionProcess: ['Activer KOS Automaton Engine', 'Exécuter batch indexation TF-IDF (52 docs)', 'Vérifier index BM25', 'Tester recherche sémantique', 'Documenter processus d\'ajout'],
    expectedKpi: '52 documents avec embeddings. Recherche sémantique < 2s. RAG opérationnel 100%.',
    deadline: 'J+3',
    priority: 'critical',
    icon: 'ri-rocket-line',
    color: '#0D7B5F',
  },
  {
    id: 'action-3',
    number: '03',
    objective: 'Dashboard Données Réelles — Connexion Supabase',
    targetedProblem: 'KPIs mockés (8 420 trafic, 780M CFA). Cockpit de pilotage déconnecté de la réalité.',
    concreteSolution: 'Créer edge function kos-dashboard-metrics → Agréger leads/proposals/contrats depuis Supabase → Afficher données réelles avec fallback mock.',
    responsibleAgent: 'Data Analytics AI (AGENT 19).',
    systemInvolved: 'Supabase, edge functions, tables leads, proposals, dashboard_metrics.',
    executionProcess: ['Créer edge function kos-dashboard-metrics', 'Agréger leads, MQL, SQL, proposals', 'Connecter au dashboard existant', 'Ajouter indicateur fraîcheur données', 'Mode fallback mock si déconnecté'],
    expectedKpi: 'Dashboard 100% données réelles. Mise à jour quotidienne. Indicateur fraîcheur visible.',
    deadline: 'J+15',
    priority: 'major',
    icon: 'ri-dashboard-line',
    color: '#9B7B2C',
  },
  {
    id: 'action-4',
    number: '04',
    objective: 'Automatisation du Pipeline de Nurturing — Séquences Email MQL/SQL',
    targetedProblem: '442 MQL et 221 SQL sans séquence email automatisée. Perte 25-40% des propositions.',
    concreteSolution: 'Créer edge function kos-nurturing-engine → Classer leads par score → Déclencher séquence email (5 messages) → Connecter aux edge functions existantes.',
    responsibleAgent: 'Business Development AI (AGENT 11) + Lead Generation Director.',
    systemInvolved: 'Supabase, edge functions (process-lead-submission, email-funnel-sequence, send-scheduled-emails).',
    executionProcess: ['Créer kos-nurturing-engine', '3 templates email (MQL éducatif, SQL cas clients, Proposition)', 'Connecter lead scoring existant', 'Automatiser déclenchement', 'Tracker taux conversion'],
    expectedKpi: 'MQL → SQL +15%. SQL → Proposition +20%. Taux closing global +10%.',
    deadline: 'J+30',
    priority: 'major',
    icon: 'ri-mail-send-line',
    color: '#7B5C2A',
  },
  {
    id: 'action-5',
    number: '05',
    objective: 'Quality Scoring Engine — Automatisation du Gatekeeper Qualité',
    targetedProblem: 'Quality Controller documenté mais 0% automatisé. Contenu publié sans validation système.',
    concreteSolution: 'Créer edge function kos-quality-scorer → Implémenter matrice 5 axes → Score automatique → Bloquer si < 9,5/10 → Dashboard suivi.',
    responsibleAgent: 'Quality Review AI (AGENT 20).',
    systemInvolved: 'Supabase edge function, table quality_scores, RAG réglementaire (pour contrôles réglementaires).',
    executionProcess: ['MVP : contrôles rédactionnel + marketing (J+30)', 'Ajouter contrôle crédibilité (J+60)', 'Ajouter contrôles réglementaire et institutionnel via RAG (J+90)', 'Dashboard suivi scores intégré'],
    expectedKpi: '100% contenus scorés avant publication. Score moyen > 9,3/10. 0 contenu publié sous 9,5.',
    deadline: 'J+90',
    priority: 'major',
    icon: 'ri-shield-check-line',
    color: '#86BC25',
  },
  {
    id: 'action-6',
    number: '06',
    objective: 'Calendrier Éditorial Automatisé — 36 Articles SEO/GEO Planifiés',
    targetedProblem: 'Production de contenu manuelle. Pas de pipeline scalable. Pas de stratégie de cluster.',
    concreteSolution: 'Créer editorialCalendar.ts avec 12 semaines × 3 articles. Chaque article associé à cluster sémantique, mots-clés, pilier, format GEO.',
    responsibleAgent: 'Content Director (AGENT 9) — Charte à créer.',
    systemInvolved: 'Fichier TypeScript, composant EditorialCalendar, génération briefs automatisée.',
    executionProcess: ['Audit 75 articles existants', 'Classer par cluster sémantique', 'Créer calendrier 12 semaines', 'Associer mots-clés et formats GEO', 'Composant dashboard admin'],
    expectedKpi: '36 articles planifiés. Pipeline éditorial visible. 3-5 articles/semaine soutenables.',
    deadline: 'J+7',
    priority: 'major',
    icon: 'ri-calendar-todo-line',
    color: '#4A7A1E',
  },
  {
    id: 'action-7',
    number: '07',
    objective: 'Activation Réseaux Sociaux — Pipeline Contenu 4 Plateformes',
    targetedProblem: 'LinkedIn 8 posts/mois (cible 30). Facebook seul autre canal. YouTube et X inexistants.',
    concreteSolution: 'Créer socialMediaCalendar.ts → 30 posts LinkedIn/mois + 20 Facebook + 15 X + 4 vidéos YouTube → Templates → Tableau de bord suivi.',
    responsibleAgent: 'Social Media Director — Agent à créer.',
    systemInvolved: 'Fichier TypeScript, composant SocialMediaScheduler, intégration APIs futures.',
    executionProcess: ['Créer calendrier 4 semaines social', '30 templates LinkedIn (articles, carrousels, études)', 'Templates Facebook, X, YouTube', 'Composant scheduler admin', 'Métriques dashboard KOS'],
    expectedKpi: '30 posts LinkedIn/mois. 4 plateformes actives. Abonnés cible 15 000. Engagement +200%.',
    deadline: 'J+90',
    priority: 'major',
    icon: 'ri-share-forward-line',
    color: '#A0456A',
  },
  {
    id: 'action-8',
    number: '08',
    objective: 'Offre Commerciale Structurée — Productisation & Pricing',
    targetedProblem: 'Manque de productisation. Absence de funnel structuré. Pas de pricing différencié.',
    concreteSolution: 'Définir 3-5 offres packagées → Logique de valeur claire → Parcours client complet → Landing pages optimisées → A/B testing.',
    responsibleAgent: 'Proposal Manager (AGENT 12) + Business Dev (AGENT 11).',
    systemInvolved: 'Pages services existantes, composant ServiceDetailContact, landing pages, tunnel conversion.',
    executionProcess: ['Audit offres existantes (20+ services)', 'Regrouper en 3-5 offres packagées', 'Créer landing pages dédiées', 'Définir parcours client', 'A/B testing conversion'],
    expectedKpi: '3-5 offres claires. Taux conversion landing pages +25%. Panier moyen +15%.',
    deadline: 'J+60',
    priority: 'major',
    icon: 'ri-briefcase-line',
    color: '#2D7A3A',
  },
];

const ROADMAP: RoadmapMilestone[] = [
  {
    phase: 'Quick Wins',
    timeframe: '0–7 jours',
    color: '#c2410c',
    actions: [
      { description: 'Charte Content Director + sous-chartes SEO/GEO/AEO/AI Search', status: 'pending', agent: 'Content AI' },
      { description: 'Charte CMO Agent — Direction Marketing unifiée', status: 'pending', agent: 'CEO Copilot' },
      { description: 'Activation RAG (KOS Automaton Engine + batch indexation)', status: 'pending', agent: 'Knowledge Graph AI' },
      { description: 'Charte Communication Director', status: 'pending', agent: 'CEO Copilot' },
      { description: 'Charte Social Media Director', status: 'pending', agent: 'CEO Copilot' },
      { description: 'Calendrier éditorial 12 semaines (36 articles)', status: 'pending', agent: 'Content Director' },
      { description: 'Calendrier réseaux sociaux 4 semaines', status: 'pending', agent: 'Social Media Director' },
      { description: 'Mise à jour KOS Dashboard — Quality Scoring MVP', status: 'pending', agent: 'Data Analytics AI' },
    ],
  },
  {
    phase: 'Build System',
    timeframe: '7–30 jours',
    color: '#e8c547',
    actions: [
      { description: '5 chartes agents LLMO (ChatGPT → Copilot)', status: 'pending', agent: 'CEO Copilot' },
      { description: 'Edge function kos-dashboard-metrics', status: 'pending', agent: 'Data Analytics AI' },
      { description: '10 pages piliers GEO-optimisées', status: 'pending', agent: 'GEO Director' },
      { description: '10 nouveaux lead magnets haute conversion', status: 'pending', agent: 'Lead Gen Director' },
      { description: 'Edge function kos-nurturing-engine', status: 'pending', agent: 'BD AI' },
      { description: '3 templates email nurturing (5 messages)', status: 'pending', agent: 'BD AI' },
      { description: 'Quality Scoring Engine MVP (rédactionnel + marketing)', status: 'pending', agent: 'Quality Review AI' },
    ],
  },
  {
    phase: 'Scale System',
    timeframe: '30–90 jours',
    color: '#86BC25',
    actions: [
      { description: '36 articles SEO supplémentaires (total 111)', status: 'pending', agent: 'SEO Director' },
      { description: '50 FAQ GEO-optimisées Schema.org', status: 'pending', agent: 'AEO Director' },
      { description: 'Production Think Tank : 7 publications', status: 'pending', agent: 'Research Director' },
      { description: 'Quality Scoring complet (5 axes via RAG)', status: 'pending', agent: 'Quality Review AI' },
      { description: 'A/B Testing 5 landing pages', status: 'pending', agent: 'CMO Agent' },
      { description: 'Automatisation publication réseaux sociaux', status: 'pending', agent: 'Social Media Director' },
      { description: 'Charte Economic Intelligence Director', status: 'pending', agent: 'CEO Copilot' },
      { description: 'Multi-Agent System v3.0 (30 agents, 6 couches)', status: 'pending', agent: 'Master Orchestrator' },
    ],
  },
];

const KPI_METRICS: KPIMetric[] = [
  { label: 'Trafic organique (30j)', current: '8,420', target: '25,000', unit: 'visiteurs', icon: 'ri-global-line', color: '#86BC25', trend: 'up' },
  { label: 'Impressions SEO', current: '124,500', target: '500,000', unit: 'impressions', icon: 'ri-eye-line', color: '#0D7B5F', trend: 'up' },
  { label: 'Taux CTR moyen', current: '3.7%', target: '8%', unit: '%', icon: 'ri-cursor-line', color: '#9B7B2C', trend: 'up' },
  { label: 'Leads capturés (30j)', current: '1,263', target: '5,000', unit: 'leads', icon: 'ri-user-add-line', color: '#5B8C2A', trend: 'up' },
  { label: 'MQL', current: '442', target: '1,500', unit: 'MQL', icon: 'ri-filter-line', color: '#7B5C2A', trend: 'up' },
  { label: 'SQL', current: '221', target: '750', unit: 'SQL', icon: 'ri-star-line', color: '#C05A3A', trend: 'up' },
  { label: 'Propositions', current: '42', target: '120', unit: 'proposals', icon: 'ri-draft-line', color: '#6B4A3A', trend: 'up' },
  { label: 'Contrats signés', current: '31', target: '90', unit: 'contrats', icon: 'ri-hand-heart-line', color: '#2D7A3A', trend: 'up' },
  { label: 'Taux conversion global', current: '0.37%', target: '1.5%', unit: '%', icon: 'ri-line-chart-line', color: '#8B3040', trend: 'up' },
  { label: 'Coût acquisition', current: '0', target: '0', unit: 'FCFA', icon: 'ri-money-dollar-circle-line', color: '#1A1A2E', trend: 'stable' },
];

const BUSINESS_PRIORITY = [
  { rank: 1, label: 'Génération de Leads', description: 'Lead magnets, SEO, GEO, social media — flux continu de prospects qualifiés', icon: 'ri-user-search-line', color: '#c2410c', progress: 45 },
  { rank: 2, label: 'Conversion Commerciale', description: 'Nurturing, landing pages, scripts, closing — maximiser le taux de transformation', icon: 'ri-hand-heart-line', color: '#e8c547', progress: 35 },
  { rank: 3, label: 'Structuration des Offres', description: 'Productisation, pricing, parcours client — 3-5 offres packagées différenciées', icon: 'ri-briefcase-line', color: '#9B7B2C', progress: 50 },
  { rank: 4, label: 'Autorité de Marque', description: 'Think Tank, publications, études — positionner KHEPRA comme référence africaine', icon: 'ri-award-line', color: '#86BC25', progress: 65 },
  { rank: 5, label: 'Automatisation', description: 'Dashboards, edge functions, agents — orchestrer la croissance sans intervention humaine', icon: 'ri-robot-line', color: '#0D7B5F', progress: 20 },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'CRITIQUE', dot: 'bg-red-500' };
    case 'major': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'MAJEUR', dot: 'bg-amber-500' };
    case 'optimization': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'OPTIMISATION', dot: 'bg-emerald-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

export default function correctiveExecutionEnginePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<'gaps' | 'actions' | 'roadmap' | 'kpi' | 'tickets'>('gaps');
  const [expandedAction, setExpandedAction] = useState<string | null>('action-1');
  const { tickets, stats: ticketStats, loading: ticketsLoading, syncing, error: ticketsError, refresh, syncTicketsFromCrawl, updateTicketStatus, crossResolutionAlerts, crossResolving, acknowledgeCrossAlert } = useAutoCorrectionTickets('corrective_execution');

  return (
    <hubLayout hubId={40}>
      <SeoHead
        title="KOS Corrective Execution Engine™ — Exécution Autonome | KHEPRA EXPERTS"
        description="Moteur d'exécution autonome KHEPRA OS 2 : audits transformés en actions correctives, roadmap 7/30/90 jours, KPI tracking, priorisation business. 0 FCFA publicité. 0 agence externe. Standards Big Four."
        keywords="KOS Corrective Execution Engine, actions correctives, roadmap exécution, audit correctif, optimisation SEO GEO, lead generation, conversion commerciale, KPI dashboard, KHEPRA EXPERTS"
        canonicalPath="/kos-corrective-execution-engine"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />
      <Navigation />

      <main id="main-content">
        {/* Hero */}
        <section className="relative bg-background-100 border-b border-background-200/70">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20sophisticated%20dark%20charcoal%20orchestration%20hub%20background%20with%20sharp%20geometric%20execution%20lines%20converging%20into%20a%20central%20command%20node%2C%20glowing%20amber%20and%20emerald%20accent%20paths%20radiating%20outward%20representing%20corrective%20actions%2C%20premium%20corporate%20technology%20atmosphere%20with%20structured%20data%20flow%20visualization%2C%20no%20text%20no%20human%20figures%2C%20clean%20minimal%20aesthetic%20with%20algorithmic%20precision%20feel&width=1920&height=600&seq=kos-execution-hero-bg&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-20"
              width="1920"
              height="600"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm mb-6">
                <i className="ri-tools-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  KOS Corrective Execution Engine™
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Des Audits aux
                <span className="block text-amber-400 mt-2">Actions Correctives Exécutables</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                Transformation des écarts en feuille de route. Priorisation business. Exécution 7/30/90 jours.{' '}
                <strong className="text-white">0 FCFA de publicité. 0 agence externe. 100% organique.</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm text-red-300 font-semibold">5 Gaps Critiques</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-amber-300 font-semibold">8 Actions Majeures</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-emerald-300 font-semibold">Score Cible 9,5/10</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {[
                { id: 'gaps', label: 'Écarts & Diagnostic', icon: 'ri-error-warning-line', count: '5+3+2' },
                { id: 'actions', label: 'Actions Correctives', icon: 'ri-tools-line', count: '8' },
                { id: 'roadmap', label: 'Roadmap 7/30/90J', icon: 'ri-road-map-line', count: '3' },
                { id: 'kpi', label: 'KPIs & Suivi', icon: 'ri-bar-chart-line', count: '10' },
                { id: 'tickets', label: 'Tickets', icon: 'ri-ticket-line', count: String(ticketStats.total) },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-white'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Area */}
        {activeTab === 'gaps' && (
          <>
            {/* Phase 1 — Priorisation des Écarts */}
            <section className="py-12 sm:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-4">
                    <i className="ri-error-warning-fill text-red-600 text-sm" />
                    <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">PHASE 1 — Priorisation des Écarts</span>
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                    Gaps Critiques — Impact Business Direct
                  </h2>
                  <p className="text-foreground-600 max-w-2xl mx-auto">
                    Classification McKinsey : 🔴 Critique (bloque croissance) • 🟠 Majeur (impact fort) • 🟡 Optimisation (amélioration).
                  </p>
                </div>

                {/* Critical Gaps */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <h3 className="font-heading text-xl font-bold text-red-700 uppercase tracking-wider">Critiques — 5 Écarts Bloquants</h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {CRITICAL_GAPS.map((gap) => {
                      const badge = getStatusBadge(gap.category);
                      return (
                        <div key={gap.id} className="rounded-2xl border border-red-200 bg-red-50/30 p-6">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${gap.color}15` }}>
                              <i className={`${gap.icon} text-lg`} style={{ color: gap.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg} ${badge.border} ${badge.text}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                                  {badge.label}
                                </span>
                              </div>
                              <h4 className="text-base font-bold text-foreground-950">{gap.title}</h4>
                            </div>
                          </div>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <i className="ri-focus-3-line text-red-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-foreground-800">Impact : </span>
                                <span className="text-foreground-600">{gap.impact}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <i className="ri-money-dollar-circle-line text-red-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-foreground-800">Perte Business : </span>
                                <span className="text-foreground-600">{gap.businessLoss}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <i className="ri-search-line text-amber-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-foreground-800">Cause Racine : </span>
                                <span className="text-foreground-600">{gap.rootCause}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-red-100">
                              <i className="ri-user-line text-foreground-400 text-sm" />
                              <span className="text-xs text-foreground-500">{gap.responsibleAgent}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Major Gaps */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <h3 className="font-heading text-xl font-bold text-amber-700 uppercase tracking-wider">Majeurs — 3 Inefficacités Systémiques</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MAJOR_GAPS.map((gap) => (
                      <div key={gap.id} className="rounded-2xl border border-amber-200 bg-amber-50/30 p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${gap.color}15` }}>
                            <i className={`${gap.icon} text-base`} style={{ color: gap.color }} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-foreground-950">{gap.title}</h4>
                          </div>
                        </div>
                        <p className="text-xs text-foreground-600 leading-relaxed mb-3">{gap.impact}</p>
                        <p className="text-xs text-foreground-500 mb-3 leading-relaxed">
                          <span className="font-semibold text-amber-700">Perte : </span>{gap.businessLoss}
                        </p>
                        <div className="flex items-center gap-2 pt-2 border-t border-amber-100">
                          <i className="ri-user-line text-foreground-400 text-xs" />
                          <span className="text-[10px] text-foreground-500">{gap.responsibleAgent}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optimization Gaps */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <h3 className="font-heading text-xl font-bold text-emerald-700 uppercase tracking-wider">Optimisation — 2 Améliorations</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {OPTIMIZATION_GAPS.map((gap) => (
                      <div key={gap.id} className="rounded-2xl border border-emerald-200 bg-emerald-50/20 p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${gap.color}15` }}>
                            <i className={`${gap.icon} text-base`} style={{ color: gap.color }} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-foreground-950">{gap.title}</h4>
                          </div>
                        </div>
                        <p className="text-xs text-foreground-600 leading-relaxed">{gap.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Business Priority Pipeline */}
            <section className="py-12 sm:py-16 bg-white border-y border-background-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                    Priorité Business — Traiter l'Urgence
                  </h2>
                  <p className="text-foreground-600 max-w-2xl mx-auto">
                    Toujours prioriser : génération de leads → conversion → structuration des offres → autorité → automatisation.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {BUSINESS_PRIORITY.map((item) => (
                    <div key={item.rank} className="rounded-2xl border border-background-200 bg-background-50 p-5 relative overflow-hidden">
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-foreground-950 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{item.rank}</span>
                      </div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${item.color}15` }}>
                        <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1">{item.label}</h3>
                      <p className="text-xs text-foreground-500 leading-relaxed mb-3">{item.description}</p>
                      <div className="w-full h-1.5 rounded-full bg-background-200 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${item.progress}%`, backgroundColor: item.color }}
                        />
                      </div>
                      <span className="text-[10px] text-foreground-400 mt-1 block">{item.progress}% opérationnel</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'actions' && (
          /* Phase 2 & 3 — Actions Correctives */
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-tools-fill text-amber-600 text-sm" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">PHASES 2-3 — Actions Correctives Conçues</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  8 Actions Correctives — Priorisées & Exécutables
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Chaque action : Objectif → Solution → Agent → Processus → KPI → Délai.
                </p>
              </div>

              <div className="space-y-4">
                {CORRECTIVE_ACTIONS.map((action) => {
                  const badge = getStatusBadge(action.priority);
                  const isExpanded = expandedAction === action.id;
                  return (
                    <div
                      key={action.id}
                      className={`rounded-2xl border transition-all duration-300 ${
                        isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedAction(isExpanded ? null : action.id)}
                        className="w-full p-5 sm:p-6 text-left flex items-start gap-4 cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${action.color}15` }}>
                          <span className="text-lg font-bold font-heading" style={{ color: action.color }}>{action.number}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-base font-bold text-foreground-950">{action.objective}</h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${badge.bg} ${badge.border} ${badge.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-sm text-foreground-500 line-clamp-2">{action.targetedProblem}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-foreground-400">
                            <span className="flex items-center gap-1">
                              <i className="ri-user-line" />{action.responsibleAgent}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="ri-time-line" />{action.deadline}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 pt-2">
                          <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-xl`} />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-6 border-t border-background-200 pt-5">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="space-y-4">
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-1">Solution Concrète</h5>
                                <p className="text-sm text-foreground-700 leading-relaxed">{action.concreteSolution}</p>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-1">Processus d'Exécution</h5>
                                <ul className="space-y-1.5">
                                  {action.executionProcess.map((step, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-foreground-600">
                                      <span className="w-5 h-5 rounded-full bg-foreground-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-[10px] font-bold">{i + 1}</span>
                                      </span>
                                      {step}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-1">Système Impliqué</h5>
                                <p className="text-sm text-foreground-700 leading-relaxed">{action.systemInvolved}</p>
                              </div>
                              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                                <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">KPI Attendu</h5>
                                <p className="text-sm text-emerald-800 font-semibold leading-relaxed">{action.expectedKpi}</p>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                <span className="flex items-center gap-1 text-foreground-500">
                                  <i className="ri-time-line text-amber-500" />
                                  <span className="font-bold text-foreground-700">Délai : {action.deadline}</span>
                                </span>
                                <span className="flex items-center gap-1 text-foreground-500">
                                  <i className="ri-user-line text-foreground-400" />
                                  <span className="text-foreground-600">{action.responsibleAgent}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'roadmap' && (
          /* Phase 4 — Roadmap d'Exécution */
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-road-map-fill text-emerald-600 text-sm" />
                  <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">PHASE 4 — Plan d'Exécution</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Roadmap 7 / 30 / 90 Jours
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Quick Wins → Build System → Scale System. Progression documentée, KPI mesurés, agents activés.
                </p>
              </div>

              {/* Score Progression */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                {[
                  { label: 'Score Actuel', value: '6.8/10', color: '#c2410c', icon: 'ri-emotion-sad-line' },
                  { label: 'Cible J+7', value: '7.5/10', color: '#e8c547', icon: 'ri-emotion-normal-line' },
                  { label: 'Cible J+30', value: '8.5/10', color: '#9B7B2C', icon: 'ri-emotion-happy-line' },
                  { label: 'Cible J+90', value: '9.5/10', color: '#86BC25', icon: 'ri-emotion-laugh-line' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white border border-background-200 p-5 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                      <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                    </div>
                    <span className="block text-3xl font-bold font-heading" style={{ color: item.color }}>{item.value}</span>
                    <span className="text-xs text-foreground-500">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="space-y-8">
                {ROADMAP.map((phase, i) => (
                  <div key={i} className="relative">
                    {i < ROADMAP.length - 1 && (
                      <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-background-200 hidden md:block" />
                    )}
                    <div className="rounded-3xl bg-white border border-background-200 overflow-hidden">
                      <div
                        className="px-6 py-4 flex items-center gap-4"
                        style={{ backgroundColor: `${phase.color}10`, borderBottom: `2px solid ${phase.color}30` }}
                      >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: phase.color }}>
                          <span className="text-white font-bold font-heading text-lg">{i + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-bold text-foreground-950">{phase.phase}</h3>
                          <p className="text-sm font-semibold" style={{ color: phase.color }}>{phase.timeframe}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {phase.actions.map((action, j) => (
                            <div key={j} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-100">
                              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ borderColor: phase.color }}
                              >
                                {action.status === 'done' && <i className="ri-check-line text-xs" style={{ color: phase.color }} />}
                                {action.status === 'in_progress' && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }} />}
                                {action.status === 'pending' && <span className="text-[10px]" style={{ color: phase.color }}>{j + 1}</span>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground-700 leading-relaxed">{action.description}</p>
                                <span className="text-[10px] text-foreground-400 mt-1 block">{action.agent}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coverage Progression */}
              <div className="mt-12 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white">
                <h3 className="font-heading text-xl font-bold mb-6 text-center">Progression Couverture Agents</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Actuel', value: '29%', sub: '7/24 activés', color: '#c2410c' },
                    { label: 'J+7', value: '50%', sub: '12/24 activés', color: '#e8c547' },
                    { label: 'J+30', value: '87.5%', sub: '21/24 activés', color: '#9B7B2C' },
                    { label: 'J+90', value: '100%', sub: '24/24 activés', color: '#86BC25' },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <span className="block text-4xl font-bold font-heading mb-2" style={{ color: item.color }}>{item.value}</span>
                      <span className="block text-sm text-gray-300">{item.label}</span>
                      <span className="block text-xs text-gray-500">{item.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'kpi' && (
          /* KPI System */
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-200 mb-4">
                  <i className="ri-bar-chart-fill text-secondary-600 text-sm" />
                  <span className="text-sm font-semibold text-secondary-900 uppercase tracking-wider">KPI System — Suivi Continu</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  10 KPI — Mesurés et Optimisés
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Trafic organique, leads, conversions, chiffre d'affaires — tableau de bord exécutif temps réel.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                {KPI_METRICS.map((kpi, i) => (
                  <div key={i} className="rounded-2xl bg-white border border-background-200 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                        <i className={`${kpi.icon} text-sm`} style={{ color: kpi.color }} />
                      </div>
                      <span className="text-[10px] text-foreground-400 uppercase tracking-wider">{kpi.label}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground-950 font-heading">{kpi.current}</span>
                      <span className="text-xs text-foreground-400">/ {kpi.target}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex-1 h-1 rounded-full bg-background-200 overflow-hidden">
                        {(() => {
                          const currentNum = parseFloat(kpi.current.replace(/[,%]/g, '').replace('+', ''));
                          const targetNum = parseFloat(kpi.target.replace(/[,%]/g, '').replace('+', ''));
                          const pct = targetNum > 0 ? Math.min((currentNum / targetNum) * 100, 100) : 0;
                          return (
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${pct}%`, backgroundColor: kpi.color }}
                            />
                          );
                        })()}
                      </div>
                      <span className={`text-xs font-bold ${kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-400'}`}>
                        {kpi.trend === 'up' && <i className="ri-arrow-up-line text-xs" />}
                        {kpi.trend === 'down' && <i className="ri-arrow-down-line text-xs" />}
                        {kpi.trend === 'stable' && <i className="ri-arrow-right-line text-xs" />}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Module Commercial — Offres */}
              <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8 mb-8">
                <h3 className="font-heading text-xl font-bold text-foreground-950 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <i className="ri-briefcase-line text-emerald-600 text-lg" />
                  </div>
                  Module Offre Commerciale — 3-5 Offres Packagées
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'BU1 — Conformité Réglementaire', desc: 'Audit pré-inspection BCEAO/COBAC, contrôle interne, agrément, LBC/FT. Diagnostic → Audit → Certification.', price: 'Sur devis', color: '#0D7B5F' },
                    { name: 'BU2 — Prix de Transfert & Fiscalité', desc: 'Documentation BEPS, Master File, défense fiscale, fiscalité internationale. Diagnostic → Documentation → Défense.', price: 'Sur devis', color: '#C05A3A' },
                    { name: 'BU3 — Gouvernance & Risques', desc: 'Cartographie risques COSO, ERM, audit interne, conformité RGPD. Diagnostic → Framework → Mise en œuvre.', price: 'Sur devis', color: '#9B7B2C' },
                  ].map((offer, i) => (
                    <div key={i} className="rounded-2xl border border-background-200 p-5 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${offer.color}15` }}>
                        <span className="text-lg font-bold font-heading" style={{ color: offer.color }}>BU{i + 1}</span>
                      </div>
                      <h4 className="font-heading text-base font-bold text-foreground-950 mb-2">{offer.name}</h4>
                      <p className="text-xs text-foreground-600 leading-relaxed mb-3">{offer.desc}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-background-200">
                        <span className="text-xs font-bold text-foreground-400">{offer.price}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">3 niveaux</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Marketing */}
              <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8">
                <h3 className="font-heading text-xl font-bold text-foreground-950 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <i className="ri-megaphone-line text-amber-600 text-lg" />
                  </div>
                  Module Marketing & Acquisition — SEO/GEO/AEO
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Articles SEO', current: '75', target: '200', icon: 'ri-search-line', color: '#0D7B5F' },
                    { label: 'Pages GEO', current: '20', target: '100', icon: 'ri-brain-line', color: '#8B3A4A' },
                    { label: 'FAQ Structurées', current: '15', target: '50', icon: 'ri-question-answer-line', color: '#9B7B2C' },
                    { label: 'Moteurs IA couverts', current: '1/5', target: '5/5', icon: 'ri-robot-line', color: '#2D7A3A' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl bg-background-50 border border-background-100 p-4 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                        <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                      </div>
                      <span className="block text-3xl font-bold text-foreground-950 font-heading">{item.current}</span>
                      <span className="text-xs text-foreground-400">/ {item.target}</span>
                      <span className="block text-[10px] text-foreground-400 mt-1 uppercase tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'tickets' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-ticket-fill text-amber-600 text-sm" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">TICKETS — Suivi Centralisé</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Tickets de Correction — Corrective Execution
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Système unifié de suivi des corrections. Prendre en charge → Résoudre → Tracer.
                </p>
              </div>
              <TicketBoard
                tickets={tickets}
                stats={ticketStats}
                loading={ticketsLoading}
                syncing={syncing}
                error={ticketsError}
                onStatusChange={updateTicketStatus}
                onSync={syncTicketsFromCrawl}
                showSync={false}
                engineTitle="Corrective Execution Engine"
                crossResolutionAlerts={crossResolutionAlerts}
                crossResolving={crossResolving}
                onAcknowledgeCrossAlert={acknowledgeCrossAlert}
              />
            </div>
          </section>
        )}

        {/* Module Conversion — Toujours visible */}
        <section className="py-12 sm:py-16 bg-foreground-950 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20sophisticated%20dark%20command%20center%20with%20amber%20and%20emerald%20algorithmic%20execution%20patterns%20forming%20a%20dynamic%20conversion%20funnel%20visualization%2C%20glowing%20interconnected%20nodes%20representing%20pipeline%20stages%2C%20premium%20corporate%20technology%20atmosphere%20with%20orchestrated%20data%20flow%20aesthetics%2C%20no%20text%20no%20human%20figures%2C%20minimalist%20dark%20background%20with%20precise%20geometric%20execution%20lines&width=1920&height=400&seq=kos-execution-conversion-bg&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-10"
              width="1920"
              height="400"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/90 to-foreground-950/70" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm mb-4">
                  <i className="ri-flashlight-line text-amber-400 text-sm" />
                  <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">Module Conversion — Optimisation Continue</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                  Maximiser la Conversion Sans Publicité
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Landing pages optimisées, scripts commerciaux standardisés, emails de nurturing automatisés, qualification MQL/SQL. Pipeline 7 étapes — 0 FCFA de budget.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Pipeline 7 étapes', icon: 'ri-filter-3-line' },
                    { label: 'A/B Testing', icon: 'ri-contrast-2-line' },
                    { label: 'Nurturing 5 emails', icon: 'ri-mail-send-line' },
                  ].map((tag) => (
                    <span key={tag.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs">
                      <i className={`${tag.icon} text-amber-400`} />
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/kos-unified-autopilot"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-foreground-950 font-bold text-sm hover:bg-amber-400 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-radar-line" />
                  Growth Orchestrator
                </a>
                <a
                  href="/agent-console"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white font-bold text-sm hover:bg-white/25 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-terminal-box-line" />
                  Agent Console
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

    </hubLayout>
  );
}



