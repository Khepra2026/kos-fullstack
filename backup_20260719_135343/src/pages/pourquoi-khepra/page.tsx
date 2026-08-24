import { useTranslation } from 'react-i18next';
import { SeoHead } from '@/components/feature/SeoHead';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { PremiumCTA } from '@/components/feature/PremiumCTA';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { Link } from 'react-router-dom';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const POURQUOI_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/pourquoi-khepra#webpage`,
      url: `${SITE_URL}/pourquoi-khepra`,
      name: 'Pourquoi KHEPRA EXPERTS — 22 ans, 500+ missions, 20 pays | Cabinet référence Afrique',
      description: 'KHEPRA EXPERTS est le cabinet de référence en gouvernance, conformité BCEAO/COBAC, due diligence et investment readiness en Afrique francophone. 22 ans d\'expérience, 500+ missions, 20 pays.',
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Pourquoi KHEPRA ?', item: `${SITE_URL}/pourquoi-khepra` },
        ],
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'KHEPRA EXPERTS',
      url: SITE_URL,
      foundingDate: '2002',
      description: 'Cabinet de référence en gouvernance, conformité BCEAO/COBAC, due diligence et investment readiness en Afrique francophone.',
      areaServed: ['TG', 'BJ', 'CI', 'BF', 'SN', 'GH', 'CM', 'CG', 'GA', 'NE', 'ML', 'GN'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: '4 Pôles d\'expertise',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gouvernance & Conformité Réglementaire' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Risques, Audit & Contrôle Interne' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Structuration Financière & Performance' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Investment Readiness & Transactions' } },
        ],
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/about#founder`,
      name: 'SIMDA Essoyomèwè',
      jobTitle: 'Directeur Associé & Fondateur',
      worksFor: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
      knowsAbout: [
        'Gouvernance d\'entreprise',
        'Conformité BCEAO',
        'Conformité COBAC',
        'Due Diligence',
        'Investment Readiness',
        'Audit financier',
        'Inclusion financière',
        'OHADA',
        'Risques bancaires',
        'Structuration financière',
      ],
    },
  ],
};

const KEY_STATS = [
  {
    value: '22+',
    labelFr: 'ans d\'expérience',
    labelEn: 'years of experience',
    icon: 'ri-calendar-check-line',
  },
  {
    value: '500+',
    labelFr: 'missions réalisées',
    labelEn: 'missions completed',
    icon: 'ri-briefcase-4-line',
  },
  {
    value: '20+',
    labelFr: 'pays couverts',
    labelEn: 'countries covered',
    icon: 'ri-global-line',
  },
  {
    value: '95%',
    labelFr: 'taux de satisfaction client',
    labelEn: 'client satisfaction rate',
    icon: 'ri-heart-3-line',
  },
  {
    value: '4',
    labelFr: 'pôles d\'expertise',
    labelEn: 'expertise poles',
    icon: 'ri-grid-line',
  },
  {
    value: '50+',
    labelFr: 'institutions financières accompagnées',
    labelEn: 'financial institutions supported',
    icon: 'ri-bank-line',
  },
];

