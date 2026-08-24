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

export default function MicrofinanceTransformationAfricaPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: t('nav.home'), href: '/' },
    { label: 'Pillar Content', href: '/pillar' },
    { label: 'Microfinance Transformation Africa' }
  ];

  const visibleBreadcrumbItems = [
    { label: t('nav.home'), href: '/', url: `${SITE_URL}/` },
    { label: 'Pillar Content', href: '/pillar', url: `${SITE_URL}/pillar` },
    { label: 'Microfinance Transformation Africa', url: `${SITE_URL}/pillar/microfinance-transformation-africa` }
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
        '@id': `${SITE_URL}/pillar/microfinance-transformation-africa#webpage`,
        url: `${SITE_URL}/pillar/microfinance-transformation-africa`,
        name: 'Microfinance Transformation Africa: Digital Modernization Guide',
        description: 'Comprehensive guide on microfinance digital transformation, modernization strategies, and innovation for African microfinance institutions.',
        inLanguage: 'en',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'KHEPRA EXPERTS'
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/pillar/microfinance-transformation-africa#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Pillar Content', item: `${SITE_URL}/pillar` },
            { '@type': 'ListItem', position: 3, name: 'Microfinance Transformation Africa' }
          ]
        }
      },
      {
        '@type': 'Article',
        '@id': `${SITE_URL}/pillar/microfinance-transformation-africa#article`,
        headline: 'Microfinance Transformation Africa: Digital Modernization Guide',
        description: 'Comprehensive guide on microfinance digital transformation, modernization strategies, and innovation for African microfinance institutions.',
        author: { '@type': 'Organization', name: 'Khepra Experts', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` }
        },
        datePublished: '2024-01-15',
        dateModified: new Date().toISOString().split('T')[0],
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/pillar/microfinance-transformation-africa#webpage` },
        keywords: 'microfinance digital transformation, microfinance modernization, digital microfinance, MFI innovation, microfinance technology, BCEAO microfinance',
        articleSection: 'Microfinance Transformation',
        inLanguage: 'en',
        wordCount: 3100,
        timeRequired: 'PT13M',
        educationalLevel: 'Professional'
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/pillar/microfinance-transformation-africa#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the key steps for digital transformation of a microfinance institution?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Key steps include: 1) Digital maturity assessment and gap analysis, 2) Selection of appropriate core banking system (CBS), 3) Process digitalization and automation, 4) Staff training and change management, 5) Mobile banking and digital channels deployment, 6) Data analytics and reporting systems implementation, and 7) Cybersecurity and compliance framework establishment.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much does digital transformation cost for a microfinance institution?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Costs vary based on institution size and scope: Small MFIs (1-5 branches): $50,000-$150,000; Medium MFIs (6-20 branches): $150,000-$500,000; Large MFIs (20+ branches): $500,000-$2M+.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the main benefits of digital transformation for MFIs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Key benefits include: 40-60% reduction in operational costs, 30-50% increase in operational efficiency, improved portfolio quality through better monitoring, enhanced customer experience with 24/7 access, real-time reporting and decision-making.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title="Microfinance Transformation Africa | Digital Guide | KHEPRA"
        description="Expert guide on microfinance digital transformation in Africa. Core banking systems, mobile banking, BCEAO compliance, operational efficiency. 3,000+ MFIs, 120M+ clients. UEMOA, CEMAC expertise."
        keywords="microfinance digital transformation, microfinance modernization, digital microfinance, MFI innovation, microfinance technology, BCEAO microfinance, core banking system, mobile banking MFI, SFD transformation"
        canonicalPath="/pillar/microfinance-transformation-africa"
        ogType="article"
        structuredData={schemaJson}
        ogImage={OG_IMAGES.MICROFINANCE_TRANSFORMATION}
        ogImageAlt="Microfinance Transformation Africa – KHEPRA EXPERTS | Digital Modernization Guide"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale="en_US"
        articlePublishedTime="2024-01-15T00:00:00Z"
        articleModifiedTime={new Date().toISOString()}
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Microfinance Transformation"
        articleTags={['Microfinance', 'Digital Transformation', 'Africa', 'MFI', 'BCEAO', 'Financial Inclusion', 'Core Banking']}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />

            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Microfinance Transformation Africa: Digital Modernization Guide
              </h1>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                La transformation digitale des institutions de microfinance (IMF) en Afrique représente un levier stratégique majeur pour améliorer l'efficacité opérationnelle, réduire les coûts et étendre la portée des services financiers aux populations non bancarisées.
              </p>

              {/* Key Stats */}
              <div className="mb-16 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">La microfinance en chiffres</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { stat: '3 000+', label: 'Institutions de microfinance actives en Afrique', icon: 'ri-bank-line' },
                    { stat: '40-60%', label: 'Réduction des coûts opérationnels après digitalisation', icon: 'ri-arrow-down-line' },
                    { stat: '120M+', label: 'Clients de la microfinance sur le continent', icon: 'ri-group-line' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-md text-center">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className={`${item.icon} text-2xl text-teal-600`}></i>
                      </div>
                      <div className="text-3xl font-bold text-teal-700 mb-2">{item.stat}</div>
                      <p className="text-sm text-gray-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transformation Steps */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Étapes clés de la transformation digitale d'une IMF</h2>
                <div className="space-y-4">
                  {[
                    { step: '01', title: 'Diagnostic de maturité digitale', desc: 'Évaluation de l\'état actuel des systèmes, processus et compétences numériques de l\'institution.', icon: 'ri-search-eye-line' },
                    { step: '02', title: 'Sélection du Core Banking System', desc: 'Choix et déploiement d\'un système de gestion bancaire adapté aux besoins et à la taille de l\'IMF.', icon: 'ri-server-line' },
                    { step: '03', title: 'Digitalisation des processus', desc: 'Automatisation des workflows : octroi de crédit, gestion des remboursements, reporting réglementaire.', icon: 'ri-settings-3-line' },
                    { step: '04', title: 'Formation & conduite du changement', desc: 'Accompagnement des équipes dans l\'adoption des nouveaux outils et méthodes de travail.', icon: 'ri-team-line' },
                    { step: '05', title: 'Déploiement des canaux digitaux', desc: 'Mise en place du mobile banking, des agents bancaires et des interfaces clients digitales.', icon: 'ri-smartphone-line' },
                    { step: '06', title: 'Cybersécurité & conformité', desc: 'Mise en place du cadre de sécurité informatique et de conformité réglementaire (BCEAO, BEAC).', icon: 'ri-shield-check-line' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5 bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                          <i className={`${item.icon} text-teal-600`}></i>
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Estimation */}
              <div className="mb-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Estimation des coûts de transformation</h2>
                <div className="space-y-4">
                  {[
                    { size: 'Petite IMF (1-5 agences)', cost: '50 000 – 150 000 $', color: 'bg-teal-100 text-teal-800' },
                    { size: 'IMF moyenne (6-20 agences)', cost: '150 000 – 500 000 $', color: 'bg-emerald-100 text-emerald-800' },
                    { size: 'Grande IMF (20+ agences)', cost: '500 000 – 2 000 000 $+', color: 'bg-green-100 text-green-800' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="font-semibold text-gray-800">{item.size}</span>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${item.color}`}>{item.cost}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">* Estimations incluant logiciels, matériel, formation et conseil sur 12-24 mois.</p>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Transformez votre institution de microfinance</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Nos experts vous accompagnent dans la modernisation digitale de votre IMF, de l'audit initial au déploiement complet.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={goToContact}
                    className="px-10 py-4 bg-white text-teal-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer"
                  >
                    Demander une consultation
                  </button>
                  <Link
                    to="/tools/maturite-digitale"
                    className="px-10 py-4 bg-teal-700 text-white border-2 border-white rounded-lg font-bold hover:bg-teal-800 transition-all whitespace-nowrap"
                  >
                    Évaluer ma maturité digitale
                  </Link>
                </div>
              </div>
            </article>

            <div className="mt-12">
              <SocialShareWidget
                url={`${SITE_URL}/pillar/microfinance-transformation-africa`}
                title="Microfinance Transformation Africa: Digital Modernization"
              />
            </div>

            <div className="mt-12">
              <InternalLinkingWidget
                tags={['Microfinance', 'Transformation digitale', 'Inclusion financière']}
                category="Finance"
                limit={3}
              />
            </div>

            <div className="mt-12">
              <ContextualCTA
                variant="diagnostic"
                title="Évaluez la maturité digitale de votre IMF"
                description="Obtenez un diagnostic personnalisé et un plan de transformation adapté à votre institution"
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




