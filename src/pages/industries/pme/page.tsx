import { IndustryMiniCTA } from '@/components/feature/IndustryMiniCTA';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { OG_IMAGES } from '@/components/feature/OgImages';
import ScrollToTop from '@/components/feature/ScrollToTop';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function PMEPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const challenges = [
    {
      icon: 'ri-line-chart-line',
      title: 'Croissance durable',
      description: 'Structurer la croissance et passer à l\'échelle supérieure'
    },
    {
      icon: 'ri-funds-line',
      title: 'Accès au financement',
      description: 'Obtenir des financements adaptés et optimiser la structure financière'
    },
    {
      icon: 'ri-team-line',
      title: 'Gestion des talents',
      description: 'Attirer, former et retenir les compétences clés'
    },
    {
      icon: 'ri-global-line',
      title: 'Expansion régionale',
      description: 'Se développer sur de nouveaux marchés africains'
    }
  ];

  const solutions = [
    {
      title: 'Stratégie & Croissance',
      services: [
        'Plan stratégique de développement',
        'Étude de marché et positionnement',
        'Modèle économique et business plan',
        'Stratégie d\'expansion régionale'
      ],
      icon: 'ri-lightbulb-line'
    },
    {
      title: 'Gouvernance & Organisation',
      services: [
        'Structuration organisationnelle',
        'Mise en place de la gouvernance',
        'Processus et procédures',
        'Systèmes de pilotage et KPIs'
      ],
      icon: 'ri-shield-check-line'
    },
    {
      title: 'Finance & Performance',
      services: [
        'Optimisation financière',
        'Levée de fonds et financement',
        'Contrôle de gestion',
        'Audit et due diligence'
      ],
      icon: 'ri-bar-chart-2-line'
    },
    {
      title: 'Digital & Innovation',
      services: [
        'Transformation digitale',
        'Systèmes d\'information',
        'E-commerce et marketing digital',
        'Innovation et R&D'
      ],
      icon: 'ri-smartphone-line'
    }
  ];

  const stats = [
    { value: '200+', label: 'PME accompagnées' },
    { value: '15', label: 'Pays d\'intervention' },
    { value: '3x', label: 'Croissance moyenne' },
    { value: '85%', label: 'Taux de réussite' }
  ];

  const caseStudies = [
    {
      title: 'Structuration d\'une startup agritech au Sénégal',
      challenge: 'Croissance rapide non structurée',
      solution: 'Mise en place gouvernance, processus et levée de fonds',
      result: '2M€ levés, équipe x3, expansion 4 pays',
      sector: 'PME & Startups'
    },
    {
      title: 'Transformation digitale d\'une PME de distribution',
      challenge: 'Processus manuels et faible visibilité',
      solution: 'ERP, e-commerce et formation équipes',
      result: '+150% CA en 18 mois, -40% coûts opérationnels',
      sector: 'PME & Startups'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/industries/pme#service`,
        serviceType: 'Conseil PME et Entrepreneuriat',
        provider: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL
        },
        areaServed: {
          '@type': 'Place',
          name: 'Afrique'
        },
        description: t('industries.pmeSeo.seo.description')
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/industries/pme#breadcrumb`,
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
            name: 'PME & Startups — CEO Advisory Board Africa™',
            item: `${SITE_URL}/industries/pme`
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={t('industries.pmeSeo.seo.title')}
        description={t('industries.pmeSeo.seo.description')}
        keywords={t('industries.pmeSeo.seo.keywords')}
        canonicalPath="/industries/pme"
        ogType="website"
        ogImage={OG_IMAGES.PME}
        ogImageAlt="PME et Entrepreneuriat en Afrique – KHEPRA EXPERTS | Conseil développement PME africaines"
        ogImageWidth="1200"
        ogImageHeight="630"
        twitterLabel1="Secteur"
        twitterData1="PME & Startups"
        twitterLabel2="Pays couverts"
        twitterData2="15+"
        schemaJson={jsonLd}
        hreflangLinks={STATIC_HREFLANG_MAP['/industries/pme/']}
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
              { label: 'PME & Startups — CEO Advisory Board Africa™' }
            ]}
            variant="light"
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <i className="ri-rocket-line"></i>
                Secteur d'expertise
              </div>
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                PME & Startups
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Accélérez votre croissance avec un accompagnement stratégique adapté aux réalités africaines et aux ambitions internationales.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/services')}
                  className="bg-gold-500 text-white px-8 py-4 rounded-full hover:bg-gold-600 transition-all font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Nos solutions
                  <i className="ri-arrow-right-line"></i>
                </button>
                <button
                  onClick={scrollToHomeContact}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all font-semibold border border-white/20 cursor-pointer"
                >
                  Nous contacter
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent rounded-3xl blur-3xl"></div>
              <img
                src="https://readdy.ai/api/search-image?query=African%20entrepreneurs%20startup%20team%20working%20together%20modern%20office%20collaborative%20workspace%20innovation%20technology%20diverse%20team%20professional%20setting%20simple%20clean%20background&width=600&height=500&seq=pme001&orientation=landscape"
                alt="Équipe de startup africaine"
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

      {/* Challenges Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
              Défis des PME africaines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des enjeux spécifiques nécessitant une expertise locale et une vision internationale
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

      {/* Lead Magnet CTA - Après Challenges */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IndustryMiniCTA guide="investment-readiness" />
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
              Un accompagnement 360° pour structurer, développer et pérenniser votre entreprise
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

      {/* Lead Magnet CTA - Après Solutions */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IndustryMiniCTA guide="esg" />
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
              Études de cas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des transformations réussies pour nos clients PME et startups
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all">
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

      {/* ESG & Impact Sectoriel PME */}
      <section className="py-20 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
              <i className="ri-leaf-line"></i>
              ESG · Gouvernance éthique · Croissance durable
            </div>
            <h2 className="font-playfair text-4xl font-bold text-white mb-4">
              PME durables :<br />
              <span className="text-emerald-400">l'ESG comme levier de compétitivité</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Les PME africaines qui intègrent l'ESG accèdent à de nouveaux financements, fidélisent leurs talents et sécurisent leurs marchés. Nous structurons cette transition de façon opérationnelle et mesurable.
            </p>
          </div>

          {/* Pourquoi l'ESG est un avantage concurrentiel pour les PME */}
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-400/40 transition-all group">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 border border-emerald-400/30">
                <i className="ri-plant-line text-2xl text-emerald-400"></i>
              </div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">E — Environnemental</div>
              <h3 className="text-xl font-bold text-white mb-4">Efficacité opérationnelle & accès aux marchés verts</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                  <span>Diagnostic empreinte carbone et plan de réduction des coûts énergétiques (-20 à -35%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                  <span>Accès aux financements verts (BOAD, AFD, fonds d'impact) conditionnés à des critères ESG</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                  <span>Certification et labellisation pour accéder aux marchés publics et appels d'offres internationaux</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                  <span>Alignement ODD 12 (Consommation responsable) et ODD 13 (Action climatique)</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-emerald-500/20">
                <div className="text-2xl font-bold text-emerald-400">-28%</div>
                <div className="text-xs text-slate-400">Réduction moyenne des coûts opérationnels via l'efficacité énergétique</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-400/40 transition-all group">
              <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6 border border-amber-400/30">
                <i className="ri-team-line text-2xl text-amber-400"></i>
              </div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">S — Social</div>
              <h3 className="text-xl font-bold text-white mb-4">Capital humain & ancrage territorial</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                  <span>Politiques RH inclusives : égalité femmes-hommes, formation continue, mobilité interne</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                  <span>Stratégies d'ancrage local : sourcing fournisseurs locaux, emploi jeunes, formation artisans</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                  <span>Mesure d'impact social : emplois créés, revenus générés, communautés bénéficiaires</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-amber-400 mt-0.5 flex-shrink-0"></i>
                  <span>Alignement ODD 8 (Travail décent) et ODD 5 (Égalité des sexes)</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-amber-500/20">
                <div className="text-2xl font-bold text-amber-400">+42%</div>
                <div className="text-xs text-slate-400">Rétention des talents dans les PME avec politique RH structurée</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-sky-500/20 hover:border-sky-400/40 transition-all group">
              <div className="w-14 h-14 bg-sky-500/20 rounded-xl flex items-center justify-center mb-6 border border-sky-400/30">
                <i className="ri-shield-check-line text-2xl text-sky-400"></i>
              </div>
              <div className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3">G — Gouvernance</div>
              <h3 className="text-xl font-bold text-white mb-4">Gouvernance éthique & accès au financement</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                  <span>Structuration de la gouvernance familiale : séparation propriété/gestion, conseil d'administration</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                  <span>Politiques anti-corruption, gestion des conflits d'intérêts et transparence financière</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                  <span>Préparation aux due diligences ESG des investisseurs (fonds d'impact, DFIs, banques)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                  <span>Alignement ODD 16 (Institutions efficaces) et standards OCDE pour PME</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-sky-500/20">
                <div className="text-2xl font-bold text-sky-400">×3</div>
                <div className="text-xs text-slate-400">Accès au financement multiplié pour les PME avec gouvernance structurée</div>
              </div>
            </div>
          </div>

          {/* Parcours ESG PME */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-10">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <i className="ri-route-line text-gold-400 text-2xl"></i>
              Notre parcours ESG pour PME africaines — 4 étapes concrètes
            </h3>
            <p className="text-slate-400 text-sm mb-8">De l'évaluation initiale au rapport ESG investisseur-ready</p>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Diagnostic ESG', duration: '2–3 sem.', desc: 'Évaluation de la maturité ESG sur 40 critères : environnement, social, gouvernance, conformité', color: 'border-emerald-500/40 bg-emerald-500/10' },
                { step: '02', title: 'Feuille de route', duration: '1 mois', desc: 'Plan d\'action priorisé avec quick wins (30j), actions structurantes (90j) et objectifs long terme (1 an)', color: 'border-amber-500/40 bg-amber-500/10' },
                { step: '03', title: 'Mise en œuvre', duration: '3–6 mois', desc: 'Déploiement opérationnel : politiques, procédures, formation équipes, outils de mesure d\'impact', color: 'border-sky-500/40 bg-sky-500/10' },
                { step: '04', title: 'Rapport ESG', duration: 'Annuel', desc: 'Rapport ESG structuré selon les standards GRI/SASB, prêt pour les investisseurs et partenaires financiers', color: 'border-gold-500/40 bg-gold-500/10' },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-6 border ${item.color}`}>
                  <div className="text-3xl font-black text-white/20 mb-3">{item.step}</div>
                  <div className="font-bold text-white mb-1">{item.title}</div>
                  <div className="text-xs text-gold-400 font-semibold mb-3">{item.duration}</div>
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
                { num: 'ODD 5', label: 'Égalité des sexes', color: 'bg-red-500' },
                { num: 'ODD 8', label: 'Travail décent', color: 'bg-red-600' },
                { num: 'ODD 9', label: 'Innovation', color: 'bg-orange-600' },
                { num: 'ODD 12', label: 'Consommation', color: 'bg-amber-700' },
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
      <section className="py-20 bg-gradient-to-br from-brand-900 to-brand-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-6">
            Prêt à accélérer votre croissance ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Échangeons sur vos ambitions et défis. Notre équipe d'experts vous accompagne.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/services')}
              className="bg-gold-500 text-white px-8 py-4 rounded-full hover:bg-gold-600 transition-all font-semibold cursor-pointer shadow-lg"
            >
              Découvrir nos services
            </button>
            <button
              onClick={() => {
                const btn = document.getElementById('vapi-widget-floating-button') as HTMLButtonElement;
                if (btn) btn.click();
                else scrollToHomeContact();
              }}
              className="bg-white text-brand-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-semibold cursor-pointer"
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