const EXPERTISE_ZONES = [
  {
    titleFr: 'Expertise Direction Générale',
    titleEn: 'General Management Expertise',
    icon: 'ri-user-star-line',
    descriptionFr:
      'SIMDA Essoyomèwè a occupé les fonctions de Directeur Général (AMIFA Gabon), Inspecteur MFI (Ministère des Finances Togo), Senior Auditor (FINAM Gabon) et Conseiller Technique National en Inclusion Financière. Cette expérience opérationnelle au plus haut niveau garantit une compréhension fine des enjeux de direction et des contraintes réglementaires.',
    descriptionEn:
      'SIMDA Essoyomèwè served as CEO (AMIFA Gabon), MFI Inspector (Ministry of Finance Togo), Senior Auditor (FINAM Gabon) and National Technical Advisor on Financial Inclusion. This operational experience at the highest level ensures a deep understanding of management challenges and regulatory constraints.',
  },
  {
    titleFr: 'Expertise BCEAO & Réglementation Bancaire',
    titleEn: 'BCEAO & Banking Regulation Expertise',
    icon: 'ri-shield-check-line',
    descriptionFr:
      'Maîtrise approfondie des circulaires, instructions et ratios prudentiels de la BCEAO et du SG-CB-UMOA. Connaissance des procédures d\'inspection, des sanctions, des normes Bâle II/III et des exigences de conformité pour les banques, SFD et EMF de la zone UEMOA.',
    descriptionEn:
      'Deep mastery of BCEAO circulars, instructions and prudential ratios. Knowledge of inspection procedures, sanctions, Basel II/III standards and compliance requirements for banks, MFIs and EMIs in the WAEMU zone.',
  },
  {
    titleFr: 'Expertise Inclusion Financière',
    titleEn: 'Financial Inclusion Expertise',
    icon: 'ri-hand-heart-line',
    descriptionFr:
      'Expertise reconnue en structuration de SFD, agrément EMF/FinTech, mobile money, agent banking et transformation digitale des institutions financières. Accompagnement de 50+ institutions dans leur mise en conformité et leur expansion régionale.',
    descriptionEn:
      'Recognized expertise in MFI structuring, EMI/FinTech licensing, mobile money, agent banking and digital transformation of financial institutions. Support for 50+ institutions in their compliance and regional expansion.',
  },
  {
    titleFr: 'Expertise Gouvernance & Conformité',
    titleEn: 'Governance & Compliance Expertise',
    icon: 'ri-organization-chart',
    descriptionFr:
      'Maîtrise des standards OCDE, IFC, COSO, Bâle et des circulaires UEMOA sur la gouvernance bancaire. Structuration de conseils d\'administration, comités spécialisés, chartes de gouvernance et politiques de conformité pour banques et institutions financières.',
    descriptionEn:
      'Mastery of OECD, IFC, COSO, Basel standards and UEMOA circulars on banking governance. Structuring of boards of directors, specialized committees, governance charters and compliance policies for banks and financial institutions.',
  },
  {
    titleFr: 'Expertise Levée de Fonds & Investment Readiness',
    titleEn: 'Fundraising & Investment Readiness Expertise',
    icon: 'ri-line-chart-line',
    descriptionFr:
      'Accompagnement de PME et institutions dans la structuration de dossiers de levée de fonds, due diligence préparatoire, pitch decks, data rooms et mise en relation avec des fonds PE/VC, banques et bailleurs de fonds (BAD, IFC, BIDC, BOAD).',
    descriptionEn:
      'Support for SMEs and institutions in structuring fundraising files, preparatory due diligence, pitch decks, data rooms and introductions to PE/VC funds, banks and donors (AfDB, IFC, BIDC, BOAD).',
  },
];

const METHODOLOGY = [
  {
    number: '01',
    titleFr: 'Diagnostic & Évaluation',
    titleEn: 'Diagnostic & Assessment',
    descriptionFr:
      'Analyse approfondie de votre situation, identification des écarts réglementaires, évaluation des risques et des opportunités. Livrables : rapport diagnostic, matrice de conformité, plan d\'action priorisé.',
    descriptionEn:
      'In-depth analysis of your situation, identification of regulatory gaps, assessment of risks and opportunities. Deliverables: diagnostic report, compliance matrix, prioritized action plan.',
    icon: 'ri-search-eye-line',
    durationFr: '2-4 semaines',
    durationEn: '2-4 weeks',
  },
  {
    number: '02',
    titleFr: 'Conception & Structuration',
    titleEn: 'Design & Structuring',
    descriptionFr:
      'Co-construction de la solution adaptée : structuration de la gouvernance, élaboration des politiques, conception des outils de gestion. Livrables : chartes, règlements, politiques, procédures.',
    descriptionEn:
      'Co-construction of the adapted solution: governance structuring, policy development, management tool design. Deliverables: charters, regulations, policies, procedures.',
    icon: 'ri-draft-line',
    durationFr: '3-6 semaines',
    durationEn: '3-6 weeks',
  },
  {
    number: '03',
    titleFr: 'Mise en Œuvre & Accompagnement',
    titleEn: 'Implementation & Support',
    descriptionFr:
      'Déploiement opérationnel avec formation des équipes, paramétrage des outils, accompagnement dans la transition. Livrables : formations, sessions pratiques, support post-déploiement.',
    descriptionEn:
      'Operational deployment with team training, tool configuration, support during transition. Deliverables: training, practical sessions, post-deployment support.',
    icon: 'ri-tools-line',
    durationFr: '3-6 mois',
    durationEn: '3-6 months',
  },
  {
    number: '04',
    titleFr: 'Suivi & Amélioration Continue',
    titleEn: 'Monitoring & Continuous Improvement',
    descriptionFr:
      'Évaluation de la performance, ajustements des dispositifs, veille réglementaire et renforcement des capacités. Livrables : rapports de suivi, comités de pilotage, recommandations d\'amélioration.',
    descriptionEn:
      'Performance evaluation, device adjustments, regulatory monitoring and capacity building. Deliverables: monitoring reports, steering committees, improvement recommendations.',
    icon: 'ri-refresh-line',
    durationFr: '6-12 mois',
    durationEn: '6-12 months',
  },
];

