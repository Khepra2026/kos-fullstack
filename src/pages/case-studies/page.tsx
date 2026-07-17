import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { LOGO_IMAGE_URL } from '@/utils/schemaMarkup';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { CaseStudiesHero } from './components/CaseStudiesHero';
import { CaseStudiesGrid } from './components/CaseStudiesGrid';
import { CaseStudiesCTA } from './components/CaseStudiesCTA';
import { useTranslation } from 'react-i18next';
import { caseStudies } from '@/mocks/caseStudies';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

// Image OG dédiée aux études de cas (générée via Stable Diffusion)
const OG_CASE_STUDIES_IMAGE = 'https://readdy.ai/api/search-image?query=professional%20african%20business%20consulting%20team%20presenting%20measurable%20results%20and%20case%20studies%20with%20charts%20graphs%20and%20KPI%20dashboards%20in%20modern%20boardroom%20setting%20representing%20financial%20advisory%20success%20stories%20in%20West%20and%20Central%20Africa%20with%20warm%20professional%20lighting%20and%20corporate%20excellence&width=1200&height=630&seq=og-case-studies-khepra&orientation=landscape';

const buildCaseStudiesSchema = (isEn: boolean) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/case-studies#itemlist`,
      name: isEn
        ? 'Case Studies – KHEPRA EXPERTS'
        : 'Études de cas – KHEPRA EXPERTS',
      description: isEn
        ? '15 real missions with measurable KPIs across banks, microfinance, SMEs and public sector in West and Central Africa.'
        : "15 missions réelles avec KPIs mesurables dans les banques, microfinance, PME et secteur public en Afrique de l'Ouest et Centrale.",
      url: `${SITE_URL}/case-studies`,
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((cs, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: isEn ? cs.clientEn : cs.client,
        description: isEn ? cs.contextEn : cs.contextFr,
        url: `${SITE_URL}/case-studies`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/case-studies#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: isEn ? 'Case Studies' : 'Études de cas',
          item: `${SITE_URL}/case-studies`,
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/case-studies#webpage`,
      url: `${SITE_URL}/case-studies`,
      name: isEn
        ? '15 Case Studies – Measurable Results by Mission | KHEPRA EXPERTS'
        : '15 Études de cas – Résultats chiffrés par mission | KHEPRA EXPERTS',
      description: isEn
        ? 'Discover 15 KHEPRA EXPERTS case studies: real missions with measurable KPIs across banks, microfinance, SMEs and public sector in West and Central Africa.'
        : "Découvrez les 15 études de cas KHEPRA EXPERTS : missions réelles avec KPIs mesurables dans les banques, microfinance, PME et secteur public en Afrique de l'Ouest et Centrale.",
      inLanguage: isEn ? 'en-US' : 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      breadcrumb: { '@id': `${SITE_URL}/case-studies#breadcrumb` },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'KHEPRA EXPERTS',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO_IMAGE_URL, width: 250, height: 60 },
      address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
    },
  ],
});

export default function CaseStudiesPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const ogTitle = isEn
    ? 'Case Studies | Governance, BCEAO Compliance & Investment Readiness Africa'
    : 'Études de Cas | Gouvernance, Conformité BCEAO & Investment Readiness Afrique';

  const ogDescription = isEn
    ? '15 real case studies: governance, BCEAO compliance, due diligence, investment readiness. Measurable KPIs, before/after results. Francophone Africa.'
    : "15 études de cas réelles : gouvernance, conformité BCEAO, due diligence, investment readiness. Résultats mesurables, KPIs, avant/après. Afrique francophone.";

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={ogTitle}
        description={isEn
          ? '15 KHEPRA EXPERTS case studies: measurable KPIs across banks, microfinance and SMEs in West & Central Africa. Concrete results from 22 years of field advisory.'
          : '15 études de cas Khepra Experts avec KPIs mesurables : banques, microfinance et PME en Afrique de l\'Ouest et Centrale. Résultats concrets, 22 ans de missions terrain.'}
        keywords={isEn
          ? '15 case studies Africa, financial consulting results, microfinance governance, SME fundraising Africa, BCEAO compliance, financial inclusion strategy, West Africa missions'
          : "15 études de cas Afrique, résultats conseil financier, gouvernance microfinance, levée de fonds PME Afrique, conformité BCEAO, stratégie inclusion financière, missions Afrique de l'Ouest"}
        canonicalPath="/case-studies"
        ogType="website"
        ogImage={OG_IMAGES.CASE_STUDIES}
        ogImageAlt={isEn
          ? '15 KHEPRA EXPERTS Case Studies – Measurable Results in Africa'
          : '15 Études de cas KHEPRA EXPERTS – Résultats chiffrés en Afrique'}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        twitterLabel1={isEn ? 'Case studies' : 'Études de cas'}
        twitterData1={`${caseStudies.length}+`}
        twitterLabel2={isEn ? 'Countries covered' : 'Pays couverts'}
        twitterData2="15+"
        structuredData={buildCaseStudiesSchema(isEn)}
        hreflangLinks={STATIC_HREFLANG_MAP['/case-studies/']}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <Breadcrumb
            variant="dark"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'Case Studies' : 'Études de cas' },
            ]}
          />
        </div>
      </div>

      <main>
        <CaseStudiesHero />
        <CaseStudiesGrid />
        <CaseStudiesCTA />
      </main>

      <Footer />
    </div>
  );
}