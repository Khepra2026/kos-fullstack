import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const sectors = [
  {
    id: 'banks',
    icon: 'ri-bank-line',
    color: 'from-amber-500 to-amber-600',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    clients: [
      { name: 'Banques commerciales', detail: 'Réseaux bancaires régionaux & filiales internationales' },
      { name: 'Banques de développement', detail: 'BOAD, BAD, institutions bilatérales' },
      { name: 'Banques centrales & régulateurs', detail: 'BCEAO, BEAC & autorités de supervision' },
      { name: 'Sociétés de bourse & assurances', detail: 'Marchés financiers régionaux' },
    ],
  },
  {
    id: 'microfinance',
    icon: 'ri-community-line',
    color: 'from-emerald-500 to-emerald-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    clients: [
      { name: 'Institutions de microfinance (SFD)', detail: 'Systèmes financiers décentralisés UEMOA/CEMAC' },
      { name: 'Coopératives d\'épargne-crédit', detail: 'Mutuelles, caisses villageoises' },
      { name: 'Réseaux de microfinance', detail: 'Fédérations & unions de SFD' },
      { name: 'FinTech & mobile money', detail: 'Paiements digitaux & crédit algorithmique' },
    ],
  },
  {
    id: 'sme',
    icon: 'ri-store-2-line',
    color: 'from-orange-500 to-orange-600',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    clients: [
      { name: 'PME en croissance', detail: 'Structuration financière & scaling opérationnel' },
      { name: 'Startups innovantes', detail: 'Incubation, modèle économique & levée de fonds' },
      { name: 'Entreprises familiales', detail: 'Gouvernance & transmission patrimoniale' },
      { name: 'Groupes industriels', detail: 'Agroalimentaire, BTP, énergie & services' },
    ],
  },
  {
    id: 'public',
    icon: 'ri-government-line',
    color: 'from-teal-500 to-teal-600',
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-700',
    clients: [
      { name: 'ONG & fondations', detail: 'ONG internationales, fondations philanthropiques' },
      { name: 'Institutions du secteur public', detail: 'Ministères, agences d\'État & collectivités' },
      { name: 'Organisations régionales', detail: 'OHADA, UEMOA, CEMAC, Union Africaine' },
      { name: 'Bailleurs & partenaires techniques', detail: 'PNUD, Banque Mondiale, GIZ, AFD' },
    ],
  },
];

const testimonials = [
  {
    quote: 'KHEPRA EXPERTS nous a accompagnés dans la refonte complète de notre gouvernance. Leur expertise du contexte africain a été déterminante.',
    author: 'Directeur Général',
    org: 'Banque régionale',
    sector: 'banks',
  },
  {
    quote: 'Grâce à leur appui, nous avons structuré notre modèle économique et levé des fonds auprès d\'investisseurs internationaux en moins de 6 mois.',
    author: 'CEO & Co-fondateur',
    org: 'FinTech',
    sector: 'financial',
  },
  {
    quote: 'Un cabinet qui comprend vraiment les enjeux des ONG en Afrique. Leur approche collaborative et leur rigueur méthodologique font la différence.',
    author: 'Directrice des Programmes',
    org: 'ONG internationale',
    sector: 'ngo',
  },
];

export function ServicesClients() {
  const { i18n } = useTranslation();
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const sectorLabels: Record<string, { fr: string; en: string }> = {
    banks: { fr: 'Banques commerciales & Institutions financières', en: 'Commercial Banks & Financial Institutions' },
    microfinance: { fr: 'Microfinance & FinTech', en: 'Microfinance & FinTech' },
    sme: { fr: 'PME & Startups', en: 'SMEs & Startups' },
    public: { fr: 'ONG & Secteur public', en: 'NGOs & Public Sector' },
  };

  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';

  const filteredSectors = activeSector
    ? sectors.filter((s) => s.id === activeSector)
    : sectors;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-6">
            <i className="ri-building-4-line text-amber-600 text-sm"></i>
            <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">
              {lang === 'fr' ? 'Nos clients & secteurs' : 'Our Clients & Sectors'}
            </span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            {lang === 'fr' ? 'Qui nous accompagnons' : 'Who We Support'}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {lang === 'fr'
              ? 'Nous intervenons auprès d\'organisations de toutes tailles et de tous secteurs en Afrique de l\'Ouest et Centrale.'
              : 'We work with organizations of all sizes and sectors across West and Central Africa.'}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveSector(null)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap border ${
              activeSector === null
                ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            {lang === 'fr' ? 'Tous les secteurs' : 'All Sectors'}
          </button>
          {sectors.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSector(s.id === activeSector ? null : s.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap border ${
                activeSector === s.id
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {sectorLabels[s.id][lang]}
            </button>
          ))}
        </div>

        {/* Sector cards */}
        <div className={`grid gap-6 mb-20 ${filteredSectors.length === 1 ? 'grid-cols-1 max-w-xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
          {filteredSectors.map((sector) => (
            <div
              key={sector.id}
              className={`rounded-2xl border ${sector.borderColor} ${sector.bgLight} p-6 hover:shadow-lg transition-all duration-300 group gradient-border glow-gold-hover`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${sector.color} mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                <i className={`${sector.icon} text-white text-xl`}></i>
              </div>

              {/* Title */}
              <h3 className={`font-semibold text-base ${sector.textColor} mb-4`}>
                {sectorLabels[sector.id][lang]}
              </h3>

              {/* Client list */}
              <ul className="space-y-3">
                {sector.clients.map((client, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0">
                      <i className="ri-checkbox-circle-fill text-gray-400 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 leading-tight">{client.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{client.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
            {lang === 'fr' ? 'Ce que disent nos clients' : 'What Our Clients Say'}
          </span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-7 gradient-border glow-gold-hover"
            >
              <div className="w-8 h-8 flex items-center justify-center mb-4">
                <i className="ri-double-quotes-l text-3xl text-amber-400"></i>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 italic mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 shrink-0">
                  <i className="ri-user-line text-gray-500 text-base"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.author}</p>
                  <p className="text-xs text-gray-400">{t.org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats bar */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '50+', label: lang === 'fr' ? 'Clients accompagnés' : 'Clients Supported', icon: 'ri-team-line' },
            { value: '4', label: lang === 'fr' ? 'Domaines d\'expertise' : 'Areas of Expertise', icon: 'ri-pie-chart-line' },
            { value: '20+', label: lang === 'fr' ? 'Pays d\'intervention' : 'Countries', icon: 'ri-map-pin-line' },
            { value: '100%', label: lang === 'fr' ? 'Satisfaction client' : 'Client Satisfaction', icon: 'ri-star-line' },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500/20">
                <i className={`${stat.icon} text-amber-400 text-lg`}></i>
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}




