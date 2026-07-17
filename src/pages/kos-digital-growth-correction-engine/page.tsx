import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { Navigation } from '@/pages/home/components/Navigation';
import { SeoHead } from '@/components/feature/SeoHead';
import TicketBoard from '@/components/feature/TicketBoard';
import { useAutoCorrectionTickets } from '@/hooks/useAutoCorrectionTickets';

interface DigitalGap {
  id: string;
  title: string;
  category: 'critical' | 'major' | 'optimization';
  description: string;
  businessImpact: string;
  rootCause: string;
  responsibleAgent: string;
  icon: string;
  color: string;
}

interface RootCauseCard {
  id: string;
  title: string;
  cause: string;
  funnelBreak: string;
  dependencies: string[];
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  icon: string;
  color: string;
}

interface StrategicPillar {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  components: { label: string; description: string; status: 'implemented' | 'partial' | 'missing'; icon: string }[];
}

interface CorrectiveAction {
  id: string;
  number: string;
  objective: string;
  targetedProblem: string;
  concreteSolution: string;
  responsibleAgent: string;
  channel: 'SEO' | 'LinkedIn' | 'Blog' | 'IA' | 'Email' | 'Social';
  contentFormat: string;
  expectedKpi: string;
  priority: 'P0' | 'P1' | 'P2';
  timeline: '7' | '30' | '90';
  icon: string;
  color: string;
}

interface GrowthKPI {
  label: string;
  current: string;
  target: string;
  unit: string;
  icon: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
  category: string;
}

interface ChannelModule {
  id: string;
  name: string;
  icon: string;
  color: string;
  currentScore: number;
  targetScore: number;
  items: { label: string; score: number; maxScore: number; recommendations: string[] }[];
}

const CRITICAL_GAPS: DigitalGap[] = [
  {
    id: 'gap-funnel',
    title: 'Absence de Funnel de Conversion Structuré',
    category: 'critical',
    description: 'Trafic organique existant (8 420 visiteurs/mois) sans funnel de conversion documenté. Pas de parcours défini : contenu → lead magnet → diagnostic → CRM → closing. Taux de capture estimé à 8% vs cible McKinsey 15%.',
    businessImpact: 'Perte de 590 leads qualifiés par mois. Pipeline commercial sous-alimenté. ROI contenu négatif. 8 420 visiteurs gaspillés.',
    rootCause: 'Pas de Content Operating System. Lead magnets créés mais non intégrés dans un funnel. CRM existant mais non connecté au contenu.',
    responsibleAgent: 'AGENT 14 — Growth & Revenue Partner',
    icon: 'ri-filter-3-line',
    color: '#c2410c',
  },
  {
    id: 'gap-positioning',
    title: 'Positionnement Flou — Pas de Narrative Core Unifié',
    category: 'critical',
    description: 'Message central non défini. KHEPRA oscille entre « cabinet réglementaire » et « conseil stratégique ». Pas de One Big Idea qui différencie sur le marché africain.',
    businessImpact: 'Confusion chez le prospect. Cycle de vente allongé. Prix tirés vers le bas. Impossibilité de justifier des honoraires premium.',
    rootCause: 'Pas de Narrative Core formalisé. Offre commerciale packagée mais message non ancré dans une thèse stratégique.',
    responsibleAgent: 'AGENT 2 — Comms & Influence AI',
    icon: 'ri-crosshair-line',
    color: '#9B2C4A',
  },
  {
    id: 'gap-seo-geo',
    title: 'Stratégie SEO/GEO/AEO Non Déployée',
    category: 'critical',
    description: '75 articles SEO existants mais 0 contenu optimisé GEO/AEO. Pas de clusters thématiques. Pas de pages piliers. Invisible sur ChatGPT, Perplexity, Claude, Gemini (300M+ utilisateurs IA).',
    businessImpact: 'Invisibilité sur 300M+ utilisateurs IA générative. Perte de 40% du trafic potentiel. Non-indexation sur les moteurs de réponse IA.',
    rootCause: 'Stratégie SEO uniquement focalisée Google. GEO/AEO jamais considéré. Pas de veille IA search.',
    responsibleAgent: 'AGENT 3 — Social Media & Community AI',
    icon: 'ri-search-line',
    color: '#C05A3A',
  },
  {
    id: 'gap-conversion',
    title: 'Conversion Leads Faible — 8% vs Cible 15%',
    category: 'critical',
    description: 'Taux de conversion contenu → lead à 8%. Cible Big Four : 15%. Formulaires mal optimisés. CTA noyés dans le contenu. Pas de scoring MQL/SQL automatisé.',
    businessImpact: 'Pipeline sous-alimenté. 590 leads/mois perdus. Coût d\'acquisition implicite élevé. Croissance freinée.',
    rootCause: 'Formulaires trop longs. CTA non contextuels. Pas de lead scoring. Pas de nurturing automatisé.',
    responsibleAgent: 'AGENT 14 — Growth & Revenue Partner',
    icon: 'ri-download-2-line',
    color: '#8B3040',
  },
];

const MAJOR_GAPS: DigitalGap[] = [
  {
    id: 'gap-editorial',
    title: 'Incohérence Éditoriale — Pas de Charte Unique',
    category: 'major',
    description: 'Chaque contenu a son propre ton, sa propre structure. Pas de charte éditoriale KHEPRA formelle. Expérience de lecture inconsistante.',
    businessImpact: 'Qualité variable. Marque diluée. Impossible de scaler la production de contenu.',
    rootCause: 'Pas de Content Operating System. Pas de template éditorial. Agents non coordonnés.',
    responsibleAgent: 'AGENT 2 — Comms & Influence AI',
    icon: 'ri-file-list-line',
    color: '#e8c547',
  },
  {
    id: 'gap-content-structure',
    title: 'Contenu Non Structuré en Frameworks',
    category: 'major',
    description: '75% des articles sont descriptifs. Pas de frameworks propriétaires systématiques. Pas d\'architecture intellectuelle identifiable.',
    businessImpact: 'Pas de différenciation. Contenu interchangeable. Zéro mémorabilité.',
    rootCause: 'Pas de formation des agents au Template 7 Étapes KHEPRA. Contenu produit sans quality gate.',
    responsibleAgent: 'AGENT 8 — Quality Controller',
    icon: 'ri-layout-masonry-line',
    color: '#9B7B2C',
  },
  {
    id: 'gap-community',
    title: 'Community Management Non Optimisé',
    category: 'major',
    description: 'LinkedIn actif mais non structuré en thought leadership exécutif. X inactif. Pas de stratégie YouTube. Pas de calendrier éditorial social.',
    businessImpact: 'Autorité perçue sous-exploitée. Audience non engagée. Pas de viralité organique.',
    rootCause: 'Pas de Social Media Operating System. Pas de ligne éditoriale par canal. Pas de KPI social.',
    responsibleAgent: 'AGENT 3 — Social Media & Community AI',
    icon: 'ri-share-line',
    color: '#7B5C2A',
  },
];

