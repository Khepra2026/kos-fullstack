import { useTranslation } from 'react-i18next';

interface ArticleVisualBoxProps {
  type: 'red' | 'warning' | 'opportunity';
  title: string;
  children: React.ReactNode;
}

const TYPE_STYLES = {
  red: {
    border: 'border-red-200',
    bg: 'bg-gradient-to-br from-red-50 to-white',
    iconBg: 'bg-red-100',
    icon: 'ri-error-warning-line text-red-600',
    titleColor: 'text-red-800',
    dot: 'bg-red-500',
  },
  warning: {
    border: 'border-amber-200',
    bg: 'bg-gradient-to-br from-amber-50 to-white',
    iconBg: 'bg-amber-100',
    icon: 'ri-alert-line text-amber-600',
    titleColor: 'text-amber-800',
    dot: 'bg-amber-500',
  },
  opportunity: {
    border: 'border-emerald-200',
    bg: 'bg-gradient-to-br from-emerald-50 to-white',
    iconBg: 'bg-emerald-100',
    icon: 'ri-plant-line text-emerald-600',
    titleColor: 'text-emerald-800',
    dot: 'bg-emerald-500',
  },
};

export function ArticleVisualBox({ type, title, children }: ArticleVisualBoxProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const style = TYPE_STYLES[type];

  const labels = {
    red: isEn ? 'Red Flag' : 'Red Flag',
    warning: isEn ? 'Warning' : 'Attention',
    opportunity: isEn ? 'Opportunity' : 'Opportunité',
  };

  return (
    <div className={`my-8 rounded-xl border-2 ${style.border} ${style.bg} overflow-hidden`}>
      <div className="px-5 py-4 flex items-start gap-3">
        <div className={`w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 ${style.iconBg}`}>
          <i className={`${style.icon} text-lg`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${style.dot} flex-shrink-0`}></span>
            <span className={`text-xs font-bold uppercase tracking-wider ${style.titleColor}`}>
              {labels[type]}
            </span>
          </div>
          <h4 className="font-semibold text-gray-900 text-sm md:text-base leading-snug">
            {title}
          </h4>
        </div>
      </div>
      {children && (
        <div className="px-5 pb-5 pt-0 text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}