const TRUST_SIGNALS = [
  {
    icon: 'ri-shield-keyhole-line',
    titleFr: 'Confidentialité absolue',
    titleEn: 'Absolute confidentiality',
    descriptionFr: 'NDA systématique, données sécurisées, jamais partagées avec des tiers.',
    descriptionEn: 'Systematic NDA, secure data, never shared with third parties.',
  },
  {
    icon: 'ri-award-line',
    titleFr: 'Standards Internationaux',
    titleEn: 'International Standards',
    descriptionFr: 'Rigueur, documentation, traçabilité — méthodologies conformes aux meilleurs référentiels internationaux, adaptées au contexte africain.',
    descriptionEn: 'Rigor, documentation, traceability — methodologies aligned with the best international standards, adapted to the African context.',
  },
  {
    icon: 'ri-map-pin-line',
    titleFr: 'Présence terrain',
    titleEn: 'Field presence',
    descriptionFr: 'Bureaux à Lomé, interventions dans 20+ pays UEMOA/CEMAC.',
    descriptionEn: 'Offices in Lomé, interventions in 20+ WAEMU/CEMAC countries.',
  },
  {
    icon: 'ri-file-list-3-line',
    titleFr: 'Livrables actionnables',
    titleEn: 'Actionable deliverables',
    descriptionFr: 'Rapports complets, plans d\'action, tableaux de bord, formations.',
    descriptionEn: 'Complete reports, action plans, dashboards, training.',
  },
];