const OPTIMIZATION_GAPS: DigitalGap[] = [
  {
    id: 'gap-seo-technical',
    title: 'SEO Technique — Core Web Vitals Perfectibles',
    category: 'optimization',
    description: 'LCP perfectible sur pages lourdes. CLS résiduel. Pas de caching CDN agressif.',
    businessImpact: 'Impact SEO Google Page Experience. Taux de rebond +10-15% sur mobile.',
    rootCause: 'Images non optimisées. Bundles React non splittés agressivement.',
    responsibleAgent: 'AGENT 22 — Technology Partner AI',
    icon: 'ri-speed-line',
    color: '#86BC25',
  },
  {
    id: 'gap-storytelling',
    title: 'Storytelling Non Industrialisé',
    category: 'optimization',
    description: 'Success stories existantes mais non formatées en case studies réplicables. Pas de narrative pattern systématique.',
    businessImpact: 'Preuve sociale sous-exploitée. Témoignages non scalables.',
    rootCause: 'Pas de template Case Study KHEPRA standardisé.',
    responsibleAgent: 'AGENT 2 — Comms & Influence AI',
    icon: 'ri-movie-line',
    color: '#5B8C2A',
  },
];

const ROOT_CAUSE_ANALYSES: RootCauseCard[] = [
  {
    id: 'rca-1',
    title: 'Funnel de Conversion — Blocage Systémique',
    cause: 'Absence de Content Operating System connecté au CRM. Les lead magnets existent, les diagnostics existent, le CRM existe — mais ces 3 composants ne sont pas reliés dans un flux automatisé.',
    funnelBreak: 'Le visiteur lit un article → pas de CTA contextuel → pas de capture email → pas de nurturing → pas de lead scoring → CRM vide.',
    dependencies: ['Lead Magnets', 'Diagnostics', 'CRM Supabase', 'Email Sequences', 'Lead Scoring Engine'],
    riskLevel: 'HIGH',
    icon: 'ri-filter-3-line',
    color: '#c2410c',
  },
  {
    id: 'rca-2',
    title: 'Positionnement — « Qui est KHEPRA ? » Non Résolu',
    cause: 'L\'offre commerciale est packagée (3 BUs), mais le Narrative Core — le One Big Idea — n\'est pas défini. Sans Narrative Core, tout le contenu manque de colonne vertébrale.',
    funnelBreak: 'Le prospect arrive sur le site → ne comprend pas en 5 secondes ce que KHEPRA fait de mieux que les autres → rebond.',
    dependencies: ['Offre Commerciale', 'Brand Guide', 'Charte Éditoriale', 'Positionnement Concurrentiel'],
    riskLevel: 'HIGH',
    icon: 'ri-crosshair-line',
    color: '#9B2C4A',
  },
  {
    id: 'rca-3',
    title: 'SEO/GEO/AEO — Invisible sur 300M Utilisateurs IA',
    cause: '75 articles SEO optimisés Google, mais 0 contenu structuré pour les moteurs IA. Pas de FAQ Schema.org. Pas de résumés optimisés pour ChatGPT/Perplexity.',
    funnelBreak: 'Le décideur pose une question à ChatGPT → KHEPRA n\'apparaît pas → le concurrent qui a optimisé GEO apparaît → lead perdu avant même d\'arriver sur le site.',
    dependencies: ['Articles Blog', 'FAQ Schema.org', 'Pages Piliers', 'Entités Sémantiques', 'GEO Content Format'],
    riskLevel: 'HIGH',
    icon: 'ri-brain-line',
    color: '#C05A3A',
  },
  {
    id: 'rca-4',
    title: 'Conversion — Formulaires Non Optimisés',
    cause: 'Formulaires trop longs (5+ champs). CTA génériques « Contactez-nous ». Pas de A/B testing. Pas de lead scoring automatisé.',
    funnelBreak: 'Le visiteur clique sur le CTA → formulaire trop long → abandon. Ou : lead capturé → pas de scoring → pas de priorisation → perdu dans le CRM.',
    dependencies: ['Formulaires', 'Lead Scoring', 'CRM', 'Nurturing Sequences', 'A/B Testing'],
    riskLevel: 'HIGH',
    icon: 'ri-cursor-line',
    color: '#8B3040',
  },
  {
    id: 'rca-5',
    title: 'Incohérence Éditoriale — Qualité Variable',
    cause: 'Contenu produit par différents agents sans quality gate centralisé. Pas de template KHEPRA. Pas de charte éditoriale opposable.',
    funnelBreak: 'Le prospect lit 2 articles KHEPRA → ton différent, structure différente, qualité variable → doute sur le professionnalisme → rebond.',
    dependencies: ['Charte Éditoriale', 'Template 7 Étapes', 'Quality Gate', 'Agents KOS'],
    riskLevel: 'MEDIUM',
    icon: 'ri-file-list-line',
    color: '#e8c547',
  },
];

