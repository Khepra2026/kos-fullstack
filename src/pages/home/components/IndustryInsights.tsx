import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resolveIdToSlug } from '@/data/articleSlugMap';
import { blogArticles } from '@/mocks/blogArticles';
import { blogArticlesEn } from '@/mocks/blogArticlesEn';

const TABS = [
  { id: 'governance', labelFr: 'Gouvernance', labelEn: 'Governance', icon: 'ri-shield-check-line', color: 'amber' },
  { id: 'finance', labelFr: 'Finance', labelEn: 'Finance', icon: 'ri-line-chart-line', color: 'emerald' },
  { id: 'digital', labelFr: 'Digital', labelEn: 'Digital', icon: 'ri-smartphone-line', color: 'sky' },
  { id: 'startups', labelFr: 'Startups', labelEn: 'Startups', icon: 'ri-rocket-line', color: 'orange' },
];

const COLOR_CLASSES: Record<string, { bg: string; text: string; hover: string; border: string }> = {
  amber: { bg: 'bg-amber-100', text: 'text-amber-800', hover: 'hover:bg-amber-200', border: 'border-amber-300' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-800', hover: 'hover:bg-emerald-200', border: 'border-emerald-300' },
  sky: { bg: 'bg-sky-100', text: 'text-sky-800', hover: 'hover:bg-sky-200', border: 'border-sky-300' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-800', hover: 'hover:bg-orange-200', border: 'border-orange-300' },
};

const CATEGORY_MAPPING: Record<string, string[]> = {
  governance: ['Gouvernance', 'Governance', 'Politiques publiques', 'Public Policy'],
  finance: ['Finance', 'Audit', 'Comptabilité', 'Accounting'],
  digital: ['Transformation digitale', 'Digital Transformation', 'Innovation', 'Technology'],
  startups: ['Entrepreneuriat', 'Entrepreneurship', 'Startups', 'Incubation'],
};

export const IndustryInsights = memo(function IndustryInsights() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [activeTab, setActiveTab] = useState('governance');

  const articles = isEn ? blogArticlesEn : blogArticles;

  const getArticlesByTab = (tabId: string) => {
    const categories = CATEGORY_MAPPING[tabId] || [];
    return articles
      .filter(article => categories.some(cat => article.category.includes(cat)))
      .slice(0, 3);
  };

  const currentArticles = getArticlesByTab(activeTab);
  const activeTabData = TABS.find(t => t.id === activeTab)!;
  const colorClasses = COLOR_CLASSES[activeTabData.color];

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-600 mb-3">
            {isEn ? 'Insights by Expertise' : 'Insights par Expertise'}
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {isEn ? 'Explore Our Expertise' : 'Explorez Nos Expertises'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {isEn
              ? 'Discover our latest analyses, practical advice and strategic perspectives by area of expertise.'
              : 'Découvrez nos dernières analyses, conseils pratiques et perspectives stratégiques par domaine d\'expertise.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const colors = COLOR_CLASSES[tab.color];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? `${colors.bg} ${colors.text} border-2 ${colors.border} shadow-md scale-105`
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`${tab.icon} text-lg`}></i>
                </div>
                <span>{isEn ? tab.labelEn : tab.labelFr}</span>
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {currentArticles.map((article, index) => (
            <article
              key={article.id}
              onClick={() => navigate(`/blog/${resolveIdToSlug(article.id) || article.id}/`)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colorClasses.bg} ${colorClasses.text}`}>
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <span>{article.date}</span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1">
                    <i className="ri-time-line"></i>
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-playfair text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-amber-700 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-2 text-amber-700 text-sm font-semibold mt-auto">
                  <span>{isEn ? 'Read more' : 'Lire la suite'}</span>
                  <div className="w-4 h-4 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA vers Blog */}
        <div className="text-center">
          <button
            onClick={() => navigate('/blog/')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-full hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
          >
            <span>{isEn ? 'View all articles' : 'Voir tous les articles'}</span>
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-right-line text-lg"></i>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
});