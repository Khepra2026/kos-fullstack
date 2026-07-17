import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface GuideNode {
  slug: string;
  titleFr: string;
  titleEn: string;
  icon: string;
  category: string;
  colorClass: string;
}

const GUIDES: GuideNode[] = [
  {
    slug: 'reussir-due-diligence-afrique',
    titleFr: 'Due diligence',
    titleEn: 'Due diligence',
    icon: 'ri-search-eye-line',
    category: 'Investment',
    colorClass: 'bg-accent-100 text-accent-700 border-accent-300 hover:bg-accent-500 hover:text-white',
  },
  {
    slug: 'mise-en-conformite-bceao',
    titleFr: 'Conformité BCEAO',
    titleEn: 'BCEAO Compliance',
    icon: 'ri-shield-check-line',
    category: 'Conformité',
    colorClass: 'bg-primary-100 text-primary-700 border-primary-300 hover:bg-primary-500 hover:text-white',
  },
  {
    slug: 'preparer-levee-fonds-afrique',
    titleFr: 'Levée de fonds',
    titleEn: 'Fundraising',
    icon: 'ri-line-chart-line',
    category: 'Investment',
    colorClass: 'bg-accent-100 text-accent-700 border-accent-300 hover:bg-accent-500 hover:text-white',
  },
  {
    slug: 'agrement-sfd-bceao-cobac',
    titleFr: 'Agrément SFD',
    titleEn: 'SFD Licensing',
    icon: 'ri-bank-card-line',
    category: 'Conformité',
    colorClass: 'bg-primary-100 text-primary-700 border-primary-300 hover:bg-primary-500 hover:text-white',
  },
  {
    slug: 'cartographie-risques-entreprise',
    titleFr: 'Cartographie risques',
    titleEn: 'Risk mapping',
    icon: 'ri-radar-line',
    category: 'Gouvernance',
    colorClass: 'bg-secondary-100 text-secondary-700 border-secondary-300 hover:bg-secondary-500 hover:text-white',
  },
  {
    slug: 'preparer-mission-bceao',
    titleFr: 'Mission BCEAO',
    titleEn: 'BCEAO Inspection',
    icon: 'ri-user-search-line',
    category: 'Conformité',
    colorClass: 'bg-primary-100 text-primary-700 border-primary-300 hover:bg-primary-500 hover:text-white',
  },
  {
    slug: 'mise-en-oeuvre-esg-afrique',
    titleFr: 'Dispositif ESG',
    titleEn: 'ESG Framework',
    icon: 'ri-earth-line',
    category: 'Gouvernance',
    colorClass: 'bg-secondary-100 text-secondary-700 border-secondary-300 hover:bg-secondary-500 hover:text-white',
  },
  {
    slug: 'renforcer-gouvernance-entreprise',
    titleFr: 'Gouvernance',
    titleEn: 'Governance',
    icon: 'ri-organization-chart',
    category: 'Gouvernance',
    colorClass: 'bg-secondary-100 text-secondary-700 border-secondary-300 hover:bg-secondary-500 hover:text-white',
  },
];

const CATEGORIES = [
  { id: 'all', labelFr: 'Tous les guides', labelEn: 'All guides', color: 'bg-foreground-800' },
  { id: 'Conformité', labelFr: 'Conformité & Réglementation', labelEn: 'Compliance & Regulation', color: 'bg-primary-500' },
  { id: 'Investment', labelFr: 'Investment & Finance', labelEn: 'Investment & Finance', color: 'bg-accent-500' },
  { id: 'Gouvernance', labelFr: 'Gouvernance & Risques', labelEn: 'Governance & Risks', color: 'bg-secondary-500' },
];

