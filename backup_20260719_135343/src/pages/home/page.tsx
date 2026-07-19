/* ============================================================
   KOS — Intelligence Réglementaire Afrique Francophone
   Homepage v5.1 — Optimisé Performance (Juillet 2026)
   Sections lourdes en React.lazy() pour réduire le TBT
   ============================================================ */
import { lazy, Suspense } from 'react';
import Navigation from '';
import HeroUltraLeadMagnet from '';
import HomeRAGSearch from '';
import TrustSignals from '';
import Approach from '';
import { SeoHead } from '@/components/feature/SeoHead';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES } from '@/components/feature/OgImages';
import { useTranslation } from 'react-i18next';
import LazySection from '@/components/base/LazySection';

// ═══════════════════════════════════════════════════════════════
// REACT.LAZY() — Sections lourdes chargées à la demande
// Ces composants ne sont PAS inclus dans le bundle initial.
// Ils sont téléchargés seulement quand le navigateur est idle
// et que l'utilisateur scrolle vers la section.
// ═══════════════════════════════════════════════════════════════

// Groupe 1 — Business Units + Big Four (très lourd, ~40KB+ JS)
const PlatformBusinessUnits = lazy(() => import('./components/PlatformBusinessUnits'));
const BigFourCharter = lazy(() => import('./components/BigFourCharter'));
const HomeKhepraBusinessReview = lazy(() => import('./components/HomeKhepraBusinessReview'));

// Groupe 2 — UEMOA/CEMAC (cartes, données géographiques)
const HomeUEMOA = lazy(() => import('./components/HomeUEMOA'));
const HomeCEMAC = lazy(() => import('./components/HomeCEMAC'));

// Groupe 3 — Observatoire + Ressources
const HomeObservatoireAgrements = lazy(() => import('./components/HomeObservatoireAgrements'));
const HomeRessourcesStrategiques = lazy(() => import('./components/HomeRessourcesStrategiques'));

// Groupe 4 — Conversion + Lead Magnets (formulaires, interactif)
const ConversionTunnel = lazy(() => import('./components/ConversionTunnel'));
const UltraLeadMagnetsHome = lazy(() => import('./components/UltraLeadMagnetsHome'));

// Groupe 5 — Confiance + KPIs + Case Studies (social proof lourd)
const PourquoiNousFaireConfiance = lazy(() => import('./components/PourquoiNousFaireConfiance'));
const HomeKPIs = lazy(() => import('./components/HomeKPIs').then(m => ({ default: m.HomeKPIs })));
const HomeCaseStudies = lazy(() => import('./components/HomeCaseStudies'));

// Groupe 6 — Veille + Blog (affichage de données)
const VeilleReglementaire = lazy(() => import('@/components/feature/VeilleReglementaire'));
const HomeBlogPreview = lazy(() => import('./components/HomeBlogPreview').then(m => ({ default: m.HomeBlogPreview })));
const HomeUpcomingPublications = lazy(() => import('./components/HomeUpcomingPublications').then(m => ({ default: m.HomeUpcomingPublications })));
const HomePublicationAlertSubscribe = lazy(() => import('./components/HomePublicationAlertSubscribe'));

// Groupe 7 — Chat AI (widget lourd)
const aIChatSection = lazy(() => import('./components/aIChatSection'));

