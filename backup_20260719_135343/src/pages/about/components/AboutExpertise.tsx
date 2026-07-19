import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';

export function AboutExpertise() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const domains = [
    {
      icon: 'ri-government-line',
      titleKey: 'governance.title',
      descriptionKey: 'governance.description',
      tagsKey: 'governance.tags',
    },
    {
      icon: 'ri-line-chart-line',
      titleKey: 'financial.title',
      descriptionKey: 'financial.description',
      tagsKey: 'financial.tags',
    },
    {
      icon: 'ri-shield-check-line',
      titleKey: 'risk.title',
      descriptionKey: 'risk.description',
      tagsKey: 'risk.tags',
    },
    {
      icon: 'ri-compass-3-line',
      titleKey: 'strategy.title',
      descriptionKey: 'strategy.description',
      tagsKey: 'strategy.tags',
    },
    {
      icon: 'ri-smartphone-line',
      titleKey: 'digital.title',
      descriptionKey: 'digital.description',
      tagsKey: 'digital.tags',
    },
    {
      icon: 'ri-seedling-line',
      titleKey: 'incubation.title',
      descriptionKey: 'incubation.description',
      tagsKey: 'incubation.tags',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal animation="fadeSlideUp" delay={0}>
          <div className="text-center mb-16">
            <span className="section-label">
              <i className="ri-briefcase-4-line"></i>
              {t('aboutExpertise.badge')}
            </span>
            <h2 className="section-title">
              {t('aboutExpertise.title')}
            </h2>
            <div className="section-divider">
              <span className="section-divider-dot"></span>
            </div>
            <p className="section-subtitle">
              {t('aboutExpertise.description')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, i) => (
            <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 100}>
              <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-md mb-6 group-hover:scale-110 transition-transform">
                  <i className={`${domain.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`aboutExpertise.domains.${domain.titleKey}`)}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{t(`aboutExpertise.domains.${domain.descriptionKey}`)}</p>
                <div className="flex flex-wrap gap-2">
                  {(t(`aboutExpertise.domains.${domain.tagsKey}`, { returnObjects: true }) as string[]).map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gold-50 border border-gold-200 text-gold-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fadeSlideUp" delay={200}>
          <div className="mt-14 text-center">
            <a
              href="/services"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-medium whitespace-nowrap cursor-pointer shadow-lg"
            >
              {t('aboutExpertise.ctaExplore')}
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}



