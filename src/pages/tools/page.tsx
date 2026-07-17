import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

type ToolCategory = 'governance' | 'finance' | 'digital' | 'rh' | 'esg' | 'risks' | 'compliance';

interface ToolItem {
  id: string;
  icon: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  durationFr: string;
  durationEn: string;
  timeFr: string;
  timeEn: string;
  levelFr: string;
  levelEn: string;
  tagFr: string;
  tagEn: string;
  link: string;
  category: ToolCategory;
  popular: boolean;
  image: string;
  stats: { valueFr: string; valueEn: string; labelFr: string; labelEn: string }[];
}

const TOOLS_DATA: ToolItem[] = [
  {
    id: 'evaluation-cybersecurite', icon: 'ri-shield-keyhole-line', titleFr: 'Évaluation Cybersécurité', titleEn: 'Cybersecurity Assessment',
    descFr: 'Évaluez votre posture de cybersécurité en 50 questions : infrastructure, politiques, réponse aux incidents, conformité (ISO 27001, RGPD, BCEAO) et sensibilisation.',
    descEn: 'Evaluate your cybersecurity posture in 50 questions: infrastructure, policies, incident response, compliance (ISO 27001, GDPR, BCEAO) and awareness.',
    durationFr: '50 questions', durationEn: '50 questions', timeFr: '18 min', timeEn: '18 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Cybersécurité', tagEn: 'Cybersecurity', link: '/tools/evaluation-cybersecurite',
    category: 'risks', popular: false,
    image: 'https://readdy.ai/api/search-image?query=cybersecurity%20institutional%20assessment%20shield%20protection%20digital%20security%20Africa%20financial%20institution%20BCEAO%20ISO%2027001%20GDPR%20compliance%20abstract%20modern%20clean%20white%20background%20red%20dark%20accent%20professional%20consulting%20geometric%20minimal&width=600&height=400&seq=tool-cyber-07&orientation=landscape',
    stats: [{ valueFr: '5 axes', valueEn: '5 axes', labelFr: 'sécurité', labelEn: 'security' }, { valueFr: 'ISO 27001', valueEn: 'ISO 27001', labelFr: 'RGPD BCEAO', labelEn: 'GDPR BCEAO' }, { valueFr: 'Rapport', valueEn: 'Report', labelFr: 'PDF inclus', labelEn: 'PDF included' }]
  },
  {
    id: 'diagnostic-organisationnel', icon: 'ri-organization-chart', titleFr: 'Diagnostic Organisationnel', titleEn: 'Organizational Diagnostic',
    descFr: 'Évaluez la maturité organisationnelle de votre structure en 8 dimensions clés. Obtenez un score sur 100 et des recommandations personnalisées.',
    descEn: 'Assess your organization\'s maturity across 8 key dimensions. Get a score out of 100 and personalized recommendations.',
    durationFr: '8 questions', durationEn: '8 questions', timeFr: '5 min', timeEn: '5 min', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'Gouvernance', tagEn: 'Governance', link: '/tools/diagnostic-organisationnel',
    category: 'governance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=professional%20organizational%20chart%20diagram%20corporate%20structure%20modern%20minimalist%20clean%20white%20background%20business%20consulting%20Africa%20teal%20green%20accent%20geometric%20shapes%20abstract%20institutional&width=600&height=400&seq=tool-org-01&orientation=landscape',
    stats: [{ valueFr: '8 axes', valueEn: '8 axes', labelFr: 'évalués', labelEn: 'assessed' }, { valueFr: 'Score /100', valueEn: 'Score /100', labelFr: 'personnalisé', labelEn: 'personalized' }, { valueFr: 'PDF', valueEn: 'PDF', labelFr: 'téléchargeable', labelEn: 'downloadable' }]
  },
  {
    id: 'maturite-digitale', icon: 'ri-line-chart-line', titleFr: 'Test de Maturité Digitale', titleEn: 'Digital Maturity Test',
    descFr: 'Mesurez votre niveau de transformation digitale sur 6 dimensions : Stratégie, Processus, Data, Talent, Culture et Technologie.',
    descEn: 'Measure your digital transformation level across 6 dimensions: Strategy, Process, Data, Talent, Culture and Technology.',
    durationFr: '12 questions', durationEn: '12 questions', timeFr: '7 min', timeEn: '7 min', levelFr: 'Intermédiaire', levelEn: 'Intermediate',
    tagFr: 'Digital', tagEn: 'Digital', link: '/tools/maturite-digitale',
    category: 'digital', popular: true,
    image: 'https://readdy.ai/api/search-image?query=digital%20transformation%20data%20analytics%20dashboard%20modern%20technology%20abstract%20visualization%20clean%20white%20background%20amber%20orange%20accent%20business%20Africa%20fintech%20innovation%20geometric&width=600&height=400&seq=tool-digital-02&orientation=landscape',
    stats: [{ valueFr: '6 dim.', valueEn: '6 dim.', labelFr: 'analysées', labelEn: 'analyzed' }, { valueFr: 'Benchmark', valueEn: 'Benchmark', labelFr: 'sectoriel', labelEn: 'sector' }, { valueFr: 'Plan', valueEn: 'Plan', labelFr: 'de roadmap', labelEn: 'roadmap' }]
  },
  {
    id: 'evaluation-gouvernance', icon: 'ri-shield-check-line', titleFr: 'Évaluation de Gouvernance', titleEn: 'Governance Assessment',
    descFr: 'Vérifiez votre conformité aux normes BCEAO/OHADA avec une checklist de 10 critères essentiels. Téléchargez votre rapport PDF.',
    descEn: 'Check your compliance with BCEAO/OHADA standards using a 10-criteria checklist. Download your PDF report.',
    durationFr: '10 critères', durationEn: '10 criteria', timeFr: '6 min', timeEn: '6 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Conformité', tagEn: 'Compliance', link: '/tools/evaluation-gouvernance',
    category: 'governance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=governance%20compliance%20legal%20framework%20OHADA%20BCEAO%20Africa%20institutional%20abstract%20shield%20protection%20clean%20white%20background%20rose%20pink%20accent%20professional%20consulting%20regulatory&width=600&height=400&seq=tool-gov-03&orientation=landscape',
    stats: [{ valueFr: 'BCEAO', valueEn: 'BCEAO', labelFr: 'OHADA', labelEn: 'OHADA' }, { valueFr: '10 pts', valueEn: '10 pts', labelFr: 'de contrôle', labelEn: 'checkpoints' }, { valueFr: 'Rapport', valueEn: 'Report', labelFr: 'certifié', labelEn: 'certified' }]
  },
  {
    id: 'diagnostic-transformation-digitale', icon: 'ri-rocket-line', titleFr: 'Diagnostic Transformation Digitale', titleEn: 'Digital Transformation Diagnostic',
    descFr: 'Évaluez en 15 questions la maturité digitale de votre organisation : stratégie, infrastructure, capacités et culture digitale.',
    descEn: 'Assess your organization\'s digital maturity in 15 questions: strategy, infrastructure, capabilities and digital culture.',
    durationFr: '15 questions', durationEn: '15 questions', timeFr: '8 min', timeEn: '8 min', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'Transformation', tagEn: 'Transformation', link: '/tools/diagnostic-transformation-digitale',
    category: 'digital', popular: false,
    image: 'https://readdy.ai/api/search-image?query=digital%20transformation%20rocket%20launch%20innovation%20technology%20Africa%20startup%20abstract%20modern%20clean%20white%20background%20violet%20purple%20accent%20business%20strategy%20consulting%20geometric%20shapes&width=600&height=400&seq=tool-transfo-04&orientation=landscape',
    stats: [{ valueFr: '4 piliers', valueEn: '4 pillars', labelFr: 'stratégiques', labelEn: 'strategic' }, { valueFr: 'Score', valueEn: 'Score', labelFr: 'global', labelEn: 'global' }, { valueFr: 'Feuille', valueEn: 'Road', labelFr: 'de route', labelEn: 'map' }]
  },
  {
    id: 'evaluation-maturite-fintech', icon: 'ri-bank-card-line', titleFr: 'Évaluation Maturité Fintech', titleEn: 'Fintech Maturity Assessment',
    descFr: 'Analysez votre maturité fintech en 6 dimensions avec benchmark sectoriel : infrastructure, produits digitaux, expérience client, data, conformité et innovation.',
    descEn: 'Analyze your fintech maturity across 6 dimensions with sector benchmark: infrastructure, digital products, customer experience, data, compliance and innovation.',
    durationFr: '18 questions', durationEn: '18 questions', timeFr: '10 min', timeEn: '10 min', levelFr: 'Intermédiaire', levelEn: 'Intermediate',
    tagFr: 'Fintech', tagEn: 'Fintech', link: '/tools/evaluation-maturite-fintech',
    category: 'digital', popular: false,
    image: 'https://readdy.ai/api/search-image?query=fintech%20mobile%20payment%20financial%20technology%20Africa%20digital%20banking%20abstract%20modern%20clean%20white%20background%20cyan%20sky%20blue%20accent%20innovation%20cards%20smartphone%20geometric%20minimal&width=600&height=400&seq=tool-fintech-05&orientation=landscape',
    stats: [{ valueFr: '6 dim.', valueEn: '6 dim.', labelFr: 'fintech', labelEn: 'fintech' }, { valueFr: 'Bench.', valueEn: 'Bench.', labelFr: 'Afrique', labelEn: 'Africa' }, { valueFr: 'Score', valueEn: 'Score', labelFr: 'maturité', labelEn: 'maturity' }]
  },
  {
    id: 'diagnostic-strategique', icon: 'ri-compass-3-line', titleFr: 'Diagnostic Stratégique', titleEn: 'Strategic Diagnostic',
    descFr: 'Évaluez la maturité stratégique de votre organisation sur 3 axes : vision & direction, positionnement & marché, modèle économique. Score sur 100, graphique radar, rapport PDF.',
    descEn: "Assess your organization's strategic maturity across 3 axes: vision & direction, market positioning, business model. Score out of 100, radar chart, PDF report.",
    durationFr: '15 questions', durationEn: '15 questions', timeFr: '5 min', timeEn: '5 min', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'Stratégie', tagEn: 'Strategy', link: '/tools/diagnostic-strategique',
    category: 'governance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=strategic%20business%20consulting%20compass%20direction%20vision%20Africa%20executive%20leadership%20abstract%20modern%20clean%20white%20background%20teal%20amber%20gold%20accent%20geometric%20minimal%20professional%20consulting%20institutional%20growth%20strategy&width=600&height=400&seq=tool-strategic-09&orientation=landscape',
    stats: [{ valueFr: '3 axes', valueEn: '3 axes', labelFr: 'stratégiques', labelEn: 'strategic' }, { valueFr: 'Radar', valueEn: 'Radar', labelFr: 'graphique', labelEn: 'chart' }, { valueFr: 'Score', valueEn: 'Score', labelFr: '/100', labelEn: '/100' }]
  },
  {
    id: 'evaluation-conformite-reglementaire', icon: 'ri-shield-check-line', titleFr: 'Évaluation Conformité Réglementaire', titleEn: 'Regulatory Compliance Assessment',
    descFr: 'Évaluez votre conformité BCEAO, BEAC, COBAC et OHADA en 8 sections : gouvernance, KYC, LAB/FT, FATCA/CRS, déontologie, protection client, dispositifs transverses et pilotage. Rapport PDF inclus.',
    descEn: 'Assess your BCEAO, BEAC, COBAC and OHADA compliance in 8 sections: governance, KYC, AML/CFT, FATCA/CRS, ethics, customer protection, cross-cutting systems and management. PDF report included.',
    durationFr: '37 questions', durationEn: '37 questions', timeFr: '15 min', timeEn: '15 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Conformité', tagEn: 'Compliance', link: '/tools/evaluation-conformite-reglementaire',
    category: 'compliance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=regulatory%20compliance%20assessment%20Africa%20financial%20institution%20BCEAO%20BEAC%20COBAC%20OHADA%20abstract%20modern%20clean%20white%20background%20teal%20dark%20green%20accent%20shield%20protection%20legal%20framework%20geometric%20minimal%20professional%20consulting%20institutional&width=600&height=400&seq=tool-compliance-08&orientation=landscape',
    stats: [{ valueFr: '8 sections', valueEn: '8 sections', labelFr: 'réglementaires', labelEn: 'regulatory' }, { valueFr: 'BCEAO/BEAC', valueEn: 'BCEAO/BEAC', labelFr: 'COBAC/OHADA', labelEn: 'COBAC/OHADA' }, { valueFr: 'Rapport', valueEn: 'Report', labelFr: 'PDF expert', labelEn: 'expert PDF' }]
  },
  {
    id: 'simulateur-financier', icon: 'ri-calculator-line', titleFr: 'Simulateur Financier', titleEn: 'Financial Simulator',
    descFr: 'Simulez votre trésorerie, calculez votre DSCR et analysez votre rentabilité. Outil interactif pour décideurs financiers avec projections et rapports PDF.',
    descEn: 'Simulate your cash flow, calculate your DSCR and analyze your profitability. Interactive tool for financial decision-makers with projections and PDF reports.',
    durationFr: '3 modules', durationEn: '3 modules', timeFr: '5 min', timeEn: '5 min', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'Finance', tagEn: 'Finance', link: '/tools/simulateur-financier',
    category: 'finance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=financial%20calculator%20dashboard%20data%20analysis%20Africa%20business%20amber%20gold%20accent%20modern%20clean%20white%20background%20charts%20graphs%20professional%20consulting%20institutional%20minimal%20geometric&width=600&height=400&seq=tool-finance-10&orientation=landscape',
    stats: [{ valueFr: 'Trésorerie', valueEn: 'Treasury', labelFr: 'projection', labelEn: 'projection' }, { valueFr: 'DSCR', valueEn: 'DSCR', labelFr: 'calculé', labelEn: 'calculated' }, { valueFr: 'Rentabilité', valueEn: 'Profitability', labelFr: 'analysée', labelEn: 'analyzed' }]
  },
  {
    id: 'stress-test-financier', icon: 'ri-shield-flash-line', titleFr: 'Stress Test Financier', titleEn: 'Financial Stress Test',
    descFr: 'Testez la résilience de votre organisation face à 4 scénarios de crise : chute de revenus, hausse des coûts, crise de liquidité et disruption de marché.',
    descEn: 'Test your organization\'s resilience against 4 crisis scenarios: revenue drop, cost surge, liquidity crisis and market disruption.',
    durationFr: '16 questions', durationEn: '16 questions', timeFr: '6 min', timeEn: '6 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Résilience', tagEn: 'Resilience', link: '/tools/stress-test-financier',
    category: 'finance', popular: false,
    image: 'https://readdy.ai/api/search-image?query=financial%20stress%20test%20crisis%20resilience%20shield%20protection%20Africa%20business%20organization%20abstract%20modern%20clean%20white%20background%20red%20rose%20accent%20storm%20waves%20professional%20consulting%20institutional%20geometric%20minimal&width=600&height=400&seq=tool-stress-11&orientation=landscape',
    stats: [{ valueFr: '4 scénarios', valueEn: '4 scenarios', labelFr: 'de crise', labelEn: 'of crisis' }, { valueFr: 'Score', valueEn: 'Score', labelFr: 'résilience', labelEn: 'resilience' }, { valueFr: 'Plan', valueEn: 'Action', labelFr: 'd\'action', labelEn: 'plan' }]
  },
  {
    id: 'investment-readiness', icon: 'ri-briefcase-4-line', titleFr: 'Investment Readiness', titleEn: 'Investment Readiness',
    descFr: 'Évaluez votre préparation à la levée de fonds : santé financière, gouvernance, positionnement marché, scalabilité et documentation investisseurs.',
    descEn: 'Assess your fundraising readiness: financial health, governance, market positioning, scalability and investor documentation.',
    durationFr: '15 questions', durationEn: '15 questions', timeFr: '6 min', timeEn: '6 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Investissement', tagEn: 'Investment', link: '/tools/investment-readiness',
    category: 'finance', popular: false,
    image: 'https://readdy.ai/api/search-image?query=investment%20readiness%20fundraising%20Africa%20startup%20venture%20capital%20private%20equity%20abstract%20modern%20clean%20white%20background%20emerald%20green%20gold%20accent%20professional%20consulting%20institutional%20geometric%20minimal%20growth%20arrows&width=600&height=400&seq=tool-invest-12&orientation=landscape',
    stats: [{ valueFr: '5 axes', valueEn: '5 axes', labelFr: 'évalués', labelEn: 'assessed' }, { valueFr: 'Score', valueEn: 'Score', labelFr: '/100', labelEn: '/100' }, { valueFr: 'Rapport', valueEn: 'Report', labelFr: 'investisseurs', labelEn: 'investors' }]
  },
  {
    id: 'diagnostic-risques', icon: 'ri-radar-line', titleFr: 'Diagnostic Gestion des Risques', titleEn: 'Risk Management Diagnostic',
    descFr: 'Cartographiez vos risques stratégiques, opérationnels, financiers et de conformité. Score de maturité, plan d\'action prioritaire et rapport PDF.',
    descEn: 'Map your strategic, operational, financial and compliance risks. Maturity score, priority action plan and PDF report.',
    durationFr: '12 questions', durationEn: '12 questions', timeFr: '5 min', timeEn: '5 min', levelFr: 'Intermédiaire', levelEn: 'Intermediate',
    tagFr: 'Risques', tagEn: 'Risks', link: '/tools/diagnostic-risques',
    category: 'risks', popular: false,
    image: 'https://readdy.ai/api/search-image?query=risk%20management%20cartography%20strategic%20operational%20financial%20compliance%20Africa%20abstract%20modern%20clean%20white%20background%20teal%20orange%20accent%20radar%20chart%20shield%20professional%20consulting%20institutional%20geometric%20minimal&width=600&height=400&seq=tool-risk-13&orientation=landscape',
    stats: [{ valueFr: '4 catégories', valueEn: '4 categories', labelFr: 'risques', labelEn: 'risks' }, { valueFr: 'Carto.', valueEn: 'Mapping', labelFr: 'des risques', labelEn: 'of risks' }, { valueFr: 'Plan', valueEn: 'Action', labelFr: 'd\'action', labelEn: 'plan' }]
  },
  {
    id: 'performance-commerciale', icon: 'ri-bar-chart-line', titleFr: 'Performance Commerciale', titleEn: 'Commercial Performance',
    descFr: 'Évaluez votre machine commerciale : acquisition clients, conversion, fidélisation et scalabilité. Score /100 et plan d\'action pour accélérer votre croissance.',
    descEn: 'Assess your commercial engine: customer acquisition, conversion, loyalty and scalability. Score /100 and action plan to accelerate growth.',
    durationFr: '12 questions', durationEn: '12 questions', timeFr: '5 min', timeEn: '5 min', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'Commercial', tagEn: 'Commercial', link: '/tools/performance-commerciale',
    category: 'finance', popular: false,
    image: 'https://readdy.ai/api/search-image?query=commercial%20performance%20sales%20growth%20acquisition%20conversion%20Africa%20business%20modern%20clean%20white%20background%20amber%20orange%20accent%20charts%20CRM%20professional%20consulting%20institutional%20geometric%20minimal&width=600&height=400&seq=tool-perf-14&orientation=landscape',
    stats: [{ valueFr: '4 piliers', valueEn: '4 pillars', labelFr: 'commerciaux', labelEn: 'commercial' }, { valueFr: 'CAC/LTV', valueEn: 'CAC/LTV', labelFr: 'analysé', labelEn: 'analyzed' }, { valueFr: 'Score', valueEn: 'Score', labelFr: '/100', labelEn: '/100' }]
  },
  {
    id: 'benchmark-sectoriel', icon: 'ri-bar-chart-grouped-line', titleFr: 'Benchmark Sectoriel Intelligent', titleEn: 'Intelligent Sector Benchmark',
    descFr: 'Comparez votre performance au marché : productivité, rentabilité, digital, gouvernance, innovation. Découvrez où vous excellez et où vous avez du retard.',
    descEn: 'Compare your performance to the market: productivity, profitability, digital, governance, innovation. Discover where you excel and where you lag.',
    durationFr: '10 questions', durationEn: '10 questions', timeFr: '4 min', timeEn: '4 min', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'Benchmark', tagEn: 'Benchmark', link: '/tools/benchmark-sectoriel',
    category: 'governance', popular: false,
    image: 'https://readdy.ai/api/search-image?query=sector%20benchmark%20market%20comparison%20performance%20ranking%20Africa%20business%20abstract%20modern%20clean%20white%20background%20dark%20blue%20indigo%20accent%20bar%20charts%20competitive%20analysis%20professional%20consulting%20institutional%20geometric%20minimal&width=600&height=400&seq=tool-bench-15&orientation=landscape',
    stats: [{ valueFr: '5 domaines', valueEn: '5 areas', labelFr: 'comparés', labelEn: 'compared' }, { valueFr: 'Vs marché', valueEn: 'Vs market', labelFr: 'Afrique', labelEn: 'Africa' }, { valueFr: 'Position', valueEn: 'Position', labelFr: 'sectorielle', labelEn: 'sector' }]
  },
  {
    id: 'audit-inclusion-financiere', icon: 'ri-hand-heart-line', titleFr: 'Audit Inclusion Financière', titleEn: 'Financial Inclusion Audit',
    descFr: 'Évaluez votre conformité BCEAO/UEMOA en inclusion financière : conformité réglementaire, accessibilité, protection clients et impact social.',
    descEn: 'Assess your BCEAO/UEMOA compliance in financial inclusion: regulatory compliance, accessibility, client protection and social impact.',
    durationFr: '20 questions', durationEn: '20 questions', timeFr: '9 min', timeEn: '9 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Inclusion', tagEn: 'Inclusion', link: '/tools/audit-inclusion-financiere',
    category: 'compliance', popular: false,
    image: 'https://readdy.ai/api/search-image?query=financial%20inclusion%20Africa%20community%20microfinance%20UEMOA%20BCEAO%20abstract%20modern%20clean%20white%20background%20emerald%20green%20accent%20social%20impact%20map%20continent%20geometric%20minimal%20consulting&width=600&height=400&seq=tool-inclusion-06&orientation=landscape',
    stats: [{ valueFr: 'UEMOA', valueEn: 'UEMOA', labelFr: 'BCEAO', labelEn: 'BCEAO' }, { valueFr: '4 axes', valueEn: '4 axes', labelFr: 'sociaux', labelEn: 'social' }, { valueFr: 'Impact', valueEn: 'Impact', labelFr: 'mesuré', labelEn: 'measured' }]
  },
  {
    id: 'simulateur-roi-marketing', icon: 'ri-line-chart-line', titleFr: 'Simulateur ROI Marketing', titleEn: 'Marketing ROI Simulator',
    descFr: 'Calculez en temps réel votre CAC, LTV, ROI et ROAS marketing. Ajustez les sliders pour simuler différents scénarios et obtenir des recommandations stratégiques.',
    descEn: 'Calculate your CAC, LTV, ROI and marketing ROAS in real time. Adjust sliders to simulate different scenarios and get strategic recommendations.',
    durationFr: '8 sliders', durationEn: '8 sliders', timeFr: '3 min', timeEn: '3 min', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'Marketing', tagEn: 'Marketing', link: '/tools/simulateur-roi-marketing',
    category: 'finance', popular: false,
    image: 'https://readdy.ai/api/search-image?query=marketing%20ROI%20dashboard%20analytics%20growth%20metrics%20CAC%20LTV%20conversion%20funnel%20modern%20clean%20white%20background%20amber%20gold%20accent%20charts%20graphs%20professional%20consulting%20Africa%20business%20geometric%20minimal&width=600&height=400&seq=tool-roi-16&orientation=landscape',
    stats: [{ valueFr: 'CAC/LTV', valueEn: 'CAC/LTV', labelFr: 'calculés', labelEn: 'calculated' }, { valueFr: 'ROI/ROAS', valueEn: 'ROI/ROAS', labelFr: 'simulés', labelEn: 'simulated' }, { valueFr: 'Rapport', valueEn: 'Report', labelFr: 'PDF + CSV', labelEn: 'PDF + CSV' }]
  },
  {
    id: 'generateur-roadmap-innovation', icon: 'ri-map-2-line', titleFr: 'Générateur Roadmap Innovation', titleEn: 'Innovation Roadmap Generator',
    descFr: 'Sélectionnez vos initiatives de transformation parmi 5 piliers : digital, produit, expérience client, excellence opérationnelle et capital humain. Générez une roadmap sur 24 mois.',
    descEn: 'Select your transformation initiatives from 5 pillars: digital, product, customer experience, operational excellence and human capital. Generate a 24-month roadmap.',
    durationFr: '15 initiatives', durationEn: '15 initiatives', timeFr: '4 min', timeEn: '4 min', levelFr: 'Intermédiaire', levelEn: 'Intermediate',
    tagFr: 'Innovation', tagEn: 'Innovation', link: '/tools/generateur-roadmap-innovation',
    category: 'digital', popular: false,
    image: 'https://readdy.ai/api/search-image?query=innovation%20roadmap%20strategic%20planning%20digital%20transformation%20timeline%20milestones%20modern%20clean%20white%20background%20violet%20purple%20accent%20geometric%20shapes%20professional%20consulting%20Africa%20business%20growth&width=600&height=400&seq=tool-roadmap-17&orientation=landscape',
    stats: [{ valueFr: '5 piliers', valueEn: '5 pillars', labelFr: 'stratégiques', labelEn: 'strategic' }, { valueFr: '24 mois', valueEn: '24 months', labelFr: 'de roadmap', labelEn: 'roadmap' }, { valueFr: 'Dépendances', valueEn: 'Dependencies', labelFr: 'gérées', labelEn: 'managed' }]
  },
  {
    id: 'tableau-kpi-qualite', icon: 'ri-dashboard-3-line', titleFr: 'Tableau KPI Qualité', titleEn: 'Quality KPI Dashboard',
    descFr: 'Suivez 11 indicateurs qualité clés : NPS, CSAT, taux d\'erreur, conformité BCEAO/OHADA. Score global, analyse par catégorie et recommandations. Export CSV et PDF.',
    descEn: 'Track 11 key quality indicators: NPS, CSAT, error rate, BCEAO/OHADA compliance. Global score, category analysis and recommendations. CSV and PDF export.',
    durationFr: '11 KPIs', durationEn: '11 KPIs', timeFr: '5 min', timeEn: '5 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Qualité', tagEn: 'Quality', link: '/tools/tableau-kpi-qualite',
    category: 'governance', popular: false,
    image: 'https://readdy.ai/api/search-image?query=quality%20KPI%20dashboard%20control%20panel%20metrics%20NPS%20CSAT%20compliance%20ISO%20modern%20clean%20white%20background%20teal%20green%20accent%20gauges%20charts%20professional%20consulting%20Africa%20business%20geometric%20minimal&width=600&height=400&seq=tool-kpi-18&orientation=landscape',
    stats: [{ valueFr: '11 KPIs', valueEn: '11 KPIs', labelFr: 'qualité', labelEn: 'quality' }, { valueFr: 'Score', valueEn: 'Score', labelFr: '/100', labelEn: '/100' }, { valueFr: 'Export', valueEn: 'Export', labelFr: 'CSV + PDF', labelEn: 'CSV + PDF' }]
  },
  {
    id: 'diagnostic-rh-strategique', icon: 'ri-team-line', titleFr: 'Diagnostic RH Stratégique', titleEn: 'Strategic HR Diagnostic',
    descFr: 'Évaluez la maturité de votre fonction RH en 6 piliers : gouvernance, recrutement, performance, compétences, administration et climat social. Score /100, risques identifiés, plan d\'action priorisé.',
    descEn: 'Assess your HR function maturity across 6 pillars: governance, recruitment, performance, skills, administration and social climate. Score /100, identified risks, prioritized action plan.',
    durationFr: '18 questions', durationEn: '18 questions', timeFr: '6 min', timeEn: '6 min', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'RH', tagEn: 'HR', link: '/tools/diagnostic-rh-strategique',
    category: 'rh', popular: true,
    image: 'https://readdy.ai/api/search-image?query=human%20resources%20strategic%20diagnostic%20team%20management%20talent%20development%20Africa%20modern%20clean%20white%20background%20rose%20pink%20accent%20people%20icons%20organizational%20chart%20professional%20consulting%20geometric%20minimal&width=600&height=400&seq=tool-rh-19&orientation=landscape',
    stats: [{ valueFr: '6 piliers', valueEn: '6 pillars', labelFr: 'RH', labelEn: 'HR' }, { valueFr: 'Risques', valueEn: 'Risks', labelFr: 'identifiés', labelEn: 'identified' }, { valueFr: 'Plan', valueEn: 'Action', labelFr: 'priorisé', labelEn: 'plan' }]
  },
  {
    id: 'diagnostic-esg-impact', icon: 'ri-leaf-line', titleFr: 'Diagnostic ESG & Impact Social', titleEn: 'ESG & Social Impact Diagnostic',
    descFr: 'Évaluez votre maturité ESG et votre impact social en 4 piliers : environnement, social & droits humains, gouvernance & éthique, impact social mesurable. Score /100, risques identifiés, plan d\'action priorisé.',
    descEn: 'Assess your ESG maturity and social impact across 4 pillars: environment, social & human rights, governance & ethics, measurable social impact. Score /100, identified risks, prioritized action plan.',
    durationFr: '12 questions', durationEn: '12 questions', timeFr: '5 min', timeEn: '5 min', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'ESG', tagEn: 'ESG', link: '/tools/diagnostic-esg-impact',
    category: 'esg', popular: true,
    image: 'https://readdy.ai/api/search-image?query=ESG%20sustainability%20social%20impact%20Africa%20green%20business%20environmental%20governance%20ethical%20investment%20modern%20clean%20white%20background%20emerald%20green%20accent%20leaf%20globe%20people%20community%20geometric%20minimal%20professional%20consulting&width=600&height=400&seq=tool-esg-20&orientation=landscape',
    stats: [{ valueFr: '4 piliers', valueEn: '4 pillars', labelFr: 'ESG', labelEn: 'ESG' }, { valueFr: 'Impact', valueEn: 'Impact', labelFr: 'mesuré', labelEn: 'measured' }, { valueFr: 'Plan', valueEn: 'Action', labelFr: 'priorisé', labelEn: 'plan' }]
  },
  // ── BIG FOUR — Diagnostics Premium KHEPRA™ ──────────────────────
  {
    id: 'diagnostic-prix-transfert', icon: 'ri-exchange-funds-line', titleFr: 'Diagnostic Risque Prix de Transfert KHEPRA™', titleEn: 'Transfer Pricing Risk Diagnostic KHEPRA™',
    descFr: 'Évaluez votre exposition au risque de redressement fiscal en 5 axes : Documentation OCDE BEPS, Management Fees, Financements Intragroupe, Actifs Incorporels, Gouvernance Fiscale. Score /100, classification Premium et plan d\'action.',
    descEn: 'Assess your transfer pricing risk exposure across 5 axes: OECD BEPS Documentation, Management Fees, Intragroup Financing, Intangible Assets, Tax Governance. Score /100, Premium classification and action plan.',
    durationFr: '25 questions', durationEn: '25 questions', timeFr: '8 min', timeEn: '8 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Prix de transfert', tagEn: 'Transfer Pricing', link: '/tools/diagnostic-prix-transfert',
    category: 'compliance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=transfer%20pricing%20international%20tax%20compliance%20OECD%20BEPS%20documentation%20financial%20analysis%20Africa%20francophone%20corporate%20abstract%20modern%20clean%20white%20background%20dark%20green%20amber%20gold%20accent%20geometric%20charts%20professional%20consulting%20institutional&width=600&height=400&seq=tool-prix-transfert-21&orientation=landscape',
    stats: [{ valueFr: '5 axes', valueEn: '5 axes', labelFr: 'BEPS OCDE', labelEn: 'BEPS OECD' }, { valueFr: 'Score', valueEn: 'Score', labelFr: '/100', labelEn: '/100' }, { valueFr: 'Rapport', valueEn: 'Report', labelFr: 'risques', labelEn: 'risks' }]
  },
  {
    id: 'diagnostic-pre-inspection-bceao-cobac', icon: 'ri-shield-flash-line', titleFr: 'Diagnostic Pré-Inspection BCEAO/COBAC KHEPRA™', titleEn: 'Pre-Inspection BCEAO/COBAC Diagnostic KHEPRA™',
    descFr: 'Préparez votre institution à une inspection prudentielle en évaluant 5 domaines : Gouvernance, Contrôle Interne, Conformité LBC/FT, Gestion des Risques, Cybersécurité & PCA. 25 constats les plus fréquents analysés.',
    descEn: 'Prepare your institution for a prudential inspection by evaluating 5 domains: Governance, Internal Control, AML/CFT Compliance, Risk Management, Cybersecurity & BCP. 25 most frequent findings analyzed.',
    durationFr: '25 questions', durationEn: '25 questions', timeFr: '8 min', timeEn: '8 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Inspection', tagEn: 'Inspection', link: '/tools/diagnostic-pre-inspection-bceao-cobac',
    category: 'compliance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=African%20central%20bank%20regulatory%20inspection%20team%20conducting%20prudential%20compliance%20audit%20examination%20modern%20financial%20institution%20internal%20control%20documentation%20LBCFT%20procedures%20professional%20abstract%20clean%20white%20background%20cyan%20amber%20green%20tones%20institutional%20banking%20supervision%20west%20Africa&width=600&height=400&seq=tool-inspection-22&orientation=landscape',
    stats: [{ valueFr: '5 domaines', valueEn: '5 domains', labelFr: 'BCEAO/COBAC', labelEn: 'BCEAO/COBAC' }, { valueFr: 'Score', valueEn: 'Score', labelFr: '/100', labelEn: '/100' }, { valueFr: '25 constats', valueEn: '25 findings', labelFr: 'analysés', labelEn: 'analyzed' }]
  },
  {
    id: 'diagnostic-perennite-familiale', icon: 'ri-home-heart-line', titleFr: 'Indice de Pérennité Familiale KHEPRA™', titleEn: 'Family Sustainability Index KHEPRA™',
    descFr: 'Évaluez la pérennité de votre groupe familial sur 5 axes : Gouvernance Familiale, Transmission & Succession, Préservation du Patrimoine, Gestion des Conflits, Professionnalisation. 6 niveaux de classification.',
    descEn: 'Assess your family group sustainability across 5 axes: Family Governance, Transmission & Succession, Wealth Preservation, Conflict Management, Professionalization. 6 classification levels.',
    durationFr: '25 questions', durationEn: '25 questions', timeFr: '8 min', timeEn: '8 min', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'Famille', tagEn: 'Family', link: '/tools/diagnostic-perennite-familiale',
    category: 'governance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=African%20family%20business%20multigenerational%20leadership%20transition%20formal%20boardroom%20meeting%20senior%20patriarch%20handing%20key%20to%20next%20generation%20professional%20warm%20amber%20tones%20dark%20wood%20modern%20African%20corporate%20governance%20legacy%20planning%20abstract%20clean%20background&width=600&height=400&seq=tool-perennite-23&orientation=landscape',
    stats: [{ valueFr: '5 axes', valueEn: '5 axes', labelFr: 'famille', labelEn: 'family' }, { valueFr: '6 niveaux', valueEn: '6 levels', labelFr: 'classification', labelEn: 'classification' }, { valueFr: 'Rapport', valueEn: 'Report', labelFr: 'recommandations', labelEn: 'recommendations' }]
  },
  {
    id: 'diagnostic-maturite-pilotage-strategique', icon: 'ri-compass-discover-line', titleFr: 'Score de Maturité Pilotage Stratégique KHEPRA™', titleEn: 'Strategic Steering Maturity Score KHEPRA™',
    descFr: 'Évaluez la maturité de votre pilotage stratégique sur 5 axes : Pilotage Stratégique, Gouvernance, Gestion des Risques, Performance & Pilotage, Prise de Décision & Valeur. 5 niveaux : Rudimentaire à Excellence.',
    descEn: 'Assess your strategic steering maturity across 5 axes: Strategic Steering, Governance, Risk Management, Performance & Steering, Decision-Making & Value. 5 levels: Rudimentary to Strategic Excellence.',
    durationFr: '25 questions', durationEn: '25 questions', timeFr: '8 min', timeEn: '8 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'CEO', tagEn: 'CEO', link: '/tools/diagnostic-maturite-pilotage-strategique',
    category: 'governance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=African%20CEO%20executive%20strategic%20boardroom%20meeting%20panoramic%20tower%20windows%20modern%20corporate%20overlooking%20Abidjan%20skyline%20senior%20leaders%20analyzing%20strategy%20dashboard%20large%20screen%20warm%20amber%20green%20serious%20atmosphere%20abstract%20clean%20background%20institutional&width=600&height=400&seq=tool-maturite-24&orientation=landscape',
    stats: [{ valueFr: '5 axes', valueEn: '5 axes', labelFr: 'maturité', labelEn: 'maturity' }, { valueFr: '5 niveaux', valueEn: '5 levels', labelFr: 'classification', labelEn: 'classification' }, { valueFr: 'Rapport', valueEn: 'Report', labelFr: 'actions', labelEn: 'actions' }]
  },
  {
    id: 'diagnostic-bancabilite', icon: 'ri-bank-line', titleFr: 'Indice de Bancabilité KHEPRA™', titleEn: 'Bankability Index KHEPRA™',
    descFr: 'Évaluez la bancabilité de votre projet pour les investisseurs sur 5 axes : Stratégie & Business Model, Gouvernance & Équipe, Performance Financière, Due Diligence & Conformité, Structuration de l\'Investissement.',
    descEn: 'Assess your project bankability for investors across 5 axes: Strategy & Business Model, Governance & Team, Financial Performance, Due Diligence & Compliance, Investment Structuring.',
    durationFr: '25 questions', durationEn: '25 questions', timeFr: '8 min', timeEn: '8 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Investisseurs', tagEn: 'Investors', link: '/tools/diagnostic-bancabilite',
    category: 'finance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=African%20entrepreneur%20presenting%20investment%20pitch%20to%20international%20investors%20modern%20boardroom%20city%20skyline%20professional%20confident%20founder%20financial%20projections%20screen%20warm%20amber%20teal%20tones%20serious%20valuation%20due%20diligence%20investment%20readiness%20institutional%20grade%20abstract%20clean%20background&width=600&height=400&seq=tool-bancabilite-25&orientation=landscape',
    stats: [{ valueFr: '5 axes', valueEn: '5 axes', labelFr: 'bancabilité', labelEn: 'bankability' }, { valueFr: 'Score', valueEn: 'Score', labelFr: '/100', labelEn: '/100' }, { valueFr: 'Plan', valueEn: 'Action', labelFr: 'investisseurs', labelEn: 'plan' }]
  },
  // ── ULTRA LEAD MAGNETS BIG FOUR KILLER ──────────────────────
  {
    id: 'simulateur-solvabilite-uemoa', icon: 'ri-bank-line', titleFr: 'Simulateur Solvabilité UEMOA 2026 KHEPRA™', titleEn: 'UEMOA 2026 Solvency Simulator KHEPRA™',
    descFr: 'Simulez vos 8 ratios prudentiels BCEAO. Obtenez votre écart vs seuils réglementaires, 3 actions correctives et votre score global sur 100. Rapport PDF inclus.',
    descEn: 'Simulate your 8 BCEAO prudential ratios. Get your gap vs regulatory thresholds, 3 corrective actions and your global score out of 100. PDF report included.',
    durationFr: '8 ratios BCEAO', durationEn: '8 BCEAO ratios', timeFr: '5 min', timeEn: '5 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Solvabilité', tagEn: 'Solvency', link: '/tools/simulateur-solvabilite-uemoa',
    category: 'finance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=banking%20prudential%20solvency%20dashboard%20BCEAO%20compliance%20abstract%20modern%20clean%20white%20background%20teal%20dark%20green%20accent%20financial%20charts%20ratios%20professional%20consulting%20institutional%20geometric%20minimal%20Africa%20regulatory&width=600&height=400&seq=tool-solvability-26&orientation=landscape',
    stats: [{ valueFr: '8 ratios', valueEn: '8 ratios', labelFr: 'BCEAO', labelEn: 'BCEAO' }, { valueFr: '3 actions', valueEn: '3 actions', labelFr: 'correctives', labelEn: 'corrective' }, { valueFr: 'PDF', valueEn: 'PDF', labelFr: 'branded', labelEn: 'branded' }]
  },
  {
    id: 'scorecard-agrement-readiness', icon: 'ri-bank-card-line', titleFr: 'Agrément Readiness Scorecard KHEPRA™', titleEn: 'License Readiness Scorecard KHEPRA™',
    descFr: 'Évaluez votre préparation à l\'agrément bancaire/fintech/EMF. Score J0-J270, Gap list, Roadmap 6 piliers. 15 questions, résultat immédiat.',
    descEn: 'Assess your banking/fintech/MFI licensing readiness. J0-J270 Score, Gap list, 6-pillar Roadmap. 15 questions, instant result.',
    durationFr: '6 piliers', durationEn: '6 pillars', timeFr: '6 min', timeEn: '6 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'Agrément', tagEn: 'Licensing', link: '/tools/scorecard-agrement-readiness',
    category: 'compliance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=African%20banking%20license%20application%20document%20approval%20stamp%20BCEAO%20COBAC%20regulator%20official%20seal%20professional%20abstract%20clean%20white%20background%20emerald%20green%20gold%20accent%20shield%20protection%20institutional%20geometric%20minimal%20consulting&width=600&height=400&seq=tool-agrement-27&orientation=landscape',
    stats: [{ valueFr: 'J0-J270', valueEn: 'J0-J270', labelFr: 'Roadmap', labelEn: 'Roadmap' }, { valueFr: '6 piliers', valueEn: '6 pillars', labelFr: 'BCEAO/COBAC', labelEn: 'BCEAO/COBAC' }, { valueFr: 'Score', valueEn: 'Score', labelFr: '/100', labelEn: '/100' }]
  },
  {
    id: 'regulatory-citation-checker', icon: 'ri-scales-3-line', titleFr: 'Regulatory Citation Checker GPT', titleEn: 'Regulatory Citation Checker GPT',
    descFr: 'Collez un extrait de rapport et obtenez un score de fiabilité réglementaire 0-100. Sources officielles BCEAO/COBAC/OHADA identifiées. 3 vérifications gratuites/jour.',
    descEn: 'Paste a report excerpt and get a 0-100 regulatory reliability score. Official BCEAO/COBAC/OHADA sources identified. 3 free checks/day.',
    durationFr: '3 vérif./jour', durationEn: '3 checks/day', timeFr: '20 sec', timeEn: '20 sec', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'Citation', tagEn: 'Citation', link: '/tools/regulatory-citation-checker',
    category: 'compliance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=legal%20document%20verification%20stamp%20magnifying%20glass%20official%20text%20regulatory%20compliance%20certificate%20abstract%20modern%20clean%20white%20background%20amber%20gold%20accent%20professional%20consulting%20Africa%20institutional%20geometric%20minimal%20shield&width=600&height=400&seq=tool-citation-28&orientation=landscape',
    stats: [{ valueFr: '0-100', valueEn: '0-100', labelFr: 'Score', labelEn: 'Score' }, { valueFr: 'BCEAO', valueEn: 'BCEAO', labelFr: 'COBAC', labelEn: 'COBAC' }, { valueFr: '3/jour', valueEn: '3/day', labelFr: 'Gratuit', labelEn: 'Free' }]
  },
  {
    id: 'ao-battle-card-generator', icon: 'ri-sword-line', titleFr: 'AO Battle Card Generator', titleEn: 'AO Battle Card Generator',
    descFr: 'Sélectionnez un appel d\'offres et générez votre Battle Card : Forces/Faiblesses vs 3 concurrents, Win Themes et Prix Recommandé. 51 AO actifs en base.',
    descEn: 'Select a tender and generate your Battle Card: Strengths/Weaknesses vs 3 competitors, Win Themes and Recommended Price. 51 active tenders.',
    durationFr: '51 AO actifs', durationEn: '51 active tenders', timeFr: '2 min', timeEn: '2 min', levelFr: 'Avancé', levelEn: 'Advanced',
    tagFr: 'AO/AMI', tagEn: 'Tender', link: '/tools/ao-battle-card-generator',
    category: 'governance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=business%20competition%20battle%20strategy%20war%20room%20chess%20board%20corporate%20rivalry%20Africa%20abstract%20modern%20clean%20white%20background%20dark%20red%20crimson%20accent%20professional%20consulting%20institutional%20geometric%20minimal%20swords%20competitive%20analysis&width=600&height=400&seq=tool-battle-29&orientation=landscape',
    stats: [{ valueFr: '51 AO', valueEn: '51 AO', labelFr: '18.155 Md', labelEn: '18.155 Bn' }, { valueFr: '3 conc.', valueEn: '3 comp.', labelFr: 'analysés', labelEn: 'analyzed' }, { valueFr: 'Win rate', valueEn: 'Win rate', labelFr: '68%', labelEn: '68%' }]
  },
  {
    id: 'knowledge-gap-audit', icon: 'ri-brain-line', titleFr: 'Knowledge Gap Audit 5min', titleEn: 'Knowledge Gap Audit 5min',
    descFr: 'Décrivez votre procédure interne. Notre RAG compare à 1.1M embeddings : heatmap ISO 30401 + BCEAO + % conformité. Effet miroir immédiat.',
    descEn: 'Describe your internal procedure. Our RAG compares to 1.1M embeddings: ISO 30401 + BCEAO heatmap + % compliance. Immediate mirror effect.',
    durationFr: '1.1M embeddings', durationEn: '1.1M embeddings', timeFr: '5 min', timeEn: '5 min', levelFr: 'Tous niveaux', levelEn: 'All levels',
    tagFr: 'Audit', tagEn: 'Audit', link: '/tools/knowledge-gap-audit',
    category: 'compliance', popular: true,
    image: 'https://readdy.ai/api/search-image?query=knowledge%20management%20gap%20analysis%20heatmap%20brain%20neural%20network%20data%20audit%20abstract%20modern%20clean%20white%20background%20teal%20emerald%20green%20accent%20professional%20consulting%20Africa%20institutional%20geometric%20minimal%20AI%20intelligence&width=600&height=400&seq=tool-gap-30&orientation=landscape',
    stats: [{ valueFr: 'RAG', valueEn: 'RAG', labelFr: '1.1M emb.', labelEn: '1.1M emb.' }, { valueFr: 'ISO 30401', valueEn: 'ISO 30401', labelFr: 'BCEAO', labelEn: 'BCEAO' }, { valueFr: 'Heatmap', valueEn: 'Heatmap', labelFr: 'gaps', labelEn: 'gaps' }]
  },
];

