import { useTranslation } from 'react-i18next';

const governance = [
  {
    role: { fr: 'Directeur Associé & Fondateur', en: 'Managing Partner & Founder' },
    name: 'SIMDA Essoyomèwè',
    responsibilities: {
      fr: 'Direction stratégique, supervision des missions, développement commercial',
      en: 'Strategic direction, mission supervision, business development',
    },
    icon: 'ri-user-star-line',
    color: 'from-gold-500 to-gold-700',
  },
  {
    role: { fr: 'Directeur des Opérations', en: 'Chief Operating Officer' },
    name: 'Comité de Direction',
    responsibilities: {
      fr: 'Gestion opérationnelle, qualité des livrables, coordination des équipes',
      en: 'Operational management, deliverable quality, team coordination',
    },
    icon: 'ri-settings-3-line',
    color: 'from-strategic-500 to-strategic-700',
  },
  {
    role: { fr: 'Directeur Technique', en: 'Technical Director' },
    name: 'Équipe Technique',
    responsibilities: {
      fr: 'Méthodologies, standards de qualité, innovation et R&D',
      en: 'Methodologies, quality standards, innovation and R&D',
    },
    icon: 'ri-lightbulb-line',
    color: 'from-strategic-500 to-strategic-700',
  },
];

const advisoryBoard = [
  {
    name: 'Dr. Amina KOUASSI',
    title: { fr: 'Experte en Inclusion Financière', en: 'Financial Inclusion Expert' },
    affiliation: { fr: 'Ancienne Directrice Régionale, Banque Mondiale', en: 'Former Regional Director, World Bank' },
    expertise: { fr: 'Politiques publiques, microfinance, développement économique', en: 'Public policy, microfinance, economic development' },
  },
  {
    name: 'Prof. Jean-Baptiste MENSAH',
    title: { fr: "Expert en Gouvernance d'Entreprise", en: 'Corporate Governance Expert' },
    affiliation: { fr: 'Professeur, Université de Lomé', en: 'Professor, University of Lomé' },
    expertise: { fr: 'Gouvernance, audit, conformité réglementaire', en: 'Governance, audit, regulatory compliance' },
  },
  {
    name: 'Marie-Claire DIOP',
    title: { fr: 'Experte en Transformation Digitale', en: 'Digital Transformation Expert' },
    affiliation: { fr: 'Directrice Innovation, Orange Afrique', en: 'Innovation Director, Orange Africa' },
    expertise: { fr: 'Fintech, digitalisation, innovation technologique', en: 'Fintech, digitalization, technological innovation' },
  },
  {
    name: 'Kwame ASANTE',
    title: { fr: 'Expert en Gestion des Risques', en: 'Risk Management Expert' },
    affiliation: { fr: 'Consultant Senior, Deloitte Afrique', en: 'Senior Consultant, Deloitte Africa' },
    expertise: { fr: 'ERM, cybersécurité, conformité BCEAO', en: 'ERM, cybersecurity, BCEAO compliance' },
  },
];

export function AboutGovernance() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-strategic-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Structure de gouvernance */}
        <div className="mb-20">
          <div className="text-left mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-strategic-50 border border-strategic-200 mb-6">
              <i className="ri-organization-chart text-strategic-600 text-sm"></i>
              <span className="text-sm font-semibold text-strategic-700 uppercase tracking-wider">
                {lang === 'fr' ? 'Gouvernance' : 'Governance'}
              </span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
              {lang === 'fr' ? 'Structure de Gouvernance' : 'Governance Structure'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {lang === 'fr'
                ? "Une structure organisationnelle claire et efficace pour garantir l'excellence de nos services et la satisfaction de nos clients."
                : 'A clear and efficient organizational structure to ensure service excellence and client satisfaction.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {governance.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <i className={`${member.icon} text-white text-3xl`}></i>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">{member.role[lang]}</h3>
                <p className="text-sm font-semibold text-gray-700 mb-4">{member.name}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.responsibilities[lang]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comité consultatif */}
        <div>
          <div className="text-left mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-50 border border-gold-200 mb-6">
              <i className="ri-group-line text-gold-600 text-sm"></i>
              <span className="text-sm font-semibold text-gold-700 uppercase tracking-wider">
                {lang === 'fr' ? 'Comité Consultatif' : 'Advisory Board'}
              </span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
              {lang === 'fr' ? 'Comité Consultatif Stratégique' : 'Strategic Advisory Board'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {lang === 'fr'
                ? "Des experts internationaux reconnus qui nous conseillent sur nos orientations stratégiques et nos méthodologies d'intervention."
                : 'Recognized international experts who advise us on our strategic directions and intervention methodologies.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advisoryBoard.map((advisor, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <i className="ri-user-line text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{advisor.name}</h3>
                    <p className="text-sm font-semibold text-gold-600 mb-2">{advisor.title[lang]}</p>
                    <p className="text-xs text-gray-500 mb-3">{advisor.affiliation[lang]}</p>
                    <div className="flex flex-wrap gap-2">
                      {advisor.expertise[lang].split(', ').map((skill, i) => (
                        <span key={i} className="px-2 py-1 rounded-full text-xs font-medium bg-strategic-50 text-strategic-700 border border-strategic-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}




