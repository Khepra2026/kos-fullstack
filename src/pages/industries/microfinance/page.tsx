import { IndustryMiniCTA } from '@/components/feature/IndustryMiniCTA';
import { useEffect } from 'react';
import { useBrochureDownload } from '@/hooks/useBrochureDownload';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { FAQAccordion } from '@/components/feature/FAQAccordion';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';

const MicrofinancePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleDownload, isDownloading } = useBrochureDownload('other');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /** Calcule l'offset dynamique : banners + nav principale */
  const getDynamicOffset = (): number => {
    let total = 0;
    const topBanner = document.querySelector<HTMLElement>('[data-banner="top"]');
    if (topBanner) total += topBanner.offsetHeight;
    const regAlert = document.querySelector<HTMLElement>('[data-banner="regulatory"]');
    if (regAlert) total += regAlert.offsetHeight;
    const mainNav = document.querySelector<HTMLElement>('nav.fixed');
    if (mainNav) total += mainNav.offsetHeight;
    return total + 24;
  };

  const scrollToContact = () => {
    // Tente d'abord de scroller vers le formulaire sur la page courante
    const localContact = document.getElementById('contact-services') || document.getElementById('contact');
    if (localContact) {
      const offset = getDynamicOffset();
      const top = localContact.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      return;
    }
    // Sinon, navigue vers la page services puis scrolle
    navigate('/services');
    setTimeout(() => {
      const el = document.getElementById('contact-services');
      if (el) {
        const offset = getDynamicOffset();
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 600);
  };

  const challenges = [
    {
      title: 'Conformité Réglementaire',
      icon: 'ri-shield-check-line',
      description: 'Mise en conformité avec les instructions BCEAO/COBAC et maintien des ratios prudentiels',
      impact: 'Risque de sanctions et retrait d\'agrément',
    },
    {
      title: 'Gouvernance & Contrôle Interne',
      icon: 'ri-organization-chart',
      description: 'Structuration de la gouvernance et mise en place d\'un dispositif de contrôle interne efficace',
      impact: 'Risques opérationnels et fraudes',
    },
    {
      title: 'Gestion des Risques',
      icon: 'ri-alert-line',
      description: 'Maîtrise du risque de crédit, risque de liquidité et risques opérationnels',
      impact: 'Détérioration du portefeuille et pertes financières',
    },
    {
      title: 'Transformation Digitale',
      icon: 'ri-smartphone-line',
      description: 'Digitalisation des opérations et adoption des technologies fintech',
      impact: 'Perte de compétitivité face aux acteurs digitaux',
    },
    {
      title: 'Performance Financière',
      icon: 'ri-line-chart-line',
      description: 'Amélioration de la rentabilité et optimisation des coûts opérationnels',
      impact: 'Viabilité financière menacée',
    },
    {
      title: 'Inclusion Financière',
      icon: 'ri-community-line',
      description: 'Extension de la couverture géographique et diversification des produits',
      impact: 'Stagnation de la croissance',
    },
  ];

  const services = [
    {
      category: 'Conformité & Gouvernance',
      icon: 'ri-shield-check-line',
      color: 'from-blue-500 to-blue-600',
      offerings: [
        {
          title: 'Audit de Conformité Réglementaire',
          description: 'Évaluation complète de la conformité aux normes BCEAO/COBAC',
          deliverables: ['Rapport d\'audit détaillé', 'Gap analysis', 'Plan de mise en conformité', 'Accompagnement mise en œuvre'],
        },
        {
          title: 'Restructuration Gouvernance',
          description: 'Mise en place d\'une gouvernance conforme aux standards internationaux',
          deliverables: ['Manuel de gouvernance', 'Règlements intérieurs', 'Comités spécialisés', 'Formation administrateurs'],
        },
        {
          title: 'Dispositif de Contrôle Interne',
          description: 'Conception et déploiement d\'un système de contrôle interne robuste',
          deliverables: ['Manuel de procédures', 'Cartographie des risques', 'Plan de contrôle', 'Audit interne'],
        },
      ],
    },
    {
      category: 'Gestion des Risques',
      icon: 'ri-alert-line',
      color: 'from-red-500 to-red-600',
      offerings: [
        {
          title: 'Politique de Gestion des Risques',
          description: 'Élaboration d\'une politique globale de gestion des risques',
          deliverables: ['Politique risques', 'Limites et seuils', 'Comité risques', 'Reporting risques'],
        },
        {
          title: 'Modèles de Scoring Crédit',
          description: 'Développement de modèles de scoring adaptés à votre portefeuille',
          deliverables: ['Modèle de scoring', 'Grilles d\'analyse', 'Outils d\'aide à la décision', 'Formation agents crédit'],
        },
        {
          title: 'Gestion du Portefeuille à Risque',
          description: 'Stratégies de réduction du PAR et recouvrement',
          deliverables: ['Analyse PAR', 'Plan de recouvrement', 'Restructuration créances', 'Suivi performance'],
        },
      ],
    },
    {
      category: 'Transformation Digitale',
      icon: 'ri-smartphone-line',
      color: 'from-purple-500 to-purple-600',
      offerings: [
        {
          title: 'Stratégie de Digitalisation',
          description: 'Feuille de route complète pour la transformation digitale',
          deliverables: ['Diagnostic digital', 'Roadmap transformation', 'Business case', 'Plan d\'implémentation'],
        },
        {
          title: 'Sélection & Déploiement Core Banking',
          description: 'Accompagnement dans le choix et la mise en œuvre d\'un système d\'information',
          deliverables: ['Cahier des charges', 'Sélection fournisseur', 'Gestion projet', 'Formation utilisateurs'],
        },
        {
          title: 'Services Financiers Digitaux',
          description: 'Développement de canaux digitaux (mobile banking, agent banking)',
          deliverables: ['Stratégie canaux digitaux', 'Partenariats technologiques', 'Produits digitaux', 'Go-to-market'],
        },
      ],
    },
    {
      category: 'Performance & Croissance',
      icon: 'ri-line-chart-line',
      color: 'from-green-500 to-green-600',
      offerings: [
        {
          title: 'Audit Organisationnel & Opérationnel',
          description: 'Diagnostic complet de l\'organisation et des processus',
          deliverables: ['Audit organisationnel', 'Cartographie processus', 'Plan d\'optimisation', 'Quick wins'],
        },
        {
          title: 'Stratégie de Croissance',
          description: 'Élaboration d\'un plan stratégique de développement',
          deliverables: ['Plan stratégique 3-5 ans', 'Modèle financier', 'Plan d\'expansion', 'Stratégie produits'],
        },
        {
          title: 'Levée de Fonds & Partenariats',
          description: 'Accompagnement dans la mobilisation de ressources',
          deliverables: ['Business plan investisseurs', 'Due diligence', 'Négociation', 'Structuration financement'],
        },
      ],
    },
  ];

  const caseStudy = {
    client: 'Réseau de Microfinance UEMOA',
    sector: 'Institution de Microfinance',
    countries: ['Togo', 'Bénin', 'Burkina Faso'],
    size: '85 caisses · 250K clients · 45M€ encours',
    challenge: 'Mise en conformité réglementaire BCEAO, restructuration gouvernance, digitalisation des opérations et amélioration de la performance financière d\'un réseau multi-pays en difficulté.',
    context: [
      'Non-conformité à l\'Instruction BCEAO N°008-05-2010',
      'Gouvernance défaillante et conflits internes',
      'PAR 30 à 18% (norme : &lt;5%)',
      'Pertes cumulées de 2,3M€',
      'Systèmes d\'information obsolètes',
      'Menace de retrait d\'agrément',
    ],
    solution: [
      {
        phase: 'Phase 1 : Diagnostic & Stabilisation (3 mois)',
        actions: [
          'Audit de conformité réglementaire sur 85 points de service',
          'Diagnostic organisationnel et financier approfondi',
          'Mise en place cellule de crise et plan de stabilisation',
          'Négociation avec BCEAO pour plan de redressement',
        ],
      },
      {
        phase: 'Phase 2 : Restructuration (6 mois)',
        actions: [
          'Restructuration juridique et gouvernance du réseau',
          'Refonte complète du dispositif de contrôle interne',
          'Mise en place politique de gestion des risques',
          'Restructuration du portefeuille à risque',
        ],
      },
      {
        phase: 'Phase 3 : Transformation (9 mois)',
        actions: [
          'Déploiement nouveau core banking system sur 85 caisses',
          'Formation de 320 collaborateurs',
          'Automatisation du reporting réglementaire',
          'Lancement produits digitaux (mobile banking)',
        ],
      },
    ],
    results: [
      { metric: '100%', label: 'Conformité réglementaire', icon: 'ri-shield-check-line', color: 'text-green-600' },
      { metric: '4,2%', label: 'PAR 30 (vs 18% initial)', icon: 'ri-arrow-down-line', color: 'text-green-600' },
      { metric: '+1,8M€', label: 'Résultat net année 2', icon: 'ri-money-dollar-circle-line', color: 'text-green-600' },
      { metric: '-73%', label: 'Temps de reporting', icon: 'ri-time-line', color: 'text-blue-600' },
      { metric: '320', label: 'Collaborateurs formés', icon: 'ri-team-line', color: 'text-purple-600' },
      { metric: '35K', label: 'Clients mobile banking', icon: 'ri-smartphone-line', color: 'text-purple-600' },
    ],
    duration: '18 mois',
    team: '8 consultants seniors',
    testimonial: {
      quote: 'Khepra Experts a sauvé notre institution. Leur expertise technique, leur connaissance du contexte local et leur approche pragmatique ont été déterminantes. Aujourd\'hui, nous sommes conformes, rentables et en croissance.',
      author: 'Directeur Général',
      organization: 'Réseau de Microfinance',
    },
  };

  const expertise = [
    {
      title: 'Expertise Technique Approfondie',
      points: [
        '15+ années d\'expérience en microfinance africaine',
        'Consultants certifiés CGAP, CPA, ACCA',
        'Anciens cadres d\'institutions de microfinance',
        'Maîtrise des normes BCEAO/COBAC',
      ],
    },
    {
      title: 'Connaissance du Terrain',
      points: [
        'Présence dans 15+ pays africains',
        '100+ institutions de microfinance accompagnées',
        'Compréhension des réalités opérationnelles',
        'Réseau de partenaires locaux',
      ],
    },
    {
      title: 'Approche Pragmatique',
      points: [
        'Solutions adaptées au contexte local',
        'Accompagnement opérationnel terrain',
        'Transfert de compétences systématique',
        'Support post-mission garanti',
      ],
    },
  ];

  const stats = [
    { value: '100+', label: 'IMF accompagnées' },
    { value: '15+', label: 'Pays d\'intervention' },
    { value: '95%', label: 'Taux de conformité atteint' },
    { value: '10 ans', label: 'D\'expertise sectorielle' },
  ];

  const regulatoryFramework = [
    {
      title: 'BCEAO (UEMOA) — Afrique de l\'Ouest',
      icon: 'ri-government-line',
      description: 'Banque Centrale des États de l\'Afrique de l\'Ouest',
      regulations: [
        'Loi uniforme portant réglementation des SFD (2008) — en voie d\'abrogation par la Décision n°019/CM/UMOA du 21 décembre 2023',
        'Décision n°019/CM/UMOA du 21 décembre 2023 — Loi Uniforme sur la Microfinance dans l\'UEMOA (en cours de transposition dans les 8 États membres)',
        'Instruction N°008-05-2010 relative aux SFD',
        'Instruction N°01-2017/RB relative à la LBC-FT',
        'Ratios prudentiels et normes de gestion BCEAO',
      ],
      countries: ['Bénin', 'Burkina Faso', 'Côte d\'Ivoire', 'Guinée-Bissau', 'Mali', 'Niger', 'Sénégal', 'Togo'],
    },
    {
      title: 'BEAC / COBAC (CEMAC) — Afrique Centrale',
      icon: 'ri-bank-line',
      description: 'Banque des États de l\'Afrique Centrale & Commission Bancaire',
      regulations: [
        'Règlement COBAC EMF 2002/17 & 2018/01',
        'Normes prudentielles BEAC spécifiques EMF',
        'Dispositif de surveillance et contrôle COBAC',
        'Réglementation CEMAC sur la monnaie électronique',
      ],
      countries: ['Cameroun', 'Centrafrique', 'Congo', 'Gabon', 'Guinée Équatoriale', 'Tchad'],
    },
  ];

  const trends = [
    {
      title: 'Digitalisation des Services',
      icon: 'ri-smartphone-line',
      description: 'Adoption massive des canaux digitaux pour l\'inclusion financière',
      stats: '65% des IMF africaines ont lancé des services digitaux en 2024',
      examples: [
        'Mobile banking et applications mobiles',
        'Agent banking et points de service digitaux',
        'Intégration mobile money (Orange Money, MTN MoMo, Wave)',
        'Scoring crédit automatisé et IA',
      ],
    },
    {
      title: 'Fintech & Partenariats',
      icon: 'ri-links-line',
      description: 'Collaboration croissante entre IMF traditionnelles et fintechs',
      stats: '40% des IMF ont noué des partenariats fintech en 2023-2024',
      examples: [
        'API banking et open banking',
        'Solutions de paiement digital',
        'Plateformes de crédit digital',
        'Outils de gestion des risques',
      ],
    },
    {
      title: 'Produits Innovants',
      icon: 'ri-lightbulb-flash-line',
      description: 'Diversification des produits pour répondre aux besoins clients',
      stats: 'Croissance de 85% des produits d\'épargne digitale en 2 ans',
      examples: [
        'Micro-assurance digitale',
        'Crédit agricole et agro-financement',
        'Crédit scolaire et santé',
        'Épargne programmée automatique',
      ],
    },
    {
      title: 'Consolidation du Secteur',
      icon: 'ri-organization-chart',
      description: 'Fusions et acquisitions pour atteindre la taille critique',
      stats: '25+ opérations de consolidation en Afrique de l\'Ouest depuis 2020',
      examples: [
        'Fusions de réseaux de microfinance',
        'Acquisitions par des banques commerciales',
        'Création de holdings régionales',
        'Mutualisation des infrastructures',
      ],
    },
  ];

  const faqItems = [
    {
      question: 'Quelles sont les principales exigences de conformité BCEAO pour les SFD ?',
      answer: 'Les SFD de la zone UEMOA doivent respecter l\'Instruction N°008-05-2010 qui impose : (1) un agrément délivré par le Ministère des Finances après avis de la BCEAO, (2) le respect de ratios prudentiels (ratio de solvabilité ≥15%, ratio de liquidité ≥80%, division des risques), (3) un dispositif de gouvernance avec conseil d\'administration, direction générale et organes de contrôle, (4) un système de contrôle interne robuste, (5) la production de reporting réglementaire mensuel et trimestriel, (6) le respect des normes LBC-FT (lutte contre le blanchiment et le financement du terrorisme). Le non-respect de ces exigences peut entraîner des sanctions allant de l\'avertissement au retrait d\'agrément.',
    },
    {
      question: 'Comment réduire le portefeuille à risque (PAR) d\'une institution de microfinance ?',
      answer: 'La réduction du PAR nécessite une approche globale : (1) Renforcement de l\'analyse crédit avec scoring et grilles d\'évaluation rigoureuses, (2) Formation des agents de crédit aux techniques d\'analyse financière, (3) Mise en place d\'un système d\'alerte précoce pour détecter les impayés dès J+1, (4) Stratégie de recouvrement amiable puis contentieux structurée, (5) Restructuration des créances douteuses avec plans de remboursement adaptés, (6) Provisionnement adéquat selon les normes BCEAO/COBAC, (7) Diversification du portefeuille pour réduire la concentration des risques, (8) Suivi rapproché des clients à risque. Nos interventions permettent généralement de réduire le PAR de 50-70% en 12-18 mois.',
    },
    {
      question: 'Quel est le coût d\'un audit de conformité réglementaire pour une IMF ?',
      answer: 'Le coût d\'un audit de conformité varie selon la taille de l\'institution : (1) Petite IMF (1-5 points de service, &lt;5M€ actifs) : 8 000-15 000€, (2) IMF moyenne (6-20 points de service, 5-20M€ actifs) : 15 000-30 000€, (3) Grande IMF ou réseau (20+ points de service, &gt;20M€ actifs) : 30 000-60 000€. L\'audit inclut : diagnostic de conformité sur 85+ points de contrôle, gap analysis détaillée, rapport d\'audit complet, plan de mise en conformité priorisé, et accompagnement post-audit pendant 3 mois. La durée varie de 2 à 6 semaines selon la complexité. Nous proposons un diagnostic gratuit préalable pour évaluer précisément vos besoins.',
    },
    {
      question: 'Comment choisir un système d\'information (core banking) adapté à une IMF africaine ?',
      answer: 'Le choix d\'un core banking pour une IMF africaine doit considérer : (1) Fonctionnalités : gestion multi-agences, multi-produits (crédit, épargne, transferts), comptabilité intégrée, reporting réglementaire BCEAO/COBAC automatisé, (2) Technologie : solution cloud vs on-premise, accessibilité en mode déconnecté (zones rurales), compatibilité mobile, (3) Coûts : licence, implémentation, formation, maintenance annuelle (budget 20 000-150 000€ selon taille), (4) Support local : présence du fournisseur en Afrique, hotline en français, (5) Intégrations : mobile money, scoring crédit, biométrie, SMS banking. Solutions recommandées : Musoni (cloud, PME), Temenos (grandes IMF), Craft Silicon, Sopra Banking. Nous accompagnons le cahier des charges, la sélection, et le déploiement.',
    },
    {
      question: 'Quels sont les ratios prudentiels à respecter pour une IMF en zone UEMOA ?',
      answer: 'Les SFD de la zone UEMOA doivent respecter les ratios suivants selon l\'Instruction BCEAO N°008-05-2010 : (1) Ratio de solvabilité : Fonds propres / Actifs pondérés ≥ 15% (norme internationale : 8%), (2) Ratio de liquidité : Actifs liquides / Passif exigible à court terme ≥ 80%, (3) Division des risques : Engagement sur un même bénéficiaire ≤ 10% des fonds propres, total des grands risques ≤ 800% des fonds propres, (4) Coefficient de couverture des immobilisations : Fonds propres / Immobilisations ≥ 100%, (5) Coefficient de transformation : Emplois à moyen et long terme / Ressources stables ≤ 100%. Le non-respect entraîne des mesures correctives imposées par la BCEAO. Nous aidons les IMF à optimiser leur bilan pour respecter ces ratios.',
    },
    {
      question: 'Comment structurer la gouvernance d\'une institution de microfinance ?',
      answer: 'Une gouvernance conforme aux standards BCEAO/COBAC comprend : (1) Conseil d\'Administration : 5-12 membres, réunions trimestrielles minimum, comités spécialisés (audit, risques, crédit, rémunération), (2) Direction Générale : DG avec expérience bancaire/microfinance, comité de direction, délégations de pouvoir formalisées, (3) Organes de contrôle : audit interne indépendant, comité d\'audit, commissaires aux comptes, (4) Gestion des risques : comité risques, responsable risques dédié, politique de gestion des risques approuvée par le CA, (5) Conformité : responsable conformité, fonction LBC-FT, (6) Documentation : règlement intérieur, manuel de gouvernance, code de déontologie, politique de gestion des conflits d\'intérêts. Nous accompagnons la restructuration complète de la gouvernance en 3-6 mois.',
    },
    {
      question: 'Quelles sont les étapes pour digitaliser une institution de microfinance ?',
      answer: 'La transformation digitale d\'une IMF suit 5 phases : (1) Diagnostic digital (4-6 semaines) : évaluation maturité digitale, analyse des processus, benchmark solutions, business case, (2) Stratégie digitale (2-3 mois) : vision, roadmap 3 ans, priorisation initiatives, budget, quick wins, (3) Sélection solutions (2-3 mois) : cahier des charges core banking, mobile banking, scoring, choix fournisseurs, négociation contrats, (4) Déploiement (6-12 mois) : implémentation core banking, migration données, formation 100% du personnel, pilote puis déploiement progressif, (5) Optimisation continue : monitoring KPIs, amélioration UX, nouveaux produits digitaux, intégrations (mobile money, biométrie). Budget indicatif : 50 000-300 000€ selon taille. ROI attendu : 18-24 mois via réduction coûts opérationnels (-30-40%) et croissance revenus (+20-35%).',
    },
    {
      question: 'Comment une IMF peut-elle se préparer à une levée de fonds ou à l\'entrée d\'investisseurs ?',
      answer: 'La préparation à une levée de fonds nécessite 6-12 mois : (1) Mise en conformité réglementaire totale (agrément, ratios, gouvernance, reporting), (2) Assainissement financier : réduction PAR &lt;5%, rentabilité positive, croissance démontrée, (3) Structuration juridique : statuts conformes, actionnariat clair, résolution conflits, (4) Documentation investisseurs : business plan 5 ans, modèle financier robuste, due diligence pack (juridique, financier, opérationnel, social), pitch deck, (5) Valorisation : méthode DCF, multiples comparables, négociation terme sheet, (6) Stratégie de levée : identification investisseurs cibles (fonds d\'impact, DFIs, family offices), roadshow, négociation. Montants levés typiques : 500K-5M€. Nous accompagnons 15-20 levées de fonds par an en Afrique avec taux de succès de 75%.',
    },
  ];

  const relatedArticles = [
    {
      title: 'Nouvelle loi uniforme sur la microfinance dans l\'UEMOA : ce qui change en 2024',
      slug: 'nouvelle-loi-microfinance-uemoa-2024',
      category: 'Réglementation',
      readTime: '15 min',
    },
    {
      title: 'Gestion des risques LBC/FT pour les SFD : guide pratique de conformité',
      slug: 'gestion-risques-lbc-ft-sfd',
      category: 'Conformité',
      readTime: '15 min',
    },
    {
      title: 'Transformation digitale des institutions de microfinance en Afrique',
      slug: 'transformation-digitale-microfinance-afrique',
      category: 'Digital',
      readTime: '12 min',
    },
  ];

  const relatedResources = [
    {
      title: 'Checklist Conformité SFD BCEAO/UEMOA',
      type: 'Checklist',
      icon: 'ri-file-list-3-line',
    },
    {
      title: 'Guide Analyse Risque Crédit Microfinance',
      type: 'Guide',
      icon: 'ri-book-line',
    },
    {
      title: 'Guide Gestion des Impayés & Recouvrement',
      type: 'Guide',
      icon: 'ri-book-line',
    },
  ];

  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/industries/microfinance#service`,
        serviceType: 'Conseil Microfinance',
        provider: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL
        },
        areaServed: {
          '@type': 'Place',
          name: 'Afrique'
        },
        description: t('industries.microfinanceSeo.seo.description')
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/industries/microfinance#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${SITE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Secteurs',
            item: `${SITE_URL}/industries`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Microfinance — BCEAO & COBAC Inspection Readiness™',
            item: `${SITE_URL}/industries/microfinance`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/industries/microfinance#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={t('industries.microfinanceSeo.seo.title')}
        description={t('industries.microfinanceSeo.seo.description')}
        keywords={t('industries.microfinanceSeo.seo.keywords')}
        canonicalPath="/industries/microfinance"
        ogType="website"
        ogImage={OG_IMAGES.MICROFINANCE}
        ogImageAlt="Microfinance en Afrique – KHEPRA EXPERTS | Conseil IMF et SFD en Afrique de l'Ouest et Centrale"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        twitterLabel1="Secteur"
        twitterData1="Microfinance"
        twitterLabel2="Pays couverts"
        twitterData2="15+"
        schemaJson={jsonLd}
        hreflangLinks={STATIC_HREFLANG_MAP['/industries/microfinance/']}
      />

      <Navigation />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-20">
          <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=african%20microfinance%20institution%20modern%20office%20with%20clients%20and%20staff%20professional%20banking%20environment%20financial%20inclusion%20theme%20warm%20lighting%20authentic%20african%20setting%20people%20working%20together%20community%20banking%20atmosphere&width=1920&height=800&seq=microfinance-hero-bg&orientation=landscape')] opacity-10 bg-cover bg-center"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Breadcrumb
              variant="light"
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Secteurs', href: '/industries' },
                { label: 'Microfinance — BCEAO & COBAC Inspection Readiness™' },
              ]}
            />
            
            <div className="mt-12 max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <i className="ri-community-line text-3xl text-white"></i>
                </div>
                <div>
                  <p className="text-amber-400 font-semibold text-sm tracking-wider uppercase">Secteur Microfinance</p>
                  <p className="text-slate-300 text-sm">Institutions de Microfinance · SFD · Coopératives d'Épargne et de Crédit</p>
                </div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Conseil stratégique pour<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">institutions de microfinance</span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Expertise approfondie en conformité réglementaire, gouvernance, transformation digitale et performance des institutions de microfinance en Afrique.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToContact}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer hover:scale-105"
                >
                  Demander un audit
                </button>
                <Link
                  to="/case-studies"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-gold-400/40 whitespace-nowrap cursor-pointer"
                >
                  Voir nos réalisations
                </Link>
                <a
                  href="#brochure"
                  onClick={(e) => { e.preventDefault(); handleDownload(); }}
                  className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer hover:scale-105 flex items-center gap-2 no-underline"
                >
                  {isDownloading ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-download-line" />}
                  Télécharger la brochure
                </a>
              </div>
              
              <p className="mt-4 text-sm text-gold-400/80">
                <i className="ri-file-pdf-line mr-1" /> Brochure commerciale 8 pages — Offres premium microfinance, infographies et études de cas
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-amber-50 border-b-4 border-gold-400">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl font-bold text-amber-700 mb-2 font-playfair group-hover:text-gold-600 transition-colors">{stat.value}</div>
                  <div className="text-amber-900/70 font-medium text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction Section - NEW */}
        <section className="py-20 bg-slate-50/60">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-playfair text-3xl font-bold text-brand-900 mb-6">
                Le secteur de la microfinance en Afrique : enjeux et opportunités
              </h2>
              
              <p className="text-slate-700 leading-relaxed mb-4">
                La <strong>microfinance en Afrique</strong> joue un rôle crucial dans l'<Link to="/pillar/financial-inclusion-africa" className="text-gold-600 hover:text-gold-700 font-semibold cursor-pointer">inclusion financière</Link> et le développement économique du continent. Avec plus de <strong>60 millions de clients actifs</strong> et un encours de crédit dépassant <strong>25 milliards USD</strong>, les institutions de microfinance (IMF) et systèmes financiers décentralisés (SFD) constituent un pilier essentiel de l'écosystème financier africain.
              </p>

              <p className="text-slate-700 leading-relaxed mb-4">
                En <strong>Afrique de l'Ouest</strong> (zone UEMOA) et en <strong>Afrique Centrale</strong> (zone CEMAC), le secteur compte plus de <strong>2 500 institutions agréées</strong> servant principalement les populations rurales, les micro-entrepreneurs, les femmes et les jeunes exclus du système bancaire traditionnel. Ces institutions mobilisent plus de <strong>18 milliards USD d'épargne</strong> et distribuent annuellement <strong>12 milliards USD de crédits</strong>, contribuant ainsi directement à la réduction de la pauvreté et à la création d'emplois.
              </p>

              <p className="text-slate-700 leading-relaxed mb-4">
                Cependant, le secteur fait face à des <strong>défis structurels majeurs</strong> : exigences réglementaires croissantes (conformité BCEAO/COBAC, lutte anti-blanchiment), gouvernance défaillante dans de nombreuses institutions, portefeuilles à risque élevés (PAR moyen de 8-12% vs norme de 5%), systèmes d'information obsolètes, et concurrence accrue des <Link to="/industries/fintech" className="text-gold-600 hover:text-gold-700 font-semibold cursor-pointer">fintechs</Link> et opérateurs de mobile money.
              </p>

              <p className="text-slate-700 leading-relaxed mb-6">
                Face à ces enjeux, la <strong>transformation digitale</strong> et la <strong>professionnalisation</strong> des IMF sont devenues impératives. Les institutions qui réussissent sont celles qui investissent dans la technologie (core banking moderne, mobile banking, scoring automatisé), renforcent leur gouvernance et leur contrôle interne, diversifient leurs produits, et nouent des partenariats stratégiques avec des fintechs et opérateurs télécoms. <strong>Khepra Experts</strong> accompagne cette transformation en apportant une expertise technique approfondie, une connaissance intime du contexte réglementaire africain, et une approche pragmatique centrée sur les résultats opérationnels.
              </p>
            </div>
          </div>
        </section>

        {/* Lead Magnet CTA - Après Introduction */}
        <section className="py-8 bg-slate-50/60">
          <div className="max-w-4xl mx-auto px-6">
            <IndustryMiniCTA guide="gouvernance-imf" />
          </div>
        </section>

        {/* Challenges */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-400 bg-gold-50">
                <span className="text-sm font-semibold text-gold-700">Enjeux critiques</span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
                Défis des institutions de <span className="text-gold-600">microfinance</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-amber-700 mx-auto rounded-full mb-4"></div>
              <p className="text-xl text-slate-600">Enjeux critiques du secteur en Afrique</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <div key={index} className="bg-white rounded-xl p-6 hover:shadow-xl transition-all border border-amber-100 hover:border-gold-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-amber-700 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-transform">
                    <i className={`${challenge.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-brand-900 mb-3 group-hover:text-amber-800 transition-colors line-clamp-2" title={challenge.title}>{challenge.title}</h3>
                  <p className="text-slate-700 mb-4 text-sm leading-relaxed">{challenge.description}</p>
                  <div className="pt-4 border-t border-amber-100">
                    <div className="flex items-start gap-2">
                      <i className="ri-alert-line text-red-600 mt-1 flex-shrink-0"></i>
                      <span className="text-sm text-slate-600">{challenge.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regulatory Framework Section - NEW */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-400 bg-gold-50">
                <span className="text-sm font-semibold text-gold-700">Cadre réglementaire</span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
                Réglementation de la <span className="text-gold-600">microfinance en Afrique</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-amber-700 mx-auto rounded-full mb-4"></div>
              <p className="text-xl text-slate-600">Normes BCEAO et COBAC pour les institutions de microfinance</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {regulatoryFramework.map((framework, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 hover:border-gold-300 transition-all group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-amber-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <i className={`${framework.icon} text-3xl text-white`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-brand-900">{framework.title}</h3>
                      <p className="text-sm text-slate-600">{framework.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gold-700 uppercase tracking-wide mb-3">Textes réglementaires clés</h4>
                    <ul className="space-y-2">
                      {framework.regulations.map((reg, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <i className="ri-file-text-line text-gold-600 mt-1 flex-shrink-0"></i>
                          <span className="text-sm text-slate-700">{reg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gold-700 uppercase tracking-wide mb-3">Pays couverts</h4>
                    <div className="flex flex-wrap gap-2">
                      {framework.countries.map((country, idx) => (
                        <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-4">
                <i className="ri-information-line text-3xl text-blue-600"></i>
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Expertise réglementaire Khepra Experts</h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Nos consultants maîtrisent parfaitement les cadres réglementaires BCEAO et COBAC. Nous accompagnons les IMF dans leur mise en conformité totale, la préparation aux inspections, et le dialogue avec les autorités de supervision. Plus de <strong>100 institutions</strong> ont atteint la conformité réglementaire grâce à notre accompagnement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CEMAC-Specific CTA Section — OQS-MUT-2026-06-25-001 */}
        <section className="py-12 bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 border border-teal-400/30 rounded-full text-sm font-medium text-teal-300 mb-4">
                  <i className="ri-map-pin-2-line"></i>
                  Zone CEMAC — Cameroun, Gabon, Congo, Tchad, RCA, Guinée Équatoriale
                </div>
                <h2 className="font-playfair text-3xl font-bold mb-4">
                  Agrément microfinance en zone <span className="text-teal-400">CEMAC</span> ?
                </h2>
                <p className="text-teal-100/80 text-lg mb-6 leading-relaxed max-w-xl">
                  Le processus d'agrément COBAC pour les EMF est long et complexe. 70% des dossiers sont rejetés au premier dépôt. Évaluez votre éligibilité en 8 minutes avec notre simulateur exclusif — conçu spécifiquement pour le cadre réglementaire BEAC/COBAC.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/lead-magnets/simulateur-agrement-microfinance-cemac"
                    className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-bank-line"></i>
                    Simulateur d'éligibilité gratuit — 8 min
                  </Link>
                  <Link
                    to="/conformite-cemac"
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-teal-400/40 whitespace-nowrap cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-shield-check-line"></i>
                    Conformité CEMAC complète
                  </Link>
                </div>
                <div className="mt-4 flex items-center gap-4 text-teal-200/70 text-sm">
                  <div className="flex items-center gap-1">
                    <i className="ri-checkbox-circle-line text-teal-400"></i>
                    <span>Règlement COBAC EMF 2018/01</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="ri-checkbox-circle-line text-teal-400"></i>
                    <span>6 pays CEMAC couverts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="ri-checkbox-circle-line text-teal-400"></i>
                    <span>91% de réussite au premier dépôt</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border-2 border-teal-400/30 shadow-2xl">
                  <img
                    src="https://readdy.ai/api/search-image?query=Professional%20African%20central%20bank%20regulatory%20compliance%20BEAC%20COBAC%20microfinance%20licensing%20document%20with%20official%20stamps%20warm%20teal%20and%20amber%20lighting%20premium%20consulting%20atmosphere%20dark%20background%20Central%20Africa%20map%20Cameroon%20Gabon%20Congo%20highlighted%20authoritative%20editorial%20photography%20style&width=600&height=600&seq=cemac-cta-microfinance-2026&orientation=squarish"
                    alt="Agrément Microfinance CEMAC — Simulateur COBAC/BEAC"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-amber-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-400 bg-gold-50">
                <span className="text-sm font-semibold text-gold-700">Solutions complètes</span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
                Nos services pour la <span className="text-gold-600">microfinance</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-amber-700 mx-auto rounded-full mb-4"></div>
              <p className="text-xl text-slate-600">Solutions complètes pour votre institution</p>
            </div>

            <div className="space-y-12">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 hover:border-gold-300 transition-all">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-amber-700 rounded-xl flex items-center justify-center shadow-md">
                      <i className={`${service.icon} text-3xl text-white`}></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-brand-900 line-clamp-2" title={service.category}>{service.category}</h3>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-gold-400 to-amber-600 mt-2 rounded-full"></div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {service.offerings.map((offering, idx) => (
                      <div key={idx} className="bg-amber-50/60 rounded-xl p-6 border border-amber-100 hover:border-gold-300 transition-all">
                        <h4 className="text-lg font-bold text-amber-900 mb-3 line-clamp-2" title={offering.title}>{offering.title}</h4>
                        <p className="text-sm text-slate-600 mb-4">{offering.description}</p>
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-amber-800 mb-2 uppercase tracking-wide">Livrables :</div>
                          {offering.deliverables.map((deliverable, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <i className="ri-checkbox-circle-line text-gold-600 mt-0.5 flex-shrink-0 text-sm"></i>
                              <span className="text-xs text-slate-700">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Magnet CTA - Après Services */}
        <section className="py-8 bg-amber-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <IndustryMiniCTA guide="due-diligence" />
          </div>
        </section>

        {/* Trends & Innovation Section - NEW */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-400 bg-gold-50">
                <span className="text-sm font-semibold text-gold-700">Innovation & Tendances</span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
                Tendances clés de la <span className="text-gold-600">microfinance africaine</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-amber-700 mx-auto rounded-full mb-4"></div>
              <p className="text-xl text-slate-600">Les transformations qui redéfinissent le secteur en 2024-2025</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {trends.map((trend, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-amber-50/30 rounded-2xl p-8 shadow-lg border border-amber-100 hover:border-gold-300 transition-all group">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-amber-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <i className={`${trend.icon} text-2xl text-white`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-brand-900 mb-2 line-clamp-2" title={trend.title}>{trend.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{trend.description}</p>
                      <div className="inline-block px-3 py-1 bg-gold-100 text-gold-800 text-xs font-semibold rounded-full border border-gold-300">
                        {trend.stats}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {trend.examples.map((example, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white/60 rounded-lg p-3 border border-amber-100">
                        <i className="ri-arrow-right-s-line text-gold-600 mt-0.5 flex-shrink-0"></i>
                        <span className="text-sm text-slate-700">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/pillar/microfinance-transformation-africa"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-amber-700 text-white font-semibold rounded-lg hover:from-gold-600 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>En savoir plus sur la transformation digitale de la microfinance</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-400 bg-gold-50">
                <span className="text-sm font-semibold text-gold-700">Étude de cas</span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
                Redressement d&apos;un <span className="text-gold-600">réseau de microfinance</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-amber-700 mx-auto rounded-full mb-4"></div>
              <p className="text-xl text-slate-600">Transformation complète d&apos;une institution en difficulté</p>
            </div>

            <div className="bg-amber-50/40 rounded-2xl p-8 lg:p-12 border border-amber-200">
              {/* Header */}
              <div className="grid md:grid-cols-4 gap-6 mb-12 pb-8 border-b border-amber-200">
                <div>
                  <div className="text-xs font-semibold text-gold-700 uppercase tracking-wide mb-2">Client</div>
                  <div className="font-bold text-slate-900">{caseStudy.client}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gold-700 uppercase tracking-wide mb-2">Secteur</div>
                  <div className="font-bold text-slate-900">{caseStudy.sector}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gold-700 uppercase tracking-wide mb-2">Durée</div>
                  <div className="font-bold text-slate-900">{caseStudy.duration}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gold-700 uppercase tracking-wide mb-2">Équipe</div>
                  <div className="font-bold text-slate-900">{caseStudy.team}</div>
                </div>
              </div>

              {/* Context */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <i className="ri-information-line text-gold-600"></i>
                  Contexte
                </h3>
                <div className="bg-white rounded-xl p-6 mb-4 border border-amber-100">
                  <p className="text-slate-700 mb-4"><strong>Taille :</strong> {caseStudy.size}</p>
                  <p className="text-slate-700"><strong>Pays :</strong> {caseStudy.countries.join(', ')}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {caseStudy.context.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 bg-red-50 rounded-lg p-4 border border-red-100">
                      <i className="ri-close-circle-line text-red-600 mt-1 flex-shrink-0"></i>
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <i className="ri-error-warning-line text-red-600"></i>
                  Défi
                </h3>
                <p className="text-slate-700 leading-relaxed bg-white rounded-xl p-6 border border-amber-100">{caseStudy.challenge}</p>
              </div>

              {/* Solution */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                  <i className="ri-lightbulb-line text-gold-600"></i>
                  Solution mise en œuvre
                </h3>
                <div className="space-y-6">
                  {caseStudy.solution.map((phase, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-amber-100">
                      <h4 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-amber-700 text-white text-xs font-bold">{index + 1}</span>
                        {phase.phase}
                      </h4>
                      <ul className="space-y-3">
                        {phase.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-gold-300">
                              <i className="ri-check-line text-amber-700 text-sm"></i>
                            </div>
                            <span className="text-slate-700">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                  <i className="ri-trophy-line text-gold-600"></i>
                  Résultats obtenus
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {caseStudy.results.map((result, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md border border-amber-100 hover:border-gold-300 transition-all">
                      <i className={`${result.icon} text-4xl ${result.color} mb-3`}></i>
                      <div className="text-3xl font-bold text-amber-800 mb-2 font-playfair">{result.metric}</div>
                      <div className="text-sm text-slate-600">{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-br from-gold-50 to-amber-100 rounded-xl p-8 border border-gold-200">
                <div className="flex items-start gap-4">
                  <i className="ri-double-quotes-l text-4xl text-gold-500"></i>
                  <div>
                    <p className="text-lg text-slate-800 italic mb-4 leading-relaxed">{caseStudy.testimonial.quote}</p>
                    <div className="font-bold text-amber-900">{caseStudy.testimonial.author}</div>
                    <div className="text-sm text-amber-700/70">{caseStudy.testimonial.organization}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ESG & Impact Sectoriel */}
        <section className="py-20 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
                <i className="ri-leaf-line"></i>
                ESG · Éthique · Impact
              </div>
              <h2 className="font-playfair text-4xl font-bold text-white mb-4">
                La microfinance durable :<br />
                <span className="text-emerald-400">notre engagement sectoriel concret</span>
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Chaque mission de conseil intègre une dimension ESG mesurable. Nous ne conseillons pas des institutions — nous renforçons des vecteurs d'inclusion financière responsable.
              </p>
            </div>

            {/* 3 piliers ESG sectoriels */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-400/40 transition-all group">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 border border-emerald-400/30 group-hover:bg-emerald-500/30 transition-all">
                  <i className="ri-plant-line text-2xl text-emerald-400"></i>
                </div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">E — Environnemental</div>
                <h3 className="text-xl font-bold text-white mb-4">Financement vert & résilience climatique</h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                    <span>Intégration de produits de crédit agricole résilient au changement climatique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                    <span>Accompagnement à l'accès aux fonds verts (GCF, FVC, BOAD Vert)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                    <span>Alignement ODD 13 (Action climatique) dans les politiques de crédit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                    <span>Scoring environnemental intégré aux grilles d'analyse crédit</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-emerald-500/20">
                  <div className="text-2xl font-bold text-emerald-400">12+</div>
                  <div className="text-xs text-slate-400">IMF accompagnées vers le financement vert</div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-400/40 transition-all group">
                <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6 border border-amber-400/30 group-hover:bg-amber-500/30 transition-all">
                  <i className="ri-community-line text-2xl text-amber-400"></i>
                </div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">S — Social</div>
                <h3 className="text-xl font-bold text-white mb-4">Inclusion financière & impact sur les populations</h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                    <span>Conception de produits adaptés aux femmes, jeunes et ruraux exclus du système bancaire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                    <span>Co-rédaction de la Stratégie Nationale d'Inclusion Financière (SNIF Togo)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                    <span>Mesure d'impact social : taux de sortie de pauvreté, emplois créés, scolarisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                    <span>Alignement ODD 1 (Fin de la pauvreté) et ODD 10 (Réduction des inégalités)</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-amber-500/20">
                  <div className="text-2xl font-bold text-amber-400">2,4M+</div>
                  <div className="text-xs text-slate-400">Clients à faibles revenus touchés indirectement</div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-sky-500/20 hover:border-sky-400/40 transition-all group">
                <div className="w-14 h-14 bg-sky-500/20 rounded-xl flex items-center justify-center mb-6 border border-sky-400/30 group-hover:bg-sky-500/30 transition-all">
                  <i className="ri-shield-check-line text-2xl text-sky-400"></i>
                </div>
                <div className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3">G — Gouvernance</div>
                <h3 className="text-xl font-bold text-white mb-4">Gouvernance éthique & déontologie stricte</h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                    <span>Mise en place de comités d'audit indépendants et de politiques anti-corruption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                    <span>Codes de déontologie et gestion des conflits d'intérêts formalisés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                    <span>Transparence des taux d'intérêt et protection des emprunteurs vulnérables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                    <span>Alignement aux Principes de Protection des Clients (Smart Campaign)</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-sky-500/20">
                  <div className="text-2xl font-bold text-sky-400">100%</div>
                  <div className="text-xs text-slate-400">Confidentialité et indépendance garanties</div>
                </div>
              </div>
            </div>

            {/* Engagements déontologiques Khepra */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <i className="ri-award-line text-gold-400 text-2xl"></i>
                Nos engagements déontologiques dans le secteur microfinance
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: 'ri-eye-off-line', label: 'Confidentialité absolue', desc: 'Aucune donnée client partagée entre missions concurrentes' },
                  { icon: 'ri-scales-3-line', label: 'Indépendance totale', desc: 'Aucun lien capitalistique avec les fournisseurs recommandés' },
                  { icon: 'ri-hand-coin-line', label: 'Honoraires transparents', desc: 'Devis détaillé avant engagement, zéro frais cachés' },
                  { icon: 'ri-graduation-cap-line', label: 'Transfert de compétences', desc: 'Chaque mission renforce l\'autonomie de l\'institution' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mb-3 border border-gold-400/30">
                      <i className={`${item.icon} text-xl text-gold-400`}></i>
                    </div>
                    <div className="font-bold text-white text-sm mb-2">{item.label}</div>
                    <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ODD alignés */}
            <div className="mt-10 text-center">
              <p className="text-sm text-slate-400 mb-4 uppercase tracking-wider font-semibold">Objectifs de Développement Durable alignés</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { num: 'ODD 1', label: 'Fin de la pauvreté', color: 'bg-red-700' },
                  { num: 'ODD 8', label: 'Travail décent', color: 'bg-red-600' },
                  { num: 'ODD 10', label: 'Inégalités réduites', color: 'bg-pink-700' },
                  { num: 'ODD 13', label: 'Action climatique', color: 'bg-emerald-700' },
                  { num: 'ODD 16', label: 'Paix & Justice', color: 'bg-sky-700' },
                  { num: 'ODD 17', label: 'Partenariats', color: 'bg-sky-900' },
                ].map((odd, i) => (
                  <div key={i} className={`${odd.color} text-white px-4 py-2 rounded-lg text-xs font-bold flex flex-col items-center min-w-[90px]`}>
                    <span className="text-base font-black">{odd.num}</span>
                    <span className="opacity-80 text-center leading-tight">{odd.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-20 bg-amber-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-400 bg-gold-50">
                <span className="text-sm font-semibold text-gold-700">Pourquoi nous choisir</span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
                Pourquoi choisir <span className="text-gold-600">Khepra Experts</span> ?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-amber-700 mx-auto rounded-full mb-4"></div>
              <p className="text-xl text-slate-600">Une expertise reconnue en microfinance africaine</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {expertise.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-amber-100 hover:border-gold-300 transition-all">
                  <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-gold-100 to-amber-100 border border-gold-300">
                      <i className="ri-star-line text-gold-600 text-sm"></i>
                    </div>
                    {item.title}
                  </h3>
                  <ul className="space-y-3">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <i className="ri-check-line text-gold-600 mt-1 flex-shrink-0"></i>
                        <span className="text-slate-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - NEW */}
        <section className="py-20 bg-amber-50/50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-400 bg-gold-50">
                <span className="text-sm font-semibold text-gold-700">Questions fréquentes</span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
                FAQ <span className="text-gold-600">Microfinance</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-amber-700 mx-auto rounded-full mb-4"></div>
              <p className="text-xl text-slate-600">Réponses d'experts aux questions les plus fréquentes</p>
            </div>

            <FAQAccordion items={faqItems} variant="compact" accentColor="gold" />
          </div>
        </section>

        {/* Related Content Section - NEW */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Articles */}
              <div>
                <h3 className="text-2xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                  <i className="ri-article-line text-gold-600"></i>
                  Articles recommandés
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((article, index) => (
                    <Link
                      key={index}
                      to={`/insights/${article.slug}`}
                      className="block bg-amber-50/60 rounded-xl p-5 border border-amber-100 hover:border-gold-300 hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="font-bold text-brand-900 group-hover:text-gold-700 transition-colors flex-1">
                          {article.title}
                        </h4>
                        <i className="ri-arrow-right-line text-gold-600 group-hover:translate-x-1 transition-transform flex-shrink-0"></i>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <span className="px-2 py-1 bg-gold-100 text-gold-800 rounded-full font-medium">{article.category}</span>
                        <span className="flex items-center gap-1">
                          <i className="ri-time-line"></i>
                          {article.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-2xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                  <i className="ri-download-cloud-line text-gold-600"></i>
                  Ressources téléchargeables
                </h3>
                <div className="space-y-4">
                  {relatedResources.map((resource, index) => (
                    <Link
                      key={index}
                      to="/resources"
                      className="block bg-gradient-to-br from-gold-50 to-amber-50 rounded-xl p-5 border border-gold-200 hover:border-gold-400 hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-amber-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                          <i className={`${resource.icon} text-xl text-white`}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-brand-900 mb-1 group-hover:text-gold-700 transition-colors">
                            {resource.title}
                          </h4>
                          <span className="text-xs text-gold-700 font-medium">{resource.type}</span>
                        </div>
                        <i className="ri-download-line text-gold-600 text-xl group-hover:translate-y-1 transition-transform"></i>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Link
                    to="/resources"
                    className="inline-flex items-center gap-2 text-gold-700 font-semibold hover:text-gold-800 transition-colors cursor-pointer"
                  >
                    <span>Voir toutes les ressources</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-brand-950 via-amber-950 to-brand-950 border-t-4 border-gold-500">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-playfair text-4xl font-bold text-white mb-6">
              Transformez votre institution de <span className="text-gold-400">microfinance</span>
            </h2>
            <p className="text-xl text-amber-200/80 mb-8">
              Nos experts vous accompagnent dans votre conformité, votre gouvernance et votre transformation digitale
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-gradient-to-r from-gold-500 to-amber-700 text-white font-semibold rounded-lg hover:from-gold-600 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer hover:scale-105"
              >
                Demander un audit
              </button>
              <Link
                to="/case-studies"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-gold-400/40 whitespace-nowrap cursor-pointer"
              >
                Voir nos réalisations
              </Link>
              <a
                href="#brochure"
                onClick={(e) => { e.preventDefault(); handleDownload(); }}
                className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer hover:scale-105 flex items-center gap-2 no-underline"
              >
                {isDownloading ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-download-line" />}
                Télécharger la brochure
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default MicrofinancePage;