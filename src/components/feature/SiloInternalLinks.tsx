import { Link, useLocation } from 'react-router-dom';
import { getSiloLinksForPath, getSiloForPath, type SiloPage } from '@/data/seoSiloContent';

interface SiloInternalLinksProps {
  /** Override du path courant (utile si la page a un path différent de window.location.pathname) */
  currentPath?: string;
  /** Titre de la section */
  title?: string;
  titleEn?: string;
  isEn?: boolean;
  /** Nombre max de liens à afficher */
  maxLinks?: number;
  /** Variante visuelle */
  variant?: 'sidebar' | 'footer' | 'inline';
}

/**
 * Composant de liens internes SEO — Architecture en Silo
 *
 * Affiche les liens vers les autres pages du même silo sémantique.
 * Renforce le maillage interne et concentre le PageRank sur les pages piliers.
 *
 * Usage :
 * - Dans les pages de services (audit-social, conseil-strategique, etc.)
 * - Dans les articles de blog liés à un silo
 * - Dans les sidebars et footers de section
 */
export default function SiloInternalLinks({
  currentPath,
  title = 'Dans la même thématique',
  titleEn = 'Related topics',
  isEn = false,
  maxLinks = 4,
  variant = 'sidebar',
}: SiloInternalLinksProps) {
  const location = useLocation();
  const path = currentPath || location.pathname;

  const siloLinks = getSiloLinksForPath(path).slice(0, maxLinks);
  const silo = getSiloForPath(path);

  if (siloLinks.length === 0 || !silo) return null;

  const displayTitle = isEn ? titleEn : title;

  // ── Variante SIDEBAR ──────────────────────────────────────────────────────
  if (variant === 'sidebar') {
    return (
      <nav
        aria-label={isEn ? 'Related pages in same topic' : 'Pages liées dans la même thématique'}
        className="rounded-2xl overflow-hidden border border-gray-100"
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center gap-3"
          style={{ background: `${silo.color}10`, borderBottom: `1px solid ${silo.color}20` }}
        >
          <div
            className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ background: `${silo.color}20` }}
          >
            <i className={`${silo.icon} text-sm`} style={{ color: silo.color }} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
              {isEn ? silo.nameEn : silo.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{displayTitle}</p>
          </div>
        </div>

        {/* Links */}
        <ul className="divide-y divide-gray-50 bg-white">
          {siloLinks.map((page) => (
            <li key={page.path}>
              <Link
                to={page.path}
                rel="nofollow"
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover:scale-125"
                  style={{ background: silo.color }}
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors leading-snug">
                  {isEn ? page.titleEn : page.title}
                </span>
                <i
                  className="ri-arrow-right-line text-xs ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: silo.color }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  // ── Variante FOOTER (grille horizontale) ──────────────────────────────────
  if (variant === 'footer') {
    return (
      <nav
        aria-label={isEn ? 'Related pages' : 'Pages liées'}
        className="py-10 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-6 h-6 flex items-center justify-center rounded-lg flex-shrink-0"
              style={{ background: `${silo.color}15` }}
            >
              <i className={`${silo.icon} text-xs`} style={{ color: silo.color }} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
              {isEn ? silo.nameEn : silo.name} — {displayTitle}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {siloLinks.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                rel="nofollow"
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 bg-white transition-all"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: silo.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 leading-snug">
                    {isEn ? page.titleEn : page.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {isEn ? page.metaDescriptionEn : page.metaDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  // ── Variante INLINE (liste compacte) ─────────────────────────────────────
  return (
    <nav
      aria-label={isEn ? 'Related pages' : 'Pages liées'}
      className="rounded-xl p-5 border border-gray-100 bg-gray-50/50"
    >
      <div className="flex items-center gap-2 mb-4">
        <i className={`${silo.icon} text-sm`} style={{ color: silo.color }} />
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
          {displayTitle}
        </span>
      </div>
      <ul className="space-y-2">
        {siloLinks.map((page) => (
          <li key={page.path}>
            <Link
              to={page.path}
              rel="nofollow"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <i
                className="ri-arrow-right-s-line text-xs flex-shrink-0"
                style={{ color: silo.color }}
              />
              <span className="group-hover:underline underline-offset-2">
                {isEn ? page.titleEn : page.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { SiloInternalLinks };
