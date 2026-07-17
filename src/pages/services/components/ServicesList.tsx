import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const services = [
  {
    id: 'corporate-governance',
    icon: 'ri-government-line',
    tag: '01',
    title: {
      fr: 'Gouvernance d\'entreprise & Conformité',
      en: 'Corporate Governance & Compliance',
    },
    tagline: {
      fr: 'Structurez pour gouverner avec excellence',
      en: 'Structure to govern with excellence',
    },
    problem: {
      title: {
        fr: 'Le défi stratégique',
        en: 'The strategic challenge',
      },
      description: {
        fr: 'Votre organisation fait face à des exigences réglementaires croissantes, des risques de sanctions, et une gouvernance qui freine votre croissance au lieu de la soutenir.',
        en: 'Your organization faces increasing regulatory requirements, risk of sanctions, and governance that hinders your growth instead of supporting it.',
      },
      points: [
        {
          fr: 'Non-conformité aux directives BCEAO/COBAC',
          en: 'Non-compliance with BCEAO/COBAC directives',
        },
        {
          fr: 'Conseil d\'Administration peu fonctionnel',
          en: 'Poorly functional Board of Directors',
        },
        {
          fr: 'Absence de politiques internes structurées',
          en: 'Lack of structured internal policies',
        },
        {
          fr: 'Risques de sanctions réglementaires',
          en: 'Risk of regulatory sanctions',
        },
      ],
    },
    risks: {
      title: {
        fr: 'Les risques de l\'inaction',
        en: 'The risks of inaction',
      },
      items: [
        {
          icon: 'ri-alert-line',
          text: {
            fr: 'Sanctions financières et retrait d\'agrément',
            en: 'Financial sanctions and license withdrawal',
          },
          severity: 'critical',
        },
        {
          icon: 'ri-funds-line',
          text: {
            fr: 'Perte de confiance des investisseurs et partenaires',
            en: 'Loss of investor and partner confidence',
          },
          severity: 'high',
        },
        {
          icon: 'ri-team-line',
          text: {
            fr: 'Conflits internes et paralysie décisionnelle',
            en: 'Internal conflicts and decision-making paralysis',
          },
          severity: 'high',
        },
        {
          icon: 'ri-line-chart-line',
          text: {
            fr: 'Frein à la croissance et opportunités manquées',
            en: 'Growth hindrance and missed opportunities',
          },
          severity: 'medium',
        },
      ],
    },
    approach: {
      title: {
        fr: 'L\'approche KHEPRA EXPERTS',
        en: 'The KHEPRA EXPERTS approach',
      },
      description: {
        fr: 'Une méthodologie éprouvée qui transforme votre gouvernance en avantage compétitif.',
        en: 'A proven methodology that transforms your governance into a competitive advantage.',
      },
      steps: [
        {
          icon: 'ri-search-line',
          title: { fr: 'Diagnostic 360°', en: '360° Diagnostic' },
          desc: {
            fr: 'Audit complet de votre dispositif actuel',
            en: 'Complete audit of your current system',
          },
        },
        {
          icon: 'ri-draft-line',
          title: { fr: 'Conception sur mesure', en: 'Custom design' },
          desc: {
            fr: 'Framework adapté à votre contexte',
            en: 'Framework adapted to your context',
          },
        },
        {
          icon: 'ri-tools-line',
          title: { fr: 'Mise en œuvre', en: 'Implementation' },
          desc: {
            fr: 'Accompagnement opérationnel terrain',
            en: 'Operational field support',
          },
        },
        {
          icon: 'ri-shield-check-line',
          title: { fr: 'Conformité garantie', en: 'Guaranteed compliance' },
          desc: {
            fr: 'Validation réglementaire complète',
            en: 'Complete regulatory validation',
          },
        },
      ],
    },
    results: {
      title: {
        fr: 'Résultats obtenus pour nos clients',
        en: 'Results achieved for our clients',
      },
      metrics: [
        {
          value: '6 mois',
          label: {
            fr: 'Délai moyen de mise en conformité',
            en: 'Average compliance timeline',
          },
        },
        {
          value: '100%',
          label: {
            fr: 'Taux de réussite aux audits BCEAO',
            en: 'BCEAO audit success rate',
          },
        },
        {
          value: '15+',
          label: {
            fr: 'Institutions accompagnées',
            en: 'Institutions supported',
          },
        },
      ],
      testimonial: {
        quote: {
          fr: 'KHEPRA EXPERTS nous a permis d\'atteindre la conformité BCEAO en 6 mois. Leur expertise a été déterminante.',
          en: 'KHEPRA EXPERTS enabled us to achieve BCEAO compliance in 6 months. Their expertise was decisive.',
        },
        author: {
          fr: 'Marie-Claire A., DG Banque régionale',
          en: 'Marie-Claire A., CEO Regional Bank',
        },
      },
    },
    description: {
      fr: 'Une gouvernance solide est le fondement de toute organisation performante et durable. Nous concevons des frameworks de gouvernance sur mesure, renforçons les institutions et accompagnons les organes décisionnels dans leur structuration et leur alignement stratégique — pour une conformité réglementaire irréprochable et une performance organisationnelle optimale.',
      en: 'Strong governance is the foundation of any high-performing and sustainable organization. We design custom governance frameworks, strengthen institutions and support decision-making bodies in their structuring and strategic alignment — for impeccable regulatory compliance and optimal organizational performance.',
    },
    items: [
      {
        icon: 'ri-settings-4-line',
        label: {
          fr: 'Mise en place de frameworks de gouvernance et renforcement institutionnel',
          en: 'Implementation of governance frameworks and institutional strengthening',
        },
      },
      {
        icon: 'ri-file-shield-2-line',
        label: {
          fr: 'Élaboration de politiques internes, chartes, compliance & contrôle interne',
          en: 'Development of internal policies, charters, compliance & internal control',
        },
      },
      {
        icon: 'ri-building-4-line',
        label: {
          fr: 'Structuration des organes décisionnels (Board, Comités, Direction)',
          en: 'Structuring of decision-making bodies (Board, Committees, Management)',
        },
      },
      {
        icon: 'ri-focus-3-line',
        label: {
          fr: 'Alignement stratégique, conformité réglementaire & performance organisationnelle',
          en: 'Strategic alignment, regulatory compliance & organizational performance',
        },
      },
    ],
    cta: {
      fr: 'Renforcer ma gouvernance',
      en: 'Strengthen my governance',
    },
    image:
      'https://readdy.ai/api/search-image?query=corporate%20governance%20boardroom%20meeting%20with%20diverse%20african%20executives%20reviewing%20governance%20framework%20documents%20elegant%20conference%20room%20with%20large%20windows%20overlooking%20city%20skyline%20polished%20wooden%20table%20with%20laptops%20and%20printed%20charters%20formal%20professional%20atmosphere%20with%20warm%20golden%20lighting%20high-end%20business%20photography%20conveying%20institutional%20excellence%20and%20strategic%20leadership&width=700&height=500&seq=corporate-governance-khepera-2025&orientation=landscape',
    color: 'from-brand-900 to-brand-950',
  },
  {
    id: 'financial-digital-inclusion',
    icon: 'ri-bank-line',
    tag: '02',
    title: {
      fr: 'Inclusion financière & Transformation digitale',
      en: 'Financial & Digital Inclusion',
    },
    tagline: {
      fr: 'Démocratisez l\'accès aux services financiers',
      en: 'Democratize access to financial services',
    },
    problem: {
      title: {
        fr: 'Le défi stratégique',
        en: 'The strategic challenge',
      },
      description: {
        fr: 'Plus de 60% de votre marché potentiel reste exclu du système financier formel. Vos concurrents digitaux gagnent du terrain pendant que vos processus restent manuels.',
        en: 'More than 60% of your potential market remains excluded from the formal financial system. Your digital competitors are gaining ground while your processes remain manual.',
      },
      points: [
        {
          fr: 'Populations non bancarisées hors de portée',
          en: 'Unbanked populations out of reach',
        },
        {
          fr: 'Transformation digitale complexe et coûteuse',
          en: 'Complex and costly digital transformation',
        },
        {
          fr: 'Agrément FinTech difficile à obtenir',
          en: 'FinTech licensing difficult to obtain',
        },
        {
          fr: 'Modèle économique inadapté au digital',
          en: 'Business model unsuited to digital',
        },
      ],
    },
    risks: {
      title: {
        fr: 'Les risques de l\'inaction',
        en: 'The risks of inaction',
      },
      items: [
        {
          icon: 'ri-smartphone-line',
          text: {
            fr: 'Disruption par les FinTech et néo-banques',
            en: 'Disruption by FinTech and neo-banks',
          },
          severity: 'critical',
        },
        {
          icon: 'ri-user-unfollow-line',
          text: {
            fr: 'Perte de parts de marché irréversible',
            en: 'Irreversible market share loss',
          },
          severity: 'critical',
        },
        {
          icon: 'ri-money-dollar-circle-line',
          text: {
            fr: 'Coûts opérationnels non compétitifs',
            en: 'Non-competitive operating costs',
          },
          severity: 'high',
        },
        {
          icon: 'ri-global-line',
          text: {
            fr: 'Impossibilité de scaler régionalement',
            en: 'Inability to scale regionally',
          },
          severity: 'medium',
        },
      ],
    },
    approach: {
      title: {
        fr: 'L\'approche KHEPRA EXPERTS',
        en: 'The KHEPRA EXPERTS approach',
      },
      description: {
        fr: 'De la stratégie d\'inclusion à l\'agrément FinTech, nous vous accompagnons dans votre transformation.',
        en: 'From inclusion strategy to FinTech licensing, we support you in your transformation.',
      },
      steps: [
        {
          icon: 'ri-compass-3-line',
          title: { fr: 'Stratégie d\'inclusion', en: 'Inclusion strategy' },
          desc: {
            fr: 'Diagnostic et roadmap digitale',
            en: 'Diagnostic and digital roadmap',
          },
        },
        {
          icon: 'ri-file-shield-2-line',
          title: { fr: 'Agrément BCEAO', en: 'BCEAO licensing' },
          desc: {
            fr: 'Dossier complet et accompagnement',
            en: 'Complete file and support',
          },
        },
        {
          icon: 'ri-smartphone-line',
          title: { fr: 'Solutions tech', en: 'Tech solutions' },
          desc: {
            fr: 'Sélection et déploiement',
            en: 'Selection and deployment',
          },
        },
        {
          icon: 'ri-line-chart-line',
          title: { fr: 'Scale-up', en: 'Scale-up' },
          desc: {
            fr: 'Expansion et optimisation',
            en: 'Expansion and optimization',
          },
        },
      ],
    },
    results: {
      title: {
        fr: 'Résultats obtenus pour nos clients',
        en: 'Results achieved for our clients',
      },
      metrics: [
        {
          value: '8 mois',
          label: {
            fr: 'Délai moyen d\'obtention agrément',
            en: 'Average licensing timeline',
          },
        },
        {
          value: '80%',
          label: {
            fr: 'Réduction coûts opérationnels',
            en: 'Operating cost reduction',
          },
        },
        {
          value: '50K+',
          label: {
            fr: 'Nouveaux clients digitaux',
            en: 'New digital clients',
          },
        },
      ],
      testimonial: {
        quote: {
          fr: 'Grâce à KHEPRA EXPERTS, nous avons obtenu notre agrément e-money en 8 mois et lancé notre service avec succès.',
          en: 'Thanks to KHEPRA EXPERTS, we obtained our e-money license in 8 months and successfully launched our service.',
        },
        author: {
          fr: 'Ibrahim K., CEO FinTech mobile money',
          en: 'Ibrahim K., CEO Mobile Money FinTech',
        },
      },
    },
    description: {
      fr: 'L\'inclusion financière et la transformation digitale sont des leviers essentiels du développement économique africain. Nous concevons et déployons des stratégies nationales et sectorielles innovantes, développons des écosystèmes FinTech et accompagnons la transformation digitale des services financiers pour élargir l\'accès aux populations sous-bancarisées.',
      en: 'Financial inclusion and digital transformation are essential drivers of African economic development. We design and deploy innovative national and sectoral strategies, develop FinTech ecosystems and support the digital transformation of financial services to expand access to underbanked populations.',
    },
    items: [
      {
        icon: 'ri-map-2-line',
        label: {
          fr: 'Conception et déploiement de stratégies nationales et sectorielles',
          en: 'Design and deployment of national and sectoral strategies',
        },
      },
      {
        icon: 'ri-smartphone-line',
        label: {
          fr: 'Transformation digitale des services financiers',
          en: 'Digital transformation of financial services',
        },
      },
      {
        icon: 'ri-lightbulb-flash-line',
        label: {
          fr: 'Développement d\'écosystèmes FinTech & innovation',
          en: 'Development of FinTech ecosystems & innovation',
        },
      },
      {
        icon: 'ri-group-line',
        label: {
          fr: 'Accès aux services financiers pour populations sous-bancarisées',
          en: 'Access to financial services for underbanked populations',
        },
      },
    ],
    cta: {
      fr: 'Développer ma stratégie d\'inclusion',
      en: 'Develop my inclusion strategy',
    },
    image:
      'https://readdy.ai/api/search-image?query=fintech%20innovation%20lab%20with%20african%20professionals%20working%20on%20digital%20financial%20inclusion%20solutions%20modern%20bright%20workspace%20with%20multiple%20screens%20showing%20mobile%20banking%20dashboards%20and%20financial%20data%20visualizations%20collaborative%20team%20environment%20with%20natural%20light%20technology%20and%20finance%20convergence%20concept%20inspiring%20and%20forward-looking%20atmosphere%20with%20teal%20and%20gold%20accents&width=700&height=500&seq=financial-inclusion-khepera-2025&orientation=landscape',
    color: 'from-brand-800 to-brand-900',
  },
  {
    id: 'enterprise-risk-management',
    icon: 'ri-shield-check-line',
    tag: '03',
    title: {
      fr: 'Gestion des risques d\'entreprise',
      en: 'Enterprise Risk Management',
    },
    tagline: {
      fr: 'Anticipez, protégez, renforcez votre résilience',
      en: 'Anticipate, protect, strengthen your resilience',
    },
    problem: {
      title: {
        fr: 'Le défi stratégique',
        en: 'The strategic challenge',
      },
      description: {
        fr: 'Votre organisation est exposée à des risques multiples (crédit, opérationnel, fraude, cyber) sans dispositif structuré pour les anticiper et les maîtriser.',
        en: 'Your organization is exposed to multiple risks (credit, operational, fraud, cyber) without a structured system to anticipate and control them.',
      },
      points: [
        {
          fr: 'Taux de défaut élevé sur le portefeuille',
          en: 'High default rate on portfolio',
        },
        {
          fr: 'Pertes opérationnelles récurrentes',
          en: 'Recurring operational losses',
        },
        {
          fr: 'Absence de cartographie des risques',
          en: 'Lack of risk mapping',
        },
        {
          fr: 'Vulnérabilité aux fraudes et cyberattaques',
          en: 'Vulnerability to fraud and cyberattacks',
        },
      ],
    },
    risks: {
      title: {
        fr: 'Les risques de l\'inaction',
        en: 'The risks of inaction',
      },
      items: [
        {
          icon: 'ri-error-warning-line',
          text: {
            fr: 'Pertes financières majeures et faillite',
            en: 'Major financial losses and bankruptcy',
          },
          severity: 'critical',
        },
        {
          icon: 'ri-shield-cross-line',
          text: {
            fr: 'Fraudes massives et cyberattaques',
            en: 'Massive fraud and cyberattacks',
          },
          severity: 'critical',
        },
        {
          icon: 'ri-file-damage-line',
          text: {
            fr: 'Non-conformité Bâle II/III et sanctions',
            en: 'Basel II/III non-compliance and sanctions',
          },
          severity: 'high',
        },
        {
          icon: 'ri-team-line',
          text: {
            fr: 'Perte de confiance des parties prenantes',
            en: 'Loss of stakeholder confidence',
          },
          severity: 'high',
        },
      ],
    },
    approach: {
      title: {
        fr: 'L\'approche KHEPRA EXPERTS',
        en: 'The KHEPRA EXPERTS approach',
      },
      description: {
        fr: 'Un dispositif ERM complet qui transforme vos risques en avantage compétitif.',
        en: 'A comprehensive ERM system that transforms your risks into a competitive advantage.',
      },
      steps: [
        {
          icon: 'ri-radar-line',
          title: { fr: 'Cartographie', en: 'Mapping' },
          desc: {
            fr: 'Identification exhaustive des risques',
            en: 'Comprehensive risk identification',
          },
        },
        {
          icon: 'ri-shield-flash-line',
          title: { fr: 'Dispositif ERM', en: 'ERM system' },
          desc: {
            fr: 'Politiques et procéduures',
            en: 'Policies and procedures',
          },
        },
        {
          icon: 'ri-pulse-line',
          title: { fr: 'Stress tests', en: 'Stress tests' },
          desc: {
            fr: 'Scénarios et simulations',
            en: 'Scenarios and simulations',
          },
        },
        {
          icon: 'ri-refresh-line',
          title: { fr: 'Monitoring', en: 'Monitoring' },
          desc: {
            fr: 'Suivi continu et ajustements',
            en: 'Continuous monitoring and adjustments',
          },
        },
      ],
    },
    results: {
      title: {
        fr: 'Résultats obtenus pour nos clients',
        en: 'Results achieved for our clients',
      },
      metrics: [
        {
          value: '-35%',
          label: {
            fr: 'Réduction du taux de défaut',
            en: 'Default rate reduction',
          },
        },
        {
          value: '2 500',
          label: {
            fr: 'PME agricoles financées en sécurité',
            en: 'Agricultural SMEs safely financed',
          },
        },
        {
          value: '100%',
          label: {
            fr: 'Conformité réglementaire atteinte',
            en: 'Regulatory compliance achieved',
          },
        },
      ],
      testimonial: {
        quote: {
          fr: 'KHEPRA EXPERTS a transformé notre gestion des risques. Nous avons réduit notre PAR de 35% en un an.',
          en: 'KHEPRA EXPERTS transformed our risk management. We reduced our PAR by 35% in one year.',
        },
        author: {
          fr: 'Moussa T., Directeur des Risques',
          en: 'Moussa T., Chief Risk Officer',
        },
      },
    },
    description: {
      fr: 'Dans un environnement économique incertain, la maîtrise des risques est un impératif stratégique. Nous mettons en place des dispositifs ERM complets — cartographie des risques, contrôle interne, risk assessment et compliance management — pour renforcer la résilience organisationnelle et sécuriser la continuité de votre activité.',
      en: 'In an uncertain economic environment, risk management is a strategic imperative. We implement comprehensive ERM systems — risk mapping, internal control, risk assessment and compliance management — to strengthen organizational resilience and secure business continuity.',
    },
    items: [
      {
        icon: 'ri-radar-line',
        label: {
          fr: 'Cartographie des risques stratégiques, opérationnels et financiers',
          en: 'Mapping of strategic, operational and financial risks',
        },
      },
      {
        icon: 'ri-shield-flash-line',
        label: {
          fr: 'Mise en place de dispositifs ERM & contrôle interne',
          en: 'Implementation of ERM systems & internal control',
        },
      },
      {
        icon: 'ri-alert-line',
        label: {
          fr: 'Risk assessment, mitigation & compliance management',
          en: 'Risk assessment, mitigation & compliance management',
        },
      },
      {
        icon: 'ri-pulse-line',
        label: {
          fr: 'Renforcement de la résilience organisationnelle',
          en: 'Strengthening organizational resilience',
        },
      },
    ],
    cta: {
      fr: 'Évaluer mes risques',
      en: 'Assess my risks',
    },
    image:
      'https://readdy.ai/api/search-image?query=enterprise%20risk%20management%20specialist%20analyzing%20complex%20risk%20matrix%20and%20strategic%20risk%20map%20on%20large%20monitor%20in%20secure%20modern%20office%20ambient%20professional%20lighting%20with%20teal%20accents%20risk%20assessment%20documents%20and%20compliance%20frameworks%20on%20desk%20focused%20business%20consultant%20reviewing%20ERM%20dashboard%20with%20charts%20and%20indicators%20corporate%20resilience%20and%20security%20concept&width=700&height=500&seq=erm-khepera-2025&orientation=landscape',
    color: 'from-brand-700 to-brand-800',
  },
  {
    id: 'strategic-advisory',
    icon: 'ri-lightbulb-flash-line',
    tag: '04',
    title: {
      fr: 'Conseil stratégique & Levée de fonds',
      en: 'Strategic Advisory & Fundraising',
    },
    tagline: {
      fr: 'Construisez votre trajectoire de croissance',
      en: 'Build your growth trajectory',
    },
    problem: {
      title: {
        fr: 'Le défi stratégique',
        en: 'The strategic challenge',
      },
      description: {
        fr: 'Votre entreprise a du potentiel mais manque de structure, de financement et de vision claire pour passer à l\'échelle et conquérir de nouveaux marchés.',
        en: 'Your company has potential but lacks structure, funding and clear vision to scale and conquer new markets.',
      },
      points: [
        {
          fr: 'Modèle économique non structuré',
          en: 'Unstructured business model',
        },
        {
          fr: 'Difficulté à lever des fonds',
          en: 'Difficulty raising funds',
        },
        {
          fr: 'Expansion régionale complexe',
          en: 'Complex regional expansion',
        },
        {
          fr: 'Absence de business plan crédible',
          en: 'Lack of credible business plan',
        },
      ],
    },
    risks: {
      title: {
        fr: 'Les risques de l\'inaction',
        en: 'The risks of inaction',
      },
      items: [
        {
          icon: 'ri-funds-line',
          text: {
            fr: 'Impossibilité de lever des fonds',
            en: 'Inability to raise funds',
          },
          severity: 'critical',
        },
        {
          icon: 'ri-speed-line',
          text: {
            fr: 'Concurrents qui scalent plus vite',
            en: 'Competitors scaling faster',
          },
          severity: 'high',
        },
        {
          icon: 'ri-global-line',
          text: {
            fr: 'Opportunités d\'expansion manquées',
            en: 'Missed expansion opportunities',
          },
          severity: 'high',
        },
        {
          icon: 'ri-line-chart-line',
          text: {
            fr: 'Croissance limitée et stagnation',
            en: 'Limited growth and stagnation',
          },
          severity: 'medium',
        },
      ],
    },
    approach: {
      title: {
        fr: 'L\'approche KHEPRA EXPERTS',
        en: 'The KHEPRA EXPERTS approach',
      },
      description: {
        fr: 'De la structuration à la levée de fonds, nous construisons votre trajectoire de croissance.',
        en: 'From structuring to fundraising, we build your growth trajectory.',
      },
      steps: [
        {
          icon: 'ri-compass-discover-line',
          title: { fr: 'Diagnostic', en: 'Diagnostic' },
          desc: {
            fr: 'Analyse stratégique complète',
            en: 'Complete strategic analysis',
          },
        },
        {
          icon: 'ri-draft-line',
          title: { fr: 'Business plan', en: 'Business plan' },
          desc: {
            fr: 'Modèle économique et projections',
            en: 'Business model and projections',
          },
        },
        {
          icon: 'ri-presentation-line',
          title: { fr: 'Levée de fonds', en: 'Fundraising' },
          desc: {
            fr: 'Pitch deck et approche investisseurs',
            en: 'Pitch deck and investor approach',
          },
        },
        {
          icon: 'ri-global-line',
          title: { fr: 'Expansion', en: 'Expansion' },
          desc: {
            fr: 'Déploiement régional',
            en: 'Regional deployment',
          },
        },
      ],
    },
    results: {
      title: {
        fr: 'Résultats obtenus pour nos clients',
        en: 'Results achieved for our clients',
      },
      metrics: [
        {
          value: '2,5Mds',
          label: {
            fr: 'FCFA levés en moyenne',
            en: 'FCFA raised on average',
          },
        },
        {
          value: '4 mois',
          label: {
            fr: 'Délai moyen de closing',
            en: 'Average closing timeline',
          },
        },
        {
          value: '5 pays',
          label: {
            fr: 'Expansion régionale réussie',
            en: 'Successful regional expansion',
          },
        },
      ],
      testimonial: {
        quote: {
          fr: 'KHEPRA EXPERTS nous a permis de lever 2,5 milliards FCFA en 4 mois. Leur réseau et expertise ont été clés.',
          en: 'KHEPRA EXPERTS enabled us to raise 2.5 billion FCFA in 4 months. Their network and expertise were key.',
        },
        author: {
          fr: 'Jean-Baptiste M., DG Groupe agroalimentaire',
          en: 'Jean-Baptiste M., CEO Agribusiness Group',
        },
      },
    },
    description: {
      fr: 'Les entreprises africaines ont besoin d\'un partenaire stratégique qui comprend leurs réalités et ambitions. Nous co-construisons avec vous des structures organisationnelles et financières solides, des business models innovants et des stratégies de croissance durables — de la conception jusqu\'à la levée de fonds et au scaling.',
      en: 'African companies need a strategic partner who understands their realities and ambitions. We co-build with you solid organizational and financial structures, innovative business models and sustainable growth strategies — from design to fundraising and scaling.',
    },
    items: [
      {
        icon: 'ri-organization-chart',
        label: {
          fr: 'Structuration organisationnelle & financière',
          en: 'Organizational & financial structuring',
        },
      },
      {
        icon: 'ri-draft-line',
        label: {
          fr: 'Business Model Design & Business Plan Development',
          en: 'Business Model Design & Business Plan Development',
        },
      },
      {
        icon: 'ri-funds-line',
        label: {
          fr: 'Préparation à la levée de fonds & investor readiness',
          en: 'Fundraising preparation & investor readiness',
        },
      },
      {
        icon: 'ri-line-chart-line',
        label: {
          fr: 'Stratégies de croissance, scaling & sustainability',
          en: 'Growth strategies, scaling & sustainability',
        },
      },
    ],
    cta: {
      fr: 'Accélérer ma croissance',
      en: 'Accelerate my growth',
    },
    image:
      'https://readdy.ai/api/search-image?query=strategic%20business%20advisor%20presenting%20growth%20roadmap%20and%20business%20structuring%20plan%20to%20african%20entrepreneurs%20in%20bright%20modern%20coworking%20space%20whiteboard%20with%20business%20model%20canvas%20and%20financial%20projections%20collaborative%20atmosphere%20with%20natural%20light%20diverse%20professionals%20engaged%20in%20strategic%20discussion%20inspiring%20and%20dynamic%20professional%20environment%20with%20warm%20tones&width=700&height=500&seq=strategic-advisory-khepera-2025&orientation=landscape',
    color: 'from-brand-900 to-brand-950',
  },
];

