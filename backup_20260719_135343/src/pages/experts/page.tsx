import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const experts = [
  {
    name: 'SIMDA Essoyomèwè',
    role: {
      fr: 'Directeur Associé & Senior Consultant',
      en: 'Managing Partner & Senior Consultant',
    },
    specialization: {
      fr: 'Gouvernance d\'Entreprise, Audit Financier, Inclusion Financière',
      en: 'Corporate Governance, Financial Audit, Financial Inclusion',
    },
    bio: {
      fr: "Expert senior en gouvernance d'entreprise, gestion des risques (ERM), inclusion financière et digitale, audit financier et conseil stratégique. Plus de 22 ans d'expérience en Afrique de l'Ouest et Centrale. MBA en Gestion des Entreprises (Université Laval, 2018) et Maîtrise en Sciences de Gestion (Université de Lomé, 2003). Ancien Directeur Général d'Atlantique Microfinance au Gabon (2016-2020) et Conseiller Technique National en Inclusion Financière au Togo (2021-2023).",
      en: "Senior expert in corporate governance, risk management (ERM), financial and digital inclusion, financial audit and strategic advisory. Over 22 years of experience in West and Central Africa. MBA in Business Management (Université Laval, 2018) and Master's in Management Sciences (Université de Lomé, 2003). Former General Manager of Atlantique Microfinance in Gabon (2016-2020) and National Technical Advisor in Financial Inclusion in Togo (2021-2023).",
    },
    expertise: {
      fr: [
        'Gouvernance d\'entreprise & Conseil aux Conseils d\'Administration',
        'Gestion des risques financiers et opérationnels (ERM)',
        'Inclusion financière et digitale (Fintech)',
        'Audit financier et contrôle interne',
        'Conformité BCEAO et réglementaire',
        'Structuration financière et levée de fonds',
        'Transformation organisationnelle',
        'Stratégie d\'entreprise',
      ],
      en: [
        'Corporate Governance & Board Advisory',
        'Financial and operational risk management (ERM)',
        'Financial and digital inclusion (Fintech)',
        'Financial audit and internal control',
        'BCEAO and regulatory compliance',
        'Financial structuring and fundraising',
        'Organizational transformation',
        'Corporate strategy',
      ],
    },
    publications: {
      fr: [
        'Stratégie Nationale d\'Inclusion Financière du Togo (2021-2023)',
        'Guide de conformité BCEAO pour les SFD',
        'Transformation digitale des institutions de microfinance',
      ],
      en: [
        'National Financial Inclusion Strategy of Togo (2021-2023)',
        'BCEAO compliance guide for DFS',
        'Digital transformation of microfinance institutions',
      ],
    },
    linkedin: 'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
    email: 'contact@khepraexperts.com',
    photo: 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg',
    color: 'from-amber-600 to-yellow-700',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
  },
  {
    name: 'AWITAZI Tchagou Rodolphe',
    role: {
      fr: 'Expert ESG & Sauvegarde Environnementale',
      en: 'ESG Expert & Environmental Safeguards',
    },
    specialization: {
      fr: 'Sauvegarde environnementale et sociale, EIES, HQSE',
      en: 'Environmental and social safeguards, EIA, HQSE',
    },
    bio: {
      fr: "Expert en sauvegarde environnementale et sociale avec une expérience significative sur les programmes d'appui à la décentralisation. Spécialisé dans l'élaboration et la mise en œuvre des EIES (Études d'Impact Environnemental et Social), des plans de restauration des moyens de subsistance, des mécanismes de gestion des plaintes et de l'application des mesures HQSE (Hygiène, Qualité, Sécurité, Environnement) sur les chantiers.",
      en: "Environmental and social safeguards expert with significant experience in decentralization support programs. Specialized in developing and implementing EIAs (Environmental and Social Impact Assessments), livelihood restoration plans, grievance management mechanisms, and applying HQSE (Hygiene, Quality, Safety, Environment) measures on construction sites.",
    },
    expertise: {
      fr: [
        'Études d\'Impact Environnemental et Social (EIES)',
        'Plans de restauration des moyens de subsistance',
        'Mécanismes de gestion des plaintes',
        'Mesures HQSE sur chantiers',
        'Sauvegarde sociale et environnementale',
        'Conformité environnementale',
        'Audit ESG',
      ],
      en: [
        'Environmental and Social Impact Assessments (ESIA)',
        'Livelihood restoration plans',
        'Grievance management mechanisms',
        'HQSE measures on sites',
        'Social and environmental safeguards',
        'Environmental compliance',
        'ESG audit',
      ],
    },
    publications: {
      fr: [
        'Guide pratique des EIES en Afrique de l\'Ouest',
        'Gestion des plaintes dans les projets de développement',
      ],
      en: [
        'Practical guide to ESIAs in West Africa',
        'Grievance management in development projects',
      ],
    },
    linkedin: 'https://www.linkedin.com/in/awitazi-rodolphe-64309a131/',
    email: null,
    photo: 'https://readdy.ai/api/search-image?query=professional%20african%20male%20environmental%20social%20expert%20portrait%20in%20smart%20casual%20attire%2C%20confident%20specialist%20with%20warm%20smile%2C%20natural%20studio%20lighting%20with%20soft%20green%20bokeh%20background%20suggesting%20nature%20and%20sustainability%2C%20authentic%20executive%20headshot%20photography%2C%20trustworthy%20and%20approachable%20appearance%2C%20high%20quality%20corporate%20portrait&width=600&height=750&seq=awitazi-expert-profile-v2&orientation=portrait',
    color: 'from-green-600 to-emerald-700',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
  },
];

