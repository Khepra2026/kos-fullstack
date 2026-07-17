import { useState } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { FAQAccordion } from '@/components/feature/FAQAccordion';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const RISKS = [
  {
    icon: 'ri-error-warning-line',
    titleFr: 'Sanctions pécuniaires BCEAO/COBAC',
    titleEn: 'BCEAO/COBAC Financial Penalties',
    descFr: 'Des amendes pouvant atteindre 500 millions FCFA, le doublement des exigences de fonds propres, et la suspension temporaire d\'activité.',
    descEn: 'Fines up to 500 million FCFA, doubled capital requirements, and temporary suspension of operations.',
  },
  {
    icon: 'ri-admin-line',
    titleFr: 'Mise sous administration provisoire',
    titleEn: 'Provisional Administration',
    descFr: 'Nomination d\'un administrateur provisoire par l\'autorité de tutelle, perte de contrôle de la gestion, atteinte irréversible à la réputation.',
    descEn: 'Appointment of a provisional administrator by the regulatory authority, loss of management control, irreversible reputational damage.',
  },
  {
    icon: 'ri-spy-line',
    titleFr: 'Responsabilité pénale des dirigeants',
    titleEn: 'Criminal Liability of Directors',
    descFr: 'Engagement de la responsabilité personnelle des dirigeants en cas de manquements graves à la réglementation prudentielle.',
    descEn: 'Personal liability of directors for serious breaches of prudential regulations.',
  },
  {
    icon: 'ri-bank-line',
    titleFr: 'Retrait d\'agrément',
    titleEn: 'License Revocation',
    descFr: 'Dans les cas les plus graves, retrait pur et simple de l\'agrément bancaire, entraînant la fermeture définitive de l\'établissement.',
    descEn: 'In the most severe cases, outright revocation of the banking license, leading to permanent closure of the institution.',
  },
];

