import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ServiceNavItem {
  titleFr: string;
  titleEn: string;
  slug: string;
  icon: string;
  descFr: string;
  descEn: string;
}

const ALL_SERVICES: ServiceNavItem[] = [
  {
    titleFr: 'Conseil Stratégique & ESG Advisory',
    titleEn: 'Strategic & ESG Advisory',
    slug: 'conseil-strategique',
    icon: 'ri-leaf-line',
    descFr: 'Stratégie d’entreprise intégrée aux standards IFC, GRI, ISSB et BCEAO ESG',
    descEn: 'Corporate strategy integrated with IFC, GRI, ISSB and BCEAO ESG standards',
  },
  {
    titleFr: 'Gestion de Projets',
    titleEn: 'Project Management',
    slug: 'gestion-de-projets',
    icon: 'ri-task-line',
    descFr: 'Pilotage et coordination de projets complexes',
    descEn: 'Steering and coordination of complex projects',
  },
  {
    titleFr: 'Développement Organisationnel',
    titleEn: 'Organizational Development',
    slug: 'developpement-organisationnel',
    icon: 'ri-organization-chart',
    descFr: 'Optimisation des structures et processus',
    descEn: 'Optimization of structures and processes',
  },
  {
    titleFr: 'Renforcement des Capacités',
    titleEn: 'Capacity Building',
    slug: 'renforcement-capacites',
    icon: 'ri-team-line',
    descFr: 'Formation et développement des compétences',
    descEn: 'Training and skills development',
  },
  {
    titleFr: 'Diagnostic Organisationnel',
    titleEn: 'Organizational Diagnostic',
    slug: 'diagnostic-organisationnel',
    icon: 'ri-search-line',
    descFr: 'Évaluation complète de votre organisation',
    descEn: 'Complete assessment of your organization',
  },
  {
    titleFr: 'Audit Social',
    titleEn: 'Social Audit',
    slug: 'audit-social',
    icon: 'ri-shield-check-line',
    descFr: 'Conformité sociale et gestion des risques RH',
    descEn: 'Social compliance and HR risk management',
  },
  {
    titleFr: 'Ressources Humaines',
    titleEn: 'Human Resources',
    slug: 'ressources-humaines',
    icon: 'ri-user-heart-line',
    descFr: 'Structuration et optimisation de la fonction RH',
    descEn: 'Structuring and optimizing the HR function',
  },
  {
    titleFr: 'Gouvernance, Risques & Conformité',
    titleEn: 'Governance, Risk & Compliance',
    slug: 'transformation-digitale',
    icon: 'ri-shield-check-line',
    descFr: 'Audit gouvernance, ERM et conformité réglementaire BCEAO/COBAC/OHADA',
    descEn: 'Governance audit, ERM and regulatory compliance BCEAO/COBAC/OHADA',
  },
  {
    titleFr: 'Communication Stratégique',
    titleEn: 'Strategic Communication',
    slug: 'communication-strategique',
    icon: 'ri-megaphone-line',
    descFr: 'Image de marque et stratégie de communication',
    descEn: 'Brand identity and communication strategy',
  },
  {
    titleFr: 'Investment Readiness & Levée de Fonds',
    titleEn: 'Investment Readiness & Fundraising',
    slug: 'levee-de-fonds',
    icon: 'ri-funds-line',
    descFr: 'Diagnostic readiness, pitch deck investor-grade, mise en relation PE/VC & DFI',
    descEn: 'Readiness diagnostic, investor-grade pitch deck, PE/VC & DFI matchmaking',
  },
  {
    titleFr: 'Due Diligence & Acquisition',
    titleEn: 'Due Diligence & Acquisition',
    slug: 'due-diligence-acquisition',
    icon: 'ri-search-eye-line',
    descFr: 'Due diligence pluridisciplinaire pour investisseurs et acquéreurs',
    descEn: 'Multi-disciplinary due diligence for investors and acquirers',
  },
  {
    titleFr: 'Family Office Afrique™',
    titleEn: 'Family Office Afrique™',
    slug: 'family-office-afrique',
    icon: 'ri-building-4-line',
    descFr: 'Gestion de patrimoine et gouvernance familiale pour familles africaines',
    descEn: 'Wealth management and family governance for African families',
  },
  {
    titleFr: 'Regulatory Intelligence™',
    titleEn: 'Regulatory Intelligence™',
    slug: 'regulatory-intelligence',
    icon: 'ri-radar-line',
    descFr: 'Veille réglementaire automatisée UEMOA/CEMAC et analyse d\'impact',
    descEn: 'Automated UEMOA/CEMAC regulatory monitoring and impact analysis',
  },
];

interface ServiceNavigationProps {
  currentSlug: string;
}

export default function ServiceNavigation({ currentSlug }: ServiceNavigationProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const currentIndex = ALL_SERVICES.findIndex((s) => s.slug === currentSlug);
  const prevService = currentIndex > 0 ? ALL_SERVICES[currentIndex - 1] : null;
  const nextService = currentIndex < ALL_SERVICES.length - 1 ? ALL_SERVICES[currentIndex + 1] : null;

  const getTitle = (s: ServiceNavItem) => (isEn ? s.titleEn : s.titleFr);
  const getDesc = (s: ServiceNavItem) => (isEn ? s.descEn : s.descFr);

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {ALL_SERVICES.map((service, index) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              title={getTitle(service)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                index === currentIndex ? 'w-8 h-3' : 'w-3 h-3 bg-gray-200 hover:bg-amber-300'
              }`}
              style={index === currentIndex ? { background: '#86BC25' } : undefined}
            />
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mb-8 font-medium tracking-wide uppercase">
          {isEn
            ? `Service ${currentIndex + 1} of ${ALL_SERVICES.length}`
            : `Service ${currentIndex + 1} sur ${ALL_SERVICES.length}`}
        </p>

        {/* Prev / Next */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Précédent */}
          {prevService ? (
            <Link
              to={`/services/${prevService.slug}`}
              className="group flex items-center gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl border border-gray-100 group-hover:border-amber-200 transition-all shrink-0">
                <i className="ri-arrow-left-line text-xl text-gray-400 group-hover:text-amber-600 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {isEn ? 'Previous service' : 'Service précédent'}
                </p>
                <div className="flex items-center gap-2 mb-1">
                  <i className={`${prevService.icon} text-base`} style={{ color: '#86BC25' }} />
                  <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors truncate">
                    {getTitle(prevService)}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 truncate">{getDesc(prevService)}</p>
              </div>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}

          {/* Suivant */}
          {nextService ? (
            <Link
              to={`/services/${nextService.slug}`}
              className="group flex items-center gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300 cursor-pointer md:flex-row-reverse text-right"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl border border-gray-100 group-hover:border-amber-200 transition-all shrink-0">
                <i className="ri-arrow-right-line text-xl text-gray-400 group-hover:text-amber-600 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {isEn ? 'Next service' : 'Service suivant'}
                </p>
                <div className="flex items-center gap-2 mb-1 md:justify-end">
                  <i className={`${nextService.icon} text-base`} style={{ color: '#86BC25' }} />
                  <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors truncate">
                    {getTitle(nextService)}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 truncate">{getDesc(nextService)}</p>
              </div>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}
        </div>

        {/* Lien vers tous les services */}
        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-grid-line" />
            {isEn ? 'View all services' : 'Voir tous les services'}
          </Link>
        </div>
      </div>
    </section>
  );
}
