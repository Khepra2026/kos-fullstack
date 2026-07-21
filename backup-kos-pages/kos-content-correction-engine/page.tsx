import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { Navigation } from '@/pages/home/components/Navigation';
import { SeoHead } from '@/components/feature/SeoHead';
import TicketBoard from '@/components/feature/TicketBoard';
import { useAutoCorrectionTickets } from '@/hooks/useAutoCorrectionTickets';
import { useWhitepaperQualityScore } from '@/hooks/useWhitepaperQualityScore';
import { grammaticalReviewStats, grammaticalIssues, reviewAgents, GrammaticalIssue } from '@/mocks/grammaticalReview';
import { whitepaperSEOProfiles, whitepaperQualityStats, geoOptimizationTips, aeoOptimizationTips } from '@/mocks/whitepapersQualityScores';
import type { WhitepaperSEOProfile } from '@/mocks/whitepapersQualityScores';
import { LEGAL_RISK_CATEGORIES, LEGAL_REVIEW_STAGES, LEGAL_CONTENT_SCANS, LEGAL_VALIDATION_STATS, LEGAL_CORRECTIONS_EXAMPLES, SCORING_12_BLOCS, ROADMAP_30_90_180_365 } from '@/mocks/legalValidation';

interface ContentAuditItem {
  id: string;
  title: string;
  type: 'blog' | 'whitepaper' | 'tool' | 'landing' | 'case_study';
  currentScore: number;
  targetScore: number;
  status: 'critical' | 'needs_improvement' | 'acceptable' | 'excellent';
  issues: string[];
  recommendations: string[];
  conversionPotential: 'faible' | 'moyen' | 'élevé';
  icon: string;
  color: string;
}

interface QualityCriterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  icon: string;
  color: string;
  bigFourStandard: string;
}

interface DiagnosticIssue {
  id: string;
  category: string;
  severity: 'critical' | 'major' | 'minor';
  description: string;
  impact: string;
  icon: string;
  color: string;
}

interface RestructurationStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bigFourReference: string;
  details: string[];
}

interface ModuleContent {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: { label: string; score: number; maxScore: number; recommendations: string[] }[];
}

const QUALITY_CRITERIA: QualityCriterion[] = [
  { id: 'clarte', name: 'Clarté du Problème Business', description: 'Le problème business est-il clairement identifié et contextualisé dans l\'environnement africain ?', weight: 20, icon: 'ri-focus-3-line', color: '#0D7B5F', bigFourStandard: 'McKinsey MECE Principle — Mutually Exclusive, Collectively Exhaustive problem definition.' },
  { id: 'these', name: 'Force de la Thèse (POV)', description: 'Le Point of View est-il distinctif, tranché et différenciant par rapport aux concurrents ?', weight: 20, icon: 'ri-lightbulb-flash-line', color: '#C05A3A', bigFourStandard: 'BCG Thought Leadership — Strong, contrarian, evidence-backed thesis that creates intellectual tension.' },
  { id: 'structure', name: 'Structure Logique (Framework)', description: 'Le contenu suit-il une architecture intellectuelle rigoureuse avec un framework identifiable ?', weight: 15, icon: 'ri-layout-masonry-line', color: '#9B7B2C', bigFourStandard: 'Bain Results Delivery — Structured frameworks that guide decision-makers from analysis to action.' },
  { id: 'profondeur', name: 'Profondeur Analytique', description: 'L\'analyse va-t-elle au-delà du descriptif pour offrir des insights non triviaux et actionnables ?', weight: 15, icon: 'ri-search-2-line', color: '#6B4A3A', bigFourStandard: 'Deloitte Analytics — Data-driven insights with multi-layered analysis and root cause identification.' },
  { id: 'insights', name: 'Qualité des Insights', description: 'Le contenu génère-t-il des « aha moments » — des révélations que le lecteur n\'avait pas anticipées ?', weight: 15, icon: 'ri-bubble-chart-line', color: '#8B3040', bigFourStandard: 'PwC Strategy& — Insights that create competitive advantage and reshape decision frameworks.' },
  { id: 'actionnabilité', name: 'Actionnabilité', description: 'Le lecteur sait-il exactement quoi faire après avoir lu ce contenu ? Y a-t-il des next steps clairs ?', weight: 15, icon: 'ri-play-circle-line', color: '#2D7A3A', bigFourStandard: 'EY Building a Better Working World — Actionable recommendations with implementation roadmaps.' },
];

const CONTENT_AUDIT: ContentAuditItem[] = [
  {
    id: 'blog-1', title: 'Gouvernance Bancaire UEMOA — Série Complète', type: 'blog',
    currentScore: 7.2, targetScore: 9.5, status: 'needs_improvement',
    issues: ['Thèse descriptive, pas de POV fort', 'Absence de framework propriétaire KHEPRA', 'Pas de CTA vers diagnostic gratuit', 'Données BCEAO citées sans analyse critique'],
    recommendations: ['Ajouter un POV tranché sur la gouvernance UEMOA vs standards OCDE', 'Créer un KHEPRA Governance Maturity Model™', 'Intégrer CTA vers Diagnostic Gouvernance', 'Ajouter analyse comparative régionale'],
    conversionPotential: 'élevé', icon: 'ri-bank-line', color: '#0D7B5F',
  },
  {
    id: 'blog-2', title: 'Prix de Transfert — Documentation BEPS Action 13', type: 'blog',
    currentScore: 5.8, targetScore: 9.5, status: 'critical',
    issues: ['100% descriptif, zéro insight', 'Pas de données chiffrées', 'Pas de framework d\'analyse', 'Aucun CTA de conversion', 'Ton trop académique'],
    recommendations: ['Restructurer avec le KHEPRA Transfer Pricing Risk Matrix™', 'Ajouter 5 cas réels anonymisés', 'Intégrer simulateur de risque fiscal', 'Ajouter CTA Diagnostic Prix de Transfert'],
    conversionPotential: 'élevé', icon: 'ri-exchange-funds-line', color: '#C05A3A',
  },
  {
    id: 'whitepaper-1', title: 'Guide Complet Due Diligence Acquisition Afrique', type: 'whitepaper',
    currentScore: 6.5, targetScore: 9.5, status: 'needs_improvement',
    issues: ['Pas de framework propriétaire', 'Sections analytiques trop courtes', 'Pas de modèles de due diligence téléchargeables', 'Recommandations exécutives génériques'],
    recommendations: ['Créer le KHEPRA Due Diligence 360 Framework™', 'Ajouter checklists téléchargeables par étape', 'Inclure 3 modèles de rapports', 'Structurer en document research-grade 25 pages'],
    conversionPotential: 'élevé', icon: 'ri-file-search-line', color: '#9B7B2C',
  },
  {
    id: 'tool-1', title: 'Diagnostic Pré-Inspection BCEAO/COBAC', type: 'tool',
    currentScore: 8.0, targetScore: 9.5, status: 'acceptable',
    issues: ['Score généré mais pas de benchmark sectoriel', 'Rapport téléchargeable trop basique', 'Pas de segmentation utilisateur avancée', 'Pas de connexion au CRM'],
    recommendations: ['Ajouter benchmark sectoriel automatisé', 'Enrichir le rapport PDF téléchargeable', 'Segmentation : conforme / à risque / critique', 'Connexion CRM pour lead scoring automatique'],
    conversionPotential: 'élevé', icon: 'ri-stethoscope-line', color: '#5B8C2A',
  },
  {
    id: 'landing-1', title: 'Page Service — Contrôle Interne Bancaire', type: 'landing',
    currentScore: 5.2, targetScore: 9.5, status: 'critical',
    issues: ['Trop de texte, pas de hiérarchie visuelle', 'Pas de problème business clairement énoncé', 'Pas de framework méthodologique visible', 'CTA noyé dans le contenu', 'Pas de preuves sociales'],
    recommendations: ['Restructurer avec la méthode COSO 2013 visuelle', 'Ajouter section « Avant/Après » avec KPIs', 'Intégrer témoignages DG/Risk Managers', 'Placer CTA flottant + diagnostic gratuit'],
    conversionPotential: 'élevé', icon: 'ri-shield-check-line', color: '#c2410c',
  },
  {
    id: 'case-1', title: 'Case Study — RegTech Conformité UEMOA/CEMAC', type: 'case_study',
    currentScore: 7.8, targetScore: 9.5, status: 'acceptable',
    issues: ['Narrative engageant mais pas de framework réplicable', 'Chiffres impactants mais pas de méthodologie', 'Pas de format « Problem → Solution → Results » standardisé'],
    recommendations: ['Standardiser format KHEPRA Case Study™ (5 sections)', 'Ajouter section « Ce que vous pouvez répliquer »', 'Intégrer un calculateur ROI pour le lecteur'],
    conversionPotential: 'moyen', icon: 'ri-file-text-line', color: '#7B5C2A',
  },
];

