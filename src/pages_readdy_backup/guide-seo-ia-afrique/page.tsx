import { useState, useEffect } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import GuideHero from '';
import GuideContent from '';
import GuideForm from '';
import GuideTestimonials from '';
import GuideFAQ from '';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const guideSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/guide-seo-ia-afrique#webpage`,
      url: `${SITE_URL}/guide-seo-ia-afrique`,
      name: 'Guide Exclusif – Référencement Google & IA en Afrique Francophone',
      description: 'Téléchargez gratuitement le guide SEO & IA de KHEPRA EXPERTS : stratégies de référencement pour Google, Bing et les moteurs d\'intelligence artificielle en Afrique francophone.',
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Guide SEO & IA', item: `${SITE_URL}/guide-seo-ia-afrique` },
        ],
      },
    },
    {
      '@type': 'Book',
      '@id': `${SITE_URL}/guide-seo-ia-afrique#guide`,
      name: 'Guide Exclusif – Référencement Google & IA en Afrique Francophone',
      description: 'Guide stratégique pour propulser votre entreprise en Afrique francophone grâce aux meilleures pratiques de référencement SEO et aux moteurs d\'intelligence artificielle.',
      author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
      datePublished: '2026-05-29',
      inLanguage: 'fr-FR',
      bookFormat: 'https://schema.org/EBook',
      isAccessibleForFree: true,
      url: `${SITE_URL}/guide-seo-ia-afrique`,
      image: OG_IMAGES.STRATEGIC_REPORT,
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/guide-seo-ia-afrique#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Qu\'est-ce que le référencement IA (AIO) ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le référencement IA, ou AIO (AI Optimization), consiste à optimiser votre contenu pour être cité par les moteurs d\'intelligence artificielle comme ChatGPT, Gemini et Copilot. Contrairement au SEO classique qui vise le positionnement dans Google, l\'AIO vise la visibilité dans les réponses générées par l\'IA.',
          },
        },
        {
          '@type': 'Question',
          name: 'Le guide est-il vraiment gratuit ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, le guide est entièrement gratuit. Il suffit de renseigner votre adresse email professionnelle pour recevoir le PDF immédiatement par email. Aucun paiement ni engagement n\'est requis.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quels pays d\'Afrique francophone sont couverts ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le guide couvre l\'ensemble des marchés francophones africains : UEMOA (Togo, Bénin, Côte d\'Ivoire, Burkina Faso, Sénégal, Mali, Niger, Guinée-Bissau), CEMAC (Cameroun, Gabon, Congo, Tchad, RCA, Guinée Équatoriale), ainsi que la RDC, Madagascar, Maurice et les Comores.',
          },
        },
      ],
    },
  ],
};

export default function GuideSeoIaAfriquePage() {
  const [showStickyBar, setShowStickyBar] = useState(false);

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
        title="Guide SEO & IA Afrique Francophone — Référencement Google, Bing, ChatGPT | KHEPRA EXPERTS"
        description="Téléchargez gratuitement le guide exclusif KHEPRA EXPERTS : stratégies SEO et IA pour dominer Google, Bing et ChatGPT en Afrique francophone. Netlinking, contenu local, études de cas PME."
        keywords="SEO Afrique francophone, référencement Google Afrique, optimisation IA ChatGPT, guide SEO gratuit, moteurs IA visibilité, netlinking Afrique, contenu français africain, référencement PME Afrique, SEO UEMOA, SEO CEMAC, Bing Afrique, Google Afrique francophone"
        canonicalPath="/guide-seo-ia-afrique"
        ogType="website"
        ogImage={OG_IMAGES.STRATEGIC_REPORT}
        ogImageAlt="Guide Exclusif KHEPRA EXPERTS — Référencement Google & IA en Afrique Francophone"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        schemaJson={guideSchema}
      />

      <Navigation />

      {/* Sticky bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)', borderTop: '2px solid #d4a82a' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <span className="text-white text-sm font-medium">
              Guide SEO & IA — Téléchargement gratuit
            </span>
          </div>
          <a
            href="#telecharger-guide"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #d4a82a 0%, #b8891a 100%)', color: '#0a1628' }}
          >
            <i className="ri-download-line" />
            Télécharger le guide
          </a>
        </div>
      </div>

      <main id="main-content" className="pt-20">
        <GuideHero />
        <GuideContent />
        <GuideTestimonials />
        <GuideForm />
        <GuideFAQ />
      </main>

      <Footer />
    </div>
  );
}