export function ServicesList() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';

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

  /** Applique scroll-margin-top dynamique sur chaque section de service */
  useEffect(() => {
    const sectionIds = ['nos-services', 'corporate-governance', 'financial-digital-inclusion', 'enterprise-risk-management', 'strategic-advisory'];

    const applyScrollMargins = () => {
      const offset = getDynamicOffset();
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.style.scrollMarginTop = `${offset}px`;
      });
    };

    applyScrollMargins();
    window.addEventListener('resize', applyScrollMargins, { passive: true });
    return () => window.removeEventListener('resize', applyScrollMargins);
  }, []);

  const scrollToContact = (attempt = 0) => {
    const el = document.getElementById('contact-services');
    if (!el) {
      if (attempt < 10) setTimeout(() => scrollToContact(attempt + 1), 100);
      return;
    }
    const offset = getDynamicOffset();
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleTalkToExpert = () => {
    scrollToContact();
  };

  const scrollToHomeContact = (attempt = 0) => {
    const el = document.getElementById('contact');
    if (!el) {
      if (attempt < 10) setTimeout(() => scrollToHomeContact(attempt + 1), 100);
      return;
    }
    const offset = getDynamicOffset();
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-navy-50 border-navy-200 text-navy-700';
      case 'high':
        return 'bg-gold-50 border-gold-200 text-gold-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <section id="nos-services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-500 bg-gold-50">
            <span className="text-sm font-semibold text-gold-700">
              {lang === 'fr' ? '4 domaines d\'expertise' : '4 areas of expertise'}
            </span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-6">
            {lang === 'fr' ? (
              <>
                Transformez vos défis
                <br />
                <span className="text-gold-600">en opportunités de croissance</span>
              </>
            ) : (
              <>
                Transform your challenges
                <br />
                <span className="text-gold-600">into growth opportunities</span>
              </>
            )}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {lang === 'fr'
              ? 'Chaque défi stratégique a une solution. Découvrez comment nous transformons les obstacles en leviers de performance pour votre organisation.'
              : 'Every strategic challenge has a solution. Discover how we transform obstacles into performance drivers for your organization.'}
          </p>
        </div>

        {/* Services list */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <div key={service.id} id={service.id}>
              {/* Hero Section */}
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center mb-16`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-gold-200">
                    <img
                      src={service.image}
                      alt={service.title[lang]}
                      className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl`}
                    ></div>
                  </div>
                  <div className="absolute -bottom-5 -right-5 w-24 h-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 shadow-xl ring-4 border-gold-100">
                    <i className={`${service.icon} text-4xl text-white`}></i>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl font-bold text-gold-400 font-playfair leading-none">
                      {service.tag}
                    </span>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-gold-400 to-gold-100"></div>
                  </div>
                  <h3 className="font-playfair text-3xl lg:text-4xl font-bold text-brand-900 mb-2">
                    {service.title[lang]}
                  </h3>
                  <p className="text-gold-700 font-semibold mb-5 text-base border-l-4 border-gold-400 pl-3">{service.tagline[lang]}</p>
                  <p className="text-gray-600 leading-relaxed mb-8 text-base">{service.description[lang]}</p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={scrollToContact}
                      className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-7 py-3 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap cursor-pointer flex items-center gap-2"
                    >
                      {lang === 'fr'
                        ? 'Réserver un diagnostic stratégique'
                        : 'Book a strategic diagnostic'}
                      <i className="ri-calendar-check-line"></i>
                    </button>
                    <button
                      onClick={handleTalkToExpert}
                      className="bg-brand-900 text-white border border-gold-200 px-7 py-3 rounded-lg hover:bg-brand-800 transition-all font-semibold text-sm whitespace-nowrap cursor-pointer flex items-center gap-2"
                    >
                      <i className="ri-phone-line text-xl"></i>
                      {lang === 'fr' ? 'Parler à un expert' : 'Talk to an expert'}
                    </button>
                  </div>
                </div>
              </div>

              {/* 1. Problème stratégique */}
              <div className="bg-navy-50 rounded-2xl p-8 lg:p-12 mb-8 border border-navy-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-navy-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-error-warning-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {service.problem.title[lang]}
                    </h4>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {service.problem.description[lang]}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {service.problem.points.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white rounded-lg p-4 border border-navy-200"
                    >
                      <i className="ri-close-circle-fill text-navy-600 text-xl flex-shrink-0"></i>
                      <span className="text-gray-800 text-sm font-medium">{point[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Risques si inaction */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 mb-8 text-white">
                <h4 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <i className="ri-alarm-warning-line text-3xl text-gold-400"></i>
                  {service.risks.title[lang]}
                </h4>
                <p className="text-gray-300 mb-8 text-lg">
                  {lang === 'fr'
                    ? 'Ce qui vous attend si vous ne prenez pas de décision maintenant :'
                    : 'What awaits you if you don\'t make a decision now:'}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.risks.items.map((risk, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl p-5 border-2 ${getSeverityColor(risk.severity)}`}
                    >
                      <div className="flex items-start gap-3">
                        <i className={`${risk.icon} text-2xl flex-shrink-0 mt-1`}></i>
                        <span className="font-semibold leading-relaxed">{risk.text[lang]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Approche KHEPRA */}
              <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl p-8 lg:p-12 mb-8 border-2 border-gold-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-gold-600">
                    <i className="ri-star-line text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-navy-900">{service.approach.title[lang]}</h4>
                </div>
                <p className="text-navy-800 mb-8 text-lg pl-12">{service.approach.description[lang]}</p>
                <div className="grid md:grid-cols-4 gap-6">
                  {service.approach.steps.map((step, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gold-200 hover:border-gold-400 hover:shadow-md transition-all gradient-border glow-gold-hover">
                      <div className="w-14 h-14 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                        <i className={`${step.icon} text-white text-2xl`}></i>
                      </div>
                      <div className="text-xs font-bold text-gold-600 mb-1 uppercase tracking-wider">Étape {idx + 1}</div>
                      <h5 className="font-bold text-navy-900 mb-2">{step.title[lang]}</h5>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.desc[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Résultats obtenus */}
              <div className="bg-gradient-to-br from-brand-900 to-brand-950 rounded-2xl p-8 lg:p-12 mb-8 text-white border-t-4 border-gold-400">
                <h4 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <i className="ri-trophy-line text-3xl text-gold-400"></i>
                  <span className="text-gold-300">{service.results.title[lang]}</span>
                </h4>
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  {service.results.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center bg-white/5 rounded-xl p-6 border border-gold-500/30">
                      <div className="text-5xl font-bold text-gold-400 mb-2 font-playfair">{metric.value}</div>
                      <div className="text-gold-200 font-medium">{metric.label[lang]}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-gold-500/10 backdrop-blur-sm rounded-xl p-6 border border-gold-400/30">
                  <i className="ri-double-quotes-l text-3xl text-gold-400 mb-4 block"></i>
                  <p className="text-lg italic mb-4 leading-relaxed text-gray-200">
                    &ldquo;{service.results.testimonial.quote[lang]}&rdquo;
                  </p>
                  <p className="font-semibold text-gold-300">
                    — {service.results.testimonial.author[lang]}
                  </p>
                </div>
              </div>

              {/* 5. Étapes d'intervention */}
              <div className="bg-white rounded-2xl p-8 lg:p-12 mb-8 border-2 border-gold-100">
                <h4 className="text-2xl font-bold text-navy-900 mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gold-100">
                    <i className="ri-list-check-2 text-gold-600 text-lg"></i>
                  </div>
                  {lang === 'fr' ? 'Notre processus d\'intervention' : 'Our intervention process'}
                </h4>
                <ul className="space-y-4">
                  {service.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gold-50 transition-colors border border-transparent hover:border-gold-200 gradient-border glow-gold-hover"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-gold-100 to-gold-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 border border-gold-200">
                        <i className={`${item.icon} text-gold-700 text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-800 font-medium leading-relaxed">
                          {item.label[lang]}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. CTA Final */}
              <div className="bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 rounded-2xl p-8 lg:p-12 text-center text-white shadow-2xl">
                <h4 className="text-3xl font-bold mb-4">
                  {lang === 'fr'
                    ? 'Prêt à transformer ce défi en opportunité ?'
                    : 'Ready to transform this challenge into an opportunity?'}
                </h4>
                <p className="text-xl text-gold-100 mb-8 max-w-2xl mx-auto">
                  {lang === 'fr'
                    ? 'Réservez votre diagnostic stratégique confidentiel de 30 minutes avec un expert KHEPRA.'
                    : 'Book your confidential 30-minute strategic diagnostic with a KHEPRA expert.'}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={scrollToContact}
                    className="bg-white text-gold-700 px-8 py-4 rounded-lg hover:bg-gold-50 transition-all font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-calendar-check-line text-xl"></i>
                    {lang === 'fr'
                      ? 'Réserver mon diagnostic stratégique'
                      : 'Book my strategic diagnostic'}
                  </button>
                  <button
                    onClick={handleTalkToExpert}
                    className="bg-brand-900 text-white px-8 py-4 rounded-lg hover:bg-brand-800 transition-all font-bold text-base whitespace-nowrap cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-phone-line text-xl"></i>
                    {lang === 'fr' ? 'Parler à un expert' : 'Talk to an expert'}
                  </button>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-gold-100">
                  <div className="flex items-center gap-2">
                    <i className="ri-shield-check-line text-lg"></i>
                    <span>{lang === 'fr' ? '100% Confidentiel' : '100% Confidential'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-time-line text-lg"></i>
                    <span>{lang === 'fr' ? 'Session 30 minutes' : '30-minute session'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-gift-line text-lg"></i>
                    <span>{lang === 'fr' ? 'Sans engagement' : 'No commitment'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}