const DIAGNOSTIC_ISSUES: DiagnosticIssue[] = [
  { id: 'diag-1', category: 'Absence de Framework', severity: 'critical', description: '75% des contenus sont purement descriptifs sans architecture intellectuelle identifiable.', impact: 'Le lecteur ne retient rien. Pas de différenciation concurrentielle. Contenu interchangeable avec n\'importe quel cabinet.', icon: 'ri-layout-masonry-line', color: '#c2410c' },
  { id: 'diag-2', category: 'Contenu Descriptif vs Analytique', severity: 'critical', description: 'Ratio descriptif/analytique estimé à 80/20. Cible McKinsey : 20/80.', impact: 'Zéro insight actionnable. Le contenu informe sans transformer. Aucune valeur décisionnelle.', icon: 'ri-file-copy-line', color: '#c2410c' },
  { id: 'diag-3', category: 'Faible Valeur Décisionnelle', severity: 'major', description: 'Moins de 15% des contenus incluent des « next steps » ou une roadmap d\'action pour le lecteur.', impact: 'Le DG/DAF lit mais ne passe pas à l\'action. Taux de conversion contenu → lead < 3%.', icon: 'ri-play-circle-line', color: '#e8c547' },
  { id: 'diag-4', category: 'Manque de Différenciation', severity: 'critical', description: 'Aucun framework propriétaire nommé. Zéro modèle KHEPRA identifiable. Ton générique.', impact: 'KHEPRA perçu comme « un cabinet de plus ». Pas de mémorabilité. Pas de brand equity.', icon: 'ri-award-line', color: '#c2410c' },
  { id: 'diag-5', category: 'Absence de Conversion Logic', severity: 'critical', description: '60% des articles n\'ont aucun CTA. 30% ont un CTA générique « Contactez-nous ».', impact: 'Trafic → 0 lead. 8 420 visiteurs/mois gaspillés. Taux de capture 8% vs cible 15%.', icon: 'ri-download-2-line', color: '#c2410c' },
  { id: 'diag-6', category: 'Format Non Standardisé', severity: 'major', description: 'Chaque contenu a sa propre structure. Pas de template KHEPRA. Pas de charte éditoriale formelle.', impact: 'Expérience de lecture inconstante. Qualité variable. Impossible de scaler la production.', icon: 'ri-file-list-line', color: '#e8c547' },
  { id: 'diag-7', category: 'SEO/GEO/AEO Non Intégré', severity: 'major', description: '75 articles SEO non reformatés GEO. 0 contenu optimisé pour les moteurs IA.', impact: 'Invisibilité sur ChatGPT, Perplexity, Claude, Gemini. Perte de 300M+ utilisateurs IA.', icon: 'ri-brain-line', color: '#e8c547' },
  { id: 'diag-8', category: 'Absence de Naming Propriétaire', severity: 'major', description: 'Aucun framework KHEPRA nommé et trademarké. Pas de KHEPRA Maturity Model™, pas de KHEPRA Risk Matrix™.', impact: 'Impossible de créer un capital intellectuel propriétaire. Les idées s\'évaporent.', icon: 'ri-trademark-line', color: '#e8c547' },
];

const RESTRUCTURATION_STEPS: RestructurationStep[] = [
  { step: 1, title: 'Problème Business Clair', description: 'Ouvrir avec une situation business concrète et chiffrée qui crée une tension chez le décideur.', icon: 'ri-focus-3-line', color: '#c2410c', bigFourReference: 'McKinsey — « The situation » : contextualiser le problème dans son environnement business.', details: ['Identifier le décideur cible (DG, DAF, Risk Manager, Compliance Officer)', 'Chiffrer l\'impact business (FCFA, % CA, jours d\'immobilisation)', 'Contextualiser dans l\'environnement réglementaire UEMOA/CEMAC', 'Créer une tension narrative : « Sans action, voici ce qui arrive »'] },
  { step: 2, title: 'Thèse Forte — Point of View', description: 'Affirmer une position stratégique distinctive que seul KHEPRA peut défendre.', icon: 'ri-lightbulb-flash-line', color: '#C05A3A', bigFourReference: 'BCG — « The complication » : introduire un point de vue qui challenge le statu quo.', details: ['Formuler une thèse en une phrase mémorisable', 'La thèse doit être contrariante ou contre-intuitive', 'Ancrer dans l\'expertise réglementaire KHEPRA (BCEAO/COBAC/OHADA)', 'Distinguer clairement de ce que diraient les concurrents'] },
  { step: 3, title: 'Analyse Structurée — Framework', description: 'Déployer un framework propriétaire KHEPRA qui structure l\'analyse de façon visuelle et mémorisable.', icon: 'ri-layout-masonry-line', color: '#9B7B2C', bigFourReference: 'Bain — « The resolution » : framework structuré qui guide de l\'analyse à l\'action.', details: ['Créer et nommer un framework KHEPRA (ex: KHEPRA Compliance Navigator™)', 'Visualiser le framework (diagramme, matrice, pyramide)', 'Expliquer chaque composante avec des exemples concrets', 'Montrer comment le framework s\'applique au problème business'] },
  { step: 4, title: 'Insights Clés', description: 'Livrer 3-5 insights non triviaux qui créent des « aha moments » chez le lecteur.', icon: 'ri-bubble-chart-line', color: '#6B4A3A', bigFourReference: 'Deloitte — « Key findings » : révéler ce que les données disent vraiment.', details: ['Chaque insight doit être surprenant ou contre-intuitif', 'Appuyer chaque insight par des données chiffrées', 'Connecter à des cas réels anonymisés', 'Hiérarchiser : insight #1 doit être le plus percutant'] },
  { step: 5, title: 'Implications Business', description: 'Traduire les insights en conséquences concrètes pour le business du lecteur.', icon: 'ri-line-chart-line', color: '#8B3040', bigFourReference: 'PwC — « Business implications » : connecter l\'analyse à la réalité opérationnelle.', details: ['Quantifier l\'impact financier de chaque insight', 'Décrire le scénario « avec action » vs « sans action »', 'Prioriser les implications par urgence', 'Connecter aux réalités réglementaires africaines'] },
  { step: 6, title: 'Recommandations', description: 'Fournir une feuille de route actionnable avec des étapes concrètes, priorisées et datées.', icon: 'ri-road-map-line', color: '#0D7B5F', bigFourReference: 'EY — « Recommendations » : roadmap d\'implémentation avec KPIs.', details: ['3-5 recommandations maximum, priorisées', 'Chaque recommandation avec un KPI de succès', 'Timeline indicative (J+30, J+90, J+180)', 'Checklist actionnable téléchargeable'] },
  { step: 7, title: 'CTA Stratégique', description: 'Transformer chaque contenu en point d\'entrée funnel avec un lead magnet pertinent.', icon: 'ri-download-2-line', color: '#2D7A3A', bigFourReference: 'Best Practice — « Call to value » : offrir une prochaine étape à forte valeur perçue.', details: ['CTA contextuel lié au contenu (pas générique)', 'Lead magnet : diagnostic, checklist, modèle, mini-audit', 'Bouton proéminent avec bénéfice clair', 'Formulaire de capture optimisé (3 champs max)'] },
];

const MODULE_CONTENT: ModuleContent[] = [
  {
    id: 'blog', name: 'Module Blog', icon: 'ri-article-line', color: '#0D7B5F',
    items: [
      { label: 'POV Stratégique (thèse forte)', score: 4.5, maxScore: 10, recommendations: ['Reformuler chaque titre avec un POV tranché', 'Ajouter une section « Notre analyse » de 300 mots minimum', 'Structurer avec le Template 7 Étapes KHEPRA'] },
      { label: 'SEO Structuré (Hn, clusters)', score: 7.0, maxScore: 10, recommendations: ['Ajouter FAQ Schema.org sur chaque article', 'Renforcer liens internes entre articles du même cluster', 'Optimiser méta-descriptions avec mots-clés GEO'] },
      { label: 'Contenu IA-Ready (GEO)', score: 3.0, maxScore: 10, recommendations: ['Ajouter des résumés structurés pour moteurs IA', 'Inclure des définitions claires d\'entités réglementaires', 'Structurer en paragraphes courts avec sous-titres explicites'] },
      { label: 'Partageable LinkedIn', score: 4.0, maxScore: 10, recommendations: ['Créer 3 extraits citables par article', 'Ajouter visuels carrousel LinkedIn', 'Inclure hook social en début d\'article'] },
    ],
  },
  {
    id: 'whitepaper', name: 'Module White Paper', icon: 'ri-book-2-line', color: '#C05A3A',
    items: [
      { label: 'Document Research-Grade', score: 5.0, maxScore: 10, recommendations: ['Structurer en 15-25 pages avec sections analytiques', 'Ajouter méthodologie de recherche explicite', 'Inclure bibliographie et sources'] },
      { label: 'Modèles & Frameworks', score: 3.0, maxScore: 10, recommendations: ['Créer 2-3 frameworks propriétaires par white paper', 'Visualiser chaque framework avec diagrammes', 'Rendre les frameworks téléchargeables'] },
      { label: 'Recommandations Exécutives', score: 6.0, maxScore: 10, recommendations: ['Ajouter Executive Summary 1 page', 'Créer une « CEO Checklist » en fin de document', 'Inclure matrice de priorisation'] },
    ],
  },
  {
    id: 'tools', name: 'Module Outils Interactifs', icon: 'ri-tools-line', color: '#5B8C2A',
    items: [
      { label: 'Score Automatisé', score: 8.0, maxScore: 10, recommendations: ['Ajouter benchmark sectoriel au score', 'Visualiser le score avec radar chart', 'Comparer au score moyen du secteur'] },
      { label: 'Diagnostic Segmenté', score: 6.0, maxScore: 10, recommendations: ['Segmentation : conforme / à risque / critique', 'Recommandations personnalisées par segment', 'Priorisation automatique des actions'] },
      { label: 'Rapport Téléchargeable', score: 5.0, maxScore: 10, recommendations: ['Enrichir le PDF avec graphiques et analyses', 'Ajouter page de couverture KHEPRA', 'Inclure les prochaines étapes personnalisées'] },
      { label: 'Connexion Funnel', score: 3.0, maxScore: 10, recommendations: ['Capture email avant affichage du score', 'Déclencher séquence nurturing automatique', 'Notifier le CRM des leads chauds (>80/100)'] },
    ],
  },
  {
    id: 'seo-geo', name: 'Module SEO / GEO / AEO', icon: 'ri-search-line', color: '#9B7B2C',
    items: [
      { label: 'Clusters Thématiques', score: 6.5, maxScore: 10, recommendations: ['Auditer les 75 articles existants', 'Créer 5 clusters thématiques', 'Associer chaque article à un pilier'] },
      { label: 'Entités Sémantiques', score: 4.0, maxScore: 10, recommendations: ['Identifier 50 entités clés (BCEAO, COBAC, OHADA...)', 'Marquer chaque entité dans les contenus', 'Créer pages glossaire liées'] },
      { label: 'FAQ Enrichies', score: 3.0, maxScore: 10, recommendations: ['Créer 50 FAQ Schema.org', 'Structurer en Q&A claires et concises', 'Optimiser pour les extraits enrichis Google'] },
      { label: 'Visibilité IA Générative', score: 2.0, maxScore: 10, recommendations: ['Créer 10 pages piliers GEO-optimisées', 'Structurer contenu en format Q&A pour moteurs IA', 'Optimiser pour ChatGPT, Perplexity, Claude, Gemini'] },
    ],
  },
];

const SCORE_COLORS: Record<string, string> = {
  critical: '#c2410c',
  needs_improvement: '#e8c547',
  acceptable: '#86BC25',
  excellent: '#2D7A3A',
};

