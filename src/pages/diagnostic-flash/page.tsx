import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import SeoHead from '@/components/feature/SeoHead';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import DiagnosticFlash from '@/pages/home/components/DiagnosticFlash';
import DiagnosticFlashFormOptimized from './components/DiagnosticFlashFormOptimized';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function DiagnosticFlashPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/diagnostic-flash#webpage`,
        url: `${SITE_URL}/diagnostic-flash`,
        name: isEn
          ? 'Flash Diagnostic — Strategic Maturity Assessment | KHEPRA EXPERTS'
          : 'Diagnostic Flash — Évaluation Maturité Stratégique | KHEPRA EXPERTS',
        description: isEn
          ? 'Get a free instant diagnosis of your organizational, digital and governance maturity. 4 targeted questions, personalized score, strategic recommendations.'
          : 'Obtenez un diagnostic gratuit et instantané de votre maturité organisationnelle, digitale et de gouvernance. 4 questions ciblées, score personnalisé, recommandations stratégiques.',
        inLanguage: isEn ? 'en-US' : 'fr-FR',
        isPartOf: { '@type': 'WebSite', url: SITE_URL },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Diagnostic Flash', item: `${SITE_URL}/diagnostic-flash` },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: isEn ? 'What does the Flash Diagnostic evaluate?' : 'Que mesure le Diagnostic Flash ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isEn
                ? 'The Flash Diagnostic evaluates 4 strategic dimensions: governance, financial performance, BCEAO/OHADA compliance, and digital transformation. Each dimension is scored out of 100, with personalized recommendations.'
                : 'Le Diagnostic Flash évalue 4 dimensions stratégiques : gouvernance, performance financière, conformité BCEAO/OHADA et transformation digitale. Chaque dimension est notée sur 100, avec des recommandations personnalisées.',
            },
          },
          {
            '@type': 'Question',
            name: isEn ? 'How long does the diagnostic take?' : 'Combien de temps dure le diagnostic ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isEn
                ? 'The Flash Diagnostic takes approximately 2 minutes to complete. Results are generated instantly with a personalized score and strategic recommendations.'
                : 'Le Diagnostic Flash prend environ 2 minutes à compléter. Les résultats sont générés instantanément avec un score personnalisé et des recommandations stratégiques.',
            },
          },
          {
            '@type': 'Question',
            name: isEn ? 'Is the diagnostic really free?' : 'Le diagnostic est-il vraiment gratuit ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isEn
                ? 'Yes, the Flash Diagnostic is completely free and without obligation. You receive your personalized report immediately after completing the 4 questions.'
                : 'Oui, le Diagnostic Flash est entièrement gratuit et sans engagement. Vous recevez votre rapport personnalisé immédiatement après avoir complété les 4 questions.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <SeoHead
        title={isEn
          ? 'Flash Diagnostic — Strategic Maturity Assessment | KHEPRA EXPERTS'
          : 'Diagnostic Flash — Évaluation Maturité Stratégique | KHEPRA EXPERTS'}
        description={isEn
          ? 'Get a free instant diagnosis of your organizational, digital and governance maturity. 4 targeted questions, personalized score, strategic recommendations.'
          : 'Obtenez un diagnostic gratuit et instantané de votre maturité organisationnelle, digitale et de gouvernance. 4 questions ciblées, score personnalisé, recommandations stratégiques.'}
        keywords={isEn
          ? 'flash diagnostic, strategic maturity, organizational assessment, governance, KHEPRA EXPERTS'
          : 'diagnostic flash, maturité stratégique, évaluation organisationnelle, gouvernance, KHEPRA EXPERTS'}
        canonicalPath="/diagnostic-flash"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        ogImage={OG_IMAGES.TOOLS}
        ogImageAlt={isEn ? 'Flash Diagnostic — KHEPRA EXPERTS | Strategic Maturity Assessment' : 'Diagnostic Flash — KHEPRA EXPERTS | Évaluation Maturité Stratégique'}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        schemaJson={schemaJson}
        hreflangLinks={STATIC_HREFLANG_MAP['/diagnostic-flash/']}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        {/* Hero compact */}
        <section
          className="relative pt-36 pb-16 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #050c18 0%, #091528 60%, #0d1c36 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(212,168,42,0.10) 0%, transparent 60%)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64" style={{ background: 'radial-gradient(circle at 20% 80%, rgba(16,185,129,0.08) 0%, transparent 60%)' }} />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: 'rgba(16,185,129,0.09)', border: '1px solid rgba(16,185,129,0.22)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10b981' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#10b981' }}>
                {isEn ? 'Free · 2 minutes · Instant results' : 'Gratuit · 2 minutes · Résultats instantanés'}
              </span>
            </div>
            <h1 className="font-playfair font-bold text-white mb-5 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              {isEn ? (
                <>Flash diagnostic<br /><span style={{ background: 'linear-gradient(90deg, #f5e199, #d4a82a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>strategic maturity</span></>
              ) : (
                <>Diagnostic flash<br /><span style={{ background: 'linear-gradient(90deg, #f5e199, #d4a82a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>maturité stratégique</span></>
              )}
            </h1>
            <p className="text-lg mb-6 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)', fontWeight: 300 }}>
              {isEn
                ? 'In 4 targeted questions, evaluate your governance, financial performance, BCEAO/OHADA compliance and digital transformation. Receive personalized recommendations instantly.'
                : 'En 4 questions ciblées, évaluez votre gouvernance, performance financière, conformité BCEAO/OHADA et transformation digitale. Recevez des recommandations personnalisées instantanément.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: 'ri-government-line', labelFr: 'Gouvernance', labelEn: 'Governance' },
                { icon: 'ri-funds-line', labelFr: 'Performance', labelEn: 'Performance' },
                { icon: 'ri-shield-check-line', labelFr: 'Conformité', labelEn: 'Compliance' },
                { icon: 'ri-smartphone-line', labelFr: 'Digital', labelEn: 'Digital' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <i className={`${item.icon} text-sm`} style={{ color: '#d4a82a' }} />
                  <span className="text-xs font-semibold text-white">{isEn ? item.labelEn : item.labelFr}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diagnostic interactif */}
        <DiagnosticFlash />

        {/* Formulaire contact court — tunnel optimisé 3 étapes */}
        <DiagnosticFlashFormOptimized />
      </main>

      <Footer />
    </>
  );
}
