import { Link } from 'react-router-dom';

/**
 * Composant de maillage interne stratégique
 * Optimisé pour le SEO et l'expérience utilisateur
 * Basé sur les meilleures pratiques des cabinets de conseil internationaux
 */

interface InternalLink {
  title: string;
  url: string;
  description: string;
  category: 'service' | 'industry' | 'region' | 'content' | 'tool';
  keywords: string[];
}

interface InternalLinkingStrategyProps {
  currentPage: string;
  maxLinks?: number;
  variant?: 'sidebar' | 'footer' | 'inline';
  showDescription?: boolean;
}

// Base de données de liens internes stratégiques
const STRATEGIC_LINKS: InternalLink[] = [
  // Services principaux
  {
    title: 'Conseil Stratégique Afrique',
    url: '/conseil-strategique',
    description: 'Élaboration de stratégies de croissance et plans d\'affaires pour entreprises africaines',
    category: 'service',
    keywords: ['conseil stratégie', 'cabinet conseil afrique', 'consultant stratégique'],
  },
  {
    title: 'Gouvernance Entreprise',
    url: '/gouvernance-entreprise',
    description: 'Mise en place de structures de gouvernance et conformité réglementaire',
    category: 'service',
    keywords: ['gouvernance', 'conformité', 'conseil administration'],
  },
  {
    title: 'Transformation Organisationnelle',
    url: '/transformation-organisationnelle',
    description: 'Accompagnement au changement et restructuration d\'entreprise',
    category: 'service',
    keywords: ['transformation', 'changement organisationnel', 'restructuration'],
  },
  {
    title: 'Inclusion Financière Digitale',
    url: '/inclusion-financiere-digitale',
    description: 'Solutions fintech et digitalisation des services financiers en Afrique',
    category: 'service',
    keywords: ['fintech', 'inclusion financière', 'digital finance'],
  },
  {
    title: 'Gestion des Risques Entreprise',
    url: '/gestion-risques-entreprise',
    description: 'Identification et mitigation des risques opérationnels et financiers',
    category: 'service',
    keywords: ['gestion risques', 'risk management', 'audit risques'],
  },
  {
    title: 'Diagnostic Organisationnel',
    url: '/diagnostic-organisationnel',
    description: 'Évaluation complète de la performance et de la maturité organisationnelle',
    category: 'service',
    keywords: ['diagnostic', 'audit organisationnel', 'évaluation'],
  },

  // Pillar pages SEO
  {
    title: 'Transformation Digitale en Afrique',
    url: '/pillar/digital-transformation-africa',
    description: 'Guide complet de la transformation digitale pour entreprises africaines',
    category: 'content',
    keywords: ['transformation digitale', 'digitalisation afrique', 'digital transformation'],
  },
  {
    title: 'Inclusion Financière en Afrique',
    url: '/pillar/financial-inclusion-africa',
    description: 'Stratégies et solutions pour l\'inclusion financière en Afrique',
    category: 'content',
    keywords: ['inclusion financière', 'microfinance', 'financial inclusion'],
  },
  {
    title: 'Conseil Fintech Afrique',
    url: '/pillar/fintech-advisory-africa',
    description: 'Expertise fintech et innovation financière en Afrique',
    category: 'content',
    keywords: ['fintech', 'conseil fintech', 'innovation financière'],
  },
  {
    title: 'Développement PME Afrique',
    url: '/pillar/sme-development-africa',
    description: 'Accompagnement et structuration des PME africaines',
    category: 'content',
    keywords: ['PME', 'développement PME', 'accompagnement entreprise'],
  },

  // Industries
  {
    title: 'Conseil Microfinance',
    url: '/industries/microfinance',
    description: 'Expertise spécialisée pour institutions de microfinance et SFD',
    category: 'industry',
    keywords: ['microfinance', 'SFD', 'IMF'],
  },
  {
    title: 'Conseil Fintech',
    url: '/industries/fintech',
    description: 'Accompagnement des startups fintech et néobanques',
    category: 'industry',
    keywords: ['fintech', 'startup fintech', 'néobanque'],
  },
  {
    title: 'Conseil PME',
    url: '/industries/pme',
    description: 'Solutions sur mesure pour petites et moyennes entreprises',
    category: 'industry',
    keywords: ['PME', 'conseil PME', 'accompagnement PME'],
  },

  // Régions
  {
    title: 'Conseil Afrique de l\'Ouest',
    url: '/regions/afrique-francophone',
    description: 'Expertise locale en Afrique de l\'Ouest francophone',
    category: 'region',
    keywords: ['afrique ouest', 'UEMOA', 'OHADA'],
  },
  {
    title: 'Conseil UEMOA CEMAC',
    url: '/regions/uemoa-cemac',
    description: 'Conformité réglementaire BCEAO et BEAC',
    category: 'region',
    keywords: ['UEMOA', 'CEMAC', 'BCEAO'],
  },

  // Outils
  {
    title: 'Diagnostic Gratuit',
    url: '/tools/diagnostic-organisationnel',
    description: 'Évaluez gratuitement la maturité de votre organisation',
    category: 'tool',
    keywords: ['diagnostic gratuit', 'évaluation', 'audit gratuit'],
  },
  {
    title: 'Évaluation Gouvernance',
    url: '/tools/evaluation-gouvernance',
    description: 'Testez le niveau de gouvernance de votre entreprise',
    category: 'tool',
    keywords: ['évaluation gouvernance', 'test gouvernance', 'audit gouvernance'],
  },
];

