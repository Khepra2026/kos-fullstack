import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export function Credibility() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const credibilityData = {
    missions: [
      {
        icon: 'ri-building-line',
        number: 'UEMOA',
        label: isEn ? '+ CEMAC Zones' : '+ Zone CEMAC',
        description: isEn ? 'Geographic coverage of advisory missions' : 'Couverture géographique des missions de conseil'
      },
      {
        icon: 'ri-global-line',
        number: 'OCDE',
        label: isEn ? 'BEPS & OHADA' : 'BEPS & OHADA',
        description: isEn ? 'International and regional regulatory frameworks' : 'Cadres réglementaires internationaux et régionaux'
      },
      {
        icon: 'ri-team-line',
        number: 'COSO',
        label: isEn ? 'IIA & ISO' : 'IIA & ISO',
        description: isEn ? 'Reference standards for governance and risk' : 'Référentiels standards de gouvernance et risques'
      }
    ],
    organizations: [
      {
        name: 'FINAM Gabon',
        role: isEn ? 'Senior Auditor (2011-2015)' : 'Auditeur Senior (2011-2015)',
        icon: 'ri-shield-check-line'
      },
      {
        name: 'Atlantique Microfinance (AMIFA)',
        role: isEn ? 'CEO (2016-2020)' : 'Directeur Général (2016-2020)',
        icon: 'ri-building-4-line'
      },
      {
        name: 'Ministère Inclusion Financière Togo',
        role: isEn ? 'National Technical Advisor (2021-2023)' : 'Conseiller Technique National (2021-2023)',
        icon: 'ri-government-line'
      },
      {
        name: 'SYNERGIE FINANCE SA',
        role: isEn ? 'Board Member' : 'Administrateur',
        icon: 'ri-user-star-line'
      }
    ],
    conferences: [
      {
        title: isEn ? 'BCEAO Regulatory Compliance' : 'Conformité réglementaire BCEAO',
        event: isEn ? 'Regional Microfinance Forum' : 'Forum régional de la microfinance',
        year: '2023',
        icon: 'ri-presentation-line'
      },
      {
        title: isEn ? 'Digital Financial Inclusion' : 'Inclusion financière digitale',
        event: isEn ? 'West Africa Fintech Summit' : 'Sommet Fintech Afrique de l\'Ouest',
        year: '2022',
        icon: 'ri-smartphone-line'
      },
      {
        title: isEn ? 'Enterprise Risk Management' : 'Gestion des risques d\'entreprise',
        event: isEn ? 'African Governance Conference' : 'Conférence africaine sur la gouvernance',
        year: '2022',
        icon: 'ri-shield-star-line'
      }
    ],
    certifications: [
      {
        title: 'MBA',
        institution: isEn ? 'Laval University, Canada' : 'Université Laval, Canada',
        year: '2018',
        icon: 'ri-graduation-cap-line'
      },
      {
        title: isEn ? 'Master in Management Sciences' : 'Maîtrise en Sciences de Gestion',
        institution: isEn ? 'University of Lomé, Togo' : 'Université de Lomé, Togo',
        year: '2003',
        icon: 'ri-book-open-line'
      },
      {
        title: isEn ? 'Corporate Governance Expert' : 'Expert en Gouvernance d\'Entreprise',
        institution: isEn ? '22 years of experience' : '22 ans d\'expérience',
        year: isEn ? 'Since 2003' : 'Depuis 2003',
        icon: 'ri-award-line'
      }
    ],
    partners: [] as { name: string; type: string }[]
  };

  // Carousel autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % credibilityData.partners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, credibilityData.partners.length]);

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-200 mb-4">
            <i className="ri-medal-line text-gold-600 text-sm" aria-hidden="true"></i>
            <span className="text-sm font-semibold text-gold-700 uppercase tracking-wider">
              {isEn ? 'Credibility & Experience' : 'Crédibilité & Expérience'}
            </span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 px-4">
            {isEn ? 'Proven Track Record' : 'Un parcours éprouvé'}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400 rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-gold-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400 rounded-full"></div>
          </div>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto px-4">
            {isEn
              ? 'Over 22 years of experience supporting organizations across Africa'
              : "Plus de 22 ans d'expérience à accompagner des organisations à travers l'Afrique"}
          </p>
        </div>

        {/* Missions réalisées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {credibilityData.missions.map((mission, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-navy-50 to-white rounded-2xl p-8 border border-navy-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className={`${mission.icon} text-3xl text-white`} aria-hidden="true"></i>
              </div>
              <div className="font-playfair text-5xl font-bold text-navy-900 mb-2">
                {mission.number}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {mission.label}
              </h3>
              <p className="text-sm text-gray-600">
                {mission.description}
              </p>
            </div>
          ))}
        </div>

        {/* Carousel partenaires — supprimé pour conformité institutionnelle */}
        {credibilityData.partners.length > 0 && (
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {isEn ? 'Trusted Partners & Clients' : 'Partenaires & Clients de confiance'}
            </h3>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-navy-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-navy-400"></div>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-navy-300 rounded-full"></div>
            </div>
          </div>
        </div>
        )}

        {/* Organisations accompagnées */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {isEn ? 'Key Organizations' : 'Organisations clés'}
            </h3>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-navy-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-navy-400"></div>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-navy-300 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credibilityData.organizations.map((org, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-navy-300 hover:shadow-lg transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${org.icon} text-2xl text-navy-600`} aria-hidden="true"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    {org.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {org.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conférences & Interventions */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {isEn ? 'Conferences & Speaking Engagements' : 'Conférences & Interventions'}
            </h3>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400"></div>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-300 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credibilityData.conferences.map((conf, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-gold-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center mb-4">
                  <i className={`${conf.icon} text-2xl text-gold-600`} aria-hidden="true"></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {conf.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  {conf.event}
                </p>
                <p className="text-xs text-gray-500 font-semibold">
                  {conf.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Formation */}
        <div>
          <div className="text-center mb-8">
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {isEn ? 'Education & Certifications' : 'Formation & Certifications'}
            </h3>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-navy-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-navy-400"></div>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-navy-300 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credibilityData.certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-2 border-navy-200 hover:border-navy-400 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-navy-600 to-navy-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${cert.icon} text-2xl text-white`} aria-hidden="true"></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {cert.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  {cert.institution}
                </p>
                <p className="text-xs text-navy-600 font-semibold">
                  {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}