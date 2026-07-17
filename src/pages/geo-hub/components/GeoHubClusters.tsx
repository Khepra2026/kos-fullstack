import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Cluster {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  guides: {
    slug: string;
    titleFr: string;
    titleEn: string;
    icon: string;
    highlight: string;
    highlightEn: string;
  }[];
  stats: { labelFr: string; labelEn: string; value: string };
}

const CLUSTERS: Cluster[] = [
  {
    id: 'compliance',
    titleFr: 'Conformité & Réglementation',
    titleEn: 'Compliance & Regulation',
    descriptionFr: 'Guides stratégiques pour anticiper les exigences de la BCEAO, du COBAC et des régulateurs africains.',
    descriptionEn: 'Strategic guides to anticipate BCEAO, COBAC and African regulators requirements.',
    color: 'primary',
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-700',
    borderColor: 'border-primary-200',
    guides: [
      {
        slug: 'mise-en-conformite-bceao',
        titleFr: 'Mise en conformité BCEAO',
        titleEn: 'BCEAO Compliance',
        icon: 'ri-shield-check-line',
        highlight: 'Ratios + LBC/FT',
        highlightEn: 'Ratios + AML/CFT',
      },
      {
        slug: 'agrement-sfd-bceao-cobac',
        titleFr: 'Agrément SFD/EMF',
        titleEn: 'SFD/EMF Licensing',
        icon: 'ri-bank-card-line',
        highlight: 'Dossier complet',
        highlightEn: 'Complete file',
      },
      {
        slug: 'preparer-mission-bceao',
        titleFr: 'Mission d\'inspection',
        titleEn: 'Inspection Mission',
        icon: 'ri-user-search-line',
        highlight: '7 domaines clés',
        highlightEn: '7 key areas',
      },
    ],
    stats: { labelFr: '3 guides', labelEn: '3 guides', value: '100% couverture BCEAO' },
  },
  {
    id: 'investment',
    titleFr: 'Investment & Finance',
    titleEn: 'Investment & Finance',
    descriptionFr: 'De la due diligence à la levée de fonds, les guides pour sécuriser les transactions et convaincre les investisseurs.',
    descriptionEn: 'From due diligence to fundraising, guides to secure transactions and convince investors.',
    color: 'accent',
    bgColor: 'bg-accent-50',
    textColor: 'text-accent-700',
    borderColor: 'border-accent-200',
    guides: [
      {
        slug: 'reussir-due-diligence-afrique',
        titleFr: 'Due diligence en Afrique',
        titleEn: 'Due Diligence Africa',
        icon: 'ri-search-eye-line',
        highlight: '120 points',
        highlightEn: '120 points',
      },
      {
        slug: 'preparer-levee-fonds-afrique',
        titleFr: 'Levée de fonds',
        titleEn: 'Fundraising',
        icon: 'ri-line-chart-line',
        highlight: 'Investment readiness',
        highlightEn: 'Investment readiness',
      },
    ],
    stats: { labelFr: '2 guides', labelEn: '2 guides', value: 'Due diligence → Levée' },
  },
  {
    id: 'governance',
    titleFr: 'Gouvernance & Risques',
    titleEn: 'Governance & Risks',
    descriptionFr: 'Renforcer les structures de gouvernance, cartographier les risques et implémenter les standards ESG en Afrique.',
    descriptionEn: 'Strengthen governance structures, map risks and implement ESG standards in Africa.',
    color: 'secondary',
    bgColor: 'bg-secondary-50',
    textColor: 'text-secondary-700',
    borderColor: 'border-secondary-200',
    guides: [
      {
        slug: 'renforcer-gouvernance-entreprise',
        titleFr: 'Gouvernance d\'entreprise',
        titleEn: 'Corporate Governance',
        icon: 'ri-organization-chart',
        highlight: 'OCDE + IFC',
        highlightEn: 'OECD + IFC',
      },
      {
        slug: 'cartographie-risques-entreprise',
        titleFr: 'Cartographie des risques',
        titleEn: 'Risk Mapping',
        icon: 'ri-radar-line',
        highlight: 'COSO + ISO 31000',
        highlightEn: 'COSO + ISO 31000',
      },
      {
        slug: 'mise-en-oeuvre-esg-afrique',
        titleFr: 'Dispositif ESG',
        titleEn: 'ESG Framework',
        icon: 'ri-earth-line',
        highlight: 'IFC PS 1-8',
        highlightEn: 'IFC PS 1-8',
      },
    ],
    stats: { labelFr: '3 guides', labelEn: '3 guides', value: 'COSO → ESG → Gouvernance' },
  },
];

export function GeoHubClusters() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section className="py-12 md:py-16 bg-white" aria-label={isEn ? 'Thematic clusters' : 'Clusters thématiques'}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground-950 mb-4"
          >
            {isEn ? (
              <>Guides by <span className="text-primary-600">Thematic Area</span></>
            ) : (
              <>Guides par <span className="text-primary-600">domaine thématique</span></>
            )}
          </h2>
          <p
            className="text-foreground-600 max-w-2xl mx-auto"
          >
            {isEn
              ? 'Each cluster covers a strategic domain. Navigate between them to build a comprehensive understanding of African governance and compliance.'
              : 'Chaque cluster couvre un domaine stratégique. Naviguez entre eux pour construire une compréhension globale de la gouvernance et de la conformité africaine.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {CLUSTERS.map((cluster, idx) => (
            <div
              key={cluster.id}
              className={`rounded-lg border ${cluster.borderColor} overflow-hidden`}
            >
              {/* Cluster Header */}
              <div className={`${cluster.bgColor} p-5 md:p-6`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-lg font-bold ${cluster.textColor} line-clamp-2`} title={isEn ? cluster.titleEn : cluster.titleFr}>
                    {isEn ? cluster.titleEn : cluster.titleFr}
                  </h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white ${cluster.textColor}`}>
                    {isEn ? cluster.stats.labelEn : cluster.stats.labelFr}
                  </span>
                </div>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  {isEn ? cluster.descriptionEn : cluster.descriptionFr}
                </p>
              </div>

              {/* Guides List */}
              <div className="p-4 md:p-5 space-y-3">
                {cluster.guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    to={`/geo-hub/${guide.slug}`}
                    className="group flex items-start gap-3 p-3 rounded-md hover:bg-background-50 transition-all duration-200 cursor-pointer"
                  >
                    <div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg ${cluster.bgColor} ${cluster.textColor}`}>
                      <i className={`${guide.icon} text-sm`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground-950 group-hover:text-primary-700 transition-colors line-clamp-2" title={isEn ? guide.titleEn : guide.titleFr}>
                        {isEn ? guide.titleEn : guide.titleFr}
                      </h4>
                      <span className="text-xs text-foreground-500 mt-0.5 block">
                        {isEn ? guide.highlightEn : guide.highlight}
                      </span>
                    </div>
                    <i className="ri-arrow-right-line text-foreground-300 group-hover:text-primary-600 transition-colors mt-1" />
                  </Link>
                ))}
              </div>

              {/* Cluster Footer */}
              <div className="px-5 pb-5 pt-2">
                <div className={`flex items-center gap-2 text-xs font-medium ${cluster.textColor} px-3 py-2 rounded-full ${cluster.bgColor}`}>
                  <i className="ri-route-line" />
                  {cluster.stats.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}