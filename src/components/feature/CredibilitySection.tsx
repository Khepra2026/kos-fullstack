import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AnimatedCounter } from '@/components/base/AnimatedCounter';
import ScrollReveal from './ScrollReveal';

interface CredibilitySectionProps {
  variant?: 'full' | 'compact';
  showTimeline?: boolean;
  showMap?: boolean;
}

export function CredibilitySection({ 
  variant = 'full', 
  showTimeline = true,
  showMap = true 
}: CredibilitySectionProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [activeTab, setActiveTab] = useState<'missions' | 'organizations' | 'conferences'>('missions');

  // Missions réalisées par type
  const missionTypes = [
    {
      icon: 'ri-line-chart-line',
      count: '15+',
      label: isEn ? 'Strategic Diagnostics' : 'Diagnostics stratégiques',
      color: 'from-teal-500 to-teal-600',
      bgLight: 'bg-teal-50',
      textColor: 'text-teal-700',
    },
    {
      icon: 'ri-shield-check-line',
      count: '12+',
      label: isEn ? 'Governance & Compliance' : 'Gouvernance & Conformité',
      color: 'from-brand-500 to-brand-600',
      bgLight: 'bg-brand-50',
      textColor: 'text-brand-700',
    },
    {
      icon: 'ri-funds-line',
      count: '10+',
      label: isEn ? 'Financial Structuring' : 'Structuration financière',
      color: 'from-gold-500 to-gold-600',
      bgLight: 'bg-gold-50',
      textColor: 'text-gold-700',
    },
    {
      icon: 'ri-organization-chart',
      count: '8+',
      label: isEn ? 'Organizational Transformation' : 'Transformation organisationnelle',
      color: 'from-amber-500 to-amber-600',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-700',
    },
  ];

  // Types d'organisations accompagnées
  const organizationTypes = [
    {
      icon: 'ri-bank-line',
      label: isEn ? 'Financial Institutions' : 'Institutions financières',
      count: '20+',
      examples: isEn ? 'Banks, MFIs, SFDs' : 'Banques, IMF, SFD',
    },
    {
      icon: 'ri-government-line',
      label: isEn ? 'Public Institutions' : 'Institutions publiques',
      count: '10+',
      examples: isEn ? 'Ministries, Agencies' : 'Ministères, Agences',
    },
    {
      icon: 'ri-building-line',
      label: isEn ? 'Private Companies' : 'Entreprises privées',
      count: '15+',
      examples: isEn ? 'SMEs, Corporates' : 'PME, Grandes entreprises',
    },
    {
      icon: 'ri-global-line',
      label: isEn ? 'International Organizations' : 'Organisations internationales',
      count: '5+',
      examples: isEn ? 'NGOs, Development agencies' : 'ONG, Agences de développement',
    },
  ];

  // Conférences et forums
  const conferences = [
    {
      year: '2024',
      events: [
        {
          title: isEn ? 'BCEAO Regulatory Forum' : 'Forum réglementaire BCEAO',
          location: isEn ? 'Dakar, Senegal' : 'Dakar, Sénégal',
          role: isEn ? 'Expert Speaker' : 'Expert intervenant',
          topic: isEn ? 'LBC/FT Compliance for SFDs' : 'Conformité LBC/FT pour les SFD',
        },
        {
          title: isEn ? 'West African Microfinance Summit' : 'Sommet de la microfinance ouest-africaine',
          location: isEn ? 'Abidjan, Côte d\'Ivoire' : 'Abidjan, Côte d\'Ivoire',
          role: isEn ? 'Panelist' : 'Panéliste',
          topic: isEn ? 'Digital transformation of MFIs' : 'Transformation digitale des IMF',
        },
      ],
    },
    {
      year: '2023',
      events: [
        {
          title: isEn ? 'Financial Inclusion Conference' : 'Conférence sur l\'inclusion financière',
          location: isEn ? 'Lomé, Togo' : 'Lomé, Togo',
          role: isEn ? 'Keynote Speaker' : 'Conférencier principal',
          topic: isEn ? 'Governance challenges in African MFIs' : 'Défis de gouvernance dans les IMF africaines',
        },
        {
          title: isEn ? 'UEMOA Banking Forum' : 'Forum bancaire UEMOA',
          location: isEn ? 'Ouagadougou, Burkina Faso' : 'Ouagadougou, Burkina Faso',
          role: isEn ? 'Expert Consultant' : 'Expert consultant',
          topic: isEn ? 'Risk management frameworks' : 'Cadres de gestion des risques',
        },
      ],
    },
    {
      year: '2022',
      events: [
        {
          title: isEn ? 'Central Africa Economic Forum' : 'Forum économique Afrique Centrale',
          location: isEn ? 'Libreville, Gabon' : 'Libreville, Gabon',
          role: isEn ? 'Workshop Facilitator' : 'Animateur d\'atelier',
          topic: isEn ? 'Strategic planning for growth' : 'Planification stratégique pour la croissance',
        },
      ],
    },
  ];

  // Certifications et affiliations
  const certifications = [
    {
      icon: 'ri-award-line',
      title: isEn ? 'Certified Expert' : 'Expert certifié',
      org: isEn ? 'BCEAO Regulatory Framework' : 'Cadre réglementaire BCEAO',
      year: '2020',
    },
    {
      icon: 'ri-shield-star-line',
      title: isEn ? 'Member' : 'Membre',
      org: isEn ? 'West African Consultants Network' : 'Réseau des consultants ouest-africains',
      year: '2015',
    },
    {
      icon: 'ri-graduation-cap-line',
      title: isEn ? 'Academic Credentials' : 'Diplômes académiques',
      org: isEn ? 'Université de Lomé · Université Laval' : 'Université de Lomé · Université Laval',
      year: '2003',
    },
  ];

  // Interventions régionales
  const regionalCoverage = [
    { region: isEn ? 'West Africa' : 'Afrique de l\'Ouest', countries: 10, missions: 35 },
    { region: isEn ? 'Central Africa' : 'Afrique Centrale', countries: 8, missions: 15 },
    { region: isEn ? 'International' : 'International', countries: 2, missions: 5 },
  ];

  if (variant === 'compact') {
    return (
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {missionTypes.map((mission, idx) => (
              <ScrollReveal key={idx} animation="fadeSlideUp" delay={idx * 100}>
                <div className="text-center group">
                  <div className={`w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-2xl bg-gradient-to-br ${mission.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    <i className={`${mission.icon} text-3xl text-white`}></i>
                  </div>
                  <div className="font-playfair text-4xl font-bold text-gray-900 mb-1">
                    <AnimatedCounter value={parseInt(mission.count)} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{mission.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-200 mb-5">
              <i className="ri-trophy-line text-gold-600 text-sm"></i>
              <span className="text-sm font-semibold text-gold-700 uppercase tracking-wider">
                {isEn ? 'Track Record' : 'Bilan de crédibilité'}
              </span>
            </div>

            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {isEn ? 'Proven Expertise Across Africa' : "Expertise éprouvée à travers l'Afrique"}
            </h2>

            {/* Séparateur décoratif */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400 rounded-full"></div>
              <div className="w-2 h-2 rounded-full bg-gold-500"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400 rounded-full"></div>
            </div>

            {/* Sous-titre redesigné */}
            <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {isEn
                ? '22 years of strategic advisory, 50+ missions delivered, and a network spanning 20+ African countries'
                : '22 ans de conseil stratégique, 50+ missions réalisées, et un réseau couvrant 20+ pays africains'}
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab('missions')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'missions'
                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300'
            }`}
          >
            <i className="ri-briefcase-line mr-2"></i>
            {isEn ? 'Missions Delivered' : 'Missions réalisées'}
          </button>
          <button
            onClick={() => setActiveTab('organizations')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'organizations'
                ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300'
            }`}
          >
            <i className="ri-building-line mr-2"></i>
            {isEn ? 'Organizations Supported' : 'Organisations accompagnées'}
          </button>
          <button
            onClick={() => setActiveTab('conferences')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'conferences'
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gold-300'
            }`}
          >
            <i className="ri-presentation-line mr-2"></i>
            {isEn ? 'Conferences & Forums' : 'Conférences & Forums'}
          </button>
        </div>

        {/* Tab Content with fade transition */}
        <div className="mb-16">
          {activeTab === 'missions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
              {missionTypes.map((mission, idx) => (
                <ScrollReveal key={idx} animation="fadeSlideUp" delay={idx * 100}>
                  <div
                    className={`${mission.bgLight} rounded-2xl p-8 border-2 border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 group`}
                  >
                    <div className={`w-16 h-16 flex items-center justify-center mb-6 rounded-2xl bg-gradient-to-br ${mission.color} shadow-lg group-hover:scale-110 transition-transform`}>
                      <i className={`${mission.icon} text-3xl text-white`}></i>
                    </div>
                    <div className="font-playfair text-5xl font-bold text-gray-900 mb-3">
                      <AnimatedCounter value={parseInt(mission.count)} suffix="+" />
                    </div>
                    <div className={`text-base font-semibold ${mission.textColor} leading-snug`}>{mission.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {activeTab === 'organizations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {organizationTypes.map((org, idx) => (
                <ScrollReveal key={idx} animation="fadeSlideLeft" delay={idx * 100}>
                  <div
                    className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-md flex-shrink-0">
                        <i className={`${org.icon} text-2xl text-white`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">{org.label}</h3>
                        <div className="text-3xl font-bold text-brand-600 mb-2">
                          <AnimatedCounter value={parseInt(org.count)} suffix="+" />
                        </div>
                        <p className="text-sm text-gray-500">{org.examples}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {activeTab === 'conferences' && showTimeline && (
            <div className="max-w-4xl mx-auto animate-fadeIn">
              {conferences.map((yearGroup, idx) => (
                <ScrollReveal key={idx} animation="fadeSlideUp" delay={idx * 150}>
                  <div className="mb-12 last:mb-0">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 shadow-lg flex-shrink-0">
                        <span className="font-playfair text-2xl font-bold text-white">{yearGroup.year}</span>
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-gold-300 to-transparent"></div>
                    </div>
                    <div className="space-y-4 ml-10 pl-10 border-l-2 border-gold-200">
                      {yearGroup.events.map((event, eventIdx) => (
                        <div
                          key={eventIdx}
                          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-gold-300 transition-all duration-300 relative"
                        >
                          <div className="absolute -left-[53px] top-8 w-6 h-6 rounded-full bg-gold-400 border-4 border-white shadow-md"></div>
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gold-50 flex-shrink-0">
                              <i className="ri-calendar-event-line text-xl text-gold-600"></i>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-900 mb-1">{event.title}</h4>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                                <span className="flex items-center gap-1">
                                  <i className="ri-map-pin-line text-gold-500"></i>
                                  {event.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <i className="ri-user-star-line text-gold-500"></i>
                                  {event.role}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2 inline-block">
                                <i className="ri-lightbulb-line text-gold-500 mr-2"></i>
                                {event.topic}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>

        {/* Interventions régionales */}
        {showMap && (
          <ScrollReveal animation="fadeSlideUp">
            <div className="mb-16">
              <h3 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-10">
                {isEn ? 'Regional Coverage' : 'Couverture régionale'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {regionalCoverage.map((region, idx) => (
                  <ScrollReveal key={idx} animation="scale" delay={idx * 150}>
                    <div
                      className="bg-gradient-to-br from-brand-900 to-brand-950 rounded-2xl p-8 text-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    >
                      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/10 mb-6">
                        <i className="ri-map-2-line text-3xl text-gold-400"></i>
                      </div>
                      <h4 className="font-playfair text-2xl font-bold mb-4">{region.region}</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white/70 text-sm">{isEn ? 'Countries' : 'Pays'}</span>
                          <span className="text-3xl font-bold text-gold-400">
                            <AnimatedCounter value={region.countries} suffix="" />
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70 text-sm">{isEn ? 'Missions' : 'Missions'}</span>
                          <span className="text-3xl font-bold text-gold-400">
                            <AnimatedCounter value={region.missions} suffix="" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Certifications et affiliations */}
        <ScrollReveal animation="fadeSlideUp">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-brand-300 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
                      <i className={`${cert.icon} text-2xl text-brand-600`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">{cert.title}</div>
                      <div className="font-bold text-gray-900 text-sm mb-1 leading-snug">{cert.org}</div>
                      <div className="text-xs text-gray-400">{cert.year}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}