import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollToTop from '@/components/feature/ScrollToTop';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import RegulatoryNews from './components/RegulatoryNews';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const industries = [
  {
    id: 'microfinance',
    icon: 'ri-community-line',
    title: 'Microfinance & SFD',
    description: 'Accompagnement des institutions de microfinance et systèmes financiers décentralisés dans leur conformité BCEAO/COBAC, gouvernance, gestion des risques et transformation digitale.',
    link: '/industries/microfinance',
    color: 'from-amber-500 to-amber-700',
    bgLight: 'from-amber-50 to-amber-100/50',
    border: 'border-amber-200 hover:border-amber-400',
    badge: 'Secteur phare',
    stats: [
      { label: 'IMF accompagnées', value: '100+' },
      { label: 'Pays couverts', value: '15+' },
      { label: 'Taux conformité', value: '95%' },
    ],
    tags: ['Conformité BCEAO', 'Gouvernance', 'Transformation digitale', 'Gestion des risques'],
  },
  {
    id: 'fintech',
    icon: 'ri-smartphone-line',
    title: 'Fintech & Innovation',
    description: 'Conseil stratégique pour les startups fintech africaines : lancement, conformité réglementaire, levée de fonds, expansion régionale et partenariats stratégiques.',
    link: '/industries/fintech',
    color: 'from-emerald-500 to-emerald-700',
    bgLight: 'from-emerald-50 to-emerald-100/50',
    border: 'border-emerald-200 hover:border-emerald-400',
    badge: null,
    stats: [
      { label: 'Fintechs accompagnées', value: '40+' },
      { label: 'Fonds levés', value: '$50M+' },
      { label: 'Croissance moyenne', value: '300%' },
    ],
    tags: ['Agrément BCEAO', 'Levée de fonds', 'Go-to-market', 'Expansion régionale'],
  },
  {
    id: 'public-sector',
    icon: 'ri-government-line',
    title: 'Secteur Public & Institutions',
    description: 'Appui aux ministères, agences publiques et organisations internationales dans la conception et mise en œuvre de politiques d\'inclusion financière et de réformes institutionnelles.',
    link: '/industries/public-sector',
    color: 'from-slate-600 to-slate-800',
    bgLight: 'from-slate-50 to-slate-100/50',
    border: 'border-slate-200 hover:border-slate-400',
    badge: null,
    stats: [
      { label: 'Programmes pilotés', value: '25+' },
      { label: 'Personnes impactées', value: '5M+' },
      { label: 'Pays d\'intervention', value: '12' },
    ],
    tags: ['Politiques publiques', 'Réformes institutionnelles', 'SNIF', 'Coordination BCEAO'],
  },
  {
    id: 'pme',
    icon: 'ri-store-2-line',
    title: 'PME & Entrepreneuriat',
    description: 'Structuration financière, gouvernance d\'entreprise, levée de fonds et transformation digitale pour les PME africaines en croissance.',
    link: '/industries/pme',
    color: 'from-orange-500 to-orange-700',
    bgLight: 'from-orange-50 to-orange-100/50',
    border: 'border-orange-200 hover:border-orange-400',
    badge: null,
    stats: [
      { label: 'PME accompagnées', value: '500+' },
      { label: 'Emplois créés', value: '10K+' },
      { label: 'Croissance moyenne', value: '150%' },
    ],
    tags: ['Structuration financière', 'Gouvernance', 'Levée de fonds', 'Transformation digitale'],
  },
];

