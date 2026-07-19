import { AnimatedCounter } from '';

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'gold' | 'minimal';
  className?: string;
}

export function StatCard({
  value,
  suffix = '',
  prefix = '',
  label,
  sublabel,
  icon,
  trend,
  variant = 'default',
  className = ''
}: StatCardProps) {
  const variants = {
    default: {
      container: 'bg-white border border-gold-100 hover:border-gold-300',
      value: 'text-navy-900',
      label: 'text-navy-700',
      sublabel: 'text-navy-500',
      icon: 'text-gold-600 bg-gold-50'
    },
    gold: {
      container: 'bg-gradient-to-br from-gold-50 to-brown-50 border border-gold-200 hover:border-gold-400',
      value: 'gradient-text-gold',
      label: 'text-brown-800',
      sublabel: 'text-brown-600',
      icon: 'text-white bg-gradient-to-br from-brown-600 to-gold-600'
    },
    minimal: {
      container: 'bg-transparent border-0',
      value: 'text-navy-900',
      label: 'text-navy-600',
      sublabel: 'text-navy-400',
      icon: 'text-gold-600'
    }
  };

  const style = variants[variant];

  return (
    <div
      className={`relative group rounded-xl p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${style.container} ${className}`}
    >
      {/* Icône optionnelle */}
      {icon && (
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 transition-transform group-hover:scale-110 ${style.icon}`}>
          <i className={`${icon} text-2xl`} aria-hidden="true"></i>
        </div>
      )}

      {/* Valeur principale avec animation */}
      <div className={`font-playfair text-5xl font-bold mb-2 ${style.value}`}>
        <AnimatedCounter value={value} suffix={suffix} prefix={prefix} />
      </div>

      {/* Label principal */}
      <div className={`text-base font-semibold mb-1 ${style.label}`}>
        {label}
      </div>

      {/* Sous-label optionnel */}
      {sublabel && (
        <div className={`text-sm ${style.sublabel}`}>
          {sublabel}
        </div>
      )}

      {/* Tendance optionnelle */}
      {trend && (
        <div className={`flex items-center gap-1 mt-3 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <i className={`${trend.isPositive ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} text-base`} aria-hidden="true"></i>
          <span>{trend.value}%</span>
        </div>
      )}

      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
        background: 'linear-gradient(135deg, transparent 0%, rgba(212,168,42,0.05) 50%, transparent 100%)'
      }}></div>
    </div>
  );
}