const SERVICES = [
  {
    icon: 'ri-search-eye-line',
    titleFr: 'Pré-inspection BCEAO',
    titleEn: 'BCEAO Pre-inspection',
    descFr: 'Audit à blanc intégral simulant une inspection réelle — dispositif prudentiel, ratios, gouvernance, LBC/FT, risques opérationnels. Notre intervention vise à renforcer la maîtrise des risques réglementaires identifiés avant l\'inspection officielle.',
    descEn: 'Complete mock audit simulating a real inspection — prudential framework, ratios, governance, AML/CFT, operational risks. Our intervention aims to strengthen the control of identified regulatory risks before the official inspection.',
    deliverables: ['Rapport d\'audit à blanc complet', 'Matrice des écarts réglementaires', 'Plan de remédiation priorisé avec calendrier', 'Simulation d\'inspection en conditions réelles'],
    ref: 'BCEAO Circulaires 01/2017 à 03/2017/CB',
  },
  {
    icon: 'ri-shield-check-line',
    titleFr: 'Pré-inspection COBAC',
    titleEn: 'COBAC Pre-inspection',
    descFr: 'Anticipez les missions d\'inspection COBAC en zone CEMAC. Diagnostic de conformité exhaustif aux règlements COBAC R-2001/07, R-2016/01 et R-2018/01. Notre intervention vise à renforcer la conformité réglementaire.',
    descEn: 'Anticipate COBAC inspection missions in the CEMAC zone. Exhaustive compliance diagnostic against COBAC regulations R-2001/07, R-2016/01 and R-2018/01. Our intervention aims to strengthen regulatory compliance.',
    deliverables: ['Diagnostic conformité COBAC complet', 'Plan d\'actions correctives priorisé', 'Documentation réglementaire conforme', 'Formation certifiée des équipes'],
    ref: 'COBAC R-2001/07, R-2016/01, R-2018/01',
  },
  {
    icon: 'ri-lock-line',
    titleFr: 'Contrôle interne — COSO',
    titleEn: 'Internal Control — COSO',
    descFr: 'Conception et évaluation du dispositif de contrôle interne selon le référentiel COSO, tests de permanence, rapports au Conseil. Notre intervention vise à renforcer la maîtrise des risques opérationnels.',
    descEn: 'Internal control framework design and assessment per COSO, permanence testing, Board reporting. Our intervention aims to strengthen operational risk control.',
    deliverables: ['Cartographie exhaustive des processus', 'Matrice des risques et contrôles', 'Programme de tests de permanence', 'Rapport de contrôle interne certifié'],
    ref: 'COSO Internal Control — Integrated Framework (2013)',
  },
  {
    icon: 'ri-alert-line',
    titleFr: 'Gestion des risques — ICAAP/ILAAP',
    titleEn: 'Risk Management — ICAAP/ILAAP',
    descFr: 'Mise en place du dispositif ICAAP/ILAAP conforme aux exigences Bâle II/III, stress tests, plan de continuité d\'activité. Notre intervention vise à renforcer la gestion des risques de solvabilité et de liquidité.',
    descEn: 'ICAAP/ILAAP implementation per Basel II/III requirements, stress testing, business continuity planning. Our intervention aims to strengthen solvency and liquidity risk management.',
    deliverables: ['Rapport ICAAP complet', 'Rapport ILAAP complet', 'Stress tests et analyses de scénarios', 'Plan de contingence et PCA'],
    ref: 'BCEAO Dispositif prudentiel Bâle II/III, Pilier 2',
  },
  {
    icon: 'ri-government-line',
    titleFr: 'Gouvernance prudentielle',
    titleEn: 'Prudential Governance',
    descFr: 'Structuration de la gouvernance pour satisfaire les exigences de la BCEAO et de la COBAC. Conseil d\'administration, comités spécialisés, indépendance des administrateurs, politiques de rémunération.',
    descEn: 'Governance structuring to satisfy BCEAO and COBAC requirements. Board of directors, specialized committees, director independence, remuneration policies.',
    deliverables: ['Diagnostic gouvernance complet', 'Statuts, chartes et règlements intérieurs', 'Plan de formation des administrateurs', 'Politique de rémunération conforme'],
    ref: 'Circulaire BCEAO 01-2017/CB/C — Gouvernance, Art. 44 (lanceurs d\'alerte)',
  },
  {
    icon: 'ri-police-car-line',
    titleFr: 'LBC/FT — Conformité GIABA/GABAC',
    titleEn: 'AML/CFT — GIABA/GABAC Compliance',
    descFr: 'Dispositif complet KYC, déclarations de soupçons, formation, procédures. Conformité aux recommandations du GAFI et évaluations GIABA/GABAC.',
    descEn: 'Complete KYC framework, suspicious transaction reporting, training, procedures. GAFI and GIABA/GABAC compliance.',
    deliverables: ['Diagnostic LBC/FT exhaustif', 'Procédures KYC et due diligence', 'Plan de formation certifié', 'Rapport de conformité prêt pour inspection'],
    ref: 'GAFI Recommandations révisées (2024), Directive UEMOA n°02/2015/CM/UEMOA',
  },
  {
    icon: 'ri-bar-chart-box-line',
    titleFr: 'Conformité prudentielle — Bâle II/III',
    titleEn: 'Prudential Compliance — Basel II/III',
    descFr: 'Accompagnement au respect des normes prudentielles : ratios de solvabilité, liquidité LCR/NSFR, levier, grands risques.',
    descEn: 'Prudential compliance support: solvency ratios, LCR/NSFR liquidity, leverage, large exposures.',
    deliverables: ['Calcul et projection des ratios', 'Simulations de stress', 'Plan de conformité progressif', 'Reporting réglementaire automatisé'],
    ref: 'Dispositif Bâle II/III, Pilier 1 — Exigences minimales',
  },
];

const METHODOLOGY = [
  { step: '01', titleFr: 'Diagnostic écarts', titleEn: 'Gap Diagnosis', descFr: 'Audit exhaustif du dispositif existant, identification de tous les écarts réglementaires, matrice de criticité.', descEn: 'Exhaustive audit of existing framework, full regulatory gap identification, criticality matrix.' },
  { step: '02', titleFr: 'Analyse des risques', titleEn: 'Risk Analysis', descFr: 'Évaluation de la criticité des écarts, estimation des risques de sanctions, priorisation stratégique.', descEn: 'Gap criticality assessment, sanction risk estimation, strategic prioritization.' },
  { step: '03', titleFr: 'Plan de remédiation', titleEn: 'Remediation Plan', descFr: 'Plan d\'actions détaillé avec calendrier contraignant, responsables désignés et livrables mesurables.', descEn: 'Detailed action plan with binding timeline, designated owners and measurable deliverables.' },
  { step: '04', titleFr: 'Accompagnement terrain', titleEn: 'On-site Support', descFr: 'Mise en œuvre opérationnelle par nos équipes, formation des collaborateurs, transfert de compétences.', descEn: 'Operational implementation by our teams, staff training, skills transfer.' },
  { step: '05', titleFr: 'Suivi & veille', titleEn: 'Monitoring & Watch', descFr: 'Suivi post-mission à 3, 6 et 12 mois, ajustements réglementaires, veille continue, reporting au Conseil.', descEn: 'Post-mission follow-up at 3, 6 and 12 months, regulatory adjustments, ongoing watch, Board reporting.' },
];

