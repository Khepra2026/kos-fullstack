import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PathStep {
  slug: string;
  titleFr: string;
  titleEn: string;
  icon: string;
  durationFr: string;
  durationEn: string;
  outcomeFr: string;
  outcomeEn: string;
}

interface LearningPath {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  audienceFr: string;
  audienceEn: string;
  color: string;
  bgColor: string;
  textColor: string;
  steps: PathStep[];
}

const PATHS: LearningPath[] = [
  {
    id: 'compliance-journey',
    titleFr: 'Parcours Conformité BCEAO',
    titleEn: 'BCEAO Compliance Journey',
    descriptionFr: 'De la mise en conformité à la préparation d\'inspection, le parcours complet pour les institutions financières UEMOA.',
    descriptionEn: 'From compliance to inspection preparation, the complete journey for WAEMU financial institutions.',
    audienceFr: 'Dirigeants d\'IMF, SFD, banques',
    audienceEn: 'IMF, SFD, bank executives',
    color: 'primary',
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-700',
    steps: [
      {
        slug: 'mise-en-conformite-bceao',
        titleFr: 'Mettre en conformité',
        titleEn: 'Achieve compliance',
        icon: 'ri-shield-check-line',
        durationFr: 'Étape 1 — Fondation',
        durationEn: 'Step 1 — Foundation',
        outcomeFr: 'Ratios prudentiels alignés',
        outcomeEn: 'Prudential ratios aligned',
      },
      {
        slug: 'agrement-sfd-bceao-cobac',
        titleFr: 'Obtenir l\'agrément',
        titleEn: 'Obtain licensing',
        icon: 'ri-bank-card-line',
        durationFr: 'Étape 2 — Formalisation',
        durationEn: 'Step 2 — Formalization',
        outcomeFr: 'Dossier réglementaire validé',
        outcomeEn: 'Regulatory file validated',
      },
      {
        slug: 'preparer-mission-bceao',
        titleFr: 'Passer l\'inspection',
        titleEn: 'Pass inspection',
        icon: 'ri-user-search-line',
        durationFr: 'Étape 3 — Validation',
        durationEn: 'Step 3 — Validation',
        outcomeFr: 'Mission BCEAO réussie',
        outcomeEn: 'BCEAO mission passed',
      },
    ],
  },
  {
    id: 'investor-journey',
    titleFr: 'Parcours Investisseur',
    titleEn: 'Investor Journey',
    descriptionFr: 'De la due diligence à la levée de fonds, le parcours pour sécuriser les transactions et convaincre les investisseurs.',
    descriptionEn: 'From due diligence to fundraising, the journey to secure transactions and convince investors.',
    audienceFr: 'Entrepreneurs, dirigeants, fonds',
    audienceEn: 'Entrepreneurs, executives, funds',
    color: 'accent',
    bgColor: 'bg-accent-50',
    textColor: 'text-accent-700',
    steps: [
      {
        slug: 'reussir-due-diligence-afrique',
        titleFr: 'Auditer la cible',
        titleEn: 'Audit the target',
        icon: 'ri-search-eye-line',
        durationFr: 'Étape 1 — Investigation',
        durationEn: 'Step 1 — Investigation',
        outcomeFr: 'Risques identifiés et couverts',
        outcomeEn: 'Risks identified and covered',
      },
      {
        slug: 'preparer-levee-fonds-afrique',
        titleFr: 'Structurer la levée',
        titleEn: 'Structure fundraising',
        icon: 'ri-line-chart-line',
        durationFr: 'Étape 2 — Levée',
        durationEn: 'Step 2 — Fundraising',
        outcomeFr: 'Data room et pitch prêts',
        outcomeEn: 'Data room and pitch ready',
      },
    ],
  },
  {
    id: 'governance-journey',
    titleFr: 'Parcours Gouvernance',
    titleEn: 'Governance Journey',
    descriptionFr: 'De la cartographie des risques à la gouvernance d\'entreprise, le parcours pour structurer une organisation résiliente.',
    descriptionEn: 'From risk mapping to corporate governance, the journey to build a resilient organization.',
    audienceFr: 'CA, directions, compliance officers',
    audienceEn: 'Boards, management, compliance officers',
    color: 'secondary',
    bgColor: 'bg-secondary-50',
    textColor: 'text-secondary-700',
    steps: [
      {
        slug: 'cartographie-risques-entreprise',
        titleFr: 'Cartographier les risques',
        titleEn: 'Map risks',
        icon: 'ri-radar-line',
        durationFr: 'Étape 1 — Diagnostic',
        durationEn: 'Step 1 — Diagnosis',
        outcomeFr: 'Matrice de risques validée',
        outcomeEn: 'Risk matrix validated',
      },
      {
        slug: 'mise-en-oeuvre-esg-afrique',
        titleFr: 'Implémenter ESG',
        titleEn: 'Implement ESG',
        icon: 'ri-earth-line',
        durationFr: 'Étape 2 — Standards',
        durationEn: 'Step 2 — Standards',
        outcomeFr: 'Score ESG et reporting',
        outcomeEn: 'ESG score and reporting',
      },
      {
        slug: 'renforcer-gouvernance-entreprise',
        titleFr: 'Renforcer la gouvernance',
        titleEn: 'Strengthen governance',
        icon: 'ri-organization-chart',
        durationFr: 'Étape 3 — Structure',
        durationEn: 'Step 3 — Structure',
        outcomeFr: 'Conseil et comités opérationnels',
        outcomeEn: 'Board and committees operational',
      },
    ],
  },
];

