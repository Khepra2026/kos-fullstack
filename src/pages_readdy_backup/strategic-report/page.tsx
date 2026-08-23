import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { OG_IMAGES } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

// ─── Types ───────────────────────────────────────────────────────────────────
type TabId = 'seo' | 'content' | 'ux' | 'benchmark' | 'keywords' | 'roadmap';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const tabs: Tab[] = [
  { id: 'seo', label: 'Audit SEO Technique', icon: 'ri-search-eye-line' },
  { id: 'content', label: 'Stratégie de Contenu', icon: 'ri-article-line' },
  { id: 'ux', label: 'UX/UI & Architecture', icon: 'ri-layout-line' },
  { id: 'benchmark', label: 'Benchmark Concurrentiel', icon: 'ri-bar-chart-grouped-line' },
  { id: 'keywords', label: 'Mots-clés SEO', icon: 'ri-price-tag-3-line' },
  { id: 'roadmap', label: 'Roadmap & Priorités', icon: 'ri-route-line' },
];

const seoAudit = {
  score: 82,
  strengths: [
    { icon: 'ri-check-line', text: 'Schema.org complet : WebSite, Organization, LocalBusiness, FAQPage, BlogPosting, Service, BreadcrumbList' },
    { icon: 'ri-check-line', text: 'Balises Open Graph et Twitter Card présentes sur toutes les pages' },
    { icon: 'ri-check-line', text: 'Fil d\'Ariane (BreadcrumbList) implémenté sur toutes les pages internes' },
    { icon: 'ri-check-line', text: 'Géolocalisation SEO : geo.region, geo.position, ICBM configurés pour Lomé' },
    { icon: 'ri-check-line', text: 'Preconnect et DNS-prefetch pour les ressources critiques' },
    { icon: 'ri-check-line', text: 'Preload de l\'image hero (LCP) avec fetchpriority="high"' },
    { icon: 'ri-check-line', text: 'Sitemap XML avec hreflang fr/en sur toutes les URLs' },
    { icon: 'ri-check-line', text: 'robots.txt cohérent avec le sitemap' },
    { icon: 'ri-check-line', text: 'Chargement asynchrone des polices et icônes (non bloquant)' },
    { icon: 'ri-check-line', text: 'Lazy loading des pages via React.lazy() + Suspense' },
    { icon: 'ri-check-line', text: 'CSP (Content-Security-Policy) et X-XSS-Protection actifs via Netlify' },
    { icon: 'ri-check-line', text: 'Sitemap et robots.txt corrigés avec le domaine réel khepraexperts.com' },
  ],
  weaknesses: [
    { icon: 'ri-alert-line', severity: 'medium', text: 'URLs des articles de blog numériques (/blog/1, /blog/2) — non descriptives pour le SEO' },
    { icon: 'ri-alert-line', severity: 'medium', text: 'Pas de sitemap d\'images (image sitemap) pour les visuels générés' },
    { icon: 'ri-alert-line', severity: 'medium', text: 'Balise H1 absente sur certaines pages internes (vérifier pages légales)' },
    { icon: 'ri-alert-line', severity: 'medium', text: 'Pas de données structurées HowTo ou Guide pour les ressources téléchargeables' },
    { icon: 'ri-alert-line', severity: 'low', text: 'Pas de balise <link rel="next/prev"> pour la pagination du blog' },
    { icon: 'ri-alert-line', severity: 'low', text: 'Absence de fichier manifest.json pour PWA/mobile' },
    { icon: 'ri-alert-line', severity: 'low', text: 'Pas de balise hreflang sur les pages de services détaillées' },
    { icon: 'ri-alert-line', severity: 'medium', text: 'CDN Cloudflare non activé — TTFB élevé en Afrique sans PoP proche (Lagos, Joburg, Nairobi)' },
  ],
  geoAeo: [
    { title: 'GEO (Generative Engine Optimization)', desc: 'Structurer les réponses pour être cité par ChatGPT, Gemini, Perplexity. Ajouter des définitions claires, des listes numérotées et des données chiffrées dans chaque article.' },
    { title: 'AEO (Answer Engine Optimization)', desc: 'Optimiser les FAQ avec des réponses directes de 40-60 mots. Google extrait ces réponses pour les featured snippets et les assistants vocaux.' },
    { title: 'E-E-A-T (Expérience, Expertise, Autorité, Fiabilité)', desc: 'Ajouter des pages auteur détaillées avec biographies, certifications et liens LinkedIn. Citer des sources officielles (BCEAO, Banque Mondiale) dans chaque article.' },
    { title: 'Core Web Vitals', desc: 'LCP optimisé via preload. Vérifier FID/INP et CLS. Objectif : LCP < 2,5s, CLS < 0,1, INP < 200ms. TTFB à réduire avec Cloudflare CDN (PoP Afrique).' },
  ],
};

