import { IndustryMiniCTA } from '@/components/feature/IndustryMiniCTA';
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

export default function FintechPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /** Calcule l'offset dynamique : banners + nav principale */
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
    if (window.location.pathname === '/') {
      const el = document.getElementById('contact');
      if (el) {
        const offset = getDynamicOffset();
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) {
          const offset = getDynamicOffset();
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
        }
      }, 500);
    }
  };

  const challenges = [
    {
      icon: 'ri-shield-check-line',
      title: 'Conformité BCEAO / BEAC',
      description: 'Naviguer dans les cadres réglementaires BCEAO (Instr. N°008-05-2015), COBAC et Règlement CEMAC N°04/18 sur les services de paiement'
    },
    {
      icon: 'ri-lock-line',
      title: 'Cyber-résilience & Gouvernance IT',
      description: 'Audit ISO 27001, PCA/PCI testés annuellement, DRS géographiquement distincts, protection des Core Banking Systems'
    },
    {
      icon: 'ri-scales-line',
      title: 'Cantonnement & KYC Digital',
      description: 'Respect des exigences de cantonnement des fonds EME, onboarding électronique conforme et authentification forte (DSP2-like)'
    },
    {
      icon: 'ri-team-line',
      title: 'Interopérabilité & Agent Banking',
      description: 'Alignement sur les standards GIM-UEMOA / GIMAC pour l\'interopérabilité des paiements et déploiement d\'Agent Banking réglementé'
    }
  ];

  const solutions = [
    {
      title: 'Conformité Réglementaire BCEAO/BEAC',
      services: [
        'Mise en conformité Instruction BCEAO N°008-05-2015 (monnaie électronique)',
        'Conformité Règlement CEMAC N°04/18 sur les services de paiement',
        'Exigences de cantonnement des fonds EME et reporting BCEAO/BEAC',
        'LBC/FT conformité GIABA/GABAC et recommandations GAFI',
        'Agrément Établissement de Monnaie Électronique (EME)',
      ],
      icon: 'ri-shield-check-line'
    },
    {
      title: 'Cyber-résilience & Gouvernance IT',
      services: [
        'Audit de cybersécurité ISO 27001 — systèmes critiques',
        'PCA (Plan de Continuité d\'Activité) et PCI testés annuellement',
        'DRS (Dispositif de Récupération des Systèmes) géographiquement distincts',
        'Gouvernance des risques IT et audit des Core Banking Systems',
        'Supervision des prestataires technologiques critiques',
      ],
      icon: 'ri-cpu-line'
    },
    {
      title: 'KYC Digital & Souveraineté des Données',
      services: [
        'KYC digital et onboarding électronique conforme BCEAO/BEAC',
        'Authentification forte conforme aux standards DSP2',
        'Conformité APDP Togo et directives UEMOA sur les données personnelles',
        'Hébergement souverain — conformité aux exigences prudentielles',
        'Lutte contre la fraude électronique et sécurité des API financières',
      ],
      icon: 'ri-fingerprint-line'
    },
    {
      title: 'Interopérabilité & Croissance',
      services: [
        'Alignement GIM-UEMOA / GIMAC pour l\'interopérabilité des paiements',
        'Stratégie Agent Banking réglementé BCEAO/BEAC',
        'Actifs numériques & blockchain : cadre COSUMAF (CEMAC) et vigilance BCEAO',
        'Modèle financier et levée de fonds fintechs (PE/VC impact)',
        'Expansion régionale UEMOA/CEMAC',
      ],
      icon: 'ri-links-line'
    },
  ];

  const stats = [
    { value: '25+', label: 'Fintechs accompagnées' },
    { value: '8', label: 'Pays d\'intervention' },
    { value: '10M+', label: 'Utilisateurs impactés' },
    { value: '15M€', label: 'Fonds levés' }
  ];

  const caseStudies = [
    {
      title: 'Lancement d\'une plateforme de paiement mobile',
      challenge: 'Obtention agrément et mise en conformité',
      solution: 'Accompagnement réglementaire et structuration',
      result: 'Agrément obtenu en 6 mois, 100K utilisateurs',
      sector: 'Fintech'
    },
    {
      title: 'Expansion régionale d\'une néobanque',
      challenge: 'Conformité multi-pays et partenariats',
      solution: 'Stratégie d\'expansion et due diligence',
      result: 'Déploiement 4 pays, 500K clients',
      sector: 'Fintech'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/industries/fintech#service`,
        serviceType: 'Conseil Fintech',
        provider: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL
        },
        areaServed: {
          '@type': 'Place',
          name: 'Afrique'
        },
        description: t('industries.fintechSeo.seo.description')
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/industries/fintech#breadcrumb`,
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
            name: 'Fintech & Innovation — Investment Readiness & Due Diligence Excellence™',
            item: `${SITE_URL}/industries/fintech`
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={t('industries.fintechSeo.seo.title')}
        description={t('industries.fintechSeo.seo.description')}
        keywords={t('industries.fintechSeo.seo.keywords')}
        canonicalPath="/industries/fintech"
        ogType="website"
        ogImage={OG_IMAGES.FINTECH}
        ogImageAlt="Fintech et Innovation en Afrique – KHEPRA EXPERTS | Conseil stratégique fintech africaine"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        twitterLabel1="Secteur"
        twitterData1="Fintech"
        twitterLabel2="Pays couverts"
        twitterData2="8+"
        schemaJson={jsonLd}
        hreflangLinks={STATIC_HREFLANG_MAP['/industries/fintech/']}
      />
      <Navigation />

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
              { label: 'Fintech & Innovation — Investment Readiness & Due Diligence Excellence™' }
            ]}
            variant="light"
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <i className="ri-smartphone-line"></i>
                Secteur d&apos;expertise
              </div>
              {/* Regulatory badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                {['BCEAO N°008-05-2015', 'CEMAC N°04/18', 'ISO 27001', 'GIM-UEMOA', 'GIMAC', 'GIABA/GABAC'].map((ref) => (
                  <span key={ref} className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(212,168,42,0.15)', color: '#e8c547', border: '1px solid rgba(212,168,42,0.28)' }}>
                    {ref}
                  </span>
                ))}
              </div>
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Fintech & Innovation
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Accompagnement stratégique et réglementaire des fintechs africaines : conformité BCEAO/BEAC, cyber-résilience, KYC digital et interopérabilité GIM-UEMOA/GIMAC.
              </p>
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
                src="https://readdy.ai/api/search-image?query=African%20fintech%20startup%20team%20working%20on%20mobile%20payment%20app%20modern%20tech%20office%20innovation%20digital%20finance%20smartphones%20tablets%20collaborative%20workspace%20simple%20clean%20background&width=600&height=500&seq=ft001&orientation=landscape"
                alt="Équipe fintech africaine"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-gold-600 mb-2 font-playfair group-hover:text-gold-700 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Framework Section — NEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-500 bg-gold-50">
              <span className="text-sm font-semibold text-gold-700">Cadre réglementaire applicable</span>
            </div>
            <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
              Conformité réglementaire <span className="text-gold-600">UEMOA & CEMAC</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chaque service fintech opérant en Afrique francophone doit respecter un corpus réglementaire précis. Khepra Experts maîtrise l&apos;ensemble de ces textes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* UEMOA */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gold-100 hover:border-gold-300 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-md">
                  <i className="ri-bank-line text-2xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-900">Zone UEMOA — BCEAO</h3>
                  <p className="text-sm text-gray-500">Banque Centrale des États de l&apos;Afrique de l&apos;Ouest</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { ref: 'Instruction BCEAO N°008-05-2015', desc: 'Services de monnaie électronique — EME, cantonnement des fonds, reporting mensuel' },
                  { ref: 'Instruction BCEAO (2024-2026)', desc: 'KYC digital, onboarding électronique, authentification forte DSP2-like' },
                  { ref: 'GIM-UEMOA', desc: 'Interopérabilité des systèmes de paiement et Mobile Money en zone UEMOA' },
                  { ref: 'GIABA / GAFI', desc: 'LBC/FT — Lutte contre le blanchiment et le financement du terrorisme' },
                  { ref: 'FGDR-UMOA', desc: 'Fonds de Garantie des Dépôts et de Résolution dans l\'UMOA' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <i className="ri-file-text-line text-gold-600 mt-1 flex-shrink-0"></i>
                    <div>
                      <span className="text-sm font-bold text-brand-900">{item.ref}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CEMAC */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-emerald-100 hover:border-emerald-300 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-md">
                  <i className="ri-bank-line text-2xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-900">Zone CEMAC — BEAC/COBAC</h3>
                  <p className="text-sm text-gray-500">Banque des États de l&apos;Afrique Centrale</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { ref: 'Règlement CEMAC N°04/18', desc: 'Services de paiement en zone CEMAC — agrément, conditions d\'exercice, interopérabilité' },
                  { ref: 'GIMAC', desc: 'Groupement Interbancaire Monétique de l\'Afrique Centrale — standards d\'interopérabilité' },
                  { ref: 'COSUMAF', desc: 'Cadre relatif aux actifs numériques et blockchain en zone CEMAC — protection des investisseurs' },
                  { ref: 'GABAC / GAFI', desc: 'Groupe d\'Action contre le Blanchiment d\'Argent en Afrique Centrale — conformité AML/CFT' },
                  { ref: 'COBAC EMF 2018/01', desc: 'Supervision des EMF et fintechs partenaires en zone CEMAC' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <i className="ri-file-text-line text-emerald-600 mt-1 flex-shrink-0"></i>
                    <div>
                      <span className="text-sm font-bold text-brand-900">{item.ref}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cross-cutting standards */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-2">
              <i className="ri-global-line text-gold-600"></i>
              Standards internationaux transverses
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { ref: 'ISO 27001', desc: 'Audit cybersécurité des systèmes critiques', icon: 'ri-lock-line' },
                { ref: 'PCA / PCI', desc: 'Continuité d\'activité testée annuellement + DRS distincts', icon: 'ri-restart-line' },
                { ref: 'Bâle II / III', desc: 'Normes prudentielles applicables aux fintechs bancaires', icon: 'ri-bar-chart-grouped-line' },
                { ref: 'IFC PS', desc: 'Normes de performance IFC pour les fintechs à impact', icon: 'ri-leaf-line' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-lg p-4 border border-gray-100 text-center">
                  <i className={`${s.icon} text-2xl text-gold-600 mb-2 block`}></i>
                  <div className="font-bold text-sm text-brand-900">{s.ref}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-500 bg-gold-50">
              <span className="text-sm font-semibold text-gold-700">Enjeux réglementaires</span>
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
              Défis réglementaires des <span className="text-gold-600">fintechs africaines</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des enjeux réglementaires précis nécessitant une expertise Big Four en conformité prudentielle et cyber-résilience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {challenges.map((challenge, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-gold-400 group">
                <div className="w-14 h-14 bg-gradient-to-br from-gold-100 to-gold-200 rounded-xl flex items-center justify-center mb-4 border border-gold-300 group-hover:from-gold-200 group-hover:to-gold-300 transition-all">
                  <i className={`${challenge.icon} text-2xl text-gold-700`}></i>
                </div>
                <h3 className="text-lg font-bold text-brand-900 mb-3 group-hover:text-gold-700 transition-colors line-clamp-2" title={challenge.title}>{challenge.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA - Après Challenges */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IndustryMiniCTA guide="esg" />
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-500 bg-gold-50">
              <span className="text-sm font-semibold text-gold-700">Accompagnement réglementaire 360°</span>
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
              Nos solutions <span className="text-gold-600">conformité & croissance</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Du lancement à l&apos;expansion régionale — conformité BCEAO/BEAC intégrée à chaque étape
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 border border-gray-200 hover:border-gold-400 transition-all shadow-sm hover:shadow-lg group">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className={`${solution.icon} text-xl text-white`}></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-900 group-hover:text-gold-700 transition-colors line-clamp-2" title={solution.title}>{solution.title}</h3>
                    <div className="w-10 h-0.5 bg-gradient-to-r from-gold-500 to-gold-600 mt-2 rounded-full"></div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {solution.services.map((service, sidx) => (
                    <li key={sidx} className="flex items-start gap-3">
                      <i className="ri-check-line text-gold-600 text-lg mt-0.5 flex-shrink-0"></i>
                      <span className="text-gray-700 text-sm">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA - Après Solutions */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IndustryMiniCTA guide="investment-readiness" />
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-500 bg-gold-50">
              <span className="text-sm font-semibold text-gold-700">Succès clients</span>
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
              Études de <span className="text-gold-600">cas</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des succès concrets pour nos clients fintech
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-gold-400">
                <div className="inline-block bg-gradient-to-r from-gold-100 to-gold-200 text-gold-800 border border-gold-300 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {study.sector}
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-6 line-clamp-2" title={study.title}>{study.title}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-gold-700 uppercase tracking-wide mb-1">Défi</div>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gold-700 uppercase tracking-wide mb-1">Solution</div>
                    <p className="text-gray-700">{study.solution}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-xs font-semibold text-gold-700 uppercase tracking-wide mb-1">Résultat</div>
                    <p className="text-gold-700 font-semibold">{study.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/case-studies')}
              className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold cursor-pointer border-b-2 border-gold-400 hover:border-gold-600 pb-1 transition-all"
            >
              Voir toutes les études de cas
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </section>

      {/* ESG & Impact Sectoriel Fintech */}
      <section className="py-20 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
              <i className="ri-leaf-line"></i>
              ESG · Éthique des données · Impact
            </div>
            <h2 className="font-playfair text-4xl font-bold text-white mb-4">
              Fintech responsable :<br />
              <span className="text-emerald-400">l'impact sectoriel au cœur de notre conseil</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Nous accompagnons les fintechs africaines à créer de la valeur durable — pas seulement de la croissance. Chaque stratégie intègre des critères ESG mesurables et une éthique des données irréprochable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {/* E */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-400/40 transition-all group">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 border border-emerald-400/30">
                <i className="ri-plant-line text-2xl text-emerald-400"></i>
              </div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">E — Environnemental</div>
              <h3 className="text-xl font-bold text-white mb-4">Fintech verte & financement climatique</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                  <span>Structuration de plateformes de financement de projets verts (énergie solaire, agriculture durable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                  <span>Conseil sur l'accès aux fonds climatiques pour fintechs (GCF, BOAD, AFD)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                  <span>Intégration de métriques carbone dans les modèles de scoring crédit digital</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                  <span>Alignement ODD 7 (Énergie propre) et ODD 13 (Action climatique)</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-emerald-500/20">
                <div className="text-2xl font-bold text-emerald-400">8+</div>
                <div className="text-xs text-slate-400">Fintechs orientées vers le financement vert accompagnées</div>
              </div>
            </div>

            {/* S */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-400/40 transition-all group">
              <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6 border border-amber-400/30">
                <i className="ri-user-heart-line text-2xl text-amber-400"></i>
              </div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">S — Social</div>
              <h3 className="text-xl font-bold text-white mb-4">Inclusion numérique & éthique des données</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                  <span>Conception de produits fintech accessibles aux populations non bancarisées (UX inclusive)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                  <span>Cadres éthiques pour l'utilisation des données personnelles et l'IA de scoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                  <span>Prévention des biais algorithmiques dans les modèles de crédit automatisé</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                  <span>Alignement ODD 9 (Innovation inclusive) et ODD 10 (Réduction des inégalités)</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-amber-500/20">
                <div className="text-2xl font-bold text-amber-400">10M+</div>
                <div className="text-xs text-slate-400">Utilisateurs finaux touchés par les fintechs accompagnées</div>
              </div>
            </div>

            {/* G */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-sky-500/20 hover:border-sky-400/40 transition-all group">
              <div className="w-14 h-14 bg-sky-500/20 rounded-xl flex items-center justify-center mb-6 border border-sky-400/30">
                <i className="ri-shield-check-line text-2xl text-sky-400"></i>
              </div>
              <div className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3">G — Gouvernance</div>
              <h3 className="text-xl font-bold text-white mb-4">Conformité éthique & gouvernance des algorithmes</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                  <span>Structuration de la gouvernance des données et des algorithmes décisionnels</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                  <span>Politiques KYC/AML éthiques : conformité sans discrimination des populations vulnérables</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                  <span>Transparence des modèles de pricing et protection des consommateurs numériques</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                  <span>Alignement ODD 16 (Institutions efficaces) et cadres RGPD/protection des données</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-sky-500/20">
                <div className="text-2xl font-bold text-sky-400">100%</div>
                <div className="text-xs text-slate-400">Indépendance garantie vis-à-vis des fournisseurs technologiques</div>
              </div>
            </div>
          </div>

          {/* Engagements déontologiques */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <i className="ri-award-line text-gold-400 text-2xl"></i>
              Notre charte déontologique pour les missions fintech
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: 'ri-eye-off-line', label: 'Confidentialité des données', desc: 'Aucune donnée technique ou commerciale partagée entre clients concurrents' },
                { icon: 'ri-scales-3-line', label: 'Neutralité technologique', desc: 'Recommandations indépendantes de tout partenariat fournisseur' },
                { icon: 'ri-robot-line', label: 'IA éthique', desc: 'Audit des biais algorithmiques systématique avant déploiement' },
                { icon: 'ri-graduation-cap-line', label: 'Transfert de compétences', desc: 'Chaque mission renforce l\'autonomie technique de l\'équipe client' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mb-3 border border-gold-400/30">
                    <i className={`${item.icon} text-xl text-gold-400`}></i>
                  </div>
                  <div className="font-bold text-white text-sm mb-2">{item.label}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ODD */}
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-4 uppercase tracking-wider font-semibold">Objectifs de Développement Durable alignés</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { num: 'ODD 7', label: 'Énergie propre', color: 'bg-yellow-600' },
                { num: 'ODD 8', label: 'Travail décent', color: 'bg-red-600' },
                { num: 'ODD 9', label: 'Innovation', color: 'bg-orange-600' },
                { num: 'ODD 10', label: 'Inégalités', color: 'bg-pink-700' },
                { num: 'ODD 13', label: 'Climat', color: 'bg-emerald-700' },
                { num: 'ODD 16', label: 'Justice', color: 'bg-sky-700' },
              ].map((odd, i) => (
                <div key={i} className={`${odd.color} text-white px-4 py-2 rounded-lg text-xs font-bold flex flex-col items-center min-w-[90px]`}>
                  <span className="text-base font-black">{odd.num}</span>
                  <span className="opacity-80 text-center leading-tight">{odd.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 border-t-4 border-gold-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-6">
            Prêt à lancer ou accélérer <span className="text-gold-400">votre fintech</span> ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Échangeons sur votre projet et vos ambitions. Notre équipe d'experts vous accompagne.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/services')}
              className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] whitespace-nowrap"
            >
              Découvrir nos services
            </button>
            <button
              onClick={() => {
                const btn = document.getElementById('vapi-widget-floating-button') as HTMLButtonElement;
                if (btn) btn.click();
                else scrollToHomeContact();
              }}
              className="bg-white text-brand-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-semibold cursor-pointer border-2 border-gold-400 whitespace-nowrap"
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