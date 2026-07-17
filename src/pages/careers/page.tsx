import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { STATIC_HREFLANG_MAP } from '@/utils/hreflang';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const openPositions = [
  {
    title: {
      fr: 'Consultant Senior en Gouvernance',
      en: 'Senior Governance Consultant',
    },
    type: {
      fr: 'CDI',
      en: 'Full-time',
    },
    location: {
      fr: 'Lomé, Togo',
      en: 'Lomé, Togo',
    },
    experience: {
      fr: '5+ ans',
      en: '5+ years',
    },
    description: {
      fr: 'Nous recherchons un consultant senior pour accompagner nos clients dans leurs projets de gouvernance d\'entreprise, audit financier et conformité réglementaire en Afrique de l\'Ouest.',
      en: 'We are looking for a senior consultant to support our clients in their corporate governance, financial audit and regulatory compliance projects in West Africa.',
    },
    requirements: {
      fr: [
        'Master en Finance, Audit ou Gestion',
        '5+ ans d\'expérience en conseil stratégique ou audit',
        'Expertise en gouvernance d\'entreprise et conformité BCEAO',
        'Excellentes capacités d\'analyse et de communication',
        'Maîtrise du français et de l\'anglais',
      ],
      en: [
        'Master\'s in Finance, Audit or Management',
        '5+ years of experience in strategic consulting or audit',
        'Expertise in corporate governance and BCEAO compliance',
        'Excellent analytical and communication skills',
        'Fluent in French and English',
      ],
    },
    icon: 'ri-briefcase-line',
    color: 'from-blue-600 to-indigo-700',
  },
  {
    title: {
      fr: 'Expert en Transformation Digitale',
      en: 'Digital Transformation Expert',
    },
    type: {
      fr: 'CDI',
      en: 'Full-time',
    },
    location: {
      fr: 'Lomé, Togo (Télétravail possible)',
      en: 'Lomé, Togo (Remote possible)',
    },
    experience: {
      fr: '3+ ans',
      en: '3+ years',
    },
    description: {
      fr: 'Rejoignez notre équipe pour accompagner les institutions financières et les PME dans leur transformation digitale et l\'adoption de solutions fintech.',
      en: 'Join our team to support financial institutions and SMEs in their digital transformation and fintech solutions adoption.',
    },
    requirements: {
      fr: [
        'Formation en informatique, digital ou fintech',
        '3+ ans d\'expérience en transformation digitale',
        'Connaissance des solutions fintech africaines',
        'Capacité à gérer des projets complexes',
        'Esprit d\'innovation et créativité',
      ],
      en: [
        'Degree in IT, digital or fintech',
        '3+ years of experience in digital transformation',
        'Knowledge of African fintech solutions',
        'Ability to manage complex projects',
        'Innovation mindset and creativity',
      ],
    },
    icon: 'ri-smartphone-line',
    color: 'from-purple-600 to-violet-700',
  },
  {
    title: {
      fr: 'Analyste en Inclusion Financière',
      en: 'Financial Inclusion Analyst',
    },
    type: {
      fr: 'CDD',
      en: 'Fixed-term',
    },
    location: {
      fr: 'Lomé, Togo',
      en: 'Lomé, Togo',
    },
    experience: {
      fr: '2+ ans',
      en: '2+ years',
    },
    description: {
      fr: 'Participez à nos missions d\'analyse et d\'évaluation des programmes d\'inclusion financière en Afrique de l\'Ouest et Centrale.',
      en: 'Participate in our analysis and evaluation missions of financial inclusion programs in West and Central Africa.',
    },
    requirements: {
      fr: [
        'Master en Économie, Finance ou Développement',
        '2+ ans d\'expérience en microfinance ou inclusion financière',
        'Compétences en analyse de données',
        'Connaissance des contextes africains',
        'Capacité à travailler en équipe',
      ],
      en: [
        'Master\'s in Economics, Finance or Development',
        '2+ years of experience in microfinance or financial inclusion',
        'Data analysis skills',
        'Knowledge of African contexts',
        'Ability to work in a team',
      ],
    },
    icon: 'ri-line-chart-line',
    color: 'from-green-600 to-emerald-700',
  },
];

