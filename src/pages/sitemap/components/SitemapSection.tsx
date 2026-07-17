interface SitemapLink {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  isNew?: boolean;
}

interface SitemapSectionProps {
  title: string;
  icon: string;
  links: SitemapLink[];
  accentColor?: string;
  count?: number;
}

export function SitemapSection({ title, icon, links, accentColor = 'gold', count }: SitemapSectionProps) {
  const colorMap: Record<string, { bg: string; icon: string; badge: string; border: string; dot: string }> = {
    gold: {
      bg: 'bg-amber-50',
      icon: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
    },
    green: {
      bg: 'bg-emerald-50',
      icon: 'text-emerald-600',
      badge: 'bg-emerald-100 text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
    dark: {
      bg: 'bg-gray-100',
      icon: 'text-gray-700',
      badge: 'bg-gray-200 text-gray-700',
      border: 'border-gray-200',
      dot: 'bg-gray-600',
    },
    teal: {
      bg: 'bg-teal-50',
      icon: 'text-teal-600',
      badge: 'bg-teal-100 text-teal-700',
      border: 'border-teal-200',
      dot: 'bg-teal-500',
    },
  };

  const c = colorMap[accentColor] || colorMap.gold;

  return (
    <div className={`bg-white rounded-2xl border ${c.border} overflow-hidden hover:shadow-md transition-shadow duration-300`}>
      {/* Header */}
      <div className={`${c.bg} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm`}>
            <i className={`${icon} text-xl ${c.icon}`}></i>
          </div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">{title}</h2>
        </div>
        {count !== undefined && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>
            {count} pages
          </span>
        )}
      </div>

      {/* Links */}
      <ul className="divide-y divide-gray-50">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.href}
              className="group flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot} opacity-60 group-hover:opacity-100 transition-opacity`}></span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 group-hover:underline underline-offset-2 transition-colors">
                    {link.label}
                  </span>
                  {link.isNew && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                      Nouveau
                    </span>
                  )}
                  {link.badge && (
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${c.badge} uppercase tracking-wide`}>
                      {link.badge}
                    </span>
                  )}
                </div>
                {link.description && (
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{link.description}</p>
                )}
              </div>
              <i className="ri-arrow-right-s-line text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors"></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
