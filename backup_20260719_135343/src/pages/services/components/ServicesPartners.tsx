import { useTranslation } from 'react-i18next';

const partners = [
  {
    name: 'Meba K. Consulting',
    url: 'https://mebakconsulting.com/public/about',
    tagline: {
      fr: 'Research-driven advisory · Finance digitale & FinTech',
      en: 'Research-driven advisory · Digital Finance & FinTech',
    },
    description: {
      fr: "Meba K. Consulting s'est imposé comme un cabinet de conseil de référence en finance digitale, stratégie de compétition des plateformes et gestion des risques liés aux banques, grandes entreprises technologiques et FinTechs. Passionné par les FinTechs, les banques et les grandes entreprises technologiques, leur mission est d'inspirer et d'accompagner les organisations à réaliser leur plein potentiel.",
      en: "Meba K. Consulting has established itself as a research-driven advisory on digital finance, platform competition strategy, and bank, big tech companies, and Fintech risks. Passionate about FinTech, banks, and big technology companies, their goal is to inspire and support others to realize their potential.",
    },
    expertise: {
      fr: ['Finance digitale', 'Stratégie FinTech', 'Risques Big Tech & Banques', 'Compétition des plateformes'],
      en: ['Digital Finance', 'FinTech Strategy', 'Big Tech & Bank Risks', 'Platform Competition'],
    },
    contact: null,
    icon: 'ri-bank-card-line',
    color: 'from-teal-500 to-teal-600',
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-700',
    badgeText: {
      fr: 'Partenaire de confiance pour les missions en consortium nécessitant une expertise pointue en finance digitale et FinTech.',
      en: 'Trusted partner for consortium assignments requiring deep expertise in digital finance and FinTech.',
    },
  },
  {
    name: 'ATINFOCOM GABON',
    url: null,
    tagline: {
      fr: 'Systèmes d\'information · Cybersécurité · Microfinance IT',
      en: 'Information Systems · Cybersecurity · Microfinance IT',
    },
    description: {
      fr: "Spécialisé en administration réseaux et systèmes, cybersécurité et déploiement de systèmes d'information financiers, ATINFOCOM GABON dispose d'une expertise reconnue dans l'implémentation des solutions Amplitude et Perfect pour les institutions de microfinance. Le cabinet maîtrise le déploiement de pare-feu Fortinet (FortiGate), la sécurisation des infrastructures IT et l'intégration d'API pour les services financiers numériques, facilitant l'interconnexion avec les plateformes fintech et mobile money.",
      en: "Specialized in network and systems administration, cybersecurity and financial information systems deployment, ATINFOCOM GABON has recognized expertise in implementing Amplitude and Perfect solutions for microfinance institutions. The firm masters Fortinet (FortiGate) firewall deployment, IT infrastructure security and API integration for digital financial services, facilitating interconnection with fintech and mobile money platforms.",
    },
    expertise: {
      fr: ['Administration réseaux & systèmes', 'Cybersécurité & FortiGate', 'Solutions Amplitude & Perfect', 'Intégration API fintech & mobile money'],
      en: ['Network & Systems Administration', 'Cybersecurity & FortiGate', 'Amplitude & Perfect Solutions', 'Fintech & Mobile Money API Integration'],
    },
    contact: {
      phone: '+241 04 75 25 71',
      email: null,
    },
    icon: 'ri-shield-keyhole-line',
    color: 'from-slate-600 to-slate-700',
    bgLight: 'bg-slate-50',
    borderColor: 'border-slate-200',
    textColor: 'text-slate-700',
    badgeText: {
      fr: 'Partenaire technique pour la sécurisation des infrastructures IT et le déploiement de systèmes d\'information dans les institutions de microfinance.',
      en: 'Technical partner for IT infrastructure security and information systems deployment in microfinance institutions.',
    },
  },
  {
    name: 'Cabinet Maître AUGE François Roland',
    url: null,
    tagline: {
      fr: 'Avocat en Droit des Affaires · Barreau de Libreville',
      en: 'Business Law Attorney · Libreville Bar',
    },
    description: {
      fr: "Maître AUGE François Roland est Avocat en Droit des Affaires inscrit au Barreau de Libreville. Son cabinet apporte une expertise juridique de premier plan pour accompagner les institutions financières, les entreprises et les organisations dans leurs opérations en Afrique centrale, notamment en matière de conformité réglementaire, de structuration contractuelle et de conseil juridique stratégique.",
      en: "Maître AUGE François Roland is a Business Law Attorney registered at the Libreville Bar. His firm provides top-tier legal expertise to accompany financial institutions, companies and organizations in their operations in Central Africa, particularly in regulatory compliance, contractual structuring and strategic legal counsel.",
    },
    expertise: {
      fr: ['Droit des affaires', 'Conformité réglementaire', 'Structuration contractuelle', 'Conseil juridique stratégique', 'Droit social'],
      en: ['Business Law', 'Regulatory Compliance', 'Contractual Structuring', 'Strategic Legal Counsel', 'Labour Law'],
    },
    contact: {
      phone: '+241 04 03 57 06',
      email: null,
    },
    icon: 'ri-scales-3-line',
    color: 'from-amber-600 to-amber-700',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    badgeText: {
      fr: 'Partenaire juridique pour les missions nécessitant une expertise en droit des affaires et conformité réglementaire en Afrique centrale.',
      en: 'Legal partner for assignments requiring expertise in business law and regulatory compliance in Central Africa.',
    },
  },
  {
    name: 'AWITAZI Tchagou Rodolphe',
    url: 'https://www.linkedin.com/in/awitazi-rodolphe-64309a131/',
    tagline: {
      fr: 'Expert ESG · Sauvegarde environnementale & sociale',
      en: 'ESG Expert · Environmental & Social Safeguards',
    },
    description: {
      fr: "Expert en sauvegarde environnementale et sociale sur le programme d'appui à la décentralisation, AWITAZI Tchagou Rodolphe est responsable de l'élaboration et de la mise en œuvre des EIES, des plans de restauration des moyens de subsistance, des mécanismes de gestion des plaintes, ainsi que de l'application des mesures HQSE sur les chantiers.",
      en: "Environmental and social safeguards expert on the decentralization support program, AWITAZI Tchagou Rodolphe is responsible for developing and implementing EIAs, livelihood restoration plans, grievance management mechanisms, and applying HQSE measures on construction sites.",
    },
    expertise: {
      fr: ['EIES & évaluations environnementales', 'Plans de restauration des moyens de subsistance', 'Mécanismes de gestion des plaintes', 'Mesures HQSE sur chantiers'],
      en: ['EIA & Environmental Assessments', 'Livelihood Restoration Plans', 'Grievance Management Mechanisms', 'HQSE Measures on Sites'],
    },
    contact: {
      phone: null,
      email: null,
      linkedin: 'https://www.linkedin.com/in/awitazi-rodolphe-64309a131/',
    },
    icon: 'ri-leaf-line',
    color: 'from-green-600 to-green-700',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    badgeText: {
      fr: 'Expert ESG mobilisé pour les missions nécessitant une expertise en sauvegarde environnementale, sociale et en conformité HQSE.',
      en: 'ESG expert mobilized for assignments requiring expertise in environmental and social safeguards and HQSE compliance.',
    },
  },
];

