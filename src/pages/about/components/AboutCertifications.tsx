import { useTranslation } from 'react-i18next';

const certifications = [
  {
    name: {
      fr: 'Audit Financier & Contrôle Interne',
      en: 'Financial Audit & Internal Control',
    },
    issuer: {
      fr: 'Expertise terrain — 22+ ans de pratique',
      en: 'Field expertise — 22+ years of practice',
    },
    icon: 'ri-file-chart-line',
    color: 'from-teal-500 to-teal-600',
  },
  {
    name: {
      fr: 'Conformité BCEAO / BEAC / COBAC',
      en: 'BCEAO / BEAC / COBAC Compliance',
    },
    issuer: {
      fr: 'Cadre réglementaire UEMOA & CEMAC',
      en: 'UEMOA & CEMAC regulatory framework',
    },
    icon: 'ri-shield-check-line',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    name: {
      fr: 'Gestion des Risques (ERM)',
      en: 'Enterprise Risk Management (ERM)',
    },
    issuer: {
      fr: 'Approche COSO — Institutions financières',
      en: 'COSO approach — Financial institutions',
    },
    icon: 'ri-line-chart-line',
    color: 'from-amber-500 to-amber-600',
  },
  {
    name: {
      fr: 'MBA en Gestion des Entreprises',
      en: 'MBA in Business Management',
    },
    issuer: {
      fr: 'Université Laval, Canada — 2018',
      en: 'Université Laval, Canada — 2018',
    },
    icon: 'ri-graduation-cap-line',
    color: 'from-brand-700 to-brand-900',
  },
];

export function AboutCertifications() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-50 border border-gold-200 mb-4">
            <i className="ri-medal-line text-gold-600 text-sm"></i>
            <span className="text-sm font-semibold text-gold-700 uppercase tracking-wider">
              {lang === 'fr' ? 'Compétences clés' : 'Core Competencies'}
            </span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {lang === 'fr' ? 'Expertises & Formations' : 'Expertise & Training'}
          </h2>
          <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {lang === 'fr'
              ? 'Des compétences forgées sur le terrain, renforcées par une formation académique de haut niveau.'
              : 'Skills forged in the field, strengthened by high-level academic training.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                <i className={`${cert.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug line-clamp-2" title={cert.name[lang]}>
                {cert.name[lang]}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {cert.issuer[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