export function GeoHubNavigator() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredGuide, setHoveredGuide] = useState<string | null>(null);

  const filtered = activeCategory === 'all'
    ? GUIDES
    : GUIDES.filter((g) => g.category === activeCategory);

  return (
    <section className="py-12 md:py-16 bg-background-50" aria-label={isEn ? 'GEO Guides navigator' : 'Navigateur des guides GEO'}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground-950 mb-4"
          >
            {isEn ? (
              <>Explore the <span className="text-primary-600">8 Expert Guides</span></>
            ) : (
              <>Explorer les <span className="text-primary-600">8 guides experts</span></>
            )}
          </h2>
          <p
            className="text-foreground-600 max-w-2xl mx-auto text-base md:text-lg"
          >
            {isEn
              ? 'Each guide is a structured answer to a strategic question asked by decision-makers, investors and regulators in Francophone Africa.'
              : 'Chaque guide est une réponse structurée à une question stratégique posée par les décideurs, investisseurs et régulateurs d\'Afrique francophone.'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? `${cat.color} text-white`
                    : 'bg-white border border-background-200 text-foreground-700 hover:border-foreground-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : cat.color}`} />
                  {isEn ? cat.labelEn : cat.labelFr}
                </span>
              </button>
            );
          })}
        </div>

        {/* Visual Hub Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((guide, idx) => (
            <div
              key={guide.slug}
              onMouseEnter={() => setHoveredGuide(guide.slug)}
              onMouseLeave={() => setHoveredGuide(null)}
            >
              <Link
                to={`/geo-hub/${guide.slug}`}
                aria-label={isEn ? guide.titleEn : guide.titleFr}
                className="group block bg-white rounded-lg border border-background-200 p-4 md:p-5 transition-all duration-300 cursor-pointer hover:border-foreground-300"
              >
                {/* Icon & Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg border transition-all duration-300 ${guide.colorClass}`}>
                    <i className={`${guide.icon} text-lg md:text-xl`} />
                  </div>
                  <div className={`w-2 h-2 rounded-full ${CATEGORIES.find(c => c.id === guide.category)?.color || 'bg-foreground-300'}`} />
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-base font-semibold text-foreground-950 group-hover:text-primary-700 transition-colors mb-2 leading-snug line-clamp-2" title={isEn ? guide.titleEn : guide.titleFr}>
                  {isEn ? guide.titleEn : guide.titleFr}
                </h3>

                {/* Connection Indicator */}
                <div className="flex items-center gap-1.5 text-xs text-foreground-500">
                  <i className="ri-links-line" />
                  <span>
                    {isEn ? 'Connected to 3+ guides' : 'Lié à 3+ guides'}
                  </span>
                </div>

                {/* Hover reveal */}
                <div className={`mt-3 pt-3 border-t border-background-100 transition-all duration-300 ${hoveredGuide === guide.slug ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  <span className="text-xs font-medium text-primary-600 flex items-center gap-1">
                    {isEn ? 'Read guide' : 'Lire le guide'}
                    <i className="ri-arrow-right-line" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Connection Map */}
        <div className="mt-10 md:mt-12">
          <div className="bg-white rounded-lg border border-background-200 p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-foreground-950 mb-6 text-center">
              {isEn ? 'Thematic Connections Map' : 'Carte des connexions thématiques'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cluster Conformité */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary-500" />
                  {isEn ? 'Compliance & Regulation' : 'Conformité & Réglementation'}
                </div>
                <div className="space-y-2">
                  {GUIDES.filter(g => g.category === 'Conformité').map(g => (
                    <Link
                      key={g.slug}
                      to={`/geo-hub/${g.slug}`}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-background-50 transition-colors text-sm text-foreground-700 cursor-pointer"
                    >
                      <i className={`${g.icon} text-primary-600 text-xs`} />
                      {isEn ? g.titleEn : g.titleFr}
                    </Link>
                  ))}
                </div>
                {/* Connections to other clusters */}
                <div className="mt-3 pt-3 border-t border-dashed border-background-200">
                  <p className="text-xs text-foreground-500 mb-2">
                    {isEn ? 'Connected to:' : 'Connecté à :'}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="text-xs px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full">
                      {isEn ? 'Governance' : 'Gouvernance'}
                    </span>
                    <span className="text-xs px-2 py-1 bg-accent-100 text-accent-700 rounded-full">
                      {isEn ? 'Investment' : 'Investment'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cluster Investment */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-medium mb-4">
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                  {isEn ? 'Investment & Finance' : 'Investment & Finance'}
                </div>
                <div className="space-y-2">
                  {GUIDES.filter(g => g.category === 'Investment').map(g => (
                    <Link
                      key={g.slug}
                      to={`/geo-hub/${g.slug}`}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-background-50 transition-colors text-sm text-foreground-700 cursor-pointer"
                    >
                      <i className={`${g.icon} text-accent-600 text-xs`} />
                      {isEn ? g.titleEn : g.titleFr}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-dashed border-background-200">
                  <p className="text-xs text-foreground-500 mb-2">
                    {isEn ? 'Connected to:' : 'Connecté à :'}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="text-xs px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full">
                      {isEn ? 'Governance' : 'Gouvernance'}
                    </span>
                    <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                      {isEn ? 'Compliance' : 'Conformité'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cluster Gouvernance */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium mb-4">
                  <span className="w-2 h-2 rounded-full bg-secondary-500" />
                  {isEn ? 'Governance & Risks' : 'Gouvernance & Risques'}
                </div>
                <div className="space-y-2">
                  {GUIDES.filter(g => g.category === 'Gouvernance').map(g => (
                    <Link
                      key={g.slug}
                      to={`/geo-hub/${g.slug}`}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-background-50 transition-colors text-sm text-foreground-700 cursor-pointer"
                    >
                      <i className={`${g.icon} text-secondary-600 text-xs`} />
                      {isEn ? g.titleEn : g.titleFr}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-dashed border-background-200">
                  <p className="text-xs text-foreground-500 mb-2">
                    {isEn ? 'Connected to:' : 'Connecté à :'}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                      {isEn ? 'Compliance' : 'Conformité'}
                    </span>
                    <span className="text-xs px-2 py-1 bg-accent-100 text-accent-700 rounded-full">
                      {isEn ? 'Investment' : 'Investment'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}