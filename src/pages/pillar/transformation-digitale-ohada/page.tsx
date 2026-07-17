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

const OG_IMAGE = 'https://readdy.ai/api/search-image?query=African%20digital%20transformation%20team%20working%20in%20a%20sleek%20dark%20modern%20technology%20office%20in%20Abidjan%20Cote%20dIvoire%2C%20professionals%20using%20laptops%20with%20cloud%20computing%20dashboards%2C%20digital%20interface%20screens%20showing%20analytics%20with%20deloitte%20green%20accents%2C%20sophisticated%20dark%20charcoal%20interior%20design%2C%20green%20accent%20lighting%20dramatic%20atmosphere%2C%20high%20quality%20editorial%20corporate%20photography%20style&width=1200&height=630&seq=transformation-digitale-hero-green&orientation=landscape';

export default function TransformationDigitaleOhadaPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Transformation digitale OHADA' }
  ];

  const visibleBreadcrumbItems = [
    { label: 'Accueil', href: '/', url: `${SITE_URL}/` },
    { label: 'Transformation digitale OHADA', url: `${SITE_URL}/transformation-digitale-ohada` }
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
        '@id': `${SITE_URL}/transformation-digitale-ohada#webpage`,
        url: `${SITE_URL}/transformation-digitale-ohada`,
        name: 'Transformation digitale conforme OHADA pour entreprises',
        description: 'Guide complet sur la transformation digitale conforme OHADA. Outils, conformité réglementaire, ROI mesurable et checklist téléchargeable pour entreprises africaines.',
        inLanguage: 'fr',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'Khepra Experts'
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/transformation-digitale-ohada#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Transformation digitale OHADA' }
          ]
        }
      },
      {
        '@type': 'Article',
        '@id': `${SITE_URL}/transformation-digitale-ohada#article`,
        headline: 'Transformation digitale conforme OHADA pour entreprises en Afrique',
        description: 'Quels outils digitaux choisir sous OHADA ? Comment mesurer le ROI ? Conformité BCEAO, sécurité données et checklist pratique par Khepra Experts.',
        author: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
          description: 'Cabinet de conseil en transformation digitale basé à Lomé. Expertise OHADA, conformité réglementaire UEMOA et CEMAC.'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` }
        },
        datePublished: '2025-05-12',
        dateModified: '2025-05-12',
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/transformation-digitale-ohada#webpage` },
        keywords: 'transformation digitale OHADA, digitalisation entreprise Afrique, conformité BCEAO digitale, outils PME numériques UEMOA, ROI digitalisation',
        articleSection: 'Transformation digitale',
        inLanguage: 'fr',
        wordCount: 1000,
        timeRequired: 'PT5M',
        educationalLevel: 'Professional'
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/transformation-digitale-ohada#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quels outils digitaux sont compatibles avec la conformité OHADA pour les PME ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les outils digitaux compatibles OHADA doivent respecter le référentiel comptable SYSCOHADA révisé. Les solutions recommandées incluent : (1) Comptabilité — Sage 100c, EBP Comptabilité, ou logiciels locaux certifiés OHADA comme CLE and SGI, (2) Facturation électronique — solutions intégrées à la Direction Générale des Impôts de chaque pays UEMOA, (3) Gestion de paie — outils conformes au Droit OHADA des sociétés et au Code du travail local, (4) Trésorerie — logiciels avec reporting BCEAO compatible, (5) Archivage — solutions cloud avec serveurs situés en Afrique pour conformité RGPD locale. Khepra Experts audite et recommande la stack technologique adaptée à chaque taille d\'entreprise.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quel ROI attendre d\'une transformation digitale pour une PME en Afrique de l\'Ouest ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le ROI d\'une transformation digitale PME se mesure sur 12-24 mois. Les gains constatés par nos clients : (1) Productivité administrative +35% — automatisation de la saisie comptable et de la paie, (2) Réduction des erreurs fiscales -60% — déclarations pré-remplies et alertes de conformité, (3) Accélération du recouvrement +25% — relances automatiques et suivi client digital, (4) Coûts IT optimisés -20% — passage du matériel on-premise au cloud, (5) Décision rapide +40% — tableaux de bord en temps réel. L\'investissement moyen de 5-15M FCFA est amorti en 8-14 mois pour une PME de 20-100 salariés.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quels sont les risques juridiques d\'une digitalisation non conforme en zone UEMOA ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Une digitalisation non conforme expose à plusieurs risques : (1) Fiscal — rejet des pièces justificatives électroniques si le format n\'est pas certifié par l\'administration fiscale locale, (2) Pénal — amendes pour non-respect de la conservation des données comptables (10 ans sous OHADA), (3) Bancaire — refus de crédit si la comptabilité digitale n\'est pas auditée par un expert tiers, (4) Social — litiges avec les employés sur la paie si le logiciel n\'intègre pas les conventions collectives locales, (5) Données — sanctions pour transfert de données personnelles hors d\'Afrique sans autorisation. Khepra Experts réalise un audit de conformité préalable à tout projet de transformation digitale.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title="Transformation Digitale OHADA | Outils & ROI | Khepra"
        description="Guide pratique transformation digitale sous OHADA. Outils compatibles, conformité BCEAO, ROI mesurable. Checklist téléchargeable. Contact : +228 93 98 49 09"
        keywords="transformation digitale OHADA, digitalisation PME Afrique, conformité BCEAO numérique, outils comptabilité OHADA, ROI digitalisation UEMOA"
        canonicalPath="/transformation-digitale-ohada"
        ogType="article"
        structuredData={schemaJson}
        ogImage={OG_IMAGE}
        ogImageAlt="Équipe de consultants Khepra Experts en transformation digitale dans un bureau moderne à Abidjan, Côte d'Ivoire, avec écrans d'analytics"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogLocale="fr_FR"
        articlePublishedTime="2025-05-12T00:00:00Z"
        articleModifiedTime="2025-05-12T00:00:00Z"
        articleAuthor="Khepra Experts"
        articleSection="Transformation digitale"
        articleTags={['Transformation digitale', 'OHADA', 'UEMOA', 'BCEAO', 'PME numérique', 'Conformité']}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <VisibleBreadcrumb items={visibleBreadcrumbItems} withSchema={false} className="mb-6" />
            <Breadcrumb items={breadcrumbItems} />

            <article className="prose prose-lg max-w-none mt-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Transformation digitale conforme OHADA pour entreprises
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                La <strong>transformation digitale</strong> n'est plus un luxe pour les entreprises africaines — c'est une obligation de compétitivité. Mais comment digitaliser sans enfreindre le <strong>SYSCOHADA révisé</strong> ni les exigences de la <strong>BCEAO</strong> ? Khepra Experts livre le guide pratique, les outils validés et le ROI réel mesuré sur le terrain en Afrique de l'Ouest.
              </p>

              <div className="mb-16 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Le digital en Afrique de l'Ouest : enjeux et réalités</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Seulement <strong>12% des PME en zone UEMOA</strong> disposent d'un système d'information intégré. Pourtant, la digitalisation des processus administratifs génère un gain de productivité de 30 à 45% dans les 18 premiers mois. Le défi : choisir des outils <strong>compatibles avec le référentiel OHADA</strong>, les exigences fiscales nationales et les contraintes de connectivité locale.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Au Togo, au Bénin, en Côte d'Ivoire et dans les autres pays UEMOA, la <strong>Direction Générale des Impôts</strong> impose progressivement la facturation électronique et la déclaration en ligne. Les entreprises non préparées risquent des pénalités de retard, le rejet de leurs pièces comptables, et un refus de crédit bancaire.
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Stack technologique recommandé sous OHADA</h2>
                <div className="space-y-5">
                  {[
                    {
                      tool: 'Comptabilité & Gestion',
                      icon: 'ri-server-line',
                      solutions: 'Sage 100c, EBP Comptabilité, CLE and SGI (certifié OHADA), Orsys Compta. Exigence : export balance et grand-livre conforme SYSCOHADA révisé.',
                      budget: '150K - 800K FCFA/an'
                    },
                    {
                      tool: 'Facturation électronique',
                      icon: 'ri-file-list-3-line',
                      solutions: 'Solutions intégrées DGI Togo/Bénin/CIV. Factures électroniques avec signature numérique et traçabilité légale. Obligatoire dès 2025-2026 selon les pays.',
                      budget: '50K - 300K FCFA/an'
                    },
                    {
                      tool: 'Gestion de paie',
                      icon: 'ri-briefcase-line',
                      solutions: 'Logiciels intégrant conventions collectives locales, cotisations CNSS/CNPS, et fiches de paie conformes Code du travail national. Ex : PayFit Africa, Sage Paie.',
                      budget: '30K - 200K FCFA/an'
                    },
                    {
                      tool: 'Trésorerie & Reporting',
                      icon: 'ri-line-chart-line',
                      solutions: 'Outils de suivi de trésorerie en temps réel avec reporting BCEAO-compatible. Alertes automatiques sur seuils de découverts et échéances.',
                      budget: '100K - 500K FCFA/an'
                    },
                    {
                      tool: 'Archivage numérique',
                      icon: 'ri-database-2-line',
                      solutions: 'Stockage cloud avec serveurs en Afrique (conformité RGPD locale). Conservation légale 10 ans sous OHADA. Sauvegardes automatisées journalières.',
                      budget: '20K - 150K FCFA/an'
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <i className={`${item.icon} text-2xl text-teal-600`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                            <h3 className="text-lg font-bold text-gray-900">{item.tool}</h3>
                            <span className="text-sm font-semibold text-teal-700 bg-teal-100 px-3 py-1 rounded-full">{item.budget}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm">{item.solutions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Conformité réglementaire : les 5 piliers à respecter</h2>
                <div className="space-y-4">
                  {[
                    { num: '1', title: 'Comptabilité OHADA', desc: 'Tout logiciel doit produire un référentiel comptable conforme au SYSCOHADA révisé : journal, grand-livre, balance, bilan, compte de résultat. L\'audit externe doit pouvoir accéder aux données brutes.', icon: 'ri-shield-check-line' },
                    { num: '2', title: 'Fiscalité électronique', desc: 'La facturation et la déclaration fiscale électroniques sont en déploiement dans tous les pays UEMOA. Les outils doivent intégrer les API fiscales nationales.', icon: 'ri-file-list-3-line' },
                    { num: '3', title: 'Protection des données', desc: 'Les données personnelles employés et clients doivent être stockées sur des serveurs situés en Afrique ou avec accord explicite de transfert. RGPD local applicable.', icon: 'ri-shield-check-line' },
                    { num: '4', title: 'Sécurité bancaire', desc: 'Les interfaces avec les banques UEMOA doivent respecter les protocoles de sécurité BCEAO : double authentification, tokens sécurisés, chiffrement AES-256.', icon: 'ri-shield-check-line' },
                    { num: '5', title: 'Archivage légal', desc: 'OHADA impose une conservation de 10 ans des documents comptables, fiscaux et sociaux. L\'archivage numérique doit garantir l\'intégrité, l\'authenticité et la lisibilité dans le temps.', icon: 'ri-database-2-line' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                      <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{item.num}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">ROI mesurable de la transformation digitale</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { metric: '+35%', label: 'Productivité administrative', desc: 'Automatisation saisie comptable, paie et rapprochements bancaires', icon: 'ri-line-chart-line' },
                    { metric: '-60%', label: 'Erreurs fiscales', desc: 'Déclarations pré-remplies, alertes de conformité et validation automatique', icon: 'ri-shield-check-line' },
                    { metric: '+25%', label: 'Recouvrement accéléré', desc: 'Relances automatiques, suivi client digital et paiement en ligne', icon: 'ri-money-dollar-circle-line' },
                    { metric: '-20%', label: 'Coûts IT', desc: 'Passage du matériel on-premise au cloud, maintenance externalisée', icon: 'ri-bar-chart-line' },
                    { metric: '+40%', label: 'Rapidité décision', desc: 'Tableaux de bord en temps réel, KPIs accessibles sur mobile', icon: 'ri-dashboard-3-line' },
                    { metric: '8-14', label: 'Mois d\'amortissement', desc: 'Pour une PME de 20-100 salariés avec investissement de 5-15M FCFA', icon: 'ri-time-line' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`${item.icon} text-xl text-teal-600`}></i>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-teal-700 mb-1">{item.metric}</div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.label}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Checklist transformation digitale OHADA — Téléchargeable</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Avant de lancer votre projet de digitalisation, vérifiez chaque étape avec cette checklist validée par nos experts Khepra Experts sur <strong>60+ projets</strong> en zone UEMOA.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Audit de la maturité digitale actuelle',
                    'Cartographie des processus à digitaliser',
                    'Sélection des outils certifiés OHADA',
                    'Vérification conformité fiscale locale',
                    'Plan de formation des équipes',
                    'Budget alloué et calendrier de déploiement',
                    'Sauvegarde et sécurité des données',
                    'Tests avant basculement définitif',
                    'Procédures de continuité d\'activité',
                    'Revue post-déploiement à 3 et 12 mois'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                      <i className="ri-checkbox-circle-line text-xl text-teal-600 flex-shrink-0"></i>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <button
                    onClick={goToContact}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-download-line"></i>
                    Demander la checklist complète (PDF)
                  </button>
                </div>
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
                  <Link to="/levee-de-fonds-afrique" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                      <i className="ri-funds-line text-xl text-amber-600"></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Levée de fonds Afrique</h4>
                    <p className="text-sm text-gray-600">Process, pièges et contacts investisseurs pour startups francophones</p>
                  </Link>
                  <Link to="/" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <i className="ri-home-line text-xl text-teal-600"></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Accueil Khepra Experts</h4>
                    <p className="text-sm text-gray-600">Conseil stratégique, finance et transformation digitale en Afrique</p>
                  </Link>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Questions fréquentes — Transformation digitale OHADA</h2>
                <div className="space-y-4">
                  {[
                    {
                      q: 'Quels outils digitaux sont compatibles avec la conformité OHADA pour les PME ?',
                      a: 'Les outils digitaux compatibles OHADA doivent respecter le référentiel comptable SYSCOHADA révisé. Les solutions recommandées incluent : (1) Comptabilité — Sage 100c, EBP Comptabilité, ou logiciels locaux certifiés OHADA comme CLE and SGI, (2) Facturation électronique — solutions intégrées à la Direction Générale des Impôts de chaque pays UEMOA, (3) Gestion de paie — outils conformes au Droit OHADA des sociétés et au Code du travail local, (4) Trésorerie — logiciels avec reporting BCEAO compatible, (5) Archivage — solutions cloud avec serveurs situés en Afrique pour conformité RGPD locale. Khepra Experts audite et recommande la stack technologique adaptée à chaque taille d\'entreprise.'
                    },
                    {
                      q: 'Quel ROI attendre d\'une transformation digitale pour une PME en Afrique de l\'Ouest ?',
                      a: 'Le ROI d\'une transformation digitale PME se mesure sur 12-24 mois. Les gains constatés par nos clients : (1) Productivité administrative +35% — automatisation de la saisie comptable et de la paie, (2) Réduction des erreurs fiscales -60% — déclarations pré-remplies et alertes de conformité, (3) Accélération du recouvrement +25% — relances automatiques et suivi client digital, (4) Coûts IT optimisés -20% — passage du matériel on-premise au cloud, (5) Décision rapide +40% — tableaux de bord en temps réel. L\'investissement moyen de 5-15M FCFA est amorti en 8-14 mois pour une PME de 20-100 salariés.'
                    },
                    {
                      q: 'Quels sont les risques juridiques d\'une digitalisation non conforme en zone UEMOA ?',
                      a: 'Une digitalisation non conforme expose à plusieurs risques : (1) Fiscal — rejet des pièces justificatives électroniques si le format n\'est pas certifié par l\'administration fiscale locale, (2) Pénal — amendes pour non-respect de la conservation des données comptables (10 ans sous OHADA), (3) Bancaire — refus de crédit si la comptabilité digitale n\'est pas auditée par un expert tiers, (4) Social — litiges avec les employés sur la paie si le logiciel n\'intègre pas les conventions collectives locales, (5) Données — sanctions pour transfert de données personnelles hors d\'Afrique sans autorisation. Khepra Experts réalise un audit de conformité préalable à tout projet de transformation digitale.'
                    }
                  ].map((faq, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Digitalisez votre entreprise en toute conformité</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Nos experts Lomé auditent votre maturité digitale, sélectionnent les outils compatibles OHADA et pilotent le déploiement sur votre terrain UEMOA.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={goToContact}
                    className="px-10 py-4 bg-white text-teal-700 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl whitespace-nowrap cursor-pointer"
                  >
                    Prendre rendez-vous
                  </button>
                  <a
                    href="tel:+22893984909"
                    className="px-10 py-4 bg-teal-700 text-white border-2 border-white rounded-lg font-bold hover:bg-teal-800 transition-all whitespace-nowrap"
                  >
                    Appeler +228 93 98 49 09
                  </a>
                </div>
              </div>
            </article>

            <div className="mt-12">
              <SocialShareWidget
                url={`${SITE_URL}/transformation-digitale-ohada`}
                title="Transformation digitale conforme OHADA"
              />
            </div>

            <div className="mt-12">
              <ContextualCTA
                variant="diagnostic"
                title="Évaluez votre maturité digitale gratuitement"
                description="Diagnostic rapide de 15 minutes pour identifier vos priorités de digitalisation et les outils adaptés à votre entreprise en zone UEMOA"
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