import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { BrochureDownloadButton } from '@/components/feature/BrochureDownloadButton';
import SchemaFAQPage from '@/components/feature/SchemaFAQPage';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const PAGE_PATH = '/case-studies/prix-transfert-microfinance-groupe-panafricain';

const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=modern%20african%20microfinance%20institution%20headquarters%20in%20West%20Africa%20Lome%20Togo%2C%20senior%20financial%20executives%20and%20tax%20directors%20reviewing%20transfer%20pricing%20documentation%20and%20intra-group%20transaction%20flowcharts%20around%20elegant%20conference%20table%2C%20sophisticated%20corporate%20boardroom%20with%20warm%20amber%20and%20teal%20green%20accents%2C%20panoramic%20windows%20overlooking%20city%20skyline%2C%20detailed%20financial%20charts%20and%20OECD%20transfer%20pricing%20guidelines%20documents%20spread%20across%20the%20table%2C%20professional%20atmosphere%20with%20subtle%20gold%20lighting%2C%20high-end%20institutional%20photography%20showing%20compliance%20and%20fiscal%20governance%20excellence&width=1600&height=800&seq=cs-prix-transfert-mf-hero-v1&orientation=landscape';

const buildStructuredData = (isEn: boolean) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}${PAGE_PATH}#article`,
      headline: isEn
        ? 'Case Study: Securing Transfer Pricing of a Microfinance Institution within a Pan-African Banking Group'
        : 'Étude de cas : Sécurisation des prix de transfert d\'une institution de microfinance membre d\'un groupe bancaire panafricain',
      description: isEn
        ? 'How KHEPRA EXPERTS helped a leading West African microfinance institution — subsidiary of a pan-African banking group — strengthen its transfer pricing compliance. Intra-group transaction mapping, FAR functional analysis, OECD documentation, economic benchmarking, and tax governance framework across UEMOA/CEMAC jurisdictions.'
        : 'Comment KHEPRA EXPERTS a accompagné une institution de microfinance de premier plan en Afrique de l\'Ouest — filiale d\'un groupe bancaire panafricain — dans le renforcement de sa conformité prix de transfert. Cartographie des flux intragroupe, analyse fonctionnelle FAR, documentation OCDE, études économiques et gouvernance fiscale en zone UEMOA/CEMAC.',
      image: HERO_IMAGE,
      author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
      publisher: { '@id': `${SITE_URL}/#organization` },
      datePublished: '2026-06-05',
      dateModified: '2026-06-05',
      inLanguage: isEn ? 'en-US' : 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      about: [
        { '@type': 'Thing', name: 'Prix de transfert' },
        { '@type': 'Thing', name: 'Microfinance' },
        { '@type': 'Thing', name: 'Fiscalité internationale' },
        { '@type': 'Thing', name: 'Documentation OCDE' },
        { '@type': 'Thing', name: 'UEMOA' },
        { '@type': 'Thing', name: 'CEMAC' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${PAGE_PATH}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Case Studies' : 'Études de cas', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: isEn ? 'Transfer Pricing — Microfinance' : 'Prix de Transfert — Microfinance' },
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'KHEPRA EXPERTS',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 250, height: 60 },
      address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
    },
  ],
});

export default function PrixTransfertCaseStudyPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const contactRef = useRef<HTMLDivElement>(null);

  const ogTitle = isEn
    ? 'Case Study: Transfer Pricing Compliance — Microfinance & Pan-African Banking Group | KHEPRA EXPERTS'
    : 'Étude de cas : Sécurisation des prix de transfert — Microfinance & Groupe Bancaire Panafricain | KHEPRA EXPERTS';

  const ogDescription = isEn
    ? 'How KHEPRA EXPERTS secured transfer pricing for a leading West African microfinance institution within a pan-African banking group. Intra-group transaction mapping, FAR analysis, OECD documentation, economic benchmarking, tax governance across UEMOA/CEMAC.'
    : 'Comment KHEPRA EXPERTS a sécurisé les prix de transfert d\'une institution de microfinance de premier plan au sein d\'un groupe bancaire panafricain. Cartographie flux intragroupe, analyse FAR, documentation OCDE, benchmarking économique, gouvernance fiscale UEMOA/CEMAC.';

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={ogTitle}
        description={ogDescription}
        keywords={isEn
          ? 'transfer pricing case study microfinance Africa, OECD documentation West Africa, FAR functional analysis UEMOA, intra-group transactions banking group, tax compliance CEMAC, arm\'s length principle Francophone Africa, KHEPRA EXPERTS transfer pricing, microfinance fiscal governance, management fees tax audit BEPS'
          : 'étude de cas prix de transfert microfinance Afrique, documentation OCDE Afrique de l\'Ouest, analyse fonctionnelle FAR UEMOA, transactions intragroupe groupe bancaire, conformité fiscale CEMAC, principe pleine concurrence Afrique francophone, KHEPRA EXPERTS prix de transfert, gouvernance fiscale microfinance, management fees contrôle fiscal BEPS'}
        canonicalPath={PAGE_PATH}
        ogType="article"
        ogImage={OG_IMAGES.CASE_STUDIES}
        ogImageAlt={isEn
          ? 'Transfer Pricing Case Study — Microfinance & Pan-African Banking Group — KHEPRA EXPERTS'
          : 'Étude de cas Prix de Transfert — Microfinance & Groupe Bancaire Panafricain — KHEPRA EXPERTS'}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        twitterLabel1={isEn ? 'Coverage' : 'Couverture'}
        twitterData1="UEMOA / CEMAC"
        twitterLabel2={isEn ? 'Mission duration' : 'Durée mission'}
        twitterData2={isEn ? 'Multi-phase' : 'Multi-phases'}
        structuredData={buildStructuredData(isEn)}
        hreflangLinks={STATIC_HREFLANG_MAP[PAGE_PATH + '/']}
        articleSection={isEn ? 'Case Studies' : 'Études de cas'}
        articleTags={isEn ? ['Transfer Pricing', 'Microfinance', 'OECD Documentation', 'FAR Analysis', 'Tax Governance', 'UEMOA', 'CEMAC', 'BEPS', 'Intra-Group Transactions', 'Fiscal Compliance'] : ['Prix de Transfert', 'Microfinance', 'Documentation OCDE', 'Analyse FAR', 'Gouvernance Fiscale', 'UEMOA', 'CEMAC', 'BEPS', 'Transactions Intragroupe', 'Conformité Fiscale']}
        articlePublishedTime="2026-06-05"
        articleModifiedTime="2026-06-05"
        articleAuthor="KHEPRA EXPERTS"
      />
      <SchemaFAQPage
        faqs={
          isEn
            ? [
                {
                  question: 'What is transfer pricing and why is it critical for microfinance institutions within banking groups?',
                  answer: 'Transfer pricing refers to the pricing of transactions between related entities within the same group. For a microfinance institution within a banking group, these transactions must comply with the arm\'s length principle. Failure to document and justify these prices can lead to tax reassessments, rejected expense deductions, and significant penalties — often hundreds of millions of FCFA.',
                },
                {
                  question: 'What are the OECD documentation requirements for transfer pricing?',
                  answer: 'The OECD BEPS Action 13 framework requires Master File (global overview), Local File (detailed controlled transactions and functional analysis), and Country-by-Country Reporting. While CbCR is for larger groups, Master File and Local File are increasingly required by African tax administrations.',
                },
                {
                  question: 'How does KHEPRA EXPERTS approach transfer pricing compliance for financial institutions in Francophone Africa?',
                  answer: 'KHEPRA EXPERTS deploys a 5-phase methodology: (1) Diagnostic — mapping controlled transactions; (2) FAR Functional Analysis; (3) Economic Analysis — benchmarking, arm\'s length assessment; (4) Documentation — Local File, internal policy, tax defense framework; (5) Capacity Building — training Finance, Tax, Compliance teams.',
                },
                {
                  question: 'What are the main transfer pricing risks for microfinance institutions in UEMOA and CEMAC zones?',
                  answer: 'The main risks include: management fees (primary audit target), undocumented cost allocation keys, intra-group financing not reflecting market conditions, shared IT services under scrutiny, and absence of formal documentation — which alone can trigger penalties even without fraud.',
                },
              ]
            : [
                {
                  question: 'Qu\'est-ce que les prix de transfert et pourquoi sont-ils critiques pour les institutions de microfinance au sein d\'un groupe bancaire ?',
                  answer: 'Les prix de transfert désignent la tarification des transactions entre entités liées d\'un même groupe. Pour une institution de microfinance membre d\'un groupe bancaire, ces transactions doivent respecter le principe de pleine concurrence. L\'absence de documentation et de justification peut conduire à des redressements fiscaux, au rejet des charges et à des pénalités substantielles — souvent de plusieurs centaines de millions de FCFA.',
                },
                {
                  question: 'Quelles sont les exigences de documentation OCDE en matière de prix de transfert ?',
                  answer: 'Le cadre OCDE BEPS Action 13 requiert : Master File (vision globale du groupe), Local File (transactions contrôlées détaillées et analyse fonctionnelle), et Country-by-Country Reporting. Si le CbCR est pour les grands groupes, le Master File et le Local File sont de plus en plus exigés par les administrations fiscales africaines.',
                },
                {
                  question: 'Comment KHEPRA EXPERTS aborde-t-il la conformité prix de transfert des institutions financières en Afrique francophone ?',
                  answer: 'KHEPRA EXPERTS déploie une méthodologie en 5 phases : (1) Diagnostic — cartographie des transactions contrôlées ; (2) Analyse Fonctionnelle FAR ; (3) Analyse Économique — benchmarking, évaluation pleine concurrence ; (4) Documentation — Local File, politique interne, cadre de défense fiscale ; (5) Renforcement des Capacités — formation des équipes Finance, Fiscalité, Conformité.',
                },
                {
                  question: 'Quels sont les principaux risques de prix de transfert pour les institutions de microfinance en zone UEMOA et CEMAC ?',
                  answer: 'Les principaux risques incluent : les management fees (première cible des contrôles), les clés de répartition non documentées, le financement intragroupe ne reflétant pas les conditions de marché, les services informatiques mutualisés de plus en plus scrutés, et l\'absence de documentation formelle — qui seule peut déclencher des pénalités même sans fraude.',
                },
              ]
        }
      />
      <Navigation />

      <div className="pt-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3">
          <Breadcrumb
            variant="dark"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'Case Studies' : 'Études de cas', href: '/case-studies' },
              { label: isEn ? 'Transfer Pricing — Microfinance' : 'Prix de Transfert — Microfinance' },
            ]}
          />
        </div>
      </div>

      <main>
        <HeroSection isEn={isEn} />
        <ExecutiveSummary isEn={isEn} contactRef={contactRef} />
        <ContextSection isEn={isEn} />
        <MethodologySection isEn={isEn} />
        <ResultsSection isEn={isEn} />
        <KeySuccessFactorsSection isEn={isEn} />
        <ValueAddedSection isEn={isEn} />
        <FAQSection isEn={isEn} />
        <CTASection isEn={isEn} contactRef={contactRef} />
      </main>

      <Footer />
    </div>
  );
}

