import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { BreadcrumbSchema } from '@/components/feature/BreadcrumbSchema';
import { RelatedArticles } from '';
import { ServiceDetailContact } from '';
import { InternalLinkingWidget } from '@/components/feature/InternalLinkingWidget';
import { getServiceById, getServiceBySlug, caseStudiesData, type ServiceDetail } from '@/pages/services/data/serviceDetails';
import { buildServiceDetailHreflang } from '@/utils/hreflang';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

// Mapping des routes statiques SEO vers les slugs de services
const STATIC_ROUTE_MAP: Record<string, string> = {
  '/conseil-strategique': 'strategic-advisory',
  '/gouvernance-entreprise': 'gouvernance-entreprise',
  '/inclusion-financiere-digitale': 'inclusion-financiere-digitale',
  '/gestion-risques-entreprise': 'gestion-risques-entreprise',
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en';
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Résoudre le slug : paramètre dynamique OU route statique SEO-friendly
  const resolvedSlug = slug || STATIC_ROUTE_MAP[location.pathname] || '';

  useEffect(() => {
    if (resolvedSlug) {
      let serviceData = getServiceBySlug(resolvedSlug);
      if (!serviceData) {
        serviceData = getServiceById(resolvedSlug) ?? null;
      }
      if (serviceData) {
        setService(serviceData);
        window.scrollTo(0, 0);
      } else {
        navigate('/services');
      }
    } else {
      navigate('/services');
    }
  }, [resolvedSlug, navigate]);

  if (!service) {
    return null;
  }

  const filteredCaseStudies = caseStudiesData.filter((cs) =>
    service.caseStudies.includes(cs.id)
  );

  const breadcrumbItems = [
    { name: lang === 'fr' ? 'Accueil' : 'Home', item: '/' },
    { name: lang === 'fr' ? 'Services' : 'Services', item: '/services' },
    { name: service.title, item: `/services/${resolvedSlug}` },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
          width: 250,
          height: 60,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lomé',
          addressCountry: 'TG',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+228-93-98-49-09',
          contactType: 'customer service',
          email: 'contact@khepraexperts.com',
          areaServed: ['TG', 'BJ', 'CI', 'BF', 'SN', 'GH'],
          availableLanguage: ['French', 'English'],
        },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/about#founder`,
        name: 'SIMDA Essoyomèwè',
        jobTitle: lang === 'fr'
          ? 'Directeur Associé & Senior Consultant, KHEPRA EXPERTS'
          : 'Managing Partner & Senior Consultant, KHEPRA EXPERTS',
        url: `${SITE_URL}/about`,
        sameAs: ['https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/'],
        worksFor: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
        },
        knowsLanguage: ['fr', 'en'],
        alumniOf: [
          { '@type': 'EducationalOrganization', name: 'Université de Lomé', description: 'Maîtrise 2003' },
          { '@type': 'EducationalOrganization', name: 'Université Laval', description: 'MBA 2018' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/services/${resolvedSlug}#service`,
        name: service.title,
        description: service.description,
        url: `${SITE_URL}/services/${resolvedSlug}`,
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
        },
        areaServed: [
          { '@type': 'Place', name: lang === 'fr' ? "Afrique de l'Ouest" : "West Africa" },
          { '@type': 'Place', name: lang === 'fr' ? 'Afrique Centrale' : 'Central Africa' },
          { '@type': 'Country', name: 'Togo' },
        ],
        priceRange: lang === 'fr' ? 'Sur devis - Tarification adaptée à votre projet' : 'On quote - Pricing adapted to your project',
        serviceOutput: lang === 'fr' 
          ? 'Rapports d\'audit, recommandations stratégiques, plans d\'action, accompagnement opérationnel'
          : 'Audit reports, strategic recommendations, action plans, operational support',
        termsOfService: `${SITE_URL}/legal`,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/services/${resolvedSlug}`,
          priceCurrency: 'XOF',
        },
        hasOfferCatalog: service.offerings?.items?.length > 0 ? {
          '@type': 'OfferCatalog',
          name: service.offerings.title[lang],
          itemListElement: service.offerings.items.map((item, idx) => ({
            '@type': 'Offer',
            position: idx + 1,
            itemOffered: {
              '@type': 'Service',
              name: item.title[lang],
              description: item.description[lang],
            },
          })),
        } : undefined,
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/services/${resolvedSlug}#webpage`,
        url: `${SITE_URL}/services/${resolvedSlug}`,
        name: `${service.title} — KHEPRA EXPERTS | Conseil Afrique de l'Ouest`,
        description: `${service.description.substring(0, 140)}… Cabinet conseil KHEPRA EXPERTS, Lomé, Togo.`,
        inLanguage: lang === 'fr' ? 'fr-FR' : 'en-US',
        isPartOf: { 
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
        },
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/about#founder`,
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/services/${resolvedSlug}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: lang === 'fr' ? 'Accueil' : 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
            { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE_URL}/services/${resolvedSlug}` },
          ],
        },
      },
      ...(service.faq && service.faq.items.length > 0 ? [{
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/services/${resolvedSlug}#faqpage`,
        mainEntity: service.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question[lang],
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer[lang],
          },
        })),
      }] : []),
    ],
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
        title={`${service.title} — KHEPRA EXPERTS | Conseil Afrique de l'Ouest`}
        description={service.description.length > 150 ? `${service.description.substring(0, 148).trimEnd()}…` : `${service.description} Cabinet conseil KHEPRA EXPERTS, Lomé, Togo.`.substring(0, 160)}
        keywords={`${service.title}, conseil finance Afrique, ${service.category || 'conseil stratégique'}, KHEPRA EXPERTS Lomé, conformité BCEAO, audit financier Togo`}
        canonicalPath={`/services/${resolvedSlug}`}
        ogImage={service.hero?.image || `${SITE_URL}/og-services.jpg`}
        ogImageWidth="1200"
        ogImageHeight="630"
        ogImageAlt={`${service.title} — KHEPRA EXPERTS`}
        schemaJson={serviceSchema}
        hreflangLinks={resolvedSlug ? buildServiceDetailHreflang(resolvedSlug) : undefined}
        geoRegion="TG"
        geoPlacename="Lomé, Togo"
        geoPosition="6.1256;1.2223"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={service.hero.image}
              alt={service.hero.title[lang]}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Fil d'Ariane */}
              <Breadcrumb
                variant="light"
                className="mb-6"
                items={[
                  { label: lang === 'fr' ? 'Accueil' : 'Home', href: '/' },
                  { label: lang === 'fr' ? 'Services' : 'Services', href: '/services' },
                  { label: service.hero.title[lang] },
                ]}
              />

              <div
                className={`inline-flex items-center gap-2 px-4 py-2 ${service.hero.bg} ${service.hero.border} border rounded-full mb-6`}
              >
                <i className={`${service.hero.icon} ${service.hero.color} text-lg`}></i>
                <span className={`text-sm font-medium ${service.hero.color}`}>
                  {service.hero.badge[lang]}
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {service.hero.title[lang]}
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {service.hero.subtitle[lang]}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {service.hero.description[lang]}
              </p>
              
              {/* CTA Hero */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap cursor-pointer flex items-center gap-2"
                >
                  <i className="ri-calendar-check-line text-xl"></i>
                  {lang === 'fr' ? 'Réserver un diagnostic stratégique' : 'Book a strategic diagnostic'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {service.overview.title[lang]}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {service.overview.description[lang]}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-8 gradient-border glow-gold-hover">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {lang === 'fr' ? 'Points clés' : 'Key Points'}
                </h3>
                <ul className="space-y-4">
                  {service.overview.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <i className="ri-checkbox-circle-fill text-gold-600 text-xl flex-shrink-0 mt-0.5"></i>
                      <span className="text-gray-700">{point[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              {service.offerings.title[lang]}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {service.offerings.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group bg-white gradient-border glow-gold-hover"
                >
                  <div className="w-14 h-14 bg-gold-100 rounded-xl flex items-center justify-center mb-6">
                    <i className={`${item.icon} text-gold-700 text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {item.title[lang]}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {item.description[lang]}
                  </p>
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      {lang === 'fr' ? 'Livrables' : 'Deliverables'}
                    </h4>
                    <ul className="space-y-2">
                      {item.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <i className="ri-arrow-right-s-line text-gold-600 text-lg flex-shrink-0 mt-0.5"></i>
                          <span className="text-sm text-gray-600">{deliverable[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA après Offerings */}
            <div className="mt-16 text-center">
              <button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
              >
                <i className="ri-calendar-check-line text-xl"></i>
                {lang === 'fr' ? 'Discuter de mon projet avec un expert' : 'Discuss my project with an expert'}
              </button>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        {filteredCaseStudies.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                {lang === 'fr' ? 'Résultats concrets obtenus' : 'Concrete Results Achieved'}
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                {lang === 'fr'
                  ? 'Découvrez comment nous avons transformé les défis de nos clients en succès mesurables.'
                  : 'Discover how we transformed our clients\' challenges into measurable success.'}
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {filteredCaseStudies.map((caseStudy) => (
                  <div
                    key={caseStudy.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group bg-white gradient-border glow-gold-hover"
                  >
                    {/* Consortium badge */}
                    {caseStudy.consortium && (
                      <div className="bg-gold-50 border-b border-gold-100 px-6 py-3 flex items-center gap-2">
                        <i className="ri-team-line text-gold-600 text-base"></i>
                        <span className="text-xs font-semibold text-gold-700 uppercase tracking-wide">
                          {lang === 'fr' ? 'Mission en consortium' : 'Consortium assignment'}
                        </span>
                      </div>
                    )}

                    <div className="p-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {caseStudy.title[lang]}
                      </h3>
                      <p className="text-sm text-gray-500 mb-6">{caseStudy.client[lang]}</p>

                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            {lang === 'fr' ? 'Défi' : 'Challenge'}
                          </h4>
                          <p className="text-sm text-gray-700">{caseStudy.challenge[lang]}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            {lang === 'fr' ? 'Solution' : 'Solution'}
                          </h4>
                          <p className="text-sm text-gray-700">{caseStudy.solution[lang]}</p>
                        </div>
                      </div>

                      {/* Consortium roles */}
                      {caseStudy.consortium && (
                        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1">
                            <i className="ri-links-line text-gold-600"></i>
                            {lang === 'fr' ? 'Répartition des rôles' : 'Role distribution'}
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="ri-building-line text-gold-700 text-xs"></i>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gold-700 mb-0.5">KHEPRA EXPERTS</p>
                                <p className="text-xs text-gray-600 leading-relaxed">{caseStudy.consortium.role[lang]}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="ri-building-4-line text-navy-700 text-xs"></i>
                              </div>
                              <div>
                                <a
                                  href={caseStudy.consortium.partnerUrl}
                                  target="_blank"
                                  rel="noopener noreferrer nofollow"
                                  className="text-xs font-semibold text-navy-700 hover:text-navy-800 transition-colors inline-flex items-center gap-1 mb-0.5"
                                >
                                  {caseStudy.consortium.partner}
                                  <i className="ri-external-link-line text-xs"></i>
                                </a>
                                <p className="text-xs text-gray-600 leading-relaxed">{caseStudy.consortium.partnerRole[lang]}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() =>
                          setExpandedCase(expandedCase === caseStudy.id ? null : caseStudy.id)
                        }
                        className="flex items-center gap-2 text-gold-700 font-medium text-sm hover:text-gold-800 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {expandedCase === caseStudy.id
                          ? lang === 'fr' ? 'Masquer les résultats' : 'Hide results'
                          : lang === 'fr' ? 'Voir les résultats' : 'View results'}
                        {expandedCase === caseStudy.id ? <i className="ri-arrow-up-s-line text-lg"></i> : <i className="ri-arrow-down-s-line text-lg"></i>}
                      </button>

                      {expandedCase === caseStudy.id && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            {lang === 'fr' ? 'Résultats' : 'Results'}
                          </h4>
                          <ul className="space-y-2">
                            {caseStudy.results.map((result, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <i className="ri-check-line text-gold-600 text-lg flex-shrink-0 mt-0.5"></i>
                                <span className="text-sm text-gray-700">{result[lang]}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA après Case Studies */}
              <div className="mt-16 text-center">
                <p className="text-xl text-gray-700 mb-6">
                  {lang === 'fr' 
                    ? 'Prêt à obtenir des résultats similaires pour votre organisation ?' 
                    : 'Ready to achieve similar results for your organization?'}
                </p>
                <button
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
                >
                  <i className="ri-phone-line text-xl"></i>
                  {lang === 'fr' ? 'Parler à un expert' : 'Talk to an expert'}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {service.testimonials.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
                {lang === 'fr' ? 'Ce que disent nos clients' : 'What Our Clients Say'}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {service.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group bg-white gradient-border glow-gold-hover">
                    <i className="ri-double-quotes-l text-5xl text-gold-200 absolute top-6 left-6"></i>
                    <p className="text-lg text-gray-700 mb-6 relative z-10 italic leading-relaxed">
                      &ldquo;{testimonial.quote[lang]}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-user-line text-gold-700 text-xl"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author[lang]}</p>
                        <p className="text-sm text-gray-600">{testimonial.role[lang]}</p>
                        <p className="text-sm text-gray-500">{testimonial.organization[lang]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Internal Linking Widget - Articles connexes */}
        {slug && (
          <InternalLinkingWidget
            serviceId={slug}
            limit={3}
            variant="full"
            title={lang === 'fr' ? 'Approfondissez vos connaissances' : 'Deepen Your Knowledge'}
          />
        )}

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              {service.process.title[lang]}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-8 gradient-border glow-gold-hover">
                    <div className="w-12 h-12 bg-gold-600 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">{step.number}</span>
                    </div>
                    <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center mb-4">
                      <i className={`${step.icon} text-gold-700 text-xl`}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title[lang]}</h3>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">{step.description[lang]}</p>
                    <div className="flex items-center gap-2 text-sm text-gold-700">
                      <i className="ri-time-line"></i>
                      <span>{step.duration[lang]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              {service.faq.title[lang]}
            </h2>
            <div className="space-y-4">
              {service.faq.items.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group bg-white gradient-border glow-gold-hover">
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === `faq-${index}` ? null : `faq-${index}`)
                    }
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{item.question[lang]}</span>
                    {expandedFaq === `faq-${index}` ? <i className="ri-arrow-up-s-line text-xl text-gray-600 flex-shrink-0"></i> : <i className="ri-arrow-down-s-line text-xl text-gray-600 flex-shrink-0"></i>}
                  </button>
                  {expandedFaq === `faq-${index}` && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-700 leading-relaxed">{item.answer[lang]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        {slug && <RelatedArticles serviceId={slug} serviceTitle={service.title} />}

        {/* CTA Final Section */}
        <section className="py-20 bg-gradient-to-br from-brand-900 to-brand-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {lang === 'fr' ? 'Transformons ensemble vos défis en opportunités' : 'Let\'s Transform Your Challenges into Opportunities'}
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              {lang === 'fr'
                ? 'Réservez votre diagnostic stratégique confidentiel de 30 minutes avec un expert KHEPRA.'
                : 'Book your confidential 30-minute strategic diagnostic with a KHEPRA expert.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
              >
                <i className="ri-calendar-check-line text-xl"></i>
                {lang === 'fr' ? 'Réserver mon diagnostic stratégique' : 'Book my strategic diagnostic'}
              </button>
              <button
                onClick={scrollToContact}
                className="bg-white text-brand-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-bold text-base whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
              >
                <i className="ri-phone-line text-xl"></i>
                {lang === 'fr' ? 'Parler à un expert' : 'Talk to an expert'}
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-lg text-gold-400"></i>
                <span>{lang === 'fr' ? '100% Confidentiel' : '100% Confidential'}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line text-lg text-gold-400"></i>
                <span>{lang === 'fr' ? 'Session 30 minutes' : '30-minute session'}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-gift-line text-lg text-gold-400"></i>
                <span>{lang === 'fr' ? 'Sans engagement' : 'No commitment'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Contact avec formulaire — cible de scrollToContact */}
        <ServiceDetailContact
          serviceTitle={service.title}
          serviceId={slug}
        />

        {/* Share */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SocialSharePremium
              url={`${SITE_URL}/services/detail/`}
              title="KHEPRA EXPERTS — Services Détail"
              variant="compact"
              className="justify-center"
            />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}



