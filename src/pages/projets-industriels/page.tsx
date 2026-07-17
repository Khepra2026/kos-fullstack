import { SeoHead } from '@/components/feature/SeoHead';
import { buildHreflang } from '@/utils/hreflang';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import ProjetsIndustrielsHero from './components/ProjetsIndustrielsHero';
import { ProjetsIndustrielsOffers } from './components/ProjetsIndustrielsOffers';
import { ProjetsIndustrielsLeadServices } from './components/ProjetsIndustrielsLeadServices';
import { ProjetsIndustrielsProcess } from './components/ProjetsIndustrielsProcess';
import { ProjetsIndustrielsTestimonials } from './components/ProjetsIndustrielsTestimonials';
import { ProjetsIndustrielsCTA } from './components/ProjetsIndustrielsCTA';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function ProjetsIndustrielsPage() {
  const projetsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/projets-industriels#webpage`,
        url: `${SITE_URL}/projets-industriels`,
        name: 'Projets Industriels & Agrobusiness | Structuration & Faisabilité Afrique | Khepra Experts',
        description: 'Cabinet spécialisé structuration de projets industriels et agro-business en Afrique francophone. Études de faisabilité intégrées, conformité ESG, standards BAD/IFC. 80+ projets structurés.',
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', url: SITE_URL, name: 'Khepra Experts' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Projets Industriels', item: `${SITE_URL}/projets-industriels` },
          ],
        },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/projets-industriels#service`,
        name: 'Structuration de Projets Industriels & Agrobusiness',
        provider: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
        },
        areaServed: {
          '@type': 'Place',
          name: 'Afrique Francophone (UEMOA, CEMAC)',
        },
        serviceType: 'Project Structuring, Feasibility Studies, ESG Compliance',
        description: 'Structuration de projets industriels et agro-business en Afrique francophone. Études de faisabilité intégrées, conformité ESG, standards BAD/IFC.',
      },
    ],
  };

  return (
    <>
      <SeoHead
        title="Projets Industriels & Agrobusiness | Structuration & Faisabilité Afrique | Khepra Experts"
        description="Cabinet spécialisé structuration de projets industriels et agro-business en Afrique francophone. Études de faisabilité intégrées, conformité ESG, standards BAD/IFC. 80+ projets structurés."
        keywords="structuration projet industriel Afrique, étude faisabilité agrobusiness, conformité ESG projet Afrique, financement projet industriel UEMOA, BAD IFC conformité projet, agrobusiness Afrique francophone, projet bankable Afrique"
        canonicalPath="/projets-industriels"
        ogType="website"
        ogImage={OG_IMAGES.PROJETS_INDUSTRIELS}
        ogImageAlt="Projets Industriels & Agrobusiness – KHEPRA EXPERTS | Structuration de projets en Afrique"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale="fr_FR"
        schemaJson={projetsSchema}
        hreflangLinks={buildHreflang('/projets-industriels')}
      />
      <Navigation />
      <main>
        <ProjetsIndustrielsHero />
        <ProjetsIndustrielsOffers />
        <ProjetsIndustrielsLeadServices />
        <ProjetsIndustrielsProcess />
        <ProjetsIndustrielsTestimonials />
        <ProjetsIndustrielsCTA />
      </main>
      <Footer />
    </>
  );
}