const whyUs = [
  {
    icon: 'ri-map-pin-2-line',
    title: 'Expertise terrain africaine',
    description: '22+ ans d\'expérience dans les institutions financières, gouvernements et organisations internationales en Afrique de l\'Ouest et Centrale.',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Maîtrise réglementaire',
    description: 'Connaissance approfondie des cadres BCEAO, COBAC, UEMOA et CEMAC. Anciens inspecteurs et conseillers techniques nationaux.',
  },
  {
    icon: 'ri-team-line',
    title: 'Approche collaborative',
    description: 'Nous travaillons en étroite collaboration avec vos équipes pour garantir l\'appropriation des solutions et maximiser l\'impact durable.',
  },
  {
    icon: 'ri-line-chart-line',
    title: 'Résultats mesurables',
    description: 'Chaque mission est orientée résultats avec des indicateurs clairs, des livrables précis et un suivi post-mission systématique.',
  },
];

const globalStats = [
  { value: '22+', label: "Années d'expérience", icon: 'ri-time-line' },
  { value: '20+', label: 'Pays d\'intervention', icon: 'ri-map-2-line' },
  { value: '600+', label: 'Organisations accompagnées', icon: 'ri-building-line' },
  { value: '95%', label: 'Taux de satisfaction', icon: 'ri-star-line' },
];

const testimonials = [
  {
    quote: 'Khepra Experts a transformé notre approche de la conformité réglementaire. Leur expertise BCEAO et leur connaissance du terrain ont été déterminantes pour notre mise en conformité.',
    author: 'Directeur Général',
    org: 'Institution de Microfinance, Togo',
    icon: 'ri-community-line',
  },
  {
    quote: 'Un accompagnement stratégique de très haute qualité. L\'équipe a su comprendre nos enjeux spécifiques et proposer des solutions adaptées à notre contexte fintech africain.',
    author: 'CEO & Fondateur',
    org: 'Startup Fintech, Sénégal',
    icon: 'ri-smartphone-line',
  },
  {
    quote: 'Grâce à Khepra Experts, nous avons pu structurer notre gouvernance et lever des fonds auprès d\'investisseurs internationaux. Un partenaire de confiance pour notre croissance.',
    author: 'Directeur Général',
    org: 'PME, Côte d\'Ivoire',
    icon: 'ri-store-2-line',
  },
];

