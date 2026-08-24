import { useState } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { blogArticles } from '@/mocks/blogArticles';
import { useLanguage } from '@/hooks/useLanguage';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import RAGSearchBar from '@/components/feature/RAGSearchBar';
import InsightsHero from '';
import InsightsCommandCenter from '';
import InsightsLeadMagnet from '';
import InsightsArticlesGrid from '';
import InsightsConversionStrip from '';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/insights#webpage`,
      url: `${SITE_URL}/insights`,
      name: 'Khepra Insights Hub — Centre de Commandement Stratégique',
      description: 'Intelligence stratégique, analyses financières et outils décisionnels pour dirigeants d\'Afrique francophone. Gouvernance, conformité BCEAO/OHADA, performance PME.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Qu\'est-ce que Khepra Insights Hub ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Khepra Insights Hub est le centre de commandement stratégique de Khepra Experts, regroupant 10 rubriques thématiques : Boardroom Intelligence, CFO & Finance Lab, Gouvernance & Conformité, Africa Market Intelligence, Risk & Crisis Room, Strategy Playbooks, AI & Performance, Executive Tools, Case Studies et CEO Brief.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment générer un rapport Conseil d\'Administration gratuit ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Accédez à la rubrique Executive Tools et cliquez sur "Créer mon rapport CA gratuit". Le formulaire multi-étapes vous guide en moins de 30 minutes pour produire un Board Report structuré, conforme OHADA.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quels outils gratuits sont disponibles pour les dirigeants africains ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Khepra Experts propose 4 outils gratuits : Rapport Conseil d\'Administration, Diagnostic Organisationnel, Évaluation Gouvernance (conformité BCEAO/OHADA) et Maturité Digitale. Tous accessibles sans inscription préalable.',
          },
        },
      ],
    },
  ],
};

export default function InsightsPage() {
  const { currentLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const articles = blogArticles;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  return (
    <>
      <SeoHead
        title="Insights Hub | Khepra Experts — Intelligence Stratégique Afrique Francophone"
        description="Centre de commandement stratégique pour décideurs africains : Boardroom Intelligence, CFO Lab, Gouvernance BCEAO/OHADA, outils gratuits. Cabinet Khepra Experts."
        keywords="khepra insights, gouvernance entreprise OHADA, board report PME Afrique, reporting conseil administration modèle, DAF externalisée Afrique, conformité BCEAO, intelligence stratégique Afrique francophone, outils dirigeants PME"
        canonicalPath="/insights"
        ogLocale="fr_FR"
        ogImage={OG_IMAGES.INSIGHTS}
        ogImageAlt="Insights Hub KHEPRA EXPERTS – Intelligence Stratégique pour Décideurs Africains"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        structuredData={jsonLd}
        twitterLabel1="Rubriques thématiques"
        twitterData1="10"
        twitterLabel2="Outils gratuits"
        twitterData2="4"
      />

      <Navigation />

      <main id="main-content">
        <InsightsHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalArticles={articles.length}
          totalViews={totalViews}
        />

        {/* RAG Search — Base de Connaissances Réglementaires */}
        <section className="relative py-16 z-20" style={{ background: 'linear-gradient(180deg, #111111 0%, #0d0d0d 50%, #f9fafb 100%)' }}>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, #86BC25 0%, transparent 70%)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-400/25 px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-wider" style={{ color: '#86BC25' }}>
                <i className="ri-search-2-line" />
                Recherche Sémantique IA
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">
                Base de Connaissances <span style={{ color: '#86BC25' }}>Réglementaires</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm">
                Interrogez notre moteur RAG alimenté par 100+ textes réglementaires couvrant la BCEAO, COBAC, OHADA, GAFI, CIMA, RGPD et plus. Recherche sémantique propulsée par IA.
              </p>
            </div>
            <RAGSearchBar />
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['BCEAO', 'COBAC', 'OHADA', 'GAFI/GIABA', 'RGPD', 'Prix de Transfert', 'Cybersécurité', 'Gouvernance'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 whitespace-nowrap">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <InsightsCommandCenter />

        <InsightsLeadMagnet />

        <InsightsArticlesGrid
          articles={articles}
          searchQuery={searchQuery}
        />

        <InsightsConversionStrip />
      </main>

      <Footer />
    </>
  );
}




