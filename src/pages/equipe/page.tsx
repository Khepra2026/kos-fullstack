import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { useHeroImage } from '@/hooks/useHeroImage';
import { HERO_IMAGES } from '@/utils/heroImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const team = [
  {
    name: 'SIMDA Essoyomèwè',
    role: 'Directeur Associé & Fondateur',
    expertise: 'Gouvernance & Audit Financier · Inclusion Financière · Conseil Stratégique',
    bio: 'Directeur Associé et Fondateur de KHEPRA EXPERTS, il cumule plus de 22 ans d\'expérience en audit financier, gouvernance d\'entreprise, inclusion financière et transformation organisationnelle en Afrique de l\'Ouest et Centrale. MBA en Gestion des Entreprises (Université Laval), il a notamment exercé comme Directeur Général d\'Atlantique Microfinance (AMIFA) au Gabon et Conseiller Technique National en Inclusion Financière auprès du gouvernement togolais.',
    certifications: ['MBA Laval', 'BCEAO'],
    imageKey: 'team-member-1' as keyof typeof HERO_IMAGES,
    linkedin: 'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
  },
  {
    name: 'Expert Senior en Gestion de Projets',
    role: 'Directeur des Opérations',
    expertise: 'Gestion de Projets · Méthodologies Agiles · PMO',
    bio: 'Expert en gestion de projets complexes et transformation organisationnelle, avec une expertise approfondie en méthodologies agiles et gestion du changement.',
    certifications: ['PMP', 'CSM'],
    imageKey: 'team-member-2' as keyof typeof HERO_IMAGES,
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Experte en Ressources Humaines',
    role: 'Directrice RH & Développement Organisationnel',
    expertise: 'Développement Organisationnel · RH · Conduite du Changement',
    bio: 'Experte en développement organisationnel et gestion des ressources humaines, spécialisée dans le renforcement des capacités et la conduite du changement.',
    certifications: ['SHRM-SCP', 'CCMP'],
    imageKey: 'team-member-3' as keyof typeof HERO_IMAGES,
    linkedin: 'https://linkedin.com',
  },
];

const values = [
  {
    icon: 'ri-shield-check-line',
    title: 'Intégrité',
    description: 'Nous agissons avec honnêteté et transparence dans toutes nos interactions professionnelles.',
  },
  {
    icon: 'ri-lightbulb-line',
    title: 'Excellence',
    description: 'Nous visons l\'excellence dans chaque mission, en dépassant les attentes de nos clients.',
  },
  {
    icon: 'ri-global-line',
    title: 'Impact',
    description: 'Nous mesurons notre succès à l\'aune de l\'impact positif généré pour nos clients et l\'Afrique.',
  },
  {
    icon: 'ri-team-line',
    title: 'Collaboration',
    description: 'Nous croyons en la force du travail d\'équipe et des partenariats durables.',
  },
];