const RECONSTRUCTION_PILLARS: StrategicPillar[] = [
  {
    id: 'narrative',
    name: 'Narrative Core',
    description: 'Message central unique, positionnement différencié, promesse claire — le One Big Idea de KHEPRA.',
    icon: 'ri-crosshair-line',
    color: '#C05A3A',
    components: [
      { label: 'One Big Idea Défini', description: '« KHEPRA est le seul cabinet africain qui combine expertise réglementaire BCEAO/COBAC et standards Big Four en une plateforme intégrée. »', status: 'missing', icon: 'ri-lightbulb-flash-line' },
      { label: 'Positionnement Concurrentiel', description: 'Cartographier les 5 concurrents directs et définir l\'espace blanc que KHEPRA occupe seul.', status: 'missing', icon: 'ri-radar-line' },
      { label: 'Promesse Client Unique', description: '« Nous ne faisons pas que vous dire quoi faire. Nous déployons les agents IA qui le font avec vous. »', status: 'partial', icon: 'ri-hand-heart-line' },
      { label: 'Ton & Voix de Marque', description: 'Définir le ton KHEPRA : autorité intellectuelle + pragmatisme africain + rigueur Big Four.', status: 'partial', icon: 'ri-mic-line' },
      { label: 'Brand Story Documentée', description: 'Rédiger la narrative KHEPRA : pourquoi nous existons, ce que nous croyons, où nous allons.', status: 'missing', icon: 'ri-book-open-line' },
    ],
  },
  {
    id: 'content-os',
    name: 'Content Operating System',
    description: 'Blog → POV → Frameworks. White papers → Research assets. Posts → Distribution stratégique.',
    icon: 'ri-stack-line',
    color: '#0D7B5F',
    components: [
      { label: 'Template 7 Étapes KHEPRA', description: 'Structure obligatoire pour tout contenu : Problème Business → Thèse → Framework → Insights → Implications → Recommandations → CTA.', status: 'partial', icon: 'ri-file-text-line' },
      { label: 'Calendrier Éditorial', description: 'Planification trimestrielle : 12 articles/mois, 4 white papers/an, 20 posts LinkedIn/semaine.', status: 'partial', icon: 'ri-calendar-line' },
      { label: 'Quality Gate Automatisé', description: 'Score minimum 9,5/10 avant publication. Vérification automatique des 6 critères Big Four.', status: 'missing', icon: 'ri-shield-check-line' },
      { label: 'Content Factory Scalable', description: 'Processus : brief agent → draft → quality gate → révision → publication. 3 jours par contenu.', status: 'missing', icon: 'ri-settings-line' },
      { label: 'Asset Library Centralisée', description: 'Tous les contenus versionnés, tagués, liés au CRM pour tracking performance.', status: 'partial', icon: 'ri-folder-line' },
    ],
  },
  {
    id: 'funnel',
    name: 'Funnel System',
    description: 'Contenu → Lead Magnet → Diagnostic → CRM → Closing. Pipeline automatisé de bout en bout.',
    icon: 'ri-filter-3-line',
    color: '#9B7B2C',
    components: [
      { label: 'Top of Funnel — Contenu', description: 'Articles SEO/GEO, posts LinkedIn, white papers. Objectif : attirer 15 000 visiteurs/mois.', status: 'partial', icon: 'ri-article-line' },
      { label: 'Middle of Funnel — Lead Magnets', description: 'Diagnostics gratuits, checklists, templates. Objectif : capture 15% des visiteurs.', status: 'partial', icon: 'ri-download-2-line' },
      { label: 'Bottom of Funnel — CRM', description: 'Lead scoring MQL/SQL, nurturing sequences, pipeline CRM. Objectif : conversion 25% MQL → SQL.', status: 'partial', icon: 'ri-database-2-line' },
      { label: 'Closing — Proposals', description: 'Propositions automatisées, templates, suivi pipeline. Objectif : conversion 40% SQL → Client.', status: 'partial', icon: 'ri-file-chart-line' },
      { label: 'Feedback Loop — Analytics', description: 'Tracking complet : source → lead → MQL → SQL → Client → LTV. Optimisation continue.', status: 'missing', icon: 'ri-line-chart-line' },
    ],
  },
];