export default function ExpertsPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const currentLang = lang === 'en' ? 'en-US' : 'fr-FR';
  const navigate = useNavigate();

  const expertsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/experts#webpage`,
        name: 'Experts en Consortium — KHEPRA EXPERTS',
        description: 'Découvrez nos experts en consortium en gouvernance d\'entreprise, audit financier, inclusion financière, transformation digitale et sauvegarde environnementale en Afrique.',
        url: `${SITE_URL}/experts`,
        inLanguage: currentLang,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/experts#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Experts en Consortium', item: `${SITE_URL}/experts` },
          ],
        },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/experts#essoyomewe-simda`,
        name: 'SIMDA Essoyomèwè',
        givenName: 'Essoyomèwè',
        familyName: 'SIMDA',
        jobTitle: 'Directeur Associé & Senior Consultant',
        description: "Expert senior en gouvernance d'entreprise, gestion des risques (ERM), inclusion financière et digitale, audit financier et conseil stratégique. Plus de 22 ans d'expérience en Afrique de l'Ouest et Centrale.",
        worksFor: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'KHEPRA EXPERTS',
          url: SITE_URL,
        },
        sameAs: [
          'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
        ],
        knowsLanguage: ['fr', 'en'],
        alumniOf: [
          {
            '@type': 'EducationalOrganization',
            name: 'Université de Lomé',
            location: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lomé',
                addressCountry: 'TG',
              },
            },
          },
          {
            '@type': 'EducationalOrganization',
            name: 'Université Laval',
            location: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Québec',
                addressCountry: 'CA',
              },
            },
          },
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'MBA en Gestion des Entreprises',
            credentialCategory: 'degree',
            educationalLevel: 'Master',
            recognizedBy: {
              '@type': 'EducationalOrganization',
              name: 'Université Laval',
            },
            dateCreated: '2018',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Maîtrise en Sciences de Gestion',
            credentialCategory: 'degree',
            educationalLevel: 'Master',
            recognizedBy: {
              '@type': 'EducationalOrganization',
              name: 'Université de Lomé',
            },
            dateCreated: '2003',
          },
        ],
        knowsAbout: [
          'Gouvernance d\'entreprise',
          'Gestion des risques financiers',
          'Inclusion financière',
          'Audit financier',
          'Conformité BCEAO',
          'Transformation organisationnelle',
          'Stratégie d\'entreprise',
        ],
        email: 'contact@khepraexperts.com',
        image: 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/experts#awitazi-rodolphe`,
        name: 'AWITAZI Tchagou Rodolphe',
        givenName: 'Rodolphe',
        familyName: 'AWITAZI Tchagou',
        jobTitle: 'Expert ESG & Sauvegarde Environnementale',
        description: "Expert en sauvegarde environnementale et sociale avec une expérience significative sur les programmes d'appui à la décentralisation. Spécialisé dans l'élaboration et la mise en œuvre des EIES, des plans de restauration des moyens de subsistance, des mécanismes de gestion des plaintes et de l'application des mesures HQSE.",
        worksFor: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'KHEPRA EXPERTS',
          url: SITE_URL,
        },
        sameAs: [
          'https://www.linkedin.com/in/awitazi-rodolphe-64309a131/',
        ],
        knowsLanguage: ['fr', 'en'],
        knowsAbout: [
          'Études d\'Impact Environnemental et Social (EIES)',
          'Plans de restauration des moyens de subsistance',
          'Mécanismes de gestion des plaintes',
          'Mesures HQSE',
          'Sauvegarde sociale et environnementale',
          'Conformité environnementale',
          'Audit ESG',
        ],
        email: null,
        image: 'https://readdy.ai/api/search-image?query=professional%20african%20male%20environmental%20social%20expert%20portrait%20in%20smart%20casual%20attire%2C%20confident%20specialist%20with%20warm%20smile%2C%20natural%20studio%20lighting%20with%20soft%20green%20bokeh%20background%20suggesting%20nature%20and%20sustainability%2C%20authentic%20executive%20headshot%20photography%2C%20trustworthy%20and%20approachable%20appearance%2C%20high%20quality%20corporate%20portrait&width=600&height=750&seq=awitazi-expert-profile-v2&orientation=portrait',
      },
    ],
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="SIMDA Essoyomèwè & Experts en Consortium — KHEPRA EXPERTS | Conseil Stratégique Afrique"
        description="SIMDA Essoyomèwè, Directeur Associé KHEPRA EXPERTS, et nos experts en consortium : gouvernance d'entreprise, audit financier, inclusion financière, transformation digitale et sauvegarde environnementale en Afrique de l'Ouest et Centrale."
        keywords="SIMDA Essoyomèwè, experts consortium Afrique, Directeur Associé KHEPRA EXPERTS, consultants gouvernance, experts audit financier, spécialistes inclusion financière, experts ESG Afrique, KHEPRA EXPERTS"
        canonicalPath="/experts"
        ogType="website"
        ogImage={OG_IMAGES.EXPERTS}
        ogImageAlt="Experts en Consortium – KHEPRA EXPERTS | Équipe de consultants spécialisés Afrique"
        ogImageWidth="1200"
        ogImageHeight="630"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
        structuredData={expertsSchema}
        hreflangLinks={STATIC_HREFLANG_MAP['/experts/']}
      />
      <Navigation />
      
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=abstract%20professional%20business%20network%20pattern%20with%20green%20accent%20lines%20connecting%20nodes%20on%20dark%20charcoal%20background%20modern%20corporate%20texture%20subtle%20geometric%20shapes%20elegant%20and%20sophisticated%20design%20dark%20charcoal%20tones%20with%20deloitte%20green%20accent%20lighting%20no%20blue%20no%20purple&width=1920&height=600&seq=experts-hero-bg-green&orientation=landscape')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm mb-6">
                <i className="ri-team-line text-amber-400 text-sm"></i>
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  {lang === 'fr' ? 'Notre Réseau' : 'Our Network'}
                </span>
              </div>
              
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {lang === 'fr' ? 'Experts en Consortium' : 'Consortium Experts'}
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
                {lang === 'fr'
                  ? 'Des experts reconnus en gouvernance d\'entreprise, audit financier, inclusion financière, transformation digitale et sauvegarde environnementale mobilisés en consortium pour vos missions complexes en Afrique.'
                  : 'Recognized experts in corporate governance, financial audit, financial inclusion, digital transformation and environmental safeguards mobilized in consortium for your complex missions in Africa.'}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <i className="ri-award-line text-amber-400 text-xl"></i>
                  <span className="text-white font-semibold">
                    {lang === 'fr' ? '22+ ans d\'expérience' : '22+ years of experience'}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <i className="ri-global-line text-amber-400 text-xl"></i>
                  <span className="text-white font-semibold">
                    {lang === 'fr' ? '8 pays couverts' : '8 countries covered'}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <i className="ri-briefcase-line text-amber-400 text-xl"></i>
                  <span className="text-white font-semibold">
                    {lang === 'fr' ? '150+ missions réalisées' : '150+ completed missions'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experts profiles */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {experts.map((expert, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl border-2 ${expert.borderColor} ${expert.bgLight} overflow-hidden hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="flex flex-col lg:flex-row">
                    
                    {/* Photo */}
                    <div className="lg:w-80 shrink-0 relative overflow-hidden">
                      <img
                        src={expert.photo}
                        alt={`${expert.name} – ${expert.role[lang]}`}
                        className="w-full h-96 lg:h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="font-playfair text-3xl font-bold text-white mb-2">
                          {expert.name}
                        </h3>
                        <p className="text-amber-300 font-semibold text-sm">
                          {expert.role[lang]}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 lg:p-10">
                      
                      {/* Specialization */}
                      <div className="mb-6">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${expert.bgLight} border ${expert.borderColor}`}>
                          <i className={`ri-star-line ${expert.textColor}`}></i>
                          <span className={`text-sm font-bold ${expert.textColor}`}>
                            {expert.specialization[lang]}
                          </span>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-700 text-base leading-relaxed mb-8">
                        {expert.bio[lang]}
                      </p>

                      {/* Expertise */}
                      <div className="mb-8">
                        <h4 className={`text-sm font-bold uppercase tracking-wider ${expert.textColor} mb-4`}>
                          {lang === 'fr' ? 'Domaines d\'expertise' : 'Areas of Expertise'}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {expert.expertise[lang].map((skill, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <i className={`ri-checkbox-circle-fill ${expert.textColor} text-lg mt-0.5`}></i>
                              <span className="text-gray-700 text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Publications */}
                      <div className="mb-8">
                        <h4 className={`text-sm font-bold uppercase tracking-wider ${expert.textColor} mb-4`}>
                          {lang === 'fr' ? 'Publications & Contributions' : 'Publications & Contributions'}
                        </h4>
                        <ul className="space-y-2">
                          {expert.publications[lang].map((pub, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <i className={`ri-file-text-line ${expert.textColor} text-lg mt-0.5`}></i>
                              <span className="text-gray-700 text-sm">{pub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Contact */}
                      <div className={`p-6 rounded-2xl bg-white border-2 ${expert.borderColor} flex flex-wrap gap-4`}>
                        {expert.email && (
                        <a
                          href={`mailto:${expert.email}`}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${expert.bgLight} ${expert.textColor} font-semibold text-sm hover:opacity-80 transition-opacity cursor-pointer`}
                        >
                          <i className="ri-mail-line text-lg"></i>
                          {lang === 'fr' ? 'Envoyer un email' : 'Send email'}
                        </a>
                        )}
                        <a
                          href={expert.linkedin}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${expert.bgLight} ${expert.textColor} font-semibold text-sm hover:opacity-80 transition-opacity cursor-pointer`}
                        >
                          <i className="ri-linkedin-line text-lg"></i>
                          {lang === 'fr' ? 'Profil LinkedIn' : 'LinkedIn Profile'}
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=abstract%20professional%20business%20pattern%20with%20green%20accent%20geometric%20shapes%20on%20dark%20charcoal%20background%20modern%20corporate%20texture%20elegant%20design%20dark%20charcoal%20tones%20with%20deloitte%20green%20accent%20lighting%20no%20blue%20no%20purple&width=1920&height=400&seq=experts-cta-bg-green&orientation=landscape')] opacity-10 bg-cover bg-center"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {lang === 'fr'
                ? 'Travaillons ensemble sur votre projet'
                : 'Let\'s work together on your project'}
            </h2>
            <p className="text-lg text-amber-100 mb-8 leading-relaxed">
              {lang === 'fr'
                ? 'Nos experts sont disponibles pour vous accompagner dans vos projets de gouvernance, audit financier, inclusion financière, transformation digitale et sauvegarde environnementale.'
                : 'Our experts are available to support you in your governance, financial audit, financial inclusion, digital transformation and environmental safeguards projects.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-amber-700 font-bold text-base hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                <i className="ri-briefcase-line text-xl"></i>
                {lang === 'fr' ? 'Découvrir nos services' : 'Discover our services'}
              </a>
              <a
                href="/#contact"
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-800 text-white font-bold text-base hover:bg-amber-900 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                <i className="ri-message-3-line text-xl"></i>
                {lang === 'fr' ? 'Nous contacter' : 'Contact us'}
              </a>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}