const REGULATORY_REFS = [
  { text: 'BCEAO — Loi portant réglementation bancaire dans l\'UMOA', num: 'Loi uniforme UMOA' },
  { text: 'BCEAO — Circulaire 01/2017/CB relative à la gouvernance', num: '01/2017/CB' },
  { text: 'BCEAO — Circulaire 02-2017/CB/C relative aux dirigeants et avis conforme', num: '02-2017/CB/C' },
  { text: 'BCEAO — Circulaire 03-2017/CB/C relative au contrôle interne et à la gestion des risques (3 lignes de défense)', num: '03-2017/CB/C' },
  { text: 'BCEAO — Circulaire 001-2020/CB relative aux plans préventifs', num: '001-2020/CB' },
  { text: 'COBAC — Règlement R-2001/07 portant organisation du contrôle', num: 'R-2001/07' },
  { text: 'COBAC — Règlement R-2016/01 relatif au contrôle interne', num: 'R-2016/01' },
  { text: 'COBAC — Règlement R-2018/01 relatif à la LBC/FT', num: 'R-2018/01' },
  { text: 'GAFI — Recommandations révisées (2023)', num: 'FATF 2023' },
  { text: 'GIABA — Rapports d\'évaluation mutuelle UEMOA', num: 'GIABA MEM' },
  { text: 'GABAC — Rapports d\'évaluation mutuelle CEMAC', num: 'GABAC MEM' },
  { text: 'BCEAO — Directive 02/2015/CM/UEMOA relative à la LBC/FT', num: '02/2015/CM/UEMOA' },
  { text: 'Comité de Bâle — Bâle II (Pilier 1, 2, 3)', num: 'Basel II' },
  { text: 'Comité de Bâle — Bâle III (LCR, NSFR, Levier)', num: 'Basel III' },
  { text: 'COSO — Internal Control — Integrated Framework', num: 'COSO 2013' },
];

const FAQ_ITEMS = [
  { questionFr: 'Quelle est la différence entre une inspection BCEAO et un audit interne ?', answerFr: 'L\'inspection BCEAO est une mission de contrôle sur place menée par la Commission Bancaire de la BCEAO. Elle peut déboucher sur des sanctions administratives et pécuniaires. L\'audit interne est une mission interne à l\'établissement. Notre pré-inspection reproduit les conditions d\'une inspection réelle pour identifier et corriger les écarts avant la mission officielle.' },
  { questionFr: 'Quels sont les délais typiques pour une mission de pré-inspection ?', answerFr: 'Une pré-inspection complète dure entre 4 et 8 semaines selon la taille de l\'établissement. Le diagnostic initial (phase 1) est livré sous 2 semaines. Le plan de remédiation est immédiatement actionnable.' },
  { questionFr: 'Êtes-vous couverts par une assurance responsabilité civile professionnelle ?', answerFr: 'Oui. KHEPRA EXPERTS dispose d\'une assurance RC professionnelle conforme aux exigences des établissements financiers. Cette information est systématiquement communiquée dans nos propositions commerciales.' },
  { questionFr: 'Comment garantissez-vous la confidentialité des données de notre établissement ?', answerFr: 'Toutes nos missions sont couvertes par un accord de confidentialité (NDA) strict. Nos équipes sont formées aux exigences du secret professionnel bancaire. Les données sont stockées sur des serveurs sécurisés avec chiffrement de bout en bout.' },
  { questionFr: 'Intervenez-vous uniquement en zone UEMOA ?', answerFr: 'Nous intervenons dans toute l\'Afrique francophone : zone UEMOA (8 pays), zone CEMAC (6 pays), et au-delà. Notre connaissance approfondie des régulateurs locaux est un de nos principaux avantages concurrentiels.' },
];

const CASE_STUDIES = [
  { titleFr: 'Pré-inspection BCEAO — Banque commerciale UEMOA', titleEn: 'BCEAO Pre-inspection — UEMOA Commercial Bank', resultFr: '47 écarts réglementaires identifiés et corrigés en amont de l\'inspection officielle.', resultEn: '47 regulatory gaps identified and corrected ahead of the official inspection.', link: '/case-studies/agrement-multinational-sfd-uemoa-cemac' },
  { titleFr: 'Mise en conformité COBAC — Établissement de microfinance', titleEn: 'COBAC Compliance — Microfinance Institution', resultFr: 'Agrément obtenu dans les délais, plan de remédiation intégralement exécuté.', resultEn: 'License obtained on schedule, remediation plan fully executed.', link: '/case-studies/agrement-multinational-sfd-uemoa-cemac' },
];

