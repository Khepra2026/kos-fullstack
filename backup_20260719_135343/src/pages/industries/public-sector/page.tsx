import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollToTop from '@/components/feature/ScrollToTop';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function PublicSectorPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getDynamicOffset = (): number => {
    let total = 0;
    const topBanner = document.querySelector<HTMLElement>('[data-banner="top"]');
    if (topBanner) total += topBanner.offsetHeight;
    const regAlert = document.querySelector<HTMLElement>('[data-banner="regulatory"]');
    if (regAlert) total += regAlert.offsetHeight;
    const mainNav = document.querySelector<HTMLElement>('nav.fixed');
    if (mainNav) total += mainNav.offsetHeight;
    return total + 24;
  };

  const scrollToHomeContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = getDynamicOffset();
      const top = contactSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) {
          const offset = getDynamicOffset();
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 600);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/industries/public-sector#service`,
        serviceType: 'Conseil Secteur Public',
        provider: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL
        },
        areaServed: {
          '@type': 'Place',
          name: 'Afrique'
        },
        description: t('industries.publicSeo.seo.description')
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/industries/public-sector#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${SITE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Industries',
            item: `${SITE_URL}/industries`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Secteur Public — Architecture 4 Niveaux',
            item: `${SITE_URL}/industries/public-sector`
          }
        ]
      }
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const challenges = [
    {
      icon: 'ri-bank-line',
      title: 'Stratégie nationale d\'inclusion financière',
      description: 'Concevoir et piloter des politiques publiques ambitieuses pour élargir l\'accès aux services financiers formels'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Couverture des populations non bancarisées',
      description: 'Réduire les inégalités d\'accès aux services financiers dans les zones rurales et périurbaines'
    },
    {
      icon: 'ri-community-line',
      title: 'Supervision du secteur de la microfinance',
      description: 'Renforcer les capacités de régulation et de supervision des SFD et IMF par les autorités compétentes'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Conformité et gouvernance des IMF',
      description: 'Accompagner les institutions de microfinance dans leur mise en conformité réglementaire et leur gouvernance'
    }
  ];

  const solutions = [
    {
      title: 'Politiques Publiques d\'Inclusion Financière',
      services: [
        'Élaboration de stratégies nationales d\'inclusion financière (SNIF)',
        'Diagnostic de l\'écosystème financier national',
        'Définition d\'indicateurs de suivi et tableaux de bord',
        'Coordination inter-institutionnelle (Banque Centrale, Ministères, régulateurs)',
        'Plaidoyer et dialogue politique avec les parties prenantes',
        'Évaluation d\'impact des politiques d\'inclusion financière'
      ],
      icon: 'ri-government-line'
    },
    {
      title: 'Accompagnement du Secteur de la Microfinance',
      services: [
        'Renforcement des capacités des SFD et IMF',
        'Mise en conformité réglementaire (BCEAO, COBAC, BEAC)',
        'Appui à la gouvernance institutionnelle des IMF',
        'Transformation digitale des institutions de microfinance',
        'Développement de produits financiers adaptés aux populations cibles',
        'Formation des équipes dirigeantes et des conseils d\'administration'
      ],
      icon: 'ri-community-line'
    }
  ];

  const stats = [
    { value: '15+', label: 'Stratégies nationales accompagnées' },
    { value: '12', label: 'Pays d\'intervention' },
    { value: '200+', label: 'IMF & SFD accompagnés' },
    { value: '22+', label: 'Années d\'expérience' }
  ];

  const caseStudies = [
    {
      title: 'Élaboration d\'une Stratégie Nationale d\'Inclusion Financière',
      challenge: 'Taux de bancarisation inférieur à 20%, absence de cadre stratégique national coordonné',
      solution: 'Diagnostic complet, ateliers multi-acteurs, rédaction de la SNIF avec plan d\'action quinquennal',
      result: '+18 points de taux d\'inclusion financière en 3 ans',
      sector: 'Politiques Publiques'
    },
    {
      title: 'Programme de Renforcement des SFD en Zone UEMOA',
      challenge: 'Faible conformité réglementaire et gouvernance insuffisante de 40 SFD',
      solution: 'Audit institutionnel, plans de mise en conformité individualisés, formation des dirigeants',
      result: '92% des SFD accompagnés en conformité totale après 18 mois',
      sector: 'Microfinance'
    }
  ];

  return (
    <>
      <SeoHead
        title={t('industries.publicSeo.seo.title')}
        description={t('industries.publicSeo.seo.description')}
        keywords={t('industries.publicSeo.seo.keywords')}
        canonicalPath="/industries/public-sector"
        ogType="website"
        ogImage={OG_IMAGES.PUBLIC_SECTOR}
        ogImageAlt="Secteur Public et Institutions en Afrique – KHEPRA EXPERTS | Politiques d'inclusion financière"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        twitterLabel1="Secteur"
        twitterData1="Secteur Public"
        twitterLabel2="Pays couverts"
        twitterData2="12+"
        schemaJson={jsonLd}
        hreflangLinks={STATIC_HREFLANG_MAP['/industries/public-sector/']}
      />
      <Navigation />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Secteurs', href: '/industries' },
              { label: 'Secteur Public — Architecture 4 Niveaux' }
            ]}
            variant="light"
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <i className="ri-government-line"></i>
                Secteur d'expertise
              </div>
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Secteur Public & Institutions
              </h1>
              <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                Nous accompagnons les États et institutions publiques africaines dans la conception de politiques d'inclusion financière et le renforcement du secteur de la microfinance.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                  <i className="ri-bank-line mr-2"></i>Stratégies nationales d'inclusion financière
                </span>
                <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                  <i className="ri-community-line mr-2"></i>Accompagnement des IMF & SFD
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/services')}
                  className="bg-gold-500 text-white px-8 py-4 rounded-full hover:bg-gold-600 transition-all font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
                >
                  Nos solutions
                  <i className="ri-arrow-right-line"></i>
                </button>
                <button
                  onClick={scrollToHomeContact}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all font-semibold border border-white/20 cursor-pointer whitespace-nowrap"
                >
                  Nous contacter
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent rounded-3xl blur-3xl"></div>
              <img
                src="https://readdy.ai/api/search-image?query=African%20government%20officials%20meeting%20financial%20inclusion%20policy%20discussion%20professional%20institutional%20setting%20modern%20conference%20room%20clean%20simple%20background&width=600&height=500&seq=pub002&orientation=landscape"
                alt="Politiques publiques d'inclusion financière en Afrique"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-gold-600 mb-2 font-playfair">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Périmètre d'intervention */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
              Notre périmètre d'intervention
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deux axes stratégiques au cœur de notre expertise pour le secteur public africain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {challenges.map((challenge, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gold-100 rounded-xl flex items-center justify-center mb-4">
                  <i className={`${challenge.icon} text-2xl text-gold-600`}></i>
                </div>
                <h3 className="text-lg font-bold text-brand-900 mb-3 line-clamp-2" title={challenge.title}>{challenge.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
              Nos solutions dédiées
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un accompagnement sur mesure centré sur l'inclusion financière et la microfinance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-gold-300 transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`${solution.icon} text-xl text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-900 line-clamp-2" title={solution.title}>{solution.title}</h3>
                </div>
                <ul className="space-y-3">
                  {solution.services.map((service, sidx) => (
                    <li key={sidx} className="flex items-start gap-3">
                      <i className="ri-check-line text-gold-600 text-lg mt-0.5 flex-shrink-0"></i>
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approche méthodologique */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
              Notre approche
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une méthodologie éprouvée, adaptée aux réalités institutionnelles africaines
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Diagnostic & Analyse',
                desc: 'Évaluation de l\'écosystème financier, cartographie des acteurs, analyse des gaps réglementaires et institutionnels.',
                icon: 'ri-search-eye-line'
              },
              {
                step: '02',
                title: 'Conception & Planification',
                desc: 'Co-construction de la stratégie avec les parties prenantes, définition des objectifs mesurables et du plan d\'action.',
                icon: 'ri-draft-line'
              },
              {
                step: '03',
                title: 'Mise en œuvre & Suivi',
                desc: 'Accompagnement opérationnel, renforcement des capacités, suivi-évaluation et ajustements continus.',
                icon: 'ri-line-chart-line'
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-md text-center hover:shadow-xl transition-all">
                <div className="text-5xl font-bold text-gold-200 font-playfair mb-4">{step.step}</div>
                <div className="w-14 h-14 bg-gold-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${step.icon} text-2xl text-gold-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
              Études de cas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des résultats concrets pour nos clients du secteur public et de la microfinance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100">
                <div className="inline-block bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {study.sector}
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-6 line-clamp-2" title={study.title}>{study.title}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-500 uppercase mb-1">Défi</div>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 uppercase mb-1">Solution</div>
                    <p className="text-gray-700">{study.solution}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 uppercase mb-1">Résultat</div>
                    <p className="text-gold-700 font-semibold">{study.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/case-studies')}
              className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold cursor-pointer"
            >
              Voir toutes les études de cas
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-900 to-brand-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-6">
            Construisons ensemble votre stratégie d'inclusion financière
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Que vous soyez une autorité publique, un régulateur ou une institution de microfinance, notre équipe est à votre disposition pour vous accompagner.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/services')}
              className="bg-gold-500 text-white px-8 py-4 rounded-full hover:bg-gold-600 transition-all font-semibold cursor-pointer shadow-lg whitespace-nowrap"
            >
              Découvrir nos services
            </button>
            <button
              onClick={() => {
                const btn = document.getElementById('vapi-widget-floating-button') as HTMLButtonElement;
                if (btn) btn.click();
                else scrollToHomeContact();
              }}
              className="bg-white text-brand-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-semibold cursor-pointer whitespace-nowrap"
            >
              Parler à un expert
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}