const contentStrategy = {
  blogAnalysis: {
    strengths: ['21 articles publiés — volume correct pour un cabinet de conseil', 'Contenu long-form (8-16 min de lecture) — excellent pour le SEO', 'Thématiques diversifiées : gouvernance, finance, inclusion, RH, politiques publiques', 'Articles récents sur la conformité BCEAO 2025 — très pertinents et actuels'],
    gaps: ['Fréquence irrégulière : certains mois sans publication', 'Pas de contenu vidéo ou podcast associé aux articles', 'Pas d\'infographies ou de visuels de données (data viz)', 'Aucun article en anglais sur le blog principal', 'Pas de série thématique structurée (ex: "Guide complet BCEAO en 5 parties")', 'Absence de contenu interactif (quiz, calculateurs, outils)'],
  },
  editorialPlan: [
    { month: 'Juillet 2025', theme: 'Conformité & Réglementation', articles: ['Guide complet : Mise en conformité BCEAO 2025 pour les banques commerciales', 'Checklist : 50 points de contrôle pour l\'audit interne des SFD', 'Infographie : Calendrier réglementaire UEMOA 2025-2026'] },
    { month: 'Août 2025', theme: 'Inclusion Financière & FinTech', articles: ['État des lieux du mobile money en Afrique de l\'Ouest : chiffres clés 2025', 'Comment obtenir un agrément FinTech BCEAO : guide étape par étape', 'Comparatif : Les 10 meilleures solutions core banking pour les SFD'] },
    { month: 'Septembre 2025', theme: 'Gouvernance & Conseil d\'Administration', articles: ['Gouvernance des PME africaines : les 7 erreurs fatales à éviter', 'Modèle de charte de gouvernance pour institutions financières (téléchargeable)', 'Interview : Comment structurer son CA pour attirer des investisseurs internationaux'] },
    { month: 'Octobre 2025', theme: 'Levée de Fonds & Investissement', articles: ['Cartographie des fonds d\'investissement actifs en Afrique de l\'Ouest 2025', 'Pitch deck parfait : les 12 slides indispensables pour les investisseurs africains', 'Due diligence : ce que les investisseurs vérifient vraiment (checklist)'] },
    { month: 'Novembre 2025', theme: 'Transformation Digitale', articles: ['Transformation digitale des SFD : retour d\'expérience sur 5 projets réels', 'Cybersécurité pour les institutions financières africaines : guide pratique', 'IA et finance en Afrique : opportunités et risques pour les PME'] },
    { month: 'Décembre 2025', theme: 'Bilan & Perspectives', articles: ['Bilan 2025 : les grandes tendances de la finance en Afrique de l\'Ouest', 'Prévisions 2026 : 10 enjeux stratégiques pour les institutions financières UEMOA', 'Rapport annuel KHEPRA EXPERTS : impact et réalisations 2025'] },
  ],
  newFormats: [
    { icon: 'ri-calculator-line', title: 'Calculateur de conformité', desc: 'Outil interactif permettant aux SFD d\'évaluer leur niveau de conformité BCEAO en 10 questions' },
    { icon: 'ri-file-chart-line', title: 'Rapports sectoriels', desc: 'Publications trimestrielles sur l\'état du secteur financier en Afrique de l\'Ouest (format PDF premium)' },
    { icon: 'ri-video-line', title: 'Webinaires mensuels', desc: 'Sessions live de 60 min sur des thématiques réglementaires avec Q&A — génère des leads qualifiés' },
    { icon: 'ri-database-2-line', title: 'Base de données réglementaire', desc: 'Référentiel en ligne des textes BCEAO/COBAC avec moteur de recherche — outil de référence pour les praticiens en Afrique francophone' },
    { icon: 'ri-map-2-line', title: 'Carte interactive', desc: 'Visualisation de la présence et des projets KHEPRA par pays — renforce la crédibilité géographique' },
    { icon: 'ri-newspaper-line', title: 'Newsletter hebdomadaire', desc: 'Veille réglementaire et actualités financières UEMOA — fidélise l\'audience et nourrit le pipeline commercial' },
  ],
};