// ═══════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════
function HeroSection({ isEn }: { isEn: boolean }) {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-end pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt={isEn ? 'Transfer pricing compliance — Microfinance & Pan-African Banking Group — KHEPRA EXPERTS case study' : 'Conformité prix de transfert — Microfinance & Groupe Bancaire Panafricain — Étude de cas KHEPRA EXPERTS'}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/25 border border-amber-400/45 text-amber-300">
              <i className="ri-vip-crown-line"></i>
              {isEn ? 'Featured Case Study' : 'Étude de cas phare'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-calendar-line"></i>
              2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-bank-line"></i>
              {isEn ? 'Microfinance' : 'Microfinance'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-global-line"></i>
              {isEn ? 'UEMOA / CEMAC' : 'UEMOA / CEMAC'}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {isEn
              ? 'Securing Transfer Pricing of a Microfinance Institution within a Pan-African Banking Group'
              : 'Sécurisation des prix de transfert d\'une institution de microfinance membre d\'un groupe bancaire panafricain'}
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed">
            {isEn
              ? 'How KHEPRA EXPERTS accompanied a leading West African microfinance institution — subsidiary of a pan-African banking group operating across multiple UEMOA and CEMAC jurisdictions — in mapping intra-group transactions, producing OECD-compliant documentation, and building a defendable tax governance framework to mitigate transfer pricing exposure.'
              : 'Comment KHEPRA EXPERTS a accompagné une institution de microfinance de premier plan en Afrique de l\'Ouest — filiale d\'un groupe bancaire panafricain présent dans plusieurs juridictions UEMOA et CEMAC — dans la cartographie des transactions intragroupe, la production d\'une documentation conforme aux standards OCDE et la construction d\'un cadre de gouvernance fiscale défendable pour réduire l\'exposition aux risques de prix de transfert.'}
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// EXECUTIVE SUMMARY
// ═══════════════════════════════════════════
function ExecutiveSummary({ isEn, contactRef }: { isEn: boolean; contactRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <i className="ri-flashlight-line text-amber-600 text-lg"></i>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {isEn ? 'Executive Summary' : 'Synthèse Exécutive'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { value: '6', label: isEn ? 'Intra-group transaction types mapped' : 'Types de transactions intragroupe cartographiés', icon: 'ri-git-branch-line' },
              { value: '5', label: isEn ? 'Phases of intervention deployed' : 'Phases d\'intervention déployées', icon: 'ri-stack-line' },
              { value: 'OECD', label: isEn ? 'Documentation standards applied' : 'Standards de documentation appliqués', icon: 'ri-file-text-line' },
              { value: '4', label: isEn ? 'Risks identified and mitigated' : 'Risques identifiés et traités', icon: 'ri-shield-check-line' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-50 to-white border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                  <i className={`${stat.icon} text-amber-600 text-lg`}></i>
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-amber-600 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            {isEn
              ? 'A leading microfinance institution operating in West Africa, subsidiary of a pan-African banking group present across multiple UEMOA and CEMAC jurisdictions, sought KHEPRA EXPERTS\' assistance to strengthen its tax compliance framework. The institution was engaged in several intra-group transactions with its parent company and affiliated entities — including management and governance services, IT and cybersecurity support, shared digital solutions, compliance and internal control services, staff training, and intra-group financing. Following the evolution of the national fiscal framework and the intensification of transfer pricing controls, the General Management wished to assess its exposure level and secure its practices.'
              : 'Une institution de microfinance de premier plan opérant en Afrique de l\'Ouest, filiale d\'un groupe bancaire panafricain présent dans plusieurs juridictions UEMOA et CEMAC, a sollicité l\'assistance de KHEPRA EXPERTS dans le cadre du renforcement de sa conformité fiscale. L\'établissement réalisait plusieurs transactions intragroupe avec sa société mère et d\'autres entités affiliées du groupe — notamment des prestations de management et de gouvernance, d\'assistance informatique et cybersécurité, d\'utilisation de solutions numériques mutualisées, de services de conformité et de contrôle interne, de formation du personnel et de financement intragroupe. À la suite d\'une évolution du cadre fiscal national et du renforcement des contrôles relatifs aux prix de transfert, la Direction Générale souhaitait évaluer son niveau d\'exposition et sécuriser ses pratiques.'}
          </p>

          <p className="text-gray-700 leading-relaxed mt-4">
            <strong className="text-gray-900">
              {isEn ? 'KHEPRA EXPERTS deployed a rigorous 5-phase methodology' : 'KHEPRA EXPERTS a déployé une méthodologie rigoureuse en 5 phases'}
            </strong>
            {isEn
              ? ' — Diagnostic of intra-group flows, FAR Functional Analysis, Economic Analysis, OECD Documentation, and Capacity Building — delivering a complete transfer pricing compliance framework, including a Local File, an internal transfer pricing policy, a tax defense documentation repository, and trained teams across Finance, Tax, Internal Control, and Compliance functions.'
              : ' — Diagnostic des flux intragroupe, Analyse Fonctionnelle FAR, Analyse Économique, Documentation OCDE et Renforcement des Capacités — livrant un cadre complet de conformité prix de transfert incluant un dossier Local File, une politique interne de prix de transfert, un référentiel documentaire de défense fiscale et des équipes formées sur les fonctions Finance, Fiscalité, Contrôle Interne et Conformité.'}
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// I. CONTEXTE ET ENJEUX
// ═══════════════════════════════════════════
function ContextSection({ isEn }: { isEn: boolean }) {
  const transactions = [
    { icon: 'ri-user-star-line', labelFr: 'Prestations de management et de gouvernance', labelEn: 'Management & governance services' },
    { icon: 'ri-computer-line', labelFr: 'Assistance informatique et cybersécurité', labelEn: 'IT & cybersecurity support' },
    { icon: 'ri-smartphone-line', labelFr: 'Utilisation de solutions numériques mutualisées', labelEn: 'Shared digital solutions' },
    { icon: 'ri-shield-check-line', labelFr: 'Services de conformité et de contrôle interne', labelEn: 'Compliance & internal control services' },
    { icon: 'ri-graduation-cap-line', labelFr: 'Formation du personnel', labelEn: 'Staff training' },
    { icon: 'ri-money-dollar-circle-line', labelFr: 'Financement intragroupe', labelEn: 'Intra-group financing' },
  ];

  const risks = [
    {
      num: '1',
      icon: 'ri-file-warning-line',
      color: 'bg-red-500',
      titleFr: 'Risque n°1 : Documentation insuffisante',
      titleEn: 'Risk #1: Insufficient Documentation',
      descFr: 'Les conventions intragroupe existaient mais ne démontraient pas toujours la réalité des prestations, les bénéfices obtenus par la filiale, ni la justification économique des coûts refacturés.',
      descEn: 'Existing intra-group agreements did not always demonstrate the actual delivery of services, the benefits obtained by the subsidiary, or the economic justification of the re-invoiced costs.',
    },
    {
      num: '2',
      icon: 'ri-pie-chart-2-line',
      color: 'bg-amber-500',
      titleFr: 'Risque n°2 : Méthodologie de refacturation non documentée',
      titleEn: 'Risk #2: Undocumented Cost Allocation Methodology',
      descFr: 'Les clés de répartition utilisées au niveau du groupe pour la refacturation des coûts n\'étaient pas suffisamment formalisées ni justifiées.',
      descEn: 'The cost allocation keys used at the group level for re-invoicing were not sufficiently formalized or justified.',
    },
    {
      num: '3',
      icon: 'ri-error-warning-line',
      color: 'bg-orange-500',
      titleFr: 'Risque n°3 : Exposition lors d\'un contrôle fiscal',
      titleEn: 'Risk #3: Tax Audit Exposure',
      descFr: 'L\'absence d\'une documentation conforme aux standards internationaux pouvait conduire à un rejet partiel des charges, une réintégration fiscale et l\'application de pénalités.',
      descEn: 'The absence of documentation compliant with international standards could lead to partial rejection of expenses, tax reassessments, and the application of penalties.',
    },
    {
      num: '4',
      icon: 'ri-government-line',
      color: 'bg-indigo-500',
      titleFr: 'Risque n°4 : Gouvernance fiscale inexistante',
      titleEn: 'Risk #4: No Tax Governance Framework',
      descFr: 'Aucune politique locale de prix de transfert n\'avait été formellement adoptée, laissant l\'institution sans cadre de référence pour la gestion des transactions intragroupe.',
      descEn: 'No formal local transfer pricing policy had been adopted, leaving the institution without a reference framework for managing intra-group transactions.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-search-eye-line"></i>
            {isEn ? 'PART I' : 'PARTIE I'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Context and Challenges' : 'Le Contexte et les Enjeux'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Context */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-building-2-line text-amber-600"></i>
              {isEn ? 'A Microfinance Institution at the Heart of a Pan-African Banking Group' : 'Une institution de microfinance au cœur d\'un groupe bancaire panafricain'}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {isEn
                ? 'The institution — a leading microfinance player in West Africa — operates as a subsidiary of a pan-African banking group with a presence across multiple jurisdictions in both the UEMOA and CEMAC monetary zones. As part of its integration within the group, the institution was party to a range of intra-group transactions covering management, technology, compliance, training, and financing. These transactions, while commercially rational from a group perspective, lacked the robust documentation required by emerging transfer pricing regulations in Francophone Africa.'
                : 'L\'institution — un acteur majeur de la microfinance en Afrique de l\'Ouest — opère comme filiale d\'un groupe bancaire panafricain présent dans de multiples juridictions des zones monétaires UEMOA et CEMAC. Dans le cadre de son intégration au groupe, l\'institution était partie à une gamme de transactions intragroupe couvrant le management, la technologie, la conformité, la formation et le financement. Ces transactions, bien que commercialement rationnelles du point de vue du groupe, manquaient de la documentation robuste requise par les réglementations émergentes en matière de prix de transfert en Afrique francophone.'}
            </p>

            {/* Intra-group transactions */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                {isEn ? 'Intra-Group Transactions Involved' : 'Transactions intragroupe concernées'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {transactions.map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white rounded-lg p-3 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                      <i className={`${t.icon} text-amber-600 text-sm`}></i>
                    </div>
                    <span className="text-sm text-gray-700 font-medium leading-tight">
                      {isEn ? t.labelEn : t.labelFr}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Risks */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="ri-error-warning-line text-amber-600"></i>
              {isEn ? 'Four Critical Risks Identified During the Diagnostic Phase' : 'Quatre risques critiques identifiés lors de la phase de diagnostic'}
            </h3>
            <div className="space-y-4">
              {risks.map((risk) => (
                <div key={risk.num} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${risk.color} flex items-center justify-center shrink-0`}>
                      <i className={`${risk.icon} text-white text-lg`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base mb-1">
                        {isEn ? risk.titleEn : risk.titleFr}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {isEn ? risk.descEn : risk.descFr}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk summary box */}
          <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-xl p-6 border border-red-100">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="ri-alert-fill text-red-600"></i>
              {isEn ? 'Critical Finding: The Cost of Non-Compliance' : 'Constat critique : Le coût de la non-conformité'}
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {isEn
                ? 'The diagnostic revealed a structural vulnerability: while the intra-group transactions were economically justified and commercially reasonable, the institutional inability to demonstrate — in a documented, auditable manner — the reality, arm\'s length nature, and economic benefit of these transactions exposed the institution to a high level of tax risk. In the event of a tax audit, the absence of an OECD-compliant Local File could lead to the rejection of significant expense deductions, tax reassessments, and penalties — potentially amounting to several hundred million FCFA — even in the absence of any fraudulent intent.'
                : 'Le diagnostic a révélé une vulnérabilité structurelle : si les transactions intragroupe étaient économiquement justifiées et commercialement raisonnables, l\'incapacité institutionnelle à démontrer — de manière documentée et auditable — la réalité, la conformité au principe de pleine concurrence et le bénéfice économique de ces transactions exposait l\'institution à un risque fiscal élevé. En cas de contrôle, l\'absence d\'un dossier Local File conforme aux standards OCDE pourrait entraîner le rejet de déductions de charges significatives, des réintégrations fiscales et des pénalités — potentiellement de plusieurs centaines de millions de FCFA — même en l\'absence de toute intention frauduleuse.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// II. MÉTHODOLOGIE
// ═══════════════════════════════════════════
function MethodologySection({ isEn }: { isEn: boolean }) {
  const phases = [
    {
      num: '1',
      icon: 'ri-search-eye-line',
      color: 'bg-amber-100 text-amber-700',
      borderColor: 'border-amber-200',
      bgColor: 'bg-amber-50',
      titleFr: 'Phase 1 — Diagnostic des flux intragroupe',
      titleEn: 'Phase 1 — Intra-Group Flow Diagnostic',
      activitiesFr: [
        'Identification exhaustive des transactions contrôlées entre l\'institution et les entités du groupe',
        'Revue détaillée des conventions intragroupe existantes et de leur effectivité',
        'Analyse des schémas de facturation et des flux financiers entre les différentes entités',
        'Cartographie complète des flux financiers intragroupe sur 3 exercices',
      ],
      activitiesEn: [
        'Exhaustive identification of controlled transactions between the institution and group entities',
        'Detailed review of existing intra-group agreements and their effectiveness',
        'Analysis of billing schemes and financial flows between the various entities',
        'Complete mapping of intra-group financial flows over 3 fiscal years',
      ],
      deliverablesFr: 'Rapport de diagnostic des flux intragroupe, cartographie exhaustive des transactions contrôlées, matrice des conventions existantes avec évaluation de leur conformité aux exigences prix de transfert.',
      deliverablesEn: 'Intra-group flow diagnostic report, exhaustive mapping of controlled transactions, matrix of existing agreements with assessment of their compliance with transfer pricing requirements.',
    },
    {
      num: '2',
      icon: 'ri-bar-chart-grouped-line',
      color: 'bg-green-100 text-green-700',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50',
      titleFr: 'Phase 2 — Analyse fonctionnelle (FAR)',
      titleEn: 'Phase 2 — Functional Analysis (FAR)',
      activitiesFr: [
        'Identification et documentation des fonctions exercées par chaque entité concernée',
        'Analyse détaillée des actifs utilisés dans les transactions intragroupe',
        'Évaluation et cartographie des risques assumés par chaque entité',
        'Détermination de la contribution économique réelle de chaque entité à la chaîne de valeur du groupe',
      ],
      activitiesEn: [
        'Identification and documentation of functions performed by each concerned entity',
        'Detailed analysis of assets used in intra-group transactions',
        'Assessment and mapping of risks assumed by each entity',
        'Determination of the real economic contribution of each entity to the group value chain',
      ],
      deliverablesFr: 'Rapport d\'analyse fonctionnelle FAR complet pour l\'institution et les entités liées concernées, matrice fonctions-actifs-risques, profil fonctionnel documenté pour chaque type de transaction.',
      deliverablesEn: 'Complete FAR functional analysis report for the institution and relevant related entities, functions-assets-risks matrix, documented functional profile for each transaction type.',
    },
    {
      num: '3',
      icon: 'ri-line-chart-line',
      color: 'bg-blue-100 text-blue-700',
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50',
      titleFr: 'Phase 3 — Analyse économique',
      titleEn: 'Phase 3 — Economic Analysis',
      activitiesFr: [
        'Évaluation des méthodes de détermination des prix de transfert applicables',
        'Analyse critique des clés de répartition des coûts utilisées au niveau du groupe',
        'Vérification de la cohérence économique des marges et commissions appliquées',
        'Formulation de recommandations d\'alignement avec le principe de pleine concurrence',
      ],
      activitiesEn: [
        'Assessment of applicable transfer pricing methods',
        'Critical analysis of cost allocation keys used at the group level',
        'Verification of the economic consistency of applied margins and commissions',
        'Formulation of recommendations for alignment with the arm\'s length principle',
      ],
      deliverablesFr: 'Rapport d\'analyse économique, évaluation de la conformité des méthodes de prix aux standards OCDE, recommandations d\'ajustement des clés de répartition et des marges.',
      deliverablesEn: 'Economic analysis report, assessment of pricing method compliance with OECD standards, recommendations for adjusting cost allocation keys and margins.',
    },
    {
      num: '4',
      icon: 'ri-file-text-line',
      color: 'bg-purple-100 text-purple-700',
      borderColor: 'border-purple-200',
      bgColor: 'bg-purple-50',
      titleFr: 'Phase 4 — Documentation',
      titleEn: 'Phase 4 — Documentation',
      activitiesFr: [
        'Élaboration du dossier Local File de prix de transfert conforme aux standards OCDE',
        'Rédaction d\'une politique interne de prix de transfert validée par la Direction Générale',
        'Constitution d\'un référentiel documentaire complet de défense fiscale',
        'Mise en place de procédures de conservation et d\'archivage des preuves documentaires',
      ],
      activitiesEn: [
        'Development of a transfer pricing Local File compliant with OECD standards',
        'Drafting of an internal transfer pricing policy validated by General Management',
        'Constitution of a complete tax defense documentation repository',
        'Implementation of procedures for document retention and archiving',
      ],
      deliverablesFr: 'Dossier Local File complet, politique interne de prix de transfert formalisée et approuvée, référentiel documentaire de défense fiscale structuré, procédures de conservation des preuves.',
      deliverablesEn: 'Complete Local File, formalized and approved internal transfer pricing policy, structured tax defense documentation repository, evidence retention procedures.',
    },
    {
      num: '5',
      icon: 'ri-graduation-cap-line',
      color: 'bg-teal-100 text-teal-700',
      borderColor: 'border-teal-200',
      bgColor: 'bg-teal-50',
      titleFr: 'Phase 5 — Renforcement des capacités',
      titleEn: 'Phase 5 — Capacity Building',
      activitiesFr: [
        'Formation ciblée des équipes Finance, Fiscalité, Contrôle Interne et Conformité',
        'Sensibilisation aux exigences réglementaires applicables en matière de prix de transfert',
        'Transfert de compétences sur la mise à jour et le maintien de la documentation',
        'Élaboration d\'un guide pratique interne de gestion des prix de transfert',
      ],
      activitiesEn: [
        'Targeted training for Finance, Tax, Internal Control, and Compliance teams',
        'Awareness-raising on applicable transfer pricing regulatory requirements',
        'Skills transfer on documentation updating and maintenance',
        'Development of a practical internal guide for transfer pricing management',
      ],
      deliverablesFr: 'Modules de formation délivrés aux équipes concernées, guide pratique interne de gestion des prix de transfert, compétences transférées pour la mise à jour continue de la documentation.',
      deliverablesEn: 'Training modules delivered to relevant teams, practical internal guide for transfer pricing management, transferred skills for ongoing documentation updates.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 mb-3">
            <i className="ri-tools-line"></i>
            {isEn ? 'PART II' : 'PARTIE II'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'KHEPRA EXPERTS\' Intervention' : 'L\'Intervention de Khepra Experts'}
          </h2>
          <p className="text-gray-600 max-w-3xl">
            {isEn
              ? 'We deployed a rigorous 5-phase methodology, aligned with OECD Transfer Pricing Guidelines, combining diagnostic analysis, functional assessment, economic benchmarking, documentation production, and capacity building — each phase producing tangible, operational deliverables.'
              : 'Nous avons déployé une méthodologie rigoureuse en 5 phases, alignée sur les principes directeurs OCDE en matière de prix de transfert, combinant diagnostic, analyse fonctionnelle, benchmarking économique, production documentaire et renforcement des capacités — chaque phase produisant des livrables tangibles et opérationnels.'}
          </p>
          <div className="w-20 h-1 bg-amber-500 rounded-full mt-4"></div>
        </div>

        <div className="space-y-6">
          {phases.map((phase) => (
            <div key={phase.num} className={`${phase.bgColor} rounded-2xl border ${phase.borderColor} p-6 md:p-8`}>
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className={`w-12 h-12 rounded-xl ${phase.color} flex items-center justify-center shrink-0`}>
                  <span className="text-xl font-extrabold">{phase.num}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <i className={`${phase.icon} text-gray-700`}></i>
                    {isEn ? phase.titleEn : phase.titleFr}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                        {isEn ? 'Activities' : 'Activités'}
                      </h4>
                      <ul className="space-y-1.5">
                        {(isEn ? phase.activitiesEn : phase.activitiesFr).map((activity, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <i className="ri-checkbox-circle-fill text-gray-500 mt-0.5 shrink-0"></i>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                        {isEn ? 'Key Deliverables' : 'Livrables clés'}
                      </h4>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {isEn ? phase.deliverablesEn : phase.deliverablesFr}
                        </p>
                      </div>
                    </div>
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

// ═══════════════════════════════════════════
// III. RÉSULTATS
// ═══════════════════════════════════════════
function ResultsSection({ isEn }: { isEn: boolean }) {
  const results = [
    {
      icon: 'ri-shield-check-line',
      color: 'bg-green-500',
      titleFr: 'Conformité renforcée',
      titleEn: 'Strengthened Compliance',
      descFr: 'L\'institution dispose désormais d\'une documentation structurée, complète et défendable en cas de contrôle fiscal — incluant un dossier Local File conforme aux standards OCDE, une politique interne formalisée et un cadre de gouvernance documenté.',
      descEn: 'The institution now has structured, complete, and defendable documentation in the event of a tax audit — including an OECD-compliant Local File, a formalized internal policy, and a documented governance framework.',
    },
    {
      icon: 'ri-arrow-down-circle-line',
      color: 'bg-amber-500',
      titleFr: 'Réduction du risque fiscal',
      titleEn: 'Reduced Tax Risk',
      descFr: 'Les principaux risques de remise en cause des charges intragroupe ont été identifiés, évalués et traités de manière proactive. L\'exposition à un redressement fiscal a été significativement réduite grâce à une documentation robuste et une justification économique documentée.',
      descEn: 'The main risks of intra-group expense challenges have been identified, assessed, and proactively addressed. Exposure to tax reassessment has been significantly reduced through robust documentation and documented economic justification.',
    },
    {
      icon: 'ri-government-line',
      color: 'bg-indigo-500',
      titleFr: 'Gouvernance améliorée',
      titleEn: 'Improved Governance',
      descFr: 'Une politique de prix de transfert validée par la Direction Générale encadre désormais l\'ensemble des transactions avec les entités du groupe, établissant une référence claire et opposable pour la gestion des flux intragroupe.',
      descEn: 'A transfer pricing policy validated by General Management now governs all transactions with group entities, establishing a clear and binding reference for managing intra-group flows.',
    },
    {
      icon: 'ri-team-line',
      color: 'bg-teal-500',
      titleFr: 'Sécurisation des relations avec le groupe',
      titleEn: 'Secured Group Relations',
      descFr: 'Les mécanismes de refacturation, les responsabilités des différentes parties et les obligations documentaires ont été clarifiés, formalisés et documentés, renforçant la transparence et la confiance entre les entités du groupe.',
      descEn: 'Re-invoicing mechanisms, responsibilities of the different parties, and documentary obligations have been clarified, formalized, and documented, strengthening transparency and trust between group entities.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-trophy-line"></i>
            {isEn ? 'PART III' : 'PARTIE III'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Results Achieved' : 'Résultats Obtenus'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>

        <div className="space-y-6">
          {results.map((result, i) => (
            <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${result.color} flex items-center justify-center shrink-0`}>
                  <i className={`${result.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {isEn ? result.titleEn : result.titleFr}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {isEn ? result.descEn : result.descFr}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <i className="ri-close-circle-line text-red-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-red-900 text-lg">{isEn ? 'Before KHEPRA EXPERTS' : 'Avant KHEPRA EXPERTS'}</h3>
            </div>
            <ul className="space-y-2">
              {[
                isEn ? 'Intra-group agreements existing but insufficient — no demonstration of actual service delivery or benefit' : 'Conventions intragroupe existantes mais insuffisantes — aucune démonstration de la réalité des prestations ni des bénéfices',
                isEn ? 'Cost allocation keys not formalized — group-level methodologies undocumented and unjustified' : 'Clés de répartition des coûts non formalisées — méthodologies groupe non documentées et non justifiées',
                isEn ? 'No OECD-compliant documentation — high exposure to expense rejection, tax reassessment, and penalties' : 'Aucune documentation conforme OCDE — forte exposition au rejet des charges, réintégration fiscale et pénalités',
                isEn ? 'No formal transfer pricing policy adopted — governance vacuum on intra-group transactions' : 'Aucune politique de prix de transfert formellement adoptée — vide de gouvernance sur les transactions intragroupe',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                  <i className="ri-close-line text-red-500 mt-0.5 shrink-0"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-green-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-green-900 text-lg">{isEn ? 'After KHEPRA EXPERTS' : 'Après KHEPRA EXPERTS'}</h3>
            </div>
            <ul className="space-y-2">
              {[
                isEn ? 'OECD-compliant Local File — structured, complete, and defendable tax documentation' : 'Dossier Local File conforme OCDE — documentation fiscale structurée, complète et défendable',
                isEn ? 'FAR functional analysis documented — clear economic contribution of each entity demonstrated' : 'Analyse fonctionnelle FAR documentée — contribution économique claire de chaque entité démontrée',
                isEn ? 'Formalized internal transfer pricing policy — validated by General Management, governing all intra-group transactions' : 'Politique interne de prix de transfert formalisée — validée par la Direction Générale, encadrant toutes les transactions intragroupe',
                isEn ? 'Trained teams across Finance, Tax, Internal Control & Compliance — autonomous capability for ongoing documentation maintenance' : 'Équipes formées Finance, Fiscalité, Contrôle Interne & Conformité — autonomie pour la maintenance continue de la documentation',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                  <i className="ri-check-line text-green-500 mt-0.5 shrink-0"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// IV. FACTEURS CLÉS DE SUCCÈS
// ═══════════════════════════════════════════
function KeySuccessFactorsSection({ isEn }: { isEn: boolean }) {
  const factors = [
    {
      icon: 'ri-global-line',
      titleFr: 'Approche fondée sur les standards OCDE',
      titleEn: 'Approach Based on OECD Standards',
      descFr: 'Une méthodologie rigoureusement alignée sur les Principes Directeurs de l\'OCDE en matière de prix de transfert et le cadre BEPS Action 13, garantissant une documentation reconnue et défendable auprès des administrations fiscales.',
      descEn: 'A methodology rigorously aligned with the OECD Transfer Pricing Guidelines and the BEPS Action 13 framework, ensuring documentation that is recognized and defendable before tax administrations.',
    },
    {
      icon: 'ri-bank-line',
      titleFr: 'Compréhension des spécificités du secteur financier',
      titleEn: 'Understanding of Financial Sector Specificities',
      descFr: 'Une expertise approfondie du cadre réglementaire applicable aux institutions financières — microfinance, banques, SFD — et des transactions spécifiques au secteur (management fees, IT partagé, refinancement intragroupe).',
      descEn: 'In-depth expertise in the regulatory framework applicable to financial institutions — microfinance, banks, MFIs — and sector-specific transactions (management fees, shared IT, intra-group refinancing).',
    },
    {
      icon: 'ri-stack-line',
      titleFr: 'Expertise combinée en fiscalité, conformité et gouvernance',
      titleEn: 'Combined Expertise in Tax, Compliance & Governance',
      descFr: 'Une approche intégrée mobilisant simultanément des compétences en fiscalité internationale, en conformité réglementaire et en gouvernance d\'entreprise — permettant une réponse holistique aux enjeux de prix de transfert.',
      descEn: 'An integrated approach simultaneously mobilizing skills in international taxation, regulatory compliance, and corporate governance — enabling a holistic response to transfer pricing challenges.',
    },
    {
      icon: 'ri-map-pin-2-line',
      titleFr: 'Documentation adaptée au contexte réglementaire africain',
      titleEn: 'Documentation Adapted to the African Regulatory Context',
      descFr: 'Des livrables conçus spécifiquement pour le contexte réglementaire africain — UEMOA, CEMAC, OHADA — prenant en compte les exigences émergentes des administrations fiscales locales et les spécificités des transactions intragroupe en Afrique.',
      descEn: 'Deliverables specifically designed for the African regulatory context — UEMOA, CEMAC, OHADA — taking into account emerging requirements of local tax administrations and the specificities of intra-group transactions in Africa.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 mb-3">
            <i className="ri-star-line"></i>
            {isEn ? 'PART IV' : 'PARTIE IV'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Key Success Factors' : 'Facteurs Clés de Succès'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {factors.map((factor, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <i className={`${factor.icon} text-amber-600 text-lg`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-1">
                    {isEn ? factor.titleEn : factor.titleFr}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {isEn ? factor.descEn : factor.descFr}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// V. VALEUR AJOUTÉE
// ═══════════════════════════════════════════
function ValueAddedSection({ isEn }: { isEn: boolean }) {
  const services = [
    { icon: 'ri-git-branch-line', labelFr: 'Cartographie des transactions intragroupe', labelEn: 'Intra-group transaction mapping' },
    { icon: 'ri-file-text-line', labelFr: 'Documentation des prix de transfert', labelEn: 'Transfer pricing documentation' },
    { icon: 'ri-line-chart-line', labelFr: 'Études économiques', labelEn: 'Economic studies' },
    { icon: 'ri-shield-check-line', labelFr: 'Assistance aux contrôles fiscaux', labelEn: 'Tax audit support' },
    { icon: 'ri-government-line', labelFr: 'Mise en place de politiques de gouvernance fiscale', labelEn: 'Tax governance policy implementation' },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-heart-add-line"></i>
            {isEn ? 'PART V' : 'PARTIE V'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'KHEPRA EXPERTS\' Added Value' : 'Valeur Ajoutée de Khepra Experts'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 p-6 md:p-8">
          <p className="text-gray-700 leading-relaxed mb-6">
            {isEn
              ? 'KHEPRA EXPERTS supports banks, microfinance institutions, fintechs, and pan-African groups in managing their transfer pricing compliance. Our integrated approach — combining international tax expertise, regulatory intelligence, and corporate governance — delivers tangible results that go beyond documentation production: we build defendable tax positions, strengthen institutional governance, and transform tax compliance into a strategic asset.'
              : 'KHEPRA EXPERTS accompagne les banques, institutions de microfinance, fintechs et groupes panafricains dans la gestion de leur conformité prix de transfert. Notre approche intégrée — combinant expertise en fiscalité internationale, intelligence réglementaire et gouvernance d\'entreprise — livre des résultats tangibles qui vont au-delà de la production documentaire : nous construisons des positions fiscales défendables, renforçons la gouvernance institutionnelle et transformons la conformité fiscale en actif stratégique.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {services.map((s, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-white rounded-lg p-3 border border-amber-100">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <i className={`${s.icon} text-amber-600 text-sm`}></i>
                </div>
                <span className="text-sm text-gray-700 font-medium leading-tight">
                  {isEn ? s.labelEn : s.labelFr}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl p-5 border border-gray-200 text-center">
          <p className="text-sm text-gray-500 italic">
            {isEn
              ? 'The client\'s name, financial data, and identifying elements have been voluntarily anonymized to preserve the confidentiality of the engagement.'
              : 'Les noms, données financières et éléments permettant l\'identification du client ont été volontairement anonymisés afin de préserver la confidentialité de la mission.'}
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════
function FAQSection({ isEn }: { isEn: boolean }) {
  const faqs = isEn
    ? [
        {
          q: 'What is transfer pricing and why is it critical for microfinance institutions within banking groups?',
          a: 'Transfer pricing refers to the pricing of transactions between related entities within the same group (management fees, IT services, financing, royalties, etc.). For a microfinance institution that is part of a banking group, these transactions must comply with the arm\'s length principle. Failure to document and justify these prices can lead to tax reassessments, rejected expense deductions, and significant penalties — often hundreds of millions of FCFA.',
        },
        {
          q: 'What are the OECD documentation requirements for transfer pricing?',
          a: 'The OECD BEPS Action 13 framework requires three levels: (1) Master File — global overview of the group\'s business and transfer pricing policies; (2) Local File — detailed controlled transactions, functional analysis, and economic justification; (3) Country-by-Country Reporting (CbCR). While CbCR applies to larger groups, Master File and Local File are increasingly required by African tax administrations.',
        },
        {
          q: 'How does KHEPRA EXPERTS approach transfer pricing compliance for financial institutions in Francophone Africa?',
          a: 'KHEPRA EXPERTS deploys a rigorous 5-phase methodology aligned with OECD standards: (1) Diagnostic — mapping controlled transactions; (2) FAR Functional Analysis; (3) Economic Analysis — benchmarking and arm\'s length assessment; (4) Documentation — Local File, internal policy, tax defense framework; (5) Capacity Building — training Finance, Tax, and Compliance teams.',
        },
        {
          q: 'What are the main transfer pricing risks for microfinance institutions in UEMOA and CEMAC zones?',
          a: 'The main risks include: management fees (primary audit target), undocumented cost allocation keys, intra-group financing not reflecting market conditions, shared IT and digital services under scrutiny, and absence of formal documentation — which alone can trigger penalties even without fraud.',
        },
      ]
    : [
        {
          q: 'Qu\'est-ce que les prix de transfert et pourquoi sont-ils critiques pour les institutions de microfinance au sein de groupes bancaires ?',
          a: 'Les prix de transfert désignent la tarification des transactions entre entités liées d\'un même groupe (management fees, services informatiques, financements, redevances, etc.). Pour une institution de microfinance membre d\'un groupe bancaire, ces transactions doivent respecter le principe de pleine concurrence. L\'absence de documentation et de justification peut conduire à des redressements fiscaux, au rejet des charges et à des pénalités substantielles — souvent de plusieurs centaines de millions de FCFA.',
        },
        {
          q: 'Quelles sont les exigences de documentation OCDE en matière de prix de transfert ?',
          a: 'Le cadre OCDE BEPS Action 13 requiert trois niveaux : (1) Master File — vision globale de l\'activité du groupe et de sa politique de prix de transfert ; (2) Local File — transactions contrôlées détaillées, analyse fonctionnelle et justification économique ; (3) Country-by-Country Reporting (CbCR). Si le CbCR s\'applique aux grands groupes, le Master File et le Local File sont de plus en plus exigés par les administrations fiscales africaines.',
        },
        {
          q: 'Comment KHEPRA EXPERTS aborde-t-il la conformité prix de transfert des institutions financières en Afrique francophone ?',
          a: 'KHEPRA EXPERTS déploie une méthodologie rigoureuse en 5 phases alignée sur les standards OCDE : (1) Diagnostic — cartographie des transactions contrôlées ; (2) Analyse Fonctionnelle FAR ; (3) Analyse Économique — benchmarking et évaluation pleine concurrence ; (4) Documentation — Local File, politique interne, cadre de défense fiscale ; (5) Renforcement des Capacités — formation des équipes Finance, Fiscalité et Conformité.',
        },
        {
          q: 'Quels sont les principaux risques de prix de transfert pour les institutions de microfinance en zone UEMOA et CEMAC ?',
          a: 'Les principaux risques incluent : les management fees (première cible des contrôles fiscaux), les clés de répartition non documentées, le financement intragroupe ne reflétant pas les conditions de marché, les services informatiques et digitaux mutualisés de plus en plus scrutés, et l\'absence de documentation formelle — qui seule peut déclencher des pénalités même sans fraude.',
        },
      ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Frequently Asked Questions' : 'Questions Fréquentes'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="text-base md:text-lg font-bold text-gray-900 pr-8">{faq.q}</h3>
                <i className="ri-arrow-down-s-line text-gray-400 group-open:rotate-180 transition-transform text-xl shrink-0"></i>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// CTA
// ═══════════════════════════════════════════
function CTASection({ isEn, contactRef }: { isEn: boolean; contactRef: React.RefObject<HTMLDivElement | null> }) {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-end pr-8">
        <span className="font-playfair text-[16rem] font-bold text-amber-200 leading-none" style={{ WebkitTextStroke: '2px currentColor', WebkitTextFillColor: 'transparent' }}>
          TP
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 mb-6">
          <i className="ri-chat-quote-line text-amber-400 text-sm"></i>
          <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
            {isEn ? 'Transfer pricing challenge?' : 'Enjeu de prix de transfert ?'}
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
          {isEn
            ? 'Secure your transfer pricing compliance across UEMOA and CEMAC'
            : 'Sécurisez votre conformité prix de transfert en zone UEMOA et CEMAC'}
        </h2>

        <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {isEn
            ? 'KHEPRA EXPERTS supports banks, microfinance institutions, fintechs, and pan-African groups in managing transfer pricing compliance. A free 30-minute strategic diagnostic to assess your exposure and identify priority actions.'
            : 'KHEPRA EXPERTS accompagne les banques, institutions de microfinance, fintechs et groupes panafricains dans la gestion de leur conformité prix de transfert. Un diagnostic stratégique gratuit de 30 minutes pour évaluer votre exposition et identifier les actions prioritaires.'}
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => {
              if (window.REACT_APP_NAVIGATE) window.REACT_APP_NAVIGATE('/diagnostic-flash');
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 text-base"
          >
            <i className="ri-calendar-check-line text-lg"></i>
            {isEn ? 'Book a free diagnostic' : 'Réserver un diagnostic gratuit'}
          </button>
          <BrochureDownloadButton
            variant="secondary"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold whitespace-nowrap cursor-pointer text-base"
            trackingLocation="prix_transfert_case_study_cta"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-white/10">
          {[
            { icon: 'ri-shield-check-line', label: isEn ? 'Confidential' : 'Confidentiel' },
            { icon: 'ri-time-line', label: isEn ? '30 minutes' : '30 minutes' },
            { icon: 'ri-hand-heart-line', label: isEn ? 'No commitment' : 'Sans engagement' },
            { icon: 'ri-global-line', label: 'FR / EN' },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <i className={`${b.icon} text-emerald-400 text-lg`}></i>
              <span className="text-sm text-white/70 font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



