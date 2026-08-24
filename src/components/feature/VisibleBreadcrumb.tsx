import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export interface VisibleBreadcrumbItem {
  label: string;
  href?: string;
  /** Full canonical URL for schema (defaults to SITE_URL + href) */
  url?: string;
}

interface VisibleBreadcrumbProps {
  items: VisibleBreadcrumbItem[];
  /** Injects JSON-LD BreadcrumbList schema when true (default: true) */
  withSchema?: boolean;
  /** 'light' = amber/white text on dark bg, 'dark' = slate text on light bg */
  variant?: 'light' | 'dark';
  className?: string;
}

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

/**
 * VisibleBreadcrumb — fil d'Ariane visible avec schema BreadcrumbList intégré.
 * À utiliser sur les pages piliers et régions pour navigation Google.
 */
export function VisibleBreadcrumb({
  items,
  withSchema = true,
  variant = 'dark',
  className = '',
}: VisibleBreadcrumbProps) {
  const isLight = variant === 'light';
  const schemaRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!withSchema) return;

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        ...(item.href || item.url
          ? { item: item.url ?? `${SITE_URL}${item.href}` }
          : {}),
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'visible-breadcrumb-schema';
    script.textContent = JSON.stringify(schemaData);

    // Remove previous if exists
    const existing = document.getElementById('visible-breadcrumb-schema');
    if (existing) existing.remove();

    document.head.appendChild(script);
    schemaRef.current = script;

    return () => {
      if (schemaRef.current) {
        schemaRef.current.remove();
        schemaRef.current = null;
      }
    };
  }, [items, withSchema]);

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`w-full ${className}`}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className={`flex items-center flex-wrap gap-x-1 gap-y-1 text-xs font-medium ${
        isLight ? 'text-white/60' : 'text-slate-400'
      }`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={index}
              className="flex items-center gap-x-1"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <i
                  className={`ri-arrow-right-s-line text-sm ${
                    isLight ? 'text-white/30' : 'text-slate-300'
                  }`}
                  aria-hidden="true"
                />
              )}

              {isLast || !item.href ? (
                <span
                  className={`font-semibold truncate max-w-[200px] ${
                    isLight ? 'text-white/90' : 'text-slate-700'
                  }`}
                  aria-current="page"
                  itemProp="name"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className={`transition-colors whitespace-nowrap hover:underline underline-offset-2 cursor-pointer ${
                    isLight
                      ? 'text-amber-300 hover:text-amber-200'
                      : 'text-amber-700 hover:text-amber-900'
                  }`}
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default VisibleBreadcrumb;




