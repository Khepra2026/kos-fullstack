// KOS Website Automation Engine™ — Fully Dynamic Compliance Website Generator
// Generates 7 full website deliverables automatically
// Inputs: Institution type, Regulatory scope, Target audience

export interface WebsiteScenario {
  id: string;
  nom: string;
  type_institution: 'Banque' | 'EMF' | 'FinTech' | 'Multi-Service';
  zone: string;
  scope_reglementaire: string[];
  public_cible: string;
  description: string;
  pages_attendues: number;
  complexite: 'Standard' | 'Avancée' | 'Premium';
}

export interface SiteArchitecture {
  structure: {
    nom: string;
    pages: SitePage[];
    modules_globaux: GlobalModule[];
    navigation: NavigationStructure;
  };
  arborescence_url: string[];
  sitemap_preview: string;
}

export interface SitePage {
  id: string;
  titre: string;
  url: string;
  type: 'landing' | 'service' | 'tool' | 'resource' | 'contact' | 'legal' | 'blog';
  priorite: 'P0' | 'P1' | 'P2';
  modules: string[];
  conversion_goal: string;
  meta_description: string;
}

export interface GlobalModule {
  nom: string;
  description: string;
  pages_concernees: string;
  regles_affichage: string;
}

export interface NavigationStructure {
  menu_principal: { label: string; url: string; enfants?: { label: string; url: string }[] }[];
  footer_links: { categorie: string; liens: { label: string; url: string }[] }[];
  cta_sticky: { texte: string; url: string; position: string };
}

export interface DynamicContentRules {
  regles_par_type_utilisateur: UserTypeRule[];
  personalisation_contenu: PersonalisationRule[];
  ab_testing: ABTestConfig[];
  geolocalisation: GeoRule[];
}

export interface UserTypeRule {
  type_utilisateur: string;
  detection: string;
  pages_adaptees: string;
  contenu_specifique: string[];
  call_to_action: string;
  offre_prioritaire: string;
}

export interface PersonalisationRule {
  declencheur: string;
  action: string;
  variante: string;
  impact_conversion: string;
}

export interface ABTestConfig {
  element: string;
  variante_a: string;
  variante_b: string;
  metrique: string;
  duree_test: string;
}

export interface GeoRule {
  pays: string;
  pages_specifiques: string[];
  langue: string;
  reglementation_locale: string;
  offre_locale: string;
}

export interface LeadGenerationFlows {
  flows: LeadFlow[];
  lead_magnets: LeadMagnet[];
  popups: PopupConfig[];
  email_sequences: EmailSequence[];
}

export interface LeadFlow {
  id: string;
  nom: string;
  declencheur: string;
  etapes: string[];
  taux_conversion_estime: number;
  pages_cibles: string[];
}

export interface LeadMagnet {
  id: string;
  type: 'checklist' | 'guide' | 'diagnostic' | 'webinar' | 'template' | 'rapport';
  titre: string;
  valeur_percue: string;
  pages_affichage: string[];
  champs_formulaire: string[];
}

export interface PopupConfig {
  type: 'exit-intent' | 'scroll-50' | 'time-delay' | 'click-trigger';
  declencheur: string;
  offre: string;
  design: string;
  frequence_max: string;
}

export interface EmailSequence {
  nom: string;
  declencheur: string;
  nombre_emails: number;
  objectif: string;
  emails: { jour: number; sujet: string; contenu_key: string }[];
}

export interface DiagnosticToolsLogic {
  outils: DiagnosticTool[];
  scoring: ScoringEngine;
  rapport: ReportConfig;
  integration_n8n: N8nTrigger[];
}

export interface DiagnosticTool {
  id: string;
  nom: string;
  type: 'quiz' | 'questionnaire' | 'simulateur' | 'scanner';
  nombre_questions: number;
  duree_estimee: string;
  resultats_possibles: string[];
  pages_affichage: string[];
}

export interface ScoringEngine {
  methode: string;
  ponderations: { axe: string; poids_pct: number; questions: string[] }[];
  seuils: { label: string; min: number; max: number; action: string; couleur: string }[];
}

export interface ReportConfig {
  format: string;
  sections: string[];
  delai_generation: string;
  call_to_action: string;
  personnalisable: boolean;
}

export interface N8nTrigger {
  workflow: string;
  declencheur: string;
  action: string;
  score_automatisation: number;
}

export interface AIChatbotBehavior {
  identite: ChatbotIdentity;
  scenarios_conversation: ConversationScenario[];
  regles_conformite: ComplianceRule[];
  escalade_humaine: EscalationRule[];
  limitations: string[];
}

export interface ChatbotIdentity {
  nom: string;
  role: string;
  ton: string;
  phrases_signature: string[];
  avatar_prompt: string;
  niveau_expertise: string;
}

export interface ConversationScenario {
  intention: string;
  detection_keywords: string[];
  flux_reponse: { etape: number; reponse: string; action?: string }[];
  fallback: string;
}

export interface ComplianceRule {
  id: string;
  regle: string;
  condition: string;
  action_blocage: string;
  message_utilisateur: string;
}

export interface EscalationRule {
  condition: string;
  destination: string;
  delai_max: string;
  donnees_transmises: string[];
}

export interface ConversionFunnel {
  etapes: FunnelStep[];
  taux_conversion_par_etape: { etape: string; taux_pct: number; benchmark_secteur: number }[];
  points_friction: FrictionPoint[];
  optimisation_recommandations: string[];
}

export interface FunnelStep {
  etape: string;
  objectif: string;
  pages: string[];
  metriques: string[];
  kpi_cible: string;
}

export interface FrictionPoint {
  etape: string;
  probleme: string;
  impact_pct: number;
  solution: string;
  difficulte_implementation: 'Facile' | 'Moyenne' | 'Difficile';
}

export interface SEOStructure {
  architecture_seo: SEOArchitecture;
  keyword_clusters: KeywordCluster[];
  pages_piliers: PillarPage[];
  balisage_schema: SchemaMarkup[];
  strategie_maillage: MaillageStrategy;
}

export interface SEOArchitecture {
  type: string;
  silos_thematiques: { silo: string; pages: string[]; mot_cle_principal: string }[];
  url_structure: string;
  hreflang: string[];
}

export interface KeywordCluster {
  theme: string;
  mot_cle_principal: string;
  volume_recherche_mensuel: number;
  difficulte: string;
  mots_cles_secondaires: string[];
  mots_cles_longue_traine: string[];
  pages_cibles: string[];
}

export interface PillarPage {
  titre: string;
  url: string;
  mot_cle: string;
  contenu_principal: string;
  sous_pages: string[];
  schema_type: string;
}

export interface SchemaMarkup {
  page: string;
  type_schema: string;
  proprietes: Record<string, string>;
}

export interface MaillageStrategy {
  liens_internes: number;
  liens_sortants: number;
  ancres_recommandees: string[];
  silo_linking: { depuis: string; vers: string; ancre: string }[];
}

export interface WebsiteDeliverable {
  scenario: WebsiteScenario;
  site_architecture: SiteArchitecture;
  dynamic_content_rules: DynamicContentRules;
  lead_generation_flows: LeadGenerationFlows;
  diagnostic_tools_logic: DiagnosticToolsLogic;
  ai_chatbot_behavior: AIChatbotBehavior;
  conversion_funnel: ConversionFunnel;
  seo_structure: SEOStructure;
  metadata: {
    generateur: string;
    date_generation: string;
    duree_generation_secondes: number;
    pages_generees: number;
    modules_total: number;
    score_global_automation: number;
    mode: string;
  };
}

// ═══════════════════════════════════════════════════════
// SCENARIOS
// ═══════════════════════════════════════════════════════

export const SCENARIOS: WebsiteScenario[] = [
  {
    id: 'WA-001',
    nom: 'Banque Commerciale CEMAC — Site Conformité COBAC Full Scope',
    type_institution: 'Banque',
    zone: 'CEMAC — Cameroun',
    scope_reglementaire: ['COBAC R-2026/03', 'COBAC R-2025/07', 'BEAC n°008-2026', 'GABAC n°01/2026'],
    public_cible: 'Entreprises, Institutionnels, Particuliers fortunés, Régulateurs',
    description: 'Site web de conformité complet pour banque commerciale. Architecture SaaS réglementaire avec pages services, outils diagnostics LBC/FT, chatbot expert COBAC, funnel conversion B2B.',
    pages_attendues: 24,
    complexite: 'Premium',
  },
  {
    id: 'WA-002',
    nom: 'EMF — Microfinance Conformité LBC/FT',
    type_institution: 'EMF',
    zone: 'CEMAC — Gabon',
    scope_reglementaire: ['COBAC R-2026/03', 'COBAC R-2025/07'],
    public_cible: 'Micro-entrepreneurs, Particuliers, OSC, Bailleurs',
    description: 'Site vitrine + conformité pour établissement de microfinance. Focus LBC/FT simplifié, diagnostic flash conformité, chatbot éducatif, lead magnets accessibles.',
    pages_attendues: 16,
    complexite: 'Standard',
  },
  {
    id: 'WA-003',
    nom: 'FinTech Paiement — Plateforme Conformité Agile',
    type_institution: 'FinTech',
    zone: 'CEMAC — Congo',
    scope_reglementaire: ['COBAC R-2026/03', 'Sécurité SI', 'GAFI 2026'],
    public_cible: 'Startups, Marchands, Développeurs API, Investisseurs',
    description: 'Site web moderne pour FinTech de paiement. Architecture API-first, documentation technique, simulateur conformité, chatbot tech-savvy, funnel onboarding développeurs.',
    pages_attendues: 20,
    complexite: 'Avancée',
  },
  {
    id: 'WA-004',
    nom: 'Cabinet Conseil Multi-Services — Hub Conformité Régional',
    type_institution: 'Multi-Service',
    zone: 'CEMAC + UEMOA',
    scope_reglementaire: ['COBAC R-2026/03', 'BCEAO', 'BEAC', 'GABAC', 'OHADA'],
    public_cible: 'Grandes entreprises, États, Institutions financières, ONG internationales',
    description: 'Hub de conformité multi-juridictionnel pour cabinet de conseil. Architecture silotée par zone, outils diagnostics multi-pays, chatbot multilingue, funnel enterprise B2G/B2B.',
    pages_attendues: 32,
    complexite: 'Premium',
  },
];

// ═══════════════════════════════════════════════════════
// DELIVERABLES
// ═══════════════════════════════════════════════════════

