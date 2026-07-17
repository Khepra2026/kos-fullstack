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
const PAGE_PATH = '/case-studies/regtech-conformite-uemoa-cemac';

// Image hero dédiée
const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=modern%20african%20digital%20trust%20infrastructure%20and%20regulatory%20compliance%20technology%20visualization%2C%20futuristic%20fintech%20regtech%20platform%20with%20digital%20identity%20verification%20biometric%20scanning%20and%20KYC%20AML%20analytics%20dashboard%20on%20large%20holographic%20screens%2C%20sleek%20professional%20office%20in%20West%20African%20innovation%20hub%20Lom%C3%A9%20Togo%2C%20warm%20ambient%20lighting%20with%20teal%20and%20gold%20accents%2C%20abstract%20circuit%20patterns%20representing%20cybersecurity%20data%20protection%20and%20cross-border%20compliance%2C%20clean%20minimalist%20corporate%20aesthetic%20showing%20pan-African%20digital%20sovereignty%20concept&width=1600&height=800&seq=cs-regtech-hero-v1&orientation=landscape';

const buildStructuredData = (isEn: boolean) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}${PAGE_PATH}#article`,
      headline: isEn
        ? 'Case Study: Regulatory Structuring & Cross-Border Compliance of a Major RegTech Infrastructure in Francophone Africa (UEMOA & CEMAC)'
        : 'Étude de cas : Structuration réglementaire et conformité transfrontalière d\'une infrastructure RegTech majeure en Afrique Francophone (UEMOA & CEMAC)',
      description: isEn
        ? 'How KHEPRA EXPERTS helped a pan-African RegTech leader secure its compliance model across 8 UEMOA/CEMAC countries. Multi-jurisdictional regulatory engineering, data privacy, BCEAO/COBAC outsourcing frameworks, and investor-ready Regulatory Data Room.'
        : 'Comment KHEPRA EXPERTS a accompagné une RegTech panafricaine leader dans la sécurisation de son modèle de conformité sur 8 pays UEMOA/CEMAC. Ingénierie réglementaire multi-juridictionnelle, data privacy, contrats d\'externalisation BCEAO/COBAC et Regulatory Data Room.',
      image: HERO_IMAGE,
      author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
      publisher: { '@id': `${SITE_URL}/#organization` },
      datePublished: '2026-06-04',
      dateModified: '2026-06-04',
      inLanguage: isEn ? 'en-US' : 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      about: [
        { '@type': 'Thing', name: 'RegTech' },
        { '@type': 'Thing', name: 'KYC/KYB numérique' },
        { '@type': 'Thing', name: 'Conformité AML/CFT' },
        { '@type': 'Thing', name: 'Protection des données personnelles' },
        { '@type': 'Thing', name: 'Souveraineté numérique' },
        { '@type': 'Thing', name: 'Externalisation bancaire BCEAO' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${PAGE_PATH}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Case Studies' : 'Études de cas', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: isEn ? 'RegTech Compliance UEMOA/CEMAC' : 'Conformité RegTech UEMOA/CEMAC' },
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

export default function RegTechCaseStudyPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const contactRef = useRef<HTMLDivElement>(null);

  const ogTitle = isEn
    ? 'Case Study: RegTech Regulatory Structuring — UEMOA & CEMAC Compliance | KHEPRA EXPERTS'
    : 'Étude de cas : Structuration réglementaire RegTech — Conformité UEMOA & CEMAC | KHEPRA EXPERTS';

  const ogDescription = isEn
    ? 'How KHEPRA EXPERTS secured a pan-African RegTech leader across 8 UEMOA/CEMAC countries. Multi-jurisdictional regulatory engineering, BCEAO/COBAC compliance, data protection, AML/CFT, digital sovereignty.'
    : 'Comment KHEPRA EXPERTS a sécurisé une RegTech panafricaine leader sur 8 pays UEMOA/CEMAC. Ingénierie réglementaire multi-juridictionnelle, conformité BCEAO/COBAC, protection des données, LCB/FT, souveraineté numérique.';

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={ogTitle}
        description={ogDescription}
        keywords={isEn
          ? 'RegTech case study Africa, KYC KYB compliance UEMOA CEMAC, AML CFT regulatory structuring, data protection Francophone Africa, BCEAO COBAC outsourcing, digital sovereignty OHADA, KHEPRA EXPERTS regulatory engineering, fintech regtech compliance Africa'
          : 'étude de cas RegTech Afrique, conformité KYC KYB UEMOA CEMAC, structuration réglementaire LCB FT, protection données Afrique francophone, externalisation BCEAO COBAC, souveraineté numérique OHADA, KHEPRA EXPERTS ingénierie réglementaire, conformité fintech regtech Afrique'}
        canonicalPath={PAGE_PATH}
        ogType="article"
        ogImage={OG_IMAGES.CASE_STUDIES}
        ogImageAlt={isEn
          ? 'RegTech Regulatory Structuring Case Study — UEMOA & CEMAC — KHEPRA EXPERTS'
          : 'Étude de cas Structuration Réglementaire RegTech — UEMOA & CEMAC — KHEPRA EXPERTS'}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        twitterLabel1={isEn ? 'Coverage' : 'Couverture'}
        twitterData1="8 pays UEMOA/CEMAC"
        twitterLabel2={isEn ? 'Mission duration' : 'Durée mission'}
        twitterData2="16 semaines"
        structuredData={buildStructuredData(isEn)}
        hreflangLinks={STATIC_HREFLANG_MAP[PAGE_PATH + '/']}
        articleSection={isEn ? 'Case Studies' : 'Études de cas'}
        articleTags={isEn ? ['RegTech', 'KYC/KYB', 'AML/CFT Compliance', 'Data Protection', 'BCEAO', 'COBAC', 'OHADA', 'Digital Sovereignty', 'Pan-African', 'Regulatory Engineering'] : ['RegTech', 'KYC/KYB', 'Conformité AML/CFT', 'Protection des données', 'BCEAO', 'COBAC', 'OHADA', 'Souveraineté numérique', 'Panafricain', 'Ingénierie réglementaire']}
        articlePublishedTime="2026-06-04"
        articleModifiedTime="2026-06-04"
        articleAuthor="KHEPRA EXPERTS"
      />
      <SchemaFAQPage
        faqs={
          isEn
            ? [
                {
                  question: 'What are the regulatory challenges for a RegTech operating in UEMOA and CEMAC zones?',
                  answer: 'A RegTech operating in UEMOA/CEMAC faces multiple overlapping regulatory frameworks: BCEAO and COBAC banking supervision, GIABA/GABAC AML/CFT directives, national data protection laws (APDP, CDP, CNIL), FATF 40 recommendations, and cybersecurity requirements. The key challenge is the fragmentation of legal frameworks across 8+ jurisdictions while maintaining a unified compliance architecture.',
                },
                {
                  question: 'How does KHEPRA EXPERTS approach regulatory structuring for fintech and regtech companies in Africa?',
                  answer: 'KHEPRA EXPERTS deploys an integrated 4-phase methodology: (1) Technical Discovery & Model Qualification — mapping APIs, data flows, AI components; (2) Multi-jurisdictional Regulatory Audit — gap analysis against FATF, GIABA/GABAC, national laws; (3) Legal Engineering & Data Privacy — DPA, Cloud Compliance, OHADA structuring; (4) Commercial Framework — SaaS T&Cs, BCEAO/COBAC outsourcing contracts, Vendor Due Diligence. Each phase produces tangible, operational deliverables.',
                },
                {
                  question: 'Why is a Regulatory Data Room essential for RegTech companies seeking institutional clients?',
                  answer: 'A Regulatory Data Room transforms compliance from a cost center into a competitive advantage. For RegTech companies targeting banks and financial institutions, it provides a pre-packaged, auditable compliance dossier that accelerates vendor due diligence, demonstrates regulatory maturity to supervisors (BCEAO/COBAC), and significantly shortens the sales cycle with institutional clients. It is also a prerequisite for institutional fundraising rounds.',
                },
              ]
            : [
                {
                  question: 'Quels sont les défis réglementaires d\'une RegTech opérant en zone UEMOA et CEMAC ?',
                  answer: 'Une RegTech opérant en zone UEMOA/CEMAC fait face à une superposition de cadres réglementaires : supervision bancaire BCEAO et COBAC, directives AML/CFT du GIABA/GABAC, lois nationales de protection des données (APDP, CDP, CNIL), 40 recommandations du GAFI, et exigences de cybersécurité. Le défi majeur est la fragmentation des cadres juridiques sur 8+ juridictions tout en maintenant une architecture de conformité unifiée.',
                },
                {
                  question: 'Comment KHEPRA EXPERTS aborde-t-il la structuration réglementaire des fintechs et regtechs en Afrique ?',
                  answer: 'KHEPRA EXPERTS déploie une méthodologie intégrée en 4 phases : (1) Discovery Technique et Qualification du Modèle — cartographie des APIs, flux de données, composants IA ; (2) Audit Réglementaire Multi-juridictionnel — analyse des écarts vs GAFI, GIABA/GABAC, lois nationales ; (3) Ingénierie Juridique et Data Privacy — DPA, Cloud Compliance, structuration OHADA ; (4) Dispositif Commercial — CGS SaaS, contrats d\'externalisation BCEAO/COBAC, Vendor Due Diligence. Chaque phase produit des livrables tangibles et opérationnels.',
                },
                {
                  question: 'Pourquoi une Regulatory Data Room est-elle essentielle pour une RegTech cherchant des clients institutionnels ?',
                  answer: 'Une Regulatory Data Room transforme la conformité d\'un centre de coûts en avantage concurrentiel. Pour les RegTech ciblant les banques et institutions financières, elle fournit un dossier de conformité pré-structuré et auditable qui accélère les due diligences fournisseurs, démontre la maturité réglementaire aux superviseurs (BCEAO/COBAC), et raccourcit significativement le cycle de vente avec les clients institutionnels. C\'est également un prérequis pour les levées de fonds institutionnelles.',
                },
              ]
        }
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3">
          <Breadcrumb
            variant="dark"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'Case Studies' : 'Études de cas', href: '/case-studies' },
              { label: isEn ? 'RegTech UEMOA/CEMAC' : 'RegTech UEMOA/CEMAC' },
            ]}
          />
        </div>
      </div>

      <main>
        {/* ── HERO ── */}
        <HeroSection isEn={isEn} />

        {/* ── EXECUTIVE SUMMARY ── */}
        <ExecutiveSummary isEn={isEn} contactRef={contactRef} />

        {/* ── I. CONTEXTE ET DÉFIS ── */}
        <ContextSection isEn={isEn} />

        {/* ── II. APPROCHE MÉTHODOLOGIQUE ── */}
        <MethodologySection isEn={isEn} />

        {/* ── III. RÉSULTATS ── */}
        <ResultsSection isEn={isEn} />

        {/* ── IV. CONCLUSION ── */}
        <ConclusionSection isEn={isEn} />

        {/* ── FAQ ── */}
        <FAQSection isEn={isEn} />

        {/* ── CTA ── */}
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
          alt={isEn ? 'RegTech regulatory compliance — UEMOA CEMAC — KHEPRA EXPERTS case study' : 'Conformité réglementaire RegTech — UEMOA CEMAC — Étude de cas KHEPRA EXPERTS'}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent-500/20 border border-accent-400/40 text-accent-300">
              <i className="ri-trophy-line"></i>
              {isEn ? 'Featured Case Study' : 'Étude de cas phare'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-calendar-line"></i>
              2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-time-line"></i>
              {isEn ? '16 weeks' : '16 semaines'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-map-pin-2-line"></i>
              {isEn ? '8 countries' : '8 pays'}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {isEn
              ? 'Regulatory Structuring & Cross-Border Compliance of a Major RegTech Infrastructure in Francophone Africa'
              : 'Structuration réglementaire et conformité transfrontalière d\'une infrastructure RegTech majeure en Afrique Francophone'}
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed">
            {isEn
              ? 'How KHEPRA EXPERTS supported a pan-African digital trust leader in securing its business model at the intersection of financial regulation (BCEAO/COBAC), data protection, and digital sovereignty — deploying a complete multi-jurisdictional compliance architecture across 8 UEMOA and CEMAC countries.'
              : 'Comment KHEPRA EXPERTS a accompagné un leader panafricain de la confiance numérique dans la sécurisation de son modèle d\'affaires à l\'intersection de la régulation financière (BCEAO/COBAC), de la protection des données et de la souveraineté numérique — en déployant une architecture de conformité multi-juridictionnelle complète sur 8 pays UEMOA et CEMAC.'}
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
            <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
              <i className="ri-flashlight-line text-accent-600 text-lg"></i>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {isEn ? 'Executive Summary' : 'Synthèse Exécutive'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { value: '8', label: isEn ? 'UEMOA/CEMAC countries covered' : 'Pays UEMOA/CEMAC couverts', icon: 'ri-global-line' },
              { value: '5', label: isEn ? 'Legal qualification hypotheses tested' : 'Hypothèses de qualification juridique testées', icon: 'ri-scales-3-line' },
              { value: '100%', label: isEn ? 'Multi-jurisdictional compliance achieved' : 'Conformité multi-juridictionnelle atteinte', icon: 'ri-shield-check-line' },
              { value: 'Regulatory', label: isEn ? 'Data Room delivered' : 'Data Room réglementaire livrée', icon: 'ri-folder-shield-2-line' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-gradient-to-br from-accent-50 to-white border border-accent-100">
                <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-2">
                  <i className={`${stat.icon} text-accent-600 text-lg`}></i>
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-accent-600 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            {isEn
              ? 'A pan-African RegTech leader — an infrastructure operator of digital identity verification, KYC/KYB, UBO traceability, and AML/CFT compliance screening — operated across multiple Francophone African jurisdictions at the intersection of financial regulation and personal data protection. The company faced high regulatory intensity: five distinct legal qualification scenarios, fragmented data sovereignty requirements (including explicit local hosting mandates), and the constant risk of requalification as a "critical outsourcing provider" by banking supervisors.'
              : 'Une RegTech panafricaine leader — infrastructure de vérification d\'identité numérique, KYC/KYB, traçabilité des bénéficiaires effectifs (UBO) et conformité AML/CFT — opérait dans plusieurs juridictions d\'Afrique francophone à l\'intersection de la régulation financière et de la protection des données personnelles. L\'entreprise faisait face à une haute intensité réglementaire : cinq scénarios de qualification juridique distincts, des exigences fragmentées de souveraineté numérique (incluant des obligations explicites d\'hébergement local), et le risque constant de requalification en « prestataire critique externalisé » par les superviseurs bancaires.'}
          </p>

          <p className="text-gray-700 leading-relaxed mt-4">
            <strong className="text-gray-900">
              {isEn ? 'KHEPRA EXPERTS deployed an integrated 4-phase methodology' : 'KHEPRA EXPERTS a déployé une méthodologie intégrée en 4 phases'}
            </strong>
            {isEn
              ? ' — Technical Discovery, Multi-jurisdictional Regulatory Audit, Legal Engineering & Data Privacy, and Commercial Framework & Contracting — delivering a complete compliance architecture, a comprehensive Regulatory Data Room, and an immunized business model ready for institutional contracting across the UEMOA and CEMAC zones.'
              : ' — Discovery Technique, Audit Réglementaire Multi-juridictionnel, Ingénierie Juridique & Data Privacy, et Dispositif Commercial & Contractualisation — livrant une architecture de conformité complète, une Regulatory Data Room exhaustive et un modèle d\'affaires immunisé, prêt pour la contractualisation institutionnelle sur l\'ensemble des zones UEMOA et CEMAC.'}
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// I. CONTEXTE ET DÉFIS
// ═══════════════════════════════════════════
function ContextSection({ isEn }: { isEn: boolean }) {
  const regulatoryAuthorities = [
    { authority: 'BCEAO', role: isEn ? 'West African Central Bank — banking supervision, SFD oversight, prudential standards, regional AML/CFT directives' : 'Banque Centrale des États de l\'Afrique de l\'Ouest — supervision bancaire, SFD, normes prudentielles, directives AML/CFT régionales', relevance: isEn ? 'Critical' : 'Critique' },
    { authority: 'COBAC', role: isEn ? 'Central African Banking Commission — prudential supervision CEMAC, licensing, compliance standards, digital services directives' : 'Commission Bancaire de l\'Afrique Centrale — supervision prudentielle CEMAC, agréments, normes de conformité, directives services numériques', relevance: isEn ? 'Critical' : 'Critique' },
    { authority: 'GIABA / GABAC', role: isEn ? 'FATF-style regional bodies — AML/CFT system evaluation, 40 FATF recommendations, mutual evaluation reports' : 'Organes régionaux de type GAFI — évaluation des systèmes AML/CFT, 40 recommandations GAFI, rapports d\'évaluation mutuelle', relevance: isEn ? 'Critical' : 'Critique' },
    { authority: isEn ? 'National DPAs' : 'APDP / CDP / CNIL', role: isEn ? 'National Data Protection Authorities — registration, declaration, authorization of data processing, inspections (Togo, Benin, Senegal, Côte d\'Ivoire, etc.)' : 'Autorités nationales de protection des données — enregistrement, déclaration, autorisation des traitements, inspections (Togo, Bénin, Sénégal, Côte d\'Ivoire, etc.)', relevance: isEn ? 'Critical' : 'Critique' },
    { authority: isEn ? 'National Cybersecurity Agencies' : 'Agences nationales cybersécurité', role: isEn ? 'ANSSI, CERT — security audits, certifications, incident notification requirements' : 'ANSSI, CERT — audits de sécurité, certifications, obligations de notification des incidents', relevance: isEn ? 'High' : 'Élevée' },
    { authority: 'GAFI', role: isEn ? 'Financial Action Task Force — 40 recommendations on AML/CFT, international standards' : 'Groupe d\'Action Financière — 40 recommandations LCB/FT, standards internationaux', relevance: isEn ? 'High' : 'Élevée' },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-search-eye-line"></i>
            {isEn ? 'PART I' : 'PARTIE I'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Context and Client Challenges' : 'Le Contexte et les Défis du Client'}
          </h2>
          <div className="w-20 h-1 bg-accent-500 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* High regulatory intensity */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="ri-alert-line text-accent-600"></i>
              {isEn ? 'A RegTech at the Crossroads of Financial and Data Regulation' : 'Une RegTech à la croisée de la régulation financière et des données'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {isEn
                ? 'The client — a pan-African digital trust infrastructure operator — provides identity verification, KYC/KYB, UBO (Ultimate Beneficial Owner) traceability, PEP (Politically Exposed Persons) screening, and sanctions compliance solutions to financial institutions, fintechs, and public authorities. Its Compliance-as-a-Service model positions it as a critical layer in the African financial ecosystem\'s trust architecture. This strategic positioning, however, exposes the company to an exceptionally complex regulatory matrix, spanning banking supervision, AML/CFT compliance, personal data protection, cybersecurity, and digital sovereignty — across multiple jurisdictions with fragmented legal frameworks.'
                : 'Le client — une infrastructure panafricaine de confiance numérique — fournit des solutions de vérification d\'identité, KYC/KYB, traçabilité des bénéficiaires effectifs (UBO), screening des personnes politiquement exposées (PPE) et conformité aux sanctions, aux institutions financières, fintechs et autorités publiques. Son modèle de Compliance-as-a-Service le positionne comme une couche critique de l\'architecture de confiance de l\'écosystème financier africain. Ce positionnement stratégique l\'expose cependant à une matrice réglementaire d\'une complexité exceptionnelle, couvrant la supervision bancaire, la conformité AML/CFT, la protection des données personnelles, la cybersécurité et la souveraineté numérique — sur de multiples juridictions aux cadres juridiques fragmentés.'}
            </p>
          </div>

          {/* 4 key challenges */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="ri-error-warning-line text-accent-600"></i>
              {isEn ? 'Four Dimensions of High Regulatory Intensity' : 'Quatre dimensions de haute intensité réglementaire'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Challenge A */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                    <i className="ri-bank-line text-red-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">
                      {isEn ? 'A. KYC/KYB/AML/CFT Exposure' : 'A. Exposition KYC/KYB/AML/CFT'}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isEn
                        ? 'Processing identity and compliance data on behalf of regulated institutions places the company under regional AML/CFT directives (GIABA, GABAC, UMOA). Supervisors require complete traceability of data flows and compliance decisions. Sanctions screening (OFAC, UN, EU) and PEP identification are regulatory obligations whose outsourcing to a technical provider must be contractually and regulatorily framed.'
                        : 'Le traitement de données d\'identité et de conformité pour le compte d\'institutions assujetties place l\'entreprise sous les directives AML/CFT régionales (GIABA, GABAC, UMOA). Les superviseurs exigent une traçabilité complète des flux de données et des décisions de conformité. Le screening des sanctions (OFAC, ONU, UE) et l\'identification des PPE sont des obligations réglementaires dont l\'externalisation vers un prestataire technique doit être encadrée.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Challenge B */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <i className="ri-fingerprint-line text-amber-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">
                      {isEn ? 'B. Biometric & Sensitive Data Processing' : 'B. Traitement de données biométriques et sensibles'}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isEn
                        ? 'The company collects, processes, and potentially stores biometric data, identity data, and sensitive financial data. Biometric data, classified as sensitive/special category in virtually all Francophone African jurisdictions, is subject to enhanced protection regimes — with explicit local hosting mandates in certain countries (e.g., Benin Law No. 2019-22, Art. 45) and prior authorization or enhanced declaration requirements across the board.'
                        : 'L\'entreprise collecte, traite et potentiellement conserve des données biométriques, des données d\'identité et des données financières sensibles. Les données biométriques, classées comme sensibles/catégorie spéciale dans la quasi-totalité des juridictions d\'Afrique francophone, sont soumises à des régimes de protection renforcée — avec des obligations explicites d\'hébergement local dans certains pays (ex: Bénin, Loi n°2019-22, art. 45) et des exigences d\'autorisation préalable ou de déclaration renforcée partout.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Challenge C */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <i className="ri-shield-keyhole-line text-blue-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">
                      {isEn ? 'C. Cybersecurity & Operational Resilience' : 'C. Cybersécurité et résilience opérationnelle'}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isEn
                        ? 'As a critical service provider, the company must demonstrate compliance with cybersecurity standards applicable to financial institutions. ISO 27001 and SOC 2 certifications — while not legally mandated — have become de facto commercial prerequisites for banking subcontractors. Business continuity (BCP) and disaster recovery plans (DRP) are contractual obligations imposed by financial institutions on their third-party providers.'
                        : 'En tant que fournisseur de services critiques, l\'entreprise doit démontrer sa conformité aux standards de cybersécurité applicables aux institutions financières. Les certifications ISO 27001 et SOC 2 — non obligatoires légalement — sont devenues des prérequis commerciaux de facto pour les sous-traitants bancaires. Les plans de continuité d\'activité (PCA) et de reprise après sinistre (PRA) sont des obligations contractuelles imposées par les institutions financières.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Challenge D */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <i className="ri-global-line text-green-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">
                      {isEn ? 'D. Cross-Border Data Flows & Digital Sovereignty' : 'D. Flux transfrontaliers et souveraineté numérique'}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isEn
                        ? 'Operating across 8+ countries of the UEMOA and CEMAC zones, the company faces distinct national data protection frameworks in each jurisdiction. Cross-border data transfers — both between African countries and towards third countries — face growing restrictions under emerging digital sovereignty policies. Each country imposes its own registration, declaration, or prior authorization requirements, creating a complex multi-layered compliance landscape.'
                        : 'Opérant dans 8+ pays des zones UEMOA et CEMAC, l\'entreprise fait face à des cadres nationaux de protection des données distincts dans chaque juridiction. Les transferts transfrontaliers de données — entre pays africains comme vers des pays tiers — sont soumis à des restrictions croissantes dans le cadre des politiques émergentes de souveraineté numérique. Chaque pays impose ses propres exigences d\'enregistrement, de déclaration ou d\'autorisation préalable, créant un paysage de conformité multi-couches complexe.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regulatory authorities table */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-government-line text-accent-600"></i>
              {isEn ? 'Key Regulatory Authorities Involved' : 'Principales autorités réglementaires concernées'}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left p-3 md:p-4 font-semibold">{isEn ? 'Authority' : 'Autorité'}</th>
                    <th className="text-left p-3 md:p-4 font-semibold hidden md:table-cell">{isEn ? 'Role' : 'Rôle'}</th>
                    <th className="text-center p-3 md:p-4 font-semibold">{isEn ? 'Relevance' : 'Pertinence'}</th>
                  </tr>
                </thead>
                <tbody>
                  {regulatoryAuthorities.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 md:p-4 font-semibold text-gray-900">{row.authority}</td>
                      <td className="p-3 md:p-4 text-gray-600 hidden md:table-cell">{row.role}</td>
                      <td className="p-3 md:p-4 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${row.relevance === (isEn ? 'Critical' : 'Critique') ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {row.relevance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk matrix summary */}
          <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-xl p-6 border border-red-100">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="ri-alert-fill text-red-600"></i>
              {isEn ? 'Critical Risk: Business Model Requalification' : 'Risque critique : Requalification du modèle d\'affaires'}
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {isEn
                ? 'The most significant threat identified was the risk of regulatory requalification. Five distinct legal qualification hypotheses were tested: (1) SaaS provider, (2) data processor/sub-processor, (3) critical outsourced banking provider, (4) AML compliance chain operator, and (5) digital trust service provider. The most defensible qualification — SaaS provider / data processor (Hypotheses 1 & 2) — required rigorous contractual architecture. The most dangerous — critical outsourced provider (Hypothesis 3) — depended on the discretionary assessment of each client institution\'s banking supervisor, creating asymmetric regulatory risk across jurisdictions.'
                : 'La menace la plus significative identifiée était le risque de requalification réglementaire. Cinq hypothèses de qualification juridique distinctes ont été testées : (1) Fournisseur SaaS, (2) Sous-traitant de données, (3) Prestataire critique externalisé bancaire, (4) Opérateur de la chaîne de conformité AML, et (5) Prestataire de services de confiance numérique. La qualification la plus défendable — Fournisseur SaaS / Sous-traitant (Hypothèses 1 & 2) — nécessitait une architecture contractuelle rigoureuse. La plus dangereuse — Prestataire critique externalisé (Hypothèse 3) — dépendait de l\'appréciation discrétionnaire du superviseur bancaire de chaque institution cliente, créant un risque réglementaire asymétrique selon les juridictions.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// II. APPROCHE MÉTHODOLOGIQUE
// ═══════════════════════════════════════════
function MethodologySection({ isEn }: { isEn: boolean }) {
  const phases = [
    {
      num: '1',
      icon: 'ri-search-eye-line',
      color: 'bg-blue-100 text-blue-700',
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50',
      title: isEn ? 'Technical Discovery & Model Qualification' : 'Discovery Technique & Qualification du Modèle',
      duration: isEn ? '2–3 weeks' : '2–3 semaines',
      activities: isEn
        ? [
            'In-depth analysis of business model: data flows, value chain, client typology, processing typology, infrastructure locations',
            'Complete UEMOA/CEMAC regulatory mapping: applicable texts, competent authorities, required declarations, deadlines and sanctions',
            'Cross-border data flow analysis: entry, processing, exit, subcontractors, international transfers, retention periods',
            'Risk analysis: regulatory, legal, technical, and operational risks, scored by criticality and mitigation feasibility',
            'Regulatory benchmark: analysis of competitor and peer practices, identification of best practices and sectoral standards',
          ]
        : [
            'Analyse approfondie du modèle d\'affaires : flux de données, chaîne de valeur, typologie des clients, typologie des traitements, localisation des infrastructures',
            'Cartographie réglementaire complète UEMOA/CEMAC : textes applicables, autorités compétentes, déclarations requises, délais et sanctions',
            'Analyse des flux transfrontaliers : entrées, traitements, sorties, sous-traitants, transferts internationaux, durées de conservation',
            'Analyse des risques : risques réglementaires, juridiques, techniques et opérationnels, scorés par criticité et faisabilité de mitigation',
            'Benchmark réglementaire : analyse des pratiques des concurrents et pairs, identification des meilleures pratiques et standards sectoriels',
          ],
      deliverables: isEn
        ? 'Comprehensive regulatory audit report (80+ pages) — diagnosis, gaps, recommendations, prioritization. UEMOA/CEMAC regulatory mapping matrix. Cross-border flow mapping. Risk matrix — 8 risks identified with mitigation plans. Strategic compliance roadmap — 6 phases, 24 months, critical milestones.'
        : 'Rapport d\'audit réglementaire complet (80+ pages) — diagnostic, lacunes, recommandations, priorisation. Cartographie réglementaire UEMOA/CEMAC. Cartographie des flux transfrontaliers. Matrice de risques — 8 risques identifiés avec plans de mitigation. Feuille de route stratégique de mise en conformité — 6 phases, 24 mois, jalons critiques.',
    },
    {
      num: '2',
      icon: 'ri-file-search-line',
      color: 'bg-amber-100 text-amber-700',
      borderColor: 'border-amber-200',
      bgColor: 'bg-amber-50',
      title: isEn ? 'Multi-Jurisdictional Regulatory Audit & Risk Mapping' : 'Audit Réglementaire Multi-Juridictionnel & Cartographie des Risques',
      duration: isEn ? '2 weeks' : '2 semaines',
      activities: isEn
        ? [
            'Gap analysis against the 40 FATF Recommendations: assessment of AML/CFT obligation coverage, identification of compliance shortfalls',
            'GIABA/GABAC directive analysis: regional evaluation frameworks, mutual evaluation criteria, country-specific requirements',
            'National data protection law analysis: 14-country matrix covering Togo, Benin, Côte d\'Ivoire, Senegal, Burkina Faso, Mali, Niger, Cameroon, Gabon, Congo, and others',
            'Cloud compliance assessment: evaluation of cloud hosting compliance against digital sovereignty requirements, data center locations, provider certifications',
            'Cybersecurity requirements mapping: BCEAO/COBAC prudential standards, national cybersecurity directives, market practices (ISO 27001, SOC 2)',
          ]
        : [
            'Analyse des écarts par rapport aux 40 Recommandations du GAFI : évaluation de la couverture des obligations AML/CFT, identification des lacunes de conformité',
            'Analyse des directives GIABA/GABAC : cadres d\'évaluation régionaux, critères d\'évaluation mutuelle, exigences par pays',
            'Analyse des lois nationales de protection des données : matrice 14 pays couvrant Togo, Bénin, Côte d\'Ivoire, Sénégal, Burkina Faso, Mali, Niger, Cameroun, Gabon, Congo et autres',
            'Cloud Compliance Assessment : évaluation de la conformité de l\'hébergement cloud aux exigences de souveraineté numérique, localisation des datacenters, certifications du fournisseur',
            'Cartographie des exigences de cybersécurité : normes prudentielles BCEAO/COBAC, directives nationales de cybersécurité, pratiques de marché (ISO 27001, SOC 2)',
          ],
      deliverables: isEn
        ? 'Multi-jurisdictional regulatory gap analysis report. 14-country data protection law matrix with authority, status, and applicability. Cloud Compliance Assessment report. FATF 40 Recommendations compliance matrix. Cross-border transfer restriction mapping.'
        : 'Rapport d\'analyse des écarts réglementaires multi-juridictionnels. Matrice 14 pays des lois de protection des données avec autorité, statut et applicabilité. Rapport Cloud Compliance Assessment. Matrice de conformité aux 40 Recommandations du GAFI. Cartographie des restrictions de transfert transfrontalier.',
    },
    {
      num: '3',
      icon: 'ri-shield-check-line',
      color: 'bg-green-100 text-green-700',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50',
      title: isEn ? 'Legal Engineering & Data Privacy Architecture' : 'Ingénierie Juridique & Architecture Data Privacy',
      duration: isEn ? '3 weeks' : '3 semaines',
      activities: isEn
        ? [
            'Precise qualification of legal status: controller, co-controller, or processor — by processing type and by client',
            'Detailed processing analysis: purpose, legal basis, data categories, data subject categories, recipients, retention periods, security measures',
            'GDPR-inspired compliance framework: data subject rights (access, rectification, erasure, portability, objection), processing register, privacy by design/default',
            'Local compliance adaptation: alignment with national laws for each target country, declarations and registrations with competent authorities',
            'Data Processing Agreement (DPA) drafting: subcontracting contract model adaptable to each institutional client',
            'Incident management procedures: detection, authority notification (within applicable regulatory deadlines), data subject notification, documentation',
          ]
        : [
            'Qualification précise du statut juridique : responsable, co-responsable ou sous-traitant — par traitement et par client',
            'Analyse détaillée de chaque traitement : finalité, base légale, catégories de données, catégories de personnes concernées, destinataires, durées de conservation, mesures de sécurité',
            'Mise en conformité inspirée du RGPD : droits des personnes (accès, rectification, effacement, portabilité, opposition), registre de traitement, privacy by design/default',
            'Adaptation locale : alignement sur les lois nationales de chaque pays cible, déclarations et enregistrements auprès des autorités compétentes',
            'Rédaction du Data Processing Agreement (DPA) : modèle de contrat de sous-traitance adaptable à chaque client institutionnel',
            'Procédures de gestion des incidents : détection, notification à l\'autorité (dans les délais réglementaires), notification aux personnes concernées, documentation',
          ],
      deliverables: isEn
        ? 'Complete personal data processing register. Public and internal privacy policies (website, application + employees, subcontractors). Data Processing Agreement (DPA) model. Cloud Compliance Assessment report. Data breach management playbooks. Data retention and archiving policy. Subcontractor analysis and compliance assessment.'
        : 'Registre de traitement des données personnelles complet. Politiques de confidentialité publique et interne (site web, application + employés, sous-traitants). Data Processing Agreement (DPA) modèle. Rapport Cloud Compliance Assessment. Playbooks de gestion des violations de données. Politique de conservation et d\'archivage. Analyse des sous-traitants et évaluation de conformité.',
    },
    {
      num: '4',
      icon: 'ri-article-line',
      color: 'bg-purple-100 text-purple-700',
      borderColor: 'border-purple-200',
      bgColor: 'bg-purple-50',
      title: isEn ? 'Commercial Framework & Institutional Contracting' : 'Dispositif Commercial & Contractualisation Institutionnelle',
      duration: isEn ? '3 weeks' : '3 semaines',
      activities: isEn
        ? [
            'SaaS General Terms and Conditions (GTC) drafting: adapted to RegTech services, with regulatory compliance clauses, SLAs, liability limitations',
            'API contract drafting: technical specifications, usage conditions, quotas, pricing, confidentiality, security',
            'BCEAO/COBAC-compliant outsourcing agreements: auditability, reversibility, business continuity, exit clauses',
            'International data transfer clauses: contractual guarantee mechanisms adapted to each destination',
            'Vendor Due Diligence framework: supplier questionnaire, due diligence procedure, assessment report model',
            'NDA models: 3 versions — prospect, partner, employee',
            'AI Governance Framework: algorithm governance, AI ethics, explainability, bias control, automated decision documentation',
          ]
        : [
            'Rédaction des Conditions Générales de Service (CGS) SaaS : adaptées aux services RegTech, avec clauses de conformité réglementaire, SLA, limitations de responsabilité',
            'Rédaction des contrats API : spécifications techniques, conditions d\'utilisation, quotas, tarification, confidentialité, sécurité',
            'Contrats d\'externalisation conformes BCEAO/COBAC : auditabilité, réversibilité, continuité d\'activité, clauses de sortie',
            'Clauses de transfert international de données : mécanismes de garantie contractuelle adaptés à chaque destination',
            'Cadre de Vendor Due Diligence : questionnaire fournisseur, procédure de due diligence, modèle de rapport d\'évaluation',
            'Modèles NDA : 3 versions — prospect, partenaire, employé',
            'AI Governance Framework : gouvernance des algorithmes, éthique IA, explicabilité, contrôle des biais, documentation des décisions automatisées',
          ],
      deliverables: isEn
        ? 'SaaS General Terms and Conditions — complete, negotiable contractual document. API contract framework. BCEAO/COBAC-compliant outsourcing agreement model. International data transfer clauses. Vendor Due Diligence Report — questionnaire, procedure, and assessment model. NDA models (3 versions). AI Governance Framework. AML/CFT compliance manual. Auditability framework.'
        : 'Conditions Générales de Service SaaS — document contractuel complet et négociable. Contrat API. Modèle de contrat d\'externalisation conforme BCEAO/COBAC. Clauses de transfert international de données. Rapport Vendor Due Diligence — questionnaire, procédure et modèle d\'évaluation. Modèles NDA (3 versions). AI Governance Framework. Manuel de conformité AML/CFT. Cadre d\'auditabilité.',
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
            {isEn ? 'KHEPRA EXPERTS\' Methodological Approach' : 'L\'Approche Méthodologique de Khepra Experts'}
          </h2>
          <p className="text-gray-600 max-w-3xl">
            {isEn
              ? 'We deployed an integrated, Big Four-grade methodology combining regulatory analysis, legal engineering, technical discovery, and commercial structuring — organized in four interconnected phases, each producing tangible, operational deliverables.'
              : 'Nous avons déployé une méthodologie intégrée de niveau Big Four, combinant analyse réglementaire, ingénierie juridique, discovery technique et structuration commerciale — organisée en quatre phases interconnectées, chacune produisant des livrables tangibles et opérationnels.'}
          </p>
          <div className="w-20 h-1 bg-accent-500 rounded-full mt-4"></div>
        </div>

        {/* Phases */}
        <div className="space-y-6">
          {phases.map((phase) => (
            <div key={phase.num} className={`${phase.bgColor} rounded-2xl border ${phase.borderColor} p-6 md:p-8`}>
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                {/* Number badge */}
                <div className={`w-12 h-12 rounded-xl ${phase.color} flex items-center justify-center shrink-0`}>
                  <span className="text-xl font-extrabold">{phase.num}</span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                      <i className={`${phase.icon} text-gray-700`}></i>
                      {phase.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-300 text-gray-700 whitespace-nowrap">
                      <i className="ri-time-line"></i>
                      {phase.duration}
                    </span>
                  </div>

                  {/* Activities */}
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                      {isEn ? 'Activities' : 'Activités'}
                    </h4>
                    <ul className="space-y-1.5">
                      {phase.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <i className="ri-checkbox-circle-fill text-gray-500 mt-0.5 shrink-0"></i>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                      {isEn ? 'Key Deliverables' : 'Livrables clés'}
                    </h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-700 leading-relaxed">{phase.deliverables}</p>
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
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-trophy-line"></i>
            {isEn ? 'PART III' : 'PARTIE III'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Results & Strategic Value Delivered' : 'Résultats Obtenus & Valeur Ajoutée'}
          </h2>
          <div className="w-20 h-1 bg-accent-500 rounded-full"></div>
        </div>

        {/* 3 Strategic Assets */}
        <div className="space-y-8">
          {/* Asset 1 */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center">
                <i className="ri-rocket-2-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {isEn ? '1. Secured Go-to-Market & Immunized Business Model' : '1. Sécurisation du Go-to-Market & Modèle d\'Affaires Immunisé'}
                </h3>
                <p className="text-sm text-green-700 font-medium">
                  {isEn ? 'Strategic Asset' : 'Actif Stratégique'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-xl p-4 border border-green-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'The business model was validated and immunized against the risk of critical requalification. The five legal qualification hypotheses were stress-tested, with a clear, defensible primary qualification (SaaS + data processor) and a documented risk mitigation strategy for the most dangerous scenarios. The company can now confidently engage with banking supervisors, demonstrating proactive regulatory maturity.'
                    : 'Le modèle d\'affaires a été validé et immunisé contre les risques de requalification critique. Les cinq hypothèses de qualification juridique ont été testées en stress, avec une qualification principale claire et défendable (SaaS + sous-traitant de données) et une stratégie documentée de mitigation pour les scénarios les plus dangereux. L\'entreprise peut désormais engager sereinement les superviseurs bancaires, en démontrant une maturité réglementaire proactive.'}
                </p>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-green-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'The commercial framework — SaaS GTCs, API contracts, BCEAO/COBAC-compliant outsourcing agreements — was designed to be immediately executable with tier-1 banks. Vendor Due Diligence documentation was pre-packaged, reducing institutional sales cycles by an estimated 40–60%. The compliance architecture became a commercial differentiator, not a cost center.'
                    : 'Le dispositif commercial — CGS SaaS, contrats API, contrats d\'externalisation conformes BCEAO/COBAC — a été conçu pour être immédiatement exécutable avec des banques de premier rang. La documentation de Vendor Due Diligence a été pré-structurée, réduisant les cycles de vente institutionnelle de 40 à 60% estimés. L\'architecture de conformité est devenue un différenciateur commercial, non un centre de coûts.'}
                </p>
              </div>
            </div>
          </div>

          {/* Asset 2 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center">
                <i className="ri-global-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {isEn ? '2. Multi-Jurisdictional Compliance — 3 to 8 Countries' : '2. Conformité Multi-Juridictionnelle — 3 à 8 Pays'}
                </h3>
                <p className="text-sm text-blue-700 font-medium">
                  {isEn ? 'Strategic Asset' : 'Actif Stratégique'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'Deliverables were specifically adapted to the economic substance and digital sovereignty requirements of each target country. The 14-country data protection law matrix enabled precise, jurisdiction-by-jurisdiction compliance — from Benin\'s explicit local hosting mandate (Art. 45, Law No. 2019-22) to Senegal\'s enhanced declaration regime for biometric data, to Côte d\'Ivoire\'s registration framework.'
                    : 'Les livrables ont été spécifiquement adaptés aux exigences de substance économique et de souveraineté numérique de chaque pays cible. La matrice 14 pays des lois de protection des données a permis une conformité précise, juridiction par juridiction — du mandat explicite d\'hébergement local au Bénin (art. 45, Loi n°2019-22) au régime de déclaration renforcée du Sénégal pour les données biométriques, en passant par le cadre d\'enregistrement de la Côte d\'Ivoire.'}
                </p>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'The Cloud Compliance Assessment provided clarity on data center localization and cross-border transfer feasibility across the UEMOA/CEMAC ecosystem. Internal processing registers, privacy policies, and DPA models were designed to be adaptable by country, enabling rapid market entry while maintaining full regulatory compliance — a critical capability for a pan-African RegTech scaling across fragmented regulatory landscapes.'
                    : 'Le Cloud Compliance Assessment a clarifié la localisation des datacenters et la faisabilité des transferts transfrontaliers à travers l\'écosystème UEMOA/CEMAC. Les registres de traitement, politiques de confidentialité et modèles DPA ont été conçus pour être adaptables par pays, permettant une entrée rapide sur les marchés tout en maintenant une conformité réglementaire totale — une capacité critique pour une RegTech panafricaine en croissance sur des paysages réglementaires fragmentés.'}
                </p>
              </div>
            </div>
          </div>

          {/* Asset 3 */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center">
                <i className="ri-folder-shield-2-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {isEn ? '3. Investor & Institutional Readiness — Regulatory Data Room' : '3. Investor & Institutional Readiness — Regulatory Data Room'}
                </h3>
                <p className="text-sm text-amber-700 font-medium">
                  {isEn ? 'Strategic Asset' : 'Actif Stratégique'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-xl p-4 border border-amber-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'The complete Regulatory Data Room was created — a comprehensive, pre-structured, and auditable compliance dossier including: processing register, privacy policies, DPA, Cloud Compliance Assessment, AML/CFT manual, auditability framework, AI Governance Framework, BCP/DRP documentation, and the full vendor due diligence package. This transforms the compliance function from a reactive cost center into a proactive competitive advantage.'
                    : 'La Regulatory Data Room complète a été créée — un dossier de conformité exhaustif, pré-structuré et auditable incluant : registre de traitement, politiques de confidentialité, DPA, Cloud Compliance Assessment, manuel AML/CFT, cadre d\'auditabilité, AI Governance Framework, documentation PCA/PRA et le package complet de vendor due diligence. Ceci transforme la fonction conformité d\'un centre de coûts réactif en un avantage concurrentiel proactif.'}
                </p>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-amber-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'For fundraising rounds (Series A and beyond), the Regulatory Data Room directly addresses the top-3 due diligence concerns of institutional investors in regulated tech: regulatory risk exposure, data protection compliance maturity, and supervisory relationship readiness. The documented compliance architecture also satisfies the stringent third-party risk management (TPRM) requirements of tier-1 banking clients, positioning the company as the default RegTech infrastructure provider for the region\'s leading financial institutions.'
                    : 'Pour les levées de fonds (Série A et au-delà), la Regulatory Data Room répond directement aux 3 principales préoccupations de due diligence des investisseurs institutionnels dans la tech régulée : exposition au risque réglementaire, maturité de conformité en protection des données, et préparation à la relation avec les superviseurs. L\'architecture de conformité documentée satisfait également les exigences strictes de gestion des risques tiers (TPRM) des clients bancaires de premier rang, positionnant l\'entreprise comme le fournisseur d\'infrastructure RegTech de référence pour les principales institutions financières de la région.'}
                </p>
              </div>
            </div>
          </div>
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
                isEn ? 'Undefined legal qualification — five untested hypotheses, exposure to requalification risk' : 'Qualification juridique indéterminée — cinq hypothèses non testées, exposition au risque de requalification',
                isEn ? 'No documented regulatory framework — inability to respond to institutional due diligence requests' : 'Absence de cadre réglementaire documenté — incapacité à répondre aux due diligences institutionnelles',
                isEn ? 'Fragmented awareness of country-specific requirements — Benin local hosting mandate, biometric data restrictions unknown' : 'Connaissance fragmentée des exigences pays — obligation d\'hébergement local au Bénin, restrictions biométriques non maîtrisées',
                isEn ? 'No outsourcing agreement templates — each institutional contract negotiation from scratch' : 'Absence de contrats d\'externalisation types — chaque négociation contractuelle institutionnelle repartait de zéro',
                isEn ? 'Compliance perceived as a cost center — no competitive positioning around regulatory maturity' : 'Conformité perçue comme un centre de coûts — aucun positionnement concurrentiel autour de la maturité réglementaire',
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
                isEn ? 'Validated legal qualification — five hypotheses stress-tested, primary qualification defended, all risks mitigated' : 'Qualification juridique validée — cinq hypothèses testées en stress, qualification principale défendue, tous risques mitigés',
                isEn ? 'Complete Regulatory Data Room — pre-packaged, auditable compliance dossier for investors and institutional clients' : 'Regulatory Data Room complète — dossier de conformité pré-structuré et auditable pour investisseurs et clients institutionnels',
                isEn ? '14-country data protection law matrix — precise, jurisdiction-by-jurisdiction compliance architecture' : 'Matrice 14 pays des lois de protection des données — architecture de conformité précise, juridiction par juridiction',
                isEn ? 'BCEAO/COBAC-compliant outsourcing agreements + SaaS GTCs + API contracts — full commercial framework' : 'Contrats d\'externalisation BCEAO/COBAC + CGS SaaS + Contrats API — dispositif commercial complet',
                isEn ? 'Compliance transformed into competitive advantage — Regulatory Data Room as key sales and fundraising asset' : 'Conformité transformée en avantage concurrentiel — Regulatory Data Room comme actif clé de vente et de levée de fonds',
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
// IV. CONCLUSION
// ═══════════════════════════════════════════
function ConclusionSection({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 mb-3">
            <i className="ri-lightbulb-line"></i>
            {isEn ? 'PART IV' : 'PARTIE IV'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Conclusion — Building Africa\'s Digital Trust Infrastructure' : 'Conclusion — Bâtir l\'infrastructure de confiance numérique africaine'}
          </h2>
          <div className="w-20 h-1 bg-accent-500 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              {isEn
                ? 'This engagement illustrates a fundamental strategic truth about the African RegTech landscape: regulatory compliance, when properly architected, is not a constraint — it is the foundation of competitive advantage. The convergence of financial regulation (BCEAO, COBAC), AML/CFT standards (GIABA, GABAC, FATF), data protection frameworks, and digital sovereignty requirements creates a compliance environment of exceptional complexity. For RegTech companies, mastering this complexity is not optional — it is the prerequisite for institutional trust.'
                : 'Cette mission illustre une vérité stratégique fondamentale du paysage RegTech africain : la conformité réglementaire, lorsqu\'elle est correctement architecturée, n\'est pas une contrainte — elle est le fondement de l\'avantage concurrentiel. La convergence de la régulation financière (BCEAO, COBAC), des standards AML/CFT (GIABA, GABAC, GAFI), des cadres de protection des données et des exigences de souveraineté numérique crée un environnement de conformité d\'une complexité exceptionnelle. Pour les RegTech, maîtriser cette complexité n\'est pas optionnel — c\'est le prérequis de la confiance institutionnelle.'}
            </p>

            <p>
              {isEn
                ? 'At KHEPRA EXPERTS, we believe that the digital trust infrastructure of Francophone Africa will be built by companies that treat regulatory engineering as a core strategic function — on par with technology development. This case study demonstrates that the combination of legal expertise, regulatory intelligence, and technical understanding is not merely additive; it is multiplicative. The RegTech companies that will dominate this market are those that make regulatory compliance their primary competitive moat.'
                : 'Chez KHEPRA EXPERTS, nous sommes convaincus que l\'infrastructure de confiance numérique de l\'Afrique francophone sera construite par des entreprises qui traitent l\'ingénierie réglementaire comme une fonction stratégique centrale — au même titre que le développement technologique. Cette étude de cas démontre que la combinaison de l\'expertise juridique, de l\'intelligence réglementaire et de la compréhension technique n\'est pas simplement additive ; elle est multiplicative. Les RegTech qui domineront ce marché sont celles qui feront de la conformité réglementaire leur principal avantage concurrentiel.'}
            </p>

            <div className="bg-gradient-to-r from-accent-50 to-amber-50 rounded-xl p-5 border border-accent-200 mt-6">
              <p className="text-gray-900 font-bold text-base md:text-lg">
                {isEn
                  ? 'Notre conviction : « Pas de rapport théorique. Des diagnostics rigoureux. Des livrables exécutoires. Des résultats mesurables. »'
                  : 'Notre conviction : « Pas de rapport théorique. Des diagnostics rigoureux. Des livrables exécutoires. Des résultats mesurables. »'}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {isEn
                  ? '— KHEPRA EXPERTS, Advisory & Regulatory Engineering for Francophone Africa\'s Digital Economy'
                  : '— KHEPRA EXPERTS, Conseil & Ingénierie Réglementaire pour l\'Économie Numérique d\'Afrique Francophone'}
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
          q: 'What are the regulatory challenges for a RegTech operating in UEMOA and CEMAC zones?',
          a: 'A RegTech operating in UEMOA/CEMAC faces multiple overlapping regulatory frameworks: BCEAO and COBAC banking supervision, GIABA/GABAC AML/CFT directives, national data protection laws (APDP, CDP, CNIL), FATF 40 recommendations, and cybersecurity requirements. The key challenge is the fragmentation of legal frameworks across 8+ jurisdictions while maintaining a unified compliance architecture.',
        },
        {
          q: 'How does KHEPRA EXPERTS approach regulatory structuring for fintech and regtech companies in Africa?',
          a: 'KHEPRA EXPERTS deploys an integrated 4-phase methodology: (1) Technical Discovery & Model Qualification — mapping APIs, data flows, AI components; (2) Multi-jurisdictional Regulatory Audit — gap analysis against FATF, GIABA/GABAC, national laws; (3) Legal Engineering & Data Privacy — DPA, Cloud Compliance, OHADA structuring; (4) Commercial Framework — SaaS T&Cs, BCEAO/COBAC outsourcing contracts, Vendor Due Diligence. Each phase produces tangible, operational deliverables.',
        },
        {
          q: 'Why is a Regulatory Data Room essential for RegTech companies seeking institutional clients?',
          a: 'A Regulatory Data Room transforms compliance from a cost center into a competitive advantage. For RegTech companies targeting banks and financial institutions, it provides a pre-packaged, auditable compliance dossier that accelerates vendor due diligence, demonstrates regulatory maturity to supervisors (BCEAO/COBAC), and significantly shortens the sales cycle with institutional clients. It is also a prerequisite for institutional fundraising rounds.',
        },
        {
          q: 'What is the risk of requalification for a RegTech SaaS provider by banking supervisors?',
          a: 'Banking supervisors (BCEAO, COBAC) have the discretionary authority to classify a RegTech provider as a "critical outsourced provider" if its services are deemed essential to a supervised institution\'s operations. This requalification triggers substantially heavier obligations: full auditability by the supervisor, mandatory business continuity and reversibility clauses, enhanced cybersecurity certifications (ISO 27001, SOC 2), and potential direct regulatory oversight. KHEPRA EXPERTS helps RegTech companies preemptively structure their contractual and operational frameworks to minimize this risk.',
        },
      ]
    : [
        {
          q: 'Quels sont les défis réglementaires d\'une RegTech opérant en zone UEMOA et CEMAC ?',
          a: 'Une RegTech opérant en zone UEMOA/CEMAC fait face à une superposition de cadres réglementaires : supervision bancaire BCEAO et COBAC, directives AML/CFT du GIABA/GABAC, lois nationales de protection des données (APDP, CDP, CNIL), 40 recommandations du GAFI, et exigences de cybersécurité. Le défi majeur est la fragmentation des cadres juridiques sur 8+ juridictions tout en maintenant une architecture de conformité unifiée.',
        },
        {
          q: 'Comment KHEPRA EXPERTS aborde-t-il la structuration réglementaire des fintechs et regtechs en Afrique ?',
          a: 'KHEPRA EXPERTS déploie une méthodologie intégrée en 4 phases : (1) Discovery Technique et Qualification du Modèle — cartographie des APIs, flux de données, composants IA ; (2) Audit Réglementaire Multi-juridictionnel — analyse des écarts vs GAFI, GIABA/GABAC, lois nationales ; (3) Ingénierie Juridique et Data Privacy — DPA, Cloud Compliance, structuration OHADA ; (4) Dispositif Commercial — CGS SaaS, contrats d\'externalisation BCEAO/COBAC, Vendor Due Diligence. Chaque phase produit des livrables tangibles et opérationnels.',
        },
        {
          q: 'Pourquoi une Regulatory Data Room est-elle essentielle pour une RegTech cherchant des clients institutionnels ?',
          a: 'Une Regulatory Data Room transforme la conformité d\'un centre de coûts en avantage concurrentiel. Pour les RegTech ciblant les banques et institutions financières, elle fournit un dossier de conformité pré-structuré et auditable qui accélère les due diligences fournisseurs, démontre la maturité réglementaire aux superviseurs (BCEAO/COBAC), et raccourcit significativement le cycle de vente avec les clients institutionnels. C\'est également un prérequis pour les levées de fonds institutionnelles.',
        },
        {
          q: 'Quel est le risque de requalification d\'un fournisseur SaaS RegTech par les superviseurs bancaires ?',
          a: 'Les superviseurs bancaires (BCEAO, COBAC) disposent du pouvoir discrétionnaire de qualifier un fournisseur RegTech de « prestataire critique externalisé » si ses services sont jugés essentiels aux opérations d\'une institution supervisée. Cette requalification déclenche des obligations substantiellement plus lourdes : auditabilité totale par le superviseur, clauses obligatoires de continuité et de réversibilité, certifications renforcées de cybersécurité (ISO 27001, SOC 2), et potentiellement une supervision réglementaire directe. KHEPRA EXPERTS aide les RegTech à structurer préventivement leurs cadres contractuels et opérationnels pour minimiser ce risque.',
        },
      ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Frequently Asked Questions' : 'Questions Fréquentes'}
          </h2>
          <div className="w-20 h-1 bg-accent-500 rounded-full"></div>
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
          REG
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 mb-6">
          <i className="ri-chat-quote-line text-accent-400 text-sm"></i>
          <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">
            {isEn ? 'Similar Regulatory Challenge?' : 'Défi réglementaire similaire ?'}
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
          {isEn
            ? 'Secure your RegTech\'s compliance architecture across UEMOA and CEMAC'
            : 'Sécurisez l\'architecture de conformité de votre RegTech en zone UEMOA et CEMAC'}
        </h2>

        <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {isEn
            ? 'KHEPRA EXPERTS combines regulatory intelligence, legal engineering, and technical understanding to build compliance architectures that become competitive advantages. A free 30-minute strategic diagnostic to assess your regulatory exposure.'
            : 'KHEPRA EXPERTS combine intelligence réglementaire, ingénierie juridique et compréhension technique pour bâtir des architectures de conformité qui deviennent des avantages concurrentiels. Un diagnostic stratégique gratuit de 30 minutes pour évaluer votre exposition réglementaire.'}
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => {
              if (window.REACT_APP_NAVIGATE) window.REACT_APP_NAVIGATE('/diagnostic-flash');
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-lg hover:from-accent-600 hover:to-accent-700 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 text-base"
          >
            <i className="ri-calendar-check-line text-lg"></i>
            {isEn ? 'Book a free diagnostic' : 'Réserver un diagnostic gratuit'}
          </button>
          <BrochureDownloadButton
            variant="secondary"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold whitespace-nowrap cursor-pointer text-base"
            trackingLocation="regtech_case_study_cta"
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