const CORRECTIVE_ACTIONS: CorrectiveAction[] = [
  {
    id: 'act-1',
    number: '01',
    objective: 'Définir le Narrative Core KHEPRA — One Big Idea',
    targetedProblem: 'Positionnement flou. Message central non défini. Confusion prospect.',
    concreteSolution: 'Workshop stratégique pour définir le Narrative Core KHEPRA : One Big Idea, positionnement concurrentiel, promesse client unique. Rédiger le Brand Story document. Aligner toute la communication sur ce socle.',
    responsibleAgent: 'AGENT 2 — Comms & Influence AI',
    channel: 'Blog',
    contentFormat: 'Document stratégique interne + Page Pourquoi KHEPRA',
    expectedKpi: 'Clarté positionnement : test 5 secondes > 80%. Taux de rebond homepage -15%.',
    priority: 'P0',
    timeline: '30',
    icon: 'ri-crosshair-line',
    color: '#C05A3A',
  },
  {
    id: 'act-2',
    number: '02',
    objective: 'Construire le Funnel de Conversion Complet',
    targetedProblem: 'Absence de funnel structuré. 8 420 visiteurs/mois non convertis.',
    concreteSolution: 'Mapper le parcours : Article → CTA contextuel → Lead Magnet → Formulaire 3 champs → CRM → Lead Scoring → Nurturing Sequence → Proposition. Connecter tous les composants existants (lead magnets, diagnostics, CRM).',
    responsibleAgent: 'AGENT 14 — Growth & Revenue Partner',
    channel: 'Email',
    contentFormat: 'Funnel documenté + Intégration CRM + Séquences nurturing',
    expectedKpi: 'Taux capture 8% → 15%. Leads/mois 674 → 1 263. MQL → SQL +25%.',
    priority: 'P0',
    timeline: '30',
    icon: 'ri-filter-3-line',
    color: '#c2410c',
  },
  {
    id: 'act-3',
    number: '03',
    objective: 'Déployer Stratégie GEO/AEO — 10 Pages Piliers',
    targetedProblem: 'Invisibilité sur ChatGPT, Perplexity, Claude, Gemini. 300M+ utilisateurs IA.',
    concreteSolution: 'Créer 10 pages piliers GEO-optimisées : format Q&A, FAQ Schema.org, résumés structurés, entités sémantiques marquées. Optimiser les 75 articles existants pour les moteurs IA.',
    responsibleAgent: 'AGENT 3 — Social Media & Community AI',
    channel: 'IA',
    contentFormat: '10 pages piliers GEO + FAQ Schema.org sur 75 articles',
    expectedKpi: 'Apparition sur 5 requêtes IA cibles. Trafic GEO +20%. Indexation moteurs IA.',
    priority: 'P0',
    timeline: '90',
    icon: 'ri-brain-line',
    color: '#6B4A3A',
  },
  {
    id: 'act-4',
    number: '04',
    objective: 'Structurer le Social Media Operating System',
    targetedProblem: 'Community management non optimisé. Pas de ligne éditoriale par canal.',
    concreteSolution: 'Définir ligne éditoriale par canal : LinkedIn (thought leadership exécutif, 20 posts/semaine), X (insights courts, 10 posts/semaine), YouTube (analyses longues, 2 vidéos/mois). Créer calendrier éditorial social.',
    responsibleAgent: 'AGENT 3 — Social Media & Community AI',
    channel: 'Social',
    contentFormat: 'Calendrier éditorial + Templates par canal + KPIs',
    expectedKpi: 'LinkedIn : +50% engagement. X : +500 followers. YouTube : 2 vidéos/mois.',
    priority: 'P1',
    timeline: '30',
    icon: 'ri-share-line',
    color: '#7B5C2A',
  },
  {
    id: 'act-5',
    number: '05',
    objective: 'Optimiser Formulaires & CTA — A/B Testing',
    targetedProblem: 'Formulaires trop longs. CTA génériques. Pas de conversion optimization.',
    concreteSolution: 'Réduire tous les formulaires à 3 champs max (email, nom, entreprise). Remplacer tous les CTA génériques par des CTA contextuels avec bénéfice clair. Mettre en place A/B testing systématique.',
    responsibleAgent: 'AGENT 14 — Growth & Revenue Partner',
    channel: 'Blog',
    contentFormat: 'Formulaires optimisés + CTA contextuels + A/B tests',
    expectedKpi: 'Taux complétion formulaire +40%. Taux clic CTA +30%. Conversion +50%.',
    priority: 'P0',
    timeline: '7',
    icon: 'ri-cursor-line',
    color: '#8B3040',
  },
  {
    id: 'act-6',
    number: '06',
    objective: 'Créer le Lead Scoring Engine MQL/SQL',
    targetedProblem: 'Pas de scoring leads. Pas de priorisation. Leads perdus dans le CRM.',
    concreteSolution: 'Définir critères MQL (lead magnet téléchargé, diagnostic complété, page contact visitée) et SQL (score > 80, engagement > 3 interactions). Automatiser le scoring dans le CRM Supabase.',
    responsibleAgent: 'AGENT 14 — Growth & Revenue Partner',
    channel: 'Email',
    contentFormat: 'Lead Scoring Engine + Intégration CRM + Alertes temps réel',
    expectedKpi: '100% leads scorés. Temps qualification < 24h. Conversion MQL → SQL +25%.',
    priority: 'P1',
    timeline: '30',
    icon: 'ri-bar-chart-line',
    color: '#5B8C2A',
  },
  {
    id: 'act-7',
    number: '07',
    objective: 'Déployer le Content Operating System Complet',
    targetedProblem: 'Incohérence éditoriale. Qualité variable. Production non scalable.',
    concreteSolution: 'Formaliser le Template 7 Étapes KHEPRA. Créer la charte éditoriale opposable. Mettre en place le quality gate automatisé (score ≥ 9,5/10). Calendrier éditorial trimestriel.',
    responsibleAgent: 'AGENT 2 — Comms & Influence AI',
    channel: 'Blog',
    contentFormat: 'Charte éditoriale + Template + Quality Gate + Calendrier',
    expectedKpi: '100% contenus via Template 7 Étapes. Score qualité moyen 9,5/10. Production scalable.',
    priority: 'P1',
    timeline: '30',
    icon: 'ri-stack-line',
    color: '#0D7B5F',
  },
  {
    id: 'act-8',
    number: '08',
    objective: 'Nurturing Sequences — Automatisation Email',
    targetedProblem: 'Leads capturés sans suivi. Pas de nurturing automatisé.',
    concreteSolution: 'Créer 3 séquences nurturing : S1 (lead magnet → diagnostic, 5 emails/14 jours), S2 (diagnostic → proposition, 7 emails/21 jours), S3 (inactif → réengagement, 3 emails/7 jours).',
    responsibleAgent: 'AGENT 14 — Growth & Revenue Partner',
    channel: 'Email',
    contentFormat: '3 séquences email automatisées + Templates + KPIs',
    expectedKpi: 'Taux ouverture > 35%. Taux clic > 8%. Conversion nurturing → proposition +20%.',
    priority: 'P1',
    timeline: '30',
    icon: 'ri-mail-send-line',
    color: '#9B7B2C',
  },
];

const GROWTH_KPIS: GrowthKPI[] = [
  { label: 'Trafic Organique Mensuel', current: '8 420', target: '15 000', unit: 'visiteurs', icon: 'ri-global-line', color: '#0D7B5F', trend: 'up', category: 'SEO' },
  { label: 'Taux de Capture', current: '8%', target: '15%', unit: '%', icon: 'ri-download-2-line', color: '#c2410c', trend: 'up', category: 'Conversion' },
  { label: 'Leads Qualifiés / Mois', current: '674', target: '1 263', unit: 'leads', icon: 'ri-user-star-line', color: '#e8c547', trend: 'up', category: 'Conversion' },
  { label: 'Conversion MQL → SQL', current: '18%', target: '25%', unit: '%', icon: 'ri-bar-chart-line', color: '#9B7B2C', trend: 'up', category: 'Conversion' },
  { label: 'Engagement LinkedIn', current: '3.2%', target: '8%', unit: '%', icon: 'ri-linkedin-box-line', color: '#6B4A3A', trend: 'up', category: 'Social' },
  { label: 'Pages Piliers GEO', current: '0', target: '10', unit: 'pages', icon: 'ri-brain-line', color: '#C05A3A', trend: 'up', category: 'GEO' },
  { label: 'Nurturing Open Rate', current: '22%', target: '35%', unit: '%', icon: 'ri-mail-send-line', color: '#5B8C2A', trend: 'up', category: 'Email' },
  { label: 'CTR CTA Contextuels', current: '1.8%', target: '5%', unit: '%', icon: 'ri-cursor-line', color: '#8B3040', trend: 'up', category: 'Conversion' },
  { label: 'Articles/White Papers / Mois', current: '8', target: '12', unit: 'contenus', icon: 'ri-article-line', color: '#0D7B5F', trend: 'up', category: 'SEO' },
  { label: 'Taux de Rebond Homepage', current: '62%', target: '47%', unit: '%', icon: 'ri-arrow-go-back-line', color: '#7B5C2A', trend: 'down', category: 'SEO' },
];

