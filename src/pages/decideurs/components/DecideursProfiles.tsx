import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface StrategicRisk {
  icon: string;
  title: string;
  description: string;
}

interface RegulatoryExposure {
  icon: string;
  title: string;
  description: string;
}

interface RecommendedMission {
  icon: string;
  title: string;
  axes: string[];
}

interface ExperienceRetour {
  context: string;
  intervention: string;
  constat: string;
}

interface Profile {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
  strategicRisks: StrategicRisk[];
  regulatoryExposures: RegulatoryExposure[];
  recommendedMissions: RecommendedMission[];
  experiences: ExperienceRetour[];
}

const DecideursProfiles = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const [activeProfile, setActiveProfile] = useState('dirigeants');

  const profiles: Profile[] = isFr ? [
    {
      id: 'dirigeants',
      icon: 'ri-briefcase-line',
      title: 'Dirigeants d\'entreprise',
      subtitle: 'PME, ETI, Groupes',
      color: 'text-primary-700',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-300/60',
      strategicRisks: [
        {
          icon: 'ri-line-chart-line',
          title: 'Pérennité du modèle d\'affaires',
          description: 'Pression concurrentielle, évolution des exigences réglementaires et nécessité d\'adaptation continue du modèle économique dans un environnement en mutation.'
        },
        {
          icon: 'ri-funds-line',
          title: 'Accès au financement',
          description: 'Contraintes structurelles d\'accès au capital pour les entreprises africaines, exigences accrues des investisseurs en matière de gouvernance et de conformité.'
        },
        {
          icon: 'ri-shield-check-line',
          title: 'Conformité et gouvernance',
          description: 'Exposition croissante aux exigences des régulateurs (BCEAO, COBAC, OHADA) et des partenaires financiers en matière de structuration de la gouvernance.'
        },
        {
          icon: 'ri-organization-chart',
          title: 'Transformation organisationnelle',
          description: 'Nécessité d\'adapter les structures, les processus et les compétences aux standards internationaux tout en préservant l\'agilité opérationnelle.'
        }
      ],
      regulatoryExposures: [
        {
          icon: 'ri-file-shield-line',
          title: 'Réglementation sectorielle',
          description: 'Exposition aux évolutions des normes BCEAO, OHADA, COBAC selon le secteur d\'activité et la zone géographique d\'opération.'
        },
        {
          icon: 'ri-scales-line',
          title: 'Obligations de reporting',
          description: 'Exigences croissantes en matière de reporting financier, extra-financier et réglementaire vis-à-vis des autorités de tutelle et des partenaires.'
        },
        {
          icon: 'ri-alert-line',
          title: 'Risques de non-conformité',
          description: 'Exposition à des sanctions administratives, financières ou pénales en cas de défaillance dans la mise en conformité réglementaire.'
        }
      ],
      recommendedMissions: [
        {
          icon: 'ri-compass-3-line',
          title: 'Mission d\'évaluation stratégique',
          axes: [
            'Analyse du positionnement concurrentiel et réglementaire',
            'Évaluation de la structure de gouvernance',
            'Identification des axes de renforcement institutionnel',
            'Recommandations pour l\'alignement aux standards de place'
          ]
        },
        {
          icon: 'ri-funds-box-line',
          title: 'Mission préparatoire à la levée de fonds',
          axes: [
            'Due diligence préparatoire',
            'Structuration de la documentation investisseur',
            'Évaluation des risques réglementaires et de gouvernance',
            'Accompagnement au dialogue avec les investisseurs'
          ]
        }
      ],
      experiences: [
        {
          context: 'Entreprise familiale du secteur agroalimentaire (Afrique centrale) cherchant à structurer sa gouvernance en vue d\'une expansion régionale.',
          intervention: 'Mission d\'évaluation de la gouvernance et d\'accompagnement à la structuration institutionnelle.',
          constat: 'Gouvernance formalisée selon les standards de place, documentation investisseur structurée, levée de fonds conduite avec succès.'
        },
        {
          context: 'Groupe bancaire (Afrique de l\'Ouest) confronté à des exigences réglementaires accrues nécessitant une revue complète de son dispositif de gouvernance.',
          intervention: 'Mission d\'audit de conformité et d\'accompagnement à la restructuration des organes de gouvernance.',
          constat: 'Dispositif de gouvernance renforcé, pratiques alignées sur les standards de place, confiance des parties prenantes restaurée.'
        }
      ]
    },
    {
      id: 'investisseurs',
      icon: 'ri-funds-line',
      title: 'Investisseurs',
      subtitle: 'Fonds, Family Offices, Institutions',
      color: 'text-accent-700',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-300/60',
      strategicRisks: [
        {
          icon: 'ri-search-eye-line',
          title: 'Évaluation des opportunités',
          description: 'Complexité de l\'évaluation rigoureuse des cibles d\'investissement dans des environnements réglementaires africains fragmentés et en évolution.'
        },
        {
          icon: 'ri-shield-cross-line',
          title: 'Exposition aux risques',
          description: 'Risques réglementaires, opérationnels et de gouvernance spécifiques aux marchés africains, nécessitant une analyse structurée et documentée.'
        },
        {
          icon: 'ri-bar-chart-grouped-line',
          title: 'Création de valeur',
          description: 'Nécessité d\'accompagner les participations pour atteindre les objectifs de performance tout en maintenant la conformité réglementaire.'
        }
      ],
      regulatoryExposures: [
        {
          icon: 'ri-global-line',
          title: 'Cadres réglementaires multiples',
          description: 'Coexistence de normes UEMOA, CEMAC, OHADA et standards internationaux créant une complexité juridique significative pour les investisseurs étrangers.'
        },
        {
          icon: 'ri-bank-line',
          title: 'Contrôle des changes et rapatriement',
          description: 'Réglementation des flux financiers transfrontaliers et conditions de rapatriement des dividendes dans les zones UEMOA et CEMAC.'
        }
      ],
      recommendedMissions: [
        {
          icon: 'ri-file-search-line',
          title: 'Mission de due diligence réglementaire',
          axes: [
            'Analyse du cadre réglementaire applicable',
            'Évaluation de la conformité de la cible',
            'Identification des risques réglementaires résiduels',
            'Recommandations pour la structuration de l\'investissement'
          ]
        },
        {
          icon: 'ri-rocket-line',
          title: 'Mission d\'accompagnement post-investissement',
          axes: [
            'Structuration de la gouvernance',
            'Optimisation des processus de conformité',
            'Préparation aux échéances réglementaires',
            'Suivi des indicateurs de performance extra-financière'
          ]
        }
      ],
      experiences: [
        {
          context: 'Fonds d\'investissement international évaluant une opportunité dans le secteur FinTech en Afrique de l\'Ouest, après deux refus d\'agrément réglementaire.',
          intervention: 'Mission de due diligence réglementaire approfondie avec analyse du cadre BCEAO applicable.',
          constat: 'Agrément obtenu dans le cadre d\'un processus structuré, conformité réglementaire documentée, développement commercial engagé.'
        },
        {
          context: 'Family Office européen accompagnant une participation dans le secteur des services financiers digitaux en zone UEMOA.',
          intervention: 'Mission d\'accompagnement à la structuration de la gouvernance et à la mise en conformité réglementaire.',
          constat: 'Structuration de la gouvernance achevée, expansion régionale initiée dans le respect du cadre réglementaire applicable.'
        }
      ]
    },
    {
      id: 'institutions',
      icon: 'ri-government-line',
      title: 'Institutions financières',
      subtitle: 'Banques, SFD, Assurances, FinTech',
      color: 'text-secondary-700',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-300/60',
      strategicRisks: [
        {
          icon: 'ri-file-shield-line',
          title: 'Conformité réglementaire',
          description: 'Exposition directe aux exigences des régulateurs (BCEAO, COBAC, BEAC), aux normes LBC/FT (GAFI, GIABA, GABAC) et aux standards prudentiels internationaux.'
        },
        {
          icon: 'ri-bank-line',
          title: 'Agrément et licences',
          description: 'Procédures d\'agrément complexes, délais réglementaires contraignants et risque de retrait en cas de non-conformité avérée.'
        },
        {
          icon: 'ri-alert-line',
          title: 'Risques prudentiels',
          description: 'Exigences de solvabilité, de liquidité et de provisionnement selon les normes Bâle II/III et les instructions spécifiques des régulateurs sous-régionaux.'
        }
      ],
      regulatoryExposures: [
        {
          icon: 'ri-shield-star-line',
          title: 'Dispositif LBC/FT',
          description: 'Obligation de mettre en place un dispositif complet de lutte contre le blanchiment et le financement du terrorisme conforme aux 40+9 recommandations du GAFI.'
        },
        {
          icon: 'ri-checkbox-multiple-line',
          title: 'Audits et inspections',
          description: 'Exposition aux contrôles sur pièces et sur place des autorités de tutelle, avec des conséquences potentielles sur l\'agrément et la réputation.'
        }
      ],
      recommendedMissions: [
        {
          icon: 'ri-file-list-3-line',
          title: 'Mission de conformité réglementaire',
          axes: [
            'Audit du dispositif de conformité existant',
            'Analyse des écarts par rapport aux normes applicables',
            'Élaboration d\'un plan de mise en conformité',
            'Accompagnement au dialogue avec le régulateur'
          ]
        },
        {
          icon: 'ri-building-line',
          title: 'Mission de structuration de la gouvernance',
          axes: [
            'Évaluation des organes de gouvernance',
            'Formalisation des politiques et procédures',
            'Renforcement du dispositif de contrôle interne',
            'Préparation aux échéances réglementaires'
          ]
        }
      ],
      experiences: [
        {
          context: 'Réseau de microfinance (Afrique de l\'Ouest) confronté à une mise en demeure du régulateur pour non-conformité généralisée du dispositif de gouvernance.',
          intervention: 'Mission d\'urgence de mise en conformité avec accompagnement au dialogue régulateur.',
          constat: 'Agréments préservés, dispositif de gouvernance mis en conformité, continuité de service assurée pour la clientèle.'
        },
        {
          context: 'Institution de financement agricole (Afrique de l\'Ouest) confrontée à une dégradation significative de son portefeuille de crédit.',
          intervention: 'Mission d\'évaluation du dispositif de gestion des risques et de restructuration du modèle de crédit.',
          constat: 'Amélioration documentée du profil de risque crédit, modèle de financement restructuré, extension du dispositif à de nouvelles régions.'
        }
      ]
    },
    {
      id: 'ong',
      icon: 'ri-heart-line',
      title: 'ONG et bailleurs',
      subtitle: 'ONG, Fondations, Agences',
      color: 'text-accent-700',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-300/60',
      strategicRisks: [
        {
          icon: 'ri-bar-chart-box-line',
          title: 'Mesure d\'impact',
          description: 'Difficulté à démontrer l\'impact réel des programmes selon les standards internationaux et à justifier les investissements auprès des bailleurs.'
        },
        {
          icon: 'ri-funds-box-line',
          title: 'Mobilisation des ressources',
          description: 'Concurrence accrue pour les financements institutionnels et nécessité de propositions alignées sur les priorités des bailleurs.'
        },
        {
          icon: 'ri-scales-line',
          title: 'Passage à l\'échelle',
          description: 'Complexité de la réplication de programmes dans de nouvelles zones géographiques avec des cadres réglementaires différents.'
        }
      ],
      regulatoryExposures: [
        {
          icon: 'ri-file-text-line',
          title: 'Conformité bailleurs',
          description: 'Exigences spécifiques de chaque bailleur en matière de due diligence, de reporting financier et de suivi-évaluation.'
        },
        {
          icon: 'ri-global-line',
          title: 'Cadres nationaux',
          description: 'Nécessité de naviguer entre les exigences des autorités nationales et les standards des bailleurs internationaux.'
        }
      ],
      recommendedMissions: [
        {
          icon: 'ri-survey-line',
          title: 'Mission d\'évaluation d\'impact',
          axes: [
            'Conception du cadre de suivi-évaluation',
            'Analyse des données et mesure de l\'impact',
            'Rédaction de rapports conformes aux standards bailleurs',
            'Recommandations pour l\'amélioration continue'
          ]
        },
        {
          icon: 'ri-file-text-line',
          title: 'Mission d\'accompagnement institutionnel',
          axes: [
            'Analyse des priorités des bailleurs',
            'Structuration des propositions de financement',
            'Appui au dialogue institutionnel',
            'Renforcement des capacités internes'
          ]
        }
      ],
      experiences: [
        {
          context: 'ONG d\'inclusion financière (Afrique de l\'Ouest) cherchant à documenter l\'impact de son programme de microfinance rurale en vue d\'un financement de phase 2.',
          intervention: 'Mission d\'évaluation d\'impact avec conception du cadre de suivi-évaluation et analyse des données terrain.',
          constat: 'Évaluation d\'impact documentée selon les standards internationaux, financement de phase 2 approuvé par les bailleurs.'
        },
        {
          context: 'Institution gouvernementale (Afrique de l\'Ouest) souhaitant élaborer une stratégie nationale d\'inclusion financière conforme aux standards internationaux.',
          intervention: 'Mission d\'accompagnement à l\'élaboration de la stratégie nationale avec alignement sur le modèle AFI.',
          constat: 'Stratégie nationale adoptée, budget de mise en œuvre alloué, cadre de suivi déployé.'
        }
      ]
    }
  ] : [
    {
      id: 'dirigeants',
      icon: 'ri-briefcase-line',
      title: 'Business Leaders',
      subtitle: 'SMEs, Mid-caps, Groups',
      color: 'text-primary-700',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-300/60',
      strategicRisks: [
        {
          icon: 'ri-line-chart-line',
          title: 'Business model sustainability',
          description: 'Competitive pressure, evolving regulatory requirements, and need for continuous adaptation of the economic model in a changing environment.'
        },
        {
          icon: 'ri-funds-line',
          title: 'Access to financing',
          description: 'Structural constraints on capital access for African companies, increased investor requirements regarding governance and compliance.'
        },
        {
          icon: 'ri-shield-check-line',
          title: 'Compliance and governance',
          description: 'Growing exposure to regulatory requirements (BCEAO, COBAC, OHADA) and financial partners\' expectations regarding governance structuring.'
        },
        {
          icon: 'ri-organization-chart',
          title: 'Organizational transformation',
          description: 'Need to adapt structures, processes and skills to international standards while preserving operational agility.'
        }
      ],
      regulatoryExposures: [
        {
          icon: 'ri-file-shield-line',
          title: 'Sectoral regulation',
          description: 'Exposure to evolving BCEAO, OHADA, COBAC standards depending on the sector and geographic area of operation.'
        },
        {
          icon: 'ri-scales-line',
          title: 'Reporting obligations',
          description: 'Increasing requirements for financial, extra-financial and regulatory reporting to supervisory authorities and partners.'
        }
      ],
      recommendedMissions: [
        {
          icon: 'ri-compass-3-line',
          title: 'Strategic evaluation mission',
          axes: [
            'Competitive and regulatory positioning analysis',
            'Governance structure evaluation',
            'Identification of institutional strengthening areas',
            'Recommendations for alignment with market standards'
          ]
        },
        {
          icon: 'ri-funds-box-line',
          title: 'Fundraising preparation mission',
          axes: [
            'Preparatory due diligence',
            'Investor documentation structuring',
            'Regulatory and governance risk assessment',
            'Support for investor dialogue'
          ]
        }
      ],
      experiences: [
        {
          context: 'Family-owned agri-food company (Central Africa) seeking to structure its governance for regional expansion.',
          intervention: 'Governance evaluation and institutional structuring support mission.',
          constat: 'Governance formalized according to market standards, investor documentation structured, fundraising successfully conducted.'
        },
        {
          context: 'Banking group (West Africa) facing increased regulatory requirements requiring a comprehensive governance review.',
          intervention: 'Compliance audit and governance restructuring support mission.',
          constat: 'Governance framework strengthened, practices aligned with market standards, stakeholder confidence restored.'
        }
      ]
    },
    {
      id: 'investisseurs',
      icon: 'ri-funds-line',
      title: 'Investors',
      subtitle: 'Funds, Family Offices, Institutions',
      color: 'text-accent-700',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-300/60',
      strategicRisks: [
        {
          icon: 'ri-search-eye-line',
          title: 'Opportunity assessment',
          description: 'Complexity of rigorous evaluation of investment targets in fragmented and evolving African regulatory environments.'
        },
        {
          icon: 'ri-shield-cross-line',
          title: 'Risk exposure',
          description: 'Regulatory, operational and governance risks specific to African markets, requiring structured and documented analysis.'
        },
        {
          icon: 'ri-bar-chart-grouped-line',
          title: 'Value creation',
          description: 'Need to support portfolio companies to achieve performance objectives while maintaining regulatory compliance.'
        }
      ],
      regulatoryExposures: [
        {
          icon: 'ri-global-line',
          title: 'Multiple regulatory frameworks',
          description: 'Coexistence of WAEMU, CEMAC, OHADA standards and international norms creating significant legal complexity for foreign investors.'
        },
        {
          icon: 'ri-bank-line',
          title: 'Exchange controls and repatriation',
          description: 'Regulation of cross-border financial flows and dividend repatriation conditions in WAEMU and CEMAC zones.'
        }
      ],
      recommendedMissions: [
        {
          icon: 'ri-file-search-line',
          title: 'Regulatory due diligence mission',
          axes: [
            'Analysis of applicable regulatory framework',
            'Evaluation of target compliance',
            'Identification of residual regulatory risks',
            'Recommendations for investment structuring'
          ]
        },
        {
          icon: 'ri-rocket-line',
          title: 'Post-investment support mission',
          axes: [
            'Governance structuring',
            'Compliance process optimization',
            'Regulatory deadline preparation',
            'Extra-financial performance monitoring'
          ]
        }
      ],
      experiences: [
        {
          context: 'International investment fund evaluating a FinTech opportunity in West Africa after two regulatory license rejections.',
          intervention: 'In-depth regulatory due diligence mission with analysis of applicable BCEAO framework.',
          constat: 'License obtained within a structured process, regulatory compliance documented, business development initiated.'
        },
        {
          context: 'European Family Office supporting a digital financial services portfolio company in the WAEMU zone.',
          intervention: 'Governance structuring and regulatory compliance support mission.',
          constat: 'Governance structuring completed, regional expansion initiated in compliance with applicable regulatory framework.'
        }
      ]
    },
    {
      id: 'institutions',
      icon: 'ri-government-line',
      title: 'Financial Institutions',
      subtitle: 'Banks, MFIs, Insurance, FinTech',
      color: 'text-secondary-700',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-300/60',
      strategicRisks: [
        {
          icon: 'ri-file-shield-line',
          title: 'Regulatory compliance',
          description: 'Direct exposure to regulator requirements (BCEAO, COBAC, BEAC), AML/CFT standards (FATF, GIABA, GABAC), and international prudential standards.'
        },
        {
          icon: 'ri-bank-line',
          title: 'Licensing and approvals',
          description: 'Complex licensing procedures, binding regulatory deadlines, and risk of withdrawal in case of proven non-compliance.'
        },
        {
          icon: 'ri-alert-line',
          title: 'Prudential risks',
          description: 'Solvency, liquidity and provisioning requirements according to Basel II/III standards and specific sub-regional regulator instructions.'
        }
      ],
      regulatoryExposures: [
        {
          icon: 'ri-shield-star-line',
          title: 'AML/CFT framework',
          description: 'Obligation to implement a comprehensive anti-money laundering and counter-terrorist financing framework compliant with the FATF 40+9 recommendations.'
        },
        {
          icon: 'ri-checkbox-multiple-line',
          title: 'Audits and inspections',
          description: 'Exposure to on-site and off-site supervisory authority controls, with potential consequences for licensing and reputation.'
        }
      ],
      recommendedMissions: [
        {
          icon: 'ri-file-list-3-line',
          title: 'Regulatory compliance mission',
          axes: [
            'Audit of existing compliance framework',
            'Gap analysis against applicable standards',
            'Development of a compliance remediation plan',
            'Support for regulator dialogue'
          ]
        },
        {
          icon: 'ri-building-line',
          title: 'Governance structuring mission',
          axes: [
            'Governance body evaluation',
            'Policy and procedure formalization',
            'Internal control framework strengthening',
            'Regulatory deadline preparation'
          ]
        }
      ],
      experiences: [
        {
          context: 'Microfinance network (West Africa) facing a regulator notice for widespread non-compliance of its governance framework.',
          intervention: 'Emergency compliance mission with regulator dialogue support.',
          constat: 'Licenses preserved, governance framework brought into compliance, service continuity ensured for clients.'
        },
        {
          context: 'Agricultural finance institution (West Africa) facing significant deterioration of its credit portfolio.',
          intervention: 'Risk management framework evaluation and credit model restructuring mission.',
          constat: 'Documented improvement in credit risk profile, financing model restructured, framework extended to new regions.'
        }
      ]
    },
    {
      id: 'ong',
      icon: 'ri-heart-line',
      title: 'NGOs and Donors',
      subtitle: 'NGOs, Foundations, Agencies',
      color: 'text-accent-700',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-300/60',
      strategicRisks: [
        {
          icon: 'ri-bar-chart-box-line',
          title: 'Impact measurement',
          description: 'Difficulty demonstrating real program impact according to international standards and justifying investments to donors.'
        },
        {
          icon: 'ri-funds-box-line',
          title: 'Resource mobilization',
          description: 'Increased competition for institutional funding and need for proposals aligned with donor priorities.'
        },
        {
          icon: 'ri-scales-line',
          title: 'Scaling up',
          description: 'Complexity of replicating programs in new geographic areas with different regulatory frameworks.'
        }
      ],
      regulatoryExposures: [
        {
          icon: 'ri-file-text-line',
          title: 'Donor compliance',
          description: 'Specific requirements of each donor regarding due diligence, financial reporting and monitoring-evaluation.'
        },
        {
          icon: 'ri-global-line',
          title: 'National frameworks',
          description: 'Need to navigate between national authority requirements and international donor standards.'
        }
      ],
      recommendedMissions: [
        {
          icon: 'ri-survey-line',
          title: 'Impact evaluation mission',
          axes: [
            'Monitoring-evaluation framework design',
            'Data analysis and impact measurement',
            'Reporting compliant with donor standards',
            'Recommendations for continuous improvement'
          ]
        },
        {
          icon: 'ri-file-text-line',
          title: 'Institutional support mission',
          axes: [
            'Donor priority analysis',
            'Funding proposal structuring',
            'Institutional dialogue support',
            'Internal capacity building'
          ]
        }
      ],
      experiences: [
        {
          context: 'Financial inclusion NGO (West Africa) seeking to document the impact of its rural microfinance program for phase 2 funding.',
          intervention: 'Impact evaluation mission with monitoring-evaluation framework design and field data analysis.',
          constat: 'Impact evaluation documented according to international standards, phase 2 funding approved by donors.'
        },
        {
          context: 'Government institution (West Africa) seeking to develop a national financial inclusion strategy compliant with international standards.',
          intervention: 'National strategy development support mission aligned with the AFI model.',
          constat: 'National strategy adopted, implementation budget allocated, monitoring framework deployed.'
        }
      ]
    }
  ];

  const activeProfileData = profiles.find(p => p.id === activeProfile) || profiles[0];

  return (
    <section id="profiles-section" className="py-20 bg-gradient-to-b from-background-50 to-background-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setActiveProfile(profile.id)}
              className={`group flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeProfile === profile.id
                  ? `${profile.bgColor} ${profile.color} scale-105`
                  : 'bg-background-50 text-foreground-600 hover:bg-background-100 border border-background-200/70'
              }`}
            >
              <i className={`${profile.icon} text-2xl`}></i>
              <div className="text-left">
                <div className="text-sm font-bold">{profile.title}</div>
                <div className="text-xs opacity-75">{profile.subtitle}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Profile Content */}
        <div className="space-y-16">
          {/* Strategic Risks Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-12 h-12 ${activeProfileData.bgColor} ${activeProfileData.color} rounded-lg flex items-center justify-center`}>
                <i className="ri-alert-line text-2xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-foreground-950">
                {isFr ? 'Enjeux stratégiques' : 'Strategic challenges'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {activeProfileData.strategicRisks.map((risk, index) => (
                <div
                  key={index}
                  className={`bg-background-50 p-6 rounded-xl border ${activeProfileData.borderColor} transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${activeProfileData.bgColor} ${activeProfileData.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <i className={`${risk.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground-900 mb-2 line-clamp-2" title={risk.title}>{risk.title}</h3>
                      <p className="text-sm text-foreground-600 leading-relaxed">{risk.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Exposure Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-12 h-12 ${activeProfileData.bgColor} ${activeProfileData.color} rounded-lg flex items-center justify-center`}>
                <i className="ri-shield-check-line text-2xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-foreground-950">
                {isFr ? 'Exposition réglementaire' : 'Regulatory exposure'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {activeProfileData.regulatoryExposures.map((exp, index) => (
                <div
                  key={index}
                  className="bg-background-50 p-6 rounded-xl border border-background-200/70 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${activeProfileData.bgColor} ${activeProfileData.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <i className={`${exp.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground-900 mb-2 line-clamp-2" title={exp.title}>{exp.title}</h3>
                      <p className="text-sm text-foreground-600 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Missions Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-12 h-12 ${activeProfileData.bgColor} ${activeProfileData.color} rounded-lg flex items-center justify-center`}>
                <i className="ri-lightbulb-line text-2xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-foreground-950">
                {isFr ? 'Missions recommandées' : 'Recommended missions'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {activeProfileData.recommendedMissions.map((mission, index) => (
                <div
                  key={index}
                  className="bg-background-50 p-6 rounded-xl border border-background-200/70 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 ${activeProfileData.bgColor} ${activeProfileData.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <i className={`${mission.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground-900 mb-2 line-clamp-2" title={mission.title}>{mission.title}</h3>
                    </div>
                  </div>
                  <div className="pl-16">
                    <div className="text-xs font-semibold text-foreground-500 mb-3 uppercase tracking-wide">
                      {isFr ? 'Axes d\'investigation' : 'Investigation areas'}
                    </div>
                    <ul className="space-y-2">
                      {mission.axes.map((axe, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground-600">
                          <i className={`ri-arrow-right-s-line ${activeProfileData.color} mt-0.5 flex-shrink-0`}></i>
                          <span>{axe}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Feedback Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-12 h-12 ${activeProfileData.bgColor} ${activeProfileData.color} rounded-lg flex items-center justify-center`}>
                <i className="ri-double-quotes-l text-2xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-foreground-950">
                {isFr ? 'Retours d\'expérience' : 'Experience feedback'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {activeProfileData.experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-background-50 to-background-100 p-6 rounded-xl border ${activeProfileData.borderColor} transition-all duration-300`}
                >
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-foreground-500 mb-1 uppercase tracking-wide">
                        {isFr ? 'Contexte' : 'Context'}
                      </div>
                      <p className="text-sm text-foreground-600 leading-relaxed">{exp.context}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground-500 mb-1 uppercase tracking-wide">
                        {isFr ? 'Intervention' : 'Intervention'}
                      </div>
                      <p className="text-sm text-foreground-800 font-medium">{exp.intervention}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground-500 mb-1 uppercase tracking-wide">
                        {isFr ? 'Constat' : 'Finding'}
                      </div>
                      <p className="text-sm text-foreground-600">{exp.constat}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Qualification CTA */}
          <div className={`${activeProfileData.bgColor} rounded-2xl p-8 text-center border ${activeProfileData.borderColor}`}>
            <h3 className="text-2xl font-bold text-foreground-950 mb-4">
              {isFr
                ? 'Pour une évaluation de votre situation'
                : 'For an assessment of your situation'}
            </h3>
            <p className="text-foreground-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              {isFr
                ? 'Chaque mission fait l\'objet d\'un devis confidentiel établi après un entretien de qualification. Cet entretien permet d\'identifier les axes d\'investigation pertinents et de définir le cadre d\'intervention adapté à votre contexte.'
                : 'Each engagement is subject to a confidential proposal prepared after a qualification discussion. This discussion identifies relevant areas of investigation and defines the appropriate intervention framework for your context.'}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-background-50 px-8 py-4 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-calendar-check-line text-xl"></i>
              <span>{isFr ? 'Solliciter un entretien de qualification' : 'Request a qualification discussion'}</span>
            </a>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-foreground-600">
              <div className="flex items-center gap-2">
                <i className="ri-lock-line text-primary-600"></i>
                <span>{isFr ? 'Confidentiel' : 'Confidential'}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-file-text-line text-primary-600"></i>
                <span>{isFr ? 'Devis sur mesure' : 'Custom proposal'}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-primary-600"></i>
                <span>{isFr ? 'Contractuel' : 'Contractual'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecideursProfiles;