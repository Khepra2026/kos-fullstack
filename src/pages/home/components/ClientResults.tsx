import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { AnimatedCounter } from '@/components/base/AnimatedCounter';
import ScrollReveal from '@/components/feature/ScrollReveal';

export default function ClientResults() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const results = [
    {
      icon: 'ri-line-chart-line',
      metric: 40,
      suffix: '%',
      label: t('clientResults.efficiency')
    },
    {
      icon: 'ri-funds-line',
      metric: 3,
      suffix: 'x',
      label: t('clientResults.roi')
    },
    {
      icon: 'ri-time-line',
      metric: 60,
      suffix: '%',
      label: t('clientResults.timeReduction')
    },
    {
      icon: 'ri-shield-check-line',
      metric: 100,
      suffix: '%',
      label: t('clientResults.compliance')
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('clientResults.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('clientResults.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {results.map((result, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="bg-gradient-to-br from-brand-50 to-white rounded-xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all gradient-border glow-gold-hover">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center shadow-md">
                  <i className={`${result.icon} text-2xl sm:text-3xl text-white`} aria-hidden="true"></i>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gold-600 mb-2">
                  {isVisible && (
                    <AnimatedCounter
                      value={result.metric}
                      suffix={result.suffix}
                      duration={2000}
                    />
                  )}
                </div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">
                  {result.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