const uxAnalysis = {
  currentStrengths: [
    'Navigation principale claire avec menu structuré',
    'Page d\'accueil complète avec toutes les sections clés',
    'Fil d\'Ariane sur toutes les pages internes',
    'Recherche globale implémentée',
    'Bouton WhatsApp flottant pour la conversion',
    'Agent IA Readdy intégré',
    'Design sobre et professionnel adapté au secteur financier',
  ],
  improvements: [
    { priority: 'Haute', icon: 'ri-layout-masonry-line', title: 'Page Ressources enrichie', desc: 'Ajouter des filtres par type (guide, rapport, checklist), par thème et par niveau (débutant/expert). Afficher le nombre de téléchargements pour la preuve sociale.' },
    { priority: 'Haute', icon: 'ri-article-line', title: 'Hub de contenu "Publications"', desc: 'Créer une page dédiée aux publications officielles (rapports, études, notes de politique) distincte du blog — comme Climate Analytics.' },
    { priority: 'Haute', icon: 'ri-tools-line', title: 'Section "Outils & Calculateurs"', desc: 'Page dédiée aux outils interactifs : calculateur de conformité, simulateur de ratios prudentiels, checklist d\'audit téléchargeable.' },
    { priority: 'Moyenne', icon: 'ri-user-line', title: 'Pages auteur détaillées', desc: 'Créer des profils d\'experts avec biographies, domaines d\'expertise, publications et certifications — essentiel pour l\'E-E-A-T Google.' },
    { priority: 'Moyenne', icon: 'ri-search-line', title: 'Améliorer la recherche', desc: 'Ajouter des filtres par catégorie, date et type de contenu dans la recherche globale. Afficher des suggestions en temps réel.' },
    { priority: 'Basse', icon: 'ri-moon-line', title: 'Mode sombre', desc: 'Option de thème sombre pour améliorer l\'expérience de lecture des articles longs.' },
  ],
  wireframes: [
    {
      page: 'Page Publications (nouvelle)',
      description: 'Structure inspirée de Climate Analytics',
      elements: ['Hero avec compteur de publications', 'Filtres : Thème | Type | Année | Langue', 'Grille de cartes avec aperçu, date, auteur', 'Sidebar : publications récentes + newsletter', 'Pagination + chargement infini'],
    },
    {
      page: 'Page Outils (nouvelle)',
      description: 'Centre de ressources interactives',
      elements: ['Calculateur de conformité BCEAO (formulaire interactif)', 'Simulateur de ratios prudentiels', 'Générateur de checklist d\'audit', 'Bibliothèque de modèles téléchargeables', 'Accès premium via inscription newsletter'],
    },
    {
      page: 'Page Ressources (améliorée)',
      description: 'Refonte avec filtres avancés',
      elements: ['Barre de recherche proéminente', 'Filtres multi-critères (type, thème, niveau)', 'Cartes avec badge "Nouveau" / "Populaire"', 'Compteur de téléchargements', 'Section "Recommandés pour vous"'],
    },
  ],
};

const benchmark = {
  climateAnalytics: {
    strengths: [
      'Structure de navigation exemplaire : About / Our work / Publications / News / Projects / Tools',
      'Section "Publications" dédiée avec centaines de rapports téléchargeables',
      'Section "Tools" avec outils interactifs (Climate Action Tracker)',
      'Présence internationale visible : bureaux dans 6 régions du monde',
      'Contenu en plusieurs langues',
      'Forte autorité de domaine grâce aux citations académiques et institutionnelles',
      'Design épuré avec images de haute qualité',
      'Newsletter et flux RSS pour fidéliser l\'audience',
    ],
    weaknesses: [
      'Site en anglais uniquement (pas de version française)',
      'Pas de chatbot ou assistant IA',
      'Formulaire de contact basique',
      'Pas de calculateurs ou outils interactifs pour les praticiens',
    ],
  },
  comparison: [
    { criterion: 'Volume de contenu', khepra: '21 articles + 6 ressources', climate: '200+ publications + rapports', advantage: 'climate' },
    { criterion: 'Outils interactifs', khepra: 'Aucun', climate: 'Climate Action Tracker + 3 outils', advantage: 'climate' },
    { criterion: 'Présence géographique', khepra: '6 pays UEMOA', climate: 'Mondial (6 bureaux)', advantage: 'climate' },
    { criterion: 'Langues', khepra: 'FR + EN (partiel)', climate: 'EN uniquement', advantage: 'khepra' },
    { criterion: 'Assistant IA', khepra: 'Readdy Agent intégré', climate: 'Aucun', advantage: 'khepra' },
    { criterion: 'SEO local/régional', khepra: 'Optimisé Lomé/UEMOA', climate: 'Non applicable', advantage: 'khepra' },
    { criterion: 'Schema.org', khepra: 'Très complet', climate: 'Basique', advantage: 'khepra' },
    { criterion: 'Études de cas', khepra: '8 études de cas', climate: 'Projets détaillés', advantage: 'equal' },
    { criterion: 'Fréquence publication', khepra: 'Irrégulière', climate: 'Hebdomadaire', advantage: 'climate' },
    { criterion: 'Autorité de domaine', khepra: 'En construction', climate: 'Très élevée (DA 60+)', advantage: 'climate' },
  ],
  actionPlan: [
    'Créer une section "Publications" dédiée avec 50+ documents téléchargeables d\'ici 12 mois',
    'Développer 3 outils interactifs (calculateur conformité, simulateur ratios, checklist audit)',
    'Publier 2 articles par semaine pour atteindre 100+ articles en 12 mois',
    'Lancer une newsletter hebdomadaire de veille réglementaire UEMOA',
    'Obtenir des backlinks depuis des institutions (BCEAO, Banque Mondiale, AFD)',
    'Créer des pages de présence pour chaque pays couvert (Togo, Bénin, Côte d\'Ivoire, etc.)',
  ],
};