// Groupe 8 — Bas de page (poids modéré mais below-fold)
const HomeNewsletter = lazy(() => import('./components/HomeNewsletter').then(m => ({ default: m.HomeNewsletter })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const ExitIntentPopup = lazy(() => import('./components/ExitIntentPopup').then(m => ({ default: m.ExitIntentPopup })));

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

// Skeleton léger pour Suspense — pas d'animation lourde, juste un placeholder
function SectionFallback({ minHeight = '300px' }: { minHeight?: string }) {
  return (
    <div
      className="w-full bg-background-100/50"
      style={{ minHeight, contain: 'layout style paint' }}
    />
  );
}

export default function HomePage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('en') ? 'en-US' : 'fr-FR';

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'KOS — Régulation Financière, Gouvernance, Climat ESG & KBR-Model — Afrique Francophone',
        description: 'KOS est un dispositif institutionnel pour l\'Afrique Francophone. 4 Business Units reconfigurées : Régulation Financière & Conformité (BU1), Gouvernance & Due Diligence (BU2), Climat, Transition & ESG (BU3), KBR-Model & Intelligence d\'Affaires (BU4). 17 pays UEMOA/CEMAC.',
        inLanguage: ['fr-FR', 'en-US'],
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KOS — KHEPRA EXPERTS',
        alternateName: 'Financial Regulation, Governance, Climate ESG & KBR-Model — Francophone Africa',
        url: SITE_URL,
        telephone: '+22893984909',
        email: 'contact@khepraexperts.com',
        foundingDate: '2002',
        description: 'KOS est un dispositif institutionnel pour l\'Afrique Francophone. 4 Business Units reconfigurées : Régulation Financière & Conformité (BU1 — Bouclier Réglementaire), Gouvernance & Due Diligence (BU2 — Observatoire de la Gouvernance), Climat, Transition & ESG (BU3 — Ingénierie de Décarbonation), KBR-Model & Intelligence d\'Affaires (BU4 — Monétisation PI). 22 ans d\'expertise, 17 pays UEMOA/CEMAC.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'LOGOGOMÈ, Rue CARREFOUR AISED',
          addressLocality: 'Lomé',
          addressRegion: 'Maritime',
          postalCode: '00228',
          addressCountry: 'TG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 6.1375,
          longitude: 1.2123,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
        areaServed: [
          { '@type': 'Country', name: 'Togo' },
          { '@type': 'Country', name: 'Bénin' },
          { '@type': 'Country', name: 'Côte d\'Ivoire' },
          { '@type': 'Country', name: 'Sénégal' },
          { '@type': 'Country', name: 'Burkina Faso' },
          { '@type': 'Country', name: 'Cameroun' },
          { '@type': 'Country', name: 'Gabon' },
          { '@type': 'Country', name: 'Congo' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '4 Business Units — Régulation Financière, Gouvernance, Climat ESG & KBR-Model',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'BU1 — Régulation Financière & Conformité : Bouclier Réglementaire — BCEAO/COBAC, agrément, LBC/FT, veille 24/7',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'BU2 — Gouvernance & Due Diligence : Observatoire de la Gouvernance — Performance Boards, DD Full Scope, KOS Investability Score™',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'BU3 — Climat, Transition & ESG : Ingénierie de Décarbonation — Bilan carbone, stratégie ISSB/GRI/CSRD, financements verts',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'BU4 — KBR-Model & Intelligence d\'Affaires : Monétisation PI — Études sectorielles, monographies, rapports High-Ticket — 3 niveaux KBR',
              },
            },
          ],
        },
        sameAs: ['https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/', 'https://www.linkedin.com/company/khepra-experts', 'https://x.com/KhepraExperts', 'https://www.wikidata.org/wiki/Q130000000', 'https://www.crunchbase.com/organization/khepra-experts'],
        founder: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person-simda`,
          name: 'SIMDA Essoyomèwè',
          givenName: 'Essoyomèwè',
          familyName: 'SIMDA',
          jobTitle: 'Managing Partner & Fondateur',
          worksFor: { '@type': 'Organization', name: 'KOS — KHEPRA EXPERTS', url: SITE_URL },
          sameAs: 'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
          knowsAbout: [
            'Intelligence réglementaire Afrique',
            'Solutions technologiques réglementaires',
            'Due diligence réglementaire',
            'Observatoire régulation financière',
            'Conformité BCEAO COBAC',
            'Scoring de conformité',
            'Gouvernance risques Afrique',
            'BCEAO Circulaire 03-2017',
            'BEAC Règlement COBAC',
            'OHADA Acte Uniforme',
            'CIMA Code des Assurances',
            'Bâle II/III',
            'LBC/FT GAFI',
          ],
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: 'KOS | Régulation Financière, Gouvernance, Climat ESG & KBR-Model — Afrique Francophone',
        description: 'KOS délivre l\'excellence réglementaire aux institutions financières africaines à travers 4 Business Units : Régulation Financière, Gouvernance, Climat ESG, KBR-Model. 17 pays, 22 ans d\'expertise. Tout sur devis confidentiel.',
        inLanguage: currentLang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          ],
        },
      },
    ],
  };

  return (
    <>
      <SeoHead
        title="KOS — Régulation, Gouvernance, ESG & KBR | Afrique Francophone"
        description="KOS : plateforme d'intelligence réglementaire pour l'Afrique francophone. 4 Business Units, 17 pays UEMOA/CEMAC, 22 ans d'expertise. Devis confidentiel sur mesure."
        keywords="intelligence réglementaire Afrique, gouvernance due diligence, conformité BCEAO, ESG climat, KBR-Model, régulation financière, UEMOA, CEMAC, Khepra Experts"
        canonicalPath="/"
        ogType="website"
        ogImage={OG_IMAGES.HOME}
        ogImageWidth="1200"
        ogImageHeight="630"
        ogImageAlt="KOS — Régulation Financière, Gouvernance, Climat ESG & KBR-Model — Afrique Francophone : 4 Business Units"
        schemaJson={homeSchema}
        hreflangLinks={STATIC_HREFLANG_MAP['/']}
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        <main id="main-content" className="page-enter">
          {/* 1. HERO — Critique LCP, rendu immédiat */}
          <HeroUltraLeadMagnet />

          {/* 2. KHEPRA BUSINESS REVIEW — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="500px" />}>
            <LazySection id="khepra-business-review-section" minHeight="500px">
              <HomeKhepraBusinessReview />
            </LazySection>
          </Suspense>

          {/* 3. BIG FOUR CHARTER — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="600px" />}>
            <LazySection id="big-four-charter-section" minHeight="600px">
              <BigFourCharter />
            </LazySection>
          </Suspense>

          {/* 4. RECHERCHE RAG — Léger, rendu immédiat */}
          <HomeRAGSearch />

          {/* 4b. KOS AI CHAT — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="500px" />}>
            <LazySection id="kos-ai-chat-section" minHeight="500px">
              <aIChatSection />
            </LazySection>
          </Suspense>

          {/* 5. 4 BUSINESS UNITS — Lazy (très lourd) */}
          <Suspense fallback={<SectionFallback minHeight="600px" />}>
            <LazySection id="business-units-section" minHeight="600px">
              <PlatformBusinessUnits />
            </LazySection>
          </Suspense>

          {/* 5b. ZONES UEMOA & CEMAC — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="600px" />}>
            <LazySection id="uemoa-section" minHeight="600px">
              <HomeUEMOA />
            </LazySection>
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="600px" />}>
            <LazySection id="cemac-section" minHeight="600px">
              <HomeCEMAC />
            </LazySection>
          </Suspense>

          {/* 6. HUBS — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="500px" />}>
            <LazySection id="nouveaux-hubs" minHeight="500px">
              <HomeObservatoireAgrements />
            </LazySection>
          </Suspense>

          {/* 7. ULTRA LEAD MAGNETS — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="400px" />}>
            <UltraLeadMagnetsHome />
          </Suspense>

          {/* 7b. RESSOURCES STRATÉGIQUES — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="600px" />}>
            <LazySection id="ressources-strategiques" minHeight="600px">
              <HomeRessourcesStrategiques />
            </LazySection>
          </Suspense>

          {/* 8. POURQUOI NOUS FAIRE CONFIANCE — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="700px" />}>
            <LazySection id="pourquoi-nous-faire-confiance" minHeight="700px">
              <PourquoiNousFaireConfiance />
            </LazySection>
          </Suspense>

          {/* 9. KPIs — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="350px" />}>
            <LazySection id="kpis" minHeight="350px">
              <HomeKPIs />
            </LazySection>
          </Suspense>

          {/* 10. TRUST SIGNALS — Léger, rendu immédiat */}
          <TrustSignals />

          {/* 11. CONVERSION TUNNEL — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="700px" />}>
            <LazySection id="conversion-tunnel" minHeight="700px">
              <ConversionTunnel />
            </LazySection>
          </Suspense>

          {/* 12. APPROACH — Léger, rendu immédiat */}
          <LazySection id="approach" minHeight="500px">
            <Approach />
          </LazySection>

          {/* 13. ÉTUDES DE CAS — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="600px" />}>
            <LazySection id="case-studies" minHeight="600px">
              <HomeCaseStudies />
            </LazySection>
          </Suspense>

          {/* 14. VEILLE RÉGLEMENTAIRE — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="500px" />}>
            <LazySection id="veille" minHeight="500px">
              <VeilleReglementaire />
            </LazySection>
          </Suspense>

          {/* 14b. PUBLICATIONS À PARAÎTRE — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="400px" />}>
            <LazySection id="upcoming-publications" minHeight="400px">
              <HomeUpcomingPublications />
            </LazySection>
          </Suspense>

          {/* 14c. ABONNEMENT ALERTES PUBLICATION — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="400px" />}>
            <LazySection id="publication-alert-subscribe" minHeight="400px">
              <HomePublicationAlertSubscribe />
            </LazySection>
          </Suspense>

          {/* 15. ARTICLES — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="400px" />}>
            <LazySection id="blog" minHeight="400px">
              <HomeBlogPreview />
            </LazySection>
          </Suspense>

          {/* 16. NEWSLETTER — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="400px" />}>
            <LazySection id="newsletter" minHeight="400px">
              <HomeNewsletter />
            </LazySection>
          </Suspense>

          {/* 17. CONTACT — Lazy */}
          <Suspense fallback={<SectionFallback minHeight="500px" />}>
            <LazySection id="contact" minHeight="500px">
              <Contact />
            </LazySection>
          </Suspense>
        </main>

        {/* FOOTER — Lazy */}
        <Suspense fallback={<SectionFallback minHeight="300px" />}>
          <LazySection id="footer" minHeight="300px">
            <Footer />
          </LazySection>
        </Suspense>

        {/* EXIT INTENT POPUP — Lazy */}
        <Suspense fallback={null}>
          <ExitIntentPopup />
        </Suspense>
      </div>
    </>
  );
}



