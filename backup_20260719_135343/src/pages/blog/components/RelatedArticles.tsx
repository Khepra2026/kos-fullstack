import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resolveIdToSlug } from '@/data/articleSlugMap';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

interface RelatedArticlesProps {
  articles: Article[];
  currentCategory: string;
}

const getCategoryColor = (category: string) => {
  if (category === 'Gouvernance' || category === 'Governance') return 'bg-gold-100 text-gold-800';
  if (category === 'Finance') return 'bg-brand-100 text-brand-800';
  if (category === 'Entrepreneuriat' || category === 'Entrepreneurship') return 'bg-orange-100 text-orange-800';
  if (category === 'Politiques publiques' || category === 'Public Policy') return 'bg-emerald-100 text-emerald-800';
  return 'bg-teal-100 text-teal-800';
};

export function RelatedArticles({ articles = [], currentCategory }: RelatedArticlesProps) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-12">
          <span className="inline-block px-4 py-1.5 bg-gold-100 text-gold-800 text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
            {currentCategory}
          </span>
          <h3 className="font-playfair text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            {t('articleDetail.relatedTitle')}
          </h3>
          <p className="text-gray-500 text-lg">
            {t('articleDetail.relatedSubtitle')}
          </p>
        </div>

        {/* Grille d'articles */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${resolveIdToSlug(article.id) ?? article.id}/`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 block"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  title={article.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <i className="ri-calendar-line"></i>
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-time-line"></i>
                    {article.readTime}
                  </span>
                </div>

                <h4 className="font-playfair text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gold-700 transition-colors leading-snug">
                  {article.title}
                </h4>

                <p className="text-sm text-gray-500 mb-5 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-2 text-gold-700 text-sm font-semibold group-hover:gap-3 transition-all">
                  <span>{t('blogPage.readArticle')}</span>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Diagnostic stratégique intégré */}
        <div
          className="mt-16 bg-gradient-to-br from-brand-50 via-white to-gold-50 rounded-2xl p-10 border border-brand-100"
          style={{ minHeight: '320px', contain: 'layout paint' }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gold-500/20 rounded-2xl mb-5">
              <i className="ri-lightbulb-flash-line text-gold-600 text-2xl"></i>
            </div>
            
            <h3 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
              {isEn 
                ? 'Apply these insights to your organization' 
                : 'Appliquez ces analyses à votre organisation'}
            </h3>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {isEn
                ? 'Get a free 30-minute strategic diagnosis to identify transformation levers specific to your challenges.'
                : 'Obtenez un diagnostic stratégique gratuit de 30 minutes pour identifier les leviers de transformation spécifiques à vos défis.'}
            </p>

            <Link
              to="/diagnostic-flash/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-700 text-white px-8 py-4 rounded-full hover:from-brand-700 hover:to-brand-800 transition-all font-semibold text-base whitespace-nowrap cursor-pointer shadow-lg shadow-brand-200"
            >
              {isEn ? 'Request My Strategic Diagnosis' : 'Demander Mon Diagnostic Stratégique'}
              <i className="ri-arrow-right-line"></i>
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-green-600"></i>
                <span>{isEn ? 'Confidential' : 'Confidentiel'}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line text-brand-600"></i>
                <span>30 min</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-user-star-line text-gold-600"></i>
                <span>{isEn ? 'Dedicated expert' : 'Expert dédié'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton retour au blog */}
        <div className="mt-12 text-center">
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-gold-500 hover:text-gold-700 transition-all cursor-pointer whitespace-nowrap"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-left-line"></i>
            </div>
            {t('articleDetail.backToBlog')}
          </Link>
        </div>
      </div>
    </section>
  );
}



