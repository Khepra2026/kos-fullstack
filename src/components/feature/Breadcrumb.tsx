import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** 'light' = texte blanc (sur fond sombre), 'dark' = texte gris (sur fond clair) */
  variant?: 'light' | 'dark';
  className?: string;
}

export function Breadcrumb({ items, variant = 'dark', className = '' }: BreadcrumbProps) {
  const isLight = variant === 'light';

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`flex items-center flex-wrap gap-1.5 text-sm ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <span className={`w-3.5 h-3.5 flex items-center justify-center ${isLight ? 'text-white/40' : 'text-gray-300'}`}>
                <i className="ri-arrow-right-s-line text-base leading-none"></i>
              </span>
            )}
            {isLast || !item.href ? (
              <span
                className={`font-medium truncate max-w-[200px] ${
                  isLast
                    ? isLight ? 'text-white/90' : 'text-gray-800'
                    : isLight ? 'text-white/60' : 'text-gray-500'
                }`}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className={`transition-colors whitespace-nowrap hover:underline underline-offset-2 ${
                  isLight
                    ? 'text-white/60 hover:text-white'
                    : 'text-gray-500 hover:text-amber-700'
                }`}
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
