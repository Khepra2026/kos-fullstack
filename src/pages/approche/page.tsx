
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function ApprochePage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith?.('en') ? 'en' : 'fr';

  const methodology = [
    {
      step: 1,
      title: currentLang === 'fr' ? 'Diagnostic & Analyse' : 'Diagnostic & Analysis',
      description:
        currentLang === 'fr'
          ? 'Évaluation approfondie de votre organisation, identification des forces, faiblesses et opportunités. Analyse des processus, de la gouvernance et des performances.'
          : 'In-depth assessment of your organization, identification of strengths, weaknesses and opportunities. Analysis of processes, governance and performance.',
      icon: 'ri-search-eye-line',
      color: 'from-amber-600 to-amber-800',
      deliverables:
        currentLang === 'fr'
          ? ['Rapport de diagnostic complet', 'Cartographie des processus', 'Analyse SWOT détaillée', 'Benchmark sectoriel']
          : ['Complete diagnostic report', 'Process mapping', 'Detailed SWOT analysis', 'Sector benchmark'],
      duration: currentLang === 'fr' ? '2-4 semaines' : '2-4 weeks',
    },
    {
      step: 2,
      title: currentLang === 'fr' ? 'Stratégie & Planification' : 'Strategy & Planning',
      description:
        currentLang === 'fr'
          ? "Co-construction d'une feuille de route stratégique adaptée à vos enjeux. Définition des objectifs, KPIs et plan d'action détaillé avec vos équipes."
          : 'Co-construction of a strategic roadmap adapted to your challenges. Definition of objectives, KPIs and detailed action plan with your teams.',
      icon: 'ri-compass-3-line',
      color: 'from-teal-600 to-teal-800',
      deliverables:
        currentLang === 'fr'
          ? ['Plan stratégique 3-5 ans', 'Feuille de route opérationnelle', 'Tableau de bord KPIs', 'Budget prévisionnel']
          : ['3-5 year strategic plan', 'Operational roadmap', 'KPI dashboard', 'Budget forecast'],
      duration: currentLang === 'fr' ? '3-6 semaines' : '3-6 weeks',
    },
    {
      step: 3,
      title: currentLang === 'fr' ? 'Mise en Œuvre' : 'Implementation',
      description:
        currentLang === 'fr'
          ? 'Accompagnement opérationnel dans le déploiement des solutions. Formation des équipes, conduite du changement et pilotage des projets de transformation.'
          : 'Operational support in solution deployment. Team training, change management and transformation project management.',
      icon: 'ri-tools-line',
      color: 'from-emerald-600 to-emerald-800',
      deliverables:
        currentLang === 'fr'
          ? ['Plan de déploiement', 'Modules de formation', 'Outils de pilotage', 'Support opérationnel']
          : ['Deployment plan', 'Training modules', 'Management tools', 'Operational support'],
      duration: currentLang === 'fr' ? '3-12 mois' : '3-12 months',
    },
    {
      step: 4,
      title: currentLang === 'fr' ? 'Suivi & Optimisation' : 'Monitoring & Optimization',
      description:
        currentLang === 'fr'
          ? 'Suivi post-mission à 3, 6 et 12 mois. Mesure des résultats, ajustements et optimisation continue pour garantir la pérennité des transformations.'
          : 'Post-mission follow-up at 3, 6 and 12 months. Results measurement, adjustments and continuous optimization to ensure sustainability of transformations.',
      icon: 'ri-line-chart-line',
      color: 'from-orange-600 to-orange-800',
      deliverables:
        currentLang === 'fr'
          ? ['Rapports de suivi trimestriels', 'Analyse des écarts', "Recommandations d'optimisation", 'Support continu']
          : ['Quarterly monitoring reports', 'Gap analysis', 'Optimization recommendations', 'Continuous support'],
      duration: currentLang === 'fr' ? '12 mois' : '12 months',
    },
  ];

  const principles = [
    {
      title: currentLang === 'fr' ? 'Approche Collaborative' : 'Collaborative Approach',
      description:
        currentLang === 'fr'
          ? 'Nous travaillons main dans la main avec vos équipes pour co-construire des solutions adaptées à votre contexte et garantir leur appropriation.'
          : 'We work hand in hand with your teams to co-build solutions adapted to your context and ensure their ownership.',
      icon: 'ri-team-line',
    },
    {
      title: currentLang === 'fr' ? 'Expertise Terrain' : 'Field Expertise',
      description:
        currentLang === 'fr'
          ? "22 ans d'expérience en Afrique nous permettent de comprendre les réalités locales et d'adapter nos méthodologies aux contextes africains."
          : '22 years of experience in Africa allow us to understand local realities and adapt our methodologies to African contexts.',
      icon: 'ri-map-pin-line',
    },
    {
      title: currentLang === 'fr' ? 'Standards Internationaux' : 'International Standards',
      description:
        currentLang === 'fr'
          ? 'Nos méthodologies sont conformes aux standards internationaux (IFC, COSO, Bâle II/III) tout en étant adaptées aux réalités africaines.'
          : 'Our methodologies comply with international standards (IFC, COSO, Basel II/III) while being adapted to African realities.',
      icon: 'ri-global-line',
    },
    {
      title: currentLang === 'fr' ? 'Résultats Mesurables' : 'Measurable Results',
      description:
        currentLang === 'fr'
          ? "Nous définissons des KPIs clairs dès le départ et mesurons systématiquement l'impact de nos interventions pour garantir un ROI tangible."
          : 'We define clear KPIs from the start and systematically measure the impact of our interventions to guarantee tangible ROI.',
      icon: 'ri-dashboard-line',
    },
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/approche#webpage`,
        url: `${SITE_URL}/approche`,
        name: currentLang === 'fr' ? 'Notre Approche | KHEPRA EXPERTS' : 'Our Approach | KHEPRA EXPERTS',
        description:
          currentLang === 'fr'
            ? 'Découvrez la méthodologie KHEPRA EXPERTS en 4 étapes : diagnostic, stratégie, mise en œuvre et suivi. Une approche collaborative et orientée résultats.'
            : 'Discover the KHEPRA EXPERTS methodology in 4 steps: diagnostic, strategy, implementation and monitoring. A collaborative and results-oriented approach.',
        inLanguage: currentLang === 'fr' ? 'fr-FR' : 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'KHEPRA EXPERTS',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: currentLang === 'fr' ? 'Accueil' : 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: currentLang === 'fr' ? 'Approche' : 'Approach',
            item: `${SITE_URL}/approche`,
          },
        ],
      },
    ],
  };

  // Helper to safely open the VAPI widget
  const handleTalkToExpert = () => {
    try {
      const expertButton = document.getElementById('vapi-widget-floating-button') as HTMLButtonElement | null;
      if (expertButton) {
        expertButton.click();
      } else {
        console.warn('VAPI widget button not found.');
      }
    } catch (e) {
      console.error('Error triggering VAPI widget:', e);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={
          currentLang === 'fr'
            ? 'Notre Approche | Méthodologie Gouvernance, Conformité & Investment Readiness'
            : 'Our Approach | Governance, Compliance & Investment Readiness Methodology'
        }
        description={
          currentLang === 'fr'
            ? "Méthodologie en 4 étapes : diagnostic, stratégie, mise en œuvre, suivi. IFC, COSO, Bâle. Approche collaborative, KPIs mesurables. 22 ans en Afrique."
            : '4-step methodology: diagnostic, strategy, implementation, monitoring. IFC, COSO, Basel. Collaborative approach, measurable KPIs. 22 years in Africa.'
        }
        keywords={
          currentLang === 'fr'
            ? 'méthodologie conseil Afrique, approche collaborative, diagnostic organisationnel, stratégie entreprise, mise en œuvre transformation, suivi performance, cabinet conseil méthodologie'
            : 'Africa advisory methodology, collaborative approach, organizational diagnostic, business strategy, transformation implementation, performance monitoring, advisory firm methodology'
        }
        canonicalPath="/approche"
        ogType="website"
        ogImage={OG_IMAGES.SERVICES}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        schemaJson={schemaData}
      />
      <Navigation />

      <main className="pt-32 pb-20" id="main-content">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb
            items={[
              { label: currentLang === 'fr' ? 'Accueil' : 'Home', href: '/' },
              { label: currentLang === 'fr' ? 'Approche' : 'Approach', href: '/approche' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 border border-gold-200 rounded-full mb-6">
              <i className="ri-route-line text-gold-600" />
              <span className="text-sm font-semibold text-gold-700">
                {currentLang === 'fr' ? 'Méthodologie Éprouvée' : 'Proven Methodology'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              {currentLang === 'fr'
                ? 'Notre Approche : Une Méthodologie en 4 Étapes'
                : 'Our Approach: A 4-Step Methodology'}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {currentLang === 'fr'
                ? "Une méthodologie collaborative et orientée résultats, éprouvée sur plus de 100 missions en Afrique de l'Ouest et Centrale. Nous combinons expertise internationale et connaissance terrain pour garantir le succès de vos transformations."
                : 'A collaborative and results-oriented methodology, proven on over 100 missions in West and Central Africa. We combine international expertise and field knowledge to guarantee the success of your transformations.'}
            </p>
          </div>
        </section>

        {/* Methodology Steps */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="space-y-16">
            {methodology.map((step, index) => (
              <div
                key={step.step}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Visual */}
                <div className="flex-1">
                  <div className="relative">
                    <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${step.color} p-12 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10">
                        <img
                          src={`https://readdy.ai/api/search-image?query=Professional%20African%20business%20consulting%20team%20working%20on%20$%7BencodeURIComponent%28%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20step.title.toLowerCase%28%29%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%29%7D%20in%20modern%20office%20environment%2C%20collaborative%20workspace%20with%20diverse%20professionals%2C%20strategic%20planning%20session%2C%20clean%20corporate%20atmosphere%2C%20bright%20natural%20lighting%2C%20professional%20business%20setting%20in%20Africa&width=800&height=600&seq=approche-step-${step.step}&orientation=landscape`}
                          alt={step.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/40">
                          <i className={`${step.icon} text-5xl text-white`} />
                        </div>
                        <div className="text-6xl font-bold text-white/30">{step.step}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full mb-4">
                    <span className="text-xs font-bold text-gold-700">
                      {currentLang === 'fr' ? 'ÉTAPE' : 'STEP'} {step.step}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-brand-900 mb-4">{step.title}</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                    <i className="ri-time-line text-gold-600" />
                    <span>
                      {currentLang === 'fr' ? 'Durée :' : 'Duration:'}{' '}
                      <strong className="text-brand-900">{step.duration}</strong>
                    </span>
                  </div>

                  {/* Deliverables */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-sm font-bold text-brand-900 mb-3 uppercase tracking-wider">
                      {currentLang === 'fr' ? 'Livrables' : 'Deliverables'}
                    </h3>
                    <ul className="space-y-2">
                      {step.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <i className="ri-checkbox-circle-fill text-gold-600 mt-0.5 flex-shrink-0" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Principles Section */}
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {currentLang === 'fr' ? 'Nos Principes Fondamentaux' : 'Our Core Principles'}
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl">
                {currentLang === 'fr'
                  ? 'Les valeurs qui guident notre approche et garantissent le succès de nos missions'
                  : 'The values that guide our approach and guarantee the success of our missions'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gold-500 text-white mb-4">
                    <i className={`${principle.icon} text-2xl`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{principle.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-br from-gold-50 to-amber-50 border border-gold-200 rounded-3xl p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gold-300 rounded-full mb-6">
              <i className="ri-customer-service-2-line text-gold-600" />
              <span className="text-sm font-semibold text-gold-700">
                {currentLang === 'fr' ? 'Parlons de Votre Projet' : "Let's Talk About Your Project"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 mb-4">
              {currentLang === 'fr' ? 'Prêt à Démarrer Votre Transformation ?' : 'Ready to Start Your Transformation?'}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {currentLang === 'fr'
                ? 'Discutons de vos défis et découvrez comment notre méthodologie peut vous aider à atteindre vos objectifs stratégiques.'
                : "Let's discuss your challenges and discover how our methodology can help you achieve your strategic objectives."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleTalkToExpert}
                className="px-8 py-4 bg-gradient-to-r from-gold-600 to-amber-600 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2"
              >
                <i className="ri-phone-line text-xl" />
                {currentLang === 'fr' ? 'Parler à un expert' : 'Talk to an expert'}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white text-brand-900 border-2 border-brand-900 rounded-full font-semibold hover:bg-brand-900 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                {currentLang === 'fr' ? 'Nous contacter' : 'Contact us'}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