const keywords = {
  primary: [
    { kw: 'cabinet conseil Lomé Togo', volume: '320/mois', difficulty: 'Faible', intent: 'Commercial' },
    { kw: 'conformité BCEAO 2025', volume: '880/mois', difficulty: 'Moyenne', intent: 'Informatif' },
    { kw: 'audit SFD microfinance UEMOA', volume: '590/mois', difficulty: 'Faible', intent: 'Commercial' },
    { kw: 'gouvernance entreprise Afrique Ouest', volume: '1 200/mois', difficulty: 'Moyenne', intent: 'Informatif' },
    { kw: 'levée de fonds startup Afrique', volume: '2 400/mois', difficulty: 'Haute', intent: 'Commercial' },
    { kw: 'conseil stratégique PME Togo', volume: '210/mois', difficulty: 'Faible', intent: 'Commercial' },
    { kw: 'inclusion financière Afrique Ouest', volume: '3 600/mois', difficulty: 'Haute', intent: 'Informatif' },
    { kw: 'transformation digitale SFD', volume: '480/mois', difficulty: 'Faible', intent: 'Commercial' },
  ],
  secondary: [
    { kw: 'gestion risques crédit microfinance', volume: '720/mois', difficulty: 'Moyenne', intent: 'Informatif' },
    { kw: 'agrément FinTech BCEAO', volume: '390/mois', difficulty: 'Faible', intent: 'Commercial' },
    { kw: 'due diligence investissement Afrique', volume: '1 100/mois', difficulty: 'Moyenne', intent: 'Commercial' },
    { kw: 'stratégie nationale inclusion financière', volume: '560/mois', difficulty: 'Faible', intent: 'Informatif' },
    { kw: 'LBC/FT conformité UEMOA', volume: '430/mois', difficulty: 'Faible', intent: 'Informatif' },
    { kw: 'mobile money Afrique Ouest 2025', volume: '2 100/mois', difficulty: 'Haute', intent: 'Informatif' },
    { kw: 'contrôle interne institution financière', volume: '650/mois', difficulty: 'Moyenne', intent: 'Informatif' },
    { kw: 'business plan PME Afrique', volume: '1 800/mois', difficulty: 'Haute', intent: 'Informatif' },
    { kw: 'expert comptable Lomé', volume: '280/mois', difficulty: 'Faible', intent: 'Commercial' },
    { kw: 'conseil gouvernance ONG Afrique', volume: '340/mois', difficulty: 'Faible', intent: 'Commercial' },
    { kw: 'formation gouvernance administrateurs', volume: '420/mois', difficulty: 'Faible', intent: 'Commercial' },
    { kw: 'évaluation impact social Afrique', volume: '780/mois', difficulty: 'Moyenne', intent: 'Informatif' },
  ],
  longTail: [
    'comment mettre en conformité SFD BCEAO 2025',
    'exigences prudentielles microfinance UEMOA',
    'comment obtenir agrément monnaie électronique Togo',
    'modèle charte gouvernance institution financière',
    'checklist audit interne banque Afrique Ouest',
    'stratégie inclusion financière femmes rurales',
    'ratio solvabilité BCEAO calcul',
    'plan continuité activité institution financière',
    'scoring crédit agricole Afrique',
    'transformation digitale coopérative épargne crédit',
  ],
  schemaMarkup: [
    { type: 'FAQPage', pages: 'Toutes les pages de services + blog', status: '✅ Implémenté', note: 'Vérifier que les Q&R correspondent exactement au contenu visible' },
    { type: 'Article / BlogPosting', pages: 'Tous les articles de blog', status: '✅ Implémenté', note: 'Ajouter wordCount, timeRequired, educationalLevel' },
    { type: 'LocalBusiness', pages: 'Page d\'accueil', status: '✅ Implémenté', note: 'Ajouter hasMap avec lien Google Maps' },
    { type: 'Service', pages: 'Pages de services', status: '✅ Implémenté', note: 'Ajouter areaServed et provider pour chaque service' },
    { type: 'HowTo', pages: 'Articles guides pratiques', status: '❌ Manquant', note: 'À ajouter sur les articles "Comment faire..."' },
    { type: 'DigitalDocument', pages: 'Page Ressources', status: '⚠️ Partiel', note: 'Ajouter encodingFormat, fileSize, numberOfPages' },
    { type: 'Event', pages: 'Page Événements', status: '❌ Manquant', note: 'Ajouter pour chaque événement : date, lieu, organisateur' },
    { type: 'Person', pages: 'Pages équipe / auteurs', status: '⚠️ Partiel', note: 'Ajouter sameAs LinkedIn, alumniOf, hasCredential' },
  ],
};

