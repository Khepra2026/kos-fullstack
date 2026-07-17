import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';

export const Team = memo(function Team() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [expandedBio, setExpandedBio] = useState(false);

  const expertiseAreas = [
    t('about.intervention1'),
    t('about.intervention2'),
    t('about.intervention3'),
    t('about.intervention4'),
    t('about.intervention5'),
    t('about.intervention6'),
  ];

  return (
    <section id="team" className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-brand-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900 text-white mb-4">
            <i className="ri-user-star-line text-sm" aria-hidden="true"></i>
            <span className="text-sm font-semibold uppercase tracking-wider">{t('team.founder')}</span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {isEn ? 'Leadership & Expertise' : 'Leadership & Expertise'}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {isEn 
              ? 'A proven track record across West & Central Africa'
              : "Un parcours éprouvé en Afrique de l'Ouest & Centrale"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">

          {/* Photo fondateur */}
          <div className="order-1 lg:order-1 flex flex-col items-center lg:items-start gap-4">
            <div className="relative w-56 h-64 lg:w-full lg:h-80 rounded-2xl overflow-hidden border-4 border-gold-200 flex-shrink-0">
              <img
                src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg"
                alt="SIMDA Essoyomèwè - Directeur Associé & Fondateur, KHEPRA EXPERTS"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                width={300}
                height={320}
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: 'linear-gradient(to top, rgba(10,31,51,0.92), transparent)' }}>
                <p className="text-white font-bold text-sm">SIMDA Essoyomèwè</p>
                <p className="text-xs" style={{ color: '#86BC25' }}>Directeur Associé & Fondateur</p>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm text-white cursor-pointer transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #0A66C2, #004182)' }}
              aria-label="Profil LinkedIn de SIMDA Essoyomèwè"
            >
              <i className="ri-linkedin-fill text-lg" />
              LinkedIn
            </a>
          </div>

          {/* Contenu bio */}
          <div className="order-2 lg:order-2">
            <div className="mb-6">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                SIMDA Essoyomèwè
              </h2>
              <p className="text-gold-600 font-semibold text-base sm:text-lg">
                {isEn ? 'Associate Director & Founder · 22+ years experience' : 'Directeur Associé & Fondateur · 22+ ans d\'expérience'}
              </p>
            </div>

            <div className={`overflow-hidden transition-all duration-500 ${expandedBio ? 'max-h-[2000px]' : 'max-h-[200px]'}`}>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {t('team.founderBio')}
              </p>

              {expandedBio && (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                    {isEn ? 'Key Positions Held' : 'Postes clés occupés'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      { org: 'FINAM Gabon', role: isEn ? 'Senior Auditor (2011-2015)' : 'Auditeur Senior (2011-2015)', icon: 'ri-shield-check-line' },
                      { org: 'AMIFA', role: isEn ? 'CEO (2016-2020)' : 'Directeur Général (2016-2020)', icon: 'ri-building-4-line' },
                      { org: isEn ? 'Ministry of Financial Inclusion' : 'Ministère Inclusion Financière', role: isEn ? 'National Advisor (2021-2023)' : 'Conseiller National (2021-2023)', icon: 'ri-government-line' },
                      { org: 'SYNERGIE FINANCE SA', role: isEn ? 'Board Member' : 'Administrateur', icon: 'ri-user-star-line' }
                    ].map((pos, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-brand-300 hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className={`${pos.icon} text-brand-600 text-lg`} aria-hidden="true"></i>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1">{pos.org}</h4>
                            <p className="text-xs text-gray-600">{pos.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setExpandedBio(!expandedBio)}
              className="inline-flex items-center gap-2 text-brand-700 hover:text-brand-900 font-semibold mb-8 cursor-pointer transition-colors"
              aria-label={expandedBio ? 'Réduire la biographie' : 'Lire la biographie complète'}
            >
              <span>{expandedBio ? (isEn ? 'Show less' : 'Voir moins') : (isEn ? 'Read full bio' : 'Lire la bio complète')}</span>
              <i className={expandedBio ? 'ri-arrow-up-s-line transition-transform' : 'ri-arrow-down-s-line transition-transform'} aria-hidden="true"></i>
            </button>

            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">{t('about.interventions')}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {expertiseAreas.map((expertise, index) => (
                <div key={index} className="flex items-start gap-3 bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-100 hover:border-gold-300 hover:shadow-md transition-all">
                  <i className="ri-checkbox-circle-fill text-gold-500 text-xl mt-0.5 flex-shrink-0" aria-hidden="true"></i>
                  <span className="text-gray-700 leading-relaxed text-sm">{expertise}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-gold-50 to-white border-l-4 border-gold-500 p-6 rounded-lg shadow-sm">
              <p className="font-playfair text-base sm:text-lg text-gray-800 italic mb-3">
                « {isEn 
                  ? 'Open to consulting missions, strategic collaborations and high-impact projects.'
                  : 'Ouvert aux missions de conseil, aux collaborations stratégiques et aux projets à fort impact.'} »
              </p>
              <p className="text-sm text-gray-600 font-medium">— {t('team.consultant1')}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});