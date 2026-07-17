import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export type PremiumCTAVariant =
  | 'diagnostic'
  | 'conformite'
  | 'audit-gouvernance'
  | 'levee-fonds'
  | 'cartographie-risques';

interface PremiumCTAProps {
  variant?: PremiumCTAVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

const CTA_CONFIG: Record<
  PremiumCTAVariant,
  {
    labelFr: string;
    labelEn: string;
    subtitleFr: string;
    subtitleEn: string;
    href: string;
    icon: string;
    colorClass: string;
    bgClass: string;
    hoverClass: string;
    ringClass: string;
  }
> = {
  diagnostic: {
    labelFr: 'Diagnostic stratégique gratuit',
    labelEn: 'Free Strategic Diagnostic',
    subtitleFr: 'Recevez votre analyse en 48h',
    subtitleEn: 'Receive your analysis within 48h',
    href: '/diagnostic-flash',
    icon: 'ri-stethoscope-line',
    colorClass: 'text-white',
    bgClass: 'bg-primary-600',
    hoverClass: 'hover:bg-primary-700',
    ringClass: 'focus:ring-primary-400',
  },
  conformite: {
    labelFr: 'Évaluez votre conformité BCEAO/COBAC',
    labelEn: 'Evaluate Your BCEAO/COBAC Compliance',
    subtitleFr: 'Score personnalisé + plan de mise en conformité',
    subtitleEn: 'Personalized score + compliance roadmap',
    href: '/lead-magnets/checklist-conformite-bceao-cobac',
    icon: 'ri-shield-check-line',
    colorClass: 'text-white',
    bgClass: 'bg-secondary-600',
    hoverClass: 'hover:bg-secondary-700',
    ringClass: 'focus:ring-secondary-400',
  },
  'audit-gouvernance': {
    labelFr: 'Audit de gouvernance — 5 axes en 72h',
    labelEn: 'Governance Audit — 5 Axes in 72h',
    subtitleFr: 'Diagnostic complet de votre dispositif de gouvernance',
    subtitleEn: 'Complete diagnostic of your governance framework',
    href: '/tools/evaluation-gouvernance',
    icon: 'ri-organization-chart',
    colorClass: 'text-white',
    bgClass: 'bg-accent-600',
    hoverClass: 'hover:bg-accent-700',
    ringClass: 'focus:ring-accent-400',
  },
  'levee-fonds': {
    labelFr: 'Testez votre investment readiness',
    labelEn: 'Test Your Investment Readiness',
    subtitleFr: 'Score et roadmap personnalisée pour votre levée de fonds',
    subtitleEn: 'Personalized score and roadmap for your fundraising',
    href: '/tools/investment-readiness',
    icon: 'ri-line-chart-line',
    colorClass: 'text-white',
    bgClass: 'bg-primary-600',
    hoverClass: 'hover:bg-primary-700',
    ringClass: 'focus:ring-primary-400',
  },
  'cartographie-risques': {
    labelFr: 'Cartographiez vos risques prioritaires',
    labelEn: 'Map Your Priority Risks',
    subtitleFr: 'Identifiez et priorisez les 5 risques critiques',
    subtitleEn: 'Identify and prioritize the 5 critical risks',
    href: '/tools/diagnostic-risques',
    icon: 'ri-radar-line',
    colorClass: 'text-white',
    bgClass: 'bg-secondary-600',
    hoverClass: 'hover:bg-secondary-700',
    ringClass: 'focus:ring-secondary-400',
  },
};

const sizeClasses = {
  sm: {
    wrapper: 'px-4 py-2.5 gap-2',
    icon: 'w-4 h-4 text-base',
    label: 'text-sm',
    subtitle: 'text-xs',
  },
  md: {
    wrapper: 'px-6 py-3 gap-3',
    icon: 'w-5 h-5 text-lg',
    label: 'text-base',
    subtitle: 'text-sm',
  },
  lg: {
    wrapper: 'px-8 py-4 gap-3',
    icon: 'w-6 h-6 text-xl',
    label: 'text-lg',
    subtitle: 'text-base',
  },
};

export function PremiumCTA({
  variant = 'diagnostic',
  className = '',
  size = 'md',
  showSubtitle = true,
}: PremiumCTAProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const config = CTA_CONFIG[variant];
  const s = sizeClasses[size];

  return (
    <Link
      to={config.href}
      className={`
        inline-flex items-center rounded-lg
        ${config.bgClass} ${config.hoverClass}
        ${config.colorClass}
        ${s.wrapper}
        font-semibold
        transition-all duration-200
        hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.ringClass}
        cursor-pointer
        whitespace-nowrap
        ${className}
      `}
      aria-label={isEn ? config.labelEn : config.labelFr}
    >
      <div className={`${s.icon} flex items-center justify-center`}>
        <i className={config.icon} />
      </div>
      <span className="flex flex-col items-start leading-tight">
        <span className={s.label}>
          {isEn ? config.labelEn : config.labelFr}
        </span>
        {showSubtitle && (
          <span className={`${s.subtitle} opacity-90 font-normal mt-0.5`}>
            {isEn ? config.subtitleEn : config.subtitleFr}
          </span>
        )}
      </span>
      <div className="ml-2 w-5 h-5 flex items-center justify-center">
        <i className="ri-arrow-right-line text-lg" />
      </div>
    </Link>
  );
}

export function PremiumCTAStrip({
  variant = 'diagnostic',
  className = '',
}: {
  variant?: PremiumCTAVariant;
  className?: string;
}) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const config = CTA_CONFIG[variant];

  return (
    <div
      className={`
        w-full ${config.bgClass} ${config.colorClass}
        py-3 px-4 md:px-6
        flex flex-col sm:flex-row items-center justify-between gap-3
        ${className}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg">
          <i className={`${config.icon} text-lg`} />
        </div>
        <span className="font-semibold text-sm md:text-base">
          {isEn ? config.labelEn : config.labelFr}
        </span>
      </div>
      <Link
        to={config.href}
        className={`
          inline-flex items-center gap-2
          px-4 py-2 rounded-lg
          bg-white ${config.bgClass.replace('bg-', 'text-').replace('600', '700')}
          font-semibold text-sm
          hover:bg-gray-50 transition-colors
          cursor-pointer whitespace-nowrap
        `}
      >
        {isEn ? 'Get started' : 'Commencer'}
        <i className="ri-arrow-right-line" />
      </Link>
    </div>
  );
}

export function PremiumCTAInline({
  variants,
  className = '',
}: {
  variants: PremiumCTAVariant[];
  className?: string;
}) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {variants.map((v) => {
        const config = CTA_CONFIG[v];
        return (
          <Link
            key={v}
            to={config.href}
            className={`
              inline-flex items-center gap-2
              px-4 py-2.5 rounded-lg
              ${config.bgClass} ${config.hoverClass}
              ${config.colorClass}
              font-semibold text-sm
              transition-all duration-200 hover:shadow-sm
              focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.ringClass}
              cursor-pointer whitespace-nowrap
            `}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className={config.icon} />
            </div>
            {isEn ? config.labelEn : config.labelFr}
          </Link>
        );
      })}
    </div>
  );
}