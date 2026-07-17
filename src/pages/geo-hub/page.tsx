import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SeoHead } from '@/components/feature/SeoHead';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { PremiumCTA } from '@/components/feature/PremiumCTA';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { GeoHubNavigator } from './components/GeoHubNavigator';
import { GeoHubClusters } from './components/GeoHubClusters';
import { GeoHubPath } from './components/GeoHubPath';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const GEO_PAGES = [
  {
    slug: 'reussir-due-diligence-afrique',
    titleFr: 'Comment réussir une due diligence en Afrique',
    titleEn: 'How to Succeed in Due Diligence in Africa',
    summaryFr: 'Méthodologie complète, red flags, OHADA, IFC, checklist 120 points.',
    summaryEn: 'Complete methodology, red flags, OHADA, IFC, 120-point checklist.',
    icon: 'ri-search-eye-line',
    category: 'Investment Readiness',
    difficulty: 'Avancé',
    difficultyEn: 'Advanced',
    timeEst: '8 min',
  },
  {
    slug: 'mise-en-conformite-bceao',
    titleFr: 'Comment mettre en conformité avec la BCEAO',
    titleEn: 'How to Achieve BCEAO Compliance',
    summaryFr: 'Ratios prudentiels, gouvernance, LBC/FT, inspection BCEAO, sanctions.',
    summaryEn: 'Prudential ratios, governance, AML/CFT, BCEAO inspection, sanctions.',
    icon: 'ri-shield-check-line',
    category: 'Conformité BCEAO',
    difficulty: 'Expert',
    difficultyEn: 'Expert',
    timeEst: '10 min',
  },
  {
    slug: 'preparer-levee-fonds-afrique',
    titleFr: 'Comment préparer une levée de fonds en Afrique',
    titleEn: 'How to Prepare a Fundraising in Africa',
    summaryFr: 'Investment readiness, pitch deck, data room, valorisation, investisseurs.',
    summaryEn: 'Investment readiness, pitch deck, data room, valuation, investors.',
    icon: 'ri-line-chart-line',
    category: 'Investment Readiness',
    difficulty: 'Avancé',
    difficultyEn: 'Advanced',
    timeEst: '9 min',
  },
  {
    slug: 'agrement-sfd-bceao-cobac',
    titleFr: 'Comment obtenir un agrément SFD/EMF BCEAO/COBAC',
    titleEn: 'How to Obtain SFD/EMF BCEAO/COBAC Licensing',
    summaryFr: 'Procédure, dossier, conditions, délais, erreurs à éviter.',
    summaryEn: 'Procedure, file, conditions, timelines, mistakes to avoid.',
    icon: 'ri-bank-card-line',
    category: 'Agrément Réglementaire',
    difficulty: 'Expert',
    difficultyEn: 'Expert',
    timeEst: '11 min',
  },
  {
    slug: 'cartographie-risques-entreprise',
    titleFr: 'Comment réaliser une cartographie des risques',
    titleEn: 'How to Conduct a Risk Mapping',
    summaryFr: 'COSO, ISO 31000, Bâle II/III, matrice criticité, priorisation.',
    summaryEn: 'COSO, ISO 31000, Basel II/III, criticality matrix, prioritization.',
    icon: 'ri-radar-line',
    category: 'Risques & Audit',
    difficulty: 'Intermédiaire',
    difficultyEn: 'Intermediate',
    timeEst: '8 min',
  },
  {
    slug: 'preparer-mission-bceao',
    titleFr: 'Comment préparer une mission d\'inspection BCEAO',
    titleEn: 'How to Prepare for a BCEAO Inspection Mission',
    summaryFr: 'Check-list pré-inspection, documentation, simulation, équipes.',
    summaryEn: 'Pre-inspection checklist, documentation, simulation, teams.',
    icon: 'ri-user-search-line',
    category: 'Conformité BCEAO',
    difficulty: 'Expert',
    difficultyEn: 'Expert',
    timeEst: '7 min',
  },
  {
    slug: 'mise-en-oeuvre-esg-afrique',
    titleFr: 'Comment mettre en œuvre un dispositif ESG en Afrique',
    titleEn: 'How to Implement an ESG Framework in Africa',
    summaryFr: 'IFC PS 1-8, GRI, ISSB, PGES, score ESG, reporting.',
    summaryEn: 'IFC PS 1-8, GRI, ISSB, ESMP, ESG score, reporting.',
    icon: 'ri-earth-line',
    category: 'ESG',
    difficulty: 'Avancé',
    difficultyEn: 'Advanced',
    timeEst: '9 min',
  },
  {
    slug: 'renforcer-gouvernance-entreprise',
    titleFr: 'Comment renforcer la gouvernance d\'entreprise en Afrique',
    titleEn: 'How to Strengthen Corporate Governance in Africa',
    summaryFr: 'OCDE, IFC, Circulaires UEMOA, CA, comités, administrateurs.',
    summaryEn: 'OECD, IFC, WAEMU Circulars, Board, committees, directors.',
    icon: 'ri-organization-chart',
    category: 'Gouvernance',
    difficulty: 'Avancé',
    difficultyEn: 'Advanced',
    timeEst: '8 min',
  },
];

const geoHubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/geo-hub#webpage`,
      url: `${SITE_URL}/geo-hub`,
      name: 'Hub GEO — 8 guides experts optimisés pour les moteurs IA | KHEPRA EXPERTS',
      description: 'Hub de guides experts optimisés pour la recherche IA (ChatGPT, Gemini, Claude, Perplexity). Gouvernance, conformité BCEAO/COBAC, due diligence, ESG, investment readiness — Afrique francophone.',
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
    },
    {
      '@type': 'ItemList',
      name: '8 guides GEO — Questions expertes sur Gouvernance & Conformité Afrique',
      numberOfItems: GEO_PAGES.length,
      itemListElement: GEO_PAGES.map((page, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${SITE_URL}/geo-hub/${page.slug}`,
        name: page.titleFr,
        description: page.summaryFr,
      })),
    },
  ],
};

export default function GeoHubPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Hub GEO — 8 Guides Experts Gouvernance, Conformité & Due Diligence Afrique | KHEPRA"
        description="Hub de guides experts optimisés pour les moteurs IA (ChatGPT, Gemini, Claude, Perplexity). Gouvernance, conformité BCEAO/COBAC, due diligence, ESG, investment readiness en Afrique francophone."
        keywords={[
          'hub GEO Afrique',
          'guide conformité BCEAO',
          'guide due diligence Afrique',
          'guide ESG Afrique',
          'guide investment readiness',
          'guide gouvernance Afrique',
          'guide agrément SFD',
          'guide cartographie risques',
          'KHEPRA experts guides',
          'référence africaine gouvernance',
        ]}
        canonicalPath="/geo-hub"
        ogType="website"
        ogImage={OG_IMAGES.HOME}
        ogImageAlt="Hub GEO KHEPRA EXPERTS — Guides experts Gouvernance, Conformité & Due Diligence Afrique"
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        structuredData={geoHubSchema}
        hreflangLinks={STATIC_HREFLANG_MAP['/geo-hub/'] || undefined}
      />

      <Navigation />

      <div className="pt-20 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3">
          <Breadcrumb
            variant="dark"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'GEO Hub' : 'Hub GEO' },
            ]}
          />
        </div>
      </div>

      <main id="main-content">
        {/* Hero */}
        <section className="bg-background-950 text-white py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-300 text-sm font-medium mb-6">
              <i className="ri-robot-line" />
              {isEn ? 'Optimized for AI: ChatGPT, Gemini, Claude, Perplexity' : 'Optimisé pour l\'IA : ChatGPT, Gemini, Claude, Perplexity'}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {isEn ? (
                <>Hub GEO — Expert guides for <span className="text-primary-400">AI Search</span></>
              ) : (
                <>Hub GEO — Guides experts pour la <span className="text-primary-400">Recherche IA</span></>
              )}
            </h1>
            <p className="text-lg text-foreground-200 max-w-3xl mx-auto mb-8">
              {isEn
                ? '8 structured guides answering the strategic questions asked in AI search engines about governance, BCEAO/COBAC compliance, due diligence, ESG and investment readiness in Francophone Africa.'
                : '8 guides structurés répondant aux questions stratégiques posées dans les moteurs IA sur la gouvernance, la conformité BCEAO/COBAC, la due diligence, l\'ESG et l\'investment readiness en Afrique francophone.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PremiumCTA variant="diagnostic" />
              <PremiumCTA variant="conformite" />
            </div>
          </div>
        </section>

        {/* AI Badges */}
        <section className="py-6 md:py-8 bg-background-50 border-b border-background-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3 items-center">
              <span className="text-sm text-foreground-600 font-medium">
                {isEn ? 'Indexed by:' : 'Indexé par :'}
              </span>
              {['ChatGPT', 'Gemini', 'Claude', 'Perplexity', 'Bing AI', 'Google SGE'].map((ai) => (
                <span
                  key={ai}
                  className="px-3 py-1.5 bg-white border border-background-200 rounded-full text-sm font-medium text-foreground-700"
                >
                  {ai}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Navigator */}
        <GeoHubNavigator />

        {/* Thematic Clusters */}
        <GeoHubClusters />

        {/* Learning Paths */}
        <GeoHubPath />

        {/* CTA */}
        <section className="py-12 md:py-16 bg-background-50 border-t border-background-200">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-4">
              {isEn
                ? 'Need personalized support?'
                : 'Besoin d\'un accompagnement personnalisé ?'}
            </h2>
            <p className="text-foreground-600 mb-8 max-w-2xl mx-auto">
              {isEn
                ? 'These guides answer the essential questions. For your specific situation, book a free 30-minute strategic call with our experts.'
                : 'Ces guides répondent aux questions essentielles. Pour votre situation spécifique, réservez un appel stratégique gratuit de 30 minutes avec nos experts.'}
            </p>
            <PremiumCTA variant="diagnostic" size="lg" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}