export function ServicesPartners() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';

  return (
    <section id="services-partners" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-6">
            <i className="ri-shake-hands-line text-amber-600 text-sm"></i>
            <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">
              {lang === 'fr' ? 'Cabinets Partenaires' : 'Partner Firms'}
            </span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            {lang === 'fr' ? 'Nos partenaires en consortium' : 'Our Consortium Partners'}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {lang === 'fr'
              ? "Pour les missions complexes et multidisciplinaires, nous mobilisons des cabinets partenaires spécialisés afin d'offrir à nos clients une expertise complémentaire et une couverture élargie."
              : 'For complex and multidisciplinary assignments, we mobilize specialized partner firms to offer our clients complementary expertise and broader coverage.'}
          </p>
        </div>

        {/* Partner cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-7">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border ${partner.borderColor} ${partner.bgLight} p-7 hover:shadow-xl transition-all duration-300 group flex flex-col gradient-border glow-gold-hover`}
            >
              {/* Top row */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${partner.color} shadow-md group-hover:scale-110 transition-transform shrink-0`}>
                  <i className={`${partner.icon} text-white text-xl`}></i>
                </div>
                <div className="min-w-0">
                  <h3 className="font-playfair text-lg font-bold text-gray-900 leading-tight">{partner.name}</h3>
                  <p className={`text-xs font-medium ${partner.textColor} mt-0.5 leading-snug`}>{partner.tagline[lang]}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-5 text-sm flex-1">
                {partner.description[lang]}
              </p>

              {/* Expertise tags */}
              <div className="mb-5">
                <p className={`text-xs font-semibold uppercase tracking-wider ${partner.textColor} mb-3`}>
                  {lang === 'fr' ? "Domaines d'expertise" : 'Areas of Expertise'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {partner.expertise[lang].map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${partner.borderColor} ${partner.textColor} bg-white`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              {partner.contact && (
                <div className={`mb-5 p-3 rounded-xl bg-white border ${partner.borderColor}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${partner.textColor} mb-2`}>
                    {lang === 'fr' ? 'Contact' : 'Contact'}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {partner.contact.phone && (
                      <a
                        href={`tel:${partner.contact.phone.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                      >
                        <i className={`ri-phone-line ${partner.textColor} text-sm`}></i>
                        {partner.contact.phone}
                      </a>
                    )}
                    <a
                      href={`mailto:${partner.contact.email}`}
                      className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors cursor-pointer break-all"
                    >
                      <i className={`ri-mail-line ${partner.textColor} text-sm`}></i>
                      {partner.contact.email}
                    </a>
                    {partner.contact.linkedin && (
                      <a
                        href={partner.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                      >
                        <i className={`ri-linkedin-line ${partner.textColor} text-sm`}></i>
                        Profil LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Visit site button (only if URL exists and no linkedin in contact) */}
              {partner.url && !partner.contact?.linkedin && (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r ${partner.color} text-white text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer shadow-sm mb-5`}
                  aria-label={`Visiter le site de ${partner.name}`}
                >
                  {lang === 'fr' ? 'Visiter le site' : 'Visit website'}
                  <i className="ri-external-link-line text-sm"></i>
                </a>
              )}

              {/* Consortium badge */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-amber-100 shrink-0">
                  <i className="ri-award-line text-amber-600 text-sm"></i>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {partner.badgeText[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-sm text-gray-400">
            {lang === 'fr'
              ? 'Vous êtes un cabinet conseil et souhaitez collaborer avec nous ?'
              : 'Are you a consulting firm and wish to collaborate with us?'}
          </p>
          <a
            href="#contact-services"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
          >
            {lang === 'fr' ? 'Contactez-nous pour un partenariat' : 'Contact us for a partnership'}
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>

      </div>
    </section>
  );
}




