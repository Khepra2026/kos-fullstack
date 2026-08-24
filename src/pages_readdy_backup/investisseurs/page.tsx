import { SeoHead } from '@/components/feature/SeoHead';
import { buildHreflang } from '@/utils/hreflang';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import InvestisseursHero from '';
import { InvestisseursOffers } from '';
import { InvestisseursLeadServices } from '';
import { InvestisseursProcess } from '';
import { InvestisseursTestimonials } from '';
import { InvestisseursCTA } from '';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function InvestisseursPage() {
  const investisseursSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/investisseurs#webpage`,
        url: `${SITE_URL}/investisseurs`,
        name: 'Investisseurs | Due Diligence & Investment Readiness Afrique | Khepra Experts',
        description: 'Cabinet spécialisé investisseurs en Afrique francophone. Due diligence, investment readiness, études de faisabilité intégrées. €500M+ de transactions évaluées. Confidentialité garantie.',
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', url: SITE_URL, name: 'Khepra Experts' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Investisseurs', item: `${SITE_URL}/investisseurs` },
          ],
        },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/investisseurs#service`,
        name: 'Due Diligence & Investment Readiness Afrique',
        provider: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
        },
        areaServed: {
          '@type': 'Place',
          name: 'Afrique Francophone (UEMOA, CEMAC)',
        },
        serviceType: 'Due Diligence, Investment Readiness, Advisory',
        description: 'Cabinet boutique spécialisé en Afrique francophone : études de faisabilité intégrées, due diligence pluridisciplinaire, structuration de projets industriels/agro-business, investment readiness.',
      },
    ],
  };

  return (
    <>
      <SeoHead
        title="Investisseurs | Khepra Experts — Due Diligence & Investment Readiness Afrique"
        description="Cabinet spécialisé investisseurs Afrique francophone. Due diligence, investment readiness, études de faisabilité. €500M+ évalués. 15 pays UEMOA/CEMAC."
        keywords="due diligence Afrique, investment readiness, fonds PE VC Afrique, étude faisabilité investissement, due diligence francophone Africa, levée fonds Afrique, audit investissement, boutique advisory Africa"
        canonicalPath="/investisseurs"
        ogType="website"
        ogImage={OG_IMAGES.INVESTISSEURS}
        ogImageAlt="Investisseurs – KHEPRA EXPERTS | Due Diligence & Investment Readiness en Afrique"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale="fr_FR"
        schemaJson={investisseursSchema}
        hreflangLinks={buildHreflang('/investisseurs')}
      />
      <Navigation />
      <main>
        <InvestisseursHero />
        <InvestisseursOffers />
        <InvestisseursLeadServices />
        <InvestisseursProcess />
        <InvestisseursTestimonials />
        <InvestisseursCTA />
      </main>
      <Footer />
    </>
  );
}