function TeamMemberCard({ member, index }: { member: typeof team[0]; index: number }) {
  const { src, onError } = useHeroImage(member.imageKey);
  return (
    <div
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={src}
          onError={onError}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          width="400"
          height="480"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 right-4 flex flex-wrap gap-2">
          {member.certifications.map((cert, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-brand-900"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-900 mb-2">{member.name}</h3>
        <p className="text-gold-600 font-semibold mb-3">{member.role}</p>
        <p className="text-sm text-gray-500 mb-4 font-medium">{member.expertise}</p>
        <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-2 text-brand-900 hover:text-gold-600 transition-colors duration-300 font-semibold"
        >
          <i className="ri-linkedin-box-fill text-xl" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

const Equipe = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'fr';

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/equipe#webpage`,
        "url": `${SITE_URL}/equipe`,
        "name": "Notre Équipe d'Experts | Khepra Experts",
        "description": "Rencontrez notre équipe d'experts en conseil stratégique, transformation digitale et inclusion financière, avec plus de 15 ans d'expérience en Afrique.",
        "inLanguage": "fr-FR",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "url": SITE_URL,
          "name": "Khepra Experts"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Équipe", "item": `${SITE_URL}/equipe` }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={currentLang === 'fr'
          ? "Equipe | Experts Gouvernance, Conformite BCEAO & Investment Readiness"
          : "Team | Governance, BCEAO Compliance & Investment Readiness Experts"
        }
        description={currentLang === 'fr'
          ? "Consultants seniors certifiés : gouvernance, conformité BCEAO, audit, due diligence. 22 ans d'expérience, 20+ pays. Découvrez nos experts."
          : "Certified senior consultants: governance, BCEAO compliance, audit, due diligence. 22 years experience, 20+ countries. Meet our experts."
        }
        keywords={currentLang === 'fr'
          ? "équipe KHEPRA EXPERTS, consultants experts Afrique, experts gouvernance entreprise, consultants audit financier, experts conformité BCEAO, consultants transformation digitale, experts inclusion financière"
          : "KHEPRA EXPERTS team, Africa expert consultants, corporate governance experts, financial audit consultants, BCEAO compliance experts, digital transformation consultants, financial inclusion experts"}
        canonicalPath="/equipe"
        ogType="website"
        ogImage={OG_IMAGES.ABOUT}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        schemaJson={schemaData}
      />
      <Navigation />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb
              variant="dark"
              items={[
                { label: currentLang === 'fr' ? 'Accueil' : 'Home', href: '/' },
                { label: currentLang === 'fr' ? 'Équipe' : 'Team' },
              ]}
            />
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 border border-gold-200 rounded-full mb-6">
              <i className="ri-team-line text-gold-600" />
              <span className="text-sm font-semibold text-gold-700">
                {currentLang === 'fr' ? 'Notre Équipe' : 'Our Team'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              {currentLang === 'fr'
                ? 'Des Experts au Service de Votre Réussite'
                : 'Experts at the Service of Your Success'}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {currentLang === 'fr'
                ? 'Une équipe de consultants seniors certifiés, combinant expertise internationale et connaissance approfondie des réalités africaines.'
                : 'A team of certified senior consultants, combining international expertise and deep knowledge of African realities.'}
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 border border-gold-200 rounded-full mb-6">
                <i className="ri-star-line text-gold-600" />
                <span className="text-sm font-semibold text-gold-700">
                  {currentLang === 'fr' ? 'Nos Valeurs' : 'Our Values'}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 mb-4">
                {currentLang === 'fr' ? 'Ce Qui Nous Guide' : 'What Guides Us'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {currentLang === 'fr'
                  ? 'Nos valeurs fondamentales qui orientent chaque décision et chaque action.'
                  : 'Our core values that guide every decision and every action.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gold-50 text-gold-600 mb-6">
                    <i className={`${value.icon} text-2xl`} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 rounded-3xl p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <i className="ri-customer-service-2-line text-gold-400" />
              <span className="text-sm font-semibold text-white">
                {currentLang === 'fr' ? 'Rejoignez-nous' : 'Join Us'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {currentLang === 'fr' ? 'Travaillons Ensemble' : "Let's Work Together"}
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {currentLang === 'fr'
                ? "Vous souhaitez collaborer avec notre équipe d'experts ? Contactez-nous pour discuter de votre projet."
                : 'Want to collaborate with our team of experts? Contact us to discuss your project.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  const expertButton = document.getElementById('vapi-widget-floating-button') as HTMLButtonElement;
                  if (expertButton) expertButton.click();
                }}
                className="px-8 py-4 bg-gold-500 text-white rounded-full font-semibold hover:bg-gold-600 hover:shadow-2xl transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2"
              >
                <i className="ri-calendar-check-line text-xl" />
                {currentLang === 'fr' ? 'Prendre rendez-vous' : 'Book appointment'}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 whitespace-nowrap cursor-pointer"
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
};

export default Equipe;
