import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';

export function ServicesProcess() {
  const { t } = useTranslation();

  const steps = [
    {
      number: '01',
      icon: 'ri-search-2-line',
      title: t('servicesPage.process.steps.step1.title'),
      description: t('servicesPage.process.steps.step1.description'),
    },
    {
      number: '02',
      icon: 'ri-draft-line',
      title: t('servicesPage.process.steps.step2.title'),
      description: t('servicesPage.process.steps.step2.description'),
    },
    {
      number: '03',
      icon: 'ri-team-line',
      title: t('servicesPage.process.steps.step3.title'),
      description: t('servicesPage.process.steps.step3.description'),
    },
    {
      number: '04',
      icon: 'ri-line-chart-line',
      title: t('servicesPage.process.steps.step4.title'),
      description: t('servicesPage.process.steps.step4.description'),
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gold-50/60 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full border-2 border-gold-500 bg-gold-50">
              <span className="text-sm font-semibold text-gold-700">{t('servicesPage.process.badge')}</span>
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-4">
              {t('servicesPage.process.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('servicesPage.process.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 z-0 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <ScrollReveal key={index} animation="fadeSlideUp" delay={index * 120}>
                <div
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-6">
                    <div className="w-32 h-32 flex items-center justify-center rounded-full bg-white border-2 border-gold-300 group-hover:border-gold-600 shadow-lg group-hover:shadow-xl group-hover:shadow-gold-200/50 transition-all duration-300">
                      <div className="flex flex-col items-center gap-1">
                        <i className={`${step.icon} text-3xl text-gold-500 group-hover:text-gold-700 transition-colors`}></i>
                        <span className="text-xs font-bold text-gold-700/60 group-hover:text-gold-800 transition-colors">{step.number}</span>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-white text-xs font-bold shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-navy-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}