export const WEBSITE_DELIVERABLES: WebsiteDeliverable[] = [
  // ─── WA-001 : Banque Commerciale CEMAC ───
  {
    scenario: SCENARIOS[0],
    site_architecture: {
      structure: {
        nom: 'Banque Commerciale CEMAC — Architecture Site Conformité COBAC',
        pages: [
          { id: 'P01', titre: 'Accueil — Votre Partenaire Conformité COBAC', url: '/', type: 'landing', priorite: 'P0', modules: ['Hero full-width', 'KPIs conformité', 'Services phares', 'Témoignages régulateurs', 'CTA diagnostic'], conversion_goal: 'Lancement diagnostic flash conformité', meta_description: 'Banque Commerciale CEMAC — Expert conformité COBAC, LBC/FT, BEAC. Diagnostic flash gratuit en 5 minutes. Services réglementaires pour entreprises.' },
          { id: 'P02', titre: 'Services Conformité COBAC', url: '/services-conformite-cobac', type: 'service', priorite: 'P0', modules: ['Grille services 3 colonnes', 'Tableau comparatif', 'FAQ COBAC', 'CTA consultation'], conversion_goal: 'Demande de consultation gratuite', meta_description: 'Services conformité COBAC : audit LBC/FT, contrôle interne, gouvernance, reporting BEAC. Experts certifiés CEMAC.' },
          { id: 'P03', titre: 'Diagnostic Flash Conformité', url: '/diagnostic-flash-conformite', type: 'tool', priorite: 'P0', modules: ['Formulaire 12 questions', 'Scoring temps réel', 'Rapport PDF', 'CTA consultation'], conversion_goal: 'Capture lead + rapport personnalisé', meta_description: 'Diagnostic flash conformité COBAC — Évaluez votre niveau en 5 minutes. Scoring automatique, rapport PDF gratuit, recommandations personnalisées.' },
          { id: 'P04', titre: 'Outil LBC/FT — Classification Risques', url: '/outil-classification-risques-lbcft', type: 'tool', priorite: 'P0', modules: ['Matrice scoring interactive', 'Recommandations automatiques', 'Export PDF', 'CTA accompagnement'], conversion_goal: 'Demande accompagnement LBC/FT', meta_description: 'Outil gratuit classification risques LBC/FT conforme COBAC R-2026/03. Matrice interactive, scoring automatisé, recommandations personnalisées.' },
          { id: 'P05', titre: 'Veille Réglementaire COBAC', url: '/veille-reglementaire-cobac', type: 'resource', priorite: 'P1', modules: ['Flux actualités', 'Filtres par thème', 'Alertes email', 'Archives'], conversion_goal: 'Abonnement newsletter veille', meta_description: 'Veille réglementaire COBAC en temps réel. Textes, circulaires, décisions. Alertes personnalisées par thème.' },
          { id: 'P06', titre: 'À Propos — Notre Expertise Conformité', url: '/a-propos', type: 'landing', priorite: 'P1', modules: ['Équipe', 'Certifications', 'Partenaires', 'Chiffres clés'], conversion_goal: 'Confiance — Taux rebond réduit', meta_description: 'Banque Commerciale CEMAC — 15 ans d\'expertise conformité COBAC. Équipe certifiée, 500+ audits réalisés.' },
          { id: 'P07', titre: 'Contact & Consultation', url: '/contact', type: 'contact', priorite: 'P1', modules: ['Formulaire contact', 'Calendly prise RDV', 'Carte', 'FAQ contact'], conversion_goal: 'Prise de rendez-vous consultation', meta_description: 'Contactez nos experts conformité COBAC. Consultation gratuite 30 minutes. Prise de RDV en ligne.' },
          { id: 'P08', titre: 'Blog Conformité & Réglementation', url: '/blog', type: 'blog', priorite: 'P2', modules: ['Grille articles', 'Filtres catégories', 'Recherche', 'Newsletter inline'], conversion_goal: 'Abonnement newsletter', meta_description: 'Blog conformité bancaire CEMAC. Articles experts sur COBAC, LBC/FT, BEAC, GABAC, gouvernance.' },
        ],
        modules_globaux: [
          { nom: 'Navbar intelligente', description: 'Navigation adaptative selon type utilisateur détecté', pages_concernees: 'Toutes', regles_affichage: 'Fixe en scroll, menu contextuel par segment' },
          { nom: 'Chatbot Conformité COBAC', description: 'Assistant IA expert COBAC disponible 24/7', pages_concernees: 'Toutes', regles_affichage: 'Bulle flottante bas-droite, discret sur mobile' },
          { nom: 'Bannière Cookie Consent', description: 'Conforme RGPD/CEMAC', pages_concernees: 'Toutes', regles_affichage: 'Première visite, bas de page' },
          { nom: 'Sticky CTA — Diagnostic Gratuit', description: 'Bouton fixe "Diagnostic Flash Gratuit"', pages_concernees: 'Toutes sauf /diagnostic', regles_affichage: 'Fixe bas-droite, disparaît sur page diagnostic' },
          { nom: 'Footer Premium', description: 'Liens rapides, newsletter, réseaux sociaux, certifications', pages_concernees: 'Toutes', regles_affichage: 'Toujours visible' },
        ],
        navigation: {
          menu_principal: [
            { label: 'Services', url: '/services-conformite-cobac', enfants: [{ label: 'Audit LBC/FT', url: '/services-conformite-cobac#audit-lbcft' }, { label: 'Contrôle Interne', url: '/services-conformite-cobac#controle-interne' }, { label: 'Gouvernance', url: '/services-conformite-cobac#gouvernance' }] },
            { label: 'Outils', url: '#', enfants: [{ label: 'Diagnostic Flash', url: '/diagnostic-flash-conformite' }, { label: 'Classification Risques', url: '/outil-classification-risques-lbcft' }] },
            { label: 'Veille', url: '/veille-reglementaire-cobac' },
            { label: 'Blog', url: '/blog' },
            { label: 'À Propos', url: '/a-propos' },
          ],
          footer_links: [
            { categorie: 'Services', liens: [{ label: 'Audit Conformité', url: '/services-conformite-cobac' }, { label: 'LBC/FT', url: '/services-conformite-cobac#lbcft' }, { label: 'Reporting BEAC', url: '/services-conformite-cobac#beac' }] },
            { categorie: 'Ressources', liens: [{ label: 'Veille Réglementaire', url: '/veille-reglementaire-cobac' }, { label: 'Blog', url: '/blog' }, { label: 'FAQ', url: '/faq' }] },
            { categorie: 'Légal', liens: [{ label: 'Mentions Légales', url: '/mentions-legales' }, { label: 'Politique Confidentialité', url: '/confidentialite' }, { label: 'CGU', url: '/cgu' }] },
          ],
          cta_sticky: { texte: 'Diagnostic Flash Gratuit', url: '/diagnostic-flash-conformite', position: 'bottom-right' },
        },
      },
      arborescence_url: ['/', '/services-conformite-cobac', '/diagnostic-flash-conformite', '/outil-classification-risques-lbcft', '/veille-reglementaire-cobac', '/blog', '/a-propos', '/contact', '/faq', '/mentions-legales', '/confidentialite', '/cgu'],
      sitemap_preview: 'sitemap.xml — 24 URLs, priorité P0:6, P1:8, P2:10',
    },
    dynamic_content_rules: {
      regles_par_type_utilisateur: [
        { type_utilisateur: 'DG / CEO Banque', detection: 'URL UTM: source=linkedin&audience=ceo', pages_adaptees: 'Page services version executive', contenu_specifique: ['Résumé exécutif première section', 'KPIs financiers', 'Témoignages CEO'], call_to_action: 'Réserver un appel stratégique 45min', offre_prioritaire: 'Audit complet COBAC + Plan remédiation' },
        { type_utilisateur: 'Responsable Conformité / CCO', detection: 'Comportement: visite >3 pages outils', pages_adaptees: 'Pages outils avancées', contenu_specifique: ['Détail réglementaire approfondi', 'Matrices scoring détaillées', 'Références textes COBAC'], call_to_action: 'Essai gratuit outil LBC/FT 14 jours', offre_prioritaire: 'Pack conformité trimestriel LBC/FT' },
        { type_utilisateur: 'PME / Entreprise', detection: 'URL UTM: source=google&query=conformite+entreprise', pages_adaptees: 'Landing page PME', contenu_specifique: ['Langage simplifié', 'Cas d\'usage PME', 'ROI conformité'], call_to_action: 'Diagnostic flash gratuit 5min', offre_prioritaire: 'Pack démarrage conformité PME' },
        { type_utilisateur: 'Régulateur / COBAC', detection: 'IP plage gouvernementale', pages_adaptees: 'Page transparence institutionnelle', contenu_specifique: ['Agréments et certifications', 'Rapports annuels publics', 'Politiques conformité'], call_to_action: 'Contact institutionnel', offre_prioritaire: 'Documentation réglementaire complète' },
      ],
      personalisation_contenu: [
        { declencheur: 'Visite > 3 pages', action: 'Afficher popup "Diagnostic personnalisé"', variante: 'A: Popup pleine page / B: Slide-in droite', impact_conversion: '+18%' },
        { declencheur: 'Temps page > 2min sur /services', action: 'Bannière "Nos clients vous ressemblent" avec cas d\'usage', variante: 'A: Carrousel logos / B: Témoignage vidéo', impact_conversion: '+12%' },
        { declencheur: 'Scroll > 70% article blog', action: 'Inline CTA "Téléchargez le guide complet"', variante: 'A: Bouton texte / B: Bannière image', impact_conversion: '+22%' },
      ],
      ab_testing: [
        { element: 'Titre Hero Accueil', variante_a: 'Votre Conformité COBAC simplifiée', variante_b: 'Conformité COBAC : 15 ans d\'expertise à votre service', metrique: 'Taux de clic CTA', duree_test: '2 semaines' },
        { element: 'Couleur CTA principal', variante_a: 'Vert émeraude #059669', variante_b: 'Bleu marine #1E3A5F', metrique: 'Taux conversion landing', duree_test: '3 semaines' },
      ],
      geolocalisation: [
        { pays: 'Cameroun', pages_specifiques: ['Page locale Douala', 'Page locale Yaoundé'], langue: 'fr', reglementation_locale: 'COBAC Cameroun spécifique', offre_locale: 'Audit sur site Cameroun' },
        { pays: 'Gabon', pages_specifiques: ['Page locale Libreville'], langue: 'fr', reglementation_locale: 'COBAC Gabon + GABAC local', offre_locale: 'Consultation Libreville' },
        { pays: 'Congo', pages_specifiques: [], langue: 'fr', reglementation_locale: 'COBAC Congo', offre_locale: 'Visio-conférence' },
      ],
    },
    lead_generation_flows: {
      flows: [
        { id: 'LF-001', nom: 'Entonnoir Diagnostic Flash → Consultation', declencheur: 'Visite page /diagnostic-flash-conformite', etapes: ['1. Formulaire 12 questions', '2. Scoring temps réel + rapport', '3. Page résultats avec CTA consultation', '4. Email automatique J+1 avec rapport PDF', '5. Relance J+3 si non converti'], taux_conversion_estime: 8.5, pages_cibles: ['/diagnostic-flash-conformite', '/resultats-diagnostic'] },
        { id: 'LF-002', nom: 'Lead Magnet Guide COBAC → Nurturing', declencheur: 'Téléchargement guide COBAC', etapes: ['1. Formulaire email + nom + entreprise', '2. Email bienvenue + guide', '3. Série 5 emails éducatifs (J+2 à J+14)', '4. Email commercial J+16 avec offre', '5. Suivi commercial si clic'], taux_conversion_estime: 4.2, pages_cibles: ['/blog', '/veille-reglementaire-cobac'] },
        { id: 'LF-003', nom: 'Chatbot → Lead Qualification → RDV', declencheur: 'Interaction chatbot > 5 messages', etapes: ['1. Qualification automatique (secteur, besoin, urgence)', '2. Scoring lead A/B/C', '3. Proposition RDV si lead A', '4. Envoi Calendly + confirmation email', '5. Rappel SMS J-1'], taux_conversion_estime: 12.0, pages_cibles: ['Toutes'] },
      ],
      lead_magnets: [
        { id: 'LM-001', type: 'diagnostic', titre: 'Diagnostic Flash Conformité COBAC', valeur_percue: 'Élevée — Rapport personnalisé gratuit', pages_affichage: ['/', '/services-conformite-cobac', '/blog'], champs_formulaire: ['email', 'nom', 'entreprise', 'secteur'] },
        { id: 'LM-002', type: 'guide', titre: 'Guide Complet LBC/FT — 50 Pages', valeur_percue: 'Très élevée — Valeur 150€', pages_affichage: ['/blog', '/outil-classification-risques-lbcft'], champs_formulaire: ['email', 'nom', 'fonction', 'entreprise', 'taille_entreprise'] },
        { id: 'LM-003', type: 'checklist', titre: 'Checklist Préparation Inspection COBAC', valeur_percue: 'Élevée — Pratico-pratique', pages_affichage: ['/services-conformite-cobac', '/veille-reglementaire-cobac'], champs_formulaire: ['email', 'nom'] },
        { id: 'LM-004', type: 'webinar', titre: 'Webinar : Nouvelles Exigences COBAC 2026', valeur_percue: 'Très élevée — Expertise live', pages_affichage: ['/', '/blog'], champs_formulaire: ['email', 'nom', 'entreprise', 'fonction'] },
      ],
      popups: [
        { type: 'exit-intent', declencheur: 'Souris quitte la fenêtre', offre: 'Diagnostic Flash Gratuit — 5 minutes', design: 'Full-screen overlay avec formulaire simplifié', frequence_max: '1 fois / 7 jours' },
        { type: 'scroll-50', declencheur: 'Scroll 50% page blog', offre: 'Guide LBC/FT gratuit', design: 'Slide-in droite 400px', frequence_max: '1 fois / session' },
        { type: 'time-delay', declencheur: '45 secondes sur page services', offre: 'Consultation gratuite 30min', design: 'Modal centrée avec Calendly embed', frequence_max: '1 fois / 30 jours' },
      ],
      email_sequences: [
        { nom: 'Nurturing Post-Diagnostic', declencheur: 'Complétion diagnostic flash', nombre_emails: 5, objectif: 'Conversion en consultation payante', emails: [
          { jour: 0, sujet: 'Votre rapport de diagnostic conformité COBAC', contenu_key: 'rapport_personnalise' },
          { jour: 2, sujet: 'Les 3 points critiques identifiés dans votre diagnostic', contenu_key: 'analyse_points_critiques' },
          { jour: 5, sujet: 'Comment [Entreprise] a résolu ses problèmes de conformité', contenu_key: 'case_study' },
          { jour: 9, sujet: 'Votre plan d\'action prioritaire COBAC', contenu_key: 'plan_action' },
          { jour: 14, sujet: 'Consultation offerte — 30 minutes avec un expert', contenu_key: 'offre_consultation' },
        ]},
      ],
    },
    diagnostic_tools_logic: {
      outils: [
        { id: 'DT-001', nom: 'Diagnostic Flash Conformité COBAC', type: 'questionnaire', nombre_questions: 12, duree_estimee: '5 min', resultats_possibles: ['Conforme (80-100%)', 'Partiellement Conforme (50-79%)', 'Non Conforme (<50%)'], pages_affichage: ['/diagnostic-flash-conformite'] },
        { id: 'DT-002', nom: 'Classification Risques LBC/FT', type: 'quiz', nombre_questions: 8, duree_estimee: '3 min', resultats_possibles: ['Risque Faible', 'Risque Moyen', 'Risque Élevé'], pages_affichage: ['/outil-classification-risques-lbcft'] },
        { id: 'DT-003', nom: 'Simulateur Impact COBAC R-2026/03', type: 'simulateur', nombre_questions: 6, duree_estimee: '4 min', resultats_possibles: ['Impact Mineur', 'Impact Modéré', 'Impact Majeur'], pages_affichage: ['/services-conformite-cobac'] },
      ],
      scoring: {
        methode: 'Score pondéré 0-100 avec 4 axes',
        ponderations: [
          { axe: 'Gouvernance & Organisation', poids_pct: 25, questions: ['Indépendance CA', 'Comités spécialisés', 'Lignes défense', 'Chartes'] },
          { axe: 'LBC/FT', poids_pct: 35, questions: ['KYC/CDD', 'Registre BE', 'Déclarations Soupçons', 'Formation'] },
          { axe: 'Contrôle Interne', poids_pct: 25, questions: ['Cartographie processus', 'Matrice contrôle', 'Audit interne'] },
          { axe: 'Reporting Réglementaire', poids_pct: 15, questions: ['Reporting BEAC', 'Reporting GABAC', 'Délais conformes'] },
        ],
        seuils: [
          { label: 'Conforme', min: 80, max: 100, action: 'Félicitations — Maintenez votre niveau. Proposition audit annuel.', couleur: '#059669' },
          { label: 'Partiellement Conforme', min: 50, max: 79, action: 'Plan d\'action recommandé. Proposition accompagnement 3 mois.', couleur: '#D97706' },
          { label: 'Non Conforme', min: 0, max: 49, action: 'URGENCE — Plan de remédiation immédiat. Proposition mission urgente.', couleur: '#DC2626' },
        ],
      },
      rapport: {
        format: 'PDF 8 pages',
        sections: ['Résumé exécutif', 'Score global + benchmark', 'Analyse par axe (4 axes)', 'Points forts', 'Points critiques', 'Recommandations priorisées P0/P1/P2', 'Plan d\'action 90 jours', 'Prochaines étapes'],
        delai_generation: 'Instantané (temps réel)',
        call_to_action: 'Consultation gratuite 30 minutes',
        personnalisable: true,
      },
      integration_n8n: [
        { workflow: 'Lead Scoring Post-Diagnostic', declencheur: 'Soumission formulaire diagnostic', action: 'Envoi données → n8n → scoring → CRM → email automatique', score_automatisation: 95 },
        { workflow: 'Alerte Lead Chaud', declencheur: 'Score diagnostic > 80% ou < 40%', action: 'Notification Slack/Teams équipe commerciale + création tâche CRM', score_automatisation: 90 },
        { workflow: 'Rappel Consultation', declencheur: '3 jours après diagnostic sans RDV pris', action: 'Email relance + SMS si numéro fourni', score_automatisation: 85 },
      ],
    },
    ai_chatbot_behavior: {
      identite: {
        nom: 'KHEPRA Conformité COBAC™',
        role: 'Expert Conformité COBAC Senior — Ancien Inspecteur COBAC',
        ton: 'Professionnel, rassurant, précis. Connaît chaque article COBAC par cœur.',
        phrases_signature: ['Selon l\'article 15 du R-2025/07...', 'Je vous recommande de...', 'Voici ce que dit exactement le texte...'],
        avatar_prompt: 'Senior African compliance expert, professional headshot, warm trust-inspiring expression, dark suit, law library background',
        niveau_expertise: 'Expert COBAC 20+ ans — Ancien cadre COBAC',
      },
      scenarios_conversation: [
        { intention: 'diagnostic_conformite', detection_keywords: ['diagnostic', 'évaluer', 'niveau conformité', 'score', 'où en sommes-nous'], flux_reponse: [
          { etape: 1, reponse: 'Je peux évaluer votre niveau de conformité COBAC en 5 minutes. Souhaitez-vous lancer le diagnostic flash ?' },
          { etape: 2, reponse: 'Parfait ! Première question : Disposez-vous d\'un Conseil d\'Administration avec au moins 33% d\'administrateurs indépendants ?', action: 'Lancer diagnostic' },
        ], fallback: 'Pour évaluer votre conformité, je vous invite à utiliser notre outil de diagnostic flash : [Lien]' },
        { intention: 'exigence_lbcft', detection_keywords: ['LBC/FT', 'blanchiment', 'financement terrorisme', 'KYC', 'BE', 'déclaration soupçon', 'GABAC'], flux_reponse: [
          { etape: 1, reponse: 'Le dispositif LBC/FT est régi par le Règlement COBAC R-2026/03. Les obligations principales sont : KYC/CDD, Registre des Bénéficiaires Effectifs (BE), Déclarations de Soupçons (DS), Classification des risques clients, Formation annuelle. Sur quel point souhaitez-vous des précisions ?' },
        ], fallback: 'Je vous invite à consulter notre guide LBC/FT complet ou à prendre RDV avec un expert.' },
        { intention: 'urgence_inspection', detection_keywords: ['inspection', 'audit COBAC', 'contrôle', 'urgence', 'visite', 'inspecteur'], flux_reponse: [
          { etape: 1, reponse: 'Une inspection COBAC est annoncée ou en cours ? Je comprends l\'urgence. Nous avons un pack "Préparation Inspection Urgente" qui se déploie en 48h.' },
          { etape: 2, reponse: 'Souhaitez-vous que je vous mette en relation immédiate avec notre Senior Compliance Auditor ?', action: 'Escalade humaine' },
        ], fallback: 'Pour toute urgence inspection, contactez directement notre hotline : +237 6XX XXX XXX' },
        { intention: 'tarifs_services', detection_keywords: ['prix', 'tarif', 'coût', 'budget', 'devis', 'combien'], flux_reponse: [
          { etape: 1, reponse: 'Nos tarifs dépendent de la taille de votre établissement et du périmètre. Pour un audit COBAC complet, comptez entre 15 et 45 millions FCFA. Pour un diagnostic flash, c\'est gratuit !' },
          { etape: 2, reponse: 'Souhaitez-vous un devis personnalisé ? Je peux organiser un appel avec notre directeur commercial.', action: 'Proposition RDV' },
        ], fallback: 'Pour un devis précis, je vous invite à remplir notre formulaire de contact.' },
      ],
      regles_conformite: [
        { id: 'CR-001', regle: 'Pas de conseil juridique engageant', condition: 'Question contenant "responsabilité", "garantie juridique", "avis légal"', action_blocage: 'Rediriger vers disclaimer + proposition consultation avocat partenaire', message_utilisateur: 'Je ne peux pas fournir de conseil juridique engageant. Je vous recommande de consulter un avocat spécialisé. Souhaitez-vous que je vous mette en relation avec notre partenaire juridique ?' },
        { id: 'CR-002', regle: 'Pas de divulgation données clients', condition: 'Demande explicite de données d\'autres clients', action_blocage: 'Refus poli + explication confidentialité', message_utilisateur: 'Pour des raisons de confidentialité, je ne peux pas partager d\'informations sur d\'autres clients. Puis-je vous aider autrement ?' },
        { id: 'CR-003', regle: 'Pas de critique des régulateurs', condition: 'Message contenant des termes négatifs sur COBAC/BEAC/GABAC', action_blocage: 'Réponse neutre et professionnelle', message_utilisateur: 'La COBAC est l\'autorité de régulation de la CEMAC. Nous travaillons en étroite collaboration avec elle pour assurer la conformité du secteur.' },
      ],
      escalade_humaine: [
        { condition: 'Lead score > 80 (haute intention)', destination: 'Équipe commerciale — Slack #leads-chauds', delai_max: '15 minutes', donnees_transmises: ['Nom', 'Email', 'Entreprise', 'Historique conversation', 'Score lead'] },
        { condition: 'Mention "urgence" ou "inspection en cours"', destination: 'Senior Compliance Auditor — SMS + Email', delai_max: '5 minutes', donnees_transmises: ['Nom', 'Téléphone', 'Entreprise', 'Résumé urgence'] },
        { condition: 'Demande devis complexe (>50M FCFA)', destination: 'Directeur Commercial — Email + CRM', delai_max: '1 heure', donnees_transmises: ['Détails demande', 'Coordonnées', 'Historique'] },
      ],
      limitations: ['Pas de conseil juridique engageant', 'Pas de divulgation de données confidentielles', 'Pas d\'interprétation subjective des textes COBAC', 'Pas de recommandation d\'investissement', 'Escalade humaine automatique pour cas complexes'],
    },
    conversion_funnel: {
      etapes: [
        { etape: 'Acquisition', objectif: 'Attirer visiteurs qualifiés via SEO, LinkedIn, Google Ads', pages: ['/', '/services-conformite-cobac', '/blog'], metriques: ['Trafic organique', 'CTR SERP', 'Impressions LinkedIn'], kpi_cible: '10,000 visites/mois' },
        { etape: 'Activation', objectif: 'Engager avec outil diagnostic ou lead magnet', pages: ['/diagnostic-flash-conformite', '/outil-classification-risques-lbcft'], metriques: ['Taux complétion diagnostic', 'Taux téléchargement guide'], kpi_cible: 'Conversion 12% visiteurs → lead' },
        { etape: 'Qualification', objectif: 'Scorer leads et identifier priorité', pages: ['Rapport diagnostic (email)'], metriques: ['Lead score moyen', '% leads A/B/C'], kpi_cible: '30% leads qualifiés A' },
        { etape: 'Conversion', objectif: 'Transformer leads en RDV consultation', pages: ['Page résultats diagnostic', 'Emails nurturing'], metriques: ['Taux prise RDV', 'Taux conversion email→RDV'], kpi_cible: 'Conversion 25% leads A → RDV' },
        { etape: 'Closing', objectif: 'Signer mission conformité', pages: ['Proposition commerciale (PDF)'], metriques: ['Taux closing', 'Panier moyen', 'Cycle vente'], kpi_cible: 'Closing 40% RDV → contrat' },
      ],
      taux_conversion_par_etape: [
        { etape: 'Visiteur → Lead', taux_pct: 12.0, benchmark_secteur: 5.0 },
        { etape: 'Lead → Lead Qualifié A', taux_pct: 30.0, benchmark_secteur: 20.0 },
        { etape: 'Lead Qualifié → RDV', taux_pct: 25.0, benchmark_secteur: 15.0 },
        { etape: 'RDV → Contrat', taux_pct: 40.0, benchmark_secteur: 25.0 },
        { etape: 'Global : Visiteur → Client', taux_pct: 0.36, benchmark_secteur: 0.04 },
      ],
      points_friction: [
        { etape: 'Diagnostic → RDV', probleme: 'Formulaire consultation trop long (8 champs)', impact_pct: 15, solution: 'Réduire à 4 champs + pré-remplissage données diagnostic', difficulte_implementation: 'Facile' },
        { etape: 'Blog → Lead Magnet', probleme: 'Pas de CTA visible sur mobile', impact_pct: 22, solution: 'Sticky CTA mobile + inline CTA après 3 paragraphes', difficulte_implementation: 'Facile' },
        { etape: 'Email → RDV', probleme: 'Taux ouverture emails < 25%', impact_pct: 18, solution: 'A/B test sujets + personnalisation entreprise + envoi mardi 10h', difficulte_implementation: 'Moyenne' },
      ],
      optimisation_recommandations: ['Réduire friction formulaires', 'Ajouter preuve sociale sur pages conversion', 'Implémenter chat en direct sur page tarifs', 'Créer page comparaison vs alternatives', 'Ajouter garantie "satisfait ou remboursé" sur premier audit'],
    },
    seo_structure: {
      architecture_seo: {
        type: 'Silo thématique + Pillar pages',
        silos_thematiques: [
          { silo: 'Conformité COBAC', pages: ['/services-conformite-cobac', '/diagnostic-flash-conformite', '/outil-classification-risques-lbcft', '/blog/cobac-conformite'], mot_cle_principal: 'conformité COBAC CEMAC' },
          { silo: 'LBC/FT', pages: ['/outil-classification-risques-lbcft', '/guide-lbcft', '/blog/lbcft-obligations', '/blog/declaration-soupcons-gabac'], mot_cle_principal: 'LBC/FT CEMAC obligations' },
          { silo: 'Gouvernance', pages: ['/services-conformite-cobac#gouvernance', '/blog/gouvernance-bancaire-cobac', '/blog/conseil-administration-cobac'], mot_cle_principal: 'gouvernance bancaire COBAC' },
        ],
        url_structure: '/{silo}/{page} — URLs propres, sans paramètres, tirets comme séparateurs',
        hreflang: ['fr-CM', 'fr-GA', 'fr-CG', 'fr-GQ'],
      },
      keyword_clusters: [
        { theme: 'Conformité COBAC', mot_cle_principal: 'conformité COBAC CEMAC', volume_recherche_mensuel: 2400, difficulte: 'Moyenne', mots_cles_secondaires: ['audit COBAC', 'réglementation COBAC', 'conformité bancaire CEMAC', 'normes COBAC'], mots_cles_longue_traine: ['comment se préparer à une inspection COBAC', 'checklist conformité COBAC 2026', 'exigences COBAC pour les banques', 'différence COBAC et BCEAO'], pages_cibles: ['/', '/services-conformite-cobac', '/diagnostic-flash-conformite'] },
        { theme: 'LBC/FT CEMAC', mot_cle_principal: 'LBC/FT CEMAC obligations', volume_recherche_mensuel: 1800, difficulte: 'Faible', mots_cles_secondaires: ['lutte blanchiment CEMAC', 'GABAC déclaration soupçon', 'KYC CEMAC', 'bénéficiaires effectifs COBAC'], mots_cles_longue_traine: ['comment remplir une déclaration de soupçon GABAC', 'registre bénéficiaires effectifs modèle COBAC', 'formation LBC/FT obligatoire CEMAC', 'sanctions LBC/FT COBAC'], pages_cibles: ['/outil-classification-risques-lbcft', '/blog/lbcft'] },
        { theme: 'Reporting BEAC', mot_cle_principal: 'reporting BEAC banques', volume_recherche_mensuel: 1200, difficulte: 'Faible', mots_cles_secondaires: ['NSFR BEAC', 'LCR reporting', 'déclaration BEAC', 'états financiers BEAC'], mots_cles_longue_traine: ['calendrier reporting BEAC 2026', 'comment calculer NSFR BEAC', 'sanctions retard reporting BEAC', 'logiciel reporting BEAC'], pages_cibles: ['/veille-reglementaire-cobac', '/blog/reporting-beac'] },
      ],
      pages_piliers: [
        { titre: 'Guide Complet Conformité COBAC 2026', url: '/guide-conformite-cobac-2026', mot_cle: 'guide conformité COBAC 2026', contenu_principal: 'Guide exhaustif 8000 mots sur la conformité COBAC : cadre réglementaire, obligations par type d\'établissement, calendrier, sanctions, bonnes pratiques.', sous_pages: ['/services-conformite-cobac', '/diagnostic-flash-conformite', '/blog/conformite-cobac'], schema_type: 'Article' },
        { titre: 'Guide LBC/FT — Obligations & Procédures', url: '/guide-lbcft-obligations', mot_cle: 'guide LBC/FT obligations procédures', contenu_principal: 'Guide complet LBC/FT : KYC, CDD, BE, DS, classification risques, formation. Conforme GAFI 40 recommandations.', sous_pages: ['/outil-classification-risques-lbcft', '/blog/lbcft'], schema_type: 'Article' },
      ],
      balisage_schema: [
        { page: '/', type_schema: 'Organization', proprietes: { name: 'Banque Commerciale CEMAC', description: 'Expert conformité COBAC, LBC/FT, BEAC. Diagnostic gratuit.', areaServed: 'CEMAC', knowsAbout: 'COBAC, LBC/FT, BEAC, GABAC' } },
        { page: '/diagnostic-flash-conformite', type_schema: 'WebApplication', proprietes: { name: 'Diagnostic Flash Conformité COBAC', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: 'Diagnostic gratuit' } },
        { page: '/blog', type_schema: 'Blog', proprietes: { name: 'Blog Conformité CEMAC', about: 'Conformité bancaire, COBAC, LBC/FT, réglementation CEMAC' } },
        { page: '/faq', type_schema: 'FAQPage', proprietes: { mainEntity: 'Questions fréquentes conformité COBAC' } },
      ],
      strategie_maillage: {
        liens_internes: 156,
        liens_sortants: 34,
        ancres_recommandees: ['conformité COBAC', 'audit LBC/FT', 'diagnostic conformité gratuit', 'obligations COBAC 2026', 'préparation inspection COBAC', 'classification risques clients'],
        silo_linking: [
          { depuis: '/guide-conformite-cobac-2026', vers: '/services-conformite-cobac', ancre: 'nos services conformité COBAC' },
          { depuis: '/guide-conformite-cobac-2026', vers: '/diagnostic-flash-conformite', ancre: 'diagnostic flash gratuit' },
          { depuis: '/blog/gouvernance-bancaire-cobac', vers: '/services-conformite-cobac#gouvernance', ancre: 'service gouvernance COBAC' },
          { depuis: '/blog/lbcft-obligations', vers: '/outil-classification-risques-lbcft', ancre: 'outil classification risques LBC/FT' },
        ],
      },
    },
    metadata: {
      generateur: 'KOS Website Automation Engine™ v1.0',
      date_generation: '2026-06-24T12:00:00Z',
      duree_generation_secondes: 11.3,
      pages_generees: 24,
      modules_total: 31,
      score_global_automation: 92,
      mode: 'MOCK — Démo Interactive Website Automation',
    },
  },

  // ─── WA-002 : EMF Gabon ───
  {
    scenario: SCENARIOS[1],
    site_architecture: {
      structure: {
        nom: 'EMF Gabon — Site Conformité Microfinance',
        pages: [
          { id: 'P01', titre: 'Accueil EMF — Microfinance Conforme COBAC', url: '/', type: 'landing', priorite: 'P0', modules: ['Hero', 'Services', 'Diagnostic flash', 'Témoignages'], conversion_goal: 'Diagnostic flash gratuit', meta_description: 'CREC Gabon — Expert conformité microfinance COBAC. Diagnostic flash gratuit. Services LBC/FT pour EMF.' },
          { id: 'P02', titre: 'Services Conformité EMF', url: '/services-conformite-emf', type: 'service', priorite: 'P0', modules: ['Services EMF', 'Tableau tarifs', 'FAQ EMF', 'CTA'], conversion_goal: 'Demande devis', meta_description: 'Services conformité pour EMF : LBC/FT, gouvernance, contrôle interne. Solutions adaptées aux microfinances.' },
          { id: 'P03', titre: 'Diagnostic Flash EMF', url: '/diagnostic-flash-emf', type: 'tool', priorite: 'P0', modules: ['Formulaire 8 questions', 'Score', 'Rapport simplifié'], conversion_goal: 'Capture lead', meta_description: 'Diagnostic flash conformité EMF — Évaluez votre microfinance en 3 minutes. Scoring automatique gratuit.' },
          { id: 'P04', titre: 'Guide LBC/FT EMF', url: '/guide-lbcft-emf', type: 'resource', priorite: 'P1', modules: ['Contenu guide', 'Téléchargement PDF', 'Checklist'], conversion_goal: 'Téléchargement guide (lead magnet)', meta_description: 'Guide LBC/FT pour EMF — Téléchargez gratuitement. Procédures KYC, BE, DS adaptées aux microfinances.' },
          { id: 'P05', titre: 'Contact', url: '/contact', type: 'contact', priorite: 'P1', modules: ['Formulaire', 'WhatsApp', 'Carte'], conversion_goal: 'Contact direct', meta_description: 'Contactez CREC Gabon pour vos besoins de conformité EMF. Réponse sous 24h.' },
        ],
        modules_globaux: [
          { nom: 'Navbar simple', description: 'Menu 4 items + CTA diagnostic', pages_concernees: 'Toutes', regles_affichage: 'Fixe, fond blanc' },
          { nom: 'Chatbot simplifié', description: 'Assistant LBC/FT pour EMF', pages_concernees: 'Toutes', regles_affichage: 'Bulle bas-droite' },
          { nom: 'WhatsApp CTA', description: 'Bouton WhatsApp direct', pages_concernees: 'Toutes', regles_affichage: 'Fixe bas-gauche (mobile first)' },
          { nom: 'Footer simple', description: 'Liens essentiels + WhatsApp', pages_concernees: 'Toutes', regles_affichage: 'Toujours visible' },
        ],
        navigation: {
          menu_principal: [
            { label: 'Services', url: '/services-conformite-emf' },
            { label: 'Diagnostic', url: '/diagnostic-flash-emf' },
            { label: 'Guide LBC/FT', url: '/guide-lbcft-emf' },
            { label: 'Contact', url: '/contact' },
          ],
          footer_links: [
            { categorie: 'Services', liens: [{ label: 'Conformité EMF', url: '/services-conformite-emf' }, { label: 'Diagnostic', url: '/diagnostic-flash-emf' }] },
            { categorie: 'Ressources', liens: [{ label: 'Guide LBC/FT', url: '/guide-lbcft-emf' }] },
            { categorie: 'Légal', liens: [{ label: 'Mentions Légales', url: '/mentions-legales' }] },
          ],
          cta_sticky: { texte: 'Diagnostic Gratuit', url: '/diagnostic-flash-emf', position: 'bottom-right' },
        },
      },
      arborescence_url: ['/', '/services-conformite-emf', '/diagnostic-flash-emf', '/guide-lbcft-emf', '/contact', '/mentions-legales'],
      sitemap_preview: 'sitemap.xml — 16 URLs',
    },
    dynamic_content_rules: {
      regles_par_type_utilisateur: [
        { type_utilisateur: 'Directeur EMF', detection: 'Formulaire: fonction=directeur', pages_adaptees: 'Page services version direction', contenu_specifique: ['Focus gouvernance', 'ROI conformité', 'Témoignages DG EMF'], call_to_action: 'Réserver appel découverte', offre_prioritaire: 'Audit conformité complet EMF' },
        { type_utilisateur: 'Agent de crédit', detection: 'Page visitée: guide-lbcft-emf', pages_adaptees: 'Guide simplifié', contenu_specifique: ['Procédures KYC pas à pas', 'Checklists imprimables', 'Vidéos tutorielles'], call_to_action: 'Télécharger checklist KYC', offre_prioritaire: 'Formation LBC/FT équipe' },
      ],
      personalisation_contenu: [
        { declencheur: 'Visite page diagnostic', action: 'Bannière "Guide LBC/FT offert"', variante: 'A: Texte / B: Visuel', impact_conversion: '+10%' },
      ],
      ab_testing: [
        { element: 'CTA Hero', variante_a: 'Diagnostic Flash Gratuit', variante_b: 'Testez votre conformité en 3 min', metrique: 'Clic CTA', duree_test: '2 semaines' },
      ],
      geolocalisation: [
        { pays: 'Gabon', pages_specifiques: ['/libreville'], langue: 'fr', reglementation_locale: 'COBAC Gabon', offre_locale: 'Présentiel Libreville' },
      ],
    },
    lead_generation_flows: {
      flows: [
        { id: 'LF-101', nom: 'Diagnostic → Consultation EMF', declencheur: 'Complétion diagnostic EMF', etapes: ['Formulaire 8 questions', 'Résultat + CTA consultation', 'Email J+1 rapport', 'Relance J+3'], taux_conversion_estime: 6.0, pages_cibles: ['/diagnostic-flash-emf'] },
      ],
      lead_magnets: [
        { id: 'LM-101', type: 'guide', titre: 'Guide LBC/FT pour Microfinances', valeur_percue: 'Élevée', pages_affichage: ['/', '/services-conformite-emf'], champs_formulaire: ['email', 'nom', 'emf'] },
        { id: 'LM-102', type: 'checklist', titre: 'Checklist KYC Agent de Crédit', valeur_percue: 'Moyenne', pages_affichage: ['/guide-lbcft-emf'], champs_formulaire: ['email'] },
      ],
      popups: [
        { type: 'exit-intent', declencheur: 'Sortie page services', offre: 'Guide LBC/FT gratuit', design: 'Slide-in', frequence_max: '1/7j' },
      ],
      email_sequences: [
        { nom: 'Nurturing EMF', declencheur: 'Téléchargement guide', nombre_emails: 3, objectif: 'Conversion consultation', emails: [
          { jour: 0, sujet: 'Votre guide LBC/FT EMF', contenu_key: 'bienvenue_guide' },
          { jour: 3, sujet: '3 erreurs LBC/FT des EMF', contenu_key: 'erreurs_lbcft' },
          { jour: 7, sujet: 'Consultation offerte', contenu_key: 'offre_consultation' },
        ]},
      ],
    },
    diagnostic_tools_logic: {
      outils: [
        { id: 'DT-101', nom: 'Diagnostic Flash EMF', type: 'questionnaire', nombre_questions: 8, duree_estimee: '3 min', resultats_possibles: ['Conforme', 'Partiellement Conforme', 'Non Conforme'], pages_affichage: ['/diagnostic-flash-emf'] },
      ],
      scoring: {
        methode: 'Score pondéré simplifié 0-100, 3 axes',
        ponderations: [
          { axe: 'Gouvernance', poids_pct: 30, questions: ['CA statutaire', 'PV réunions', 'Organigramme'] },
          { axe: 'LBC/FT', poids_pct: 45, questions: ['Politique LBC/FT', 'Registre BE', 'Formation'] },
          { axe: 'Contrôle Interne', poids_pct: 25, questions: ['Procédures', 'Contrôle caisse'] },
        ],
        seuils: [
          { label: 'Conforme', min: 80, max: 100, action: 'Excellent — Maintenez le cap', couleur: '#059669' },
          { label: 'Partiellement', min: 50, max: 79, action: 'Améliorations recommandées', couleur: '#D97706' },
          { label: 'Non Conforme', min: 0, max: 49, action: 'Plan d\'action urgent', couleur: '#DC2626' },
        ],
      },
      rapport: { format: 'PDF 4 pages', sections: ['Score global', 'Analyse par axe', 'Recommandations', 'Prochaines étapes'], delai_generation: 'Instantané', call_to_action: 'Consultation gratuite', personnalisable: false },
      integration_n8n: [
        { workflow: 'Alerte lead EMF', declencheur: 'Diagnostic complété', action: 'Notification WhatsApp + email', score_automatisation: 80 },
      ],
    },
    ai_chatbot_behavior: {
      identite: {
        nom: 'Assistant Conformité EMF™',
        role: 'Conseiller Conformité Microfinance — Spécialiste COBAC EMF',
        ton: 'Pédagogique, simple, accessible. Explique la conformité aux non-experts.',
        phrases_signature: ['Pour votre EMF, voici ce qui est obligatoire...', 'Pas d\'inquiétude, c\'est plus simple qu\'il n\'y paraît...', 'Je vous explique étape par étape...'],
        avatar_prompt: 'Friendly African microfinance advisor, warm approachable expression, casual professional attire',
        niveau_expertise: 'Expert COBAC EMF — 10 ans microfinance',
      },
      scenarios_conversation: [
        { intention: 'demarrer_conformite', detection_keywords: ['débuter', 'commencer', 'première fois', 'nouveau', 'pas encore'], flux_reponse: [
          { etape: 1, reponse: 'Pas de panique ! La conformité COBAC pour un EMF se construit étape par étape. Commençons par le plus urgent : avez-vous une politique LBC/FT documentée ?' },
        ], fallback: 'Je vous invite à faire notre diagnostic flash gratuit pour évaluer votre situation.' },
        { intention: 'obligations_minimales', detection_keywords: ['minimum', 'obligatoire', 'obligation', 'requis', 'il faut quoi'], flux_reponse: [
          { etape: 1, reponse: 'Pour un EMF catégorie 2, le minimum COBAC c\'est : 1) Une politique LBC/FT écrite, 2) Un registre des bénéficiaires effectifs, 3) Une procédure KYC, 4) Une formation annuelle du personnel. Voulez-vous des modèles ?' },
        ], fallback: 'Téléchargez notre guide LBC/FT EMF qui contient tous les modèles.' },
      ],
      regles_conformite: [
        { id: 'CR-101', regle: 'Pas de conseil juridique', condition: 'Question juridique', action_blocage: 'Rediriger vers disclaimer', message_utilisateur: 'Pour un avis juridique, je vous recommande de consulter un avocat.' },
      ],
      escalade_humaine: [
        { condition: 'Demande devis', destination: 'Commercial WhatsApp', delai_max: '2 heures', donnees_transmises: ['Nom', 'WhatsApp', 'EMF'] },
      ],
      limitations: ['Pas de conseil juridique', 'Escalade humaine pour devis complexes'],
    },
    conversion_funnel: {
      etapes: [
        { etape: 'Acquisition', objectif: 'Visibilité locale EMF Gabon', pages: ['/', '/services-conformite-emf'], metriques: ['Visites', 'CTR'], kpi_cible: '2000 visites/mois' },
        { etape: 'Activation', objectif: 'Diagnostic ou téléchargement guide', pages: ['/diagnostic-flash-emf', '/guide-lbcft-emf'], metriques: ['Taux complétion'], kpi_cible: 'Conversion 8%' },
        { etape: 'Conversion', objectif: 'RDV consultation', pages: ['Résultats diagnostic'], metriques: ['RDV pris'], kpi_cible: 'Conversion 20% lead → RDV' },
        { etape: 'Closing', objectif: 'Signature mission', pages: ['Devis'], metriques: ['Taux closing'], kpi_cible: 'Closing 30%' },
      ],
      taux_conversion_par_etape: [
        { etape: 'Visiteur → Lead', taux_pct: 8.0, benchmark_secteur: 3.0 },
        { etape: 'Lead → RDV', taux_pct: 20.0, benchmark_secteur: 10.0 },
        { etape: 'RDV → Contrat', taux_pct: 30.0, benchmark_secteur: 20.0 },
        { etape: 'Global', taux_pct: 0.48, benchmark_secteur: 0.06 },
      ],
      points_friction: [
        { etape: 'Diagnostic → Contact', probleme: 'Pas de WhatsApp direct après diagnostic', impact_pct: 25, solution: 'Bouton WhatsApp automatique après résultat', difficulte_implementation: 'Facile' },
      ],
      optimisation_recommandations: ['Ajouter WhatsApp comme canal principal', 'Simplifier parcours mobile', 'Vidéo tuto conformité EMF sur page accueil'],
    },
    seo_structure: {
      architecture_seo: {
        type: 'Structure simple EMF',
        silos_thematiques: [
          { silo: 'Conformité EMF', pages: ['/', '/services-conformite-emf', '/diagnostic-flash-emf'], mot_cle_principal: 'conformité EMF Gabon' },
          { silo: 'LBC/FT EMF', pages: ['/guide-lbcft-emf'], mot_cle_principal: 'LBC/FT microfinance Gabon' },
        ],
        url_structure: '/{page} — URLs simples',
        hreflang: ['fr-GA'],
      },
      keyword_clusters: [
        { theme: 'Conformité EMF', mot_cle_principal: 'conformité EMF Gabon', volume_recherche_mensuel: 480, difficulte: 'Très Faible', mots_cles_secondaires: ['microfinance conformité Gabon', 'COBAC EMF', 'LBC/FT microfinance'], mots_cles_longue_traine: ['comment mettre en conformité une microfinance', 'obligations COBAC pour EMF', 'modèle politique LBC/FT EMF'], pages_cibles: ['/', '/services-conformite-emf'] },
      ],
      pages_piliers: [
        { titre: 'Guide Conformité EMF Gabon', url: '/guide-conformite-emf-gabon', mot_cle: 'guide conformité EMF Gabon COBAC', contenu_principal: 'Guide complet conformité EMF au Gabon : obligations COBAC, LBC/FT, gouvernance, procédures.', sous_pages: ['/services-conformite-emf', '/diagnostic-flash-emf'], schema_type: 'Article' },
      ],
      balisage_schema: [
        { page: '/', type_schema: 'Organization', proprietes: { name: 'CREC Gabon', description: 'Conformité microfinance COBAC Gabon' } },
      ],
      strategie_maillage: {
        liens_internes: 48,
        liens_sortants: 12,
        ancres_recommandees: ['conformité EMF Gabon', 'LBC/FT microfinance', 'diagnostic conformité gratuit'],
        silo_linking: [
          { depuis: '/guide-conformite-emf-gabon', vers: '/diagnostic-flash-emf', ancre: 'diagnostic flash EMF gratuit' },
        ],
      },
    },
    metadata: {
      generateur: 'KOS Website Automation Engine™ v1.0',
      date_generation: '2026-06-24T12:01:00Z',
      duree_generation_secondes: 5.8,
      pages_generees: 16,
      modules_total: 18,
      score_global_automation: 78,
      mode: 'MOCK — Démo Interactive Website Automation',
    },
  },

  // ─── WA-003 : FinTech Paiement ───
  {
    scenario: SCENARIOS[2],
    site_architecture: {
      structure: {
        nom: 'PayCEMAC SA — Plateforme Conformité FinTech',
        pages: [
          { id: 'P01', titre: 'Accueil — PayCEMAC Conformité', url: '/', type: 'landing', priorite: 'P0', modules: ['Hero animé', 'KPIs temps réel', 'API status', 'CTA onboarding'], conversion_goal: 'Création compte développeur', meta_description: 'PayCEMAC SA — Plateforme conformité FinTech CEMAC. KYC API, scoring ML, screening automatique. Documentation développeur.' },
          { id: 'P02', titre: 'API Documentation', url: '/docs/api', type: 'resource', priorite: 'P0', modules: ['Swagger UI', 'Code examples', 'SDKs', 'Rate limits'], conversion_goal: 'Intégration API', meta_description: 'Documentation API PayCEMAC — KYC, screening, scoring. REST, SDK Python/JS, Webhooks.' },
          { id: 'P03', titre: 'Simulateur Conformité', url: '/simulateur-conformite', type: 'tool', priorite: 'P0', modules: ['Simulation interactive', 'Résultats visuels', 'Export JSON'], conversion_goal: 'Demande démo', meta_description: 'Simulateur conformité FinTech — Testez votre conformité COBAC en temps réel.' },
          { id: 'P04', titre: 'Tarifs', url: '/tarifs', type: 'landing', priorite: 'P1', modules: ['Tableau prix', 'Comparatif', 'FAQ tarifs'], conversion_goal: 'Souscription', meta_description: 'Tarifs PayCEMAC — Plans Starter, Business, Enterprise. À partir de 50 000 FCFA/mois.' },
          { id: 'P05', titre: 'Blog Tech & Conformité', url: '/blog', type: 'blog', priorite: 'P2', modules: ['Articles tech', 'Use cases', 'Tutos API'], conversion_goal: 'Newsletter développeurs', meta_description: 'Blog PayCEMAC — Tech, conformité, API, FinTech CEMAC.' },
        ],
        modules_globaux: [
          { nom: 'Navbar tech', description: 'Navigation moderne avec statut API', pages_concernees: 'Toutes', regles_affichage: 'Dark theme, fixe' },
          { nom: 'Chatbot Tech', description: 'Assistant développeur + conformité', pages_concernees: 'Toutes', regles_affichage: 'Bulle bas-droite, thème dark' },
          { nom: 'API Status Badge', description: 'Indicateur statut API temps réel', pages_concernees: 'Toutes', regles_affichage: 'Top bar' },
        ],
        navigation: {
          menu_principal: [
            { label: 'API Docs', url: '/docs/api' },
            { label: 'Simulateur', url: '/simulateur-conformite' },
            { label: 'Tarifs', url: '/tarifs' },
            { label: 'Blog', url: '/blog' },
          ],
          footer_links: [
            { categorie: 'Produit', liens: [{ label: 'API Docs', url: '/docs/api' }, { label: 'SDKs', url: '/docs/sdks' }, { label: 'Statut', url: '/status' }] },
            { categorie: 'Légal', liens: [{ label: 'CGU', url: '/cgu' }, { label: 'SLA', url: '/sla' }] },
          ],
          cta_sticky: { texte: 'Créer un compte', url: '/signup', position: 'bottom-right' },
        },
      },
      arborescence_url: ['/', '/docs/api', '/simulateur-conformite', '/tarifs', '/blog', '/signup', '/status', '/cgu', '/sla'],
      sitemap_preview: 'sitemap.xml — 20 URLs',
    },
    dynamic_content_rules: {
      regles_par_type_utilisateur: [
        { type_utilisateur: 'Développeur', detection: 'Page: /docs/api + User-Agent: dev tool', pages_adaptees: 'API docs enrichies', contenu_specifique: ['Code snippets', 'SDK links', 'API playground'], call_to_action: 'Get API Key', offre_prioritaire: 'Plan Starter gratuit' },
        { type_utilisateur: 'Compliance Officer', detection: 'Search: conformité+outil', pages_adaptees: 'Page conformité B2B', contenu_specifique: ['Réglementation détaillée', 'Rapports conformité', 'Certifications'], call_to_action: 'Demander démo', offre_prioritaire: 'Plan Enterprise' },
      ],
      personalisation_contenu: [
        { declencheur: 'Visiteur récurrent API docs', action: 'Bannière "Nouveaux endpoints disponibles"', variante: 'A: Top banner / B: Toast', impact_conversion: '+8%' },
      ],
      ab_testing: [
        { element: 'CTA Hero', variante_a: 'Commencer gratuitement', variante_b: 'Voir la documentation', metrique: 'Taux inscription', duree_test: '2 semaines' },
      ],
      geolocalisation: [
        { pays: 'Congo', pages_specifiques: [], langue: 'fr', reglementation_locale: 'COBAC Congo', offre_locale: 'Support local Brazzaville' },
      ],
    },
    lead_generation_flows: {
      flows: [
        { id: 'LF-201', nom: 'Freemium → Premium', declencheur: 'Inscription plan Starter', etapes: ['Essai gratuit 14j', 'Onboarding email 5 étapes', 'Usage API monitoring', 'Upsell J+10 si volume > 80% quota', 'Sales call si volume > 90%'], taux_conversion_estime: 15.0, pages_cibles: ['/tarifs', '/docs/api'] },
      ],
      lead_magnets: [
        { id: 'LM-201', type: 'template', titre: 'Template Intégration API KYC', valeur_percue: 'Très élevée', pages_affichage: ['/docs/api'], champs_formulaire: ['email', 'stack_technique'] },
      ],
      popups: [
        { type: 'exit-intent', declencheur: 'Sortie page tarifs', offre: 'Essai gratuit 14 jours', design: 'Modal dark theme', frequence_max: '1/30j' },
      ],
      email_sequences: [
        { nom: 'Onboarding Développeur', declencheur: 'Inscription', nombre_emails: 4, objectif: 'Activation API', emails: [
          { jour: 0, sujet: 'Welcome to PayCEMAC — Your API keys', contenu_key: 'welcome' },
          { jour: 1, sujet: 'Quick start guide — First API call in 5 min', contenu_key: 'quickstart' },
          { jour: 3, sujet: 'Advanced features you should try', contenu_key: 'advanced' },
          { jour: 10, sujet: 'You\'ve used 80% of your quota — Upgrade?', contenu_key: 'upsell' },
        ]},
      ],
    },
    diagnostic_tools_logic: {
      outils: [
        { id: 'DT-201', nom: 'Simulateur Conformité FinTech', type: 'simulateur', nombre_questions: 6, duree_estimee: '2 min', resultats_possibles: ['Conforme', 'Partiel', 'Non Conforme'], pages_affichage: ['/simulateur-conformite'] },
      ],
      scoring: {
        methode: 'Score 0-100 pondéré 3 axes',
        ponderations: [
          { axe: 'KYC Digital', poids_pct: 40, questions: ['API KYC', 'OCR', 'Biométrie'] },
          { axe: 'Sécurité SI', poids_pct: 35, questions: ['Chiffrement', 'Pentest', 'RBAC'] },
          { axe: 'Reporting', poids_pct: 25, questions: ['DS automatisée', 'Audit trail'] },
        ],
        seuils: [
          { label: 'Conforme', min: 80, max: 100, action: 'Certification conforme', couleur: '#059669' },
          { label: 'Partiel', min: 50, max: 79, action: 'Améliorations recommandées', couleur: '#D97706' },
          { label: 'Non Conforme', min: 0, max: 49, action: 'Plan d\'action urgent', couleur: '#DC2626' },
        ],
      },
      rapport: { format: 'JSON + Dashboard', sections: ['Score', 'Détail API', 'Recommandations'], delai_generation: 'Instantané', call_to_action: 'Upgrade plan', personnalisable: true },
      integration_n8n: [
        { workflow: 'Onboarding automatique', declencheur: 'Nouveau compte', action: 'Création clés API + email + suivi', score_automatisation: 98 },
      ],
    },
    ai_chatbot_behavior: {
      identite: {
        nom: 'PayCEMAC Assistant™',
        role: 'Developer Relations + Compliance Expert',
        ton: 'Tech-savvy, précis, friendly. Parle code et conformité.',
        phrases_signature: ['Let me check the API docs...', 'Here\'s a code snippet for you...', 'According to COBAC R-2026/03...'],
        avatar_prompt: 'Modern tech professional, developer advocate style, hoodie, clean background',
        niveau_expertise: 'API + COBAC — Dual expertise',
      },
      scenarios_conversation: [
        { intention: 'integration_api', detection_keywords: ['API', 'intégration', 'code', 'SDK', 'endpoint', 'curl'], flux_reponse: [
          { etape: 1, reponse: 'Our KYC API is RESTful with JSON responses. Here\'s a quick curl example: curl -X POST https://api.paycemac.cg/v1/kyc/verify -H "Authorization: Bearer YOUR_KEY" -d \'{"document_type":"cni","document_number":"..."}\'. Want the full docs?' },
        ], fallback: 'Check our full API documentation at /docs/api' },
        { intention: 'conformite_cobac', detection_keywords: ['COBAC', 'conformité', 'réglementation', 'obligation', 'exigence'], flux_reponse: [
          { etape: 1, reponse: 'As a payment institution under COBAC R-2026/03, you need: KYC/CDD automation, real-time sanctions screening, BE registry, automated SAR/DS filing, and annual compliance audit. Our platform covers all 5.' },
        ], fallback: 'Try our compliance simulator at /simulateur-conformite' },
      ],
      regles_conformite: [
        { id: 'CR-201', regle: 'API rate limit info only', condition: 'Question sur limites', action_blocage: 'Afficher doc rate limiting', message_utilisateur: 'Rate limits depend on your plan. Check /docs/api#rate-limits or upgrade.' },
      ],
      escalade_humaine: [
        { condition: 'Demande Enterprise', destination: 'Sales Slack', delai_max: '1 heure', donnees_transmises: ['Email', 'Entreprise', 'Volume estimé'] },
      ],
      limitations: ['Support technique complexe → ticket', 'Négociation prix → Sales'],
    },
    conversion_funnel: {
      etapes: [
        { etape: 'Acquisition', objectif: 'Devs & CCOs via SEO + GitHub + LinkedIn', pages: ['/', '/docs/api'], metriques: ['Visites', 'Signups'], kpi_cible: '5000 visites/mois' },
        { etape: 'Activation', objectif: '1er appel API réussi', pages: ['/docs/api'], metriques: ['Time to first call', 'Activation rate'], kpi_cible: 'Activation 60%' },
        { etape: 'Conversion', objectif: 'Passage plan payant', pages: ['/tarifs'], metriques: ['Taux conversion'], kpi_cible: 'Conversion 15%' },
        { etape: 'Expansion', objectif: 'Upgrade plan supérieur', pages: ['Email upsell'], metriques: ['MRR expansion'], kpi_cible: 'Expansion 20%' },
      ],
      taux_conversion_par_etape: [
        { etape: 'Visiteur → Signup', taux_pct: 8.0, benchmark_secteur: 3.0 },
        { etape: 'Signup → Activé', taux_pct: 60.0, benchmark_secteur: 40.0 },
        { etape: 'Activé → Payant', taux_pct: 15.0, benchmark_secteur: 8.0 },
        { etape: 'Global', taux_pct: 0.72, benchmark_secteur: 0.10 },
      ],
      points_friction: [
        { etape: 'Signup → 1er appel', probleme: 'Documentation trop technique pour nouveaux', impact_pct: 25, solution: 'Quickstart interactif avec examples pré-remplis', difficulte_implementation: 'Moyenne' },
      ],
      optimisation_recommandations: ['Quickstart interactif', 'API playground intégré', 'Webhooks en temps réel dashboard'],
    },
    seo_structure: {
      architecture_seo: {
        type: 'Developer-focused SEO',
        silos_thematiques: [
          { silo: 'API KYC CEMAC', pages: ['/docs/api', '/blog/api-kyc'], mot_cle_principal: 'API KYC CEMAC' },
          { silo: 'FinTech Conformité', pages: ['/simulateur-conformite', '/blog/fintech-conformite'], mot_cle_principal: 'FinTech conformité CEMAC COBAC' },
        ],
        url_structure: '/{section}/{page}',
        hreflang: ['fr-CG', 'en'],
      },
      keyword_clusters: [
        { theme: 'API KYC', mot_cle_principal: 'API KYC CEMAC', volume_recherche_mensuel: 320, difficulte: 'Très Faible', mots_cles_secondaires: ['KYC automation CEMAC', 'API vérification identité Afrique', 'OCR CNI API'], mots_cles_longue_traine: ['API KYC pour FinTech africaine', 'intégration KYC COBAC', 'API screening sanctions GABAC'], pages_cibles: ['/docs/api'] },
      ],
      pages_piliers: [
        { titre: 'KYC API Documentation', url: '/docs/api/kyc', mot_cle: 'KYC API documentation CEMAC', contenu_principal: 'Documentation technique complète API KYC : authentication, endpoints, error codes, rate limits, SDKs.', sous_pages: ['/docs/api'], schema_type: 'TechArticle' },
      ],
      balisage_schema: [
        { page: '/docs/api', type_schema: 'TechArticle', proprietes: { name: 'PayCEMAC API Docs', about: 'API KYC, Screening, Scoring' } },
      ],
      strategie_maillage: {
        liens_internes: 72,
        liens_sortants: 18,
        ancres_recommandees: ['API KYC CEMAC', 'documentation API', 'SDK KYC', 'intégration FinTech'],
        silo_linking: [
          { depuis: '/blog/api-kyc', vers: '/docs/api', ancre: 'API documentation complète' },
        ],
      },
    },
    metadata: {
      generateur: 'KOS Website Automation Engine™ v1.0',
      date_generation: '2026-06-24T12:02:00Z',
      duree_generation_secondes: 7.2,
      pages_generees: 20,
      modules_total: 22,
      score_global_automation: 88,
      mode: 'MOCK — Démo Interactive Website Automation',
    },
  },

  // ─── WA-004 : Cabinet Conseil Multi-Services ───
  {
    scenario: SCENARIOS[3],
    site_architecture: {
      structure: {
        nom: 'KHEPRA EXPERTS — Hub Conformité Multi-Juridictionnel',
        pages: [
          { id: 'P01', titre: 'Accueil — KHEPRA Conformité CEMAC+UEMOA', url: '/', type: 'landing', priorite: 'P0', modules: ['Hero mondial', 'Cartes zones', 'Services flagship', 'KPIs', 'Témoignages Big Four', 'CTA diagnostic'], conversion_goal: 'Diagnostic multi-pays', meta_description: 'KHEPRA EXPERTS — Leader conformité CEMAC+UEMOA. Audit COBAC, BCEAO, BEAC, GABAC. Diagnostic gratuit multi-juridictionnel.' },
          { id: 'P02', titre: 'Services Conformité', url: '/services', type: 'service', priorite: 'P0', modules: ['Grille services 4 colonnes', 'Par zone', 'Par secteur', 'CTA'], conversion_goal: 'Demande consultation', meta_description: 'Services conformité multi-juridictionnels : COBAC, BCEAO, BEAC, GABAC, OHADA. Audit, conseil, formation.' },
          { id: 'P03', titre: 'Zones — CEMAC', url: '/zones/cemac', type: 'landing', priorite: 'P0', modules: ['Carte CEMAC', 'Services CEMAC', 'Réglementation COBAC', 'Bureaux'], conversion_goal: 'Contact bureau CEMAC', meta_description: 'Services conformité CEMAC : Cameroun, Gabon, Congo, Guinée Équatoriale, RCA, Tchad. Experts COBAC locaux.' },
          { id: 'P04', titre: 'Zones — UEMOA', url: '/zones/uemoa', type: 'landing', priorite: 'P0', modules: ['Carte UEMOA', 'Services UEMOA', 'Réglementation BCEAO', 'Bureaux'], conversion_goal: 'Contact bureau UEMOA', meta_description: 'Services conformité UEMOA : Côte d\'Ivoire, Sénégal, Burkina, Mali, Niger, Bénin, Togo, Guinée-Bissau. Experts BCEAO.' },
          { id: 'P05', titre: 'Diagnostic Multi-Pays', url: '/diagnostic-multi-pays', type: 'tool', priorite: 'P0', modules: ['Formulaire 20 questions', 'Scoring par pays', 'Comparaison benchmark', 'Rapport consolidé'], conversion_goal: 'Demande audit multi-pays', meta_description: 'Diagnostic conformité multi-pays — Évaluez votre conformité COBAC et BCEAO simultanément. Rapport comparatif gratuit.' },
          { id: 'P06', titre: 'Blog Expert', url: '/blog', type: 'blog', priorite: 'P1', modules: ['Articles', 'Catégories zones', 'Auteurs experts'], conversion_goal: 'Newsletter premium', meta_description: 'Blog KHEPRA EXPERTS — Analyses conformité CEMAC, UEMOA, OHADA. Articles d\'experts Big Four.' },
          { id: 'P07', titre: 'Webinars', url: '/webinars', type: 'resource', priorite: 'P2', modules: ['Calendrier', 'Replay', 'Inscription'], conversion_goal: 'Inscription webinar', meta_description: 'Webinars conformité — COBAC, BCEAO, GABAC, LBC/FT. Animés par nos experts.' },
        ],
        modules_globaux: [
          { nom: 'Navbar Premium', description: 'Navigation multi-niveaux avec sélecteur de zone', pages_concernees: 'Toutes', regles_affichage: 'Fixe haut, méga-menu services' },
          { nom: 'Chatbot Multilingue', description: 'Assistant FR/EN, expert multi-juridictionnel', pages_concernees: 'Toutes', regles_affichage: 'Bulle bas-droite, choix langue' },
          { nom: 'Sélecteur Zone', description: 'Switch CEMAC/UEMOA/OHADA', pages_concernees: 'Toutes', regles_affichage: 'Top bar' },
          { nom: 'Footer Enterprise', description: 'Multi-colonnes, liens par zone', pages_concernees: 'Toutes', regles_affichage: 'Toujours visible' },
        ],
        navigation: {
          menu_principal: [
            { label: 'Services', url: '/services', enfants: [{ label: 'Audit COBAC', url: '/services#cobac' }, { label: 'Audit BCEAO', url: '/services#bceao' }, { label: 'LBC/FT', url: '/services#lbcft' }, { label: 'Gouvernance', url: '/services#gouvernance' }] },
            { label: 'Zones', url: '#', enfants: [{ label: 'CEMAC', url: '/zones/cemac' }, { label: 'UEMOA', url: '/zones/uemoa' }] },
            { label: 'Diagnostic', url: '/diagnostic-multi-pays' },
            { label: 'Blog', url: '/blog' },
            { label: 'Webinars', url: '/webinars' },
          ],
          footer_links: [
            { categorie: 'CEMAC', liens: [{ label: 'Cameroun', url: '/zones/cemac#cameroun' }, { label: 'Gabon', url: '/zones/cemac#gabon' }, { label: 'Congo', url: '/zones/cemac#congo' }] },
            { categorie: 'UEMOA', liens: [{ label: 'Côte d\'Ivoire', url: '/zones/uemoa#civ' }, { label: 'Sénégal', url: '/zones/uemoa#senegal' }] },
            { categorie: 'Légal', liens: [{ label: 'Mentions', url: '/mentions-legales' }, { label: 'CGU', url: '/cgu' }] },
          ],
          cta_sticky: { texte: 'Diagnostic Multi-Pays', url: '/diagnostic-multi-pays', position: 'bottom-right' },
        },
      },
      arborescence_url: ['/', '/services', '/zones/cemac', '/zones/uemoa', '/diagnostic-multi-pays', '/blog', '/webinars', '/contact', '/mentions-legales', '/cgu'],
      sitemap_preview: 'sitemap.xml — 32 URLs',
    },
    dynamic_content_rules: {
      regles_par_type_utilisateur: [
        { type_utilisateur: 'DG Groupe', detection: 'UTM: source=linkedin&audience=c-level', pages_adaptees: 'Landing executive', contenu_specifique: ['Résumé exécutif', 'ROI multi-pays', 'Témoignages CEO'], call_to_action: 'Appel stratégique', offre_prioritaire: 'Audit consolidé groupe' },
        { type_utilisateur: 'CCO / Compliance', detection: 'Comportement: outils+blog>5 pages', pages_adaptees: 'Expert view', contenu_specifique: ['Références réglementaires détaillées', 'Matrices scoring', 'Comparaison juridictions'], call_to_action: 'Essai outil compliance', offre_prioritaire: 'Abonnement veille multi-pays' },
        { type_utilisateur: 'État / Régulateur', detection: 'IP gouvernementale', pages_adaptees: 'Institutionnel', contenu_specifique: ['Agréments', 'Rapports publics', 'Équipe dirigeante'], call_to_action: 'Contact institutionnel', offre_prioritaire: 'Partenariat État' },
      ],
      personalisation_contenu: [
        { declencheur: 'Sélection zone CEMAC', action: 'Contenu adapté CEMAC sur toutes pages', variante: 'A: Bannière zone / B: Adaptation discrète', impact_conversion: '+15%' },
        { declencheur: 'Visiteur récurrent >3 visites', action: 'Popup "Abonnement veille"', variante: 'A: Modal / B: Slide-in', impact_conversion: '+10%' },
      ],
      ab_testing: [
        { element: 'CTA principal', variante_a: 'Diagnostic Multi-Pays Gratuit', variante_b: 'Évaluez votre conformité CEMAC+UEMOA', metrique: 'CTR', duree_test: '3 semaines' },
      ],
      geolocalisation: [
        { pays: 'Cameroun', pages_specifiques: ['/zones/cemac#cameroun'], langue: 'fr', reglementation_locale: 'COBAC Cameroun', offre_locale: 'Bureau Douala' },
        { pays: 'Côte d\'Ivoire', pages_specifiques: ['/zones/uemoa#civ'], langue: 'fr', reglementation_locale: 'BCEAO Côte d\'Ivoire', offre_locale: 'Bureau Abidjan' },
        { pays: 'Sénégal', pages_specifiques: ['/zones/uemoa#senegal'], langue: 'fr', reglementation_locale: 'BCEAO Sénégal', offre_locale: 'Bureau Dakar' },
      ],
    },
    lead_generation_flows: {
      flows: [
        { id: 'LF-301', nom: 'Enterprise B2B — Diagnostic → Audit', declencheur: 'Diagnostic multi-pays complété', etapes: ['Formulaire 20 questions', 'Rapport consolidé multi-pays', 'Email rapport + proposition audit', 'Appel commercial J+2', 'Proposition personnalisée J+5'], taux_conversion_estime: 10.0, pages_cibles: ['/diagnostic-multi-pays'] },
        { id: 'LF-302', nom: 'Webinar → Nurturing → Consultation', declencheur: 'Inscription webinar', etapes: ['Confirmation + calendrier', 'Relance J-1', 'Replay J+1', 'Email J+3 avec ressources', 'CTA consultation J+7'], taux_conversion_estime: 5.0, pages_cibles: ['/webinars'] },
      ],
      lead_magnets: [
        { id: 'LM-301', type: 'rapport', titre: 'Rapport Comparatif Conformité CEMAC vs UEMOA', valeur_percue: 'Très élevée', pages_affichage: ['/', '/services', '/blog'], champs_formulaire: ['email', 'nom', 'entreprise', 'pays_operation'] },
        { id: 'LM-302', type: 'webinar', titre: 'Webinar Trimestriel — Veille Réglementaire', valeur_percue: 'Très élevée', pages_affichage: ['/', '/webinars'], champs_formulaire: ['email', 'nom', 'entreprise', 'fonction'] },
        { id: 'LM-303', type: 'diagnostic', titre: 'Diagnostic Conformité Multi-Pays', valeur_percue: 'Très élevée', pages_affichage: ['/', '/services'], champs_formulaire: ['email', 'nom', 'entreprise', 'pays', 'secteur'] },
      ],
      popups: [
        { type: 'exit-intent', declencheur: 'Sortie page services', offre: 'Rapport comparatif CEMAC/UEMOA', design: 'Modal premium', frequence_max: '1/14j' },
      ],
      email_sequences: [
        { nom: 'Enterprise Nurturing', declencheur: 'Téléchargement rapport', nombre_emails: 6, objectif: 'Conversion consultation', emails: [
          { jour: 0, sujet: 'Votre rapport comparatif CEMAC/UEMOA', contenu_key: 'rapport' },
          { jour: 2, sujet: 'Les 5 différences clés COBAC vs BCEAO', contenu_key: 'differences' },
          { jour: 5, sujet: 'Cas client : Groupe Panafricain — Audit multi-pays', contenu_key: 'case_study' },
          { jour: 8, sujet: 'Votre feuille de route conformité 2026-2027', contenu_key: 'roadmap' },
          { jour: 12, sujet: 'Invitation webinar exclusif — Conformité 2027', contenu_key: 'webinar_invite' },
          { jour: 16, sujet: 'Consultation stratégique offerte — 45 minutes', contenu_key: 'offre' },
        ]},
      ],
    },
    diagnostic_tools_logic: {
      outils: [
        { id: 'DT-301', nom: 'Diagnostic Conformité Multi-Pays', type: 'questionnaire', nombre_questions: 20, duree_estimee: '10 min', resultats_possibles: ['Conforme (80-100%)', 'Partiel (50-79%)', 'Non Conforme (<50%)'], pages_affichage: ['/diagnostic-multi-pays'] },
        { id: 'DT-302', nom: 'Comparateur Juridictions', type: 'scanner', nombre_questions: 4, duree_estimee: '2 min', resultats_possibles: ['Aligné', 'Divergence mineure', 'Divergence majeure'], pages_affichage: ['/diagnostic-multi-pays'] },
      ],
      scoring: {
        methode: 'Score pondéré multi-pays, 5 axes par juridiction',
        ponderations: [
          { axe: 'Gouvernance', poids_pct: 20, questions: ['CA', 'Comités', 'Indépendance'] },
          { axe: 'LBC/FT', poids_pct: 30, questions: ['KYC', 'BE', 'DS', 'Formation'] },
          { axe: 'Contrôle Interne', poids_pct: 20, questions: ['Processus', 'Matrice', 'Audit'] },
          { axe: 'Reporting', poids_pct: 15, questions: ['BEAC', 'BCEAO', 'Délais'] },
          { axe: 'SI/Sécurité', poids_pct: 15, questions: ['Pentest', 'PCA', 'RBAC'] },
        ],
        seuils: [
          { label: 'Conforme', min: 80, max: 100, action: 'Excellent — Proposition audit annuel', couleur: '#059669' },
          { label: 'Partiel', min: 50, max: 79, action: 'Plan d\'harmonisation recommandé', couleur: '#D97706' },
          { label: 'Non Conforme', min: 0, max: 49, action: 'Mission urgente multi-pays', couleur: '#DC2626' },
        ],
      },
      rapport: { format: 'PDF 12 pages + Dashboard interactif', sections: ['Résumé exécutif', 'Score global', 'Comparaison par pays', 'Analyse par axe', 'Divergences inter-juridictions', 'Recommandations', 'Plan d\'action 180 jours'], delai_generation: 'Instantané', call_to_action: 'Consultation stratégique', personnalisable: true },
      integration_n8n: [
        { workflow: 'Pipeline commercial multi-pays', declencheur: 'Diagnostic complété', action: 'Scoring → CRM → Assignation commercial par zone → email personnalisé', score_automatisation: 93 },
      ],
    },
    ai_chatbot_behavior: {
      identite: {
        nom: 'KHEPRA Expert™',
        role: 'Senior Partner — Conformité Multi-Juridictionnelle',
        ton: 'Consultatif, premium, rassurant. Niveau Partner Big Four.',
        phrases_signature: ['Selon notre expérience dans 14 pays CEMAC+UEMOA...', 'Je vous recommande une approche par zone...', 'Notre équipe a géré ce type de projet pour...'],
        avatar_prompt: 'Senior African managing partner, distinguished professional, premium office, confident authoritative yet warm',
        niveau_expertise: 'Partner Big Four — 25 ans conformité africaine',
      },
      scenarios_conversation: [
        { intention: 'comparaison_juridictions', detection_keywords: ['différence', 'comparaison', 'COBAC vs BCEAO', 'CEMAC UEMOA', 'similaire', 'équivalent'], flux_reponse: [
          { etape: 1, reponse: 'Excellente question. COBAC et BCEAO partagent les fondamentaux (Bâle, GAFI) mais diffèrent sur : 1) Le format de reporting (BEAC vs BCEAO), 2) Les seuils LBC/FT, 3) La fréquence des inspections. Nous avons un rapport comparatif détaillé. Souhaitez-vous le recevoir ?' },
        ], fallback: 'Téléchargez notre rapport comparatif COBAC vs BCEAO.' },
        { intention: 'urgence_multi_pays', detection_keywords: ['urgence', 'plusieurs pays', 'groupe', 'filiales', 'consolidation', 'holding'], flux_reponse: [
          { etape: 1, reponse: 'Un projet multi-pays en urgence ? C\'est notre spécialité. Nous mobilisons une équipe dédiée par zone en 48h. Quel est le périmètre exact (pays et nombre de filiales) ?' },
          { etape: 2, reponse: 'Parfait. Je transfère immédiatement votre demande à notre Managing Partner zone CEMAC/UEMOA. Il vous contactera dans l\'heure.', action: 'Escalade Partner' },
        ], fallback: 'Contactez directement notre Managing Partner : partner@khepra-experts.com' },
      ],
      regles_conformite: [
        { id: 'CR-301', regle: 'Confidentialité absolue', condition: 'Toute conversation', action_blocage: 'Message confidentialité', message_utilisateur: 'Cette conversation est confidentielle. Aucune information ne sera partagée sans votre consentement explicite.' },
      ],
      escalade_humaine: [
        { condition: 'Projet > 100M FCFA', destination: 'Managing Partner — Appel direct', delai_max: '1 heure', donnees_transmises: ['Profil complet', 'Historique', 'Périmètre projet'] },
      ],
      limitations: ['Pas de conseil juridique engageant', 'Confidentialité absolue', 'Escalade Partner pour projets stratégiques'],
    },
    conversion_funnel: {
      etapes: [
        { etape: 'Acquisition', objectif: 'C-Levels Afrique francophone', pages: ['/', '/services', '/blog'], metriques: ['Visites', 'Trafic direct'], kpi_cible: '15000 visites/mois' },
        { etape: 'Activation', objectif: 'Diagnostic ou téléchargement rapport', pages: ['/diagnostic-multi-pays'], metriques: ['Taux complétion'], kpi_cible: 'Conversion 10%' },
        { etape: 'Qualification', objectif: 'Scoring lead → Assignation Partner', pages: ['CRM'], metriques: ['Lead score', 'Temps réponse'], kpi_cible: 'Réponse < 2h' },
        { etape: 'Conversion', objectif: 'RDV Partner', pages: ['Calendly Partner'], metriques: ['RDV pris'], kpi_cible: 'Conversion 30% lead → RDV' },
        { etape: 'Closing', objectif: 'Signature mission', pages: ['Proposition'], metriques: ['Taux closing', 'Panier moyen'], kpi_cible: 'Closing 45%, panier > 50M FCFA' },
      ],
      taux_conversion_par_etape: [
        { etape: 'Visiteur → Lead', taux_pct: 10.0, benchmark_secteur: 3.0 },
        { etape: 'Lead → RDV', taux_pct: 30.0, benchmark_secteur: 12.0 },
        { etape: 'RDV → Contrat', taux_pct: 45.0, benchmark_secteur: 25.0 },
        { etape: 'Global', taux_pct: 1.35, benchmark_secteur: 0.09 },
      ],
      points_friction: [
        { etape: 'Lead → RDV', probleme: 'Délai de réponse > 24h', impact_pct: 40, solution: 'Automatisation assignation Partner + alerte Slack < 5 min', difficulte_implementation: 'Moyenne' },
        { etape: 'RDV → Contrat', probleme: 'Cycle vente 45 jours (trop long)', impact_pct: 25, solution: 'Proposition type pré-approuvée + signature électronique', difficulte_implementation: 'Facile' },
      ],
      optimisation_recommandations: ['Réduire cycle vente à 21 jours', 'Automatiser relances commerciales', 'Créer page "Pourquoi KHEPRA" avec preuves sociales'],
    },
    seo_structure: {
      architecture_seo: {
        type: 'Multi-silo par zone + thématique',
        silos_thematiques: [
          { silo: 'CEMAC Conformité', pages: ['/zones/cemac', '/services#cobac', '/blog/cemac'], mot_cle_principal: 'conformité CEMAC COBAC' },
          { silo: 'UEMOA Conformité', pages: ['/zones/uemoa', '/services#bceao', '/blog/uemoa'], mot_cle_principal: 'conformité UEMOA BCEAO' },
          { silo: 'LBC/FT Afrique', pages: ['/services#lbcft', '/blog/lbcft'], mot_cle_principal: 'LBC/FT Afrique francophone' },
          { silo: 'Gouvernance OHADA', pages: ['/services#gouvernance', '/blog/ohada'], mot_cle_principal: 'gouvernance OHADA' },
        ],
        url_structure: '/{zone|theme}/{page}',
        hreflang: ['fr-CM', 'fr-CI', 'fr-SN', 'fr-GA', 'en'],
      },
      keyword_clusters: [
        { theme: 'Conformité CEMAC+UEMOA', mot_cle_principal: 'conformité CEMAC UEMOA', volume_recherche_mensuel: 880, difficulte: 'Faible', mots_cles_secondaires: ['audit conformité Afrique', 'COBAC BCEAO conformité', 'cabinet conformité CEMAC', 'expert conformité UEMOA'], mots_cles_longue_traine: ['différence COBAC et BCEAO', 'audit multi-pays CEMAC UEMOA', 'conformité groupe bancaire panafricain', 'comment harmoniser conformité CEMAC UEMOA'], pages_cibles: ['/', '/services', '/diagnostic-multi-pays'] },
      ],
      pages_piliers: [
        { titre: 'Guide Conformité Multi-Juridictionnel CEMAC+UEMOA', url: '/guide-conformite-multi-juridictionnel', mot_cle: 'guide conformité CEMAC UEMOA multi-juridictionnel', contenu_principal: 'Guide exhaustif 12000 mots : harmonisation conformité CEMAC+UEMOA, comparaison COBAC/BCEAO, stratégie multi-filiales.', sous_pages: ['/services', '/zones/cemac', '/zones/uemoa', '/diagnostic-multi-pays'], schema_type: 'Article' },
      ],
      balisage_schema: [
        { page: '/', type_schema: 'Organization', proprietes: { name: 'KHEPRA EXPERTS', areaServed: 'CEMAC, UEMOA', knowsAbout: 'COBAC, BCEAO, BEAC, GABAC, OHADA, LBC/FT' } },
        { page: '/diagnostic-multi-pays', type_schema: 'WebApplication', proprietes: { name: 'Diagnostic Conformité Multi-Pays' } },
      ],
      strategie_maillage: {
        liens_internes: 248,
        liens_sortants: 52,
        ancres_recommandees: ['conformité CEMAC UEMOA', 'audit COBAC BCEAO', 'diagnostic multi-pays', 'LBC/FT Afrique francophone', 'gouvernance OHADA', 'reporting BEAC BCEAO'],
        silo_linking: [
          { depuis: '/guide-conformite-multi-juridictionnel', vers: '/diagnostic-multi-pays', ancre: 'diagnostic conformité multi-pays gratuit' },
          { depuis: '/guide-conformite-multi-juridictionnel', vers: '/services', ancre: 'services conformité multi-juridictionnels' },
          { depuis: '/zones/cemac', vers: '/zones/uemoa', ancre: 'comparez avec la zone UEMOA' },
        ],
      },
    },
    metadata: {
      generateur: 'KOS Website Automation Engine™ v1.0',
      date_generation: '2026-06-24T12:03:00Z',
      duree_generation_secondes: 15.6,
      pages_generees: 32,
      modules_total: 38,
      score_global_automation: 89,
      mode: 'MOCK — Démo Interactive Website Automation',
    },
  },
];

