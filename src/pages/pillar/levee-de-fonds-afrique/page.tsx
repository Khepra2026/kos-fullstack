import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import ScrollToTop from '@/components/feature/ScrollToTop';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { VisibleBreadcrumb } from '@/components/feature/VisibleBreadcrumb';
import ContextualCTA from '@/components/feature/ContextualCTA';
import SocialShareWidget from '@/components/feature/SocialShareWidget';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const OG_IMAGE = 'https://readdy.ai/api/search-image?query=African%20startup%20founders%20presenting%20their%20business%20pitch%20to%20investors%20in%20a%20sleek%20dark%20modern%20conference%20room%20in%20Cotonou%20Benin%2C%20professional%20business%20meeting%20with%20laptops%20and%20financial%20charts%20on%20large%20screen%2C%20diverse%20African%20entrepreneurs%20in%20formal%20attire%2C%20deloitte%20green%20and%20dark%20charcoal%20color%20tones%2C%20venture%20capital%20presentation%20atmosphere%2C%20high%20quality%20editorial%20photography%20style&width=1200&height=630&seq=levee-fonds-hero-green&orientation=landscape';

export default function LeveeDeFondsAfriquePage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Levée de fonds Afrique' }
  ];

  const visibleBreadcrumbItems = [
    { label: 'Accueil', href: '/', url: `${SITE_URL}/` },
    { label: 'Levée de fonds Afrique', url: `${SITE_URL}/levee-de-fonds-afrique` }
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
        '@id': `${SITE_URL}/levee-de-fonds-afrique#webpage`,
        url: `${SITE_URL}/levee-de-fonds-afrique`,
        name: 'Levée de fonds pour startups Afrique francophone',
        description: 'Guide complet sur la levée de fonds pour startups en Afrique francophone. Processus étape par étape, pièges à éviter, contacts investisseurs et expertise Khepra Experts.',
        inLanguage: 'fr',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'Khepra Experts'
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/levee-de-fonds-afrique#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Levée de fonds Afrique' }
          ]
        }
      },
      {
        '@type': 'Article',
        '@id': `${SITE_URL}/levee-de-fonds-afrique#article`,
        headline: 'Levée de fonds pour startups en Afrique francophone : guide pratique',
        description: 'Comment lever des fonds pour sa startup en Afrique francophone ? Process, pièges classiques, contacts investisseurs et accompagnement Khepra Experts Lomé.',
        author: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
          description: 'Cabinet de conseil en levée de fonds basé à Lomé, Togo. 120M+ USD levés pour nos clients en Afrique de l\'Ouest et Centrale.'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` }
        },
        datePublished: '2025-05-12',
        dateModified: '2025-05-12',
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/levee-de-fonds-afrique#webpage` },
        keywords: 'levée de fonds startup Afrique, investisseurs Afrique francophone, venture capital UEMOA, fundraising Togo Bénin CIV, business plan investisseur',
        articleSection: 'Levée de fonds',
        inLanguage: 'fr',
        wordCount: 1000,
        timeRequired: 'PT5M',
        educationalLevel: 'Professional'
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/levee-de-fonds-afrique#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quel est le processus complet de levée de fonds pour une startup en Afrique francophone ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le processus de levée de fonds en Afrique francophone comprend 6 phases : (1) Préparation — structuration juridique OHADA, due diligence comptable, élaboration du business plan et du pitch deck (6-8 semaines), (2) Pré-seed/Amorçage — love money, business angels africains, fonds d\'amorçage locaux (50K-500K USD), (3) Seed — fonds de venture capital spécialisés Afrique (500K-2M USD), (4) Série A — expansion régionale, preuve de traction commerciale (2M-10M USD), (5) Due diligence investisseur — audit financier, légal et technique approfondi (4-12 semaines), (6) Closing — négociation des termes sheet, constitution des collatéraux, et versement des fonds. La durée totale varie de 4 à 12 mois selon la maturité de la startup et l\'attractivité du marché.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quels sont les pièges les plus courants lors d\'une levée de fonds en Afrique de l\'Ouest ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les 5 pièges mortels à éviter : (1) Valorisation irréaliste — surestimer la valorisation sans traction commerciale tangible éloigne les investisseurs sérieux, (2) Structure juridique bancale — statut non adapté (SARL au lieu de SA pour lever des fonds VC), pas de pacte d\'actionnaires, capital social insuffisant, (3) Comptabilité opaque — états financiers non audités, mélange compte perso/compte pro, pas de reporting mensuel, (4) Marché mal ciblé — absence d\'étude de marché solide sur le Togo/Bénin/CIV, concurrence sous-estimée, (5) Équipe incomplète — fondateur solo sans co-fondateur technique ou commercial, pas de conseil d\'administration. Khepra Experts accompagne les startups pour sécuriser chaque étape et éviter ces écueils.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quels investisseurs et fonds ciblent les startups en Afrique francophone en 2025 ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les principaux acteurs de l\'écosystème en 2025 : Fonds d\'amorçage — Samaipata Africa, Partech Africa, Launch Africa, Flat6Labs (Casablanca, Tunis), DFS Lab ; Fonds de développement — IFC Venture Capital, Proparco, AfDB Ventures, BOAD Investissement ; Business Angels réseaux — ABAN (African Business Angel Network), angel clubs à Abidjan, Cotonou, Lomé, Dakar ; Accélérateurs — MEST (Ghana), iHub (Nigeria), CTIC Dakar ; Corporate VC — MTN Yello Digital, Orange Digital Ventures, Société Générale Ventures. Khepra Experts maintient un réseau actif de 80+ investisseurs et intermédiaires spécialisés sur la zone UEMOA/CEMAC.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title="Levée de fonds startup Afrique francophone | Khepra Experts"
        description="Guide pratique pour lever des fonds en Afrique francophone. Process, pièges, contacts investisseurs. Accompagnement Khepra Experts Lomé. +228 93 98 49 09"
        keywords="levée de fonds startup Afrique, investisseurs Afrique francophone, venture capital UEMOA, fundraising Togo Bénin CIV, business plan investisseur"
        canonicalPath="/levee-de-fonds-afrique"
        ogType="article"
        structuredData={schemaJson}
        ogImage={OG_IMAGE}
        ogImageAlt="Fondateurs de startup africaine présentant leur projet à des investisseurs dans une salle de conférence moderne à Cotonou, Bénin"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogLocale="fr_FR"
        articlePublishedTime="2025-05-12T00:00:00Z"
        articleModifiedTime="2025-05-12T00:00:00Z"
        articleAuthor="Khepra Experts"
        articleSection="Levée de fonds"
        articleTags={['Levée de fonds', 'Startup', 'Afrique francophone', 'Venture Capital', 'UEMOA', 'Investisseurs']}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />

            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Levée de fonds pour startups Afrique francophone
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Lever des fonds pour sa startup en <strong>Afrique francophone</strong> demande une préparation rigoureuse, une structure juridique solide sous <strong>OHADA</strong>, et un accès au bon réseau d'investisseurs. Khepra Experts, basé à <strong>Lomé, Togo</strong>, a accompagné la levée de <strong>120M+ USD</strong> pour des entrepreneurs ouest-africains. Voici le process complet, les pièges à éviter et les contacts essentiels.
              </p>

              <div className="mb-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Le financement des startups en Afrique : l'état des lieux</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-xl p-6 shadow-md text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-money-dollar-circle-line text-2xl text-amber-600"></i>
                    </div>
                    <div className="text-3xl font-bold text-amber-700 mb-2">5,4 Mds$</div>
                    <p className="text-sm text-gray-600">Investissements startup Afrique en 2023</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-building-2-line text-2xl text-amber-600"></i>
                    </div>
                    <div className="text-3xl font-bold text-amber-700 mb-2">700+</div>
                    <p className="text-sm text-gray-600">Startups ayant levé des fonds en zone UEMOA</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-global-line text-2xl text-amber-600"></i>
                    </div>
                    <div className="text-3xl font-bold text-amber-700 mb-2">Nigeria 48%</div>
                    <p className="text-sm text-gray-600">Part des investissements, mais CIV/Togo/Bénin en forte croissance</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  L'Afrique francophone représente aujourd'hui <strong>18% des deals</strong> du continent, contre 8% il y a 5 ans. Le Togo, le Bénin et la Côte d'Ivoire émergent comme hubs régionaux avec des écosystèmes de plus en plus structurés. Mais le taux de réussite des levées reste faible : <strong>moins de 10% des dossiers</strong> présentés aux fonds obtiennent un financement.
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Processus de levée de fonds en 6 phases</h2>
                <div className="space-y-6">
                  {[
                    {
                      phase: 'Phase 1 — Préparation',
                      duration: '6-8 semaines',
                      icon: 'ri-search-eye-line',
                      items: [
                        'Structuration juridique OHADA : choix SA vs SAS pour levée VC',
                        'Due diligence comptable : 3 ans d\'états financiers audités',
                        'Élaboration du business plan financier sur 5 ans',
                        'Création du pitch deck (12-15 slides) et du one-pager',
                        'Constitution du data room virtuel avec documents clés'
                      ]
                    },
                    {
                      phase: 'Phase 2 — Pré-seed / Amorçage',
                      duration: '50K - 500K USD',
                      icon: 'ri-rocket-line',
                      items: [
                        'Love money : famille, amis, fondateurs (10-50K USD)',
                        'Business angels africains : ABAN, clubs d\'anges locaux',
                        'Fonds d\'amorçage : Samaipata Africa, Launch Africa, Flat6Labs',
                        'Subventions et concours : Orange Corners, Tony Elumelu Foundation'
                      ]
                    },
                    {
                      phase: 'Phase 3 — Seed',
                      duration: '500K - 2M USD',
                      icon: 'ri-line-chart-line',
                      items: [
                        'Fonds de venture capital spécialisés Afrique : Partech, TLcom, Savannah',
                        'Preuve de traction : 6-12 mois de revenus récurrents',
                        'Premiers clients référents et étude de marché robuste',
                        'Équipe complète : fondateur + CTO + CCO minimum'
                      ]
                    },
                    {
                      phase: 'Phase 4 — Série A',
                      duration: '2M - 10M USD',
                      icon: 'ri-bar-chart-line',
                      items: [
                        'Expansion régionale UEMOA ou CEMAC',
                        'Modèle économique validé avec unit economics positives',
                        'Fonds de growth : AfricInvest, Adenia, Helios',
                        'Corporate venture capital : MTN, Orange, Société Générale'
                      ]
                    },
                    {
                      phase: 'Phase 5 — Due diligence investisseur',
                      duration: '4-12 semaines',
                      icon: 'ri-shield-check-line',
                      items: [
                        'Audit financier complet par cabinet externe (Big 4 ou local)',
                        'Audit légal : statuts, contrats, propriété intellectuelle',
                        'Audit technique : stack technologique, sécurité, scalabilité',
                        'Vérification antécédents dirigeants (background check)'
                      ]
                    },
                    {
                      phase: 'Phase 6 — Closing',
                      duration: '2-4 semaines',
                      icon: 'ri-user-heart-line',
                      items: [
                        'Négociation et signature du term sheet',
                        'Constitution des sûretés et collatéraux',
                        'Assemblée générale extraordinaire pour augmentation de capital',
                        'Versement des fonds et émission des nouvelles actions'
                      ]
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-white border-l-4 border-amber-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className={`${item.icon} text-2xl text-amber-600`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                            <h3 className="text-xl font-bold text-gray-900">{item.phase}</h3>
                            <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">{item.duration}</span>
                          </div>
                          <ul className="space-y-2 mt-3">
                            {item.items.map((li, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <i className="ri-checkbox-circle-line text-amber-600 mt-1 flex-shrink-0"></i>
                                <span>{li}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">5 pièges mortels à éviter lors d'une levée de fonds</h2>
                <div className="space-y-5">
                  {[
                    {
                      title: '1. Valorisation irréaliste',
                      desc: 'Surestimer la valorisation sans traction commerciale tangible éloigne les investisseurs sérieux. Une startup pre-revenue ne peut pas se valoriser à 10M USD. Khepra Experts établit des valorisations fondées sur les comparables du marché local et les métriques sectorielles.',
                      color: 'border-red-500',
                      icon: 'ri-error-warning-line'
                    },
                    {
                      title: '2. Structure juridique bancale',
                      desc: 'Une SARL ne permet pas facilement de lever des fonds VC. Il faut une SA ou SAS avec capital social suffisant, pacte d\'actionnaires clair, et protection de la propriété intellectuelle. Khepra Experts restructure les statuts pour les rendre investisseur-friendly.',
                      color: 'border-orange-500',
                      icon: 'ri-file-list-3-line'
                    },
                    {
                      title: '3. Comptabilité opaque',
                      desc: 'États financiers non audités, mélange compte perso/compte pro, absence de reporting mensuel. Les investisseurs refusent systématiquement les dossiers avec une comptabilité floue. Khepra Experts produit des comptes certifiés OHADA en 4-6 semaines.',
                      color: 'border-amber-500',
                      icon: 'ri-shield-check-line'
                    },
                    {
                      title: '4. Marché mal ciblé',
                      desc: 'Absence d\'étude de marché solide sur le Togo/Bénin/CIV, concurrence sous-estimée, taille du marché (TAM/SAM/SOM) non calculée. Khepra Experts réalise des études de marché primaires et secondaires pour valider l\'opportunité.',
                      color: 'border-yellow-500',
                      icon: 'ri-global-line'
                    },
                    {
                      title: '5. Équipe incomplète',
                      desc: 'Fondateur solo sans co-fondateur technique ou commercial, pas de conseil d\'administration, pas d\'expert-comptable. Les fonds investissent dans les équipes, pas dans les idées seules. Khepra Experts aide à constituer un advisory board crédible.',
                      color: 'border-amber-600',
                      icon: 'ri-team-line'
                    }
                  ].map((item, i) => (
                    <div key={i} className={`border-l-4 ${item.color} bg-gray-50 rounded-r-xl p-5`}>
                      <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <i className={`${item.icon} text-orange-600`}></i>
                        {item.title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Investisseurs et fonds actifs en Afrique francophone (2025)</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    {
                      category: 'Fonds d\'amorçage',
                      funds: 'Samaipata Africa, Launch Africa, Flat6Labs, DFS Lab, MEST',
                      focus: 'Tickets 50K-500K USD, pré-seed et seed',
                      icon: 'ri-rocket-line'
                    },
                    {
                      category: 'Venture Capital',
                      funds: 'Partech Africa, TLcom Capital, Savannah Fund, Adenia Partners',
                      focus: 'Tickets 500K-5M USD, seed à série A',
                      icon: 'ri-bar-chart-line'
                    },
                    {
                      category: 'Fonds de développement',
                      funds: 'IFC Venture Capital, Proparco, AfDB Ventures, BOAD Investissement',
                      focus: 'Tickets 1M-10M USD, impact et développement',
                      icon: 'ri-building-2-line'
                    },
                    {
                      category: 'Corporate VC',
                      funds: 'MTN Yello Digital, Orange Digital Ventures, Société Générale Ventures',
                      focus: 'Stratégique, accès au marché et distribution',
                      icon: 'ri-user-heart-line'
                    },
                    {
                      category: 'Business Angels',
                      funds: 'ABAN, clubs d\'anges Abidjan/Cotonou/Lomé/Dakar',
                      focus: 'Tickets 10K-100K USD, mentoring inclus',
                      icon: 'ri-user-heart-line'
                    },
                    {
                      category: 'Accélérateurs',
                      funds: 'MEST Ghana, CTIC Dakar, iHub Nigeria, Simplon CIV',
                      focus: 'Préparation à la levée, réseau investisseurs',
                      icon: 'ri-line-chart-line'
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className={`${item.icon} text-xl text-amber-600`}></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{item.category}</h3>
                          <p className="text-sm text-gray-700 mb-1">{item.funds}</p>
                          <p className="text-xs text-amber-700 font-semibold">{item.focus}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mt-6">
                  <strong>Réseau Khepra Experts</strong> : Notre cabinet entretient des relations actives avec <strong>80+ investisseurs</strong> et intermédiaires spécialisés sur la zone UEMOA/CEMAC. Nous facilitons les introductions qualifiées et préparons les entrepreneurs à pitcher devant les bons fonds au bon moment.
                </p>
              </div>

              <div className="mb-16 bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ressources connexes</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link to="/conseil-strategique-pme-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                      <i className="ri-compass-3-line text-xl text-emerald-600"></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Conseil stratégique PME</h4>
                    <p className="text-sm text-gray-600">Plan stratégique OHADA, méthodologie et cas client au Togo</p>
                  </Link>
                  <Link to="/transformation-digitale-ohada" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <i className="ri-computer-line text-xl text-teal-600"></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Transformation digitale OHADA</h4>
                    <p className="text-sm text-gray-600">Outils, conformité et ROI de la digitalisation pour entreprises africaines</p>
                  </Link>
                  <Link to="/" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                      <i className="ri-home-line text-xl text-amber-600"></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Accueil Khepra Experts</h4>
                    <p className="text-sm text-gray-600">Conseil stratégique, finance et transformation digitale en Afrique</p>
                  </Link>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Questions fréquentes — Levée de fonds Afrique</h2>
                <div className="space-y-4">
                  {[
                    {
                      q: 'Quel est le processus complet de levée de fonds pour une startup en Afrique francophone ?',
                      a: 'Le processus de levée de fonds en Afrique francophone comprend 6 phases : (1) Préparation — structuration juridique OHADA, due diligence comptable, élaboration du business plan et du pitch deck (6-8 semaines), (2) Pré-seed/Amorçage — love money, business angels africains, fonds d\'amorçage locaux (50K-500K USD), (3) Seed — fonds de venture capital spécialisés Afrique (500K-2M USD), (4) Série A — expansion régionale, preuve de traction commerciale (2M-10M USD), (5) Due diligence investisseur — audit financier, légal et technique approfondi (4-12 semaines), (6) Closing — négociation des termes sheet, constitution des collatéraux, et versement des fonds. La durée totale varie de 4 à 12 mois selon la maturité de la startup et l\'attractivité du marché.'
                    },
                    {
                      q: 'Quels sont les pièges les plus courants lors d\'une levée de fonds en Afrique de l\'Ouest ?',
                      a: 'Les 5 pièges mortels à éviter : (1) Valorisation irréaliste — surestimer la valorisation sans traction commerciale tangible éloigne les investisseurs sérieux, (2) Structure juridique bancale — statut non adapté (SARL au lieu de SA pour lever des fonds VC), pas de pacte d\'actionnaires, capital social insuffisant, (3) Comptabilité opaque — états financiers non audités, mélange compte perso/compte pro, pas de reporting mensuel, (4) Marché mal ciblé — absence d\'étude de marché solide sur le Togo/Bénin/CIV, concurrence sous-estimée, (5) Équipe incomplète — fondateur solo sans co-fondateur technique ou commercial, pas de conseil d\'administration. Khepra Experts accompagne les startups pour sécuriser chaque étape et éviter ces écueils.'
                    },
                    {
                      q: 'Quels investisseurs et fonds ciblent les startups en Afrique francophone en 2025 ?',
                      a: 'Les principaux acteurs de l\'écosystème en 2025 : Fonds d\'amorçage — Samaipata Africa, Partech Africa, Launch Africa, Flat6Labs (Casablanca, Tunis), DFS Lab ; Fonds de développement — IFC Venture Capital, Proparco, AfDB Ventures, BOAD Investissement ; Business Angels réseaux — ABAN (African Business Angel Network), angel clubs à Abidjan, Cotonou, Lomé, Dakar ; Accélérateurs — MEST (Ghana), iHub (Nigeria), CTIC Dakar ; Corporate VC — MTN Yello Digital, Orange Digital Ventures, Société Générale Ventures. Khepra Experts maintient un réseau actif de 80+ investisseurs et intermédiaires spécialisés sur la zone UEMOA/CEMAC.'
                    }
                  ].map((faq, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Prêt à lever des fonds pour votre startup ?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Khepra Experts vous accompagne de la structuration OHADA au closing : business plan, pitch deck, data room, introductions investisseurs et négociation des termes.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={goToContact}
                    className="px-10 py-4 bg-white text-amber-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer"
                  >
                    Prendre rendez-vous
                  </button>
                  <a
                    href="tel:+22893984909"
                    className="px-10 py-4 bg-amber-700 text-white border-2 border-white rounded-lg font-bold hover:bg-amber-800 transition-all whitespace-nowrap"
                  >
                    Appeler +228 93 98 49 09
                  </a>
                </div>
              </div>
            </article>

            <div className="mt-12">
              <SocialShareWidget
                url={`${SITE_URL}/levee-de-fonds-afrique`}
                title="Levée de fonds startup Afrique francophone"
              />
            </div>

            <div className="mt-12">
              <ContextualCTA
                variant="expert"
                title="Votre projet mérite les bons investisseurs"
                description="Khepra Experts prépare votre dossier de levée de fonds et vous ouvre son réseau de 80+ investisseurs actifs en Afrique francophone"
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