const TOOLS = [
  {
    icon: 'ri-search-eye-line',
    titleFr: 'Diagnostic Pré-Inspection BCEAO',
    titleEn: 'BCEAO Pre-Inspection Diagnostic',
    descFr: 'Évaluez en 8 minutes votre niveau de préparation à une inspection BCEAO. Scoring sur 100 points, identification des écarts critiques.',
    descEn: 'Assess your BCEAO inspection readiness in 8 minutes. 100-point scoring, critical gap identification.',
    link: '/tools/diagnostic-pre-inspection-bceao',
  },
  {
    icon: 'ri-shield-check-line',
    titleFr: 'Diagnostic Pré-Inspection COBAC',
    titleEn: 'COBAC Pre-Inspection Diagnostic',
    descFr: 'Anticipez les missions COBAC en zone CEMAC. Diagnostic complet couvrant les règlements R-2001/07, R-2016/01 et R-2018/01.',
    descEn: 'Anticipate COBAC missions in the CEMAC zone. Complete diagnostic covering regulations R-2001/07, R-2016/01 and R-2018/01.',
    link: '/tools/diagnostic-pre-inspection-cobac',
  },
  {
    icon: 'ri-police-car-line',
    titleFr: 'Diagnostic LBC/FT',
    titleEn: 'AML/CFT Diagnostic',
    descFr: 'Cartographiez votre conformité LBC/FT : KYC, déclarations de soupçon, formation, procédures. Alignement GAFI et GIABA/GABAC.',
    descEn: 'Map your AML/CFT compliance: KYC, suspicious transaction reporting, training, procedures. GAFI and GIABA/GABAC alignment.',
    link: '/tools/diagnostic-lbcft',
  },
  {
    icon: 'ri-file-list-3-line',
    titleFr: 'Évaluation Conformité Réglementaire',
    titleEn: 'Regulatory Compliance Assessment',
    descFr: 'Audit exhaustif de votre dispositif de conformité : ratios prudentiels, gouvernance, contrôle interne, reporting réglementaire.',
    descEn: 'Exhaustive audit of your compliance framework: prudential ratios, governance, internal control, regulatory reporting.',
    link: '/tools/evaluation-conformite-reglementaire',
  },
];

const RELATED_ARTICLES = [
  {
    icon: 'ri-article-line',
    titleFr: 'Conformité COBAC CEMAC — Guide complet pour les établissements assujettis',
    titleEn: 'COBAC CEMAC Compliance — Complete Guide for Regulated Institutions',
    descFr: 'Architecture institutionnelle, règlements applicables, procédure d\'agrément et de contrôle.',
    descEn: 'Institutional architecture, applicable regulations, licensing and supervision procedures.',
    link: '/blog/conformite-cobac-cemac',
  },
  {
    icon: 'ri-article-line',
    titleFr: 'Trois Lignes de Défense — Circulaire BCEAO 03-2017/CB/C',
    titleEn: 'Three Lines of Defense — BCEAO Circular 03-2017/CB/C',
    descFr: 'Analyse détaillée du dispositif de contrôle interne et de gestion des risques exigé par la BCEAO.',
    descEn: 'Detailed analysis of the internal control and risk management framework required by the BCEAO.',
    link: '/blog/3-lignes-defense-circulaire-03-2017',
  },
  {
    icon: 'ri-article-line',
    titleFr: 'Comités Spécialisés — Circulaire BCEAO 01-2017/CB',
    titleEn: 'Specialized Committees — BCEAO Circular 01-2017/CB',
    descFr: 'Composition, missions et fonctionnement des comités exigés par la gouvernance bancaire UEMOA.',
    descEn: 'Composition, missions and operation of committees required by UEMOA banking governance.',
    link: '/blog/comites-specialises-circulaire-01-2017',
  },
  {
    icon: 'ri-article-line',
    titleFr: 'Série Gouvernance Bancaire UEMOA — Analyse intégrale des circulaires BCEAO',
    titleEn: 'UEMOA Banking Governance Series — Complete Analysis of BCEAO Circulars',
    descFr: 'Synthèse des exigences de gouvernance, contrôle interne et gestion des risques en zone UEMOA.',
    descEn: 'Summary of governance, internal control and risk management requirements in the UEMOA zone.',
    link: '/blog/serie-gouvernance-bancaire-uemoa',
  },
];

