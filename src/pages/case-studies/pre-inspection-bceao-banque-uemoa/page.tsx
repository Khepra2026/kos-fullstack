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
const PAGE_PATH = '/case-studies/pre-inspection-bceao-banque-uemoa';

const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=professional%20BCEAO%20banking%20inspection%20and%20regulatory%20compliance%20scene%20in%20West%20African%20financial%20institution%20Abidjan%2C%20senior%20inspectors%20and%20bank%20compliance%20officers%20reviewing%20prudential%20ratios%20and%20governance%20documents%20in%20formal%20boardroom%2C%20dark%20wood%20paneling%20with%20BCEAO%20regulatory%20badges%20and%20official%20circulars%20on%20table%2C%20warm%20amber%20and%20emerald%20green%20lighting%2C%20serious%20focused%20atmosphere%20of%20official%20banking%20supervision%20audit%2C%20clean%20institutional%20aesthetic%20with%20african%20financial%20regulatory%20authority%20gravitas%2C%20premium%20editorial%20photography%20style&width=1600&height=800&seq=cs-pre-inspection-bceao-hero&orientation=landscape';

const buildStructuredData = (isEn: boolean) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}${PAGE_PATH}#article`,
      headline: isEn
        ? 'Case Study: Pre-Inspection BCEAO — Basel II/III Compliance & Governance Restructuring for a West African Regional Bank | KHEPRA EXPERTS'
        : 'Étude de cas : Pré-Inspection BCEAO — Mise en conformité Bâle II/III & restructuration de la gouvernance d\'une banque régionale ouest-africaine | KHEPRA EXPERTS',
      description: isEn
        ? 'How KHEPRA EXPERTS delivered a complete BCEAO compliance certification for a West African regional bank in 6 months: 23 critical gaps closed, solvency ratio +18%, 500M FCFA sanctions avoided. Full governance restructuring with 3 specialized committees, Basel II/III compliance, and institutional investor confidence restoration.'
        : 'Comment KHEPRA EXPERTS a livré une certification de conformité BCEAO complète pour une banque régionale ouest-africaine en 6 mois : 23 écarts critiques résorbés, ratio de solvabilité +18%, 500M FCFA de sanctions évitées. Restructuration complète de la gouvernance avec 3 comités spécialisés, conformité Bâle II/III et restauration de la confiance des investisseurs institutionnels.',
      image: HERO_IMAGE,
      author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
      publisher: { '@id': `${SITE_URL}/#organization` },
      datePublished: '2026-06-08',
      dateModified: '2026-06-08',
      inLanguage: isEn ? 'en-US' : 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      about: [
        { '@type': 'Thing', name: 'Inspection BCEAO' },
        { '@type': 'Thing', name: 'Conformité Bâle II/III' },
        { '@type': 'Thing', name: 'Gouvernance bancaire UEMOA' },
        { '@type': 'Thing', name: 'Ratios prudentiels BCEAO' },
        { '@type': 'Thing', name: 'Comités spécialisés circulaire 01-2017' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${PAGE_PATH}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Case Studies' : 'Études de cas', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: isEn ? 'Pre-IB Inspection BCEAO — Regional Bank UEMOA' : 'Pré-Inspection BCEAO — Banque Régionale UEMOA' },
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

export default function PreInspectionBCEAOCaseStudyPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const contactRef = useRef<HTMLDivElement>(null);

  const ogTitle = isEn
    ? 'Case Study: Pre-IB Inspection BCEAO — Basel II/III Bank Compliance UEMOA | KHEPRA EXPERTS'
    : 'Étude de cas : Pré-Inspection BCEAO — Conformité Bâle II/III Banque UEMOA | KHEPRA EXPERTS';

  const ogDescription = isEn
    ? 'How KHEPRA EXPERTS delivered full BCEAO compliance certification for a West African regional bank in 6 months. 23 gaps closed, solvency +18%, 500M FCFA sanctions avoided, governance restructured with 3 specialized committees (Circulaire 01-2017/CB).'
    : 'Comment KHEPRA EXPERTS a livré une certification BCEAO complète pour une banque régionale ouest-africaine en 6 mois. 23 écarts résorbés, solvabilité +18%, 500M FCFA sanctions évitées, gouvernance restructurée avec 3 comités spécialisés (Circulaire 01-2017/CB).';

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={ogTitle}
        description={ogDescription}
        keywords={isEn
          ? 'pre-inspection BCEAO case study, Basel compliance UEMOA, BCEAO audit banque, conformité prudentielle Afrique Ouest, governance restructuring bank, circulaire 01-2017 CB, ratios prudentiels BCEAO, KHEPRA EXPERTS Lomé'
          : 'pré-inspection BCEAO étude de cas, conformité Bâle UEMOA, audit BCEAO banque, conformité prudentielle Afrique Ouest, restructuration gouvernance banque, circulaire 01-2017 CB, ratios prudentiels BCEAO, KHEPRA EXPERTS Lomé'}
        canonicalPath={PAGE_PATH}
        ogType="article"
        ogImage={OG_IMAGES.CASE_STUDIES}
        ogImageAlt={isEn
          ? 'Pre-IB Inspection BCEAO — West African Bank Compliance — KHEPRA EXPERTS'
          : 'Pré-Inspection BCEAO — Conformité Banque Ouest-Africaine — KHEPRA EXPERTS'}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        twitterLabel1={isEn ? 'Result' : 'Résultat'}
        twitterData1={isEn ? '100% BCEAO compliance in 6 months' : 'Conformité BCEAO 100% en 6 mois'}
        twitterLabel2={isEn ? 'Impact' : 'Impact'}
        twitterData2={isEn ? '500M FCFA sanctions avoided' : '500M FCFA sanctions évitées'}
        structuredData={buildStructuredData(isEn)}
        hreflangLinks={STATIC_HREFLANG_MAP[PAGE_PATH + '/']}
        articleSection={isEn ? 'Case Studies' : 'Études de cas'}
        articleTags={isEn ? ['Pre-IB Inspection BCEAO', 'Basel II/III', 'Bank Governance', 'Circulaire 01-2017', 'UEMOA', 'Prudential Ratios', 'Internal Control'] : ['Pré-Inspection BCEAO', 'Bâle II/III', 'Gouvernance bancaire', 'Circulaire 01-2017', 'UEMOA', 'Ratios prudentiels', 'Contrôle interne']}
        articlePublishedTime="2026-06-08"
        articleModifiedTime="2026-06-08"
        articleAuthor="KHEPRA EXPERTS"
      />
      <SchemaFAQPage
        faqs={
          isEn
            ? [
                {
                  question: 'What does a BCEAO pre-inspection involve for UEMOA banks?',
                  answer: 'A BCEAO pre-inspection is a preventive compliance audit that simulates an actual BCEAO inspection mission. It covers governance (Circulaire 01-2017/CB), prudential ratios (Circulaire 03-2017/CB — Basel II/III), internal control, AML/CFT compliance (Directive 02-2015), credit portfolio quality, and operational risk management. KHEPRA EXPERTS identifies gaps before the official inspector does, enabling corrective action under controlled conditions rather than under regulatory pressure.',
                },
                {
                  question: 'What are the most common BCEAO compliance gaps for regional banks?',
                  answer: 'Based on 50+ missions, the 3 most common gaps are: (1) Governance — non-compliance with Circulaire 01-2017/CB (insufficient independent directors, missing or non-functional specialized committees, undocumented self-assessments); (2) Prudential ratios — incorrect Basel II/III calculation methodologies, insufficient capital buffers, inadequate loan loss provisioning; (3) Internal control — weak segregation of duties, inadequate audit trails, insufficient IT general controls. These 3 areas represent 70%+ of major findings in BCEAO inspection reports.',
                },
                {
                  question: 'How long does a full BCEAO compliance remediation take?',
                  answer: 'A full remediation program typically takes 4-8 months, depending on the institution\'s size and the severity of gaps. KHEPRA EXPERTS structures the intervention in 3 phases: Diagnostic (3-4 weeks), Remediation (10-16 weeks), and Pre-Inspection Dry Run (2-3 weeks). The West African regional bank in this case study achieved full compliance in 6 months — closing 23 critical gaps, restructuring its Board with 3 specialized committees, achieving a +18% solvency ratio improvement, and avoiding 500M FCFA in potential sanctions.',
                },
              ]
            : [
                {
                  question: 'Qu\'implique une pré-inspection BCEAO pour les banques UEMOA ?',
                  answer: 'Une pré-inspection BCEAO est un audit de conformité préventif qui simule une mission d\'inspection BCEAO réelle. Elle couvre la gouvernance (Circulaire 01-2017/CB), les ratios prudentiels (Circulaire 03-2017/CB — Bâle II/III), le contrôle interne, la conformité LBC/FT (Directive 02-2015), la qualité du portefeuille de crédit et la gestion des risques opérationnels. KHEPRA EXPERTS identifie les écarts avant que l\'inspecteur officiel ne le fasse, permettant des actions correctives en conditions maîtrisées plutôt que sous pression réglementaire.',
                },
                {
                  question: 'Quels sont les écarts de conformité BCEAO les plus fréquents pour les banques régionales ?',
                  answer: 'Sur la base de 50+ missions, les 3 écarts les plus fréquents sont : (1) Gouvernance — non-conformité à la Circulaire 01-2017/CB (administrateurs indépendants insuffisants, comités spécialisés absents ou dysfonctionnels, auto-évaluations non documentées) ; (2) Ratios prudentiels — méthodologies de calcul Bâle II/III incorrectes, coussins de fonds propres insuffisants, provisionnement inadéquat des créances ; (3) Contrôle interne — faible séparation des fonctions, pistes d\'audit inadéquates, contrôles généraux informatiques insuffisants. Ces 3 domaines représentent 70%+ des réserves majeures dans les rapports d\'inspection BCEAO.',
                },
                {
                  question: 'Combien de temps prend une remédiation complète de conformité BCEAO ?',
                  answer: 'Un programme complet de remédiation prend typiquement 4 à 8 mois, selon la taille de l\'institution et la sévérité des écarts. KHEPRA EXPERTS structure l\'intervention en 3 phases : Diagnostic (3-4 semaines), Remédiation (10-16 semaines) et Répétition générale pré-inspection (2-3 semaines). La banque régionale ouest-africaine de cette étude de cas a atteint la conformité complète en 6 mois — résorbant 23 écarts critiques, restructurant son Conseil avec 3 comités spécialisés, améliorant son ratio de solvabilité de +18% et évitant 500M FCFA de sanctions potentielles.',
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
              { label: isEn ? 'Pre-IB Inspection BCEAO — Regional Bank UEMOA' : 'Pré-Inspection BCEAO — Banque Régionale UEMOA' },
            ]}
          />
        </div>
      </div>

      <main>
        <HeroSection isEn={isEn} />
        <FicheTechnique isEn={isEn} />
        <ContexteDefis isEn={isEn} />
        <MethodologieIntervention isEn={isEn} />
        <Resultats isEn={isEn} />
        <Conclusion isEn={isEn} />
        <FAQSection isEn={isEn} />
        <CTASection isEn={isEn} contactRef={contactRef} />
      </main>

      <Footer />
    </div>
  );
}

function HeroSection({ isEn }: { isEn: boolean }) {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-end pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover object-top" loading="eager" width="1600" height="800" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/75"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/25 border border-emerald-400/45 text-emerald-300">
              <i className="ri-building-4-line"></i>
              {isEn ? 'Regional Bank — UEMOA' : 'Banque Régionale — UEMOA'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-calendar-line"></i>
              2023
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-time-line"></i>
              {isEn ? '6 months' : '6 mois'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80">
              <i className="ri-file-text-line"></i>
              {isEn ? 'Basel II/III + Circulaire 01-2017/CB' : 'Bâle II/III + Circulaire 01-2017/CB'}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {isEn
              ? 'Pre-Inspection BCEAO: Basel II/III Compliance & Full Governance Restructuring for a West African Regional Bank'
              : 'Pré-Inspection BCEAO : Mise en conformité Bâle II/III & restructuration complète de la gouvernance d\'une banque régionale ouest-africaine'}
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed">
            {isEn
              ? 'How KHEPRA EXPERTS transformed a 15-year-old regional bank\'s obsolete governance framework into a BCEAO-certified reference — closing 23 critical compliance gaps, restructuring the Board with 3 specialized committees, and improving the solvency ratio by 18% — all in 6 months, avoiding 500M FCFA in regulatory sanctions.'
              : 'Comment KHEPRA EXPERTS a transformé le cadre de gouvernance obsolète d\'une banque régionale de 15 ans en une référence certifiée BCEAO — résorbant 23 écarts de conformité critiques, restructurant le Conseil avec 3 comités spécialisés et améliorant le ratio de solvabilité de 18% — le tout en 6 mois, évitant 500M FCFA de sanctions réglementaires.'}
          </p>
        </div>
      </div>
    </section>
  );
}

function FicheTechnique({ isEn }: { isEn: boolean }) {
  const specs = [
    { icon: 'ri-building-4-line', label: isEn ? 'Client' : 'Client', value: isEn ? 'West African Regional Bank — 15 years of operations, headquartered in Côte d\'Ivoire' : 'Banque Régionale d\'Afrique de l\'Ouest — 15 ans d\'existence, siège en Côte d\'Ivoire' },
    { icon: 'ri-flag-line', label: isEn ? 'Country' : 'Pays', value: isEn ? 'Côte d\'Ivoire (UEMOA zone)' : 'Côte d\'Ivoire (zone UEMOA)' },
    { icon: 'ri-file-text-line', label: isEn ? 'Regulatory Framework' : 'Cadre réglementaire', value: isEn ? 'BCEAO Circular n°01-2017/CB/C (Governance), Circular n°03-2017/CB/C (Prudential Ratios — Basel II/III), Directive n°02-2015 (AML/CFT)' : 'Circulaires BCEAO n°01-2017/CB/C (Gouvernance), n°03-2017/CB/C (Ratios prudentiels — Bâle II/III), Directive n°02-2015 (LBC/FT)' },
    { icon: 'ri-tools-line', label: isEn ? 'Mission Duration' : 'Durée', value: isEn ? '6 months — 3 phases: Diagnostic (1 month) + Remediation (4 months) + Pre-Inspection Dry Run (1 month)' : '6 mois — 3 phases : Diagnostic (1 mois) + Remédiation (4 mois) + Répétition générale (1 mois)' },
    { icon: 'ri-team-line', label: isEn ? 'KHEPRA Team' : 'Équipe KHEPRA', value: isEn ? 'Lead Partner + Senior Governance Expert + Prudential Risk Specialist + AML/CFT Expert' : 'Associé Directeur + Expert Senior Gouvernance + Spécialiste Risques Prudentiels + Expert LBC/FT' },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="ri-file-list-3-line text-emerald-600 text-lg"></i>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{isEn ? 'Technical Fact Sheet' : 'Fiche Technique'}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { value: '100%', label: isEn ? 'BCEAO compliance achieved' : 'Conformité BCEAO atteinte', icon: 'ri-shield-check-line' },
              { value: '6 mois', label: isEn ? 'Total implementation timeline' : 'Délai total de mise en œuvre', icon: 'ri-time-line' },
              { value: '+18%', label: isEn ? 'Solvency ratio improvement' : 'Amélioration ratio solvabilité', icon: 'ri-line-chart-line' },
              { value: '500M', label: isEn ? 'FCFA — Sanctions avoided' : 'FCFA — Sanctions évitées', icon: 'ri-money-dollar-circle-line' },
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
        </div>
      </div>
    </section>
  );
}

function ContexteDefis({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-search-eye-line"></i>
            {isEn ? 'PART I' : 'PARTIE I'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Context & Critical Challenges' : 'Contexte & Défis Critiques'}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              {isEn
                ? 'A 15-year-old regional bank with a strong market position in Côte d\'Ivoire faced a triple regulatory threat. Its governance framework — designed at incorporation — had never been materially updated. With the BCEAO intensifying its supervisory cycle and applying Basel II/III standards through Circular n°03-2017/CB/C, the institution faced a high probability of major adverse findings in its next inspection. The estimated exposure: up to 500M FCFA in regulatory sanctions, reputational damage with correspondent banks, and — most critically — potential restrictions on dividend distributions that would destabilize the shareholder base.'
                : 'Une banque régionale de 15 ans, solidement positionnée en Côte d\'Ivoire, faisait face à une triple menace réglementaire. Son cadre de gouvernance — conçu à sa création — n\'avait jamais été substantiellement actualisé. Avec l\'intensification du cycle de supervision de la BCEAO et l\'application des standards Bâle II/III via la Circulaire n°03-2017/CB/C, l\'institution présentait une probabilité élevée de réserves majeures à sa prochaine inspection. L\'exposition estimée : jusqu\'à 500M FCFA de sanctions, une dégradation réputationnelle auprès des correspondants bancaires et — plus critique — des restrictions potentielles de distribution de dividendes qui déstabiliseraient l\'actionnariat.'}
            </p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-error-warning-line text-emerald-600"></i>
              {isEn ? 'The 3 Critical Gaps Identified' : 'Les 3 Écarts Critiques Identifiés'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: 'ri-government-line',
                  title: isEn ? '1. Obsolete Governance' : '1. Gouvernance Obsolète',
                  desc: isEn
                    ? 'No specialized committees (Audit, Risk, Remuneration) as required by Circular n°01-2017/CB/C. Board composition non-compliant: insufficient independent directors, no documented self-evaluation process. Strategic oversight limited to quarterly financial review with no risk governance framework.'
                    : 'Aucun comité spécialisé (Audit, Risques, Rémunérations) comme exigé par la Circulaire n°01-2017/CB/C. Composition du Conseil non conforme : administrateurs indépendants insuffisants, absence de processus d\'auto-évaluation documenté. Supervision stratégique limitée à la revue financière trimestrielle, sans cadre de gouvernance des risques.',
                },
                {
                  icon: 'ri-funds-line',
                  title: isEn ? '2. Prudential Ratio Gaps' : '2. Écarts de Ratios Prudentiels',
                  desc: isEn
                    ? 'Basel II/III ratio calculation methodology not aligned with Circular n°03-2017/CB/C. Capital conservation buffer below regulatory minimum. Risk-weighted asset (RWA) calculation methodology overestimating portfolio quality. Loan loss provisioning methodology insufficiently conservative under stressed scenarios.'
                    : 'Méthodologie de calcul des ratios Bâle II/III non alignée sur la Circulaire n°03-2017/CB/C. Coussin de conservation des fonds propres inférieur au minimum réglementaire. Méthodologie de calcul des RWA surestimant la qualité du portefeuille. Provisionnement des créances insuffisamment conservateur en scénarios de stress.',
                },
                {
                  icon: 'ri-shield-keyhole-line',
                  title: isEn ? '3. Internal Control & AML/CFT' : '3. Contrôle Interne & LBC/FT',
                  desc: isEn
                    ? 'Internal control function understaffed and lacking independence. Segregation of duties gaps in credit origination and treasury operations. AML/CFT framework not updated to Directive n°02-2015 requirements. PEP screening and suspicious transaction reporting procedures inadequate.'
                    : 'Fonction contrôle interne sous-dimensionnée et manquant d\'indépendance. Lacunes de séparation des fonctions dans l\'origination de crédit et les opérations de trésorerie. Cadre LBC/FT non actualisé aux exigences de la Directive n°02-2015. Procédures de screening PPE et de déclaration de soupçon inadaptées.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-red-50 rounded-xl p-5 border border-red-100">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-3">
                    <i className={`${item.icon} text-red-600 text-lg`}></i>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl border border-red-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <i className="ri-alert-fill text-red-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {isEn ? 'Regulatory Exposure Assessment' : 'Évaluation de l\'Exposition Réglementaire'}
              </h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {isEn
                ? 'Our initial diagnostic identified 23 critical compliance gaps across the 3 domains. The probability of a major adverse finding in the next BCEAO inspection was estimated at 85%+. The financial exposure — combining potential fines, mandatory capital injections, and operational disruption — was conservatively estimated at 500M FCFA. The reputational exposure with international correspondent banks and DFI partners was unquantifiable but likely more severe than the direct financial impact.'
                : 'Notre diagnostic initial a identifié 23 écarts de conformité critiques sur les 3 domaines. La probabilité d\'une réserve majeure à la prochaine inspection BCEAO était estimée à 85%+. L\'exposition financière — combinant amendes potentielles, injections de capital obligatoires et perturbations opérationnelles — était estimée de manière conservatrice à 500M FCFA. L\'exposition réputationnelle auprès des correspondants bancaires internationaux et partenaires IFD était non quantifiable mais probablement plus sévère que l\'impact financier direct.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodologieIntervention({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 mb-3">
            <i className="ri-tools-line"></i>
            {isEn ? 'PART II' : 'PARTIE II'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Methodology — 3-Phase Intervention' : 'Méthodologie — Intervention en 3 Phases'}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
        </div>

        <div className="space-y-6">
          {[
            {
              num: 1,
              icon: 'ri-search-eye-line',
              title: isEn ? 'Phase 1 — Deep Diagnostic (4 weeks)' : 'Phase 1 — Diagnostic Approfondi (4 semaines)',
              items: isEn
                ? [
                    'Complete governance documentation review: statutes, internal regulations, Board and committee charters, 24 months of meeting minutes',
                    'Board composition analysis: independence assessment, expertise matrix, tenure distribution, succession planning gaps',
                    'Prudential ratio recalculation: independent verification of Basel II/III ratios using BCEAO methodology, gap identification',
                    'Internal control framework audit: segregation of duties mapping, control testing, IT general controls assessment',
                    'AML/CFT framework review: KYC procedures, PEP screening, transaction monitoring, reporting to CENTIF',
                    'Production of a 140-page Diagnostic Report with 23 prioritized gaps, regulatory references, and severity scoring',
                  ]
                : [
                    'Revue complète de la documentation de gouvernance : statuts, règlement intérieur, chartes, 24 mois de PV de réunions',
                    'Analyse de la composition du Conseil : évaluation de l\'indépendance, matrice d\'expertise, distribution d\'ancienneté, lacunes de succession',
                    'Recalcul des ratios prudentiels : vérification indépendante des ratios Bâle II/III selon méthodologie BCEAO, identification des écarts',
                    'Audit du cadre de contrôle interne : cartographie de la séparation des fonctions, tests de contrôles, évaluation des contrôles généraux informatiques',
                    'Revue du cadre LBC/FT : procédures KYC, screening PPE, surveillance des transactions, déclarations CENTIF',
                    'Production d\'un Rapport de Diagnostic de 140 pages avec 23 écarts priorisés, références réglementaires et scoring de sévérité',
                  ],
            },
            {
              num: 2,
              icon: 'ri-settings-4-line',
              title: isEn ? 'Phase 2 — Remediation (16 weeks)' : 'Phase 2 — Remédiation (16 semaines)',
              items: isEn
                ? [
                    'Governance restructuring: creation of 3 specialized committees (Audit, Risk, Remuneration) with charters, mandates, and annual work plans',
                    'Board composition optimization: recruitment and onboarding of 3 independent directors with banking, risk, and regulatory expertise',
                    'Modern governance charter development: documenting roles, responsibilities, decision rights, and information flows',
                    'Prudential ratio remediation: methodology correction, capital planning, RWA optimization, loan loss provisioning recalibration',
                    '40-hour intensive Board training program: regulatory obligations, risk governance, strategic oversight, committee effectiveness',
                    'Internal control strengthening: function restructured with direct Board reporting line, enhanced segregation of duties, IT controls remediation',
                    'AML/CFT framework upgrade: KYC/KYB procedures, PEP screening tool deployment, suspicious transaction reporting protocols, staff training',
                    'Quarterly BCEAO reporting system implementation: automated data collection, validation, and submission pipeline',
                  ]
                : [
                    'Restructuration de la gouvernance : création de 3 comités spécialisés (Audit, Risques, Rémunérations) avec chartes, mandats et plans de travail annuels',
                    'Optimisation de la composition du Conseil : recrutement et intégration de 3 administrateurs indépendants avec expertise bancaire, risques et réglementaire',
                    'Élaboration d\'une charte de gouvernance moderne : rôles, responsabilités, droits de décision et flux d\'information documentés',
                    'Remédiation des ratios prudentiels : correction méthodologique, planification du capital, optimisation des RWA, recalibrage du provisionnement',
                    'Formation intensive de 40 heures du Conseil : obligations réglementaires, gouvernance des risques, supervision stratégique, efficacité des comités',
                    'Renforcement du contrôle interne : fonction restructurée avec reporting direct au Conseil, séparation des fonctions renforcée, contrôles IT remédiés',
                    'Mise à niveau du cadre LBC/FT : procédures KYC/KYB, déploiement d\'un outil de screening PPE, protocoles de déclaration de soupçon, formation du personnel',
                    'Implémentation du système de reporting trimestriel BCEAO : collecte, validation et soumission automatisées',
                  ],
            },
            {
              num: 3,
              icon: 'ri-check-double-line',
              title: isEn ? 'Phase 3 — Pre-Inspection Dry Run (4 weeks)' : 'Phase 3 — Répétition Générale Pré-Inspection (4 semaines)',
              items: isEn
                ? [
                    'Full simulation of a BCEAO inspection mission: document requests, on-site interviews, control testing',
                    'Mock inspection report with findings, ratings, and recommended actions — mirroring real BCEAO format',
                    'Final remediation sprint: closing residual gaps identified during the dry run',
                    'Board and management debriefing: preparation for actual inspector interactions, messaging and documentation readiness',
                    'Post-mission support: 3-month follow-up with quarterly governance health checks',
                  ]
                : [
                    'Simulation complète d\'une mission d\'inspection BCEAO : demandes documentaires, entretiens sur site, tests de contrôles',
                    'Rapport de simulation d\'inspection avec constats, notations et actions recommandées — miroir du format BCEAO réel',
                    'Sprint final de remédiation : résorption des écarts résiduels identifiés pendant la répétition générale',
                    'Débriefing Conseil et Direction : préparation aux interactions réelles avec les inspecteurs, message et documentation prêts',
                    'Support post-mission : suivi de 3 mois avec contrôles trimestriels de santé de la gouvernance',
                  ],
            },
          ].map((phase, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-5 md:p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <span className="text-white font-extrabold text-xl">{phase.num}</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white">{phase.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <i className="ri-checkbox-circle-fill text-emerald-500 mt-0.5 shrink-0"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resultats({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
            <i className="ri-trophy-line"></i>
            {isEn ? 'PART III' : 'PARTIE III'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Measurable Results' : 'Résultats Mesurables'}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <i className="ri-close-circle-line text-red-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-red-900 text-lg">{isEn ? 'Before KHEPRA EXPERTS' : 'Avant KHEPRA EXPERTS'}</h3>
            </div>
            <ul className="space-y-2">
              {[
                isEn ? '23 critical compliance gaps — 85%+ probability of major adverse BCEAO finding' : '23 écarts de conformité critiques — 85%+ de probabilité de réserve majeure BCEAO',
                isEn ? 'No specialized committees — non-compliance with Circular n°01-2017/CB/C' : 'Aucun comité spécialisé — non-conformité à la Circulaire n°01-2017/CB/C',
                isEn ? 'Solvency ratio below regulatory minimum — capital conservation buffer insufficient' : 'Ratio de solvabilité sous le minimum réglementaire — coussin de conservation insuffisant',
                isEn ? 'Obsolete internal control function — understaffed, lacking independence' : 'Fonction contrôle interne obsolète — sous-dimensionnée, manquant d\'indépendance',
                isEn ? 'AML/CFT framework pre-Directive n°02-2015 — PEP screening manual and incomplete' : 'Cadre LBC/FT antérieur à la Directive n°02-2015 — screening PPE manuel et incomplet',
                isEn ? 'Exposure: 500M FCFA sanctions + dividend restriction risk + reputational damage' : 'Exposition : 500M FCFA sanctions + risque restriction dividendes + dégradation réputationnelle',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                  <i className="ri-close-line text-red-500 mt-0.5 shrink-0"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-emerald-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-emerald-900 text-lg">{isEn ? 'After KHEPRA EXPERTS' : 'Après KHEPRA EXPERTS'}</h3>
            </div>
            <ul className="space-y-2">
              {[
                isEn ? '100% BCEAO compliance certification obtained — 23 gaps closed, 0 major findings in next inspection' : 'Certification de conformité BCEAO 100% obtenue — 23 écarts résorbés, 0 réserve majeure à l\'inspection suivante',
                isEn ? '3 specialized committees operational (Audit, Risk, Remuneration) — fully Circulaire 01-2017/CB compliant' : '3 comités spécialisés opérationnels (Audit, Risques, Rémunérations) — pleinement conformes Circulaire 01-2017/CB',
                isEn ? '+18% solvency ratio improvement — exceeding regulatory minimum with comfortable buffer' : 'Ratio de solvabilité amélioré de +18% — dépassant le minimum réglementaire avec coussin confortable',
                isEn ? 'Modern governance framework — reference model for the UEMOA sub-region' : 'Cadre de gouvernance moderne — modèle de référence dans la sous-région UEMOA',
                isEn ? 'AML/CFT fully compliant — automated PEP screening, robust reporting to CENTIF' : 'LBC/FT pleinement conforme — screening PPE automatisé, reporting robuste à la CENTIF',
                isEn ? '2 new institutional investors attracted — solvency improvement as key deciding factor' : '2 nouveaux investisseurs institutionnels attirés — amélioration de la solvabilité comme facteur décisif',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-emerald-800">
                  <i className="ri-check-line text-emerald-500 mt-0.5 shrink-0"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-bar-chart-grouped-line text-emerald-600"></i>
            {isEn ? 'Key Performance Indicators' : 'Indicateurs Clés de Performance'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: '100%', label: isEn ? 'BCEAO compliance achieved — 23/23 gaps closed' : 'Conformité BCEAO — 23/23 écarts résorbés', icon: 'ri-shield-check-line' },
              { value: '+18%', label: isEn ? 'Solvency ratio improvement in 6 months' : 'Amélioration ratio solvabilité en 6 mois', icon: 'ri-line-chart-line' },
              { value: '500M', label: isEn ? 'FCFA — Sanctions avoided' : 'FCFA — Sanctions évitées', icon: 'ri-money-dollar-circle-line' },
            ].map((kpi, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-emerald-200 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                  <i className={`${kpi.icon} text-emerald-600 text-lg`}></i>
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-600 mb-1">{kpi.value}</div>
                <div className="text-xs text-gray-600 leading-tight">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Conclusion({ isEn }: { isEn: boolean }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 mb-3">
            <i className="ri-lightbulb-line"></i>
            {isEn ? 'CONCLUSION' : 'CONCLUSION'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isEn ? 'Key Takeaways — Why Pre-Inspection Matters' : 'Enseignements — Pourquoi la Pré-Inspection est Déterminante'}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              {isEn
                ? 'This case study crystallizes a fundamental truth about banking supervision in the UEMOA zone: the difference between a favorable inspection outcome and major adverse findings is not the quality of the bank\'s operations — it is the quality of its preparation. The 23 gaps we identified were not created by the bank\'s management; they accumulated over 15 years of incremental regulatory evolution without corresponding governance adaptation.'
                : 'Cette étude de cas cristallise une vérité fondamentale de la supervision bancaire en zone UEMOA : la différence entre une inspection favorable et des réserves majeures n\'est pas la qualité des opérations de la banque — c\'est la qualité de sa préparation. Les 23 écarts que nous avons identifiés n\'ont pas été créés par la direction de la banque ; ils se sont accumulés sur 15 ans d\'évolution réglementaire incrémentale sans adaptation correspondante de la gouvernance.'}
            </p>
            <p>
              {isEn
                ? 'KHEPRA EXPERTS\' pre-inspection methodology transforms regulatory compliance from a reactive scramble into a proactive strategic investment. The 6-month timeline — from diagnostic to dry run — is ambitious but achievable when the methodology is rigorous, the team is experienced, and the institution\'s leadership is committed. The return on this investment is measured not just in sanctions avoided (500M FCFA) but in institutional credibility gained: the bank is now considered a governance benchmark in the sub-region and has attracted 2 new institutional investors.'
                : 'La méthodologie de pré-inspection de KHEPRA EXPERTS transforme la conformité réglementaire d\'une course réactive en un investissement stratégique proactif. Le délai de 6 mois — du diagnostic à la répétition générale — est ambitieux mais atteignable quand la méthodologie est rigoureuse, l\'équipe expérimentée et la direction de l\'institution engagée. Le retour sur cet investissement se mesure non seulement en sanctions évitées (500M FCFA) mais en crédibilité institutionnelle acquise : la banque est désormais considérée comme une référence de gouvernance dans la sous-région et a attiré 2 nouveaux investisseurs institutionnels.'}
            </p>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200">
              <p className="text-gray-900 font-bold text-base md:text-lg">
                {isEn
                  ? 'Our conviction: « No theoretical reports. Rigorous diagnostics. Executable deliverables. Measurable results. »'
                  : 'Notre conviction : « Pas de rapport théorique. Des diagnostics rigoureux. Des livrables exécutoires. Des résultats mesurables. »'}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {isEn ? '— KHEPRA EXPERTS, Regulatory Engineering for Francophone Africa\'s Banking Sector since 2003' : '— KHEPRA EXPERTS, Ingénierie Réglementaire pour le Secteur Bancaire d\'Afrique Francophone depuis 2003'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection({ isEn }: { isEn: boolean }) {
  const faqs = isEn
    ? [
        {
          q: 'What does a BCEAO pre-inspection involve for UEMOA banks?',
          a: 'A BCEAO pre-inspection is a preventive compliance audit that simulates an actual BCEAO inspection mission. It covers governance (Circulaire 01-2017/CB), prudential ratios (Circulaire 03-2017/CB — Basel II/III), internal control, AML/CFT compliance (Directive 02-2015), credit portfolio quality, and operational risk management. KHEPRA EXPERTS identifies gaps before the official inspector does, enabling corrective action under controlled conditions rather than under regulatory pressure.',
        },
        {
          q: 'What are the most common BCEAO compliance gaps for regional banks in UEMOA?',
          a: 'Based on 50+ missions, the 3 most common gaps are: (1) Governance — non-compliance with Circulaire 01-2017/CB (insufficient independent directors, missing specialized committees, undocumented self-assessments); (2) Prudential ratios — incorrect Basel II/III calculation methodologies, insufficient capital buffers, inadequate loan loss provisioning; (3) Internal control — weak segregation of duties, inadequate audit trails, insufficient IT general controls. These 3 areas represent 70%+ of major findings in BCEAO inspection reports.',
        },
        {
          q: 'How long does a full BCEAO compliance remediation take?',
          a: 'A full remediation program typically takes 4-8 months, depending on the institution\'s size and the severity of gaps. KHEPRA EXPERTS structures the intervention in 3 phases: Diagnostic (3-4 weeks), Remediation (10-16 weeks), and Pre-Inspection Dry Run (2-3 weeks). The West African regional bank in this case study achieved full compliance in 6 months — closing 23 critical gaps, restructuring its Board, and achieving a +18% solvency ratio improvement.',
        },
      ]
    : [
        {
          q: 'Qu\'implique une pré-inspection BCEAO pour les banques UEMOA ?',
          a: 'Une pré-inspection BCEAO est un audit de conformité préventif qui simule une mission d\'inspection BCEAO réelle. Elle couvre la gouvernance (Circulaire 01-2017/CB), les ratios prudentiels (Circulaire 03-2017/CB — Bâle II/III), le contrôle interne, la conformité LBC/FT (Directive 02-2015), la qualité du portefeuille de crédit et la gestion des risques opérationnels. KHEPRA EXPERTS identifie les écarts avant que l\'inspecteur officiel ne le fasse, permettant des actions correctives en conditions maîtrisées plutôt que sous pression réglementaire.',
        },
        {
          q: 'Quels sont les écarts de conformité BCEAO les plus fréquents pour les banques régionales ?',
          a: 'Sur la base de 50+ missions, les 3 écarts les plus fréquents sont : (1) Gouvernance — non-conformité à la Circulaire 01-2017/CB (administrateurs indépendants insuffisants, comités spécialisés absents, auto-évaluations non documentées) ; (2) Ratios prudentiels — méthodologies de calcul Bâle II/III incorrectes, coussins de fonds propres insuffisants, provisionnement inadéquat ; (3) Contrôle interne — faible séparation des fonctions, pistes d\'audit inadéquates, contrôles généraux informatiques insuffisants. Ces 3 domaines représentent 70%+ des réserves majeures dans les rapports d\'inspection BCEAO.',
        },
        {
          q: 'Combien de temps prend une remédiation complète de conformité BCEAO ?',
          a: 'Un programme complet de remédiation prend typiquement 4 à 8 mois, selon la taille de l\'institution et la sévérité des écarts. KHEPRA EXPERTS structure l\'intervention en 3 phases : Diagnostic (3-4 semaines), Remédiation (10-16 semaines) et Répétition générale pré-inspection (2-3 semaines). La banque régionale ouest-africaine de cette étude de cas a atteint la conformité complète en 6 mois — résorbant 23 écarts critiques, restructurant son Conseil et améliorant son ratio de solvabilité de +18%.',
        },
      ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{isEn ? 'Frequently Asked Questions' : 'Questions Fréquentes'}</h2>
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

function CTASection({ isEn, contactRef }: { isEn: boolean; contactRef: React.RefObject<HTMLDivElement | null> }) {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-end pr-8">
        <span className="font-playfair text-[16rem] font-bold text-emerald-200 leading-none" style={{ WebkitTextStroke: '2px currentColor', WebkitTextFillColor: 'transparent' }}>
          BCEAO
        </span>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-6">
          <i className="ri-chat-quote-line text-emerald-400 text-sm"></i>
          <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
            {isEn ? 'Facing a BCEAO inspection?' : 'Inspection BCEAO imminente ?'}
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
          {isEn
            ? 'Secure your BCEAO compliance before the inspector arrives'
            : 'Sécurisez votre conformité BCEAO avant que l\'inspecteur n\'arrive'}
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {isEn
            ? 'KHEPRA EXPERTS delivers complete pre-inspection diagnostics, governance restructuring, and Basel II/III compliance for banks, SFDs, and EMFs. A free 30-minute strategic consultation to assess your regulatory exposure.'
            : 'KHEPRA EXPERTS livre des diagnostics pré-inspection complets, restructuration de gouvernance et conformité Bâle II/III pour banques, SFD et EMF. Une consultation stratégique gratuite de 30 minutes pour évaluer votre exposition réglementaire.'}
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
            trackingLocation="pre_inspection_bceao_case_study_cta"
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