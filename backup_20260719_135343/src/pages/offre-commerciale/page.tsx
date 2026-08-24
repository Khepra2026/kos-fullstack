import { useBrochureDownload } from '@/hooks/useBrochureDownload';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import OffreHero from '';
import OffreProbleme from '';
import OffreSolution from '';
import OffreDiagnostic from '';
import OffreServices from '';
import OffrePourquoi from '';
import OffreResultats from '';
import OffreCTA from '';
import OffreSocialShare from '';
import OffreMethodology from '';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const offreSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/offre-commerciale#webpage`,
      url: `${SITE_URL}/offre-commerciale`,
      name: 'Offre Commerciale KHEPRA EXPERTS — 4 Business Units 100% Big Four : Régulation, Gouvernance, ESG, KBR',
      description: '4 Business Units exclusives : Régulation Financière & Conformité (BU1), Gouvernance & Due Diligence (BU2), Climat/Transition/ESG (BU3), KBR-Model & Intelligence d\'Affaires (BU4). Standards Big Four adaptés aux réalités UEMOA/CEMAC. Diagnostic gratuit. Tout sur devis.',
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Offre Commerciale', item: `${SITE_URL}/offre-commerciale` },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/offre-commerciale#service-bu1`,
      name: 'BU1 — Régulation Financière & Conformité (Bouclier Réglementaire)',
      serviceType: 'Regulatory Compliance Advisory',
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        url: SITE_URL,
        telephone: '+22893984909',
        email: 'contact@khepraexperts.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lomé',
          addressRegion: 'Maritime',
          addressCountry: 'TG',
        },
      },
      areaServed: [
        { '@type': 'Country', name: 'Togo' },
        { '@type': 'Country', name: 'Bénin' },
        { '@type': 'Country', name: "Côte d'Ivoire" },
        { '@type': 'Place', name: "Afrique de l'Ouest" },
        { '@type': 'Place', name: 'UEMOA' },
        { '@type': 'Place', name: 'CEMAC' },
      ],
      description: 'Bouclier réglementaire pour banques, assurances et institutions financières. Audit à blanc BCEAO/COBAC 95+ points de contrôle, plan de remédiation, dossier de preuves. Conformité GAFI, OHADA, IFRS.',
      offers: {
        '@type': 'Offer',
        name: 'Diagnostic Conformité Gratuit (8 minutes)',
        price: '0',
        priceCurrency: 'XOF',
        description: 'Évaluez votre niveau de conformité réglementaire en 8 minutes. Score /100, identification des écarts critiques et recommandations.',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/offre-commerciale#service-bu2`,
      name: 'BU2 — Gouvernance & Due Diligence',
      serviceType: 'Governance & Due Diligence Advisory',
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
      },
      areaServed: [
        { '@type': 'Place', name: 'UEMOA' },
        { '@type': 'Place', name: 'CEMAC' },
      ],
      description: 'Audit de performance des Boards, due diligence pré-acquisition, détection des conflits. Standards COSO, ISO 37000, OHADA AUSCGIE. Rapports red flags et recommandations de négociation.',
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/offre-commerciale#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Qu\'est-ce que la Direction Financière Externalisée (DAF) ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La DAF externalisée consiste à confier la gestion financière de votre entreprise à un expert externe, sans les coûts d\'un directeur financier permanent. KHEPRA EXPERTS vous accompagne dans la structuration de votre gouvernance, le contrôle interne et l\'optimisation de vos coûts.',
          },
        },
        {
          '@type': 'Question',
          name: 'Le diagnostic financier gratuit est-il vraiment sans engagement ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, le diagnostic financier de 30 minutes est totalement gratuit et sans engagement. Il vous permet d\'identifier vos faiblesses financières et de définir des actions concrètes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Dans quels pays KHEPRA EXPERTS intervient-il ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "KHEPRA EXPERTS intervient principalement au Togo, au Bénin et en Côte d'Ivoire, avec une expertise régionale couvrant l'ensemble de l'Afrique de l'Ouest (UEMOA/BCEAO) et l'Afrique Centrale (CEMAC).",
          },
        },
      ],
    },
  ],
};

export default function OffreCommercialePage() {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { handleDownload, isDownloading } = useBrochureDownload('other');

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <SeoHead
        title="Offre Commerciale KHEPRA EXPERTS — 4 Business Units 100% Big Four · Régulation · Gouvernance · ESG · KBR"
        description="4 Business Units exclusives : Régulation Financière & Conformité, Gouvernance & Due Diligence, Climat/ESG, KBR-Model. Standards Big Four adaptés aux réalités UEMOA/CEMAC. Diagnostic gratuit. Tout sur devis confidentiel."
        keywords="business units KHEPRA EXPERTS, régulation financière UEMOA, gouvernance due diligence afrique, ESG décarbonation, KBR model intelligence affaires, conformité BCEAO COBAC, diagnostic gratuit, devis confidentiel"
        canonicalPath="/offre-commerciale"
        ogType="website"
        ogImage={OG_IMAGES.SERVICES}
        ogImageAlt="Offre Commerciale KHEPRA EXPERTS — 4 Business Units 100% Big Four"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        schemaJson={offreSchema}
      />

      <Navigation />

      {/* Sticky bar urgence */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)', borderTop: '2px solid #d4a82a' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <span className="text-white text-sm font-medium">
              Diagnostic Financier Gratuit — Offert sans engagement
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open('https://calendly.com/essochamanu/consultation-strategique-30min', '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #d4a82a 0%, #b8891a 100%)', color: '#0a1628' }}
            >
              <i className="ri-calendar-check-line" />
              Réserver un entretien
            </button>
            <a
              href="#brochure"
              onClick={(e) => { e.preventDefault(); handleDownload(); }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-white/10 no-underline"
              style={{ border: '1px solid rgba(212,168,42,0.5)', color: '#d4a82a' }}
            >
              {isDownloading ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-download-line" />}
              Brochure PDF
            </a>
          </div>
        </div>
      </div>

      <main id="main-content" className="pt-20">
        <OffreHero />
        <OffreProbleme />
        <OffreSolution />
        <OffreDiagnostic />
        <OffreServices />
        <OffreMethodology />
        <OffrePourquoi />
        <OffreResultats />
        <OffreSocialShare />
        <OffreCTA />
      </main>

      <Footer />
    </div>
  );
}



