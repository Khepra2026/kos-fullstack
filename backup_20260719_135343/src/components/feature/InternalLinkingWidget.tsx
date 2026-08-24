import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resolveIdToSlug } from '@/data/articleSlugMap';
import { blogArticles } from '@/mocks/blogArticles';
import { blogArticlesEn } from '@/mocks/blogArticlesEn';

interface InternalLinkingWidgetProps {
  serviceId?: string;
  articleId?: string;
  tags?: string[];
  category?: string;
  limit?: number;
  title?: string;
  variant?: 'compact' | 'full';
}

export function InternalLinkingWidget({
  serviceId,
  articleId,
  tags = [],
  category,
  limit = 3,
  title,
  variant = 'full',
}: InternalLinkingWidgetProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const articles = isEn ? blogArticlesEn : blogArticles;

  // Mapping service → tags/catégories pertinents
  const serviceToTags: Record<string, { tags: string[]; category: string }> = {
    'corporate-governance': {
      tags: ['Gouvernance', 'Conformité', 'BCEAO', 'Conseil d\'administration', 'Politiques internes'],
      category: isEn ? 'Governance' : 'Gouvernance',
    },
    'financial-digital-inclusion': {
      tags: ['Inclusion financière', 'FinTech', 'Transformation digitale', 'Mobile money', 'BCEAO'],
      category: isEn ? 'Digital Transformation' : 'Transformation digitale',
    },
    'enterprise-risk-management': {
      tags: ['Gestion des risques', 'ERM', 'Contrôle interne', 'Bâle II', 'Risque crédit'],
      category: isEn ? 'Finance' : 'Finance',
    },
    'strategic-advisory': {
      tags: ['Stratégie', 'Levée de fonds', 'Business plan', 'Croissance', 'Investissement'],
      category: isEn ? 'Entrepreneurship' : 'Entrepreneuriat',
    },
  };

  // Déterminer les tags et catégorie à utiliser
  let searchTags = tags;
  let searchCategory = category;

  if (serviceId && serviceToTags[serviceId]) {
    searchTags = [...searchTags, ...serviceToTags[serviceId].tags];
    searchCategory = serviceToTags[serviceId].category;
  }

  // Filtrer et scorer les articles
  const scoredArticles = articles
    .filter(a => a.id !== articleId) // Exclure l'article actuel
    .map(article => {
      let score = 0;

      // Score par catégorie
      if (searchCategory && article.category === searchCategory) {
        score += 10;
      }

      // Score par tags
      const articleTags = article.tags || [];
      searchTags.forEach(tag => {
        if (articleTags.some(t => t.toLowerCase().includes(tag.toLowerCase()))) {
          score += 5;
        }
      });

      // Score par mots-clés dans le titre
      searchTags.forEach(tag => {
        if (article.title.toLowerCase().includes(tag.toLowerCase())) {
          score += 3;
        }
      });

      return { article, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (scoredArticles.length === 0) return null;

  const defaultTitle = isEn
    ? 'Related Expert Articles'
    : 'Articles Experts Connexes';

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-br from-brand-50 to-gold-50 rounded-xl p-6 border border-brand-100">
        <h3 className="text-lg font-bold text-brand-900 mb-4 flex items-center gap-2">
          <i className="ri-links-line text-gold-600"></i>
          {title || defaultTitle}
        </h3>
        <div className="space-y-3">
          {scoredArticles.map(({ article }) => (
            <button
              key={article.id}
              onClick={() => navigate(`/blog/${resolveIdToSlug(article.id) || article.id}/`)}
              className="w-full text-left group cursor-pointer"
            >
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/80 transition-all">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-gold-700 transition-colors mb-1">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <i className="ri-time-line"></i>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <i className="ri-arrow-right-line text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"></i>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate('/blog/')}
          className="mt-4 w-full text-center text-sm text-gold-700 hover:text-gold-900 font-semibold flex items-center justify-center gap-1 cursor-pointer"
        >
          {isEn ? 'View all articles' : 'Voir tous les articles'}
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <i className="ri-lightbulb-line"></i>
            {isEn ? 'Expert Insights' : 'Analyses d\'experts'}
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 mb-4">
            {title || defaultTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isEn
              ? 'Deepen your understanding with these complementary articles from our experts.'
              : 'Approfondissez votre compréhension avec ces articles complémentaires de nos experts.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {scoredArticles.map(({ article }) => (
            <button
              key={article.id}
              onClick={() => navigate(`/blog/${resolveIdToSlug(article.id) || article.id}/`)}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer text-left border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-brand-900">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gold-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <i className="ri-time-line"></i>
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gold-700 font-semibold group-hover:gap-2 transition-all">
                    <span>{isEn ? 'Read' : 'Lire'}</span>
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/blog/')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all font-semibold shadow-lg hover:shadow-xl cursor-pointer"
          >
            {isEn ? 'Explore all articles' : 'Explorer tous les articles'}
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default InternalLinkingWidget;