const CHANNEL_MODULES: ChannelModule[] = [
  {
    id: 'seo-geo', name: 'SEO / GEO / AEO', icon: 'ri-search-line', color: '#0D7B5F', currentScore: 5.5, targetScore: 9.5,
    items: [
      { label: 'Clusters Thématiques', score: 6.0, maxScore: 10, recommendations: ['Créer 5 clusters : Régulation, Prix de Transfert, Gouvernance, ESG, Transformation Digitale', 'Associer chaque article existant à un cluster', 'Créer pages piliers par cluster'] },
      { label: 'Entités Sémantiques', score: 4.0, maxScore: 10, recommendations: ['Identifier 50 entités clés (BCEAO, COBAC, OHADA, BEPS, ISO 27001...)', 'Marquer chaque entité dans les contenus existants', 'Créer glossaire structuré'] },
      { label: 'FAQ Enrichies Schema.org', score: 2.0, maxScore: 10, recommendations: ['Créer 50 FAQ Schema.org couvrant les questions décideurs', 'Structurer en Q&A concises', 'Optimiser pour extraits enrichis Google'] },
      { label: 'Visibilité IA Générative', score: 1.0, maxScore: 10, recommendations: ['Créer 10 pages piliers GEO-optimisées', 'Structurer en format Q&A pour moteurs IA', 'Soumettre à ChatGPT, Perplexity, Claude, Gemini'] },
      { label: 'Backlinks Stratégiques', score: 5.0, maxScore: 10, recommendations: ['Cibler 20 sites autoritaires africains', 'Guest posting réglementaire', 'Partenariats médias financiers'] },
    ],
  },
  {
    id: 'community', name: 'Community Management', icon: 'ri-share-line', color: '#6B4A3A', currentScore: 4.5, targetScore: 9.5,
    items: [
      { label: 'LinkedIn Thought Leadership', score: 5.0, maxScore: 10, recommendations: ['20 posts/semaine format exécutif', 'Carrousels frameworks KHEPRA', 'Vidéos 3 min insights réglementaires'] },
      { label: 'X — Insights Courts', score: 2.0, maxScore: 10, recommendations: ['10 posts/semaine insights', 'Threads analytiques 5-7 tweets', 'Live-tweeting événements réglementaires'] },
      { label: 'YouTube — Analyses Longues', score: 1.0, maxScore: 10, recommendations: ['2 vidéos/mois 15-20 min', 'Format « The KHEPRA Brief »', 'Interviews experts + décryptages'] },
      { label: 'Cohérence Cross-Canal', score: 3.0, maxScore: 10, recommendations: ['Ligne éditoriale unique par canal', 'Calendrier éditorial social unifié', 'KPIs par canal'] },
    ],
  },
  {
    id: 'leadgen', name: 'Lead Generation', icon: 'ri-user-star-line', color: '#C05A3A', currentScore: 6.0, targetScore: 9.5,
    items: [
      { label: 'Diagnostics Interactifs', score: 7.0, maxScore: 10, recommendations: ['20+ diagnostics existants à connecter au funnel', 'Score automatisé → rapport personnalisé', 'Capture email avant affichage score'] },
      { label: 'Landing Pages Optimisées', score: 5.0, maxScore: 10, recommendations: ['3 landing pages premium (1 par BU)', 'Structure : problème → solution → preuve → CTA', 'A/B testing systématique'] },
      { label: 'Lead Magnets Premium', score: 6.0, maxScore: 10, recommendations: ['8 lead magnets existants à optimiser', 'Ajouter version « executive summary » 1 page', 'Version vidéo 3 min par lead magnet'] },
      { label: 'Scoring & Qualification', score: 3.0, maxScore: 10, recommendations: ['Lead scoring engine MQL/SQL', 'Alertes temps réel leads chauds (>80/100)', 'Connexion CRM automatique'] },
    ],
  },
  {
    id: 'conversion', name: 'Conversion Engine', icon: 'ri-line-chart-line', color: '#8B3040', currentScore: 4.0, targetScore: 9.5,
    items: [
      { label: 'Formulaires Optimisés', score: 4.0, maxScore: 10, recommendations: ['3 champs max (email, nom, entreprise)', 'Placeholder conversatif vs label statique', 'Progressive profiling'] },
      { label: 'CTA Contextuels', score: 5.0, maxScore: 10, recommendations: ['Remplacer « Contactez-nous » par CTA avec bénéfice', 'CTA flottant mobile', 'Exit intent popup avec lead magnet'] },
      { label: 'Nurturing Email', score: 3.0, maxScore: 10, recommendations: ['3 séquences automatisées', 'Personnalisation par segment', 'A/B testing sujet + contenu'] },
      { label: 'Social Proof', score: 5.0, maxScore: 10, recommendations: ['Témoignages vidéo DG/DAF', 'Case studies format standardisé', 'Logos clients + chiffres impact'] },
    ],
  },
];

function getGapBadge(category: string) {
  switch (category) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'CRITIQUE', dot: 'bg-red-500' };
    case 'major': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'MAJEUR', dot: 'bg-amber-500' };
    case 'optimization': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'OPTIMISATION', dot: 'bg-emerald-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'P0': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'P0 — URGENT', dot: 'bg-red-500' };
    case 'P1': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'P1 — HAUTE', dot: 'bg-amber-500' };
    case 'P2': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'P2 — NORMALE', dot: 'bg-emerald-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'implemented': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: 'ri-check-line text-emerald-600', label: 'Implémenté' };
    case 'partial': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: 'ri-time-line text-amber-600', label: 'Partiel' };
    case 'missing': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'ri-close-line text-red-600', label: 'Manquant' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', icon: 'ri-question-line text-gray-600', label: 'Inconnu' };
  }
}

function getChannelBadge(channel: string) {
  switch (channel) {
    case 'SEO': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
    case 'LinkedIn': return 'bg-secondary-50 border-secondary-200 text-secondary-900';
    case 'Blog': return 'bg-amber-50 border-amber-200 text-amber-700';
    case 'IA': return 'bg-accent-50 border-accent-200 text-accent-900';
    case 'Email': return 'bg-cyan-50 border-cyan-200 text-cyan-700';
    case 'Social': return 'bg-rose-50 border-rose-200 text-rose-700';
    default: return 'bg-gray-50 border-gray-200 text-gray-700';
  }
}