export function GeoHubPath() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section className="py-12 md:py-16 bg-background-50" aria-label={isEn ? 'Suggested learning paths' : 'Parcours de lecture suggérés'}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground-950 mb-4"
          >
            {isEn ? (
              <>Suggested <span className="text-primary-600">Learning Paths</span></>
            ) : (
              <>Parcours de <span className="text-primary-600">lecture suggérés</span></>
            )}
          </h2>
          <p
            className="text-foreground-600 max-w-2xl mx-auto"
          >
            {isEn
              ? 'Follow a structured path through interconnected guides to master a complete strategic domain.'
              : 'Suivez un chemin structuré à travers les guides interconnectés pour maîtriser un domaine stratégique complet.'}
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {PATHS.map((path, pathIdx) => (
            <div
              key={path.id}
              className="bg-white rounded-lg border border-background-200 overflow-hidden"
            >
              {/* Path Header */}
              <div className={`${path.bgColor} px-5 md:px-6 py-4 md:py-5 border-b ${path.borderColor || 'border-background-200'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className={`text-lg font-bold ${path.textColor} mb-1 line-clamp-2`} title={isEn ? path.titleEn : path.titleFr}>
                      {isEn ? path.titleEn : path.titleFr}
                    </h3>
                    <p className="text-sm text-foreground-600">
                      {isEn ? path.descriptionEn : path.descriptionFr}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-xs font-medium text-foreground-700 whitespace-nowrap">
                    <i className="ri-user-line" />
                    {isEn ? path.audienceEn : path.audienceFr}
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="p-5 md:p-6">
                <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-4">
                  {path.steps.map((step, stepIdx) => (
                    <div key={step.slug} className="flex items-center gap-3 md:gap-4 flex-1">
                      {/* Step Card */}
                      <Link
                        to={`/geo-hub/${step.slug}`}
                        className="group flex-1 flex items-start gap-3 p-4 rounded-lg border border-background-200 hover:border-foreground-300 hover:bg-background-50 transition-all duration-200 cursor-pointer"
                      >
                        <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg ${path.bgColor} ${path.textColor}`}>
                          <i className={`${step.icon} text-base`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-medium text-foreground-500 block mb-1">
                            {isEn ? step.durationEn : step.durationFr}
                          </span>
                          <h4 className="text-sm font-semibold text-foreground-950 group-hover:text-primary-700 transition-colors line-clamp-2" title={isEn ? step.titleEn : step.titleFr}>
                            {isEn ? step.titleEn : step.titleFr}
                          </h4>
                          <span className="text-xs text-foreground-500 mt-1 block">
                            {isEn ? step.outcomeEn : step.outcomeFr}
                          </span>
                        </div>
                      </Link>

                      {/* Arrow between steps */}
                      {stepIdx < path.steps.length - 1 && (
                        <div className="hidden md:flex items-center justify-center w-6 flex-shrink-0">
                          <i className={`ri-arrow-right-line text-lg ${path.textColor}`} />
                        </div>
                      )}

                      {/* Mobile arrow */}
                      {stepIdx < path.steps.length - 1 && (
                        <div className="flex md:hidden items-center justify-center py-1">
                          <i className={`ri-arrow-down-line text-lg ${path.textColor}`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



