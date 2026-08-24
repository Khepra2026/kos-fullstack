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
const PAGE_PATH = '/case-studies/agrement-multinational-sfd-uemoa-cemac';

const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=panoramic%20aerial%20view%20of%20West%20and%20Central%20Africa%20financial%20regulatory%20landscape%2C%20interconnected%20digital%20banking%20infrastructure%20spanning%20UEMOA%20and%20CEMAC%20monetary%20zones%2C%20modern%20fintech%20governance%20and%20compliance%20orchestration%20concept%2C%20abstract%20visualization%20of%20multi-country%20licensing%20with%20BCEAO%20and%20COBAC%20frameworks%2C%20warm%20golden%20amber%20and%20deep%20teal%20color%20palette%2C%20sophisticated%20institutional%20financial%20consulting%20atmosphere%2C%20premium%20editorial%20photography%20with%20dramatic%20lighting%20over%20african%20continent%20silhouette%2C%20clean%20data%20flow%20patterns%20connecting%20Lom%C3%A9%20Togo%20to%20multiple%20francophone%20african%20capitals&width=1600&height=800&seq=cs-agrement-hero-v2&orientation=landscape';

const buildStructuredData = (isEn: boolean) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}${PAGE_PATH}#article`,
      headline: isEn
        ? 'Case Study: Multi-Zone Regulatory Engineering — Simultaneous MFI Licensing Across Multiple UEMOA/CEMAC Countries | KHEPRA EXPERTS'
        : 'Étude de cas : Ingénierie réglementaire multi-zones — Obtention simultanée d\'agréments SFD dans plusieurs pays UEMOA/CEMAC | KHEPRA EXPERTS',
      description: isEn
        ? 'How KHEPRA EXPERTS orchestrates the simultaneous licensing of Decentralized Financial Institutions across multiple Francophone African countries spanning UEMOA and CEMAC monetary zones. Institutional Infrastructure Player, BCEAO Instruction n°001-01-2024, COBAC Regulation n°01/17/CEMAC, wave-based sequencing strategy.'
        : 'Comment KHEPRA EXPERTS orchestre l\'obtention simultanée d\'agréments de SFD dans plusieurs pays d\'Afrique francophone couvrant les zones monétaires UEMOA et CEMAC. Institutional Infrastructure Player, Instruction BCEAO n°001-01-2024, Règlement COBAC n°01/17/CEMAC, stratégie de séquençage par vagues.',
      image: HERO_IMAGE,
      author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
      publisher: { '@id': `${SITE_URL}/#organization` },
      datePublished: '2026-06-04',
      dateModified: '2026-06-04',
      inLanguage: isEn ? 'en-US' : 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      about: [
        { '@type': 'Thing', name: 'Ingénierie réglementaire Afrique' },
        { '@type': 'Thing', name: 'Agrément microfinance digitale UEMOA' },
        { '@type': 'Thing', name: 'Conformité COBAC microfinance' },
        { '@type': 'Thing', name: 'Agrément SFD BCEAO' },
        { '@type': 'Thing', name: 'Inclusion financière responsable CEMAC' },
        { '@type': 'Thing', name: 'Institutional Infrastructure Player' },
        { '@type': 'Thing', name: 'Structuration juridique OHADA' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${PAGE_PATH}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Case Studies' : 'Études de cas', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: isEn ? 'Multi-Country MFI Licensing UEMOA/CEMAC' : 'Agrément multinational SFD UEMOA/CEMAC' },
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

export default function AgrementMultinationalCaseStudyPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const contactRef = useRef<HTMLDivElement>(null);

  const ogTitle = isEn
    ? 'Case Study: Multi-Zone MFI Licensing — UEMOA/CEMAC | KHEPRA EXPERTS'
    : 'Étude de cas : Agrément SFD Multi-Zones — UEMOA/CEMAC | KHEPRA EXPERTS';

  const ogDescription = isEn
    ? 'How KHEPRA EXPERTS orchestrates simultaneous MFI licensing across multiple Francophone African countries (UEMOA & CEMAC). Institutional Infrastructure Player, BCEAO Instruction n°001-01-2024, COBAC Regulation n°01/17/CEMAC. Exclusive wave-based sequencing methodology for multi-jurisdictional regulatory engineering.'
    : 'Comment KHEPRA EXPERTS orchestre l\'obtention simultanée d\'agréments SFD dans plusieurs pays d\'Afrique francophone (UEMOA & CEMAC). Institutional Infrastructure Player, Instruction BCEAO n°001-01-2024, Règlement COBAC n°01/17/CEMAC. Méthodologie exclusive de séquençage par vagues pour l\'ingénierie réglementaire multi-juridictionnelle.';

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={ogTitle}
        description={ogDescription}
        keywords={isEn
          ? 'MFI licensing Africa, SFD agrément BCEAO COBAC, multi-country microfinance licensing UEMOA CEMAC, regulatory engineering Francophone Africa, Institutional Infrastructure Player, KHEPRA EXPERTS Lomé Togo, financial inclusion Africa, OHADA structuring'
          : 'agrément SFD Afrique, agrément microfinance UEMOA CEMAC, ingénierie réglementaire Afrique francophone, Institutional Infrastructure Player, KHEPRA EXPERTS Lomé Togo, inclusion financière responsable, structuration OHADA, BCEAO Instruction 001-01-2024, COBAC Règlement 01/17/CEMAC'}
        canonicalPath={PAGE_PATH}
        ogType="article"
        ogImage={OG_IMAGES.CASE_STUDIES}
        ogImageAlt={isEn
          ? 'Multi-Country MFI Licensing Case Study — UEMOA/CEMAC — KHEPRA EXPERTS'
          : 'Étude de cas Agrément SFD Multi-Pays — UEMOA/CEMAC — KHEPRA EXPERTS'}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        twitterLabel1={isEn ? 'Coverage' : 'Couverture'}
        twitterData1={isEn ? 'Multi-country UEMOA/CEMAC' : 'Multi-pays UEMOA/CEMAC'}
        twitterLabel2={isEn ? 'Status' : 'Statut'}
        twitterData2={isEn ? 'Active execution 2026' : 'Chantier en cours 2026'}
        structuredData={buildStructuredData(isEn)}
        hreflangLinks={STATIC_HREFLANG_MAP[PAGE_PATH + '/']}
        articleSection={isEn ? 'Case Studies' : 'Études de cas'}
        articleTags={isEn ? ['MFI Licensing', 'BCEAO', 'COBAC', 'Digital Microfinance', 'Institutional Infrastructure Player', 'Financial Inclusion', 'OHADA', 'Regulatory Engineering', 'Multi-Country', 'Francophone Africa'] : ['Agrément SFD', 'BCEAO', 'COBAC', 'Microfinance digitale', 'Institutional Infrastructure Player', 'Inclusion financière', 'OHADA', 'Ingénierie réglementaire', 'Multi-pays', 'Afrique francophone']}
        articlePublishedTime="2026-06-04"
        articleModifiedTime="2026-06-04"
        articleAuthor="KHEPRA EXPERTS"
      />
      <SchemaFAQPage
        faqs={
          isEn
            ? [
                {
                  question: 'What are the differences between BCEAO and COBAC requirements for MFI licensing?',
                  answer: 'BCEAO (UEMOA) has consolidated its microfinance regulatory framework through Instruction n°001-01-2024. COBAC (CEMAC) relies on Regulation n°01/17/CEMAC and Regulation LBC/FT R-2023/01. Key differences include minimum capital thresholds, governance structure requirements, and reporting frequency. KHEPRA EXPERTS has mapped these divergences to design a unified yet jurisdictionally-adapted licensing strategy.',
                },
                {
                  question: 'What is an Institutional Infrastructure Player in the context of African digital microfinance?',
                  answer: 'An "Institutional Infrastructure Player" goes beyond simple credit operations to build a genuine inclusive and sovereign digital public infrastructure — deploying ethical credit scoring, interoperable digital payment rails, proximity agent networks, and financial literacy programs across multiple jurisdictions aiming for systemic impact on financial inclusion.',
                },
                {
                  question: 'What is the wave-based sequencing strategy for multi-country MFI licensing in Africa?',
                  answer: 'KHEPRA EXPERTS exclusive wave-based sequencing: Wave 1 (Pilots) — a limited number of countries as testbeds absorbing friction and building credibility. Wave 2 (Learning) — additional countries benefiting from accumulated lessons. Wave 3 (Rapid Duplication) — remaining countries where the playbook is proven and institutional track record accelerates timelines.',
                },
                {
                  question: 'Why is a locally-anchored consulting firm in Lomé, Togo essential for multi-country MFI licensing?',
                  answer: 'Three decisive advantages: (1) Institutional intimacy with BCEAO/COBAC supervisory cultures; (2) Credibility capital — documented regulatory track record across both monetary zones; (3) Diplomatic agility across two monetary zones and multiple national regulators. A non-local firm faces a fatal gap in understanding that no international brand can compensate for.',
                },
              ]
            : [
                {
                  question: 'Quelles sont les différences entre les exigences BCEAO et COBAC pour l\'agrément SFD ?',
                  answer: 'La BCEAO (UEMOA) s\'appuie sur l\'Instruction n°001-01-2024. La COBAC (CEMAC) s\'appuie sur le Règlement n°01/17/CEMAC et le Règlement LBC/FT R-2023/01. Les différences clés portent sur les seuils de capital minimum, les exigences de gouvernance et la fréquence de reporting. KHEPRA EXPERTS a cartographié ces divergences pour concevoir une stratégie d\'agrément unifiée mais adaptée à chaque juridiction.',
                },
                {
                  question: 'Qu\'est-ce qu\'un Institutional Infrastructure Player dans le contexte de la microfinance digitale africaine ?',
                  answer: 'Un Institutional Infrastructure Player dépasse les simples opérations de crédit pour bâtir une véritable infrastructure publique digitale, inclusive et souveraine — déployant un scoring de crédit éthique, des rails de paiement digital interopérables, des réseaux d\'agents de proximité et des programmes d\'éducation financière visant un impact systémique sur l\'inclusion financière en zone UEMOA et CEMAC.',
                },
                {
                  question: 'Qu\'est-ce que la stratégie de séquençage par vagues pour l\'agrément SFD multi-pays ?',
                  answer: 'Stratégie exclusive de KHEPRA EXPERTS : Vague 1 (Pilotes) — un nombre limité de pays servant de bancs d\'essai, absorbant les frictions et construisant la crédibilité. Vague 2 (Apprentissage) — des pays supplémentaires bénéficiant des leçons accumulées. Vague 3 (Duplication rapide) — pays restants où le playbook est éprouvé et le track record institutionnel accélère les délais.',
                },
                {
                  question: 'Pourquoi un cabinet de conseil ancré localement à Lomé, Togo est-il essentiel pour l\'agrément SFD multi-pays ?',
                  answer: 'Trois avantages décisifs : (1) Intimité institutionnelle avec les cultures de supervision BCEAO/COBAC ; (2) Capital de crédibilité — track record réglementaire documenté dans les deux zones monétaires ; (3) Agilité diplomatique sur deux zones monétaires et de multiples régulateurs nationaux. Un cabinet non-local fait face à un écart fatal de compréhension et de confiance.',
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
              { label: isEn ? 'Multi-Country MFI Licensing UEMOA/CEMAC' : 'Agrément multinational SFD UEMOA/CEMAC' },
            ]}
          />
        </div>
      </div>

      <main>
        <HeroSection isEn={isEn} />
        <FicheTechnique isEn={isEn} />
        <DefiSystemique isEn={isEn} />
        <ReponseStrategique isEn={isEn} />
        <SequencageOperationnel isEn={isEn} />
        <EnseignementsConclusion isEn={isEn} />
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
          alt={isEn ? 'Multi-zone regulatory engineering — Simultaneous MFI licensing across UEMOA and CEMAC — KHEPRA EXPERTS case study' : 'Ingénierie réglementaire multi-zones — Agréments SFD simultanés en zone UEMOA et CEMAC — Étude de cas KHEPRA EXPERTS'}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/25 border border-emerald-400/45 text-emerald-300">
              <i className="ri-building-2-line"></i>
              {isEn ? 'Financial Infrastructure — Multi-Country' : 'Infrastructure Financière — Multi-Pays'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-calendar-line"></i>
              2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-tools-line"></i>
              {isEn ? 'Active Execution' : 'Chantier en cours'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-global-line"></i>
              {isEn ? 'UEMOA + CEMAC' : 'UEMOA + CEMAC'}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {isEn
              ? 'Multi-Zone Regulatory Engineering: Simultaneous MFI Licensing Orchestration Across UEMOA and CEMAC Countries'
              : 'Ingénierie réglementaire multi-zones : Orchestration d\'agréments SFD simultanés dans plusieurs pays de l\'UEMOA et de la CEMAC'}
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed">
            {isEn
              ? 'How KHEPRA EXPERTS deploys an exclusive methodology to orchestrate the simultaneous licensing of Decentralized Financial Institutions for an international Fintech leader structured as an Institutional Infrastructure Player — spanning multiple UEMOA and CEMAC countries across Francophone Africa. A program launched in the first half of 2026, currently in active execution and regulatory follow-up phase.'
              : 'Comment KHEPRA EXPERTS déploie une méthodologie exclusive pour orchestrer l\'obtention simultanée d\'agréments de Sociétés Financières Décentralisées pour un leader international de la Fintech structuré comme un Institutional Infrastructure Player — couvrant plusieurs pays de l\'UEMOA et de la CEMAC en Afrique francophone. Un programme lancé au premier semestre 2026, en phase active d\'exécution et de suivi réglementaire.'}
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// FICHE TECHNIQUE
// ═══════════════════════════════════════════
function FicheTechnique({ isEn }: { isEn: boolean }) {
  const specs = [
    { icon: 'ri-building-4-line', label: isEn ? 'Client Type' : 'Type de client', value: isEn ? 'International Fintech & Digital Financial Services Leader (Anonymized)' : 'Leader international de la Fintech et des services financiers numériques (Anonymisé)' },
    { icon: 'ri-global-line', label: isEn ? 'Target Regions' : 'Régions cibles', value: isEn ? 'Multiple UEMOA and CEMAC countries across Francophone Africa' : 'Plusieurs pays UEMOA et CEMAC en Afrique francophone' },
    { icon: 'ri-file-text-line', label: isEn ? 'Key Regulatory Frameworks' : 'Cadres réglementaires clés', value: isEn ? 'BCEAO Instruction n°001-01-2024 | COBAC Regulation n°01/17/CEMAC | COBAC AML/CFT Regulation R-2023/01 | OHADA Uniform Acts' : 'Instruction BCEAO n°001-01-2024 | Règlement COBAC n°01/17/CEMAC | Règlement LBC/FT COBAC R-2023/01 | Actes Uniformes OHADA' },
    { icon: 'ri-tools-line', label: isEn ? 'Work Status' : 'Statut des travaux', value: isEn ? 'Active Execution — Launched H1 2026. Pre-licensing & Regulatory Engineering phases completed. Active orchestration and regulator follow-up in progress.' : 'Chantier en cours d\'exécution — Lancé au S1 2026. Phases de cadrage (Pre-licensing) et d\'ingénierie réglementaire (Regulatory Engineering) finalisées. Orchestration active et suivi des instructions en cours.' },
    { icon: 'ri-vip-crown-line', label: isEn ? 'KHEPRA EXPERTS Role' : 'Rôle de KHEPRA EXPERTS', value: isEn ? 'Unique Orchestrator — End-to-end responsibility for multi-jurisdictional regulatory engineering, institutional diplomacy, and program sequencing across all target countries' : 'Orchestrateur Unique — Responsabilité de bout en bout de l\'ingénierie réglementaire multi-juridictionnelle, de la diplomatie institutionnelle et du séquençage du programme sur l\'ensemble des pays cibles' },

    { icon: 'ri-lightbulb-flash-line', label: isEn ? 'Strategic Positioning' : 'Positionnement stratégique', value: isEn ? 'Institutional Infrastructure Player — A genuine inclusive and sovereign digital public infrastructure, not merely a digital credit fintech' : 'Institutional Infrastructure Player — Une véritable infrastructure publique digitale inclusive et souveraine, non une simple fintech de crédit digitale' },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="ri-file-list-3-line text-emerald-600 text-lg"></i>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {isEn ? 'Technical Fact Sheet — Anonymized' : 'Fiche Technique Anonymisée'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { value: isEn ? 'Multi-country' : 'Multi-pays', label: isEn ? 'Simultaneous deployment UEMOA/CEMAC' : 'Déploiement simultané UEMOA/CEMAC', icon: 'ri-global-line' },
              { value: '2026', label: isEn ? 'Active execution underway' : 'Chantier en cours d\'exécution', icon: 'ri-tools-line' },
              { value: '2 zones', label: isEn ? 'BCEAO & COBAC' : 'BCEAO & COBAC', icon: 'ri-building-2-line' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                  <i className={`${stat.icon} text-emerald-600 text-lg`}></i>
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-600 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {specs.map((spec, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-3 p-4 rounded-lg ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white border border-gray-100'}`}>
                <div className="flex items-center gap-2 md:w-48 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <i className={`${spec.icon} text-emerald-600 text-sm`}></i>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{spec.label}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed flex-1">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-emerald-50 rounded-xl p-5 border border-emerald-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-emerald-800">
                {isEn ? 'Update — June 2026: ' : 'Mise à jour — Juin 2026 : '}
              </strong>
              {isEn
                ? 'This case study has been updated to reflect the experience gained from the large-scale regulatory engineering projects initiated in 2026. The KHEPRA EXPERTS licensing methodology has been enriched by real-world deployment across multiple countries, incorporating operational learnings from the ongoing multi-zone orchestration program. Pre-licensing assessments and regulatory engineering phases have been successfully completed across all target jurisdictions. The program is now in its active orchestration and regulatory follow-up phase, with applications filed and under review by BCEAO and COBAC authorities.'
                : 'Cette étude de cas a été actualisée pour refléter les retours d\'expérience des chantiers d\'envergure amorcés en 2026. La méthodologie d\'agrément de KHEPRA EXPERTS a été enrichie par le déploiement en conditions réelles sur plusieurs pays, intégrant les apprentissages opérationnels du programme d\'orchestration multi-zones en cours. Les phases de cadrage (Pre-licensing) et d\'ingénierie réglementaire (Regulatory Engineering) ont été menées à terme avec succès dans l\'ensemble des juridictions cibles. Le programme est désormais dans sa phase active d\'orchestration et de suivi des instructions, avec les dossiers déposés et en cours d\'examen auprès des autorités de la BCEAO et de la COBAC.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// I. LE DÉFI SYSTÉMIQUE
// ═══════════════════════════════════════════
function DefiSystemique({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-search-eye-line"></i>
            {isEn ? 'PART I' : 'PARTIE I'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'The Systemic Challenge — Why Simultaneous UEMOA/CEMAC Deployment Is a Fatal Gap for Non-Local Actors' : 'Le Défi Systémique — Pourquoi le déploiement simultané UEMOA/CEMAC est un écart fatal pour les acteurs étrangers'}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              {isEn
                ? 'The client — an international Fintech and digital financial services leader — is not a conventional digital credit startup. It is structured as what KHEPRA EXPERTS terms an Institutional Infrastructure Player: a financial institution conceived to deploy a genuine inclusive and sovereign digital public infrastructure across Francophone Africa. This ambition required navigating a regulatory complexity that constitutes, for non-local actors, a structural and often fatal gap.'
                : 'Le client — un leader international de la Fintech et des services financiers numériques — n\'est pas une startup de crédit digital conventionnelle. Il est structuré comme ce que KHEPRA EXPERTS qualifie d\'Institutional Infrastructure Player : une institution financière conçue pour déployer une véritable infrastructure publique digitale, inclusive et souveraine à travers l\'Afrique francophone. Cette ambition imposait de naviguer une complexité réglementaire qui constitue, pour les acteurs étrangers, un écart structurel et souvent fatal.'}
            </p>
          </div>

          {/* Les deux doctrines */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-scales-3-line text-emerald-600"></i>
              {isEn ? 'The Double Regulatory Doctrine: BCEAO vs COBAC' : 'La double doctrine réglementaire : BCEAO vs COBAC'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">UEMOA</span>
                  </div>
                  <h4 className="font-bold text-gray-900">{isEn ? 'BCEAO — UEMOA Zone' : 'BCEAO — Zone UEMOA'}</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    isEn ? 'Instruction n°001-01-2024: consolidated framework governing SFD authorization, organization, and operations — incorporating prudential, governance, AML/CFT, and consumer protection requirements' : 'Instruction n°001-01-2024 : cadre consolidé régissant l\'autorisation, l\'organisation et l\'exercice des SFD — intégrant les exigences prudentielles, de gouvernance, AML/CFT et de protection des consommateurs',
                    isEn ? 'Multiple target countries across the UEMOA zone — each with specific national regulatory overlays on top of the community framework' : 'Plusieurs pays cibles dans la zone UEMOA — chacun avec des surcouches réglementaires nationales spécifiques s\'ajoutant au cadre communautaire',
                    isEn ? 'UMOA Banking Commission oversight, GIABA for AML/CFT evaluation' : 'Supervision de la Commission Bancaire de l\'UMOA, GIABA pour l\'évaluation AML/CFT',
                    isEn ? 'National data protection authorities across UEMOA member states' : 'Autorités nationales de protection des données dans les États membres de l\'UEMOA',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <i className="ri-checkbox-circle-fill text-amber-500 mt-0.5 shrink-0"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-teal-50 rounded-xl p-5 border border-teal-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CEMAC</span>
                  </div>
                  <h4 className="font-bold text-gray-900">{isEn ? 'COBAC — CEMAC Zone' : 'COBAC — Zone CEMAC'}</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    isEn ? 'Regulation n°01/17/CEMAC: governing microfinance activities — distinct prudential ratios, governance requirements, and reporting standards from the UEMOA framework' : 'Règlement n°01/17/CEMAC : régissant l\'activité de microfinance — ratios prudentiels, exigences de gouvernance et standards de reporting distincts du cadre UEMOA',
                    isEn ? 'Regulation LBC/FT R-2023/01: dedicated AML/CFT framework — with specific beneficial owner identification, PEP screening, and suspicious transaction reporting obligations differing from GIABA standards' : 'Règlement LBC/FT R-2023/01 : cadre AML/CFT dédié — avec des obligations spécifiques d\'identification des bénéficiaires effectifs, de screening PPE et de déclaration de soupçon différentes des standards GIABA',
                    isEn ? 'Multiple target countries across the CEMAC zone — each with national financial sector laws and specific microfinance decrees' : 'Plusieurs pays cibles dans la zone CEMAC — chacun avec ses lois nationales du secteur financier et ses décrets microfinance spécifiques',
                    isEn ? 'GABAC for AML/CFT evaluation, national data protection commissions' : 'GABAC pour l\'évaluation AML/CFT, commissions nationales de protection des données',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <i className="ri-checkbox-circle-fill text-teal-500 mt-0.5 shrink-0"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Le "fatal gap" */}
          <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl border border-red-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <i className="ri-error-warning-fill text-red-600 text-xl"></i>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {isEn ? 'The Fatal Gap: Why Non-Local Actors Fail' : 'L\'écart fatal : pourquoi les acteurs étrangers échouent'}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: 'ri-eye-off-line',
                  title: isEn ? '1. Regulatory Invisibility' : '1. Invisibilité réglementaire',
                  desc: isEn
                    ? 'International firms approach African financial regulators with standardized documentation templates designed for European or North American jurisdictions. These documents miss — by construction — the informal norms, unwritten expectations, and institutional culture specific to BCEAO and COBAC supervisors. The result: dossiers that are technically compliant but institutionally illegible, generating iterative rejection cycles that extend timelines by 12-24 months.'
                    : 'Les cabinets internationaux abordent les régulateurs financiers africains avec des templates documentaires standardisés conçus pour les juridictions européennes ou nord-américaines. Ces documents manquent — par construction — les normes informelles, les attentes non écrites et la culture institutionnelle propres aux superviseurs BCEAO et COBAC. Résultat : des dossiers techniquement conformes mais institutionnellement illisibles, générant des cycles de rejet itératifs qui allongent les délais de 12 à 24 mois.',
                },
                {
                  icon: 'ri-dislike-line',
                  title: isEn ? '2. Absence of Credibility Capital' : '2. Absence de capital de crédibilité',
                  desc: isEn
                    ? 'African financial regulators operate in an environment where institutional trust is built through demonstrated track record, not brand recognition. An international consulting brand with no verifiable licensing successes in the UEMOA/CEMAC space carries zero credibility capital with BCEAO or COBAC supervisors. The absence of documented local regulatory references signals to supervisors that the dossier has not been pressure-tested against regional realities.'
                    : 'Les régulateurs financiers africains opèrent dans un environnement où la confiance institutionnelle se construit par le track record démontré, non par la notoriété de marque. Une marque de conseil internationale sans succès d\'agrément vérifiable dans l\'espace UEMOA/CEMAC ne porte aucun capital de crédibilité auprès des superviseurs BCEAO ou COBAC. L\'absence de références réglementaires locales documentées signale aux superviseurs que le dossier n\'a pas été testé en pression contre les réalités régionales.',
                },
                {
                  icon: 'ri-user-unfollow-line',
                  title: isEn ? '3. Institutional Diplomatic Deficit' : '3. Déficit de diplomatie institutionnelle',
                  desc: isEn
                    ? 'Multi-country licensing in Francophone Africa is not merely a legal and financial exercise — it is a diplomatic operation. Navigating the relationships between the central bank, the Ministry of Finance, the national microfinance directorate, and the data protection authority in each country requires sustained institutional presence, cultural fluency, and relational capital that cannot be built through periodic fly-in missions. KHEPRA EXPERTS, anchored in Lomé, operates within this ecosystem continuously.'
                    : 'L\'agrément multi-pays en Afrique francophone n\'est pas un simple exercice juridique et financier — c\'est une opération diplomatique. Naviguer les relations entre la banque centrale, le ministère des Finances, la direction nationale de la microfinance et l\'autorité de protection des données dans chaque pays exige une présence institutionnelle continue, une fluidité culturelle et un capital relationnel qui ne se construisent pas par des missions ponctuelles. KHEPRA EXPERTS, ancré à Lomé, opère dans cet écosystème de manière continue.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/80 rounded-xl p-5 border border-red-100">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-3">
                    <i className={`${item.icon} text-red-600 text-lg`}></i>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cartographie des deux doctrines */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-map-pin-2-line text-emerald-600"></i>
              {isEn ? 'Mapping the Dual Regulatory Doctrine Across Target Countries' : 'Cartographie de la double doctrine réglementaire sur les pays cibles'}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left p-3 md:p-4 font-semibold">{isEn ? 'Dimension' : 'Dimension'}</th>
                    <th className="text-left p-3 md:p-4 font-semibold">{isEn ? 'BCEAO (UEMOA)' : 'BCEAO (UEMOA)'}</th>
                    <th className="text-left p-3 md:p-4 font-semibold">{isEn ? 'COBAC (CEMAC)' : 'COBAC (CEMAC)'}</th>
                    <th className="text-center p-3 md:p-4 font-semibold">{isEn ? 'KHEPRA Approach' : 'Approche KHEPRA'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      dim: isEn ? 'Legal Framework' : 'Cadre juridique',
                      bceao: isEn ? 'Instruction n°001-01-2024 (consolidated)' : 'Instruction n°001-01-2024 (consolidée)',
                      cobac: isEn ? 'Regulation n°01/17/CEMAC + R-2023/01' : 'Règlement n°01/17/CEMAC + R-2023/01',
                      approach: isEn ? 'Unified OHADA corporate structuring with dual-zone compliance appendices' : 'Structuration OHADA unifiée avec annexes de conformité bi-zone',
                    },
                    {
                      dim: isEn ? 'Min. Capital' : 'Capital min.',
                      bceao: isEn ? 'Variable by SFD category — 1B FCFA minimum for category 1 institutions' : 'Variable par catégorie SFD — 1 milliard FCFA minimum pour les institutions de catégorie 1',
                      cobac: isEn ? 'Defined by national decrees — generally 500M-1B FCFA range' : 'Défini par décrets nationaux — généralement 500M-1B FCFA',
                      approach: isEn ? 'Uniform 1B FCFA capitalization per subsidiary (exceeds both minima)' : 'Capitalisation uniforme à 1 milliard FCFA par filiale (excède les deux minima)',
                    },
                    {
                      dim: isEn ? 'Governance' : 'Gouvernance',
                      bceao: isEn ? 'Board of Directors ≥ 5 members, Audit Committee mandatory, Risk Committee recommended' : 'Conseil ≥ 5 membres, Comité d\'Audit obligatoire, Comité des Risques recommandé',
                      cobac: isEn ? 'Board ≥ 3 members, mandatory internal control function, Audit Committee for category 1' : 'Conseil ≥ 3 membres, fonction contrôle interne obligatoire, Comité d\'Audit pour catégorie 1',
                      approach: isEn ? 'Standard governance architecture: 5-member minimum Board with Audit + Risk Committees across all subsidiaries' : 'Architecture de gouvernance standard : Conseil 5 membres minimum avec Comités Audit + Risques pour toutes les filiales',
                    },
                    {
                      dim: 'AML/CFT',
                      bceao: isEn ? 'GIABA evaluation framework, 40 FATF Recommendations, UEMOA Directive n°02/2015' : 'Cadre d\'évaluation GIABA, 40 Recommandations GAFI, Directive UEMOA n°02/2015',
                      cobac: isEn ? 'GABAC evaluation, Regulation R-2023/01, specific PEP/UBO requirements' : 'Évaluation GABAC, Règlement R-2023/01, exigences spécifiques PPE/UBO',
                      approach: isEn ? 'Unified AML/CFT manual covering both GIABA and GABAC standards, jurisdiction-specific appendices' : 'Manuel AML/CFT unifié couvrant les deux standards GIABA et GABAC, annexes spécifiques par juridiction',
                    },
                    {
                      dim: isEn ? 'Data Protection' : 'Protection données',
                      bceao: isEn ? 'National DPAs across UEMOA member states — with local hosting mandates in some jurisdictions' : 'APDP nationales dans les États membres de l\'UEMOA — avec obligations d\'hébergement local dans certaines juridictions',
                      cobac: isEn ? 'National commissions across CEMAC member states — emerging frameworks' : 'Commissions nationales dans les États membres de la CEMAC — cadres émergents',
                      approach: isEn ? 'Country-by-country data protection registration, processing register, DPA framework' : 'Enregistrement protection données pays par pays, registre de traitement, cadre DPA',
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 md:p-4 font-semibold text-gray-900">{row.dim}</td>
                      <td className="p-3 md:p-4 text-gray-700 text-xs md:text-sm">{row.bceao}</td>
                      <td className="p-3 md:p-4 text-gray-700 text-xs md:text-sm">{row.cobac}</td>
                      <td className="p-3 md:p-4">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                          <i className="ri-check-line"></i>{row.approach}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// II. LA RÉPONSE STRATÉGIQUE
// ═══════════════════════════════════════════
function ReponseStrategique({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 mb-3">
            <i className="ri-lightbulb-flash-line"></i>
            {isEn ? 'PART II' : 'PARTIE II'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'KHEPRA EXPERTS\' Strategic Response — Lifting the Three Critical Barriers' : 'La Réponse Stratégique de Khepra Experts — La levée des trois verrous critiques'}
          </h2>
          <p className="text-gray-600 max-w-3xl">
            {isEn
              ? 'KHEPRA EXPERTS deployed an exclusive three-barrier methodology, each addressing a critical dimension of the multi-country licensing challenge. These barriers are not sequential — they are interdependent, and failure in any one compromises the entire program.'
              : 'KHEPRA EXPERTS a déployé une méthodologie exclusive de levée de trois verrous, chacun adressant une dimension critique du défi d\'agrément multi-pays. Ces verrous ne sont pas séquentiels — ils sont interdépendants, et l\'échec sur l\'un compromet l\'ensemble du programme.'}
          </p>
          <div className="w-20 h-1 bg-emerald-500 rounded-full mt-4"></div>
        </div>

        <div className="space-y-8">
          {/* Verrou 1: Crédibilité actionnariale */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-white font-extrabold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {isEn ? 'Barrier 1: Shareholder Credibility — The Institutional Trust Threshold' : 'Verrou 1 : Crédibilité actionnariale — Le seuil de confiance institutionnelle'}
                  </h3>
                  <p className="text-emerald-200 text-sm mt-0.5">
                    {isEn ? 'Pre-licensing Assessment & Strategic Scoping' : 'Pre-licensing Assessment & Cadrage Stratégique'}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">{isEn ? 'The Challenge' : 'Le Problème'}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'BCEAO and COBAC regulators exercise deep scrutiny over the shareholder structure of any entity seeking an SFD license. For an international group deploying across multiple jurisdictions, the shareholder must demonstrate not just financial capacity — but institutional legitimacy, long-term commitment, operational expertise, and a clear understanding of the regulatory environment in each country. A shareholder perceived as a short-term financial investor or a technology company seeking regulatory arbitrage will face immediate rejection.'
                    : 'Les régulateurs BCEAO et COBAC exercent une profonde vigilance sur la structure actionnariale de toute entité sollicitant un agrément SFD. Pour un groupe international se déployant sur plusieurs juridictions, l\'actionnaire doit démontrer non seulement la capacité financière — mais la légitimité institutionnelle, l\'engagement de long terme, l\'expertise opérationnelle et la compréhension claire de l\'environnement réglementaire de chaque pays. Un actionnaire perçu comme un investisseur financier de court terme ou une société technologique cherchant l\'arbitrage réglementaire fera face à un rejet immédiat.'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">{isEn ? 'KHEPRA EXPERTS\' Response' : 'La Réponse de KHEPRA EXPERTS'}</h4>
                <ul className="space-y-1.5">
                  {[
                    isEn ? 'In-depth shareholder structure analysis and optimization — demonstrating alignment with the Institutional Infrastructure Player mission in each host country' : 'Analyse approfondie et optimisation de la structure actionnariale — démontrant l\'alignement avec la mission d\'Institutional Infrastructure Player dans chaque pays hôte',
                    isEn ? 'Documentation of the group\'s long-term commitment: multi-year investment plan, local employment strategy, tax substance, and community impact projections' : 'Documentation de l\'engagement de long terme du groupe : plan d\'investissement pluriannuel, stratégie d\'emploi local, substance fiscale et projections d\'impact communautaire',
                    isEn ? 'Pre-licensing reputation assessment in each jurisdiction — identifying and addressing potential regulatory concerns before formal application' : 'Évaluation préalable de la réputation dans chaque juridiction — identification et traitement des préoccupations réglementaires potentielles avant le dépôt formel',
                    isEn ? 'Structuring of an advisory board with local respected figures in each market, demonstrating integration with the national financial ecosystem' : 'Structuration d\'un conseil consultatif avec des personnalités locales respectées dans chaque marché, démontrant l\'intégration à l\'écosystème financier national',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <i className="ri-checkbox-circle-fill text-emerald-500 mt-0.5 shrink-0"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Verrou 2: Plausibilité prudentielle */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-white font-extrabold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {isEn ? 'Barrier 2: Prudential Plausibility — The Economic Model Under Regulatory Stress' : 'Verrou 2 : Plausibilité prudentielle — Le modèle économique sous stress réglementaire'}
                  </h3>
                  <p className="text-teal-200 text-sm mt-0.5">
                    {isEn ? 'Regulatory Engineering & Financial Structuring' : 'Ingénierie Réglementaire & Structuration Financière'}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">{isEn ? 'The Challenge' : 'Le Problème'}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'Beyond shareholder credibility, regulators scrutinize the economic viability of the proposed SFD. Key dimensions: (1) Capital adequacy — minimum 1 billion FCFA per subsidiary under BCEAO standards, with sufficient headroom for loan loss provisioning; (2) Ethical credit scoring — demonstrating that the lending methodology is not predatory and incorporates borrower protection mechanisms; (3) AML/CFT architecture — KYC/KYB procedures, PEP screening, suspicious transaction monitoring, and reporting infrastructure that satisfies both GIABA and GABAC standards; (4) Operational resilience — business continuity, cybersecurity, and internal control frameworks commensurate with a regulated financial institution.'
                    : 'Au-delà de la crédibilité actionnariale, les régulateurs scrutent la viabilité économique du projet SFD. Dimensions clés : (1) Adéquation du capital — 1 milliard FCFA minimum par filiale selon les standards BCEAO, avec une marge suffisante pour le provisionnement des créances ; (2) Scoring de crédit éthique — démonstration que la méthodologie de prêt n\'est pas prédatrice et intègre des mécanismes de protection de l\'emprunteur ; (3) Architecture AML/CFT — procédures KYC/KYB, screening PPE, surveillance des transactions suspectes et infrastructure de reporting satisfaisant les deux standards GIABA et GABAC ; (4) Résilience opérationnelle — continuité d\'activité, cybersécurité et cadres de contrôle interne dignes d\'une institution financière régulée.'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">{isEn ? 'KHEPRA EXPERTS\' Response' : 'La Réponse de KHEPRA EXPERTS'}</h4>
                <ul className="space-y-1.5">
                  {[
                    isEn ? 'Financial modeling on 5-7 year horizon per subsidiary — capital planning, loan portfolio projections, NPL scenarios, and prudential ratio trajectories under conservative, base, and stress assumptions' : 'Modélisation financière sur horizon 5-7 ans par filiale — planification du capital, projections de portefeuille de crédit, scénarios de créances douteuses et trajectoires des ratios prudentiels sous hypothèses conservatrices, de base et de stress',
                    isEn ? 'Ethical credit scoring methodology documentation — demonstrating transparent credit decision algorithms, interest rate caps, borrower education requirements, and over-indebtedness prevention mechanisms' : 'Documentation de la méthodologie de scoring de crédit éthique — démontrant des algorithmes de décision de crédit transparents, des plafonds de taux d\'intérêt, des exigences d\'éducation financière des emprunteurs et des mécanismes de prévention du surendettement',
                    isEn ? 'Unified AML/CFT manual compliant with both GIABA and GABAC standards — with jurisdiction-specific appendices covering national reporting obligations, local sanction lists, and country-specific PEP definitions' : 'Manuel AML/CFT unifié conforme aux deux standards GIABA et GABAC — avec annexes spécifiques par juridiction couvrant les obligations nationales de déclaration, les listes de sanctions locales et les définitions PPE spécifiques au pays',
                    isEn ? 'Operational resilience framework: BCP/DRP documentation, cybersecurity architecture aligned with ISO 27001 and local regulations, internal control charter per subsidiary' : 'Cadre de résilience opérationnelle : documentation PCA/PRA, architecture cybersécurité alignée ISO 27001 et réglementations locales, charte de contrôle interne par filiale',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <i className="ri-checkbox-circle-fill text-teal-500 mt-0.5 shrink-0"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Verrou 3: Maîtrise de la relation réglementaire */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-white font-extrabold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {isEn ? 'Barrier 3: Regulatory Relationship Mastery — Institutional Diplomacy as a Core Competency' : 'Verrou 3 : Maîtrise de la relation réglementaire — La diplomatie institutionnelle comme compétence cœur'}
                  </h3>
                  <p className="text-amber-200 text-sm mt-0.5">
                    {isEn ? 'Institutional Orchestration & Regulatory Follow-Up' : 'Orchestration Institutionnelle & Suivi Réglementaire'}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">{isEn ? 'The Challenge' : 'Le Problème'}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'The formal regulatory process — filing an application, receiving observations, responding to queries — is only the visible tip of the iceberg. The critical dimension lies beneath: understanding the informal expectations of each supervisory team, anticipating unstated concerns, calibrating the tone and substance of responses to the specific institutional culture of each regulator, and maintaining a continuous, constructive dialogue that transforms the regulator from an adversary into a partner in building financial inclusion infrastructure. A single misstep in regulatory diplomacy in one country can contaminate perceptions across the entire zone.'
                    : 'Le processus réglementaire formel — dépôt du dossier, réception des observations, réponse aux demandes de complément — n\'est que la partie visible de l\'iceberg. La dimension critique se situe en dessous : comprendre les attentes informelles de chaque équipe de supervision, anticiper les préoccupations non exprimées, calibrer le ton et la substance des réponses à la culture institutionnelle spécifique de chaque régulateur, et maintenir un dialogue continu et constructif qui transforme le régulateur d\'adversaire en partenaire de la construction d\'infrastructures d\'inclusion financière. Un seul faux pas de diplomatie réglementaire dans un pays peut contaminer les perceptions dans toute la zone.'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">{isEn ? 'KHEPRA EXPERTS\' Response' : 'La Réponse de KHEPRA EXPERTS'}</h4>
                <ul className="space-y-1.5">
                  {[
                    isEn ? 'Continuous institutional presence: KHEPRA EXPERTS, anchored in Lomé (Togo), maintains ongoing dialogue with regulatory teams across both zones — not limited to formal filing milestones' : 'Présence institutionnelle continue : KHEPRA EXPERTS, ancré à Lomé (Togo), maintient un dialogue permanent avec les équipes de supervision des deux zones — non limité aux jalons formels de dépôt',
                    isEn ? 'Regulatory intelligence: systematic monitoring of regulatory developments, supervisory priorities, and institutional dynamics in each target country, enabling proactive adjustment of the licensing strategy' : 'Veille réglementaire : suivi systématique des évolutions réglementaires, des priorités de supervision et des dynamiques institutionnelles dans chaque pays cible, permettant l\'ajustement proactif de la stratégie d\'agrément',
                    isEn ? 'Anticipatory response framework: for each regulatory query or observation, preparation of responses that address not only the explicit question but also the implicit concerns — demonstrating proactive regulatory maturity' : 'Cadre de réponse anticipative : pour chaque demande ou observation réglementaire, préparation de réponses qui adressent non seulement la question explicite mais aussi les préoccupations implicites — démontrant une maturité réglementaire proactive',
                    isEn ? 'Multi-level engagement: structured dialogue at all levels of the regulatory hierarchy — from technical analysts reviewing financial models to senior supervisors assessing systemic implications — with calibrated messaging at each level' : 'Engagement multi-niveaux : dialogue structuré à tous les échelons de la hiérarchie réglementaire — des analystes techniques examinant les modèles financiers aux superviseurs seniors évaluant les implications systémiques — avec un message calibré à chaque niveau',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <i className="ri-checkbox-circle-fill text-amber-500 mt-0.5 shrink-0"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// III. SÉQUENÇAGE OPÉRATIONNEL
// ═══════════════════════════════════════════
function SequencageOperationnel({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-stack-line"></i>
            {isEn ? 'PART III' : 'PARTIE III'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Operational Sequencing — The Exclusive Wave-Based Execution Roadmap' : 'Le Séquençage Opérationnel — La feuille de route exclusive par vagues'}
          </h2>
          <p className="text-gray-600 max-w-3xl">
            {isEn
              ? 'The simultaneous deployment across multiple countries is not a simultaneous launch. KHEPRA EXPERTS designed an exclusive wave-based sequencing strategy that optimizes scarce resources — capital, management attention, regulatory bandwidth — while maximizing institutional learning and credibility accumulation.'
              : 'Le déploiement simultané sur plusieurs pays n\'est pas un lancement simultané. KHEPRA EXPERTS a conçu une stratégie exclusive de séquençage par vagues qui optimise des ressources rares — capital, attention managériale, bande passante réglementaire — tout en maximisant l\'apprentissage institutionnel et l\'accumulation de crédibilité.'}
          </p>
          <div className="w-20 h-1 bg-emerald-500 rounded-full mt-4"></div>
        </div>

        {/* Status banner */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 mb-10 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <i className="ri-tools-line text-white text-lg"></i>
          </div>
          <div>
            <h3 className="font-bold text-emerald-800 text-base mb-1">
              {isEn ? 'Active Execution — H1 2026' : 'Chantier en cours d\'exécution — Premier semestre 2026'}
            </h3>
            <p className="text-sm text-emerald-700 leading-relaxed">
              {isEn
                ? 'The Pre-licensing and Regulatory Engineering phases have been successfully completed. The program is now in its active orchestration phase: applications filed, ongoing follow-up with BCEAO and COBAC regulators, and wave-based sequencing being executed according to plan. KHEPRA EXPERTS leverages its extensive regulatory engineering experience across the UEMOA and CEMAC zones to drive this multi-jurisdictional program forward.'
                : 'Les phases de cadrage (Pre-licensing) et d\'ingénierie réglementaire (Regulatory Engineering) ont été menées à terme avec succès. Le programme est dans sa phase active d\'orchestration : dossiers déposés, suivi des instructions en cours auprès des régulateurs BCEAO et COBAC, et séquençage par vagues en cours d\'exécution conformément au plan. KHEPRA EXPERTS s\'appuie sur son expérience approfondie en ingénierie réglementaire dans les zones UEMOA et CEMAC pour faire avancer ce programme multi-juridictionnel.'}
            </p>
          </div>
        </div>

        {/* Wave 1 */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 md:p-8 text-white mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-white font-extrabold text-2xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">
                    {isEn ? 'Wave 1 — Pilot Countries' : 'Vague 1 — Pays Pilotes'}
                  </h3>
                  <p className="text-emerald-200 text-sm mt-0.5">
                    {isEn
                      ? 'Pilot countries — Absorbing friction, building the regulatory playbook'
                      : 'Pays pilotes — Absorption des frictions, construction du playbook réglementaire'}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 border border-white/25 whitespace-nowrap">
                <i className="ri-check-double-line"></i>
                {isEn ? 'Completed' : 'Finalisée'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-1.5">
                {[
                  isEn ? 'Selection of pilot countries as regulatory testbeds — spanning both UEMOA and CEMAC zones — chosen for their supervisory maturity and willingness to engage in structured dialogue' : 'Sélection de pays pilotes comme bancs d\'essai réglementaires — couvrant les zones UEMOA et CEMAC — choisis pour leur maturité de supervision et leur disposition au dialogue structuré',
                  isEn ? 'Complete Pre-licensing Assessment: regulatory mapping, shareholder documentation, business model validation, local partnership structuring' : 'Pre-licensing Assessment complet : cartographie réglementaire, documentation actionnariale, validation du modèle d\'affaires, structuration des partenariats locaux',
                  isEn ? 'Template documentation generation: all regulatory deliverables produced and refined through iterative dialogue with supervisors, creating a replicable playbook' : 'Génération de la documentation template : tous les livrables réglementaires produits et affinés par le dialogue itératif avec les superviseurs, créant un playbook réplicable',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                    <i className="ri-checkbox-circle-fill text-emerald-300 mt-0.5 shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-sm text-white/90 leading-relaxed">
                  <strong className="text-white">{isEn ? 'Strategic Rationale:' : 'Raisonnement stratégique :'}</strong>
                  {' '}
                  {isEn
                    ? 'Wave 1 serves as the institutional credibility engine. By successfully navigating the full regulatory process in the first two countries, KHEPRA EXPERTS builds a demonstrable track record, develops template documentation tested against real supervisory feedback, and accumulates the regulatory intelligence that will accelerate subsequent waves. The resources invested in Wave 1 — though intensive — generate exponential returns in Waves 2 and 3.'
                    : 'La Vague 1 sert de moteur de crédibilité institutionnelle. En naviguant avec succès le processus réglementaire complet dans les deux premiers pays, KHEPRA EXPERTS construit un track record démontrable, développe une documentation template testée contre le feedback réel des superviseurs, et accumule l\'intelligence réglementaire qui accélérera les vagues suivantes. Les ressources investies dans la Vague 1 — bien qu\'intensives — génèrent des rendements exponentiels dans les Vagues 2 et 3.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave 2 */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 md:p-8 text-white mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-white font-extrabold text-2xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">
                    {isEn ? 'Wave 2 — Learning Countries' : 'Vague 2 — Pays d\'Apprentissage'}
                  </h3>
                  <p className="text-teal-200 text-sm mt-0.5">
                    {isEn
                      ? 'Learning countries — Leveraging the playbook, adapting to jurisdiction specifics'
                      : "Pays d'apprentissage — Exploitation du playbook, adaptation aux spécificités juridictionnelles"}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 border border-white/25 whitespace-nowrap">
                <i className="ri-loader-4-line animate-spin"></i>
                {isEn ? 'In Progress' : 'En cours'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-1.5">
                {[
                  isEn ? 'Deployment of the Wave 1 playbook into additional countries — leveraging template documentation, refined regulatory arguments, and established institutional references' : 'Déploiement du playbook de la Vague 1 dans les pays supplémentaires — exploitation de la documentation template, des arguments réglementaires affinés et des références institutionnelles établies',
                  isEn ? 'Targeted jurisdictional adaptation: each country-specific regulatory overlay (national microfinance decrees, local data protection requirements, specific AML/CFT expectations) addressed through modular appendices to the core playbook' : 'Adaptation juridictionnelle ciblée : chaque surcouche réglementaire nationale (décrets microfinance locaux, exigences locales de protection des données, attentes AML/CFT spécifiques) traitée via des annexes modulaires au playbook central',
                  isEn ? 'Cross-reference of regulatory feedback: observations received in Wave 1 countries systematically analyzed and pre-addressed in Wave 2 applications, demonstrating proactive regulatory maturity' : 'Référence croisée du feedback réglementaire : observations reçues dans les pays de la Vague 1 systématiquement analysées et pré-adressées dans les dossiers de la Vague 2, démontrant une maturité réglementaire proactive',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                    <i className="ri-checkbox-circle-fill text-teal-300 mt-0.5 shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-sm text-white/90 leading-relaxed">
                  <strong className="text-white">{isEn ? 'Strategic Rationale:' : 'Raisonnement stratégique :'}</strong>
                  {' '}
                  {isEn
                    ? 'Wave 2 captures the efficiency gains from Wave 1 while testing the playbook\'s adaptability. The core documentation — financial models, AML/CFT manual, governance architecture, data protection framework — is replicated with minimal modifications, while jurisdiction-specific modules are developed and tested. The credibility accumulated in Wave 1 is actively referenced, providing regulatory reassurance to Wave 2 supervisors.'
                    : 'La Vague 2 capte les gains d\'efficacité de la Vague 1 tout en testant l\'adaptabilité du playbook. La documentation centrale — modèles financiers, manuel AML/CFT, architecture de gouvernance, cadre de protection des données — est répliquée avec des modifications minimales, tandis que les modules spécifiques à chaque juridiction sont développés et testés. La crédibilité accumulée dans la Vague 1 est activement référencée, apportant une réassurance réglementaire aux superviseurs de la Vague 2.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave 3 */}
        <div>
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-6 md:p-8 text-white mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-white font-extrabold text-2xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">
                    {isEn ? 'Wave 3 — Rapid Duplication' : 'Vague 3 — Duplication Rapide'}
                  </h3>
                  <p className="text-amber-200 text-sm mt-0.5">
                    {isEn
                      ? 'Remaining countries — Proven playbook, streamlined processes, accelerated timelines'
                      : 'Pays restants — Playbook éprouvé, processus rationalisés, délais accélérés'}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 border border-white/25 whitespace-nowrap">
                <i className="ri-time-line"></i>
                {isEn ? 'Planned' : 'Planifiée'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-1.5">
                {[
                  isEn ? 'Full replication of the now-proven playbook into remaining target countries — documentation, regulatory arguments, and institutional references battle-tested across prior jurisdictions' : 'Réplication complète du playbook désormais éprouvé dans les pays cibles restants — documentation, arguments réglementaires et références institutionnelles testés en conditions réelles sur les juridictions antérieures',
                  isEn ? 'Streamlined processes: regulatory submissions benefit from the accumulated institutional track record, established supervisory relationships, and pre-addressed common concerns' : 'Processus rationalisés : les soumissions réglementaires bénéficient du track record institutionnel accumulé, des relations de supervision établies et des préoccupations communes pré-adressées',
                  isEn ? 'Accelerated timelines: Wave 3 countries projected to achieve licensing in 30-50% less time than Wave 1, with substantially reduced resource intensity' : 'Délais accélérés : les pays de la Vague 3 devraient obtenir l\'agrément en 30 à 50% de temps en moins que la Vague 1, avec une intensité de ressources substantiellement réduite',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                    <i className="ri-checkbox-circle-fill text-amber-300 mt-0.5 shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-sm text-white/90 leading-relaxed">
                  <strong className="text-white">{isEn ? 'Strategic Rationale:' : 'Raisonnement stratégique :'}</strong>
                  {' '}
                  {isEn
                    ? 'Wave 3 is the moment where the wave-based strategy delivers its full return on investment. The playbook is proven, the institutional credibility is established, and the regulatory intelligence is comprehensive. Processes are streamlined to the point where the primary activity is documentation adaptation rather than de novo development. This is the model\'s efficiency frontier — demonstrating to the client that the initial intensive investment in Waves 1-2 generates exponential returns through rapid, low-friction deployment in Wave 3.'
                    : 'La Vague 3 est le moment où la stratégie par vagues livre son plein retour sur investissement. Le playbook est éprouvé, la crédibilité institutionnelle est établie et l\'intelligence réglementaire est complète. Les processus sont rationalisés au point où l\'activité principale est l\'adaptation documentaire plutôt que le développement de novo. C\'est la frontière d\'efficience du modèle — démontrant au client que l\'investissement initial intensif des Vagues 1 et 2 génère des rendements exponentiels par un déploiement rapide et à faible friction dans la Vague 3.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Rationalization */}
        <div className="mt-10 bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-funds-line text-emerald-600"></i>
            {isEn ? 'Resource Rationalization: The Economic Logic of Wave Sequencing' : 'Rationalisation des ressources : la logique économique du séquençage par vagues'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: isEn ? 'Capital Efficiency' : 'Efficience du capital',
                desc: isEn
                  ? 'Wave 1 requires the full capital commitment for the pilot subsidiaries. Waves 2 and 3 benefit from demonstrated regulatory approval, reducing the capital-at-risk perception and potentially allowing phased capital deployment synchronized with license grants.'
                  : 'La Vague 1 exige l\'engagement complet du capital pour les filiales pilotes. Les Vagues 2 et 3 bénéficient de l\'approbation réglementaire démontrée, réduisant la perception de capital à risque et permettant potentiellement un déploiement progressif du capital synchronisé avec l\'octroi des agréments.',
                icon: 'ri-money-dollar-circle-line',
              },
              {
                title: isEn ? 'Management Bandwidth' : 'Bande passante managériale',
                desc: isEn
                  ? 'Simultaneous regulatory processes in multiple countries would exhaust any management team. Wave sequencing concentrates senior management attention on a limited set of countries at a time, with the playbook reducing the cognitive load for subsequent waves by 60-70%.'
                  : 'Des processus réglementaires simultanés dans plusieurs pays épuiseraient toute équipe de direction. Le séquençage par vagues concentre l\'attention du management senior sur un nombre limité de pays à la fois, le playbook réduisant la charge cognitive pour les vagues suivantes de 60 à 70%.',
                icon: 'ri-brain-line',
              },
              {
                title: isEn ? 'Regulatory Credibility Flywheel' : 'Effet flywheel de crédibilité réglementaire',
                desc: isEn
                  ? 'Each successive license approval strengthens the institutional credibility applied to the next. By Wave 3, KHEPRA EXPERTS can reference a track record of successive approvals, transforming regulatory perception from scrutiny to trust.'
                  : 'Chaque agrément successif renforce la crédibilité institutionnelle appliquée au suivant. À la Vague 3, KHEPRA EXPERTS peut référencer un track record d\'approbations successives, transformant la perception réglementaire de la vigilance à la confiance.',
                icon: 'ri-loop-left-line',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
                  <i className={`${item.icon} text-emerald-600 text-lg`}></i>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// IV. ENSEIGNEMENTS & CONCLUSION
// ═══════════════════════════════════════════
function EnseignementsConclusion({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 mb-3">
            <i className="ri-lightbulb-line"></i>
            {isEn ? 'PART IV' : 'PARTIE IV'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'EEAT Insights & Conclusion — Why Local Anchoring Makes the Difference with African Regulators' : 'Enseignements EEAT & Conclusion — Pourquoi l\'ancrage local fait la différence auprès des régulateurs africains'}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              {isEn
                ? 'The multi-country MFI licensing program in progress across multiple UEMOA and CEMAC countries crystallizes a fundamental truth about regulatory engineering in Francophone Africa: the formal legal and financial requirements — capital thresholds, governance structures, AML/CFT procedures, prudential ratios — are necessary but insufficient. They represent the visible, codified dimension of licensing. The decisive dimension lies in what is not written: the institutional culture of each supervisory authority, the informal expectations that shape regulatory judgment, and the trust capital accumulated through demonstrated local track record.'
                : 'Le programme d\'agrément SFD multi-pays en cours sur plusieurs pays de l\'UEMOA et de la CEMAC cristallise une vérité fondamentale de l\'ingénierie réglementaire en Afrique francophone : les exigences juridiques et financières formelles — seuils de capital, structures de gouvernance, procédures AML/CFT, ratios prudentiels — sont nécessaires mais insuffisantes. Elles représentent la dimension visible et codifiée de l\'agrément. La dimension décisive réside dans ce qui n\'est pas écrit : la culture institutionnelle de chaque autorité de supervision, les attentes informelles qui façonnent le jugement réglementaire, et le capital de confiance accumulé par un track record local démontré.'}
            </p>

            {/* EEAT pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <span className="text-white font-extrabold text-lg">E</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">{isEn ? 'Experience — Demonstrated by Facts' : 'Expérience — Démontrée par les faits'}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isEn
                    ? 'The wave-based sequencing strategy is not a theoretical construct — it is the operationalization of 22+ years of multi-country regulatory missions in Francophone Africa. KHEPRA EXPERTS has navigated the full licensing lifecycle across UEMOA and CEMAC, accumulating the institutional knowledge that informs every tactical decision in the current program.'
                    : 'La stratégie de séquençage par vagues n\'est pas une construction théorique — c\'est l\'opérationnalisation de 22+ années de missions réglementaires multi-pays en Afrique francophone. KHEPRA EXPERTS a navigué le cycle complet d\'agrément en zone UEMOA et CEMAC, accumulant la connaissance institutionnelle qui informe chaque décision tactique du programme en cours.'}
                </p>
              </div>

              <div className="bg-teal-50 rounded-xl p-5 border border-teal-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
                    <span className="text-white font-extrabold text-lg">E</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">{isEn ? 'Expertise — Demonstrated by Precision' : 'Expertise — Démontrée par la précision'}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isEn
                    ? 'The precision with which KHEPRA EXPERTS cites, cross-references, and operationalizes regulatory texts — BCEAO Instruction n°001-01-2024, COBAC Regulation n°01/17/CEMAC, COBAC AML/CFT Regulation R-2023/01, OHADA Uniform Acts, national microfinance decrees, and data protection laws — is not academic. It is the product of having drafted, submitted, defended, and secured approvals on regulatory dossiers across both monetary zones. This expertise is visible in every deliverable: from the multi-country regulatory mapping matrix to the jurisdiction-specific compliance appendices.'
                    : 'La précision avec laquelle KHEPRA EXPERTS cite, croise et opérationnalise les textes réglementaires — Instruction BCEAO n°001-01-2024, Règlement COBAC n°01/17/CEMAC, Règlement LBC/FT COBAC R-2023/01, Actes Uniformes OHADA, décrets microfinance nationaux et lois de protection des données — n\'est pas académique. Elle est le produit de dossiers rédigés, soumis, défendus et approuvés dans les deux zones monétaires. Cette expertise est visible dans chaque livrable : de la matrice de cartographie réglementaire multi-pays aux annexes de conformité spécifiques par juridiction.'}
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                    <span className="text-white font-extrabold text-lg">A</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">{isEn ? 'Authority — The Unique Orchestrator' : 'Autorité — L\'Orchestrateur Unique'}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isEn
                    ? 'KHEPRA EXPERTS is not one advisor among many in this program — it is the Unique Orchestrator, holding end-to-end responsibility for multi-jurisdictional regulatory engineering, institutional diplomacy, and program sequencing across all target countries. This authority is recognized by both the client — which has entrusted KHEPRA with the strategic coordination of its ambitious African expansion — and by the regulators, who engage with KHEPRA as the institutional interlocutor representing a program of systemic importance for financial inclusion in their jurisdictions.'
                    : 'KHEPRA EXPERTS n\'est pas un conseiller parmi d\'autres dans ce programme — il est l\'Orchestrateur Unique, détenant la responsabilité de bout en bout de l\'ingénierie réglementaire multi-juridictionnelle, de la diplomatie institutionnelle et du séquençage du programme sur l\'ensemble des pays cibles. Cette autorité est reconnue à la fois par le client — qui a confié à KHEPRA la coordination stratégique de son expansion africaine — et par les régulateurs, qui dialoguent avec KHEPRA comme l\'interlocuteur institutionnel représentant un programme d\'importance systémique pour l\'inclusion financière dans leurs juridictions.'}
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                    <span className="text-white font-extrabold text-lg">T</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">{isEn ? 'Trustworthiness — Institutional Diplomacy as Core Competency' : 'Fiabilité — La diplomatie institutionnelle comme compétence cœur'}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isEn
                    ? 'Trust with African financial regulators is not earned through brand recognition — it is built through sustained, consistent, and technically impeccable institutional engagement over years. KHEPRA EXPERTS, anchored in Lomé (Togo), operates within this ecosystem continuously, not episodically. The firm\'s credibility with BCEAO and COBAC supervisors is a strategic asset accumulated over two decades of missions — an asset that directly reduces regulatory friction, accelerates approval timelines, and transforms the regulator from an adversary into a partner in building Africa\'s financial inclusion infrastructure.'
                    : 'La confiance des régulateurs financiers africains ne se gagne pas par la notoriété de marque — elle se construit par un engagement institutionnel soutenu, constant et techniquement irréprochable sur des années. KHEPRA EXPERTS, ancré à Lomé (Togo), opère dans cet écosystème de manière continue, non épisodique. La crédibilité du cabinet auprès des superviseurs BCEAO et COBAC est un actif stratégique accumulé sur deux décennies de missions — un actif qui réduit directement les frictions réglementaires, accélère les délais d\'approbation et transforme le régulateur d\'adversaire en partenaire de la construction de l\'infrastructure d\'inclusion financière africaine.'}
                </p>
              </div>
            </div>

            <p>
              {isEn
                ? 'The program currently in active execution across multiple countries validates KHEPRA EXPERTS\' core methodological conviction: multi-country regulatory engineering in Francophone Africa is not a legal exercise — it is an institutional orchestration exercise. The firms that succeed are those that combine technical precision with diplomatic fluency, regulatory intelligence with operational pragmatism, and global standards with local legitimacy. This is the KHEPRA EXPERTS difference.'
                : 'Le programme en cours d\'exécution active sur plusieurs pays valide la conviction méthodologique fondamentale de KHEPRA EXPERTS : l\'ingénierie réglementaire multi-pays en Afrique francophone n\'est pas un exercice juridique — c\'est un exercice d\'orchestration institutionnelle. Les cabinets qui réussissent sont ceux qui combinent la précision technique avec la fluidité diplomatique, l\'intelligence réglementaire avec le pragmatisme opérationnel, et les standards globaux avec la légitimité locale. C\'est la différence KHEPRA EXPERTS.'}
            </p>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 mt-6">
              <p className="text-gray-900 font-bold text-base md:text-lg">
                {isEn
                  ? 'Our conviction: « No theoretical reports. Rigorous diagnostics. Executable deliverables. Measurable results. »'
                  : 'Notre conviction : « Pas de rapport théorique. Des diagnostics rigoureux. Des livrables exécutoires. Des résultats mesurables. »'}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {isEn
                  ? '— KHEPRA EXPERTS, Regulatory Engineering & Institutional Orchestration for Francophone Africa since 2003'
                  : '— KHEPRA EXPERTS, Ingénierie Réglementaire & Orchestration Institutionnelle pour l\'Afrique Francophone depuis 2003'}
              </p>
            </div>
          </div>
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
          q: 'What are the differences between BCEAO and COBAC requirements for MFI licensing?',
          a: 'BCEAO (UEMOA) has consolidated its microfinance regulatory framework through Instruction n°001-01-2024 establishing conditions and procedures for SFD authorization, organization, and operations. COBAC (CEMAC) relies on Regulation n°01/17/CEMAC governing microfinance activities and Regulation LBC/FT R-2023/01 for AML/CFT compliance. Key differences include: minimum capital thresholds (variable by SFD category under BCEAO, defined by national decrees under COBAC), governance structure requirements (Board ≥ 5 members + mandatory Audit Committee under BCEAO vs. Board ≥ 3 members under COBAC), and reporting frequency. KHEPRA EXPERTS has mapped these divergences to design a unified yet jurisdictionally-adapted licensing strategy with modular compliance appendices.',
        },
        {
          q: 'What is an Institutional Infrastructure Player in the context of African digital microfinance?',
          a: 'An "Institutional Infrastructure Player" is a strategic concept describing a financial institution that goes beyond simple credit operations to build a genuine inclusive and sovereign digital public infrastructure. Unlike a conventional digital credit fintech, the Institutional Infrastructure Player deploys a complete ecosystem: ethical credit scoring (non-predatory, with borrower protection mechanisms), interoperable digital payment rails, proximity agent networks, financial literacy programs, and multi-jurisdictional regulatory compliance — aiming for systemic impact on financial inclusion across the UEMOA and CEMAC zones, not merely market share capture.',
        },
        {
          q: 'How does the wave-based sequencing strategy optimize multi-country MFI licensing?',
          a: 'KHEPRA EXPERTS exclusive wave-based sequencing operates in three waves: Wave 1 (Pilots) — a limited number of countries serving as regulatory testbeds where processes are initiated first, absorbing administrative friction, generating template documentation, and building institutional credibility. Wave 2 (Learning) — additional countries benefiting from accumulated lessons, refined documentation, and established regulator references, with targeted adjustments per jurisdiction. Wave 3 (Rapid Duplication) — remaining countries where the playbook is proven, processes are streamlined, and the institutional track record accelerates regulatory approval timelines.',
        },
        {
          q: 'Why is a locally-anchored consulting firm in Lomé, Togo essential for multi-country MFI licensing in Francophone Africa?',
          a: 'A locally-anchored firm like KHEPRA EXPERTS brings three decisive advantages that international firms cannot replicate: (1) Institutional intimacy — deep understanding of BCEAO and COBAC supervisory cultures, informal norms, and regulatory expectations that are not codified in written texts; (2) Credibility capital — a documented regulatory track record across both monetary zones, signaling to supervisors that the dossier has been prepared to the highest standards and tested against regional realities; (3) Diplomatic agility — the ability to navigate the complex institutional landscape spanning two monetary zones, multiple national regulators, and the specific political economy of each host country through continuous presence, not episodic missions.',
        },
      ]
    : [
        {
          q: 'Quelles sont les différences entre les exigences BCEAO et COBAC pour l\'agrément SFD ?',
          a: 'La BCEAO (UEMOA) a consolidé son cadre réglementaire de la microfinance via l\'Instruction n°001-01-2024 fixant les conditions et procédures d\'autorisation, d\'organisation et d\'exercice des SFD. La COBAC (CEMAC) s\'appuie sur le Règlement n°01/17/CEMAC régissant l\'activité de microfinance et le Règlement LBC/FT R-2023/01 pour la conformité AML/CFT. Les différences clés portent sur : les seuils de capital minimum (variables par catégorie SFD sous BCEAO, définis par décrets nationaux sous COBAC), les exigences de structure de gouvernance (Conseil ≥ 5 membres + Comité d\'Audit obligatoire sous BCEAO vs. Conseil ≥ 3 membres sous COBAC) et la fréquence de reporting. KHEPRA EXPERTS a cartographié ces divergences pour concevoir une stratégie d\'agrément unifiée mais adaptée à chaque juridiction avec des annexes de conformité modulaires.',
        },
        {
          q: 'Qu\'est-ce qu\'un Institutional Infrastructure Player dans le contexte de la microfinance digitale africaine ?',
          a: 'Un « Institutional Infrastructure Player » est un concept stratégique décrivant une institution financière qui dépasse les simples opérations de crédit pour bâtir une véritable infrastructure publique digitale, inclusive et souveraine. Contrairement à une fintech de crédit digitale conventionnelle, l\'Institutional Infrastructure Player déploie un écosystème complet : scoring de crédit éthique (non prédateur, avec mécanismes de protection de l\'emprunteur), rails de paiement digital interopérables, réseaux d\'agents de proximité, programmes d\'éducation financière et conformité réglementaire multi-juridictionnelle — visant un impact systémique sur l\'inclusion financière en zone UEMOA et CEMAC, non une simple capture de parts de marché.',
        },
        {
          q: 'Comment la stratégie de séquençage par vagues optimise-t-elle l\'agrément SFD multi-pays ?',
          a: 'La stratégie exclusive de KHEPRA EXPERTS opère en trois vagues : Vague 1 (Pilotes) — un nombre limité de pays servant de bancs d\'essai réglementaires où les processus sont initiés en premier, absorbant les frictions administratives, générant la documentation template et construisant la crédibilité institutionnelle. Vague 2 (Apprentissage) — des pays supplémentaires bénéficiant des leçons accumulées, de la documentation affinée et des références régulateurs établies, avec ajustements ciblés par juridiction. Vague 3 (Duplication rapide) — pays restants où le playbook est éprouvé, les processus rationalisés et le track record institutionnel accélère les délais d\'approbation réglementaire.',
        },
        {
          q: 'Pourquoi un cabinet de conseil ancré localement à Lomé, Togo est-il essentiel pour l\'agrément SFD multi-pays en Afrique francophone ?',
          a: 'Un cabinet ancré localement comme KHEPRA EXPERTS apporte trois avantages décisifs qu\'un cabinet international ne peut pas répliquer : (1) Intimité institutionnelle — compréhension profonde des cultures de supervision BCEAO et COBAC, des normes informelles et des attentes réglementaires non codifiées dans les textes écrits ; (2) Capital de crédibilité — un track record réglementaire documenté dans les deux zones monétaires, signalant aux superviseurs que le dossier a été préparé aux plus hauts standards et testé contre les réalités régionales ; (3) Agilité diplomatique — capacité à naviguer le paysage institutionnel complexe couvrant deux zones monétaires, de multiples régulateurs nationaux et l\'économie politique spécifique de chaque pays hôte par une présence continue, non des missions épisodiques.',
        },
      ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Frequently Asked Questions' : 'Questions Fréquentes'}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
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
  return (
    <section className="py-16 md:py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-end pr-8">
        <span className="font-playfair text-[16rem] font-bold text-emerald-200 leading-none" style={{ WebkitTextStroke: '2px currentColor', WebkitTextFillColor: 'transparent' }}>
          SFD
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-6">
          <i className="ri-chat-quote-line text-emerald-400 text-sm"></i>
          <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
            {isEn ? 'Multi-country licensing project?' : 'Projet d\'agrément multi-pays ?'}
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
          {isEn
            ? 'Orchestrate your multi-country MFI licensing with Africa\'s most experienced regulatory engineering team'
            : 'Orchestrez votre agrément SFD multi-pays avec l\'équipe d\'ingénierie réglementaire la plus expérimentée d\'Afrique'}
        </h2>

        <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {isEn
            ? 'KHEPRA EXPERTS delivers end-to-end multi-jurisdictional regulatory engineering — from pre-licensing assessment and BCEAO/COBAC compliance structuring to institutional diplomacy and wave-based program orchestration. A free 30-minute strategic consultation to assess your licensing project\'s feasibility and timeline.'
            : 'KHEPRA EXPERTS livre une ingénierie réglementaire multi-juridictionnelle de bout en bout — du pre-licensing assessment et de la structuration de conformité BCEAO/COBAC à la diplomatie institutionnelle et à l\'orchestration du programme par vagues. Une consultation stratégique gratuite de 30 minutes pour évaluer la faisabilité et le calendrier de votre projet d\'agrément.'}
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => {
              if (window.REACT_APP_NAVIGATE) window.REACT_APP_NAVIGATE('/diagnostic-flash');
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 text-base"
          >
            <i className="ri-calendar-check-line text-lg"></i>
            {isEn ? 'Book a free diagnostic' : 'Réserver un diagnostic gratuit'}
          </button>
          <BrochureDownloadButton
            variant="secondary"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold whitespace-nowrap cursor-pointer text-base"
            trackingLocation="agrement_multinational_case_study_cta"
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



