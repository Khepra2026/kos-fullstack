import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SeoHead } from '@/components/feature/SeoHead';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import ScrollToTop from '@/components/feature/ScrollToTop';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { VisibleBreadcrumb } from '@/components/feature/VisibleBreadcrumb';
import ContextualCTA from '@/components/feature/ContextualCTA';
import InternalLinkingWidget from '@/components/feature/InternalLinkingWidget';
import SocialShareWidget from '@/components/feature/SocialShareWidget';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function FinancialInclusionAfricaPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: t('nav.home'), href: '/' },
    { label: 'Pillar Content', href: '/pillar' },
    { label: 'Financial Inclusion Africa' }
  ];

  const visibleBreadcrumbItems = [
    { label: t('nav.home'), href: '/', url: `${SITE_URL}/` },
    { label: 'Pillar Content', href: '/pillar', url: `${SITE_URL}/pillar` },
    { label: 'Financial Inclusion Africa', url: `${SITE_URL}/pillar/financial-inclusion-africa` }
  ];

  const goToContact = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/pillar/financial-inclusion-africa#webpage`,
        url: `${SITE_URL}/pillar/financial-inclusion-africa`,
        name: 'Financial Inclusion Africa: Strategies for Inclusive Finance',
        description: 'Comprehensive guide on financial inclusion strategies, digital financial services, and inclusive finance policies across Africa.',
        inLanguage: 'en',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'KHEPRA EXPERTS'
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/pillar/financial-inclusion-africa#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Pillar Content', item: `${SITE_URL}/pillar` },
            { '@type': 'ListItem', position: 3, name: 'Financial Inclusion Africa' }
          ]
        }
      },
      {
        '@type': 'Article',
        '@id': `${SITE_URL}/pillar/financial-inclusion-africa#article`,
        headline: 'Financial Inclusion Africa: Strategies for Inclusive Finance',
        description: 'Comprehensive guide on financial inclusion strategies, digital financial services, and inclusive finance policies across Africa.',
        author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` }
        },
        datePublished: '2024-01-15',
        dateModified: new Date().toISOString().split('T')[0],
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/pillar/financial-inclusion-africa#webpage` },
        keywords: 'financial inclusion Africa, digital financial inclusion, inclusive finance, mobile money, financial access, UEMOA, BCEAO',
        articleSection: 'Financial Inclusion',
        inLanguage: 'en',
        wordCount: 3200,
        timeRequired: 'PT12M',
        educationalLevel: 'Professional'
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/pillar/financial-inclusion-africa#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the current financial inclusion rate in Africa?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Financial inclusion rates vary significantly across Africa. In West Africa (UEMOA), the rate increased from 45% to 58% between 2018 and 2023. Mobile money has been a key driver, with over 60% of adults in some countries having access to mobile financial services.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the main barriers to financial inclusion in Africa?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Key barriers include: limited physical infrastructure in rural areas, low financial literacy, high transaction costs, lack of formal identification documents, regulatory constraints, and limited digital connectivity in remote regions.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does mobile money contribute to financial inclusion?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mobile money has revolutionized financial inclusion in Africa by providing accessible, affordable financial services without requiring traditional bank accounts. It enables payments, transfers, savings, and credit access through mobile phones, reaching previously unbanked populations in rural and urban areas.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title="Financial Inclusion Africa | Inclusive Finance | KHEPRA"
        description="Expert strategies for financial inclusion in Africa. Mobile money, microfinance, digital financial services, and inclusive finance policies. 400M+ unbanked adults. UEMOA, CEMAC, BCEAO expertise."
        keywords="financial inclusion Africa, digital financial inclusion, inclusive finance, mobile money Africa, financial access, microfinance Africa, UEMOA financial inclusion, BCEAO, unbanked population, agent banking"
        canonicalPath="/pillar/financial-inclusion-africa"
        ogType="article"
        structuredData={schemaJson}
        ogImage={OG_IMAGES.FINANCIAL_INCLUSION}
        ogImageAlt="Financial Inclusion Africa – KHEPRA EXPERTS | Strategies for Inclusive Finance"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale="en_US"
        articlePublishedTime="2024-01-15T00:00:00Z"
        articleModifiedTime={new Date().toISOString()}
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Financial Inclusion"
        articleTags={['Financial Inclusion', 'Africa', 'Mobile Money', 'Microfinance', 'UEMOA', 'BCEAO', 'Digital Finance']}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />

            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Financial Inclusion Africa: Strategies for Inclusive Finance
              </h1>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t('financialInclusionAfricaPage.hero.description')}
              </p>

              {/* Key Stats */}
              <div className="mb-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">État de l'inclusion financière en Afrique</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { stat: '57%', label: 'Taux d\'inclusion financière moyen en Afrique subsaharienne', icon: 'ri-pie-chart-line' },
                    { stat: '400M+', label: 'Adultes non bancarisés sur le continent', icon: 'ri-user-unfollow-line' },
                    { stat: '60%', label: 'Transactions via mobile money dans certains pays', icon: 'ri-smartphone-line' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-md text-center">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className={`${item.icon} text-2xl text-amber-600`}></i>
                      </div>
                      <div className="text-3xl font-bold text-amber-700 mb-2">{item.stat}</div>
                      <p className="text-sm text-gray-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Barriers */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Principaux obstacles à l'inclusion financière</h2>
                <div className="space-y-4">
                  {[
                    { barrier: 'Infrastructure physique limitée', desc: 'Faible densité d\'agences bancaires en zones rurales', icon: 'ri-map-pin-line' },
                    { barrier: 'Faible littératie financière', desc: 'Méconnaissance des produits et services financiers disponibles', icon: 'ri-book-open-line' },
                    { barrier: 'Coûts de transaction élevés', desc: 'Frais prohibitifs pour les populations à faibles revenus', icon: 'ri-money-dollar-circle-line' },
                    { barrier: 'Absence de documents d\'identité', desc: 'Difficultés d\'accès aux services formels sans pièces officielles', icon: 'ri-id-card-line' },
                    { barrier: 'Contraintes réglementaires', desc: 'Cadres réglementaires inadaptés aux nouveaux modèles d\'affaires', icon: 'ri-government-line' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`${item.icon} text-xl text-amber-600`}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.barrier}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos solutions pour l'inclusion financière</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: 'Mobile Money & Paiements digitaux', icon: 'ri-smartphone-line', desc: 'Déploiement de solutions de paiement mobile adaptées aux marchés locaux.' },
                    { title: 'Agent Banking', icon: 'ri-store-2-line', desc: 'Développement de réseaux d\'agents pour étendre la portée des services financiers.' },
                    { title: 'Microfinance digitale', icon: 'ri-bank-line', desc: 'Transformation digitale des institutions de microfinance pour plus d\'efficacité.' },
                    { title: 'Éducation financière', icon: 'ri-graduation-cap-line', desc: 'Programmes de sensibilisation et de formation des populations cibles.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gradient-to-br from-white to-amber-50 rounded-xl p-6 shadow-md border border-amber-100 hover:shadow-lg transition-all">
                      <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center mb-4">
                        <i className={`${item.icon} text-2xl text-white`}></i>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Accélérez l'inclusion financière dans votre région</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Nos experts vous accompagnent dans la conception et le déploiement de stratégies d'inclusion financière adaptées à votre contexte.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={goToContact}
                    className="px-10 py-4 bg-white text-amber-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer"
                  >
                    {t('financialInclusionAfricaPage.hero.cta')}
                  </button>
                  <Link
                    to="/resources"
                    className="px-10 py-4 bg-amber-700 text-white border-2 border-white rounded-lg font-bold hover:bg-amber-800 transition-all whitespace-nowrap"
                  >
                    {t('financialInclusionAfricaPage.hero.resources')}
                  </Link>
                </div>
              </div>
            </article>

            <div className="mt-12">
              <SocialShareWidget
                url={`${SITE_URL}/pillar/financial-inclusion-africa`}
                title="Financial Inclusion Africa: Strategies for Inclusive Finance"
              />
            </div>

            <div className="mt-12">
              <InternalLinkingWidget
                tags={['Inclusion financière', 'Mobile money', 'Microfinance']}
                category="Finance"
                limit={3}
              />
            </div>

            <div className="mt-12">
              <ContextualCTA
                variant="guide"
                title="Téléchargez notre guide sur l'inclusion financière"
                description="Accédez à nos ressources exclusives sur les stratégies d'inclusion financière en Afrique"
              />
            </div>
          </div>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