export default function PourquoiKhepraPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Pourquoi KHEPRA EXPERTS — 22 ans, 500+ missions, 20 pays | Cabinet référence Afrique"
        description="KHEPRA EXPERTS est le cabinet de référence en gouvernance, conformité BCEAO/COBAC, due diligence et investment readiness en Afrique francophone. 22 ans d'expérience, 500+ missions, 20 pays."
        keywords={[
          'KHEPRA EXPERTS',
          'cabinet référence Afrique',
          'gouvernance entreprise Afrique',
          'conformité BCEAO',
          'due diligence Afrique',
          'investment readiness',
          'SIMDA Essoyomèwè',
          'conseil stratégique Afrique',
          'cabinet conseil Lomé',
          'expertise banque Afrique',
        ]}
        canonicalPath="/pourquoi-khepra"
        ogType="website"
        ogImage={OG_IMAGES.ABOUT}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        ogImageAlt={
          isEn
            ? 'Why KHEPRA EXPERTS — 22 years of expertise in Governance, Compliance and Due Diligence in Africa'
            : 'Pourquoi KHEPRA EXPERTS — 22 ans d\'expertise en Gouvernance, Conformité et Due Diligence en Afrique'
        }
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        structuredData={POURQUOI_SCHEMA}
        hreflangLinks={STATIC_HREFLANG_MAP['/pourquoi-khepra/'] || undefined}
      />

      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-20 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3">
          <Breadcrumb
            variant="dark"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'Why KHEPRA?' : 'Pourquoi KHEPRA ?' },
            ]}
          />
        </div>
      </div>

      <main id="main-content">
        {/* === HERO === */}
        <section className="relative overflow-hidden bg-background-950 text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-background-950 via-background-900 to-background-800" />
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,oklch(var(--accent-500)),transparent_50%)]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                {isEn ? (
                  <>
                    22 years. <span className="text-accent-400">500+ missions.</span> 20+ countries.
                    <br />
                    <span className="text-primary-400">One conviction.</span>
                  </>
                ) : (
                  <>
                    22 ans. <span className="text-accent-400">500+ missions.</span> 20+ pays.
                    <br />
                    <span className="text-primary-400">Une conviction.</span>
                  </>
                )}
              </h1>
              <p className="text-lg md:text-xl text-foreground-200 mb-8 leading-relaxed">
                {isEn
                  ? 'KHEPRA EXPERTS is the reference firm in governance, regulatory compliance, due diligence and investment readiness in Francophone Africa. We transform institutions into compliant, resilient and investor-ready organizations.'
                  : 'KHEPRA EXPERTS est le cabinet de référence en gouvernance, conformité réglementaire, due diligence et investment readiness en Afrique francophone. Nous transformons les institutions en organisations conformes, résilientes et prêtes pour les investisseurs.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <PremiumCTA variant="diagnostic" size="lg" />
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-briefcase-4-line" />
                  {isEn ? 'See our case studies' : 'Voir nos études de cas'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* === KEY STATS === */}
        <section className="py-12 md:py-16 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {KEY_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-4 md:p-5 border border-background-200 text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                    <i className={`${stat.icon} text-lg`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground-950 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-foreground-600">
                    {isEn ? stat.labelEn : stat.labelFr}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === 4 POLES === */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground-950 mb-4">
                {isEn ? '4 Expertise Poles' : '4 Pôles d\'expertise'}
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                {isEn
                  ? 'A structured and comprehensive approach covering all strategic dimensions of governance, risk, finance and investment readiness.'
                  : 'Une approche structurée et complète couvrant toutes les dimensions stratégiques de la gouvernance, des risques, de la finance et de l\'investment readiness.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  icon: 'ri-shield-check-line',
                  titleFr: 'Gouvernance & Conformité Réglementaire',
                  titleEn: 'Governance & Regulatory Compliance',
                  descFr: 'BCEAO, COBAC, OHADA, gouvernance d\'entreprise, conformité prudentielle, structuration des organes.',
                  descEn: 'BCEAO, COBAC, OHADA, corporate governance, prudential compliance, governance bodies structuring.',
                  color: 'bg-primary-600',
                  link: '/services/gouvernance-entreprise',
                },
                {
                  icon: 'ri-radar-line',
                  titleFr: 'Risques, Audit & Contrôle Interne',
                  titleEn: 'Risks, Audit & Internal Control',
                  descFr: 'Cartographie des risques, audit interne, contrôle permanent, conformité LBC/FT, stress tests.',
                  descEn: 'Risk mapping, internal audit, permanent control, AML/CFT compliance, stress tests.',
                  color: 'bg-secondary-600',
                  link: '/services/gestion-risques-entreprise',
                },
                {
                  icon: 'ri-line-chart-line',
                  titleFr: 'Structuration Financière & Performance',
                  titleEn: 'Financial Structuring & Performance',
                  descFr: 'DAF externalisée, modélisation financière, restructuration, pilotage de la performance, tableaux de bord.',
                  descEn: 'Outsourced CFO, financial modeling, restructuring, performance management, dashboards.',
                  color: 'bg-accent-600',
                  link: '/services/levee-de-fonds',
                },
                {
                  icon: 'ri-hand-coin-line',
                  titleFr: 'Investment Readiness & Transactions',
                  titleEn: 'Investment Readiness & Transactions',
                  descFr: 'Levée de fonds, due diligence, valorisation, M&A, relations investisseurs, pitch deck, data room.',
                  descEn: 'Fundraising, due diligence, valuation, M&A, investor relations, pitch deck, data room.',
                  color: 'bg-primary-600',
                  link: '/investisseurs',
                },
              ].map((pole, idx) => (
                <Link
                  key={idx}
                  to={pole.link}
                  className="group bg-white rounded-lg p-5 md:p-6 border border-background-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg ${pole.color} text-white`}>
                      <i className={`${pole.icon} text-xl`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground-950 mb-2 group-hover:text-primary-700 transition-colors">
                        {isEn ? pole.titleEn : pole.titleFr}
                      </h3>
                      <p className="text-sm text-foreground-600 leading-relaxed">
                        {isEn ? pole.descEn : pole.descFr}
                      </p>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center text-foreground-400 group-hover:text-primary-600 transition-colors">
                      <i className="ri-arrow-right-line" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* === EXPERTISE ZONES === */}
        <section className="py-12 md:py-16 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground-950 mb-4">
                {isEn ? '5 Expertise Domains' : '5 Domaines d\'expertise'}
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                {isEn
                  ? 'The depth of our expertise comes from 22 years of field experience at the highest level of African institutions.'
                  : 'La profondeur de notre expertise repose sur 22 ans d\'expérience terrain au plus haut niveau des institutions africaines.'}
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              {EXPERTISE_ZONES.map((zone, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-5 md:p-6 border border-background-200"
                >
                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <i className={`${zone.icon} text-xl`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold text-foreground-950 mb-2">
                        {isEn ? zone.titleEn : zone.titleFr}
                      </h3>
                      <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
                        {isEn ? zone.descriptionEn : zone.descriptionFr}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === METHODOLOGY === */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground-950 mb-4">
                {isEn ? 'Our Methodology — 4 Phases' : 'Notre Méthodologie — 4 Phases'}
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                {isEn
                  ? 'A proven, structured approach inspired by international standards, adapted to the African context: rigorous, documented, traceable and focused on measurable results.'
                  : 'Une approche éprouvée et structurée inspirée des standards internationaux, adaptée au contexte africain : rigoureuse, documentée, traçable et orientée résultats mesurables.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {METHODOLOGY.map((phase, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-5 md:p-6 border border-background-200 relative"
                >
                  <div className="absolute -top-3 left-5 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {phase.number}
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700 mb-4 mt-2">
                    <i className={`${phase.icon} text-xl`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground-950 mb-2">
                    {isEn ? phase.titleEn : phase.titleFr}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed mb-3">
                    {isEn ? phase.descriptionEn : phase.descriptionFr}
                  </p>
                  <div className="text-xs text-primary-700 font-medium">
                    <i className="ri-time-line mr-1" />
                    {isEn ? phase.durationEn : phase.durationFr}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background-100 text-foreground-700 text-sm">
                <i className="ri-tools-line" />
                {isEn
                  ? '12 proprietary tools · 15 standard deliverables · 100% actionable'
                  : '12 outils propriétaires · 15 livrables standards · 100% actionnables'}
              </div>
            </div>
          </div>
        </section>

        {/* === TRUST SIGNALS === */}
        <section className="py-12 md:py-16 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-4">
                {isEn ? 'Why Decision-Makers Trust Us' : 'Pourquoi les décideurs nous font confiance'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {TRUST_SIGNALS.map((signal, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-5 md:p-6 border border-background-200 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                    <i className={`${signal.icon} text-xl`} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground-950 mb-2">
                    {isEn ? signal.titleEn : signal.titleFr}
                  </h3>
                  <p className="text-sm text-foreground-600">
                    {isEn ? signal.descriptionEn : signal.descriptionFr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === CTA SECTION === */}
        <section className="py-12 md:py-16 bg-background-950 text-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {isEn ? 'Ready to transform your institution?' : 'Prêt à transformer votre institution ?'}
            </h2>
            <p className="text-lg text-foreground-200 mb-8 max-w-2xl mx-auto">
              {isEn
                ? 'Book a 30-minute strategic call. We will identify your priorities and send you a personalized roadmap within 48 hours.'
                : 'Réservez un appel stratégique de 30 minutes. Nous identifierons vos priorités et vous enverrons une roadmap personnalisée sous 48h.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PremiumCTA variant="diagnostic" size="lg" />
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-phone-line" />
                {isEn ? 'Contact us' : 'Nous contacter'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}