const DIFFERENTIATORS = [
  {
    icon: 'ri-calendar-check-line',
    titleFr: '22 ans d\'expertise terrain en Afrique francophone',
    titleEn: '22 years of field expertise in Francophone Africa',
    descFr: 'Plus de deux décennies d\'interventions auprès des banques, SFD, EMF, fintechs et régulateurs en zone UEMOA et CEMAC. Une connaissance intime des attentes des autorités de supervision.',
    descEn: 'Over two decades of engagements with banks, SFDs, EMFs, fintechs and regulators across the UEMOA and CEMAC zones. Intimate knowledge of supervisory expectations.',
  },
  {
    icon: 'ri-building-2-line',
    titleFr: 'Méthodologie alignée Big Four',
    titleEn: 'Big Four-aligned methodology',
    descFr: 'Nos protocoles d\'audit et de diagnostic sont calibrés sur les standards des cabinets de premier rang. Chaque mission suit un processus documenté en 5 phases, du diagnostic à la remédiation.',
    descEn: 'Our audit and diagnostic protocols are calibrated to top-tier firm standards. Each engagement follows a documented 5-phase process, from diagnosis to remediation.',
  },
  {
    icon: 'ri-global-line',
    titleFr: 'Couverture exclusive UEMOA + CEMAC',
    titleEn: 'Exclusive UEMOA + CEMAC coverage',
    descFr: 'Peu de cabinets maîtrisent simultanément les deux cadres prudentiels. Nous intervenons dans les 14 pays des deux zones avec la même rigueur et la même connaissance des régulateurs locaux.',
    descEn: 'Few firms master both prudential frameworks simultaneously. We operate in all 14 countries across both zones with the same rigor and local regulator knowledge.',
  },
  {
    icon: 'ri-shield-star-line',
    titleFr: 'Confidentialité absolue et couverture RC Professionnelle',
    titleEn: 'Absolute confidentiality and Professional Indemnity Insurance',
    descFr: 'Toutes nos missions sont couvertes par un NDA strict. Nous disposons d\'une assurance responsabilité civile professionnelle conforme aux exigences des établissements financiers.',
    descEn: 'All our engagements are covered by a strict NDA. We maintain professional indemnity insurance compliant with financial institution requirements.',
  },
];

