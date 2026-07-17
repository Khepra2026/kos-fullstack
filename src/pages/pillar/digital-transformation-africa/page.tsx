import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { useNavigate } from 'react-router-dom';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function DigitalTransformationAfricaPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: t('nav.home'), href: '/' },
    { label: 'Pillar Content', href: '/pillar' },
    { label: 'Digital Transformation Africa' }
  ];

  const visibleBreadcrumbItems = [
    { label: t('nav.home'), href: '/', url: `${SITE_URL}/` },
    { label: 'Pillar Content', href: '/pillar', url: `${SITE_URL}/pillar` },
    { label: 'Digital Transformation Africa', url: `${SITE_URL}/pillar/digital-transformation-africa` }
  ];

  const relatedLinks = [
    { title: 'Fintech Advisory Africa', url: '/pillar/fintech-advisory-africa' },
    { title: 'Financial Inclusion Africa', url: '/pillar/financial-inclusion-africa' },
    { title: 'SME Development Africa', url: '/pillar/sme-development-africa' }
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/pillar/digital-transformation-africa#webpage`,
        url: `${SITE_URL}/pillar/digital-transformation-africa`,
        name: 'Digital Transformation Africa: Strategic Guide for Financial Institutions',
        description: 'Comprehensive guide on digital transformation strategies for African financial institutions, banks, and fintech companies. Expert advisory on digital maturity, core banking systems, and innovation.',
        inLanguage: 'en',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'KHEPRA EXPERTS'
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/pillar/digital-transformation-africa#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: SITE_URL
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Pillar Content',
              item: `${SITE_URL}/pillar`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Digital Transformation Africa'
            }
          ]
        }
      },
      {
        '@type': 'Article',
        '@id': `${SITE_URL}/pillar/digital-transformation-africa#article`,
        headline: 'Digital Transformation Africa: Strategic Guide for Financial Institutions',
        description: 'Comprehensive guide on digital transformation strategies for African financial institutions, banks, and fintech companies.',
        author: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL
        },
        publisher: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`
          }
        },
        datePublished: '2024-01-15',
        dateModified: new Date().toISOString().split('T')[0],
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/pillar/digital-transformation-africa#webpage`
        },
        keywords: 'digital transformation Africa, banking digitalization, fintech innovation, digital strategy Africa, core banking systems, mobile banking, digital maturity assessment',
        articleSection: 'Digital Transformation',
        inLanguage: 'en',
        wordCount: 3500,
        timeRequired: 'PT15M',
        educationalLevel: 'Professional'
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/pillar/digital-transformation-africa#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the key stages of digital transformation for African financial institutions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Digital transformation follows 5 key phases: 1) Digital Maturity Assessment (2-3 weeks), 2) Strategic Roadmap Design (3-4 weeks), 3) Infrastructure & Systems Implementation (3-6 months), 4) Deployment & Change Management (2-4 months), and 5) Optimization & Continuous Improvement (ongoing).'
            }
          },
          {
            '@type': 'Question',
            name: 'What percentage of African financial institutions are digitally mature?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Only 3% of African financial institutions have reached advanced digital maturity (Level 5), while 35% remain at the initial stage (Level 1). 22% are at intermediate level (Level 3), showing significant room for digital transformation across the continent.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the main pillars of digital transformation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The 8 main pillars are: Technology Infrastructure, Data & Analytics, Process Automation, Customer Experience, Digital Workplace, Innovation Culture, Digital Skills Development, and Cybersecurity & Governance.'
            }
          }
        ]
      }
    ]
  };

  const scrollToContact = (attempt = 0) => {
    const el = document.getElementById('contact');
    if (!el) {
      if (attempt < 10) setTimeout(() => scrollToContact(attempt + 1), 100);
      return;
    }
    const nav = document.querySelector('nav[role="navigation"]');
    const navHeight = nav ? nav.getBoundingClientRect().height : 80;
    const top = el.getBoundingClientRect().top + window.scrollY - (navHeight + 24);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <SeoHead
        title="Digital Transformation Africa | Financial Institutions | KHEPRA"
        description="Expert guide on digital transformation for African financial institutions. Digital maturity assessment, core banking systems, mobile banking, and innovation strategies. 15+ years experience in Africa."
        keywords="digital transformation Africa, banking digitalization Africa, fintech innovation, digital strategy Africa, core banking systems, mobile banking Africa, digital maturity assessment, financial technology Africa, BCEAO digital transformation, UEMOA digital banking"
        canonicalPath="/pillar/digital-transformation-africa"
        ogType="article"
        structuredData={schemaJson}
        ogImage={OG_IMAGES.DIGITAL_TRANSFORMATION}
        ogImageAlt="Digital Transformation Africa – KHEPRA EXPERTS | Strategic Guide for Financial Institutions"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale="en_US"
        articlePublishedTime="2024-01-15T00:00:00Z"
        articleModifiedTime={new Date().toISOString()}
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Digital Transformation"
        articleTags={['Digital Transformation', 'Africa', 'Financial Institutions', 'Fintech', 'Strategy', 'Banking', 'Innovation']}
      />
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />
            
            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-navy-900 mb-6">
                Digital Transformation Africa: Strategic Guide for Financial Institutions
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('digital-transformation-africa.intro')}
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('digital-transformation-africa.challenges')}
              </p>
              
              {/* Digital Maturity Framework */}
              <div className="mb-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {t('digital-transformation-africa.framework')}
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      level: t('digital-transformation-africa.level1'),
                      percentage: '35%',
                      description: t('digital-transformation-africa.level1-desc'),
                      color: 'bg-red-500'
                    },
                    {
                      level: t('digital-transformation-africa.level2'),
                      percentage: '28%',
                      description: t('digital-transformation-africa.level2-desc'),
                      color: 'bg-orange-500'
                    },
                    {
                      level: t('digital-transformation-africa.level3'),
                      percentage: '22%',
                      description: t('digital-transformation-africa.level3-desc'),
                      color: 'bg-yellow-500'
                    },
                    {
                      level: t('digital-transformation-africa.level4'),
                      percentage: '12%',
                      description: t('digital-transformation-africa.level4-desc'),
                      color: 'bg-emerald-500'
                    },
                    {
                      level: t('digital-transformation-africa.level5'),
                      percentage: '3%',
                      description: t('digital-transformation-africa.level5-desc'),
                      color: 'bg-teal-600'
                    }
                  ].map((level, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-center gap-4 mb-3">
                        <div className={`w-3 h-3 ${level.color} rounded-full`}></div>
                        <h3 className="text-xl font-bold text-gray-900">{level.level}</h3>
                        <span className="ml-auto text-sm font-semibold text-gray-600">{level.percentage} {t('digital-transformation-africa.orgs')}</span>
                      </div>
                      <p className="text-gray-700 ml-7">{level.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>{t('digital-transformation-africa.key-insight')}</strong> {t('digital-transformation-africa.key-insight-desc')}
                  </p>
                </div>
              </div>

              {/* Our Methodology */}
              <div className="mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  {t('digital-transformation-africa.methodology')}
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      phase: t('digital-transformation-africa.phase1'),
                      duration: t('digital-transformation-africa.duration1'),
                      icon: 'ri-search-eye-line',
                      activities: t('digital-transformation-africa.activities1')
                    },
                    {
                      phase: t('digital-transformation-africa.phase2'),
                      duration: t('digital-transformation-africa.duration2'),
                      icon: 'ri-route-line',
                      activities: t('digital-transformation-africa.activities2')
                    },
                    {
                      phase: t('digital-transformation-africa.phase3'),
                      duration: t('digital-transformation-africa.duration3'),
                      icon: 'ri-building-2-line',
                      activities: t('digital-transformation-africa.activities3')
                    },
                    {
                      phase: t('digital-transformation-africa.phase4'),
                      duration: t('digital-transformation-africa.duration4'),
                      icon: 'ri-rocket-2-line',
                      activities: t('digital-transformation-africa.activities4')
                    },
                    {
                      phase: t('digital-transformation-africa.phase5'),
                      duration: t('digital-transformation-africa.duration5'),
                      icon: 'ri-line-chart-line',
                      activities: t('digital-transformation-africa.activities5')
                    }
                  ].map((phase, index) => (
                    <div key={index} className="bg-white border-l-4 border-emerald-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className={`${phase.icon} text-2xl text-emerald-600`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">{phase.phase}</h3>
                            <span className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">{phase.duration}</span>
                          </div>
                          <ul className="space-y-2 mt-4">
                            {phase.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <i className="ri-checkbox-circle-line text-emerald-600 mt-1"></i>
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transformation Pillars */}
              <div className="mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  {t('digital-transformation-africa.pillars')}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      pillar: t('digital-transformation-africa.tech'),
                      icon: 'ri-server-line',
                      description: t('digital-transformation-africa.tech-desc')
                    },
                    {
                      pillar: t('digital-transformation-africa.analytics'),
                      icon: 'ri-database-2-line',
                      description: t('digital-transformation-africa.analytics-desc')
                    },
                    {
                      pillar: t('digital-transformation-africa.automation'),
                      icon: 'ri-settings-3-line',
                      description: t('digital-transformation-africa.automation-desc')
                    },
                    {
                      pillar: t('digital-transformation-africa.customer'),
                      icon: 'ri-user-heart-line',
                      description: t('digital-transformation-africa.customer-desc')
                    },
                    {
                      pillar: t('digital-transformation-africa.workplace'),
                      icon: 'ri-team-line',
                      description: t('digital-transformation-africa.workplace-desc')
                    },
                    {
                      pillar: t('digital-transformation-africa.innovation'),
                      icon: 'ri-lightbulb-flash-line',
                      description: t('digital-transformation-africa.innovation-desc')
                    },
                    {
                      pillar: t('digital-transformation-africa.skills'),
                      icon: 'ri-graduation-cap-line',
                      description: t('digital-transformation-africa.skills-desc')
                    },
                    {
                      pillar: t('digital-transformation-africa.governance'),
                      icon: 'ri-shield-check-line',
                      description: t('digital-transformation-africa.governance-desc')
                    }
                  ].map((pillar, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-6 shadow-md border border-emerald-100 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center">
                          <i className={`${pillar.icon} text-2xl text-white`}></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{pillar.pillar}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Stories */}
              <div className="mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  {t('digital-transformation-africa.stories')}
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      title: t('digital-transformation-africa.story1-title'),
                      client: t('digital-transformation-africa.story1-client'),
                      challenge: t('digital-transformation-africa.story1-challenge'),
                      solution: t('digital-transformation-africa.story1-solution'),
                      results: t('digital-transformation-africa.story1-results'),
                      icon: 'ri-bank-line'
                    },
                    {
                      title: t('digital-transformation-africa.story2-title'),
                      client: t('digital-transformation-africa.story2-client'),
                      challenge: t('digital-transformation-africa.story2-challenge'),
                      solution: t('digital-transformation-africa.story2-solution'),
                      results: t('digital-transformation-africa.story2-results'),
                      icon: 'ri-government-line'
                    },
                    {
                      title: t('digital-transformation-africa.story3-title'),
                      client: t('digital-transformation-africa.story3-client'),
                      challenge: t('digital-transformation-africa.story3-challenge'),
                      solution: t('digital-transformation-africa.story3-solution'),
                      results: t('digital-transformation-africa.story3-results'),
                      icon: 'ri-building-line'
                    }
                  ].map((story, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <i className={`${story.icon} text-3xl text-emerald-600`}></i>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.title}</h3>
                          <p className="text-sm text-gray-600 italic">{story.client}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <i className="ri-error-warning-line text-orange-600"></i>
                            {t('digital-transformation-africa.challenge')}
                          </h4>
                          <p className="text-gray-700 leading-relaxed">{story.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <i className="ri-lightbulb-line text-emerald-600"></i>
                            {t('digital-transformation-africa.solution')}
                          </h4>
                          <p className="text-gray-700 leading-relaxed">{story.solution}</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <i className="ri-trophy-line text-emerald-600"></i>
                            {t('digital-transformation-africa.results')}
                          </h4>
                          <div className="text-gray-700 leading-relaxed whitespace-pre-line">{story.results}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-12 text-center text-white">
                <h2 className="text-4xl font-bold mb-6">
                  {t('digital-transformation-africa.cta-title')}
                </h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                  {t('digital-transformation-africa.cta-desc')}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link 
                    to="/tools/diagnostic-transformation-digitale" 
                    className="px-10 py-4 bg-white text-emerald-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap"
                  >
                    {t('digital-transformation-africa.cta-consultation')}
                  </Link>
                  <button
                    onClick={() => { navigate('/'); setTimeout(() => scrollToContact(), 600); }}
                    className="px-10 py-4 bg-emerald-700 text-white border-2 border-white rounded-lg font-bold hover:bg-emerald-800 transition-all whitespace-nowrap cursor-pointer"
                  >
                    {t('digital-transformation-africa.cta-assessment')}
                  </button>
                </div>
              </div>

            </article>

            <div className="mt-12">
              <SocialShareWidget 
                url={`${SITE_URL}/pillar/digital-transformation-africa`}
                title="Digital Transformation Africa: Strategic Guide"
              />
            </div>

            <div className="mt-12">
              <InternalLinkingWidget
                tags={['Transformation digitale', 'FinTech', 'Innovation']}
                category="Transformation digitale"
                limit={3}
              />
            </div>

            <div className="mt-12">
              <ContextualCTA
                variant="diagnostic"
                title="Prêt à transformer votre institution ?"
                description="Obtenez un accompagnement expert sur votre parcours de transformation digitale"
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