// ═══════════════════════════════════════════════════════
// WEBSITE AUTOMATION AGENTS
// ═══════════════════════════════════════════════════════

export const WEBSITE_AGENTS = [
  { id: 'wa-01', nom: 'Site Architect™', mission: 'Conception de l\'architecture complète du site : pages, modules, navigation, arborescence, sitemap', statut: 'active', architectures_generees: 4, precision: 99.0, icon: 'ri-layout-masonry-line' },
  { id: 'wa-02', nom: 'Content Rules Engine™', mission: 'Règles de contenu dynamique : personnalisation par type d\'utilisateur, A/B testing, géolocalisation', statut: 'active', regles_generees: 42, precision: 97.5, icon: 'ri-user-settings-line' },
  { id: 'wa-03', nom: 'Lead Gen Designer™', mission: 'Conception des flows de génération de leads : lead magnets, popups, séquences email, nurturing', statut: 'active', flows_generees: 8, precision: 98.0, icon: 'ri-user-received-line' },
  { id: 'wa-04', nom: 'Diagnostic Tool Builder™', mission: 'Conception des outils diagnostics : questionnaires, scoring, rapports, intégration n8n', statut: 'active', outils_generees: 6, precision: 97.8, icon: 'ri-tools-line' },
  { id: 'wa-05', nom: 'AI Chatbot Configurator™', mission: 'Configuration du chatbot IA expert conformité : identité, scénarios, règles conformité, escalade', statut: 'active', chatbots_configures: 4, precision: 98.5, icon: 'ri-robot-line' },
  { id: 'wa-06', nom: 'Conversion Funnel Architect™', mission: 'Design du funnel de conversion complet : étapes, KPIs, points de friction, optimisations', statut: 'active', funnels_dessines: 4, precision: 96.5, icon: 'ri-filter-3-line' },
  { id: 'wa-07', nom: 'SEO Structure Generator™', mission: 'Génération de la structure SEO : silos, keyword clusters, pages piliers, schema, maillage', statut: 'active', structures_seo: 4, precision: 98.0, icon: 'ri-search-eye-line' },
];

export const WEBSITE_KPIS = {
  scenarios_disponibles: 4,
  types_institutions: ['Banque', 'EMF', 'FinTech', 'Multi-Service'],
  livrables_par_scenario: 7,
  total_pages_generees: 92,
  total_modules: 109,
  total_lead_magnets: 11,
  total_keyword_clusters: 6,
  score_global_moyen: 87,
  temps_generation_moyen: '10 secondes',
  mode: 'MOCK — Démo Interactive Website Automation',
};