const values = [
  {
    title: {
      fr: 'Excellence',
      en: 'Excellence',
    },
    description: {
      fr: 'Nous visons l\'excellence dans chaque mission et chaque interaction avec nos clients.',
      en: 'We aim for excellence in every mission and every interaction with our clients.',
    },
    icon: 'ri-star-line',
    color: 'from-amber-600 to-yellow-700',
  },
  {
    title: {
      fr: 'Intégrité',
      en: 'Integrity',
    },
    description: {
      fr: 'L\'éthique et la transparence guident toutes nos actions et décisions.',
      en: 'Ethics and transparency guide all our actions and decisions.',
    },
    icon: 'ri-shield-check-line',
    color: 'from-blue-600 to-indigo-700',
  },
  {
    title: {
      fr: 'Innovation',
      en: 'Innovation',
    },
    description: {
      fr: 'Nous encourageons la créativité et l\'innovation pour apporter des solutions adaptées.',
      en: 'We encourage creativity and innovation to provide tailored solutions.',
    },
    icon: 'ri-lightbulb-line',
    color: 'from-purple-600 to-violet-700',
  },
  {
    title: {
      fr: 'Collaboration',
      en: 'Collaboration',
    },
    description: {
      fr: 'Le travail d\'équipe et le partage de connaissances sont au cœur de notre culture.',
      en: 'Teamwork and knowledge sharing are at the heart of our culture.',
    },
    icon: 'ri-team-line',
    color: 'from-green-600 to-emerald-700',
  },
];

const testimonials = [
  {
    name: 'Amina K.',
    role: {
      fr: 'Consultante Senior',
      en: 'Senior Consultant',
    },
    quote: {
      fr: 'Travailler chez KHEPRA EXPERTS m\'a permis de développer mes compétences en gouvernance et d\'avoir un impact réel sur les organisations africaines. L\'environnement est stimulant et les projets sont passionnants.',
      en: 'Working at KHEPRA EXPERTS has allowed me to develop my governance skills and have a real impact on African organizations. The environment is stimulating and the projects are exciting.',
    },
    photo: 'https://readdy.ai/api/search-image?query=professional%20african%20female%20business%20consultant%20portrait%20smiling%20confidently%20in%20elegant%20business%20attire%2C%20warm%20studio%20lighting%20with%20soft%20bokeh%20background%2C%20authentic%20executive%20headshot%20photography%2C%20approachable%20and%20trustworthy%20appearance%2C%20high%20quality%20corporate%20portrait&width=400&height=400&seq=testimonial-amina-v1&orientation=squarish',
  },
  {
    name: 'Kofi M.',
    role: {
      fr: 'Expert Digital',
      en: 'Digital Expert',
    },
    quote: {
      fr: 'L\'équipe est exceptionnelle et les opportunités d\'apprentissage sont nombreuses. J\'apprécie particulièrement la diversité des missions et la confiance accordée aux consultants.',
      en: 'The team is exceptional and learning opportunities are numerous. I particularly appreciate the diversity of missions and the trust given to consultants.',
    },
    photo: 'https://readdy.ai/api/search-image?query=professional%20african%20male%20technology%20consultant%20portrait%20smiling%20warmly%20in%20smart%20casual%20business%20attire%2C%20natural%20studio%20lighting%20with%20soft%20bokeh%20background%2C%20authentic%20executive%20headshot%20photography%2C%20friendly%20and%20innovative%20appearance%2C%20high%20quality%20corporate%20portrait&width=400&height=400&seq=testimonial-kofi-v1&orientation=squarish',
  },
];

