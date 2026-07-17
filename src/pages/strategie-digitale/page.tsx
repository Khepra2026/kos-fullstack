import { SeoHead } from '@/components/feature/SeoHead';
import { LOGO_IMAGE_URL } from '@/utils/schemaMarkup';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import StrategieHero from './components/StrategieHero';
import StrategieSEO from './components/StrategieSEO';
import StrategieLinkedIn from './components/StrategieLinkedIn';
import StrategieFunnel from './components/StrategieFunnel';
import StrategieGEO from './components/StrategieGEO';
import StrategieBranding from './components/StrategieBranding';
import StrategieBlogPlan from './components/StrategieBlogPlan';
import StrategieKPI from './components/StrategieKPI';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const strategieSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/strategie-digitale#webpage`,
      url: `${SITE_URL}/strategie-digitale`,
      name: 'Stratégie Digitale Khepra Experts | SEO, GEO, LinkedIn & Conversion',
      description: 'Stratégie digitale complète pour positionner Khepra Experts comme cabinet Investment & ESG Advisory de référence. 15 mots-clés SEO, contenu optimisé IA, funnel LinkedIn, KPIs mesurables.',
      inLanguage: 'fr-FR',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Khepra Experts'
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Stratégie Digitale', item: `${SITE_URL}/strategie-digitale` }
        ]
      }
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Khepra Experts',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_IMAGE_URL,
        width: 250,
        height: 60
      }
    }
  ]
};

export default function StrategieDigitalePage() {
  return (
    <>
      <SeoHead
        title="Stratégie Digitale Khepra Experts | SEO, GEO, LinkedIn & Conversion"
        description="Stratégie digitale complète pour positionner Khepra Experts comme cabinet Investment & ESG Advisory de référence. 15 mots-clés SEO, contenu optimisé IA, funnel LinkedIn, KPIs mesurables."
        keywords="stratégie digitale cabinet conseil, SEO cabinet investisseurs Afrique, référencement IA, GEO content, LinkedIn stratégie, tunnel conversion, marketing B2B Afrique"
        canonicalPath="/strategie-digitale"
        ogType="website"
        ogImage={OG_IMAGES.INSIGHTS}
        ogImageAlt="Stratégie Digitale Khepra Experts | SEO, GEO, LinkedIn & Conversion"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        schemaJson={strategieSchema}
        noindex
      />
      <Navigation />
      <main id="main-content">
        <StrategieHero />
        <StrategieBranding />
        <StrategieSEO />
        <StrategieGEO />
        <StrategieLinkedIn />
        <StrategieBlogPlan />
        <StrategieFunnel />
        <StrategieKPI />
      </main>
      <Footer />
    </>
  );
}