export function InternalLinkingStrategy({
  currentPage,
  maxLinks = 6,
  variant = 'sidebar',
  showDescription = true,
}: InternalLinkingStrategyProps) {
  // Filtrer les liens pertinents (exclure la page actuelle)
  const relevantLinks = STRATEGIC_LINKS
    .filter(link => link.url !== currentPage)
    .slice(0, maxLinks);

  if (relevantLinks.length === 0) return null;

  // Styles selon la variante
  const containerStyles = {
    sidebar: 'bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6 shadow-sm',
    footer: 'bg-white border-t border-slate-200 py-8',
    inline: 'bg-slate-50 rounded-xl p-6 my-8',
  };

  const titleStyles = {
    sidebar: 'text-lg font-bold text-slate-900 mb-4 flex items-center gap-2',
    footer: 'text-xl font-bold text-slate-900 mb-6 text-center',
    inline: 'text-xl font-bold text-slate-900 mb-4',
  };

  const gridStyles = {
    sidebar: 'space-y-3',
    footer: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-4',
    inline: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  };

  return (
    <div className={containerStyles[variant]}>
      <h3 className={titleStyles[variant]}>
        <i className="ri-links-line text-gold-600"></i>
        <span>Ressources Connexes</span>
      </h3>

      <div className={gridStyles[variant]}>
        {relevantLinks.map((link, index) => (
          <Link
            key={index}
            to={link.url}
            className="group block p-4 bg-white hover:bg-gold-50 border border-slate-200 hover:border-gold-300 rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer"
            aria-label={`Découvrir ${link.title}`}
          >
            <div className="flex items-start gap-3">
              {/* Icône selon la catégorie */}
              <div className="w-10 h-10 flex items-center justify-center bg-gold-100 text-gold-600 rounded-lg group-hover:bg-gold-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                {link.category === 'service' && <i className="ri-briefcase-line text-xl"></i>}
                {link.category === 'industry' && <i className="ri-building-line text-xl"></i>}
                {link.category === 'region' && <i className="ri-map-pin-line text-xl"></i>}
                {link.category === 'content' && <i className="ri-article-line text-xl"></i>}
                {link.category === 'tool' && <i className="ri-tools-line text-xl"></i>}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 group-hover:text-gold-600 transition-colors duration-300 mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  {link.title}
                </h4>
                {showDescription && (
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {link.description}
                  </p>
                )}
              </div>

              {/* Flèche */}
              <div className="w-6 h-6 flex items-center justify-center text-slate-400 group-hover:text-gold-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
                <i className="ri-arrow-right-line"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA vers toutes les ressources */}
      {variant !== 'inline' && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <Link
            to="/sitemap"
            className="flex items-center justify-center gap-2 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            <span>Voir toutes nos ressources</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      )}
    </div>
  );
}

/**
 * Composant de liens contextuels dans le contenu
 * À utiliser dans les articles de blog et pages de contenu
 */
interface ContextualLinksProps {
  keywords: string[];
  maxLinks?: number;
}

export function ContextualLinks({ keywords, maxLinks = 3 }: ContextualLinksProps) {
  // Trouver les liens les plus pertinents selon les mots-clés
  const relevantLinks = STRATEGIC_LINKS
    .map(link => ({
      ...link,
      relevance: link.keywords.filter(kw => 
        keywords.some(k => kw.toLowerCase().includes(k.toLowerCase()))
      ).length,
    }))
    .filter(link => link.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, maxLinks);

  if (relevantLinks.length === 0) return null;

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-slate-50 border-l-4 border-gold-500 rounded-r-xl">
      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <i className="ri-lightbulb-line text-gold-600"></i>
        <span>Pour aller plus loin</span>
      </h4>
      <ul className="space-y-3">
        {relevantLinks.map((link, index) => (
          <li key={index}>
            <Link
              to={link.url}
              className="group flex items-start gap-3 text-slate-700 hover:text-gold-600 transition-colors duration-300 cursor-pointer"
            >
              <i className="ri-arrow-right-s-line text-gold-500 mt-0.5 flex-shrink-0"></i>
              <div>
                <strong className="font-semibold group-hover:underline whitespace-nowrap">
                  {link.title}
                </strong>
                <span className="text-sm text-slate-600 ml-2">
                  — {link.description}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InternalLinkingStrategy;