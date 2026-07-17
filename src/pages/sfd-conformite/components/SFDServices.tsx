import { useTranslation } from 'react-i18next';

const SERVICE_COLORS = [
  { color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-400/30', iconColor: 'text-amber-500', icon: 'ri-search-eye-line' },
  { color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-400/30', iconColor: 'text-emerald-500', icon: 'ri-route-line' },
  { color: 'from-gold-500/20 to-gold-600/10', border: 'border-gold-400/30', iconColor: 'text-gold-500', icon: 'ri-government-line' },
  { color: 'from-teal-500/20 to-teal-600/10', border: 'border-teal-400/30', iconColor: 'text-teal-500', icon: 'ri-bar-chart-grouped-line' },
  { color: 'from-rose-500/20 to-rose-600/10', border: 'border-rose-400/30', iconColor: 'text-rose-500', icon: 'ri-user-heart-line' },
  { color: 'from-indigo-500/20 to-indigo-600/10', border: 'border-indigo-400/30', iconColor: 'text-indigo-500', icon: 'ri-smartphone-line' },
];

export function SFDServices() {
  const { t } = useTranslation();

  const items = t('sfdConformite.services.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    points: string[];
  }>;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-3">
            {t('sfdConformite.services.badge')}
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-5">
            {t('sfdConformite.services.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            {t('sfdConformite.services.intro')}{' '}
            <strong>{t('sfdConformite.services.introHighlight')}</strong>{' '}
            {t('sfdConformite.services.introEnd')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service, idx) => {
            const style = SERVICE_COLORS[idx] || SERVICE_COLORS[0];
            return (
              <div
                key={service.title}
                className={`bg-gradient-to-br ${style.color} border ${style.border} rounded-2xl p-7 hover:shadow-lg transition-all duration-300 group`}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm mb-5">
                  <i className={`${style.icon} text-2xl ${style.iconColor}`}></i>
                </div>
                <h3 className="font-playfair text-xl font-bold text-brand-900 mb-3 line-clamp-2" title={service.title}>{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                      <i className="ri-check-line text-gold-500 mt-0.5 shrink-0"></i>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SFDServices;