const roadmap = [
  {
    phase: 'Phase 1 — Corrections critiques',
    duration: 'Semaines 1-2',
    priority: 'Urgente',
    color: 'bg-red-50 border-red-200',
    badgeColor: 'bg-red-100 text-red-700',
    tasks: [
      { done: true, task: 'Corriger le robots.txt : mettre la bonne URL du sitemap' },
      { done: true, task: 'Ajouter les slugs des services détaillés dans le sitemap' },
      { done: true, task: 'Ajouter CSP header dans Netlify' },
      { done: true, task: 'Créer sitemapindex.xml et relier le sitemap dynamique' },
      { done: true, task: 'Préparer les headers CDN/HTTP/3 (Alt-Svc, Early Hints, CDN-Cache-Control)' },
      { done: false, task: 'Activer Cloudflare CDN sur le domaine (proxy orange cloud + HTTP/3)' },
      { done: false, task: 'Soumettre le sitemap corrigé dans Google Search Console' },
    ],
  },
  {
    phase: 'Phase 2 — SEO & Contenu',
    duration: 'Mois 1-2',
    priority: 'Haute',
    color: 'bg-amber-50 border-amber-200',
    badgeColor: 'bg-amber-100 text-amber-700',
    tasks: [
      { done: false, task: 'Migrer les URLs de blog vers des slugs descriptifs (/blog/conformite-bceao-2025)' },
      { done: false, task: 'Créer des pages auteur détaillées avec Schema.org Person' },
      { done: false, task: 'Ajouter Schema.org HowTo sur les 5 articles guides pratiques' },
      { done: false, task: 'Lancer la newsletter hebdomadaire de veille réglementaire' },
      { done: false, task: 'Publier 2 articles/semaine selon le plan éditorial' },
      { done: false, task: 'Créer un sitemap d\'images pour les visuels' },
    ],
  },
  {
    phase: 'Phase 3 — Nouvelles pages & Outils',
    duration: 'Mois 2-4',
    priority: 'Moyenne',
    color: 'bg-teal-50 border-teal-200',
    badgeColor: 'bg-teal-100 text-teal-700',
    tasks: [
      { done: false, task: 'Créer la page "Publications" avec filtres avancés' },
      { done: false, task: 'Développer le calculateur de conformité BCEAO interactif' },
      { done: false, task: 'Créer des pages de présence par pays (Togo, Bénin, Côte d\'Ivoire...)' },
      { done: false, task: 'Ajouter Schema.org Event sur la page événements' },
      { done: false, task: 'Améliorer la page Ressources avec filtres multi-critères' },
      { done: false, task: 'Lancer les webinaires mensuels avec landing page dédiée' },
    ],
  },
  {
    phase: 'Phase 4 — Autorité & Backlinks',
    duration: 'Mois 4-6',
    priority: 'Stratégique',
    color: 'bg-indigo-50 border-indigo-200',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    tasks: [
      { done: false, task: 'Publier un rapport sectoriel annuel (PDF premium) pour générer des backlinks' },
      { done: false, task: 'Soumettre des articles invités sur des médias financiers africains' },
      { done: false, task: 'Obtenir des mentions sur les sites BCEAO, AFD, Banque Mondiale' },
      { done: false, task: 'Créer un partenariat de contenu avec des universités africaines' },
      { done: false, task: 'Lancer une base de données réglementaire UEMOA en ligne' },
      { done: false, task: 'Atteindre 100+ articles publiés pour l\'autorité thématique' },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-red-600';
  const bg = score >= 80 ? 'bg-emerald-100' : score >= 60 ? 'bg-amber-100' : 'bg-red-100';
  return (
    <div className={`inline-flex flex-col items-center justify-center w-28 h-28 rounded-full ${bg} border-4 ${score >= 80 ? 'border-emerald-300' : score >= 60 ? 'border-amber-300' : 'border-red-300'}`}>
      <span className={`text-3xl font-bold ${color}`}>{score}</span>
      <span className="text-xs text-stone-500 font-medium">/100</span>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-stone-100 text-stone-600',
  };
  const label: Record<string, string> = { high: 'Critique', medium: 'Modéré', low: 'Mineur' };
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[severity]}`}>{label[severity]}</span>;
}

function SeoTab() {
  return (
    <div className="space-y-8">
      {/* Score global */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col md:flex-row md:items-center gap-6">
        <ScoreGauge score={seoAudit.score} />
        <div>
          <h3 className="text-lg font-bold text-stone-800 mb-1">Score SEO Technique Global</h3>
          <p className="text-stone-500 text-sm mb-3">Basé sur l'analyse du code source, du sitemap, du robots.txt et des données structurées Schema.org.</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">Schema.org ✅</span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">Open Graph ✅</span>
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Sitemap ✅</span>
            <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">URLs blog ⚠️</span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">Perf. ✅</span>
          </div>
        </div>
      </div>

      {/* Points forts */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-3 flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center"><i className="ri-thumb-up-line text-emerald-600"></i></div>
          Points forts identifiés ({seoAudit.strengths.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {seoAudit.strengths.map((s, i) => (
            <div key={i} className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
              <div className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0"><i className="ri-check-line text-emerald-600 text-sm"></i></div>
              <span className="text-sm text-stone-700">{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Faiblesses */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-3 flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center"><i className="ri-error-warning-line text-red-500"></i></div>
          Problèmes à corriger ({seoAudit.weaknesses.length})
        </h3>
        <div className="space-y-2">
          {seoAudit.weaknesses.map((w, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-stone-200 rounded-lg p-3">
              <div className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0"><i className="ri-alert-line text-amber-500 text-sm"></i></div>
              <span className="text-sm text-stone-700 flex-1">{w.text}</span>
              <SeverityBadge severity={w.severity} />
            </div>
          ))}
        </div>
      </div>

      {/* GEO/AEO */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-3 flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center"><i className="ri-robot-line text-stone-600"></i></div>
          Optimisation pour l'IA Search (GEO/AEO)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seoAudit.geoAeo.map((item, i) => (
            <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl p-4">
              <h4 className="font-semibold text-stone-800 text-sm mb-1">{item.title}</h4>
              <p className="text-stone-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContentTab() {
  return (
    <div className="space-y-8">
      {/* Analyse blog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-base font-bold text-stone-800 mb-3 flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center"><i className="ri-thumb-up-line text-emerald-600"></i></div>
            Atouts du blog actuel
          </h3>
          <div className="space-y-2">
            {contentStrategy.blogAnalysis.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                <div className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0"><i className="ri-check-line text-emerald-600 text-sm"></i></div>
                <span className="text-sm text-stone-700">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base font-bold text-stone-800 mb-3 flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center"><i className="ri-error-warning-line text-amber-500"></i></div>
            Lacunes à combler
          </h3>
          <div className="space-y-2">
            {contentStrategy.blogAnalysis.gaps.map((g, i) => (
              <div key={i} className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg p-3">
                <div className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0"><i className="ri-arrow-right-line text-amber-600 text-sm"></i></div>
                <span className="text-sm text-stone-700">{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan éditorial */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-4 flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center"><i className="ri-calendar-line text-stone-600"></i></div>
          Plan éditorial — 6 mois (Juillet–Décembre 2025)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contentStrategy.editorialPlan.map((month, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-stone-800 text-white text-xs font-bold px-2 py-1 rounded-md">{month.month}</span>
              </div>
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">{month.theme}</p>
              <ul className="space-y-1.5">
                {month.articles.map((a, j) => (
                  <li key={j} className="flex items-start gap-1.5">
                    <div className="w-3 h-3 flex items-center justify-center mt-0.5 shrink-0"><i className="ri-article-line text-stone-400 text-xs"></i></div>
                    <span className="text-xs text-stone-600">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Nouveaux formats */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-4 flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center"><i className="ri-lightbulb-line text-stone-600"></i></div>
          Nouveaux formats de contenu recommandés
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contentStrategy.newFormats.map((f, i) => (
            <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl p-4">
              <div className="w-8 h-8 flex items-center justify-center bg-stone-800 rounded-lg mb-3">
                <i className={`${f.icon} text-white text-sm`}></i>
              </div>
              <h4 className="font-semibold text-stone-800 text-sm mb-1">{f.title}</h4>
              <p className="text-stone-500 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UxTab() {
  return (
    <div className="space-y-8">
      {/* Points forts UX */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-3">Points forts UX actuels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {uxAnalysis.currentStrengths.map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
              <div className="w-4 h-4 flex items-center justify-center shrink-0"><i className="ri-check-line text-emerald-600 text-sm"></i></div>
              <span className="text-sm text-stone-700">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Améliorations */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-4">Améliorations UX/UI recommandées</h3>
        <div className="space-y-3">
          {uxAnalysis.improvements.map((item, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-xl p-4 flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-stone-100 rounded-lg shrink-0">
                <i className={`${item.icon} text-stone-600`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-stone-800 text-sm">{item.title}</h4>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.priority === 'Haute' ? 'bg-red-100 text-red-700' : item.priority === 'Moyenne' ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600'}`}>{item.priority}</span>
                </div>
                <p className="text-stone-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wireframes */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-4">Propositions de structure pour nouvelles pages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {uxAnalysis.wireframes.map((wf, i) => (
            <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl p-4">
              <h4 className="font-bold text-stone-800 text-sm mb-1">{wf.page}</h4>
              <p className="text-xs text-amber-700 font-medium mb-3">{wf.description}</p>
              <ul className="space-y-1.5">
                {wf.elements.map((el, j) => (
                  <li key={j} className="flex items-start gap-1.5">
                    <div className="w-3 h-3 flex items-center justify-center mt-0.5 shrink-0"><i className="ri-layout-line text-stone-400 text-xs"></i></div>
                    <span className="text-xs text-stone-600">{el}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BenchmarkTab() {
  return (
    <div className="space-y-8">
      {/* Comparaison visuelle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 flex items-center justify-center bg-amber-100 rounded-lg">
              <i className="ri-building-line text-amber-700"></i>
            </div>
            <div>
              <h3 className="font-bold text-stone-800 text-sm">KHEPRA EXPERTS</h3>
              <p className="text-xs text-stone-500">khepraexperts.com</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {benchmark.climateAnalytics.weaknesses.map((w, i) => (
              <div key={i} className="flex items-start gap-2 bg-amber-50 rounded-lg p-2">
                <div className="w-3 h-3 flex items-center justify-center mt-0.5 shrink-0"><i className="ri-arrow-up-line text-amber-600 text-xs"></i></div>
                <span className="text-xs text-stone-600">À améliorer : {w}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 flex items-center justify-center bg-teal-100 rounded-lg">
              <i className="ri-global-line text-teal-700"></i>
            </div>
            <div>
              <h3 className="font-bold text-stone-800 text-sm">Climate Analytics</h3>
              <p className="text-xs text-stone-500">climateanalytics.org (référence)</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {benchmark.climateAnalytics.strengths.slice(0, 6).map((s, i) => (
              <div key={i} className="flex items-start gap-2 bg-teal-50 rounded-lg p-2">
                <div className="w-3 h-3 flex items-center justify-center mt-0.5 shrink-0"><i className="ri-check-line text-teal-600 text-xs"></i></div>
                <span className="text-xs text-stone-600">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tableau comparatif */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-4">Tableau comparatif détaillé</h3>
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-800 text-white">
                <th className="text-left px-4 py-3 font-semibold">Critère</th>
                <th className="text-left px-4 py-3 font-semibold">KHEPRA EXPERTS</th>
                <th className="text-left px-4 py-3 font-semibold">Climate Analytics</th>
                <th className="text-center px-4 py-3 font-semibold">Avantage</th>
              </tr>
            </thead>
            <tbody>
              {benchmark.comparison.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                  <td className="px-4 py-3 font-medium text-stone-700">{row.criterion}</td>
                  <td className="px-4 py-3 text-stone-600">{row.khepra}</td>
                  <td className="px-4 py-3 text-stone-600">{row.climate}</td>
                  <td className="px-4 py-3 text-center">
                    {row.advantage === 'khepra' && <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">KHEPRA ✓</span>}
                    {row.advantage === 'climate' && <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded-full">Référence ✓</span>}
                    {row.advantage === 'equal' && <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-1 rounded-full">Égalité</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan d'action */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-4">Plan d'action pour atteindre le niveau de référence</h3>
        <div className="space-y-2">
          {benchmark.actionPlan.map((action, i) => (
            <div key={i} className="flex items-start gap-3 bg-stone-50 border border-stone-200 rounded-lg p-3">
              <span className="bg-stone-800 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-sm text-stone-700">{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KeywordsTab() {
  return (
    <div className="space-y-8">
      {/* Mots-clés principaux */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-4">Mots-clés principaux à cibler (8)</h3>
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-800 text-white">
                <th className="text-left px-4 py-3 font-semibold">Mot-clé</th>
                <th className="text-center px-4 py-3 font-semibold">Volume</th>
                <th className="text-center px-4 py-3 font-semibold">Difficulté</th>
                <th className="text-center px-4 py-3 font-semibold">Intention</th>
              </tr>
            </thead>
            <tbody>
              {keywords.primary.map((kw, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                  <td className="px-4 py-3 font-medium text-stone-800">{kw.kw}</td>
                  <td className="px-4 py-3 text-center text-stone-600">{kw.volume}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${kw.difficulty === 'Faible' ? 'bg-emerald-100 text-emerald-700' : kw.difficulty === 'Moyenne' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{kw.difficulty}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${kw.intent === 'Commercial' ? 'bg-teal-100 text-teal-700' : 'bg-stone-100 text-stone-600'}`}>{kw.intent}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mots-clés secondaires */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-4">Mots-clés secondaires (12)</h3>
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-700 text-white">
                <th className="text-left px-4 py-3 font-semibold">Mot-clé</th>
                <th className="text-center px-4 py-3 font-semibold">Volume</th>
                <th className="text-center px-4 py-3 font-semibold">Difficulté</th>
                <th className="text-center px-4 py-3 font-semibold">Intention</th>
              </tr>
            </thead>
            <tbody>
              {keywords.secondary.map((kw, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                  <td className="px-4 py-3 font-medium text-stone-700">{kw.kw}</td>
                  <td className="px-4 py-3 text-center text-stone-600">{kw.volume}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${kw.difficulty === 'Faible' ? 'bg-emerald-100 text-emerald-700' : kw.difficulty === 'Moyenne' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{kw.difficulty}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${kw.intent === 'Commercial' ? 'bg-teal-100 text-teal-700' : 'bg-stone-100 text-stone-600'}`}>{kw.intent}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Longue traîne */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-4">Requêtes longue traîne (10)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {keywords.longTail.map((kw, i) => (
            <div key={i} className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2">
              <div className="w-4 h-4 flex items-center justify-center shrink-0"><i className="ri-search-line text-stone-400 text-xs"></i></div>
              <span className="text-sm text-stone-700 italic">"{kw}"</span>
            </div>
          ))}
        </div>
      </div>

      {/* Schema Markup */}
      <div>
        <h3 className="text-base font-bold text-stone-800 mb-4">État des données structurées Schema.org</h3>
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-800 text-white">
                <th className="text-left px-4 py-3 font-semibold">Type Schema</th>
                <th className="text-left px-4 py-3 font-semibold">Pages concernées</th>
                <th className="text-center px-4 py-3 font-semibold">Statut</th>
                <th className="text-left px-4 py-3 font-semibold">Recommandation</th>
              </tr>
            </thead>
            <tbody>
              {keywords.schemaMarkup.map((s, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-stone-800">{s.type}</td>
                  <td className="px-4 py-3 text-stone-600 text-xs">{s.pages}</td>
                  <td className="px-4 py-3 text-center text-sm">{s.status}</td>
                  <td className="px-4 py-3 text-stone-500 text-xs">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RoadmapTab() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6">
      <p className="text-stone-500 text-sm">Cochez les tâches au fur et à mesure de leur réalisation pour suivre votre progression.</p>
      {roadmap.map((phase, pi) => {
        const total = phase.tasks.length;
        const done = phase.tasks.filter((_, ti) => checked[`${pi}-${ti}`]).length;
        const pct = Math.round((done / total) * 100);
        return (
          <div key={pi} className={`border rounded-xl p-5 ${phase.color}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-bold text-stone-800">{phase.phase}</h3>
                <p className="text-stone-500 text-sm">{phase.duration}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${phase.badgeColor}`}>{phase.priority}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-stone-800 rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                  </div>
                  <span className="text-xs font-semibold text-stone-600">{done}/{total}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {phase.tasks.map((task, ti) => {
                const key = `${pi}-${ti}`;
                const isDone = checked[key];
                return (
                  <button
                    key={ti}
                    onClick={() => toggle(key)}
                    className="w-full flex items-start gap-3 bg-white/70 hover:bg-white border border-white/50 rounded-lg p-3 text-left transition-all cursor-pointer"
                  >
                    <div className={`w-5 h-5 flex items-center justify-center rounded border-2 shrink-0 mt-0.5 transition-all ${isDone ? 'bg-stone-800 border-stone-800' : 'border-stone-300'}`}>
                      {isDone && <i className="ri-check-line text-white text-xs"></i>}
                    </div>
                    <span className={`text-sm transition-all ${isDone ? 'line-through text-stone-400' : 'text-stone-700'}`}>{task.task}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StrategicReportPage() {
  const [activeTab, setActiveTab] = useState<TabId>('seo');
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('en') ? 'en-US' : 'fr-FR';

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/strategic-report#webpage`,
        url: `${SITE_URL}/strategic-report`,
        name: 'Rapport Stratégique SEO & Contenu — KHEPRA EXPERTS',
        description: 'Audit SEO technique, stratégie de contenu, analyse UX/UI et benchmark concurrentiel pour khepraexperts.com',
        inLanguage: currentLang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Rapport Stratégique', item: `${SITE_URL}/strategic-report` },
          ],
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
        },
      },
    ],
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'seo': return <SeoTab />;
      case 'content': return <ContentTab />;
      case 'ux': return <UxTab />;
      case 'benchmark': return <BenchmarkTab />;
      case 'keywords': return <KeywordsTab />;
      case 'roadmap': return <RoadmapTab />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <SeoHead
        title="Rapport Stratégique SEO & Contenu | KHEPRA EXPERTS"
        description="Audit SEO technique, stratégie de contenu 6 mois, analyse UX/UI et benchmark vs Climate Analytics pour khepraexperts.com."
        keywords="audit SEO, stratégie contenu, UX UI, benchmark, mots-clés, roadmap"
        canonicalPath="/strategic-report"
        schemaJson={schemaJson}
        noIndex={true}
        ogImage={OG_IMAGES.STRATEGIC_REPORT}
        ogImageWidth="1200"
        ogImageHeight="630"
        ogImageAlt="Rapport Stratégique SEO & Contenu – KHEPRA EXPERTS | Audit technique et plan d'action"
        ogLocale="fr_FR"
      />
      <Navigation />

      {/* Hero */}
      <div className="bg-stone-900 text-white pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Rapport Stratégique' }]} />
          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Rapport Stratégique</span>
                <span className="text-stone-400 text-xs">Généré le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Stratégie SEO, Contenu & UX
              </h1>
              <p className="text-stone-300 text-base max-w-2xl">
                Analyse complète de <strong className="text-white">khepraexperts.com</strong> — audit technique, plan éditorial 6 mois, benchmark vs Climate Analytics et roadmap priorisée.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">82/100</div>
                <div className="text-xs text-stone-400">Score SEO</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">20+</div>
                <div className="text-xs text-stone-400">Mots-clés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-stone-300">6</div>
                <div className="text-xs text-stone-400">Mois de plan</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all cursor-pointer ${activeTab === tab.id ? 'border-stone-800 text-stone-800' : 'border-transparent text-stone-500 hover:text-stone-700'}`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${tab.icon} text-sm`}></i>
                </div>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {renderTab()}
      </div>

      <Footer />
    </div>
  );
}