export default function CareersPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const currentLang = lang === 'en' ? 'en-US' : 'fr-FR';
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const careersSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/careers#webpage`,
        name: 'Carrières — KHEPRA EXPERTS',
        description: 'Rejoignez KHEPRA EXPERTS et participez à la transformation des organisations africaines. Découvrez nos postes ouverts en conseil stratégique, audit financier et transformation digitale.',
        url: `${SITE_URL}/careers`,
        inLanguage: currentLang,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
        },
        breadcrumb: {
          '@id': `${SITE_URL}/careers#breadcrumb`
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/careers#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Carrières', item: `${SITE_URL}/careers` },
        ],
      },
      {
        '@type': 'JobPosting',
        '@id': `${SITE_URL}/careers#job-consultant-senior-gouvernance`,
        title: 'Consultant Senior en Gouvernance',
        description: 'Nous recherchons un consultant senior pour accompagner nos clients dans leurs projets de gouvernance d\'entreprise, audit financier et conformité réglementaire en Afrique de l\'Ouest. Compétences requises : Master en Finance, Audit ou Gestion, 5+ ans d\'expérience en conseil stratégique ou audit, expertise en gouvernance d\'entreprise et conformité BCEAO, excellentes capacités d\'analyse et de communication, maîtrise du français et de l\'anglais.',
        datePosted: '2025-01-15',
        validThrough: '2025-12-31',
        employmentType: 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: 'KHEPRA EXPERTS',
          sameAs: SITE_URL,
          logo: `${SITE_URL}/logo.png`
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Lomé',
            addressCountry: 'TG'
          }
        },
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'XOF',
          value: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            unitText: 'YEAR'
          }
        },
        qualifications: 'Master en Finance, Audit ou Gestion. 5+ ans d\'expérience en conseil stratégique ou audit.',
        skills: 'Gouvernance d\'entreprise, Conformité BCEAO, Audit financier, Analyse stratégique',
        workHours: 'Temps plein',
        url: `${SITE_URL}/careers`
      },
      {
        '@type': 'JobPosting',
        '@id': `${SITE_URL}/careers#job-expert-transformation-digitale`,
        title: 'Expert en Transformation Digitale',
        description: 'Rejoignez notre équipe pour accompagner les institutions financières et les PME dans leur transformation digitale et l\'adoption de solutions fintech. Compétences requises : Formation en informatique, digital ou fintech, 3+ ans d\'expérience en transformation digitale, connaissance des solutions fintech africaines, capacité à gérer des projets complexes, esprit d\'innovation et créativité.',
        datePosted: '2025-02-01',
        validThrough: '2025-12-31',
        employmentType: 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: 'KHEPRA EXPERTS',
          sameAs: SITE_URL,
          logo: `${SITE_URL}/logo.png`
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Lomé',
            addressCountry: 'TG'
          }
        },
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'XOF',
          value: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            unitText: 'YEAR'
          }
        },
        qualifications: 'Formation en informatique, digital ou fintech. 3+ ans d\'expérience en transformation digitale.',
        skills: 'Transformation digitale, Fintech, Gestion de projets, Innovation',
        workHours: 'Temps plein (Télétravail possible)',
        url: `${SITE_URL}/careers`
      },
      {
        '@type': 'JobPosting',
        '@id': `${SITE_URL}/careers#job-analyste-inclusion-financiere`,
        title: 'Analyste en Inclusion Financière',
        description: 'Participez à nos missions d\'analyse et d\'évaluation des programmes d\'inclusion financière en Afrique de l\'Ouest et Centrale. Compétences requises : Master en Économie, Finance ou Développement, 2+ ans d\'expérience en microfinance ou inclusion financière, compétences en analyse de données, connaissance des contextes africains, capacité à travailler en équipe.',
        datePosted: '2025-03-01',
        validThrough: '2025-09-30',
        employmentType: 'TEMPORARY',
        hiringOrganization: {
          '@type': 'Organization',
          name: 'KHEPRA EXPERTS',
          sameAs: SITE_URL,
          logo: `${SITE_URL}/logo.png`
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Lomé',
            addressCountry: 'TG'
          }
        },
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'XOF',
          value: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            unitText: 'YEAR'
          }
        },
        qualifications: 'Master en Économie, Finance ou Développement. 2+ ans d\'expérience en microfinance ou inclusion financière.',
        skills: 'Inclusion financière, Microfinance, Analyse de données, Contextes africains',
        workHours: 'CDD',
        url: `${SITE_URL}/careers`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Carrières — KHEPRA EXPERTS | Rejoignez notre équipe de conseil"
        description="Rejoignez KHEPRA EXPERTS et participez à la transformation des organisations africaines. Découvrez nos postes ouverts en conseil stratégique, audit financier, gouvernance et transformation digitale."
        keywords="carrières conseil Afrique, emploi consultant Togo, recrutement audit financier, jobs gouvernance, KHEPRA EXPERTS careers"
        canonicalPath="/careers"
        ogType="website"
        ogImage={OG_IMAGES.CAREERS}
        ogImageAlt="Rejoignez KHEPRA EXPERTS – Carrières | Opportunités de conseil en Afrique"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        structuredData={careersSchema}
        hreflangLinks={STATIC_HREFLANG_MAP['/careers/']}
      />
      <Navigation />
      
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-careers-bg.webp')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Breadcrumb
                variant="light"
                items={[
                  { label: lang === 'fr' ? 'Accueil' : 'Home', href: '/' },
                  { label: lang === 'fr' ? 'Carrières' : 'Careers' },
                ]}
              />
            </div>

            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm mb-6">
                <i className="ri-briefcase-line text-green-400 text-sm"></i>
                <span className="text-sm font-semibold text-green-300 uppercase tracking-wider">
                  {lang === 'fr' ? 'Rejoignez-nous' : 'Join Us'}
                </span>
              </div>
              
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {lang === 'fr' ? 'Construisez votre carrière avec nous' : 'Build Your Career With Us'}
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
                {lang === 'fr'
                  ? 'Rejoignez une équipe passionnée qui transforme les organisations africaines à travers le conseil stratégique, l\'audit financier, la gouvernance et la transformation digitale.'
                  : 'Join a passionate team transforming African organizations through strategic consulting, financial audit, governance and digital transformation.'}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <i className="ri-team-line text-green-400 text-xl"></i>
                  <span className="text-white font-semibold">
                    {lang === 'fr' ? 'Équipe multiculturelle' : 'Multicultural team'}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <i className="ri-rocket-line text-green-400 text-xl"></i>
                  <span className="text-white font-semibold">
                    {lang === 'fr' ? 'Projets à impact' : 'High-impact projects'}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <i className="ri-line-chart-line text-green-400 text-xl"></i>
                  <span className="text-white font-semibold">
                    {lang === 'fr' ? 'Évolution rapide' : 'Fast growth'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Culture & Values */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-6">
                <i className="ri-heart-line text-green-600 text-sm"></i>
                <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">
                  {lang === 'fr' ? 'Notre Culture' : 'Our Culture'}
                </span>
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
                {lang === 'fr' ? 'Nos Valeurs' : 'Our Values'}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {lang === 'fr'
                  ? 'Les valeurs qui guident notre travail quotidien et nos relations avec nos clients et collaborateurs.'
                  : 'The values that guide our daily work and our relationships with clients and colleagues.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${value.icon} text-white text-3xl`}></i>
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl mb-3">
                    {value.title[lang]}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
                <i className="ri-briefcase-4-line text-blue-600 text-sm"></i>
                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                  {lang === 'fr' ? 'Postes Ouverts' : 'Open Positions'}
                </span>
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
                {lang === 'fr' ? 'Opportunités Actuelles' : 'Current Opportunities'}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {lang === 'fr'
                  ? 'Découvrez nos postes ouverts et trouvez celui qui correspond à vos compétences et aspirations.'
                  : 'Discover our open positions and find the one that matches your skills and aspirations.'}
              </p>
            </div>

            <div className="space-y-6">
              {openPositions.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center shrink-0`}>
                          <i className={`${job.icon} text-white text-2xl`}></i>
                        </div>
                        <div>
                          <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                            {job.title[lang]}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                              <i className="ri-briefcase-line"></i>
                              {job.type[lang]}
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                              <i className="ri-map-pin-line"></i>
                              {job.location[lang]}
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                              <i className="ri-time-line"></i>
                              {job.experience[lang]}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedJob(expandedJob === idx ? null : idx)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold text-sm hover:from-green-700 hover:to-emerald-800 transition-all duration-300 whitespace-nowrap cursor-pointer"
                      >
                        {expandedJob === idx ? (
                          <>
                            <span>{lang === 'fr' ? 'Réduire' : 'Collapse'}</span>
                            <i className="ri-arrow-up-s-line text-lg"></i>
                          </>
                        ) : (
                          <>
                            <span>{lang === 'fr' ? 'Voir les détails' : 'View details'}</span>
                            <i className="ri-arrow-down-s-line text-lg"></i>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                      {job.description[lang]}
                    </p>

                    {expandedJob === idx && (
                      <div className="mt-6 pt-6 border-t-2 border-gray-100">
                        <h4 className="font-bold text-gray-900 text-lg mb-4">
                          {lang === 'fr' ? 'Profil recherché' : 'Required Profile'}
                        </h4>
                        <ul className="space-y-3 mb-6">
                          {job.requirements[lang].map((req, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <i className="ri-checkbox-circle-fill text-green-600 text-xl mt-0.5"></i>
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                        <a
                          href="mailto:contact@khepraexperts.com?subject=Candidature"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-700 text-white font-bold text-base hover:from-amber-700 hover:to-yellow-800 transition-all duration-300 whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-mail-send-line text-lg"></i>
                          {lang === 'fr' ? 'Postuler maintenant' : 'Apply now'}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
                <i className="ri-chat-quote-line text-purple-600 text-sm"></i>
                <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">
                  {lang === 'fr' ? 'Témoignages' : 'Testimonials'}
                </span>
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
                {lang === 'fr' ? 'Ce que disent nos collaborateurs' : 'What Our Team Says'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl border-2 border-purple-100 p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-purple-600 font-semibold">
                        {testimonial.role[lang]}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.quote[lang]}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-careers-cta.webp')] opacity-10 bg-cover bg-center"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {lang === 'fr'
                ? 'Vous ne trouvez pas le poste idéal ?'
                : 'Can\'t find the perfect position?'}
            </h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              {lang === 'fr'
                ? 'Envoyez-nous votre candidature spontanée. Nous sommes toujours à la recherche de talents exceptionnels pour rejoindre notre équipe.'
                : 'Send us your spontaneous application. We are always looking for exceptional talents to join our team.'}
            </p>
            <a
              href="mailto:contact@khepraexperts.com?subject=Candidature spontanée"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-green-700 font-bold text-base hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              <i className="ri-mail-send-line text-xl"></i>
              {lang === 'fr' ? 'Envoyer ma candidature' : 'Send my application'}
            </a>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}