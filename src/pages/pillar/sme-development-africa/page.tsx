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

export default function SMEDevelopmentAfricaPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: t('nav.home'), href: '/' },
    { label: 'Pillar Content', href: '/pillar' },
    { label: 'SME Development Africa' }
  ];

  const visibleBreadcrumbItems = [
    { label: t('nav.home'), href: '/', url: `${SITE_URL}/` },
    { label: 'Pillar Content', href: '/pillar', url: `${SITE_URL}/pillar` },
    { label: 'SME Development Africa', url: `${SITE_URL}/pillar/sme-development-africa` }
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
        '@id': `${SITE_URL}/pillar/sme-development-africa#webpage`,
        url: `${SITE_URL}/pillar/sme-development-africa`,
        name: 'SME Development Africa: Strategic Consulting for Small Business Growth',
        description: 'Comprehensive guide on SME development, financing strategies, growth consulting, and transformation for African small and medium enterprises.',
        inLanguage: 'en',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'KHEPRA EXPERTS'
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/pillar/sme-development-africa#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Pillar Content', item: `${SITE_URL}/pillar` },
            { '@type': 'ListItem', position: 3, name: 'SME Development Africa' }
          ]
        }
      },
      {
        '@type': 'Article',
        '@id': `${SITE_URL}/pillar/sme-development-africa#article`,
        headline: 'SME Development Africa: Strategic Consulting for Small Business Growth',
        description: 'Comprehensive guide on SME development, financing strategies, growth consulting, and transformation for African small and medium enterprises.',
        author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` }
        },
        datePublished: '2024-01-15',
        dateModified: new Date().toISOString().split('T')[0],
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/pillar/sme-development-africa#webpage` },
        keywords: 'SME development consulting Africa, SME financing, SME growth strategy, small business Africa, SME transformation, entrepreneurship Africa',
        articleSection: 'SME Development',
        inLanguage: 'en',
        wordCount: 3300,
        timeRequired: 'PT13M',
        educationalLevel: 'Professional'
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/pillar/sme-development-africa#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the main challenges facing SMEs in Africa?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Key challenges include: limited access to financing (70% of SMEs report this as primary barrier), weak governance and management structures, inadequate financial record-keeping, limited market access, infrastructure deficiencies, regulatory complexity, lack of skilled workforce, and difficulty adopting technology and innovation.'
            }
          },
          {
            '@type': 'Question',
            name: 'How can SMEs access financing in West Africa?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SMEs can access financing through: commercial banks, microfinance institutions, development finance institutions (DFIs), venture capital and private equity, crowdfunding platforms, government guarantee schemes, and supply chain financing from larger corporate partners.'
            }
          },
          {
            '@type': 'Question',
            name: 'What governance structures should SMEs implement for growth?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Essential governance structures include: formal board of directors or advisory board, clear organizational chart with defined roles, documented policies and procedures, financial management systems with regular reporting, internal controls and audit mechanisms, strategic planning process, and risk management framework.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title="SME Development Africa | Business Growth Strategy | KHEPRA"
        description="Expert SME consulting in Africa. Business growth strategies, financing access, governance, digital transformation. 90% of African businesses are SMEs. $150B financing gap. UEMOA, CEMAC expertise."
        keywords="SME development consulting Africa, SME financing, SME growth strategy, small business Africa, SME transformation, entrepreneurship Africa, business development, SME governance, startup Africa"
        canonicalPath="/pillar/sme-development-africa"
        ogType="article"
        structuredData={schemaJson}
        ogImage={OG_IMAGES.SME_DEVELOPMENT}
        ogImageAlt="SME Development Africa – KHEPRA EXPERTS | Strategic Consulting for Small Business Growth"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale="en_US"
        articlePublishedTime="2024-01-15T00:00:00Z"
        articleModifiedTime={new Date().toISOString()}
        articleAuthor="KHEPRA EXPERTS"
        articleSection="SME Development"
        articleTags={['SME', 'Africa', 'Business Growth', 'Entrepreneurship', 'Strategy', 'Financing', 'Governance']}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />

            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                SME Development Africa: Strategic Consulting for Small Business Growth
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {t('sme-development-africa.hero.description')}
              </p>

              {/* Key Stats */}
              <div className="mb-16 bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Les PME en Afrique : chiffres clés</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { stat: '90%', label: 'Des entreprises africaines sont des PME', icon: 'ri-building-2-line' },
                    { stat: '70%', label: 'Des PME citent l\'accès au financement comme obstacle principal', icon: 'ri-money-dollar-circle-line' },
                    { stat: '60%', label: 'De l\'emploi formel généré par les PME', icon: 'ri-briefcase-line' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-md text-center">
                      <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className={`${item.icon} text-2xl text-cyan-600`}></i>
                      </div>
                      <div className="text-3xl font-bold text-cyan-700 mb-2">{item.stat}</div>
                      <p className="text-sm text-gray-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Principaux défis des PME africaines</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { challenge: 'Accès limité au financement', desc: '70% des PME ne peuvent pas accéder aux crédits bancaires traditionnels.', icon: 'ri-bank-line' },
                    { challenge: 'Gouvernance insuffisante', desc: 'Structures de gestion informelles freinant la croissance et l\'accès aux investisseurs.', icon: 'ri-organization-chart' },
                    { challenge: 'Faible digitalisation', desc: 'Retard dans l\'adoption des outils numériques de gestion et de vente.', icon: 'ri-computer-line' },
                    { challenge: 'Accès aux marchés', desc: 'Difficultés à intégrer les chaînes de valeur régionales et internationales.', icon: 'ri-global-line' },
                    { challenge: 'Ressources humaines', desc: 'Pénurie de compétences managériales et techniques qualifiées.', icon: 'ri-user-search-line' },
                    { challenge: 'Complexité réglementaire', desc: 'Environnement des affaires contraignant avec des procédures administratives lourdes.', icon: 'ri-file-list-3-line' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`${item.icon} text-xl text-cyan-600`}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.challenge}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Services */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos services d'accompagnement PME</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Diagnostic organisationnel', desc: 'Analyse complète de la structure, des processus et de la gouvernance de votre entreprise.', link: '/tools/diagnostic-organisationnel', linkLabel: 'Faire le diagnostic', icon: 'ri-search-eye-line' },
                    { title: 'Stratégie de croissance', desc: 'Élaboration d\'un plan stratégique sur 3-5 ans avec des objectifs mesurables et un plan d\'action.', link: null, linkLabel: null, icon: 'ri-line-chart-line' },
                    { title: 'Accès au financement', desc: 'Préparation des dossiers de financement et mise en relation avec les institutions financières partenaires.', link: null, linkLabel: null, icon: 'ri-funds-line' },
                    { title: 'Transformation digitale PME', desc: 'Accompagnement dans l\'adoption des outils numériques adaptés à votre secteur et taille.', link: '/tools/diagnostic-transformation-digitale', linkLabel: 'Évaluer ma maturité', icon: 'ri-smartphone-line' },
                    { title: 'Renforcement des capacités', desc: 'Formations sur mesure en management, finance, marketing et gestion des ressources humaines.', link: null, linkLabel: null, icon: 'ri-graduation-cap-line' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gradient-to-r from-white to-cyan-50 border border-cyan-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <i className={`${item.icon} text-2xl text-white`}></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                          {item.link && (
                            <Link to={item.link} className="inline-flex items-center gap-1 text-sm text-cyan-700 font-semibold hover:text-cyan-900 transition-colors">
                              {item.linkLabel}
                              <i className="ri-arrow-right-line"></i>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-cyan-600 to-sky-600 rounded-2xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Accélérez la croissance de votre PME</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Nos experts vous accompagnent dans le développement stratégique, l'accès au financement et la transformation de votre entreprise.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={goToContact}
                    className="px-10 py-4 bg-white text-cyan-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer"
                  >
                    {t('sme-development-africa.hero.cta.request')}
                  </button>
                  <Link
                    to="/tools/diagnostic-organisationnel"
                    className="px-10 py-4 bg-cyan-700 text-white border-2 border-white rounded-lg font-bold hover:bg-cyan-800 transition-all whitespace-nowrap"
                  >
                    {t('sme-development-africa.hero.cta.diagnostic')}
                  </Link>
                </div>
              </div>
            </article>

            <div className="mt-12">
              <SocialShareWidget
                url={`${SITE_URL}/pillar/sme-development-africa`}
                title="SME Development Africa: Strategic Consulting"
              />
            </div>

            <div className="mt-12">
              <InternalLinkingWidget
                tags={['Stratégie', 'Entrepreneuriat', 'Croissance', 'Business plan']}
                category="Entrepreneuriat"
                limit={3}
              />
            </div>

            <div className="mt-12">
              <ContextualCTA
                variant="diagnostic"
                title="Diagnostiquez votre PME gratuitement"
                description="30 minutes avec un expert pour identifier vos leviers de croissance et vos priorités stratégiques"
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