const SCORE_LABELS: Record<string, string> = {
  critical: 'CRITIQUE',
  needs_improvement: 'À AMÉLIORER',
  acceptable: 'ACCEPTABLE',
  excellent: 'EXCELLENT',
};

const SCORE_DOTS: Record<string, string> = {
  critical: 'bg-red-500',
  needs_improvement: 'bg-amber-500',
  acceptable: 'bg-emerald-500',
  excellent: 'bg-emerald-600',
};

function getStatusBadge(status: string) {
  switch (status) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'CRITIQUE', dot: 'bg-red-500' };
    case 'needs_improvement': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'À AMÉLIORER', dot: 'bg-amber-500' };
    case 'acceptable': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'ACCEPTABLE', dot: 'bg-emerald-500' };
    case 'excellent': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', label: 'EXCELLENT', dot: 'bg-green-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getPillBadge(potential: string) {
  switch (potential) {
    case 'élevé': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
    case 'moyen': return 'bg-amber-50 border-amber-200 text-amber-700';
    case 'faible': return 'bg-red-50 border-red-200 text-red-700';
    default: return 'bg-gray-50 border-gray-200 text-gray-700';
  }
}

export default function contentCorrectionEnginePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<'audit' | 'diagnostic' | 'restructuration' | 'thinktank' | 'revision' | 'modules' | 'tickets' | 'whitepapers-seo' | 'whitepapers-score' | 'legal-validation' | 'scoring-12-blocs'>('audit');
  const [expandedContent, setExpandedContent] = useState<string | null>('blog-1');
  const [selectedModule, setSelectedModule] = useState<string>('blog');
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);
  const [revisionFilter, setRevisionFilter] = useState<'all' | 'whitepaper' | 'thinktank'>('all');
  const [selectedWhitepaper, setSelectedWhitepaper] = useState<string | null>(null);
  const [expandedScore, setExpandedScore] = useState<string | null>(null);
  const [scoreFilter, setScoreFilter] = useState<'all' | 'blocked' | 'pending' | 'approved'>('all');
  const [expandedLegalScan, setExpandedLegalScan] = useState<string | null>(null);
  const [legalCategoryFilter, setLegalCategoryFilter] = useState<string>('all');
  const [expandedBloc, setExpandedBloc] = useState<number | null>(null);

  const {
    scores,
    stats: scoreStats,
    loading: scoreLoading,
    scanning,
    qualityThreshold,
    runQualityScan,
    runGlobalScan,
    getScoreColor,
    getScoreLabel,
    getScoreBg,
    getScoreTextColor,
  } = useWhitepaperQualityScore();

  const { tickets, stats: ticketStats, loading: ticketsLoading, syncing, error: ticketsError, refresh, syncTicketsFromCrawl, updateTicketStatus, crossResolutionAlerts, crossResolving, acknowledgeCrossAlert } = useAutoCorrectionTickets('content_correction');

  const activeModule = MODULE_CONTENT.find((m) => m.id === selectedModule) || MODULE_CONTENT[0];

  const auditStats = useMemo(() => ({
    total: CONTENT_AUDIT.length,
    critical: CONTENT_AUDIT.filter((c) => c.status === 'critical').length,
    needsImprovement: CONTENT_AUDIT.filter((c) => c.status === 'needs_improvement').length,
    acceptable: CONTENT_AUDIT.filter((c) => c.status === 'acceptable').length,
    excellent: CONTENT_AUDIT.filter((c) => c.status === 'excellent').length,
    avgScore: (CONTENT_AUDIT.reduce((acc, c) => acc + c.currentScore, 0) / CONTENT_AUDIT.length).toFixed(1),
    targetAvgScore: 9.5,
    elevéConversion: CONTENT_AUDIT.filter((c) => c.conversionPotential === 'élevé').length,
  }), []);

  return (
    <hubLayout hubId={41}>
      <SeoHead
        title="KOS Content Correction Engine™ — Contenus Standard Big Four | KHEPRA EXPERTS"
        description="Moteur de correction de contenu autonome : audit qualité, restructuration intellectuelle, frameworks propriétaires, optimisation conversion. Standards McKinsey, BCG, Bain, Deloitte, PwC, EY, KPMG. 0 FCFA publicité."
        keywords="KOS Content Correction Engine, audit contenu Big Four, restructuration intellectuelle, frameworks propriétaires, SEO GEO AEO, conversion contenu, lead magnets, KHEPRA EXPERTS"
        canonicalPath="/kos-content-correction-engine"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />
      <Navigation />

      <main id="main-content">
        {/* Hero */}
        <section className="relative bg-background-100 border-b border-background-200/70">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20sophisticated%20dark%20editorial%20correction%20environment%20with%20precise%20geometric%20proofreading%20marks%20and%20golden%20annotation%20lines%20flowing%20across%20structured%20document%20layouts%2C%20premium%20publishing%20atmosphere%20with%20warm%20amber%20and%20emerald%20accent%20highlights%20representing%20content%20quality%20elevation%2C%20clean%20minimalist%20aesthetic%20with%20intellectual%20refinement%20feel%2C%20no%20text%20no%20human%20figures%2C%20orchestrated%20composition%20with%20layered%20manuscript%20aesthetics&width=1920&height=600&seq=kos-content-hero-bg&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-18"
              width="1920"
              height="600"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-6">
                <i className="ri-quill-pen-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                  KOS Content Correction Engine™
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Du Contenu Standard au
                <span className="block text-emerald-400 mt-2">Niveau Big Four & Think Tank</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                Audit qualité, restructuration intellectuelle, frameworks propriétaires, optimisation conversion.{' '}
                <strong className="text-white">Chaque contenu devient un asset stratégique de leadership.</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm text-red-300 font-semibold">2 Critiques</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-amber-300 font-semibold">2 À Améliorer</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-emerald-300 font-semibold">Score Actuel {auditStats.avgScore}/10</span>
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
                { id: 'audit', label: 'Audit de Qualité', icon: 'ri-file-check-line', count: String(CONTENT_AUDIT.length) },
                { id: 'diagnostic', label: 'Diagnostic Stratégique', icon: 'ri-search-eye-line', count: String(DIAGNOSTIC_ISSUES.length) },
                { id: 'restructuration', label: 'Restructuration', icon: 'ri-layout-masonry-line', count: '7' },
                { id: 'thinktank', label: 'Think Tank', icon: 'ri-lightbulb-flash-line', count: '5' },
                { id: 'revision', label: 'Révision Gram.', icon: 'ri-edit-line', count: String(grammaticalReviewStats.totalErrors) },
                { id: 'modules', label: 'Modules', icon: 'ri-stack-line', count: '4' },
                { id: 'legal-validation', label: 'Validation Légale', icon: 'ri-scales-3-line', count: String(LEGAL_VALIDATION_STATS.totalScans) },
                { id: 'scoring-12-blocs', label: 'Score 12 Blocs', icon: 'ri-dashboard-line', count: String(SCORING_12_BLOCS.length) },
                { id: 'whitepapers-seo', label: 'SEO/GEO LB', icon: 'ri-brain-line', count: '16' },
                { id: 'whitepapers-score', label: 'Score Qualité', icon: 'ri-shield-check-line', count: `${scoreStats.blocked}/${scoreStats.total}` },
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

        {/* PHASE 1 — Audit de Qualité */}
        {activeTab === 'audit' && (
          <>
            {/* Quality Criteria */}
            <section className="py-12 sm:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                    <i className="ri-file-check-fill text-emerald-600 text-sm" />
                    <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">PHASE 1 — Audit de Qualité Big Four</span>
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                    6 Critères — Évaluer Chaque Contenu
                  </h2>
                  <p className="text-foreground-600 max-w-2xl mx-auto">
                    Standards McKinsey, BCG, Bain, Deloitte, PwC, EY, KPMG. Score minimum requis avant publication : 9,5/10.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                  {QUALITY_CRITERIA.map((criterion) => (
                    <div key={criterion.id} className="rounded-2xl bg-white border border-background-200 p-5 hover:shadow-md transition-all">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${criterion.color}15` }}>
                          <i className={`${criterion.icon} text-lg`} style={{ color: criterion.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-foreground-950 mb-0.5">{criterion.name}</h4>
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: criterion.color }}>Poids : {criterion.weight}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-foreground-600 leading-relaxed mb-3">{criterion.description}</p>
                      <div className="pt-3 border-t border-background-100">
                        <span className="text-[10px] text-foreground-400 italic">"{criterion.bigFourStandard}"</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Score Summary */}
                <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-emerald-400">{auditStats.avgScore}</span>
                      <span className="text-xs text-gray-400">Score Moyen /10</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-red-400">{auditStats.critical}</span>
                      <span className="text-xs text-gray-400">Critiques</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-amber-400">{auditStats.needsImprovement}</span>
                      <span className="text-xs text-gray-400">À Améliorer</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-emerald-400">{auditStats.acceptable}</span>
                      <span className="text-xs text-gray-400">Acceptables</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-green-400">{auditStats.excellent}</span>
                      <span className="text-xs text-gray-400">Excellents</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-amber-400">{auditStats.elevéConversion}</span>
                      <span className="text-xs text-gray-400">Potentiel Élevé</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-4xl font-bold font-heading text-white">{auditStats.targetAvgScore}</span>
                      <span className="text-xs text-gray-400">Cible Big Four</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Content Audit Cards */}
            <section className="py-12 sm:py-16 bg-white border-y border-background-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                    Audit de 6 Contenus Stratégiques
                  </h2>
                  <p className="text-foreground-600 max-w-2xl mx-auto">
                    Blog, White Papers, Outils, Landing Pages, Case Studies — chaque contenu scoré sur 10, diagnostiqué, corrigé.
                  </p>
                </div>

                <div className="space-y-4">
                  {CONTENT_AUDIT.map((content) => {
                    const badge = getStatusBadge(content.status);
                    const isExpanded = expandedContent === content.id;
                    const scoreColor = content.currentScore >= 8 ? '#86BC25' : content.currentScore >= 6 ? '#e8c547' : '#c2410c';
                    return (
                      <div
                        key={content.id}
                        className={`rounded-2xl border transition-all duration-300 ${
                          isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                        }`}
                      >
                        <button
                          onClick={() => setExpandedContent(isExpanded ? null : content.id)}
                          className="w-full p-5 sm:p-6 text-left flex items-start gap-4 cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${content.color}15` }}>
                            <i className={`${content.icon} text-lg`} style={{ color: content.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-base font-bold text-foreground-950">{content.title}</h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${badge.bg} ${badge.border} ${badge.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                                {badge.label}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                              <span className="flex items-center gap-1.5">
                                <span className="font-bold font-heading text-lg" style={{ color: scoreColor }}>{content.currentScore.toFixed(1)}</span>
                                <span className="text-foreground-400">/ {content.targetScore}</span>
                              </span>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getPillBadge(content.conversionPotential)}`}>
                                <i className={`ri-download-2-line text-[10px]`} />
                                Conversion : {content.conversionPotential}
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
                                  <h5 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <i className="ri-error-warning-line text-xs" />
                                    Problèmes Détectés
                                  </h5>
                                  <ul className="space-y-1.5">
                                    {content.issues.map((issue, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-600">
                                        <i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0 text-xs" />
                                        {issue}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h5 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <i className="ri-check-double-line text-xs" />
                                    Recommandations Correctives
                                  </h5>
                                  <ul className="space-y-1.5">
                                    {content.recommendations.map((rec, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-600">
                                        <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0 text-xs" />
                                        {rec}
                                      </li>
                                    ))}
                                  </ul>
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
          </>
        )}

        {/* PHASE 2 — Diagnostic Stratégique */}
        {activeTab === 'diagnostic' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-4">
                  <i className="ri-search-eye-fill text-red-600 text-sm" />
                  <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">PHASE 2 — Diagnostic Stratégique</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  8 Problèmes Structurels Identifiés
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Chaque problème classé par criticité, impact business quantifié, et cause racine identifiée.
                </p>
              </div>

              {/* Critical Issues */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {DIAGNOSTIC_ISSUES.filter((d) => d.severity === 'critical').map((issue) => (
                  <div key={issue.id} className="rounded-2xl border border-red-200 bg-red-50/30 p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                        <i className={`${issue.icon} text-lg text-red-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 border border-red-200 text-red-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            CRITIQUE
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-foreground-950">{issue.category}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-foreground-600 leading-relaxed mb-3">{issue.description}</p>
                    <div className="flex items-start gap-2 pt-3 border-t border-red-100">
                      <i className="ri-money-dollar-circle-line text-red-500 mt-0.5 flex-shrink-0 text-sm" />
                      <span className="text-xs text-red-700 font-semibold leading-relaxed">{issue.impact}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Major Issues */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {DIAGNOSTIC_ISSUES.filter((d) => d.severity === 'major').map((issue) => (
                  <div key={issue.id} className="rounded-2xl border border-amber-200 bg-amber-50/30 p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <i className={`${issue.icon} text-amber-600 text-base`} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground-950">{issue.category}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-foreground-600 leading-relaxed mb-3">{issue.description}</p>
                    <p className="text-xs text-amber-700 font-semibold leading-relaxed">{issue.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PHASE 3 — Restructuration Intellectuelle */}
        {activeTab === 'restructuration' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-layout-masonry-fill text-amber-600 text-sm" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">PHASE 3 — Restructuration Intellectuelle</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Template 7 Étapes — Structure Obligatoire
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Chaque contenu KHEPRA doit suivre cette architecture intellectuelle pour atteindre le standard Big Four.
                </p>
              </div>

              <div className="space-y-4">
                {RESTRUCTURATION_STEPS.map((step, i) => (
                  <div key={i} className="rounded-2xl bg-white border border-background-200 hover:shadow-md transition-all overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-80 flex-shrink-0 p-6 flex flex-col items-center justify-center text-center" style={{ backgroundColor: `${step.color}08`, borderRight: i < RESTRUCTURATION_STEPS.length - 1 ? undefined : undefined }}>
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: `${step.color}20` }}>
                          <i className={`${step.icon} text-2xl`} style={{ color: step.color }} />
                        </div>
                        <span className="text-4xl font-bold font-heading mb-1" style={{ color: step.color }}>{step.step}</span>
                        <h3 className="font-heading text-lg font-bold text-foreground-950">{step.title}</h3>
                      </div>
                      <div className="flex-1 p-6">
                        <p className="text-sm text-foreground-600 leading-relaxed mb-4">{step.description}</p>
                        <div className="mb-4 rounded-xl bg-background-50 border border-background-100 p-3">
                          <span className="text-[10px] text-foreground-400 uppercase tracking-wider font-bold">Référence Big Four</span>
                          <p className="text-xs text-foreground-600 italic mt-1">{step.bigFourReference}</p>
                        </div>
                        <ul className="space-y-2">
                          {step.details.map((detail, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-foreground-600">
                              <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${step.color}15` }}>
                                <span className="text-[10px] font-bold" style={{ color: step.color }}>{j + 1}</span>
                              </span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {i < RESTRUCTURATION_STEPS.length - 1 && (
                      <div className="px-6 pb-4 flex justify-center">
                        <i className="ri-arrow-down-line text-foreground-300 text-xl" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PHASE 4 — Amélioration Think Tank */}
        {activeTab === 'thinktank' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-lightbulb-flash-fill text-emerald-600 text-sm" />
                  <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">PHASE 4 — Amélioration Think Tank</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Transformer les Idées en Capital Intellectuel Propriétaire
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Frameworks nommés, modèles réplicables, argumentation « decision-grade ». Contenu qui crée de la valeur.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                {/* Frameworks Propriétaires */}
                <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8">
                  <h3 className="font-heading text-xl font-bold text-foreground-950 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <i className="ri-trademark-line text-amber-600 text-lg" />
                    </div>
                    Frameworks Propriétaires KHEPRA™
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'KHEPRA Compliance Navigator™', desc: 'Framework 5 piliers pour naviguer la conformité BCEAO/COBAC. De l\'audit pré-inspection à la certification.', icon: 'ri-compass-line', color: '#0D7B5F' },
                      { name: 'KHEPRA Transfer Pricing Risk Matrix™', desc: 'Matrice 3x3 croisant risque fiscal et maturité documentation. Benchmarking automatisé BEPS Action 13.', icon: 'ri-grid-line', color: '#C05A3A' },
                      { name: 'KHEPRA Governance Maturity Model™', desc: 'Échelle 5 niveaux de maturité gouvernance alignée COSO 2013 + Circulaires BCEAO. Score 0-100 automatisé.', icon: 'ri-stairs-line', color: '#9B7B2C' },
                      { name: 'KHEPRA Due Diligence 360 Framework™', desc: 'Checklist 360° couvrant juridique, fiscal, financier, opérationnel, ESG. Template rapport 25 pages.', icon: 'ri-file-search-line', color: '#6B4A3A' },
                      { name: 'KHEPRA ESG Maturity Compass™', desc: 'Boussole ESG adaptée aux normes IFC Performance Standards + GRI. Score 5 dimensions. Roadmap d\'amélioration.', icon: 'ri-leaf-line', color: '#2D7A3A' },
                    ].map((fw, i) => (
                      <div key={i} className="rounded-xl bg-background-50 border border-background-100 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${fw.color}15` }}>
                            <i className={`${fw.icon} text-sm`} style={{ color: fw.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-foreground-950 mb-1">{fw.name}</h4>
                            <p className="text-xs text-foreground-600 leading-relaxed">{fw.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decision-Grade Content */}
                <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8">
                  <h3 className="font-heading text-xl font-bold text-foreground-950 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <i className="ri-bar-chart-2-line text-emerald-600 text-lg" />
                    </div>
                    Contenu « Decision-Grade »
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Argumentation Structurée', desc: 'Remplacer les affirmations par des chaînes logiques : Observation → Analyse → Insight → Recommandation. Chaque maillon sourcé.', icon: 'ri-git-branch-line' },
                      { label: 'Données Structurées', desc: 'Transformer les données brutes en visualisations décisionnelles. Chaque graphique répond à une question business précise.', icon: 'ri-pie-chart-line' },
                      { label: 'Citations Internes Cohérentes', desc: 'Créer un écosystème de références croisées entre contenus KHEPRA. « Comme démontré dans notre KHEPRA Compliance Navigator™... »', icon: 'ri-links-line' },
                      { label: 'Modèles Réplicables', desc: 'Chaque contenu doit contenir au moins un modèle que le lecteur peut réutiliser : checklist, template, matrice, calculateur.', icon: 'ri-file-copy-line' },
                      { label: 'Preuve de Méthodologie', desc: 'Expliciter systématiquement la méthodologie derrière chaque analyse. « Notre approche en 4 phases, testée sur 50+ missions... »', icon: 'ri-test-tube-line' },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl bg-background-50 border border-background-100 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-foreground-950 flex items-center justify-center flex-shrink-0">
                            <i className={`${item.icon} text-white text-sm`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-foreground-950 mb-1">{item.label}</h4>
                            <p className="text-xs text-foreground-600 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PHASE 4B — Révision Grammaticale KOS */}
        {activeTab === 'revision' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-edit-fill text-emerald-600 text-sm" />
                  <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">KOS Agents — Révision Grammaticale</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  {grammaticalReviewStats.totalErrors} Erreurs Corrigées — 24 Documents Audités
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Révision grammaticale complète par 4 agents KOS spécialisés. Livres Blancs, Publications Think Tank et pages du site.
                </p>
              </div>

              {/* Agents KOS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {reviewAgents.map((agent, i) => (
                  <div key={i} className="rounded-2xl bg-white border border-background-200 p-5 text-center hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${agent.color}15` }}>
                      <i className={`${agent.icon} text-xl`} style={{ color: agent.color }} />
                    </div>
                    <h4 className="text-sm font-bold text-foreground-950 mb-1">{agent.name}</h4>
                    <p className="text-xs text-foreground-500 mb-2">{agent.role}</p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${agent.color}12`, color: agent.color }}>
                      <i className="ri-check-double-line text-xs" />
                      {agent.items} corrections
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats Dashboard */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <span className="block text-3xl font-bold font-heading text-emerald-400">{grammaticalReviewStats.totalScanned}</span>
                    <span className="text-xs text-gray-400">Documents Scannés</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold font-heading text-red-400">{grammaticalReviewStats.totalErrors}</span>
                    <span className="text-xs text-gray-400">Erreurs Détectées</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold font-heading text-emerald-400">{grammaticalReviewStats.errorsFixed}</span>
                    <span className="text-xs text-gray-400">Corrigées</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold font-heading text-white">100%</span>
                    <span className="text-xs text-gray-400">Taux de Résolution</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                  {Object.entries(grammaticalReviewStats.byCategory).map(([cat, count]) => (
                    <div key={cat} className="text-center">
                      <span className="block text-lg font-bold text-gray-300">{count}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-sm font-semibold text-foreground-600">Filtrer par source :</span>
                {[
                  { id: 'all', label: 'Tous', count: grammaticalIssues.length },
                  { id: 'whitepaper', label: 'Livres Blancs', count: grammaticalIssues.filter(i => i.type === 'whitepaper').length },
                  { id: 'thinktank', label: 'Think Tank', count: grammaticalIssues.filter(i => i.type === 'thinktank' || i.type === 'page').length },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setRevisionFilter(f.id as typeof revisionFilter)}
                    className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                      revisionFilter === f.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white border border-background-200 text-foreground-600 hover:border-emerald-300 hover:text-emerald-700'
                    }`}
                  >
                    {f.label}
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${revisionFilter === f.id ? 'bg-white/20' : 'bg-background-100'}`}>
                      {f.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Corrections List */}
              <div className="space-y-3">
                {grammaticalIssues
                  .filter(i => revisionFilter === 'all' || i.type === revisionFilter || (revisionFilter === 'thinktank' && (i.type === 'thinktank' || i.type === 'page')))
                  .map((issue) => {
                    const isExpanded = expandedIssue === issue.id;
                    const severityBadge = issue.severity === 'critical'
                      ? { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' }
                      : issue.severity === 'major'
                        ? { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' }
                        : { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' };
                    const catLabel: Record<string, string> = { accord: 'Accord', anglicisme: 'Anglicisme', ponctuation: 'Ponctuation', style: 'Style', coherence: 'Cohérence', orthographe: 'Orthographe' };
                    return (
                      <div
                        key={issue.id}
                        className={`rounded-2xl border transition-all duration-300 ${
                          isExpanded ? 'border-emerald-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-emerald-200 hover:shadow-md'
                        }`}
                      >
                        <button
                          onClick={() => setExpandedIssue(isExpanded ? null : issue.id)}
                          className="w-full p-4 sm:p-5 text-left flex items-start gap-3 cursor-pointer"
                        >
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${severityBadge.dot}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-sm font-bold text-foreground-950">{issue.sourceTitle}</span>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${severityBadge.bg} ${severityBadge.border} ${severityBadge.text}`}>
                                {issue.severity === 'critical' ? 'CRITIQUE' : issue.severity === 'major' ? 'MAJEUR' : 'MINEUR'}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-background-100 border border-background-200 text-foreground-500 flex-shrink-0">
                                {catLabel[issue.category]}
                              </span>
                            </div>
                            <p className="text-xs text-foreground-500 mt-1 line-clamp-1">{issue.explanation}</p>
                          </div>
                          <div className="flex-shrink-0 pt-1">
                            <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-background-200 pt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="rounded-xl bg-red-50/50 border border-red-100 p-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-2 block">Avant Correction</span>
                                <p className="text-sm text-red-800 leading-relaxed line-through decoration-red-300">{issue.before}</p>
                              </div>
                              <div className="rounded-xl bg-emerald-50/50 border border-emerald-100 p-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2 block">Après Correction</span>
                                <p className="text-sm text-emerald-800 leading-relaxed">{issue.after}</p>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-background-100 flex items-start gap-2">
                              <i className="ri-information-line text-amber-500 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-foreground-500 leading-relaxed">{issue.explanation}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* Empty State */}
              {grammaticalIssues.filter(i => revisionFilter === 'all' || i.type === revisionFilter || (revisionFilter === 'thinktank' && (i.type === 'thinktank' || i.type === 'page'))).length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <i className="ri-edit-line text-2xl text-emerald-400" />
                  </div>
                  <p className="text-sm text-foreground-500">Aucune correction dans cette catégorie.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* PHASE 5 — Modules */}
        {activeTab === 'modules' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-200 mb-4">
                  <i className="ri-stack-fill text-secondary-600 text-sm" />
                  <span className="text-sm font-semibold text-secondary-900 uppercase tracking-wider">PHASE 5 — Modules d'Optimisation</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  4 Modules — Blog, White Paper, Outils, SEO/GEO/AEO
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Chaque module avec scoring actuel, cible Big Four, et recommandations correctives détaillées.
                </p>
              </div>

              {/* Module Selector */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {MODULE_CONTENT.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModule(mod.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      selectedModule === mod.id
                        ? 'text-white'
                        : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300 hover:text-foreground-900'
                    }`}
                    style={selectedModule === mod.id ? { backgroundColor: mod.color } : {}}
                  >
                    <i className={`${mod.icon} text-base`} />
                    {mod.name}
                  </button>
                ))}
              </div>

              {/* Active Module */}
              <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${activeModule.color}15` }}>
                    <i className={`${activeModule.icon} text-2xl`} style={{ color: activeModule.color }} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground-950">{activeModule.name}</h3>
                    <p className="text-sm text-foreground-500">{activeModule.items.length} axes d'optimisation</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeModule.items.map((item, i) => {
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
          </section>
        )}

        {/* TAB: SEO/GEO/AEO LIVRES BLANCS */}
        {activeTab === 'whitepapers-seo' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-brain-line text-amber-600 text-sm" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">PASSE SEO / GEO / AEO — 16 Livres Blancs</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Optimisation IA sur les 16 Livres Blancs Corrigés
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Contenu grammaticalement propre — maintenant on l'optimise pour les moteurs IA : Google SGE, ChatGPT, Perplexity, Claude, Gemini.
                </p>
              </div>

              {/* Global Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
                {[
                  { label: 'Livres Blancs', value: String(whitepaperQualityStats.total), icon: 'ri-book-2-line', color: '#D97757' },
                  { label: 'Score SEO Moy.', value: `${whitepaperQualityStats.avgSeo}/10`, icon: 'ri-search-line', color: '#4A7A1E' },
                  { label: 'Score GEO Moy.', value: `${whitepaperQualityStats.avgGeo}/10`, icon: 'ri-earth-line', color: '#9B7B2C' },
                  { label: 'Score AEO Moy.', value: `${whitepaperQualityStats.avgAeo}/10`, icon: 'ri-brain-line', color: '#C05A3A' },
                  { label: 'LLMs Readiness', value: `${whitepaperQualityStats.avgLlmsReadiness}%`, icon: 'ri-robot-line', color: '#C2410C' },
                  { label: 'Total FAQ', value: String(whitepaperQualityStats.totalFaq), icon: 'ri-question-answer-line', color: '#86BC25' },
                  { label: 'Total Entités', value: String(whitepaperQualityStats.totalEntities), icon: 'ri-links-line', color: '#5B8C2A' },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                      <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                    </div>
                    <span className="block text-lg font-bold text-foreground-950 font-heading">{s.value}</span>
                    <span className="text-[10px] text-foreground-400">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* SEO/GEO Best Practices */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8">
                  <h3 className="font-heading text-lg font-bold text-foreground-950 mb-5 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <i className="ri-earth-line text-emerald-600" />
                    </div>
                    GEO — Optimisations Prioritaires
                  </h3>
                  <ol className="space-y-3">
                    {geoOptimizationTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground-600">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-emerald-700">{i + 1}</span>
                        {tip}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8">
                  <h3 className="font-heading text-lg font-bold text-foreground-950 mb-5 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                      <i className="ri-brain-line text-amber-600" />
                    </div>
                    AEO — Optimisations Prioritaires
                  </h3>
                  <ol className="space-y-3">
                    {aeoOptimizationTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground-600">
                        <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-amber-700">{i + 1}</span>
                        {tip}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Whitepaper selector */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setSelectedWhitepaper(null)}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${!selectedWhitepaper ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-500 hover:border-foreground-300'}`}
                >
                  Tous les 16
                </button>
                {whitepaperSEOProfiles.slice(0, 8).map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => setSelectedWhitepaper(selectedWhitepaper === wp.id ? null : wp.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap truncate max-w-[180px] ${
                      selectedWhitepaper === wp.id ? 'bg-amber-600 text-white' : 'bg-white border border-background-200 text-foreground-500 hover:border-amber-300 hover:text-amber-700'
                    }`}
                    title={wp.title}
                  >
                    {wp.title.split(' — ')[0].substring(0, 30)}...
                  </button>
                ))}
              </div>

              {/* Whitepaper SEO Cards */}
              <div className="space-y-4">
                {whitepaperSEOProfiles
                  .filter((wp) => !selectedWhitepaper || wp.id === selectedWhitepaper)
                  .map((wp) => {
                    const isExpanded = selectedWhitepaper === wp.id || (expandedIssue === wp.id);
                    const llmsColor = wp.llmsReadiness >= 70 ? '#86BC25' : wp.llmsReadiness >= 50 ? '#E8C547' : '#C2410C';
                    return (
                      <div
                        key={wp.id}
                        className="rounded-2xl bg-white border border-background-200 hover:shadow-md transition-all overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedIssue(expandedIssue === wp.id ? null : wp.id)}
                          className="w-full p-5 text-left flex items-start gap-4 cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                            <i className="ri-book-2-line text-amber-600 text-lg" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-foreground-950 line-clamp-2 mb-2">{wp.title}</h3>
                            <div className="flex flex-wrap gap-2">
                              {[
                                { label: 'SEO', value: `${wp.seoScore}/10`, color: '#4A7A1E' },
                                { label: 'GEO', value: `${wp.geoScore}/10`, color: '#9B7B2C' },
                                { label: 'AEO', value: `${wp.aeoScore}/10`, color: '#C05A3A' },
                                { label: 'LLMs', value: `${wp.llmsReadiness}%`, color: llmsColor },
                                { label: 'FAQ', value: String(wp.faqItems.length), color: '#86BC25' },
                                { label: 'Entités', value: String(wp.entities.length), color: '#5B8C2A' },
                              ].map((s) => (
                                <span key={s.label} className="text-[10px] px-2 py-1 rounded-full font-bold" style={{ backgroundColor: `${s.color}12`, color: s.color, border: `1px solid ${s.color}25` }}>
                                  {s.label} {s.value}
                                </span>
                              ))}
                            </div>
                          </div>
                          <i className={`ri-${expandedIssue === wp.id ? 'subtract' : 'add'}-line text-foreground-400 text-lg flex-shrink-0`} />
                        </button>

                        {expandedIssue === wp.id && (
                          <div className="px-5 pb-5 border-t border-background-200 pt-4">
                            {/* Meta Title & Description */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
                              <div className="rounded-xl bg-background-50 border border-background-100 p-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-2">Meta Title Optimisé</span>
                                <p className="text-sm text-foreground-900 font-semibold">{wp.metaTitle}</p>
                              </div>
                              <div className="rounded-xl bg-background-50 border border-background-100 p-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-2">Meta Description Optimisée</span>
                                <p className="text-xs text-foreground-600">{wp.metaDescription}</p>
                              </div>
                            </div>

                            {/* AEO Summary */}
                            <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 mb-5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-2">Résumé AEO — Réponse pour Moteurs IA</span>
                              <p className="text-sm text-foreground-700 leading-relaxed">{wp.aeoSummary}</p>
                            </div>

                            {/* Keywords & Entities */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-2">Mots-Clés SEO ({wp.keywords.length})</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {wp.keywords.map((kw, j) => (
                                    <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">{kw}</span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-2">Mots-Clés GEO ({wp.geoKeywords.length})</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {wp.geoKeywords.map((kw, j) => (
                                    <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700">{kw}</span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-2">Entités Sémantiques ({wp.entities.length})</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {wp.entities.map((e, j) => (
                                    <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-100 border border-secondary-200 text-secondary-900">{e.name}</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* FAQ Items */}
                            {wp.faqItems.length > 0 && (
                              <div className="mb-5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-3">FAQ Schema.org ({wp.faqItems.length} questions)</span>
                                <div className="space-y-2">
                                  {wp.faqItems.map((faq, j) => (
                                    <div key={j} className="rounded-xl bg-background-50 border border-background-100 p-3">
                                      <p className="text-xs font-bold text-foreground-900 mb-1">{faq.question}</p>
                                      <p className="text-xs text-foreground-600">{faq.answer}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* GEO/AEO Optimizations */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-2">Actions GEO Prioritaires</span>
                                {wp.geoOptimizations.map((opt, j) => (
                                  <p key={j} className="text-xs text-foreground-600 mb-1 flex items-start gap-1.5">
                                    <i className="ri-arrow-right-line text-emerald-500 mt-0.5 flex-shrink-0" />{opt}
                                  </p>
                                ))}
                              </div>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-2">Actions AEO Prioritaires</span>
                                {wp.aeoOptimizations.map((opt, j) => (
                                  <p key={j} className="text-xs text-foreground-600 mb-1 flex items-start gap-1.5">
                                    <i className="ri-arrow-right-line text-amber-500 mt-0.5 flex-shrink-0" />{opt}
                                  </p>
                                ))}
                              </div>
                            </div>

                            {/* Schema.org types */}
                            <div className="mt-4 pt-4 border-t border-background-100 flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">Schema.org :</span>
                              {wp.schemaOrgTypes.map((s, j) => (
                                <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-foreground-950 text-white font-mono">{s}</span>
                              ))}
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

        {/* TAB: SCORE QUALITÉ AUTO */}
        {activeTab === 'whitepapers-score' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-4">
                  <i className="ri-shield-check-fill text-red-600 text-sm" />
                  <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">SCORE QUALITÉ — Seuil de Publication : {qualityThreshold}/100</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Système de Score Qualité — Blocage Automatique si &lt; {qualityThreshold}
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Chaque livre blanc reçoit un score sur 100. Publication automatiquement bloquée si le score est inférieur à {qualityThreshold}/100.
                </p>
              </div>

              {/* Blocking Banner */}
              {scoreStats.blocked > 0 && (
                <div className="rounded-3xl bg-red-50 border border-red-300 p-6 mb-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0">
                        <i className="ri-lock-line text-red-600 text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-bold text-foreground-950">
                          {scoreStats.blocked} / {scoreStats.total} Livres Blancs Bloqués
                        </h3>
                        <p className="text-sm text-red-700">
                          Publication impossible — Score inférieur au seuil de {qualityThreshold}/100. Des corrections sont nécessaires avant diffusion.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={runGlobalScan}
                      disabled={scoreLoading}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white font-bold text-sm hover:bg-red-500 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                    >
                      {scoreLoading ? (
                        <><i className="ri-loader-4-line animate-spin" />Scan en cours...</>
                      ) : (
                        <><i className="ri-radar-line" />Scanner tous les LB</>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Score Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
                {[
                  { label: 'Total LB', value: String(scoreStats.total), icon: 'ri-book-2-line', color: '#9B7B2C' },
                  { label: 'Bloqués (<95)', value: String(scoreStats.blocked), icon: 'ri-lock-line', color: '#C2410C' },
                  { label: 'À Finaliser', value: String(scoreStats.pending), icon: 'ri-time-line', color: '#E8C547' },
                  { label: 'Approuvés (95+)', value: String(scoreStats.approved), icon: 'ri-checkbox-circle-line', color: '#86BC25' },
                  { label: 'Score Moy.', value: `${scoreStats.avgScore}/100`, icon: 'ri-bar-chart-line', color: '#D97757' },
                  { label: 'LLMs Moy.', value: `${scoreStats.avgLlmsReadiness}%`, icon: 'ri-robot-line', color: '#C05A3A' },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                      <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                    </div>
                    <span className="block text-lg font-bold text-foreground-950 font-heading">{s.value}</span>
                    <span className="text-[10px] text-foreground-400">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Score Threshold Visual */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <i className="ri-lock-2-line text-red-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold">Seuil de Publication : {qualityThreshold}/100</h3>
                    <p className="text-xs text-gray-400">Blocage automatique — aucun livre blanc ne peut être publié si son score est inférieur à {qualityThreshold}</p>
                  </div>
                </div>
                <div className="relative h-8 rounded-full bg-white/10 overflow-hidden mb-3">
                  <div className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500" style={{ width: '100%' }} />
                  <div className="absolute top-0 h-full border-r-2 border-white" style={{ left: `${qualityThreshold}%` }} />
                  <div className="absolute top-1/2 -translate-y-1/2" style={{ left: `${qualityThreshold}%`, transform: 'translateX(-50%) translateY(-50%)' }}>
                    <div className="w-4 h-8 bg-white rounded-sm" />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0</span>
                  <span className="font-bold text-white">{qualityThreshold} ← Seuil Blocage</span>
                  <span>100</span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-sm font-semibold text-foreground-600">Filtrer :</span>
                {[
                  { id: 'all', label: 'Tous', count: scoreStats.total },
                  { id: 'blocked', label: 'Bloqués', count: scoreStats.blocked },
                  { id: 'pending', label: 'À Finaliser', count: scoreStats.pending },
                  { id: 'approved', label: 'Approuvés', count: scoreStats.approved },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setScoreFilter(f.id as typeof scoreFilter)}
                    className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                      scoreFilter === f.id
                        ? f.id === 'blocked' ? 'bg-red-600 text-white'
                          : f.id === 'approved' ? 'bg-emerald-600 text-white'
                          : 'bg-foreground-950 text-white'
                        : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                    }`}
                  >
                    {f.label}
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">{f.count}</span>
                  </button>
                ))}
              </div>

              {/* Score Cards */}
              <div className="space-y-3">
                {scores
                  .filter((s) => {
                    if (scoreFilter === 'blocked') return s.status === 'blocked';
                    if (scoreFilter === 'pending') return s.status === 'pending';
                    if (scoreFilter === 'approved') return s.status === 'approved';
                    return true;
                  })
                  .map((result) => {
                    const isExpanded = expandedScore === result.profile.id;
                    const scoreColor = getScoreColor(result.totalScore);
                    const scoreLabel = getScoreLabel(result.totalScore);
                    const scoreBg = getScoreBg(result.totalScore);
                    const isScanning = scanning === result.profile.id;
                    return (
                      <div
                        key={result.profile.id}
                        className={`rounded-2xl border transition-all ${
                          isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="p-4 sm:p-5 flex items-center gap-4">
                          {/* Score Circle */}
                          <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 ${scoreBg}`}>
                            <span className="text-xl font-bold font-heading" style={{ color: scoreColor }}>{result.totalScore}</span>
                            <span className="text-[9px] font-bold uppercase" style={{ color: scoreColor }}>/{qualityThreshold}</span>
                          </div>

                          {/* Title & Status */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="text-sm font-bold text-foreground-950 truncate max-w-[400px]">{result.profile.title}</h4>
                              <span
                                className="text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0"
                                style={{ backgroundColor: `${scoreColor}12`, color: scoreColor, border: `1px solid ${scoreColor}30` }}
                              >
                                {result.status === 'blocked' && <i className="ri-lock-line mr-1" />}
                                {result.status === 'approved' && <i className="ri-check-line mr-1" />}
                                {scoreLabel}
                              </span>
                              {result.profile.publicationBlocked && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-50 border border-red-200 text-red-700">
                                  <i className="ri-lock-line mr-1" />Publication Bloquée
                                </span>
                              )}
                            </div>
                            {/* Score Bar */}
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 rounded-full bg-background-100 overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-700"
                                  style={{ width: `${result.totalScore}%`, backgroundColor: scoreColor }}
                                />
                              </div>
                              <span className="text-xs font-bold whitespace-nowrap" style={{ color: scoreColor }}>
                                {result.totalScore}/100
                              </span>
                              {result.status !== 'approved' && (
                                <span className="text-[10px] text-foreground-400 whitespace-nowrap">
                                  {result.missingPoints} pts manquants
                                </span>
                              )}
                            </div>
                            {/* Dimension mini-bars */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {[
                                { label: 'SEO', value: result.profile.seoScore, max: 10 },
                                { label: 'GEO', value: result.profile.geoScore, max: 10 },
                                { label: 'AEO', value: result.profile.aeoScore, max: 10 },
                                { label: 'LLMs', value: result.profile.llmsReadiness, max: 100 },
                              ].map((d) => {
                                const pct = d.label === 'LLMs' ? d.value : (d.value / d.max) * 100;
                                const c = pct >= 70 ? '#86BC25' : pct >= 50 ? '#E8C547' : '#C2410C';
                                return (
                                  <span key={d.label} className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${c}12`, color: c, border: `1px solid ${c}25` }}>
                                    {d.label} {d.label === 'LLMs' ? `${d.value}%` : `${d.value}/10`}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => runQualityScan(result.profile.id)}
                              disabled={isScanning}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border border-background-200 text-foreground-500 hover:bg-background-100 cursor-pointer transition-all whitespace-nowrap disabled:opacity-50"
                            >
                              {isScanning ? (
                                <><i className="ri-loader-4-line animate-spin" />Scan...</>
                              ) : (
                                <><i className="ri-radar-line" />Re-scanner</>
                              )}
                            </button>
                            <button
                              onClick={() => setExpandedScore(isExpanded ? null : result.profile.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-background-100 hover:bg-background-200 cursor-pointer transition-all"
                            >
                              <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-sm`} />
                            </button>
                          </div>
                        </div>

                        {/* Expanded: Improvement Plan */}
                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-background-200 pt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                              {/* Dimensions Detail */}
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">Scores par Dimension</h5>
                                <div className="space-y-2">
                                  {result.profile.dimensions.map((dim) => {
                                    const pct = (dim.score / dim.maxScore) * 100;
                                    const dimColor = pct >= 70 ? '#86BC25' : pct >= 50 ? '#E8C547' : '#C2410C';
                                    return (
                                      <div key={dim.id} className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${dimColor}15` }}>
                                          <i className={`${dim.icon} text-xs`} style={{ color: dimColor }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-[10px] font-semibold text-foreground-600">{dim.name}</span>
                                            <span className="text-[10px] font-bold" style={{ color: dimColor }}>{dim.score}/{dim.maxScore}</span>
                                          </div>
                                          <div className="w-full h-1.5 rounded-full bg-background-100 overflow-hidden">
                                            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: dimColor }} />
                                          </div>
                                        </div>
                                        <span className="text-[9px] text-foreground-400 flex-shrink-0">×{dim.weight}%</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Improvement Plan */}
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">Plan d'Amélioration</h5>
                                {result.improvementPlan.length > 0 ? (
                                  <div className="space-y-2">
                                    {result.improvementPlan.map((action, j) => (
                                      <div key={j} className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                                        <i className="ri-arrow-right-line text-amber-500 mt-0.5 flex-shrink-0 text-xs" />
                                        <p className="text-xs text-foreground-600 leading-relaxed">{action}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                                    <i className="ri-checkbox-circle-line text-emerald-500 text-2xl block mb-2" />
                                    <p className="text-sm font-bold text-emerald-700">Score optimal — Publication approuvée</p>
                                  </div>
                                )}
                                {result.profile.publicationBlocked && (
                                  <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2">
                                    <i className="ri-lock-2-line text-red-500 text-lg flex-shrink-0" />
                                    <div>
                                      <p className="text-xs font-bold text-red-700">Publication Bloquée</p>
                                      <p className="text-[10px] text-red-600">Résoudre les dimensions critiques pour atteindre {qualityThreshold}/100 et débloquer la publication.</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* Scoring System Explainer */}
              <div className="mt-10 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <i className="ri-settings-3-line text-amber-400 text-lg" />
                  </div>
                  <h3 className="font-heading text-lg font-bold">Système de Score Qualité — Fonctionnement</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Score sur 100', desc: '9 dimensions pondérées : Grammaire (10%), Structure (15%), SEO (15%), GEO/AEO (15%), Lisibilité (10%), Originalité (10%), Citations (10%), Conversion (10%), Marque (5%).', icon: 'ri-bar-chart-line' },
                    { title: 'Blocage Auto < 95', desc: `Tout livre blanc avec un score inférieur à ${qualityThreshold}/100 est automatiquement bloqué pour publication. Le système affiche "Publication Bloquée" et génère un plan d'amélioration.`, icon: 'ri-lock-2-line' },
                    { title: 'Re-scan à Tout Moment', desc: 'Après corrections, cliquer sur "Re-scanner" pour réévaluer le livre blanc. Le score est mis à jour instantanément et le blocage levé si le seuil est atteint.', icon: 'ri-radar-line' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl bg-white/8 border border-white/10 p-4">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
                        <i className={`${item.icon} text-amber-400 text-sm`} />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">{item.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BLOC 2 — Legal Validation Engine */}
        {activeTab === 'legal-validation' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-4">
                  <i className="ri-scales-3-fill text-red-600 text-sm" />
                  <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">BLOC 2 — Legal Validation Engine™</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  {LEGAL_VALIDATION_STATS.totalScans} Contenus Scannés — {LEGAL_VALIDATION_STATS.totalIssues} Issues Détectées
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Audit juridique automatique : promesses non démontrables, affirmations absolues, garanties abusives, risques réputationnels. Workflow : Scan → Score → Approbation/Blocage.
                </p>
              </div>

              {/* Stats Dashboard */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  <div className="text-center"><span className="block text-3xl font-bold font-heading text-white">{LEGAL_VALIDATION_STATS.totalScans}</span><span className="text-xs text-gray-400">Scans</span></div>
                  <div className="text-center"><span className="block text-3xl font-bold font-heading text-emerald-400">{LEGAL_VALIDATION_STATS.approved}</span><span className="text-xs text-gray-400">Approuvés</span></div>
                  <div className="text-center"><span className="block text-3xl font-bold font-heading text-amber-400">{LEGAL_VALIDATION_STATS.reviewRequired}</span><span className="text-xs text-gray-400">Revue Requise</span></div>
                  <div className="text-center"><span className="block text-3xl font-bold font-heading text-red-400">{LEGAL_VALIDATION_STATS.blocked}</span><span className="text-xs text-gray-400">Bloqués</span></div>
                  <div className="text-center"><span className="block text-3xl font-bold font-heading text-red-400">{LEGAL_VALIDATION_STATS.criticalIssues}</span><span className="text-xs text-gray-400">Critiques</span></div>
                  <div className="text-center"><span className="block text-3xl font-bold font-heading text-amber-400">{LEGAL_VALIDATION_STATS.avgRiskScore}%</span><span className="text-xs text-gray-400">Score Risque</span></div>
                  <div className="text-center"><span className="block text-3xl font-bold font-heading text-emerald-400">{LEGAL_VALIDATION_STATS.targetScore}%</span><span className="text-xs text-gray-400">Cible</span></div>
                </div>
              </div>

              {/* Risk Categories */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {LEGAL_RISK_CATEGORIES.map((cat) => {
                  const pct = (cat.score / cat.maxScore) * 100;
                  const color = pct >= 90 ? '#86BC25' : pct >= 80 ? '#E8C547' : '#C2410C';
                  return (
                    <button key={cat.id} onClick={() => setLegalCategoryFilter(legalCategoryFilter === cat.id ? 'all' : cat.id)}
                      className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${legalCategoryFilter === cat.id ? 'border-foreground-400 bg-background-50' : 'border-background-200 bg-white hover:shadow-md'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <i className={`${cat.icon} text-sm`} style={{ color }} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400">{cat.issues} issues</span>
                      </div>
                      <h4 className="text-xs font-bold text-foreground-950 mb-1">{cat.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-background-100 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color }}>{cat.score}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legal Review Workflow */}
              <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8 mb-10">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-1 flex items-center gap-2">
                  <i className="ri-git-branch-line text-foreground-600" /> Legal Review Workflow
                </h3>
                <p className="text-xs text-foreground-500 mb-6">Circuit de validation juridique automatique — chaque contenu scanné suit ce workflow.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {LEGAL_REVIEW_STAGES.map((stage, i) => (
                    <div key={stage.id} className="rounded-2xl border p-4 text-center" style={{ borderColor: `${stage.color}30`, backgroundColor: `${stage.color}05` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${stage.color}15` }}>
                        <i className={`${stage.icon} text-lg`} style={{ color: stage.color }} />
                      </div>
                      <h5 className="text-xs font-bold text-foreground-950 mb-0.5">{stage.name}</h5>
                      <span className="text-[10px] font-bold" style={{ color: stage.color }}>{stage.threshold}</span>
                      <p className="text-[10px] text-foreground-400 mt-1 leading-relaxed">{stage.description}</p>
                      <span className="text-[9px] text-foreground-300 italic block mt-2">{stage.approver}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Scans */}
              <div className="space-y-3">
                {LEGAL_CONTENT_SCANS.filter(s => legalCategoryFilter === 'all' || s.category === legalCategoryFilter).map((scan) => {
                  const isExpanded = expandedLegalScan === scan.id;
                  const riskColor = scan.riskScore >= 90 ? '#86BC25' : scan.riskScore >= 75 ? '#E8C547' : '#C2410C';
                  const statusBadge = scan.status === 'approved' ? { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Approuvé', dot: 'bg-emerald-500' }
                    : scan.status === 'blocked' ? { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Bloqué', dot: 'bg-red-500' }
                    : { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'En Revue', dot: 'bg-amber-500' };
                  return (
                    <div key={scan.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:shadow-md'}`}>
                      <button onClick={() => setExpandedLegalScan(isExpanded ? null : scan.id)} className="w-full p-4 sm:p-5 text-left flex items-center gap-4 cursor-pointer">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: `${riskColor}15` }}>
                          <span className="text-lg font-bold font-heading" style={{ color: riskColor }}>{scan.riskScore}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="text-sm font-bold text-foreground-950">{scan.title}</h4>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />{statusBadge.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-foreground-400">
                            <span>{scan.url}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-100 border border-background-200">{scan.issues.length} issue{scan.issues.length !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg flex-shrink-0`} />
                      </button>
                      {isExpanded && scan.issues.length > 0 && (
                        <div className="px-5 pb-5 border-t border-background-200 pt-4">
                          <div className="space-y-3">
                            {scan.issues.map((issue, j) => {
                              const sevColor = issue.severity === 'critical' ? '#C2410C' : issue.severity === 'major' ? '#D97738' : '#E8C547';
                              return (
                                <div key={j} className="rounded-xl border p-4" style={{ borderColor: `${sevColor}20`, backgroundColor: `${sevColor}03` }}>
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${sevColor}12`, color: sevColor, border: `1px solid ${sevColor}30` }}>
                                      {issue.severity === 'critical' ? 'CRITIQUE' : issue.severity === 'major' ? 'MAJEUR' : 'MINEUR'}
                                    </span>
                                    <span className="text-[10px] text-foreground-400">{issue.category}</span>
                                  </div>
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    <div className="rounded-lg bg-red-50/50 border border-red-100 p-3">
                                      <span className="text-[9px] font-bold uppercase text-red-500 block mb-1">Avant</span>
                                      <p className="text-xs text-red-800 leading-relaxed line-through decoration-red-300">{issue.before}</p>
                                    </div>
                                    <div className="rounded-lg bg-emerald-50/50 border border-emerald-100 p-3">
                                      <span className="text-[9px] font-bold uppercase text-emerald-600 block mb-1">Après</span>
                                      <p className="text-xs text-emerald-800 leading-relaxed">{issue.after}</p>
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-foreground-500 mt-2 leading-relaxed flex items-start gap-1.5">
                                    <i className="ri-information-line text-amber-500 mt-0.5 flex-shrink-0" />{issue.explanation}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Example Transformations */}
              <div className="mt-10 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white">
                <h3 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
                  <i className="ri-magic-line text-amber-400" /> Transformations Appliquées
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {LEGAL_CORRECTIONS_EXAMPLES.map((ex, i) => (
                    <div key={i} className="rounded-xl bg-white/8 border border-white/10 p-4">
                      <span className="text-[9px] font-bold uppercase text-amber-400 block mb-2">{ex.category}</span>
                      <p className="text-xs text-red-300 line-through decoration-red-500 mb-2">{ex.before}</p>
                      <p className="text-xs text-emerald-300">{ex.after}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BLOC 12 — Scoring Unifié 12 Blocs KOS Enterprise */}
        {activeTab === 'scoring-12-blocs' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-dashboard-fill text-amber-600 text-sm" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">BLOC 12 — Executive Control Tower™</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Score de Maturité — 12 Blocs Fondateurs KOS Enterprise
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Dashboard unifié des 12 blocs du programme de transformation Big Four. Score actuel moyen <strong className="text-foreground-950">{(SCORING_12_BLOCS.reduce((a, b) => a + b.score, 0) / 12).toFixed(1)}/100</strong> — Cible <strong className="text-foreground-950">95/100</strong> à J+90.
                </p>
              </div>

              {/* Global Score Gauge */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-10">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0 relative w-40 h-40 flex items-center justify-center">
                    <svg viewBox="0 0 120 120" className="w-40 h-40 -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#86BC25" strokeWidth="8" strokeDasharray={`${(SCORING_12_BLOCS.reduce((a, b) => a + b.score, 0) / 12) * 3.14} 314`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold font-heading text-emerald-400">{(SCORING_12_BLOCS.reduce((a, b) => a + b.score, 0) / 12).toFixed(1)}</span>
                      <span className="text-[10px] text-gray-400">/100</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold mb-4">Score de Maturité Global KOS</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { label: 'Blocs ≥ 95', value: String(SCORING_12_BLOCS.filter(b => b.score >= 95).length), color: '#86BC25' },
                        { label: 'Blocs ≥ 90', value: String(SCORING_12_BLOCS.filter(b => b.score >= 90).length), color: '#E8C547' },
                        { label: 'Blocs < 90', value: String(SCORING_12_BLOCS.filter(b => b.score < 90).length), color: '#C2410C' },
                        { label: 'Score Min', value: String(Math.min(...SCORING_12_BLOCS.map(b => b.score))), color: '#D97738' },
                        { label: 'Score Max', value: String(Math.max(...SCORING_12_BLOCS.map(b => b.score))), color: '#86BC25' },
                        { label: 'Cible J+90', value: '95', color: '#0D7B5F' },
                      ].map((s, i) => (
                        <div key={i} className="rounded-xl bg-white/8 border border-white/10 p-3 text-center">
                          <span className="block text-lg font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                          <span className="text-[10px] text-gray-400">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 12 Blocs Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                {SCORING_12_BLOCS.map((bloc) => {
                  const pct = bloc.score;
                  const color = pct >= 93 ? '#86BC25' : pct >= 88 ? '#E8C547' : pct >= 83 ? '#D97738' : '#C2410C';
                  const isExpanded = expandedBloc === bloc.id;
                  return (
                    <div key={bloc.id} className={`rounded-2xl border transition-all cursor-pointer ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:shadow-md'}`}
                      onClick={() => setExpandedBloc(isExpanded ? null : bloc.id)}>
                      <div className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${bloc.color}15` }}>
                            <i className={`${bloc.icon} text-lg`} style={{ color: bloc.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[9px] font-bold text-foreground-400">BLOC {bloc.id}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${color}12`, color, border: `1px solid ${color}25` }}>
                                {bloc.status === 'proche' ? 'Proche Cible' : 'En Progression'}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-foreground-950">{bloc.name}</h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 h-2 rounded-full bg-background-100 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                          </div>
                          <span className="text-sm font-bold font-heading" style={{ color }}>{bloc.score}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-foreground-400">
                          <span>Cible : {bloc.target}</span>
                          <span>{bloc.modules} modules · {bloc.agents} agents</span>
                        </div>
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-background-100">
                            <div className="flex items-center gap-2 text-[10px] text-foreground-500 mb-2">
                              <i className="ri-link text-xs" />
                              <span>{bloc.hub}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-foreground-400">Progression :</span>
                              <div className="flex-1 h-1.5 rounded-full bg-background-100 overflow-hidden">
                                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(bloc.score / bloc.target) * 100}%` }} />
                              </div>
                              <span className="text-[10px] font-bold" style={{ color }}>{Math.round((bloc.score / bloc.target) * 100)}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Maturity Matrix */}
              <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8 mb-10">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-1 flex items-center gap-2">
                  <i className="ri-bar-chart-grouped-line" style={{ color: '#0D7B5F' }} /> Matrice de Maturité — Score Actuel vs Cible
                </h3>
                <p className="text-xs text-foreground-500 mb-6">Visualisation comparative des 12 blocs entre leur score actuel et leur cible.</p>
                <div className="space-y-3">
                  {SCORING_12_BLOCS.map((bloc) => (
                    <div key={bloc.id} className="flex items-center gap-4">
                      <div className="w-32 flex-shrink-0 flex items-center gap-2">
                        <span className="text-[10px] font-bold text-foreground-400">{bloc.id}.</span>
                        <span className="text-xs font-bold text-foreground-700 truncate">{bloc.name}</span>
                      </div>
                      <div className="flex-1 relative h-6 rounded-full bg-background-50 overflow-hidden">
                        <div className="absolute top-0 left-0 h-full rounded-full opacity-90" style={{ width: `${bloc.score}%`, backgroundColor: bloc.color }} />
                        <div className="absolute top-0 h-full w-0.5 bg-foreground-950" style={{ left: `${bloc.target}%` }} />
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-bold font-heading" style={{ color: bloc.color }}>{bloc.score}</span>
                        <span className="text-[10px] text-foreground-400">→ {bloc.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roadmap */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white">
                <h3 className="font-heading text-xl font-bold mb-5 flex items-center gap-2">
                  <i className="ri-road-map-line text-emerald-400" /> Feuille de Route 30 / 90 / 180 / 365 Jours
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {ROADMAP_30_90_180_365.map((phase, i) => {
                    const colors = ['#C2410C', '#E8C547', '#86BC25', '#0D7B5F'];
                    return (
                      <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: `${colors[i]}15`, border: `1px solid ${colors[i]}30` }}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors[i]}20` }}>
                            <span className="text-sm font-bold" style={{ color: colors[i] }}>{i + 1}</span>
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white">{phase.phase}</span>
                            <span className="block text-lg font-heading" style={{ color: colors[i] }}>/{phase.target}</span>
                          </div>
                        </div>
                        <ul className="space-y-1.5 mt-3">
                          {phase.actions.map((action, j) => (
                            <li key={j} className="text-[10px] text-gray-300 flex items-start gap-1.5 leading-relaxed">
                              <i className="ri-arrow-right-line mt-0.5 flex-shrink-0" style={{ color: colors[i] }} />{action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
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
                  Tickets de Correction — Content Correction
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Système unifié de suivi des corrections de contenu. Prendre en charge → Résoudre → Tracer.
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
                engineTitle="Content Correction Engine"
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
              src="https://readdy.ai/api/search-image?query=abstract%20sophisticated%20dark%20command%20center%20with%20warm%20golden%20and%20emerald%20editorial%20refinement%20patterns%2C%20precise%20annotation%20marks%20and%20structured%20document%20layers%20flowing%20into%20conversion%20funnel%20visualization%2C%20premium%20publishing%20atmosphere%20with%20intellectual%20authority%20aesthetic%2C%20no%20text%20no%20human%20figures%2C%20clean%20orchestrated%20composition%20with%20layered%20manuscript%20and%20data%20flow%20elements&width=1920&height=400&seq=kos-content-conversion-bg&orientation=landscape"
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-4">
                  <i className="ri-flashlight-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Module Conversion — Chaque Contenu Devient un Lead Magnet</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                  Transformer le Contenu en Pipeline Commercial
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  CTA intelligent vers diagnostic, audit gratuit ou lead magnet téléchargeable. Scoring system intégré. Connexion CRM automatique. Chaque contenu = un point d'entrée funnel qualifié.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'CTA Contextuel', icon: 'ri-download-2-line' },
                    { label: 'Diagnostic Associé', icon: 'ri-stethoscope-line' },
                    { label: 'Scoring System', icon: 'ri-bar-chart-line' },
                    { label: 'Lien Offre Commerciale', icon: 'ri-briefcase-line' },
                  ].map((tag) => (
                    <span key={tag.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs">
                      <i className={`${tag.icon} text-emerald-400`} />
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/kos-unified-autopilot"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-foreground-950 font-bold text-sm hover:bg-emerald-400 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-radar-line" />
                  Growth Orchestrator
                </a>
                <a
                  href="/kos-autonomous-quality-system"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white font-bold text-sm hover:bg-white/25 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-shield-check-line" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

    </hubLayout>
  );
}





