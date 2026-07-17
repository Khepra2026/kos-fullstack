import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';

export default function IndustriesServed() {
  const { t } = useTranslation();

  const industries = [
    {
      icon: 'ri-bank-line',
      name: t('industries.microfinance'),
      description: t('industries.microfinanceDesc'),
      link: '/industries/microfinance'
    },
    {
      icon: 'ri-smartphone-line',
      name: t('industries.fintech'),
      description: t('industries.fintechDesc'),
      link: '/industries/fintech'
    },
    {
      icon: 'ri-building-line',
      name: t('industries.pme'),
      description: t('industries.pmeDesc'),
      link: '/industries/pme'
    },
    {
      icon: 'ri-government-line',
      name: t('industries.public'),
      description: t('industries.publicDesc'),
      link: '/industries/public-sector'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('industries.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('industries.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <a
                href={industry.link}
                className="group block bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all gradient-border glow-gold-hover"
              >
                <div className="w-14 h-14 bg-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className={`${industry.icon} text-2xl text-white`} aria-hidden="true"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {industry.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {industry.description}
                </p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}