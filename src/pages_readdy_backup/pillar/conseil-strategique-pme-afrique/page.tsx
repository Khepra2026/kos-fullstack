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

const OG_IMAGE = 'https://readdy.ai/api/search-image?query=Professional%20African%20business%20strategy%20consultants%20in%20a%20sleek%20dark%20modern%20office%20in%20Lome%20Togo%2C%20discussing%20strategic%20planning%20documents%20with%20SME%20owners%2C%20deloitte%20green%20and%20dark%20charcoal%20color%20tones%2C%20dark%20charcoal%20desk%2C%20laptop%20displaying%20financial%20charts%20on%20screen%2C%20sophisticated%20corporate%20interior%20with%20geometric%20green%20accent%20lighting%2C%20high%20quality%20editorial%20photography%20style&width=1200&height=630&seq=conseil-pme-hero-green&orientation=landscape';

export default function ConseilStrategiquePmeAfriquePage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Conseil stratégique PME Afrique' }
  ];

  const visibleBreadcrumbItems = [
    { label: 'Accueil', href: '/', url: `${SITE_URL}/` },
    { label: 'Conseil stratégique PME Afrique', url: `${SITE_URL}/conseil-strategique-pme-afrique` }
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
        '@id': `${SITE_URL}/conseil-strategique-pme-afrique#webpage`,
        url: `${SITE_URL}/conseil-strategique-pme-afrique`,
        name: 'Conseil stratégique pour PME en Afrique de l\'Ouest',
        description: 'Guide complet pour élaborer un plan stratégique PME conforme OHADA en Afrique de l\'Ouest. Méthodologie, cas pratique Togo, conseils d\'experts Khepra Experts Lomé.',
        inLanguage: 'fr',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'Khepra Experts'
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/conseil-strategique-pme-afrique#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Conseil stratégique PME Afrique' }
          ]
        }
      },
      {
        '@type': 'Article',
        '@id': `${SITE_URL}/conseil-strategique-pme-afrique#article`,
        headline: 'Conseil stratégique pour PME en Afrique de l\'Ouest : plan stratégique conforme OHADA',
        description: 'Comment élaborer un plan stratégique PME sous OHADA ? Guide pratique avec méthodologie, cas client anonymisé au Togo et expertise Khepra Experts Lomé.',
        author: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
          description: 'Cabinet de conseil stratégique basé à Lomé, Togo. 22 ans d\'expérience en gouvernance, finance et transformation digitale pour PME et institutions en Afrique de l\'Ouest.'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` }
        },
        datePublished: '2025-05-12',
        dateModified: '2025-05-12',
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/conseil-strategique-pme-afrique#webpage` },
        keywords: 'conseil stratégique PME Afrique, plan stratégique OHADA, consulting Lomé Togo, stratégie entreprise UEMOA, BCEAO conformité, PME Afrique de l\'Ouest',
        articleSection: 'Conseil stratégique',
        inLanguage: 'fr',
        wordCount: 1200,
        timeRequired: 'PT6M',
        educationalLevel: 'Professional'
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/conseil-strategique-pme-afrique#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Comment faire un plan stratégique PME sous OHADA en Afrique de l\'Ouest ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Un plan stratégique PME sous OHADA suit 6 étapes : (1) Diagnostic interne/externe avec analyse SWOT et PESTEL adaptée au contexte UEMOA, (2) Définition de la vision et des objectifs SMART sur 3-5 ans, (3) Choix des axes stratégiques alignés avec le plan national de développement du pays, (4) Plan d\'action opérationnel avec budgets et responsables, (5) Tableau de bord de pilotage avec KPIs sectoriels, (6) Revue trimestrielle et ajustements. Khepra Experts accompagne les PME togolaises, béninoises et ivoiriennes dans cette démarche depuis 2003.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quel est le coût moyen d\'un conseil stratégique pour une PME au Togo ou au Bénin ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le budget d\'un conseil stratégique PME en Afrique de l\'Ouest varie de 2 à 8 millions FCFA selon la taille et la complexité. Une PME de 10-50 salariés avec un CA de 100-500M FCFA investit généralement entre 3 et 5M FCFA pour un plan stratégique complet incluant diagnostic, ateliers de co-construction, plan d\'action et formation des équipes. Khepra Experts propose des forfaits adaptés avec paiement échelonné sur 3-6 mois.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quels sont les indicateurs clés pour piloter une stratégie PME dans la zone UEMOA ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les KPIs essentiels pour piloter une stratégie PME en zone UEMOA incluent : (1) Rentabilité — taux de marge nette cible >10%, (2) Trésorerie — délai moyen de recouvrement <45 jours, (3) Croissance — CAGR annuel du CA >15%, (4) Conformité — taux de respect des obligations fiscales et sociales OHADA à 100%, (5) RH — taux de rétention des talents >85%, (6) Digital — taux d\'automatisation des processus administratifs >60%. Khepra Experts établit des tableaux de bord personnalisés pour chaque secteur d\'activité.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title="Conseil Stratégique PME Afrique | Khepra Experts"
        description="Guide pratique pour élaborer un plan stratégique PME conforme OHADA. Méthodologie, cas client Togo, expertise Khepra Experts. Contactez-nous : +228 93 98 49 09"
        keywords="conseil stratégique PME Afrique, plan stratégique OHADA, consulting Lomé Togo, stratégie entreprise UEMOA, PME Bénin Côte d'Ivoire"
        canonicalPath="/conseil-strategique-pme-afrique"
        ogType="article"
        structuredData={schemaJson}
        ogImage={OG_IMAGE}
        ogImageAlt="Consultants Khepra Experts accompagnant une PME africaine dans sa stratégie de croissance à Lomé, Togo"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogLocale="fr_FR"
        articlePublishedTime="2025-05-12T00:00:00Z"
        articleModifiedTime="2025-05-12T00:00:00Z"
        articleAuthor="Khepra Experts"
        articleSection="Conseil stratégique"
        articleTags={['Conseil stratégique', 'PME', 'Afrique de l\'Ouest', 'OHADA', 'UEMOA', 'Lomé', 'Togo']}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />

            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Conseil stratégique pour PME en Afrique de l'Ouest
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Comment élaborer un <strong>plan stratégique PME conforme OHADA</strong> qui génère de la croissance durable en Afrique de l'Ouest ? Khepra Experts, cabinet basé à <strong>Lomé, Togo</strong>, partage sa méthodologie éprouvée depuis 22 ans sur le terrain.
              </p>

              <div className="mb-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Pourquoi la stratégie fait la différence pour les PME africaines</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  En Afrique de l'Ouest, <strong>90% des entreprises sont des PME</strong> qui génèrent 60% de l'emploi formel. Pourtant, moins de 15% disposent d'un plan stratégique écrit et suivi. Le déficit de gouvernance stratégique freine l'accès au financement, limite la croissance et expose les dirigeants à des risques juridiques sous le <strong>SYSCOHADA révisé</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Dans la zone UEMOA — Togo, Bénin, Côte d'Ivoire, Sénégal, Burkina Faso, Mali, Niger, Guinée-Bissau — les PME font face à des défis spécifiques : volatilité des changes, inflation des matières premières, concurrence informelle, complexité fiscale OHADA, et manque de visibilité sur les marchés régionaux. Un <strong>conseil stratégique adapté au contexte ouest-africain</strong> devient indispensable.
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Notre méthodologie en 6 phases pour un plan stratégique PME OHADA</h2>

                <div className="space-y-6">
                  {[
                    {
                      phase: 'Phase 1 — Diagnostic stratégique',
                      duration: '2-3 semaines',
                      icon: 'ri-search-eye-line',
                      items: [
                        'Analyse SWOT adaptée au contexte UEMOA (forces, faiblesses, opportunités, menaces)',
                        'Audit de la conformité OHADA : comptabilité, fiscalité, social',
                        'Analyse PESTEL locale : BCEAO, législation nationale, concurrence informelle',
                        'Entretiens avec le dirigeant, les équipes clés et 3-5 clients',
                        'Revue des états financiers des 3 dernières années'
                      ]
                    },
                    {
                      phase: 'Phase 2 — Vision et objectifs',
                      duration: '1-2 semaines',
                      icon: 'ri-compass-3-line',
                      items: [
                        'Atelier de co-construction avec le comité de direction',
                        'Définition de la vision sur 5 ans alignée avec le plan national de développement',
                        'Objectifs SMART par axe : croissance, rentabilité, digital, RH, conformité',
                        'Identification des leviers de différenciation sur le marché local'
                      ]
                    },
                    {
                      phase: 'Phase 3 — Axes stratégiques',
                      duration: '2 semaines',
                      icon: 'ri-route-line',
                      items: [
                        'Stratégie de croissance : pénétration, développement produit, expansion géographique UEMOA',
                        'Stratégie de rentabilité : optimisation des coûts, pricing, gestion de la trésorerie',
                        'Stratégie digitale : outils adaptés aux contraintes de connectivité ouest-africaine',
                        'Stratégie RH : plan de compétences, rétention, succession du dirigeant'
                      ]
                    },
                    {
                      phase: 'Phase 4 — Plan d\'action opérationnel',
                      duration: '2-3 semaines',
                      icon: 'ri-calendar-check-line',
                      items: [
                        'Roadmap 12-36 mois avec jalons, livrables et budgets détaillés',
                        'Matrice RACI : qui fait quoi, quand, avec quel budget',
                        'Plan de financement : autofinancement, crédit bancaire, fonds d\'investissement',
                        'Budget prévisionnel conforme au référentiel OHADA'
                      ]
                    },
                    {
                      phase: 'Phase 5 — Tableau de bord de pilotage',
                      duration: '1 semaine',
                      icon: 'ri-dashboard-3-line',
                      items: [
                        'KPIs sectoriels personnalisés (commerce, industrie, services, agritech)',
                        'Fréquence de reporting : mensuel pour la trésorerie, trimestriel pour la stratégie',
                        'Alertes automatiques sur écarts de performance >10%',
                        'Format simple (Excel/Power BI) accessible au dirigeant sans formation technique'
                      ]
                    },
                    {
                      phase: 'Phase 6 — Revue et ajustement',
                      duration: 'Récurrent',
                      icon: 'ri-refresh-line',
                      items: [
                        'Comité de pilotage trimestriel avec le consultant',
                        'Réajustement des objectifs selon l\'actualité économique UEMOA',
                        'Mise à jour du plan d\'action et des budgets prévisionnels',
                        'Accompagnement du dirigeant dans la prise de décision stratégique'
                      ]
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-white border-l-4 border-emerald-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className={`${item.icon} text-2xl text-emerald-600`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                            <h3 className="text-xl font-bold text-gray-900">{item.phase}</h3>
                            <span className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">{item.duration}</span>
                          </div>
                          <ul className="space-y-2 mt-3">
                            {item.items.map((li, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <i className="ri-checkbox-circle-line text-emerald-600 mt-1 flex-shrink-0"></i>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cas client anonymisé — PME agro-industrielle au Togo</h2>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <i className="ri-building-line text-emerald-600"></i>
                      Contexte
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      PME togolaise du secteur agro-industriel, 28 salariés, CA de 420M FCFA. Dirigée par son fondateur depuis 12 ans. Croissance organique de 5%/an mais rentabilité en déclin. Pas de plan stratégique écrit. Comptabilité tenue par un collaborateur sans formation OHADA. Difficultés de recouvrement (DMO à 78 jours). Ambition d'exporter vers le Bénin et la Côte d'Ivoire.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <i className="ri-error-warning-line text-orange-600"></i>
                      Diagnostic Khepra Experts
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Notre équipe Lomé a mené un diagnostic de 3 semaines. Résultats : (1) absence de stratégie prix — marge brute à 18% vs 28% sectoriel, (2) trésorerie sous-optimisée — 180M FCFA dormant en compte courant, (3) conformité OHADA partielle — charges sociales en retard sur 8 trimestres, (4) absence de marketing digital — 0 présence en ligne, (5) gouvernance familiale sans organigramme formel.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <i className="ri-lightbulb-line text-emerald-600"></i>
                      Plan d'action élaboré
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Plan stratégique sur 3 ans avec 4 axes : (A) Rentabilité — restructuration du pricing, négociation fournisseurs, réduction DMO à 45 jours ; (B) Conformité — régularisation sociale en 6 mois, formation du comptable au SYSCOHADA révisé ; (C) Export — certification qualité, partenariat avec distributeur béninois ; (D) Digital — création site e-commerce, automation de la comptabilité avec logiciel local.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-trophy-line text-emerald-600"></i>
                      Résultats après 18 mois
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-emerald-700">+32%</div>
                        <p className="text-sm text-gray-600">Croissance du CA (vs +5% avant)</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-emerald-700">24%</div>
                        <p className="text-sm text-gray-600">Marge nette (vs 8% avant)</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-emerald-700">42 jours</div>
                        <p className="text-sm text-gray-600">DMO moyen (vs 78 jours avant)</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-emerald-700">Bénin + CIV</div>
                        <p className="text-sm text-gray-600">2 nouveaux marchés export</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Indicateurs clés de pilotage stratégique pour la zone UEMOA</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { kpi: 'Rentabilité', target: '> 10% marge nette', desc: 'Seuil de viabilité pour accès au crédit bancaire dans la zone UEMOA', icon: 'ri-line-chart-line' },
                    { kpi: 'Trésorerie', target: '< 45 jours DMO', desc: 'Délai moyen de recouvrement critique pour la liquidité des PME', icon: 'ri-time-line' },
                    { kpi: 'Croissance', target: '> 15% CAGR', desc: 'Croissance annuelle composée du chiffre d\'affaires visée', icon: 'ri-bar-chart-line' },
                    { kpi: 'Conformité OHADA', target: '100% taux respect', desc: 'Déclarations fiscales et sociales à jour, révisables BCEAO', icon: 'ri-shield-check-line' },
                    { kpi: 'Rétention RH', target: '> 85%', desc: 'Taux de rétention des talents clés en Afrique de l\'Ouest', icon: 'ri-user-heart-line' },
                    { kpi: 'Digitalisation', target: '> 60% processus', desc: 'Taux d\'automatisation des processus administratifs et commerciaux', icon: 'ri-computer-line' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`${item.icon} text-xl text-emerald-600`}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.kpi}</h3>
                        <p className="text-sm font-semibold text-emerald-700 mb-1">{item.target}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16 bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ressources connexes</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link to="/transformation-digitale-ohada" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <i className="ri-computer-line text-xl text-teal-600"></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Transformation digitale OHADA</h4>
                    <p className="text-sm text-gray-600">Outils, conformité et ROI de la digitalisation pour entreprises africaines</p>
                  </Link>
                  <Link to="/levee-de-fonds-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                      <i className="ri-funds-line text-xl text-amber-600"></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Levée de fonds Afrique</h4>
                    <p className="text-sm text-gray-600">Process, pièges et contacts investisseurs pour startups francophones</p>
                  </Link>
                  <Link to="/" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                      <i className="ri-home-line text-xl text-emerald-600"></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Accueil Khepra Experts</h4>
                    <p className="text-sm text-gray-600">Conseil stratégique, finance et transformation digitale en Afrique</p>
                  </Link>
                </div>
              </div>

              <div className="mb-16 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-8">
                <div className="flex items-start gap-6 flex-col sm:flex-row">
                  <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-user-star-line text-3xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Rédigé par Khepra Experts — Lomé, Togo</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Cabinet de conseil stratégique, finance et transformation digitale basé à <strong>Lomé depuis 2003</strong>. Notre équipe de 12 consultants accompagne les PME et institutions en Afrique de l'Ouest sur les axes : gouvernance OHADA, plan stratégique, levée de fonds, digitalisation et conformité réglementaire BCEAO/COBAC.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Certifications : Expert-Comptable OEC, Diplôme d'Université en Stratégie Digitale, accréditation IFC/BAD. Interventions dans <strong>20+ pays africains</strong>, plus de <strong>600 institutions accompagnées</strong>, 120M+ USD levés pour nos clients.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a href="tel:+22893984909" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
                        <i className="ri-phone-line"></i>
                        +228 93 98 49 09
                      </a>
                      <a href="mailto:contact@khepraexperts.com" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-emerald-600 text-emerald-700 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition-colors">
                        <i className="ri-mail-line"></i>
                        contact@khepraexperts.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Questions fréquentes — Conseil stratégique PME</h2>
                <div className="space-y-4">
                  {[
                    {
                      q: 'Comment faire un plan stratégique PME sous OHADA en Afrique de l\'Ouest ?',
                      a: 'Un plan stratégique PME sous OHADA suit 6 étapes : (1) Diagnostic interne/externe avec analyse SWOT et PESTEL adaptée au contexte UEMOA, (2) Définition de la vision et des objectifs SMART sur 3-5 ans, (3) Choix des axes stratégiques alignés avec le plan national de développement du pays, (4) Plan d\'action opérationnel avec budgets et responsables, (5) Tableau de bord de pilotage avec KPIs sectoriels, (6) Revue trimestrielle et ajustements. Khepra Experts accompagne les PME togolaises, béninoises et ivoiriennes dans cette démarche depuis 2003.'
                    },
                    {
                      q: 'Quel est le coût moyen d\'un conseil stratégique pour une PME au Togo ou au Bénin ?',
                      a: 'Le budget d\'un conseil stratégique PME en Afrique de l\'Ouest varie de 2 à 8 millions FCFA selon la taille et la complexité. Une PME de 10-50 salariés avec un CA de 100-500M FCFA investit généralement entre 3 et 5M FCFA pour un plan stratégique complet incluant diagnostic, ateliers de co-construction, plan d\'action et formation des équipes. Khepra Experts propose des forfaits adaptés avec paiement échelonné sur 3-6 mois.'
                    },
                    {
                      q: 'Quels sont les indicateurs clés pour piloter une stratégie PME dans la zone UEMOA ?',
                      a: 'Les KPIs essentiels pour piloter une stratégie PME en zone UEMOA incluent : (1) Rentabilité — taux de marge nette cible >10%, (2) Trésorerie — délai moyen de recouvrement <45 jours, (3) Croissance — CAGR annuel du CA >15%, (4) Conformité — taux de respect des obligations fiscales et sociales OHADA à 100%, (5) RH — taux de rétention des talents >85%, (6) Digital — taux d\'automatisation des processus administratifs >60%. Khepra Experts établit des tableaux de bord personnalisés pour chaque secteur d\'activité.'
                    }
                  ].map((faq, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Prêt à structurer la stratégie de votre PME ?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Nos experts Lomé vous accompagnent dans l'élaboration d'un plan stratégique conforme OHADA, adapté au contexte UEMOA et mesurable sur le long terme.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={goToContact}
                    className="px-10 py-4 bg-white text-emerald-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer"
                  >
                    Prendre rendez-vous
                  </button>
                  <a
                    href="tel:+22893984909"
                    className="px-10 py-4 bg-emerald-700 text-white border-2 border-white rounded-lg font-bold hover:bg-emerald-800 transition-all whitespace-nowrap"
                  >
                    Appeler +228 93 98 49 09
                  </a>
                </div>
              </div>
            </article>

            <div className="mt-12">
              <SocialShareWidget
                url={`${SITE_URL}/conseil-strategique-pme-afrique`}
                title="Conseil stratégique PME Afrique de l'Ouest"
              />
            </div>

            <div className="mt-12">
              <ContextualCTA
                variant="diagnostic"
                title="Diagnostic stratégique gratuit pour votre PME"
                description="30 minutes avec un expert Khepra Experts pour identifier vos priorités stratégiques et vos leviers de croissance en Afrique de l'Ouest"
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



