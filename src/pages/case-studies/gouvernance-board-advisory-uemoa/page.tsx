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
const PAGE_PATH = '/case-studies/gouvernance-board-advisory-uemoa';

const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=modern%20corporate%20boardroom%20governance%20meeting%20in%20West%20African%20financial%20institution%2C%20senior%20african%20executives%20and%20independent%20board%20directors%20reviewing%20strategic%20compliance%20documents%20around%20elegant%20conference%20table%2C%20professional%20atmosphere%20with%20warm%20amber%20and%20dark%20green%20accents%2C%20panoramic%20windows%20overlooking%20Lome%20Togo%20skyline%2C%20regulatory%20frameworks%20and%20ESG%20dashboards%20displayed%20on%20digital%20screens%2C%20sophisticated%20financial%20leadership%20setting%20with%20subtle%20gold%20lighting%20and%20institutional%20gravitas%2C%20high-end%20editorial%20photography&width=1600&height=800&seq=cs-govboard-hero-v1&orientation=landscape';

const buildStructuredData = (isEn: boolean) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}${PAGE_PATH}#article`,
      headline: isEn
        ? 'Case Study: Multi-Country Regulatory Alignment & Board Governance Optimization of a Financial Institution in Francophone Africa'
        : 'Étude de cas : Alignement réglementaire multi-pays et optimisation de la gouvernance d\'une infrastructure financière en Afrique Francophone',
      description: isEn
        ? 'How KHEPRA EXPERTS delivered a dual mission: independent Board evaluation for a regional financial institution (Art. 17 Circular n°01-2017/CB/C) and regulatory structuring for a pan-African RegTech across 8 UEMOA/CEMAC countries. Corporate governance scoring, BCEAO compliance, multi-jurisdictional data protection, and Regulatory Data Room.'
        : 'Comment KHEPRA EXPERTS a réalisé une double mission : évaluation indépendante du Conseil d\'Administration d\'une institution financière régionale (Art. 17 circulaire n°01-2017/CB/C) et structuration réglementaire d\'une RegTech panafricaine sur 8 pays UEMOA/CEMAC. Scoring de gouvernance, conformité BCEAO, protection des données multi-juridictionnelle et Regulatory Data Room.',
      image: HERO_IMAGE,
      author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
      publisher: { '@id': `${SITE_URL}/#organization` },
      datePublished: '2026-06-04',
      dateModified: '2026-06-04',
      inLanguage: isEn ? 'en-US' : 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      about: [
        { '@type': 'Thing', name: 'Gouvernance d\'entreprise' },
        { '@type': 'Thing', name: 'Évaluation du Conseil d\'Administration' },
        { '@type': 'Thing', name: 'RegTech' },
        { '@type': 'Thing', name: 'Conformité AML/CFT' },
        { '@type': 'Thing', name: 'Protection des données personnelles' },
        { '@type': 'Thing', name: 'Souveraineté numérique' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${PAGE_PATH}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Case Studies' : 'Études de cas', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: isEn ? 'Governance & Board Advisory UEMOA' : 'Gouvernance & Board Advisory UEMOA' },
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

export default function GovernanceBoardCaseStudyPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const contactRef = useRef<HTMLDivElement>(null);

  const ogTitle = isEn
    ? 'Case Study: Board Governance Optimization & Regulatory Alignment — UEMOA | KHEPRA EXPERTS'
    : 'Étude de cas : Optimisation Gouvernance Conseil & Alignement Réglementaire — UEMOA | KHEPRA EXPERTS';

  const ogDescription = isEn
    ? 'How KHEPRA EXPERTS delivered independent Board evaluation (Art. 17 Circular n°01-2017/CB/C) and RegTech regulatory structuring across 8 UEMOA/CEMAC countries. Corporate governance scoring, BCEAO compliance, multi-jurisdictional data protection, digital sovereignty.'
    : 'Comment KHEPRA EXPERTS a réalisé l\'évaluation indépendante d\'un Conseil d\'Administration (Art. 17 circulaire n°01-2017/CB/C) et la structuration réglementaire d\'une RegTech sur 8 pays UEMOA/CEMAC. Scoring de gouvernance, conformité BCEAO, protection des données multi-juridictionnelle, souveraineté numérique.';

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={ogTitle}
        description={ogDescription}
        keywords={isEn
          ? 'board governance case study Africa, board evaluation UMOA BCEAO, corporate governance OHADA, Art 17 circular 01-2017, RegTech regulatory structuring UEMOA CEMAC, data protection Francophone Africa, financial institution governance scoring, KHEPRA EXPERTS board advisory, independent director evaluation, digital sovereignty Africa'
          : 'étude de cas gouvernance conseil Afrique, évaluation conseil administration UMOA BCEAO, gouvernance entreprise OHADA, art 17 circulaire 01-2017, structuration réglementaire RegTech UEMOA CEMAC, protection données Afrique francophone, scoring gouvernance institution financière, KHEPRA EXPERTS board advisory, évaluation indépendante administrateurs, souveraineté numérique Afrique'}
        canonicalPath={PAGE_PATH}
        ogType="article"
        ogImage={OG_IMAGES.CASE_STUDIES}
        ogImageAlt={isEn
          ? 'Governance & Board Advisory Case Study — UEMOA — KHEPRA EXPERTS'
          : 'Étude de cas Gouvernance & Board Advisory — UEMOA — KHEPRA EXPERTS'}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        twitterLabel1={isEn ? 'Coverage' : 'Couverture'}
        twitterData1="8 pays UEMOA/CEMAC"
        twitterLabel2={isEn ? 'Dual mandate' : 'Double mission'}
        twitterData2="Board Advisory + RegTech"
        structuredData={buildStructuredData(isEn)}
        hreflangLinks={STATIC_HREFLANG_MAP[PAGE_PATH + '/']}
        articleSection={isEn ? 'Case Studies' : 'Études de cas'}
        articleTags={isEn ? ['Board Governance', 'Board Evaluation', 'Art 17 Circular 01-2017', 'RegTech', 'AML/CFT', 'Data Protection', 'BCEAO', 'UEMOA', 'Corporate Governance', 'Regulatory Alignment'] : ['Gouvernance Conseil', 'Évaluation Conseil Administration', 'Art 17 circulaire 01-2017', 'RegTech', 'AML/CFT', 'Protection des données', 'BCEAO', 'UEMOA', 'Gouvernance entreprise', 'Alignement réglementaire']}
        articlePublishedTime="2026-06-04"
        articleModifiedTime="2026-06-04"
        articleAuthor="KHEPRA EXPERTS"
      />
      <SchemaFAQPage
        faqs={
          isEn
            ? [
                {
                  question: 'What does Article 17 of Circular n°01-2017/CB/C require for financial institutions in the UMOA zone?',
                  answer: 'Article 17 of Circular n°01-2017/CB/C requires financial institutions regulated by the UMOA Banking Commission to conduct a periodic independent, objective, and rigorous evaluation of the collective and individual performance of their Board of Directors and specialized committees (Audit, Risk, Remuneration). This evaluation must assess governance structure, board composition, meeting effectiveness, strategic oversight quality, and committee functionality.',
                },
                {
                  question: 'How does KHEPRA EXPERTS approach Board of Directors evaluation for financial institutions in Francophone Africa?',
                  answer: 'KHEPRA EXPERTS deploys a rigorous 3-phase methodology: (1) Diagnostic — governance documentation review, board composition analysis, committee functioning assessment; (2) Confidential Interviews — individual sessions with each board member and key executives; (3) Scoring & Action Plan — deployment of a proprietary Board scoring tool covering 25+ criteria, production of individual confidential reports, and formulation of a prioritized operational action plan with measurable milestones.',
                },
                {
                  question: 'What are the key governance challenges for financial institutions operating across UEMOA and CEMAC zones?',
                  answer: 'Key challenges include: regulatory fragmentation (BCEAO vs COBAC requirements), board independence in limited talent markets, cross-border oversight across different legal frameworks (OHADA, national laws), digital governance competence for RegTech and cybersecurity risks, and ESG integration in lending and investment decisions.',
                },
              ]
            : [
                {
                  question: 'Qu\'exige l\'article 17 de la circulaire n°01-2017/CB/C pour les institutions financières de la zone UMOA ?',
                  answer: 'L\'article 17 de la circulaire n°01-2017/CB/C impose aux institutions financières régulées par la Commission Bancaire de l\'UMOA de procéder à une évaluation périodique, indépendante, objective et rigoureuse de la performance collective et individuelle de leur Conseil d\'Administration et de leurs comités spécialisés (Audit, Risques, Rémunérations). Cette évaluation doit porter sur la structure de gouvernance, la composition du conseil, l\'efficacité des réunions, la qualité de la supervision stratégique et le fonctionnement des comités.',
                },
                {
                  question: 'Comment KHEPRA EXPERTS aborde-t-il l\'évaluation des Conseils d\'Administration pour les institutions financières en Afrique francophone ?',
                  answer: 'KHEPRA EXPERTS déploie une méthodologie rigoureuse en 3 phases : (1) Diagnostic — revue documentaire de la gouvernance, analyse de la composition du conseil, évaluation du fonctionnement des comités ; (2) Entretiens Confidentiels — sessions individuelles avec chaque administrateur et dirigeant clé ; (3) Scoring & Plan d\'Actions — déploiement d\'un outil propriétaire de notation du Conseil couvrant 25+ critères, production de rapports individuels confidentiels, et formulation d\'un plan d\'actions opérationnel hiérarchisé avec jalons mesurables.',
                },
                {
                  question: 'Quels sont les principaux défis de gouvernance pour les institutions financières opérant en zone UEMOA et CEMAC ?',
                  answer: 'Les défis clés incluent : la fragmentation réglementaire (exigences BCEAO vs COBAC), l\'indépendance du Conseil dans des marchés aux talents limités, la supervision transfrontalière à travers différents cadres juridiques (OHADA, lois nationales), la compétence en gouvernance numérique pour les risques RegTech et cybersécurité, et l\'intégration ESG dans les décisions de prêt et d\'investissement.',
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
              { label: isEn ? 'Governance & Board UEMOA' : 'Gouvernance & Board UEMOA' },
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
        <ConclusionSection isEn={isEn} />
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
          alt={isEn ? 'Board governance and regulatory alignment — UEMOA — KHEPRA EXPERTS case study' : 'Gouvernance du Conseil et alignement réglementaire — UEMOA — Étude de cas KHEPRA EXPERTS'}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/25 border border-amber-400/45 text-amber-300">
              <i className="ri-vip-crown-line"></i>
              {isEn ? 'Dual Mandate — Board Advisory + RegTech' : 'Double Mission — Board Advisory + RegTech'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-calendar-line"></i>
              2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-time-line"></i>
              {isEn ? '20 weeks' : '20 semaines'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-government-line"></i>
              {isEn ? 'Art. 17 Circulaire n°01-2017/CB/C' : 'Art. 17 Circulaire n°01-2017/CB/C'}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {isEn
              ? 'Multi-Country Regulatory Alignment & Board Governance Optimization of a Financial Infrastructure in Francophone Africa'
              : 'Alignement réglementaire multi-pays et optimisation de la gouvernance d\'une infrastructure financière en Afrique Francophone'}
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed">
            {isEn
              ? 'How KHEPRA EXPERTS deployed a dual high-stakes mandate: an independent, objective, and rigorous Board of Directors evaluation for a regional financial institution under the UMOA Banking Commission (Art. 17), combined with complete regulatory structuring of a pan-African RegTech infrastructure operating at the intersection of banking supervision, AML/CFT compliance, and data protection across 8 UEMOA and CEMAC countries.'
              : 'Comment KHEPRA EXPERTS a déployé un double mandat à fort enjeu : l\'évaluation indépendante, objective et rigoureuse du Conseil d\'Administration d\'une institution financière régionale sous supervision de la Commission Bancaire de l\'UMOA (Art. 17), combinée à la structuration réglementaire complète d\'une infrastructure RegTech panafricaine opérant à l\'intersection de la supervision bancaire, de la conformité AML/CFT et de la protection des données sur 8 pays UEMOA et CEMAC.'}
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
              { value: 'Art. 17', label: isEn ? 'Circular n°01-2017/CB/C Board evaluation' : 'Évaluation Conseil Art. 17 circulaire n°01-2017', icon: 'ri-file-text-line' },
              { value: '25+', label: isEn ? 'Board scoring criteria deployed' : 'Critères de scoring Board déployés', icon: 'ri-bar-chart-grouped-line' },
              { value: '8 pays', label: isEn ? 'UEMOA/CEMAC regulatory coverage' : 'Couverture réglementaire UEMOA/CEMAC', icon: 'ri-global-line' },
              { value: 'Dual', label: isEn ? 'Mandate: Board + RegTech' : 'Mandat : Board + RegTech', icon: 'ri-stack-line' },
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
              ? 'Two major institutions of the African financial ecosystem — a regional guarantee institution regulated by the UMOA Banking Commission and a pan-African Compliance-as-a-Service infrastructure — faced distinct but interconnected regulatory imperatives. The first needed to comply with Article 17 of Circular n°01-2017/CB/C requiring an independent, objective evaluation of its Board of Directors and specialized committees. The second needed to secure its RegTech business model at the intersection of financial regulation (BCEAO/COBAC) and personal data protection (APDP locales) across 8 jurisdictions with fragmented legal frameworks.'
              : 'Deux institutions majeures de l\'écosystème financier africain — un établissement régional de cautionnement régulé par la Commission Bancaire de l\'UMOA et une infrastructure panafricaine de Compliance-as-a-Service — faisaient face à des impératifs réglementaires distincts mais interconnectés. La première devait satisfaire l\'article 17 de la circulaire n°01-2017/CB/C exigeant une évaluation indépendante et objective de son Conseil d\'Administration et de ses comités spécialisés. La seconde devait sécuriser son modèle d\'affaires RegTech à l\'intersection de la régulation financière (BCEAO/COBAC) et de la protection des données personnelles (APDP locales) sur 8 juridictions aux cadres juridiques fragmentés.'}
          </p>

          <p className="text-gray-700 leading-relaxed mt-4">
            <strong className="text-gray-900">
              {isEn ? 'KHEPRA EXPERTS deployed an integrated dual-mandate methodology' : 'KHEPRA EXPERTS a déployé une méthodologie intégrée en double mandat'}
            </strong>
            {isEn
              ? ' — combining independent Board evaluation (diagnostic, confidential interviews, scoring, action plan) with complete RegTech regulatory engineering (Technical Discovery, Multi-jurisdictional Regulatory Audit, Legal Engineering & Data Privacy, and Commercial Framework). The result: a Board realigned on international best practices with an operational scoring tool, and a RegTech business model fully immunized against critical requalification risks, supported by a comprehensive Regulatory Data Room and BCEAO/COBAC-compliant contractual architecture.'
              : ' — combinant évaluation indépendante du Conseil (diagnostic, entretiens confidentiels, scoring, plan d\'actions) et ingénierie réglementaire RegTech complète (Discovery Technique, Audit Réglementaire Multi-juridictionnel, Ingénierie Juridique & Data Privacy, et Dispositif Commercial). Le résultat : un Conseil réaligné sur les meilleurs standards internationaux avec un outil de scoring opérationnel, et un modèle d\'affaires RegTech totalement immunisé contre les risques de requalification critique, adossé à une Regulatory Data Room complète et une architecture contractuelle conforme BCEAO/COBAC.'}
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
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-search-eye-line"></i>
            {isEn ? 'PART I' : 'PARTIE I'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Context and Strategic Challenges' : 'Le Contexte et les Défis Stratégiques'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Volet A: Gouvernance */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="ri-government-line text-amber-600"></i>
              {isEn ? 'A. Governance — The Imperative of Independent Board Evaluation' : 'A. Gouvernance — L\'impératif de l\'évaluation indépendante du Conseil'}
            </h3>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEn
                  ? 'Article 17 of Circular n°01-2017/CB/C of the UMOA Banking Commission imposes a clear, non-negotiable obligation on regulated financial institutions: conduct a periodic, independent, objective, and rigorous evaluation of the collective and individual performance of the Board of Directors — including each specialized committee (Audit, Risk, Remuneration, and where applicable, Governance/Ethics). This evaluation must assess the Board\'s structure, composition, functioning, strategic oversight quality, risk management supervision, and the individual contribution of each director.'
                  : 'L\'article 17 de la circulaire n°01-2017/CB/C de la Commission Bancaire de l\'UMOA impose une obligation claire et non négociable aux institutions financières assujetties : procéder à une évaluation périodique, indépendante, objective et rigoureuse de la performance collective et individuelle du Conseil d\'Administration — y compris chaque comité spécialisé (Audit, Risques, Rémunérations, et le cas échéant, Gouvernance/Éthique). Cette évaluation doit porter sur la structure, la composition, le fonctionnement du Conseil, la qualité de la supervision stratégique, la supervision de la gestion des risques et la contribution individuelle de chaque administrateur.'}
              </p>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-amber-800">
                    {isEn ? 'Regulatory requirement — Art. 17, Circular n°01-2017/CB/C:' : 'Exigence réglementaire — Art. 17, circulaire n°01-2017/CB/C :'}
                  </strong>
                  {isEn
                    ? ' "The Board of Directors shall periodically conduct an independent, objective, and rigorous evaluation of its collective and individual performance, as well as that of its specialized committees. This evaluation shall be documented and reported to the General Assembly." The evaluation must cover governance structure, board and committee composition, meeting effectiveness, strategic oversight, risk management, and individual director contribution.'
                    : ' « Le Conseil d\'Administration procède périodiquement à une évaluation indépendante, objective et rigoureuse de sa performance collective et individuelle, ainsi que de celle de ses comités spécialisés. Cette évaluation fait l\'objet d\'une documentation et d\'un rapport à l\'Assemblée Générale. » L\'évaluation doit couvrir la structure de gouvernance, la composition du conseil et des comités, l\'efficacité des réunions, la supervision stratégique, la gestion des risques et la contribution individuelle des administrateurs.'}
                </p>
              </div>
            </div>
          </div>

          {/* Volet B: RegTech */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="ri-shield-keyhole-line text-amber-600"></i>
              {isEn ? 'B. RegTech — High-Intensity Compliance at the Intersection of Finance and Data' : 'B. RegTech — Conformité de haute intensité à l\'intersection de la finance et des données'}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {isEn
                ? 'The RegTech client — a pan-African digital trust infrastructure — provides identity verification, KYC/KYB, UBO traceability, PEP screening, and sanctions compliance solutions to financial institutions across Francophone Africa. Its Compliance-as-a-Service model exposes it to an exceptionally complex regulatory matrix spanning banking supervision, AML/CFT compliance, personal data protection, cybersecurity, and digital sovereignty — across 8 UEMOA and CEMAC jurisdictions, each with fragmented legal frameworks.'
                : 'Le client RegTech — une infrastructure panafricaine de confiance numérique — fournit des solutions de vérification d\'identité, KYC/KYB, traçabilité des bénéficiaires effectifs (UBO), screening des personnes politiquement exposées (PPE) et conformité aux sanctions aux institutions financières d\'Afrique francophone. Son modèle de Compliance-as-a-Service l\'expose à une matrice réglementaire d\'une complexité exceptionnelle couvrant la supervision bancaire, la conformité AML/CFT, la protection des données personnelles, la cybersécurité et la souveraineté numérique — sur 8 juridictions UEMOA et CEMAC aux cadres juridiques fragmentés.'}
            </p>
          </div>

          {/* 4 dimensions grid */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="ri-error-warning-line text-amber-600"></i>
              {isEn ? 'Four Critical Dimensions of the Dual Mandate' : 'Quatre dimensions critiques du double mandat'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <i className="ri-account-pin-box-line text-amber-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">
                      {isEn ? '1. Board Composition & Independence' : '1. Composition & Indépendance du Conseil'}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isEn
                        ? 'The institution needed to demonstrate a critical mass of independent directors with sector-specific expertise (financial guarantee mechanisms, risk management, and regional regulatory frameworks). The evaluation assessed the balance between executive, non-executive, and independent directors, and verified that specialized committees met regulatory composition requirements — a particularly challenging exercise in markets with limited pools of qualified independent directors familiar with both OHADA corporate law and BCEAO prudential standards.'
                        : 'L\'institution devait démontrer une masse critique d\'administrateurs indépendants disposant d\'une expertise sectorielle spécifique (mécanismes de garantie financière, gestion des risques, cadres réglementaires régionaux). L\'évaluation a porté sur l\'équilibre entre administrateurs exécutifs, non exécutifs et indépendants, et vérifié que les comités spécialisés respectaient les exigences réglementaires de composition — exercice particulièrement exigeant dans des marchés aux viviers limités d\'administrateurs indépendants qualifiés maîtrisant à la fois le droit OHADA et les normes prudentielles BCEAO.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                    <i className="ri-bank-line text-red-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">
                      {isEn ? '2. KYC/KYB/AML/CFT Regulatory Exposure' : '2. Exposition réglementaire KYC/KYB/AML/CFT'}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isEn
                        ? 'The RegTech processes identity and compliance data on behalf of regulated financial institutions, placing it directly under regional AML/CFT directives (GIABA, GABAC). Sanctions screening (OFAC, UN, EU), PEP identification, and UBO traceability are regulatory obligations whose outsourcing to a technical provider must be rigorously framed — both contractually and regulatorily. The integration of AI algorithms for biometric analysis adds an additional layer of governance complexity.'
                        : 'La RegTech traite des données d\'identité et de conformité pour le compte d\'institutions financières assujetties, la plaçant directement sous les directives AML/CFT régionales (GIABA, GABAC). Le screening des sanctions (OFAC, ONU, UE), l\'identification des PPE et la traçabilité des UBO sont des obligations réglementaires dont l\'externalisation vers un prestataire technique doit être rigoureusement encadrée — contractuellement et réglementairement. L\'intégration d\'algorithmes d\'IA pour l\'analyse biométrique ajoute une couche supplémentaire de complexité de gouvernance.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <i className="ri-fingerprint-line text-green-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">
                      {isEn ? '3. Biometric Data & Digital Sovereignty' : '3. Données biométriques & Souveraineté numérique'}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isEn
                        ? 'The RegTech collects, processes, and potentially stores biometric data classified as sensitive/special category in virtually all Francophone African jurisdictions. This data is subject to enhanced protection regimes, with explicit local hosting mandates in certain countries (e.g., Benin Law No. 2019-22, Art. 45) and prior authorization or enhanced declaration requirements across the board. Cross-border data flows — both intra-African and to third countries — face growing restrictions under emerging digital sovereignty policies across West and Central Africa.'
                        : 'La RegTech collecte, traite et potentiellement conserve des données biométriques classées comme sensibles/catégorie spéciale dans la quasi-totalité des juridictions d\'Afrique francophone. Ces données sont soumises à des régimes de protection renforcée, avec des obligations explicites d\'hébergement local dans certains pays (ex : Bénin, Loi n°2019-22, art. 45) et des exigences d\'autorisation préalable ou de déclaration renforcée partout. Les flux transfrontaliers de données — intra-africains comme vers les pays tiers — sont soumis à des restrictions croissantes dans le cadre des politiques émergentes de souveraineté numérique.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                    <i className="ri-scales-3-line text-indigo-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">
                      {isEn ? '4. Critical Requalification Risk' : '4. Risque de requalification critique'}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isEn
                        ? 'The most significant threat for the RegTech: that banking supervisors (BCEAO, COBAC) could requalify it as a "critical outsourced provider" under their outsourcing frameworks — triggering substantially heavier obligations including full supervisor auditability, mandatory continuity and reversibility clauses, enhanced cybersecurity certifications, and potential direct regulatory oversight. Five legal qualification hypotheses were tested, from SaaS provider to critical outsourced provider, with asymmetric risk across jurisdictions.'
                        : 'La menace la plus significative pour la RegTech : que les superviseurs bancaires (BCEAO, COBAC) la requalifient en « prestataire critique externalisé » dans le cadre de leurs dispositifs d\'externalisation — déclenchant des obligations substantiellement plus lourdes incluant l\'auditabilité totale par le superviseur, des clauses obligatoires de continuité et de réversibilité, des certifications renforcées de cybersécurité, et potentiellement une supervision réglementaire directe. Cinq hypothèses de qualification juridique ont été testées, du fournisseur SaaS au prestataire critique externalisé, avec un risque asymétrique selon les juridictions.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regulatory authorities table */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-building-2-line text-amber-600"></i>
              {isEn ? 'Key Regulatory Authorities & Standards' : 'Principales autorités et normes réglementaires'}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left p-3 md:p-4 font-semibold">{isEn ? 'Entity' : 'Entité'}</th>
                    <th className="text-left p-3 md:p-4 font-semibold hidden md:table-cell">{isEn ? 'Scope / Role' : 'Périmètre / Rôle'}</th>
                    <th className="text-center p-3 md:p-4 font-semibold">{isEn ? 'Mandate' : 'Volet'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { entity: isEn ? 'UMOA Banking Commission' : 'Commission Bancaire UMOA', role: isEn ? 'Art. 17 Circular n°01-2017/CB/C — Independent Board evaluation, committee review, governance scoring' : 'Art. 17 circulaire n°01-2017/CB/C — Évaluation indépendante du Conseil, revue des comités, scoring de gouvernance', mandate: isEn ? 'Governance' : 'Gouvernance' },
                    { entity: 'BCEAO', role: isEn ? 'Prudential supervision, risk management outsourcing directives, AML/CFT regional standards, SFD oversight' : 'Supervision prudentielle, directives externalisation risques, normes AML/CFT régionales, supervision SFD', mandate: isEn ? 'Both' : 'Les deux' },
                    { entity: 'COBAC', role: isEn ? 'CEMAC banking supervision, licensing, digital services compliance, outsourcing frameworks' : 'Supervision bancaire CEMAC, agréments, conformité services numériques, cadres d\'externalisation', mandate: isEn ? 'RegTech' : 'RegTech' },
                    { entity: 'GIABA / GABAC', role: isEn ? 'FATF-style regional bodies — AML/CFT system evaluation, 40 FATF recommendations' : 'Organes régionaux type GAFI — Évaluation systèmes AML/CFT, 40 recommandations GAFI', mandate: isEn ? 'RegTech' : 'RegTech' },
                    { entity: 'GAFI', role: isEn ? '40 Recommendations on AML/CFT, international standards, mutual evaluations' : '40 Recommandations LCB/FT, standards internationaux, évaluations mutuelles', mandate: isEn ? 'RegTech' : 'RegTech' },
                    { entity: isEn ? 'National DPAs (APDP, CDP, CNIL)' : 'APDP / CDP / CNIL', role: isEn ? 'Data protection registration, declaration, authorization, inspections — Togo, Benin, Senegal, Côte d\'Ivoire, etc.' : 'Enregistrement, déclaration, autorisation des traitements, inspections — Togo, Bénin, Sénégal, Côte d\'Ivoire, etc.', mandate: isEn ? 'RegTech' : 'RegTech' },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 md:p-4 font-semibold text-gray-900">{row.entity}</td>
                      <td className="p-3 md:p-4 text-gray-600 hidden md:table-cell">{row.role}</td>
                      <td className="p-3 md:p-4 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${row.mandate === (isEn ? 'Both' : 'Les deux') ? 'bg-amber-100 text-amber-700' : row.mandate === (isEn ? 'Governance' : 'Gouvernance') ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'}`}>
                          {row.mandate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk alert */}
          <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-xl p-6 border border-red-100">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="ri-alert-fill text-red-600"></i>
              {isEn ? 'Critical Regulatory Intersection: Governance × RegTech' : 'Intersection réglementaire critique : Gouvernance × RegTech'}
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {isEn
                ? 'This dual mandate reveals a fundamental structural challenge in the African financial ecosystem: the Board of Directors of regulated financial institutions — the very body being evaluated — is simultaneously the ultimate governance authority deciding whether to outsource critical compliance functions (KYC/KYB/AML) to RegTech providers. An effectively governed Board must possess the technical literacy to evaluate RegTech solutions and the regulatory sophistication to structure outsourcing arrangements compliant with BCEAO/COBAC requirements. Our dual intervention addressed both sides of this governance equation.'
                : 'Ce double mandat révèle un défi structurel fondamental de l\'écosystème financier africain : le Conseil d\'Administration des institutions financières régulées — l\'organe même faisant l\'objet de l\'évaluation — est simultanément l\'autorité de gouvernance ultime décidant d\'externaliser des fonctions critiques de conformité (KYC/KYB/AML) à des prestataires RegTech. Un Conseil efficacement gouverné doit posséder la littératie technique pour évaluer les solutions RegTech et la sophistication réglementaire pour structurer des arrangements d\'externalisation conformes aux exigences BCEAO/COBAC. Notre double intervention a traité les deux versants de cette équation de gouvernance.'}
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
              ? 'We deployed an integrated dual-mandate methodology organized in five interconnected phases — three dedicated to Governance (Board evaluation) and two to RegTech compliance — each producing tangible, executable deliverables.'
              : 'Nous avons déployé une méthodologie intégrée en double mandat, organisée en cinq phases interconnectées — trois dédiées à la Gouvernance (évaluation du Conseil) et deux à la conformité RegTech — chacune produisant des livrables tangibles et exécutoires.'}
          </p>
          <div className="w-20 h-1 bg-amber-500 rounded-full mt-4"></div>
        </div>

        {/* Tabs-style phases */}
        <div className="space-y-6">
          {/* Phase 1: Governance Diagnostic */}
          <div className="bg-indigo-50 rounded-2xl border border-indigo-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <span className="text-xl font-extrabold">1</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{isEn ? 'Governance Track' : 'Volet Gouvernance'}</span>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2 mt-1">
                      <i className="ri-file-search-line text-gray-700"></i>
                      {isEn ? 'Board Diagnostic & Governance Documentation Review' : 'Diagnostic du Conseil & Revue documentaire de gouvernance'}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-300 text-gray-700 whitespace-nowrap">
                    <i className="ri-time-line"></i>
                    {isEn ? '3 weeks' : '3 semaines'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">{isEn ? 'Activities' : 'Activités'}</h4>
                    <ul className="space-y-1.5">
                      {[
                        isEn ? 'Complete review of governance documentation: statutes, internal regulations, Board and committee charters, meeting minutes (24 months), attendance records' : 'Revue complète de la documentation de gouvernance : statuts, règlement intérieur, chartes du Conseil et des comités, PV de réunions (24 mois), relevés de présence',
                        isEn ? 'Board composition analysis: size, diversity, independence ratio, expertise matrix, tenure distribution, succession planning' : 'Analyse de la composition du Conseil : taille, diversité, ratio d\'indépendance, matrice d\'expertise, distribution d\'ancienneté, planification de la succession',
                        isEn ? 'Specialized committee assessment: Audit, Risk, Remuneration — mandates, composition, meeting frequency, decision quality' : 'Évaluation des comités spécialisés : Audit, Risques, Rémunérations — mandats, composition, fréquence des réunions, qualité des décisions',
                        isEn ? 'Strategic oversight analysis: review of strategic decisions (24 months), Board-management interface, information flow quality' : 'Analyse de la supervision stratégique : revue des décisions stratégiques (24 mois), interface Conseil-Direction, qualité du flux d\'information',
                        isEn ? 'Benchmarking against international governance standards: OECD, Basel Committee, IFC Corporate Governance Methodology' : 'Benchmarking par rapport aux standards internationaux de gouvernance : OCDE, Comité de Bâle, Méthodologie IFC de gouvernance d\'entreprise',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <i className="ri-checkbox-circle-fill text-indigo-500 mt-0.5 shrink-0"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">{isEn ? 'Deliverables' : 'Livrables'}</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {isEn
                          ? 'Governance Diagnostic Report (60+ pages) — comprehensive gap analysis against regulatory requirements and international best practices. Board composition matrix. Committee functionality assessment. Strategic oversight quality evaluation. Information flow mapping. Prioritized governance improvement opportunities.'
                          : 'Rapport de Diagnostic Gouvernance (60+ pages) — analyse complète des écarts par rapport aux exigences réglementaires et meilleures pratiques internationales. Matrice de composition du Conseil. Évaluation du fonctionnement des comités. Évaluation de la qualité de la supervision stratégique. Cartographie des flux d\'information. Opportunités d\'amélioration de la gouvernance hiérarchisées.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2: Confidential Interviews */}
          <div className="bg-indigo-50 rounded-2xl border border-indigo-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <span className="text-xl font-extrabold">2</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{isEn ? 'Governance Track' : 'Volet Gouvernance'}</span>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2 mt-1">
                      <i className="ri-chat-private-line text-gray-700"></i>
                      {isEn ? 'Confidential Director Interviews & Individual Assessment' : 'Entretiens confidentiels avec les administrateurs & Évaluation individuelle'}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-300 text-gray-700 whitespace-nowrap">
                    <i className="ri-time-line"></i>
                    {isEn ? '3 weeks' : '3 semaines'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">{isEn ? 'Activities' : 'Activités'}</h4>
                    <ul className="space-y-1.5">
                      {[
                        isEn ? 'Confidential one-on-one interviews with each Board member (Chair, directors, committee chairs) — 60-90 minute structured sessions' : 'Entretiens individuels confidentiels avec chaque membre du Conseil (Président, administrateurs, présidents de comités) — sessions structurées de 60-90 minutes',
                        isEn ? 'CEO and executive management interviews to assess Board-management interface and information flow dynamics' : 'Entretiens avec le DG et la Direction Générale pour évaluer l\'interface Conseil-Direction et la dynamique des flux d\'information',
                        isEn ? 'Assessment areas: strategic contribution, risk oversight quality, regulatory understanding, meeting preparation and participation, committee contribution, peer dynamics' : 'Domaines d\'évaluation : contribution stratégique, qualité de supervision des risques, compréhension réglementaire, préparation et participation aux réunions, contribution aux comités, dynamiques de pairs',
                        isEn ? 'Self-assessment questionnaires for each director — evaluating their own contribution and the Board\'s collective effectiveness' : 'Questionnaires d\'auto-évaluation pour chaque administrateur — évaluation de leur propre contribution et de l\'efficacité collective du Conseil',
                        isEn ? 'Synthesis and cross-referencing of individual assessments against documentary evidence and governance benchmarks' : 'Synthèse et recoupement des évaluations individuelles avec les preuves documentaires et les benchmarks de gouvernance',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <i className="ri-checkbox-circle-fill text-indigo-500 mt-0.5 shrink-0"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">{isEn ? 'Deliverables' : 'Livrables'}</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {isEn
                          ? 'Individual confidential assessment report for each Board member (10-15 pages per director). Aggregate Board performance report. Peer dynamics analysis. Strengths and development areas matrix by director. Board-management interface health assessment. Collective governance maturity score.'
                          : 'Rapport individuel confidentiel d\'évaluation pour chaque membre du Conseil (10-15 pages par administrateur). Rapport agrégé de performance du Conseil. Analyse des dynamiques de pairs. Matrice des forces et axes de développement par administrateur. Évaluation de la santé de l\'interface Conseil-Direction. Score de maturité de gouvernance collective.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3: Board Scoring & Action Plan */}
          <div className="bg-indigo-50 rounded-2xl border border-indigo-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <span className="text-xl font-extrabold">3</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{isEn ? 'Governance Track' : 'Volet Gouvernance'}</span>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2 mt-1">
                      <i className="ri-bar-chart-grouped-line text-gray-700"></i>
                      {isEn ? 'Board Scoring, Restitution & Operational Action Plan' : 'Scoring du Conseil, Restitution & Plan d\'Actions Opérationnel'}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-300 text-gray-700 whitespace-nowrap">
                    <i className="ri-time-line"></i>
                    {isEn ? '2 weeks' : '2 semaines'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">{isEn ? 'Activities' : 'Activités'}</h4>
                    <ul className="space-y-1.5">
                      {[
                        isEn ? 'Deployment of proprietary Board Scoring Tool — 25+ criteria across 5 dimensions: Structure & Composition, Functioning & Dynamics, Strategic Oversight, Risk Governance, Regulatory Compliance' : 'Déploiement de l\'outil propriétaire de Scoring du Conseil — 25+ critères sur 5 dimensions : Structure & Composition, Fonctionnement & Dynamiques, Supervision Stratégique, Gouvernance des Risques, Conformité Réglementaire',
                        isEn ? 'Quantitative scoring of collective Board performance with weighted criteria and international benchmarking' : 'Notation quantitative de la performance collective du Conseil avec critères pondérés et benchmarking international',
                        isEn ? 'Individual director scoring with confidential feedback reports and personalized development recommendations' : 'Notation individuelle des administrateurs avec rapports de feedback confidentiels et recommandations de développement personnalisées',
                        isEn ? 'Formal restitution to the Board in plenary session and to the General Assembly (as required by Art. 17)' : 'Restitution formelle au Conseil en séance plénière et à l\'Assemblée Générale (conformément à l\'Art. 17)',
                        isEn ? 'Elaboration of a prioritized operational action plan with measurable milestones, responsible parties, and 12-month timeline' : 'Élaboration d\'un plan d\'actions opérationnel hiérarchisé avec jalons mesurables, responsables désignés et calendrier sur 12 mois',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <i className="ri-checkbox-circle-fill text-indigo-500 mt-0.5 shrink-0"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">{isEn ? 'Deliverables' : 'Livrables'}</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {isEn
                          ? 'Board Scoring Report — quantitative and qualitative assessment across 25+ criteria. Individual Director Scorecards — confidential. Formal Board Evaluation Report for the General Assembly (Art. 17 compliant). Prioritized Operational Action Plan — 12-month roadmap with measurable milestones. Board scoring methodology documentation for future internal evaluations. Governance maturity baseline for longitudinal tracking.'
                          : 'Rapport de Scoring du Conseil — évaluation quantitative et qualitative sur 25+ critères. Scorecards individuelles des administrateurs — confidentielles. Rapport formel d\'évaluation du Conseil pour l\'Assemblée Générale (conforme Art. 17). Plan d\'Actions Opérationnel hiérarchisé — feuille de route 12 mois avec jalons mesurables. Documentation de la méthodologie de scoring pour les futures évaluations internes. Baseline de maturité de gouvernance pour suivi longitudinal.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 4: RegTech Discovery & Audit */}
          <div className="bg-green-50 rounded-2xl border border-green-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                <span className="text-xl font-extrabold">4</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">{isEn ? 'RegTech Track' : 'Volet RegTech'}</span>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2 mt-1">
                      <i className="ri-radar-line text-gray-700"></i>
                      {isEn ? 'Technical Discovery & Multi-Jurisdictional Regulatory Audit' : 'Discovery Technique & Audit Réglementaire Multi-Juridictionnel'}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-300 text-gray-700 whitespace-nowrap">
                    <i className="ri-time-line"></i>
                    {isEn ? '5 weeks' : '5 semaines'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">{isEn ? 'Activities' : 'Activités'}</h4>
                    <ul className="space-y-1.5">
                      {[
                        isEn ? 'In-depth business model analysis: data flows, value chain, client typology, infrastructure locations, AI components, biometric processing architecture' : 'Analyse approfondie du modèle d\'affaires : flux de données, chaîne de valeur, typologie clients, localisation des infrastructures, composants IA, architecture de traitement biométrique',
                        isEn ? 'Complete UEMOA/CEMAC regulatory mapping: 14-country matrix covering applicable texts, authorities, declarations, deadlines, sanctions' : 'Cartographie réglementaire complète UEMOA/CEMAC : matrice 14 pays couvrant textes applicables, autorités, déclarations, délais, sanctions',
                        isEn ? 'Gap analysis vs 40 FATF Recommendations: AML/CFT obligation coverage, compliance shortfalls, remediation prioritization' : 'Analyse des écarts vs 40 Recommandations du GAFI : couverture des obligations AML/CFT, lacunes de conformité, priorisation des remédiations',
                        isEn ? 'Cloud Compliance Assessment: data center locations, provider certifications, digital sovereignty requirements, cross-border transfer feasibility' : 'Cloud Compliance Assessment : localisation des datacenters, certifications fournisseur, exigences de souveraineté numérique, faisabilité des transferts transfrontaliers',
                        isEn ? 'AI Governance Framework analysis: algorithm explicability, bias control, automated decision documentation, ethics-by-design' : 'Analyse du cadre de gouvernance IA : explicabilité des algorithmes, contrôle des biais, documentation des décisions automatisées, éthique by-design',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <i className="ri-checkbox-circle-fill text-green-500 mt-0.5 shrink-0"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">{isEn ? 'Deliverables' : 'Livrables'}</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {isEn
                          ? 'Comprehensive Regulatory Audit Report (80+ pages). 14-country Data Protection Law Matrix. FATF 40 Recommendations Compliance Matrix. Cloud Compliance Assessment Report. Cross-Border Transfer Restriction Mapping. AI Governance Framework Assessment. Strategic Compliance Roadmap — 6 phases, 24 months. Risk Matrix with 12 identified risks and mitigation plans.'
                          : 'Rapport d\'Audit Réglementaire complet (80+ pages). Matrice 14 pays des lois de protection des données. Matrice de conformité aux 40 Recommandations du GAFI. Rapport Cloud Compliance Assessment. Cartographie des restrictions de transfert transfrontalier. Évaluation du cadre de gouvernance IA. Feuille de route stratégique de conformité — 6 phases, 24 mois. Matrice de risques avec 12 risques identifiés et plans de mitigation.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 5: Legal Engineering & Commercial Framework */}
          <div className="bg-green-50 rounded-2xl border border-green-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                <span className="text-xl font-extrabold">5</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">{isEn ? 'RegTech Track' : 'Volet RegTech'}</span>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2 mt-1">
                      <i className="ri-article-line text-gray-700"></i>
                      {isEn ? 'Legal Engineering, Data Privacy & Commercial Framework' : 'Ingénierie Juridique, Data Privacy & Dispositif Commercial'}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-300 text-gray-700 whitespace-nowrap">
                    <i className="ri-time-line"></i>
                    {isEn ? '7 weeks' : '7 semaines'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">{isEn ? 'Activities' : 'Activités'}</h4>
                    <ul className="space-y-1.5">
                      {[
                        isEn ? 'Precise legal qualification: controller, co-controller, or processor — by processing type and by client, across 5 legal qualification hypotheses' : 'Qualification juridique précise : responsable, co-responsable ou sous-traitant — par traitement et par client, sur 5 hypothèses de qualification juridique',
                        isEn ? 'Data Processing Agreement (DPA) drafting: subcontracting contract model adaptable to each institutional client with international data transfer clauses' : 'Rédaction du Data Processing Agreement (DPA) : modèle de contrat de sous-traitance adaptable à chaque client institutionnel avec clauses de transfert international',
                        isEn ? 'Complete data protection documentation: processing register, public and internal privacy policies, data breach management playbooks, retention and archiving policy' : 'Documentation complète de protection des données : registre de traitement, politiques de confidentialité publique et interne, playbooks de gestion des violations, politique de conservation et d\'archivage',
                        isEn ? 'Commercial framework: SaaS General Terms and Conditions, API contracts, BCEAO/COBAC-compliant outsourcing agreements, NDA models (3 versions)' : 'Dispositif commercial : Conditions Générales de Service SaaS, contrats API, contrats d\'externalisation conformes BCEAO/COBAC, modèles NDA (3 versions)',
                        isEn ? 'Vendor Due Diligence framework: supplier questionnaire, due diligence procedure, assessment report model, auditability framework' : 'Cadre de Vendor Due Diligence : questionnaire fournisseur, procédure de due diligence, modèle de rapport d\'évaluation, cadre d\'auditabilité',
                        isEn ? 'Regulatory Data Room assembly: compilation of all compliance documentation into a single, auditable, pre-structured dossier' : 'Assemblage de la Regulatory Data Room : compilation de toute la documentation de conformité en un dossier unique, auditable et pré-structuré',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <i className="ri-checkbox-circle-fill text-green-500 mt-0.5 shrink-0"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">{isEn ? 'Deliverables' : 'Livrables'}</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {isEn
                          ? 'Complete personal data processing register. Public and internal privacy policies. Data Processing Agreement (DPA) model with international transfer clauses. Cloud Compliance Assessment report. Data breach management playbooks. Data retention and archiving policy. Subcontractor analysis and compliance assessment. SaaS General Terms and Conditions. API contract framework. BCEAO/COBAC-compliant outsourcing agreement model. International data transfer clauses. Vendor Due Diligence Report. NDA models (3 versions). AI Governance Framework. AML/CFT compliance manual. Auditability framework. Complete Regulatory Data Room — all documentation pre-structured and auditable.'
                          : 'Registre de traitement des données personnelles complet. Politiques de confidentialité publique et interne. Data Processing Agreement (DPA) modèle avec clauses de transfert international. Rapport Cloud Compliance Assessment. Playbooks de gestion des violations de données. Politique de conservation et d\'archivage. Analyse des sous-traitants et évaluation de conformité. Conditions Générales de Service SaaS. Contrat API. Modèle de contrat d\'externalisation conforme BCEAO/COBAC. Clauses de transfert international de données. Rapport Vendor Due Diligence. Modèles NDA (3 versions). AI Governance Framework. Manuel de conformité AML/CFT. Cadre d\'auditabilité. Regulatory Data Room complète — toute la documentation pré-structurée et auditable.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            {isEn ? 'Measurable Results & Strategic Value Created' : 'Résultats Mesurables & Valeur Stratégique Créée'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Result 1: Board Optimized */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-indigo-500 flex items-center justify-center">
                <i className="ri-government-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {isEn ? '1. Optimized Governance — Board Realigned on International Best Standards' : '1. Gouvernance Optimisée — Conseil réaligné sur les meilleurs standards internationaux'}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-xl p-4 border border-indigo-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'The Board of Directors was realigned on international best practices (OECD, Basel Committee) and fully compliant with Article 17 of Circular n°01-2017/CB/C. A proprietary Board scoring tool covering 25+ criteria was deployed, establishing a governance maturity baseline against which future progress can be measured. Individual director scorecards identified specific development areas, and the prioritized operational action plan provided a concrete 12-month roadmap for continuous governance improvement.'
                    : 'Le Conseil d\'Administration a été réaligné sur les meilleures pratiques internationales (OCDE, Comité de Bâle) et rendu pleinement conforme à l\'article 17 de la circulaire n°01-2017/CB/C. Un outil propriétaire de scoring du Conseil couvrant 25+ critères a été déployé, établissant une baseline de maturité de gouvernance par rapport à laquelle les progrès futurs peuvent être mesurés. Les scorecards individuelles des administrateurs ont identifié des axes de développement spécifiques, et le plan d\'actions opérationnel hiérarchisé a fourni une feuille de route concrète sur 12 mois pour l\'amélioration continue de la gouvernance.'}
                </p>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-indigo-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'The formal Board Evaluation Report submitted to the General Assembly satisfied the regulatory requirement while providing genuine strategic value — transforming a compliance obligation into a governance optimization opportunity. The institution now possesses a documented, defensible governance framework that strengthens its positioning with institutional investors, development finance institutions (DFIs), and the UMOA Banking Commission itself.'
                    : 'Le rapport formel d\'évaluation du Conseil soumis à l\'Assemblée Générale a satisfait l\'exigence réglementaire tout en apportant une valeur stratégique réelle — transformant une obligation de conformité en opportunité d\'optimisation de la gouvernance. L\'institution dispose désormais d\'un cadre de gouvernance documenté et défendable qui renforce son positionnement auprès des investisseurs institutionnels, des institutions de financement du développement (IFD) et de la Commission Bancaire de l\'UMOA elle-même.'}
                </p>
              </div>
            </div>
          </div>

          {/* Result 2: RegTech Immunized */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center">
                <i className="ri-rocket-2-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {isEn ? '2. Immunized RegTech Model — Compliance as Competitive Advantage' : '2. Modèle RegTech Immunisé — La conformité comme avantage concurrentiel'}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-xl p-4 border border-green-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'The RegTech business model was validated and immunized against critical requalification risks. Five legal qualification hypotheses were stress-tested, with a defensible primary qualification and documented mitigation strategies for the most dangerous scenarios. The complete compliance architecture — spanning data protection, AML/CFT, cybersecurity, and AI governance — was designed to be immediately executable with tier-1 banks across the UEMOA and CEMAC zones.'
                    : 'Le modèle d\'affaires RegTech a été validé et immunisé contre les risques de requalification critique. Cinq hypothèses de qualification juridique ont été testées en stress, avec une qualification principale défendable et des stratégies de mitigation documentées pour les scénarios les plus dangereux. L\'architecture de conformité complète — couvrant la protection des données, l\'AML/CFT, la cybersécurité et la gouvernance IA — a été conçue pour être immédiatement exécutable avec des banques de premier rang dans les zones UEMOA et CEMAC.'}
                </p>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-green-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'The Vendor Due Diligence documentation was pre-packaged, reducing institutional sales cycles by an estimated 40-60%. The compliance architecture — from the 14-country data protection matrix to the BCEAO/COBAC-compliant outsourcing agreements — became a commercial differentiator, not a cost center. The RegTech can now confidently engage banking supervisors, demonstrating proactive regulatory maturity.'
                    : 'La documentation de Vendor Due Diligence a été pré-structurée, réduisant les cycles de vente institutionnelle de 40 à 60% estimés. L\'architecture de conformité — de la matrice 14 pays de protection des données aux contrats d\'externalisation conformes BCEAO/COBAC — est devenue un différenciateur commercial, non un centre de coûts. La RegTech peut désormais engager sereinement les superviseurs bancaires, en démontrant une maturité réglementaire proactive.'}
                </p>
              </div>
            </div>
          </div>

          {/* Result 3: Regulatory Data Room */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center">
                <i className="ri-folder-shield-2-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {isEn ? '3. Regulatory Data Room — Institutional Readiness Achieved' : '3. Regulatory Data Room — Institutional Readiness Atteinte'}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-xl p-4 border border-amber-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'The complete Regulatory Data Room was assembled — a comprehensive, pre-structured, auditable compliance dossier serving both the RegTech and its institutional clients. This includes the processing register, privacy policies, DPA, Cloud Compliance Assessment, AML/CFT manual, auditability framework, AI Governance Framework, BCP/DRP documentation, and the full vendor due diligence package.'
                    : 'La Regulatory Data Room complète a été assemblée — un dossier de conformité exhaustif, pré-structuré et auditable, servant à la fois la RegTech et ses clients institutionnels. Ceci inclut le registre de traitement, les politiques de confidentialité, le DPA, le Cloud Compliance Assessment, le manuel AML/CFT, le cadre d\'auditabilité, l\'AI Governance Framework, la documentation PCA/PRA et le package complet de vendor due diligence.'}
                </p>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-amber-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'This transforms compliance from a reactive cost center into a proactive competitive advantage. For fundraising rounds (Series A and beyond), the Regulatory Data Room directly addresses the top-3 due diligence concerns of institutional investors in regulated tech. The documented compliance architecture also satisfies the stringent third-party risk management (TPRM) requirements of tier-1 banking clients — including the financial guarantee institution whose Board we evaluated, creating a powerful virtuous circle between governance and RegTech compliance.'
                    : 'Ceci transforme la conformité d\'un centre de coûts réactif en un avantage concurrentiel proactif. Pour les levées de fonds (Série A et au-delà), la Regulatory Data Room répond directement aux 3 principales préoccupations de due diligence des investisseurs institutionnels dans la tech régulée. L\'architecture de conformité documentée satisfait également les exigences strictes de gestion des risques tiers (TPRM) des clients bancaires de premier rang — y compris l\'institution de cautionnement dont nous avons évalué le Conseil, créant un puissant cercle vertueux entre gouvernance et conformité RegTech.'}
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
                isEn ? 'Board not evaluated — non-compliant with Art. 17 Circular n°01-2017/CB/C, regulatory exposure' : 'Conseil non évalué — non-conforme à l\'Art. 17 circulaire n°01-2017/CB/C, exposition réglementaire',
                isEn ? 'No governance scoring mechanism — inability to measure or demonstrate Board effectiveness to supervisors or investors' : 'Aucun mécanisme de scoring de gouvernance — incapacité à mesurer ou démontrer l\'efficacité du Conseil aux superviseurs et investisseurs',
                isEn ? 'Undefined RegTech legal qualification — five untested hypotheses, asymmetric requalification risk across 8 jurisdictions' : 'Qualification juridique RegTech indéterminée — cinq hypothèses non testées, risque de requalification asymétrique sur 8 juridictions',
                isEn ? 'No documented regulatory framework — inability to respond to institutional due diligence or supervisory inquiries' : 'Absence de cadre réglementaire documenté — incapacité à répondre aux due diligences institutionnelles ou aux demandes des superviseurs',
                isEn ? 'Compliance perceived as a cost center — no competitive positioning around regulatory maturity for either institution' : 'Conformité perçue comme un centre de coûts — aucun positionnement concurrentiel autour de la maturité réglementaire pour les deux institutions',
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
                isEn ? 'Board fully evaluated and Art. 17-compliant — formal report submitted to General Assembly, regulatory obligation satisfied' : 'Conseil pleinement évalué et conforme Art. 17 — rapport formel soumis à l\'Assemblée Générale, obligation réglementaire satisfaite',
                isEn ? 'Proprietary Board scoring tool deployed — 25+ criteria, governance maturity baseline established, longitudinal tracking operational' : 'Outil propriétaire de scoring du Conseil déployé — 25+ critères, baseline de maturité de gouvernance établie, suivi longitudinal opérationnel',
                isEn ? 'RegTech model immunized — 5 hypotheses stress-tested, primary qualification defended, all risks mitigated with documented strategies' : 'Modèle RegTech immunisé — 5 hypothèses testées en stress, qualification principale défendue, tous risques mitigés avec stratégies documentées',
                isEn ? 'Complete Regulatory Data Room — pre-packaged, auditable compliance dossier serving both institutions and their stakeholders' : 'Regulatory Data Room complète — dossier de conformité pré-structuré et auditable servant les deux institutions et leurs parties prenantes',
                isEn ? 'Governance × RegTech virtuous circle — Board now possesses technical literacy to evaluate RegTech solutions and regulatory sophistication to structure compliant outsourcing' : 'Cercle vertueux Gouvernance × RegTech — le Conseil possède désormais la littératie technique pour évaluer les solutions RegTech et la sophistication réglementaire pour structurer une externalisation conforme',
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
            {isEn ? 'Conclusion — The Interdependence of Governance and RegTech in Africa\'s Financial Ecosystem' : 'Conclusion — L\'interdépendance de la Gouvernance et de la RegTech dans l\'écosystème financier africain'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              {isEn
                ? 'This dual mandate reveals a structural truth about the African financial ecosystem in 2026: governance quality and regulatory technology (RegTech) are not separate disciplines — they are two faces of the same institutional resilience imperative. An effectively governed Board is the ultimate guarantor of a financial institution\'s regulatory compliance, including its decisions to outsource critical functions to RegTech providers. Conversely, a RegTech\'s ability to serve tier-1 financial institutions depends on its capacity to demonstrate — in a documented, auditable manner — its compliance with the same regulatory frameworks those institutions\' Boards are responsible for overseeing.'
                : 'Ce double mandat révèle une vérité structurelle de l\'écosystème financier africain en 2026 : la qualité de la gouvernance et la technologie réglementaire (RegTech) ne sont pas des disciplines séparées — elles sont les deux faces d\'un même impératif de résilience institutionnelle. Un Conseil effectivement gouverné est le garant ultime de la conformité réglementaire d\'une institution financière, y compris de ses décisions d\'externaliser des fonctions critiques à des prestataires RegTech. Réciproquement, la capacité d\'une RegTech à servir des institutions financières de premier rang dépend de sa capacité à démontrer — de manière documentée et auditable — sa conformité aux mêmes cadres réglementaires que les Conseils de ces institutions sont responsables de superviser.'}
            </p>

            <p>
              {isEn
                ? 'At KHEPRA EXPERTS, we understand that building Africa\'s digital trust infrastructure requires the simultaneous strengthening of both governance and technology. Our dual mandate approach — combining independent Board evaluation with complete RegTech regulatory engineering — is not merely additive; it is multiplicative. The financial institutions and RegTech companies that will lead Francophone Africa\'s digital economy are those that treat governance and regulatory compliance as a single, integrated strategic function.'
                : 'Chez KHEPRA EXPERTS, nous comprenons que bâtir l\'infrastructure de confiance numérique africaine exige le renforcement simultané de la gouvernance et de la technologie. Notre approche en double mandat — combinant évaluation indépendante du Conseil et ingénierie réglementaire RegTech complète — n\'est pas simplement additive ; elle est multiplicative. Les institutions financières et RegTech qui domineront l\'économie numérique de l\'Afrique francophone sont celles qui traitent la gouvernance et la conformité réglementaire comme une fonction stratégique unique et intégrée.'}
            </p>

            <div className="bg-gradient-to-r from-amber-50 to-indigo-50 rounded-xl p-5 border border-amber-200 mt-6">
              <p className="text-gray-900 font-bold text-base md:text-lg">
                {isEn
                  ? 'Our conviction: « No theoretical reports. Rigorous diagnostics. Executable deliverables. Measurable results. »'
                  : 'Notre conviction : « Pas de rapport théorique. Des diagnostics rigoureux. Des livrables exécutoires. Des résultats mesurables. »'}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {isEn
                  ? '— KHEPRA EXPERTS, Governance & Regulatory Engineering for Francophone Africa\'s Financial Ecosystem'
                  : '— KHEPRA EXPERTS, Gouvernance & Ingénierie Réglementaire pour l\'Écosystème Financier d\'Afrique Francophone'}
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
          q: 'What does Article 17 of Circular n°01-2017/CB/C require for financial institutions in the UMOA zone?',
          a: 'Article 17 of Circular n°01-2017/CB/C requires financial institutions regulated by the UMOA Banking Commission to conduct a periodic independent, objective, and rigorous evaluation of the collective and individual performance of their Board of Directors and specialized committees (Audit, Risk, Remuneration). This evaluation must assess governance structure, board composition, meeting effectiveness, strategic oversight quality, and committee functionality — and must be formally documented and reported to the General Assembly.',
        },
        {
          q: 'How does KHEPRA EXPERTS approach Board of Directors evaluation for financial institutions in Francophone Africa?',
          a: 'KHEPRA EXPERTS deploys a rigorous 3-phase methodology: (1) Diagnostic — governance documentation review, board composition analysis, committee functioning assessment; (2) Confidential Interviews — individual sessions with each board member and key executives, evaluating strategic contribution, risk oversight, and regulatory compliance understanding; (3) Scoring & Action Plan — deployment of a proprietary Board scoring tool covering 25+ criteria across 5 dimensions, production of a confidential individual report for each director, and formulation of a prioritized operational action plan with measurable milestones over 12 months.',
        },
        {
          q: 'What makes the Governance × RegTech dual mandate unique?',
          a: 'The dual mandate is unique because it addresses both sides of the financial ecosystem\'s trust equation. On one side, the Board of Directors of regulated institutions — the body deciding whether to outsource critical compliance functions to RegTech providers — must be evaluated and strengthened. On the other side, the RegTech providers themselves must have their compliance architecture secured across multiple jurisdictions. KHEPRA EXPERTS is one of the few advisory firms in Francophone Africa with the integrated expertise (governance + regulatory engineering + technology understanding) to deliver both mandates simultaneously, creating a virtuous circle of institutional trust.',
        },
        {
          q: 'What is the risk of requalification for a RegTech SaaS provider by banking supervisors in UEMOA/CEMAC?',
          a: 'Banking supervisors (BCEAO, COBAC) have the discretionary authority to classify a RegTech provider as a "critical outsourced provider" if its services are deemed essential to a supervised institution\'s operations. This requalification triggers substantially heavier obligations: full auditability by the supervisor, mandatory business continuity and reversibility clauses, enhanced cybersecurity certifications (ISO 27001, SOC 2), and potential direct regulatory oversight. KHEPRA EXPERTS helps RegTech companies preemptively structure their contractual and operational frameworks to minimize this risk, testing multiple legal qualification hypotheses across each target jurisdiction.',
        },
      ]
    : [
        {
          q: 'Qu\'exige l\'article 17 de la circulaire n°01-2017/CB/C pour les institutions financières de la zone UMOA ?',
          a: 'L\'article 17 de la circulaire n°01-2017/CB/C impose aux institutions financières régulées par la Commission Bancaire de l\'UMOA de procéder à une évaluation périodique, indépendante, objective et rigoureuse de la performance collective et individuelle de leur Conseil d\'Administration et de leurs comités spécialisés (Audit, Risques, Rémunérations). Cette évaluation doit porter sur la structure de gouvernance, la composition du conseil, l\'efficacité des réunions, la qualité de la supervision stratégique et le fonctionnement des comités — et doit être formellement documentée et rapportée à l\'Assemblée Générale.',
        },
        {
          q: 'Comment KHEPRA EXPERTS aborde-t-il l\'évaluation des Conseils d\'Administration pour les institutions financières en Afrique francophone ?',
          a: 'KHEPRA EXPERTS déploie une méthodologie rigoureuse en 3 phases : (1) Diagnostic — revue documentaire de la gouvernance, analyse de la composition du conseil, évaluation du fonctionnement des comités ; (2) Entretiens Confidentiels — sessions individuelles avec chaque administrateur et dirigeant clé, évaluation de la contribution stratégique, de la supervision des risques et de la compréhension de la conformité réglementaire ; (3) Scoring & Plan d\'Actions — déploiement d\'un outil propriétaire de notation du Conseil couvrant 25+ critères sur 5 dimensions, production d\'un rapport individuel confidentiel pour chaque administrateur, et formulation d\'un plan d\'actions opérationnel hiérarchisé avec jalons mesurables sur 12 mois.',
        },
        {
          q: 'Qu\'est-ce qui rend le double mandat Gouvernance × RegTech unique ?',
          a: 'Le double mandat est unique car il traite les deux versants de l\'équation de confiance de l\'écosystème financier. D\'un côté, le Conseil d\'Administration des institutions régulées — l\'organe décidant d\'externaliser des fonctions critiques de conformité à des prestataires RegTech — doit être évalué et renforcé. De l\'autre côté, les fournisseurs RegTech eux-mêmes doivent voir leur architecture de conformité sécurisée sur de multiples juridictions. KHEPRA EXPERTS est l\'un des rares cabinets de conseil en Afrique francophone disposant de l\'expertise intégrée (gouvernance + ingénierie réglementaire + compréhension technologique) pour livrer simultanément les deux mandats, créant un cercle vertueux de confiance institutionnelle.',
        },
        {
          q: 'Quel est le risque de requalification d\'un fournisseur SaaS RegTech par les superviseurs bancaires en zone UEMOA/CEMAC ?',
          a: 'Les superviseurs bancaires (BCEAO, COBAC) disposent du pouvoir discrétionnaire de qualifier un fournisseur RegTech de « prestataire critique externalisé » si ses services sont jugés essentiels aux opérations d\'une institution supervisée. Cette requalification déclenche des obligations substantiellement plus lourdes : auditabilité totale par le superviseur, clauses obligatoires de continuité et de réversibilité, certifications renforcées de cybersécurité (ISO 27001, SOC 2), et potentiellement une supervision réglementaire directe. KHEPRA EXPERTS aide les RegTech à structurer préventivement leurs cadres contractuels et opérationnels pour minimiser ce risque, en testant plusieurs hypothèses de qualification juridique sur chaque juridiction cible.',
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
          GOV
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 mb-6">
          <i className="ri-chat-quote-line text-amber-400 text-sm"></i>
          <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
            {isEn ? 'Governance or RegTech challenge?' : 'Défi de gouvernance ou RegTech ?'}
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
          {isEn
            ? 'Strengthen your Board governance and secure your RegTech compliance across UEMOA and CEMAC'
            : 'Renforcez la gouvernance de votre Conseil et sécurisez la conformité de votre RegTech en zone UEMOA et CEMAC'}
        </h2>

        <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {isEn
            ? 'KHEPRA EXPERTS delivers integrated governance evaluation and regulatory engineering — from independent Board assessment (Art. 17) to complete RegTech compliance architecture. A free 30-minute strategic diagnostic to assess your institutional resilience.'
            : 'KHEPRA EXPERTS livre une évaluation de gouvernance et une ingénierie réglementaire intégrées — de l\'évaluation indépendante du Conseil (Art. 17) à l\'architecture de conformité RegTech complète. Un diagnostic stratégique gratuit de 30 minutes pour évaluer votre résilience institutionnelle.'}
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
            trackingLocation="governance_board_case_study_cta"
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