export default function RegulationFinancierePage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const currentLang = isEn ? 'en-US' : 'fr-FR';
  const [showAllRefs, setShowAllRefs] = useState(false);
  const displayedRefs = showAllRefs ? REGULATORY_REFS : REGULATORY_REFS.slice(0, 5);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isEn ? 'Financial Regulation — BCEAO, COBAC, Internal Control, AML/CFT | KHEPRA EXPERTS' : 'Régulation Financière — BCEAO, COBAC, Contrôle interne, LBC/FT | KHEPRA EXPERTS',
    description: isEn ? 'Premium advisory in financial regulation: BCEAO/COBAC pre-inspection, internal control, risk management, AML/CFT compliance, prudential ratios. 22 years expertise in Francophone Africa.' : 'Conseil premium en régulation financière : pré-inspection BCEAO/COBAC, contrôle interne, gestion des risques, LBC/FT, conformité prudentielle. 22 ans d\'expertise en Afrique francophone.',
    inLanguage: currentLang,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Financial Regulation — BCEAO & COBAC Inspection Readiness™' : 'Régulation Financière — BCEAO & COBAC Inspection Readiness™', item: `${SITE_URL}/regulation-financiere` },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: isEn ? (item.questionEn || item.questionFr) : item.questionFr,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isEn ? (item.answerEn || item.answerFr) : item.answerFr,
      },
    })),
  };

  return (
    <>
      <SeoHead
        title={isEn ? 'Financial Regulation — BCEAO COBAC | Pre-inspection, Internal Control, AML/CFT | KHEPRA EXPERTS' : 'Régulation Financière — BCEAO COBAC | Pré-inspection, Contrôle interne, LBC/FT | KHEPRA EXPERTS'}
        description={isEn ? 'Premium advisory in financial regulation: BCEAO/COBAC pre-inspection, internal control, risk management, AML/CFT compliance, prudential ratios. Intervention aimed at strengthening identified regulatory risk management.' : 'Conseil premium en régulation financière : pré-inspection BCEAO/COBAC, contrôle interne, gestion des risques, LBC/FT, conformité prudentielle. Intervention visant à renforcer la maîtrise des risques réglementaires identifiés.'}
        keywords="inspection BCEAO, inspection COBAC, conformité banque UEMOA, contrôle interne banque, LBC FT Afrique, ratios prudentiels BCEAO, agrément SFD BCEAO, audit prudentiel, régulation financière Afrique francophone"
        canonicalPath="/regulation-financiere"
        schemaJson={{ ...schema, ...faqSchema }}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden" style={{ background: 'linear-gradient(165deg, #080c14 0%, #0c1420 30%, #111b2a 60%, #0a101c 100%)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(rgba(134,188,37,0.9) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 75% 15%, rgba(134,188,37,0.10) 0%, transparent 55%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 25% 85%, rgba(134,188,37,0.06) 0%, transparent 50%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 rounded-full border border-deloitte-400/20" style={{ background: 'rgba(134,188,37,0.06)' }}>
                <i className="ri-bank-line text-sm text-deloitte-400" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-deloitte-400">
                  {isEn ? 'Business Unit 1 — Regulatory & Financial Services' : 'Business Unit 1 — Régulation & Services Financiers'}
                </span>
              </div>
              <h1 className="font-display font-bold text-white mb-5 max-w-4xl leading-[1.08]" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
                {isEn ? 'Strengthen your regulatory compliance framework' : 'Renforcer votre dispositif de conformité réglementaire'}
              </h1>
              <p className="text-lg font-medium max-w-3xl mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {isEn
                  ? 'BCEAO & COBAC Inspection Readiness™ — Advisory for banks, microfinance institutions and fintechs preparing for regulatory inspections in the UEMOA and CEMAC zones. Our intervention aims to strengthen the control of identified regulatory risks.'
                  : 'BCEAO & COBAC Inspection Readiness™ — Conseil aux banques, institutions de microfinance et fintechs pour la préparation aux inspections réglementaires en zone UEMOA et CEMAC. Notre intervention vise à renforcer la maîtrise des risques réglementaires identifiés.'}
              </p>
              {/* Key stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8">
                {[
                  { val: '22', label: isEn ? 'years of expertise' : 'ans d\'expertise' },
                  { val: 'UEMOA', label: isEn ? '+ CEMAC zones' : '+ zone CEMAC' },
                  { val: 'OHADA', label: isEn ? 'regulatory framework' : 'cadre réglementaire' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display font-bold text-deloitte-400" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>{s.val}</div>
                    <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
                {['BCEAO N°008-05-2015', 'COBAC R-2001-07', 'Bâle II/III', 'GIABA/GABAC', 'COSO', 'GAFI', 'OHADA AUSCGIE'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-white/8" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' }}>{tag}</span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-black"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-stethoscope-line mr-2" />
                  {isEn ? 'Free diagnostic — 8 min' : 'Diagnostic gratuit — 8 min'}
                </a>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-white border border-white/15"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <i className="ri-customer-service-2-line mr-2" />
                  {isEn ? 'Request a consultation' : 'Demander une consultation'}
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(134,188,37,0.25), transparent)' }} />
        </section>

        {/* ═══════════ RISKS — "Ce que vous risquez" ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">
                {isEn ? 'Regulatory Risk Exposure' : 'Exposition aux Risques Réglementaires'}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Regulatory non-compliance carries significant consequences' : 'La non-conformité réglementaire emporte des conséquences significatives'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">
                {isEn ? 'These are the documented consequences faced by institutions that have not prepared for their regulatory inspections.' : 'Voici les conséquences documentées auxquelles font face les établissements qui n\'ont pas préparé leurs inspections réglementaires.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {RISKS.map((r, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-6 border border-red-100 bg-red-50/30 group hover:bg-red-50/60 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4 bg-red-100">
                    <i className={`${r.icon} text-lg text-red-600`} />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-2">{isEn ? r.titleEn : r.titleFr}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">{isEn ? r.descEn : r.descFr}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SERVICES GRID ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Our Services' : 'Nos Services'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Complete Regulatory Protection' : 'Protection Réglementaire Complète'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto">
                {isEn ? 'Seven specialized services covering the entire prudential and compliance spectrum. Each designed to address a specific regulatory requirement.' : 'Sept services spécialisés couvrant l\'ensemble du spectre prudentiel et conformité. Chacun conçu pour adresser une exigence réglementaire spécifique.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((svc, i) => (
                <div key={i} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 bg-white border border-neutral-200/70 hover:border-deloitte-200/60 group">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl mb-4 bg-deloitte-50 border border-deloitte-200/40">
                    <i className={`${svc.icon} text-lg text-deloitte-500`} />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 text-[15px]">{isEn ? svc.titleEn : svc.titleFr}</h3>
                  <p className="text-[13px] text-neutral-500 mb-4 leading-relaxed">{isEn ? svc.descEn : svc.descFr}</p>
                  <div className="pt-4 border-t border-neutral-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">{isEn ? 'Deliverables' : 'Livrables'}</span>
                    <ul className="space-y-1.5">
                      {svc.deliverables.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-[12px] text-neutral-600">
                          <i className="ri-check-line flex-shrink-0 mt-0.5 text-deloitte-500" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    {svc.ref && (
                      <div className="mt-3 pt-3 border-t border-neutral-50">
                        <span className="text-[10px] text-neutral-400 italic">{svc.ref}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ OUTILS DE DIAGNOSTIC ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Diagnostic Tools' : 'Outils de Diagnostic Réglementaire'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Assess your compliance in minutes' : 'Évaluez votre conformité en quelques minutes'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">
                {isEn ? 'Free, confidential diagnostics designed to identify your regulatory gaps and provide immediate, actionable recommendations.' : 'Des diagnostics gratuits et confidentiels conçus pour identifier vos écarts réglementaires et vous fournir des recommandations immédiates et actionnables.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TOOLS.map((t, i) => (
                <a key={i} href={t.link} className="rounded-2xl p-6 bg-white border border-deloitte-200/30 hover:border-deloitte-300/60 transition-all hover:-translate-y-1 group cursor-pointer flex gap-5">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-deloitte-50 border border-deloitte-200/40 flex-shrink-0">
                    <i className={`${t.icon} text-xl text-deloitte-500`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-neutral-900 mb-1 text-[15px] group-hover:text-deloitte-600 transition-colors">{isEn ? t.titleEn : t.titleFr}</h4>
                    <p className="text-[13px] text-neutral-500 leading-relaxed mb-3">{isEn ? t.descEn : t.descFr}</p>
                    <span className="text-xs font-bold text-deloitte-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      {isEn ? 'Launch diagnostic' : 'Lancer le diagnostic'} <i className="ri-arrow-right-line" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ METHODOLOGY ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Our Methodology' : 'Notre Méthodologie'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? '5-Phase Process — From Risk to Compliance' : 'Processus en 5 Phases — Du Risque à la Conformité'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {METHODOLOGY.map((m, i) => (
                <div key={i} className="relative text-center group">
                  {i < METHODOLOGY.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(134,188,37,0.4), rgba(134,188,37,0.08))' }} />
                  )}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center font-display text-xl font-bold transition-all group-hover:scale-110 bg-deloitte-50 text-deloitte-600 border-2 border-deloitte-200/50">
                    {m.step}
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-1">{isEn ? m.titleEn : m.titleFr}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{isEn ? m.descEn : m.descFr}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CASE STUDIES ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Case Studies' : 'Cas Pratiques'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Proven Results in Financial Regulation' : 'Résultats Prouvés en Régulation Financière'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CASE_STUDIES.map((cs, i) => (
                <a key={i} href={cs.link} className="rounded-2xl p-6 bg-white border border-neutral-200/70 hover:border-deloitte-200/60 transition-all hover:-translate-y-1 group cursor-pointer" style={{ background: '#fafbfc' }}>
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-deloitte-50 border border-deloitte-200/40 mb-4">
                    <i className="ri-file-chart-line text-deloitte-500" />
                  </div>
                  <h4 className="font-bold text-neutral-900 mb-2 text-sm">{isEn ? cs.titleEn : cs.titleFr}</h4>
                  <p className="text-[13px] text-neutral-500 mb-3">{isEn ? cs.resultEn : cs.resultFr}</p>
                  <span className="text-xs font-bold text-deloitte-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    {isEn ? 'Read the case study' : 'Lire l\'étude de cas'} <i className="ri-arrow-right-line" />
                  </span>
                </a>
              ))}
              <a href="/geo-hub/agrement-sfd-bceao-cobac" className="rounded-2xl p-6 border border-neutral-200/70 hover:border-deloitte-200/60 transition-all hover:-translate-y-1 group cursor-pointer" style={{ background: '#fafbfc' }}>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-deloitte-50 border border-deloitte-200/40 mb-4">
                  <i className="ri-earth-line text-deloitte-500" />
                </div>
                <h4 className="font-bold text-neutral-900 mb-2 text-sm">
                  {isEn ? 'SFD Licensing — BCEAO & COBAC Zones' : 'Agrément SFD — Parcours BCEAO & COBAC'}
                </h4>
                <p className="text-[13px] text-neutral-500 mb-3">
                  {isEn ? 'Interactive guide covering the licensing process, regulatory requirements, institutional mapping and key milestones for SFDs across both zones.' : 'Parcours interactif couvrant le processus d\'agrément, les exigences réglementaires, la cartographie institutionnelle et les jalons clés pour les SFD dans les deux zones.'}
                </p>
                <span className="text-xs font-bold text-deloitte-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  {isEn ? 'Explore the Geo-Hub' : 'Explorer le Geo-Hub'} <i className="ri-arrow-right-line" />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════ ANALYSES & PUBLICATIONS ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Analyses & Publications' : 'Analyses & Publications'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Deep Dive into Financial Regulation' : 'Analyses Approfondies en Régulation Financière'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">
                {isEn ? 'Our latest articles and regulatory analyses, sourced and verified, to help you stay ahead of supervisory expectations.' : 'Nos derniers articles et analyses réglementaires, sourcés et vérifiés, pour anticiper les attentes des autorités de supervision.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RELATED_ARTICLES.map((art, i) => (
                <a key={i} href={art.link} className="rounded-2xl p-5 bg-white border border-neutral-200/70 hover:border-deloitte-200/60 transition-all hover:-translate-y-1 group cursor-pointer flex gap-4">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-deloitte-50 border border-deloitte-200/40 flex-shrink-0 mt-0.5">
                    <i className="ri-article-line text-deloitte-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-neutral-900 mb-1 text-[14px] leading-snug group-hover:text-deloitte-600 transition-colors">{isEn ? art.titleEn : art.titleFr}</h4>
                    <p className="text-[12px] text-neutral-500 leading-relaxed">{isEn ? art.descEn : art.descFr}</p>
                  </div>
                  <i className="ri-arrow-right-s-line text-neutral-300 group-hover:text-deloitte-500 transition-colors flex-shrink-0 mt-1" />
                </a>
              ))}
            </div>
            <div className="text-center mt-6">
              <a href="/blog" className="text-xs font-bold text-deloitte-600 hover:text-deloitte-700 transition-colors flex items-center gap-1 mx-auto w-fit">
                {isEn ? 'See all analyses' : 'Voir toutes les analyses'} <i className="ri-arrow-right-line" />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════ REGULATORY REFERENCES ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Regulatory Framework' : 'Cadre Réglementaire'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Official References — Sourced & Verified' : 'Références Officielles — Sourcées & Vérifiées'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">
                {isEn ? 'Our methodologies are strictly based on these official regulatory texts in effect.' : 'Nos méthodologies sont strictement basées sur ces textes réglementaires officiels en vigueur.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {displayedRefs.map((ref, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100 bg-neutral-50/50">
                  <i className="ri-file-text-line text-neutral-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-700 leading-relaxed">{ref.text}</p>
                    <span className="text-[10px] text-neutral-400 font-mono">{ref.num}</span>
                  </div>
                </div>
              ))}
            </div>
            {REGULATORY_REFS.length > 5 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllRefs(!showAllRefs)}
                  className="text-xs font-bold text-deloitte-600 hover:text-deloitte-700 transition-colors flex items-center gap-1 mx-auto">
                  {showAllRefs ? (isEn ? 'Show less' : 'Voir moins') : (isEn ? `Show all ${REGULATORY_REFS.length} references` : `Voir les ${REGULATORY_REFS.length} références`)}
                  <i className={`ri-arrow-${showAllRefs ? 'up' : 'down'}-s-line`} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════ POURQUOI KHEPRA ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{isEn ? 'Why KHEPRA' : 'Pourquoi KHEPRA'}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'The partner of choice for regulated institutions' : 'Le partenaire de référence des établissements régulés'}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">
                {isEn ? 'Four pillars that make KHEPRA EXPERTS the trusted advisor for financial institutions across Francophone Africa.' : 'Quatre piliers qui font de KHEPRA EXPERTS le conseil de confiance des institutions financières en Afrique francophone.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {DIFFERENTIATORS.map((d, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-6 border border-neutral-200/70 hover:border-deloitte-200/60 transition-all" style={{ background: '#fafbfc' }}>
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl mb-4 bg-deloitte-50 border border-deloitte-200/40">
                    <i className={`${d.icon} text-lg text-deloitte-500`} />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-2">{isEn ? d.titleEn : d.titleFr}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{isEn ? d.descEn : d.descFr}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">FAQ</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Your Questions, Answered' : 'Vos Questions, Nos Réponses'}
              </h2>
            </div>
            <FAQAccordion items={FAQ_ITEMS.map((item) => ({
              question: isEn ? (item.questionEn || item.questionFr) : item.questionFr,
              answer: isEn ? (item.answerEn || item.answerFr) : item.answerFr,
            }))} />
          </div>
        </section>

        {/* ═══════════ FINAL CTA ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-3xl p-8 md:p-12 border border-deloitte-200/40" style={{ background: 'linear-gradient(135deg, rgba(134,188,37,0.04), rgba(134,188,37,0.01))' }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {isEn ? 'Ready for your next regulatory inspection?' : 'Préparation à votre prochaine inspection réglementaire ?'}
              </h2>
              <p className="text-neutral-500 mb-8 max-w-xl mx-auto">
                {isEn ? 'Our 8-minute diagnostic helps assess your compliance level and identify priority areas before the regulator\'s visit.' : 'Notre diagnostic de 8 minutes permet d\'évaluer votre niveau de conformité et d\'identifier les axes prioritaires avant le passage du régulateur.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-black"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-stethoscope-line mr-2" />
                  {isEn ? 'Start free diagnostic' : 'Démarrer le diagnostic gratuit'}
                </a>
                <a href="/case-studies"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-neutral-700 border border-neutral-200 hover:border-neutral-300">
                  <i className="ri-file-chart-line mr-2" />
                  {isEn ? 'See our case studies' : 'Voir nos études de cas'}
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}