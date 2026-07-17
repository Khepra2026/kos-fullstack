import { useTranslation } from 'react-i18next';

export function ServicesStats() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const stats = [
    {
      value: '22+',
      label: t('servicesPage.stats.years'),
      sub: isEn ? 'Since 2003 · Togo & Gabon' : 'Depuis 2003 · Togo & Gabon',
      icon: 'ri-award-line',
    },
    {
      value: '3',
      label: isEn ? 'Countries of Practice' : "Pays d'exercice",
      sub: 'Togo · Gabon · International',
      icon: 'ri-map-pin-2-line',
    },
    {
      value: '50+',
      label: t('servicesPage.stats.clients'),
      sub: isEn ? 'West & Central Africa' : "Afrique de l'Ouest & Centrale",
      icon: 'ri-team-line',
    },
    {
      value: '20+',
      label: isEn ? 'Countries Covered' : 'Pays couverts',
      sub: isEn ? 'Regional coverage' : 'Couverture régionale',
      icon: 'ri-global-line',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-brand-950 via-navy-950 to-brand-950 border-t-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-white mb-2">
            {t('servicesPage.stats.title')}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mt-3 rounded-full"></div>
          <p className="text-gold-200/70 text-sm mt-3">
            {isEn
              ? 'International experience built across Togo, Gabon and West & Central Africa'
              : 'Expérience internationale forgée au Togo, au Gabon et en Afrique de l\'Ouest & Centrale'}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group rounded-2xl p-6 bg-white/5 border border-white/10 gradient-border glow-gold-hover">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400/30 to-gold-600/30 border border-gold-500/40 group-hover:from-gold-400/50 group-hover:to-gold-600/50 transition-all">
                <i className={`${stat.icon} text-3xl text-gold-400`}></i>
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-gold-400 mb-1 font-playfair">{stat.value}</div>
              <div className="text-sm text-gold-200 font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-gold-400/60">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
