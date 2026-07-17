import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';
import OptimizedImage from '@/components/base/OptimizedImage';

export default function FeaturedCaseStudies() {
  const { t } = useTranslation();

  const caseStudies = [
    {
      title: t('caseStudies.case1.title'),
      client: t('caseStudies.case1.client'),
      industry: t('caseStudies.case1.industry'),
      result: t('caseStudies.case1.result'),
      image: 'https://readdy.ai/api/search-image?query=modern%20african%20microfinance%20institution%20building%20with%20digital%20screens%20showing%20financial%20data%20clean%20professional%20atmosphere%20bright%20daylight%20contemporary%20architecture&width=800&height=600&seq=case1&orientation=landscape',
      link: '/case-studies'
    },
    {
      title: t('caseStudies.case2.title'),
      client: t('caseStudies.case2.client'),
      industry: t('caseStudies.case2.industry'),
      result: t('caseStudies.case2.result'),
      image: 'https://readdy.ai/api/search-image?query=african%20fintech%20startup%20office%20with%20modern%20technology%20mobile%20payment%20systems%20young%20professionals%20working%20on%20laptops%20bright%20innovative%20workspace&width=800&height=600&seq=case2&orientation=landscape',
      link: '/case-studies'
    },
    {
      title: t('caseStudies.case3.title'),
      client: t('caseStudies.case3.client'),
      industry: t('caseStudies.case3.industry'),
      result: t('caseStudies.case3.result'),
      image: 'https://readdy.ai/api/search-image?query=african%20government%20building%20with%20digital%20transformation%20elements%20modern%20public%20service%20center%20citizens%20using%20digital%20services%20professional%20clean%20environment&width=800&height=600&seq=case3&orientation=landscape',
      link: '/case-studies'
    }
  ];

  return (
    <section id="case-studies" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('caseStudies.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('caseStudies.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <Link
                to={study.link}
                className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all gradient-border glow-gold-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    width={800}
                    height={600}
                    aspectRatio="4/3"
                    objectFit="cover"
                    loading="lazy"
                    placeholder="shimmer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gold-600 mb-3">
                    <i className="ri-building-line" aria-hidden="true"></i>
                    <span>{study.industry}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {study.client}
                  </p>
                  <div className="flex items-center gap-2 text-gold-600 font-semibold">
                    <i className="ri-line-chart-line" aria-hidden="true"></i>
                    <span>{study.result}</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/case-studies/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-lg font-semibold hover:from-gold-600 hover:to-gold-700 transition-all whitespace-nowrap shadow-md hover:shadow-xl hover:scale-105"
          >
            {t('caseStudies.viewAll')}
            <i className="ri-arrow-right-line" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