export default function IndustriesPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('en') ? 'en-US' : 'fr-FR';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/industries#webpage`,
        url: `${SITE_URL}/industries`,
        name: 'Secteurs d\'expertise — KHEPRA EXPERTS | 3 Business Units — Architecture 4 Niveaux | Microfinance, Fintech, PME, Secteur Public',
        description: 'Expertise sectorielle approfondie en microfinance, fintech, secteur public et PME en Afrique de l\'Ouest et Centrale. 3 Business Units structurées en architecture 4 niveaux : Régulation Financière (BCEAO/COBAC, Inspection Readiness), Prix de Transfert & Fiscalité Internationale (OCDE BEPS), Gouvernance Risques & Conformité (ERM, Conseil, ESG). Diagnostic gratuit → Mission Premium → Accompagnement → Abonnement.',
        inLanguage: currentLang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${SITE_URL}/industries#breadcrumb` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/industries#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Secteurs — 3 Business Units™', item: `${SITE_URL}/industries` },
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 250, height: 60 },
        address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
      },
    ],
  };

  return (
    <>
      <SeoHead
        title="Secteurs d'expertise — KHEPRA EXPERTS | 3 Business Units — Architecture 4 Niveaux (Diagnostic → Abonnement)"
        description="Expertise sectorielle en microfinance, fintech, secteur public et PME en Afrique. Découvrez nos 3 Business Units : Régulation Financière (BCEAO/COBAC, Inspection Readiness), Prix de Transfert & Fiscalité Internationale (OCDE BEPS) et Gouvernance Risques & Conformité (ERM, Conseil, ESG). Architecture 4 niveaux — Diagnostic gratuit → Mission Premium → Accompagnement → Abonnement."
        keywords="microfinance Afrique, fintech conseil, PME Afrique, secteur public inclusion financière, BCEAO COBAC Inspection Readiness, régulation financière Afrique, prix de transfert OCDE BEPS, gouvernance risques conformité, architecture 4 niveaux, conformité BCEAO, audit financier Afrique"
        canonicalPath="/industries"
        ogType="website"
        ogImage={OG_IMAGES.INDUSTRIES}
        ogImageAlt="Secteurs d'activité – KHEPRA EXPERTS | Microfinance, Fintech, PME, Secteur Public en Afrique"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        structuredData={jsonLd}
      />
      <Navigation />
      <ScrollToTop />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white pt-24 sm:pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=aerial%20view%20of%20african%20city%20financial%20district%20modern%20buildings%20mixed%20with%20traditional%20architecture%20vibrant%20economic%20activity%20people%20working%20professionals%20meeting%20rooms%20offices%20warm%20golden%20light%20abstract%20artistic%20style%20minimal%20background&width=1920&height=700&seq=ind-hero-bg-01&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top opacity-10"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-900/70 to-brand-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Secteurs — 3 Business Units™' },
            ]}
            variant="light"
          />

          <div className="mt-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-gold-500/30">
              <i className="ri-building-4-line" />
              Expertise sectorielle
            </div>
            <h1 className="font-playfair text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Secteurs <span className="text-gold-400">d'expertise</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Une expertise sectorielle approfondie au service des institutions financières, fintechs, PME et organisations publiques en Afrique de l'Ouest et Centrale.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="bg-gold-500 text-white px-8 py-4 rounded-full hover:bg-gold-600 transition-all font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                Nos services
                <i className="ri-arrow-right-line" />
              </Link>
              <Link
                to="/tools/diagnostic-organisationnel"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all font-semibold border border-white/20 whitespace-nowrap cursor-pointer"
              >
                Diagnostic gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats globaux */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {globalStats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 bg-gold-50 rounded-xl border border-gold-200 group-hover:bg-gold-100 transition-colors">
                  <i className={`${stat.icon} text-2xl text-gold-600`} />
                </div>
                <div className="text-4xl font-bold text-brand-900 font-playfair mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secteurs */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-500 bg-gold-50">
              <span className="text-sm font-semibold text-gold-700">Nos secteurs</span>
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
              Secteurs que nous <span className="text-gold-600">accompagnons</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full mb-4" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expertise sectorielle pointue pour répondre aux enjeux spécifiques de chaque industrie en Afrique
            </p>
          </div>

          <div className="space-y-8">
            {industries.map((industry, idx) => (
              <div
                key={industry.id}
                className={`bg-white rounded-2xl border ${industry.border} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group`}
              >
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Left: icon + title */}
                  <div className={`bg-gradient-to-br ${industry.bgLight} p-8 lg:p-10 flex flex-col justify-between border-r border-gray-100`}>
                    <div>
                      {industry.badge && (
                        <div className="inline-flex items-center gap-1 bg-gold-100 text-gold-700 border border-gold-300 px-3 py-1 rounded-full text-xs font-bold mb-4">
                          <i className="ri-star-fill text-xs" />
                          {industry.badge}
                        </div>
                      )}
                      <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${industry.color} rounded-2xl shadow-lg mb-5`}>
                        <i className={`${industry.icon} text-3xl text-white`} />
                      </div>
                      <h3 className="font-playfair text-2xl font-bold text-brand-900 mb-3 group-hover:text-gold-700 transition-colors line-clamp-2" title={industry.title}>
                        {industry.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{industry.description}</p>
                    </div>
                    <div className="mt-6">
                      <Link
                        to={industry.link}
                        className={`inline-flex items-center gap-2 bg-gradient-to-r ${industry.color} text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer`}
                      >
                        Découvrir
                        <i className="ri-arrow-right-line" />
                      </Link>
                    </div>
                  </div>

                  {/* Middle: stats */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center border-r border-gray-100">
                    <div className="text-xs font-semibold text-gold-700 uppercase tracking-widest mb-5">Chiffres clés</div>
                    <div className="space-y-5">
                      {industry.stats.map((stat, sidx) => (
                        <div key={sidx} className="flex items-center gap-4">
                          <div className={`text-3xl font-bold font-playfair bg-gradient-to-r ${industry.color} bg-clip-text text-transparent`}>
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600 font-medium line-clamp-2">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: tags */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="text-xs font-semibold text-gold-700 uppercase tracking-widest mb-5">Domaines d'intervention</div>
                    <div className="flex flex-wrap gap-2">
                      {industry.tags.map((tag, tidx) => (
                        <span
                          key={tidx}
                          className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-semibold rounded-full border border-gray-200 hover:border-gold-400 hover:bg-gold-50 hover:text-gold-700 transition-all cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <Link
                        to={industry.link}
                        className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-sm transition-colors cursor-pointer group/link"
                      >
                        <span>En savoir plus</span>
                        <i className="ri-arrow-right-line group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Actualités réglementaires */}
      <RegulatoryNews />

      {/* Pourquoi nous */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-500 bg-gold-50">
                <span className="text-sm font-semibold text-gold-700">Notre différence</span>
              </div>
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
                Pourquoi choisir <span className="text-gold-600">KHEPRA EXPERTS</span> ?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full mb-6" />
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Un cabinet panafricain fondé par des praticiens ayant exercé au sein même des institutions qu'ils accompagnent aujourd'hui — ministères, banques centrales, institutions de microfinance et organisations internationales.
              </p>
              <div className="space-y-5">
                {whyUs.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-gold-50 rounded-xl border border-gold-200 flex-shrink-0 group-hover:bg-gold-100 transition-colors">
                      <i className={`${item.icon} text-xl text-gold-600`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-900 mb-1 line-clamp-2" title={item.title}>{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold-100 to-amber-100 rounded-3xl blur-2xl opacity-50" />
              <img
                src="https://readdy.ai/api/search-image?query=professional%20african%20business%20consultants%20team%20meeting%20boardroom%20discussing%20strategy%20charts%20documents%20financial%20reports%20modern%20office%20environment%20diverse%20professionals%20collaborative%20work%20session%20warm%20professional%20lighting%20clean%20minimal%20background&width=700&height=600&seq=ind-why-us-02&orientation=portrait"
                alt="Équipe KHEPRA EXPERTS en mission"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover object-top"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gold-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold-100 rounded-xl border border-gold-300">
                    <i className="ri-award-line text-2xl text-gold-600" />
                  </div>
                  <div>
                    <div className="font-bold text-brand-900 text-sm">22+ ans d'expérience</div>
                    <div className="text-xs text-gray-500">Afrique de l'Ouest & Centrale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-500 bg-gold-50">
              <span className="text-sm font-semibold text-gold-700">Témoignages</span>
            </div>
            <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
              Ce que disent <span className="text-gold-600">nos clients</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-gold-300 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center bg-gold-100 rounded-xl border border-gold-200">
                    <i className={`${t.icon} text-lg text-gold-600`} />
                  </div>
                  <i className="ri-double-quotes-l text-3xl text-gold-300 ml-auto" />
                </div>
                <p className="text-gray-700 italic leading-relaxed flex-1 mb-6">"{t.quote}"</p>
                <div className="pt-4 border-t border-gray-100">
                  <div className="font-bold text-brand-900 text-sm">{t.author}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 border-t-4 border-gold-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-6">
            Votre secteur, notre <span className="text-gold-400">expertise</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Échangeons sur vos enjeux spécifiques. Nos experts sectoriels vous proposent un diagnostic stratégique gratuit et sans engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/tools/diagnostic-organisationnel"
              className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] whitespace-nowrap cursor-pointer"
            >
              Diagnostic gratuit
            </Link>
            <Link
              to="/services"
              className="bg-white text-brand-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-semibold border-2 border-gold-400 whitespace-nowrap cursor-pointer"
            >
              Voir nos services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
