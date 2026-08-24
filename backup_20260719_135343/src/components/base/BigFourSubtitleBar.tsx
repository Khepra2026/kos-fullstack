import type { ReactNode } from 'react';

type BarVariant = 'left-accent' | 'double-stroke' | 'centered-pillars' | 'minimal-dot';

interface BigFourSubtitleBarProps {
  /** Texte du sous-titre (uppercase automatique) */
  label: string;
  /** Variante de design */
  variant?: BarVariant;
  /** Icône Remix (ex: ri-lightbulb-line) — optionnel */
  icon?: string;
  /** Token couleur StyleSystem (primary | accent | secondary) */
  accentColor?: 'primary' | 'accent' | 'secondary';
  /** Tag HTML (h2, h3, h4, span) */
  as?: 'h2' | 'h3' | 'h4' | 'span' | 'div';
  /** Classes additionnelles */
  className?: string;
  /** Contenu additionnel à droite */
  children?: ReactNode;
}

/**
 * BigFourSubtitleBar — Barre de sous-titre signature Big Four
 *
 * Quatre variantes premium pour structurer les sections avec l'élégance
 * institutionnelle des cabinets Big Four (Deloitte, PwC, EY, KPMG).
 *
 * Variantes :
 * - left-accent     : Ligne verticale épaisse + ligne horizontale + texte (usage principal)
 * - double-stroke   : Ligne fine + ligne épaisse superposées, asymétrique
 * - centered-pillars: Deux piliers symétriques encadrant le texte centré
 * - minimal-dot     : Point + ligne fine, idéal pour les cartes et zones compactes
 */
export default function BigFourSubtitleBar({
  label,
  variant = 'left-accent',
  icon,
  accentColor = 'primary',
  as: Tag = 'div',
  className = '',
  children,
}: BigFourSubtitleBarProps) {
  const colorMap = {
    primary: {
      line: 'bg-primary-500',
      dot: 'bg-primary-500',
      text: 'text-primary-600',
      light: 'bg-primary-400/40',
      thin: 'bg-primary-400/60',
    },
    accent: {
      line: 'bg-accent-500',
      dot: 'bg-accent-500',
      text: 'text-accent-600',
      light: 'bg-accent-400/40',
      thin: 'bg-accent-400/60',
    },
    secondary: {
      line: 'bg-secondary-500',
      dot: 'bg-secondary-500',
      text: 'text-secondary-600',
      light: 'bg-secondary-400/40',
      thin: 'bg-secondary-400/60',
    },
  };

  const c = colorMap[accentColor];

  if (variant === 'left-accent') {
    return (
      <Tag className={`flex items-center gap-4 ${className}`}>
        {/* Bloc vertical + horizontal signature Big Four */}
        <div className="flex items-center gap-0 flex-shrink-0">
          <div className={`w-1 h-6 rounded-full ${c.line}`} />
          <div className={`w-8 h-px ${c.thin} ml-2`} />
        </div>
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && (
            <span className={`w-7 h-7 flex items-center justify-center rounded-md ${c.line} bg-opacity-10`} style={{ backgroundColor: 'var(--tw-bg-opacity, 0.1)' }}>
              <i className={`${icon} text-sm ${c.text}`} />
            </span>
          )}
          <span className={`text-xs font-bold uppercase tracking-[0.22em] ${c.text}`}>
            {label}
          </span>
          {children && <div className="ml-auto flex-shrink-0">{children}</div>}
        </div>
      </Tag>
    );
  }

  if (variant === 'double-stroke') {
    return (
      <Tag className={`flex items-center gap-3 ${className}`}>
        <div className="flex flex-col gap-0.5 flex-shrink-0">
          <div className={`w-12 h-[2px] ${c.thin}`} />
          <div className={`w-6 h-[3px] rounded-full ${c.line}`} />
        </div>
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && (
            <i className={`${icon} text-sm ${c.text}`} />
          )}
          <span className={`text-xs font-bold uppercase tracking-[0.2em] ${c.text}`}>
            {label}
          </span>
          {children && <div className="ml-auto flex-shrink-0">{children}</div>}
        </div>
      </Tag>
    );
  }

  if (variant === 'centered-pillars') {
    return (
      <div className={`text-center ${className}`}>
        <Tag className="inline-flex flex-col items-center gap-3">
          {/* Pilier supérieur */}
          <div className="flex items-center gap-0">
            <div className={`w-10 h-px ${c.thin}`} />
            <div className={`w-1.5 h-1.5 rotate-45 ${c.line}`} />
            <div className={`w-10 h-px ${c.thin}`} />
          </div>
          {/* Texte */}
          <div className="flex items-center gap-2.5">
            {icon && (
              <span className={`w-8 h-8 flex items-center justify-center rounded-lg`} style={{ backgroundColor: `oklch(from oklch(var(--${accentColor}-500)) l c h / 0.1)` }}>
                <i className={`${icon} text-base ${c.text}`} />
              </span>
            )}
            <span className={`text-xs font-bold uppercase tracking-[0.25em] ${c.text}`}>
              {label}
            </span>
          </div>
          {/* Pilier inférieur */}
          <div className="flex items-center gap-0">
            <div className={`w-10 h-px ${c.thin}`} />
            <div className={`w-1.5 h-1.5 rotate-45 ${c.line}`} />
            <div className={`w-10 h-px ${c.thin}`} />
          </div>
        </Tag>
        {children && <div className="mt-4">{children}</div>}
      </div>
    );
  }

  // minimal-dot
  return (
    <Tag className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        <div className={`w-5 h-px ${c.thin}`} />
      </div>
      <div className="flex items-center gap-2 min-w-0">
        {icon && (
          <i className={`${icon} text-[13px] ${c.text}`} />
        )}
        <span className={`text-xs font-bold uppercase tracking-[0.18em] ${c.text}`}>
          {label}
        </span>
        {children && <div className="ml-auto flex-shrink-0">{children}</div>}
      </div>
    </Tag>
  );
}