const CATEGORIES = [
  { id: 'all', labelFr: 'Tous', labelEn: 'All', icon: 'ri-grid-line' },
  { id: 'popular', labelFr: 'Populaires', labelEn: 'Popular', icon: 'ri-fire-line' },
  { id: 'governance', labelFr: 'Gouvernance', labelEn: 'Governance', icon: 'ri-government-line' },
  { id: 'finance', labelFr: 'Finance', labelEn: 'Finance', icon: 'ri-funds-line' },
  { id: 'digital', labelFr: 'Digital', labelEn: 'Digital', icon: 'ri-smartphone-line' },
  { id: 'compliance', labelFr: 'Conformité', labelEn: 'Compliance', icon: 'ri-shield-check-line' },
  { id: 'rh', labelFr: 'RH', labelEn: 'HR', icon: 'ri-team-line' },
  { id: 'esg', labelFr: 'ESG', labelEn: 'ESG', icon: 'ri-leaf-line' },
  { id: 'risks', labelFr: 'Risques', labelEn: 'Risks', icon: 'ri-radar-line' },
];

export default function ToolsPage() {
  const { i18n } = useTranslation();
  const isFr = !i18n.language.startsWith('en');
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesCategory =
      activeCategory === 'all' || activeCategory === 'popular'
        ? activeCategory === 'all' || tool.popular
        : tool.category === activeCategory;

    if (!searchQuery) return matchesCategory;

    const q = searchQuery.toLowerCase();
    const searchFields = [
      tool.titleFr.toLowerCase(),
      tool.titleEn.toLowerCase(),
      tool.descFr.toLowerCase(),
      tool.descEn.toLowerCase(),
      tool.tagFr.toLowerCase(),
      tool.tagEn.toLowerCase(),
    ];
    return matchesCategory && searchFields.some((f) => f.includes(q));
  });

  const breadcrumbItems = [
    { label: isFr ? 'Accueil' : 'Home', path: '/' },
    { label: isFr ? 'Outils de Diagnostic' : 'Diagnostic Tools', path: '/tools' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/tools#webpage`,
        url: `${SITE_URL}/tools`,
        name: isFr ? 'Outils de Diagnostic Interactifs | KHEPRA EXPERTS' : 'Interactive Diagnostic Tools | KHEPRA EXPERTS',
        description: isFr
          ? 'Évaluez votre organisation avec nos 25 outils interactifs gratuits : diagnostics stratégiques, financiers, organisationnels, maturité digitale, gouvernance, cybersécurité, inclusion financière, fintech, transformation digitale, benchmark sectoriel, RH, qualité, ESG et nos Ultra Lead Magnets Big Four.'
          : 'Assess your organization with our 25 free interactive tools: strategic, financial, organizational diagnostics, digital maturity, governance, cybersecurity, financial inclusion, fintech, digital transformation, sector benchmark, HR, quality, ESG and our Ultra Lead Magnets Big Four.',
        inLanguage: isFr ? 'fr-FR' : 'en-US',
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '.tool-description'],
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: isFr ? 'Accueil' : 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: isFr ? 'Outils de Diagnostic' : 'Diagnostic Tools', item: `${SITE_URL}/tools` },
          ],
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/tools#itemlist`,
        name: isFr ? 'Outils de diagnostic KHEPRA EXPERTS' : 'KHEPRA EXPERTS diagnostic tools',
        numberOfItems: TOOLS_DATA.length,
        itemListElement: TOOLS_DATA.map((tool, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'SoftwareApplication',
            '@id': `${SITE_URL}${tool.link}`,
            name: isFr ? tool.titleFr : tool.titleEn,
            description: isFr ? tool.descFr : tool.descEn,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            inLanguage: isFr ? 'fr-FR' : 'en-US',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'XOF', availability: 'https://schema.org/InStock' },
            provider: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
          }
        }))
      },
      {
        '@type': 'HowTo',
        '@id': `${SITE_URL}/tools#howto`,
        name: isFr ? 'Comment utiliser les outils de diagnostic KHEPRA EXPERTS' : 'How to use KHEPRA EXPERTS diagnostic tools',
        description: isFr
          ? 'Guide d’utilisation des 20 diagnostics interactifs gratuits pour évaluer votre organisation en Afrique'
          : 'Guide to using 20 free interactive diagnostics to assess your organization in Africa',
        totalTime: 'PT15M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: isFr ? 'Sélectionnez votre outil' : 'Select your tool',
            text: isFr ? 'Choisissez parmi 20 diagnostics spécialisés : gouvernance, finance, digital, RH, ESG, conformité.' : 'Choose from 20 specialized diagnostics: governance, finance, digital, HR, ESG, compliance.',
            url: `${SITE_URL}/tools`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: isFr ? 'Répondez aux questions' : 'Answer the questions',
            text: isFr ? 'Complétez le questionnaire en 5 à 15 minutes. Questions claires, réponses guidées.' : 'Complete the questionnaire in 5 to 15 minutes. Clear questions, guided answers.',
            url: `${SITE_URL}/tools`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: isFr ? 'Téléchargez votre rapport PDF' : 'Download your PDF report',
            text: isFr ? 'Obtenez immédiatement votre score, vos axes d’amélioration et un rapport PDF téléchargeable.' : 'Immediately get your score, improvement areas and a downloadable PDF report.',
            url: `${SITE_URL}/tools`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/tools#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: isFr ? 'Les outils de diagnostic sont-ils vraiment gratuits ?' : 'Are the diagnostic tools really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? 'Oui, tous les 25 outils de diagnostic KHEPRA EXPERTS sont entièrement gratuits. Ils incluent un questionnaire interactif, un score personnalisé, des recommandations et un rapport PDF téléchargeable.'
                : 'Yes, all 25 KHEPRA EXPERTS diagnostic tools are completely free. They include an interactive questionnaire, a personalized score, recommendations and a downloadable PDF report.',
            },
          },
          {
            '@type': 'Question',
            name: isFr ? 'Combien de temps prend un diagnostic ?' : 'How long does a diagnostic take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? 'La durée varie selon l’outil : de 3 minutes pour le simulateur ROI marketing à 18 minutes pour l’évaluation cybersécurité. La majorité des diagnostics prennent entre 5 et 10 minutes.'
                : 'Duration varies by tool: from 3 minutes for the marketing ROI simulator to 18 minutes for the cybersecurity assessment. Most diagnostics take between 5 and 10 minutes.',
            },
          },
          {
            '@type': 'Question',
            name: isFr ? 'Les diagnostics sont-ils adaptés au contexte africain ?' : 'Are the diagnostics adapted to the African context?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? 'Absolument. Tous les outils intègrent les référentiels BCEAO, COBAC, OHADA et les standards africains (UEMOA, CEMAC). Ils ont été conçus par des experts avec 22+ ans d’expérience terrain en Afrique de l’Ouest et Centrale.'
                : 'Absolutely. All tools integrate BCEAO, COBAC, OHADA and African standards (UEMOA, CEMAC). They were designed by experts with 22+ years of field experience in West and Central Africa.',
            },
          },
          {
            '@type': 'Question',
            name: isFr ? 'Puis-je obtenir un accompagnement personnalisé après le diagnostic ?' : 'Can I get personalized support after the diagnostic?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? 'Oui. Après chaque diagnostic, vous pouvez demander un accompagnement personnalisé par nos consultants KHEPRA EXPERTS pour la mise en oeuvre des recommandations. Prenez rendez-vous sur khepraexperts.com/contact.'
                : 'Yes. After each diagnostic, you can request personalized support from our KHEPRA EXPERTS consultants for implementing the recommendations. Book an appointment at khepraexperts.com/contact.',
            },
          },
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/hero-executive.webp` },
        foundingDate: '2002',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lomé',
          addressRegion: 'Maritime',
          addressCountry: 'TG',
        },
      },
    ]
  };

  return (
    <>
      <SeoHead
        title={isFr ? 'Outils Diagnostics | Khepra Experts — 20 Évaluations Gratuites Afrique' : 'Diagnostic Tools | Khepra Experts — 20 Free Assessments Africa'}
        description={isFr
          ? 'Évaluez votre organisation gratuitement : gouvernance BCEAO/OHADA, maturité digitale, conformité, fintech, RH, ESG. Score personnalisé + rapport PDF. 5–15 min.'
          : 'Assess your organization for free: BCEAO/OHADA governance, digital maturity, compliance, fintech, HR, ESG. Personalized score + PDF report. 5–15 min.'}
        keywords={isFr
          ? 'diagnostic organisationnel, maturité digitale, évaluation gouvernance, BCEAO, OHADA, audit gratuit, fintech Afrique, inclusion financière'
          : 'organizational diagnostic, digital maturity, governance assessment, BCEAO, OHADA, free audit, fintech Africa, financial inclusion'}
        canonicalPath="/tools"
        ogImage={OG_IMAGES.TOOLS}
        ogImageAlt="Outils de diagnostic interactifs – KHEPRA EXPERTS | Évaluation digitale et stratégique en Afrique"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        structuredData={jsonLd}
      />

      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Africa%20business%20consulting%20strategy%20digital%20transformation%20abstract%20geometric%20pattern%20dark%20navy%20background%20gold%20accent%20lines%20professional%20institutional%20modern%20minimalist%20luxury%20consulting%20firm&width=1440&height=700&seq=tools-hero-bg-01&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background-950/90 via-background-900/85 to-primary-950/80" />
          </div>

          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={breadcrumbItems} className="mb-8 [&_*]:text-white/60 [&_a]:hover:text-white" />

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 border border-primary-400/30 text-primary-300 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <i className="ri-tools-line" />
                <span>{isFr ? '25 outils gratuits · Résultats immédiats' : '25 free tools · Immediate results'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                {isFr ? (
                  <>Diagnostics <span className="text-accent-400">stratégiques</span> pour décideurs africains</>
                ) : (
                  <>Strategic <span className="text-accent-400">diagnostics</span> for African leaders</>
                )}
              </h1>

              <p className="text-base text-foreground-300 mb-8 leading-relaxed max-w-2xl">
                {isFr
                  ? 'Évaluez gratuitement votre organisation en quelques minutes. Obtenez un diagnostic personnalisé, un score de maturité et des recommandations concrètes développées par nos experts.'
                  : 'Assess your organization for free in minutes. Get a personalized diagnostic, a maturity score and concrete recommendations developed by our experts.'}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6">
                {[
                  { value: '25', label: isFr ? 'Outils disponibles' : 'Available tools', icon: 'ri-tools-line' },
                  { value: '100%', label: isFr ? 'Gratuit' : 'Free', icon: 'ri-gift-line' },
                  { value: '5–15', label: isFr ? 'Minutes par test' : 'Minutes per test', icon: 'ri-time-line' },
                  { value: 'PDF', label: isFr ? 'Rapport inclus' : 'Report included', icon: 'ri-file-download-line' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-background-50/10 backdrop-blur-sm">
                      <i className={`${stat.icon} text-primary-400 text-base`} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-foreground-400">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SEARCH + FILTERS ── */}
        <section className="sticky top-20 z-30 bg-background-50 border-b border-secondary-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search bar */}
            <div className="flex items-center gap-3 py-3">
              <div className="relative flex-1 max-w-md">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isFr ? 'Rechercher un diagnostic...' : 'Search a diagnostic...'}
                  className="w-full pl-9 pr-4 py-2 rounded-full text-sm bg-background-100 border border-secondary-200 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-400 hover:text-foreground-600 cursor-pointer"
                  >
                    <i className="ri-close-circle-line" />
                  </button>
                )}
              </div>
              <span className="text-sm text-foreground-400 whitespace-nowrap hidden sm:block">
                {filteredTools.length} {isFr ? 'outil(s)' : 'tool(s)'}
              </span>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 pb-3 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${activeCategory === cat.id ? 'bg-foreground-950 text-background-50' : 'bg-secondary-100 text-foreground-500 border border-secondary-200'}`}
                >
                  <i className={`${cat.icon} text-xs`} />
                  {isFr ? cat.labelFr : cat.labelEn}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS GRID ── */}
        <section className="py-16 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Popular highlight when on 'all' or 'popular' */}
            {(activeCategory === 'all' || activeCategory === 'popular') && !searchQuery && (
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100">
                    <i className="ri-fire-line text-accent-600" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground-900">
                    {isFr ? 'Les plus utilisés' : 'Most popular'}
                  </h2>
                  <div className="h-px flex-1 bg-secondary-200" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {TOOLS_DATA.filter(t => t.popular).map((tool) => (
                    <ToolCard key={tool.id} tool={tool} isFr={isFr} hoveredTool={hoveredTool} setHoveredTool={setHoveredTool} />
                  ))}
                </div>
              </div>
            )}

            {/* Main grid */}
            {(activeCategory === 'all' || activeCategory !== 'popular') && !searchQuery && activeCategory === 'all' && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground-900 mb-5">
                  {isFr ? 'Tous les diagnostics' : 'All diagnostics'}
                </h2>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} isFr={isFr} hoveredTool={hoveredTool} setHoveredTool={setHoveredTool} />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-20">
                <i className="ri-search-line text-5xl text-foreground-300 mb-4 block" />
                <p className="text-foreground-500 mb-4">
                  {isFr ? 'Aucun outil ne correspond à votre recherche.' : 'No tools match your search.'}
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-background-900 text-white hover:bg-background-800 transition-colors cursor-pointer"
                >
                  {isFr ? 'Réinitialiser' : 'Reset'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-16 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-4">
                {isFr ? 'Processus simple' : 'Simple process'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground-900 mb-3">
                {isFr ? 'Comment ça fonctionne ?' : 'How does it work?'}
              </h2>
              <p className="text-base text-foreground-500 max-w-2xl mx-auto">
                {isFr
                  ? 'En 3 étapes simples, obtenez un diagnostic professionnel de votre organisation.'
                  : 'In 3 simple steps, get a professional diagnostic of your organization.'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-secondary-200" />

              {[
                {
                  step: '01', icon: 'ri-cursor-line',
                  titleFr: 'Choisissez votre outil', titleEn: 'Choose your tool',
                  descFr: 'Sélectionnez le diagnostic adapté à votre besoin parmi nos 20 outils spécialisés.',
                  descEn: 'Select the diagnostic suited to your need from our 20 specialized tools.',
                  color: 'bg-primary-500'
                },
                {
                  step: '02', icon: 'ri-questionnaire-line',
                  titleFr: 'Répondez aux questions', titleEn: 'Answer the questions',
                  descFr: 'Complétez le questionnaire en 5 à 10 minutes. Questions claires, réponses guidées.',
                  descEn: 'Complete the questionnaire in 5 to 10 minutes. Clear questions, guided answers.',
                  color: 'bg-accent-500'
                },
                {
                  step: '03', icon: 'ri-file-chart-line',
                  titleFr: 'Recevez votre rapport', titleEn: 'Receive your report',
                  descFr: 'Obtenez immédiatement votre score, vos axes d\'amélioration et un rapport PDF téléchargeable.',
                  descEn: 'Immediately get your score, improvement areas and a downloadable PDF report.',
                  color: 'bg-accent-500'
                }
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className={`w-20 h-20 flex items-center justify-center rounded-2xl ${step.color} shadow-lg mb-5 relative z-10`}>
                    <i className={`${step.icon} text-3xl text-white`} />
                    <span className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-primary-500 text-white text-xs font-bold">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground-900 mb-2">{isFr ? step.titleFr : step.titleEn}</h3>
                  <p className="text-sm text-foreground-500 leading-relaxed">{isFr ? step.descFr : step.descEn}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS STRIP ── */}
        <section className="py-14 bg-background-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: 'ri-shield-check-line', valueFr: 'Confidentiel', valueEn: 'Confidential', descFr: 'Données sécurisées', descEn: 'Secure data' },
                { icon: 'ri-speed-line', valueFr: 'Instantané', valueEn: 'Instant', descFr: 'Résultats immédiats', descEn: 'Immediate results' },
                { icon: 'ri-global-line', valueFr: 'Contextualisé', valueEn: 'Contextualized', descFr: 'Normes africaines', descEn: 'African standards' },
                { icon: 'ri-user-star-line', valueFr: 'Expert', valueEn: 'Expert', descFr: 'Développé par nos consultants', descEn: 'Developed by our consultants' },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2.5">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-background-50/5">
                    <i className={`${b.icon} text-xl text-primary-400`} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{isFr ? b.valueFr : b.valueEn}</div>
                    <div className="text-foreground-400 text-xs">{isFr ? b.descFr : b.descEn}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20 bg-background-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Africa%20business%20meeting%20executive%20consulting%20strategy%20boardroom%20professional%20modern%20office%20dark%20background%20gold%20teal%20accent%20institutional%20luxury%20consulting%20firm%20panAfrican&width=1200&height=500&seq=tools-cta-bg-01&orientation=landscape"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background-950/95 via-background-900/90 to-primary-950/80" />

              <div className="relative z-10 p-10 md:p-14 text-center">
                <span className="inline-block px-4 py-1.5 bg-primary-500/20 border border-primary-400/30 text-primary-300 rounded-full text-sm font-medium mb-5">
                  {isFr ? 'Accompagnement personnalisé' : 'Personalized support'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {isFr ? 'Besoin d\'un expert pour aller plus loin ?' : 'Need an expert to go further?'}
                </h2>
                <p className="text-base text-foreground-300 mb-8 max-w-2xl mx-auto">
                  {isFr
                    ? 'Nos consultants analysent vos résultats et vous proposent un plan d\'action sur mesure pour accélérer votre transformation.'
                    : 'Our consultants analyze your results and offer a tailored action plan to accelerate your transformation.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                  >
                    <i className="ri-briefcase-line" />
                    <span>{isFr ? 'Découvrir nos services' : 'Discover our services'}</span>
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-background-50/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-background-50/20 transition-all duration-300 whitespace-nowrap backdrop-blur-sm"
                  >
                    <i className="ri-team-line" />
                    <span>{isFr ? 'Rencontrer nos experts' : 'Meet our experts'}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ToolCard({ tool, isFr, hoveredTool, setHoveredTool }: {
  tool: ToolItem;
  isFr: boolean;
  hoveredTool: string | null;
  setHoveredTool: (id: string | null) => void;
}) {
  const isHovered = hoveredTool === tool.id;

  return (
    <article
      className="group bg-background-50 rounded-2xl overflow-hidden border border-secondary-200 shadow-sm hover:shadow-lg transition-all duration-400 flex flex-col gradient-border glow-gold-hover"
      onMouseEnter={() => setHoveredTool(tool.id)}
      onMouseLeave={() => setHoveredTool(null)}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={tool.image}
          alt={isFr ? tool.titleFr : tool.titleEn}
          className="w-full h-full object-cover object-top transition-transform duration-600 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-900/60 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-background-50/95 text-primary-700">
            {isFr ? tool.tagFr : tool.tagEn}
          </span>
          {tool.popular && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-accent-500 text-white flex items-center gap-1">
              <i className="ri-fire-line" />
              {isFr ? 'Populaire' : 'Popular'}
            </span>
          )}
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-background-900/50 backdrop-blur-sm rounded-full">
          <i className="ri-time-line text-white text-xs" />
          <span className="text-white text-xs font-medium">{isFr ? tool.timeFr : tool.timeEn}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold text-foreground-400 uppercase tracking-wider">
            {isFr ? tool.durationFr : tool.durationEn}
          </span>
          <span className="text-[11px] text-foreground-300">·</span>
          <span className="text-[11px] font-medium text-foreground-400">{isFr ? tool.levelFr : tool.levelEn}</span>
        </div>

        <h3 className="text-lg font-bold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors duration-300 leading-snug line-clamp-2" title={isFr ? tool.titleFr : tool.titleEn}>
          {isFr ? tool.titleFr : tool.titleEn}
        </h3>

        <p className="text-sm text-foreground-500 leading-relaxed mb-4 flex-1 line-clamp-3">
          {isFr ? tool.descFr : tool.descEn}
        </p>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-xl bg-background-100 border border-secondary-100">
          {tool.stats.map((stat, si) => (
            <div key={si} className="text-center">
              <div className="text-sm font-bold text-foreground-800">{isFr ? stat.valueFr : stat.valueEn}</div>
              <div className="text-[10px] text-foreground-500">{isFr ? stat.labelFr : stat.labelEn}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to={tool.link}
          className="flex items-center justify-between w-full px-4 py-3 bg-background-900 hover:bg-primary-700 text-white font-semibold rounded-xl hover:shadow-md transition-all duration-300 whitespace-nowrap group/btn text-sm"
        >
          <span>{isFr ? 'Démarrer le diagnostic' : 'Start diagnostic'}</span>
          <i className="ri-arrow-right-line text-base group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}