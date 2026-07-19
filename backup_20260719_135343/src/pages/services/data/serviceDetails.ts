export type CaseStudy = {
  id: string;
  title: { fr: string; en: string };
  client: { fr: string; en: string };
  challenge: { fr: string; en: string };
  solution: { fr: string; en: string };
  results: Array<{ fr: string; en: string }>;
  consortium?: {
    partner: string;
    partnerUrl: string;
    role: { fr: string; en: string };
    partnerRole: { fr: string; en: string };
  };
};

export type ServiceDetail = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category?: string;
  hero: {
    title: { fr: string; en: string };
    subtitle: { fr: string; en: string };
    description: { fr: string; en: string };
    image: string;
    badge: { fr: string; en: string };
    icon: string;
    color: string;
    bg: string;
    border: string;
  };
  overview: {
    title: { fr: string; en: string };
    description: { fr: string; en: string };
    keyPoints: Array<{ fr: string; en: string }>;
  };
  challenges: {
    title: { fr: string; en: string };
    description: { fr: string; en: string };
    items: Array<{
      icon: string;
      title: { fr: string; en: string };
      description: { fr: string; en: string };
    }>;
  };
  solutions: {
    title: { fr: string; en: string };
    description: { fr: string; en: string };
    items: Array<{
      icon: string;
      title: { fr: string; en: string };
      description: { fr: string; en: string };
    }>;
  };
  offerings: {
    title: { fr: string; en: string };
    items: Array<{
      title: { fr: string; en: string };
      description: { fr: string; en: string };
      icon: string;
      deliverables: Array<{ fr: string; en: string }>;
    }>;
  };
  impacts: {
    title: { fr: string; en: string };
    description: { fr: string; en: string };
    metrics: Array<{
      value: string;
      label: { fr: string; en: string };
      icon: string;
    }>;
  };
  methodology: {
    title: { fr: string; en: string };
    description: { fr: string; en: string };
    phases: Array<{
      number: number;
      title: { fr: string; en: string };
      description: { fr: string; en: string };
      duration: { fr: string; en: string };
      icon: string;
      deliverables: Array<{ fr: string; en: string }>;
    }>;
  };
  caseStudies: string[];
  testimonials: Array<{
    quote: { fr: string; en: string };
    author: { fr: string; en: string };
    role: { fr: string; en: string };
    organization: { fr: string; en: string };
  }>;
  process: {
    title: { fr: string; en: string };
    steps: Array<{
      number: number;
      title: { fr: string; en: string };
      description: { fr: string; en: string };
      duration: { fr: string; en: string };
      icon: string;
    }>;
  };
  certifications: {
    title: { fr: string; en: string };
    items: Array<{
      name: string;
      icon: string;
      description: { fr: string; en: string };
    }>;
  };
  faq: {
    title: { fr: string; en: string };
    items: Array<{
      question: { fr: string; en: string };
      answer: { fr: string; en: string };
    }>;
  };
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'strategic-advisory',
    slug: 'strategic-advisory',
    title: 'Conseil Stratégique & Croissance',
    description: 'Khepra Experts est un cabinet de conseil de réputation internationale, spécialisé dans la conformité réglementaire, le due diligence et l\'accompagnement ESG en Afrique francophone. Stratégie de croissance, business model innovation et transformation organisationnelle pour accélérer votre développement.',
    category: 'Strategy & Advisory',
    hero: {
      title: {
        fr: 'Strategy & Advisory',
        en: 'Strategy & Advisory',
      },
      subtitle: {
        fr: 'Accélérez votre croissance avec une stratégie claire et des plans d\'action concrets',
        en: 'Accelerate your growth with clear strategy and concrete action plans',
      },
      description: {
        fr: 'Nous accompagnons les dirigeants dans la définition de leur vision stratégique, la conception de business models innovants et la transformation de leur organisation pour une croissance durable et profitable.',
        en: 'We support leaders in defining their strategic vision, designing innovative business models and transforming their organization for sustainable and profitable growth.',
      },
      image: 'https://readdy.ai/api/search-image?query=african%20business%20executives%20in%20strategic%20planning%20session%20modern%20boardroom%20with%20whiteboard%20showing%20growth%20strategy%20charts%20professional%20consultants%20presenting%20business%20transformation%20roadmap%20collaborative%20atmosphere%20natural%20lighting%20high-end%20corporate%20photography%20conveying%20strategic%20thinking%20and%20leadership&width=1200&height=600&seq=strategy-advisory-hero-2025&orientation=landscape',
      badge: { fr: 'Strategy & Advisory', en: 'Strategy & Advisory' },
      icon: 'ri-lightbulb-flash-line',
      color: 'text-brand-700',
      bg: 'bg-brand-50',
      border: 'border-brand-200',
    },
    overview: {
      title: {
        fr: 'Transformez votre vision en résultats mesurables',
        en: 'Transform your vision into measurable results',
      },
      description: {
        fr: 'Dans un environnement économique en mutation rapide, avoir une stratégie claire et des plans d\'action concrets est essentiel. Nous vous aidons à définir votre positionnement stratégique, à concevoir des modèles économiques innovants et à piloter votre transformation organisationnelle pour atteindre vos objectifs de croissance.',
        en: 'In a rapidly changing economic environment, having a clear strategy and concrete action plans is essential. We help you define your strategic positioning, design innovative business models and drive your organizational transformation to achieve your growth objectives.',
      },
      keyPoints: [
        { fr: 'Plans stratégiques 3-5 ans actionnables', en: 'Actionable 3-5 year strategic plans' },
        { fr: 'Business model innovation et diversification', en: 'Business model innovation and diversification' },
        { fr: 'Transformation organisationnelle et conduite du changement', en: 'Organizational transformation and change management' },
        { fr: 'Études de marché et intelligence économique', en: 'Market studies and economic intelligence' },
        { fr: 'Accompagnement à la décision stratégique', en: 'Strategic decision support' },
      ],
    },
    challenges: {
      title: {
        fr: 'Les défis stratégiques de nos clients',
        en: 'Our clients\' strategic challenges',
      },
      description: {
        fr: 'Les organisations africaines font face à des défis complexes qui nécessitent une approche stratégique structurée.',
        en: 'African organizations face complex challenges that require a structured strategic approach.',
      },
      items: [
        {
          icon: 'ri-compass-3-line',
          title: { fr: 'Manque de vision stratégique claire', en: 'Lack of clear strategic vision' },
          description: {
            fr: 'Absence de direction stratégique partagée, objectifs flous et difficulté à prioriser les initiatives.',
            en: 'Lack of shared strategic direction, vague objectives and difficulty prioritizing initiatives.',
          },
        },
        {
          icon: 'ri-line-chart-line',
          title: { fr: 'Croissance stagnante ou déclin', en: 'Stagnant growth or decline' },
          description: {
            fr: 'Difficulté à maintenir la croissance, perte de parts de marché face à la concurrence.',
            en: 'Difficulty maintaining growth, loss of market share to competition.',
          },
        },
        {
          icon: 'ri-organization-chart',
          title: { fr: 'Organisation inadaptée', en: 'Inadequate organization' },
          description: {
            fr: 'Structure organisationnelle qui freine l\'exécution de la stratégie et l\'agilité.',
            en: 'Organizational structure that hinders strategy execution and agility.',
          },
        },
        {
          icon: 'ri-global-line',
          title: { fr: 'Expansion régionale complexe', en: 'Complex regional expansion' },
          description: {
            fr: 'Difficulté à identifier les opportunités et à déployer efficacement dans de nouveaux marchés.',
            en: 'Difficulty identifying opportunities and effectively deploying in new markets.',
          },
        },
      ],
    },
    solutions: {
      title: {
        fr: 'Notre approche stratégique éprouvée',
        en: 'Our proven strategic approach',
      },
      description: {
        fr: 'Une méthodologie rigoureuse qui combine analyse stratégique, co-construction et accompagnement opérationnel.',
        en: 'A rigorous methodology that combines strategic analysis, co-construction and operational support.',
      },
      items: [
        {
          icon: 'ri-search-eye-line',
          title: { fr: 'Diagnostic stratégique 360°', en: '360° strategic diagnostic' },
          description: {
            fr: 'Analyse approfondie de votre situation actuelle, de votre environnement concurrentiel et de vos enjeux stratégiques.',
            en: 'In-depth analysis of your current situation, competitive environment and strategic issues.',
          },
        },
        {
          icon: 'ri-draft-line',
          title: { fr: 'Co-construction de la stratégie', en: 'Strategic co-construction' },
          description: {
            fr: 'Élaboration collaborative de votre vision, ambitions stratégiques et feuille de route avec vos équipes dirigeantes.',
            en: 'Co-construction of your vision, strategic ambitions and roadmap with your leadership teams.',
          },
        },
        {
          icon: 'ri-tools-line',
          title: { fr: 'Plans d\'action opérationnels', en: 'Operational action plans' },
          description: {
            fr: 'Traduction de la stratégie en plans d\'action détaillés avec jalons, responsables et budgets.',
            en: 'Translation of strategy into detailed action plans with milestones, owners and budgets.',
          },
        },
        {
          icon: 'ri-line-chart-line',
          title: { fr: 'Accompagnement & suivi', en: 'Support & monitoring' },
          description: {
            fr: 'Support dans le déploiement de la stratégie, suivi des indicateurs et ajustements nécessaires.',
            en: 'Support in strategy deployment, indicator monitoring and necessary adjustments.',
          },
        },
      ],
    },
    offerings: {
      title: {
        fr: 'Nos prestations en conseil stratégique',
        en: 'Our strategic advisory services',
      },
      items: [
        {
          title: {
            fr: 'Élaboration de plans stratégiques',
            en: 'Strategic plan development',
          },
          description: {
            fr: 'Conception de votre stratégie de développement à moyen et long terme avec vision, objectifs et feuille de route détaillée.',
            en: 'Design of your medium and long-term development strategy with vision, objectives and detailed roadmap.',
          },
          icon: 'ri-route-line',
          deliverables: [
            { fr: 'Diagnostic stratégique complet', en: 'Complete strategic diagnostic' },
            { fr: 'Plan stratégique 3-5 ans', en: '3-5 year strategic plan' },
            { fr: 'Modèle financier prévisionnel', en: 'Financial forecast model' },
            { fr: 'Feuille de route stratégique', en: 'Strategic roadmap' },
          ],
        },
        {
          title: {
            fr: 'Business Model Innovation',
            en: 'Business Model Innovation',
          },
          description: {
            fr: 'Refonte ou diversification de votre modèle économique pour créer de nouvelles sources de revenus et améliorer la rentabilité.',
            en: 'Redesign or diversification of your business model to create new revenue streams and improve profitability.',
          },
          icon: 'ri-lightbulb-line',
          deliverables: [
            { fr: 'Business Model Canvas', en: 'Business Model Canvas' },
            { fr: 'Analyse de rentabilité par segment', en: 'Profitability analysis by segment' },
            { fr: 'Stratégie de diversification', en: 'Diversification strategy' },
            { fr: 'Plan de monétisation', en: 'Monetization plan' },
          ],
        },
        {
          title: {
            fr: 'Études de marché et intelligence économique',
            en: 'Market studies and economic intelligence',
          },
          description: {
            fr: 'Analyses sectorielles, études de marché et veille concurrentielle pour éclairer vos décisions stratégiques.',
            en: 'Sector analyses, market studies and competitive intelligence to inform your strategic decisions.',
          },
          icon: 'ri-bar-chart-box-line',
          deliverables: [
            { fr: 'Études de marché sectorielles', en: 'Sector market studies' },
            { fr: 'Analyse concurrentielle', en: 'Competitive analysis' },
            { fr: 'Segmentation et sizing de marché', en: 'Market segmentation and sizing' },
            { fr: 'Opportunités de croissance identifiées', en: 'Identified growth opportunities' },
          ],
        },
        {
          title: {
            fr: 'Transformation organisationnelle',
            en: 'Organizational transformation',
          },
          description: {
            fr: 'Restructuration de votre organisation pour aligner structure, processus et culture avec votre stratégie.',
            en: 'Restructuring of your organization to align structure, processes and culture with your strategy.',
          },
          icon: 'ri-organization-chart',
          deliverables: [
            { fr: 'Études de marché sectorielles', en: 'Sector market studies' },
            { fr: 'Analyse concurrentielle', en: 'Competitive analysis' },
            { fr: 'Segmentation et sizing de marché', en: 'Market segmentation and sizing' },
            { fr: 'Opportunités de croissance identifiées', en: 'Identified growth opportunities' },
          ],
        },
      ],
    },
    impacts: {
      title: {
        fr: 'Impacts mesurables pour nos clients',
        en: 'Measurable impacts for our clients',
      },
      description: {
        fr: 'Nos interventions génèrent des résultats concrets et mesurables.',
        en: 'Our interventions generate concrete and measurable results.',
      },
      metrics: [
        {
          value: '+40%',
          label: { fr: 'Croissance du chiffre d\'affaires en moyenne', en: 'Average revenue growth' },
          icon: 'ri-line-chart-line',
        },
        {
          value: '18 mois',
          label: { fr: 'Délai moyen d\'atteinte des objectifs', en: 'Average time to achieve objectives' },
          icon: 'ri-time-line',
        },
        {
          value: '95%',
          label: { fr: 'Taux de satisfaction clients', en: 'Client satisfaction rate' },
          icon: 'ri-star-line',
        },
        {
          value: '30+',
          label: { fr: 'Plans stratégiques déployés', en: 'Strategic plans deployed' },
          icon: 'ri-file-list-3-line',
        },
      ],
    },
    methodology: {
      title: {
        fr: 'Notre méthodologie d\'intervention',
        en: 'Our intervention methodology',
      },
      description: {
        fr: 'Une approche structurée en 4 phases pour garantir l\'impact et la pérennité des résultats.',
        en: 'A structured 4-phase approach to ensure impact and sustainability of results.',
      },
      phases: [
        {
          number: 1,
          title: { fr: 'Diagnostic & Analyse', en: 'Diagnostic & Analysis' },
          description: {
            fr: 'Analyse approfondie de votre situation actuelle, de votre environnement concurrentiel et de vos enjeux stratégiques.',
            en: 'In-depth analysis of your current situation, competitive environment and strategic issues.',
          },
          duration: { fr: '3-4 semaines', en: '3-4 weeks' },
          icon: 'ri-search-eye-line',
          deliverables: [
            { fr: 'Diagnostic stratégique 360°', en: '360° strategic diagnostic' },
            { fr: 'Analyse SWOT détaillée', en: 'Detailed SWOT analysis' },
            { fr: 'Cartographie des parties prenantes', en: 'Stakeholder mapping' },
            { fr: 'Benchmark concurrentiel', en: 'Competitive benchmark' },
          ],
        },
        {
          number: 2,
          title: { fr: 'Conception Stratégique', en: 'Strategic Design' },
          description: {
            fr: 'Co-construction de votre vision, ambitions stratégiques et feuille de route avec vos équipes dirigeantes.',
            en: 'Co-construction of your vision, strategic ambitions and roadmap with your leadership teams.',
          },
          duration: { fr: '2-3 semaines', en: '2-3 weeks' },
          icon: 'ri-draft-line',
          deliverables: [
            { fr: 'Vision et ambitions stratégiques', en: 'Vision and strategic ambitions' },
            { fr: 'Axes stratégiques prioritaires', en: 'Priority strategic axes' },
            { fr: 'Business model cible', en: 'Target business model' },
            { fr: 'Feuille de route stratégique', en: 'Strategic roadmap' },
          ],
        },
        {
          number: 3,
          title: { fr: 'Planification Opérationnelle', en: 'Operational Planning' },
          description: {
            fr: 'Traduction de la stratégie en plans d\'action détaillés avec jalons et responsables.',
            en: 'Translation of strategy into detailed action plans with milestones and owners.',
          },
          duration: { fr: '2-3 semaines', en: '2-3 weeks' },
          icon: 'ri-file-list-3-line',
          deliverables: [
            { fr: 'Plans d\'action par axe stratégique', en: 'Action plans by strategic axis' },
            { fr: 'Budget et ressources nécessaires', en: 'Budget and required resources' },
            { fr: 'Calendrier de mise en œuvre', en: 'Implementation timeline' },
            { fr: 'Tableau de bord de pilotage', en: 'Management dashboard' },
          ],
        },
        {
          number: 4,
          title: { fr: 'Accompagnement & Suivi', en: 'Support & Monitoring' },
          description: {
            fr: 'Support dans le déploiement de la stratégie, suivi des indicateurs et ajustements nécessaires.',
            en: 'Support in strategy deployment, indicator monitoring and necessary adjustments.',
          },
          duration: { fr: '6-12 mois', en: '6-12 months' },
          icon: 'ri-line-chart-line',
          deliverables: [
            { fr: 'Comités de pilotage mensuels', en: 'Monthly steering committees' },
            { fr: 'Rapports d\'avancement trimestriels', en: 'Quarterly progress reports' },
            { fr: 'Ajustements de la stratégie', en: 'Strategy adjustments' },
            { fr: 'Renforcement des capacités', en: 'Capacity building' },
          ],
        },
      ],
    },
    caseStudies: ['cs5', 'cs6'],
    testimonials: [
      {
        quote: {
          fr: 'KHEPRA EXPERTS nous a aidés à clarifier notre vision stratégique et à structurer notre plan de croissance. En 18 mois, nous avons augmenté notre chiffre d\'affaires de 45% et étendu nos opérations dans 3 nouveaux pays.',
          en: 'KHEPRA EXPERTS helped us clarify our strategic vision and structure our growth plan. In 18 months, we increased our revenue by 45% and expanded our operations to 3 new countries.',
        },
        author: { fr: 'Amadou K.', en: 'Amadou K.' },
        role: { fr: 'Directeur Général', en: 'Chief Executive Officer' },
        organization: { fr: 'Groupe de distribution', en: 'Distribution Group' },
      },
      {
        quote: {
          fr: 'L\'accompagnement de KHEPRA dans notre transformation organisationnelle a été remarquable. Leur approche pragmatique et leur connaissance du contexte africain ont fait toute la différence.',
          en: 'KHEPRA\'s support in our organizational transformation was remarkable. Their pragmatic approach and knowledge of the African context made all the difference.',
        },
        author: { fr: 'Fatou D.', en: 'Fatou D.' },
        role: { fr: 'Directrice Stratégie', en: 'Strategy Director' },
        organization: { fr: 'Institution financière', en: 'Financial Institution' },
      },
    ],
    process: {
      title: {
        fr: 'Notre processus d\'intervention',
        en: 'Our intervention process',
      },
      steps: [
        {
          number: 1,
          title: { fr: 'Diagnostic stratégique', en: 'Strategic diagnostic' },
          description: {
            fr: 'Analyse approfondie de votre situation, environnement et enjeux stratégiques.',
            en: 'In-depth analysis of your situation, environment and strategic issues.',
          },
          duration: { fr: '3-4 semaines', en: '3-4 weeks' },
          icon: 'ri-search-eye-line',
        },
        {
          number: 2,
          title: { fr: 'Conception stratégique', en: 'Strategic design' },
          description: {
            fr: 'Co-construction de votre vision, ambitions et feuille de route stratégique.',
            en: 'Co-construction of your vision, ambitions and strategic roadmap.',
          },
          duration: { fr: '2-3 semaines', en: '2-3 weeks' },
          icon: 'ri-draft-line',
        },
        {
          number: 3,
          title: { fr: 'Planification opérationnelle', en: 'Operational planning' },
          description: {
            fr: 'Traduction de la stratégie en plans d\'action détaillés avec jalons et responsables.',
            en: 'Translation of strategy into detailed action plans with milestones and owners.',
          },
          duration: { fr: '2-3 semaines', en: '2-3 weeks' },
          icon: 'ri-file-list-3-line',
        },
        {
          number: 4,
          title: { fr: 'Accompagnement & suivi', en: 'Support & monitoring' },
          description: {
            fr: 'Support dans le déploiement de la stratégie, suivi des indicateurs et ajustements nécessaires.',
            en: 'Support in strategy deployment, indicator monitoring and necessary adjustments.',
          },
          duration: { fr: '6-12 mois', en: '6-12 months' },
          icon: 'ri-line-chart-line',
        },
      ],
    },
    certifications: {
      title: {
        fr: 'Certifications et accréditations',
        en: 'Certifications and accreditations',
      },
      items: [
        {
          name: 'MBA Strategy',
          icon: 'ri-graduation-cap-line',
          description: {
            fr: 'Consultants certifiés MBA avec spécialisation en stratégie d\'entreprise',
            en: 'MBA certified consultants with specialization in corporate strategy',
          },
        },
        {
          name: 'PMP',
          icon: 'ri-file-shield-2-line',
          description: {
            fr: 'Project Management Professional pour la gestion de projets stratégiques',
            en: 'Project Management Professional for strategic project management',
          },
        },
        {
          name: 'Change Management',
          icon: 'ri-refresh-line',
          description: {
            fr: 'Certifications en conduite du changement et transformation organisationnelle',
            en: 'Certifications in change management and organizational transformation',
          },
        },
      ],
    },
    faq: {
      title: {
        fr: 'Questions fréquentes',
        en: 'Frequently asked questions',
      },
      items: [
        {
          question: {
            fr: 'Combien de temps prend l\'élaboration d\'un plan stratégique ?',
            en: 'How long does it take to develop a strategic plan?',
          },
          answer: {
            fr: 'L\'élaboration d\'un plan stratégique complet prend généralement entre 8 et 12 semaines, incluant le diagnostic (3-4 semaines), la conception stratégique (2-3 semaines) et la planification opérationnelle (2-3 semaines). Ce délai peut varier selon la complexité de votre organisation et la disponibilité de vos équipes.',
            en: 'Developing a complete strategic plan typically takes 8 to 12 weeks, including diagnostic (3-4 weeks), strategic design (2-3 weeks) and operational planning (2-3 weeks). This timeline may vary depending on your organization\'s complexity and your teams\' availability.',
          },
        },
        {
          question: {
            fr: 'Comment garantissez-vous l\'exécution de la stratégie ?',
            en: 'How do you ensure strategy execution?',
          },
          answer: {
            fr: 'Nous accompagnons nos clients dans la phase d\'exécution à travers : (1) des plans d\'action détaillés avec responsables et jalons, (2) un tableau de bord de pilotage avec KPIs, (3) des comités de pilotage mensuels, (4) un accompagnement opérationnel sur 6-12 mois. Notre approche garantit que la stratégie ne reste pas un document mais se traduit en résultats concrets.',
            en: 'We support our clients in the execution phase through: (1) detailed action plans with owners and milestones, (2) a management dashboard with KPIs, (3) monthly steering committees, (4) operational support over 6-12 months. Our approach ensures that strategy doesn\'t remain a document but translates into concrete results.',
          },
        },
        {
          question: {
            fr: 'Quelle est la différence entre un plan stratégique et un business plan ?',
            en: 'What is the difference between a strategic plan and a business plan?',
          },
          answer: {
            fr: 'Le plan stratégique définit votre vision à moyen-long terme (3-5 ans), vos axes stratégiques et votre feuille de route. Le business plan est plus opérationnel et financier, détaillant votre modèle économique, projections financières et plan de financement. Nous élaborons les deux documents de manière complémentaire selon vos besoins.',
            en: 'The strategic plan defines your medium-long term vision (3-5 years), strategic axes and roadmap. The business plan is more operational and financial, detailing your business model, financial projections and financing plan. We develop both documents in a complementary manner according to your needs.',
          },
        },
        {
          question: {
            fr: 'Accompagnez-vous les PME et startups ou uniquement les grandes organisations ?',
            en: 'Do you support SMEs and startups or only large organizations?',
          },
          answer: {
            fr: 'Nous accompagnons des organisations de toutes tailles : startups en phase de structuration, PME en croissance et grandes entreprises en transformation. Notre approche est modulaire et s\'adapte à votre taille, budget et niveau de maturité. Nous proposons également des formats d\'intervention allégés pour les PME et startups.',
            en: 'We support organizations of all sizes: startups in structuring phase, growing SMEs and large companies in transformation. Our approach is modular and adapts to your size, budget and maturity level. We also offer lighter intervention formats for SMEs and startups.',
          },
        },
      ],
    },
  },
  {
    id: 'corporate-governance',
    slug: 'gouvernance-entreprise',
    title: 'Gouvernance d\'Entreprise & Conformité',
    description: 'Structuration des organes de gouvernance, conformité réglementaire BCEAO/COBAC et renforcement des capacités pour une gouvernance robuste et durable. Khepra Experts est un cabinet de conseil de réputation internationale, spécialisé dans la conformité prudentielle en zones UEMOA et CEMAC.',
    category: 'Corporate Governance',
    hero: {
      title: {
        fr: 'Gouvernance d\'entreprise & Conformité',
        en: 'Corporate Governance & Compliance',
      },
      subtitle: {
        fr: 'Structurez votre gouvernance pour une croissance durable',
        en: 'Structure your governance for sustainable growth',
      },
      description: {
        fr: 'Nous accompagnons les institutions financières, PME et startups dans la mise en place de cadres de gouvernance robustes et conformes aux standards internationaux et régionaux.',
        en: 'We support financial institutions, SMEs and startups in establishing robust governance frameworks compliant with international and regional standards.',
      },
      image: 'https://readdy.ai/api/search-image?query=professional%20african%20business%20boardroom%20meeting%20with%20diverse%20executives%20discussing%20corporate%20governance%2C%20modern%20conference%20room%20with%20glass%20walls%2C%20natural%20lighting%2C%20professional%20corporate%20photography%20showing%20leadership%20and%20strategic%20planning&width=1200&height=600&seq=service-governance-hero&orientation=landscape',
      badge: { fr: 'Gouvernance', en: 'Governance' },
      icon: 'ri-shield-check-line',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    overview: {
      title: {
        fr: 'Une gouvernance solide, fondement de votre réussite',
        en: 'Strong governance, foundation of your success',
      },
      description: {
        fr: 'Dans un environnement réglementaire en constante évolution, une gouvernance d\'entreprise efficace n\'est plus une option mais une nécessité. Nous vous aidons à structurer vos organes de gouvernance, à définir des politiques claires et à assurer la conformité avec les exigences de la BCEAO, de la COBAC et des standards internationaux.',
        en: 'In a constantly evolving regulatory environment, effective corporate governance is no longer an option but a necessity. We help you structure your governance bodies, define clear policies and ensure compliance with BCEAO, COBAC and international standards requirements.',
      },
      keyPoints: [
        { fr: 'Conformité réglementaire BCEAO/COBAC', en: 'BCEAO/COBAC regulatory compliance' },
        { fr: 'Structuration des organes de gouvernance', en: 'Governance bodies structuring' },
        { fr: 'Politiques et procéduures internes', en: 'Internal policies and procedures' },
        { fr: 'Formation des administrateurs', en: 'Board members training' },
        { fr: 'Audit et évaluation de la gouvernance', en: 'Governance audit and assessment' },
      ],
    },
    offerings: {
      title: {
        fr: 'Nos prestations en gouvernance',
        en: 'Our governance services',
      },
      items: [
        {
          title: {
            fr: 'Diagnostic et audit de gouvernance',
            en: 'Governance diagnostic and audit',
          },
          description: {
            fr: 'Évaluation complète de votre dispositif de gouvernance actuel par rapport aux meilleures pratiques et exigences réglementaires.',
            en: 'Comprehensive assessment of your current governance framework against best practices and regulatory requirements.',
          },
          icon: 'ri-search-line',
          deliverables: [
            { fr: 'Rapport d\'audit détaillé avec cartographie des écarts', en: 'Detailed audit report with gap mapping' },
            { fr: 'Matrice de conformité réglementaire', en: 'Regulatory compliance matrix' },
            { fr: 'Plan d\'action priorisé', en: 'Prioritized action plan' },
            { fr: 'Benchmark sectoriel', en: 'Sector benchmark' },
          ],
        },
        {
          title: {
            fr: 'Structuration des organes de gouvernance',
            en: 'Governance bodies structuring',
          },
          description: {
            fr: 'Mise en place ou refonte de vos instances de gouvernance : Conseil d\'Administration, comités spécialisés, direction générale.',
            en: 'Establishment or restructuring of your governance bodies: Board of Directors, specialized committees, executive management.',
          },
          icon: 'ri-organization-chart',
          deliverables: [
            { fr: 'Charte de gouvernance', en: 'Governance charter' },
            { fr: 'Règlements intérieurs des comités', en: 'Committee internal regulations' },
            { fr: 'Profils et fiches de poste des administrateurs', en: 'Director profiles and job descriptions' },
            { fr: 'Calendrier des réunions et ordre du jour types', en: 'Meeting calendar and standard agendas' },
          ],
        },
        {
          title: {
            fr: 'Élaboration de politiques et procéduures',
            en: 'Policies and procedures development',
          },
          description: {
            fr: 'Conception et rédaction de l\'ensemble des politiques et procédures nécessaires à une gouvernance efficace et conforme.',
            en: 'Design and drafting of all policies and procedures necessary for effective and compliant governance.',
          },
          icon: 'ri-file-text-line',
          deliverables: [
            { fr: 'Manuel de gouvernance', en: 'Governance manual' },
            { fr: 'Politiques de gestion des risques', en: 'Risk management policies' },
            { fr: 'Code de déontologie et d\'éthique', en: 'Code of conduct and ethics' },
            { fr: 'Procéduures de contrôle interne', en: 'Internal control procedures' },
          ],
        },
        {
          title: {
            fr: 'Formation et accompagnement',
            en: 'Training and support',
          },
          description: {
            fr: 'Renforcement des capacités de vos équipes dirigeantes et administrateurs sur les enjeux de gouvernance et de conformité.',
            en: 'Capacity building for your management teams and directors on governance and compliance issues.',
          },
          icon: 'ri-graduation-cap-line',
          deliverables: [
            { fr: 'Sessions de formation sur mesure', en: 'Customized training sessions' },
            { fr: 'Ateliers pratiques de mise en situation', en: 'Practical simulation workshops' },
            { fr: 'Supports pédagogiques', en: 'Educational materials' },
            { fr: 'Accompagnement post-formation', en: 'Post-training support' },
          ],
        },
      ],
    },
    caseStudies: ['cs1', 'cs3'],
    testimonials: [
      {
        quote: {
          fr: 'KHEPRA EXPERTS nous a accompagnés dans la refonte complète de notre gouvernance. Leur expertise et leur connaissance du contexte réglementaire africain ont été déterminantes pour atteindre la conformité BCEAO en seulement 6 mois.',
          en: 'KHEPRA EXPERTS supported us in the complete overhaul of our governance. Their expertise and knowledge of the African regulatory context were decisive in achieving BCEAO compliance in just 6 months.',
        },
        author: { fr: 'Marie-Claire A.', en: 'Marie-Claire A.' },
        role: { fr: 'Directrice Générale', en: 'Chief Executive Officer' },
        organization: { fr: 'Banque régionale', en: 'Regional Bank' },
      },
      {
        quote: {
          fr: 'L\'accompagnement de KHEPRA a transformé notre approche de la gouvernance. Les formations dispensées à notre Conseil d\'Administration ont considérablement amélioré la qualité de nos délibérations et notre capacité à anticiper les risques.',
          en: 'KHEPRA\'s support transformed our approach to governance. The training provided to our Board of Directors significantly improved the quality of our deliberations and our ability to anticipate risks.',
        },
        author: { fr: 'Amadou S.', en: 'Amadou S.' },
        role: { fr: 'Président du Conseil d\'Administration', en: 'Chairman of the Board' },
        organization: { fr: 'Réseau de microfinance', en: 'Microfinance Network' },
      },
    ],
    process: {
      title: {
        fr: 'Notre processus d\'intervention',
        en: 'Our intervention process',
      },
      steps: [
        {
          number: 1,
          title: { fr: 'Diagnostic initial', en: 'Initial diagnostic' },
          description: {
            fr: 'Analyse approfondie de votre dispositif de gouvernance actuel, identification des écarts réglementaires et des axes d\'amélioration prioritaires.',
            en: 'In-depth analysis of your current governance framework, identification of regulatory gaps and priority improvement areas.',
          },
          duration: { fr: '2-3 semaines', en: '2-3 weeks' },
          icon: 'ri-stethoscope-line',
        },
        {
          number: 2,
          title: { fr: 'Plan d\'action', en: 'Action plan' },
          description: {
            fr: 'Élaboration d\'une feuille de route détaillée avec jalons, livrables et calendrier de mise en œuvre adapté à vos contraintes.',
            en: 'Development of a detailed roadmap with milestones, deliverables and implementation timeline adapted to your constraints.',
          },
          duration: { fr: '1 semaine', en: '1 week' },
          icon: 'ri-route-line',
        },
        {
          number: 3,
          title: { fr: 'Mise en œuvre', en: 'Implementation' },
          description: {
            fr: 'Accompagnement opérationnel dans la structuration des organes, l\'élaboration des politiques et la formation des équipes.',
            en: 'Operational support in structuring bodies, developing policies and training teams.',
          },
          duration: { fr: '3-6 mois', en: '3-6 months' },
          icon: 'ri-tools-line',
        },
        {
          number: 4,
          title: { fr: 'Suivi et ajustement', en: 'Monitoring and adjustment' },
          description: {
            fr: 'Évaluation de la mise en œuvre, ajustements nécessaires et accompagnement continu pour garantir la pérennité des changements.',
            en: 'Implementation evaluation, necessary adjustments and ongoing support to ensure sustainability of changes.',
          },
          duration: { fr: '3-6 mois', en: '3-6 months' },
          icon: 'ri-line-chart-line',
        },
      ],
    },
    certifications: {
      title: {
        fr: 'Certifications et accréditations',
        en: 'Certifications and accreditations',
      },
      items: [
        {
          name: 'IFC Corporate Governance',
          icon: 'ri-shield-check-line',
          description: {
            fr: 'Méthodologie IFC de gouvernance d\'entreprise pour les marchés émergents',
            en: 'IFC corporate governance methodology for emerging markets',
          },
        },
        {
          name: 'BCEAO Compliance',
          icon: 'ri-bank-line',
          description: {
            fr: 'Expertise en conformité réglementaire BCEAO et COBAC',
            en: 'Expertise in BCEAO and COBAC regulatory compliance',
          },
        },
        {
          name: 'ISO 37001',
          icon: 'ri-file-shield-2-line',
          description: {
            fr: 'Système de management anti-corruption et éthique des affaires',
            en: 'Anti-corruption management system and business ethics',
          },
        },
      ],
    },
    faq: {
      title: {
        fr: 'Questions fréquentes',
        en: 'Frequently asked questions',
      },
      items: [
        {
          question: {
            fr: 'Combien de temps faut-il pour mettre en place un dispositif de gouvernance conforme ?',
            en: 'How long does it take to establish a compliant governance framework?',
          },
          answer: {
            fr: 'La durée varie selon la taille de votre organisation et l\'état actuel de votre gouvernance. En moyenne, comptez entre 4 et 8 mois pour une mise en conformité complète, incluant le diagnostic, la structuration, la formation et la mise en œuvre opérationnelle.',
            en: 'The duration varies depending on the size of your organization and the current state of your governance. On average, expect between 4 and 8 months for full compliance, including diagnostic, structuring, training and operational implementation.',
          },
        },
        {
          question: {
            fr: 'Quelles sont les principales exigences de la BCEAO en matière de gouvernance ?',
            en: 'What are the main BCEAO requirements regarding governance?',
          },
          answer: {
            fr: 'La BCEAO exige notamment : un Conseil d\'Administration fonctionnel avec au moins 3 réunions par an, des comités spécialisés (audit, risques, rémunération), une séparation claire des fonctions de direction et de contrôle, des politiques écrites de gestion des risques, et un dispositif de contrôle interne robuste.',
            en: 'BCEAO requires in particular: a functional Board of Directors with at least 3 meetings per year, specialized committees (audit, risk, remuneration), clear separation of management and control functions, written risk management policies, and a robust internal control system.',
          },
        },
        {
          question: {
            fr: 'Proposez-vous des formations certifiantes pour les administrateurs ?',
            en: 'Do you offer certified training for directors?',
          },
          answer: {
            fr: 'Oui, nous proposons des programmes de formation certifiants en partenariat avec des institutions reconnues. Ces formations couvrent les fondamentaux de la gouvernance, la gestion des risques, la conformité réglementaire et les responsabilités fiduciaires des administrateurs.',
            en: 'Yes, we offer certified training programs in partnership with recognized institutions. These trainings cover governance fundamentals, risk management, regulatory compliance and fiduciary responsibilities of directors.',
          },
        },
        {
          question: {
            fr: 'Comment assurez-vous la confidentialité des informations sensibles ?',
            en: 'How do you ensure confidentiality of sensitive information?',
          },
          answer: {
            fr: 'Nous signons systématiquement des accords de confidentialité stricts avant toute mission. Nos consultants sont soumis à des obligations déontologiques rigoureuses. Toutes les données sont traitées de manière sécurisée et ne sont jamais partagées avec des tiers.',
            en: 'We systematically sign strict confidentiality agreements before any assignment. Our consultants are subject to rigorous ethical obligations. All data is processed securely and never shared with third parties.',
          },
        },
      ],
    },
  },
  {
    id: 'financial-digital-inclusion',
    slug: 'inclusion-financiere-digitale',
    title: 'Inclusion Financière & Transformation Digitale',
    description: 'Stratégies d\'inclusion financière, transformation digitale des SFD et accompagnement à l\'agrément pour les établissements de monnaie électronique et les institutions de microfinance. Khepra Experts accompagne les acteurs financiers dans leurs procédures d\'agrément BCEAO et COBAC.',
    category: 'Financial Inclusion',
    hero: {
      title: {
        fr: 'Inclusion financière & Transformation digitale',
        en: 'Financial Inclusion & Digital Transformation',
      },
      subtitle: {
        fr: 'Démocratisez l\'accès aux services financiers',
        en: 'Democratize access to financial services',
      },
      description: {
        fr: 'Nous accompagnons les acteurs de la microfinance, les FinTech et les institutions financières dans le déploiement de solutions innovantes pour étendre l\'accès aux services financiers aux populations non bancarisées.',
        en: 'We support microfinance actors, FinTech and financial institutions in deploying innovative solutions to extend access to financial services to unbanked populations.',
      },
      image: 'https://readdy.ai/api/search-image?query=african%20woman%20using%20mobile%20banking%20app%20on%20smartphone%20in%20rural%20village%2C%20digital%20financial%20inclusion%20in%20West%20Africa%2C%20fintech%20innovation%2C%20young%20entrepreneur%20with%20mobile%20money%2C%20vibrant%20colors%2C%20authentic%20documentary%20photography%20showing%20financial%20technology%20empowerment&width=1200&height=600&seq=service-inclusion-hero&orientation=landscape',
      badge: { fr: 'Inclusion financière', en: 'Financial Inclusion' },
      icon: 'ri-smartphone-line',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    overview: {
      title: {
        fr: 'L\'inclusion financière, levier de développement économique',
        en: 'Financial inclusion, driver of economic development',
      },
      description: {
        fr: 'Plus de 60% de la population africaine reste exclue du système financier formel. Le digital offre des opportunités sans précédent pour combler ce fossé. Nous vous aidons à concevoir et déployer des stratégies d\'inclusion financière adaptées aux réalités locales, en combinant innovation technologique et compréhension des besoins des populations cibles.',
        en: 'More than 60% of the African population remains excluded from the formal financial system. Digital offers unprecedented opportunities to bridge this gap. We help you design and deploy financial inclusion strategies adapted to local realities, combining technological innovation and understanding of target populations\' needs.',
      },
      keyPoints: [
        { fr: 'Stratégies d\'inclusion financière', en: 'Financial inclusion strategies' },
        { fr: 'Transformation digitale des SFD', en: 'Digital transformation of MFIs' },
        { fr: 'Agrément pour établissements de monnaie électronique et institutions de microfinance', en: 'E-money institution and microfinance licensing' },
        { fr: 'Conception de produits innovants', en: 'Innovative product design' },
        { fr: 'Évaluation d\'impact social', en: 'Social impact assessment' },
      ],
    },
    challenges: {
      title: {
        fr: 'Les défis de l\'inclusion financière',
        en: 'Financial inclusion challenges',
      },
      description: {
        fr: 'Plus de 60% de la population africaine reste exclue du système financier formel, face à des obstacles multiples.',
        en: 'More than 60% of the African population remains excluded from the formal financial system, facing multiple obstacles.',
      },
      items: [
        {
          icon: 'ri-map-pin-line',
          title: { fr: 'Faible couverture géographique', en: 'Low geographic coverage' },
          description: {
            fr: 'Absence d\'infrastructures financières dans les zones rurales et périurbaines.',
            en: 'Lack of financial infrastructure in rural and peri-urban areas.',
          },
        },
        {
          icon: 'ri-smartphone-line',
          title: { fr: 'Retard de transformation digitale', en: 'Digital transformation lag' },
          description: {
            fr: 'Systèmes d\'information obsolètes, processus manuels et faible adoption du mobile banking.',
            en: 'Obsolete information systems, manual processes and low mobile banking adoption.',
          },
        },
        {
          icon: 'ri-file-shield-2-line',
          title: { fr: 'Complexité réglementaire', en: 'Regulatory complexity' },
          description: {
            fr: 'Processus d\'agrément BCEAO/COBAC complexe et exigeant pour les FinTech et EME.',
            en: 'Complex and demanding BCEAO/COBAC licensing process for FinTech and EMIs.',
          },
        },
        {
          icon: 'ri-user-heart-line',
          title: { fr: 'Produits inadaptés aux besoins', en: 'Products not adapted to needs' },
          description: {
            fr: 'Offres financières peu adaptées aux réalités et contraintes des populations non bancarisées.',
            en: 'Financial offerings poorly adapted to the realities and constraints of unbanked populations.',
          },
        },
      ],
    },
    solutions: {
      title: {
        fr: 'Notre approche de l\'inclusion financière',
        en: 'Our financial inclusion approach',
      },
      description: {
        fr: 'Une approche intégrée combinant expertise réglementaire, innovation technologique et connaissance des marchés locaux.',
        en: 'An integrated approach combining regulatory expertise, technological innovation and knowledge of local markets.',
      },
      items: [
        {
          icon: 'ri-compass-3-line',
          title: { fr: 'Stratégie d\'inclusion sur mesure', en: 'Tailored inclusion strategy' },
          description: {
            fr: 'Conception de stratégies nationales ou institutionnelles adaptées aux réalités locales.',
            en: 'Design of national or institutional strategies adapted to local realities.',
          },
        },
        {
          icon: 'ri-cloud-line',
          title: { fr: 'Transformation digitale accompagnée', en: 'Supported digital transformation' },
          description: {
            fr: 'Accompagnement complet dans la transition vers le digital : core banking, mobile banking, agent banking.',
            en: 'Complete support in the digital transition: core banking, mobile banking, agent banking.',
          },
        },
        {
          icon: 'ri-file-shield-2-line',
          title: { fr: 'Expertise réglementaire FinTech', en: 'FinTech regulatory expertise' },
          description: {
            fr: 'Maîtrise des exigences BCEAO/COBAC pour l\'obtention des agréments pour établissements de monnaie électronique et institutions de microfinance.',
            en: 'Mastery of BCEAO/COBAC requirements for obtaining e-money institution and microfinance licenses.',
          },
        },
        {
          icon: 'ri-lightbulb-line',
          title: { fr: 'Innovation produits financiers', en: 'Financial product innovation' },
          description: {
            fr: 'Design de produits financiers inclusifs adaptés aux besoins des populations non bancarisées.',
            en: 'Design of inclusive financial products adapted to the needs of unbanked populations.',
          },
        },
      ],
    },
    offerings: {
      title: {
        fr: 'Nos prestations en inclusion financière',
        en: 'Our financial inclusion services',
      },
      items: [
        {
          title: {
            fr: 'Stratégie d\'inclusion financière',
            en: 'Financial inclusion strategy',
          },
          description: {
            fr: 'Élaboration de stratégies nationales ou institutionnelles d\'inclusion financière alignées sur les objectifs de développement durable.',
            en: 'Development of national or institutional financial inclusion strategies aligned with sustainable development goals.',
          },
          icon: 'ri-compass-3-line',
          deliverables: [
            { fr: 'Diagnostic stratégique complet', en: 'Complete strategic diagnostic' },
            { fr: 'Stratégie nationale d\'inclusion financière (SNIF)', en: 'National Financial Inclusion Strategy (NFIS)' },
            { fr: 'Cadre de suivi-évaluation', en: 'Monitoring and evaluation framework' },
            { fr: 'Plan d\'action multi-acteurs', en: 'Multi-stakeholder action plan' },
          ],
        },
        {
          title: {
            fr: 'Transformation digitale des institutions',
            en: 'Digital transformation of institutions',
          },
          description: {
            fr: 'Accompagnement des SFD et banques dans leur transition vers le digital : core banking, mobile banking, agents banking.',
            en: 'Support for MFIs and banks in their digital transition: core banking, mobile banking, agent banking.',
          },
          icon: 'ri-cloud-line',
          deliverables: [
            { fr: 'Audit du système d\'information', en: 'Information system audit' },
            { fr: 'Cahier des charges fonctionnel', en: 'Functional specifications' },
            { fr: 'Accompagnement au choix de solutions', en: 'Solution selection support' },
            { fr: 'Plan de conduite du changement', en: 'Change management plan' },
          ],
        },
        {
          title: {
            fr: 'Agrément pour les établissements de monnaie électronique et institutions de microfinance',
            en: 'E-money institution and microfinance licensing',
          },
          description: {
            fr: 'Accompagnement complet dans l\'obtention des agréments BCEAO/COBAC pour les établissements de monnaie électronique et FinTech.',
            en: 'Complete support in obtaining BCEAO/COBAC licenses for e-money institutions and microfinance institutions.',
          },
          icon: 'ri-file-shield-2-line',
          deliverables: [
            { fr: 'Dossier d\'agrément complet', en: 'Complete licensing file' },
            { fr: 'Business plan réglementaire', en: 'Regulatory business plan' },
            { fr: 'Politiques KYC/AML', en: 'KYC/AML policies' },
            { fr: 'Accompagnement aux auditions', en: 'Hearing support' },
          ],
        },
        {
          title: {
            fr: 'Conception de produits financiers inclusifs',
            en: 'Inclusive financial product design',
          },
          description: {
            fr: 'Design de financial products and services adapted to the needs of unbanked populations : crédit agricole, épargne mobile, assurance inclusive.',
            en: 'Design of financial products and services adapted to the needs of unbanked populations: agricultural credit, mobile savings, inclusive insurance.',
          },
          icon: 'ri-lightbulb-line',
          deliverables: [
            { fr: 'Études de marché et segmentation', en: 'Market research and segmentation' },
            { fr: 'Prototypes de produits', en: 'Product prototypes' },
            { fr: 'Modèles de tarification', en: 'Pricing models' },
            { fr: 'Stratégie de distribution', en: 'Distribution strategy' },
          ],
        },
      ],
    },
    caseStudies: ['cs4', 'cs8'],
    testimonials: [
      {
        quote: {
          fr: 'Grâce à KHEPRA EXPERTS, nous avons obtenu notre agrément d\'établissement de monnaie électronique en 8 mois. Leur maîtrise des exigences réglementaires et leur accompagnement stratégique ont été essentiels à notre succès.',
          en: 'Thanks to KHEPRA EXPERTS, we obtained our e-money institution license in 8 months. Their mastery of regulatory requirements and strategic support were essential to our success.',
        },
        author: { fr: 'Ibrahim K.', en: 'Ibrahim K.' },
        role: { fr: 'CEO & Co-fondateur', en: 'CEO & Co-founder' },
        organization: { fr: 'FinTech mobile money', en: 'Mobile Money FinTech' },
      },
      {
        quote: {
          fr: 'L\'accompagnement de KHEPRA dans notre transformation digitale a été remarquable. Ils ont su comprendre nos contraintes opérationnelles et nous proposer des solutions pragmatiques et adaptées à notre contexte.',
          en: 'KHEPRA\'s support in our digital transformation was remarkable. They understood our operational constraints and proposed pragmatic solutions adapted to our context.',
        },
        author: { fr: 'Fatou D.', en: 'Fatou D.' },
        role: { fr: 'Directrice Générale', en: 'Chief Executive Officer' },
        organization: { fr: 'Réseau de SFD', en: 'MFI Network' },
      },
    ],
    process: {
      title: {
        fr: 'Notre processus d\'intervention',
        en: 'Our intervention process',
      },
      steps: [
        {
          number: 1,
          title: { fr: 'Diagnostic et étude de faisabilité', en: 'Diagnostic and feasibility study' },
          description: {
            fr: 'Analyse du contexte, des besoins des populations cibles, de l\'environnement concurrentiel et réglementaire. Évaluation de la faisabilité technique et financière.',
            en: 'Analysis of context, target populations\' needs, competitive and regulatory environment. Assessment of technical and financial feasibility.',
          },
          duration: { fr: '3-4 semaines', en: '3-4 weeks' },
          icon: 'ri-search-eye-line',
        },
        {
          number: 2,
          title: { fr: 'Conception stratégique', en: 'Strategic design' },
          description: {
            fr: 'Co-construction de la stratégie d\'inclusion financière ou du modèle de transformation digitale, incluant choix des technologies et partenaires.',
            en: 'Co-construction of financial inclusion strategy or digital transformation model, including technology and partner selection.',
          },
          duration: { fr: '2-3 semaines', en: '2-3 weeks' },
          icon: 'ri-pencil-ruler-2-line',
        },
        {
          number: 3,
          title: { fr: 'Mise en œuvre et déploiement', en: 'Implementation and deployment' },
          description: {
            fr: 'Accompagnement opérationnel dans le déploiement : agrément, intégration technique, formation des équipes, pilote et déploiement progressif.',
            en: 'Operational support in deployment: licensing, technical integration, team training, pilot and progressive rollout.',
          },
          duration: { fr: '6-12 mois', en: '6-12 months' },
          icon: 'ri-rocket-line',
        },
        {
          number: 4,
          title: { fr: 'Évaluation d\'impact', en: 'Impact assessment' },
          description: {
            fr: 'Mesure de l\'impact social et financier, ajustements du modèle et recommandations pour l\'extension à plus grande échelle.',
            en: 'Measurement of social and financial impact, model adjustments and recommendations for larger scale extension.',
          },
          duration: { fr: '3-6 mois', en: '3-6 months' },
          icon: 'ri-bar-chart-box-line',
        },
      ],
    },
    certifications: {
      title: {
        fr: 'Certifications et accréditations',
        en: 'Certifications and accreditations',
      },
      items: [
        {
          name: 'BCEAO / COBAC',
          icon: 'ri-bank-line',
          description: {
            fr: 'Expertise reconnue en réglementation BCEAO et COBAC pour les établissements de monnaie électronique',
            en: 'Recognized expertise in BCEAO and COBAC regulation for e-money institutions',
          },
        },
        {
          name: 'CGAP Certified',
          icon: 'ri-award-line',
          description: {
            fr: 'Méthodologies CGAP pour l\'inclusion financière et la microfinance',
            en: 'CGAP methodologies for financial inclusion and microfinance',
          },
        },
        {
          name: 'Digital Finance',
          icon: 'ri-smartphone-line',
          description: {
            fr: 'Expertise en finance digitale, mobile money et transformation des SFD',
            en: 'Expertise in digital finance, mobile money and MFI transformation',
          },
        },
      ],
    },
    faq: {
      title: {
        fr: 'Questions fréquentes',
        en: 'Frequently asked questions',
      },
      items: [
        {
          question: {
            fr: 'Quelles sont les conditions pour obtenir un agrément de monnaie électronique ?',
            en: 'What are the conditions to obtain an e-money license?',
          },
          answer: {
            fr: 'Les principales conditions incluent : un capital minimum (variable selon les pays UEMOA/CEMAC), une équipe dirigeante qualifiée, un business plan solide, des systèmes techniques sécurisés, des politiques KYC/AML conformes, et un réseau de distribution structuré. Le processus prend généralement 6 à 12 mois.',
            en: 'Main conditions include: minimum capital (varies by WAEMU/CEMAC country), qualified management team, solid business plan, secure technical systems, compliant KYC/AML policies, and structured distribution network. The process typically takes 6 to 12 months.',
          },
        },
        {
          question: {
            fr: 'Comment mesurer l\'impact social d\'un programme d\'inclusion financière ?',
            en: 'How to measure the social impact of a financial inclusion program?',
          },
          answer: {
            fr: 'Nous utilisons des méthodologies mixtes combinant données quantitatives (revenus, épargne, accès aux services) et qualitatives (enquêtes, focus groups). Les indicateurs clés incluent : taux de pénétration, fréquence d\'utilisation, évolution des revenus, autonomisation des femmes, et résilience économique des ménages.',
            en: 'We use mixed methodologies combining quantitative data (income, savings, service access) and qualitative (surveys, focus groups). Key indicators include: penetration rate, usage frequency, income evolution, women\'s empowerment, and household economic resilience.',
          },
        },
        {
          question: {
            fr: 'Quelles technologies recommandez-vous pour la transformation digitale des SFD ?',
            en: 'What technologies do you recommend for MFI digital transformation?',
          },
          answer: {
            fr: 'Nous recommandons des solutions adaptées au contexte : core banking cloud pour la flexibilité, applications mobile-first pour l\'accessibilité, API banking pour l\'interopérabilité, et solutions d\'agent banking pour la capillarité. Le choix dépend de votre taille, budget et stratégie.',
            en: 'We recommend context-appropriate solutions: cloud core banking for flexibility, mobile-first applications for accessibility, API banking for interoperability, and agent banking solutions for capillarity. The choice depends on your size, budget and strategy.',
          },
        },
        {
          question: {
            fr: 'Accompagnez-vous les projets d\'inclusion financière financés par des bailleurs internationaux ?',
            en: 'Do you support financial inclusion projects funded by international donors?',
          },
          answer: {
            fr: 'Oui, nous avons une expérience significative avec les bailleurs internationaux (Banque Mondiale, AFD, UE, fondations). Nous maîtrisons leurs procédures, formats de reporting et exigences en matière d\'évaluation d\'impact. Nous pouvons intervenir comme consultant principal ou sous-traitant.',
            en: 'Yes, we have significant experience with international donors (World Bank, AFD, EU, foundations). We master their procedures, reporting formats and impact assessment requirements. We can intervene as lead consultant or subcontractor.',
          },
        },
      ],
    },
  },
  {
    id: 'enterprise-risk-management',
    slug: 'gestion-risques-entreprise',
    title: 'Gestion des Risques d\'Entreprise',
    description: 'Cartographie des risques, gestion du risque de crédit, conformité réglementaire et stress tests pour protéger la performance et assurer la pérennité de votre organisation. Khepra Experts est un cabinet de conseil de réputation internationale, spécialisé dans la gestion des risques prudentiels en Afrique francophone.',
    category: 'Risk Management',
    hero: {
      title: {
        fr: 'Gestion des risques d\'entreprise',
        en: 'Enterprise Risk Management',
      },
      subtitle: {
        fr: 'Anticipez et maîtrisez vos risques stratégiques',
        en: 'Anticipate and control your strategic risks',
      },
      description: {
        fr: 'Nous aidons les organisations à identifier, évaluer et gérer l\'ensemble de leurs risques (crédit, opérationnel, marché, conformité) pour protéger leur performance et assurer leur pérennité.',
        en: 'We help organizations identify, assess and manage all their risks (credit, operational, market, compliance) to protect their performance and ensure their sustainability.',
      },
      image: 'https://readdy.ai/api/search-image?query=professional%20risk%20management%20dashboard%20on%20computer%20screens%2C%20african%20business%20analysts%20reviewing%20financial%20data%20and%20risk%20metrics%2C%20modern%20office%20with%20data%20visualization%2C%20strategic%20planning%20atmosphere%2C%20professional%20corporate%20photography%20showing%20risk%20analysis%20and%20control&width=1200&height=600&seq=service-risk-hero&orientation=landscape',
      badge: { fr: 'Gestion des risques', en: 'Risk Management' },
      icon: 'ri-shield-star-line',
      color: 'text-orange-700',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    },
    overview: {
      title: {
        fr: 'Une gestion des risques proactive pour une croissance maîtrisée',
        en: 'Proactive risk management for controlled growth',
      },
      description: {
        fr: 'Dans un environnement économique incertain et un contexte réglementaire exigeant (Bâle II/III, normes IFRS 9), une gestion rigoureuse des risques est indispensable. Nous vous accompagnons dans la mise en place de dispositifs de gestion des risques robustes, adaptés à votre secteur d\'activité et à votre appétit au risque.',
        en: 'In an uncertain economic environment and demanding regulatory context (Basel II/III, IFRS 9 standards), rigorous risk management is essential. We help you establish robust risk management systems, adapted to your sector and risk appetite.',
      },
      keyPoints: [
        { fr: 'Cartographie et évaluation des risques', en: 'Risk mapping and assessment' },
        { fr: 'Gestion du risque de crédit', en: 'Credit risk management' },
        { fr: 'Risques opérationnels et conformité', en: 'Operational and compliance risks' },
        { fr: 'Stress tests et scénarios', en: 'Stress tests and scenarios' },
        { fr: 'Dispositif de contrôle interne', en: 'Internal control system' },
      ],
    },
    offerings: {
      title: {
        fr: 'Nos prestations en gestion des risques',
        en: 'Our risk management services',
      },
      items: [
        {
          title: {
            fr: 'Cartographie et évaluation des risques',
            en: 'Risk mapping and assessment',
          },
          description: {
            fr: 'Identification exhaustive et évaluation de l\'ensemble des risques auxquels votre organisation est exposée, avec priorisation selon leur criticité.',
            en: 'Comprehensive identification and assessment of all risks your organization is exposed to, with prioritization according to their criticality.',
          },
          icon: 'ri-map-pin-line',
          deliverables: [
            { fr: 'Cartographie complète des risques', en: 'Complete risk mapping' },
            { fr: 'Matrice de criticité', en: 'Criticality matrix' },
            { fr: 'Profil de risque de l\'organisation', en: 'Organization risk profile' },
            { fr: 'Recommandations de mitigation', en: 'Mitigation recommendations' },
          ],
        },
        {
          title: {
            fr: 'Gestion du risque de crédit',
            en: 'Credit risk management',
          },
          description: {
            fr: 'Structuration de votre dispositif de gestion du risque de crédit : politiques, processus d\'octroi, scoring, provisionnement, recouvrement.',
            en: 'Structuring of your credit risk management system: policies, lending processes, scoring, provisioning, recovery.',
          },
          icon: 'ri-money-dollar-circle-line',
          deliverables: [
            { fr: 'Politique de crédit', en: 'Credit policy' },
            { fr: 'Modèles de scoring', en: 'Scoring models' },
            { fr: 'Procédures d\'analyse crédit', en: 'Credit analysis procedures' },
            { fr: 'Système de provisionnement IFRS 9', en: 'IFRS 9 provisioning system' },
          ],
        },
        {
          title: {
            fr: 'Risques opérationnels et conformité',
            en: 'Operational and compliance risks',
          },
          description: {
            fr: 'Mise en place de dispositifs de gestion des risques opérationnels, de fraude, de cybersécurité et de non-conformité réglementaire.',
            en: 'Implementation of operational risk, fraud, cybersecurity and regulatory non-compliance management systems.',
          },
          icon: 'ri-shield-check-line',
          deliverables: [
            { fr: 'Cartographie des risques opérationnels', en: 'Operational risk mapping' },
            { fr: 'Plan de continuité d\'activité (PCA)', en: 'Business Continuity Plan (BCP)' },
            { fr: 'Politique de cybersécurité', en: 'Cybersecurity policy' },
            { fr: 'Programme de conformité', en: 'Compliance program' },
          ],
        },
        {
          title: {
            fr: 'Stress tests et simulations',
            en: 'Stress tests and simulations',
          },
          description: {
            fr: 'Réalisation de stress tests et simulations de scénarios de crise pour évaluer la résilience de votre organisation face à des chocs adverses.',
            en: 'Conducting stress tests and crisis scenario simulations to assess your organization\'s resilience to adverse shocks.',
          },
          icon: 'ri-pulse-line',
          deliverables: [
            { fr: 'Scénarios de stress macroéconomiques', en: 'Macroeconomic stress scenarios' },
            { fr: 'Tests de sensibilité du portefeuille', en: 'Portfolio sensitivity tests' },
            { fr: 'Évaluation de l\'adéquation des fonds propres', en: 'Capital adequacy assessment' },
            { fr: 'Plans d\'action correctifs', en: 'Corrective action plans' },
          ],
        },
      ],
    },
    caseStudies: ['cs2', 'cs5'],
    testimonials: [
      {
        quote: {
          fr: 'KHEPRA EXPERTS a transformé notre approche de la gestion des risques. Leur méthodologie rigoureuse et leur accompagnement pratique nous ont permis de réduire notre taux de défaut de 35% en un an.',
          en: 'KHEPRA EXPERTS transformed our approach to risk management. Their rigorous methodology and practical support enabled us to reduce our default rate by 35% in one year.',
        },
        author: { fr: 'Moussa T.', en: 'Moussa T.' },
        role: { fr: 'Directeur des Risques', en: 'Chief Risk Officer' },
        organization: { fr: 'Institution financière de développement', en: 'Development Finance Institution' },
      },
      {
        quote: {
          fr: 'L\'accompagnement de KHEPRA dans la structuration de notre portefeuille agricole a été déterminant. Leur expertise sectorielle et leur knowledge des risques spécifiques à l\'agrobusiness nous ont permis de financer plus de 2 500 PME en toute sécurité.',
          en: 'KHEPRA\'s support in structuring our agricultural portfolio was decisive. Their sector expertise and knowledge of agribusiness-specific risks enabled us to safely finance over 2,500 SMEs.',
        },
        author: { fr: 'Aïssatou B.', en: 'Aïssatou B.' },
        role: { fr: 'Directrice du Crédit', en: 'Credit Director' },
        organization: { fr: 'Banque agricole', en: 'Agricultural Bank' },
      },
    ],
    process: {
      title: {
        fr: 'Notre processus d\'intervention',
        en: 'Our intervention process',
      },
      steps: [
        {
          number: 1,
          title: { fr: 'Diagnostic des risques', en: 'Risk diagnostic' },
          description: {
            fr: 'Analyse approfondie de votre exposition aux différents types de risques, évaluation de votre dispositif actuel de gestion des risques et identification des vulnérabilités.',
            en: 'In-depth analysis of your exposure to different types of risks, assessment of your current risk management system and identification of vulnerabilities.',
          },
          duration: { fr: '3-4 semaines', en: '3-4 weeks' },
          icon: 'ri-radar-line',
        },
        {
          number: 2,
          title: { fr: 'Conception du dispositif', en: 'System design' },
          description: {
            fr: 'Élaboration d\'un cadre de gestion des risques adapté à votre organisation : gouvernance, politiques, processus, outils et indicateurs de suivi.',
            en: 'Development of a risk management framework adapted to your organization: governance, policies, processes, tools and monitoring indicators.',
          },
          duration: { fr: '2-3 semaines', en: '2-3 weeks' },
          icon: 'ri-draft-line',
        },
        {
          number: 3,
          title: { fr: 'Déploiement opérationnel', en: 'Operational deployment' },
          description: {
            fr: 'Mise en œuvre du dispositif de gestion des risques, formation des équipes, paramétrage des outils et accompagnement dans les premières applications.',
            en: 'Implementation of risk management system, team training, tool configuration and support in first applications.',
          },
          duration: { fr: '4-6 mois', en: '4-6 months' },
          icon: 'ri-settings-3-line',
        },
        {
          number: 4,
          title: { fr: 'Monitoring et amélioration continue', en: 'Monitoring and continuous improvement' },
          description: {
            fr: 'Suivi de la performance du dispositif, réalisation de stress tests périodiques, ajustements et renforcement continu de la culture risque.',
            en: 'Performance monitoring of the system, periodic stress tests, adjustments and continuous strengthening of risk culture.',
          },
          duration: { fr: '6-12 mois', en: '6-12 months' },
          icon: 'ri-refresh-line',
        },
      ],
    },
    certifications: {
      title: {
        fr: 'Certifications et accréditations',
        en: 'Certifications and accreditations',
      },
      items: [
        {
          name: 'FRM',
          icon: 'ri-shield-star-line',
          description: {
            fr: 'Financial Risk Manager — certification internationale en gestion des risques financiers',
            en: 'Financial Risk Manager — international certification in financial risk management',
          },
        },
        {
          name: 'Bâle II/III',
          icon: 'ri-bank-line',
          description: {
            fr: 'Expertise en conformité aux normes prudentielles Bâle II et Bâle III',
            en: 'Expertise in compliance with Basel II and Basel III prudential standards',
          },
        },
        {
          name: 'IFRS 9',
          icon: 'ri-file-shield-2-line',
          description: {
            fr: 'Maîtrise des normes IFRS 9 pour le provisionnement et la gestion du risque de crédit',
            en: 'Mastery of IFRS 9 standards for provisioning and credit risk management',
          },
        },
      ],
    },
    faq: {
      title: {
        fr: 'Questions fréquentes',
        en: 'Frequently asked questions',
      },
      items: [
        {
          question: {
            fr: 'Quelle est la différence entre risque de crédit et risque opérationnel ?',
            en: 'What is the difference between credit risk and operational risk?',
          },
          answer: {
            fr: 'Le risque de crédit est le risque de perte financière liée au défaut d\'un emprunteur. Le risque opérationnel concerne les pertes résultant de processus internes inadéquats, d\'erreurs humaines, de systèmes défaillants ou d\'événements externes (fraude, catastrophes). Les deux nécessitent des approches de gestion distinctes.',
            en: 'Credit risk is the risk of financial loss due to borrower default. Operational risk concerns losses resulting from inadequate internal processes, human errors, failing systems or external events (fraud, disasters). Both require distinct management approaches.',
          },
        },
        {
          question: {
            fr: 'Comment définir l\'appétit au risque de mon organisation ?',
            en: 'How to define my organization\'s risk appetite?',
          },
          answer: {
            fr: 'L\'appétit au risque se définit en fonction de votre stratégie, de vos fonds propres, de votre secteur d\'activité et de vos objectifs de croissance. Nous vous accompagnons dans cette réflexion stratégique en impliquant votre Conseil d\'Administration et votre direction générale pour définir des limites de risque cohérentes.',
            en: 'Risk appetite is defined based on your strategy, capital, business sector and growth objectives. We support you in this strategic reflection by involving your Board of Directors and executive management to define consistent risk limits.',
          },
        },
        {
          question: {
            fr: 'Quels sont les principaux indicateurs de risque à suivre ?',
            en: 'What are the main risk indicators to monitor?',
          },
          answer: {
            fr: 'Les indicateurs clés varient selon votre activité, mais incluent généralement : taux de créances en souffrance (PAR), taux de provisionnement, ratio de solvabilité, concentration du portefeuille, incidents opérationnels, et indicateurs de conformité. Nous vous aidons à définir un tableau de bord adapté à vos besoins.',
            en: 'Key indicators vary by activity, but generally include: portfolio at risk (PAR), provisioning rate, solvency ratio, portfolio concentration, operational incidents, and compliance indicators. We help you define a dashboard adapted to your needs.',
          },
        },
        {
          question: {
            fr: 'Comment se préparer aux exigences de Bâle II/III ?',
            en: 'How to prepare for Basel II/III requirements?',
          },
          answer: {
            fr: 'La préparation à Bâle II/III nécessite : une gouvernance renforcée, des systèmes d\'information robustes, des modèles de calcul des risques pondérés, un dispositif de stress testing, et des processus de reporting structurés. Nous vous accompagnons dans cette transition complexe sur 12 à 18 mois.',
            en: 'Preparing for Basel II/III requirements requires: strengthened governance, robust information systems, risk-weighted asset calculation models, stress testing framework, and structured reporting processes. We support you in this complex transition over 12 to 18 months.',
          },
        },
      ],
    },
  },
];

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'cs1',
    title: { fr: 'Mise en conformité BCEAO', en: 'BCEAO Compliance Implementation' },
    client: { fr: 'Réseau de microfinance', en: 'Microfinance Network' },
    challenge: {
      fr: 'Non-conformité aux directives BCEAO avec risque de sanctions',
      en: 'Non-compliance with BCEAO directives with risk of sanctions',
    },
    solution: {
      fr: 'Audit complet, restructuration de la gouvernance, formation des équipes',
      en: 'Complete audit, governance restructuring, team training',
    },
    results: [
      { fr: 'Conformité atteinte en 6 mois', en: 'Compliance achieved in 6 months' },
      { fr: '100% des recommandations mises en œuvre', en: '100% of recommendations implemented' },
      { fr: 'Agrément renouvelé sans réserve', en: 'License renewed without reservation' },
    ],
  },
  {
    id: 'cs2',
    title: { fr: 'Gestion du risque de crédit agricole', en: 'Agricultural Credit Risk Management' },
    client: { fr: 'Banque de développement', en: 'Development Bank' },
    challenge: {
      fr: 'Taux de défaut élevé sur le portefeuille agricole (12%)',
      en: 'High default rate on agricultural portfolio (12%)',
    },
    solution: {
      fr: 'Modèle de scoring adapté, formation des agents, suivi renforcé',
      en: 'Adapted scoring model, agent training, enhanced monitoring',
    },
    results: [
      { fr: 'Réduction du PAR à 4,2%', en: 'PAR reduction to 4.2%' },
      { fr: '2 500 PME agricoles financées', en: '2,500 agricultural SMEs financed' },
      { fr: 'Portefeuille multiplié par 3', en: 'Portfolio multiplied by 3' },
    ],
  },
  {
    id: 'cs3',
    title: { fr: "Structuration de conseil d'administration", en: 'Board of Directors Structuring' },
    client: { fr: 'Institution financière régionale', en: 'Regional Financial Institution' },
    challenge: {
      fr: "Conseil d'administration peu fonctionnel, gouvernance faible",
      en: 'Poorly functional board of directors, weak governance',
    },
    solution: {
      fr: 'Refonte complète : charte, règlements, formation des administrateurs',
      en: 'Complete overhaul: charter, regulations, director training',
    },
    results: [
      { fr: '4 comités spécialisés créés', en: '4 specialized committees created' },
      { fr: '12 réunions/an vs 2 auparavant', en: '12 meetings/year vs 2 previously' },
      { fr: 'Notation gouvernance améliorée', en: 'Improved governance rating' },
    ],
  },
  {
    id: 'cs4',
    title: { fr: 'Agrément FinTech monnaie électronique', en: 'E-Money FinTech Licensing' },
    client: { fr: 'Startup FinTech', en: 'FinTech Startup' },
    challenge: {
      fr: "Obtenir l'agrément BCEAO pour lancer un service de mobile money",
      en: 'Obtain BCEAO license to launch a mobile money service',
    },
    solution: {
      fr: 'Dossier complet, business plan, politiques KYC/AML, accompagnement auditions',
      en: 'Complete file, business plan, KYC/AML policies, hearing support',
    },
    results: [
      { fr: 'Agrément obtenu en 8 mois', en: 'License obtained in 8 months' },
      { fr: '50 000 utilisateurs en 6 mois', en: '50,000 users in 6 months' },
      { fr: 'Levée de fonds de 1,5M€', en: '€1.5M fundraising' },
    ],
    consortium: {
      partner: 'Meba K. Consulting',
      partnerUrl: 'https://mebakconsulting.com/public/about',
      role: {
        fr: 'Pilotage réglementaire, constitution du dossier BCEAO et accompagnement aux auditions',
        en: 'Regulatory management, BCEAO file preparation and hearing support',
      },
      partnerRole: {
        fr: 'Analyse stratégique FinTech, modélisation du risque digital et positionnement concurrentiel',
        en: 'FinTech strategic analysis, digital risk modelling and competitive positioning',
      },
    },
  },
  {
    id: 'cs5',
    title: { fr: 'Levée de fonds série A', en: 'Series A Fundraising' },
    client: { fr: 'Groupe agroalimentaire', en: 'Agribusiness Group' },
    challenge: {
      fr: 'Besoin de 2,5 milliards FCFA pour expansion régionale',
      en: 'Need for 2.5 billion FCFA for regional expansion',
    },
    solution: {
      fr: 'Structuration financière, pitch deck, identification investisseurs, négociation',
      en: 'Financial structuring, pitch deck, investor identification, negotiation',
    },
    results: [
      { fr: '2,5 milliards FCFA levés', en: '2.5 billion FCFA raised' },
      { fr: 'Closing en 4 mois', en: 'Closing in 4 months' },
      { fr: 'Expansion dans 3 pays', en: 'Expansion in 3 countries' },
    ],
    consortium: {
      partner: 'Meba K. Consulting',
      partnerUrl: 'https://mebakconsulting.com/public/about',
      role: {
        fr: 'Conseil stratégique, business plan et structuration du modèle économique',
        en: 'Strategic advisory, business plan and business model structuring',
      },
      partnerRole: {
        fr: 'Stratégie de finance digitale, analyse des risques technologiques et recommandations FinTech',
        en: 'Digital finance strategy, Big Tech risk analysis and FinTech recommendations',
      },
    },
  },
  {
    id: 'cs6',
    title: { fr: 'Stratégie de croissance AgriTech', en: 'AgriTech Growth Strategy' },
    client: { fr: 'Startup AgriTech', en: 'AgriTech Startup' },
    challenge: {
      fr: "Modèle économique à structurer, expansion régionale à préparer",
      en: 'Business model to structure, regional expansion to prepare',
    },
    solution: {
      fr: "Business plan 5 ans, études de marché, stratégie d'entrée pays",
      en: '5-year business plan, market studies, country entry strategy',
    },
    results: [
      { fr: 'Présence dans 5 pays UEMOA', en: 'Presence in 5 WAEMU countries' },
      { fr: '10 000 agriculteurs connectés', en: '10,000 connected farmers' },
      { fr: 'Rentabilité atteinte en 18 mois', en: 'Profitability achieved in 18 months' },
    ],
    consortium: {
      partner: 'Meba K. Consulting',
      partnerUrl: 'https://mebakconsulting.com/public/about',
      role: {
        fr: 'Conseil stratégique, business plan et structuration du modèle économique',
        en: 'Strategic advisory, business plan and business model structuring',
      },
      partnerRole: {
        fr: 'Stratégie de finance digitale, analyse des risques technologiques et recommandations FinTech',
        en: 'Digital finance strategy, Big Tech risk analysis and FinTech recommendations',
      },
    },
  },
  {
    id: 'cs8',
    title: { fr: 'Transformation digitale SFD', en: 'MFI Digital Transformation' },
    client: { fr: 'Réseau de SFD', en: 'MFI Network' },
    challenge: {
      fr: "Système d'information obsolète, processus manuels, faible productivité",
      en: 'Obsolete information system, manual processes, low productivity',
    },
    solution: {
      fr: 'Sélection core banking cloud, déploiement mobile banking, formation',
      en: 'Cloud core banking selection, mobile banking deployment, training',
    },
    results: [
      { fr: '80% des transactions digitalisées', en: '80% of transactions digitalized' },
      { fr: 'Coûts opérationnels -35%', en: 'Operating costs -35%' },
      { fr: '25 000 nouveaux clients', en: '25,000 new clients' },
    ],
    consortium: {
      partner: 'Meba K. Consulting',
      partnerUrl: 'https://mebakconsulting.com/public/about',
      role: {
        fr: 'Pilotage de la transformation digitale, sélection des solutions et conduite du changement',
        en: 'Digital transformation management, solution selection and change management',
      },
      partnerRole: {
        fr: 'Expertise finance digitale, évaluation des risques technologiques et stratégie FinTech',
        en: 'Digital finance expertise, technology risk assessment and FinTech strategy',
      },
    },
  },
];

export function getServiceById(id: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.id === id);
}

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}