export default function KOSDigitalGrowthCorrectionEnginePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'rootcause' | 'reconstruction' | 'execution' | 'kpis' | 'tickets'>('diagnostic');
  const [expandedAction, setExpandedAction] = useState<string | null>('act-1');
  const [selectedPillar, setSelectedPillar] = useState<string>('narrative');
  const [selectedChannel, setSelectedChannel] = useState<string>('seo-geo');

  const { tickets, stats: ticketStats, loading: ticketsLoading, syncing, error: ticketsError, refresh, syncTicketsFromCrawl, updateTicketStatus, crossResolutionAlerts, crossResolving, acknowledgeCrossAlert } = useAutoCorrectionTickets('digital_growth');

  const stats = useMemo(() => ({
    totalGaps: CRITICAL_GAPS.length + MAJOR_GAPS.length + OPTIMIZATION_GAPS.length,
    critical: CRITICAL_GAPS.length,
    major: MAJOR_GAPS.length,
    optimization: OPTIMIZATION_GAPS.length,
    avgKpiProgress: 42,
    p0Actions: CORRECTIVE_ACTIONS.filter(a => a.priority === 'P0').length,
    p1Actions: CORRECTIVE_ACTIONS.filter(a => a.priority === 'P1').length,
    totalActions: CORRECTIVE_ACTIONS.length,
    pillars: RECONSTRUCTION_PILLARS.length,
    missingComponents: RECONSTRUCTION_PILLARS.flatMap(p => p.components).filter(c => c.status === 'missing').length,
    partialComponents: RECONSTRUCTION_PILLARS.flatMap(p => p.components).filter(c => c.status === 'partial').length,
    implementedComponents: RECONSTRUCTION_PILLARS.flatMap(p => p.components).filter(c => c.status === 'implemented').length,
    channelScore: CHANNEL_MODULES.reduce((acc, m) => acc + m.currentScore, 0) / CHANNEL_MODULES.length,
  }), []);

  const activePillar = RECONSTRUCTION_PILLARS.find(p => p.id === selectedPillar) || RECONSTRUCTION_PILLARS[0];
  const activeChannel = CHANNEL_MODULES.find(m => m.id === selectedChannel) || CHANNEL_MODULES[0];

  return (
    <KOSHubLayout hubId={43}>
      <SeoHead
        title="KOS Digital Growth Correction Engine™ — Stratégie Digitale | KHEPRA EXPERTS"
        description="Moteur de correction digitale autonome : diagnostic marketing, SEO/GEO/AEO, content intelligence, community management, lead generation. Funnel conversion, nurturing, CRM. Standards McKinsey, BCG, Deloitte, PwC, EY, KPMG. 0 FCFA publicité."
        keywords="KOS Digital Growth Correction Engine, stratégie digitale, SEO GEO AEO, content marketing, lead generation, community management, funnel conversion, KHEPRA EXPERTS"
        canonicalPath="/kos-digital-growth-correction-engine"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      <Navigation />

      <main id="main-content">
        {/* Hero */}
        <section className="relative bg-background-100 border-b border-background-200/70">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20sophisticated%20dark%20digital%20marketing%20command%20center%20with%20warm%20amber%20and%20emerald%20growth%20trajectory%20visualization%20patterns%20radiating%20outward%2C%20precise%20geometric%20network%20topology%20lines%20forming%20organic%20reach%20expansion%20rings%2C%20premium%20marketing%20intelligence%20atmosphere%20with%20structured%20data%20flow%20and%20conversion%20funnel%20architecture%20visualization%2C%20no%20text%20no%20human%20figures%2C%20clean%20minimalist%20dark%20aesthetic%20with%20algorithmic%20growth%20patterns%20and%20interconnected%20node%20clusters&width=1920&height=600&seq=kos-digital-growth-hero&orientation=landscape"
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
                <i className="ri-rocket-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  KOS Digital Growth Correction Engine™
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                De la Présence Digitale à la
                <span className="block text-amber-400 mt-2">Machine de Croissance Organique</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                Diagnostic digital, SEO/GEO/AEO, content intelligence, community management, lead generation.{' '}
                <strong className="text-white">Funnel complet : contenu → lead magnet → diagnostic → CRM → closing.</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm text-red-300 font-semibold">{stats.critical} Écarts Critiques</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-amber-300 font-semibold">{stats.p0Actions} Actions P0</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-emerald-300 font-semibold">0 FCFA Publicité</span>
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
                { id: 'diagnostic', label: 'Diagnostic Global', icon: 'ri-error-warning-line', count: String(stats.totalGaps) },
                { id: 'rootcause', label: 'Root Cause Analysis', icon: 'ri-search-line', count: '5' },
                { id: 'reconstruction', label: 'Reconstruction', icon: 'ri-stack-line', count: '3' },
                { id: 'execution', label: 'Plan d\'Exécution', icon: 'ri-tools-line', count: '8' },
                { id: 'kpis', label: 'KPIs & Canaux', icon: 'ri-bar-chart-line', count: '4' },
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

        {/* PHASE 1 — Diagnostic Global */}
        {activeTab === 'diagnostic' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-4">
                  <i className="ri-error-warning-fill text-red-600 text-sm" />
                  <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">PHASE 1 — Diagnostic Global</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Écarts Classés par Criticité & Impact Business
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  🔴 Critique (bloque croissance) • 🟠 Majeur (impact fort) • 🟡 Optimisation (amélioration).
                </p>
              </div>

              {/* Summary Stats */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-10">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-red-400">{stats.critical}</span>
                    <span className="text-xs text-gray-400">Critiques</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-amber-400">{stats.major}</span>
                    <span className="text-xs text-gray-400">Majeurs</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-emerald-400">{stats.optimization}</span>
                    <span className="text-xs text-gray-400">Optimisations</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-white">{stats.totalGaps}</span>
                    <span className="text-xs text-gray-400">Total Écarts</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-amber-400">{stats.avgKpiProgress}%</span>
                    <span className="text-xs text-gray-400">Progression KPI</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-emerald-400">15%</span>
                    <span className="text-xs text-gray-400">Cible Capture</span>
                  </div>
                </div>
              </div>

              {/* Critical Gaps */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <h3 className="font-heading text-xl font-bold text-red-700 uppercase tracking-wider">
                    Critiques — {CRITICAL_GAPS.length} Écarts Bloquant la Croissance
                  </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {CRITICAL_GAPS.map((gap) => {
                    const badge = getGapBadge(gap.category);
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
                          <p className="text-foreground-600 leading-relaxed">{gap.description}</p>
                          <div className="flex items-start gap-2">
                            <i className="ri-money-dollar-circle-line text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-semibold text-foreground-800">Impact Business : </span>
                              <span className="text-foreground-600">{gap.businessImpact}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <i className="ri-search-line text-foreground-500 mt-0.5 flex-shrink-0" />
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
                  <h3 className="font-heading text-xl font-bold text-amber-700 uppercase tracking-wider">
                    Majeurs — {MAJOR_GAPS.length} Problèmes Additionnels
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      <p className="text-xs text-foreground-600 leading-relaxed mb-3">{gap.description}</p>
                      <p className="text-xs text-foreground-500 leading-relaxed">
                        <span className="font-semibold text-amber-700">Impact : </span>{gap.businessImpact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimization Gaps */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <h3 className="font-heading text-xl font-bold text-emerald-700 uppercase tracking-wider">
                    Optimisations — {OPTIMIZATION_GAPS.length} Améliorations
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {OPTIMIZATION_GAPS.map((gap) => (
                    <div key={gap.id} className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${gap.color}15` }}>
                          <i className={`${gap.icon} text-base`} style={{ color: gap.color }} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground-950">{gap.title}</h4>
                        </div>
                      </div>
                      <p className="text-xs text-foreground-600 leading-relaxed mb-3">{gap.description}</p>
                      <p className="text-xs text-foreground-500 leading-relaxed">
                        <span className="font-semibold text-emerald-700">Cause : </span>{gap.rootCause}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PHASE 2 — Root Cause Analysis */}
        {activeTab === 'rootcause' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-search-fill text-amber-600 text-sm" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">PHASE 2 — Root Cause Analysis</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Analyse des Causes Racines — 5 Blocages Systémiques
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Cause technique, rupture dans le funnel, dépendances manquantes, niveau de risque.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ROOT_CAUSE_ANALYSES.map((rca) => (
                  <div key={rca.id} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                    <div className="p-5" style={{ backgroundColor: `${rca.color}08`, borderBottom: `2px solid ${rca.color}20` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${rca.color}15` }}>
                        <i className={`${rca.icon} text-lg`} style={{ color: rca.color }} />
                      </div>
                      <h3 className="font-heading text-base font-bold text-foreground-950 mb-1">{rca.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 border border-red-200 text-red-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          RISK: {rca.riskLevel}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <h5 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-1">Cause Racine</h5>
                        <p className="text-sm text-foreground-600 leading-relaxed">{rca.cause}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-1">Rupture dans le Funnel</h5>
                        <p className="text-xs text-foreground-600 leading-relaxed">{rca.funnelBreak}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-1">Dépendances</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {rca.dependencies.map((dep) => (
                            <span key={dep} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-background-100 text-foreground-500 border border-background-200">
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PHASE 3 — Reconstruction Stratégique */}
        {activeTab === 'reconstruction' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-stack-fill text-emerald-600 text-sm" />
                  <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">PHASE 3 — Reconstruction Stratégique</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  3 Piliers — Narrative Core · Content OS · Funnel System
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Reconfigurer le système digital autour de ces 3 piliers fondamentaux.
                </p>
              </div>

              {/* Architecture Summary */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-emerald-400">{stats.implementedComponents}</span>
                    <span className="text-xs text-gray-400">Composants Implémentés</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-amber-400">{stats.partialComponents}</span>
                    <span className="text-xs text-gray-400">Composants Partiels</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-red-400">{stats.missingComponents}</span>
                    <span className="text-xs text-gray-400">Composants Manquants</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-bold font-heading text-white">{stats.pillars}</span>
                    <span className="text-xs text-gray-400">Piliers Stratégiques</span>
                  </div>
                </div>
              </div>

              {/* Pillar Selector */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {RECONSTRUCTION_PILLARS.map((pillar) => (
                  <button
                    key={pillar.id}
                    onClick={() => setSelectedPillar(pillar.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      selectedPillar === pillar.id
                        ? 'text-white'
                        : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300 hover:text-foreground-900'
                    }`}
                    style={selectedPillar === pillar.id ? { backgroundColor: pillar.color } : {}}
                  >
                    <i className={`${pillar.icon} text-base`} />
                    {pillar.name}
                  </button>
                ))}
              </div>

              {/* Active Pillar */}
              <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${activePillar.color}15` }}>
                    <i className={`${activePillar.icon} text-2xl`} style={{ color: activePillar.color }} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground-950">{activePillar.name}</h3>
                    <p className="text-sm text-foreground-500">{activePillar.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activePillar.components.map((comp, i) => {
                    const statusBadge = getStatusBadge(comp.status);
                    return (
                      <div key={i} className="rounded-xl bg-background-50 border border-background-100 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${activePillar.color}12` }}>
                          <i className={`${comp.icon} text-sm`} style={{ color: activePillar.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-foreground-950 mb-0.5">{comp.label}</h4>
                          <p className="text-xs text-foreground-600 leading-relaxed">{comp.description}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold flex-shrink-0 ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}>
                          <i className={`${statusBadge.icon} text-[10px]`} />
                          {statusBadge.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PHASE 4 — Plan d'Exécution Marketing */}
        {activeTab === 'execution' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-tools-fill text-amber-600 text-sm" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">PHASE 4 — Plan d'Exécution Marketing</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  8 Actions Correctives — Priorisées & Canalisées
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Chaque action : Objectif → Solution → Agent → Canal → KPI → Priorité (P0/P1/P2).
                </p>
              </div>

              <div className="space-y-4">
                {CORRECTIVE_ACTIONS.map((action) => {
                  const priorityBadge = getPriorityBadge(action.priority);
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
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${priorityBadge.bg} ${priorityBadge.border} ${priorityBadge.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${priorityBadge.dot}`} />
                              {priorityBadge.label}
                            </span>
                          </div>
                          <p className="text-sm text-foreground-500 line-clamp-2">{action.concreteSolution}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-foreground-400">
                            <span className="flex items-center gap-1">
                              <i className="ri-user-line" />{action.responsibleAgent}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getChannelBadge(action.channel)}`}>
                              {action.channel}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="ri-calendar-line" />
                              J+{action.timeline}
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
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-1">Format Contenu</h5>
                                <p className="text-sm text-foreground-700 leading-relaxed">{action.contentFormat}</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                                <h5 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">KPI Attendu</h5>
                                <p className="text-sm text-amber-800 font-semibold leading-relaxed">{action.expectedKpi}</p>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-1">Problème Ciblé</h5>
                                <p className="text-sm text-foreground-700 leading-relaxed">{action.targetedProblem}</p>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                <span className="flex items-center gap-1 text-foreground-500">
                                  <i className="ri-calendar-line text-amber-500" />
                                  <span className="font-bold text-foreground-700">J+{action.timeline}</span>
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

        {/* PHASE 5 — KPIs & Architecture Cible */}
        {activeTab === 'kpis' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-bar-chart-fill text-emerald-600 text-sm" />
                  <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">PHASE 5 — KPIs & Architecture Cible</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  10 KPI Digital Growth — 4 Canaux d'Optimisation
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Mesurer, optimiser, scaler. SEO/GEO, Community Management, Lead Generation, Conversion Engine.
                </p>
              </div>

              {/* KPIs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                {GROWTH_KPIS.map((kpi, i) => {
                  const curr = parseFloat(kpi.current.replace(/[,%]/g, '')) || 0;
                  const tgt = parseFloat(kpi.target.replace(/[,%]/g, '')) || 1;
                  const pct = tgt > 0 ? Math.min((curr / tgt) * 100, 100) : 0;
                  const displayPct = kpi.trend === 'down' ? Math.max(100 - pct, 5) : pct;
                  return (
                    <div key={i} className="rounded-2xl bg-white border border-background-200 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}18` }}>
                          <i className={`${kpi.icon} text-sm`} style={{ color: kpi.color }} />
                        </div>
                        <span className="text-[10px] text-foreground-400 uppercase tracking-wider">{kpi.label}</span>
                      </div>
                      <div className="flex items-baseline gap-1.5 mb-2">
                        <span className="text-xl font-bold text-foreground-950 font-heading">{kpi.current}</span>
                        <span className="text-[10px] text-foreground-400">→ {kpi.target}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-background-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${displayPct}%`, backgroundColor: kpi.color }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-foreground-400">{kpi.category}</span>
                        <span className={`text-xs font-bold ${kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-400'}`}>
                          {kpi.trend === 'up' && <i className="ri-arrow-up-line text-xs" />}
                          {kpi.trend === 'down' && <i className="ri-arrow-down-line text-xs" />}
                          {kpi.trend === 'stable' && <i className="ri-arrow-right-line text-xs" />}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Channel Modules */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                    4 Canaux d'Optimisation
                  </h2>
                  <p className="text-foreground-600">Score actuel, cible, recommandations par canal.</p>
                </div>

                {/* Channel Selector */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                  {CHANNEL_MODULES.map((mod) => (
                    <button
                      key={mod.id}
                      onClick={() => setSelectedChannel(mod.id)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                        selectedChannel === mod.id
                          ? 'text-white'
                          : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300 hover:text-foreground-900'
                      }`}
                      style={selectedChannel === mod.id ? { backgroundColor: mod.color } : {}}
                    >
                      <i className={`${mod.icon} text-base`} />
                      {mod.name}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedChannel === mod.id ? 'bg-white/20' : 'bg-background-200'}`}>
                        {mod.currentScore}/{mod.targetScore}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Active Channel */}
                <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${activeChannel.color}15` }}>
                        <i className={`${activeChannel.icon} text-2xl`} style={{ color: activeChannel.color }} />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-foreground-950">{activeChannel.name}</h3>
                        <p className="text-sm text-foreground-500">Score actuel : {activeChannel.currentScore} / Cible : {activeChannel.targetScore}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold font-heading" style={{ color: activeChannel.color }}>
                        {(activeChannel.currentScore / activeChannel.targetScore * 100).toFixed(0)}%
                      </span>
                      <span className="text-xs text-foreground-400 block">progression</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeChannel.items.map((item, i) => {
                      const scorePct = (item.score / item.maxScore) * 100;
                      const scoreColor = scorePct >= 80 ? '#86BC25' : scorePct >= 50 ? '#e8c547' : '#c2410c';
                      return (
                        <div key={i} className="rounded-2xl border border-background-200 p-5">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-bold text-foreground-950">{item.label}</h4>
                            <span className="text-lg font-bold font-heading" style={{ color: scoreColor }}>
                              {item.score.toFixed(1)}/{item.maxScore}
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden mb-4">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${scorePct}%`, backgroundColor: scoreColor }}
                            />
                          </div>
                          <ul className="space-y-1.5">
                            {item.recommendations.map((rec, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-foreground-600">
                                <i className="ri-arrow-right-line text-emerald-500 mt-0.5 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
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
                  Tickets de Correction — Digital Growth
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Système unifié de suivi des corrections digitales. Prendre en charge → Résoudre → Tracer.
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
                engineTitle="Digital Growth Correction Engine"
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
              src="https://readdy.ai/api/search-image?query=abstract%20sophisticated%20dark%20marketing%20growth%20command%20center%20with%20warm%20amber%20and%20emerald%20conversion%20funnel%20visualization%20patterns%2C%20precise%20geometric%20reach%20expansion%20rings%20forming%20organic%20audience%20growth%20networks%2C%20premium%20digital%20strategy%20atmosphere%20with%20structured%20data%20flow%20and%20interconnected%20node%20clusters%2C%20no%20text%20no%20human%20figures%2C%20clean%20minimalist%20dark%20aesthetic%20with%20algorithmic%20growth%20patterns%20and%20engagement%20metrics%20visualization&width=1920&height=400&seq=kos-digital-growth-cta&orientation=landscape"
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
                  <i className="ri-rocket-line text-amber-400 text-sm" />
                  <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">Module Croissance — 100% Organique</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                  Transformer le Digital en Machine de Leads Qualifiés
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Funnel complet automatisé : contenu → lead magnet → diagnostic → CRM → closing. SEO/GEO/AEO pour dominer les moteurs de recherche ET IA. Community management exécutif. 0 FCFA de publicité, 100% organique.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Funnel Automatisé', icon: 'ri-filter-3-line' },
                    { label: 'SEO/GEO/AEO', icon: 'ri-search-line' },
                    { label: 'Lead Scoring', icon: 'ri-bar-chart-line' },
                    { label: 'Nurturing', icon: 'ri-mail-send-line' },
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
                  href="/kos-social-media-command"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-share-line" />
                  Social Media Command 🆕
                </a>
                <a
                  href="/kos-unified-autopilot"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-foreground-950 font-bold text-sm hover:bg-amber-400 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-radar-line" />
                  Growth Orchestrator
                </a>
                <a
                  href="/kos-content-correction-engine"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white font-bold text-sm hover:bg-white/25 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-quill-pen-line" />
                  Content Correction
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

    </KOSHubLayout>
  );
}