import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Metric {
  value: string;
  label: string;
  icon: string;
}

interface Mission {
  id: number;
  org: string;
  country: string;
  period: string;
  role: string;
  context: string;
  missions: string[];
  results: string[];
  metrics?: Metric[];
  icon: string;
  color: string;
  tag: string;
  executingEntity?: string;
  executingEntityEn?: string;
}

export default function AboutFieldReferences() {
  const { t, i18n } = useTranslation();
  const [selectedReference, setSelectedReference] = useState<any>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'khepra'>('all');
  const isFr = i18n.language === 'fr';

  const references: Mission[] = [
    {
      id: 1,
      org: 'Atlantique Microfinance – AMIFA',
      country: 'Gabon',
      period: '2016 – 2020',
      role: isFr ? 'Directeur Général' : 'General Manager',
      tag: isFr ? 'Direction Générale' : 'Executive Leadership',
      icon: 'ri-building-2-line',
      color: 'gold',
      context: isFr
        ? "AMIFA est une institution de microfinance opérant au Gabon, offrant des services financiers aux populations non bancarisées et aux micro-entrepreneurs. En tant que Directeur Général, SIMDA Essoyomèwè a conduit l'institution à travers une période de transformation stratégique et de consolidation opérationnelle, notamment en pilotant le processus d'agrément COBAC."
        : 'AMIFA is a microfinance institution operating in Gabon, providing financial services to underserved populations and micro-entrepreneurs. As General Manager, SIMDA Essoyomèwè led the institution through a period of strategic transformation and operational consolidation, including spearheading the COBAC accreditation process.',
      missions: isFr
        ? [
            "Direction générale de l'institution : gouvernance, stratégie, opérations et performance financière",
            'Restructuration des processus internes et renforcement du dispositif de contrôle interne',
            "Déploiement d'un cadre de gestion des risques (crédit, opérationnel, liquidité)",
            'Développement de nouveaux produits financiers adaptés aux besoins des micro-entrepreneurs',
            "Supervision de la conformité réglementaire vis-à-vis de la COBAC (Commission Bancaire de l'Afrique Centrale)",
            "Renforcement du cadre de gouvernance institutionnelle et des relations avec le Conseil d'Administration",
            "Management d'une équipe pluridisciplinaire de plus de 80 collaborateurs répartis sur plusieurs agences",
            'Négociation de partenariats stratégiques avec des institutions financières locales et internationales',
          ]
        : [
            'Overall management of the institution: governance, strategy, operations and financial performance',
            'Restructuring of internal processes and strengthening of the internal control system',
            'Deployment of a risk management framework (credit, operational, liquidity)',
            'Development of new financial products adapted to the needs of micro-entrepreneurs',
            'Supervision of regulatory compliance with COBAC (Central African Banking Commission)',
            'Strengthening of the institutional governance framework and board relations',
            'Management of a multidisciplinary team of 80+ employees across multiple branches',
            'Negotiation of strategic partnerships with local and international financial institutions',
          ],
      results: isFr
        ? [
            'Amélioration significative de la qualité du portefeuille de crédits (réduction des impayés)',
            'Élargissement de la base clientèle et augmentation de la couverture en inclusion financière',
            "Mise en œuvre réussie d'un nouveau système bancaire central (core banking)",
            'Obtention de la certification de conformité réglementaire de la COBAC',
            "Renforcement de la gouvernance institutionnelle reconnu par le Conseil d'Administration",
          ]
        : [
            'Significant improvement in the loan portfolio quality (NPL reduction)',
            'Expansion of the client base and increase in financial inclusion coverage',
            'Successful implementation of a new core banking system',
            'Obtaining regulatory compliance certification from COBAC',
            'Strengthening of institutional governance recognized by the Board of Directors',
          ],
      metrics: [
        { value: '15 Md XAF', label: isFr ? 'Portefeuille de crédits géré au pic' : 'Loan portfolio managed at peak', icon: 'ri-money-dollar-circle-line' },
        { value: '92%+', label: isFr ? 'Taux de remboursement atteint' : 'Repayment rate achieved', icon: 'ri-percent-line' },
        { value: '12 000+', label: isFr ? 'Emprunteurs actifs servis' : 'Active borrowers served', icon: 'ri-group-line' },
        { value: '80+', label: isFr ? 'Collaborateurs managés sur les agences' : 'Staff managed across branches', icon: 'ri-team-line' },
      ],
    },
    {
      id: 2,
      org: 'Financière Africaine de Microprojets – FINAM',
      country: 'Gabon',
      period: '2011 – 2015',
      role: isFr ? 'Auditeur Senior, Chef de Mission Audit' : 'Senior Auditor, Audit Mission Chief',
      tag: isFr ? 'Audit & Risques' : 'Audit & Risk',
      icon: 'ri-search-eye-line',
      color: 'slate',
      context: isFr
        ? "FINAM est une institution financière spécialisée dans le financement de microprojets au Gabon. En tant qu'Auditeur Senior et Chef de Mission Audit, SIMDA Essoyomèwè a conduit des missions d'audit financier et organisationnel, contribuant au renforcement des contrôles internes et de la gestion des risques."
        : 'FINAM is a financial institution specializing in the financing of micro-projects in Gabon. As Senior Auditor and Audit Mission Chief, SIMDA Essoyomèwè conducted financial and organizational audits, contributing to the strengthening of internal controls and risk management.',
      missions: isFr
        ? [
            "Conduite d'audits financiers, comptables et opérationnels des agences et succursales",
            'Évaluation des dispositifs de contrôle interne et identification des faiblesses',
            "Cartographie des risques : risques de crédit, opérationnels, de conformité et de fraude",
            "Rédaction de rapports d'audit avec recommandations et plans d'action",
            "Suivi de la mise en œuvre des recommandations d'audit",
            "Évaluation de la qualité du portefeuille de crédits et de l'adéquation des provisions",
            'Vérification de la conformité réglementaire aux normes COBAC',
            'Formation du personnel opérationnel sur les procédures de contrôle interne',
          ]
        : [
            'Conducting financial, accounting and operational audits of branches and agencies',
            'Assessment of internal control systems and identification of weaknesses',
            'Risk mapping: credit, operational, compliance and fraud risks',
            'Drafting of audit reports with recommendations and action plans',
            'Monitoring the implementation of audit recommendations',
            'Evaluation of the quality of the loan portfolio and provisioning adequacy',
            'Verification of regulatory compliance with COBAC standards',
            'Training of operational staff on internal control procedures',
          ],
      results: isFr
        ? [
            'Réduction significative des risques opérationnels et de crédit identifiés',
            'Renforcement des procédures de contrôle interne dans toutes les agences',
            'Amélioration de la qualité du portefeuille de crédits grâce à un meilleur provisionnement',
            'Préparation réussie aux audits réglementaires externes',
            "Élaboration d'un manuel d'audit interne adopté par l'institution",
          ]
        : [
            'Significant reduction in operational and credit risks identified',
            'Strengthening of internal control procedures across all branches',
            'Improvement of the loan portfolio quality through better provisioning',
            'Successful preparation for external regulatory audits',
            'Development of an internal audit manual adopted by the institution',
          ],
      metrics: [
        { value: '18 Md XAF', label: isFr ? 'Portefeuille audité sur la période' : 'Portfolio audited over the period', icon: 'ri-money-dollar-circle-line' },
        { value: '-35%', label: isFr ? 'Réduction des créances douteuses après audits' : 'Reduction in non-performing loans after audits', icon: 'ri-arrow-down-line' },
        { value: '14', label: isFr ? 'Agences et succursales auditées' : 'Branches and agencies audited', icon: 'ri-building-line' },
        { value: '120+', label: isFr ? "Recommandations d'audit émises" : 'Audit recommendations issued', icon: 'ri-file-list-3-line' },
      ],
    },
    {
      id: 3,
      org: isFr ? 'Ministère des Finances – Inspection des SFD' : 'Ministry of Finance – SFD Inspectorate',
      country: 'Togo',
      period: '2006 – 2009',
      role: isFr
        ? 'Inspecteur Contrôleur des Systèmes Financiers Décentralisés'
        : 'Inspector & Controller of Decentralized Financial Systems',
      tag: isFr ? 'Contrôle Réglementaire' : 'Regulatory Control',
      icon: 'ri-government-line',
      color: 'emerald',
      context: isFr
        ? "Au sein du Ministère des Finances du Togo, l'Inspection des SFD est chargée de superviser et contrôler les systèmes financiers décentralisés (institutions de microfinance, coopératives d'épargne et de crédit). Ce rôle a fourni une solide base en conformité réglementaire et en supervision du secteur financier."
        : 'Within the Ministry of Finance of Togo, the SFD Inspectorate is responsible for supervising and controlling decentralized financial systems (microfinance institutions, savings and credit cooperatives). This role provided a solid foundation in regulatory compliance and financial sector supervision.',
      missions: isFr
        ? [
            "Inspection et contrôle des systèmes financiers décentralisés (SFD) sur l'ensemble du territoire national",
            'Vérification de la conformité aux réglementations régissant le secteur de la microfinance',
            'Évaluation de la santé financière des institutions supervisées',
            "Rédaction de rapports d'inspection et de recommandations à l'autorité de tutelle",
            'Suivi des mesures correctives mises en œuvre par les institutions inspectées',
            "Participation à l'élaboration des cadres réglementaires du secteur de la microfinance",
            'Sensibilisation des dirigeants de SFD aux bonnes pratiques de gouvernance et de conformité',
            "Missions d'inspection conjointes avec le Ministère des Finances et la BCEAO ciblant des structures faîtières de microfinance, couvrant la gouvernance, la solidité financière, la conformité réglementaire et la gestion des risques des réseaux affiliés",
          ]
        : [
            'Inspection and control of decentralized financial systems (SFD) across the national territory',
            'Verification of compliance with regulations governing the microfinance sector',
            'Assessment of the financial health of supervised institutions',
            'Drafting of inspection reports and recommendations to the supervisory authority',
            'Monitoring of corrective measures implemented by inspected institutions',
            'Participation in the development of regulatory frameworks for the microfinance sector',
            'Sensitization of SFD managers on good governance and compliance practices',
            'Joint inspection missions with the Ministry of Finance and the BCEAO targeting apex microfinance structures (faîtières), covering governance, financial soundness, regulatory compliance and risk management of affiliated networks',
          ],
      results: isFr
        ? [
            'Renforcement de la conformité réglementaire des SFD supervisés',
            'Identification et correction des principales déficiences en gouvernance et gestion financière',
            "Contribution à l'amélioration du cadre réglementaire national de la microfinance",
            "Développement d'une solide expertise en supervision et réglementation du secteur financier",
            "Conduite réussie d'inspections conjointes avec la BCEAO sur des institutions faîtières de microfinance, aboutissant à des plans d'action correctifs et à un meilleur contrôle des réseaux affiliés",
          ]
        : [
            'Strengthening of regulatory compliance of supervised SFDs',
            'Identification and correction of major governance and financial management deficiencies',
            'Contribution to the improvement of the national microfinance regulatory framework',
            'Development of solid expertise in financial sector supervision and regulation',
            'Successful conduct of joint inspections with the BCEAO on apex microfinance institutions, leading to corrective action plans and improved oversight of affiliated networks',
          ],
      metrics: [
        { value: '30+', label: isFr ? 'SFD inspectés sur le territoire national' : 'SFDs inspected across the national territory', icon: 'ri-bank-line' },
        { value: '3 millions+', label: isFr ? 'Bénéficiaires couverts par les SFD inspectés' : 'Beneficiaries covered by inspected SFDs', icon: 'ri-group-line' },
        { value: '85%+', label: isFr ? 'Taux de conformité atteint après actions correctives' : 'Compliance rate achieved after corrective actions', icon: 'ri-shield-check-line' },
        { value: '5+', label: isFr ? 'Structures faîtières inspectées conjointement avec la BCEAO' : 'Apex structures jointly inspected with BCEAO', icon: 'ri-government-line' },
      ],
    },
    {
      id: 4,
      org: isFr ? "Stratégie Nationale d'Inclusion Financière – SNIF" : 'National Financial Inclusion Strategy – SNIF',
      country: 'Togo',
      period: '2021 – 2023',
      role: isFr
        ? "Conseiller Technique National — Inclusion Financière, Ministère de l'Inclusion Financière"
        : 'National Technical Advisor — Financial Inclusion, Ministry of Financial Inclusion',
      tag: isFr ? 'Stratégie Nationale' : 'National Strategy',
      icon: 'ri-line-chart-line',
      color: 'teal',
      context: isFr
        ? "En tant que Conseiller Technique National en Inclusion Financière auprès du Ministère chargé de l'Inclusion Financière au Togo, SIMDA Essoyomèwè a joué un rôle central dans l'appui à l'adoption et à la mise en œuvre de la Stratégie Nationale d'Inclusion Financière (SNIF). Cette mission impliquait la coordination de l'ensemble des parties prenantes publiques et privées pour accélérer l'accès aux services financiers des populations non desservies."
        : "As National Technical Advisor in Financial Inclusion at the Ministry in charge of Financial Inclusion in Togo, SIMDA Essoyomèwè played a central role in supporting the adoption and implementation of the National Financial Inclusion Strategy (SNIF). This mission involved coordinating all public and private stakeholders to accelerate access to financial services for underserved populations.",
      missions: isFr
        ? [
            "Appui technique à l'adoption de la Stratégie Nationale d'Inclusion Financière (SNIF) par le Gouvernement du Togo",
            "Coordination de la mise en œuvre du plan d'action de la SNIF dans l'ensemble des ministères et institutions concernés",
            'Facilitation du dialogue entre les autorités publiques, les institutions financières, les opérateurs de mobile money et les partenaires au développement',
            "Suivi et évaluation des indicateurs d'inclusion financière au niveau national",
            'Élaboration de cadres réglementaires et politiques pour promouvoir les services financiers numériques',
            'Assistance technique aux institutions de microfinance et aux banques pour le déploiement de produits inclusifs',
            "Représentation du Togo dans les forums régionaux et internationaux sur l'inclusion financière (BCEAO, AFI, Alliance for Financial Inclusion)",
            'Rédaction de rapports techniques et de notes de politique pour les décideurs',
          ]
        : [
            'Technical support for the adoption of the National Financial Inclusion Strategy (SNIF) by the Government of Togo',
            'Coordination of the implementation of the SNIF action plan across all relevant ministries and institutions',
            'Facilitation of dialogue between public authorities, financial institutions, mobile money operators and development partners',
            'Monitoring and evaluation of financial inclusion indicators at the national level',
            'Development of regulatory and policy frameworks to promote digital financial services',
            'Technical assistance to microfinance institutions and banks for the deployment of inclusive products',
            'Representation of Togo in regional and international financial inclusion forums (BCEAO, AFI, Alliance for Financial Inclusion)',
            'Drafting of technical reports and policy briefs for decision-makers',
          ],
      results: isFr
        ? [
            "Adoption officielle de la Stratégie Nationale d'Inclusion Financière (SNIF) par le Gouvernement du Togo",
            "Taux d'inclusion financière des adultes passé de ~45% à plus de 55% durant la période de la stratégie",
            'Renforcement du cadre réglementaire pour les services financiers numériques et les opérateurs de mobile money',
            'Amélioration de la coordination multi-acteurs entre institutions publiques, banques, IMF et opérateurs de mobile money',
            "Participation active du Togo aux initiatives régionales d'inclusion financière de la BCEAO et aux forums mondiaux de l'AFI",
            'Déploiement de produits financiers inclusifs ciblant les populations rurales et les femmes entrepreneures',
            "Mise en place d'un tableau de bord national de suivi de l'inclusion financière avec des indicateurs clés de performance",
          ]
        : [
            'Official adoption of the National Financial Inclusion Strategy (SNIF) by the Government of Togo',
            'Financial inclusion rate among adults increased from ~45% to over 55% during the strategy period',
            'Strengthened regulatory framework for digital financial services and mobile money operators',
            'Improved multi-stakeholder coordination between public institutions, banks, MFIs and mobile money operators',
            "Togo's active participation in BCEAO regional financial inclusion initiatives and AFI global forums",
            'Deployment of inclusive financial products targeting rural populations and women entrepreneurs',
            'Establishment of a national financial inclusion monitoring dashboard with key performance indicators',
          ],
      metrics: [
        { value: '+10 pts', label: isFr ? "Hausse du taux d'inclusion financière (45% → 55%+)" : 'Financial inclusion rate increase (45% → 55%+)', icon: 'ri-user-add-line' },
        { value: '1,2 M+', label: isFr ? 'Nouveaux bénéficiaires avec accès aux services financiers' : 'New beneficiaries with access to financial services', icon: 'ri-group-line' },
        { value: '3+', label: isFr ? 'Nouveaux cadres réglementaires pour la finance numérique' : 'New digital finance regulatory frameworks', icon: 'ri-file-shield-2-line' },
        { value: '20+', label: isFr ? 'Parties prenantes coordonnées (public & privé)' : 'Stakeholders coordinated (public & private)', icon: 'ri-links-line' },
      ],
    },
    {
      id: 5,
      org: 'Synergie Finance SA',
      country: 'Togo',
      period: '2023 – 2025',
      role: isFr ? 'Chef de Mission — Diagnostic Organisationnel' : 'Mission Chief — Organizational Diagnostic',
      tag: isFr ? 'Conseil Organisationnel' : 'Organizational Consulting',
      icon: 'ri-organization-chart',
      color: 'indigo',
      context: isFr
        ? "Synergie Finance SA est un cabinet de conseil mandaté pour conduire un diagnostic organisationnel complet d'une structure faîtière de microfinance de premier plan au Togo, fédérant un réseau de systèmes financiers décentralisés (SFD) affiliés. En tant que Chef de Mission, SIMDA Essoyomèwè a piloté l'intégralité du diagnostic, couvrant la gouvernance, les processus internes, la gestion des risques et le positionnement stratégique de l'institution faîtière."
        : "Synergie Finance SA is a business consulting firm mandated to conduct a comprehensive organizational diagnostic of a leading apex microfinance structure (faîtière) in Togo, federating a network of affiliated decentralized financial systems (SFDs). As Mission Chief, SIMDA Essoyomèwè led the full diagnostic, covering governance, internal processes, risk management and strategic positioning of the apex institution.",
      missions: isFr
        ? [
            "Pilotage du diagnostic organisationnel complet de la structure faîtière en tant que Chef de Mission pour le compte de Synergie Finance SA",
            "Évaluation du cadre de gouvernance : Conseil d'Administration, organes de direction et processus décisionnels",
            'Analyse des processus organisationnels internes et identification des inefficacités opérationnelles',
            'Évaluation du dispositif de contrôle interne et de gestion des risques',
            "Revue de la performance financière et de la viabilité de l'institution",
            "Évaluation de la qualité de la supervision et de l'appui apportés aux réseaux de SFD affiliés",
            'Benchmarking par rapport aux meilleures pratiques en gouvernance des structures faîtières de microfinance dans la zone UEMOA',
            "Rédaction d'un rapport de diagnostic complet avec recommandations priorisées et plan d'action",
            "Présentation des conclusions et recommandations au Conseil d'Administration et à la Direction Générale",
          ]
        : [
            'Leading the full organizational diagnostic of the apex microfinance structure as Mission Chief on behalf of Synergie Finance SA',
            'Assessment of the governance framework: Board of Directors, management bodies and decision-making processes',
            'Analysis of internal organizational processes and identification of operational inefficiencies',
            'Evaluation of the internal control and risk management system',
            'Review of the financial performance and sustainability of the institution',
            'Assessment of the quality of supervision and support provided to affiliated SFD networks',
            'Benchmarking against best practices in apex microfinance governance in the WAEMU zone',
            'Drafting a comprehensive diagnostic report with prioritized recommendations and an action plan',
            'Presentation of findings and recommendations to the Board of Directors and senior management',
          ],
      results: isFr
        ? [
            "Livraison d'un rapport de diagnostic organisationnel complet avec des recommandations actionnables",
            "Identification des principales lacunes en gouvernance et proposition d'un cadre de gouvernance renforcé",
            "Cartographie des risques opérationnels critiques et proposition d'un plan d'atténuation des risques",
            "Recommandations adoptées par le Conseil d'Administration pour la réforme institutionnelle",
            "Renforcement de la capacité de la structure faîtière à superviser et appuyer son réseau de SFD affiliés",
            "Amélioration du positionnement stratégique de l'institution au sein de l'écosystème de microfinance togolais",
          ]
        : [
            'Delivery of a comprehensive organizational diagnostic report with actionable recommendations',
            'Identification of key governance gaps and proposal of a strengthened governance framework',
            'Mapping of critical operational risks and proposal of a risk mitigation plan',
            'Recommendations adopted by the Board of Directors for institutional reform',
            'Strengthened capacity of the apex structure to supervise and support its affiliated SFD network',
            'Improved strategic positioning of the institution within the Togolese microfinance ecosystem',
          ],
      metrics: [
        { value: '180 Md XOF+', label: isFr ? 'Portefeuille total du réseau diagnostiqué' : 'Total portfolio of the diagnosed network', icon: 'ri-money-dollar-circle-line' },
        { value: '2 M+', label: isFr ? 'Bénéficiaires dans le réseau affilié' : 'Beneficiaries in the affiliated network', icon: 'ri-group-line' },
        { value: '35+', label: isFr ? 'SFD affiliés couverts par le diagnostic' : 'Affiliated SFDs covered by the diagnostic', icon: 'ri-bank-line' },
        { value: '30+', label: isFr ? "Recommandations remises au Conseil d'Administration" : 'Recommendations delivered to the Board', icon: 'ri-file-list-3-line' },
      ],
    },
    {
      id: 7,
      org: isFr
        ? 'Mission Conjointe BCEAO / Ministère des Finances du Togo'
        : 'Joint Mission BCEAO / Ministry of Finance of Togo',
      country: 'Togo',
      period: '2008 – 2009',
      role: isFr
        ? 'Inspecteur-Contrôleur des SFD / Volontaire des Nations Unies — PASNAM/PNUD'
        : 'SFD Inspector-Controller / United Nations Volunteer — PASNAM/UNDP',
      tag: isFr ? 'Supervision & Inspection BCEAO/BEAC' : 'BCEAO/BEAC Supervision & Inspection',
      icon: 'ri-bank-line',
      color: 'rose',
      context: isFr
        ? "Dans le cadre du renforcement de la supervision du secteur de la microfinance au Togo, la BCEAO et le Ministère chargé des Finances ont conduit des missions conjointes d'inspection auprès de deux SFD leaders du secteur (2008 et 2009). Ces institutions, de par leur taille et leur poids dans le secteur, faisaient l'objet d'un contrôle renforcé visant à s'assurer de la solidité de leur situation financière, de la fiabilité de leur comptabilité et de l'efficacité de leur dispositif de contrôle interne. Cette mission a été réalisée en qualité de Volontaire des Nations Unies dans le cadre du Programme d'Appui à la Stratégie Nationale de Microfinance (PASNAM/PNUD)."
        : 'As part of strengthening supervision of the microfinance sector in Togo, the BCEAO and the Ministry of Finance conducted joint inspection missions at two leading SFDs in the sector (2008 and 2009). These institutions, given their size and weight in the sector, were subject to enhanced oversight aimed at ensuring the soundness of their financial position, the reliability of their accounting and the effectiveness of their internal control systems. This mission was carried out as a United Nations Volunteer under the Support Programme for the National Microfinance Strategy (PASNAM/UNDP).',
      missions: isFr
        ? [
            "Participation aux missions conjointes d'inspection BCEAO/BEAC–Ministère chargé des Finances du Togo (2008 et 2009) en qualité d'expert et de Volontaire des Nations Unies (PASNAM/PNUD)",
            'Analyse financière approfondie : bilan, compte de résultat, ratios prudentiels et qualité du portefeuille de crédit des deux SFD inspectés',
            'Examen de la comptabilité : fiabilité des états financiers, conformité aux normes comptables applicables aux SFD et vérification des pièces justificatives',
            "Évaluation du dispositif de contrôle interne : organisation, procédures, séparation des fonctions et traçabilité des opérations",
            'Évaluation de la solidité financière des deux institutions au regard des ratios prudentiels réglementaires BCEAO/BEAC',
            'Identification des forces et des faiblesses des dispositifs financiers, comptables et de contrôle interne des deux SFD inspectés',
            "Formulation de constats, de recommandations et de points d'attention à l'attention des autorités de supervision (BCEAO et Ministère des Finances)",
            "Contribution à la rédaction des rapports d'inspection officiels remis aux autorités de tutelle",
          ]
        : [
            'Participation in the joint BCEAO/BEAC–Ministry of Finance of Togo inspection missions (2008 and 2009) as an expert and United Nations Volunteer (PASNAM/UNDP)',
            'In-depth financial analysis: balance sheet, profit & loss statement, prudential ratios and credit portfolio quality of the two inspected SFDs',
            'Accounting examination: reliability of financial statements, compliance with accounting standards applicable to SFDs and verification of supporting documents',
            'Assessment of the internal control system: organisation, procedures, segregation of duties and operational traceability',
            'Assessment of the financial soundness of the two institutions against BCEAO/BEAC regulatory prudential ratios',
            'Identification of the strengths and weaknesses of the accounting, financial and internal control systems of the two inspected SFDs',
            'Formulation of findings, recommendations and points of attention for the supervisory authorities (BCEAO and Ministry of Finance)',
            'Contribution to the drafting of official inspection reports submitted to the supervisory authorities',
          ],
      results: isFr
        ? [
            "Contribution à la production de rapports d'inspection officiels remis aux autorités de supervision (BCEAO et Ministère des Finances)",
            'Identification des forces et faiblesses des dispositifs financiers, comptables et de contrôle interne des deux SFD inspectés',
            "Recommandations formulées ayant permis aux autorités de prendre les mesures correctives appropriées pour renforcer la solidité et la conformité des institutions",
            "Renforcement de la capacité de supervision du secteur de la microfinance au Togo dans le cadre du programme PASNAM/PNUD",
            "Contribution directe à l'amélioration de la solidité financière et à la conformité réglementaire des institutions inspectées",
          ]
        : [
            'Contribution to the production of official inspection reports submitted to the supervisory authorities (BCEAO and Ministry of Finance)',
            'Identification of strengths and weaknesses in the financial, accounting and internal control systems of the two inspected SFDs',
            'Recommendations formulated enabling the authorities to take appropriate corrective measures to strengthen the soundness and compliance of the institutions',
            'Strengthening of the capacity for microfinance sector supervision in Togo under the PASNAM/UNDP programme',
            'Direct contribution to the improvement of the financial soundness and regulatory compliance of the inspected institutions',
          ],
      metrics: [
        { value: '2 SFDs', label: isFr ? 'Institutions leaders inspectées conjointement BCEAO–Ministère' : 'Leading institutions jointly inspected BCEAO–Ministry', icon: 'ri-bank-line' },
        { value: '3 volets', label: isFr ? 'Financier · Comptable · Contrôle interne' : 'Financial · Accounting · Internal Control', icon: 'ri-file-chart-line' },
        { value: '2 rapports', label: isFr ? 'Rapports officiels remis aux autorités de supervision' : 'Official reports submitted to supervisory authorities', icon: 'ri-file-shield-2-line' },
        { value: 'PASNAM/PNUD', label: isFr ? 'Programme des Nations Unies — Volontaire expert' : 'United Nations Programme — Expert Volunteer', icon: 'ri-global-line' },
      ],
    },
    {
      id: 8,
      org: isFr
        ? "SA de Microfinance – Filiale d'un Groupe Congloméral International"
        : 'Microfinance SA – Subsidiary of an International Conglomerate Group',
      country: 'Togo',
      period: '2026',
      role: isFr
        ? 'Directeur Associé & Chef de Mission — Khepra Experts'
        : 'Associate Director & Mission Chief — Khepra Experts',
      tag: isFr ? 'Agrément & Réglementation IMF' : 'Licensing & IMF Regulation',
      icon: 'ri-award-line',
      color: 'cyan',
      executingEntity: 'Khepra Experts',
      executingEntityEn: 'Khepra Experts',
      context: isFr
        ? "Dans le cadre de l'extension de ses activités en Afrique de l'Ouest, un groupe congloméral international a décidé de créer une Société Anonyme de Microfinance au Togo, sa filiale dédiée à l'inclusion financière. Pour obtenir l'agrément des autorités de tutelle conformément à la nouvelle réglementation en vigueur relative aux Institutions de Microfinance (IMF) au Togo, le groupe a mandaté Khepra Experts pour piloter l'intégralité du dossier d'agrément, de sa constitution jusqu'à son obtention."
        : "As part of expanding its operations in West Africa, an international conglomerate group decided to create a Microfinance Public Limited Company (SA) in Togo, its dedicated subsidiary for financial inclusion. To obtain regulatory approval in accordance with the new regulations governing Microfinance Institutions (MFIs) in Togo, the group mandated Khepra Experts to pilot the entire licensing file, from its preparation through to obtaining the licence.",
      missions: isFr
        ? [
            "Pilotage global du dossier d'agrément en qualité de Directeur Associé et Chef de Mission pour le compte de Khepra Experts",
            "Élaboration du dossier technique complet de demande d'agrément d'une institution de microfinance au TOGO, conformément à la nouvelle réglementation en vigueur",
            "Suivi du dossier dans le circuit de traitement officiel : Ministère des Finances, Banque Centrale (BCEAO) jusqu'à l'obtention de l'agrément",
            "Assistance relationnelle et mise en contact avec les institutionnels et partenaires privés concourant à la constitution et à la mise en activité de l'institution",
            "Mise à disposition des trames et formulaires requis par l'organe de tutelle composant le dossier d'agrément",
            "Conseil et assistance dans la compréhension et l'interprétation de la réglementation relative aux IMF au TOGO",
            "Coordination des interactions entre la filiale, le groupe congloméral international et les autorités de supervision togolaises",
            "Appui à la structuration institutionnelle et organisationnelle de la SA de Microfinance en vue de son démarrage d'activité",
          ]
        : [
            "Overall management of the licensing file as Associate Director and Mission Chief on behalf of Khepra Experts",
            "Preparation of the complete technical licensing application file for a microfinance institution in Togo, in accordance with the new regulations in force",
            "Monitoring of the file through the official processing circuit: Ministry of Finance, Central Bank (BCEAO) through to obtaining the licence",
            "Relationship assistance and networking with institutional and private stakeholders contributing to the establishment and launch of the institution",
            "Provision of templates and forms required by the supervisory authority as part of the licensing file",
            "Advisory and assistance in understanding and interpreting the regulations applicable to MFIs in Togo",
            "Coordination of interactions between the subsidiary, the international conglomerate group and Togolese supervisory authorities",
            "Support for the institutional and organisational structuring of the Microfinance SA in preparation for its launch",
          ],
      results: isFr
        ? [
            "Dossier technique d'agrément complet élaboré et soumis aux autorités compétentes (Ministère des Finances / BCEAO)",
            "Suivi et pilotage réussi du circuit administratif jusqu'à l'obtention de l'agrément d'exercice",
            "Mise en réseau opérationnelle avec les parties prenantes institutionnelles et privées clés pour la mise en activité",
            "Accompagnement de la filiale dans la maîtrise du cadre réglementaire IMF applicable au Togo",
            "Feuille de route institutionnelle livrée pour le démarrage et la structuration de la SA de Microfinance",
          ]
        : [
            "Complete technical licensing file prepared and submitted to the competent authorities (Ministry of Finance / BCEAO)",
            "Successful management and follow-up of the administrative process through to obtaining the operating licence",
            "Operational networking with key institutional and private stakeholders for the institution's launch",
            "Support for the subsidiary in mastering the regulatory framework applicable to MFIs in Togo",
            "Institutional roadmap delivered for the launch and structuring of the Microfinance SA",
          ],
      metrics: [
        { value: '1 agrément', label: isFr ? "Dossier piloté jusqu'à l'obtention de l'agrément" : 'File managed through to licence approval', icon: 'ri-award-line' },
        { value: '5 volets', label: isFr ? 'Technique · Réglementaire · Relationnel · Formulaires · Conseil' : 'Technical · Regulatory · Networking · Forms · Advisory', icon: 'ri-file-list-3-line' },
        { value: 'Groupe Intl.', label: isFr ? "Filiale d'un groupe congloméral international mandant" : 'Subsidiary of an international conglomerate group', icon: 'ri-global-line' },
        { value: '2026', label: isFr ? 'Mission Khepra Experts — Directeur Associé & Chef de Mission' : 'Khepra Experts Mission — Associate Director & Mission Chief', icon: 'ri-calendar-check-line' },
      ],
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; dot: string; badge: string; metric: string }> = {
    gold: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300', dot: 'bg-amber-400', badge: 'bg-amber-100 text-amber-700', metric: 'bg-amber-50 border-amber-200' },
    slate: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-300', dot: 'bg-slate-500', badge: 'bg-slate-100 text-slate-700', metric: 'bg-slate-50 border-slate-200' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300', dot: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700', metric: 'bg-emerald-50 border-emerald-200' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-300', dot: 'bg-teal-500', badge: 'bg-teal-100 text-teal-700', metric: 'bg-teal-50 border-teal-200' },
    indigo: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-300', dot: 'bg-violet-500', badge: 'bg-violet-100 text-violet-700', metric: 'bg-violet-50 border-violet-200' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300', dot: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700', metric: 'bg-orange-50 border-orange-200' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-300', dot: 'bg-rose-500', badge: 'bg-rose-100 text-rose-700', metric: 'bg-rose-50 border-rose-200' },
    cyan: { bg: 'bg-brand-50', text: 'text-brand-700', border: 'border-brand-300', dot: 'bg-brand-500', badge: 'bg-brand-100 text-brand-700', metric: 'bg-brand-50 border-brand-200' },
  };

  const khepraRefs = references.filter((r) => !!r.executingEntity);
  const visibleRefs = filterMode === 'khepra' ? khepraRefs : references;

  const handleFilterChange = (mode: 'all' | 'khepra') => {
    setFilterMode(mode);
    if (mode === 'khepra') {
      const current = selectedReference ?? references[0];
      if (!current.executingEntity) setSelectedReference(khepraRefs[0]);
    }
  };

  return (
    <section id="references" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-16">
          <span className="section-label">
            <i className="ri-map-pin-2-line"></i>
            {isFr ? 'Références Terrain' : 'Field References'}
          </span>
          <h2 className="section-title">
            {isFr ? 'Missions concrètes sur le terrain' : 'Concrete Missions in the Field'}
          </h2>
          <div className="section-divider"><span className="section-divider-dot"></span></div>
          <p className="section-subtitle">
            {isFr
              ? "Un parcours construit à travers des missions réelles au sein d'institutions financières au Gabon et au Togo — de l'inspection réglementaire au leadership exécutif."
              : 'A career built through real assignments in financial institutions across Gabon and Togo — from regulatory inspection to executive leadership.'}
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Colonne gauche — filtres + liste */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Toggle filtre */}
            <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
              <button
                onClick={() => handleFilterChange('all')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  filterMode === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="ri-list-check text-sm"></i>
                <span>{isFr ? `Toutes (${references.length})` : `All (${references.length})`}</span>
              </button>
              <button
                onClick={() => handleFilterChange('khepra')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  filterMode === 'khepra' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-500 hover:text-teal-600'
                }`}
              >
                <i className="ri-building-3-line text-sm"></i>
                <span>{`Khepra Experts (${khepraRefs.length})`}</span>
              </button>
            </div>

            {/* Bandeau info filtre Khepra */}
            {filterMode === 'khepra' && (
              <div className="flex items-start gap-2 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3">
                <i className="ri-filter-3-line text-teal-600 text-sm flex-shrink-0 mt-0.5"></i>
                <p className="text-xs text-teal-700 leading-relaxed">
                  {isFr
                    ? 'Affichage des missions réalisées directement pour le compte de Khepra Experts en 2026.'
                    : 'Showing missions carried out directly on behalf of Khepra Experts in 2026.'}
                </p>
              </div>
            )}

            {/* Liste scrollable */}
            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-600 scrollbar-track-gray-100">
              {visibleRefs.map((ref) => {
                const isActive = (selectedReference?.id ?? references[0].id) === ref.id;
                return (
                  <button
                    key={ref.id}
                    onClick={() => setSelectedReference(ref)}
                    className={`w-full text-left p-4 sm:p-6 rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-lg scale-105'
                        : 'bg-white hover:bg-gray-50 text-gray-900 shadow-md hover:shadow-lg'
                    } ${ref.executingEntity ? 'ring-1 ring-teal-300' : ''}`}
                  >
                    {ref.executingEntity && (
                      <div className={`flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full w-fit text-xs font-bold tracking-wide ${
                        isActive ? 'bg-white/20 text-white' : 'bg-teal-600 text-white'
                      }`}>
                        <i className="ri-building-3-line text-xs"></i>
                        <span>{isFr ? 'Mission Khepra Experts' : 'Khepra Experts Mission'}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-white/20' : 'bg-teal-50'
                      }`}>
                        <i className={`${ref.icon} text-xl ${isActive ? 'text-white' : 'text-teal-600'}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base sm:text-lg mb-1 leading-snug">{ref.org}</h3>
                        <p className={`text-xs sm:text-sm ${isActive ? 'text-white/90' : 'text-gray-500'}`}>
                          {ref.tag} · {ref.country}
                        </p>
                        <p className={`text-xs mt-1 ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
                          {ref.period}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Détail de la référence */}
          <div className="lg:col-span-8">
            {(() => {
              const detail = selectedReference ?? references[0];
              const colors = colorMap[detail.color] ?? colorMap['teal'];
              return (
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-600 scrollbar-track-gray-100">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex-shrink-0 w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center`}>
                      <i className={`${detail.icon} text-3xl ${colors.text}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug">{detail.org}</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${colors.badge}`}>{detail.tag}</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">{detail.country}</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">{detail.period}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 font-medium">{detail.role}</p>
                    </div>
                  </div>

                  {/* Bandeau Entité réalisatrice — missions Khepra */}
                  {detail.executingEntity && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-teal-200">
                      <div className="bg-teal-600 px-4 py-2 flex items-center gap-2">
                        <i className="ri-building-3-fill text-white text-sm"></i>
                        <span className="text-white text-xs font-bold uppercase tracking-widest">
                          {isFr ? 'Entité réalisatrice de la mission' : 'Mission Executing Entity'}
                        </span>
                      </div>
                      <div className="bg-teal-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="ri-briefcase-4-fill text-white text-lg"></i>
                          </div>
                          <div>
                            <p className="text-teal-800 font-extrabold text-base tracking-tight">
                              {isFr ? detail.executingEntity : detail.executingEntityEn}
                            </p>
                            <p className="text-teal-600 text-xs font-medium">
                              {isFr ? 'Cabinet conseil mandaté par le client' : 'Consulting firm mandated by the client'}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold whitespace-nowrap">
                            <i className="ri-user-star-line mr-1"></i>
                            {isFr ? 'Directeur Associé' : 'Associate Director'}
                          </span>
                          <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold whitespace-nowrap">
                            <i className="ri-flag-2-line mr-1"></i>
                            {isFr ? 'Chef de Mission' : 'Mission Chief'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contexte */}
                  <div className="mb-6">
                    <h4 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <i className="ri-information-line text-teal-600"></i>
                      {isFr ? 'Contexte' : 'Context'}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{detail.context}</p>
                  </div>

                  {/* Métriques */}
                  {detail.metrics && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {detail.metrics.map((m: Metric, i: number) => (
                        <div key={i} className={`rounded-xl border p-4 ${colors.metric}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <i className={`${m.icon} text-sm ${colors.text}`}></i>
                            <span className={`text-lg font-bold ${colors.text}`}>{m.value}</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-snug">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Missions */}
                  <div className="mb-6">
                    <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-file-list-3-line text-teal-600"></i>
                      {isFr ? 'Missions réalisées' : 'Missions carried out'}
                    </h4>
                    <ul className="space-y-2">
                      {detail.missions.map((m: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <i className="ri-arrow-right-s-line text-teal-500 mt-0.5 flex-shrink-0"></i>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Résultats */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-trophy-line text-teal-600"></i>
                      {isFr ? 'Résultats obtenus' : 'Results achieved'}
                    </h4>
                    <ul className="space-y-2">
                      {detail.results.map((r: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <i className="ri-checkbox-circle-fill text-teal-500 mt-0.5 flex-shrink-0"></i>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}

export { AboutFieldReferences };




